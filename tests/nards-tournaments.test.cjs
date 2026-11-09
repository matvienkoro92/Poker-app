'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fixture = require('./helpers/nards-tournament-fixture.cjs');
const roomFactory = require('../lib/board-games-room');
const { READY_MS } = require('../lib/nards-tournaments');

async function startFirstRound(f, t) {
  f.time(t.startsAt);
  const waiting = await f.call('m0', 'get', t.id);
  f.time(waiting.readyUntil);
  await f.service.synchronize(t.id);
}

test('admin-only creation, validation, idempotency and private fields', async () => {
  const f = fixture();
  await assert.rejects(f.call('m1', 'create', null, {}), { status: 403 });
  await assert.rejects(f.create({ roundTargets: [3, 0] }), { status: 400 });
  await assert.rejects(f.create({ startsAt: f.now() - 1 }), { status: 400 });
  const t = await f.create();
  const again = await f.create({ title: 'ignored retry' });
  assert.equal(t.id, again.id); assert.equal(f.tournaments.size, 1);
  assert.equal(t.title, again.title);
  await f.call('m1', 'join', t.id);
  const publicData = await f.call('m2', 'get', t.id);
  assert.doesNotMatch(JSON.stringify(publicData), /accountId|ID000001|"member"/);
  const listed = await f.call('m2', 'list'); assert.equal(listed.tournaments.length, 1); assert.equal(listed.isAdmin, false);
});

test('canonical duplicate registrations, capacity, closing signup and readiness', async () => {
  const f = fixture(), t = await f.create({ capacity: 2 });
  f.profiles.set('alias', f.profiles.get('m1'));
  await f.call('m1', 'join', t.id); await f.call('alias', 'join', t.id);
  let d = await f.call('m1', 'ready', t.id); assert.equal(d.entries.length, 1); assert.equal(d.self.ready, true);
  await f.call('m2', 'join', t.id);
  await assert.rejects(f.call('m3', 'join', t.id), { status: 409 });
  await assert.rejects(f.call('m1', 'draw', t.id), { status: 403 });
  d = await f.call('m0', 'draw', t.id);
  assert.equal(d.rounds[0].matches[0].ready.filter(Boolean).length, 1);
  await assert.rejects(f.call('m3', 'join', t.id), { status: 409 });
  await assert.rejects(f.call('m1', 'leave', t.id), { status: 409 });
});

test('automatic draw and start, host equipment snapshot, server freezes early actions', async () => {
  const f = fixture(), t = await f.create();
  for (const m of ['m1', 'm2', 'm3', 'm4']) await f.call(m, 'join', t.id);
  f.time(t.drawAt);
  let d = await f.call('m1', 'get', t.id);
  assert.equal(d.status, 'drawn'); assert.equal(d.rounds.length, 2);
  const match = d.rounds[0].matches[0], room = f.roomMap.get(match.roomId);
  assert.equal(room.turnDeadline, null);
  const base = roomFactory({ ...f.rooms, now: f.now });
  await assert.rejects(base.call('m69', { action: 'join', roomId: room.id }), { status: 403 });
  await assert.rejects(base.call(room.players[0], { action: 'move', roomId: room.id, revision: room.revision, move: { type: 'roll' } }), { status: 409 });
  const view = await base.call(room.players[0], { action: 'room', roomId: room.id });
  assert.equal(view.equipment.checkers, 'dragon', 'tournament creator equipment is preserved even for a level-one entrant');
  await startFirstRound(f, t); d = await f.call('m1', 'get', t.id);
  const live = f.roomMap.get(room.id);
  assert.equal(d.status, 'running'); assert.equal(live.state.phase, 'moving'); assert.equal(live.state.rollCount, 2);
  assert.equal(live.turnDeadline, d.readyUntil + 90000);
  await assert.rejects(base.call(live.players[0], { action: 'move', roomId: live.id, revision: live.revision, move: { type: 'draw-offer' } }), { status: 400 });
  await assert.rejects(base.call(live.players[0], { action: 'rematch', roomId: live.id, revision: live.revision }), { status: 409 });
});

