"use strict";

const crypto = require("crypto");
const { authRequired, parseBody, setCors } = require("../api-auth");
const { ensureDtIdForUserId } = require("../account-id");
const { readPokerPlusProfile } = require("../pokerplus");
const { pokerProfileStatusFromCachedProfile } = require("../chat-profile-status");
const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
const { resolveTelegramOpenButtonUrl, sendTelegramMessage } = require("../telegram-bot-send");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const TRANSFER_IDS_KEY = "poker_app:transfers:ids";
const TRANSFER_DEALS_COUNT_KEY = "poker_app:transfer_deals_count";
const TRANSFER_KEY_PREFIX = "poker_app:transfer:";
const TRANSFER_USER_LIST_PREFIX = "poker_app:transfers:user:";
const TRANSFER_RESERVATION_PREFIX = "poker_app:transfer_reservation:";
const POKERPLUS_BIND_HASH_KEY = "poker_app:pokerplus_user_ids";
const MAX_AMOUNT_RUB = 2500;
const REQUIRED_LEVEL = 10;
const RESERVE_MS = 10 * 60 * 1000;
const PUBLIC_LIST_LIMIT = 60;
const MY_LIST_LIMIT = 40;
const KEEP_PUBLIC_IDS = 300;
const KEEP_USER_IDS = 160;
const OPEN_BUTTON_URL = resolveTelegramOpenButtonUrl("https://t.me/Poker_dvatuza_bot/DvaTuza");

function json(res, status, payload) {
  res.status(status).json(payload);
}

function transferKey(id) {
  return TRANSFER_KEY_PREFIX + String(id || "").trim();
}

function transferUserListKey(accountId) {
  return TRANSFER_USER_LIST_PREFIX + String(accountId || "").trim();
}

function transferReservationKey(id) {
  return TRANSFER_RESERVATION_PREFIX + String(id || "").trim();
}

function transferId() {
  return "tr_" + Date.now().toString(36) + "_" + crypto.randomBytes(4).toString("hex");
}

function sanitizeText(value, maxLen) {
  return String(value == null ? "" : value)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLen);
}

function sanitizeMultiline(value, maxLen) {
  return String(value == null ? "" : value)
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim()
    .slice(0, maxLen);
}

function normalizeKind(value) {
  const raw = String(value || "").trim().toLowerCase();
  return raw === "deposit" ? "deposit" : "cashout";
}

function normalizeAmount(value) {
  const raw = String(value == null ? "" : value).trim();
  let amount = Number(raw.replace(",", "."));
  if (!Number.isFinite(amount)) {
    const digits = raw.replace(/[^\d]/g, "");
    amount = digits ? Number(digits) : 0;
  }
  amount = Math.floor(amount);
  if (!Number.isFinite(amount) || amount <= 0) return 0;
  return amount;
}

function displayNameFromIdentity(identity, accountId) {
  const first = sanitizeText(identity && (identity.firstName || identity.first_name), 40);
  const last = sanitizeText(identity && (identity.lastName || identity.last_name), 40);
  const full = [first, last].filter(Boolean).join(" ").trim();
  if (full) return full;
  const username = sanitizeText(identity && (identity.telegramUsername || identity.pwaUsername || identity.username), 40).replace(/^@+/, "");
  if (username) return "@" + username;
  return accountId || "Игрок";
}

function telegramChatIdFromMemberId(memberId) {
  const raw = String(memberId || "").trim();
  return raw.indexOf("tg_") === 0 ? raw.slice(3) : "";
}

async function resolveActor(auth) {
  const userId = String(auth.memberId || "").trim();
  const accountId = await ensureDtIdForUserId(userId);
  if (!accountId) return null;
  const poker21Id = await readPoker21IdForActor({ userId, accountId });
  return {
    userId,
    accountId,
    poker21Id,
    chatId: telegramChatIdFromMemberId(userId),
    name: displayNameFromIdentity(auth.identity, accountId),
  };
}

async function readPoker21IdForActor(actor) {
  if (!actor) return "";
  try {
    const rows = await redisPipeline([
      ["HGET", POKERPLUS_BIND_HASH_KEY, actor.accountId || ""],
      ["HGET", POKERPLUS_BIND_HASH_KEY, actor.userId || ""],
    ], { context: "transfers.actorPoker21.lookup" });
    return String((rows && rows[0] && rows[0].result) || (rows && rows[1] && rows[1].result) || "").trim();
  } catch (e) {
    return "";
  }
}

