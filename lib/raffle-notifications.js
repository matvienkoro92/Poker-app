"use strict";

const DEFAULT_TELEGRAM_MINI_APP = "https://t.me/Poker_dvatuza_bot/DvaTuza";
const DEFAULT_WORKING_ADMIN_CONTACTS = [
  { userId: "tg_2144406710", name: "Анна", shiftStart: 6, shiftEnd: 18 },
  { userId: "tg_1897001087", name: "Вика", shiftStart: 18, shiftEnd: 2 },
];

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

function createRaffleNotificationService(options) {
  const opts = options && typeof options === "object" ? options : {};
  const BOT_TOKEN = opts.botToken || "";
  const ADMIN_IDS = Array.isArray(opts.adminIds) ? opts.adminIds : [];
  const MINI_APP_URL = opts.miniAppUrl || "";
  const RAFFLE_PREFIX = opts.rafflePrefix || "poker_app:raffle:";
  const redisPipeline = opts.redisPipeline;
  const workingAdminContacts = opts.workingAdminContacts;

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
      if (!BOT_TOKEN || !raffleId || !raffle || raffle.winnersNotifiedAt) return;
      if (!raffle.winners || !Array.isArray(raffle.winners) || raffle.winners.length === 0) return;

      const title = (raffle.title || (raffle.groups && raffle.groups[0] && raffle.groups[0].prize) || "Розыгрыш").trim();
      const baseAppUrl = MINI_APP_URL ? String(MINI_APP_URL).replace(/\/$/, "") : "";
      const raffleLink = baseAppUrl
        ? (baseAppUrl.includes("?") ? baseAppUrl + "&" : baseAppUrl + "?") + "startapp=raffles"
        : "https://t.me/Poker_dvatuza_bot/DvaTuza?startapp=raffles";
      const workingAdmin = resolveWorkingRaffleAdmin(new Date(), workingAdminContacts);
      const adminChatLink = buildRaffleWinnerAdminChatLink(MINI_APP_URL, workingAdmin);
      const adminName = workingAdmin && workingAdmin.name ? " (" + workingAdmin.name + ")" : "";

      // Простое сообщение победителю. Детали приза берём из записи победителя (если она есть).
      var introText =
        "🎉 Вы выиграли розыгрыш в клубе «Два туза»!\n\n" +
        (title ? ("Розыгрыш: " + title + "\n\n") : "");
      var contactText =
        "Чтобы получить приз, напишите работающему админу" + adminName + " в приложении.\n\n" +
        "Чат с админом: " + adminChatLink +
        "\n\nРозыгрыши в приложении: " + raffleLink;

      for (let i = 0; i < raffle.winners.length; i++) {
        const w = raffle.winners[i] || {};
        const uidRaw = w.userId ? String(w.userId) : "";
        if (uidRaw.startsWith("guest_") || uidRaw.startsWith("vk_")) continue;
        const telegramId = uidRaw.replace(/^tg_/, "");
        if (!telegramId || !/^\d+$/.test(telegramId)) continue;
        const prizeLine =
          w.prize && String(w.prize).trim()
            ? "\n\nПриз: " + String(w.prize).trim()
            : "";
        const text = introText + (prizeLine ? prizeLine.replace(/^\n\n/, "") + "\n\n" : "") + contactText;
        await sendTelegramMessage(telegramId, text);
      }

      // Идемпотентность: отмечаем, что победителям уже отправляли.
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
