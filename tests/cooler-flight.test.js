'use strict';
const test=require('node:test');const assert=require('node:assert/strict');
const E=require('../app-cooler-flight-engine');const {fixture,fly}=require('./helpers/cooler-flight-fixture.cjs');
test('fixed-step flight is repeatable and legitimate flights replay to the same score',()=>{
  for(const seed of [0,1,123456,4294967295]){const {s,taps}=fly(seed);assert.ok(s.score>=1);assert.deepEqual(E.replay(seed,taps,s.tick),s);}
});
test('replay rejects fabricated duration, reordered taps, taps after collision and unfinished flights',()=>{
  const {s,taps}=fly(44);assert.throws(()=>E.replay(44,taps,s.tick+1));assert.throws(()=>E.replay(44,[0,1],100));assert.throws(()=>E.replay(44,[-1],100));assert.throws(()=>E.replay(44,[],2));assert.throws(()=>E.replay(44,[...taps,s.tick],s.tick));assert.throws(()=>E.replay(44,[],E.MAX_TICKS+1));
});
test('simulation keeps generating reachable-sized gaps and stops at the ceiling or felt',()=>{
  const s=E.create(8);while(s.alive)E.step(s,false);assert.ok(s.y+E.RADIUS>E.FLOOR);const a=E.create(8);while(a.alive)E.step(a,a.tick%7===0);assert.ok(a.y-E.RADIUS<24);
  const hard=E.create(812);hard.passes=100;E.step(hard,false);assert.equal(hard.obstacles[0].gap,148);assert.ok(hard.obstacles[0].center>=180 && hard.obstacles[0].center<=350);
});
test('server requires identity, binds a run to its owner, verifies score and consumes once',async()=>{
  const f=fixture();assert.equal((await f.request({action:'start'},'')).status,401);
  const {data:run}=await f.request({action:'start'});const {s,taps}=fly(run.seed);f.advance(s.tick*1000/60+100);
  assert.equal((await f.request({action:'finish',runId:run.runId,ticks:s.tick,taps},'Bob')).status,409);
  const result=await f.request({action:'finish',runId:run.runId,ticks:s.tick,taps,score:999999});assert.equal(result.status,200);assert.equal(result.data.score,s.score);assert.equal(f.top.get('Alice'),s.score);
  assert.equal((await f.request({action:'finish',runId:run.runId,ticks:s.tick,taps})).status,409);
});
test('fast fabricated flights and malformed replays do not enter the leaderboard',async()=>{
  const f=fixture();const {data:run}=await f.request({action:'start'});const {s,taps}=fly(run.seed);f.advance(-10000);
  assert.equal((await f.request({action:'finish',runId:run.runId,ticks:s.tick,taps})).status,400);
  assert.equal((await f.request({action:'finish',runId:run.runId,ticks:10,taps:[4,2]})).status,400);assert.equal(f.top.size,0);
});
test('duel joins are idempotent, share seed/countdown, reject third players and hide private identifiers',async()=>{
  const f=fixture();const host=(await f.request({action:'create'})).data;const guest=(await f.request({action:'join',roomId:host.roomId},'Bob')).data;
  assert.equal(host.seed,guest.seed);assert.ok(guest.startAt);const again=(await f.request({action:'join',roomId:host.roomId},'Bob')).data;assert.equal(again.runId,guest.runId);
  assert.equal((await f.request({action:'join',roomId:host.roomId},'Carol')).status,409);assert.equal((await f.request({action:'room',roomId:host.roomId},'Carol')).status,403);
  const state=(await f.request({action:'room',roomId:host.roomId})).data;assert.equal(state.startAt,guest.startAt);assert.equal(state.opponentName,'Bob');assert.equal(state.opponentRunId,undefined);
});
test('live updates never award points; validated results determine duel winner and forfeit cannot overwrite finish',async()=>{
  const f=fixture();const host=(await f.request({action:'create'})).data;const guest=(await f.request({action:'join',roomId:host.roomId},'Bob')).data;
  await f.request({action:'progress',runId:guest.runId,tick:10,y:20,score:999},'Bob');assert.equal(f.top.size,0);
  const {s,taps}=fly(host.seed);f.advance(5000+s.tick*1000/60+100);
  await f.request({action:'finish',runId:host.runId,ticks:s.tick,taps});await f.request({action:'abandon',runId:guest.runId},'Bob');
  const state=(await f.request({action:'room',roomId:host.roomId})).data;assert.equal(state.result,'win');assert.equal(state.opponent.forfeited,true);
  assert.equal((await f.request({action:'progress',runId:host.runId,tick:1,score:999})).status,409);assert.equal((await f.request({action:'abandon',runId:host.runId})).status,409);assert.equal(f.top.get('Alice'),s.score);
});
test('missing storage reports unavailable, without accepting unverified records',async()=>{const f=fixture();f.setConfigured(false);assert.equal((await f.request({action:'start'})).status,503);});

