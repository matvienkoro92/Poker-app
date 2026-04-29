const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
/**
 * Отзывы о видеоуроках: лента в Redis по тренеру (GET без авторизации, POST с initData).
 * coach=nikolay_fishkopcheny — Николай FishKopcheny (единственный в мини‑аппе).
 * Админ (TELEGRAM_ADMIN_ID): удаление отзыва — POST { action: "delete", reviewId, coach }.
 */
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { rateLimit, rejectIfPayloadTooLarge } = require("../api-limits");
const { isAdmin } = require("../api-auth");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

const DEFAULT_COACH = "nikolay_fishkopcheny";
const COACH_REDIS_KEYS = {
  nikolay_fishkopcheny: "poker_app:video_lesson_reviews:coach_nikolay_fishkopcheny",
};
/** Старый общий ключ — читаем только если у выбранного тренера лента пуста (миграция). */
const LEGACY_LIST_KEY = "poker_app:video_lesson_reviews";

const MAX_ITEMS = 200;
const MAX_TEXT = 2000;
const GET_LIMIT = 80;

function normalizeCoachSlug(raw) {
  if (raw == null) return DEFAULT_COACH;
  var s = String(raw)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "");
  return COACH_REDIS_KEYS[s] ? s : DEFAULT_COACH;
}

function listKeyForCoach(slug) {
  return COACH_REDIS_KEYS[slug] || COACH_REDIS_KEYS[DEFAULT_COACH];
}

function isAdminTelegramId(userId) {
  return isAdmin(userId);
}

function isAdminFromReq(req) {
  var who = resolveTelegramIdentity(req, {}, BOT_TOKEN);
  var mid = who ? memberIdFromIdentity(who) : null;
  return !!(mid && isAdminTelegramId(mid));
}

/** Удалить первую запись с reviewId из ключа; порядок LRANGE (новые сначала) сохраняем через RPUSH. */
async function removeReviewFromListKey(key, reviewId) {
  var results = await redisPipeline([["LRANGE", key, "0", String(MAX_ITEMS + 50)]]);
  var rawList = results && results[0] && results[0].result;
  var list = Array.isArray(rawList) ? rawList : [];
  var objs = [];
  for (var i = 0; i < list.length; i++) {
    try {
      objs.push(JSON.parse(list[i]));
    } catch (eP) {}
  }
  var filtered = objs.filter(function (o) {
    return o && String(o.id) !== String(reviewId);
  });
  if (filtered.length === objs.length) return false;
  var pipe = [["DEL", key]];
  for (var j = 0; j < filtered.length; j++) {
    pipe.push(["RPUSH", key, JSON.stringify(filtered[j])]);
  }
  pipe.push(["LTRIM", key, "0", String(MAX_ITEMS - 1)]);
  var done = await redisPipeline(pipe);
  return !!done;
}

async function removeReviewFromCoachLists(coachSlug, reviewId) {
  var keys = [listKeyForCoach(coachSlug)];
  if (coachSlug === DEFAULT_COACH) keys.push(LEGACY_LIST_KEY);
  var seen = {};
  for (var k = 0; k < keys.length; k++) {
    var key = keys[k];
    if (!key || seen[key]) continue;
    seen[key] = true;
    if (await removeReviewFromListKey(key, reviewId)) return true;
  }
  return false;
}

