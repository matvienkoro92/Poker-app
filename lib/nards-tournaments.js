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
  const capacity = Number(body.capacity ?? 16), startsAt = Number(body.startsAt);
  const drawAt = Number(body.drawAt ?? startsAt);
  const turnSeconds = Number(body.turnSeconds ?? 45);
  const discipline = body.discipline ?? 'long', variant = body.variant ?? 'classic';
  if (!Number.isInteger(capacity) || capacity < 2 || capacity > 64) error(400, 'Укажите от 2 до 64 участников.');
  if (!['long', 'short'].includes(discipline) || !['classic', 'crazy', 'six-one'].includes(variant) || discipline === 'short' && variant !== 'classic') error(400, 'Выберите вариант нард.');
  if (![15, 30, 45, 60].includes(turnSeconds)) error(400, 'Выберите 15, 30, 45 или 60 секунд на ход.');
  if (!Number.isSafeInteger(startsAt) || startsAt < time + 60000 || startsAt > time + 30 * 86400000) error(400, 'Начало должно быть через минуту или позже, в пределах 30 дней.');
  if (!Number.isSafeInteger(drawAt) || drawAt <= time || drawAt > startsAt) error(400, 'Регистрация должна закрыться до начала турнира.');
  const count = Math.ceil(Math.log2(capacity));
  const targets = body.roundTargets ?? Array(count).fill(Number(body.target ?? 3));
  if (!Array.isArray(targets) || targets.length !== count || targets.some(n => !Number.isInteger(n) || n < 1 || n > 25)) error(400, 'Задайте от 1 до 25 очков для каждого раунда.');
  const title = String(body.title || 'Турнир по нардам').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, 80);
  if (!title) error(400, 'Введите название турнира.');
  return { title, capacity, startsAt, drawAt, turnSeconds, discipline, variant, roundTargets: [...targets] };
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
    turnSeconds: t.turnSeconds, roundTargets: t.roundTargets, breakSeconds: 300,
    points: { single: 1, mars: 2, koks: 3 }, isAdmin: admin, revision: t.revision,
    entries: t.entries.map(e => ({ id: e.id, name: e.name, ready: e.ready, self: e.id === mine?.id })),
    rounds: t.rounds.map(r => ({ index: r.index, target: r.target, matches: r.matches.map(m => ({
      id: m.id, index: m.index, playerIds: m.playerIds, ready: m.ready, scores: m.scores,
      resolved: m.resolved, winnerId: m.winnerId, reason: m.reason || '',
      roomId: m.roomId, startsAt: m.startsAt, finishedAt: m.finishedAt || null
    })) })),
    self: mine ? { id: mine.id, ready: mine.ready, matchId: own?.id || null, roomId: own?.roomId || null, opponentRoomId: opponentMatch?.roomId || null } : null,
    winnerId: t.winnerId || null
  };
}

