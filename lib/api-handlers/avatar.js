/**
 * Аватар пользователя. GET — получить, POST — загрузить (авторизация как в /api/friends: initData / pwaSession / pwaVkSession + image base64).
 * Redis: poker_app:avatar:{userId}
 * Макс. размер: 320KB (base64), рекомендуемый 512x512 px.
 */
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { ensureDtIdForUserId, getDtIdByUserId } = require("../account-id");
const { rateLimit, rejectIfPayloadTooLarge } = require("../api-limits");
const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const MAX_SIZE = 320 * 1024;
const PRESET_AVATARS = [
  { id: "tiger", src: "./assets/avatar-tiger.jpg" },
  { id: "raccoon", src: "./assets/avatar-raccoon.jpg" },
  { id: "skull", src: "./assets/avatar-skull.jpg" },
  { id: "phoenix", src: "./assets/avatar-phoenix.jpg" },
  { id: "octopus", src: "./assets/avatar-octopus.jpg" },
  { id: "cat", src: "./assets/avatar-cat.jpg" },
  { id: "robot", src: "./assets/avatar-robot.jpg" },
  { id: "bulldog", src: "./assets/avatar-bulldog.jpg" },
  { id: "monkey", src: "./assets/daily-poker-monkey.webp" },
  { id: "fox", src: "./assets/avatar-fox.jpg" },
  { id: "chip", src: "./assets/avatar-chip.jpg" },
  { id: "koala", src: "./assets/avatar-koala.jpg" },
  { id: "raven", src: "./assets/avatar-raven.jpg" },
  { id: "crocodile", src: "./assets/avatar-crocodile.jpg" },
  { id: "rabbit", src: "./assets/avatar-rabbit.jpg" },
  { id: "chameleon", src: "./assets/avatar-chameleon.jpg" },
  { id: "panda", src: "./assets/avatar-panda.jpg" },
  { id: "wolf", src: "./assets/avatar-wolf.jpg" },
  { id: "owl", src: "./assets/avatar-owl.jpg" },
  { id: "bat", src: "./assets/avatar-bat.jpg" },
  { id: "gorilla", src: "./assets/avatar-gorilla.jpg" },
];
const PRESET_AVATAR_BY_ID = PRESET_AVATARS.reduce((acc, avatar) => {
  acc[avatar.id] = avatar;
  return acc;
}, {});

function encodePresetAvatar(id) {
  return "preset:" + id;
}

function resolveStoredAvatar(data) {
  if (!data || typeof data !== "string") return null;
  if (data.startsWith("data:")) return { avatar: data, avatarId: null };
  if (data.startsWith("preset:")) {
    const id = data.slice("preset:".length);
    const preset = PRESET_AVATAR_BY_ID[id];
    if (preset) return { avatar: preset.src, avatarId: preset.id };
  }
  return null;
}

function pickRandomPresetAvatar() {
  return PRESET_AVATARS[Math.floor(Math.random() * PRESET_AVATARS.length)] || PRESET_AVATARS[0];
}

function pickStablePresetAvatar(accountId) {
  const s = String(accountId || "");
  if (!s) return pickRandomPresetAvatar();
  let hash = 0;
  for (let i = 0; i < s.length; i += 1) {
    hash = (hash * 31 + s.charCodeAt(i)) >>> 0;
  }
  return PRESET_AVATARS[hash % PRESET_AVATARS.length] || PRESET_AVATARS[0];
}

