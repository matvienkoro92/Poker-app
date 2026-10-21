'use strict';
const test = require('node:test'), assert = require('node:assert/strict');
let reads = 0, scans = 0, writes = 0;
const redis = { pipeline: async commands => commands.map(([op, key]) => {
  if (op === 'HSET') writes++; else reads++;
  return { result: key };
}), sscanall: async () => { scans++; return ['actor']; } };
require.cache[require.resolve('../lib/redis')] = { exports: redis };
const scope = require('../lib/tracking-read-scope');
test('reuses individual Redis reads and membership scans only inside one request', async () => {
  await scope.withReadScope(async () => {
    const values = await Promise.all([
      scope.pipeline([['HGET', 'a', 'x'], ['HGET', 'a', 'x']]),
      scope.pipeline([['HGET', 'a', 'x'], ['HGET', 'b', 'x']]),
      scope.sscanall('members'), scope.sscanall('members')
    ]);
    assert.deepEqual(values[0], [{ result: 'a' }, { result: 'a' }]);
    assert.equal(reads, 2); assert.equal(scans, 1);
    await scope.withReadScope(() => scope.pipeline([['HGET', 'a', 'x']]));
    assert.equal(reads, 2);
  });
  await scope.withReadScope(() => scope.pipeline([['HGET', 'a', 'x']])); assert.equal(reads, 3);
});
test('never memoizes writes or shares reads between concurrent requests', async () => {
  await scope.withReadScope(async () => {
    await scope.pipeline([['HSET', 'a', 'x', 1]]); await scope.pipeline([['HSET', 'a', 'x', 2]]);
  }); assert.equal(writes, 2);
  const before = reads;
  await Promise.all([scope.withReadScope(() => scope.pipeline([['HGET', 'a', 'x']])), scope.withReadScope(() => scope.pipeline([['HGET', 'a', 'x']]))]);
  assert.equal(reads - before, 2);
});
