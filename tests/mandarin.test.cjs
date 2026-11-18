'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const {applyOperation,view}=require('../lib/admin-deposits');
const id='11111111-2222-4333-8444-555555555555',at=Date.now()-1000;
const invoice=()=>({invoice_id:id,currency:'RUB',invoice_status:'paid',amount:'1100.00',total_paid:'1100.00',remaining_amount:'0.00',payment_breakdown:[{method:'sbp',status:'success',amount:'1100.00',timestamp:new Date(at).toISOString()}]});
function fixture(){
 let clockOffset=0,provider=invoice(),providerStatus=200,storageFail=false,groupFail=false,topicFail=false,groupCalls=0,topicCalls=0,fetchCalls=0,keyResponses=null;const groupTexts=[];
 const env={MANDARIN_API_KEY:'fixture-key',TELEGRAM_BOT_TOKEN:'fixture-token',PRODAMUS_WITHDRAWALS_CHAT_ID:'-123'};
 const redis=require('./helpers/payment-redis.cjs')();
 const pipeline=redis.pipeline;redis.pipeline=(commands)=>{if(storageFail && commands.some(c=>c[0]==='EVAL'&&c[2]===2))throw Error('offline');return pipeline(commands);};
 const modules={};function load(file){if(modules[file])return modules[file];const ctx={module:{exports:{}},process:{env},URLSearchParams,Buffer,Date:class extends Date {static now(){return Date.now()+clockOffset;}},Intl,AbortSignal,console:{error(){}},fetch:async(url,options)=>{
  fetchCalls++;assert.equal(url,'https://secure-app.mandarin.io/api/v1/public/invoices/'+id+'/check-state/');if(keyResponses){const r=keyResponses[options.headers['X-Api-Key']];assert.ok(r);if(r.error)throw Error('offline');return {ok:r.status===200,status:r.status,json:async()=>r.invoice};}assert.equal(options.headers['X-Api-Key'],'fixture-key');assert.equal(options.redirect,'error');return {ok:providerStatus===200,status:providerStatus,json:async()=>provider};
 },require:name=>name.endsWith('/redis')?redis:name.endsWith('/telegram-deposit-withdrawals')?{STORE_KEY:'ledger'}:name.endsWith('/mandarin-payments')?load('lib/mandarin-payments.js'):name.endsWith('/telegram-group-policy')?{guardedFetch:async(url,options,scope)=>{assert.equal(scope,'mandarin-payment');assert.equal(JSON.parse(options.body).chat_id,'-123');groupCalls++;groupTexts.push(JSON.parse(options.body).text);if(groupFail)throw Error('offline');return {ok:true,json:async()=>({ok:true})};}}:name.endsWith('/payment-income-topic')?{notify:async()=>{topicCalls++;if(topicFail)throw Error('offline');return true;}}:require(name.startsWith('.')?path.resolve(path.dirname(file),name):name)};vm.runInNewContext(fs.readFileSync(file,'utf8'),ctx,{filename:file});return modules[file]=ctx.module.exports;}
 const handler=load('lib/api-handlers/mandarin-webhook.js'),payments=load('lib/mandarin-payments.js');
 async function call(body={invoice_id:id},method='POST'){const res={setHeader(){},status(n){this.code=n;return this},end(){},json(b){this.body=b}};await handler({method,body,headers:{'content-type':'application/json'}},res);return res;}
 return {call,payments,env,advance(){clockOffset+=61000;},get state(){return JSON.parse(redis.strings.get('ledger')||'{}')},set keyResponses(v){keyResponses=v},set invoice(v){provider=v},set status(v){providerStatus=v},set storageFail(v){storageFail=v},set groupFail(v){groupFail=v},set topicFail(v){topicFail=v},get groupTexts(){return groupTexts},get groupCalls(){return groupCalls},get topicCalls(){return topicCalls},get fetchCalls(){return fetchCalls}};
}
test('Mandarin ignores callback money and status, verifies API, stores one receipt under concurrent retries',async()=>{
 const f=fixture();const results=await Promise.all([f.call({invoice_id:id,amount:'999999',invoice_status:'failed'}),f.call()]);assert.deepEqual(results.map(r=>r.code),[200,200]);assert.equal(f.state.paymentFormPayments.length,1);assert.equal(f.state.paymentFormPayments[0].amount,110000);assert.equal(f.state.paymentFormPayments[0].confirmedAt,at);assert.equal(f.groupCalls,0);
 await f.payments.retryPending();await f.payments.retryPending();assert.equal(f.groupCalls,1);assert.equal(f.topicCalls,1);assert.ok(f.state.paymentFormPayments[0].notifiedAt);assert.ok(f.state.paymentFormPayments[0].incomeNotifiedAt);
});
test('Mandarin rejects bad IDs, missing keys, inaccessible invoices and inconsistent provider data without a receipt',async()=>{
 const f=fixture();assert.equal((await f.call({invoice_id:'../other'})).code,400);assert.equal(f.fetchCalls,0);delete f.env.MANDARIN_API_KEY;assert.equal((await f.call()).code,503);f.env.MANDARIN_API_KEY='fixture-key';f.status=403;assert.equal((await f.call()).code,403);f.status=200;
 for(const patch of [{currency:'USD'},{invoice_id:'22222222-2222-4333-8444-555555555555'},{amount:'1650.00',total_paid:'1650.00'},{amount:'1100.001'},{remaining_amount:'1'},{total_paid:'1000.00'},{is_test:true},{payment_breakdown:[{method:'credit',status:'success',amount:'1100.00',timestamp:new Date(at).toISOString()}]},{payment_breakdown:[]}]){f.invoice={...invoice(),...patch};assert.equal((await f.call()).code,422);}
 assert.equal(f.state.paymentFormPayments,undefined);
});
test('pending or partially-paid invoices never become confirmed receipts',async()=>{
 const f=fixture();for(const status of ['processing','partially_paid']){f.invoice={...invoice(),invoice_status:status};assert.equal((await f.call()).code,200);}assert.equal(f.state.paymentFormPayments,undefined);
});
test('group and income topic retries are independent; a failed target cannot cause duplicate sends to the other',async()=>{
 const f=fixture();await f.call();f.groupFail=true;await assert.rejects(f.payments.retryPending());assert.equal(f.topicCalls,1);assert.ok(f.state.paymentFormPayments[0].incomeNotifiedAt);f.groupFail=false;f.advance();await f.payments.retryPending();assert.equal(f.groupCalls,2);assert.equal(f.topicCalls,1);
 const g=fixture();await g.call();g.topicFail=true;await g.payments.retryPending();assert.equal(g.groupCalls,1);assert.equal(g.state.paymentFormPayments[0].incomeNotifiedAt,undefined);g.topicFail=false;g.advance();await g.payments.retryPending();assert.equal(g.groupCalls,1);assert.equal(g.topicCalls,2);
});
test('Mandarin tick confirmation owns the amount and timestamp, rejects double/mixed/cross-provider assignment, and void reopens once',()=>{
 const base={revision:0,entries:[],requests:[],paymentFormPayments:[{id,providerId:'mandarin',status:'confirmed',amount:110000,confirmedAt:at}]};
 const body={action:'channel-operation',channelId:'mandarin',direction:'income',mandarinPaymentId:id,amount:1,room:'X',playerId:'123',requestId:'mandarin_operation_0001'};
 let state=applyOperation(base,body,'manager').state;assert.equal(state.channelOperations[0].amount,100000);assert.equal(state.channelOperations[0].grossAmount,110000);assert.equal(state.channelOperations[0].createdAt,at);assert.equal(view(state).pendingMandarinPayments.length,0);assert.equal(view(state).paymentForms.providers.find(p=>p.id==='mandarin').total,100000);
 assert.throws(()=>applyOperation(state,{...body,requestId:'mandarin_operation_0002'},'manager'),/уже записан/);
 assert.throws(()=>applyOperation(base,{...body,channelId:'prodamus'},'manager'),/недоступен/);
 assert.throws(()=>applyOperation(base,{...body,robokassaPaymentId:'123'},'manager'),/один платёж/);
 assert.throws(()=>applyOperation(base,{...body,direction:'outgoing'},'manager'),/только приход/);
 state=applyOperation(state,{action:'void-channel-operation',operationId:body.requestId,requestId:'mandarin_operation_0003'},'manager').state;assert.equal(view(state).pendingMandarinPayments.length,1);assert.equal(view(state).paymentForms.providers.find(p=>p.id==='mandarin').total,100000);
});
test('paused Mandarin links cannot be issued, copied or replayed',()=>{
 const {issuePaymentLink}=require('../lib/deposit-link-routing');
 const {paymentForms}=require('../lib/deposit-payment-forms');
 assert.deepEqual(paymentForms().providers.find(p=>p.id==='mandarin').options,[]);
 for(const amount of [100000,150000,200000]){
  const state={};
  const providers=new Set();
  for(let i=0;i<4;i++)providers.add(issuePaymentLink(state,{amount,requestId:'routing_request_000'+i},'manager').link.providerId);
  assert.deepEqual([...providers].sort(),amount===150000?['robokassa']:['prodamus','robokassa']);
 }
 const requestId='previous_mandarin_0001',amount=100000;
 const state={paymentLinkIssues:[{id:requestId,actor:'manager',link:{providerId:'mandarin',amount}}]};
 assert.throws(()=>issuePaymentLink(state,{requestId,amount},'manager'),{status:409});
});

