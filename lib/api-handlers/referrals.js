"use strict";

const { ensureDtIdForUserId, ID_TO_USER_KEY, linkUserIdToDtId } = require("../account-id");
const { resolveTrustedDtIdHintForUserId } = require("../account-link-guard");
const { authRequired, setCors } = require("../api-auth");
const { rejectBlockedAppUser } = require("../app-user-blocks");
const { EMAIL_ORIGINALS_KEY } = require("../email-auth");
const { BIND_AT_HASH_KEY, BIND_HASH_KEY, PROFILE_HASH_KEY } = require("../pokerplus");
const { pipeline: redisPipeline, hscanall, isConfigured: redisConfigured } = require("../redis");
const { pokerProfileStatusFromCachedProfile } = require("../chat-profile-status");
const {
  REFERRAL_AT_HASH,
  REFERRAL_REFERRER_HASH,
  REFERRAL_SOURCE_HASH,
} = require("../referrals");
const { raffleParticipantAccountId } = require("../raffle-core");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const USERNAMES_KEY = "poker_app:visitor_usernames";
const CHAT_DISPLAY_NAMES_KEY = "poker_app:visitor_chat_display_names";
const DAILY_POKER_PLAYED_COUNT_KEY = "poker_app:daily_poker_played_count";
const DAILY_POKER_TICKET_COUNT_KEY = "poker_app:daily_poker_ticket_count";
const RAFFLE_IDS_KEY = "poker_app:raffle_ids";
const RAFFLE_PREFIX = "poker_app:raffle:";
const REFERRALS_SUMMARY_CACHE_PREFIX = "poker_app:referrals_summary_cache:v1:";
const REFERRALS_FULL_CACHE_PREFIX = "poker_app:referrals_full_cache:v1:";
const REFERRALS_RAFFLE_STATS_CACHE_KEY = "poker_app:referrals_raffle_stats_cache:v1";
const REFERRALS_SUMMARY_CACHE_TTL_SECONDS = Math.max(60, Number(process.env.REFERRALS_SUMMARY_CACHE_TTL_SECONDS) || 10 * 60);
const REFERRALS_FULL_CACHE_TTL_SECONDS = Math.max(60, Number(process.env.REFERRALS_FULL_CACHE_TTL_SECONDS) || 5 * 60);
const REFERRALS_RAFFLE_STATS_CACHE_TTL_SECONDS = Math.max(60, Number(process.env.REFERRALS_RAFFLE_STATS_CACHE_TTL_SECONDS) || 15 * 60);

function apiError(res, status, error) {
  return res.status(status).json({ ok: false, error });
}

async function accountIdFromAuth(auth) {
  const memberId = auth && auth.memberId ? String(auth.memberId).trim() : "";
  if (!memberId || memberId.startsWith("guest_")) return "";
  if (/^ID\d{6}$/.test(memberId)) return memberId;
  return await ensureDtIdForUserId(memberId);
}

async function accountIdFromAuthAndRequest(auth, req) {
  const memberId = auth && auth.memberId ? String(auth.memberId).trim() : "";
  if (!memberId || memberId.startsWith("guest_")) return "";
  const rawHint =
    req && req.query
      ? String(req.query.dtIdHint || req.query.dt_id_hint || "").trim()
      : "";
  const dtIdHint = /^ID\d{6}$/.test(rawHint) ? rawHint : "";
  if (dtIdHint && !/^ID\d{6}$/.test(memberId)) {
    const trustedHint = await resolveTrustedDtIdHintForUserId(memberId, dtIdHint);
    if (trustedHint) {
      await linkUserIdToDtId(memberId, trustedHint, false);
      return trustedHint;
    }
  }
  return await accountIdFromAuth(auth);
}

function intValue(value) {
  return Math.max(0, parseInt(value || "0", 10) || 0);
}

function isoFromMs(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return "";
  return new Date(n).toISOString();
}

