'use strict';
const PREFIX='poker_app:board-games:stats:v2:',LEGACY_PREFIX='poker_app:board-games:stats:v1:';
const rivals=require('./game-rivalries');
const RECORD=`${rivals.LUA}
local function record(room,base,event,time,mode)
 local state=room.state;local profiles=room.playerProfiles
 if redis.call('HSETNX',base..'results',event,cjson.encode({room=room,finishedAt=time,mode=mode}))~=1 then return 0 end
 redis.call('ZADD',base..'results:by-time',time,event)
 recordRivalries(room,base,event,time)
 for i=1,2 do
  local p=profiles[i];local old=redis.call('HGET',base..'players',p.accountId)
  local stats=old and cjson.decode(old) or {wins=0,losses=0,draws=0,played=0}
  if stats.rankMember then redis.call('ZREM',base..'ranking',stats.rankMember) end
  local result=state.winner=='draw' and 'draw' or (state.winner==i-1 and 'win' or 'loss')
  if result=='win' then stats.wins=stats.wins+1 elseif result=='loss' then stats.losses=stats.losses+1 else stats.draws=stats.draws+1 end
  stats.played=stats.played+1;if time>=(stats.updatedAt or 0) then stats.name=p.name;stats.updatedAt=time end
  stats.rankMember=string.format('%012.0f',999999999999-stats.losses)..':'..p.accountId
  redis.call('HSET',base..'players',p.accountId,cjson.encode(stats));redis.call('ZADD',base..'ranking',stats.wins,stats.rankMember)
  local scores=state.totals or state.scores or {0,0}
  local history={eventId=event,roomId=room.id,mode=mode,opponent=profiles[3-i].name,result=result,score={scores[i],scores[3-i]},finishedAt=time,reason=state.endReason or 'game'}
  redis.call('LPUSH',base..'history:'..p.accountId,cjson.encode(history));redis.call('LTRIM',base..'history:'..p.accountId,0,19)
 end
 return 1
end
`;
// Authoritative room persistence and the correct rating bucket share one transaction.
const CAS=`${RECORD}
${require('./game-experience').LUA}
local raw=redis.call('GET',KEYS[1]);if not raw then return 0 end
local previous=cjson.decode(raw);if previous.revision~=tonumber(ARGV[1]) then return 0 end
local rewardLock=ARGV[6] and cjson.decode(ARGV[6]) or nil
if rewardLock and rewardLock.key and redis.call('GET',rewardLock.key)~=rewardLock.value then return 0 end
local room=cjson.decode(ARGV[2]);local state=room.state
local finished=state.winner==0 or state.winner==1 or state.winner=='draw'
local a=room.playerProfiles and room.playerProfiles[1];local b=room.playerProfiles and room.playerProfiles[2]
if finished and not (room.tournament and room.tournament.doubleNoShow==true) and room.players[2] and a and b and a.accountId and b.accountId and a.accountId~=b.accountId and (state.discipline=='chess' or state.discipline=='short' or state.discipline=='long' or state.discipline=='darts') then
 local mode=room.wagered==true and 'paid' or 'free'
 local ratingDiscipline=state.discipline
 if state.discipline=='long' and state.variant=='crazy' then ratingDiscipline='long-crazy' end
 if state.discipline=='long' and state.variant=='six-one' then ratingDiscipline='long-six-one' end
 local base=ARGV[3]..ratingDiscipline..':'..mode..':'
 local event=room.id..':'..tostring(room.match.number or 1)..':'..tostring(room.match.round)
 record(room,base,event,tonumber(ARGV[4]),mode)
 grantGameExperience(room,'board-games')
end
if ARGV[5] and ARGV[5]~='' then
 for _,command in ipairs(cjson.decode(ARGV[5])) do redis.call(unpack(command)) end
end
redis.call('SET',KEYS[1],ARGV[2],'KEEPTTL');return 1
`;
const IMPORT=`${RECORD}\nreturn record(cjson.decode(ARGV[2]),KEYS[1],ARGV[1],tonumber(ARGV[3]),ARGV[4])`;
function parse(value){try{return JSON.parse(value||'null');}catch{return null;}}
async function scanHash(commands,key){let cursor='0';const out={};for(let page=0;page<100;page++){const [data]=await commands([['HSCAN',key,cursor,'COUNT',200]]);if(!Array.isArray(data)||!Array.isArray(data[1]))throw Error('Не удалось прочитать прежний рейтинг.');for(let i=0;i<data[1].length;i+=2)out[data[1][i]]=data[1][i+1];cursor=String(data[0]);if(cursor==='0')return out;}throw Error('Перенос прежнего рейтинга ещё продолжается.');}
async function migrateLegacy({commands,discipline}){
 const legacy=LEGACY_PREFIX+discipline+':',marker=PREFIX+discipline+':legacy-count';
 const [total,done]=await commands([['HLEN',legacy+'results'],['GET',marker]]);
 if(Number(total)===0||String(done)===String(total))return {unresolved:0};
 const [events,players]=await Promise.all([scanHash(commands,legacy+'results'),scanHash(commands,legacy+'players')]);
 const ids=Object.keys(players),histories=ids.length?await commands(ids.map(id=>['LRANGE',legacy+'history:'+id,0,19])):[],index=new Map();
 ids.forEach((id,i)=>{for(const raw of histories[i]||[]){const h=parse(raw);if(!h?.roomId||!Number.isFinite(Number(h.finishedAt)))continue;const key=h.roomId+':'+h.finishedAt;if(!index.has(key))index.set(key,new Map());index.get(key).set(id,{history:h,name:parse(players[id])?.name||'Игрок'});}});
 const eventIds=Object.keys(events).sort((a,b)=>Number(events[a])-Number(events[b])||a.localeCompare(b)),roomIds=[...new Set(eventIds.map(e=>e.split(':')[0]))],roomMap=new Map(),journalMap=new Map();
 for(let start=0;start<roomIds.length;start+=100){const batch=roomIds.slice(start,start+100);const [rooms,journals]=await commands([['MGET',...batch.map(id=>'poker_app:board-games:v1:'+id)],['MGET',...batch.map(id=>'poker_app:board-games:v1:wager:'+id)]]);batch.forEach((id,i)=>{roomMap.set(id,parse(rooms?.[i]));journalMap.set(id,parse(journals?.[i]));});}
 let unresolved=0;
 for(let start=0;start<eventIds.length;start+=100){const batch=eventIds.slice(start,start+100),[free,paid]=await commands(['free','paid'].map(mode=>['HMGET',PREFIX+discipline+':'+mode+':results',...batch]));
 for(let j=0;j<batch.length;j++){
  if(free?.[j]||paid?.[j])continue;
  const event=batch[j],[roomId,number,round]=event.split(':'),time=Number(events[event]),stored=roomMap.get(roomId),history=index.get(roomId+':'+time);let room=null;
  if(stored&&stored.match?.number===Number(number)&&stored.match?.round===Number(round)&&[0,1,'draw'].includes(stored.state?.winner))room=stored;
  else if(history?.size===2){const pair=[...history],first=pair[0][1].history,second=pair[1][1].history;if((first.result==='draw'&&second.result==='draw')||(first.result==='win'&&second.result==='loss')||(first.result==='loss'&&second.result==='win'))room={id:roomId,players:['a','b'],playerProfiles:pair.map(([accountId,p])=>({accountId,name:p.name})),match:{number:Number(number),round:Number(round)},state:{discipline,winner:first.result==='draw'?'draw':first.result==='win'?0:1,scores:first.score||[0,0],endReason:first.reason}};}
  if(!room?.playerProfiles?.[0]?.accountId||!room?.playerProfiles?.[1]?.accountId||!Number.isFinite(time)){unresolved++;continue;}
  // Escrow journals persist independently of room expiry and identify old paid results.
  const mode=stored?.wagered===true||Number(journalMap.get(roomId)?.stake)>0?'paid':'free';
  await commands([['EVAL',IMPORT,1,PREFIX+discipline+':'+mode+':',event,JSON.stringify(room),time,mode]]);
 }}
 if(!unresolved)await commands([['SET',marker,String(total)]]);
 return {unresolved};
}
function cleanStats(raw,rank){let s={};try{s=JSON.parse(raw||'{}')||{};}catch{}const wins=Math.max(0,Number(s.wins)||0),losses=Math.max(0,Number(s.losses)||0),draws=Math.max(0,Number(s.draws)||0),played=wins+losses+draws;return {...Object.fromEntries(['weightedWins','weightedLosses','weightedDraws'].filter(k=>Number.isFinite(s[k])).map(k=>[k,s[k]])),name:String(s.name||'Игрок').slice(0,80),wins,losses,draws,played,winRate:played?Math.round(wins/played*100):0,ratingScore:Math.round(require('./game-rating-score').score(s)*100)/100,rank};}
async function read({commands,discipline,accountId,mode='free',migration=true,resultEvent}){
 if(!['chess','short','long','darts'].includes(discipline)||!['free','paid'].includes(mode)){const error=Error('Выберите дисциплину и рейтинг: бесплатные партии или на фишки.');error.status=400;throw error;}
 const legacy=migration?await migrateLegacy({commands,discipline}):{unresolved:0};
 const base=PREFIX+discipline+':'+mode+':';const [all,ownRaw,history]=await commands([['HGETALL',base+'players'],['HGET',base+'players',accountId],['LRANGE',base+'history:'+accountId,0,19]]);
 let rows=Object.entries(rivals.object(all)).map(([id,raw])=>({...cleanStats(typeof raw==='string'?raw:JSON.stringify(raw)),id}));
 if(mode==='paid'){const [results]=await commands([['HGETALL',base+'results']]);rows=await require('./game-rating-stakes').weightRows({commands,rows,sources:[results],roomPrefix:'poker_app:board-games:v1:',mode});}
 const ranked=require('./game-rating-score').rankPlayers(rows);
 const rank=ranked.find(row=>row.id===accountId)?.rank||null;
 let resultProgress=null;
 if(/^[A-HJ-NP-Z2-9]{10}:\d{1,10}:\d{1,10}$/.test(String(resultEvent||''))){
  const [raw]=await commands([['HGET',base+'results',resultEvent]]),event=parse(raw);
  if(event?.room?.playerProfiles?.some(p=>p?.accountId===accountId)){
   let stake=Number(event.room.gameXpStake)||0;if(mode==='paid'&&!stake){const [rawWager]=await commands([['GET','poker_app:board-games:v1:wager:'+event.room.id]]);stake=Number(parse(rawWager)?.stake)||0;}
   resultProgress=require('./game-rating-transition').transition({rows,event,accountId,mode,stake});
  }
 }
 const rivalry=await rivals.readOverall({commands,bases:['free','paid'].map(bucket=>PREFIX+discipline+':'+bucket+':'),roomPrefix:'poker_app:board-games:v1:',accountId,scope:'Все партии выбранной дисциплины: вход 0 и на фишки.'});
 return {...rivalry,ok:true,discipline,mode,...(resultProgress?{resultProgress}:{}),legacyUnresolved:legacy.unresolved,ranking:ranked.map(row=>({...cleanStats(JSON.stringify(row),row.rank),self:row.id===accountId})),self:cleanStats(JSON.stringify(ranked.find(row=>row.id===accountId)||cleanStats(ownRaw)),rank),history:(history||[]).map(parse).filter(Boolean).sort((a,b)=>b.finishedAt-a.finishedAt).slice(0,10)};
}
module.exports={PREFIX,LEGACY_PREFIX,CAS,IMPORT,read,cleanStats,migrateLegacy};
