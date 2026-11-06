'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const fixture=require('./helpers/billiards-wager-fixture.cjs');
test('free waiting table can be cancelled by host and never joined afterwards',async()=>{const f=fixture();const r=await f.call('m1','create',null,{discipline:'pool8'});await assert.rejects(f.call('m2','cancel',r.roomId),e=>e.status===403);const done=await f.call('m1','cancel',r.roomId);assert.equal(done.cancelled,true);assert.equal((await f.call('m1','cancel',r.roomId)).cancelled,true);await assert.rejects(f.call('m2','join',r.roomId),e=>e.status===410);assert.equal(f.changes.length,0);});
test('host cannot cancel after opponent has joined',async()=>{const f=fixture();const r=await f.call('m1','create',null,{discipline:'pool8'});await f.call('m2','join',r.roomId);await assert.rejects(f.call('m1','cancel',r.roomId),e=>e.status===409);assert.equal(f.rooms.get(r.roomId).cancelled,undefined);});
