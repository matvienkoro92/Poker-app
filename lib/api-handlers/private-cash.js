"use strict";

const crypto = require("crypto");
const { authRequired, parseBody, setCors } = require("../api-auth");
const { ensureDtIdForUserId } = require("../account-id");
const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
const {
  broadcastAllChatPushSubscribersInner,
  readVapidEnv,
} = require("../chat-webpush-notify");
const { rateLimit, rejectIfPayloadTooLarge } = require("../api-limits");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const EVENTS_KEY = "poker_app:private_cash_events";
const EVENT_PREFIX = "poker_app:private_cash_event:";
const PARTICIPANTS_PREFIX = "poker_app:private_cash_participants:";
const USERNAMES_KEY = "poker_app:visitor_usernames";
const CHAT_DISPLAY_NAMES_KEY = "poker_app:visitor_chat_display_names";
const MAX_EVENTS = 12;
const GAME_TYPES = new Set([
  "Холдем",
  "Холдем 3-1 флоп",
  "Холдем 3-1 терн",
  "Омаха5",
  "Омаха6",
]);

function cleanText(value, max) {
  return String(value == null ? "" : value)
    .trim()
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .slice(0, max || 240);
}

function cleanDate(value) {
  const s = cleanText(value, 16);
  return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : "";
}

function cleanTime(value) {
  const s = cleanText(value, 8);
  return /^\d{2}:\d{2}$/.test(s) ? s : "";
}

function cleanGameType(value) {
  const s = cleanText(value, 40);
  return GAME_TYPES.has(s) ? s : "";
}

function parseJson(raw, fallback) {
  if (raw == null || raw === "") return fallback;
  try {
    return JSON.parse(String(raw));
  } catch (e) {
    return fallback;
  }
}

function eventKey(id) {
  return EVENT_PREFIX + String(id || "").trim();
}

function participantsKey(id) {
  return PARTICIPANTS_PREFIX + String(id || "").trim();
}

function makeId() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return crypto.randomBytes(16).toString("hex");
}

function displayFromIdentity(identity, accountId, memberId, redisDisplay, redisUsername) {
  const stored = cleanText(redisDisplay, 80);
  if (stored) return stored;
  const first = cleanText(identity && identity.firstName, 40);
  const last = cleanText(identity && identity.lastName, 40);
  const full = [first, last].filter(Boolean).join(" ").trim();
  if (full) return full;
  const username = cleanText(redisUsername || (identity && (identity.telegramUsername || identity.pwaUsername)), 40).replace(/^@+/, "");
  if (username) return "@" + username;
  return accountId || memberId || "Игрок";
}

async function resolveViewer(auth) {
  const memberId = String(auth.memberId || "").trim();
  const accountId = memberId && !memberId.startsWith("guest_")
    ? await ensureDtIdForUserId(memberId)
    : memberId;
  let displayRaw = "";
  let userRaw = "";
  try {
    const rows = await redisPipeline([
      ["HGET", CHAT_DISPLAY_NAMES_KEY, accountId || ""],
      ["HGET", CHAT_DISPLAY_NAMES_KEY, memberId || ""],
      ["HGET", USERNAMES_KEY, memberId || ""],
    ]);
    displayRaw = (rows && rows[0] && rows[0].result) || (rows && rows[1] && rows[1].result) || "";
    userRaw = (rows && rows[2] && rows[2].result) || "";
  } catch (e) {}
  return {
    memberId,
    accountId: String(accountId || memberId || "").trim(),
    displayName: displayFromIdentity(auth.identity, accountId, memberId, displayRaw, userRaw),
    telegramUsername: cleanText(userRaw || (auth.identity && (auth.identity.telegramUsername || auth.identity.pwaUsername)), 60).replace(/^@+/, ""),
  };
}

function normalizeEvent(raw) {
  const event = raw && typeof raw === "object" ? raw : {};
  return {
    id: cleanText(event.id, 80),
    date: cleanText(event.date, 16),
    time: cleanText(event.time, 8),
    gameType: cleanGameType(event.gameType),
    stakes: cleanText(event.stakes, 80),
    buyIn: cleanText(event.buyIn, 80),
    description: cleanText(event.description, 500),
    combinations: cleanText(event.combinations, 500),
    status: event.status === "closed" ? "closed" : "active",
    createdAt: cleanText(event.createdAt, 40),
    createdBy: cleanText(event.createdBy, 80),
  };
}

