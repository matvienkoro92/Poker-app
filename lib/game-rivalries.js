'use strict';
const LUA=`
local function recordRivalries(room,base,event,time)
 local profiles=room.playerProfiles;local state=room.state
 if not profiles or not profiles[1] or not profiles[2] or not profiles[1].accountId or not profiles[2].accountId or profiles[1].accountId==profiles[2].accountId then return 0 end
 if state.winner~=0 and state.winner~=1 and state.winner~='draw' then return 0 end
 local newGame=redis.call('HSETNX',base..'rival-results',event,time)==1
 local newPoints=redis.call('HSETNX',base..'rival-point-results',event,time)==1
 if not newGame and not newPoints then return 0 end
 for i=1,2 do
  local p=profiles[i];local opponent=profiles[3-i];local key=base..'rivals:'..p.accountId
  local raw=redis.call('HGET',key,opponent.accountId)
  local value=raw and cjson.decode(raw) or {wins=0,losses=0,draws=0}
  local result=state.winner=='draw' and 'draws' or (state.winner==i-1 and 'wins' or 'losses')
  if newGame then value[result]=(value[result] or 0)+1 end
  if newPoints and state.winner~='draw' then
   local points=math.max(1,math.min(3,tonumber(state.winPoints) or 1))
   local field=state.winner==i-1 and 'pointsWon' or 'pointsLost'
   value[field]=(value[field] or 0)+points
  end
  if time>=(value.updatedAt or 0) then value.name=opponent.name;value.updatedAt=time end
  redis.call('HSET',key,opponent.accountId,cjson.encode(value))
 end
 return 1
end
`;
const IMPORT=LUA+"\nreturn recordRivalries(cjson.decode(ARGV[1]),KEYS[1],ARGV[2],tonumber(ARGV[3]))";
const parse=x=>{try{return typeof x==='string'?JSON.parse(x):x;}catch{return null;}};
function object(raw){if(Array.isArray(raw)){const out={};for(let i=0;i<raw.length;i+=2)out[raw[i]]=raw[i+1];return out;}return raw&&typeof raw==='object'?raw:{};}
async function read({commands,base,roomPrefix,accountId,played,includeIdentity=false}){
 // A bounded, resumable archive pass; the same Lua guard makes migration and live writes idempotent.
 const [done,cursor]=await commands([['GET',base+'rival-points-backfill-complete'],['GET',base+'rival-points-backfill-cursor']]);
 let pending=!done;
 if(!done){
  const [scan]=await commands([['HSCAN',base+'results',String(cursor||0),'COUNT',100]]);
  if(Array.isArray(scan)&&Array.isArray(scan[1])){
   const records=[];for(let i=0;i<scan[1].length;i+=2)records.push({event:String(scan[1][i]),value:parse(scan[1][i+1])});
   const missing=records.filter(r=>!r.value?.room),rooms=missing.length?await commands(missing.map(r=>['GET',roomPrefix+r.event.split(':')[0]])):[];
   missing.forEach((r,i)=>{const room=parse(rooms[i]);if(room&&[room.id,room.match?.number||1,room.match?.round].join(':')===r.event)r.value={room,finishedAt:Number(r.value)||Date.now()};});
   const imports=records.filter(r=>r.value?.room).map(r=>['EVAL',IMPORT,1,base,JSON.stringify(r.value.room),r.event,Number(r.value.finishedAt)||0]);if(imports.length)await commands(imports);
   pending=String(scan[0])!=='0';
   await commands([['SET',base+'rival-points-backfill-cursor',String(scan[0])],...(String(scan[0])==='0'?[['SET',base+'rival-points-backfill-complete','1']]:[])]);
  }
 }
 const [raw]=await commands([['HGETALL',base+'rivals:'+accountId]]);
 const rivalries=Object.entries(object(raw)).map(([id,value])=>({id,value:parse(value)})).filter(row=>row.value&&typeof row.value==='object').map(({id,value:v})=>{const wins=Math.max(0,Number(v.wins)||0),losses=Math.max(0,Number(v.losses)||0),draws=Math.max(0,Number(v.draws)||0);return {...(includeIdentity?{id,updatedAt:Number(v.updatedAt)||0}:{}),name:String(v.name||'Игрок').slice(0,80),wins,losses,draws,pointsWon:Math.max(wins,Number(v.pointsWon)||0),pointsLost:Math.max(losses,Number(v.pointsLost)||0),played:wins+losses+draws};}).sort((a,b)=>b.played-a.played||b.wins-a.wins||a.name.localeCompare(b.name,'ru'));
 const counted=rivalries.reduce((sum,row)=>sum+row.played,0);
 return {rivalries,rivalriesPending:pending,rivalriesIncomplete:counted<played,rivalriesCounted:counted};
}
async function readOverall({commands,bases,roomPrefix,accountId,scope}){
 const own=await commands(bases.map(base=>['HGET',base+'players',accountId]));
 const counts=own.map(raw=>{const value=parse(raw)||{};return ['wins','losses','draws'].reduce((sum,key)=>sum+Math.max(0,Number(value[key])||0),0);});
 const results=await Promise.all(bases.map((base,i)=>read({commands,base,roomPrefix,accountId,played:counts[i],includeIdentity:true})));
 const combined=new Map();for(const result of results)for(const row of result.rivalries){const current=combined.get(row.id)||{name:row.name,updatedAt:-1,wins:0,losses:0,draws:0,played:0};for(const key of ['wins','losses','draws','played'])current[key]+=row[key];if(row.updatedAt>=current.updatedAt){current.updatedAt=row.updatedAt;current.name=row.name;}combined.set(row.id,current);}
 const rivalries=[...combined.values()].map(({updatedAt,...row})=>row).sort((a,b)=>b.played-a.played||b.wins-a.wins||a.name.localeCompare(b.name,'ru')),counted=rivalries.reduce((sum,row)=>sum+row.played,0),total=counts.reduce((a,b)=>a+b,0);
 return {rivalries,rivalriesCounted:counted,rivalriesTotal:total,rivalriesIncomplete:counted<total,rivalriesPending:results.some(r=>r.rivalriesPending),rivalriesScope:scope};
}
module.exports={LUA,IMPORT,read,readOverall,object};
