/**
 * Пользователи: dtId (мой ID), поиск по ID и по нику (Telegram username).
 * GET ?initData= → dtId (и обновление сохранённого username из Telegram)
 * GET ?initData=&id=ID123456 → userId, userName для личного чата
 * GET ?initData=&username=xxx → userId, userName по нику (без @ или с @)
 */
const crypto = require("crypto");
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { guestMemberIdFromDeviceId } = require("../guest-member-id");
const { getLinkedEmailOriginalByDtId } = require("../email-auth");
const { ensureDtIdForUserId, getUserIdByDtId, getPreferredUserIdByDtId, ID_TO_USER_KEY, linkUserIdToDtId } = require("../account-id");
const { readPokerPlusProfile } = require("../pokerplus");
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const POKERPLUS_BIND_HASH_KEY = "poker_app:pokerplus_user_ids";
const POKERPLUS_STATS_VISIBLE_KEY = "poker_app:pokerplus_stats_visible";
const USERNAMES_KEY = "poker_app:visitor_usernames";
const DT_IDS_KEY = "poker_app:visitor_dt_ids";
const PERSONAL_KEY = "poker_app:visitor_personal";
const FRIENDS_KEY_PREFIX = "poker_app:friends:";
const FRIEND_ALIAS_KEY_PREFIX = "poker_app:friend_alias:";
const FRIEND_CONTACT_NAME_MAX = 80;
const CHAT_DISPLAY_NAMES_KEY = "poker_app:visitor_chat_display_names";
const CHAT_DISPLAY_NAME_MAX = 80;
const CHAT_LAST_SEEN_HASH = "poker_app:chat_last_seen";
const CHAT_ONLINE_TTL_MS = 5 * 60 * 1000;

function pokerProfileStatusStepForLevelServer(level) {
  if (level <= 5) return 10000;
  if (level <= 15) return 20000;
  if (level <= 25) return 35000;
  if (level <= 35) return 50000;
  if (level <= 45) return 75000;
  return 100000;
}

function pokerProfileStatusFromRakeServer(value) {
  const rake = Math.max(0, Math.floor(Number(value) || 0));
  let level = 1;
  let levelStart = 0;
  while (level < 55) {
    const step = pokerProfileStatusStepForLevelServer(level);
    if (rake < levelStart + step) break;
    levelStart += step;
    level += 1;
  }
  const nextLevel = Math.min(55, level + 1);
  let nextStart = 0;
  for (let lvl = 1; lvl < nextLevel; lvl += 1) nextStart += pokerProfileStatusStepForLevelServer(lvl);
  const levelSize = Math.max(1, nextStart - levelStart);
  const statusValue = level >= 55 ? 100 : Math.floor(Math.min(99, Math.max(0, ((rake - levelStart) / levelSize) * 100)));
  return { level, statusValue };
}

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