function safeJson(raw, fallback) {
  if (!raw) return fallback;
  try {
    const value = JSON.parse(String(raw));
    return value == null ? fallback : value;
  } catch (e) {
    return fallback;
  }
}

function setPrivateCacheHeaders(res, seconds) {
  if (!res || typeof res.setHeader !== "function") return;
  const ttl = Math.max(0, Number(seconds) || 0);
  res.setHeader("Cache-Control", "private, max-age=" + ttl);
}

async function readCachedJson(key) {
  if (!key) return null;
  try {
    const rows = await redisPipeline([["GET", key]], { timeoutMs: 2500 });
    const raw = rows && rows[0] ? rows[0].result : null;
    if (raw == null || raw === false) return null;
    return safeJson(raw, null);
  } catch (eCache) {
    return null;
  }
}

async function writeCachedJson(key, payload, ttlSeconds) {
  if (!key || !payload) return;
  try {
    await redisPipeline([[
      "SET",
      key,
      JSON.stringify(payload),
      "EX",
      String(Math.max(5, Number(ttlSeconds) || 60)),
    ]], { timeoutMs: 2500 });
  } catch (eCache) {}
}

function profileTotal(profile) {
  if (!profile || typeof profile !== "object") return {};
  if (profile.totalCounter && typeof profile.totalCounter === "object") return profile.totalCounter;
  if (profile.total_counter && typeof profile.total_counter === "object") return profile.total_counter;
  return {};
}

function buildReverseDt(dtIds) {
  const reverse = {};
  Object.keys(dtIds || {}).forEach((memberId) => {
    const dt = String(dtIds[memberId] || "").trim();
    if (dt && !reverse[dt]) reverse[dt] = memberId;
  });
  return reverse;
}

function participantMatches(row, identitySet) {
  if (!row || !identitySet || !identitySet.size) return false;
  const values = [
    row.userId,
    row.user_id,
    row.accountId,
    row.account_id,
    raffleParticipantAccountId(row),
  ];
  return values.some((value) => value != null && identitySet.has(String(value).trim()));
}

function raffleIdentityValues(row) {
  if (!row || typeof row !== "object") return [];
  const values = [
    row.userId,
    row.user_id,
    row.accountId,
    row.account_id,
    row.dtId,
    row.dt_id,
    row.memberId,
    row.member_id,
    raffleParticipantAccountId(row),
  ];
  return [...new Set(values.map((value) => String(value == null ? "" : value).trim()).filter(Boolean))];
}

function addRaffleStatsIndexValue(index, identity, kind, raffleId) {
  const id = String(identity || "").trim();
  const rid = String(raffleId || "").trim();
  if (!id || !rid) return;
  if (!index[id]) index[id] = { participated: [], won: [] };
  const list = kind === "won" ? index[id].won : index[id].participated;
  if (!list.includes(rid)) list.push(rid);
}

function buildRaffleStatsIndex(raffles) {
  const index = {};
  (Array.isArray(raffles) ? raffles : []).forEach((raffle) => {
    if (!raffle || typeof raffle !== "object" || raffle.status === "cancelled") return;
    const raffleId = String(raffle.id || raffle.createdAt || raffle.endDate || "").trim();
    if (!raffleId) return;
    (Array.isArray(raffle.participants) ? raffle.participants : []).forEach((row) => {
      raffleIdentityValues(row).forEach((identity) => addRaffleStatsIndexValue(index, identity, "participated", raffleId));
    });
    (Array.isArray(raffle.winners) ? raffle.winners : []).forEach((row) => {
      raffleIdentityValues(row).forEach((identity) => addRaffleStatsIndexValue(index, identity, "won", raffleId));
    });
  });
  return index;
}

