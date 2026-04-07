/**
 * Web Push: рассылка при новых сообщениях в чате (PWA).
 * Переменные: WEBPUSH_VAPID_PUBLIC_KEY, WEBPUSH_VAPID_PRIVATE_KEY, WEBPUSH_CONTACT_EMAIL (mailto:…),
 * UPSTASH_REDIS_*, TELEGRAM_BOT_TOKEN, CLUB_CHAT_REQUIRE_APPLICATION, TELEGRAM_ADMIN_ID.
 * Отладка: LOG_CHAT_DM_PUSH=1 — «dm: sent» / «dm: 0 deliveries», «send: hash пуст» vs «все endpoint отбились»,
 * плюс deploy (VERCEL_ENV / VERCEL_URL) рядом с subscribe saved на другом handler — чтобы отловить prod vs preview.
 * Общий чат: второй запрос /api/chat-push-broadcast (VERCEL_URL + CHAT_PUSH_DISPATCH_SECRET или CRON_SECRET).
 */
"use strict";

const crypto = require("crypto");

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const CLUB_CHAT_MEMBERS_KEY = "poker_app:club_chat_members";
const ADMIN_IDS = (process.env.TELEGRAM_ADMIN_ID || "388008256,2144406710,1897001087")
  .toString()
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const CHAT_PUSH_SUB_PREFIX = "poker_app:chat_push_sub:";
const CHAT_PUSH_REGISTRY = "poker_app:chat_push_registry";
const CHAT_PUSH_DISABLED = "poker_app:chat_push_disabled";

