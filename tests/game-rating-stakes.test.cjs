'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {weightRows}=require('../lib/game-rating-stakes'),rating=require('../lib/game-rating-score');
const event=(stake,winner=0,id='ROOM')=>({room:{id,wagered:true,gameXpStake:stake,state:{winner},playerProfiles:[{accountId:'A'},{accountId:'B'}]}});
test('paid results use square-root stakes while factual counters remain unchanged',async()=>{
 const rows=[{id:'A',wins:1,losses:0,draws:1},{id:'B',wins:0,losses:1,draws:1}];
 const weighted=await weightRows({commands:async()=>assert.fail('snapshot has stakes'),rows,sources:[{a:event(400),b:event(900,'draw')}],roomPrefix:'rooms:'});
 assert.equal(weighted[0].weightedWins,2);assert.equal(weighted[0].weightedDraws,3);assert.equal(weighted[1].weightedLosses,2);assert.equal(weighted[0].wins,1);assert.equal(rows[0].weightedWins,undefined);
 assert.ok(Math.abs(rating.score(weighted[0])-100*2*2/12)<1e-10);
 assert.ok(rating.score(weighted[0])>rating.score(rows[0]));
 assert.ok(rating.score({...weighted[0],weightedLosses:4})<rating.score(weighted[0]));
 assert.equal(rating.stakeCoefficient(100),1);assert.equal(rating.stakeCoefficient(400),2);assert.equal(rating.stakeCoefficient(0),1);
});
test('historical stakes come from persisted journals; missing stakes retain weight one',async()=>{
 const rows=[{id:'A',wins:3,losses:0,draws:0}];
 const weighted=await weightRows({commands:async commands=>{assert.deepEqual(commands,[['MGET','rooms:wager:OLD','rooms:wager:UNKNOWN']]);return [[JSON.stringify({stake:1600}),null]];},rows,sources:[{a:event(undefined,0,'OLD'),b:event(undefined,0,'UNKNOWN'),c:event(100)}],roomPrefix:'rooms:'});
 assert.equal(weighted[0].weightedWins,6);assert.equal(weighted[0].wins,3);
});
test('paid weights never include free results or reserve/mars multipliers',async()=>{
 const free=event(10000);free.room.wagered=false;
 const paid=event(400);paid.room.reservedStake=40000;paid.room.marsMultiplier=100;
 const [row]=await weightRows({commands:async()=>assert.fail(),rows:[{id:'A',wins:1,losses:0,draws:0}],sources:[{free,paid}],roomPrefix:'r:'});
 assert.equal(row.weightedWins,2);
});
test('app and Telegram paid rankings compute identical scores from result snapshots',async()=>{
 const board=require('../lib/board-games-stats'),telegram=require('../lib/telegram-game-rankings'),original=board.migrateLegacy;
 board.migrateLegacy=async()=>({unresolved:0});
 const players={A:JSON.stringify({name:'A',wins:1,losses:0,draws:0}),B:JSON.stringify({name:'B',wins:0,losses:1,draws:0})},results={one:event(900)};
 const commands=async queries=>queries.map(([op,key])=>op==='LRANGE'?[]:op==='HGET'?(players.A):op==='HGETALL'&&key.endsWith(':results')?results:op==='HGETALL'&&key.endsWith(':players')?players:{});
 try{
  const app=await board.read({commands,discipline:'chess',accountId:'A',mode:'paid',migration:false});
  const chat=await telegram.readPlayers({commands,game:'chess',mode:'paid'});
  assert.equal(app.self.ratingScore,chat.find(p=>p.id==='A').ratingScore);assert.equal(app.ranking[0].ratingScore,chat[0].ratingScore);assert.equal(app.self.ratingScore,69.23);
  const billiards=await require('../lib/billiards-stats').read({commands,discipline:'pyramid',accountId:'A'});
  assert.equal(billiards.self.ratingScore,app.self.ratingScore);
 }finally{board.migrateLegacy=original;}
});
test('nards mars and koks boost only the winner and use fixed rating bonuses',async()=>{
 for(const discipline of ['short','long'])for(const endReason of ['borne-off','resign'])for(const [winKind,bonus]of [['single',1],['mars',1.25],['koks',1.5]]){
  const result=event(400);Object.assign(result.room.state,{discipline,endReason,winKind});result.room.marsMultiplier=10;result.room.koksMultiplier=10;
  const rows=await weightRows({commands:async()=>assert.fail(),rows:[{id:'A',wins:1,losses:0,draws:0},{id:'B',wins:0,losses:1,draws:0}],sources:[{result}],roomPrefix:'r:'});
  assert.equal(rows[0].weightedWins,2*bonus);assert.equal(rows[1].weightedLosses,2);assert.equal(rows[0].wins,1);assert.equal(rows[1].losses,1);
  assert.ok(Math.abs(rating.score(rows[0])-100*(2*bonus)**2/(2*bonus+10))<1e-10);
 }
});
test('mars/koks do not affect free games, other disciplines or unknown finishes',async()=>{
 const {victoryBonus}=require('../lib/game-rating-stakes');
 assert.equal(victoryBonus({discipline:'chess',endReason:'resign',winKind:'koks'}),1);
 assert.equal(victoryBonus({discipline:'long',endReason:'timeout',winKind:'koks'}),1);
 assert.equal(victoryBonus({discipline:'long',endReason:'borne-off'}),1);
 const result=event(400);result.room.wagered=false;Object.assign(result.room.state,{discipline:'long',endReason:'borne-off',winKind:'koks'});
 const [row]=await weightRows({commands:async()=>assert.fail(),rows:[{id:'A',wins:1,losses:0,draws:0}],sources:[{result}],roomPrefix:'r:',mode:'all'});assert.equal(row.weightedWins,1);
});
