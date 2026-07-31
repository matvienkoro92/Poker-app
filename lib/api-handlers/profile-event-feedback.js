const crypto = require("crypto");
const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { ensureDtIdForUserId, getPreferredUserIdByDtId } = require("../account-id");
const { PROFILE_HASH_KEY } = require("../pokerplus");
const { setCors } = require("../api-auth");
const { rejectBlockedAppUser } = require("../app-user-blocks");
const { rateLimit, rejectIfPayloadTooLarge } = require("../api-limits");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const ALLOWED_REACTIONS = new Set(["❤️", "🔥", "👏"]);
const MAX_EVENT_IDS = 50;
const MAX_COMMENTS = 80;
const MAX_COMMENT_TEXT = 500;
const CHAT_DISPLAY_NAMES_KEY = "poker_app:visitor_chat_display_names";
const AVATAR_PREFIX = "poker_app:avatar:";
const PRESET_AVATARS = {
  tiger: "./assets/avatar-tiger.jpg", raccoon: "./assets/avatar-raccoon.jpg",
  skull: "./assets/avatar-skull.jpg", phoenix: "./assets/avatar-phoenix.jpg",
  octopus: "./assets/avatar-octopus.jpg", cat: "./assets/avatar-cat.jpg",
  robot: "./assets/avatar-robot.jpg", bulldog: "./assets/avatar-bulldog.jpg",
  monkey: "./assets/daily-poker-monkey.webp", fox: "./assets/avatar-fox.jpg",
  chip: "./assets/avatar-chip.jpg", koala: "./assets/avatar-koala.jpg",
  raven: "./assets/avatar-raven.jpg", crocodile: "./assets/avatar-crocodile.jpg",
  rabbit: "./assets/avatar-rabbit.jpg", chameleon: "./assets/avatar-chameleon.jpg",
  panda: "./assets/avatar-panda.jpg", wolf: "./assets/avatar-wolf.jpg",
  owl: "./assets/avatar-owl.jpg", bat: "./assets/avatar-bat.jpg",
  gorilla: "./assets/avatar-gorilla.jpg",
};

function eventId(raw) {
  return String(raw || "").trim().slice(0, 360);
}

function eventHash(id) {
  return crypto.createHash("sha256").update(id).digest("hex").slice(0, 32);
}

function reactionsKey(id) {
  return "poker_app:profile_event_reactions:" + eventHash(id);
}

function commentsKey(id) {
  return "poker_app:profile_event_comments:" + eventHash(id);
}

function parseHashPairs(raw) {
  const out = {};
  const list = Array.isArray(raw) ? raw : [];
  for (let i = 0; i + 1 < list.length; i += 2) out[String(list[i])] = String(list[i + 1]);
  return out;
}

function safeComment(raw) {
  try {
    const row = JSON.parse(String(raw || ""));
    return row && row.id && row.text ? row : null;
  } catch (error) {
    return null;
  }
}

function authorName(identity) {
  const first = String(identity && identity.firstName || "").trim();
  const last = String(identity && identity.lastName || "").trim();
  const full = [first, last].filter(Boolean).join(" ");
  const username = String(identity && (identity.telegramUsername || identity.pwaUsername) || "").replace(/^@+/, "").trim();
  return full || (username ? "@" + username : "") || "Игрок";
}

function avatarKey(accountId) {
  return AVATAR_PREFIX + String(accountId || "").replace(/[^a-zA-Z0-9_-]/g, "_");
}

function avatarUrl(raw) {
  const value = String(raw || "").trim();
  if (value.startsWith("data:")) return value;
  if (value.startsWith("preset:")) return PRESET_AVATARS[value.slice(7)] || "";
  return "";
}

function profileNickname(raw) {
  if (!raw) return "";
  try {
    const profile = typeof raw === "object" ? raw : JSON.parse(String(raw));
    return String(profile && (profile.nickname || profile.Nike || profile.nick || profile.name || profile.displayName) || "").trim();
  } catch (error) {
    return "";
  }
}

async function enrichFeedbackAuthors(feedbackList) {
  const feedbackRows = Array.isArray(feedbackList) ? feedbackList : [];
  const accountIds = [...new Set(feedbackRows.flatMap((feedback) =>
    (Array.isArray(feedback && feedback.comments) ? feedback.comments : [])
      .map((comment) => String(comment && comment.memberId || "").trim())
      .filter(Boolean)
  ))];
  if (!accountIds.length) return feedbackRows;
  const profileIds = await Promise.all(accountIds.map(async (accountId) => {
    try {
      return await getPreferredUserIdByDtId(accountId) || accountId;
    } catch (error) {
      return accountId;
    }
  }));
  const result = await redisPipeline(accountIds.flatMap((accountId) => [
    ["HGET", PROFILE_HASH_KEY, accountId],
    ["HGET", CHAT_DISPLAY_NAMES_KEY, accountId],
    ["GET", avatarKey(accountId)],
  ]));
  const authors = {};
  accountIds.forEach((accountId, index) => {
    const offset = index * 3;
    authors[accountId] = {
      profileId: profileIds[index] || accountId,
      name: profileNickname(result && result[offset] && result[offset].result) ||
        String(result && result[offset + 1] && result[offset + 1].result || "").trim(),
      avatarUrl: avatarUrl(result && result[offset + 2] && result[offset + 2].result),
    };
  });
  feedbackRows.forEach((feedback) => {
    if (!feedback || !Array.isArray(feedback.comments)) return;
    feedback.comments = feedback.comments.map((comment) => {
      const author = authors[String(comment && comment.memberId || "").trim()] || {};
      return Object.assign({}, comment, {
        author: author.name || comment.author || "Игрок",
        authorAvatar: author.avatarUrl || "",
        authorProfileId: author.profileId || comment.memberId || "",
      });
    });
  });
  return feedbackRows;
}