module.exports = function createTournamentService({ store, rooms, profile, now = Date.now, randomInt = crypto.randomInt, dice = () => [crypto.randomInt(1, 7), crypto.randomInt(1, 7)] }) {
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
      state: E.createGame(t.discipline, { variant: t.variant, allowUndo: false }),
      equipment: clone(t.equipment), tournament: meta
    };
    await rooms.create(id, room);
    m.roomId = id;
    await mutateRoom(id, r => {
      if (r.tournament?.id !== t.id || r.tournament?.matchId !== m.id) throw Error('Tournament room collision');
      r.players = people.map(p => p?.member || null);
      r.playerProfiles = room.playerProfiles;
      if (r.tournament.startsAt == null) r.tournament.startsAt = m.startsAt;
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
        r.state = E.createGame(t.discipline, { variant: t.variant, allowUndo: false });
        tm.startsAt = tm.nextGameAt; tm.nextGameAt = null; tm.active = false; tm.gameEndedAt = null;
        r.gameXpMatchActions = [0, 1].map(i => (r.gameXpMatchActions?.[i] || 0) + (r.gameXpActions?.[i] || 0));
        r.gameXpActions = [0, 0]; r.gameExperience = null; r.transition = null; r.turnDeadline = null;
        return;
      }
      // Catch up missed deadlines using deadline time, never extend an absent
      // player's turn just because all clients were closed.
      for (let steps = 0; steps < 8 && r.turnDeadline && r.turnDeadline <= time && r.state.winner == null; steps++) {
        const at = r.turnDeadline;
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
    m.scores = [...final.match.wins];
    if (final.match.winner != null) {
      const bothAbsent = final.tournament.doubleNoShow === true || final.state.endReason === 'timeout-skips' && !final.tournament.played.some(Boolean);
      resolve(t, m, bothAbsent ? null : m.playerIds[final.match.winner], bothAbsent ? 'double-no-show' : final.state.endReason, final.tournament.finishedAt || time);
    }
  }
  async function progress(t, time, focusRoom) {
    if (t.status === 'registration' && time >= t.drawAt) draw(t, time, randomInt);
    if (!['drawn', 'running'].includes(t.status)) return;
    if (time >= t.startsAt) t.status = 'running';
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
  async function synchronize(id, focusRoom) {
    return store.withLock(id, async t => { await progress(t, now(), focusRoom); return t; });
  }
  async function call(member, body, access = {}) {
    const rawPerson = await profile(member, access.identity);
    if (!rawPerson?.accountId) error(403, 'Войдите в свой аккаунт.');
    const person = { ...rawPerson, level: require('./nards-equipment').availableLevel(rawPerson.level),
      name: String(rawPerson.name || 'Игрок').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80) || 'Игрок' };
    const admin = access.admin === true, time = now();
    if (body.action === 'list') {
      const list = await store.list();
      return { ok: true, isAdmin: admin, serverNow: time, tournaments: list.map(t => ({ id: t.id, title: t.title, status: t.status, startsAt: t.startsAt, drawAt: t.drawAt, capacity: t.capacity, count: t.entries.length, discipline: t.discipline, self: !!ownEntry(t, person) })) };
    }
    if (body.action === 'create') {
      if (!admin) error(403, 'Создавать турниры может только администратор.');
      if (!/^[\w-]{12,100}$/.test(String(body.requestId || ''))) error(400, 'Обновите форму создания турнира.');
      const id = code('nards-tournament-create:' + member + ':' + body.requestId), previous = await store.get(id);
      if (previous) return publicView(previous, person, admin, time);
      const t = { id, revision: 0, ...settings(body, time), createdAt: time, status: 'registration', entries: [], rounds: [],
        owner: { member, accountId: person.accountId, name: person.name, level: person.level },
        equipment: cleanEquipment(await rooms.savedEquipment(person.accountId), person.level) };
      if (!await store.create(t)) return publicView(await store.get(id), person, admin, time);
      return publicView(t, person, admin, time);
    }
    const id = String(body.id || '');
    if (!/^[A-HJ-NP-Z2-9]{10}$/.test(id)) error(400, 'Неверная ссылка на турнир.');
    const t = await store.withLock(id, async t => {
      await progress(t, time);
      const entry = ownEntry(t, person);
      if (body.action === 'join') {
        if (entry) return t;
        if (t.status !== 'registration' || time >= t.drawAt) error(409, 'Регистрация завершена.');
        if (t.entries.length >= t.capacity) error(409, 'Все места заняты.');
        t.entries.push({ id: crypto.randomUUID(), member, accountId: person.accountId, name: person.name, level: person.level, ready: false });
      } else if (body.action === 'leave') {
        if (t.status !== 'registration') error(409, 'Сетка уже сформирована.');
        if (entry) t.entries = t.entries.filter(e => e !== entry);
      } else if (body.action === 'ready') {
        if (!entry || ['cancelled', 'completed'].includes(t.status)) error(409, 'Сначала зарегистрируйтесь в турнире.');
        entry.ready = true;
        const m = allMatches(t).find(m => !m.resolved && m.playerIds.includes(entry.id));
        if (m) { m.ready[m.playerIds.indexOf(entry.id)] = true; m.roomDirty = true; }
      } else if (body.action === 'draw') {
        if (!admin) error(403, 'Только администратор может сформировать сетку.');
        if (t.status !== 'registration') error(409, 'Сетка уже сформирована.');
        if (t.entries.length < 2) error(409, 'Дождитесь хотя бы двух участников.');
        draw(t, time, randomInt);
      } else if (body.action === 'cancel') {
        if (!admin) error(403, 'Отменять турнир может только администратор.');
        if (t.status !== 'registration' && t.status !== 'drawn') error(409, 'Начавшийся турнир отменить нельзя.');
        t.status = 'cancelled'; t.reason = 'Турнир отменён администратором.'; t.finishedAt = time;
        for (const m of allMatches(t)) if (m.roomId) await mutateRoom(m.roomId, r => { r.tournament.cancelled = true; r.turnDeadline = null; });
      } else if (body.action !== 'get') error(400, 'Неизвестное действие турнира.');
      await progress(t, time);
      return t;
    });
    return publicView(t, person, admin, now());
  }
  async function sweep() {
    const list = await store.list(); let advanced = 0;
    for (const t of list.filter(t => !['completed', 'cancelled'].includes(t.status))) {
      try { await synchronize(t.id); advanced++; } catch (e) { if (e.status !== 409) throw e; }
    }
    return { advanced };
  }
  return { call, synchronize, sweep };
};
module.exports.settings = settings;
module.exports.BREAK_MS = BREAK_MS;
