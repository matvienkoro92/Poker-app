/**
 * Друзья: добавить в друзья, список друзей.
 * GET → список { userId, userName, contactName? }[] (contactName — имя, заданное владельцем списка)
 * POST { targetUserId, contactName? } → добавить; contactName сохраняется в HSET poker_app:friend_alias:{myId}
 * DELETE JSON { targetUserId } → убрать из друзей и удалить алиас
 */
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { ensureDtIdForUserId, getPreferredUserIdByDtId, getUserIdByDtId, resolveAccountId } = require("../account-id");
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

const FRIENDS_KEY_PREFIX = "poker_app:friends:";
const FRIEND_ALIAS_KEY_PREFIX = "poker_app:friend_alias:";
const USERNAMES_KEY = "poker_app:visitor_usernames";
const CONTACT_NAME_MAX = 80;

function sanitizeContactName(raw) {
  const s = String(raw || "")
    .trim()
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .slice(0, CONTACT_NAME_MAX);
  return s;
}

function buildFriendDisplayName(accountId, username, preferredUserId) {
  const cleanUsername = username != null ? String(username).trim() : "";
  if (cleanUsername) return cleanUsername.charAt(0) === "@" ? cleanUsername : "@" + cleanUsername;

  const cleanAccountId = accountId != null ? String(accountId).trim() : "";
  if (/^ID\d{6}$/.test(cleanAccountId)) return cleanAccountId;

  const cleanPreferredUserId = preferredUserId != null ? String(preferredUserId).trim() : "";
  if (/^tg_ID\d{6}$/.test(cleanPreferredUserId)) return cleanPreferredUserId.slice(3);
  if (/^mail_ID\d{6}$/.test(cleanPreferredUserId)) return cleanPreferredUserId.slice(5);
  if (/^ID\d{6}$/.test(cleanPreferredUserId)) return cleanPreferredUserId;

  return "Игрок";
}

async function redisPipeline(commands) {
  if (!REDIS_URL || !REDIS_TOKEN) return null;
  const base = String(REDIS_URL).replace(/\/$/, "");
  const res = await fetch(base + "/pipeline", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
  });
  if (!res.ok) return null;
  return res.json();
}

async function migrateLegacyFriendsIfNeeded(myId, myAccountId) {
  if (!myId || !myAccountId || myId === myAccountId) return null;
  const legacyKey = FRIENDS_KEY_PREFIX + myId;
  const legacyAliasKey = FRIEND_ALIAS_KEY_PREFIX + myId;
  const legacyRes = await redisPipeline([["SMEMBERS", legacyKey], ["HGETALL", legacyAliasKey]]);
  const legacyMembers =
    legacyRes && legacyRes[0] && Array.isArray(legacyRes[0].result) ? legacyRes[0].result : [];
  const legacyAliasesRaw = legacyRes && legacyRes[1] ? legacyRes[1].result : null;
  if (!legacyMembers.length) return null;

  const aliasMap = {};
  if (Array.isArray(legacyAliasesRaw)) {
    for (let i = 0; i < legacyAliasesRaw.length; i += 2) {
      const key = legacyAliasesRaw[i] != null ? String(legacyAliasesRaw[i]).trim() : "";
      if (!key) continue;
      aliasMap[key] = legacyAliasesRaw[i + 1] != null ? String(legacyAliasesRaw[i + 1]).trim() : "";
    }
  } else if (legacyAliasesRaw && typeof legacyAliasesRaw === "object") {
    Object.keys(legacyAliasesRaw).forEach(function (key) {
      aliasMap[String(key).trim()] = legacyAliasesRaw[key] != null ? String(legacyAliasesRaw[key]).trim() : "";
    });
  }

  const targetAccountIds = await Promise.all(
    legacyMembers.map(async function (legacyId) {
      const raw = legacyId != null ? String(legacyId).trim() : "";
      if (!raw) return null;
      return await resolveAccountId(raw);
    })
  );
  const commands = [];
  const migratedIds = [];
  targetAccountIds.forEach(function (targetAccountId, idx) {
    if (!targetAccountId || targetAccountId === myAccountId) return;
    migratedIds.push(targetAccountId);
    commands.push(["SADD", FRIENDS_KEY_PREFIX + myAccountId, targetAccountId]);
    const alias = aliasMap[String(legacyMembers[idx] || "").trim()];
    const cleanAlias = sanitizeContactName(alias);
    if (cleanAlias) commands.push(["HSET", FRIEND_ALIAS_KEY_PREFIX + myAccountId, targetAccountId, cleanAlias]);
  });
  if (!commands.length) return null;
  commands.push(["DEL", legacyKey], ["DEL", legacyAliasKey]);
  await redisPipeline(commands);
  return migratedIds;
}

