const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
/**
 * Друзья через подтверждённые заявки.
 * Старый односторонний список poker_app:friends:* мигрируется при чтении,
 * чтобы пользователи не теряли друзей, добавленных до заявок.
 */
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { ensureDtIdForUserId, getPreferredUserIdByDtId, getUserIdByDtId, resolveAccountId } = require("../account-id");
const { isAdminIdentity } = require("../api-auth");
const { rejectBlockedAppUser } = require("../app-user-blocks");
const { getLinkedDtIdByEmail } = require("../email-auth");
const { PROFILE_HASH_KEY } = require("../pokerplus");
const {
  pokerProfileFeeFromCachedProfile,
  pokerProfileStatusFromCachedProfile,
  pokerProfileStatusFromRakeServer,
} = require("../chat-profile-status");
const { createChatProfileLookupHelpers } = require("../chat-profile-lookups");
const { sendToMemberDevices } = require("../chat-webpush-notify");
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

const AVATAR_PREFIX = "poker_app:avatar:";
const DT_IDS_KEY = "poker_app:visitor_dt_ids";
const POKERPLUS_BIND_HASH_KEY = "poker_app:pokerplus_user_ids";
const RESPECT_SCORE_KEY = "poker_app:respect_score";
const PROFILE_BIRTH_DATE_KEY = "poker_app:profile_birth_dates";
const PROFILE_SPECIALTY_KEY = "poker_app:profile_specialties";
const PRESET_AVATAR_SRC_BY_ID = {
  tiger: "./assets/avatar-tiger.jpg",
  raccoon: "./assets/avatar-raccoon.jpg",
  skull: "./assets/avatar-skull.jpg",
  phoenix: "./assets/avatar-phoenix.jpg",
  octopus: "./assets/avatar-octopus.jpg",
  cat: "./assets/avatar-cat.jpg",
  robot: "./assets/avatar-robot.jpg",
  bulldog: "./assets/avatar-bulldog.jpg",
  monkey: "./assets/daily-poker-monkey.webp",
  fox: "./assets/avatar-fox.jpg",
  chip: "./assets/avatar-chip.jpg",
  koala: "./assets/avatar-koala.jpg",
  raven: "./assets/avatar-raven.jpg",
  crocodile: "./assets/avatar-crocodile.jpg",
  rabbit: "./assets/avatar-rabbit.jpg",
  chameleon: "./assets/avatar-chameleon.jpg",
  panda: "./assets/avatar-panda.jpg",
  wolf: "./assets/avatar-wolf.jpg",
  owl: "./assets/avatar-owl.jpg",
  bat: "./assets/avatar-bat.jpg",
  gorilla: "./assets/avatar-gorilla.jpg",
};
const PRESET_AVATAR_IDS = Object.keys(PRESET_AVATAR_SRC_BY_ID);
const FRIENDS_KEY_PREFIX = "poker_app:friends:";
const FRIEND_ALIAS_KEY_PREFIX = "poker_app:friend_alias:";
const FRIENDSHIPS_KEY_PREFIX = "poker_app:friendships:";
const FRIENDSHIP_DATES_KEY_PREFIX = "poker_app:friendship_dates:";
const FRIEND_REQUESTS_IN_KEY_PREFIX = "poker_app:friend_requests:in:";
const FRIEND_REQUESTS_OUT_KEY_PREFIX = "poker_app:friend_requests:out:";
const FRIEND_NOTICES_KEY_PREFIX = "poker_app:friend_notices:";
const USERNAMES_KEY = "poker_app:visitor_usernames";
const TELEGRAM_VISIBLE_KEY = "poker_app:telegram_visible";
const CHAT_DISPLAY_NAMES_KEY = "poker_app:visitor_chat_display_names";
const CONTACT_NAME_MAX = 80;
const PERSONAL_FRIEND_AVATAR_BY_NICK = {
  waaar: "./assets/summer-rating-player-waaar.webp",
};
const {
  getAvatars,
  getPokerProfileStatusMeta,
} = createChatProfileLookupHelpers({
  AVATAR_PREFIX,
  DT_IDS_KEY,
  POKERPLUS_BIND_HASH_KEY,
  PRESET_AVATAR_IDS,
  PRESET_AVATAR_SRC_BY_ID,
  PROFILE_HASH_KEY,
  RESPECT_SCORE_KEY,
  normalizePeerChatUserId: (id) => String(id || "").trim(),
  pokerProfileFeeFromCachedProfile,
  pokerProfileStatusFromCachedProfile,
  pokerProfileStatusFromRakeServer,
  redisPipeline,
});

