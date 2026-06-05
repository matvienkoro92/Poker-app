"use strict";

const { isAdminIdentity, parseBody, setCors } = require("../api-auth");
const { guestMemberIdFromDeviceId } = require("../guest-member-id");
const { memberIdFromIdentity, resolveTelegramIdentity } = require("../resolve-telegram-auth");
const redis = require("../redis");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const STREAMS_CURRENT_KEY = "poker21:streams:current";
const STREAMS_CURRENT_TTL_SEC = 60 * 60 * 6;
let memoryCurrentStream = null;

function jsonError(res, status, error, extra) {
  return res.status(status).json(Object.assign({ ok: false, error }, extra || {}));
}

function normalizeRoomCode(raw) {
  const room = String(raw || "").trim();
  return /^\d{6}$/.test(room) ? room : "";
}

function normalizeMode(raw) {
  return String(raw || "").trim().toLowerCase() === "instant" ? "instant" : "delayed";
}

function normalizeAction(raw) {
  return String(raw || "").trim().toLowerCase() === "stop" ? "stop" : "start";
}

function sanitizeCurrent(raw) {
  if (!raw || typeof raw !== "object") return null;
  const room = normalizeRoomCode(raw.room || raw.roomCode);
  if (!room) return null;
  const expiresAt = Math.round(Number(raw.expiresAt || 0));
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) return null;
  return {
    room,
    mode: normalizeMode(raw.mode),
    startedAt: Math.round(Number(raw.startedAt || raw.updatedAt || Date.now())) || Date.now(),
    updatedAt: Math.round(Number(raw.updatedAt || Date.now())) || Date.now(),
    expiresAt,
  };
}

function checkBroadcastAccess(req, body) {
  const identity = resolveTelegramIdentity(req, body, BOT_TOKEN);
  let memberId = memberIdFromIdentity(identity);
  if (!memberId) memberId = guestMemberIdFromDeviceId(body.guestDeviceId) || "";

  if (!memberId && process.env.LIVEKIT_ALLOW_ANON_BROADCAST !== "1") {
    return { error: "auth_required_for_broadcast", status: 401 };
  }
  if (
    process.env.LIVEKIT_BROADCAST_ADMIN_ONLY === "1" &&
    !isAdminIdentity(identity, memberId)
  ) {
    return { error: "admin_required_for_broadcast", status: 403 };
  }
  return { memberId };
}

async function readCurrent() {
  if (redis.isConfigured()) {
    const stored = await redis.getJson(STREAMS_CURRENT_KEY, null, {
      timeoutMs: 1200,
      context: "streams-current.get",
    });
    const current = sanitizeCurrent(stored);
    if (!current && stored) {
      redis.pipeline([["DEL", STREAMS_CURRENT_KEY]], {
        timeoutMs: 1000,
        context: "streams-current.cleanup",
      }).catch(() => {});
    }
    return current;
  }
  memoryCurrentStream = sanitizeCurrent(memoryCurrentStream);
  return memoryCurrentStream;
}

async function writeCurrent(value) {
  memoryCurrentStream = value;
  if (!redis.isConfigured()) return true;
  return redis.setJson(STREAMS_CURRENT_KEY, value, {
    ttlSec: STREAMS_CURRENT_TTL_SEC,
    timeoutMs: 1200,
    context: "streams-current.set",
  });
}

async function clearCurrent(room) {
  const current = await readCurrent();
  if (room && current && current.room && current.room !== room) return false;
  memoryCurrentStream = null;
  if (!redis.isConfigured()) return true;
  await redis.pipeline([["DEL", STREAMS_CURRENT_KEY]], {
    timeoutMs: 1200,
    context: "streams-current.del",
  });
  return true;
}

module.exports = async function handler(req, res) {
  setCors(res, "GET, POST, OPTIONS", "Content-Type");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    const current = await readCurrent();
    return res.status(200).json({
      ok: true,
      active: !!current,
      stream: current || null,
    });
  }

  if (req.method !== "POST") return jsonError(res, 405, "Method not allowed");

  let body = {};
  try {
    body = parseBody(req);
  } catch (e) {
    return jsonError(res, 400, "bad_json");
  }

  const access = checkBroadcastAccess(req, body);
  if (access.error) return jsonError(res, access.status, access.error);

  const action = normalizeAction(body.action);
  const room = normalizeRoomCode(body.room || body.roomCode);
  if (action === "stop") {
    await clearCurrent(room);
    return res.status(200).json({ ok: true, active: false });
  }
  if (!room) return jsonError(res, 400, "bad_room");

  const now = Date.now();
  const current = {
    room,
    mode: normalizeMode(body.mode),
    startedAt: now,
    updatedAt: now,
    expiresAt: now + STREAMS_CURRENT_TTL_SEC * 1000,
  };
  const saved = await writeCurrent(current);
  if (!saved && redis.isConfigured()) return jsonError(res, 503, "redis_write_failed");
  return res.status(200).json({ ok: true, active: true, stream: current });
};
