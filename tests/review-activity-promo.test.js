'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const daily=require('../lib/daily-poker'),activity=require('../lib/review-activity'),ledger=require('../lib/bonus-ledger');
const source=fs.readFileSync(path.join(__dirname,'../lib/api-handlers/promo.js'),'utf8');
function harness({free=false,special=false}={}){
  const values=new Map(),locks=new Map(),writes=[];let balance=10,game=0;
  const now=new Date().toISOString(),state={baseAttemptUsed:!free,baseAttemptAt:free?'':now,extraAttemptGranted:false,extraAttemptUsed:false,ticketlessStreak:6,ticketlessStreakAt:now,updatedAt:now};
  values.set('state:ID1',JSON.stringify(state));
  values.set(activity.stateKey('ID1'),JSON.stringify({...activity.emptyState(),actions:5,spinsEarned:1,spinsAvailable:1,bonusEarned:10}));
  const ctx={...daily,...ledger,console,Date,JSON,Number,Math,String,
    BOT_TOKEN:'test',DAILY_POKER_REQUIRED_CHANNEL:'test',ROMAN_DAILY_POKER_LIMIT:100,TICKETLESS_STREAK_MIN_LEVEL:1,
    reviewActivity:{...activity,readState:async()=>JSON.parse(values.get(activity.stateKey('ID1')))},
    accountIdFromAuth:async()=> 'ID1',rememberUsername:async()=>{},pokerPlusIdForAccount:async()=> '123',
    checkTelegramParticipationGate:async()=>({ok:true}),normalizeRaffleDeviceId:x=>x,claimDailyPokerDevice:async()=>true,
    safeIdempotencyKey:x=>x,dailyPokerPlayerLevel:async()=>5,idemKey:(_,key)=>'idem:'+key,
    dailyPokerStreakEligibility:()=>({}),
    dailyWindow:()=>({serverTime:now,gameDate:activity.day(new Date(now)),timeZone:'Europe/Moscow'}),
    claimIdempotency:async key=>values.has(key)?{ok:false,replay:true,payload:JSON.parse(values.get(key))}:{ok:true},
    configuredTimeZone:()=> 'Europe/Moscow',dailyPokerAccountIdsForP21:async()=>['ID1'],
    acquireRedisLock:async key=>{assert.equal(locks.has(key),false);locks.set(key,'token');return {key,value:'token'};},
    releaseRedisLock:async lock=>locks.delete(lock.key),readDailyPokerStateForAccounts:async()=>JSON.parse(values.get('state:ID1')),
    isRomanDailyPokerIdentity:()=>false,getDailyPokerManualLimitForAccounts:async()=>special?1:0,
    getDailyPokerGamesTodayStats:async()=>({gamesPlayedToday:1,extraAttemptsGrantedToday:0}),
    romanDailyPokerStatePayload:games=>({attemptsLeft:0,canPlay:false,baseAttemptUsedToday:true,dailyGamesPlayed:games,specialDailyLimit:true}),
    getBonusBalance:async()=>balance,dailyPokerIdentityKey:()=> 'identity',checkDailyIdentityConflict:async()=>({ok:true}),
    dailyIdentityWriteCommands:()=>[],gameIdFromNow:()=> 'game'+(++game),ticketIdFromNow:()=> 'ticket'+game,
    stateKey:id=>'state:'+id,dailyPokerGamesDateKey:()=> 'games-date',lifetimePrizesCacheKey:()=> 'lifetime',
    dealDailyPokerHand:()=>({holeCards:['As','Ks'],boardCards:['2s','4s','8s','9h','Td']}),
    evaluateDailyPokerHand:()=>({rank:'flush',name:'Флеш',holeCardsContribute:true}),prizeTextForHand:()=> 'Флеш сегодня',
    syncDailyPokerReminderDue:async()=>({subscribed:false}),
    redisPipeline:async commands=>commands.map(([op,key])=>{if(op==='DEL')values.delete(key);return {result:1};}),
    atomicWrite:async(commands,opts)=>{
      opts.locks.filter(Boolean).forEach(lock=>assert.equal(locks.get(lock.key),lock.value));
      opts.balances.forEach(b=>assert.equal(balance,b.value));
      writes.push(commands);
      commands.forEach(([op,key,...args])=>{if(op==='SET')values.set(key,String(args[0]));if(op==='HSET'&&key==='poker_app:bonus_balances')balance=Number(args[1]);});
    },
    apiError:(res,status,error,extra)=>res.status(status).json({error,...extra})
  };
  for(const name of ['DAILY_POKER_LOCK_PREFIX','DAILY_POKER_GAME_PREFIX','DAILY_POKER_GAMES_USER_PREFIX','DAILY_POKER_SPIN_COUNTS_PREFIX','DAILY_POKER_USERS_KEY','DAILY_POKER_PLAYED_COUNT_KEY','DAILY_POKER_LAST_GAME_AT_KEY','DAILY_POKER_TICKET_PREFIX','DAILY_POKER_TICKETS_USER_PREFIX','DAILY_POKER_TICKET_COUNT_KEY'])ctx[name]=name+':';
  vm.createContext(ctx);vm.runInContext(source.slice(source.indexOf('async function handlePlay('),source.indexOf('\nmodule.exports = async function handler')),ctx);
  async function play(id){const res={statusCode:200,status(n){this.statusCode=n;return this;},json(body){this.body=body;return this;}};await ctx.handlePlay({},res,{deviceId:'test',idempotencyKey:id},{memberId:'1',identity:{}});return res;}
  return {play,values,locks,writes,state,balance:()=>balance};
}
test('promo spends activity spins atomically, pays real prizes, preserves daily streak and idempotency',async()=>{
  const h=harness();const first=await h.play('first');
  assert.equal(first.statusCode,200);assert.equal(first.body.attemptType,'activity');assert.equal(first.body.bonusBalance,60);
  assert.equal(first.body.activity.bonusEarned,60);assert.equal(first.body.activity.spinBonusEarned,50);assert.equal(first.body.activity.spinsAvailable,1);
  assert.deepEqual(JSON.parse(h.values.get('state:ID1')),h.state);assert.equal(h.locks.size,0);
  const replay=await h.play('first');assert.equal(replay.body.idempotentReplay,true);assert.equal(h.writes.length,1);assert.equal(h.balance(),60);
  const extra=await h.play('second');assert.equal(extra.body.attemptType,'activity-extra');assert.equal(extra.body.reward.grantsExtraAttempt,false);
  assert.equal(extra.body.activity.spinsAvailable,0);assert.equal(extra.body.activity.bonusEarned,110);assert.equal(h.balance(),110);
  const reportCommand=h.writes[1].find(command=>command[0]==='HSET'&&command[1]===activity.REPORT_KEY);
  const report=JSON.parse(reportCommand[3]);assert.equal(report.bonusEarned,110);assert.equal(report.spinBonusEarned,100);assert.equal(report.extraSpinsEarned,1);assert.equal(report.spinsAvailable+report.extraSpins,0);
  assert.deepEqual(JSON.parse(h.values.get('state:ID1')),h.state);
  const exhausted=await h.play('third');assert.equal(exhausted.statusCode,429);assert.equal(h.writes.length,2);assert.equal(h.locks.size,0);
});
test('free daily attempt is used before earned spins and keeps ordinary daily reward rules',async()=>{
  const h=harness({free:true});const r=await h.play('daily');
  assert.equal(r.body.attemptType,'base');assert.equal(r.body.activity.spinsAvailable,1);assert.equal(r.body.activity.bonusEarned,10);
  assert.equal(JSON.parse(h.values.get('state:ID1')).ticketlessStreak,0);assert.equal(h.balance(),60);
});
test('activity spins do not consume or extend special daily play allowances',async()=>{
  const h=harness({special:true});const r=await h.play('special');
  assert.equal(r.body.attemptType,'activity');assert.equal(r.body.dailyGamesPlayed,1);
  const game=JSON.parse(h.values.get('DAILY_POKER_GAME_PREFIX:game1'));
  assert.equal(game.extra_attempt_granted,false);assert.equal(game.activity_extra_attempt_granted,true);
});