test('non-power-of-two field gives fair byes and allocates a waiting next-round room', async () => {
  const f = fixture(), d = await f.seed(3);
  const bye = d.rounds[0].matches.find(m => m.reason === 'bye'); assert.ok(bye?.winnerId);
  const waiting = d.rounds[1].matches[0]; assert.ok(waiting.roomId); assert.equal(waiting.startsAt, null);
  const room = f.roomMap.get(waiting.roomId); assert.equal(room.players.filter(Boolean).length, 1); assert.equal(room.turnDeadline, null);
  const base = roomFactory({ ...f.rooms, now: f.now });
  const member = room.players.find(Boolean), v = await base.call(member, { action: 'room', roomId: room.id }); assert.equal(v.ready, false);
  assert.ok(d.entries.some(e => e.id === bye.winnerId));
});

test('1/2/3-point games credit once, automatic next game, no points from clients', async () => {
  const f = fixture(), t = await f.seed(2, { capacity: 2, target: 7 });
  await startFirstRound(f, t);
  const id = t.rounds[0].matches[0].roomId;
  await f.finish(id, 0, 2);
  let d = await f.call('m1', 'get', t.id); assert.deepEqual(d.rounds[0].matches[0].scores, [2, 0]);
  await f.call('m2', 'get', t.id); assert.deepEqual(f.roomMap.get(id).match.wins, [2, 0]);
  const nextAt = f.roomMap.get(id).tournament.nextGameAt; assert.equal(nextAt, f.now() + 5000);
  f.time(nextAt); await f.service.synchronize(t.id);
  assert.equal(f.roomMap.get(id).match.round, 2); assert.equal(f.roomMap.get(id).state.winner, null);
  assert.equal(f.roomMap.get(id).turnDeadline, nextAt + 90000);
  await f.finish(id, 0, 3); await f.service.synchronize(t.id);
  assert.deepEqual(f.roomMap.get(id).match.wins, [5, 0]);
  f.time(f.now() + 5000); await f.service.synchronize(t.id);
  await f.finish(id, 0, 2); d = await f.call('m1', 'get', t.id);
  assert.equal(d.status, 'completed'); assert.deepEqual(d.rounds[0].matches[0].scores, [7, 0]);
  const winner = d.winnerId;
  await f.call('m1', 'get', t.id); assert.equal((await f.call('m2', 'get', t.id)).winnerId, winner);
});

test('early winner waits in precreated room; later winner triggers exactly three-minute break', async () => {
  const f = fixture(), t = await f.seed(4, { target: 1 });
  await startFirstRound(f, t);
  const [a, b] = t.rounds[0].matches;
  await f.finish(a.roomId, 0); let d = await f.call('m1', 'get', t.id);
  const early = d.rounds[1].matches[0]; assert.ok(early.roomId); assert.equal(early.startsAt, null);
  const firstRoom = early.roomId;
  f.time(f.now() + 20000); await f.finish(b.roomId, 1); d = await f.call('m2', 'get', t.id);
  const final = d.rounds[1].matches[0]; assert.equal(final.roomId, firstRoom); assert.equal(final.startsAt, f.now() + 180000);
  assert.ok(f.roomMap.get(firstRoom).players.every(Boolean)); assert.equal(f.roomMap.get(firstRoom).turnDeadline, null);
  const deadline = final.startsAt;
  f.time(f.now() + 3000); await f.service.synchronize(t.id);
  assert.equal(f.roomMap.get(firstRoom).tournament.startsAt, deadline, 'polling cannot reset the break');
  f.time(deadline); await f.service.synchronize(t.id);
  assert.equal(f.roomMap.get(firstRoom).state.phase, 'moving'); assert.equal(f.roomMap.get(firstRoom).tournament.active, true);
});

