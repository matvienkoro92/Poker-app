/**
 * Комментарии к статьям газеты «Вестник»: по одному списку в Redis на статью.
 * ArticleId 98 и 99 зарезервированы под ленты «ВПН» и «Прокси» (модалка в шапке), не под выпуски газеты.
 * GET ?articleId=12 — без авторизации.
 * POST { articleId, text } — с initData / pwaSession / pwaVkSession (как video-lesson-reviews).
 * POST { action: "delete", articleId, commentId } — только TELEGRAM_ADMIN_ID.
 */
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const ADMIN_IDS = (process.env.TELEGRAM_ADMIN_ID || "388008256,2144406710,1897001087")
  .toString()
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const MAX_ITEMS = 120;
const MAX_TEXT = 2000;
const GET_LIMIT = 80;

const CHAT_DISPLAY_NAMES_KEY = "poker_app:visitor_chat_display_names";
const USERNAMES_KEY = "poker_app:visitor_usernames";
const CHAT_DISPLAY_NAME_MAX = 80;

function sanitizeChatDisplayName(raw) {
  return String(raw || "")
    .trim()
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .slice(0, CHAT_DISPLAY_NAME_MAX);
}

function redisKeyForArticle(articleId) {
  return "poker_app:gazette_comments:a_" + String(articleId);
}

function normalizeArticleId(raw) {
  var n = parseInt(String(raw != null ? raw : ""), 10);
  if (isNaN(n) || n < 1 || n > 99) return null;
  return n;
}

function isAdminTelegramId(userId) {
  var id = String(userId).replace(/^tg_/, "");
  return id && ADMIN_IDS.length > 0 && ADMIN_IDS.includes(id);
}

function isAdminFromReq(req) {
  var who = resolveTelegramIdentity(req, {}, BOT_TOKEN);
  return !!(who && who.id != null && isAdminTelegramId(who.id));
}

