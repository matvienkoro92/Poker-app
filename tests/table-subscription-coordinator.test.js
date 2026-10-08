'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {createCoordinator,fingerprint}=require('../lib/table-subscription-coordinator');
const base={deskId:'1',deskName:'Test',leagueId:'184691',unionId:'7158',groupId:'680649',playType:'PLO6',blindAnnotation:'5/10',playerCount:2,pos:{pos1:123,pos2:456}};
function fixture() {
  const db=new Map(), commands=[];let tables=[base],clubCalls=0,reportCalls=0,fetches=0,reportFail=false,clubComplete=true;
  const redis={pipeline:async rows=>rows.map(([cmd,key,...args])=>{
    commands.push([cmd,key,...args]);let result=null;
    if(cmd==='GET')result=db.get(key)||null;
    else if(cmd==='SET'){if(!(args.includes('NX')&&db.has(key))){db.set(key,args[0]);result='OK';}}
    else if(cmd==='EVAL'){const [,lock,token]=args;result=db.get(lock)===token?Number(db.delete(lock)):0;}
    else throw Error(cmd);
    return {result};
  })};
  const poll=createCoordinator({redis,getTables:async()=>{fetches++;return structuredClone(tables);},pollClub:async snapshot=>{clubCalls++;assert.deepEqual(snapshot,tables);return {sent:1,complete:clubComplete};},pollReport:async snapshot=>{reportCalls++;assert.deepEqual(snapshot,tables);if(reportFail)throw Error('report offline');return {sent:2,complete:true};}});
  return {poll,commands,db,stats:()=>({clubCalls,reportCalls,fetches}),setTables:v=>tables=v,failReport:v=>reportFail=v,setClubComplete:v=>clubComplete=v};
}
test('one upstream request serves both bots and unchanged snapshots skip both dispatches',async()=>{
  const f=fixture();assert.equal((await f.poll()).sent,3);
  f.commands.length=0;assert.equal((await f.poll()).unchanged,true);
  assert.deepEqual(f.stats(),{fetches:2,clubCalls:1,reportCalls:1});
  assert.equal(f.commands.filter(([cmd])=>cmd==='SET').length,1); // Only the lock.
  f.setTables([{...base,pos:{pos1:123,pos2:999}}]);await f.poll();
  assert.deepEqual(f.stats(),{fetches:3,clubCalls:2,reportCalls:2});
});
test('fingerprint ignores irrelevant table order, empty and private tables and seat rearrangements',()=>{
  const second={...base,deskId:'2'};
  assert.equal(fingerprint([base,second]),fingerprint([second,{...base,deskName:'Renamed',pos:{pos1:456,pos2:123}}, {...base,deskId:'3',playerCount:0},{...base,leagueId:'111'}]));
  assert.notEqual(fingerprint([base]),fingerprint([{...base,blindAnnotation:'25/50'}]));
  assert.notEqual(fingerprint([base]),fingerprint([]));
});
test('failed report dispatch retries on identical snapshot without repeating successful club work',async()=>{
  const f=fixture();f.failReport(true);await assert.rejects(f.poll(),/dispatch incomplete/);
  f.failReport(false);await f.poll();assert.deepEqual(f.stats(),{fetches:2,clubCalls:1,reportCalls:2});
  assert.equal((await f.poll()).unchanged,true);
});
test('unfinished user scan is resumed despite identical seating',async()=>{
  const f=fixture();f.setClubComplete(false);assert.equal((await f.poll()).pending,true);
  f.setClubComplete(true);await f.poll();assert.deepEqual(f.stats(),{fetches:2,clubCalls:2,reportCalls:1});
  assert.equal((await f.poll()).unchanged,true);
});
test('an upstream failure cannot advance the snapshot or clear pending notifications',async()=>{
  const db=new Map();const redis={pipeline:async rows=>rows.map(([cmd,key,...args])=>{if(cmd==='SET'){db.set(key,args[0]);return {result:'OK'};}if(cmd==='EVAL'){db.delete(args[1]);return {result:1};}throw Error('Unexpected command');})};
  const poll=createCoordinator({redis,getTables:async()=>{throw Error('API unavailable');},pollClub:async()=>assert.fail(),pollReport:async()=>assert.fail()});
  await assert.rejects(poll(),/API unavailable/);assert.equal(db.size,0);
});
