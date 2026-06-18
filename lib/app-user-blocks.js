"use strict";

const { pipeline: redisPipeline, hashPairsToObject } = require("./redis");
const { DT_IDS_KEY, ID_TO_USER_KEY } = require("./account-id");
const { isAdmin, normalizeTelegramId } = require("./api-auth");

const APP_BLOCKED_SET_KEY = "poker_app:app_blocked_users";
const APP_BLOCKED_META_HASH = "poker_app:app_blocked_user_meta";
const APP_BLOCKED_ALIAS_HASH = "poker_app:app_blocked_user_alias";
const APP_BLOCKED_PRIMARY_SET_KEY = "poker_app:app_blocked_user_primary";

function normalizeRuntimeId(raw) {
  const value = String(raw || "").trim();
  if (!value) return "";
  if (/^ID\d{6}$/i.test(value)) return value.toUpperCase();
  if (value.startsWith("tg_") || value.startsWith("vk_")) return value;
  if (/^\d+$/.test(value)) return "tg_" + value;
  return value;
}

function unique(values) {
  const out = [];
  const seen = new Set();
  (Array.isArray(values) ? values : []).forEach((value) => {
    const id = normalizeRuntimeId(value);
    if (!id || seen.has(id)) return;
    seen.add(id);
    out.push(id);
  });
  return out;
}

function numericTelegramAlias(id) {
  const value = normalizeRuntimeId(id);
  if (!value.startsWith("tg_")) return "";
  return normalizeTelegramId(value);
}

async function resolveBlockAliases(targetId) {
  const target = normalizeRuntimeId(targetId);
  if (!target) return [];
  const aliases = [target];
  if (target.startsWith("tg_") || target.startsWith("vk_")) {
    const res = await redisPipeline([
      ["HGET", DT_IDS_KEY, target],
    ]);
    const accountId = res && res[0] && res[0].result != null ? String(res[0].result).trim() : "";
    if (accountId) aliases.push(accountId);
  } else if (/^ID\d{6}$/.test(target)) {
    const res = await redisPipeline([
      ["HGET", ID_TO_USER_KEY, target],
    ]);
    const runtimeId = res && res[0] && res[0].result != null ? String(res[0].result).trim() : "";
    if (runtimeId) aliases.push(runtimeId);
  }
  aliases.slice().forEach((alias) => {
    const n = numericTelegramAlias(alias);
    if (n) aliases.push(n);
  });
  return unique(aliases);
}

async function blockCandidatesForAuth(memberId, identity) {
  const base = unique([
    memberId,
    identity && identity.emailMemberId,
    identity && identity.id != null && identity.vkId == null ? "tg_" + String(identity.id) : "",
    identity && identity.vkId != null ? "vk_" + String(identity.vkId) : "",
  ]);
  const commands = [];
  base.forEach((id) => {
    if (id.startsWith("tg_") || id.startsWith("vk_")) commands.push(["HGET", DT_IDS_KEY, id]);
    else if (/^ID\d{6}$/.test(id)) commands.push(["HGET", ID_TO_USER_KEY, id]);
  });
  const res = commands.length ? await redisPipeline(commands) : [];
  const linked = [];
  if (Array.isArray(res)) {
    res.forEach((row) => {
      if (row && row.result != null && String(row.result).trim()) linked.push(String(row.result).trim());
    });
  }
  const withNumeric = base.concat(linked);
  withNumeric.slice().forEach((id) => {
    const n = numericTelegramAlias(id);
    if (n) withNumeric.push(n);
  });
  return unique(withNumeric);
}

async function appBlockRecordByAlias(alias) {
  const target = normalizeRuntimeId(alias);
  if (!target) return null;
  const res = await redisPipeline([
    ["HGET", APP_BLOCKED_ALIAS_HASH, target],
  ]);
  const primary = res && res[0] && res[0].result != null ? String(res[0].result).trim() : "";
  if (!primary) return null;
  const metaRes = await redisPipeline([
    ["HGET", APP_BLOCKED_META_HASH, primary],
  ]);
  const raw = metaRes && metaRes[0] && metaRes[0].result != null ? String(metaRes[0].result) : "";
  if (!raw) return { id: primary, aliases: [target] };
  try {
    return JSON.parse(raw);
  } catch (e) {
    return { id: primary, aliases: [target] };
  }
}

async function isAppUserBlocked(memberId, identity) {
  const candidates = await blockCandidatesForAuth(memberId, identity);
  if (!candidates.length) return { blocked: false, candidates: [] };
  const res = await redisPipeline(candidates.map((id) => ["SISMEMBER", APP_BLOCKED_SET_KEY, id]));
  if (!Array.isArray(res)) return { blocked: false, candidates };
  for (let i = 0; i < candidates.length; i += 1) {
    if (res[i] && Number(res[i].result) === 1) {
      return { blocked: true, candidates, matchedId: candidates[i], record: await appBlockRecordByAlias(candidates[i]) };
    }
  }
  return { blocked: false, candidates };
}

