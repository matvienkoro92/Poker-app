'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const G=require('../app-garage-catalog');
test('villa admits ordinary authenticated players across identities without granting administrator privileges',()=>{
 for(const auth of [{status:'verified',user:{id:123}},{status:'verified',user:{id:2144406710}},{status:'verified',user:{username:'polyapineapple'}},{status:'verified',vkId:42},{status:'dev_skip'},{adminAccess:true}])assert.equal(G.canEnterVilla(auth),true);
 for(const auth of [null,{}, {status:'guest'},{status:'guest',user:{id:388008256}},{status:'no_init_data'},{status:'invalid'}])assert.equal(G.canEnterVilla(auth),false);
 assert.equal(G.canAccessHall({status:'verified',user:{id:123}}),true);
});
function handlerFor(auth,methods){const context={module:{exports:{}},console,require:name=>name==='../club-social'?{context:async()=>auth}:name==='../account-id'?{resolveAccountId:async id=>id}:name==='../player-hall'?methods:{}};vm.runInNewContext(fs.readFileSync('lib/api-handlers/player-hall.js','utf8'),context);return context.module.exports;}
function response(){return {status(code){this.code=code;return this;},json(data){this.body=data;return this;}};}
test('ordinary players can open villas and can only save their own account',async()=>{
 for(const action of ['get','save']){let accessed;const auth={body:{action,targetId:'other'},admin:false,villaAccess:true,accountId:'me'},res=response();const handler=handlerFor(auth,{read:async(id,self)=>{accessed={id,self};return {};},save:async id=>{accessed={id};return {};}});await handler({},res);assert.equal(res.code,200);assert.equal(accessed.id,action==='save'?'me':'other');if(action==='get')assert.equal(accessed.self,false);assert.equal(auth.admin,false);}
});
test('unauthenticated requests stop before reading or changing a villa',async()=>{let accessed=false;const handler=handlerFor(null,{read:async()=>{accessed=true;},save:async()=>{accessed=true;}});await handler({},response());assert.equal(accessed,false);});
test('denied villa actions stop before account resolution or room reads',async()=>{
 for(const action of ['get','save','presence']){const res=response();await handlerFor({body:{action,targetId:'someone'},villaAccess:false,accountId:'other'},{} )({},res);assert.equal(res.code,403);assert.equal(res.body.ok,false);}
});