function sanitizeContactName(raw) {
  const s = String(raw || "")
    .trim()
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .slice(0, CONTACT_NAME_MAX);
  return s;
}

function normalizeProfileSpecialty(raw) {
  const value = String(raw || "").trim().toLowerCase();
  if (value === "mtt" || value === "мтт") return "mtt";
  if (value === "cash" || value === "кеш" || value === "кэш") return "cash";
  return "";
}

function normalizeProfileBirthDate(raw) {
  const value = String(raw || "").trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : "";
}

function buildFriendDisplayName(accountId, username, preferredUserId) {
  const cleanUsername = username != null ? String(username).trim() : "";
  if (cleanUsername) return cleanUsername.charAt(0) === "@" ? cleanUsername : "@" + cleanUsername;

  const cleanAccountId = accountId != null ? String(accountId).trim() : "";
  if (/^ID\d{6}$/.test(cleanAccountId)) return cleanAccountId;

  const cleanPreferredUserId = preferredUserId != null ? String(preferredUserId).trim() : "";
  if (/^tg_ID\d{6}$/.test(cleanPreferredUserId)) return cleanPreferredUserId.slice(3);
  if (/^mail_ID\d{6}$/.test(cleanPreferredUserId)) return cleanPreferredUserId.slice(5);
  if (/^ID\d{6}$/.test(cleanPreferredUserId)) return cleanPreferredUserId;

  return "Игрок";
}

function maskFriendTelegramName(userName, visible, admin) {
  const raw = String(userName || "").trim();
  if (!raw || raw.indexOf("@") !== 0 || visible || admin) return raw;
  return "TG скрыт";
}

function cleanPublicFriendName(value) {
  return String(value || "").trim().replace(/[\u0000-\u001f\u007f]/g, "").slice(0, CONTACT_NAME_MAX);
}

function personalFriendAvatarForNick(value) {
  const nick = cleanPublicFriendName(value).toLowerCase().replace(/^@+/, "");
  if (nick === "waaarr" || nick === "waaaar") return PERSONAL_FRIEND_AVATAR_BY_NICK.waaar;
  return PERSONAL_FRIEND_AVATAR_BY_NICK[nick] || "";
}

function safeJsonParse(raw, fallback) {
  try {
    return raw ? JSON.parse(String(raw)) : fallback;
  } catch (e) {
    return fallback;
  }
}

function friendRequestPayload(fromId, toId, contactName) {
  return JSON.stringify({
    fromId: String(fromId || ""),
    toId: String(toId || ""),
    contactName: sanitizeContactName(contactName),
    createdAt: new Date().toISOString(),
  });
}

function friendNoticePayload(fromId, status) {
  return JSON.stringify({
    fromId: String(fromId || ""),
    status: status === "accepted" ? "accepted" : "rejected",
    createdAt: new Date().toISOString(),
  });
}

function parseHashPairs(raw) {
  const out = {};
  if (Array.isArray(raw)) {
    for (let i = 0; i < raw.length; i += 2) {
      const key = raw[i] != null ? String(raw[i]).trim() : "";
      if (!key) continue;
      out[key] = raw[i + 1] != null ? String(raw[i + 1]).trim() : "";
    }
  } else if (raw && typeof raw === "object") {
    Object.keys(raw).forEach((key) => {
      const cleanKey = String(key || "").trim();
      if (!cleanKey) return;
      out[cleanKey] = raw[key] != null ? String(raw[key]).trim() : "";
    });
  }
  return out;
}

