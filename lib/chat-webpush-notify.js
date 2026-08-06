const { pipeline: redisPipeline, sscanall, isConfigured: redisConfigured, getConfig: getRedisConfig } = require("./redis");
/**
 * Web Push: рассылка при новых сообщениях в чате (PWA).
 * Переменные: WEBPUSH_VAPID_PUBLIC_KEY, WEBPUSH_VAPID_PRIVATE_KEY, WEBPUSH_CONTACT_EMAIL (mailto:…, не localhost — иначе Apple BadJwt),
 * UPSTASH_REDIS_*, TELEGRAM_BOT_TOKEN, CLUB_CHAT_REQUIRE_APPLICATION, TELEGRAM_ADMIN_ID.
 * Отладка: LOG_CHAT_DM_PUSH=1 — «dm: sent» / «dm: 0 deliveries», «send: hash пуст» vs «все endpoint отбились»,
 * плюс deploy (VERCEL_ENV / VERCEL_URL) рядом с subscribe saved на другом handler — чтобы отловить prod vs preview.
 * Общий чат: второй запрос /api/chat-push-broadcast (VERCEL_URL + CHAT_PUSH_DISPATCH_SECRET или CRON_SECRET).
 * Рассылка по ленте «Общий чат» выключена по умолчанию (CHAT_PUSH_GENERAL_ENABLED=1 — включить).
 */
"use strict";

const crypto = require("crypto");
const { ensureDtIdForUserId, getUserIdByDtId, resolveAccountId } = require("./account-id");

const CLUB_CHAT_MEMBERS_KEY = "poker_app:club_chat_members";
const ADMIN_IDS = (process.env.TELEGRAM_ADMIN_ID || "388008256,2144406710,1897001087")
  .toString()
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const CHAT_PUSH_SUB_PREFIX = "poker_app:chat_push_sub:";
const CHAT_PUSH_REGISTRY = "poker_app:chat_push_registry";
const CHAT_PUSH_DISABLED = "poker_app:chat_push_disabled";
/** Совпадает с chat.js: получатель смотрит открытый тред с отправителем — не шлём Web Push */
const CHAT_DM_FOCUS_KEY_PREFIX = "poker_app:chat_dm_focus:";
const TELEGRAM_ROMAN_NUMERIC = String(process.env.TELEGRAM_ROMAN_CHAT_ID || "388008256").replace(/^tg_/, "");

/** Должен совпадать с normalizePeerChatUserId в lib/api-handlers/chat.js */
function normalizeDmFocusPeerId(raw) {
  const s = String(raw || "").trim();
  if (!s) return "";
  if (s.toLowerCase() === "tg_roman") return "tg_" + TELEGRAM_ROMAN_NUMERIC;
  /* Совпадает с isGroupChatId в chat.js — в Redis при открытой группе хранится group_… без префикса tg_ */
  if (/^group_[a-z0-9_]{8,72}$/i.test(s)) return s;
  if (s.startsWith("tg_") || s.startsWith("vk_")) return s;
  return "tg_" + s;
}
/** Лимиты ручного пуша (заголовок / текст в уведомлении ОС и FCM). */
const CHAT_PUSH_ADMIN_TITLE_MAX = 80;
const CHAT_PUSH_ADMIN_BODY_MAX = 200;
const ADMIN_PUSH_ALLOWED_STARTAPPS = new Set([
  "club_chat",
  "club_guestbook_reviews",
  "club_guestbook_complaints",
  "club_guestbook_suggestions",
  "schedule",
  "raffles",
  "spring_rating",
  "hall_fame_top2026",
  "streams",
  "stream",
  "video_lessons",
  "learn_play_hub",
  "download",
  "cashout",
  "profile",
]);

function chatPushDeployCtx() {
  let upstashHost = "";
  try {
    const cfg = getRedisConfig();
    if (cfg.url) {
      const ru = new URL(String(cfg.url).replace(/\/$/, ""));
      upstashHost = ru.hostname || "";
    }
  } catch (eR) {}
  return {
    vercelEnv: process.env.VERCEL_ENV || "",
    vercelUrl: process.env.VERCEL_URL || "",
    deploymentId: process.env.VERCEL_DEPLOYMENT_ID || "",
    upstashHost,
  };
}

