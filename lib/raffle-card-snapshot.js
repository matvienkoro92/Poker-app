'use strict';
const LUA=`
local out={}
for _,key in ipairs(KEYS) do
 local raw=redis.call('GET',key)
 if raw then
  local r=cjson.decode(raw);local winners={};local groups={}
  for _,g in ipairs(r.groups or {}) do table.insert(groups,{prize=g.prize}) end
  for _,w in ipairs(r.winners or {}) do
   local winner={}
   for _,field in ipairs({'accountId','userId','telegramId','telegramUserId','prize','groupIndex','poker21PayoutAmount','winnerStatus','winnerReadySlotId','winnerReadyExpired','winnerBurned','winnerReadyState'}) do winner[field]=w[field] end
   if w.cashSeatingMonitor then winner.cashSeatingMonitor={status=w.cashSeatingMonitor.status} end
   table.insert(winners,winner)
  end
  table.insert(out,{id=r.id or string.sub(key,string.len('poker_app:raffle:')+1),sourceDigest=redis.sha1hex(raw),status=r.status,prizeKind=r.prizeKind or r.prize_kind,title=r.title,groups=groups,winners=winners})
 end
end
return cjson.encode(out)
`;
async function read(run){
 const raw=[];
 for(let page=0;page<100;page++){
  const [chunk]=await run([['LRANGE','poker_app:raffle_ids',page*200,page*200+199]]);
  if(!Array.isArray(chunk))throw Error('Raffle list unavailable');raw.push(...chunk);
  if(chunk.length<200)break;
  if(page===99)throw Error('Raffle archive limit reached');
 }
 const ids=[...new Set(raw.map(String).filter(Boolean))],result=[];
 const chunks=[];for(let i=0;i<ids.length;i+=20)chunks.push(ids.slice(i,i+20));
 async function batch(ids){
  const keys=ids.map(id=>'poker_app:raffle:'+id),command=[['EVAL',LUA,keys.length,...keys]];
  let value;
  try{[value]=await run(command);}catch(error){if(!/abort|timeout/i.test(String(error?.message||error)))throw error;[value]=await run(command);}
  const rows=JSON.parse(value||'null');if(!rows||typeof rows!=='object')throw Error('Raffle archive unavailable');
  return Object.values(rows).map(r=>({...r,groups:Array.isArray(r.groups)?r.groups:[],winners:Array.isArray(r.winners)?r.winners:[]}));
 }
 for(let i=0;i<chunks.length;i+=3){const rows=await Promise.all(chunks.slice(i,i+3).map(batch));result.push(...rows.flat());}
 return result;
}
module.exports={read,LUA};