test('each chip awards exactly one point once and collision includes the head and wall lips',()=>{
 const s=E.create(1);s.nextId=1;s.obstacles=[{id:0,x:63+2.6,width:62,center:270,gap:188,collected:false,scored:false,variant:0}];E.step(s,false);assert.equal(s.score,1);E.step(s,false);assert.equal(s.score,1);assert.equal(s.perfect,1);
 const hit=E.create(1);hit.nextId=1;hit.y=190;hit.obstacles=[{id:0,x:94,width:62,center:270,gap:188,collected:false,scored:false,variant:0}];E.step(hit,false);assert.equal(hit.alive,false);
});
test('duel live replay preserves the opponent world and rejects malformed controls',async()=>{
 const f=fixture();const host=(await f.request({action:'create'})).data;await f.request({action:'join',roomId:host.roomId},'Bob');
 const taps=[0,25];await f.request({action:'progress',runId:host.runId,tick:30,taps});const room=(await f.request({action:'room',roomId:host.roomId},'Bob')).data;assert.deepEqual(room.opponent.taps,taps);assert.equal(room.opponent.tick,30);
 assert.equal((await f.request({action:'progress',runId:host.runId,tick:30,taps:[0,2]})).status,400);
});

test('difficulty starts gently and increases only after each five gates',()=>{
 const initial=E.create(1);E.step(initial,false);assert.equal(initial.stage,1);assert.equal(initial.distance,2.35);assert.equal(initial.obstacles[0].gap,244);
 const before=E.create(1);before.passes=4;E.step(before,false);assert.equal(before.stage,1);assert.equal(before.obstacles[0].gap,244);
 const next=E.create(1);next.passes=5;E.step(next,false);assert.equal(next.stage,2);assert.equal(next.distance,2.6);assert.equal(next.obstacles[0].gap,228);
});

test('same-room rematch needs both players and stale retries cannot start an extra round',async()=>{
 const f=fixture();const host=(await f.request({action:'create'})).data;const guest=(await f.request({action:'join',roomId:host.roomId},'Bob')).data;
 assert.equal((await f.request({action:'rematch',roomId:host.roomId,runId:host.runId},'Carol')).status,403);
 assert.equal((await f.request({action:'rematch',roomId:host.roomId,runId:host.runId})).status,409);
 await f.request({action:'abandon',runId:host.runId});await f.request({action:'abandon',runId:guest.runId},'Bob');
 const one=(await f.request({action:'rematch',roomId:host.roomId,runId:host.runId})).data;assert.equal(one.rematchReady,true);assert.equal(one.round,1);assert.equal(one.runId,host.runId);
 const waiting=(await f.request({action:'room',roomId:host.roomId},'Bob')).data;assert.equal(waiting.opponentReady,true);
 const again=(await f.request({action:'rematch',roomId:host.roomId,runId:host.runId})).data;assert.equal(again.round,1);
 const [a,b]=await Promise.all([f.request({action:'rematch',roomId:host.roomId,runId:guest.runId},'Bob'),f.request({action:'rematch',roomId:host.roomId,runId:guest.runId},'Bob')]);
 assert.equal(a.data.round,2);assert.equal(b.data.round,2);assert.equal(a.data.runId,b.data.runId);assert.equal(a.data.roomId,host.roomId);assert.equal(a.data.result,null);assert.equal(a.data.mine,null);assert.ok(a.data.startAt>a.data.serverNow);
 const next=(await f.request({action:'room',roomId:host.roomId})).data;assert.notEqual(next.runId,host.runId);assert.equal(next.seed,a.data.seed);assert.equal(next.startAt,a.data.startAt);assert.equal(next.opponentName,'Bob');assert.equal(next.rematchReady,false);
 const old=(await f.request({action:'rematch',roomId:host.roomId,runId:host.runId})).data;assert.equal(old.round,2);assert.equal(old.rematchReady,false);
});

