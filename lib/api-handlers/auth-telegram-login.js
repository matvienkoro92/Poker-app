const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
/**
 * Верификация данных Telegram Login Widget + выдача pwaSession для PWA (не Mini App).
 * Документация: https://core.telegram.org/widgets/login#checking-authorization
 *
 * POST JSON: { id, first_name, last_name, username, photo_url, auth_date, hash } (как в query после redirect)
 * Ответ: { ok, user, pwaSession }
 */
const crypto = require("crypto");
const { signPwaSession } = require("../poker-pwa-session");
const { isGazettePlannerEditor } = require("../gazette-planner-access");
const { isAdmin, isAdminUsername } = require("../api-auth");
const { isAdminReportIdentity } = require("../admin-report-access");
const { ensureDtIdForUserId, linkUserIdToDtId } = require("../account-id");
const { resolveTrustedAuthDtId } = require("../account-link-guard");
const { applyReferralForAccount } = require("../referrals");

const USERNAMES_KEY = "poker_app:visitor_usernames";
const USERNAME_TO_USER_KEY = "poker_app:visitor_username_to_user";
const TELEGRAM_LOGIN_AT_KEY = "poker_app:telegram_login_at";
const LOGIN_WIDGET_LOCAL_FIELDS = new Set([
  "dtIdHint",
  "dt_id_hint",
  "linkPwaSession",
  "link_pwa_session",
  "existingPwaSession",
  "existing_pwa_session",
  "referralStartParam",
  "referral_start_param",
  "referrerId",
  "referrer_id",
]);

function validateTelegramLoginWidget(body, botToken) {
  if (!body || !botToken) return null;
  const hash = body.hash;
  if (!hash) return null;
  const keys = Object.keys(body)
    .filter((k) => k !== "hash" && !LOGIN_WIDGET_LOCAL_FIELDS.has(k) && body[k] != null && String(body[k]) !== "")
    .sort();
  const pairs = keys.map((k) => `${k}=${body[k]}`);
  const dataCheckString = pairs.join("\n");
  const secretKey = crypto.createHash("sha256").update(botToken).digest();
  const calculated = crypto.createHmac("sha256", secretKey).update(dataCheckString).digest("hex");
  if (calculated !== String(hash)) return null;
  const authDate = Number(body.auth_date);
  if (!Number.isFinite(authDate)) return null;
  const now = Math.floor(Date.now() / 1000);
  if (now - authDate > 86400) return null;
  const id = Number(body.id);
  if (!Number.isFinite(id)) return null;
  return {
    id,
    first_name: body.first_name != null ? String(body.first_name) : "",
    last_name: body.last_name != null ? String(body.last_name) : "",
    username: body.username != null ? String(body.username) : "",
    photo_url: body.photo_url != null ? String(body.photo_url) : "",
    language_code: body.language_code != null ? String(body.language_code) : "",
    is_premium: body.is_premium === true || body.is_premium === "true",
  };
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const botToken = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
  if (!botToken) return res.status(500).json({ ok: false, error: "Server config" });

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch (e) {
    return res.status(400).json({ ok: false, error: "Invalid JSON" });
  }

  const user = validateTelegramLoginWidget(body, botToken);
  if (!user) return res.status(401).json({ ok: false, error: "Invalid Telegram login data" });
  const dtIdHint = /^ID\d{6}$/.test(String(body.dtIdHint || body.dt_id_hint || "").trim())
    ? String(body.dtIdHint || body.dt_id_hint || "").trim()
    : "";
  const safeId = "tg_" + String(user.id);
  const trustedAccount = await resolveTrustedAuthDtId({ body, botToken, userId: safeId, dtIdHint });
  const dtId = trustedAccount.dtId || (await ensureDtIdForUserId(safeId));
  if (dtId) {
    await linkUserIdToDtId(safeId, dtId, true);
    const loginAtResult = await redisPipeline([["HSETNX", TELEGRAM_LOGIN_AT_KEY, dtId, String(Date.now())]]);
    const firstLogin = loginAtResult && loginAtResult[0] && Number(loginAtResult[0].result) === 1;
    if (firstLogin) {
      try {
        await applyReferralForAccount(dtId, body);
      } catch (eReferral) {
        try { console.warn("auth-telegram-login: referral write failed", eReferral && eReferral.message); } catch (eLog) {}
      }
    }
  }
  const adminAccess = isAdmin(user.id) || isAdminUsername(user.username || "");
  const adminReportAccess = isAdminReportIdentity({ id: user.id, telegramUsername: user.username || "" });

  const pwaSession = signPwaSession(
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
  );

  const gazettePlannerAccess = isGazettePlannerEditor({
    id: user.id,
    telegramUsername: user.username || "",
    pwaUsername: null,
  });

  const telegramUsername = user.username != null ? String(user.username).replace(/^@+/, "").trim() : "";
  if (telegramUsername) {
    await redisPipeline([
      ["HSET", USERNAMES_KEY, safeId, telegramUsername],
      ["HSET", USERNAME_TO_USER_KEY, telegramUsername.toLowerCase(), safeId],
    ]);
  }

  return res.status(200).json({
    ok: true,
    dtId,
    gazettePlannerAccess,
    adminAccess,
    adminReportAccess,
    pwaSession,
    user: {
      id: user.id,
      memberId: safeId,
      first_name: user.first_name,
      last_name: user.last_name || "",
      username: user.username || "",
      language_code: user.language_code || "",
      is_premium: !!user.is_premium,
      photo_url: user.photo_url || "",
    },
  });
};
