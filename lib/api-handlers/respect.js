/**
 * Уважение в чате: счётчик и голоса (поднять/уменьшить один раз на пользователя).
 * GET ?userId=tg_xxx → score, myVote ("up"|"down"|null)
 * GET (без userId) → мой score для профиля
 * POST { targetUserId, action: "up"|"down"|"withdraw" } → голос; withdraw снимает ваш up/down (−1/+1 к счёту)
 */
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { ensureDtIdForUserId, getUserIdByDtId, resolveAccountId } = require("../account-id");
const { isAdmin, setCors } = require("../api-auth");
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

const RESPECT_SCORE_KEY = "poker_app:respect_score";
const USERNAMES_KEY = "poker_app:visitor_usernames";
const CHAT_DISPLAY_NAMES_KEY = "poker_app:visitor_chat_display_names";
const VOTER_LABEL_MAX = 80;

function respectVotesKey(targetId) {
  return "poker_app:respect_votes:" + targetId;
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

async function migrateLegacyRespectForAccount(accountId, legacyUserId) {
  if (!accountId || !legacyUserId || accountId === legacyUserId) return;
  const legacyScoreRes = await redisPipeline([["HGET", RESPECT_SCORE_KEY, legacyUserId]]);
  const legacyScoreRaw = legacyScoreRes && legacyScoreRes[0] ? legacyScoreRes[0].result : null;
  const legacyScore = parseInt(legacyScoreRaw, 10);
  const legacyVotesKey = respectVotesKey(legacyUserId);
  const legacyVotesRes = await redisPipeline([["HGETALL", legacyVotesKey]]);
  const legacyVotesRaw = legacyVotesRes && legacyVotesRes[0] ? legacyVotesRes[0].result : null;
  const commands = [];
  if (Number.isFinite(legacyScore) && legacyScore !== 0) {
    commands.push(["HSET", RESPECT_SCORE_KEY, accountId, legacyScore]);
    commands.push(["HDEL", RESPECT_SCORE_KEY, legacyUserId]);
  }
  if (Array.isArray(legacyVotesRaw) && legacyVotesRaw.length) {
    for (let i = 0; i < legacyVotesRaw.length; i += 2) {
      const voterId = legacyVotesRaw[i] != null ? String(legacyVotesRaw[i]).trim() : "";
      const vote = legacyVotesRaw[i + 1] != null ? String(legacyVotesRaw[i + 1]).trim() : "";
      if (!voterId || (vote !== "up" && vote !== "down")) continue;
      const voterAccountId = await resolveAccountId(voterId);
      if (!voterAccountId) continue;
      commands.push(["HSET", respectVotesKey(accountId), voterAccountId, vote]);
    }
    commands.push(["DEL", legacyVotesKey]);
  }
  if (commands.length) await redisPipeline(commands);
}

module.exports = async function handler(req, res) {
  setCors(res, "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") return res.status(200).end();

  let bodyPre = {};
  if (req.method === "POST") {
    try {
      bodyPre = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    } catch (e) {
      bodyPre = {};
    }
  }
  const identity = resolveTelegramIdentity(req, bodyPre, BOT_TOKEN);
  if (!identity) return res.status(401).json({ ok: false, error: "Откройте в Telegram или войдите через сайт" });
  const myId = memberIdFromIdentity(identity);
  if (!myId) return res.status(401).json({ ok: false, error: "Не удалось определить пользователя" });
  const myAccountId = await ensureDtIdForUserId(myId);
  if (!myAccountId) return res.status(500).json({ ok: false, error: "Не удалось подготовить ID аккаунта" });

  if (req.method === "POST") {
    let body;
    try {
      body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    } catch (e) {
      return res.status(400).json({ ok: false, error: "Invalid JSON" });
    }
    const targetUserId = await resolveAccountId(body.targetUserId || "");
    const action = (body.action || "").toLowerCase();
    if (!targetUserId) {
      return res.status(400).json({ ok: false, error: "Нужен targetUserId" });
    }
    if (action !== "up" && action !== "down" && action !== "withdraw") {
      return res.status(400).json({ ok: false, error: "action: up, down или withdraw" });
    }
    if (targetUserId === myAccountId) return res.status(400).json({ ok: false, error: "Нельзя голосовать за себя" });
    if (!REDIS_URL || !REDIS_TOKEN) return res.status(500).json({ ok: false, error: "Сервер не настроен" });

    const votesKey = respectVotesKey(targetUserId);
    const currentResult = await redisPipeline([["HGET", votesKey, myAccountId]]);
    const current = currentResult && currentResult[0] && currentResult[0].result ? String(currentResult[0].result).trim() : null;

    if (action === "withdraw") {
      if (!current || (current !== "up" && current !== "down")) {
        return res.status(400).json({ ok: false, error: "no_vote" });
      }
      const delta = current === "up" ? -1 : 1;
      const pipeResult = await redisPipeline([
        ["HINCRBY", RESPECT_SCORE_KEY, targetUserId, delta],
        ["HDEL", votesKey, myAccountId],
      ]);
      if (!pipeResult || !Array.isArray(pipeResult) || !pipeResult[0] || pipeResult[0].error) {
        return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
      }
      const score = parseInt(pipeResult[0].result, 10);
      return res.status(200).json({ ok: true, score: Number.isNaN(score) ? 0 : score, myVote: null });
    }

    if (action === "up") {
      if (current === "up") return res.status(400).json({ ok: false, error: "already_raised" });
      const delta = current === "down" ? 2 : 1;
      const pipeResult = await redisPipeline([
        ["HINCRBY", RESPECT_SCORE_KEY, targetUserId, delta],
        ["HSET", votesKey, myAccountId, "up"],
      ]);
      if (!pipeResult || !Array.isArray(pipeResult) || !pipeResult[0] || pipeResult[0].error) {
        return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
      }
      const score = parseInt(pipeResult[0].result, 10);
      return res.status(200).json({ ok: true, score: Number.isNaN(score) ? 0 : score, myVote: "up" });
    }
    if (action === "down") {
      if (current === "down") return res.status(400).json({ ok: false, error: "already_lowered" });
      const delta = current === "up" ? -2 : -1;
      const pipeResult = await redisPipeline([
        ["HINCRBY", RESPECT_SCORE_KEY, targetUserId, delta],
        ["HSET", votesKey, myAccountId, "down"],
      ]);
      if (!pipeResult || !Array.isArray(pipeResult) || !pipeResult[0] || pipeResult[0].error) {
        return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
      }
      const score = parseInt(pipeResult[0].result, 10);
      return res.status(200).json({ ok: true, score: Number.isNaN(score) ? 0 : score, myVote: "down" });
    }
  }

  if (req.method !== "GET") return res.status(405).json({ ok: false, error: "GET only" });
  if (!REDIS_URL || !REDIS_TOKEN) return res.status(500).json({ ok: false, error: "Redis not configured" });

  const targetUserId = await resolveAccountId(req.query.userId || "");
  const withList = req.query.list === "1" || req.query.list === "true";

  if (targetUserId) {
    const targetLegacyUserId = await getUserIdByDtId(targetUserId);
    await migrateLegacyRespectForAccount(targetUserId, targetLegacyUserId);
    const canViewVoters = targetUserId === myAccountId || isAdmin(myId);
    if (withList && !canViewVoters) {
      return res.status(403).json({
        ok: false,
        error: "respect_voters_forbidden",
        canViewVoters: false,
      });
    }
    const commands = [
      ["HGET", RESPECT_SCORE_KEY, targetUserId],
      ["HGET", respectVotesKey(targetUserId), myAccountId],
    ];
    if (withList) commands.push(["HGETALL", respectVotesKey(targetUserId)]);
    const results = await redisPipeline(commands);
    const scoreRaw = results && results[0] && results[0].result != null ? results[0].result : 0;
    const score = parseInt(scoreRaw, 10) || 0;
    const myVoteRaw = results && results[1] && results[1].result ? String(results[1].result).trim() : null;
    const myVote = myVoteRaw === "up" || myVoteRaw === "down" ? myVoteRaw : null;
    const payload = { ok: true, score, myVote };
    if (withList) payload.canViewVoters = true;
    if (withList && results && results[2]) {
      const raw = results[2].result;
      const up = [];
      const down = [];
      if (Array.isArray(raw)) {
        for (let i = 0; i < raw.length - 1; i += 2) {
          const voterId = String(raw[i] || "").trim();
          const vote = String(raw[i + 1] || "").trim();
          if (voterId && vote === "up") up.push(voterId);
          else if (voterId && vote === "down") down.push(voterId);
        }
      } else if (raw && typeof raw === "object" && !Array.isArray(raw)) {
        for (const [voterId, vote] of Object.entries(raw)) {
          const v = String(vote || "").trim();
          if (v === "up") up.push(voterId);
          else if (v === "down") down.push(voterId);
        }
      }
      payload.up = up;
      payload.down = down;
      const allVoterIds = [...new Set([...up, ...down])];
      if (allVoterIds.length > 0) {
        const voterChatIds = await Promise.all(
          allVoterIds.map(async function (voterAccountId) {
            return (await getUserIdByDtId(voterAccountId)) || "";
          })
        );
        const dispRes = await redisPipeline([
          ["HMGET", CHAT_DISPLAY_NAMES_KEY, ...allVoterIds],
          ["HMGET", USERNAMES_KEY, ...voterChatIds],
        ]);
        const chatRow =
          dispRes && dispRes[0] && Array.isArray(dispRes[0].result) ? dispRes[0].result : [];
        const userRow =
          dispRes && dispRes[1] && Array.isArray(dispRes[1].result) ? dispRes[1].result : [];
        const voterDisplay = {};
        allVoterIds.forEach((vid, idx) => {
          const rawCn = chatRow[idx];
          const cn =
            rawCn != null && rawCn !== false
              ? String(rawCn)
                  .trim()
                  .replace(/[\u0000-\u001f\u007f]/g, "")
                  .slice(0, VOTER_LABEL_MAX)
              : "";
          const rawUn = userRow[idx];
          const un =
            rawUn != null && rawUn !== false ? String(rawUn).trim().replace(/^@+/, "") : "";
          if (cn) voterDisplay[vid] = cn;
          else if (un) voterDisplay[vid] = "@" + un;
          else voterDisplay[vid] = vid;
        });
        payload.voterDisplay = voterDisplay;
      }
    }
    return res.status(200).json(payload);
  }

  await migrateLegacyRespectForAccount(myAccountId, myId);
  const results = await redisPipeline([["HGET", RESPECT_SCORE_KEY, myAccountId]]);
  const scoreRaw = results && results[0] && results[0].result != null ? results[0].result : 0;
  const score = parseInt(scoreRaw, 10) || 0;
  return res.status(200).json({ ok: true, score });
};
