'use strict';
const SCRIPT=`-- game-viewers-v1
local now=tonumber(ARGV[1]);local slot=ARGV[2];local account=ARGV[3];local touch=ARGV[7]
local cached=redis.call('GET',KEYS[4])
if touch=='' and cached then local c=cjson.decode(cached);if c.revision==ARGV[6] then return cached end end
local raw=redis.call('GET',KEYS[1]);if not raw then return cjson.encode({count=0,names={}}) end
local room=cjson.decode(raw);local players={};local dirty=false
for _,p in ipairs(room.playerProfiles or {}) do if type(p)=='table' and p.accountId then players[p.accountId]=true end end
local participant=players[account] or false
for _,id in ipairs(room.players or {}) do if id==ARGV[5] then participant=true end end
if slot~='' then
 if touch=='leave' or participant then dirty=redis.call('ZREM',KEYS[2],slot)>0;redis.call('HDEL',KEYS[3],slot)
 elseif touch=='active' then
  local previous=redis.call('ZSCORE',KEYS[2],slot);if not previous then dirty=true end
  if not previous or now-tonumber(previous)>=15000 then
   redis.call('ZADD',KEYS[2],now,slot);redis.call('HSET',KEYS[3],slot,cjson.encode({account=account,name=ARGV[4]}))
   redis.call('EXPIRE',KEYS[2],90);redis.call('EXPIRE',KEYS[3],90)
  end
 end
end
if cached and not dirty then local c=cjson.decode(cached);if c.revision==ARGV[6] then return cached end end
local stale=redis.call('ZRANGEBYSCORE',KEYS[2],'-inf',now-40000)
for _,id in ipairs(stale) do redis.call('ZREM',KEYS[2],id);redis.call('HDEL',KEYS[3],id) end
local ids=redis.call('ZRANGE',KEYS[2],0,-1);local seen={};local names={};local viewers={};local count=0
for _,id in ipairs(ids) do
 local data=redis.call('HGET',KEYS[3],id)
 if data then local viewer=cjson.decode(data)
  if players[viewer.account] then redis.call('ZREM',KEYS[2],id);redis.call('HDEL',KEYS[3],id)
  elseif not seen[viewer.account] then seen[viewer.account]=true;count=count+1;if #names<100 then table.insert(names,viewer.name);table.insert(viewers,{accountId=viewer.account,name=viewer.name}) end end
 end
end
local result=cjson.encode({revision=ARGV[6],count=count,names=names,viewers=viewers})
redis.call('SET',KEYS[4],result,'EX',3);return result`;
function create({commands,resolveViewer,resolveDetails,now=Date.now}){
 return async function observe({family,member,identity,body,result}){
  if(!['board-games','billiards'].includes(family)||!['room','watch'].includes(body.action)||!result?.roomId)return null;
  const active=body.action==='watch'&&['active','leave'].includes(body.viewerPresence)&&/^[a-zA-Z0-9_-]{16,80}$/.test(String(body.viewerSession||''));
  let viewer=null;if(active)viewer=await resolveViewer(member,identity,commands);
  const base='poker_app:game-viewers:v1:'+family+':'+result.roomId;
  const [raw]=await commands([['EVAL',SCRIPT,4,'poker_app:'+family+':v1:'+result.roomId,base+':sessions',base+':names',base+':summary',now(),viewer?viewer.accountId+':'+body.viewerSession:'',viewer?.accountId||'',viewer?.name||'',member,String(result.revision),active?body.viewerPresence:'']]);
  const data=typeof raw==='string'?JSON.parse(raw):raw;
  if(!data||!Number.isSafeInteger(data.count)||data.count<0)throw Error('Invalid viewer count');
  const details=body.includeViewers===true&&resolveDetails&&Array.isArray(data.viewers)&&data.viewers.length?await resolveDetails(data.viewers,{commands,result,family}):null;
  return {count:data.count,...(details?{players:details}:{}),...(body.includeViewers===true?{names:Array.isArray(data.names)?data.names:[]}:{} )};
 };
}
const profiles=new Map();
async function resolveViewer(member,identity,commands){
 const found=profiles.get(member);if(found&&found.until>Date.now())return found.value;
 const accountId=await require('./account-canonical').canonicalAccountId(await require('./api-handlers/friends').resolveNewsAccountId(identity,member));
 if(!accountId)throw Error('Viewer identity unavailable');
 const [raw,bound,display]=await commands([['HGET','poker_app:pokerplus_profiles',accountId],['HGET','poker_app:pokerplus_user_ids',accountId],['HGET','poker_app:visitor_chat_display_names',accountId]]);
 let profile={};try{profile=JSON.parse(raw||'{}')||{};}catch{}
 const name=bound&&(profile.nickname||profile.Nike||profile.nick||profile.name)||display||'Зритель';
 const value={accountId,name:String(name).replace(/[\u0000-\u001f\u007f]/g,' ').trim().slice(0,80)};
 if(profiles.size>=1000)profiles.clear();profiles.set(member,{value,until:Date.now()+60000});return value;
}
const detailCache=new Map();
async function resolveDetails(viewers,{commands,result,family}){
 const game=family==='billiards'?'billiards':result.state?.discipline,mode=result.wager?'paid':'free';
 const cacheKey=JSON.stringify([game,mode,viewers]);const cached=detailCache.get(cacheKey);if(cached&&cached.until>Date.now())return cached.rows;
 let ranked=null;try{ranked=await require('./telegram-game-rankings').readPlayers({commands,game,mode});}catch(e){console.error('[viewer-rating]',e.message);}
 const ratings=new Map((ranked||[]).map(row=>[row.id,row]));
 const rows=[];
 // Limit concurrent profile reads; the list itself is already capped at 100.
 for(let start=0;start<viewers.length;start+=8)rows.push(...await Promise.all(viewers.slice(start,start+8).map(async viewer=>{
  let profile=null;try{profile=await require('./club-social').memberProfile(viewer.accountId);}catch{}
  const own=ratings.get(viewer.accountId);
  return {name:viewer.name,avatarUrl:'/api/avatar?userId='+encodeURIComponent(viewer.accountId)+'&format=image',level:profile?profile.level:null,rating:ranked?{game,mode,rank:own?.rank||null,total:ranked.length,score:own?.ratingScore||0}:null};
 })));
 if(detailCache.size>=200)detailCache.clear();detailCache.set(cacheKey,{rows,until:Date.now()+15000});
 return rows;
}
module.exports=async args=>create({commands:args.commands,resolveViewer,resolveDetails})(args);
module.exports.create=create;module.exports.SCRIPT=SCRIPT;
