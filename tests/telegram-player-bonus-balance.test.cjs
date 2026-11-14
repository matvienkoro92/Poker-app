'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),{createRequire}=require('node:module');
const balance=require('../lib/telegram-player-bonus-balance');
test('bonus balance aliases accept only the sender private chat',()=>{
 for(const text of ['/бонус-баланс','/bonus_balance','/бонус-баланс@Poker_dvatuza_bot']){
  const message={text,from:{id:42},chat:{id:42,type:'private'}};assert.equal(balance.isCommand({message}),true);
  message.chat.type='supergroup';assert.equal(balance.isCommand({message}),false);
 }
 for(const text of ['/бонус-баланс 123','/bonus_balance@OtherBot'])assert.equal(balance.isCommand({message:{text,from:{id:42},chat:{id:42,type:'private'}}}),false);
});
test('reads canonical app balance freshly for each new command and retries without duplicate replies',async()=>{
 const path=require.resolve('../lib/telegram-player-bonus-balance'),localRequire=createRequire(path),store=new Map(),sent=[],accounts=[];let current=5690;
 const module={exports:{}};
 const pipeline=async cmds=>cmds.map(([op,key,...args])=>{
  if(op==='GET')return {result:store.get(key)||null};
  if(op==='HGET')return {result:'ID123456'};
  if(op==='SET'){if(args.includes('NX')&&store.has(key))return {result:null};store.set(key,args[0]);return {result:'OK'};}
  if(op==='EVAL'){store.delete(args[1]);return {result:1};}throw Error(op);
 });
 const mocks={'./redis':{pipeline},'./account-canonical':{canonicalAccountId:async()=> 'ID654321'},'./bonus-ledger':{getBonusBalance:async id=>{accounts.push(id);return current;}},'./telegram-group-policy':{guardedFetch:async(url,options)=>{sent.push(JSON.parse(options.body));return {ok:true,json:async()=>({ok:true})};}}};
 vm.runInNewContext(fs.readFileSync(path,'utf8'),{module,require:id=>mocks[id]||localRequire(id),Number,AbortSignal});
 const u={message:{text:'/бонус-баланс',message_id:7,from:{id:42},chat:{id:42,type:'private'}}};
 await module.exports.handle(u,'token');await module.exports.handle(u,'token');assert.equal(sent.length,1);assert.equal(sent[0].chat_id,42);assert.match(sent[0].text,/Ваш беккинг-баланс: 5\s690 ₽/);
 current=0;u.message.message_id=8;await module.exports.handle(u,'token');assert.match(sent[1].text,/баланс: 0 ₽/);assert.deepEqual(accounts,['ID654321','ID654321']);
});
