/**
 * Админка: уникальные ссылки на главную с параметрами и статистика переходов.
 *
 * GET  /api/tracking-links?initData=... — список ссылок
 * GET  /api/tracking-links?initData=...&id=slug&visitors=1 — журнал переходов
 * POST /api/tracking-links — создать { initData, label?, params? }
 */
const crypto = require("crypto");
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const ADMIN_IDS = (process.env.TELEGRAM_ADMIN_ID || "388008256,2144406710,1897001087")
  .toString()
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const Z_INDEX = "poker_app:track_links:z";
const META_HASH = "poker_app:track_links:meta";
const TOTALS_HASH = "poker_app:track_links:totals";
const UNIQUE_HASH = "poker_app:track_links:unique";

function isAdmin(userId) {
  const id = String(userId).replace(/^tg_/, "");
  return id && ADMIN_IDS.length > 0 && ADMIN_IDS.includes(id);
}

function validateUser(initData) {
  if (!initData || !BOT_TOKEN) return null;
  try {
    const params = new URLSearchParams(initData);
    const hash = params.get("hash");
    params.delete("hash");
    const dataCheckString = [...params.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => k + "=" + v)
      .join("\n");
    const secretKey = crypto.createHmac("sha256", "WebAppData").update(BOT_TOKEN).digest();
    const calculatedHash = crypto.createHmac("sha256", secretKey).update(dataCheckString).digest("hex");
    if (calculatedHash !== hash) return null;
    const user = JSON.parse(params.get("user") || "{}");
    return user.id ? { id: user.id } : null;
  } catch (e) {
    return null;
  }
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
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (!REDIS_URL || !REDIS_TOKEN) {
    return res.status(500).json({ ok: false, error: "Redis not configured" });
  }

  let initData = "";
  if (req.method === "GET") {
    initData = req.query.initData || "";
  } else if (req.method === "POST") {
    let body = {};
    try {
      body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    } catch (e) {}
    initData = body.initData || body.init_data || "";
  }

  const adminUser = initData ? validateUser(initData) : null;
  const adminId = adminUser ? "tg_" + adminUser.id : null;
  if (!adminUser || !isAdmin(adminId)) {
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
    }
    const results = await redisPipeline(cmds);
    const links = [];
    for (let i = 0; i < slugs.length; i++) {
      const metaStr = results && results[i * 3] && results[i * 3].result;
      if (!metaStr) continue;
      let meta;
      try {
        meta = JSON.parse(metaStr);
      } catch (e) {
        continue;
      }
      const total = parseInt(results[i * 3 + 1] && results[i * 3 + 1].result, 10) || 0;
      const unique = parseInt(results[i * 3 + 2] && results[i * 3 + 2].result, 10) || 0;
      links.push({
        id: slugs[i],
        label: meta.label || "",
        params: meta.params && typeof meta.params === "object" ? meta.params : {},
        createdAt: meta.createdAt || null,
        totalClicks: total,
        uniqueClicks: unique,
      });
    }
    return res.status(200).json({ ok: true, links, isAdmin: true });
  }

  if (req.method === "POST") {
    let body = {};
    try {
      body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    } catch (e) {
      return res.status(400).json({ ok: false, error: "Invalid JSON" });
    }

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
