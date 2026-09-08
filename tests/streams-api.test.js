'use strict';
const test=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');const crypto=require('node:crypto');const path=require('node:path');
function setup(){
 let now=1000000,failRedis=false;const cache=new Map();const stored=new Map();let fetchImpl=async()=>{throw Error('Unexpected outbound call');};
 const env={LIVEKIT_URL:'wss://test.invalid',LIVEKIT_API_KEY:'test-key',LIVEKIT_API_SECRET:'test-secret',CLOUDFLARE_STREAM_RTMPS_URL:'rtmps://test.invalid/live',CLOUDFLARE_STREAM_RTMPS_KEY:'test-stream-key'};
 const redis={isConfigured:()=>true,pipeline:async commands=>{if(failRedis)throw Error('Unavailable');return commands.map(c=>{
  if(c[0]==='GET')return{result:stored.get(c[1])||null};
  if(c[0]==='HGET')return{result:null};
  if(c[0]==='SET'){if(stored.has(c[1]))return{result:null};stored.set(c[1],c[2]);return{result:'OK'};}
  if(c[0]==='EVAL'){const [,script,n,key,previous,next]=c;if((stored.get(key)||'')!==previous)return{result:0};if(next)stored.set(key,next);else stored.delete(key);return{result:1};}
  throw Error('Unexpected Redis command '+c[0]);
 });}};
 const auth={setCors(){},parseBody:req=>req.body||{},isAdminIdentity:()=>false};
 function load(file){file=path.resolve(__dirname,'..',file);if(cache.has(file))return cache.get(file).exports;const mod={exports:{}};cache.set(file,mod);
  const requireStub=id=>{
   if(id==='crypto')return crypto;if(id.endsWith('/redis'))return redis;if(id.endsWith('/api-auth'))return auth;
   if(id.endsWith('/resolve-telegram-auth'))return{resolveTelegramIdentity:(req,body)=>({memberId:body.userId||''}),memberIdFromIdentity:i=>i.memberId};
   if(id.endsWith('/account-id'))return{resolveAccountId:async id=>id};
   if(id.endsWith('/guest-member-id'))return{guestMemberIdFromDeviceId:d=>d?'guest_'+d:null};
   if(id.endsWith('/streams-state'))return load('lib/streams-state.js');throw Error('Unexpected require '+id);
  };
  vm.runInNewContext(fs.readFileSync(file,'utf8'),{require:requireStub,module:mod,exports:mod.exports,process:{env},Buffer,Date:class extends Date{static now(){return now;}},fetch:(...a)=>fetchImpl(...a),AbortSignal,console,URL},{filename:file});return mod.exports;
 }
 const current=load('lib/api-handlers/streams-current.js');const token=load('lib/api-handlers/livekit-token.js');const egress=load('lib/api-handlers/livekit-egress.js');
 async function call(handler,body,method='POST'){const res={code:200,setHeader(){},status(c){this.code=c;return this;},json(data){this.data=data;return this;},end(){return this;}};await handler({method,body,query:{}},res);return res;}
 const session='session-aaaaaaaa-11111111';const body={userId:'host-a',room:'123456',sessionId:session,mode:'delayed'};
 return{current,token,egress,call,body,env,load,advance:n=>now+=n,fail:()=>failRedis=true,setFetch:fn=>fetchImpl=fn};
}
test('current registration hides owner/session; heartbeat preserves start; expiry clears ghost stream',async()=>{
 const s=setup();const start=await s.call(s.current,{...s.body,action:'start'});assert.equal(start.code,200);assert.equal(start.data.stream.sessionId,undefined);assert.equal(start.data.stream.ownerId,undefined);const begun=start.data.stream.startedAt;
 s.advance(30000);const beat=await s.call(s.current,{...s.body,action:'heartbeat'});assert.equal(beat.data.stream.startedAt,begun);assert.equal(beat.data.stream.expiresAt,begun+180000);
 s.advance(151000);const get=await s.call(s.current,{},'GET');assert.equal(get.data.active,false);assert.equal((await s.call(s.current,{...s.body,action:'heartbeat'})).code,409);
});
test('second launch and foreign stop cannot replace or remove current stream',async()=>{
 const s=setup();await s.call(s.current,s.body);assert.equal((await s.call(s.current,{...s.body,sessionId:'session-bbbbbbbb-22222222'})).code,409);assert.equal((await s.call(s.current,{...s.body,userId:'host-b',action:'stop'})).code,409);assert.equal((await s.call(s.current,{...s.body,room:'',action:'stop'})).code,400);assert.equal((await s.call(s.current,{},'GET')).data.active,true);
});
test('old stop and heartbeat cannot remove or recreate a replacement session',async()=>{
 const s=setup();await s.call(s.current,s.body);await s.call(s.current,{...s.body,action:'stop'});const replacement={...s.body,sessionId:'session-bbbbbbbb-22222222'};await s.call(s.current,replacement);
 assert.equal((await s.call(s.current,{...s.body,action:'stop'})).code,409);assert.equal((await s.call(s.current,{...s.body,action:'heartbeat'})).code,409);assert.equal((await s.call(s.current,{...replacement,action:'heartbeat'})).code,200);
});
test('parallel starts claim exactly one current session',async()=>{
 const s=setup();const results=await Promise.all([s.call(s.current,s.body),s.call(s.current,{...s.body,sessionId:'session-bbbbbbbb-22222222'})]);assert.deepEqual(results.map(r=>r.code).sort(),[200,409]);
});
test('store outage returns explicit error, never pretends no stream is running',async()=>{
 const s=setup();s.fail();assert.equal((await s.call(s.current,{},'GET')).code,503);assert.equal((await s.call(s.current,s.body)).code,503);assert.equal((await s.call(s.token,{...s.body,role:'broadcast'})).code,503);
});
test('delayed source tokens are isolated from viewer tokens even with guessed mode/session',async()=>{
 const s=setup();await s.call(s.current,s.body);const host=await s.call(s.token,{...s.body,role:'broadcast'});const guest=await s.call(s.token,{room:s.body.room,role:'watch',mode:'delayed',sessionId:s.body.sessionId});assert.equal(host.code,200);assert.equal(guest.code,200);
 const decode=r=>JSON.parse(Buffer.from(r.data.token.split('.')[1],'base64url').toString());const h=decode(host),g=decode(guest);assert.notEqual(h.video.room,g.video.room);assert.equal(g.video.canPublish,false);assert.equal(g.video.room,'poker21-stream-123456');assert.ok(h.video.room.includes(s.body.sessionId));
});
test('unregistered/foreign publishers cannot acquire broadcast token or start egress',async()=>{
 const s=setup();assert.equal((await s.call(s.token,{...s.body,role:'broadcast'})).code,409);await s.call(s.current,s.body);assert.equal((await s.call(s.token,{...s.body,userId:'host-b',role:'broadcast'})).code,409);assert.equal((await s.call(s.egress,{...s.body,userId:'host-b'})).code,409);
});
test('instant host and watcher tokens target the same room',async()=>{
 const s=setup();await s.call(s.current,{...s.body,mode:'instant'});const host=await s.call(s.token,{...s.body,mode:'instant',role:'broadcast'});const viewer=await s.call(s.token,{room:s.body.room,role:'watch'});assert.equal(host.data.livekitRoom,viewer.data.livekitRoom);
});
test('egress retry reuses active export instead of starting duplicate',async()=>{
 const s=setup();await s.call(s.current,s.body);const room=s.load('lib/streams-state.js').livekitStreamRoom(s.body.room,'delayed',s.body.sessionId);let count=0;
 s.setFetch(async(url)=>{count++;assert.ok(url.endsWith('/ListEgress'));return{ok:true,json:async()=>({items:[{egress_id:'EG_test',room_name:room,status:1}]})};});
 const result=await s.call(s.egress,s.body);assert.equal(result.code,200);assert.equal(result.data.egressId,'EG_test');assert.equal(count,1);
});
test('egress failed response is not reported as successful delayed stream',async()=>{
 const s=setup();await s.call(s.current,s.body);s.setFetch(async url=>({ok:true,json:async()=>url.endsWith('/ListEgress')?{items:[]}:{egress_id:'EG_failed',status:4}}));assert.equal((await s.call(s.egress,s.body)).code,502);
});
test('egress stop cannot target export from another launch',async()=>{
 const s=setup();let calls=0;s.setFetch(async url=>{calls++;assert.ok(url.endsWith('/ListEgress'));return{ok:true,json:async()=>({items:[{egress_id:'EG_other',room_name:'different-room',status:1}]})};});assert.equal((await s.call(s.egress,{...s.body,action:'stop',egressId:'EG_other'})).code,404);assert.equal(calls,1);
});
test('parallel export creation is serialized and a retry reuses the first export',async()=>{
 const s=setup();await s.call(s.current,s.body);let resolve;const started=new Promise(r=>resolve=r);let starts=0;
 const room=s.load('lib/streams-state.js').livekitStreamRoom(s.body.room,'delayed',s.body.sessionId);let active=false;
 s.setFetch(async url=>{if(url.endsWith('/ListEgress'))return{ok:true,json:async()=>({items:active?[{egress_id:'EG_one',status:1,room_name:room}]:[]})};starts++;await started;active=true;return{ok:true,json:async()=>({egress_id:'EG_one',status:1})};});
 const first=s.call(s.egress,s.body);for(let i=0;i<40;i++)await Promise.resolve();const second=await s.call(s.egress,s.body);assert.equal(second.code,409);resolve();assert.equal((await first).code,200);assert.equal((await s.call(s.egress,s.body)).data.egressId,'EG_one');assert.equal(starts,1);
});
test('export finishing startup after host stops is immediately stopped on server',async()=>{
 const s=setup();await s.call(s.current,s.body);let resolve;const pending=new Promise(r=>resolve=r);const methods=[];
 s.setFetch(async url=>{const method=url.split('/').pop();methods.push(method);if(method==='StartRoomCompositeEgress')await pending;return{ok:true,json:async()=>method==='ListEgress'?{items:[]}:{egress_id:'EG_late',status:1}};});
 const start=s.call(s.egress,s.body);for(let i=0;i<40;i++)await Promise.resolve();await s.call(s.current,{...s.body,action:'stop'});resolve();assert.equal((await start).code,409);assert.ok(methods.includes('StopEgress'));
});
test('reserved launch is not advertised until publication is ready',async()=>{
 const s=setup();assert.equal((await s.call(s.current,{...s.body,action:'prepare'})).code,200);assert.equal((await s.call(s.current,{},'GET')).data.active,false);assert.equal((await s.call(s.token,{...s.body,role:'broadcast'})).code,200);await s.call(s.current,{...s.body,action:'start'});assert.equal((await s.call(s.current,{},'GET')).data.active,true);
});
