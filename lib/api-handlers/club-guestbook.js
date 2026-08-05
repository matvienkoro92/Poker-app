const crypto = require("crypto");
const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { ensureDtIdForUserId } = require("../account-id");
const { BIND_HASH_KEY, PROFILE_HASH_KEY } = require("../pokerplus");
const { pokerProfileStatusFromCachedProfile } = require("../chat-profile-status");
const { setCors } = require("../api-auth");
const { rejectBlockedAppUser } = require("../app-user-blocks");
const { rateLimit, rejectIfPayloadTooLarge } = require("../api-limits");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const POSTS_KEY = "poker_app:club_guestbook:v1";
const CHAT_DISPLAY_NAMES_KEY = "poker_app:visitor_chat_display_names";
const AVATAR_PREFIX = "poker_app:avatar:";
const MAX_POSTS = 200;
const MAX_TEXT = 1500;
const PRESET_AVATARS = {
  tiger: "./assets/avatar-tiger.jpg", raccoon: "./assets/avatar-raccoon.jpg", skull: "./assets/avatar-skull.jpg",
  phoenix: "./assets/avatar-phoenix.jpg", octopus: "./assets/avatar-octopus.jpg", cat: "./assets/avatar-cat.jpg",
  robot: "./assets/avatar-robot.jpg", bulldog: "./assets/avatar-bulldog.jpg", monkey: "./assets/daily-poker-monkey.webp",
  fox: "./assets/avatar-fox.jpg", chip: "./assets/avatar-chip.jpg", koala: "./assets/avatar-koala.jpg", raven: "./assets/avatar-raven.jpg",
  crocodile: "./assets/avatar-crocodile.jpg", rabbit: "./assets/avatar-rabbit.jpg", chameleon: "./assets/avatar-chameleon.jpg",
  panda: "./assets/avatar-panda.jpg", wolf: "./assets/avatar-wolf.jpg", owl: "./assets/avatar-owl.jpg", bat: "./assets/avatar-bat.jpg", gorilla: "./assets/avatar-gorilla.jpg",
};

function safeProfile(raw) {
  try { return raw && (typeof raw === "object" ? raw : JSON.parse(String(raw))) || {}; } catch (error) { return {}; }
}
function profileNick(profile) {
  return String(profile && (profile.nickname || profile.Nike || profile.nick || profile.name || profile.displayName) || "").trim();
}
function cleanText(value) {
  return String(value || "").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim().slice(0, MAX_TEXT);
}
function avatarUrl(value) {
  value = String(value || "").trim();
  if (value.startsWith("data:image/")) return value;
  if (value.startsWith("preset:")) return PRESET_AVATARS[value.slice(7)] || "";
  return "";
}
function parsePosts(raw) {
  try {
    const rows = JSON.parse(String(raw || "[]"));
    return Array.isArray(rows) ? rows.filter((row) => row && row.id && row.text && (row.type === "review" || row.type === "complaint")).slice(0, MAX_POSTS) : [];
  } catch (error) { return []; }
}

async function enrichPosts(rows) {
  const posts = Array.isArray(rows) ? rows : [];
  const accountIds = [...new Set(posts.map((post) => String(post && post.authorId || "").trim()).filter(Boolean))];
  if (!accountIds.length) return posts;
  const result = await redisPipeline(accountIds.flatMap((accountId) => [
    ["HGET", BIND_HASH_KEY, accountId],
    ["HGET", PROFILE_HASH_KEY, accountId],
    ["HGET", CHAT_DISPLAY_NAMES_KEY, accountId],
    ["GET", AVATAR_PREFIX + accountId.replace(/[^a-zA-Z0-9_-]/g, "_")],
  ]));
  const authors = {};
  accountIds.forEach((accountId, index) => {
    const offset = index * 4;
    const poker21Id = String(result && result[offset] && result[offset].result || "").trim();
    const profile = safeProfile(result && result[offset + 1] && result[offset + 1].result);
    const nickname = profileNick(profile);
    const status = nickname ? pokerProfileStatusFromCachedProfile(profile, { pokerPlusLinked: true }) : null;
    authors[accountId] = {
      profileId: accountId,
      name: nickname || String(result && result[offset + 2] && result[offset + 2].result || "").trim(),
      avatar: avatarUrl(result && result[offset + 3] && result[offset + 3].result),
      poker21Id,
      level: Math.max(0, Number(status && status.level) || 0),
      verified: !!poker21Id,
    };
  });
  return posts.map((post) => {
    const author = authors[String(post && post.authorId || "").trim()] || {};
    return Object.assign({}, post, {
      authorProfileId: author.profileId || post.authorId || "",
      authorName: author.name || post.authorName || "Игрок",
      authorAvatar: author.avatar || post.authorAvatar || "",
      authorPoker21Id: author.poker21Id || "",
      authorLevel: author.level || 0,
      authorVerified: author.verified === true,
    });
  });
}

