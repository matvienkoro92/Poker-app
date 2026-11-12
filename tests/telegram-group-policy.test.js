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
 for(const text of ['привет','/start','/tables','/schedule','/schedule@Poker_dvatuza_bot','/schedule@other_bot','/pulse','выводы','/withdrawals@Poker_dvatuza_bot']){
 const res={setHeader(){},status(){return this},json(v){this.body=v;return this}};
 await handler({method:'POST',headers:{'x-telegram-bot-api-secret-token':'policy-test'},body:{message:{text,chat:{id:-100456,type:'supergroup'},from:{id:42}}}},res);
 assert.equal(res.body.ok,true);
 }
 assert.equal(replies,5);assert.equal(forwards,0);assert.ok(protectedIds.has('-100456'));
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

test('challenge photos are allowed only for board invitations in the configured players group',async t=>{const milestones=require('../lib/tracking-link-milestones'),oldGroup=milestones.playersGroup,oldFetch=global.fetch;let sends=0;t.after(()=>{milestones.playersGroup=oldGroup;global.fetch=oldFetch;});milestones.playersGroup=async()=>'-100777';global.fetch=async()=>{sends++;return {ok:true};};await policy.protectGroup('-100777');await policy.protectGroup('-100778');for(const scope of ['board-games-challenge','billiards-challenge','board-games-challenge-accepted','game-result']){const send=(chat,method)=>policy.guardedFetch('https://api.telegram.org/bottest/'+method,{body:JSON.stringify({chat_id:chat})},scope);assert.equal((await send('-100777','sendMessage')).ok,true);assert.equal((await send('-100778','sendMessage')).ok,false);assert.equal((await send('-100777','sendPhoto')).ok,['board-games-challenge','billiards-challenge'].includes(scope));assert.equal((await send('-100778','sendPhoto')).ok,false);assert.equal((await send('-100777','forwardMessage')).ok,false);}assert.equal(sends,6);});
test('only the approved rating commands are dispatched in groups and none go to Salebot',async t=>{fail=false;process.env.TELEGRAM_BOT_WEBHOOK_SECRET='policy-test';process.env.TELEGRAM_BOT_TOKEN='test';const commands=require('../lib/telegram-club-commands'),handler=require('../lib/api-handlers/telegram-bot-webhook'),oldHandle=commands.handle,oldFetch=global.fetch;const actions=[];let forwarded=0;commands.handle=async(u,token,action)=>{actions.push(action);return true;};global.fetch=async()=>{forwarded++;throw Error('No external sends expected');};t.after(()=>{commands.handle=oldHandle;global.fetch=oldFetch;});for(const text of ['/рейтинг бильярд','/рейтинг нарды длинные','/рейтинг нарды короткие','/рейтинг шахматы','/рейтинг@other_bot бильярд']){const res={setHeader(){},status(){return this},json(body){this.body=body;return this}};await handler({method:'POST',headers:{'x-telegram-bot-api-secret-token':'policy-test'},body:{message:{text,chat:{id:-100456,type:'supergroup'},from:{id:42}}}},res);assert.equal(res.body.ok,true);}assert.deepEqual(actions,['rating:billiards','rating:long','rating:short','rating:chess']);assert.equal(forwarded,0);});

test('schedule group allowlist accepts only direct commands to this bot',()=>{
 for(const text of ['/schedule','/schedule@Poker_dvatuza_bot','/расписание@Poker_dvatuza_bot'])assert.equal(policy.isGroupScheduleCommand({message:{text}}),true);
 for(const text of ['schedule','/schedule@other_bot','/schedule please','привет'])assert.equal(policy.isGroupScheduleCommand({message:{text}}),false);
 assert.equal(policy.isGroupScheduleCommand({edited_message:{text:'/schedule'}}),false);
});

test('jackpot scope sends only text to the approved players group',async t=>{
 const milestones=require('../lib/tracking-link-milestones'),oldGroup=milestones.playersGroup,oldFetch=global.fetch;let sends=0;
 t.after(()=>{milestones.playersGroup=oldGroup;global.fetch=oldFetch;});
 milestones.playersGroup=async()=>'-100777';global.fetch=async()=>{sends++;return {ok:true};};
 for(const [chat,method,allowed] of [['-100777','sendMessage',true],['-100778','sendMessage',false],['123','sendMessage',false],['-100777','sendPhoto',false],['-100777','forwardMessage',false]]){
  const response=await policy.guardedFetch('https://api.telegram.org/bottest/'+method,{body:JSON.stringify({chat_id:chat})},'nards-jackpot');assert.equal(response.ok,allowed);
 }
 assert.equal(sends,1);
});

