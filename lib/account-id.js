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

async function ensureDtIdForUserId(userId) {
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

async function resolveAccountId(rawId) {
  const id = rawId != null ? String(rawId).trim() : "";
  if (!id) return null;
  if (/^ID\d{6}$/.test(id) || id.startsWith("guest_")) return id;
  if (id.startsWith("tg_") || id.startsWith("vk_")) return await ensureDtIdForUserId(id);
  return null;
}

module.exports = {
  DT_IDS_KEY,
  ID_TO_USER_KEY,
  ensureDtIdForUserId,
  getDtIdByUserId,
  getUserIdByDtId,
  resolveAccountId,
  redisPipeline,
};
