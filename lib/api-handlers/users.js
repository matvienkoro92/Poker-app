/**
 * Пользователи: dtId (мой ID), поиск по ID и по нику (Telegram username).
 * GET ?initData= → dtId (и обновление сохранённого username из Telegram)
 * GET ?initData=&id=ID123456 → userId, userName для личного чата
 * GET ?initData=&username=xxx → userId, userName по нику (без @ или с @)
 */
const crypto = require("crypto");
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { guestMemberIdFromDeviceId } = require("../guest-member-id");
const { getLinkedDtIdByEmail, getLinkedEmailOriginalByDtId } = require("../email-auth");
const { ensureDtIdForUserId, getUserIdByDtId, getPreferredUserIdByDtId, ID_TO_USER_KEY, DT_IDS_KEY, linkUserIdToDtId } = require("../account-id");
const { resolveTrustedDtIdHintForUserId } = require("../account-link-guard");
const { isAdminIdentity } = require("../api-auth");
const { PROFILE_HASH_KEY, readPokerPlusProfile } = require("../pokerplus");
const {
  canReachTelegramBot,
  isTelegramChannelSubscriber,
  requiredBotHandle,
  requiredChannelHandle,
  telegramHandleUrl,
} = require("../telegram-participation-gate");
const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
const { pokerProfileStatusFromCachedProfile } = require("../chat-profile-status");
const { isDefaultFriendPair } = require("../default-friends");
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const RAFFLE_CHANNEL = process.env.RAFFLE_CHANNEL || "@Dva_tuza_club";
const RAFFLE_ACCOUNT_SUBSCRIBERS_KEY = "poker_app:raffle_account_subscribers";
const POKERPLUS_BIND_HASH_KEY = "poker_app:pokerplus_user_ids";
const POKERPLUS_STATS_VISIBLE_KEY = "poker_app:pokerplus_stats_visible";
const POKERPLUS_STATS_VISIBILITY_KEY = "poker_app:pokerplus_stats_visibility";
const POKERPLUS_STATS_KINDS = ["cash", "mtt", "sng"];
const TELEGRAM_VISIBLE_KEY = "poker_app:telegram_visible";
const PROFILE_GENDER_KEY = "poker_app:profile_gender";
const PROFILE_BIRTH_DATE_KEY = "poker_app:profile_birth_dates";
const PROFILE_SPECIALTY_KEY = "poker_app:profile_specialties";
const PROFILE_MTT_PREFERENCES_KEY = "poker_app:profile_mtt_preferences";
const PROFILE_CASH_PREFERENCES_KEY = "poker_app:profile_cash_preferences";
const PROFILE_MTT_PREFERENCE_VALUES = ["under500", "1k5k", "5kplus", "offline"];
const PROFILE_CASH_PREFERENCE_VALUES = ["up-to-5-10", "10-20-20-40", "25-50-50-100", "50-100-plus"];
const USERNAMES_KEY = "poker_app:visitor_usernames";
const PERSONAL_KEY = "poker_app:visitor_personal";
const FRIENDSHIPS_KEY_PREFIX = "poker_app:friendships:";
const FRIEND_REQUESTS_OUT_KEY_PREFIX = "poker_app:friend_requests:out:";
const FRIEND_ALIAS_KEY_PREFIX = "poker_app:friend_alias:";
const FRIEND_CONTACT_NAME_MAX = 80;
const CHAT_DISPLAY_NAMES_KEY = "poker_app:visitor_chat_display_names";
const CHAT_DISPLAY_NAME_MAX = 80;
const CHAT_LAST_SEEN_HASH = "poker_app:chat_last_seen";
const CHAT_ONLINE_TTL_MS = 5 * 60 * 1000;

function pokerProfileFeeFromCachedProfile(profile) {
  const total =
    profile && profile.totalCounter && typeof profile.totalCounter === "object"
      ? profile.totalCounter
      : profile && profile.total_counter && typeof profile.total_counter === "object"
        ? profile.total_counter
        : {};
  const fee = total.fee != null ? Number(total.fee) : null;
  return Number.isFinite(fee) ? fee : null;
}

function pokerPlusBool(value) {
  return value === true || value === 1 || value === "1" || value === "true";
}

function publicBool(value) {
  return !(value === false || value === 0 || value === "0" || value === "false" || value === "no" || value === "off");
}

function normalizeProfileGender(value) {
  const raw = String(value || "").trim().toLowerCase();
  if (raw === "female" || raw === "f" || raw === "woman" || raw === "ж" || raw === "жен" || raw === "женский") return "female";
  return "male";
}

function normalizeProfileBirthDate(value) {
  const raw = String(value || "").trim();
  const m = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return "";
  const year = parseInt(m[1], 10);
  const month = parseInt(m[2], 10);
  const day = parseInt(m[3], 10);
  if (year < 1900 || month < 1 || month > 12 || day < 1 || day > 31) return "";
  const d = new Date(Date.UTC(year, month - 1, day));
  if (
    d.getUTCFullYear() !== year ||
    d.getUTCMonth() !== month - 1 ||
    d.getUTCDate() !== day ||
    d.getTime() > Date.now()
  ) {
    return "";
  }
  return raw;
}

function normalizeProfileSpecialty(value) {
  const raw = String(value || "").trim().toLowerCase();
  if (raw === "mtt" || raw === "мтт" || raw === "tournament" || raw === "tournaments") return "mtt";
  if (raw === "cash" || raw === "кеш" || raw === "кэш") return "cash";
  return "";
}

function normalizeProfilePreferenceList(value, allowed, maxCount) {
  let raw = Array.isArray(value) ? value : null;
  if (!raw) {
    const text = String(value || "").trim();
    if (text.startsWith("[") && text.endsWith("]")) {
      try {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) raw = parsed;
      } catch (ePreferenceJson) {}
    }
    if (!raw) raw = text.split(/[,\s]+/).filter(Boolean);
  }
  const allowedSet = new Set(allowed);
  const out = [];
  raw.forEach((item) => {
    const key = String(item || "").trim();
    if (!allowedSet.has(key) || out.includes(key)) return;
    if (maxCount && out.length >= maxCount) return;
    out.push(key);
  });
  return out;
}

function normalizeProfileMttPreferences(value) {
  return normalizeProfilePreferenceList(value, PROFILE_MTT_PREFERENCE_VALUES, 0);
}

function normalizeProfileCashPreferences(value) {
  return normalizeProfilePreferenceList(value, PROFILE_CASH_PREFERENCE_VALUES, 2);
}

function profilePreferencesJson(list) {
  return JSON.stringify(Array.isArray(list) ? list : []);
}

function redisTruthy(row) {
  if (!row || row.error) return false;
  const value = row.result;
  return value === true || value === 1 || value === "1" || String(value || "").toLowerCase() === "true";
}

function telegramIdFromUserId(userId) {
  const raw = String(userId || "").trim();
  return /^tg_\d+$/.test(raw) ? raw.replace(/^tg_/, "") : "";
}

function telegramIdFromIdentity(identity) {
  if (!identity || identity.vkId != null) return "";
  const n = Number(identity.id);
  return Number.isFinite(n) && n > 0 ? String(Math.trunc(n)) : "";
}

