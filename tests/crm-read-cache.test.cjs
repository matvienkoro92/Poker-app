'use strict';
const test = require('node:test'), assert = require('node:assert/strict');
const entries = new Map(), commands = [];
let down = false;
const redis = { isConfigured: () => true, pipeline: async batch => {
  commands.push(...batch);
  if (down) throw Error('offline');
  return batch.map(([op, key, value]) => {
    if (op === 'SET') entries.set(key, value);
    return { result: op === 'GET' ? entries.get(key) || null : 'OK' };
  });
} };
require.cache[require.resolve('../lib/redis')] = { exports: redis };
const { cachedRead } = require('../lib/crm-read-cache');
test('compressed cache survives a new caller, coalesces concurrent builds and isolates identities', async () => {
  let builds = 0;
  const build = async () => { builds++; await new Promise(r => setImmediate(r)); return { count: 17, actors: ['A', 'B'] }; };
  const values = await Promise.all([cachedRead('test', 'first', 30, build), cachedRead('test', 'first', 30, build)]);
  assert.equal(builds, 1); assert.deepEqual(values[0], values[1]);
  assert.deepEqual(await cachedRead('test', 'first', 30, build), values[0]); assert.equal(builds, 1);
  assert([...entries.values()].every(raw => raw.startsWith('gz:')));
  await cachedRead('test', 'second', 30, build); assert.equal(builds, 2);
});
test('expiry, corrupted cache and unavailable Redis fall back to live values', async () => {
  let builds = 0; const build = async () => ({ count: ++builds });
  await cachedRead('expiry', 'x', 30, build);
  const key = commands.find(c => c[0] === 'SET' && c[1].includes(':expiry:'))[1];
  const { gzipSync } = require('node:zlib');
  entries.set(key, 'gz:' + gzipSync(JSON.stringify({ expires: Date.now() - 1, value: { count: 99 } })).toString('base64'));
  assert.equal((await cachedRead('expiry', 'x', 30, build)).count, 2);
  entries.set(key, 'gz:invalid'); assert.equal((await cachedRead('expiry', 'x', 30, build)).count, 3);
  down = true;
  try { assert.equal((await cachedRead('expiry', 'x', 30, build)).count, 4); } finally { down = false; }
});
test('partial results and failed builds do not poison subsequent reads', async () => {
  const before = entries.size;
  await cachedRead('partial', 'x', 30, async () => ({ failed: true }), v => !v.failed);
  assert.equal(entries.size, before);
  await assert.rejects(cachedRead('failed', 'x', 30, async () => { throw Error('failed'); }));
  assert.equal(await cachedRead('failed', 'x', 30, async () => 4), 4);
});
