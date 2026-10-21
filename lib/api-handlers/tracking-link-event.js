const counters = require('../tracking-link-counters');
const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
/**
 * POST /api/tracking-link-event
 * События после перехода по tracking-ссылке (экраны, клики).
 * body: { ref, visitor_id, action, detail?, initData? }
 */
const { rateLimit, rejectIfPayloadTooLarge } = require("../api-limits");

const META_HASH = "poker_app:track_links:meta";

function normalizeSlug(ref) {
  if (!ref || typeof ref !== "string") return null;
  let s = ref.trim().toLowerCase();
  if (s.startsWith("ref_")) s = s.slice(4);
  if (!/^[a-f0-9]{8}$/.test(s)) return null;
  return s;
}

function safeVisitorId(id) {
  if (!id || typeof id !== "string") return null;
  const safe = id.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 128);
  return safe || null;
}

function safeAction(s) {
  if (!s || typeof s !== "string") return null;
  const t = s.trim().slice(0, 100);
  if (!/^[a-zA-Z0-9_:.-]+$/.test(t)) return null;
  return t;
}

function safeDetail(s) {
  if (s == null || s === "") return "";
  return String(s).trim().slice(0, 200);
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "POST only" });
  if (rejectIfPayloadTooLarge(req, res, 8192)) return;
  if (rateLimit(req, res, { bucket: "tracking_event", limit: 120, windowMs: 60_000 })) return;

  if (!redisConfigured()) {
    return res.status(200).json({ ok: false, error: "redis_not_configured" });
  }

  let body = {};
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch (e) {
    return res.status(400).json({ ok: false, error: "Invalid JSON" });
  }

  const slug = normalizeSlug(body.ref || body.refId || body.slug);
  const visitorId = safeVisitorId(body.visitor_id || body.visitorId);
  const action = safeAction(body.action || body.event || "");
  const detail = safeDetail(body.detail || body.meta || "");

  if (!slug || !visitorId || !action) {
    return res.status(400).json({ ok: false, error: "Invalid ref, visitor_id or action" });
  }

  const prefix = 'poker_app:track_links:';
  const saved = await redisPipeline([["EVAL", counters.EVENT, 6, META_HASH, prefix+'users:'+slug, prefix+'ev_n:'+slug, prefix+'ev_u:'+slug, prefix+'ev_by:'+slug, prefix+'vd:'+slug, slug, visitorId, action, new Date().toISOString(), detail]]);
  if (!saved || !saved[0] || saved[0].error) return res.status(500).json({ ok: false, error: "Redis error" });
  if (Number(saved[0].result) !== 1) return res.status(200).json({ ok: true, recorded: false, reason: Number(saved[0].result) === -1 ? 'visit_not_recorded' : 'link_not_found' });

  return res.status(200).json({ ok: true, recorded: true });
};
