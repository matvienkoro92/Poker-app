const { signPwaSession } = require("../poker-pwa-session");
const { isGazettePlannerEditor } = require("../gazette-planner-access");
const {
  clearEmailCode,
  generateEmailCode,
  getLinkedDtIdByEmail,
  getPreferredUserIdByDtId,
  getUserIdByDtId,
  normalizeEmail,
  normalizeEmailOriginal,
  readEmailCode,
  redisPipeline,
  saveEmailCode,
  sendEmailCode,
  linkEmailToDtId,
} = require("../email-auth");
const { ensureDtIdForUserId, getDtIdByUserId, linkUserIdToDtId } = require("../account-id");
const { hasAccountPassword, setAccountPassword, verifyAccountPassword } = require("../account-password");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const CODE_TTL_SEC = 600;
const USERNAMES_KEY = "poker_app:visitor_usernames";

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });
  if (!BOT_TOKEN) return res.status(500).json({ ok: false, error: "Server config" });

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch (e) {
    return res.status(400).json({ ok: false, error: "Invalid JSON" });
  }

  const action = String(body.action || "").trim().toLowerCase();
  const email = normalizeEmail(body.email);
  const originalEmail = normalizeEmailOriginal(body.email);
  const password = String(body.password || "");
  const dtIdHint = /^ID\d{6}$/.test(String(body.dtIdHint || body.dt_id_hint || "").trim())
    ? String(body.dtIdHint || body.dt_id_hint || "").trim()
    : "";
  const memberIdHintRaw = String(body.memberIdHint || body.member_id_hint || "").trim();
  const memberIdHint =
    memberIdHintRaw.startsWith("tg_") || memberIdHintRaw.startsWith("vk_") ? memberIdHintRaw : "";
  if (!email) return res.status(400).json({ ok: false, error: "Укажите корректный email." });

  async function resolveRepairUserId(currentDtId, fallbackUserId) {
    const preferred = currentDtId ? await getPreferredUserIdByDtId(currentDtId) : null;
    if (preferred && !/^mail_pending_/.test(preferred) && !/^mail_ID\d{6}$/.test(preferred)) {
      return String(preferred).trim();
    }
    if (memberIdHint && currentDtId) {
      const hintedDtId = await getDtIdByUserId(memberIdHint);
      if (hintedDtId && String(hintedDtId).trim() === String(currentDtId).trim()) {
        await linkUserIdToDtId(memberIdHint, currentDtId, true);
        return memberIdHint;
      }
    }
    return fallbackUserId;
  }

  const hintedDtId = memberIdHint ? await getDtIdByUserId(memberIdHint) : null;
  const existingLinkedDtId = await getLinkedDtIdByEmail(email);
  let dtId = existingLinkedDtId || hintedDtId;
  let userId = dtId ? await getPreferredUserIdByDtId(dtId) : null;
  if (!userId && dtId) userId = "mail_" + dtId;

  if (action === "request") {
    if (!dtId) {
      dtId = dtIdHint || "";
      if (!dtId) {
        const seedUserId = "mail_pending_" + Date.now() + "_" + Math.random().toString(36).slice(2, 10);
        const ensured = await ensureDtIdForUserId(seedUserId);
        if (!ensured) return res.status(500).json({ ok: false, error: "Не удалось создать аккаунт для этой почты." });
        dtId = ensured;
      }
      userId = await resolveRepairUserId(dtId, "mail_" + dtId);
    }
    const code = generateEmailCode();
    const saved = await saveEmailCode(email, { userId, dtId, email, originalEmail, code }, CODE_TTL_SEC);
    if (!saved) return res.status(503).json({ ok: false, error: "Сервис временно недоступен. Попробуйте позже." });
    const sent = await sendEmailCode(email, code);
    if (!sent || !sent.ok) return res.status(502).json({ ok: false, error: (sent && sent.userMessage) || "Не удалось отправить письмо." });
    return res.status(200).json({ ok: true, sent: true, mode: (hintedDtId || existingLinkedDtId) ? "login" : "register" });
  }

  if (action === "login") {
    if (!dtId) {
      return res.status(404).json({ ok: false, error: "Эта почта ещё не подтверждена. Сначала получите код." });
    }
    const hasPassword = await hasAccountPassword(dtId);
    if (!hasPassword) {
      return res.status(400).json({ ok: false, error: "Для этого аккаунта пароль ещё не установлен. Подтвердите вход кодом и задайте пароль.", passwordSetupRequired: true });
    }
    const verified = await verifyAccountPassword(dtId, password);
    if (!verified.ok) {
      const statusCode = verified.error === "PASSWORD_NOT_SET" ? 400 : 401;
      return res.status(statusCode).json({ ok: false, error: verified.error === "PASSWORD_NOT_SET" ? "Для этого аккаунта пароль ещё не установлен. Подтвердите вход кодом и задайте пароль." : verified.error, passwordSetupRequired: verified.error === "PASSWORD_NOT_SET" });
    }
    userId = await resolveRepairUserId(dtId, userId || ("mail_" + dtId));
    const usernameRes = /^tg_\d+$/.test(userId) ? await redisPipeline([["HGET", USERNAMES_KEY, userId]]) : null;
    const username = usernameRes && usernameRes[0] && usernameRes[0].result ? String(usernameRes[0].result).trim() : "";
    const numericId = /^tg_\d+$/.test(userId) ? Number(String(userId).replace(/^tg_/, "")) : 0;
    const pwaSession = signPwaSession({ id: numericId, memberId: userId, username: username, first_name: "", last_name: "" }, BOT_TOKEN, 60 * 60 * 24 * 30);
    const gazettePlannerAccess = isGazettePlannerEditor({ id: numericId, telegramUsername: username, pwaUsername: null });
    return res.status(200).json({
      ok: true,
      dtId,
      pwaSession,
      gazettePlannerAccess,
      user: {
        id: numericId,
        memberId: userId,
        username,
        first_name: "",
        last_name: "",
        photo_url: "",
        email: (originalEmail || email).trim(),
      },
    });
  }

  if (action === "verify") {
    const code = String(body.code || "").trim();
    if (!/^\d{6}$/.test(code)) return res.status(400).json({ ok: false, error: "Введите 6-значный код." });
    const saved = await readEmailCode(email);
    if (!saved) return res.status(400).json({ ok: false, error: "Код истёк. Запросите новый." });
    if (saved.code !== code || !saved.dtId || !saved.userId) return res.status(401).json({ ok: false, error: "Неверный код." });
    dtId = String(saved.dtId).trim();
    userId = String(saved.userId).trim();
    userId = await resolveRepairUserId(dtId, userId);
    if (!password) {
      return res.status(200).json({
        ok: true,
        confirmed: true,
        passwordRequired: true,
        dtId,
        email,
      });
    }
    await clearEmailCode(email);
    const displayEmail = (saved.originalEmail || originalEmail || email).trim();
    const linked = await linkEmailToDtId(displayEmail, dtId);
    if (!linked) return res.status(500).json({ ok: false, error: "Не удалось привязать email к аккаунту." });
    const passwordSaved = await setAccountPassword(dtId, password);
    if (!passwordSaved.ok) return res.status(400).json({ ok: false, error: passwordSaved.error });

    const usernameRes = /^tg_\d+$/.test(userId) ? await redisPipeline([["HGET", USERNAMES_KEY, userId]]) : null;
    const username = usernameRes && usernameRes[0] && usernameRes[0].result ? String(usernameRes[0].result).trim() : "";
    const numericId = /^tg_\d+$/.test(userId) ? Number(String(userId).replace(/^tg_/, "")) : 0;
    const pwaSession = signPwaSession({ id: numericId, memberId: userId, username: username, first_name: "", last_name: "" }, BOT_TOKEN, 60 * 60 * 24 * 30);
    const gazettePlannerAccess = isGazettePlannerEditor({ id: numericId, telegramUsername: username, pwaUsername: null });

    return res.status(200).json({
      ok: true,
      dtId,
      pwaSession,
      gazettePlannerAccess,
      user: {
        id: numericId,
        memberId: userId,
        username,
        first_name: "",
        last_name: "",
        photo_url: "",
        email: displayEmail,
      },
    });
  }

  return res.status(400).json({ ok: false, error: "action: request | verify" });
};
