'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),R=require('../lib/billiards-super-shot-rewards');
const {lua,lauxlib,lualib,to_luastring,to_jsstring}=require('fengari');
test('actual reward transaction grants once per event and shop spends tokens once',()=>{
 const L=lauxlib.luaL_newstate();lualib.luaL_openlibs(L);const code=`
 local hashes,json,n={},{},0
 local function copy(v) if type(v)~='table' then return v end local out={} for k,x in pairs(v) do out[k]=copy(x) end return out end
 cjson={encode=function(v) n=n+1 local id='json'..n json[id]=copy(v) return id end,decode=function(v) return copy(json[v]) end}
 redis={call=function(cmd,key,field,value) hashes[key]=hashes[key] or {} if cmd=='HGET' then return hashes[key][field] elseif cmd=='HSET' then hashes[key][field]=value return 1 end error(cmd) end}
 KEYS={'progress','receipts'};ARGV={'ID123456','event1'}
 local grant=assert(load(${JSON.stringify(R.GRANT)}))
 local first=cjson.decode(grant());assert(first.wins==1 and first.tokens==1)
 assert(cjson.decode(grant()).wins==1)
 for i=2,25 do ARGV[2]='event'..i;grant() end
 local p=cjson.decode(hashes.progress.ID123456);assert(p.wins==25 and p.tokens==25)
 KEYS={'progress'};ARGV={'ID123456'};local buy=assert(load(${JSON.stringify(R.BUY)}))
 p=cjson.decode(buy());assert(p.tokens==22 and p.effects[1]=='master-spark')
 assert(cjson.decode(buy()).tokens==22)
 ARGV={'ID654321'};assert(buy()=='insufficient')
 `;
 try{const result=lauxlib.luaL_dostring(L,to_luastring(code));assert.equal(result,lua.LUA_OK,result?to_jsstring(lua.lua_tostring(L,-1)):'');}finally{lua.lua_close(L);}
});
test('cue unlock thresholds and ownership cannot be bypassed by hero level',()=>{
 const cues=require('../app-billiards-cues'),clean=require('../lib/billiards-equipment').cleanEquipment;
 for(const [wins,ids]of [[0,[]],[1,['decisive']],[9,['decisive']],[10,['decisive','decisive-gold']],[25,['decisive','decisive-gold','decisive-named']]]){
  assert.deepEqual(R.normalize({wins,tokens:wins}).unlockedCues,ids);
  for(const id of ['decisive','decisive-gold','decisive-named'])assert.equal(cues.available(id,100,wins).id,ids.includes(id)?id:'maple');
 }
 assert.equal(clean({cue:'decisive-named'},100).cue,'maple');assert.equal(clean({cue:'decisive-named'},1,{wins:25}).cue,'decisive-named');
 assert.equal(clean({cueEffect:'master-spark'},100).cueEffect,undefined);assert.equal(clean({},1,{effects:['master-spark']}).cueEffect,'master-spark');
});
test('trophy cue and effect use the validated host snapshot without unlocking them for guests',async()=>{
 const f=require('./helpers/billiards-wager-fixture.cjs')({profiles:{m1:{level:1,superShot:{wins:25,effects:['master-spark']}},m2:{level:100,superShot:{wins:0,effects:[]}}}});
 const h=await f.service.call('m1',{action:'create',discipline:'pyramid',equipment:{cue:'decisive-named'}});
 assert.equal(h.equipment.cue,'decisive-named');assert.equal(h.equipment.cueEffect,'master-spark');
 const g=await f.call('m2','join',h.roomId,{equipment:{cue:'maple'}});assert.deepEqual(g.equipment,h.equipment);
 const v=await f.call('viewer','watch',h.roomId);assert.deepEqual(v.equipment,h.equipment);
 const own=await f.service.call('m2',{action:'create',discipline:'pyramid',equipment:{cue:'decisive-named',cueEffect:'master-spark'}});assert.equal(own.equipment.cue,'maple');assert.equal(own.equipment.cueEffect,undefined);
});
