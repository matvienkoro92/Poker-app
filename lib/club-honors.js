'use strict';
const ranking=require('./club-honors-ranking');
const source=require('./club-honors-poker.json');
const PREFIX='poker_app:club_honors:v1:';
const counted=(n,forms)=>n+' '+forms[n%100>=11&&n%100<=14?2:n%10===1?0:n%10>=2&&n%10<=4?1:2];
const parse=x=>{try{return JSON.parse(x||'null');}catch{return null;}};
function period(now=new Date()){const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Moscow',year:'numeric',month:'2-digit'}).formatToParts(now),get=k=>parts.find(p=>p.type===k).value;return {year:Number(get('year')),month:Number(get('month'))};}
function annual(issues,year,now=new Date()){
 const map=new Map();for(const issue of issues.filter(i=>i.final&&i.month.endsWith('.'+year)))for(const winner of issue.winners){const key=winner.accountId||ranking.key(winner.nick);let row=map.get(key);if(!row){row={...winner,titles:0,months:[]};map.set(key,row);}row.titles++;row.months.push(issue.month);}
 const rows=[...map.values()].sort((a,b)=>b.titles-a.titles||a.nick.localeCompare(b.nick,'ru'));
 const final=year<period(now).year&&issues.filter(i=>i.final&&i.month.endsWith('.'+year)).length===12;
 return {year,final,rows,winners:rows.filter(r=>r.titles===rows[0]?.titles)};
}
async function entitlements(accountId,redis){const [ids]=await redis([['SMEMBERS',PREFIX+'earned:'+accountId]]);return Array.isArray(ids)?ids:[];}
async function read({redis,commands,now=new Date(),poker=source,readGames,memberProfile=require('./club-social').memberProfile,canonicalAccountId=require('./account-id').canonicalAccountId}={}){
 const current=period(now),years=Array.from({length:Math.max(1,current.year-2025)},(_,i)=>2026+i),months=[];
 for(const year of years)for(let m=1;m<=12&&(year<current.year||m<=current.month);m++)months.push(String(m).padStart(2,'0')+'.'+year);
 const cached=await redis(months.map(m=>['GET',PREFIX+'issue:'+m]));
 const games=readGames?await readGames():await Promise.all([require('./billiards-achievements').read(commands),require('./nards-achievements').read(commands,{migration:false})]);
 if(!Array.isArray(games?.[0]?.goldenBall)||!Array.isArray(games?.[1]?.nardsKing))throw Error('Неполные игровые результаты');
 // Fail the whole read if a source fails: partial results must never issue prizes.
 const data={...poker.data,...games[0],...games[1]};
 const issues=await Promise.all(months.map(async(month,i)=>{
  const m=Number(month.slice(0,2)),year=Number(month.slice(3));let issue=parse(cached[i]);
  if(!issue){
   const rows=ranking.month(data,month).rows,top=rows[0];
   const next=new Date(Date.UTC(year,m,1)).toISOString().slice(0,10);
   const final=(year<current.year||m<current.month)&&poker.through>=next;
   const winners=top?rows.filter(r=>r.rank===1).map(r=>({nick:r.nick,accountId:r.accountId||'',awards:r.value,prizes:r.tie,categories:r.awardTitles})):[];
   issue={month,final,winners,publishedAt:final?now.toISOString():null};
   if(final){await redis([['SET',PREFIX+'issue:'+month,JSON.stringify(issue),'NX']]);const [saved]=await redis([['GET',PREFIX+'issue:'+month]]);issue=parse(saved)||issue;}
  }
  for(const w of issue.winners){
   w.achievements=ranking.specs(data).filter(spec=>w.categories.includes(spec.sectionTitle||spec.title)).map(spec=>{
    const row=ranking.rows(spec,month).find(r=>ranking.key(r.nick)===ranking.key(w.nick));
    if(!row)return null;
    const details=spec.key==='topWin'?(row.detailRows||[]).slice(0,1):(row.detailRows||[]);
    const valueText=['topWin','monthChampion'].includes(spec.key)?Number(row.value).toLocaleString('ru-RU',{maximumFractionDigits:0})+' ₽':spec.key==='nardsKing'?row.valueText:counted(row.value,spec.key==='king'?['победа','победы','побед']:spec.key==='goldenBall'?['попадание','попадания','попаданий']:spec.key==='dayHero'?['раз','раза','раз']:['выигрыш','выигрыша','выигрышей']);
    return {title:spec.sectionTitle||spec.title,value:row.value,valueText,details:details.map(d=>({title:d.title||d.text||'',meta:d.meta||'',note:d.note||''}))};
   }).filter(Boolean);

   if(!w.accountId){
    const ownerKey=PREFIX+'owner:'+month+':'+encodeURIComponent(ranking.key(w.nick));
    const [owner,legacyId]=await redis([['GET',ownerKey],['HGET',require('./pokerplus').NICKNAME_REVERSE_HASH_KEY,require('./pokerplus').normalizePokerPlusNicknameKey(w.nick)]]);
    const id=legacyId?await canonicalAccountId(legacyId):null;
    if(owner)w.accountId=await canonicalAccountId(owner);
    else if(id&&/^ID\d{6}$/.test(id)){const p=await memberProfile(id);if(p.bound&&require('./pokerplus').normalizePokerPlusNicknameKey(ranking.key(p.nick))===require('./pokerplus').normalizePokerPlusNicknameKey(ranking.key(w.nick))){await redis([['SET',ownerKey,id,'NX']]);const [savedOwner]=await redis([['GET',ownerKey]]);w.accountId=savedOwner;}}
   }
   if(w.accountId)w.accountId=await canonicalAccountId(w.accountId);
   if(!/^ID\d{6}$/.test(w.accountId||''))continue;
   if(issue.final)await redis([['SADD',PREFIX+'earned:'+w.accountId,'month:'+month]]);
   const key=PREFIX+'figure:'+month+':'+w.accountId;let [raw]=await redis([['GET',key]]);let figure=parse(raw);
   if(!figure){const [saved]=await redis([['GET','poker_app:player_hall:'+w.accountId]]);const state=parse(saved);if(state?.garage){const p=await memberProfile(w.accountId);figure={loadout:state.garage,stats:{level:p.level,earnedHonors:await entitlements(w.accountId,redis)},capturedAt:now.toISOString()};if(issue.final){await redis([['SET',key,JSON.stringify(figure),'NX']]);[raw]=await redis([['GET',key]]);figure=parse(raw)||figure;}}}
   w.figure=figure;
  }
  return issue;
 }));
 const seasons=years.map(y=>annual(issues,y,now));
 for(const season of seasons)if(season.final)for(const w of season.winners)if(w.accountId)await redis([['SADD',PREFIX+'earned:'+w.accountId,'year:'+season.year]]);
 return {ok:true,through:poker.through,issues,seasons,current: String(current.month).padStart(2,'0')+'.'+current.year};
}
// Shared across serverless instances; source/date keys prevent stale season boundaries.
const pending=new Map(),local=new Map();
async function cachedRead(options){
 const p=period(options.now),key=PREFIX+'response:v2:'+p.year+':'+p.month+':'+(options.poker||source).through;
 const hit=local.get(key);if(hit&&Date.now()<hit.expires)return hit.data;
 if(pending.has(key))return pending.get(key);
 const promise=(async()=>{
  const [raw]=await options.redis([['GET',key]]),saved=parse(raw);
  if(saved?.ok&&Array.isArray(saved.issues)&&Array.isArray(saved.seasons))return saved;
  const result=await read(options);
  await options.redis([['SET',key,JSON.stringify(result),'EX',60]]);
  return result;
 })().then(data=>{local.set(key,{data,expires:Date.now()+15000});return data;}).finally(()=>pending.delete(key));
 pending.set(key,promise);return promise;
}
module.exports={read:cachedRead,uncachedRead:read,annual,period,entitlements,PREFIX};
