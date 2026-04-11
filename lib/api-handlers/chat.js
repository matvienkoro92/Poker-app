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
const { sendTelegramMessage: sendTelegramBotMessage } = require("../telegram-bot-send");

/** Допустимые эмодзи реакций: базовый (🔥 первым) + покерный. Синхронизировать с `#chatReactionPicker` и `.chat-ctx-menu__reactions` в index.html. */
const CHAT_REACTION_EMOJI_BASIC = [
  "🔥",
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

/** Числовой Telegram id Романа (закреплён в миниаппе как tg_roman). Совпадает с первым id в дефолтном TELEGRAM_ADMIN_ID при необходимости задать вручную: TELEGRAM_ROMAN_CHAT_ID */
const TELEGRAM_ROMAN_NUMERIC = String(process.env.TELEGRAM_ROMAN_CHAT_ID || "388008256").replace(/^tg_/, "");

function normalizePeerChatUserId(raw) {
  const s = String(raw || "").trim();
  if (!s) return s;
  if (isGroupChatId(s)) return s;
  /* Иначе «tg_roman» остаётся как есть (уже tg_*), isAdmin = false, в списке контактов дублируется закреплённый диалог */
  if (s.toLowerCase() === "tg_roman") return "tg_" + TELEGRAM_ROMAN_NUMERIC;
  if (s.startsWith("tg_") || s.startsWith("vk_")) return s;
  return "tg_" + s;
}

/** Старые записи в Redis могли хранить from как голый числовой id Telegram. */
function normalizeStoredMessageFromId(from) {
  if (from == null || from === "") return from;
  const s = String(from).trim();
  if (s.startsWith("tg_") || s.startsWith("vk_") || s.startsWith("guest_")) return s;
  if (/^\d+$/.test(s)) return `tg_${s}`;
  return s;
}

/** Непрочитанность: строковое сравнение time ломалось (…Z vs …000Z и т.п.). */
function chatMessageTimeMs(t) {
  if (t == null || t === "") return NaN;
  const ms = Date.parse(String(t).trim());
  return Number.isNaN(ms) ? NaN : ms;
}
/** Сообщение строго новее отметки «просмотрено до». Пустая lastViewed — как раньше (time > ""). */
function chatMessageIsNewerThanLastViewed(messageTime, lastViewed) {
  const msgMs = chatMessageTimeMs(messageTime);
  if (Number.isNaN(msgMs)) return false;
  if (lastViewed == null || lastViewed === "") return true;
  const lastMs = chatMessageTimeMs(lastViewed);
  if (Number.isNaN(lastMs)) return true;
  return msgMs > lastMs;
}
/** Две отметки (клиент localStorage + сервер Redis): берём более позднюю, чтобы непрочитанные не «возвращались» после перезапуска. */
function mergeReadCursors(isoA, isoB) {
  const a = isoA != null ? String(isoA).trim() : "";
  const b = isoB != null ? String(isoB).trim() : "";
  const ma = chatMessageTimeMs(a);
  const mb = chatMessageTimeMs(b);
  const na = Number.isNaN(ma);
  const nb = Number.isNaN(mb);
  if (na && nb) return "";
  if (na) return b;
  if (nb) return a;
  return mb >= ma ? b : a;
}
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const MINI_APP_URL = process.env.MINI_APP_URL || process.env.APP_URL || "";
/** База Mini App для deep link (если env пуст или с опечаткой вроде …DvaTuza) */
const DEFAULT_TELEGRAM_MINI_APP = "https://t.me/Poker_dvatuza_bot/DvaTuza";

/** Ссылка открытия приложения с startapp=club_chat (без лишней «)» перед ?). */
function buildClubChatMiniAppLink() {
  let base = String(MINI_APP_URL || "").trim();
  if (!base || base.indexOf("t.me/") === -1) base = DEFAULT_TELEGRAM_MINI_APP;
  else base = base.replace(/\/+$/, "").replace(/\)+$/, "");
  const sep = base.includes("?") ? "&" : "?";
  return base + sep + "startapp=club_chat";
}
const ADMIN_IDS = (process.env.TELEGRAM_ADMIN_ID || "388008256,2144406710,1897001087")
  .toString()
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const GENERAL_KEY = "poker_app:chat_messages";
/** Закрепление сообщения в общем чате для всех (JSON-снимок, только админ). */
const GENERAL_PINNED_KEY = "poker_app:general_chat_pinned";

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
/** Включено, если не задано CLUB_CHAT_REQUIRE_APPLICATION=0 */
function clubChatApplicationRequired() {
  return String(process.env.CLUB_CHAT_REQUIRE_APPLICATION || "1").trim() !== "0";
}
const CLUB_CHAT_PENDING_KEY = "poker_app:club_chat_pending";
const CLUB_CHAT_MEMBERS_KEY = "poker_app:club_chat_members";
const CLUB_CHAT_MEMBER_JOINED_AT_KEY = "poker_app:club_chat_member_joined_at";
/** Открытый главный чат: id, которым админ отозвал доступ (SREM visitors + SADD сюда). */
const GENERAL_CHAT_ACCESS_REVOKED_KEY = "poker_app:club_chat_general_revoked";

/** Число заявок в очереди (для бейджа у админа). */
async function getClubChatPendingCount() {
  if (!clubChatApplicationRequired()) return 0;
  const r = await redisPipeline([["SCARD", CLUB_CHAT_PENDING_KEY]]);
  const v = r && r[0] && r[0].result;
  if (v == null) return 0;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}
const BLOCKED_KEY = "poker_app:chat_blocked";
const CHAT_ONLINE_KEY = "poker_app:chat_online";
/** HSET: поле «viewerId|peerId» → ISO времени последнего сообщения в треде, которое viewer открыл в GET чата */
const CHAT_SEEN_CURSOR_KEY = "poker_app:chat_seen_cursor";
/** HASH userId → ISO: пользователь открыл общий чат и догрузил ленту (для счётчика непрочитанных без единственной опоры на localStorage). */
const CHAT_GENERAL_SEEN_HASH = "poker_app:chat_general_seen";
/** STRING peerId, TTL: клиент пингует, пока открыт личный диалог с этим peer — Web Push в ЛС не шлём */
const CHAT_DM_FOCUS_KEY_PREFIX = "poker_app:chat_dm_focus:";
const RESPECT_SCORE_KEY = "poker_app:respect_score";
const ONLINE_TTL_MS = 5 * 60 * 1000; // 5 минут
/** Текст сообщения (Telegram sendMessage — до 4096, чтобы ЛС-уведомления не обрезались). */
const CHAT_MESSAGE_TEXT_MAX = 4096;
const DT_IDS_KEY = "poker_app:visitor_dt_ids";
const P21_IDS_KEY = "poker_app:visitor_p21_ids";
const USERNAMES_KEY = "poker_app:visitor_usernames";
const FRIEND_ALIAS_KEY_PREFIX = "poker_app:friend_alias:";
const FRIENDS_SET_KEY_PREFIX = "poker_app:friends:";
const AVATAR_PREFIX = "poker_app:avatar:";
const CHAT_DISPLAY_NAMES_KEY = "poker_app:visitor_chat_display_names";
const MAX_MESSAGES = 100;
const FRIEND_CONTACT_NAME_MAX = 80;
const CHAT_DISPLAY_NAME_MAX = 80;
/** Групповые чаты: метаданные, лента сообщений, индекс «группы пользователя». */
const CHAT_GROUP_META_PREFIX = "poker_app:chat_group_meta:";
const CHAT_GROUP_MSG_PREFIX = "poker_app:chat_group_msgs:";
const USER_CHAT_GROUPS_SET_PREFIX = "poker_app:user_chat_groups:";
const CHAT_GROUP_TITLE_MAX = 100;
const CHAT_GROUP_DESCRIPTION_MAX = 2000;
const CHAT_GROUP_MEMBERS_MAX = 50;

