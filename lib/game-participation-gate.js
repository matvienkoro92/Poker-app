'use strict';
const {playersGroup,INVITE,membership}=require('./tracking-link-milestones');
async function check(member,token){
 const id=String(member||'').replace(/^tg_/,'');
 const requirements=[{key:'bot',action:'Открыть бота и нажать Start',url:'https://t.me/Poker_dvatuza_bot'},{key:'chat',action:'Вступить в чат игроков',url:INVITE}];
 async function call(method,body){try{const r=await fetch('https://api.telegram.org/bot'+token+'/'+method,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(6000)});const d=await r.json();return d.ok?d.result:null;}catch{return null;}}
 if(!/^\d+$/.test(id)||!token)return {ok:false,code:'GAME_SUBSCRIPTION_REQUIRED',error:'Для игры войдите через Telegram, запустите бота клуба и вступите в чат игроков.',missingRequirements:requirements};
 const [bot,chat]=await Promise.all([call('sendChatAction',{chat_id:id,action:'typing'}),(async()=>{try{const group=await playersGroup();return group?membership(await call('getChatMember',{chat_id:group,user_id:id})):null;}catch{return null;}})()]);
 const missing=requirements.filter(r=>r.key==='bot'?bot!==true:chat!==true);
 return missing.length?{ok:false,code:'GAME_SUBSCRIPTION_REQUIRED',error:'Чтобы играть, запустите бота клуба и вступите в чат игроков. После этого нажмите «Проверить ещё раз».',missingRequirements:missing}:{ok:true};
}
module.exports={check};