function maskTelegramUserNameForViewer(userName, visible, admin) {
  const raw = String(userName || "").trim();
  if (!raw || raw === "без TG") return raw || "без TG";
  if (admin || visible || raw.indexOf("@") !== 0) return raw;
  return "без TG";
}

async function isRaffleAccountSubscriber(accountId) {
  const id = String(accountId || "").trim();
  if (!id || /^guest_/.test(id)) return false;
  try {
    const rows = await redisPipeline([["SISMEMBER", RAFFLE_ACCOUNT_SUBSCRIBERS_KEY, id]]);
    return redisTruthy(rows && rows[0]);
  } catch (e) {
    return false;
  }
}

async function resolveCurrentAccountId(identity, memberId) {
  const rawMemberId = memberId != null ? String(memberId).trim() : "";
  if (!rawMemberId) return "";
  if (/^guest_/.test(rawMemberId)) return rawMemberId;
  const email = identity && identity.email != null ? String(identity.email).trim() : "";
  const isEmailSession =
    !!String(identity && identity.emailMemberId != null ? identity.emailMemberId : "").trim() ||
    /^mail_/.test(rawMemberId) ||
    /^mail_pending_/.test(rawMemberId);
  if (email && isEmailSession) {
    try {
      const linkedDtId = await getLinkedDtIdByEmail(email);
      if (/^ID\d{6}$/.test(String(linkedDtId || "").trim())) return String(linkedDtId).trim();
    } catch (eEmailDtLookup) {}
  }
  return await ensureDtIdForUserId(rawMemberId);
}

async function buildTelegramSubscriptionStatus(accountId, identity, userIds) {
  const botHandle = requiredBotHandle();
  const channelHandle = requiredChannelHandle(RAFFLE_CHANNEL);
  const accountSubscribed = await isRaffleAccountSubscriber(accountId);
  const candidates = [];
  const identityEmailMemberId = identity && identity.emailMemberId != null ? String(identity.emailMemberId).trim() : "";
  if (/^tg_\d+$/.test(identityEmailMemberId)) candidates.push(telegramIdFromUserId(identityEmailMemberId));
  (Array.isArray(userIds) ? userIds : []).forEach((id) => {
    const tgId = telegramIdFromUserId(id);
    if (tgId) candidates.push(tgId);
  });
  if (!identityEmailMemberId) candidates.push(telegramIdFromIdentity(identity));
  const telegramId = [...new Set(candidates.filter(Boolean))][0] || "";
  let botSubscribed = false;
  let channelSubscribed = false;
  let checkedByTelegram = false;
  if (telegramId && BOT_TOKEN) {
    const results = await Promise.all([
      canReachTelegramBot(telegramId, BOT_TOKEN),
      isTelegramChannelSubscriber(telegramId, BOT_TOKEN, channelHandle),
    ]);
    botSubscribed = results[0] === true;
    channelSubscribed = results[1] === true;
    checkedByTelegram = true;
  }
  return {
    botHandle,
    botUrl: telegramHandleUrl(botHandle),
    channelHandle,
    channelUrl: telegramHandleUrl(channelHandle),
    botSubscribed: botSubscribed || accountSubscribed,
    channelSubscribed: channelSubscribed || accountSubscribed,
    accountSubscribed,
    telegramChecked: checkedByTelegram,
  };
}

function normalizePokerPlusStatsVisibility(value, fallbackVisible = false) {
  let source = value;
  if (typeof source === "string") {
    const raw = source.trim();
    if (raw.startsWith("{")) {
      try {
        source = JSON.parse(raw);
      } catch (e) {
        source = raw;
      }
    }
  }
  const visibility = {};
  if (source && typeof source === "object" && !Array.isArray(source)) {
    for (const kind of POKERPLUS_STATS_KINDS) visibility[kind] = pokerPlusBool(source[kind]);
    return visibility;
  }
  const visible = source === undefined || source === null || source === "" ? !!fallbackVisible : pokerPlusBool(source);
  for (const kind of POKERPLUS_STATS_KINDS) visibility[kind] = visible;
  return visibility;
}

function pokerPlusStatsVisibilityAny(visibility) {
  return POKERPLUS_STATS_KINDS.some((kind) => !!(visibility && visibility[kind]));
}

function pokerPlusStatsVisibilityJson(visibility) {
  const normalized = normalizePokerPlusStatsVisibility(visibility, false);
  return JSON.stringify({
    cash: !!normalized.cash,
    mtt: !!normalized.mtt,
    sng: !!normalized.sng,
  });
}

function redisHashPairsToObject(raw) {
  if (!Array.isArray(raw)) return {};
  const out = {};
  for (let i = 0; i < raw.length; i += 2) {
    const key = String(raw[i] || "").trim();
    if (!key) continue;
    out[key] = raw[i + 1];
  }
  return out;
}

function safeJsonParse(value, fallback = null) {
  if (value == null || value === false) return fallback;
  try {
    return JSON.parse(String(value));
  } catch (e) {
    return fallback;
  }
}

function normalizeRatingNickKey(value) {
  return String(value || "")
    .trim()
    .replace(/^@+/, "")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function normalizeRatingNickAliasKey(value) {
  const key = normalizeRatingNickKey(value);
  if (key === "pryanik2la") return "пряник";
  if (key === "фокс") return "фокс";
  if (key === "waaarr" || key === "waaar" || key === "waaaar") return "waaar";
  if (key === "andrushamorf" || key === "4ezzi") return "frankl";
  if (key === "em13" || key === "em13!!" || key === "emil13" || key === "еm13" || key === "еm13!!") return "em13!!";
  if (key === "odna.pluha" || key === "илья odna.pluha") return "odna.pluha";
  if (key === "бардюр") return "бардюр";
  if (key === "fishkopcheny" || key === "фишкопченый" || key === "фишкапченый") return "fishkopcheny";
  if (key === "voron" || key === "ворон" || key === "voron💰💰💰") return "voron";
  if (key.replace(/💰/g, "") === "voron") return "voron";
  if (/^хер вам\)+$/.test(key)) return "хер вам)))))";
  return key;
}

function pokerPlusNicknameCandidates(profile) {
  const p = profile && typeof profile === "object" ? profile : {};
  return [
    p.nickname,
    p.Nike,
    p.nick,
    p.name,
    p.displayName,
    p.display_name,
  ]
    .map((value) => String(value || "").trim())
    .filter(Boolean);
}

