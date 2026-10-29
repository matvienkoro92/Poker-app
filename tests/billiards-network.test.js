const test=require('node:test'),assert=require('node:assert/strict');
test('polling retries room conflicts without reporting a connection outage',async t=>{
 const {createSession}=await import('../scripts/billiards/network.mjs');
 t.mock.timers.enable({apis:['setTimeout']});
 let reads=0,updates=0;const errors=[],session=createSession({request:async body=>{if(body.action==='room'&&++reads===1){const e=Error('Комната обновляется');e.status=409;throw e;}return {roomId:'ABCDEFGHJK',revision:reads,ready:true};},onUpdate(){updates++;},onError(...args){errors.push(args);}});
 try{await session.start(true,'');t.mock.timers.tick(150);await new Promise(setImmediate);assert.equal(reads,1);assert.deepEqual(errors,[]);t.mock.timers.tick(650);await new Promise(setImmediate);assert.equal(reads,2);assert.equal(updates,2);}finally{session.close();t.mock.timers.reset();}
});
test('participant opening spectator link regains move transport; strangers remain read only',async()=>{
 const {createSession}=await import('../scripts/billiards/network.mjs');
 for(const participant of [true,false]){
  const calls=[],session=createSession({request:async body=>{calls.push(body.action);return {roomId:'ABCDEFGHJK',revision:1,ready:true,player:participant?0:-1,spectator:!participant};},onUpdate(){},onError(e){assert.fail(e);}});
  try{await session.start(false,'ABCDEFGHJK',{watch:true});await session.move({type:'shot'});assert.deepEqual(calls,participant?['watch','move']:['watch']);}finally{session.close();}
 }
});
test('server restores each existing participant from watch link without admitting a stranger',async()=>{
 let saved;const service=require('../lib/billiards-room')({create:async(id,r)=>{saved=r;return true;},load:async()=>structuredClone(saved),cas:async(id,rev,r)=>{saved=r;return true;},random:()=> 'ABCDEFGHJK'});
 await service.call('host',{action:'create'});await service.call('guest',{action:'join',roomId:'ABCDEFGHJK'});
 for(const [member,player]of [['host',0],['guest',1],['stranger',-1]]){
  const d=await service.call(member,{action:'watch',roomId:'ABCDEFGHJK'});assert.equal(d.player,player);assert.equal(d.spectator,player<0);assert.equal(d.equipmentSource,'host');
 }
});
test('background sessions keep a light heartbeat and resume polling promptly without stale aim',async t=>{
 const {createSession}=await import('../scripts/billiards/network.mjs'),prior=global.document;
 const listeners=new Map(),calls=[];global.document={hidden:false,addEventListener:(n,f)=>listeners.set(n,f),removeEventListener:n=>listeners.delete(n)};
 t.mock.timers.enable({apis:['setTimeout']});
 const session=createSession({request:async body=>{calls.push(body);return {roomId:'ABCDEFGHJK',revision:1,ready:true};},getAim:()=>({angle:1}),onUpdate(){},onError:assert.fail});
 try{await session.start(true,'');t.mock.timers.tick(150);await new Promise(setImmediate);assert.ok(calls.at(-1).aim);document.hidden=true;t.mock.timers.tick(650);await new Promise(setImmediate);assert.equal(calls.at(-1).aim,undefined);const count=calls.length;t.mock.timers.tick(1999);await new Promise(setImmediate);assert.equal(calls.length,count);t.mock.timers.tick(1);await new Promise(setImmediate);assert.equal(calls.length,count+1);document.hidden=false;listeners.get('visibilitychange')();t.mock.timers.tick(0);await new Promise(setImmediate);assert.ok(calls.at(-1).aim);}finally{session.close();assert.equal(listeners.size,0);t.mock.timers.reset();global.document=prior;}
});
test('lost join response restores the existing room without repeating admission',async()=>{
 const {createSession}=await import('../scripts/billiards/network.mjs'),calls=[],updates=[],errors=[];
 const session=createSession({request:async b=>{calls.push(b.action);if(b.action==='join')throw Object.assign(Error('Lost response after payment'),{status:503});return {roomId:'ABCDEFGHJK',revision:1,ready:true,player:1};},onUpdate:d=>updates.push(d),onError:e=>errors.push(e)});
 try{await session.start(false,'ABCDEFGHJK');assert.deepEqual(calls,['join','room']);assert.equal(updates[0].ready,true);assert.deepEqual(errors,[]);}finally{session.close();}
});
test('failure from a poll started before a confirmed move cannot report a new outage',async t=>{
 const {createSession}=await import('../scripts/billiards/network.mjs');t.mock.timers.enable({apis:['setTimeout']});let rejectPoll;const errors=[];
 const session=createSession({request:async b=>b.action==='room'?new Promise((_,reject)=>{rejectPoll=reject;}):{roomId:'ABCDEFGHJK',revision:b.action==='move'?2:1,ready:true},onUpdate(){},onError:e=>errors.push(e)});
 try{await session.start(true,'');t.mock.timers.tick(150);await new Promise(setImmediate);await session.move({type:'shot'});rejectPoll(Object.assign(Error('Old failed request'),{status:503}));await new Promise(setImmediate);assert.deepEqual(errors,[]);}finally{session.close();t.mock.timers.reset();}
});
test('return cancels a frozen read, adopts a fresh snapshot and rejects the late response',async t=>{
 const {createSession}=await import('../scripts/billiards/network.mjs'),prior=global.document,listeners=new Map(),updates=[],errors=[];
 global.document={hidden:false,addEventListener:(n,f)=>listeners.set(n,f),removeEventListener:n=>listeners.delete(n)};t.mock.timers.enable({apis:['setTimeout']});
 let reads=0,release,oldSignal;const session=createSession({request:async(body,signal)=>{if(body.action==='room'&&++reads===1){oldSignal=signal;return new Promise(resolve=>{release=()=>resolve({roomId:'ABCDEFGHJK',revision:1});});}return {roomId:'ABCDEFGHJK',revision:reads?3:1};},onUpdate:d=>updates.push(d.revision),onError:e=>errors.push(e)});
 try{await session.start(true,'');t.mock.timers.tick(150);await new Promise(setImmediate);document.hidden=true;listeners.get('visibilitychange')();document.hidden=false;listeners.get('visibilitychange')();assert.equal(oldSignal.aborted,true);t.mock.timers.tick(0);await new Promise(setImmediate);assert.equal(updates.at(-1),3);release();await new Promise(setImmediate);assert.deepEqual(updates,[1,3]);assert.deepEqual(errors,[]);}finally{session.close();t.mock.timers.reset();global.document=prior;}
});
