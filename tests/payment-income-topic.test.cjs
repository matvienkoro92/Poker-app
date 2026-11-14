'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm'),fs=require('node:fs');
function fixture(){
 const kv=new Map(),pending=new Map(),calls=[];let fail=false;
 const redis={pipeline:async commands=>commands.map(([op,key,...args])=>{
  if(op==='GET')return {result:kv.get(key)||null};
  if(op==='SET'){if(args.includes('NX')&&kv.has(key))return {result:null};kv.set(key,args[0]);return {result:'OK'};}
  if(op==='HSET'){pending.set(args[0],args[1]);return {result:1};}
  if(op==='HDEL'){pending.delete(args[0]);return {result:1};}
  if(op==='HVALS')return {result:[...pending.values()]};
  if(op==='EVAL'){if(kv.get(args[1])===args[2])kv.delete(args[1]);return {result:1};}
  throw Error(op);
 })};
 const ctx={module:{exports:{}},require:id=>id==='./redis'?redis:id==='./telegram-support-config'?{config:async()=>({enabled:true,chatId:'-100123'})}:id==='./telegram-group-policy'?{guardedFetch:async(url,options)=>{
  const body=JSON.parse(options.body),method=url.split('/').at(-1);calls.push({method,body});
  if(fail&&method==='sendMessage')throw Error('offline');
  return {ok:true,json:async()=>({ok:true,result:method==='createForumTopic'?{message_thread_id:77}:{message_id:1}})};
 }}:require(id.startsWith('./')?'../lib/'+id.slice(2):id),process:{env:{TELEGRAM_BOT_TOKEN:'test'}},Intl,AbortSignal,console:{error(){}}};
 vm.runInNewContext(fs.readFileSync('lib/payment-income-topic.js','utf8'),ctx);
 return {api:ctx.module.exports,calls,pending,offline:value=>{fail=value;}};
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
