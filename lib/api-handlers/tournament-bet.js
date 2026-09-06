"use strict";

const crypto = require("crypto");
const subscriptions = require("../tournament-bet-subscriptions");
const { authRequired, parseBody, setCors } = require("../api-auth");
const { ensureDtIdForUserId } = require("../account-id");
const { isConfigured: redisConfigured, pipeline: redisPipeline } = require("../redis");
const { getGroupMemberData, PROFILE_HASH_KEY, PROFILE_SYNC_AT_HASH_KEY } = require("../pokerplus");
const { pokerProfileStatusFromCachedProfile } = require("../chat-profile-status");
const { processDirectChange: processPoker21DirectChange } = require("./pokerplus-chips");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const STATE_KEY = "poker_app:tournament_bet:current";
const HISTORY_KEY = "poker_app:tournament_bet:history";
const PERSONAL_EVENTS_KEY = "poker_app:tournament_bet:personal_events";
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
      winRate: row.totalStaked > 0 ? Math.round(row.totalWon * 1000 / row.totalStaked) / 10 : 0,
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
    tournamentTime: source.tournamentTime || "",
    createdByPlayer: !!source.createdByPlayer,
    status: source.status || "open",
    startingBank: money(source.startingBank),
    stakePrice: money(source.stakePrice),
    bank: bankFor(source),
    entries,
    participantsCount: entries.length,
    myEntry: entries.find(function (entry) { return entry.mine; }) || null,
    winnerAccountId: context && context.isAdmin ? source.winnerAccountId || "" : "",
    winnerPaidAt: source.winnerPaidAt || "",
    winnerPaidAmount: source.winnerPaidAmount == null ? null : money(source.winnerPaidAmount),
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

async function readPersonalStates() {
  const rows = await redisPipeline([["HVALS", PERSONAL_EVENTS_KEY]], { context: "tournament-bet.personal-events" });
  return (rows && rows[0] && Array.isArray(rows[0].result) ? rows[0].result : []).map(parseJson).filter(Boolean);
}

function eventMenu(mainState, personalStates, accountId) {
  return [mainState].concat(Array.isArray(personalStates) ? personalStates : []).filter(Boolean).filter(function (item) {
    return item && item.id && item.status !== "settled";
  }).map(function (item) {
    return { id: item.id, title: item.title || "Турнир", bank: bankFor(item), stakePrice: money(item.stakePrice), status: item.status || "open", participantsCount: Array.isArray(item.entries) ? item.entries.length : 0, createdByPlayer: !!item.createdByPlayer, joined: !!(accountId && Array.isArray(item.entries) && item.entries.some(function (entry) { return entry && entry.accountId === accountId; })) };
  });
}

function addEventMenu(payload, mainState, personalStates, accountId) {
  payload.events = eventMenu(mainState, personalStates, accountId);
  return payload;
}

async function saveState(state) {
  const rows = await redisPipeline([["SET", STATE_KEY, JSON.stringify(state)]], { context: "tournament-bet.write", throwOnError: true });
  if (!rows || !rows[0] || rows[0].error) throw new Error("Не удалось сохранить событие");
}

async function savePersonalState(state) {
  const rows = await redisPipeline([["HSET", PERSONAL_EVENTS_KEY, state.id, JSON.stringify(state)]], { context: "tournament-bet.personal-write", throwOnError: true });
  if (!rows || !rows[0] || rows[0].error) throw new Error("Не удалось сохранить персональную ставку");
}

async function saveSelectedState(state) {
  return state && state.createdByPlayer ? savePersonalState(state) : saveState(state);
}

async function saveSettledState(state) {
  const serialized = JSON.stringify(state);
  const stateWrite = state && state.createdByPlayer ? ["HSET", PERSONAL_EVENTS_KEY, state.id, serialized] : ["SET", STATE_KEY, serialized];
  const rows = await redisPipeline([
    stateWrite,
    ["LPUSH", HISTORY_KEY, serialized],
    ["LTRIM", HISTORY_KEY, "0", "99"],
  ], { context: "tournament-bet.settle-write", throwOnError: true });
  if (!rows || rows.some(function (row) { return row && row.error; })) throw new Error("Не удалось сохранить результат события");
}

