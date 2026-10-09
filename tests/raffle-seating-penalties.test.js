'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {penaltyCount,recordPenalty,requiredLevel}=require('../lib/raffle-seating-penalties');
function fixture() {
  const db=new Map();
  return async commands=>commands.map(([op,...args])=>{
    if(op==='SADD'){const [key,event]=args;const set=db.get(key)||new Set();set.add(event);db.set(key,set);return {result:1};}
    if(op==='SUNION')return {result:[...new Set(args.flatMap(key=>[...(db.get(key)||[])]))]};
    throw Error(op);
  });
}
const winner=(event,status='returned')=>({accountId:'ID123',cashSeatingMonitor:{status,userId:'456',idempotencyKey:event}});
test('each confirmed return adds one level, retries do not add another',async()=>{
  const redis=fixture();
  await recordPenalty(redis,winner('one','returning'));assert.equal(await penaltyCount(redis,'ID123','456'),0);
  await recordPenalty(redis,winner('one'));await recordPenalty(redis,winner('one'));
  assert.equal(await penaltyCount(redis,'ID123','456'),1);
  await recordPenalty(redis,winner('two'));assert.equal(await penaltyCount(redis,'ID123','456'),2);
  assert.equal(requiredLevel(10,0,2),12);assert.equal(requiredLevel(10,18,2),20);
});
test('changing either login or Poker21 binding preserves penalties without double counting',async()=>{
  const redis=fixture();await recordPenalty(redis,winner('one'));
  assert.equal(await penaltyCount(redis,'another','456'),1);
  assert.equal(await penaltyCount(redis,'ID123','another'),1);
  assert.equal(await penaltyCount(redis,'ID123','456'),1);
});
test('unavailable penalty storage cannot silently grant admission',async()=>{
  await assert.rejects(penaltyCount(async()=>[{error:'offline'}],'ID123','456'),/штрафы/);
  await assert.rejects(recordPenalty(async()=>[{error:'offline'}],winner('one')),/not saved/);
});
