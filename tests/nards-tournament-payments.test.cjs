'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const fixture=require('./helpers/nards-tournament-fixture.cjs');
const {createPayments}=require('../lib/nards-tournament-payments');
function bank(){const records=new Map(),operations=new Map(),balances=new Map(Array.from({length:70},(_,i)=>['p21-'+i,10000]));const payments=createPayments({read:async k=>records.get(k),write:async(k,v)=>{records.set(k,structuredClone(v));return true;},player:async({userId})=>({balance:balances.get(userId)}),change:async({userId,chips,idempotencyKey})=>{if(operations.has(idempotencyKey))return;operations.set(idempotencyKey,chips);balances.set(userId,balances.get(userId)+chips);}});return {payments,balances,operations,records};}
test('paid registration, duplicate join, leave, rejoin and cancellation conserve funds',async()=>{const b=bank(),f=fixture(b);const t=await f.create({entryType:'chips',buyIn:500,prizeShares:[70,30]});await f.call('m1','join',t.id);await f.call('m1','join',t.id);assert.equal(b.balances.get('p21-1'),9500);await f.call('m1','leave',t.id);assert.equal(b.balances.get('p21-1'),10000);await f.call('m1','join',t.id);assert.equal(b.balances.get('p21-1'),9500);await f.call('m0','cancel',t.id);await f.call('m0','get',t.id);assert.equal(b.balances.get('p21-1'),10000);});
test('free sponsored fund is reserved and refunded on cancellation',async()=>{const b=bank(),f=fixture(b);const t=await f.create({prizeFund:6000});assert.equal(b.balances.get('p21-0'),4000);await f.call('m1','join',t.id);assert.equal(b.balances.get('p21-1'),10000);await f.call('m0','cancel',t.id);assert.equal(b.balances.get('p21-0'),10000);assert.ok([...b.operations.values()].every(n=>Math.abs(n)<=5000));});
test('final pays the actual pool once and gives integer remainder to champion',async()=>{const b=bank(),f=fixture(b);const t=await f.create({entryType:'chips',buyIn:501,prizeShares:[70,30]});await f.call('m1','join',t.id);await f.call('m2','join',t.id);const raw=f.tournaments.get(t.id),[a,c]=raw.entries;Object.assign(raw,{status:'completed',winnerId:a.id,rounds:[{index:1,target:3,matches:[{id:'1-1',resolved:true,winnerId:a.id,playerIds:[a.id,c.id],scores:[3,0],ready:[true,true]}]}]});await f.call('m1','get',t.id);await f.call('m2','get',t.id);assert.equal(b.balances.get('p21-1'),10201);assert.equal(b.balances.get('p21-2'),9799);assert.equal([...b.balances.values()].reduce((a,b)=>a+b,0),700000);});
test('server rejects invalid prize shares and entry modes',async()=>{const f=fixture();for(const options of [{entryType:'other'},{entryType:'chips',buyIn:0},{prizeShares:[50,40]},{prizeShares:[50,20,20,10]},{prizeFund:-1}])await assert.rejects(f.create(options),e=>e.status===400);});
test('pending debit is completed before refund after an interrupted tournament save',async()=>{const b=bank(),f=fixture(b);const t=await f.create({entryType:'chips',buyIn:500});await f.call('m1','join',t.id);f.tournaments.get(t.id).entries[0].paid=false;await f.call('m1','leave',t.id);assert.equal(b.balances.get('p21-1'),10000);});
test('insufficient balance does not retain an unpaid registration',async()=>{const b=bank(),f=fixture(b);b.balances.set('p21-1',0);const t=await f.create({entryType:'chips',buyIn:500});await assert.rejects(f.call('m1','join',t.id),e=>e.status===409);assert.equal(f.tournaments.get(t.id).entries.length,0);});
test('transfer retry reuses chunks after partial network failure without checking balance again',async()=>{const rows=new Map(),ops=new Set();let balance=6000,fail=true;const p=createPayments({read:async k=>rows.get(k),write:async(k,v)=>{rows.set(k,structuredClone(v));return true;},player:async()=>({balance}),change:async({chips,idempotencyKey})=>{if(!ops.has(idempotencyKey)){balance+=chips;ops.add(idempotencyKey);}if(fail){fail=false;throw Error('lost response');}}});const input={key:'retry',userId:'1',amount:-6000};await assert.rejects(p.transfer(input));await p.transfer(input);assert.equal(balance,0);assert.equal(ops.size,2);});

