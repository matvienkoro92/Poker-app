'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(require.resolve('../lib/api-handlers/pokerplus-chips'),'utf8');
const validation=source.slice(source.indexOf('function requestedChips('),source.indexOf('async function requireExpectedGroupMember'));
const context={MAX_ABS_CHIPS:1000};vm.createContext(context);vm.runInContext(validation,context);
test('video-table allowance admits only a positive 2000 prize and retains ordinary operation limits',()=>{
  assert.equal(context.requestedChips(1000),1000);
  assert.throws(()=>context.requestedChips(2000),/per-operation limit/);
  assert.equal(context.requestedChips(2000,{videoTableRafflePrize:true}),2000);
  for(const amount of [-2000,2001,3000,1500])assert.throws(()=>context.requestedChips(amount,{videoTableRafflePrize:true}),/per-operation limit/);
  for(const flag of [undefined,false,'true',1])assert.throws(()=>context.requestedChips(2000,{videoTableRafflePrize:flag}),/per-operation limit/);
});
function paymentFixture(){
  const records=new Map(),calls=[];
  const redis={isConfigured:()=>true,pipeline:async commands=>commands.map(([op,key,value,...args])=>{
    if(op==='GET')return{result:records.get(key)||null};
    if(op==='SET'){if(args.includes('NX')&&records.has(key))return{result:null};records.set(key,value);return{result:'OK'};}
    if(op==='LPUSH'||op==='LTRIM')return{result:1};throw Error(op);
  })};
  const poker={hasPokerPlusOperatorConfig:()=>true,getGroupMemberData:async()=>({groupId:'test-club',nickname:'Player'}),changeGroupMemberChips:async input=>{calls.push(input);return input;}};
  const apiAuth={setCors(){},parseBody:req=>req.body,authRequired:()=>({ok:true,memberId:'admin'})};
  const mod={exports:{}};
  vm.runInNewContext(source,{module:mod,process:{env:{POKERPLUS_CHIPS_MAX_ABS:'1000',POKERPLUS_GROUP_ID:'test-club'}},console,require:name=>name==='../redis'?redis:name==='../pokerplus'?poker:name==='../api-auth'?apiAuth:require(name)});
  return{handler:mod.exports,calls};
}
test('video-table payout completes once and repeated checkmark replays without a second transfer',async()=>{
  const h=paymentFixture();const input={userId:'778130',chips:2000,videoTableRafflePrize:true,idempotencyKey:'raffle:sunday:winner:initial_2:cash-prize'};
  const first=await h.handler.processDirectChange(input);assert.equal(first.operation.status,'completed');assert.equal(first.idempotentReplay,false);
  const again=await h.handler.processDirectChange(input);assert.equal(again.idempotentReplay,true);assert.equal(h.calls.length,1);assert.equal(h.calls[0].chips,2000);
});
test('HTTP chip-change endpoint rejects a client-supplied allowance without transferring funds',async()=>{
  const h=paymentFixture();let status,payload;const res={status(value){status=value;return this;},json(value){payload=value;return this;}};
  await h.handler({method:'POST',headers:{},body:{action:'change',userId:'778130',chips:2000,videoTableRafflePrize:true,idempotencyKey:'client-key'}},res);
  assert.equal(status,400);assert.match(payload.error,/per-operation limit/);assert.equal(h.calls.length,0);
});