test('tournament start permits only its card photo in the configured players group',async t=>{
 const m=require('../lib/tracking-link-milestones'),oldGroup=m.playersGroup,oldFetch=global.fetch;let sends=0;
 t.after(()=>{m.playersGroup=oldGroup;global.fetch=oldFetch;});m.playersGroup=async()=>'-123';global.fetch=async()=>{sends++;return {ok:true};};
 for(const [chat,method,expected]of [['-123','sendPhoto',true],['-456','sendPhoto',false],['123','sendPhoto',false],['-123','sendMessage',false]]){const body=new FormData();body.append('chat_id',chat);assert.equal((await policy.guardedFetch('https://api.telegram.org/bottest/'+method,{body},'nards-tournament-start')).ok,expected);}
 assert.equal(sends,1);
});

test('Robokassa payment scope is limited to text in its configured group',async t=>{
 const oldFetch=global.fetch,oldRobo=process.env.ROBOKASSA_WITHDRAWALS_CHAT_ID,oldProdamus=process.env.PRODAMUS_WITHDRAWALS_CHAT_ID;
 t.after(()=>{global.fetch=oldFetch;for(const [key,value]of [['ROBOKASSA_WITHDRAWALS_CHAT_ID',oldRobo],['PRODAMUS_WITHDRAWALS_CHAT_ID',oldProdamus]]){if(value===undefined)delete process.env[key];else process.env[key]=value;}});
 process.env.PRODAMUS_WITHDRAWALS_CHAT_ID='-100123';delete process.env.ROBOKASSA_WITHDRAWALS_CHAT_ID;
 let sends=0;global.fetch=async()=>{sends++;return {ok:true};};
 const send=(id,method='sendMessage')=>policy.guardedFetch('https://api.telegram.org/bottest/'+method,{body:JSON.stringify({chat_id:id})},'robokassa-payment');
 assert.equal((await send('-100123')).ok,true);assert.equal((await send('-999')).ok,false);assert.equal((await send('123')).ok,false);assert.equal((await send('-100123','sendPhoto')).ok,false);
 process.env.ROBOKASSA_WITHDRAWALS_CHAT_ID='-222';assert.equal((await send('-100123')).ok,false);assert.equal((await send('-222')).ok,true);assert.equal(sends,2);
});

test('payment link command scope allows only text replies in the Prodamus group',async t=>{
 const old=global.fetch,oldId=process.env.PRODAMUS_WITHDRAWALS_CHAT_ID;let sends=0;t.after(()=>{global.fetch=old;if(oldId===undefined)delete process.env.PRODAMUS_WITHDRAWALS_CHAT_ID;else process.env.PRODAMUS_WITHDRAWALS_CHAT_ID=oldId;});
 process.env.PRODAMUS_WITHDRAWALS_CHAT_ID='-123';global.fetch=async()=>{sends++;return {ok:true};};
 for(const [id,method,ok]of [['-123','sendMessage',true],['-999','sendMessage',false],['123','sendMessage',false],['-123','sendPhoto',false]])assert.equal((await policy.guardedFetch('https://api.telegram.org/bottest/'+method,{body:JSON.stringify({chat_id:id})},'payment-link-command')).ok,ok);
 assert.equal(sends,1);
});

test('webhook dispatches payment link commands only in the Prodamus group and never forwards them to Salebot',async t=>{
 const modulePath=require.resolve('../lib/telegram-payment-links'),oldModule=require.cache[modulePath],oldId=process.env.PRODAMUS_WITHDRAWALS_CHAT_ID,oldFetch=global.fetch;
 process.env.PRODAMUS_WITHDRAWALS_CHAT_ID='-123';let replies=0,forwards=0;
 require.cache[modulePath]={id:modulePath,filename:modulePath,loaded:true,exports:{handle:async()=>{replies++;return true;}}};global.fetch=async()=>{forwards++;throw Error('unexpected forwarding');};
 t.after(()=>{if(oldModule)require.cache[modulePath]=oldModule;else delete require.cache[modulePath];global.fetch=oldFetch;if(oldId===undefined)delete process.env.PRODAMUS_WITHDRAWALS_CHAT_ID;else process.env.PRODAMUS_WITHDRAWALS_CHAT_ID=oldId;});
 const handler=require('../lib/api-handlers/telegram-bot-webhook');
 for(const [id,text,edited]of [[-123,'/ссылка 1000',false],[-123,'ссылка 1500',false],[-123,'/ссылка 2000',false],[-999,'/ссылка 1000',false],[-123,'/ссылка 1100',false],[-123,'/ссылка 1000',true]]){
  const res={setHeader(){},status(n){this.code=n;return this;},json(b){this.body=b;}};
  await handler({method:'POST',headers:{'x-telegram-bot-api-secret-token':'policy-test'},body:{[edited?'edited_message':'message']:{message_id:123,text,chat:{id,type:'supergroup'},from:{id:42}}}},res);assert.equal(res.code,200);
 }
 assert.equal(replies,3);assert.equal(forwards,0);
});
