"use strict";

function createRaffleNotificationService(options) {
  const opts = options && typeof options === "object" ? options : {};
  const BOT_TOKEN = opts.botToken || "";
  const ADMIN_IDS = Array.isArray(opts.adminIds) ? opts.adminIds : [];
  const MINI_APP_URL = opts.miniAppUrl || "";
  const RAFFLE_PREFIX = opts.rafflePrefix || "poker_app:raffle:";
  const redisPipeline = opts.redisPipeline;

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

      // Простое сообщение победителю. Детали приза берём из group.prize (если он есть).
      var baseText =
        "🎉 Вы выиграли розыгрыш в клубе «Два туза»!\n\n" +
        (title ? ("Розыгрыш: " + title + "\n\n") : "") +
        "Скоро вы будете автоматически зарегистрированы в соответствующем турнире.\n\n" +
        raffleLink;

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
        const nameLine = w.name && String(w.name).trim() ? "\n" : "";
        const text = baseText + prizeLine;
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

module.exports = { createRaffleNotificationService };
