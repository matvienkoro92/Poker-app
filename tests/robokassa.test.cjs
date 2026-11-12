'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),{createHash}=require('node:crypto');
const {applyOperation,view}=require('../lib/admin-deposits');
function fixture(){
 let raw='',sent=[],failSend=false,locks=new Map();
 const redis={isConfigured:()=>true,pipeline:async commands=>commands.map(([op,...args])=>{
  if(op==='GET')return {result:raw};
  if(op==='EVAL'){if(raw!==args[3])return {result:0};raw=args[4];return {result:1};}
  if(op==='SET'){if(locks.has(args[0]))return {result:null};locks.set(args[0],true);return {result:'OK'};}
  if(op==='DEL'){locks.delete(args[0]);return {result:1};}throw Error(op);
 })};
 const env={ROBOKASSA_PASSWORD2:'test-only-secret',CRON_SECRET:'cron',PRODAMUS_WITHDRAWALS_CHAT_ID:'-123',TELEGRAM_BOT_TOKEN:'test-token'};
 const policy={guardedFetch:async(_url,options)=>{if(failSend)throw Error('offline');sent.push(JSON.parse(options.body));return {ok:true,json:async()=>({ok:true})};}};
 const modules={};function load(file){if(modules[file])return modules[file];const ctx={module:{exports:{}},require:id=>id==='node:crypto'?require(id):id.endsWith('/redis')?redis:id.endsWith('/telegram-deposit-withdrawals')?{STORE_KEY:'ledger'}:id.endsWith('/telegram-group-policy')?policy:id.endsWith('/robokassa-payments')?load('lib/robokassa-payments.js'):require(id),process:{env},console:{error(){}},URL,URLSearchParams,Buffer,Response,Intl,Date,AbortSignal};vm.runInNewContext(fs.readFileSync(file,'utf8'),ctx,{filename:file});return modules[file]=ctx.module.exports;}
 const handler=load('lib/api-handlers/robokassa-webhook.js');
 async function call(values={},method='POST',transform=x=>x){const fields={OutSum:'1234.560000',InvId:'42',...values};fields.SignatureValue=createHash('md5').update([fields.OutSum,fields.InvId,env.ROBOKASSA_PASSWORD2,...Object.keys(fields).filter(k=>/^Shp_/.test(k)).sort().map(k=>k+'='+fields[k])].join(':')).digest('hex');const payload=transform(new URLSearchParams(fields).toString());const req={method,headers:{'content-type':'application/x-www-form-urlencoded'},...(method==='GET'?{url:'/api/robokassa-webhook?'+payload}:{body:payload})};const res={setHeader(){},status(n){this.code=n;return this;},end(){},send(s){this.body=s;}};await handler(req,res);return res;}
 return {call,get state(){return JSON.parse(raw||'{}');},get sent(){return sent;},payments:load('lib/robokassa-payments.js'),offline(v){failSend=v;}};
}
test('signed production six-decimal payment is saved and notified once across POST/GET retries',async()=>{const f=fixture();assert.equal((await f.call({Shp_z:'я',Shp_a:'1'})).body,'OK42');assert.equal((await f.call({},'GET')).body,'OK42');assert.equal(f.state.paymentFormPayments.length,1);assert.equal(f.state.paymentFormPayments[0].amount,123456);assert.equal(f.sent.length,1);assert.ok(f.state.paymentFormPayments[0].notifiedAt);});
test('invalid signatures, duplicate parameters, tests and fractional kopecks do not enter ledger',async()=>{for(const [values,transform,code]of [[{},s=>s.replace('OutSum=1234.560000','OutSum=999.000000'),403],[{},s=>s+'&InvId=77',400],[{IsTest:'1'},s=>s,400],[{OutSum:'1.000001'},s=>s,400],[{OutSum:'0'},s=>s,400]]){const f=fixture();assert.equal((await f.call(values,'POST',transform)).code,code);assert.equal(f.state.paymentFormPayments,undefined);}});
test('notification failure retains the payment for retry; changed amount cannot overwrite it',async()=>{const f=fixture();f.offline(true);assert.equal((await f.call()).body,'OK42');assert.equal(f.state.paymentFormPayments[0].notifiedAt,undefined);f.offline(false);await f.payments.deliver(f.state.paymentFormPayments[0]);assert.equal(f.sent.length,1);assert.ok(f.state.paymentFormPayments[0].notifiedAt);assert.equal((await f.call({OutSum:'2.000000'})).code,503);assert.equal(f.state.paymentFormPayments[0].amount,123456);});
test('same invoice from two providers stays independent; confirmed amount is server owned and cancellation reopens payment',()=>{
 const now=Date.now(),base={revision:0,entries:[],requests:[],paymentFormPayments:[{id:'42',providerId:'robokassa',status:'confirmed',amount:123456,confirmedAt:now},{id:'42',providerId:'prodamus',status:'confirmed',amount:100000,confirmedAt:now}]};
 const body={action:'channel-operation',channelId:'robokassa',direction:'income',room:'X',playerId:'123',amount:1,robokassaPaymentId:'42',requestId:'robokassa_operation_0001'};
 let state=applyOperation(base,body,'manager',now).state;
 assert.equal(state.channelOperations[0].amount,123456);assert.equal(view(state,now).pendingRobokassaPayments.length,0);assert.equal(view(state,now).pendingProdamusPayments.length,1);assert.equal(view(state,now).paymentForms.providers.find(p=>p.id==='robokassa').total,123456);
 assert.throws(()=>applyOperation(state,{...body,requestId:'robokassa_operation_0002'},'manager',now),/уже записан/);
 assert.throws(()=>applyOperation(base,{...body,channelId:'other'},'manager',now),/недоступен/);
 assert.throws(()=>applyOperation(base,{...body,direction:'outgoing'},'manager',now),/только приход/);
 state=applyOperation(state,{action:'void-channel-operation',operationId:body.requestId,requestId:'robokassa_operation_0003'},'manager',now+1).state;
 assert.equal(view(state,now).pendingRobokassaPayments.length,1);assert.equal(view(state,now).paymentForms.providers.find(p=>p.id==='robokassa').total,123456);
});
test('shift report respects Moscow half-open windows and ignores voided ledger rows',()=>{const source=fs.readFileSync('lib/api-handlers/cron-robokassa.js','utf8');const context={module:{exports:{}},require:()=>({}),Intl,Date};vm.runInNewContext(source,context);const start=Date.parse('2026-11-12T06:00:00+03:00'),end=start+12*3600000;const report=context.module.exports.shiftReport({paymentFormPayments:[{providerId:'robokassa',status:'confirmed',id:'1',amount:100000,confirmedAt:start},{providerId:'robokassa',status:'confirmed',id:'2',amount:200000,confirmedAt:end}],channelOperations:[{channelId:'robokassa',direction:'income',robokassaPaymentId:'1',amount:100000,createdAt:start},{channelId:'robokassa',direction:'income',amount:300000,createdAt:start,voidedAt:end}]},start,end,'Ани');assert.match(report,/По уведомлениям: 1 оплат/);assert.match(report,/В депозитах: 1 записей/);assert.match(report,/Без привязки к депозиту: 0/);});
