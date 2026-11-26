'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {randomUUID}=require('node:crypto');
const redis=require('../lib/redis');
const {applyOperation,summary}=require('../lib/admin-deposits');
const handle=require('../lib/api-handlers/poker21-withdrawals');

test('non-USDT withdrawals automatically enter the cabinet and share the admin reservation balance',async t=>{
  const entryId=randomUUID();
  let offerId=randomUUID();
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
    if(command[2]>=2){const notice=JSON.parse(command[pos+2]);assert.equal(notice.amountCents,900000);assert.equal(notice.clubId,'123');}
    if(command[2]===3)files.set(command[5],command[pos+3]);
    state=JSON.parse(command[pos+1]);return [{result:1}];
  });
  async function call(action,item,clubId='123',receipt,userId='42',ownerOverview=false){
    const res={code:200,setHeader(){},status(n){this.code=n;return this;},json(data){this.data=data;},end(){}};
    await handle({method:'POST',headers:{authorization:'Bearer test-connection'},body:{action,item,clubId,userId,receipt,ownerOverview}},res);
    return res;
  }
  state.entries.push({...state.entries[0],id:randomUUID(),paymentType:'usdt',bank:'USDT'});
  const legacyOfferId=randomUUID();
  state.entries[0].poker21Offer={id:legacyOfferId,amount:100000};
  const beforePayment=(await call('list')).data.items[0];
  assert.equal(beforePayment.amount,9000);
  const paymentId=randomUUID();
  state=applyOperation(state,{action:'payment',entryId,requestId:paymentId,amount:500000},'admin').state;
  assert.equal((await call('list')).data.items[0].amount,4000);
  assert.equal((await call('take',beforePayment.id.slice('withdrawal:'.length))).code,409);
  assert.equal((await call('take',legacyOfferId)).code,409);
  state=applyOperation(state,{action:'void',entryId,requestId:randomUUID(),paymentId},'admin').state;
  const items=(await call('list')).data.items;
  assert.equal(items.length,1);
  offerId=items[0].id.slice('withdrawal:'.length);
  assert.equal(summary(state.entries[0]).available,900000);
  assert.equal((await call('list')).data.items[0].amount,9000);
  assert.equal((await call('remove',offerId,'321')).code,403);
  for(const admin of ['388008256','5053253480']){
    const previous=structuredClone(state);
    assert.equal((await call('remove',offerId,'321',undefined,admin)).code,200);
    assert.deepEqual((await call('list')).data.items,[]);
    state=applyOperation(state,{action:'payment',entryId,requestId:randomUUID(),amount:10000},'admin').state;
    assert.deepEqual((await call('list')).data.items,[]);
    assert.equal(summary(state.entries[0]).available,890000);
    state=previous;
  }
  assert.equal((await call('remove',offerId,'758417')).code,200);
  assert.deepEqual((await call('list')).data.items,[]);
  state=applyOperation(state,{action:'poker21-publish',entryId,requestId:randomUUID(),amount:900000},'admin').state;
  offerId=state.entries[0].poker21Offer.id;
  assert.equal((await call('take',offerId,'758417')).code,403);
  assert.equal((await call('take',offerId)).code,200);
  assert.equal((await call('take',offerId,'321')).code,409);
  assert.equal((await call('remove',offerId,'758417')).code,409);
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
  const overview=async(clubId='758417')=>(await call('list',undefined,clubId,undefined,'42',true)).data.items[0];
  const ownerCard=await overview();
  assert.equal(ownerCard.historyOnly,true);
  assert.equal(ownerCard.availableCents,0);
  assert.deepEqual(ownerCard.bookings.map(r=>[r.clubId,r.amountCents,r.stage]),[
    ['123',900000,'Плательщик отметил оплату'],['123',900000,'Бронь отменена']
  ]);
  assert.equal((await overview('123')).bookings,undefined);
  const paidState=structuredClone(state);
  assert.equal((await call('telegram-confirm',second,'123')).code,400);
  assert.equal((await call('telegram-confirm',second,'758417')).code,200);
  assert.equal((await call('telegram-confirm',second,'758417')).data.alreadyConfirmed,true);
  assert.equal(state.entries[0].payments.filter(p=>p.reservationId===second).length,1);
  assert.deepEqual(state.poker21Credits.map(c=>[c.id,c.clubId,c.amountCents]),[[second,'123',900000]]);
  assert.equal(summary(state.entries[0]).paid,900000);
  assert.equal((await overview()).bookings[0].stage,'Оплата подтверждена');
  state=paidState;
  assert.equal((await call('remove',second,'123')).code,403);
  assert.equal((await call('remove',second,'123',undefined,'5053253480')).code,200);
  assert.deepEqual((await call('list')).data.items,[]);
  assert.equal(summary(state.entries[0]).reserved,900000);
  state=applyOperation(state,{action:'confirm-reservation',entryId,requestId:randomUUID(),reservationId:second,amount:900000},'admin').state;
  assert.deepEqual(state.poker21Credits.map(c=>[c.id,c.clubId,c.amountCents]),[[second,'123',900000]]);
  assert.equal(summary(state.entries[0]).paid,900000);
  assert.equal(await overview(),undefined);
  assert.deepEqual((await call('list')).data.items,[]);
});

test('partial withdrawal enforces minimum and keeps independent reservations',()=>{
  const {availablePoker21Offer}=require('../lib/admin-deposits');
  const entryId=randomUUID(),now=Date.now();
  let state=applyOperation(null,{action:'create',requestId:entryId,entry:{room:'P21',playerId:'123456',recipient:'Тест',bank:'Тест',phone:'+79990000000',total:5000000}},'admin',now).state;
  const offer=()=>availablePoker21Offer(summary(state.entries[0]));
  function run(action,params){
    const requestId=randomUUID();
    state=applyOperation(state,{action,entryId,requestId,...params},'test',now,'test',{poker21:true}).state;
    return requestId;
  }
  const first=offer().id;
  assert.throws(()=>run('poker21-split',{offerId:first,clubId:'123',minimum:1000000}));
  run('poker21-split',{offerId:first,clubId:'758417',minimum:1000000});
  for(const amount of [999999,4500000,5000001])assert.throws(()=>run('poker21-take',{offerId:first,clubId:'123',takeCents:amount}));
  const reservationId=run('poker21-take',{offerId:first,clubId:'123',takeCents:2000000});
  assert.equal(offer().amount,3000000);
  assert.throws(()=>run('poker21-take',{offerId:first,clubId:'456',takeCents:2000000}));
  run('poker21-take',{offerId:offer().id,clubId:'456',takeCents:3000000});
  assert.equal(offer(),null);
  run('poker21-cancel',{reservationId,clubId:'123'});
  assert.equal(offer().amount,2000000);
});