test('three missed turns forfeit entire match; both non-arrivals are excluded', async () => {
  const f = fixture(), t = await f.seed(2, { capacity: 2, target: 25 });
  await startFirstRound(f, t);
  f.time(f.now() + 10 * 90000); const d = await f.call('m1', 'get', t.id);
  assert.equal(d.status, 'completed'); assert.equal(d.winnerId, null); assert.equal(d.rounds[0].matches[0].reason, 'double-no-show');
  const g = fixture(), u = await g.seed(2, { capacity: 2, target: 25 });
  const r = g.roomMap.get(u.rounds[0].matches[0].roomId); r.tournament.played[1] = true;
  await startFirstRound(g, u);
  g.time(g.now() + 10 * 90000); const result = await g.call('m2', 'get', u.id);
  assert.equal(result.status, 'completed'); assert.ok(result.winnerId); assert.equal(result.rounds[0].matches[0].reason, 'timeout-skips');
  assert.equal(g.roomMap.get(r.id).state.missedTurns[0], 3);
});

test('cancelled tournaments cannot start, insufficient signup cancels, registration can leave', async () => {
  const f = fixture(), t = await f.create();
  await f.call('m1', 'join', t.id); await f.call('m1', 'leave', t.id);
  f.time(t.drawAt); let d = await f.call('m1', 'get', t.id); assert.equal(d.status, 'cancelled'); assert.ok(d.reason);
  const g = fixture(), u = await g.seed(4); await g.call('m0', 'cancel', u.id);
  g.time(u.startsAt + 1000); d = await g.call('m1', 'get', u.id); assert.equal(d.status, 'cancelled');
  for (const r of g.roomMap.values()) { assert.equal(r.tournament.cancelled, true); assert.equal(r.turnDeadline, null); }
});

test('server validates real last-checker wins, series restarts automatically, and break uses actual completion time', async () => {
  const f=fixture(),t=await f.seed(2,{capacity:2,target:3});await startFirstRound(f, t);
  const room=f.roomMap.get(t.rounds[0].matches[0].roomId),base=roomFactory({...f.rooms,now:f.now});
  room.state.points.fill(0);room.state.points[23]=1;room.state.points[10]=-15;room.state.off=[14,0];room.state.turn=0;room.state.phase='moving';room.state.roll=[1,2];room.state.dice=[1];room.state.turns=[2,2];room.state.opening=false;
  const won=await base.call(room.players[0],{action:'move',roomId:room.id,revision:room.revision,move:{type:'move',from:23,to:24,die:1}});
  assert.equal(won.state.winPoints,2);assert.deepEqual(won.match.wins,[2,0]);
  const endedAt=f.now();assert.equal(f.roomMap.get(room.id).tournament.gameEndedAt,endedAt);
  f.time(endedAt+6000);await f.service.synchronize(t.id);
  assert.equal(f.roomMap.get(room.id).match.round,2);assert.equal(f.roomMap.get(room.id).tournament.startsAt,endedAt+5000);
});

test('large fields, byes and retrying room CAS never duplicate seats or advance before scheduled start',async()=>{
  const f=fixture(),t=await f.seed(5,{capacity:8,roundTargets:[1,3,5],startsAt:f.now()+1800000});
  const seeded=t.rounds[0].matches.flatMap(m=>m.playerIds).filter(Boolean);assert.equal(new Set(seeded).size,5);
  for(const m of t.rounds[1].matches)if(m.startsAt!=null)assert.ok(m.startsAt>=t.startsAt+180000);
  const initialRooms=f.roomMap.size;await f.service.synchronize(t.id);await f.service.synchronize(t.id);assert.equal(f.roomMap.size,initialRooms);
  const g=fixture(),u=await g.seed(64,{capacity:64,target:1});assert.equal(u.rounds.length,6);assert.equal(u.rounds[0].matches.length,32);assert.equal(g.roomMap.size,32);
  assert.equal(new Set(u.rounds[0].matches.flatMap(m=>m.playerIds)).size,64);
});

