/**
 * POST /api/chat-push-admin-send — Web Push только админам (TELEGRAM_ADMIN_ID), у кого есть подписка как у чата.
 * Тело: initData | pwaSession | pwaVkSession + title, text (или body).
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
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

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
  if (!myId || !isAdmin(myId)) {
    return res.status(403).json({ ok: false, error: "Только для администраторов" });
  }

  const title = String(body.title || "").trim().slice(0, 80);
  const text = String(body.text || body.body || "").trim().slice(0, 200);
  if (!title || !text) {
    return res.status(400).json({ ok: false, error: "Укажите заголовок и текст" });
  }

  const { broadcastAdminOnlyWebPushInner, readVapidEnv } = require("../chat-webpush-notify");
  if (!readVapidEnv().pushConfigured) {
    return res.status(503).json({ ok: false, error: "Пуши не настроены на сервере (VAPID)" });
  }

  try {
    const out = await broadcastAdminOnlyWebPushInner({ title, body: text });
    if (!out || !out.ok) {
      return res.status(400).json({ ok: false, error: (out && out.error) || "Не удалось отправить" });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
};
