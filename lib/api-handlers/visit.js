/**
 * Счётчик визитов: уникальные и повторные.
 * При POST с initData сохраняет username для tg_ посетителей.
 * Нужны: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN, TELEGRAM_BOT_TOKEN.
 */
const crypto = require("crypto");
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { isAdminIdentity } = require("../api-auth");
const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
const { mskDateKeyFromMs } = require("../player-crm-utils");
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

function getUsernameFromInitData(initData) {
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
    return (user.username || "").trim() || null;
  } catch (e) {
    return null;
  }
}

function getVisitValues(hgetallResult) {
  if (!hgetallResult) return [];
  if (Array.isArray(hgetallResult)) {
    const vals = [];
    for (let i = 1; i < hgetallResult.length; i += 2) {
      vals.push(parseInt(hgetallResult[i], 10) || 0);
    }
    return vals;
  }
  if (typeof hgetallResult === 'object') {
    return Object.values(hgetallResult).map((v) => parseInt(v, 10) || 0);
  }
  return [];
}

function countReturning(hgetallResult) {
  const vals = getVisitValues(hgetallResult);
  return vals.filter((v) => v > 1).length;
}

function totalVisits(hgetallResult) {
  return getVisitValues(hgetallResult).reduce((sum, v) => sum + v, 0);
}

const DT_IDS_KEY = 'poker_app:visitor_dt_ids';
const ID_TO_USER_KEY = 'poker_app:id_to_user';
const FIRST_SEEN_KEY = 'poker_app:visitor_first_seen';
const VISITS_DAY_PREFIX = 'poker_app:visits:day:';
const VISITORS_DAY_PREFIX = 'poker_app:visitors_day:';

function generateUserId() {
  return 'ID' + String(Math.floor(100000 + Math.random() * 900000));
}

function jsonVisits(res, unique, returning, total, ok, dtId) {
  res.setHeader('Content-Type', 'application/json');
  const body = { unique: unique || 0, returning: returning || 0, total: total || 0, ok: !!ok };
  if (dtId) body.dtId = dtId;
  return res.status(200).json(body);
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!redisConfigured()) {
    return res.status(200).json({
      unique: 0, returning: 0, total: 0, ok: false, error: 'redis_not_configured',
      debug: { hasUrl: !!process.env.UPSTASH_REDIS_REST_URL, hasToken: !!process.env.UPSTASH_REDIS_REST_TOKEN },
    });
  }

  let postBody = {};
  if (req.method === 'POST') {
    try {
      postBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    } catch (e) {}
  }

  function visitRequestIsAdmin() {
    const identity = resolveTelegramIdentity(req, postBody, BOT_TOKEN);
    const mid = identity ? memberIdFromIdentity(identity) : null;
    return !!(mid && isAdminIdentity(identity, mid));
  }

  // Только статистика (без регистрации визита) — только для админов
  if (req.method === 'GET' && req.query.stats === '1') {
    if (!visitRequestIsAdmin()) {
      return res.status(200).json({ ok: false, error: 'forbidden' });
    }
    const results = await redisPipeline([
      ['SCARD', 'poker_app:visitors'],
      ['HGETALL', 'poker_app:visits'],
    ]);
    if (!results || !Array.isArray(results) || results.length !== 2) {
      return res.status(200).json({ unique: 0, returning: 0, total: 0, ok: false });
    }
    if (results.some(function (r) { return r && r.error; })) {
      return res.status(200).json({ unique: 0, returning: 0, total: 0, ok: false });
    }
    const unique = parseInt(results[0]?.result, 10) || 0;
    const r1 = results[1]?.result || [];
    const returning = countReturning(r1);
    const total = totalVisits(r1);
    return res.status(200).json({ unique, returning, total, ok: true });
  }

  let visitorId = req.query.visitor_id || req.query.visitorId;
  let initData = null;
  if (req.method === 'POST') {
    visitorId = visitorId || postBody.visitor_id || postBody.visitorId;
    initData = postBody.initData || postBody.init_data;
  }

  if (!visitorId || typeof visitorId !== 'string' || visitorId.length > 128) {
    return res.status(400).json({ error: 'visitor_id required' });
  }

  const safeId = visitorId.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 128);

  const now = new Date();
  const nowMs = String(now.getTime());
  const dayKey = mskDateKeyFromMs(now.getTime());
  const monthKey = 'poker_app:visitors_month:' + now.getUTCFullYear() + '-' + String(now.getUTCMonth() + 1).padStart(2, '0');

  const commands = [
    ['SADD', 'poker_app:visitors', safeId],
    ['SADD', monthKey, safeId],
    ['SADD', VISITORS_DAY_PREFIX + dayKey, safeId],
    ['HINCRBY', VISITS_DAY_PREFIX + dayKey, safeId, '1'],
    ['HINCRBY', 'poker_app:visits', safeId, '1'],
    ['SCARD', 'poker_app:visitors'],
    ['HGETALL', 'poker_app:visits'],
    ['HGET', DT_IDS_KEY, safeId],
  ];
  const username = initData && safeId.startsWith('tg_') ? getUsernameFromInitData(initData) : null;
  if (username) commands.push(['HSET', 'poker_app:visitor_usernames', safeId, username]);

  let results;
  try {
    results = await redisPipeline(commands);
  } catch (e) {
    return jsonVisits(res, 0, 0, 0, false);
  }

  if (!results || !Array.isArray(results) || results.length < 6) {
    return jsonVisits(res, 0, 0, 0, false);
  }

  if (results.some(function (r) { return r && r.error; })) {
    return jsonVisits(res, 0, 0, 0, false);
  }

  const wasNewVisitor = String(results[0] && results[0].result) === "1";
  if (wasNewVisitor) {
    await redisPipeline([['HSETNX', FIRST_SEEN_KEY, safeId, nowMs]]).catch(function () {});
  }

  const r4 = results[5] && results[5].result !== undefined ? results[5].result : 0;
  const r5 = results[6] && results[6].result !== undefined ? results[6].result : [];
  const unique = parseInt(r4, 10) || 0;
  const returning = countReturning(r5);
  const total = totalVisits(r5);

  let dtId = results[7] && results[7].result ? String(results[7].result).trim() : null;
  const needsNewId = !dtId || /^DT#\d+$/.test(dtId);
  if (needsNewId && safeId.startsWith('tg_')) {
    for (let i = 0; i < 10; i++) {
      dtId = generateUserId();
      const exists = await redisPipeline([["HGET", ID_TO_USER_KEY, dtId]]);
      const taken = exists && exists[0] && exists[0].result;
      if (!taken) {
        await redisPipeline(
          [
            ["HSET", DT_IDS_KEY, safeId, dtId],
            ["HSET", ID_TO_USER_KEY, dtId, safeId],
          ]
        );
        break;
      }
    }
  }

  if (!visitRequestIsAdmin()) {
    res.setHeader('Content-Type', 'application/json');
    const out = { ok: true };
    if (dtId) out.dtId = dtId;
    return res.status(200).json(out);
  }
  return jsonVisits(res, unique, returning, total, true, dtId);
};