function actorDisplayId(actor) {
  return String((actor && actor.poker21Id) || (actor && actor.accountId) || "").trim();
}

function levelAccessPayload(level) {
  const safeLevel = Math.max(0, Math.floor(Number(level) || 0));
  const allowed = safeLevel >= REQUIRED_LEVEL;
  return {
    allowed,
    level: safeLevel,
    requiredLevel: REQUIRED_LEVEL,
    message: allowed
      ? "Переводы доступны игрокам уровня " + REQUIRED_LEVEL + "+."
      : safeLevel > 0
        ? "Переводы доступны с " + REQUIRED_LEVEL + " уровня. Ваш уровень: " + safeLevel + "."
        : "Переводы доступны с " + REQUIRED_LEVEL + " уровня. Привяжите аккаунт Poker21 в профиле, чтобы уровень подтянулся.",
  };
}

async function readActorLevel(actor) {
  if (!actor || !actor.accountId) return 0;
  const pokerPlusId = actor.poker21Id || await readPoker21IdForActor(actor);
  const lookupIds = [pokerPlusId, actor.accountId].filter(Boolean);
  for (const id of lookupIds) {
    const profile = await readPokerPlusProfile(id).catch(() => null);
    if (!profile) continue;
    const status = pokerProfileStatusFromCachedProfile(profile, { pokerPlusLinked: true });
    const level = status && Number.isFinite(Number(status.level)) ? Math.max(0, Math.floor(Number(status.level))) : 0;
    if (level > 0) return level;
  }
  return 0;
}

async function ensureActorAccess(actor) {
  const level = await readActorLevel(actor);
  return levelAccessPayload(level);
}

function viewerPayload(actor, access) {
  return {
    accountId: actorDisplayId(actor),
    appAccountId: actor && actor.accountId ? actor.accountId : "",
    poker21Id: actor && actor.poker21Id ? actor.poker21Id : "",
    level: access && Number.isFinite(Number(access.level)) ? Number(access.level) : 0,
    requiredLevel: REQUIRED_LEVEL,
    transfersAccess: !!(access && access.allowed),
  };
}

function deniedJson(res, access) {
  return json(res, 403, {
    ok: false,
    error: (access && access.message) || ("Переводы доступны с " + REQUIRED_LEVEL + " уровня."),
    code: "TRANSFERS_LEVEL_REQUIRED",
    requiredLevel: REQUIRED_LEVEL,
    level: access && Number.isFinite(Number(access.level)) ? Number(access.level) : 0,
    access: access || levelAccessPayload(0),
  });
}

function parseTransfer(raw) {
  if (!raw) return null;
  try {
    const item = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (!item || typeof item !== "object" || !item.id) return null;
    return item;
  } catch (e) {
    return null;
  }
}

function isParticipant(item, actor) {
  if (!item || !actor) return false;
  return (
    item.ownerAccountId === actor.accountId ||
    item.buyerAccountId === actor.accountId ||
    item.sellerAccountId === actor.accountId
  );
}

function normalizeExpiredReservation(item, now) {
  if (!item || item.status !== "reserved") return item;
  const reservedUntil = Number(item.reservedUntil || 0);
  if (!reservedUntil || reservedUntil > now) return item;
  const next = { ...item };
  next.status = "open";
  next.reservedUntil = 0;
  next.updatedAt = now;
  if (next.kind === "deposit") {
    delete next.sellerUserId;
    delete next.sellerAccountId;
    delete next.sellerChatId;
    delete next.sellerName;
    next.requisites = "";
  } else {
    delete next.buyerUserId;
    delete next.buyerAccountId;
    delete next.buyerChatId;
    delete next.buyerName;
  }
  return next;
}

