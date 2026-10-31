'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {create,SCRIPT}=require('../lib/game-viewers');
test('viewer identity is server resolved; regular polls do not load profiles and names are opt-in',async()=>{
 const calls=[];let resolves=0;
 const observe=create({now:()=>1000,resolveViewer:async()=>{resolves++;return {accountId:'ID123456',name:'Настоящий ник'};},commands:async rows=>{calls.push(rows[0]);return [JSON.stringify({count:1,names:['Настоящий ник']})];}});
 const args={family:'board-games',member:'viewer',body:{action:'watch',roomId:'ABCDEFGHJK'},result:{roomId:'ABCDEFGHJK',revision:2}};
 assert.deepEqual(await observe(args),{count:1});assert.equal(resolves,0);
 const result=await observe({...args,body:{...args.body,viewerSession:'session_1234567890',viewerPresence:'active',includeViewers:true,name:'Подмена',accountId:'fake'}});
 assert.equal(resolves,1);assert.deepEqual(result,{count:1,names:['Настоящий ник']});assert.ok(calls.at(-1).includes('ID123456:session_1234567890'));assert.ok(!calls.at(-1).includes('Подмена'));
 assert.equal(await observe({...args,body:{action:'move'}}),null);
});
const harness=`
local strings,hashes,zsets,expires={},{},{},{};local clock=0;local writes=0
local function copy(v) if type(v)~='table' then return v end local out={} for k,x in pairs(v) do out[k]=copy(x) end return out end
local json,serial={},0
cjson={encode=function(v) serial=serial+1;local key='json'..serial;json[key]=copy(v);return key end,decode=function(v) assert(json[v],'bad JSON');return copy(json[v]) end}
redis={call=function(cmd,k,...)
 local a={...}
 if cmd=='GET' then if expires[k] and clock>=expires[k] then strings[k]=nil end return strings[k] or false
 elseif cmd=='SET' then strings[k]=a[1];if a[2]=='EX' then expires[k]=clock+tonumber(a[3])*1000 end;return 'OK'
 elseif cmd=='EXPIRE' then return 1
 elseif cmd=='HGET' then return hashes[k] and hashes[k][a[1]] or false
 elseif cmd=='HSET' then hashes[k]=hashes[k] or {};hashes[k][a[1]]=a[2];return 1
 elseif cmd=='HDEL' then if hashes[k] then hashes[k][a[1]]=nil end;return 1
 elseif cmd=='ZSCORE' then return zsets[k] and zsets[k][a[1]] or false
 elseif cmd=='ZADD' then zsets[k]=zsets[k] or {};zsets[k][a[2]]=tonumber(a[1]);writes=writes+1;return 1
 elseif cmd=='ZREM' then if zsets[k] then zsets[k][a[1]]=nil end;return 1
 elseif cmd=='ZRANGE' or cmd=='ZRANGEBYSCORE' then local out={} for id,score in pairs(zsets[k] or {}) do if cmd=='ZRANGE' or score<=tonumber(a[2]) then table.insert(out,id) end end;table.sort(out);return out
 else error('Unsupported '..cmd) end
end}
local room={revision=1,players={'host','guest'},playerProfiles={{accountId='IDHOST'},{accountId='IDGUEST'}}}
strings.room=cjson.encode(room);local original=strings.room
local script=${JSON.stringify(SCRIPT)}
local function observe(time,session,account,name,member,touch,revision)
 clock=time;KEYS={'room','sessions','names','summary'};ARGV={tostring(time),session~='' and account..':'..session or '',account,name,member,tostring(revision or 1),touch or ''}
 return cjson.decode(assert(load(script))())
end
`;
function run(code){const {lua,lauxlib,lualib,to_luastring,to_jsstring}=require('fengari'),L=lauxlib.luaL_newstate();lualib.luaL_openlibs(L);try{const result=lauxlib.luaL_dostring(L,to_luastring(harness+code));assert.equal(result,lua.LUA_OK,result?to_jsstring(lua.lua_tostring(L,-1)):'');}finally{lua.lua_close(L);}}
test('actual Redis script deduplicates tabs, excludes players and keeps game state untouched',()=>run(`
 assert(observe(1000,'tab1','A','Alice','viewer','active').count==1)
 assert(observe(1001,'tab2','A','Alice','alias','active').count==1)
 assert(observe(1002,'tab3','B','Bob','other','active').count==2)
 assert(observe(1003,'tab4','IDHOST','Host','host','active').count==2)
 assert(observe(1004,'tab5','IDGUEST','Guest','alias','active').count==2)
 assert(strings.room==original)
`));
test('hidden tab leaves without removing another tab; stale viewers disappear and writes are throttled',()=>run(`
 observe(1000,'one','A','Alice','viewer','active');observe(1001,'two','A','Alice','viewer','active')
 local before=writes;observe(2000,'two','A','Alice','viewer','active');assert(writes==before)
 assert(observe(2100,'one','A','Alice','viewer','leave').count==1)
 assert(observe(22000,'two','A','Alice','viewer','active').count==1)
 assert(observe(62001,'','','','','').count==0)
`));
test('cache reads avoid presence writes, and joining players disappear from the audience',()=>run(`
 observe(1000,'one','A','Alice','viewer','active');local before=writes
 assert(observe(1500,'','','','','').count==1);assert(writes==before)
 room.playerProfiles[2].accountId='A';room.revision=2;strings.room=cjson.encode(room)
 assert(observe(1600,'','','','','',2).count==0);assert(writes==before)
`));
