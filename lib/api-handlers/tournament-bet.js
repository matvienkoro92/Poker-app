"use strict";

const crypto = require("crypto");
const { authRequired, parseBody, setCors } = require("../api-auth");
const { ensureDtIdForUserId } = require("../account-id");
const { isConfigured: redisConfigured, pipeline: redisPipeline } = require("../redis");
const { getGroupMemberData, PROFILE_HASH_KEY, PROFILE_SYNC_AT_HASH_KEY } = require("../pokerplus");
const { pokerProfileStatusFromCachedProfile } = require("../chat-profile-status");
const { processDirectChange: processPoker21DirectChange } = require("./pokerplus-chips");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const STATE_KEY = "poker_app:tournament_bet:current";
const HISTORY_KEY = "poker_app:tournament_bet:history";
const LOCK_KEY = "poker_app:tournament_bet:lock";
const POKER21_BIND_KEY = "poker_app:pokerplus_user_ids";
const PROFILE_CITY_KEY = "poker_app:profile_cities";
const AVATAR_PREFIX = "poker_app:avatar:";
const MAX_MONEY = 100000000;
const POKER21_CHUNK = Math.max(1, Math.floor(Number(process.env.POKERPLUS_CHIPS_MAX_ABS || 1000) || 1000));

function text(value, max) {
  return String(value == null ? "" : value).replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max || 120);
}

function money(value) {
  const amount = Math.floor(Number(String(value == null ? "" : value).replace(/[^\d]/g, "")) || 0);
  return Math.max(0, Math.min(MAX_MONEY, amount));
}

function assetFile(value) {
  const file = text(value, 120);
  return /^[a-z0-9][a-z0-9._-]*\.(?:webp|png|jpe?g)$/i.test(file) ? file : "";
}

function parseJson(raw) {
  try { return raw ? JSON.parse(raw) : null; } catch (error) { return null; }
}

function bankFor(state) {
  return money(state && state.startingBank) + (Array.isArray(state && state.entries) ? state.entries.length : 0) * money(state && state.stakePrice);
}

function ratingFor(history, currentState, context) {
  const events = Array.isArray(history) ? history.slice() : [];
  if (currentState && !events.some(function (item) { return item && item.id === currentState.id; })) events.push(currentState);
  const players = new Map();
  events.forEach(function (event) {
    if (!event || !Array.isArray(event.entries)) return;
    const wonAmount = money(event.winnerPaidAmount || (event.status === "settled" ? bankFor(event) : 0));
    event.entries.forEach(function (entry) {
      const id = text(entry.accountId || entry.poker21Id || entry.memberId, 80);
      if (!id) return;
      const row = players.get(id) || {
        accountId: id, poker21Id: entry.poker21Id || "", name: entry.name || "Игрок", avatar: entry.avatar || "",
        level: entry.level == null ? null : Math.max(0, Math.floor(Number(entry.level) || 0)), profileCity: entry.profileCity || "",
        participations: 0, wins: 0, totalStaked: 0, totalWon: 0,
      };
      row.name = entry.name || row.name;
      row.avatar = entry.avatar || row.avatar;
      row.profileCity = entry.profileCity || row.profileCity;
      if (entry.level != null) row.level = Math.max(0, Math.floor(Number(entry.level) || 0));
      row.participations += 1;
      row.totalStaked += money(entry.stake || event.stakePrice);
      if (event.status === "settled" && event.winnerAccountId === entry.accountId) {
        row.wins += 1;
        row.totalWon += wonAmount;
      }
      players.set(id, row);
    });
  });
  return Array.from(players.values()).map(function (row) {
    return {
      accountId: context && context.isAdmin ? row.accountId : "",
      poker21Id: context && context.isAdmin ? row.poker21Id : "",
      name: row.name, avatar: row.avatar, level: row.level, profileCity: row.profileCity,
      participations: row.participations, wins: row.wins, totalStaked: row.totalStaked, totalWon: row.totalWon,
      net: row.totalWon - row.totalStaked,
      winRate: row.participations ? Math.round(row.wins * 1000 / row.participations) / 10 : 0,
      mine: !!(context && context.accountId) && row.accountId === context.accountId,
    };
  }).sort(function (a, b) {
    return b.totalWon - a.totalWon || b.net - a.net || b.wins - a.wins || b.participations - a.participations || a.name.localeCompare(b.name, "ru");
  }).map(function (row, index) { return { ...row, place: index + 1 }; });
}