function chatPushDeployCtx() {
  let upstashHost = "";
  try {
    if (REDIS_URL) {
      const ru = new URL(String(REDIS_URL).replace(/\/$/, ""));
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

/** Публичный/приватный ключ и флаг готовности (альтернативные имена env). */
function readVapidEnv() {
  const pub = normalizeVapidKeyMaterial(
    process.env.WEBPUSH_VAPID_PUBLIC_KEY || process.env.VAPID_PUBLIC_KEY || ""
  );
  const priv = normalizeVapidKeyMaterial(
    process.env.WEBPUSH_VAPID_PRIVATE_KEY || process.env.VAPID_PRIVATE_KEY || ""
  );
  return {
    publicKey: pub,
    privateKey: priv,
    pushConfigured: !!(pub && priv),
  };
}

let appliedVapidSig = "";
function ensureWebPush() {
  const { publicKey: pub, privateKey: priv, pushConfigured } = readVapidEnv();
  if (!pushConfigured) return false;
  const sig = crypto.createHash("sha256").update(pub + "\n" + priv).digest("hex");
  if (sig === appliedVapidSig) return true;
  try {
    const webpush = require("web-push");
    webpush.setVapidDetails(
      String(process.env.WEBPUSH_CONTACT_EMAIL || "mailto:notifications@localhost").trim(),
      pub,
      priv
    );
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

async function isPushDisabled(memberId) {
  const r = await redisPipeline([["SISMEMBER", CHAT_PUSH_DISABLED, String(memberId)]]);
  return r && r[0] && r[0].result === 1;
}

async function sendToMemberDevices(memberId, payload) {
  if (!REDIS_URL || !REDIS_TOKEN) return 0;
  if (!ensureWebPush()) return 0;
  if (await isPushDisabled(memberId)) return 0;
  const r = await redisPipeline([["HGETALL", CHAT_PUSH_SUB_PREFIX + memberId]]);
  const map = parseHgetall(r && r[0]);
  const keyCount = Object.keys(map).length;
  const webpush = require("web-push");
  const body = JSON.stringify(payload);
  const keyPrefix = CHAT_PUSH_SUB_PREFIX + memberId;
  var delivered = 0;
  if (process.env.LOG_CHAT_DM_PUSH === "1" && keyCount === 0) {
    console.warn("[chat-push] send: в Redis пустой hash подписок (нечего слать)", {
      memberId: String(memberId),
      subRedisKey: keyPrefix,
      ...chatPushDeployCtx(),
    });
  }
  for (const k of Object.keys(map)) {
    let sub;
    try {
      sub = JSON.parse(map[k]);
    } catch (e) {
      continue;
    }
    if (!sub || !sub.endpoint) continue;
    try {
      /* urgency: high — часть клиентов (в т.ч. iOS Web Push) иначе может задерживать или откладывать доставку */
      await webpush.sendNotification(sub, body, { TTL: 86400, urgency: "high" });
      delivered += 1;
    } catch (err) {
      const status = err && err.statusCode;
      if (status === 410 || status === 404) {
        await redisPipeline([["HDEL", keyPrefix, k]]);
      } else {
        const hint = err && err.body ? String(err.body).slice(0, 200) : err && err.message;
        const badJwt = status === 403 && hint && hint.indexOf("BadJwtToken") !== -1;
        if (badJwt) {
          /* Подписка создана под другой публичный VAPID — иначе FCM бесконечно отдаёт 403. */
          await redisPipeline([["HDEL", keyPrefix, k]]);
          const { publicKey: pubNow } = readVapidEnv();
          console.error(
            "[chat-push] BadJwtToken: подписка в Redis удалена. В профиле выкл→вкл уведомления чата (новая подписка). Проверьте пару VAPID в Vercel и дубликаты переменных.",
            {
              memberId: String(memberId),
              serverPublicKeyPrefix: pubNow ? pubNow.slice(0, 16) : "",
              ...chatPushDeployCtx(),
            }
          );
        } else {
          console.error("[chat-push] sendNotification failed", {
            memberId: String(memberId),
            statusCode: status,
            hint,
            ...chatPushDeployCtx(),
          });
        }
      }
    }
  }
  if (process.env.LOG_CHAT_DM_PUSH === "1" && keyCount > 0 && delivered === 0) {
    console.warn(
      "[chat-push] send: 0 доставок при непустом hash — смотрите ошибки sendNotification / BadJwt выше (подписка могла быть снята)",
      { memberId: String(memberId), keyCount, ...chatPushDeployCtx() }
    );
  }
  const check = await redisPipeline([["HLEN", keyPrefix]]);
  const rawLenEnd = check && check[0] ? check[0].result : null;
  const nLenEnd =
    rawLenEnd == null || rawLenEnd === "" ? NaN : Number(rawLenEnd);
  const len = Number.isFinite(nLenEnd) ? nLenEnd : 0;
  if (!len || len === 0) {
    await redisPipeline([["SREM", CHAT_PUSH_REGISTRY, memberId]]);
  }
  return delivered;
}

async function notifyChatDmWebPush({ recipientId, senderId, senderName, snippet }) {
  if (!recipientId || String(recipientId) === String(senderId)) return;
  const title = "Два туза · личное сообщение";
  const body =
    (senderName ? String(senderName).slice(0, 60) + ": " : "") +
    String(snippet || "Новое сообщение").slice(0, 120);
  const rid = String(recipientId);
  const n = await sendToMemberDevices(rid, {
    title,
    body,
    tag: "poker-chat-dm-" + String(senderId).replace(/[^\w]/g, "_").slice(0, 40),
    openUrl: "./?startapp=club_chat",
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
      const subKey = CHAT_PUSH_SUB_PREFIX + rid;
      const dbg = await redisPipeline([
        ["SISMEMBER", CHAT_PUSH_DISABLED, rid],
        ["HLEN", subKey],
        ["SISMEMBER", CHAT_PUSH_REGISTRY, rid],
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
        redis: !!(REDIS_URL && REDIS_TOKEN),
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

async function broadcastGeneralChatPushInner({ senderId, senderName, snippet }) {
  const r = await redisPipeline([["SMEMBERS", CHAT_PUSH_REGISTRY]]);
  const list = (r && r[0] && r[0].result) || [];
  const members = Array.isArray(list) ? list : [];
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
async function broadcastAdminOnlyWebPushInner({ title, body, openUrl }) {
  if (!REDIS_URL || !REDIS_TOKEN) return { ok: false, error: "redis" };
  if (!ensureWebPush()) return { ok: false, error: "vapid" };
  const t = String(title || "").trim().slice(0, 80);
  const b = String(body || "").trim().slice(0, 200);
  if (!t || !b) return { ok: false, error: "empty" };
  const url = String(openUrl || "./?startapp=club_chat").trim().slice(0, 500) || "./?startapp=club_chat";
  const tag = "poker-admin-" + Date.now();
  for (let i = 0; i < ADMIN_IDS.length; i++) {
    const raw = String(ADMIN_IDS[i] || "").trim();
    if (!raw) continue;
    const mid = "tg_" + raw;
    if (!isAdminMember(mid)) continue;
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

function triggerGeneralChatWebPush(payload) {
  const secret = process.env.CHAT_PUSH_DISPATCH_SECRET || process.env.CRON_SECRET;
  const vercelHost = process.env.VERCEL_URL;
  if (secret && vercelHost) {
    const url = "https://" + vercelHost + "/api/chat-push-broadcast";
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Chat-Push-Secret": secret,
      },
      body: JSON.stringify(payload),
    }).catch(function () {});
  }
  return broadcastGeneralChatWebPushInner(payload).catch(function (e) {
    console.error("chat push broadcast", e);
  });
}

module.exports = {
  notifyChatDmWebPush,
  triggerGeneralChatWebPush,
  broadcastGeneralChatPushInner,
  broadcastAdminOnlyWebPushInner,
  readVapidEnv,
  chatPushDeployCtx,
  CHAT_PUSH_SUB_PREFIX,
  CHAT_PUSH_REGISTRY,
  CHAT_PUSH_DISABLED,
  redisPipeline,
};