test('a failed durable save returns 503 and never acknowledges a receipt',async()=>{const f=fixture();f.storageFail=true;assert.equal((await f.call()).code,503);assert.equal(f.state.paymentFormPayments,undefined);assert.equal(f.groupCalls,0);f.storageFail=false;assert.equal((await f.call()).code,200);assert.equal(f.state.paymentFormPayments.length,1);});

function amountInvoice(value){return {...invoice(),amount:value,total_paid:value,payment_breakdown:[{...invoice().payment_breakdown[0],amount:value}]};}
test('each Mandarin link uses its own API key and exact charge; an inaccessible key does not block another valid link',async()=>{
 for(const [number,value] of [[1,'1100.00'],[2,'1650.00'],[3,'2180.00']]){
  const f=fixture();f.env.MANDARIN_API_KEY_2='key-2';f.env.MANDARIN_API_KEY_3='key-3';
  const keys=['fixture-key','key-2','key-3'];f.keyResponses=Object.fromEntries(keys.map((key,i)=>[key,i===number-1?{status:200,invoice:amountInvoice(value)}:{status:404}]));
  assert.equal((await f.call()).code,200);assert.equal(f.state.paymentFormPayments[0].amount,Math.round(Number(value)*100));assert.equal(f.fetchCalls,3);
 }
 const f=fixture();delete f.env.MANDARIN_API_KEY;f.env.MANDARIN_API_KEY_3='key-3';f.keyResponses={'key-3':{status:200,invoice:amountInvoice('2180.00')}};assert.equal((await f.call()).code,200);
});
test('Mandarin rejects swapped key/amount binding and still accepts a valid invoice when an unrelated key times out',async()=>{
 const f=fixture();f.env.MANDARIN_API_KEY_2='key-2';f.keyResponses={'fixture-key':{status:200,invoice:amountInvoice('1650.00')},'key-2':{status:404}};assert.equal((await f.call()).code,422);assert.equal(f.state.paymentFormPayments,undefined);
 f.keyResponses={'fixture-key':{error:true},'key-2':{status:200,invoice:amountInvoice('1650.00')}};assert.equal((await f.call()).code,200);assert.equal(f.state.paymentFormPayments.length,1);
});
test('Mandarin routing enables each exact amount only for its matching configured key',()=>{
 const {configuredLinks}=require('../lib/mandarin-api-config');
 assert.deepEqual(configuredLinks({MANDARIN_API_KEY_2:'second'}).map(c=>c.link.amount),[150000]);
 assert.equal(configuredLinks({}).length,0);
});

test('Mandarin withdrawals group shows nominal credit for each link and retains gross in the ledger',async()=>{for(const [number,amount,credit]of [[1,'1100.00',1000],[2,'1650.00',1500],[3,'2180.00',2000]]){const f=fixture();const key=number===1?'MANDARIN_API_KEY':'MANDARIN_API_KEY_'+number;delete f.env.MANDARIN_API_KEY;f.env[key]='paid-key';f.keyResponses={'paid-key':{status:200,invoice:amountInvoice(amount)}};assert.equal((await f.call()).code,200);await f.payments.retryPending();assert.ok(f.groupTexts[0].replace(/\s/g,'').includes('-'+credit+',00₽'));assert.equal(f.state.paymentFormPayments[0].amount,Math.round(Number(amount)*100));}});
