'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const entries=new Map();let fail=false;
require.cache[require.resolve('../lib/redis')]={exports:{pipeline:async commands=>{
 if(fail)throw Error('offline');
 return commands.map(([op,key,value,,ttl])=>{if(op==='SET'){assert.equal(ttl,'900');entries.set(key,value);return {result:'OK'};}return {result:entries.get(key)||null};});
}}};
const store=require('../lib/tracking-link-report-store');
test('report preserves all pages, history, unknown statuses and exact payment amounts across tab changes',async()=>{
 const rows=Array.from({length:103},(_,i)=>({actor:'ID'+i,events:[{id:'event'+i}],steps:{bot:null,playersChat:false,depositAmount:120.5},welcomeBonus:{steps:['register']}}));
 const token=await store.save('campaign-a',rows);
 rows[0].steps.depositAmount=999;
 const first=await store.read('campaign-a',token);
 assert.equal(first.length,103);assert.equal(first[0].steps.depositAmount,120.5);
 assert.equal(first[0].steps.bot,null);assert.equal(first[0].steps.playersChat,false);
 first[0].welcomeBonus.steps.push('chat');
 assert.deepEqual((await store.read('campaign-a',token))[0].welcomeBonus.steps,['register']);
 assert.equal(await store.read('campaign-b',token),null);
 entries.clear();assert.equal(await store.read('campaign-a',token),null);
 assert.equal(await store.read('campaign-a','invalid'),null);
});
test('storage failure never advertises a saved report',async()=>{fail=true;try{assert.equal(await store.save('campaign-a',[]),null);}finally{fail=false;}});
