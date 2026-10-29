const test=require('node:test'),assert=require('node:assert/strict'),{lua,lauxlib,lualib,to_luastring,to_jsstring}=require('fengari');
test('matchmaking respects fixed colors, accepts random opponents and skips expired rooms',()=>{
 const L=lauxlib.luaL_newstate();lualib.luaL_openlibs(L);
 const code=`local lists={};redis={call=function(cmd,k,v) lists[k]=lists[k] or {};if cmd=='LPUSH' then table.insert(lists[k],1,v) elseif cmd=='RPOP' then return table.remove(lists[k]) or false elseif cmd~='EXPIRE' then error(cmd) end end}
 local function take(id,side,random,now) KEYS={'white','black'};ARGV={id,tostring(now or 1000),tostring(side),random and '1' or '0'};return assert(load(${JSON.stringify(require('../lib/chess-matchmaking-colors').TAKE)}))() end
 assert(take('AAAAAAAAAA',1,false)=='')
 assert(take('BBBBBBBBBB',1,false)=='')
 assert(take('CCCCCCCCCC',2,false)=='AAAAAAAAAA')
 assert(take('DDDDDDDDDD',2,false)=='BBBBBBBBBB')
 assert(take('EEEEEEEEEE',1,false)=='')
 assert(take('FFFFFFFFFF',1,true)=='EEEEEEEEEE')
 assert(take('GGGGGGGGGG',1,false)=='')
 assert(take('HHHHHHHHHH',2,false,200000)=='')`;
 try{const status=lauxlib.luaL_dostring(L,to_luastring(code));assert.equal(status,lua.LUA_OK,status===lua.LUA_OK?'':to_jsstring(lua.lua_tostring(L,-1)));}finally{lua.lua_close(L);}
});
