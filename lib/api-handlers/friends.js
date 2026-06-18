const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
/**
 * Друзья через подтверждённые заявки.
 * Старый односторонний список poker_app:friends:* больше не показывается в интерфейсе.
 */
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { ensureDtIdForUserId, getPreferredUserIdByDtId, getUserIdByDtId, resolveAccountId } = require("../account-id");
const { isAdminIdentity } = require("../api-auth");
const { getLinkedDtIdByEmail } = require("../email-auth");
const { PROFILE_HASH_KEY } = require("../pokerplus");
const {
  pokerProfileFeeFromCachedProfile,
  pokerProfileStatusFromCachedProfile,
  pokerProfileStatusFromRakeServer,
} = require("../chat-profile-status");
const { createChatProfileLookupHelpers } = require("../chat-profile-lookups");
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

const AVATAR_PREFIX = "poker_app:avatar:";
const DT_IDS_KEY = "poker_app:visitor_dt_ids";
const POKERPLUS_BIND_HASH_KEY = "poker_app:pokerplus_user_ids";
const RESPECT_SCORE_KEY = "poker_app:respect_score";
const PRESET_AVATAR_SRC_BY_ID = {
  tiger: "./assets/avatar-tiger.jpg",
  raccoon: "./assets/avatar-raccoon.jpg",
  skull: "./assets/avatar-skull.jpg",
  phoenix: "./assets/avatar-phoenix.jpg",
  octopus: "./assets/avatar-octopus.jpg",
  cat: "./assets/avatar-cat.jpg",
  robot: "./assets/avatar-robot.jpg",
  bulldog: "./assets/avatar-bulldog.jpg",
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
const FRIEND_ALIAS_KEY_PREFIX = "poker_app:friend_alias:";
const FRIENDSHIPS_KEY_PREFIX = "poker_app:friendships:";
const FRIEND_REQUESTS_IN_KEY_PREFIX = "poker_app:friend_requests:in:";
const FRIEND_REQUESTS_OUT_KEY_PREFIX = "poker_app:friend_requests:out:";
const FRIEND_NOTICES_KEY_PREFIX = "poker_app:friend_notices:";
const USERNAMES_KEY = "poker_app:visitor_usernames";
const TELEGRAM_VISIBLE_KEY = "poker_app:telegram_visible";
const CONTACT_NAME_MAX = 80;
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
  return "без TG";
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
  const [namesRes, visibleRes, avatars, statusMeta] = await Promise.all([
    redisPipeline(chatIds.map((id) => ["HGET", USERNAMES_KEY, id || ""])),
    redisPipeline(memberList.map((id) => ["HGET", TELEGRAM_VISIBLE_KEY, id])),
    getAvatars(previewIds),
    getPokerProfileStatusMeta(previewIds),
  ]);
  const aliasKey = FRIEND_ALIAS_KEY_PREFIX + myAccountId;
  const aliasRes = await redisPipeline([["HMGET", aliasKey, ...memberList]]);
  const aliasRow = aliasRes && aliasRes[0] && Array.isArray(aliasRes[0].result) ? aliasRes[0].result : [];
  return memberList.map((userId, i) => {
    const un = namesRes && namesRes[i] && namesRes[i].result ? String(namesRes[i].result).trim() : "";
    const visible = !!(visibleRes && visibleRes[i] && visibleRes[i].result === "1");
    const userName = maskFriendTelegramName(buildFriendDisplayName(userId, un, preferredUserIds[i]), visible, isAdminViewer);
    const rawAlias = aliasRow[i] != null && aliasRow[i] !== false ? String(aliasRow[i]).trim() : "";
    const contactName = rawAlias.length > 0 ? sanitizeContactName(rawAlias) : null;
    const out = { userId, userName };
    if (chatIds[i]) out.chatUserId = chatIds[i];
    if (contactName) out.contactName = contactName;
    const avatarUrl = avatars[userId] || avatars[chatIds[i]];
    const status = statusMeta[userId] || statusMeta[chatIds[i]];
    if (avatarUrl) out.avatarUrl = avatarUrl;
    if (status && status.level != null) out.statusLevel = status.level;
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

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

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
      const cmds = [
        ["HDEL", FRIEND_REQUESTS_IN_KEY_PREFIX + myAccountId, targetUserId],
        ["HDEL", FRIEND_REQUESTS_OUT_KEY_PREFIX + targetUserId, myAccountId],
        ["SADD", FRIENDSHIPS_KEY_PREFIX + myAccountId, targetUserId],
        ["SADD", FRIENDSHIPS_KEY_PREFIX + targetUserId, myAccountId],
        ["HSET", FRIEND_NOTICES_KEY_PREFIX + targetUserId, myAccountId, friendNoticePayload(myAccountId, "accepted")],
      ];
      const result = await redisPipeline(cmds);
      if (!result) return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
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

    const stateRes = await redisPipeline([
      ["SISMEMBER", FRIENDSHIPS_KEY_PREFIX + myAccountId, targetUserId],
      ["HGET", FRIEND_REQUESTS_OUT_KEY_PREFIX + myAccountId, targetUserId],
      ["HGET", FRIEND_REQUESTS_IN_KEY_PREFIX + myAccountId, targetUserId],
    ]);
    if (stateRes && stateRes[0] && stateRes[0].result === 1) {
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

    const result = await redisPipeline([
      ["HSET", FRIEND_REQUESTS_OUT_KEY_PREFIX + myAccountId, targetUserId, friendRequestPayload(myAccountId, targetUserId, contactName)],
      ["HSET", FRIEND_REQUESTS_IN_KEY_PREFIX + targetUserId, myAccountId, friendRequestPayload(myAccountId, targetUserId, contactName)],
    ]);
    if (!result) return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
    return res.status(200).json({ ok: true, pending: true, message: "Заявка отправлена" });
  }

  if (req.method !== "GET") return res.status(405).json({ ok: false, error: "Method not allowed" });
  if (!redisConfigured()) return res.status(500).json({ ok: false, error: "Redis not configured" });

  const baseRes = await redisPipeline([
    ["SMEMBERS", FRIENDSHIPS_KEY_PREFIX + myAccountId],
    ["HGETALL", FRIEND_REQUESTS_IN_KEY_PREFIX + myAccountId],
    ["HGETALL", FRIEND_REQUESTS_OUT_KEY_PREFIX + myAccountId],
    ["HGETALL", FRIEND_NOTICES_KEY_PREFIX + myAccountId],
  ]);
  const friendRaw = baseRes && baseRes[0] && Array.isArray(baseRes[0].result) ? baseRes[0].result : [];
  const friends = await rowsForAccounts(friendRaw, myAccountId, isAdminViewer);
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
  const incoming = await rowsForAccounts(incomingIds, myAccountId, isAdminViewer);
  const outgoing = await rowsForAccounts(outgoingIds, myAccountId, isAdminViewer);
  const noticeRows = await rowsForAccounts(noticesIds, myAccountId, isAdminViewer);
  const noticesRaw = baseRes && baseRes[3] && Array.isArray(baseRes[3].result) ? baseRes[3].result : [];
  const notices = noticeRows.map((row) => {
    let raw = "";
    for (let i = 0; i < noticesRaw.length; i += 2) if (String(noticesRaw[i] || "") === row.userId) raw = noticesRaw[i + 1];
    const parsed = safeJsonParse(raw, {});
    return { ...row, status: parsed.status === "accepted" ? "accepted" : "rejected" };
  });
  if (noticesIds.length) await redisPipeline([["DEL", FRIEND_NOTICES_KEY_PREFIX + myAccountId]]);
  return res.status(200).json({ ok: true, friends, incoming, outgoing, notices });
};
