'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),A=require('../lib/active-game');
function fixture(){const db=new Map();const commands=async rows=>rows.map(([op,key,value,...rest])=>{if(op==='SET'){db.set(key,value);return 'OK';}if(op==='GET')return db.get(key);if(op==='DEL')return db.delete(key);if(op==='EVAL'){if(db.get(rest[0])===rest[1])return db.delete(rest[0]);return 0;}throw Error(op);});const view={roomId:'ABCDEFGHJK',player:0,ready:true,state:{discipline:'long',winner:null},playerProfiles:[{name:'Автор'},{name:'Анна'}],wager:{stake:300}};return {db,view,args:{family:'board-games',member:'host',commands,service:{call:async()=>view}}};}
test('active room is account scoped and includes opponent without changing seats or funds',async()=>{const f=fixture();await A.remember({...f.args,view:f.view});assert.equal((await A.read(f.args)).active.opponent,'Анна');assert.equal((await A.read({...f.args,member:'other'})).active,null);assert.equal((await A.read({...f.args,family:'billiards'})).active,null);});
test('finished or expired rooms disappear; outages preserve the recovery pointer',async()=>{const f=fixture();await A.remember({...f.args,view:f.view});await assert.rejects(A.read({...f.args,service:{call:async()=>{throw Error('offline');}}}));assert.equal(f.db.size,1);f.view.state.winner=1;assert.equal((await A.read(f.args)).active,null);assert.equal(f.db.size,0);});
test('spectator cannot create a resume pointer',async()=>{const f=fixture();await A.remember({...f.args,view:{...f.view,spectator:true,player:-1}});assert.equal(f.db.size,0);});
test('unfinished series can be resumed between rounds; refunded series cannot',async()=>{
 const f=fixture();f.view.state.winner=0;f.view.match={target:3,winner:null};await A.remember({...f.args,view:f.view});
 assert.equal((await A.read(f.args)).active.roomId,f.view.roomId);
 f.view.state.winner='draw';f.view.wager.status='refunded';assert.equal((await A.read(f.args)).active,null);
});
test('cleaning an old room never deletes a newer recovery pointer',async()=>{
 const f=fixture();await A.remember({...f.args,view:f.view});
 const result=await A.read({...f.args,service:{call:async()=>{await A.remember({...f.args,view:{...f.view,roomId:'BCDEFGHJKL'}});return {...f.view,state:{winner:0}};}}});
 assert.equal(result.active,null);assert.equal([...f.db.values()][0],'BCDEFGHJKL');
});
