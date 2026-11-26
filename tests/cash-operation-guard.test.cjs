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
 const path=require.resolve('../lib/cash-operation-guard'),local=createRequire(path),module={exports:{}},calls=[],messages=[],store=new Map();
 vm.runInNewContext(fs.readFileSync(path,'utf8'),{module,require:id=>id==='./redis'?{pipeline:async cmds=>{calls.push(...cmds);return cmds.map(c=>{if(c[0]==='SET'){if(c.includes('NX')&&store.has(c[1]))return {result:null};store.set(c[1],c[2]);return {result:'OK'};}return {result:c[0]==='EVAL'?(typeof result==='function'?result():result):[]};});}}:id==='./telegram-group-policy'?{guardedFetch:async(url,options)=>{messages.push(JSON.parse(options.body));return {ok:true,json:async()=>({ok:true})};}}:local(id),process:{env:{TELEGRAM_BOT_TOKEN:'fixture'}},AbortSignal,Set,Date});
 return {api:module.exports,calls,messages};
}
test('only a trusted positive raffle prize bypasses the guard; returns and forged strings do not',async()=>{
 const f=fixture();const input={operationId:'o',userId:'1',chips:200};
 await f.api.check({...input,exemption:f.api.RAFFLE_AWARD});assert.equal(f.calls.length,0);
 for(const patch of [{exemption:'confirmed-raffle-award'},{exemption:f.api.RAFFLE_AWARD,chips:-200}])await assert.rejects(f.api.check({...input,...patch}),e=>e.code==='CASH_APPROVAL_REQUIRED');
 assert.ok(f.messages.every(m=>String(m.chat_id)==='388008256'));
});
test('only the internal return token marks a negative change as a raffle return',async()=>{
 const f=fixture('allowed'),input={action:'change',operationId:'refund',userId:'1',chips:-200};
 for(const [patch,expected] of [
  [{exemption:f.api.RAFFLE_RETURN},'raffle-return'],
  [{exemption:'confirmed-raffle-return'},''],
  [{exemption:f.api.RAFFLE_RETURN,chips:200},''],
  [{exemption:f.api.RAFFLE_RETURN,action:'agentTransfer'},'']
 ]){
  await f.api.check({...input,...patch});
  assert.equal(f.calls.at(-1).at(-1),expected);
 }
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
test('a blocked period sends one notification without a five-minute expiry, even for repeated attempts',async()=>{
 let first=true;const f=fixture(()=>{if(first){first=false;return 'triggered';}return 'pending';});
 for(let i=0;i<4;i++)await assert.rejects(f.api.check({operationId:'blocked-'+i,userId:'1',chips:-100}),e=>e.code==='CASH_APPROVAL_REQUIRED');
 assert.equal(f.messages.length,1);assert.match(f.messages[0].text,/достигнут порог 7 операций за 90 секунд/);
 const notice=f.calls.find(c=>c[0]==='SET'&&c[1].endsWith('block-notice:v2'));assert.ok(notice);assert.ok(!notice.includes('EX'));
});
test('a pre-existing block reports the old pause instead of claiming the threshold was reached again',async()=>{
 const f=fixture('pending');await assert.rejects(f.api.check({operationId:'old-block',userId:'1',chips:-100}),e=>e.code==='CASH_APPROVAL_REQUIRED');
 assert.match(f.messages[0].text,/после предыдущего срабатывания/);assert.doesNotMatch(f.messages[0].text,/достигнут порог/);
});
