function chatListRowNormalizedName(value) {
  return String(value || "").trim().replace(/^@+/, "").toLowerCase();
}
function pokerNormalizeLegacyAccountLabel(value) {
  var raw = value != null ? String(value).trim() : "";
  if (!raw) return "";
  if (/^(tg|vk)_ID\d{6}$/.test(raw)) return raw.slice(3);
  if (/^mail_ID\d{6}$/.test(raw)) return raw.slice(5);
  return raw;
}
function chatContactMatchesFriendSet(c, friendSet) {
  if (!c || c.isGroupChat || !friendSet) return false;
  var keys = [c.id, c.dtId, c.accountId, c.userId, c.chatUserId, c.__friendAccountId];
  for (var ki = 0; ki < keys.length; ki++) {
    var rawKey = keys[ki];
    if (rawKey == null || rawKey === "") continue;
    var key = String(rawKey);
    if (friendSet[key]) return true;
    try {
      var normKey = typeof normalizePeerIdForChat === "function" ? normalizePeerIdForChat(key) : key;
      if (normKey && friendSet[normKey]) return true;
    } catch (eFriendMatchNorm) {}
  }
  return false;
}
function pokerSanitizeContactsPayloadForUi(data) {
  if (!data || typeof data !== "object") return data;
  if (Array.isArray(data)) {
    return data.map(function (item) {
      return pokerSanitizeContactsPayloadForUi(item);
    });
  }
  var out = Object.assign({}, data);
  if (Array.isArray(data.contacts)) {
    out.contacts = data.contacts.map(function (row) {
      if (!row || typeof row !== "object") return row;
      var nextRow = Object.assign({}, row);
      if (nextRow.name != null) nextRow.name = pokerNormalizeLegacyAccountLabel(nextRow.name);
      if (nextRow.contactName != null) nextRow.contactName = pokerNormalizeLegacyAccountLabel(nextRow.contactName);
      return nextRow;
    });
  }
  if (Array.isArray(data.friends)) {
    out.friends = data.friends.map(function (row) {
      if (!row || typeof row !== "object") return row;
      var nextRow = Object.assign({}, row);
      if (nextRow.userName != null) nextRow.userName = pokerNormalizeLegacyAccountLabel(nextRow.userName);
      if (nextRow.contactName != null) nextRow.contactName = pokerNormalizeLegacyAccountLabel(nextRow.contactName);
      return nextRow;
    });
  }
  return out;
}
function chatListRowAlias(c, friendSet) {
  var isFriendContact = chatContactMatchesFriendSet(c, friendSet);
  if (!isFriendContact || !c) return "";
  var alias = c.contactName != null && String(c.contactName).trim() ? String(c.contactName).trim() : "";
  if (!alias) return "";
  alias = pokerNormalizeLegacyAccountLabel(alias);
  var baseName = pokerNormalizeLegacyAccountLabel(c.name != null ? String(c.name).trim() : "");
  if (chatListRowNormalizedName(alias) === chatListRowNormalizedName(baseName)) return "";
  return alias;
}
function chatListRowDisplayTitle(c, friendSet) {
  var alias = chatListRowAlias(c, friendSet);
  return alias || pokerNormalizeLegacyAccountLabel(c && c.name ? c.name : c && c.id ? c.id : "");
}
function chatCachedFriendRows() {
  try {
    var cache = window.__pokerFriendsPickCache;
    return cache && Array.isArray(cache.friends) ? cache.friends.filter(function (row) { return row && row.userId; }) : [];
  } catch (eFriendsCacheRows) {
    return [];
  }
}
function chatBuildFriendContactsFromFriendsApi(friendRows, contacts) {
  var byId = {};
  function addKey(key, row) {
    if (key == null || key === "" || !row) return;
    byId[String(key)] = row;
    try {
      var norm = typeof normalizePeerIdForChat === "function" ? normalizePeerIdForChat(String(key)) : String(key);
      if (norm) byId[String(norm)] = row;
    } catch (eFriendNormKey) {}
  }
  (contacts || []).forEach(function (c) {
    if (!c || c.isGroupChat) return;
    addKey(c.id, c);
    addKey(c.accountId, c);
    addKey(c.userId, c);
    addKey(c.chatUserId, c);
  });
  return (friendRows || []).map(function (f) {
    var friendUserId = f && f.userId != null ? String(f.userId).trim() : "";
    if (!friendUserId) return null;
    var chatUserId = f.chatUserId != null && String(f.chatUserId).trim() ? String(f.chatUserId).trim() : "";
    var matched = byId[chatUserId] || byId[friendUserId] || null;
    var displayName = pokerNormalizeLegacyAccountLabel(f.contactName || f.userName || friendUserId);
    var baseName = pokerNormalizeLegacyAccountLabel(f.userName || friendUserId);
    var row = Object.assign({}, matched || {});
    row.id = chatUserId || (matched && matched.id) || friendUserId;
    row.name = baseName;
    row.contactName = f.contactName ? pokerNormalizeLegacyAccountLabel(f.contactName) : "";
    if (!row.contactName && displayName && displayName !== baseName) row.contactName = displayName;
    row.isGroupChat = false;
    row.admin = !!row.admin;
    row.online = !!row.online;
    row.unreadCount = Math.max(0, Number(row.unreadCount) || 0);
    row.__friendAccountId = friendUserId;
    return row;
  }).filter(Boolean);
}