function clubChatApplicationRequired() {
  return String(process.env.CLUB_CHAT_REQUIRE_APPLICATION || "1").trim() !== "0";
}

function isAdminMember(memberId) {
  const s = String(memberId || "");
  if (s.startsWith("vk_")) return false;
  const id = s.replace(/^tg_/, "");
  return Boolean(id && ADMIN_IDS.includes(id));
}

function normalizeAdminPushOpenUrl(raw) {
  const fallback = "./?startapp=club_chat";
  const s = String(raw || "").trim();
  if (!s) return fallback;
  if (s === "./" || s === "/" || s === "/index.html" || s === "./index.html") return "./";
  try {
    const u = new URL(s, "https://two-aces.local/");
    if (u.origin !== "https://two-aces.local") return fallback;
    const start = String(u.searchParams.get("startapp") || "").trim();
    if (!start || !ADMIN_PUSH_ALLOWED_STARTAPPS.has(start)) return fallback;
    return "./?startapp=" + encodeURIComponent(start);
  } catch (e) {
    return fallback;
  }
}

function parseHgetall(entry) {
  const flat = entry && entry.result;
  const out = {};
  if (!Array.isArray(flat)) return out;
  for (let i = 0; i + 1 < flat.length; i += 2) {
    out[String(flat[i])] = flat[i + 1];
  }
  return out;
}

/** Убрать кавычки и переносы строк из значения в Vercel (иначе BadJwtToken / неверная пара). */
function normalizeVapidKeyMaterial(v) {
  let s = String(v || "").trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1).trim();
  }
  return s.replace(/\r?\n/g, "").trim();
}

/**
 * Публичный/приватный ключ и флаг готовности.
 * Важно: если задана хотя бы одна переменная WEBPUSH_VAPID_*, не подмешиваем VAPID_* —
 * иначе типичный BadJwt в Vercel: обновили только публичный WEBPUSH_*, а приватный тянется
 * из старого VAPID_PRIVATE_KEY.
 */
function readVapidEnv() {
  const wPub = normalizeVapidKeyMaterial(process.env.WEBPUSH_VAPID_PUBLIC_KEY || "");
  const wPriv = normalizeVapidKeyMaterial(process.env.WEBPUSH_VAPID_PRIVATE_KEY || "");
  const vPub = normalizeVapidKeyMaterial(process.env.VAPID_PUBLIC_KEY || "");
  const vPriv = normalizeVapidKeyMaterial(process.env.VAPID_PRIVATE_KEY || "");

  let pub = "";
  let priv = "";
  if (wPub && wPriv) {
    pub = wPub;
    priv = wPriv;
  } else if (vPub && vPriv) {
    pub = vPub;
    priv = vPriv;
  } else if (wPub || wPriv) {
    pub = wPub;
    priv = wPriv;
  }

  return {
    publicKey: pub,
    privateKey: priv,
    pushConfigured: !!(pub && priv),
  };
}

/**
 * VAPID subject для setVapidDetails: https: или mailto: (RFC).
 * Важно: web-push предупреждает, что mailto с хостом localhost не поддерживается
 * Apple Push — в ответ приходит 403 BadJwtToken (не из‑за «битой» пары ключей).
 */
function getVapidSubjectForWebPush() {
  let raw = String(process.env.WEBPUSH_CONTACT_EMAIL || "").trim();
  if ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'"))) {
    raw = raw.slice(1, -1).trim();
  }
  if (raw) {
    if (!/^mailto:|^https:/i.test(raw)) {
      raw = "mailto:" + raw.replace(/^mailto:/i, "");
    }
    try {
      const u = new URL(raw);
      if (u.protocol === "mailto:" && u.hostname === "localhost") raw = "";
      else if (u.protocol === "https:" && u.hostname === "localhost") raw = "";
      else if (raw) return raw;
    } catch (eSub) {
      raw = "";
    }
    if (raw) return raw;
  }
  const vercel = String(process.env.VERCEL_URL || "").trim().replace(/^https?:\/\//i, "");
  if (vercel) return "https://" + vercel;
  const urls = [process.env.MINI_APP_URL, process.env.APP_URL];
  for (let i = 0; i < urls.length; i++) {
    const s = String(urls[i] || "").trim();
    if (!s) continue;
    try {
      const u = new URL(s.includes("://") ? s : "https://" + s);
      if (u.protocol === "https:" && u.hostname && u.hostname !== "localhost") return u.origin;
    } catch (eUrl) {}
  }
  return "https://example.com";
}

