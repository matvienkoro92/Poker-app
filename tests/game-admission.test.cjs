'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),{create}=require('../lib/game-admission');
function fixture(multi=false){
 const db=new Map(),refunds=[],calls=[];let now=100000;
 const commands=async rows=>rows.map(([op,key,...args])=>{
  if(op==='GET')return db.get(key)||null;
  if(op==='HGET')return key==='poker_app:id_to_user'?'alias':null;
  if(op==='SSCAN')return ['0',[]];
  if(op==='MGET')return [key,...args].map(k=>db.get(k)||null);
  if(op==='SET'){if(args.includes('NX')&&db.has(key))return null;db.set(key,args[0]);return 'OK';}
  if(op==='EVAL'){if(db.get(args[1])===args[2]){db.delete(args[1]);return 1;}return 0;}
  throw Error(op);
 });
 const services=Object.fromEntries(['board-games','billiards'].map(family=>[family,{call:async(member,body)=>{
  calls.push({family,member,...body});const key='poker_app:'+family+':v1:'+body.roomId,r=JSON.parse(db.get(key));
  if(r.players[0]!==member||r.players[1])throw Object.assign(Error('already started'),{status:409});
  refunds.push(body.roomId);r.expires=now-1;db.set(key,JSON.stringify(r));return {ok:true};
 }}]));
 const guard=create({commands,services,resolve:async member=>multi&&member==='guest'?'ID654321':'ID123456',now:()=>now});
 const add=(family='board-games',ready=false,id='ABCDEFGHJK')=>{
  const r={id,expires:now+10000,players:['host',ready?'guest':null],playerProfiles:[{accountId:'ID123456'},null],state:{discipline:family==='board-games'?'chess':'pyramid',winner:null},match:{target:1,winner:null}};
  db.set('poker_app:'+family+':v1:'+id,JSON.stringify(r));db.set('poker_app:active-game:'+family+':host',id);return r;
 };
 const args={family:'board-games',member:'host',identity:{},body:{action:'join',roomId:'BCDEFGHJKL'}};
 return {db,guard,add,args,refunds,calls,advance:ms=>now+=ms};
}
test('created room blocks another invitation without cancelling or spending anything',async()=>{
 const f=fixture();f.add();const preview=await f.guard.inspect({...f.args,roomId:f.args.body.roomId});
 assert.equal(preview.conflict.canCancel,true);assert.equal(preview.conflict.member,undefined);
 await assert.rejects(()=>f.guard.begin(f.args),e=>e.code==='ACTIVE_GAME_EXISTS');assert.equal(f.refunds.length,0);
});
test('explicit confirmation cancels the waiting host room once through the refund service',async()=>{
 const f=fixture();f.add('billiards');
 const admission=await f.guard.begin({...f.args,body:{...f.args.body,cancelCreatedRoom:{family:'billiards',roomId:'ABCDEFGHJK'}}});
 assert.equal(f.refunds.length,1);assert.equal(f.calls[0].member,'host');
 await admission.remember({roomId:'BCDEFGHJKL',player:1,spectator:false,state:{winner:null}});await admission.release();
 const pointer=JSON.parse(f.db.get('poker_app:game-admission:v1:ID123456'));assert.equal(pointer.roomId,'BCDEFGHJKL');
});
test('game started since confirmation cannot be cancelled or replaced',async()=>{
 const f=fixture();f.add('board-games',false);assert.equal((await f.guard.inspect({...f.args,roomId:f.args.body.roomId})).conflict.canCancel,true);
 f.add('board-games',true);
 await assert.rejects(()=>f.guard.begin({...f.args,body:{...f.args.body,cancelCreatedRoom:{family:'board-games',roomId:'ABCDEFGHJK'}}}),e=>e.code==='ACTIVE_GAME_STARTED');
 assert.equal(f.refunds.length,0);
});
test('started matches block admission across game families, including between rounds',async()=>{
 const f=fixture(),r=f.add('billiards',true);r.state.winner=0;r.match.target=3;f.db.set('poker_app:billiards:v1:'+r.id,JSON.stringify(r));
 await assert.rejects(()=>f.guard.begin(f.args),e=>e.code==='ACTIVE_GAME_STARTED');
});
test('rejoining the same room and spectating require no cancellation; finished and expired rooms do not block',async()=>{
 const f=fixture(),r=f.add('board-games',true);
 let admission=await f.guard.begin({...f.args,body:{action:'join',roomId:r.id}});await admission.release();
 r.state.winner=0;r.match.winner=0;f.db.set('poker_app:board-games:v1:'+r.id,JSON.stringify(r));
 admission=await f.guard.begin(f.args);await admission.release();
 r.state.winner=null;r.expires=0;f.db.set('poker_app:board-games:v1:'+r.id,JSON.stringify(r));
 admission=await f.guard.begin(f.args);await admission.release();assert.equal(f.refunds.length,0);
});
test('account-wide admission lock serializes two devices, including aliases',async()=>{
 const f=fixture(),first=await f.guard.begin(f.args);
 await assert.rejects(()=>f.guard.begin({...f.args,member:'alias'}),e=>e.code==='GAME_ADMISSION_BUSY');
 await first.release();const next=await f.guard.begin({...f.args,member:'alias'});await next.release();
});
test('forged cancellation cannot cancel another room and outages keep the existing game intact',async()=>{
 const f=fixture();f.add();
 await assert.rejects(()=>f.guard.begin({...f.args,body:{...f.args.body,cancelCreatedRoom:{family:'billiards',roomId:'CDEFGHJKLM'}}}),e=>e.code==='ACTIVE_GAME_EXISTS');
 assert.equal(f.refunds.length,0);
});
test('idempotent paid creation may recover its own room but cannot create a different one',async()=>{
 const f=fixture(),requestId='recover_request_123456',id=require('../lib/billiards-wagers').roomIdFor('host',requestId,'board-games');
 f.add('board-games',false,id);
 const a=await f.guard.begin({...f.args,body:{action:'create',stake:100,requestId}});await a.release();
 await assert.rejects(()=>f.guard.begin({...f.args,body:{action:'create',stake:100,requestId:'different_request_123456'}}),e=>e.code==='ACTIVE_GAME_EXISTS');
});
test('rematch and replay acceptance also check the other player before creating a new party',async()=>{
 for(const action of ['rematch','replay-answer']){
  const f=fixture(true),old=f.add('board-games',true);old.state.winner=0;old.match.winner=0;
  f.db.set('poker_app:board-games:v1:'+old.id,JSON.stringify(old));
  const another={...old,id:'BCDEFGHJKL',players:['guest',null],playerProfiles:[{accountId:'ID654321'},null],state:{discipline:'chess',winner:null},match:{target:1,winner:null}};
  f.db.set('poker_app:board-games:v1:'+another.id,JSON.stringify(another));f.db.set('poker_app:active-game:board-games:guest',another.id);
  await assert.rejects(()=>f.guard.begin({...f.args,body:{action,roomId:old.id,accept:true}}),e=>e.code==='OPPONENT_ACTIVE_GAME');
  assert.equal(f.refunds.length,0);assert.ok(!f.db.has('poker_app:game-admission:v1:lock:ID123456'));assert.ok(!f.db.has('poker_app:game-admission:v1:lock:ID654321'));
 }
});
test('successful rematch remembers both players and releases both admission locks',async()=>{
 const f=fixture(true),old=f.add('board-games',true);old.state.winner=0;old.match.winner=0;f.db.set('poker_app:board-games:v1:'+old.id,JSON.stringify(old));
 const admission=await f.guard.begin({...f.args,body:{action:'rematch',roomId:old.id}});
 await admission.remember({roomId:old.id,player:0,spectator:false,state:{winner:null}});await admission.release();
 for(const id of ['ID123456','ID654321']){assert.equal(JSON.parse(f.db.get('poker_app:game-admission:v1:'+id)).roomId,old.id);assert.ok(!f.db.has('poker_app:game-admission:v1:lock:'+id));}
});
