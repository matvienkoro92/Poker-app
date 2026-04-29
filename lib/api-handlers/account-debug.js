const { ensureDtIdForUserId, getPreferredUserIdByDtId, getUserIdByDtId, getDtIdByUserId, redisPipeline, DT_IDS_KEY } = require("../account-id");
const { authRequired, setCors } = require("../api-auth");
const { isConfigured: redisConfigured } = require("../redis");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

const P21_IDS_KEY = "poker_app:visitor_p21_ids";
const PERSONAL_KEY = "poker_app:visitor_personal";
const CHAT_DISPLAY_NAMES_KEY = "poker_app:visitor_chat_display_names";
const RESPECT_SCORE_KEY = "poker_app:respect_score";
const FRIENDS_KEY_PREFIX = "poker_app:friends:";

module.exports = async function handler(req, res) {
  setCors(res, "GET, OPTIONS");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ ok: false, error: "GET only" });
  if (!redisConfigured()) return res.status(500).json({ ok: false, error: "Redis not configured" });

  const auth = authRequired(req, {}, BOT_TOKEN, { adminOnly: true });
  if (!auth.ok) return res.status(auth.status).json({ ok: false, error: auth.error });
  const identity = auth.identity;
  const memberId = auth.memberId;

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
    ["HGETALL", DT_IDS_KEY],
  ]);

  function pick(idx) {
    return rows && rows[idx] ? rows[idx].result : null;
  }

  const linkedUserIds = [];
  const dtMapRaw = pick(10);
  if (dtId && Array.isArray(dtMapRaw)) {
    for (let i = 0; i < dtMapRaw.length; i += 2) {
      const userId = dtMapRaw[i] != null ? String(dtMapRaw[i]).trim() : "";
      const linkedDtId = dtMapRaw[i + 1] != null ? String(dtMapRaw[i + 1]).trim() : "";
      if (userId && linkedDtId === dtId) linkedUserIds.push(userId);
    }
  } else if (dtId && dtMapRaw && typeof dtMapRaw === "object") {
    Object.keys(dtMapRaw).forEach(function (userId) {
      if (String(dtMapRaw[userId] || "").trim() === dtId) linkedUserIds.push(String(userId).trim());
    });
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
      linkedUserIds: linkedUserIds,
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
