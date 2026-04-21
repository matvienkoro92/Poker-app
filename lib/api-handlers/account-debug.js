const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { ensureDtIdForUserId, getPreferredUserIdByDtId, getUserIdByDtId, getDtIdByUserId, redisPipeline } = require("../account-id");

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

const P21_IDS_KEY = "poker_app:visitor_p21_ids";
const PERSONAL_KEY = "poker_app:visitor_personal";
const CHAT_DISPLAY_NAMES_KEY = "poker_app:visitor_chat_display_names";
const RESPECT_SCORE_KEY = "poker_app:respect_score";
const FRIENDS_KEY_PREFIX = "poker_app:friends:";

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ ok: false, error: "GET only" });
  if (!REDIS_URL || !REDIS_TOKEN) return res.status(500).json({ ok: false, error: "Redis not configured" });

  const identity = resolveTelegramIdentity(req, {}, BOT_TOKEN);
  if (!identity) return res.status(401).json({ ok: false, error: "Auth required" });
  const memberId = memberIdFromIdentity(identity);
  if (!memberId) return res.status(401).json({ ok: false, error: "Member not resolved" });

  const dtId = await ensureDtIdForUserId(memberId);
  const preferredUserId = dtId ? await getPreferredUserIdByDtId(dtId) : null;
  const directUserId = dtId ? await getUserIdByDtId(dtId) : null;
  const preferredDtId = preferredUserId ? await getDtIdByUserId(preferredUserId) : null;

  const rows = await redisPipeline([
    ["HGET", P21_IDS_KEY, dtId || ""],
    ["HGET", P21_IDS_KEY, memberId],
    ["HGET", PERSONAL_KEY, dtId || ""],
    ["HGET", PERSONAL_KEY, memberId],
    ["HGET", CHAT_DISPLAY_NAMES_KEY, dtId || ""],
    ["HGET", CHAT_DISPLAY_NAMES_KEY, memberId],
    ["HGET", RESPECT_SCORE_KEY, dtId || ""],
    ["HGET", RESPECT_SCORE_KEY, memberId],
    ["SCARD", FRIENDS_KEY_PREFIX + (dtId || "")],
    ["SCARD", FRIENDS_KEY_PREFIX + memberId],
  ]);

  function pick(idx) {
    return rows && rows[idx] ? rows[idx].result : null;
  }

  return res.status(200).json({
    ok: true,
    identity: {
      memberId,
      numericId: identity.id != null ? identity.id : null,
      emailMemberId: identity.emailMemberId || "",
      pwaUsername: identity.pwaUsername || "",
      telegramUsername: identity.telegramUsername || "",
    },
    account: {
      dtId: dtId || null,
      preferredUserId: preferredUserId || null,
      directUserId: directUserId || null,
      preferredDtId: preferredDtId || null,
    },
    data: {
      p21Dt: pick(0) || null,
      p21Legacy: pick(1) || null,
      personalDt: pick(2) || null,
      personalLegacy: pick(3) || null,
      chatDisplayDt: pick(4) || null,
      chatDisplayLegacy: pick(5) || null,
      respectDt: pick(6) != null ? Number(pick(6)) || 0 : null,
      respectLegacy: pick(7) != null ? Number(pick(7)) || 0 : null,
      friendsDt: pick(8) != null ? Number(pick(8)) || 0 : null,
      friendsLegacy: pick(9) != null ? Number(pick(9)) || 0 : null,
    },
  });
};
