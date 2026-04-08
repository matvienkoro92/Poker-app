/**
 * Пользователи: dtId (мой ID), поиск по ID и по нику (Telegram username).
 * GET ?initData= → dtId (и обновление сохранённого username из Telegram)
 * GET ?initData=&id=ID123456 → userId, userName для личного чата
 * GET ?initData=&username=xxx → userId, userName по нику (без @ или с @)
 */
const crypto = require("crypto");
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { guestMemberIdFromDeviceId } = require("../guest-member-id");
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const DT_IDS_KEY = "poker_app:visitor_dt_ids";
const P21_IDS_KEY = "poker_app:visitor_p21_ids";
const ID_TO_USER_KEY = "poker_app:id_to_user";
const USERNAMES_KEY = "poker_app:visitor_usernames";
const PERSONAL_KEY = "poker_app:visitor_personal";
const FRIENDS_KEY_PREFIX = "poker_app:friends:";
const FRIEND_ALIAS_KEY_PREFIX = "poker_app:friend_alias:";
const FRIEND_CONTACT_NAME_MAX = 80;
const CHAT_DISPLAY_NAMES_KEY = "poker_app:visitor_chat_display_names";
const CHAT_DISPLAY_NAME_MAX = 80;

function sanitizeChatDisplayName(raw) {
  const s = String(raw || "")
    .trim()
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .slice(0, CHAT_DISPLAY_NAME_MAX);
  return s;
}

function generateUserId() {
  return "ID" + String(Math.floor(100000 + Math.random() * 900000));
}

