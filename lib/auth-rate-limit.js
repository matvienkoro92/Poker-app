"use strict";

const crypto = require("crypto");
const { pipeline } = require("./redis");
const { getClientKey, rejectIfPayloadTooLarge } = require("./api-limits");

const RATE_LIMIT_SCRIPT = `-- auth-rate-limit-v1
local count = redis.call('INCR', KEYS[1])
local ttl = redis.call('TTL', KEYS[1])
if ttl < 0 then
  redis.call('EXPIRE', KEYS[1], ARGV[1])
  ttl = tonumber(ARGV[1])
end
return {count, ttl}`;

async function rejectAuthAbuse(req, res, realm, action, account) {
  if (rejectIfPayloadTooLarge(req, res, 16 * 1024)) return true;
  if (!["request", "verify", "login"].includes(action)) return false;
  const sending = action === "request";
  const windowSec = sending ? 600 : 900;
  const checks = [
    { subject: "ip:" + getClientKey(req), limit: sending ? 20 : 60 },
    { subject: "account:" + String(account || "").trim().toLowerCase(), limit: sending ? 3 : 10 },
  ];
  try {
    const commands = checks.map((check) => {
      const digest = crypto.createHash("sha256").update(realm + ":" + (sending ? "send" : "attempt") + ":" + check.subject).digest("hex");
      return ["EVAL", RATE_LIMIT_SCRIPT, "1", "poker_app:auth_limit:" + digest, String(windowSec)];
    });
    const rows = await pipeline(commands, { context: "auth.rate-limit", throwOnError: true });
    if (!rows || rows.some((row) => !Array.isArray(row.result) || !Number.isFinite(Number(row.result[0])))) throw new Error("Invalid limiter response");
    const blocked = rows.findIndex((row, index) => Number(row.result[0]) > checks[index].limit);
    if (blocked >= 0) {
      res.setHeader("Retry-After", String(Math.max(1, Number(rows[blocked].result[1]) || windowSec)));
      res.status(429).json({ ok: false, error: "Слишком много попыток. Попробуйте позже." });
      return true;
    }
    return false;
  } catch (error) {
    res.status(503).json({ ok: false, error: "Вход временно недоступен. Попробуйте позже." });
    return true;
  }
}

module.exports = { rejectAuthAbuse, RATE_LIMIT_SCRIPT };
