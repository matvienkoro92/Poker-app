'use strict';
const test = require('node:test'), assert = require('node:assert/strict'), fs = require('node:fs'), vm = require('node:vm');
function fixture(raw, failed = false) {
  const source = fs.readFileSync(require.resolve('../lib/business-event-tracking'), 'utf8');
  const module = { exports: {} };
  vm.runInNewContext(source, { module, require(name) {
    if (name === './redis') return { pipeline: async commands => {
      assert.deepEqual(JSON.parse(JSON.stringify(commands)), [['HGET', 'poker_app:attribution:v1:contexts', 'ID123456']]);
      return failed ? [{ error: 'unavailable' }] : [{ result: raw }];
    } };
    if (name === './tracking-own-source') return { ownContext: async (context, subjects) => {
      assert.deepEqual([...subjects], ['ID123456']); return context;
    } };
    if (name.startsWith('node:')) return require(name);
    return require('../lib/' + name.replace('./', ''));
  } });
  return module.exports.businessEventWrites;
}
const input = { accountId: 'ID123456', type: 'daily_poker_spin', operationId: 'confirmed-operation', at: Date.parse('2026-10-30T21:30:00Z') };
test('account source, Moscow business date and stable operation ID are preserved without a browser session', async () => {
  const raw = JSON.stringify({ first: { ref: 'aaaaaaaa', at: input.at - 100 }, last: { ref: 'bbbbbbbb', at: input.at - 10 } });
  const build = fixture(raw), first = await build(input), retry = await build({ ...input, at: input.at + 1000 });
  const attribution = first.commands.find(c => c[1] === 'poker_app:attribution:v1:events:ID123456');
  const event = JSON.parse(attribution[3]);
  assert.equal(event.ref, 'bbbbbbbb'); assert.equal(event.authenticated, true); assert.equal(event.at, input.at);
  assert.equal(attribution[2], retry.commands.find(c => c[1] === attribution[1])[2]);
  assert.ok(first.commands.some(c => c[1] === 'poker_app:analytics:v1:events:day:2026-10-30'));
  assert.equal(first.values[0].value, raw, 'source must still match when the business transaction commits');
});
test('direct visitor is counted in analytics without inventing a referral', async () => {
  const writes = await fixture(null)({ ...input, type: 'raffle_joined', section: 'raffle_one' });
  assert.equal(writes.commands.length, 3);
  assert.equal(JSON.parse(writes.commands[2][3]).ref, null, 'late source linking can recover the real event');
  const event = JSON.parse(writes.commands[1][3]);
  assert.equal(event.a, input.accountId); assert.equal(event.n, 'raffle_one'); assert.equal(event.t, 'raffle_joined');
  assert.equal(writes.values[0].value, '');
});
test('unreadable source and unverified identity cannot silently lose or invent an event', async () => {
  await assert.rejects(() => fixture(null, true)(input), /business_tracking_unavailable/);
  await assert.rejects(() => fixture(null)({ ...input, accountId: '' }), /invalid_business_event/);
});
test('admin business history remains available for the link self-exclusion filter without polluting general analytics', async () => {
 const writes = await fixture(null)({ ...input, includeAnalytics: false });
 assert.equal(writes.commands.length, 1);
 assert.equal(writes.commands[0][1], 'poker_app:attribution:v1:events:ID123456');
});
