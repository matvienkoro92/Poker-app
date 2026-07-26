/**
 * Подписка на уведомления о новых розыгрышах.
 * POST body: { initData[, unsubscribe] } или { pwaSession[, unsubscribe] } (PWA после Telegram Login).
 * Переменные: TELEGRAM_BOT_TOKEN, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN.
 */
const crypto = require("crypto");
const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
const { ensureDtIdForUserId, getPreferredUserIdByDtId } = require("../account-id");
const { verifyPwaSessionToken } = require("../poker-pwa-session");
const { buildMissingRequirementDetails, canReachTelegramBot, requiredBotHandle, telegramHandleUrl } = require("../telegram-participation-gate");
const {
  hasAnyBotSubscription,
  recordBotSubscriptionTransition,
} = require("../bot-subscription-events");

const BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN ||
  process.env.TELEGRAM_TOKEN ||
  process.env.BOT_TOKEN ||
  "";
const RAFFLE_SUBSCRIBERS_KEY = "poker_app:raffle_subscribers";
const RAFFLE_ACCOUNT_SUBSCRIBERS_KEY = "poker_app:raffle_account_subscribers";

function validateTelegramWebAppData(initData, botToken) {
  if (!initData || !botToken) return null;
  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  params.delete("hash");
  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join("\n");
  const secretKey = crypto
    .createHmac("sha256", "WebAppData")
    .update(botToken)
    .digest();
  const calculatedHash = crypto
    .createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");
  if (calculatedHash !== hash) return null;
  const userStr = params.get("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (e) {
    return null;
  }
}

async function redisCommand(command, ...args) {
  if (!redisConfigured()) return { error: "not_configured" };
  const data = await redisPipeline([[command, ...args]]);
  if (!Array.isArray(data) || !data[0]) return { error: "request_failed" };
  if (data[0].error) return { error: "redis_error" };
  return { result: data[0].result };
}

async function raffleAccountSubscriberId(memberId) {
  const raw = String(memberId || "").trim();
  if (!raw || /^guest_/.test(raw)) return "";
  if (/^ID\d{6}$/.test(raw)) return raw;
  try {
    return (await ensureDtIdForUserId(raw)) || "";
  } catch (e) {
    return "";
  }
}

async function resolveTelegramChatIdFromAccount(accountId) {
  const id = String(accountId || "").trim();
  if (!id) return "";
  try {
    const preferred = await getPreferredUserIdByDtId(id);
    const m = String(preferred || "").trim().match(/^tg_(\d+)$/);
    return m && m[1] ? m[1] : "";
  } catch (e) {
    return "";
  }
}

