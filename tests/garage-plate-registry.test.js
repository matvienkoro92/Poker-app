'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const registry=require('../lib/garage-plate-registry');
test('plate identity includes the region; same digits in a different region are distinct',()=>{
 assert.notEqual(registry.plateKey({number:'А123ВС',region:'54'}),registry.plateKey({number:'А123ВС',region:'154'}));
 assert.equal(registry.plateKey(), '');
});
test('room CAS and old/new plate ownership are passed to one atomic save',async()=>{
 const old={garage:{number:'А123ВС',region:'54'}},state={version:2,garage:{number:'А456ВС',region:'154'}};
 let calls=0;
 const result=await registry.save(async commands=>{calls++;assert.equal(commands.length,1);const c=commands[0];assert.equal(c[0],'EVAL');assert.equal(c[2],2);assert.equal(c[3],'poker_app:player_hall:ID1');assert.deepEqual(c.slice(5),['original',JSON.stringify(state),'ID1','А456ВС:154','А123ВС:54','poker_app:player_hall:']);return [[1]];},'ID1','original',state,old);
 assert.equal(calls,1);assert.deepEqual(result,{ok:true,owner:null});
});
test('registry differentiates an occupied plate from a stale room version',async()=>{
 const state={garage:{number:'А123ВС',region:'54'}};
 assert.deepEqual(await registry.save(async()=>[[-1,'ID2']],'ID1','',state,{}),{ok:false,owner:'ID2'});
 assert.deepEqual(await registry.save(async()=>[[0]],'ID1','',state,{}),{ok:false,owner:null});
});
