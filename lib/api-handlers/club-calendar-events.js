"use strict";

const { authRequired, parseBody, setCors } = require("../api-auth");
const { getJson, isConfigured: redisConfigured, setJson } = require("../redis");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const EVENTS_KEY = "poker_app:club_calendar_events_v1";
const MAX_EVENTS = 400;
const MAX_TITLE_LEN = 180;
const MAX_NOTE_LEN = 180;

function sanitizeDate(value) {
  const s = String(value || "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return "";
  const parts = s.split("-").map((n) => parseInt(n, 10));
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  if (d.getFullYear() !== parts[0] || d.getMonth() !== parts[1] - 1 || d.getDate() !== parts[2]) return "";
  return s;
}

function sanitizeText(value, maxLen) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLen);
}

function sanitizeEvents(input) {
  const arr = Array.isArray(input) ? input : [];
  const out = [];
  const seen = {};
  for (let i = 0; i < arr.length && out.length < MAX_EVENTS; i += 1) {
    const item = arr[i];
    if (!item || typeof item !== "object") continue;
    const date = sanitizeDate(item.date);
    const title = sanitizeText(item.title, MAX_TITLE_LEN);
    if (!date || !title) continue;
    const id = sanitizeText(item.id, 80) || date + ":" + title.toLowerCase();
    if (seen[id]) continue;
    seen[id] = true;
    const event = {
      id,
      date,
      title,
      createdAt: Number(item.createdAt || Date.now()) || Date.now(),
    };
    const note = sanitizeText(item.note, MAX_NOTE_LEN);
    if (note) event.note = note;
    out.push(event);
  }
  out.sort((a, b) => String(a.date).localeCompare(String(b.date)) || String(a.title).localeCompare(String(b.title), "ru"));
  return out;
}

async function readEvents() {
  if (!redisConfigured()) return [];
  return sanitizeEvents(await getJson(EVENTS_KEY, [], { timeoutMs: 5000 }));
}

module.exports = async function handler(req, res) {
  setCors(res, "GET, POST, OPTIONS", "Content-Type, X-Telegram-Init-Data");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    return res.status(200).json({ ok: true, events: await readEvents(), offline: !redisConfigured() });
  }

  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });
  if (!redisConfigured()) return res.status(503).json({ ok: false, error: "Хранилище недоступно" });

  const body = parseBody(req);
  const auth = authRequired(req, body, BOT_TOKEN, { adminOnly: true, adminError: "Admin only" });
  if (!auth.ok) return res.status(auth.status || 403).json({ ok: false, error: auth.error || "Admin only" });

  const events = sanitizeEvents(body.events);
  const ok = await setJson(EVENTS_KEY, events, { timeoutMs: 5000 });
  if (!ok) return res.status(500).json({ ok: false, error: "Не удалось сохранить события" });
  return res.status(200).json({ ok: true, events });
};
