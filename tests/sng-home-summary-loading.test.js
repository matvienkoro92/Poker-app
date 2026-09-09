const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(require.resolve('../app-sng-champions.js'),'utf8');
const code=source.slice(source.indexOf('  function fetchHomeSummary('),source.indexOf('  function loadState()'));
function setup(preload){const calls=[];const c={window:{__pokerSngHomeSummaryPromise:preload,sessionStorage:{setItem(){}}},state:null,homeSummaryLoadedAt:0,homeSummaryInFlight:null,HOME_SUMMARY_CACHE_MS:45000,baseUrl:()=>'',API_PATH:'/api/sng-champions',fetch:(url,options)=>{calls.push({url,options});return Promise.resolve({json:()=>Promise.resolve({ok:true,summary:true})});}};vm.createContext(c);vm.runInContext(code,c);return{c,calls};}
test('summary reuses early request without another fetch',async()=>{const h=setup(Promise.resolve({ok:true,summary:true}));await h.c.fetchHomeSummary();assert.equal(h.calls.length,0);});
test('normal summary is cacheable; forced refresh bypasses old response',async()=>{const h=setup(null);await h.c.fetchHomeSummary();assert.equal(h.calls[0].url,'/api/sng-champions?summary=1');assert.equal(h.calls[0].options.cache,'default');await h.c.fetchHomeSummary(true);assert.equal(h.calls[1].options.cache,'reload');});

test('home renderer starts while the early summary request is still pending', async () => {
  const bootstrap = fs.readFileSync(require.resolve('../app-home-widgets-bootstrap.js'), 'utf8');
  const block = bootstrap.slice(bootstrap.indexOf('  if (!window.__pokerSngHomeSummaryPromise)'), bootstrap.indexOf('  refreshClubChoiceRoundBadge();', bootstrap.indexOf('  if (!window.__pokerSngHomeSummaryPromise)')));
  let resolveResponse;
  const events = [];
  const context = {
    window: {}, WIDGETS: { sngChampions: { domain: 'sng' } },
    fetch: () => { events.push('request'); return new Promise(resolve => { resolveResponse = resolve; }); },
    ensureDomain: domain => { events.push(domain); return Promise.resolve(); }
  };
  vm.runInNewContext(block, context);
  assert.deepEqual(events, ['request', 'sng']);
  resolveResponse({ json: () => Promise.resolve({ ok: true, summary: true }) });
  assert.equal((await context.window.__pokerSngHomeSummaryPromise).ok, true);
});
