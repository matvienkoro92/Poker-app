'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
for(const kind of ['chess','short','long','pool8'])test(kind+': regular paid actions bypass the wallet; final payout stays protected',async()=>{
 const billiards=kind==='pool8',f=require('./helpers/'+(billiards?'billiards':'board')+'-wager-fixture.cjs')(),E=await import('../scripts/board-games/engine.mjs');
 const created=await f.service.call('m1',{action:'create',discipline:kind,stake:300,requestId:'latency_paid_game_300',raceTo:1,turnSeconds:30});let room=await f.call('m2','join',created.roomId);const id=room.roomId;f.locks.add(id);
 try{for(const action of ['preview','room','watch','join']){const member=action==='watch'?'viewer':'m1';for(const k of Object.keys(f.metrics))f.metrics[k]=0;await f.call(member,action,id);assert.equal(f.metrics.locks,0,action+' must not lock the wallet');assert.equal(f.metrics.balances,0);assert.equal(f.metrics.puts,0);}
 const move=kind==='chess'?{type:'move',from:'e2',to:'e4'}:billiards?{type:'shot',angle:0,power:.4}:{type:'roll'};
 for(const k of Object.keys(f.metrics))f.metrics[k]=0;room=await f.call('m1','move',id,{revision:room.revision,move});assert.equal(f.metrics.locks,0);assert.equal(f.metrics.balances,0);assert.equal(f.metrics.loads,1);assert.equal(f.metrics.cas,1);assert.equal(f.metrics.gets,1);assert.equal(f.metrics.puts,0);
 if(!billiards&&kind!=='chess'&&room.state.phase==='moving'){const legal=E.legalMoves(room.state)[0];assert.ok(legal);room=await f.call(room.state.turn===0?'m1':'m2','move',id,{revision:room.revision,move:{type:'move',...legal}});assert.equal(f.metrics.locks,0);assert.equal(f.metrics.balances,0);}
 if(billiards)f.elapse(room.playback.startedAt+room.playback.durationMs-1000+1);assert.equal(f.changes.length,2);await assert.rejects(f.call('outsider','move',id,{revision:room.revision,move}),e=>e.status===403);
 await assert.rejects(f.call('m2','move',id,{revision:room.revision,move:{type:'resign'}}),e=>e.status===409);assert.equal(f.changes.length,2,'Money cannot be paid without the settlement lock');
 }finally{f.locks.delete(id);}
 const final=await f.call('m1','room',id);assert.equal(final.wager.status,'paid');assert.equal(f.balances.get('p1'),10240);assert.equal(f.changes.length,3);await f.call('m1','room',id);assert.equal(f.changes.length,3);
});
for(const kind of ['chess','long','pool8'])test(kind+': paid preview and next round do not wait on the wallet',async()=>{
 const f=require('./helpers/'+(kind==='pool8'?'billiards':'board')+'-wager-fixture.cjs')(),created=await f.service.call('m1',{action:'create',discipline:kind,stake:300,requestId:'latency_next_round_300',raceTo:3,turnSeconds:30});f.locks.add(created.roomId);try{const preview=await f.call('m2','preview',created.roomId);assert.equal(preview.wager.stake,300);assert.equal(f.changes.length,1);}finally{f.locks.delete(created.roomId);}const joined=await f.call('m2','join',created.roomId),raw=f.rooms.get(joined.roomId);raw.state.winner=0;raw.match.wins=[1,0];raw.match.winner=null;raw.match.creditedRound=raw.match.round;f.locks.add(joined.roomId);try{const next=await f.call('m1','rematch',joined.roomId,{revision:joined.revision});assert.equal(next.wager.status,'playing');assert.equal(next.state.winner,null);assert.equal(f.changes.length,2);}finally{f.locks.delete(joined.roomId);}
});
