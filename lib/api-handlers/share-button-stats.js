const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
/**
 * Статистика кнопок «Переслать»: запись клика (POST) и получение сводки (GET, только админ).
 * Redis: hash poker_app:share_buttons — поле = buttonId, значение = счётчик.
 */
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { isAdmin } = require("../api-auth");
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

const SHARE_BUTTONS_KEY = "poker_app:share_buttons";
const ALLOWED_BUTTON_IDS = [
  "tournament_day",
  "daily_prediction",
  "gazette_article",
  "winter_rating_week_top",
  "winter_rating_spring_top",
  "winter_rating_player_share",
  "winter_rating_date",
  "raffle_hero",
  "raffle_card",
  "video_lessons_hero",
  "video_lessons_coach_reviews",
  "video_lessons_coach_reviews_copy",
  "chat_general_copy_link",
  "chat_general_invite_friend",
  "learn_play_hub_copy",
  "learn_play_hub_invite",
];

function safeButtonId(id) {
  if (!id || typeof id !== "string") return null;
  const s = id.trim().replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 64);
  return ALLOWED_BUTTON_IDS.includes(s) ? s : null;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  if (!redisConfigured()) {
    return res.status(500).json({ ok: false, error: "Redis not configured" });
  }

  // POST — записать клик по кнопке (открытие «Переслать»)
  if (req.method === "POST") {
    let body = {};
    try {
      body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    } catch (e) {}
    const buttonId = safeButtonId(body.buttonId || body.button_id);
    if (!buttonId) {
      return res.status(400).json({ ok: false, error: "Invalid or missing buttonId" });
    }
    const results = await redisPipeline([["HINCRBY", SHARE_BUTTONS_KEY, buttonId, "1"]]);
    if (!results || results[0]?.error) {
      return res.status(500).json({ ok: false, error: "Redis error" });
    }
    return res.status(200).json({ ok: true });
  }

  // GET — статистика (только админ)
  const identity = resolveTelegramIdentity(req, {}, BOT_TOKEN);
  const adminId = memberIdFromIdentity(identity);
  if (!identity || !adminId || !isAdmin(adminId)) {
    return res.status(403).json({ ok: false, error: "Admin only" });
  }

  const results = await redisPipeline([["HGETALL", SHARE_BUTTONS_KEY]]);
  if (!results || !Array.isArray(results) || results[0]?.error) {
    return res.status(200).json({ ok: true, stats: {}, isAdmin: true });
  }

  const raw = results[0].result;
  const stats = {};
  if (Array.isArray(raw)) {
    for (let i = 0; i < raw.length; i += 2) {
      if (raw[i] && raw[i + 1]) stats[raw[i]] = parseInt(raw[i + 1], 10) || 0;
    }
  } else if (raw && typeof raw === "object") {
    for (const [k, v] of Object.entries(raw)) stats[k] = parseInt(v, 10) || 0;
  }

  return res.status(200).json({ ok: true, stats, isAdmin: true });
};