async function migrateLegacyFriendsIfNeeded(myId, myAccountId) {
  const ownerIds = [myAccountId];
  const rawMyId = String(myId || "").trim();
  if (rawMyId && rawMyId !== myAccountId) ownerIds.push(rawMyId);

  const memberCommands = ownerIds.map((ownerId) => ["SMEMBERS", FRIENDS_KEY_PREFIX + ownerId]);
  const membersRes = memberCommands.length ? await redisPipeline(memberCommands) : null;
  const legacyRows = ownerIds.map((ownerId, index) => ({
    ownerId,
    rawMembers: membersRes && membersRes[index] && Array.isArray(membersRes[index].result) ? membersRes[index].result : [],
    aliases: {},
  })).filter((row) => row.rawMembers.length > 0);
  if (!legacyRows.length) return [];

  const aliasesRes = await redisPipeline(legacyRows.map((row) => ["HGETALL", FRIEND_ALIAS_KEY_PREFIX + row.ownerId]));
  legacyRows.forEach((row, index) => {
    row.aliases = parseHashPairs(aliasesRes && aliasesRes[index] && aliasesRes[index].result);
  });

  const migrated = [];
  const seen = new Set();
  const writeCommands = [];
  const deleteKeys = [];

  for (const legacyRow of legacyRows) {
    deleteKeys.push(FRIENDS_KEY_PREFIX + legacyRow.ownerId);

    for (const rawMember of legacyRow.rawMembers) {
      const rawTargetId = rawMember != null ? String(rawMember).trim() : "";
      if (!rawTargetId) continue;
      const targetAccountId = (await resolveAccountId(rawTargetId)) || rawTargetId;
      const targetId = String(targetAccountId || "").trim();
      if (!targetId || targetId === myAccountId || seen.has(targetId)) continue;
      seen.add(targetId);
      migrated.push(targetId);
      writeCommands.push(["SADD", FRIENDSHIPS_KEY_PREFIX + myAccountId, targetId]);
      writeCommands.push(["SADD", FRIENDSHIPS_KEY_PREFIX + targetId, myAccountId]);
      const cleanAlias = sanitizeContactName(legacyRow.aliases[rawTargetId] || legacyRow.aliases[targetId] || "");
      if (cleanAlias) writeCommands.push(["HSET", FRIEND_ALIAS_KEY_PREFIX + myAccountId, targetId, cleanAlias]);
    }
  }

  if (!writeCommands.length && !deleteKeys.length) return migrated;
  const cleanupCommands = deleteKeys.map((key) => ["DEL", key]);
  const result = await redisPipeline(writeCommands.concat(cleanupCommands));
  return result ? migrated : [];
}