async function normalizeCurrentFriendsIfNeeded(myAccountId, memberList) {
  const rawMembers = Array.isArray(memberList) ? memberList : [];
  if (!myAccountId || !rawMembers.length) {
    return rawMembers.map(function (memberId) {
      return memberId != null ? String(memberId).trim() : "";
    }).filter(Boolean);
  }

  const aliasKey = FRIEND_ALIAS_KEY_PREFIX + myAccountId;
  const aliasRes = await redisPipeline([["HMGET", aliasKey, ...rawMembers]]);
  const aliasRow = aliasRes && aliasRes[0] && Array.isArray(aliasRes[0].result) ? aliasRes[0].result : [];
  const normalizedMembers = [];
  const migrationCommands = [];
  const seen = new Set();

  for (let i = 0; i < rawMembers.length; i += 1) {
    const rawMemberId = rawMembers[i] != null ? String(rawMembers[i]).trim() : "";
    if (!rawMemberId || rawMemberId === myAccountId) continue;
    const normalizedMemberId = (await resolveAccountId(rawMemberId)) || rawMemberId;
    const targetMemberId = String(normalizedMemberId || "").trim();
    if (!targetMemberId || targetMemberId === myAccountId || seen.has(targetMemberId)) continue;
    seen.add(targetMemberId);
    normalizedMembers.push(targetMemberId);

    if (targetMemberId !== rawMemberId) {
      migrationCommands.push(["SREM", FRIENDS_KEY_PREFIX + myAccountId, rawMemberId]);
      migrationCommands.push(["SADD", FRIENDS_KEY_PREFIX + myAccountId, targetMemberId]);
      const rawAlias = aliasRow[i] != null && aliasRow[i] !== false ? String(aliasRow[i]).trim() : "";
      const cleanAlias = sanitizeContactName(rawAlias);
      if (cleanAlias) {
        migrationCommands.push(["HSET", aliasKey, targetMemberId, cleanAlias]);
        migrationCommands.push(["HDEL", aliasKey, rawMemberId]);
      }
    }
  }

  if (migrationCommands.length) await redisPipeline(migrationCommands);
  return normalizedMembers;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  let bodyPre = {};
  if (req.method === "POST" || req.method === "DELETE") {
    try {
      bodyPre = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    } catch (e) {
      if (req.method === "DELETE") return res.status(400).json({ ok: false, error: "Invalid JSON" });
      bodyPre = {};
    }
  }
  const identity = resolveTelegramIdentity(req, bodyPre, BOT_TOKEN);
  if (!identity) return res.status(401).json({ ok: false, error: "Откройте в Telegram или войдите через сайт" });
  const myId = memberIdFromIdentity(identity);
  if (!myId) return res.status(401).json({ ok: false, error: "Не удалось определить пользователя" });
  const myAccountId = await ensureDtIdForUserId(myId);
  if (!myAccountId) return res.status(500).json({ ok: false, error: "Не удалось подготовить ID аккаунта" });

  if (req.method === "DELETE") {
    const targetUserId = await resolveAccountId(bodyPre.targetUserId || "");
    if (!targetUserId) {
      return res.status(400).json({ ok: false, error: "Нужен targetUserId" });
    }
    if (targetUserId === myAccountId) return res.status(400).json({ ok: false, error: "Нельзя удалить себя" });
    if (!REDIS_URL || !REDIS_TOKEN) return res.status(500).json({ ok: false, error: "Сервер не настроен" });
    const key = FRIENDS_KEY_PREFIX + myAccountId;
    const aliasKey = FRIEND_ALIAS_KEY_PREFIX + myAccountId;
    const result = await redisPipeline([
      ["SREM", key, targetUserId],
      ["HDEL", aliasKey, targetUserId],
    ]);
    if (!result) return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
    return res.status(200).json({ ok: true });
  }

  if (req.method === "POST") {
    const body = bodyPre;
    const targetUserId = await resolveAccountId(body.targetUserId || "");
    if (!targetUserId) {
      return res.status(400).json({ ok: false, error: "Нужен targetUserId" });
    }
    if (targetUserId === myAccountId) return res.status(400).json({ ok: false, error: "Нельзя добавить себя" });
    if (!REDIS_URL || !REDIS_TOKEN) return res.status(500).json({ ok: false, error: "Сервер не настроен" });
    const key = FRIENDS_KEY_PREFIX + myAccountId;
    const contactName = sanitizeContactName(body.contactName != null ? body.contactName : body.contact_name);
    const aliasKey = FRIEND_ALIAS_KEY_PREFIX + myAccountId;
    const cmds = [["SADD", key, targetUserId]];
    if (contactName.length > 0) cmds.push(["HSET", aliasKey, targetUserId, contactName]);
    else cmds.push(["HDEL", aliasKey, targetUserId]);
    const result = await redisPipeline(cmds);
    if (!result) return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
    return res.status(200).json({ ok: true });
  }

  if (req.method !== "GET") return res.status(405).json({ ok: false, error: "Method not allowed" });
  if (!REDIS_URL || !REDIS_TOKEN) return res.status(500).json({ ok: false, error: "Redis not configured" });

  await migrateLegacyFriendsIfNeeded(myId, myAccountId);
  const key = FRIENDS_KEY_PREFIX + myAccountId;
  const membersRes = await redisPipeline([["SMEMBERS", key]]);
  const rawMemberList = membersRes && membersRes[0] && Array.isArray(membersRes[0].result) ? membersRes[0].result : [];
  const memberList = await normalizeCurrentFriendsIfNeeded(myAccountId, rawMemberList);
  if (memberList.length === 0) return res.status(200).json({ ok: true, friends: [] });
  const [chatIds, preferredUserIds] = await Promise.all([
    Promise.all(memberList.map((id) => getUserIdByDtId(id))),
    Promise.all(memberList.map((id) => getPreferredUserIdByDtId(id))),
  ]);
  const cmds = chatIds.map((id) => ["HGET", USERNAMES_KEY, id || ""]);
  const namesRes = await redisPipeline(cmds);
  const aliasKey = FRIEND_ALIAS_KEY_PREFIX + myAccountId;
  const aliasRes = await redisPipeline([["HMGET", aliasKey, ...memberList]]);
  const aliasRow = aliasRes && aliasRes[0] && Array.isArray(aliasRes[0].result) ? aliasRes[0].result : [];
  const friends = memberList.map((userId, i) => {
    const un = namesRes && namesRes[i] && namesRes[i].result ? String(namesRes[i].result).trim() : "";
    const userName = buildFriendDisplayName(userId, un, preferredUserIds[i]);
    const rawAlias = aliasRow[i] != null && aliasRow[i] !== false ? String(aliasRow[i]).trim() : "";
    const contactName = rawAlias.length > 0 ? sanitizeContactName(rawAlias) : null;
    const out = { userId, userName };
    if (chatIds[i]) out.chatUserId = chatIds[i];
    if (contactName) out.contactName = contactName;
    return out;
  });
  return res.status(200).json({ ok: true, friends });
};
