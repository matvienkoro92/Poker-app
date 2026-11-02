'use strict';
const DUE='poker_app:game-challenge-messages:due',LIFETIME=2*60*60*1000;
async function enqueue({commands,chatId,messageId,publishedAt=Date.now()}){
 if(!/^-\d+$/.test(String(chatId))||!Number.isSafeInteger(messageId)||messageId<=0)return false;
 await commands([['ZADD',DUE,publishedAt+LIFETIME,JSON.stringify({chatId:String(chatId),messageId})]]);
 return true;
}
async function sweep({commands,token,now=Date.now(),send=require('./telegram-group-policy').guardedFetch}){
 const [due]=await commands([['ZRANGEBYSCORE',DUE,0,now,'LIMIT',0,25]]);
 if(!Array.isArray(due))throw Error('Challenge expiry queue unavailable');
 let deleted=0,failed=0;
 await Promise.all(due.map(async raw=>{try{
  const item=JSON.parse(raw);if(!/^-\d+$/.test(String(item.chatId))||!Number.isSafeInteger(item.messageId)||item.messageId<=0)throw Error('Invalid challenge message');
  const response=await send('https://api.telegram.org/bot'+token+'/deleteMessage',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:item.chatId,message_id:item.messageId}),signal:AbortSignal.timeout(8000)},'game-challenge-expiry');
  const result=await response.json();if(!result.ok&&!/message to delete not found/i.test(result.description||''))throw Error('Challenge deletion failed');
  await commands([['ZREM',DUE,raw]]);deleted++;
 }catch{failed++;}}));
 return {deleted,failed};
}
module.exports={enqueue,sweep,DUE,LIFETIME};
