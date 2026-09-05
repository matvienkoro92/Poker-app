const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
test('active cards return without calling Telegram or weekly accounting', async () => {
  const source = fs.readFileSync(require.resolve('../lib/api-handlers/raffles'), 'utf8');
  const start = source.indexOf('  if (req.method === "GET" && raffleActiveScopeRequested(req)) {');
  const end = source.indexOf('\n  // POST:', start);
  let body;
  const context = {
    req: { method: 'GET' }, admin: true,
    raffleActiveScopeRequested: () => true,
    bypassRafflePublicListCacheRequested: () => false,
    loadRaffleActiveOnlyPayload: async () => ({ activeRaffles: [{ id: 'one' }] }),
    getRaffleSubscriptionGateForViewer: () => { throw Error('must be deferred'); },
    loadCurrentWeekRaffleIssueTotals: () => { throw Error('must be deferred'); },
    res: { status: () => ({ json: value => { body = value; } }) }
  };
  await vm.runInNewContext('(async function () {' + source.slice(start, end) + '})()', context);
  assert.equal(body.activeRaffles[0].id, 'one');
  assert.equal(body.viewerDetailsDeferred, true);
});
