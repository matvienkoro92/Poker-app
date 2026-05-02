"use strict";

const crypto = require("crypto");
const { authRequired, parseBody, setCors } = require("../api-auth");
const { rejectIfPayloadTooLarge, rateLimit } = require("../api-limits");
const { pipeline: redisPipeline, isConfigured: redisConfigured, hashPairsToObject } = require("../redis");
const { sendTelegramMessage, resolveTelegramOpenButtonUrl } = require("../telegram-bot-send");
const { sendToMemberDevices, readVapidEnv } = require("../chat-webpush-notify");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

const VISITORS_KEY = "poker_app:visitors";
const VISITS_HASH = "poker_app:visits";
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
const POKERPLUS_BIND_HASH = "poker_app:pokerplus_user_ids";
const POKERPLUS_PROFILE_HASH = "poker_app:pokerplus_profiles";
const POKERPLUS_SYNC_HASH = "poker_app:pokerplus_profiles_synced_at";
const CRM_OVERRIDES_HASH = "poker_app:crm_player_overrides";
const CRM_CAMPAIGNS_LIST = "poker_app:crm_campaigns";
const CRM_EVENTS_PREFIX = "poker_app:crm_activity_events:";
const CRM_TOUCH_PREFIX = "poker_app:crm_touches:";
const CRM_IMPORTS_LIST = "poker_app:crm_imports";
const TRACK_Z_INDEX = "poker_app:track_links:z";
const TRACK_META_HASH = "poker_app:track_links:meta";
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

function nowIso() {
  return new Date().toISOString();
}

function daysAgoFromMs(ms) {
  const n = Number(ms);
  if (!Number.isFinite(n) || n <= 0) return 999;
  return Math.max(0, Math.floor((Date.now() - n) / 86400000));
}

function daysAgoFromIso(iso) {
  const ms = Date.parse(String(iso || ""));
  return Number.isFinite(ms) ? daysAgoFromMs(ms) : 999;
}

function safeJson(raw, fallback) {
  if (raw == null || raw === "") return fallback;
  try {
    return JSON.parse(String(raw));
  } catch (e) {
    return fallback;
  }
}

function redisSet(raw) {
  return new Set(Array.isArray(raw) ? raw.map((x) => String(x)) : []);
}

function normalizeTgId(id) {
  const s = String(id || "").trim();
  if (!s) return "";
  if (s.startsWith("tg_")) return s;
  if (/^\d+$/.test(s)) return "tg_" + s;
  return s;
}

function toNumericTelegramId(id) {
  const s = String(id || "").replace(/^tg_/, "").trim();
  return /^\d+$/.test(s) ? s : "";
}

