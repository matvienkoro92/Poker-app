"use strict";

const crypto = require("crypto");
const { authRequired, parseBody, setCors } = require("../api-auth");
const { listAppBlockedUsers, setAppUserBlocked } = require("../app-user-blocks");
const { rejectIfPayloadTooLarge, rateLimit } = require("../api-limits");
const {
  pipeline: redisPipeline,
  hscanall,
  sscanall,
  isConfigured: redisConfigured,
  hashPairsToObject,
} = require("../redis");
const { GENERAL_KEY, CHAT_GROUP_MSG_PREFIX } = require("../chat-storage");
const { resolveTelegramOpenButtonUrl, sendTelegramMessage } = require("../telegram-bot-send");
const { sendToMemberDevices, readVapidEnv } = require("../chat-webpush-notify");
const { getDtIdByUserId, getPreferredUserIdByDtId } = require("../account-id");
const { getLinkedEmailOriginalByDtId } = require("../email-auth");
const {
  REFERRAL_REFERRER_HASH,
  REFERRAL_AT_HASH,
  REFERRAL_SOURCE_HASH,
} = require("../referrals");
const { createPlayerCrmChatStats } = require("../player-crm-chat-stats");
const { isAdminReportIdentity } = require("../admin-report-access");
const { verifyAccessToken } = require("../admin-menu-access-token");
const { readAnalyticsSummary } = require("../analytics-tracking");
const { pokerProfileStatusFromCachedProfile } = require("../chat-profile-status");
const {
  addDaily,
  crmDateInRange,
  dateKeyFromMs,
  dateKeyFromIso,
  dateKeysBetween,
  daysAgoFromMs,
  daysAgoFromIso,
  earliestIso,
  eventInRange,
  isoFromMs,
  mapTotal,
  normalizeCrmEmail,
  normalizeTgId,
  nowIso,
  periodFromInput,
  rangeForPeriodKey,
  rangeFromInput,
  redisSet,
  safeJson,
  toNumericTelegramId,
  unique,
} = require("../player-crm-utils");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const CRM_TEST_ROMAN_CHAT_ID = String(process.env.TELEGRAM_ROMAN_CHAT_ID || "388008256").replace(/^tg_/, "");
const CRM_ALLOWED_EMAILS = new Set(["matvienkoro92@gmail.com", "matvienko.r2@yandex.ru"]);
const CRM_ALLOWED_MEMBER_IDS = new Set(["tg_388008256", "tg_5053253480"]);
const CRM_ALLOWED_USERNAMES = new Set(["roman1787443", "roman1_matvienko"]);

const VISITORS_KEY = "poker_app:visitors";
const VISITS_HASH = "poker_app:visits";
const VISITOR_FIRST_SEEN_HASH = "poker_app:visitor_first_seen";
const VISITS_DAY_PREFIX = "poker_app:visits:day:";
const VISITORS_DAY_PREFIX = "poker_app:visitors_day:";
const USERNAMES_HASH = "poker_app:visitor_usernames";
const DT_IDS_HASH = "poker_app:visitor_dt_ids";
const ID_TO_USER_HASH = "poker_app:id_to_user";
const DISPLAY_NAMES_HASH = "poker_app:visitor_chat_display_names";
const PERSONAL_HASH = "poker_app:visitor_personal";
const CHAT_USERS_KEY = "poker_app:chat_users";
const CHAT_LAST_SEEN_HASH = "poker_app:chat_last_seen";
const GAZETTE_SUBS_KEY = "poker_app:gazette_subscribers";
const RATING_SUBS_KEY = "poker_app:rating_subscribers";
const RAFFLE_SUBS_KEY = "poker_app:raffle_subscribers";
const RAFFLE_ACCOUNT_SUBS_KEY = "poker_app:raffle_account_subscribers";
const RAFFLE_IDS_KEY = "poker_app:raffle_ids";
const RAFFLE_PREFIX = "poker_app:raffle:";
const RAFFLE_PARTICIPANTS_DATA_PREFIX = "poker_app:raffle_participants_data:";
const {
  RAFFLE_STATS_DAY_PREFIX,
  RAFFLE_STATS_INDEX_READY_KEY,
  raffleStatsIndexCommands,
} = require("../raffle-stats-index");
const PUSH_REGISTRY_KEY = "poker_app:chat_push_registry";
const PUSH_DISABLED_KEY = "poker_app:chat_push_disabled";
const PUSH_SUBSCRIBED_AT_HASH = "poker_app:chat_push_subscribed_at";
const BOT_SUBSCRIBED_AT_HASH = "poker_app:bot_subscribed_at";
const PUSH_UNSUBSCRIBED_AT_HASH = "poker_app:chat_push_unsubscribed_at";
const BOT_UNSUBSCRIBED_AT_HASH = "poker_app:bot_unsubscribed_at";
const POKERPLUS_BIND_HASH = "poker_app:pokerplus_user_ids";
const POKERPLUS_BIND_AT_HASH = "poker_app:pokerplus_bound_at";
const POKERPLUS_UNBIND_AT_HASH = "poker_app:pokerplus_unbound_at";
const BOT_TRANSITION_HISTORY_RELIABLE_FROM = "2026-07-27";
const POKERPLUS_PROFILE_HASH = "poker_app:pokerplus_profiles";
const POKERPLUS_SYNC_HASH = "poker_app:pokerplus_profiles_synced_at";
const PROFILE_BIRTH_DATE_KEY = "poker_app:profile_birth_dates";
const PROFILE_CITY_KEY = "poker_app:profile_cities";
const AVATAR_PREFIX = "poker_app:avatar:";
const CRM_OVERRIDES_HASH = "poker_app:crm_player_overrides";
const CRM_CAMPAIGNS_LIST = "poker_app:crm_campaigns";
const CRM_CAMPAIGN_METRICS_PREFIX = "poker_app:crm_campaign_metrics:";
const CRM_CAMPAIGN_PROGRESS_PREFIX = "poker_app:crm_campaign_progress:";
const CRM_CAMPAIGN_JOB_PREFIX = "poker_app:crm_campaign_job:";
const CRM_LATEST_CHANNEL_POST_KEY = "poker_app:telegram:club_channel:last_post";
const CRM_CHANNEL_USERNAME = String(process.env.RAFFLE_CHANNEL || "@Dva_tuza_club")
  .trim()
  .replace(/^https?:\/\/t\.me\//i, "")
  .replace(/^@/, "")
  .replace(/\/.*$/, "");
const CRM_EVENTS_PREFIX = "poker_app:crm_activity_events:";
const CRM_TOUCH_PREFIX = "poker_app:crm_touches:";
const CALCULATION_DRAFT_KEY_PREFIX = "poker_app:admin_report_calculations_draft:";
const EMAIL_LINKS_HASH = "poker_app:email_links";
const EMAIL_ORIGINALS_HASH = "poker_app:email_originals";
const EMAIL_LINKED_AT_HASH = "poker_app:email_linked_at";
const TELEGRAM_LOGIN_AT_HASH = "poker_app:telegram_login_at";
const TELEGRAM_VISIBLE_HASH = "poker_app:telegram_visible";
const TRACK_Z_INDEX = "poker_app:track_links:z";
const TRACK_META_HASH = "poker_app:track_links:meta";
const TRACK_TOTALS_HASH = "poker_app:track_links:totals";
const TRACK_UNIQUE_HASH = "poker_app:track_links:unique";
const SECTION_VIEWS_HASH = "poker_app:section_views";
const SECTION_VIEWS_DAY_PREFIX = "poker_app:section_views:day:";
const ADMIN_IDS = (process.env.TELEGRAM_ADMIN_ID || "388008256,2144406710,1897001087")
  .toString()
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)
  .map((id) => "tg_" + String(id).replace(/^tg_/, ""));
const CRM_OWNER_IDS = (process.env.CRM_OWNER_IDS || process.env.TELEGRAM_ADMIN_ID || "388008256,2144406710,1897001087")
  .toString()
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)
  .map((id) => "tg_" + String(id).replace(/^tg_/, ""));
const CRM_TOUCH_MIN_HOURS = Math.max(1, Number(process.env.CRM_TOUCH_MIN_HOURS) || 20);
const CRM_GET_CACHE_TTL_MS = Math.max(5000, Number(process.env.CRM_GET_CACHE_TTL_MS) || 20000);
const CRM_PLAYERS_CACHE_TTL_MS = Math.max(CRM_GET_CACHE_TTL_MS, Number(process.env.CRM_PLAYERS_CACHE_TTL_MS) || 120000);
const CRM_GET_CACHE_MAX = 12;
const CRM_PUBLIC_LEVELS_CACHE_TTL_MS = Math.max(5000, Number(process.env.CRM_PUBLIC_LEVELS_CACHE_TTL_MS) || 45000);
const CRM_PUBLIC_LEVELS_REDIS_CACHE_KEY = "poker_app:player_crm:public_levels_cache:v2";
const CRM_SAFE_GET_MODES = new Set([
  "core",
  "players",
  "send",
  "raffles",
  "raffle-summary",
  "comparison",
  "dashboard-summary",
  "blocked",
  "chart",
]);
const CRM_CAMPAIGN_CONCURRENCY = Math.min(20, Math.max(1, Number(process.env.CRM_CAMPAIGN_CONCURRENCY) || 16));
const CRM_CAMPAIGN_PHOTO_CONCURRENCY = Math.min(12, Math.max(1, Number(process.env.CRM_CAMPAIGN_PHOTO_CONCURRENCY) || 8));
const CRM_CAMPAIGN_JOB_CHUNK_SIZE = Math.min(80, Math.max(5, Number(process.env.CRM_CAMPAIGN_JOB_CHUNK_SIZE) || 32));
const CRM_DUPLICATE_WARNING_TEXT = "Эта аудитория уже получала похожую рассылку сегодня.";

async function redisCursorReadPipeline(commands, options = {}) {
  const list = Array.isArray(commands) ? commands : [];
  const reads = new Map();
  return Promise.all(list.map(async (command) => {
    const signature = JSON.stringify(command || []);
    if (reads.has(signature)) return await reads.get(signature);
    const read = (async () => {
    const op = String(command && command[0] || "").toUpperCase();
    const key = command && command[1];
    if (op === "HGETALL") {
      const result = await hscanall(key, { count: 400, context: options.context || "crm.cursor-hash" });
      return { result };
    }
    if (op === "SMEMBERS") {
      const result = await sscanall(key, { count: 400, context: options.context || "crm.cursor-set" });
      return { result };
    }
    const rows = await redisPipeline([command], options);
    return rows && rows[0] ? rows[0] : { result: null };
    })();
    reads.set(signature, read);
    return await read;
  }));
}
const CRM_DEFAULT_MINI_APP_URL = "https://t.me/Poker_dvatuza_bot/DvaTuza";
const crmGetCache = new Map();
let crmScopedBaseCache = { at: 0, data: null, promise: null };
let crmPublicLevelsCache = null;
let crmPublicBirthdaysCache = null;
const CRM_MANAGER_DIALOGS = [
  { key: "anna", label: "Диалогов у Ани", id: "tg_2144406710" },
  { key: "vika", label: "Диалогов у Вики", id: "tg_1897001087" },
];

function decodeTelegramPreviewHtml(value) {
  return String(value || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(?:p|div|li|blockquote)>/gi, "\n")
    .replace(/<(?:p|div|li|blockquote)\b[^>]*>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code) || 0))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16) || 0))
    .replace(/&(amp|lt|gt|quot|apos|nbsp);/gi, (_, name) => ({
      amp: "&", lt: "<", gt: ">", quot: "\"", apos: "'", nbsp: " ",
    })[String(name).toLowerCase()] || "")
    .trim();
}