test('early winner gets the exact live future opponent room, and reads cannot choose tournament outcomes',async()=>{
  const f=fixture(),t=await f.seed(4,{target:1});await startFirstRound(f, t);
  const [a,b]=t.rounds[0].matches,raw=f.roomMap.get(a.roomId),member=raw.players[0];
  await f.finish(a.roomId,0,1);const d=await f.call(member,'get',t.id,{winnerId:'forged',scores:[100,0]});
  assert.equal(d.self.opponentRoomId,b.roomId);assert.equal(d.self.roomId,d.rounds[1].matches[0].roomId);assert.equal(d.winnerId,null);
  assert.deepEqual(d.rounds[0].matches[0].scores,[1,0]);
  const watched=await roomFactory({...f.rooms,now:f.now}).call(member,{action:'watch',roomId:b.roomId});assert.equal(watched.spectator,true);assert.equal(watched.player,-1);
});

test('concurrent signups stay unique, lock retry is safe, and room CAS conflicts retry without duplicate updates',async()=>{
 const f=fixture(),t=await f.create({capacity:2});
 const result=await Promise.allSettled([f.call('m1','join',t.id),f.call('m2','join',t.id)]);
 for(let i=0;i<result.length;i++)if(result[i].status==='rejected'){assert.equal(result[i].reason.status,409);await f.call('m'+(i+1),'join',t.id);}
 const d=await f.call('m0','draw',t.id);assert.equal(d.entries.length,2);
 const cas=f.rooms.cas;let failures=1;f.rooms.cas=async(...args)=>{if(failures){failures--;return false;}return cas(...args);};
 const ready=await f.call('m1','ready',t.id);assert.equal(failures,0);assert.equal(ready.self.ready,true);assert.equal(f.roomMap.size,1);
 assert.equal(ready.rounds[0].matches[0].ready.filter(Boolean).length,1);
});

test('manual tournament waits indefinitely, including at capacity, until admin starts', async () => {
  const f = fixture(), t = await f.create({ startsAt: null, drawAt: null, capacity: 2 });
  assert.equal(t.startsAt, null);
  await assert.rejects(f.call('m0', 'start', t.id), { status: 409 });
  await f.call('m1', 'join', t.id);
  f.time(f.now() + 86400000);
  assert.equal((await f.call('m1', 'get', t.id)).status, 'registration');
  await f.call('m2', 'join', t.id);
  await f.service.sweep();
  assert.equal((await f.call('m1', 'get', t.id)).status, 'registration');
  await assert.rejects(f.call('m1', 'start', t.id), { status: 403 });
  const started = await f.call('m0', 'start', t.id);
  assert.equal(started.status, 'running');
  assert.equal(started.startsAt, f.now());
  assert.equal(started.rounds[0].matches[0].startsAt, f.now() + READY_MS);
  await assert.rejects(f.call('m3', 'join', t.id), { status: 409 });
  await assert.rejects(f.call('m0', 'start', t.id), { status: 409 });
});

test('only admin can remove terminal tournaments from the list while games and records remain accessible',async()=>{
 const f=fixture(),t=await f.create();
 await assert.rejects(f.call('m1','delete',t.id),{status:403});
 await assert.rejects(f.call('m0','delete',t.id),{status:409});
 await f.call('m0','cancel',t.id);
 const before=structuredClone(f.tournaments.get(t.id));
 await f.call('m0','delete',t.id);
 assert.equal((await f.call('m0','list')).tournaments.length,0);
 assert.equal((await f.call('m1','list')).tournaments.length,0);
 assert.equal((await f.call('m1','get',t.id)).status,'cancelled');
 const saved=f.tournaments.get(t.id);
 assert.deepEqual(saved.entries,before.entries);assert.deepEqual(saved.rounds,before.rounds);
 assert.deepEqual(saved.paymentPlan,before.paymentPlan);assert.equal(saved.deletedBy,'ID000000');
 await f.call('m0','delete',t.id);assert.equal(f.tournaments.size,1);
});
test('failed refunds prevent hiding a tournament before its finances settle',async()=>{
 const f=fixture({payments:{transfer:async()=>{throw Error('payment unavailable');}}}),t=await f.create();
 Object.assign(f.tournaments.get(t.id),{status:'cancelled',prizeFund:100,fundPaid:true,paymentsSettled:false});
 await assert.rejects(f.call('m0','delete',t.id),/payment unavailable/);
 assert.equal(f.tournaments.get(t.id).deletedAt,undefined);
 assert.equal((await f.call('m0','list')).tournaments.length,1);
});

