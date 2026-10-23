'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const createWagers=require('../lib/billiards-wagers'),roomFactory=require('../lib/billiards-room');
function fixture(){
 const rooms=new Map(),journals=new Map(),locks=new Set(),orders=new Map(),balances=new Map([['p1',10000],['p2',10000],['p3',10000]]);let time=1000,failAfterChange=false,changes=[],resolving=false;
 const storage={load:async id=>structuredClone(rooms.get(id)||null),create:async(id,r)=>{if(rooms.has(id))return false;rooms.set(id,structuredClone(r));return true;},cas:async(id,rev,r)=>{if(rooms.get(id)?.revision!==rev)return false;rooms.set(id,structuredClone(r));return true;},profile:async m=>({name:m,accountId:'ID00000'+m.slice(-1)})};
 const base=roomFactory(storage),store={chunkSize:1000,get:async id=>structuredClone(journals.get(id)||null),lock:async id=>{if(locks.has(id))return null;locks.add(id);return 'token';},unlock:async id=>locks.delete(id),put:async w=>{if(resolving){resolving=false;throw Error('write failed after debit');}journals.set(w.id,structuredClone(w));},due:async()=>[...journals.values()].filter(w=>!['paid','refunded','cancelled'].includes(w.status)).map(w=>w.id)};
 const service=createWagers({base,store,loadRoom:storage.load,now:()=>time,createRoom:async(m,b,i,id)=>{if(!rooms.has(id))await roomFactory({...storage,random:()=>id,create:async(code,r)=>{r.wagered=true;return storage.create(code,r);}}).call(m,b,i);},resolve:async m=>({accountId:'ID00000'+m.slice(-1),poker21Id:'p'+m.slice(-1)}),balance:async id=>balances.get(id),change:async op=>{if(orders.has(op.idempotencyKey)){assert.deepEqual(orders.get(op.idempotencyKey),op);return;}assert.ok(balances.get(op.userId)+op.chips>=0);orders.set(op.idempotencyKey,structuredClone(op));balances.set(op.userId,balances.get(op.userId)+op.chips);changes.push(op);if(failAfterChange){failAfterChange=false;resolving=true;} }});
 const create=(stake=100,requestId='request_0000000001')=>service.call('m1',{action:'create',stake,requestId,discipline:'pool8',raceTo:1});
 const call=(member,action,id,extra={})=>service.call(member,{action,roomId:id,...extra});
 return {service,create,call,rooms,journals,orders,balances,changes,advance:()=>{time+=7200001;},failWriteAfterDebit:()=>{failAfterChange=true;}};
}
test('host and guest stakes are charged once; winner receives 90% of bank once',async()=>{
 const f=fixture(),r=await f.create();assert.equal(r.wager.stake,100);assert.equal(f.balances.get('p1'),9900);
 await f.create();assert.equal(f.balances.get('p1'),9900);
 const joined=await f.call('m2','join',r.roomId);await f.call('m2','join',r.roomId);assert.equal(f.balances.get('p2'),9900);
 const done=await f.call('m2','move',r.roomId,{revision:joined.revision,move:{type:'resign'}});assert.equal(done.wager.status,'paid');assert.equal(done.wager.payout,180);assert.equal(f.balances.get('p1'),10080);
 await f.call('m1','room',r.roomId);await f.service.sweep();assert.equal(f.changes.length,3);
 await assert.rejects(f.call('m1','rematch',r.roomId,{revision:done.revision}),/Матч завершён/);
});
test('waiting host can cancel and receive a complete refund once; no guest may cancel',async()=>{
 const f=fixture(),r=await f.create();await assert.rejects(f.call('m2','cancel',r.roomId),/не участвуете/);
 await f.call('m1','cancel',r.roomId);await f.call('m1','cancel',r.roomId);assert.equal(f.balances.get('p1'),10000);assert.equal(f.changes.length,2);
 assert.equal((await f.call('m2','join',r.roomId)).cancelled,true);assert.equal(f.balances.get('p2'),10000);
});
test('insufficient host or guest balance never charges or admits that player',async()=>{
 const f=fixture();f.balances.set('p1',99);await assert.rejects(f.create(),/Пополните фишки/);assert.equal(f.changes.length,0);
 f.balances.set('p1',1000);const r=await f.create();f.balances.set('p2',99);await assert.rejects(f.call('m2','join',r.roomId),/Пополните фишки/);assert.equal(f.rooms.get(r.roomId).players[1],null);assert.equal(f.changes.length,1);
});
test('expired room returns host stake even when the room document is missing',async()=>{
 const f=fixture(),r=await f.create();f.rooms.delete(r.roomId);f.advance();await f.service.sweep();assert.equal(f.balances.get('p1'),10000);assert.equal(f.journals.get(r.roomId).status,'refunded');
});
test('wallet success followed by storage failure is reconciled without a second debit',async()=>{
 const f=fixture();f.failWriteAfterDebit();await assert.rejects(f.create(),/write failed/);assert.equal(f.balances.get('p1'),9900);const r=await f.create();assert.equal(f.balances.get('p1'),9900);await f.call('m1','cancel',r.roomId);assert.equal(f.balances.get('p1'),10000);assert.equal(f.changes.length,2);
});
test('concurrent guest joins reserve only one paid seat',async()=>{
 const f=fixture(),r=await f.create();const results=await Promise.allSettled([f.call('m2','join',r.roomId),f.call('m3','join',r.roomId)]);assert.equal(results.filter(r=>r.status==='fulfilled').length,1);assert.equal(f.changes.filter(o=>o.chips<0).length,2);
});
test('draw refunds both stakes without commission',async()=>{
 const f=fixture(),r=await f.create(),j=await f.call('m2','join',r.roomId);const offer=await f.call('m1','move',r.roomId,{revision:j.revision,move:{type:'draw-offer'}});const accepted=await f.call('m2','move',r.roomId,{revision:offer.revision,move:{type:'draw-accept'}});assert.equal(accepted.wager.status,'refunded');assert.equal(f.balances.get('p1'),10000);assert.equal(f.balances.get('p2'),10000);
});
test('race to three does not pay after a rack but resignation settles the whole match',async()=>{
 const f=fixture(),r=await f.service.call('m1',{action:'create',stake:101,requestId:'request_0000000002',raceTo:3,discipline:'pool8'});await f.call('m2','join',r.roomId);let raw=f.rooms.get(r.roomId);raw.state.winner=0;const rack=await f.call('m1','room',r.roomId);assert.equal(rack.wager.status,'playing');assert.equal(f.changes.length,2);
 const next=await f.call('m1','rematch',r.roomId,{revision:rack.revision});const done=await f.call('m1','move',r.roomId,{revision:next.revision,move:{type:'resign'}});assert.equal(done.wager.status,'paid');assert.equal(done.wager.winner,1);assert.equal(done.wager.payout,181);
});
test('stake inputs, changed retry parameters and cancellation after admission are rejected',async()=>{
 const f=fixture();for(const stake of [-1,99,100.5,'100',Infinity])await assert.rejects(f.create(stake));const r=await f.create();await assert.rejects(f.create(200),/Параметры/);await f.call('m2','join',r.roomId);await assert.rejects(f.call('m1','cancel',r.roomId),/Друг уже подключился/);
});
test('ordinary games do not touch wallets',async()=>{const f=fixture();const r=await f.service.call('m1',{action:'create',discipline:'pool8'});await f.call('m2','join',r.roomId);assert.equal(f.changes.length,0);assert.equal(r.wager,undefined);});

