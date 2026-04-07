/**
 * GET  /api/chat-push-admin-broadcast — только админ: число и список подписчиков Web Push чата
 *      (включены оповещения и есть сохранённая подписка).
 * POST /api/chat-push-admin-broadcast — рассылка всем таким подписчикам (title + text).
 */
"use strict";

const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const ADMIN_IDS = (process.env.TELEGRAM_ADMIN_ID || "388008256,2144406710,1897001087")
  .toString()
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

function isAdmin(memberId) {
  const id = String(memberId || "").replace(/^tg_/, "");
  return Boolean(id && ADMIN_IDS.length > 0 && ADMIN_IDS.includes(id));
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (!BOT_TOKEN) {
    return res.status(500).json({ ok: false, error: "Set TELEGRAM_BOT_TOKEN" });
  }

  const {
    listActiveChatPushSubscribers,
    broadcastAllChatPushSubscribersInner,
    readVapidEnv,
    CHAT_PUSH_ADMIN_TITLE_MAX,
    CHAT_PUSH_ADMIN_BODY_MAX,
  } = require("../chat-webpush-notify");

  if (req.method === "GET") {
    const identity = resolveTelegramIdentity(req, {}, BOT_TOKEN);
    if (!identity) {
      return res.status(401).json({ ok: false, error: "Откройте в Telegram или войдите в PWA" });
    }
    const myId = memberIdFromIdentity(identity);
    if (!myId || !isAdmin(myId)) {
      return res.status(403).json({ ok: false, error: "Только для администраторов" });
    }
    try {
      const { pushConfigured } = readVapidEnv();
      const data = await listActiveChatPushSubscribers();
      return res.status(200).json({
        ok: true,
        pushConfigured,
        titleMax: CHAT_PUSH_ADMIN_TITLE_MAX,
        bodyMax: CHAT_PUSH_ADMIN_BODY_MAX,
        count: data.count,
        subscribers: data.subscribers,
      });
    } catch (e) {
      console.error("[chat-push-admin-broadcast] GET", e);
      return res.status(500).json({ ok: false, error: "Ошибка сервера" });
    }
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
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
  if (!myId || !isAdmin(myId)) {
    return res.status(403).json({ ok: false, error: "Только для администраторов" });
  }

  const title = String(body.title || "").trim().slice(0, CHAT_PUSH_ADMIN_TITLE_MAX);
  const text = String(body.text || body.body || "").trim().slice(0, CHAT_PUSH_ADMIN_BODY_MAX);
  if (!title || !text) {
    return res.status(400).json({ ok: false, error: "Укажите заголовок и текст" });
  }

  if (!readVapidEnv().pushConfigured) {
    return res.status(503).json({ ok: false, error: "Пуши не настроены на сервере (VAPID)" });
  }

  try {
    const out = await broadcastAllChatPushSubscribersInner({ title, body: text });
    if (!out || !out.ok) {
      return res.status(400).json({ ok: false, error: (out && out.error) || "Не удалось отправить" });
    }
    return res.status(200).json({ ok: true, recipients: out.recipients });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
};
