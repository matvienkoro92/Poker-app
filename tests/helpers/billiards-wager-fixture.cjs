'use strict';
const assert=require('node:assert/strict'),createWagers=require('../../lib/billiards-wagers'),roomFactory=require('../../lib/billiards-room');
function fixture(){
 const rooms=new Map(),journals=new Map(),locks=new Set(),orders=new Map(),balances=new Map([['p1',10000],['p2',10000],['p3',10000]]);let time=1000,failAfterChange=false,changes=[],resolving=false;
 const storage={load:async id=>structuredClone(rooms.get(id)||null),create:async(id,r)=>{if(rooms.has(id))return false;rooms.set(id,structuredClone(r));return true;},cas:async(id,rev,r)=>{if(rooms.get(id)?.revision!==rev)return false;rooms.set(id,structuredClone(r));return true;},profile:async m=>({name:m,accountId:'ID00000'+m.slice(-1)})};
 const base=roomFactory(storage),store={chunkSize:1000,get:async id=>structuredClone(journals.get(id)||null),lock:async id=>{if(locks.has(id))return null;locks.add(id);return 'token';},unlock:async id=>locks.delete(id),put:async w=>{if(resolving){resolving=false;throw Error('write failed after debit');}journals.set(w.id,structuredClone(w));},due:async()=>[...journals.values()].filter(w=>!['paid','refunded','cancelled'].includes(w.status)).map(w=>w.id)};
 const service=createWagers({base,store,loadRoom:storage.load,now:()=>time,createRoom:async(m,b,i,id)=>{if(!rooms.has(id))await roomFactory({...storage,random:()=>id,create:async(code,r)=>{r.wagered=true;return storage.create(code,r);}}).call(m,b,i);},resolve:async m=>({accountId:'ID00000'+m.slice(-1),poker21Id:'p'+m.slice(-1)}),balance:async id=>balances.get(id),change:async op=>{if(orders.has(op.idempotencyKey)){assert.deepEqual(orders.get(op.idempotencyKey),op);return;}assert.ok(balances.get(op.userId)+op.chips>=0);orders.set(op.idempotencyKey,structuredClone(op));balances.set(op.userId,balances.get(op.userId)+op.chips);changes.push(op);if(failAfterChange){failAfterChange=false;resolving=true;} }});
 const create=(stake=100,requestId='request_0000000001')=>service.call('m1',{action:'create',stake,requestId,discipline:'pool8',raceTo:1});
 const call=(member,action,id,extra={})=>service.call(member,{action,roomId:id,...extra});
 return {service,create,call,rooms,journals,orders,balances,changes,locks,advance:()=>{time+=7200001;},failWriteAfterDebit:()=>{failAfterChange=true;}};
}
module.exports=fixture;