test('one tap gives a slightly longer lift',()=>{const s=E.create(1);E.step(s,true);assert.equal(s.vy,-4.8+0.235);while(s.vy<0)E.step(s,false);assert.ok(s.tick>=20);assert.ok(270-s.y>42 && 270-s.y<49);});

test('previous-version issued flights still verify with their original impulse',()=>{const s=E.create(8,3);E.step(s,true);assert.equal(s.vy,-4.6+0.245);while(s.alive)E.step(s,false);assert.deepEqual(E.replay(8,[0],s.tick,3),s);});

test('club nicknames replace generic names in existing records and new duel invitations',async()=>{
 const f=fixture();f.top.set('Alice',7);f.hashes.set('poker_app:visitor_dt_ids',new Map([['Alice','ID123456']]));f.hashes.set('poker_app:account_redirects',new Map([['ID123456','ID654321']]));f.hashes.set('poker_app:pokerplus_profiles',new Map([['ID654321',JSON.stringify({Nike:'Кулер'})],['ID111111',JSON.stringify({nickname:'ПокерМанки'})]]));
 f.hashes.set('poker_app:cooler_flight:v3:names',new Map([['Alice','Игрок клуба']]));
 const board=(await f.request({action:'leaderboard'})).data;assert.equal(board.rows[0].name,'Кулер');assert.equal(board.rows[0].score,7);
 const room=(await f.request({action:'create'})).data;assert.equal(room.name,'Кулер');const guest=(await f.request({action:'join',roomId:room.roomId},'ID111111')).data;assert.equal(guest.name,'ПокерМанки');assert.equal(guest.opponentName,'Кулер');
});

test('unlinked users use the actual API identity name rather than a generic label',async()=>{const f=fixture();const result=await f.request({action:'create'},'tg_123',{firstName:'Алекс',lastName:'Петров',telegramUsername:'alex'});assert.equal(result.data.name,'Алекс Петров');});

