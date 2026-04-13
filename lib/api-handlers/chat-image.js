/**
 * Прокси картинок чата из Vercel Blob. Для private blob прямой URL в <img> даёт 403;
 * клиент подставляет /api/chat-image?src=… (+ авторизация как у /api/chat).
 */
"use strict";

const { resolveTelegramIdentity } = require("../resolve-telegram-auth");
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

function isAllowedBlobHost(hostname) {
  const h = String(hostname || "").toLowerCase();
  return h.endsWith(".blob.vercel-storage.com");
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const token = (process.env.BLOB_READ_WRITE_TOKEN || "").trim();
  if (!token) return res.status(503).json({ ok: false, error: "Blob not configured" });

  let body = {};
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch (e) {
    body = {};
  }

  if (!resolveTelegramIdentity(req, body, BOT_TOKEN)) {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }

  const src = String((req.query && req.query.src) || "").trim();
  if (!src.startsWith("https://")) return res.status(400).json({ ok: false, error: "Bad src" });

  let hostname = "";
  try {
    hostname = new URL(src).hostname || "";
  } catch (e) {
    return res.status(400).json({ ok: false, error: "Bad URL" });
  }
  if (!isAllowedBlobHost(hostname)) return res.status(400).json({ ok: false, error: "Host not allowed" });

  let get;
  try {
    ({ get } = require("@vercel/blob"));
  } catch (e) {
    return res.status(500).json({ ok: false, error: "Blob SDK missing" });
  }

  async function blobGet(access) {
    try {
      return await get(src, { access, token });
    } catch (e) {
      return null;
    }
  }

  let result = await blobGet("private");
  if (!result || result.statusCode !== 200 || !result.stream) {
    result = await blobGet("public");
  }
  if (!result || result.statusCode !== 200 || !result.stream) {
    return res.status(404).end();
  }

  const ct =
    result.blob && result.blob.contentType ? String(result.blob.contentType) : "application/octet-stream";
  res.setHeader("Content-Type", ct);
  res.setHeader("Cache-Control", "private, max-age=300");

  const reader = result.stream.getReader();
  const chunks = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value && value.length) chunks.push(Buffer.from(value));
    }
  } catch (eRead) {
    return res.status(502).end();
  }
  const buf = chunks.length ? Buffer.concat(chunks) : Buffer.alloc(0);
  return res.status(200).send(buf);
};
