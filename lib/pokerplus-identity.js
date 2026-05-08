const { DT_IDS_KEY, getPreferredUserIdByDtId, getUserIdByDtId, redisPipeline } = require("./account-id");

function pokerPlusTelegramIdFromIdentity(identity) {
  if (!identity || identity.vkId != null) return "";
  return identity.id != null && Number(identity.id) > 0 ? String(identity.id).trim() : "";
}

function pokerPlusTelegramIdFromUserId(userId) {
  const raw = String(userId || "").trim();
  return /^tg_\d+$/.test(raw) ? raw.replace(/^tg_/, "") : "";
}

async function pokerPlusTelegramIdCandidates(accountId, identity) {
  const current = pokerPlusTelegramIdFromIdentity(identity);
  const preferred = accountId ? pokerPlusTelegramIdFromUserId(await getPreferredUserIdByDtId(accountId)) : "";
  const direct = accountId ? pokerPlusTelegramIdFromUserId(await getUserIdByDtId(accountId)) : "";
  const linked = [];
  if (accountId) {
    const res = await redisPipeline([["HGETALL", DT_IDS_KEY]]);
    const raw = res && res[0] ? res[0].result : null;
    if (Array.isArray(raw)) {
      for (let i = 0; i < raw.length; i += 2) {
        const userId = raw[i] != null ? String(raw[i]).trim() : "";
        const linkedDtId = raw[i + 1] != null ? String(raw[i + 1]).trim() : "";
        if (linkedDtId === String(accountId).trim()) linked.push(pokerPlusTelegramIdFromUserId(userId));
      }
    } else if (raw && typeof raw === "object") {
      Object.keys(raw).forEach(function (userId) {
        if (String(raw[userId] || "").trim() === String(accountId).trim()) {
          linked.push(pokerPlusTelegramIdFromUserId(userId));
        }
      });
    }
  }
  const seen = new Set();
  return [current, preferred, direct].concat(linked).filter(function (value) {
    const normalized = String(value || "").trim();
    if (!normalized || seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}

module.exports = {
  pokerPlusTelegramIdCandidates,
  pokerPlusTelegramIdFromIdentity,
  pokerPlusTelegramIdFromUserId,
};
