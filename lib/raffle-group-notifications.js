'use strict';
function buildRaffleAnnouncement(raffle) {
 const rub=n=>Number(n).toLocaleString('ru-RU')+' ₽';
 const escapeHtml=value=>String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
 const cash=raffle.prizeKind==='cash';
 const title=String(raffle.title||'').trim();
 const destination=cash?title.replace(/^.*?на\s+к[еэ]ш\s*/i,'').trim():title;
 const groups=(Array.isArray(raffle.groups)?raffle.groups:[]).filter(g=>Number(g.count)>0);
 let total=0,known=groups.length>0;
 const lines=groups.map(g=>{
  const prize=String(g.prize||'').replace(/\u00a0|\u202f/g,' ');
  const match=prize.match(/(\d[\d\s]*(?:[.,]\d+)?)\s*(?:₽|руб\.?|р\.?)/i) || (cash?prize.match(/^\s*(\d[\d\s]*(?:[.,]\d+)?)\s*$/):null);
  const amount=match?Number(match[1].replace(/\s/g,'').replace(',','.')):0;
  if(amount>0)total+=amount*Number(g.count);else known=false;
  if(cash) return '• '+g.count+' бай-ин. '+(amount?'по '+rub(amount):escapeHtml(prize))+(destination?' — '+escapeHtml(destination):'');
  return '• '+g.count+' бил. '+(amount?'по '+rub(amount)+' — ':'— ')+escapeHtml(prize);
 });
 const totalLine=known?'Общая сумма: '+rub(total):'Общая сумма: не указана';
 return [cash?'💵 Новый розыгрыш бай-инов на кеш!':'🎟 Новый розыгрыш билетов!',cash?'Куда: '+escapeHtml(destination||'кеш-столы клуба'):escapeHtml(raffle.title||'Билеты на турнир'),'','<b>'+totalLine+'</b>','',...lines,'','Розыгрыш открыт — участвуйте!'].join('\n');
}
function createRaffleGroupNotifier({pipeline,eventChatId,sendTelegramMessage,botToken}) {
 return async function notify(raffle) {
  if(!botToken||!raffle?.id||raffle.status!=='active'||!['tournament_ticket','cash'].includes(raffle.prizeKind))return;
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
const GROUP_TIMER_KEY = "poker_app:raffle_group_timers:v1";
function winnerCountdown(winner, now = Date.now()) {
  if (winner.winnerReadyExpired || winner.winnerBurned || ["missed", "burned"].includes(winner.winnerReadyState)) return "";
  const monitor = winner.cashSeatingMonitor;
  const seating = monitor?.status === "pending";
  if (monitor && !seating) return "";
  if (!seating && String(winner.winnerReady).toLowerCase() === "true") return "";
  const deadline = seating ? Date.parse(monitor.issuedAt) + require("./raffle-cash-seating").WINDOW_MS : Date.parse(winner.winnerReadyDeadlineAt);
  if (!Number.isFinite(deadline)) return "";
  const minutes = Math.max(0, Math.ceil((deadline - now) / 60000));
  return seating ? "⏳ сесть за стол: " + minutes + " мин" : "⏳ Не готов · осталось " + minutes + " мин";
}
function buildRaffleCompletedAnnouncement(raffle, now = Date.now()) {
  const escape = value => String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const winners = (Array.isArray(raffle.winners) ? raffle.winners : []).filter(Boolean);
  const ready = winner => String(winner.winnerReady).toLowerCase() === "true";
  const missed = winner => winner.cashSeatingMonitor?.status === "returned" || winner.winnerReadyExpired === true || winner.winnerBurned === true || ["missed", "burned"].includes(String(winner.winnerReadyState || "").toLowerCase());
  const line = winner => {
    const name = escape(winner.name || winner.pokerPlusNickname || "Игрок");
    const username = String(winner.telegramUsername || "").replace(/^@+/, "");
    const mention = /^[a-zA-Z0-9_]+$/.test(username) ? "@" + username
      : /^\d+$/.test(String(winner.userId || "")) ? '<a href="tg://user?id=' + winner.userId + '">' + name + '</a>' : "";
    const playerId = String(winner.p21Id || "").trim();
    const countdown = winnerCountdown(winner, now);
    const cash = raffle.prizeKind === "cash";
    const seated = cash && (winner.cashSeatingMonitor?.status === "seated" || winner.winnerSeatStatus === "seated" || winner.winnerApiSeated === true);
    const seatLabel = seated ? " · сел 🪑" : cash && winner.winnerSeatStatus === "not_seated" ? " · не сел ❌"
      : cash && winner.winnerStatus === "ok" && !missed(winner) ? " · 🔵 ожидаем посадку" : "";
    return "• " + name + (mention ? " — " + mention : "") + (playerId ? " · ID " + escape(playerId) : "") + (missed(winner) ? (winner.cashSeatingMonitor?.status === "returned" ? " ❌ — не сел за 10 минут" : " ❌ — не забрал") : (ready(winner) ? " ✅" : "")) + seatLabel + (countdown ? " · " + countdown : "");
  };
  const confirmed = winners.filter(winner => !missed(winner) && ready(winner));
  const waiting = winners.filter(winner => !missed(winner) && !ready(winner));
  const unclaimed = winners.filter(missed);
  const winnerList = rows => [rows.filter(ready).map(line).join("\n"), rows.filter(winner => !ready(winner)).map(line).join("\n")].filter(Boolean).join("\n\n");
  const active = winners.filter(winner => !missed(winner));
  const rerolled = active.filter(winner => winner.winnerReroll === true);
  const cashRaffle = raffle.prizeKind === "cash";
  const title = String(raffle.title || "Розыгрыш").trim();
  const destination = cashRaffle ? title.replace(/^.*?на\s+к[еэ]ш\s*/i, "").trim() : title;
  const cashPrizes = cashRaffle ? (raffle.groups || []).filter(group => Number(group.count) > 0).map(group => {
    const prize = String(group.prize || "").replace(/\u00a0|\u202f/g, " ");
    const amount = prize.match(/(\d[\d\s]*(?:[.,]\d+)?)\s*(?:₽|руб\.?|р\.?)/i) || prize.match(/^\s*(\d[\d\s]*(?:[.,]\d+)?)\s*$/);
    return amount ? Number(group.count) + " бай-ин. по " + Number(amount[1].replace(/\s/g, "").replace(",", ".")).toLocaleString("ru-RU") + " ₽" : Number(group.count) + " бай-ин. — " + escape(prize);
  }).join("\n") : "";
  return ["🎉 Розыгрыш завершён!", cashRaffle ? "Куда: " + escape(destination) : escape(title),
    cashPrizes,
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
    const text = buildRaffleCompletedAnnouncement(raffle);
    const hasTimer = (raffle.winners || []).some(winner => winner && winnerCountdown(winner));
    await pipeline([[hasTimer ? "SADD" : "SREM", GROUP_TIMER_KEY, String(raffle.id)]], { throwOnError: true });
    const saved = await pipeline([["GET", key + ":message"]], { throwOnError: true });
    const message = saved?.[0]?.result ? JSON.parse(saved[0].result) : null;
    if (message && editTelegramMessage) {
      if (message.text === text) return;
      const result = await editTelegramMessage(botToken, {
        chatId: message.chatId, messageId: message.messageId, notificationScope: "raffle-completed",
        text, parseMode: "HTML",
        buttonText: "Посмотреть розыгрыш",
        buttonUrl: require("./raffle-notifications").buildRaffleCompletedLink(miniAppUrl, raffle),
      });
      if (!result?.ok) throw new Error("Telegram completion update failed");
      await pipeline([["SET", key + ":message", JSON.stringify({ ...message, text })]], { throwOnError: true });
      return;
    }
    const lock = await pipeline([["SET", key, "sending", "EX", "300", "NX"]], { throwOnError: true });
    if (lock?.[0]?.result !== "OK") return;
    try {
      const result = await sendTelegramMessage(botToken, {
        chatId,
        notificationScope: "raffle-completed",
        text,
        parseMode: "HTML",
        buttonText: "Посмотреть розыгрыш",
        buttonUrl: require("./raffle-notifications").buildRaffleCompletedLink(miniAppUrl, raffle),
      });
      if (!result?.ok) throw new Error("Telegram completion notification failed");
      if (result.messageId) await pipeline([["SET", key + ":message", JSON.stringify({ chatId, messageId: result.messageId, text })]], { throwOnError: true });
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
async function refreshGroupTimers({ pipeline = require("./redis").pipeline, notify = defaultCompletedNotifier() } = {}) {
  const rows = await pipeline([["SMEMBERS", GROUP_TIMER_KEY]], { throwOnError: true });
  const results = await Promise.allSettled((rows?.[0]?.result || []).map(async id => {
    const stored = await pipeline([["GET", "poker_app:raffle:" + id]], { throwOnError: true });
    const raffle = stored?.[0]?.result ? JSON.parse(stored[0].result) : null;
    if (!raffle || raffle.status !== "drawn") {
      await pipeline([["SREM", GROUP_TIMER_KEY, id]], { throwOnError: true });
      return;
    }
    await notify({ ...raffle, id });
  }));
  if (results.some(result => result.status === "rejected")) throw new Error("Group timer update failed");
}
module.exports = { winnerCountdown, refreshGroupTimers, createRaffleGroupNotifier, defaultNotifier, buildRaffleAnnouncement,
  createRaffleCompletedGroupNotifier, defaultCompletedNotifier, buildRaffleCompletedAnnouncement };
