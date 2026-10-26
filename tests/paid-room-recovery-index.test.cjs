const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const {lua,lauxlib,lualib,to_luastring,to_jsstring}=require('fengari');
test('escrow journal atomically indexes the host room before any wallet operation',async()=>{
 let options,row;
 const context={module:{exports:{}},require:name=>name==='node:crypto'?require(name):name==='./redis'?{pipeline:async rows=>{row=rows[0];return [{result:1}];}}:name==='./board-games-room'?()=>({}):name==='./billiards-wagers'?o=>(options=o,{}):name==='./game-connection-protection'?{presence:()=>({})}:null,process,Date,JSON,Math,Number,Error};
 vm.runInNewContext(fs.readFileSync('lib/board-games-service.js','utf8'),context);
 await options.store.put({id:'ABCDEFGHJK',owner:'host',status:'funding_host',expires:Date.now()+7200000},'lock-token');
 const [,script,count,...args]=row,keys=args.slice(0,count),values=args.slice(count);assert.equal(count,5);
 assert.equal(keys[4],'poker_app:active-game:board-games:host');
 const literal=v=>JSON.stringify(String(v));
 for(const locked of [true,false]){
 const L=lauxlib.luaL_newstate();lualib.luaL_openlibs(L);
 const code=`KEYS={${keys.map(literal)}} ARGV={${values.map(literal)}}
 local saved={} redis={call=function(op,key,value) if op=='GET' then return ${locked?"'lock-token'":"'wrong-lock'"} end if op=='SET' then saved[key]=value end return 1 end}
 local function persist() ${script} end
 local result=persist()
 assert(result==${locked?1:0})
 ${locked?"assert(saved[KEYS[2]]==ARGV[2]);assert(saved[KEYS[5]]=='ABCDEFGHJK')":"assert(next(saved)==nil)"}`;
 const result=lauxlib.luaL_dostring(L,to_luastring(code));assert.equal(result,lua.LUA_OK,result?to_jsstring(lua.lua_tostring(L,-1)):'');lua.lua_close(L);
 }
});
