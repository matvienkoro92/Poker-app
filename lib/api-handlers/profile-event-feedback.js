const crypto = require("crypto");
const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { ensureDtIdForUserId, getPreferredUserIdByDtId, ID_TO_USER_KEY } = require("../account-id");
const { BIND_HASH_KEY, PROFILE_HASH_KEY } = require("../pokerplus");
const { pokerProfileStatusFromCachedProfile } = require("../chat-profile-status");
const { setCors, isAdminIdentity } = require("../api-auth");
const { rejectBlockedAppUser } = require("../app-user-blocks");
const { rateLimit, rejectIfPayloadTooLarge } = require("../api-limits");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const ALLOWED_REACTIONS = new Set(["❤️", "🔥", "👍", "👏", "😂", "😮", "😢", "😡"]);
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

function viewsKey(id) {
  return "poker_app:profile_event_views:" + eventHash(id);
}

const CLUB_FEED_VIEWS_KEY = "poker_app:profile_event_views:club_feed";

function commentReactionsKey(id, commentId) {
  return "poker_app:profile_comment_reactions:" + eventHash(id + ":" + String(commentId || ""));
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

function safeProfile(raw) {
  if (!raw) return {};
  if (typeof raw === "object") return raw;
  try { return JSON.parse(String(raw)) || {}; }
  catch (error) { return {}; }
}

async function enrichFeedbackAuthors(feedbackList) {
  const feedbackRows = Array.isArray(feedbackList) ? feedbackList : [];
  const accountIds = [...new Set(feedbackRows.flatMap((feedback) =>
    (Array.isArray(feedback && feedback.comments) ? feedback.comments : [])
      .concat(Array.isArray(feedback && feedback.reactors) ? feedback.reactors : [])
      .concat((Array.isArray(feedback && feedback.comments) ? feedback.comments : []).flatMap((comment) =>
        Array.isArray(comment && comment.reactors) ? comment.reactors : []
      ))
      .map((comment) => String(comment && comment.memberId || "").trim())
      .filter(Boolean)
  ))];
  if (!accountIds.length) return feedbackRows;
  // Resolve the common direct account mapping in the same Redis round-trip as
  // profile data. Only uncommon mail/legacy aliases need the slower fallback.
  const result = await redisPipeline(accountIds.flatMap((accountId) => [
    ["HGET", ID_TO_USER_KEY, accountId],
    ["HGET", PROFILE_HASH_KEY, accountId],
    ["HGET", CHAT_DISPLAY_NAMES_KEY, accountId],
    ["GET", avatarKey(accountId)],
    ["HGET", BIND_HASH_KEY, accountId],
  ]));
  const profileIds = await Promise.all(accountIds.map(async (accountId, index) => {
    const direct = String(result && result[index * 5] && result[index * 5].result || "").trim();
    if (direct && !/^mail_/.test(direct) && !/^mail_pending_/.test(direct)) return direct;
    try {
      return await getPreferredUserIdByDtId(accountId) || accountId;
    } catch (error) {
      return accountId;
    }
  }));
  const authors = {};
  accountIds.forEach((accountId, index) => {
    const offset = index * 5;
    const profile = safeProfile(result && result[offset + 1] && result[offset + 1].result);
    const nickname = profileNickname(profile);
    const poker21Id = String(result && result[offset + 4] && result[offset + 4].result || "").trim();
    const status = nickname ? pokerProfileStatusFromCachedProfile(profile, { pokerPlusLinked: !!poker21Id }) : null;
    authors[accountId] = {
      profileId: profileIds[index] || accountId,
      name: nickname ||
        String(result && result[offset + 2] && result[offset + 2].result || "").trim(),
      avatarUrl: avatarUrl(result && result[offset + 3] && result[offset + 3].result),
      poker21Id,
      level: Math.max(0, Number(status && status.level) || 0),
      verified: !!poker21Id,
    };
  });
  feedbackRows.forEach((feedback) => {
    if (!feedback || !Array.isArray(feedback.comments)) return;
    feedback.comments = feedback.comments.map((comment) => {
      const author = authors[String(comment && comment.memberId || "").trim()] || {};
      const enrichedComment = Object.assign({}, comment, {
        author: author.name || comment.author || "Игрок",
        authorAvatar: author.avatarUrl || "",
        authorProfileId: author.profileId || comment.memberId || "",
        authorPoker21Id: author.poker21Id || "",
        authorLevel: author.level || 0,
        authorVerified: author.verified === true,
      });
      enrichedComment.reactors = (Array.isArray(comment.reactors) ? comment.reactors : []).map((reactor) => {
        const reactorAuthor = authors[String(reactor && reactor.memberId || "").trim()] || {};
        return Object.assign({}, reactor, {
          name: reactorAuthor.name || "Игрок",
          avatar: reactorAuthor.avatarUrl || "",
          profileId: reactorAuthor.profileId || reactor.memberId || "",
        });
      });
      return enrichedComment;
    });
    feedback.reactors = (Array.isArray(feedback.reactors) ? feedback.reactors : []).map((reactor) => {
      const author = authors[String(reactor && reactor.memberId || "").trim()] || {};
      return Object.assign({}, reactor, {
        name: author.name || "Игрок",
        avatar: author.avatarUrl || "",
        profileId: author.profileId || reactor.memberId || "",
      });
    });
  });
  return feedbackRows;
}

async function feedbackForEvents(ids, myAccountId, viewCountOverride) {
  const eventIds = Array.isArray(ids) ? ids : [];
  if (!eventIds.length) return [];
  const baseResults = await redisPipeline(eventIds.flatMap((id) => [
    ["HGETALL", reactionsKey(id)],
    ["LRANGE", commentsKey(id), "0", String(MAX_COMMENTS - 1)],
    ["HLEN", viewsKey(id)],
  ]));
  const parsed = eventIds.map((id, eventIndex) => {
    const offset = eventIndex * 3;
    const votes = parseHashPairs(baseResults && baseResults[offset] && baseResults[offset].result);
    const reactions = {};
    Object.keys(votes).forEach((accountId) => {
      const emoji = votes[accountId];
      if (ALLOWED_REACTIONS.has(emoji)) reactions[emoji] = (reactions[emoji] || 0) + 1;
    });
    const comments = (Array.isArray(baseResults && baseResults[offset + 1] && baseResults[offset + 1].result)
      ? baseResults[offset + 1].result : []).map(safeComment).filter(Boolean).reverse();
    comments.forEach((comment) => { comment.isMine = String(comment.memberId || "") === String(myAccountId || ""); });
    return { id, votes, reactions, comments, viewResult: baseResults && baseResults[offset + 2] };
  });
  const commentRefs = parsed.flatMap((row) => row.comments.map((comment) => ({ row, comment })));
  const commentResults = commentRefs.length
    ? await redisPipeline(commentRefs.map((ref) => ["HGETALL", commentReactionsKey(ref.row.id, ref.comment.id)]))
    : [];
  commentRefs.forEach((ref, index) => {
    const votes = parseHashPairs(commentResults && commentResults[index] && commentResults[index].result);
    ref.comment.reactions = {};
    ref.comment.reactors = [];
    Object.keys(votes).forEach((accountId) => {
      const emoji = votes[accountId];
      if (!ALLOWED_REACTIONS.has(emoji)) return;
      ref.comment.reactions[emoji] = (ref.comment.reactions[emoji] || 0) + 1;
      ref.comment.reactors.push({ memberId: accountId, emoji });
    });
    ref.comment.myReaction = ALLOWED_REACTIONS.has(votes[myAccountId]) ? votes[myAccountId] : "";
  });
  return parsed.map((row) => ({
    reactions: row.reactions,
    myReaction: ALLOWED_REACTIONS.has(row.votes[myAccountId]) ? row.votes[myAccountId] : "",
    reactors: Object.keys(row.votes).filter((accountId) => ALLOWED_REACTIONS.has(row.votes[accountId]))
      .map((accountId) => ({ memberId: accountId, emoji: row.votes[accountId] })),
    comments: row.comments,
    commentCount: row.comments.length,
    viewCount: viewCountOverride == null
      ? Math.max(0, Number(row.viewResult && row.viewResult.result) || 0)
      : Math.max(0, Number(viewCountOverride) || 0),
  }));
}

async function feedbackForEvent(id, myAccountId, viewCountOverride) {
  const result = await redisPipeline([
    ["HGETALL", reactionsKey(id)],
    ["LRANGE", commentsKey(id), "0", String(MAX_COMMENTS - 1)],
    ["HLEN", viewsKey(id)],
  ]);
  const votes = parseHashPairs(result && result[0] && result[0].result);
  const reactions = {};
  Object.keys(votes).forEach((accountId) => {
    const emoji = votes[accountId];
    if (ALLOWED_REACTIONS.has(emoji)) reactions[emoji] = (reactions[emoji] || 0) + 1;
  });
  const comments = (Array.isArray(result && result[1] && result[1].result) ? result[1].result : [])
    .map(safeComment)
    .filter(Boolean)
    // Comments are stored with LPUSH (newest first), but discussions read
    // naturally from the original comment down to its later replies.
    .reverse();
  comments.forEach((comment) => {
    comment.isMine = String(comment.memberId || "") === String(myAccountId || "");
  });
  if (comments.length) {
    const reactionResults = await redisPipeline(comments.map((comment) => ["HGETALL", commentReactionsKey(id, comment.id)]));
    comments.forEach((comment, index) => {
      const commentVotes = parseHashPairs(reactionResults && reactionResults[index] && reactionResults[index].result);
      comment.reactions = {};
      comment.reactors = [];
      Object.keys(commentVotes).forEach((accountId) => {
        const emoji = commentVotes[accountId];
        if (!ALLOWED_REACTIONS.has(emoji)) return;
        comment.reactions[emoji] = (comment.reactions[emoji] || 0) + 1;
        comment.reactors.push({ memberId: accountId, emoji });
      });
      comment.myReaction = ALLOWED_REACTIONS.has(commentVotes[myAccountId]) ? commentVotes[myAccountId] : "";
    });
  }
  const reactors = Object.keys(votes).filter((accountId) => ALLOWED_REACTIONS.has(votes[accountId])).map((accountId) => ({
    memberId: accountId,
    emoji: votes[accountId],
  }));
  return {
    reactions,
    myReaction: ALLOWED_REACTIONS.has(votes[myAccountId]) ? votes[myAccountId] : "",
    reactors,
    comments,
    commentCount: comments.length,
    viewCount: viewCountOverride == null
      ? Math.max(0, Number(result && result[2] && result[2].result) || 0)
      : Math.max(0, Number(viewCountOverride) || 0),
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
  const admin = isAdminIdentity(identity, memberId);
  const myAccountId = await ensureDtIdForUserId(memberId);
  if (!myAccountId) return res.status(500).json({ ok: false, error: "Не удалось подготовить аккаунт" });
  if (!redisConfigured()) return res.status(503).json({ ok: false, error: "Хранилище недоступно" });

  const action = String(body.action || "list").trim().toLowerCase();
  const sharedClubViews = String(body.scope || "").trim().toLowerCase() === "club";
  if (action === "list" || action === "view") {
    const ids = [...new Set((Array.isArray(body.eventIds) ? body.eventIds : []).map(eventId).filter(Boolean))].slice(0, MAX_EVENT_IDS);
    if (action === "view" && ids.length) {
      const now = new Date().toISOString();
      const commands = ids.flatMap((id) => [
        ["HSET", viewsKey(id), myAccountId, now],
        ["EXPIRE", viewsKey(id), String(400 * 24 * 60 * 60)],
      ]);
      if (sharedClubViews) commands.push(
        ["HSET", CLUB_FEED_VIEWS_KEY, myAccountId, now],
        ["EXPIRE", CLUB_FEED_VIEWS_KEY, String(400 * 24 * 60 * 60)]
      );
      await redisPipeline(commands);
    }
    const clubViewResult = sharedClubViews ? await redisPipeline([["HLEN", CLUB_FEED_VIEWS_KEY]]) : null;
    const clubViewCount = sharedClubViews ? Number(clubViewResult && clubViewResult[0] && clubViewResult[0].result) || 0 : null;
    const feedbackRows = await feedbackForEvents(ids, myAccountId, clubViewCount);
    const rows = ids.map((id, index) => [id, feedbackRows[index]]);
    await enrichFeedbackAuthors(rows.map((row) => row[1]));
    return res.status(200).json({ ok: true, feedback: Object.fromEntries(rows) });
  }

  const id = eventId(body.eventId);
  if (!id) return res.status(400).json({ ok: false, error: "Нужно событие" });
  const clubViewResult = sharedClubViews ? await redisPipeline([["HLEN", CLUB_FEED_VIEWS_KEY]]) : null;
  const clubViewCount = sharedClubViews ? Number(clubViewResult && clubViewResult[0] && clubViewResult[0].result) || 0 : null;

  if (action === "reaction") {
    const emoji = String(body.emoji || "").trim();
    if (!ALLOWED_REACTIONS.has(emoji)) return res.status(400).json({ ok: false, error: "Недоступная реакция" });
    const key = reactionsKey(id);
    const currentResult = await redisPipeline([["HGET", key, myAccountId]]);
    const current = String(currentResult && currentResult[0] && currentResult[0].result || "");
    await redisPipeline([[current === emoji ? "HDEL" : "HSET", key, myAccountId, ...(current === emoji ? [] : [emoji])]]);
    const feedback = await feedbackForEvent(id, myAccountId, clubViewCount);
    await enrichFeedbackAuthors([feedback]);
    return res.status(200).json({ ok: true, eventId: id, feedback });
  }

  if (action === "comment-reaction") {
    const commentId = String(body.commentId || "").trim().slice(0, 120);
    const emoji = String(body.emoji || "").trim();
    if (!commentId) return res.status(400).json({ ok: false, error: "Нужен комментарий" });
    if (!ALLOWED_REACTIONS.has(emoji)) return res.status(400).json({ ok: false, error: "Недоступная реакция" });
    const key = commentReactionsKey(id, commentId);
    const currentResult = await redisPipeline([["HGET", key, myAccountId]]);
    const current = String(currentResult && currentResult[0] && currentResult[0].result || "");
    await redisPipeline([[current === emoji ? "HDEL" : "HSET", key, myAccountId, ...(current === emoji ? [] : [emoji])]]);
    const feedback = await feedbackForEvent(id, myAccountId, clubViewCount);
    await enrichFeedbackAuthors([feedback]);
    return res.status(200).json({ ok: true, eventId: id, feedback });
  }

  if (action === "delete-comment") {
    const commentId = String(body.commentId || "").trim().slice(0, 120);
    if (!commentId) return res.status(400).json({ ok: false, error: "Нужен комментарий" });
    const listResult = await redisPipeline([["LRANGE", commentsKey(id), "0", String(MAX_COMMENTS - 1)]]);
    const rawComments = Array.isArray(listResult && listResult[0] && listResult[0].result)
      ? listResult[0].result
      : [];
    const ownedRaw = rawComments.find((raw) => {
      const comment = safeComment(raw);
      return comment && String(comment.id) === commentId && (admin || String(comment.memberId || "") === String(myAccountId));
    });
    if (!ownedRaw) return res.status(403).json({ ok: false, error: admin ? "Комментарий уже удалён" : "Можно удалить только свой комментарий" });
    await redisPipeline([
      ["LREM", commentsKey(id), "1", ownedRaw],
      ["DEL", commentReactionsKey(id, commentId)],
    ]);
    const feedback = await feedbackForEvent(id, myAccountId, clubViewCount);
    await enrichFeedbackAuthors([feedback]);
    return res.status(200).json({ ok: true, eventId: id, feedback });
  }

  if (action === "comment") {
    if (sharedClubViews && id.startsWith("club-guestbook:")) {
      const bindingResult = await redisPipeline([["HGET", BIND_HASH_KEY, myAccountId]]);
      const poker21Id = String(bindingResult && bindingResult[0] && bindingResult[0].result || "").trim();
      if (!poker21Id) return res.status(403).json({ ok: false, error: "Привяжите аккаунт Poker21, чтобы оставлять комментарии" });
    }
    const text = String(body.text || "").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim().slice(0, MAX_COMMENT_TEXT);
    if (!text) return res.status(400).json({ ok: false, error: "Введите комментарий" });
    const replyToId = String(body.replyTo && body.replyTo.id || "").trim().slice(0, 120);
    let replyTo = null;
    if (replyToId) {
      const listResult = await redisPipeline([["LRANGE", commentsKey(id), "0", String(MAX_COMMENTS - 1)]]);
      const rawComments = Array.isArray(listResult && listResult[0] && listResult[0].result)
        ? listResult[0].result
        : [];
      const sourceComment = rawComments.map(safeComment).find((row) => row && String(row.id) === replyToId);
      if (sourceComment) {
        replyTo = {
          id: String(sourceComment.id),
          fromName: String(sourceComment.author || "Игрок").slice(0, 100),
          text: String(sourceComment.text || "").slice(0, 160),
        };
      }
    }
    const comment = {
      id: Date.now().toString(36) + "-" + crypto.randomBytes(4).toString("hex"),
      memberId: myAccountId,
      author: authorName(identity),
      text,
      at: new Date().toISOString(),
    };
    if (replyTo) comment.replyTo = replyTo;
    await redisPipeline([
      ["LPUSH", commentsKey(id), JSON.stringify(comment)],
      ["LTRIM", commentsKey(id), "0", String(MAX_COMMENTS - 1)],
    ]);
    const feedback = await feedbackForEvent(id, myAccountId, clubViewCount);
    await enrichFeedbackAuthors([feedback]);
    return res.status(200).json({ ok: true, eventId: id, feedback });
  }

  return res.status(400).json({ ok: false, error: "Неизвестное действие" });
};
