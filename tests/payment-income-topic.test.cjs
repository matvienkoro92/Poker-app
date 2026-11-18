'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm'),fs=require('node:fs');
function fixture(){
 const calls=[];let fail=false;
 const redis=require('./helpers/payment-redis.cjs')();
 const ctx={module:{exports:{}},require:id=>id==='./redis'?redis:id==='./telegram-support-config'?{config:async()=>({enabled:true,chatId:'-100123'})}:id==='./telegram-group-policy'?{guardedFetch:async(url,options)=>{
  const body=JSON.parse(options.body),method=url.split('/').at(-1);calls.push({method,body});
  if((typeof fail==='function'?fail(body):fail)&&method==='sendMessage')throw Error('offline');
  return {ok:true,json:async()=>({ok:true,result:method==='createForumTopic'?{message_thread_id:77}:{message_id:1}})};
 }}:require(id.startsWith('./')?'../lib/'+id.slice(2):id),process:{env:{TELEGRAM_BOT_TOKEN:'test'}},Intl,AbortSignal,console:{error(){}}};
 vm.runInNewContext(fs.readFileSync('lib/payment-income-topic.js','utf8'),ctx);
 return {api:ctx.module.exports,calls,redis,get pending(){return redis.hashes.get('poker_app:telegram:income:pending')||new Map()},offline:value=>{fail=value;}};
}
const payment={id:'42',providerId:'robokassa',amount:110000,status:'confirmed'};
test('creates one income topic, isolates providers and suppresses duplicate deliveries',async()=>{
 const f=fixture();await f.api.notify(payment);await f.api.notify(payment);await f.api.notify({...payment,providerId:'prodamus'});
 assert.equal(f.calls.filter(c=>c.method==='createForumTopic').length,1);
 const sent=f.calls.filter(c=>c.method==='sendMessage');assert.equal(sent.length,2);
 assert.equal(sent[0].body.message_thread_id,77);assert.equal(sent[0].body.chat_id,'-100123');
 assert.match(sent[0].body.text,/💳 <b>Робокасса<\/b> - .*\n№42/);assert.equal(sent[0].body.parse_mode,'HTML');assert.equal(f.pending.size,0);
});
test('failed copy remains queued and is delivered by the retry worker',async()=>{
 const f=fixture();f.offline(true);await assert.rejects(f.api.notify(payment),/offline/);assert.equal(f.pending.size,1);
 f.offline(false);await f.api.retryPending();assert.equal(f.pending.size,0);
 assert.equal(f.calls.filter(c=>c.method==='createForumTopic').length,1);
 await f.api.notify(payment);assert.equal(f.calls.filter(c=>c.method==='sendMessage').length,2);
});

test('Mandarin UUID receipts use the same income topic and deduplicate independently',async()=>{
 const f=fixture(),p={...payment,id:'11111111-2222-4333-8444-555555555555',providerId:'mandarin'};
 assert.equal(await f.api.notify(p),true);assert.equal(await f.api.notify(p),true);
 const sent=f.calls.filter(c=>c.method==='sendMessage');assert.equal(sent.length,1);assert.match(sent[0].body.text,/Мандарин/);assert.equal(sent[0].body.message_thread_id,77);
});

test('all payment providers notify income topic with player credit, never the fixed provider fee',async()=>{
 for(const providerId of ['prodamus','robokassa','mandarin'])for(const [gross,credit] of [[110000,100000],[165000,150000],[218000,200000]]){
  const f=fixture(),id=providerId==='mandarin'?'11111111-2222-4333-8444-555555555555':'42';await f.api.notify({id,providerId,amount:gross,status:'confirmed'});
  const text=f.calls.find(c=>c.method==='sendMessage').body.text.replace(/\s/g,'');
  assert.ok(text.includes('-'+credit/100+'₽'),text);assert.ok(!text.includes('-'+gross/100+'₽'),text);
 }
});

test('legacy pending messages survive migration and repeated failures leave room for later messages',async()=>{
  const f=fixture(),key=f.api.PREFIX+'pending';
  const payments=Array.from({length:15},(_,i)=>({...payment,id:String(100+i)}));
  for (const p of payments) await f.redis.pipeline([['HSET',key,'robokassa:'+p.id,JSON.stringify(p)]]);
  f.offline(body=>Number(body.text?.split('№')[1])<110);
  await f.api.retryPending();
  assert.equal(f.pending.size,15);
  await f.api.retryPending();
  assert.equal(f.pending.size,10);
  for (const p of payments.slice(10)) {
    assert.equal(f.calls.filter(c=>c.method==='sendMessage' && c.body.text.endsWith('№'+p.id)).length,1);
  }
});

test('simultaneous callbacks and the retry worker send one message to the income topic',async()=>{
  const f=fixture();
  await Promise.allSettled([f.api.notify(payment),f.api.notify(payment),f.api.retryPending()]);
  await f.api.notify(payment);
  assert.equal(f.calls.filter(c=>c.method==='sendMessage').length,1);
  assert.equal(f.pending.size,0);
});
