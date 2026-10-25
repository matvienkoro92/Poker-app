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