function pokerProfilePublicStatsFromCachedProfile(profile) {
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
  return {
    fee: pick("fee"),
    hands: pick("hands"),
    winnings: pick("winnings"),
    mttWinnings: pick("mttWinnings", "mtt_winnings"),
    sngWinnings: pick("sngWinnings", "sng_winnings"),
  };
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

async function readPokerPlusStatsVisibleFromCandidates(ids) {
  const lookupIds = uniquePokerProfileLookupIds(ids);
  if (!lookupIds.length) return false;
  const visibility = await redisPipeline(lookupIds.map((id) => ["HGET", POKERPLUS_STATS_VISIBLE_KEY, id]));
  return !!(visibility && visibility.some((row) => row && row.result === "1"));
}

async function applyPokerProfileStatusPayload(payload, accountId, extraLookupIds) {
  if (!payload || !accountId) return payload;
  try {
    const lookupIds = uniquePokerProfileLookupIds([accountId].concat(extraLookupIds || []));
    const profile = await readPokerPlusProfileFromCandidates(lookupIds);
    const fee = pokerProfileFeeFromCachedProfile(profile);
    if (fee != null) {
      const status = pokerProfileStatusFromRakeServer(fee);
      payload.level = status.level;
      payload.statusValue = status.statusValue;
    }
    const statsVisible = await readPokerPlusStatsVisibleFromCandidates(lookupIds);
    payload.pokerPlusStatsVisible = statsVisible;
    if (statsVisible) {
      payload.pokerPlusStats = pokerProfilePublicStatsFromCachedProfile(profile);
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

async function redisPipeline(commands) {
  if (!REDIS_URL || !REDIS_TOKEN) return null;
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
  return res.json();
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
    await linkUserIdToDtId(myId, dtIdHint, true);
  }

  // POST: сохранить personal и/или отображаемое имя (информация для других)
  if (req.method === "POST") {
    if (!REDIS_URL || !REDIS_TOKEN) return res.status(500).json({ ok: false, error: "Сервер не настроен" });
    const safeId = myId;
    const accountId = /^guest_/.test(safeId) ? safeId : await ensureDtIdForUserId(safeId);
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

    if (body.pokerPlusStatsVisible !== undefined) {
      const visible = !(body.pokerPlusStatsVisible === false || body.pokerPlusStatsVisible === 0 || body.pokerPlusStatsVisible === "0" || body.pokerPlusStatsVisible === "false");
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

  if (!REDIS_URL || !REDIS_TOKEN) {
    return res.status(500).json({ ok: false, error: "Redis not configured" });
  }

  // GET ?userId=ID123456 | tg_xxx | vk_xxx — публичная карточка пользователя
  if (searchUserId && (/^ID\d{6}$/.test(searchUserId) || searchUserId.startsWith("tg_") || searchUserId.startsWith("vk_"))) {
    const targetAccountId = /^ID\d{6}$/.test(searchUserId) ? searchUserId : await ensureDtIdForUserId(searchUserId);
    const targetChatUserId = /^ID\d{6}$/.test(searchUserId) ? await getUserIdByDtId(searchUserId) : searchUserId;
    if (!targetAccountId) return res.status(404).json({ ok: false, error: "Пользователь не найден" });
    const myAccountId = /^guest_/.test(myId) ? myId : await ensureDtIdForUserId(myId);
    if (targetAccountId === myAccountId) return res.status(400).json({ ok: false, error: "Свой профиль" });
    const results = await redisPipeline([
      ["HGET", USERNAMES_KEY, targetChatUserId || ""],
      ["HGET", POKERPLUS_BIND_HASH_KEY, targetAccountId],
      ["HGET", PERSONAL_KEY, targetAccountId],
      ["SISMEMBER", FRIENDS_KEY_PREFIX + myAccountId, targetAccountId],
      ["HGET", FRIEND_ALIAS_KEY_PREFIX + myAccountId, targetAccountId],
      ["HGET", CHAT_DISPLAY_NAMES_KEY, targetAccountId],
      ["HGET", CHAT_LAST_SEEN_HASH, targetChatUserId || ""],
      ["HGET", POKERPLUS_STATS_VISIBLE_KEY, targetAccountId],
    ]);
    let userName = targetAccountId;
    const un = results && results[0] && results[0].result ? String(results[0].result).trim() : "";
    if (un) userName = "@" + un;
    const p21Id = results && results[1] && results[1].result ? String(results[1].result).trim() : null;
    const personalInfo = results && results[2] && results[2].result ? String(results[2].result).trim() : null;
    const isFriend = results && results[3] && results[3].result === 1;
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
      isFriend: !!isFriend,
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
    ]);
    const p21Id = res2 && res2[0] && res2[0].result ? String(res2[0].result).trim() : null;
    const personalInfo = res2 && res2[1] && res2[1].result ? String(res2[1].result).trim() : null;
    const chatDispRaw = res2 && res2[2] && res2[2].result;
    const chatDisplayName = chatDispRaw != null ? sanitizeChatDisplayName(chatDispRaw) : "";
    const payload = { ok: true, userId, userName };
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
    const suggestions = [];
    if (Array.isArray(usernamesRaw)) {
      for (let i = 0; i < usernamesRaw.length; i += 2) {
        const uid = String(usernamesRaw[i] || "").trim();
        if (uid === myId) continue;
        const u = String(usernamesRaw[i + 1] || "").trim().toLowerCase();
        if (u && u.startsWith(suggestPrefix)) {
          const userName = String(usernamesRaw[i + 1] || "").trim();
          suggestions.push({ userId: uid, userName: userName ? "@" + userName : uid });
          if (suggestions.length >= 15) break;
        }
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
    const res2 = await redisPipeline([
      ["HGET", POKERPLUS_BIND_HASH_KEY, dtId || userId],
      ["HGET", PERSONAL_KEY, searchId],
      ["HGET", CHAT_DISPLAY_NAMES_KEY, searchId],
      ["HGET", POKERPLUS_STATS_VISIBLE_KEY, dtId || userId],
    ]);
    const p21Id = res2 && res2[0] && res2[0].result ? String(res2[0].result).trim() : null;
    const personalInfo = res2 && res2[1] && res2[1].result ? String(res2[1].result).trim() : null;
    const chatDispRaw2 = res2 && res2[2] && res2[2].result;
    const chatDisplayName2 = chatDispRaw2 != null ? sanitizeChatDisplayName(chatDispRaw2) : "";
    const payload = { ok: true, userId, userName };
    if (dtId) payload.dtId = dtId;
    if (p21Id) payload.p21Id = p21Id;
    if (personalInfo) payload.personalInfo = personalInfo;
    if (chatDisplayName2) payload.chatDisplayName = chatDisplayName2;
    await applyPokerProfileStatusPayload(payload, dtId || userId, [userId]);
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
  const dtId = /^guest_/.test(safeId) ? safeId : await ensureDtIdForUserId(safeId);
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
  ]);
  let p21Id = results && results[0] && results[0].result ? String(results[0].result).trim() : null;
  if (!p21Id && results && results[3] && results[3].result) {
    p21Id = String(results[3].result).trim();
  }
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
  if (p21Id) payload.p21Id = p21Id;
  if (personalInfo) payload.personalInfo = personalInfo;
  if (chatDisplayNameSelf) payload.chatDisplayName = chatDisplayNameSelf;
  await applyPokerProfileStatusPayload(payload, dtId, [safeId, preferredUserId]);
  return res.status(200).json(payload);
};
