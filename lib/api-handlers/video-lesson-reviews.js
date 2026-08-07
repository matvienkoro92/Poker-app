const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
/**
 * Отзывы о видеоуроках: лента в Redis по тренеру (GET без авторизации, POST с initData).
 * coach=nikolay_fishkopcheny — Николай FishKopcheny (единственный в мини‑аппе).
 * Админ (TELEGRAM_ADMIN_ID): удаление отзыва — POST { action: "delete", reviewId, coach }.
 */
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { ensureDtIdForUserId } = require("../account-id");
const { BIND_HASH_KEY, PROFILE_HASH_KEY } = require("../pokerplus");
const { pokerProfileStatusFromCachedProfile } = require("../chat-profile-status");
const { rateLimit, rejectIfPayloadTooLarge } = require("../api-limits");
const { isAdminIdentity } = require("../api-auth");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

const DEFAULT_COACH = "nikolay_fishkopcheny";
const COACH_REDIS_KEYS = {
  nikolay_fishkopcheny: "poker_app:video_lesson_reviews:coach_nikolay_fishkopcheny",
};
/** Старый общий ключ — читаем только если у выбранного тренера лента пуста (миграция). */
const LEGACY_LIST_KEY = "poker_app:video_lesson_reviews";
const CHAT_DISPLAY_NAMES_KEY = "poker_app:visitor_chat_display_names";
const AVATAR_PREFIX = "poker_app:avatar:";
const PRESET_AVATARS = {
  tiger: "./assets/avatar-tiger.jpg", raccoon: "./assets/avatar-raccoon.jpg", skull: "./assets/avatar-skull.jpg",
  phoenix: "./assets/avatar-phoenix.jpg", octopus: "./assets/avatar-octopus.jpg", cat: "./assets/avatar-cat.jpg",
  robot: "./assets/avatar-robot.jpg", bulldog: "./assets/avatar-bulldog.jpg", monkey: "./assets/daily-poker-monkey.webp",
  fox: "./assets/avatar-fox.jpg", chip: "./assets/avatar-chip.jpg", koala: "./assets/avatar-koala.jpg", raven: "./assets/avatar-raven.jpg",
  crocodile: "./assets/avatar-crocodile.jpg", rabbit: "./assets/avatar-rabbit.jpg", chameleon: "./assets/avatar-chameleon.jpg",
  panda: "./assets/avatar-panda.jpg", wolf: "./assets/avatar-wolf.jpg", owl: "./assets/avatar-owl.jpg", bat: "./assets/avatar-bat.jpg", gorilla: "./assets/avatar-gorilla.jpg",
};

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

