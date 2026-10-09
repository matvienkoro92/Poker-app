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
  const escape = value => String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const winners = (Array.isArray(raffle.winners) ? raffle.winners : []).filter(Boolean);
  const ready = winner => String(winner.winnerReady).toLowerCase() === "true";
  const missed = winner => winner.cashSeatingMonitor?.status === "returned" || winner.winnerReadyExpired === true || winner.winnerBurned === true || ["missed", "burned"].includes(String(winner.winnerReadyState || "").toLowerCase());
  const line = winner => {
    const name = escape(winner.name || winner.pokerPlusNickname || "Игрок");
    const username = String(winner.telegramUsername || "").replace(/^@+/, "");
    const mention = /^[a-zA-Z0-9_]+$/.test(username) ? "@" + username
      : /^\d+$/.test(String(winner.userId || "")) ? '<a href="tg://user?id=' + winner.userId + '">' + name + '</a>' : "";
    return "• " + name + (mention ? " — " + mention : "") + (missed(winner) ? (winner.cashSeatingMonitor?.status === "returned" ? " ❌ — не сел за 10 минут" : " ❌ — не забрал") : (ready(winner) ? " ✅" : ""));
  };
  const confirmed = winners.filter(winner => !missed(winner) && ready(winner));
  const waiting = winners.filter(winner => !missed(winner) && !ready(winner));
  const unclaimed = winners.filter(missed);
  const winnerList = rows => [rows.filter(ready).map(line).join("\n"), rows.filter(winner => !ready(winner)).map(line).join("\n")].filter(Boolean).join("\n\n");
  const active = winners.filter(winner => !missed(winner));
  const rerolled = active.filter(winner => winner.winnerReroll === true);
  return ["🎉 Розыгрыш завершён!", escape(String(raffle.title || "Розыгрыш").trim()),
    "Победителей: " + (confirmed.length + waiting.length),
    winnerList(active.filter(winner => winner.winnerReroll !== true)),
    rerolled.length ? "Победители реролла:\n" + winnerList(rerolled) : "",
    unclaimed.length ? "Не забрали билет:\n" + unclaimed.map(line).join("\n") : "",
    waiting.length ? "Нажмите «Готов», чтобы забрать билет." : ""].filter(Boolean).join("\n\n");
}

function createRaffleCompletedGroupNotifier({ pipeline, eventChatId, sendTelegramMessage, editTelegramMessage, botToken, miniAppUrl }) {
  return async function notifyCompleted(raffle) {
    if (!botToken || !raffle || !raffle.id || raffle.status !== "drawn") return;
    const chatId = await eventChatId();
    if (!chatId) return;
    const key = "poker_app:raffle_group_completed:" + String(raffle.id);
    const saved = await pipeline([["GET", key + ":message"]], { throwOnError: true });
    const message = saved?.[0]?.result ? JSON.parse(saved[0].result) : null;
    if (message && editTelegramMessage) {
      const result = await editTelegramMessage(botToken, {
        chatId: message.chatId, messageId: message.messageId, notificationScope: "raffle-completed",
        text: buildRaffleCompletedAnnouncement(raffle), parseMode: "HTML",
        buttonText: "Посмотреть розыгрыш",
        buttonUrl: require("./raffle-notifications").buildRaffleCompletedLink(miniAppUrl, raffle),
      });
      if (!result?.ok) throw new Error("Telegram completion update failed");
      return;
    }
    const lock = await pipeline([["SET", key, "sending", "EX", "300", "NX"]], { throwOnError: true });
    if (lock?.[0]?.result !== "OK") return;
    try {
      const result = await sendTelegramMessage(botToken, {
        chatId,
        notificationScope: "raffle-completed",
        text: buildRaffleCompletedAnnouncement(raffle),
        parseMode: "HTML",
        buttonText: "Посмотреть розыгрыш",
        buttonUrl: require("./raffle-notifications").buildRaffleCompletedLink(miniAppUrl, raffle),
      });
      if (!result?.ok) throw new Error("Telegram completion notification failed");
      if (result.messageId) await pipeline([["SET", key + ":message", JSON.stringify({ chatId, messageId: result.messageId })]], { throwOnError: true });
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
    editTelegramMessage: require("./telegram-bot-send").editTelegramMessage,
    botToken: process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN,
    miniAppUrl: process.env.MINI_APP_URL || process.env.APP_URL || "",
  });
}
module.exports = { createRaffleGroupNotifier, defaultNotifier, buildRaffleAnnouncement,
  createRaffleCompletedGroupNotifier, defaultCompletedNotifier, buildRaffleCompletedAnnouncement };
