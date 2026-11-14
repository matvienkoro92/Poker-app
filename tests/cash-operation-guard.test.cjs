'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),{createRequire}=require('node:module');
const guard=require('../lib/cash-operation-guard');
test('financial fingerprint binds id, action, player, amount and agent',()=>{
 const base={operationId:'order',userId:'1',chips:200};const a=guard.descriptor(base);
 assert.equal(a.fingerprint,guard.descriptor({...base,chips:'200',reference:'updated note'}).fingerprint);
 for(const patch of [{chips:-200},{userId:'2'},{agentId:'3'}])assert.notEqual(a.fingerprint,guard.descriptor({...base,...patch}).fingerprint);
 assert.throws(()=>guard.descriptor({...base,operationId:''}));
});
function fixture(result='pending'){
 const path=require.resolve('../lib/cash-operation-guard'),local=createRequire(path),module={exports:{}},calls=[],messages=[];
 vm.runInNewContext(fs.readFileSync(path,'utf8'),{module,require:id=>id==='./redis'?{pipeline:async cmds=>{calls.push(...cmds);return cmds.map(c=>({result:c[0]==='EVAL'?result:c[0]==='SET'?'OK':[]}));}}:id==='./telegram-group-policy'?{guardedFetch:async(url,options)=>{messages.push(JSON.parse(options.body));return {ok:true,json:async()=>({ok:true})};}}:local(id),process:{env:{TELEGRAM_BOT_TOKEN:'fixture'}},AbortSignal,Set,Date});
 return {api:module.exports,calls,messages};
}
test('only a trusted positive raffle prize bypasses the guard; returns and forged strings do not',async()=>{
 const f=fixture();const input={operationId:'o',userId:'1',chips:200};
 await f.api.check({...input,exemption:f.api.RAFFLE_AWARD});assert.equal(f.calls.length,0);
 for(const patch of [{exemption:'confirmed-raffle-award'},{exemption:f.api.RAFFLE_AWARD,chips:-200}])await assert.rejects(f.api.check({...input,...patch}),e=>e.code==='CASH_APPROVAL_REQUIRED');
 assert.ok(f.messages.every(m=>String(m.chat_id)==='388008256'));
});
test('cash approval controls ignore managers and groups',async()=>{
 const f=fixture();for(const from of [2144406710,999]){
  assert.equal(await f.api.handle({callback_query:{id:'cb',data:'cash-guard:approve:123',from:{id:from},message:{chat:{id:from,type:'private'}}}}),true);
 }
 assert.equal(await f.api.handle({message:{text:'/cash_resume',from:{id:388008256},chat:{id:-100,type:'supergroup'}}}),true);
 assert.equal(f.calls.length,0);
 assert.ok(f.messages.every(m=>!m.chat_id));
});
test('storage failure fails closed',async()=>{
 const f=fixture('conflict');await assert.rejects(f.api.check({operationId:'o',userId:'1',chips:200}),e=>e.code==='CASH_GUARD_CONFLICT');
});
