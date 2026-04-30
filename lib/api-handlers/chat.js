/**
 * Чат: общий для всех + личные сообщения + групповые чаты (id вида group_…).
 * Админ (TELEGRAM_ADMIN_ID): удаляет сообщения в общем чате, пишет в личку любому.
 * Redis: poker_app:chat_messages (общий), poker_app:chat:{id1}_{id2} (личные),
 *        poker_app:chat_group_meta:*, poker_app:chat_group_msgs:*, poker_app:user_chat_groups:*.
 *
 * Главный чат по заявке: CLUB_CHAT_REQUIRE_APPLICATION=0 отключает (по умолчанию включено).
 * Ключи: poker_app:club_chat_pending, poker_app:club_chat_members,
 *        poker_app:club_chat_member_joined_at (HASH userId → ISO времени одобрения)
 * GET mode=clubChatManage (админ), PATCH action=clubChatApply|Approve|Reject|Revoke, generalPin|generalUnpin (админ, общий чат)
 * Новая заявка (clubChatApply): личные сообщения всем id из TELEGRAM_ADMIN_ID (нужен TELEGRAM_BOT_TOKEN).
 *
 * Уведомление в личку Telegram: только для личного чата (POST with=tg_…), после сохранения в Redis.
 * Общий чат в Telegram не дублируется. Собеседник vk_… в TG не уведомляется. Ошибки sendMessage пишутся в лог.
 */
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { isAdminIdentity: isApiAdminIdentity } = require("../api-auth");
const { ensureDtIdForUserId, getPreferredUserIdByDtId } = require("../account-id");
const { PROFILE_HASH_KEY } = require("../pokerplus");
const { rateLimit, rejectIfPayloadTooLarge } = require("../api-limits");
const {
  CLUB_CHAT_MEMBER_JOINED_AT_KEY,
  CLUB_CHAT_MEMBERS_KEY,
  CLUB_CHAT_PENDING_KEY,
  GENERAL_CHAT_ACCESS_REVOKED_KEY,
  clubChatApplicationRequired,
  getClubChatAccessState: getClubChatAccessStateBase,
  getClubChatPendingCount: getClubChatPendingCountBase,
  hasClubGeneralAccess: hasClubGeneralAccessBase,
} = require("../chat-access");
const {
  TELEGRAM_ROMAN_NUMERIC,
  chatMessageIsNewerThanLastViewed,
  chatMessageTimeMs,
  convKey,
  isGroupChatId,
  mergeReadCursors,
  normalizePeerChatUserId,
  normalizeStoredMessageFromId,
} = require("../chat-core");
const {
  GENERAL_KEY,
  GENERAL_PINNED_KEY,
  buildThreadPreviewText,
  groupMetaKey,
  groupMsgsKey,
  threadMessageIndexKey,
  threadMetaKeyByStorageKey,
  userChatGroupsKey,
} = require("../chat-storage");
const {
  CHAT_GENERAL_UNREAD_HASH,
  incrementGeneralUnreadForRecipients: incrementGeneralUnreadForRecipientsBase,
  incrementThreadUnreadForRecipients: incrementThreadUnreadForRecipientsBase,
  resetGeneralUnread: resetGeneralUnreadBase,
  resetThreadUnread: resetThreadUnreadBase,
} = require("../chat-unread");
const {
  buildClubChatMiniAppLink: buildClubChatMiniAppLinkBase,
  notifyAdminsNewClubChatApplication: notifyAdminsNewClubChatApplicationBase,
  runAsyncChatSideEffect,
  sendTelegram: sendTelegramBase,
} = require("../chat-notifications");
const {
  CHAT_GROUP_MEMBERS_MAX,
  groupMetaHasMember,
  pipelineCommandResults,
  readContactsMetaOnlyFlag,
  readGroupMetaOnlyFlag,
  sanitizeGroupAvatarInput,
  sanitizeGroupDescription,
  sanitizeGroupTitle,
} = require("../chat-groups");
const {
  applyPeerChatDisplayNamesToMessages,
  applyViewerFriendAliasesToMessages,
  collectMessageFromIdsForAlias,
} = require("../chat-message-enrichment");
const {
  filterMessagesAfterCursor,
  sliceMessagesBeforeCursor,
} = require("../chat-pagination");
const { buildGroupMembersPublicList: buildGroupMembersPublicListBase } = require("../chat-group-members");
const {
  deleteThreadMessageIndex: deleteThreadMessageIndexBase,
  locateThreadMessageById: locateThreadMessageByIdBase,
  writeThreadMessageIndex: writeThreadMessageIndexBase,
  writeThreadMeta: writeThreadMetaBase,
} = require("../chat-thread-store");

/** Допустимые эмодзи реакций: базовый (🔥 первым) + покерный. Синхронизировать с `#chatReactionPicker` и `.chat-ctx-menu__reactions` в index.html. */
const CHAT_REACTION_EMOJI_BASIC = [
  "🔥",
  "✅",
  "👍",
  "👎",
  "❤️",
  "😂",
  "🤣",
  "😮",
  "😢",
  "🙏",
  "😍",
  "🥰",
  "😊",
  "🎉",
  "👏",
  "🙌",
  "💯",
  "✨",
  "⭐",
  "🤔",
  "😤",
  "🥳",
  "🤝",
  "💪",
  "😉",
  "😎",
  "🤩",
  "😭",
  "🤯",
];
const CHAT_REACTION_EMOJI_POKER = ["♠️", "♥️", "♦️", "♣️", "🃏", "🎲", "🎰", "💰", "🤑", "🏆", "👑", "🧠"];
const CHAT_REACTION_EMOJI_ALLOWED = Array.from(new Set([...CHAT_REACTION_EMOJI_BASIC, ...CHAT_REACTION_EMOJI_POKER]));

const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const MINI_APP_URL = process.env.MINI_APP_URL || process.env.APP_URL || "";

/** Ссылка открытия приложения с startapp=club_chat (без лишней «)» перед ?). */
function buildClubChatMiniAppLink() {
  return buildClubChatMiniAppLinkBase(MINI_APP_URL);
}
const ADMIN_IDS = (process.env.TELEGRAM_ADMIN_ID || "388008256,2144406710,1897001087")
  .toString()
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

function buildGeneralPinnedSnapshot(m, myId) {
  if (!m || m.id == null || m.id === "") return null;
  const from = normalizeStoredMessageFromId(m.from);
  let text = m.text != null ? String(m.text) : "";
  text = text.trim();
  if (text.length > 400) text = text.slice(0, 400) + "…";
  const hasImage = !!m.image;
  const hasVoice = !!m.voice;
  const hasDocument = !!m.document;
  const imageSrc = hasImage && m.image ? String(m.image) : "";
  let documentName = hasDocument ? String(m.documentName || "Документ").trim() : "";
  if (documentName.length > 80) documentName = documentName.slice(0, 80);
  const fromName = String(m.fromName || "Игрок").trim() || "Игрок";
  const myNorm = normalizeStoredMessageFromId(myId);
  return {
    id: String(m.id),
    from,
    own: from === myNorm,
    fromName,
    text,
    hasImage,
    hasVoice,
    hasDocument,
    imageSrc,
    documentName,
  };
}
/** Число заявок в очереди (для бейджа у админа). */
async function getClubChatPendingCount() {
  return getClubChatPendingCountBase(redisPipeline);
}
const BLOCKED_KEY = "poker_app:chat_blocked";
const CHAT_ONLINE_KEY = "poker_app:chat_online";
/** HASH userId → timestamp (ms): последняя активность в чате; не удаляется с TTL «онлайн». */
const CHAT_LAST_SEEN_HASH = "poker_app:chat_last_seen";
/** HSET: поле «viewerId|peerId» → ISO времени последнего сообщения в треде, которое viewer открыл в GET чата */
const CHAT_SEEN_CURSOR_KEY = "poker_app:chat_seen_cursor";
/** HASH userId → ISO: пользователь открыл общий чат и догрузил ленту (для счётчика непрочитанных без единственной опоры на localStorage). */
const CHAT_GENERAL_SEEN_HASH = "poker_app:chat_general_seen";
/** STRING peerId, TTL: клиент пингует, пока открыт личный диалог с этим peer — Web Push в ЛС не шлём */
const CHAT_DM_FOCUS_KEY_PREFIX = "poker_app:chat_dm_focus:";
const CHAT_TYPING_KEY_PREFIX = "poker_app:chat_typing:";
const CHAT_TYPING_TTL_SEC = 8;
/** HINCRBY при LPUSH/LSET/LREM в треде (не GENERAL_KEY): poll-rev видит реакции/редакты не у головы списка. */
const CHAT_THREAD_POLL_GEN_HASH = "poker_app:chat_thread_poll_gen";
const RESPECT_SCORE_KEY = "poker_app:respect_score";
const ONLINE_TTL_MS = 5 * 60 * 1000; // 5 минут

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
  const valuePercent = level >= 55 ? 100 : Math.floor(Math.min(99, Math.max(0, ((rake - levelStart) / levelSize) * 100)));
  return { level, valuePercent };
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

function chatLastSeenIsoFromRedisRaw(raw) {
  if (raw == null || raw === false) return null;
  const n = parseFloat(String(raw));
  if (!Number.isFinite(n) || n <= 0) return null;
  return new Date(Math.floor(n)).toISOString();
}

function normalizeLegacyAccountDisplayLabel(value) {
  const raw = value != null ? String(value).trim() : "";
  if (!raw) return "";
  if (/^(tg|vk)_ID\d{6}$/.test(raw)) return raw.slice(3);
  if (/^mail_ID\d{6}$/.test(raw)) return raw.slice(5);
  return raw;
}

/** Добавить в pipeline сразу после обновления presence в ZSET. */
function touchChatLastSeenCmd(userId, nowMs) {
  const id = userId != null ? String(userId).trim() : "";
  if (!id) return null;
  return ["HSET", CHAT_LAST_SEEN_HASH, id, String(nowMs)];
}
function chatTypingKey(recipientId, senderId) {
  return CHAT_TYPING_KEY_PREFIX + String(recipientId || "").trim() + ":" + String(senderId || "").trim();
}
async function resetThreadUnread(viewerId, peerId) {
  return resetThreadUnreadBase(redisPipeline, viewerId, peerId);
}
async function resetGeneralUnread(userId) {
  return resetGeneralUnreadBase(redisPipeline, userId);
}
async function incrementThreadUnreadForRecipients(recipientIds, peerId) {
  return incrementThreadUnreadForRecipientsBase(redisPipeline, recipientIds, peerId);
}
async function incrementGeneralUnreadForRecipients(recipientIds) {
  return incrementGeneralUnreadForRecipientsBase(redisPipeline, recipientIds);
}
/** Текст сообщения (Telegram sendMessage — до 4096, чтобы ЛС-уведомления не обрезались). */
const CHAT_MESSAGE_TEXT_MAX = 4096;
const DT_IDS_KEY = "poker_app:visitor_dt_ids";
const POKERPLUS_BIND_HASH_KEY = "poker_app:pokerplus_user_ids";
const USERNAMES_KEY = "poker_app:visitor_usernames";
const FRIEND_ALIAS_KEY_PREFIX = "poker_app:friend_alias:";
const FRIENDS_SET_KEY_PREFIX = "poker_app:friends:";
const AVATAR_PREFIX = "poker_app:avatar:";
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
const CHAT_DISPLAY_NAMES_KEY = "poker_app:visitor_chat_display_names";
const GENERAL_CHAT_CONTACTS_STATS_CACHE_KEY = "poker_app:chat_general_contacts_stats";
const GENERAL_CHAT_CONTACTS_STATS_TTL_SEC = 30;
const MAX_MESSAGES = 40;
const FRIEND_CONTACT_NAME_MAX = 80;
const CHAT_DISPLAY_NAME_MAX = 80;
/** Групповые чаты: метаданные, лента сообщений, индекс «группы пользователя». */
async function writeThreadMeta(redisKey, msg) {
  return writeThreadMetaBase(redisPipeline, redisKey, msg);
}
async function writeThreadMessageIndex(redisKey, msg, rawJsonOpt) {
  return writeThreadMessageIndexBase(redisPipeline, redisKey, msg, rawJsonOpt);
}
async function deleteThreadMessageIndex(redisKey, messageId) {
  return deleteThreadMessageIndexBase(redisPipeline, redisKey, messageId);
}
async function locateThreadMessageById(redisKey, messageId) {
  return locateThreadMessageByIdBase(redisPipeline, redisKey, messageId);
}

function computeContactsMetaPollRev(payload) {
  if (!payload || typeof payload !== "object") return "contacts-meta|empty";
  const contacts = Array.isArray(payload.contacts) ? payload.contacts : [];
  const rows = contacts.map((c) => {
    if (!c || c.id == null) return "";
    const rowId = String(c.id);
    const unread = Math.max(0, parseInt(String(c.unreadCount), 10) || 0);
    const online = c.online ? 1 : 0;
    const isGroup = c.isGroupChat ? 1 : 0;
    const memberCount = c.memberCount != null ? Math.max(0, parseInt(String(c.memberCount), 10) || 0) : 0;
    const lastTime = c.lastMessageTime != null ? String(c.lastMessageTime) : "";
    const preview = c.lastMessagePreview != null ? String(c.lastMessagePreview) : "";
    return [rowId, unread, online, isGroup, memberCount, lastTime, preview].join("~");
  });
  return [
    "contacts-meta",
    rows.length,
    rows.join("^"),
    payload.participantsCount != null ? Math.max(0, parseInt(String(payload.participantsCount), 10) || 0) : 0,
    payload.onlineCount != null ? Math.max(0, parseInt(String(payload.onlineCount), 10) || 0) : 0,
    payload.generalUnreadCount != null ? Math.max(0, parseInt(String(payload.generalUnreadCount), 10) || 0) : 0,
    payload.clubChatAccess != null ? String(payload.clubChatAccess) : "",
    payload.clubChatPendingReviewCount != null
      ? Math.max(0, parseInt(String(payload.clubChatPendingReviewCount), 10) || 0)
      : 0,
    payload.generalChatParticipantsCount != null
      ? Math.max(0, parseInt(String(payload.generalChatParticipantsCount), 10) || 0)
      : 0,
    payload.generalChatOnlineCount != null ? Math.max(0, parseInt(String(payload.generalChatOnlineCount), 10) || 0) : 0,
    payload.generalChatPreview != null ? String(payload.generalChatPreview) : "",
  ].join("|");
}
function sortContactsByLastMessageTime(rows, lastMessageTime) {
  rows.sort((a, b) => {
    const tA = lastMessageTime[a.id] || "";
    const tB = lastMessageTime[b.id] || "";
    if (tA && !tB) return -1;
    if (!tA && tB) return 1;
    if (tB !== tA) return tB.localeCompare(tA);
    return (a.id || "").localeCompare(b.id || "");
  });
  return rows;
}

async function filterChatPartnersWithThreadContent(myId, partnerIds, lastMessageTime, lastMessagePreview, unreadCounts) {
  const ids = Array.isArray(partnerIds) ? partnerIds.filter(Boolean) : [];
  if (!ids.length) return [];
  const keep = new Set();
  const needLenCheck = [];
  ids.forEach((id) => {
    const unread = unreadCounts && unreadCounts[id] != null ? parseInt(String(unreadCounts[id]), 10) || 0 : 0;
    if ((lastMessageTime && lastMessageTime[id]) || (lastMessagePreview && lastMessagePreview[id]) || unread > 0) {
      keep.add(id);
    } else {
      needLenCheck.push(id);
    }
  });
  if (needLenCheck.length > 0) {
    const lenRes = await redisPipeline(needLenCheck.map((id) => ["LLEN", convKey(myId, id)]));
    const lenRows = lenRes && Array.isArray(lenRes) ? lenRes : [];
    needLenCheck.forEach((id, idx) => {
      const raw = lenRows[idx] && lenRows[idx].result != null ? lenRows[idx].result : 0;
      if ((parseInt(String(raw), 10) || 0) > 0) keep.add(id);
    });
  }
  if (!keep.size) return ids;
  return ids.filter((id) => keep.has(id));
}

async function buildGroupMembersPublicList(myId, memberIds, minScore, creatorIdOpt) {
  return buildGroupMembersPublicListBase({
    chatLastSeenHash: CHAT_LAST_SEEN_HASH,
    chatLastSeenIsoFromRedisRaw,
    chatOnlineKey: CHAT_ONLINE_KEY,
    creatorId: creatorIdOpt,
    friendAliasKeyPrefix: FRIEND_ALIAS_KEY_PREFIX,
    getAvatars,
    getChatDisplayNameMapForIds,
    getDtIds,
    getP21Ids,
    getPokerPlusVerifiedIds,
    isAdmin,
    memberIds,
    minScore,
    myId,
    normalizeLegacyAccountDisplayLabel,
    redisPipeline,
    sanitizeFriendContactNameForChat,
    usernamesKey: USERNAMES_KEY,
  });
}

async function getGroupMeta(groupId) {
  const r = await redisPipeline([["GET", groupMetaKey(groupId)]]);
  const str = r && r[0] && r[0].result != null ? String(r[0].result) : "";
  if (!str) return null;
  try {
    const p = JSON.parse(str);
    if (!p || !Array.isArray(p.members)) return null;
    p.members = [
      ...new Set(
        p.members
          .map((x) => normalizeStoredMessageFromId(String(x).trim()))
          .filter((id) => id && (id.startsWith("tg_") || id.startsWith("vk_")))
      ),
    ];
    if (p.createdBy != null && String(p.createdBy).trim() !== "") {
      p.createdBy = normalizeStoredMessageFromId(String(p.createdBy).trim());
    }
    return p;
  } catch (e) {
    return null;
  }
}

function sanitizeFriendContactNameForChat(raw) {
  return String(raw || "")
    .trim()
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .slice(0, FRIEND_CONTACT_NAME_MAX);
}

function sanitizeChatDisplayNameStored(raw) {
  return String(raw || "")
    .trim()
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .slice(0, CHAT_DISPLAY_NAME_MAX);
}

async function getVisitorChatDisplayName(userId) {
  if (!userId || typeof userId !== "string") return null;
  const dtId = userId.startsWith("guest_") ? null : await ensureDtIdForUserId(userId);
  const lookupId = dtId || userId;
  const r = await redisPipeline([["HGET", CHAT_DISPLAY_NAMES_KEY, lookupId]]);
  const v = r && r[0] && r[0].result != null ? sanitizeChatDisplayNameStored(r[0].result) : "";
  return v || null;
}

async function getChatDisplayNameMapForIds(rawIds) {
  const normIds = [
    ...new Set((rawIds || []).map((id) => normalizeStoredMessageFromId(id)).filter(Boolean)),
  ];
  if (!normIds.length) return {};
  const dtIds = await getDtIds(normIds);
  const accountIds = normIds.map((id) => dtIds[id] || id);
  const r = await redisPipeline([["HMGET", CHAT_DISPLAY_NAMES_KEY, ...accountIds]]);
  const row = r && r[0] && Array.isArray(r[0].result) ? r[0].result : [];
  const map = {};
  normIds.forEach((pid, idx) => {
    const raw = row[idx];
    if (raw == null || raw === false) return;
    const cn = sanitizeChatDisplayNameStored(raw);
    if (cn) map[pid] = cn;
  });
  return map;
}

async function getFriendAliasMapForViewer(myId, rawIds) {
  const normIds = [
    ...new Set((rawIds || []).map((id) => normalizeStoredMessageFromId(id)).filter(Boolean)),
  ];
  if (!normIds.length || !redisConfigured()) return {};
  const viewerAccountId = myId.startsWith("guest_") ? myId : await ensureDtIdForUserId(myId);
  const aliasRes = await redisPipeline([["HMGET", FRIEND_ALIAS_KEY_PREFIX + viewerAccountId, ...normIds]]);
  const aliasRow =
    aliasRes && aliasRes[0] && Array.isArray(aliasRes[0].result) ? aliasRes[0].result : [];
  const map = {};
  normIds.forEach((pid, idx) => {
    const raw = aliasRow[idx];
    if (raw == null || raw === false) return;
    const cn = sanitizeFriendContactNameForChat(raw);
    if (cn) map[pid] = cn;
  });
  return map;
}

