const test=require('node:test'),assert=require('node:assert/strict'),{lua,lauxlib,lualib,to_luastring,to_jsstring}=require('fengari'),scripts=require('../lib/tracking-link-counters');
// Execute the actual production Lua, with Redis commands backed by isolated in-memory tables.
const harness=`
local hashes,sets,lists,ints={},{},{},{}
local function copy(v) if type(v)~='table' then return v end local out={} for k,x in pairs(v) do out[k]=copy(x) end return out end
local json,n={},0
cjson={encode=function(v) n=n+1;local key='json'..n;json[key]=copy(v);return key end,decode=function(v) assert(json[v],'invalid JSON');return copy(json[v]) end}
redis={call=function(cmd,k,...)
 local a={...}
 if cmd=='HEXISTS' then return hashes[k] and hashes[k][a[1]] and 1 or 0
 elseif cmd=='HGET' then return hashes[k] and hashes[k][a[1]] or false
 elseif cmd=='HSET' then hashes[k]=hashes[k] or {};hashes[k][a[1]]=a[2];return 1
 elseif cmd=='HINCRBY' then hashes[k]=hashes[k] or {};hashes[k][a[1]]=(tonumber(hashes[k][a[1]]) or 0)+tonumber(a[2]);return hashes[k][a[1]]
 elseif cmd=='SADD' then sets[k]=sets[k] or {};local added=sets[k][a[1]] and 0 or 1;sets[k][a[1]]=true;return added
 elseif cmd=='SISMEMBER' then return sets[k] and sets[k][a[1]] and 1 or 0
 elseif cmd=='SCARD' then local n=0;for _ in pairs(sets[k] or {}) do n=n+1 end return n
 elseif cmd=='SINTER' then local out={};for id in pairs(sets[k] or {}) do if sets[a[1]] and sets[a[1]][id] then table.insert(out,id) end end return out
 elseif cmd=='LPUSH' then lists[k]=lists[k] or {};table.insert(lists[k],1,a[1]);return #lists[k]
 elseif cmd=='LTRIM' then local out={};for i=a[1]+1,math.min(a[2]+1,#(lists[k] or {})) do table.insert(out,lists[k][i]) end lists[k]=out;return 'OK'
 elseif cmd=='INCR' then ints[k]=(ints[k] or 0)+1;return ints[k]
 else error('Unsupported Redis command '..cmd) end
end}
local function execute(script,keys,args) KEYS=keys;ARGV=args;return assert(load(script))() end
local HIT,EVENT,SUMMARY=${JSON.stringify(scripts.HIT)},${JSON.stringify(scripts.EVENT)},${JSON.stringify(scripts.SUMMARY)}
local hitKeys={'meta','totals','unique','users','log'}
local eventKeys={'meta','users','events','active','by','details'}
local summaryKeys={'users','active','details'}
hashes.meta={abc='metadata'}
`;
function run(code){const L=lauxlib.luaL_newstate();lualib.luaL_openlibs(L);try{const status=lauxlib.luaL_dostring(L,to_luastring(harness+code));assert.equal(status,lua.LUA_OK,status===lua.LUA_OK?'':to_jsstring(lua.lua_tostring(L,-1)));}finally{lua.lua_close(L);}}
test('historical active identities outside registered visitors are excluded with their events; stale unique cache is ignored',()=>run(`
for i=1,32 do redis.call('SADD','users','u'..i);redis.call('SADD','active','u'..i);redis.call('HSET','details','u'..i,cjson.encode({total=i==1 and 184 or 2,counts={['view:home']=1,['view:rating']=1}})) end
for i=33,34 do redis.call('SADD','active','u'..i);redis.call('HSET','details','u'..i,cjson.encode({total=100})) end
hashes.unique={abc=7}
local s=execute(SUMMARY,summaryKeys,{})
assert(s[1]==32 and s[2]==32 and s[3]==246)
`));
test('unique count is repaired from visitor membership while repeated hits retain one visitor',()=>run(`
assert(execute(HIT,hitKeys,{'abc','u1','entry'})==1)
hashes.unique.abc=0
assert(execute(HIT,hitKeys,{'abc','u1','entry2'})==1)
assert(hashes.totals.abc==2 and hashes.unique.abc==1)
assert(execute(HIT,hitKeys,{'abc','u2','entry3'})==1)
assert(hashes.totals.abc==3 and hashes.unique.abc==2)
`));
test('unregistered activity is rejected; repeated registered actions update all counters and cap samples',()=>run(`
assert(execute(EVENT,eventKeys,{'abc','unknown','open:home','now',''})==-1)
assert(ints.events==nil and sets.active==nil)
execute(HIT,hitKeys,{'abc','u1','entry'})
for i=1,100 do assert(execute(EVENT,eventKeys,{'abc','u1','open:home','now','detail'})==1) end
local s=execute(SUMMARY,summaryKeys,{})
assert(s[1]==1 and s[2]==0 and s[3]==100)
local d=cjson.decode(hashes.details.u1)
assert(d.counts['open:home']==100 and #d.samples==25 and d.lastAt=='now')
assert(ints.events==100 and hashes.by['open:home']==100)
`));
test('deleted links and missing/corrupt activity cannot manufacture visitors or actions',()=>run(`
hashes.meta.abc=nil
assert(execute(HIT,hitKeys,{'abc','u1','entry'})==0)
assert(execute(EVENT,eventKeys,{'abc','u1','open:home','now',''})==0)
redis.call('SADD','users','u1');redis.call('SADD','active','u1');redis.call('HSET','details','u1','bad-json')
local s=execute(SUMMARY,summaryKeys,{})
assert(s[1]==1 and s[2]==0 and s[3]==0)
`));

test('active visitors must open two distinct sections; landing and click events cannot count as a second section',()=>run(`
execute(HIT,hitKeys,{'abc','u1','entry'})
for _,action in ipairs({'landing:home','open:home','view:home','view:home','open:rating','deep:vl_reviews_nikolay','view:unknown'}) do
 execute(EVENT,eventKeys,{'abc','u1',action,'now',''})
end
local s=execute(SUMMARY,summaryKeys,{})
assert(s[1]==1 and s[2]==0 and s[3]==7)
execute(EVENT,eventKeys,{'abc','u1','view:rating','now',''})
s=execute(SUMMARY,summaryKeys,{})
assert(s[1]==1 and s[2]==1 and s[3]==8)
execute(HIT,hitKeys,{'abc','u2','entry'})
execute(EVENT,eventKeys,{'abc','u2','view:daily-poker','now',''})
execute(EVENT,eventKeys,{'abc','u2','view:daily_poker','now',''})
s=execute(SUMMARY,summaryKeys,{})
assert(s[1]==2 and s[2]==1 and s[3]==10)
execute(EVENT,eventKeys,{'abc','u2','view:profile','now',''})
s=execute(SUMMARY,summaryKeys,{})
assert(s[2]==2 and s[3]==11)
`));
