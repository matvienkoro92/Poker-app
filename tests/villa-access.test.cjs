'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {hasVillaOwnerAccess}=require('../lib/player-hall-access');
test('villa admits owner accounts and rejects staff, pilot users, guests and VK identities',()=>{
 for(const id of ['388008256','5053253480'])assert(hasVillaOwnerAccess({id}));
 assert(hasVillaOwnerAccess({pwaUsername:'roman1787443'}));
 for(const identity of [null,{id:2144406710},{id:1897001087},{id:123,telegramUsername:'polyapineapple'},{id:388008256,vkId:42}])assert.equal(hasVillaOwnerAccess(identity),false);
});
test('private villa actions are rejected before reading or changing another account',async()=>{
 for(const action of ['get','save','presence']){
  let status,body;const context={module:{exports:{}},console,require:name=>name==='../club-social'?{context:async()=>({body:{action,targetId:'someone'},admin:true,villaAccess:false,accountId:'other'})}:name==='../account-id'?{resolveAccountId:()=>{throw Error('Must not resolve target');}}:{}};
  vm.runInNewContext(fs.readFileSync('lib/api-handlers/player-hall.js','utf8'),context);
  await context.module.exports({}, {status(code){status=code;return this;},json(data){body=data;}});
  assert.equal(status,403);assert.equal(body.ok,false);
 }
});

test('client entry is private without changing public character rendering',()=>{
 const G=require('../app-garage-catalog');
 assert.equal(G.canEnterVilla({status:'verified',user:{id:388008256}}),true);
 assert.equal(G.canEnterVilla({status:'verified',adminAccess:true,user:{id:2144406710}}),false);
 assert.equal(G.canEnterVilla({status:'verified',user:{id:123}}),false);
 assert.equal(G.canEnterVilla({status:'guest',user:{id:388008256}}),false);
 assert.equal(G.canAccessHall({status:'verified',user:{id:123}}),true);
});