async function tryBuildFastTailResponse(redisKey, afterId, afterTime, limit) {
  const key = String(redisKey || "").trim();
  const afterIdNeedle = afterId != null ? String(afterId).trim() : "";
  const afterTimeNeedle = afterTime != null ? String(afterTime).trim() : "";
  if (!key || (!afterIdNeedle && !afterTimeNeedle)) return null;
  const tailLimit = Math.max(MAX_MESSAGES, 80);
  const tailPipe = await redisPipeline([
    ["LRANGE", key, "0", String(tailLimit - 1)],
    ["LLEN", key],
  ]);
  let listResp = tailPipe;
  if (tailPipe && typeof tailPipe === "object" && !Array.isArray(tailPipe) && Array.isArray(tailPipe.result)) {
    listResp = tailPipe.result;
  }
  let raw = [];
  let total = 0;
  if (listResp && Array.isArray(listResp)) {
    const first = listResp[0];
    if (first && first.error) return null;
    raw = Array.isArray(first?.result) ? first.result : typeof first?.result === "string" ? [first.result] : [];
    total =
      listResp[1] && listResp[1].result != null
        ? Math.max(0, parseInt(String(listResp[1].result), 10) || 0)
        : 0;
  }
  const messages = (Array.isArray(raw) ? raw : [])
    .map((s) => {
      try {
        return typeof s === "string" ? JSON.parse(s) : null;
      } catch (e) {
        return null;
      }
    })
    .filter(Boolean)
    .reverse();
  const seen = new Set();
  const deduped = messages.filter((m) => {
    if (m && m.from != null && m.from !== "") m.from = normalizeStoredMessageFromId(m.from);
    const k =
      m.id !== null && m.id !== undefined && m.id !== ""
        ? String(m.id)
        : String(m.from || "") + "|" + String(m.time || "") + "|" + String(m.text || "");
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  let cursorFound = false;
  if (afterIdNeedle) {
    cursorFound = deduped.some((m) => m && String(m.id || "") === afterIdNeedle);
  } else if (afterTimeNeedle) {
    cursorFound = deduped.some((m) => m && chatMessageIsNewerThanLastViewed(m.time, afterTimeNeedle));
  }
  if (!cursorFound) return null;
  return {
    messages: filterMessagesAfterCursor(deduped, afterIdNeedle, afterTimeNeedle).slice(-Math.max(1, parseInt(String(limit), 10) || MAX_MESSAGES)),
    totalMessages: total > 0 ? total : deduped.length,
    usedFastTail: true,
  };
}

async function findMessageByIdTailFirst(redisKey, messageId, fastLimit) {
  const targetId = String(messageId || "").trim();
  if (!redisKey || !targetId) return null;
  const tailLimit = Math.max(20, Math.min(400, parseInt(String(fastLimit || 120), 10) || 120));
  const tailRes = await redisPipeline([["LRANGE", redisKey, "0", String(tailLimit - 1)]]);
  const tailRaw = tailRes && tailRes[0] && tailRes[0].result !== undefined ? tailRes[0].result : [];
  const tailList = Array.isArray(tailRaw) ? tailRaw : [];
  for (let i = 0; i < tailList.length; i++) {
    try {
      const msg = JSON.parse(tailList[i]);
      if (msg && String(msg.id || "") === targetId) return msg;
    } catch (e) {}
  }
  const fullRes = await redisPipeline([["LRANGE", redisKey, "0", "-1"]]);
  const fullRaw = fullRes && fullRes[0] && fullRes[0].result !== undefined ? fullRes[0].result : [];
  const fullList = Array.isArray(fullRaw) ? fullRaw : [];
  for (let i = 0; i < fullList.length; i++) {
    try {
      const msg = JSON.parse(fullList[i]);
      if (msg && String(msg.id || "") === targetId) return msg;
    } catch (e) {}
  }
  return null;
}

async function buildContactsMetaOnlyPayload(myId, admin, req) {
  const now = Date.now();
  const minScore = now - ONLINE_TTL_MS;
  const touchCt = touchChatLastSeenCmd(myId, now);
  const results = await redisPipeline([
    ["SMEMBERS", "poker_app:chat_partners:" + myId],
    ["ZADD", CHAT_ONLINE_KEY, String(now), myId],
    ["ZREMRANGEBYSCORE", CHAT_ONLINE_KEY, "-inf", String(minScore)],
    ...(touchCt ? [touchCt] : []),
  ]);
  if (!results || !Array.isArray(results) || results.length < 1) {
    const clubEmpty = await getClubChatAccessState(myId, admin);
    return {
      ok: true,
      contactsMetaOnly: true,
      contacts: [],
      friendIds: [],
      chatPartnerIds: [],
      isAdmin: admin,
      participantsCount: 0,
      onlineCount: 0,
      generalUnreadCount: 0,
      clubChatAccess: clubEmpty,
      clubChatPendingReviewCount: 0,
      generalChatParticipantsCount: 0,
      generalChatOnlineCount: 0,
    };
  }
  const partners = Array.isArray(results[0]?.result) ? results[0].result : [];
  const partnerIds = [...new Set(partners.map((id) => normalizePeerChatUserId(String(id))))].filter(
    (id) => (id.startsWith("tg_") || id.startsWith("vk_")) && id !== myId
  );
  const viewerAccountId = myId.startsWith("guest_") ? myId : await ensureDtIdForUserId(myId);
  const friendsEarlyRes = await redisPipeline([["SMEMBERS", FRIENDS_SET_KEY_PREFIX + viewerAccountId]]);
  const friendIdsForResponse =
    friendsEarlyRes && friendsEarlyRes[0] && Array.isArray(friendsEarlyRes[0].result)
      ? friendsEarlyRes[0].result.map((x) => (x != null ? String(x) : "")).filter(Boolean)
      : [];
  const idsForOnline = [...new Set(partnerIds)];
  const onlineSet = new Set();
  let onlineCount = 0;
  if (idsForOnline.length > 0) {
    const scoreCmds = idsForOnline.flatMap((id) => [["ZSCORE", CHAT_ONLINE_KEY, id]]);
    const scoreResults = await redisPipeline(scoreCmds);
    if (scoreResults && Array.isArray(scoreResults)) {
      idsForOnline.forEach((id, i) => {
        const s = scoreResults[i]?.result;
        if (s != null && parseFloat(s) >= minScore) {
          onlineCount++;
          onlineSet.add(id);
        }
      });
    }
  }
  let participantsCount = partnerIds.length;
  let lastViewed = {};
  try {
    const lv = req.query.lastViewed;
    if (lv && typeof lv === "string") lastViewed = JSON.parse(lv);
  } catch (e) {}
  const adminIds = ADMIN_IDS.map((id) => (id.startsWith("tg_") ? id : "tg_" + id));
  const allIdsForUnread = [...partnerIds, ...adminIds];
  const unreadCounts = {};
  let generalUnreadCount = 0;
  const unreadCmds = [];
  if (allIdsForUnread.length > 0) unreadCmds.push(["HMGET", unreadHashKey(myId), ...allIdsForUnread]);
  unreadCmds.push(["HGET", CHAT_GENERAL_UNREAD_HASH, myId]);
  unreadCmds.push(["HGET", CHAT_GENERAL_SEEN_HASH, myId]);
  const unreadPipe = await redisPipeline(unreadCmds);
  let unreadRow = [];
  let generalUnreadRaw = null;
  let generalSeenRaw = null;
  if (unreadPipe && Array.isArray(unreadPipe)) {
    let idxUnread = 0;
    if (allIdsForUnread.length > 0) {
      unreadRow = unreadPipe[idxUnread] && Array.isArray(unreadPipe[idxUnread].result) ? unreadPipe[idxUnread].result : [];
      idxUnread++;
    }
    generalUnreadRaw = unreadPipe[idxUnread] ? unreadPipe[idxUnread].result : null;
    idxUnread++;
    generalSeenRaw = unreadPipe[idxUnread] ? unreadPipe[idxUnread].result : null;
  }
  allIdsForUnread.forEach((id, i) => {
    const raw = unreadRow[i];
    const n = raw != null && raw !== false ? parseInt(String(raw), 10) : 0;
    unreadCounts[id] = Number.isFinite(n) && n > 0 ? n : 0;
  });
  generalUnreadCount =
    generalUnreadRaw != null && generalUnreadRaw !== false
      ? Math.max(0, parseInt(String(generalUnreadRaw), 10) || 0)
      : 0;
  const serverGenLv = generalSeenRaw != null ? String(generalSeenRaw).trim() : "";
  const clientGenLv = lastViewed.general != null ? String(lastViewed.general) : "";
  const lastViewGeneralMerged = mergeReadCursors(clientGenLv, serverGenLv);
  if (!lastViewGeneralMerged || String(lastViewGeneralMerged).trim() === "") generalUnreadCount = 0;
  const lastMessageTime = {};
  const lastMessagePreview = {};
  if (partnerIds.length > 0) {
    const dmMetaRes = await redisPipeline(
      partnerIds.flatMap((id) => [
        ["HGET", threadMetaKeyByStorageKey(convKey(myId, id)), "lastMessageTime"],
        ["HGET", threadMetaKeyByStorageKey(convKey(myId, id)), "lastMessagePreview"],
      ])
    );
    const metaResults = dmMetaRes && Array.isArray(dmMetaRes) ? dmMetaRes : [];
    partnerIds.forEach((id, i) => {
      const timeIdx = i * 2;
      const previewIdx = timeIdx + 1;
      const rawTime = metaResults[timeIdx] && metaResults[timeIdx].result != null ? String(metaResults[timeIdx].result).trim() : "";
      const rawPreview = metaResults[previewIdx] && metaResults[previewIdx].result != null ? String(metaResults[previewIdx].result).trim() : "";
      if (rawTime) lastMessageTime[id] = rawTime;
      if (rawPreview) lastMessagePreview[id] = rawPreview;
    });
  }
  const visiblePartnerIds = await filterChatPartnersWithThreadContent(myId, partnerIds, lastMessageTime, lastMessagePreview, unreadCounts);
  participantsCount = visiblePartnerIds.length;
  onlineCount = visiblePartnerIds.reduce((count, id) => count + (onlineSet.has(id) ? 1 : 0), 0);
  let myGroupsRes = await redisPipeline([["SMEMBERS", userChatGroupsKey(myId)]]);
  if (!myGroupsRes || !Array.isArray(myGroupsRes)) myGroupsRes = await redisPipeline([["SMEMBERS", userChatGroupsKey(myId)]]);
  const rawGroupIds = Array.isArray(myGroupsRes?.[0]?.result) ? myGroupsRes[0].result : [];
  const groupIdsList = [...new Set(rawGroupIds.map((g) => String(g).trim()).filter((x) => isGroupChatId(x)))];
  const groupContacts = [];
  if (groupIdsList.length > 0) {
    const nGrp = groupIdsList.length;
    const metaCmdsGrp = groupIdsList.map((gid) => ["GET", groupMetaKey(gid)]);
    const metaLastCmdsGrp = groupIdsList.map((gid) => ["HGET", threadMetaKeyByStorageKey(groupMsgsKey(gid)), "lastMessageTime"]);
    const metaPreviewCmdsGrp = groupIdsList.map((gid) => ["HGET", threadMetaKeyByStorageKey(groupMsgsKey(gid)), "lastMessagePreview"]);
    const unreadCmdsGrp = [["HMGET", unreadHashKey(myId), ...groupIdsList]];
    const grpPipe = await redisPipeline([...metaCmdsGrp, ...metaLastCmdsGrp, ...metaPreviewCmdsGrp, ...unreadCmdsGrp]);
    for (let gi = 0; gi < groupIdsList.length; gi++) {
      const gid = groupIdsList[gi];
      const metaRawG = grpPipe && grpPipe[gi] ? grpPipe[gi].result : null;
      const metaStrG = metaRawG != null ? String(metaRawG) : "";
      let metaObjG = null;
      try {
        metaObjG = metaStrG ? JSON.parse(metaStrG) : null;
      } catch (eParseG) {}
      const gMembers = metaObjG && Array.isArray(metaObjG.members) ? metaObjG.members.map(String) : [];
      if (!metaObjG || !groupMetaHasMember({ members: gMembers }, myId)) continue;
      const metaLastRawG = grpPipe && grpPipe[gi + nGrp] && grpPipe[gi + nGrp].result != null
        ? String(grpPipe[gi + nGrp].result).trim()
        : "";
      const metaPreviewRawG = grpPipe && grpPipe[gi + 2 * nGrp] && grpPipe[gi + 2 * nGrp].result != null
        ? String(grpPipe[gi + 2 * nGrp].result).trim()
        : "";
      const grpUnreadRow = grpPipe && grpPipe[3 * nGrp] && Array.isArray(grpPipe[3 * nGrp].result) ? grpPipe[3 * nGrp].result : [];
      const unreadRawGrp = grpUnreadRow[gi];
      const unreadGrp = unreadRawGrp != null && unreadRawGrp !== false
        ? Math.max(0, parseInt(String(unreadRawGrp), 10) || 0)
        : 0;
      groupContacts.push({
        id: gid,
        unreadCount: unreadGrp,
        online: false,
        isGroupChat: true,
        memberCount: gMembers.length,
      });
      if (metaLastRawG) lastMessageTime[gid] = metaLastRawG;
      if (metaPreviewRawG) lastMessagePreview[gid] = metaPreviewRawG;
    }
  }
  const directContacts = visiblePartnerIds.map((id) => ({
    id,
    unreadCount: unreadCounts[id] != null ? unreadCounts[id] : 0,
    online: onlineSet.has(id),
    isGroupChat: false,
  }));
  const metaContacts = groupContacts.concat(directContacts);
  sortContactsByLastMessageTime(metaContacts, lastMessageTime);
  const adminUnread = {};
  adminIds.forEach((id) => {
    if (unreadCounts[id] != null && unreadCounts[id] > 0) adminUnread[id] = unreadCounts[id];
  });
  const clubChatAccess = await getClubChatAccessState(myId, admin);
  let outGeneralUnread = generalUnreadCount;
  if (!admin && !(await hasClubGeneralAccess(myId, admin))) outGeneralUnread = 0;
  let clubChatPendingReviewCount = 0;
  if (admin && clubChatApplicationRequired()) clubChatPendingReviewCount = await getClubChatPendingCount();
  const generalChatStats = await buildGeneralChatStatsForContacts(myId, admin);
  const generalPreviewRes = await redisPipeline([["HGET", threadMetaKeyByStorageKey(GENERAL_KEY), "lastMessagePreview"]]);
  const generalChatPreview =
    generalPreviewRes && generalPreviewRes[0] && generalPreviewRes[0].result != null
      ? String(generalPreviewRes[0].result).trim()
      : "";
  return {
    ok: true,
    contactsMetaOnly: true,
    contacts: metaContacts.map((c) => ({
      id: c.id,
      unreadCount: c.unreadCount != null ? c.unreadCount : 0,
      online: !!c.online,
      isGroupChat: !!c.isGroupChat,
      memberCount: c.memberCount != null ? c.memberCount : undefined,
      lastMessageTime: lastMessageTime[c.id] || "",
      lastMessagePreview: lastMessagePreview[c.id] || "",
    })),
    friendIds: friendIdsForResponse,
    chatPartnerIds: visiblePartnerIds,
    isAdmin: admin,
    participantsCount,
    onlineCount,
    adminUnread: Object.keys(adminUnread).length ? adminUnread : undefined,
    generalUnreadCount: outGeneralUnread > 0 ? outGeneralUnread : 0,
    clubChatAccess,
    clubChatPendingReviewCount,
    generalChatParticipantsCount: generalChatStats.generalChatParticipantsCount,
    generalChatOnlineCount: generalChatStats.generalChatOnlineCount,
    generalChatPreview: generalChatPreview || undefined,
  };
}

function isAdmin(userId) {
  const s = String(normalizePeerChatUserId(userId));
  if (s.startsWith("vk_")) return false;
  const id = s.replace(/^tg_/, "");
  return id && ADMIN_IDS.length > 0 && ADMIN_IDS.includes(id);
}

/** open = режим выключен; member / pending / need_apply / revoked (открытый режим, доступ отозван) */
async function getClubChatAccessState(myId, admin) {
  return getClubChatAccessStateBase(myId, admin, redisPipeline);
}

async function hasClubGeneralAccess(myId, admin) {
  return hasClubGeneralAccessBase(myId, admin, redisPipeline);
}

const VISITORS_SET_KEY = "poker_app:visitors";
const GENERAL_CHAT_ROSTER_SCORE_CHUNK = 400;

/** Список id для «состава главного чата»: при заявках — club_chat_members + админы; иначе — visitors. */
async function getGeneralChatRosterMemberIds(myId, admin) {
  const access = await getClubChatAccessState(myId, admin);
  const gated = clubChatApplicationRequired();
  const canList = admin || access === "open" || access === "member";
  if (!canList) {
    return { memberIds: [], access };
  }
  if (gated) {
    const r = await redisPipeline([["SMEMBERS", CLUB_CHAT_MEMBERS_KEY]]);
    const raw = Array.isArray(r?.[0]?.result) ? r[0].result : [];
    const set = new Set();
    for (let i = 0; i < raw.length; i++) {
      const id = normalizePeerChatUserId(String(raw[i] || "").trim());
      if (id && (id.startsWith("tg_") || id.startsWith("vk_"))) set.add(id);
    }
    const adminNorm = ADMIN_IDS.map((id) => (String(id).startsWith("tg_") ? String(id) : "tg_" + String(id)));
    for (let j = 0; j < adminNorm.length; j++) {
      const a = adminNorm[j];
      if (a) set.add(normalizePeerChatUserId(a));
    }
    return { memberIds: [...set], access };
  }
  const r = await redisPipeline([["SMEMBERS", VISITORS_SET_KEY]]);
  const raw = Array.isArray(r?.[0]?.result) ? r[0].result : [];
  const set = new Set();
  for (let i = 0; i < raw.length; i++) {
    const id = normalizePeerChatUserId(String(raw[i] || "").trim());
    if (id && (id.startsWith("tg_") || id.startsWith("vk_"))) set.add(id);
  }
  return { memberIds: [...set], access };
}

/** ZSCORE по чанкам: сколько из memberIds сейчас «онлайн» в чате. */
async function countOnlineAmongMemberIds(memberIds, minScore) {
  if (!memberIds.length) return { onlineCount: 0, onlineByIndex: [] };
  const onlineByIndex = new Array(memberIds.length).fill(false);
  let onlineCount = 0;
  for (let off = 0; off < memberIds.length; off += GENERAL_CHAT_ROSTER_SCORE_CHUNK) {
    const slice = memberIds.slice(off, off + GENERAL_CHAT_ROSTER_SCORE_CHUNK);
    const scoreCmds = slice.flatMap((id) => [["ZSCORE", CHAT_ONLINE_KEY, id]]);
    const scoreResults = await redisPipeline(scoreCmds);
    if (!scoreResults || !Array.isArray(scoreResults)) continue;
    for (let j = 0; j < slice.length; j++) {
      const s = scoreResults[j]?.result;
      const ok = s != null && parseFloat(s) >= minScore;
      onlineByIndex[off + j] = ok;
      if (ok) onlineCount++;
    }
  }
  return { onlineCount, onlineByIndex };
}

/** Только числа для mode=contacts (без имён/аватаров). */
async function buildGeneralChatStatsForContacts(myId, admin) {
  const now = Date.now();
  const minScore = now - ONLINE_TTL_MS;
  const { memberIds, access } = await getGeneralChatRosterMemberIds(myId, admin);
  const canList = admin || access === "open" || access === "member";
  if (!canList || memberIds.length === 0) {
    return { generalChatParticipantsCount: 0, generalChatOnlineCount: 0 };
  }
  const cacheSuffix = clubChatApplicationRequired() ? "gated" : "open";
  const cacheKey = `${GENERAL_CHAT_CONTACTS_STATS_CACHE_KEY}:${cacheSuffix}`;
  const cachedRes = await redisPipeline([["GET", cacheKey]]);
  const cachedRaw = cachedRes && cachedRes[0] ? cachedRes[0].result : null;
  if (cachedRaw != null && cachedRaw !== false) {
    try {
      const parsed = JSON.parse(String(cachedRaw));
      const participantsCount = Math.max(0, parseInt(String(parsed?.generalChatParticipantsCount), 10) || 0);
      const onlineCount = Math.max(0, parseInt(String(parsed?.generalChatOnlineCount), 10) || 0);
      if (participantsCount > 0 || onlineCount === 0) {
        return {
          generalChatParticipantsCount: participantsCount,
          generalChatOnlineCount: onlineCount,
        };
      }
    } catch (e) {}
  }
  const { onlineCount } = await countOnlineAmongMemberIds(memberIds, minScore);
  const stats = {
    generalChatParticipantsCount: memberIds.length,
    generalChatOnlineCount: onlineCount,
  };
  await redisPipeline([["SET", cacheKey, JSON.stringify(stats), "EX", String(GENERAL_CHAT_CONTACTS_STATS_TTL_SEC)]]);
  return stats;
}

/**
 * Ревизия общего чата без LRANGE всей ленты — для GET mode=general&poll=1&sinceRev=…
 * (короткий ответ notModified → экономия трафика Redis/API).
 */
async function computeGeneralPollRev(myId, admin, clubChatAccessPre) {
  const access =
    clubChatAccessPre != null ? String(clubChatAccessPre) : String(await getClubChatAccessState(myId, admin));
  if (!admin && !(await hasClubGeneralAccess(myId, admin))) {
    return `gate|${access}`;
  }
  /* Без roster/SMEMBERS/ZSCORE: иначе каждый poll при notModified всё равно делал тысячи обращений к Redis.
   * Счётчики участников/онлайн обновляются при полной загрузке mode=general (не чаще, чем меняется лента/pin). */
  const needPendingBadge = admin && clubChatApplicationRequired();
  const cmds = [
    ["LLEN", GENERAL_KEY],
    ["LINDEX", GENERAL_KEY, "0"],
    ["GET", GENERAL_PINNED_KEY],
  ];
  if (needPendingBadge) cmds.push(["SCARD", CLUB_CHAT_PENDING_KEY]);
  const raw = await redisPipeline(cmds);
  let listResp = raw;
  if (raw && typeof raw === "object" && !Array.isArray(raw) && Array.isArray(raw.result)) {
    listResp = raw.result;
  }
  let llen = 0;
  let headStr = "";
  let pinStr = "";
  let pendingN = 0;
  if (listResp && Array.isArray(listResp)) {
    if (listResp[0] && listResp[0].result != null) llen = Number(listResp[0].result) || 0;
    const h = listResp[1] && listResp[1].result;
    if (h != null) headStr = typeof h === "string" ? h : JSON.stringify(h);
    const p = listResp[2] && listResp[2].result;
    if (p != null) pinStr = String(p);
    if (needPendingBadge && listResp[3]) pendingN = Number(listResp[3].result) || 0;
  }
  let lastId = "";
  let lastTime = "";
  if (headStr) {
    try {
      const o = JSON.parse(headStr);
      if (o && o.id != null && o.id !== "") lastId = String(o.id);
      if (o && o.time != null && o.time !== "") lastTime = String(o.time);
    } catch (e) {
      /* ignore */
    }
  }
  const pinDigest = pinStr.length > 160 ? pinStr.slice(0, 160) + "…" : pinStr;
  return [llen, lastId, lastTime, access, pinDigest, pendingN].join("|");
}

async function bumpThreadPollGen(redisKey) {
  const k = String(redisKey || "").trim();
  if (!k || k === GENERAL_KEY) return;
  await redisPipeline([["HINCRBY", CHAT_THREAD_POLL_GEN_HASH, k, 1]]);
}

async function computeGroupThreadPollRev(redisKey) {
  const cmds = [
    ["LLEN", redisKey],
    ["LINDEX", redisKey, "0"],
    ["HGET", CHAT_THREAD_POLL_GEN_HASH, redisKey],
  ];
  const raw = await redisPipeline(cmds);
  let listResp = raw;
  if (raw && typeof raw === "object" && !Array.isArray(raw) && Array.isArray(raw.result)) {
    listResp = raw.result;
  }
  let llen = 0;
  let headStr = "";
  let gen = "0";
  if (listResp && Array.isArray(listResp)) {
    if (listResp[0] && listResp[0].result != null) llen = Number(listResp[0].result) || 0;
    const h = listResp[1] && listResp[1].result;
    if (h != null) headStr = typeof h === "string" ? h : JSON.stringify(h);
    const g = listResp[2] && listResp[2].result;
    if (g != null && g !== false) gen = String(g);
  }
  let lastId = "";
  let lastTime = "";
  if (headStr) {
    try {
      const o = JSON.parse(headStr);
      if (o && o.id != null && o.id !== "") lastId = String(o.id);
      if (o && o.time != null && o.time !== "") lastTime = String(o.time);
    } catch (e) {
      /* ignore */
    }
  }
  return ["g", llen, lastId, lastTime, gen].join("|");
}

async function computeDmThreadPollRev(redisKey, myId, otherId) {
  const cmds = [
    ["LLEN", redisKey],
    ["LINDEX", redisKey, "0"],
    ["HGET", CHAT_SEEN_CURSOR_KEY, seenCursorField(otherId, myId)],
    ["HGET", CHAT_THREAD_POLL_GEN_HASH, redisKey],
  ];
  const raw = await redisPipeline(cmds);
  let listResp = raw;
  if (raw && typeof raw === "object" && !Array.isArray(raw) && Array.isArray(raw.result)) {
    listResp = raw.result;
  }
  let llen = 0;
  let headStr = "";
  let seenStr = "";
  let gen = "0";
  if (listResp && Array.isArray(listResp)) {
    if (listResp[0] && listResp[0].result != null) llen = Number(listResp[0].result) || 0;
    const h = listResp[1] && listResp[1].result;
    if (h != null) headStr = typeof h === "string" ? h : JSON.stringify(h);
    const sv = listResp[2] && listResp[2].result;
    if (sv != null && sv !== false) seenStr = String(sv).trim();
    const g = listResp[3] && listResp[3].result;
    if (g != null && g !== false) gen = String(g);
  }
  let lastId = "";
  let lastTime = "";
  if (headStr) {
    try {
      const o = JSON.parse(headStr);
      if (o && o.id != null && o.id !== "") lastId = String(o.id);
      if (o && o.time != null && o.time !== "") lastTime = String(o.time);
    } catch (e) {
      /* ignore */
    }
  }
  const seenDig = seenStr.length > 120 ? seenStr.slice(0, 120) + "…" : seenStr;
  /* Без ZSCORE онлайна: иначе rev менялся каждые ~3 с при опросе и notModified почти не срабатывал — полная лента + трафик. Статус «онл» подтянется при полном GET (открытие диалога / редкий контакты). */
  return ["d", llen, lastId, lastTime, seenDig, gen].join("|");
}

/** Полный состав для mode=general (модалка участников). */
async function buildGeneralChatRosterPayload(myId, admin) {
  const now = Date.now();
  const minScore = now - ONLINE_TTL_MS;
  const { memberIds, access } = await getGeneralChatRosterMemberIds(myId, admin);
  const canList = admin || access === "open" || access === "member";
  if (!canList || memberIds.length === 0) {
    return { participantsCount: 0, onlineCount: 0, generalMembers: [] };
  }
  const { onlineCount, onlineByIndex } = await countOnlineAmongMemberIds(memberIds, minScore);
  const viewerAccountId = myId.startsWith("guest_") ? myId : await ensureDtIdForUserId(myId);
  const [dtIdsMap, displayMap, avatarsMap, aliasRes, usernameRes, lastSeenRes] = await Promise.all([
    getDtIds(memberIds),
    getChatDisplayNameMapForIds(memberIds),
    getAvatars(memberIds),
    memberIds.length > 0
      ? redisPipeline([["HMGET", FRIEND_ALIAS_KEY_PREFIX + viewerAccountId, ...memberIds]])
      : Promise.resolve(null),
    memberIds.length > 0 ? redisPipeline([["HMGET", USERNAMES_KEY, ...memberIds]]) : Promise.resolve(null),
    memberIds.length > 0 ? redisPipeline([["HMGET", CHAT_LAST_SEEN_HASH, ...memberIds]]) : Promise.resolve(null),
  ]);
  const aliasRow =
    aliasRes && aliasRes[0] && Array.isArray(aliasRes[0].result) ? aliasRes[0].result : [];
  const usernameRow =
    usernameRes && usernameRes[0] && Array.isArray(usernameRes[0].result) ? usernameRes[0].result : [];
  const lastSeenRowRoster =
    lastSeenRes && lastSeenRes[0] && Array.isArray(lastSeenRes[0].result) ? lastSeenRes[0].result : [];
  const myNorm = normalizeStoredMessageFromId(myId);
  const members = memberIds.map((id, idx) => {
    const rawAl = aliasRow[idx];
    const aliasLabel =
      rawAl != null && rawAl !== false ? sanitizeFriendContactNameForChat(rawAl) : "";
    const tgUserRaw =
      usernameRow[idx] != null && usernameRow[idx] !== false
        ? String(usernameRow[idx]).trim()
        : "";
    const tgDispRaw =
      displayMap[id] != null && String(displayMap[id]).trim() !== ""
        ? String(displayMap[id]).trim()
        : "";
    const baseDisplay =
      normalizeLegacyAccountDisplayLabel((displayMap[id] && String(displayMap[id]).trim()) || "") ||
      (tgUserRaw ? "@" + tgUserRaw : normalizeLegacyAccountDisplayLabel(String(id)));
    const nameOut = (aliasLabel && String(aliasLabel).trim()) || baseDisplay;
    const on = !!onlineByIndex[idx];
    const lastSeenIso = chatLastSeenIsoFromRedisRaw(lastSeenRowRoster[idx]);
    const rowM = {
      id,
      dtId: dtIdsMap[id] || null,
      name: nameOut,
      contactName: aliasLabel || undefined,
      telegramUsername: tgUserRaw || null,
      telegramDisplayName: tgDispRaw || null,
      avatar: avatarsMap[id] || null,
      online: on,
      isYou: normalizeStoredMessageFromId(id) === myNorm,
      admin: isAdmin(id),
    };
    if (!on && lastSeenIso) rowM.lastSeenAt = lastSeenIso;
    return rowM;
  });
  members.sort((a, b) => {
    if (a.online !== b.online) return a.online ? -1 : 1;
    return (a.name || "").localeCompare(b.name || "", "ru");
  });
  return {
    participantsCount: memberIds.length,
    onlineCount,
    generalMembers: members,
  };
}

async function enrichClubUserList(ids, usernamesMap) {
  const list = (Array.isArray(ids) ? ids : []).filter(
    (id) => id && (String(id).startsWith("tg_") || String(id).startsWith("vk_"))
  );
  const out = list.map((id) => ({
    userId: id,
    name: usernamesMap[id] ? "@" + usernamesMap[id] : normalizeLegacyAccountDisplayLabel(id),
  }));
  out.sort((a, b) => (a.name || "").localeCompare(b.name || "", "ru"));
  return out;
}

function seenCursorField(viewerId, peerId) {
  return `${String(viewerId)}|${String(peerId)}`;
}

async function getSeenCursor(viewerId, peerId) {
  const r = await redisPipeline([["HGET", CHAT_SEEN_CURSOR_KEY, seenCursorField(viewerId, peerId)]]);
  if (!r || !r[0] || r[0].result == null) return "";
  return String(r[0].result).trim();
}

async function bumpSeenCursor(viewerId, peerId, latestIso) {
  if (!latestIso || String(latestIso).trim() === "") return;
  const cur = await getSeenCursor(viewerId, peerId);
  const curMs = chatMessageTimeMs(cur);
  const newMs = chatMessageTimeMs(latestIso);
  if (Number.isNaN(newMs)) return;
  let out = String(latestIso).trim();
  if (!Number.isNaN(curMs) && curMs > newMs) out = cur;
  await redisPipeline([
    ["HSET", CHAT_SEEN_CURSOR_KEY, seenCursorField(viewerId, peerId), out],
    ["HDEL", unreadHashKey(viewerId), String(peerId)],
  ]);
}

async function getGeneralLastSeen(userId) {
  const r = await redisPipeline([["HGET", CHAT_GENERAL_SEEN_HASH, String(userId)]]);
  if (!r || !r[0] || r[0].result == null) return "";
  return String(r[0].result).trim();
}

async function bumpGeneralLastSeen(userId, latestIso) {
  if (!latestIso || String(latestIso).trim() === "") return;
  const cur = await getGeneralLastSeen(userId);
  const curMs = chatMessageTimeMs(cur);
  const newMs = chatMessageTimeMs(latestIso);
  if (Number.isNaN(newMs)) return;
  let out = String(latestIso).trim();
  if (!Number.isNaN(curMs) && curMs > newMs) out = cur;
  await redisPipeline([
    ["HSET", CHAT_GENERAL_SEEN_HASH, String(userId), out],
    ["HDEL", CHAT_GENERAL_UNREAD_HASH, String(userId)],
  ]);
}

function applyPeerReadReceiptsToMyMessages(messages, myId, peerCursorIso) {
  const peerMs = chatMessageTimeMs(peerCursorIso);
  if (Number.isNaN(peerMs)) return;
  const myNorm = normalizeStoredMessageFromId(myId);
  for (let i = 0; i < messages.length; i++) {
    const m = messages[i];
    if (!m) continue;
    const fromN = m.from != null ? normalizeStoredMessageFromId(m.from) : "";
    if (fromN !== myNorm) continue;
    const t = chatMessageTimeMs(m.time);
    if (Number.isNaN(t)) continue;
    if (t <= peerMs) m.peerHasRead = true;
  }
}

/** Telegram @username без префикса @, как в HGET visitor_usernames. */
async function getVisitorUsername(tgUserId) {
  if (!tgUserId || typeof tgUserId !== "string") return null;
  const r = await redisPipeline([["HGET", USERNAMES_KEY, tgUserId]]);
  const v = r && r[0] && r[0].result != null ? String(r[0].result).trim() : "";
  return v || null;
}

/** Подпись отправителя: имя важнее Telegram-логина; @username показываем только если имени нет. */
function buildChatDisplayName(identity, redisUsernameRaw) {
  const idObj = identity && typeof identity === "object" ? identity : {};
  const first = (idObj.firstName || "").trim();
  const last = (idObj.lastName || "").trim();
  const nameParts = [first, last].filter(Boolean).join(" ").trim();
  const tgUn = (idObj.telegramUsername || "").replace(/^@+/, "").trim();
  const pwaUn = (idObj.pwaUsername || "").replace(/^@+/, "").trim();
  const rNick = (redisUsernameRaw || "").replace(/^@+/, "").trim();
  const nick = tgUn || pwaUn || rNick;
  const nickDisplay = nick ? "@" + nick : "";
  if (nameParts) return nameParts;
  if (nickDisplay) return nickDisplay;
  return "Игрок";
}

async function getDtIds(userIds) {
  if (!userIds || userIds.length === 0) return {};
  const cmds = userIds.map((id) => ["HGET", DT_IDS_KEY, id]);
  const res = await redisPipeline(cmds);
  const out = {};
  if (res && Array.isArray(res)) {
    userIds.forEach((id, i) => {
      const v = res[i] && res[i].result ? String(res[i].result).trim() : null;
      if (v) out[id] = v;
    });
  }
  return out;
}

function sanitizeAvatarAccountId(id) {
  return String(id || "").replace(/[^a-zA-Z0-9_-]/g, "_");
}

function resolveChatAvatarValue(value) {
  const data = value && typeof value === "string" ? value.trim() : "";
  if (!data) return "";
  if (data.startsWith("data:")) return data;
  if (data.startsWith("preset:")) {
    return PRESET_AVATAR_SRC_BY_ID[data.slice("preset:".length)] || "";
  }
  return "";
}

function presetAvatarIdForAccountId(accountId) {
  const s = String(accountId || "");
  let hash = 0;
  for (let i = 0; i < s.length; i += 1) {
    hash = (hash * 31 + s.charCodeAt(i)) >>> 0;
  }
  return PRESET_AVATAR_IDS[hash % PRESET_AVATAR_IDS.length] || PRESET_AVATAR_IDS[0];
}

async function getAvatars(userIds) {
  if (!userIds || userIds.length === 0) return {};
  const dtIds = await getDtIds(userIds);
  const lookups = [];
  const cmds = [];
  userIds.forEach((id) => {
    const accountId = dtIds[id] || id;
    const accountKey = AVATAR_PREFIX + sanitizeAvatarAccountId(accountId);
    const legacyKey = AVATAR_PREFIX + sanitizeAvatarAccountId(id);
    const hasLegacyFallback = legacyKey !== accountKey;
    lookups.push({ id, accountId, accountKey, hasLegacyFallback });
    cmds.push(["GET", accountKey]);
    if (hasLegacyFallback) cmds.push(["GET", legacyKey]);
  });
  const res = await redisPipeline(cmds);
  const out = {};
  const missingPresetWrites = [];
  if (res && Array.isArray(res)) {
    let resIndex = 0;
    lookups.forEach((lookup) => {
      const primary = res[resIndex] && res[resIndex].result;
      resIndex += 1;
      const legacy = lookup.hasLegacyFallback && res[resIndex] ? res[resIndex].result : "";
      if (lookup.hasLegacyFallback) resIndex += 1;
      const avatar = resolveChatAvatarValue(primary) || resolveChatAvatarValue(legacy);
      if (avatar) {
        out[lookup.id] = avatar;
        return;
      }
      const presetId = presetAvatarIdForAccountId(lookup.accountId);
      const presetSrc = PRESET_AVATAR_SRC_BY_ID[presetId];
      if (!presetSrc) return;
      out[lookup.id] = presetSrc;
      missingPresetWrites.push(["SET", lookup.accountKey, "preset:" + presetId]);
    });
  }
  if (missingPresetWrites.length) {
    await redisPipeline(missingPresetWrites);
  }
  return out;
}

async function getP21Ids(userIds) {
  if (!userIds || userIds.length === 0) return {};
  const dtIds = await getDtIds(userIds);
  const cmds = userIds.map((id) => ["HGET", POKERPLUS_BIND_HASH_KEY, dtIds[id] || id]);
  const res = await redisPipeline(cmds);
  const out = {};
  if (res && Array.isArray(res)) {
    userIds.forEach((id, i) => {
      const v = res[i] && res[i].result ? String(res[i].result).trim() : null;
      if (v) out[id] = v;
    });
  }
  return out;
}

async function getPokerPlusVerifiedIds(userIds) {
  if (!userIds || userIds.length === 0) return {};
  const dtIds = await getDtIds(userIds);
  const cmds = userIds.map((id) => ["HGET", POKERPLUS_BIND_HASH_KEY, dtIds[id] || id]);
  const res = await redisPipeline(cmds);
  const out = {};
  if (res && Array.isArray(res)) {
    userIds.forEach((id, i) => {
      const raw = res[i] ? res[i].result : null;
      const v = raw != null && raw !== false ? String(raw).trim() : "";
      if (v) out[id] = true;
    });
  }
  return out;
}

async function getPokerProfileStatusMeta(userIds, dtIdsKnown) {
  if (!userIds || userIds.length === 0) return {};
  const ids = [...new Set(userIds.filter(Boolean))];
  const canonicalIds = ids.map((id) => normalizePeerChatUserId(id));
  const lookupIds = [...new Set(ids.concat(canonicalIds).filter(Boolean))];
  const knownDtIds = dtIdsKnown && typeof dtIdsKnown === "object" ? dtIdsKnown : {};
  const missingDtLookupIds = lookupIds.filter((id) => !knownDtIds[id]);
  const fetchedDtIds = missingDtLookupIds.length ? await getDtIds(missingDtLookupIds) : {};
  const dtIds = Object.assign({}, fetchedDtIds, knownDtIds);
  const lookupGroups = ids.map((id, idx) => {
    const canonicalId = canonicalIds[idx];
    return [...new Set([dtIds[id], dtIds[canonicalId], id, canonicalId].filter(Boolean))];
  });
  const cmds = lookupGroups.flatMap((keys) => keys.map((key) => ["HGET", PROFILE_HASH_KEY, key]));
  const res = await redisPipeline(cmds);
  const out = {};
  if (res && Array.isArray(res)) {
    let resIndex = 0;
    ids.forEach((id, i) => {
      const keys = lookupGroups[i];
      let raw = "";
      for (let ki = 0; ki < keys.length; ki += 1) {
        const row = res[resIndex++];
        if (!raw && row && row.result != null) raw = String(row.result);
      }
      if (!raw) return;
      let profile = null;
      try {
        profile = JSON.parse(raw);
      } catch (eParseProfile) {
        profile = null;
      }
      const fee = pokerProfileFeeFromCachedProfile(profile);
      if (fee == null) return;
      out[id] = pokerProfileStatusFromRakeServer(fee);
    });
  }
  return out;
}

async function getRespectScores(userIds) {
  if (!userIds || userIds.length === 0) return {};
  const dtIds = await getDtIds(userIds);
  const cmds = userIds.map((id) => ["HGET", RESPECT_SCORE_KEY, dtIds[id] || id]);
  const res = await redisPipeline(cmds);
  const out = {};
  if (res && Array.isArray(res)) {
    userIds.forEach((id, i) => {
      const v = res[i] && res[i].result != null ? res[i].result : null;
      const num = v !== null && v !== undefined ? parseInt(String(v), 10) : 0;
      out[id] = Number.isNaN(num) ? 0 : num;
    });
  }
  return out;
}

/** @param {{ text: string, url: string }} [inlineButton] — url должен начинаться с http */
async function sendTelegram(toChatId, text, inlineButton) {
  return sendTelegramBase(BOT_TOKEN, toChatId, text, inlineButton);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, Math.max(0, Number(ms) || 0)));
}

