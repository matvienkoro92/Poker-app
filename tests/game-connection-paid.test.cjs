'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
for(const [family,discipline]of [['board','long'],['board','short'],['board','chess'],['billiards','pyramid']])test(family+' '+discipline+' disconnect pauses the paid game without payout and reconnect restores the seat',async()=>{
 const stamps=new Map(),presence=async(id,p,time)=>{const old=stamps.get(id)||[time,time],seen=[...old];old[p]=time;stamps.set(id,old);return seen;};
 const f=require('./helpers/'+family+'-wager-fixture.cjs')({presence});let r=await f.service.call('m1',{action:'create',discipline,turnSeconds:60,stake:300,requestId:'network_pause_paid',raceTo:1});r=await f.call('m2','join',r.roomId);const id=r.roomId,changes=f.changes.length;
 f.elapse(10000);r=await f.call('m2','room',id);assert.equal(r.connection?.paused,true);assert.equal(r.state.winner,null);const remaining=r.turnDeadline-r.serverNow;
 f.elapse(20000);r=await f.call('m2','room',id);assert.equal(r.turnDeadline-r.serverNow,remaining);assert.equal(r.wager.status,'playing');assert.equal(f.changes.length,changes);
 r=await f.call('m1','move',id,{revision:r.revision,move:{type:'draw-offer'}});assert.equal(r.connection,null);assert.equal(r.turnDeadline-r.serverNow,remaining);assert.equal(r.player,0);assert.equal(f.rooms.get(id).connectionProtection.used[0],25000);
 const priorPly=r.state.ply;f.elapse(remaining+60001);r=await f.call('m2','room',id);assert.equal(r.connection,null);assert.equal(f.rooms.get(id).connectionProtection.used[0],60000);assert.ok(r.state.winner!==null||(['short','long'].includes(discipline)?r.state.ply>priorPly:r.state.turn!==0));
});
