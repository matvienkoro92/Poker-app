'use strict';
const redis=require('./redis');
const {config}=require('./telegram-support-config');
const {isAdmin}=require('./api-auth');
const PREFIX='poker_app:telegram:support:v1:';
const run=commands=>redis.pipeline(commands,{throwOnError:true,context:'support.reactions'});
async function remember(group,messageId,client,originalId){
 if(!Number.isSafeInteger(messageId)||!Number.isSafeInteger(originalId))throw Error('Invalid reaction message mapping');
 const value={clientId:String(client.id),messageId:originalId,threadId:client.threadId};
 await run([['SET',PREFIX+'reaction-source:'+group+':'+messageId,JSON.stringify(value),'EX',30*86400],['SET',PREFIX+'reaction-target:'+group+':'+client.id+':'+originalId,String(messageId),'EX',30*86400]]);
}
async function handle(update,token,{api,lock}){
 const r=update.message_reaction,cfg=await config(),group=String(cfg?.chatId||'');
 if(!cfg?.enabled||String(r?.chat?.id)!==group||!r.user||r.user.is_bot||r.actor_chat||!isAdmin(r.user.id)||!Number.isSafeInteger(r.message_id)||!Number.isSafeInteger(update.update_id))return {handled:false};
 const [row]=await run([['GET',PREFIX+'reaction-source:'+group+':'+r.message_id]]);
 if(!row?.result)return {handled:true};
 const source=JSON.parse(row.result),key=PREFIX+'reaction-state:'+group+':'+r.message_id;
 return lock(key+':lock',async()=>{
  const [saved]=await run([['GET',key]]),state=JSON.parse(saved?.result||'null');
  if(state&&state.updateId>=update.update_id)return {handled:true};
  const emojis=(r.new_reaction||[]).filter(v=>v.type==='emoji'&&typeof v.emoji==='string');
  const reaction=emojis.length?[emojis[emojis.length-1]]:[];
  // Removing another manager's older reaction must not clear the current one.
  if(!reaction.length&&state&&state.managerId!==r.user.id)return {handled:true};
  if((r.new_reaction||[]).length&&!reaction.length)return {handled:true};
  try{await api(token,'setMessageReaction',{chat_id:source.clientId,message_id:source.messageId,reaction});}
  catch(error){if(![400,403].includes(error.telegramErrorCode))throw error;return {handled:true};}
  await run([['SET',key,JSON.stringify({updateId:update.update_id,managerId:r.user.id}),'EX',30*86400]]);
  return {handled:true};
 });
}
module.exports={remember,handle};
