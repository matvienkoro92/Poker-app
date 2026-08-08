const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
/**
 * Админка: уникальные ссылки на главную с параметрами и статистика переходов.
 *
 * GET  /api/tracking-links?initData=... — список ссылок
 * GET  /api/tracking-links?initData=...&id=slug&visitors=1 — журнал переходов + activity (POST /api/tracking-link-event)
 * POST /api/tracking-links — создать { initData, label?, params? }
 * DELETE /api/tracking-links — удалить { initData, id }
 */
const crypto = require("crypto");
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { rateLimit, rejectIfPayloadTooLarge } = require("../api-limits");
const { isAdminIdentity } = require("../api-auth");
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

const Z_INDEX = "poker_app:track_links:z";
const META_HASH = "poker_app:track_links:meta";
const TOTALS_HASH = "poker_app:track_links:totals";
const UNIQUE_HASH = "poker_app:track_links:unique";

function safeSlug(id) {
  if (!id || typeof id !== "string") return null;
  const s = id.trim().toLowerCase();
  return /^[a-f0-9]{8}$/.test(s) ? s : null;
}

function safeLabel(label) {
  if (label == null) return "";
  const s = String(label).trim().slice(0, 200);
  return s;
}

function parseParamsInput(raw) {
  if (raw == null || raw === "") return {};
  if (typeof raw === "object" && raw !== null && !Array.isArray(raw)) return raw;
  const str = String(raw).trim();
  if (!str) return {};
  try {
    const o = JSON.parse(str);
    if (o && typeof o === "object" && !Array.isArray(o)) return o;
  } catch (e) {}
  throw new Error("params_invalid_json");
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (!redisConfigured()) {
    return res.status(500).json({ ok: false, error: "Redis not configured" });
  }

  let bodyParsed = {};
  if (req.method === "POST" || req.method === "DELETE") {
    if (rejectIfPayloadTooLarge(req, res, 16_384)) return;
    if (rateLimit(req, res, { bucket: "tracking_links_admin", limit: 30, windowMs: 5 * 60_000 })) return;
    try {
      bodyParsed = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    } catch (e) {
      return res.status(400).json({ ok: false, error: "Invalid JSON" });
    }
  }
  const identity = resolveTelegramIdentity(req, bodyParsed, BOT_TOKEN);
  const adminId = memberIdFromIdentity(identity);
  if (!identity || !adminId || !isAdminIdentity(identity, adminId)) {
    return res.status(403).json({ ok: false, error: "Admin only" });
  }

  if (req.method === "GET") {
    const slug = safeSlug(req.query.id || "");
    const wantVisitors = req.query.visitors === "1" || req.query.visitors === "true";

    if (wantVisitors) {
      if (!slug) return res.status(400).json({ ok: false, error: "Missing id" });
      const metaR = await redisPipeline([["HGET", META_HASH, slug]]);
      if (!metaR || !metaR[0] || !metaR[0].result) {
        return res.status(404).json({ ok: false, error: "Not found" });
      }
      const logKey = `poker_app:track_links:log:${slug}`;
      const range = await redisPipeline([["LRANGE", logKey, "0", "199"]]);
      const rawList = range && range[0] && range[0].result;
      const lines = Array.isArray(rawList) ? rawList : [];
      const visitors = [];
      for (const line of lines) {
        try {
          visitors.push(JSON.parse(line));
        } catch (e) {}
      }
      const vdKey = `poker_app:track_links:vd:${slug}`;
      const ids = [...new Set(visitors.map((v) => v.visitorId).filter(Boolean))];
      if (ids.length > 0) {
        const hm = await redisPipeline([["HMGET", vdKey, ...ids]]);
        const vals = hm && hm[0] && hm[0].result;
        const map = {};
        if (Array.isArray(vals)) {
          ids.forEach((id, idx) => {
            const raw = vals[idx];
            if (raw && typeof raw === "string") {
              try {
                map[id] = JSON.parse(raw);
              } catch (e) {}
            }
          });
        }
        for (const v of visitors) {
          const d = v.visitorId ? map[v.visitorId] : null;
          if (d && typeof d === "object") {
            v.activity = {
              counts: d.counts && typeof d.counts === "object" ? d.counts : {},
              total: typeof d.total === "number" ? d.total : 0,
              lastAt: d.lastAt || null,
              samples: Array.isArray(d.samples) ? d.samples : [],
            };
          } else {
            v.activity = null;
          }
        }
      }
      return res.status(200).json({ ok: true, visitors, isAdmin: true });
    }

    const zr = await redisPipeline([["ZREVRANGE", Z_INDEX, "0", "199"]]);
    const slugs = zr && zr[0] && Array.isArray(zr[0].result) ? zr[0].result : [];
    if (slugs.length === 0) {
      return res.status(200).json({ ok: true, links: [], isAdmin: true });
    }

    const cmds = [];
    for (const s of slugs) {
      cmds.push(["HGET", META_HASH, s]);
      cmds.push(["HGET", TOTALS_HASH, s]);
      cmds.push(["HGET", UNIQUE_HASH, s]);
      cmds.push(["GET", `poker_app:track_links:ev_n:${s}`]);
      cmds.push(["SCARD", `poker_app:track_links:ev_u:${s}`]);
    }
    const results = await redisPipeline(cmds);
    const links = [];
    const stride = 5;
    for (let i = 0; i < slugs.length; i++) {
      const base = i * stride;
      const metaStr = results && results[base] && results[base].result;
      if (!metaStr) continue;
      let meta;
      try {
        meta = JSON.parse(metaStr);
      } catch (e) {
        continue;
      }
      const total = parseInt(results[base + 1] && results[base + 1].result, 10) || 0;
      const unique = parseInt(results[base + 2] && results[base + 2].result, 10) || 0;
      const evN = results[base + 3] && results[base + 3].result;
      const evU = results[base + 4] && results[base + 4].result;
      const actionEvents = evN != null ? parseInt(evN, 10) || 0 : 0;
      const activeVisitors = evU != null ? parseInt(evU, 10) || 0 : 0;
      links.push({
        id: slugs[i],
        label: meta.label || "",
        params: meta.params && typeof meta.params === "object" ? meta.params : {},
        createdAt: meta.createdAt || null,
        totalClicks: total,
        uniqueClicks: unique,
        actionEvents,
        activeVisitors,
      });
    }
    return res.status(200).json({ ok: true, links, isAdmin: true });
  }

  if (req.method === "DELETE") {
    const slug = safeSlug(bodyParsed.id || bodyParsed.slug || bodyParsed.ref || "");
    if (!slug) return res.status(400).json({ ok: false, error: "Не указана ссылка" });
    const existing = await redisPipeline([["HGET", META_HASH, slug]]);
    if (!existing || !existing[0] || !existing[0].result) {
      return res.status(404).json({ ok: false, error: "Ссылка уже удалена" });
    }
    const pipe = await redisPipeline([
      ["ZREM", Z_INDEX, slug],
      ["HDEL", META_HASH, slug],
      ["HDEL", TOTALS_HASH, slug],
      ["HDEL", UNIQUE_HASH, slug],
      ["DEL", `poker_app:track_links:users:${slug}`],
      ["DEL", `poker_app:track_links:log:${slug}`],
      ["DEL", `poker_app:track_links:ev_n:${slug}`],
      ["DEL", `poker_app:track_links:ev_u:${slug}`],
      ["DEL", `poker_app:track_links:ev_by:${slug}`],
      ["DEL", `poker_app:track_links:vd:${slug}`],
    ]);
    if (!pipe || pipe.some((row) => row && row.error)) {
      return res.status(500).json({ ok: false, error: "Не удалось удалить ссылку" });
    }
    return res.status(200).json({ ok: true, deleted: slug, isAdmin: true });
  }

  if (req.method === "POST") {
    const body = bodyParsed;

    let paramsObj = {};
    try {
      paramsObj = parseParamsInput(body.params != null ? body.params : body.paramsJson);
    } catch (e) {
      return res.status(400).json({ ok: false, error: "Параметры: укажите JSON-объект, например {\"utm\":\"story\"}" });
    }

    const paramsStr = JSON.stringify(paramsObj);
    if (paramsStr.length > 4096) {
      return res.status(400).json({ ok: false, error: "Параметры слишком длинные (макс. 4096 символов)" });
    }

    const label = safeLabel(body.label);
    let slug;
    for (let attempt = 0; attempt < 12; attempt++) {
      const candidate = crypto.randomBytes(4).toString("hex");
      const exists = await redisPipeline([["HGET", META_HASH, candidate]]);
      if (!exists || !exists[0] || !exists[0].result) {
        slug = candidate;
        break;
      }
    }
    if (!slug) {
      return res.status(500).json({ ok: false, error: "Could not generate id" });
    }

    const now = Date.now();
    const meta = {
      label,
      params: paramsObj,
      createdAt: new Date(now).toISOString(),
      createdBy: adminId,
    };

    const pipe = await redisPipeline([
      ["ZADD", Z_INDEX, String(now), slug],
      ["HSET", META_HASH, slug, JSON.stringify(meta)],
      ["HSET", TOTALS_HASH, slug, "0"],
      ["HSET", UNIQUE_HASH, slug, "0"],
    ]);
    if (!pipe || pipe.some((r) => r && r.error)) {
      return res.status(500).json({ ok: false, error: "Redis error" });
    }

    const startParam = `ref_${slug}`;
    return res.status(200).json({
      ok: true,
      id: slug,
      startParam,
      isAdmin: true,
    });
  }

  return res.status(405).json({ ok: false, error: "Method not allowed" });
};
