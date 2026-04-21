const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const DT_IDS_KEY = "poker_app:visitor_dt_ids";
const ID_TO_USER_KEY = "poker_app:id_to_user";

async function redisPipeline(commands) {
  if (!REDIS_URL || !REDIS_TOKEN) return null;
  try {
    const base = String(REDIS_URL).replace(/\/$/, "");
    const res = await fetch(base + "/pipeline", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REDIS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commands),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

function generateDtId() {
  return "ID" + String(Math.floor(100000 + Math.random() * 900000));
}

async function getDtIdByUserId(userId) {
  if (!userId) return null;
  const rawId = String(userId).trim();
  if (/^mail_ID\d{6}$/.test(rawId)) return rawId.slice(5);
  const res = await redisPipeline([["HGET", DT_IDS_KEY, String(userId)]]);
  const value = res && res[0] && res[0].result != null ? String(res[0].result).trim() : "";
  return value || null;
}

async function getUserIdByDtId(dtId) {
  if (!dtId) return null;
  const res = await redisPipeline([["HGET", ID_TO_USER_KEY, String(dtId)]]);
  const value = res && res[0] && res[0].result != null ? String(res[0].result).trim() : "";
  return value || null;
}

async function getPreferredUserIdByDtId(dtId) {
  const id = dtId != null ? String(dtId).trim() : "";
  if (!id) return null;
  const direct = await getUserIdByDtId(id);
  const res = await redisPipeline([["HGETALL", DT_IDS_KEY]]);
  const raw = res && res[0] ? res[0].result : null;
  const found = [];
  if (Array.isArray(raw)) {
    for (let i = 0; i < raw.length; i += 2) {
      const userId = raw[i] != null ? String(raw[i]).trim() : "";
      const linkedDtId = raw[i + 1] != null ? String(raw[i + 1]).trim() : "";
      if (userId && linkedDtId === id) found.push(userId);
    }
  } else if (raw && typeof raw === "object") {
    for (const userId of Object.keys(raw)) {
      if (String(raw[userId] || "").trim() === id) found.push(String(userId).trim());
    }
  }
  if (direct) found.unshift(String(direct).trim());
  const unique = [...new Set(found.filter(Boolean))];
  for (const userId of unique) {
    if (userId.startsWith("tg_")) return userId;
  }
  for (const userId of unique) {
    if (userId.startsWith("vk_")) return userId;
  }
  for (const userId of unique) {
    if (!/^mail_/.test(userId) && !/^mail_pending_/.test(userId)) return userId;
  }
  return unique[0] || null;
}

async function ensureDtIdForUserId(userId) {
  const rawId = String(userId || "").trim();
  if (/^mail_ID\d{6}$/.test(rawId)) return rawId.slice(5);
  const existing = await getDtIdByUserId(userId);
  if (existing) return existing;
  for (let i = 0; i < 10; i += 1) {
    const candidate = generateDtId();
    const taken = await getUserIdByDtId(candidate);
    if (taken) continue;
    const saved = await redisPipeline([
      ["HSET", DT_IDS_KEY, String(userId), candidate],
      ["HSET", ID_TO_USER_KEY, candidate, String(userId)],
    ]);
    if (saved) return candidate;
  }
  return null;
}

async function linkUserIdToDtId(userId, dtId, preferAsPrimary) {
  const rawUserId = String(userId || "").trim();
  const rawDtId = String(dtId || "").trim();
  if (!rawUserId || !rawDtId) return false;
  const commands = [["HSET", DT_IDS_KEY, rawUserId, rawDtId]];
  if (preferAsPrimary !== false) commands.push(["HSET", ID_TO_USER_KEY, rawDtId, rawUserId]);
  const saved = await redisPipeline(commands);
  return !!saved;
}

async function resolveAccountId(rawId) {
  const id = rawId != null ? String(rawId).trim() : "";
  if (!id) return null;
  if (/^ID\d{6}$/.test(id) || id.startsWith("guest_")) return id;
  if (id.startsWith("tg_") || id.startsWith("vk_") || /^mail_ID\d{6}$/.test(id)) return await ensureDtIdForUserId(id);
  return null;
}

module.exports = {
  DT_IDS_KEY,
  ID_TO_USER_KEY,
  ensureDtIdForUserId,
  getDtIdByUserId,
  getPreferredUserIdByDtId,
  getUserIdByDtId,
  linkUserIdToDtId,
  resolveAccountId,
  redisPipeline,
};
