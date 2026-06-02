"use strict";

const DEFAULT_BOT_HANDLE = "@Poker_dvatuza_bot";
const DEFAULT_CHANNEL_HANDLE = "@Dva_tuza_club";

function normalizeTelegramHandle(raw, fallback) {
  let value = String(raw || fallback || "").trim();
  if (!value) return "";
  const tmeMatch = value.match(/(?:https?:\/\/)?t\.me\/([^/?#]+)/i);
  if (tmeMatch && tmeMatch[1]) value = tmeMatch[1];
  value = value.replace(/^@+/, "").trim();
  return value ? "@" + value : "";
}

function telegramHandleUrl(handle) {
  const normalized = normalizeTelegramHandle(handle, "");
  return normalized ? "https://t.me/" + normalized.replace(/^@+/, "") : "";
}

function requiredBotHandle() {
  const handle = normalizeTelegramHandle(process.env.TELEGRAM_BOT_USERNAME || process.env.BOT_USERNAME || DEFAULT_BOT_HANDLE, DEFAULT_BOT_HANDLE);
  return handle.toLowerCase() === DEFAULT_BOT_HANDLE.toLowerCase() ? DEFAULT_BOT_HANDLE : handle;
}

function requiredChannelHandle(channel) {
  const handle = normalizeTelegramHandle(channel || process.env.RAFFLE_CHANNEL || DEFAULT_CHANNEL_HANDLE, DEFAULT_CHANNEL_HANDLE);
  return handle.toLowerCase() === DEFAULT_CHANNEL_HANDLE.toLowerCase() ? DEFAULT_CHANNEL_HANDLE : handle;
}

function numericTelegramId(memberId) {
  const raw = String(memberId || "").trim();
  const id = raw.replace(/^tg_/, "");
  return /^\d+$/.test(id) ? id : "";
}

async function fetchTelegramJson(url) {
  try {
    const res = await fetch(url);
    const data = await res.json().catch(() => ({}));
    if (data && typeof data === "object") return data;
    return { ok: !!(res && res.ok), result: data };
  } catch (e) {
    return null;
  }
}

function telegramOkResult(data) {
  return !!(data && data.ok === true && data.result);
}

async function canReachTelegramBot(telegramId, botToken) {
  if (!botToken || !telegramId) return false;
  const url = "https://api.telegram.org/bot" + botToken + "/getChat?chat_id=" + encodeURIComponent(String(telegramId));
  const data = await fetchTelegramJson(url);
  return telegramOkResult(data);
}

function isActiveChannelStatus(status) {
  return ["member", "administrator", "creator"].includes(String(status || ""));
}

async function isTelegramChannelSubscriber(telegramId, botToken, channelHandle) {
  if (!botToken || !telegramId) return false;
  const channel = requiredChannelHandle(channelHandle);
  if (!channel) return false;
  const url =
    "https://api.telegram.org/bot" +
    botToken +
    "/getChatMember?chat_id=" +
    encodeURIComponent(channel) +
    "&user_id=" +
    encodeURIComponent(String(telegramId));
  const data = await fetchTelegramJson(url);
  if (data && data.ok === true && data.result === true) return true;
  const status = data && data.result && data.result.status;
  return isActiveChannelStatus(status);
}

function buildParticipationGateError(missing, options) {
  const opts = options && typeof options === "object" ? options : {};
  const botHandle = requiredBotHandle();
  const channelHandle = requiredChannelHandle(opts.channelHandle);
  const botUrl = telegramHandleUrl(botHandle);
  const channelUrl = telegramHandleUrl(channelHandle);
  const actionText = String(opts.actionText || "нажмите кнопку участия снова").trim();
  const featureText = String(opts.featureText || "участия").trim();
  const hasBot = missing.indexOf("bot") !== -1;
  const hasChannel = missing.indexOf("channel") !== -1;
  let code = "SUBSCRIPTION_REQUIRED";
  let openUrl = botUrl || channelUrl;
  let error =
    "Для " + featureText + " нужно открыть бота " + botHandle + " и подписаться на канал " + channelHandle + ".";
  if (hasBot && hasChannel) {
    error +=
      " Сейчас не подтверждены оба условия. Откройте " +
      botHandle +
      ", нажмите Start или отправьте /start, затем подпишитесь на " +
      channelHandle +
      ". После этого вернитесь в приложение и " +
      actionText +
      ".";
  } else if (hasBot) {
    code = "BOT_REQUIRED";
    openUrl = botUrl || channelUrl;
    error =
      "Бот клуба не видит ваш чат. Откройте " +
      botHandle +
      ", нажмите Start или отправьте /start. После этого вернитесь в приложение и " +
      actionText +
      ".";
  } else if (hasChannel) {
    code = "CHANNEL_REQUIRED";
    openUrl = channelUrl || botUrl;
    error =
      "Не вижу подписку на канал " +
      channelHandle +
      ". Откройте канал, нажмите «Подписаться», затем вернитесь в приложение и " +
      actionText +
      ".";
  }
  return {
    ok: false,
    status: 403,
    code,
    error,
    botUrl,
    channelUrl,
    openUrl,
    missing,
  };
}

async function checkTelegramParticipationGate(memberId, botToken, options) {
  const telegramId = numericTelegramId(memberId);
  const opts = options && typeof options === "object" ? options : {};
  if (!telegramId) {
    const botHandle = requiredBotHandle();
    const channelHandle = requiredChannelHandle(opts.channelHandle);
    return {
      ok: false,
      status: 403,
      code: "TELEGRAM_REQUIRED",
      error:
        "Для участия нужно быть подписанным на бота " +
        botHandle +
        " и на канал клуба " +
        channelHandle +
        ". Откройте бота, нажмите Start или отправьте /start, затем подпишитесь на канал и попробуйте снова.",
      botUrl: telegramHandleUrl(botHandle),
      channelUrl: telegramHandleUrl(channelHandle),
      openUrl: telegramHandleUrl(botHandle),
      missing: ["telegram"],
    };
  }
  const botOk = await canReachTelegramBot(telegramId, botToken);
  const channelOk = await isTelegramChannelSubscriber(telegramId, botToken, opts.channelHandle);
  const missing = [];
  if (!botOk) missing.push("bot");
  if (!channelOk) missing.push("channel");
  if (!missing.length) {
    return { ok: true, botSubscribed: true, channelSubscribed: true };
  }
  return buildParticipationGateError(missing, opts);
}

module.exports = {
  canReachTelegramBot,
  checkTelegramParticipationGate,
  isTelegramChannelSubscriber,
  requiredBotHandle,
  requiredChannelHandle,
  telegramHandleUrl,
};