function publicTransfer(item, actor, now) {
  const normalized = normalizeExpiredReservation(item, now);
  const participant = isParticipant(normalized, actor);
  const canSeeRequisites = participant && (actor.accountId === normalized.buyerAccountId || actor.accountId === normalized.sellerAccountId);
  const viewerDisplayId = actorDisplayId(actor);
  const ownerDisplayId = normalized.ownerAccountId === (actor && actor.accountId)
    ? viewerDisplayId
    : (normalized.ownerPoker21Id || normalized.ownerDisplayId || normalized.ownerAccountId || "");
  const buyerDisplayId = normalized.buyerAccountId === (actor && actor.accountId)
    ? viewerDisplayId
    : (normalized.buyerPoker21Id || normalized.buyerDisplayId || normalized.buyerAccountId || "");
  const sellerDisplayId = normalized.sellerAccountId === (actor && actor.accountId)
    ? viewerDisplayId
    : (normalized.sellerPoker21Id || normalized.sellerDisplayId || normalized.sellerAccountId || "");
  const out = {
    id: normalized.id,
    kind: normalized.kind,
    amount: Number(normalized.amount || 0),
    comment: normalized.comment || "",
    status: normalized.status || "open",
    createdAt: normalized.createdAt || 0,
    updatedAt: normalized.updatedAt || normalized.createdAt || 0,
    reservedUntil: normalized.status === "reserved" ? Number(normalized.reservedUntil || 0) : 0,
    ownerAccountId: normalized.ownerAccountId || "",
    ownerDisplayId,
    ownerName: normalized.ownerName || "",
    buyerAccountId: normalized.buyerAccountId || "",
    buyerDisplayId,
    buyerName: normalized.buyerName || "",
    sellerAccountId: normalized.sellerAccountId || "",
    sellerDisplayId,
    sellerName: normalized.sellerName || "",
    isOwner: !!(actor && normalized.ownerAccountId === actor.accountId),
    isBuyer: !!(actor && normalized.buyerAccountId === actor.accountId),
    isSeller: !!(actor && normalized.sellerAccountId === actor.accountId),
    isMine: participant,
    canSeeRequisites,
  };
  if (canSeeRequisites) out.requisites = normalized.requisites || "";
  return out;
}

async function readTransfer(id) {
  const rows = await redisPipeline([["GET", transferKey(id)]], { context: "transfers.readOne" });
  return parseTransfer(rows && rows[0] ? rows[0].result : null);
}

async function saveTransfer(item, extraCommands) {
  const commands = [
    ["SET", transferKey(item.id), JSON.stringify(item)],
  ].concat(extraCommands || []);
  const rows = await redisPipeline(commands, { context: "transfers.save" });
  return !!rows;
}

async function notifyTelegram(chatId, text) {
  if (!chatId || !BOT_TOKEN || !text) return;
  await sendTelegramMessage(BOT_TOKEN, {
    chatId,
    text,
    buttonText: "Открыть переводы",
    buttonUrl: OPEN_BUTTON_URL,
  }).catch(() => null);
}

function transferTitle(item) {
  return (item.kind === "deposit" ? "депозит" : "кешаут") + " на " + Number(item.amount || 0) + " ₽";
}

async function createTransfer(req, res, auth, body) {
  const actor = await resolveActor(auth);
  if (!actor) return json(res, 500, { ok: false, error: "Не удалось подготовить ID игрока" });
  const access = await ensureActorAccess(actor);
  if (!access.allowed) return deniedJson(res, access);

  const kind = normalizeKind(body.kind);
  const amount = normalizeAmount(body.amount);
  if (!amount || amount > MAX_AMOUNT_RUB) return json(res, 400, { ok: false, error: "Укажите сумму до " + MAX_AMOUNT_RUB + " ₽" });

  const requisites = kind === "cashout" ? sanitizeMultiline(body.requisites || body.details, 700) : "";
  if (kind === "cashout" && !requisites) {
    return json(res, 400, { ok: false, error: "Для кешаута нужны реквизиты" });
  }

  const now = Date.now();
  const item = {
    id: transferId(),
    kind,
    amount,
    comment: sanitizeMultiline(body.comment, 240),
    requisites,
    status: "open",
    ownerUserId: actor.userId,
    ownerAccountId: actor.accountId,
    ownerPoker21Id: actor.poker21Id || "",
    ownerChatId: actor.chatId,
    ownerName: actor.name,
    createdAt: now,
    updatedAt: now,
  };
  if (kind === "cashout") {
    item.sellerUserId = actor.userId;
    item.sellerAccountId = actor.accountId;
    item.sellerPoker21Id = actor.poker21Id || "";
    item.sellerChatId = actor.chatId;
    item.sellerName = actor.name;
  } else {
    item.buyerUserId = actor.userId;
    item.buyerAccountId = actor.accountId;
    item.buyerPoker21Id = actor.poker21Id || "";
    item.buyerChatId = actor.chatId;
    item.buyerName = actor.name;
  }

  const saved = await saveTransfer(item, [
    ["LPUSH", TRANSFER_IDS_KEY, item.id],
    ["LTRIM", TRANSFER_IDS_KEY, "0", String(KEEP_PUBLIC_IDS - 1)],
    ["LPUSH", transferUserListKey(actor.accountId), item.id],
    ["LTRIM", transferUserListKey(actor.accountId), "0", String(KEEP_USER_IDS - 1)],
  ]);
  if (!saved) return json(res, 503, { ok: false, error: "Не удалось сохранить заявку" });
  return json(res, 200, { ok: true, item: publicTransfer(item, actor, now), maxAmount: MAX_AMOUNT_RUB });
}

