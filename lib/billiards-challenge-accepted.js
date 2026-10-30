'use strict';
// Called only after the room service confirms that this member is player two.
module.exports=async function accepted({member,identity,roomId,commands,token,service}){
 if(!token)return;
 const prefix='poker_app:billiards:challenge:',key=prefix+'room:'+roomId,once=prefix+'accepted:'+roomId;
 const [raw,already]=await commands([['GET',key],['GET',once]]);if(!raw||already)return;
 let invitation;try{invitation=JSON.parse(raw);}catch{if(raw!=='pending')return;invitation={};}
 if(invitation.host===member)return;
 const chat=await require('./tracking-link-milestones').playersGroup();if(!chat||invitation.chat&&String(invitation.chat)!==String(chat))return;
 const accountId=await require('./api-handlers/friends').resolveNewsAccountId(identity,member),profile=await require('./club-social').memberProfile(accountId);
 const clean=s=>String(s||'').replace(/[\u0000-\u001f\u007f-\u009f\u2028\u2029]/g,' ').replace(/\s+/g,' ').trim().slice(0,80),name=clean(profile.nick||profile.name||accountId),caller=clean(invitation.caller||'Автор вызова');
 const room=service?await service.call(member,{action:'room',roomId}):null;
 const mode=room?(room.wager?'paid':'free'):(invitation.mode==='paid'?'paid':'free');
 const standing=await require('./game-challenge-standing')({commands,game:'billiards',mode,accountId});
 const [reserved]=await commands([['SET',once,'pending','NX','EX',7200]]);if(!reserved)return;
 // Keep reservation if delivery is uncertain, preventing duplicate group messages.
 const payload={chat_id:chat,text:['🎱 Вызов принят!','','👤 Принял: '+name,standing,'⚔️ Соперник: '+caller,'','Место соперника занято. Наблюдайте за партией по кнопке ниже.'].join('\n'),reply_markup:{inline_keyboard:[[{text:'👀 Смотреть партию',url:'https://t.me/Poker_dvatuza_bot/DvaTuza?startapp=billiards_watch_'+roomId}]]}};
 if(invitation.messageId)payload.reply_parameters={message_id:invitation.messageId,allow_sending_without_reply:true};
 const response=await require('./telegram-group-policy').guardedFetch('https://api.telegram.org/bot'+token+'/sendMessage',{method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(8000),body:JSON.stringify(payload)},'billiards-challenge-accepted');
 const result=await response.json();if(!response.ok||!result.ok)throw Error('Не удалось подтвердить уведомление о принятии вызова');
};
