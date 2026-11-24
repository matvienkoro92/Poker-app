'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const {applyOperation,view}=require('../lib/admin-deposits');
const {providerDisplayAmount}=require('../lib/deposit-payment-forms');
const mapping=[[110000,100000],[165000,150000],[218000,200000]];
test('payment providers display and record nominal credit while retaining gross receipt and audit amount',()=>{
 for(const provider of ['prodamus','robokassa','mandarin','cashera'])for(const [gross,credit]of (provider==='cashera'?[[107000,100000],[160000,150000],[213000,200000],[319000,300000]]:mapping)){
  const id=provider==='mandarin'?'11111111-2222-4333-8444-555555555555':'123',now=Date.now(),receipt={providerId:provider,id,status:'confirmed',amount:gross,confirmedAt:now};
  const base={revision:0,entries:[],requests:[],paymentFormPayments:[receipt]};
  const field=provider+'PaymentId',pending='pending'+provider[0].toUpperCase()+provider.slice(1)+'Payments';
  assert.equal(view(base,now)[pending][0].displayAmount,credit);assert.equal(view(base,now).paymentForms.providers.find(p=>p.id===provider).total,credit);
  const body={action:'channel-operation',channelId:provider,direction:'income',[field]:id,room:'X',playerId:'123',amount:1,requestId:'nominal_'+provider+'_'+gross};
  const state=applyOperation(base,body,'manager',now).state;assert.equal(state.channelOperations[0].amount,credit);assert.equal(state.channelOperations[0].grossAmount,gross);assert.equal(state.paymentFormPayments[0].amount,gross);
  const result=view(state,now);assert.equal(result.statistics.deposits,credit);assert.equal(result.paymentForms.providers.find(p=>p.id===provider).total,credit);assert.equal(result[pending].length,0);
 }
});
test('unknown amounts stay exact and historical unsplit provider incomes display nominal with original gross retained',()=>{
 for(const provider of ['prodamus','robokassa','mandarin']){
  assert.equal(providerDisplayAmount(provider,123456),123456);
  const original={revision:0,entries:[],requests:[],channelOperations:[{id:'old',channelId:provider,direction:'income',amount:165000,createdAt:Date.now(),room:'X',playerId:'123'}]};
  const result=view(original);assert.equal(result.channelOperations[0].amount,150000);assert.equal(result.channelOperations[0].grossAmount,165000);assert.equal(original.channelOperations[0].amount,165000);
 }
});
test('new split provider payments require nominal allocation total and never allocate the fee to a player',()=>{
 const now=Date.now();
 for(const provider of ['prodamus','robokassa','mandarin']){
  const state={revision:0,entries:[],requests:[],paymentFormPayments:[{id:'123',providerId:provider,status:'confirmed',amount:165000,confirmedAt:now}]};
  const body={action:'channel-operation',channelId:provider,direction:'income',[provider+'PaymentId']:'123',amount:1,allocations:[{depositorRoom:'X',depositorId:'1',amount:50000},{depositorRoom:'X',depositorId:'2',amount:100000}],requestId:'split_nominal_'+provider};
  const saved=applyOperation(state,body,'manager',now).state;assert.equal(saved.channelOperations[0].amount,150000);assert.equal(view(saved,now).statistics.players.reduce((s,p)=>s+p.deposits,0),150000);
  assert.throws(()=>applyOperation(state,{...body,allocations:[{depositorRoom:'X',depositorId:'1',amount:65000},{depositorRoom:'X',depositorId:'2',amount:100000}]},'manager',now),/совпадать/);
 }
});

test('both existing shift reports compare nominal deposits and separately retain provider gross',()=>{
 const fs=require('node:fs'),vm=require('node:vm');
 for(const provider of ['prodamus','robokassa']){
  const file='lib/api-handlers/cron-'+(provider==='prodamus'?'prodamus-shifts':'robokassa')+'.js';
  const ctx={module:{exports:{}},Intl,Date,require:id=>id==='../deposit-payment-forms'?require('../lib/deposit-payment-forms'):{}};
  vm.runInNewContext(fs.readFileSync(file,'utf8')+'\nmodule.exports.report=shiftReport;',ctx);
  const start=Date.now()-1000,end=start+10000;
  const text=ctx.module.exports.report({paymentFormPayments:[{id:'1',providerId:provider,status:'confirmed',amount:165000,confirmedAt:start}],channelOperations:[{channelId:provider,direction:'income',[provider+'PaymentId']:'1',amount:150000,grossAmount:165000,createdAt:start}]},start,end,'тест');
  assert.match(text,/Привязанные записи с отличающейся суммой: 0/);assert.match(text,/Разница \(уведомления минус депозиты\): 0/);assert.ok(text.replace(/\s/g,'').includes('Принятоплатёжкой:1650,00₽'));
 }
});
