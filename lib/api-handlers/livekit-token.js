"use strict";

const crypto = require("crypto");
const { isAdminIdentity, parseBody, setCors } = require("../api-auth");
const { guestMemberIdFromDeviceId } = require("../guest-member-id");
const { memberIdFromIdentity, resolveTelegramIdentity } = require("../resolve-telegram-auth");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const DEFAULT_ROOM_PREFIX = "poker21-stream-";

function jsonError(res, status, error, extra) {
  return res.status(status).json(Object.assign({ ok: false, error }, extra || {}));
}

function base64Url(value) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function normalizeLiveKitUrl(raw) {
  const value = String(raw || "").trim().replace(/\/+$/, "");
  if (!value) return "";
  if (/^wss?:\/\//i.test(value)) return value;
  if (/^https?:\/\//i.test(value)) return value.replace(/^http/i, "ws");
  return "wss://" + value;
}

function normalizeRoomCode(raw) {
  const room = String(raw || "").trim();
  return /^\d{6}$/.test(room) ? room : "";
}

function normalizeRole(raw) {
  const value = String(raw || "").trim().toLowerCase();
  if (value === "broadcast" || value === "host" || value === "publisher") return "broadcast";
  return "watch";
}

function displayNameFromIdentity(identity, memberId, role) {
  const userName = identity && (identity.telegramUsername || identity.pwaUsername)
    ? String(identity.telegramUsername || identity.pwaUsername).replace(/^@+/, "").trim()
    : "";
  const first = identity && identity.firstName ? String(identity.firstName).trim() : "";
  const last = identity && identity.lastName ? String(identity.lastName).trim() : "";
  const full = [first, last].filter(Boolean).join(" ").trim();
  if (full) return full.slice(0, 80);
  if (userName) return ("@" + userName).slice(0, 80);
  return (role === "broadcast" ? "Ведущий" : "Зритель") + " " + String(memberId || "").slice(-6);
}

function safeParticipantIdentity(memberId, role) {
  const base = String(memberId || "")
    .replace(/[^a-zA-Z0-9_-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 44) || "guest";
  const suffix = crypto.randomBytes(5).toString("hex");
  return [base, role === "broadcast" ? "host" : "watch", suffix].join("_").slice(0, 64);
}

function signLiveKitToken({ apiKey, apiSecret, identity, name, roomName, role, ttlSeconds, memberId }) {
  const now = Math.floor(Date.now() / 1000);
  const canPublish = role === "broadcast";
  const payload = {
    iss: apiKey,
    sub: identity,
    nbf: now - 5,
    exp: now + ttlSeconds,
    name,
    metadata: JSON.stringify({ role, memberId: memberId || "" }),
    video: {
      room: roomName,
      roomJoin: true,
      canSubscribe: true,
      canPublish,
      canPublishData: canPublish,
    },
  };
  const header = { alg: "HS256", typ: "JWT" };
  const body = base64Url(JSON.stringify(header)) + "." + base64Url(JSON.stringify(payload));
  const signature = crypto.createHmac("sha256", apiSecret).update(body).digest("base64url");
  return body + "." + signature;
}

module.exports = async function handler(req, res) {
  setCors(res, "GET, POST, OPTIONS", "Content-Type");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET" && req.method !== "POST") {
    return jsonError(res, 405, "Method not allowed");
  }

  let body = {};
  try {
    body = req.method === "POST" ? parseBody(req) : {};
  } catch (e) {
    return jsonError(res, 400, "bad_json");
  }

  const liveKitUrl = normalizeLiveKitUrl(process.env.LIVEKIT_URL || process.env.LIVEKIT_WS_URL);
  const apiKey = String(process.env.LIVEKIT_API_KEY || "").trim();
  const apiSecret = String(process.env.LIVEKIT_API_SECRET || "").trim();
  if (!liveKitUrl || !apiKey || !apiSecret) {
    return jsonError(res, 503, "livekit_not_configured", {
      configured: false,
      missing: {
        url: !liveKitUrl,
        apiKey: !apiKey,
        apiSecret: !apiSecret,
      },
    });
  }

  const q = req.query || {};
  const roomCode = normalizeRoomCode(body.room || body.roomCode || q.room || q.roomCode);
  if (!roomCode) return jsonError(res, 400, "bad_room");

  const role = normalizeRole(body.role || q.role);
  const identity = resolveTelegramIdentity(req, body, BOT_TOKEN);
  let memberId = memberIdFromIdentity(identity);
  if (!memberId) {
    memberId = guestMemberIdFromDeviceId(body.guestDeviceId || q.guestDeviceId) || "";
  }

  if (role === "broadcast" && !memberId && process.env.LIVEKIT_ALLOW_ANON_BROADCAST !== "1") {
    return jsonError(res, 401, "auth_required_for_broadcast");
  }
  if (
    role === "broadcast" &&
    process.env.LIVEKIT_BROADCAST_ADMIN_ONLY === "1" &&
    !isAdminIdentity(identity, memberId)
  ) {
    return jsonError(res, 403, "admin_required_for_broadcast");
  }

  const roomPrefix = String(process.env.LIVEKIT_ROOM_PREFIX || DEFAULT_ROOM_PREFIX).trim();
  const roomName = roomPrefix + roomCode;
  const participantMemberId = memberId || ("guest_stream_" + crypto.randomBytes(6).toString("hex"));
  const participantIdentity = safeParticipantIdentity(participantMemberId, role);
  const ttlSeconds = role === "broadcast" ? 60 * 60 * 4 : 60 * 60 * 2;
  const token = signLiveKitToken({
    apiKey,
    apiSecret,
    identity: participantIdentity,
    name: displayNameFromIdentity(identity, participantMemberId, role),
    roomName,
    role,
    ttlSeconds,
    memberId: participantMemberId,
  });

  return res.status(200).json({
    ok: true,
    configured: true,
    url: liveKitUrl,
    token,
    room: roomCode,
    livekitRoom: roomName,
    role,
    identity: participantIdentity,
    expiresIn: ttlSeconds,
  });
};
