"use strict";

const DEFAULT_TELEGRAM_MINI_APP = "https://t.me/Poker_dvatuza_bot/DvaTuza";
const DEFAULT_WORKING_ADMIN_CONTACTS = [
  { userId: "tg_2144406710", name: "Анна", shiftStart: 6, shiftEnd: 18 },
  { userId: "tg_1897001087", name: "Вика", shiftStart: 18, shiftEnd: 2 },
];
const ID_TO_USER_KEY = "poker_app:id_to_user";
const RAFFLE_WINNER_NOTIFY_LOCK_PREFIX = "poker_app:raffle_winner_notify_lock:";
const RAFFLE_WINNER_NOTIFY_SENT_PREFIX = "poker_app:raffle_winner_notify_sent:";
const RAFFLE_WINNER_NOTIFY_LOCK_TTL_SECONDS = 5 * 60;
const RAFFLE_WINNER_NOTIFY_SENT_TTL_SECONDS = 60 * 60 * 24 * 45;

function normalizeSupportAdminId(raw) {
  const s = String(raw || "").trim();
  if (!s) return "";
  if (/^\d+$/.test(s)) return "tg_" + s;
  if (/^tg_\d+$/.test(s)) return s;
  return "";
}

function normalizeHour(raw, fallback) {
  const n = parseInt(String(raw), 10);
  if (!Number.isFinite(n) || n < 0 || n > 23) return fallback;
  return n;
}

function normalizeWorkingAdminContacts(rawContacts) {
  const source = Array.isArray(rawContacts) && rawContacts.length ? rawContacts : DEFAULT_WORKING_ADMIN_CONTACTS;
  return source
    .map((item) => {
      const userId = normalizeSupportAdminId(item && (item.userId || item.id || item.telegramId));
      if (!userId) return null;
      return {
        userId,
        name: String((item && item.name) || "").trim(),
        shiftStart: normalizeHour(item && item.shiftStart, 0),
        shiftEnd: normalizeHour(item && item.shiftEnd, 0),
      };
    })
    .filter(Boolean);
}

function moscowHourFromDate(date) {
  const d = date instanceof Date ? date : new Date(date || Date.now());
  const hour = Number.isFinite(d.getTime()) ? d.getUTCHours() + 3 : new Date().getUTCHours() + 3;
  return ((hour % 24) + 24) % 24;
}

function isHourInShift(hour, start, end) {
  const h = normalizeHour(hour, 0);
  const s = normalizeHour(start, 0);
  const e = normalizeHour(end, 0);
  if (s === e) return true;
  return s < e ? h >= s && h < e : h >= s || h < e;
}

function resolveWorkingRaffleAdmin(now, contacts) {
  const list = normalizeWorkingAdminContacts(contacts);
  if (!list.length) return null;
  const hour = moscowHourFromDate(now);
  return list.find((item) => isHourInShift(hour, item.shiftStart, item.shiftEnd)) || list[0];
}

function resolveMiniAppBase(miniAppUrl) {
  let base = String(miniAppUrl || "").trim();
  if (!base) base = DEFAULT_TELEGRAM_MINI_APP;
  return base.replace(/\/+$/, "").replace(/\)+$/, "");
}

function appendQueryParams(base, params) {
  const pairs = Object.keys(params || {})
    .filter((key) => params[key] != null && String(params[key]).trim() !== "")
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(String(params[key])));
  if (!pairs.length) return base;
  return base + (base.includes("?") ? "&" : "?") + pairs.join("&");
}

function buildRaffleWinnerAdminChatLink(miniAppUrl, adminOrId) {
  const adminId = normalizeSupportAdminId(
    adminOrId && typeof adminOrId === "object" ? adminOrId.userId || adminOrId.id || adminOrId.telegramId : adminOrId
  );
  const base = resolveMiniAppBase(miniAppUrl);
  if (!adminId) return appendQueryParams(base, { startapp: "club_chat" });
  if (base.indexOf("t.me/") !== -1) {
    return appendQueryParams(base, { startapp: "club_chat_dm_" + adminId });
  }
  return appendQueryParams(base, { startapp: "club_chat_dm", with: adminId });
}

