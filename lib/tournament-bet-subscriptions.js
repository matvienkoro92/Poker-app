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
  // ПокерМанки receives event notifications on @Roman1787443.
  if (direct === "388008256") return "5053253480";
  if (/^[1-9]\d*$/.test(direct)) return direct;
  const preferred = accountId ? await getPreferredUserIdByDtId(accountId) : "";
  const match = String(preferred || "").match(/^tg_([1-9]\d*)$/);
  return match ? (match[1] === "388008256" ? "5053253480" : match[1]) : "";
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

async function notifyGroup(event, text, url, token, parseMode) {
  try {
    const id = await require("./telegram-group-policy").eventChatId();
    if (!id) return { sent: 0, configured: false };
    const result = await sendTelegramMessage(token, { chat_id: id, text, ...(parseMode ? { parseMode } : {}),
      buttonText: "Открыть событие", buttonUrl: url, notificationScope: "tournament-bet" });
    if (!result.ok) console.error("[tournament-bet] group notification failed", { eventId: event.id, hint: result.hint });
    return { sent: result.ok ? 1 : 0, configured: true };
  } catch (error) {
    console.error("[tournament-bet] group notification failed", { eventId: event.id, error: error.message });
    return { sent: 0 };
  }
}

async function notify(event, token) {
  const url = new URL(process.env.MINI_APP_URL || process.env.APP_URL || "https://t.me/Poker_dvatuza_bot/DvaTuza");
  url.searchParams.set("startapp", "tournament_bet_" + event.id);
  const entries = Array.isArray(event.entries) ? event.entries : [];
  const bank = Number(event.startingBank || 0) + entries.reduce(function (total, entry) { return total + Number(entry.stake || event.stakePrice || 0); }, 0);
  const time = String(event.tournamentTime || "").replace(/\s*мск/ig, "").trim().replace(/:00$/, "");
  const lines = ["♠ Новая «Ставка на себя»",
    String(event.title || "Турнир") + (time ? " в " + time + " мск" : ""),
    "Банк на ставку: " + bank.toLocaleString("ru-RU") + " ₽",
    "Ставка на себя: " + Number(event.stakePrice).toLocaleString("ru-RU") + " ₽",
    "Задача: пройти дальше тех, кто поставил на себя",
    "Сейчас участников " + entries.length + ".",
    "Регистрация закроется в 20:00 мск"];
  const escapeHtml = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const groupText = [escapeHtml(lines[0]), escapeHtml(lines[1]), "", "<b>" + escapeHtml(lines[2]) + "</b>",
    "", "<b>" + escapeHtml(lines[3]) + "</b>", "", ...lines.slice(4).map(escapeHtml)].join("\n");
  await notifyGroup(event, groupText, url.toString(), token, "HTML");
  const ids = await sscanall(KEY, { count: 250, maxPages: 100, context: "tournament-bet.subscribers" });
  if (!ids) throw new Error("Subscribers unavailable");
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
    'Сумма ставки: ' + Number(newcomer.stake ?? event.stakePrice ?? 0).toLocaleString("ru-RU") + ' ₽.\n' +
    'Общий банк теперь: ' + Number(bank).toLocaleString("ru-RU") + ' ₽.\n' +
    'Участников: ' + (Array.isArray(event.entries) ? event.entries.length : 0) + '.\n' +
    'Событие — турнир «' + event.title + '».\n\n' +
    '✅ Задача: пройти в турнире дальше всех, кто сделал ставку на себя, и забрать весь банк.';
  await notifyGroup(event, message, url.toString(), token);
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

async function notifyClosed(event, token) {
  if (!event || event.status !== "closed" || !token) return;
  const key = "poker_app:tournament_bet:closed_notice:" + event.id;
  const lock = await pipeline([["SET", key, "sending", "EX", "300", "NX"]], {throwOnError:true});
  if (lock?.[0]?.result !== "OK") return;
  const url = new URL(process.env.MINI_APP_URL || process.env.APP_URL || "https://t.me/Poker_dvatuza_bot/DvaTuza");
  url.searchParams.set("startapp", "tournament_bet_" + event.id);
  const entries = Array.isArray(event.entries) ? event.entries : [];
  const text = ['🔒 Регистрация в Last Longer закрыта', 'Турнир: ' + event.title,
    'Ждём окончания турниров для подведения итогов.', '', 'Участники: ' + entries.length,
    ...entries.map((entry, i) => (i + 1) + '. ' + String(entry.name || entry.accountId || 'Участник'))].join('\n');
  const result = await notifyGroup(event, text, url.toString(), token);
  await pipeline(result.sent ? [["SET",key,"sent","EX","7776000"]] : [["DEL",key]], {throwOnError:true});
}

async function notifySettled(event, token) {
  if (!event || event.status !== "settled" || !event.winnerPaidAt || !token) return;
  const entries = Array.isArray(event.entries) ? event.entries : [];
  const winner = entries.find(entry => entry.accountId === event.winnerAccountId);
  const amount = Number(event.winnerPaidAmount);
  if (!winner || event.winnerPaidAmount == null || !Number.isFinite(amount) || amount < 0) return;
  const url = new URL(process.env.MINI_APP_URL || process.env.APP_URL || "https://t.me/Poker_dvatuza_bot/DvaTuza");
  url.searchParams.set("startapp", "tournament_bet_" + event.id);
  const key = "poker_app:tournament_bet:settled_notice:" + event.id;
  const lock = await pipeline([["SET", key, "sending", "EX", "300", "NX"]], { throwOnError: true });
  if (lock?.[0]?.result !== "OK") return;
  const text = ["🏁 Событие «Ставка на себя» завершено", "Турнир: " + String(event.title || "Турнир"), "",
    "🏆 Победитель: " + String(winner.name || "Игрок"),
    "Поставил: " + Number(winner.stake ?? event.stakePrice ?? 0).toLocaleString("ru-RU") + " ₽",
    "Забрал: " + amount.toLocaleString("ru-RU") + " ₽",
    "Участников: " + entries.length].join("\n");
  const result = await notifyGroup(event, text, url.toString(), token);
  await pipeline(result.sent ? [["SET", key, "sent"]] : [["DEL", key]], { throwOnError: true });
  return result;
}

module.exports = { status, subscribe, notify, notifyParticipantJoined, notifyRegistration, notifyClosed, notifySettled, chatIdFor };
