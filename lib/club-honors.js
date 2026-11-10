'use strict';
const ranking=require('./club-honors-ranking');
const source=require('./club-honors-poker.json');
const PREFIX='poker_app:club_honors:v1:';
const parse=x=>{try{return JSON.parse(x||'null');}catch{return null;}};
function period(now=new Date()){const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Moscow',year:'numeric',month:'2-digit'}).formatToParts(now),get=k=>parts.find(p=>p.type===k).value;return {year:Number(get('year')),month:Number(get('month'))};}
function annual(issues,year,now=new Date()){
 const map=new Map();for(const issue of issues.filter(i=>i.final&&i.month.endsWith('.'+year)))for(const winner of issue.winners){const key=winner.accountId||ranking.key(winner.nick);let row=map.get(key);if(!row){row={...winner,titles:0,months:[]};map.set(key,row);}row.titles++;row.months.push(issue.month);}
 const rows=[...map.values()].sort((a,b)=>b.titles-a.titles||a.nick.localeCompare(b.nick,'ru'));
 const final=year<period(now).year&&issues.filter(i=>i.final&&i.month.endsWith('.'+year)).length===12;
 return {year,final,rows,winners:rows.filter(r=>r.titles===rows[0]?.titles)};
}
async function entitlements(accountId,redis){const [ids]=await redis([['SMEMBERS',PREFIX+'earned:'+accountId]]);return Array.isArray(ids)?ids:[];}
async function read({redis,commands,now=new Date(),poker=source,readGames,memberProfile=require('./club-social').memberProfile}={}){
 const current=period(now),years=Array.from({length:Math.max(1,current.year-2025)},(_,i)=>2026+i),months=[];
 for(const year of years)for(let m=1;m<=12&&(year<current.year||m<=current.month);m++)months.push(String(m).padStart(2,'0')+'.'+year);
 const cached=await redis(months.map(m=>['GET',PREFIX+'issue:'+m]));
 const games=readGames?await readGames():await Promise.all([require('./billiards-achievements').read(commands),require('./nards-achievements').read(commands,{migration:false})]);
 if(!Array.isArray(games?.[0]?.goldenBall)||!Array.isArray(games?.[1]?.nardsKing))throw Error('Неполные игровые результаты');
 // Fail the whole read if a source fails: partial results must never issue prizes.
 const data={...poker.data,...games[0],...games[1]},issues=[];
 for(let i=0;i<months.length;i++){
  const month=months[i],m=Number(month.slice(0,2)),year=Number(month.slice(3));let issue=parse(cached[i]);
  if(!issue){
   const rows=ranking.month(data,month).rows,top=rows[0];
   const next=new Date(Date.UTC(year,m,1)).toISOString().slice(0,10);
   const final=(year<current.year||m<current.month)&&poker.through>=next;
   const winners=top?rows.filter(r=>r.rank===1).map(r=>({nick:r.nick,accountId:r.accountId||'',awards:r.value,prizes:r.tie,categories:r.awardTitles})):[];
   issue={month,final,winners,publishedAt:final?now.toISOString():null};
   if(final){await redis([['SET',PREFIX+'issue:'+month,JSON.stringify(issue),'NX']]);const [saved]=await redis([['GET',PREFIX+'issue:'+month]]);issue=parse(saved)||issue;}
  }
  for(const w of issue.winners){
   if(!w.accountId){
    const ownerKey=PREFIX+'owner:'+month+':'+encodeURIComponent(ranking.key(w.nick));
    const [owner,id]=await redis([['GET',ownerKey],['HGET',require('./pokerplus').NICKNAME_REVERSE_HASH_KEY,require('./pokerplus').normalizePokerPlusNicknameKey(w.nick)]]);
    if(owner)w.accountId=owner;
    else if(id&&/^ID\d{6}$/.test(id)){const p=await memberProfile(id);if(p.bound&&require('./pokerplus').normalizePokerPlusNicknameKey(ranking.key(p.nick))===require('./pokerplus').normalizePokerPlusNicknameKey(ranking.key(w.nick))){await redis([['SET',ownerKey,id,'NX']]);const [savedOwner]=await redis([['GET',ownerKey]]);w.accountId=savedOwner;}}
   }
   if(!/^ID\d{6}$/.test(w.accountId||''))continue;
   if(issue.final)await redis([['SADD',PREFIX+'earned:'+w.accountId,'month:'+month]]);
   const key=PREFIX+'figure:'+month+':'+w.accountId;let [raw]=await redis([['GET',key]]);let figure=parse(raw);
   if(!figure){const [saved]=await redis([['GET','poker_app:player_hall:'+w.accountId]]);const state=parse(saved);if(state?.garage){const p=await memberProfile(w.accountId);figure={loadout:state.garage,stats:{level:p.level,earnedHonors:await entitlements(w.accountId,redis)},capturedAt:now.toISOString()};if(issue.final){await redis([['SET',key,JSON.stringify(figure),'NX']]);[raw]=await redis([['GET',key]]);figure=parse(raw)||figure;}}}
   w.figure=figure;
  }
  issues.push(issue);
 }
 const seasons=years.map(y=>annual(issues,y,now));
 for(const season of seasons)if(season.final)for(const w of season.winners)if(w.accountId)await redis([['SADD',PREFIX+'earned:'+w.accountId,'year:'+season.year]]);
 return {ok:true,through:poker.through,issues,seasons,current: String(current.month).padStart(2,'0')+'.'+current.year};
}
let inflight,cache,expires=0;
async function cachedRead(options){if(cache&&Date.now()<expires)return cache;if(inflight)return inflight;inflight=read(options).then(data=>{cache=data;expires=Date.now()+60000;return data;}).finally(()=>{inflight=null;});return inflight;}
module.exports={read:cachedRead,uncachedRead:read,annual,period,entitlements,PREFIX};