test('only the opponent can accept a tournament resignation for the offered points', async () => {
  const f = fixture();
  const t = await f.seed(2, { capacity: 2, target: 5 });
  await startFirstRound(f, t);
  const room = f.roomMap.get(t.rounds[0].matches[0].roomId);
  const base = roomFactory({ ...f.rooms, now: f.now });
  const move = (player, revision, type, points) => base.call(room.players[player], {
    action: 'move', roomId: room.id, revision, move: { type, points }
  });
  const offer = await move(0, room.revision, 'resign-offer', 1);
  assert.equal(offer.state.winner, null);
  await assert.rejects(move(0, offer.revision, 'resign-accept', 1), { status: 409 });
  const declined = await move(1, offer.revision, 'resign-decline', 1);
  assert.equal(declined.state.winner, null);
  const second = await move(0, declined.revision, 'resign-offer', 2);
  await assert.rejects(move(1, second.revision, 'resign-accept', 3), { status: 409 });
  const accepted = await move(1, second.revision, 'resign-accept', 2);
  assert.equal(accepted.state.winner, 1);
  assert.deepEqual(accepted.match.wins, [0, 2]);
  assert.equal(accepted.match.winner, null);
});

test('both players must skip the same round break before the room starts early', async () => {
  const f = fixture(), t = await f.seed(4, { target: 1 });
  await startFirstRound(f, t);
  for (const match of t.rounds[0].matches) await f.finish(match.roomId, 0);
  const view = await f.call('m1', 'get', t.id);
  const final = view.rounds[1].matches[0];
  const room = f.roomMap.get(final.roomId);
  const [first, second] = room.players;
  const vote = { matchId: final.id };
  await assert.rejects(f.call('m0', 'skip-break', t.id, vote), { status: 409 });
  await f.call(first, 'skip-break', t.id, vote);
  const waiting = await f.call(first, 'skip-break', t.id, vote);
  assert.equal(waiting.rounds[1].matches[0].startsAt, final.startsAt);
  assert.equal(waiting.rounds[1].matches[0].skipBreakVotes.length, 1);
  const started = await f.call(second, 'skip-break', t.id, vote);
  assert.equal(started.rounds[1].matches[0].startsAt, f.now());
  assert.equal(f.roomMap.get(final.roomId).tournament.active, true);
});

