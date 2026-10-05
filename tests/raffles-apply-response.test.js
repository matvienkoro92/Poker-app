'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(require.resolve('../app-raffles.js'),'utf8');
// Execute the initial response application through the accounting block.
const start=source.indexOf('  function applyRafflesData(');
const end=source.indexOf('        if (rafflesIsAdmin && typeof window.pokerMarkAdminAccess',start);
function fixture(){
 const updates=[];
 const context={rafflesRoot:{classList:{remove(){}},dataset:{}},rafflesArchiveLoaded:false,readPendingCompletedRaffleId:()=>'',readPendingActiveRaffleId:()=>'',rafflesCompletedRuntime:{setCurrentWeekIssueTotals:(...args)=>updates.push(args)}};
 vm.createContext(context);vm.runInContext(source.slice(start,end)+'\n}',context);
 return {context,updates};
}
test('server and cached responses render without an out-of-scope loading variable',()=>{
 for(const options of [undefined,{}, {keepCurrentOnLoading:true}]){
  const {context,updates}=fixture();
  context.applyRafflesData({ok:true,isAdmin:true,viewerDetailsDeferred:true},false,options);
  assert.equal(context.rafflesRoot.dataset.resultsLoaded,'1');assert.equal(context.rafflesIsAdmin,true);
  assert.deepEqual(updates,[[null,'loading']]);
 }
});
test('deadline refresh preserves accounting totals while still applying raffle response',()=>{
 const {context,updates}=fixture();
 context.applyRafflesData({ok:true,isAdmin:true},false,{deadlineRefresh:true});
 assert.equal(context.rafflesRoot.dataset.resultsLoaded,'1');assert.equal(updates.length,0);
});
