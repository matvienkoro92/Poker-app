const test=require('node:test'),assert=require('node:assert/strict'),{lua,lauxlib,lualib,to_luastring,to_jsstring}=require('fengari'),stats=require('../lib/board-games-stats');
const harness=`
local strings,hashes,zsets,lists={},{},{},{}
local function copy(v) if type(v)~='table' then return v end local t={} for k,x in pairs(v) do t[k]=copy(x) end return t end
local json,n={},0
cjson={encode=function(v) n=n+1 local key='json'..n json[key]=copy(v) return key end,decode=function(v) assert(json[v],'invalid JSON') return copy(json[v]) end}
redis={call=function(cmd,k,...)
 local a={...}
 if cmd=='GET' then return strings[k] or false
 elseif cmd=='SET' then strings[k]=a[1] return 'OK'
 elseif cmd=='HGET' then return hashes[k] and hashes[k][a[1]] or false
 elseif cmd=='HSETNX' then hashes[k]=hashes[k] or {} if hashes[k][a[1]] then return 0 end hashes[k][a[1]]=a[2] return 1
 elseif cmd=='HSET' then hashes[k]=hashes[k] or {} hashes[k][a[1]]=a[2] return 1
 elseif cmd=='ZREM' then zsets[k]=zsets[k] or {} zsets[k][a[1]]=nil return 1
 elseif cmd=='ZADD' then zsets[k]=zsets[k] or {} zsets[k][a[2]]=a[1] return 1
 elseif cmd=='LPUSH' then lists[k]=lists[k] or {} table.insert(lists[k],1,a[1]) return #lists[k]
 elseif cmd=='LTRIM' then while #lists[k]>a[2]+1 do table.remove(lists[k]) end return 'OK'
 else error('Unsupported '..cmd) end
end}
local script=${JSON.stringify(stats.CAS)}
local function run(expected,room) KEYS={'room'} ARGV={expected,cjson.encode(room),'stats:',12345} return assert(load(script))() end
local room={id='ABCDEFGHJK',revision=1,players={'host','guest'},playerProfiles={{name='Первый',accountId='ID123456'},{name='Второй',accountId='ID654321'}},match={number=1,round=1},state={winner=0,discipline='chess',scores={8,3}}}
strings.room=cjson.encode({revision=0})
local function player(d,id) return cjson.decode(hashes['stats:'..d..':free:players'][id]) end
`;
function run(code){const L=lauxlib.luaL_newstate();lualib.luaL_openlibs(L);try{const status=lauxlib.luaL_dostring(L,to_luastring(harness+code));assert.equal(status,lua.LUA_OK,status===lua.LUA_OK?'':to_jsstring(lua.lua_tostring(L,-1)));}finally{lua.lua_close(L);}}
test('actual Redis CAS counts each finished rack once and rejects stale room revisions',()=>run(`
assert(run(9,room)==0);assert(hashes['stats:chess:free:players']==nil)
assert(run(0,room)==1);assert(player('chess','ID123456').wins==1);assert(player('chess','ID654321').losses==1)
assert(run(0,room)==0);room.revision=2;assert(run(1,room)==1);assert(player('chess','ID123456').wins==1);assert(#lists['stats:chess:free:history:ID123456']==1)
room.match.round=2;room.revision=3;room.state.winner=1;room.state.endReason='resign';assert(run(2,room)==1)
assert(player('chess','ID123456').losses==1);assert(player('chess','ID654321').wins==1)
local count=0 for _ in pairs(zsets['stats:chess:free:ranking']) do count=count+1 end assert(count==2)
`));
test('draws, new series and disciplines are independent; unfinished games are excluded',()=>run(`
room.state.winner=nil;assert(run(0,room)==1);assert(hashes['stats:chess:free:players']==nil)
room.revision=2;room.state.winner='draw';assert(run(1,room)==1);local p=player('chess','ID123456');assert(p.draws==1 and p.wins==0 and p.losses==0)
room.match.number=2;room.revision=3;room.state.winner=0;assert(run(2,room)==1);assert(player('chess','ID123456').wins==1)
room.state.discipline='short';room.revision=4;assert(run(3,room)==1);assert(player('short','ID123456').wins==1);assert(player('chess','ID123456').played==2)
`));
test('same canonical account is excluded and history stays bounded',()=>run(`
room.playerProfiles[2].accountId='ID123456';assert(run(0,room)==1);assert(hashes['stats:chess:free:players']==nil)
room.playerProfiles[2].accountId='ID654321'
for i=2,26 do room.revision=i;room.match.round=i;assert(run(i-1,room)==1) end
assert(#lists['stats:chess:free:history:ID123456']==20);assert(player('chess','ID123456').wins==25)
`));
test('ranking API returns public stats and separate personal rank/history without account IDs',async()=>{const calls=[];const value=JSON.stringify({name:'Первый',wins:5,losses:2,draws:1,rankMember:'999999999997:ID123456'});const result=await stats.read({migration:false,discipline:'chess',accountId:'ID123456',commands:async rows=>{calls.push(rows);return calls.length===1?[['999999999997:ID123456'],value,[]]:calls.length===2?[value]:[0];}});assert.equal(result.self.rank,1);assert.equal(result.self.winRate,63);assert.equal(result.ranking[0].self,true);assert.equal(JSON.stringify(result).includes('ID123456'),false);await assert.rejects(stats.read({discipline:'other'}),e=>e.status===400);});

test('paid and free results, ranking and histories are recorded independently in the Redis transaction',()=>run(`
assert(run(0,room)==1)
room.revision=2;room.match.round=2;room.wagered=true;room.state.winner=1;assert(run(1,room)==1)
assert(player('chess','ID123456').wins==1 and player('chess','ID123456').losses==0)
local paid=cjson.decode(hashes['stats:chess:paid:players']['ID123456']);assert(paid.wins==0 and paid.losses==1)
assert(#lists['stats:chess:free:history:ID123456']==1 and #lists['stats:chess:paid:history:ID123456']==1)
assert(cjson.decode(lists['stats:chess:paid:history:ID123456'][1]).mode=='paid')
room.revision=3;assert(run(2,room)==1);assert(cjson.decode(hashes['stats:chess:paid:players']['ID123456']).played==1)
`));

test('head-to-head totals survive bounded history, use opponent IDs and ignore duplicate room writes',()=>run(`
for i=1,26 do room.revision=i;room.match.round=i;room.state.winner=i%2;assert(run(i-1,room)==1) end
local key='stats:chess:free:rivals:ID123456'
local a=cjson.decode(hashes[key]['ID654321']);assert(a.wins==13 and a.losses==13 and a.draws==0)
local b=cjson.decode(hashes['stats:chess:free:rivals:ID654321']['ID123456']);assert(b.wins==13 and b.losses==13)
room.revision=27;assert(run(26,room)==1);a=cjson.decode(hashes[key]['ID654321']);assert(a.wins+a.losses==26)
room.match.round=27;room.revision=28;room.playerProfiles[2].accountId='ID777777';room.playerProfiles[2].name='Второй';room.state.winner='draw';assert(run(27,room)==1)
local other=cjson.decode(hashes[key]['ID777777']);assert(other.draws==1 and other.wins==0)
a=cjson.decode(hashes[key]['ID654321']);assert(a.wins+a.losses==26)
`));