test('chat gets registration, half-full, start, live final and winner notices once', async () => {
  const sent = [];
  const f = fixture({ notify: async payload => sent.push(payload) });
  const t = await f.create({ capacity: 2, roundTargets: [2], prizeKind: 'tickets', prizeAmounts: [1000, 500] });
  assert.equal(sent.length, 1);
  assert.match(sent[0].text, /турнир по нардам/);
  assert.match(sent[0].text, /Длинные нарды · Классические/);
  assert.match(sent[0].text, /МСК[\s\S]*1-е место — билет на 1\s000 ₽\n2-е место — билет на 500 ₽\nМест: 2/);
  assert.ok(sent[0].reply_markup.inline_keyboard[0][0].url.endsWith('nards_tour_' + t.id));
  await f.call('m1', 'join', t.id);
  assert.match(sent[1].text, /половина[\s\S]*1\. Игрок 1[\s\S]*Осталось мест: 1/);
  await f.call('m1', 'join', t.id);
  await f.call('m2', 'join', t.id);
  assert.equal(sent.length, 2);
  const drawn = await f.call('m0', 'draw', t.id);
  await startFirstRound(f, t);
  await f.call('m1', 'get', t.id);
  const room = drawn.rounds[0].matches[0].roomId;
  assert.equal(sent.length, 4);
  assert.match(sent[2].text, /Старт[\s\S]*1\. Игрок 1\n2\. Игрок 2/);
  assert.match(sent[3].text, /Начался финал/);
  assert.ok(sent[3].reply_markup.inline_keyboard[0][0].url.endsWith('board_watch_' + room));
  await f.finish(room, 0, 2);
  const result = await f.call('m1', 'get', t.id);
  await f.service.sweep();
  assert.equal(sent.length, 5);
  assert.ok(sent[4].text.includes('Победитель: ' + result.entries.find(entry => entry.id === result.winnerId).name));
  assert.match(sent[4].text, /билет на покер номиналом 1\s000 ₽/);
});

test('start reminds only registered players; ready pairs start early and others start at the deadline', async () => {
  const reminders = [];
  const f = fixture({ notifyPlayer: async (entry, payload) => reminders.push([entry.member, payload]) });
  const t = await f.create({ startsAt: null, capacity: 8 });
  for (let i = 1; i <= 5; i++) await f.call('m' + i, 'join', t.id);
  const extra = f.tournaments.get(t.id).entries.find(e => e.member === 'm5');
  await f.call('m0', 'remove-entry', t.id, { entryId: extra.id });
  assert.deepEqual(reminders, []);
  const started = await f.call('m0', 'start', t.id);
  assert.equal(started.readyUntil, f.now() + READY_MS);
  assert.deepEqual(reminders.map(([member]) => member).sort(), ['m1', 'm2', 'm3', 'm4']);
  for (const [, payload] of reminders) {
    assert.match(payload.text, /3 минуты[\s\S]*Подтвердить готовность/);
    assert.ok(payload.reply_markup.inline_keyboard[0][0].url.endsWith('nards_tour_' + t.id));
  }
  const [a,b] = started.rounds[0].matches;
  const early = f.roomMap.get(a.roomId), late = f.roomMap.get(b.roomId);
  assert.equal(early.tournament.active, false);
  assert.equal(late.tournament.active, false);
  f.time(f.now() + 15000);
  await f.call(early.players[0], 'ready', t.id);
  await f.call(late.players[0], 'ready', t.id);
  assert.equal(f.roomMap.get(a.roomId).tournament.active, false);
  await f.call(early.players[1], 'ready', t.id);
  assert.equal(f.roomMap.get(a.roomId).tournament.active, true);
  assert.equal(f.roomMap.get(a.roomId).turnDeadline, f.now() + 90000);
  f.time(started.readyUntil - 1);
  await f.service.synchronize(t.id);
  assert.equal(f.roomMap.get(b.roomId).tournament.active, false);
  f.time(started.readyUntil);
  await f.service.synchronize(t.id);
  assert.equal(f.roomMap.get(b.roomId).tournament.active, true);
  assert.equal(f.roomMap.get(b.roomId).turnDeadline, started.readyUntil + 90000);
  await assert.rejects(f.call(late.players[1], 'ready', t.id), { status: 409 });
  assert.equal(reminders.length, 4);
});

