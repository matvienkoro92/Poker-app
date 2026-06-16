"use strict";

const { getPreferredUserIdByDtId } = require("./account-id");
const { pipeline: redisPipeline } = require("./redis");

const POKERPLUS_BIND_HASH_KEY = "poker_app:pokerplus_user_ids";

function normalizeDtId(raw) {
  const value = String(raw || "").trim();
  return /^ID\d{6}$/.test(value) ? value : "";
}

function normalizeTelegramId(raw) {
  const value = String(raw || "").trim();
  if (/^tg_\d+$/.test(value)) return value;
  if (/^\d+$/.test(value)) return "tg_" + value;
  return "";
}

function normalizePokerPlusId(raw) {
  return String(raw || "").trim().toLowerCase();
}

function normalizeDeviceId(raw) {
  return String(raw || "").trim().slice(0, 128);
}

function identityConflict(code, message, owner) {
  return {
    ok: false,
    code,
    error: message,
    owner: String(owner || "").trim(),
  };
}

async function pokerPlusIdForAccount(accountId) {
  const id = normalizeDtId(accountId) || String(accountId || "").trim();
  if (!id) return "";
  try {
    const rows = await redisPipeline([["HGET", POKERPLUS_BIND_HASH_KEY, id]]);
    return normalizePokerPlusId(rows && rows[0] && rows[0].result);
  } catch (e) {
    return "";
  }
}

async function telegramIdForAccount(accountId) {
  const id = normalizeDtId(accountId);
  if (!id) return normalizeTelegramId(accountId);
  try {
    return normalizeTelegramId(await getPreferredUserIdByDtId(id));
  } catch (e) {
    return "";
  }
}

async function referralIdentityConflict(referrerId, referredId) {
  const referrerAccountId = normalizeDtId(referrerId);
  const referredAccountId = normalizeDtId(referredId);
  if (!referrerAccountId || !referredAccountId) return null;
  if (referrerAccountId === referredAccountId) {
    return identityConflict("SAME_DT_ID", "Нельзя засчитать приглашение самого себя.", referrerAccountId);
  }
  const [referrerTelegramId, referredTelegramId, referrerPokerPlusId, referredPokerPlusId] = await Promise.all([
    telegramIdForAccount(referrerAccountId),
    telegramIdForAccount(referredAccountId),
    pokerPlusIdForAccount(referrerAccountId),
    pokerPlusIdForAccount(referredAccountId),
  ]);
  if (referrerTelegramId && referredTelegramId && referrerTelegramId === referredTelegramId) {
    return identityConflict("SAME_TELEGRAM", "Нельзя засчитать приглашение аккаунта с тем же Telegram.", referrerAccountId);
  }
  if (referrerPokerPlusId && referredPokerPlusId && referrerPokerPlusId === referredPokerPlusId) {
    return identityConflict("SAME_POKER21", "Нельзя засчитать приглашение аккаунта с тем же Poker21.", referrerAccountId);
  }
  return null;
}

function participantIdentityConflict(participants, current) {
  const rows = Array.isArray(participants) ? participants : [];
  const currentAccountId = normalizeDtId(current && current.accountId);
  const currentUserId = String((current && current.userId) || "").trim();
  const currentTelegramId = normalizeTelegramId(
    (current && (current.telegramUserId || current.telegram_user_id || current.telegramId || current.telegram_id)) ||
      currentUserId
  );
  const currentPokerPlusId = normalizePokerPlusId(current && (current.p21Id || current.pokerPlusId || current.poker21Id));
  for (const row of rows) {
    if (!row || typeof row !== "object") continue;
    const rowAccountId = normalizeDtId(row.accountId || row.account_id);
    const rowUserId = String(row.userId || row.user_id || "").trim();
    if (currentAccountId && rowAccountId && rowAccountId === currentAccountId) {
      return identityConflict("SAME_DT_ID", "Этот аккаунт уже участвует.", rowAccountId);
    }
    if (currentUserId && rowUserId && rowUserId === currentUserId) {
      return identityConflict("SAME_TELEGRAM", "Этот Telegram уже участвует.", rowAccountId || rowUserId);
    }
    const rowTelegramId = normalizeTelegramId(
      row.telegramUserId || row.telegram_user_id || row.telegramId || row.telegram_id || rowUserId
    );
    if (currentTelegramId && rowTelegramId && rowTelegramId === currentTelegramId) {
      return identityConflict("SAME_TELEGRAM", "Этот Telegram уже участвует через другой аккаунт.", rowAccountId || rowTelegramId);
    }
    const rowPokerPlusId = normalizePokerPlusId(row.p21Id || row.pokerPlusId || row.poker21Id);
    if (currentPokerPlusId && rowPokerPlusId && rowPokerPlusId === currentPokerPlusId) {
      return identityConflict("SAME_POKER21", "Этот Poker21 уже участвует через другой аккаунт.", rowAccountId || rowPokerPlusId);
    }
  }
  return null;
}

function dailyIdentityFields(identity) {
  const fields = [];
  const seen = new Set();
  function add(prefix, raw) {
    const value = String(raw || "").trim();
    if (!value) return;
    const field = prefix + ":" + value;
    if (seen.has(field)) return;
    seen.add(field);
    fields.push(field);
  }
  const accountId = normalizeDtId(identity && identity.accountId);
  const memberId = String((identity && identity.memberId) || "").trim();
  const telegramId = normalizeTelegramId((identity && identity.telegramUserId) || memberId);
  const p21Id = normalizePokerPlusId(identity && identity.p21Id);
  const deviceId = normalizeDeviceId(identity && identity.deviceId);
  add("account", accountId);
  add("member", memberId);
  add("telegram", telegramId);
  add("poker21", p21Id);
  add("device", deviceId);
  return fields;
}

async function checkDailyIdentityConflict(key, ownerAccountId, identity) {
  const owner = normalizeDtId(ownerAccountId);
  const fields = dailyIdentityFields(identity);
  if (!key || !owner || !fields.length) return { ok: true, fields };
  const rows = await redisPipeline([["HMGET", key, ...fields]]);
  const values = rows && rows[0] && Array.isArray(rows[0].result) ? rows[0].result : [];
  for (let i = 0; i < fields.length; i += 1) {
    const existing = normalizeDtId(values[i]);
    if (existing && existing !== owner) {
      const code = fields[i].indexOf("poker21:") === 0
        ? "SAME_POKER21"
        : fields[i].indexOf("device:") === 0
          ? "SAME_DEVICE"
          : fields[i].indexOf("telegram:") === 0 || fields[i].indexOf("member:tg_") === 0
            ? "SAME_TELEGRAM"
            : "SAME_DT_ID";
      return identityConflict(code, "Эта попытка уже использована через другой аккаунт.", existing);
    }
  }
  return { ok: true, fields };
}

function dailyIdentityWriteCommands(key, ownerAccountId, identity) {
  const owner = normalizeDtId(ownerAccountId);
  const fields = dailyIdentityFields(identity);
  if (!key || !owner || !fields.length) return [];
  return fields.map((field) => ["HSET", key, field, owner]);
}

module.exports = {
  POKERPLUS_BIND_HASH_KEY,
  normalizeDtId,
  normalizeTelegramId,
  normalizePokerPlusId,
  normalizeDeviceId,
  pokerPlusIdForAccount,
  referralIdentityConflict,
  participantIdentityConflict,
  dailyIdentityFields,
  checkDailyIdentityConflict,
  dailyIdentityWriteCommands,
};