async function rowsForAccounts(accountIds, myAccountId, isAdminViewer) {
  const memberList = Array.isArray(accountIds)
    ? accountIds.map((id) => String(id || "").trim()).filter(Boolean)
    : [];
  if (!memberList.length) return [];
  const [chatIds, preferredUserIds] = await Promise.all([
    Promise.all(memberList.map((id) => getUserIdByDtId(id))),
    Promise.all(memberList.map((id) => getPreferredUserIdByDtId(id))),
  ]);
  const previewIds = [...new Set(memberList.concat(chatIds).filter(Boolean))];
  const [namesRes, visibleRes, displayNamesRes, avatars, statusMeta, specialtyRes, birthDateRes] = await Promise.all([
    redisPipeline(chatIds.map((id) => ["HGET", USERNAMES_KEY, id || ""])),
    redisPipeline(memberList.map((id) => ["HGET", TELEGRAM_VISIBLE_KEY, id])),
    redisPipeline(previewIds.map((id) => ["HGET", CHAT_DISPLAY_NAMES_KEY, id])),
    getAvatars(previewIds),
    getPokerProfileStatusMeta(previewIds),
    redisPipeline(memberList.map((id) => ["HGET", PROFILE_SPECIALTY_KEY, id])),
    redisPipeline(memberList.map((id) => ["HGET", PROFILE_BIRTH_DATE_KEY, id])),
  ]);
  const displayNames = {};
  if (displayNamesRes && Array.isArray(displayNamesRes)) {
    previewIds.forEach((id, i) => {
      const value = displayNamesRes[i] && displayNamesRes[i].result != null ? cleanPublicFriendName(displayNamesRes[i].result) : "";
      if (value) displayNames[id] = value;
    });
  }
  const aliasKey = FRIEND_ALIAS_KEY_PREFIX + myAccountId;
  const [aliasRes, friendshipDatesRes] = await Promise.all([
    redisPipeline([["HMGET", aliasKey, ...memberList]]),
    redisPipeline([["HMGET", FRIENDSHIP_DATES_KEY_PREFIX + myAccountId, ...memberList]]),
  ]);
  const aliasRow = aliasRes && aliasRes[0] && Array.isArray(aliasRes[0].result) ? aliasRes[0].result : [];
  const friendshipDatesRow = friendshipDatesRes && friendshipDatesRes[0] &&
    Array.isArray(friendshipDatesRes[0].result) ? friendshipDatesRes[0].result : [];
  return memberList.map((userId, i) => {
    const un = namesRes && namesRes[i] && namesRes[i].result ? String(namesRes[i].result).trim() : "";
    const visible = !!(visibleRes && visibleRes[i] && visibleRes[i].result === "1");
    const userName = maskFriendTelegramName(buildFriendDisplayName(userId, un, preferredUserIds[i]), visible, isAdminViewer);
    const rawAlias = aliasRow[i] != null && aliasRow[i] !== false ? String(aliasRow[i]).trim() : "";
    const contactName = rawAlias.length > 0 ? sanitizeContactName(rawAlias) : null;
    const out = { userId, userName };
    const friendSince = friendshipDatesRow[i] != null && friendshipDatesRow[i] !== false
      ? String(friendshipDatesRow[i]).trim()
      : "";
    if (friendSince) out.friendSince = friendSince;
    if (chatIds[i]) out.chatUserId = chatIds[i];
    if (contactName) out.contactName = contactName;
    const status = statusMeta[userId] || statusMeta[chatIds[i]];
    const pokerPlusNickname = cleanPublicFriendName(
      (statusMeta[userId] && statusMeta[userId].pokerPlusNickname) ||
      (statusMeta[chatIds[i]] && statusMeta[chatIds[i]].pokerPlusNickname)
    );
    const chatDisplayName = displayNames[userId] || displayNames[chatIds[i]] || "";
    const avatarUrl =
      personalFriendAvatarForNick(pokerPlusNickname) ||
      personalFriendAvatarForNick(chatDisplayName) ||
      avatars[userId] ||
      avatars[chatIds[i]];
    const profileSpecialty = normalizeProfileSpecialty(specialtyRes && specialtyRes[i] && specialtyRes[i].result);
    const profileBirthDate = normalizeProfileBirthDate(birthDateRes && birthDateRes[i] && birthDateRes[i].result);
    if (avatarUrl) out.avatarUrl = avatarUrl;
    if (status && status.level != null) out.statusLevel = status.level;
    if (pokerPlusNickname) out.pokerPlusNickname = pokerPlusNickname;
    if (chatDisplayName) out.chatDisplayName = chatDisplayName;
    if (profileSpecialty) out.profileSpecialty = profileSpecialty;
    if (profileBirthDate) out.profileBirthDate = profileBirthDate;
    return out;
  });
}

