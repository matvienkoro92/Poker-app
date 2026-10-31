'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function fixture(family,blocked=false,fail=false,returning=false,subscriptionsUnavailable=false){
 const calls=[],module={exports:{}};
 const admission={remember:async()=>calls.push('remember'),release:async()=>{await Promise.resolve();calls.push('release');}};
 const service={call:async(member,body)=>{calls.push(body.action);if(fail&&body.action==='join')throw Object.assign(Error('Service unavailable'),{status:503});if(body.action==='preview')return {discipline:'chess',participant:returning};return {ok:true,roomId:body.roomId,ready:true,player:1,state:{discipline:'chess',winner:null},match:{winner:null}};}};
 const requireStub=name=>{
  if(name==='../api-auth')return {authRequired:()=>({ok:true,memberId:'host',identity:{}}),parseBody:req=>req.body,setCors(){},isAdminIdentity:()=>false};
  if(name==='../billiards-access')return {hasBilliardsAccess:()=>true};
  if(name==='../redis')return {isConfigured:()=>true};
  if(name==='../board-games-service'||name==='../billiards-service')return {service,commands:async()=>[1]};
  if(name==='../game-participation-gate')return {check:async()=>{calls.push('subscription');return subscriptionsUnavailable?{ok:false,code:'GAME_SUBSCRIPTION_UNAVAILABLE'}:{ok:true};}};
  if(name==='../game-admission')return {forApi:()=>({begin:async args=>{
   calls.push('guard');assert.equal(args.member,'host');assert.equal(args.family,family);
   if(blocked)throw Object.assign(Error('Finish current game'),{status:409,code:'ACTIVE_GAME_STARTED'});
   return admission;
  },inspect:async()=>({ok:true,conflict:{roomId:'BCDEFGHJKL',canCancel:true}})})};
  if(name==='../active-game')return {remember:async()=>{}};
  if(name==='../game-reactions')return {read:async()=>[]};
  if(name==='../board-games-challenge'||name==='../billiards-challenge-accepted'||name==='../game-result-notification')return async()=>{};
  if(name==='../game-request-time')return require('../lib/game-request-time');
  throw Error('Unexpected dependency '+name);
 };
 vm.runInNewContext(fs.readFileSync(require.resolve('../lib/api-handlers/'+family),'utf8'),{module,require:requireStub,process:{env:{}},Date,console});
 return {calls,async call(action,extra={}){let data,status=200;const res={setHeader(){},status(n){status=n;return this;},json(v){calls.push('response');data=v;return this;}};
  await module.exports({method:'POST',headers:{},body:{action,roomId:'ABCDEFGHJK',...extra}},res);return {status,data};
 }};
}
for(const family of ['board-games','billiards']){
 test(family+': server guard runs before join and remembers admission before releasing the lock',async()=>{
  const f=fixture(family),r=await f.call('join');assert.equal(r.status,200);
  assert.ok(f.calls.indexOf('guard')<f.calls.indexOf('join'));assert.ok(f.calls.indexOf('remember')>f.calls.indexOf('join'));assert.ok(f.calls.indexOf('release')<f.calls.indexOf('response'));assert.equal(f.calls.filter(c=>c==='release').length,1);
 });
 test(family+': failed admission releases its lock before sending the error response',async()=>{const f=fixture(family,false,true),r=await f.call('join');assert.equal(r.status,503);assert.ok(f.calls.indexOf('release')<f.calls.indexOf('response'));});
 test(family+': direct API join cannot bypass an existing started party',async()=>{
  const f=fixture(family,true),r=await f.call('join');assert.equal(r.status,409);assert.equal(r.data.code,'ACTIVE_GAME_STARTED');assert.equal(f.calls.includes('join'),false);
 });
 test(family+': existing participant can resume during subscription outage; forged membership cannot admit a newcomer',async()=>{
  const returning=fixture(family,false,false,true,true),r=await returning.call('join');assert.equal(r.status,200);assert.equal(returning.calls.includes('subscription'),false);assert.equal(returning.calls.includes('join'),true);
  const newcomer=fixture(family,false,false,false,true),rejected=await newcomer.call('join',{participant:true,skipGate:true});assert.equal(rejected.status,503);assert.equal(newcomer.calls.includes('join'),false);assert.equal(newcomer.calls.includes('guard'),false);
 });
 test(family+': inspecting admission and watching do not reserve or cancel a party',async()=>{
  const f=fixture(family);const preview=await f.call('admission');assert.equal(preview.data.conflict.canCancel,true);await f.call('watch');assert.equal(f.calls.includes('guard'),false);
 });
}
