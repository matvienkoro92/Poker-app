'use strict';
function buildRaffleAnnouncement(raffle) {
 const rub=n=>Number(n).toLocaleString('ru-RU')+' ₽';
 const escapeHtml=value=>String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
 const groups=(Array.isArray(raffle.groups)?raffle.groups:[]).filter(g=>Number(g.count)>0);
 let total=0,known=groups.length>0;
 const lines=groups.map(g=>{
  const prize=String(g.prize||'').replace(/\u00a0|\u202f/g,' ');
  const match=prize.match(/(\d[\d\s]*(?:[.,]\d+)?)\s*(?:₽|руб\.?|р\.?)/i);
  const amount=match?Number(match[1].replace(/\s/g,'').replace(',','.')):0;
  if(amount>0)total+=amount*Number(g.count);else known=false;
  return '• '+g.count+' бил. '+(amount?'по '+rub(amount)+' — ':'— ')+escapeHtml(prize);
 });
 const totalLine=known?'Общая сумма: '+rub(total):'Общая сумма: не указана';
 return ['🎟 Новый розыгрыш билетов!',escapeHtml(raffle.title||'Билеты на турнир'),'','<b>'+totalLine+'</b>','',...lines,'','Розыгрыш открыт — участвуйте!'].join('\n');
}
function createRaffleGroupNotifier({pipeline,eventChatId,sendTelegramMessage,botToken}) {
 return async function notify(raffle) {
  if(!botToken||!raffle?.id||raffle.status!=='active'||raffle.prizeKind!=='tournament_ticket')return;
  const chatId=await eventChatId();if(!chatId)return;
  const key='poker_app:raffle_group_start:'+String(raffle.id);
  const lock=await pipeline([['SET',key,'sending','EX','300','NX']],{throwOnError:true});
  if(lock?.[0]?.result!=='OK')return;
  try{
   const result=await sendTelegramMessage(botToken,{chatId,notificationScope:'raffle-start',
    text:buildRaffleAnnouncement(raffle),parseMode:'HTML',
    buttonText:'Участвовать в розыгрыше',buttonUrl:'https://t.me/Poker_dvatuza_bot/DvaTuza?startapp=r_'+encodeURIComponent(raffle.id)});
   if(!result?.ok)throw new Error('Telegram notification failed');
  }catch(error){await pipeline([['DEL',key]],{throwOnError:true});throw error;}
  await pipeline([['SET',key,'sent','EX',String(60*60*24*90)]],{throwOnError:true});
 };
}
function defaultNotifier(){return createRaffleGroupNotifier({pipeline:require('./redis').pipeline,eventChatId:require('./telegram-group-policy').eventChatId,sendTelegramMessage:require('./telegram-bot-send').sendTelegramMessage,botToken:process.env.TELEGRAM_BOT_TOKEN||process.env.TELEGRAM_TOKEN||process.env.BOT_TOKEN});}
function buildRaffleCompletedAnnouncement(raffle) {
  const winnersCount = Array.isArray(raffle.winners) ? raffle.winners.filter(Boolean).length : 0;
  const title = String(raffle.title || "Розыгрыш").trim();
  return ["🎉 Розыгрыш завершён!", title, "Победителей: " + winnersCount].join("\n\n");
}

function createRaffleCompletedGroupNotifier({ pipeline, eventChatId, sendTelegramMessage, botToken, miniAppUrl }) {
  return async function notifyCompleted(raffle) {
    if (!botToken || !raffle || !raffle.id || raffle.status !== "drawn") return;
    const chatId = await eventChatId();
    if (!chatId) return;
    const key = "poker_app:raffle_group_completed:" + String(raffle.id);
    const lock = await pipeline([["SET", key, "sending", "EX", "300", "NX"]], { throwOnError: true });
    if (lock?.[0]?.result !== "OK") return;
    try {
      const result = await sendTelegramMessage(botToken, {
        chatId,
        notificationScope: "raffle-completed",
        text: buildRaffleCompletedAnnouncement(raffle),
        buttonText: "Посмотреть розыгрыш",
        buttonUrl: require("./raffle-notifications").buildRaffleCompletedLink(miniAppUrl, raffle),
      });
      if (!result?.ok) throw new Error("Telegram completion notification failed");
    } catch (error) {
      await pipeline([["DEL", key]], { throwOnError: true });
      throw error;
    }
    // Keep the delivery marker even when an old raffle is reopened or rerolled.
    await pipeline([["SET", key, "sent"]], { throwOnError: true });
  };
}

function defaultCompletedNotifier() {
  return createRaffleCompletedGroupNotifier({
    pipeline: require("./redis").pipeline,
    eventChatId: require("./telegram-group-policy").eventChatId,
    sendTelegramMessage: require("./telegram-bot-send").sendTelegramMessage,
    botToken: process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN,
    miniAppUrl: process.env.MINI_APP_URL || process.env.APP_URL || "",
  });
}
module.exports = { createRaffleGroupNotifier, defaultNotifier, buildRaffleAnnouncement,
  createRaffleCompletedGroupNotifier, defaultCompletedNotifier, buildRaffleCompletedAnnouncement };
