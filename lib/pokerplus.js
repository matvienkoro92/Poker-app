const { redisPipeline } = require("./account-id");

const POKERPLUS_BASE_URL = String(process.env.POKERPLUS_BASE_URL || "https://sp.poker21pro.com/service_v1").replace(/\/$/, "");
const POKERPLUS_MERCHANT_ID = String(process.env.POKERPLUS_MERCHANT_ID || "").trim();
const POKERPLUS_SECRET_KEY = String(process.env.POKERPLUS_SECRET_KEY || "").trim();

const TOKEN_CACHE_KEY = "poker_app:pokerplus:token";
const BIND_HASH_KEY = "poker_app:pokerplus_user_ids";
const PROFILE_HASH_KEY = "poker_app:pokerplus_profiles";
const PROFILE_SYNC_AT_HASH_KEY = "poker_app:pokerplus_profiles_synced_at";

function hasPokerPlusConfig() {
  return !!(POKERPLUS_BASE_URL && POKERPLUS_MERCHANT_ID && POKERPLUS_SECRET_KEY);
}

async function postForm(endpoint, payload) {
  const form = new FormData();
  Object.keys(payload || {}).forEach(function (key) {
    if (payload[key] == null) return;
    form.append(key, String(payload[key]));
  });
  const res = await fetch(POKERPLUS_BASE_URL + "/" + endpoint, {
    method: "POST",
    body: form,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error("PokerPlus HTTP " + res.status);
    err.statusCode = res.status;
    err.payload = data;
    throw err;
  }
  return data;
}

function unwrapSuccessResponse(data, fallbackMessage) {
  if (data && Number(data.status) === 1) return data.data || {};
  const err = new Error(
    (data && (data.message || data.error || data.msg)) || fallbackMessage || "PokerPlus request failed"
  );
  err.statusCode = 502;
  err.payload = data;
  throw err;
}

async function readCachedToken() {
  const pipe = await redisPipeline([["GET", TOKEN_CACHE_KEY]]);
  const value = pipe && pipe[0] && pipe[0].result != null ? String(pipe[0].result).trim() : "";
  return value || "";
}

async function writeCachedToken(token) {
  if (!token) return;
  await redisPipeline([["SETEX", TOKEN_CACHE_KEY, "28740", String(token)]]);
}

async function getPokerPlusToken(forceRefresh) {
  if (!hasPokerPlusConfig()) {
    const err = new Error("PokerPlus is not configured");
    err.statusCode = 500;
    throw err;
  }
  if (!forceRefresh) {
    const cached = await readCachedToken();
    if (cached) return cached;
  }
  const tokenResp = await postForm("getToken", {
    merchantId: POKERPLUS_MERCHANT_ID,
    secretKey: POKERPLUS_SECRET_KEY,
  });
  const tokenData = unwrapSuccessResponse(tokenResp, "PokerPlus token request failed");
  const token = tokenData && tokenData.token ? String(tokenData.token).trim() : "";
  if (!token) {
    const err = new Error("PokerPlus token is empty");
    err.statusCode = 502;
    throw err;
  }
  await writeCachedToken(token);
  return token;
}

async function requestWithToken(endpoint, payload, retryOnAuthError) {
  const token = await getPokerPlusToken(false);
  try {
    const res = await postForm(endpoint, Object.assign({}, payload || {}, { token }));
    return unwrapSuccessResponse(res, "PokerPlus request failed");
  } catch (err) {
    if (retryOnAuthError !== false) {
      const msg = String((err && err.payload && err.payload.message) || err.message || "").toLowerCase();
      if (msg.indexOf("token") !== -1 || msg.indexOf("expired") !== -1 || msg.indexOf("invalid") !== -1) {
        const freshToken = await getPokerPlusToken(true);
        const retryRes = await postForm(endpoint, Object.assign({}, payload || {}, { token: freshToken }));
        return unwrapSuccessResponse(retryRes, "PokerPlus request failed");
      }
    }
    throw err;
  }
}

function normalizePlayerProfile(data, linkedUserId) {
  const total = data && data.total_counter && typeof data.total_counter === "object" ? data.total_counter : {};
  return {
    linked: true,
    pokerPlusUserId: data && data.Id != null ? String(data.Id).trim() : linkedUserId || null,
    nickname: data && data.Nike != null ? String(data.Nike).trim() : "",
    avatarUrl: data && data.HeadImageUrl != null ? String(data.HeadImageUrl).trim() : "",
    leagueId: data && data.league_id != null ? String(data.league_id).trim() : "",
    groupId: data && data.group_id != null ? String(data.group_id).trim() : "",
    registerDate: data && data.RegisterDate != null ? String(data.RegisterDate).trim() : "",
    position: data && data.position != null ? String(data.position).trim() : "",
    balance: data && data.gold != null ? String(data.gold).trim() : "",
    lastLoginDate: data && data.LastLoginDate != null ? String(data.LastLoginDate).trim() : "",
    lastLoginIp: data && data.LastLoginIp != null ? String(data.LastLoginIp).trim() : "",
    country: data && data.Country != null ? String(data.Country).trim() : "",
    role: data && data.Role != null ? String(data.Role).trim() : "",
    totalCounter: {
      fee: total.fee != null ? Number(total.fee) : null,
      mttWinnings: total.mtt_winnings != null ? Number(total.mtt_winnings) : null,
      sngWinnings: total.sng_winnings != null ? Number(total.sng_winnings) : null,
      hands: total.hands != null ? Number(total.hands) : null,
      winnings: total.winnings != null ? Number(total.winnings) : null,
      bb: total.bb != null ? Number(total.bb) : null,
      ofcWinnings: total.ofc_winnings != null ? Number(total.ofc_winnings) : null,
    },
  };
}

async function saveBoundPokerPlusUserId(accountId, pokerPlusUserId) {
  if (!accountId) return;
  if (pokerPlusUserId) {
    await redisPipeline([["HSET", BIND_HASH_KEY, accountId, String(pokerPlusUserId)]]);
  } else {
    await redisPipeline([["HDEL", BIND_HASH_KEY, accountId]]);
  }
}

async function readBoundPokerPlusUserId(accountId) {
  if (!accountId) return "";
  const pipe = await redisPipeline([["HGET", BIND_HASH_KEY, accountId]]);
  return pipe && pipe[0] && pipe[0].result != null ? String(pipe[0].result).trim() : "";
}

async function savePokerPlusProfile(accountId, profile) {
  if (!accountId || !profile) return;
  await redisPipeline([
    ["HSET", PROFILE_HASH_KEY, accountId, JSON.stringify(profile)],
    ["HSET", PROFILE_SYNC_AT_HASH_KEY, accountId, String(Date.now())],
  ]);
}

async function readPokerPlusProfile(accountId) {
  if (!accountId) return null;
  const pipe = await redisPipeline([
    ["HGET", PROFILE_HASH_KEY, accountId],
    ["HGET", PROFILE_SYNC_AT_HASH_KEY, accountId],
  ]);
  const raw = pipe && pipe[0] && pipe[0].result != null ? String(pipe[0].result) : "";
  if (!raw) return null;
  let parsed = null;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    parsed = null;
  }
  if (!parsed || typeof parsed !== "object") return null;
  const syncedAtRaw = pipe && pipe[1] && pipe[1].result != null ? String(pipe[1].result).trim() : "";
  if (syncedAtRaw) parsed.syncedAt = Number(syncedAtRaw) || null;
  return parsed;
}

