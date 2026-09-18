'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {createService,SUBSCRIBERS_KEY}=require('../lib/review-topic-push');
const RAFFLE_KEY=require('../lib/raffle-tournament-push').SUBSCRIBERS_KEY;
function fixture(){
  const sets=new Map([[SUBSCRIBERS_KEY,new Set()],[RAFFLE_KEY,new Set(['ID000001'])],['disabled',new Set()]]),sent=[];
  const devices=new Set(['ID000001','ID000002']);
  const service=createService({disabledKey:'disabled',subscriptionPrefix:'sub:',pushConfigured:()=>true,
    redisPipeline:async commands=>commands.map(([cmd,key,id])=>{
      if(cmd==='HLEN')return {result:Number(devices.has(key.slice(4)))};
      const set=sets.get(key);assert.ok(set,'unknown key '+key);
      if(cmd==='SMEMBERS')return {result:[...set]};
      if(cmd==='SISMEMBER')return {result:Number(set.has(id))};
      if(cmd==='SADD')set.add(id);else if(cmd==='SREM')set.delete(id);else throw Error(cmd);
      return {result:1};
    }),sendToMemberDevices:async(id,payload)=>sent.push({id,payload})});
  return {sets,devices,sent,service};
}
test('review opt-in is independent from raffle subscription; disable preserves raffle',async()=>{
  const f=fixture();assert.equal((await f.service.status('ID000001')).subscribed,false);
  await f.service.setSubscription('ID000001',true);
  assert.equal((await f.service.status('ID000001')).subscribed,true);
  await f.service.setSubscription('ID000001',false);
  assert.ok(f.sets.get(RAFFLE_KEY).has('ID000001'));
  assert.equal(f.sets.get(SUBSCRIBERS_KEY).size,0);
});
test('new topic goes only to enabled subscribers, excluding author; link and dedupe are topic-specific',async()=>{
  const f=fixture();for(const id of ['ID000001','ID000002','ID000003'])f.sets.get(SUBSCRIBERS_KEY).add(id);
  const topic={id:'a'.repeat(24),authorId:'ID000002',authorNick:'Ник',question:'Как сыграть?'};
  await f.service.notifyCreated(topic);
  assert.deepEqual(f.sent.map(row=>row.id),['ID000001']);
  assert.equal(f.sent[0].payload.openUrl,'./?startapp=review_'+topic.id);
  assert.equal(f.sent[0].payload.dedupeKey,'review-topic:'+topic.id+':ID000001');
  f.sets.get('disabled').add('ID000001');await f.service.notifyCreated(topic);assert.equal(f.sent.length,1);
  await f.service.notifyCreated({...topic,deleted:true});assert.equal(f.sent.length,1);
});
test('enabling requires device/profile permission; disabling remains available',async()=>{
  const f=fixture();f.devices.clear();assert.equal((await f.service.setSubscription('ID000001',true)).code,'DEVICE_REQUIRED');
  f.devices.add('ID000001');f.sets.get('disabled').add('ID000001');
  assert.equal((await f.service.setSubscription('ID000001',true)).code,'PROFILE_DISABLED');
  assert.equal((await f.service.setSubscription('ID000001',false)).ok,true);
});