test('course has meaningful up/down changes while keeping gates within the arena',()=>{
 const s=E.create(18),centers=[];
 for(let i=0;i<16;i++){s.alive=true;s.y=270;s.vy=0;s.spawnDistance=236;E.step(s,false);const o=s.obstacles.at(-1);centers.push(o.center);assert.ok(o.center-o.gap/2>=24);assert.ok(o.center+o.gap/2<=E.FLOOR);}
 const deltas=centers.slice(1).map((c,i)=>c-centers[i]);assert.ok(deltas.some(d=>d>45));assert.ok(deltas.some(d=>d< -45));assert.ok(deltas.every(d=>Math.abs(d)<=90));
});
test('daily rounds switch at 17 Moscow and use the closing day prize',()=>{
  const {round}=require('../lib/cooler-flight-daily');
  assert.equal(round(Date.parse('2026-10-02T13:59:59Z')).date,'2026-10-02');
  assert.equal(round(Date.parse('2026-10-02T14:00:00Z')).date,'2026-10-03');
  assert.equal(round(Date.parse('2026-10-02T14:00:00Z')).prize,'Билет за 500 ₽');
  assert.equal(round(Date.parse('2026-10-04T14:00:00Z')).prize,'Билет на турнир вечера');
});
test('daily winner is immutable after cutoff, ties favor earlier result, and a new round is empty',async()=>{
  const f=fixture();f.setTime(Date.parse('2026-10-02T13:50:00Z'));
  const prefix='poker_app:cooler_flight:daily:v1:',end=Date.parse('2026-10-02T14:00:00Z');
  f.boards.set(prefix+'2026-10-02',new Map([['Alice',300000000+500000],['Bob',300000000+400000]]));
  f.hashes.set(prefix+'2026-10-02:names',new Map([['Alice','Кулер'],['Bob','Манки']]));
  f.boards.set(prefix+'pending',new Map([['2026-10-02',end]]));
  let daily=(await f.request({action:'leaderboard'})).data.daily;assert.equal(daily.winners.length,0);assert.equal(daily.rows[0].name,'Кулер');
  f.setTime(end);daily=(await f.request({action:'leaderboard'})).data.daily;
  assert.equal(daily.rows.length,0);assert.equal(daily.winners[0].name,'Кулер');assert.equal(daily.winners[0].score,3);
  f.boards.get(prefix+'2026-10-02').set('Bob',900000000);
  daily=(await f.request({action:'leaderboard'})).data.daily;assert.equal(daily.winners[0].name,'Кулер');assert.equal(daily.prize,'Билет за 500 ₽');
});
test('verified finishes enter daily board exactly once',async()=>{
  const f=fixture();f.setTime(Date.parse('2026-10-02T12:00:00Z'));
  const run=(await f.request({action:'start'})).data,{s,taps}=fly(run.seed);f.advance(s.tick*1000/60+1000);
  const result=await f.request({action:'finish',runId:run.runId,ticks:s.tick,taps});assert.equal(result.status,200);assert.equal(result.data.daily.rows[0].score,s.score);
  assert.equal((await f.request({action:'finish',runId:run.runId,ticks:s.tick,taps})).status,409);
});
test('Cooler collision radius halves at 30 gates and speed caps at 50',()=>{
  function sample(passes,version){const s=E.create(1,version);s.passes=passes;s.y=60;s.vy=0;E.step(s,false);return s;}
  assert.equal(sample(29).alive,false);assert.equal(sample(30).alive,true);
  assert.equal(sample(30,5).alive,false);
  assert.ok(Math.abs(sample(40).distance-4.35)<1e-9);
  assert.ok(Math.abs(sample(45).distance-4.6)<1e-9);
  assert.ok(Math.abs(sample(50).distance-4.85)<1e-9);
  assert.equal(sample(50).distance,sample(100).distance);
  assert.equal(sample(50,5).distance,4.3);
});
test('gate 50 replaces its chip with one extra life, consumed only once',()=>{
  const s=E.create(9);s.passes=49;s.nextId=49;s.spawnDistance=236;s.lastCenter=270;E.step(s,false);
  const heart=s.obstacles.find(o=>o.id===49);assert.equal(heart.life,true);
  heart.x=s.x-heart.width/2+4.85;s.y=heart.center;s.vy=0;E.step(s,false);
  assert.equal(s.lives,1);assert.equal(s.score,0);E.step(s,false);assert.equal(s.lives,1);
  s.y=10;E.step(s,false);assert.equal(s.alive,true);assert.equal(s.lives,0);assert.equal(s.revives,1);
  for(let i=0;i<20;i++){s.y=10;E.step(s,false);assert.equal(s.alive,true);}
  s.tick=s.invulnerableUntil;s.y=10;E.step(s,false);assert.equal(s.alive,false);
  const old=E.create(9,6);old.nextId=49;old.spawnDistance=236;old.lastCenter=270;E.step(old,false);assert.equal(old.obstacles[0].life,false);
});
