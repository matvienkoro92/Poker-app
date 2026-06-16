"use strict";

const { ensureDtIdForUserId, ID_TO_USER_KEY, DT_IDS_KEY } = require("../account-id");
const { authRequired, setCors } = require("../api-auth");
const { EMAIL_ORIGINALS_KEY } = require("../email-auth");
const { BIND_AT_HASH_KEY, BIND_HASH_KEY, PROFILE_HASH_KEY } = require("../pokerplus");
const { pipeline: redisPipeline, hashPairsToObject, isConfigured: redisConfigured } = require("../redis");
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

function apiError(res, status, error) {
  return res.status(status).json({ ok: false, error });
}

async function accountIdFromAuth(auth) {
  const memberId = auth && auth.memberId ? String(auth.memberId).trim() : "";
  if (!memberId || memberId.startsWith("guest_")) return "";
  if (/^ID\d{6}$/.test(memberId)) return memberId;
  return await ensureDtIdForUserId(memberId);
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

function publicInviteRow(accountId, ctx) {
  const dtIds = ctx.dtIds || {};
  const idToUser = ctx.idToUser || {};
  const reverseDt = ctx.reverseDt || {};
  const usernames = ctx.usernames || {};
  const displayNames = ctx.displayNames || {};
  const emails = ctx.emails || {};
  const pokerplusBind = ctx.pokerplusBind || {};
  const pokerplusBoundAt = ctx.pokerplusBoundAt || {};
  const pokerplusProfiles = ctx.pokerplusProfiles || {};
  const chatUserId = String(idToUser[accountId] || reverseDt[accountId] || "").trim();
  const username = String((chatUserId && usernames[chatUserId]) || usernames[accountId] || "").replace(/^@+/, "").trim();
  const nickname = String(displayNames[accountId] || (chatUserId ? displayNames[chatUserId] : "") || "").trim();
  const profile = safeJson(pokerplusProfiles[accountId], null);
  const total = profileTotal(profile);
  const fee = Number(total.fee);
  const pokerPlusUserId = String(pokerplusBind[accountId] || "").trim();
  const raffleStats = computeRaffleStats(ctx.raffles, accountId, chatUserId);
  const bindings = {
    telegram: !!chatUserId,
    email: !!String(emails[accountId] || "").trim(),
    poker21: !!pokerPlusUserId,
  };
  return {
    accountId,
    chatUserId: chatUserId || null,
    telegramLogin: username ? "@" + username : "",
    name: nickname || (username ? "@" + username : accountId),
    invitedAt: isoFromMs(ctx.referralAt[accountId]),
    inviteSource: String(ctx.referralSources[accountId] || "").trim(),
    dailyPoker: {
      spins: intValue(ctx.dailyPlayed[accountId] || (chatUserId ? ctx.dailyPlayed[chatUserId] : 0)),
      ticketsWon: intValue(ctx.dailyTickets[accountId] || (chatUserId ? ctx.dailyTickets[chatUserId] : 0)),
    },
    raffles: raffleStats,
    level: pokerPlusUserId ? pokerStatusLevelFromFee(Number.isFinite(fee) ? fee : 0) : 0,
    poker21: {
      linked: !!pokerPlusUserId,
      id: pokerPlusUserId || "",
      linkedAt: isoFromMs(pokerplusBoundAt[accountId]),
    },
    bindings,
    linked: Object.keys(bindings).filter((key) => bindings[key]),
  };
}

module.exports = async function handler(req, res) {
  setCors(res, "GET, OPTIONS", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return apiError(res, 405, "GET only");
  if (!redisConfigured()) return apiError(res, 500, "Сервер не настроен");

  const auth = authRequired(req, {}, BOT_TOKEN);
  if (!auth.ok) return apiError(res, auth.status || 401, auth.error || "Auth required");
  const accountId = await accountIdFromAuth(auth);
  if (!accountId) return apiError(res, 401, "Auth required");

  const baseRows = await redisPipeline([
    ["HGETALL", REFERRAL_REFERRER_HASH],
    ["HGETALL", REFERRAL_AT_HASH],
    ["HGETALL", REFERRAL_SOURCE_HASH],
    ["HGETALL", USERNAMES_KEY],
    ["HGETALL", CHAT_DISPLAY_NAMES_KEY],
    ["HGETALL", ID_TO_USER_KEY],
    ["HGETALL", DT_IDS_KEY],
    ["HGETALL", DAILY_POKER_PLAYED_COUNT_KEY],
    ["HGETALL", DAILY_POKER_TICKET_COUNT_KEY],
    ["HGETALL", BIND_HASH_KEY],
    ["HGETALL", BIND_AT_HASH_KEY],
    ["HGETALL", PROFILE_HASH_KEY],
    ["HGETALL", EMAIL_ORIGINALS_KEY],
    ["LRANGE", RAFFLE_IDS_KEY, "0", "-1"],
  ], { timeoutMs: 7000, context: "referrals.base" });
  if (!baseRows) return apiError(res, 500, "Redis error");

  const referralReferrers = hashPairsToObject(baseRows[0] && baseRows[0].result);
  const referralAt = hashPairsToObject(baseRows[1] && baseRows[1].result);
  const referralSources = hashPairsToObject(baseRows[2] && baseRows[2].result);
  const usernames = hashPairsToObject(baseRows[3] && baseRows[3].result);
  const displayNames = hashPairsToObject(baseRows[4] && baseRows[4].result);
  const idToUser = hashPairsToObject(baseRows[5] && baseRows[5].result);
  const dtIds = hashPairsToObject(baseRows[6] && baseRows[6].result);
  const dailyPlayed = hashPairsToObject(baseRows[7] && baseRows[7].result);
  const dailyTickets = hashPairsToObject(baseRows[8] && baseRows[8].result);
  const pokerplusBind = hashPairsToObject(baseRows[9] && baseRows[9].result);
  const pokerplusBoundAt = hashPairsToObject(baseRows[10] && baseRows[10].result);
  const pokerplusProfiles = hashPairsToObject(baseRows[11] && baseRows[11].result);
  const emails = hashPairsToObject(baseRows[12] && baseRows[12].result);
  const raffleIds = baseRows[13] && Array.isArray(baseRows[13].result) ? baseRows[13].result.map(String).filter(Boolean) : [];
  const invitedIds = Object.keys(referralReferrers)
    .filter((id) => String(referralReferrers[id] || "").trim() === accountId)
    .sort((a, b) => intValue(referralAt[b]) - intValue(referralAt[a]));

  let raffles = [];
  if (raffleIds.length && invitedIds.length) {
    const raffleRows = await redisPipeline(raffleIds.map((id) => ["GET", RAFFLE_PREFIX + id]), {
      timeoutMs: 8000,
      context: "referrals.raffles",
    });
    raffles = (raffleRows || []).map((row) => safeJson(row && row.result, null)).filter(Boolean);
  }

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
    raffles,
    referralAt,
    referralSources,
    reverseDt: buildReverseDt(dtIds),
    usernames,
  };
  const invited = invitedIds.map((id) => publicInviteRow(id, ctx));
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

  return res.status(200).json({ ok: true, accountId, invited, totals });
};
