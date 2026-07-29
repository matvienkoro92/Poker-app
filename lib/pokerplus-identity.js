const { ACCOUNT_USERS_PREFIX, getPreferredUserIdByDtId, getUserIdByDtId } = require("./account-id");
const { sscanall } = require("./redis");

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
    const aliases = await sscanall(ACCOUNT_USERS_PREFIX + String(accountId).trim(), {
      context: "pokerplus.identity-aliases",
      count: 100,
      maxPages: 10,
    }) || [];
    aliases.forEach(function (userId) {
      linked.push(pokerPlusTelegramIdFromUserId(userId));
    });
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
