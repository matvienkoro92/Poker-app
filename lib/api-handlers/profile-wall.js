const crypto = require("crypto");
const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { ensureDtIdForUserId, getDtIdByUserId, resolveAccountId } = require("../account-id");
const { setCors } = require("../api-auth");
const { rejectBlockedAppUser } = require("../app-user-blocks");
const { rateLimit, rejectIfPayloadTooLarge } = require("../api-limits");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const KEY_PREFIX = "poker_app:profile_wall:";
const FRIENDSHIPS_KEY_PREFIX = "poker_app:friendships:";
const MAX_POSTS = 50;
const MAX_TEXT = 1500;
const MAX_IMAGE_CHARS = 450000;

function wallKey(accountId) {
  return KEY_PREFIX + String(accountId || "").replace(/[^a-zA-Z0-9_-]/g, "_");
}

function cleanText(raw) {
  return String(raw || "")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .trim()
    .slice(0, MAX_TEXT);
}

async function resolveWallAccountId(rawId) {
  const id = String(rawId || "").trim();
  if (!id) return null;
  const direct = await resolveAccountId(id);
  if (direct) return direct;
  if (/^\d+$/.test(id)) {
    const knownTelegram = await getDtIdByUserId("tg_" + id);
    if (knownTelegram) return knownTelegram;
    const knownVk = await getDtIdByUserId("vk_" + id);
    if (knownVk) return knownVk;
  }
  const knownRaw = await getDtIdByUserId(id);
  return knownRaw || await ensureDtIdForUserId(id);
}

function parsePosts(raw) {
  if (!raw) return [];
  try {
    const rows = JSON.parse(String(raw));
    return Array.isArray(rows) ? rows.filter((row) => row && row.id && (row.text || row.image)).slice(0, MAX_POSTS) : [];
  } catch (error) {
    return [];
  }
}

function sortPosts(rows) {
  return rows.slice().sort((a, b) => {
    if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
    return String(b.createdAt || "").localeCompare(String(a.createdAt || ""));
  });
}

module.exports = async function handler(req, res) {
  setCors(res, "POST, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });
  if (rejectIfPayloadTooLarge(req, res, 620000)) return;
  if (rateLimit(req, res, { bucket: "profile_wall", limit: 90, windowMs: 60_000 })) return;

  let body = {};
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch (error) {
    return res.status(400).json({ ok: false, error: "Invalid JSON" });
  }
  const identity = resolveTelegramIdentity(req, body, BOT_TOKEN);
  if (!identity) return res.status(401).json({ ok: false, error: "Войдите, чтобы открыть стену" });
  const memberId = memberIdFromIdentity(identity);
  if (!memberId) return res.status(401).json({ ok: false, error: "Не удалось определить пользователя" });
  if (await rejectBlockedAppUser(req, res, identity, memberId)) return;
  if (!redisConfigured()) return res.status(503).json({ ok: false, error: "Хранилище недоступно" });

  const myAccountId = await ensureDtIdForUserId(memberId);
  const rawTargetId = String(body.targetUserId || "").trim();
  const targetAccountId = (rawTargetId
    ? await resolveWallAccountId(rawTargetId)
    : null) || myAccountId;
  if (!myAccountId || !targetAccountId) return res.status(400).json({ ok: false, error: "Профиль не найден" });
  const canManage = myAccountId === targetAccountId;
  const action = String(body.action || "list").trim().toLowerCase();
  if (action === "friend-feed") {
    const friendResult = await redisPipeline([["SMEMBERS", FRIENDSHIPS_KEY_PREFIX + myAccountId]]);
    const friendIds = (Array.isArray(friendResult && friendResult[0] && friendResult[0].result)
      ? friendResult[0].result : []).map(String).filter(Boolean).slice(0, 200);
    if (!friendIds.length) return res.status(200).json({ ok: true, posts: [] });
    const postResults = await redisPipeline(friendIds.map((accountId) => ["GET", wallKey(accountId)]));
    const feed = [];
    friendIds.forEach((accountId, index) => {
      parsePosts(postResults && postResults[index] && postResults[index].result).forEach((post) => {
        feed.push(Object.assign({}, post, { accountId }));
      });
    });
    feed.sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
    return res.status(200).json({ ok: true, posts: feed.slice(0, 100) });
  }
  const result = await redisPipeline([["GET", wallKey(targetAccountId)]]);
  let posts = parsePosts(result && result[0] && result[0].result);

  if (action === "list") {
    return res.status(200).json({ ok: true, posts: sortPosts(posts), canManage, accountId: targetAccountId });
  }
  if (!canManage) return res.status(403).json({ ok: false, error: "Редактировать стену может только владелец профиля" });

  if (action === "create") {
    const text = cleanText(body.text);
    let image = String(body.image || "").trim();
    if (image) {
      const dataMatch = image.match(/^data:image\/(jpeg|jpg|png|gif|webp);base64,([0-9A-Za-z+/=\s]+)$/i);
      if (!dataMatch || dataMatch[2].replace(/\s/g, "").length > MAX_IMAGE_CHARS) {
        return res.status(400).json({ ok: false, error: "Не удалось обработать фотографию" });
      }
      try {
        const { tryUploadChatImageDataUrl } = require("../chat-image-blob");
        const blobUrl = await tryUploadChatImageDataUrl(image, memberId);
        if (blobUrl) image = blobUrl;
        else if ((process.env.BLOB_READ_WRITE_TOKEN || "").trim()) {
          return res.status(503).json({ ok: false, error: "Не удалось сохранить фотографию" });
        }
      } catch (error) {
        return res.status(503).json({ ok: false, error: "Не удалось сохранить фотографию" });
      }
    }
    if (!text && !image) return res.status(400).json({ ok: false, error: "Напишите текст или прикрепите фото" });
    const now = new Date().toISOString();
    posts.unshift({
      id: Date.now().toString(36) + "-" + crypto.randomBytes(5).toString("hex"),
      text,
      image,
      pinned: false,
      createdAt: now,
      editedAt: "",
    });
  } else if (action === "edit") {
    const id = String(body.postId || "").trim();
    const text = cleanText(body.text);
    const post = posts.find((row) => String(row.id) === id);
    if (!post) return res.status(404).json({ ok: false, error: "Запись не найдена" });
    if (!text) return res.status(400).json({ ok: false, error: "Запись не может быть пустой" });
    post.text = text;
    post.editedAt = new Date().toISOString();
  } else if (action === "pin") {
    const id = String(body.postId || "").trim();
    const post = posts.find((row) => String(row.id) === id);
    if (!post) return res.status(404).json({ ok: false, error: "Запись не найдена" });
    const nextPinned = !post.pinned;
    posts.forEach((row) => { row.pinned = false; });
    post.pinned = nextPinned;
  } else {
    return res.status(400).json({ ok: false, error: "Неизвестное действие" });
  }

  posts = sortPosts(posts).slice(0, MAX_POSTS);
  await redisPipeline([["SET", wallKey(targetAccountId), JSON.stringify(posts)]]);
  return res.status(200).json({ ok: true, posts, canManage: true, accountId: targetAccountId });
};
