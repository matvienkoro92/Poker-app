"use strict";

const { isAdminIdentity, parseBody, setCors } = require("../api-auth");
const { guestMemberIdFromDeviceId } = require("../guest-member-id");
const { memberIdFromIdentity, resolveTelegramIdentity } = require("../resolve-telegram-auth");
const { readStored, replaceStored, parseStored, sanitizeCurrent, STREAMS_CURRENT_TTL_SEC } = require("../streams-state");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

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
  const action = String(raw || "start").trim().toLowerCase();
  return ["prepare", "start", "stop", "heartbeat"].includes(action) ? action : "";
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

module.exports = async function handler(req, res) {
  setCors(res, "GET, POST, OPTIONS", "Content-Type");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    try {
      const current = sanitizeCurrent(parseStored(await readStored()));
      const active = !!current && current.phase === "live";
      return res.status(200).json({ ok: true, active, stream: active ? current : null });
    } catch (e) { return jsonError(res, 503, "stream_store_unavailable"); }
  }
  if (req.method !== "POST") return jsonError(res, 405, "Method not allowed");
  let body;
  try { body = parseBody(req); } catch (e) { return jsonError(res, 400, "bad_json"); }
  const access = checkBroadcastAccess(req, body);
  if (access.error) return jsonError(res, access.status, access.error);
  const action = normalizeAction(body.action);
  const room = normalizeRoomCode(body.room || body.roomCode);
  const sessionId = String(body.sessionId || "");
  if (!action) return jsonError(res, 400, "bad_action");
  if (!room) return jsonError(res, 400, "bad_room");
  if (!/^[a-zA-Z0-9_-]{16,80}$/.test(sessionId)) return jsonError(res, 400, "bad_session");
  try {
    for (let attempt = 0; attempt < 3; attempt++) {
      const previous = await readStored();
      const stored = parseStored(previous);
      const current = sanitizeCurrent(stored);
      const own = current && stored.sessionId === sessionId && stored.ownerId === access.memberId && current.room === room;
      if (current && !own) return jsonError(res, 409, "another_stream_active");
      if (action === "stop") {
        if (!current) return res.status(200).json({ ok: true, active: false });
        if (await replaceStored(previous, null)) return res.status(200).json({ ok: true, active: false });
        continue;
      }
      if (action === "heartbeat" && !own) return jsonError(res, 409, "stream_expired");
      const mode = normalizeMode(body.mode);
      if (own && current.mode !== mode) return jsonError(res, 409, "stream_mode_changed");
      const now = Date.now();
      const phase = action === "start" || (own && current.phase === "live") ? "live" : "preparing";
      const next = { room, mode, phase, sessionId, ownerId: access.memberId,
        startedAt: own ? current.startedAt : now, updatedAt: now,
        expiresAt: now + STREAMS_CURRENT_TTL_SEC * 1000 };
      if (await replaceStored(previous, JSON.stringify(next))) {
        return res.status(200).json({ ok: true, active: phase === "live", stream: sanitizeCurrent(next) });
      }
    }
    return jsonError(res, 409, "stream_changed");
  } catch (e) { return jsonError(res, 503, "stream_store_unavailable"); }
};
