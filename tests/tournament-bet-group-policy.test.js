const test=require('node:test'),assert=require('node:assert/strict');
const redisPath=require.resolve('../lib/redis');
require(redisPath);
const original=require.cache[redisPath].exports;
let protectedIds=new Set(),fail=false;
require.cache[redisPath].exports={...original,pipeline:async commands=>{
 if(fail)throw Error('offline');
 return commands.map(([cmd,key,id])=>{if(cmd==='SADD')protectedIds.add(id);return {result:cmd==='SADD'?1:Number(protectedIds.has(id))};});
}};
const policy=require('../lib/telegram-group-policy');
test('protected group notifications and photos are blocked, private messages pass',async t=>{
 const old=global.fetch;let sends=0;t.after(()=>{global.fetch=old;fail=false;});
 global.fetch=async()=>{sends++;return {ok:true}};
 await policy.protectGroup('-100123');
 for(const method of ['sendMessage','sendPhoto','forwardMessage','copyMessage']){
 const r=await policy.guardedFetch('https://api.telegram.org/bottest/'+method,{body:JSON.stringify({chat_id:'-100123'})});assert.equal(r.ok,false);
 }
 const multipart=Buffer.from('Content-Disposition: form-data; name="chat_id"\r\n\r\n-100123\r\n');
 assert.equal((await policy.guardedFetch('https://api.telegram.org/bottest/sendPhoto',{body:multipart})).ok,false);
 assert.equal(sends,0);
 await policy.guardedFetch('https://api.telegram.org/bottest/sendMessage',{body:JSON.stringify({chat_id:123})});assert.equal(sends,1);
 fail=true;
 assert.equal((await policy.guardedFetch('https://api.telegram.org/bottest/sendMessage',{body:JSON.stringify({chat_id:-999})})).ok,false);
});
test('group detection does not affect personal or channel updates',()=>{
 assert.ok(policy.groupMessage({message:{chat:{id:-1,type:'supergroup'}}}));
 assert.equal(policy.groupMessage({message:{chat:{id:1,type:'private'}}}),null);
 assert.equal(policy.groupMessage({channel_post:{chat:{id:-2,type:'channel'}}}),null);
});
test('event scope permits only messages in the configured club group',async t=>{
 const old=global.fetch,oldId=process.env.TELEGRAM_TOURNAMENT_BET_CHAT_ID;let sends=0;
 process.env.TELEGRAM_TOURNAMENT_BET_CHAT_ID='-100123';fail=false;
 t.after(()=>{global.fetch=old;if(oldId===undefined)delete process.env.TELEGRAM_TOURNAMENT_BET_CHAT_ID;else process.env.TELEGRAM_TOURNAMENT_BET_CHAT_ID=oldId;});
 global.fetch=async()=>{sends++;return {ok:true}};await policy.protectGroup('-100123');await policy.protectGroup('-100999');
 const send=(id,method='sendMessage',scope='tournament-bet')=>policy.guardedFetch('https://api.telegram.org/bottest/'+method,{body:JSON.stringify({chat_id:id})},scope);
 assert.equal((await send('-100123')).ok,true);
 assert.equal((await send('-100123','sendMessage','')).ok,false);
 assert.equal((await send('-100999')).ok,false);
 assert.equal((await send('-100123','sendPhoto')).ok,false);
 assert.equal(sends,1);
});
