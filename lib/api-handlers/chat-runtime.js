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
const { ensureDtIdForUserId, getPreferredUserIdByDtId, getUserIdByDtId } = require("../account-id");
const { PROFILE_HASH_KEY } = require("../pokerplus");
const TELEGRAM_VISIBLE_KEY = "poker_app:telegram_visible";
const {
  buildChatDisplayName,
  chatLastSeenIsoFromRedisRaw,
  normalizeLegacyAccountDisplayLabel,
} = require("../chat-display-label");
const {
  pokerProfileFeeFromCachedProfile,
  pokerProfileStatusFromRakeServer,
} = require("../chat-profile-status");
const { createChatProfileLookupHelpers } = require("../chat-profile-lookups");
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
  unreadHashKey,
} = require("../chat-unread");
const { createChatReadReceiptHelpers } = require("../chat-read-receipts");
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
  OLDER_MESSAGES_BATCH,
  sliceMessagesBeforeCursor,
} = require("../chat-pagination");
const { buildGroupMembersPublicList: buildGroupMembersPublicListBase } = require("../chat-group-members");
const {
  deleteThreadMessageIndex: deleteThreadMessageIndexBase,
  locateThreadMessageById: locateThreadMessageByIdBase,
  writeThreadMessageIndex: writeThreadMessageIndexBase,
  writeThreadMeta: writeThreadMetaBase,
} = require("../chat-thread-store");
const { dispatchChatRoute, prepareChatRequest } = require("../chat-request-router");
const { rejectBlockedAppUser } = require("../app-user-blocks");
const { resolveMessageCommandThread } = require("../chat-thread-commands");
const { createChatDeleteHandler, createChatPatchHandler } = require("../chat-message-actions");
const { createChatGetHandler } = require("../chat-route-get");
const { createChatPostHandler } = require("../chat-route-post");

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
const CHAT_CONTACTS_UPDATE_REV_HASH = "poker_app:chat_updates_rev";
const RESPECT_SCORE_KEY = "poker_app:respect_score";
const ONLINE_TTL_MS = 5 * 60 * 1000; // 5 минут
const {
  applyPeerReadReceiptsToMyMessages,
  bumpGeneralLastSeen: bumpGeneralLastSeenBase,
  bumpSeenCursor: bumpSeenCursorBase,
  getGeneralLastSeen,
  getSeenCursor,
  seenCursorField,
} = createChatReadReceiptHelpers({
  CHAT_GENERAL_SEEN_HASH,
  CHAT_GENERAL_UNREAD_HASH,
  CHAT_SEEN_CURSOR_KEY,
  chatMessageTimeMs,
  normalizeStoredMessageFromId,
  redisPipeline,
  unreadHashKey,
});

/** Добавить в pipeline сразу после обновления presence в ZSET. */
function touchChatLastSeenCmd(userId, nowMs) {
  const id = userId != null ? String(userId).trim() : "";
  if (!id) return null;
  return ["HSET", CHAT_LAST_SEEN_HASH, id, String(nowMs)];
}
function chatTypingKey(recipientId, senderId) {
  return CHAT_TYPING_KEY_PREFIX + String(recipientId || "").trim() + ":" + String(senderId || "").trim();
}

function normalizeContactsUpdateRevUserIds(userIds) {
  return [
    ...new Set(
      (Array.isArray(userIds) ? userIds : [userIds])
        .map((id) => {
          const raw = String(id || "").trim();
          return raw.startsWith("guest_") ? raw : normalizePeerChatUserId(raw);
        })
        .filter((id) => id && (id.startsWith("tg_") || id.startsWith("vk_") || id.startsWith("guest_")))
    ),
  ];
}

function contactsUpdateRevField(userId) {
  const id = normalizeContactsUpdateRevUserIds([userId])[0] || "";
  return id ? "contacts:" + id : "";
}

async function bumpContactsUpdateRev(userIds) {
  const ids = normalizeContactsUpdateRevUserIds(userIds);
  if (!ids.length) return;
  try {
    await redisPipeline(ids.map((id) => ["HINCRBY", CHAT_CONTACTS_UPDATE_REV_HASH, "contacts:" + id, 1]));
  } catch (eContactsRev) {}
}