function isGroupChatId(s) {
  const t = String(s || "").trim();
  return /^group_[a-z0-9_]{8,72}$/i.test(t);
}
function groupMetaKey(id) {
  return CHAT_GROUP_META_PREFIX + String(id).trim();
}
function groupMsgsKey(id) {
  return CHAT_GROUP_MSG_PREFIX + String(id).trim();
}
function userChatGroupsKey(userId) {
  return USER_CHAT_GROUPS_SET_PREFIX + String(userId);
}
function sanitizeGroupTitle(raw) {
  return String(raw || "")
    .trim()
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .slice(0, CHAT_GROUP_TITLE_MAX);
}
function sanitizeGroupDescription(raw) {
  return String(raw || "")
    .trim()
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .slice(0, CHAT_GROUP_DESCRIPTION_MAX);
}
/** Аватар группы: data URL, лимит по длине base64 (иконка, не полноразмерное фото). */
function sanitizeGroupAvatarInput(raw) {
  if (!raw || typeof raw !== "string") return null;
  const s = String(raw).trim();
  const m = s.match(/^data:image\/(jpeg|jpg|png|gif|webp);base64,(.+)$/);
  if (!m || !m[2] || m[2].length > 220000) return null;
  if (s.length > 480000) return null;
  return s;
}

function pipelineCommandResults(pipeRes) {
  if (pipeRes == null) return [];
  if (Array.isArray(pipeRes)) return pipeRes;
  if (typeof pipeRes === "object" && Array.isArray(pipeRes.result)) return pipeRes.result;
  return [];
}

async function buildGroupMembersPublicList(myId, memberIds, minScore, creatorIdOpt) {
  const ordered = [];
  const seen = new Set();
  for (let i = 0; i < (memberIds || []).length; i++) {
    const id = String(memberIds[i] || "").trim();
    if (!id || seen.has(id)) continue;
    seen.add(id);
    ordered.push(id);
  }
  if (!ordered.length) return [];
  const myNorm = normalizeStoredMessageFromId(myId);
  const creatorNormAll =
    creatorIdOpt != null && String(creatorIdOpt).trim() !== ""
      ? normalizeStoredMessageFromId(String(creatorIdOpt).trim())
      : "";
  try {
    const [dtIds, avatars, p21Ids, displayMap, usernameRes, aliasRes, scorePipe] = await Promise.all([
      getDtIds(ordered),
      getAvatars(ordered),
      getP21Ids(ordered),
      getChatDisplayNameMapForIds(ordered),
      redisPipeline([["HMGET", USERNAMES_KEY, ...ordered]]),
      redisPipeline([["HMGET", FRIEND_ALIAS_KEY_PREFIX + myId, ...ordered]]),
      redisPipeline(ordered.flatMap((id) => [["ZSCORE", CHAT_ONLINE_KEY, id]])),
    ]);
    const urFirst = pipelineCommandResults(usernameRes)[0];
    const urRow = urFirst && Array.isArray(urFirst.result) ? urFirst.result : [];
    const usernamesForMembers = {};
    ordered.forEach((pid, idx) => {
      const raw = urRow[idx];
      if (raw != null && raw !== false) usernamesForMembers[pid] = String(raw).trim();
    });
    const arFirst = pipelineCommandResults(aliasRes)[0];
    const arRow = arFirst && Array.isArray(arFirst.result) ? arFirst.result : [];
    const aliasByPeer = {};
    ordered.forEach((pid, idx) => {
      const raw = arRow[idx];
      if (raw == null || raw === false) return;
      const cn = sanitizeFriendContactNameForChat(raw);
      if (cn) aliasByPeer[pid] = cn;
    });
    const scoreRows = pipelineCommandResults(scorePipe);
    return ordered.map((id, i) => {
      const aliasLabel = aliasByPeer[id];
      const baseDisplay =
        (displayMap[id] && String(displayMap[id]).trim()) ||
        (usernamesForMembers[id] ? "@" + usernamesForMembers[id] : id);
      const nameOut = (aliasLabel && String(aliasLabel).trim()) || baseDisplay;
      const scRow = scoreRows[i];
      const sc = scRow && scRow.result != null ? scRow.result : null;
      const online = sc != null && parseFloat(sc) >= minScore;
      const idNorm = normalizeStoredMessageFromId(id);
      const tgUserRaw = usernamesForMembers[id] != null ? String(usernamesForMembers[id]).trim() : "";
      const tgDispRaw =
        displayMap[id] != null && String(displayMap[id]).trim() !== ""
          ? String(displayMap[id]).trim()
          : "";
      return {
        id,
        name: nameOut,
        contactName: aliasLabel || undefined,
        telegramUsername: tgUserRaw || null,
        telegramDisplayName: tgDispRaw || null,
        p21Id: p21Ids[id] != null ? p21Ids[id] : null,
        dtId: dtIds[id] || null,
        avatar: avatars[id] || null,
        online,
        isYou: idNorm === myNorm,
        admin: isAdmin(id),
        isGroupCreator: !!(creatorNormAll && idNorm === creatorNormAll),
      };
    });
  } catch (e) {
    return ordered.map((id) => {
      const idNorm = normalizeStoredMessageFromId(id);
      return {
        id,
        name: id,
        telegramUsername: null,
        telegramDisplayName: null,
        p21Id: null,
        dtId: null,
        avatar: null,
        online: false,
        isYou: idNorm === myNorm,
        admin: isAdmin(id),
        isGroupCreator: !!(creatorNormAll && idNorm === creatorNormAll),
      };
    });
  }
}

function groupMetaHasMember(meta, myId) {
  if (!meta || !Array.isArray(meta.members) || !myId) return false;
  const mine = normalizeStoredMessageFromId(String(myId));
  return meta.members.some((m) => normalizeStoredMessageFromId(String(m)) === mine);
}

function readGroupMetaOnlyFlag(req) {
  const q = req.query || {};
  if (q.metaonly === "1" || q.metaOnly === "1" || q.groupmetaonly === "1" || q.groupMetaOnly === "1") return true;
  for (const k of Object.keys(q)) {
    if (String(k).toLowerCase() === "metaonly" && String(q[k]) === "1") return true;
  }
  return false;
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
  const r = await redisPipeline([["HGET", CHAT_DISPLAY_NAMES_KEY, userId]]);
  const v = r && r[0] && r[0].result != null ? sanitizeChatDisplayNameStored(r[0].result) : "";
  return v || null;
}

