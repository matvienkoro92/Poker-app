"use strict";
const test = require('node:test');
const assert = require('node:assert/strict');
const {cancelEvent, ratingFor} = require('../lib/api-handlers/tournament-bet');
function event() { return {id:'cancel-test',status:'closed',stakePrice:500,startingBank:10000,entries:[{accountId:'A',poker21Id:'1',stake:500},{accountId:'B',poker21Id:'2',stake:300}]}; }
test('cancel returns only stakes and repeated cancellation does not pay twice', async()=>{
 const state=event(), calls=[];
 await cancelEvent(state,'admin',async x=>calls.push(x),async()=>{});
 assert.equal(state.status,'cancelled');
 assert.deepEqual(calls.map(x=>x.chips),[500,300]);
 assert.equal(new Set(calls.map(x=>x.idempotencyKey)).size,2);
 await cancelEvent(state,'admin',async x=>calls.push(x),async()=>{});
 assert.equal(calls.length,2);
 assert.equal(ratingFor([],state,{}).length,0);
});
test('partial refund resumes without repeating saved refunds',async()=>{
 const state=event();let attempts=0;
 await assert.rejects(cancelEvent(state,'admin',async()=>{if(++attempts===2)throw Error('network');},async()=>{}));
 assert.equal(state.status,'cancelling');
 assert.ok(state.entries[0].refundedAt);
 const calls=[];await cancelEvent(state,'admin',async x=>calls.push(x),async()=>{});
 assert.equal(calls.length,1);assert.equal(calls[0].userId,'2');assert.equal(state.status,'cancelled');
});
test('settled event cannot be refunded',async()=>{
 const state=event();state.status='settled';
 await assert.rejects(cancelEvent(state,'admin',async()=>assert.fail('refund'),async()=>{}));
});
