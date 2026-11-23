'use strict';
const redis = require('./redis');
const prefix = 'poker_app:track_links:';
const owners = prefix+'first_visit:owners';
const migrated = prefix+'first_visit:indexed';
const bucket = prefix+'first_visit:link:';

// The first 24 characters are a UTC ISO timestamp, followed by the owning slug.
// Unknown historical dates predate the new counters and only count in lifetime statistics.
const indexFunctions = `
local unknown='!!!!!!!!!!!!!!!!!!!!!!!!'
local function claim(visitor,date,slug)
 local candidate=date..slug
 local old=redis.call('HGET',KEYS[1],visitor)
 if old and old<=candidate then return end
 if old then redis.call('ZREM',ARGV[2]..string.sub(old,25),string.sub(old,1,24)..visitor) end
 redis.call('HSET',KEYS[1],visitor,candidate)
 redis.call('ZADD',ARGV[2]..slug,0,date..visitor)
end
local function indexLink(slug)
 if redis.call('SISMEMBER',KEYS[2],slug)==1 then return end
 local dates={}
 for _,raw in ipairs(redis.call('LRANGE',KEYS[4],0,-1)) do
  local ok,v=pcall(cjson.decode,raw)
  if ok and type(v)=='table' and type(v.visitorId)=='string' and type(v.t)=='string' and #v.t==24 then
   if not dates[v.visitorId] or v.t<dates[v.visitorId] then dates[v.visitorId]=v.t end
  end
 end
 for _,visitor in ipairs(redis.call('SMEMBERS',KEYS[3])) do claim(visitor,dates[visitor] or unknown,slug) end
 redis.call('SADD',KEYS[2],slug)
end
indexLink(ARGV[1])
`;
function indexKeys(slug) {
  return [owners,migrated,prefix+'users:'+slug,prefix+'log:'+slug];
}
function indexCommand(slug) {
  return ['EVAL',indexFunctions+'return 1',4,...indexKeys(slug),slug,bucket];
}
function hitCommand(slug,visitor,date,entry) {
  const script = `if redis.call('HEXISTS',KEYS[5],ARGV[1])==0 then return 0 end
${indexFunctions}
claim(ARGV[3],ARGV[4],ARGV[1])
local KEYS={KEYS[5],KEYS[6],KEYS[7],KEYS[3],KEYS[4]}
local ARGV={ARGV[1],ARGV[3],ARGV[5]}
${require('./tracking-link-counters').HIT}`;
  return ['EVAL',script,7,...indexKeys(slug),prefix+'meta',prefix+'totals',prefix+'unique',slug,bucket,visitor,date,entry];
}
async function read(commands) {
  const result=await redis.pipeline(commands);
  if (!result || result.length!==commands.length || result.some(row=>!row || row.error)) throw Error('first_visits_unavailable');
  return result.map(row=>row.result);
}
async function counts(slugs,period) {
  if (!slugs.length) return new Map();
  const [existing,done]=await read([['HKEYS',prefix+'totals'],['SMEMBERS',migrated]]);
  const indexed=new Set(done);
  const pending=existing.filter(id=>!indexed.has(id));
  for(let i=0;i<pending.length;i+=40) await read(pending.slice(i,i+40).map(id=>indexCommand(id)));
  const values=await read(slugs.map(id=>period?['ZLEXCOUNT',bucket+id,'['+period.from,'('+period.until]:['ZCARD',bucket+id]));
  return new Map(slugs.map((id,i)=>[id,Number(values[i])]));
}
module.exports={counts,hitCommand};