function normalizeRafflePrizeKind(raw) {
  const s = String(raw || "").trim().toLowerCase();
  if (["cash", "cash_buyin", "cash_buyins", "cash-backing", "other"].includes(s)) return "cash";
  if (["ticket", "tickets", "tournament", "tournament_ticket", "tournament_tickets"].includes(s)) return "tournament_ticket";
  return "";
}

function isCashRafflePrize(raffle) {
  const explicit = normalizeRafflePrizeKind(raffle && (raffle.prizeKind || raffle.prize_kind));
  if (explicit) return explicit === "cash";
  const title = String((raffle && raffle.title) || "").toLowerCase();
  const groupText = Array.isArray(raffle && raffle.groups)
    ? raffle.groups.map((g) => String((g && g.prize) || "")).join(" ").toLowerCase()
    : "";
  const text = title + " " + groupText;
  return text.includes("на кеш") || text.includes("кеш") || text.includes("cash") || text.includes("бонус гейм") || text.includes("bonus game");
}

function raffleWinnerPushBody(title, prizeText, cashPrize) {
  const parts = [];
  if (title) parts.push(String(title).trim());
  if (prizeText) parts.push("Приз: " + String(prizeText).trim());
  else if (cashPrize) parts.push("Приз: беккинг-байин на кеш");
  parts.push("Откройте «Розыгрыши» и нажмите «Я готов».");
  return parts.join("\n").slice(0, 180);
}

function safePushTagPart(raw) {
  return String(raw || "").replace(/[^\w-]/g, "_").slice(0, 48);
}

function redisSetNxOk(row) {
  if (!row || row.error) return false;
  const value = row.result;
  return value === "OK" || value === true || value === 1 || String(value || "").toUpperCase() === "OK";
}

function redisSetOk(row) {
  if (!row || row.error) return false;
  const value = row.result;
  return value === "OK" || value === true || value === 1 || String(value || "").toUpperCase() === "OK";
}

function redisString(row) {
  if (!row || row.error || row.result == null || row.result === false) return "";
  return String(row.result).trim();
}