async function getChatDisplayNameMapForIds(rawIds) {
  const normIds = [
    ...new Set((rawIds || []).map((id) => normalizeStoredMessageFromId(id)).filter(Boolean)),
  ];
  if (!normIds.length) return {};
  const r = await redisPipeline([["HMGET", CHAT_DISPLAY_NAMES_KEY, ...normIds]]);
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

function applyPeerChatDisplayNamesToMessages(messages, displayMap) {
  if (!messages || !displayMap || typeof displayMap !== "object") return;
  for (let i = 0; i < messages.length; i++) {
    const m = messages[i];
    if (!m) continue;
    const fromNorm = m.from ? normalizeStoredMessageFromId(m.from) : "";
    if (fromNorm && displayMap[fromNorm]) m.fromName = displayMap[fromNorm];
    if (m.replyTo && m.replyTo.from) {
      const rfn = normalizeStoredMessageFromId(m.replyTo.from);
      if (rfn && displayMap[rfn]) m.replyTo.fromName = displayMap[rfn];
    }
  }
}

function collectMessageFromIdsForAlias(messages) {
  const ids = [];
  if (!Array.isArray(messages)) return ids;
  for (let i = 0; i < messages.length; i++) {
    const m = messages[i];
    if (m && m.from) ids.push(String(m.from));
    if (m && m.replyTo && m.replyTo.from) ids.push(String(m.replyTo.from));
  }
  return ids;
}

async function getFriendAliasMapForViewer(myId, rawIds) {
  const normIds = [
    ...new Set((rawIds || []).map((id) => normalizeStoredMessageFromId(id)).filter(Boolean)),
  ];
  if (!normIds.length || !REDIS_URL || !REDIS_TOKEN) return {};
  const aliasRes = await redisPipeline([["HMGET", FRIEND_ALIAS_KEY_PREFIX + myId, ...normIds]]);
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

function applyViewerFriendAliasesToMessages(messages, aliasMap) {
  if (!messages || !aliasMap || typeof aliasMap !== "object") return;
  for (let i = 0; i < messages.length; i++) {
    const m = messages[i];
    if (!m) continue;
    const fromNorm = m.from ? normalizeStoredMessageFromId(m.from) : "";
    if (fromNorm && aliasMap[fromNorm]) {
      m.fromName = aliasMap[fromNorm];
    }
    if (m.replyTo && m.replyTo.from) {
      const rfn = normalizeStoredMessageFromId(m.replyTo.from);
      if (rfn && aliasMap[rfn]) {
        m.replyTo.fromName = aliasMap[rfn];
      }
    }
  }
}

function convKey(id1, id2) {
  const a = String(id1).replace(/^tg_/, "");
  const b = String(id2).replace(/^tg_/, "");
  return "poker_app:chat:" + (a < b ? a + "_" + b : b + "_" + a);
}

function isAdmin(userId) {
  const s = String(normalizePeerChatUserId(userId));
  if (s.startsWith("vk_")) return false;
  const id = s.replace(/^tg_/, "");
  return id && ADMIN_IDS.length > 0 && ADMIN_IDS.includes(id);
}

/** open = режим выключен; member / pending / need_apply / revoked (открытый режим, доступ отозван) */
async function getClubChatAccessState(myId, admin) {
  if (!clubChatApplicationRequired()) {
    if (admin) return "open";
    const rev = await redisPipeline([["SISMEMBER", GENERAL_CHAT_ACCESS_REVOKED_KEY, myId]]);
    if (rev && rev[0] && rev[0].result === 1) return "revoked";
    return "open";
  }
  if (admin) return "member";
  const res = await redisPipeline([
    ["SISMEMBER", CLUB_CHAT_MEMBERS_KEY, myId],
    ["SISMEMBER", CLUB_CHAT_PENDING_KEY, myId],
  ]);
  const isMember = res && res[0] && res[0].result === 1;
  const isPending = res && res[1] && res[1].result === 1;
  if (isMember) return "member";
  if (isPending) return "pending";
  return "need_apply";
}

async function hasClubGeneralAccess(myId, admin) {
  const s = await getClubChatAccessState(myId, admin);
  return s === "open" || s === "member";
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
  const { onlineCount } = await countOnlineAmongMemberIds(memberIds, minScore);
  return {
    generalChatParticipantsCount: memberIds.length,
    generalChatOnlineCount: onlineCount,
  };
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
  const [displayMap, avatarsMap, aliasRes, usernameRes] = await Promise.all([
    getChatDisplayNameMapForIds(memberIds),
    getAvatars(memberIds),
    memberIds.length > 0
      ? redisPipeline([["HMGET", FRIEND_ALIAS_KEY_PREFIX + myId, ...memberIds]])
      : Promise.resolve(null),
    memberIds.length > 0 ? redisPipeline([["HMGET", USERNAMES_KEY, ...memberIds]]) : Promise.resolve(null),
  ]);
  const aliasRow =
    aliasRes && aliasRes[0] && Array.isArray(aliasRes[0].result) ? aliasRes[0].result : [];
  const usernameRow =
    usernameRes && usernameRes[0] && Array.isArray(usernameRes[0].result) ? usernameRes[0].result : [];
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
      (displayMap[id] && String(displayMap[id]).trim()) ||
      (tgUserRaw ? "@" + tgUserRaw : id.startsWith("tg_") ? id : String(id));
    const nameOut = (aliasLabel && String(aliasLabel).trim()) || baseDisplay;
    return {
      id,
      name: nameOut,
      contactName: aliasLabel || undefined,
      telegramUsername: tgUserRaw || null,
      telegramDisplayName: tgDispRaw || null,
      avatar: avatarsMap[id] || null,
      online: !!onlineByIndex[idx],
      isYou: normalizeStoredMessageFromId(id) === myNorm,
      admin: isAdmin(id),
    };
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
    name: usernamesMap[id] ? "@" + usernamesMap[id] : id,
  }));
  out.sort((a, b) => (a.name || "").localeCompare(b.name || "", "ru"));
  return out;
}

