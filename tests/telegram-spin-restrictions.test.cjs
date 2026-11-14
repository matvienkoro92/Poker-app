'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),{createRequire}=require('node:module');
test('compact spin status preserves permanent, timed and Poker21 identity restrictions',async()=>{
 for(const kind of ['none','app','participation','timed','identity']){
  const path=require.resolve('../lib/app-user-blocks'),local=createRequire(path),module={exports:{}};let calls=0;
  const pipeline=async cmds=>{calls++;return cmds.map(([op,key])=>({result:op==='HGET'?'ID123456':op==='GET'?(kind==='timed'?String(Date.now()+60000):null):op==='SISMEMBER'?(kind==='app'&&key==='poker_app:app_blocked_users'||kind==='participation'&&key==='poker_app:participation_blocked:daily-poker'?1:0):key==='poker_app:pokerplus_user_ids'?['337922']:kind==='identity'&&key==='poker_app:participation_blocked_identities:v1:daily-poker'?['blocked']:[null]}));};
  vm.runInNewContext(fs.readFileSync(path,'utf8'),{module,require:id=>id==='./redis'?{pipeline}:local(id),Date,Set});
  assert.equal(await module.exports.participationAccessSnapshot('tg_42',{id:42,p21Id:'337922'},'daily-poker','ID123456'),kind!=='none');
  assert.ok(calls<=3);
 }
});
