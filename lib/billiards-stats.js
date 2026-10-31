'use strict';
const PREFIX='poker_app:billiards:stats:v1:';
// Room persistence and result accounting share one Redis transaction.
const rivals=require('./game-rivalries');
const CAS=`${rivals.LUA}
${require('./game-experience').LUA}
local raw=redis.call('GET',KEYS[1]);if not raw then return 0 end
local previous=cjson.decode(raw);if previous.revision~=tonumber(ARGV[1]) then return 0 end
local room=cjson.decode(ARGV[2]);local state=room.state
local finished=state.winner==0 or state.winner==1 or state.winner=='draw'
local a=room.playerProfiles and room.playerProfiles[1];local b=room.playerProfiles and room.playerProfiles[2]
if finished and room.players[2] and a and b and a.accountId and b.accountId and a.accountId~=b.accountId and (state.discipline=='pyramid' or state.discipline=='pool8') then
 grantGameExperience(room,'billiards')
 local base=ARGV[3]..state.discipline..':'
 local event=room.id..':'..tostring(room.match.number or 1)..':'..tostring(room.match.round)
 if redis.call('HSETNX',base..'results',event,cjson.encode({room={id=room.id,wagered=room.wagered==true,gameXpStake=room.gameXpStake,playerProfiles=room.playerProfiles,match=room.match,state={winner=state.winner,discipline=state.discipline}},finishedAt=tonumber(ARGV[4])}))==1 then
  redis.call('ZADD',base..'results:by-time',tonumber(ARGV[4]),event)
  local profiles={a,b}
  recordRivalries(room,base,event,tonumber(ARGV[4]))
  for i=1,2 do
   local p=profiles[i];local old=redis.call('HGET',base..'players',p.accountId)
   local stats=old and cjson.decode(old) or {wins=0,losses=0,draws=0,played=0}
   if stats.rankMember then redis.call('ZREM',base..'ranking',stats.rankMember) end
   local result=state.winner=='draw' and 'draw' or (state.winner==i-1 and 'win' or 'loss')
   if result=='win' then stats.wins=stats.wins+1 elseif result=='loss' then stats.losses=stats.losses+1 else stats.draws=stats.draws+1 end
   stats.played=stats.played+1;stats.name=p.name;stats.updatedAt=tonumber(ARGV[4])
   stats.rankMember=string.format('%012.0f',999999999999-stats.losses)..':'..p.accountId
   redis.call('HSET',base..'players',p.accountId,cjson.encode(stats))
   redis.call('ZADD',base..'ranking',stats.wins,stats.rankMember)
   local history={roomId=room.id,opponent=profiles[3-i].name,result=result,score={state.scores[i],state.scores[3-i]},finishedAt=tonumber(ARGV[4]),reason=state.endReason or 'game'}
   redis.call('LPUSH',base..'history:'..p.accountId,cjson.encode(history));redis.call('LTRIM',base..'history:'..p.accountId,0,19)
  end
 end
end
redis.call('SET',KEYS[1],ARGV[2],'KEEPTTL');return 1
`;
function cleanStats(raw,rank){let s={};try{s=JSON.parse(raw||'{}')||{};}catch{}const wins=Math.max(0,Number(s.wins)||0),losses=Math.max(0,Number(s.losses)||0),draws=Math.max(0,Number(s.draws)||0),played=wins+losses+draws;return {...Object.fromEntries(['weightedWins','weightedLosses','weightedDraws'].filter(k=>Number.isFinite(s[k])).map(k=>[k,s[k]])),name:String(s.name||'Игрок').slice(0,80),wins,losses,draws,played,winRate:played?Math.round(wins/played*100):0,ratingScore:Math.round(require('./game-rating-score').score(s)*100)/100,rank};}
async function read({commands,discipline,accountId}){
 if(!['pyramid','pool8'].includes(discipline)){const error=Error('Выберите русский бильярд или пул.');error.status=400;throw error;}
 const base=PREFIX+discipline+':';const [all,ownRaw,history]=await commands([['HGETALL',base+'players'],['HGET',base+'players',accountId],['LRANGE',base+'history:'+accountId,0,19]]);
 let rows=Object.entries(rivals.object(all)).map(([id,raw])=>({...cleanStats(typeof raw==='string'?raw:JSON.stringify(raw)),id}));
 const [results]=await commands([['HGETALL',base+'results']]);
 rows=await require('./game-rating-stakes').weightRows({commands,rows,sources:[results],roomPrefix:'poker_app:billiards:v1:',mode:'all'});
 const ranked=require('./game-rating-score').rankPlayers(rows);
 const rank=ranked.find(row=>row.id===accountId)?.rank||null;
 const rivalry=await rivals.readOverall({commands,bases:['pyramid','pool8'].map(kind=>PREFIX+kind+':'),roomPrefix:'poker_app:billiards:v1:',accountId,scope:'Все онлайн-партии: русский бильярд и пул.'});
 return {...rivalry,ok:true,discipline,ranking:ranked.map(row=>({...cleanStats(JSON.stringify(row),row.rank),self:row.id===accountId})),self:cleanStats(JSON.stringify(ranked.find(row=>row.id===accountId)||cleanStats(ownRaw)),rank),history:(history||[]).map(raw=>{try{return JSON.parse(raw);}catch{return null;}}).filter(Boolean)};
}
module.exports={PREFIX,CAS,read,cleanStats};
