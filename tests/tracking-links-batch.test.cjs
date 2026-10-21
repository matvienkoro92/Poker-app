'use strict';
const test = require('node:test'), assert = require('node:assert/strict'), fs = require('node:fs'), vm = require('node:vm');
function fixture(fail = false) {
  const commands = [], ids = ['aaaaaaaa', 'bbbbbbbb'];
  const redis = { isConfigured: () => true, pipeline: async batch => { commands.push(...batch); return batch.map(([op, key]) => {
    if (op === 'ZREVRANGE') return { result: ids };
    if (op === 'HMGET') return { result: key.endsWith(':meta') ? ids.map(id => JSON.stringify({ label: id, params: { category: 'Group' } })) : ['10', '20'] };
    if (op === 'EVAL') return fail ? { error: 'failed' } : { result: [7, 3, 15] };
    throw Error(op);
  }); } };
  const scope = { module: { exports: {} }, process: { env: {} }, require: name => {
    if (name === '../redis') return redis;
    if (name === '../tracking-read-scope') return { withReadScope: fn => fn() };
    if (name === '../resolve-telegram-auth') return { resolveTelegramIdentity: () => ({ id: 'admin' }), memberIdFromIdentity: () => 'admin' };
    if (name === '../api-auth') return { isAdminIdentity: () => true };
    if (name === '../api-limits') return { rateLimit: () => false };
    return require(name.startsWith('../') ? '../lib/' + name.slice(3) : name);
  } };
  vm.runInNewContext(fs.readFileSync('lib/api-handlers/tracking-links.js', 'utf8'), scope);
  return { commands, call: async () => { let data, code; await scope.module.exports({ method: 'GET', query: {} }, { setHeader() {}, status(value) { code = value; return this; }, json(value) { data = value; } }); return { code, data }; } };
}
test('list batches metadata and totals without mixing link counters', async () => {
  const f = fixture(), result = await f.call();
  assert.equal(result.code, 200); assert.equal(result.data.links.length, 2);
  assert.equal(result.data.links[0].totalClicks, 10); assert.equal(result.data.links[1].totalClicks, 20);
  for (const link of result.data.links) { assert.equal(link.uniqueClicks, 7); assert.equal(link.activeVisitors, 3); assert.equal(link.actionEvents, 15); }
  assert.equal(f.commands.length, 5); assert.equal(f.commands.filter(c => c[0] === 'HMGET').length, 2);
});
test('failed counter reads cannot appear as zero statistics', async () => { assert.equal((await fixture(true).call()).code, 503); });
