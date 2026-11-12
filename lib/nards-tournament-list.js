'use strict';
const CARDS=`
local rows={}
for _,key in ipairs(KEYS) do
 local raw=redis.call('GET',key)
 if raw then
  local t=cjson.decode(raw);local card={}
  for _,field in ipairs({'id','title','status','startsAt','drawAt','capacity','createdAt','discipline','entryType','buyIn','prizeKind','prizeMode','prizeAmounts','prizeShares','prizeFund','winnerId','deletedAt'}) do card[field]=t[field] end
  card.entries={};for _,e in ipairs(t.entries or {}) do table.insert(card.entries,{id=e.id,name=e.name,accountId=e.accountId,withdrawn=e.withdrawn}) end
  card.rounds={};if t.rounds and #t.rounds>0 then
   local final={matches={}};for _,m in ipairs(t.rounds[#t.rounds].matches or {}) do table.insert(final.matches,{resolved=m.resolved,winnerId=m.winnerId,playerIds=m.playerIds}) end
   table.insert(card.rounds,final)
  end
  table.insert(rows,cjson.encode(card))
 end
end
return rows`;
const VISIBLE=`
if redis.call('EXISTS',KEYS[2])==0 then
 for _,id in ipairs(redis.call('SMEMBERS',KEYS[3])) do
  local raw=redis.call('GET',ARGV[1]..id)
  if raw then local t=cjson.decode(raw);if not t.deletedAt and (t.status=='registration' or t.status=='drawn' or t.status=='running') then redis.call('SADD',KEYS[1],id) end end
 end
 redis.call('SET',KEYS[2],'1')
end
return redis.call('SMEMBERS',KEYS[1])`;
const active=t=>['registration','drawn','running'].includes(t.status);
// Cursor is an index member, rather than an offset that moves when a new event is added.
function create({commands,prefix,activeKey}){
 async function read(ids){const [rows]=await commands([['EVAL',CARDS,ids.length,...ids.map(id=>prefix+id)]]);return rows||[];}
 async function page({archive=false,before=''}={}){
  let offset=0;
  if(before){const [rank]=await commands([['ZREVRANK',prefix+'index',before]]);if(rank==null)return {tournaments:[],nextCursor:null,hasMore:false};offset=Number(rank)+1;}
  const limit=archive?5:1,previous=[];let initialIds=null,liveIds=[],cached=new Map();
  const parse=raw=>{const card=JSON.parse(raw);if(!Array.isArray(card.entries))card.entries=[];if(!Array.isArray(card.rounds))card.rounds=[];return card;};
  if(!archive){
   const [ids,visible]=await commands([['ZREVRANGE',prefix+'index',offset,offset+5],['EVAL',VISIBLE,3,prefix+'visible',prefix+'visible-initialized',activeKey,prefix]]);
   initialIds=ids||[];liveIds=visible||[];
   const keys=[...new Set([...initialIds,...liveIds])];
   if(keys.length)for(const raw of await read(keys)){const card=parse(raw);cached.set(card.id,card);}
  }

  for(let batch=0;batch<30&&previous.length<=limit;batch++){
   const ids=batch===0&&initialIds!==null?initialIds:(await commands([['ZREVRANGE',prefix+'index',offset,offset+5]]))[0];
   if(!ids?.length)break;
   offset+=ids.length;
   const records=batch===0&&initialIds!==null?ids.map(id=>cached.get(id)).filter(Boolean):(await read(ids)).filter(Boolean).map(parse);
   for(const t of records){if(!t.deletedAt&&!active(t))previous.push(t);if(previous.length>limit)break;}
   if(ids.length<6)break;
  }
  const hasMore=previous.length>limit,shown=previous.slice(0,limit);
  const nextCursor=hasMore?shown.at(-1)?.id||null:null;
  if(archive)return {tournaments:shown,nextCursor,hasMore};
  const live=liveIds.map(id=>cached.get(id)).filter(t=>t&&!t.deletedAt&&active(t)).sort((a,b)=>b.createdAt-a.createdAt);
  return {tournaments:[...live,...shown],nextCursor,hasMore};
 }
 return page;
}
function fallback(list,{archive=false,before=''}={}){
 const sorted=list.filter(t=>!t.deletedAt).sort((a,b)=>b.createdAt-a.createdAt),start=before?sorted.findIndex(t=>t.id===before)+1:0;
 const archived=sorted.slice(start).filter(t=>!active(t)),limit=archive?5:1,shown=archived.slice(0,limit),hasMore=archived.length>limit;
 return {tournaments:archive?shown:[...sorted.filter(active),...shown],hasMore,nextCursor:hasMore?shown.at(-1).id:null};
}
module.exports={create,fallback,VISIBLE,CARDS};