let appliedVapidSig = "";
function ensureWebPush() {
  const { publicKey: pub, privateKey: priv, pushConfigured } = readVapidEnv();
  if (!pushConfigured) return false;
  const subjectLine = getVapidSubjectForWebPush();
  const sig = crypto
    .createHash("sha256")
    .update(pub + "\n" + priv + "\n" + subjectLine)
    .digest("hex");
  if (sig === appliedVapidSig) return true;
  try {
    const webpush = require("web-push");
    webpush.setVapidDetails(subjectLine, pub, priv);
    appliedVapidSig = sig;
    return true;
  } catch (e) {
    appliedVapidSig = "";
    console.error("[chat-push] setVapidDetails failed", e && e.message ? e.message : e);
    return false;
  }
}

async function memberHasGeneralAccess(memberId) {
  if (!clubChatApplicationRequired()) return true;
  if (isAdminMember(memberId)) return true;
  const r = await redisPipeline([["SISMEMBER", CLUB_CHAT_MEMBERS_KEY, String(memberId)]]);
  return r && r[0] && r[0].result === 1;
}

function uniquePushIds(ids) {
  return [...new Set((Array.isArray(ids) ? ids : []).map((id) => String(id || "").trim()).filter(Boolean))];
}

async function pushRecipientIds(memberId) {
  const rawId = String(memberId || "").trim();
  const accountId = await resolveAccountId(rawId);
  const ids = [];
  if (accountId) ids.push(accountId);
  if (rawId && rawId !== accountId) ids.push(rawId);
  if (accountId && /^ID\d{6}$/.test(accountId)) {
    const linkedRuntimeId = await getUserIdByDtId(accountId);
    if (linkedRuntimeId && linkedRuntimeId !== accountId) ids.push(linkedRuntimeId);
  }
  return uniquePushIds(ids);
}

async function isPushDisabled(memberId) {
  const rawId = String(memberId || "").trim();
  const accountId = await resolveAccountId(rawId);
  const canonicalId = String(accountId || rawId).trim();
  if (!canonicalId) return false;
  const results = await redisPipeline([["SISMEMBER", CHAT_PUSH_DISABLED, canonicalId]]);
  return !!(results && results[0] && results[0].result === 1);
}

