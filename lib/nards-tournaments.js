'use strict';

const crypto = require('node:crypto');
const cleanEquipment = require('./board-games-room').cleanEquipment;
const turnSecondsFor = require('./nards-turn-clock');
const BREAK_MS = 5 * 60 * 1000;
const GAME_BREAK_MS = 5000;
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const code = seed => Array.from(crypto.createHash('sha256').update(seed).digest().subarray(0, 10), b => ALPHABET[b % 32]).join('');
const error = (status, message) => { const e = Error(message); e.status = status; throw e; };
const allMatches = t => t.rounds.flatMap(r => r.matches);
const findMatch = (t, id) => allMatches(t).find(m => m.id === id);
const ownEntry = (t, person) => t.entries.find(e => e.accountId === person.accountId);
const clone = value => structuredClone(value);

function settings(body, time) {
  const manualStart = body.startsAt == null;
  const capacity = Number(body.capacity ?? 16), startsAt = manualStart ? null : Number(body.startsAt);
  const drawAt = manualStart ? null : Number(body.drawAt ?? startsAt);
  const turnSeconds = Number(body.turnSeconds ?? 45);
  const discipline = body.discipline ?? 'long', variant = body.variant ?? 'classic';
  if (!Number.isInteger(capacity) || capacity < 2 || capacity > 64) error(400, 'Укажите от 2 до 64 участников.');
  if (!['long', 'short'].includes(discipline) || !['classic', 'crazy', 'six-one'].includes(variant) || discipline === 'short' && variant !== 'classic') error(400, 'Выберите вариант нард.');
  if (![15, 30, 45, 60].includes(turnSeconds)) error(400, 'Выберите 15, 30, 45 или 60 секунд на ход.');
  if (!manualStart && (!Number.isSafeInteger(startsAt) || startsAt < time + 60000 || startsAt > time + 30 * 86400000)) error(400, 'Начало должно быть через минуту или позже, в пределах 30 дней.');
  if (!manualStart && (!Number.isSafeInteger(drawAt) || drawAt <= time || drawAt > startsAt)) error(400, 'Регистрация должна закрыться до начала турнира.');
  const count = Math.ceil(Math.log2(capacity));
  const targets = body.roundTargets ?? Array(count).fill(Number(body.target ?? 3));
  if (!Array.isArray(targets) || targets.length !== count || targets.some(n => !Number.isInteger(n) || n < 1 || n > 25)) error(400, 'Задайте от 1 до 25 очков для каждого раунда.');
  const title = String(body.title || 'Турнир по нардам').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, 80);
  if (!title) error(400, 'Введите название турнира.');
  const entryType = body.entryType ?? 'free';
  const buyIn = entryType === 'chips' ? Number(body.buyIn) : 0;
  const prizeFund = entryType === 'free' ? Number(body.prizeFund ?? 0) : 0;
  if (!['free','chips'].includes(entryType) || !Number.isSafeInteger(buyIn) || buyIn < 0 || entryType === 'chips' && buyIn < 1 || buyIn > 1000000) error(400, 'Укажите корректный взнос в фишках.');
  if (!Number.isSafeInteger(prizeFund) || prizeFund < 0 || prizeFund > 1000000) error(400, 'Укажите призовой фонд от 0 до 1 000 000 фишек.');
  const prizeKind = body.prizeKind ?? 'chips';
  if (!['chips','tickets'].includes(prizeKind) || prizeKind === 'tickets' && entryType !== 'free') error(400, 'Билеты доступны для бесплатного турнира.');
  const prizeMode = prizeKind === 'tickets' ? 'fixed' : body.prizeMode ?? 'percent';
  if (!['percent','fixed'].includes(prizeMode)) error(400, 'Выберите способ распределения призов.');
  const prizeAmounts = prizeMode === 'fixed' ? body.prizeAmounts : null;
  const prizeShares = prizeMode === 'percent' ? body.prizeShares ?? [100] : null;
  const values = prizeAmounts || prizeShares;
  if (!Array.isArray(values) || values.length < 1 || values.length > capacity || values.some(n => !Number.isSafeInteger(n) || n < 0 || n > (prizeMode === 'fixed' ? 1000000 : 100))) error(400, 'Укажите корректные призы за каждое место.');
  const total = values.reduce((a,b)=>a+b,0);
  if (prizeMode === 'percent' && total !== 100) error(400, 'Распределите 100% фонда между призовыми местами.');
  if (prizeMode === 'fixed' && (total <= 0 || total > 1000000 || entryType === 'chips' && total !== buyIn * capacity)) error(400, 'Сумма призов должна совпадать с фондом при полной регистрации и не превышать 1 000 000 фишек.');
  // Players eliminated in the same round share a place; absent slots have no prize.
  for (let start=2; start<Math.min(capacity,2**Math.ceil(Math.log2(values.length))); start*=2) {
    const group=Array.from({length:Math.min(start,capacity-start)},(_,i)=>values[start+i]||0);
    if(group.some(n=>n!==group[0])) error(400, 'Места одного раунда должны получать одинаковый приз.');
  }
  return { title, capacity, startsAt, drawAt, turnSeconds, discipline, variant, roundTargets: [...targets], entryType, buyIn,
    prizeFund: prizeKind === 'tickets' ? 0 : prizeMode === 'fixed' && entryType === 'free' ? total : prizeFund, prizeKind, prizeMode,
    prizeShares: prizeShares && [...prizeShares], prizeAmounts: prizeAmounts && [...prizeAmounts] };

}

