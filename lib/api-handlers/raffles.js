/**
 * Розыгрыши: создание (админ), участие (по PokerPlus ID), жеребьёвка по времени.
 * Redis: poker_app:raffle_ids (list), poker_app:raffle:{id} (JSON).
 */
const crypto = require("crypto");
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { guestMemberIdFromDeviceId } = require("../guest-member-id");
const { ensureDtIdForUserId } = require("../account-id");
const { ADMIN_IDS, isAdmin, isAdminIdentity } = require("../api-auth");
const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const RAFFLE_IDS_KEY = "poker_app:raffle_ids";
const RAFFLE_PREFIX = "poker_app:raffle:";
const RAFFLE_IPS_PREFIX = "poker_app:raffle_ips:";
const RAFFLE_DEVICES_PREFIX = "poker_app:raffle_devices:";
const P21_IDS_KEY = "poker_app:visitor_p21_ids";
const POKERPLUS_BIND_HASH_KEY = "poker_app:pokerplus_user_ids";
/** То же, что users.js / chat.js: имя в чате и актуальный @username из бота. */
const CHAT_DISPLAY_NAMES_KEY = "poker_app:visitor_chat_display_names";
const USERNAMES_KEY = "poker_app:visitor_usernames";
const CHAT_DISPLAY_NAME_MAX = 80;
const RAFFLE_CHANNEL = process.env.RAFFLE_CHANNEL || "@dva_tuza_club";
const CRON_SECRET = process.env.CRON_SECRET;
const GENERAL_CHAT_KEY = "poker_app:chat_messages";
const MAX_CHAT_MESSAGES = 100;
/** Идемпотентность POST create: один ключ клиента — один розыгрыш и одно сообщение в общий чат */
const RAFFLE_CREATE_IDEM_PREFIX = "poker_app:raffle_create_idem:";
const MINI_APP_URL = process.env.MINI_APP_URL || process.env.APP_URL || "";
const { triggerGeneralChatWebPushFromStoredMessage } = require("../chat-webpush-notify");
const {
  buildStoredRaffle,
  deriveDuplicateEndDateIso,
  getClientIp,
  normalizeRaffleGroups,
  raffleParticipantAccountId,
  runDraw,
} = require("../raffle-core");
const { createRaffleNotificationService } = require("../raffle-notifications");
const { notifyAdminsRaffleCompleted, notifyWinnersRaffleCompleted } = createRaffleNotificationService({
  botToken: BOT_TOKEN,
  adminIds: ADMIN_IDS,
  miniAppUrl: MINI_APP_URL,
  rafflePrefix: RAFFLE_PREFIX,
  redisPipeline,
});

async function isChannelSubscriber(telegramUserId, botToken) {
  if (!botToken || !telegramUserId) return false;
  try {
    const chatId = encodeURIComponent(RAFFLE_CHANNEL);
    const userId = String(telegramUserId).replace(/^tg_/, "");
    const res = await fetch(
      `https://api.telegram.org/bot${botToken}/getChatMember?chat_id=${chatId}&user_id=${userId}`
    );
    const data = await res.json();
    const status = data.result && data.result.status ? String(data.result.status) : "";
    return ["member", "administrator", "creator"].includes(status);
  } catch (e) {
    return false;
  }
}

async function persistCreatedRaffle(raffle, idemRedisKey) {
  const results = await redisPipeline([
    ["RPUSH", RAFFLE_IDS_KEY, raffle.id],
    ["SET", RAFFLE_PREFIX + raffle.id, JSON.stringify(raffle)],
  ]);
  if (!results || results.some((r) => r && r.error)) {
    if (idemRedisKey) await redisPipeline([["DEL", idemRedisKey]]);
    return { ok: false, error: "Ошибка создания" };
  }

  const baseAppUrl = MINI_APP_URL ? String(MINI_APP_URL).replace(/\/$/, "") : "";
  const raffleLink = baseAppUrl
    ? (baseAppUrl.includes("?") ? baseAppUrl + "&" : baseAppUrl + "?") + "startapp=raffles"
    : "";
  const raffleTitle = (raffle.title || (raffle.groups && raffle.groups[0] && raffle.groups[0].prize) || "Розыгрыш").trim();
  const chatText = raffleLink
    ? "🎲 Новый розыгрыш!\n\n" + (raffleTitle ? raffleTitle + "\n\n" : "") + "Участвуй: " + raffleLink
    : "🎲 Новый розыгрыш!\n\n" + (raffleTitle || "Участвуй в разделе «Розыгрыши» в приложении.");
  const clubMsg = {
    id: "msg_raffle_club_" + raffle.id,
    from: "club",
    fromName: "Клуб «Два туза»",
    text: chatText,
    time: new Date().toISOString(),
  };
  const clubChatPipe = await redisPipeline([
    ["LPUSH", GENERAL_CHAT_KEY, JSON.stringify(clubMsg)],
    ["LTRIM", GENERAL_CHAT_KEY, "0", String(MAX_CHAT_MESSAGES - 1)],
  ]);
  if (clubChatPipe && !clubChatPipe.some((r) => r && r.error)) {
    try {
      await triggerGeneralChatWebPushFromStoredMessage(clubMsg);
    } catch (ePush) {
      console.error("[raffles] triggerGeneralChatWebPushFromStoredMessage", ePush && ePush.message ? ePush.message : ePush);
    }
  }

  if (idemRedisKey) {
    try {
      await redisPipeline([["SET", idemRedisKey, JSON.stringify({ raffle }), "EX", "86400"]]);
    } catch (eIdem) {}
  }
  return { ok: true, raffle };
}

