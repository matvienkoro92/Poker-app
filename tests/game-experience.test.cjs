'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),{lua,lauxlib,lualib,to_luastring,to_jsstring}=require('fengari'),xp=require('../lib/game-experience');
function room(stake=0,winner=0){return {id:'ABCDEFGHJK',gameXpVersion:1,gameXpActions:[2,3],gameXpStake:stake,wagered:stake>0,players:['a','b'],playerProfiles:[{accountId:'ID123456'},{accountId:'ID654321'}],match:{number:1,round:1},state:{winner,discipline:'chess'}};}
test('agreed XP table, draws earn no XP, original stake and one reward per round',()=>{
 for(const [stake,win,loss]of [[0,60,30],[100,200,100],[300,200,100],[499,200,100],[500,400,200],[1000,400,200]])for(const winner of [0,1,'draw']){const r=room(stake,winner);r.reservedStake=2000;xp.prepare(r);assert.deepEqual(r.gameExperience.perPlayer,[0,1].map(i=>winner==='draw'?0:winner===i?win:loss));assert.equal(r.gameExperience.granted,winner!=='draw');}
 for(const patch of [{gameXpVersion:undefined},{gameXpActions:[1,0]},{players:['a',null]},{state:{winner:0,discipline:'darts'}},{playerProfiles:[{accountId:'ID123456'},{accountId:'ID123456'}]}]){const r={...room(),...patch};xp.prepare(r);assert.ok(!r.gameExperience?.granted);}
 const r=room();xp.prepare(r);const original=r.gameExperience;r.state.winner=1;xp.prepare(r);assert.equal(r.gameExperience,original);r.match.round=2;xp.prepare(r);assert.notEqual(r.gameExperience,original);
});
function run(family,extra){const stats=require('../lib/'+family+'-stats'),source=fs.readFileSync(require.resolve('./'+family+'-stats.test.cjs'),'utf8');let harness=vm.runInNewContext(source.slice(source.indexOf('const harness='),source.indexOf('\nfunction run(code)'))+'harness',{stats,JSON});harness=harness.replace("elseif cmd=='HSET' then", "elseif cmd=='HINCRBY' then hashes[k]=hashes[k] or {} local value=(tonumber(hashes[k][a[1]]) or 0)+tonumber(a[2]);hashes[k][a[1]]=tostring(value);return value\n elseif cmd=='HSET' then");const L=lauxlib.luaL_newstate();lualib.luaL_openlibs(L);try{const code=lauxlib.luaL_dostring(L,to_luastring(harness+extra));assert.equal(code,lua.LUA_OK,code?to_jsstring(lua.lua_tostring(L,-1)):'');}finally{lua.lua_close(L);}}
for(const family of ['board-games','billiards'])test(family+': actual CAS awards XP atomically once, snapshots level-up and retains XP through refresh',()=>run(family,`
room.gameXpVersion=1
room.gameExperience={event='ABCDEFGHJK:1:1',granted=true,perPlayer={60,30}}
hashes['${xp.TOTALS}']={ID123456='2980'}
hashes['poker_app:pokerplus_profiles']={ID123456='{"nickname":"Player","totalCounter":{},"optional":null,"pair":[null,null]}'}
assert(run(0,room)==1)
assert(tonumber(hashes['${xp.TOTALS}'].ID123456)==3040)
assert(tonumber(hashes['${xp.TOTALS}'].ID654321)==30)
assert(strings.room==ARGV[2])
local saved={gameExperience=cjson.decode(hashes['${xp.RECEIPTS}']['${family}:ABCDEFGHJK:1:1'])}
assert(saved.gameExperience.progress[1].before.level==1)
assert(saved.gameExperience.progress[1].after.level==2)
assert(saved.gameExperience.progress[1].after.points==3040)
assert(string.find(hashes['poker_app:pokerplus_profiles'].ID123456,'"gameExperience":3040',1,true))
room.revision=2
assert(run(1,room)==1)
assert(tonumber(hashes['${xp.TOTALS}'].ID123456)==3040)
assert(run(1,room)==0)
KEYS={'poker_app:pokerplus_profiles','${xp.TOTALS}'};ARGV={'ID123456','{"nickname":"Refreshed","gameExperience":999999,"optional":null,"pair":[null,null]}' }
assert(assert(load(${JSON.stringify(xp.SAVE_PROFILE)}))()==3040)
assert(string.find(hashes['poker_app:pokerplus_profiles'].ID123456,'"optional":null',1,true))
assert(string.find(hashes['poker_app:pokerplus_profiles'].ID123456,'"pair":[null,null]',1,true))
assert(string.find(hashes['poker_app:pokerplus_profiles'].ID123456,'"gameExperience":3040',1,true))
`));
test('server level includes game XP without altering poker counters',()=>{const status=require('../lib/chat-profile-status').pokerProfileStatusFromCachedProfile({gameExperience:3000,totalCounter:{mttCount:1}},{pokerPlusLinked:false});assert.equal(status.points,3300);assert.equal(status.level,2);assert.equal(status.counters.breakdown.games,3000);});
for(const family of ['board-games','billiards'])test(family+': invalid second balance cannot partially grant XP to the first player',()=>run(family,`
room.gameXpVersion=1
room.gameExperience={event='ABCDEFGHJK:1:1',granted=true,perPlayer={60,30}}
hashes['${xp.TOTALS}']={ID123456='100',ID654321='invalid'}
local ok=pcall(function() run(0,room) end)
assert(not ok)
assert(hashes['${xp.TOTALS}'].ID123456=='100')
assert(hashes['poker_app:pokerplus_profiles']==nil)
assert(hashes['${xp.RECEIPTS}']==nil)
hashes['${xp.TOTALS}'].ID654321='0'
assert(run(0,room)==1)
assert(tonumber(hashes['${xp.TOTALS}'].ID123456)==160)
assert(tonumber(hashes['${xp.TOTALS}'].ID654321)==30)
`));
for(const family of ['board-games','billiards'])test(family+': drawn CAS never awards XP even with a stale positive reward',()=>run(family,`
room.gameXpVersion=1
room.state.winner='draw'
room.gameExperience={event='ABCDEFGHJK:1:1',granted=true,perPlayer={60,30}}
assert(run(0,room)==1)
assert(hashes['${xp.TOTALS}']==nil)
assert(hashes['poker_app:pokerplus_profiles']==nil)
assert(hashes['${xp.RECEIPTS}']==nil)
`));
