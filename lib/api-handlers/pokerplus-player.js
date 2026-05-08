const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { ensureDtIdForUserId } = require("../account-id");
const { getLinkedEmailOriginalByDtId } = require("../email-auth");
const { bindMiniAppPlayer, hasPokerPlusConfig, readBoundPokerPlusUserId, readPokerPlusProfile, refreshMiniAppPlayer, refreshMiniAppPlayerBySavedKey } = require("../pokerplus");
const { pokerPlusTelegramIdCandidates } = require("../pokerplus-identity");

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

function pokerPlusSyncErrorMessage(error) {
  const rawMsg = error && error.message ? String(error.message) : String(error || "Poker21 profile fetch failed");
  if (/player data not found/i.test(rawMsg)) {
    return "Poker21 не нашёл игрока по сохранённому ключу. Если ошибка повторится, отвяжите Poker21 и привяжите ключ заново.";
  }
  if (/binding failed|bind failed/i.test(rawMsg)) {
    return "Poker21 не принял обновление по сохранённому ключу. Если ошибка повторится, отвяжите Poker21 и привяжите ключ заново.";
  }
  return rawMsg.replace(/PokerPlus/g, "Poker21");
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET" && req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });
  if (!hasPokerPlusConfig()) return res.status(500).json({ ok: false, error: "Poker21 server config missing" });

  const body = jsonBody(req);
  if (body == null) return res.status(400).json({ ok: false, error: "Invalid JSON" });

  const identity = resolveTelegramIdentity(req, body, BOT_TOKEN);
  const memberId = identity ? memberIdFromIdentity(identity) : null;
  if (!memberId || /^guest_/.test(memberId)) {
    return res.status(401).json({ ok: false, error: "Войдите в аккаунт, чтобы получить профиль Poker21." });
  }

  const accountId = await ensureDtIdForUserId(memberId);
  if (!accountId) return res.status(500).json({ ok: false, error: "Не удалось подготовить ID аккаунта." });

  const force = String((req.query && req.query.refresh) || body.refresh || "").trim();
  const wantRefresh = force === "1" || force === "true";
  const ciphertext = String(body.ciphertext || "").trim();
  const linkedUserId = await readBoundPokerPlusUserId(accountId);

  if (!linkedUserId) {
    if (wantRefresh) {
      const telegramIdCandidates = await pokerPlusTelegramIdCandidates(accountId, identity);
      if (!telegramIdCandidates.length) {
        return res.status(400).json({ ok: false, error: "Для обновления Poker21 нужен Telegram ID. Войдите через Telegram." });
      }
      try {
        const email = (await getLinkedEmailOriginalByDtId(accountId)) || "";
        if (ciphertext) {
          const profile = await bindMiniAppPlayer(accountId, telegramIdCandidates, ciphertext, email);
          return res.status(200).json({
            ok: true,
            linked: true,
            accountId,
            pokerPlusUserId: profile && profile.pokerPlusUserId ? profile.pokerPlusUserId : null,
            profile,
          });
        }
        if (!email) {
          return res.status(400).json({ ok: false, error: "Для обновления сначала привяжите email в профиле. Если email в Poker21 другой, вставьте ключ и нажмите «Привязать Poker21»." });
        }
        const profile = await refreshMiniAppPlayer(accountId, telegramIdCandidates, email);
        const refreshedUserId = profile && profile.pokerPlusUserId ? profile.pokerPlusUserId : null;
        return res.status(200).json({ ok: true, linked: true, accountId, pokerPlusUserId: refreshedUserId, profile });
      } catch (e) {
        return res.status(e && e.statusCode ? e.statusCode : 502).json({ ok: false, error: pokerPlusSyncErrorMessage(e) });
      }
    }
    return res.status(200).json({ ok: true, linked: false, accountId, profile: null });
  }

  if (!wantRefresh) {
    const cached = await readPokerPlusProfile(accountId);
    if (cached) {
      return res.status(200).json({ ok: true, linked: true, accountId, pokerPlusUserId: linkedUserId, profile: cached, cached: true });
    }
    return res.status(200).json({ ok: true, linked: true, accountId, pokerPlusUserId: linkedUserId, profile: null, cached: false });
  }

  try {
    const telegramIdCandidates = await pokerPlusTelegramIdCandidates(accountId, identity);
    const email = (await getLinkedEmailOriginalByDtId(accountId)) || "";
    const profile = ciphertext
      ? await bindMiniAppPlayer(accountId, telegramIdCandidates, ciphertext, email)
      : await refreshMiniAppPlayerBySavedKey(accountId, telegramIdCandidates, email);
    const refreshedUserId = profile && profile.pokerPlusUserId ? profile.pokerPlusUserId : linkedUserId;
    return res.status(200).json({ ok: true, linked: true, accountId, pokerPlusUserId: refreshedUserId, profile });
  } catch (e) {
    const cached = await readPokerPlusProfile(accountId);
    if (cached) {
      return res.status(200).json({
        ok: true,
        linked: true,
        accountId,
        pokerPlusUserId: linkedUserId,
        profile: cached,
        cached: true,
        syncError: pokerPlusSyncErrorMessage(e && e.message ? e : "Poker21 sync failed"),
      });
    }
    return res.status(e && e.statusCode ? e.statusCode : 502).json({ ok: false, error: pokerPlusSyncErrorMessage(e) });
  }
};