async function takeTransfer(req, res, auth, body) {
  const actor = await resolveActor(auth);
  if (!actor) return json(res, 500, { ok: false, error: "Не удалось подготовить ID игрока" });
  const access = await ensureActorAccess(actor);
  if (!access.allowed) return deniedJson(res, access);
  const id = sanitizeText(body.id || body.transferId, 80);
  if (!id) return json(res, 400, { ok: false, error: "Не выбрана заявка" });

  const reserveRows = await redisPipeline([
    ["SET", transferReservationKey(id), actor.accountId, "NX", "PX", String(RESERVE_MS)],
  ], { context: "transfers.reserve" });
  const reserved = !!(reserveRows && reserveRows[0] && reserveRows[0].result);
  if (!reserved) return json(res, 409, { ok: false, error: "Эту заявку уже взяли. Попробуйте другую." });

  const now = Date.now();
  let item = normalizeExpiredReservation(await readTransfer(id), now);
  if (!item || item.status !== "open") {
    await redisPipeline([["DEL", transferReservationKey(id)]], { context: "transfers.reserve.release" });
    return json(res, 409, { ok: false, error: "Заявка уже недоступна" });
  }
  if (item.ownerAccountId === actor.accountId) {
    await redisPipeline([["DEL", transferReservationKey(id)]], { context: "transfers.reserve.release" });
    return json(res, 400, { ok: false, error: "Свою заявку брать нельзя" });
  }

  const requisites = item.kind === "deposit" ? sanitizeMultiline(body.requisites || body.details, 700) : item.requisites || "";
  if (item.kind === "deposit" && !requisites) {
    await redisPipeline([["DEL", transferReservationKey(id)]], { context: "transfers.reserve.release" });
    return json(res, 400, { ok: false, error: "Укажите реквизиты для депозита" });
  }

  item = {
    ...item,
    status: "reserved",
    reservedUntil: now + RESERVE_MS,
    requisites,
    updatedAt: now,
  };
  if (item.kind === "cashout") {
    item.buyerUserId = actor.userId;
    item.buyerAccountId = actor.accountId;
    item.buyerPoker21Id = actor.poker21Id || "";
    item.buyerChatId = actor.chatId;
    item.buyerName = actor.name;
  } else {
    item.sellerUserId = actor.userId;
    item.sellerAccountId = actor.accountId;
    item.sellerPoker21Id = actor.poker21Id || "";
    item.sellerChatId = actor.chatId;
    item.sellerName = actor.name;
  }

  const saved = await saveTransfer(item, [
    ["LPUSH", transferUserListKey(actor.accountId), item.id],
    ["LTRIM", transferUserListKey(actor.accountId), "0", String(KEEP_USER_IDS - 1)],
  ]);
  if (!saved) {
    await redisPipeline([["DEL", transferReservationKey(id)]], { context: "transfers.reserve.release" });
    return json(res, 503, { ok: false, error: "Не удалось взять заявку" });
  }

  if (item.kind === "cashout") {
    const buyerDisplayId = actorDisplayId(actor);
    await notifyTelegram(
      item.sellerChatId,
      buyerDisplayId + " взял ваши реквизиты в работу. После получения " + item.amount + " ₽ переведите фишки игроку на ID " + buyerDisplayId + "."
    );
  } else {
    await notifyTelegram(
      item.buyerChatId,
      actorDisplayId(actor) + " взял вашу заявку на депозит и указал реквизиты. У вас есть 10 минут, чтобы отправить " + item.amount + " ₽."
    );
  }
  return json(res, 200, { ok: true, item: publicTransfer(item, actor, now), reserveMs: RESERVE_MS });
}

