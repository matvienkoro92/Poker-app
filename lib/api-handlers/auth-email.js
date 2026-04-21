const { signPwaSession } = require("../poker-pwa-session");
const { isGazettePlannerEditor } = require("../gazette-planner-access");
const {
  clearEmailCode,
  generateEmailCode,
  getLinkedDtIdByEmail,
  normalizeEmail,
  readEmailCode,
  redisPipeline,
  saveEmailCode,
  sendEmailCode,
  getUserIdByDtId,
} = require("../email-auth");

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
  if (!email) return res.status(400).json({ ok: false, error: "Укажите корректный email." });

  const dtId = await getLinkedDtIdByEmail(email);
  const userId = dtId ? await getUserIdByDtId(dtId) : null;
  if (!userId || !/^tg_\d+$/.test(userId)) {
    return res.status(404).json({ ok: false, error: "Этот email ещё не привязан к ID аккаунта. Сначала войдите через Telegram и добавьте email в профиле." });
  }

  if (action === "request") {
    const code = generateEmailCode();
    const saved = await saveEmailCode(email, { userId, dtId, email, code }, CODE_TTL_SEC);
    if (!saved) return res.status(503).json({ ok: false, error: "Сервис временно недоступен. Попробуйте позже." });
    const sent = await sendEmailCode(email, code);
    if (!sent || !sent.ok) return res.status(502).json({ ok: false, error: (sent && sent.userMessage) || "Не удалось отправить письмо." });
    return res.status(200).json({ ok: true, sent: true });
  }

  if (action === "verify") {
    const code = String(body.code || "").trim();
    if (!/^\d{6}$/.test(code)) return res.status(400).json({ ok: false, error: "Введите 6-значный код." });
    const saved = await readEmailCode(email);
    if (!saved) return res.status(400).json({ ok: false, error: "Код истёк. Запросите новый." });
    if (saved.code !== code || saved.userId !== userId || saved.dtId !== dtId) return res.status(401).json({ ok: false, error: "Неверный код." });
    await clearEmailCode(email);

    const numericId = Number(String(userId).replace(/^tg_/, ""));
    const usernameRes = await redisPipeline([["HGET", USERNAMES_KEY, userId]]);
    const username = usernameRes && usernameRes[0] && usernameRes[0].result ? String(usernameRes[0].result).trim() : "";
    const pwaSession = signPwaSession({ id: numericId, username: username, first_name: "", last_name: "" }, BOT_TOKEN, 60 * 60 * 24 * 30);
    const gazettePlannerAccess = isGazettePlannerEditor({ id: numericId, telegramUsername: username, pwaUsername: null });

    return res.status(200).json({
      ok: true,
      dtId,
      pwaSession,
      gazettePlannerAccess,
      user: {
        id: numericId,
        username,
        first_name: "",
        last_name: "",
        photo_url: "",
        email,
      },
    });
  }

  return res.status(400).json({ ok: false, error: "action: request | verify" });
};
