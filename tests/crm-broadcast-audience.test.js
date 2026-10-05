'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require.resolve('../app-player-crm-runtime-core.js'), 'utf8');
const code = source.slice(source.indexOf('  function fetchBroadcastAudience()'), source.indexOf('  function prefetchBroadcastAudience()'));
function fixture(fetch, abort = true) {
  const context = { state: { tab: 'broadcast' }, key: 'all', fetch, AbortController: abort ? AbortController : undefined,
    getApiBaseSafe: () => 'https://example.invalid', crmQuery: () => '?mode=send',
    broadcastAudiencePeriodKey: () => context.key, writeBroadcastAudienceCache: () => {}, renderBroadcastOptions: () => {},
    setTimeout: fn => { context.deadline = fn; return 1; }, clearTimeout: () => {}, Date };
  vm.createContext(context); vm.runInContext(code, context); return context;
}
test('a stuck audience request times out and permits a successful retry without AbortController', async () => {
  const c = fixture(() => new Promise(() => {}), false);
  const pending = c.fetchBroadcastAudience(); c.deadline();
  assert.equal(await pending, false); assert.equal(c.state.broadcastAudiencePrefetchPromise, null);
  c.fetch = async () => ({ ok: true, json: async () => ({ ok: true, players: [{ id: '1' }] }) });
  assert.equal(await c.fetchBroadcastAudience(), true);
  assert.equal(c.state.broadcastPlayers[0].id, '1');
});
test('an old response cannot overwrite a newer audience request', async () => {
  const resolvers = [];
  const c = fixture(() => new Promise(resolve => resolvers.push(resolve)));
  const first = c.fetchBroadcastAudience(), second = c.fetchBroadcastAudience();
  resolvers[1]({ ok: true, json: async () => ({ ok: true, players: [{ id: 'new' }] }) });
  assert.equal(await second, true);
  resolvers[0]({ ok: true, json: async () => ({ ok: true, players: [{ id: 'old' }] }) });
  assert.equal(await first, false); assert.equal(c.state.broadcastPlayers[0].id, 'new');
});
test('a response for a different period cannot become the send audience', async () => {
  let resolve;
  const c = fixture(() => new Promise(r => { resolve = r; }));
  const pending = c.fetchBroadcastAudience(); c.key = 'changed';
  resolve({ ok: true, json: async () => ({ ok: true, players: [{ id: 'old' }] }) });
  assert.equal(await pending, false); assert.equal(c.state.broadcastAudienceLoadedAt, undefined);
});

test('failed refresh never sends a campaign, even if old audience data exists', async () => {
  const start = source.indexOf('  function runBroadcastWithFreshAudience(options)');
  const end = source.indexOf('  function sendBroadcastNow()', start);
  let sent = 0, result = '';
  const c = { state: { broadcastAudienceLoadedAt: 1, broadcastAudiencePeriodKey: 'all' }, Date,
    broadcastAudiencePeriodKey: () => 'all', setBroadcastResult: text => { result = text; },
    loadBroadcastAudience: () => { c.state.broadcastAudienceLoadedAt = Date.now(); return Promise.resolve(false); },
    renderBroadcastOptions: () => {}, runBroadcast: () => { sent++; } };
  vm.createContext(c); vm.runInContext(source.slice(start, end), c);
  c.runBroadcastWithFreshAudience({ allBatches: true });
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(sent, 0); assert.equal(c.state.broadcastAudienceSendPending, false);
  assert.match(result, /Не удалось обновить/);
});