test('successful prize with lost checkpoint is not paid twice, including after expiry',async()=>{
 const f=fixture(),r=await f.create(),j=await f.call('m2','join',r.roomId);f.failWriteAfterDebit();await assert.rejects(f.call('m2','move',r.roomId,{revision:j.revision,move:{type:'resign'}}),/write failed/);assert.equal(f.balances.get('p1'),10080);f.advance();await f.service.sweep();assert.equal(f.balances.get('p1'),10080);assert.equal(f.journals.get(r.roomId).status,'paid');
});
test('large transfers resume their saved chunks without repeated debits',async()=>{
 const f=fixture();f.balances.set('p1',20000);await assert.rejects(f.create(6000),/продолжается/);assert.equal(f.balances.get('p1'),15000);const r=await f.create(6000);assert.equal(f.balances.get('p1'),14000);await assert.rejects(f.call('m1','cancel',r.roomId),/продолжается/);await f.call('m1','cancel',r.roomId);assert.equal(f.balances.get('p1'),20000);assert.equal(f.orders.size,12);
});
test('expiry preserves an already saved winning match and pays instead of refunding',async()=>{
 const f=fixture(),r=await f.create();await f.call('m2','join',r.roomId);const room=f.rooms.get(r.roomId);room.match.winner=1;room.state.winner=1;f.advance();await f.service.sweep();assert.equal(f.journals.get(r.roomId).status,'paid');assert.equal(f.balances.get('p2'),10080);assert.equal(f.balances.get('p1'),9900);
});

test('lost create response can be cancelled by its request id; late retries cannot debit',async()=>{
 const f=fixture();await f.create();await f.service.call('m1',{action:'cancel',requestId:'request_0000000001'});assert.equal(f.balances.get('p1'),10000);await assert.rejects(f.create());assert.equal(f.balances.get('p1'),10000);
 const g=fixture();await g.service.call('m1',{action:'cancel',requestId:'request_0000000001'});await assert.rejects(g.create());assert.equal(g.changes.length,0);
});
