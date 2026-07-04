"use strict";

const crypto = require("crypto");
const { authRequired, isAdminIdentity, parseBody, setCors } = require("../api-auth");
const { ensureDtIdForUserId } = require("../account-id");
const { pokerProfileStatusFromCachedProfile } = require("../chat-profile-status");
const { readPokerPlusProfile } = require("../pokerplus");
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { getJson, isConfigured: redisConfigured, pipeline: redisPipeline, setJson } = require("../redis");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const STATE_KEY = "poker_app:club_choice_vote";
const ROUND_MS = 24 * 60 * 60 * 1000;
const CANDIDATE_NICK_MAX = 48;
const CANDIDATE_DESCRIPTION_MAX = 180;
const HISTORY_LIMIT = 24;
const ACCESS_LEVELS = new Set(["all", "level1", "level10", "level25", "level50"]);
const MANUAL_ACHIEVEMENT_HISTORY = Object.freeze([
  Object.freeze({
    month: "2026-05",
    winners: Object.freeze([
      Object.freeze({ place: 1, nick: "Em13" }),
    ]),
  }),
]);

function setShortPublicCacheHeaders(res, seconds) {
  if (!res || typeof res.setHeader !== "function") return;
  const ttl = Math.max(5, Number(seconds) || 30);
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=" + ttl + ", stale-while-revalidate=" + ttl);
}

function cleanText(value, max) {
  return String(value == null ? "" : value)
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function monthKeyFromDate(date) {
  const d = date instanceof Date && !Number.isNaN(date.getTime()) ? date : new Date();
  return String(d.getUTCFullYear()) + "-" + String(d.getUTCMonth() + 1).padStart(2, "0");
}

function validMonthKey(value) {
  const raw = cleanText(value, 10);
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(raw) ? raw : "";
}

function monthKeyFromCandidates(candidates, fallbackDate) {
  const rows = Array.isArray(candidates) ? candidates : [];
  const dates = rows
    .map((candidate) => Date.parse(candidate && candidate.createdAt || ""))
    .filter((ms) => Number.isFinite(ms))
    .sort((a, b) => a - b);
  return dates.length ? monthKeyFromDate(new Date(dates[0])) : monthKeyFromDate(new Date(fallbackDate || Date.now()));
}

function candidateId() {
  return "cc_" + Date.now().toString(36) + "_" + crypto.randomBytes(4).toString("hex");
}

function matchId(roundIndex, side, index) {
  return "r" + String(roundIndex) + "_" + String(side || "final") + "_" + String(index);
}

function shuffle(items) {
  const out = (items || []).slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = crypto.randomInt(i + 1);
    const tmp = out[i];
    out[i] = out[j];
    out[j] = tmp;
  }
  return out;
}

function defaultState() {
  return {
    version: 1,
    status: "draft",
    monthKey: monthKeyFromDate(new Date()),
    candidates: [],
    settings: {
      accessLevel: "all",
      anonymous: true,
    },
    paused: false,
    pausedAt: "",
    pauseRemainingMs: 0,
    bracket: null,
    rounds: [],
    currentRoundId: "",
    history: [],
    updatedAt: new Date().toISOString(),
  };
}

function normalizeState(raw) {
  const state = raw && typeof raw === "object" ? raw : defaultState();
  state.version = 1;
  state.status = ["draft", "active", "completed"].includes(state.status) ? state.status : "draft";
  state.monthKey = validMonthKey(state.monthKey) || monthKeyFromCandidates(state.candidates, Date.now());
  state.candidates = Array.isArray(state.candidates) ? state.candidates : [];
  state.settings = state.settings && typeof state.settings === "object" ? state.settings : {};
  state.settings.accessLevel = ACCESS_LEVELS.has(state.settings.accessLevel) ? state.settings.accessLevel : "all";
  state.settings.anonymous = state.settings.anonymous !== false;
  state.paused = state.paused === true;
  state.pausedAt = cleanText(state.pausedAt || "", 32);
  state.pauseRemainingMs = Math.max(0, Number(state.pauseRemainingMs) || 0);
  state.rounds = Array.isArray(state.rounds) ? state.rounds : [];
  state.history = Array.isArray(state.history) ? state.history : [];
  return state;
}

async function loadState() {
  if (!redisConfigured()) return defaultState();
  return normalizeState(await getJson(STATE_KEY, defaultState(), { context: "club-choice.load" }));
}

async function saveState(state) {
  state.updatedAt = new Date().toISOString();
  await setJson(STATE_KEY, state, { context: "club-choice.save" });
}