async function markSent(req, res, auth, body) {
  const actor = await resolveActor(auth);
  if (!actor) return json(res, 500, { ok: false, error: "Не удалось подготовить ID игрока" });
  const access = await ensureActorAccess(actor);
  if (!access.allowed) return deniedJson(res, access);
  const id = sanitizeText(body.id || body.transferId, 80);
  const now = Date.now();
  const item = normalizeExpiredReservation(await readTransfer(id), now);
  if (!item || item.status !== "reserved" || item.buyerAccountId !== actor.accountId) {
    return json(res, 409, { ok: false, error: "Заявка сейчас не ждёт вашу отправку" });
  }
  if (Number(item.reservedUntil || 0) <= now) {
    return json(res, 409, { ok: false, error: "10 минут истекли, заявка снова доступна другим" });
  }
  item.status = "buyer_sent";
  item.sentAt = now;
  item.updatedAt = now;
  const saved = await saveTransfer(item);
  if (!saved) return json(res, 503, { ok: false, error: "Не удалось обновить заявку" });
  const buyerDisplayId = actorDisplayId(actor);
  await notifyTelegram(
    item.sellerChatId,
    buyerDisplayId + " отправил вам " + item.amount + " ₽. Переведите ему фишки в приложении на ID " + buyerDisplayId + " и нажмите «Перевёл»."
  );
  return json(res, 200, { ok: true, item: publicTransfer(item, actor, now) });
}

async function markTransferred(req, res, auth, body) {
  const actor = await resolveActor(auth);
  if (!actor) return json(res, 500, { ok: false, error: "Не удалось подготовить ID игрока" });
  const access = await ensureActorAccess(actor);
  if (!access.allowed) return deniedJson(res, access);
  const id = sanitizeText(body.id || body.transferId, 80);
  const now = Date.now();
  const item = normalizeExpiredReservation(await readTransfer(id), now);
  if (!item || item.status !== "buyer_sent" || item.sellerAccountId !== actor.accountId) {
    return json(res, 409, { ok: false, error: "Заявка сейчас не ждёт перевод фишек" });
  }
  item.status = "seller_transferred";
  item.transferredAt = now;
  item.updatedAt = now;
  const saved = await saveTransfer(item);
  if (!saved) return json(res, 503, { ok: false, error: "Не удалось обновить заявку" });
  await notifyTelegram(
    item.buyerChatId,
    "Вам перевели фишки в приложении по сделке " + transferTitle(item) + ". Нажмите «Получил», чтобы подтвердить получение."
  );
  return json(res, 200, { ok: true, item: publicTransfer(item, actor, now) });
}

async function markReceived(req, res, auth, body) {
  const actor = await resolveActor(auth);
  if (!actor) return json(res, 500, { ok: false, error: "Не удалось подготовить ID игрока" });
  const access = await ensureActorAccess(actor);
  if (!access.allowed) return deniedJson(res, access);
  const id = sanitizeText(body.id || body.transferId, 80);
  const now = Date.now();
  const item = normalizeExpiredReservation(await readTransfer(id), now);
  if (!item || item.status !== "seller_transferred" || item.buyerAccountId !== actor.accountId) {
    return json(res, 409, { ok: false, error: "Заявка сейчас не ждёт ваше подтверждение" });
  }
  item.status = "completed";
  item.completedAt = now;
  item.updatedAt = now;
  const commands = [
    ["HINCRBY", TRANSFER_DEALS_COUNT_KEY, item.buyerAccountId, "1"],
    ["HINCRBY", TRANSFER_DEALS_COUNT_KEY, item.sellerAccountId, "1"],
  ];
  const saved = await saveTransfer(item, commands);
  if (!saved) return json(res, 503, { ok: false, error: "Не удалось закрыть сделку" });
  await notifyTelegram(
    item.sellerChatId,
    "Сделка " + transferTitle(item) + " закрыта. " + actorDisplayId(actor) + " подтвердил получение."
  );
  return json(res, 200, { ok: true, item: publicTransfer(item, actor, now) });
}