function safeProfile(raw) {
  try { return raw && (typeof raw === "object" ? raw : JSON.parse(String(raw))) || {}; } catch (error) { return {}; }
}
function profileNick(profile) {
  return String(profile && (profile.nickname || profile.Nike || profile.nick || profile.name || profile.displayName) || "").trim();
}
function avatarUrl(value) {
  value = String(value || "").trim();
  if (value.startsWith("data:image/")) return value;
  if (value.startsWith("preset:")) return PRESET_AVATARS[value.slice(7)] || "";
  return "";
}
function normalizedAuthorKeys(value) {
  const source = String(value || "").toLowerCase();
  const keys = [source, source.replace(/\([^)]*\)/g, " ")];
  const handles = source.match(/@[a-z0-9_]+/g) || [];
  keys.push(...handles);
  return [...new Set(keys.map((key) => key.replace(/^@+/, "").replace(/[^a-zа-яё0-9_]+/gi, "").trim()).filter(Boolean))];
}
async function enrichReviews(rows) {
  const reviews = Array.isArray(rows) ? rows : [];
  if (!reviews.length) return reviews;
  const all = await redisPipeline([
    ["HGETALL", PROFILE_HASH_KEY],
    ["HGETALL", CHAT_DISPLAY_NAMES_KEY],
  ]);
  const profiles = all && all[0] && all[0].result && typeof all[0].result === "object" ? all[0].result : {};
  const displayNames = all && all[1] && all[1].result && typeof all[1].result === "object" ? all[1].result : {};
  const lookup = {};
  Object.keys(profiles).forEach((accountId) => {
    const profile = safeProfile(profiles[accountId]);
    const candidates = [profileNick(profile), profile.telegram, profile.username, profile.userName, displayNames[accountId]];
    candidates.forEach((candidate) => normalizedAuthorKeys(candidate).forEach((key) => { if (!lookup[key]) lookup[key] = accountId; }));
  });
  Object.keys(displayNames).forEach((accountId) => normalizedAuthorKeys(displayNames[accountId]).forEach((key) => { if (!lookup[key]) lookup[key] = accountId; }));
  const accountIds = [...new Set(reviews.map((review) => {
    const explicit = String(review && (review.authorProfileId || review.authorId) || "").trim();
    if (explicit) return explicit;
    const keys = normalizedAuthorKeys(review && review.author);
    for (const key of keys) if (lookup[key]) return lookup[key];
    return "";
  }).filter(Boolean))];
  const details = accountIds.length ? await redisPipeline(accountIds.flatMap((accountId) => [
    ["HGET", PROFILE_HASH_KEY, accountId],
    ["HGET", CHAT_DISPLAY_NAMES_KEY, accountId],
    ["GET", AVATAR_PREFIX + accountId.replace(/[^a-zA-Z0-9_-]/g, "_")],
    ["HGET", BIND_HASH_KEY, accountId],
  ])) : [];
  const authors = {};
  accountIds.forEach((accountId, index) => {
    const offset = index * 4;
    const profile = safeProfile(details && details[offset] && details[offset].result);
    const poker21Id = String(details && details[offset + 3] && details[offset + 3].result || "").trim();
    const nickname = profileNick(profile);
    const status = nickname ? pokerProfileStatusFromCachedProfile(profile, { pokerPlusLinked: !!poker21Id }) : null;
    authors[accountId] = {
      profileId: accountId,
      name: nickname || String(details && details[offset + 1] && details[offset + 1].result || "").trim(),
      avatar: avatarUrl(details && details[offset + 2] && details[offset + 2].result),
      poker21Id,
      level: Math.max(0, Number(status && status.level) || 0),
      verified: !!poker21Id,
    };
  });
  return reviews.map((review) => {
    let accountId = String(review && (review.authorProfileId || review.authorId) || "").trim();
    if (!accountId) {
      const keys = normalizedAuthorKeys(review && review.author);
      for (const key of keys) { if (lookup[key]) { accountId = lookup[key]; break; } }
    }
    const author = authors[accountId] || {};
    return Object.assign({}, review, {
      authorProfileId: author.profileId || accountId || "",
      authorName: author.name || review.author || "Ученик",
      authorAvatar: author.avatar || review.authorAvatar || "",
      authorPoker21Id: author.poker21Id || "",
      authorLevel: author.level || 0,
      authorVerified: author.verified === true,
    });
  });
}

function isAdminFromReq(req) {
  var who = resolveTelegramIdentity(req, {}, BOT_TOKEN);
  var mid = who ? memberIdFromIdentity(who) : null;
  return !!(mid && isAdminIdentity(who, mid));
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
          reviews: await enrichReviews(reviews),
          coach: coachSlugGet,
          source: "redis_legacy",
          isAdmin: adminFlag,
        });
      }
    }
    return res.status(200).json({
      ok: true,
      reviews: await enrichReviews(reviews),
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
    if (!adminMemberId || !isAdminIdentity(identityDel, adminMemberId)) {
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
  var memberId = memberIdFromIdentity(identity);
  var accountId = memberId ? await ensureDtIdForUserId(memberId) : "";

  var entry = {
    id: Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 9),
    at: Date.now(),
    text: text,
    author: authorLabel(identity, initForName),
    authorId: accountId || "",
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
