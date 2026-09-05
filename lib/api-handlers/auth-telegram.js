const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
/**
 * Проверка initData от Telegram WebApp и возврат данных пользователя.
 * В Vercel Environment Variables задайте: TELEGRAM_BOT_TOKEN (токен бота от @BotFather).
 */
const crypto = require("crypto");
const { issuePwaSession } = require("../session-revocation");
const { isGazettePlannerEditor } = require("../gazette-planner-access");
const { isAdmin, isAdminUsername } = require("../api-auth");
const { isAdminReportIdentity } = require("../admin-report-access");
const { ensureDtIdForUserId, getDtIdByUserId, linkUserIdToDtId } = require("../account-id");
const { resolveTrustedAuthDtId } = require("../account-link-guard");
const { applyReferralForAccount } = require("../referrals");
const { usernameSearchIndexCommands } = require("../username-search-index");

const USERNAMES_KEY = "poker_app:visitor_usernames";
const TELEGRAM_LOGIN_AT_KEY = "poker_app:telegram_login_at";

function validateTelegramWebAppData(initData, botToken) {
  const user = require("../resolve-telegram-auth").validateMiniAppInitData(initData, botToken);
  return user;
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
  const adminAccess = isAdmin(user.id);
  const adminReportAccess = isAdminReportIdentity({ id: user.id, telegramUsername: user.username || "" });

  const safeId = "tg_" + String(user.id);
  const telegramUsername = user.username != null ? String(user.username).replace(/^@+/, "").trim() : "";
  if (telegramUsername) {
    await redisPipeline([
      ["HSET", USERNAMES_KEY, safeId, telegramUsername],
      ...usernameSearchIndexCommands(safeId, telegramUsername),
    ]);
  }
  const trustedAccount = await resolveTrustedAuthDtId({ body, botToken, userId: safeId, dtIdHint });
  const existingDtId = await getDtIdByUserId(safeId);
  const createdAccount = !trustedAccount.dtId && !existingDtId;
  const dtId = trustedAccount.dtId || existingDtId || (await ensureDtIdForUserId(safeId));
  if (dtId) {
    await linkUserIdToDtId(safeId, dtId, true);
    const loginAtResult = await redisPipeline([["HSETNX", TELEGRAM_LOGIN_AT_KEY, dtId, String(Date.now())]]);
    const firstLogin = loginAtResult && loginAtResult[0] && Number(loginAtResult[0].result) === 1;
    if (createdAccount && firstLogin) {
      try {
        await applyReferralForAccount(dtId, body, { initData });
      } catch (eReferral) {
        try { console.warn("auth-telegram: referral write failed", eReferral && eReferral.message); } catch (eLog) {}
      }
    }
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
      ? await issuePwaSession(
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
