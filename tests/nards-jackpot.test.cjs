'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {record}=require('../lib/nards-jackpot');
function room(history,extra={}){return {id:'ABCDEFGHJK',revision:10,match:{number:1,round:1},state:{discipline:'long',rollCount:history.length,rollHistory:history},...extra};}
const roll=(player,a,b=a)=>({player,dice:[a,b]});
function check(r,player=0,phase='roll'){record(r,{phase,rollCount:r.state.rollCount-1},player);return r.state.jackpot;}
test('each face and each player wins on their third identical double despite opponent throws',()=>{
 for(let face=1;face<=6;face++)for(const player of [0,1]){
  const r=room([roll(player,face),roll(1-player,2,3),roll(player,face),roll(1-player,1,5),roll(player,face)]);
  assert.equal(check(r,player).amount,1000);assert.equal(r.state.jackpot.player,player);assert.equal(r.state.jackpot.face,face);
 }
});
test('different doubles and ordinary throws interrupt the run; fourth throw does not duplicate',()=>{
 for(const history of [[roll(0,4),roll(0,3),roll(0,4)],[roll(0,4),roll(0,1,2),roll(0,4)],Array.from({length:4},()=>roll(0,4))])assert.equal(check(room(history)),undefined);
 assert.ok(check(room(Array.from({length:6},()=>roll(0,4)))));
});
test('opening throws, generated crazy doubles and unaccepted throws cannot win',()=>{
 const history=[roll(0,4),roll(0,4),roll(0,4)];
 assert.equal(check(room(history),0,'opening'),undefined);
 assert.equal(check(room(history.map(r=>({...r,opening:true})))),undefined);
 const r=room(history);record(r,{phase:'moving',rollCount:r.state.rollCount},0);assert.equal(r.state.jackpot,undefined);
});
test('free and paid rooms and tournaments award the same 1000 ticket',()=>{
 for(const extra of [{wagered:true},{tournament:{entryType:'chips'}},{tournament:{}}])assert.equal(check(room([roll(0,6),roll(0,6),roll(0,6)],extra)).amount,1000);
 assert.equal(check(room([roll(0,6),roll(0,6),roll(0,6)],{tournament:{entryType:'free'}})).amount,1000);
});

test('room records jackpot only after accepted server dice and rejects replayed revision',async()=>{
 let saved;
 const service=require('../lib/board-games-room')({now:()=>10000,random:()=> 'ABCDEFGHJK',dice:()=>[4,4],profile:async member=>({name:member,accountId:member==='host'?'ID123456':'ID654321'}),create:async(id,r)=>{saved=structuredClone(r);return true;},load:async()=>structuredClone(saved),cas:async(id,rev,r)=>{if(rev!==saved.revision)return false;saved=structuredClone(r);return true;}});
 await service.call('host',{action:'create',discipline:'long'});
 await service.call('guest',{action:'join',roomId:saved.id});
 saved.state.phase='roll';saved.state.opening=false;saved.state.turn=0;saved.state.rollCount=2;saved.state.rollHistory=[roll(0,4),roll(0,4)];
 const body={action:'move',roomId:saved.id,revision:saved.revision,move:{type:'roll',dice:[6,6]}};
 const result=await service.call('host',body);
 assert.equal(result.state.jackpot.amount,1000);assert.equal(result.state.jackpot.face,4);assert.equal(result.state.jackpot.revision,result.revision);
 await assert.rejects(service.call('host',body),e=>e.status===409);
 assert.equal(saved.state.rollCount,3);
});

test('reward preparation credits 1000 and queues announcement together, uses balance lock and receipt',async()=>{
 const actual=require('../lib/bonus-ledger'),{prepare}=require('../lib/nards-jackpot');let released=0,existing=false;
 const ledger={...actual,acquireRedisLock:async()=>({key:'balance-lock',value:'held'}),releaseRedisLock:async()=>released++,getBonusBalance:async()=>200};
 const r=room([roll(0,4),roll(0,4),roll(0,4)],{wagered:true,playerProfiles:[{accountId:'ID123456',name:'Анна'},{accountId:'ID654321'}]});check(r);r.revision++;
 const deps={ledger,redis:async()=>[existing?'issued':null]};
 const pending=await prepare(r,deps);
 const balance=pending.commands.find(c=>c[0]==='HSET'&&c[1]===actual.BONUS_BALANCES_KEY);assert.equal(balance[3],'1200');
 const ticket=pending.commands.find(c=>c[0]==='SET'&&c[1]==='poker_app:daily_poker_ticket:'+r.state.jackpot.id);assert.equal(JSON.parse(ticket[2]).amount,1000);
 assert.ok(pending.commands.some(c=>c[0]==='ZADD'&&c[1].includes('notice:pending:')));assert.equal(released,0);
 existing=true;assert.equal(await prepare(r,deps),null);assert.equal(released,1);
 existing=false;r.revision++;assert.equal(await prepare(r,deps),null);
});

test('failed balance read releases the account lock without creating ticket commands',async()=>{
 const {prepare}=require('../lib/nards-jackpot');let released=0;
 const r=room([roll(0,4),roll(0,4),roll(0,4)],{playerProfiles:[{accountId:'ID123456'},{accountId:'ID654321'}]});check(r);r.revision++;
 await assert.rejects(prepare(r,{ledger:{acquireRedisLock:async()=>({key:'lock',value:'held'}),releaseRedisLock:async()=>released++,getBonusBalance:async()=>{throw Error('offline');}},redis:async()=>[null]}),/offline/);
 assert.equal(released,1);
});