function hashPairsToRows(raw) {
  const out = [];
  if (!Array.isArray(raw)) return out;
  for (let i = 0; i + 1 < raw.length; i += 2) {
    const row = parseJson(raw[i + 1], null);
    if (row && typeof row === "object") out.push(row);
  }
  return out;
}

function normalizeParticipant(row) {
  const p = row && typeof row === "object" ? row : {};
  return {
    accountId: cleanText(p.accountId, 80),
    memberId: cleanText(p.memberId, 80),
    displayName: cleanText(p.displayName, 80) || "Игрок",
    telegramUsername: cleanText(p.telegramUsername, 60).replace(/^@+/, ""),
    status: p.status === "approved" ? "approved" : "pending",
    joinedAt: cleanText(p.joinedAt, 40),
    approvedAt: cleanText(p.approvedAt, 40),
  };
}

async function loadState(auth) {
  const viewer = await resolveViewer(auth);
  const idRows = await redisPipeline([["LRANGE", EVENTS_KEY, "0", String(MAX_EVENTS - 1)]]);
  const ids = (idRows && idRows[0] && Array.isArray(idRows[0].result) ? idRows[0].result : [])
    .map((id) => cleanText(id, 80))
    .filter(Boolean);
  const eventRows = ids.length ? await redisPipeline(ids.map((id) => ["GET", eventKey(id)])) : [];
  const events = [];
  for (let i = 0; i < ids.length; i += 1) {
    const event = normalizeEvent(parseJson(eventRows && eventRows[i] && eventRows[i].result, null));
    if (event.id) events.push(event);
  }
  const participantCommands = [];
  events.forEach((event) => {
    if (auth.isAdmin) participantCommands.push(["HGETALL", participantsKey(event.id)]);
    else participantCommands.push(["HGET", participantsKey(event.id), viewer.accountId]);
  });
  const participantRows = participantCommands.length ? await redisPipeline(participantCommands) : [];
  events.forEach((event, index) => {
    if (auth.isAdmin) {
      event.participants = hashPairsToRows(participantRows && participantRows[index] && participantRows[index].result)
        .map(normalizeParticipant)
        .sort((a, b) => String(a.joinedAt || "").localeCompare(String(b.joinedAt || "")));
    } else {
      event.myParticipant = normalizeParticipant(parseJson(participantRows && participantRows[index] && participantRows[index].result, null));
      if (!event.myParticipant.accountId) event.myParticipant = null;
    }
  });
  return {
    ok: true,
    isAdmin: !!auth.isAdmin,
    viewer,
    events,
    activeEvent: events.find((event) => event.status === "active") || null,
  };
}

async function broadcastCreated(event) {
  if (!readVapidEnv().pushConfigured) return { ok: false, skipped: true, error: "vapid" };
  const bits = [event.date, event.time, event.gameType, event.stakes, event.buyIn ? "вход " + event.buyIn : ""].filter(Boolean).join(" · ");
  return await broadcastAllChatPushSubscribersInner({
    title: "Открыта запись на приватный кеш",
    body: bits ? bits : "Открыта новая запись. Займите место в списке.",
    openUrl: "./",
  });
}

