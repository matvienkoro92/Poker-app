'use strict';
module.exports=async function challenge({member,roomId,service,commands,token}){
 const view=await service.call(member,{action:'room',roomId});
 const fail=(status,message)=>{const e=Error(message);e.status=status;throw e;};
 if(view.player!==0||view.ready||view.state.winner!==null)fail(409,'Вызвать соперника можно только из своей комнаты в ожидании игрока.');
 const chat=await require('./tracking-link-milestones').playersGroup();
 if(!chat||!token)fail(503,'Чат игроков пока не подключён.');
 const prefix='poker_app:billiards:challenge:',lock=prefix+'room:'+roomId,rate=prefix+'member:'+member;
 const [allowed]=await commands([['EVAL',"if redis.call('EXISTS',KEYS[1])==1 or redis.call('EXISTS',KEYS[2])==1 then return 0 end; redis.call('SET',KEYS[1],'pending','EX',7200); redis.call('SET',KEYS[2],ARGV[1],'EX',300); return 1",2,lock,rate,roomId]]);
 if(Number(allowed)!==1)fail(429,'Вызов уже отправлен или прошло меньше 5 минут с предыдущего.');
 // Keep the reservation on delivery errors: an uncertain Telegram response must not produce duplicates.
 const discipline=view.state.discipline==='pyramid'?'Русский бильярд · свободная пирамида':'Американский пул · восьмёрка';
 const result=await require('./telegram-group-policy').guardedFetch('https://api.telegram.org/bot'+token+'/sendMessage',{method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(8000),body:JSON.stringify({chat_id:chat,text:'🎱 Вызов на бильярд!\nИгрок приглашает соперника в Two Aces.\n'+discipline+' · '+(view.match.target===3?'до 3 побед':'одна партия')+(view.turnSeconds?' · '+view.turnSeconds+' сек. на ход':'')+'\nКод комнаты: '+roomId+'\nПрисоединяйтесь — место для одного соперника. Приглашение действует до входа соперника, не более 2 часов.',reply_markup:{inline_keyboard:[[{text:'🎱 Принять вызов',url:'https://t.me/Poker_dvatuza_bot/DvaTuza?startapp=billiards_'+roomId}]]}})},'billiards-challenge');
 const data=await result.json();if(!result.ok||!data.ok)fail(503,'Не удалось подтвердить отправку вызова. Комната создана — можно передать её код другу.');
 return {ok:true};
};
