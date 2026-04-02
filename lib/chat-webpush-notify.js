/**
 * Web Push: рассылка при новых сообщениях в чате (PWA).
 * Переменные: WEBPUSH_VAPID_PUBLIC_KEY, WEBPUSH_VAPID_PRIVATE_KEY, WEBPUSH_CONTACT_EMAIL (mailto:…),
 * UPSTASH_REDIS_*, TELEGRAM_BOT_TOKEN, CLUB_CHAT_REQUIRE_APPLICATION, TELEGRAM_ADMIN_ID.
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

/** Публичный/приватный ключ и флаг готовности (trim + альтернативные имена env). */
function readVapidEnv() {
  const pub = String(
    process.env.WEBPUSH_VAPID_PUBLIC_KEY || process.env.VAPID_PUBLIC_KEY || ""
  ).trim();
  const priv = String(
    process.env.WEBPUSH_VAPID_PRIVATE_KEY || process.env.VAPID_PRIVATE_KEY || ""
  ).trim();
  return {
    publicKey: pub,
    privateKey: priv,
    pushConfigured: !!(pub && priv),
  };
}

let vapidReady = false;
function ensureWebPush() {
  if (vapidReady) return true;
  const { publicKey: pub, privateKey: priv, pushConfigured } = readVapidEnv();
  if (!pushConfigured) return false;
  try {
    const webpush = require("web-push");
    webpush.setVapidDetails(
      process.env.WEBPUSH_CONTACT_EMAIL || "mailto:notifications@localhost",
      pub,
      priv
    );
    vapidReady = true;
    return true;
  } catch (e) {
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
  if (!REDIS_URL || !REDIS_TOKEN) return;
  if (!ensureWebPush()) return;
  if (await isPushDisabled(memberId)) return;
  const r = await redisPipeline([["HGETALL", CHAT_PUSH_SUB_PREFIX + memberId]]);
  const map = parseHgetall(r && r[0]);
  const webpush = require("web-push");
  const body = JSON.stringify(payload);
  const keyPrefix = CHAT_PUSH_SUB_PREFIX + memberId;
  for (const k of Object.keys(map)) {
    let sub;
    try {
      sub = JSON.parse(map[k]);
    } catch (e) {
      continue;
    }
    if (!sub || !sub.endpoint) continue;
    try {
      await webpush.sendNotification(sub, body, { TTL: 86400 });
    } catch (err) {
      const status = err && err.statusCode;
      if (status === 410 || status === 404) {
        await redisPipeline([["HDEL", keyPrefix, k]]);
      } else {
        const hint = err && err.body ? String(err.body).slice(0, 200) : err && err.message;
        console.error("[chat-push] sendNotification failed", {
          memberId: String(memberId),
          statusCode: status,
          hint,
        });
      }
    }
  }
  const check = await redisPipeline([["HLEN", keyPrefix]]);
  const len = check && check[0] && Number(check[0].result);
  if (!len || len === 0) {
    await redisPipeline([["SREM", CHAT_PUSH_REGISTRY, memberId]]);
  }
}

async function notifyChatDmWebPush({ recipientId, senderId, senderName, snippet }) {
  if (!recipientId || String(recipientId) === String(senderId)) return;
  const title = "Два туза · личное сообщение";
  const body =
    (senderName ? String(senderName).slice(0, 60) + ": " : "") +
    String(snippet || "Новое сообщение").slice(0, 120);
  await sendToMemberDevices(String(recipientId), {
    title,
    body,
    tag: "poker-chat-dm-" + String(senderId).replace(/[^\w]/g, "_").slice(0, 40),
    openUrl: "./?startapp=club_chat",
    kind: "dm",
  });
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

function triggerGeneralChatWebPush(payload) {
  const secret = process.env.CHAT_PUSH_DISPATCH_SECRET || process.env.CRON_SECRET;
  const vercelHost = process.env.VERCEL_URL;
  if (secret && vercelHost) {
    const url = "https://" + vercelHost + "/api/chat-push-broadcast";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Chat-Push-Secret": secret,
      },
      body: JSON.stringify(payload),
    }).catch(() => {});
    return;
  }
  broadcastGeneralChatPushInner(payload).catch((e) => console.error("chat push broadcast", e));
}

module.exports = {
  notifyChatDmWebPush,
  triggerGeneralChatWebPush,
  broadcastGeneralChatPushInner,
  readVapidEnv,
  CHAT_PUSH_SUB_PREFIX,
  CHAT_PUSH_REGISTRY,
  CHAT_PUSH_DISABLED,
  redisPipeline,
};
