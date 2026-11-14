'use strict';
const redis=require('./redis');
const {canonicalAccountId}=require('./account-canonical');
const TTL=12*60*60;
const RAFFLE_CACHE_TTL=300;
async function run(commands){
 const rows=await redis.pipeline(commands,{throwOnError:true,context:'support.card'});
 if(!rows||rows.length!==commands.length||rows.some(r=>r.error))throw Error('Card data unavailable');
 return rows.map(r=>r.result);
}
const parse=raw=>raw?JSON.parse(raw):null;
const money=n=>n===null||n===undefined?'нет данных':new Intl.NumberFormat('ru-RU',{maximumFractionDigits:2}).format(n)+' ₽';
function raffleTotal(raffles,identities){
 const ids=new Set(identities),{prizeAmount}=require('./raffle-calculation-summary');let total=0;
 for(const raffle of raffles){
  if(!raffle||raffle.status==='cancelled')continue;
  for(const w of raffle.winners||[]){
   // Match only stored account/Telegram identifiers, never nicknames or usernames.
   if(![w.accountId,w.userId,w.telegramId,w.telegramUserId].some(id=>ids.has(String(id||''))))continue;
   if(['fail','missed','rerolled','cancelled','no_show'].includes(String(w.winnerStatus||'').toLowerCase()))continue;
   total+=prizeAmount(raffle,w);
  }
 }
 return total;
}
let raffleSnapshot;
async function raffles(){
 if(raffleSnapshot&&raffleSnapshot.until>Date.now())return raffleSnapshot.promise;
 const promise=(async()=>{
  const key='poker_app:telegram:support:card:raffles:v1';const [cached]=await run([['GET',key]]);
  if(cached)return JSON.parse(cached);
  const [ids]=await run([['SMEMBERS','poker_app:raffle_ids']]);if(!Array.isArray(ids))throw Error('Raffles unavailable');
  const all=[];
  for(let i=0;i<ids.length;i+=100){const [rows]=await run([['MGET',...ids.slice(i,i+100).map(id=>'poker_app:raffle:'+id)]]);if(!Array.isArray(rows)||rows.some(r=>!r))throw Error('Incomplete raffle archive');all.push(...rows.map(parse));}
  // Cache only winners and prize definitions, not participant lists.
  const compact=all.map(r=>({status:r.status,prizeKind:r.prizeKind,title:r.title,groups:r.groups,winners:r.winners}));
  await run([['SET',key,JSON.stringify(compact),'EX',RAFFLE_CACHE_TTL]]);return compact;
 })();
 raffleSnapshot={until:Date.now()+RAFFLE_CACHE_TTL*1000,promise};promise.catch(()=>{if(raffleSnapshot?.promise===promise)raffleSnapshot=null;});return promise;
}
async function stats(user,player){
 const [binding]=await run([['HGET','poker_app:visitor_dt_ids','tg_'+user.id]]);
 const account=await canonicalAccountId(binding||'');
 if(!/^ID\d{6}$/.test(account))return {linked:false};
 const key='poker_app:telegram:support:card:v6:'+account+':'+user.id+':'+(player.poker21Id||'unlinked');
 const [cached]=await run([['GET',key]]);if(cached)return parse(cached);
 const result={linked:true,rake:null,rakeWeek:null,rakeMonth:null,rakePreviousMonth:null,deposits:null,depositCount:null,depositAverage:null,lastDepositAt:null,invitedCount:null,invitedBy:null,source:null,favoriteGame:null,rakeTrend:null,raffles:null,spins:null,backgammon:null};
 const tasks=[
  async()=>{Object.assign(result,require('./telegram-support-card-extras').reports(String(player.poker21Id||''),require('./support-rake-reports.json').periods));},
  async()=>{Object.assign(result,await require('./telegram-support-card-extras').acquisition(account,user.id,run,{invitations:false}));},
  async()=>{const [raw]=await run([['HGET','poker_app:pokerplus_profiles',account]]);const p=parse(raw);if(!p||String(p.pokerPlusUserId||'')!==String(player.poker21Id||''))return;const total=p.totalCounter||p.total_counter;const fee=total?.fee;if(fee!==null&&fee!==undefined&&Number.isFinite(Number(fee)))result.rake=Number(fee);Object.assign(result,await require('./telegram-support-rake').read(account,p,run));},
  async()=>{const d=await require('./tracking-deposits').readDeposits(player.poker21Id,0,{compact:true});if(d.available)Object.assign(result,require('./telegram-support-card-extras').deposits(d.deposits));},
  async()=>{result.raffles=raffleTotal(await raffles(),[account,'tg_'+user.id,String(user.id)]);},
  async()=>{const {lifetimePrizes}=require('./daily-poker-lifetime');const p=await lifetimePrizes([account],{pipeline:redis.pipeline,readGames:async ids=>{
   const out=[];for(let i=0;i<ids.length;i+=100){const [rows]=await run([['MGET',...ids.slice(i,i+100).map(id=>'poker_app:daily_poker_game:'+id)]]);out.push(...rows.map(result=>({result})));}return out;
  },prizeTotals:g=>({ticketAmount:Number(g.ticket_balance_credited||0)+Number(g.ticketless_streak_ticket_balance_credited||0),bonusAmount:Number(g.bonus_credited||0)})});result.spins=p.ticketAmount+p.bonusAmount;},
  async()=>{const commands=[];for(const discipline of ['short','long','long-crazy','long-six-one'])for(const mode of ['free','paid'])commands.push(['HGET','poker_app:board-games:stats:v2:'+discipline+':'+mode+':players',account]);const rows=await run(commands);result.backgammon=rows.reduce((s,raw)=>{const p=parse(raw)||{};return s+Number(p.wins||0)+Number(p.losses||0)+Number(p.draws||0);},0);}
 ];
 await Promise.allSettled(tasks.map(fn=>fn()));
 await run([['SET',key,JSON.stringify(result),'EX',TTL]]);return result;
}
async function text(user){
 const player=await require('./telegram-support-player').readPlayerIdentity(user);
 let data;try{data=await stats(user,player);}catch{data={};}
 const unknown=data.linked===false?'нет привязки':'нет данных';
 const value=k=>data[k]===null||data[k]===undefined?unknown:(data[k+'Approximate']?'≈ ':'')+money(data[k]);
 const count=key=>data[key]===null||data[key]===undefined?unknown:String(data[key]);
 const date=value=>value?new Intl.DateTimeFormat('ru-RU',{timeZone:'Europe/Moscow',day:'2-digit',month:'2-digit',year:'numeric'}).format(new Date(value)):data.depositCount===0?'не было':unknown;
 const shortDate=value=>value?value.slice(8,10)+'.'+value.slice(5,7):'';
 const trend=data.rakeTrend;
 const trendText=trend?(trend.percent===null?'с '+money(trend.previous)+' до '+money(trend.current):(trend.percent>0?'+':'')+String(trend.percent).replace('.',',')+'%')+' ('+shortDate(trend.currentStart)+'–'+shortDate(trend.to)+' к '+shortDate(trend.from)+'–'+shortDate(trend.previousEnd)+')':unknown;
 const games=data.gameBreakdown;
 const gamesText=games?'🎮 Игры за '+shortDate(games.from)+'–'+shortDate(games.to)+':'+(games.rows.length?'\n'+games.rows.map(r=>'🃏 '+r.name+': рейк '+money(r.rake)+', раздач '+new Intl.NumberFormat('ru-RU').format(r.hands)).join('\n'):' нет активности'):'🎮 Игры: '+unknown;
 const name=String(player.name||user.first_name||'Игрок').replace(/[\r\n]/g,' ');
 return '👤 Диалог с '+name+(user.username?'\n✉️ @'+user.username:'')+
  '\n🎮 Poker21: '+(player.poker21Id||'не привязан')+(player.xpokerIds?.length?' · XPoker: '+player.xpokerIds.join(', '):'')+
  '\n\n💰 Рейк: '+value('rake')+'\n📅 На этой неделе: '+value('rakeWeek')+'\n🗓 В этом месяце: '+value('rakeMonth')+'\n📆 В прошлом месяце: '+value('rakePreviousMonth')+'\n📈 Динамика рейка: '+trendText+'\n\n💳 Депозиты: '+value('deposits')+'\n🔢 Количество: '+count('depositCount')+'\n💵 Средний депозит: '+value('depositAverage')+'\n📅 Последний депозит: '+date(data.lastDepositAt)+'\n🏆 В розыгрышах: '+value('raffles')+'\n🎰 В крутках: '+value('spins')+
  '\n\n'+gamesText+(data.source&&data.source!=='не зафиксирован'?'\n📍 Источник: '+data.source:'')+
  '\n🎲 Сыграно в нарды: '+(data.backgammon===null||data.backgammon===undefined?unknown:data.backgammon+' партий')+
  '\n\n📝 Для внутренних заметок начинайте сообщение с //';
}
function entities(text){
 const result=[],headerEnd=text.indexOf('\n\n');
 if(headerEnd>0)result.push({type:'bold',offset:0,length:headerEnd});
 const start=text.indexOf('💰 Рейк:');
 if(start>=0){const end=text.indexOf('\n',start);result.push({type:'bold',offset:start,length:(end<0?text.length:end)-start});}
 const footer='📝 Для внутренних заметок начинайте сообщение с //';
 const footerStart=text.indexOf(footer);
 if(footerStart>=0)result.push({type:'bold',offset:footerStart,length:footer.length});
 return result;
}
module.exports={text,entities,stats,raffleTotal,TTL};