function computeRaffleStatsFromIndex(index, accountId, chatUserId) {
  if (!index || typeof index !== "object") return null;
  const identities = [...new Set([accountId, chatUserId].map((id) => String(id || "").trim()).filter(Boolean))];
  if (!identities.length) return { participated: 0, won: 0 };
  const participated = new Set();
  const won = new Set();
  identities.forEach((identity) => {
    const row = index[identity];
    if (!row || typeof row !== "object") return;
    (Array.isArray(row.participated) ? row.participated : []).forEach((id) => participated.add(String(id)));
    (Array.isArray(row.won) ? row.won : []).forEach((id) => won.add(String(id)));
  });
  return { participated: participated.size, won: won.size };
}

async function buildCachedRaffleStatsIndex() {
  const cached = await readCachedJson(REFERRALS_RAFFLE_STATS_CACHE_KEY);
  if (cached && cached.ok === true && cached.index && typeof cached.index === "object") return cached.index;

  const idsRes = await redisPipeline([["LRANGE", RAFFLE_IDS_KEY, "0", "-1"]], {
    timeoutMs: 7000,
    context: "referrals.raffle-stats.ids",
    allowLargeRedisRead: true,
  });
  const idsRaw = idsRes && idsRes[0] && Array.isArray(idsRes[0].result) ? idsRes[0].result : [];
  const ids = [...new Set(idsRaw.map((id) => String(id || "").trim()).filter(Boolean))];
  const rows = ids.length ? await redisPipeline(ids.map((id) => ["GET", RAFFLE_PREFIX + id]), {
    timeoutMs: 8000,
    context: "referrals.raffle-stats.rows",
    allowLargeRedisRead: true,
  }) : [];
  const raffles = [];
  for (let i = 0; i < ids.length; i += 1) {
    const raw = rows && rows[i] && rows[i].result;
    if (!raw) continue;
    const parsed = safeJson(raw, null);
    if (parsed && typeof parsed === "object") raffles.push(parsed);
  }
  const index = buildRaffleStatsIndex(raffles);
  await writeCachedJson(REFERRALS_RAFFLE_STATS_CACHE_KEY, {
    ok: true,
    updatedAt: new Date().toISOString(),
    raffleCount: raffles.length,
    index,
  }, REFERRALS_RAFFLE_STATS_CACHE_TTL_SECONDS);
  return index;
}

function computeRaffleStats(raffles, accountId, chatUserId) {
  const identitySet = new Set([accountId, chatUserId].filter(Boolean));
  const stats = { participated: 0, won: 0 };
  (Array.isArray(raffles) ? raffles : []).forEach((raffle) => {
    if (!raffle || typeof raffle !== "object") return;
    const participants = Array.isArray(raffle.participants) ? raffle.participants : [];
    const winners = Array.isArray(raffle.winners) ? raffle.winners : [];
    if (participants.some((row) => participantMatches(row, identitySet))) stats.participated += 1;
    if (winners.some((row) => participantMatches(row, identitySet))) stats.won += 1;
  });
  return stats;
}

function publicAccountMeta(accountId, ctx) {
  const idToUser = ctx.idToUser || {};
  const reverseDt = ctx.reverseDt || {};
  const usernames = ctx.usernames || {};
  const displayNames = ctx.displayNames || {};
  const chatUserId = String(idToUser[accountId] || reverseDt[accountId] || "").trim();
  const username = String((chatUserId && usernames[chatUserId]) || usernames[accountId] || "").replace(/^@+/, "").trim();
  const nickname = String(displayNames[accountId] || (chatUserId ? displayNames[chatUserId] : "") || "").trim();
  return {
    accountId,
    chatUserId: chatUserId || null,
    telegramLogin: username ? "@" + username : "",
    name: nickname || (username ? "@" + username : accountId),
  };
}