async function sendToMemberDevices(memberId, payload) {
  if (!redisConfigured()) return 0;
  if (!ensureWebPush()) return 0;
  const accountId = await resolveAccountId(memberId);
  const recipientIds = await pushRecipientIds(memberId);
  if (!accountId || !recipientIds.length) return 0;
  if (await isPushDisabled(memberId)) return 0;
  const subResults = await redisPipeline(recipientIds.map((id) => ["HGETALL", CHAT_PUSH_SUB_PREFIX + id]));
  const maps = recipientIds.map((id, index) => ({
    id,
    keyPrefix: CHAT_PUSH_SUB_PREFIX + id,
    map: parseHgetall(subResults && subResults[index]),
  }));
  const keyCount = maps.reduce((sum, item) => sum + Object.keys(item.map).length, 0);
  const webpush = require("web-push");
  const body = JSON.stringify(payload);
  var delivered = 0;
  if (process.env.LOG_CHAT_DM_PUSH === "1" && keyCount === 0) {
    console.warn("[chat-push] send: в Redis пустой hash подписок (нечего слать)", {
      memberId: String(memberId),
      accountId: String(accountId),
      subRedisKeys: recipientIds.map((id) => CHAT_PUSH_SUB_PREFIX + id),
      ...chatPushDeployCtx(),
    });
  }
  const seenEndpoints = new Set();
  for (const item of maps) {
    for (const k of Object.keys(item.map)) {
      let sub;
      try {
        sub = JSON.parse(item.map[k]);
      } catch (e) {
        continue;
      }
      if (!sub || !sub.endpoint) continue;
      const endpointKey = String(sub.endpoint);
      if (seenEndpoints.has(endpointKey)) continue;
      seenEndpoints.add(endpointKey);
      try {
        /* urgency: high — часть клиентов (в т.ч. iOS Web Push) иначе может задерживать или откладывать доставку */
        await webpush.sendNotification(sub, body, { TTL: 86400, urgency: "high" });
        delivered += 1;
      } catch (err) {
        const status = err && err.statusCode;
        if (status === 410 || status === 404) {
          await redisPipeline([["HDEL", item.keyPrefix, k]]);
        } else {
          const hint = err && err.body ? String(err.body).slice(0, 200) : err && err.message;
          const badJwt = status === 403 && hint && hint.indexOf("BadJwtToken") !== -1;
          const vapidMismatch = hint && hint.indexOf("VapidPkHashMismatch") !== -1;
          if (badJwt || vapidMismatch) {
            /* Подписка создана под другой публичный VAPID — иначе FCM бесконечно отдаёт 403. */
            await redisPipeline([["HDEL", item.keyPrefix, k]]);
            const { publicKey: pubNow } = readVapidEnv();
            console.error(
              "[chat-push] VAPID mismatch: подписка в Redis удалена. В профиле выкл→вкл уведомления чата (новая подписка). Проверьте пару VAPID в Vercel и дубликаты переменных.",
              {
                memberId: String(memberId),
                accountId: String(accountId),
                subAccountId: String(item.id),
                statusCode: status,
                hint,
                serverPublicKeyPrefix: pubNow ? pubNow.slice(0, 16) : "",
                ...chatPushDeployCtx(),
              }
            );
          } else {
            console.error("[chat-push] sendNotification failed", {
              memberId: String(memberId),
              accountId: String(accountId),
              subAccountId: String(item.id),
              statusCode: status,
              hint,
              ...chatPushDeployCtx(),
            });
          }
        }
      }
    }
  }
  if (process.env.LOG_CHAT_DM_PUSH === "1" && keyCount > 0 && delivered === 0) {
    console.warn(
      "[chat-push] send: 0 доставок при непустом hash — смотрите ошибки sendNotification / BadJwt выше (подписка могла быть снята)",
      { memberId: String(memberId), accountId: String(accountId), recipientIds, keyCount, ...chatPushDeployCtx() }
    );
  }
  const check = await redisPipeline(recipientIds.map((id) => ["HLEN", CHAT_PUSH_SUB_PREFIX + id]));
  const cleanup = [];
  recipientIds.forEach((id, index) => {
    const rawLenEnd = check && check[index] ? check[index].result : null;
    const nLenEnd = rawLenEnd == null || rawLenEnd === "" ? NaN : Number(rawLenEnd);
    const len = Number.isFinite(nLenEnd) ? nLenEnd : 0;
    if (!len || len === 0) cleanup.push(["SREM", CHAT_PUSH_REGISTRY, id]);
  });
  if (delivered > 0 && accountId) cleanup.push(["SADD", CHAT_PUSH_REGISTRY, accountId]);
  if (cleanup.length) {
    await redisPipeline(cleanup);
  }
  return delivered;
}

