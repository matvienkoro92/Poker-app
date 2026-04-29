"use strict";

const { sendTelegramMessage: sendTelegramBotMessage } = require("./telegram-bot-send");

const TG_SEND_MAX = 4090;
const DEFAULT_TELEGRAM_MINI_APP = "https://t.me/Poker_dvatuza_bot/DvaTuza";

function buildClubChatMiniAppLink(miniAppUrl) {
  let base = String(miniAppUrl || "").trim();
  if (!base || base.indexOf("t.me/") === -1) base = DEFAULT_TELEGRAM_MINI_APP;
  else base = base.replace(/\/+$/, "").replace(/\)+$/, "");
  const sep = base.includes("?") ? "&" : "?";
  return base + sep + "startapp=club_chat";
}

async function sendTelegram(botToken, toChatId, text, inlineButton) {
  if (!botToken || !toChatId) return;
  const r = await sendTelegramBotMessage(botToken, {
    chat_id: String(toChatId),
    text: String(text || ""),
    maxText: TG_SEND_MAX,
    buttonText: inlineButton && inlineButton.text ? inlineButton.text : undefined,
    buttonUrl: inlineButton && inlineButton.url ? inlineButton.url : undefined,
  });
  if (!r.ok) {
    console.error("[chat] Telegram sendMessage failed", {
      chat_id: String(toChatId),
      hint: r.hint,
      error_code: r.error_code,
    });
  }
}

function runAsyncChatSideEffect(label, task) {
  try {
    Promise.resolve()
      .then(task)
      .catch((err) => {
        console.error(label, err && err.message ? err.message : err);
      });
  } catch (err) {
    console.error(label, err && err.message ? err.message : err);
  }
}

async function notifyAdminsNewClubChatApplication(options) {
  const opts = options || {};
  const botToken = opts.botToken || "";
  const adminIds = Array.isArray(opts.adminIds) ? opts.adminIds : [];
  if (!botToken || !adminIds.length) return;
  const applicantMyId = opts.applicantMyId;
  const identity = opts.identity || {};
  const redisNick = typeof opts.getVisitorUsername === "function" ? await opts.getVisitorUsername(applicantMyId) : "";
  const customApp = typeof opts.getVisitorChatDisplayName === "function" ? await opts.getVisitorChatDisplayName(applicantMyId) : "";
  const fallbackName =
    typeof opts.buildChatDisplayName === "function"
      ? opts.buildChatDisplayName(identity || {}, redisNick)
      : String(redisNick || "Игрок");
  const nameNick = customApp && String(customApp).trim() ? String(customApp).trim() : fallbackName;
  const idLine =
    identity && identity.vkId != null
      ? "VK id: " + String(identity.vkId)
      : "Telegram id: " + String(opts.applicantNumericId || "");
  const text = [
    "💬 Новая заявка в главный чат клуба",
    "",
    "Имя и ник: " + nameNick,
    idLine,
    "",
    "Одобрить или отклонить: мини-приложение → Чат → долгое нажатие на «Главный чат».",
  ].join("\n");
  const openUrl = buildClubChatMiniAppLink(opts.miniAppUrl);
  const btn = openUrl.startsWith("http") ? { text: "Открыть приложение", url: openUrl } : undefined;
  await Promise.all(adminIds.map((id) => sendTelegram(botToken, id, text, btn)));
}

module.exports = {
  DEFAULT_TELEGRAM_MINI_APP,
  TG_SEND_MAX,
  buildClubChatMiniAppLink,
  notifyAdminsNewClubChatApplication,
  runAsyncChatSideEffect,
  sendTelegram,
};
