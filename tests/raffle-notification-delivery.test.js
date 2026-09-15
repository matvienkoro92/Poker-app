const test = require('node:test');
const assert = require('node:assert/strict');
const { createRaffleNotificationService } = require('../lib/raffle-notifications');
const { createRetryQueue, KEY } = require('../lib/raffle-notification-retries');

function fixture(t) {
  const values = new Map(), hashes = new Map(), sets = new Map(), messages = [], pushes = [];
  const originalFetch = global.fetch;
  let telegramOk = true;
  global.fetch = async (url, options) => {
    assert.match(url, /^https:\/\/api.telegram.org\/botTEST\/sendMessage$/);
    if (!telegramOk) return { ok: false, status: 403, text: async () => 'Forbidden: bot was blocked' };
    messages.push(JSON.parse(options.body)); return { ok: true, status: 200, json: async () => ({ ok: true }) };
  };
  t.after(() => { global.fetch = originalFetch; });
  const pipeline = async commands => commands.map(([cmd, key, value, ...args]) => {
    if (cmd === 'GET') return { result: values.get(key) || null };
    if (cmd === 'SET') { if (args.includes('NX') && values.has(key)) return { result: null }; values.set(key, value); return { result: 'OK' }; }
    if (cmd === 'DEL') { values.delete(key); return { result: 1 }; }
    if (cmd === 'HGET') return { result: hashes.get(key + ':' + value) || null };
    if (cmd === 'SMEMBERS') return { result: sets.get(key) || [] };
    if (cmd === 'HGETALL') return { result: [] };
    throw new Error('Unexpected command ' + cmd);
  });
  const service = createRaffleNotificationService({ botToken: 'TEST', redisPipeline: pipeline, sendWebPushToMember: async (id, payload) => { pushes.push({ id, payload }); return 1; } });
  const raffle = { id: 'delivery', title: 'Tickets', status: 'drawn', groups: [{ count: 2, prize: 'Ticket 300 ₽' }], winners: [] };
  const winner = (slot = 'initial_0') => ({ accountId: 'ID100001', userId: 'tg_1001', prize: 'Ticket 300 ₽', groupIndex: 0, winnerReadySlotId: slot });
  function store() { values.set('poker_app:raffle:delivery', JSON.stringify(raffle)); }
  return { service, values, hashes, sets, messages, pushes, raffle, winner, store, setTelegramOk(value) { telegramOk = value; } };
}

test('same player winning in separate batches gets both notifications; retries stay deduplicated', async t => {
  const h = fixture(t), first = h.winner(), second = h.winner('initial_1');
  h.raffle.winners = [first]; h.store(); await h.service.notifyWinnersRaffleCompleted('delivery', h.raffle, [first]);
  h.raffle.winners = [first, second]; h.store(); await h.service.notifyWinnersRaffleCompleted('delivery', h.raffle, [second]);
  await h.service.notifyWinnersRaffleCompleted('delivery', h.raffle, [first, second]);
  assert.equal(h.messages.length, 2); assert.equal(h.pushes.length, 2);
  assert.notEqual(h.pushes[0].payload.tag, h.pushes[1].payload.tag);
});

test('email primary account still receives push without a Telegram identity', async t => {
  const h = fixture(t); h.raffle.winners = [{ ...h.winner(), userId: 'manual_player' }]; h.store();
  h.hashes.set('poker_app:id_to_user:ID100001', 'mail_ID100001');
  await h.service.notifyWinnersRaffleCompleted('delivery', h.raffle);
  assert.equal(h.messages.length, 0); assert.equal(h.pushes.length, 1); assert.equal(h.pushes[0].id, 'ID100001');
});

test('email primary resolves a verified linked Telegram account', async t => {
  const h = fixture(t); h.raffle.winners = [{ ...h.winner(), userId: 'mail_ID100001' }]; h.store();
  h.hashes.set('poker_app:id_to_user:ID100001', 'mail_ID100001');
  h.sets.set('poker_app:account_users:ID100001', ['tg_777', 'tg_1001']);
  h.hashes.set('poker_app:visitor_dt_ids:tg_777', 'ID999999');
  h.hashes.set('poker_app:visitor_dt_ids:tg_1001', 'ID100001');
  await h.service.notifyWinnersRaffleCompleted('delivery', h.raffle);
  assert.equal(h.messages[0].chat_id, '1001'); assert.equal(h.messages.length, 1);
});

test('manual winner with username and no account can resolve the verified Telegram username', async t => {
  const h = fixture(t); h.raffle.winners = [{ ...h.winner(), accountId: '', userId: 'manual_player', telegramUsername: 'player' }]; h.store();
  h.hashes.set('poker_app:visitor_username_to_user:player', 'tg_1001');
  h.hashes.set('poker_app:visitor_usernames:tg_1001', 'player');
  await h.service.notifyWinnersRaffleCompleted('delivery', h.raffle);
  assert.equal(h.messages[0].chat_id, '1001'); assert.equal(h.pushes[0].id, 'tg_1001');
});

test('failed Telegram delivery is retryable independently of a successful push', async t => {
  const h = fixture(t); h.raffle.winners = [h.winner()]; h.store(); h.setTelegramOk(false);
  await h.service.notifyWinnersRaffleCompleted('delivery', h.raffle);
  assert.equal(h.messages.length, 0); assert.equal(h.pushes.length, 1);
  h.setTelegramOk(true); await h.service.notifyWinnersRaffleCompleted('delivery', h.raffle);
  assert.equal(h.messages.length, 1); assert.equal(h.pushes.length, 1);
});

test('retry queue only reads due jobs, retains failures, and removes completed jobs', async () => {
  const jobs = new Map(), processed = []; let now = 1000000;
  const queue = createRetryQueue({ now: () => now, processRaffle: async id => { processed.push(id); if (id === 'failed') throw Error('offline'); return id === 'pending'; }, pipeline: async commands => commands.map(([cmd, key, ...args]) => {
    assert.equal(key, KEY);
    if (cmd === 'ZADD') { const nx = args[0] === 'NX'; if (nx) args.shift(); if (!nx || !jobs.has(args[1])) jobs.set(args[1], args[0]); return { result: 1 }; }
    if (cmd === 'ZRANGEBYSCORE') return { result: [...jobs].filter(([, score]) => score <= now).slice(0, 10).map(([id]) => id) };
    if (cmd === 'ZREM') { jobs.delete(args[0]); return { result: 1 }; }
    throw Error(cmd);
  }) });
  await queue.enqueue('done'); await queue.enqueue('pending'); await queue.enqueue('failed');
  assert.equal((await queue.drain()).processed, 0);
  now += 120000; const result = await queue.drain();
  assert.equal(result.failed, 1); assert.deepEqual(processed.sort(), ['done', 'failed', 'pending']);
  assert.equal(jobs.has('done'), false); assert.equal(jobs.get('failed'), now + 120000);
  assert.equal((await queue.drain()).processed, 0);
});
