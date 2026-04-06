/**
 * Чат: общий для всех + личные сообщения.
 * Админ (TELEGRAM_ADMIN_ID): удаляет сообщения в общем чате, пишет в личку любому.
 * Redis: poker_app:chat_messages (общий), poker_app:chat:{id1}_{id2} (личные).
 *
 * Главный чат по заявке: CLUB_CHAT_REQUIRE_APPLICATION=0 отключает (по умолчанию включено).
 * Ключи: poker_app:club_chat_pending, poker_app:club_chat_members,
 *        poker_app:club_chat_member_joined_at (HASH userId → ISO времени одобрения)
 * GET mode=clubChatManage (админ), PATCH action=clubChatApply|Approve|Reject|Revoke
 * Новая заявка (clubChatApply): личные сообщения всем id из TELEGRAM_ADMIN_ID (нужен TELEGRAM_BOT_TOKEN).
 *
 * Уведомление в личку Telegram: только для личного чата (POST with=tg_…), после сохранения в Redis.
 * Общий чат в Telegram не дублируется. Собеседник vk_… в TG не уведомляется. Ошибки sendMessage пишутся в лог.
 */
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { sendTelegramMessage: sendTelegramBotMessage } = require("../telegram-bot-send");

/** Числовой Telegram id Романа (закреплён в миниаппе как tg_roman). Совпадает с первым id в дефолтном TELEGRAM_ADMIN_ID при необходимости задать вручную: TELEGRAM_ROMAN_CHAT_ID */
const TELEGRAM_ROMAN_NUMERIC = String(process.env.TELEGRAM_ROMAN_CHAT_ID || "388008256").replace(/^tg_/, "");