async function bumpGeneralContactsUpdateRev() {
  try { await redisPipeline([["HINCRBY", CHAT_CONTACTS_UPDATE_REV_HASH, "general", 1]]); } catch (eGeneralContactsRev) {}
}

async function getContactsUpdateRev(userId) {
  const field = contactsUpdateRevField(userId);
  if (!field) return "contacts-rev|0|0";
  const raw = await redisPipeline([["HMGET", CHAT_CONTACTS_UPDATE_REV_HASH, field, "general"]]);
  const row = raw && raw[0] && Array.isArray(raw[0].result) ? raw[0].result : [];
  const userRev = row[0] != null && row[0] !== false ? Math.max(0, parseInt(String(row[0]), 10) || 0) : 0;
  const generalRev = row[1] != null && row[1] !== false ? Math.max(0, parseInt(String(row[1]), 10) || 0) : 0;
  return ["contacts-rev", userRev, generalRev].join("|");
}

async function resetThreadUnread(viewerId, peerId) {
  await resetThreadUnreadBase(redisPipeline, viewerId, peerId);
  await bumpContactsUpdateRev([viewerId]);
}
async function resetGeneralUnread(userId) {
  await resetGeneralUnreadBase(redisPipeline, userId);
  await bumpContactsUpdateRev([userId]);
}
async function incrementThreadUnreadForRecipients(recipientIds, peerId) {
  await incrementThreadUnreadForRecipientsBase(redisPipeline, recipientIds, peerId);
  await bumpContactsUpdateRev(recipientIds);
}
async function incrementGeneralUnreadForRecipients(recipientIds) {
  await incrementGeneralUnreadForRecipientsBase(redisPipeline, recipientIds);
  await bumpContactsUpdateRev(recipientIds);
}
async function bumpSeenCursor(viewerId, peerId, latestIso) {
  await bumpSeenCursorBase(viewerId, peerId, latestIso);
  await bumpContactsUpdateRev([viewerId]);
}
async function bumpGeneralLastSeen(userId, latestIso) {
  await bumpGeneralLastSeenBase(userId, latestIso);
  await bumpContactsUpdateRev([userId]);
}
/** Текст сообщения (Telegram sendMessage — до 4096, чтобы ЛС-уведомления не обрезались). */
const CHAT_MESSAGE_TEXT_MAX = 4096;
const DT_IDS_KEY = "poker_app:visitor_dt_ids";
const POKERPLUS_BIND_HASH_KEY = "poker_app:pokerplus_user_ids";
const USERNAMES_KEY = "poker_app:visitor_usernames";
const FRIEND_ALIAS_KEY_PREFIX = "poker_app:friend_alias:";
const FRIENDS_SET_KEY_PREFIX = "poker_app:friends:";
const FRIENDSHIPS_SET_KEY_PREFIX = "poker_app:friendships:";
const FRIEND_REQUESTS_OUT_KEY_PREFIX = "poker_app:friend_requests:out:";
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
const CHAT_DISPLAY_NAMES_KEY = "poker_app:visitor_chat_display_names";
const GENERAL_CHAT_CONTACTS_STATS_CACHE_KEY = "poker_app:chat_general_contacts_stats";
const GENERAL_CHAT_CONTACTS_STATS_TTL_SEC = 30;
const MAX_MESSAGES = 40;
const FRIEND_CONTACT_NAME_MAX = 80;
const CHAT_DISPLAY_NAME_MAX = 80;
const {
  getAvatars,
  getDtIds,
  getP21Ids,
  getPokerPlusVerifiedIds,
  getPokerProfileStatusMeta,
  getRespectScores,
  presetAvatarIdForAccountId,
  resolveChatAvatarValue,
  sanitizeAvatarAccountId,
} = createChatProfileLookupHelpers({
  AVATAR_PREFIX,
  DT_IDS_KEY,
  POKERPLUS_BIND_HASH_KEY,
  PRESET_AVATAR_IDS,
  PRESET_AVATAR_SRC_BY_ID,
  PROFILE_HASH_KEY,
  RESPECT_SCORE_KEY,
  normalizePeerChatUserId,
  pokerProfileFeeFromCachedProfile,
  pokerProfileStatusFromRakeServer,
  redisPipeline,
});
/** Групповые чаты: метаданные, лента сообщений, индекс «группы пользователя». */
async function writeThreadMeta(redisKey, msg) {
  const result = await writeThreadMetaBase(redisPipeline, redisKey, msg);
  if (String(redisKey || "") === GENERAL_KEY) await bumpGeneralContactsUpdateRev();
  return result;
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
    const isGroup = c.isGroupChat ? 1 : 0;
    const memberCount = c.memberCount != null ? Math.max(0, parseInt(String(c.memberCount), 10) || 0) : 0;
    const lastTime = c.lastMessageTime != null ? String(c.lastMessageTime) : "";
    const preview = c.lastMessagePreview != null ? String(c.lastMessagePreview) : "";
    return [rowId, unread, isGroup, memberCount, lastTime, preview].join("~");
  });
  /* Presence changes are intentionally excluded: online-only churn should not wake long-poll or refetch contacts. */
  return [
    "contacts-meta",
    rows.length,
    rows.join("^"),
    payload.participantsCount != null ? Math.max(0, parseInt(String(payload.participantsCount), 10) || 0) : 0,
    payload.generalUnreadCount != null ? Math.max(0, parseInt(String(payload.generalUnreadCount), 10) || 0) : 0,
    payload.clubChatAccess != null ? String(payload.clubChatAccess) : "",
    payload.clubChatPendingReviewCount != null
      ? Math.max(0, parseInt(String(payload.clubChatPendingReviewCount), 10) || 0)
      : 0,
    payload.generalChatParticipantsCount != null
      ? Math.max(0, parseInt(String(payload.generalChatParticipantsCount), 10) || 0)
      : 0,
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
  const fullRes = await redisPipeline([["LRANGE", redisKey, "0", "-1"]], {
    context: "chat.runtime.findMessage.fallback",
    allowLargeRedisRead: true,
  });
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
  const skipPresence =
    req && req.query && (req.query.skipPresence === "1" || req.query.skipPresence === "true");
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
      confirmedFriendIds: true,
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
  const friendsEarlyRes = await redisPipeline([
    ["SMEMBERS", FRIENDSHIPS_SET_KEY_PREFIX + viewerAccountId],
    ["HKEYS", FRIEND_REQUESTS_OUT_KEY_PREFIX + viewerAccountId],
  ]);
  const friendIdsForResponse =
    friendsEarlyRes && friendsEarlyRes[0] && Array.isArray(friendsEarlyRes[0].result)
      ? friendsEarlyRes[0].result.map((x) => (x != null ? String(x) : "")).filter(Boolean)
      : [];
  const outgoingFriendRequestAccountIds =
    friendsEarlyRes && friendsEarlyRes[1] && Array.isArray(friendsEarlyRes[1].result)
      ? friendsEarlyRes[1].result.map((x) => (x != null ? String(x) : "")).filter(Boolean)
      : [];
  const outgoingFriendRequestChatIds = outgoingFriendRequestAccountIds.length
    ? (await Promise.all(outgoingFriendRequestAccountIds.map((id) => getUserIdByDtId(id))))
        .map((id) => (id != null ? String(id) : ""))
        .filter(Boolean)
    : [];
  const outgoingFriendRequestIdsForResponse = [
    ...new Set(outgoingFriendRequestAccountIds.concat(outgoingFriendRequestChatIds)),
  ];
  const idsForOnline = [...new Set(partnerIds)];
  const onlineSet = new Set();
  let onlineCount = skipPresence ? undefined : 0;
  if (!skipPresence && idsForOnline.length > 0) {
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
  if (!skipPresence) {
    onlineCount = visiblePartnerIds.reduce((count, id) => count + (onlineSet.has(id) ? 1 : 0), 0);
  }
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
      const groupRow = {
        id: gid,
        unreadCount: unreadGrp,
        isGroupChat: true,
        memberCount: gMembers.length,
      };
      if (!skipPresence) groupRow.online = false;
      groupContacts.push(groupRow);
      if (metaLastRawG) lastMessageTime[gid] = metaLastRawG;
      if (metaPreviewRawG) lastMessagePreview[gid] = metaPreviewRawG;
    }
  }
  const directContacts = visiblePartnerIds.map((id) => {
    const row = {
      id,
      unreadCount: unreadCounts[id] != null ? unreadCounts[id] : 0,
      isGroupChat: false,
    };
    if (!skipPresence) row.online = onlineSet.has(id);
    return row;
  });
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
  const generalChatStats = skipPresence ? {} : await buildGeneralChatStatsForContacts(myId, admin);
  const generalPreviewRes = await redisPipeline([["HGET", threadMetaKeyByStorageKey(GENERAL_KEY), "lastMessagePreview"]]);
  const generalChatPreview =
    generalPreviewRes && generalPreviewRes[0] && generalPreviewRes[0].result != null
      ? String(generalPreviewRes[0].result).trim()
      : "";
  return {
    ok: true,
    contactsMetaOnly: true,
    contacts: metaContacts.map((c) => {
      const row = {
        id: c.id,
        unreadCount: c.unreadCount != null ? c.unreadCount : 0,
        isGroupChat: !!c.isGroupChat,
        memberCount: c.memberCount != null ? c.memberCount : undefined,
        lastMessageTime: lastMessageTime[c.id] || "",
        lastMessagePreview: lastMessagePreview[c.id] || "",
      };
      if (!skipPresence) row.online = !!c.online;
      return row;
    }),
    friendIds: friendIdsForResponse,
    confirmedFriendIds: true,
    friendRequestOutgoingIds: outgoingFriendRequestIdsForResponse,
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
  /* Без roster/ZSCORE: иначе каждый poll при notModified всё равно делал тысячи обращений к Redis.
   * Счётчики участников/онлайн обновляются при полной загрузке mode=general (не чаще, чем меняется лента/pin). */
  const needPendingBadge = admin && clubChatApplicationRequired();
  const cmds = [
    ["LLEN", GENERAL_KEY],
    ["LINDEX", GENERAL_KEY, "0"],
    ["GET", GENERAL_PINNED_KEY],
  ];
  const pendingCountPromise = needPendingBadge ? getClubChatPendingCount() : Promise.resolve(0);
  const [raw, pendingNRaw] = await Promise.all([redisPipeline(cmds), pendingCountPromise]);
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
  }
  if (needPendingBadge) pendingN = Number(pendingNRaw) || 0;
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
  const visibilityRes = await redisPipeline(
    memberIds.map((id) => ["HGET", TELEGRAM_VISIBLE_KEY, dtIdsMap[id] || id])
  );
  const myNorm = normalizeStoredMessageFromId(myId);
  const members = memberIds.map((id, idx) => {
    const rawAl = aliasRow[idx];
    const aliasLabel =
      rawAl != null && rawAl !== false ? sanitizeFriendContactNameForChat(rawAl) : "";
    const telegramVisible = !!(
      visibilityRes && visibilityRes[idx] && String(visibilityRes[idx].result || "") === "1"
    );
    const tgUserRaw = telegramVisible && usernameRow[idx] != null && usernameRow[idx] !== false
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

/** Telegram @username без префикса @, как в HGET visitor_usernames. */
async function getVisitorUsername(tgUserId) {
  if (!tgUserId || typeof tgUserId !== "string") return null;
  const r = await redisPipeline([["HGET", USERNAMES_KEY, tgUserId]]);
  const v = r && r[0] && r[0].result != null ? String(r[0].result).trim() : "";
  return v || null;
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

const chatRouteDeps = {
  ADMIN_IDS,
  AVATAR_PREFIX,
  BLOCKED_KEY,
  BOT_TOKEN,
  CHAT_DISPLAY_NAMES_KEY,
  CHAT_DISPLAY_NAME_MAX,
  CHAT_DM_FOCUS_KEY_PREFIX,
  CHAT_GENERAL_SEEN_HASH,
  CHAT_GENERAL_UNREAD_HASH,
  CHAT_GROUP_MEMBERS_MAX,
  CHAT_LAST_SEEN_HASH,
  CHAT_MESSAGE_TEXT_MAX,
  CHAT_ONLINE_KEY,
  CHAT_SEEN_CURSOR_KEY,
  CHAT_THREAD_POLL_GEN_HASH,
  CHAT_TYPING_TTL_SEC,
  CLUB_CHAT_MEMBER_JOINED_AT_KEY,
  CLUB_CHAT_MEMBERS_KEY,
  CLUB_CHAT_PENDING_KEY,
  DT_IDS_KEY,
  FRIENDS_SET_KEY_PREFIX,
  FRIENDSHIPS_SET_KEY_PREFIX,
  FRIEND_REQUESTS_OUT_KEY_PREFIX,
  FRIEND_ALIAS_KEY_PREFIX,
  GENERAL_CHAT_ACCESS_REVOKED_KEY,
  GENERAL_CHAT_CONTACTS_STATS_CACHE_KEY,
  GENERAL_CHAT_CONTACTS_STATS_TTL_SEC,
  GENERAL_CHAT_ROSTER_SCORE_CHUNK,
  GENERAL_KEY,
  GENERAL_PINNED_KEY,
  MAX_MESSAGES,
  MINI_APP_URL,
  OLDER_MESSAGES_BATCH,
  ONLINE_TTL_MS,
  POKERPLUS_BIND_HASH_KEY,
  PRESET_AVATAR_IDS,
  PRESET_AVATAR_SRC_BY_ID,
  PROFILE_HASH_KEY,
  RESPECT_SCORE_KEY,
  TELEGRAM_ROMAN_NUMERIC,
  USERNAMES_KEY,
  VISITORS_SET_KEY,
  applyPeerChatDisplayNamesToMessages,
  applyPeerReadReceiptsToMyMessages,
  applyViewerFriendAliasesToMessages,
  buildChatDisplayName,
  buildChatTrace,
  buildClubChatMiniAppLink,
  buildContactsMetaOnlyPayload,
  buildGeneralChatRosterPayload,
  buildGeneralChatStatsForContacts,
  buildGeneralPinnedSnapshot,
  buildGroupMembersPublicList,
  buildThreadPreviewText,
  bumpContactsUpdateRev,
  bumpGeneralLastSeen,
  bumpGeneralContactsUpdateRev,
  bumpSeenCursor,
  bumpThreadPollGen,
  chatLastSeenIsoFromRedisRaw,
  chatMessageIsNewerThanLastViewed,
  chatMessageTimeMs,
  chatTypingKey,
  clubChatApplicationRequired,
  collectMessageFromIdsForAlias,
  computeContactsMetaPollRev,
  computeDmThreadPollRev,
  computeGeneralPollRev,
  computeGroupThreadPollRev,
  convKey,
  countOnlineAmongMemberIds,
  delay,
  ensureDtIdForUserId,
  enrichClubUserList,
  filterChatPartnersWithThreadContent,
  filterMessagesAfterCursor,
  findMessageByIdTailFirst,
  getAvatars,
  getChatDisplayNameMapForIds,
  getClubChatAccessState,
  getClubChatPendingCount,
  getDtIds,
  getFriendAliasMapForViewer,
  getGeneralChatRosterMemberIds,
  getGeneralLastSeen,
  getContactsUpdateRev,
  getGroupMeta,
  getP21Ids,
  getPokerPlusVerifiedIds,
  getPokerProfileStatusMeta,
  getPreferredUserIdByDtId,
  getRespectScores,
  getSeenCursor,
  getVisitorChatDisplayName,
  getVisitorUsername,
  groupMetaHasMember,
  groupMetaKey,
  groupMsgsKey,
  hasClubGeneralAccess,
  incrementGeneralUnreadForRecipients,
  incrementThreadUnreadForRecipients,
  isAdmin,
  isGroupChatId,
  locateThreadMessageById,
  mergeReadCursors,
  normalizeLegacyAccountDisplayLabel,
  normalizePeerChatUserId,
  normalizeStoredMessageFromId,
  notifyAdminsNewClubChatApplication,
  pipelineCommandResults,
  pokerProfileFeeFromCachedProfile,
  pokerProfileStatusFromRakeServer,
  presetAvatarIdForAccountId,
  readContactsMetaOnlyFlag,
  readGroupMetaOnlyFlag,
  redisPipeline,
  resetGeneralUnread,
  resetThreadUnread,
  resolveChatAvatarValue,
  runAsyncChatSideEffect,
  sanitizeAvatarAccountId,
  sanitizeChatDisplayNameStored,
  sanitizeFriendContactNameForChat,
  sanitizeGroupAvatarInput,
  sanitizeGroupDescription,
  sanitizeGroupTitle,
  seenCursorField,
  sendTelegram,
  sliceMessagesBeforeCursor,
  sortContactsByLastMessageTime,
  threadMetaKeyByStorageKey,
  threadMessageIndexKey,
  touchChatLastSeenCmd,
  tryBuildFastTailResponse,
  unreadHashKey,
  userChatGroupsKey,
  waitForPollRevChange,
  writeThreadMessageIndex,
  writeThreadMeta,
};

const handleChatGet = createChatGetHandler(chatRouteDeps);
const handleChatPost = createChatPostHandler(chatRouteDeps);

const handleChatDelete = createChatDeleteHandler({
  GENERAL_KEY,
  GENERAL_PINNED_KEY,
  bumpContactsUpdateRev,
  bumpGeneralContactsUpdateRev,
  bumpThreadPollGen,
  convKey,
  deleteThreadMessageIndex,
  getGroupMeta,
  groupMetaHasMember,
  groupMsgsKey,
  hasClubGeneralAccess,
  isGroupChatId,
  locateThreadMessageById,
  normalizePeerChatUserId,
  normalizeStoredMessageFromId,
  redisPipeline,
  resolveMessageCommandThread,
});

const handleChatPatch = createChatPatchHandler({
  BLOCKED_KEY,
  CHAT_MESSAGE_TEXT_MAX,
  CHAT_REACTION_EMOJI_ALLOWED,
  CHAT_TYPING_TTL_SEC,
  CLUB_CHAT_MEMBER_JOINED_AT_KEY,
  CLUB_CHAT_MEMBERS_KEY,
  CLUB_CHAT_PENDING_KEY,
  GENERAL_CHAT_ACCESS_REVOKED_KEY,
  GENERAL_KEY,
  GENERAL_PINNED_KEY,
  VISITORS_SET_KEY,
  buildGeneralPinnedSnapshot,
  bumpContactsUpdateRev,
  bumpGeneralContactsUpdateRev,
  bumpThreadPollGen,
  chatTypingKey,
  clubChatApplicationRequired,
  convKey,
  findMessageByIdTailFirst,
  getClubChatAccessState,
  getGroupMeta,
  groupMetaHasMember,
  groupMsgsKey,
  hasClubGeneralAccess,
  isAdmin,
  isGroupChatId,
  locateThreadMessageById,
  normalizePeerChatUserId,
  normalizeStoredMessageFromId,
  notifyAdminsNewClubChatApplication,
  redisPipeline,
  resolveMessageCommandThread,
  writeThreadMessageIndex,
});

module.exports = async function handler(req, res) {
  const chatRequest = await prepareChatRequest(req, res, {
    botToken: BOT_TOKEN,
    redisConfigured,
    rejectIfPayloadTooLarge,
    rateLimit,
    resolveTelegramIdentity,
    memberIdFromIdentity,
    isAdmin,
    isApiAdminIdentity,
    rejectBlockedAppUser,
  });
  if (chatRequest.handled) return;
  return dispatchChatRoute(chatRequest, {
    DELETE: handleChatDelete,
    PATCH: handleChatPatch,
    GET: handleChatGet,
    POST: handleChatPost,
  });
};
