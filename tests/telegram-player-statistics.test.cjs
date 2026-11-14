'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function fixture(){
 const store=new Map(),sent=[],identities=[];let offline=false;
 const redis={pipeline:async commands=>commands.map(([op,key,...args])=>{
  if(op==='GET')return {result:store.get(key)||null};
  if(op==='SET'){if(args.includes('NX')&&store.has(key))return {result:null};store.set(key,args[0]);return {result:'OK'};}
  if(op==='EVAL'){if(store.get(args[1])===args[2])store.delete(args[1]);return {result:1};}
  throw Error(op);
 })};
 const ctx={module:{exports:{}},require:id=>id==='./redis'?redis:id==='./telegram-support-card'?{text:async user=>{identities.push(user.id);return '👤 Диалог с Игроком\n🎮 Poker21: 123\n\n💰 Рейк: 100 ₽\n\n📝 Для внутренних заметок начинайте сообщение с //';},entities:()=>[{type:'bold',offset:0,length:10}]}:id==='./telegram-group-policy'?{guardedFetch:async(_url,options)=>{if(offline)throw Error('offline');sent.push(JSON.parse(options.body));return {ok:true,json:async()=>({ok:true})};}}:require(id),AbortSignal};
 vm.runInNewContext(fs.readFileSync('lib/telegram-player-statistics.js','utf8'),ctx);return {api:ctx.module.exports,sent,identities,offline:v=>{offline=v;}};
}
const update=(text='/статистика')=>({message:{text,message_id:20,chat:{id:777,type:'private'},from:{id:777,first_name:'Игрок'}}});
test('only exact personal statistics commands are accepted',()=>{
 const f=fixture();for(const text of ['/статистика','/СТАТИСТИКА','/stats','/stat','статистика','Статистика','СТАТИСТИКА','stats','stat','STAT','/stat@Poker_dvatuza_bot','/статистика@Poker_dvatuza_bot'])assert.equal(f.api.isCommand(update(text)),true);
 for(const text of ['/статистика 888','/stats@Other_bot','моя статистика'])assert.equal(f.api.isCommand(update(text)),false);
 const group=update();group.message.chat.type='supergroup';assert.equal(f.api.isCommand(group),false);
 const other=update();other.message.from.id=999;assert.equal(f.api.isCommand(other),false);
 const bot=update();bot.message.from.is_bot=true;assert.equal(f.api.isCommand(bot),false);
});
test('reply is sent only to sender, excludes internal instructions and is deduplicated',async()=>{
 const f=fixture();await f.api.handle(update(),'token');await f.api.handle(update(),'token');
 assert.equal(f.sent.length,1);assert.equal(f.sent[0].chat_id,777);assert.deepEqual(f.identities,[777]);
 assert.match(f.sent[0].text,/Статистика игрока:/);assert.match(f.sent[0].text,/Рейк: 100 ₽/);assert.doesNotMatch(f.sent[0].text,/внутренних|менеджер|\/\//i);
});
test('failed delivery retries without retaining a lock or successful-send mark',async()=>{
 const f=fixture();f.offline(true);await assert.rejects(f.api.handle(update(),'token'));f.offline(false);await f.api.handle(update(),'token');assert.equal(f.sent.length,1);
});