async function loadLastStoredRaffle() {
  const idsRes = await redisPipeline([["LRANGE", RAFFLE_IDS_KEY, "-20", "-1"]]);
  const ids = idsRes && idsRes[0] && Array.isArray(idsRes[0].result) ? idsRes[0].result : [];
  if (!ids.length) return null;
  const latestIds = ids.slice().reverse().filter(Boolean);
  const getRes = await redisPipeline(latestIds.map((id) => ["GET", RAFFLE_PREFIX + String(id)]));
  if (!getRes) return null;
  for (let i = 0; i < getRes.length; i++) {
    const raw = getRes[i] && getRes[i].result;
    if (!raw) continue;
    try {
      const raffle = JSON.parse(raw);
      if (raffle && raffle.id) return raffle;
    } catch (e) {}
  }
  return null;
}

function sanitizeDispRaffleStored(raw) {
  if (raw == null || raw === false) return "";
  return String(raw)
    .trim()
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .slice(0, CHAT_DISPLAY_NAME_MAX);
}

/**
 * Подставляет имена из Redis для старых участников с «Участник» / пустым именем (как при join).
 * Возвращает { raffle, changed } — при changed нужно SET в Redis.
 */
async function hydrateRaffleParticipantNamesFromRedis(raffle) {
  if (!raffle || !redisConfigured()) return { raffle, changed: false };
  const ids = new Set();
  (raffle.participants || []).forEach(function (p) {
    if (p && p.userId) ids.add(String(p.userId));
  });
  (raffle.winners || []).forEach(function (w) {
    if (w && w.userId) ids.add(String(w.userId));
  });
  const uidList = [...ids].filter(Boolean);
  if (!uidList.length) return { raffle, changed: false };

  const res = await redisPipeline([
    ["HMGET", CHAT_DISPLAY_NAMES_KEY, ...uidList],
    ["HMGET", USERNAMES_KEY, ...uidList],
  ]);
  const dispRow = res && res[0] && Array.isArray(res[0].result) ? res[0].result : [];
  const unRow = res && res[1] && Array.isArray(res[1].result) ? res[1].result : [];
  const dispMap = {};
  const unMap = {};
  uidList.forEach(function (uid, i) {
    dispMap[uid] = sanitizeDispRaffleStored(dispRow[i]);
    const rawU = unRow[i];
    unMap[uid] = rawU != null && rawU !== false ? String(rawU).trim().replace(/^@+/g, "") : "";
  });

  function nameFromRedis(uid) {
    const d = dispMap[uid];
    if (d) return d;
    const u = unMap[uid] || "";
    if (u) return "@" + u;
    return null;
  }

  let changed = false;
  function bump(row) {
    if (!row || !row.userId) return;
    const uid = String(row.userId);
    const old = String(row.name || "").trim();
    if (old && old !== "Участник") return;
    const nm = nameFromRedis(uid);
    if (nm && nm !== old) {
      row.name = nm;
      changed = true;
    }
  }
  (raffle.participants || []).forEach(bump);
  (raffle.winners || []).forEach(bump);
  function attachTgLogin(row) {
    if (!row || !row.userId) return;
    const uid = String(row.userId);
    if (uid.indexOf("tg_") !== 0) {
      try {
        delete row.telegramUsername;
      } catch (eDel) {}
      return;
    }
    const u = (unMap[uid] || "").trim();
    if (u) row.telegramUsername = u;
    else {
      try {
        delete row.telegramUsername;
      } catch (eDel2) {}
    }
  }
  (raffle.participants || []).forEach(attachTgLogin);
  (raffle.winners || []).forEach(attachTgLogin);
  return { raffle, changed };
}

