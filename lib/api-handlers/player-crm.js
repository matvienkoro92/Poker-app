"use strict";

const crypto = require("crypto");
const { authRequired, parseBody, setCors } = require("../api-auth");
const { rejectIfPayloadTooLarge, rateLimit } = require("../api-limits");
const { pipeline: redisPipeline, isConfigured: redisConfigured, hashPairsToObject } = require("../redis");
const { GENERAL_KEY, CHAT_GROUP_MSG_PREFIX } = require("../chat-storage");
const { sendTelegramMessage, resolveTelegramOpenButtonUrl } = require("../telegram-bot-send");
const { sendToMemberDevices, readVapidEnv } = require("../chat-webpush-notify");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const CRM_ALLOWED_EMAIL = "matvienkoro92@gmail.com";

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
const POKERPLUS_BIND_AT_HASH = "poker_app:pokerplus_bound_at";
const POKERPLUS_PROFILE_HASH = "poker_app:pokerplus_profiles";
const POKERPLUS_SYNC_HASH = "poker_app:pokerplus_profiles_synced_at";
const CRM_OVERRIDES_HASH = "poker_app:crm_player_overrides";
const CRM_CAMPAIGNS_LIST = "poker_app:crm_campaigns";
const CRM_EVENTS_PREFIX = "poker_app:crm_activity_events:";
const CRM_TOUCH_PREFIX = "poker_app:crm_touches:";
const EMAIL_LINKS_HASH = "poker_app:email_links";
const EMAIL_ORIGINALS_HASH = "poker_app:email_originals";
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
const CRM_MANAGER_DIALOGS = [
  { key: "anna", label: "Диалогов у Ани", id: "tg_2144406710" },
  { key: "vika", label: "Диалогов у Вики", id: "tg_1897001087" },
];

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

