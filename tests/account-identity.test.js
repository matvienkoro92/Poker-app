'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function harness(){
 const hashes=new Map(),sets=new Map(); let offline=false;
 const hash=key=>{if(!hashes.has(key))hashes.set(key,new Map());return hashes.get(key)};
 const pipeline=async commands=>{if(offline)throw Error('offline');return commands.map(([op,...args])=>{
  if(op==='HGET')return {result:hash(args[0]).get(args[1])||null};
  if(op==='EVAL'){
   const [,n,...rest]=args,keys=rest.slice(0,Number(n)),[user,id]=rest.slice(Number(n));
   const existing=hash(keys[0]).get(user);if(existing)return {result:existing};
   if(hash(keys[1]).has(id)||hash(keys[3]).has(id))return {result:''};
   hash(keys[0]).set(user,id);hash(keys[1]).set(id,user);sets.set(keys[2],new Set([user]));return {result:id};
  }
  throw Error(op);
 })};
 const load=(file,stubs)=>{const module={exports:{}};vm.runInNewContext(fs.readFileSync(file,'utf8'),{module,exports:module.exports,require:name=>{if(name in stubs)return stubs[name];throw Error(name)},Set,console,Math});return module.exports};
 const canonical=load('lib/account-canonical.js',{'./redis':{pipeline}});
 const account=load('lib/account-id.js',{'./redis':{pipeline},'./account-canonical':canonical,'./redis-atomic':{atomicWrite:async(commands,{values})=>{for(const g of values)assert.equal(hash(g.key).get(g.field)||'',g.value);for(const [op,key,field,value]of commands){if(op==='HSET')hash(key).set(field,value);else if(op==='SADD'){if(!sets.has(key))sets.set(key,new Set());sets.get(key).add(field)}}}}});
 return {account,canonical,hash,sets,offline:()=>offline=true};
}
test('parallel first logins return one account without orphan reverse identities',async()=>{
 const h=harness();const ids=await Promise.all(Array.from({length:20},()=>h.account.ensureDtIdForUserId('tg_123')));
 assert.equal(new Set(ids).size,1);assert.equal(h.hash(h.account.ID_TO_USER_KEY).size,1);
 assert.equal(h.sets.size,1);
});
test('Telegram, PWA email/synthetic identities, profile links and spins resolve approved old ID consistently',async()=>{
 const h=harness();h.hash(h.account.DT_IDS_KEY).set('tg_123','ID400800');h.hash(h.canonical.ACCOUNT_REDIRECTS_KEY).set('ID423756','ID400800');
 for(const id of ['tg_123','mail_ID423756','tg_ID423756','vk_ID423756','ID423756','ID400800']){
  assert.equal(await h.account.ensureDtIdForUserId(id),'ID400800');
  assert.equal(await h.account.resolveAccountId(id),'ID400800');
 }
 assert.equal(h.hash(h.account.ID_TO_USER_KEY).size,0,'lookup never creates extra accounts');
 assert.equal(await h.account.resolveAccountId('ID494359'),'ID494359','same poker ID is not ownership proof');
});
test('lookup failure cannot create or overwrite an identity',async()=>{
 const h=harness();h.offline();await assert.rejects(h.account.ensureDtIdForUserId('tg_123'),/offline/);
 assert.equal(h.hash(h.account.ID_TO_USER_KEY).size,0);
});
test('link refuses to silently move a real existing identity to another wallet',async()=>{
 const h=harness();h.hash(h.account.DT_IDS_KEY).set('tg_123','ID400800');
 assert.equal(await h.account.linkUserIdToDtId('tg_123','ID494359',true),false);
 assert.equal(h.hash(h.account.DT_IDS_KEY).get('tg_123'),'ID400800');
 assert.equal(await h.account.linkUserIdToDtId('vk_456','ID400800',false),true);
 assert.equal(await h.account.getDtIdByUserId('vk_456'),'ID400800');
});
test('redirect loops and malformed mappings fail closed',async()=>{
 const h=harness(),r=h.hash(h.canonical.ACCOUNT_REDIRECTS_KEY);
 r.set('ID400800','ID423756');r.set('ID423756','ID400800');
 await assert.rejects(h.account.resolveAccountId('ID400800'),/cycle/);
 r.set('ID423756','wrong');await assert.rejects(h.account.resolveAccountId('ID400800'),/invalid/);
});
