const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require.resolve('../app-hall-fame.js'), 'utf8');
const code = source.slice(source.indexOf('function hallFishLoadAchievementRows()'), source.indexOf('function openHallFishAchievementTab()'));
function deferred() { let resolve; const promise = new Promise(r => { resolve = r; }); return { promise, resolve }; }
test('tournament tops do not wait for optional services and late extras respect the active tab', async () => {
  const rating = deferred(), levels = deferred(), extras = deferred(), calls = [];
  const c = {
    Promise, Object, hallFishAchievementRowsCache: null, hallFishAchievementRowsPromise: null,
    hallFishAchievementRatingDataReady: () => true,
    hallFishEnsureAchievementRatingData: () => { calls.push('rating'); return rating.promise; },
    hallFishLoadRows: () => { calls.push('levels'); return levels.promise; },
    hallFishLoadClubChoiceAchievementRows: () => { calls.push('choice'); return extras.promise; },
    hallFishLoadReferralRows: () => { calls.push('referrals'); return Promise.resolve([]); },
    hallFishLoadSngChampionAchievementRows: () => { calls.push('sng'); return Promise.resolve([]); },
    hallFishAggregateTournamentAchievements: () => ({ dayHero: [{ nick: 'Winner' }] }),
    hallFishAggregateClubChoiceRows: rows => rows, hallFishAggregateSngChampionRows: rows => rows,
    document: { getElementById: () => ({ hidden: false }) }, hallFishActiveTab: 'levels',
    hallFishSetAchievementState: () => { throw new Error('must not replace levels'); }
  };
  vm.createContext(c); vm.runInContext(code, c);
  const pending = c.hallFishLoadAchievementRows();
  assert.deepEqual(calls.sort(), ['choice', 'levels', 'rating', 'referrals', 'sng']);
  assert.equal(c.hallFishLoadAchievementRows(), pending);
  rating.resolve(true); levels.resolve([]);
  const data = await pending;
  assert.equal(data.dayHero[0].nick, 'Winner');
  assert.equal(data.pendingExtras, true);
  extras.resolve([{ nick: 'Choice winner' }]);
  await new Promise(r => setImmediate(r));
  assert.equal(data.pendingExtras, false);
  assert.equal(data.clubChoice[0].nick, 'Choice winner');
  assert.equal(await c.hallFishLoadAchievementRows(), data);
});
test('public player list uses a stable URL and HTTP caching', async () => {
  let request;
  const c = { hallFishRatingRowsPromise: null, hallFishGetApiBase: () => 'https://example.test',
    hallFishFetch: (url, init) => { request = { url, init }; return Promise.resolve({ json: () => ({ ok: true }) }); },
    hallFishRowsFromCrmData: () => [], hallFishWriteRowsSessionCache() {} };
  vm.createContext(c);
  vm.runInContext(source.slice(source.indexOf('function hallFishFetchRows()'), source.indexOf('function hallFishEnsureModal()')), c);
  await c.hallFishFetchRows();
  assert.equal(request.url, 'https://example.test/api/player-crm?publicLevels=1&avatarFormat=url');
  assert.equal(request.init.cache, 'default');
});