async function notifyChatDmWebPush({ recipientId, senderId, senderName, snippet }) {
  if (!recipientId || String(recipientId) === String(senderId)) return;
  const rid = String(recipientId);
  const sid = String(senderId || "").trim();
  try {
    const fr = await redisPipeline([["GET", CHAT_DM_FOCUS_KEY_PREFIX + rid]]);
    const rawF = fr && fr[0] && fr[0].result;
    const focusedPeer = rawF != null && rawF !== false ? String(rawF).trim() : "";
    if (
      focusedPeer &&
      normalizeDmFocusPeerId(focusedPeer) === normalizeDmFocusPeerId(sid)
    ) {
      if (process.env.LOG_CHAT_DM_PUSH === "1") {
        console.warn("[chat-push] dm: skip (recipient has thread open with sender)", {
          recipientId: rid,
          senderId: sid,
          ...chatPushDeployCtx(),
        });
      }
      return;
    }
  } catch (eFocus) {}
  const title = "Два туза · личное сообщение";
  const body =
    (senderName ? String(senderName).slice(0, 60) + ": " : "") +
    String(snippet || "Новое сообщение").slice(0, 120);
  const openUrl = sid ? "./?startapp=club_chat_dm&with=" + encodeURIComponent(sid) : "./?startapp=club_chat";
  const n = await sendToMemberDevices(rid, {
    title,
    body,
    tag: "poker-chat-dm-" + String(senderId).replace(/[^\w]/g, "_").slice(0, 40),
    openUrl,
    kind: "dm",
  });
  if (process.env.LOG_CHAT_DM_PUSH === "1") {
    if (n > 0) {
      console.warn("[chat-push] dm: sent (FCM принял)", {
        recipientId: rid,
        delivered: n,
        senderId: String(senderId),
        ...chatPushDeployCtx(),
      });
    } else {
      const { pushConfigured } = readVapidEnv();
      const accountRid = await resolveAccountId(rid);
      const subKey = CHAT_PUSH_SUB_PREFIX + (accountRid || rid);
      const dbg = await redisPipeline([
        ["SISMEMBER", CHAT_PUSH_DISABLED, accountRid || rid],
        ["HLEN", subKey],
        ["SISMEMBER", CHAT_PUSH_REGISTRY, accountRid || rid],
      ]);
      const pushMutedInProfile = dbg && dbg[0] && dbg[0].result === 1;
      const rawHlen = dbg && dbg[1] ? dbg[1].result : null;
      const nH =
        rawHlen == null || rawHlen === "" ? NaN : Number(rawHlen);
      const subscriptionEndpointsInRedis = Number.isFinite(nH) ? nH : 0;
      const inPushRegistry = dbg && dbg[2] && dbg[2].result === 1;
      let endpointHostSample = "";
      if (subscriptionEndpointsInRedis > 0) {
        try {
          const rSub = await redisPipeline([["HGETALL", subKey]]);
          const map0 = parseHgetall(rSub && rSub[0]);
          const firstK = Object.keys(map0)[0];
          if (firstK) {
            const parsed = JSON.parse(map0[firstK]);
            if (parsed && parsed.endpoint) {
              endpointHostSample = String(parsed.endpoint).split("/")[2] || "";
            }
          }
        } catch (eDbg) {}
      }
      const dmZeroPayload = {
        recipientId: rid,
        redis: !!(redisConfigured()),
        vapid: pushConfigured,
        senderId: String(senderId),
        pushMutedInProfile,
        subscriptionEndpointsInRedis,
        inPushRegistry,
        endpointHostSample,
        deploy: chatPushDeployCtx(),
      };
      if (subscriptionEndpointsInRedis === 0) {
        dmZeroPayload.hint =
          "HLEN ключей подписки = 0: до Redis не дошёл успешный action=subscribe для этого memberId (в PWA: Профиль → выключить и снова включить уведомления, в логах должно быть [chat-push] subscribe saved). Либо hash очищен после 403/410. Если inPushRegistry true при HLEN 0 — рассинхрон Redis (редко); ищите subscribe rejected в логах.";
      }
      console.warn("[chat-push] dm: 0 deliveries", dmZeroPayload);
    }
  }
}

/**
 * Web Push для пользовательских групп (не общий чат клуба).
 * openUrl: club_chat_dm + with=groupId — клиент открывает тот же личный/групповой экран.
 */
async function notifyChatGroupWebPush({ recipientId, groupId, senderName, snippet, groupTitle }) {
  if (!recipientId || !groupId) return;
  const rid = String(recipientId);
  const gid = String(groupId || "").trim();
  if (!gid || !/^group_[a-z0-9_]{8,72}$/i.test(gid)) return;
  try {
    const fr = await redisPipeline([["GET", CHAT_DM_FOCUS_KEY_PREFIX + rid]]);
    const rawF = fr && fr[0] && fr[0].result;
    const focusedPeer = rawF != null && rawF !== false ? String(rawF).trim() : "";
    if (focusedPeer && normalizeDmFocusPeerId(focusedPeer) === normalizeDmFocusPeerId(gid)) {
      if (process.env.LOG_CHAT_DM_PUSH === "1") {
        console.warn("[chat-push] group: skip (recipient has group thread open)", {
          recipientId: rid,
          groupId: gid,
          ...chatPushDeployCtx(),
        });
      }
      return;
    }
  } catch (eFocusG) {}
  const gTitle = groupTitle != null && String(groupTitle).trim() ? String(groupTitle).trim().slice(0, 50) : "группа";
  const title = "Два туза · " + gTitle;
  const body =
    (senderName ? String(senderName).slice(0, 50) + ": " : "") +
    String(snippet || "Новое сообщение").slice(0, 120);
  const openUrl = "./?startapp=club_chat_dm&with=" + encodeURIComponent(gid);
  const n = await sendToMemberDevices(rid, {
    title,
    body,
    tag: "poker-chat-group-" + gid.replace(/[^\w]/g, "_").slice(0, 48),
    openUrl,
    kind: "group",
  });
  if (process.env.LOG_CHAT_DM_PUSH === "1" && n > 0) {
    console.warn("[chat-push] group: sent", { recipientId: rid, groupId: gid, delivered: n, ...chatPushDeployCtx() });
  }
}