function botRequiredPayload(extra) {
  const botHandle = requiredBotHandle();
  const botUrl = telegramHandleUrl(botHandle);
  const opts = extra && typeof extra === "object" ? extra : {};
  return {
    ok: false,
    code: "BOT_REQUIRED",
    error:
      opts.noTelegramId === true
        ? "Уведомления о розыгрышах приходят в Telegram. Откройте " +
          botHandle +
          ", нажмите Start или отправьте /start, затем войдите через Telegram в приложении и нажмите «Подписаться» снова."
        : "Бот клуба не видит ваш чат. Откройте " +
          botHandle +
          ", нажмите Start или отправьте /start, затем вернитесь в приложение и нажмите «Подписаться» снова.",
    botHandle,
    botUrl,
    openUrl: botUrl,
    missing: ["bot"],
    missingRequirements: buildMissingRequirementDetails(["bot"]),
  };
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  if (!BOT_TOKEN) {
    return res.status(500).json({ ok: false, error: "Set TELEGRAM_BOT_TOKEN" });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch (e) {
    return res.status(400).json({ ok: false, error: "Invalid JSON" });
  }

  var telegramChatId = "";
  var accountSubscriberId = "";
  const initData = body.initData || body.init_data;
  if (initData) {
    const user = validateTelegramWebAppData(String(initData), BOT_TOKEN);
    if (user && user.id != null) {
      telegramChatId = String(user.id);
      accountSubscriberId = await raffleAccountSubscriberId("tg_" + telegramChatId);
    }
  }
  if (!telegramChatId && !accountSubscriberId) {
    const bPwa = String(body.pwaSession || body.pwa_session || "").trim();
    if (bPwa) {
      const pv = verifyPwaSessionToken(bPwa, BOT_TOKEN);
      if (pv && pv.id != null) {
        const memberId = String(pv.memberId || "").trim();
        const numericId = Number(pv.id);
        if (Number.isFinite(numericId) && numericId > 0) {
          telegramChatId = String(Math.trunc(numericId));
        } else if (/^tg_\d+$/.test(memberId)) {
          telegramChatId = memberId.replace(/^tg_/, "");
        }
        accountSubscriberId = await raffleAccountSubscriberId(
          memberId || (telegramChatId ? "tg_" + telegramChatId : "")
        );
      }
    }
  }
  if (!telegramChatId && !accountSubscriberId) {
    const vkHint = String(body.pwaVkSession || body.pwa_vk_session || "").trim();
    if (vkHint) {
      return res.status(400).json({
        ok: false,
        error:
          "Уведомления о розыгрышах приходят в Telegram. Войдите через Telegram в приложении или откройте мини‑апп в Telegram.",
      });
    }
    return res.status(400).json({
      ok: false,
      error: "Откройте в Telegram или войдите через Telegram на сайте (PWA).",
    });
  }
  const unsubscribe = !!(body.unsubscribe || body.unsub);
  if (!telegramChatId && accountSubscriberId) {
    telegramChatId = await resolveTelegramChatIdFromAccount(accountSubscriberId);
  }
  const wasBotSubscribed = await hasAnyBotSubscription(redisPipeline, telegramChatId);

  if (unsubscribe) {
    const commands = [];
    if (telegramChatId) {
      commands.push(["SREM", RAFFLE_SUBSCRIBERS_KEY, telegramChatId]);
    }
    if (accountSubscriberId) {
      commands.push(["SREM", RAFFLE_ACCOUNT_SUBSCRIBERS_KEY, accountSubscriberId]);
    }
    if (!commands.length) commands.push(["SREM", RAFFLE_SUBSCRIBERS_KEY, ""]);
    const out = await redisPipeline(commands);
    if (!out || (out[0] && out[0].error)) {
      return res
        .status(503)
        .json({ ok: false, error: "Сервис временно недоступен" });
    }
    const isBotSubscribed = await hasAnyBotSubscription(redisPipeline, telegramChatId);
    await recordBotSubscriptionTransition(redisPipeline, telegramChatId, wasBotSubscribed, isBotSubscribed);
    return res.status(200).json({ ok: true, subscribed: false });
  }

  if (!telegramChatId) {
    return res.status(400).json(botRequiredPayload({ noTelegramId: true }));
  }
  const botReachable = await canReachTelegramBot(telegramChatId, BOT_TOKEN);
  if (!botReachable) {
    return res.status(403).json(botRequiredPayload());
  }

  const commands = [];
  if (telegramChatId) {
    commands.push(["SADD", RAFFLE_SUBSCRIBERS_KEY, telegramChatId]);
  }
  if (accountSubscriberId) {
    commands.push(["SADD", RAFFLE_ACCOUNT_SUBSCRIBERS_KEY, accountSubscriberId]);
  }
  if (accountSubscriberId) {
    commands.push(["SREM", RAFFLE_SUBSCRIBERS_KEY, "0"]);
    commands.push(["HDEL", "poker_app:bot_subscribed_at", "0"]);
  }
  const out = await redisPipeline(commands);
  if (!out || (out[0] && out[0].error)) {
    return res
      .status(503)
      .json({
        ok: false,
        error: "Сервис временно недоступен. Попробуйте позже.",
      });
  }
  const isBotSubscribed = await hasAnyBotSubscription(redisPipeline, telegramChatId);
  await recordBotSubscriptionTransition(redisPipeline, telegramChatId, wasBotSubscribed, isBotSubscribed);
  return res.status(200).json({
    ok: true,
    subscribed: true,
    telegramSubscribed: !!telegramChatId,
    accountSubscribed: !!accountSubscriberId,
  });
};
