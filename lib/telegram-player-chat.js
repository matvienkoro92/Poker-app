'use strict';
const redis=require('./redis');
function isCommand(update){const m=update?.message;return m?.chat?.type==='private'&&Number.isSafeInteger(m.from?.id)&&!m.from.is_bot&&String(m.chat.id)===String(m.from.id)&&/^\/(?:чат|chat)(?:@Poker_dvatuza_bot)?$/i.test(String(m.text||'').trim());}
async function handle(update,token){
 if(!token||!isCommand(update)||!Number.isSafeInteger(update.message.message_id))return false;
 const m=update.message,key='poker_app:telegram:club-chat:'+m.from.id+':'+m.message_id,nonce=require('node:crypto').randomUUID();
 const run=async cmds=>{const rows=await redis.pipeline(cmds,{throwOnError:true,context:'telegram.player-chat'});if(!rows||rows.some(r=>r.error))throw Error('Chat storage unavailable');return rows.map(r=>r.result);};
 const [done]=await run([['GET',key]]);if(done)return true;
 const [claim]=await run([['SET',key+':lock',nonce,'NX','EX',60]]);if(claim!=='OK')throw Error('Chat reply busy');
 try{
  const [again]=await run([['GET',key]]);if(again)return true;
  const text='💬 Наш клубный чат: https://t.me/dva_tu1';
  const response=await require('./telegram-group-policy').guardedFetch('https://api.telegram.org/bot'+token+'/sendMessage',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:m.from.id,text,reply_markup:{inline_keyboard:[[{text:'💬 Перейти в чат',url:'https://t.me/dva_tu1'}]]},reply_parameters:{message_id:m.message_id}}),signal:AbortSignal.timeout(10000)},'');
  const result=await response.json();if(!response.ok||!result.ok)throw Error('Chat reply failed');
  await run([['SET',key,'sent','EX',86400]]);return true;
 }finally{await run([['EVAL',"if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) end;return 0",1,key+':lock',nonce]]);}
}
module.exports={isCommand,handle};