module.exports = async function handler(req, res) {
  setCors(res, "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (!BOT_TOKEN) return res.status(500).json({ ok: false, error: "Set TELEGRAM_BOT_TOKEN" });
  if (!redisConfigured()) return res.status(503).json({ ok: false, error: "Redis is not configured" });

  if (req.method === "GET") {
    const auth = authRequired(req, {}, BOT_TOKEN, {
      authError: "Откройте в Telegram или войдите в PWA",
    });
    if (!auth.ok) return res.status(auth.status).json({ ok: false, error: auth.error });
    try {
      return res.status(200).json(await loadState(auth));
    } catch (e) {
      console.error("[private-cash] GET", e);
      return res.status(500).json({ ok: false, error: "Ошибка сервера" });
    }
  }

  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });
  if (rejectIfPayloadTooLarge(req, res, 12_288)) return;
  if (rateLimit(req, res, { bucket: "private_cash", limit: 20, windowMs: 60_000 })) return;

  let body;
  try {
    body = parseBody(req);
  } catch (e) {
    return res.status(400).json({ ok: false, error: "Invalid JSON" });
  }
  const auth = authRequired(req, body, BOT_TOKEN, {
    authError: "Откройте в Telegram или войдите в PWA",
  });
  if (!auth.ok) return res.status(auth.status).json({ ok: false, error: auth.error });

  const action = cleanText(body.action, 40);
  try {
    if (action === "create") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только для администраторов" });
      const date = cleanDate(body.date);
      const time = cleanTime(body.time);
      const gameType = cleanGameType(body.gameType);
      const stakes = cleanText(body.stakes, 80);
      const buyIn = cleanText(body.buyIn, 80);
      const description = cleanText(body.description, 500);
      const combinations = cleanText(body.combinations, 500);
      const shouldSendPush = body.sendPush === true || body.sendPush === "true" || body.sendPush === 1 || body.sendPush === "1";
      if (!date || !time || !gameType || !stakes || !buyIn) {
        return res.status(400).json({ ok: false, error: "Укажите дату, время, вид игры, ставки и вход" });
      }
      const viewer = await resolveViewer(auth);
      const event = normalizeEvent({
        id: makeId(),
        date,
        time,
        gameType,
        stakes,
        buyIn,
        description,
        combinations,
        status: "active",
        createdAt: new Date().toISOString(),
        createdBy: viewer.accountId,
      });
      await redisPipeline([
        ["SET", eventKey(event.id), JSON.stringify(event)],
        ["LPUSH", EVENTS_KEY, event.id],
        ["LTRIM", EVENTS_KEY, "0", String(MAX_EVENTS - 1)],
      ]);
      let push = { ok: true, skipped: true };
      if (shouldSendPush) {
        try {
          push = await broadcastCreated(event);
        } catch (ePush) {
          push = { ok: false, error: "push_failed" };
        }
      }
      return res.status(200).json({ ok: true, push, state: await loadState(auth) });
    }

    if (action === "join") {
      const eventId = cleanText(body.eventId, 80);
      if (!eventId) return res.status(400).json({ ok: false, error: "Не найден кеш" });
      const rawEvent = await redisPipeline([["GET", eventKey(eventId)]]);
      const event = normalizeEvent(parseJson(rawEvent && rawEvent[0] && rawEvent[0].result, null));
      if (!event.id || event.status !== "active") return res.status(404).json({ ok: false, error: "Запись закрыта" });
      const viewer = await resolveViewer(auth);
      const key = participantsKey(eventId);
      const oldRows = await redisPipeline([["HGET", key, viewer.accountId]]);
      const old = normalizeParticipant(parseJson(oldRows && oldRows[0] && oldRows[0].result, null));
      const participant = normalizeParticipant({
        accountId: viewer.accountId,
        memberId: viewer.memberId,
        displayName: viewer.displayName,
        telegramUsername: viewer.telegramUsername,
        status: old.status === "approved" ? "approved" : "pending",
        joinedAt: old.joinedAt || new Date().toISOString(),
        approvedAt: old.approvedAt || "",
      });
      await redisPipeline([["HSET", key, viewer.accountId, JSON.stringify(participant)]]);
      return res.status(200).json({ ok: true, state: await loadState(auth) });
    }

    if (action === "approve") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только для администраторов" });
      const eventId = cleanText(body.eventId, 80);
      const accountId = cleanText(body.accountId, 80);
      if (!eventId || !accountId) return res.status(400).json({ ok: false, error: "Не найдена заявка" });
      const key = participantsKey(eventId);
      const rows = await redisPipeline([["HGET", key, accountId]]);
      const current = normalizeParticipant(parseJson(rows && rows[0] && rows[0].result, null));
      if (!current.accountId) return res.status(404).json({ ok: false, error: "Заявка не найдена" });
      current.status = "approved";
      current.approvedAt = new Date().toISOString();
      await redisPipeline([["HSET", key, accountId, JSON.stringify(current)]]);
      return res.status(200).json({ ok: true, state: await loadState(auth) });
    }

    return res.status(400).json({ ok: false, error: "Unknown action" });
  } catch (e) {
    console.error("[private-cash] POST", e);
    return res.status(500).json({ ok: false, error: "Ошибка сервера" });
  }
};
