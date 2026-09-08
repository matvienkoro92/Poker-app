"use strict";

const crypto = require("crypto");
const { ownsCurrentStream, livekitStreamRoom, withEgressStartLock } = require("../streams-state");
const { isAdminIdentity, parseBody, setCors } = require("../api-auth");
const { guestMemberIdFromDeviceId } = require("../guest-member-id");
const { memberIdFromIdentity, resolveTelegramIdentity } = require("../resolve-telegram-auth");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

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

function signLiveKitServiceToken({ apiKey, apiSecret, roomName, ttlSeconds }) {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: apiKey,
    sub: "stream-egress-" + crypto.randomBytes(6).toString("hex"),
    nbf: now - 5,
    exp: now + ttlSeconds,
    video: {
      room: roomName,
      roomRecord: true,
    },
  };
  const header = { alg: "HS256", typ: "JWT" };
  const body = base64Url(JSON.stringify(header)) + "." + base64Url(JSON.stringify(payload));
  const signature = crypto.createHmac("sha256", apiSecret).update(body).digest("base64url");
  return body + "." + signature;
}

function firstEnv(names) {
  for (const name of names) {
    const value = String(process.env[name] || "").trim();
    if (value) return value;
  }
  return "";
}

function normalizeLiveKitHttpUrl(raw) {
  const value = String(raw || "").trim().replace(/\/+$/, "");
  if (!value) return "";
  if (/^wss:\/\//i.test(value)) return value.replace(/^wss:/i, "https:");
  if (/^ws:\/\//i.test(value)) return value.replace(/^ws:/i, "http:");
  if (/^https?:\/\//i.test(value)) return value;
  return "https://" + value;
}

function normalizeRoomCode(raw) {
  const room = String(raw || "").trim();
  return /^\d{6}$/.test(room) ? room : "";
}

function normalizeAction(raw) {
  const action = String(raw || "").trim().toLowerCase();
  return !action || action === "start" ? "start" : action === "stop" ? "stop" : "";
}

function normalizeRtmpsUrl(raw) {
  const value = String(raw || "").trim();
  return /^rtmps?:\/\//i.test(value) ? value : "";
}

function buildRtmpsDestination() {
  const fullUrl = normalizeRtmpsUrl(firstEnv([
    "CLOUDFLARE_STREAM_RTMPS_DESTINATION_URL",
    "CF_STREAM_RTMPS_DESTINATION_URL",
  ]));
  if (fullUrl) return fullUrl;

  const baseUrl = normalizeRtmpsUrl(firstEnv([
    "CLOUDFLARE_STREAM_RTMPS_URL",
    "CF_STREAM_RTMPS_URL",
  ]));
  const key = firstEnv([
    "CLOUDFLARE_STREAM_RTMPS_KEY",
    "CLOUDFLARE_STREAM_KEY",
    "CF_STREAM_RTMPS_KEY",
    "CF_STREAM_KEY",
  ]);
  if (!baseUrl || !key) return "";
  return baseUrl.replace(/\/+$/, "") + "/" + key.replace(/^\/+/, "");
}

function livekitEgressErrorText(status, data) {
  if (data && data.msg) return String(data.msg).slice(0, 240);
  if (data && data.error) return String(data.error).slice(0, 240);
  return "LiveKit Egress error " + status;
}

async function callLiveKitEgress(methodName, body, token) {
  const host = normalizeLiveKitHttpUrl(process.env.LIVEKIT_URL || process.env.LIVEKIT_WS_URL);
  if (!host) {
    const err = new Error("livekit_not_configured");
    err.status = 503;
    throw err;
  }
  const response = await fetch(host + "/twirp/livekit.Egress/" + methodName, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body || {}),
    signal: AbortSignal.timeout(15000),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const err = new Error(livekitEgressErrorText(response.status, data));
    err.status = response.status;
    err.data = data;
    throw err;
  }
  return data;
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
  setCors(res, "POST, OPTIONS", "Content-Type");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return jsonError(res, 405, "Method not allowed");

  let body = {};
  try {
    body = parseBody(req);
  } catch (e) {
    return jsonError(res, 400, "bad_json");
  }

  const access = checkBroadcastAccess(req, body);
  if (access.error) return jsonError(res, access.status, access.error);

  const liveKitUrl = normalizeLiveKitHttpUrl(process.env.LIVEKIT_URL || process.env.LIVEKIT_WS_URL);
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

  const action = normalizeAction(body.action);
  if (!action) return jsonError(res, 400, "bad_action");
  const roomCode = normalizeRoomCode(body.room || body.roomCode);
  const sessionId = String(body.sessionId || "");
  if (!/^[a-zA-Z0-9_-]{16,80}$/.test(sessionId)) return jsonError(res, 400, "bad_session");
  const roomName = roomCode ? livekitStreamRoom(roomCode, "delayed", sessionId) : "";
  const token = signLiveKitServiceToken({
    apiKey,
    apiSecret,
    roomName,
    ttlSeconds: 60 * 10,
  });

  if (!roomCode) return jsonError(res, 400, "bad_room");

  if (action === "stop") {
    const egressId = String(body.egressId || body.egress_id || "").trim();
    if (!egressId) return jsonError(res, 400, "bad_egress_id");
    try {
      const listed = await callLiveKitEgress("ListEgress", { room_name: roomName, egress_id: egressId }, token);
      const matching = (listed.items || []).find((item) => (item.egress_id || item.egressId) === egressId && (item.room_name || item.roomName) === roomName);
      if (!matching) return jsonError(res, 404, "egress_not_found");
      const info = await callLiveKitEgress("StopEgress", { egress_id: egressId }, token);
      return res.status(200).json({
        ok: true,
        action: "stop",
        egressId: info.egress_id || info.egressId || egressId,
        status: info.status,
      });
    } catch (e) {
      return jsonError(res, e.status || 502, "livekit_egress_stop_failed", {
        message: String(e.message || "").slice(0, 240),
      });
    }
  }

  if (!roomCode) return jsonError(res, 400, "bad_room");

  try {
    if (!await ownsCurrentStream(access.memberId, roomCode, String(body.sessionId || ""), "delayed")) {
      return jsonError(res, 409, "stream_session_required");
    }
  } catch (e) { return jsonError(res, 503, "stream_store_unavailable"); }
  const rtmpsDestination = buildRtmpsDestination();
  if (!rtmpsDestination) {
    return jsonError(res, 503, "cloudflare_rtmps_not_configured", {
      configured: false,
      missing: {
        rtmpsUrl: !normalizeRtmpsUrl(firstEnv(["CLOUDFLARE_STREAM_RTMPS_URL", "CF_STREAM_RTMPS_URL"])),
        rtmpsKey: !firstEnv(["CLOUDFLARE_STREAM_RTMPS_KEY", "CLOUDFLARE_STREAM_KEY", "CF_STREAM_RTMPS_KEY", "CF_STREAM_KEY"]),
      },
    });
  }

  const width = Math.max(360, Math.min(1920, Number(process.env.LIVEKIT_EGRESS_WIDTH || 1280) || 1280));
  const height = Math.max(360, Math.min(1920, Number(process.env.LIVEKIT_EGRESS_HEIGHT || 720) || 720));
  const framerate = Math.max(15, Math.min(60, Number(process.env.LIVEKIT_EGRESS_FRAMERATE || 30) || 30));
  const videoBitrate = Math.max(800, Math.min(6000, Number(process.env.LIVEKIT_EGRESS_VIDEO_BITRATE || 2500) || 2500));

  try {
    return await withEgressStartLock(async () => {
      if (!await ownsCurrentStream(access.memberId, roomCode, sessionId, "delayed")) {
        return jsonError(res, 409, "stream_session_required");
      }
      // Retrying a timed-out start must reuse a still-running export.
      const listed = await callLiveKitEgress("ListEgress", { room_name: roomName, active: true }, token);
      const existing = (listed.items || []).find((item) =>
        (item.room_name || item.roomName) === roomName &&
        [0, 1, "EGRESS_STARTING", "EGRESS_ACTIVE"].includes(item.status == null ? 0 : item.status));
      if (existing) return res.status(200).json({ ok: true, action: "start", configured: true,
        room: roomCode, egressId: existing.egress_id || existing.egressId, status: existing.status });
      const info = await callLiveKitEgress("StartRoomCompositeEgress", {
        room_name: roomName,
        layout: String(process.env.LIVEKIT_EGRESS_LAYOUT || "speaker"),
        stream_outputs: [
          {
            protocol: "rtmp",
            urls: [rtmpsDestination],
          },
        ],
        advanced: {
          width,
          height,
          framerate,
          audio_bitrate: 128,
          video_bitrate: videoBitrate,
          key_frame_interval: 2,
        },
      }, token);
      if (!(info.egress_id || info.egressId) || ![0, 1, "EGRESS_STARTING", "EGRESS_ACTIVE"].includes(info.status == null ? 0 : info.status)) {
        throw new Error("LiveKit did not start the delayed export");
      }
      if (!await ownsCurrentStream(access.memberId, roomCode, sessionId, "delayed")) {
        await callLiveKitEgress("StopEgress", { egress_id: info.egress_id || info.egressId }, token);
        return jsonError(res, 409, "stream_session_required");
      }
      return res.status(200).json({
        ok: true,
        action: "start",
        configured: true,
        room: roomCode,
        livekitRoom: roomName,
        egressId: info.egress_id || info.egressId || "",
        status: info.status,
      });
    });
  } catch (e) {
    return jsonError(res, e.status || 502, "livekit_egress_start_failed", {
      message: String(e.message || "").slice(0, 240),
    });
  }
};