function appBlockedResponse(res) {
  return res.status(403).json({
    ok: false,
    blocked: true,
    code: "APP_USER_BLOCKED",
    error: "Доступ к приложению заблокирован администратором.",
  });
}

async function rejectBlockedAppUser(req, res, authOrIdentity, memberIdMaybe) {
  const identity = authOrIdentity && authOrIdentity.identity ? authOrIdentity.identity : authOrIdentity;
  const memberId = authOrIdentity && authOrIdentity.memberId ? authOrIdentity.memberId : memberIdMaybe;
  if (!memberId || isAdmin(memberId)) return false;
  const status = await isAppUserBlocked(memberId, identity);
  if (!status.blocked) return false;
  appBlockedResponse(res);
  return true;
}

async function setAppUserBlocked(targetId, blocked, meta) {
  const aliases = await resolveBlockAliases(targetId);
  if (!aliases.length) return { ok: false, error: "Не указан игрок" };
  if (aliases.some((id) => isAdmin(id))) return { ok: false, error: "Нельзя заблокировать администратора" };
  const aliasRes = await redisPipeline(aliases.map((id) => ["HGET", APP_BLOCKED_ALIAS_HASH, id]));
  const existingPrimary =
    Array.isArray(aliasRes)
      ? aliasRes.map((row) => row && row.result != null ? String(row.result).trim() : "").find(Boolean)
      : "";
  const primary = existingPrimary || (aliases.find((id) => /^ID\d{6}$/.test(id)) || aliases[0]);
  if (!blocked) {
    const rec = await appBlockRecordByAlias(primary);
    const removeAliases = unique((rec && rec.aliases ? rec.aliases : []).concat(aliases).concat(primary));
    const commands = [
      ["SREM", APP_BLOCKED_PRIMARY_SET_KEY, primary],
      ["HDEL", APP_BLOCKED_META_HASH, primary],
      ["SREM", APP_BLOCKED_SET_KEY, ...removeAliases],
      ["HDEL", APP_BLOCKED_ALIAS_HASH, ...removeAliases],
    ];
    await redisPipeline(commands);
    return { ok: true, blocked: false, id: primary, aliases: removeAliases };
  }
  const record = {
    id: primary,
    aliases,
    reason: String((meta && meta.reason) || "").trim().slice(0, 500),
    adminId: String((meta && meta.adminId) || "").trim(),
    adminName: String((meta && meta.adminName) || "").trim().slice(0, 120),
    targetLabel: String((meta && meta.targetLabel) || "").trim().slice(0, 160),
    createdAt: new Date().toISOString(),
  };
  const commands = [
    ["SADD", APP_BLOCKED_PRIMARY_SET_KEY, primary],
    ["HSET", APP_BLOCKED_META_HASH, primary, JSON.stringify(record)],
    ["SADD", APP_BLOCKED_SET_KEY, ...aliases],
  ];
  aliases.forEach((alias) => commands.push(["HSET", APP_BLOCKED_ALIAS_HASH, alias, primary]));
  await redisPipeline(commands);
  return { ok: true, blocked: true, ...record };
}

async function listAppBlockedUsers() {
  const res = await redisPipeline([
    ["SMEMBERS", APP_BLOCKED_PRIMARY_SET_KEY],
    ["HGETALL", APP_BLOCKED_META_HASH],
  ]);
  const ids = new Set(Array.isArray(res && res[0] && res[0].result) ? res[0].result.map(String) : []);
  const meta = hashPairsToObject(res && res[1] && res[1].result);
  Object.keys(meta).forEach((id) => ids.add(id));
  return Array.from(ids).sort().map((id) => {
    const raw = meta[id];
    if (raw) {
      try {
        const parsed = JSON.parse(String(raw));
        return { id, ...parsed, blocked: true };
      } catch (e) {}
    }
    return { id, aliases: [id], blocked: true, reason: "", adminId: "", createdAt: "" };
  });
}

module.exports = {
  APP_BLOCKED_ALIAS_HASH,
  APP_BLOCKED_META_HASH,
  APP_BLOCKED_PRIMARY_SET_KEY,
  APP_BLOCKED_SET_KEY,
  appBlockedResponse,
  blockCandidatesForAuth,
  isAppUserBlocked,
  listAppBlockedUsers,
  rejectBlockedAppUser,
  resolveBlockAliases,
  setAppUserBlocked,
};
