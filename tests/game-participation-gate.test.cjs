'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),{check}=require('../lib/game-participation-gate');
test('only confirmed missing memberships request subscription; outages stay retryable',async()=>{
 const fetchBefore=global.fetch,env=process.env.TELEGRAM_PLAYERS_CHAT_ID;process.env.TELEGRAM_PLAYERS_CHAT_ID='-10042';
 try{let id=100;for(const [bot,status,expected]of [[true,'member',[]],[false,'member',['bot']],[true,'left',['chat']],[false,'kicked',['bot','chat']],[true,'unknown',null],[true,'administrator',[]],[true,'creator',[]]]){
 const calls=[];global.fetch=async(url,options)=>{const body=JSON.parse(options.body);calls.push({url,body});return {json:async()=>url.endsWith('sendChatAction')?bot?{ok:true,result:true}:{ok:false,error_code:403,description:'Forbidden: bot was blocked by the user'}:{ok:true,result:{status}}};};
 const member=String(id++),result=await check(member,'token');assert.equal(result.ok,expected?.length===0);if(expected)assert.deepEqual((result.missingRequirements||[]).map(x=>x.key),expected);else assert.equal(result.code,'GAME_SUBSCRIPTION_UNAVAILABLE');assert.equal(calls.length,2);assert.equal(calls.find(x=>x.url.endsWith('getChatMember')).body.chat_id,'-10042');if(result.ok){await check(member,'token');assert.equal(calls.length,2,'recent verified subscriptions avoid repeated Telegram requests');}
 }
 global.fetch=async()=>{throw Error('offline');};assert.equal((await check('999','token')).code,'GAME_SUBSCRIPTION_UNAVAILABLE');assert.equal((await check('999','')).code,'GAME_SUBSCRIPTION_UNAVAILABLE');
 global.fetch=async()=>({json:async()=>({ok:false,error_code:429,description:'Too many requests'})});assert.equal((await check('888','token')).code,'GAME_SUBSCRIPTION_UNAVAILABLE');
 }finally{global.fetch=fetchBefore;if(env===undefined)delete process.env.TELEGRAM_PLAYERS_CHAT_ID;else process.env.TELEGRAM_PLAYERS_CHAT_ID=env;}
});

test('internal account login checks only server-linked Telegram identities, never the account number',async()=>{
 const accounts=require('../lib/account-id'),redis=require('../lib/redis'),env=process.env.TELEGRAM_PLAYERS_CHAT_ID,old=[accounts.getDtIdByUserId,accounts.getUserIdByDtId,redis.sscanall,global.fetch];process.env.TELEGRAM_PLAYERS_CHAT_ID='-10042';
 try{accounts.getDtIdByUserId=async member=>member==='mail_ID400800'?'ID400800':null;accounts.getUserIdByDtId=async()=> 'tg_70123456';redis.sscanall=async()=>['tg_70123456','tg_70987654','mail_ID400800'];const seen=[];global.fetch=async(url,opt)=>{const body=JSON.parse(opt.body);seen.push(body.user_id||body.chat_id);return {json:async()=>url.endsWith('sendChatAction')?{ok:true,result:true}:{ok:true,result:{status:'administrator'}}};};assert.deepEqual(await check('mail_ID400800','linked-test-token'),{ok:true});assert.equal(seen.includes('400800'),false);assert.ok(seen.includes('70123456'));assert.ok(seen.includes('70987654'));assert.equal((await check('vk_123','linked-test-token')).code,'GAME_TELEGRAM_REQUIRED');redis.sscanall=async()=>null;assert.equal((await check('mail_ID400800','other-token')).code,'GAME_SUBSCRIPTION_UNAVAILABLE');
 }finally{[accounts.getDtIdByUserId,accounts.getUserIdByDtId,redis.sscanall,global.fetch]=old;if(env===undefined)delete process.env.TELEGRAM_PLAYERS_CHAT_ID;else process.env.TELEGRAM_PLAYERS_CHAT_ID=env;}
});
