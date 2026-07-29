const USERNAME_TO_USER_KEY = "poker_app:visitor_username_to_user";
const USERNAME_SEARCH_BUCKET_PREFIX = "poker_app:visitor_username_search_bucket:v1:";
const USERNAME_SEARCH_READY_KEY = "poker_app:visitor_username_search_ready:v1";

function normalizeUsernameSearch(value) {
  return String(value || "").trim().replace(/^@+/, "").toLowerCase();
}

function usernameSearchBucket(value) {
  const normalized = normalizeUsernameSearch(value);
  return normalized.slice(0, Math.min(2, normalized.length));
}

function usernameSearchIndexCommands(userId, username) {
  const id = String(userId || "").trim();
  const normalized = normalizeUsernameSearch(username);
  if (!id || !normalized) return [];
  return [
    ["HSET", USERNAME_TO_USER_KEY, normalized, id],
    ["SADD", USERNAME_SEARCH_BUCKET_PREFIX + usernameSearchBucket(normalized), id],
  ];
}

module.exports = {
  USERNAME_SEARCH_BUCKET_PREFIX,
  USERNAME_SEARCH_READY_KEY,
  USERNAME_TO_USER_KEY,
  normalizeUsernameSearch,
  usernameSearchBucket,
  usernameSearchIndexCommands,
};
