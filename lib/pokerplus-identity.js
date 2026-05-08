const { getPreferredUserIdByDtId } = require("./account-id");

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
  const seen = new Set();
  return [current, preferred].filter(function (value) {
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
