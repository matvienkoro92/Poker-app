'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fixture=require('./helpers/board-wager-fixture.cjs');
for(const discipline of ['short','long'])for(const [resignKind,multiplier,points]of [['single',1,1],['mars',1.5,2],['koks',2,3]])for(const loser of [0,1])test(`${discipline}: player ${loser} resigns ${resignKind} with correct settlement and reserve refund`,async()=>{
 const f=fixture();let r=await f.service.call('m1',{action:'create',discipline,stake:100,requestId:'resign_options_request',marsMultiplier:1.5,koksMultiplier:2,raceTo:3});r=await f.call('m2','join',r.roomId);
 const done=await f.call('m'+(loser+1),'move',r.roomId,{revision:r.revision,move:{type:'resign',resignKind,multiplier:10}});
 assert.equal(done.state.winKind,resignKind);assert.equal(done.state.winPoints,points);assert.equal(done.state.scores[1-loser],points);assert.equal(done.match.winner,1-loser);
 assert.equal(done.wager.status,'paid');assert.equal(done.wager.settledStake,100*multiplier);assert.equal(done.wager.payout,190*multiplier);
 assert.equal(f.balances.get('p'+(loser+1)),10000-100*multiplier);assert.equal(f.balances.get('p'+(2-loser)),10000+90*multiplier);
 const changes=f.changes.length;await f.call('m1','room',r.roomId);await f.service.sweep();assert.equal(f.changes.length,changes);
});
for(const discipline of ['short','long'])test(discipline+': invalid resignation cannot change state or settle funds',async()=>{
 const f=fixture();let r=await f.service.call('m1',{action:'create',discipline,stake:100,requestId:'resign_invalid_request',marsMultiplier:1.5,koksMultiplier:2});r=await f.call('m2','join',r.roomId);const before=structuredClone(f.rooms.get(r.roomId)),changes=f.changes.length;
 await assert.rejects(f.call('m2','move',r.roomId,{revision:r.revision,move:{type:'resign',resignKind:'free'}}),/недоступен/);
 assert.deepEqual(f.rooms.get(r.roomId),before);assert.equal(f.changes.length,changes);
});
test('selected resignation after a completed rack still settles the series using that selection',async()=>{
 const f=fixture();let r=await f.service.call('m1',{action:'create',discipline:'short',stake:100,requestId:'resign_finished_rack',raceTo:3,marsMultiplier:1.5,koksMultiplier:2});r=await f.call('m2','join',r.roomId);f.rooms.get(r.roomId).state.winner=0;
 const done=await f.call('m1','move',r.roomId,{revision:r.revision,move:{type:'resign',resignKind:'mars'}});assert.equal(done.match.winner,1);assert.equal(done.state.winKind,'mars');assert.equal(done.wager.settledStake,150);
});