async function hydrateRafflesParticipantNamesFromRedis(raffles) {
  if (!Array.isArray(raffles) || raffles.length === 0 || !redisConfigured()) {
    return { raffles: raffles || [], changedIds: [] };
  }
  const ids = new Set();
  raffles.forEach(function (raffle) {
    (raffle && raffle.participants ? raffle.participants : []).forEach(function (p) {
      if (p && p.userId) ids.add(String(p.userId));
    });
    (raffle && raffle.winners ? raffle.winners : []).forEach(function (w) {
      if (w && w.userId) ids.add(String(w.userId));
    });
  });
  const uidList = [...ids].filter(Boolean);
  if (!uidList.length) return { raffles, changedIds: [] };

  const res = await redisPipeline([
    ["HMGET", CHAT_DISPLAY_NAMES_KEY, ...uidList],
    ["HMGET", USERNAMES_KEY, ...uidList],
  ]);
  const dispRow = res && res[0] && Array.isArray(res[0].result) ? res[0].result : [];
  const unRow = res && res[1] && Array.isArray(res[1].result) ? res[1].result : [];
  const dispMap = {};
  const unMap = {};
  uidList.forEach(function (uid, i) {
    dispMap[uid] = sanitizeDispRaffleStored(dispRow[i]);
    const rawU = unRow[i];
    unMap[uid] = rawU != null && rawU !== false ? String(rawU).trim().replace(/^@+/g, "") : "";
  });

  function nameFromRedis(uid) {
    const d = dispMap[uid];
    if (d) return d;
    const u = unMap[uid] || "";
    if (u) return "@" + u;
    return null;
  }

  const changedIds = [];
  raffles.forEach(function (raffle) {
    if (!raffle || !raffle.id) return;
    let changed = false;
    function bump(row) {
      if (!row || !row.userId) return;
      const uid = String(row.userId);
      const old = String(row.name || "").trim();
      if (!old || old === "Участник") {
        const nm = nameFromRedis(uid);
        if (nm && nm !== old) {
          row.name = nm;
          changed = true;
        }
      }
      if (uid.indexOf("tg_") === 0) {
        const u = (unMap[uid] || "").trim();
        if (u) row.telegramUsername = u;
        else if (row.telegramUsername) {
          delete row.telegramUsername;
          changed = true;
        }
      } else if (row.telegramUsername) {
        delete row.telegramUsername;
        changed = true;
      }
    }
    (raffle.participants || []).forEach(bump);
    (raffle.winners || []).forEach(bump);
    if (changed) changedIds.push(String(raffle.id));
  });
  return { raffles, changedIds };
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Cron-Secret");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  let body = {};
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch (e) {}

  const cronAuth = req.headers["x-cron-secret"] || req.query.secret || (req.headers["authorization"] || "").replace(/^Bearer\s+/i, "");
  const isCronCreate = req.method === "POST" && (body.action || req.query.action) === "create" && CRON_SECRET && cronAuth === CRON_SECRET;

  const identity = isCronCreate ? null : resolveTelegramIdentity(req, body, BOT_TOKEN);
  let myId = null;
  if (isCronCreate) {
    myId = "cron";
  } else if (identity) {
    myId = memberIdFromIdentity(identity);
  } else {
    const gd = (
      req.query.guestDeviceId ||
      req.query.guest_device_id ||
      body.guestDeviceId ||
      body.guest_device_id ||
      ""
    ).trim();
    const gid = guestMemberIdFromDeviceId(gd);
    if (gid) myId = gid;
  }
  if (!isCronCreate && !myId) {
    return res.status(401).json({ ok: false, error: "Откройте в Telegram, войдите через сайт или откройте раздел как гость с этого устройства" });
  }
  const admin = isCronCreate || !!(identity && myId && isAdminIdentity(identity, myId));

  if (!redisConfigured()) {
    return res.status(500).json({ ok: false, error: "Сервер не настроен" });
  }

  // POST: создать розыгрыш (админ) или участвовать (join)
  if (req.method === "POST") {
    const action = body.action || req.query.action || "join";

    if (action === "create") {
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      const idemRaw = (body.createIdempotencyKey || body.idempotencyKey || "").trim().slice(0, 128);
      let idemRedisKey = null;
      if (idemRaw && myId) {
        idemRedisKey =
          RAFFLE_CREATE_IDEM_PREFIX + crypto.createHash("sha256").update(String(myId) + "\n" + idemRaw).digest("hex");
        const prevRes = await redisPipeline([["GET", idemRedisKey]]);
        const prevStr = prevRes && prevRes[0] && prevRes[0].result != null ? String(prevRes[0].result) : "";
        if (prevStr) {
          if (prevStr === "__pending__") {
            return res.status(409).json({
              ok: false,
              error: "Создание розыгрыша уже выполняется. Подождите несколько секунд.",
            });
          }
          try {
            const prev = JSON.parse(prevStr);
            if (prev && prev.raffle && prev.raffle.id) {
              return res.status(200).json({ ok: true, raffle: prev.raffle, idempotentReplay: true });
            }
          } catch (e1) {}
        }
        const claimRes = await redisPipeline([["SET", idemRedisKey, "__pending__", "NX", "EX", "120"]]);
        const cr0 = claimRes && claimRes[0];
        const claimed =
          cr0 &&
          !cr0.error &&
          (cr0.result === "OK" || cr0.result === true || String(cr0.result).toUpperCase() === "OK");
        if (!claimed) {
          const againRes = await redisPipeline([["GET", idemRedisKey]]);
          const againStr = againRes && againRes[0] && againRes[0].result != null ? String(againRes[0].result) : "";
          if (againStr === "__pending__") {
            return res.status(409).json({
              ok: false,
              error: "Создание розыгрыша уже выполняется. Подождите несколько секунд.",
            });
          }
          try {
            const prev2 = JSON.parse(againStr);
            if (prev2 && prev2.raffle && prev2.raffle.id) {
              return res.status(200).json({ ok: true, raffle: prev2.raffle, idempotentReplay: true });
            }
          } catch (e2) {}
          return res.status(409).json({ ok: false, error: "Повторите создание через минуту или обновите страницу." });
        }
      }

      const totalWinners = Math.max(1, Math.min(100, parseInt(body.totalWinners || body.total_winners || "1", 10) || 1));
      const titleRaw = (body.title || body.name || "").trim().slice(0, 200);
      const groups = normalizeRaffleGroups(body.groups, totalWinners);
      const endDateStr = (body.endDate || body.end_date || "").trim();
      const endDate = endDateStr ? new Date(endDateStr) : null;
      if (!endDate || isNaN(endDate.getTime())) {
        return res.status(400).json({ ok: false, error: "Укажите дату завершения (endDate)" });
      }
      const raffle = buildStoredRaffle(myId, titleRaw, totalWinners, groups, endDate.toISOString());
      const created = await persistCreatedRaffle(raffle, idemRedisKey);
      if (!created || !created.ok) {
        return res.status(500).json({ ok: false, error: (created && created.error) || "Ошибка создания" });
      }
      return res.status(200).json({ ok: true, raffle: created.raffle });
    }

    if (action === "duplicateLast") {
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      const idemRaw = (body.createIdempotencyKey || body.idempotencyKey || "").trim().slice(0, 128);
      let idemRedisKey = null;
      if (idemRaw && myId) {
        idemRedisKey =
          RAFFLE_CREATE_IDEM_PREFIX + crypto.createHash("sha256").update(String(myId) + "\n" + idemRaw).digest("hex");
        const prevRes = await redisPipeline([["GET", idemRedisKey]]);
        const prevStr = prevRes && prevRes[0] && prevRes[0].result != null ? String(prevRes[0].result) : "";
        if (prevStr) {
          if (prevStr === "__pending__") {
            return res.status(409).json({ ok: false, error: "Повтор уже выполняется. Подождите несколько секунд." });
          }
          try {
            const prev = JSON.parse(prevStr);
            if (prev && prev.raffle && prev.raffle.id) {
              return res.status(200).json({ ok: true, raffle: prev.raffle, idempotentReplay: true });
            }
          } catch (ePrev) {}
        }
        const claimRes = await redisPipeline([["SET", idemRedisKey, "__pending__", "NX", "EX", "120"]]);
        const cr0 = claimRes && claimRes[0];
        const claimed =
          cr0 &&
          !cr0.error &&
          (cr0.result === "OK" || cr0.result === true || String(cr0.result).toUpperCase() === "OK");
        if (!claimed) {
          return res.status(409).json({ ok: false, error: "Повтор уже выполняется. Подождите несколько секунд." });
        }
      }

      const sourceRaffle = await loadLastStoredRaffle();
      if (!sourceRaffle) {
        if (idemRedisKey) await redisPipeline([["DEL", idemRedisKey]]);
        return res.status(404).json({ ok: false, error: "Нет розыгрыша для повтора" });
      }
      const totalWinners = Math.max(
        1,
        Math.min(
          100,
          parseInt(
            sourceRaffle.totalWinners ||
              (Array.isArray(sourceRaffle.groups)
                ? sourceRaffle.groups.reduce((sum, g) => sum + (parseInt(g && g.count, 10) || 0), 0)
                : 0) ||
              "1",
            10
          ) || 1
        )
      );
      const groups = normalizeRaffleGroups(sourceRaffle.groups, totalWinners);
      const titleRaw = String(sourceRaffle.title || "").trim().slice(0, 200);
      const raffle = buildStoredRaffle(myId, titleRaw, totalWinners, groups, deriveDuplicateEndDateIso(sourceRaffle));
      const created = await persistCreatedRaffle(raffle, idemRedisKey);
      if (!created || !created.ok) {
        return res.status(500).json({ ok: false, error: (created && created.error) || "Ошибка создания" });
      }
      return res.status(200).json({ ok: true, raffle: created.raffle });
    }

    if (action === "complete") {
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      const raffleId = (body.raffleId || body.raffle_id || "").trim();
      if (!raffleId) return res.status(400).json({ ok: false, error: "Укажите raffleId" });

      const getRes = await redisPipeline([["GET", RAFFLE_PREFIX + raffleId]]);
      const raw = getRes && getRes[0] && getRes[0].result;
      if (!raw) return res.status(404).json({ ok: false, error: "Розыгрыш не найден" });
      let raffle;
      try {
        raffle = JSON.parse(raw);
      } catch (e) {
        return res.status(500).json({ ok: false, error: "Ошибка данных" });
      }
      if (raffle.status !== "active") {
        return res.status(400).json({ ok: false, error: "Розыгрыш уже завершён или отменён" });
      }
      raffle = runDraw(raffle);
      const setRes = await redisPipeline([["SET", RAFFLE_PREFIX + raffleId, JSON.stringify(raffle)]]);
      if (!setRes || setRes[0].error) {
        return res.status(500).json({ ok: false, error: "Ошибка записи" });
      }
      notifyAdminsRaffleCompleted(raffle).catch(() => {});
      notifyWinnersRaffleCompleted(raffleId, raffle).catch(() => {});
      return res.status(200).json({ ok: true, raffle });
    }

    if (action === "cancel") {
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      const raffleId = (body.raffleId || body.raffle_id || "").trim();
      if (!raffleId) return res.status(400).json({ ok: false, error: "Укажите raffleId" });

      const getRes = await redisPipeline([["GET", RAFFLE_PREFIX + raffleId]]);
      const raw = getRes && getRes[0] && getRes[0].result;
      if (!raw) return res.status(404).json({ ok: false, error: "Розыгрыш не найден" });
      let raffle;
      try {
        raffle = JSON.parse(raw);
      } catch (e) {
        return res.status(500).json({ ok: false, error: "Ошибка данных" });
      }
      if (raffle.status !== "active") {
        return res.status(400).json({ ok: false, error: "Можно отменить только активный розыгрыш" });
      }
      raffle.status = "cancelled";
      raffle.cancelledAt = new Date().toISOString();
      const setRes = await redisPipeline([["SET", RAFFLE_PREFIX + raffleId, JSON.stringify(raffle)]]);
      if (!setRes || setRes[0].error) {
        return res.status(500).json({ ok: false, error: "Ошибка записи" });
      }
      return res.status(200).json({ ok: true, raffle });
    }

    if (action === "updateEndDate") {
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      const raffleId = (body.raffleId || body.raffle_id || "").trim();
      if (!raffleId) return res.status(400).json({ ok: false, error: "Укажите raffleId" });
      const endDateStr = (body.endDate || body.end_date || "").trim();
      const endDate = endDateStr ? new Date(endDateStr) : null;
      if (!endDate || isNaN(endDate.getTime())) {
        return res.status(400).json({ ok: false, error: "Укажите корректную дату (endDate)" });
      }

      const getRes = await redisPipeline([["GET", RAFFLE_PREFIX + raffleId]]);
      const raw = getRes && getRes[0] && getRes[0].result;
      if (!raw) return res.status(404).json({ ok: false, error: "Розыгрыш не найден" });
      let raffle;
      try {
        raffle = JSON.parse(raw);
      } catch (e) {
        return res.status(500).json({ ok: false, error: "Ошибка данных" });
      }
      if (raffle.status !== "active") {
        return res.status(400).json({ ok: false, error: "Можно менять время только у активного розыгрыша" });
      }
      // Не даём поставить время в прошлом — иначе розыгрыш сразу завершится при следующей загрузке.
      if (endDate <= new Date()) {
        return res.status(400).json({ ok: false, error: "Время итогов должно быть в будущем" });
      }
      raffle.endDate = endDate.toISOString();
      const setRes = await redisPipeline([["SET", RAFFLE_PREFIX + raffleId, JSON.stringify(raffle)]]);
      if (!setRes || setRes[0].error) {
        return res.status(500).json({ ok: false, error: "Ошибка записи" });
      }
      return res.status(200).json({ ok: true, raffle });
    }

    if (action === "setWinnerStatus") {
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      const raffleId = (body.raffleId || body.raffle_id || "").trim();
      const winnerUserId = (body.winnerUserId || body.winner_user_id || "").trim();
      const status = body.status;
      if (!raffleId) return res.status(400).json({ ok: false, error: "Укажите raffleId" });
      if (!winnerUserId) return res.status(400).json({ ok: false, error: "Укажите winnerUserId" });
      const validStatus = status === "ok" || status === "fail" ? status : null;

      const getRes = await redisPipeline([["GET", RAFFLE_PREFIX + raffleId]]);
      const raw = getRes && getRes[0] && getRes[0].result;
      if (!raw) return res.status(404).json({ ok: false, error: "Розыгрыш не найден" });
      let raffle;
      try {
        raffle = JSON.parse(raw);
      } catch (e) {
        return res.status(500).json({ ok: false, error: "Ошибка данных" });
      }
      if (raffle.status !== "drawn" || !raffle.winners || !raffle.winners.length) {
        return res.status(400).json({ ok: false, error: "Розыгрыш не завершён или нет победителей" });
      }
      const winner = raffle.winners.find((w) => w.userId === winnerUserId);
      if (!winner) return res.status(404).json({ ok: false, error: "Победитель не найден" });
      winner.winnerStatus = validStatus;
      const setRes = await redisPipeline([["SET", RAFFLE_PREFIX + raffleId, JSON.stringify(raffle)]]);
      if (!setRes || setRes[0].error) {
        return res.status(500).json({ ok: false, error: "Ошибка записи" });
      }
      return res.status(200).json({ ok: true, raffle });
    }

    if (action === "delete") {
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      const raffleId = (body.raffleId || body.raffle_id || "").trim();
      if (!raffleId) return res.status(400).json({ ok: false, error: "Укажите raffleId" });

      const keys = [
        [ "LREM", RAFFLE_IDS_KEY, "0", raffleId ],
        [ "DEL", RAFFLE_PREFIX + raffleId ],
        [ "DEL", RAFFLE_IPS_PREFIX + raffleId ],
        [ "DEL", RAFFLE_DEVICES_PREFIX + raffleId ],
      ];
      const delRes = await redisPipeline(keys);
      if (!delRes) {
        return res.status(500).json({ ok: false, error: "Ошибка удаления" });
      }
      return res.status(200).json({ ok: true, deleted: true });
    }

    if (action === "join") {
      const raffleId = (body.raffleId || body.raffle_id || "").trim();
      if (!raffleId) return res.status(400).json({ ok: false, error: "Укажите raffleId" });

      const getRes = await redisPipeline([["GET", RAFFLE_PREFIX + raffleId]]);
      const raw = getRes && getRes[0] && getRes[0].result;
      if (!raw) return res.status(404).json({ ok: false, error: "Розыгрыш не найден" });
      let raffle;
      try {
        raffle = JSON.parse(raw);
      } catch (e) {
        return res.status(500).json({ ok: false, error: "Ошибка данных" });
      }
      if (raffle.status !== "active") {
        return res.status(400).json({ ok: false, error: "Розыгрыш завершён" });
      }
      if (new Date(raffle.endDate) <= new Date()) {
        return res.status(400).json({ ok: false, error: "Приём заявок завершён" });
      }
      if (raffle.participants.some((p) => p.userId === myId)) {
        return res.status(200).json({ ok: true, raffle, alreadyJoined: true });
      }

      if (myId.startsWith("guest_")) {
        return res.status(403).json({
          ok: false,
          error: "Чтобы участвовать в розыгрышах, войдите в аккаунт.",
          code: "RAFFLE_LOGIN_REQUIRED",
        });
      }

      const accountId = myId.startsWith("guest_") ? myId : await ensureDtIdForUserId(myId);
      const p21Res = await redisPipeline([
        ["HGET", P21_IDS_KEY, accountId || ""],
        ["HGET", P21_IDS_KEY, myId],
        ["HGET", POKERPLUS_BIND_HASH_KEY, accountId || ""],
        ["HGET", POKERPLUS_BIND_HASH_KEY, myId],
      ]);
      let p21Id = p21Res && p21Res[0] && p21Res[0].result ? String(p21Res[0].result).trim() : null;
      if (!p21Id && p21Res && p21Res[1] && p21Res[1].result) {
        p21Id = String(p21Res[1].result).trim();
      }
      if (!p21Id && p21Res && p21Res[2] && p21Res[2].result) {
        p21Id = String(p21Res[2].result).trim();
      }
      if (!p21Id && p21Res && p21Res[3] && p21Res[3].result) {
        p21Id = String(p21Res[3].result).trim();
      }
      if (!p21Id) {
        return res.status(400).json({
          ok: false,
          error: "Для участия нужен Poker21 ID в профиле.",
          code: "P21_REQUIRED",
        });
      }

      if (raffle.participants.some((p) => raffleParticipantAccountId(p) === accountId)) {
        return res.status(200).json({ ok: true, raffle, alreadyJoined: true });
      }

      const clientIp = getClientIp(req);
      const deviceId = (body.deviceId || body.device_id || "").trim().slice(0, 128) || null;
      const ipsKey = RAFFLE_IPS_PREFIX + raffleId;
      const devicesKey = RAFFLE_DEVICES_PREFIX + raffleId;
      const checkCmds = [];
      if (clientIp) checkCmds.push(["HGET", ipsKey, clientIp]);
      if (deviceId) checkCmds.push(["HGET", devicesKey, deviceId]);
      if (checkCmds.length > 0) {
        const checkRes = await redisPipeline(checkCmds);
        if (checkRes) {
          let idx = 0;
          const ipOwner =
            clientIp && checkRes[idx] && checkRes[idx].result != null && checkRes[idx].result !== false
              ? String(checkRes[idx].result).trim()
              : "";
          if (clientIp && ipOwner && ipOwner !== accountId) {
            return res.status(400).json({
              ok: false,
              error: "С этого IP-адреса уже участвует другой аккаунт в данном розыгрыше.",
              code: "SAME_IP",
            });
          }
          idx += clientIp ? 1 : 0;
          const deviceOwner =
            deviceId && checkRes[idx] && checkRes[idx].result != null && checkRes[idx].result !== false
              ? String(checkRes[idx].result).trim()
              : "";
          if (deviceId && deviceOwner && deviceOwner !== accountId) {
            return res.status(400).json({
              ok: false,
              error: "С этого устройства уже участвует другой аккаунт в данном розыгрыше.",
              code: "SAME_DEVICE",
            });
          }
        }
      }

      const profileRedis = await redisPipeline([
        ["HGET", CHAT_DISPLAY_NAMES_KEY, myId],
        ["HGET", USERNAMES_KEY, myId],
      ]);
      let redisChatDisplay = "";
      try {
        const rawD = profileRedis && profileRedis[0] && profileRedis[0].result;
        if (rawD != null && rawD !== false) {
          redisChatDisplay = String(rawD)
            .trim()
            .replace(/[\u0000-\u001f\u007f]/g, "")
            .slice(0, CHAT_DISPLAY_NAME_MAX);
        }
      } catch (eCd) {}
      let redisUsernameFromBot = "";
      try {
        const rawU = profileRedis && profileRedis[1] && profileRedis[1].result;
        if (rawU != null && rawU !== false) {
          redisUsernameFromBot = String(rawU).trim().replace(/^@+/g, "");
        }
      } catch (eUn) {}

      const name = (function raffleParticipantName() {
        if (myId.startsWith("guest_")) return "Гость";
        if (!identity) return "Участник";
        /* Имя из профиля (POST users chatDisplayName) — раньше не читалось, в списке был «Участник». */
        if (redisChatDisplay) return redisChatDisplay;
        const fn = (identity.firstName || "").trim();
        if (fn) return fn;
        const un = (identity.telegramUsername || identity.pwaUsername || "").replace(/^@+/g, "").trim();
        if (un) return "@" + un;
        if (redisUsernameFromBot) return "@" + redisUsernameFromBot;
        return "Участник";
      })();
      const partPush = {
        userId: myId,
        accountId,
        name,
        p21Id: p21Id || "",
        ip: clientIp || undefined,
        deviceId: deviceId || undefined,
      };
      if (String(myId).indexOf("tg_") === 0 && redisUsernameFromBot) {
        partPush.telegramUsername = redisUsernameFromBot;
      }
      raffle.participants.push(partPush);
      const hydratedAfterJoin = await hydrateRaffleParticipantNamesFromRedis(raffle);
      raffle = hydratedAfterJoin.raffle;
      const writeCmds = [["SET", RAFFLE_PREFIX + raffleId, JSON.stringify(raffle)]];
      if (clientIp) writeCmds.push(["HSET", ipsKey, clientIp, accountId]);
      if (deviceId) writeCmds.push(["HSET", devicesKey, deviceId, accountId]);
      const setRes = await redisPipeline(writeCmds);
      if (!setRes || setRes[0].error) {
        return res.status(500).json({ ok: false, error: "Ошибка записи" });
      }
      return res.status(200).json({ ok: true, raffle });
    }

    if (action === "leave") {
      const raffleId = (body.raffleId || body.raffle_id || "").trim();
      if (!raffleId) return res.status(400).json({ ok: false, error: "Укажите raffleId" });
      const accountId = myId.startsWith("guest_") ? myId : await ensureDtIdForUserId(myId);

      const getRes = await redisPipeline([["GET", RAFFLE_PREFIX + raffleId]]);
      const raw = getRes && getRes[0] && getRes[0].result;
      if (!raw) return res.status(404).json({ ok: false, error: "Розыгрыш не найден" });
      let raffle;
      try {
        raffle = JSON.parse(raw);
      } catch (e) {
        return res.status(500).json({ ok: false, error: "Ошибка данных" });
      }
      if (raffle.status !== "active") {
        return res.status(400).json({ ok: false, error: "Розыгрыш завершён" });
      }
      if (new Date(raffle.endDate) <= new Date()) {
        return res.status(400).json({ ok: false, error: "Приём заявок завершён" });
      }
      const leaving =
        (raffle.participants || []).find((p) => p.userId === myId) ||
        (accountId ? (raffle.participants || []).find((p) => raffleParticipantAccountId(p) === accountId) : null);
      const before = raffle.participants.length;
      raffle.participants = (raffle.participants || []).filter((p) => {
        if (!p) return false;
        if (p.userId === myId) return false;
        if (accountId && raffleParticipantAccountId(p) === accountId) return false;
        return true;
      });
      if (raffle.participants.length === before) {
        return res.status(200).json({ ok: true, raffle, alreadyLeft: true });
      }
      const writeCmds = [["SET", RAFFLE_PREFIX + raffleId, JSON.stringify(raffle)]];
      const ipsKey = RAFFLE_IPS_PREFIX + raffleId;
      const devicesKey = RAFFLE_DEVICES_PREFIX + raffleId;
      if (leaving && leaving.ip) writeCmds.push(["HDEL", ipsKey, leaving.ip]);
      if (leaving && leaving.deviceId) writeCmds.push(["HDEL", devicesKey, leaving.deviceId]);
      const setRes = await redisPipeline(writeCmds);
      if (!setRes || setRes[0].error) {
        return res.status(500).json({ ok: false, error: "Ошибка записи" });
      }
      return res.status(200).json({ ok: true, raffle });
    }

    return res.status(400).json({ ok: false, error: "action: create, join, leave (и админские: complete, cancel, delete, setWinnerStatus, updateEndDate)" });
  }

  // GET: список активных или один розыгрыш
  const raffleId = req.query.id || req.query.raffleId || req.query.raffle_id;
  if (raffleId) {
    const getRes = await redisPipeline([["GET", RAFFLE_PREFIX + raffleId]]);
    const raw = getRes && getRes[0] && getRes[0].result;
    if (!raw) return res.status(404).json({ ok: false, error: "Розыгрыш не найден" });
    let raffle;
    try {
      raffle = JSON.parse(raw);
    } catch (e) {
      return res.status(500).json({ ok: false, error: "Ошибка данных" });
    }
    const now = new Date();
    const endDate = new Date(raffle.endDate);
    if (raffle.status === "active" && endDate <= now) {
      raffle = runDraw(raffle);
      await redisPipeline([["SET", RAFFLE_PREFIX + raffleId, JSON.stringify(raffle)]]);
    }
    const hydratedOne = await hydrateRaffleParticipantNamesFromRedis(raffle);
    raffle = hydratedOne.raffle;
    if (hydratedOne.changed) {
      await redisPipeline([["SET", RAFFLE_PREFIX + raffleId, JSON.stringify(raffle)]]);
    }
    return res.status(200).json({ ok: true, raffle, isAdmin: admin });
  }

  const listRes = await redisPipeline([["LRANGE", RAFFLE_IDS_KEY, "0", "-1"]]);
  const idsRaw = (listRes && listRes[0] && listRes[0].result) || [];
  const ids = [...new Set(idsRaw)];
  const raffles = [];
  const getRafflesRes = ids.length ? await redisPipeline(ids.map((id) => ["GET", RAFFLE_PREFIX + id])) : [];
  const writeBackIds = new Set();
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const str = getRafflesRes && getRafflesRes[i] && getRafflesRes[i].result;
    if (str) {
      try {
        let raffle = JSON.parse(str);
        const endDate = new Date(raffle.endDate);
        if (raffle.status === "active" && endDate <= new Date()) {
          raffle = runDraw(raffle);
          writeBackIds.add(String(id));
        }
        raffles.push(raffle);
      } catch (e) {}
    }
  }
  const hydratedList = await hydrateRafflesParticipantNamesFromRedis(raffles);
  hydratedList.changedIds.forEach((id) => writeBackIds.add(String(id)));
  if (writeBackIds.size > 0) {
    const byId = new Map();
    raffles.forEach((r) => {
      if (r && r.id) byId.set(String(r.id), r);
    });
    const writeCmds = [...writeBackIds]
      .map((id) => byId.get(String(id)))
      .filter(Boolean)
      .map((raffle) => ["SET", RAFFLE_PREFIX + raffle.id, JSON.stringify(raffle)]);
    if (writeCmds.length) await redisPipeline(writeCmds);
  }
  raffles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  let active = raffles.filter((r) => r.status === "active");

  // Демо-розыгрыш: localhost, development или явный ?demo=1
  const host = (req.headers.host || req.headers.origin || "").toString();
  const referer = (req.headers.referer || "").toString();
  const isLocalhost = /localhost|127\.0\.0\.1|0\.0\.0\.0/i.test(host) || /localhost|127\.0\.0\.1/i.test(referer);
  const isDev = process.env.NODE_ENV === "development";
  const forceDemo = req.query && (req.query.demo === "1" || req.query.demo === "true");
  const needDemo = forceDemo || ((isLocalhost || isDev) && active.length === 0);
  if (needDemo) {
    const demo = getDemoRaffle();
    if (!raffles.some((r) => r.id === demo.id)) raffles.unshift(demo);
    active = raffles.filter((r) => r.status === "active");
    if (forceDemo && active.length > 0) active = [active.find((r) => r.id === demo.id) || active[0]];
  }

  return res.status(200).json({ ok: true, raffles, activeRaffle: active[0] || null, isAdmin: admin });
}

function getDemoRaffle() {
  const now = new Date();
  const endDate = new Date(now.getTime() + 3 * 60 * 60 * 1000); // через 3 часа — как будто розыгрыш идёт сейчас
  return {
    id: "raffle_demo_local",
    createdBy: 0,
    title: "Беккинг-билеты на турнир дня",
    totalWinners: 3,
    groups: [
      { prize: "Беккинг-билет на турнир дня 18:00 МСК (бай-ин 500 р)", count: 2 },
      { prize: "Беккинг-билет на турнир дня 18:00 МСК (бай-ин 500 р) — 2-е место", count: 1 },
    ],
    endDate: endDate.toISOString(),
    participants: [
      { userId: "demo_1", name: "Иван", p21Id: "12345" },
      { userId: "demo_2", name: "Мария", p21Id: "67890" },
      { userId: "demo_3", name: "Алексей", p21Id: "11111" },
      { userId: "demo_4", name: "Ольга", p21Id: "22222" },
      { userId: "demo_5", name: "Дмитрий", p21Id: "33333" },
    ],
    winners: [],
    status: "active",
    createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), // создан 2 часа назад
  };
}