module.exports = async function handler(req, res) {
  setCors(res, "POST, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });
  if (rejectIfPayloadTooLarge(req, res, 120000)) return;
  if (rateLimit(req, res, { bucket: "club_guestbook", limit: 60, windowMs: 60_000 })) return;
  let body = {};
  try { body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {}; }
  catch (error) { return res.status(400).json({ ok: false, error: "Invalid JSON" }); }
  const action = String(body.action || "list").toLowerCase();
  const identity = resolveTelegramIdentity(req, body, BOT_TOKEN);
  if (!identity && action === "list") {
    if (!redisConfigured()) return res.status(503).json({ ok: false, error: "Хранилище недоступно" });
    const publicResult = await redisPipeline([["GET", POSTS_KEY]]);
    const publicPosts = await enrichPosts(parsePosts(publicResult && publicResult[0] && publicResult[0].result));
    return res.status(200).json({ ok: true, posts: publicPosts, canPost: false, myNick: "" });
  }
  if (!identity) return res.status(401).json({ ok: false, error: "Войдите в аккаунт клуба" });
  const memberId = memberIdFromIdentity(identity);
  if (!memberId) return res.status(401).json({ ok: false, error: "Не удалось определить пользователя" });
  if (await rejectBlockedAppUser(req, res, identity, memberId)) return;
  if (!redisConfigured()) return res.status(503).json({ ok: false, error: "Хранилище недоступно" });

  const accountId = await ensureDtIdForUserId(memberId);
  const avatarKey = AVATAR_PREFIX + String(accountId || "").replace(/[^a-zA-Z0-9_-]/g, "_");
  const results = await redisPipeline([
    ["GET", POSTS_KEY], ["HGET", PROFILE_HASH_KEY, accountId], ["HGET", CHAT_DISPLAY_NAMES_KEY, accountId], ["GET", avatarKey], ["HGET", BIND_HASH_KEY, accountId],
  ]);
  let posts = parsePosts(results && results[0] && results[0].result);
  const profile = safeProfile(results && results[1] && results[1].result);
  const nick = profileNick(profile);
  const poker21Id = String(results && results[4] && results[4].result || "").trim();
  const canPost = !!poker21Id;
  if (action === "create") {
    if (!canPost) return res.status(403).json({ ok: false, error: "Сначала привяжите аккаунт Poker21" });
    const type = body.type === "complaint" ? "complaint" : "review";
    const text = cleanText(body.text);
    if (!text) return res.status(400).json({ ok: false, error: "Напишите текст" });
    const fallbackName = String(results && results[2] && results[2].result || "").trim();
    posts.unshift({
      id: Date.now().toString(36) + "-" + crypto.randomBytes(5).toString("hex"),
      type, text, authorId: accountId, authorName: nick || fallbackName || "Игрок",
      authorAvatar: avatarUrl(results && results[3] && results[3].result), createdAt: new Date().toISOString(),
    });
    posts = posts.slice(0, MAX_POSTS);
    await redisPipeline([["SET", POSTS_KEY, JSON.stringify(posts)]]);
  } else if (action !== "list") {
    return res.status(400).json({ ok: false, error: "Неизвестное действие" });
  }
  return res.status(200).json({ ok: true, posts: await enrichPosts(posts), canPost, myNick: nick });
};
