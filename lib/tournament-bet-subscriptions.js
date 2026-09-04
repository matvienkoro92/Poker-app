"use strict";

const { pipeline, sscanall } = require("./redis");
const { getPreferredUserIdByDtId } = require("./account-id");
const { canReachTelegramBot } = require("./telegram-participation-gate");
const { sendTelegramMessage } = require("./telegram-bot-send");
const { hasAnyBotSubscription, recordBotSubscriptionTransition } = require("./bot-subscription-events");
const KEY = "poker_app:tournament_bet_subscribers";

async function chatIdFor(auth, accountId) {
  if (!auth || !auth.ok) return "";
  const identity = auth.identity || {};
  const direct = identity.vkId == null ? String(identity.id || auth.memberId || "").replace(/^tg_/, "") : "";
  if (/^[1-9]\d*$/.test(direct)) return direct;
  const preferred = accountId ? await getPreferredUserIdByDtId(accountId) : "";
  const match = String(preferred || "").match(/^tg_([1-9]\d*)$/);
  return match ? match[1] : "";
}

async function status(auth, accountId) {
  const id = await chatIdFor(auth, accountId);
  if (!id) return false;
  const rows = await pipeline([["SISMEMBER", KEY, id]], { throwOnError: true });
  return Number(rows[0].result) === 1;
}

async function subscribe(auth, accountId, enabled, token) {
  const id = await chatIdFor(auth, accountId);
  if (!id) return { ok: false, error: "Для уведомлений войдите через Telegram или привяжите Telegram к аккаунту." };
  if (enabled && !await canReachTelegramBot(id, token)) {
    return { ok: false, error: "Откройте бот @Poker_dvatuza_bot, нажмите «Старт» и повторите подписку." };
  }
  const was = await hasAnyBotSubscription(pipeline, id);
  await pipeline([[enabled ? "SADD" : "SREM", KEY, id]], { throwOnError: true });
  await recordBotSubscriptionTransition(pipeline, id, was, await hasAnyBotSubscription(pipeline, id));
  return { ok: true, subscribed: enabled };
}

async function notify(event, token) {
  const ids = await sscanall(KEY, { count: 250, maxPages: 100, context: "tournament-bet.subscribers" });
  if (!ids) throw new Error("Subscribers unavailable");
  const url = new URL(process.env.MINI_APP_URL || process.env.APP_URL || "https://t.me/Poker_dvatuza_bot/DvaTuza");
  url.searchParams.set("startapp", "tournament_bet_" + event.id);
  const lines = ["♠ Новое событие в разделе «Ставка на себя»", "", event.title,
    event.createdByPlayer ? "Личная ставка" : "Турнир вечера",
    event.tournamentGuarantee ? "Гарантия: " + event.tournamentGuarantee : "",
    event.tournamentTime ? "Старт: " + event.tournamentTime + (/мск/i.test(event.tournamentTime) ? "" : " МСК") : "",
    event.tournamentBuyin ? "Вход: " + event.tournamentBuyin : "",
    "Сумма ставки: " + Number(event.stakePrice).toLocaleString("ru-RU") + " ₽"];
  let sent = 0;
  for (const id of new Set(ids)) {
    // Recheck membership so unsubscribing during a broadcast takes effect.
    const rows = await pipeline([["SISMEMBER", KEY, id]], { throwOnError: true });
    if (Number(rows[0].result) !== 1) continue;
    const result = await sendTelegramMessage(token, { chat_id: id, text: lines.filter(Boolean).join("\n"),
      buttonText: "Открыть событие", buttonUrl: url.toString() });
    if (result.ok) sent++;
    else if (result.hint === "user_blocked") await pipeline([["SREM", KEY, id]], { throwOnError: true });
    else console.error("[tournament-bet] notification failed", { eventId: event.id, hint: result.hint });
  }
  return { sent };
}

async function notifyParticipantJoined(event, newcomer, bank, token) {
  const url = new URL(process.env.MINI_APP_URL || process.env.APP_URL || "https://t.me/Poker_dvatuza_bot/DvaTuza");
  url.searchParams.set("startapp", "tournament_bet_" + event.id);
  const message = 'Новый участник «' + newcomer.name + '» сделал ставку на себя.\n' +
    'Общий банк теперь: ' + Number(bank).toLocaleString("ru-RU") + ' ₽.\n' +
    'Событие — турнир «' + event.title + '».';
  const recipients = new Set();
  let sent = 0;
  for (const entry of event.entries || []) {
    if (entry.accountId === newcomer.accountId) continue;
    try {
      const id = await chatIdFor({ ok: true, memberId: entry.memberId }, entry.accountId);
      if (!id || recipients.has(id)) continue;
      recipients.add(id);
      const result = await sendTelegramMessage(token, { chat_id: id, text: message,
        buttonText: "Открыть событие", buttonUrl: url.toString() });
      if (result.ok) sent++;
      else console.error("[tournament-bet] participant notification failed", { eventId: event.id, hint: result.hint });
    } catch (error) {
      console.error("[tournament-bet] participant notification failed", { eventId: event.id, error: error.message });
    }
  }
  return { sent };
}

async function notifyRegistration(event, entry, bank, token) {
  const id = await chatIdFor({ ok: true, memberId: entry.memberId }, entry.accountId);
  if (!id) return { sent: 0 };
  const url = new URL(process.env.MINI_APP_URL || process.env.APP_URL || "https://t.me/Poker_dvatuza_bot/DvaTuza");
  url.searchParams.set("startapp", "tournament_bet_" + event.id);
  const message = 'Вы зарегистрированы в событии «Ставка на себя» в турнире «' + event.title + '».\n' +
    'Ваша ставка: ' + Number(entry.stake).toLocaleString("ru-RU") + ' ₽.\n' +
    'Общий банк: ' + Number(bank).toLocaleString("ru-RU") + ' ₽.';
  const result = await sendTelegramMessage(token, { chat_id: id, text: message,
    buttonText: "Открыть событие", buttonUrl: url.toString() });
  if (!result.ok) console.error("[tournament-bet] registration notification failed", { eventId: event.id, hint: result.hint });
  return { sent: result.ok ? 1 : 0 };
}

module.exports = { status, subscribe, notify, notifyParticipantJoined, notifyRegistration, chatIdFor };
