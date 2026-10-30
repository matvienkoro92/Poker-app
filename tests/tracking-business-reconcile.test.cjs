'use strict';
const test = require('node:test'), assert = require('node:assert/strict');
const { missingEvents, sourceAt } = require('../lib/tracking-business-reconcile');
const refs = new Set(['aaaaaaaa', 'bbbbbbbb']);
const contexts = [{ first: { ref: 'aaaaaaaa', at: 100 }, last: { ref: 'bbbbbbbb', at: 300 } }];
const receipt = { type: 'daily_poker_spin', operationId: 'spin-key', at: 200, proof: { key: 'game_one' } };
test('recovery respects actual operation time and observed source changes', () => {
  assert.equal(sourceAt(contexts, [], 99, refs), null);
  assert.equal(sourceAt(contexts, [], 200, refs), 'aaaaaaaa');
  assert.equal(sourceAt(contexts, [], 301, refs), 'bbbbbbbb');
  const events = [{ type: 'referral_opened', at: 150, ref: 'bbbbbbbb' }];
  assert.equal(sourceAt(contexts, events, 200, refs), 'bbbbbbbb');
  const recovered = missingEvents('ID123456', contexts, [], [receipt], refs);
  assert.equal(recovered[0].event.at, 200); assert.equal(recovered[0].event.ref, 'aaaaaaaa');
  assert.equal(recovered[0].proof.key, 'game_one');
});
test('receipt retries and legacy client events cannot inflate spin totals', () => {
  assert.equal(missingEvents('ID123456', contexts, [], [receipt, receipt], refs).length, 1);
  assert.equal(missingEvents('ID123456', contexts, [{ id: 'evt_daily_spin-key', type: 'daily_poker_spin' }], [receipt], refs).length, 0);
  const recovered = missingEvents('ID123456', contexts, [], [receipt], refs);
  assert.equal(missingEvents('ID123456', contexts, recovered.map(m => m.event), [receipt], refs).length, 0);
});
test('one raffle is one participation across devices and rejoins', () => {
  const join = { type: 'raffle_joined', operationId: 'raffle_one', section: 'raffle_one', at: 200 };
  assert.equal(missingEvents('ID123456', contexts, [], [join, { ...join, at: 210 }], refs).length, 1);
  assert.equal(missingEvents('ID123456', contexts, [{ id: 'old_device_event', type: 'raffle_joined', section: 'raffle_one' }], [join], refs).length, 0);
});
test('unknown operation date, pre-arrival receipt and ambiguous source are never invented', () => {
  assert.equal(missingEvents('ID123456', contexts, [], [{ ...receipt, at: NaN }, { ...receipt, at: 99 }], refs).length, 0);
  assert.equal(sourceAt([...contexts, { first: { ref: 'bbbbbbbb', at: 100 }, last: { ref: 'bbbbbbbb', at: 300 } }], [], 200, refs), null);
});
