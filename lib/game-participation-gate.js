'use strict';
const {playersGroup,INVITE,membership}=require('./tracking-link-milestones');
const verified=new Map(),pending=new Map(),TTL=60000;
async function check(member,token){
 const id=String(member||'').replace(/^tg_/,'');
 const requirements=[{key:'bot',action:'Открыть бота и нажать Start',url:'https://t.me/Poker_dvatuza_bot'},{key:'chat',action:'Вступить в чат игроков',url:INVITE}];
 const unavailable=()=>({ok:false,code:'GAME_SUBSCRIPTION_UNAVAILABLE',error:'Не удалось проверить подписки через Telegram. Это не означает, что подписок нет. Попробуйте ещё раз.'});
 if(!/^\d+$/.test(id))return {ok:false,code:'GAME_TELEGRAM_REQUIRED',error:'Для проверки подписок войдите через Telegram.',missingRequirements:[]};
 if(!token)return unavailable();
 const key=token+':'+id;if(Date.now()-(verified.get(key)||0)<TTL)return {ok:true};if(pending.has(key))return pending.get(key);
 const work=(async()=>{
 async function call(method,body){try{const r=await fetch('https://api.telegram.org/bot'+token+'/'+method,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(6000)});return await r.json();}catch{return null;}}
 const [botResponse,chat]=await Promise.all([call('sendChatAction',{chat_id:id,action:'typing'}),(async()=>{try{const group=await playersGroup();if(!group)return null;const response=await call('getChatMember',{chat_id:group,user_id:id});if(response?.ok)return membership(response.result);if(response?.error_code===400&&/USER_NOT_PARTICIPANT|user not found/i.test(response.description||''))return false;return null;}catch{return null;}})()]);
 const bot=botResponse?.ok&&botResponse.result===true?true:botResponse?.error_code===403&&/blocked|deactivated|can't initiate|cannot initiate/i.test(botResponse.description||'')||botResponse?.error_code===400&&/chat not found/i.test(botResponse.description||'')?false:null;
 const missing=requirements.filter(r=>r.key==='bot'?bot===false:chat===false);
 if(missing.length)return {ok:false,code:'GAME_SUBSCRIPTION_REQUIRED',error:'Чтобы играть, запустите бота клуба и вступите в чат игроков. После этого нажмите «Проверить ещё раз».',missingRequirements:missing};
 if(bot!==true||chat!==true)return unavailable();
 verified.set(key,Date.now());if(verified.size>1000)for(const [k,time]of verified)if(Date.now()-time>=TTL)verified.delete(k);return {ok:true};
 })();pending.set(key,work);try{return await work;}finally{pending.delete(key);}
}
module.exports={check};