async function redisPipeline(commands) {
  if (!REDIS_URL || !REDIS_TOKEN) return null;
  const base = String(REDIS_URL).replace(/\/$/, "");
  try {
    const res = await fetch(base + "/pipeline", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REDIS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commands),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
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
  await redisPipeline([["HSET", CHAT_SEEN_CURSOR_KEY, seenCursorField(viewerId, peerId), out]]);
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
  await redisPipeline([["HSET", CHAT_GENERAL_SEEN_HASH, String(userId), out]]);
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

/** Подпись отправителя: имя из Telegram + ник (@username / из профиля клуба). */
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
  if (nameParts && nickDisplay) return nameParts + " · " + nickDisplay;
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

async function getAvatars(userIds) {
  if (!userIds || userIds.length === 0) return {};
  const cmds = userIds.map((id) => ["GET", AVATAR_PREFIX + id.replace(/[^a-zA-Z0-9_-]/g, "_")]);
  const res = await redisPipeline(cmds);
  const out = {};
  if (res && Array.isArray(res)) {
    userIds.forEach((id, i) => {
      const v = res[i] && res[i].result;
      if (v && typeof v === "string" && v.startsWith("data:")) out[id] = v;
    });
  }
  return out;
}

async function getP21Ids(userIds) {
  if (!userIds || userIds.length === 0) return {};
  const cmds = userIds.map((id) => ["HGET", P21_IDS_KEY, id]);
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

async function getRespectScores(userIds) {
  if (!userIds || userIds.length === 0) return {};
  const cmds = userIds.map((id) => ["HGET", RESPECT_SCORE_KEY, id]);
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

const TG_SEND_MAX = 4090;

/** @param {{ text: string, url: string }} [inlineButton] — url должен начинаться с http */
async function sendTelegram(toChatId, text, inlineButton) {
  if (!BOT_TOKEN || !toChatId) return;
  const r = await sendTelegramBotMessage(BOT_TOKEN, {
    chat_id: String(toChatId),
    text: String(text || ""),
    maxText: TG_SEND_MAX,
    buttonText: inlineButton && inlineButton.text ? inlineButton.text : undefined,
    buttonUrl: inlineButton && inlineButton.url ? inlineButton.url : undefined,
  });
  if (!r.ok) {
    console.error("[chat] Telegram sendMessage failed", {
      chat_id: String(toChatId),
      hint: r.hint,
      error_code: r.error_code,
    });
  }
}

/** Уведомление админам в личку Telegram о новой заявке в главный чат. */
async function notifyAdminsNewClubChatApplication(applicantMyId, applicantNumericId, identity) {
  if (!BOT_TOKEN || !ADMIN_IDS.length) return;
  const redisNick = await getVisitorUsername(applicantMyId);
  const customApp = await getVisitorChatDisplayName(applicantMyId);
  const nameNick =
    customApp && String(customApp).trim()
      ? String(customApp).trim()
      : buildChatDisplayName(identity || {}, redisNick);
  const idLine =
    identity && identity.vkId != null
      ? "VK id: " + String(identity.vkId)
      : "Telegram id: " + String(applicantNumericId);
  let lines = [
    "💬 Новая заявка в главный чат клуба",
    "",
    "Имя и ник: " + nameNick,
    idLine,
    "",
    "Одобрить или отклонить: мини-приложение → Чат → долгое нажатие на «Главный чат».",
  ];
  const text = lines.join("\n");
  const openUrl = buildClubChatMiniAppLink();
  const btn = openUrl.startsWith("http") ? { text: "Открыть приложение", url: openUrl } : undefined;
  await Promise.all(ADMIN_IDS.map((id) => sendTelegram(id, text, btn)));
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET" && req.method !== "POST" && req.method !== "DELETE" && req.method !== "PATCH") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  if (!REDIS_URL || !REDIS_TOKEN) {
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
  const admin = isAdmin(myId);

  // DELETE: админ удаляет любое сообщение; пользователь — только своё
  if (req.method === "DELETE") {
    const messageId = body.messageId || body.message_id || req.query.messageId;
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
    const results = await redisPipeline([["LRANGE", redisKey, "0", "-1"]]);
    const raw = results && results[0] && results[0].result !== undefined ? results[0].result : [];
    const list = Array.isArray(raw) ? raw : [];
    let toRemove = null;
    let msgFrom = null;
    for (let i = 0; i < list.length; i++) {
      try {
        const m = JSON.parse(list[i]);
        if (m.id === messageId) {
          toRemove = list[i];
          msgFrom = m.from;
          break;
        }
      } catch (e) {}
    }
    if (!toRemove) return res.status(404).json({ ok: false, error: "Сообщение не найдено" });
    if (!admin && normalizeStoredMessageFromId(msgFrom) !== normalizeStoredMessageFromId(myId)) {
      return res.status(403).json({ ok: false, error: "Можно удалить только своё сообщение" });
    }

    const results2 = await redisPipeline([["LREM", redisKey, "0", toRemove]]);
    if (!results2 || results2[0]?.error) return res.status(500).json({ ok: false, error: "Ошибка удаления" });
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
      const messageId = body.messageId || body.message_id || req.query.messageId;
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
      const results = await redisPipeline([["LRANGE", redisKey, "0", "-1"]]);
      const raw = results && results[0] && results[0].result !== undefined ? results[0].result : [];
      const list = Array.isArray(raw) ? raw : [];
      let idx = -1;
      let msgObj = null;
      for (let i = 0; i < list.length; i++) {
        try {
          const m = JSON.parse(list[i]);
          if (m.id === messageId) {
            if (normalizeStoredMessageFromId(m.from) !== normalizeStoredMessageFromId(myId)) {
              return res.status(403).json({ ok: false, error: "Можно редактировать только свои сообщения" });
            }
            idx = i;
            msgObj = m;
            break;
          }
        } catch (e) {}
      }
      if (idx < 0 || !msgObj) return res.status(404).json({ ok: false, error: "Сообщение не найдено" });
      msgObj.text = newText;
      msgObj.edited = true;
      msgObj.editedAt = new Date().toISOString();
      const newStr = JSON.stringify(msgObj);
      const resSet = await redisPipeline([["LSET", redisKey, String(idx), newStr]]);
      if (!resSet || resSet[0]?.error) return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
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
      const results = await redisPipeline([["LRANGE", GENERAL_KEY, "0", "-1"]]);
      const raw = results && results[0] && results[0].result !== undefined ? results[0].result : [];
      const list = Array.isArray(raw) ? raw : [];
      let found = null;
      for (let i = 0; i < list.length; i++) {
        try {
          const m = JSON.parse(list[i]);
          if (m && String(m.id) === String(messageId)) {
            found = m;
            break;
          }
        } catch (e) {}
      }
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
      const messageId = body.messageId || body.message_id || req.query.messageId;
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
      const results = await redisPipeline([["LRANGE", redisKeyReact, "0", "-1"]]);
      const raw = results && results[0] && results[0].result !== undefined ? results[0].result : [];
      const list = Array.isArray(raw) ? raw : [];
      let idx = -1;
      let msgObj = null;
      for (let i = 0; i < list.length; i++) {
        try {
          const m = JSON.parse(list[i]);
          if (m.id === messageId) {
            idx = i;
            msgObj = m;
            break;
          }
        } catch (e) {}
      }
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
      return res.status(200).json({ ok: true, message: msgObj });
    }

    return res.status(400).json({
      ok: false,
      error:
        "action: edit, block, unblock, reaction, generalPin, generalUnpin, clubChatApply, clubChatApprove, clubChatReject, clubChatRevoke",
    });
  }

  // GET
  if (req.method === "GET") {
    const withId = req.query.with || req.query.other;
    const mode = req.query.mode || body.mode;

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
          await redisPipeline([
            ["ZADD", CHAT_ONLINE_KEY, String(nowM), myId],
            ["ZREMRANGEBYSCORE", CHAT_ONLINE_KEY, "-inf", String(minScoreM)],
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
        const members = meta.members;
        const nowG = Date.now();
        const minScoreG = nowG - ONLINE_TTL_MS;
        const pipelineG = [
          ["LRANGE", groupMsgsKey(groupId), "0", String(MAX_MESSAGES - 1)],
          ["ZADD", CHAT_ONLINE_KEY, String(nowG), myId],
          ["ZREMRANGEBYSCORE", CHAT_ONLINE_KEY, "-inf", String(minScoreG)],
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
          const k = m.id || (m.from + "|" + (m.time || "") + "|" + (m.text || ""));
          if (seenG.has(k)) return false;
          seenG.add(k);
          return true;
        });
        const fromIdsG = [...new Set(dedupedG.map((m) => m.from).filter(Boolean))];
        const [dtIdsMapG, avatarsMapG, p21IdsMapG, respectScoresG] = await Promise.all([
          getDtIds(fromIdsG),
          getAvatars(fromIdsG),
          getP21Ids(fromIdsG),
          getRespectScores(fromIdsG),
        ]);
        dedupedG.forEach((m) => {
          if (m.from) {
            if (dtIdsMapG[m.from]) m.fromDtId = dtIdsMapG[m.from];
            if (avatarsMapG[m.from]) m.fromAvatar = avatarsMapG[m.from];
            if (p21IdsMapG[m.from]) m.fromP21Id = p21IdsMapG[m.from];
            m.fromRespect = respectScoresG[m.from] != null ? respectScoresG[m.from] : 0;
            m.fromAdmin = isAdmin(m.from);
          }
        });
        const latestInGroup = dedupedG.length ? dedupedG[dedupedG.length - 1].time : null;
        const trackSeenG = req.query.trackSeen !== "0" && req.query.trackSeen !== "false";
        if (trackSeenG && latestInGroup) await bumpSeenCursor(myId, groupId, latestInGroup);
        const idsAliasG = collectMessageFromIdsForAlias(dedupedG);
        const displayMapG = await getChatDisplayNameMapForIds(idsAliasG);
        applyPeerChatDisplayNamesToMessages(dedupedG, displayMapG);
        const aliasMapG = await getFriendAliasMapForViewer(myId, idsAliasG);
        applyViewerFriendAliasesToMessages(dedupedG, aliasMapG);
        const scoreCmdsG = members.flatMap((id) => [["ZSCORE", CHAT_ONLINE_KEY, id]]);
        const scoreResultsG = await redisPipeline(scoreCmdsG);
        let onlineCountG = 0;
        if (scoreResultsG && Array.isArray(scoreResultsG)) {
          members.forEach((id, i) => {
            const sc = scoreResultsG[i]?.result;
            if (sc != null && parseFloat(sc) >= minScoreG) onlineCountG++;
          });
        }
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
        return res.status(200).json({
          ok: true,
          messages: dedupedG,
          isAdmin: admin,
          participantsCount: members.length,
          onlineCount: onlineCountG,
          isGroupChat: true,
          groupTitle: groupTitleOut,
          groupDescription: groupDescriptionOut,
          groupAvatar: groupAvatarOut,
          groupCreatorId: meta.createdBy != null ? String(meta.createdBy) : null,
          iAmGroupCreator: iAmCreatorMsgs,
          iCanManageGroupMeta: !!admin,
          iCanChangeGroupAvatar: iCanChangeGroupAvatarMsgs,
        });
      }

      const otherId = normalizePeerChatUserId(withId);
      const trackSeen = req.query.trackSeen !== "0" && req.query.trackSeen !== "false";
      const key = convKey(myId, otherId);
      const now = Date.now();
      const minScore = now - ONLINE_TTL_MS;
      const pipeline = [
        ["LRANGE", key, "0", String(MAX_MESSAGES - 1)],
        ["ZADD", CHAT_ONLINE_KEY, String(now), myId],
        ["ZREMRANGEBYSCORE", CHAT_ONLINE_KEY, "-inf", String(minScore)],
        ["ZSCORE", CHAT_ONLINE_KEY, myId],
        ["ZSCORE", CHAT_ONLINE_KEY, otherId],
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
        const k = m.id || (m.from + "|" + (m.time || "") + "|" + (m.text || ""));
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });
      const fromIds = [...new Set(deduped.map((m) => m.from).filter(Boolean))];
      const participantsCount = fromIds.length;
      const myScore = results && results[3] && results[3].result != null ? parseFloat(results[3].result) : 0;
      const otherScore = results && results[4] && results[4].result != null ? parseFloat(results[4].result) : 0;
      let onlineCount = 0;
      if (fromIds.includes(myId) && myScore >= minScore) onlineCount++;
      if (fromIds.includes(otherId) && otherScore >= minScore) onlineCount++;
      const [dtIdsMap, avatarsMap, p21IdsMap, respectScoresDm] = await Promise.all([
        getDtIds(fromIds),
        getAvatars(fromIds),
        getP21Ids(fromIds),
        getRespectScores(fromIds),
      ]);
      deduped.forEach((m) => {
        if (m.from) {
          if (dtIdsMap[m.from]) m.fromDtId = dtIdsMap[m.from];
          if (avatarsMap[m.from]) m.fromAvatar = avatarsMap[m.from];
          if (p21IdsMap[m.from]) m.fromP21Id = p21IdsMap[m.from];
          m.fromRespect = respectScoresDm[m.from] != null ? respectScoresDm[m.from] : 0;
          m.fromAdmin = isAdmin(m.from);
        }
      });
      const latestInThread = deduped.length ? deduped[deduped.length - 1].time : null;
      if (trackSeen && latestInThread) await bumpSeenCursor(myId, otherId, latestInThread);
      const peerSeenUpTo = await getSeenCursor(otherId, myId);
      applyPeerReadReceiptsToMyMessages(deduped, myId, peerSeenUpTo);
      const idsAliasDm = collectMessageFromIdsForAlias(deduped);
      const displayMapDm = await getChatDisplayNameMapForIds(idsAliasDm);
      applyPeerChatDisplayNamesToMessages(deduped, displayMapDm);
      const aliasMapDm = await getFriendAliasMapForViewer(myId, idsAliasDm);
      applyViewerFriendAliasesToMessages(deduped, aliasMapDm);
      const otherDtId = dtIdsMap && otherId ? (dtIdsMap[otherId] || null) : null;
      const otherP21Id = p21IdsMap && otherId ? (p21IdsMap[otherId] != null ? p21IdsMap[otherId] : null) : null;
      const otherAvatar =
        otherId && avatarsMap && avatarsMap[otherId] ? avatarsMap[otherId] : null;
      return res.status(200).json({
        ok: true,
        messages: deduped,
        isAdmin: admin,
        participantsCount,
        onlineCount,
        otherDtId: otherDtId || undefined,
        otherP21Id: otherP21Id != null && otherP21Id !== "" ? otherP21Id : undefined,
        otherAvatar: otherAvatar != null && otherAvatar !== "" ? otherAvatar : undefined,
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
      const scoreCmds = [
        ["ZADD", CHAT_ONLINE_KEY, String(now), myId],
        ["ZREMRANGEBYSCORE", CHAT_ONLINE_KEY, "-inf", String(minScore)],
        ...adminIds.flatMap((id) => [["ZSCORE", CHAT_ONLINE_KEY, id]]),
      ];
      const scoreResults = await redisPipeline(scoreCmds);
      const onlineAdminIds = [];
      if (scoreResults && Array.isArray(scoreResults) && scoreResults.length >= 2) {
        const scores = scoreResults.slice(2);
        adminIds.forEach((id, i) => {
          const s = scores[i]?.result;
          if (s != null && parseFloat(s) >= minScore) onlineAdminIds.push(id);
        });
      }
      return res.status(200).json({ ok: true, onlineAdminIds });
    }

    if (mode === "general") {
      const clubChatAccess = await getClubChatAccessState(myId, admin);
      const now = Date.now();
      const minScore = now - ONLINE_TTL_MS;
      const needPendingBadge = admin && clubChatApplicationRequired();
      const [msgResults, blockedResults, onlineResults, pendingCountPipe, pinnedResults] = await Promise.all([
        redisPipeline([["LRANGE", GENERAL_KEY, "0", String(MAX_MESSAGES - 1)]]),
        redisPipeline([["SMEMBERS", BLOCKED_KEY]]),
        redisPipeline([
          ["ZADD", CHAT_ONLINE_KEY, String(now), myId],
          ["ZREMRANGEBYSCORE", CHAT_ONLINE_KEY, "-inf", String(minScore)],
          ["ZCOUNT", CHAT_ONLINE_KEY, String(minScore), "+inf"],
        ]),
        needPendingBadge ? redisPipeline([["SCARD", CLUB_CHAT_PENDING_KEY]]) : Promise.resolve([{ result: 0 }]),
        redisPipeline([["GET", GENERAL_PINNED_KEY]]),
      ]);
      const clubChatPendingReviewCount =
        needPendingBadge && pendingCountPipe && pendingCountPipe[0] && pendingCountPipe[0].result != null
          ? Number(pendingCountPipe[0].result) || 0
          : 0;
      const onlineCount =
        onlineResults && onlineResults[2] && typeof onlineResults[2].result === "number" ? onlineResults[2].result : 0;
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
          generalMembers: [],
        });
      }
      let listResp = msgResults;
      if (msgResults && typeof msgResults === "object" && !Array.isArray(msgResults) && Array.isArray(msgResults.result)) {
        listResp = msgResults.result;
      }
      let raw = [];
      if (listResp && Array.isArray(listResp)) {
        const first = listResp[0];
        if (first && first.error) {
          return res.status(500).json({ ok: false, error: "Ошибка загрузки сообщений" });
        }
        raw = Array.isArray(first?.result) ? first.result : (typeof first?.result === "string" ? [first.result] : []);
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
        const key = m.id || (m.from + "|" + (m.time || "") + "|" + (m.text || ""));
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      const participantsSet = new Set(deduped.map((m) => m.from).filter(Boolean));
      const fromIds = [...participantsSet];
      const [dtIds, avatars, p21Ids, respectScores] = await Promise.all([getDtIds(fromIds), getAvatars(fromIds), getP21Ids(fromIds), getRespectScores(fromIds)]);
      deduped.forEach((m) => {
        if (m.from) {
          if (dtIds[m.from]) m.fromDtId = dtIds[m.from];
          if (avatars[m.from]) m.fromAvatar = avatars[m.from];
          if (p21Ids[m.from]) m.fromP21Id = p21Ids[m.from];
          m.fromRespect = respectScores[m.from] != null ? respectScores[m.from] : 0;
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
      const roster = await buildGeneralChatRosterPayload(myId, admin);
      return res.status(200).json({
        ok: true,
        messages: deduped,
        isAdmin: admin,
        participantsCount: roster.participantsCount,
        onlineCount: roster.onlineCount,
        clubChatAccess,
        clubChatPendingReviewCount,
        generalPinned,
        generalMembers: roster.generalMembers,
      });
    }

    const now = Date.now();
    const minScore = now - ONLINE_TTL_MS;
    const results = await redisPipeline([
      ["SMEMBERS", "poker_app:visitors"],
      ["HGETALL", "poker_app:visitor_usernames"],
      ["SMEMBERS", "poker_app:chat_partners:" + myId],
      ["ZADD", CHAT_ONLINE_KEY, String(now), myId],
      ["ZREMRANGEBYSCORE", CHAT_ONLINE_KEY, "-inf", String(minScore)],
    ]);
    if (!results || !Array.isArray(results) || results.length < 1) {
      const clubEmpty = await getClubChatAccessState(myId, admin);
      return res.status(200).json({
        ok: true,
        contacts: [],
        friendIds: [],
        isAdmin: admin,
        participantsCount: 0,
        onlineCount: 0,
        clubChatAccess: clubEmpty,
        generalChatPickMembers: [],
      });
    }
    const visitors = Array.isArray(results[0]?.result) ? results[0].result : [];
    const usernamesRaw = results[1]?.result;
    const partners = Array.isArray(results[2]?.result) ? results[2].result : [];

    /* Все id из chat_partners (нормализованные). Раньше админам скрывали других админов — тогда личка админ↔админ
       (например с @roman1_matvienko / tg_388008256) не попадала в mode=contacts, хотя SADD уже был. */
    const partnerIds = [...new Set(partners.map((id) => normalizePeerChatUserId(String(id))))].filter(
      (id) => (id.startsWith("tg_") || id.startsWith("vk_")) && id !== myId
    );
    const friendsEarlyRes = await redisPipeline([["SMEMBERS", FRIENDS_SET_KEY_PREFIX + myId]]);
    const friendIdsForResponse =
      friendsEarlyRes && friendsEarlyRes[0] && Array.isArray(friendsEarlyRes[0].result)
        ? friendsEarlyRes[0].result.map((x) => (x != null ? String(x) : "")).filter(Boolean)
        : [];
    const friendIdsNormalized = [...new Set(friendIdsForResponse.map((id) => normalizePeerChatUserId(String(id))))].filter(
      (id) => (id.startsWith("tg_") || id.startsWith("vk_")) && id !== myId
    );
    const partnerIdSet = new Set(partnerIds);
    const orphanFriendIds = friendIdsNormalized.filter((id) => !partnerIdSet.has(id));
    const idsForOnline = [...new Set([...partnerIds, ...orphanFriendIds])];
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
    const participantsCount = partnerIds.length + orphanFriendIds.length;

    let usernames = {};
    if (Array.isArray(usernamesRaw)) {
      for (let i = 0; i < usernamesRaw.length; i += 2) {
        if (usernamesRaw[i] && usernamesRaw[i + 1]) usernames[usernamesRaw[i]] = String(usernamesRaw[i + 1]).trim();
      }
    } else if (usernamesRaw && typeof usernamesRaw === "object") {
      usernames = usernamesRaw;
    }

    let lastViewed = {};
    try {
      const lv = req.query.lastViewed;
      if (lv && typeof lv === "string") lastViewed = JSON.parse(lv);
    } catch (e) {}

    const adminIds = ADMIN_IDS.map((id) => (id.startsWith("tg_") ? id : "tg_" + id));
    const allIdsForUnread = [...partnerIds, ...adminIds];
    const unreadCounts = {};
    const lrangeCmds = allIdsForUnread.length > 0
      ? allIdsForUnread.flatMap((id) => [["LRANGE", convKey(myId, id), "0", String(MAX_MESSAGES - 1)]])
      : [];
    lrangeCmds.push(["LRANGE", GENERAL_KEY, "0", String(MAX_MESSAGES - 1)]);
    const seenCmdsForUnread = allIdsForUnread.map((id) => ["HGET", CHAT_SEEN_CURSOR_KEY, seenCursorField(myId, id)]);
    seenCmdsForUnread.push(["HGET", CHAT_GENERAL_SEEN_HASH, myId]);
    const combinedUnread = await redisPipeline([...lrangeCmds, ...seenCmdsForUnread]);
    const lrangeResults =
      combinedUnread && Array.isArray(combinedUnread) ? combinedUnread.slice(0, lrangeCmds.length) : null;
    const seenUnreadResults =
      combinedUnread && Array.isArray(combinedUnread) ? combinedUnread.slice(lrangeCmds.length) : null;
    let generalUnreadCount = 0;
    const myIdNorm = normalizeStoredMessageFromId(myId);
    let lastViewGeneralMerged = "";
    if (seenUnreadResults && seenUnreadResults.length > 0) {
      const genSeenRaw = seenUnreadResults[seenUnreadResults.length - 1]?.result;
      const serverGenLv = genSeenRaw != null ? String(genSeenRaw).trim() : "";
      const clientGenLv = lastViewed.general != null ? String(lastViewed.general) : "";
      lastViewGeneralMerged = mergeReadCursors(clientGenLv, serverGenLv);
    } else {
      lastViewGeneralMerged = lastViewed.general != null ? String(lastViewed.general) : "";
    }
    if (lrangeResults && Array.isArray(lrangeResults)) {
      if (allIdsForUnread.length > 0) {
        allIdsForUnread.forEach((id, i) => {
          const raw = lrangeResults[i]?.result;
          const list = Array.isArray(raw) ? raw : [];
          const clientLv = lastViewed[id] != null ? String(lastViewed[id]) : "";
          const servRaw = seenUnreadResults && seenUnreadResults[i] ? seenUnreadResults[i].result : null;
          const serverLv = servRaw != null ? String(servRaw).trim() : "";
          const lastView = mergeReadCursors(clientLv, serverLv);
          let count = 0;
          list.forEach((s) => {
            try {
              const m = typeof s === "string" ? JSON.parse(s) : null;
              const fromN = m && m.from != null ? normalizeStoredMessageFromId(m.from) : "";
              if (m && chatMessageIsNewerThanLastViewed(m.time, lastView) && fromN === id) count++;
            } catch (e) {}
          });
          unreadCounts[id] = count;
        });
      }
      const generalIdx = lrangeResults.length - 1;
      const generalRaw = lrangeResults[generalIdx]?.result;
      const generalList = Array.isArray(generalRaw) ? generalRaw : [];
      generalList.forEach((s) => {
        try {
          const m = typeof s === "string" ? JSON.parse(s) : null;
          const fromN = m && m.from != null ? normalizeStoredMessageFromId(m.from) : "";
          if (
            m &&
            chatMessageIsNewerThanLastViewed(m.time, lastViewGeneralMerged) &&
            fromN &&
            fromN !== myIdNorm
          )
            generalUnreadCount++;
        } catch (e) {}
      });
    }
    /* Без ни одной отметки «открывал общий чат» (ни localStorage, ни Redis) — не помечаем всю старую ленту непрочитанной. */
    if (!lastViewGeneralMerged || String(lastViewGeneralMerged).trim() === "") {
      generalUnreadCount = 0;
    }

    const lastMessageTime = {};
    if (lrangeResults && Array.isArray(lrangeResults) && partnerIds.length > 0) {
      partnerIds.forEach((id, i) => {
        const raw = lrangeResults[i]?.result;
        const list = Array.isArray(raw) ? raw : [];
        const first = list[0];
        if (first != null) {
          try {
            const m = typeof first === "string" ? JSON.parse(first) : first;
            if (m && m.time) lastMessageTime[id] = String(m.time);
          } catch (e) {}
        }
      });
    }

    const idsForMeta = [...new Set([...partnerIds, ...orphanFriendIds])];
    const [dtIds, avatars, p21IdsContacts] = await Promise.all([
      getDtIds(idsForMeta),
      getAvatars(idsForMeta),
      getP21Ids(idsForMeta),
    ]);
    const friendContactNameByPeer = {};
    if (idsForMeta.length > 0) {
      const aliasRes = await redisPipeline([["HMGET", FRIEND_ALIAS_KEY_PREFIX + myId, ...idsForMeta]]);
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
    const contactsFromPartners = partnerIds.map((id) => {
      const baseDisplay =
        (chatDisplayByPeer[id] && String(chatDisplayByPeer[id]).trim()) ||
        (usernames[id] ? "@" + usernames[id] : id);
      const entry = {
        id,
        name: baseDisplay,
        dtId: dtIds[id] || null,
        p21Id: p21IdsContacts[id] != null ? p21IdsContacts[id] : null,
        avatar: avatars[id] || null,
        online: onlineSet.has(id),
        admin: isAdmin(id),
        unreadCount: unreadCounts[id] != null ? unreadCounts[id] : 0,
      };
      const aliasLabel = friendContactNameByPeer[id];
      if (aliasLabel) entry.contactName = aliasLabel;
      return entry;
    });
    const orphanContacts = orphanFriendIds.map((id) => {
      const baseDisplay =
        (chatDisplayByPeer[id] && String(chatDisplayByPeer[id]).trim()) ||
        (usernames[id] ? "@" + usernames[id] : id);
      const entry = {
        id,
        name: baseDisplay,
        dtId: dtIds[id] || null,
        p21Id: p21IdsContacts[id] != null ? p21IdsContacts[id] : null,
        avatar: avatars[id] || null,
        online: onlineSet.has(id),
        admin: isAdmin(id),
        unreadCount: 0,
      };
      const aliasLabel = friendContactNameByPeer[id];
      if (aliasLabel) entry.contactName = aliasLabel;
      return entry;
    });
    let contactsAll = contactsFromPartners.concat(orphanContacts);
    const myGroupsRes = await redisPipeline([["SMEMBERS", userChatGroupsKey(myId)]]);
    const rawGroupIds = Array.isArray(myGroupsRes?.[0]?.result) ? myGroupsRes[0].result : [];
    const groupIdsList = [
      ...new Set(rawGroupIds.map((g) => String(g).trim()).filter((x) => isGroupChatId(x))),
    ];
    const groupEntries = [];
    if (groupIdsList.length > 0) {
      const nGrp = groupIdsList.length;
      const metaCmdsGrp = groupIdsList.map((gid) => ["GET", groupMetaKey(gid)]);
      const lrCmdsGrp = groupIdsList.map((gid) => ["LRANGE", groupMsgsKey(gid), "0", String(MAX_MESSAGES - 1)]);
      const seenCmdsGrp = groupIdsList.map((gid) => ["HGET", CHAT_SEEN_CURSOR_KEY, seenCursorField(myId, gid)]);
      const grpPipe = await redisPipeline([...metaCmdsGrp, ...lrCmdsGrp, ...seenCmdsGrp]);
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
        const lrRawG = grpPipe && grpPipe[gi + nGrp] ? grpPipe[gi + nGrp].result : [];
        const listGrp = Array.isArray(lrRawG) ? lrRawG : [];
        let lastTGrp = "";
        const firstElG = listGrp[0];
        if (firstElG != null) {
          try {
            const mmG = typeof firstElG === "string" ? JSON.parse(firstElG) : firstElG;
            if (mmG && mmG.time) lastTGrp = String(mmG.time);
          } catch (eLT) {}
        }
        const seenRawGrp = grpPipe && grpPipe[gi + 2 * nGrp] ? grpPipe[gi + 2 * nGrp].result : null;
        const serverLvGrp = seenRawGrp != null ? String(seenRawGrp).trim() : "";
        const clientLvGrp = lastViewed[gid] != null ? String(lastViewed[gid]) : "";
        const lastViewGrp = mergeReadCursors(clientLvGrp, serverLvGrp);
        let unreadGrp = 0;
        listGrp.forEach((s) => {
          try {
            const mmU = typeof s === "string" ? JSON.parse(s) : null;
            const fromNu = mmU && mmU.from != null ? normalizeStoredMessageFromId(mmU.from) : "";
            if (
              mmU &&
              chatMessageIsNewerThanLastViewed(mmU.time, lastViewGrp) &&
              fromNu &&
              fromNu !== myIdNorm
            )
              unreadGrp++;
          } catch (eUg) {}
        });
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
      }
    }
    contactsAll = groupEntries.concat(contactsAll);
    contactsAll.sort((a, b) => {
      const tA = lastMessageTime[a.id] || "";
      const tB = lastMessageTime[b.id] || "";
      if (tA && !tB) return -1;
      if (!tA && tB) return 1;
      if (tB !== tA) return tB.localeCompare(tA);
      return (a.id || "").localeCompare(b.id || "");
    });
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
    let generalChatPickMembers = [];
    try {
      const rosterPick = await buildGeneralChatRosterPayload(myId, admin);
      if (Array.isArray(rosterPick.generalMembers)) {
        generalChatPickMembers = rosterPick.generalMembers
          .filter((gm) => gm && gm.id && !gm.isYou)
          .map((gm) => ({
            id: gm.id,
            name: gm.name || gm.id,
            avatar: gm.avatar || null,
            online: !!gm.online,
            admin: !!gm.admin,
          }));
      }
    } catch (eGcp) {
      console.error("[chat] generalChatPickMembers", eGcp && eGcp.message ? eGcp.message : eGcp);
    }
    return res.status(200).json({
      ok: true,
      contacts: contactsAll,
      friendIds: friendIdsForResponse,
      isAdmin: admin,
      participantsCount,
      onlineCount,
      adminUnread: Object.keys(adminUnread).length ? adminUnread : undefined,
      generalUnreadCount: outGeneralUnread > 0 ? outGeneralUnread : 0,
      clubChatAccess,
      clubChatPendingReviewCount,
      generalChatParticipantsCount: generalChatStats.generalChatParticipantsCount,
      generalChatOnlineCount: generalChatStats.generalChatOnlineCount,
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
      const actorNorm = normalizeStoredMessageFromId(myId);
      const redisNickActor = await getVisitorUsername(myId);
      const actorLabel =
        (displayMap[actorNorm] && String(displayMap[actorNorm]).trim()) ||
        buildChatDisplayName(identity, redisNickActor) ||
        "Участник";
      const addedLabels = addedNorm
        .map((nid) => {
          const nm = displayMap[nid] && String(displayMap[nid]).trim();
          if (nm) return nm;
          const raw = String(nid).replace(/^(tg_|vk_)/, "");
          return raw || "Участник";
        })
        .join(", ");
      const systemText = `${actorLabel} добавил(а) в группу: ${addedLabels}`;
      const sysMsg = {
        id: "grp_sys_" + Date.now() + "_" + Math.random().toString(36).slice(2, 10),
        groupSystemEvent: "members_added",
        text: systemText.slice(0, CHAT_MESSAGE_TEXT_MAX),
        time: new Date().toISOString(),
        from: null,
      };
      const gKeySys = groupMsgsKey(groupId);
      const nowSys = Date.now();
      await redisPipeline([
        ["LPUSH", gKeySys, JSON.stringify(sysMsg)],
        ["LTRIM", gKeySys, "0", String(MAX_MESSAGES - 1)],
        ["ZADD", CHAT_ONLINE_KEY, String(nowSys), myId],
      ]);
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
      await redisPipeline([
        ["LPUSH", gKeyL, JSON.stringify(sysMsgL)],
        ["LTRIM", gKeyL, "0", String(MAX_MESSAGES - 1)],
        ["ZADD", CHAT_ONLINE_KEY, String(nowL), myId],
      ]);
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
      await redisPipeline([
        ["LPUSH", gKeyRm, JSON.stringify(sysMsgRm)],
        ["LTRIM", gKeyRm, "0", String(MAX_MESSAGES - 1)],
        ["ZADD", CHAT_ONLINE_KEY, String(nowRm), myId],
      ]);
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
      const resultsG2 = await redisPipeline([
        ["LPUSH", gKey, JSON.stringify(msgG)],
        ["LTRIM", gKey, "0", String(MAX_MESSAGES - 1)],
        ["ZADD", CHAT_ONLINE_KEY, String(nowGrp), myId],
      ]);
      if (!resultsG2 || !Array.isArray(resultsG2) || resultsG2.some((r) => r && r.error)) {
        return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
      }
      try {
        const snippetG =
          text ||
          (image ? "Фото" : "") ||
          (voice ? "Голосовое" : "") ||
          (document ? documentName : "") ||
          "Сообщение";
        const { notifyChatGroupWebPush } = require("../chat-webpush-notify");
        const membersPush = Array.isArray(gMetaPost.members)
          ? gMetaPost.members.map((x) => String(x).trim()).filter(Boolean)
          : [];
        const groupTitlePush = gMetaPost.title != null ? String(gMetaPost.title).trim() : "";
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
      } catch (ePushG) {
        console.error("[chat] notifyChatGroupWebPush", ePushG && ePushG.message ? ePushG.message : ePushG);
      }
      return res.status(200).json({ ok: true, message: msgG });
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
    const results = await redisPipeline([
      ["LPUSH", key, JSON.stringify(msg)],
      ["LTRIM", key, "0", String(MAX_MESSAGES - 1)],
      ["SADD", "poker_app:chat_partners:" + myId, otherId],
      ["SADD", "poker_app:chat_partners:" + otherId, myId],
      ["ZADD", CHAT_ONLINE_KEY, String(now), myId],
      ...cleanupRomanAlias,
    ]);

    if (!results || !Array.isArray(results) || results.some((r) => r && r.error)) {
      return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
    }

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
        await sendTelegram(otherTgId, "💬 " + senderDisplayName + ": " + tgBody, {
          text: "Открыть чат",
          url: openDm,
        });
      }
    }

    try {
      const snippet =
        text ||
        (image ? "Фото" : "") ||
        (voice ? "Голосовое" : "") ||
        (document ? documentName : "") ||
        "Сообщение";
      const { notifyChatDmWebPush } = require("../chat-webpush-notify");
      /* Vercel/serverless: дождаться отправки пуша до ответа — иначе процесс может оборваться. */
      await notifyChatDmWebPush({
        recipientId: otherId,
        senderId: myId,
        senderName: senderDisplayName,
        snippet: String(snippet).slice(0, 120),
      });
    } catch (ePush) {
      console.error("[chat] notifyChatDmWebPush", ePush && ePush.message ? ePush.message : ePush);
    }

    return res.status(200).json({ ok: true, message: msg });
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
  const results = await redisPipeline([
    ["LPUSH", GENERAL_KEY, JSON.stringify(msg)],
    ["LTRIM", GENERAL_KEY, "0", String(MAX_MESSAGES - 1)],
    ["ZADD", CHAT_ONLINE_KEY, String(now), myId],
  ]);

  if (!results || !Array.isArray(results) || results.some((r) => r && r.error)) {
    return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
  }

  try {
    const snippet =
      text ||
      (image ? "Фото" : "") ||
      (voice ? "Голосовое" : "") ||
      (document ? documentName : "") ||
      "Сообщение";
    const { triggerGeneralChatWebPush } = require("../chat-webpush-notify");
    await triggerGeneralChatWebPush({
      senderId: myId,
      senderName: senderDisplayName,
      snippet: String(snippet).slice(0, 120),
    });
  } catch (ePushG) {
    console.error("[chat] triggerGeneralChatWebPush", ePushG && ePushG.message ? ePushG.message : ePushG);
  }

  return res.status(200).json({ ok: true, message: msg });
};
