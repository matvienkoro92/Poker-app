/**
 * Проверка initData от Telegram WebApp и возврат данных пользователя.
 * В Vercel Environment Variables задайте: TELEGRAM_BOT_TOKEN (токен бота от @BotFather).
 */
const crypto = require("crypto");
const { signPwaSession } = require("../poker-pwa-session");
const { isGazettePlannerEditor } = require("../gazette-planner-access");
const { ensureDtIdForUserId, linkUserIdToDtId } = require("../account-id");

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const USERNAMES_KEY = "poker_app:visitor_usernames";

async function redisPipeline(commands) {
  if (!REDIS_URL || !REDIS_TOKEN) return null;
  try {
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
    return await res.json();
  } catch (e) {
    return null;
  }
}

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

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) {
    return res.status(500).json({ ok: false, error: "Server config" });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch (e) {
    return res.status(400).json({ ok: false, error: "Invalid JSON" });
  }

  const initData = body.initData || body.init_data;
  if (!initData) {
    return res.status(400).json({ ok: false, error: "initData required" });
  }
  const wantPwaSession = !!(body.wantPwaSession || body.asPwaSession);
  const dtIdHint = /^ID\d{6}$/.test(String(body.dtIdHint || body.dt_id_hint || "").trim())
    ? String(body.dtIdHint || body.dt_id_hint || "").trim()
    : "";

  const user = validateTelegramWebAppData(initData, botToken);
  if (!user) {
    return res.status(401).json({ ok: false, error: "Invalid initData" });
  }

  const gazettePlannerAccess = isGazettePlannerEditor({
    id: user.id,
    telegramUsername: user.username || "",
    pwaUsername: null,
  });

  const safeId = "tg_" + String(user.id);
  const telegramUsername = user.username != null ? String(user.username).replace(/^@+/, "").trim() : "";
  if (telegramUsername) {
    await redisPipeline([["HSET", USERNAMES_KEY, safeId, telegramUsername]]);
  }
  const dtId = dtIdHint || (await ensureDtIdForUserId(safeId));
  if (dtId) await linkUserIdToDtId(safeId, dtId, true);

  return res.status(200).json({
    ok: true,
    dtId,
    gazettePlannerAccess,
    user: {
      id: user.id,
      memberId: safeId,
      first_name: user.first_name,
      last_name: user.last_name || "",
      username: user.username || "",
      language_code: user.language_code || "",
      is_premium: user.is_premium || false,
      photo_url: user.photo_url || "",
    },
    pwaSession: wantPwaSession
      ? signPwaSession(
        {
          id: user.id,
          memberId: safeId,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          },
          botToken,
          60 * 60 * 24 * 30
        )
      : undefined,
  });
};
