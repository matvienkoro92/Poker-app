const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
/**
 * Планер задач редакторов: общий список для @roman1787443 / @roman1_matvienko; отдельные ключи для solo (напр. @polyapineapple).
 * GET — список задач; POST — полная замена списка (после правок на клиенте).
 */
const { resolveTelegramIdentity } = require("../resolve-telegram-auth");
const { isGazettePlannerEditor, getGazettePlannerRedisKey } = require("../gazette-planner-access");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

const MAX_TASKS = 250;
const MAX_ID_LEN = 96;
const MAX_TEXT_LEN = 500;

async function redisGetTasksJson(redisKey) {
  const results = await redisPipeline([["GET", redisKey]]);
  const raw = results && results[0] && results[0].result;
  if (raw == null || raw === false || raw === "") return [];
  try {
    const arr = JSON.parse(String(raw));
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    return [];
  }
}

async function redisSetTasksJson(redisKey, jsonStr) {
  const results = await redisPipeline([["SET", redisKey, jsonStr]]);
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
    const doing = !!t.doing;
    const important = !!t.important;
    const stage = t.stage === "waiting" || t.stage === "checking" ? t.stage : "";
    let createdAt = t.createdAt != null ? Number(t.createdAt) : Date.now();
    if (isNaN(createdAt)) createdAt = Date.now();
    let plannerOrder = t.plannerOrder != null ? Number(t.plannerOrder) : NaN;
    if (!Number.isFinite(plannerOrder)) plannerOrder = null;
    const row = { id, text, done, doing, important, createdAt };
    if (stage) row.stage = stage;
    if (plannerOrder != null) row.plannerOrder = plannerOrder;
    out.push(row);
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
  if (!identity || !isGazettePlannerEditor(identity)) {
    return res.status(403).json({ ok: false, error: "Нет доступа к планеру" });
  }
  const redisKey = getGazettePlannerRedisKey(identity);
  if (!redisKey) {
    return res.status(403).json({ ok: false, error: "Нет доступа к планеру" });
  }

  if (req.method === "GET") {
    if (!redisConfigured()) {
      return res.status(200).json({ ok: true, tasks: [], offline: true });
    }
    const tasks = sanitizeTasks(await redisGetTasksJson(redisKey));
    return res.status(200).json({ ok: true, tasks });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  if (!redisConfigured()) {
    return res.status(503).json({ ok: false, error: "Хранилище недоступно" });
  }

  const tasks = sanitizeTasks(body.tasks);
  const ok = await redisSetTasksJson(redisKey, JSON.stringify(tasks));
  if (!ok) return res.status(500).json({ ok: false, error: "Не удалось сохранить" });
  return res.status(200).json({ ok: true, tasks });
};