async function resolveAccountByRatingNick(ratingNick) {
  const targetKey = normalizeRatingNickKey(ratingNick);
  const targetAliasKey = normalizeRatingNickAliasKey(ratingNick);
  const targetPokerPlusId = String(ratingNick || "")
    .trim()
    .replace(/^@+/, "")
    .replace(/^(?:poker\s*21|p21|pp)\s*[:#-]?\s*/i, "")
    .trim()
    .toLowerCase();
  if (!targetKey || !redisConfigured()) return null;
  const rows = await redisPipeline([
    ["HGETALL", POKERPLUS_BIND_HASH_KEY],
    ["HGETALL", PROFILE_HASH_KEY],
  ], { timeoutMs: 10000 });
  const bind = redisHashPairsToObject(rows && rows[0] && rows[0].result);
  const profiles = redisHashPairsToObject(rows && rows[1] && rows[1].result);
  const accountIds = Array.from(new Set(Object.keys(bind).concat(Object.keys(profiles))));
  let fallback = null;
  for (const accountId of accountIds) {
    const profile = safeJsonParse(profiles[accountId], null);
    const profilePokerPlusUserId = profile && profile.pokerPlusUserId != null ? profile.pokerPlusUserId : profile && profile.p21Id;
    const pokerPlusUserId = String(bind[accountId] || profilePokerPlusUserId || "").trim();
    const candidates = pokerPlusNicknameCandidates(profile);
    const matchedNick = candidates.find((name) => {
      const key = normalizeRatingNickKey(name);
      return key === targetKey || normalizeRatingNickAliasKey(name) === targetAliasKey;
    });
    const matchedPokerPlusId =
      targetPokerPlusId &&
      pokerPlusUserId &&
      pokerPlusUserId.toLowerCase() === targetPokerPlusId;
    if (!matchedNick && !matchedPokerPlusId) continue;
    const result = {
      accountId,
      pokerPlusUserId,
      pokerPlusNickname: matchedNick || candidates[0] || "",
    };
    if (String(accountId || "").startsWith("ID")) return result;
    if (!fallback) fallback = result;
  }
  return fallback;
}

function pokerProfilePublicStatsFromCachedProfile(profile, visibility) {
  const statsVisibility = visibility
    ? normalizePokerPlusStatsVisibility(visibility, false)
    : normalizePokerPlusStatsVisibility(true, true);
  const total =
    profile && profile.totalCounter && typeof profile.totalCounter === "object"
      ? profile.totalCounter
      : profile && profile.total_counter && typeof profile.total_counter === "object"
        ? profile.total_counter
        : {};
  const pick = (key, snakeKey) => {
    const raw = total[key] != null ? total[key] : snakeKey && total[snakeKey] != null ? total[snakeKey] : null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  };
  const pickNonNegative = (key, snakeKey) => {
    const n = pick(key, snakeKey);
    return n != null && n < 0 ? null : n;
  };
  const out = {};
  if (statsVisibility.cash) {
    out.fee = pick("fee");
    out.hands = pick("hands");
    out.bb = pick("bb");
    out.winnings = pickNonNegative("winnings");
    out.ofcWinnings = pickNonNegative("ofcWinnings", "ofc_winnings");
  }
  if (statsVisibility.mtt) {
    out.mttRound = pick("mttRound", "mtt_round");
    out.mttWinnings = pickNonNegative("mttWinnings", "mtt_winnings");
    out.mttCount = pick("mttCount", "mtt_count");
    out.mttItmCount = pick("mttItmCount", "mtt_itm_count");
    out.mttFirstCount = pick("mttFirstCount", "mtt_1st_count");
  }
  if (statsVisibility.sng) {
    out.sngRound = pick("sngRound", "sng_round");
    out.sngWinnings = pickNonNegative("sngWinnings", "sng_winnings");
    out.sngCount = pick("sngCount", "sng_count");
    out.sngItmCount = pick("sngItmCount", "sng_itm_count");
    out.sngFirstCount = pick("sngFirstCount", "sng_1st_count");
  }
  return out;
}

function uniquePokerProfileLookupIds(ids) {
  return [...new Set([].concat(ids || []).map((id) => String(id || "").trim()).filter(Boolean))];
}

async function readPokerPlusProfileFromCandidates(ids) {
  const lookupIds = uniquePokerProfileLookupIds(ids);
  for (const id of lookupIds) {
    const profile = await readPokerPlusProfile(id);
    if (profile) return profile;
  }
  return null;
}

async function readPokerPlusStatsVisibilityFromCandidates(ids) {
  const lookupIds = uniquePokerProfileLookupIds(ids);
  if (!lookupIds.length) return normalizePokerPlusStatsVisibility(false, false);
  const commands = lookupIds
    .map((id) => ["HGET", POKERPLUS_STATS_VISIBILITY_KEY, id])
    .concat(lookupIds.map((id) => ["HGET", POKERPLUS_STATS_VISIBLE_KEY, id]));
  const rows = await redisPipeline(commands);
  if (!rows) return normalizePokerPlusStatsVisibility(false, false);
  for (let i = 0; i < lookupIds.length; i += 1) {
    const raw = rows[i] && rows[i].result;
    if (raw != null && raw !== false && String(raw).trim()) {
      return normalizePokerPlusStatsVisibility(raw, false);
    }
  }
  const legacyOffset = lookupIds.length;
  const legacyVisible = lookupIds.some((_, index) => rows[legacyOffset + index] && rows[legacyOffset + index].result === "1");
  return normalizePokerPlusStatsVisibility(legacyVisible, false);
}

async function applyPokerProfileStatusPayload(payload, accountId, extraLookupIds) {
  if (!payload || !accountId) return payload;
  try {
    if (!payload.pokerPlusVerified && !payload.p21Id) {
      payload.level = 0;
      payload.statusValue = 0;
      payload.pokerPlusStatsVisible = false;
      payload.pokerPlusStatsVisibility = normalizePokerPlusStatsVisibility(false, false);
      return payload;
    }
    const lookupIds = uniquePokerProfileLookupIds([accountId].concat(extraLookupIds || []));
    const profile = await readPokerPlusProfileFromCandidates(lookupIds);
    const profileNickname = profile && (profile.nickname || profile.Nike || profile.nick || profile.name);
    if (profileNickname) payload.pokerPlusNickname = String(profileNickname).trim().slice(0, 80);
    const fee = pokerProfileFeeFromCachedProfile(profile);
    if (fee != null || profile) {
      const status = pokerProfileStatusFromCachedProfile(profile, { pokerPlusLinked: true });
      payload.level = status.level;
      payload.statusValue = status.statusValue;
      payload.statusPoints = status.points;
    }
    const statsVisibility = await readPokerPlusStatsVisibilityFromCandidates(lookupIds);
    const statsVisible = pokerPlusStatsVisibilityAny(statsVisibility);
    payload.pokerPlusStatsVisibility = statsVisibility;
    payload.pokerPlusStatsVisible = statsVisible;
    if (statsVisible) {
      payload.pokerPlusStats = pokerProfilePublicStatsFromCachedProfile(profile, statsVisibility);
    }
  } catch (e) {}
  return payload;
}

function sanitizeChatDisplayName(raw) {
  const s = String(raw || "")
    .trim()
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .slice(0, CHAT_DISPLAY_NAME_MAX);
  return s;
}

function getUsernameFromInitData(initData) {
  if (!initData || !BOT_TOKEN) return null;
  try {
    const params = new URLSearchParams(initData);
    const hash = params.get("hash");
    params.delete("hash");
    const dataCheckString = [...params.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => k + "=" + v)
      .join("\n");
    const secretKey = crypto.createHmac("sha256", "WebAppData").update(BOT_TOKEN).digest();
    const calculatedHash = crypto.createHmac("sha256", secretKey).update(dataCheckString).digest("hex");
    if (calculatedHash !== hash) return null;
    const user = JSON.parse(params.get("user") || "{}");
    return (user.username || "").trim() || null;
  } catch (e) {
    return null;
  }
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  let body = {};
  if (req.method === "POST") {
    try {
      body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    } catch (e) {
      return res.status(400).json({ ok: false, error: "Invalid JSON" });
    }
  }

  const identity = resolveTelegramIdentity(req, body, BOT_TOKEN);
  let myId = identity ? memberIdFromIdentity(identity) : null;
  const dtIdHint = /^ID\d{6}$/.test(String(req.query.dtIdHint || req.query.dt_id_hint || body.dtIdHint || body.dt_id_hint || "").trim())
    ? String(req.query.dtIdHint || req.query.dt_id_hint || body.dtIdHint || body.dt_id_hint || "").trim()
    : "";
  if (!myId) {
    const gd = (req.query.guestDeviceId || req.query.guest_device_id || body.guestDeviceId || body.guest_device_id || "").trim();
    myId = guestMemberIdFromDeviceId(gd);
  }
  if (!myId) return res.status(401).json({ ok: false, error: "Откройте в Telegram или войдите через сайт" });
  if (dtIdHint && (String(myId).indexOf("tg_") === 0 || String(myId).indexOf("vk_") === 0)) {
    const trustedDtIdHint = await resolveTrustedDtIdHintForUserId(myId, dtIdHint);
    if (trustedDtIdHint) await linkUserIdToDtId(myId, trustedDtIdHint, true);
  }
  const isAdminViewer = !!isAdminIdentity(identity, myId);

  // POST: сохранить personal и/или отображаемое имя (информация для других)
  if (req.method === "POST") {
    if (!redisConfigured()) return res.status(500).json({ ok: false, error: "Сервер не настроен" });
    const safeId = myId;
    const accountId = await resolveCurrentAccountId(identity, safeId);
    if (!accountId) return res.status(500).json({ ok: false, error: "Не удалось подготовить ID аккаунта" });
    const commands = [];

    if (body.personalInfo !== undefined) {
      const personal = String(body.personalInfo || "").trim().slice(0, 500);
      if (personal) commands.push(["HSET", PERSONAL_KEY, accountId, personal]);
      else commands.push(["HDEL", PERSONAL_KEY, accountId]);
    }

    if (body.chatDisplayName !== undefined) {
      const disp = sanitizeChatDisplayName(body.chatDisplayName);
      if (disp) commands.push(["HSET", CHAT_DISPLAY_NAMES_KEY, accountId, disp]);
      else commands.push(["HDEL", CHAT_DISPLAY_NAMES_KEY, accountId]);
    }

    if (body.telegramVisible !== undefined || body.showTelegram !== undefined || body.telegramPublic !== undefined) {
      const visible = publicBool(
        body.telegramVisible !== undefined
          ? body.telegramVisible
          : body.showTelegram !== undefined
            ? body.showTelegram
            : body.telegramPublic
      );
      if (visible) commands.push(["HSET", TELEGRAM_VISIBLE_KEY, accountId, "1"]);
      else commands.push(["HDEL", TELEGRAM_VISIBLE_KEY, accountId]);
    }

    if (body.profileGender !== undefined || body.gender !== undefined || body.sex !== undefined) {
      const gender = normalizeProfileGender(
        body.profileGender !== undefined
          ? body.profileGender
          : body.gender !== undefined
            ? body.gender
            : body.sex
      );
      commands.push(["HSET", PROFILE_GENDER_KEY, accountId, gender]);
    }

    if (body.birthDate !== undefined || body.profileBirthDate !== undefined || body.birthday !== undefined) {
      const birthDate = normalizeProfileBirthDate(
        body.birthDate !== undefined
          ? body.birthDate
          : body.profileBirthDate !== undefined
            ? body.profileBirthDate
            : body.birthday
      );
      if (!birthDate) return res.status(400).json({ ok: false, error: "Некорректная дата рождения" });
      const existingRows = await redisPipeline([
        ["HGET", PROFILE_BIRTH_DATE_KEY, accountId],
        ["HGET", PROFILE_BIRTH_DATE_KEY, safeId],
      ]);
      const existing =
        existingRows && existingRows[0] && existingRows[0].result
          ? normalizeProfileBirthDate(existingRows[0].result)
          : existingRows && existingRows[1] && existingRows[1].result
            ? normalizeProfileBirthDate(existingRows[1].result)
            : "";
      if (existing && existing !== birthDate) {
        return res.status(409).json({ ok: false, error: "Дата рождения уже сохранена" });
      }
      if (!existing) commands.push(["HSET", PROFILE_BIRTH_DATE_KEY, accountId, birthDate]);
      else if (safeId !== accountId && existingRows && existingRows[1] && existingRows[1].result && existingRows[1].result === existing) {
        commands.push(["HSET", PROFILE_BIRTH_DATE_KEY, accountId, existing], ["HDEL", PROFILE_BIRTH_DATE_KEY, safeId]);
      }
    }

    if (body.specialty !== undefined || body.profileSpecialty !== undefined || body.pokerSpecialty !== undefined) {
      const specialty = normalizeProfileSpecialty(
        body.specialty !== undefined
          ? body.specialty
          : body.profileSpecialty !== undefined
            ? body.profileSpecialty
            : body.pokerSpecialty
      );
      if (specialty) commands.push(["HSET", PROFILE_SPECIALTY_KEY, accountId, specialty]);
      else commands.push(["HDEL", PROFILE_SPECIALTY_KEY, accountId]);
    }

    if (body.mttPreferences !== undefined || body.profileMttPreferences !== undefined) {
      const preferences = normalizeProfileMttPreferences(
        body.mttPreferences !== undefined ? body.mttPreferences : body.profileMttPreferences
      );
      if (preferences.length) commands.push(["HSET", PROFILE_MTT_PREFERENCES_KEY, accountId, profilePreferencesJson(preferences)]);
      else commands.push(["HDEL", PROFILE_MTT_PREFERENCES_KEY, accountId]);
    }

    if (body.cashPreferences !== undefined || body.profileCashPreferences !== undefined) {
      const preferences = normalizeProfileCashPreferences(
        body.cashPreferences !== undefined ? body.cashPreferences : body.profileCashPreferences
      );
      if (preferences.length) commands.push(["HSET", PROFILE_CASH_PREFERENCES_KEY, accountId, profilePreferencesJson(preferences)]);
      else commands.push(["HDEL", PROFILE_CASH_PREFERENCES_KEY, accountId]);
    }

    if (body.pokerPlusStatsVisibility !== undefined) {
      const visibility = normalizePokerPlusStatsVisibility(body.pokerPlusStatsVisibility, false);
      const visible = pokerPlusStatsVisibilityAny(visibility);
      commands.push(["HSET", POKERPLUS_STATS_VISIBILITY_KEY, accountId, pokerPlusStatsVisibilityJson(visibility)]);
      if (visible) commands.push(["HSET", POKERPLUS_STATS_VISIBLE_KEY, accountId, "1"]);
      else commands.push(["HDEL", POKERPLUS_STATS_VISIBLE_KEY, accountId]);
    } else if (body.pokerPlusStatsVisible !== undefined) {
      const visible = !(body.pokerPlusStatsVisible === false || body.pokerPlusStatsVisible === 0 || body.pokerPlusStatsVisible === "0" || body.pokerPlusStatsVisible === "false");
      commands.push(["HSET", POKERPLUS_STATS_VISIBILITY_KEY, accountId, pokerPlusStatsVisibilityJson(visible)]);
      if (visible) commands.push(["HSET", POKERPLUS_STATS_VISIBLE_KEY, accountId, "1"]);
      else commands.push(["HDEL", POKERPLUS_STATS_VISIBLE_KEY, accountId]);
    }

    if (commands.length) {
      const pipeResult = await redisPipeline(commands);
      if (!pipeResult) return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
    }
    return res.status(200).json({ ok: true });
  }

  if (req.method !== "GET") return res.status(405).json({ ok: false, error: "GET only" });

  const searchId = (req.query.id || req.query.dtId || "").trim().toUpperCase();
  const searchUserId = (req.query.userId || "").trim();

  if (!redisConfigured()) {
    return res.status(500).json({ ok: false, error: "Redis not configured" });
  }

  const searchRatingNick = (req.query.ratingNick || req.query.rating_nick || "").trim();
  if (searchRatingNick) {
    const matched = await resolveAccountByRatingNick(searchRatingNick);
    if (!matched || !matched.accountId) {
      return res.status(404).json({ ok: false, error: "rating_profile_not_linked" });
    }
    const targetAccountId = String(matched.accountId || "").trim();
    const targetChatUserId = /^ID\d{6}$/.test(targetAccountId) ? await getUserIdByDtId(targetAccountId) : targetAccountId;
    const myAccountId = await resolveCurrentAccountId(identity, myId);
    if (targetAccountId === myAccountId) {
      let selfProfileGender = "male";
      try {
        const genderRows = await redisPipeline([["HGET", PROFILE_GENDER_KEY, targetAccountId]]);
        selfProfileGender = normalizeProfileGender(genderRows && genderRows[0] && genderRows[0].result);
      } catch (eSelfGender) {}
      return res.status(200).json({
        ok: true,
        self: true,
        userId: targetAccountId,
        chatUserId: targetChatUserId || "",
        p21Id: matched.pokerPlusUserId || null,
        pokerPlusVerified: !!matched.pokerPlusUserId,
        pokerPlusNickname: matched.pokerPlusNickname || searchRatingNick,
        profileGender: selfProfileGender,
      });
    }
    const results = await redisPipeline([
      ["HGET", USERNAMES_KEY, targetChatUserId || ""],
      ["HGET", PERSONAL_KEY, targetAccountId],
      ["SISMEMBER", FRIENDSHIPS_KEY_PREFIX + myAccountId, targetAccountId],
      ["HGET", FRIEND_ALIAS_KEY_PREFIX + myAccountId, targetAccountId],
      ["HGET", CHAT_DISPLAY_NAMES_KEY, targetAccountId],
      ["HGET", CHAT_LAST_SEEN_HASH, targetChatUserId || ""],
      ["HGET", POKERPLUS_STATS_VISIBLE_KEY, targetAccountId],
      ["HGET", TELEGRAM_VISIBLE_KEY, targetAccountId],
      ["HGET", FRIEND_REQUESTS_OUT_KEY_PREFIX + myAccountId, targetAccountId],
      ["HGET", PROFILE_GENDER_KEY, targetAccountId],
      ["HGET", PROFILE_BIRTH_DATE_KEY, targetAccountId],
      ["HGET", PROFILE_SPECIALTY_KEY, targetAccountId],
    ]);
    let userName = targetAccountId;
    const un = results && results[0] && results[0].result ? String(results[0].result).trim() : "";
    if (un) userName = "@" + un;
    const personalInfo = results && results[1] && results[1].result ? String(results[1].result).trim() : null;
    const isFriend = (results && results[2] && results[2].result === 1) || isDefaultFriendPair(myAccountId, targetAccountId);
    let contactName = null;
    if (isFriend && results && results[3] && results[3].result != null && results[3].result !== false) {
      const cn = String(results[3].result)
        .trim()
        .replace(/[\u0000-\u001f\u007f]/g, "")
        .slice(0, FRIEND_CONTACT_NAME_MAX);
      if (cn) contactName = cn;
    }
    let chatDisplayName = null;
    if (results && results[4] && results[4].result != null && results[4].result !== false) {
      const cd = sanitizeChatDisplayName(results[4].result);
      if (cd) chatDisplayName = cd;
    }
    const lastSeenRaw = results && results[5] ? results[5].result : null;
    const pokerPlusStatsVisible = !!(results && results[6] && results[6].result === "1");
    const telegramVisible = !!(results && results[7] && results[7].result === "1");
    const friendRequestOutgoing = !isFriend && !!(results && results[8] && results[8].result);
    const profileGender = normalizeProfileGender(results && results[9] && results[9].result);
    const profileBirthDate = normalizeProfileBirthDate(results && results[10] && results[10].result);
    const profileSpecialty = normalizeProfileSpecialty(results && results[11] && results[11].result);
    userName = maskTelegramUserNameForViewer(userName, telegramVisible, isAdminViewer);
    const lastSeenMs = lastSeenRaw != null && lastSeenRaw !== false ? parseFloat(String(lastSeenRaw)) : NaN;
    const nowChat = Date.now();
    const minScoreChat = nowChat - CHAT_ONLINE_TTL_MS;
    const chatOnline = Number.isFinite(lastSeenMs) && lastSeenMs >= minScoreChat;
    let chatLastSeenAt = null;
    if (Number.isFinite(lastSeenMs) && lastSeenMs > 0) chatLastSeenAt = new Date(Math.floor(lastSeenMs)).toISOString();
    const payload = {
      ok: true,
      source: "ratingNick",
      userId: targetAccountId,
      userName,
      p21Id: matched.pokerPlusUserId || null,
      personalInfo: personalInfo || null,
      pokerPlusVerified: !!matched.pokerPlusUserId,
      pokerPlusNickname: matched.pokerPlusNickname || searchRatingNick,
      pokerPlusStatsVisible,
      telegramVisible,
      profileGender,
      profileBirthDate: profileBirthDate || null,
      profileSpecialty: profileSpecialty || null,
      isFriend: !!isFriend,
      friendRequestOutgoing,
    };
    if (targetChatUserId) payload.chatUserId = targetChatUserId;
    if (contactName) payload.contactName = contactName;
    if (chatDisplayName) payload.chatDisplayName = chatDisplayName;
    if (chatOnline) payload.chatOnline = true;
    else if (chatLastSeenAt) payload.chatLastSeenAt = chatLastSeenAt;
    await applyPokerProfileStatusPayload(payload, targetAccountId, [targetChatUserId]);
    return res.status(200).json(payload);
  }

  // GET ?userId=ID123456 | tg_xxx | vk_xxx — публичная карточка пользователя
  if (searchUserId && (/^ID\d{6}$/.test(searchUserId) || searchUserId.startsWith("tg_") || searchUserId.startsWith("vk_"))) {
    const targetAccountId = /^ID\d{6}$/.test(searchUserId) ? searchUserId : await ensureDtIdForUserId(searchUserId);
    const targetChatUserId = /^ID\d{6}$/.test(searchUserId) ? await getUserIdByDtId(searchUserId) : searchUserId;
    if (!targetAccountId) return res.status(404).json({ ok: false, error: "Пользователь не найден" });
    const myAccountId = await resolveCurrentAccountId(identity, myId);
    if (targetAccountId === myAccountId) return res.status(400).json({ ok: false, error: "Свой профиль" });
    const results = await redisPipeline([
      ["HGET", USERNAMES_KEY, targetChatUserId || ""],
      ["HGET", POKERPLUS_BIND_HASH_KEY, targetAccountId],
      ["HGET", PERSONAL_KEY, targetAccountId],
      ["SISMEMBER", FRIENDSHIPS_KEY_PREFIX + myAccountId, targetAccountId],
      ["HGET", FRIEND_ALIAS_KEY_PREFIX + myAccountId, targetAccountId],
      ["HGET", CHAT_DISPLAY_NAMES_KEY, targetAccountId],
      ["HGET", CHAT_LAST_SEEN_HASH, targetChatUserId || ""],
      ["HGET", POKERPLUS_STATS_VISIBLE_KEY, targetAccountId],
      ["HGET", TELEGRAM_VISIBLE_KEY, targetAccountId],
      ["HGET", FRIEND_REQUESTS_OUT_KEY_PREFIX + myAccountId, targetAccountId],
      ["HGET", PROFILE_GENDER_KEY, targetAccountId],
      ["HGET", PROFILE_BIRTH_DATE_KEY, targetAccountId],
      ["HGET", PROFILE_SPECIALTY_KEY, targetAccountId],
    ]);
    let userName = targetAccountId;
    const un = results && results[0] && results[0].result ? String(results[0].result).trim() : "";
    if (un) userName = "@" + un;
    const p21Id = results && results[1] && results[1].result ? String(results[1].result).trim() : null;
    const personalInfo = results && results[2] && results[2].result ? String(results[2].result).trim() : null;
    const isFriend = (results && results[3] && results[3].result === 1) || isDefaultFriendPair(myAccountId, targetAccountId);
    let contactName = null;
    if (isFriend && results && results[4] && results[4].result != null && results[4].result !== false) {
      const cn = String(results[4].result)
        .trim()
        .replace(/[\u0000-\u001f\u007f]/g, "")
        .slice(0, FRIEND_CONTACT_NAME_MAX);
      if (cn) contactName = cn;
    }
    let chatDisplayName = null;
    if (results && results[5] && results[5].result != null && results[5].result !== false) {
      const cd = sanitizeChatDisplayName(results[5].result);
      if (cd) chatDisplayName = cd;
    }
    const lastSeenRaw = results && results[6] ? results[6].result : null;
    const pokerPlusStatsVisible = !!(results && results[7] && results[7].result === "1");
    const telegramVisible = !!(results && results[8] && results[8].result === "1");
    const friendRequestOutgoing = !isFriend && !!(results && results[9] && results[9].result);
    const profileGender = normalizeProfileGender(results && results[10] && results[10].result);
    const profileBirthDate = normalizeProfileBirthDate(results && results[11] && results[11].result);
    const profileSpecialty = normalizeProfileSpecialty(results && results[12] && results[12].result);
    userName = maskTelegramUserNameForViewer(userName, telegramVisible, isAdminViewer);
    const lastSeenMs =
      lastSeenRaw != null && lastSeenRaw !== false ? parseFloat(String(lastSeenRaw)) : NaN;
    const nowChat = Date.now();
    const minScoreChat = nowChat - CHAT_ONLINE_TTL_MS;
    const chatOnline = Number.isFinite(lastSeenMs) && lastSeenMs >= minScoreChat;
    let chatLastSeenAt = null;
    if (Number.isFinite(lastSeenMs) && lastSeenMs > 0) {
      chatLastSeenAt = new Date(Math.floor(lastSeenMs)).toISOString();
    }
    const payload = {
      ok: true,
      userId: targetAccountId,
      userName,
      p21Id: p21Id || null,
      personalInfo: personalInfo || null,
      pokerPlusVerified: !!p21Id,
      pokerPlusStatsVisible,
      telegramVisible,
      profileGender,
      profileBirthDate: profileBirthDate || null,
      profileSpecialty: profileSpecialty || null,
      isFriend: !!isFriend,
      friendRequestOutgoing,
    };
    if (targetChatUserId) payload.chatUserId = targetChatUserId;
    if (contactName) payload.contactName = contactName;
    if (chatDisplayName) payload.chatDisplayName = chatDisplayName;
    if (chatOnline) payload.chatOnline = true;
    else if (chatLastSeenAt) payload.chatLastSeenAt = chatLastSeenAt;
    await applyPokerProfileStatusPayload(payload, targetAccountId, [targetChatUserId]);
    return res.status(200).json(payload);
  }

  // Поиск по ID (ID123456)
  if (searchId && /^ID\d{6}$/.test(searchId)) {
    const results = await redisPipeline([
      ["HGET", ID_TO_USER_KEY, searchId],
      ["HGETALL", USERNAMES_KEY],
    ]);
    const userId = results && results[0] && results[0].result ? String(results[0].result).trim() : null;
    if (!userId) return res.status(404).json({ ok: false, error: "Пользователь с таким ID не найден" });

    if (userId === myId) return res.status(400).json({ ok: false, error: "Нельзя написать себе" });

    let userName = userId;
    const usernamesRaw = results[1]?.result;
    if (Array.isArray(usernamesRaw)) {
      for (let i = 0; i < usernamesRaw.length; i += 2) {
        if (usernamesRaw[i] === userId && usernamesRaw[i + 1]) {
          userName = "@" + String(usernamesRaw[i + 1]).trim();
          break;
        }
      }
    }
    const accountForProfile = searchId || userId;
    const res2 = await redisPipeline([
      ["HGET", POKERPLUS_BIND_HASH_KEY, accountForProfile],
      ["HGET", PERSONAL_KEY, accountForProfile],
      ["HGET", CHAT_DISPLAY_NAMES_KEY, accountForProfile],
      ["HGET", POKERPLUS_STATS_VISIBLE_KEY, accountForProfile],
      ["HGET", TELEGRAM_VISIBLE_KEY, accountForProfile],
      ["HGET", PROFILE_GENDER_KEY, accountForProfile],
      ["HGET", PROFILE_BIRTH_DATE_KEY, accountForProfile],
      ["HGET", PROFILE_SPECIALTY_KEY, accountForProfile],
    ]);
    const p21Id = res2 && res2[0] && res2[0].result ? String(res2[0].result).trim() : null;
    const personalInfo = res2 && res2[1] && res2[1].result ? String(res2[1].result).trim() : null;
    const chatDispRaw = res2 && res2[2] && res2[2].result;
    const chatDisplayName = chatDispRaw != null ? sanitizeChatDisplayName(chatDispRaw) : "";
    const telegramVisible = !!(res2 && res2[4] && res2[4].result === "1");
    const profileGender = normalizeProfileGender(res2 && res2[5] && res2[5].result);
    const profileBirthDate = normalizeProfileBirthDate(res2 && res2[6] && res2[6].result);
    const profileSpecialty = normalizeProfileSpecialty(res2 && res2[7] && res2[7].result);
    const payload = { ok: true, userId, userName: maskTelegramUserNameForViewer(userName, telegramVisible, isAdminViewer), telegramVisible, profileGender };
    if (profileBirthDate) payload.profileBirthDate = profileBirthDate;
    if (profileSpecialty) payload.profileSpecialty = profileSpecialty;
    if (p21Id) payload.p21Id = p21Id;
    if (personalInfo) payload.personalInfo = personalInfo;
    if (chatDisplayName) payload.chatDisplayName = chatDisplayName;
    await applyPokerProfileStatusPayload(payload, accountForProfile, [userId]);
    return res.status(200).json(payload);
  }

  // Подсказки по префиксу ника: ?username=prefix&suggest=1 → список до 15 пользователей
  const suggestPrefix = (req.query.username || req.query.nick || "").trim().replace(/^@/, "").toLowerCase();
  const suggestMode = req.query.suggest === "1" || req.query.suggest === "true";
  if (suggestMode && suggestPrefix.length >= 1) {
    const usernamesAll = await redisPipeline([["HGETALL", USERNAMES_KEY]]);
    const usernamesRaw = usernamesAll && usernamesAll[0] && usernamesAll[0].result;
    const candidates = [];
    if (Array.isArray(usernamesRaw)) {
      for (let i = 0; i < usernamesRaw.length; i += 2) {
        const uid = String(usernamesRaw[i] || "").trim();
        if (uid === myId) continue;
        const u = String(usernamesRaw[i + 1] || "").trim().toLowerCase();
        if (u && u.startsWith(suggestPrefix)) {
          const userName = String(usernamesRaw[i + 1] || "").trim();
          candidates.push({ userId: uid, userName: userName ? "@" + userName : uid });
          if (candidates.length >= 60) break;
        }
      }
    }
    const suggestions = [];
    if (candidates.length) {
      const dtRows = await redisPipeline(candidates.map((item) => ["HGET", DT_IDS_KEY, item.userId]));
      const accountIds = candidates.map((item, index) => {
        const dt = dtRows && dtRows[index] && dtRows[index].result ? String(dtRows[index].result).trim() : "";
        return /^ID\d{6}$/.test(dt) ? dt : item.userId;
      });
      const [visibleRows, specialtyRows] = await Promise.all([
        redisPipeline(accountIds.map((id) => ["HGET", TELEGRAM_VISIBLE_KEY, id])),
        redisPipeline(accountIds.map((id) => ["HGET", PROFILE_SPECIALTY_KEY, id])),
      ]);
      for (let i = 0; i < candidates.length && suggestions.length < 15; i += 1) {
        const visible = !!(visibleRows && visibleRows[i] && visibleRows[i].result === "1");
        if (!visible && !isAdminViewer) continue;
        const profileSpecialty = normalizeProfileSpecialty(specialtyRows && specialtyRows[i] && specialtyRows[i].result);
        suggestions.push({
          ...candidates[i],
          accountId: accountIds[i],
          profileSpecialty: profileSpecialty || null,
        });
      }
    }
    return res.status(200).json({ ok: true, suggestions });
  }

  // Поиск по нику (Telegram username): ?username=nick или ?username=@nick
  const searchUsername = (req.query.username || req.query.nick || "").trim().replace(/^@/, "").toLowerCase();
  if (searchUsername) {
    const usernamesAll = await redisPipeline([["HGETALL", USERNAMES_KEY]]);
    const usernamesRaw = usernamesAll && usernamesAll[0] && usernamesAll[0].result;
    let userId = null;
    let matchedUsername = null;
    if (Array.isArray(usernamesRaw)) {
      for (let i = 0; i < usernamesRaw.length; i += 2) {
        const u = String(usernamesRaw[i + 1] || "").trim().toLowerCase();
        if (u === searchUsername) {
          userId = String(usernamesRaw[i]).trim();
          matchedUsername = usernamesRaw[i + 1] ? String(usernamesRaw[i + 1]).trim() : null;
          break;
        }
      }
    }
    if (!userId) return res.status(404).json({ ok: false, error: "Пользователь с таким ником не найден" });

    if (userId === myId) return res.status(400).json({ ok: false, error: "Нельзя написать себе" });

    const userName = matchedUsername ? "@" + matchedUsername : userId;
    const dtRes = await redisPipeline([["HGET", DT_IDS_KEY, userId]]);
    const dtId = dtRes && dtRes[0] && dtRes[0].result ? String(dtRes[0].result).trim() : null;
    const accountForProfile = dtId || userId;
    const res2 = await redisPipeline([
      ["HGET", POKERPLUS_BIND_HASH_KEY, accountForProfile],
      ["HGET", PERSONAL_KEY, accountForProfile],
      ["HGET", CHAT_DISPLAY_NAMES_KEY, accountForProfile],
      ["HGET", POKERPLUS_STATS_VISIBLE_KEY, accountForProfile],
      ["HGET", TELEGRAM_VISIBLE_KEY, accountForProfile],
      ["HGET", PROFILE_GENDER_KEY, accountForProfile],
      ["HGET", PROFILE_BIRTH_DATE_KEY, accountForProfile],
      ["HGET", PROFILE_SPECIALTY_KEY, accountForProfile],
    ]);
    const p21Id = res2 && res2[0] && res2[0].result ? String(res2[0].result).trim() : null;
    const personalInfo = res2 && res2[1] && res2[1].result ? String(res2[1].result).trim() : null;
    const chatDispRaw2 = res2 && res2[2] && res2[2].result;
    const chatDisplayName2 = chatDispRaw2 != null ? sanitizeChatDisplayName(chatDispRaw2) : "";
    const telegramVisible = !!(res2 && res2[4] && res2[4].result === "1");
    const profileGender = normalizeProfileGender(res2 && res2[5] && res2[5].result);
    const profileBirthDate = normalizeProfileBirthDate(res2 && res2[6] && res2[6].result);
    const profileSpecialty = normalizeProfileSpecialty(res2 && res2[7] && res2[7].result);
    if (!telegramVisible && !isAdminViewer) return res.status(404).json({ ok: false, error: "Пользователь с таким ником не найден" });
    const payload = { ok: true, userId, userName: maskTelegramUserNameForViewer(userName, telegramVisible, isAdminViewer), telegramVisible, profileGender };
    if (dtId) payload.dtId = dtId;
    if (profileBirthDate) payload.profileBirthDate = profileBirthDate;
    if (profileSpecialty) payload.profileSpecialty = profileSpecialty;
    if (p21Id) payload.p21Id = p21Id;
    if (personalInfo) payload.personalInfo = personalInfo;
    if (chatDisplayName2) payload.chatDisplayName = chatDisplayName2;
    await applyPokerProfileStatusPayload(payload, accountForProfile, [userId]);
    return res.status(200).json(payload);
  }

  // Мой dtId, PokerPlus ID и personal (при запросе обновляем сохранённый username из Telegram)
  const safeId = myId;
  const telegramUsername = identity
    ? getUsernameFromInitData(identity.rawInitData || "") || identity.pwaUsername || null
    : null;
  if (telegramUsername) {
    await redisPipeline([["HSET", USERNAMES_KEY, safeId, telegramUsername]]);
  }
  const dtId = await resolveCurrentAccountId(identity, safeId);
  if (!dtId) return res.status(500).json({ ok: false, error: "Не удалось подготовить ID аккаунта" });
  const preferredUserId = /^guest_/.test(safeId) ? safeId : await getPreferredUserIdByDtId(dtId);
  const usernameLookupId = preferredUserId || safeId;
  const results = await redisPipeline([
    ["HGET", POKERPLUS_BIND_HASH_KEY, dtId],
    ["HGET", PERSONAL_KEY, dtId],
    ["HGET", CHAT_DISPLAY_NAMES_KEY, dtId],
    ["HGET", POKERPLUS_BIND_HASH_KEY, safeId],
    ["HGET", PERSONAL_KEY, safeId],
    ["HGET", CHAT_DISPLAY_NAMES_KEY, safeId],
    ["HGET", USERNAMES_KEY, usernameLookupId],
    ["HGET", POKERPLUS_BIND_HASH_KEY, dtId],
    ["HGET", POKERPLUS_STATS_VISIBLE_KEY, dtId],
    ["HGET", TELEGRAM_VISIBLE_KEY, dtId],
    ["HGET", PROFILE_GENDER_KEY, dtId],
    ["HGET", PROFILE_GENDER_KEY, safeId],
    ["HGET", PROFILE_BIRTH_DATE_KEY, dtId],
    ["HGET", PROFILE_BIRTH_DATE_KEY, safeId],
    ["HGET", PROFILE_SPECIALTY_KEY, dtId],
    ["HGET", PROFILE_SPECIALTY_KEY, safeId],
    ["HGET", PROFILE_MTT_PREFERENCES_KEY, dtId],
    ["HGET", PROFILE_MTT_PREFERENCES_KEY, safeId],
    ["HGET", PROFILE_CASH_PREFERENCES_KEY, dtId],
    ["HGET", PROFILE_CASH_PREFERENCES_KEY, safeId],
  ]);
  let p21Id = results && results[0] && results[0].result ? String(results[0].result).trim() : null;
  if (p21Id === "") p21Id = null;
  let personalInfo = results && results[1] && results[1].result ? String(results[1].result).trim() : null;
  if (!personalInfo && results && results[4] && results[4].result) {
    personalInfo = String(results[4].result).trim();
    await redisPipeline([["HSET", PERSONAL_KEY, dtId, personalInfo], ["HDEL", PERSONAL_KEY, safeId]]);
  }
  let chatDispSelfRaw = results && results[2] && results[2].result;
  if ((chatDispSelfRaw == null || chatDispSelfRaw === false || chatDispSelfRaw === "") && results && results[5] && results[5].result) {
    chatDispSelfRaw = results[5].result;
    const chatDispMigrated = sanitizeChatDisplayName(chatDispSelfRaw);
    if (chatDispMigrated) {
      await redisPipeline([["HSET", CHAT_DISPLAY_NAMES_KEY, dtId, chatDispMigrated], ["HDEL", CHAT_DISPLAY_NAMES_KEY, safeId]]);
    }
  }
  const chatDisplayNameSelf = chatDispSelfRaw != null ? sanitizeChatDisplayName(chatDispSelfRaw) : "";

  const payload = { ok: true, dtId };
  const linkedEmail = dtId ? await getLinkedEmailOriginalByDtId(dtId) : null;
  if (linkedEmail) payload.email = linkedEmail;
  const telegramUsernameSelf = results && results[6] && results[6].result ? String(results[6].result).trim() : "";
  if (telegramUsernameSelf) payload.telegramUsername = telegramUsernameSelf;
  const pokerPlusUserIdSelf =
    results && results[7] && results[7].result != null && results[7].result !== false
      ? String(results[7].result).trim()
      : "";
  if (pokerPlusUserIdSelf) payload.pokerPlusVerified = true;
  payload.pokerPlusStatsVisible = !!(results && results[8] && results[8].result === "1");
  payload.telegramVisible = !!(results && results[9] && results[9].result === "1");
  let profileGenderSelf = normalizeProfileGender(results && results[10] && results[10].result);
  if ((!results || !results[10] || !results[10].result) && results && results[11] && results[11].result) {
    profileGenderSelf = normalizeProfileGender(results[11].result);
    await redisPipeline([["HSET", PROFILE_GENDER_KEY, dtId, profileGenderSelf], ["HDEL", PROFILE_GENDER_KEY, safeId]]);
  }
  payload.profileGender = profileGenderSelf;
  let profileBirthDateSelf = normalizeProfileBirthDate(results && results[12] && results[12].result);
  if (!profileBirthDateSelf && results && results[13] && results[13].result) {
    profileBirthDateSelf = normalizeProfileBirthDate(results[13].result);
    if (profileBirthDateSelf && safeId !== dtId) await redisPipeline([["HSET", PROFILE_BIRTH_DATE_KEY, dtId, profileBirthDateSelf], ["HDEL", PROFILE_BIRTH_DATE_KEY, safeId]]);
  }
  let profileSpecialtySelf = normalizeProfileSpecialty(results && results[14] && results[14].result);
  if (!profileSpecialtySelf && results && results[15] && results[15].result) {
    profileSpecialtySelf = normalizeProfileSpecialty(results[15].result);
    if (profileSpecialtySelf && safeId !== dtId) await redisPipeline([["HSET", PROFILE_SPECIALTY_KEY, dtId, profileSpecialtySelf], ["HDEL", PROFILE_SPECIALTY_KEY, safeId]]);
  }
  let profileMttPreferencesSelf = normalizeProfileMttPreferences(results && results[16] && results[16].result);
  if (!profileMttPreferencesSelf.length && results && results[17] && results[17].result) {
    profileMttPreferencesSelf = normalizeProfileMttPreferences(results[17].result);
    if (profileMttPreferencesSelf.length && safeId !== dtId) {
      await redisPipeline([
        ["HSET", PROFILE_MTT_PREFERENCES_KEY, dtId, profilePreferencesJson(profileMttPreferencesSelf)],
        ["HDEL", PROFILE_MTT_PREFERENCES_KEY, safeId],
      ]);
    }
  }
  let profileCashPreferencesSelf = normalizeProfileCashPreferences(results && results[18] && results[18].result);
  if (!profileCashPreferencesSelf.length && results && results[19] && results[19].result) {
    profileCashPreferencesSelf = normalizeProfileCashPreferences(results[19].result);
    if (profileCashPreferencesSelf.length && safeId !== dtId) {
      await redisPipeline([
        ["HSET", PROFILE_CASH_PREFERENCES_KEY, dtId, profilePreferencesJson(profileCashPreferencesSelf)],
        ["HDEL", PROFILE_CASH_PREFERENCES_KEY, safeId],
      ]);
    }
  }
  if (profileBirthDateSelf) payload.profileBirthDate = profileBirthDateSelf;
  if (profileSpecialtySelf) payload.profileSpecialty = profileSpecialtySelf;
  payload.profileMttPreferences = profileMttPreferencesSelf;
  payload.profileCashPreferences = profileCashPreferencesSelf;
  if (p21Id) payload.p21Id = p21Id;
  if (personalInfo) payload.personalInfo = personalInfo;
  if (chatDisplayNameSelf) payload.chatDisplayName = chatDisplayNameSelf;
  payload.telegramSubscriptions = await buildTelegramSubscriptionStatus(dtId, identity, [safeId, preferredUserId]);
  await applyPokerProfileStatusPayload(payload, dtId, [safeId, preferredUserId]);
  return res.status(200).json(payload);
};
