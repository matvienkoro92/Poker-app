"use strict";

const crypto = require("crypto");
const { validateMiniAppInitData } = require("../resolve-telegram-auth");
const { rejectBlockedAppUser } = require("../app-user-blocks");
const { pipeline } = require("../redis");
const { put, del } = require("@vercel/blob");

function validateMessage(body) {
  if (typeof body.caption !== "string" || !body.caption.trim() || body.caption.length > 1024) return null;
  if (!Array.isArray(body.entities) || body.entities.length > 8) return null;
  const entities = [];
  for (const entity of body.entities) {
    if (!entity || entity.type !== "text_link" || !Number.isInteger(entity.offset) || !Number.isInteger(entity.length) || entity.offset < 0 || entity.length < 1 || entity.offset + entity.length > body.caption.length) return null;
    let url;
    try { url = new URL(entity.url); } catch (_) { return null; }
    if (url.protocol !== "https:" || url.username || url.password || url.href.length > 512) return null;
    entities.push({ type: "text_link", offset: entity.offset, length: entity.length, url: url.href });
  }
  const match = typeof body.image === "string" && body.image.length <= 2800000 && body.image.match(/^data:image\/jpeg;base64,([A-Za-z0-9+/]+={0,2})$/);
  if (!match) return null;
  const image = Buffer.from(match[1], "base64");
  if (image.length < 4 || image.length > 2000000 || image[0] !== 0xff || image[1] !== 0xd8 || image[image.length - 2] !== 0xff || image[image.length - 1] !== 0xd9) return null;
  return { image, caption: body.caption, entities };
}

async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });
  let body;
  try { body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {}; } catch (_) { return res.status(400).json({ ok: false, error: "Некорректный запрос" }); }
  const token = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
  // Only a signed Telegram Mini App user may prepare a message for their own account.
  const user = validateMiniAppInitData(body.initData, token);
  if (!user) return res.status(401).json({ ok: false, error: "Откройте приложение в Telegram, чтобы отправить сообщение." });
  if (await rejectBlockedAppUser(req, res, { id: user.id }, String(user.id))) return;
  const message = validateMessage(body);
  if (!message) return res.status(400).json({ ok: false, error: "Некорректная картинка или описание турнира" });
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  if (!blobToken) return res.status(503).json({ ok: false, error: "Отправка в Telegram временно недоступна. Скачайте картинку и скопируйте описание." });
  let uploaded;
  try {
    const bucket = Math.floor(Date.now() / 60000);
    const rate = await pipeline([["INCR", "poker_app:tournament_share:rate:" + user.id + ":" + bucket], ["EXPIRE", "poker_app:tournament_share:rate:" + user.id + ":" + bucket, 120]], { throwOnError: true, context: "tournament-share" });
    if (!rate) throw new Error("Rate limit unavailable");
    if (Number(rate[0].result) > 5) return res.status(429).json({ ok: false, error: "Подождите минуту перед следующей отправкой." });
    uploaded = await put("tournament-shares/" + crypto.randomUUID() + ".jpg", message.image, { access: "public", token: blobToken, contentType: "image/jpeg", addRandomSuffix: false });
    const response = await fetch("https://api.telegram.org/bot" + token + "/savePreparedInlineMessage", {
      method: "POST", headers: { "Content-Type": "application/json" }, signal: AbortSignal.timeout(15000),
      body: JSON.stringify({ user_id: user.id, allow_user_chats: true, allow_group_chats: true, allow_channel_chats: true,
        result: { type: "photo", id: crypto.randomUUID(), photo_url: uploaded.url, thumbnail_url: uploaded.url, caption: message.caption, caption_entities: message.entities } }),
    });
    const data = await response.json();
    if (!response.ok || !data.ok || !data.result || !data.result.id) throw new Error("Telegram preparation failed");
    return res.status(200).json({ ok: true, id: data.result.id, expiration_date: data.result.expiration_date });
  } catch (_) {
    if (uploaded && uploaded.url) { try { await del(uploaded.url, { token: blobToken }); } catch (_) {} }
    return res.status(503).json({ ok: false, error: "Не удалось подготовить сообщение в Telegram. Попробуйте ещё раз или скачайте картинку и скопируйте описание." });
  }
}
module.exports = handler;
module.exports.validateMessage = validateMessage;
