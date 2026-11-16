'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const download=require('../lib/telegram-download'),commands=require('../lib/telegram-club-commands');
function fixture(){
 const store=new Map(),calls=[],module={exports:{}};
 const pipeline=async cmds=>cmds.map(([op,...a])=>{
  if(op==='GET')return {result:store.get(a[0])||null};
  if(op==='SET'){if(a.includes('NX')&&store.has(a[0]))return {result:null};store.set(a[0],a[1]);return {result:'OK'};}
  if(op==='EVAL'){if(store.get(a[2])===a[3])store.delete(a[2]);return {result:1};}throw Error(op);
 });
 vm.runInNewContext(fs.readFileSync(require.resolve('../lib/telegram-download'),'utf8'),{module,require:id=>id==='./redis'?{pipeline}:id==='./telegram-group-policy'?{guardedFetch:async(url,options)=>{calls.push({method:url.split('/').at(-1),body:JSON.parse(options.body)});return {ok:true,json:async()=>({ok:true,result:{message_id:100}})};}}:require(id),AbortSignal});
 const message={message:{text:'/скачать',message_id:1,from:{id:777},chat:{id:777,type:'private'}}};
 const callback=key=>({callback_query:{id:'cb',data:'club:download:'+key,from:{id:777},message:{message_id:100,from:{is_bot:true},chat:{id:777,type:'private'}}}});
 return {calls,message,callback,handle:update=>module.exports.handle(update,'fixture')};
}
test('download command works only in private chat and keeps the four compact room instructions',()=>{
 for(const text of ['Скачать','скачать','СКАЧАТЬ','/скачать','/download','/download@Poker_dvatuza_bot'])assert.equal(commands.command({message:{text,chat:{type:'private'}}}),'download');
 assert.equal(download.isCommand({message:{text:'/скачать@other_bot',chat:{type:'private'}}}),false);
 assert.equal(download.isCommand({message:{text:'/скачать',chat:{type:'supergroup'}}}),false);
 const ids=['1786376','19645','1004444','758417'];Object.values(download.ROOMS).forEach((room,i)=>{assert.ok(room.text.includes(ids[i]));assert.ok(!room.text.includes('\n\n'));assert.ok(room.text.includes(i===3?'рублях 1 к 1':i===0?'1 фишка = 100р':'1 фишка = 115р'));});
});
test('command sends one four-button menu, and choices edit the same message without new messages',async()=>{
 const f=fixture();await f.handle(f.message);await f.handle(f.message);
 assert.equal(f.calls.filter(c=>c.method==='sendMessage').length,1);
 const buttons=Array.from(f.calls[0].body.reply_markup.inline_keyboard.flat());assert.deepEqual(buttons.map(b=>b.text),['X-Poker','Suprema Poker','PPPoker','Покер21про']);
 for(const key of Object.keys(download.ROOMS)){
  assert.equal(await f.handle(f.callback(key)),true);const sent=f.calls.at(-1);
  assert.equal(sent.method,'editMessageText');assert.equal(sent.body.message_id,100);assert.equal(sent.body.text,download.ROOMS[key].text);assert.equal(sent.body.parse_mode,'HTML');assert.equal(sent.body.link_preview_options.is_disabled,true);
 }
 assert.equal(f.calls.filter(c=>c.method==='sendMessage').length,1);
});
test('groups, forged private recipients, bots and unsupported callbacks cannot send',async()=>{
 const f=fixture();
 for(const change of ['group','recipient','bot','unknown']){
  const update=f.callback(change==='unknown'?'unknown':'x');
  if(change==='group')update.callback_query.message.chat={id:-100,type:'supergroup'};
  if(change==='recipient')update.callback_query.message.chat.id=999;
  if(change==='bot')update.callback_query.from.is_bot=true;
  assert.equal(await f.handle(update),false);
 }
 assert.equal(f.calls.length,0);
});
