'use strict';
module.exports=async function challenge({member,identity,roomId,service,commands,token}){
 const view=await service.call(member,{action:'room',roomId});
 const fail=(status,message)=>{const e=Error(message);e.status=status;throw e;};
 if(view.player!==0||view.ready||view.state.winner!==null)fail(409,'Вызвать соперника можно только из своей комнаты в ожидании игрока.');
 const chat=await require('./tracking-link-milestones').playersGroup();
 if(!chat||!token)fail(503,'Чат игроков пока не подключён.');
 const accountId=await require('./api-handlers/friends').resolveNewsAccountId(identity,member);
 const profile=await require('./club-social').memberProfile(accountId);
 const caller=String(profile.nick||profile.name||accountId).replace(/[\u0000-\u001f\u007f-\u009f\u2028\u2029]/g,' ').replace(/\s+/g,' ').trim().slice(0,80);
 const standing=await require('./game-challenge-standing')({commands,game:'billiards',accountId});
 const prefix='poker_app:billiards:challenge:',lock=prefix+'room:'+roomId,rate=prefix+'member:'+member;
 const [allowed]=await commands([['EVAL',"if redis.call('EXISTS',KEYS[1])==1 or redis.call('EXISTS',KEYS[2])==1 then return 0 end; redis.call('SET',KEYS[1],ARGV[2],'EX',7200); redis.call('SET',KEYS[2],ARGV[1],'EX',300); return 1",2,lock,rate,roomId,JSON.stringify({host:member,caller,chat})]]);
 if(Number(allowed)!==1)fail(429,'Вызов уже отправлен или прошло меньше 5 минут с предыдущего.');
 // Keep the reservation on delivery errors: an uncertain Telegram response must not produce duplicates.
 const discipline=view.state.discipline==='pyramid'?'Русский бильярд · свободная пирамида':'Американский пул · восьмёрка';
 const result=await require('./telegram-group-policy').guardedFetch('https://api.telegram.org/bot'+token+'/sendMessage',{method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(8000),body:JSON.stringify({chat_id:chat,text:['🎱 Вызов на бильярд!','','👤 Вызывает: '+caller,standing,'',discipline,'Матч: '+(view.match.target===3?'до 3 побед':'одна партия'),view.turnSeconds?view.turnSeconds+' сек. на ход':'Без ограничения времени на ход','',...(view.wager?['Ставка каждого: '+view.wager.stake.toLocaleString('ru-RU')+' фишек','Банк: '+view.wager.bank.toLocaleString('ru-RU')+' · комиссия '+(view.wager.feePercent??5)+'% · победителю '+view.wager.payout.toLocaleString('ru-RU')+' фишек','Ставка спишется с Poker21 при принятии вызова.','']:['Вход 0','']),'Код комнаты: '+roomId,'','Присоединяйтесь — место для одного соперника.','','Приглашение действует до входа соперника, не более 2 часов.'].join('\n'),reply_markup:{inline_keyboard:[[{text:'🎱 Принять вызов',url:'https://t.me/Poker_dvatuza_bot/DvaTuza?startapp=billiards_'+roomId}],[{text:'Создать свою партию',url:'https://t.me/Poker_dvatuza_bot/DvaTuza?startapp=create_billiards'}]]}})},'billiards-challenge');
 const data=await result.json();if(!result.ok||!data.ok)fail(503,'Не удалось подтвердить отправку вызова. Комната создана — можно передать её код другу.');
 await commands([['SET',lock,JSON.stringify({host:member,caller,chat,messageId:data.result?.message_id||null}),'XX','KEEPTTL']]);
 return {ok:true};
};
