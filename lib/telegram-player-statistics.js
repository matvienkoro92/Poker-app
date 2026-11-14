'use strict';
const redis=require('./redis');
const COMMAND=/^(?:\/(?:статистика|stats|stat)(?:@Poker_dvatuza_bot)?|статистика|stats|stat)$/i;
function isCommand(update){
 const m=update?.message;
 return m?.chat?.type==='private'&&Number.isSafeInteger(m.from?.id)&&m.from.id>0&&!m.from?.is_bot&&String(m.chat.id)===String(m.from?.id)&&COMMAND.test(String(m.text||'').trim());
}
function playerText(text){
 return text.replace(/^👤 Диалог с /,'👤 Статистика игрока: ').replace(/\n\n📝 Для внутренних заметок начинайте сообщение с \/\/[\s\S]*$/,'');
}
async function handle(update,token){
 if(!token||!isCommand(update)||!Number.isSafeInteger(update.message.message_id))return false;
 const m=update.message,key='poker_app:telegram:statistics:'+m.from.id+':'+m.message_id;
 const run=commands=>redis.pipeline(commands,{throwOnError:true,context:'telegram.player-statistics'});
 const [done]=await run([['GET',key]]);if(done.result)return true;
 const nonce=require('node:crypto').randomUUID(),lock=key+':lock';
 const [claim]=await run([['SET',lock,nonce,'NX','EX',60]]);if(claim.result!=='OK')throw Error('Statistics delivery busy');
 try{
  const [again]=await run([['GET',key]]);if(again.result)return true;
  const card=require('./telegram-support-card');
  // Identity is always the verified webhook sender; never accept a target ID.
  const text=playerText(await card.text(m.from));
  const response=await require('./telegram-group-policy').guardedFetch('https://api.telegram.org/bot'+token+'/sendMessage',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:m.from.id,text,entities:card.entities(text),link_preview_options:{is_disabled:true},reply_parameters:{message_id:m.message_id}}),signal:AbortSignal.timeout(10000)},'');
  const result=await response.json();if(!response.ok||!result.ok)throw Error('Statistics delivery failed');
  await run([['SET',key,'sent','EX',86400]]);return true;
 }finally{await run([['EVAL',"if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) end;return 0",1,lock,nonce]]);}
}
module.exports={isCommand,handle,playerText};
