'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {RECEIVED_AT}=require('../lib/game-request-time');
async function fixture(control='blitz-3') {
 let time=100000,delay=0; const rooms=new Map();
 const service=require('../lib/board-games-room')({now:()=>time,random:()=> 'ABCDEFGHJK',
  load:async id=>{time+=delay;return structuredClone(rooms.get(id));},
  create:async(id,r)=>{rooms.set(id,structuredClone(r));return true;},
  cas:async(id,rev,r)=>{if(rooms.get(id).revision!==rev)return false;rooms.set(id,structuredClone(r));return true;}
 });
 const created=await service.call('host',{action:'create',discipline:'chess',timeControl:control});
 const room=await service.call('guest',{action:'join',roomId:created.roomId});
 const stored=rooms.get(room.roomId);stored.clockRemaining=[45000,45000];stored.turnDeadline=time+45000;
 return {service,rooms,room,now:()=>time,advance:ms=>time+=ms,delay:ms=>delay=ms};
}
test('last-minute clock charges thinking time, excluding four seconds of server preparation',async()=>{
 for(const [control,increment] of [['blitz-3',0],['blitz-3-2',2000]]){
  const f=await fixture(control);f.advance(1000);const received=f.now();
  f.advance(2000);f.delay(2000);
  const r=await f.service.call('host',{action:'move',roomId:f.room.roomId,revision:f.room.revision,
   move:{type:'move',from:'e2',to:'e4'},[RECEIVED_AT]:received});
  assert.equal(r.clockRemaining[0],44000+increment,'only the real one second and a single increment');
  assert.equal(r.turnDeadline-r.serverNow,45000,'opponent does not pay for preparing the prior move');
  assert.equal(r.state.turn,1);
 }
});
test('move received before flag fall is valid even if server work finishes after it',async()=>{
 const f=await fixture();const stored=f.rooms.get(f.room.roomId);stored.clockRemaining[0]=500;stored.turnDeadline=f.now()+500;
 f.advance(100);const received=f.now();f.advance(4000);f.delay(1000);
 const r=await f.service.call('host',{action:'move',roomId:f.room.roomId,revision:f.room.revision,
  move:{type:'move',from:'e2',to:'e4'},[RECEIVED_AT]:received});
 assert.equal(r.clockRemaining[0],400);assert.equal(r.state.winner,null);
});
test('JSON timestamps cannot backdate an expired move or grant time before the turn began',async()=>{
 const f=await fixture();f.advance(45001);
 await assert.rejects(()=>f.service.call('host',{action:'move',roomId:f.room.roomId,revision:f.room.revision,
  receivedAt:100000,serverReceivedAt:100000,move:{type:'move',from:'e2',to:'e4'}}),e=>e.status===409);
 const g=await fixture('blitz-3-2');
 const r=await g.service.call('host',{action:'move',roomId:g.room.roomId,revision:g.room.revision,
  move:{type:'move',from:'e2',to:'e4'},[RECEIVED_AT]:g.now()-10000});
 assert.equal(r.clockRemaining[0],47000,'cannot exceed starting balance plus one increment');
});
test('clock sync subtracts server work and ignores slower network samples',async()=>{
 const {clockSample,createClockSync}=await import('../scripts/board-games/clock-sync.mjs');
 const data={serverReceivedAt:1600,serverNow:6600};
 assert.deepEqual(clockSample(data,1000,6200),{offset:500,rtt:200,at:6200});
 const clock=createClockSync();assert.equal(clock.update(data,1000,6200),500);
 assert.equal(clock.update({serverReceivedAt:7600,serverNow:7700},7000,10000),500,'late packet cannot jump the display');
 clock.reset();assert.equal(clock.update({serverReceivedAt:10550,serverNow:10650},10000,10200),500);
});
test('API attaches trusted ingress time and stamps response after server work',async()=>{
 const fs=require('node:fs'),vm=require('node:vm'),f=await fixture();f.advance(1000);const sent=f.now();f.delay(2000);
 const module={exports:{}};
 vm.runInNewContext(fs.readFileSync(require.resolve('../lib/api-handlers/board-games'),'utf8'),{
  module,process:{env:{}},Date:{now:f.now},console,
  require(name){
   if(name==='../api-auth')return {authRequired:()=>({ok:true,memberId:'host',identity:{}}),parseBody:req=>req.body,setCors(){},isAdminIdentity:()=>false};
   if(name==='../billiards-access')return {hasBilliardsAccess:()=>true};
   if(name==='../redis')return {isConfigured:()=>true};
   if(name==='../board-games-service')return {service:f.service,commands:async()=>{f.advance(2000);return [1];}};
   if(name==='../game-result-notification')return async()=>false;
   if(name==='../game-request-time')return require('../lib/game-request-time');
   throw Error('Unexpected dependency '+name);
  }
 });
 let data;const res={setHeader(){},status(){return this;},json(value){data=value;return this;}};
 await module.exports({method:'POST',headers:{},body:{action:'move',roomId:f.room.roomId,revision:f.room.revision,
  serverReceivedAt:sent-99999,move:{type:'move',from:'e2',to:'e4'}}},res);
 assert.equal(data.serverReceivedAt,sent);assert.equal(data.serverNow,sent+4000);
 assert.equal(data.clockRemaining[0],44000);assert.equal(data.turnDeadline-data.serverNow,45000);
 const {clockSample}=await import('../scripts/board-games/clock-sync.mjs');
 assert.equal(clockSample(data,sent,f.now()).offset,0,'processing does not masquerade as clock skew');
});
test('per-move chess control also gives the opponent a full turn after delayed processing',async()=>{
 const f=await fixture('');f.advance(1000);const received=f.now();f.advance(2000);f.delay(2000);
 const r=await f.service.call('host',{action:'move',roomId:f.room.roomId,revision:f.room.revision,
  move:{type:'move',from:'e2',to:'e4'},[RECEIVED_AT]:received});
 assert.equal(r.turnDeadline-r.serverNow,60000);
});
test('fresh clocks start after admission work and after rematch loading',async()=>{
 let time=100000;const rooms=new Map();
 const service=require('../lib/board-games-room')({now:()=>time,random:()=> 'ABCDEFGHJK',
  profile:async member=>{if(member==='guest')time+=4000;return {name:member};},
  load:async id=>{time+=2000;return structuredClone(rooms.get(id));},
  create:async(id,r)=>{rooms.set(id,structuredClone(r));return true;},
  cas:async(id,rev,r)=>{rooms.set(id,structuredClone(r));return true;}
 });
 let r=await service.call('host',{action:'create',discipline:'chess',timeControl:'bullet-1'});
 r=await service.call('guest',{action:'join',roomId:r.roomId});assert.equal(r.turnDeadline-r.serverNow,60000);
 r=await service.call('host',{action:'move',roomId:r.roomId,revision:r.revision,move:{type:'resign'}});
 r=await service.call('host',{action:'rematch',roomId:r.roomId,revision:r.revision});
 r=await service.call('guest',{action:'rematch',roomId:r.roomId,revision:r.revision});
 assert.equal(r.turnDeadline-r.serverNow,60000);
});