async function broadcastGeneralChatPushInner({ senderId, senderName, snippet }) {
  /* Личка и группы — notifyChatDmWebPush / notifyChatGroupWebPush. Лента «Общий чат» по умолчанию без пушей (CHAT_PUSH_GENERAL_ENABLED=1 — старое поведение). */
  if (String(process.env.CHAT_PUSH_GENERAL_ENABLED || "0").trim() !== "1") return;
  const members = await sscanall(CHAT_PUSH_REGISTRY, {
    context: "chat-push.general-subscribers",
    count: 250,
    maxPages: 100,
  }) || [];
  const title = "Два туза · общий чат";
  const body =
    (senderName ? String(senderName).slice(0, 50) + ": " : "") +
    String(snippet || "Новое сообщение").slice(0, 120);
  for (let i = 0; i < members.length; i++) {
    const mid = String(members[i]);
    if (mid === String(senderId)) continue;
    if (!(await memberHasGeneralAccess(mid))) continue;
    await sendToMemberDevices(mid, {
      title,
      body,
      tag: "poker-chat-general",
      openUrl: "./?startapp=club_chat",
      kind: "general",
    });
  }
}

/**
 * Ручная рассылка: только пользователи из TELEGRAM_ADMIN_ID с сохранённой подпиской push (как у обычного чат-пуша).
 */
/**
 * Активные подписчики: в реестре push, не в «отключено», есть хотя бы один endpoint в hash.
 */
async function listActiveChatPushSubscribers() {
  if (!redisConfigured()) return { count: 0, subscribers: [], activeMemberIds: [] };
  const registryMembers = await sscanall(CHAT_PUSH_REGISTRY, {
    context: "chat-push.active-subscribers",
    count: 250,
    maxPages: 100,
  });
  const members = Array.isArray(registryMembers) ? registryMembers.map(String).filter(Boolean) : [];
  const activeMemberIds = [];
  const chunkSize = 80;
  for (let c = 0; c < members.length; c += chunkSize) {
    const chunk = members.slice(c, c + chunkSize);
    const cmds = [];
    for (let i = 0; i < chunk.length; i++) {
      cmds.push(["SISMEMBER", CHAT_PUSH_DISABLED, chunk[i]]);
      cmds.push(["HLEN", CHAT_PUSH_SUB_PREFIX + chunk[i]]);
    }
    const res = await redisPipeline(cmds);
    if (!res || !Array.isArray(res)) continue;
    for (let i = 0; i < chunk.length; i++) {
      const muted = res[i * 2] && res[i * 2].result === 1;
      const rawH = res[i * 2 + 1] ? res[i * 2 + 1].result : null;
      const hlen = rawH == null || rawH === "" ? 0 : Number(rawH);
      if (!muted && Number.isFinite(hlen) && hlen > 0) activeMemberIds.push(chunk[i]);
    }
  }
  const namesRes = members.length
    ? await redisPipeline([["HMGET", "poker_app:visitor_usernames", ...activeMemberIds]])
    : [];
  const nameValues = namesRes && namesRes[0] && Array.isArray(namesRes[0].result) ? namesRes[0].result : [];
  const nameMap = {};
  activeMemberIds.forEach((memberId, index) => {
    if (nameValues[index] != null) nameMap[memberId] = nameValues[index];
  });
  const subscribers = activeMemberIds
    .slice()
    .sort()
    .map((memberId) => {
      const u = nameMap[memberId] ? String(nameMap[memberId]).replace(/^@+/, "").trim() : "";
      const display = u ? "@" + u : memberId;
      return { memberId, username: u, display };
    });
  return { count: subscribers.length, subscribers, activeMemberIds };
}

/**
 * Ручная рассылка всем с включёнными оповещениями чата и сохранённой подпиской Web Push.
 */
