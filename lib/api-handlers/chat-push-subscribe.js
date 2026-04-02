/**
 * PWA Web Push: подписка на уведомления о сообщениях в чате.
 * GET — публичный ключ VAPID (без авторизации).
 * POST body: pokerApiAuth (initData / pwaSession / pwaVkSession) + action:
 *   status | enable | disable | subscribe
 * subscribe требует subscription: PushSubscription.toJSON().
 * Redis: poker_app:chat_push_sub:{memberId}, registry SET, disabled SET.
 * Переменные: WEBPUSH_VAPID_*, UPSTASH_REDIS_*, TELEGRAM_BOT_TOKEN.
 */
"use strict";

const crypto = require("crypto");
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

const {
  CHAT_PUSH_SUB_PREFIX,
  CHAT_PUSH_REGISTRY,
  CHAT_PUSH_DISABLED,
  redisPipeline,
} = require("../chat-webpush-notify");

function subscriptionField(endpoint) {
  return crypto.createHash("sha256").update(String(endpoint)).digest("hex").slice(0, 40);
}

function validSubscription(sub) {
  if (!sub || typeof sub !== "object") return false;
  const ep = sub.endpoint;
  if (!ep || typeof ep !== "string" || ep.length < 20) return false;
  const keys = sub.keys;
  if (!keys || typeof keys !== "object") return false;
  if (!keys.p256dh || !keys.auth) return false;
  return true;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const pub = process.env.WEBPUSH_VAPID_PUBLIC_KEY;
  const priv = process.env.WEBPUSH_VAPID_PRIVATE_KEY;
  const pushConfigured = !!(pub && priv);

  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      pushConfigured,
      publicKey: pub || null,
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  if (!REDIS_URL || !REDIS_TOKEN) {
    return res.status(500).json({ ok: false, error: "Redis not configured" });
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

  const identity = resolveTelegramIdentity(req, body, BOT_TOKEN);
  if (!identity) {
    return res.status(401).json({ ok: false, error: "Откройте в Telegram или войдите в PWA" });
  }

  const myId = memberIdFromIdentity(identity);
  if (!myId) return res.status(401).json({ ok: false, error: "Не удалось определить пользователя" });

  const action = String(body.action || body.mode || "status").toLowerCase();
  const subKey = CHAT_PUSH_SUB_PREFIX + myId;

  if (action === "status") {
    const r = await redisPipeline([
      ["SISMEMBER", CHAT_PUSH_DISABLED, myId],
      ["HLEN", subKey],
    ]);
    const disabled = r && r[0] && r[0].result === 1;
    const n = r && r[1] && Number(r[1].result);
    return res.status(200).json({
      ok: true,
      pushConfigured,
      notificationsEnabled: !disabled,
      hasSubscription: n > 0,
    });
  }

  if (!pushConfigured) {
    return res.status(503).json({ ok: false, error: "Пуши не настроены на сервере" });
  }

  if (action === "enable") {
    const out = await redisPipeline([["SREM", CHAT_PUSH_DISABLED, myId]]);
    if (!out || (out[0] && out[0].error)) {
      return res.status(503).json({ ok: false, error: "Сервис временно недоступен" });
    }
    return res.status(200).json({ ok: true, notificationsEnabled: true });
  }

  if (action === "disable") {
    await redisPipeline([
      ["DEL", subKey],
      ["SREM", CHAT_PUSH_REGISTRY, myId],
      ["SADD", CHAT_PUSH_DISABLED, myId],
    ]);
    return res.status(200).json({ ok: true, notificationsEnabled: false });
  }

  if (action === "subscribe") {
    const dis = await redisPipeline([["SISMEMBER", CHAT_PUSH_DISABLED, myId]]);
    if (dis && dis[0] && dis[0].result === 1) {
      return res.status(403).json({ ok: false, error: "Включите уведомления в профиле" });
    }
    const sub = body.subscription;
    if (!validSubscription(sub)) {
      return res.status(400).json({ ok: false, error: "Некорректная подписка push" });
    }
    const field = subscriptionField(sub.endpoint);
    const out = await redisPipeline([
      ["HSET", subKey, field, JSON.stringify(sub)],
      ["SADD", CHAT_PUSH_REGISTRY, myId],
    ]);
    if (!out || out.some((x) => x && x.error)) {
      return res.status(503).json({ ok: false, error: "Не удалось сохранить подписку" });
    }
    return res.status(200).json({ ok: true, subscribed: true });
  }

  return res.status(400).json({ ok: false, error: "Unknown action" });
};
