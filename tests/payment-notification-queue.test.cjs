'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {saveCommand,takeDue}=require('../lib/payment-notification-queue');
const makeRedis=require('./helpers/payment-redis.cjs');

test('imports only outstanding legacy receipts, reserves disjoint batches and recovers abandoned work',async()=>{
  const redis=makeRedis(),provider='mandarin';
  const payments=Array.from({length:12},(_,i)=>({providerId:provider,id:String(100+i),status:'confirmed'}));
  redis.strings.set('ledger',JSON.stringify({paymentFormPayments:[...payments,
    {...payments[0],id:'done',notifiedAt:10,incomeNotifiedAt:11},
    {...payments[0],id:'not-confirmed',status:'processing'},
    {...payments[0],id:'other',providerId:'prodamus'}]}));
  const [first,second]=await Promise.all([takeDue(redis,'ledger',provider,100),takeDue(redis,'ledger',provider,100)]);
  assert.equal(new Set([...first,...second]).size,10);
  const last=await takeDue(redis,'ledger',provider,100);
  assert.deepEqual([...first,...second,...last].sort(),payments.map(p=>p.id));
  assert.deepEqual(await takeDue(redis,'ledger',provider,60099),[]);
  assert.deepEqual(await takeDue(redis,'ledger',provider,60100),first);
});

test('ledger conflicts never enqueue a phantom payment or remove a pending notification',async()=>{
  const redis=makeRedis(),p={id:'22',providerId:'robokassa',status:'confirmed'};
  const state={paymentFormPayments:[p]},save=(raw,receipt)=>redis.pipeline([saveCommand('ledger',raw,{paymentFormPayments:[receipt]},receipt)]);
  assert.equal((await save('stale',p))[0].result,0);
  assert.deepEqual(await takeDue(redis,'ledger',p.providerId,1),[]);
  assert.equal((await save('',p))[0].result,1);
  assert.equal((await save('stale',{...p,notifiedAt:1}))[0].result,0);
  assert.deepEqual(await takeDue(redis,'ledger',p.providerId,1),['22']);
  assert.equal((await save(JSON.stringify(state),{...p,notifiedAt:1}))[0].result,1);
  assert.deepEqual(await takeDue(redis,'ledger',p.providerId,70000),[]);
});
