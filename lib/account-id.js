const { pipeline: redisPipeline, hscanall, sscanall } = require("./redis");
const { canonicalAccountId, ACCOUNT_REDIRECTS_KEY } = require('./account-canonical');

const DT_IDS_KEY = "poker_app:visitor_dt_ids";
const ID_TO_USER_KEY = "poker_app:id_to_user";
const ACCOUNT_USERS_PREFIX = "poker_app:account_users:";

const CREATE_ACCOUNT_SCRIPT = `-- create-account-v2
local function kind(key)
  local t=redis.call('TYPE',key); if type(t)=='table' then return t.ok end; return t
end
for i,key in ipairs(KEYS) do
  local expected=i==3 and 'set' or 'hash'
  local actual=kind(key)
  if actual~='none' and actual~=expected then return redis.error_reply('wrong_key_type') end
end
local existing=redis.call('HGET',KEYS[1],ARGV[1])
if existing then return existing end
if redis.call('HEXISTS',KEYS[2],ARGV[2])==1 or redis.call('HEXISTS',KEYS[4],ARGV[2])==1 then return '' end
redis.call('HSET',KEYS[1],ARGV[1],ARGV[2])
redis.call('HSET',KEYS[2],ARGV[2],ARGV[1])
redis.call('SADD',KEYS[3],ARGV[1])
return ARGV[2]`;

function generateDtId() {
  return "ID" + String(Math.floor(100000 + Math.random() * 900000));
}

async function getDtIdByUserId(userId) {
  if (!userId) return null;
  const rawId = String(userId).trim();
  if (/^ID\d{6}$/.test(rawId)) return canonicalAccountId(rawId);
  if (/^(tg|vk)_ID\d{6}$/.test(rawId)) return canonicalAccountId(rawId.slice(3));
  if (/^mail_ID\d{6}$/.test(rawId)) return canonicalAccountId(rawId.slice(5));
  const res = await redisPipeline([["HGET", DT_IDS_KEY, rawId]], { throwOnError: true, context: 'account.lookup' });
  const value = res && res[0] && res[0].result != null ? String(res[0].result).trim() : "";
  return value ? canonicalAccountId(value) : null;
}

async function getUserIdByDtId(dtId) {
  if (!dtId) return null;
  dtId = await canonicalAccountId(dtId);
  const res = await redisPipeline([["HGET", ID_TO_USER_KEY, String(dtId)]]);
  const value = res && res[0] && res[0].result != null ? String(res[0].result).trim() : "";
  return value || null;
}

async function getPreferredUserIdByDtId(dtId) {
  const id = await canonicalAccountId(dtId);
  if (!id) return null;
  const direct = await getUserIdByDtId(id);
  // The primary mapping is already the preferred identity for normal Telegram,
  // VK and legacy accounts. Do not scan the complete alias hash in this common
  // path: on profile previews it multiplied one wide Redis read per friend.
  if (direct && !/^mail_/.test(direct) && !/^mail_pending_/.test(direct)) {
    return String(direct).trim();
  }
  let found = await sscanall(ACCOUNT_USERS_PREFIX + id, {
    context: "account-id.aliases",
    count: 100,
    maxPages: 10,
  }) || [];
  if (!found.length) {
    const aliases = await hscanall(DT_IDS_KEY, {
      context: "account-id.alias-backfill",
      count: 500,
      maxPages: 100,
    });
    const backfill = [];
    Object.keys(aliases || {}).forEach((userId) => {
      const accountId = String(aliases[userId] || "").trim();
      if (!accountId) return;
      backfill.push(["SADD", ACCOUNT_USERS_PREFIX + accountId, userId]);
      if (accountId === id) found.push(userId);
    });
    if (backfill.length) await redisPipeline(backfill, { context: "account-id.alias-backfill-write" });
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
  if (!rawId) return null;
  const existing = await getDtIdByUserId(rawId);
  if (existing) return existing;
  for (let i = 0; i < 10; i += 1) {
    const candidate = generateDtId();
    const saved = await redisPipeline([['EVAL', CREATE_ACCOUNT_SCRIPT, '4', DT_IDS_KEY,
      ID_TO_USER_KEY, ACCOUNT_USERS_PREFIX + candidate, ACCOUNT_REDIRECTS_KEY, rawId, candidate]],
    { throwOnError: true, context: 'account.create' });
    if (saved[0].result) return canonicalAccountId(saved[0].result);
  }
  return null;
}

async function linkUserIdToDtId(userId, dtId, preferAsPrimary) {
  const rawUserId = String(userId || "").trim();
  const rawDtId = await canonicalAccountId(dtId);
  if (!rawUserId || !/^ID\d{6}$/.test(rawDtId)) return false;
  const rows = await redisPipeline([['HGET', DT_IDS_KEY, rawUserId]], { throwOnError: true });
  const previous = String(rows[0].result || '');
  if (previous && await canonicalAccountId(previous) !== rawDtId) return false;
  const commands = [["HSET", DT_IDS_KEY, rawUserId, rawDtId]];
  commands.push(["SADD", ACCOUNT_USERS_PREFIX + rawDtId, rawUserId]);
  if (preferAsPrimary !== false) commands.push(["HSET", ID_TO_USER_KEY, rawDtId, rawUserId]);
  await require('./redis-atomic').atomicWrite(commands, {
    values: [{ key: DT_IDS_KEY, field: rawUserId, value: previous }], context: 'account.link',
  });
  return true;
}

async function resolveAccountId(rawId) {
  const id = rawId != null ? String(rawId).trim() : "";
  if (!id) return null;
  if (id.startsWith("guest_")) return id;
  if (/^ID\d{6}$/.test(id)) return canonicalAccountId(id);
  if (/^(tg|vk)_ID\d{6}$/.test(id)) return canonicalAccountId(id.slice(3));
  if (id.startsWith("tg_") || id.startsWith("vk_") || /^mail_ID\d{6}$/.test(id)) return await ensureDtIdForUserId(id);
  return null;
}

module.exports = {
  CREATE_ACCOUNT_SCRIPT,
  canonicalAccountId,
  DT_IDS_KEY,
  ID_TO_USER_KEY,
  ACCOUNT_USERS_PREFIX,
  ensureDtIdForUserId,
  getDtIdByUserId,
  getPreferredUserIdByDtId,
  getUserIdByDtId,
  linkUserIdToDtId,
  resolveAccountId,
  redisPipeline,
};