async function broadcastAllChatPushSubscribersInner({ title, body, openUrl }) {
  if (!redisConfigured()) return { ok: false, error: "redis" };
  if (!ensureWebPush()) return { ok: false, error: "vapid" };
  const t = String(title || "").trim().slice(0, CHAT_PUSH_ADMIN_TITLE_MAX);
  const b = String(body || "").trim().slice(0, CHAT_PUSH_ADMIN_BODY_MAX);
  if (!t || !b) return { ok: false, error: "empty" };
  const url = normalizeAdminPushOpenUrl(openUrl);
  const tag = "poker-chat-push-all-" + Date.now();
  const { activeMemberIds } = await listActiveChatPushSubscribers();
  for (let i = 0; i < activeMemberIds.length; i++) {
    await sendToMemberDevices(activeMemberIds[i], {
      title: t,
      body: b,
      tag,
      openUrl: url,
      kind: "admin_broadcast_all",
    });
  }
  return { ok: true, recipients: activeMemberIds.length };
}

async function broadcastAdminOnlyWebPushInner({ title, body, openUrl }) {
  if (!redisConfigured()) return { ok: false, error: "redis" };
  if (!ensureWebPush()) return { ok: false, error: "vapid" };
  const t = String(title || "").trim().slice(0, CHAT_PUSH_ADMIN_TITLE_MAX);
  const b = String(body || "").trim().slice(0, CHAT_PUSH_ADMIN_BODY_MAX);
  if (!t || !b) return { ok: false, error: "empty" };
  const url = normalizeAdminPushOpenUrl(openUrl);
  const tag = "poker-admin-" + Date.now();
  for (let i = 0; i < ADMIN_IDS.length; i++) {
    const raw = String(ADMIN_IDS[i] || "").trim();
    if (!raw) continue;
    const mid = await ensureDtIdForUserId("tg_" + raw);
    if (!mid) continue;
    await sendToMemberDevices(mid, {
      title: t,
      body: b,
      tag,
      openUrl: url,
      kind: "admin_broadcast",
    });
  }
  return { ok: true };
}

async function triggerGeneralChatWebPush(payload) {
  const secret = process.env.CHAT_PUSH_DISPATCH_SECRET || process.env.CRON_SECRET;
  let vercelHost = process.env.VERCEL_URL;
  if (vercelHost) {
    vercelHost = String(vercelHost)
      .trim()
      .replace(/^https?:\/\//i, "")
      .replace(/\/$/, "");
  }
  if (secret && vercelHost) {
    const url = "https://" + vercelHost + "/api/chat-push-broadcast";
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Chat-Push-Secret": secret,
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) return;
      const t = await res.text().catch(function () {
        return "";
      });
      console.error("chat push dispatch HTTP", res.status, String(t).slice(0, 300));
    } catch (e) {
      console.error("chat push dispatch", e);
    }
    try {
      await broadcastGeneralChatPushInner(payload);
    } catch (e2) {
      console.error("chat push broadcast fallback", e2);
    }
    return;
  }
  try {
    await broadcastGeneralChatPushInner(payload);
  } catch (e) {
    console.error("chat push broadcast", e);
  }
}

function triggerGeneralChatWebPushFromStoredMessage(msg) {
  if (!msg || typeof msg !== "object") return Promise.resolve();
  const senderId = msg.from != null ? String(msg.from) : "";
  const senderName = msg.fromName != null ? String(msg.fromName) : "";
  const snippet = (msg.text != null ? String(msg.text) : "Сообщение").trim().slice(0, 120);
  return triggerGeneralChatWebPush({ senderId, senderName, snippet });
}

module.exports = {
  notifyChatDmWebPush,
  notifyChatGroupWebPush,
  triggerGeneralChatWebPush,
  triggerGeneralChatWebPushFromStoredMessage,
  broadcastGeneralChatPushInner,
  broadcastAdminOnlyWebPushInner,
  broadcastAllChatPushSubscribersInner,
  sendToMemberDevices,
  listActiveChatPushSubscribers,
  readVapidEnv,
  chatPushDeployCtx,
  CHAT_PUSH_SUB_PREFIX,
  CHAT_PUSH_REGISTRY,
  CHAT_PUSH_DISABLED,
  CHAT_PUSH_ADMIN_TITLE_MAX,
  CHAT_PUSH_ADMIN_BODY_MAX,
  normalizeAdminPushOpenUrl,
  redisPipeline,
};