function normalizeDateOnly(value) {
  const s = String(value || "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return "";
  const ms = Date.parse(s + "T00:00:00.000Z");
  return Number.isFinite(ms) ? s : "";
}

function rangeFromInput(input) {
  const raw = input && typeof input === "object" ? input : {};
  let from = normalizeDateOnly(raw.from);
  let to = normalizeDateOnly(raw.to);
  if (!from || !to) return null;
  if (from > to) {
    const tmp = from;
    from = to;
    to = tmp;
  }
  return {
    key: "custom",
    from,
    to,
    fromMs: Date.parse(from + "T00:00:00.000Z"),
    toMs: Date.parse(to + "T23:59:59.999Z"),
  };
}

function periodFromInput(value) {
  const s = String(value || "").trim();
  return ["7", "30", "90"].includes(s) ? s : "30";
}

function rangeForPeriodKey(key) {
  const days = Math.max(1, Number(periodFromInput(key)) || 30);
  const toMs = Date.now();
  return {
    key: String(days),
    from: new Date(toMs - (days - 1) * 86400000).toISOString().slice(0, 10),
    to: new Date(toMs).toISOString().slice(0, 10),
    fromMs: toMs - days * 86400000,
    toMs,
  };
}

function eventInRange(event, range) {
  if (!range) return false;
  const ms = Date.parse(String(event && event.at ? event.at : ""));
  return Number.isFinite(ms) && ms >= range.fromMs && ms <= range.toMs;
}

function msInRange(ms, range) {
  return range && Number.isFinite(ms) && ms >= range.fromMs && ms <= range.toMs;
}

function parseMessageTimeMs(raw) {
  const msg = typeof raw === "string" ? safeJson(raw, null) : raw;
  const ms = Date.parse(String((msg && (msg.time || msg.at || msg.createdAt)) || ""));
  return Number.isFinite(ms) ? ms : NaN;
}

function parseMessage(raw) {
  const msg = typeof raw === "string" ? safeJson(raw, null) : raw;
  return msg && typeof msg === "object" ? msg : null;
}

async function scanRedisKeys(pattern, limit = 1200) {
  const out = [];
  let cursor = "0";
  for (let i = 0; i < 20; i += 1) {
    const res = await redisPipeline([["SCAN", cursor, "MATCH", pattern, "COUNT", "500"]], { timeoutMs: 9000 });
    const row = res && res[0] ? res[0].result : null;
    if (!Array.isArray(row) || row.length < 2) break;
    cursor = String(row[0] || "0");
    const keys = Array.isArray(row[1]) ? row[1].map((x) => String(x)) : [];
    keys.forEach((key) => {
      if (out.length < limit) out.push(key);
    });
    if (cursor === "0" || out.length >= limit) break;
  }
  return out;
}

async function countListMessagesForRange(keys, range, maxMessagesPerList) {
  const listKeys = (Array.isArray(keys) ? keys : []).filter(Boolean);
  if (!listKeys.length) return { total: 0, period: 0, activeLists: 0 };
  const totalRows = await redisPipeline(listKeys.map((key) => ["LLEN", key]), { timeoutMs: 9000 });
  let total = 0;
  listKeys.forEach((key, idx) => {
    const n = totalRows && totalRows[idx] ? Number(totalRows[idx].result) || 0 : 0;
    total += n;
  });
  if (!range) return { total, period: 0, activeLists: 0 };
  const stop = String(Math.max(0, Number(maxMessagesPerList) || 499));
  const rawRows = await redisPipeline(listKeys.map((key) => ["LRANGE", key, "0", stop]), { timeoutMs: 12000 });
  let period = 0;
  let activeLists = 0;
  listKeys.forEach((key, idx) => {
    const rows = rawRows && rawRows[idx] && Array.isArray(rawRows[idx].result) ? rawRows[idx].result : [];
    const count = rows.reduce((sum, raw) => sum + (msInRange(parseMessageTimeMs(raw), range) ? 1 : 0), 0);
    period += count;
    if (count > 0) activeLists += 1;
  });
  return { total, period, activeLists };
}

async function countManagerDialogStats(manager, range, ctx) {
  const safeCtx = ctx && typeof ctx === "object" ? ctx : {};
  const usernames = safeCtx.usernames || {};
  const displayNames = safeCtx.displayNames || {};
  const dtIds = safeCtx.dtIds || {};
  const partnerRes = await redisPipeline([["SMEMBERS", "poker_app:chat_partners:" + manager.id]], { timeoutMs: 9000 });
  const partners = Array.from(redisSet(partnerRes && partnerRes[0] && partnerRes[0].result))
    .filter((id) => id && id !== manager.id)
    .slice(0, 1600);
  const dialogKeys = partners.map((id) => personalChatKey(manager.id, id));
  if (!dialogKeys.length) {
    return { label: manager.label, total: 0, period: 0, messagesTotal: 0, messagesPeriod: 0, dialogs: [] };
  }
  const totalRows = await redisPipeline(dialogKeys.map((key) => ["LLEN", key]), { timeoutMs: 9000 });
  const rawRows = range
    ? await redisPipeline(dialogKeys.map((key) => ["LRANGE", key, "0", "499"]), { timeoutMs: 12000 })
    : [];
  let messagesTotal = 0;
  let messagesPeriod = 0;
  let periodDialogs = 0;
  const dialogs = partners.map((partnerId, idx) => {
    const totalMessages = totalRows && totalRows[idx] ? Number(totalRows[idx].result) || 0 : 0;
    const rows = rawRows && rawRows[idx] && Array.isArray(rawRows[idx].result) ? rawRows[idx].result : [];
    const periodMessages = range
      ? rows.reduce((sum, raw) => sum + (msInRange(parseMessageTimeMs(raw), range) ? 1 : 0), 0)
      : totalMessages;
    const messageRows = rows
      .map(parseMessage)
      .filter(Boolean)
      .filter((msg) => !range || msInRange(parseMessageTimeMs(msg), range))
      .slice(0, 80)
      .reverse()
      .map((msg) => ({
        id: String(msg.id || ""),
        from: String(msg.from || ""),
        fromName: String(msg.fromName || "").trim(),
        text: String(msg.text || "").slice(0, 900),
        time: String(msg.time || msg.at || msg.createdAt || ""),
        image: !!msg.image,
        voice: !!msg.voice,
        document: !!msg.document,
        documentName: String(msg.documentName || ""),
      }));
    messagesTotal += totalMessages;
    messagesPeriod += periodMessages;
    if (periodMessages > 0) periodDialogs += 1;
    const dtId = dtIds[partnerId] || "";
    const username = usernames[partnerId] ? "@" + String(usernames[partnerId]).replace(/^@+/, "").trim() : "";
    const name = String(displayNames[partnerId] || (dtId && displayNames[dtId]) || username || dtId || partnerId).trim();
    return {
      id: partnerId,
      dtId,
      name,
      handle: username,
      totalMessages,
      periodMessages,
      messages: messageRows,
    };
  }).sort((a, b) => b.periodMessages - a.periodMessages || b.totalMessages - a.totalMessages || String(a.name).localeCompare(String(b.name), "ru"));
  return {
    label: manager.label,
    total: partners.length,
    period: range ? periodDialogs : partners.length,
    messagesTotal,
    messagesPeriod: range ? messagesPeriod : messagesTotal,
    dialogs,
  };
}

async function computeChatStats(range, ctx) {
  const [general, personalKeys, groupKeys] = await Promise.all([
    countListMessagesForRange([GENERAL_KEY], range, 999),
    scanRedisKeys("poker_app:chat:*", 1600),
    scanRedisKeys(CHAT_GROUP_MSG_PREFIX + "*", 1200),
  ]);
  const personalListKeys = personalKeys.filter((key) => !key.startsWith(CHAT_GROUP_MSG_PREFIX));
  const [personal, groups] = await Promise.all([
    countListMessagesForRange(personalListKeys, range, 499),
    countListMessagesForRange(groupKeys, range, 499),
  ]);
  const managerDialogs = {};
  await Promise.all(CRM_MANAGER_DIALOGS.map(async (manager) => {
    managerDialogs[manager.key] = await countManagerDialogStats(manager, range, ctx);
  }));
  return {
    generalMessages: {
      total: general.total,
      period: range ? general.period : general.total,
    },
    personalDialogs: {
      total: personalListKeys.length,
      period: range ? personal.activeLists : personalListKeys.length,
      messagesTotal: personal.total,
      messagesPeriod: range ? personal.period : personal.total,
    },
    groupChats: {
      total: groupKeys.length,
      period: range ? groups.activeLists : groupKeys.length,
      messagesTotal: groups.total,
      messagesPeriod: range ? groups.period : groups.total,
    },
    managerDialogs,
  };
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

function personalChatKey(id1, id2) {
  const a = String(id1 || "").replace(/^tg_/, "");
  const b = String(id2 || "").replace(/^tg_/, "");
  return "poker_app:chat:" + (a < b ? a + "_" + b : b + "_" + a);
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

function isoFromMs(value) {
  const ms = Number(value);
  return Number.isFinite(ms) && ms > 0 ? new Date(ms).toISOString() : "";
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
    deposits: { 7: 0, 30: 0, 90: 0, custom: 0 },
    depositCount: { 7: 0, 30: 0, 90: 0, custom: 0 },
    messages: { 7: 0, 30: 0, 90: 0, custom: 0 },
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

function applyEvents(player, events, range) {
  const list = (Array.isArray(events) ? events : []).filter((ev) => ev && ev.type !== "game");
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
    player.depositCount.custom += depEvents.length;
    player.deposits.custom += depEvents.reduce((sum, ev) => sum + (Number(ev.amount) || 0), 0);
    player.messages.custom += inRange.filter((ev) => ev.type === "message").length;
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

function isCrmAllowedIdentity(identity) {
  const email = String((identity && identity.email) || "").trim().toLowerCase();
  return email === CRM_ALLOWED_EMAIL;
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
        telegramIds: [],
        telegramUsername: "",
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
    if (!row.methods.includes("email")) row.methods.push("email");
  });

  Object.keys(dtIds).forEach((runtimeId) => {
    if (!String(runtimeId).startsWith("tg_")) return;
    const accountId = String(dtIds[runtimeId] || "").trim();
    const row = ensure(accountId);
    if (!row) return;
    row.telegramIds.push(String(runtimeId));
    if (!row.methods.includes("telegram")) row.methods.push("telegram");
    const username = usernames[runtimeId] ? String(usernames[runtimeId]).replace(/^@+/, "").trim() : "";
    if (username && !row.telegramUsername) row.telegramUsername = "@" + username;
    if (!row.name && displayNames[runtimeId]) row.name = String(displayNames[runtimeId]).trim();
  });

  return [...map.values()]
    .map((row) => ({
      ...row,
      telegramIds: unique(row.telegramIds).slice(0, 4),
      methods: unique(row.methods),
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

async function buildRealPlayers(options = {}) {
  const range = rangeFromInput(options.range || options);
  const rangeKey = range ? "custom" : periodFromInput(options.period);
  const statsRange = range || rangeForPeriodKey(rangeKey);
  if (!redisConfigured()) {
    return { source: "no-redis", players: [], registeredAccounts: [], pokerPlusAccounts: [], campaigns: [] };
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
    ["HGETALL", POKERPLUS_BIND_AT_HASH],
    ["HGETALL", POKERPLUS_PROFILE_HASH],
    ["HGETALL", POKERPLUS_SYNC_HASH],
    ["HGETALL", CRM_OVERRIDES_HASH],
    ["LRANGE", CRM_CAMPAIGNS_LIST, "0", "24"],
    ["ZREVRANGE", TRACK_Z_INDEX, "0", "49"],
    ["HGETALL", TRACK_META_HASH],
    ["HGETALL", EMAIL_LINKS_HASH],
    ["HGETALL", EMAIL_ORIGINALS_HASH],
  ];
  ADMIN_IDS.forEach((id) => baseCommands.push(["SMEMBERS", "poker_app:chat_partners:" + id]));

  const results = await redisPipeline(baseCommands, { timeoutMs: 9000 });
  if (!results || !Array.isArray(results)) {
    return { source: "redis-error", players: [], registeredAccounts: [], pokerPlusAccounts: [], campaigns: [] };
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
  const pokerplusBoundAt = hashPairsToObject(results[14] && results[14].result);
  const pokerplusProfiles = hashPairsToObject(results[15] && results[15].result);
  const pokerplusSyncedAt = hashPairsToObject(results[16] && results[16].result);
  const overrides = hashPairsToObject(results[17] && results[17].result);
  const campaigns = (Array.isArray(results[18] && results[18].result) ? results[18].result : []).map((x) => safeJson(x, null)).filter(Boolean);
  const trackSlugs = Array.isArray(results[19] && results[19].result) ? results[19].result.map((x) => String(x)) : [];
  const trackMeta = hashPairsToObject(results[20] && results[20].result);
  const emailLinks = hashPairsToObject(results[21] && results[21].result);
  const emailOriginals = hashPairsToObject(results[22] && results[22].result);
  const adminPartnerSets = results.slice(23).map((r) => redisSet(r && r.result));
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
    if (range) {
      p.messages.custom += candidates.some((id) => {
        const n = Number(lastSeen[id]);
        return Number.isFinite(n) && n >= range.fromMs && n <= range.toMs;
      }) ? 1 : 0;
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

    applyEvents(p, eventsByAccount[accountId] || [], range);
    applyTouches(p, touchesByAccount[accountId] || []);
    p.tags = inferTags(p);
    p.botOpenRate = p.channels.bot ? 100 : 0;
    p.pushOpenRate = p.channels.push ? 100 : 0;
    p.trend = p.deposits["7"] > 0 || p.messages["7"] > 0 ? "есть активность" : "нет активности в CRM";
    if (!p.note) p.note = p.crm.note || "";
    if (p.lastDepositDays >= 999 && p.deposits["90"] <= 0) p.timeline.push("депозитов в CRM-журнале пока нет");
  }

  const players = sortPlayers([...playerMap.values()]).map(publicPlayer);
  return {
    source: "redis-live",
    players,
    registeredAccounts: buildRegisteredAccounts({ dtIds, usernames, displayNames, emailLinks, emailOriginals }),
    pokerPlusAccounts: buildPokerPlusAccounts({ pokerplusBind, pokerplusProfiles, pokerplusSyncedAt, pokerplusBoundAt, displayNames }),
    sourceAnalytics: computeSourceAnalytics(players, rangeKey),
    chatStats: await computeChatStats(statsRange, { usernames, displayNames, dtIds }),
    campaigns,
    pushConfigured: readVapidEnv().pushConfigured,
    range: range ? { key: "custom", from: range.from, to: range.to } : { key: rangeKey },
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
  if (!isCrmAllowedIdentity(auth.identity)) {
    return res.status(403).json({ ok: false, error: "CRM доступна только matvienkoro92@gmail.com" });
  }
  const permissions = crmPermissions(auth.memberId);

  if (req.method === "GET") {
    let query = {};
    try {
      query = Object.fromEntries(new URL(req.url, "http://local").searchParams.entries());
    } catch (e) {}
    const data = await buildRealPlayers({ range: { from: query.from, to: query.to }, period: query.period });
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
  return res.status(out.status).json(out.json);
};