function publicState(state, context, history) {
  const source = state && typeof state === "object" ? state : null;
  const accountId = context && context.accountId || "";
  if (!source) return { ok: true, active: false, isAdmin: !!(context && context.isAdmin), entries: [], rating: ratingFor(history, null, context) };
  const entries = (Array.isArray(source.entries) ? source.entries : []).map(function (entry) {
    return {
      accountId: context && context.isAdmin ? entry.accountId : "",
      poker21Id: context && context.isAdmin ? entry.poker21Id : "",
      name: entry.name || "Игрок",
      avatar: entry.avatar || "",
      level: Number.isFinite(Number(entry.level)) ? Math.max(0, Math.floor(Number(entry.level))) : null,
      profileCity: entry.profileCity || "",
      stake: money(entry.stake || source.stakePrice),
      joinedAt: entry.joinedAt || "",
      mine: !!accountId && entry.accountId === accountId,
      winner: !!source.winnerAccountId && entry.accountId === source.winnerAccountId,
    };
  });
  return {
    ok: true,
    active: source.status === "open",
    id: source.id,
    title: source.title || "Турнир вечера",
    tournamentId: source.tournamentId || "",
    tournamentBanner: source.tournamentBanner || "",
    tournamentBannerAlt: source.tournamentBannerAlt || source.title || "Турнир вечера",
    tournamentBannerWidth: Math.max(1, Number(source.tournamentBannerWidth) || 640),
    tournamentBannerHeight: Math.max(1, Number(source.tournamentBannerHeight) || 915),
    tournamentBuyin: source.tournamentBuyin || "",
    tournamentGuarantee: source.tournamentGuarantee || "",
    status: source.status || "open",
    startingBank: money(source.startingBank),
    stakePrice: money(source.stakePrice),
    bank: bankFor(source),
    entries,
    participantsCount: entries.length,
    myEntry: entries.find(function (entry) { return entry.mine; }) || null,
    winnerAccountId: context && context.isAdmin ? source.winnerAccountId || "" : "",
    winnerPaidAt: source.winnerPaidAt || "",
    isAdmin: !!(context && context.isAdmin),
    rating: ratingFor(history, source, context),
  };
}

async function readState() {
  const rows = await redisPipeline([["GET", STATE_KEY]], { context: "tournament-bet.read", throwOnError: true });
  return parseJson(rows && rows[0] && rows[0].result);
}

async function readHistory() {
  const rows = await redisPipeline([["LRANGE", HISTORY_KEY, "0", "99"]], { context: "tournament-bet.history" });
  return (rows && rows[0] && Array.isArray(rows[0].result) ? rows[0].result : []).map(parseJson).filter(Boolean);
}

async function saveState(state) {
  const rows = await redisPipeline([["SET", STATE_KEY, JSON.stringify(state)]], { context: "tournament-bet.write", throwOnError: true });
  if (!rows || !rows[0] || rows[0].error) throw new Error("Не удалось сохранить событие");
}

async function saveSettledState(state) {
  const serialized = JSON.stringify(state);
  const rows = await redisPipeline([
    ["SET", STATE_KEY, serialized],
    ["LPUSH", HISTORY_KEY, serialized],
    ["LTRIM", HISTORY_KEY, "0", "99"],
  ], { context: "tournament-bet.settle-write", throwOnError: true });
  if (!rows || rows.some(function (row) { return row && row.error; })) throw new Error("Не удалось сохранить результат события");
}

async function acquireLock() {
  const token = crypto.randomUUID();
  const rows = await redisPipeline([["SET", LOCK_KEY, token, "NX", "EX", "180"]], { context: "tournament-bet.lock", throwOnError: true });
  return rows && rows[0] && rows[0].result === "OK" ? token : "";
}

