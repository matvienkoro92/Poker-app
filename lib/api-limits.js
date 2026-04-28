"use strict";

const buckets = new Map();
const MAX_BUCKETS = 5000;

function getBodyBytes(req) {
  if (!req) return 0;
  const headers = req.headers || {};
  const contentLength = Number(headers["content-length"] || headers["Content-Length"] || 0);
  if (req.body == null) return Number.isFinite(contentLength) ? contentLength : 0;
  if (typeof req.body === "string") return Buffer.byteLength(req.body, "utf8");
  try {
    const jsonBytes = Buffer.byteLength(JSON.stringify(req.body), "utf8");
    return Math.max(Number.isFinite(contentLength) ? contentLength : 0, jsonBytes);
  } catch (e) {
    return Number.isFinite(contentLength) ? contentLength : 0;
  }
}

function getClientKey(req) {
  const headers = (req && req.headers) || {};
  const forwarded = String(headers["x-forwarded-for"] || "").split(",")[0].trim();
  const realIp = String(headers["x-real-ip"] || "").trim();
  const ip = forwarded || realIp || (req && req.socket && req.socket.remoteAddress) || "unknown";
  return ip.slice(0, 96);
}

function rejectIfPayloadTooLarge(req, res, maxBytes) {
  const max = Number(maxBytes) || 0;
  if (!max) return false;
  const bytes = getBodyBytes(req);
  if (bytes <= max) return false;
  res.status(413).json({ ok: false, error: "Payload too large" });
  return true;
}

function rateLimit(req, res, opts) {
  const options = opts || {};
  const limit = Math.max(1, Number(options.limit) || 60);
  const windowMs = Math.max(1000, Number(options.windowMs) || 60000);
  const bucket = String(options.bucket || "api");
  const key = bucket + ":" + (options.key || getClientKey(req));
  const now = Date.now();
  let row = buckets.get(key);
  if (!row || row.resetAt <= now) {
    row = { count: 0, resetAt: now + windowMs };
    buckets.set(key, row);
  }
  if (buckets.size > MAX_BUCKETS) {
    for (const [bucketKey, bucketRow] of buckets) {
      if (bucketKey === key) continue;
      if (!bucketRow || bucketRow.resetAt <= now || buckets.size > MAX_BUCKETS) buckets.delete(bucketKey);
      if (buckets.size <= MAX_BUCKETS) break;
    }
  }
  row.count += 1;
  if (row.count <= limit) return false;
  const retryAfter = Math.max(1, Math.ceil((row.resetAt - now) / 1000));
  res.setHeader("Retry-After", String(retryAfter));
  res.status(429).json({ ok: false, error: "Too many requests" });
  return true;
}

module.exports = {
  getBodyBytes,
  getClientKey,
  rateLimit,
  rejectIfPayloadTooLarge,
};
