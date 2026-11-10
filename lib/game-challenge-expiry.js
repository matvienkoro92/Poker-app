'use strict';
const DUE='poker_app:game-challenge-messages:due',LIFETIME=2*60*60*1000;
async function enqueue({commands,chatId,messageId,publishedAt=Date.now(),lifetime=LIFETIME}){
 if(!/^-\d+$/.test(String(chatId))||!Number.isSafeInteger(messageId)||messageId<=0)return false;
 await commands([['ZADD',DUE,publishedAt+lifetime,JSON.stringify({chatId:String(chatId),messageId})]]);
 return true;
}
async function remove({commands,token,chatId,messageId,send=require('./telegram-group-policy').guardedFetch}){
 const response=await send('https://api.telegram.org/bot'+token+'/deleteMessage',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:String(chatId),message_id:messageId}),signal:AbortSignal.timeout(8000)},'game-challenge-expiry');
 const result=await response.json();if(!result.ok&&!/message to delete not found/i.test(result.description||''))throw Error('Challenge deletion failed');
 await commands([['ZREM',DUE,JSON.stringify({chatId:String(chatId),messageId})]]);
}
// Called only after the room service has authorized cancellation or acceptance.
async function cancel({family,roomId,commands,token,send}){
 if(!['board-games','billiards'].includes(family)||!/^[A-HJ-NP-Z2-9]{10}$/.test(String(roomId||'')))return false;
 const [raw]=await commands([['GET','poker_app:'+family+':challenge:room:'+roomId]]);
 if(!raw)return false;
 const invitation=typeof raw==='string'?JSON.parse(raw):raw;
 if(!/^-\d+$/.test(String(invitation.chat))||!Number.isSafeInteger(invitation.messageId)||invitation.messageId<=0)return false;
 // Persist the immediate deadline first so a Telegram failure is retried by cron.
 await commands([['ZADD',DUE,0,JSON.stringify({chatId:String(invitation.chat),messageId:invitation.messageId})]]);
 try{await remove({commands,token,chatId:invitation.chat,messageId:invitation.messageId,send});return true;}catch{return false;}
}
async function sweep({commands,token,now=Date.now(),send=require('./telegram-group-policy').guardedFetch}){
 const [due]=await commands([['ZRANGEBYSCORE',DUE,0,now,'LIMIT',0,25]]);
 if(!Array.isArray(due))throw Error('Challenge expiry queue unavailable');
 let deleted=0,failed=0;
 await Promise.all(due.map(async raw=>{try{
  const item=JSON.parse(raw);if(!/^-\d+$/.test(String(item.chatId))||!Number.isSafeInteger(item.messageId)||item.messageId<=0)throw Error('Invalid challenge message');
  await remove({commands,token,chatId:item.chatId,messageId:item.messageId,send});deleted++;
 }catch{failed++;}}));
 return {deleted,failed};
}
async function accepted(options){
 if(options.family==='board-games'&&!["chess","short","long"].includes(options.discipline))return false;
 return cancel(options);
}
function acceptedKey(family,roomId){
 if(!['board-games','billiards'].includes(family)||!/^[A-HJ-NP-Z2-9]{10}$/.test(String(roomId||'')))throw Error('Invalid accepted challenge room');
 return 'poker_app:'+family+':challenge:accepted:'+roomId;
}
async function enqueueAccepted({commands,family,roomId,chatId,messageId}){
 const key=acceptedKey(family,roomId);
 if(!/^-\d+$/.test(String(chatId))||!Number.isSafeInteger(messageId)||messageId<=0)return false;
 await commands([['SET',key,JSON.stringify({chatId:String(chatId),messageId}),'EX',2592000]]);
 return true;
}
async function finishAccepted({commands,family,roomId,token,send}){
 const key=acceptedKey(family,roomId),[raw]=await commands([['GET',key]]);
 if(!raw)return false;
 const item=typeof raw==='string'?JSON.parse(raw):raw;
 // Only called after results are published; cron retries failed deletion.
 await commands([['ZADD',DUE,0,JSON.stringify(item)]]);
 await remove({commands,token,...item,send});
 await commands([['DEL',key]]);
 return true;
}
async function enqueueRating(options){return enqueue({...options,lifetime:10*60*1000});}
module.exports={enqueue,enqueueRating,enqueueAccepted,finishAccepted,sweep,cancel,accepted,DUE,LIFETIME};