function makeMatch(roundIndex, side, index, ids) {
  const candidateIds = (ids || []).filter(Boolean);
  return {
    id: matchId(roundIndex, side, index),
    side,
    candidateIds,
    winnerId: candidateIds.length === 1 ? candidateIds[0] : "",
    votes: {},
    voters: {},
  };
}

function pairMatches(ids, side, roundIndex) {
  const matches = [];
  for (let i = 0; i < ids.length; i += 2) {
    matches.push(makeMatch(roundIndex, side, matches.length + 1, ids.slice(i, i + 2)));
  }
  return matches;
}

function roundName(roundIndex, side) {
  if (side === "final") return "Финал";
  if (roundIndex === 1) return "Первый раунд";
  return "Раунд " + String(roundIndex);
}

function startRound(roundIndex, side, matches, now) {
  return {
    id: "round_" + String(roundIndex) + "_" + String(side || "bracket"),
    index: roundIndex,
    side,
    name: roundName(roundIndex, side),
    startedAt: new Date(now).toISOString(),
    endsAt: new Date(now + ROUND_MS).toISOString(),
    matches,
  };
}

function resolveMatchWinner(match) {
  if (!match || match.winnerId) return match && match.winnerId ? match.winnerId : "";
  const ids = Array.isArray(match.candidateIds) ? match.candidateIds.filter(Boolean) : [];
  if (ids.length <= 1) return ids[0] || "";
  const votes = match.votes && typeof match.votes === "object" ? match.votes : {};
  let winner = ids[0];
  let best = Number(votes[winner]) || 0;
  ids.slice(1).forEach((id) => {
    const count = Number(votes[id]) || 0;
    if (count > best) {
      winner = id;
      best = count;
    }
  });
  return winner;
}

function candidateById(state) {
  const map = new Map();
  (state.candidates || []).forEach((candidate) => {
    if (candidate && candidate.id) map.set(String(candidate.id), candidate);
  });
  return map;
}

function totalVotesForCandidate(state, candidateIdValue) {
  let total = 0;
  (state.rounds || []).forEach((round) => {
    (round.matches || []).forEach((match) => {
      total += Number(match.votes && match.votes[candidateIdValue]) || 0;
    });
  });
  return total;
}

function recordHistory(state, winnerId) {
  const candidates = candidateById(state);
  const rows = [winnerId].filter(Boolean).map((id, index) => {
    const candidate = candidates.get(id) || {};
    return {
      place: index + 1,
      accountId: cleanText(candidate.accountId || "", 24),
      nick: cleanText(candidate.nick || "", CANDIDATE_NICK_MAX),
      description: cleanText(candidate.description || "", CANDIDATE_DESCRIPTION_MAX),
      votes: totalVotesForCandidate(state, id),
    };
  });
  if (!rows.length) return;
  const entry = {
    month: state.monthKey || monthKeyFromDate(new Date()),
    completedAt: new Date().toISOString(),
    winners: rows,
  };
  const withoutSameMonth = (state.history || []).filter((item) => item && item.month !== entry.month);
  state.history = [entry].concat(withoutSameMonth).slice(0, HISTORY_LIMIT);
}

