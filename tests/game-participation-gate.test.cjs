'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),{check}=require('../lib/game-participation-gate');
test('each launch checks live bot availability and exact players chat; failures deny',async()=>{
 const fetchBefore=global.fetch,env=process.env.TELEGRAM_PLAYERS_CHAT_ID;process.env.TELEGRAM_PLAYERS_CHAT_ID='-10042';
 try{for(const [bot,status,expected] of [[true,'member',[]],[false,'member',['bot']],[true,'left',['chat']],[false,'kicked',['bot','chat']],[true,'unknown',['chat']]]){
 const calls=[];global.fetch=async(url,options)=>{const body=JSON.parse(options.body);calls.push({url,body});return {json:async()=>url.endsWith('sendChatAction')?{ok:bot,result:bot}:{ok:true,result:{status}}};};
 const result=await check('123','token');assert.equal(result.ok,!expected.length);assert.deepEqual((result.missingRequirements||[]).map(x=>x.key),expected);assert.equal(calls.length,2);assert.equal(calls.find(x=>x.url.endsWith('getChatMember')).body.chat_id,'-10042');
 }
 global.fetch=async()=>{throw Error('offline');};assert.equal((await check('123','token')).ok,false);
 assert.equal((await check('vk_123','token')).ok,false);
 }finally{global.fetch=fetchBefore;if(env===undefined)delete process.env.TELEGRAM_PLAYERS_CHAT_ID;else process.env.TELEGRAM_PLAYERS_CHAT_ID=env;}
});
