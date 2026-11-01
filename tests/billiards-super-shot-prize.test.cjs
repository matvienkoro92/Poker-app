'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),{create}=require('../lib/billiards-super-shot-prize'),activity=require('../lib/review-activity');
function fixture(){
 const values=new Map(),payments=new Map(),trophies=new Map(),locks=new Set();let failure='',recipient='123456',payCalls=0;
 const commands=async rows=>rows.map(([op,key,value,...args])=>{if(op==='GET')return values.get(key)||null;if(op==='HSET'){values.set(key+':'+value,args[0]);return 1;}if(op==='SET'){if(args.includes('NX')&&values.has(key))return null;values.set(key,value);return 'OK';}throw Error(op);});
 const grant=create({commands,bound:async()=>recipient,now:()=>12345,
  pay:async input=>{payCalls++;assert.equal(input.chips,300);const old=payments.get(input.idempotencyKey);if(old)assert.equal(input.userId,old.userId);else payments.set(input.idempotencyKey,input);if(failure==='payment'){failure='';throw Error('lost payment response');}return {operation:{status:'completed'}};},
  activity:{...activity,readState:async id=>activity.normalizeState(JSON.parse(values.get(activity.stateKey(id))||'{}'))},
  acquire:async key=>{if(locks.has(key))return null;locks.add(key);return {key,value:'lock'};},release:async l=>locks.delete(l.key),
  write:async(rows,opts)=>{assert.ok(opts.locks.every(l=>locks.has(l.key)));assert.ok(opts.values.every(g=>(values.get(g.key)||'')===g.value));if(failure==='before-spins'){failure='';throw Error('offline');}await commands(rows);if(failure==='after-spins'){failure='';throw Error('lost spins response');}},
  trophy:async input=>{if(!trophies.has(input.sourceId))trophies.set(input.sourceId,input);if(failure==='trophy'){failure='';throw Error('lost trophy response');}return {wins:trophies.size,tokens:trophies.size,firstWin:{at:12345,number:1}};}
 });
 return {grant,values,payments,trophies,locks,fail:x=>failure=x,bind:x=>recipient=x,payCalls:()=>payCalls,spins:()=>JSON.parse(values.get(activity.stateKey('ID123456'))||'{}').extraSpins||0};
}
const input={userId:'ID123456',sourceId:'ABCDEFGHJK:1:1'};
for(const stage of ['payment','before-spins','after-spins','trophy'])test('all reward legs recover exactly once after '+stage,async()=>{
 const f=fixture();f.fail(stage);await assert.rejects(f.grant(input));f.bind('654321');const result=await f.grant(input);
 assert.equal(result.cash,300);assert.equal(result.spins,5);assert.equal(result.poker21Id,'123456');assert.equal(result.wins,1);assert.equal(f.payments.size,1);assert.equal(f.spins(),5);assert.equal(f.trophies.size,1);assert.equal(f.locks.size,0);
 const calls=f.payCalls();assert.deepEqual(await f.grant(input),result);assert.equal(f.payCalls(),calls);
});
test('missing binding keeps the successful shot claimable and gives no fake credit',async()=>{
 const f=fixture();f.bind('');await assert.rejects(f.grant(input),/Привяжите/);assert.equal(f.payments.size,0);assert.equal(f.spins(),0);assert.equal(f.trophies.size,0);f.bind('123456');await f.grant(input);assert.equal(f.spins(),5);
});
test('different successful shots each earn 300 RUB and five spendable spins',async()=>{const f=fixture();await f.grant(input);await f.grant({...input,sourceId:'ABCDEFGHJK:2:1'});assert.equal(f.payments.size,2);assert.equal(f.spins(),10);assert.equal(f.trophies.size,2);});
test('busy spin account preserves the cash receipt and resumes without duplicate payment',async()=>{
 const f=fixture();f.locks.add(activity.lockKey(input.userId));await assert.rejects(f.grant(input),/Крутки/);assert.equal(f.payments.size,1);assert.equal(f.spins(),0);f.locks.clear();await f.grant(input);assert.equal(f.payments.size,1);assert.equal(f.spins(),5);
});