test('manual chip prizes derive the funded total and pay exact amounts once',async()=>{
 const b=bank(),f=fixture(b),t=await f.create({prizeMode:'fixed',prizeAmounts:[4200,1800]});
 assert.equal(t.prizeFund,6000);assert.equal(b.balances.get('p21-0'),4000);
 await f.call('m1','join',t.id);await f.call('m2','join',t.id);
 const raw=f.tournaments.get(t.id),[a,c]=raw.entries;
 Object.assign(raw,{status:'completed',winnerId:a.id,rounds:[{index:0,target:3,matches:[{id:'0-0',resolved:true,winnerId:a.id,playerIds:[a.id,c.id],scores:[3,0],ready:[true,true]}]}]});
 await f.call('m1','get',t.id);await f.call('m1','get',t.id);
 assert.equal(b.balances.get('p21-1'),14200);assert.equal(b.balances.get('p21-2'),11800);
 assert.equal([...b.balances.values()].reduce((a,b)=>a+b,0),700000);
});
test('manual paid prizes scale to the actual pool without creating or losing chips',async()=>{
 const b=bank(),f=fixture(b),t=await f.create({entryType:'chips',buyIn:500,prizeMode:'fixed',prizeAmounts:[1400,600]});
 await f.call('m1','join',t.id);await f.call('m2','join',t.id);
 const raw=f.tournaments.get(t.id),[a,c]=raw.entries;
 Object.assign(raw,{status:'completed',winnerId:a.id,rounds:[{index:0,target:3,matches:[{id:'0-0',resolved:true,winnerId:a.id,playerIds:[a.id,c.id],scores:[3,0],ready:[true,true]}]}]});
 await f.call('m1','get',t.id);assert.equal(b.balances.get('p21-1'),10200);assert.equal(b.balances.get('p21-2'),9800);
});
test('ordinary poker tickets preserve nominations, tied places and manual issuance without wallet transfers',async()=>{
 const f=fixture(),t=await f.create({prizeKind:'tickets',prizeAmounts:[1000,500,300,300]});
 assert.equal(t.prizeFund,0);assert.equal(t.prizeKind,'tickets');
 for(let i=1;i<=4;i++)await f.call('m'+i,'join',t.id);
 const raw=f.tournaments.get(t.id),[a,b,c,d]=raw.entries;
 Object.assign(raw,{status:'completed',winnerId:a.id,rounds:[{index:0,matches:[{id:'0-0',resolved:true,winnerId:a.id,playerIds:[a.id,c.id]},{id:'0-1',resolved:true,winnerId:b.id,playerIds:[b.id,d.id]}]},{index:1,matches:[{id:'1-0',resolved:true,winnerId:a.id,playerIds:[a.id,b.id]}]}]});
 let view=await f.call('m1','get',t.id);assert.deepEqual(view.ticketAwards.map(a=>a.amount),[1000,500,300,300]);
 assert.equal(view.ticketAwards.filter(a=>a.place===3).length,2);assert.equal('poker21Id' in view.ticketAwards[0],false);const adminView=await f.call('m0','get',t.id);assert.equal(adminView.ticketAwards[0].poker21Id,'p21-1');assert.equal(view.paymentsSettled,false);
 await assert.rejects(f.call('m1','issue-ticket',t.id,{entryId:a.id}),{status:403});
 await f.call('m0','issue-ticket',t.id,{entryId:a.id});const issuedAt=f.tournaments.get(t.id).ticketAwards[0].issuedAt;
 f.time(f.now()+1000);await f.call('m0','issue-ticket',t.id,{entryId:a.id});assert.equal(f.tournaments.get(t.id).ticketAwards[0].issuedAt,issuedAt);
 for(const entry of [b,c,d])view=await f.call('m0','issue-ticket',t.id,{entryId:entry.id});
 assert.equal(view.paymentsSettled,true);assert.equal(view.ticketAwards.length,4);
});
test('manual prizes reject unequal tied places, missing tied slots, oversized pools and paid ticket modes',async()=>{
 const f=fixture();for(const options of [{prizeMode:'fixed',prizeAmounts:[1000,500,300]},{prizeMode:'fixed',prizeAmounts:[1000,500,300,200]},{prizeMode:'fixed',prizeAmounts:[1000000,1]},{prizeKind:'tickets',entryType:'chips',buyIn:500,prizeAmounts:[1000,1000]},{prizeMode:'fixed',prizeAmounts:[-1,100]}])await assert.rejects(f.create(options),{status:400});
});
