const fs = require('fs'), vm = require('vm'), assert = require('node:assert/strict');
const source = fs.readFileSync('app-push.js', 'utf8');
const sync = source.slice(source.indexOf('var pokerChatPushSyncInFlight ='), source.indexOf('\nfunction pokerChatPushForceRepair'));
async function run({enabled=true, current=false, sub=true, key='key'}={}) {
  const requests=[]; let rotations=0;
  const subscription={endpoint:'https://push.example/current',toJSON(){return {endpoint:this.endpoint,keys:{auth:'a',p256dh:'b'}};}};
  const c={Promise,Notification:{permission:'granted'},pokerChatPushClientSupported:()=>true,pokerApiHasCredential:()=>true,getApiBase:()=>'/api',pokerFetchChatPushConfig:async()=>({pushConfigured:true,publicKey:'key'}),navigator:{serviceWorker:{ready:Promise.resolve({pushManager:{getSubscription:async()=>sub?subscription:null}})}},pokerApiAuthJsonBody:x=>x,pokerChatPushStoredVapidKey:()=>key,pokerChatPushSubscribeToBrowser:async()=>{rotations++;},fetch:async(url,opts)=>{requests.push(JSON.parse(opts.body));return {json:async()=>({ok:true,notificationsEnabled:enabled,hasSubscription:true,hasCurrentSubscription:current})};}};
  vm.createContext(c); vm.runInContext(sync,c);
  await Promise.all([c.pokerChatPushSyncIfNeeded(),c.pokerChatPushSyncIfNeeded()]);
  return {requests,rotations};
}
(async()=>{
  let r=await run();assert.equal(r.requests.length,2);assert.equal(r.requests[0].endpoint,'https://push.example/current');assert.equal(r.requests[1].action,'subscribe');assert.equal(r.rotations,0);
  r=await run({current:true});assert.equal(r.requests.length,1);assert.equal(r.rotations,0);
  r=await run({enabled:false});assert.equal(r.requests.length,1);assert.equal(r.rotations,0);
  r=await run({sub:false});assert.equal(r.rotations,1);
  r=await run({key:'old'});assert.equal(r.rotations,1);
  console.log('PASS current-device repair, healthy/disabled preservation, missing subscription, key rotation, concurrent sync');
})().catch(e=>{console.error(e);process.exitCode=1;});
