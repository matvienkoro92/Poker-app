'use strict';
const {redis,memberProfile}=require('./club-social');
const {nickKey,earned}=require('./profile-appearance');
const {memories}=require('./hero-memories');
const {PROFILE_HASH_KEY,BIND_HASH_KEY}=require('./pokerplus');
const themes=[{id:'walnut',title:'Тёплый свет',min:0},{id:'emerald',title:'Зелёная подсветка',min:1},{id:'midnight',title:'Вечерний свет',min:5}];
function fail(message,status=400){throw Object.assign(new Error(message),{status});}
function catalog(profile,friends,rows,stats,seasons){
 if(!profile.bound||!profile.nick)return [];
 const key=nickKey(profile.nick),normalizedRows=rows.map(r=>({...r,nick:nickKey(r.nick)}));
 const events=memories({userId:profile.accountId,nick:key},friends.map(f=>({...f,nick:nickKey(f.nick)})),normalizedRows);
 const names=new Map([[profile.accountId,profile.nick],...friends.map(f=>[f.userId,f.nick])]);
 for(const event of events){for(const result of event.history.results)result.nick=names.get(result.accountId)||result.nick;if(event.history.kind==='shared-tournament'){const friend=event.history.results[1];event.title='В призах вместе с '+friend.nick;event.origin=event.origin.replace(/ · [^·]+: (\d+)-е место$/, ' · '+friend.nick+': '+friend.place+'-е место');}}
 const badges=earned(profile.nick,{[key]:stats}).map(a=>({...a,kind:'achievements',art:a.id==='day-hero'?5:a.id==='win-100'?6:7,origin:({ 'tournament-king':stats.first+' первых мест','day-hero':stats.heroes+' раз герой дня','millionaire':'Опубликованные призовые: '+Math.round(stats.total)+' ₽. Это не чистая прибыль.','win-50':stats.big50+' результатов от 50 до 100 тысяч ₽','win-100':stats.big100+' результатов от 100 тысяч ₽'})[a.id]}));
 return [...events.map(a=>({...a,kind:a.history.kind==='shared-tournament'?'memories':'cups'})),...badges,...seasons];
}
function goalOptions(stats){const wins=Number(stats.first)||0,heroes=Number(stats.heroes)||0;return [{id:'wins',title:'Следующая ступень побед',value:wins,target:[1,5,10,25,50,100].find(n=>n>wins)||Math.ceil((wins+1)/50)*50},{id:'heroes',title:'Герой дня',value:heroes,target:[1,5,10,25,50].find(n=>n>heroes)||Math.ceil((heroes+1)/25)*25}];}
function parse(raw){try{return JSON.parse(raw||'{}')||{};}catch(_){return {};}}
function selection(body,items,stats){
 if(!Array.isArray(body.featured)||body.featured.length>5||new Set(body.featured).size!==body.featured.length)fail('Выберите до пяти разных наград');
 if(body.featured.some(id=>typeof id!=='string'||!items.some(i=>i.id===id)))fail('Награда ещё не получена');
 const theme=themes.find(t=>t.id===body.theme);if(!theme||Number(stats.first||0)<theme.min)fail('Оформление ещё не открыто');
 if(!goalOptions(stats).some(g=>g.id===body.goal))fail('Неизвестная цель');
 return {featured:body.featured,theme:theme.id,goal:body.goal};
}
async function load(accountId){
 const [profile,values]=await Promise.all([memberProfile(accountId),redis([['GET','poker_app:player_hall:'+accountId],['SMEMBERS','poker_app:friendships:'+accountId]])]);
 const [raw,ids]=values,saved=parse(raw),friendIds=(Array.isArray(ids)?ids:[]).filter(id=>/^ID\d+$/.test(id)&&id!==accountId).slice(0,100);
 const friendValues=profile.bound&&friendIds.length?await redis(friendIds.flatMap(id=>[['HGET',PROFILE_HASH_KEY,id],['HGET',BIND_HASH_KEY,id]])):[];
 const friends=friendIds.flatMap((id,n)=>{if(!friendValues[n*2+1])return [];const p=parse(friendValues[n*2]);return [{accountId:id,bound:true,nick:String(p.nickname||p.Nike||p.nick||'').trim()}];});
 const stats=profile.bound?(require('./profile-achievement-catalog.json')[nickKey(profile.nick)]||{}):{};
 const fresh=catalog(profile,friends.filter(p=>p.bound).map(p=>({userId:p.accountId,nick:p.nick})),require('./friend-tournament-results.json'),stats,require('./player-hall-seasons.json')[nickKey(profile.nick)]||[]);
 // Retain server-issued memories when the rolling published result feed changes.
 const byId=new Map((profile.bound&&saved.nick===nickKey(profile.nick)?saved.items||[]:[]).map(i=>[i.id,i]));fresh.forEach(i=>byId.set(i.id,i));
 return {raw,profile,saved,stats,items:[...byId.values()]};
}
function view(d,self){const {profile,saved,stats,items}=d;const earnedIds=new Set(items.map(i=>i.id));return {accountId:profile.accountId,name:profile.name,nick:profile.nick,self,linked:profile.bound,version:Number(saved.version)||0,items,featured:Array.isArray(saved.featured)?saved.featured.filter(id=>earnedIds.has(id)):items.slice(0,3).map(i=>i.id),theme:themes.some(t=>t.id===saved.theme&&Number(stats.first||0)>=t.min)?saved.theme:'walnut',goal:saved.goal||'wins',goals:goalOptions(stats),themes:themes.map(t=>({...t,unlocked:Number(stats.first||0)>=t.min})),wins:Number(stats.first)||0};}
async function read(accountId,self){return view(await load(accountId),self);}
async function save(accountId,body){const d=await load(accountId);if(body.version!==(Number(d.saved.version)||0))fail('Зал изменился в другой вкладке. Откройте его заново.',409);const chosen=selection(body,d.items,d.stats);const state={...chosen,nick:nickKey(d.profile.nick),items:d.items,version:(Number(d.saved.version)||0)+1};
 const script="local old=redis.call('GET',KEYS[1]); if (old or '') ~= ARGV[1] then return 0 end; redis.call('SET',KEYS[1],ARGV[2]); return 1";
 const [ok]=await redis([['EVAL',script,1,'poker_app:player_hall:'+accountId,d.raw||'',JSON.stringify(state)]]);if(Number(ok)!==1)fail('Зал изменился. Откройте его заново.',409);return view({...d,saved:state},true);}
module.exports={catalog,selection,goalOptions,read,save,view};