async function resolveCurrentFriendAccountId(identity, memberId) {
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

async function friendPoker21Eligibility(accountId, fallbackUserId) {
  const cleanAccountId = String(accountId || "").trim();
  const linkedUserId = cleanAccountId ? await getUserIdByDtId(cleanAccountId) : "";
  const lookupIds = [...new Set([cleanAccountId, linkedUserId, String(fallbackUserId || "").trim()].filter(Boolean))];
  if (!lookupIds.length) return { eligible: false, level: 0, pokerPlusNickname: "" };
  const statusMeta = await getPokerProfileStatusMeta(lookupIds);
  let status = null;
  for (const id of lookupIds) {
    if (statusMeta && statusMeta[id]) {
      status = statusMeta[id];
      break;
    }
  }
  const level = Math.max(0, Number(status && status.level) || 0);
  const pokerPlusNickname = cleanPublicFriendName(status && status.pokerPlusNickname);
  return {
    eligible: level > 0 && !!pokerPlusNickname,
    level,
    pokerPlusNickname,
  };
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  let queryPre = req && req.query && typeof req.query === "object" ? { ...req.query } : {};
  try {
    queryPre = {
      ...queryPre,
      ...Object.fromEntries(new URL(req.url || "/", "http://local").searchParams.entries()),
    };
  } catch (eQuery) {}
  if (req.method === "GET" && String(queryPre.publicDefaults || "").trim() === "1") {
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ ok: true, fallback: true, friends: [], incoming: [], outgoing: [], notices: [] });
  }

  let bodyPre = {};
  if (req.method === "POST" || req.method === "DELETE") {
    try {
      bodyPre = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    } catch (e) {
      if (req.method === "DELETE") return res.status(400).json({ ok: false, error: "Invalid JSON" });
      bodyPre = {};
    }
  }
  const identity = resolveTelegramIdentity(req, bodyPre, BOT_TOKEN);
  if (!identity) return res.status(401).json({ ok: false, error: "Откройте в Telegram или войдите через сайт" });
  const myId = memberIdFromIdentity(identity);
  if (!myId) return res.status(401).json({ ok: false, error: "Не удалось определить пользователя" });
  const isAdminViewer = !!isAdminIdentity(identity, myId);
  if (!isAdminViewer && await rejectBlockedAppUser(req, res, identity, myId)) return;
  const myAccountId = await resolveCurrentFriendAccountId(identity, myId);
  if (!myAccountId) return res.status(500).json({ ok: false, error: "Не удалось подготовить ID аккаунта" });

  if (req.method === "DELETE") {
    const targetUserId = await resolveAccountId(bodyPre.targetUserId || "");
    if (!targetUserId) {
      return res.status(400).json({ ok: false, error: "Нужен targetUserId" });
    }
    if (targetUserId === myAccountId) return res.status(400).json({ ok: false, error: "Нельзя удалить себя" });
    if (!redisConfigured()) return res.status(500).json({ ok: false, error: "Сервер не настроен" });
    const aliasKey = FRIEND_ALIAS_KEY_PREFIX + myAccountId;
    const result = await redisPipeline([
      ["SREM", FRIENDSHIPS_KEY_PREFIX + myAccountId, targetUserId],
      ["SREM", FRIENDSHIPS_KEY_PREFIX + targetUserId, myAccountId],
      ["HDEL", FRIENDSHIP_DATES_KEY_PREFIX + myAccountId, targetUserId],
      ["HDEL", FRIENDSHIP_DATES_KEY_PREFIX + targetUserId, myAccountId],
      ["HDEL", aliasKey, targetUserId],
    ]);
    if (!result) return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
    return res.status(200).json({ ok: true });
  }

  if (req.method === "POST") {
    const body = bodyPre;
    const action = String(body.action || body.friendAction || "request").trim();
    const targetUserId = await resolveAccountId(body.targetUserId || body.requestUserId || "");
    if (!targetUserId) {
      return res.status(400).json({ ok: false, error: "Нужен targetUserId" });
    }
    if (targetUserId === myAccountId) return res.status(400).json({ ok: false, error: "Нельзя добавить себя" });
    if (!redisConfigured()) return res.status(500).json({ ok: false, error: "Сервер не настроен" });
    const contactName = sanitizeContactName(body.contactName != null ? body.contactName : body.contact_name);

    if (action === "accept") {
      const existingReq = await redisPipeline([["HGET", FRIEND_REQUESTS_IN_KEY_PREFIX + myAccountId, targetUserId]]);
      if (!existingReq || !existingReq[0] || !existingReq[0].result) {
        return res.status(404).json({ ok: false, error: "Заявка не найдена" });
      }
      const [myEligibility, requesterEligibility] = await Promise.all([
        friendPoker21Eligibility(myAccountId, myId),
        friendPoker21Eligibility(targetUserId, ""),
      ]);
      if (!myEligibility.eligible) {
        return res.status(403).json({ ok: false, error: "Привяжите Poker21 и получите уровень, чтобы добавлять друзей" });
      }
      if (!requesterEligibility.eligible) {
        return res.status(403).json({ ok: false, error: "У отправителя нет активной привязки Poker21 и уровня" });
      }
      const acceptedAt = new Date().toISOString();
      const cmds = [
        ["HDEL", FRIEND_REQUESTS_IN_KEY_PREFIX + myAccountId, targetUserId],
        ["HDEL", FRIEND_REQUESTS_OUT_KEY_PREFIX + targetUserId, myAccountId],
        ["HDEL", FRIEND_REQUESTS_OUT_KEY_PREFIX + myAccountId, targetUserId],
        ["HDEL", FRIEND_REQUESTS_IN_KEY_PREFIX + targetUserId, myAccountId],
        ["SADD", FRIENDSHIPS_KEY_PREFIX + myAccountId, targetUserId],
        ["SADD", FRIENDSHIPS_KEY_PREFIX + targetUserId, myAccountId],
        ["HSET", FRIENDSHIP_DATES_KEY_PREFIX + myAccountId, targetUserId, acceptedAt],
        ["HSET", FRIENDSHIP_DATES_KEY_PREFIX + targetUserId, myAccountId, acceptedAt],
        ["HSET", FRIEND_NOTICES_KEY_PREFIX + targetUserId, myAccountId, friendNoticePayload(myAccountId, "accepted")],
      ];
      const result = await redisPipeline(cmds);
      if (!result) return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
      const newlyAccepted = !!(result[0] && Number(result[0].result) === 1);
      if (newlyAccepted) {
        try {
          const accepterName = myEligibility.pokerPlusNickname || "Игрок";
          await sendToMemberDevices(targetUserId, {
            title: "✅ Заявка в друзья принята",
            body: accepterName + " теперь у вас в друзьях",
            tag: "poker-friend-accepted-" + myAccountId,
            openUrl: "./?startapp=profile_friends",
            kind: "friend_request_accepted",
            senderAccountId: myAccountId,
            accountId: targetUserId,
            dedupeKey: "friend-accepted:" + targetUserId + ":" + myAccountId + ":" + acceptedAt,
          });
        } catch (error) {
          console.warn("[friends] accept push failed", {
            accepterAccountId: myAccountId,
            requesterAccountId: targetUserId,
            error: error && error.message ? error.message : String(error || ""),
          });
        }
      }
      return res.status(200).json({ ok: true, accepted: true, message: "Заявка принята" });
    }

    if (action === "reject") {
      const existingReq = await redisPipeline([["HGET", FRIEND_REQUESTS_IN_KEY_PREFIX + myAccountId, targetUserId]]);
      if (!existingReq || !existingReq[0] || !existingReq[0].result) {
        return res.status(404).json({ ok: false, error: "Заявка не найдена" });
      }
      const cmds = [
        ["HDEL", FRIEND_REQUESTS_IN_KEY_PREFIX + myAccountId, targetUserId],
        ["HDEL", FRIEND_REQUESTS_OUT_KEY_PREFIX + targetUserId, myAccountId],
        ["HSET", FRIEND_NOTICES_KEY_PREFIX + targetUserId, myAccountId, friendNoticePayload(myAccountId, "rejected")],
      ];
      const result = await redisPipeline(cmds);
      if (!result) return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
      return res.status(200).json({ ok: true, rejected: true, message: "Заявка отклонена" });
    }

    if (action === "cancel") {
      const existingReq = await redisPipeline([["HGET", FRIEND_REQUESTS_OUT_KEY_PREFIX + myAccountId, targetUserId]]);
      if (!existingReq || !existingReq[0] || !existingReq[0].result) {
        return res.status(404).json({ ok: false, error: "Заявка не найдена" });
      }
      const result = await redisPipeline([
        ["HDEL", FRIEND_REQUESTS_OUT_KEY_PREFIX + myAccountId, targetUserId],
        ["HDEL", FRIEND_REQUESTS_IN_KEY_PREFIX + targetUserId, myAccountId],
      ]);
      if (!result) return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
      return res.status(200).json({ ok: true, cancelled: true, message: "Заявка отменена" });
    }

    const stateRes = await redisPipeline([
      ["SISMEMBER", FRIENDSHIPS_KEY_PREFIX + myAccountId, targetUserId],
      ["HGET", FRIEND_REQUESTS_OUT_KEY_PREFIX + myAccountId, targetUserId],
      ["HGET", FRIEND_REQUESTS_IN_KEY_PREFIX + myAccountId, targetUserId],
    ]);
    if (stateRes && stateRes[0] && stateRes[0].result === 1) {
      await redisPipeline([
        ["HDEL", FRIEND_REQUESTS_OUT_KEY_PREFIX + myAccountId, targetUserId],
        ["HDEL", FRIEND_REQUESTS_IN_KEY_PREFIX + myAccountId, targetUserId],
        ["HDEL", FRIEND_REQUESTS_OUT_KEY_PREFIX + targetUserId, myAccountId],
        ["HDEL", FRIEND_REQUESTS_IN_KEY_PREFIX + targetUserId, myAccountId],
      ]);
      if (Object.prototype.hasOwnProperty.call(body, "contactName") || Object.prototype.hasOwnProperty.call(body, "contact_name")) {
        const aliasKey = FRIEND_ALIAS_KEY_PREFIX + myAccountId;
        const aliasResult = contactName
          ? await redisPipeline([["HSET", aliasKey, targetUserId, contactName]])
          : await redisPipeline([["HDEL", aliasKey, targetUserId]]);
        if (!aliasResult) return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
        return res.status(200).json({ ok: true, alreadyFriend: true, message: "Контакт обновлен" });
      }
      return res.status(200).json({ ok: true, alreadyFriend: true, message: "Вы уже друзья" });
    }
    if (stateRes && stateRes[1] && stateRes[1].result) return res.status(200).json({ ok: true, pending: true, message: "Заявка уже отправлена" });
    if (stateRes && stateRes[2] && stateRes[2].result) return res.status(200).json({ ok: true, incoming: true, message: "Этот игрок уже отправил вам заявку" });

    const [myEligibility, targetEligibility] = await Promise.all([
      friendPoker21Eligibility(myAccountId, myId),
      friendPoker21Eligibility(targetUserId, ""),
    ]);
    if (!myEligibility.eligible) {
      return res.status(403).json({ ok: false, error: "Привяжите Poker21 и получите уровень, чтобы отправлять заявки в друзья" });
    }
    if (!targetEligibility.eligible) {
      return res.status(403).json({ ok: false, error: "У игрока нет активной привязки Poker21 и уровня" });
    }
    const requestPayload = friendRequestPayload(myAccountId, targetUserId, contactName);
    const result = await redisPipeline([
      ["HSET", FRIEND_REQUESTS_OUT_KEY_PREFIX + myAccountId, targetUserId, requestPayload],
      ["HSET", FRIEND_REQUESTS_IN_KEY_PREFIX + targetUserId, myAccountId, requestPayload],
    ]);
    if (!result) return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
    const newlyRequested = !!(result[0] && Number(result[0].result) === 1);
    try {
      const senderName = myEligibility.pokerPlusNickname || contactName || "Игрок";
      if (newlyRequested) await sendToMemberDevices(targetUserId, {
        title: "👥 Новая заявка в друзья",
        body: senderName + " хочет добавить вас в друзья",
        tag: "poker-friend-request-" + myAccountId,
        openUrl: "./?startapp=profile_friends",
        kind: "friend_request",
        senderAccountId: myAccountId,
        accountId: targetUserId,
        dedupeKey: "friend-request:" + myAccountId + ":" + targetUserId + ":" + requestPayload,
      });
    } catch (error) {
      console.warn("[friends] request push failed", {
        senderAccountId: myAccountId,
        targetAccountId: targetUserId,
        error: error && error.message ? error.message : String(error || ""),
      });
    }
    return res.status(200).json({ ok: true, pending: true, message: "Заявка отправлена" });
  }

  if (req.method !== "GET") return res.status(405).json({ ok: false, error: "Method not allowed" });
  if (!redisConfigured()) return res.status(500).json({ ok: false, error: "Redis not configured" });

  const previewOnly = String(queryPre.preview || "").trim() === "1";
  // Preview and the full list must read the same friendship set. Otherwise a
  // legacy account briefly shows only the newly stored friends until opening
  // the full modal triggers migration.
  await migrateLegacyFriendsIfNeeded(myId, myAccountId);
  if (previewOnly) {
    const previewRes = await redisPipeline([
      ["SCARD", FRIENDSHIPS_KEY_PREFIX + myAccountId],
      ["SRANDMEMBER", FRIENDSHIPS_KEY_PREFIX + myAccountId, "3"],
      ["HLEN", FRIEND_REQUESTS_IN_KEY_PREFIX + myAccountId],
    ], { context: "friends.preview" });
    if (!previewRes) return res.status(503).json({ ok: false, error: "Не удалось загрузить друзей" });
    const friendCount = Math.max(0, Number(previewRes[0] && previewRes[0].result) || 0);
    const previewRaw = previewRes[1] && previewRes[1].result;
    const previewAccountIds = (Array.isArray(previewRaw) ? previewRaw : [previewRaw])
      .map((id) => String(id || "").trim())
      .filter(Boolean);
    const incomingCount = Math.max(0, Number(previewRes[2] && previewRes[2].result) || 0);
    const friends = await rowsForAccounts(previewAccountIds, myAccountId, isAdminViewer);
    return res.status(200).json({ ok: true, preview: true, friends, friendCount, incomingCount });
  }
  const baseRes = await redisPipeline([
    ["SMEMBERS", FRIENDSHIPS_KEY_PREFIX + myAccountId],
    ["HGETALL", FRIEND_REQUESTS_IN_KEY_PREFIX + myAccountId],
    ["HGETALL", FRIEND_REQUESTS_OUT_KEY_PREFIX + myAccountId],
    ["HGETALL", FRIEND_NOTICES_KEY_PREFIX + myAccountId],
  ]);
  const friendRaw = baseRes && baseRes[0] && Array.isArray(baseRes[0].result) ? baseRes[0].result : [];
  const friendAccountIds = friendRaw.map((id) => String(id || "").trim()).filter(Boolean);
  const friendsPromise = rowsForAccounts(friendAccountIds, myAccountId, isAdminViewer);
  function idsFromHash(raw) {
    const out = [];
    if (!Array.isArray(raw)) return out;
    for (let i = 0; i < raw.length; i += 2) {
      const id = String(raw[i] || "").trim();
      if (id) out.push(id);
    }
    return out;
  }
  const incomingIds = idsFromHash(baseRes && baseRes[1] && baseRes[1].result);
  const outgoingIds = idsFromHash(baseRes && baseRes[2] && baseRes[2].result);
  const noticesIds = idsFromHash(baseRes && baseRes[3] && baseRes[3].result);
  const friendIds = new Set(friendAccountIds.map((id) => String(id || "").trim()).filter(Boolean));
  const staleRequestIds = [];
  const incomingFilteredIds = incomingIds.filter((id) => {
    const isFriend = friendIds.has(String(id || "").trim());
    if (isFriend) staleRequestIds.push({ id, kind: "incoming" });
    return !isFriend;
  });
  const outgoingFilteredIds = outgoingIds.filter((id) => {
    const isFriend = friendIds.has(String(id || "").trim());
    if (isFriend) staleRequestIds.push({ id, kind: "outgoing" });
    return !isFriend;
  });
  if (staleRequestIds.length) {
    const cleanup = [];
    for (const row of staleRequestIds) {
      if (!row || !row.id) continue;
      if (row.kind === "incoming") cleanup.push(["HDEL", FRIEND_REQUESTS_IN_KEY_PREFIX + myAccountId, row.id]);
      if (row.kind === "outgoing") cleanup.push(["HDEL", FRIEND_REQUESTS_OUT_KEY_PREFIX + myAccountId, row.id]);
    }
    if (cleanup.length) await redisPipeline(cleanup);
  }
  const [friends, incoming, outgoing, noticeRows] = await Promise.all([
    friendsPromise,
    rowsForAccounts(incomingFilteredIds, myAccountId, isAdminViewer),
    rowsForAccounts(outgoingFilteredIds, myAccountId, isAdminViewer),
    rowsForAccounts(noticesIds, myAccountId, isAdminViewer),
  ]);
  const noticesRaw = baseRes && baseRes[3] && Array.isArray(baseRes[3].result) ? baseRes[3].result : [];
  const notices = noticeRows.map((row) => {
    let raw = "";
    for (let i = 0; i < noticesRaw.length; i += 2) if (String(noticesRaw[i] || "") === row.userId) raw = noticesRaw[i + 1];
    const parsed = safeJsonParse(raw, {});
    return {
      ...row,
      status: parsed.status === "accepted" ? "accepted" : "rejected",
      createdAt: String(parsed.createdAt || "").trim(),
    };
  });
  if (noticesIds.length) await redisPipeline([["DEL", FRIEND_NOTICES_KEY_PREFIX + myAccountId]]);
  return res.status(200).json({ ok: true, friends, incoming, outgoing, notices });
};