async function releaseLock(token) {
  if (!token) return;
  try {
    const rows = await redisPipeline([["GET", LOCK_KEY]], { context: "tournament-bet.unlock-read" });
    if (rows && rows[0] && rows[0].result === token) await redisPipeline([["DEL", LOCK_KEY]], { context: "tournament-bet.unlock" });
  } catch (error) {}
}

function identityName(auth, player) {
  const identity = auth && auth.identity || {};
  return text(
    player && player.nickname || identity.displayName || identity.firstName || identity.telegramUsername || identity.pwaUsername || "Игрок",
    80
  );
}

function identityAvatar(auth) {
  const identity = auth && auth.identity || {};
  return text(identity.photoUrl || identity.avatarUrl || identity.photo_url || "", 600);
}

function storedAvatar(value) {
  const raw = String(value || "").trim();
  if (raw.startsWith("data:") || raw.startsWith("./assets/") || raw.startsWith("/assets/")) return raw;
  if (!raw.startsWith("preset:")) return "";
  const id = raw.slice(7).replace(/[^a-z0-9_-]/gi, "");
  if (!id) return "";
  return id === "monkey" ? "./assets/daily-poker-monkey.webp" : "./assets/avatar-" + id + ".jpg";
}

async function profilePresentation(accountId, memberId, fallbackAvatar) {
  const safeAccountId = String(accountId || "").replace(/[^a-zA-Z0-9_-]/g, "_");
  const safeMemberId = String(memberId || "").replace(/[^a-zA-Z0-9_-]/g, "_");
  const rows = await redisPipeline([
    ["GET", AVATAR_PREFIX + safeAccountId],
    ["GET", AVATAR_PREFIX + safeMemberId],
    ["HGET", PROFILE_CITY_KEY, String(accountId || "")],
    ["HGET", PROFILE_CITY_KEY, String(memberId || "")],
  ], { context: "tournament-bet.profile-presentation" });
  return {
    avatar: storedAvatar(rows && rows[0] && rows[0].result) || storedAvatar(rows && rows[1] && rows[1].result) || fallbackAvatar || "",
    profileCity: text(rows && ((rows[2] && rows[2].result) || (rows[3] && rows[3].result)), 40),
  };
}

async function hydrateEntryProfiles(state) {
  if (!state || !Array.isArray(state.entries)) return state;
  await Promise.all(state.entries.map(async function (entry) {
    const presentation = await profilePresentation(entry.accountId, entry.memberId, entry.avatar || "");
    if (presentation.avatar) entry.avatar = presentation.avatar;
    if (presentation.profileCity) entry.profileCity = presentation.profileCity;
    if (entry.level == null && entry.poker21Id) {
      try {
        const rows = await redisPipeline([
          ["HGET", PROFILE_HASH_KEY, entry.poker21Id],
          ["HGET", PROFILE_SYNC_AT_HASH_KEY, entry.poker21Id],
        ], { context: "tournament-bet.profile-level" });
        const profile = parseJson(rows && rows[0] && rows[0].result);
        if (profile) {
          const syncedAt = Number(rows && rows[1] && rows[1].result) || 0;
          if (syncedAt) profile.syncedAt = syncedAt;
          const status = pokerProfileStatusFromCachedProfile(profile, { pokerPlusLinked: true });
          if (status && Number.isFinite(Number(status.level))) entry.level = Math.max(0, Math.floor(Number(status.level)));
        }
      } catch (error) {}
    }
    if (entry.level == null && entry.poker21Id) {
      try {
        const player = await getGroupMemberData({ userId: entry.poker21Id });
        if (Number.isFinite(Number(player && player.level))) entry.level = Math.max(0, Math.floor(Number(player.level)));
        if (player && player.nickname) entry.name = identityName({}, player);
      } catch (error) {}
    }
  }));
  return state;
}

async function linkedPoker21Id(accountId, memberId) {
  const rows = await redisPipeline([
    ["HGET", POKER21_BIND_KEY, accountId],
    ["HGET", POKER21_BIND_KEY, memberId],
  ], { context: "tournament-bet.binding", throwOnError: true });
  return text(rows && ((rows[0] && rows[0].result) || (rows[1] && rows[1].result)), 40);
}

