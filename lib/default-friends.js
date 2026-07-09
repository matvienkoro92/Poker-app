const DEFAULT_FRIEND_ACCOUNT_IDS = [
  "ID803668", // Анна
  "ID403173", // Waaar
  "ID400800", // ПокерМанки
];

function normalizeAccountId(id) {
  return String(id || "").trim();
}

function getDefaultFriendAccountIds(viewerAccountId) {
  const viewer = normalizeAccountId(viewerAccountId);
  return DEFAULT_FRIEND_ACCOUNT_IDS.filter((id) => id && id !== viewer);
}

function isDefaultFriendPair(viewerAccountId, targetAccountId) {
  const target = normalizeAccountId(targetAccountId);
  if (!target) return false;
  return getDefaultFriendAccountIds(viewerAccountId).indexOf(target) !== -1;
}

function mergeDefaultFriendAccountIds(accountIds, viewerAccountId) {
  const seen = {};
  const out = [];
  const add = (id) => {
    const clean = normalizeAccountId(id);
    if (!clean || seen[clean]) return;
    seen[clean] = true;
    out.push(clean);
  };
  (Array.isArray(accountIds) ? accountIds : []).forEach(add);
  getDefaultFriendAccountIds(viewerAccountId).forEach(add);
  return out;
}

function markDefaultFriendRows(rows, viewerAccountId) {
  const defaultIds = new Set(getDefaultFriendAccountIds(viewerAccountId));
  return (Array.isArray(rows) ? rows : []).map((row) => {
    const userId = normalizeAccountId(row && row.userId);
    if (!defaultIds.has(userId)) return row;
    return { ...row, defaultFriend: true };
  });
}

module.exports = {
  getDefaultFriendAccountIds,
  isDefaultFriendPair,
  mergeDefaultFriendAccountIds,
  markDefaultFriendRows,
};