async function fetchWithCrmTimeout(url, options, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), Math.max(1000, Number(timeoutMs) || 8000));
  try {
    return await fetch(url, { ...(options || {}), signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function readLatestPublicChannelPost() {
  if (!CRM_CHANNEL_USERNAME || typeof fetch !== "function") return null;
  const previewUrl = "https://t.me/s/" + encodeURIComponent(CRM_CHANNEL_USERNAME);
  const response = await fetchWithCrmTimeout(previewUrl, {
    headers: { "user-agent": "Mozilla/5.0 (compatible; DvaTuzaCRM/1.0)" },
  }, 8000);
  if (!response.ok) throw new Error("Telegram preview HTTP " + response.status);
  const html = await response.text();
  const postPattern = /data-post=["']([^/"']+)\/(\d+)["']/gi;
  let match;
  const posts = [];
  while ((match = postPattern.exec(html))) {
    posts.push({ username: match[1], messageId: Number(match[2]), start: match.index });
  }
  const latest = posts.reduce((best, item) => !best || item.messageId > best.messageId ? item : best, null);
  if (!latest) return null;
  const nextPost = posts.filter((item) => item.start > latest.start).sort((a, b) => a.start - b.start)[0];
  const block = html.slice(latest.start, nextPost ? nextPost.start : html.length);
  // В ответе на другой пост Telegram сначала рендерит js-message_reply_text.
  // Нужен именно собственный текст последней публикации, иначе CRM вставляет цитату старого поста.
  const textMatch = block.match(/<div[^>]*class=["'][^"']*\bjs-message_text\b[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
  const photoMatch =
    block.match(/\btgme_widget_message_(?:photo_wrap|grouped_layer)\b[\s\S]{0,1600}?background-image\s*:\s*url\(\s*(?:&quot;|["'])(.*?)(?:&quot;|["'])\s*\)/i) ||
    block.match(/background-image\s*:\s*url\(\s*(?:&quot;|["'])(https:\/\/[^"'()]+)(?:&quot;|["'])\s*\)/i);
  const dateMatch = block.match(/<time[^>]+datetime=["']([^"']+)["']/i);
  const post = {
    chatUsername: "@" + latest.username,
    messageId: latest.messageId,
    text: decodeTelegramPreviewHtml(textMatch && textMatch[1]),
    date: String(dateMatch && dateMatch[1] || ""),
    source: "public_preview",
  };
  const photoUrl = decodeTelegramPreviewHtml(photoMatch && photoMatch[1]);
  if (photoUrl && /^https:\/\//i.test(photoUrl)) {
    try {
      const photoResponse = await fetchWithCrmTimeout(photoUrl, {
        headers: { "user-agent": "Mozilla/5.0 (compatible; DvaTuzaCRM/1.0)" },
      }, 8000);
      const contentType = String(photoResponse.headers.get("content-type") || "image/jpeg").split(";")[0];
      const contentLength = Number(photoResponse.headers.get("content-length")) || 0;
      if (photoResponse.ok && /^image\//i.test(contentType) && contentLength <= 5 * 1024 * 1024) {
        const bytes = Buffer.from(await photoResponse.arrayBuffer());
        if (bytes.length <= 5 * 1024 * 1024) {
          post.photoDataUrl = "data:" + contentType + ";base64," + bytes.toString("base64");
          post.photoMimeType = contentType;
          post.photoSize = bytes.length;
        }
      }
    } catch (error) {
      logCrmIssue("latest public channel photo", error);
    }
  }
  return post.text || post.photoDataUrl ? post : null;
}
const { safeComputeChatStats, countGeneralMessagesByDay } = createPlayerCrmChatStats({
  redisPipeline,
  generalKey: GENERAL_KEY,
  chatGroupMsgPrefix: CHAT_GROUP_MSG_PREFIX,
  managerDialogs: CRM_MANAGER_DIALOGS,
});

function crmErrorText(error) {
  if (!error) return "unknown";
  if (typeof error === "string") return error;
  if (error.message) return String(error.message);
  if (error.error || error.context) return [error.context, error.error, error.message].filter(Boolean).join(": ");
  return String(error);
}

function crmPublicErrorDetail(error) {
  return crmErrorText(error).replace(/\s+/g, " ").slice(0, 220);
}

function logCrmIssue(label, error) {
  console.error("[player-crm] " + label, error && error.stack ? error.stack : error);
}

async function optionalCrmStep(label, fallback, fn, warnings) {
  try {
    return await fn();
  } catch (error) {
    if (Array.isArray(warnings)) warnings.push(label);
    logCrmIssue(label + " failed", error);
    return fallback;
  }
}

function crmCacheKey(options) {
  const src = options && typeof options === "object" ? options : {};
  return JSON.stringify({
    mode: src.mode || "full",
    period: src.period || "",
    from: src.range && src.range.from ? src.range.from : "",
    to: src.range && src.range.to ? src.range.to : "",
    chartPeriod: src.chartPeriod || "",
    chartFrom: src.chartRange && src.chartRange.from ? src.chartRange.from : "",
    chartTo: src.chartRange && src.chartRange.to ? src.chartRange.to : "",
  });
}

function pruneCrmGetCache(now) {
  for (const [key, entry] of crmGetCache.entries()) {
    if (!entry || now - (entry.at || 0) > (entry.ttl || CRM_GET_CACHE_TTL_MS)) crmGetCache.delete(key);
  }
  while (crmGetCache.size > CRM_GET_CACHE_MAX) {
    const first = crmGetCache.keys().next().value;
    if (!first) break;
    crmGetCache.delete(first);
  }
}

async function buildCachedRealPlayers(options) {
  const now = Date.now();
  pruneCrmGetCache(now);
  const key = crmCacheKey(options);
  const mode = String(options && options.mode || "full").trim();
  const ttl = mode === "players" || mode === "send" ? CRM_PLAYERS_CACHE_TTL_MS : CRM_GET_CACHE_TTL_MS;
  const hit = crmGetCache.get(key);
  if (hit && now - hit.at <= (hit.ttl || ttl)) {
    return hit.promise ? await hit.promise : hit.data;
  }
  const entry = {
    at: now,
    ttl,
    data: null,
    promise: null,
  };
  entry.promise = buildRealPlayers(options)
    .then((data) => {
      entry.at = Date.now();
      entry.data = data;
      entry.promise = null;
      return data;
    })
    .catch((error) => {
      crmGetCache.delete(key);
      throw error;
    });
  crmGetCache.set(key, entry);
  pruneCrmGetCache(now);
  return await entry.promise;
}

function clearCrmGetCache() {
  crmGetCache.clear();
  crmScopedBaseCache = { at: 0, data: null, promise: null };
  crmPublicLevelsCache = null;
  if (redisConfigured()) {
    redisPipeline([["DEL", CRM_PUBLIC_LEVELS_REDIS_CACHE_KEY]], { timeoutMs: 2500 }).catch(() => {});
  }
}

async function readCrmBaseCommands(commands, options, shared) {
  if (!shared) return await redisCursorReadPipeline(commands, options);
  const now = Date.now();
  if (crmScopedBaseCache.data && now - crmScopedBaseCache.at < 10000) return crmScopedBaseCache.data;
  if (crmScopedBaseCache.promise) return await crmScopedBaseCache.promise;
  crmScopedBaseCache.promise = redisCursorReadPipeline(commands, options)
    .then((data) => {
      crmScopedBaseCache = { at: Date.now(), data, promise: null };
      return data;
    })
    .catch((error) => {
      crmScopedBaseCache = { at: 0, data: null, promise: null };
      throw error;
    });
  return await crmScopedBaseCache.promise;
}

async function readPublicPokerLevelRowsCache() {
  if (!redisConfigured()) return null;
  try {
    const cached = await redisPipeline([["GET", CRM_PUBLIC_LEVELS_REDIS_CACHE_KEY]], { timeoutMs: 2500 });
    const raw = cached && cached[0] && cached[0].result;
    if (!raw) return null;
    const parsed = typeof raw === "object" ? raw : JSON.parse(String(raw));
    return parsed && Array.isArray(parsed.rows) ? parsed.rows : null;
  } catch (eReadPublicLevelsCache) {
    return null;
  }
}

async function writePublicPokerLevelRowsCache(rows) {
  if (!redisConfigured()) return;
  try {
    await redisPipeline([
      [
        "SET",
        CRM_PUBLIC_LEVELS_REDIS_CACHE_KEY,
        JSON.stringify({ cachedAt: nowIso(), rows: Array.isArray(rows) ? rows : [] }),
        "EX",
        String(Math.max(5, Math.floor(CRM_PUBLIC_LEVELS_CACHE_TTL_MS / 1000))),
      ],
    ], { timeoutMs: 2500 });
  } catch (eWritePublicLevelsCache) {}
}

async function buildCachedPublicPokerLevelRows() {
  const now = Date.now();
  if (crmPublicLevelsCache && now - crmPublicLevelsCache.at <= CRM_PUBLIC_LEVELS_CACHE_TTL_MS) {
    if (crmPublicLevelsCache.promise) return await crmPublicLevelsCache.promise;
    return crmPublicLevelsCache.rows;
  }
  const entry = {
    at: now,
    rows: null,
    promise: null,
  };
  entry.promise = (async () => {
    const cachedRows = await readPublicPokerLevelRowsCache();
    if (cachedRows) return cachedRows;
    const rows = await buildPublicPokerLevelRows();
    await writePublicPokerLevelRowsCache(rows);
    return rows;
  })()
    .then((rows) => {
      entry.at = Date.now();
      entry.rows = Array.isArray(rows) ? rows : [];
      entry.promise = null;
      return entry.rows;
    })
    .catch((error) => {
      if (crmPublicLevelsCache === entry) crmPublicLevelsCache = null;
      throw error;
    });
  crmPublicLevelsCache = entry;
  return await entry.promise;
}

async function buildPublicBirthdayRows() {
  if (!redisConfigured()) return [];
  const results = await redisCursorReadPipeline([
    ["HGETALL", DT_IDS_HASH],
    ["HGETALL", USERNAMES_HASH],
    ["HGETALL", DISPLAY_NAMES_HASH],
    ["HGETALL", POKERPLUS_BIND_HASH],
    ["HGETALL", POKERPLUS_PROFILE_HASH],
    ["HGETALL", PROFILE_BIRTH_DATE_KEY],
  ], { timeoutMs: 10000 });
  const dtIds = hashPairsToObject(results && results[0] && results[0].result);
  const usernames = hashPairsToObject(results && results[1] && results[1].result);
  const displayNames = hashPairsToObject(results && results[2] && results[2].result);
  const pokerplusBind = hashPairsToObject(results && results[3] && results[3].result);
  const pokerplusProfiles = hashPairsToObject(results && results[4] && results[4].result);
  const profileBirthDates = hashPairsToObject(results && results[5] && results[5].result);

  function canonicalAccountId(rawId) {
    const raw = String(rawId || "").trim();
    if (!raw) return "";
    const telegramId = /^\d+$/.test(raw) ? "tg_" + raw : raw;
    return String(dtIds[raw] || dtIds[telegramId] || raw).trim();
  }

  const pokerLinks = Object.create(null);
  Object.keys(pokerplusBind).forEach((rawId) => {
    const accountId = canonicalAccountId(rawId);
    if (!accountId) return;
    const profile = parseProfile(pokerplusProfiles[rawId] || pokerplusProfiles[accountId]);
    const nickname = String((profile && (profile.nickname || profile.Nike || profile.nick)) || "").trim();
    const p21Id = String(pokerplusBind[rawId] || pokerplusBind[accountId] || "").trim();
    if (p21Id && nickname) pokerLinks[accountId] = { p21Id, nickname };
  });

  const byAccount = new Map();
  Object.keys(profileBirthDates).forEach((rawId) => {
    const profileBirthDate = String(profileBirthDates[rawId] || "").trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(profileBirthDate)) return;
    const accountId = canonicalAccountId(rawId);
    if (!accountId) return;
    const pokerLink = pokerLinks[accountId];
    // The public club calendar only contains verified Poker21 players.
    // Never expose an internal app id as a substitute for a player nickname.
    if (!pokerLink) return;
    const raw = String(rawId || "").trim();
    const telegramKey = /^\d+$/.test(raw) ? "tg_" + raw : raw;
    const username = String(usernames[raw] || usernames[telegramKey] || "").replace(/^@+/, "").trim();
    const existing = byAccount.get(accountId);
    if (!existing || raw === accountId) {
      byAccount.set(accountId, {
        accountId,
        p21Id: pokerLink.p21Id,
        pokerPlusNickname: pokerLink.nickname,
        name: pokerLink.nickname,
        telegram: username ? "@" + username : "",
        profileBirthDate,
      });
    }
  });
  return Array.from(byAccount.values());
}

async function buildCachedPublicBirthdayRows() {
  const now = Date.now();
  if (crmPublicBirthdaysCache && now - crmPublicBirthdaysCache.at <= CRM_PUBLIC_LEVELS_CACHE_TTL_MS) {
    if (crmPublicBirthdaysCache.promise) return await crmPublicBirthdaysCache.promise;
    return crmPublicBirthdaysCache.rows;
  }
  const entry = { at: now, rows: null, promise: null };
  entry.promise = buildPublicBirthdayRows()
    .then((rows) => {
      entry.at = Date.now();
      entry.rows = Array.isArray(rows) ? rows : [];
      entry.promise = null;
      return entry.rows;
    })
    .catch((error) => {
      if (crmPublicBirthdaysCache === entry) crmPublicBirthdaysCache = null;
      throw error;
    });
  crmPublicBirthdaysCache = entry;
  return await entry.promise;
}

function setShortPublicCacheHeaders(res, seconds) {
  if (!res || typeof res.setHeader !== "function") return;
  const ttl = Math.max(5, Number(seconds) || 30);
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=" + ttl + ", stale-while-revalidate=" + ttl);
}

function profileTotal(profile) {
  if (!profile || typeof profile !== "object") return {};
  if (profile.totalCounter && typeof profile.totalCounter === "object") return profile.totalCounter;
  if (profile.total_counter && typeof profile.total_counter === "object") return profile.total_counter;
  return {};
}

function parseProfile(raw) {
  const p = safeJson(raw, null);
  return p && typeof p === "object" ? p : null;
}

function makeEmptyPlayer(accountId) {
  return {
    id: accountId,
    accountId,
    runtimeIds: [],
    telegramIds: [],
    dtId: /^ID\d{6}$/.test(accountId) ? accountId : "",
    name: accountId,
    handle: "",
    tags: [],
    source: "База",
    manager: "",
    lastGameDays: 999,
    lastDepositDays: 999,
    lastMessageDays: 999,
    lastReplyDays: 999,
    trend: "нет данных",
    deposits: { 7: 0, 30: 0, 90: 0, all: 0, custom: 0 },
    depositCount: { 7: 0, 30: 0, 90: 0, all: 0, custom: 0 },
    messages: { 7: 0, 30: 0, 90: 0, all: 0, custom: 0 },
    botOpenRate: 0,
    pushOpenRate: 0,
    note: "",
    timeline: [],
    crm: {},
    channels: {
      bot: false,
      push: false,
      gazette: false,
      rating: false,
      raffle: false,
    },
    firstSeenAt: "",
    registeredAt: "",
    botSubscribedAt: "",
    pushSubscribedAt: "",
    botUnsubscribedAt: "",
    pushUnsubscribedAt: "",
    pokerPlusLinkedAt: "",
    pokerPlusUnlinkedAt: "",
    totals: {
      visits: 0,
      fee: null,
      hands: null,
      winnings: null,
    },
  };
}

function ensurePlayer(map, accountId) {
  const id = String(accountId || "").trim();
  if (!id) return null;
  if (!map.has(id)) map.set(id, makeEmptyPlayer(id));
  return map.get(id);
}

function eventInDays(event, days) {
  const ms = Date.parse(String(event && event.at ? event.at : ""));
  if (!Number.isFinite(ms)) return false;
  return Date.now() - ms <= days * 86400000;
}

function applyEvents(player, events, range, rangeKey) {
  const list = (Array.isArray(events) ? events : []).filter((ev) => ev && ev.type !== "game");
  const allDeposits = list.filter((ev) => ev.type === "deposit");
  player.depositCount.all += allDeposits.length;
  player.deposits.all += allDeposits.reduce((sum, ev) => sum + (Number(ev.amount) || 0), 0);
  player.messages.all += list.filter((ev) => ev.type === "message").length;
  const periods = [7, 30, 90];
  periods.forEach((days) => {
    const inRange = list.filter((ev) => eventInDays(ev, days));
    const depEvents = inRange.filter((ev) => ev.type === "deposit");
    player.depositCount[String(days)] += depEvents.length;
    player.deposits[String(days)] += depEvents.reduce((sum, ev) => sum + (Number(ev.amount) || 0), 0);
    player.messages[String(days)] += inRange.filter((ev) => ev.type === "message").length;
  });
  if (range) {
    const inRange = list.filter((ev) => eventInRange(ev, range));
    const depEvents = inRange.filter((ev) => ev.type === "deposit");
    const key = rangeKey || "custom";
    if (player.depositCount[key] == null) player.depositCount[key] = 0;
    if (player.deposits[key] == null) player.deposits[key] = 0;
    if (player.messages[key] == null) player.messages[key] = 0;
    player.depositCount[key] += depEvents.length;
    player.deposits[key] += depEvents.reduce((sum, ev) => sum + (Number(ev.amount) || 0), 0);
    player.messages[key] += inRange.filter((ev) => ev.type === "message").length;
  }
  const lastDeposit = list.filter((ev) => ev.type === "deposit").sort((a, b) => Date.parse(b.at || "") - Date.parse(a.at || ""))[0];
  if (lastDeposit) player.lastDepositDays = Math.min(player.lastDepositDays, daysAgoFromIso(lastDeposit.at));
  list.slice(0, 4).forEach((ev) => {
    const amount = ev.amount ? " · " + Number(ev.amount).toLocaleString("ru-RU") + " ₽" : "";
    player.timeline.push((ev.at ? new Date(ev.at).toLocaleDateString("ru-RU") : "дата?") + " · " + eventLabel(ev.type) + amount + (ev.note ? " · " + ev.note : ""));
  });
}

function campaignAudienceIdsFromRecord(campaign) {
  if (!campaign || typeof campaign !== "object") return [];
  return unique([]
    .concat(Array.isArray(campaign.allIds) ? campaign.allIds : [])
    .concat(Array.isArray(campaign.sentIds) ? campaign.sentIds : [])
    .concat(Array.isArray(campaign.failedIds) ? campaign.failedIds : [])
    .concat(Array.isArray(campaign.pendingIds) ? campaign.pendingIds : [])
    .concat(Array.isArray(campaign.deliveryLog) ? campaign.deliveryLog.map((row) => row && row.userId) : [])
    .map((id) => String(id || "").trim())
    .filter(Boolean));
}

function computeCampaignOutcomeMetrics(campaign, eventsByAccount, registeredAccounts) {
  const ids = campaignAudienceIdsFromRecord(campaign);
  const createdMs = Date.parse(String(campaign && campaign.createdAt || ""));
  if (!ids.length || !Number.isFinite(createdMs)) {
    return { postCampaignDeposits: 0, postCampaignDepositUsers: 0, postCampaignRegistrations: 0 };
  }
  const idSet = new Set(ids);
  let postCampaignDeposits = 0;
  let postCampaignDepositUsers = 0;
  let postCampaignDepositAmount = 0;
  ids.forEach((id) => {
    const events = Array.isArray(eventsByAccount && eventsByAccount[id]) ? eventsByAccount[id] : [];
    let userDeposited = false;
    events.forEach((ev) => {
      if (!ev || ev.type !== "deposit") return;
      const at = Date.parse(String(ev.at || ev.createdAt || ""));
      if (!Number.isFinite(at) || at < createdMs) return;
      postCampaignDeposits += 1;
      postCampaignDepositAmount += Number(ev.amount) || 0;
      userDeposited = true;
    });
    if (userDeposited) postCampaignDepositUsers += 1;
  });
  const postCampaignRegistrations = (Array.isArray(registeredAccounts) ? registeredAccounts : []).filter((row) => {
    const accountId = String(row && row.accountId || "").trim();
    const linkedAt = Date.parse(String(row && row.linkedAt || ""));
    return accountId && idSet.has(accountId) && Number.isFinite(linkedAt) && linkedAt >= createdMs;
  }).length;
  return { postCampaignDeposits, postCampaignDepositUsers, postCampaignDepositAmount, postCampaignRegistrations };
}

function eventLabel(type) {
  if (type === "deposit") return "депозит";
  if (type === "message") return "сообщение";
  return "событие";
}

function touchLabel(touch) {
  const channel = touch && touch.channel ? String(touch.channel) : "касание";
  const segment = touch && touch.segment ? " · " + String(touch.segment) : "";
  return "CRM " + channel + segment;
}

async function getLinkedCrmEmail(memberId) {
  try {
    const dtId = await getDtIdByUserId(memberId);
    return normalizeCrmEmail(dtId && (await getLinkedEmailOriginalByDtId(dtId)));
  } catch (error) {
    logCrmIssue("linked email lookup failed", error);
    return "";
  }
}

async function crmPermissions(memberId, identity) {
  const id = normalizeTgId(memberId);
  const email = normalizeCrmEmail(identity && identity.email);
  const linkedEmail = await getLinkedCrmEmail(memberId);
  const username = String((identity && (identity.telegramUsername || identity.pwaUsername || identity.username)) || "")
    .replace(/^@+/, "")
    .trim()
    .toLowerCase();
  const member = normalizeTgId(memberId);
  const owner =
    CRM_OWNER_IDS.includes(id) ||
    CRM_ALLOWED_MEMBER_IDS.has(member) ||
    CRM_ALLOWED_USERNAMES.has(username) ||
    CRM_ALLOWED_EMAILS.has(email) ||
    CRM_ALLOWED_EMAILS.has(linkedEmail);
  return {
    role: owner ? "owner" : "manager",
    canEditPlayers: true,
    canImportEvents: owner,
    canSendCampaign: owner,
    touchMinHours: CRM_TOUCH_MIN_HOURS,
  };
}

async function isCrmAllowedIdentity(identity, memberId) {
  const member = normalizeTgId(memberId);
  if (CRM_ALLOWED_MEMBER_IDS.has(member)) return true;
  const username = String((identity && (identity.telegramUsername || identity.pwaUsername || identity.username)) || "")
    .replace(/^@+/, "")
    .trim()
    .toLowerCase();
  if (CRM_ALLOWED_USERNAMES.has(username)) return true;
  const email = normalizeCrmEmail(identity && identity.email);
  if (CRM_ALLOWED_EMAILS.has(email)) return true;
  const linkedEmail = await getLinkedCrmEmail(memberId);
  return CRM_ALLOWED_EMAILS.has(linkedEmail);
}

function inferTags(player) {
  const tags = new Set(player.crm && Array.isArray(player.crm.tags) ? player.crm.tags : []);
  if (player.totals.fee != null && player.totals.fee >= 100000) tags.add("VIP");
  if (player.channels.rating) tags.add("рейтинг");
  if (player.channels.raffle) tags.add("розыгрыши");
  if (player.channels.gazette) tags.add("газета");
  if (player.channels.push) tags.add("push");
  if (player.deposits["30"] <= 0) tags.add("без депозита");
  return [...tags].slice(0, 8);
}

function sortPlayers(players) {
  return players.sort((a, b) => {
    const av = Number(a.deposits["30"] || 0) + Number(a.totals.fee || 0) + Number(a.totals.visits || 0);
    const bv = Number(b.deposits["30"] || 0) + Number(b.totals.fee || 0) + Number(b.totals.visits || 0);
    return bv - av;
  });
}

function publicPlayer(player) {
  const p = { ...player };
  delete p.status;
  if (p.crm && typeof p.crm === "object") {
    p.crm = { ...p.crm };
    delete p.crm.status;
  }
  p.runtimeIds = unique(p.runtimeIds).slice(0, 8);
  p.telegramIds = unique(p.telegramIds).slice(0, 4);
  p.tags = unique(p.tags).slice(0, 8);
  p.timeline = unique(p.timeline).slice(0, 8);
  p.touches = Array.isArray(p.touches) ? p.touches.slice(0, 8) : [];
  ["lastGameDays", "lastDepositDays", "lastMessageDays", "lastReplyDays", "lastTouchDays"].forEach((key) => {
    if (p[key] == null || Number(p[key]) >= 999) p[key] = null;
  });
  delete p.lastGameDays;
  delete p.games;
  return p;
}

function buildRegisteredAccounts(ctx) {
  const dtIds = ctx && ctx.dtIds ? ctx.dtIds : {};
  const usernames = ctx && ctx.usernames ? ctx.usernames : {};
  const displayNames = ctx && ctx.displayNames ? ctx.displayNames : {};
  const emailLinks = ctx && ctx.emailLinks ? ctx.emailLinks : {};
  const emailOriginals = ctx && ctx.emailOriginals ? ctx.emailOriginals : {};
  const emailLinkedAt = ctx && ctx.emailLinkedAt ? ctx.emailLinkedAt : {};
  const telegramLoginAt = ctx && ctx.telegramLoginAt ? ctx.telegramLoginAt : {};
  const referralReferrers = ctx && ctx.referralReferrers ? ctx.referralReferrers : {};
  const referralAt = ctx && ctx.referralAt ? ctx.referralAt : {};
  const referralSources = ctx && ctx.referralSources ? ctx.referralSources : {};
  const map = new Map();

  function ensure(accountId) {
    const id = String(accountId || "").trim();
    if (!id) return null;
    if (!map.has(id)) {
      map.set(id, {
        accountId: id,
        dtId: /^ID\d{6}$/.test(id) ? id : "",
        methods: [],
        email: "",
        emailLinkedAt: "",
        telegramIds: [],
        telegramUsername: "",
        telegramLinkedAt: "",
        linkedAt: "",
        name: displayNames[id] ? String(displayNames[id]).trim() : "",
        invitedBy: "",
        invitedByName: "",
        invitedAt: "",
        inviteSource: "",
      });
    }
    return map.get(id);
  }

  Object.keys(emailLinks).forEach((email) => {
    const accountId = String(emailLinks[email] || "").trim();
    const row = ensure(accountId);
    if (!row) return;
    row.email = String(emailOriginals[accountId] || email).trim();
    row.emailLinkedAt = isoFromMs(emailLinkedAt[accountId]) || row.emailLinkedAt || "";
    if (!row.methods.includes("email")) row.methods.push("email");
  });

  Object.keys(dtIds).forEach((runtimeId) => {
    if (!String(runtimeId).startsWith("tg_")) return;
    const accountId = String(dtIds[runtimeId] || "").trim();
    const row = ensure(accountId);
    if (!row) return;
    row.telegramIds.push(String(runtimeId));
    if (!row.methods.includes("telegram")) row.methods.push("telegram");
    row.telegramLinkedAt = isoFromMs(telegramLoginAt[accountId]) || isoFromMs(telegramLoginAt[runtimeId]) || row.telegramLinkedAt || "";
    const username = usernames[runtimeId] ? String(usernames[runtimeId]).replace(/^@+/, "").trim() : "";
    if (username && !row.telegramUsername) row.telegramUsername = "@" + username;
    if (!row.name && displayNames[runtimeId]) row.name = String(displayNames[runtimeId]).trim();
  });

  Object.keys(referralReferrers).forEach((accountId) => {
    const row = ensure(accountId);
    if (!row) return;
    const invitedBy = String(referralReferrers[accountId] || "").trim();
    if (!/^ID\d{6}$/.test(invitedBy)) return;
    row.invitedBy = invitedBy;
    row.invitedByName = String(displayNames[invitedBy] || invitedBy).trim();
    row.invitedAt = isoFromMs(referralAt[accountId]) || "";
    row.inviteSource = String(referralSources[accountId] || "").trim();
  });

  return [...map.values()]
    .map((row) => ({
      ...row,
      telegramIds: unique(row.telegramIds).slice(0, 4),
      methods: unique(row.methods),
      linkedAt: earliestIso([row.emailLinkedAt, row.telegramLinkedAt]),
      name: row.name || row.telegramUsername || row.email || row.accountId,
    }))
    .filter((row) => row.methods.length)
    .sort((a, b) => {
      const av = String(a.name || a.email || a.accountId).toLowerCase();
      const bv = String(b.name || b.email || b.accountId).toLowerCase();
      return av.localeCompare(bv, "ru");
    });
}

function buildPokerPlusAccounts(ctx) {
  const bind = ctx && ctx.pokerplusBind ? ctx.pokerplusBind : {};
  const profiles = ctx && ctx.pokerplusProfiles ? ctx.pokerplusProfiles : {};
  const boundAt = ctx && ctx.pokerplusBoundAt ? ctx.pokerplusBoundAt : {};
  const syncedAt = ctx && ctx.pokerplusSyncedAt ? ctx.pokerplusSyncedAt : {};
  const displayNames = ctx && ctx.displayNames ? ctx.displayNames : {};
  return Object.keys(bind)
    .map((accountId) => {
      const profile = parseProfile(profiles[accountId]);
      const total = profileTotal(profile);
      const fee = Number(total.fee);
      const status = pokerProfileStatusFromCachedProfile(profile, { pokerPlusLinked: true });
      const level = status && Number.isFinite(Number(status.level)) ? Math.trunc(Number(status.level)) : 0;
      const linkedAt = isoFromMs(boundAt[accountId]);
      return {
        accountId,
        pokerPlusUserId: String(bind[accountId] || "").trim(),
        nickname: String((profile && profile.nickname) || displayNames[accountId] || accountId).trim(),
        email: String((profile && profile.email) || "").trim(),
        level,
        statusPoints: status && Number.isFinite(Number(status.points)) ? Number(status.points) : 0,
        fee: Number.isFinite(fee) ? fee : 0,
        hands: Number(total.hands) || 0,
        lastLoginDate: String((profile && profile.lastLoginDate) || "").trim(),
        linkedAt,
        syncedAt: isoFromMs(syncedAt[accountId]),
        linkedAtSource: boundAt[accountId] ? "bind" : "",
      };
    })
    .filter((row) => row.pokerPlusUserId)
    .sort((a, b) => b.level - a.level || b.statusPoints - a.statusPoints || b.fee - a.fee || String(a.nickname).localeCompare(String(b.nickname), "ru"));
}

function betterPublicPokerLevelRow(a, b) {
  if (!a) return b;
  if (!b) return a;
  const aSynced = Date.parse(String(a.syncedAt || "")) || 0;
  const bSynced = Date.parse(String(b.syncedAt || "")) || 0;
  const aLinked = Date.parse(String(a.linkedAt || "")) || 0;
  const bLinked = Date.parse(String(b.linkedAt || "")) || 0;
  if (Number(b.level) !== Number(a.level)) return Number(b.level) > Number(a.level) ? b : a;
  if (Number(b.statusPoints) !== Number(a.statusPoints)) return Number(b.statusPoints) > Number(a.statusPoints) ? b : a;
  if (bSynced !== aSynced) return bSynced > aSynced ? b : a;
  if (Number(b.fee) !== Number(a.fee)) return Number(b.fee) > Number(a.fee) ? b : a;
  if (bLinked !== aLinked) return bLinked > aLinked ? b : a;
  return String(b.accountId || "").localeCompare(String(a.accountId || ""), "ru") < 0 ? b : a;
}

function uniquePublicPokerLevelAccounts(rows) {
  const byPokerPlusId = new Map();
  (Array.isArray(rows) ? rows : []).forEach((row) => {
    const pokerPlusUserId = String(row && row.pokerPlusUserId || "").trim();
    if (!pokerPlusUserId) return;
    byPokerPlusId.set(pokerPlusUserId, betterPublicPokerLevelRow(byPokerPlusId.get(pokerPlusUserId), row));
  });
  return Array.from(byPokerPlusId.values());
}

function publicLevelLooksLikeTelegramName(raw, telegramUsername) {
  const text = String(raw || "").trim();
  if (!text) return false;
  const user = String(telegramUsername || "").trim().replace(/^@+/, "").toLowerCase();
  if (text.charAt(0) === "@") return true;
  return !!(user && text.replace(/^@+/, "").toLowerCase() === user);
}

async function buildPublicPokerLevelRows() {
  if (!redisConfigured()) return [];
  const results = await redisCursorReadPipeline([
    ["HGETALL", DT_IDS_HASH],
    ["HGETALL", USERNAMES_HASH],
    ["HGETALL", DISPLAY_NAMES_HASH],
    ["HGETALL", EMAIL_LINKS_HASH],
    ["HGETALL", EMAIL_ORIGINALS_HASH],
    ["HGETALL", EMAIL_LINKED_AT_HASH],
    ["HGETALL", TELEGRAM_LOGIN_AT_HASH],
    ["HGETALL", POKERPLUS_BIND_HASH],
    ["HGETALL", POKERPLUS_BIND_AT_HASH],
    ["HGETALL", POKERPLUS_PROFILE_HASH],
    ["HGETALL", POKERPLUS_SYNC_HASH],
    ["HGETALL", TELEGRAM_VISIBLE_HASH],
    ["HGETALL", PROFILE_BIRTH_DATE_KEY],
    ["HGETALL", PROFILE_CITY_KEY],
  ], { timeoutMs: 10000 });
  const dtIds = hashPairsToObject(results && results[0] && results[0].result);
  const usernames = hashPairsToObject(results && results[1] && results[1].result);
  const displayNames = hashPairsToObject(results && results[2] && results[2].result);
  const emailLinks = hashPairsToObject(results && results[3] && results[3].result);
  const emailOriginals = hashPairsToObject(results && results[4] && results[4].result);
  const emailLinkedAt = hashPairsToObject(results && results[5] && results[5].result);
  const telegramLoginAt = hashPairsToObject(results && results[6] && results[6].result);
  const pokerplusBind = hashPairsToObject(results && results[7] && results[7].result);
  const pokerplusBoundAt = hashPairsToObject(results && results[8] && results[8].result);
  const pokerplusProfiles = hashPairsToObject(results && results[9] && results[9].result);
  const pokerplusSyncedAt = hashPairsToObject(results && results[10] && results[10].result);
  const telegramVisible = hashPairsToObject(results && results[11] && results[11].result);
  const profileBirthDates = hashPairsToObject(results && results[12] && results[12].result);
  const profileCities = hashPairsToObject(results && results[13] && results[13].result);
  const registrations = buildRegisteredAccounts({ dtIds, usernames, displayNames, emailLinks, emailOriginals, emailLinkedAt, telegramLoginAt });
  const registeredByAccount = new Map(registrations.map((row) => [String(row.accountId || "").trim(), row]));
  const rows = uniquePublicPokerLevelAccounts(buildPokerPlusAccounts({ pokerplusBind, pokerplusProfiles, pokerplusSyncedAt, pokerplusBoundAt, displayNames }))
    .filter((row) => Number(row.level) > 0)
    .map((row) => {
      const accountId = String(row.accountId || "").trim();
      const reg = registeredByAccount.get(accountId) || null;
      const tgVisible = telegramVisible[accountId] === "1";
      const tg = reg && reg.telegramUsername ? String(reg.telegramUsername).replace(/^@?/, "@") : "";
      const regName = String((reg && reg.name) || "").trim();
      const publicName = !tgVisible && publicLevelLooksLikeTelegramName(regName, tg)
        ? String(row.nickname || accountId || "").trim()
        : regName;
      return {
        accountId,
        p21Id: String(row.pokerPlusUserId || "").trim(),
        pokerPlusNickname: String(row.nickname || "").trim(),
        name: String(row.nickname || publicName || accountId || "").trim(),
        telegram: tgVisible ? tg : "",
        profileBirthDate: /^\d{4}-\d{2}-\d{2}$/.test(String(profileBirthDates[accountId] || "")) ? String(profileBirthDates[accountId]) : "",
        profileCity: String(profileCities[accountId] || "").replace(/[\u0000-\u001f\u007f]/g, "").replace(/\s+/g, " ").trim().slice(0, 80),
        level: Number(row.level) || 0,
      };
    })
    .sort((a, b) => b.level - a.level || String(a.name).localeCompare(String(b.name), "ru"));
  const avatarIds = unique(rows.map((row) => String(row.accountId || "").trim()).filter(Boolean));
  if (avatarIds.length) {
    try {
      const avatarResults = await redisPipeline(avatarIds.map((id) => ["GET", AVATAR_PREFIX + id]), { timeoutMs: 6000 });
      const avatars = {};
      avatarIds.forEach((id, idx) => {
        const raw = avatarResults && avatarResults[idx] && avatarResults[idx].result;
        const avatar = raw != null ? String(raw).trim() : "";
        if (avatar) avatars[id] = avatar;
      });
      rows.forEach((row) => {
        row.avatarUrl = avatars[row.accountId] || "";
      });
    } catch (ePublicLevelAvatars) {}
  }
  const preferredProfileIds = await Promise.all(rows.map(async (row) => {
    try {
      return await getPreferredUserIdByDtId(String(row && row.accountId || "").trim());
    } catch (error) {
      return "";
    }
  }));
  rows.forEach((row, index) => {
    row.profileId = String(preferredProfileIds[index] || row.accountId || "").trim();
  });
  return rows;
}

async function readEventsForAccounts(accountIds) {
  const ids = accountIds.slice(0, 2500);
  if (!ids.length) return {};
  const results = await redisPipeline(ids.map((id) => ["LRANGE", CRM_EVENTS_PREFIX + id, "0", "99"]));
  const out = {};
  ids.forEach((id, idx) => {
    const raw = results && results[idx] && Array.isArray(results[idx].result) ? results[idx].result : [];
    out[id] = raw.map((line) => safeJson(line, null)).filter(Boolean);
  });
  return out;
}

async function readTouchesForAccounts(accountIds) {
  const ids = accountIds.slice(0, 2500);
  if (!ids.length) return {};
  const results = await redisPipeline(ids.map((id) => ["LRANGE", CRM_TOUCH_PREFIX + id, "0", "49"]));
  const out = {};
  ids.forEach((id, idx) => {
    const raw = results && results[idx] && Array.isArray(results[idx].result) ? results[idx].result : [];
    out[id] = raw.map((line) => safeJson(line, null)).filter(Boolean);
  });
  return out;
}

function applyTouches(player, touches) {
  const list = Array.isArray(touches) ? touches : [];
  player.touches = list;
  const last = list[0];
  player.lastTouchDays = last ? daysAgoFromIso(last.at || last.createdAt) : 999;
  list.slice(0, 4).forEach((touch) => {
    const at = touch.at || touch.createdAt;
    player.timeline.push((at ? new Date(at).toLocaleDateString("ru-RU") : "дата?") + " · " + touchLabel(touch));
  });
}

function crmPokerPlusWasActiveAt(player, boundary, inclusive) {
  const linked = Date.parse(String(player && player.pokerPlusLinkedAt || ""));
  const unlinked = Date.parse(String(player && player.pokerPlusUnlinkedAt || ""));
  const events = [];
  if (Number.isFinite(linked)) events.push({ time: linked, active: true });
  if (Number.isFinite(unlinked)) events.push({ time: unlinked, active: false });
  events.sort((a, b) => a.time - b.time);
  const currentActive = !!(player && player.pokerPlusUserId);
  if (!events.length || !boundary) return currentActive;
  const boundaryTime = Date.parse(String(boundary) + (inclusive ? "T23:59:59.999Z" : "T00:00:00.000Z"));
  if (!Number.isFinite(boundaryTime)) return currentActive;
  const before = events.filter((event) => event.time < boundaryTime || (inclusive && event.time === boundaryTime));
  if (before.length) return !!before[before.length - 1].active;
  return !events[0].active;
}

function crmPokerPlusBalanceDelta(players, from, to) {
  const rows = Array.isArray(players) ? players : [];
  const start = rows.filter((player) => crmPokerPlusWasActiveAt(player, from, false)).length;
  const end = rows.filter((player) => crmPokerPlusWasActiveAt(player, to, true)).length;
  return end - start;
}

function computeSourceAnalytics(players, rangeKey) {
  const map = new Map();
  const key = rangeKey || "30";
  players.forEach((p) => {
    const source = String(p.source || "Без источника").trim() || "Без источника";
    if (!map.has(source)) {
      map.set(source, {
        source,
        players: 0,
        bot: 0,
        push: 0,
        visits: 0,
        deposits30: 0,
        depositsPeriod: 0,
        fee: 0,
        pokerPlusLinked: 0,
      });
    }
    const row = map.get(source);
    row.players += 1;
    if (p.channels && p.channels.bot) row.bot += 1;
    if (p.channels && p.channels.push) row.push += 1;
    row.visits += Number(p.totals && p.totals.visits) || 0;
    row.deposits30 += Number(p.deposits && p.deposits["30"]) || 0;
    row.depositsPeriod += Number(p.deposits && p.deposits[key]) || 0;
    row.fee += Number(p.totals && p.totals.fee) || 0;
    if (p.pokerPlusUserId || (p.totals && p.totals.fee != null)) row.pokerPlusLinked += 1;
  });
  return [...map.values()].sort((a, b) => {
    const av = b.depositsPeriod + b.fee + b.players * 10;
    const bv = a.depositsPeriod + a.fee + a.players * 10;
    return av - bv;
  }).slice(0, 40);
}

async function computeChartAnalytics({ players, registeredAccounts, pokerPlusAccounts, eventsByAccount, range, rangeKey, visitDailySummary, exactAnalytics, excludeTraffic, includeGeneralMessages = true }) {
  let users = (visitDailySummary && visitDailySummary.userCounts) || {};
  let visitCounts = (visitDailySummary && visitDailySummary.visitCounts) || {};
  let newVisitors = (visitDailySummary && visitDailySummary.newCounts) || {};
  let registeredVisitors = {};
  let participations = {};
  if (exactAnalytics && exactAnalytics.available) {
    users = {};
    visitCounts = {};
    newVisitors = {};
    (Array.isArray(exactAnalytics.daily) ? exactAnalytics.daily : []).forEach((row) => {
      if (!row || !row.date) return;
      users[row.date] = Number(row.uniqueVisitors) || 0;
      visitCounts[row.date] = Number(row.sessions) || 0;
      newVisitors[row.date] = Number(row.newVisitors) || 0;
      registeredVisitors[row.date] = Number(row.registeredVisitors) || 0;
      participations[row.date] = Number(row.participations) || 0;
    });
  }
  const registrations = {};
  (Array.isArray(registeredAccounts) ? registeredAccounts : []).forEach((row) => {
    addDaily(registrations, dateKeyFromIso(row && row.linkedAt), 1);
  });
  const botSubs = {};
  (Array.isArray(players) ? players : []).forEach((row) => {
    if (row && row.channels && row.channels.bot) addDaily(botSubs, dateKeyFromIso(row.botSubscribedAt), 1);
  });
  const pushSubs = {};
  (Array.isArray(players) ? players : []).forEach((row) => {
    if (row && row.channels && row.channels.push) addDaily(pushSubs, dateKeyFromIso(row.pushSubscribedAt), 1);
  });
  const deposits = {};
  const depositAmounts = {};
  const crmMessages = {};
  Object.values(eventsByAccount || {}).forEach((events) => {
    (Array.isArray(events) ? events : []).forEach((ev) => {
      if (!ev) return;
      if (ev.type === "deposit") {
        addDaily(deposits, dateKeyFromIso(ev.at), 1);
        addDaily(depositAmounts, dateKeyFromIso(ev.at), Number(ev.amount) || 0);
      }
      if (ev.type === "message") addDaily(crmMessages, dateKeyFromIso(ev.at), 1);
    });
  });
  const poker21 = {};
  (Array.isArray(pokerPlusAccounts) ? pokerPlusAccounts : []).forEach((row) => {
    addDaily(poker21, dateKeyFromIso(row.linkedAt), 1);
  });
  const generalMessages = includeGeneralMessages ? await countGeneralMessagesByDay() : {};
  const datedKeys = Object.keys({ ...newVisitors, ...users, ...visitCounts, ...registeredVisitors, ...participations, ...registrations, ...botSubs, ...pushSubs, ...deposits, ...depositAmounts, ...crmMessages, ...poker21, ...generalMessages }).sort();
  const today = new Date().toISOString().slice(0, 10);
  let labels = [];
  if (range) {
    labels = dateKeysBetween(range.from, range.to);
  } else if (String(rangeKey || "") === "all" && datedKeys.length) {
    labels = dateKeysBetween(datedKeys[0], datedKeys[datedKeys.length - 1] || today);
  } else if (String(rangeKey || "") === "all") {
    labels = dateKeysBetween(rangeForPeriodKey("30").from, today);
  } else {
    labels = dateKeysBetween(rangeForPeriodKey(rangeKey || "30").from, today);
  }
  if (!labels.length) labels = [today];
  const allPlayers = Array.isArray(players) ? players.length : 0;
  const allRegistered = Array.isArray(registeredAccounts) ? registeredAccounts.length : 0;
  const bot = (players || []).filter((p) => p && p.channels && p.channels.bot).length;
  const push = (players || []).filter((p) => p && p.channels && p.channels.push).length;
  function dailySeries(key, label, map, total) {
    const datedTotal = mapTotal(map);
    return {
      key,
      label,
      mode: "daily",
      hasDates: datedTotal > 0,
      undatedTotal: Math.max(0, (Number(total) || 0) - datedTotal),
      values: labels.map((d) => Number(map[d]) || 0),
    };
  }
  const series = [
    ...(excludeTraffic ? [] : [
      dailySeries("visits", exactAnalytics && exactAnalytics.available ? "Сессий" : "Посещений", visitCounts, mapTotal(visitCounts)),
      dailySeries("users", "Уникальных посетителей", users, mapTotal(users)),
      dailySeries("players", "Новых посетителей", newVisitors, mapTotal(newVisitors)),
      ...(exactAnalytics && exactAnalytics.available ? [
        dailySeries("registeredVisitors", "Зарегистрированных посетителей", registeredVisitors, mapTotal(registeredVisitors)),
        dailySeries("participations", "Участий в активностях", participations, mapTotal(participations)),
      ] : []),
    ]),
    dailySeries("registrations", "Регистрации", registrations, allRegistered),
    dailySeries("poker21", "Poker21", poker21, mapTotal(poker21)),
    dailySeries("bot", "Новые подписки на бот", botSubs, bot),
    dailySeries("push", "Новые push-подписки", pushSubs, push),
    dailySeries("deposits", "Депозиты, шт.", deposits, mapTotal(deposits)),
    dailySeries("depositAmount", "Депозиты, ₽", depositAmounts, mapTotal(depositAmounts)),
    dailySeries("crmMessages", "CRM сообщения", crmMessages, mapTotal(crmMessages)),
    dailySeries("generalMessages", "Сообщения в главном чате", generalMessages, mapTotal(generalMessages)),
  ];
  const datedSeries = series.filter((s) => s.hasDates !== false);
  const summary = labels.map((date, idx) => {
    const row = { date, total: 0 };
    datedSeries.forEach((s) => {
      const value = Number((s.values || [])[idx]) || 0;
      row[s.key] = value;
      row.total += value;
    });
    return row;
  }).filter((row) => row.total > 0).reverse().slice(0, 60);
  const undated = {};
  series.filter((s) => s.hasDates === false).forEach((s) => {
    undated[s.key] = Number(s.undatedTotal) || 0;
  });
  return { labels, series, summary, undated };
}

function totalFromHashMap(map) {
  return Object.values(map || {}).reduce((sum, value) => sum + (Number(value) || 0), 0);
}

function dateKeyFromRedisKey(key, prefix) {
  const value = String(key || "");
  const raw = value.indexOf(prefix) === 0 ? value.slice(prefix.length) : "";
  return /^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : "";
}

async function readVisitDailyBounds() {
  const dates = [];
  async function scanPrefix(prefix) {
    let cursor = "0";
    for (let i = 0; i < 20; i += 1) {
      const results = await optionalCrmStep("visit-daily-bounds", null, () => redisPipeline([["SCAN", cursor, "MATCH", prefix + "*", "COUNT", "200"]], { timeoutMs: 9000 }), []);
      const result = results && results[0] && results[0].result;
      const keys = Array.isArray(result) && Array.isArray(result[1]) ? result[1] : [];
      keys.forEach((key) => {
        const dateKey = dateKeyFromRedisKey(key, prefix);
        if (dateKey) dates.push(dateKey);
      });
      cursor = Array.isArray(result) && result[0] != null ? String(result[0]) : "0";
      if (cursor === "0") break;
    }
  }
  await scanPrefix(VISITS_DAY_PREFIX);
  await scanPrefix(VISITORS_DAY_PREFIX);
  if (!dates.length) return null;
  dates.sort();
  return { firstTrackedDate: dates[0], lastTrackedDate: dates[dates.length - 1] };
}

function computeStatsSummary({ players, registeredAccounts, pokerPlusAccounts, range, rangeKey, visitDailySummary, activeAnonymousInstallations, analyticsSummary, pushSubscriptions }) {
  const key = rangeKey || (range && range.key) || "30";
  const allPlayers = Array.isArray(players) ? players : [];
  const eventDateInRange = (value) => !!value && crmDateInRange(value, range);
  const playerRows = allPlayers.filter((p) => crmDateInRange((p && (p.firstSeenAt || p.registeredAt)) || "", range));
  const registrationRows = (Array.isArray(registeredAccounts) ? registeredAccounts : []).filter((row) => crmDateInRange(row && row.linkedAt, range));
  const allPokerPlusRows = Array.isArray(pokerPlusAccounts) ? pokerPlusAccounts : [];
  const pokerPlusRows = uniquePublicPokerLevelAccounts(allPokerPlusRows.filter((row) => crmDateInRange(row && row.linkedAt, range)));
  const pokerPlusEventRows = allPlayers.filter((p) => p && eventDateInRange(p.pokerPlusLinkedAt));
  const uniquePokerPlusEventRows = uniquePublicPokerLevelAccounts(pokerPlusEventRows);
  const pokerPlusUnlinkedRows = allPlayers.filter((p) => p && eventDateInRange(p.pokerPlusUnlinkedAt));
  const botRows = allPlayers.filter((p) => p && eventDateInRange(p.botSubscribedAt));
  const pushRows = allPlayers.filter((p) => p && eventDateInRange(p.pushSubscribedAt));
  const botUnsubRows = allPlayers.filter((p) => p && eventDateInRange(p.botUnsubscribedAt));
  const pushUnsubRows = allPlayers.filter((p) => p && eventDateInRange(p.pushUnsubscribedAt));
  const deposits = allPlayers.reduce((sum, p) => sum + (Number(p && p.deposits && p.deposits[key]) || 0), 0);
  const depositCount = allPlayers.reduce((sum, p) => sum + (Number(p && p.depositCount && p.depositCount[key]) || 0), 0);
  function isActiveWithinDays(p, days) {
    if (!p) return false;
    const dayKey = String(days);
    const periodDeposits = Number(p.deposits && p.deposits[dayKey]) || 0;
    const periodMessages = Number(p.messages && p.messages[dayKey]) || 0;
    const lastMessageDays = Number(p.lastMessageDays);
    return periodDeposits > 0 || periodMessages > 0 || (Number.isFinite(lastMessageDays) && lastMessageDays <= days);
  }
  const current = {
    players: allPlayers.length,
    registered: Array.isArray(registeredAccounts) ? registeredAccounts.length : 0,
    pokerPlus: uniquePublicPokerLevelAccounts(allPokerPlusRows).length,
    botReach: allPlayers.filter((p) => p && p.channels && p.channels.bot).length,
    pushReach: allPlayers.filter((p) => p && p.channels && p.channels.push).length,
    pushSubscriptions: Math.max(0, Number(pushSubscriptions) || 0),
    active7: allPlayers.filter((p) => isActiveWithinDays(p, 7)).length,
    active30: allPlayers.filter((p) => isActiveWithinDays(p, 30)).length,
  };
  const visitRows = range ? playerRows : allPlayers;
  function isConfirmedAudiencePlayer(player) {
    return !!(
      player &&
      ((Array.isArray(player.telegramIds) && player.telegramIds.length) ||
        player.registeredAt ||
        player.pokerPlusUserId)
    );
  }
  const confirmedAudience = playerRows.filter(isConfirmedAudiencePlayer).length;
  const activeAnonymous = Math.max(0, Number(activeAnonymousInstallations) || 0);
  const dailyVisits = visitDailySummary && visitDailySummary.hasDailyData ? visitDailySummary.total : null;
  const dailyUnique = visitDailySummary && visitDailySummary.hasDailyData ? visitDailySummary.unique : null;
  const dailyNew = visitDailySummary && visitDailySummary.hasDailyData ? visitDailySummary.new : null;
  const hasVisitDailySummary = !!(range && visitDailySummary);
  const visitDailyIncomplete = !!(
    range &&
    visitDailySummary &&
    (
      !visitDailySummary.hasDailyData ||
      (visitDailySummary.firstTrackedDate && visitDailySummary.firstTrackedDate > range.from)
    )
  );
  const visitDailyUnavailableBeforeStart = !!(
    range &&
    visitDailySummary &&
    !visitDailySummary.hasDailyData &&
    visitDailySummary.globalFirstTrackedDate &&
    range.to < visitDailySummary.globalFirstTrackedDate
  );
  const visitsTotal = dailyVisits != null ? dailyVisits : hasVisitDailySummary ? 0 : visitRows.reduce((sum, p) => sum + (Number(p && p.totals && p.totals.visits) || 0), 0);
  const visitsUnique = dailyUnique != null ? dailyUnique : hasVisitDailySummary ? 0 : visitRows.length;
  const visitsNew = dailyNew != null ? dailyNew : hasVisitDailySummary ? 0 : allPlayers.filter((p) => crmDateInRange((p && p.firstSeenAt) || "", range)).length;
  const visitsRepeat = Math.max(0, visitsTotal - visitsUnique);
  const registrationCounts = registrationRows.reduce((acc, row) => {
    const methods = Array.isArray(row && row.methods) ? row.methods : [];
    const hasEmail = methods.includes("email");
    const hasTelegram = methods.includes("telegram");
    if (hasEmail && hasTelegram) acc.both += 1;
    else if (hasEmail) acc.email += 1;
    else if (hasTelegram) acc.telegram += 1;
    return acc;
  }, { telegram: 0, email: 0, both: 0 });
  const periodEventsTotal =
    visitsTotal +
    registrationRows.length +
    pokerPlusRows.length +
    botRows.length +
    pushRows.length +
    botUnsubRows.length +
    pushUnsubRows.length +
    deposits;
  const hasAnyLiveData = allPlayers.some((p) => {
    if (!p) return false;
    return (Number(p.totals && p.totals.visits) || 0) > 0 ||
      !!(p.channels && (p.channels.bot || p.channels.push || p.channels.gazette || p.channels.rating || p.channels.raffle)) ||
      !!(p.registeredAt || p.botSubscribedAt || p.pushSubscribedAt || p.pokerPlusUserId);
  });
  const exactAnalytics = analyticsSummary && analyticsSummary.available ? analyticsSummary : null;
  const exactVisits = exactAnalytics ? {
    total: exactAnalytics.sessions,
    unique: exactAnalytics.uniqueVisitors,
    new: exactAnalytics.newVisitors,
    repeat: exactAnalytics.returningVisitors,
    guestInstallations: exactAnalytics.guestInstallations,
    registeredVisitors: exactAnalytics.registeredVisitors,
    guestConverted: exactAnalytics.guestConverted,
    guestConversionRate: exactAnalytics.guestConversionRate,
    averageSessionsBeforeRegistration: exactAnalytics.averageSessionsBeforeRegistration,
    trackingStartedAt: exactAnalytics.trackingStartedAt,
    trackingStartedDate: exactAnalytics.trackingStartedDate,
    exact: true,
    incomplete: !!(exactAnalytics.trackingStartedDate && (!range || range.from < exactAnalytics.trackingStartedDate)),
    unavailableBeforeStart: false,
    globalFirstTrackedDate: exactAnalytics.trackingStartedDate || "",
    firstTrackedDate: exactAnalytics.trackingStartedDate || "",
    lastTrackedDate: "",
  } : null;
  return {
    players: playerRows.length,
    audience: {
      confirmed: exactAnalytics ? exactAnalytics.registeredVisitors : confirmedAudience,
      activeAnonymousInstallations: exactAnalytics ? exactAnalytics.guestInstallations : activeAnonymous,
      estimatedReal: exactAnalytics ? exactAnalytics.uniqueVisitors : confirmedAudience + activeAnonymous,
      exact: !!exactAnalytics,
    },
    visits: exactVisits || {
      total: visitsTotal,
      unique: visitsUnique,
      new: visitsNew,
      repeat: visitsRepeat,
      incomplete: visitDailyIncomplete,
      unavailableBeforeStart: visitDailyUnavailableBeforeStart,
      globalFirstTrackedDate: visitDailySummary && visitDailySummary.globalFirstTrackedDate ? visitDailySummary.globalFirstTrackedDate : "",
      firstTrackedDate: visitDailySummary && visitDailySummary.firstTrackedDate ? visitDailySummary.firstTrackedDate : "",
      lastTrackedDate: visitDailySummary && visitDailySummary.lastTrackedDate ? visitDailySummary.lastTrackedDate : "",
    },
    analytics: analyticsSummary || null,
    registrations: registrationRows.length,
    registrationCounts,
    pokerPlus: uniquePokerPlusEventRows.length || pokerPlusRows.length,
    pokerPlusUnlinked: pokerPlusUnlinkedRows.length,
    pokerPlusNet: (uniquePokerPlusEventRows.length || pokerPlusRows.length) - pokerPlusUnlinkedRows.length,
    bot: botRows.length,
    botUnsub: botUnsubRows.length,
    botNet: botRows.length - botUnsubRows.length,
    botHistoryReliableFrom: BOT_TRANSITION_HISTORY_RELIABLE_FROM,
    push: pushRows.length,
    pushUnsub: pushUnsubRows.length,
    pushNet: pushRows.length - pushUnsubRows.length,
    deposits,
    depositCount,
    current,
    historicalDataIncomplete: exactVisits ? exactVisits.incomplete : !!(range && hasAnyLiveData && (periodEventsTotal === 0 || visitDailyIncomplete)),
    dailyHistoryUnavailableBeforeStart: visitDailyUnavailableBeforeStart,
  };
}

function latestEventIso(values) {
  return (Array.isArray(values) ? values : []).map((value) => {
    const iso = isoFromMs(value) || String(value || "");
    return { iso, ms: Date.parse(iso) };
  }).filter((row) => Number.isFinite(row.ms)).sort((a, b) => b.ms - a.ms)[0]?.iso || "";
}

function sectionViewRowsFromCounts(counts) {
  return Object.keys(counts || {})
    .map((section) => ({ section, count: Number(counts[section]) || 0 }))
    .filter((row) => row.section && row.count > 0)
    .sort((a, b) => b.count - a.count || a.section.localeCompare(b.section));
}

function safeCampaignId(raw) {
  const id = String(raw || "").trim();
  return /^crm_[a-f0-9]{10}$/i.test(id) ? id : "";
}

function metricNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function safeTrackSlug(raw) {
  let s = String(raw || "").trim().toLowerCase();
  if (s.startsWith("ref_")) s = s.slice(4);
  return /^[a-f0-9]{8}$/.test(s) ? s : "";
}

function trackingSlugFromUrl(rawUrl) {
  const url = String(rawUrl || "").trim();
  if (!url) return "";
  try {
    const parsed = new URL(url);
    return safeTrackSlug(parsed.searchParams.get("startapp") || parsed.searchParams.get("ref") || "");
  } catch (e) {
    const m = url.match(/[?&](?:startapp|ref)=([^&#]+)/i);
    return m ? safeTrackSlug(decodeURIComponent(m[1] || "")) : "";
  }
}

function campaignTrackingSlug(campaign) {
  return safeTrackSlug(campaign && (campaign.trackingLinkId || campaign.trackingId || campaign.trackingSlug)) ||
    trackingSlugFromUrl(campaign && campaign.buttonUrl);
}

async function readCampaignMetrics(campaigns) {
  const list = Array.isArray(campaigns) ? campaigns : [];
  const ids = unique(list.map((campaign) => safeCampaignId(campaign && campaign.id)).filter(Boolean)).slice(0, 50);
  if (!ids.length) return {};
  const results = await redisCursorReadPipeline(ids.map((id) => ["HGETALL", CRM_CAMPAIGN_METRICS_PREFIX + id]), { timeoutMs: 9000 });
  const out = {};
  ids.forEach((id, idx) => {
    const raw = hashPairsToObject(results && results[idx] && results[idx].result);
    out[id] = {
      pushOpens: metricNumber(raw.pushOpens),
      pushClicks: metricNumber(raw.pushClicks),
      pushOpenUsers: metricNumber(raw.pushOpenUsers),
      lastPushOpenAt: String(raw.lastPushOpenAt || ""),
    };
  });
  const trackingSlugs = unique(list.map(campaignTrackingSlug).filter(Boolean)).slice(0, 50);
  if (trackingSlugs.length) {
    const trackingCommands = [];
    trackingSlugs.forEach((slug) => {
      trackingCommands.push(["HGET", TRACK_TOTALS_HASH, slug]);
      trackingCommands.push(["HGET", TRACK_UNIQUE_HASH, slug]);
      trackingCommands.push(["GET", `poker_app:track_links:ev_n:${slug}`]);
      trackingCommands.push(["SCARD", `poker_app:track_links:ev_u:${slug}`]);
      trackingCommands.push(["HGETALL", `poker_app:track_links:ev_by:${slug}`]);
    });
    const trackingResults = await redisCursorReadPipeline(trackingCommands, { timeoutMs: 9000 });
    const trackingBySlug = {};
    trackingSlugs.forEach((slug, idx) => {
      const base = idx * 5;
      const eventCounts = hashPairsToObject(trackingResults && trackingResults[base + 4] && trackingResults[base + 4].result);
      trackingBySlug[slug] = {
        trackingClicks: metricNumber(trackingResults && trackingResults[base] && trackingResults[base].result),
        trackingUniqueClicks: metricNumber(trackingResults && trackingResults[base + 1] && trackingResults[base + 1].result),
        trackingEvents: metricNumber(trackingResults && trackingResults[base + 2] && trackingResults[base + 2].result),
        trackingActiveVisitors: metricNumber(trackingResults && trackingResults[base + 3] && trackingResults[base + 3].result),
        trackingEventCounts: eventCounts,
      };
    });
    list.forEach((campaign) => {
      const id = safeCampaignId(campaign && campaign.id);
      if (!id || !out[id]) return;
      const slug = campaignTrackingSlug(campaign);
      const tracking = slug ? trackingBySlug[slug] : null;
      if (!tracking) return;
      out[id] = {
        ...out[id],
        trackingLinkId: slug,
        appVisits: tracking.trackingClicks,
        appVisitors: tracking.trackingUniqueClicks,
        buttonClicks: tracking.trackingClicks,
        appEvents: tracking.trackingEvents,
        activeVisitors: tracking.trackingActiveVisitors,
        trackingEventCounts: tracking.trackingEventCounts,
      };
    });
  }
  return out;
}

function computeSectionViewsSummary(totalCounts, dayResults, range, visitsTotal) {
  if (!range) return sectionViewRowsFromCounts(totalCounts);
  const counts = {};
  (Array.isArray(dayResults) ? dayResults : []).forEach((result) => {
    const daily = hashPairsToObject(result && result.result);
    Object.keys(daily).forEach((section) => {
      counts[section] = (Number(counts[section]) || 0) + (Number(daily[section]) || 0);
    });
  });
  return sectionViewRowsFromCounts(counts);
}

async function readVisitDailySummary(dayKeys, visitorFirstSeen, range, allVisits, bounds) {
  const keys = Array.isArray(dayKeys) ? dayKeys.filter(Boolean) : [];
  if (!keys.length || keys.length > 120) return null;
  const commands = [];
  keys.forEach((key) => {
    commands.push(["HGETALL", VISITS_DAY_PREFIX + key]);
    commands.push(["SMEMBERS", VISITORS_DAY_PREFIX + key]);
  });
  const results = await optionalCrmStep("visit-daily", null, () => redisCursorReadPipeline(commands, { timeoutMs: 9000 }), []);
  if (!results || !Array.isArray(results)) return null;
  const users = new Set();
  const userCounts = {};
  const visitCounts = {};
  const newCounts = {};
  const periodVisitsByUser = {};
  let firstTrackedDate = "";
  let lastTrackedDate = "";
  let total = 0;
  keys.forEach((key, idx) => {
    const visits = hashPairsToObject(results[idx * 2] && results[idx * 2].result);
    const dayUsers = redisSet(results[idx * 2 + 1] && results[idx * 2 + 1].result);
    const dayVisitTotal = totalFromHashMap(visits);
    const hasDayData = dayVisitTotal > 0 || dayUsers.size > 0;
    if (hasDayData) {
      if (!firstTrackedDate || key < firstTrackedDate) firstTrackedDate = key;
      if (!lastTrackedDate || key > lastTrackedDate) lastTrackedDate = key;
    }
    if (dayVisitTotal > 0) visitCounts[key] = dayVisitTotal;
    if (dayUsers.size > 0) userCounts[key] = dayUsers.size;
    total += dayVisitTotal;
    Object.keys(visits).forEach((id) => {
      periodVisitsByUser[id] = (Number(periodVisitsByUser[id]) || 0) + (Number(visits[id]) || 0);
    });
    dayUsers.forEach((id) => users.add(id));
  });
  let newUsers = 0;
  users.forEach((id) => {
    const firstSeenMs = Number(visitorFirstSeen[id]) || 0;
    const firstSeen = isoFromMs(firstSeenMs) || "";
    const periodVisits = Number(periodVisitsByUser[id]) || 0;
    const totalVisits = Number(allVisits && allVisits[id]) || 0;
    const isNew = firstSeen && crmDateInRange(firstSeen, range) && totalVisits <= periodVisits;
    if (isNew) {
      newUsers += 1;
      const firstSeenDate = dateKeyFromMs(firstSeenMs);
      if (firstSeenDate) newCounts[firstSeenDate] = (Number(newCounts[firstSeenDate]) || 0) + 1;
    }
  });
  return {
    hasDailyData: total > 0 || users.size > 0,
    total,
    unique: users.size,
    new: newUsers,
    userCounts,
    visitCounts,
    newCounts,
    globalFirstTrackedDate: bounds && bounds.firstTrackedDate ? bounds.firstTrackedDate : "",
    globalLastTrackedDate: bounds && bounds.lastTrackedDate ? bounds.lastTrackedDate : "",
    firstTrackedDate,
    lastTrackedDate,
  };
}

async function buildChartOnly(options = {}) {
  const warnings = [];
  const chartRange = rangeFromInput(options.chartRange || {});
  const chartRangeKey = chartRange ? "custom" : periodFromInput(options.chartPeriod || options.period || "30");
  const chartStatsRange = chartRange || rangeForPeriodKey(chartRangeKey);
  const results = await optionalCrmStep("chart-business-data", null, () => redisCursorReadPipeline([
    ["HGETALL", DT_IDS_HASH],
    ["HGETALL", USERNAMES_HASH],
    ["HGETALL", DISPLAY_NAMES_HASH],
    ["HGETALL", EMAIL_LINKS_HASH],
    ["HGETALL", EMAIL_ORIGINALS_HASH],
    ["HGETALL", EMAIL_LINKED_AT_HASH],
    ["HGETALL", TELEGRAM_LOGIN_AT_HASH],
    ["HGETALL", POKERPLUS_BIND_HASH],
    ["HGETALL", POKERPLUS_PROFILE_HASH],
    ["HGETALL", POKERPLUS_SYNC_HASH],
    ["HGETALL", POKERPLUS_BIND_AT_HASH],
    ["HGETALL", BOT_SUBSCRIBED_AT_HASH],
    ["HGETALL", PUSH_SUBSCRIBED_AT_HASH],
  ], { timeoutMs: 9000 }), warnings);
  if (!results) return { source: "redis-error", chartAnalytics: null, crmWarnings: warnings };
  const maps = results.map((row) => hashPairsToObject(row && row.result));
  const [dtIds, usernames, displayNames, emailLinks, emailOriginals, emailLinkedAt, telegramLoginAt, pokerplusBind, pokerplusProfiles, pokerplusSyncedAt, pokerplusBoundAt, botSubscribedAt, pushSubscribedAt] = maps;
  const registeredAccounts = buildRegisteredAccounts({
    emailLinks, emailOriginals, emailLinkedAt, telegramLoginAt, dtIds, usernames, displayNames,
    referralReferrers: {}, referralAt: {}, referralSources: {},
  });
  const pokerPlusAccounts = buildPokerPlusAccounts({ pokerplusBind, pokerplusProfiles, pokerplusSyncedAt, pokerplusBoundAt, displayNames });
  const visitDailySummary = await optionalCrmStep("chart-unique-visitors", null, async () => {
      let trafficRange = chartStatsRange;
      if (!trafficRange) {
        const bounds = await readVisitDailyBounds();
        if (bounds && bounds.firstTrackedDate && bounds.lastTrackedDate) trafficRange = rangeFromInput({ from: bounds.firstTrackedDate, to: bounds.lastTrackedDate });
      }
      return trafficRange
        ? readVisitDailySummary(dateKeysBetween(trafficRange.from, trafficRange.to), {}, trafficRange, {}, null)
        : null;
    }, warnings);
  const businessPlayers = [];
  Object.keys(botSubscribedAt).forEach((id) => businessPlayers.push({ channels: { bot: true, push: false }, botSubscribedAt: earliestIso([botSubscribedAt[id]]) }));
  Object.keys(pushSubscribedAt).forEach((id) => businessPlayers.push({ channels: { bot: false, push: true }, pushSubscribedAt: isoFromMs(pushSubscribedAt[id]) }));
  const chartAnalytics = await computeChartAnalytics({
    players: businessPlayers,
    registeredAccounts,
    pokerPlusAccounts,
    eventsByAccount: {},
    range: chartStatsRange,
    rangeKey: chartRangeKey,
    visitDailySummary: null,
    excludeTraffic: true,
    includeGeneralMessages: false,
  });
  if (chartAnalytics && Array.isArray(chartAnalytics.labels)) {
    chartAnalytics.series = (Array.isArray(chartAnalytics.series) ? chartAnalytics.series : []).filter((series) =>
      !["deposits", "depositAmount", "crmMessages", "generalMessages"].includes(series && series.key)
    );
    const uniqueByDay = visitDailySummary && visitDailySummary.userCounts || {};
    const uniqueValues = chartAnalytics.labels.map((date) => Number(uniqueByDay[date]) || 0);
    chartAnalytics.series.unshift({
      key: "users",
      label: "Уникальные посетители",
      mode: "daily",
      hasDates: !!visitDailySummary,
      undatedTotal: 0,
      values: uniqueValues,
    });
    (Array.isArray(chartAnalytics.summary) ? chartAnalytics.summary : []).forEach((row) => {
      row.users = Number(uniqueByDay[row.date]) || 0;
    });
  }
  return {
    source: "redis-live",
    chartAnalytics,
    chartRange: chartRange ? { key: "custom", from: chartRange.from, to: chartRange.to } : { key: chartRangeKey },
    crmWarnings: warnings,
  };
}

async function buildRealPlayers(options = {}) {
  const warnings = [];
  const mode = String(options.mode || "full").trim();
  if (mode === "chart") return buildChartOnly(options);
  const includeHeavy = mode !== "core" && mode !== "players" && mode !== "send" && mode !== "raffles" && mode !== "raffle-summary" && mode !== "comparison" && mode !== "blocked";
  const includeActivity = mode !== "core" && mode !== "chart" && mode !== "players" && mode !== "send" && mode !== "raffles" && mode !== "raffle-summary" && mode !== "comparison" && mode !== "blocked";
  const includeDetail = mode !== "core" && mode !== "players" && mode !== "send" && mode !== "raffles" && mode !== "raffle-summary" && mode !== "comparison" && mode !== "blocked";
  const includeRaffleRecipients = mode !== "core" && mode !== "raffle-summary" && mode !== "comparison";
  // The raffle archive is the slowest CRM source. Keep it out of the core
  // response so the dashboard shell and the selected-period counters can render
  // immediately; the client requests mode=raffles only for the period in view.
  const includeRaffleStats = mode !== "core" && mode !== "players" && mode !== "send" && mode !== "chart" && mode !== "blocked";
  const range = rangeFromInput(options.range || options);
  const rangeKey = range ? "custom" : periodFromInput(options.period);
  const statsRange = range || rangeForPeriodKey(rangeKey);
  const sectionViewDayKeys = includeDetail && statsRange ? dateKeysBetween(statsRange.from, statsRange.to) : [];
  const chartRange = rangeFromInput(options.chartRange || {});
  const chartRangeKey = chartRange ? "custom" : periodFromInput(options.chartPeriod || rangeKey);
  const chartStatsRange = chartRange || rangeForPeriodKey(chartRangeKey);
  if (!redisConfigured()) {
    return { source: "no-redis", players: [], registeredAccounts: [], pokerPlusAccounts: [], campaigns: [], crmWarnings: ["no-redis"] };
  }
  const scopedPopulationMode = mode === "core" || mode === "players" || mode === "send" || mode === "raffles" || mode === "raffle-summary" || mode === "comparison" || mode === "blocked";
  const unusedScopedKey = "poker_app:crm:unused_scoped_population";
  const baseCommands = [
    ["SMEMBERS", VISITORS_KEY],
    ["HGETALL", scopedPopulationMode ? unusedScopedKey : VISITS_HASH],
    ["HGETALL", VISITOR_FIRST_SEEN_HASH],
    ["HGETALL", USERNAMES_HASH],
    ["HGETALL", DT_IDS_HASH],
    ["HGETALL", DISPLAY_NAMES_HASH],
    ["HGETALL", scopedPopulationMode ? unusedScopedKey : PERSONAL_HASH],
    ["SMEMBERS", scopedPopulationMode ? unusedScopedKey : CHAT_USERS_KEY],
    ["HGETALL", scopedPopulationMode ? unusedScopedKey : CHAT_LAST_SEEN_HASH],
    ["SMEMBERS", GAZETTE_SUBS_KEY],
    ["SMEMBERS", RATING_SUBS_KEY],
    ["SMEMBERS", RAFFLE_SUBS_KEY],
    ["SMEMBERS", PUSH_REGISTRY_KEY],
    ["SMEMBERS", PUSH_DISABLED_KEY],
    ["HGETALL", BOT_SUBSCRIBED_AT_HASH],
    ["HGETALL", PUSH_SUBSCRIBED_AT_HASH],
    ["HGETALL", BOT_UNSUBSCRIBED_AT_HASH],
    ["HGETALL", PUSH_UNSUBSCRIBED_AT_HASH],
    ["HGETALL", POKERPLUS_BIND_HASH],
    ["HGETALL", POKERPLUS_BIND_AT_HASH],
    ["HGETALL", POKERPLUS_PROFILE_HASH],
    ["HGETALL", POKERPLUS_SYNC_HASH],
    ["HGETALL", CRM_OVERRIDES_HASH],
    ["LRANGE", CRM_CAMPAIGNS_LIST, "0", "24"],
    ["ZREVRANGE", TRACK_Z_INDEX, "0", "49"],
    ["HGETALL", TRACK_META_HASH],
    ["HGETALL", EMAIL_LINKS_HASH],
    ["HGETALL", EMAIL_ORIGINALS_HASH],
    ["HGETALL", EMAIL_LINKED_AT_HASH],
    ["HGETALL", TELEGRAM_LOGIN_AT_HASH],
    ["HGETALL", REFERRAL_REFERRER_HASH],
    ["HGETALL", REFERRAL_AT_HASH],
    ["HGETALL", REFERRAL_SOURCE_HASH],
    ["HGETALL", scopedPopulationMode ? unusedScopedKey : SECTION_VIEWS_HASH],
  ];
  sectionViewDayKeys.forEach((key) => baseCommands.push(["HGETALL", SECTION_VIEWS_DAY_PREFIX + key]));
  if (includeDetail) ADMIN_IDS.forEach((id) => baseCommands.push(["SMEMBERS", "poker_app:chat_partners:" + id]));
  baseCommands.push(["HGETALL", POKERPLUS_UNBIND_AT_HASH]);

  const results = await optionalCrmStep("redis-base", null, () => readCrmBaseCommands(
    baseCommands,
    { timeoutMs: scopedPopulationMode ? 30000 : 9000 },
    scopedPopulationMode
  ), warnings);
  if (!results || !Array.isArray(results)) {
    return { source: "redis-error", players: [], registeredAccounts: [], pokerPlusAccounts: [], campaigns: [], crmWarnings: warnings.length ? warnings : ["redis-base"] };
  }

  const visitors = redisSet(results[0] && results[0].result);
  const visits = hashPairsToObject(results[1] && results[1].result);
  const visitorFirstSeen = hashPairsToObject(results[2] && results[2].result);
  const usernames = hashPairsToObject(results[3] && results[3].result);
  const dtIds = hashPairsToObject(results[4] && results[4].result);
  const displayNames = hashPairsToObject(results[5] && results[5].result);
  const personal = hashPairsToObject(results[6] && results[6].result);
  const chatUsers = redisSet(results[7] && results[7].result);
  const lastSeen = hashPairsToObject(results[8] && results[8].result);
  const gazette = redisSet(results[9] && results[9].result);
  const rating = redisSet(results[10] && results[10].result);
  const raffle = redisSet(results[11] && results[11].result);
  const pushRegistry = redisSet(results[12] && results[12].result);
  const pushDisabled = redisSet(results[13] && results[13].result);
  const botSubscribedAt = hashPairsToObject(results[14] && results[14].result);
  const pushSubscribedAt = hashPairsToObject(results[15] && results[15].result);
  const botUnsubscribedAt = hashPairsToObject(results[16] && results[16].result);
  const pushUnsubscribedAt = hashPairsToObject(results[17] && results[17].result);
  const pokerplusBind = hashPairsToObject(results[18] && results[18].result);
  const pokerplusBoundAt = hashPairsToObject(results[19] && results[19].result);
  const pokerplusProfiles = hashPairsToObject(results[20] && results[20].result);
  const pokerplusSyncedAt = hashPairsToObject(results[21] && results[21].result);
  const pokerplusUnboundAt = hashPairsToObject(results[baseCommands.length - 1] && results[baseCommands.length - 1].result);
  const overrides = hashPairsToObject(results[22] && results[22].result);
  const campaigns = (Array.isArray(results[23] && results[23].result) ? results[23].result : []).map((x) => safeJson(x, null)).filter(Boolean);
  const campaignMetrics = includeActivity
    ? await optionalCrmStep("crm-campaign-metrics", {}, () => readCampaignMetrics(campaigns), warnings)
    : {};
  let campaignsWithMetrics = campaigns.map((campaign) => ({
    ...campaign,
    ...(campaignMetrics && campaignMetrics[campaign.id] ? campaignMetrics[campaign.id] : {}),
  }));
  const trackSlugs = Array.isArray(results[24] && results[24].result) ? results[24].result.map((x) => String(x)) : [];
  const trackMeta = hashPairsToObject(results[25] && results[25].result);
  const emailLinks = hashPairsToObject(results[26] && results[26].result);
  const emailOriginals = hashPairsToObject(results[27] && results[27].result);
  const emailLinkedAt = hashPairsToObject(results[28] && results[28].result);
  const telegramLoginAt = hashPairsToObject(results[29] && results[29].result);
  const referralReferrers = hashPairsToObject(results[30] && results[30].result);
  const referralAt = hashPairsToObject(results[31] && results[31].result);
  const referralSources = hashPairsToObject(results[32] && results[32].result);
  const sectionViewsAll = hashPairsToObject(results[33] && results[33].result);
  const sectionViewDayResults = results.slice(34, 34 + sectionViewDayKeys.length);
  const adminPartnerSets = results.slice(34 + sectionViewDayKeys.length, 34 + sectionViewDayKeys.length + (includeDetail ? ADMIN_IDS.length : 0)).map((r) => redisSet(r && r.result));
  const blockedUsers = await optionalCrmStep("app-blocked-users", [], () => listAppBlockedUsers(), warnings);
  const blockedByAlias = new Map();
  (Array.isArray(blockedUsers) ? blockedUsers : []).forEach((row) => {
    const aliases = unique([row && row.id].concat(Array.isArray(row && row.aliases) ? row.aliases : []));
    aliases.forEach((alias) => blockedByAlias.set(String(alias), row));
  });
  const statsDayKeys = includeDetail && statsRange ? dateKeysBetween(statsRange.from, statsRange.to) : [];
  const visitDailyBounds = includeDetail ? await readVisitDailyBounds() : null;
  const visitDailySummary = includeDetail ? await readVisitDailySummary(statsDayKeys, visitorFirstSeen, statsRange, visits, visitDailyBounds) : null;
  const accountByRuntime = {};
  Object.keys(dtIds).forEach((runtimeId) => {
    const accountId = String(dtIds[runtimeId] || "").trim();
    if (accountId) accountByRuntime[String(runtimeId)] = accountId;
  });
  const sourceByVisitor = {};
  const firstSeenByRuntime = {};
  if (includeActivity && trackSlugs.length) {
    const logs = await optionalCrmStep(
      "track-logs",
      [],
      () => redisPipeline(trackSlugs.map((slug) => ["LRANGE", "poker_app:track_links:log:" + slug, "0", "499"]), { timeoutMs: 9000 }),
      warnings
    );
    trackSlugs.forEach((slug, idx) => {
      const meta = safeJson(trackMeta[slug], {});
      const label = String((meta && meta.label) || ("ref_" + slug)).trim();
      const raw = logs && logs[idx] && Array.isArray(logs[idx].result) ? logs[idx].result : [];
      raw.forEach((line) => {
        const hit = safeJson(line, null);
        const visitorId = hit && hit.visitorId ? String(hit.visitorId).trim() : "";
        if (visitorId && !sourceByVisitor[visitorId]) sourceByVisitor[visitorId] = label;
        if (visitorId) firstSeenByRuntime[visitorId] = earliestIso([firstSeenByRuntime[visitorId], hit && hit.t]);
      });
    });
  }

  const playerMap = new Map();
  function addRuntime(rawId) {
    const runtimeId = String(rawId || "").trim();
    if (!runtimeId) return null;
    const accountId = accountByRuntime[runtimeId] || (/^ID\d{6}$/.test(runtimeId) ? runtimeId : runtimeId);
    const p = ensurePlayer(playerMap, accountId);
    if (!p) return null;
    if (/^ID\d{6}$/.test(accountId)) p.dtId = accountId;
    p.runtimeIds.push(runtimeId);
    if (runtimeId.startsWith("tg_")) p.telegramIds.push(runtimeId);
    if (dtIds[runtimeId]) p.dtId = String(dtIds[runtimeId]);
    return p;
  }

  function addAccountWithRuntimeAliases(rawAccountId) {
    const accountId = String(rawAccountId || "").trim();
    if (!accountId) return;
    ensurePlayer(playerMap, accountId);
    Object.keys(accountByRuntime).forEach((runtimeId) => {
      if (String(accountByRuntime[runtimeId] || "").trim() === accountId) addRuntime(runtimeId);
    });
  }
  function addBotAndPushAudience() {
    visitors.forEach(addRuntime);
    gazette.forEach((id) => addRuntime(normalizeTgId(id)));
    rating.forEach((id) => addRuntime(normalizeTgId(id)));
    raffle.forEach((id) => addRuntime(normalizeTgId(id)));
    pushRegistry.forEach((accountId) => addRuntime(accountId));
  }

  if (mode === "players") {
    addBotAndPushAudience();
    Object.keys(pokerplusBind).forEach((accountId) => {
      if (String(pokerplusBind[accountId] || "").trim()) addAccountWithRuntimeAliases(accountId);
    });
  } else if (mode === "send") {
    addBotAndPushAudience();
  } else if (mode === "core" || mode === "raffles" || mode === "raffle-summary" || mode === "comparison" || mode === "blocked") {
    // Summary data only needs real participants: registered accounts, linked
    // Poker21 players and users who can currently receive bot/push messages.
    addBotAndPushAudience();
    Object.keys(dtIds).forEach(addRuntime);
    Object.keys(emailLinks).forEach(addAccountWithRuntimeAliases);
    Object.keys(emailLinkedAt).forEach(addAccountWithRuntimeAliases);
    Object.keys(telegramLoginAt).forEach(addRuntime);
    Object.keys(pokerplusBind).forEach(addAccountWithRuntimeAliases);
    Object.keys(pokerplusUnboundAt).forEach(addAccountWithRuntimeAliases);
  } else {
    visitors.forEach(addRuntime);
    chatUsers.forEach(addRuntime);
    gazette.forEach((id) => addRuntime(normalizeTgId(id)));
    rating.forEach((id) => addRuntime(normalizeTgId(id)));
    raffle.forEach((id) => addRuntime(normalizeTgId(id)));
    Object.keys(dtIds).forEach(addRuntime);
    pushRegistry.forEach((accountId) => addRuntime(accountId) || ensurePlayer(playerMap, accountId));
    Object.keys(pokerplusBind).forEach((accountId) => ensurePlayer(playerMap, accountId));
    Object.keys(pokerplusUnboundAt).forEach((accountId) => ensurePlayer(playerMap, accountId));
    Object.keys(pokerplusProfiles).forEach((accountId) => ensurePlayer(playerMap, accountId));
    Object.keys(overrides).forEach((accountId) => ensurePlayer(playerMap, accountId));
  }
  if (mode !== "players" && mode !== "send") (Array.isArray(blockedUsers) ? blockedUsers : []).forEach((row) => {
    const aliases = unique([row && row.id].concat(Array.isArray(row && row.aliases) ? row.aliases : []));
    aliases.forEach((id) => addRuntime(id));
    ensurePlayer(playerMap, aliases.find((id) => /^ID\d{6}$/.test(id)) || row.id || aliases[0]);
  });
  if (includeDetail) adminPartnerSets.forEach((set) => set.forEach(addRuntime));

  const accountIds = [...playerMap.keys()];
  const [eventsByAccount, touchesByAccount] = includeActivity
    ? await Promise.all([
      optionalCrmStep("crm-events", {}, () => readEventsForAccounts(accountIds), warnings),
      optionalCrmStep("crm-touches", {}, () => readTouchesForAccounts(accountIds), warnings),
    ])
    : [{}, {}];

  for (const [accountId, p] of playerMap.entries()) {
    const runtimeIds = unique(p.runtimeIds);
    const candidates = unique([accountId, p.dtId].concat(runtimeIds));
    p.pokerPlusUserId = String(pokerplusBind[accountId] || "").trim();
    const crm = safeJson(overrides[accountId], {});
    p.crm = crm && typeof crm === "object" ? crm : {};
    const blockRecord = candidates.map((id) => blockedByAlias.get(String(id))).find(Boolean) || blockedByAlias.get(accountId) || null;
    if (blockRecord) {
      p.appBlocked = true;
      p.appBlock = {
        id: blockRecord.id || accountId,
        reason: blockRecord.reason || "",
        adminId: blockRecord.adminId || "",
        adminName: blockRecord.adminName || "",
        createdAt: blockRecord.createdAt || "",
        aliases: unique(blockRecord.aliases || []),
      };
    }
    p.manager = p.crm.manager || "";
    const referrerId = String(referralReferrers[accountId] || "").trim();
    const referrerName = String(displayNames[referrerId] || referrerId).trim();
    const referralLabel = referrerId
      ? (/^романдий$/i.test(referrerName) ? "От Романдия" : "Пригласил: " + referrerName)
      : "";
    p.source = p.crm.source || candidates.map((id) => sourceByVisitor[id]).find(Boolean) || referralLabel || "Mini App";
    p.note = p.crm.note || personal[accountId] || "";
    const hasPushSubscription = candidates.some((id) => pushRegistry.has(id));
    const pushIsDisabled = candidates.some((id) => pushDisabled.has(id));
    p.channels.push = hasPushSubscription && !pushIsDisabled;
    p.channels.gazette = p.telegramIds.some((id) => gazette.has(toNumericTelegramId(id)) || gazette.has(id));
    p.channels.rating = p.telegramIds.some((id) => rating.has(toNumericTelegramId(id)) || rating.has(id));
    p.channels.raffle = p.telegramIds.some((id) => raffle.has(toNumericTelegramId(id)) || raffle.has(id));
    p.channels.bot = p.telegramIds.length > 0 && (p.channels.gazette || p.channels.rating || p.channels.raffle || visitors.has(p.telegramIds[0]));
    p.botSubscribedAt = latestEventIso(p.telegramIds.reduce((values, id) => values.concat([botSubscribedAt[toNumericTelegramId(id)], botSubscribedAt[id]]), []));
    p.pushSubscribedAt = latestEventIso(candidates.map((id) => pushSubscribedAt[id]));
    p.botUnsubscribedAt = latestEventIso(p.telegramIds.reduce((values, id) => values.concat([botUnsubscribedAt[toNumericTelegramId(id)], botUnsubscribedAt[id]]), []));
    p.pushUnsubscribedAt = latestEventIso(candidates.map((id) => pushUnsubscribedAt[id]));
    p.pokerPlusLinkedAt = latestEventIso(candidates.map((id) => pokerplusBoundAt[id]));
    p.pokerPlusUnlinkedAt = latestEventIso(candidates.map((id) => pokerplusUnboundAt[id]));
    p.registeredAt = earliestIso([emailLinkedAt[accountId], telegramLoginAt[accountId]].concat(runtimeIds.map((id) => telegramLoginAt[id])));
    p.firstSeenAt = earliestIso(
      candidates.map((id) => visitorFirstSeen[id] || firstSeenByRuntime[id])
        .concat([
          p.registeredAt,
          p.botSubscribedAt,
          p.pushSubscribedAt,
          p.botUnsubscribedAt,
          p.pushUnsubscribedAt,
          p.pokerPlusLinkedAt,
          p.pokerPlusUnlinkedAt,
          pokerplusBoundAt[accountId],
          pokerplusSyncedAt[accountId],
        ])
        .concat((eventsByAccount[accountId] || []).map((ev) => ev && ev.at))
        .concat((touchesByAccount[accountId] || []).map((touch) => touch && (touch.at || touch.createdAt)))
    );

    p.totals.visits = candidates.reduce((sum, id) => sum + (parseInt(visits[id], 10) || 0), 0);
    p.lastMessageDays = Math.min.apply(null, candidates.map((id) => daysAgoFromMs(lastSeen[id])));
    if (!Number.isFinite(p.lastMessageDays)) p.lastMessageDays = 999;
    p.lastReplyDays = p.lastMessageDays;
    if (statsRange && !["7", "30", "90"].includes(rangeKey)) {
      p.messages.custom += candidates.some((id) => {
        const n = Number(lastSeen[id]);
        return Number.isFinite(n) && n >= statsRange.fromMs && n <= statsRange.toMs;
      }) ? 1 : 0;
      if (rangeKey !== "custom") {
        p.messages[rangeKey] = (p.messages[rangeKey] || 0) + p.messages.custom;
      }
    }
    if (p.lastMessageDays < 999) {
      p.messages["7"] += p.lastMessageDays <= 7 ? 1 : 0;
      p.messages["30"] += p.lastMessageDays <= 30 ? 1 : 0;
      p.messages["90"] += p.lastMessageDays <= 90 ? 1 : 0;
      p.timeline.push("чат-активность: " + new Date(Date.now() - p.lastMessageDays * 86400000).toLocaleDateString("ru-RU"));
    }

    const profile = parseProfile(pokerplusProfiles[accountId]);
    if (profile) {
      const total = profileTotal(profile);
      const fee = Number(total.fee);
      const hands = Number(total.hands);
      const winnings = Number(total.winnings);
      p.totals.fee = Number.isFinite(fee) ? fee : null;
      p.totals.hands = Number.isFinite(hands) ? hands : null;
      p.totals.winnings = Number.isFinite(winnings) ? winnings : null;
      p.name = String(profile.nickname || profile.Nike || p.name || accountId).trim();
      if (profile.pokerPlusUserId) p.pokerPlusUserId = String(profile.pokerPlusUserId);
      if (profile.lastLoginDate) {
        p.lastGameDays = Math.min(p.lastGameDays, daysAgoFromIso(profile.lastLoginDate));
        p.timeline.push("PokerPlus вход: " + new Date(profile.lastLoginDate).toLocaleDateString("ru-RU"));
      }
      if (p.totals.fee != null) p.timeline.push("PokerPlus fee/rake: " + Math.round(p.totals.fee).toLocaleString("ru-RU") + " ₽");
      if (pokerplusSyncedAt[accountId]) p.pokerPlusSyncedAt = new Date(Number(pokerplusSyncedAt[accountId])).toISOString();
    }

    runtimeIds.forEach((rid) => {
      if (displayNames[rid] && p.name === accountId) p.name = String(displayNames[rid]).trim();
      if (usernames[rid] && !p.handle) p.handle = "@" + String(usernames[rid]).replace(/^@+/, "").trim();
    });
    if (displayNames[accountId]) p.name = String(displayNames[accountId]).trim();
    if (p.dtId && displayNames[p.dtId]) p.name = String(displayNames[p.dtId]).trim();
    if (!p.handle && p.telegramIds.length) {
      const u = usernames[p.telegramIds[0]];
      if (u) p.handle = "@" + String(u).replace(/^@+/, "").trim();
    }
    if (!p.name || p.name === accountId) p.name = p.handle || p.dtId || runtimeIds[0] || accountId;

    if (includeActivity) {
      const eventRange = ["7", "30", "90"].includes(rangeKey) ? null : statsRange;
      applyEvents(p, eventsByAccount[accountId] || [], eventRange, rangeKey);
      applyTouches(p, touchesByAccount[accountId] || []);
    }
    p.tags = inferTags(p);
    if (p.appBlocked) p.tags = unique(["заблокирован"].concat(p.tags || [])).slice(0, 8);
    p.botOpenRate = p.channels.bot ? 100 : 0;
    p.pushOpenRate = p.channels.push ? 100 : 0;
    p.trend = p.deposits["7"] > 0 || p.messages["7"] > 0 ? "есть активность" : "нет активности в CRM";
    if (!p.note) p.note = p.crm.note || "";
    if (p.appBlocked) p.timeline.unshift("доступ к приложению заблокирован" + (p.appBlock && p.appBlock.createdAt ? ": " + new Date(p.appBlock.createdAt).toLocaleDateString("ru-RU") : ""));
    if (p.lastDepositDays >= 999 && p.deposits["90"] <= 0) p.timeline.push("депозитов в CRM-журнале пока нет");
  }

  const players = sortPlayers([...playerMap.values()]).map(publicPlayer);
  const playerByAlias = new Map();
  players.forEach((player) => {
    unique([player.id, player.accountId, player.dtId].concat(player.runtimeIds || []).concat(player.telegramIds || [])).forEach((id) => {
      if (id) playerByAlias.set(String(id), player);
    });
  });
  const blockedUsersPublic = (Array.isArray(blockedUsers) ? blockedUsers : []).map((row) => {
    const aliases = unique([row && row.id].concat(Array.isArray(row && row.aliases) ? row.aliases : []));
    const player = aliases.map((id) => playerByAlias.get(String(id))).find(Boolean) || null;
    return {
      id: row.id,
      aliases,
      reason: row.reason || "",
      adminId: row.adminId || "",
      adminName: row.adminName || "",
      targetLabel: row.targetLabel || (player && (player.name || player.handle || player.accountId)) || "",
      createdAt: row.createdAt || "",
      player: player ? {
        id: player.id,
        accountId: player.accountId,
        dtId: player.dtId,
        name: player.name,
        handle: player.handle,
        telegramIds: player.telegramIds,
      } : null,
    };
  }).sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
  // The players endpoint is a paged directory. Its summary and counters have
  // already arrived through mode=core, so avoid rebuilding analytics, account
  // tables and period totals before returning each directory page.
  if (mode === "players" || mode === "send") {
    return {
      source: "redis-live",
      players,
      blockedUsers: blockedUsersPublic,
      playersScope: mode === "send" ? "broadcast" : "players",
      crmWarnings: warnings,
    };
  }
  const registeredAccounts = buildRegisteredAccounts({
    dtIds,
    usernames,
    displayNames,
    emailLinks,
    emailOriginals,
    emailLinkedAt,
    telegramLoginAt,
    referralReferrers,
    referralAt,
    referralSources,
  });
  if (includeActivity) {
    campaignsWithMetrics = campaignsWithMetrics.map((campaign) => ({
      ...campaign,
      ...computeCampaignOutcomeMetrics(campaign, eventsByAccount, registeredAccounts),
    }));
  }
  const pokerPlusAccounts = buildPokerPlusAccounts({ pokerplusBind, pokerplusProfiles, pokerplusSyncedAt, pokerplusBoundAt, displayNames });
  const analyticsSummary = await optionalCrmStep("exact-analytics", null, () => readAnalyticsSummary(statsRange), warnings);
  const statsSummary = computeStatsSummary({
    players,
    registeredAccounts,
    pokerPlusAccounts,
    range: statsRange,
    rangeKey,
    visitDailySummary,
    activeAnonymousInstallations: 0,
    analyticsSummary,
    pushSubscriptions: pushRegistry.size,
  });
  statsSummary.raffles = includeRaffleStats ? await optionalCrmStep("raffle-stats", {
    available: false,
    uniqueParticipants: 0,
    uniqueWinners: 0,
    issuedPrizeAmount: 0,
    issuedCashAmount: 0,
    returnedAmount: 0,
    returnedCashAmount: 0,
    returnedTicketAmount: 0,
    returnCount: 0,
    issuedTicketAmount: 0,
    issuedRecipients: [],
    returnedRecipients: [],
    issuedByAdmin: { anna: 0, vika: 0 },
    issuedByAdminBreakdown: { anna: { cash: 0, ticket: 0 }, vika: { cash: 0, ticket: 0 } },
  }, async () => {
    async function readIndexedRaffleIds() {
      if (!statsRange) {
        const allRows = await redisPipeline([["LRANGE", RAFFLE_IDS_KEY, "0", "-1"]], {
          timeoutMs: 9000,
          context: "player-crm.raffle-stats.ids.all",
          allowLargeRedisRead: true,
        });
        return {
          ids: Array.isArray(allRows && allRows[0] && allRows[0].result)
            ? unique(allRows[0].result.map(String).filter(Boolean))
            : [],
          backfill: false,
        };
      }
      const readyRows = await redisPipeline([["GET", RAFFLE_STATS_INDEX_READY_KEY]], { timeoutMs: 3000 });
      const ready = String(readyRows && readyRows[0] && readyRows[0].result || "") === "1";
      if (ready) {
        const dayKeys = dateKeysBetween(statsRange.from, statsRange.to);
        const dayRows = dayKeys.length
          ? await redisPipeline(dayKeys.map((dayKey) => ["SMEMBERS", RAFFLE_STATS_DAY_PREFIX + dayKey]), { timeoutMs: 9000 })
          : [];
        return {
          ids: unique((Array.isArray(dayRows) ? dayRows : []).flatMap((row) => (
            Array.isArray(row && row.result) ? row.result.map(String) : []
          )).filter(Boolean)),
          backfill: false,
        };
      }

      // One-time historical backfill. The first request keeps the old exact
      // behavior; every later period request uses only its daily candidate sets.
      const allRows = await redisPipeline([["LRANGE", RAFFLE_IDS_KEY, "0", "-1"]], {
        timeoutMs: 9000,
        context: "player-crm.raffle-stats.index-backfill.ids",
        allowLargeRedisRead: true,
      });
      const allIds = Array.isArray(allRows && allRows[0] && allRows[0].result)
        ? unique(allRows[0].result.map(String).filter(Boolean))
        : [];
      return { ids: allIds, backfill: true };
    }

    const indexedIds = await readIndexedRaffleIds();
    const ids = indexedIds.ids;
    if (!ids.length) return { available: true, uniqueParticipants: 0, uniqueWinners: 0, issuedPrizeAmount: 0, issuedCashAmount: 0, returnedAmount: 0, returnedCashAmount: 0, returnedTicketAmount: 0, returnCount: 0, issuedTicketAmount: 0, issuedRecipients: [], returnedRecipients: [] };
    const participantKeys = new Set();
    const winnerKeys = new Set();
    let issuedPrizeAmount = 0;
    let issuedCashAmount = 0;
    let returnedAmount = 0;
    let returnedCashAmount = 0;
    let returnedTicketAmount = 0;
    let returnCount = 0;
    let issuedTicketAmount = 0;
    const issuedByPerson = new Map();
    const returnedRecipients = [];
    const issuedByAdmin = { anna: 0, vika: 0 };
    const issuedByAdminBreakdown = { anna: { cash: 0, ticket: 0 }, vika: { cash: 0, ticket: 0 } };
    function personKey(row) {
      if (!row || typeof row !== "object") return "";
      const accountId = String(row.accountId || row.dtId || "").trim();
      if (accountId) return "account:" + accountId;
      const userId = String(row.userId || "").trim();
      if (userId) return "user:" + userId;
      const p21Id = String(row.p21Id || "").trim();
      if (p21Id) return "p21:" + p21Id;
      const name = String(row.name || row.pokerPlusNickname || "").trim().toLowerCase();
      return name ? "name:" + name : "";
    }
    function prizeAmount(raffle, winner) {
      const groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
      const groupIndex = parseInt(String(winner && winner.groupIndex != null ? winner.groupIndex : ""), 10);
      const prize = String((winner && winner.prize) || (groups[groupIndex] && groups[groupIndex].prize) || "").replace(/\u00a0|\u202f/g, " ");
      const match = prize.match(/(\d[\d\s]*(?:[.,]\d+)?)\s*(?:₽|р\.?|руб\.?)/i);
      const amount = match ? parseFloat(match[1].replace(/\s+/g, "").replace(",", ".")) : 0;
      return Number.isFinite(amount) && amount > 0 ? amount : 0;
    }
    function prizeKind(raffle) {
      const explicit = String(raffle && (raffle.prizeKind || raffle.prize_kind) || "").trim().toLowerCase();
      if (["cash", "cash_buyin", "cash_buyins", "cash-backing", "other"].includes(explicit)) return "cash";
      if (["ticket", "tickets", "tournament", "tournament_ticket", "tournament_tickets"].includes(explicit)) return "ticket";
      const groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
      const text = [raffle && raffle.title].concat(groups.map((group) => group && group.prize)).join(" ").toLowerCase();
      return /(?:на\s+кеш|кеш|cash|бонус\s+гейм|bonus\s+game)/i.test(text) ? "cash" : "ticket";
    }
    function legacyIssuer(raffle, winner, kind) {
      if (kind !== "cash") return "anna";
      const seriesId = String(raffle && (raffle.seriesId || raffle.series_id) || "").toLowerCase();
      const title = String(raffle && raffle.title || "").toLowerCase();
      const isCash2040 = seriesId.indexOf("cash_20_40") >= 0 || /1000\s*р|20\s*\/\s*40/.test(title);
      if (!isCash2040) return "anna";
      const groupIndex = parseInt(String(winner && winner.groupIndex != null ? winner.groupIndex : "0"), 10) || 0;
      return groupIndex === 1 ? "vika" : "anna";
    }
    function collectRaffle(result) {
      const raffle = safeJson(result && result.result, null);
      if (!raffle) return;
      const raffleDate = raffle.drawnAt || raffle.completedAt || raffle.endDate || raffle.createdAt;
      const raffleInRange = !statsRange || crmDateInRange(raffleDate, statsRange);
      (Array.isArray(raffle.participants) ? raffle.participants : []).forEach((row) => {
        const participantDate = row && (row.joinedAt || row.createdAt || row.manualTicketsAddedAt || row.manualTicketsUpdatedAt) || raffle.createdAt || raffleDate;
        // The rest of the raffle card (winners and issued prizes) belongs to the
        // draw/completion period. Include every participant of a raffle completed
        // in that period as well; otherwise people who joined before the selected
        // week disappear and the card can show fewer participants than winners.
        if (statsRange && !raffleInRange && !crmDateInRange(participantDate, statsRange)) return;
        const key = personKey(row);
        if (key) participantKeys.add(key);
      });
      (Array.isArray(raffle.winners) ? raffle.winners : []).forEach((winner) => {
        if (String(winner && winner.winnerSeatStatus || "").toLowerCase() === "not_seated") {
          const returnDate = raffleDate;
          const kind = prizeKind(raffle);
          const amount = prizeAmount(raffle, winner);
          if (kind === "cash" && amount > 0 && (!statsRange || crmDateInRange(returnDate, statsRange))) {
            returnCount += 1;
            returnedAmount += amount;
            returnedCashAmount += amount;
            if (includeRaffleRecipients) returnedRecipients.push({
              key: personKey(winner),
              name: String(winner.name || winner.displayName || winner.pokerPlusNickname || winner.telegramUsername || winner.accountId || winner.userId || "Игрок"),
              telegramUsername: String(winner.telegramUsername || winner.username || "").replace(/^@+/, ""),
              pokerPlusNickname: String(winner.pokerPlusNickname || winner.pokerPlusName || ""),
              pokerPlusUserId: String(winner.p21Id || winner.pokerPlusUserId || ""),
              raffleId: String(raffle.id || raffle.raffleId || ""),
              raffleTitle: String(raffle.title || "Розыгрыш"),
              returnedAt: returnDate || "",
              kind: "cash",
              reason: "Не сел за стол",
              amount,
            });
          }
        } else if (String(winner && winner.winnerCashoutStatus || "").toLowerCase() === "plus") {
          const returnDate = raffleDate;
          const amount = Math.max(0, Number(winner && winner.winnerCashoutAmount) || 0);
          if (amount > 0 && (!statsRange || crmDateInRange(returnDate, statsRange))) {
            const kind = prizeKind(raffle);
            returnCount += 1;
            returnedAmount += amount;
            if (kind === "ticket") returnedTicketAmount += amount;
            else returnedCashAmount += amount;
            if (includeRaffleRecipients) returnedRecipients.push({
              key: personKey(winner),
              name: String(winner.name || winner.displayName || winner.pokerPlusNickname || winner.telegramUsername || winner.accountId || winner.userId || "Игрок"),
              telegramUsername: String(winner.telegramUsername || winner.username || "").replace(/^@+/, ""),
              pokerPlusNickname: String(winner.pokerPlusNickname || winner.pokerPlusName || ""),
              pokerPlusUserId: String(winner.p21Id || winner.pokerPlusUserId || ""),
              raffleId: String(raffle.id || raffle.raffleId || ""),
              raffleTitle: String(raffle.title || "Розыгрыш"),
              returnedAt: returnDate || "",
              kind,
              reason: kind === "ticket" ? "Возврат билета" : "Возврат кеша",
              amount,
            });
          }
        }
        if (!raffleInRange) return;
        const key = personKey(winner);
        if (key) winnerKeys.add(key);
        if (String(winner && winner.winnerStatus || "").toLowerCase() === "ok") {
          const issuedDate = winner && (winner.winnerStatusAt || winner.prizeIssuedAt) || raffleDate;
          if (!statsRange || crmDateInRange(issuedDate, statsRange)) {
            const amount = prizeAmount(raffle, winner);
            const kind = prizeKind(raffle);
            issuedPrizeAmount += amount;
            if (kind === "cash") issuedCashAmount += amount;
            else issuedTicketAmount += amount;
            const issuedBy = String(winner && winner.winnerStatusBy || "").replace(/^tg_/, "").trim();
            const adminKey = issuedBy === "2144406710"
              ? "anna"
              : issuedBy === "1897001087"
                ? "vika"
                : legacyIssuer(raffle, winner, kind);
            issuedByAdmin[adminKey] += amount;
            issuedByAdminBreakdown[adminKey][kind === "cash" ? "cash" : "ticket"] += amount;
            if (includeRaffleRecipients && key && amount > 0) {
              const current = issuedByPerson.get(key) || {
                key,
                name: String(winner.name || winner.displayName || winner.pokerPlusNickname || winner.telegramUsername || winner.accountId || winner.userId || "Игрок"),
                telegramUsername: String(winner.telegramUsername || winner.username || "").replace(/^@+/, ""),
                pokerPlusNickname: String(winner.pokerPlusNickname || winner.pokerPlusName || ""),
                pokerPlusUserId: String(winner.p21Id || winner.pokerPlusUserId || ""),
                totalAmount: 0,
                cashAmount: 0,
                ticketAmount: 0,
                prizes: [],
              };
              current.totalAmount += amount;
              if (kind === "cash") current.cashAmount += amount;
              else current.ticketAmount += amount;
              const prize = String(winner.prize || "").trim();
              if (prize && !current.prizes.includes(prize)) current.prizes.push(prize);
              issuedByPerson.set(key, current);
            }
          }
        }
      });
    }
    const newestFirst = ids.slice().reverse();
    let backfillIndexOk = true;
    for (let offset = 0; offset < newestFirst.length; offset += 60) {
      const batch = newestFirst.slice(offset, offset + 60);
      const [raffleRows, participantRows] = await Promise.all([
        redisPipeline(batch.map((id) => ["GET", RAFFLE_PREFIX + id]), { timeoutMs: 9000 }),
        redisPipeline(batch.map((id) => ["GET", RAFFLE_PARTICIPANTS_DATA_PREFIX + id]), { timeoutMs: 9000 }),
      ]);
      const indexCommands = [];
      (Array.isArray(raffleRows) ? raffleRows : []).forEach((result, index) => {
        const raffle = safeJson(result && result.result, null);
        const participants = safeJson(participantRows && participantRows[index] && participantRows[index].result, null);
        if (raffle && !Array.isArray(raffle.participants) && Array.isArray(participants)) raffle.participants = participants;
        if (indexedIds.backfill && raffle) indexCommands.push(...raffleStatsIndexCommands(raffle, batch[index]));
        collectRaffle(raffle ? { result: JSON.stringify(raffle) } : result);
      });
      if (indexCommands.length) {
        const indexRows = await redisPipeline(indexCommands, { timeoutMs: 9000 });
        if (!Array.isArray(indexRows) || indexRows.some((row) => row && row.error)) backfillIndexOk = false;
      }
    }
    if (indexedIds.backfill && backfillIndexOk) {
      await redisPipeline([["SET", RAFFLE_STATS_INDEX_READY_KEY, "1"]], { timeoutMs: 3000 });
    }
    const issuedRecipients = Array.from(issuedByPerson.values()).sort((a, b) => b.totalAmount - a.totalAmount || a.name.localeCompare(b.name));
    returnedRecipients.sort((a, b) => String(b.returnedAt || "").localeCompare(String(a.returnedAt || "")) || Number(b.amount || 0) - Number(a.amount || 0));
    return { available: true, uniqueParticipants: participantKeys.size, uniqueWinners: winnerKeys.size, issuedPrizeAmount, issuedCashAmount, returnedAmount, returnedCashAmount, returnedTicketAmount, returnCount, issuedTicketAmount, issuedRecipients, returnedRecipients, recipientsPending: !includeRaffleRecipients, issuedByAdmin, issuedByAdminBreakdown };
  }, warnings) : {
    available: false,
    pending: true,
    uniqueParticipants: 0,
    uniqueWinners: 0,
    issuedPrizeAmount: 0,
    issuedCashAmount: 0,
    returnedAmount: 0,
    returnedCashAmount: 0,
    returnedTicketAmount: 0,
    returnCount: 0,
    issuedTicketAmount: 0,
    recipientsPending: true,
  };
  if (includeRaffleStats && statsSummary.raffles && statsSummary.raffles.available !== false) {
    const calculationDraftKey = !statsRange
      ? "1"
      : /^(current_week|last_week)$/.test(rangeKey)
        ? String(statsRange.fromMs)
        : String(statsRange.from).replace(/\D/g, "") + String(statsRange.to).replace(/\D/g, "");
    const calculationDraftRows = await optionalCrmStep(
      "raffle-ticket-return-adjustment",
      [],
      () => redisPipeline([["GET", CALCULATION_DRAFT_KEY_PREFIX + calculationDraftKey]], { timeoutMs: 9000 }),
      warnings
    );
    const storedCalculationDraft = safeJson(calculationDraftRows && calculationDraftRows[0] && calculationDraftRows[0].result, null);
    const rawTicketReturn = storedCalculationDraft && storedCalculationDraft.draft
      ? storedCalculationDraft.draft.raffleTicketsReturn
      : 0;
    const manualTicketReturn = Number(String(rawTicketReturn == null ? "" : rawTicketReturn).replace(/\s+/g, "").replace(",", ".")) || 0;
    statsSummary.raffles.manualReturnedTicketAmount = manualTicketReturn;
    statsSummary.raffles.returnedTicketAmount = (Number(statsSummary.raffles.returnedTicketAmount) || 0) + manualTicketReturn;
  }
  statsSummary.visits.sections = analyticsSummary && analyticsSummary.available
    ? (analyticsSummary.sections || []).map((row) => ({
      section: row.name,
      count: row.events,
      uniqueVisitors: row.uniqueVisitors,
      guestInstallations: row.guestInstallations,
      registeredVisitors: row.registeredVisitors,
      exact: true,
    }))
    : computeSectionViewsSummary(sectionViewsAll, sectionViewDayResults, statsRange, statsSummary.visits && statsSummary.visits.total);
  const sourceAnalytics = computeSourceAnalytics(players, rangeKey);
  const chartVisitDailySummary = includeHeavy && chartStatsRange && (!statsRange || chartStatsRange.from !== statsRange.from || chartStatsRange.to !== statsRange.to)
    ? await readVisitDailySummary(dateKeysBetween(chartStatsRange.from, chartStatsRange.to), visitorFirstSeen, chartStatsRange, visits, visitDailyBounds)
    : visitDailySummary;
  const chartExactAnalytics = includeHeavy
    ? ((statsRange && chartStatsRange && statsRange.from === chartStatsRange.from && statsRange.to === chartStatsRange.to) || (!statsRange && !chartStatsRange)
      ? analyticsSummary
      : await optionalCrmStep("exact-chart-analytics", null, () => readAnalyticsSummary(chartStatsRange), warnings))
    : null;
  const [chartAnalytics, chatStats] = includeHeavy
    ? await Promise.all([
      optionalCrmStep(
        "chart-analytics",
        null,
        () => computeChartAnalytics({ players, registeredAccounts, pokerPlusAccounts, eventsByAccount, range: chartStatsRange, rangeKey: chartRangeKey, visitDailySummary: chartVisitDailySummary, exactAnalytics: chartExactAnalytics }),
        warnings
      ),
      mode === "chart"
        ? null
        : optionalCrmStep(
          "chat-stats",
          null,
          () => safeComputeChatStats(statsRange, { usernames, displayNames, dtIds }),
          warnings
        ),
    ])
    : [null, null];
  if (mode === "chart") {
    return {
      source: "redis-live",
      chartAnalytics,
      chartRange: chartRange ? { key: "custom", from: chartRange.from, to: chartRange.to } : { key: chartRangeKey },
      crmWarnings: warnings,
    };
  }
  return {
    source: "redis-live",
    players,
    registeredAccounts,
    blockedUsers: blockedUsersPublic,
    pokerPlusAccounts,
    statsSummary,
    sourceAnalytics,
    chartAnalytics,
    chatStats,
    heavyPending: !includeHeavy,
    campaigns: campaignsWithMetrics,
    pushConfigured: readVapidEnv().pushConfigured,
    range: range ? { key: "custom", from: range.from, to: range.to } : { key: rangeKey },
    chartRange: chartRange ? { key: "custom", from: chartRange.from, to: chartRange.to } : { key: chartRangeKey },
    crmWarnings: warnings,
  };
}

async function savePlayer(body) {
  const accountId = String(body.accountId || body.id || "").trim();
  if (!accountId) return { status: 400, json: { ok: false, error: "Missing player id" } };
  const payload = {
    manager: String(body.manager || "").trim().slice(0, 80),
    source: String(body.source || "").trim().slice(0, 120),
    note: String(body.note || "").trim().slice(0, 1000),
    tags: Array.isArray(body.tags)
      ? body.tags.map((t) => String(t).trim()).filter(Boolean).slice(0, 12)
      : String(body.tags || "").split(",").map((t) => t.trim()).filter(Boolean).slice(0, 12),
    excludeBroadcast: body.excludeBroadcast === true,
    updatedAt: nowIso(),
  };
  await redisPipeline([["HSET", CRM_OVERRIDES_HASH, accountId, JSON.stringify(payload)]]);
  return { status: 200, json: { ok: true, player: payload } };
}

async function setPlayerAppBlock(body, blocked, permissions, auth) {
  if (!permissions || permissions.role !== "owner") {
    return { status: 403, json: { ok: false, error: "Блокировка игроков доступна только владельцу CRM" } };
  }
  const targetId = String(body.targetId || body.accountId || body.id || body.userId || "").trim();
  if (!targetId) return { status: 400, json: { ok: false, error: "Не указан игрок" } };
  const reason = String(body.reason || "").trim();
  const adminName = String(
    (auth && auth.identity && (auth.identity.telegramUsername || auth.identity.pwaUsername || auth.identity.email)) ||
    auth && auth.memberId ||
    ""
  ).trim();
  const result = await setAppUserBlocked(targetId, blocked, {
    reason,
    adminId: auth && auth.memberId,
    adminName,
    targetLabel: body.targetLabel || body.name || "",
  });
  if (!result || result.ok === false) {
    return { status: 400, json: { ok: false, error: (result && result.error) || "Не удалось изменить блокировку" } };
  }
  return { status: 200, json: { ok: true, blocked: !!blocked, block: result } };
}

async function recordEvent(body) {
  const accountId = String(body.accountId || body.id || "").trim();
  const type = String(body.type || "").trim();
  if (!accountId || !["deposit", "message"].includes(type)) {
    return { status: 400, json: { ok: false, error: "Missing player or event type" } };
  }
  const event = {
    id: "ev_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8),
    type,
    amount: Math.max(0, Number(body.amount) || 0),
    note: String(body.note || "").trim().slice(0, 240),
    at: body.at && Number.isFinite(Date.parse(String(body.at))) ? new Date(String(body.at)).toISOString() : nowIso(),
    createdAt: nowIso(),
  };
  await redisPipeline([
    ["LPUSH", CRM_EVENTS_PREFIX + accountId, JSON.stringify(event)],
    ["LTRIM", CRM_EVENTS_PREFIX + accountId, "0", "199"],
  ]);
  return { status: 200, json: { ok: true, event } };
}

async function linkIdentity(body) {
  const accountId = String(body.accountId || body.id || "").trim();
  const dtId = String(body.dtId || body.dt_id || "").trim().toUpperCase();
  const telegramId = normalizeTgId(body.telegramId || body.telegram_id || "");
  const pokerPlusId = String(body.pokerPlusId || body.pokerplusId || body.poker_plus_id || "").trim();
  const username = String(body.username || "").replace(/^@+/, "").trim().slice(0, 80);
  const displayName = String(body.displayName || body.name || "").trim().slice(0, 120);
  if (!accountId && !dtId && !telegramId) return { status: 400, json: { ok: false, error: "Не хватает ID для связки" } };
  const primary = /^ID\d{6}$/.test(dtId) ? dtId : accountId;
  const commands = [];
  if (telegramId && /^ID\d{6}$/.test(dtId)) {
    commands.push(["HSET", DT_IDS_HASH, telegramId, dtId]);
    commands.push(["HSET", ID_TO_USER_HASH, dtId, telegramId]);
  }
  if (pokerPlusId && primary) commands.push(["HSET", POKERPLUS_BIND_HASH, primary, pokerPlusId]);
  if (username && telegramId) commands.push(["HSET", USERNAMES_HASH, telegramId, username]);
  if (displayName && primary) commands.push(["HSET", DISPLAY_NAMES_HASH, primary, displayName]);
  if (!commands.length) return { status: 400, json: { ok: false, error: "Нечего сохранять" } };
  await redisPipeline(commands);
  return { status: 200, json: { ok: true, accountId: primary, telegramId, dtId, pokerPlusId } };
}

async function recordTouch(accountId, touch) {
  const id = String(accountId || "").trim();
  if (!id) return;
  const payload = {
    id: "touch_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8),
    at: nowIso(),
    ...touch,
  };
  await redisPipeline([
    ["LPUSH", CRM_TOUCH_PREFIX + id, JSON.stringify(payload)],
    ["LTRIM", CRM_TOUCH_PREFIX + id, "0", "49"],
  ]);
}

function touchBlocked(player) {
  if (!player || !Array.isArray(player.touches) || !player.touches.length) return false;
  const last = player.touches[0];
  const at = Date.parse(String(last.at || last.createdAt || ""));
  if (!Number.isFinite(at)) return false;
  return Date.now() - at < CRM_TOUCH_MIN_HOURS * 3600000;
}

function resolveAudience(players, ids, segment, rangeKey) {
  const wanted = new Set((ids || []).map((id) => String(id)));
  const key = rangeKey || "30";
  let list = wanted.size ? players.filter((p) => wanted.has(p.id) || wanted.has(p.accountId)) : [];
  if (!list.length && segment) {
    list = players.filter((p) => {
      if (segment === "active_30") return p.deposits[key] > 0 || p.messages[key] > 0;
      if (segment === "has_deposit") return p.deposits[key] > 0;
      if (segment === "no_deposit") return false;
      if (segment === "has_bot") return !!(p.channels && p.channels.bot);
      if (segment === "has_push") return !!(p.channels && p.channels.push);
      if (segment === "tournament") return false;
      if (segment === "needs_touch") return false;
      return true;
    });
  }
  return list.filter((p) => !(p.crm && p.crm.excludeBroadcast));
}

function fallbackAudienceFromIds(ids) {
  return unique((Array.isArray(ids) ? ids : []).map((id) => String(id || "").trim()).filter(Boolean))
    .map((id) => makeEmptyPlayer(id));
}

async function saveCampaign(campaign) {
  await redisPipeline([
    ["LPUSH", CRM_CAMPAIGNS_LIST, JSON.stringify(campaign)],
    ["LTRIM", CRM_CAMPAIGNS_LIST, "0", "49"],
  ]);
}

function normalizeCampaignProgressId(value) {
  const id = String(value || "").trim().slice(0, 96);
  return /^[A-Za-z0-9_-]{8,96}$/.test(id) ? id : "";
}

async function writeCampaignProgress(progressId, progress) {
  const id = normalizeCampaignProgressId(progressId);
  if (!id || !redisConfigured()) return;
  const payload = {
    ...(progress && typeof progress === "object" ? progress : {}),
    progressId: id,
    updatedAt: nowIso(),
  };
  await redisPipeline([
    ["SET", CRM_CAMPAIGN_PROGRESS_PREFIX + id, JSON.stringify(payload), "EX", "7200"],
  ], { timeoutMs: 2500 });
}

async function readCampaignProgress(progressId) {
  const id = normalizeCampaignProgressId(progressId);
  if (!id || !redisConfigured()) return null;
  const result = await redisPipeline([["GET", CRM_CAMPAIGN_PROGRESS_PREFIX + id]], { timeoutMs: 2500 });
  const raw = result && result[0] ? result[0].result : null;
  return safeJson(raw, null);
}

async function writeCampaignJob(jobId, job) {
  const id = normalizeCampaignProgressId(jobId);
  if (!id || !redisConfigured()) return;
  await redisPipeline([
    ["SET", CRM_CAMPAIGN_JOB_PREFIX + id, JSON.stringify(job || {}), "EX", "7200"],
  ], { timeoutMs: 5000 });
}

async function readCampaignJob(jobId) {
  const id = normalizeCampaignProgressId(jobId);
  if (!id || !redisConfigured()) return null;
  const result = await redisPipeline([["GET", CRM_CAMPAIGN_JOB_PREFIX + id]], { timeoutMs: 5000 });
  const raw = result && result[0] ? result[0].result : null;
  return safeJson(raw, null);
}

function campaignDeliveryId(player) {
  return String((player && (player.accountId || player.id)) || "").trim();
}

function pendingCampaignIds(progress) {
  if (!progress || typeof progress !== "object") return [];
  if (Array.isArray(progress.pendingIds)) return unique(progress.pendingIds.map((id) => String(id || "").trim()).filter(Boolean));
  const allIds = unique((Array.isArray(progress.allIds) ? progress.allIds : []).map((id) => String(id || "").trim()).filter(Boolean));
  const sent = new Set((Array.isArray(progress.sentIds) ? progress.sentIds : []).map((id) => String(id || "").trim()).filter(Boolean));
  return allIds.filter((id) => !sent.has(id));
}

async function purgeBlockedCampaignSubscribers(body, permissions) {
  if (!permissions.canSendCampaign) {
    return { status: 403, json: { ok: false, error: "Недостаточно прав для очистки подписчиков" } };
  }
  const progressId = normalizeCampaignProgressId(body.progressId || body.campaignProgressId || body.jobId);
  if (!progressId) {
    return { status: 400, json: { ok: false, error: "Не указан ID рассылки." } };
  }
  const [progress, job] = await Promise.all([readCampaignProgress(progressId), readCampaignJob(progressId)]);
  if (!progress || !job) {
    return { status: 404, json: { ok: false, error: "Отчёт рассылки уже недоступен. Обнови отчёт и повтори." } };
  }
  const alreadyPurged = new Set((Array.isArray(progress.purgedBlockedIds) ? progress.purgedBlockedIds : [])
    .map((id) => String(id || "").trim()).filter(Boolean));
  const blockedDeliveryIds = unique((Array.isArray(progress.deliveryLog) ? progress.deliveryLog : [])
    .filter((row) => row && row.status !== "delivered" && row.reason === "user_blocked")
    .map((row) => String(row.userId || "").trim())
    .filter((id) => id && !alreadyPurged.has(id)));
  const audienceById = new Map((Array.isArray(job.audience) ? job.audience : []).map((player) => [campaignDeliveryId(player), player]));
  const telegramIds = unique(blockedDeliveryIds.reduce((ids, deliveryId) => {
    const player = audienceById.get(deliveryId);
    const candidates = player && Array.isArray(player.telegramIds) ? player.telegramIds : [];
    if (!candidates.length && /^(?:tg_)?\d+$/.test(deliveryId)) candidates.push(deliveryId);
    return ids.concat(candidates.map((id) => toNumericTelegramId(id)).filter(Boolean));
  }, []));
  if (!telegramIds.length) {
    return { status: 200, json: { ok: true, removed: 0, blocked: blockedDeliveryIds.length, progress } };
  }
  const timestamp = Date.now();
  const commands = [];
  blockedDeliveryIds.forEach((accountId) => {
    commands.push(["SREM", RAFFLE_ACCOUNT_SUBS_KEY, accountId]);
  });
  telegramIds.forEach((numericId) => {
    const tgId = normalizeTgId(numericId);
    [GAZETTE_SUBS_KEY, RATING_SUBS_KEY, RAFFLE_SUBS_KEY].forEach((key) => {
      commands.push(["SREM", key, numericId, tgId]);
    });
    commands.push(["SREM", VISITORS_KEY, numericId, tgId]);
    commands.push(["HDEL", BOT_SUBSCRIBED_AT_HASH, numericId, tgId]);
    commands.push(["HSET", BOT_UNSUBSCRIBED_AT_HASH, numericId, String(timestamp), tgId, String(timestamp)]);
  });
  await redisPipeline(commands, { timeoutMs: 10000, context: "crm.purge-blocked-subscribers" });
  const nextProgress = {
    ...progress,
    purgedBlockedIds: unique(Array.from(alreadyPurged).concat(blockedDeliveryIds)),
    purgedBlockedAt: nowIso(),
  };
  await writeCampaignProgress(progressId, nextProgress);
  return {
    status: 200,
    json: { ok: true, removed: telegramIds.length, blocked: blockedDeliveryIds.length, progress: nextProgress },
  };
}

function campaignImageFromBody(body) {
  const telegramFileId = String(body.imageTelegramFileId || body.photoTelegramFileId || "").trim().slice(0, 256);
  if (telegramFileId && !/^[A-Za-z0-9_-]{10,256}$/.test(telegramFileId)) {
    return { error: "Telegram-картинка не прочиталась." };
  }
  const rawDataUrl = String(body.imageDataUrl || body.photoDataUrl || "").trim();
  const rawBase64 = String(body.imageBase64 || body.photoBase64 || "").trim();
  let mimeType = String(body.imageMimeType || body.photoMimeType || "image/jpeg").trim().toLowerCase();
  let base64 = "";
  const m = rawDataUrl.match(/^data:(image\/(?:jpeg|jpg|png|webp|gif));base64,([0-9A-Za-z+/=\s]+)$/i);
  if (m) {
    mimeType = m[1].toLowerCase() === "image/jpg" ? "image/jpeg" : m[1].toLowerCase();
    base64 = m[2].replace(/\s/g, "");
  } else if (rawBase64) {
    if (!/^image\/(jpeg|jpg|png|webp|gif)$/i.test(mimeType)) mimeType = "image/jpeg";
    if (mimeType === "image/jpg") mimeType = "image/jpeg";
    base64 = rawBase64.replace(/^data:image\/(?:jpeg|jpg|png|webp|gif);base64,/i, "").replace(/\s/g, "");
  }
  if (!base64) {
    if (!telegramFileId) return { image: null };
    return {
      image: {
        dataUrl: "",
        telegramFileId,
        mimeType: "image/jpeg",
        name: String(body.imageName || body.photoName || "telegram-post.jpg").trim().slice(0, 120) || "telegram-post.jpg",
        size: 0,
        hash: crypto.createHash("sha1").update(telegramFileId).digest("hex").slice(0, 12),
      },
    };
  }
  if (base64.length > 1300000) return { error: "Картинка слишком большая. Прикрепи файл поменьше." };
  let buffer;
  try {
    buffer = Buffer.from(base64, "base64");
  } catch (e) {
    return { error: "Картинка не прочиталась." };
  }
  if (!buffer || buffer.length < 16 || buffer.length > 1000000) {
    return { error: "Картинка слишком большая. Прикрепи файл поменьше." };
  }
  const name = String(body.imageName || body.photoName || "image.jpg").trim().slice(0, 120) || "image.jpg";
  const hash = crypto.createHash("sha1").update(buffer).digest("hex").slice(0, 12);
  return {
    image: {
      dataUrl: "data:" + mimeType + ";base64," + base64,
      telegramFileId: "",
      mimeType,
      name,
      size: buffer.length,
      hash,
    },
  };
}

function campaignButtonFromBody(body) {
  const rawButtons = Array.isArray(body.buttons) ? body.buttons.slice(0, 2) : [];
  if (!rawButtons.length && (body.buttonText || body.buttonUrl || body.ctaText || body.ctaUrl)) {
    rawButtons.push({ text: body.buttonText || body.ctaText, url: body.buttonUrl || body.ctaUrl });
  }
  const buttons = [];
  for (let i = 0; i < rawButtons.length; i++) {
    const raw = rawButtons[i] || {};
    const buttonText = String(raw.text || raw.buttonText || "").trim().slice(0, 64);
    const buttonUrl = String(raw.url || raw.buttonUrl || "").trim().slice(0, 512);
    if (!buttonText && !buttonUrl) continue;
    if (!buttonText || !buttonUrl) {
      return { error: "Заполните название и ссылку кнопки " + (i + 1) + " или оставьте оба поля пустыми." };
    }
    if (!/^https?:\/\//i.test(buttonUrl)) {
      return { error: "Ссылка кнопки " + (i + 1) + " должна начинаться с http:// или https://." };
    }
    buttons.push({ text: buttonText, url: buttonUrl });
  }
  if (!buttons.length) return { button: null, buttons: [] };
  return { button: buttons[0], buttons };
}

const CRM_INNER_FILTERS = new Set(["bot_only", "no_touch_24h", "has_deposit", "inactive_30d", "push_no_bot"]);

function normalizeCampaignInnerFilters(raw) {
  const list = Array.isArray(raw)
    ? raw
    : String(raw || "").split(",");
  return unique(list.map((item) => String(item || "").trim()).filter((item) => CRM_INNER_FILTERS.has(item))).slice(0, 8);
}

function campaignPlayerLastTouchMs(player) {
  const touches = Array.isArray(player && player.touches) ? player.touches : [];
  for (const touch of touches) {
    const ms = Date.parse(String((touch && (touch.at || touch.createdAt)) || ""));
    if (Number.isFinite(ms)) return ms;
  }
  return 0;
}

function campaignMatchesInnerFilter(player, filter, rangeKey) {
  const p = player || {};
  const channels = p.channels || {};
  if (filter === "bot_only") return !!channels.bot;
  if (filter === "push_no_bot") return !!channels.push && !channels.bot;
  if (filter === "has_deposit") {
    const deposits = p.deposits || {};
    const key = rangeKey || "30";
    return (Number(deposits[key]) || 0) > 0 || (Number(deposits.all) || 0) > 0;
  }
  if (filter === "no_touch_24h") {
    const lastMs = campaignPlayerLastTouchMs(p);
    if (!lastMs) return true;
    return Date.now() - lastMs >= 24 * 3600000;
  }
  if (filter === "inactive_30d") {
    const values = [p.lastMessageDays, p.lastDepositDays, p.lastTouchDays]
      .map((value) => Number(value))
      .filter((value) => Number.isFinite(value));
    if (!values.length) return true;
    return Math.min(...values) >= 30;
  }
  return true;
}

function applyCampaignInnerFilters(audience, filters, rangeKey) {
  const list = Array.isArray(audience) ? audience : [];
  const selected = normalizeCampaignInnerFilters(filters);
  if (!selected.length) return list;
  return list.filter((player) => selected.every((filter) => campaignMatchesInnerFilter(player, filter, rangeKey)));
}

function campaignTextSignature(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 240);
}

function campaignTelegramHtml(text) {
  const source = String(text || "");
  const escapeText = (value) => String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const escapeAttribute = (value) => String(value || "")
    .replace(/&(?:amp;)?/g, "&")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const tagPattern = /<\/?(?:b|strong|i|em)>|<a\s+href="(https?:\/\/[^"]+)"\s*>|<\/a>/gi;
  let result = "";
  let lastIndex = 0;
  let match;
  while ((match = tagPattern.exec(source))) {
    result += escapeText(source.slice(lastIndex, match.index));
    result += match[1]
      ? `<a href="${escapeAttribute(match[1])}">`
      : match[0].toLowerCase();
    lastIndex = tagPattern.lastIndex;
  }
  return result + escapeText(source.slice(lastIndex));
}

function campaignStableHash(parts, length = 16) {
  return crypto.createHash("sha1").update(parts.map((part) => String(part == null ? "" : part)).join("|")).digest("hex").slice(0, length);
}

function campaignAudienceHash(ids) {
  return campaignStableHash(unique((ids || []).map((id) => String(id || "").trim()).filter(Boolean)).sort(), 16);
}

function campaignContentHash({ text, image, button, buttons }) {
  const buttonParts = Array.isArray(buttons) && buttons.length
    ? buttons.flatMap((btn) => [btn && btn.text, btn && btn.url])
    : [button && button.text, button && button.url];
  return campaignStableHash([
    campaignTextSignature(text),
    image && image.hash,
    ...buttonParts,
  ], 16);
}

async function readRecentCampaigns(limit = 50) {
  if (!redisConfigured()) return [];
  const result = await redisPipeline([["LRANGE", CRM_CAMPAIGNS_LIST, "0", String(Math.max(0, limit - 1))]], { timeoutMs: 5000 });
  const raw = result && result[0] && Array.isArray(result[0].result) ? result[0].result : [];
  return raw.map((line) => safeJson(line, null)).filter(Boolean);
}

function campaignAudienceOverlapRatio(aIds, bIds) {
  const a = unique((aIds || []).map((id) => String(id || "").trim()).filter(Boolean));
  const b = unique((bIds || []).map((id) => String(id || "").trim()).filter(Boolean));
  if (!a.length || !b.length) return 0;
  const bSet = new Set(b);
  const hits = a.filter((id) => bSet.has(id)).length;
  return hits / Math.max(1, Math.min(a.length, b.length));
}

async function findSimilarCampaignToday(campaign, audienceIds) {
  if (!campaign || !redisConfigured()) return null;
  const today = nowIso().slice(0, 10);
  const recent = await readRecentCampaigns(50);
  const ids = unique((audienceIds || []).map((id) => String(id || "").trim()).filter(Boolean));
  const textSig = campaign.textSignature || campaignTextSignature(campaign.text);
  const contentHash = campaign.contentHash || "";
  const audienceHashValue = campaign.audienceHash || campaignAudienceHash(ids);
  for (const candidate of recent) {
    if (!candidate || candidate.id === campaign.id) continue;
    if (!candidate.createdAt || String(candidate.createdAt).slice(0, 10) !== today) continue;
    if (["draft", "test", "test_failed"].includes(String(candidate.status || ""))) continue;
    if (Number(candidate.delivered || candidate.sentBot || candidate.sentPush || 0) <= 0) continue;
    const candidateSig = candidate.textSignature || campaignTextSignature(candidate.text);
    const sameContent = (contentHash && candidate.contentHash === contentHash) || (textSig && candidateSig === textSig);
    if (!sameContent) continue;
    const candidateIds = campaignAudienceIdsFromRecord(candidate);
    const overlap = campaignAudienceOverlapRatio(ids, candidateIds);
    const sameHash = audienceHashValue && candidate.audienceHash === audienceHashValue;
    const sameCountFallback = !candidateIds.length && Number(candidate.audience) > 0 && Number(candidate.audience) === ids.length;
    if (sameHash || overlap >= 0.7 || sameCountFallback) {
      return {
        id: candidate.id,
        createdAt: candidate.createdAt,
        overlap,
        audience: candidate.audience || candidateIds.length,
      };
    }
  }
  return null;
}

function buildCampaignTrackingUrl(startParam) {
  const base = resolveTelegramOpenButtonUrl(CRM_DEFAULT_MINI_APP_URL) || CRM_DEFAULT_MINI_APP_URL;
  try {
    const url = new URL(base);
    url.searchParams.set("startapp", startParam);
    return url.toString();
  } catch (e) {
    return String(base || "").replace(/\/$/, "") + (String(base || "").indexOf("?") >= 0 ? "&" : "?") + "startapp=" + encodeURIComponent(startParam);
  }
}

function withCampaignUtm(rawUrl, campaign, channel) {
  const url = String(rawUrl || "").trim();
  if (!/^https?:\/\//i.test(url)) return url;
  try {
    const parsed = new URL(url);
    const values = {
      utm_source: "crm",
      utm_medium: channel || campaign.channel || "bot",
      utm_campaign: campaign.id,
      crm_campaign_id: campaign.id,
    };
    Object.keys(values).forEach((key) => {
      if (!parsed.searchParams.get(key)) parsed.searchParams.set(key, values[key]);
    });
    return parsed.toString();
  } catch (e) {
    return url;
  }
}

function campaignTrackingParams(originalUrl, campaign, channel) {
  const targetUrl = withCampaignUtm(originalUrl, campaign, channel);
  const params = {
    created_from: "crm_broadcast",
    campaign_id: campaign.id,
    crm_campaign_id: campaign.id,
    utm_source: "crm",
    utm_medium: channel || campaign.channel || "bot",
    utm_campaign: campaign.id,
    target_label: campaign.buttonText || "",
  };
  try {
    const parsed = new URL(targetUrl);
    const startApp = String(parsed.searchParams.get("startapp") || "").trim();
    if (startApp && !safeTrackSlug(startApp)) {
      params.target_startapp = startApp;
      params.target_section = startApp;
      return params;
    }
  } catch (e) {}
  params.target_url = targetUrl;
  return params;
}

async function createCampaignTrackingLink(campaign, originalUrl, channel, adminId) {
  if (!redisConfigured()) return null;
  let slug = "";
  for (let attempt = 0; attempt < 12; attempt++) {
    const candidate = crypto.randomBytes(4).toString("hex");
    const exists = await redisPipeline([["HGET", TRACK_META_HASH, candidate]], { timeoutMs: 2500 });
    if (!exists || !exists[0] || !exists[0].result) {
      slug = candidate;
      break;
    }
  }
  if (!slug) return null;
  const now = Date.now();
  const params = campaignTrackingParams(originalUrl, campaign, channel);
  const meta = {
    label: "CRM " + campaign.id,
    params,
    createdAt: new Date(now).toISOString(),
    createdBy: adminId || "crm",
  };
  const pipe = await redisPipeline([
    ["ZADD", TRACK_Z_INDEX, String(now), slug],
    ["HSET", TRACK_META_HASH, slug, JSON.stringify(meta)],
    ["HSET", TRACK_TOTALS_HASH, slug, "0"],
    ["HSET", TRACK_UNIQUE_HASH, slug, "0"],
  ], { timeoutMs: 5000 });
  if (!pipe || pipe.some((r) => r && r.error)) return null;
  const startParam = "ref_" + slug;
  return {
    id: slug,
    startParam,
    url: buildCampaignTrackingUrl(startParam),
    params,
  };
}

async function ensureCampaignTrackingButton(campaign, button, channel, adminId, autoTrack) {
  if (!campaign || !button || autoTrack === false) return button;
  const existingSlug = trackingSlugFromUrl(button.url);
  if (existingSlug) {
    campaign.trackingLinkId = existingSlug;
    campaign.trackingUrl = button.url;
    campaign.originalButtonUrl = button.url;
    return button;
  }
  const originalUrl = button.url;
  const link = await createCampaignTrackingLink(campaign, originalUrl, channel, adminId);
  if (!link || !link.url) return button;
  campaign.trackingLinkId = link.id;
  campaign.trackingStartParam = link.startParam;
  campaign.trackingUrl = link.url;
  campaign.originalButtonUrl = originalUrl;
  campaign.buttonUrl = link.url;
  return { ...button, url: link.url, originalUrl };
}

function campaignAudienceForJob(audience) {
  return (Array.isArray(audience) ? audience : []).map((p) => ({
    id: String((p && p.id) || "").trim(),
    accountId: String((p && (p.accountId || p.id)) || "").trim(),
    telegramIds: Array.isArray(p && p.telegramIds) ? p.telegramIds.map((id) => String(id || "").trim()).filter(Boolean) : [],
  })).filter((p) => p.accountId || p.id);
}

function emptyCampaignProgress(status, campaign, allIds, meta) {
  const startedAt = meta && meta.startedAt ? meta.startedAt : nowIso();
  const pendingIds = unique(Array.isArray(allIds) ? allIds : []);
  return {
    status,
    campaignId: campaign.id,
    total: pendingIds.length,
    processed: 0,
    delivered: 0,
    notSent: pendingIds.length,
    perSecond: 0,
    etaSeconds: null,
    concurrency: meta && meta.concurrency,
    sentBot: 0,
    sentPush: 0,
    failed: 0,
    skippedAntispam: campaign.skippedAntispam || 0,
    segment: campaign.segment,
    channel: campaign.channel,
    allIds: pendingIds,
    sentIds: [],
    failedIds: [],
    processedIds: [],
    pendingIds,
    asyncJob: true,
    jobId: meta && meta.jobId,
    resumeFromProgressId: campaign.resumeFromProgressId || undefined,
    startedAt,
  };
}

async function runCampaign(body, shouldSend, permissions, auth) {
  if (shouldSend && !permissions.canSendCampaign) {
    return { status: 403, json: { ok: false, error: "Недостаточно прав для отправки рассылки" } };
  }
  const progressId = shouldSend ? normalizeCampaignProgressId(body.progressId || body.campaignProgressId) : "";
  const resumeProgressId = shouldSend ? normalizeCampaignProgressId(body.resumeProgressId || body.resumeCampaignProgressId) : "";
  const resumeProgress = resumeProgressId ? await readCampaignProgress(resumeProgressId) : null;
  const resumeAudienceIds = pendingCampaignIds(resumeProgress);
  if (resumeProgressId && !resumeAudienceIds.length) {
    return { status: 409, json: { ok: false, error: "В этой рассылке нет оставшихся получателей.", code: "crm_campaign_no_pending_recipients" } };
  }
  const requestedAudienceIds = resumeAudienceIds.length ? resumeAudienceIds : body.audienceIds;
  const startedAt = nowIso();
  const range = rangeFromInput(body.range);
  const rangeKey = range ? "custom" : periodFromInput(body.period);
  const segment = String(body.segment || "").trim().slice(0, 80);
  const channel = String(body.channel || "bot").trim().slice(0, 24);
  const text = String(body.text || "").trim().slice(0, 1200);
  const innerFilters = normalizeCampaignInnerFilters(body.innerFilters || body.audienceFilters || body.filters);
  const imageParsed = campaignImageFromBody(body);
  if (imageParsed.error) return { status: 400, json: { ok: false, error: imageParsed.error } };
  const campaignImage = imageParsed.image;
  const buttonParsed = campaignButtonFromBody(body);
  if (buttonParsed.error) return { status: 400, json: { ok: false, error: buttonParsed.error } };
  const campaignButton = buttonParsed.button;
  const campaignButtons = Array.isArray(buttonParsed.buttons) ? buttonParsed.buttons : (campaignButton ? [campaignButton] : []);
  let real = null;
  let audienceBuildWarning = "";
  if (progressId) {
    await writeCampaignProgress(progressId, {
      status: "building",
      total: 0,
      processed: 0,
      sentBot: 0,
      sentPush: 0,
      failed: 0,
      segment,
      channel,
      startedAt,
    });
  }
  try {
    real = await buildRealPlayers({ range, period: rangeKey, mode: "send" });
  } catch (error) {
    logCrmIssue("campaign audience build failed", error);
    audienceBuildWarning = crmPublicErrorDetail(error) || "crm_campaign_audience_build_failed";
    if (shouldSend) {
      if (progressId) {
        await writeCampaignProgress(progressId, {
          status: "failed",
          total: 0,
          processed: 0,
          sentBot: 0,
          sentPush: 0,
          failed: 1,
          segment,
          channel,
          error: "CRM не смогла собрать контакты для отправки.",
          details: audienceBuildWarning,
          startedAt,
          finishedAt: nowIso(),
        });
      }
      return {
        status: 500,
        json: {
          ok: false,
          error: "CRM не смогла собрать контакты для отправки. Обнови дашборд и попробуй ещё раз.",
          code: "crm_campaign_audience_failed",
          details: audienceBuildWarning,
        },
      };
    }
    real = { players: fallbackAudienceFromIds(requestedAudienceIds), crmWarnings: ["campaign-audience-fallback"] };
  }
  let rawAudience = resolveAudience(real.players || [], requestedAudienceIds, segment, rangeKey);
  if (!rawAudience.length && !shouldSend && Array.isArray(requestedAudienceIds) && requestedAudienceIds.length) {
    rawAudience = fallbackAudienceFromIds(requestedAudienceIds);
    if (!audienceBuildWarning) audienceBuildWarning = "CRM собрала черновик по выбранным ID без полной карточки аудитории.";
  }
  const filteredAudience = applyCampaignInnerFilters(rawAudience, innerFilters, rangeKey);
  const audience = filteredAudience;
  const skippedAntispam = 0;
  if (!segment || (!text && !campaignImage)) return { status: 400, json: { ok: false, error: "Укажите сегмент и текст или картинку" } };
  if (shouldSend && !audience.length && Array.isArray(requestedAudienceIds) && requestedAudienceIds.length) {
    if (progressId) {
      await writeCampaignProgress(progressId, {
        status: "failed",
        total: 0,
        processed: 0,
        sentBot: 0,
        sentPush: 0,
        failed: 0,
        segment,
        channel,
        error: "CRM не нашла контакты выбранной аудитории для отправки.",
        startedAt,
        finishedAt: nowIso(),
      });
    }
    return {
      status: 409,
      json: {
        ok: false,
        error: "CRM не нашла контакты выбранной аудитории для отправки. Нажми «Подготовить рассылку» или обнови дашборд.",
        code: "crm_campaign_empty_contacts",
      },
    };
  }

  const campaign = {
    id: "crm_" + crypto.createHash("sha1").update([segment, channel, text, campaignImage && campaignImage.hash, Date.now()].join("|")).digest("hex").slice(0, 10),
    status: shouldSend ? "sent" : "draft",
    segment,
    channel,
    text,
    hasImage: !!campaignImage,
    image: campaignImage ? {
      name: campaignImage.name,
      mimeType: campaignImage.mimeType,
      size: campaignImage.size,
      hash: campaignImage.hash,
      telegramFileId: campaignImage.telegramFileId || undefined,
    } : null,
    hasButton: !!campaignButton,
    buttonText: campaignButton ? campaignButton.text : "",
    buttonUrl: campaignButton ? campaignButton.url : "",
    buttons: campaignButtons,
    innerFilters,
    audience: audience.length,
    sentBot: 0,
    sentPush: 0,
    pushOpens: 0,
    pushClicks: 0,
    pushOpenUsers: 0,
    failed: 0,
    skippedAntispam,
    warning: audienceBuildWarning || undefined,
    progressId: progressId || undefined,
    resumeFromProgressId: resumeProgressId || undefined,
    createdAt: nowIso(),
  };
  const campaignAudienceIds = unique(audience.map(campaignDeliveryId).filter(Boolean));
  campaign.allIds = campaignAudienceIds;
  campaign.audienceHash = campaignAudienceHash(campaignAudienceIds);
  campaign.textSignature = campaignTextSignature(text);
  campaign.contentHash = campaignContentHash({ text, image: campaignImage, button: campaignButton, buttons: campaignButtons });

  const duplicate = !resumeProgressId && !body.force ? await findSimilarCampaignToday(campaign, campaignAudienceIds) : null;
  if (duplicate) {
    const duplicateWarning = CRM_DUPLICATE_WARNING_TEXT + " Последняя похожая: " + duplicate.id + ".";
    if (shouldSend && body.ackDuplicate !== true) {
      if (progressId) {
        await writeCampaignProgress(progressId, {
          status: "failed",
          total: campaignAudienceIds.length,
          processed: 0,
          sentBot: 0,
          sentPush: 0,
          failed: 0,
          segment,
          channel,
          error: CRM_DUPLICATE_WARNING_TEXT,
          duplicateCampaign: duplicate,
          startedAt,
          finishedAt: nowIso(),
        });
      }
      return {
        status: 409,
        json: {
          ok: false,
          error: CRM_DUPLICATE_WARNING_TEXT,
          code: "crm_campaign_duplicate_today",
          warning: CRM_DUPLICATE_WARNING_TEXT,
          duplicateCampaign: duplicate,
          requiresAck: true,
        },
      };
    }
    campaign.warning = campaign.warning ? campaign.warning + " " + duplicateWarning : duplicateWarning;
    campaign.duplicateWarning = duplicate;
  }

  let trackedCampaignButton = campaignButton;
  let trackedCampaignButtons = campaignButtons;
  if (shouldSend && campaignButton) {
    trackedCampaignButton = await ensureCampaignTrackingButton(
      campaign,
      campaignButton,
      channel,
      auth && auth.memberId,
      body.autoTrackButton
    );
    trackedCampaignButtons = [trackedCampaignButton].concat(campaignButtons.slice(1));
    campaign.buttons = trackedCampaignButtons;
  }

  if (shouldSend && body.asyncJob === true) {
    if (!redisConfigured()) {
      return { status: 503, json: { ok: false, error: "Очередь рассылки недоступна: Redis не настроен.", code: "crm_campaign_queue_unavailable" } };
    }
    const jobId = progressId || ("crm_send_" + crypto.randomBytes(10).toString("hex"));
    const jobAudience = campaignAudienceForJob(audience);
    const allIds = campaignAudienceIds.length ? campaignAudienceIds : unique(jobAudience.map(campaignDeliveryId).filter(Boolean));
    const concurrency = Math.min(jobAudience.length || 1, campaignImage ? CRM_CAMPAIGN_PHOTO_CONCURRENCY : CRM_CAMPAIGN_CONCURRENCY);
    const queuedCampaign = {
      ...campaign,
      status: "queued",
      progressId: jobId,
      delivered: 0,
      notSent: allIds.length,
    };
    const progress = emptyCampaignProgress("queued", queuedCampaign, allIds, { jobId, startedAt, concurrency });
    await writeCampaignJob(jobId, {
      jobId,
      campaign: queuedCampaign,
      audience: jobAudience,
      campaignImage,
      campaignButton: trackedCampaignButton,
      campaignButtons: trackedCampaignButtons,
      campaignImageFileId: campaignImage && campaignImage.telegramFileId || "",
      text,
      segment,
      channel,
      skippedAntispam,
      startedAt,
      resumeProgressId,
      saved: false,
      createdAt: nowIso(),
    });
    await writeCampaignProgress(jobId, progress);
    return { status: 200, json: { ok: true, jobQueued: true, ...queuedCampaign, progressId: jobId, progress } };
  }

  if (shouldSend) {
    const allIds = campaignAudienceIds.length ? campaignAudienceIds : unique(audience.map(campaignDeliveryId).filter(Boolean));
    const sentIds = [];
    const failedIds = [];
    const processedIds = [];
    const sentSet = new Set();
    const failedSet = new Set();
    const processedSet = new Set();
    const concurrency = Math.min(audience.length || 1, campaignImage ? CRM_CAMPAIGN_PHOTO_CONCURRENCY : CRM_CAMPAIGN_CONCURRENCY);
    const shouldSendBot = channel === "bot" || channel === "bot_push";
    let campaignImageFileId = String(campaignImage && campaignImage.telegramFileId || "").trim();
    function progressSnapshot(status, extra) {
      const pendingIds = allIds.filter((id) => !sentSet.has(id));
      const elapsedSec = Math.max(0.001, (Date.now() - Date.parse(startedAt)) / 1000);
      const perSecond = processedIds.length > 0 ? processedIds.length / elapsedSec : 0;
      return {
        status,
        campaignId: campaign.id,
        total: allIds.length,
        processed: processedIds.length,
        delivered: sentIds.length,
        notSent: pendingIds.length,
        perSecond: Math.round(perSecond * 10) / 10,
        etaSeconds: perSecond > 0 && pendingIds.length ? Math.ceil(pendingIds.length / perSecond) : null,
        concurrency,
        sentBot: campaign.sentBot,
        sentPush: campaign.sentPush,
        failed: campaign.failed,
        skippedAntispam,
        segment,
        channel,
        allIds,
        sentIds,
        failedIds,
        processedIds,
        pendingIds,
        resumeFromProgressId: resumeProgressId || undefined,
        startedAt,
        ...(extra && typeof extra === "object" ? extra : {}),
      };
    }
    if (progressId) {
      await writeCampaignProgress(progressId, progressSnapshot("sending"));
    }
    let processed = 0;
    let lastProgressAt = 0;
    async function sendCampaignRecipient(p) {
      const memberId = p.accountId || p.id;
      const deliveryId = campaignDeliveryId(p);
      let delivered = false;
      let attempted = false;
      let sentBot = 0;
      let sentPush = 0;
      let failed = 0;
      if (shouldSendBot && p.telegramIds && p.telegramIds.length) {
        const tg = toNumericTelegramId(p.telegramIds[0]);
        if (tg) {
          attempted = true;
          const r = await sendTelegramMessage(BOT_TOKEN, {
            chat_id: tg,
            text: campaignTelegramHtml(text),
            parseMode: "HTML",
            imageFileId: campaignImage && campaignImageFileId ? campaignImageFileId : undefined,
            imageDataUrl: campaignImage && !campaignImageFileId ? campaignImage.dataUrl : undefined,
            imageMimeType: campaignImage ? campaignImage.mimeType : undefined,
            buttonText: trackedCampaignButton ? trackedCampaignButton.text : undefined,
            buttonUrl: trackedCampaignButton ? trackedCampaignButton.url : undefined,
            buttons: trackedCampaignButtons,
          });
          if (r && r.ok) {
            sentBot += 1;
            delivered = true;
            if (campaignImage && r.photoFileId && !campaignImageFileId) {
              campaignImageFileId = String(r.photoFileId);
              if (campaign.image) campaign.image.telegramFileId = campaignImageFileId;
            }
          }
          else failed += 1;
        }
      }
      if (channel === "push" || channel === "bot_push") {
        attempted = true;
        const pushed = await sendToMemberDevices(memberId, {
          title: "Два туза",
          body: (text || "Фото от Два туза").slice(0, 180),
          tag: "crm_campaign_" + campaign.id,
          openUrl: trackedCampaignButtons.length ? trackedCampaignButtons[0].url : "./?startapp=club_chat",
          kind: "crm_campaign",
          campaignId: campaign.id,
          accountId: memberId,
        });
        if (pushed > 0) sentPush += 1;
        else if (channel === "push") failed += 1;
        if (pushed > 0) delivered = true;
      }
      if (!attempted) failed += 1;
      await recordTouch(memberId, {
        campaignId: campaign.id,
        channel,
        segment,
        textPreview: (campaignImage ? "[фото] " : "") + text.slice(0, 160),
        hasImage: !!campaignImage,
        sentBot,
        sentPush,
      });
      return { deliveryId, delivered, sentBot, sentPush, failed };
    }

    function applyCampaignResults(results) {
      results.forEach((result) => {
        campaign.sentBot += result.sentBot;
        campaign.sentPush += result.sentPush;
        campaign.failed += result.failed;
        const deliveryId = result.deliveryId;
        if (!deliveryId) return;
        if (!processedSet.has(deliveryId)) {
          processedSet.add(deliveryId);
          processedIds.push(deliveryId);
        }
        if (result.delivered) {
          if (!sentSet.has(deliveryId)) {
            sentSet.add(deliveryId);
            sentIds.push(deliveryId);
          }
          if (failedSet.has(deliveryId)) {
            failedSet.delete(deliveryId);
            const idx = failedIds.indexOf(deliveryId);
            if (idx >= 0) failedIds.splice(idx, 1);
          }
        } else if (!failedSet.has(deliveryId)) {
          failedSet.add(deliveryId);
          failedIds.push(deliveryId);
        }
      });
    }

    let recipients = audience;
    if (campaignImage && shouldSendBot) {
      const firstPhotoIndex = audience.findIndex((p) => p && p.telegramIds && p.telegramIds.some((id) => toNumericTelegramId(id)));
      if (firstPhotoIndex >= 0) {
        const firstResult = await sendCampaignRecipient(audience[firstPhotoIndex]);
        applyCampaignResults([firstResult]);
        processed += 1;
        recipients = audience.filter((_, index) => index !== firstPhotoIndex);
        if (progressId) {
          lastProgressAt = Date.now();
          await writeCampaignProgress(progressId, progressSnapshot("sending"));
        }
      }
    }

    for (let offset = 0; offset < recipients.length; offset += concurrency) {
      const chunk = recipients.slice(offset, offset + concurrency);
      const results = await Promise.all(chunk.map((p) => sendCampaignRecipient(p)));
      applyCampaignResults(results);
      processed += results.length;
      if (progressId && (processed === audience.length || processed % (concurrency * 2) === 0 || Date.now() - lastProgressAt > 900)) {
        lastProgressAt = Date.now();
        await writeCampaignProgress(progressId, progressSnapshot("sending"));
      }
    }
    campaign.delivered = sentIds.length;
    campaign.notSent = allIds.length - sentIds.length;
    campaign.sentIds = sentIds;
    campaign.failedIds = failedIds;
    campaign.pendingIds = allIds.filter((id) => !sentSet.has(id));
    if (progressId) {
      await writeCampaignProgress(progressId, progressSnapshot("done", { finishedAt: nowIso() }));
    }
  }

  await saveCampaign(campaign);
  return { status: 200, json: { ok: true, ...campaign } };
}

async function processCampaignJob(body, permissions) {
  if (!permissions.canSendCampaign) {
    return { status: 403, json: { ok: false, error: "Недостаточно прав для отправки рассылки" } };
  }
  const jobId = normalizeCampaignProgressId(body.progressId || body.campaignProgressId || body.jobId);
  if (!jobId) return { status: 400, json: { ok: false, error: "Не указан ID рассылки.", code: "crm_campaign_job_id_required" } };
  const job = await readCampaignJob(jobId);
  if (!job || !job.campaign) {
    return { status: 404, json: { ok: false, error: "Задача рассылки не найдена или уже устарела.", code: "crm_campaign_job_not_found" } };
  }
  let progress = await readCampaignProgress(jobId);
  const campaign = job.campaign;
  const audience = Array.isArray(job.audience) ? job.audience : [];
  const allIds = unique((progress && Array.isArray(progress.allIds) && progress.allIds.length
    ? progress.allIds
    : audience.map(campaignDeliveryId)).map((id) => String(id || "").trim()).filter(Boolean));
  if (!progress) {
    progress = emptyCampaignProgress("queued", campaign, allIds, {
      jobId,
      startedAt: job.startedAt || campaign.createdAt || nowIso(),
      concurrency: Math.min(audience.length || 1, job.campaignImage ? CRM_CAMPAIGN_PHOTO_CONCURRENCY : CRM_CAMPAIGN_CONCURRENCY),
    });
  }
  if (progress.status === "done") return { status: 200, json: { ok: true, jobDone: true, ...campaign, progressId: jobId, progress } };
  if (progress.status === "failed") return { status: 409, json: { ok: false, error: progress.error || "Рассылка остановлена.", progressId: jobId, progress } };
  if (progress.status === "paused") return { status: 200, json: { ok: true, jobPaused: true, ...campaign, progressId: jobId, progress } };
  if (progress.status === "canceled") return { status: 200, json: { ok: true, jobDone: true, ...campaign, progressId: jobId, progress } };
  if (progress.status === "throttled" && progress.cooldownUntil && Date.parse(progress.cooldownUntil) > Date.now()) {
    return { status: 200, json: { ok: true, jobDone: false, ...campaign, progressId: jobId, progress } };
  }

  const campaignImage = job.campaignImage || null;
  const campaignButton = job.campaignButton || null;
  const campaignButtons = Array.isArray(job.campaignButtons) ? job.campaignButtons : (campaignButton ? [campaignButton] : []);
  const text = String(job.text || campaign.text || "").slice(0, 1200);
  const segment = String(job.segment || campaign.segment || "").slice(0, 80);
  const channel = String(job.channel || campaign.channel || "bot").slice(0, 24);
  const startedAt = progress.startedAt || job.startedAt || campaign.createdAt || nowIso();
  const sentIds = unique((Array.isArray(progress.sentIds) ? progress.sentIds : []).map((id) => String(id || "").trim()).filter(Boolean));
  const failedIds = unique((Array.isArray(progress.failedIds) ? progress.failedIds : []).map((id) => String(id || "").trim()).filter(Boolean));
  const processedIds = unique((Array.isArray(progress.processedIds) ? progress.processedIds : []).map((id) => String(id || "").trim()).filter(Boolean));
  const sentSet = new Set(sentIds);
  const failedSet = new Set(failedIds);
  const processedSet = new Set(processedIds);
  const concurrency = Math.min(audience.length || 1, campaignImage ? CRM_CAMPAIGN_PHOTO_CONCURRENCY : CRM_CAMPAIGN_CONCURRENCY);
  const throttlePenalty = Math.min(4, Math.max(0, Number(job.throttlePenalty) || 0));
  const effectiveConcurrency = Math.max(1, Math.ceil(concurrency / (throttlePenalty + 1)));
  const effectiveChunkSize = Math.max(5, Math.ceil(CRM_CAMPAIGN_JOB_CHUNK_SIZE / (throttlePenalty + 1)));
  const shouldSendBot = channel === "bot" || channel === "bot_push";
  let campaignImageFileId = String(job.campaignImageFileId || (campaign.image && campaign.image.telegramFileId) || "").trim();
  const throttleHits = [];

  function progressSnapshot(status, extra) {
    const pendingIds = allIds.filter((id) => !sentSet.has(id));
    const elapsedSec = Math.max(0.001, (Date.now() - Date.parse(startedAt)) / 1000);
    const perSecond = processedIds.length > 0 ? processedIds.length / elapsedSec : 0;
    return {
      status,
      campaignId: campaign.id,
      total: allIds.length,
      processed: processedIds.length,
      delivered: sentIds.length,
      notSent: pendingIds.length,
      remainingToProcess: Math.max(0, allIds.length - processedIds.length),
      perSecond: Math.round(perSecond * 10) / 10,
      etaSeconds: perSecond > 0 && allIds.length > processedIds.length ? Math.ceil((allIds.length - processedIds.length) / perSecond) : null,
      concurrency: effectiveConcurrency,
      chunkSize: effectiveChunkSize,
      throttlePenalty,
      sentBot: campaign.sentBot || 0,
      sentPush: campaign.sentPush || 0,
      failed: campaign.failed || 0,
      skippedAntispam: campaign.skippedAntispam || 0,
      segment,
      channel,
      allIds,
      sentIds,
      failedIds,
      processedIds,
      pendingIds,
      deliveryLog: Array.isArray(job.deliveryLog) ? job.deliveryLog.slice(-2000) : [],
      asyncJob: true,
      jobId,
      resumeFromProgressId: job.resumeProgressId || campaign.resumeFromProgressId || undefined,
      startedAt,
      ...(extra && typeof extra === "object" ? extra : {}),
    };
  }

  async function sendCampaignRecipient(p) {
    const memberId = p.accountId || p.id;
    const deliveryId = campaignDeliveryId(p);
    let delivered = false;
    let attempted = false;
    let sentBot = 0;
    let sentPush = 0;
    let failed = 0;
    let reason = "";
    if (shouldSendBot && p.telegramIds && p.telegramIds.length) {
      const tg = toNumericTelegramId(p.telegramIds[0]);
      if (tg) {
        attempted = true;
        const r = await sendTelegramMessage(BOT_TOKEN, {
          chat_id: tg,
          text: campaignTelegramHtml(text),
          parseMode: "HTML",
          imageFileId: campaignImage && campaignImageFileId ? campaignImageFileId : undefined,
          imageDataUrl: campaignImage && !campaignImageFileId ? campaignImage.dataUrl : undefined,
          imageMimeType: campaignImage ? campaignImage.mimeType : undefined,
          buttonText: campaignButton ? campaignButton.text : undefined,
          buttonUrl: campaignButton ? campaignButton.url : undefined,
          buttons: campaignButtons,
        });
        if (r && r.ok) {
          sentBot += 1;
          delivered = true;
          if (campaignImage && r.photoFileId && !campaignImageFileId) {
            campaignImageFileId = String(r.photoFileId);
            if (campaign.image) campaign.image.telegramFileId = campaignImageFileId;
          }
        } else if (r && r.hint === "rate_limited") {
          return {
            deliveryId,
            delivered: false,
            sentBot,
            sentPush,
            failed: 0,
            rateLimited: true,
            retryAfterSeconds: Math.max(1, Number(r.retryAfter) || 5),
          };
        } else {
          failed += 1;
          reason = (r && (r.hint || r.error_code)) ? String(r.hint || r.error_code) : "telegram_failed";
        }
      }
    }
    if (channel === "push" || channel === "bot_push") {
      attempted = true;
      const pushed = await sendToMemberDevices(memberId, {
        title: "Два туза",
        body: (text || "Фото от Два туза").slice(0, 180),
        tag: "crm_campaign_" + campaign.id,
        openUrl: campaignButtons.length ? campaignButtons[0].url : "./?startapp=club_chat",
        kind: "crm_campaign",
        campaignId: campaign.id,
        accountId: memberId,
      });
      if (pushed > 0) sentPush += 1;
      else if (channel === "push") {
        failed += 1;
        reason = reason || "push_failed";
      }
      if (pushed > 0) delivered = true;
    }
    if (!attempted) {
      failed += 1;
      reason = "no_delivery_channel";
    }
    await recordTouch(memberId, {
      campaignId: campaign.id,
      channel,
      segment,
      textPreview: (campaignImage ? "[фото] " : "") + text.slice(0, 160),
      hasImage: !!campaignImage,
      sentBot,
      sentPush,
    });
    return { deliveryId, delivered, sentBot, sentPush, failed, reason };
  }

  function applyCampaignResults(results) {
    results.forEach((result) => {
      if (result && result.rateLimited) {
        throttleHits.push(result);
        return;
      }
      if (!job.deliveryLog) job.deliveryLog = [];
      job.deliveryLog.push({
        userId: result.deliveryId || "",
        status: result.delivered ? "delivered" : "failed",
        sentBot: result.sentBot || 0,
        sentPush: result.sentPush || 0,
        reason: result.delivered ? "" : (result.reason || "delivery_failed"),
        createdAt: nowIso(),
      });
      if (job.deliveryLog.length > 2000) job.deliveryLog = job.deliveryLog.slice(-2000);
      campaign.sentBot = (campaign.sentBot || 0) + result.sentBot;
      campaign.sentPush = (campaign.sentPush || 0) + result.sentPush;
      campaign.failed = (campaign.failed || 0) + result.failed;
      const deliveryId = result.deliveryId;
      if (!deliveryId) return;
      if (!processedSet.has(deliveryId)) {
        processedSet.add(deliveryId);
        processedIds.push(deliveryId);
      }
      if (result.delivered) {
        if (!sentSet.has(deliveryId)) {
          sentSet.add(deliveryId);
          sentIds.push(deliveryId);
        }
        if (failedSet.has(deliveryId)) {
          failedSet.delete(deliveryId);
          const idx = failedIds.indexOf(deliveryId);
          if (idx >= 0) failedIds.splice(idx, 1);
        }
      } else if (!failedSet.has(deliveryId)) {
        failedSet.add(deliveryId);
        failedIds.push(deliveryId);
      }
    });
  }

  const remaining = audience.filter((p) => {
    const id = campaignDeliveryId(p);
    return id && !processedSet.has(id);
  });
  if (remaining.length) {
    campaign.status = "sending";
    await writeCampaignProgress(jobId, progressSnapshot("sending"));
    let stepRecipients = remaining.slice(0, effectiveChunkSize);
    if (campaignImage && shouldSendBot && !campaignImageFileId) {
      const firstPhotoIndex = stepRecipients.findIndex((p) => p && p.telegramIds && p.telegramIds.some((id) => toNumericTelegramId(id)));
      if (firstPhotoIndex >= 0) {
        const firstResult = await sendCampaignRecipient(stepRecipients[firstPhotoIndex]);
        applyCampaignResults([firstResult]);
        stepRecipients = stepRecipients.filter((_, index) => index !== firstPhotoIndex);
      }
    }
    for (let offset = 0; offset < stepRecipients.length; offset += effectiveConcurrency) {
      const chunk = stepRecipients.slice(offset, offset + effectiveConcurrency);
      const results = await Promise.all(chunk.map((p) => sendCampaignRecipient(p)));
      applyCampaignResults(results);
      if (throttleHits.length) break;
    }
  }

  if (throttleHits.length) {
    const retryAfterSeconds = Math.max(1, ...throttleHits.map((hit) => Math.max(1, Number(hit.retryAfterSeconds) || 5)));
    const cooldownUntil = new Date(Date.now() + retryAfterSeconds * 1000).toISOString();
    campaign.status = "throttled";
    campaign.delivered = sentIds.length;
    campaign.notSent = allIds.length - sentIds.length;
    campaign.sentIds = sentIds;
    campaign.failedIds = failedIds;
    campaign.pendingIds = allIds.filter((id) => !sentSet.has(id));
    if (campaign.image && campaignImageFileId) campaign.image.telegramFileId = campaignImageFileId;
    job.campaign = campaign;
    job.campaignImageFileId = campaignImageFileId;
    job.throttlePenalty = Math.min(4, throttlePenalty + 1);
    const throttledProgress = progressSnapshot("throttled", {
      retryAfterSeconds,
      cooldownUntil,
      error: "Telegram ограничил скорость отправки.",
    });
    await writeCampaignJob(jobId, job);
    await writeCampaignProgress(jobId, throttledProgress);
    return { status: 200, json: { ok: true, jobDone: false, ...campaign, progressId: jobId, progress: throttledProgress } };
  }

  const done = processedIds.length >= allIds.length;
  campaign.status = done ? "sent" : "sending";
  campaign.delivered = sentIds.length;
  campaign.notSent = allIds.length - sentIds.length;
  campaign.sentIds = sentIds;
  campaign.failedIds = failedIds;
  campaign.pendingIds = allIds.filter((id) => !sentSet.has(id));
  if (campaign.image && campaignImageFileId) campaign.image.telegramFileId = campaignImageFileId;
  const nextProgress = progressSnapshot(done ? "done" : "sending", done ? { finishedAt: nowIso() } : undefined);
  job.campaign = campaign;
  job.campaignImageFileId = campaignImageFileId;
  if (!done && job.throttlePenalty) job.throttlePenalty = Math.max(0, Number(job.throttlePenalty) - 1);
  if (done && !job.saved) {
    await saveCampaign(campaign);
    job.saved = true;
  }
  await writeCampaignJob(jobId, job);
  await writeCampaignProgress(jobId, nextProgress);
  return { status: 200, json: { ok: true, jobDone: done, ...campaign, progressId: jobId, progress: nextProgress } };
}

async function controlCampaignJob(body, permissions) {
  if (!permissions.canSendCampaign) {
    return { status: 403, json: { ok: false, error: "Недостаточно прав для управления рассылкой" } };
  }
  const jobId = normalizeCampaignProgressId(body.progressId || body.campaignProgressId || body.jobId);
  const command = String(body.command || body.jobCommand || "").trim();
  if (!jobId) return { status: 400, json: { ok: false, error: "Не указан ID рассылки.", code: "crm_campaign_job_id_required" } };
  if (!["pause", "resume", "cancel"].includes(command)) return { status: 400, json: { ok: false, error: "Неизвестная команда рассылки.", code: "crm_campaign_job_bad_command" } };
  const job = await readCampaignJob(jobId);
  const progress = await readCampaignProgress(jobId);
  if (!job || !job.campaign || !progress) {
    return { status: 404, json: { ok: false, error: "Задача рассылки не найдена или уже устарела.", code: "crm_campaign_job_not_found" } };
  }
  const campaign = job.campaign;
  let nextProgress = progress;
  if (command === "pause") {
    campaign.status = "paused";
    job.paused = true;
    nextProgress = { ...progress, status: "paused", pausedAt: nowIso(), error: "" };
  } else if (command === "resume") {
    campaign.status = "sending";
    job.paused = false;
    nextProgress = { ...progress, status: "sending", resumedAt: nowIso(), error: "" };
  } else if (command === "cancel") {
    campaign.status = "canceled";
    job.canceled = true;
    nextProgress = { ...progress, status: "canceled", canceledAt: nowIso(), error: "Рассылка отменена админом." };
    if (!job.saved) {
      campaign.delivered = Array.isArray(progress.sentIds) ? progress.sentIds.length : campaign.delivered || 0;
      campaign.notSent = Array.isArray(progress.pendingIds) ? progress.pendingIds.length : campaign.notSent || 0;
      campaign.sentIds = Array.isArray(progress.sentIds) ? progress.sentIds : campaign.sentIds || [];
      campaign.failedIds = Array.isArray(progress.failedIds) ? progress.failedIds : campaign.failedIds || [];
      campaign.pendingIds = Array.isArray(progress.pendingIds) ? progress.pendingIds : campaign.pendingIds || [];
      await saveCampaign(campaign);
      job.saved = true;
    }
  }
  job.campaign = campaign;
  await writeCampaignJob(jobId, job);
  await writeCampaignProgress(jobId, nextProgress);
  return { status: 200, json: { ok: true, command, ...campaign, progressId: jobId, progress: nextProgress } };
}

function crmTestRecipientFromAuth(auth) {
  const identity = auth && auth.identity ? auth.identity : {};
  const chatId = toNumericTelegramId(auth && auth.memberId) || toNumericTelegramId(identity.id) || CRM_TEST_ROMAN_CHAT_ID;
  const username = String(identity.telegramUsername || identity.username || identity.pwaUsername || "").replace(/^@+/, "").trim();
  const name = [identity.first_name || identity.firstName, identity.last_name || identity.lastName].filter(Boolean).join(" ").trim();
  const label = username ? "@" + username : name || (chatId === CRM_TEST_ROMAN_CHAT_ID ? "@Roman1787443" : "tg_" + chatId);
  return { chatId, memberId: String(auth && auth.memberId || "").trim() || "tg_" + String(chatId), label };
}

function crmTestRecipients(auth) {
  const current = crmTestRecipientFromAuth(auth);
  const roman = {
    chatId: CRM_TEST_ROMAN_CHAT_ID,
    memberId: "tg_" + CRM_TEST_ROMAN_CHAT_ID,
    label: "@roman1787443",
  };
  const seen = new Set();
  return [current, roman].filter((recipient) => {
    const key = String(recipient.chatId || "");
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function runTestCampaign(body, permissions, auth) {
  if (!permissions.canSendCampaign) {
    return { status: 403, json: { ok: false, error: "Недостаточно прав для тестовой рассылки" } };
  }
  const channel = String(body.channel || "bot").trim().slice(0, 24);
  const text = String(body.text || "").trim().slice(0, 1200);
  const imageParsed = campaignImageFromBody(body);
  if (imageParsed.error) return { status: 400, json: { ok: false, error: imageParsed.error } };
  const campaignImage = imageParsed.image;
  const buttonParsed = campaignButtonFromBody(body);
  if (buttonParsed.error) return { status: 400, json: { ok: false, error: buttonParsed.error } };
  const campaignButton = buttonParsed.button;
  const campaignButtons = Array.isArray(buttonParsed.buttons) ? buttonParsed.buttons : (campaignButton ? [campaignButton] : []);
  if (!text && !campaignImage) {
    return { status: 400, json: { ok: false, error: "Укажите текст или картинку для теста" } };
  }
  const shouldSendBot = channel === "bot" || channel === "bot_push";
  const shouldSendPush = channel === "push" || channel === "bot_push";
  if (shouldSendPush && !readVapidEnv().pushConfigured) {
    return { status: 503, json: { ok: false, error: "Push на сервере не настроен: проверьте VAPID-ключи.", code: "crm_push_not_configured" } };
  }

  const recipients = crmTestRecipients(auth);
  let sent = null;
  let sentBot = 0;
  let sentPush = 0;
  let failed = 0;
  if (shouldSendBot) {
    for (const recipient of recipients) {
      sent = await sendTelegramMessage(BOT_TOKEN, {
        chat_id: recipient.chatId,
        text: campaignTelegramHtml(text),
        parseMode: "HTML",
        imageFileId: campaignImage && campaignImage.telegramFileId ? campaignImage.telegramFileId : undefined,
        imageDataUrl: campaignImage && !campaignImage.telegramFileId ? campaignImage.dataUrl : undefined,
        imageMimeType: campaignImage ? campaignImage.mimeType : undefined,
        buttonText: campaignButton ? campaignButton.text : undefined,
        buttonUrl: campaignButton ? campaignButton.url : undefined,
        buttons: campaignButtons,
      });
      if (sent && sent.ok) sentBot += 1;
      else failed += 1;
    }
  }
  if (shouldSendPush) {
    for (const recipient of recipients) {
      const pushed = await sendToMemberDevices(recipient.memberId, {
        title: "Два туза",
        body: (text || "Фото от Два туза").slice(0, 180),
        tag: "crm_campaign_test",
        openUrl: campaignButtons.length ? campaignButtons[0].url : "./?startapp=club_chat",
        kind: "crm_campaign_test",
        accountId: recipient.memberId,
      });
      if (pushed > 0) sentPush += 1;
      else failed += 1;
    }
  }
  const delivered = sentBot + sentPush;
  const campaign = {
    id: "crm_test_" + crypto.createHash("sha1").update([channel, text, campaignImage && campaignImage.hash, recipients.map((recipient) => recipient.chatId).join(","), Date.now()].join("|")).digest("hex").slice(0, 10),
    status: delivered > 0 ? "test" : "test_failed",
    channel,
    text,
    hasImage: !!campaignImage,
    image: campaignImage ? {
      name: campaignImage.name,
      mimeType: campaignImage.mimeType,
      size: campaignImage.size,
      hash: campaignImage.hash,
      telegramFileId: campaignImage.telegramFileId || undefined,
    } : null,
    hasButton: !!campaignButton,
    buttonText: campaignButton ? campaignButton.text : "",
    buttonUrl: campaignButton ? campaignButton.url : "",
    buttons: campaignButtons,
    audience: recipients.length,
    testRecipient: recipients.map((recipient) => recipient.label).join(", "),
    testRecipientId: recipients[0] && recipients[0].chatId || "",
    testRecipientIds: recipients.map((recipient) => recipient.chatId),
    sentBot,
    sentPush,
    failed,
    error: delivered <= 0 ? ((sent && (sent.hint || sent.error_code)) || (shouldSendPush ? "push_failed" : "telegram_send_failed")) : undefined,
    telegramMessageId: sent && sent.messageId ? sent.messageId : undefined,
    createdAt: nowIso(),
  };
  await saveCampaign(campaign);
  if (delivered <= 0) {
    return {
      status: 502,
      json: {
        ok: false,
        error: shouldSendPush && !shouldSendBot ? "Тестовая push-рассылка не ушла." : "Тестовая рассылка не ушла.",
        code: shouldSendPush && !shouldSendBot ? "push_test_send_failed" : "campaign_test_send_failed",
        details: campaign.error,
        ...campaign,
      },
    };
  }
  return { status: 200, json: { ok: true, ...campaign } };
}

module.exports = async function handler(req, res) {
  setCors(res, "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (!BOT_TOKEN) return res.status(500).json({ ok: false, error: "Set TELEGRAM_BOT_TOKEN" });

  let queryPre = {};
  try {
    queryPre = Object.fromEntries(new URL(req.url, "http://local").searchParams.entries());
  } catch (eQueryPre) {}

  if (req.method === "GET" && String(queryPre.publicLevels || queryPre.levels || "").trim() === "1") {
    if (rateLimit(req, res, { bucket: "player_crm_public_levels", limit: 120, windowMs: 60_000 })) return;
    setShortPublicCacheHeaders(res, Math.floor(CRM_PUBLIC_LEVELS_CACHE_TTL_MS / 1000));
    const rows = await buildCachedPublicPokerLevelRows();
    return res.status(200).json({ ok: true, updatedAt: nowIso(), levelRows: rows });
  }

  if (req.method === "GET" && String(queryPre.publicBirthdays || queryPre.birthdays || "").trim() === "1") {
    if (rateLimit(req, res, { bucket: "player_crm_public_birthdays", limit: 120, windowMs: 60_000 })) return;
    setShortPublicCacheHeaders(res, Math.floor(CRM_PUBLIC_LEVELS_CACHE_TTL_MS / 1000));
    const rows = await buildCachedPublicBirthdayRows();
    return res.status(200).json({ ok: true, updatedAt: nowIso(), birthdayRows: rows });
  }

  let body = {};
  if (req.method === "POST") {
    if (rejectIfPayloadTooLarge(req, res, 1_350_000)) return;
    if (rateLimit(req, res, { bucket: "player_crm", limit: 40, windowMs: 60_000 })) return;
    try {
      body = parseBody(req);
    } catch (e) {
      return res.status(400).json({ ok: false, error: "Invalid JSON" });
    }
  }

  const auth = authRequired(req, body, BOT_TOKEN, {
    authError: "Откройте в Telegram или войдите в PWA",
  });
  if (!auth.ok) return res.status(auth.status).json({ ok: false, error: auth.error });
  const raffleCalculationsAccess =
    req.method === "GET" &&
    ["raffles", "raffle-summary"].includes(String(queryPre.mode || "").trim()) &&
    isAdminReportIdentity(auth.identity, auth.memberId);
  if (!raffleCalculationsAccess && !(await isCrmAllowedIdentity(auth.identity, auth.memberId))) {
    return res.status(403).json({ ok: false, error: "CRM доступна только владельцам" });
  }
  const permissions = await crmPermissions(auth.memberId, auth.identity);
  const isAccessProbe = req.method === "GET" && String(queryPre.access || queryPre.probe || "").trim() === "1";
  if (!isAccessProbe) {
    const menuAccessToken = String(
      (req.headers && req.headers["x-admin-menu-access"]) ||
      body.menuAccessToken ||
      queryPre.menuAccessToken ||
      ""
    );
    const allowedScopes = raffleCalculationsAccess ? ["crm", "calculations"] : ["crm"];
    if (!verifyAccessToken(menuAccessToken, allowedScopes, auth.memberId, BOT_TOKEN)) {
      return res.status(403).json({ ok: false, error: "Требуется пароль CRM", code: "crm_password_required" });
    }
  }

  if (req.method === "GET") {
    let query = {};
    try {
      query = Object.fromEntries(new URL(req.url, "http://local").searchParams.entries());
    } catch (e) {}
    if (String(query.access || query.probe || "").trim() === "1") {
      return res.status(200).json({
        ok: true,
        updatedAt: nowIso(),
        permissions,
      });
    }
    const progressId = normalizeCampaignProgressId(query.progressId || query.campaignProgressId);
    if (progressId) {
      const progress = await readCampaignProgress(progressId);
      const campaignId = safeCampaignId(progress && progress.campaignId);
      let campaignMetrics = {};
      if (campaignId) {
        const metricRows = await redisCursorReadPipeline([["HGETALL", CRM_CAMPAIGN_METRICS_PREFIX + campaignId]], { timeoutMs: 5000 });
        const rawMetrics = hashPairsToObject(metricRows && metricRows[0] && metricRows[0].result);
        campaignMetrics = {
          pushOpens: metricNumber(rawMetrics.pushOpens),
          pushClicks: metricNumber(rawMetrics.pushClicks),
          pushOpenUsers: metricNumber(rawMetrics.pushOpenUsers),
          lastPushOpenAt: String(rawMetrics.lastPushOpenAt || ""),
        };
      }
      return res.status(200).json({
        ok: true,
        progressId,
        progress: progress ? { ...progress, ...campaignMetrics } : progress,
        updatedAt: nowIso(),
      });
    }
    if (String(query.latestChannelPost || "").trim() === "1") {
      const rows = await redisPipeline([["GET", CRM_LATEST_CHANNEL_POST_KEY]], { context: "crm.latest-channel-post" });
      const savedPost = safeJson(rows && rows[0] && rows[0].result, null);
      let publicPost = null;
      try {
        publicPost = await readLatestPublicChannelPost();
      } catch (error) {
        logCrmIssue("latest public channel post", error);
      }
      const savedMessageId = Number(savedPost && savedPost.messageId) || 0;
      const publicMessageId = Number(publicPost && publicPost.messageId) || 0;
      let post = publicPost && (publicMessageId >= savedMessageId || !savedPost) ? publicPost : savedPost;
      if (savedPost && publicPost && savedMessageId === publicMessageId) {
        post = {
          ...savedPost,
          ...publicPost,
          text: String(publicPost.text || savedPost.text || ""),
          photoFileId: String(savedPost.photoFileId || publicPost.photoFileId || ""),
          photoDataUrl: String(publicPost.photoDataUrl || savedPost.photoDataUrl || ""),
          photoMimeType: String(publicPost.photoMimeType || savedPost.photoMimeType || ""),
          photoSize: Number(publicPost.photoSize || savedPost.photoSize) || 0,
        };
      }
      return res.status(200).json({
        ok: true,
        post: post && typeof post === "object" ? post : null,
        updatedAt: nowIso(),
      });
    }
    // Never fall through to the legacy full mode. It scans every chat list and
    // can fan one HTTP request out into thousands of billable Redis commands.
    // Old cached clients used to omit `mode`, which made this path especially
    // dangerous. Unknown and missing modes now receive the lightweight shell.
    const requestedMode = String(query.mode || "").trim().toLowerCase();
    const safeMode = CRM_SAFE_GET_MODES.has(requestedMode) ? requestedMode : "core";
    if (safeMode === "dashboard-summary") {
      let currentData;
      let comparisonData;
      try {
        [currentData, comparisonData] = await Promise.all([
          buildCachedRealPlayers({ mode: "raffle-summary", range: { from: query.from, to: query.to } }),
          query.compareFrom && query.compareTo
            ? buildCachedRealPlayers({ mode: "comparison", range: { from: query.compareFrom, to: query.compareTo } })
            : Promise.resolve(null),
        ]);
      } catch (error) {
        logCrmIssue("dashboard summary", error);
        return res.status(500).json({ ok: false, error: "Сводка CRM не загрузилась", code: "crm_summary_failed" });
      }
      const comparisonSummary = comparisonData && comparisonData.statsSummary || {};
      const comparisonAudience = comparisonSummary.audience || {};
      const comparisonRaffles = comparisonSummary.raffles || {};
      return res.status(200).json({
        ok: true,
        updatedAt: nowIso(),
        raffles: currentData && currentData.statsSummary && currentData.statsSummary.raffles || null,
        comparison: comparisonData ? {
          audience: Number(comparisonAudience.estimatedReal) || 0,
          registrations: Number(comparisonSummary.registrations) || 0,
          pokerPlus: crmPokerPlusBalanceDelta(comparisonData.players, query.compareFrom, query.compareTo),
          bot: Number(comparisonSummary.botNet) || 0,
          push: Number(comparisonSummary.pushNet) || 0,
          raffles: Number(comparisonRaffles.uniqueParticipants) || 0,
        } : null,
      });
    }
    let data;
    try {
      data = await buildCachedRealPlayers({
        mode: safeMode,
        range: { from: query.from, to: query.to },
        period: query.period,
        chartRange: { from: query.chartFrom, to: query.chartTo },
        chartPeriod: query.chartPeriod,
      });
    } catch (error) {
      logCrmIssue("buildRealPlayers unhandled", error);
      return res.status(500).json({
        ok: false,
        error: "CRM API не собрала данные",
        code: "crm_build_failed",
        details: crmPublicErrorDetail(error),
      });
    }
    if (["raffles", "raffle-summary"].includes(safeMode)) {
      return res.status(200).json({
        ok: true,
        updatedAt: nowIso(),
        raffles: data && data.statsSummary && data.statsSummary.raffles || null,
      });
    }
    if (safeMode === "comparison") {
      const summary = data && data.statsSummary || {};
      const audience = summary.audience || {};
      const raffles = summary.raffles || {};
      const pokerPlusBalanceDelta = crmPokerPlusBalanceDelta(data && data.players, query.from, query.to);
      return res.status(200).json({
        ok: true,
        updatedAt: nowIso(),
        comparison: {
          audience: Number(audience.estimatedReal) || 0,
          registrations: Number(summary.registrations) || 0,
          pokerPlus: pokerPlusBalanceDelta,
          bot: Number(summary.botNet) || 0,
          push: Number(summary.pushNet) || 0,
          raffles: Number(raffles.uniqueParticipants) || 0,
        },
      });
    }
    const responseMode = safeMode;
    let responseData = responseMode === "core"
      ? {
        ...data,
        players: [],
        playersPending: true,
      }
      : data;
    if (responseMode === "players") {
      const allPlayers = Array.isArray(data && data.players) ? data.players : [];
      const segment = String(query.segment || "").trim().toLowerCase();
      const segmentDateField = segment === "has_bot"
        ? "botSubscribedAt"
        : segment === "has_poker21"
          ? "pokerPlusLinkedAt"
          : segment === "has_push"
            ? "pushSubscribedAt"
            : "registeredAt";
      let segmentPlayers = allPlayers.filter((player) => {
        if (segment === "has_bot") return !!(player && player.channels && player.channels.bot);
        if (segment === "has_poker21") return !!String(player && (player.pokerPlusUserId || player.p21Id || player.poker21Id) || "").trim();
        if (segment === "has_push") return !!(player && player.channels && player.channels.push);
        return true;
      });
      if (segment === "has_poker21") {
        const byPoker21Id = new Map();
        segmentPlayers.forEach((player) => {
          const poker21Id = String(player && (player.pokerPlusUserId || player.p21Id || player.poker21Id) || "").trim();
          if (!poker21Id) return;
          const current = byPoker21Id.get(poker21Id);
          const playerLinkedAt = Date.parse(String(player && player.pokerPlusLinkedAt || "")) || 0;
          const currentLinkedAt = Date.parse(String(current && current.pokerPlusLinkedAt || "")) || 0;
          if (!current || playerLinkedAt > currentLinkedAt) byPoker21Id.set(poker21Id, player);
        });
        segmentPlayers = [...byPoker21Id.values()];
      }
      segmentPlayers.sort((a, b) => {
        const aDate = Date.parse(String(a && (a[segmentDateField] || (segmentDateField === "registeredAt" ? a.firstSeenAt : "")) || "")) || 0;
        const bDate = Date.parse(String(b && (b[segmentDateField] || (segmentDateField === "registeredAt" ? b.firstSeenAt : "")) || "")) || 0;
        return bDate - aDate || String(a && a.id || "").localeCompare(String(b && b.id || ""));
      });
      const page = Math.max(1, parseInt(query.page || "1", 10) || 1);
      const limit = Math.max(25, Math.min(200, parseInt(query.limit || "100", 10) || 100));
      const start = (page - 1) * limit;
      responseData = {
        ...data,
        players: segmentPlayers.slice(start, start + limit),
        playersPage: page,
        playersLimit: limit,
        playersTotal: segmentPlayers.length,
        playersHasMore: start + limit < segmentPlayers.length,
        blockedUsers: Array.isArray(data && data.blockedUsers) ? data.blockedUsers : [],
        playersScope: "players",
      };
    } else if (responseMode === "blocked") {
      responseData = {
        source: data && data.source,
        blockedUsers: Array.isArray(data && data.blockedUsers) ? data.blockedUsers : [],
        playersScope: "blocked",
      };
    } else if (responseMode === "send") {
      responseData = {
        ...data,
        players: (Array.isArray(data && data.players) ? data.players : []).filter((player) => (
          player && player.channels && (player.channels.bot === true || player.channels.push === true)
        )),
        playersScope: "broadcast",
      };
    }
    return res.status(200).json({
      ok: true,
      periods: [7, 30, 90],
      updatedAt: nowIso(),
      permissions,
      ...responseData,
    });
  }

  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const action = String(body.action || "").trim();
  let out;
  try {
    if (action === "save_player") out = await savePlayer(body);
    else if (action === "record_event") out = await recordEvent(body);
    else if (action === "link_identity") out = await linkIdentity(body);
    else if (action === "prepare_campaign") out = await runCampaign(body, false, permissions, auth);
    else if (action === "send_campaign") out = await runCampaign(body, true, permissions, auth);
    else if (action === "process_campaign_job") out = await processCampaignJob(body, permissions);
    else if (action === "control_campaign_job") out = await controlCampaignJob(body, permissions);
    else if (action === "purge_blocked_campaign_subscribers") out = await purgeBlockedCampaignSubscribers(body, permissions);
    else if (action === "test_campaign") out = await runTestCampaign(body, permissions, auth);
    else if (action === "block_player") out = await setPlayerAppBlock(body, true, permissions, auth);
    else if (action === "unblock_player") out = await setPlayerAppBlock(body, false, permissions, auth);
    else out = { status: 400, json: { ok: false, error: "Unknown CRM action" } };
  } catch (error) {
    logCrmIssue("CRM action " + (action || "unknown") + " failed", error);
    out = {
      status: 500,
      json: {
        ok: false,
        error: "CRM действие не выполнено. Попробуй обновить дашборд и повторить.",
        code: "crm_action_failed",
        details: crmPublicErrorDetail(error),
      },
    };
  }
  if (out && out.status >= 200 && out.status < 300) clearCrmGetCache();
  return res.status(out.status).json(out.json);
};

module.exports._test = {
  computeStatsSummary,
  uniquePublicPokerLevelAccounts,
};
module.exports._internals = {
  buildCachedRealPlayers,
};