function scopedLockKey(scope) {
  return LOCK_KEY + ":" + String(scope || "main").replace(/[^a-zA-Z0-9:_-]/g, "_").slice(0, 120);
}

async function acquireLock(scope) {
  const token = crypto.randomUUID();
  const rows = await redisPipeline([["SET", scopedLockKey(scope), token, "NX", "EX", "180"]], { context: "tournament-bet.lock", throwOnError: true });
  return rows && rows[0] && rows[0].result === "OK" ? token : "";
}

async function releaseLock(token, scope) {
  if (!token) return;
  const key = scopedLockKey(scope);
  try {
    const rows = await redisPipeline([["GET", key]], { context: "tournament-bet.unlock-read" });
    if (rows && rows[0] && rows[0].result === token) await redisPipeline([["DEL", key]], { context: "tournament-bet.unlock" });
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
    if (entry.level == null) {
      try {
        const profileIds = [...new Set([entry.poker21Id, entry.accountId, entry.memberId].map(function (id) { return text(id, 80); }).filter(Boolean))];
        const rows = await redisPipeline(profileIds.flatMap(function (id) {
          return [["HGET", PROFILE_HASH_KEY, id], ["HGET", PROFILE_SYNC_AT_HASH_KEY, id]];
        }), { context: "tournament-bet.profile-level" });
        let profile = null;
        let syncedAt = 0;
        for (let index = 0; index < profileIds.length; index += 1) {
          profile = parseJson(rows && rows[index * 2] && rows[index * 2].result);
          syncedAt = Number(rows && rows[index * 2 + 1] && rows[index * 2 + 1].result) || 0;
          if (profile) break;
        }
        if (profile) {
          if (syncedAt) profile.syncedAt = syncedAt;
          const status = pokerProfileStatusFromCachedProfile(profile, { pokerPlusLinked: true });
          if (status && Number.isFinite(Number(status.level))) entry.level = Math.max(0, Math.floor(Number(status.level)));
          const profileName = text(profile.nickname || profile.Nike || profile.nick || profile.name || profile.displayName || profile.display_name, 80);
          if (profileName) entry.name = profileName;
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
    const mode = text(req.query && req.query.mode, 30);
    if (mode === "achievements") {
      const state = await hydrateEntryProfiles(await readState());
      const personalStates = await readPersonalStates();
      res.setHeader("Cache-Control", "public, max-age=30, s-maxage=30");
      return res.status(200).json({ ok: true, rows: ratingFor((await readHistory()).concat(personalStates), state, {}) });
    }
    const auth = authRequired(req, {}, BOT_TOKEN);
    const context = { isAdmin: !!(auth && auth.ok && auth.isAdmin), accountId: "" };
    if (auth && auth.ok) context.accountId = await ensureDtIdForUserId(auth.memberId) || "";
    res.setHeader("Cache-Control", "no-store");
    const mainState = await readState();
    const personalStates = await readPersonalStates();
    const requestedEventId = text(req.query && req.query.eventId, 80);
    const selectedState = requestedEventId ? personalStates.find(function (item) { return item && item.id === requestedEventId; }) || (mainState && mainState.id === requestedEventId ? mainState : null) : mainState || null;
    const state = await hydrateEntryProfiles(selectedState);
    const result = addEventMenu(publicState(state, context, await readHistory()), mainState, personalStates, context.accountId);
    result.subscribed = await subscriptions.status(auth, context.accountId);
    return res.status(200).json(result);
  }
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "POST only" });

  let body;
  try { body = parseBody(req); } catch (error) { return res.status(400).json({ ok: false, error: "Некорректный запрос" }); }
  const auth = authRequired(req, body, BOT_TOKEN);
  if (!auth.ok) return res.status(auth.status || 401).json({ ok: false, error: auth.error || "Нужно войти в аккаунт" });
  const accountId = await ensureDtIdForUserId(auth.memberId);
  if (!accountId) return res.status(500).json({ ok: false, error: "Не удалось определить аккаунт" });
  const action = text(body.action, 30);
  if (action === "subscribe" || action === "unsubscribe") {
    try {
      const result = await subscriptions.subscribe(auth, accountId, action === "subscribe", BOT_TOKEN);
      return res.status(result.ok ? 200 : 400).json(result);
    } catch (error) {
      return res.status(503).json({ ok: false, error: "Не удалось сохранить подписку. Попробуйте ещё раз." });
    }
  }
  const lockScope = action === "create_player" ? "create:" + accountId : action === "create" ? "main" : text(body.eventId, 80) || "main";
  const lockToken = await acquireLock(lockScope);
  if (!lockToken) return res.status(409).json({ ok: false, error: "Событие обновляется. Повторите через пару секунд." });

  try {
    const mainState = await readState();
    let personalStates = await readPersonalStates();
    const requestedEventId = text(body.eventId, 80);
    let state = requestedEventId ? personalStates.find(function (item) { return item && item.id === requestedEventId; }) || (mainState && mainState.id === requestedEventId ? mainState : null) : mainState;
    let history = await readHistory();
    if (action === "create") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только для администратора" });
      const startingBank = money(body.startingBank);
      const stakePrice = money(body.stakePrice);
      const tournamentId = text(body.tournamentId, 40);
      const tournamentTitle = text(body.tournamentTitle || body.title, 80);
      if (startingBank < 1 || stakePrice < 1) return res.status(400).json({ ok: false, error: "Укажите стартовый банк и цену ставки" });
      if (!tournamentId || !tournamentTitle) return res.status(400).json({ ok: false, error: "Выберите турнир вечера" });
      if (mainState && mainState.status !== "settled" && Array.isArray(mainState.entries) && mainState.entries.length) {
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
        tournamentTime: text(body.tournamentTime, 40),
        tournamentGuarantee: text(body.tournamentGuarantee, 80),
        status: "open",
        startingBank,
        stakePrice,
        entries: [],
        createdAt: new Date().toISOString(),
        createdBy: String(auth.memberId),
      };
      await saveState(state);
      await subscriptions.notify(state, BOT_TOKEN).catch(function (error) { console.error("[tournament-bet] notify", error.message); });
      return res.status(200).json(addEventMenu(publicState(state, { isAdmin: true, accountId }, history), state, personalStates, accountId));
    }

    if (action === "create_player") {
      const stakePrice = money(body.stakePrice);
      const tournamentId = text(body.tournamentId, 80);
      const tournamentTitle = text(body.tournamentTitle, 80);
      const tournamentBuyin = money(body.tournamentBuyin);
      if (!tournamentId || !tournamentTitle || tournamentBuyin < 300) return res.status(400).json({ ok: false, error: "Выберите турнир из расписания с входом от 300 ₽" });
      if (stakePrice < 1) return res.status(400).json({ ok: false, error: "Укажите цену ставки" });
      const poker21Id = await linkedPoker21Id(accountId, String(auth.memberId));
      if (!poker21Id) return res.status(403).json({ ok: false, error: "Сначала привяжите аккаунт Poker21 в профиле." });
      let player;
      try {
        player = await getGroupMemberData({ userId: poker21Id });
        if (!Number.isFinite(Number(player.balance)) || Number(player.balance) < stakePrice) {
          return res.status(409).json({ ok: false, error: "Пополните баланс в Poker21, чтобы сделать ставку.", code: "POKER21_INSUFFICIENT_BALANCE" });
        }
      } catch (error) {
        return res.status(error && error.statusCode || 502).json({ ok: false, error: poker21Error(error, "Не удалось проверить баланс Poker21") });
      }
      const id = "tb_" + Date.now().toString(36) + "_" + crypto.randomBytes(4).toString("hex");
      try {
        await changePoker21Amount({
          userId: poker21Id, chips: -stakePrice, idempotencyKey: "tournament-bet:" + id + ":" + accountId,
          reference: "tournament-bet:" + id, requestedBy: "tournament-bet:" + accountId,
        });
      } catch (error) {
        return res.status(error && error.statusCode || 502).json({ ok: false, error: poker21Error(error, "Не удалось списать ставку в Poker21") });
      }
      const presentation = await profilePresentation(accountId, String(auth.memberId), identityAvatar(auth));
      state = {
        id, title: tournamentTitle, tournamentId, tournamentBanner: "", tournamentBannerAlt: "",
        tournamentBuyin: text(body.tournamentBuyinLabel || body.tournamentBuyin, 60),
        tournamentTime: text(body.tournamentTime, 40),
        tournamentGuarantee: text(body.tournamentGuarantee, 80), status: "open", startingBank: 0, stakePrice,
        createdByPlayer: true, createdAt: new Date().toISOString(), createdBy: String(auth.memberId),
        entries: [{ accountId, memberId: String(auth.memberId), poker21Id, name: identityName(auth, player), avatar: presentation.avatar,
          level: Number.isFinite(Number(player && player.level)) ? Math.max(0, Math.floor(Number(player.level))) : null,
          profileCity: presentation.profileCity, joinedAt: new Date().toISOString(), stake: stakePrice }],
      };
      await savePersonalState(state);
      await subscriptions.notifyRegistration(state, state.entries[0], bankFor(state), BOT_TOKEN)
        .catch(function (error) { console.error("[tournament-bet] registration notify", error.message); });
      await subscriptions.notify(state, BOT_TOKEN).catch(function (error) { console.error("[tournament-bet] notify", error.message); });
      personalStates = [state].concat(personalStates);
      return res.status(200).json(addEventMenu(publicState(state, { isAdmin: !!auth.isAdmin, accountId }, history), mainState, personalStates, accountId));
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
      await saveSelectedState(state);
      await subscriptions.notifyRegistration(state, state.entries[state.entries.length - 1], bankFor(state), BOT_TOKEN)
        .catch(function (error) { console.error("[tournament-bet] registration notify", error.message); });
      await subscriptions.notifyParticipantJoined(state, state.entries[state.entries.length - 1], bankFor(state), BOT_TOKEN)
        .catch(function (error) { console.error("[tournament-bet] participant notify", error.message); });
      if (state.createdByPlayer) personalStates = [state].concat(personalStates.filter(function (item) { return item && item.id !== state.id; }));
      return res.status(200).json(addEventMenu(publicState(state, { isAdmin: !!auth.isAdmin, accountId }, history), mainState, personalStates, accountId));
    }

    if (action === "close") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только для администратора" });
      if (state.status !== "open") return res.status(409).json({ ok: false, error: "Приём ставок уже закрыт" });
      state.status = "closed";
      state.closedAt = new Date().toISOString();
      await saveSelectedState(state);
      if (state.createdByPlayer) personalStates = [state].concat(personalStates.filter(function (item) { return item && item.id !== state.id; }));
      return res.status(200).json(addEventMenu(publicState(state, { isAdmin: true, accountId }, history), mainState, personalStates, accountId));
    }

    if (action === "update_starting_bank") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только для администратора" });
      if (state.status === "settled") return res.status(409).json({ ok: false, error: "Завершённое событие уже нельзя изменить" });
      state.startingBank = money(body.startingBank);
      state.updatedAt = new Date().toISOString();
      await saveSelectedState(state);
      if (state.createdByPlayer) personalStates = [state].concat(personalStates.filter(function (item) { return item && item.id !== state.id; }));
      return res.status(200).json(addEventMenu(publicState(state, { isAdmin: true, accountId }, history), mainState, personalStates, accountId));
    }

    if (action === "settle") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только для администратора" });
      if (state.status === "settled") return res.status(200).json(addEventMenu(publicState(state, { isAdmin: true, accountId }, history), mainState, personalStates, accountId));
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
      return res.status(200).json(addEventMenu(publicState(state, { isAdmin: true, accountId }, history), mainState, personalStates, accountId));
    }

    return res.status(400).json({ ok: false, error: "Неизвестное действие" });
  } finally {
    await releaseLock(lockToken, lockScope);
  }
};

module.exports.bankFor = bankFor;
module.exports.money = money;
module.exports.assetFile = assetFile;
module.exports.publicState = publicState;
module.exports.ratingFor = ratingFor;
module.exports.scopedLockKey = scopedLockKey;