function buildChatTrace(meta) {
  const m = meta && typeof meta === "object" ? meta : {};
  return {
    serverTs: new Date().toISOString(),
    serverNowMs: Date.now(),
    mode: m.mode || "",
    waited: !!m.waited,
  };
}

async function waitForPollRevChange(getRev, initialRev, timeoutMs, stepMs) {
  const initial = initialRev != null ? String(initialRev) : "";
  const timeoutAt = Date.now() + Math.max(0, Number(timeoutMs) || 0);
  const step = Math.max(150, Number(stepMs) || 400);
  let current = initial;
  while (Date.now() < timeoutAt) {
    await delay(step);
    current = await getRev();
    if (String(current || "") !== initial) return { changed: true, pollRev: current };
  }
  return { changed: false, pollRev: current };
}

/** Уведомление админам в личку Telegram о новой заявке в главный чат. */
async function notifyAdminsNewClubChatApplication(applicantMyId, applicantNumericId, identity) {
  return notifyAdminsNewClubChatApplicationBase({
    adminIds: ADMIN_IDS,
    applicantMyId,
    applicantNumericId,
    botToken: BOT_TOKEN,
    buildChatDisplayName,
    getVisitorChatDisplayName,
    getVisitorUsername,
    identity,
    miniAppUrl: MINI_APP_URL,
  });
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET" && req.method !== "POST" && req.method !== "DELETE" && req.method !== "PATCH") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }
  if (req.method !== "GET") {
    if (rejectIfPayloadTooLarge(req, res, 1_500_000)) return;
    if (rateLimit(req, res, { bucket: "chat_write", limit: 80, windowMs: 60_000 })) return;
  }

  if (!redisConfigured()) {
    return res.status(500).json({ ok: false, error: "Redis not configured" });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch (e) {
    body = {};
  }

  const identity = resolveTelegramIdentity(req, body, BOT_TOKEN);
  if (!identity) return res.status(401).json({ ok: false, error: "Откройте в Telegram или войдите через сайт" });

  const myId = memberIdFromIdentity(identity);
  if (!myId) return res.status(401).json({ ok: false, error: "Не удалось определить пользователя" });
  const admin = isAdmin(myId) || isApiAdminIdentity(identity, myId);

  // DELETE: админ удаляет любое сообщение; пользователь — только своё
  if (req.method === "DELETE") {
    const messageIdRaw = body.messageId || body.message_id || req.query.messageId;
    const messageId = messageIdRaw != null && messageIdRaw !== "" ? String(messageIdRaw).trim() : "";
    const withId = body.with || body.conversationWith || req.query.with;
    if (!messageId) return res.status(400).json({ ok: false, error: "messageId обязателен" });

    let redisKey = GENERAL_KEY;
    if (withId) {
      const w = String(withId).trim();
      if (isGroupChatId(w)) {
        const gMeta = await getGroupMeta(w);
        if (!gMeta || !groupMetaHasMember(gMeta, myId)) {
          return res.status(403).json({ ok: false, error: "Нет доступа к группе" });
        }
        redisKey = groupMsgsKey(w);
      } else {
        redisKey = convKey(myId, normalizePeerChatUserId(withId));
      }
    }
    if (redisKey === GENERAL_KEY && !(await hasClubGeneralAccess(myId, admin))) {
      return res.status(403).json({ ok: false, error: "Нет доступа к общему чату" });
    }
    const located = await locateThreadMessageById(redisKey, messageId);
    const toRemove = located && located.found ? located.raw : null;
    const msgFrom = located && located.found && located.message ? located.message.from : null;
    if (!toRemove) return res.status(404).json({ ok: false, error: "Сообщение не найдено" });
    if (!admin && normalizeStoredMessageFromId(msgFrom) !== normalizeStoredMessageFromId(myId)) {
      return res.status(403).json({ ok: false, error: "Можно удалить только своё сообщение" });
    }

    const results2 = await redisPipeline([["LREM", redisKey, "0", toRemove]]);
    if (!results2 || results2[0]?.error) return res.status(500).json({ ok: false, error: "Ошибка удаления" });
    await deleteThreadMessageIndex(redisKey, messageId);
    await bumpThreadPollGen(redisKey);
    if (redisKey === GENERAL_KEY) {
      try {
        const pinRes = await redisPipeline([["GET", GENERAL_PINNED_KEY]]);
        const pr = pinRes && pinRes[0] && pinRes[0].result != null ? pinRes[0].result : null;
        if (pr && typeof pr === "string") {
          try {
            const p = JSON.parse(pr);
            if (p && String(p.id) === String(messageId)) {
              await redisPipeline([["DEL", GENERAL_PINNED_KEY]]);
            }
          } catch (ePin) {}
        }
      } catch (eUnpinDel) {}
    }
    return res.status(200).json({ ok: true, deleted: true });
  }

  // PATCH: блокировка админом или редактирование своего сообщения
  if (req.method === "PATCH") {
    const action = body.action || req.query.action;

    if (action === "edit") {
      const messageIdRaw = body.messageId || body.message_id || req.query.messageId;
      const messageId = messageIdRaw != null && messageIdRaw !== "" ? String(messageIdRaw).trim() : "";
      const newText = (body.text || body.message || "").trim();
      const withId = body.with || body.conversationWith || req.query.with;
      if (!messageId) return res.status(400).json({ ok: false, error: "messageId обязателен" });
      if (!newText || newText.length > CHAT_MESSAGE_TEXT_MAX) {
        return res.status(400).json({ ok: false, error: "Текст от 1 до " + CHAT_MESSAGE_TEXT_MAX + " символов" });
      }
      let redisKey = GENERAL_KEY;
      if (withId) {
        const w = String(withId).trim();
        if (isGroupChatId(w)) {
          const gMeta = await getGroupMeta(w);
          if (!gMeta || !groupMetaHasMember(gMeta, myId)) {
            return res.status(403).json({ ok: false, error: "Нет доступа к группе" });
          }
          redisKey = groupMsgsKey(w);
        } else {
          redisKey = convKey(myId, normalizePeerChatUserId(withId));
        }
      }
      if (redisKey === GENERAL_KEY && !(await hasClubGeneralAccess(myId, admin))) {
        return res.status(403).json({ ok: false, error: "Нет доступа к общему чату" });
      }
      const located = await locateThreadMessageById(redisKey, messageId);
      let idx = located && located.found ? located.index : -1;
      let msgObj = located && located.found ? located.message : null;
      if (msgObj && normalizeStoredMessageFromId(msgObj.from) !== normalizeStoredMessageFromId(myId)) {
        return res.status(403).json({ ok: false, error: "Можно редактировать только свои сообщения" });
      }
      if (idx < 0 || !msgObj) return res.status(404).json({ ok: false, error: "Сообщение не найдено" });
      msgObj.text = newText;
      msgObj.edited = true;
      msgObj.editedAt = new Date().toISOString();
      const newStr = JSON.stringify(msgObj);
      const resSet = await redisPipeline([["LSET", redisKey, String(idx), newStr]]);
      if (!resSet || resSet[0]?.error) return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
      await writeThreadMessageIndex(redisKey, msgObj, newStr);
      await bumpThreadPollGen(redisKey);
      return res.status(200).json({ ok: true, message: msgObj });
    }

    if (action === "block" || action === "unblock") {
      const targetId = (body.userId || body.targetId || req.query.userId || "").toString().trim();
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      if (!targetId || (!targetId.startsWith("tg_") && !targetId.startsWith("vk_"))) {
        return res.status(400).json({ ok: false, error: "userId обязателен (tg_… или vk_…)" });
      }
      const cmd = action === "block" ? ["SADD", BLOCKED_KEY, targetId] : ["SREM", BLOCKED_KEY, targetId];
      const resBlock = await redisPipeline([cmd]);
      if (!resBlock || resBlock[0]?.error) return res.status(500).json({ ok: false, error: "Ошибка операции" });
      return res.status(200).json({ ok: true, blocked: action === "block" });
    }

    if (action === "clubChatApply") {
      if (!clubChatApplicationRequired()) {
        const stOpen = await getClubChatAccessState(myId, false);
        if (stOpen === "revoked") {
          return res.status(200).json({ ok: true, clubChatAccess: "revoked" });
        }
        return res.status(200).json({ ok: true, clubChatAccess: "open" });
      }
      if (admin) return res.status(200).json({ ok: true, clubChatAccess: "member" });
      const st = await getClubChatAccessState(myId, false);
      if (st === "member" || st === "open") return res.status(200).json({ ok: true, clubChatAccess: st });
      if (st === "pending") return res.status(200).json({ ok: true, alreadyPending: true, clubChatAccess: "pending" });
      const r = await redisPipeline([["SADD", CLUB_CHAT_PENDING_KEY, myId]]);
      if (!r || r[0]?.error) return res.status(500).json({ ok: false, error: "Ошибка сохранения заявки" });
      const added = Number(r[0]?.result) === 1;
      if (added) {
        try {
          await notifyAdminsNewClubChatApplication(myId, identity.id, identity);
        } catch (e) {
          /* уведомление не блокирует заявку */
        }
      }
      return res.status(200).json({ ok: true, clubChatAccess: "pending" });
    }

    if (action === "clubChatApprove" || action === "clubChatReject" || action === "clubChatRevoke") {
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      const targetId = (body.userId || body.targetId || req.query.userId || "").toString().trim();
      if (!targetId || (!targetId.startsWith("tg_") && !targetId.startsWith("vk_"))) {
        return res.status(400).json({ ok: false, error: "Нужен userId вида tg_… или vk_…" });
      }
      if (isAdmin(targetId)) return res.status(400).json({ ok: false, error: "Нельзя изменить доступ администратора" });
      if (action === "clubChatApprove") {
        const admittedAt = new Date().toISOString();
        const r = await redisPipeline([
          ["SREM", CLUB_CHAT_PENDING_KEY, targetId],
          ["SADD", CLUB_CHAT_MEMBERS_KEY, targetId],
          ["HSET", CLUB_CHAT_MEMBER_JOINED_AT_KEY, targetId, admittedAt],
        ]);
        if (!r || r.some((x) => x && x.error)) return res.status(500).json({ ok: false, error: "Ошибка Redis" });
        return res.status(200).json({ ok: true });
      }
      if (action === "clubChatReject") {
        const r = await redisPipeline([["SREM", CLUB_CHAT_PENDING_KEY, targetId]]);
        if (!r || r[0]?.error) return res.status(500).json({ ok: false, error: "Ошибка Redis" });
        return res.status(200).json({ ok: true });
      }
      if (clubChatApplicationRequired()) {
        const r = await redisPipeline([
          ["SREM", CLUB_CHAT_MEMBERS_KEY, targetId],
          ["SREM", CLUB_CHAT_PENDING_KEY, targetId],
          ["HDEL", CLUB_CHAT_MEMBER_JOINED_AT_KEY, targetId],
        ]);
        if (!r || r.some((x) => x && x.error)) return res.status(500).json({ ok: false, error: "Ошибка Redis" });
      } else {
        const r = await redisPipeline([
          ["SADD", GENERAL_CHAT_ACCESS_REVOKED_KEY, targetId],
          ["SREM", VISITORS_SET_KEY, targetId],
        ]);
        if (!r || r.some((x) => x && x.error)) return res.status(500).json({ ok: false, error: "Ошибка Redis" });
      }
      return res.status(200).json({ ok: true });
    }

    if (action === "generalPin") {
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      const withId = body.with || body.conversationWith || req.query.with;
      if (withId) return res.status(400).json({ ok: false, error: "Только для общего чата" });
      if (!(await hasClubGeneralAccess(myId, admin))) {
        return res.status(403).json({ ok: false, error: "Нет доступа к общему чату" });
      }
      const messageId = body.messageId || body.message_id || req.query.messageId;
      if (!messageId) return res.status(400).json({ ok: false, error: "messageId обязателен" });
      const found = await findMessageByIdTailFirst(GENERAL_KEY, messageId, 120);
      if (!found) return res.status(404).json({ ok: false, error: "Сообщение не найдено" });
      const snapshot = buildGeneralPinnedSnapshot(found, myId);
      if (!snapshot) return res.status(500).json({ ok: false, error: "Не удалось сохранить закрепление" });
      const resPin = await redisPipeline([["SET", GENERAL_PINNED_KEY, JSON.stringify(snapshot)]]);
      if (!resPin || resPin[0]?.error) return res.status(500).json({ ok: false, error: "Ошибка Redis" });
      return res.status(200).json({ ok: true, generalPinned: snapshot });
    }

    if (action === "generalUnpin") {
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      const withId = body.with || body.conversationWith || req.query.with;
      if (withId) return res.status(400).json({ ok: false, error: "Только для общего чата" });
      await redisPipeline([["DEL", GENERAL_PINNED_KEY]]);
      return res.status(200).json({ ok: true });
    }

    if (action === "reaction") {
      const messageIdRaw = body.messageId || body.message_id || req.query.messageId;
      const messageId = messageIdRaw != null && messageIdRaw !== "" ? String(messageIdRaw).trim() : "";
      const emoji = (body.emoji || req.query.emoji || "").toString().trim();
      const withId = body.with || body.conversationWith || req.query.with;
      if (!messageId) return res.status(400).json({ ok: false, error: "messageId обязателен" });
      if (!CHAT_REACTION_EMOJI_ALLOWED.includes(emoji)) return res.status(400).json({ ok: false, error: "Недопустимая реакция" });
      let redisKeyReact = GENERAL_KEY;
      if (withId) {
        const wR = String(withId).trim();
        if (isGroupChatId(wR)) {
          const gMetaR = await getGroupMeta(wR);
          if (!gMetaR || !groupMetaHasMember(gMetaR, myId)) {
            return res.status(403).json({ ok: false, error: "Нет доступа к группе" });
          }
          redisKeyReact = groupMsgsKey(wR);
        } else {
          redisKeyReact = convKey(myId, normalizePeerChatUserId(withId));
        }
      }
      if (redisKeyReact === GENERAL_KEY && !(await hasClubGeneralAccess(myId, admin))) {
        return res.status(403).json({ ok: false, error: "Нет доступа к общему чату" });
      }
      const located = await locateThreadMessageById(redisKeyReact, messageId);
      let idx = located && located.found ? located.index : -1;
      let msgObj = located && located.found ? located.message : null;
      if (idx < 0 || !msgObj) return res.status(404).json({ ok: false, error: "Сообщение не найдено" });
      if (!msgObj.reactions || typeof msgObj.reactions !== "object") msgObj.reactions = {};
      if (!Array.isArray(msgObj.reactions[emoji])) msgObj.reactions[emoji] = [];
      const arr = msgObj.reactions[emoji];
      const myIdx = arr.indexOf(myId);
      if (myIdx >= 0) {
        arr.splice(myIdx, 1);
        if (arr.length === 0) delete msgObj.reactions[emoji];
      } else {
        arr.push(myId);
      }
      const newStr = JSON.stringify(msgObj);
      const resSet = await redisPipeline([["LSET", redisKeyReact, String(idx), newStr]]);
      if (!resSet || resSet[0]?.error) return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
      await writeThreadMessageIndex(redisKeyReact, msgObj, newStr);
      await bumpThreadPollGen(redisKeyReact);
      return res.status(200).json({ ok: true, message: msgObj });
    }

    if (action === "typing") {
      const withId = body.with || body.conversationWith || req.query.with;
      const activeTyping = !(body.active === false || body.active === 0 || body.active === "0" || body.active === "false");
      const targetId = withId != null ? String(withId).trim() : "";
      if (!targetId || isGroupChatId(targetId) || targetId === myId) {
        return res.status(200).json({ ok: true, typing: false });
      }
      const otherId = normalizePeerChatUserId(targetId);
      const typingKey = chatTypingKey(otherId, myId);
      const cmds = activeTyping
        ? [["SET", typingKey, "1", "EX", String(CHAT_TYPING_TTL_SEC)]]
        : [["DEL", typingKey]];
      await redisPipeline(cmds);
      return res.status(200).json({ ok: true, typing: !!activeTyping });
    }

    return res.status(400).json({
      ok: false,
      error:
        "action: edit, block, unblock, reaction, typing, generalPin, generalUnpin, clubChatApply, clubChatApprove, clubChatReject, clubChatRevoke",
    });
  }

  // GET
  if (req.method === "GET") {
    const withId = req.query.with || req.query.other;
    const mode = req.query.mode || body.mode;
    const afterIdRaw = req.query.afterId != null ? String(req.query.afterId).trim() : "";
    const afterTimeRaw = req.query.afterTime != null ? String(req.query.afterTime).trim() : "";
    const beforeIdRaw = req.query.beforeId != null ? String(req.query.beforeId).trim() : "";
    const beforeTimeRaw = req.query.beforeTime != null ? String(req.query.beforeTime).trim() : "";
    const waitForChange = req.query.wait === "1" || req.query.wait === "true";
    const waitTimeoutMs = Math.min(20000, Math.max(1000, parseInt(String(req.query.waitTimeoutMs || "18000"), 10) || 18000));
    const fastOpenThread = req.query.fastOpen === "1" || req.query.fastOpen === "true";

    if (withId) {
      const rawWith = String(withId).trim();
      if (isGroupChatId(rawWith)) {
        const groupId = rawWith;
        const meta = await getGroupMeta(groupId);
        if (!meta || !groupMetaHasMember(meta, myId)) {
          return res.status(403).json({ ok: false, error: "Нет доступа к этой группе" });
        }
        const metaOnly = readGroupMetaOnlyFlag(req);
        if (metaOnly) {
          const nowM = Date.now();
          const minScoreM = nowM - ONLINE_TTL_MS;
          const touchM = touchChatLastSeenCmd(myId, nowM);
          await redisPipeline([
            ["ZADD", CHAT_ONLINE_KEY, String(nowM), myId],
            ["ZREMRANGEBYSCORE", CHAT_ONLINE_KEY, "-inf", String(minScoreM)],
            ...(touchM ? [touchM] : []),
          ]);
          const membersList = await buildGroupMembersPublicList(
            myId,
            meta.members,
            minScoreM,
            meta.createdBy,
          );
          const groupTitleMeta = meta.title != null ? String(meta.title).trim() : "Группа";
          const groupDescMeta = sanitizeGroupDescription(meta.description != null ? String(meta.description) : "");
          const groupAvatarMeta =
            meta.avatar && typeof meta.avatar === "string" && meta.avatar.startsWith("data:") ? meta.avatar : null;
          const creatorNorm =
            meta.createdBy != null && String(meta.createdBy).trim() !== ""
              ? normalizeStoredMessageFromId(String(meta.createdBy).trim())
              : "";
          const myNormCr = normalizeStoredMessageFromId(myId);
          const iAmCreator = !!(creatorNorm && creatorNorm === myNormCr);
          const iCanManageGroupMeta = !!admin;
          const iCanChangeGroupAvatar = !!(admin || iAmCreator);
          return res.status(200).json({
            ok: true,
            groupMetaOnly: true,
            group: {
              id: groupId,
              title: groupTitleMeta,
              description: groupDescMeta,
              avatar: groupAvatarMeta,
              createdBy: meta.createdBy != null ? String(meta.createdBy) : null,
              createdAt: meta.createdAt != null ? String(meta.createdAt) : null,
              memberCount: meta.members.length,
              members: membersList,
              iAmCreator,
              iCanManageGroupMeta,
              iCanChangeGroupAvatar,
            },
          });
        }
        const gKeyPoll = groupMsgsKey(groupId);
        const wantPollGr = String(req.query.poll || "") === "1";
        const sinceRevGr = String(req.query.sinceRev || "").trim();
        let groupPollRevPre = null;
        if (wantPollGr) {
          groupPollRevPre = await computeGroupThreadPollRev(gKeyPoll);
          if (sinceRevGr && groupPollRevPre && sinceRevGr === groupPollRevPre) {
            if (waitForChange) {
              const waitResGroup = await waitForPollRevChange(
                () => computeGroupThreadPollRev(gKeyPoll),
                groupPollRevPre,
                waitTimeoutMs,
                400
              );
              if (!waitResGroup.changed) {
                return res.status(200).json({ ok: true, notModified: true, pollRev: waitResGroup.pollRev || groupPollRevPre, waited: true, trace: buildChatTrace({ mode: "group", waited: true }) });
              }
              groupPollRevPre = waitResGroup.pollRev || groupPollRevPre;
            } else {
              return res.status(200).json({ ok: true, notModified: true, pollRev: groupPollRevPre });
            }
          }
        }
        const members = meta.members;
        const skipPresenceG = req.query.skipPresence === "1" || req.query.skipPresence === "true";
        const nowG = Date.now();
        const minScoreG = nowG - ONLINE_TTL_MS;
        const touchG = touchChatLastSeenCmd(myId, nowG);
        const wantsOlderGroup = !!(beforeIdRaw || beforeTimeRaw);
        const canTryFastTailGroup = !wantsOlderGroup && !!(afterIdRaw || afterTimeRaw);
        const fastTailGroup = canTryFastTailGroup
          ? await tryBuildFastTailResponse(groupMsgsKey(groupId), afterIdRaw, afterTimeRaw, MAX_MESSAGES)
          : null;
        const needsFullGroupRange = wantsOlderGroup || (canTryFastTailGroup && !fastTailGroup);
        const pipelineG = [
          ["LRANGE", groupMsgsKey(groupId), "0", needsFullGroupRange ? "-1" : String(MAX_MESSAGES - 1)],
          ["ZADD", CHAT_ONLINE_KEY, String(nowG), myId],
          ["ZREMRANGEBYSCORE", CHAT_ONLINE_KEY, "-inf", String(minScoreG)],
          ...(touchG ? [touchG] : []),
          ["LLEN", groupMsgsKey(groupId)],
        ];
        const resultsG = await redisPipeline(pipelineG);
        let listRespG = resultsG;
        if (resultsG && typeof resultsG === "object" && !Array.isArray(resultsG) && Array.isArray(resultsG.result)) {
          listRespG = resultsG.result;
        }
        let rawG = [];
        if (listRespG && Array.isArray(listRespG)) {
          const firstG = listRespG[0];
          if (firstG && firstG.error) {
            return res.status(500).json({ ok: false, error: "Ошибка загрузки сообщений" });
          }
          rawG = Array.isArray(firstG?.result)
            ? firstG.result
            : typeof firstG?.result === "string"
              ? [firstG.result]
              : [];
        }
        const messagesG = (Array.isArray(rawG) ? rawG : [])
          .map((s) => {
            try {
              return typeof s === "string" ? JSON.parse(s) : null;
            } catch (e) {
              return null;
            }
          })
          .filter(Boolean)
          .reverse();
        const seenG = new Set();
        const dedupedG = messagesG.filter((m) => {
          if (m && m.from != null && m.from !== "") m.from = normalizeStoredMessageFromId(m.from);
          const k =
            m.id !== null && m.id !== undefined && m.id !== ""
              ? String(m.id)
              : m.from + "|" + (m.time || "") + "|" + (m.text || "");
          if (seenG.has(k)) return false;
          seenG.add(k);
          return true;
        });
        const fromIdsG = [...new Set(dedupedG.map((m) => m.from).filter(Boolean))];
        if (!fastOpenThread) {
          const [dtIdsMapG, avatarsMapG, p21IdsMapG, verifiedIdsMapG, respectScoresG, statusMetaG] = await Promise.all([
            getDtIds(fromIdsG),
            getAvatars(fromIdsG),
            getP21Ids(fromIdsG),
            getPokerPlusVerifiedIds(fromIdsG),
            getRespectScores(fromIdsG),
            getPokerProfileStatusMeta(fromIdsG),
          ]);
          dedupedG.forEach((m) => {
            if (m.from) {
              if (dtIdsMapG[m.from]) m.fromDtId = dtIdsMapG[m.from];
              if (avatarsMapG[m.from]) m.fromAvatar = avatarsMapG[m.from];
              if (p21IdsMapG[m.from]) m.fromP21Id = p21IdsMapG[m.from];
              m.fromPokerPlusVerified = !!verifiedIdsMapG[m.from];
              m.fromRespect = respectScoresG[m.from] != null ? respectScoresG[m.from] : 0;
              if (statusMetaG[m.from]) {
                m.fromStatusLevel = statusMetaG[m.from].level;
                m.fromStatusValue = statusMetaG[m.from].valuePercent;
              } else if (m.fromPokerPlusVerified) {
                m.fromStatusLevel = 1;
                m.fromStatusValue = 0;
              }
              m.fromAdmin = isAdmin(m.from);
            }
          });
        } else {
          dedupedG.forEach((m) => {
            if (m && m.from) m.fromAdmin = isAdmin(m.from);
          });
        }
        const latestInGroup = dedupedG.length ? dedupedG[dedupedG.length - 1].time : null;
        const trackSeenG = req.query.trackSeen !== "0" && req.query.trackSeen !== "false";
        if (trackSeenG && latestInGroup) await bumpSeenCursor(myId, groupId, latestInGroup);
        if (!fastOpenThread) {
          const idsAliasG = collectMessageFromIdsForAlias(dedupedG);
          const displayMapG = await getChatDisplayNameMapForIds(idsAliasG);
          applyPeerChatDisplayNamesToMessages(dedupedG, displayMapG);
          const aliasMapG = await getFriendAliasMapForViewer(myId, idsAliasG);
          applyViewerFriendAliasesToMessages(dedupedG, aliasMapG);
        }
        let onlineCountG = 0;
        if (!skipPresenceG) {
          const scoreCmdsG = members.flatMap((id) => [["ZSCORE", CHAT_ONLINE_KEY, id]]);
          const scoreResultsG = await redisPipeline(scoreCmdsG);
          if (scoreResultsG && Array.isArray(scoreResultsG)) {
            members.forEach((id, i) => {
              const sc = scoreResultsG[i]?.result;
              if (sc != null && parseFloat(sc) >= minScoreG) onlineCountG++;
            });
          }
        }
        const totalMessagesG =
          listRespG && listRespG[(touchG ? 3 : 2)] && listRespG[(touchG ? 3 : 2)].result != null
            ? Math.max(0, parseInt(String(listRespG[(touchG ? 3 : 2)].result), 10) || 0)
            : dedupedG.length;
        const groupTitleOut = meta.title != null ? String(meta.title).trim() : "Группа";
        const groupDescriptionOut = sanitizeGroupDescription(meta.description != null ? String(meta.description) : "");
        const groupAvatarOut =
          meta.avatar && typeof meta.avatar === "string" && meta.avatar.startsWith("data:") ? meta.avatar : null;
        const creatorNormMsgs =
          meta.createdBy != null && String(meta.createdBy).trim() !== ""
            ? normalizeStoredMessageFromId(String(meta.createdBy).trim())
            : "";
        const iAmCreatorMsgs = !!(
          creatorNormMsgs && creatorNormMsgs === normalizeStoredMessageFromId(myId)
        );
        const iCanChangeGroupAvatarMsgs = !!(admin || iAmCreatorMsgs);
        if (!groupPollRevPre) groupPollRevPre = await computeGroupThreadPollRev(gKeyPoll);
        let outMessagesG = fastTailGroup ? fastTailGroup.messages : filterMessagesAfterCursor(dedupedG, afterIdRaw, afterTimeRaw);
        let hasMoreBeforeG = totalMessagesG > dedupedG.length ? true : totalMessagesG > outMessagesG.length;
        if (wantsOlderGroup) {
          const olderSliceG = sliceMessagesBeforeCursor(dedupedG, beforeIdRaw, beforeTimeRaw, OLDER_MESSAGES_BATCH);
          outMessagesG = olderSliceG.messages;
          hasMoreBeforeG = olderSliceG.hasMoreBefore;
        }
        return res.status(200).json({
          ok: true,
          messages: outMessagesG,
          partial: !!(afterIdRaw || afterTimeRaw || beforeIdRaw || beforeTimeRaw),
          hasMoreBefore: !!hasMoreBeforeG,
          isAdmin: admin,
          participantsCount: members.length,
          onlineCount: skipPresenceG ? undefined : onlineCountG,
          isGroupChat: true,
          groupTitle: groupTitleOut,
          groupDescription: groupDescriptionOut,
          groupAvatar: groupAvatarOut,
          groupCreatorId: meta.createdBy != null ? String(meta.createdBy) : null,
          iAmGroupCreator: iAmCreatorMsgs,
          iCanManageGroupMeta: !!admin,
          iCanChangeGroupAvatar: iCanChangeGroupAvatarMsgs,
          pollRev: groupPollRevPre,
          trace: buildChatTrace({ mode: "group", waited: false }),
        });
      }

      const otherId = normalizePeerChatUserId(withId);
      const trackSeen = req.query.trackSeen !== "0" && req.query.trackSeen !== "false";
      const key = convKey(myId, otherId);
      const wantPollDm = String(req.query.poll || "") === "1";
      const sinceRevDm = String(req.query.sinceRev || "").trim();
      let dmPollRevPre = null;
      if (wantPollDm) {
        dmPollRevPre = await computeDmThreadPollRev(key, myId, otherId);
        if (sinceRevDm && dmPollRevPre && sinceRevDm === dmPollRevPre) {
          if (waitForChange) {
            const waitResDm = await waitForPollRevChange(
              () => computeDmThreadPollRev(key, myId, otherId),
              dmPollRevPre,
              waitTimeoutMs,
              400
            );
            if (!waitResDm.changed) {
                return res.status(200).json({ ok: true, notModified: true, pollRev: waitResDm.pollRev || dmPollRevPre, waited: true, trace: buildChatTrace({ mode: "dm", waited: true }) });
            }
            dmPollRevPre = waitResDm.pollRev || dmPollRevPre;
          } else {
            return res.status(200).json({ ok: true, notModified: true, pollRev: dmPollRevPre });
          }
        }
      }
      const now = Date.now();
      const minScore = now - ONLINE_TTL_MS;
      const touchDm = touchChatLastSeenCmd(myId, now);
      const wantsOlderDm = !!(beforeIdRaw || beforeTimeRaw);
      const canTryFastTailDm = !wantsOlderDm && !!(afterIdRaw || afterTimeRaw);
      const fastTailDm = canTryFastTailDm
        ? await tryBuildFastTailResponse(key, afterIdRaw, afterTimeRaw, MAX_MESSAGES)
        : null;
      const needsFullDmRange = wantsOlderDm || (canTryFastTailDm && !fastTailDm);
      const pipeline = [
        ["LRANGE", key, "0", needsFullDmRange ? "-1" : String(MAX_MESSAGES - 1)],
        ["ZADD", CHAT_ONLINE_KEY, String(now), myId],
        ["ZREMRANGEBYSCORE", CHAT_ONLINE_KEY, "-inf", String(minScore)],
        ...(touchDm ? [touchDm] : []),
        ["ZSCORE", CHAT_ONLINE_KEY, myId],
        ["ZSCORE", CHAT_ONLINE_KEY, otherId],
        ["GET", chatTypingKey(myId, otherId)],
        ["LLEN", key],
      ];
      const results = await redisPipeline(pipeline);
      /* Как в mode=general: разные формы ответа pipeline у Upstash */
      let listResp = results;
      if (results && typeof results === "object" && !Array.isArray(results) && Array.isArray(results.result)) {
        listResp = results.result;
      }
      let raw = [];
      if (listResp && Array.isArray(listResp)) {
        const first = listResp[0];
        if (first && first.error) {
          return res.status(500).json({ ok: false, error: "Ошибка загрузки сообщений" });
        }
        raw = Array.isArray(first?.result) ? first.result : typeof first?.result === "string" ? [first.result] : [];
      }
      const messages = (Array.isArray(raw) ? raw : [])
        .map((s) => {
          try {
            return typeof s === "string" ? JSON.parse(s) : null;
          } catch (e) {
            return null;
          }
        })
        .filter(Boolean)
        .reverse();
      const seen = new Set();
      const deduped = messages.filter((m) => {
        if (m && m.from != null && m.from !== "") m.from = normalizeStoredMessageFromId(m.from);
        const k =
          m.id !== null && m.id !== undefined && m.id !== ""
            ? String(m.id)
            : m.from + "|" + (m.time || "") + "|" + (m.text || "");
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });
      const fromIds = [...new Set(deduped.map((m) => m.from).filter(Boolean))];
      const participantsCount = fromIds.length;
      const myScore = listResp && listResp[4] && listResp[4].result != null ? parseFloat(listResp[4].result) : 0;
      const otherScore = listResp && listResp[5] && listResp[5].result != null ? parseFloat(listResp[5].result) : 0;
      const peerTyping = !!(listResp && listResp[6] && listResp[6].result != null && listResp[6].result !== false);
      const totalMessagesDm =
        listResp && listResp[7] && listResp[7].result != null
          ? Math.max(0, parseInt(String(listResp[7].result), 10) || 0)
          : deduped.length;
      let onlineCount = 0;
      if (fromIds.includes(myId) && myScore >= minScore) onlineCount++;
      if (fromIds.includes(otherId) && otherScore >= minScore) onlineCount++;
      let dtIdsMap = {};
      let avatarsMap = {};
      let p21IdsMap = {};
      let verifiedIdsMap = {};
      let statusMetaDm = {};
      if (!fastOpenThread) {
        let respectScoresDm = {};
        [dtIdsMap, avatarsMap, p21IdsMap, verifiedIdsMap, respectScoresDm, statusMetaDm] = await Promise.all([
          getDtIds(fromIds),
          getAvatars(fromIds),
          getP21Ids(fromIds),
          getPokerPlusVerifiedIds(fromIds),
          getRespectScores(fromIds),
          getPokerProfileStatusMeta(fromIds),
        ]);
        deduped.forEach((m) => {
          if (m.from) {
            if (dtIdsMap[m.from]) m.fromDtId = dtIdsMap[m.from];
            if (avatarsMap[m.from]) m.fromAvatar = avatarsMap[m.from];
            if (p21IdsMap[m.from]) m.fromP21Id = p21IdsMap[m.from];
            m.fromPokerPlusVerified = !!verifiedIdsMap[m.from];
            m.fromRespect = respectScoresDm[m.from] != null ? respectScoresDm[m.from] : 0;
            if (statusMetaDm[m.from]) {
              m.fromStatusLevel = statusMetaDm[m.from].level;
              m.fromStatusValue = statusMetaDm[m.from].valuePercent;
            } else if (m.fromPokerPlusVerified) {
              m.fromStatusLevel = 1;
              m.fromStatusValue = 0;
            }
            m.fromAdmin = isAdmin(m.from);
          }
        });
      } else {
        deduped.forEach((m) => {
          if (m && m.from) m.fromAdmin = isAdmin(m.from);
        });
      }
      const latestInThread = deduped.length ? deduped[deduped.length - 1].time : null;
      if (trackSeen && latestInThread) await bumpSeenCursor(myId, otherId, latestInThread);
      if (!fastOpenThread) {
        const peerSeenUpTo = await getSeenCursor(otherId, myId);
        applyPeerReadReceiptsToMyMessages(deduped, myId, peerSeenUpTo);
        const idsAliasDm = collectMessageFromIdsForAlias(deduped);
        const displayMapDm = await getChatDisplayNameMapForIds(idsAliasDm);
        applyPeerChatDisplayNamesToMessages(deduped, displayMapDm);
        const aliasMapDm = await getFriendAliasMapForViewer(myId, idsAliasDm);
        applyViewerFriendAliasesToMessages(deduped, aliasMapDm);
      }
      const otherDtId = dtIdsMap && otherId ? (dtIdsMap[otherId] || null) : null;
      const otherP21Id = p21IdsMap && otherId ? (p21IdsMap[otherId] != null ? p21IdsMap[otherId] : null) : null;
      const otherPokerPlusVerified = !!(verifiedIdsMap && otherId && verifiedIdsMap[otherId]);
      const otherStatus = statusMetaDm && otherId ? statusMetaDm[otherId] : null;
      const otherAvatar =
        otherId && avatarsMap && avatarsMap[otherId] ? avatarsMap[otherId] : null;
      if (!dmPollRevPre) dmPollRevPre = await computeDmThreadPollRev(key, myId, otherId);
      let outMessagesDm = fastTailDm ? fastTailDm.messages : filterMessagesAfterCursor(deduped, afterIdRaw, afterTimeRaw);
      let hasMoreBeforeDm = totalMessagesDm > deduped.length ? true : totalMessagesDm > outMessagesDm.length;
      if (wantsOlderDm) {
        const olderSliceDm = sliceMessagesBeforeCursor(deduped, beforeIdRaw, beforeTimeRaw, OLDER_MESSAGES_BATCH);
        outMessagesDm = olderSliceDm.messages;
        hasMoreBeforeDm = olderSliceDm.hasMoreBefore;
      }
      return res.status(200).json({
        ok: true,
        messages: outMessagesDm,
        partial: !!(afterIdRaw || afterTimeRaw || beforeIdRaw || beforeTimeRaw),
        hasMoreBefore: !!hasMoreBeforeDm,
        isAdmin: admin,
        participantsCount,
        onlineCount,
        otherDtId: otherDtId || undefined,
        otherP21Id: otherP21Id != null && otherP21Id !== "" ? otherP21Id : undefined,
        otherPokerPlusVerified,
        otherStatusLevel: otherStatus ? otherStatus.level : (otherPokerPlusVerified ? 1 : undefined),
        otherStatusValue: otherStatus ? otherStatus.valuePercent : (otherPokerPlusVerified ? 0 : undefined),
        otherAvatar: otherAvatar != null && otherAvatar !== "" ? otherAvatar : undefined,
        peerTyping,
        pollRev: dmPollRevPre,
        trace: buildChatTrace({ mode: "dm", waited: false }),
      });
    }

    if (mode === "clubChatManage") {
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      const [pendRes, memRes, namesRes, joinRes] = await Promise.all([
        redisPipeline([["SMEMBERS", CLUB_CHAT_PENDING_KEY]]),
        redisPipeline([["SMEMBERS", CLUB_CHAT_MEMBERS_KEY]]),
        redisPipeline([["HGETALL", "poker_app:visitor_usernames"]]),
        redisPipeline([["HGETALL", CLUB_CHAT_MEMBER_JOINED_AT_KEY]]),
      ]);
      const pendingIds = Array.isArray(pendRes?.[0]?.result) ? pendRes[0].result : [];
      const memberIds = Array.isArray(memRes?.[0]?.result) ? memRes[0].result : [];
      const ur = namesRes?.[0]?.result;
      let usernames = {};
      if (Array.isArray(ur)) {
        for (let i = 0; i < ur.length; i += 2) {
          if (ur[i] && ur[i + 1]) usernames[ur[i]] = String(ur[i + 1]).trim();
        }
      }
      const jr = joinRes?.[0]?.result;
      const joinedAtByUser = {};
      if (Array.isArray(jr)) {
        for (let i = 0; i < jr.length; i += 2) {
          if (jr[i]) joinedAtByUser[jr[i]] = String(jr[i + 1] || "").trim();
        }
      }
      const pending = await enrichClubUserList(pendingIds, usernames);
      const adminIdsNormalized = ADMIN_IDS.map((id) => (String(id).startsWith("tg_") ? String(id) : "tg_" + id));
      const adminSet = new Set(adminIdsNormalized);
      const inChatCount = new Set([...adminIdsNormalized, ...memberIds]).size;
      const adminsInChat = adminIdsNormalized
        .map((id) => ({
          userId: id,
          name: usernames[id] ? "@" + usernames[id] : id,
          isAdmin: true,
          joinedAt: null,
        }))
        .sort((a, b) => (a.name || "").localeCompare(b.name || "", "ru"));
      const memberOnlyEnriched = await enrichClubUserList(
        memberIds.filter((id) => id && !adminSet.has(id)),
        usernames
      );
      const membersPlain = memberOnlyEnriched.map((u) => ({
        ...u,
        isAdmin: false,
        joinedAt: joinedAtByUser[u.userId] || null,
      }));
      membersPlain.sort((a, b) => {
        const ma = chatMessageTimeMs(a.joinedAt);
        const mb = chatMessageTimeMs(b.joinedAt);
        const na = Number.isNaN(ma);
        const nb = Number.isNaN(mb);
        if (na && nb) return (a.name || "").localeCompare(b.name || "", "ru");
        if (na) return 1;
        if (nb) return -1;
        return ma - mb;
      });
      const inChat = [...adminsInChat, ...membersPlain];
      return res.status(200).json({
        ok: true,
        pending,
        pendingCount: pending.length,
        inChat,
        inChatCount,
        gateEnabled: clubChatApplicationRequired(),
      });
    }

    if (mode === "adminOnline") {
      const now = Date.now();
      const minScore = now - ONLINE_TTL_MS;
      const adminIds = ADMIN_IDS.map((id) => (id.startsWith("tg_") ? id : "tg_" + id));
      const touchAdm = touchChatLastSeenCmd(myId, now);
      const scoreCmds = [
        ["ZADD", CHAT_ONLINE_KEY, String(now), myId],
        ["ZREMRANGEBYSCORE", CHAT_ONLINE_KEY, "-inf", String(minScore)],
        ...(touchAdm ? [touchAdm] : []),
        ...adminIds.flatMap((id) => [["ZSCORE", CHAT_ONLINE_KEY, id]]),
      ];
      const scoreResults = await redisPipeline(scoreCmds);
      const onlineAdminIds = [];
      if (scoreResults && Array.isArray(scoreResults) && scoreResults.length >= 2) {
        const scores = scoreResults.slice(touchAdm ? 3 : 2);
        adminIds.forEach((id, i) => {
          const s = scores[i]?.result;
          if (s != null && parseFloat(s) >= minScore) onlineAdminIds.push(id);
        });
      }
      return res.status(200).json({ ok: true, onlineAdminIds });
    }

    if (mode === "general") {
      const clubChatAccess = await getClubChatAccessState(myId, admin);
      const includeRoster = req.query.includeRoster === "1" || req.query.roster === "1";
      const wantPoll = String(req.query.poll || "") === "1";
      const sinceRev = String(req.query.sinceRev || "").trim();
      let pollRevPre = null;
      if (wantPoll) {
        pollRevPre = await computeGeneralPollRev(myId, admin, clubChatAccess);
        if (sinceRev && pollRevPre && sinceRev === pollRevPre) {
          if (waitForChange) {
            const waitResGeneral = await waitForPollRevChange(
              () => computeGeneralPollRev(myId, admin, clubChatAccess),
              pollRevPre,
              waitTimeoutMs,
              400
            );
            if (!waitResGeneral.changed) {
                return res.status(200).json({ ok: true, notModified: true, pollRev: waitResGeneral.pollRev || pollRevPre, waited: true, trace: buildChatTrace({ mode: "general", waited: true }) });
            }
            pollRevPre = waitResGeneral.pollRev || pollRevPre;
          } else {
            return res.status(200).json({ ok: true, notModified: true, pollRev: pollRevPre });
          }
        }
      }
      const now = Date.now();
      const minScore = now - ONLINE_TTL_MS;
      const touchGen = touchChatLastSeenCmd(myId, now);
      const wantsOlderGeneral = !!(beforeIdRaw || beforeTimeRaw);
      const canTryFastTailGeneral = !wantsOlderGeneral && !!(afterIdRaw || afterTimeRaw);
      const fastTailGeneral = canTryFastTailGeneral
        ? await tryBuildFastTailResponse(GENERAL_KEY, afterIdRaw, afterTimeRaw, MAX_MESSAGES)
        : null;
      const needPendingBadge = admin && clubChatApplicationRequired();
      const [msgResults, blockedResults, onlineResults, pendingCountPipe, pinnedResults] = await Promise.all([
        redisPipeline([
          ["LRANGE", GENERAL_KEY, "0", wantsOlderGeneral || !fastTailGeneral ? "-1" : String(MAX_MESSAGES - 1)],
          ["LLEN", GENERAL_KEY],
        ]),
        redisPipeline([["SMEMBERS", BLOCKED_KEY]]),
        redisPipeline([
          ["ZADD", CHAT_ONLINE_KEY, String(now), myId],
          ["ZREMRANGEBYSCORE", CHAT_ONLINE_KEY, "-inf", String(minScore)],
          ...(touchGen ? [touchGen] : []),
          ["ZCOUNT", CHAT_ONLINE_KEY, String(minScore), "+inf"],
        ]),
        needPendingBadge ? redisPipeline([["SCARD", CLUB_CHAT_PENDING_KEY]]) : Promise.resolve([{ result: 0 }]),
        redisPipeline([["GET", GENERAL_PINNED_KEY]]),
      ]);
      const clubChatPendingReviewCount =
        needPendingBadge && pendingCountPipe && pendingCountPipe[0] && pendingCountPipe[0].result != null
          ? Number(pendingCountPipe[0].result) || 0
          : 0;
      const zcIdx = touchGen ? 3 : 2;
      const onlineCount =
        onlineResults && onlineResults[zcIdx] && typeof onlineResults[zcIdx].result === "number"
          ? onlineResults[zcIdx].result
          : 0;
      if (!admin && !(await hasClubGeneralAccess(myId, admin))) {
        return res.status(200).json({
          ok: true,
          messages: [],
          isAdmin: admin,
          participantsCount: 0,
          onlineCount,
          clubChatAccess,
          clubChatPendingReviewCount,
          generalPinned: null,
          generalMembers: includeRoster ? [] : undefined,
          pollRev: pollRevPre,
        });
      }
      let listResp = msgResults;
      if (msgResults && typeof msgResults === "object" && !Array.isArray(msgResults) && Array.isArray(msgResults.result)) {
        listResp = msgResults.result;
      }
      let raw = [];
      let totalMessagesGeneral = 0;
      if (listResp && Array.isArray(listResp)) {
        const first = listResp[0];
        if (first && first.error) {
          return res.status(500).json({ ok: false, error: "Ошибка загрузки сообщений" });
        }
        raw = Array.isArray(first?.result) ? first.result : (typeof first?.result === "string" ? [first.result] : []);
        totalMessagesGeneral =
          listResp[1] && listResp[1].result != null
            ? Math.max(0, parseInt(String(listResp[1].result), 10) || 0)
            : 0;
      }
      const blockedSet = new Set(Array.isArray(blockedResults?.[0]?.result) ? blockedResults[0].result : []);
      const messages = (Array.isArray(raw) ? raw : [])
        .map((s) => {
          try {
            return typeof s === "string" ? JSON.parse(s) : null;
          } catch (e) {
            return null;
          }
        })
        .filter(Boolean)
        .map((m) => {
          if (m && m.from != null && m.from !== "") m.from = normalizeStoredMessageFromId(m.from);
          return m;
        })
        .filter((m) => !m.from || !blockedSet.has(m.from))
        .reverse();
      const seen = new Set();
      const deduped = messages.filter((m) => {
        const key =
          m.id !== null && m.id !== undefined && m.id !== ""
            ? String(m.id)
            : m.from + "|" + (m.time || "") + "|" + (m.text || "");
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      const participantsSet = new Set(deduped.map((m) => m.from).filter(Boolean));
      const fromIds = [...participantsSet];
      const [dtIds, avatars, p21Ids, verifiedIds, respectScores, statusMeta] = await Promise.all([
        getDtIds(fromIds),
        getAvatars(fromIds),
        getP21Ids(fromIds),
        getPokerPlusVerifiedIds(fromIds),
        getRespectScores(fromIds),
        getPokerProfileStatusMeta(fromIds),
      ]);
      deduped.forEach((m) => {
        if (m.from) {
          if (dtIds[m.from]) m.fromDtId = dtIds[m.from];
          if (avatars[m.from]) m.fromAvatar = avatars[m.from];
          if (p21Ids[m.from]) m.fromP21Id = p21Ids[m.from];
          m.fromPokerPlusVerified = !!verifiedIds[m.from];
          m.fromRespect = respectScores[m.from] != null ? respectScores[m.from] : 0;
          if (statusMeta[m.from]) {
            m.fromStatusLevel = statusMeta[m.from].level;
            m.fromStatusValue = statusMeta[m.from].valuePercent;
          } else if (m.fromPokerPlusVerified) {
            m.fromStatusLevel = 1;
            m.fromStatusValue = 0;
          }
          m.fromAdmin = isAdmin(m.from);
        }
      });
      const idsAliasGen = collectMessageFromIdsForAlias(deduped);
      const displayMapGen = await getChatDisplayNameMapForIds(idsAliasGen);
      applyPeerChatDisplayNamesToMessages(deduped, displayMapGen);
      const aliasMapGen = await getFriendAliasMapForViewer(myId, idsAliasGen);
      applyViewerFriendAliasesToMessages(deduped, aliasMapGen);
      const trackSeenGeneral = req.query.trackSeen !== "0" && req.query.trackSeen !== "false";
      const latestInGeneral = deduped.length ? deduped[deduped.length - 1].time : null;
      if (trackSeenGeneral && latestInGeneral) await bumpGeneralLastSeen(myId, String(latestInGeneral).trim());
      let generalPinned = null;
      let pinnedRaw = null;
      if (pinnedResults && Array.isArray(pinnedResults) && pinnedResults[0] && pinnedResults[0].result != null) {
        pinnedRaw = pinnedResults[0].result;
      }
      if (pinnedRaw != null && pinnedRaw !== "") {
        if (typeof pinnedRaw !== "string") {
          try {
            await redisPipeline([["DEL", GENERAL_PINNED_KEY]]);
          } catch (eBadPin) {}
        } else {
          try {
            const p = JSON.parse(pinnedRaw);
            if (p && p.id != null && p.id !== "") {
              const idStr = String(p.id);
              if (deduped.some((m) => m && String(m.id) === idStr)) {
                generalPinned = {
                  ...p,
                  own: normalizeStoredMessageFromId(p.from) === normalizeStoredMessageFromId(myId),
                };
                if (
                  generalPinned.imageSrc &&
                  String(generalPinned.imageSrc).trim() &&
                  !generalPinned.hasImage
                ) {
                  generalPinned.hasImage = true;
                }
              } else {
                await redisPipeline([["DEL", GENERAL_PINNED_KEY]]);
              }
            } else {
              await redisPipeline([["DEL", GENERAL_PINNED_KEY]]);
            }
          } catch (eParse) {
            try {
              await redisPipeline([["DEL", GENERAL_PINNED_KEY]]);
            } catch (eDelCorrupt) {}
          }
        }
      }
      if (generalPinned && generalPinned.from) {
        const pn = normalizeStoredMessageFromId(generalPinned.from);
        if (pn) {
          const pinDisp = await getChatDisplayNameMapForIds([pn]);
          if (pinDisp[pn]) generalPinned.fromName = pinDisp[pn];
          if (aliasMapGen[pn]) generalPinned.fromName = aliasMapGen[pn];
        }
      }
      let roster = null;
      if (includeRoster) roster = await buildGeneralChatRosterPayload(myId, admin);
      const generalStats = includeRoster
        ? roster
        : await buildGeneralChatStatsForContacts(myId, admin);
      let outMessagesGen = fastTailGeneral ? fastTailGeneral.messages : filterMessagesAfterCursor(deduped, afterIdRaw, afterTimeRaw);
      let hasMoreBeforeGen = totalMessagesGeneral > deduped.length ? true : totalMessagesGeneral > outMessagesGen.length;
      if (wantsOlderGeneral) {
        const olderSliceGen = sliceMessagesBeforeCursor(deduped, beforeIdRaw, beforeTimeRaw, OLDER_MESSAGES_BATCH);
        outMessagesGen = olderSliceGen.messages;
        hasMoreBeforeGen = olderSliceGen.hasMoreBefore;
      }
      return res.status(200).json({
        ok: true,
        messages: outMessagesGen,
        partial: !!(afterIdRaw || afterTimeRaw || beforeIdRaw || beforeTimeRaw),
        hasMoreBefore: !!hasMoreBeforeGen,
        isAdmin: admin,
        participantsCount: generalStats.participantsCount != null
          ? generalStats.participantsCount
          : generalStats.generalChatParticipantsCount,
        onlineCount: generalStats.onlineCount != null
          ? generalStats.onlineCount
          : generalStats.generalChatOnlineCount,
        clubChatAccess,
        clubChatPendingReviewCount,
        generalPinned,
        generalMembers: includeRoster && roster ? roster.generalMembers : undefined,
        pollRev: pollRevPre,
        trace: buildChatTrace({ mode: "general", waited: false }),
      });
    }

    const contactsMetaOnly = readContactsMetaOnlyFlag(req);
    if (contactsMetaOnly) {
      const metaPayload = await buildContactsMetaOnlyPayload(myId, admin, req);
      const contactsMetaPollRequested = req.query.poll === "1" || req.query.poll === "true";
      const contactsMetaSinceRev = String(req.query.sinceRev || "").trim();
      const contactsMetaPollRev = computeContactsMetaPollRev(metaPayload);
      if (contactsMetaPollRequested && contactsMetaSinceRev && contactsMetaSinceRev === contactsMetaPollRev) {
        if (waitForChange) {
          const waitResContacts = await waitForPollRevChange(
            async () => computeContactsMetaPollRev(await buildContactsMetaOnlyPayload(myId, admin, req)),
            contactsMetaPollRev,
            waitTimeoutMs,
            500
          );
          if (!waitResContacts.changed) {
            return res.status(200).json({
              ok: true,
              notModified: true,
              pollRev: waitResContacts.pollRev || contactsMetaPollRev,
              waited: true,
              trace: buildChatTrace({ mode: "contacts", waited: true }),
            });
          }
          const freshMetaPayload = await buildContactsMetaOnlyPayload(myId, admin, req);
          return res.status(200).json(
            Object.assign({}, freshMetaPayload, {
              pollRev: computeContactsMetaPollRev(freshMetaPayload),
              trace: buildChatTrace({ mode: "contacts", waited: true }),
            })
          );
        }
        return res.status(200).json({ ok: true, notModified: true, pollRev: contactsMetaPollRev });
      }
      return res.status(200).json(Object.assign({}, metaPayload, { pollRev: contactsMetaPollRev, trace: buildChatTrace({ mode: "contacts", waited: false }) }));
    }
    const now = Date.now();
    const minScore = now - ONLINE_TTL_MS;
    const touchCt = touchChatLastSeenCmd(myId, now);
    const results = await redisPipeline([
      ["SMEMBERS", "poker_app:chat_partners:" + myId],
      ["ZADD", CHAT_ONLINE_KEY, String(now), myId],
      ["ZREMRANGEBYSCORE", CHAT_ONLINE_KEY, "-inf", String(minScore)],
      ...(touchCt ? [touchCt] : []),
    ]);
    if (!results || !Array.isArray(results) || results.length < 1) {
      const clubEmpty = await getClubChatAccessState(myId, admin);
      return res.status(200).json({
        ok: true,
        contacts: [],
        friendIds: [],
        chatPartnerIds: [],
        isAdmin: admin,
        participantsCount: 0,
        onlineCount: 0,
        clubChatAccess: clubEmpty,
        generalChatPickMembers: [],
      });
    }
    const partners = Array.isArray(results[0]?.result) ? results[0].result : [];

    /* Все id из chat_partners (нормализованные). Раньше админам скрывали других админов — тогда личка админ↔админ
       (например с @roman1_matvienko / tg_388008256) не попадала в mode=contacts, хотя SADD уже был. */
    const partnerIds = [...new Set(partners.map((id) => normalizePeerChatUserId(String(id))))].filter(
      (id) => (id.startsWith("tg_") || id.startsWith("vk_")) && id !== myId
    );
    const viewerAccountId = myId.startsWith("guest_") ? myId : await ensureDtIdForUserId(myId);
    const friendsEarlyRes = await redisPipeline([["SMEMBERS", FRIENDS_SET_KEY_PREFIX + viewerAccountId]]);
    const friendIdsForResponse =
      friendsEarlyRes && friendsEarlyRes[0] && Array.isArray(friendsEarlyRes[0].result)
        ? friendsEarlyRes[0].result.map((x) => (x != null ? String(x) : "")).filter(Boolean)
        : [];
    const contactsFast = req.query.contactsFast === "1" || req.query.contactsFast === "true";
    if (contactsFast) {
      const fastIds = partnerIds.slice(0, 80);
      const fastNamesRes = fastIds.length > 0 ? await redisPipeline([["HMGET", USERNAMES_KEY, ...fastIds]]) : [];
      const fastNamesRow =
        fastNamesRes && fastNamesRes[0] && Array.isArray(fastNamesRes[0].result) ? fastNamesRes[0].result : [];
      const fastContacts = fastIds.map((id, idx) => {
        const rawName = fastNamesRow[idx] != null && fastNamesRow[idx] !== false ? String(fastNamesRow[idx]).trim() : "";
        return {
          id,
          name: rawName ? "@" + rawName : normalizeLegacyAccountDisplayLabel(id),
          online: false,
          admin: isAdmin(id),
          unreadCount: 0,
          lastMessageTime: "",
          lastMessagePreview: "",
          fast: true,
        };
      });
      const fastClubChatAccess = await getClubChatAccessState(myId, admin);
      return res.status(200).json({
        ok: true,
        contacts: fastContacts,
        friendIds: friendIdsForResponse,
        chatPartnerIds: fastIds,
        isAdmin: admin,
        participantsCount: fastContacts.length,
        onlineCount: 0,
        generalUnreadCount: 0,
        clubChatAccess: fastClubChatAccess,
        generalChatPickMembers: [],
        contactsFast: true,
      });
    }
    const idsForOnline = [...new Set(partnerIds)];
    const onlineSet = new Set();
    let onlineCount = 0;
    if (idsForOnline.length > 0) {
      const scoreCmds = idsForOnline.flatMap((id) => [["ZSCORE", CHAT_ONLINE_KEY, id]]);
      const scoreResults = await redisPipeline(scoreCmds);
      if (scoreResults && Array.isArray(scoreResults)) {
        idsForOnline.forEach((id, i) => {
          const s = scoreResults[i]?.result;
          if (s != null && parseFloat(s) >= minScore) {
            onlineCount++;
            onlineSet.add(id);
          }
        });
      }
    }
    let participantsCount = partnerIds.length;

    let lastViewed = {};
    try {
      const lv = req.query.lastViewed;
      if (lv && typeof lv === "string") lastViewed = JSON.parse(lv);
    } catch (e) {}

    const adminIds = ADMIN_IDS.map((id) => (id.startsWith("tg_") ? id : "tg_" + id));
    const allIdsForUnread = [...partnerIds, ...adminIds];
    const unreadCounts = {};
    let generalUnreadCount = 0;
    let lastViewGeneralMerged = "";
    const unreadCmds = [];
    if (allIdsForUnread.length > 0) unreadCmds.push(["HMGET", unreadHashKey(myId), ...allIdsForUnread]);
    unreadCmds.push(["HGET", CHAT_GENERAL_UNREAD_HASH, myId]);
    unreadCmds.push(["HGET", CHAT_GENERAL_SEEN_HASH, myId]);
    const unreadPipe = await redisPipeline(unreadCmds);
    let unreadRow = [];
    let generalUnreadRaw = null;
    let generalSeenRaw = null;
    if (unreadPipe && Array.isArray(unreadPipe)) {
      let idxUnread = 0;
      if (allIdsForUnread.length > 0) {
        unreadRow = unreadPipe[idxUnread] && Array.isArray(unreadPipe[idxUnread].result) ? unreadPipe[idxUnread].result : [];
        idxUnread++;
      }
      generalUnreadRaw = unreadPipe[idxUnread] ? unreadPipe[idxUnread].result : null;
      idxUnread++;
      generalSeenRaw = unreadPipe[idxUnread] ? unreadPipe[idxUnread].result : null;
    }
    allIdsForUnread.forEach((id, i) => {
      const raw = unreadRow[i];
      const n = raw != null && raw !== false ? parseInt(String(raw), 10) : 0;
      unreadCounts[id] = Number.isFinite(n) && n > 0 ? n : 0;
    });
    generalUnreadCount =
      generalUnreadRaw != null && generalUnreadRaw !== false
        ? Math.max(0, parseInt(String(generalUnreadRaw), 10) || 0)
        : 0;
    const serverGenLv = generalSeenRaw != null ? String(generalSeenRaw).trim() : "";
    const clientGenLv = lastViewed.general != null ? String(lastViewed.general) : "";
    lastViewGeneralMerged = mergeReadCursors(clientGenLv, serverGenLv);
    if (!lastViewGeneralMerged || String(lastViewGeneralMerged).trim() === "") generalUnreadCount = 0;

    const lastMessageTime = {};
    const lastMessagePreview = {};
    if (partnerIds.length > 0) {
      const dmMetaRes = await redisPipeline(
        partnerIds.flatMap((id) => [
          ["HGET", threadMetaKeyByStorageKey(convKey(myId, id)), "lastMessageTime"],
          ["HGET", threadMetaKeyByStorageKey(convKey(myId, id)), "lastMessagePreview"],
        ])
      );
      const metaResults = dmMetaRes && Array.isArray(dmMetaRes) ? dmMetaRes : [];
      partnerIds.forEach((id, i) => {
        const timeIdx = i * 2;
        const previewIdx = timeIdx + 1;
        const rawTime = metaResults[timeIdx] && metaResults[timeIdx].result != null ? String(metaResults[timeIdx].result).trim() : "";
        const rawPreview =
          metaResults[previewIdx] && metaResults[previewIdx].result != null
            ? String(metaResults[previewIdx].result).trim()
            : "";
        if (rawTime) lastMessageTime[id] = rawTime;
        if (rawPreview) lastMessagePreview[id] = rawPreview;
      });
    }

    const visiblePartnerIds = await filterChatPartnersWithThreadContent(myId, partnerIds, lastMessageTime, lastMessagePreview, unreadCounts);
    participantsCount = visiblePartnerIds.length;
    onlineCount = visiblePartnerIds.reduce((count, id) => count + (onlineSet.has(id) ? 1 : 0), 0);

    const idsForMeta = [...new Set(visiblePartnerIds)];
    const resolvedPeerIds = {};
    const usernames = {};
    if (idsForMeta.length > 0) {
      const preferredPeerIds = await Promise.all(
        idsForMeta.map(async (pid) => {
          if (!/^ID\d{6}$/.test(String(pid || "").trim())) return String(pid || "").trim();
          const preferred = await getPreferredUserIdByDtId(String(pid).trim());
          return preferred ? String(preferred).trim() : String(pid).trim();
        })
      );
      idsForMeta.forEach((pid, idx) => {
        resolvedPeerIds[pid] = preferredPeerIds[idx] || String(pid).trim();
      });
      const usernamesRes = await redisPipeline([["HMGET", USERNAMES_KEY, ...preferredPeerIds]]);
      const usernamesRow =
        usernamesRes && usernamesRes[0] && Array.isArray(usernamesRes[0].result) ? usernamesRes[0].result : [];
      idsForMeta.forEach((pid, idx) => {
        const raw = usernamesRow[idx];
        if (raw != null && raw !== false) usernames[pid] = String(raw).trim();
      });
    }
    const [dtIds, avatars, p21IdsContacts, pokerPlusVerifiedContacts, statusMetaContacts] = await Promise.all([
      getDtIds(idsForMeta),
      getAvatars(idsForMeta),
      getP21Ids(idsForMeta),
      getPokerPlusVerifiedIds(idsForMeta),
      getPokerProfileStatusMeta(idsForMeta),
    ]);
    const friendContactNameByPeer = {};
    if (idsForMeta.length > 0) {
      const aliasRes = await redisPipeline([["HMGET", FRIEND_ALIAS_KEY_PREFIX + viewerAccountId, ...idsForMeta]]);
      const aliasRow =
        aliasRes && aliasRes[0] && Array.isArray(aliasRes[0].result) ? aliasRes[0].result : [];
      idsForMeta.forEach((pid, idx) => {
        const raw = aliasRow[idx];
        if (raw == null || raw === false) return;
        const cn = sanitizeFriendContactNameForChat(raw);
        if (cn) friendContactNameByPeer[pid] = cn;
      });
    }
    const chatDisplayByPeer =
      idsForMeta.length > 0 ? await getChatDisplayNameMapForIds(idsForMeta) : {};
    const lastSeenByPeer = {};
    if (idsForMeta.length > 0) {
      const lsRes = await redisPipeline([["HMGET", CHAT_LAST_SEEN_HASH, ...idsForMeta]]);
      const lsRow = lsRes && lsRes[0] && Array.isArray(lsRes[0].result) ? lsRes[0].result : [];
      idsForMeta.forEach((pid, lsi) => {
        const iso = chatLastSeenIsoFromRedisRaw(lsRow[lsi]);
        if (iso) lastSeenByPeer[pid] = iso;
      });
    }
    const contactsFromPartners = visiblePartnerIds.map((id) => {
      const baseDisplay =
        normalizeLegacyAccountDisplayLabel((chatDisplayByPeer[id] && String(chatDisplayByPeer[id]).trim()) || "") ||
        (usernames[id] ? "@" + usernames[id] : normalizeLegacyAccountDisplayLabel(id));
      const onC = onlineSet.has(id);
      const entry = {
        id,
        name: baseDisplay,
        dtId: dtIds[id] || null,
        p21Id: p21IdsContacts[id] != null ? p21IdsContacts[id] : null,
        pokerPlusVerified: !!pokerPlusVerifiedContacts[id],
        statusLevel: statusMetaContacts[id] ? statusMetaContacts[id].level : (pokerPlusVerifiedContacts[id] ? 1 : null),
        statusValue: statusMetaContacts[id] ? statusMetaContacts[id].valuePercent : (pokerPlusVerifiedContacts[id] ? 0 : null),
        avatar: avatars[id] || null,
        online: onC,
        admin: isAdmin(id),
        unreadCount: unreadCounts[id] != null ? unreadCounts[id] : 0,
        lastMessageTime: lastMessageTime[id] || "",
        lastMessagePreview: lastMessagePreview[id] || "",
      };
      const aliasLabel = friendContactNameByPeer[id];
      if (aliasLabel) entry.contactName = aliasLabel;
      if (!onC && lastSeenByPeer[id]) entry.lastSeenAt = lastSeenByPeer[id];
      return entry;
    });
    let contactsAll = contactsFromPartners;
    let myGroupsRes = await redisPipeline([["SMEMBERS", userChatGroupsKey(myId)]]);
    if (!myGroupsRes || !Array.isArray(myGroupsRes)) {
      myGroupsRes = await redisPipeline([["SMEMBERS", userChatGroupsKey(myId)]]);
    }
    const rawGroupIds = Array.isArray(myGroupsRes?.[0]?.result) ? myGroupsRes[0].result : [];
    const groupIdsList = [
      ...new Set(rawGroupIds.map((g) => String(g).trim()).filter((x) => isGroupChatId(x))),
    ];
    const groupEntries = [];
    if (groupIdsList.length > 0) {
      const nGrp = groupIdsList.length;
      const metaCmdsGrp = groupIdsList.map((gid) => ["GET", groupMetaKey(gid)]);
      const metaLastCmdsGrp = groupIdsList.map((gid) => ["HGET", threadMetaKeyByStorageKey(groupMsgsKey(gid)), "lastMessageTime"]);
      const metaPreviewCmdsGrp = groupIdsList.map((gid) => ["HGET", threadMetaKeyByStorageKey(groupMsgsKey(gid)), "lastMessagePreview"]);
      const unreadCmdsGrp = [["HMGET", unreadHashKey(myId), ...groupIdsList]];
      const grpPipe = await redisPipeline([...metaCmdsGrp, ...metaLastCmdsGrp, ...metaPreviewCmdsGrp, ...unreadCmdsGrp]);
      for (let gi = 0; gi < groupIdsList.length; gi++) {
        const gid = groupIdsList[gi];
        const metaRawG = grpPipe && grpPipe[gi] ? grpPipe[gi].result : null;
        const metaStrG = metaRawG != null ? String(metaRawG) : "";
        let metaObjG = null;
        try {
          metaObjG = metaStrG ? JSON.parse(metaStrG) : null;
        } catch (eParseG) {}
        const gMembers = metaObjG && Array.isArray(metaObjG.members) ? metaObjG.members.map(String) : [];
        if (!metaObjG || !groupMetaHasMember({ members: gMembers }, myId)) continue;
        const titleEntry = sanitizeGroupTitle(metaObjG.title != null ? String(metaObjG.title) : "") || "Группа";
        const gaRaw = metaObjG.avatar && typeof metaObjG.avatar === "string" ? metaObjG.avatar : "";
        const gaList =
          gaRaw && gaRaw.startsWith("data:") && gaRaw.length <= 52000 ? gaRaw : null;
        const metaLastRawG = grpPipe && grpPipe[gi + nGrp] && grpPipe[gi + nGrp].result != null
          ? String(grpPipe[gi + nGrp].result).trim()
          : "";
        const metaPreviewRawG =
          grpPipe && grpPipe[gi + 2 * nGrp] && grpPipe[gi + 2 * nGrp].result != null
            ? String(grpPipe[gi + 2 * nGrp].result).trim()
            : "";
        let lastTGrp = metaLastRawG || "";
        const grpUnreadRow =
          grpPipe && grpPipe[3 * nGrp] && Array.isArray(grpPipe[3 * nGrp].result) ? grpPipe[3 * nGrp].result : [];
        const unreadRawGrp = grpUnreadRow[gi];
        const unreadGrp =
          unreadRawGrp != null && unreadRawGrp !== false
            ? Math.max(0, parseInt(String(unreadRawGrp), 10) || 0)
            : 0;
        groupEntries.push({
          id: gid,
          name: titleEntry,
          dtId: null,
          p21Id: null,
          avatar: gaList,
          online: false,
          admin: false,
          unreadCount: unreadGrp,
          isGroupChat: true,
          memberCount: gMembers.length,
        });
        lastMessageTime[gid] = lastTGrp;
        if (metaPreviewRawG) lastMessagePreview[gid] = metaPreviewRawG;
      }
    }
    contactsAll = groupEntries.concat(contactsAll);
    sortContactsByLastMessageTime(contactsAll, lastMessageTime);
    const adminUnread = {};
    adminIds.forEach((id) => {
      if (unreadCounts[id] != null && unreadCounts[id] > 0) adminUnread[id] = unreadCounts[id];
    });
    const clubChatAccess = await getClubChatAccessState(myId, admin);
    let outGeneralUnread = generalUnreadCount;
    if (!admin && !(await hasClubGeneralAccess(myId, admin))) {
      outGeneralUnread = 0;
    }
    let clubChatPendingReviewCount = 0;
    if (admin && clubChatApplicationRequired()) {
      clubChatPendingReviewCount = await getClubChatPendingCount();
    }
    const generalChatStats = await buildGeneralChatStatsForContacts(myId, admin);
    const generalPreviewRes = await redisPipeline([["HGET", threadMetaKeyByStorageKey(GENERAL_KEY), "lastMessagePreview"]]);
    const generalChatPreview =
      generalPreviewRes && generalPreviewRes[0] && generalPreviewRes[0].result != null
        ? String(generalPreviewRes[0].result).trim()
        : "";
    /* Ростер общего чата (сотни участников + аватары) на каждый poll mode=contacts раздувал исходящий трафик Vercel.
     * Клиент не использует generalChatPickMembers; состав общего чата — из loadGeneral → _chatGeneralCache.generalMembers. */
    const generalChatPickMembers = [];
    return res.status(200).json({
      ok: true,
      contacts: contactsAll,
      friendIds: friendIdsForResponse,
      chatPartnerIds: visiblePartnerIds,
      isAdmin: admin,
      participantsCount,
      onlineCount,
      adminUnread: Object.keys(adminUnread).length ? adminUnread : undefined,
      generalUnreadCount: outGeneralUnread > 0 ? outGeneralUnread : 0,
      clubChatAccess,
      clubChatPendingReviewCount,
      generalChatParticipantsCount: generalChatStats.generalChatParticipantsCount,
      generalChatOnlineCount: generalChatStats.generalChatOnlineCount,
      generalChatPreview: generalChatPreview || undefined,
      generalChatPickMembers,
    });
  }

  // POST
  const postAction = String(body.action || "")
    .trim()
    .toLowerCase()
    .replace(/_/g, "");
  if (postAction === "dmfocusping") {
    const focusWith = body.with || body.other || body.peer || body.userId;
    const peer = focusWith ? normalizePeerChatUserId(String(focusWith).trim()) : "";
    if (!peer || peer === myId) {
      await redisPipeline([["DEL", CHAT_DM_FOCUS_KEY_PREFIX + myId]]);
    } else {
      await redisPipeline([["SET", CHAT_DM_FOCUS_KEY_PREFIX + myId, peer, "EX", "55"]]);
    }
    return res.status(200).json({ ok: true });
  }
  if (postAction === "dmfocusclear") {
    await redisPipeline([["DEL", CHAT_DM_FOCUS_KEY_PREFIX + myId]]);
    return res.status(200).json({ ok: true });
  }
  if (postAction === "creategroup") {
    const title = sanitizeGroupTitle(body.title || body.groupTitle || "");
    if (!title) return res.status(400).json({ ok: false, error: "Укажите название группы" });
    let rawMembers = body.memberIds || body.members || [];
    if (!Array.isArray(rawMembers)) rawMembers = [];
    const others = [
      ...new Set(
        rawMembers
          .map((x) => normalizePeerChatUserId(String(x).trim()))
          .filter((id) => id && (id.startsWith("tg_") || id.startsWith("vk_")) && id !== myId)
      ),
    ];
    if (others.length === 0) {
      return res.status(400).json({ ok: false, error: "Добавьте хотя бы одного участника" });
    }
    if (others.length > CHAT_GROUP_MEMBERS_MAX - 1) {
      return res.status(400).json({ ok: false, error: "Слишком много участников" });
    }
    const partnersCreateRes = await redisPipeline([["SMEMBERS", "poker_app:chat_partners:" + myId]]);
    const partnerSetCreate = new Set(
      (Array.isArray(partnersCreateRes?.[0]?.result) ? partnersCreateRes[0].result : [])
        .map((id) => normalizePeerChatUserId(String(id)))
        .filter((id) => id && (id.startsWith("tg_") || id.startsWith("vk_")))
    );
    for (let oi = 0; oi < others.length; oi++) {
      if (!partnerSetCreate.has(others[oi])) {
        return res.status(400).json({
          ok: false,
          error: "В группу можно добавить только тех, с кем у вас был личный диалог в чате клуба",
        });
      }
    }
    const allMembers = [myId, ...others];
    const groupId =
      "group_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 11);
    const avatarRaw = body.avatar || body.groupAvatar;
    const avatarStored = avatarRaw ? sanitizeGroupAvatarInput(String(avatarRaw)) : null;
    const metaOut = {
      title,
      members: allMembers,
      createdBy: myId,
      createdAt: new Date().toISOString(),
    };
    if (avatarStored) metaOut.avatar = avatarStored;
    const descCreate = sanitizeGroupDescription(body.description || body.groupDescription || "");
    if (descCreate) metaOut.description = descCreate;
    const cmdsCreate = [["SET", groupMetaKey(groupId), JSON.stringify(metaOut)]];
    for (let mi = 0; mi < allMembers.length; mi++) {
      cmdsCreate.push(["SADD", userChatGroupsKey(allMembers[mi]), groupId]);
    }
    const rCreate = await redisPipeline(cmdsCreate);
    if (!rCreate || !Array.isArray(rCreate) || rCreate.some((x) => x && x.error)) {
      return res.status(500).json({ ok: false, error: "Ошибка создания группы" });
    }
    return res.status(200).json({
      ok: true,
      group: { id: groupId, title, avatar: avatarStored || undefined },
    });
  }
  if (postAction === "addgroupmembers") {
    const groupId = String(body.groupId || body.with || "").trim();
    if (!isGroupChatId(groupId)) {
      return res.status(400).json({ ok: false, error: "Некорректная группа" });
    }
    const metaAdd = await getGroupMeta(groupId);
    if (!metaAdd || !groupMetaHasMember(metaAdd, myId)) {
      return res.status(403).json({ ok: false, error: "Нет доступа к группе" });
    }
    let rawAddList = body.memberIds || body.members || [];
    if (!Array.isArray(rawAddList)) rawAddList = [];
    const wantAdd = [
      ...new Set(
        rawAddList
          .map((x) => normalizePeerChatUserId(String(x).trim()))
          .filter((id) => id && (id.startsWith("tg_") || id.startsWith("vk_"))),
      ),
    ];
    const curMembers = Array.isArray(metaAdd.members)
      ? metaAdd.members.map((x) => normalizeStoredMessageFromId(String(x).trim())).filter(Boolean)
      : [];
    const curSet = new Set(curMembers.map((x) => normalizeStoredMessageFromId(x)));
    const toAddList = wantAdd.filter((nid) => !curSet.has(normalizeStoredMessageFromId(nid)));
    if (toAddList.length === 0) {
      return res.status(400).json({
        ok: false,
        error: "Некого добавить — выберите участников, которых ещё нет в группе",
      });
    }
    if (curMembers.length + toAddList.length > CHAT_GROUP_MEMBERS_MAX) {
      return res.status(400).json({
        ok: false,
        error: "Превышен лимит участников (" + CHAT_GROUP_MEMBERS_MAX + ")",
      });
    }
    const partnersAddRes = await redisPipeline([["SMEMBERS", "poker_app:chat_partners:" + myId]]);
    const partnerSetAdd = new Set(
      (Array.isArray(partnersAddRes?.[0]?.result) ? partnersAddRes[0].result : [])
        .map((id) => normalizePeerChatUserId(String(id)))
        .filter((id) => id && (id.startsWith("tg_") || id.startsWith("vk_")))
    );
    for (let ai = 0; ai < toAddList.length; ai++) {
      const pidChk = normalizePeerChatUserId(String(toAddList[ai]).trim());
      if (!partnerSetAdd.has(pidChk)) {
        return res.status(400).json({
          ok: false,
          error: "В группу можно добавить только тех, с кем у вас был личный диалог в чате клуба",
        });
      }
    }
    metaAdd.members = curMembers.concat(toAddList.map((x) => normalizeStoredMessageFromId(x)));
    const cmdsAddM = [["SET", groupMetaKey(groupId), JSON.stringify(metaAdd)]];
    for (let ai = 0; ai < toAddList.length; ai++) {
      cmdsAddM.push(["SADD", userChatGroupsKey(normalizeStoredMessageFromId(toAddList[ai])), groupId]);
    }
    const rAddM = await redisPipeline(cmdsAddM);
    if (!rAddM || !Array.isArray(rAddM) || rAddM.some((x) => x && x.error)) {
      return res.status(500).json({ ok: false, error: "Не удалось сохранить состав группы" });
    }
    try {
      const addedNorm = toAddList.map((x) => normalizeStoredMessageFromId(x));
      const nameIds = [...new Set([normalizeStoredMessageFromId(myId), ...addedNorm])];
      let displayMap = {};
      try {
        displayMap = await getChatDisplayNameMapForIds(nameIds);
      } catch (eNm) {
        displayMap = {};
      }
      const usernameResAdd =
        addedNorm.length > 0 ? await redisPipeline([["HMGET", USERNAMES_KEY, ...addedNorm]]) : null;
      const usernameRowAdd =
        usernameResAdd && usernameResAdd[0] && Array.isArray(usernameResAdd[0].result)
          ? usernameResAdd[0].result
          : [];
      const actorNorm = normalizeStoredMessageFromId(myId);
      const redisNickActor = await getVisitorUsername(myId);
      const actorLabel =
        (displayMap[actorNorm] && String(displayMap[actorNorm]).trim()) ||
        buildChatDisplayName(identity, redisNickActor) ||
        "Участник";
      const addedMembersPayload = addedNorm.map((nid, idx) => {
        const rawUn = usernameRowAdd[idx];
        const tgLogin =
          rawUn != null && rawUn !== false ? String(rawUn).trim().replace(/^@/, "") : "";
        const disp =
          (displayMap[nid] && String(displayMap[nid]).trim()) ||
          (tgLogin ? tgLogin : String(nid).replace(/^(tg_|vk_)/, "")) ||
          "Участник";
        return {
          userId: nid,
          displayName: disp,
          telegramUsername: tgLogin || null,
        };
      });
      const addedLabels = addedMembersPayload
        .map((e) =>
          e.telegramUsername ? `${e.displayName} (@${e.telegramUsername})` : e.displayName,
        )
        .join(", ");
      const systemText = `${actorLabel} добавил(а) в группу: ${addedLabels}`;
      const sysMsg = {
        id: "grp_sys_" + Date.now() + "_" + Math.random().toString(36).slice(2, 10),
        groupSystemEvent: "members_added",
        text: systemText.slice(0, CHAT_MESSAGE_TEXT_MAX),
        time: new Date().toISOString(),
        from: null,
        groupSystemMembersAdded: {
          actorLabel,
          members: addedMembersPayload.map((e) => ({
            userId: e.userId,
            displayName: e.displayName,
            ...(e.telegramUsername ? { telegramUsername: e.telegramUsername } : {}),
          })),
        },
      };
      const gKeySys = groupMsgsKey(groupId);
      const nowSys = Date.now();
      const touchSys = touchChatLastSeenCmd(myId, nowSys);
      const sysMsgRaw = JSON.stringify(sysMsg);
      await redisPipeline([
        ["LPUSH", gKeySys, sysMsgRaw],
        ["LTRIM", gKeySys, "0", String(MAX_MESSAGES - 1)],
        ["ZADD", CHAT_ONLINE_KEY, String(nowSys), myId],
        ...(touchSys ? [touchSys] : []),
      ]);
      await writeThreadMessageIndex(gKeySys, sysMsg, sysMsgRaw);
      await writeThreadMeta(gKeySys, sysMsg);
    } catch (eSys) {
      console.error("[chat] addgroupmembers system message", eSys && eSys.message ? eSys.message : eSys);
    }
    return res.status(200).json({
      ok: true,
      added: toAddList,
      memberCount: metaAdd.members.length,
    });
  }
  if (postAction === "updategroupavatar") {
    const groupId = String(body.groupId || body.with || "").trim();
    if (!isGroupChatId(groupId)) {
      return res.status(400).json({ ok: false, error: "Некорректная группа" });
    }
    const metaUg = await getGroupMeta(groupId);
    if (!metaUg || !groupMetaHasMember(metaUg, myId)) {
      return res.status(403).json({ ok: false, error: "Нет доступа к группе" });
    }
    const createdByNormUg =
      metaUg.createdBy != null && String(metaUg.createdBy).trim() !== ""
        ? normalizeStoredMessageFromId(String(metaUg.createdBy).trim())
        : "";
    const myNormUg = normalizeStoredMessageFromId(myId);
    const isGroupCreatorUg = !!(createdByNormUg && createdByNormUg === myNormUg);
    if (!admin && !isGroupCreatorUg) {
      return res.status(403).json({
        ok: false,
        error: "Менять аватар может только создатель группы или администратор клуба",
      });
    }
    const avatarUg = sanitizeGroupAvatarInput(String(body.avatar || body.groupAvatar || ""));
    if (!avatarUg) {
      return res.status(400).json({
        ok: false,
        error: "Укажите изображение (JPEG, PNG, GIF или WebP в формате data URL)",
      });
    }
    metaUg.avatar = avatarUg;
    const rUg = await redisPipeline([["SET", groupMetaKey(groupId), JSON.stringify(metaUg)]]);
    if (!rUg || !Array.isArray(rUg) || rUg.some((x) => x && x.error)) {
      return res.status(500).json({ ok: false, error: "Не удалось сохранить аватар" });
    }
    return res.status(200).json({ ok: true, groupAvatar: avatarUg });
  }
  if (postAction === "updategroupinfo") {
    const groupId = String(body.groupId || body.with || "").trim();
    if (!isGroupChatId(groupId)) {
      return res.status(400).json({ ok: false, error: "Некорректная группа" });
    }
    const metaGi = await getGroupMeta(groupId);
    if (!metaGi || !groupMetaHasMember(metaGi, myId)) {
      return res.status(403).json({ ok: false, error: "Нет доступа к группе" });
    }
    if (!admin) {
      return res.status(403).json({ ok: false, error: "Менять название и описание может только администратор клуба" });
    }
    const titleIn = body.title !== undefined || body.groupTitle !== undefined;
    const descIn = body.description !== undefined || body.groupDescription !== undefined;
    if (!titleIn && !descIn) {
      return res.status(400).json({ ok: false, error: "Укажите название или описание" });
    }
    if (titleIn) {
      const newTitle = sanitizeGroupTitle(body.title != null ? body.title : body.groupTitle);
      if (!newTitle) return res.status(400).json({ ok: false, error: "Название не может быть пустым" });
      metaGi.title = newTitle;
    }
    if (descIn) {
      metaGi.description = sanitizeGroupDescription(
        body.description != null ? body.description : body.groupDescription,
      );
    }
    const rGi = await redisPipeline([["SET", groupMetaKey(groupId), JSON.stringify(metaGi)]]);
    if (!rGi || !Array.isArray(rGi) || rGi.some((x) => x && x.error)) {
      return res.status(500).json({ ok: false, error: "Не удалось сохранить" });
    }
    const titleOutGi = metaGi.title != null ? String(metaGi.title).trim() : "Группа";
    const descOutGi = sanitizeGroupDescription(metaGi.description != null ? String(metaGi.description) : "");
    return res.status(200).json({ ok: true, title: titleOutGi, description: descOutGi });
  }
  if (postAction === "deletegroup") {
    const groupId = String(body.groupId || body.with || "").trim();
    if (!isGroupChatId(groupId)) {
      return res.status(400).json({ ok: false, error: "Некорректная группа" });
    }
    const confirmRaw = String(body.confirm || body.confirmText || body.deleteConfirm || "").trim();
    if (confirmRaw.toLowerCase() !== "удалить") {
      return res.status(400).json({
        ok: false,
        error: "Для удаления введите слово «удалить»",
      });
    }
    const metaDel = await getGroupMeta(groupId);
    if (!metaDel || !groupMetaHasMember(metaDel, myId)) {
      return res.status(403).json({ ok: false, error: "Нет доступа к группе" });
    }
    if (!admin) {
      return res.status(403).json({ ok: false, error: "Удалить группу может только администратор клуба" });
    }
    const membersDel = Array.isArray(metaDel.members)
      ? metaDel.members.map((x) => String(x).trim()).filter(Boolean)
      : [];
    const cmdsDel = [
      ["DEL", groupMetaKey(groupId)],
      ["DEL", groupMsgsKey(groupId)],
      ["DEL", threadMetaKeyByStorageKey(groupMsgsKey(groupId))],
    ];
    for (let di = 0; di < membersDel.length; di++) {
      cmdsDel.push(["SREM", userChatGroupsKey(membersDel[di]), groupId]);
    }
    const seenFields = membersDel.map((uid) => seenCursorField(uid, groupId));
    if (seenFields.length > 0) cmdsDel.push(["HDEL", CHAT_SEEN_CURSOR_KEY, ...seenFields]);
    const rDel = await redisPipeline(cmdsDel);
    if (!rDel || !Array.isArray(rDel) || rDel.some((x) => x && x.error)) {
      return res.status(500).json({ ok: false, error: "Не удалось удалить группу" });
    }
    return res.status(200).json({ ok: true, deleted: true, groupId });
  }
  if (postAction === "leavegroup") {
    const groupId = String(body.groupId || body.with || "").trim();
    if (!isGroupChatId(groupId)) {
      return res.status(400).json({ ok: false, error: "Некорректная группа" });
    }
    const metaLeave = await getGroupMeta(groupId);
    if (!metaLeave || !groupMetaHasMember(metaLeave, myId)) {
      return res.status(403).json({ ok: false, error: "Нет доступа к группе" });
    }
    const myNormLeave = normalizeStoredMessageFromId(myId);
    const curMembersLeave = Array.isArray(metaLeave.members)
      ? metaLeave.members.map((x) => String(x).trim()).filter(Boolean)
      : [];
    const newMembersLeave = curMembersLeave.filter(
      (x) => normalizeStoredMessageFromId(x) !== myNormLeave,
    );
    if (newMembersLeave.length === curMembersLeave.length) {
      return res.status(400).json({ ok: false, error: "Вы не состоите в этой группе" });
    }
    if (newMembersLeave.length === 0) {
      const cmdsLast = [
        ["DEL", groupMetaKey(groupId)],
        ["DEL", groupMsgsKey(groupId)],
        ["DEL", threadMetaKeyByStorageKey(groupMsgsKey(groupId))],
        ["SREM", userChatGroupsKey(myId), groupId],
        ["HDEL", CHAT_SEEN_CURSOR_KEY, seenCursorField(myId, groupId)],
      ];
      const rLast = await redisPipeline(cmdsLast);
      if (!rLast || !Array.isArray(rLast) || rLast.some((x) => x && x.error)) {
        return res.status(500).json({ ok: false, error: "Не удалось выйти из группы" });
      }
      return res.status(200).json({ ok: true, left: true, groupId, groupDeleted: true });
    }
    const creatorNormLeave =
      metaLeave.createdBy != null && String(metaLeave.createdBy).trim() !== ""
        ? normalizeStoredMessageFromId(String(metaLeave.createdBy).trim())
        : "";
    if (creatorNormLeave && creatorNormLeave === myNormLeave) {
      const pick = [...newMembersLeave].sort((a, b) =>
        normalizeStoredMessageFromId(String(a)).localeCompare(normalizeStoredMessageFromId(String(b))),
      );
      metaLeave.createdBy = String(pick[0]).trim();
    }
    metaLeave.members = newMembersLeave;
    const cmdsLeave = [
      ["SET", groupMetaKey(groupId), JSON.stringify(metaLeave)],
      ["SREM", userChatGroupsKey(myId), groupId],
      ["HDEL", CHAT_SEEN_CURSOR_KEY, seenCursorField(myId, groupId)],
    ];
    const rLeave = await redisPipeline(cmdsLeave);
    if (!rLeave || !Array.isArray(rLeave) || rLeave.some((x) => x && x.error)) {
      return res.status(500).json({ ok: false, error: "Не удалось выйти из группы" });
    }
    try {
      let displayMapL = {};
      try {
        displayMapL = await getChatDisplayNameMapForIds([myNormLeave]);
      } catch (eNmL) {
        displayMapL = {};
      }
      const redisNickL = await getVisitorUsername(myId);
      const leaverLabel =
        (displayMapL[myNormLeave] && String(displayMapL[myNormLeave]).trim()) ||
        buildChatDisplayName(identity, redisNickL) ||
        "Участник";
      const sysMsgL = {
        id: "grp_sys_" + Date.now() + "_" + Math.random().toString(36).slice(2, 10),
        groupSystemEvent: "member_left",
        text: `${leaverLabel} вышел(ла) из группы`.slice(0, CHAT_MESSAGE_TEXT_MAX),
        time: new Date().toISOString(),
        from: null,
      };
      const gKeyL = groupMsgsKey(groupId);
      const nowL = Date.now();
      const touchL = touchChatLastSeenCmd(myId, nowL);
      const sysMsgLRaw = JSON.stringify(sysMsgL);
      await redisPipeline([
        ["LPUSH", gKeyL, sysMsgLRaw],
        ["LTRIM", gKeyL, "0", String(MAX_MESSAGES - 1)],
        ["ZADD", CHAT_ONLINE_KEY, String(nowL), myId],
        ...(touchL ? [touchL] : []),
      ]);
      await writeThreadMessageIndex(gKeyL, sysMsgL, sysMsgLRaw);
      await writeThreadMeta(gKeyL, sysMsgL);
    } catch (eSysL) {
      console.error("[chat] leavegroup system message", eSysL && eSysL.message ? eSysL.message : eSysL);
    }
    return res.status(200).json({
      ok: true,
      left: true,
      groupId,
      memberCount: newMembersLeave.length,
    });
  }
  if (postAction === "removegroupmember") {
    const groupId = String(body.groupId || body.with || "").trim();
    if (!isGroupChatId(groupId)) {
      return res.status(400).json({ ok: false, error: "Некорректная группа" });
    }
    const targetRaw = body.memberId || body.userId || body.removeUserId;
    if (targetRaw == null || String(targetRaw).trim() === "") {
      return res.status(400).json({ ok: false, error: "Укажите участника" });
    }
    const metaRm = await getGroupMeta(groupId);
    if (!metaRm || !groupMetaHasMember(metaRm, myId)) {
      return res.status(403).json({ ok: false, error: "Нет доступа к группе" });
    }
    const creatorNormRm =
      metaRm.createdBy != null && String(metaRm.createdBy).trim() !== ""
        ? normalizeStoredMessageFromId(String(metaRm.createdBy).trim())
        : "";
    const myNormRm = normalizeStoredMessageFromId(myId);
    if (!creatorNormRm || creatorNormRm !== myNormRm) {
      return res.status(403).json({
        ok: false,
        error: "Исключать участников может только создатель группы",
      });
    }
    const targetNormRm = normalizeStoredMessageFromId(
      normalizePeerChatUserId(String(targetRaw).trim()),
    );
    if (!targetNormRm || targetNormRm === myNormRm) {
      return res.status(400).json({
        ok: false,
        error: "Нельзя исключить себя — используйте «Выйти из группы»",
      });
    }
    const curMembersRm = Array.isArray(metaRm.members)
      ? metaRm.members.map((x) => String(x).trim()).filter(Boolean)
      : [];
    const newMembersRm = curMembersRm.filter(
      (x) => normalizeStoredMessageFromId(x) !== targetNormRm,
    );
    if (newMembersRm.length === curMembersRm.length) {
      return res.status(400).json({ ok: false, error: "Пользователь не в группе" });
    }
    metaRm.members = newMembersRm;
    const cmdsRm = [
      ["SET", groupMetaKey(groupId), JSON.stringify(metaRm)],
      ["SREM", userChatGroupsKey(targetNormRm), groupId],
      ["HDEL", CHAT_SEEN_CURSOR_KEY, seenCursorField(targetNormRm, groupId)],
    ];
    const rRm = await redisPipeline(cmdsRm);
    if (!rRm || !Array.isArray(rRm) || rRm.some((x) => x && x.error)) {
      return res.status(500).json({ ok: false, error: "Не удалось обновить состав группы" });
    }
    try {
      let displayMapRm = {};
      try {
        displayMapRm = await getChatDisplayNameMapForIds([myNormRm, targetNormRm]);
      } catch (eNmRm) {
        displayMapRm = {};
      }
      const redisNickActorRm = await getVisitorUsername(myId);
      const actorLabelRm =
        (displayMapRm[myNormRm] && String(displayMapRm[myNormRm]).trim()) ||
        buildChatDisplayName(identity, redisNickActorRm) ||
        "Участник";
      const removedLabelRm =
        (displayMapRm[targetNormRm] && String(displayMapRm[targetNormRm]).trim()) ||
        String(targetNormRm).replace(/^(tg_|vk_)/, "") ||
        "Участник";
      const sysMsgRm = {
        id: "grp_sys_" + Date.now() + "_" + Math.random().toString(36).slice(2, 10),
        groupSystemEvent: "member_removed",
        text: `${actorLabelRm} исключил(а) из группы: ${removedLabelRm}`.slice(0, CHAT_MESSAGE_TEXT_MAX),
        time: new Date().toISOString(),
        from: null,
      };
      const gKeyRm = groupMsgsKey(groupId);
      const nowRm = Date.now();
      const touchRm = touchChatLastSeenCmd(myId, nowRm);
      const sysMsgRmRaw = JSON.stringify(sysMsgRm);
      await redisPipeline([
        ["LPUSH", gKeyRm, sysMsgRmRaw],
        ["LTRIM", gKeyRm, "0", String(MAX_MESSAGES - 1)],
        ["ZADD", CHAT_ONLINE_KEY, String(nowRm), myId],
        ...(touchRm ? [touchRm] : []),
      ]);
      await writeThreadMessageIndex(gKeyRm, sysMsgRm, sysMsgRmRaw);
      await writeThreadMeta(gKeyRm, sysMsgRm);
    } catch (eSysRm) {
      console.error(
        "[chat] removegroupmember system message",
        eSysRm && eSysRm.message ? eSysRm.message : eSysRm,
      );
    }
    return res.status(200).json({
      ok: true,
      groupId,
      memberCount: newMembersRm.length,
      removedUserId: targetNormRm,
    });
  }

  const withId = body.with || body.to || body.userId;
  const text = (body.text || body.message || "").trim();
  let image = body.image;
  if (image && typeof image === "string") {
    const m = image.match(/^data:image\/(jpeg|jpg|png|gif|webp);base64,(.+)$/);
    /* Лимит base64-сегмента (JPEG в чате ~800px, q≈0.92); было 250k — клиент уходил в q=0.6 и «мыло» */
    image = m && m[2] && m[2].length <= 450000 ? image : null;
  }
  if (image) {
    try {
      const { tryUploadChatImageDataUrl } = require("../chat-image-blob");
      const blobUrl = await tryUploadChatImageDataUrl(image, myId);
      if (blobUrl) image = blobUrl;
    } catch (eImgUp) {
      console.error("[chat] chat image blob upload", eImgUp && eImgUp.message ? eImgUp.message : eImgUp);
      if ((process.env.BLOB_READ_WRITE_TOKEN || "").trim()) {
        return res.status(500).json({ ok: false, error: "Не удалось сохранить изображение" });
      }
    }
  }
  let voice = body.voice;
  if (voice && typeof voice === "string") {
    let vRaw = String(voice).trim();
    if (/^data:video\/webm/i.test(vRaw)) vRaw = vRaw.replace(/^data:video\/webm/i, "data:audio/webm");
    else if (/^data:video\/(mp4|quicktime)/i.test(vRaw)) {
      vRaw = vRaw.replace(/^data:video\/(mp4|quicktime)/i, "data:audio/mp4");
    } else if (/^data:application\/octet-stream/i.test(vRaw)) {
      const c = vRaw.indexOf(",");
      if (c > 0) vRaw = "data:audio/webm;base64," + vRaw.slice(c + 1);
    }
    const v = vRaw.match(/^data:audio\/[^,]+,([\s\S]+)$/);
    /* ~900k base64 — около 1.5 мин при 64k; старый лимит резал длинные записи */
    voice = v && v[1] && v[1].length <= 1200000 ? vRaw : null;
  }
  let document = body.document;
  let documentName = (body.documentName && String(body.documentName).trim()) || "document.pdf";
  if (document && typeof document === "string") {
    const dm = document.match(/^data:application\/pdf;base64,([\s\S]+)$/);
    if (!dm || !dm[1] || dm[1].length > 12 * 1024 * 1024) document = null; // ~9MB base64
    else documentName = documentName.slice(0, 200).replace(/[^\w\s.-]/g, "") || "document.pdf";
  } else document = null;
  const replyTo = body.replyTo && typeof body.replyTo === "object" ? {
    id: body.replyTo.id || null,
    text: String(body.replyTo.text || "").slice(0, CHAT_MESSAGE_TEXT_MAX),
    from: body.replyTo.from || null,
    fromName: String(body.replyTo.fromName || "Игрок").slice(0, 100),
  } : null;

  const redisNickSender = await getVisitorUsername(myId);
  const customChatSender = await getVisitorChatDisplayName(myId);
  const senderDisplayName =
    customChatSender && String(customChatSender).trim()
      ? String(customChatSender).trim()
      : buildChatDisplayName(identity, redisNickSender);

  if ((!text || text.length > CHAT_MESSAGE_TEXT_MAX) && !image && !voice && !document) {
    return res.status(400).json({
      ok: false,
      error: "Текст от 1 до " + CHAT_MESSAGE_TEXT_MAX + " символов, картинка, голосовое или документ PDF",
    });
  }
  if (text && text.length > CHAT_MESSAGE_TEXT_MAX) {
    return res.status(400).json({ ok: false, error: "Текст до " + CHAT_MESSAGE_TEXT_MAX + " символов" });
  }

  if (withId) {
    const rawPostWith = String(withId).trim();
    if (isGroupChatId(rawPostWith)) {
      const gMetaPost = await getGroupMeta(rawPostWith);
      if (!gMetaPost || !groupMetaHasMember(gMetaPost, myId)) {
        return res.status(403).json({ ok: false, error: "Нет доступа к группе" });
      }
      const dtIdsGrp = await getDtIds([myId]);
      const msgIdG = "msg_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9);
      const msgG = {
        id: msgIdG,
        from: myId,
        fromName: senderDisplayName,
        fromDtId: dtIdsGrp[myId] || null,
        text: text || "",
        time: new Date().toISOString(),
        ...(image ? { image } : {}),
        ...(voice ? { voice } : {}),
        ...(document ? { document, documentName } : {}),
        ...(replyTo && replyTo.text ? { replyTo } : {}),
      };
      const nowGrp = Date.now();
      const gKey = groupMsgsKey(rawPostWith);
      const touchGrp = touchChatLastSeenCmd(myId, nowGrp);
      const rawMsgG = JSON.stringify(msgG);
      const resultsG2 = await redisPipeline([
        ["LPUSH", gKey, rawMsgG],
        ["LTRIM", gKey, "0", String(MAX_MESSAGES - 1)],
        ["ZADD", CHAT_ONLINE_KEY, String(nowGrp), myId],
        ...(touchGrp ? [touchGrp] : []),
      ]);
      if (!resultsG2 || !Array.isArray(resultsG2) || resultsG2.some((r) => r && r.error)) {
        return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
      }
      await writeThreadMessageIndex(gKey, msgG, rawMsgG);
      await writeThreadMeta(gKey, msgG);
      await bumpThreadPollGen(gKey);
      try {
        const recipientsGrp = Array.isArray(gMetaPost.members)
          ? gMetaPost.members.map((x) => String(x).trim()).filter((rid) => rid && rid !== myId)
          : [];
        if (recipientsGrp.length) await incrementThreadUnreadForRecipients(recipientsGrp, rawPostWith);
      } catch (eUnreadGrp) {}
      const snippetG =
        text ||
        (image ? "Фото" : "") ||
        (voice ? "Голосовое" : "") ||
        (document ? documentName : "") ||
        "Сообщение";
      const membersPush = Array.isArray(gMetaPost.members)
        ? gMetaPost.members.map((x) => String(x).trim()).filter(Boolean)
        : [];
      const groupTitlePush = gMetaPost.title != null ? String(gMetaPost.title).trim() : "";
      runAsyncChatSideEffect("[chat] notifyChatGroupWebPush", async () => {
        const { notifyChatGroupWebPush } = require("../chat-webpush-notify");
        const tasksG = [];
        for (let gi = 0; gi < membersPush.length; gi++) {
          const ridGp = membersPush[gi];
          if (!ridGp || ridGp === myId) continue;
          tasksG.push(
            notifyChatGroupWebPush({
              recipientId: ridGp,
              groupId: rawPostWith,
              senderName: senderDisplayName,
              snippet: String(snippetG).slice(0, 120),
              groupTitle: groupTitlePush,
            })
          );
        }
        if (tasksG.length) await Promise.all(tasksG);
      });
      return res.status(200).json({ ok: true, message: msgG, trace: buildChatTrace({ mode: "post_group", waited: false }) });
    }

    const otherId = normalizePeerChatUserId(withId);
    if (otherId === myId) return res.status(400).json({ ok: false, error: "Нельзя отправить себе" });

    const key = convKey(myId, otherId);
    const dtIdsForMsg = await getDtIds([myId]);
    const msgId = "msg_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9);
    const msg = {
      id: msgId,
      from: myId,
      fromName: senderDisplayName,
      fromDtId: dtIdsForMsg[myId] || null,
      text: text || "",
      time: new Date().toISOString(),
      ...(image ? { image } : {}),
      ...(voice ? { voice } : {}),
      ...(document ? { document, documentName } : {}),
      ...(replyTo && replyTo.text ? { replyTo } : {}),
    };

    const now = Date.now();
    const cleanupRomanAlias =
      otherId === "tg_" + TELEGRAM_ROMAN_NUMERIC ? [["SREM", "poker_app:chat_partners:" + myId, "tg_roman"]] : [];
    const touchDmSend = touchChatLastSeenCmd(myId, now);
    const rawMsg = JSON.stringify(msg);
    const results = await redisPipeline([
      ["LPUSH", key, rawMsg],
      ["LTRIM", key, "0", String(MAX_MESSAGES - 1)],
      ["SADD", "poker_app:chat_partners:" + myId, otherId],
      ["SADD", "poker_app:chat_partners:" + otherId, myId],
      ["ZADD", CHAT_ONLINE_KEY, String(now), myId],
      ...(touchDmSend ? [touchDmSend] : []),
      ...cleanupRomanAlias,
    ]);

    if (!results || !Array.isArray(results) || results.some((r) => r && r.error)) {
      return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
    }
    await writeThreadMessageIndex(key, msg, rawMsg);
    await writeThreadMeta(key, msg);
    await bumpThreadPollGen(key);
    try {
      await incrementThreadUnreadForRecipients([otherId], myId);
    } catch (eUnreadDm) {}

    if (otherId.startsWith("tg_")) {
      const otherTgId = otherId.replace(/^tg_/, "");
      if (otherTgId.match(/^\d+$/) && BOT_TOKEN) {
        const tgBody =
          text ||
          (image ? "📷 фото" : "") ||
          (voice ? "🎤 голосовое" : "") ||
          (document ? "📎 " + documentName : "") ||
          "сообщение";
        const openDm = buildClubChatMiniAppLink();
        runAsyncChatSideEffect("[chat] sendTelegram dm", function () {
          return sendTelegram(otherTgId, "💬 " + senderDisplayName + ": " + tgBody, {
            text: "Открыть чат",
            url: openDm,
          });
        });
      }
    }

    const snippet =
      text ||
      (image ? "Фото" : "") ||
      (voice ? "Голосовое" : "") ||
      (document ? documentName : "") ||
      "Сообщение";
    runAsyncChatSideEffect("[chat] notifyChatDmWebPush", async () => {
      const { notifyChatDmWebPush } = require("../chat-webpush-notify");
      await notifyChatDmWebPush({
        recipientId: otherId,
        senderId: myId,
        senderName: senderDisplayName,
        snippet: String(snippet).slice(0, 120),
      });
    });

    return res.status(200).json({ ok: true, message: msg, trace: buildChatTrace({ mode: "post_dm", waited: false }) });
  }

  const blockedCheck = await redisPipeline([["SISMEMBER", BLOCKED_KEY, myId]]);
  const amBlocked = blockedCheck && blockedCheck[0] && blockedCheck[0].result === 1;
  if (amBlocked) return res.status(403).json({ ok: false, error: "Вы заблокированы в чате" });

  if (!(await hasClubGeneralAccess(myId, admin))) {
    const stPost = await getClubChatAccessState(myId, admin);
    if (stPost === "revoked") {
      return res.status(403).json({ ok: false, error: "Доступ к общему чату отозван администратором." });
    }
    return res.status(403).json({
      ok: false,
      error: clubChatApplicationRequired()
        ? "Нет доступа к общему чату. Подайте заявку и дождитесь одобрения."
        : "Нет доступа к общему чату.",
    });
  }

  const dtIds = await getDtIds([myId]);
  const msgId = "msg_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9);
  const msg = {
    id: msgId,
    from: myId,
    fromName: senderDisplayName,
    fromDtId: dtIds[myId] || null,
    text: text || "",
    time: new Date().toISOString(),
    ...(image ? { image } : {}),
    ...(voice ? { voice } : {}),
    ...(document ? { document, documentName } : {}),
    ...(replyTo && replyTo.text ? { replyTo } : {}),
  };

  const now = Date.now();
  const touchPostGen = touchChatLastSeenCmd(myId, now);
  const rawGeneralMsg = JSON.stringify(msg);
  const results = await redisPipeline([
    ["LPUSH", GENERAL_KEY, rawGeneralMsg],
    ["LTRIM", GENERAL_KEY, "0", String(MAX_MESSAGES - 1)],
    ["ZADD", CHAT_ONLINE_KEY, String(now), myId],
    ...(touchPostGen ? [touchPostGen] : []),
  ]);

  if (!results || !Array.isArray(results) || results.some((r) => r && r.error)) {
    return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
  }
  await writeThreadMessageIndex(GENERAL_KEY, msg, rawGeneralMsg);
  await writeThreadMeta(GENERAL_KEY, msg);
  try {
    const rosterIds = await getGeneralChatRosterMemberIds(myId, admin);
    const recipientsGeneral = (rosterIds && Array.isArray(rosterIds.memberIds) ? rosterIds.memberIds : []).filter((id) => id && id !== myId);
    if (recipientsGeneral.length) await incrementGeneralUnreadForRecipients(recipientsGeneral);
  } catch (eUnreadGeneral) {}

  const snippet =
    text ||
    (image ? "Фото" : "") ||
    (voice ? "Голосовое" : "") ||
    (document ? documentName : "") ||
    "Сообщение";
  runAsyncChatSideEffect("[chat] triggerGeneralChatWebPush", async () => {
    const { triggerGeneralChatWebPush } = require("../chat-webpush-notify");
    await triggerGeneralChatWebPush({
      senderId: myId,
      senderName: senderDisplayName,
      snippet: String(snippet).slice(0, 120),
    });
  });

  return res.status(200).json({ ok: true, message: msg, trace: buildChatTrace({ mode: "post_general", waited: false }) });
};
