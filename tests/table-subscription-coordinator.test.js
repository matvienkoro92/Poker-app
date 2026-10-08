'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {createCoordinator,fingerprint,interestsBetween}=require('../lib/table-subscription-coordinator');
const base={deskId:'1',deskName:'Test',leagueId:'184691',unionId:'7158',groupId:'680649',playType:'PLO6',blindAnnotation:'5/10',playerCount:2,pos:{pos1:123,pos2:456}};
function fixture() {
  const db=new Map(), commands=[];let tables=[base],clubCalls=0,fetches=0,clubFail=false,clubComplete=true;
  const redis={pipeline:async rows=>rows.map(([cmd,key,...args])=>{
    commands.push([cmd,key,...args]);let result=null;
    if(cmd==='GET')result=db.get(key)||null;
    else if(cmd==='SET'){if(!(args.includes('NX')&&db.has(key))){db.set(key,args[0]);result='OK';}}
    else if(cmd==='EVAL'){const [,lock,token]=args;result=db.get(lock)===token?Number(db.delete(lock)):0;}
    else throw Error(cmd);
    return {result};
  })};
  const poll=createCoordinator({redis,getTables:async()=>{fetches++;return structuredClone(tables);},pollClub:async(snapshot,interests)=>{clubCalls++;assert.deepEqual(snapshot,tables);assert.ok(interests);if(clubFail)throw Error('club offline');return {sent:1,complete:clubComplete};}});
  return {poll,commands,db,stats:()=>({clubCalls,fetches}),setTables:v=>tables=v,failClub:v=>clubFail=v,setClubComplete:v=>clubComplete=v};
}
test('one upstream request serves the club bot and unchanged snapshots skip subscription dispatch',async()=>{
  const f=fixture();assert.equal((await f.poll()).sent,1);
  f.commands.length=0;assert.equal((await f.poll()).unchanged,true);
  assert.deepEqual(f.stats(),{fetches:2,clubCalls:1});
  assert.equal(f.commands.filter(([cmd])=>cmd==='SET').length,1); // Only the lock.
  f.setTables([{...base,pos:{pos1:123,pos2:999}}]);await f.poll();
  assert.deepEqual(f.stats(),{fetches:3,clubCalls:2});
});
test('fingerprint ignores irrelevant table order, empty and private tables and seat rearrangements',()=>{
  const second={...base,deskId:'2'};
  assert.equal(fingerprint([base,second]),fingerprint([second,{...base,deskName:'Renamed',pos:{pos1:456,pos2:123}}, {...base,deskId:'3',playerCount:0},{...base,leagueId:'111'}]));
  assert.notEqual(fingerprint([base]),fingerprint([{...base,blindAnnotation:'25/50'}]));
  assert.notEqual(fingerprint([base]),fingerprint([]));
});
test('failed club dispatch retries on identical snapshot',async()=>{
  const f=fixture();f.failClub(true);await assert.rejects(f.poll(),/club offline/);
  f.failClub(false);await f.poll();assert.deepEqual(f.stats(),{fetches:2,clubCalls:2});
  assert.equal((await f.poll()).unchanged,true);
});
test('unfinished user scan is resumed despite identical seating',async()=>{
  const f=fixture();f.setClubComplete(false);assert.equal((await f.poll()).pending,true);
  f.setClubComplete(true);await f.poll();assert.deepEqual(f.stats(),{fetches:2,clubCalls:2});
  assert.equal((await f.poll()).unchanged,true);
});
test('an upstream failure cannot advance the snapshot or clear pending notifications',async()=>{
  const db=new Map();const redis={pipeline:async rows=>rows.map(([cmd,key,...args])=>{if(cmd==='SET'){db.set(key,args[0]);return {result:'OK'};}if(cmd==='EVAL'){db.delete(args[1]);return {result:1};}throw Error('Unexpected command');})};
  const poll=createCoordinator({redis,getTables:async()=>{throw Error('API unavailable');},pollClub:async()=>assert.fail()});
  await assert.rejects(poll(),/API unavailable/);assert.equal(db.size,0);
});


test('player seating changes select only that player, not every game subscriber',()=>{
  assert.deepEqual(interestsBetween([base],[{...base,pos:{pos1:123,pos2:999}}]),{players:['456','999'],games:[]});
  const interest=interestsBetween([],[base]);assert.deepEqual(interest.games,[{game:'PLO6',limit:{small:5,big:10}}]);
  assert.equal(interestsBetween([base],[]).games.length,1);
  assert.equal(interestsBetween([base],[{...base,blindAnnotation:'25/50'}]).games.length,2);
});