async function redisPipeline(commands) {
  if (!REDIS_URL || !REDIS_TOKEN) return null;
  const base = String(REDIS_URL).replace(/\/$/, "");
  const res = await fetch(base + "/pipeline", {
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

function authorLabel(identity, initDataStr, bodyPre) {
  bodyPre = bodyPre || {};
  if (identity && identity.vkId != null) {
    var fnV = (identity.firstName || "").trim();
    var lnV = (identity.lastName || "").trim();
    var dm = (identity.pwaUsername || "").trim();
    var nameV = [fnV, lnV].filter(Boolean).join(" ");
    if (nameV && dm) return nameV + " (VK: " + dm + ")";
    if (nameV) return nameV + " (ВКонтакте)";
    if (dm) return "VK: " + dm;
    return "ВКонтакте";
  }
  var fn0 = (identity && identity.firstName ? identity.firstName : "").trim();
  var ln0 = (identity && identity.lastName ? identity.lastName : "").trim();
  var nameFromId = [fn0, ln0].filter(Boolean).join(" ");
  var unTg = (identity && identity.telegramUsername ? String(identity.telegramUsername) : "").replace(/^@+/, "").trim();
  var pwaU = (identity && identity.pwaUsername ? String(identity.pwaUsername) : "").replace(/^@+/, "").trim();
  var userSlug = unTg || pwaU;
  if (nameFromId && userSlug) return nameFromId + " (@" + userSlug + ")";
  if (nameFromId) return nameFromId;
  if (userSlug) return "@" + userSlug;

  var hintFn = String(bodyPre.profileFirstName != null ? bodyPre.profileFirstName : "")
    .trim()
    .slice(0, 64);
  var hintLn = String(bodyPre.profileLastName != null ? bodyPre.profileLastName : "")
    .trim()
    .slice(0, 64);
  var hintName = [hintFn, hintLn].filter(Boolean).join(" ");
  if (hintName && userSlug) return hintName + " (@" + userSlug + ")";
  if (hintName) return hintName;

  var raw = initDataStr || (identity && identity.rawInitData) || "";
  try {
    var params = new URLSearchParams(String(raw));
    var user = JSON.parse(params.get("user") || "{}");
    var fn2 = (user.first_name || "").trim();
    var ln2 = (user.last_name || "").trim();
    var un = (user.username || "").trim();
    var name2 = [fn2, ln2].filter(Boolean).join(" ");
    if (name2 && un) return name2 + " (@" + un + ")";
    if (name2) return name2;
    if (un) return "@" + un;
  } catch (e) {}
  return "Читатель";
}

async function redisHgetChatDisplay(memberId) {
  if (!memberId || !REDIS_URL || !REDIS_TOKEN) return "";
  var results = await redisPipeline([["HGET", CHAT_DISPLAY_NAMES_KEY, memberId]]);
  var raw = results && results[0] && results[0].result;
  if (raw == null || raw === false) return "";
  return sanitizeChatDisplayName(raw);
}

function buildUserNameSlug(identity, initForName, bodyPre) {
  bodyPre = bodyPre || {};
  if (identity && identity.vkId != null) {
    var dm = (identity.pwaUsername || "").replace(/^@+/, "").trim();
    return dm || "";
  }
  var un = (identity && identity.telegramUsername ? String(identity.telegramUsername) : "").replace(/^@+/, "").trim();
  if (un) return un;
  var pu = (identity && identity.pwaUsername ? String(identity.pwaUsername) : "").replace(/^@+/, "").trim();
  if (pu) return pu;
  try {
    var params = new URLSearchParams(String(initForName || ""));
    var user = JSON.parse(params.get("user") || "{}");
    var ux = (user.username || "").trim();
    if (ux) return ux;
  } catch (eU) {}
  return "";
}

async function enrichCommentsWithProfileFields(comments) {
  if (!REDIS_URL || !REDIS_TOKEN || !comments || !comments.length) return comments;
  var ids = [];
  var seen = {};
  for (var i = 0; i < comments.length; i++) {
    var m = comments[i] && comments[i].memberId ? String(comments[i].memberId).trim() : "";
    if (m && !seen[m]) {
      seen[m] = true;
      ids.push(m);
    }
  }
  if (!ids.length) return comments;
  var results = await redisPipeline([
    ["HMGET", CHAT_DISPLAY_NAMES_KEY, ...ids],
    ["HMGET", USERNAMES_KEY, ...ids],
  ]);
  var dispRow = results && results[0] && Array.isArray(results[0].result) ? results[0].result : [];
  var userRow = results && results[1] && Array.isArray(results[1].result) ? results[1].result : [];
  return comments.map(function (c) {
    var o = Object.assign({}, c);
    var mid = c && c.memberId ? String(c.memberId).trim() : "";
    if (!mid) return o;
    var idx = ids.indexOf(mid);
    if (idx < 0) return o;
    var cdRaw = idx < dispRow.length ? dispRow[idx] : null;
    var cd = sanitizeChatDisplayName(cdRaw != null && cdRaw !== false ? cdRaw : "");
    if (cd) o.chatDisplayName = cd;
    else delete o.chatDisplayName;
    var unRaw = idx < userRow.length ? userRow[idx] : null;
    var un = unRaw != null && unRaw !== false ? String(unRaw).replace(/^@+/, "").trim() : "";
    if (un) o.userNameSlug = un;
    return o;
  });
}

async function removeCommentFromList(key, commentId) {
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
    return o && String(o.id) !== String(commentId);
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

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    var adminFlag = isAdminFromReq(req);
    var aid = normalizeArticleId((req.query && req.query.articleId) || (req.query && req.query.article));
    if (aid == null) {
      return res.status(400).json({ ok: false, error: "Укажите articleId (1–99)" });
    }
    if (!REDIS_URL || !REDIS_TOKEN) {
      return res.status(200).json({ ok: true, comments: [], articleId: aid, source: "none", isAdmin: adminFlag });
    }
    var key = redisKeyForArticle(aid);
    var results = await redisPipeline([["LRANGE", key, "0", String(GET_LIMIT - 1)]]);
    var rawList = results && results[0] && results[0].result;
    var list = Array.isArray(rawList) ? rawList : [];
    var comments = [];
    for (var i = 0; i < list.length; i++) {
      try {
        comments.push(JSON.parse(list[i]));
      } catch (eParse) {}
    }
    try {
      comments = await enrichCommentsWithProfileFields(comments);
    } catch (eEn) {}
    return res.status(200).json({
      ok: true,
      comments: comments,
      articleId: aid,
      source: "redis",
      isAdmin: adminFlag,
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  var bodyPre = {};
  try {
    bodyPre = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch (e) {
    bodyPre = {};
  }

  var articleIdNorm = normalizeArticleId(bodyPre.articleId != null ? bodyPre.articleId : bodyPre.article);

  if (String(bodyPre.action || "").toLowerCase() === "delete") {
    var identityDel = resolveTelegramIdentity(req, bodyPre, BOT_TOKEN);
    if (!identityDel) {
      return res.status(401).json({ ok: false, error: "Откройте приложение в Telegram или войдите через виджет" });
    }
    if (!isAdminTelegramId(identityDel.id)) {
      return res.status(403).json({ ok: false, error: "Только администратор может удалять комментарии" });
    }
    if (!REDIS_URL || !REDIS_TOKEN) {
      return res.status(503).json({ ok: false, error: "Сервер не настроен" });
    }
    if (articleIdNorm == null) {
      return res.status(400).json({ ok: false, error: "Укажите articleId" });
    }
    var commentIdDel = String(bodyPre.commentId != null ? bodyPre.commentId : bodyPre.id || "").trim();
    if (!commentIdDel) {
      return res.status(400).json({ ok: false, error: "Не указан комментарий" });
    }
    var keyDel = redisKeyForArticle(articleIdNorm);
    var removed = await removeCommentFromList(keyDel, commentIdDel);
    if (!removed) {
      return res.status(404).json({ ok: false, error: "Комментарий не найден" });
    }
    return res.status(200).json({ ok: true });
  }

  if (articleIdNorm == null) {
    return res.status(400).json({ ok: false, error: "Укажите articleId (1–99)" });
  }

  var identity = resolveTelegramIdentity(req, bodyPre, BOT_TOKEN);
  if (!identity) {
    return res.status(401).json({ ok: false, error: "Откройте в Telegram или войдите через сайт (Telegram / ВКонтакте)" });
  }

  if (!REDIS_URL || !REDIS_TOKEN) {
    return res.status(503).json({ ok: false, error: "Сервер не настроен" });
  }

  var text = String(bodyPre.text != null ? bodyPre.text : "").trim();
  if (!text) {
    return res.status(400).json({ ok: false, error: "Введите текст комментария" });
  }
  if (text.length > MAX_TEXT) {
    text = text.slice(0, MAX_TEXT);
  }

  var initForName =
    bodyPre.initData ||
    bodyPre.init_data ||
    (req.query && req.query.initData) ||
    "";

  var listKey = redisKeyForArticle(articleIdNorm);
  var mid = memberIdFromIdentity(identity);
  var chatDisp = mid ? await redisHgetChatDisplay(mid) : "";
  var slug = buildUserNameSlug(identity, initForName, bodyPre);
  var authorLine = chatDisp || (slug ? "@" + slug : authorLabel(identity, initForName, bodyPre));
  var entry = {
    id: Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 9),
    at: Date.now(),
    text: text,
    author: authorLine,
    articleId: articleIdNorm,
  };
  if (mid) entry.memberId = mid;
  if (chatDisp) entry.chatDisplayName = chatDisp;
  if (slug) entry.userNameSlug = slug;

  var json = JSON.stringify(entry);
  var pipe = await redisPipeline([
    ["LPUSH", listKey, json],
    ["LTRIM", listKey, "0", String(MAX_ITEMS - 1)],
  ]);
  if (!pipe) {
    return res.status(500).json({ ok: false, error: "Не удалось сохранить" });
  }

  return res.status(200).json({ ok: true, comment: entry });
};
