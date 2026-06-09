const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
/**
 * Проверка initData от Telegram WebApp и возврат данных пользователя.
 * В Vercel Environment Variables задайте: TELEGRAM_BOT_TOKEN (токен бота от @BotFather).
 */
const crypto = require("crypto");
const { signPwaSession } = require("../poker-pwa-session");
const { isGazettePlannerEditor } = require("../gazette-planner-access");
const { isAdmin, isAdminUsername } = require("../api-auth");
const { isAdminReportIdentity } = require("../admin-report-access");
const { ensureDtIdForUserId, linkUserIdToDtId } = require("../account-id");
const { resolveTrustedAuthDtId } = require("../account-link-guard");

const USERNAMES_KEY = "poker_app:visitor_usernames";
const USERNAME_TO_USER_KEY = "poker_app:visitor_username_to_user";
const TELEGRAM_LOGIN_AT_KEY = "poker_app:telegram_login_at";

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
  const adminAccess = isAdmin(user.id) || isAdminUsername(user.username || "");
  const adminReportAccess = isAdminReportIdentity({ id: user.id, telegramUsername: user.username || "" });

  const safeId = "tg_" + String(user.id);
  const telegramUsername = user.username != null ? String(user.username).replace(/^@+/, "").trim() : "";
  if (telegramUsername) {
    await redisPipeline([
      ["HSET", USERNAMES_KEY, safeId, telegramUsername],
      ["HSET", USERNAME_TO_USER_KEY, telegramUsername.toLowerCase(), safeId],
    ]);
  }
  const trustedAccount = await resolveTrustedAuthDtId({ body, botToken, userId: safeId, dtIdHint });
  const dtId = trustedAccount.dtId || (await ensureDtIdForUserId(safeId));
  if (dtId) {
    await linkUserIdToDtId(safeId, dtId, true);
    await redisPipeline([["HSETNX", TELEGRAM_LOGIN_AT_KEY, dtId, String(Date.now())]]);
  }

  return res.status(200).json({
    ok: true,
    dtId,
    gazettePlannerAccess,
    adminAccess,
    adminReportAccess,
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
            adminAccess,
            adminReportAccess,
          },
          botToken
        )
      : undefined,
  });
};