// Fisher–Yates uses server crypto randomness, as does the SNG Battle draw.
function shuffled(entries, randomInt) {
  const result = [...entries];
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function draw(t, time, randomInt) {
  if (t.status !== 'registration') return;
  if (t.entries.length < 2) {
    t.status = 'cancelled'; t.reason = 'Для турнира нужны хотя бы два участника.'; t.finishedAt = time; return;
  }
  const entries = shuffled(t.entries, randomInt), size = 2 ** Math.ceil(Math.log2(entries.length));
  const count = Math.log2(size), firstPairs = size / 2;
  t.rounds = Array.from({ length: count }, (_, r) => ({
    index: r + 1,
    // Keep the final's configured target if fewer than capacity signed up.
    target: t.roundTargets[t.roundTargets.length - count + r],
    matches: Array.from({ length: size / 2 ** (r + 1) }, (_, i) => ({
      id: `${r + 1}-${i + 1}`, index: i + 1, round: r,
      playerIds: [null, null], sourcesDone: r === 0 ? [true, true] : [false, false],
      ready: [false, false], scores: [0, 0], resolved: false, winnerId: null,
      startsAt: r === 0 ? t.startsAt : null, roomId: null
    }))
  }));
  // Spread byes over separate matches; never seed an empty-vs-empty first match.
  entries.forEach((entry, i) => {
    const match = t.rounds[0].matches[i % firstPairs];
    match.playerIds[i < firstPairs ? 0 : 1] = entry.id;
    match.ready[i < firstPairs ? 0 : 1] = entry.ready;
  });
  t.drawnAt = time; t.status = 'drawn';
}

function publicView(t, person, admin, time) {
  const mine = ownEntry(t, person);
  const matches = allMatches(t);
  const own = mine && matches.find(m => !m.resolved && m.playerIds.includes(mine.id));
  // Source of the still unknown opponent, for one-tap live spectating.
  let opponentMatch = null;
  if (own && own.round > 0) {
    const slot = own.playerIds.indexOf(mine.id);
    opponentMatch = t.rounds[own.round - 1].matches[(own.index - 1) * 2 + (1 - slot)];
    if (opponentMatch?.resolved) opponentMatch = null;
  }
  return {
    ok: true, id: t.id, title: t.title, status: t.status, reason: t.reason || '',
    createdAt: t.createdAt, startsAt: t.startsAt, drawAt: t.drawAt, serverNow: time,
    discipline: t.discipline, variant: t.variant, capacity: t.capacity,
    entryType: t.entryType || 'free', buyIn: t.buyIn || 0, prizeFund: t.entryType === 'chips' ? t.entries.filter(e=>!e.withdrawn).length*t.buyIn : t.prizeFund || 0, prizeKind:t.prizeKind||'chips', ticketAwards:(t.ticketAwards||[]).map(a=>({entryId:a.entryId,place:a.place,amount:a.amount,issuedAt:a.issuedAt||null,...(admin?{poker21Id:t.entries.find(e=>e.id===a.entryId)?.poker21Id||''}:{})})), prizeMode:t.prizeMode||'percent', prizeAmounts:t.prizeAmounts||null, prizeShares: t.prizeShares || [100], paymentsSettled: !!t.paymentsSettled,
    turnSeconds: t.turnSeconds, roundTargets: t.roundTargets, breakSeconds: 300,
    points: { single: 1, mars: 2, koks: 3 }, isAdmin: admin, revision: t.revision,
    entries: t.entries.filter(e=>!e.withdrawn).map(e => ({
      id: e.id, name: e.name, ready: e.ready, self: e.id === mine?.id, level: e.level,
      avatar: e.accountId ? '/api/nards-tournaments?avatar=' + encodeURIComponent(e.id) + '&id=' + t.id : ''
    })),
    rounds: t.rounds.map(r => ({ index: r.index, target: r.target, matches: r.matches.map(m => ({
      id: m.id, index: m.index, playerIds: m.playerIds, ready: m.ready, scores: m.scores,
      resolved: m.resolved, winnerId: m.winnerId, reason: m.reason || '',
      roomId: m.roomId, startsAt: m.startsAt, startedAt: m.startedAt ?? null, skipBreakVotes: m.skipBreakVotes || [], finishedAt: m.finishedAt || null
    })) })),
    self: mine ? { id: mine.id, ready: mine.ready, matchId: own?.id || null, roomId: own?.roomId || null, opponentRoomId: opponentMatch?.roomId || null } : null,
    winnerId: t.winnerId || null
  };
}

module.exports = function createTournamentService({ store, rooms, profile, payments, notify, notifyPlayer, now = Date.now, randomInt = crypto.randomInt, dice = () => [crypto.randomInt(1, 7), crypto.randomInt(1, 7)] }) {
  const engine = () => import('../scripts/board-games/engine.mjs');
  const series = () => import('../scripts/billiards/match.mjs');
  async function mutateRoom(id, fn, initial) {
    for (let attempt = 0; attempt < 6; attempt++) {
      const room = attempt === 0 && initial ? clone(initial) : await rooms.load(id);
      if (!room) return null;
      const revision = room.revision, before = JSON.stringify(room);
      await fn(room);
      if (JSON.stringify(room) === before) return room;
      room.revision = revision + 1;
      if (await rooms.cas(id, revision, room)) return room;
    }
    error(409, 'Позиция меняется. Обновите турнир.');
  }
  function resolve(t, m, winnerId, reason, time) {
    if (m.resolved) return;
    m.resolved = true; m.winnerId = winnerId; m.reason = reason; m.finishedAt = time;
    const next = t.rounds[m.round + 1]?.matches[Math.floor((m.index - 1) / 2)];
    if (next) {
      const slot = (m.index - 1) % 2;
      next.playerIds[slot] = winnerId;
      next.sourcesDone[slot] = true;
      next.roomDirty = true;
      if (notifyPlayer && winnerId) (t.advancementNotices ||= []).push({ matchId: next.id, entryId: winnerId });
      if (next.sourcesDone.every(Boolean) && next.playerIds.every(Boolean) && next.startsAt == null) next.startsAt = Math.max(t.startsAt, time) + BREAK_MS;
    } else {
      t.status = 'completed'; t.winnerId = winnerId; t.finishedAt = time;
    }
  }
  async function materialize(t, m, time) {
    if (m.resolved || !m.playerIds.some(Boolean)) return;
    const people = m.playerIds.map(id => t.entries.find(e => e.id === id) || null);
    // Preserve the player's slot even when the right-side winner arrives first.
    const id = m.roomId || code(`nards-tournament:${t.id}:${m.id}`);
    const meta = { id: t.id, matchId: m.id, round: m.round + 1, startsAt: m.startsAt,
      ready: [...m.ready], title: t.title, equipmentOwner: t.owner.name, equipmentLevel: t.owner.level,
      played: [false, false], active: false, target: t.rounds[m.round].target };
    const E = await engine();
    const room = {
      id, revision: 0, gameXpVersion: 1, gameXpActions: [0, 0],
      players: people.map(p => p?.member || null),
      playerProfiles: people.map(p => p ? { name: p.name, accountId: p.accountId, level: p.level } : null),
      expires: Math.max(t.startsAt + 7 * 86400000, time + 86400000),
      turnSeconds: t.turnSeconds, turnDeadline: null,
      timeControl: null, clockRemaining: null,
      match: { target: meta.target, wins: [0, 0], round: 1, creditedRound: 0, winner: null, number: 1 },
      state: E.createGame(t.discipline, { variant: t.variant, allowUndo: true }),
      equipment: clone(t.equipment), tournament: meta
    };
    await rooms.create(id, room);
    m.roomId = id;
    await mutateRoom(id, r => {
      if (r.tournament?.id !== t.id || r.tournament?.matchId !== m.id) throw Error('Tournament room collision');
      r.players = people.map(p => p?.member || null);
      r.playerProfiles = room.playerProfiles;
      if (!r.tournament.active && r.match.round === 1) r.tournament.startsAt = m.startsAt;
      r.tournament.ready = [...m.ready];
    });
    m.roomDirty = false;
  }
  async function advanceRoom(t, m, time, initial) {
    const E = await engine(), M = await series();
    let final = await mutateRoom(m.roomId, r => {
      const tm = r.tournament;
      if (r.match.winner != null) { tm.finishedAt ||= tm.gameEndedAt || time; return; }
      if (m.resolved) return;
      if (tm.startsAt == null || time < tm.startsAt || !r.players.every(Boolean)) return;
      r.state.allowUndo = true;
      if (!tm.active) {
        tm.active = true;
        // Determine first player and throw the first playable dice on the server.
        for (let tries = 0; tries < 64 && (r.state.phase === 'opening' || r.state.firstRollPending); tries++) E.action(r.state, r.state.turn, { type: 'roll' }, dice());
        if (r.state.phase === 'opening') throw Error('Opening dice did not resolve');
        r.turnDeadline = tm.startsAt + turnSecondsFor(r.state, r.turnSeconds) * 1000;
      }
      if (r.state.winner != null) {
        M.recordWin(r.match, r.state.winner, r.state.scores?.[r.state.winner] || 1);
        if (r.state.endReason === 'timeout-skips') {
          // Absence forfeits the entire match, not just one game of a long series.
          r.match.winner = r.state.winner;
          r.match.wins[r.state.winner] = Math.max(r.match.target, r.match.wins[r.state.winner]);
          tm.finishedAt ||= time;
          return;
        }
        if (r.match.winner != null) { tm.finishedAt ||= time; return; }
        tm.nextGameAt ||= (tm.gameEndedAt || time) + GAME_BREAK_MS;
        if (time < tm.nextGameAt) return;
        r.match = M.nextMatch(r.match);
        r.state = E.createGame(t.discipline, { variant: t.variant, allowUndo: true });
        tm.startsAt = tm.nextGameAt; tm.nextGameAt = null; tm.active = false; tm.gameEndedAt = null;
        r.gameXpMatchActions = [0, 1].map(i => (r.gameXpMatchActions?.[i] || 0) + (r.gameXpActions?.[i] || 0));
        r.gameXpActions = [0, 0]; r.gameExperience = null; r.transition = null; r.turnDeadline = null;
        return;
      }
      // Catch up missed deadlines using deadline time, never extend an absent
      // player's turn just because all clients were closed.
      for (let steps = 0; steps < 8 && r.turnDeadline && r.turnDeadline <= time && r.state.winner == null; steps++) {
        const at = r.turnDeadline;
        delete r.state.resignOffer;
        E.expireTurn(r.state, dice);
        M.recordWin(r.match, r.state.winner, r.state.scores?.[r.state.winner] || 1);
        r.transition = null;
        if (r.state.winner != null) {
          if (r.state.endReason === 'timeout-skips') {
            r.match.winner = r.state.winner;
            r.match.wins[r.state.winner] = Math.max(r.match.target, r.match.wins[r.state.winner]);
            tm.doubleNoShow = !tm.played.some(Boolean);
            if (tm.doubleNoShow) {
              r.state.winner = 'draw'; r.state.endReason = 'double-no-show'; r.state.scores = [0, 0];
              r.match.winner = 'draw'; r.match.wins = [0, 0];
            }
          }
          tm.gameEndedAt = at;
          if (r.match.winner != null) tm.finishedAt = at;
          r.turnDeadline = null;
        } else r.turnDeadline = at + turnSecondsFor(r.state, r.turnSeconds) * 1000;
      }
    }, initial);
    // A new game created above should start immediately when its deadline has
    // already arrived; two passes suffice without recursion or unbounded work.
    if (final && !final.tournament.active && final.tournament.startsAt <= time && final.state.winner == null && final.players.every(Boolean)) {
      final = await mutateRoom(m.roomId, r => {
        const tm = r.tournament;
        if (tm.active || tm.startsAt == null || tm.startsAt > time) return;
        tm.active = true;
        for (let n = 0; n < 64 && (r.state.phase === 'opening' || r.state.firstRollPending); n++) E.action(r.state, r.state.turn, { type: 'roll' }, dice());
        r.turnDeadline = tm.startsAt + turnSecondsFor(r.state, r.turnSeconds) * 1000;
      });
    }
    if (!final) throw Error('Tournament room missing');
    if (final.tournament.active && m.startedAt == null) m.startedAt = m.startsAt;
    if (t.notices && m.round === t.rounds.length - 1 && final.tournament.active) {
      t.notices.final ||= { sent: false };
    }
    m.scores = [...final.match.wins];
    if (final.match.winner != null) {
      const bothAbsent = final.tournament.doubleNoShow === true || final.state.endReason === 'timeout-skips' && !final.tournament.played.some(Boolean);
      resolve(t, m, bothAbsent ? null : m.playerIds[final.match.winner], bothAbsent ? 'double-no-show' : final.state.endReason, final.tournament.finishedAt || time);
    }
  }
  async function finance(t, checkpoint = async()=>{}) {
    if (t.prizeKind === 'tickets') {
      if (t.status === 'cancelled') { t.paymentsSettled = true; return; }
      if (t.status !== 'completed') return;
      if (!t.ticketAwards) {
        const ranks=t.winnerId?[{id:t.winnerId,index:0}]:[];
        for(let r=t.rounds.length-1;t.winnerId&&r>=0;r--)for(const m of t.rounds[r].matches)for(const id of m.playerIds)if(m.winnerId&&id&&id!==m.winnerId)ranks.push({id,index:2**(t.rounds.length-1-r)});
        t.ticketAwards=ranks.filter(p=>t.prizeAmounts[p.index]>0).map(p=>({entryId:p.id,place:p.index+1,amount:t.prizeAmounts[p.index],issuedAt:null}));
        await checkpoint();
      }
      t.paymentsSettled=t.ticketAwards.every(a=>a.issuedAt);
      return;
    }

    const send = async (key,userId,amount) => { if (!amount) return; if (!payments) error(503,'Оплата турнира временно недоступна.'); await payments.transfer({key:t.id+':'+key,userId,amount,onProgress:checkpoint}); };
    if (t.prizeFund && !t.fundPaid && t.status !== 'cancelled') { await send('fund',t.owner.poker21Id,-t.prizeFund); t.fundPaid=true; await checkpoint(); }
    if(t.prizeFund && !t.fundPaid && t.status==='cancelled' && payments?.pending){t.fundPaid=await payments.pending({key:t.id+':fund',userId:t.owner.poker21Id,amount:-t.prizeFund,onProgress:checkpoint});await checkpoint();}
    for (const e of [...t.entries]) {
      if(t.buyIn && !e.paid && (e.withdrawn || t.status==='cancelled') && payments?.pending){e.paid=await payments.pending({key:t.id+':entry:'+e.id,userId:e.poker21Id,amount:-t.buyIn,onProgress:checkpoint});await checkpoint();}
      if (t.buyIn && !e.paid && !e.withdrawn && t.status !== 'cancelled') { await send('entry:'+e.id,e.poker21Id,-t.buyIn);e.paid=true;await checkpoint(); }
      if(e.withdrawn) { if(t.buyIn && e.paid)await send('refund:'+e.id,e.poker21Id,t.buyIn);t.entries=t.entries.filter(x=>x.id!==e.id);await checkpoint(); }
    }
    if (!['completed','cancelled'].includes(t.status) || t.paymentsSettled) return;
    if(!t.paymentPlan) {
      if(t.status==='cancelled'||!t.winnerId) t.paymentPlan=[...t.entries.filter(e=>e.paid).map(e=>({key:'refund:'+e.id,userId:e.poker21Id,amount:t.buyIn})),{key:'fund-refund',userId:t.owner.poker21Id,amount:t.fundPaid?t.prizeFund||0:0}];
      else {
        const pool=t.entryType==='chips'?t.entries.length*t.buyIn:t.prizeFund||0;
        const ranks=[{id:t.winnerId,index:0}];
        for(let r=t.rounds.length-1;r>=0;r--){const index=2**(t.rounds.length-1-r);for(const m of t.rounds[r].matches)for(const id of m.playerIds)if(id&&id!==m.winnerId)ranks.push({id,index});}
        const shares=t.prizeMode==='fixed'?t.prizeAmounts:t.prizeShares||[100],denominator=t.prizeMode==='fixed'?shares.reduce((a,b)=>a+b,0):100;let used=0;
        t.paymentPlan=ranks.filter(p=>p.index<shares.length).map(({id,index})=>{const e=t.entries.find(e=>e.id===id);const amount=Math.floor(pool*shares[index]/denominator);used+=amount;return {key:'prize:'+id,userId:e.poker21Id,amount};});
        // Unoccupied prize places and integer rounding belong to the champion.
        if(t.paymentPlan.length)t.paymentPlan[0].amount+=pool-used;
      }
      await checkpoint();
    }
    for(const op of t.paymentPlan)await send(op.key,op.userId,op.amount);
    t.paymentsSettled=true;await checkpoint();
  }
  async function progress(t, time, focusRoom) {
    if (t.status === 'registration' && t.drawAt != null && time >= t.drawAt) draw(t, time, randomInt);
    if (!['drawn', 'running'].includes(t.status)) return;
    if (time >= t.startsAt && t.status === 'drawn') {
      t.status = 'running';
      if (notify) (t.notices ||= {}).start = { sent: false };
    }
    const ids = allMatches(t).filter(m => !m.resolved && m.roomId && (!focusRoom || m.roomId === focusRoom)).map(m => m.roomId);
    const snapshots = rooms.loadMany && ids.length ? await rooms.loadMany(ids) : {};
    for (const round of t.rounds) for (const m of round.matches) {
      if (m.resolved) continue;
      if (m.sourcesDone.every(Boolean) && m.playerIds.filter(Boolean).length < 2) {
        resolve(t, m, m.playerIds.find(Boolean) || null, 'bye', time);
        continue;
      }
      if (!m.roomId || m.roomDirty) await materialize(t, m, time);
      if (m.roomId && m.playerIds.every(Boolean) && (!focusRoom || m.roomId === focusRoom)) await advanceRoom(t, m, time, snapshots[m.roomId]);
    }
  }
  async function deliverAdvancements(t, checkpoint) {
    if (!notifyPlayer || t.status !== 'running' || !t.advancementNotices?.length) return;
    const matches = new Map(allMatches(t).map(m => [m.id, m]));
    const entries = new Map(t.entries.map(entry => [entry.id, entry]));
    const pending = t.advancementNotices.filter(notice => {
      const match = matches.get(notice.matchId);
      const entry = entries.get(notice.entryId);
      return match && !match.resolved && match.playerIds.includes(notice.entryId) && entry && !entry.withdrawn;
    });
    t.advancementNotices = pending;
    const due = pending.filter(notice => matches.get(notice.matchId).roomId && !(notice.retryAt > now()));
    if (!due.length) return;
    await checkpoint();
    const { advancementMessage } = require('./nards-tournament-notifications');
    for (let offset = 0; offset < due.length; offset += 25) {
      const sent = new Set();
      await Promise.all(due.slice(offset, offset + 25).map(async notice => {
        try {
          await notifyPlayer(entries.get(notice.entryId), advancementMessage(t, matches.get(notice.matchId), notice.entryId));
          sent.add(notice);
        } catch (e) {
          notice.retryAt = now() + Math.max(5000, (Number(e.retryAfter) || 0) * 1000);
        }
      }));
      t.advancementNotices = t.advancementNotices.filter(notice => !sent.has(notice));
      await checkpoint();
    }
  }
  async function deliverNotices(t, checkpoint = async () => {}) {
    await deliverAdvancements(t, checkpoint);
    if (!notify) return;
    if (t.status === 'registration' && (t.drawAt == null || now() < t.drawAt)) {
      const count = t.entries.filter(entry => !entry.withdrawn && (!t.buyIn || entry.paid)).length;
      if (count >= Math.ceil(t.capacity / 2)) (t.notices ||= {}).half ||= { sent: false };
      else if (t.notices?.half && !t.notices.half.sent) delete t.notices.half;
    } else if (t.notices?.half && !t.notices.half.sent) {
      delete t.notices.half;
    }
    if (!t.notices) return;
    if (t.status === 'cancelled' && t.notices.created && !t.notices.created.sent) {
      delete t.notices.created;
      return;
    }
    if (t.status === 'completed') t.notices.result ||= { sent: false };
    let saved = false;
    for (const [event, notice] of Object.entries(t.notices)) {
      if (notice.sent) continue;
      if (notice.retryAt > now()) break;
      if (!saved) { await checkpoint(); saved = true; }
      try {
        await notify(require('./nards-tournament-notifications').message(t, event));
        notice.sent = true;
        delete notice.retryAt;
      } catch (e) {
        notice.retryAt = now() + 60_000;
        console.error('[nards-tournament-notification]', t.id, event, e.message);
      }
      await checkpoint();
      if (!notice.sent) break;
    }
  }
  async function synchronize(id, focusRoom) {
    return store.withLock(id, async (t, checkpoint) => { await finance(t,checkpoint); await progress(t, now(), focusRoom); await finance(t,checkpoint); await deliverNotices(t,checkpoint); return t; });
  }
  async function call(member, body, access = {}) {
    const rawPerson = await profile(member, access.identity);
    if (!rawPerson?.accountId) error(403, 'Войдите в свой аккаунт.');
    const person = { ...rawPerson, level: require('./nards-equipment').availableLevel(rawPerson.level),
      name: String(rawPerson.name || 'Игрок').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80) || 'Игрок' };
    const admin = access.admin === true, time = now();
    if (body.action === 'list') {
      const list = await store.list();
      return { ok: true, isAdmin: admin, serverNow: time, tournaments: list.filter(t => !t.deletedAt).map(t => ({ id: t.id, title: t.title, status: t.status, startsAt: t.startsAt, drawAt: t.drawAt, capacity: t.capacity, count: t.entries.length, discipline: t.discipline, entryType:t.entryType||'free', buyIn:t.buyIn||0, self: !!ownEntry(t, person) })) };
    }
    if (body.action === 'create') {
      if (!admin) error(403, 'Создавать турниры может только администратор.');
      if (!/^[\w-]{12,100}$/.test(String(body.requestId || ''))) error(400, 'Обновите форму создания турнира.');
      const id = code('nards-tournament-create:' + member + ':' + body.requestId), previous = await store.get(id);
      if (previous) return publicView(await synchronize(id), person, admin, time);
      const t = { id, revision: 0, ...settings(body, time), createdAt: time, status: 'registration', entries: [], rounds: [],
        owner: { poker21Id: person.poker21Id, member, accountId: person.accountId, name: person.name, level: person.level },
        equipment: cleanEquipment(await rooms.savedEquipment(person.accountId), person.level) };
      if(t.prizeFund && !person.poker21Id)error(403,'Сначала привяжите аккаунт Poker21 в профиле.');
      if (notify) t.notices = { created: { sent: false } };
      if (!await store.create(t)) return publicView(await store.get(id), person, admin, time);
      return publicView(await synchronize(t.id), person, admin, time);
    }
    const id = String(body.id || '');
    if (!/^[A-HJ-NP-Z2-9]{10}$/.test(id)) error(400, 'Неверная ссылка на турнир.');
    if (body.action === 'delete') {
      if (!admin) error(403, 'Удалять турниры из списка может только администратор.');
      await store.withLock(id, async (t, checkpoint = async()=>{}) => {
        if (!['completed','cancelled'].includes(t.status)) error(409, 'Сначала завершите или отмените турнир.');
        await finance(t, checkpoint);
        if (!t.paymentsSettled) error(409, t.prizeKind==='tickets'?'Сначала отметьте выдачу всех призовых билетов.':'Дождитесь завершения выплат турнира.');
        t.deletedAt ||= time;
        t.deletedBy ||= person.accountId;
        await checkpoint();
        return t;
      });
      return {ok:true};
    }
    const t = await store.withLock(id, async (t, checkpoint = async()=>{}) => {
      if (body.action === 'remove-entry') {
        if (!admin) error(403, 'Удалять участников может только администратор.');
        if (t.status !== 'registration' || t.drawAt != null && time >= t.drawAt) error(409, 'Регистрация уже закрыта.');
        if (typeof body.entryId !== 'string' || !body.entryId) error(400, 'Укажите участника.');
        const target = t.entries.find(entry => entry.id === body.entryId);
        if (target && !target.withdrawn) {
          target.withdrawn = true;
          await checkpoint();
        }
        await finance(t, checkpoint);
        return t;
      }
      if(body.action==='leave' && t.status==='registration' && (t.drawAt==null || time<t.drawAt)){const leaving=ownEntry(t,person);if(leaving)leaving.withdrawn=true;await checkpoint();}
      if(body.action==='cancel' && admin && ['registration','drawn'].includes(t.status)){t.status='cancelled';t.reason='Турнир отменён администратором.';t.finishedAt=time;await checkpoint();}
      await finance(t,checkpoint);
      await progress(t, time);
      if (body.action === 'get') {
        await checkpoint();
        await finance(t, checkpoint);
        await deliverNotices(t,checkpoint);
        return t;
      }
      const entry = ownEntry(t, person);
      if (body.action === 'join') {
        if (entry) return t;
        if (t.status !== 'registration' || t.drawAt != null && time >= t.drawAt) error(409, 'Регистрация завершена.');
        if (t.entries.length >= t.capacity) error(409, 'Все места заняты.');
        if((t.buyIn || t.prizeFund) && !person.poker21Id) error(403,'Сначала привяжите аккаунт Poker21 в профиле.');
        t.entries.push({ id: crypto.randomUUID(), member, accountId: person.accountId, name: person.name, level: person.level, poker21Id:person.poker21Id, ready: false });
        await checkpoint();
        try{await finance(t,checkpoint);}catch(e){if(e.status===409){const last=t.entries.find(e=>e.accountId===person.accountId);if(last&&!last.paid){t.entries=t.entries.filter(e=>e!==last);await checkpoint();}}throw e;}
      } else if (body.action === 'leave') {
        if (t.status !== 'registration') error(409, 'Сетка уже сформирована.');
        if (entry) { entry.withdrawn=true;await checkpoint();await finance(t,checkpoint); }
      } else if (body.action === 'skip-break') {
        const match = entry && findMatch(t, body.matchId);
        if (t.status !== 'running' || !match || match.round === 0 || match.resolved ||
            !match.playerIds.includes(entry.id) || !match.playerIds.every(Boolean) || !(match.startsAt > time)) {
          error(409, 'Перерыв уже закончился или ещё не начался.');
        }
        match.skipBreakVotes ||= [];
        if (!match.skipBreakVotes.includes(entry.id)) match.skipBreakVotes.push(entry.id);
        if (match.playerIds.every(id => match.skipBreakVotes.includes(id))) {
          match.startsAt = time;
          match.roomDirty = true;
        }
      } else if (body.action === 'ready') {
        if (!entry || ['cancelled', 'completed'].includes(t.status)) error(409, 'Сначала зарегистрируйтесь в турнире.');
        entry.ready = true;
        const m = allMatches(t).find(m => !m.resolved && m.playerIds.includes(entry.id));
        if (m) { m.ready[m.playerIds.indexOf(entry.id)] = true; m.roomDirty = true; }
      } else if (body.action === 'start' || body.action === 'draw') {
        if (!admin) error(403, 'Только администратор может сформировать сетку.');
        if (t.status !== 'registration') error(409, 'Сетка уже сформирована.');
        if (t.entries.length < 2) error(409, 'Дождитесь хотя бы двух участников.');
        if (body.action === 'start' || t.startsAt == null) { t.startsAt = time; t.drawAt = time; }
        draw(t, time, randomInt);
      } else if (body.action === 'cancel') {
        if (!admin) error(403, 'Отменять турнир может только администратор.');
        if (t.status !== 'registration' && t.status !== 'drawn' && t.status !== 'cancelled') error(409, 'Начавшийся турнир отменить нельзя.');
        t.status = 'cancelled'; t.reason = 'Турнир отменён администратором.'; t.finishedAt = time;
        for (const m of allMatches(t)) if (m.roomId) await mutateRoom(m.roomId, r => { r.tournament.cancelled = true; r.turnDeadline = null; });
      } else if (body.action === 'issue-ticket') {
        if (!admin) error(403, 'Выдачу билетов отмечает только администратор.');
        if (t.prizeKind !== 'tickets' || t.status !== 'completed') error(409, 'Билеты доступны после финала.');
        const award=(t.ticketAwards||[]).find(a=>a.entryId===body.entryId);
        if(!award)error(404,'Призовой билет не найден.');
        award.issuedAt ||= time; award.issuedBy ||= person.accountId;
      } else error(400, 'Неизвестное действие турнира.');
      await checkpoint();
      await progress(t, time);
      await checkpoint();await finance(t,checkpoint);
      await deliverNotices(t,checkpoint);
      return t;
    });
    return publicView(t, person, admin, now());
  }
  async function sweep() {
    const list = await store.list(); let advanced = 0;
    for (const t of list.filter(t => !['completed', 'cancelled'].includes(t.status) || !t.paymentsSettled || Object.values(t.notices || {}).some(notice => !notice.sent))) {
      try { await synchronize(t.id); advanced++; } catch (e) { if (e.status !== 409) throw e; }
    }
    return { advanced };
  }
  async function avatarAccount(id, entryId) {
    const t = await store.get(id);
    return t?.entries.find(e => e.id === entryId && !e.withdrawn)?.accountId || '';
  }
  return { call, synchronize, sweep, avatarAccount };
};
module.exports.settings = settings;
module.exports.BREAK_MS = BREAK_MS;
