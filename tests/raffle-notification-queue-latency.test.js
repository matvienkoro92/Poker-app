'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { createRetryQueue } = require('../lib/raffle-notification-retries');
test('issued prize delivery becomes due immediately without postponing earlier work', async () => {
  const calls = [];
  const queue = createRetryQueue({pipeline: async commands => { calls.push(...commands); return [{result:1}]; }, now: () => 1000 });
  await queue.enqueue('issued', {immediate:true});
  assert.deepEqual(calls[0].slice(2), ['LT',1000,'issued']);
  await queue.enqueue('ordinary');
  assert.deepEqual(calls[1].slice(2), ['NX',121000,'ordinary']);
});
