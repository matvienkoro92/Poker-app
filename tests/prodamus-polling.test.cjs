'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const source=fs.readFileSync(require.resolve('../app-admin-deposits.js'),'utf8');
function fixture(overrides={}){
 const requests=[],paint=[],listeners={};
 const c={dialog:{open:true},loaded:true,busy:false,editing:false,statisticsOpen:false,filter:'active',prodamusInFlight:false,generation:0,data:{pendingProdamusPayments:[]},document:{visibilityState:'visible',addEventListener:(k,f)=>listeners[k]=f},window:{addEventListener:(k,f)=>listeners[k]=f},host:{querySelector:sel=>sel==='.deposits__payment-form-grid'?{insertAdjacentHTML:(_,html)=>paint.push(html)}:null},pendingProdamusHtml:()=>JSON.stringify(c.data.pendingProdamusPayments),api:()=>new Promise((resolve,reject)=>requests.push({resolve,reject})),...overrides};
 vm.createContext(c);vm.runInContext(source.slice(source.indexOf('  async function refreshPendingProdamus()'),source.indexOf('  function pendingProdamusHtml()')),c);
 return {c,requests,paint,listeners};
}
test('payments update during editing, statistics and other tabs without rerendering forms',async()=>{
 for(const options of [{editing:true},{statisticsOpen:true},{filter:'archive'}]){
  const {c,requests,paint}=fixture(options),p=c.refreshPendingProdamus();assert.equal(requests.length,1);
  requests[0].resolve({pendingProdamusPayments:[{id:'new'}]});await p;
  assert.equal(c.data.pendingProdamusPayments[0].id,'new');assert.equal(paint.length,1);
 }
});
test('focus and visibility refresh immediately without overlapping requests',async()=>{
 const {c,requests,listeners}=fixture();const p=listeners.focus();listeners.visibilitychange();assert.equal(requests.length,1);
 requests[0].resolve({pendingProdamusPayments:[]});await p;assert.equal(c.prodamusInFlight,false);
 c.document.visibilityState='hidden';await c.refreshPendingProdamus();assert.equal(requests.length,1);
 c.document.visibilityState='visible';listeners.visibilitychange();assert.equal(requests.length,2);
 requests[1].resolve({pendingProdamusPayments:[]});
});
test('late responses never overwrite a new ledger snapshot or a closed session',async()=>{
 for(const change of [c=>c.data={pendingProdamusPayments:[{id:'saved'}]},c=>c.generation++,c=>c.dialog.open=false]){
  const {c,requests,paint}=fixture(),p=c.refreshPendingProdamus();change(c);
  requests[0].resolve({pendingProdamusPayments:[{id:'stale'}]});await p;
  assert.equal(paint.length,0);assert.equal(c.prodamusInFlight,false);
 }
});
test('failed request releases poll guard for next refresh',async()=>{
 const {c,requests}=fixture(),p=c.refreshPendingProdamus();requests[0].reject(Error('offline'));await p;
 assert.equal(c.prodamusInFlight,false);const next=c.refreshPendingProdamus();assert.equal(requests.length,2);requests[1].resolve({pendingProdamusPayments:[]});await next;
});
