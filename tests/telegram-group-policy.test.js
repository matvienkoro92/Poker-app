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
test('group ignores unrelated commands and never forwards messages to Salebot',async t=>{
 fail=false;
 process.env.TELEGRAM_BOT_WEBHOOK_SECRET='policy-test';
 process.env.TELEGRAM_SALEBOT_FORWARD_URL='https://example.invalid/salebot';
 process.env.TELEGRAM_BOT_TOKEN='test';
 const commands=require('../lib/telegram-club-commands');
 const oldHandle=commands.handle,oldFetch=global.fetch;let replies=0,forwards=0;
 commands.handle=async()=>{replies++;return true};global.fetch=async()=>{forwards++;throw Error('unexpected request')};
 t.after(()=>{commands.handle=oldHandle;global.fetch=oldFetch;});
 const handler=require('../lib/api-handlers/telegram-bot-webhook');
 for(const text of ['привет','/start','/tables','/schedule','/pulse','выводы','/withdrawals@Poker_dvatuza_bot']){
 const res={setHeader(){},status(){return this},json(v){this.body=v;return this}};
 await handler({method:'POST',headers:{'x-telegram-bot-api-secret-token':'policy-test'},body:{message:{text,chat:{id:-100456,type:'supergroup'},from:{id:42}}}},res);
 assert.equal(res.body.ok,true);
 }
 assert.equal(replies,3);assert.equal(forwards,0);assert.ok(protectedIds.has('-100456'));
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
 assert.equal((await send('-100123','sendMessage','raffle-completed')).ok,true);
 assert.equal((await send('-100999','sendMessage','raffle-completed')).ok,false);
 assert.equal((await send('-100123','sendPhoto','raffle-completed')).ok,false);
 assert.equal((await send('-100123','sendMessage','cooler-record')).ok,true);
 assert.equal((await send('-100999','sendMessage','cooler-record')).ok,false);
 assert.equal((await send('-100123','sendPhoto','cooler-record')).ok,false);
 assert.equal((await send('-100123','sendMessage','cooler-winner')).ok,true);
 assert.equal((await send('-100999','sendMessage','cooler-winner')).ok,false);
 assert.equal((await send('-100123','sendPhoto','cooler-winner')).ok,false);
 assert.equal(sends,4);
});

test('membership, promotion, join request and reaction events are recognized as group updates',()=>{
 for(const type of ['my_chat_member','chat_member','chat_join_request','message_reaction','message_reaction_count','edited_business_message']){
  assert.equal(policy.groupMessage({[type]:{chat:{id:-100456,type:'supergroup'}}}).chat.id,-100456);
  assert.equal(policy.groupMessage({[type]:{chat:{id:42,type:'private'}}}),null);
  assert.equal(policy.groupMessage({[type]:{chat:{id:-100789,type:'channel'}}}),null);
 }
});

test('bot promotion and membership changes stay silent and never reach Salebot',async t=>{
 fail=false;
 process.env.TELEGRAM_BOT_WEBHOOK_SECRET='policy-test';
 process.env.TELEGRAM_SALEBOT_FORWARD_URL='https://example.invalid/salebot';
 process.env.TELEGRAM_BOT_TOKEN='test';
 const commands=require('../lib/telegram-club-commands');
 const oldHandle=commands.handle,oldFetch=global.fetch;let replies=0,externalCalls=0;
 commands.handle=async()=>{replies++;return true;};
 global.fetch=async()=>{externalCalls++;throw Error('Unexpected outbound request');};
 t.after(()=>{commands.handle=oldHandle;global.fetch=oldFetch;});
 const handler=require('../lib/api-handlers/telegram-bot-webhook');
 for(const type of ['my_chat_member','chat_member','chat_join_request','message_reaction','message_reaction_count']){
  const res={setHeader(){},status(){return this;},json(body){this.body=body;return this;}};
  await handler({method:'POST',headers:{'x-telegram-bot-api-secret-token':'policy-test'},body:{[type]:{chat:{id:-100456,type:'supergroup'},from:{id:42},old_chat_member:{status:'member'},new_chat_member:{status:'administrator',user:{id:43}}}}},res);
  assert.equal(res.body.ok,true);assert.equal(res.body.skipped,true);
 }
 assert.equal(replies,0);assert.equal(externalCalls,0);assert.ok(protectedIds.has('-100456'));
});

test('board game challenge scopes allow only text in the configured players group',async t=>{const milestones=require('../lib/tracking-link-milestones'),oldGroup=milestones.playersGroup,oldFetch=global.fetch;let sends=0;t.after(()=>{milestones.playersGroup=oldGroup;global.fetch=oldFetch;});milestones.playersGroup=async()=>'-100777';global.fetch=async()=>{sends++;return {ok:true};};await policy.protectGroup('-100777');await policy.protectGroup('-100778');for(const scope of ['board-games-challenge','board-games-challenge-accepted','game-result']){const send=(chat,method)=>policy.guardedFetch('https://api.telegram.org/bottest/'+method,{body:JSON.stringify({chat_id:chat})},scope);assert.equal((await send('-100777','sendMessage')).ok,true);assert.equal((await send('-100778','sendMessage')).ok,false);assert.equal((await send('-100777','sendPhoto')).ok,false);assert.equal((await send('-100777','forwardMessage')).ok,false);}assert.equal(sends,3);});
