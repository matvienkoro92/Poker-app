'use strict';
const PREFIX='poker_app:board-games:stats:v2:',LEGACY_PREFIX='poker_app:board-games:stats:v1:';
const RECORD=`
local function record(room,base,event,time,mode)
 local state=room.state;local profiles=room.playerProfiles
 if redis.call('HSETNX',base..'results',event,cjson.encode({room=room,finishedAt=time,mode=mode}))~=1 then return 0 end
 for i=1,2 do
  local p=profiles[i];local old=redis.call('HGET',base..'players',p.accountId)
  local stats=old and cjson.decode(old) or {wins=0,losses=0,draws=0,played=0}
  if stats.rankMember then redis.call('ZREM',base..'ranking',stats.rankMember) end
  local result=state.winner=='draw' and 'draw' or (state.winner==i-1 and 'win' or 'loss')
  if result=='win' then stats.wins=stats.wins+1 elseif result=='loss' then stats.losses=stats.losses+1 else stats.draws=stats.draws+1 end
  stats.played=stats.played+1;if time>=(stats.updatedAt or 0) then stats.name=p.name;stats.updatedAt=time end
  stats.rankMember=string.format('%012.0f',999999999999-stats.losses)..':'..p.accountId
  redis.call('HSET',base..'players',p.accountId,cjson.encode(stats));redis.call('ZADD',base..'ranking',stats.wins,stats.rankMember)
  local scores=state.scores or {0,0}
  local history={eventId=event,roomId=room.id,mode=mode,opponent=profiles[3-i].name,result=result,score={scores[i],scores[3-i]},finishedAt=time,reason=state.endReason or 'game'}
  redis.call('LPUSH',base..'history:'..p.accountId,cjson.encode(history));redis.call('LTRIM',base..'history:'..p.accountId,0,19)
 end
 return 1
end
`;
// Authoritative room persistence and the correct rating bucket share one transaction.
const CAS=`${RECORD}
local raw=redis.call('GET',KEYS[1]);if not raw then return 0 end
local previous=cjson.decode(raw);if previous.revision~=tonumber(ARGV[1]) then return 0 end
local room=cjson.decode(ARGV[2]);local state=room.state
local finished=state.winner==0 or state.winner==1 or state.winner=='draw'
local a=room.playerProfiles and room.playerProfiles[1];local b=room.playerProfiles and room.playerProfiles[2]
if finished and room.players[2] and a and b and a.accountId and b.accountId and a.accountId~=b.accountId and (state.discipline=='chess' or state.discipline=='short' or state.discipline=='long') then
 local mode=room.wagered==true and 'paid' or 'free'
 local base=ARGV[3]..state.discipline..':'..mode..':'
 local event=room.id..':'..tostring(room.match.number or 1)..':'..tostring(room.match.round)
 record(room,base,event,tonumber(ARGV[4]),mode)
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
function cleanStats(raw,rank){let s={};try{s=JSON.parse(raw||'{}')||{};}catch{}const wins=Math.max(0,Number(s.wins)||0),losses=Math.max(0,Number(s.losses)||0),draws=Math.max(0,Number(s.draws)||0),played=wins+losses+draws;return {name:String(s.name||'Игрок').slice(0,80),wins,losses,draws,played,winRate:played?Math.round(wins/played*100):0,rank};}
async function read({commands,discipline,accountId,mode='free',migration=true}){
 if(!['chess','short','long'].includes(discipline)||!['free','paid'].includes(mode)){const error=Error('Выберите дисциплину и рейтинг: бесплатные партии или на фишки.');error.status=400;throw error;}
 const legacy=migration?await migrateLegacy({commands,discipline}):{unresolved:0};
 const base=PREFIX+discipline+':'+mode+':';const [members,ownRaw,history]=await commands([['ZREVRANGE',base+'ranking',0,49],['HGET',base+'players',accountId],['LRANGE',base+'history:'+accountId,0,19]]);
 const ids=(members||[]).map(m=>String(m).slice(String(m).lastIndexOf(':')+1));const rows=ids.length?await commands(ids.map(id=>['HGET',base+'players',id])):[];
 let rank=null;try{const own=JSON.parse(ownRaw||'{}');if(own.rankMember){const [r]=await commands([['ZREVRANK',base+'ranking',own.rankMember]]);if(r!==null&&r!==undefined)rank=Number(r)+1;}}catch{}
 return {ok:true,discipline,mode,legacyUnresolved:legacy.unresolved,ranking:rows.map((raw,i)=>({...cleanStats(raw,i+1),self:ids[i]===accountId})),self:cleanStats(ownRaw,rank),history:(history||[]).map(parse).filter(Boolean).sort((a,b)=>b.finishedAt-a.finishedAt).slice(0,10)};
}
module.exports={PREFIX,LEGACY_PREFIX,CAS,IMPORT,read,cleanStats,migrateLegacy};