function authorLabel(identity, initDataStr) {
  if (identity && identity.vkId != null) {
    var fn = (identity.firstName || "").trim();
    var ln = (identity.lastName || "").trim();
    var dm = (identity.pwaUsername || "").trim();
    var name = [fn, ln].filter(Boolean).join(" ");
    if (name && dm) return name + " (VK: " + dm + ")";
    if (name) return name + " (ВКонтакте)";
    if (dm) return "VK: " + dm;
    return "ВКонтакте";
  }
  if (identity.pwaUsername) {
    var u = String(identity.pwaUsername).replace(/^@+/, "").trim();
    return u ? "@" + u : "Ученик";
  }
  var raw = initDataStr || identity.rawInitData || "";
  try {
    var params = new URLSearchParams(String(raw));
    var user = JSON.parse(params.get("user") || "{}");
    var fn = (user.first_name || "").trim();
    var ln = (user.last_name || "").trim();
    var un = (user.username || "").trim();
    var name = [fn, ln].filter(Boolean).join(" ");
    if (name && un) return name + " (@" + un + ")";
    if (name) return name;
    if (un) return "@" + un;
  } catch (e) {}
  return "Ученик";
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    var adminFlag = isAdminFromReq(req);
    if (!redisConfigured()) {
      return res
        .status(200)
        .json({ ok: true, reviews: [], coach: DEFAULT_COACH, source: "none", isAdmin: adminFlag });
    }
    var coachSlugGet = normalizeCoachSlug((req.query && req.query.coach) || "");
    var keyGet = listKeyForCoach(coachSlugGet);
    var results = await redisPipeline([["LRANGE", keyGet, "0", String(GET_LIMIT - 1)]]);
    var rawList = results && results[0] && results[0].result;
    var list = Array.isArray(rawList) ? rawList : [];
    var reviews = [];
    for (var i = 0; i < list.length; i++) {
      try {
        reviews.push(JSON.parse(list[i]));
      } catch (eParse) {}
    }
    if (reviews.length === 0 && coachSlugGet === DEFAULT_COACH) {
      var leg = await redisPipeline([["LRANGE", LEGACY_LIST_KEY, "0", String(GET_LIMIT - 1)]]);
      var rawLeg = leg && leg[0] && leg[0].result;
      var arrLeg = Array.isArray(rawLeg) ? rawLeg : [];
      for (var j = 0; j < arrLeg.length; j++) {
        try {
          reviews.push(JSON.parse(arrLeg[j]));
        } catch (e2) {}
      }
      if (reviews.length) {
        return res.status(200).json({
          ok: true,
          reviews: reviews,
          coach: coachSlugGet,
          source: "redis_legacy",
          isAdmin: adminFlag,
        });
      }
    }
    return res.status(200).json({
      ok: true,
      reviews: reviews,
      coach: coachSlugGet,
      source: "redis",
      isAdmin: adminFlag,
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }
  if (rejectIfPayloadTooLarge(req, res, 16_384)) return;
  if (rateLimit(req, res, { bucket: "video_reviews", limit: 20, windowMs: 5 * 60_000 })) return;

  var bodyPre = {};
  try {
    bodyPre = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch (e) {
    bodyPre = {};
  }

  if (String(bodyPre.action || "").toLowerCase() === "delete") {
    var identityDel = resolveTelegramIdentity(req, bodyPre, BOT_TOKEN);
    if (!identityDel) {
      return res.status(401).json({ ok: false, error: "Откройте приложение в Telegram или войдите через виджет" });
    }
    var adminMemberId = memberIdFromIdentity(identityDel);
    if (!adminMemberId || !isAdminTelegramId(adminMemberId)) {
      return res.status(403).json({ ok: false, error: "Только администратор может удалять отзывы" });
    }
    if (!redisConfigured()) {
      return res.status(503).json({ ok: false, error: "Сервер не настроен" });
    }
    var reviewIdDel = String(bodyPre.reviewId != null ? bodyPre.reviewId : bodyPre.id || "").trim();
    if (!reviewIdDel) {
      return res.status(400).json({ ok: false, error: "Не указан отзыв" });
    }
    var coachDel = normalizeCoachSlug(bodyPre.coach || (req.query && req.query.coach));
    var removed = await removeReviewFromCoachLists(coachDel, reviewIdDel);
    if (!removed) {
      return res.status(404).json({ ok: false, error: "Отзыв не найден" });
    }
    return res.status(200).json({ ok: true });
  }

  var identity = resolveTelegramIdentity(req, bodyPre, BOT_TOKEN);
  if (!identity) {
    return res.status(401).json({ ok: false, error: "Откройте в Telegram или войдите через сайт (Telegram / ВКонтакте)" });
  }

  if (!redisConfigured()) {
    return res.status(503).json({ ok: false, error: "Сервер не настроен" });
  }

  var text = String(bodyPre.text != null ? bodyPre.text : "").trim();
  if (!text) {
    return res.status(400).json({ ok: false, error: "Введите текст отзыва" });
  }
  if (text.length > MAX_TEXT) {
    text = text.slice(0, MAX_TEXT);
  }

  var initForName =
    bodyPre.initData ||
    bodyPre.init_data ||
    (req.query && req.query.initData) ||
    "";

  var coachSlug = normalizeCoachSlug(bodyPre.coach || (req.query && req.query.coach));
  var listKey = listKeyForCoach(coachSlug);

  var entry = {
    id: Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 9),
    at: Date.now(),
    text: text,
    author: authorLabel(identity, initForName),
    coach: coachSlug,
  };

  var json = JSON.stringify(entry);
  var pipe = await redisPipeline([
    ["LPUSH", listKey, json],
    ["LTRIM", listKey, "0", String(MAX_ITEMS - 1)],
  ]);
  if (!pipe) {
    return res.status(500).json({ ok: false, error: "Не удалось сохранить" });
  }

  return res.status(200).json({ ok: true, review: entry });
};
