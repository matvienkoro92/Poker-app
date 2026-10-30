'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const rewards=require('../lib/game-spin-rewards'),activity=require('../lib/review-activity');
function harness(){
 const values=new Map(),locks=new Set();let failAfter=false,failBefore=false;
 const grant=rewards.create({activity:{...activity,readState:async id=>activity.normalizeState(JSON.parse(values.get(activity.stateKey(id))||'{}'))},
  read:async commands=>commands.map(c=>values.get(c[1])||null),
  acquire:async key=>{if(locks.has(key))return null;locks.add(key);return {key,value:'lock'};},release:async lock=>locks.delete(lock.key),
  write:async(commands,options)=>{
   if(failBefore){failBefore=false;throw Error('offline');}
   assert.ok(options.locks.every(l=>locks.has(l.key)));
   assert.ok(options.values.every(g=>(values.get(g.key)||'')===g.value));
   for(const [op,key,value]of commands)if(op==='SET')values.set(key,value);
   if(failAfter){failAfter=false;throw Error('lost acknowledgement');}
  }});
 return {grant,values,locks,failAfter:()=>failAfter=true,failBefore:()=>failBefore=true,count:id=>JSON.parse(values.get(activity.stateKey(id))||'{}').extraSpins||0};
}
const wager={id:'ABCDEFGHJK',stake:300,players:[{accountId:'ID000001'},{accountId:'ID000002'}]};
test('one spendable spin per account, retry-safe even when Redis commits but loses its response',async()=>{
 const h=harness();h.failAfter();await assert.rejects(h.grant({namespace:'billiards',wager}),/acknowledgement/);
 assert.equal(h.count('ID000001'),1);assert.equal(h.count('ID000002'),0);
 await h.grant({namespace:'billiards',wager});await h.grant({namespace:'billiards',wager});
 for(const p of wager.players){assert.equal(h.count(p.accountId),1);const state=activity.normalizeState(JSON.parse(h.values.get(activity.stateKey(p.accountId))));
  assert.equal(activity.attachSpins({attemptsLeft:0,canPlay:false},state).attemptsLeft,1);
  assert.equal(activity.spendSpin(state,'activity-extra',{}).extraSpins,0);
 }
 assert.equal(h.locks.size,0);
});
test('shares the spin account lock and does not overwrite a concurrent spin',async()=>{
 const h=harness(),key=activity.lockKey('ID000001');h.locks.add(key);
 await assert.rejects(h.grant({namespace:'board-games',wager}),/busy/);assert.equal(h.count('ID000001'),0);
 h.locks.delete(key);h.failBefore();await assert.rejects(h.grant({namespace:'board-games',wager}),/offline/);
 await h.grant({namespace:'board-games',wager});assert.equal(h.count('ID000001'),1);
});
test('threshold is the base stake, and distinct games each grant one spin',async()=>{
 const h=harness();await h.grant({namespace:'board-games',wager:{...wager,stake:299,reservedStake:897}});assert.equal(h.count('ID000001'),0);
 await h.grant({namespace:'board-games',wager});await h.grant({namespace:'board-games',wager:{...wager,id:'ABCDEFGHKJ',stake:1000}});
 assert.equal(h.count('ID000001'),2);
});
for(const [family,disciplines]of [['billiards',['pyramid','pool8']],['board-games',['chess','short','long']]]){
 for(const discipline of disciplines)test(discipline+': completed paid match rewards both, never on entry or repeat polls',async()=>{
  const h=harness(),f=require('./helpers/'+(family==='billiards'?'billiards':'board')+'-wager-fixture.cjs')({grantSpins:h.grant});
  let r=await f.service.call('m1',{action:'create',discipline,stake:300,requestId:'spin_reward_game_0001',raceTo:3});
  r=await f.call('m2','join',r.roomId);assert.equal(h.count('ID000001'),0);
  r=await f.call('m2','move',r.roomId,{revision:r.revision,move:{type:'resign'}});
  assert.equal(r.wager.status,'paid');for(const p of wager.players)assert.equal(h.count(p.accountId),1);
  assert.equal(r.wager.freeSpinReward.granted,true);
  await f.call('m1','room',r.roomId);await f.call('m2','room',r.roomId);await f.service.sweep();
  assert.equal(h.count('ID000001'),1);assert.equal(h.count('ID000002'),1);
 });
}
test('draw grants spins after refunds; cancellation, expiry, low stakes and legacy journals do not',async()=>{
 for(const scenario of ['draw','cancel','expiry','low','legacy']){
  const h=harness(),f=require('./helpers/billiards-wager-fixture.cjs')({grantSpins:h.grant});
  let r=await f.create(scenario==='low'?299:300);
  if(scenario==='cancel'){await f.call('m1','cancel',r.roomId);}
  else if(scenario==='expiry'){f.advance();await f.service.sweep();}
  else{
   r=await f.call('m2','join',r.roomId);
   if(scenario==='legacy')delete f.journals.get(r.roomId).spinRewardVersion;
   if(scenario==='draw'){
    r=await f.call('m1','move',r.roomId,{revision:r.revision,move:{type:'draw-offer'}});
    r=await f.call('m2','move',r.roomId,{revision:r.revision,move:{type:'draw-accept'}});assert.equal(r.wager.status,'refunded');
   }else r=await f.call('m2','move',r.roomId,{revision:r.revision,move:{type:'resign'}});
  }
  assert.equal(h.count('ID000001'),scenario==='draw'?1:0,scenario);assert.equal(h.count('ID000002'),scenario==='draw'?1:0,scenario);
 }
});
test('reward outage keeps settlement retryable without repeating wallet payments',async()=>{
 const h=harness(),f=require('./helpers/billiards-wager-fixture.cjs')({grantSpins:h.grant});
 let r=await f.create(300);r=await f.call('m2','join',r.roomId);h.failAfter();
 await assert.rejects(f.call('m2','move',r.roomId,{revision:r.revision,move:{type:'resign'}}),/acknowledgement/);
 const transfers=f.changes.length;assert.equal(f.journals.get(r.roomId).status,'paying');await f.service.sweep();
 assert.equal(f.journals.get(r.roomId).status,'paid');assert.equal(f.changes.length,transfers);
 assert.equal(h.count('ID000001'),1);assert.equal(h.count('ID000002'),1);
});
test('intermediate series rounds give no reward; the completed series grants just one to each',async()=>{
 const h=harness(),f=require('./helpers/board-wager-fixture.cjs')({grantSpins:h.grant});
 let r=await f.service.call('m1',{action:'create',discipline:'chess',stake:300,raceTo:3,requestId:'spin_series_rounds_001'});
 r=await f.call('m2','join',r.roomId);
 const raw=f.rooms.get(r.roomId);raw.state.winner=0;raw.state.endReason='checkmate';raw.match.wins=[1,0];raw.match.recorded=true;
 r=await f.call('m1','room',r.roomId);assert.equal(r.wager.status,'playing');assert.equal(r.wager.freeSpinReward.granted,false);assert.equal(h.count('ID000001'),0);
 raw.match.winner=0;raw.match.wins=[3,0];
 r=await f.call('m1','room',r.roomId);assert.equal(r.wager.status,'paid');assert.equal(h.count('ID000001'),1);assert.equal(h.count('ID000002'),1);
});
test('expired room with an already completed draw still grants both spins',async()=>{
 const h=harness(),f=require('./helpers/billiards-wager-fixture.cjs')({grantSpins:h.grant});
 let r=await f.create(300);r=await f.call('m2','join',r.roomId);const raw=f.rooms.get(r.roomId);raw.state.winner='draw';raw.state.endReason='agreement';
 f.advance();await f.service.sweep();assert.equal(f.journals.get(r.roomId).status,'refunded');assert.equal(h.count('ID000001'),1);assert.equal(h.count('ID000002'),1);
});
test('reward wording follows server confirmation and does not promise rewards on cancellation',async()=>{
 const {gameSpinRewardText}=await import('../scripts/shared/game-spin-reward.mjs');
 assert.equal(gameSpinRewardText({status:'paid'}),'');
 assert.match(gameSpinRewardText({status:'playing',freeSpinReward:{granted:false}}),/каждому \+1/);
 assert.match(gameSpinRewardText({status:'paid',freeSpinReward:{granted:true}}),/Каждому начислена 1/);
 assert.equal(gameSpinRewardText({status:'refunded',freeSpinReward:{granted:false}}),'');
});
