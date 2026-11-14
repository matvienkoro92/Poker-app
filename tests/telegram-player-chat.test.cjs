'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),{createRequire}=require('node:module');
const chat=require('../lib/telegram-player-chat'),{orderedCommands}=require('../scripts/set-telegram-private-deposit-command.cjs');
test('menu starts in the requested order and preserves remaining commands',()=>{
 const existing=[{command:'stats',description:'Моя статистика'},{command:'dep',description:'old'},{command:'tables',description:'Столы сейчас'},{command:'schedule',description:'old'}];
 const result=orderedCommands(existing);assert.deepEqual(result.slice(0,7).map(c=>c.command),['dep','chat','create_game','withdrawals','schedule','spin','bonus_balance']);assert.deepEqual(result.slice(7),[existing[0],existing[2]]);
});
test('chat commands accept the sender private chat only',()=>{
 for(const text of ['/чат','/chat','/chat@Poker_dvatuza_bot']){
  const m={text,from:{id:42},chat:{id:42,type:'private'}};assert.equal(chat.isCommand({message:m}),true);m.chat.type='supergroup';assert.equal(chat.isCommand({message:m}),false);
 }
 for(const text of ['/chat@OtherBot','/chat 123'])assert.equal(chat.isCommand({message:{text,from:{id:42},chat:{id:42,type:'private'}}}),false);
});
test('chat link is sent once without requiring an app account',async()=>{
 const path=require.resolve('../lib/telegram-player-chat'),local=createRequire(path),module={exports:{}},store=new Map(),sent=[];
 const pipeline=async cmds=>cmds.map(([op,key,...args])=>{
  if(op==='GET')return {result:store.get(key)||null};
  if(op==='SET'){if(args.includes('NX')&&store.has(key))return {result:null};store.set(key,args[0]);return {result:'OK'};}
  if(op==='EVAL'){store.delete(args[1]);return {result:1};}throw Error('Unexpected lookup '+op);
 });
 vm.runInNewContext(fs.readFileSync(path,'utf8'),{module,require:id=>id==='./redis'?{pipeline}:id==='./telegram-group-policy'?{guardedFetch:async(url,options)=>{sent.push(JSON.parse(options.body));return {ok:true,json:async()=>({ok:true})};}}:local(id),Number,AbortSignal});
 const update={message:{text:'/чат',message_id:7,from:{id:42},chat:{id:42,type:'private'}}};await module.exports.handle(update,'token');await module.exports.handle(update,'token');
 assert.equal(sent.length,1);assert.equal(sent[0].chat_id,42);assert.equal(sent[0].reply_markup.inline_keyboard[0][0].url,'https://t.me/dva_tu1');
});
