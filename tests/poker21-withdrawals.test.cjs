'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {randomUUID}=require('node:crypto');
const redis=require('../lib/redis');
const {applyOperation,summary}=require('../lib/admin-deposits');
const handle=require('../lib/api-handlers/poker21-withdrawals');

test('only published withdrawals enter the cabinet and share the admin reservation balance',async t=>{
  const entryId=randomUUID(),offerId=randomUUID();
  const entry={room:'P21',playerId:'123456',recipient:'Тест',bank:'Тест',phone:'+79990000000',total:900000};
  let state=applyOperation(null,{action:'create',requestId:entryId,entry},'admin').state;
  const original=process.env.POKER21_WITHDRAWALS_SYNC_KEY;
  process.env.POKER21_WITHDRAWALS_SYNC_KEY='test-connection';
  t.after(()=>{if(original===undefined)delete process.env.POKER21_WITHDRAWALS_SYNC_KEY;else process.env.POKER21_WITHDRAWALS_SYNC_KEY=original;});
  const files=new Map();
  t.mock.method(redis,'pipeline',async ([command])=>{
    if(command[0]==='GET')return [{result:JSON.stringify(state)}];
    const pos=3+command[2];
    assert.equal(command[pos],JSON.stringify(state));
    if(command[2]===2)files.set(command[4],command[pos+2]);
    state=JSON.parse(command[pos+1]);return [{result:1}];
  });
  async function call(action,item,clubId='123',receipt){
    const res={code:200,setHeader(){},status(n){this.code=n;return this;},json(data){this.data=data;},end(){}};
    await handle({method:'POST',headers:{authorization:'Bearer test-connection'},body:{action,item,clubId,userId:'42',receipt}},res);
    return res;
  }
  assert.deepEqual((await call('list')).data.items,[]);
  state=applyOperation(state,{action:'poker21-publish',entryId,requestId:offerId,amount:900000},'admin').state;
  assert.equal(summary(state.entries[0]).available,900000);
  assert.equal((await call('list')).data.items[0].amount,9000);
  assert.equal((await call('take',offerId,'758417')).code,403);
  assert.equal((await call('take',offerId)).code,200);
  assert.equal((await call('take',offerId,'321')).code,409);
  assert.equal(summary(state.entries[0]).available,0);
  const reservationId=state.entries[0].reservations[0].id;
  assert.equal((await call('cancel',reservationId)).code,200);
  assert.equal(summary(state.entries[0]).available,900000);
  await call('take',offerId);
  const second=state.entries[0].reservations[1].id;
  const receipt='data:application/pdf;base64,'+Buffer.from('%PDF-1.4\nTest receipt\n%%EOF').toString('base64');
  assert.equal((await call('paid',second,'123','data:image/png;base64,AAAA')).code,400);
  assert.equal((await call('paid',second,'321',receipt)).code,409);
  assert.equal((await call('paid',reservationId,'123',receipt)).code,409);
  assert.equal(files.size,0);
  assert.equal((await call('paid',second,'123',receipt)).code,200);
  assert.equal(files.get('poker21:withdrawal-receipt:'+second),receipt);
  assert.equal(state.entries[0].reservations[1].hasPoker21Receipt,true);
  assert.equal((await call('list')).data.items[0].status,'Ожидает подтверждения');
  assert.equal((await call('paid',second,'123',receipt)).code,409);
  state=applyOperation(state,{action:'confirm-reservation',entryId,requestId:randomUUID(),reservationId:second,amount:900000},'admin').state;
  assert.equal(summary(state.entries[0]).paid,900000);
  assert.deepEqual((await call('list')).data.items,[]);
});