function poker21Error(error, fallback) {
  const raw = String(error && error.message || "");
  if (/balance|gold|insufficient|not enough|недостат/i.test(raw)) return "Пополните баланс в Poker21, чтобы сделать ставку.";
  return raw ? raw.replace(/PokerPlus/g, "Poker21") : fallback;
}

async function changePoker21Amount(options) {
  const source = options && typeof options === "object" ? options : {};
  const total = Math.trunc(Number(source.chips) || 0);
  const direction = total < 0 ? -1 : 1;
  let remaining = Math.abs(total);
  let part = 0;
  while (remaining > 0) {
    const amount = Math.min(POKER21_CHUNK, remaining) * direction;
    await processPoker21DirectChange({
      userId: source.userId,
      chips: amount,
      idempotencyKey: source.idempotencyKey + ":part:" + part,
      reference: source.reference,
      requestedBy: source.requestedBy,
    });
    remaining -= Math.abs(amount);
    part += 1;
  }
}

module.exports = async function handler(req, res) {
  setCors(res, "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (!redisConfigured()) return res.status(503).json({ ok: false, error: "Сервер временно недоступен" });

  if (req.method === "GET") {
    const auth = authRequired(req, {}, BOT_TOKEN);
    const context = { isAdmin: !!(auth && auth.ok && auth.isAdmin), accountId: "" };
    if (auth && auth.ok) context.accountId = await ensureDtIdForUserId(auth.memberId) || "";
    const state = await hydrateEntryProfiles(await readState());
    return res.status(200).json(publicState(state, context, await readHistory()));
  }
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "POST only" });

  let body;
  try { body = parseBody(req); } catch (error) { return res.status(400).json({ ok: false, error: "Некорректный запрос" }); }
  const auth = authRequired(req, body, BOT_TOKEN);
  if (!auth.ok) return res.status(auth.status || 401).json({ ok: false, error: auth.error || "Нужно войти в аккаунт" });
  const accountId = await ensureDtIdForUserId(auth.memberId);
  if (!accountId) return res.status(500).json({ ok: false, error: "Не удалось определить аккаунт" });
  const action = text(body.action, 30);
  const lockToken = await acquireLock();
  if (!lockToken) return res.status(409).json({ ok: false, error: "Событие обновляется. Повторите через пару секунд." });

  try {
    let state = await readState();
    let history = await readHistory();
    if (action === "create") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только для администратора" });
      const startingBank = money(body.startingBank);
      const stakePrice = money(body.stakePrice);
      const tournamentId = text(body.tournamentId, 40);
      const tournamentTitle = text(body.tournamentTitle || body.title, 80);
      if (startingBank < 1 || stakePrice < 1) return res.status(400).json({ ok: false, error: "Укажите стартовый банк и цену ставки" });
      if (!tournamentId || !tournamentTitle) return res.status(400).json({ ok: false, error: "Выберите турнир вечера" });
      if (state && state.status !== "settled" && Array.isArray(state.entries) && state.entries.length) {
        return res.status(409).json({ ok: false, error: "Сначала завершите текущее событие со ставками" });
      }
      state = {
        id: "tb_" + Date.now().toString(36) + "_" + crypto.randomBytes(4).toString("hex"),
        title: tournamentTitle,
        tournamentId,
        tournamentBanner: assetFile(body.tournamentBanner),
        tournamentBannerAlt: text(body.tournamentBannerAlt, 160) || tournamentTitle,
        tournamentBannerWidth: Math.max(1, Math.min(2400, Number(body.tournamentBannerWidth) || 640)),
        tournamentBannerHeight: Math.max(1, Math.min(2400, Number(body.tournamentBannerHeight) || 915)),
        tournamentBuyin: text(body.tournamentBuyin, 60),
        tournamentGuarantee: text(body.tournamentGuarantee, 80),
        status: "open",
        startingBank,
        stakePrice,
        entries: [],
        createdAt: new Date().toISOString(),
        createdBy: String(auth.memberId),
      };
      await saveState(state);
      return res.status(200).json(publicState(state, { isAdmin: true, accountId }, history));
    }

    if (!state) return res.status(404).json({ ok: false, error: "Событие ещё не создано" });

    if (action === "bet") {
      if (state.status !== "open") return res.status(409).json({ ok: false, error: "Приём ставок уже закрыт" });
      if ((state.entries || []).some(function (entry) { return entry.accountId === accountId; })) {
        return res.status(409).json({ ok: false, error: "Вы уже сделали ставку на себя" });
      }
      const poker21Id = await linkedPoker21Id(accountId, String(auth.memberId));
      if (!poker21Id) return res.status(403).json({ ok: false, error: "Сначала привяжите аккаунт Poker21 в профиле." });
      const stake = money(state.stakePrice);
      let player;
      try {
        player = await getGroupMemberData({ userId: poker21Id });
        if (!Number.isFinite(Number(player.balance)) || Number(player.balance) < stake) {
          return res.status(409).json({ ok: false, error: "Пополните баланс в Poker21, чтобы сделать ставку.", code: "POKER21_INSUFFICIENT_BALANCE" });
        }
        await changePoker21Amount({
          userId: poker21Id,
          chips: -stake,
          idempotencyKey: "tournament-bet:" + state.id + ":" + accountId,
          reference: "tournament-bet:" + state.id,
          requestedBy: "tournament-bet:" + accountId,
        });
      } catch (error) {
        return res.status(error && error.statusCode || 502).json({ ok: false, error: poker21Error(error, "Не удалось списать ставку в Poker21") });
      }
      state.entries = Array.isArray(state.entries) ? state.entries : [];
      const presentation = await profilePresentation(accountId, String(auth.memberId), identityAvatar(auth));
      state.entries.push({
        accountId,
        memberId: String(auth.memberId),
        poker21Id,
        name: identityName(auth, player),
        avatar: presentation.avatar,
        level: Number.isFinite(Number(player && player.level)) ? Math.max(0, Math.floor(Number(player.level))) : null,
        profileCity: presentation.profileCity,
        joinedAt: new Date().toISOString(),
        stake,
      });
      state.updatedAt = new Date().toISOString();
      await saveState(state);
      return res.status(200).json(publicState(state, { isAdmin: !!auth.isAdmin, accountId }, history));
    }

    if (action === "close") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только для администратора" });
      if (state.status !== "open") return res.status(409).json({ ok: false, error: "Приём ставок уже закрыт" });
      state.status = "closed";
      state.closedAt = new Date().toISOString();
      await saveState(state);
      return res.status(200).json(publicState(state, { isAdmin: true, accountId }, history));
    }

    if (action === "settle") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только для администратора" });
      if (state.status === "settled") return res.status(200).json(publicState(state, { isAdmin: true, accountId }, history));
      const winnerAccountId = text(body.winnerAccountId, 60);
      const winner = (state.entries || []).find(function (entry) { return entry.accountId === winnerAccountId; });
      if (!winner) return res.status(400).json({ ok: false, error: "Выберите победителя из участников" });
      const bank = bankFor(state);
      try {
        await changePoker21Amount({
          userId: winner.poker21Id,
          chips: bank,
          idempotencyKey: "tournament-bet-payout:" + state.id + ":" + winner.accountId,
          reference: "tournament-bet-payout:" + state.id,
          requestedBy: "tournament-bet-admin:" + String(auth.memberId),
        });
      } catch (error) {
        return res.status(error && error.statusCode || 502).json({ ok: false, error: poker21Error(error, "Не удалось начислить банк победителю") });
      }
      state.status = "settled";
      state.winnerAccountId = winner.accountId;
      state.winnerPaidAt = new Date().toISOString();
      state.winnerPaidAmount = bank;
      await saveSettledState(state);
      history = [state].concat(history.filter(function (item) { return item && item.id !== state.id; }));
      return res.status(200).json(publicState(state, { isAdmin: true, accountId }, history));
    }

    return res.status(400).json({ ok: false, error: "Неизвестное действие" });
  } finally {
    await releaseLock(lockToken);
  }
};

module.exports.bankFor = bankFor;
module.exports.money = money;
module.exports.assetFile = assetFile;
module.exports.publicState = publicState;
module.exports.ratingFor = ratingFor;