async function feedbackForEvent(id, myAccountId) {
  const result = await redisPipeline([
    ["HGETALL", reactionsKey(id)],
    ["LRANGE", commentsKey(id), "0", String(MAX_COMMENTS - 1)],
  ]);
  const votes = parseHashPairs(result && result[0] && result[0].result);
  const reactions = {};
  Object.keys(votes).forEach((accountId) => {
    const emoji = votes[accountId];
    if (ALLOWED_REACTIONS.has(emoji)) reactions[emoji] = (reactions[emoji] || 0) + 1;
  });
  const comments = (Array.isArray(result && result[1] && result[1].result) ? result[1].result : [])
    .map(safeComment)
    .filter(Boolean);
  return {
    reactions,
    myReaction: ALLOWED_REACTIONS.has(votes[myAccountId]) ? votes[myAccountId] : "",
    comments,
    commentCount: comments.length,
  };
}

module.exports = async function handler(req, res) {
  setCors(res, "POST, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });
  if (rejectIfPayloadTooLarge(req, res, 120000)) return;
  if (rateLimit(req, res, { bucket: "profile_event_feedback", limit: 120, windowMs: 60_000 })) return;

  let body = {};
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch (error) {
    return res.status(400).json({ ok: false, error: "Invalid JSON" });
  }
  const identity = resolveTelegramIdentity(req, body, BOT_TOKEN);
  if (!identity) return res.status(401).json({ ok: false, error: "Войдите, чтобы участвовать в обсуждении" });
  const memberId = memberIdFromIdentity(identity);
  if (!memberId) return res.status(401).json({ ok: false, error: "Не удалось определить пользователя" });
  if (await rejectBlockedAppUser(req, res, identity, memberId)) return;
  const myAccountId = await ensureDtIdForUserId(memberId);
  if (!myAccountId) return res.status(500).json({ ok: false, error: "Не удалось подготовить аккаунт" });
  if (!redisConfigured()) return res.status(503).json({ ok: false, error: "Хранилище недоступно" });

  const action = String(body.action || "list").trim().toLowerCase();
  if (action === "list") {
    const ids = [...new Set((Array.isArray(body.eventIds) ? body.eventIds : []).map(eventId).filter(Boolean))].slice(0, MAX_EVENT_IDS);
    const rows = await Promise.all(ids.map(async (id) => [id, await feedbackForEvent(id, myAccountId)]));
    await enrichFeedbackAuthors(rows.map((row) => row[1]));
    return res.status(200).json({ ok: true, feedback: Object.fromEntries(rows) });
  }

  const id = eventId(body.eventId);
  if (!id) return res.status(400).json({ ok: false, error: "Нужно событие" });

  if (action === "reaction") {
    const emoji = String(body.emoji || "").trim();
    if (!ALLOWED_REACTIONS.has(emoji)) return res.status(400).json({ ok: false, error: "Недоступная реакция" });
    const key = reactionsKey(id);
    const currentResult = await redisPipeline([["HGET", key, myAccountId]]);
    const current = String(currentResult && currentResult[0] && currentResult[0].result || "");
    await redisPipeline([[current === emoji ? "HDEL" : "HSET", key, myAccountId, ...(current === emoji ? [] : [emoji])]]);
    const feedback = await feedbackForEvent(id, myAccountId);
    await enrichFeedbackAuthors([feedback]);
    return res.status(200).json({ ok: true, eventId: id, feedback });
  }

  if (action === "comment") {
    const text = String(body.text || "").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim().slice(0, MAX_COMMENT_TEXT);
    if (!text) return res.status(400).json({ ok: false, error: "Введите комментарий" });
    const comment = {
      id: Date.now().toString(36) + "-" + crypto.randomBytes(4).toString("hex"),
      memberId: myAccountId,
      author: authorName(identity),
      text,
      at: new Date().toISOString(),
    };
    await redisPipeline([
      ["LPUSH", commentsKey(id), JSON.stringify(comment)],
      ["LTRIM", commentsKey(id), "0", String(MAX_COMMENTS - 1)],
    ]);
    const feedback = await feedbackForEvent(id, myAccountId);
    await enrichFeedbackAuthors([feedback]);
    return res.status(200).json({ ok: true, eventId: id, feedback });
  }

  return res.status(400).json({ ok: false, error: "Неизвестное действие" });
};
