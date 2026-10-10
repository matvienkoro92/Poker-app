'use strict';
const {redis,memberProfile}=require('./club-social');
const {nickKey}=require('./profile-appearance');
const {memories}=require('./hero-memories');
const Garage=require('./player-garage');
const Lounge=require('./player-lounge');
const {PROFILE_HASH_KEY,BIND_HASH_KEY}=require('./pokerplus');
const themes=[{id:'walnut',title:'Тёплый свет',min:0},{id:'midnight',title:'Ночной режим',min:0}];
function fail(message,status=400){throw Object.assign(new Error(message),{status});}
function catalog(profile,friends,rows,stats,seasons){
 if(!profile.bound||!profile.nick)return [];
 const key=nickKey(profile.nick),normalizedRows=rows.map(r=>({...r,nick:nickKey(r.nick)}));
 const events=memories({userId:profile.accountId,nick:key},friends.map(f=>({...f,nick:nickKey(f.nick)})),normalizedRows);
 const names=new Map([[profile.accountId,profile.nick],...friends.map(f=>[f.userId,f.nick])]);
 for(const event of events){for(const result of event.history.results)result.nick=names.get(result.accountId)||result.nick;if(event.history.kind==='shared-tournament'){const friend=event.history.results[1];event.title='В призах вместе с '+friend.nick;event.origin=event.origin.replace(/ · [^·]+: (\d+)-е место$/, ' · '+friend.nick+': '+friend.place+'-е место');}}
 const extra=require('./player-hall-extra-achievements').profileAwards(profile,rows,seasons);
 const extraIds=new Set(extra.map(i=>i.id));
 const badges=achievementProgress(stats).filter(a=>a.unlocked&&!extraIds.has(a.id)).map(a=>({...a,art:7,origin:a.condition+' · Получено: '+a.value}));
 return [...events.filter(a=>a.history.kind!=='shared-tournament').map(a=>({...a,kind:'cups'})),...badges,...extra,...seasons];
}
function achievementProgress(stats){return [
 ['tournament-king','Король турниров','first',1,'Занять первое место в турнире'],
 ['day-hero','Герой дня','heroes',1,'Стать героем дня'],
 ['millionaire','Миллионер клуба','total',1000000,'Набрать 1 000 000 ₽ опубликованных призовых'],
 ['win-50','Занос от 50 до 100к','big50',1,'Получить призовые от 50 000 до 100 000 ₽ в одном турнире'],
 ['win-100','Занос от 100к','big100',1,'Получить призовые от 100 000 ₽ в одном турнире'],
 ['month-champion','Чемпион месяца','monthChampion',1,'Занять первое место месяца по сумме призовых'],
 ['vice-champion','Вице-чемпион месяца','viceChampion',1,'Занять второе место месяца по сумме призовых'],
 ['club-choice','Народный герой','clubChoice',1,'Победить в голосовании клуба за достижение месяца'],
 ['top-win-2026','Топ занос клуба 2026','topWin',1,'Попасть в топ-15 крупнейших единичных заносов клуба'],
 ['rating-top10','Топ-10 рейтинга','ratingTop10',1,'Завершить сезон в топ-10 своей лиги'],
 ['offline-win','Победа в оффлайн турнире','offlineWin',1,'Получить подтверждённый оффлайн результат в профиле'],
 ['poker21-leaderboard','МТТ-лидерборд Poker21','poker21Leaderboard',1,'Занять место в итоговом топ-3 лидерборда Poker21'],
 ['sng-champion','Победитель СНГ-баттла','sngChampion',1,'Занять первое место в завершённом СНГ-баттле']
].map(([id,title,key,target,condition])=>({id,title,kind:'achievements',value:Number(stats[key])||0,metric:{value:Number(stats[key])||0,unit:key==='total'?'rub':'count',label:({first:'Побед',heroes:'Герой дня',big50:'Заносов',big100:'Заносов',monthChampion:'Побед',viceChampion:'Вторых мест',clubChoice:'Побед',topWin:'Попаданий',ratingTop10:'Сезонов',offlineWin:'Результатов',poker21Leaderboard:'Наград',sngChampion:'Побед'})[key]||''},target,condition,unlocked:Number(stats[key])>=target}));}
function goalOptions(stats){const wins=Number(stats.first)||0,heroes=Number(stats.heroes)||0;return [{id:'wins',title:'Следующая ступень побед',value:wins,target:[1,5,10,25,50,100].find(n=>n>wins)||Math.ceil((wins+1)/50)*50},{id:'heroes',title:'Герой дня',value:heroes,target:[1,5,10,25,50].find(n=>n>heroes)||Math.ceil((heroes+1)/25)*25}];}
function parse(raw){try{return JSON.parse(raw||'{}')||{};}catch(_){return {};}}
function selection(body,items,stats){
 if(!Array.isArray(body.featured)||body.featured.length>15||new Set(body.featured).size!==body.featured.length)fail('Выберите до пяти разных наград');
 if(['cups','achievements','seasons'].some(kind=>body.featured.filter(id=>items.some(i=>i.id===id&&i.kind===kind)).length>5))fail('На каждой полке не больше пяти наград');
 if(body.featured.some(id=>typeof id!=='string'||!items.some(i=>i.id===id)))fail('Награда ещё не получена');
 const theme=themes.find(t=>t.id===body.theme);if(!theme||Number(stats.first||0)<theme.min)fail('Оформление ещё не открыто');
 if(!goalOptions(stats).some(g=>g.id===body.goal))fail('Неизвестная цель');
 const chosen={featured:body.featured,theme:theme.id,goal:body.goal};
 if(body.shelves){chosen.shelves={};for(const kind of ['cups','achievements']){const slots=body.shelves[kind];if(!Array.isArray(slots)||slots.length!==5)fail('На полке должно быть пять мест');if(slots.some(id=>id!==null&&(!body.featured.includes(id)||!items.some(i=>i.id===id&&i.kind===kind)))||new Set(slots.filter(Boolean)).size!==slots.filter(Boolean).length)fail('Неверные награды на полке');if(body.featured.filter(id=>items.some(i=>i.id===id&&i.kind===kind)).some(id=>!slots.includes(id)))fail('Награда не размещена на полке');chosen.shelves[kind]=slots.slice();}}
 return chosen;
}
async function load(accountId){
 const [profile,values]=await Promise.all([memberProfile(accountId),redis([['GET','poker_app:player_hall:'+accountId],['SMEMBERS','poker_app:friendships:'+accountId],['GET','poker_app:club_choice_vote'],['GET','poker_app:sng_champions']])]);
 const [raw,ids]=values,saved=parse(raw),friendIds=(Array.isArray(ids)?ids:[]).filter(id=>/^ID\d+$/.test(id)&&id!==accountId).slice(0,100);
 const friendValues=profile.bound&&friendIds.length?await redis(friendIds.flatMap(id=>[['HGET',PROFILE_HASH_KEY,id],['HGET',BIND_HASH_KEY,id]])):[];
 const friends=friendIds.flatMap((id,n)=>{if(!friendValues[n*2+1])return [];const p=parse(friendValues[n*2]);return [{accountId:id,bound:true,nick:String(p.nickname||p.Nike||p.nick||'').trim()}];});
 const stats=profile.bound?{...(require('./profile-achievement-catalog.json')[nickKey(profile.nick)]||{})}:{};
 if(profile.bound){Object.assign(stats,require('./player-hall-extra-achievements').liveStats(profile,stats,parse(values[2]),parse(values[3])));}
 const fresh=catalog(profile,friends.filter(p=>p.bound).map(p=>({userId:p.accountId,nick:p.nick})),require('./player-hall-tournament-results.json'),stats,require('./player-hall-seasons.json')[nickKey(profile.nick)]||[]);
 const extraAwards=profile.bound?require('./player-hall-extra-achievements').profileAwards(profile,require('./player-hall-tournament-results.json'),require('./player-hall-seasons.json')[nickKey(profile.nick)]||[]):[];
 for(const [id,key] of [['top-win-2026','topWin'],['rating-top10','ratingTop10'],['offline-win','offlineWin'],['poker21-leaderboard','poker21Leaderboard']])stats[key]=extraAwards.some(a=>a.id===id)?1:0;
 // Retain server-issued memories when the rolling published result feed changes.
 const byId=new Map((profile.bound&&saved.nick===nickKey(profile.nick)?saved.items||[]:[]).map(i=>[i.id,i]));fresh.forEach(i=>byId.set(i.id,i));
 const [garage,lounge]=await Promise.all([Garage.read(accountId,redis,friends),Lounge.read(accountId,friendIds,redis)]);
 garage.stats.level=profile.level;
 return {raw,profile,saved,stats,garage,lounge,items:[...byId.values()].filter(i=>i.kind!=='memories')};
}
function view(d,self){const {profile,saved,stats,items}=d;const earnedIds=new Set(items.map(i=>i.id));return {accountId:profile.accountId,name:profile.name,nick:profile.nick,self,linked:profile.bound,version:Number(saved.version)||0,garage:Garage.view(saved,d.garage),lounge:Lounge.view(saved,d.lounge,self),items,shelves:saved.shelves,featured:Array.isArray(saved.featured)?saved.featured.filter(id=>earnedIds.has(id)):items.slice(0,3).map(i=>i.id),theme:themes.some(t=>t.id===saved.theme&&Number(stats.first||0)>=t.min)?saved.theme:'walnut',goal:saved.goal||'wins',goals:goalOptions(stats),themes:themes.map(t=>({...t,unlocked:Number(stats.first||0)>=t.min})),achievementProgress:achievementProgress(stats),wins:Number(stats.first)||0};}
async function read(accountId,self){return view(await load(accountId),self);}
async function save(accountId,body){const d=await load(accountId);if(body.version!==(Number(d.saved.version)||0))fail('Зал изменился в другой вкладке. Откройте его заново.',409);const chosen=selection(body,d.items,d.stats);if(body.loungeSeats!==undefined&&!d.lounge.available)fail('Друзья пока недоступны. Попробуйте позже.',503);const state={...chosen,loungeSeats:body.loungeSeats!==undefined?Lounge.seats(body.loungeSeats,d.lounge.friends,true):d.saved.loungeSeats,garage:body.garage?Garage.choose(body.garage,d.garage):d.saved.garage,nick:nickKey(d.profile.nick),items:d.items,version:(Number(d.saved.version)||0)+1};
 const script="local old=redis.call('GET',KEYS[1]); if (old or '') ~= ARGV[1] then return 0 end; redis.call('SET',KEYS[1],ARGV[2]); return 1";
 const [ok]=await redis([['EVAL',script,1,'poker_app:player_hall:'+accountId,d.raw||'',JSON.stringify(state)]]);if(Number(ok)!==1)fail('Зал изменился. Откройте его заново.',409);return view({...d,saved:state},true);}
module.exports={catalog,selection,achievementProgress,goalOptions,read,save,view};