test('advancement privately notifies each winner once and links to their next room', async () => {
  const sent = [];
  const f = fixture({ notifyPlayer: async (entry, payload) => sent.push({ member: entry.member, ...payload }) });
  const t = await f.seed(4, { roundTargets: [1, 3] });
  f.time(t.startsAt);
  await f.service.synchronize(t.id);
  f.time(f.now() + READY_MS);
  const running = await f.service.synchronize(t.id);
  const [first, second] = running.rounds[0].matches.map(match => f.roomMap.get(match.roomId));
  sent.length = 0;

  await f.finish(first.id);
  const advanced = await f.service.synchronize(t.id);
  const final = advanced.rounds[1].matches[0];
  assert.equal(sent.length, 1);
  assert.equal(sent[0].member, first.players[0]);
  assert.match(sent[0].text, /Вы прошли в финал.*\nВаш соперник: ещё определяется\nИгра до 3 очков\./);
  assert.ok(sent[0].reply_markup.inline_keyboard[0][0].url.endsWith('nards_tour_' + t.id + '_' + final.roomId));

  await f.finish(second.id);
  await f.service.synchronize(t.id);
  await f.service.sweep();
  assert.deepEqual(sent.map(notice => notice.member), [first.players[0], second.players[0]]);
  assert.ok(sent[1].text.includes('Ваш соперник: ' + f.profiles.get(first.players[0]).name));
  assert.equal(sent[1].reply_markup.inline_keyboard[0][0].url, sent[0].reply_markup.inline_keyboard[0][0].url);
});

test('free tournament attendance records first-round no-shows and removes a suspended entrant before play', async () => {
  const misses = [], excluded = new Set();
  const f = fixture({attendance: {
    remaining: async id => excluded.has(id) ? 3 : 0,
    start: async (_id, accounts) => accounts.filter(id => excluded.has(id)),
    recordMiss: async (event, accounts) => misses.push({event, accounts})
  }});
  const t = await f.seed(4);
  f.time(t.startsAt);
  await f.service.synchronize(t.id);
  const stored = f.tournaments.get(t.id), first = stored.rounds[0].matches[0];
  f.time(stored.readyUntil);
  await f.service.synchronize(t.id);
  const room = f.roomMap.get(first.roomId);
  const [present, absent] = room.players;
  await f.finish(room.id, 0, 1, 'timeout-skips');
  await f.service.synchronize(t.id);
  await f.service.synchronize(t.id);
  assert.deepEqual(misses, [{event: t.id + ':' + first.id, accounts: [f.profiles.get(absent).accountId]}]);

  const next = await f.create({requestId:'attendance-next-tournament', capacity:4});
  for (const member of [present, absent, 'm5']) await f.call(member, 'join', next.id);
  await f.call('m0', 'draw', next.id);
  excluded.add(f.profiles.get(absent).accountId);
  await assert.rejects(f.call(absent, 'join', (await f.create({requestId:'attendance-later-tournament'})).id),
    /Осталось пропустить: 3/);
  f.time(next.startsAt);
  const running = await f.service.synchronize(next.id);
  assert.equal(running.status,'running');
  assert.equal(running.entries.some(entry => entry.member === absent),false);
  assert.ok(running.rounds.flatMap(round => round.matches).every(match =>
    !match.roomId || !f.roomMap.get(match.roomId).players.includes(absent)));
});

test('scheduled tournaments send one private reminder per entrant in the last half hour', async () => {
  const sent = [];
  const f = fixture({notifyPlayer: async (entry, payload) => sent.push([entry.member, payload])});
  const start = f.now() + 3600000;
  const t = await f.create({startsAt:start, drawAt:start - 60000});
  for (const member of ['m1','m2','m3']) await f.call(member,'join',t.id);
  await f.call('m3','leave',t.id);
  f.time(start - 1800001);
  await f.service.sweep();
  assert.equal(sent.length,0);
  f.time(start - 1800000);
  await f.service.sweep();
  await f.service.sweep();
  assert.deepEqual(sent.map(([member])=>member),['m1','m2']);
  assert.match(sent[0][1].text,/осталось полчаса/);
  assert.ok(sent[0][1].reply_markup.inline_keyboard[0][0].url.endsWith('nards_tour_' + t.id));
  f.time(start - 600000);
  await f.call('m4','join',t.id);
  assert.equal(sent.length,3);
  assert.equal(sent[2][0],'m4');
  assert.match(sent[2][1].text,/осталось 10 минут/);
});