function publicInviteRow(accountId, ctx) {
  const emails = ctx.emails || {};
  const pokerplusBind = ctx.pokerplusBind || {};
  const pokerplusBoundAt = ctx.pokerplusBoundAt || {};
  const pokerplusProfiles = ctx.pokerplusProfiles || {};
  const meta = publicAccountMeta(accountId, ctx);
  const chatUserId = meta.chatUserId || "";
  const profile = safeJson(pokerplusProfiles[accountId], null);
  const total = profileTotal(profile);
  const fee = Number(total.fee);
  const pokerPlusUserId = String(pokerplusBind[accountId] || "").trim();
  const indexedRaffleStats = computeRaffleStatsFromIndex(ctx.raffleStatsIndex, accountId, chatUserId);
  const raffleStats = indexedRaffleStats || computeRaffleStats(ctx.raffles, accountId, chatUserId);
  const bindings = {
    telegram: !!chatUserId,
    email: !!String(emails[accountId] || "").trim(),
    poker21: !!pokerPlusUserId,
  };
  return {
    accountId,
    chatUserId: meta.chatUserId,
    telegramLogin: meta.telegramLogin,
    name: meta.name,
    invitedAt: isoFromMs(ctx.referralAt[accountId]),
    inviteSource: String(ctx.referralSources[accountId] || "").trim(),
    dailyPoker: {
      spins: intValue(ctx.dailyPlayed[accountId] || (chatUserId ? ctx.dailyPlayed[chatUserId] : 0)),
      ticketsWon: intValue(ctx.dailyTickets[accountId] || (chatUserId ? ctx.dailyTickets[chatUserId] : 0)),
    },
    raffles: raffleStats,
    level: pokerPlusUserId ? pokerProfileStatusFromCachedProfile(profile, { pokerPlusLinked: true }).level : 0,
    poker21: {
      linked: !!pokerPlusUserId,
      id: pokerPlusUserId || "",
      linkedAt: isoFromMs(pokerplusBoundAt[accountId]),
    },
    bindings,
    linked: Object.keys(bindings).filter((key) => bindings[key]),
  };
}

function buildReferrerRanking(referralReferrers, ctx, excludeAccountId) {
  const excludedId = String(excludeAccountId || "").trim();
  const groups = {};
  Object.keys(referralReferrers || {}).forEach((referredId) => {
    const referrerId = String(referralReferrers[referredId] || "").trim();
    if (!/^ID\d{6}$/.test(referrerId) || !/^ID\d{6}$/.test(referredId)) return;
    if (excludedId && referrerId === excludedId) return;
    if (!groups[referrerId]) {
      const meta = publicAccountMeta(referrerId, ctx);
      groups[referrerId] = {
        accountId: referrerId,
        telegramLogin: meta.telegramLogin,
        name: meta.name,
        invitedCount: 0,
        totalPoker21Level: 0,
        poker21LinkedInvited: 0,
      };
    }
    const invitedRow = publicInviteRow(referredId, ctx);
    groups[referrerId].invitedCount += 1;
    groups[referrerId].totalPoker21Level += intValue(invitedRow.level);
    if (invitedRow.poker21 && invitedRow.poker21.linked) groups[referrerId].poker21LinkedInvited += 1;
  });
  return Object.keys(groups)
    .map((id) => groups[id])
    .sort((a, b) => (
      b.invitedCount - a.invitedCount ||
      b.totalPoker21Level - a.totalPoker21Level ||
      String(a.name || a.accountId).localeCompare(String(b.name || b.accountId), "ru")
    ))
    .slice(0, 50)
    .map((row, index) => Object.assign({ rank: index + 1 }, row));
}

function referralsSummaryRequested(req) {
  if (!req || !req.query) return false;
  const value = String(req.query.summary || req.query.totals || req.query.achievements || "").trim().toLowerCase();
  return value === "1" || value === "true" || value === "yes";
}

function countInvitedByReferrer(referralReferrers, accountId) {
  const id = String(accountId || "").trim();
  if (!id) return 0;
  return Object.keys(referralReferrers || {}).reduce((count, invitedId) => (
    String(referralReferrers[invitedId] || "").trim() === id ? count + 1 : count
  ), 0);
}

