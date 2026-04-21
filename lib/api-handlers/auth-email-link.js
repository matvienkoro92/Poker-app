const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const {
  clearEmailCode,
  ensureDtIdForUserId,
  generateEmailCode,
  getLinkedDtIdByEmail,
  getLinkedEmailByDtId,
  linkEmailToDtId,
  normalizeEmail,
  readEmailCode,
  saveEmailCode,
  sendEmailCode,
} = require("../email-auth");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const CODE_TTL_SEC = 600;

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  let body = {};
  if (req.method === "POST") {
    try {
      body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    } catch (e) {
      return res.status(400).json({ ok: false, error: "Invalid JSON" });
    }
  }

  const identity = resolveTelegramIdentity(req, body, BOT_TOKEN);
  const userId = memberIdFromIdentity(identity);
  if (!userId || !/^tg_\d+$/.test(userId)) {
    return res.status(401).json({ ok: false, error: "Нужен вход через Telegram или уже выданную PWA-сессию." });
  }
  const dtId = await ensureDtIdForUserId(userId);
  if (!dtId) return res.status(500).json({ ok: false, error: "Не удалось подготовить ID аккаунта." });

  if (req.method === "GET") {
    const linkedEmail = await getLinkedEmailByDtId(dtId);
    return res.status(200).json({ ok: true, dtId, email: linkedEmail || null });
  }

  const action = String(body.action || "").trim().toLowerCase();
  const email = normalizeEmail(body.email);
  if (!email) return res.status(400).json({ ok: false, error: "Укажите корректный email." });

  const existingOwnerDtId = await getLinkedDtIdByEmail(email);
  if (existingOwnerDtId && existingOwnerDtId !== dtId) {
    return res.status(409).json({ ok: false, error: "Этот email уже привязан к другому аккаунту." });
  }

  if (action === "request") {
    const code = generateEmailCode();
    const saved = await saveEmailCode(email, { userId, dtId, email, code, mode: "link" }, CODE_TTL_SEC);
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
    if (saved.code !== code || saved.userId !== userId || saved.dtId !== dtId || saved.mode !== "link") {
      return res.status(401).json({ ok: false, error: "Неверный код." });
    }
    const linked = await linkEmailToDtId(email, dtId);
    if (!linked) return res.status(500).json({ ok: false, error: "Не удалось привязать email." });
    await clearEmailCode(email);
    return res.status(200).json({ ok: true, dtId, email });
  }

  return res.status(400).json({ ok: false, error: "action: request | verify" });
};
