'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {createQueue}=require('../lib/tournament-bet-notification-queue');
function fixture(){
 let time=Date.parse('2026-10-30T12:00:00Z'),fail='b',gate=null;const store=new Map(),sent=[];
 const event={id:'tb_test',status:'open',createdAt:new Date(time).toISOString(),entries:[]};const state={...event,creationNotification:structuredClone(event)};
 const pipeline=async cmds=>cmds.map(([cmd,key,...args])=>{let result=null;
  if(cmd==='GET')result=key.endsWith(':current')?JSON.stringify(state):store.get(key)||null;
  if(cmd==='HVALS')result=[];
  if(cmd==='MGET')result=[key,...args].map(k=>store.get(k)||null);
  if(cmd==='SET'&&(!args.includes('NX')||!store.has(key))){store.set(key,args[0]);result='OK';}
  if(cmd==='EVAL'&&store.get(args[1])===args[2]){store.delete(args[1]);result=1;}
  return {result};
 });
 const subscriptions={notify:async(e,t,options)=>{for(const id of await options.pendingRecipients(['group','a','b']))await options.deliver(id,async()=>{if(gate)await gate;sent.push(id);return {ok:id!==fail};});},notifyRegistration:async()=>({ok:true})};
 const queue=createQueue({pipeline,subscriptions,now:()=>time});
 return {queue,state,store,sent,subscriptions,advance:n=>time+=n,setFail:v=>fail=v,setGate:v=>gate=v};
}
test('partial delivery resumes only failed recipients and completed jobs never repeat',async()=>{
 const f=fixture();assert.equal((await f.queue.drain('token')).pending,1);assert.deepEqual(f.sent,['group','a','b']);
 f.setFail(null);assert.equal((await f.queue.drain('token')).processed,1);assert.deepEqual(f.sent,['group','a','b','b']);
 await f.queue.drain('token');assert.deepEqual(f.sent,['group','a','b','b']);assert.equal(f.state.status,'open');
});
test('overlapping workers do not send the same event concurrently',async()=>{
 const f=fixture();let release;f.setGate(new Promise(r=>release=r));const first=f.queue.drain('token');
 for(let i=0;i<30&&!f.store.has('poker_app:tournament_bet:creation_notice:tb_test:lock');i++)await Promise.resolve();
 assert.equal((await f.queue.drain('token')).processed,0);release();await first;assert.deepEqual(f.sent,['group','a','b']);
});
test('cancelled or stale jobs are skipped; old events without jobs are not announced',async()=>{
 for(const kind of ['cancelled','closed','stale','old']){const f=fixture();if(kind==='cancelled')f.state.status='cancelled';if(kind==='stale')f.advance(86400001);if(kind==='closed')f.advance(5*3600000);if(kind==='old')delete f.state.creationNotification;await f.queue.drain('token');assert.deepEqual(f.sent,[]);}
});
test('batch deadline pauses before sending another recipient and continues next tick',async()=>{
 const f=fixture();f.setFail(null);f.subscriptions.notify=async(e,t,o)=>{await o.deliver('a',async()=>{f.sent.push('a');f.advance(9000);return {ok:true};});await o.deliver('b',async()=>{f.sent.push('b');return {ok:true};});};
 assert.equal((await f.queue.drain('token')).pending,1);assert.deepEqual(f.sent,['a']);await f.queue.drain('token');assert.deepEqual(f.sent,['a','b']);
});
test('personal registration is retried independently of the broadcast',async()=>{
 const f=fixture();f.state.creationNotification.createdByPlayer=true;f.state.creationNotification.entries=[{stake:100}];let registrations=0;f.subscriptions.notifyRegistration=async()=>{registrations++;return {ok:true};};await f.queue.drain('token');f.setFail(null);await f.queue.drain('token');assert.equal(registrations,1);
});
