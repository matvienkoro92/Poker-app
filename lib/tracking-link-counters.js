'use strict';
// The visitor set is the source of truth. Legacy unique hashes are only compatibility caches.
const HIT = `
if redis.call('HEXISTS',KEYS[1],ARGV[1])==0 then return 0 end
redis.call('HINCRBY',KEYS[2],ARGV[1],1)
redis.call('SADD',KEYS[4],ARGV[2])
redis.call('HSET',KEYS[3],ARGV[1],redis.call('SCARD',KEYS[4]))
redis.call('LPUSH',KEYS[5],ARGV[3])
redis.call('LTRIM',KEYS[5],0,499)
return 1`;
const EVENT = `
if redis.call('HEXISTS',KEYS[1],ARGV[1])==0 then return 0 end
if redis.call('SISMEMBER',KEYS[2],ARGV[2])==0 then return -1 end
local d={counts={},total=0,samples={}}
local raw=redis.call('HGET',KEYS[6],ARGV[2])
if raw then local ok,v=pcall(cjson.decode,raw);if ok and type(v)=='table' then d=v end end
if type(d.counts)~='table' then d.counts={} end
if type(d.samples)~='table' then d.samples={} end
d.counts[ARGV[3]]=(tonumber(d.counts[ARGV[3]]) or 0)+1
d.total=(tonumber(d.total) or 0)+1
d.lastAt=ARGV[4]
local sample={t=ARGV[4],a=ARGV[3]}
if ARGV[5]~='' then sample.d=ARGV[5] end
table.insert(d.samples,sample)
while #d.samples>25 do table.remove(d.samples,1) end
redis.call('INCR',KEYS[3])
redis.call('SADD',KEYS[4],ARGV[2])
redis.call('HINCRBY',KEYS[5],ARGV[3],1)
redis.call('HSET',KEYS[6],ARGV[2],cjson.encode(d))
return 1`;
const SUMMARY = `
local users=redis.call('SCARD',KEYS[1])
local active=redis.call('SINTER',KEYS[1],KEYS[2])
local events=0
local verified=0
for _,id in ipairs(active) do
 local raw=redis.call('HGET',KEYS[3],id)
 if raw then
  local ok,v=pcall(cjson.decode,raw)
  if ok and type(v)=='table' then
   local n=math.floor(tonumber(v.total) or 0)
   if n>0 then
    events=events+n
    local sections,count={},0
    if type(v.counts)=='table' then
     for action,total in pairs(v.counts) do
      local section=type(action)=='string' and string.match(action,'^view:([%w_%-]+)$')
      if section and (tonumber(total) or 0)>0 then
       section=string.gsub(string.lower(section),'%-','_')
       if section~='unknown' and not sections[section] then sections[section]=true;count=count+1 end
      end
     end
    end
    if count>=2 then verified=verified+1 end
   end
  end
 end
end
return {users,verified,events}`;
// A period is exact only where the retained logs cover its start.
const PERIOD = `
local from, untilAt, id = ARGV[1], ARGV[2], ARGV[3]
local entries=redis.call('LRANGE',KEYS[1],0,-1)
local total=tonumber(redis.call('HGET',KEYS[2],id)) or 0
local clicks,users=0,0
local seen={}
local hitsComplete=total<=#entries
local hitsValid=true
for _,raw in ipairs(entries) do
 local ok,v=pcall(cjson.decode,raw)
 if not ok or type(v)~='table' or type(v.t)~='string' then
  hitsValid=false
 else
  if v.t<from then hitsComplete=true;break end
  if v.t<untilAt then
   clicks=clicks+1
   if type(v.visitorId)~='string' then hitsValid=false
   elseif not seen[v.visitorId] then
    seen[v.visitorId]=true;users=users+1
   end
  end
 end
end
hitsComplete=hitsComplete and hitsValid
local active,events,navComplete,sampleTotal=0,0,true,0
for _,raw in ipairs(redis.call('HVALS',KEYS[3])) do
 local ok,v=pcall(cjson.decode,raw)
 if not ok or type(v)~='table' or type(v.samples)~='table' then
  navComplete=false
 else
  local first=v.samples[1]
  local countTotal=tonumber(v.total) or 0
  sampleTotal=sampleTotal+countTotal
  if countTotal>#v.samples and (type(first)~='table' or type(first.t)~='string' or first.t>=from) then navComplete=false end
  local sections,count={},0
  for _,sample in ipairs(v.samples) do
   if type(sample)~='table' or type(sample.t)~='string' or type(sample.a)~='string' then
    navComplete=false
   elseif sample.t>=from and sample.t<untilAt then
    events=events+1
    local section=string.match(sample.a,'^view:([%w_%-]+)$')
    if section then
     section=string.gsub(string.lower(section),'%-','_')
     if section~='unknown' and not sections[section] then sections[section]=true;count=count+1 end
    end
   end
  end
  if count>=2 then active=active+1 end
 end
end
navComplete=navComplete and sampleTotal==(tonumber(redis.call('GET',KEYS[4])) or 0)
return {hitsComplete and clicks or -1,hitsComplete and users or -1,navComplete and active or -1,navComplete and events or -1}`;
module.exports={HIT,EVENT,SUMMARY,PERIOD};