function getUsernameFromInitData(initData) {
  if (!initData || !BOT_TOKEN) return null;
  try {
    const params = new URLSearchParams(initData);
    const hash = params.get("hash");
    params.delete("hash");
    const dataCheckString = [...params.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => k + "=" + v)
      .join("\n");
    const secretKey = crypto.createHmac("sha256", "WebAppData").update(BOT_TOKEN).digest();
    const calculatedHash = crypto.createHmac("sha256", secretKey).update(dataCheckString).digest("hex");
    if (calculatedHash !== hash) return null;
    const user = JSON.parse(params.get("user") || "{}");
    return (user.username || "").trim() || null;
  } catch (e) {
    return null;
  }
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
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  let body = {};
  if (req.method === "POST") {
    try {
      body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    } catch (e) {
      return res.status(400).json({ ok: false, error: "Invalid JSON" });
    }
  }

  const identity = resolveTelegramIdentity(req, body, BOT_TOKEN);
  let myId = identity ? memberIdFromIdentity(identity) : null;
  if (!myId) {
    const gd = (req.query.guestDeviceId || req.query.guest_device_id || body.guestDeviceId || body.guest_device_id || "").trim();
    myId = guestMemberIdFromDeviceId(gd);
  }
  if (!myId) return res.status(401).json({ ok: false, error: "Откройте в Telegram или войдите через сайт" });

  // POST: сохранить P21 ID и/или personal (информация для других)
  if (req.method === "POST") {
    if (!REDIS_URL || !REDIS_TOKEN) return res.status(500).json({ ok: false, error: "Сервер не настроен" });
    const safeId = myId;
    const commands = [];

    if (body.p21Id !== undefined) {
      let p21Id = (body.p21Id != null ? String(body.p21Id) : "").trim().replace(/\D/g, "").slice(0, 6);
      if (p21Id.length !== 0 && p21Id.length !== 6) return res.status(400).json({ ok: false, error: "Введите 6 цифр или оставьте поле пустым" });
      if (p21Id.length === 6) commands.push(["HSET", P21_IDS_KEY, safeId, p21Id]);
      else commands.push(["HDEL", P21_IDS_KEY, safeId]);
    }

    if (body.personalInfo !== undefined) {
      const personal = String(body.personalInfo || "").trim().slice(0, 500);
      if (personal) commands.push(["HSET", PERSONAL_KEY, safeId, personal]);
      else commands.push(["HDEL", PERSONAL_KEY, safeId]);
    }

    if (body.chatDisplayName !== undefined) {
      const disp = sanitizeChatDisplayName(body.chatDisplayName);
      if (disp) commands.push(["HSET", CHAT_DISPLAY_NAMES_KEY, safeId, disp]);
      else commands.push(["HDEL", CHAT_DISPLAY_NAMES_KEY, safeId]);
    }

    if (commands.length) {
      const pipeResult = await redisPipeline(commands);
      if (!pipeResult) return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
    }
    return res.status(200).json({ ok: true });
  }

  if (req.method !== "GET") return res.status(405).json({ ok: false, error: "GET only" });

  const searchId = (req.query.id || req.query.dtId || "").trim().toUpperCase();
  const searchUserId = (req.query.userId || "").trim();

  if (!REDIS_URL || !REDIS_TOKEN) {
    return res.status(500).json({ ok: false, error: "Redis not configured" });
  }

  // GET ?userId=tg_xxx | vk_xxx — публичная карточка пользователя (имя, P21, personal, isFriend)
  if (searchUserId && (searchUserId.startsWith("tg_") || searchUserId.startsWith("vk_"))) {
    const targetId = searchUserId;
    if (targetId === myId) return res.status(400).json({ ok: false, error: "Свой профиль" });
    const results = await redisPipeline([
      ["HGET", USERNAMES_KEY, targetId],
      ["HGET", P21_IDS_KEY, targetId],
      ["HGET", PERSONAL_KEY, targetId],
      ["SISMEMBER", FRIENDS_KEY_PREFIX + myId, targetId],
      ["HGET", FRIEND_ALIAS_KEY_PREFIX + myId, targetId],
      ["HGET", CHAT_DISPLAY_NAMES_KEY, targetId],
    ]);
    let userName = targetId;
    const un = results && results[0] && results[0].result ? String(results[0].result).trim() : "";
    if (un) userName = "@" + un;
    const p21Id = results && results[1] && results[1].result ? String(results[1].result).trim() : null;
    const personalInfo = results && results[2] && results[2].result ? String(results[2].result).trim() : null;
    const isFriend = results && results[3] && results[3].result === 1;
    let contactName = null;
    if (isFriend && results && results[4] && results[4].result != null && results[4].result !== false) {
      const cn = String(results[4].result)
        .trim()
        .replace(/[\u0000-\u001f\u007f]/g, "")
        .slice(0, FRIEND_CONTACT_NAME_MAX);
      if (cn) contactName = cn;
    }
    let chatDisplayName = null;
    if (results && results[5] && results[5].result != null && results[5].result !== false) {
      const cd = sanitizeChatDisplayName(results[5].result);
      if (cd) chatDisplayName = cd;
    }
    const payload = {
      ok: true,
      userId: targetId,
      userName,
      p21Id: p21Id || null,
      personalInfo: personalInfo || null,
      isFriend: !!isFriend,
    };
    if (contactName) payload.contactName = contactName;
    if (chatDisplayName) payload.chatDisplayName = chatDisplayName;
    return res.status(200).json(payload);
  }

  // Поиск по ID (ID123456)
  if (searchId && /^ID\d{6}$/.test(searchId)) {
    const results = await redisPipeline([
      ["HGET", ID_TO_USER_KEY, searchId],
      ["HGETALL", USERNAMES_KEY],
    ]);
    const userId = results && results[0] && results[0].result ? String(results[0].result).trim() : null;
    if (!userId) return res.status(404).json({ ok: false, error: "Пользователь с таким ID не найден" });

    if (userId === myId) return res.status(400).json({ ok: false, error: "Нельзя написать себе" });

    let userName = userId;
    const usernamesRaw = results[1]?.result;
    if (Array.isArray(usernamesRaw)) {
      for (let i = 0; i < usernamesRaw.length; i += 2) {
        if (usernamesRaw[i] === userId && usernamesRaw[i + 1]) {
          userName = "@" + String(usernamesRaw[i + 1]).trim();
          break;
        }
      }
    }
    const res2 = await redisPipeline([
      ["HGET", P21_IDS_KEY, userId],
      ["HGET", PERSONAL_KEY, userId],
      ["HGET", CHAT_DISPLAY_NAMES_KEY, userId],
    ]);
    const p21Id = res2 && res2[0] && res2[0].result ? String(res2[0].result).trim() : null;
    const personalInfo = res2 && res2[1] && res2[1].result ? String(res2[1].result).trim() : null;
    const chatDispRaw = res2 && res2[2] && res2[2].result;
    const chatDisplayName = chatDispRaw != null ? sanitizeChatDisplayName(chatDispRaw) : "";
    const payload = { ok: true, userId, userName };
    if (p21Id) payload.p21Id = p21Id;
    if (personalInfo) payload.personalInfo = personalInfo;
    if (chatDisplayName) payload.chatDisplayName = chatDisplayName;
    return res.status(200).json(payload);
  }

  // Подсказки по префиксу ника: ?username=prefix&suggest=1 → список до 15 пользователей
  const suggestPrefix = (req.query.username || req.query.nick || "").trim().replace(/^@/, "").toLowerCase();
  const suggestMode = req.query.suggest === "1" || req.query.suggest === "true";
  if (suggestMode && suggestPrefix.length >= 1) {
    const usernamesAll = await redisPipeline([["HGETALL", USERNAMES_KEY]]);
    const usernamesRaw = usernamesAll && usernamesAll[0] && usernamesAll[0].result;
    const suggestions = [];
    if (Array.isArray(usernamesRaw)) {
      for (let i = 0; i < usernamesRaw.length; i += 2) {
        const uid = String(usernamesRaw[i] || "").trim();
        if (uid === myId) continue;
        const u = String(usernamesRaw[i + 1] || "").trim().toLowerCase();
        if (u && u.startsWith(suggestPrefix)) {
          const userName = String(usernamesRaw[i + 1] || "").trim();
          suggestions.push({ userId: uid, userName: userName ? "@" + userName : uid });
          if (suggestions.length >= 15) break;
        }
      }
    }
    return res.status(200).json({ ok: true, suggestions });
  }

  // Поиск по нику (Telegram username): ?username=nick или ?username=@nick
  const searchUsername = (req.query.username || req.query.nick || "").trim().replace(/^@/, "").toLowerCase();
  if (searchUsername) {
    const usernamesAll = await redisPipeline([["HGETALL", USERNAMES_KEY]]);
    const usernamesRaw = usernamesAll && usernamesAll[0] && usernamesAll[0].result;
    let userId = null;
    let matchedUsername = null;
    if (Array.isArray(usernamesRaw)) {
      for (let i = 0; i < usernamesRaw.length; i += 2) {
        const u = String(usernamesRaw[i + 1] || "").trim().toLowerCase();
        if (u === searchUsername) {
          userId = String(usernamesRaw[i]).trim();
          matchedUsername = usernamesRaw[i + 1] ? String(usernamesRaw[i + 1]).trim() : null;
          break;
        }
      }
    }
    if (!userId) return res.status(404).json({ ok: false, error: "Пользователь с таким ником не найден" });

    if (userId === myId) return res.status(400).json({ ok: false, error: "Нельзя написать себе" });

    const userName = matchedUsername ? "@" + matchedUsername : userId;
    const dtRes = await redisPipeline([["HGET", DT_IDS_KEY, userId]]);
    const dtId = dtRes && dtRes[0] && dtRes[0].result ? String(dtRes[0].result).trim() : null;
    const res2 = await redisPipeline([
      ["HGET", P21_IDS_KEY, userId],
      ["HGET", PERSONAL_KEY, userId],
      ["HGET", CHAT_DISPLAY_NAMES_KEY, userId],
    ]);
    const p21Id = res2 && res2[0] && res2[0].result ? String(res2[0].result).trim() : null;
    const personalInfo = res2 && res2[1] && res2[1].result ? String(res2[1].result).trim() : null;
    const chatDispRaw2 = res2 && res2[2] && res2[2].result;
    const chatDisplayName2 = chatDispRaw2 != null ? sanitizeChatDisplayName(chatDispRaw2) : "";
    const payload = { ok: true, userId, userName };
    if (dtId) payload.dtId = dtId;
    if (p21Id) payload.p21Id = p21Id;
    if (personalInfo) payload.personalInfo = personalInfo;
    if (chatDisplayName2) payload.chatDisplayName = chatDisplayName2;
    return res.status(200).json(payload);
  }

  // Мой dtId, p21Id и personal (при запросе обновляем сохранённый username из Telegram)
  const safeId = myId;
  const telegramUsername = identity
    ? getUsernameFromInitData(identity.rawInitData || "") || identity.pwaUsername || null
    : null;
  if (telegramUsername) {
    await redisPipeline([["HSET", USERNAMES_KEY, safeId, telegramUsername]]);
  }
  const results = await redisPipeline([
    ["HGET", DT_IDS_KEY, safeId],
    ["HGET", P21_IDS_KEY, safeId],
    ["HGET", PERSONAL_KEY, safeId],
    ["HGET", CHAT_DISPLAY_NAMES_KEY, safeId],
  ]);
  let dtId = results && results[0] && results[0].result ? String(results[0].result).trim() : null;
  let p21Id = results && results[1] && results[1].result ? String(results[1].result).trim() : null;
  if (p21Id === "") p21Id = null;
  const personalInfo = results && results[2] && results[2].result ? String(results[2].result).trim() : null;
  const chatDispSelfRaw = results && results[3] && results[3].result;
  const chatDisplayNameSelf = chatDispSelfRaw != null ? sanitizeChatDisplayName(chatDispSelfRaw) : "";
  const needsNewId = !dtId || /^DT#\d+$/.test(dtId);
  if (needsNewId) {
    for (let i = 0; i < 10; i++) {
      dtId = generateUserId();
      const exists = await redisPipeline([["HGET", ID_TO_USER_KEY, dtId]]);
      const taken = exists && exists[0] && exists[0].result;
      if (!taken) {
        await redisPipeline([
          ["HSET", DT_IDS_KEY, safeId, dtId],
          ["HSET", ID_TO_USER_KEY, dtId, safeId],
        ]);
        break;
      }
    }
  }

  const payload = { ok: true, dtId };
  if (p21Id) payload.p21Id = p21Id;
  if (personalInfo) payload.personalInfo = personalInfo;
  if (chatDisplayNameSelf) payload.chatDisplayName = chatDisplayNameSelf;
  return res.status(200).json(payload);
};
