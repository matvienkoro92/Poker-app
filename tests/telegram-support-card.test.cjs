'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
function fixture({linked=true,broken=false}={}){
 const cache=new Map(),calls=[];
 const redis={pipeline:async commands=>commands.map(([op,key,...args])=>{
  calls.push([op,key,...args]);
  if(op==='GET')return {result:cache.get(key)||null};
  if(op==='SET'){cache.set(key,args[0]);return {result:'OK'};}
  if(op==='HGET'){
   if(key==='poker_app:visitor_dt_ids')return {result:linked?'ID123456':null};
   if(broken)throw Error('unavailable');
   if(key==='poker_app:pokerplus_profiles')return {result:JSON.stringify({pokerPlusUserId:'123',totalCounter:{fee:550}})};
   return {result:key.includes(':short:free:')?JSON.stringify({wins:3,losses:2,draws:1}):null};
  }
  if(op==='SMEMBERS')return {result:['raffle1']};
  if(op==='MGET')return {result:[JSON.stringify({groups:[{prize:'1 000 ₽'}],winners:[{accountId:'ID123456',userId:'tg_777',groupIndex:0},{accountId:'ID999999',groupIndex:0}]})]};
  throw Error(op);
 })};
 const ctx={module:{exports:{}},require:id=>id==='./redis'?redis:id==='./account-canonical'?{canonicalAccountId:async id=>id}:id==='./tracking-deposits'?{readDeposits:async()=>({available:true,deposits:[{amount:1000},{amount:2000}]})}:id==='./daily-poker-lifetime'?{lifetimePrizes:async()=>({ticketAmount:100,bonusAmount:200})}:id==='./telegram-support-player'?{readPlayerIdentity:async()=>({name:'Денис',poker21Id:'123'})}:require('../lib/'+id.slice(2)),Intl,Date};
 vm.runInNewContext(fs.readFileSync('lib/telegram-support-card.js','utf8'),ctx);return {api:ctx.module.exports,calls};
}
test('card uses application data, counts a raffle slot once and caches player totals',async()=>{
 const f=fixture(),user={id:777,first_name:'Денис'};
 const s=await f.api.stats(user,{poker21Id:'123'});
 assert.equal(s.rake,550);assert.equal(s.deposits,3000);assert.equal(s.raffles,1000);assert.equal(s.spins,300);assert.equal(s.backgammon,6);
 const before=f.calls.filter(c=>c[0]==='SMEMBERS'||c[0]==='HGET'&&c[1].includes('profiles')).length;
 await f.api.stats(user,{poker21Id:'123'});assert.equal(f.calls.filter(c=>c[0]==='SMEMBERS'||c[0]==='HGET'&&c[1].includes('profiles')).length,before);
});
test('unlinked and unavailable data are not displayed as zero',async()=>{
 const unlinked=fixture({linked:false});assert.match(await unlinked.api.text({id:777}),/Рейк: нет привязки/);
 const broken=fixture({broken:true});assert.match(await broken.api.text({id:777}),/Рейк: нет данных/);
});
test('raffle totals exclude failed winners, cancelled raffles and other players',()=>{
 const f=fixture();assert.equal(f.api.raffleTotal([{status:'cancelled',winners:[{userId:'tg_777',prize:'999 ₽'}]},{winners:[{userId:'tg_777',prize:'100 ₽',winnerStatus:'fail'},{userId:'tg_888',prize:'500 ₽'},{userId:'tg_777',prize:'200 ₽'}]}],['tg_777']),200);
});

test('card bolds identity and rake with UTF-16 offsets while leaving period amounts plain',async()=>{
 const f=fixture(),text=await f.api.text({id:777,first_name:'Денис'}),entities=f.api.entities(text);
 assert.equal(entities.length,3);assert.equal(text.slice(entities[0].offset,entities[0].offset+entities[0].length),'👤 Диалог с Денис\n🎮 Poker21: 123');
 assert.equal(text.slice(entities[1].offset,entities[1].offset+entities[1].length),'💰 Рейк: 550 ₽');
 for(const line of text.split('\n').filter(Boolean))assert.match(line,/^(👤|🎮|💰|📅|🗓|📆|💳|🏆|🎰|🎲|📝|📈|🔢|💵|📊|👥|🤝|📍|🃏)/u);
});
test('extended card shows deposit details, acquisition, game results, trends and both month rows',async()=>{
 const f=fixture(),text=(await f.api.text({id:777})).replace(/[\u00a0\u202f]/g,' ');
 for(const label of ['В этом месяце:','В прошлом месяце:','Динамика рейка:','Депозиты: 3 000 ₽','Количество: 2','Средний депозит: 1 500 ₽','Последний депозит:','Игры','Общий результат игры:',])assert.ok(text.includes(label),label);
 assert.ok(text.length<4096);
});

test('internal note instruction is bold without capturing manager notes below it',()=>{
 const f=fixture(),footer='📝 Для внутренних заметок начинайте сообщение с //';
 const text='👤 Игрок\n🎮 Poker21: 123\n\n💰 Рейк: 0 ₽\n\n'+footer+'\n\n👤 Аня:\nЗаметка';
 const entity=f.api.entities(text).at(-1);assert.equal(entity.type,'bold');assert.equal(text.slice(entity.offset,entity.offset+entity.length),footer);
});

test('invitation rows and missing source are hidden',async()=>{
 const f=fixture(),text=await f.api.text({id:777});
 assert.ok(!text.includes('Пригласил:'));assert.ok(!text.includes('Кто пригласил:'));assert.ok(!text.includes('Источник:'));
});