function achievementHistory(state) {
  const rows = Array.isArray(state && state.history) ? state.history : [];
  const seen = new Set();
  return MANUAL_ACHIEVEMENT_HISTORY.concat(rows).filter((row) => {
    const key = String(row && row.month || "").trim() || JSON.stringify(row);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function currentRound(state) {
  return (state.rounds || []).find((round) => round && round.id === state.currentRoundId) || null;
}

function advanceExpiredRound(state, now) {
  if (!state || state.status !== "active") return false;
  if (state.paused) return false;
  const round = currentRound(state);
  if (!round || !round.endsAt || Date.parse(round.endsAt) > now) return false;
  (round.matches || []).forEach((match) => {
    match.winnerId = resolveMatchWinner(match);
  });
  const winners = (round.matches || []).map((match) => match.winnerId).filter(Boolean);
  if (winners.length <= 1) {
    const winnerId = winners[0] || "";
    state.status = "completed";
    state.completedAt = new Date(now).toISOString();
    state.currentRoundId = "";
    recordHistory(state, winnerId);
    return true;
  }

  const left = winners.filter((id) => {
    const source = (round.matches || []).find((match) => match.winnerId === id);
    return source && source.side === "left";
  });
  const right = winners.filter((id) => {
    const source = (round.matches || []).find((match) => match.winnerId === id);
    return source && source.side === "right";
  });
  const nextIndex = (Number(round.index) || 1) + 1;
  let nextMatches = [];
  let side = "bracket";
  if (left.length === 1 && right.length === 1) {
    nextMatches = [makeMatch(nextIndex, "final", 1, [left[0], right[0]])];
    side = "final";
  } else {
    nextMatches = pairMatches(left, "left", nextIndex).concat(pairMatches(right, "right", nextIndex));
  }
  const nextRound = startRound(nextIndex, side, nextMatches, now);
  state.rounds.push(nextRound);
  state.currentRoundId = nextRound.id;
  return true;
}

function startVoting(state, options, now) {
  const activeCandidates = (state.candidates || []).filter((candidate) => candidate && candidate.id && candidate.nick);
  if (activeCandidates.length < 2) {
    const error = new Error("Нужно минимум 2 кандидата");
    error.status = 400;
    throw error;
  }
  const shuffled = shuffle(activeCandidates.map((candidate) => candidate.id));
  const split = Math.ceil(shuffled.length / 2);
  const left = shuffled.slice(0, split);
  const right = shuffled.slice(split);
  const matches = pairMatches(left, "left", 1).concat(pairMatches(right, "right", 1));
  const round = startRound(1, "bracket", matches, now);
  state.status = "active";
  state.monthKey = validMonthKey(options.monthKey) || monthKeyFromCandidates(activeCandidates, now);
  state.settings = {
    accessLevel: ACCESS_LEVELS.has(options.accessLevel) ? options.accessLevel : "all",
    anonymous: options.anonymous !== false,
  };
  state.bracket = { left, right };
  state.rounds = [round];
  state.currentRoundId = round.id;
  state.paused = false;
  state.pausedAt = "";
  state.pauseRemainingMs = 0;
  state.completedAt = "";
}

function pauseVoting(state, now) {
  if (!state || state.status !== "active") {
    const error = new Error("Голосование не запущено");
    error.status = 400;
    throw error;
  }
  if (state.paused) return false;
  const round = currentRound(state);
  const endsAt = round && round.endsAt ? Date.parse(round.endsAt) : 0;
  state.paused = true;
  state.pausedAt = new Date(now).toISOString();
  state.pauseRemainingMs = Math.max(1000, Number.isFinite(endsAt) ? endsAt - now : ROUND_MS);
  return true;
}

function resumeVoting(state, now) {
  if (!state || state.status !== "active") {
    const error = new Error("Голосование не запущено");
    error.status = 400;
    throw error;
  }
  if (!state.paused) return false;
  const round = currentRound(state);
  const left = Math.max(1000, Number(state.pauseRemainingMs) || ROUND_MS);
  if (round) round.endsAt = new Date(now + left).toISOString();
  state.paused = false;
  state.pausedAt = "";
  state.pauseRemainingMs = 0;
  return true;
}

function displayNameFromIdentity(identity, fallback) {
  const first = cleanText(identity && identity.firstName, 40);
  const last = cleanText(identity && identity.lastName, 40);
  const username = cleanText(identity && (identity.telegramUsername || identity.pwaUsername), 40);
  const name = [first, last].filter(Boolean).join(" ");
  if (name) return name;
  if (username) return "@" + username.replace(/^@+/, "");
  return fallback || "";
}

async function readVoterLevel(accountId) {
  if (!accountId || !redisConfigured()) return 0;
  const bindRows = await redisPipeline([["HGET", "poker_app:pokerplus_user_ids", accountId]]);
  const p21 = bindRows && bindRows[0] && bindRows[0].result ? String(bindRows[0].result).trim() : "";
  const profile = await readPokerPlusProfile(accountId) || (p21 ? await readPokerPlusProfile(p21) : null);
  if (!profile) return 0;
  return pokerProfileStatusFromCachedProfile(profile, { pokerPlusLinked: true }).level || 0;
}

async function voterAccess(state, accountId) {
  const levelName = state && state.settings ? state.settings.accessLevel : "all";
  if (levelName === "all") return { ok: true, level: 0 };
  const level = await readVoterLevel(accountId);
  const required = parseInt(String(levelName).replace(/\D+/g, ""), 10) || 1;
  return {
    ok: level >= required,
    level,
    required,
  };
}

function publicHomeSummary(state) {
  const currentId = state && state.currentRoundId ? String(state.currentRoundId) : "";
  const round = (Array.isArray(state && state.rounds) ? state.rounds : []).find((item) => item && String(item.id) === currentId) || null;
  return {
    ok: true,
    summary: true,
    status: state.status,
    paused: state.paused === true,
    currentRoundId: currentId,
    rounds: round ? [{
      id: round.id,
      index: round.index,
      side: round.side,
      name: round.name,
      startedAt: round.startedAt,
      endsAt: round.endsAt,
    }] : [],
    serverTime: new Date().toISOString(),
  };
}

function publicState(state, context) {
  const isAdmin = !!(context && context.isAdmin);
  const accountId = context && context.accountId ? String(context.accountId) : "";
  const includeVoters = isAdmin || (state.settings && state.settings.anonymous === false);
  const candidates = candidateById(state);
  const rounds = (state.rounds || []).map((round) => ({
    id: round.id,
    index: round.index,
    side: round.side,
    name: round.name,
    startedAt: round.startedAt,
    endsAt: round.endsAt,
    matches: (round.matches || []).map((match) => {
      const voters = match.voters && typeof match.voters === "object" ? match.voters : {};
      const myVote = accountId && voters[accountId] ? voters[accountId].candidateId : "";
      const row = {
        id: match.id,
        side: match.side,
        candidateIds: match.candidateIds || [],
        winnerId: match.winnerId || "",
        votes: match.votes || {},
        myVote,
      };
      if (includeVoters) {
        row.voters = Object.keys(voters).map((id) => ({
          accountId: id,
          candidateId: voters[id] && voters[id].candidateId,
          displayName: state.settings && state.settings.anonymous ? "" : cleanText(voters[id] && voters[id].displayName, 80),
        }));
      }
      return row;
    }),
  }));
  return {
    ok: true,
    isAdmin,
    status: state.status,
    monthKey: state.monthKey,
    settings: state.settings,
    paused: state.paused === true,
    pausedAt: state.pausedAt || "",
    pauseRemainingMs: state.paused ? Math.max(0, Number(state.pauseRemainingMs) || 0) : 0,
    candidates: (state.candidates || []).map((candidate) => ({
      id: candidate.id,
      nick: candidate.nick,
      description: candidate.description,
      accountId: candidate.accountId || "",
      createdAt: candidate.createdAt,
    })),
    bracket: state.bracket,
    rounds,
    currentRoundId: state.currentRoundId || "",
    history: state.history || [],
    candidatesById: Object.fromEntries(candidates),
    canVote: !!(context && context.canVote) && state.paused !== true,
    access: context && context.access ? context.access : null,
    serverTime: new Date().toISOString(),
  };
}

async function optionalContext(req, body) {
  const identity = resolveTelegramIdentity(req, body || {}, BOT_TOKEN);
  if (!identity) return { identity: null, memberId: "", accountId: "", isAdmin: false };
  const memberId = memberIdFromIdentity(identity);
  const accountId = memberId ? await ensureDtIdForUserId(memberId) : "";
  return {
    identity,
    memberId,
    accountId: accountId || "",
    isAdmin: isAdminIdentity(identity, memberId),
  };
}

module.exports = async function handler(req, res) {
  setCors(res, "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (!redisConfigured()) return res.status(500).json({ ok: false, error: "Сервер не настроен" });

  if (req.method === "GET") {
    const mode = String((req.query && req.query.mode) || "").trim();
    const summaryMode = req.query && (req.query.summary === "1" || req.query.summary === "true" || req.query.homeSummary === "1");
    const state = await loadState();
    if (advanceExpiredRound(state, Date.now())) await saveState(state);
    if (mode === "achievements") {
      setShortPublicCacheHeaders(res, 45);
      return res.status(200).json({ ok: true, rows: achievementHistory(state) });
    }
    if (summaryMode) {
      setShortPublicCacheHeaders(res, 30);
      return res.status(200).json(publicHomeSummary(state));
    }
    const context = await optionalContext(req, {});
    const access = context.accountId ? await voterAccess(state, context.accountId) : { ok: false };
    return res.status(200).json(publicState(state, { ...context, access, canVote: access.ok }));
  }

  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "POST only" });

  let body = {};
  try {
    body = parseBody(req);
  } catch (error) {
    return res.status(400).json({ ok: false, error: "Invalid JSON" });
  }
  const auth = authRequired(req, body, BOT_TOKEN);
  if (!auth.ok) return res.status(auth.status || 401).json({ ok: false, error: auth.error || "Auth required" });
  const accountId = await ensureDtIdForUserId(auth.memberId);
  if (!accountId) return res.status(500).json({ ok: false, error: "Не удалось определить аккаунт" });

  const action = cleanText(body.action, 32);
  const state = await loadState();
  const now = Date.now();
  let changed = advanceExpiredRound(state, now);

  try {
    if (action === "addCandidate") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      if (state.status !== "draft" && state.status !== "completed") {
        return res.status(400).json({ ok: false, error: "Кандидатов можно менять только до запуска" });
      }
      const nick = cleanText(body.nick, CANDIDATE_NICK_MAX);
      const description = cleanText(body.description, CANDIDATE_DESCRIPTION_MAX);
      if (!nick) return res.status(400).json({ ok: false, error: "Укажите никнейм" });
      state.status = state.status === "completed" ? "draft" : state.status;
      if (!(state.candidates || []).length) state.monthKey = monthKeyFromDate(new Date(now));
      state.candidates.push({
        id: candidateId(),
        nick,
        description,
        accountId: cleanText(body.accountId || "", 24),
        createdAt: new Date(now).toISOString(),
      });
      changed = true;
    } else if (action === "removeCandidate") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      if (state.status !== "draft") return res.status(400).json({ ok: false, error: "Нельзя удалять после запуска" });
      const id = cleanText(body.candidateId, 80);
      state.candidates = (state.candidates || []).filter((candidate) => candidate.id !== id);
      changed = true;
    } else if (action === "updateCandidate") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      if (state.status !== "draft") return res.status(400).json({ ok: false, error: "Нельзя редактировать после запуска" });
      const id = cleanText(body.candidateId, 80);
      const candidate = (state.candidates || []).find((item) => item && item.id === id);
      if (!candidate) return res.status(404).json({ ok: false, error: "Кандидат не найден" });
      const nick = cleanText(body.nick, CANDIDATE_NICK_MAX);
      const description = cleanText(body.description, CANDIDATE_DESCRIPTION_MAX);
      if (!nick) return res.status(400).json({ ok: false, error: "Укажите никнейм" });
      candidate.nick = nick;
      candidate.description = description;
      candidate.updatedAt = new Date(now).toISOString();
      changed = true;
    } else if (action === "start") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      if (state.status === "active") return res.status(400).json({ ok: false, error: "Голосование уже идет" });
      startVoting(state, {
        accessLevel: cleanText(body.accessLevel, 20),
        anonymous: body.anonymous !== false,
        monthKey: cleanText(body.monthKey, 10),
      }, now);
      changed = true;
    } else if (action === "newDraft") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      const history = state.history || [];
      Object.assign(state, defaultState(), { history });
      changed = true;
    } else if (action === "pause") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      changed = pauseVoting(state, now) || changed;
    } else if (action === "resume") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      changed = resumeVoting(state, now) || changed;
    } else if (action === "vote") {
      if (state.status !== "active") return res.status(400).json({ ok: false, error: "Голосование не запущено" });
      if (state.paused) return res.status(423).json({ ok: false, error: "Голосование на паузе" });
      const access = await voterAccess(state, accountId);
      if (!access.ok) return res.status(403).json({ ok: false, error: "Недостаточный уровень для голосования", access });
      const round = currentRound(state);
      if (!round) return res.status(400).json({ ok: false, error: "Раунд не найден" });
      if (Date.parse(round.endsAt) <= now) {
        if (advanceExpiredRound(state, now)) {
          await saveState(state);
          return res.status(409).json({ ok: false, error: "Раунд завершен", state: publicState(state, { ...auth, accountId, access, canVote: access.ok }) });
        }
      }
      const match = (round.matches || []).find((item) => item.id === cleanText(body.matchId, 80));
      const candidate = cleanText(body.candidateId, 80);
      if (!match || !match.candidateIds || !match.candidateIds.includes(candidate)) {
        return res.status(400).json({ ok: false, error: "Пара не найдена" });
      }
      if (match.winnerId) return res.status(400).json({ ok: false, error: "Пара уже завершена" });
      match.votes = match.votes && typeof match.votes === "object" ? match.votes : {};
      match.voters = match.voters && typeof match.voters === "object" ? match.voters : {};
      const prev = match.voters[accountId] && match.voters[accountId].candidateId;
      if (prev && prev !== candidate) match.votes[prev] = Math.max(0, (Number(match.votes[prev]) || 0) - 1);
      if (!prev || prev !== candidate) match.votes[candidate] = (Number(match.votes[candidate]) || 0) + 1;
      match.voters[accountId] = {
        candidateId: candidate,
        displayName: displayNameFromIdentity(auth.identity, accountId),
        votedAt: new Date(now).toISOString(),
      };
      changed = true;
    } else {
      return res.status(400).json({ ok: false, error: "Неизвестное действие" });
    }
  } catch (error) {
    return res.status(error.status || 500).json({ ok: false, error: error.message || "Ошибка" });
  }

  if (changed) await saveState(state);
  const access = await voterAccess(state, accountId);
  return res.status(200).json(publicState(state, { ...auth, accountId, access, canVote: access.ok }));
};
