"use strict";
const redis = require("./redis");
const STREAMS_CURRENT_KEY = "poker21:streams:current";
const STREAMS_CURRENT_TTL_SEC = 150;
let memoryCurrentStream = null;
function normalizeRoomCode(raw) { const room = String(raw || "").trim(); return /^\d{6}$/.test(room) ? room : ""; }
function normalizeMode(raw) { return raw === "instant" ? "instant" : "delayed"; }
function sanitizeCurrent(raw) {
  if (!raw || typeof raw !== "object") return null;
  const room = normalizeRoomCode(raw.room || raw.roomCode);
  if (!room) return null;
  const expiresAt = Math.round(Number(raw.expiresAt || 0));
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) return null;
  return {
    room,
    mode: normalizeMode(raw.mode),
    phase: raw.phase === "preparing" ? "preparing" : "live",
    startedAt: Math.round(Number(raw.startedAt || raw.updatedAt || Date.now())) || Date.now(),
    updatedAt: Math.round(Number(raw.updatedAt || Date.now())) || Date.now(),
    expiresAt,
  };
}

// Compare-and-set prevents a late stop/heartbeat from overwriting a newer launch.
const CAS_SCRIPT = `
local previous = redis.call('GET', KEYS[1]) or ''
if previous ~= ARGV[1] then return 0 end
if ARGV[2] == '' then redis.call('DEL', KEYS[1])
else redis.call('SET', KEYS[1], ARGV[2], 'EX', ARGV[3]) end
return 1`;

async function readStored() {
  if (!redis.isConfigured()) return memoryCurrentStream;
  const rows = await redis.pipeline([["GET", STREAMS_CURRENT_KEY]], {
    timeoutMs: 2000, throwOnError: true, context: "streams-current.get",
  });
  return rows[0].result || null;
}

async function replaceStored(previous, next) {
  if (!redis.isConfigured()) {
    if (memoryCurrentStream !== previous) return false;
    memoryCurrentStream = next;
    return true;
  }
  const rows = await redis.pipeline([["EVAL", CAS_SCRIPT, 1, STREAMS_CURRENT_KEY,
    previous || "", next || "", STREAMS_CURRENT_TTL_SEC]], {
    timeoutMs: 2000, throwOnError: true, context: "streams-current.compare-set",
  });
  return Number(rows[0].result) === 1;
}

function parseStored(raw) {
  try { return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
}


async function ownsCurrentStream(memberId, room, sessionId, mode) {
  const stored = parseStored(await readStored());
  const current = sanitizeCurrent(stored);
  return !!(current && current.room === room && stored.ownerId === memberId &&
    stored.sessionId === sessionId && (!mode || current.mode === mode));
}
function livekitStreamRoom(room, mode, sessionId) {
  const prefix = String(process.env.LIVEKIT_ROOM_PREFIX || "poker21-stream-").trim();
  return prefix + (mode === "delayed" ? "delayed-" + sessionId + "-" : "") + room;
}
// One Cloudflare input is shared by all launches. Serialize export creation across instances.
let memoryEgressLock = false;
async function withEgressStartLock(operation) {
  const key = "poker21:streams:egress-start";
  const value = require("crypto").randomUUID();
  const configured = redis.isConfigured();
  let acquired;
  if (configured) {
    const rows = await redis.pipeline([["SET", key, value, "NX", "PX", 60000]], {
      throwOnError: true, timeoutMs: 2000, context: "streams-egress.lock",
    });
    acquired = rows[0].result === "OK";
  } else {
    acquired = !memoryEgressLock;
    if (acquired) memoryEgressLock = true;
  }
  if (!acquired) { const err = new Error("Export is still starting; retry shortly"); err.status = 409; throw err; }
  try { return await operation(); }
  finally {
    if (!configured) memoryEgressLock = false;
    else await redis.pipeline([["EVAL", "if redis.call('GET', KEYS[1]) == ARGV[1] then return redis.call('DEL', KEYS[1]) else return 0 end", 1, key, value]], {
      timeoutMs: 2000, context: "streams-egress.unlock",
    }).catch(() => {});
  }
}
module.exports = { withEgressStartLock, livekitStreamRoom, readStored, replaceStored, parseStored, sanitizeCurrent, ownsCurrentStream, STREAMS_CURRENT_TTL_SEC };
