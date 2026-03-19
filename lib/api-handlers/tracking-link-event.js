/**
 * POST /api/tracking-link-event
 * События после перехода по tracking-ссылке (экраны, клики).
 * body: { ref, visitor_id, action, detail?, initData? }
 */
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

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

async function redisPipeline(commands) {
  if (!REDIS_URL || !REDIS_TOKEN) return null;
  const base = REDIS_URL.replace(/\/$/, "");
  const url = base.indexOf("/pipeline") !== -1 ? base : base + "/pipeline";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
  });
  if (!res.ok) return null;
  return res.json();
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "POST only" });

  if (!REDIS_URL || !REDIS_TOKEN) {
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

  const check = await redisPipeline([["HGET", META_HASH, slug]]);
  if (!check || !Array.isArray(check) || !check[0] || !check[0].result) {
    return res.status(200).json({ ok: true, recorded: false });
  }

  const nKey = `poker_app:track_links:ev_n:${slug}`;
  const uKey = `poker_app:track_links:ev_u:${slug}`;
  const byKey = `poker_app:track_links:ev_by:${slug}`;
  const vdKey = `poker_app:track_links:vd:${slug}`;

  const nowIso = new Date().toISOString();
  let detailObj = { counts: {}, total: 0, lastAt: nowIso, samples: [] };
  const prev = await redisPipeline([["HGET", vdKey, visitorId]]);
  if (prev && prev[0] && prev[0].result && typeof prev[0].result === "string") {
    try {
      const p = JSON.parse(prev[0].result);
      if (p && typeof p === "object") {
        detailObj.counts = p.counts && typeof p.counts === "object" ? { ...p.counts } : {};
        detailObj.total = typeof p.total === "number" ? p.total : 0;
        detailObj.samples = Array.isArray(p.samples) ? p.samples.slice(-24) : [];
      }
    } catch (e) {}
  }

  detailObj.counts[action] = (detailObj.counts[action] || 0) + 1;
  detailObj.total = (detailObj.total || 0) + 1;
  detailObj.lastAt = nowIso;
  const sample = { t: nowIso, a: action };
  if (detail) sample.d = detail;
  detailObj.samples.push(sample);
  if (detailObj.samples.length > 25) detailObj.samples = detailObj.samples.slice(-25);

  const pipe = await redisPipeline([
    ["INCR", nKey],
    ["SADD", uKey, visitorId],
    ["HINCRBY", byKey, action, "1"],
    ["HSET", vdKey, visitorId, JSON.stringify(detailObj)],
  ]);

  if (!pipe || pipe.some((r) => r && r.error)) {
    return res.status(500).json({ ok: false, error: "Redis error" });
  }

  return res.status(200).json({ ok: true, recorded: true });
};
