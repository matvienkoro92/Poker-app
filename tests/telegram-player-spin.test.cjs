'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const spin=require('../lib/telegram-player-spin'),totals=require('../lib/daily-poker-player-totals');
const commands=require('../lib/telegram-club-commands');
test('spin aliases are private and do not accept another player id',()=>{
 for(const text of ['/крутка','/spin','/крутка@Poker_dvatuza_bot']){
  const update={message:{text,from:{id:42},chat:{id:42,type:'private'}}};assert.equal(spin.isCommand(update),true);assert.equal(commands.command(update),'player-spin');
  update.message.chat.type='supergroup';assert.equal(spin.isCommand(update),false);
 }
 for(const text of ['/spin 123','/spin@other_bot'])assert.equal(spin.isCommand({message:{text,from:{id:42},chat:{id:42,type:'private'}}}),false);
});
test('display covers availability, wait, blocks, combinations and both prize currencies',()=>{
 const t={count:5,ticket:300,bonus:100,'hand:pair':3,'hand:flush':2};
 const text=spin.format({payload:{canPlay:true,attemptsLeft:2}},t);
 assert.match(text,/Крутка доступна/);assert.match(text,/Всего круток: 5/);assert.match(text,/Выиграно всего: 400 ₽/);assert.match(text,/Пара: 3/);
 assert.match(spin.format({payload:{secondsUntilNextAttempt:3661}},t),/1 ч 2 мин/);
 assert.doesNotMatch(spin.format({payload:{canPlay:true},unavailable:'Ограничено'},t),/Крутка доступна/);
});
test('saved player totals require no archive reads and producer updates actual credits',async()=>{
 const calls=[];const result=await totals.read('ID123456',async cmds=>{calls.push(...cmds);return [{result:['ready','1','count','5','ticket','300','bonus','50']},{result:'5'}];});
 assert.equal(result.count,'5');assert.deepEqual(calls.map(c=>c[0]),['HGETALL','HGET']);
 const writes=totals.writes('ID123456',{hand_rank:'flush',bonus_credited:50,ticket_balance_credited:300,ticketless_streak_ticket_balance_credited:300});
 assert.deepEqual(writes.map(c=>c.slice(2)),[['count',1],['ticket',600],['bonus',50],['hand:flush',1]]);
});
test('first archive bootstrap deduplicates games and rejects a concurrent spin',async()=>{
 for(const saved of [0,1]){
  const calls=[];
  const pipeline=async cmds=>{calls.push(...cmds);return cmds.map(c=>({result:c[0]==='HGETALL'?[]:c[0]==='HGET'?'1':c[0]==='SCAN'?['0',['poker_app:daily_poker_games_date:ID123456:2026-11-14']]:c[0]==='LRANGE'?['g1']:c[0]==='MGET'?[JSON.stringify({hand_rank:'pair',bonus_credited:0})]:saved}));};
  if(saved){const r=await totals.read('ID123456',pipeline);assert.equal(r.count,'1');assert.equal(r['hand:pair'],'1');}
  else await assert.rejects(totals.read('ID123456',pipeline),/changed during bootstrap/);
  assert.equal(calls.filter(c=>c[0]==='MGET').length,1);
 }
});
test('delivery uses webhook sender, excludes unrelated accounts and deduplicates retries',async()=>{
 const fs=require('node:fs'),vm=require('node:vm'),{createRequire}=require('node:module');
 const path=require.resolve('../lib/telegram-player-spin'),localRequire=createRequire(path),store=new Map(),sent=[],readAccounts=[];
 const module={exports:{}};
 const pipeline=async cmds=>cmds.map(([op,key,...args])=>{
  if(op==='GET')return {result:store.get(key)||null};
  if(op==='HGET')return {result:key==='poker_app:visitor_dt_ids'?'ID123456':'208238'};
  if(op==='SET'){if(args.includes('NX')&&store.has(key))return {result:null};store.set(key,args[0]);return {result:'OK'};}
  if(op==='EVAL'){const lock=args[1],nonce=args[2];if(store.get(lock)===nonce)store.delete(lock);return {result:1};}
  throw Error(op);
 });
 const mocks={'./redis':{pipeline},'./account-canonical':{canonicalAccountId:async id=>id},'./api-handlers/promo':{telegramSpinStatus:async()=>({accounts:['ID123456','ID999999'],payload:{canPlay:true,attemptsLeft:1}})},'./daily-poker-player-totals':{read:async id=>{readAccounts.push(id);return {ready:'1',count:'2',ticket:'300',bonus:'0'};}},'./telegram-group-policy':{guardedFetch:async(url,options)=>{sent.push(JSON.parse(options.body));return {ok:true,json:async()=>({ok:true})};}}};
 vm.runInNewContext(fs.readFileSync(path,'utf8'),{module,require:id=>mocks[id]||localRequire(id),Number,AbortSignal,console});
 const u={message:{text:'/крутка',message_id:7,from:{id:42},chat:{id:42,type:'private'}}};
 await module.exports.handle(u,'token');await module.exports.handle(u,'token');
 assert.equal(sent.length,1);assert.equal(sent[0].chat_id,42);assert.deepEqual(readAccounts,['ID123456']);assert.match(sent[0].text,/Всего круток: 2/);
});
