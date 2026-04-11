/**
 * Общий планер задач для редакторов газеты: один список в Redis (синхрон между устройствами).
 * GET — список задач; POST — полная замена списка (после правок на клиенте).
 * Доступ: те же username / numeric id, что и в мини-аппе (roman1787443, roman1_matvienko + env).
 */
const { resolveTelegramIdentity } = require("../resolve-telegram-auth");

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

const REDIS_KEY = "poker_app:gazette_editor_planner_tasks_v1";
const MAX_TASKS = 250;
const MAX_ID_LEN = 96;
const MAX_TEXT_LEN = 500;

const ALLOWED_USERNAMES = { roman1787443: true, roman1_matvienko: true };

function allowedTelegramIdsSet() {
  const raw = process.env.GAZETTE_EDITOR_PLANNER_TELEGRAM_IDS || "388008256";
  const set = {};
  String(raw)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .forEach((s) => {
      const n = parseInt(s, 10);
      if (!isNaN(n)) set[n] = true;
    });
  set[388008256] = true;
  return set;
}

const ALLOWED_TELEGRAM_IDS = allowedTelegramIdsSet();

function isPlannerEditor(identity) {
  if (!identity || identity.vkId != null) return false;
  const u = String(identity.telegramUsername || identity.pwaUsername || "")
    .replace(/^@+/, "")
    .trim()
    .toLowerCase();
  if (u && ALLOWED_USERNAMES[u]) return true;
  if (identity.id == null || identity.id === "") return false;
  const idNum = Number(identity.id);
  if (isNaN(idNum)) return false;
  return !!ALLOWED_TELEGRAM_IDS[idNum];
}

async function redisPipeline(commands) {
  if (!REDIS_URL || !REDIS_TOKEN) return null;
  const base = String(REDIS_URL).replace(/\/$/, "");
  const res = await fetch(base + "/pipeline", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
  });
  if (!res.ok) return null;
  return res.json();
}

async function redisGetTasksJson() {
  const results = await redisPipeline([["GET", REDIS_KEY]]);
  const raw = results && results[0] && results[0].result;
  if (raw == null || raw === false || raw === "") return [];
  try {
    const arr = JSON.parse(String(raw));
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    return [];
  }
}

async function redisSetTasksJson(jsonStr) {
  const results = await redisPipeline([["SET", REDIS_KEY, jsonStr]]);
  return !!(results && results[0] && results[0].result === "OK");
}

function sanitizeTasks(input) {
  if (!Array.isArray(input)) return [];
  const out = [];
  const seen = {};
  for (let i = 0; i < input.length && out.length < MAX_TASKS; i++) {
    const t = input[i];
    if (!t || typeof t !== "object") continue;
    let id = t.id != null ? String(t.id).trim() : "";
    if (!id || id.length > MAX_ID_LEN) continue;
    let text = t.text != null ? String(t.text) : "";
    if (text.length > MAX_TEXT_LEN) text = text.slice(0, MAX_TEXT_LEN);
    if (seen[id]) continue;
    seen[id] = true;
    const done = !!t.done;
    let createdAt = t.createdAt != null ? Number(t.createdAt) : Date.now();
    if (isNaN(createdAt)) createdAt = Date.now();
    out.push({ id, text, done, createdAt });
  }
  return out;
}

function parseBody(req) {
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch (e) {
      return {};
    }
  }
  return req.body && typeof req.body === "object" ? req.body : {};
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (!BOT_TOKEN) {
    return res.status(500).json({ ok: false, error: "Server config: TELEGRAM_BOT_TOKEN" });
  }

  const body = req.method === "POST" ? parseBody(req) : {};
  const identity = resolveTelegramIdentity(req, body, BOT_TOKEN);
  if (!identity || !isPlannerEditor(identity)) {
    return res.status(403).json({ ok: false, error: "Нет доступа к планеру" });
  }

  if (req.method === "GET") {
    if (!REDIS_URL || !REDIS_TOKEN) {
      return res.status(200).json({ ok: true, tasks: [], offline: true });
    }
    const tasks = sanitizeTasks(await redisGetTasksJson());
    return res.status(200).json({ ok: true, tasks });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  if (!REDIS_URL || !REDIS_TOKEN) {
    return res.status(503).json({ ok: false, error: "Хранилище недоступно" });
  }

  const tasks = sanitizeTasks(body.tasks);
  const ok = await redisSetTasksJson(JSON.stringify(tasks));
  if (!ok) return res.status(500).json({ ok: false, error: "Не удалось сохранить" });
  return res.status(200).json({ ok: true, tasks });
};