function normalizePeerChatUserId(raw) {
  const s = String(raw || "").trim();
  if (!s) return s;
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
/** Включено, если не задано CLUB_CHAT_REQUIRE_APPLICATION=0 */
function clubChatApplicationRequired() {
  return String(process.env.CLUB_CHAT_REQUIRE_APPLICATION || "1").trim() !== "0";
}
const CLUB_CHAT_PENDING_KEY = "poker_app:club_chat_pending";
const CLUB_CHAT_MEMBERS_KEY = "poker_app:club_chat_members";
const CLUB_CHAT_MEMBER_JOINED_AT_KEY = "poker_app:club_chat_member_joined_at";

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
const RESPECT_SCORE_KEY = "poker_app:respect_score";
const ONLINE_TTL_MS = 5 * 60 * 1000; // 5 минут
const DT_IDS_KEY = "poker_app:visitor_dt_ids";
const P21_IDS_KEY = "poker_app:visitor_p21_ids";
const USERNAMES_KEY = "poker_app:visitor_usernames";
const AVATAR_PREFIX = "poker_app:avatar:";
const MAX_MESSAGES = 100;

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

/** open = режим выключен; member / pending / need_apply */
async function getClubChatAccessState(myId, admin) {
  if (!clubChatApplicationRequired()) return "open";
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
  const nameNick = buildChatDisplayName(identity || {}, redisNick);
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

    const redisKey = withId ? convKey(myId, normalizePeerChatUserId(withId)) : GENERAL_KEY;
    if (redisKey === GENERAL_KEY && clubChatApplicationRequired() && !(await hasClubGeneralAccess(myId, admin))) {
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
    if (!admin && msgFrom !== myId) return res.status(403).json({ ok: false, error: "Можно удалить только своё сообщение" });

    const results2 = await redisPipeline([["LREM", redisKey, "0", toRemove]]);
    if (!results2 || results2[0]?.error) return res.status(500).json({ ok: false, error: "Ошибка удаления" });
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
      if (!newText || newText.length > 1000) return res.status(400).json({ ok: false, error: "Текст от 1 до 1000 символов" });
      const redisKey = withId ? convKey(myId, normalizePeerChatUserId(withId)) : GENERAL_KEY;
      if (redisKey === GENERAL_KEY && clubChatApplicationRequired() && !(await hasClubGeneralAccess(myId, admin))) {
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
            if (m.from !== myId) return res.status(403).json({ ok: false, error: "Можно редактировать только свои сообщения" });
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
      if (!clubChatApplicationRequired()) return res.status(200).json({ ok: true, clubChatAccess: "open" });
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
        const targetLogin = await getVisitorUsername(targetId);
        const adminLogin = await getVisitorUsername(myId);
        const loginPart = targetLogin
          ? "@" + targetLogin.replace(/^@+/, "")
          : "не указан в профиле, id: " + targetId;
        const noticeText = "✅ В чат принят игрок. Логин: " + loginPart;
        const adminFromName = adminLogin ? "@" + adminLogin.replace(/^@+/, "") : "Администратор";
        const noticeMsg = {
          id: "msg_club_admit_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9),
          from: myId,
          fromName: adminFromName,
          text: noticeText,
          time: new Date().toISOString(),
          clubAdmissionNotice: true,
          clubAdmissionTargetUsername: targetLogin ? String(targetLogin).replace(/^@+/, "").trim() : "",
          clubAdmissionTargetTgId: targetId.replace(/^tg_/, ""),
        };
        const admittedAt = String(noticeMsg.time || "").trim() || new Date().toISOString();
        const r = await redisPipeline([
          ["SREM", CLUB_CHAT_PENDING_KEY, targetId],
          ["SADD", CLUB_CHAT_MEMBERS_KEY, targetId],
          ["HSET", CLUB_CHAT_MEMBER_JOINED_AT_KEY, targetId, admittedAt],
          ["LPUSH", GENERAL_KEY, JSON.stringify(noticeMsg)],
          ["LTRIM", GENERAL_KEY, "0", String(MAX_MESSAGES - 1)],
        ]);
        if (!r || r.some((x) => x && x.error)) return res.status(500).json({ ok: false, error: "Ошибка Redis" });
        return res.status(200).json({ ok: true });
      }
      if (action === "clubChatReject") {
        const r = await redisPipeline([["SREM", CLUB_CHAT_PENDING_KEY, targetId]]);
        if (!r || r[0]?.error) return res.status(500).json({ ok: false, error: "Ошибка Redis" });
        return res.status(200).json({ ok: true });
      }
      const r = await redisPipeline([
        ["SREM", CLUB_CHAT_MEMBERS_KEY, targetId],
        ["SREM", CLUB_CHAT_PENDING_KEY, targetId],
        ["HDEL", CLUB_CHAT_MEMBER_JOINED_AT_KEY, targetId],
      ]);
      if (!r || r.some((x) => x && x.error)) return res.status(500).json({ ok: false, error: "Ошибка Redis" });
      return res.status(200).json({ ok: true });
    }

    if (action === "reaction") {
      const messageId = body.messageId || body.message_id || req.query.messageId;
      const emoji = (body.emoji || req.query.emoji || "").toString().trim();
      const withId = body.with || body.conversationWith || req.query.with;
      const allowedEmojis = ["👍", "❤️", "😂", "😮", "😢", "🙏"];
      if (!messageId) return res.status(400).json({ ok: false, error: "messageId обязателен" });
      if (!allowedEmojis.includes(emoji)) return res.status(400).json({ ok: false, error: "Недопустимая реакция" });
      const redisKey = withId ? convKey(myId, normalizePeerChatUserId(withId)) : GENERAL_KEY;
      if (redisKey === GENERAL_KEY && clubChatApplicationRequired() && !(await hasClubGeneralAccess(myId, admin))) {
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
      const resSet = await redisPipeline([["LSET", redisKey, String(idx), newStr]]);
      if (!resSet || resSet[0]?.error) return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
      return res.status(200).json({ ok: true, message: msgObj });
    }

    return res.status(400).json({
      ok: false,
      error: "action: edit, block, unblock, reaction, clubChatApply, clubChatApprove, clubChatReject, clubChatRevoke",
    });
  }

  // GET
  if (req.method === "GET") {
    const withId = req.query.with || req.query.other;
    const mode = req.query.mode || body.mode;

    if (withId) {
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
      const [dtIdsMap, avatarsMap, p21IdsMap] = await Promise.all([getDtIds(fromIds), getAvatars(fromIds), getP21Ids(fromIds)]);
      deduped.forEach((m) => {
        if (m.from) {
          if (dtIdsMap[m.from]) m.fromDtId = dtIdsMap[m.from];
          if (avatarsMap[m.from]) m.fromAvatar = avatarsMap[m.from];
          if (p21IdsMap[m.from]) m.fromP21Id = p21IdsMap[m.from];
          m.fromAdmin = isAdmin(m.from);
        }
      });
      const latestInThread = deduped.length ? deduped[deduped.length - 1].time : null;
      if (trackSeen && latestInThread) await bumpSeenCursor(myId, otherId, latestInThread);
      const peerSeenUpTo = await getSeenCursor(otherId, myId);
      applyPeerReadReceiptsToMyMessages(deduped, myId, peerSeenUpTo);
      const otherDtId = dtIdsMap && otherId ? (dtIdsMap[otherId] || null) : null;
      return res.status(200).json({ ok: true, messages: deduped, isAdmin: admin, participantsCount, onlineCount, otherDtId: otherDtId || undefined });
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
      const [msgResults, blockedResults, onlineResults, pendingCountPipe] = await Promise.all([
        redisPipeline([["LRANGE", GENERAL_KEY, "0", String(MAX_MESSAGES - 1)]]),
        redisPipeline([["SMEMBERS", BLOCKED_KEY]]),
        redisPipeline([
          ["ZADD", CHAT_ONLINE_KEY, String(now), myId],
          ["ZREMRANGEBYSCORE", CHAT_ONLINE_KEY, "-inf", String(minScore)],
          ["ZCOUNT", CHAT_ONLINE_KEY, String(minScore), "+inf"],
        ]),
        needPendingBadge ? redisPipeline([["SCARD", CLUB_CHAT_PENDING_KEY]]) : Promise.resolve([{ result: 0 }]),
      ]);
      const clubChatPendingReviewCount =
        needPendingBadge && pendingCountPipe && pendingCountPipe[0] && pendingCountPipe[0].result != null
          ? Number(pendingCountPipe[0].result) || 0
          : 0;
      const onlineCount =
        onlineResults && onlineResults[2] && typeof onlineResults[2].result === "number" ? onlineResults[2].result : 0;
      if (clubChatApplicationRequired() && !admin && clubChatAccess !== "member") {
        return res.status(200).json({
          ok: true,
          messages: [],
          isAdmin: admin,
          participantsCount: 0,
          onlineCount,
          clubChatAccess,
          clubChatPendingReviewCount,
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
      const participantsCount = participantsSet.size;
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
      const trackSeenGeneral = req.query.trackSeen !== "0" && req.query.trackSeen !== "false";
      const latestInGeneral = deduped.length ? deduped[deduped.length - 1].time : null;
      if (trackSeenGeneral && latestInGeneral) await bumpGeneralLastSeen(myId, String(latestInGeneral).trim());
      return res.status(200).json({
        ok: true,
        messages: deduped,
        isAdmin: admin,
        participantsCount,
        onlineCount,
        clubChatAccess,
        clubChatPendingReviewCount,
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
        isAdmin: admin,
        participantsCount: 0,
        onlineCount: 0,
        clubChatAccess: clubEmpty,
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
    const onlineSet = new Set();
    let onlineCount = 0;
    if (partnerIds.length > 0) {
      const scoreCmds = partnerIds.flatMap((id) => [["ZSCORE", CHAT_ONLINE_KEY, id]]);
      const scoreResults = await redisPipeline(scoreCmds);
      if (scoreResults && Array.isArray(scoreResults)) {
        partnerIds.forEach((id, i) => {
          const s = scoreResults[i]?.result;
          if (s != null && parseFloat(s) >= minScore) {
            onlineCount++;
            onlineSet.add(id);
          }
        });
      }
    }
    const participantsCount = partnerIds.length;

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

    const [dtIds, avatars] = await Promise.all([getDtIds(partnerIds), getAvatars(partnerIds)]);
    const contacts = partnerIds.map((id) => ({
      id,
      name: usernames[id] ? "@" + usernames[id] : id,
      dtId: dtIds[id] || null,
      avatar: avatars[id] || null,
      online: onlineSet.has(id),
      admin: isAdmin(id),
      unreadCount: unreadCounts[id] != null ? unreadCounts[id] : 0,
    }));
    contacts.sort((a, b) => {
      const tA = lastMessageTime[a.id] || "";
      const tB = lastMessageTime[b.id] || "";
      if (tB !== tA) return tB.localeCompare(tA);
      return (a.id || "").localeCompare(b.id || "");
    });
    const adminUnread = {};
    adminIds.forEach((id) => {
      if (unreadCounts[id] != null && unreadCounts[id] > 0) adminUnread[id] = unreadCounts[id];
    });
    const clubChatAccess = await getClubChatAccessState(myId, admin);
    let outGeneralUnread = generalUnreadCount;
    if (clubChatApplicationRequired() && !admin && clubChatAccess !== "member") {
      outGeneralUnread = 0;
    }
    let clubChatPendingReviewCount = 0;
    if (admin && clubChatApplicationRequired()) {
      clubChatPendingReviewCount = await getClubChatPendingCount();
    }
    return res.status(200).json({
      ok: true,
      contacts,
      isAdmin: admin,
      participantsCount,
      onlineCount,
      adminUnread: Object.keys(adminUnread).length ? adminUnread : undefined,
      generalUnreadCount: outGeneralUnread > 0 ? outGeneralUnread : 0,
      clubChatAccess,
      clubChatPendingReviewCount,
    });
  }

  // POST
  const withId = body.with || body.to || body.userId;
  const text = (body.text || body.message || "").trim();
  let image = body.image;
  if (image && typeof image === "string") {
    const m = image.match(/^data:image\/(jpeg|jpg|png|gif|webp);base64,(.+)$/);
    image = m && m[2] && m[2].length < 250000 ? image : null;
  }
  let voice = body.voice;
  if (voice && typeof voice === "string") {
    const v = voice.match(/^data:audio\/[^,]+,([\s\S]+)$/);
    voice = v && v[1] && v[1].length < 800000 ? voice : null; // ~600KB base64 ≈ 1 мин
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
    text: String(body.replyTo.text || "").slice(0, 1000),
    from: body.replyTo.from || null,
    fromName: String(body.replyTo.fromName || "Игрок").slice(0, 100),
  } : null;

  const redisNickSender = await getVisitorUsername(myId);
  const senderDisplayName = buildChatDisplayName(identity, redisNickSender);

  if ((!text || text.length > 1000) && !image && !voice && !document) {
    return res.status(400).json({ ok: false, error: "Текст от 1 до 1000 символов, картинка, голосовое или документ PDF" });
  }
  if (text && text.length > 1000) {
    return res.status(400).json({ ok: false, error: "Текст до 1000 символов" });
  }

  if (withId) {
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
      void notifyChatDmWebPush({
        recipientId: otherId,
        senderId: myId,
        senderName: senderDisplayName,
        snippet: String(snippet).slice(0, 120),
      });
    } catch (ePush) {}

    return res.status(200).json({ ok: true, message: msg });
  }

  const blockedCheck = await redisPipeline([["SISMEMBER", BLOCKED_KEY, myId]]);
  const amBlocked = blockedCheck && blockedCheck[0] && blockedCheck[0].result === 1;
  if (amBlocked) return res.status(403).json({ ok: false, error: "Вы заблокированы в чате" });

  if (clubChatApplicationRequired() && !(await hasClubGeneralAccess(myId, admin))) {
    return res.status(403).json({ ok: false, error: "Нет доступа к общему чату. Подайте заявку и дождитесь одобрения." });
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
    void triggerGeneralChatWebPush({
      senderId: myId,
      senderName: senderDisplayName,
      snippet: String(snippet).slice(0, 120),
    });
  } catch (ePushG) {}

  return res.status(200).json({ ok: true, message: msg });
};
