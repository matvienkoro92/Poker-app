"use strict";

const crypto = require("crypto");
const { authRequired, parseBody, setCors } = require("../api-auth");
const { rejectIfPayloadTooLarge, rateLimit } = require("../api-limits");
const { pipeline: redisPipeline, isConfigured: redisConfigured, hashPairsToObject } = require("../redis");
const { GENERAL_KEY, CHAT_GROUP_MSG_PREFIX } = require("../chat-storage");
const { sendTelegramMessage, resolveTelegramOpenButtonUrl } = require("../telegram-bot-send");
const { sendToMemberDevices, readVapidEnv } = require("../chat-webpush-notify");
const { getDtIdByUserId } = require("../account-id");
const { getLinkedEmailOriginalByDtId } = require("../email-auth");
const { createPlayerCrmChatStats } = require("../player-crm-chat-stats");
const {
  addDaily,
  crmDateInRange,
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
const CRM_ALLOWED_EMAILS = new Set(["matvienkoro92@gmail.com", "matvienko.r2@yandex.ru"]);
const CRM_ALLOWED_MEMBER_IDS = new Set(["tg_5053253480"]);
const CRM_ALLOWED_USERNAMES = new Set(["roman1787443"]);

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
const PUSH_REGISTRY_KEY = "poker_app:chat_push_registry";
const PUSH_DISABLED_KEY = "poker_app:chat_push_disabled";
const PUSH_SUBSCRIBED_AT_HASH = "poker_app:chat_push_subscribed_at";
const BOT_SUBSCRIBED_AT_HASH = "poker_app:bot_subscribed_at";
const PUSH_UNSUBSCRIBED_AT_HASH = "poker_app:chat_push_unsubscribed_at";
const BOT_UNSUBSCRIBED_AT_HASH = "poker_app:bot_unsubscribed_at";
const POKERPLUS_BIND_HASH = "poker_app:pokerplus_user_ids";
const POKERPLUS_BIND_AT_HASH = "poker_app:pokerplus_bound_at";
const POKERPLUS_PROFILE_HASH = "poker_app:pokerplus_profiles";
const POKERPLUS_SYNC_HASH = "poker_app:pokerplus_profiles_synced_at";
const CRM_OVERRIDES_HASH = "poker_app:crm_player_overrides";
const CRM_CAMPAIGNS_LIST = "poker_app:crm_campaigns";
const CRM_EVENTS_PREFIX = "poker_app:crm_activity_events:";
const CRM_TOUCH_PREFIX = "poker_app:crm_touches:";
const EMAIL_LINKS_HASH = "poker_app:email_links";
const EMAIL_ORIGINALS_HASH = "poker_app:email_originals";
const EMAIL_LINKED_AT_HASH = "poker_app:email_linked_at";
const TELEGRAM_LOGIN_AT_HASH = "poker_app:telegram_login_at";
const TRACK_Z_INDEX = "poker_app:track_links:z";
const TRACK_META_HASH = "poker_app:track_links:meta";
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
const CRM_GET_CACHE_MAX = 12;
const crmGetCache = new Map();
const CRM_MANAGER_DIALOGS = [
  { key: "anna", label: "Диалогов у Ани", id: "tg_2144406710" },
  { key: "vika", label: "Диалогов у Вики", id: "tg_1897001087" },
];
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
    if (!entry || now - (entry.at || 0) > CRM_GET_CACHE_TTL_MS) crmGetCache.delete(key);
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
  const hit = crmGetCache.get(key);
  if (hit && now - hit.at <= CRM_GET_CACHE_TTL_MS) {
    return hit.promise ? await hit.promise : hit.data;
  }
  const entry = {
    at: now,
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
}

function profileTotal(profile) {
  if (!profile || typeof profile !== "object") return {};
  if (profile.totalCounter && typeof profile.totalCounter === "object") return profile.totalCounter;
  if (profile.total_counter && typeof profile.total_counter === "object") return profile.total_counter;
  return {};
}

function pokerStatusStepForLevel(level) {
  if (level <= 5) return 10000;
  if (level <= 15) return 20000;
  if (level <= 25) return 35000;
  if (level <= 35) return 50000;
  if (level <= 45) return 75000;
  return 100000;
}

function pokerStatusLevelFromFee(value) {
  const rake = Math.max(0, Math.floor(Number(value) || 0));
  let level = 1;
  let levelStart = 0;
  while (level < 55) {
    const step = pokerStatusStepForLevel(level);
    if (rake < levelStart + step) break;
    levelStart += step;
    level += 1;
  }
  return level;
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
  const syncedAt = ctx && ctx.pokerplusSyncedAt ? ctx.pokerplusSyncedAt : {};
  const boundAt = ctx && ctx.pokerplusBoundAt ? ctx.pokerplusBoundAt : {};
  const displayNames = ctx && ctx.displayNames ? ctx.displayNames : {};
  return Object.keys(bind)
    .map((accountId) => {
      const profile = parseProfile(profiles[accountId]);
      const total = profileTotal(profile);
      const fee = Number(total.fee);
      const level = pokerStatusLevelFromFee(Number.isFinite(fee) ? fee : 0);
      const linkedAt = isoFromMs(boundAt[accountId]) || isoFromMs(syncedAt[accountId]);
      return {
        accountId,
        pokerPlusUserId: String(bind[accountId] || "").trim(),
        nickname: String((profile && profile.nickname) || displayNames[accountId] || accountId).trim(),
        email: String((profile && profile.email) || "").trim(),
        level,
        fee: Number.isFinite(fee) ? fee : 0,
        hands: Number(total.hands) || 0,
        lastLoginDate: String((profile && profile.lastLoginDate) || "").trim(),
        linkedAt,
        linkedAtSource: boundAt[accountId] ? "bind" : syncedAt[accountId] ? "sync" : "",
      };
    })
    .filter((row) => row.pokerPlusUserId)
    .sort((a, b) => b.level - a.level || b.fee - a.fee || String(a.nickname).localeCompare(String(b.nickname), "ru"));
}

async function buildPublicPokerLevelRows() {
  if (!redisConfigured()) return [];
  const results = await redisPipeline([
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
  const registrations = buildRegisteredAccounts({ dtIds, usernames, displayNames, emailLinks, emailOriginals, emailLinkedAt, telegramLoginAt });
  const registeredByAccount = new Map(registrations.map((row) => [String(row.accountId || "").trim(), row]));
  return buildPokerPlusAccounts({ pokerplusBind, pokerplusProfiles, pokerplusSyncedAt, pokerplusBoundAt, displayNames })
    .filter((row) => Number(row.level) > 0)
    .map((row) => {
      const reg = registeredByAccount.get(String(row.accountId || "").trim()) || null;
      return {
        accountId: String(row.accountId || "").trim(),
        name: String((reg && reg.name) || row.nickname || row.accountId || "").trim(),
        telegram: reg && reg.telegramUsername ? String(reg.telegramUsername).replace(/^@?/, "@") : "",
        level: Number(row.level) || 0,
      };
    })
    .sort((a, b) => b.level - a.level || String(a.name).localeCompare(String(b.name), "ru"));
}

async function readEventsForAccounts(accountIds) {
  const ids = accountIds.slice(0, 600);
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
  const ids = accountIds.slice(0, 600);
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

async function computeChartAnalytics({ players, registeredAccounts, pokerPlusAccounts, eventsByAccount, range, rangeKey, visitDailySummary }) {
  const playerBase = {};
  (Array.isArray(players) ? players : []).forEach((row) => {
    addDaily(playerBase, dateKeyFromIso(row && row.firstSeenAt), 1);
  });
  const users = (visitDailySummary && visitDailySummary.userCounts) || {};
  const visitCounts = (visitDailySummary && visitDailySummary.visitCounts) || {};
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
  const crmMessages = {};
  Object.values(eventsByAccount || {}).forEach((events) => {
    (Array.isArray(events) ? events : []).forEach((ev) => {
      if (!ev) return;
      if (ev.type === "deposit") addDaily(deposits, dateKeyFromIso(ev.at), 1);
      if (ev.type === "message") addDaily(crmMessages, dateKeyFromIso(ev.at), 1);
    });
  });
  const poker21 = {};
  (Array.isArray(pokerPlusAccounts) ? pokerPlusAccounts : []).forEach((row) => {
    addDaily(poker21, dateKeyFromIso(row.linkedAt), 1);
  });
  const generalMessages = await countGeneralMessagesByDay();
  const datedKeys = Object.keys({ ...playerBase, ...users, ...visitCounts, ...registrations, ...botSubs, ...pushSubs, ...deposits, ...crmMessages, ...poker21, ...generalMessages }).sort();
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
    dailySeries("visits", "Посещений", visitCounts, mapTotal(visitCounts)),
    dailySeries("users", "Пользователей", users, mapTotal(users)),
    dailySeries("players", "Новых пользователей", playerBase, allPlayers),
    dailySeries("registrations", "Регистрации", registrations, allRegistered),
    dailySeries("poker21", "Poker21", poker21, mapTotal(poker21)),
    dailySeries("bot", "Новые подписки на бот", botSubs, bot),
    dailySeries("push", "Новые push-подписки", pushSubs, push),
    dailySeries("deposits", "Депозиты", deposits, mapTotal(deposits)),
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

function computeStatsSummary({ players, registeredAccounts, pokerPlusAccounts, range, rangeKey, visitDailySummary }) {
  const key = rangeKey || (range && range.key) || "30";
  const allPlayers = Array.isArray(players) ? players : [];
  const eventDateInRange = (value) => !!value && crmDateInRange(value, range);
  const playerRows = allPlayers.filter((p) => crmDateInRange((p && (p.firstSeenAt || p.registeredAt)) || "", range));
  const registrationRows = (Array.isArray(registeredAccounts) ? registeredAccounts : []).filter((row) => crmDateInRange(row && row.linkedAt, range));
  const pokerPlusRows = (Array.isArray(pokerPlusAccounts) ? pokerPlusAccounts : []).filter((row) => crmDateInRange(row && row.linkedAt, range));
  const botRows = allPlayers.filter((p) => p && p.channels && p.channels.bot && crmDateInRange(p.botSubscribedAt, range));
  const pushRows = allPlayers.filter((p) => p && p.channels && p.channels.push && crmDateInRange(p.pushSubscribedAt, range));
  const botUnsubRows = allPlayers.filter((p) => p && !(p.channels && p.channels.bot) && eventDateInRange(p.botUnsubscribedAt));
  const pushUnsubRows = allPlayers.filter((p) => p && !(p.channels && p.channels.push) && eventDateInRange(p.pushUnsubscribedAt));
  const deposits = allPlayers.reduce((sum, p) => sum + (Number(p && p.deposits && p.deposits[key]) || 0), 0);
  const visitRows = range ? playerRows : allPlayers;
  const dailyVisits = visitDailySummary && visitDailySummary.hasDailyData ? visitDailySummary.total : null;
  const dailyUnique = visitDailySummary && visitDailySummary.hasDailyData ? visitDailySummary.unique : null;
  const dailyNew = visitDailySummary && visitDailySummary.hasDailyData ? visitDailySummary.new : null;
  const visitsTotal = dailyVisits != null ? dailyVisits : visitRows.reduce((sum, p) => sum + (Number(p && p.totals && p.totals.visits) || 0), 0);
  const visitsUnique = dailyUnique != null ? dailyUnique : visitRows.length;
  const visitsNew = dailyNew != null ? dailyNew : allPlayers.filter((p) => crmDateInRange((p && p.firstSeenAt) || "", range)).length;
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
  return {
    players: playerRows.length,
    visits: {
      total: visitsTotal,
      unique: visitsUnique,
      new: visitsNew,
      repeat: visitsRepeat,
    },
    registrations: registrationRows.length,
    registrationCounts,
    pokerPlus: pokerPlusRows.length,
    bot: botRows.length,
    botUnsub: botUnsubRows.length,
    botNet: botRows.length - botUnsubRows.length,
    push: pushRows.length,
    pushUnsub: pushUnsubRows.length,
    pushNet: pushRows.length - pushUnsubRows.length,
    deposits,
    historicalDataIncomplete: !!(range && hasAnyLiveData && periodEventsTotal === 0),
  };
}

function sectionViewRowsFromCounts(counts) {
  return Object.keys(counts || {})
    .map((section) => ({ section, count: Number(counts[section]) || 0 }))
    .filter((row) => row.section && row.count > 0)
    .sort((a, b) => b.count - a.count || a.section.localeCompare(b.section));
}

function sectionRowsTotal(rows) {
  return (Array.isArray(rows) ? rows : []).reduce((sum, row) => sum + (Number(row && row.count) || 0), 0);
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
  const dailyRows = sectionViewRowsFromCounts(counts);
  const totalRows = sectionViewRowsFromCounts(totalCounts);
  const dailyTotal = sectionRowsTotal(dailyRows);
  const allTotal = sectionRowsTotal(totalRows);
  const visitTotal = Number(visitsTotal) || 0;
  if (allTotal > 0 && (dailyTotal === 0 || dailyTotal < Math.min(allTotal, 20))) {
    if (visitTotal >= 100 && allTotal < Math.max(100, Math.floor(visitTotal * 0.1))) {
      return [{ section: "__all_visits", count: visitTotal, incompleteSections: true, trackedSectionViews: allTotal }];
    }
    return totalRows;
  }
  if (visitTotal >= 100 && dailyTotal < Math.max(100, Math.floor(visitTotal * 0.1))) {
    return [{ section: "__all_visits", count: visitTotal, incompleteSections: true, trackedSectionViews: dailyTotal }];
  }
  return dailyRows;
}

async function readVisitDailySummary(dayKeys, visitorFirstSeen, range, allVisits) {
  const keys = Array.isArray(dayKeys) ? dayKeys.filter(Boolean) : [];
  if (!keys.length || keys.length > 120) return null;
  const commands = [];
  keys.forEach((key) => {
    commands.push(["HGETALL", VISITS_DAY_PREFIX + key]);
    commands.push(["SMEMBERS", VISITORS_DAY_PREFIX + key]);
  });
  const results = await optionalCrmStep("visit-daily", null, () => redisPipeline(commands, { timeoutMs: 9000 }), []);
  if (!results || !Array.isArray(results)) return null;
  const users = new Set();
  const userCounts = {};
  const visitCounts = {};
  const periodVisitsByUser = {};
  let total = 0;
  keys.forEach((key, idx) => {
    const visits = hashPairsToObject(results[idx * 2] && results[idx * 2].result);
    const dayUsers = redisSet(results[idx * 2 + 1] && results[idx * 2 + 1].result);
    const dayVisitTotal = totalFromHashMap(visits);
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
    const firstSeen = isoFromMs(visitorFirstSeen[id]) || "";
    const periodVisits = Number(periodVisitsByUser[id]) || 0;
    const totalVisits = Number(allVisits && allVisits[id]) || 0;
    if (firstSeen && crmDateInRange(firstSeen, range) && totalVisits <= periodVisits) newUsers += 1;
  });
  return {
    hasDailyData: total > 0 || users.size > 0,
    total,
    unique: users.size,
    new: newUsers,
    userCounts,
    visitCounts,
  };
}

async function buildRealPlayers(options = {}) {
  const warnings = [];
  const mode = String(options.mode || "full").trim();
  const includeHeavy = mode !== "core";
  const includeActivity = mode !== "core";
  const includeDetail = mode !== "core";
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
  const baseCommands = [
    ["SMEMBERS", VISITORS_KEY],
    ["HGETALL", VISITS_HASH],
    ["HGETALL", VISITOR_FIRST_SEEN_HASH],
    ["HGETALL", USERNAMES_HASH],
    ["HGETALL", DT_IDS_HASH],
    ["HGETALL", DISPLAY_NAMES_HASH],
    ["HGETALL", PERSONAL_HASH],
    ["SMEMBERS", CHAT_USERS_KEY],
    ["HGETALL", CHAT_LAST_SEEN_HASH],
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
    ["HGETALL", SECTION_VIEWS_HASH],
  ];
  sectionViewDayKeys.forEach((key) => baseCommands.push(["HGETALL", SECTION_VIEWS_DAY_PREFIX + key]));
  if (includeDetail) ADMIN_IDS.forEach((id) => baseCommands.push(["SMEMBERS", "poker_app:chat_partners:" + id]));

  const results = await optionalCrmStep("redis-base", null, () => redisPipeline(baseCommands, { timeoutMs: 9000 }), warnings);
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
  const overrides = hashPairsToObject(results[22] && results[22].result);
  const campaigns = (Array.isArray(results[23] && results[23].result) ? results[23].result : []).map((x) => safeJson(x, null)).filter(Boolean);
  const trackSlugs = Array.isArray(results[24] && results[24].result) ? results[24].result.map((x) => String(x)) : [];
  const trackMeta = hashPairsToObject(results[25] && results[25].result);
  const emailLinks = hashPairsToObject(results[26] && results[26].result);
  const emailOriginals = hashPairsToObject(results[27] && results[27].result);
  const emailLinkedAt = hashPairsToObject(results[28] && results[28].result);
  const telegramLoginAt = hashPairsToObject(results[29] && results[29].result);
  const sectionViewsAll = hashPairsToObject(results[30] && results[30].result);
  const sectionViewDayResults = results.slice(31, 31 + sectionViewDayKeys.length);
  const adminPartnerSets = results.slice(31 + sectionViewDayKeys.length).map((r) => redisSet(r && r.result));
  const statsDayKeys = includeDetail && statsRange ? dateKeysBetween(statsRange.from, statsRange.to) : [];
  const visitDailySummary = includeDetail ? await readVisitDailySummary(statsDayKeys, visitorFirstSeen, statsRange, visits) : null;
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

  visitors.forEach(addRuntime);
  chatUsers.forEach(addRuntime);
  gazette.forEach((id) => addRuntime(normalizeTgId(id)));
  rating.forEach((id) => addRuntime(normalizeTgId(id)));
  raffle.forEach((id) => addRuntime(normalizeTgId(id)));
  Object.keys(dtIds).forEach(addRuntime);
  pushRegistry.forEach((accountId) => ensurePlayer(playerMap, accountId));
  Object.keys(pokerplusBind).forEach((accountId) => ensurePlayer(playerMap, accountId));
  Object.keys(pokerplusProfiles).forEach((accountId) => ensurePlayer(playerMap, accountId));
  Object.keys(overrides).forEach((accountId) => ensurePlayer(playerMap, accountId));
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
    const crm = safeJson(overrides[accountId], {});
    p.crm = crm && typeof crm === "object" ? crm : {};
    p.manager = p.crm.manager || "";
    p.source = p.crm.source || candidates.map((id) => sourceByVisitor[id]).find(Boolean) || "Mini App";
    p.note = p.crm.note || personal[accountId] || "";
    p.channels.push = pushRegistry.has(accountId) && !pushDisabled.has(accountId);
    p.channels.gazette = p.telegramIds.some((id) => gazette.has(toNumericTelegramId(id)) || gazette.has(id));
    p.channels.rating = p.telegramIds.some((id) => rating.has(toNumericTelegramId(id)) || rating.has(id));
    p.channels.raffle = p.telegramIds.some((id) => raffle.has(toNumericTelegramId(id)) || raffle.has(id));
    p.channels.bot = p.telegramIds.length > 0 && (p.channels.gazette || p.channels.rating || p.channels.raffle || visitors.has(p.telegramIds[0]));
    p.botSubscribedAt = earliestIso(p.telegramIds.map((id) => botSubscribedAt[toNumericTelegramId(id)] || botSubscribedAt[id]));
    p.pushSubscribedAt = isoFromMs(pushSubscribedAt[accountId]) || "";
    p.botUnsubscribedAt = earliestIso(p.telegramIds.map((id) => botUnsubscribedAt[toNumericTelegramId(id)] || botUnsubscribedAt[id]));
    p.pushUnsubscribedAt = isoFromMs(pushUnsubscribedAt[accountId]) || "";
    p.registeredAt = earliestIso([emailLinkedAt[accountId], telegramLoginAt[accountId]].concat(runtimeIds.map((id) => telegramLoginAt[id])));
    p.firstSeenAt = earliestIso(
      candidates.map((id) => visitorFirstSeen[id] || firstSeenByRuntime[id])
        .concat([
          p.registeredAt,
          p.botSubscribedAt,
          p.pushSubscribedAt,
          p.botUnsubscribedAt,
          p.pushUnsubscribedAt,
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
    p.botOpenRate = p.channels.bot ? 100 : 0;
    p.pushOpenRate = p.channels.push ? 100 : 0;
    p.trend = p.deposits["7"] > 0 || p.messages["7"] > 0 ? "есть активность" : "нет активности в CRM";
    if (!p.note) p.note = p.crm.note || "";
    if (p.lastDepositDays >= 999 && p.deposits["90"] <= 0) p.timeline.push("депозитов в CRM-журнале пока нет");
  }

  const players = sortPlayers([...playerMap.values()]).map(publicPlayer);
  const registeredAccounts = buildRegisteredAccounts({ dtIds, usernames, displayNames, emailLinks, emailOriginals, emailLinkedAt, telegramLoginAt });
  const pokerPlusAccounts = buildPokerPlusAccounts({ pokerplusBind, pokerplusProfiles, pokerplusSyncedAt, pokerplusBoundAt, displayNames });
  const statsSummary = computeStatsSummary({ players, registeredAccounts, pokerPlusAccounts, range: statsRange, rangeKey, visitDailySummary });
  statsSummary.visits.sections = computeSectionViewsSummary(sectionViewsAll, sectionViewDayResults, statsRange, statsSummary.visits && statsSummary.visits.total);
  const sourceAnalytics = computeSourceAnalytics(players, rangeKey);
  const chartVisitDailySummary = includeHeavy && chartStatsRange && (!statsRange || chartStatsRange.from !== statsRange.from || chartStatsRange.to !== statsRange.to)
    ? await readVisitDailySummary(dateKeysBetween(chartStatsRange.from, chartStatsRange.to), visitorFirstSeen, chartStatsRange, visits)
    : visitDailySummary;
  const [chartAnalytics, chatStats] = includeHeavy
    ? await Promise.all([
      optionalCrmStep(
        "chart-analytics",
        null,
        () => computeChartAnalytics({ players, registeredAccounts, pokerPlusAccounts, eventsByAccount, range: chartStatsRange, rangeKey: chartRangeKey, visitDailySummary: chartVisitDailySummary }),
        warnings
      ),
      optionalCrmStep(
        "chat-stats",
        null,
        () => safeComputeChatStats(statsRange, { usernames, displayNames, dtIds }),
        warnings
      ),
    ])
    : [null, null];
  return {
    source: "redis-live",
    players,
    registeredAccounts,
    pokerPlusAccounts,
    statsSummary,
    sourceAnalytics,
    chartAnalytics,
    chatStats,
    heavyPending: !includeHeavy,
    campaigns,
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

async function saveCampaign(campaign) {
  await redisPipeline([
    ["LPUSH", CRM_CAMPAIGNS_LIST, JSON.stringify(campaign)],
    ["LTRIM", CRM_CAMPAIGNS_LIST, "0", "49"],
  ]);
}

async function runCampaign(body, shouldSend, permissions) {
  if (shouldSend && !permissions.canSendCampaign) {
    return { status: 403, json: { ok: false, error: "Недостаточно прав для отправки рассылки" } };
  }
  const range = rangeFromInput(body.range);
  const rangeKey = range ? "custom" : periodFromInput(body.period);
  const real = await buildRealPlayers({ range, period: rangeKey });
  const segment = String(body.segment || "").trim().slice(0, 80);
  const channel = String(body.channel || "bot").trim().slice(0, 24);
  const text = String(body.text || "").trim().slice(0, 1200);
  const rawAudience = resolveAudience(real.players, body.audienceIds, segment, rangeKey);
  const force = body.force === true;
  const audience = shouldSend && !force ? rawAudience.filter((p) => !touchBlocked(p)) : rawAudience;
  const skippedAntispam = shouldSend ? rawAudience.length - audience.length : rawAudience.filter(touchBlocked).length;
  if (!segment || !text) return { status: 400, json: { ok: false, error: "Укажите сегмент и текст" } };

  const campaign = {
    id: "crm_" + crypto.createHash("sha1").update([segment, channel, text, Date.now()].join("|")).digest("hex").slice(0, 10),
    status: shouldSend ? "sent" : "draft",
    segment,
    channel,
    text,
    audience: audience.length,
    sentBot: 0,
    sentPush: 0,
    failed: 0,
    skippedAntispam,
    createdAt: nowIso(),
  };

  if (shouldSend) {
    const openUrl = resolveTelegramOpenButtonUrl("");
    for (const p of audience) {
      if ((channel === "bot" || channel === "bot_push") && p.telegramIds && p.telegramIds.length) {
        const tg = toNumericTelegramId(p.telegramIds[0]);
        if (tg) {
          const r = await sendTelegramMessage(BOT_TOKEN, {
            chat_id: tg,
            text,
            buttonText: "Открыть приложение",
            buttonUrl: openUrl,
          });
          if (r && r.ok) campaign.sentBot += 1;
          else campaign.failed += 1;
        }
      }
      if (channel === "push" || channel === "bot_push") {
        const pushed = await sendToMemberDevices(p.accountId || p.id, {
          title: "Два туза",
          body: text.slice(0, 180),
          tag: "crm_campaign_" + campaign.id,
          openUrl: "./?startapp=club_chat",
          kind: "crm_campaign",
        });
        if (pushed > 0) campaign.sentPush += 1;
        else if (channel === "push") campaign.failed += 1;
      }
      await recordTouch(p.accountId || p.id, {
        campaignId: campaign.id,
        channel,
        segment,
        textPreview: text.slice(0, 160),
        sentBot: campaign.sentBot,
        sentPush: campaign.sentPush,
      });
    }
  }

  await saveCampaign(campaign);
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
    const rows = await buildPublicPokerLevelRows();
    return res.status(200).json({ ok: true, updatedAt: nowIso(), levelRows: rows });
  }

  let body = {};
  if (req.method === "POST") {
    if (rejectIfPayloadTooLarge(req, res, 64_000)) return;
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
  if (!(await isCrmAllowedIdentity(auth.identity, auth.memberId))) {
    return res.status(403).json({ ok: false, error: "CRM доступна только владельцам" });
  }
  const permissions = await crmPermissions(auth.memberId, auth.identity);

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
    let data;
    try {
      data = await buildCachedRealPlayers({
        mode: query.mode,
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
    return res.status(200).json({
      ok: true,
      periods: [7, 30, 90],
      updatedAt: nowIso(),
      permissions,
      ...data,
    });
  }

  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const action = String(body.action || "").trim();
  let out;
  if (action === "save_player") out = await savePlayer(body);
  else if (action === "record_event") out = await recordEvent(body);
  else if (action === "link_identity") out = await linkIdentity(body);
  else if (action === "prepare_campaign") out = await runCampaign(body, false, permissions);
  else if (action === "send_campaign") out = await runCampaign(body, true, permissions);
  else out = { status: 400, json: { ok: false, error: "Unknown CRM action" } };
  if (out && out.status >= 200 && out.status < 300) clearCrmGetCache();
  return res.status(out.status).json(out.json);
};