function unique(arr) {
  return [...new Set((arr || []).map((x) => String(x || "").trim()).filter(Boolean))];
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
    games: { 7: 0, 30: 0, 90: 0 },
    deposits: { 7: 0, 30: 0, 90: 0 },
    depositCount: { 7: 0, 30: 0, 90: 0 },
    messages: { 7: 0, 30: 0, 90: 0 },
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

function applyEvents(player, events) {
  const list = Array.isArray(events) ? events : [];
  const periods = [7, 30, 90];
  periods.forEach((days) => {
    const inRange = list.filter((ev) => eventInDays(ev, days));
    player.games[String(days)] += inRange.filter((ev) => ev.type === "game").length;
    const depEvents = inRange.filter((ev) => ev.type === "deposit");
    player.depositCount[String(days)] += depEvents.length;
    player.deposits[String(days)] += depEvents.reduce((sum, ev) => sum + (Number(ev.amount) || 0), 0);
    player.messages[String(days)] += inRange.filter((ev) => ev.type === "message").length;
  });
  const lastGame = list.filter((ev) => ev.type === "game").sort((a, b) => Date.parse(b.at || "") - Date.parse(a.at || ""))[0];
  const lastDeposit = list.filter((ev) => ev.type === "deposit").sort((a, b) => Date.parse(b.at || "") - Date.parse(a.at || ""))[0];
  if (lastGame) player.lastGameDays = Math.min(player.lastGameDays, daysAgoFromIso(lastGame.at));
  if (lastDeposit) player.lastDepositDays = Math.min(player.lastDepositDays, daysAgoFromIso(lastDeposit.at));
  list.slice(0, 4).forEach((ev) => {
    const amount = ev.amount ? " · " + Number(ev.amount).toLocaleString("ru-RU") + " ₽" : "";
    player.timeline.push((ev.at ? new Date(ev.at).toLocaleDateString("ru-RU") : "дата?") + " · " + eventLabel(ev.type) + amount + (ev.note ? " · " + ev.note : ""));
  });
}

function eventLabel(type) {
  if (type === "deposit") return "депозит";
  if (type === "game") return "игра";
  if (type === "message") return "сообщение";
  return "событие";
}

function touchLabel(touch) {
  const channel = touch && touch.channel ? String(touch.channel) : "касание";
  const segment = touch && touch.segment ? " · " + String(touch.segment) : "";
  return "CRM " + channel + segment;
}

function crmPermissions(memberId) {
  const id = normalizeTgId(memberId);
  const owner = CRM_OWNER_IDS.includes(id);
  return {
    role: owner ? "owner" : "manager",
    canEditPlayers: true,
    canImportEvents: owner,
    canSendCampaign: owner,
    touchMinHours: CRM_TOUCH_MIN_HOURS,
  };
}

function inferTags(player) {
  const tags = new Set(player.crm && Array.isArray(player.crm.tags) ? player.crm.tags : []);
  if (player.totals.fee != null && player.totals.fee >= 100000) tags.add("VIP");
  if (player.channels.rating) tags.add("рейтинг");
  if (player.channels.raffle) tags.add("розыгрыши");
  if (player.channels.gazette) tags.add("газета");
  if (player.channels.push) tags.add("push");
  if (player.deposits["30"] <= 0 && player.games["30"] <= 0) tags.add("без депозита");
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
  return p;
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

function computeSourceAnalytics(players) {
  const map = new Map();
  players.forEach((p) => {
    const source = String(p.source || "Без источника").trim() || "Без источника";
    if (!map.has(source)) {
      map.set(source, {
        source,
        players: 0,
        bot: 0,
        push: 0,
        visits: 0,
        games30: 0,
        deposits30: 0,
        fee: 0,
        pokerPlusLinked: 0,
      });
    }
    const row = map.get(source);
    row.players += 1;
    if (p.channels && p.channels.bot) row.bot += 1;
    if (p.channels && p.channels.push) row.push += 1;
    row.visits += Number(p.totals && p.totals.visits) || 0;
    row.games30 += Number(p.games && p.games["30"]) || 0;
    row.deposits30 += Number(p.deposits && p.deposits["30"]) || 0;
    row.fee += Number(p.totals && p.totals.fee) || 0;
    if (p.pokerPlusUserId || (p.totals && p.totals.fee != null)) row.pokerPlusLinked += 1;
  });
  return [...map.values()].sort((a, b) => {
    const av = b.deposits30 + b.fee + b.players * 10;
    const bv = a.deposits30 + a.fee + a.players * 10;
    return av - bv;
  }).slice(0, 40);
}

async function buildRealPlayers() {
  if (!redisConfigured()) {
    return { source: "no-redis", players: [], campaigns: [] };
  }
  const baseCommands = [
    ["SMEMBERS", VISITORS_KEY],
    ["HGETALL", VISITS_HASH],
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
    ["HGETALL", POKERPLUS_BIND_HASH],
    ["HGETALL", POKERPLUS_PROFILE_HASH],
    ["HGETALL", POKERPLUS_SYNC_HASH],
    ["HGETALL", CRM_OVERRIDES_HASH],
    ["LRANGE", CRM_CAMPAIGNS_LIST, "0", "24"],
    ["ZREVRANGE", TRACK_Z_INDEX, "0", "49"],
    ["HGETALL", TRACK_META_HASH],
  ];
  ADMIN_IDS.forEach((id) => baseCommands.push(["SMEMBERS", "poker_app:chat_partners:" + id]));

  const results = await redisPipeline(baseCommands, { timeoutMs: 9000 });
  if (!results || !Array.isArray(results)) {
    return { source: "redis-error", players: [], campaigns: [] };
  }

  const visitors = redisSet(results[0] && results[0].result);
  const visits = hashPairsToObject(results[1] && results[1].result);
  const usernames = hashPairsToObject(results[2] && results[2].result);
  const dtIds = hashPairsToObject(results[3] && results[3].result);
  const displayNames = hashPairsToObject(results[4] && results[4].result);
  const personal = hashPairsToObject(results[5] && results[5].result);
  const chatUsers = redisSet(results[6] && results[6].result);
  const lastSeen = hashPairsToObject(results[7] && results[7].result);
  const gazette = redisSet(results[8] && results[8].result);
  const rating = redisSet(results[9] && results[9].result);
  const raffle = redisSet(results[10] && results[10].result);
  const pushRegistry = redisSet(results[11] && results[11].result);
  const pushDisabled = redisSet(results[12] && results[12].result);
  const pokerplusBind = hashPairsToObject(results[13] && results[13].result);
  const pokerplusProfiles = hashPairsToObject(results[14] && results[14].result);
  const pokerplusSyncedAt = hashPairsToObject(results[15] && results[15].result);
  const overrides = hashPairsToObject(results[16] && results[16].result);
  const campaigns = (Array.isArray(results[17] && results[17].result) ? results[17].result : []).map((x) => safeJson(x, null)).filter(Boolean);
  const trackSlugs = Array.isArray(results[18] && results[18].result) ? results[18].result.map((x) => String(x)) : [];
  const trackMeta = hashPairsToObject(results[19] && results[19].result);
  const adminPartnerSets = results.slice(20).map((r) => redisSet(r && r.result));
  const sourceByVisitor = {};
  if (trackSlugs.length) {
    const logs = await redisPipeline(trackSlugs.map((slug) => ["LRANGE", "poker_app:track_links:log:" + slug, "0", "499"]), { timeoutMs: 9000 });
    trackSlugs.forEach((slug, idx) => {
      const meta = safeJson(trackMeta[slug], {});
      const label = String((meta && meta.label) || ("ref_" + slug)).trim();
      const raw = logs && logs[idx] && Array.isArray(logs[idx].result) ? logs[idx].result : [];
      raw.forEach((line) => {
        const hit = safeJson(line, null);
        const visitorId = hit && hit.visitorId ? String(hit.visitorId).trim() : "";
        if (visitorId && !sourceByVisitor[visitorId]) sourceByVisitor[visitorId] = label;
      });
    });
  }

  const accountByRuntime = {};
  Object.keys(dtIds).forEach((runtimeId) => {
    const accountId = String(dtIds[runtimeId] || "").trim();
    if (accountId) accountByRuntime[String(runtimeId)] = accountId;
  });

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
  adminPartnerSets.forEach((set) => set.forEach(addRuntime));

  const accountIds = [...playerMap.keys()];
  const eventsByAccount = await readEventsForAccounts(accountIds);
  const touchesByAccount = await readTouchesForAccounts(accountIds);

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

    p.totals.visits = candidates.reduce((sum, id) => sum + (parseInt(visits[id], 10) || 0), 0);
    p.lastMessageDays = Math.min.apply(null, candidates.map((id) => daysAgoFromMs(lastSeen[id])));
    if (!Number.isFinite(p.lastMessageDays)) p.lastMessageDays = 999;
    p.lastReplyDays = p.lastMessageDays;
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
      if (p.totals.hands != null && p.totals.hands > 0) {
        p.games["90"] += Math.max(1, Math.round(p.totals.hands / 150));
        p.games["30"] += Math.max(0, Math.round(p.games["90"] / 3));
        p.games["7"] += Math.max(0, Math.round(p.games["30"] / 4));
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

    applyEvents(p, eventsByAccount[accountId] || []);
    applyTouches(p, touchesByAccount[accountId] || []);
    p.tags = inferTags(p);
    p.botOpenRate = p.channels.bot ? 100 : 0;
    p.pushOpenRate = p.channels.push ? 100 : 0;
    p.trend = p.games["7"] > 0 || p.deposits["7"] > 0 || p.messages["7"] > 0 ? "есть активность" : "нет активности в CRM";
    if (!p.note) p.note = p.crm.note || "";
    if (p.lastDepositDays >= 999 && p.deposits["90"] <= 0) p.timeline.push("депозитов в CRM-журнале пока нет");
  }

  const players = sortPlayers([...playerMap.values()]).map(publicPlayer);
  return {
    source: "redis-live",
    players,
    sourceAnalytics: computeSourceAnalytics(players),
    campaigns,
    pushConfigured: readVapidEnv().pushConfigured,
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
  if (!accountId || !["deposit", "game", "message"].includes(type)) {
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

function parseImportRows(body) {
  if (Array.isArray(body.events)) return body.events;
  const raw = String(body.csv || body.text || "").trim();
  if (!raw) return [];
  return raw.split(/\r?\n/).map((line) => {
    const parts = line.split(",").map((x) => x.trim());
    return {
      accountId: parts[0],
      type: parts[1],
      amount: parts[2],
      at: parts[3],
      note: parts.slice(4).join(", "),
    };
  });
}

async function importEvents(body, permissions) {
  if (!permissions.canImportEvents) return { status: 403, json: { ok: false, error: "Недостаточно прав для импорта" } };
  const rows = parseImportRows(body).slice(0, 500);
  const events = [];
  const allowed = new Set(["deposit", "game", "message"]);
  for (const row of rows) {
    const accountId = String(row.accountId || row.id || "").trim();
    const type = String(row.type || "").trim();
    if (!accountId || !allowed.has(type)) continue;
    events.push({
      accountId,
      event: {
        id: "ev_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8),
        type,
        amount: Math.max(0, Number(row.amount) || 0),
        note: String(row.note || "").trim().slice(0, 240),
        at: row.at && Number.isFinite(Date.parse(String(row.at))) ? new Date(String(row.at)).toISOString() : nowIso(),
        createdAt: nowIso(),
        importId: "",
      },
    });
  }
  const importId = "imp_" + crypto.randomBytes(5).toString("hex");
  const commands = [];
  events.forEach((item) => {
    item.event.importId = importId;
    commands.push(["LPUSH", CRM_EVENTS_PREFIX + item.accountId, JSON.stringify(item.event)]);
    commands.push(["LTRIM", CRM_EVENTS_PREFIX + item.accountId, "0", "199"]);
  });
  const meta = {
    id: importId,
    rows: rows.length,
    imported: events.length,
    createdAt: nowIso(),
  };
  commands.push(["LPUSH", CRM_IMPORTS_LIST, JSON.stringify(meta)]);
  commands.push(["LTRIM", CRM_IMPORTS_LIST, "0", "49"]);
  await redisPipeline(commands);
  return { status: 200, json: { ok: true, ...meta } };
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

function resolveAudience(players, ids, segment) {
  const wanted = new Set((ids || []).map((id) => String(id)));
  let list = wanted.size ? players.filter((p) => wanted.has(p.id) || wanted.has(p.accountId)) : [];
  if (!list.length && segment) {
    list = players.filter((p) => {
      if (segment === "active_7") return p.games["7"] > 0 || p.deposits["7"] > 0 || p.messages["7"] > 0;
      if (segment === "has_deposit") return p.deposits["30"] > 0;
      if (segment === "no_deposit") return p.deposits["30"] <= 0;
      if (segment === "has_push") return !!(p.channels && p.channels.push);
      if (segment === "tournament") return p.tags.includes("турниры") || p.tags.includes("MTT") || p.tags.includes("bounty") || p.tags.includes("рейтинг") || p.tags.includes("розыгрыши");
      if (segment === "needs_touch") return (p.deposits["30"] > 0 && p.games["30"] <= 0) || !(p.channels && (p.channels.bot || p.channels.push));
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
  const real = await buildRealPlayers();
  const segment = String(body.segment || "").trim().slice(0, 80);
  const channel = String(body.channel || "bot").trim().slice(0, 24);
  const text = String(body.text || "").trim().slice(0, 1200);
  const rawAudience = resolveAudience(real.players, body.audienceIds, segment);
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
    adminOnly: true,
    authError: "Откройте в Telegram или войдите в PWA",
    adminError: "Только для администраторов",
  });
  if (!auth.ok) return res.status(auth.status).json({ ok: false, error: auth.error });
  const permissions = crmPermissions(auth.memberId);

  if (req.method === "GET") {
    const data = await buildRealPlayers();
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
  else if (action === "import_events") out = await importEvents(body, permissions);
  else if (action === "link_identity") out = await linkIdentity(body);
  else if (action === "prepare_campaign") out = await runCampaign(body, false, permissions);
  else if (action === "send_campaign") out = await runCampaign(body, true, permissions);
  else out = { status: 400, json: { ok: false, error: "Unknown CRM action" } };
  return res.status(out.status).json(out.json);
};