async function bindMiniAppPlayer(accountId, ciphertext) {
  const data = await requestWithToken("bindMiniAppPlayer", {
    user_app_id: accountId,
    ciphertext: ciphertext,
  });
  const pokerPlusUserId = data && data.userId != null ? String(data.userId).trim() : "";
  if (!pokerPlusUserId) {
    const err = new Error("PokerPlus bind returned empty userId");
    err.statusCode = 502;
    throw err;
  }
  await saveBoundPokerPlusUserId(accountId, pokerPlusUserId);
  return pokerPlusUserId;
}

async function fetchPlayerInfo(accountId) {
  const data = await requestWithToken("getMiniAppPlayerInfo", { user_app_id: accountId });
  const linkedUserId = data && data.Id != null ? String(data.Id).trim() : "";
  const normalized = normalizePlayerProfile(data, linkedUserId);
  if (normalized.pokerPlusUserId) await saveBoundPokerPlusUserId(accountId, normalized.pokerPlusUserId);
  await savePokerPlusProfile(accountId, normalized);
  return normalized;
}

async function getPlayingTables() {
  const data = await requestWithToken("getPlayingTables", {});
  const list = Array.isArray(data && data.list) ? data.list : [];
  return list.map(function (item) {
    return {
      playerCount: item && item.playerCount != null ? Number(item.playerCount) : 0,
      deskId: item && item.deskId != null ? String(item.deskId).trim() : "",
      deskName: item && item.deskName != null ? String(item.deskName).trim() : "",
      unionId: item && item.unionId != null ? String(item.unionId).trim() : "",
      leagueId: item && item.leagueId != null ? String(item.leagueId).trim() : "",
      groupId: item && item.groupId != null ? String(item.groupId).trim() : "",
      playType: item && item.playType != null ? String(item.playType).trim() : "",
      blindAnnotation: item && item.blindAnnotation != null ? String(item.blindAnnotation).trim() : "",
      entryFees: item && item.entryFees != null ? Number(item.entryFees) : null,
    };
  });
}

async function getUpcomingCompetitions() {
  const data = await requestWithToken("getTheUpcomingCompetitions", {});
  const list = Array.isArray(data && data.list) ? data.list : [];
  return list.map(function (item) {
    return {
      competitionId: item && item.competitionId != null ? String(item.competitionId).trim() : "",
      competitionName: item && item.competitionName != null ? String(item.competitionName).trim() : "",
      unionId: item && item.unionId != null ? String(item.unionId).trim() : "",
      leagueId: item && item.leagueId != null ? String(item.leagueId).trim() : "",
      groupId: item && item.groupId != null ? String(item.groupId).trim() : "",
      playType: item && item.playType != null ? String(item.playType).trim() : "",
      startTime: item && item.startTime != null ? Number(item.startTime) : null,
      endTime: item && item.endTime != null ? Number(item.endTime) : null,
    };
  });
}

async function getMaintenanceStatus() {
  const data = await requestWithToken("getGameMaintainStatus", {});
  return {
    maintainStatus: data && data.maintainStatus != null ? Number(data.maintainStatus) : -1,
    startTime: data && data.startTime != null ? String(data.startTime).trim() : "",
    endTime: data && data.endTime != null ? String(data.endTime).trim() : "",
    content: data && data.content != null ? String(data.content).trim() : "",
    title: data && data.title != null ? String(data.title).trim() : "",
  };
}

module.exports = {
  BIND_HASH_KEY,
  PROFILE_HASH_KEY,
  PROFILE_SYNC_AT_HASH_KEY,
  bindMiniAppPlayer,
  fetchPlayerInfo,
  getMaintenanceStatus,
  getPlayingTables,
  getUpcomingCompetitions,
  hasPokerPlusConfig,
  readBoundPokerPlusUserId,
  readPokerPlusProfile,
};
