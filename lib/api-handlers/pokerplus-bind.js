const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { ensureDtIdForUserId } = require("../account-id");
const { getLinkedEmailByDtId } = require("../email-auth");
const { bindMiniAppPlayer, hasPokerPlusConfig } = require("../pokerplus");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

function jsonBody(req) {
  if (!req || req.body == null) return {};
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch (e) {
      return null;
    }
  }
  return req.body || {};
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });
  if (!hasPokerPlusConfig()) return res.status(500).json({ ok: false, error: "PokerPlus server config missing" });

  const body = jsonBody(req);
  if (body == null) return res.status(400).json({ ok: false, error: "Invalid JSON" });

  const identity = resolveTelegramIdentity(req, body, BOT_TOKEN);
  const memberId = identity ? memberIdFromIdentity(identity) : null;
  if (!memberId || /^guest_/.test(memberId)) {
    return res.status(401).json({ ok: false, error: "Войдите в аккаунт Telegram или PWA, чтобы привязать PokerPlus." });
  }

  const accountId = await ensureDtIdForUserId(memberId);
  if (!accountId) return res.status(500).json({ ok: false, error: "Не удалось подготовить ID аккаунта." });

  const ciphertext = String(body.ciphertext || "").trim();
  if (!ciphertext) return res.status(400).json({ ok: false, error: "Вставьте ключ из PokerPlus." });
  const email = (await getLinkedEmailByDtId(accountId)) || "";
  const telegramId = identity && identity.id != null && Number(identity.id) > 0 ? String(identity.id).trim() : "";
  if (!telegramId) {
    return res.status(400).json({ ok: false, error: "Для привязки PokerPlus нужен Telegram ID. Войдите через Telegram." });
  }

  try {
    const profile = await bindMiniAppPlayer(accountId, telegramId, ciphertext, email);
    return res.status(200).json({
      ok: true,
      accountId,
      pokerPlusUserId: profile && profile.pokerPlusUserId ? profile.pokerPlusUserId : null,
      profile,
    });
  } catch (e) {
    const msg = e && e.message ? String(e.message) : "PokerPlus bind failed";
    return res.status(e && e.statusCode ? e.statusCode : 502).json({ ok: false, error: msg });
  }
};
