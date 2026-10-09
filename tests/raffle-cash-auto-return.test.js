'use strict';
const test=require('node:test'), assert=require('node:assert/strict'), vm=require('node:vm'), fs=require('node:fs');
const seating=require('../lib/raffle-cash-seating');
const source=fs.readFileSync(require.resolve('../lib/api-handlers/raffles'),'utf8').split('module.exports.settleCashSeating = ')[1];
function fixture() {
  let raffle={id:'r',prizeKind:'cash',winners:[{winnerStatus:'ok',winnerStatusAt:'2026-10-09T10:00:00Z',prize:'300 ₽',cashSeatingMonitor:{status:'pending',issuedAt:'2020-01-01T00:00:00Z',userId:'123',amount:300,idempotencyKey:'fixed-return'}}]};
  let queued=true,failPayment=false,failSave=false, transfers=0;
  const ledger=new Map();
  const pipeline=async commands=>commands.map(([op,key,value])=>{
    if(op==='SMEMBERS')return {result:queued?['r']:[]};
    if(op==='SREM'){queued=false;return {result:1};}
    if(op==='GET')return {result:JSON.stringify(raffle)};
    if(op==='SET') {const next=JSON.parse(value);if(failSave && next.winners[0].cashSeatingMonitor.status==='returned'){failSave=false;throw Error('save failed');}raffle=next;}
    return {result:'OK'};
  });
  const ctx={module:{exports:{}},require:()=>seating,rawRedisPipeline:pipeline,redisPipeline:pipeline,
    claimRaffleReadySettlement:async()=> 'lock',releaseRaffleReadySettlement:async()=>{},RAFFLE_PREFIX:'raffle:',
    RAFFLE_PUBLIC_LIST_CACHE_KEY:'public',RAFFLE_SUMMARY_CACHE_KEY:'summary',RAFFLE_ARCHIVE_INDEX_CACHE_KEY:'archive',
    currentMoscowWeekRange:()=>({}),currentWeekRaffleIssueTotalsCacheBaseKey:()=> 'week',currentWeekRaffleIssueTotalsCacheGenerationKey:()=> 'generation',
    raffleWinnerPoker21PayoutSpec:()=>({}),console:{error(){}},
    processPoker21DirectChange:async input=>{if(failPayment)throw Error('payment failed');if(!ledger.has(input.idempotencyKey)){transfers++;assert.equal(input.chips,-300);ledger.set(input.idempotencyKey,{status:'completed',completedAt:new Date().toISOString()});}return {operation:ledger.get(input.idempotencyKey)};}};
  vm.runInNewContext('module.exports = '+source,ctx);
  return {poll:()=>ctx.module.exports([]),get:()=>raffle,transfers:()=>transfers,failPayment:v=>failPayment=v,failSave:()=>failSave=true};
}
test('confirmed debit counts as a return once, even if saving after payment fails',async()=>{
  const f=fixture();f.failSave();await f.poll();assert.equal(f.transfers(),1);assert.equal(f.get().winners[0].cashSeatingMonitor.status,'returning');
  await f.poll();await f.poll();assert.equal(f.transfers(),1);assert.equal(f.get().winners[0].winnerSeatStatus,'not_seated');assert.equal(f.get().winners[0].cashSeatingMonitor.status,'returned');
});
test('failed debit is retried and never enters return totals before confirmation',async()=>{
  const f=fixture();f.failPayment(true);await f.poll();assert.equal(f.transfers(),0);assert.equal(f.get().winners[0].winnerSeatStatus,undefined);
  f.failPayment(false);await f.poll();assert.equal(f.transfers(),1);assert.equal(f.get().winners[0].winnerSeatStatus,'not_seated');
});
