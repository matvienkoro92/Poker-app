const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require.resolve('../app-hall-fame.js'), 'utf8');
const code = source.slice(source.indexOf('function hallFishLoadAchievementRows()'), source.indexOf('function openHallFishAchievementTab()'));
function deferred() { let resolve; const promise = new Promise(r => { resolve = r; }); return { promise, resolve }; }
test('tournament tops do not wait for optional services and late extras respect the active tab', async () => {
  const rating = deferred(), levels = deferred(), extras = deferred(), nards = deferred(), billiards = deferred(), calls = [];
  const c = {
    Promise, Object, hallFishAchievementRowsCache: null, hallFishAchievementRowsPromise: null,
    hallFishAchievementRatingDataReady: () => true,
    hallFishEnsureAchievementRatingData: () => { calls.push('rating'); return rating.promise; },
    hallFishLoadRows: () => { calls.push('levels'); return levels.promise; },
    hallFishLoadClubChoiceAchievementRows: () => { calls.push('choice'); return extras.promise; },
    hallFishLoadReferralRows: () => { calls.push('referrals'); return Promise.resolve([]); },
    hallFishLoadBilliardsAchievementRows: () => billiards.promise,
    hallFishLoadNardsAchievementRows: () => nards.promise,
    hallFishRenderHomePlayerMonth: () => {},
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
  nards.resolve({nardsKing:[{nick:'Nards winner'}]});
  await new Promise(r => setImmediate(r));
  assert.equal(data.nardsKing[0].nick, 'Nards winner');
  assert.equal(data.pendingCategories.nardsKing, false);
  assert.equal(data.pendingCategories.goldenBall, true);
  assert.equal(data.pendingExtras, true);
  billiards.resolve({goldenBall:[]});
  await new Promise(r => setImmediate(r));
  assert.equal(data.pendingExtras, false, 'unrelated services must not block monthly leader');
  extras.resolve([{ nick: 'Choice winner' }]);
  await new Promise(r => setImmediate(r));
  assert.equal(data.pendingExtras, false);
  assert.equal(data.clubChoice[0].nick, 'Choice winner');
  assert.equal(await c.hallFishLoadAchievementRows(), data);
});
test('public player list uses a stable URL and HTTP caching', async () => {
  let request;
  const c = { hallFishAchievementRowsCache:null, hallFishRatingRowsPromise: null, hallFishGetApiBase: () => 'https://example.test',
    hallFishFetch: (url, init) => { request = { url, init }; return Promise.resolve({ json: () => ({ ok: true }) }); },
    hallFishRowsFromCrmData: () => [], hallFishWriteRowsSessionCache() {} };
  vm.createContext(c);
  vm.runInContext(source.slice(source.indexOf('function hallFishFetchRows()'), source.indexOf('function hallFishEnsureModal()')), c);
  await c.hallFishFetchRows();
  assert.equal(request.url, 'https://example.test/api/player-crm?publicLevels=1&avatarFormat=url');
  assert.equal(request.init.cache, 'default');
});
test('background player refresh cannot orphan pending game achievements and leave skeletons forever',async()=>{
 const nards=deferred(),billiards=deferred(),paints=[];
 const c={Promise,Object,hallFishAchievementRowsCache:null,hallFishAchievementRowsPromise:null,hallFishAchievementRatingDataReady:()=>true,hallFishEnsureAchievementRatingData:()=>Promise.resolve(true),hallFishLoadRows:()=>Promise.resolve([]),hallFishLoadClubChoiceAchievementRows:()=>Promise.resolve([]),hallFishLoadReferralRows:()=>Promise.resolve([]),hallFishLoadSngChampionAchievementRows:()=>Promise.resolve([]),hallFishLoadBilliardsAchievementRows:()=>billiards.promise,hallFishLoadNardsAchievementRows:()=>nards.promise,hallFishAggregateTournamentAchievements:rows=>({king:rows}),hallFishAggregateClubChoiceRows:rows=>rows,hallFishAggregateSngChampionRows:rows=>rows,hallFishRenderHomePlayerMonth(){},document:{getElementById:()=>({hidden:false})},hallFishActiveTab:'achievements',hallFishSetAchievementState:(_,data)=>paints.push({pending:data.pendingExtras,nards:data.nardsKing})};
 vm.createContext(c);vm.runInContext(code,c);
 vm.runInContext(source.slice(source.indexOf('function hallFishRefreshVisibleRows('),source.indexOf('function hallFishFetchRows(')),c);
 c.hallFishGetApiBase=()=> 'https://example.test';c.hallFishFetch=()=>Promise.resolve({json:()=>Promise.resolve({ok:true})});c.hallFishRowsFromCrmData=()=>[{nick:'Fresh player'}];c.hallFishWriteRowsSessionCache=()=>{};c.hallFishRatingRowsPromise=null;
 vm.runInContext(source.slice(source.indexOf('function hallFishFetchRows('),source.indexOf('function hallFishEnsureModal(')),c);
 const data=await c.hallFishLoadAchievementRows();await c.hallFishFetchRows();assert.equal(c.hallFishAchievementRowsCache,data);c.hallFishRefreshVisibleRows([{nick:'Fresh player'}]);assert.equal(c.hallFishAchievementRowsCache,data);assert.equal(data.king[0].nick,'Fresh player');
 nards.resolve({nardsKing:[{nick:'Nards winner'}]});billiards.resolve({goldenBall:[]});await new Promise(r=>setImmediate(r));assert.equal(data.pendingExtras,false);assert.equal(paints.at(-1).pending,false);assert.equal(paints.at(-1).nards[0].nick,'Nards winner');
});