async function redisCommand(cmd, key, ...args) {
  const data = await redisPipeline([[cmd, key, ...args].filter((x) => x !== undefined)]);
  return data && data[0] ? data[0].result : null;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }
  if (req.method === "POST") {
    if (rejectIfPayloadTooLarge(req, res, 450_000)) return;
    if (rateLimit(req, res, { bucket: "avatar_upload", limit: 20, windowMs: 10 * 60_000 })) return;
  }

  if (!redisConfigured()) {
    return res.status(500).json({ ok: false, error: "Redis not configured" });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch (e) {
    body = {};
  }

  const targetUserId = String(
    (req.query && (req.query.userId || req.query.user_id)) || body.userId || ""
  ).trim();

  if (req.method === "GET") {
    let userId = targetUserId;
    let isSelfRequest = false;
    if (!userId) {
      const identity = resolveTelegramIdentity(req, body, BOT_TOKEN);
      if (!identity) {
        return res.status(401).json({ ok: false, error: "Откройте в Telegram или войдите через сайт" });
      }
      userId = memberIdFromIdentity(identity);
      isSelfRequest = true;
    }
    if (!userId) return res.status(400).json({ ok: false, error: "userId или авторизация нужны" });

    const accountId = userId.startsWith("ID") ? userId : (userId.startsWith("guest_") ? userId : await getDtIdByUserId(userId));
    const key = "poker_app:avatar:" + String((accountId || userId)).replace(/[^a-zA-Z0-9_-]/g, "_");
    let data = await redisCommand("GET", key);
    if ((!data || typeof data !== "string") && accountId && accountId !== userId) {
      const legacyKey = "poker_app:avatar:" + String(userId).replace(/[^a-zA-Z0-9_-]/g, "_");
      data = await redisCommand("GET", legacyKey);
      if (data && typeof data === "string") {
        await redisCommand("SET", key, data);
      }
    }
    const resolved = resolveStoredAvatar(data);
    if (resolved) return res.status(200).json({ ok: true, avatar: resolved.avatar, avatarId: resolved.avatarId });

    const preset = isSelfRequest ? pickRandomPresetAvatar() : pickStablePresetAvatar(accountId || userId);
    await redisCommand("SET", key, encodePresetAvatar(preset.id));
    return res.status(200).json({ ok: true, avatar: preset.src, avatarId: preset.id });
  }

  const identity = resolveTelegramIdentity(req, body, BOT_TOKEN);
  if (!identity) {
    return res.status(401).json({ ok: false, error: "Откройте в Telegram или войдите через сайт" });
  }
  const myId = memberIdFromIdentity(identity);
  if (!myId) return res.status(401).json({ ok: false, error: "Не удалось определить пользователя" });
  const accountId = myId.startsWith("guest_") ? myId : await ensureDtIdForUserId(myId);
  if (!accountId) return res.status(500).json({ ok: false, error: "Не удалось подготовить ID аккаунта" });

  const avatarId = body.avatarId || body.avatar_id;
  if (avatarId !== undefined) {
    const preset = PRESET_AVATAR_BY_ID[String(avatarId || "").trim()];
    if (!preset) {
      return res.status(400).json({ ok: false, error: "Некорректный avatarId" });
    }
    const key = "poker_app:avatar:" + String(accountId).replace(/[^a-zA-Z0-9_-]/g, "_");
    const result = await redisCommand("SET", key, encodePresetAvatar(preset.id));
    if (result === undefined || result === null) {
      return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
    }
    return res.status(200).json({ ok: true, avatar: preset.src, avatarId: preset.id });
  }

  const image = body.image || body.avatar || body.data;
  if (!image || typeof image !== "string") {
    return res.status(400).json({ ok: false, error: "image (base64 data URL) обязателен" });
  }

  const base64 = image.replace(/^data:image\/\w+;base64,/, "");
  if (Buffer.byteLength(base64, "base64") > MAX_SIZE) {
    return res.status(400).json({ ok: false, error: "Изображение слишком большое (макс. 320 KB)" });
  }

  const key = "poker_app:avatar:" + String(accountId).replace(/[^a-zA-Z0-9_-]/g, "_");
  const stored = "data:image/jpeg;base64," + base64;
  const result = await redisCommand("SET", key, stored);

  if (result === undefined || result === null) {
    return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
  }
  return res.status(200).json({ ok: true, avatar: stored });
};
