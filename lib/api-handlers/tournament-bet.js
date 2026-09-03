"use strict";

const crypto = require("crypto");
const { authRequired, parseBody, setCors } = require("../api-auth");
const { ensureDtIdForUserId } = require("../account-id");
const { isConfigured: redisConfigured, pipeline: redisPipeline } = require("../redis");
const { getGroupMemberData } = require("../pokerplus");
const { processDirectChange: processPoker21DirectChange } = require("./pokerplus-chips");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const STATE_KEY = "poker_app:tournament_bet:current";
const LOCK_KEY = "poker_app:tournament_bet:lock";
const POKER21_BIND_KEY = "poker_app:pokerplus_user_ids";
const MAX_MONEY = 100000000;
const POKER21_CHUNK = Math.max(1, Math.floor(Number(process.env.POKERPLUS_CHIPS_MAX_ABS || 1000) || 1000));

function text(value, max) {
  return String(value == null ? "" : value).replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max || 120);
}

function money(value) {
  const amount = Math.floor(Number(String(value == null ? "" : value).replace(/[^\d]/g, "")) || 0);
  return Math.max(0, Math.min(MAX_MONEY, amount));
}

function parseJson(raw) {
  try { return raw ? JSON.parse(raw) : null; } catch (error) { return null; }
}

function bankFor(state) {
  return money(state && state.startingBank) + (Array.isArray(state && state.entries) ? state.entries.length : 0) * money(state && state.stakePrice);
}

function publicState(state, context) {
  const source = state && typeof state === "object" ? state : null;
  const accountId = context && context.accountId || "";
  if (!source) return { ok: true, active: false, isAdmin: !!(context && context.isAdmin), entries: [] };
  const entries = (Array.isArray(source.entries) ? source.entries : []).map(function (entry) {
    return {
      accountId: context && context.isAdmin ? entry.accountId : "",
      poker21Id: context && context.isAdmin ? entry.poker21Id : "",
      name: entry.name || "Игрок",
      avatar: entry.avatar || "",
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
  };
}

async function readState() {
  const rows = await redisPipeline([["GET", STATE_KEY]], { context: "tournament-bet.read", throwOnError: true });
  return parseJson(rows && rows[0] && rows[0].result);
}

async function saveState(state) {
  const rows = await redisPipeline([["SET", STATE_KEY, JSON.stringify(state)]], { context: "tournament-bet.write", throwOnError: true });
  if (!rows || !rows[0] || rows[0].error) throw new Error("Не удалось сохранить событие");
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
    return res.status(200).json(publicState(await readState(), context));
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
    if (action === "create") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только для администратора" });
      const startingBank = money(body.startingBank);
      const stakePrice = money(body.stakePrice);
      if (startingBank < 1 || stakePrice < 1) return res.status(400).json({ ok: false, error: "Укажите стартовый банк и цену ставки" });
      if (state && state.status !== "settled" && Array.isArray(state.entries) && state.entries.length) {
        return res.status(409).json({ ok: false, error: "Сначала завершите текущее событие со ставками" });
      }
      state = {
        id: "tb_" + Date.now().toString(36) + "_" + crypto.randomBytes(4).toString("hex"),
        title: text(body.title, 80) || "Турнир вечера",
        status: "open",
        startingBank,
        stakePrice,
        entries: [],
        createdAt: new Date().toISOString(),
        createdBy: String(auth.memberId),
      };
      await saveState(state);
      return res.status(200).json(publicState(state, { isAdmin: true, accountId }));
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
      state.entries.push({
        accountId,
        memberId: String(auth.memberId),
        poker21Id,
        name: identityName(auth, player),
        avatar: identityAvatar(auth),
        joinedAt: new Date().toISOString(),
        stake,
      });
      state.updatedAt = new Date().toISOString();
      await saveState(state);
      return res.status(200).json(publicState(state, { isAdmin: !!auth.isAdmin, accountId }));
    }

    if (action === "close") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только для администратора" });
      if (state.status !== "open") return res.status(409).json({ ok: false, error: "Приём ставок уже закрыт" });
      state.status = "closed";
      state.closedAt = new Date().toISOString();
      await saveState(state);
      return res.status(200).json(publicState(state, { isAdmin: true, accountId }));
    }

    if (action === "settle") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только для администратора" });
      if (state.status === "settled") return res.status(200).json(publicState(state, { isAdmin: true, accountId }));
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
      await saveState(state);
      return res.status(200).json(publicState(state, { isAdmin: true, accountId }));
    }

    return res.status(400).json({ ok: false, error: "Неизвестное действие" });
  } finally {
    await releaseLock(lockToken);
  }
};

module.exports.bankFor = bankFor;
module.exports.money = money;
