'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const source=fs.readFileSync(require.resolve('../app-player-crm-runtime-core'),'utf8');
const code=source.slice(source.indexOf('  function loadCrmLinkPreview('),source.indexOf('  function crmLinkSummaryHtml('));
test('opening players during summary waits, uses its saved report and does not request another calculation',async()=>{
 let finishSummary;const calls=[],body={innerHTML:''},players={innerHTML:''};
 const details={dataset:{},getAttribute:()=> 'campaign-a',querySelector:s=>s.includes('preview-body')?body:players};
 const context={esc:String,crmLinkAggregateHtml:()=> 'summary',crmLinkPlayersMatrixHtml:()=> 'players',authQuerySafe:()=> '?auth=1',getApiBaseSafe:()=> '',encodeURIComponent,fetch:url=>{
 calls.push(url);
 if(url.includes('summary=1'))return new Promise(resolve=>finishSummary=()=>resolve({json:async()=>({ok:true,summary:{},reportToken:'saved-report'})}));
 return Promise.resolve({json:async()=>({ok:true,rows:[{actor:'ID1'}],nextOffset:null})});
 }};
 vm.createContext(context);vm.runInContext(code,context);
 context.loadCrmLinkPreview(details);
 const loading=context.loadCrmInlineLinkPlayers(details);
 assert.equal(calls.length,1);assert.match(players.innerHTML,/Ждём/);
 finishSummary();await loading;
 // The async loader starts the fetch; wait for its response handlers.
 await new Promise(resolve=>setImmediate(resolve));
 assert.equal(calls.length,2);assert.match(calls[1],/reportToken=saved-report/);
 assert.equal(details.dataset.playersComplete,'1');
 context.loadCrmLinkPreview(details);await context.loadCrmInlineLinkPlayers(details);
 assert.equal(calls.length,2);
});
test('a failed save cannot silently trigger a second full calculation',async()=>{
 const players={innerHTML:''};let calls=0;
 const details={dataset:{previewLoaded:'1'},querySelector:()=>players};
 const context={fetch:()=>calls++};vm.createContext(context);vm.runInContext(code,context);
 await context.loadCrmInlineLinkPlayers(details);
 assert.equal(calls,0);assert.match(players.innerHTML,/Обновить расчёт/);
});
