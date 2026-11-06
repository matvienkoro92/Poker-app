'use strict';
const createService = require('../../lib/nards-tournaments');
module.exports = function fixture() {
  let time = 1800000000000;
  const tournaments = new Map(), roomMap = new Map(), locks = new Set();
  const clone = v => v == null ? v : structuredClone(v);
  const profiles = new Map(Array.from({ length: 70 }, (_, i) => ['m' + i, { name: 'Игрок ' + i, accountId: 'ID' + String(i).padStart(6, '0'), level: i === 0 ? 100 : 1 }]));
  const rooms = {
    load: async id => clone(roomMap.get(id)),
    create: async (id, r) => { if (roomMap.has(id)) return false; roomMap.set(id, clone(r)); return true; },
    cas: async (id, revision, r) => { if (roomMap.get(id)?.revision !== revision) return false; roomMap.set(id, clone(r)); return true; },
    savedEquipment: async () => ({ nardsBoard: 'club-aces', nardsInterior: 'club-obsidian', checkers: 'dragon' }),
    profile: async member => profiles.get(member)
  };
  const store = {
    get: async id => clone(tournaments.get(id)),
    create: async t => { if (tournaments.has(t.id)) return false; tournaments.set(t.id, clone(t)); return true; },
    list: async () => [...tournaments.values()].map(clone),
    withLock: async (id, fn) => {
      if (locks.has(id)) { const e = Error('locked'); e.status = 409; throw e; }
      locks.add(id);
      try {
        const t = clone(tournaments.get(id));
        if (!t) { const e = Error('not found'); e.status = 404; throw e; }
        const before = JSON.stringify(t), result = await fn(t);
        if (before !== JSON.stringify(t)) t.revision++;
        tournaments.set(id, clone(t)); return clone(result);
      } finally { locks.delete(id); }
    }
  };
  const service = createService({ store, rooms, profile: rooms.profile, now: () => time, randomInt: () => 0, dice: () => [6, 1] });
  const call = (member, action, id, extra = {}) => service.call(member, { action, id, ...extra }, { admin: member === 'm0' });
  async function create(options = {}) {
    return call('m0', 'create', null, { requestId: 'test-tournament-0001', title: 'Кубок двух тузов', capacity: 4, startsAt: time + 120000, drawAt: time + 60000, target: 5, ...options });
  }
  async function seed(n = 4, options = {}) {
    const t = await create(options);
    for (let i = 1; i <= n; i++) await call('m' + i, 'join', t.id);
    await call('m0', 'draw', t.id);
    return call('m1', 'get', t.id);
  }
  async function finish(id, player = 0, points = 1, reason = 'borne-off') {
    const r = roomMap.get(id);
    r.state.winner = player; r.state.endReason = reason; r.state.winPoints = points; r.state.scores[player] = points; r.state.phase = 'finished'; r.turnDeadline = null;
    const M = await import('../../scripts/billiards/match.mjs');
    M.recordWin(r.match, player, points); r.tournament.played[player] = true; r.revision++;
  }
  return { service, call, create, seed, finish, rooms, roomMap, tournaments, profiles, now: () => time, time: n => { time = n; } };
};