async function cancelTransfer(req, res, auth, body) {
  const actor = await resolveActor(auth);
  if (!actor) return json(res, 500, { ok: false, error: "Не удалось подготовить ID игрока" });
  const access = await ensureActorAccess(actor);
  if (!access.allowed) return deniedJson(res, access);
  const id = sanitizeText(body.id || body.transferId, 80);
  const now = Date.now();
  const item = normalizeExpiredReservation(await readTransfer(id), now);
  if (!item || item.ownerAccountId !== actor.accountId || item.status !== "open") {
    return json(res, 409, { ok: false, error: "Эту заявку уже нельзя отменить" });
  }
  item.status = "cancelled";
  item.updatedAt = now;
  const saved = await saveTransfer(item);
  if (!saved) return json(res, 503, { ok: false, error: "Не удалось отменить заявку" });
  return json(res, 200, { ok: true, item: publicTransfer(item, actor, now) });
}

async function listTransfers(req, res, auth) {
  const actor = await resolveActor(auth);
  if (!actor) return json(res, 500, { ok: false, error: "Не удалось подготовить ID игрока" });
  const access = await ensureActorAccess(actor);
  if (!access.allowed) {
    return json(res, 200, {
      ok: true,
      viewer: viewerPayload(actor, access),
      access,
      items: [],
      maxAmount: MAX_AMOUNT_RUB,
      reserveMs: RESERVE_MS,
      now: Date.now(),
    });
  }
  if (!redisConfigured()) {
    return json(res, 200, { ok: true, viewer: viewerPayload(actor, access), access, items: [], maxAmount: MAX_AMOUNT_RUB, reserveMs: RESERVE_MS, now: Date.now() });
  }
  const listRows = await redisPipeline([
    ["LRANGE", TRANSFER_IDS_KEY, "0", String(PUBLIC_LIST_LIMIT - 1)],
    ["LRANGE", transferUserListKey(actor.accountId), "0", String(MY_LIST_LIMIT - 1)],
  ], { context: "transfers.listIds" });
  const publicIds = listRows && listRows[0] && Array.isArray(listRows[0].result) ? listRows[0].result : [];
  const myIds = listRows && listRows[1] && Array.isArray(listRows[1].result) ? listRows[1].result : [];
  const ids = [];
  publicIds.concat(myIds).forEach((raw) => {
    const id = sanitizeText(raw, 80);
    if (id && ids.indexOf(id) === -1) ids.push(id);
  });
  if (!ids.length) {
    return json(res, 200, { ok: true, viewer: viewerPayload(actor, access), access, items: [], maxAmount: MAX_AMOUNT_RUB, reserveMs: RESERVE_MS, now: Date.now() });
  }
  const rows = await redisPipeline(ids.map((id) => ["GET", transferKey(id)]), { context: "transfers.listItems" });
  const now = Date.now();
  const items = (rows || [])
    .map((row) => parseTransfer(row && row.result))
    .filter(Boolean)
    .map((item) => normalizeExpiredReservation(item, now))
    .filter((item) => item.status !== "cancelled" || isParticipant(item, actor))
    .map((item) => publicTransfer(item, actor, now))
    .sort((a, b) => Number(b.updatedAt || b.createdAt || 0) - Number(a.updatedAt || a.createdAt || 0));
  return json(res, 200, {
    ok: true,
    viewer: viewerPayload(actor, access),
    access,
    items,
    maxAmount: MAX_AMOUNT_RUB,
    reserveMs: RESERVE_MS,
    now,
  });
}

module.exports = async function handler(req, res) {
  setCors(res, "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") return res.status(204).end();
  let body = {};
  try {
    body = parseBody(req);
  } catch (e) {
    return json(res, 400, { ok: false, error: "Bad JSON" });
  }
  const auth = authRequired(req, body, BOT_TOKEN);
  if (!auth.ok) return json(res, auth.status || 401, { ok: false, error: auth.error || "Auth required" });
  if (!redisConfigured()) return json(res, 503, { ok: false, error: "Redis не настроен" });

  if (req.method === "GET") return listTransfers(req, res, auth);
  if (req.method !== "POST") return json(res, 405, { ok: false, error: "Method not allowed" });

  const action = sanitizeText(body.action, 40).toLowerCase();
  if (action === "create") return createTransfer(req, res, auth, body);
  if (action === "take") return takeTransfer(req, res, auth, body);
  if (action === "sent") return markSent(req, res, auth, body);
  if (action === "transferred") return markTransferred(req, res, auth, body);
  if (action === "received") return markReceived(req, res, auth, body);
  if (action === "cancel") return cancelTransfer(req, res, auth, body);
  return json(res, 400, { ok: false, error: "Unknown action" });
};
