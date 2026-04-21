/**
 * Друзья: добавить в друзья, список друзей.
 * GET → список { userId, userName, contactName? }[] (contactName — имя, заданное владельцем списка)
 * POST { targetUserId, contactName? } → добавить; contactName сохраняется в HSET poker_app:friend_alias:{myId}
 * DELETE JSON { targetUserId } → убрать из друзей и удалить алиас
 */
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { ensureDtIdForUserId, getUserIdByDtId, resolveAccountId } = require("../account-id");
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

  const key = FRIENDS_KEY_PREFIX + myAccountId;
  const membersRes = await redisPipeline([["SMEMBERS", key]]);
  const memberList = membersRes && membersRes[0] && Array.isArray(membersRes[0].result) ? membersRes[0].result : [];
  if (memberList.length === 0) return res.status(200).json({ ok: true, friends: [] });
  const chatIds = await Promise.all(memberList.map((id) => getUserIdByDtId(id)));
  const cmds = chatIds.map((id) => ["HGET", USERNAMES_KEY, id || ""]);
  const namesRes = await redisPipeline(cmds);
  const aliasKey = FRIEND_ALIAS_KEY_PREFIX + myAccountId;
  const aliasRes = await redisPipeline([["HMGET", aliasKey, ...memberList]]);
  const aliasRow = aliasRes && aliasRes[0] && Array.isArray(aliasRes[0].result) ? aliasRes[0].result : [];
  const friends = memberList.map((userId, i) => {
    const un = namesRes && namesRes[i] && namesRes[i].result ? String(namesRes[i].result).trim() : "";
    const userName = un ? "@" + un : userId;
    const rawAlias = aliasRow[i] != null && aliasRow[i] !== false ? String(aliasRow[i]).trim() : "";
    const contactName = rawAlias.length > 0 ? sanitizeContactName(rawAlias) : null;
    const out = { userId, userName };
    if (chatIds[i]) out.chatUserId = chatIds[i];
    if (contactName) out.contactName = contactName;
    return out;
  });
  return res.status(200).json({ ok: true, friends });
};
