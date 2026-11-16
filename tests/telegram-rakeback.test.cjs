'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const rakeback=require('../lib/telegram-rakeback'),commands=require('../lib/telegram-club-commands');
const message=text=>({message:{text,message_id:1,from:{id:777},chat:{id:777,type:'private'}}});
test('rakeback aliases match only an explicit private request',()=>{
 for(const text of ['/рейкбек','рейкбек','Рейкбек','РЕЙКБЕК','/rakeback@Poker_dvatuza_bot']){assert.equal(rakeback.isCommand(message(text)),true);assert.equal(commands.command(message(text)),'rakeback');}
 for(const text of ['когда рейкбек','/рейкбек@other_bot','рейкбек сейчас'])assert.equal(rakeback.isCommand(message(text)),false);
 const group=message('/рейкбек');group.message.chat.type='supergroup';assert.equal(rakeback.isCommand(group),false);
});
test('rakeback answers once with the supplied text, with no extra messages or group replies',async()=>{
 const store=new Map(),sent=[],module={exports:{}};
 const pipeline=async cmds=>cmds.map(([op,...a])=>{
  if(op==='GET')return {result:store.get(a[0])||null};
  if(op==='SET'){if(a.includes('NX')&&store.has(a[0]))return {result:null};store.set(a[0],a[1]);return {result:'OK'};}
  if(op==='EVAL'){if(store.get(a[2])===a[3])store.delete(a[2]);return {result:1};}throw Error(op);
 });
 vm.runInNewContext(fs.readFileSync(require.resolve('../lib/telegram-rakeback'),'utf8'),{module,require:id=>id==='./redis'?{pipeline}:id==='./telegram-group-policy'?{guardedFetch:async(url,options)=>{sent.push(JSON.parse(options.body));return {ok:true,json:async()=>({ok:true})};}}:require(id),AbortSignal});
 const update=message('рейкбек');await module.exports.handle(update,'fixture');await module.exports.handle(update,'fixture');
 assert.equal(sent.length,1);assert.equal(sent[0].text,'Рейкбек начисляется в понедельник утром');assert.equal(sent[0].chat_id,777);
 update.message.chat={id:-100,type:'supergroup'};assert.equal(await module.exports.handle(update,'fixture'),false);assert.equal(sent.length,1);
});