async function buildReferralsSummary(accountId) {
  const cacheKey = REFERRALS_SUMMARY_CACHE_PREFIX + encodeURIComponent(String(accountId || ""));
  const cached = await readCachedJson(cacheKey);
  if (cached && cached.ok === true && cached.totals) return Object.assign({}, cached, { cached: true });
  const referralReferrers = await hscanall(REFERRAL_REFERRER_HASH, {
    timeoutMs: 4000,
    context: "referrals.summary",
    count: 500,
    maxPages: 40,
  });
  if (!referralReferrers) return { ok: false, error: "Redis error" };
  const invited = countInvitedByReferrer(referralReferrers, accountId);
  const payload = {
    ok: true,
    summary: true,
    accountId,
    updatedAt: new Date().toISOString(),
    totals: { invited },
  };
  await writeCachedJson(cacheKey, payload, REFERRALS_SUMMARY_CACHE_TTL_SECONDS);
  return payload;
}

module.exports = async function handler(req, res) {
  setCors(res, "GET, OPTIONS", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return apiError(res, 405, "GET only");
  if (!redisConfigured()) return apiError(res, 500, "Сервер не настроен");

  const auth = authRequired(req, {}, BOT_TOKEN);
  if (!auth.ok) return apiError(res, auth.status || 401, auth.error || "Auth required");
  if (await rejectBlockedAppUser(req, res, auth)) return;
  const accountId = await accountIdFromAuthAndRequest(auth, req);
  if (!accountId) return apiError(res, 401, "Auth required");

  if (referralsSummaryRequested(req)) {
    setPrivateCacheHeaders(res, 60);
    return res.status(200).json(await buildReferralsSummary(accountId));
  }

  const fullCacheKey = REFERRALS_FULL_CACHE_PREFIX + encodeURIComponent(String(accountId || ""));
  const forceFresh = req.query && (req.query.fresh === "1" || req.query.noCache === "1" || req.query.no_cache === "1");
  if (!forceFresh) {
    const cached = await readCachedJson(fullCacheKey);
    if (cached && cached.ok === true && Array.isArray(cached.invited) && cached.totals) {
      setPrivateCacheHeaders(res, 60);
      return res.status(200).json(Object.assign({}, cached, { cached: true }));
    }
  }

  const [referralReferrers, referralAt, referralSources] = await Promise.all([
    hscanall(REFERRAL_REFERRER_HASH, { timeoutMs: 7000, context: "referrals.referrers", count: 500, maxPages: 40 }),
    hscanall(REFERRAL_AT_HASH, { timeoutMs: 7000, context: "referrals.at", count: 500, maxPages: 40 }),
    hscanall(REFERRAL_SOURCE_HASH, { timeoutMs: 7000, context: "referrals.sources", count: 500, maxPages: 40 }),
  ]);
  if (!referralReferrers || !referralAt || !referralSources) return apiError(res, 500, "Redis error");
  const accountIds = [...new Set(
    Object.keys(referralReferrers)
      .concat(Object.values(referralReferrers))
      .map((id) => String(id || "").trim())
      .filter((id) => /^ID\d{6}$/.test(id))
  )];
  const keyedObject = (values, keys) => {
    const out = {};
    keys.forEach((key, index) => {
      if (values && values[index] != null) out[key] = values[index];
    });
    return out;
  };
  const accountRows = accountIds.length ? await redisPipeline([
    ["HMGET", ID_TO_USER_KEY, ...accountIds],
    ["HMGET", DAILY_POKER_PLAYED_COUNT_KEY, ...accountIds],
    ["HMGET", DAILY_POKER_TICKET_COUNT_KEY, ...accountIds],
    ["HMGET", BIND_HASH_KEY, ...accountIds],
    ["HMGET", BIND_AT_HASH_KEY, ...accountIds],
    ["HMGET", PROFILE_HASH_KEY, ...accountIds],
    ["HMGET", EMAIL_ORIGINALS_KEY, ...accountIds],
  ], { timeoutMs: 7000, context: "referrals.accounts" }) : [];
  if (accountIds.length && !accountRows) return apiError(res, 500, "Redis error");
  const rowValues = (index) => accountRows[index] && Array.isArray(accountRows[index].result) ? accountRows[index].result : [];
  const idToUser = keyedObject(rowValues(0), accountIds);
  const dailyPlayed = keyedObject(rowValues(1), accountIds);
  const dailyTickets = keyedObject(rowValues(2), accountIds);
  const pokerplusBind = keyedObject(rowValues(3), accountIds);
  const pokerplusBoundAt = keyedObject(rowValues(4), accountIds);
  const pokerplusProfiles = keyedObject(rowValues(5), accountIds);
  const emails = keyedObject(rowValues(6), accountIds);
  const chatIds = [...new Set(Object.values(idToUser).map((id) => String(id || "").trim()).filter(Boolean))];
  const identityIds = [...new Set(accountIds.concat(chatIds))];
  const identityRows = identityIds.length ? await redisPipeline([
    ["HMGET", USERNAMES_KEY, ...identityIds],
    ["HMGET", CHAT_DISPLAY_NAMES_KEY, ...identityIds],
    ["HMGET", DAILY_POKER_PLAYED_COUNT_KEY, ...chatIds],
    ["HMGET", DAILY_POKER_TICKET_COUNT_KEY, ...chatIds],
  ], { timeoutMs: 5000, context: "referrals.identities" }) : [];
  if (identityIds.length && !identityRows) return apiError(res, 500, "Redis error");
  const identityValues = (index) => identityRows[index] && Array.isArray(identityRows[index].result) ? identityRows[index].result : [];
  const usernames = keyedObject(identityValues(0), identityIds);
  const displayNames = keyedObject(identityValues(1), identityIds);
  Object.assign(dailyPlayed, keyedObject(identityValues(2), chatIds));
  Object.assign(dailyTickets, keyedObject(identityValues(3), chatIds));
  const dtIds = {};
  const invitedIds = Object.keys(referralReferrers)
    .filter((id) => String(referralReferrers[id] || "").trim() === accountId)
    .sort((a, b) => intValue(referralAt[b]) - intValue(referralAt[a]));

  const raffleStatsIndex = invitedIds.length ? await buildCachedRaffleStatsIndex() : {};

  const ctx = {
    dailyPlayed,
    dailyTickets,
    displayNames,
    dtIds,
    emails,
    idToUser,
    pokerplusBind,
    pokerplusBoundAt,
    pokerplusProfiles,
    raffleStatsIndex,
    referralAt,
    referralSources,
    reverseDt: buildReverseDt(dtIds),
    usernames,
  };
  const invited = invitedIds.map((id) => publicInviteRow(id, ctx));
  const ranking = buildReferrerRanking(referralReferrers, ctx, accountId);
  const totals = invited.reduce((acc, row) => {
    acc.dailySpins += row.dailyPoker.spins;
    acc.dailyTicketsWon += row.dailyPoker.ticketsWon;
    acc.rafflesParticipated += row.raffles.participated;
    acc.rafflesWon += row.raffles.won;
    if (row.poker21.linked) acc.poker21Linked += 1;
    if (row.bindings.telegram) acc.telegramLinked += 1;
    if (row.bindings.email) acc.emailLinked += 1;
    return acc;
  }, {
    invited: invited.length,
    dailySpins: 0,
    dailyTicketsWon: 0,
    rafflesParticipated: 0,
    rafflesWon: 0,
    poker21Linked: 0,
    telegramLinked: 0,
    emailLinked: 0,
  });

  const payload = { ok: true, accountId, invited, totals, ranking, updatedAt: new Date().toISOString() };
  await writeCachedJson(fullCacheKey, payload, REFERRALS_FULL_CACHE_TTL_SECONDS);
  setPrivateCacheHeaders(res, 60);
  return res.status(200).json(payload);
};