function createRaffleNotificationService(options) {
  const opts = options && typeof options === "object" ? options : {};
  const BOT_TOKEN = opts.botToken || "";
  const ADMIN_IDS = Array.isArray(opts.adminIds) ? opts.adminIds : [];
  const MINI_APP_URL = opts.miniAppUrl || "";
  const RAFFLE_PREFIX = opts.rafflePrefix || "poker_app:raffle:";
  const redisPipeline = opts.redisPipeline;
  const workingAdminContacts = opts.workingAdminContacts;
  const sendWebPushToMember =
    typeof opts.sendWebPushToMember === "function"
      ? opts.sendWebPushToMember
      : async function () { return 0; };

  async function sendTelegramMessage(chatId, text) {
    if (!BOT_TOKEN || !chatId || !text) return { ok: false, error: "missing bot/params" };
    const url = "https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage";
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: String(chatId),
        text: String(text),
        disable_web_page_preview: true,
      }),
    }).then(function (r) {
      return r.ok ? { ok: true } : r.text().then(function (t) { return { ok: false, error: t }; }).catch(function () { return { ok: false }; });
    });
  }

  function winnerNotificationKeyPart(winner, fallbackIndex) {
    const w = winner || {};
    const accountId = w.accountId != null ? String(w.accountId).trim() : "";
    if (accountId) return accountId;
    const userId = w.userId != null ? String(w.userId).trim() : "";
    if (userId) return userId;
    return "winner_" + fallbackIndex;
  }

  function winnerNotificationRedisKey(prefix, raffleId, winnerKey, channel) {
    return (
      prefix +
      safePushTagPart(raffleId) +
      ":" +
      safePushTagPart(winnerKey) +
      (channel ? ":" + safePushTagPart(channel) : "")
    );
  }

  async function claimWinnerNotificationLock(raffleId, winnerKey) {
    if (!redisPipeline || !raffleId || !winnerKey) return true;
    const key = winnerNotificationRedisKey(RAFFLE_WINNER_NOTIFY_LOCK_PREFIX, raffleId, winnerKey);
    try {
      const rows = await redisPipeline([["SET", key, "1", "EX", String(RAFFLE_WINNER_NOTIFY_LOCK_TTL_SECONDS), "NX"]]);
      return redisSetNxOk(rows && rows[0]);
    } catch (e) {
      return false;
    }
  }

  async function hasWinnerChannelSent(raffleId, winnerKey, channel) {
    if (!redisPipeline || !raffleId || !winnerKey || !channel) return false;
    const key = winnerNotificationRedisKey(RAFFLE_WINNER_NOTIFY_SENT_PREFIX, raffleId, winnerKey, channel);
    try {
      const rows = await redisPipeline([["GET", key]]);
      return !!redisString(rows && rows[0]);
    } catch (e) {
      return false;
    }
  }

  async function markWinnerChannelSent(raffleId, winnerKey, channel) {
    if (!redisPipeline || !raffleId || !winnerKey || !channel) return false;
    const key = winnerNotificationRedisKey(RAFFLE_WINNER_NOTIFY_SENT_PREFIX, raffleId, winnerKey, channel);
    try {
      const rows = await redisPipeline([["SET", key, "1", "EX", String(RAFFLE_WINNER_NOTIFY_SENT_TTL_SECONDS)]]);
      return redisSetOk(rows && rows[0]);
    } catch (e) {
      return false;
    }
  }

  async function resolveWinnerTelegramId(winner) {
    const w = winner || {};
    const uidRaw = w.userId != null ? String(w.userId).trim() : "";
    if (/^tg_\d+$/.test(uidRaw)) return uidRaw.replace(/^tg_/, "");
    if (/^\d+$/.test(uidRaw)) return uidRaw;
    if (!redisPipeline) return "";
    const candidates = [];
    const accountId = w.accountId != null ? String(w.accountId).trim() : "";
    if (/^ID\d{6}$/.test(accountId)) candidates.push(accountId);
    if (/^ID\d{6}$/.test(uidRaw)) candidates.push(uidRaw);
    const unique = [...new Set(candidates.filter(Boolean))];
    if (!unique.length) return "";
    try {
      const rows = await redisPipeline(unique.map((id) => ["HGET", ID_TO_USER_KEY, id]));
      for (let i = 0; i < unique.length; i++) {
        const mapped = redisString(rows && rows[i]);
        if (/^tg_\d+$/.test(mapped)) return mapped.replace(/^tg_/, "");
        if (/^\d+$/.test(mapped)) return mapped;
      }
    } catch (e) {}
    return "";
  }

  async function notifyAdminsRaffleCompleted(raffle) {
    if (!BOT_TOKEN || !ADMIN_IDS.length) return;
    const title = (raffle.title || (raffle.groups && raffle.groups[0] && raffle.groups[0].prize) || "Розыгрыш").trim();
    const winnersCount = (raffle.winners && raffle.winners.length) || 0;
    const text =
      "🎲 Розыгрыш завершён.\n\n" +
      (title ? title + "\n\n" : "") +
      "Победителей: " + winnersCount +
      (raffle.drawnAt ? "\nВремя: " + new Date(raffle.drawnAt).toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }) : "") +
      "\n\nРозыгрыши в приложении: https://t.me/Poker_dvatuza_bot/DvaTuza?startapp=raffles";
    const url = "https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage";
    for (const adminId of ADMIN_IDS) {
      try {
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: String(adminId),
            text: text,
            disable_web_page_preview: true,
          }),
        });
      } catch (e) {}
    }
  }

  async function notifyWinnersRaffleCompleted(raffleId, raffle) {
    try {
      if (!raffleId || !raffle) return;
      if (!raffle.winners || !Array.isArray(raffle.winners) || raffle.winners.length === 0) return;

      const title = (raffle.title || (raffle.groups && raffle.groups[0] && raffle.groups[0].prize) || "Розыгрыш").trim();
      const baseAppUrl = MINI_APP_URL ? String(MINI_APP_URL).replace(/\/$/, "") : "";
      const raffleLink = baseAppUrl
        ? (baseAppUrl.includes("?") ? baseAppUrl + "&" : baseAppUrl + "?") + "startapp=raffles"
        : "https://t.me/Poker_dvatuza_bot/DvaTuza?startapp=raffles";
      const cashPrize = isCashRafflePrize(raffle);

      // Простое сообщение победителю. Детали приза берём из записи победителя (если она есть).
      var introText =
        "🎉 Вы выиграли розыгрыш в клубе «Два туза»!\n\n" +
        (title ? ("Розыгрыш: " + title + "\n\n") : "");
      var contactText =
        "Чтобы забрать выигрыш, подтвердите готовность в приложении:\n\n" +
        "1. Откройте раздел «Розыгрыши»: " + raffleLink + "\n" +
        "2. Перейдите во вкладку «Завершённые» и найдите этот розыгрыш.\n" +
        "3. Рядом со своим ником нажмите кнопку «Я готов».\n\n" +
        "После этого админ увидит отметку «Готов» возле вашего ника и выдаст приз.";

      for (let i = 0; i < raffle.winners.length; i++) {
        const w = raffle.winners[i] || {};
        const uidRaw = w.userId ? String(w.userId) : "";
        const accountId = w.accountId ? String(w.accountId).trim() : "";
        const pushMemberId = accountId || uidRaw;
        const prizeText = w.prize && String(w.prize).trim() ? String(w.prize).trim() : "";
        const notifyKey = winnerNotificationKeyPart(w, i);
        const claimed = await claimWinnerNotificationLock(raffleId, notifyKey);
        if (!claimed) continue;
        const pushAlreadySent = await hasWinnerChannelSent(raffleId, notifyKey, "push");
        const tgAlreadySent = await hasWinnerChannelSent(raffleId, notifyKey, "tg");
        if (pushMemberId && !pushMemberId.startsWith("guest_") && !pushAlreadySent) {
          try {
            const pushed = await sendWebPushToMember(pushMemberId, {
              title: "Два туза · вы выиграли розыгрыш",
              body: raffleWinnerPushBody(title, prizeText, cashPrize),
              tag: "poker-raffle-winner-" + safePushTagPart(raffleId) + "-" + safePushTagPart(pushMemberId),
              openUrl: "./?startapp=raffles",
              kind: "raffle_winner",
              raffleId: String(raffleId),
              accountId: accountId || (/^ID\d{6}$/.test(pushMemberId) ? pushMemberId : ""),
            });
            if (Number(pushed) > 0) await markWinnerChannelSent(raffleId, notifyKey, "push");
          } catch (ePush) {}
        }
        if (!BOT_TOKEN || uidRaw.startsWith("guest_") || uidRaw.startsWith("vk_") || tgAlreadySent) continue;
        const telegramId = await resolveWinnerTelegramId(w);
        if (!telegramId || !/^\d+$/.test(telegramId)) continue;
        const prizeLine = prizeText ? "\n\nПриз: " + prizeText : (cashPrize ? "\n\nПриз: беккинг-байин на кеш" : "");
        const text = introText + (prizeLine ? prizeLine.replace(/^\n\n/, "") + "\n\n" : "") + contactText;
        const sent = await sendTelegramMessage(telegramId, text);
        if (sent && sent.ok) await markWinnerChannelSent(raffleId, notifyKey, "tg");
      }

      // Для истории розыгрыша оставляем отметку попытки; дедуп доставки живёт в отдельных Redis-ключах по каналам.
      raffle.winnersNotifiedAt = new Date().toISOString();
      await redisPipeline([["SET", RAFFLE_PREFIX + raffleId, JSON.stringify(raffle)]]);
    } catch (e) {
      // молча: уведомление победителей не критично для основной бизнес-логики
    }
  }


  return {
    sendTelegramMessage,
    notifyAdminsRaffleCompleted,
    notifyWinnersRaffleCompleted,
  };
}

module.exports = {
  buildRaffleWinnerAdminChatLink,
  createRaffleNotificationService,
  isHourInShift,
  moscowHourFromDate,
  resolveWorkingRaffleAdmin,
};
