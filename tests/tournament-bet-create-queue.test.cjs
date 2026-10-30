'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const redis=require('../lib/redis'),auth=require('../lib/api-auth'),account=require('../lib/account-id'),subscriptions=require('../lib/tournament-bet-subscriptions');
let saved,notifications=0;const locks=new Map();redis.isConfigured=()=>true;
redis.pipeline=async cmds=>cmds.map(([cmd,key,...args])=>{let result=null;if(cmd==='GET')result=key.endsWith(':current')?(saved?JSON.stringify(saved):null):locks.get(key)||null;else if(cmd==='SET'){if(key.endsWith(':current'))saved=JSON.parse(args[0]);else locks.set(key,args[0]);result='OK';}else if(cmd==='HVALS'||cmd==='LRANGE')result=[];else if(cmd==='DEL')locks.delete(key);return {result};});
auth.authRequired=()=>({ok:true,isAdmin:true,memberId:'test-admin'});account.ensureDtIdForUserId=async()=> 'ID111111';subscriptions.notify=async()=>{notifications++;throw Error('Telegram unavailable');};
const handler=require('../lib/api-handlers/tournament-bet');
test('creation atomically saves the immutable delivery job and returns without contacting Telegram',async()=>{
 const res={setHeader(){},status(n){this.code=n;return this;},json(body){this.body=body;return this;}};
 await handler({method:'POST',body:{action:'create',tournamentId:'weekly-5',tournamentTitle:'Нокаут',startingBank:1000,stakePrice:100}},res);
 assert.equal(res.code,200);assert.equal(res.body.ok,true);assert.equal(notifications,0);assert.equal(saved.creationNotification.id,saved.id);assert.equal(saved.creationNotification.startingBank,1000);assert.equal(saved.creationNotification.creationNotification,undefined);assert.equal(locks.size,0);
});
