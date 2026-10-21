'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require.resolve('../app-player-crm-runtime-core.js'), 'utf8');
const code = source.slice(source.indexOf('  function expandCrmAudience(data)'), source.indexOf('  function loadCrmData('));
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

test('compact audience preserves recipient IDs, channels, filters and labels', () => {
  const { compactAudience } = require('../lib/crm-audience-payload');
  const player = { id: 'ID123456', accountId: 'ID123456', dtId: 'ID123456', name: 'Игрок', handle: '@player',
    telegramIds: ['tg_1234567'], pokerPlusUserId: '9988', channels: { bot: true, push: false, gazette: true },
    deposits: { all: 900, '30': 500 }, lastMessageDays: 31, lastDepositDays: 40, lastTouchDays: 32,
    touches: [{ at: 'invalid' }, { at: '2026-10-21T00:00:00Z', private: 'note' }], appBlocked: true,
    crm: { excludeBroadcast: true, note: 'Private note' }, timeline: ['unused UI history'] };
  const c = fixture(() => {});
  const data = c.expandCrmAudience(compactAudience([player])), row = data.players[0];
  for (const key of ['id', 'accountId', 'dtId', 'name', 'handle', 'pokerPlusUserId', 'appBlocked', 'lastMessageDays', 'lastDepositDays', 'lastTouchDays']) assert.equal(row[key], player[key]);
  assert.equal(row.channels.bot, true); assert.equal(row.channels.push, false);
  assert.equal(row.deposits['30'], 500); assert.equal(row.deposits.all, 900);
  assert.equal(row.telegramIds[0], 'tg_1234567'); assert.equal(row.crm.excludeBroadcast, true);
  assert.equal(row.touches[0].at, '2026-10-21T00:00:00Z');
  assert(!JSON.stringify(data).includes('Private note')); assert.equal(row.timeline, undefined);
});
test('opening another CRM tab never schedules background audience loading', () => {
  assert.doesNotMatch(source, /scheduleBroadcastAudiencePrefetch|function prefetchBroadcastAudience/);
  assert.match(source, /if \(state\.tab === "broadcast"\)/);
});
