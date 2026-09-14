'use strict';
function createRaffleGroupNotifier({pipeline,eventChatId,sendTelegramMessage,botToken}) {
 return async function notify(raffle) {
  if(!botToken||!raffle?.id||raffle.status!=='active'||raffle.prizeKind!=='tournament_ticket')return;
  const chatId=await eventChatId();if(!chatId)return;
  const key='poker_app:raffle_group_start:'+String(raffle.id);
  const lock=await pipeline([['SET',key,'sending','EX','300','NX']],{throwOnError:true});
  if(lock?.[0]?.result!=='OK')return;
  try{
   const result=await sendTelegramMessage(botToken,{chatId,notificationScope:'raffle-start',
    text:'🎟 Новый розыгрыш билетов!\n'+String(raffle.title||'Билеты на турнир')+'\n\nРозыгрыш уже открыт — участвуйте!',
    buttonText:'Участвовать в розыгрыше',buttonUrl:'https://t.me/Poker_dvatuza_bot/DvaTuza?startapp=r_'+encodeURIComponent(raffle.id)});
   if(!result?.ok)throw new Error('Telegram notification failed');
  }catch(error){await pipeline([['DEL',key]],{throwOnError:true});throw error;}
  await pipeline([['SET',key,'sent','EX',String(60*60*24*90)]],{throwOnError:true});
 };
}
function defaultNotifier(){return createRaffleGroupNotifier({pipeline:require('./redis').pipeline,eventChatId:require('./telegram-group-policy').eventChatId,sendTelegramMessage:require('./telegram-bot-send').sendTelegramMessage,botToken:process.env.TELEGRAM_BOT_TOKEN||process.env.TELEGRAM_TOKEN||process.env.BOT_TOKEN});}
module.exports={createRaffleGroupNotifier,defaultNotifier};
