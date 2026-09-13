const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const src=fs.readFileSync(require.resolve('../app-profile-pokerplus.js'),'utf8');
async function run(replies){let calls=0;const ctx={setTimeout(fn){fn();},pokerPlusFetchJsonWithTimeout(){const r=replies[calls++];return r instanceof Error?Promise.reject(r):Promise.resolve(r);},isPokerPlusAbortError:e=>e.name==='AbortError'};vm.createContext(ctx);vm.runInContext(src.slice(src.indexOf('  function pokerPlusFetchRefreshWithRetry('),src.indexOf('  function isPokerPlusAbortError(')),ctx);try{return {data:await ctx.pokerPlusFetchRefreshWithRetry('/test',{},15000),calls};}catch(error){return {error,calls};}}
test('successful first attempt sends one request',async()=>{const r=await run([{ok:true}]);assert.equal(r.calls,1);assert.equal(r.data.ok,true);});
test('one click recovers from transient HTTP, network and upstream errors',async()=>{for(const first of [{_httpStatus:502},{_httpStatus:503},{_httpStatus:504},new TypeError('Failed to fetch'),{ok:true,syncError:'Poker21 пока не отдал свежие данные, показали сохранённые.'}]){const r=await run([first,{ok:true}]);assert.equal(r.calls,2);assert.equal(r.data.ok,true);}});
test('persistent failure stops after second attempt',async()=>{const r=await run([new TypeError('network'),new TypeError('network')]);assert.equal(r.calls,2);assert.ok(r.error);});
test('timeout goes to saved-profile check without issuing duplicate refresh',async()=>{const e=new Error('timeout');e.name='AbortError';const r=await run([e]);assert.equal(r.calls,1);assert.equal(r.error,e);});
test('key and authentication failures are not retried',async()=>{for(const data of [{_httpStatus:401},{_httpStatus:403},{needsCiphertext:true,syncError:'fetch failed'},{syncError:'Poker21 не принял обновление по сохранённому ключу.'}]){const r=await run([data]);assert.equal(r.calls,1);assert.equal(r.data,data);}});
test('refresh button starts on first click and ignores repeated clicks until completion',async()=>{
 let finish,calls=0;const states=[],disabled=[];
 const ctx={pokerPlusButtonRefreshPromise:null,pokerPlusButtonResetTimer:null,pokerPlusPostTimeoutCheckSeq:0,pokerPlusProfileLinked:true,
  clearTimeout(){},setTimeout(){return 1;},setFeedback(){},setPokerPlusRefreshButtonsState:s=>states.push(s),setPokerPlusRefreshButtonsDisabled:s=>disabled.push(s),setPokerPlusRefreshButtonText(){},
  loadProfile:()=>{calls++;return new Promise(r=>{finish=r;});},pokerPlusRunFinally:(p,f)=>p.finally(f)};
 vm.createContext(ctx);vm.runInContext(src.slice(src.indexOf('  function refreshPokerPlusFromButton('),src.indexOf('  if (refreshBtn.dataset.bound',src.indexOf('  function refreshPokerPlusFromButton('))),ctx);
 const first=ctx.refreshPokerPlusFromButton(),second=ctx.refreshPokerPlusFromButton();assert.equal(first,second);await Promise.resolve();assert.equal(calls,1);assert.equal(disabled[0],true);finish({refreshStatus:'done'});await first;assert.equal(disabled.at(-1),false);assert.equal(states.at(-1),'done');
});
