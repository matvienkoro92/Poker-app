'use strict';
const test = require('node:test'), assert = require('node:assert/strict');
const { fixture } = require('./helpers/cooler-flight-fixture.cjs');
const { QUEUE_KEY, flush } = require('../lib/cooler-flight-winner-notifications');
test('closing at 17 Moscow queues one immutable daily winner, never before cutoff', async () => {
  const f = fixture(), prefix = 'poker_app:cooler_flight:daily:v1:', date = '2026-10-06';
  const end = Date.parse(date + 'T17:00:00+03:00');
  f.boards.set(prefix + date, new Map([['Alice', 44 * 100000000 + 10]]));
  f.hashes.set(prefix + date + ':names', new Map([['Alice', 'Shkarubo']]));
  f.boards.set(prefix + 'pending', new Map([[date, end]]));
  f.setTime(end - 1); await f.request({ action: 'leaderboard' });
  assert.equal(f.hashes.get(QUEUE_KEY)?.size || 0, 0);
  f.setTime(end); await f.request({ action: 'leaderboard' });
  const winner = JSON.parse(f.hashes.get(QUEUE_KEY).get(date));
  assert.equal(winner.name, 'Shkarubo'); assert.equal(winner.score, 44);
  assert.equal(winner.prize, 'Билет на турнир вечера');
  await f.request({ action: 'leaderboard' });
  assert.equal(f.hashes.get(QUEUE_KEY).size, 1);
});
test('winner announcement uses the event group; failed delivery can retry without repeating success', async () => {
  const queue = new Map([['2026-10-03', JSON.stringify({ name: '<Winner>', score: 44, prize: 'Билет за 500 ₽', date: '2026-10-03' })]]);
  const locks = new Set(); let fail = true, calls = 0;
  const commands = async list => list.map(([op, key, ...args]) => {
    if (op === 'HGETALL') { assert.equal(key, QUEUE_KEY); return Object.fromEntries(queue); }
    if (op === 'HGET') return queue.get(args[0]);
    if (op === 'SET') { if (locks.has(key)) return null; locks.add(key); return 'OK'; }
    if (op === 'DEL') return locks.delete(key);
    if (op === 'HDEL') return queue.delete(args[0]);
    throw Error(op);
  });
  const deps = { token: 'test', eventChatId: async () => '-123', send: async (_, payload) => {
    calls++; assert.equal(payload.chatId, '-123'); assert.equal(payload.notificationScope, 'cooler-winner');
    assert.match(payload.text, /Победитель дня/); assert.match(payload.text, /&lt;Winner&gt;/);
    assert.match(payload.text, /03.10.2026/); assert.match(payload.text, /500 ₽/); assert.match(payload.text, /17:00 МСК/);
    return { ok: !fail };
  } };
  await assert.rejects(flush(commands, deps)); assert.equal(queue.size, 1);
  fail = false; await flush(commands, deps); await flush(commands, deps);
  assert.equal(calls, 2); assert.equal(queue.size, 0);
});
