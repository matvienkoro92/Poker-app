"use strict";

const SUBSCRIBERS_KEY = "poker_app:raffle_tournament_push_subscribers";

function createTournamentPushService({ redisPipeline, sendToMemberDevices, disabledKey, subscriptionPrefix, pushConfigured }) {
  async function status(accountId) {
    const rows = await redisPipeline([
      ["SISMEMBER", SUBSCRIBERS_KEY, accountId],
      ["SISMEMBER", disabledKey, accountId],
      ["HLEN", subscriptionPrefix + accountId],
    ]);
    if (!rows || rows.length !== 3 || rows.some((row) => !row || row.error || row.result == null)) throw new Error("Не удалось проверить настройки уведомлений. Попробуйте ещё раз.");
    return {
      subscribed: Number(rows[0].result) === 1,
      notificationsEnabled: Number(rows[1].result) === 0,
      hasSubscription: Number(rows[2].result) > 0,
      pushConfigured: !!pushConfigured(),
    };
  }

  async function setSubscription(accountId, enabled) {
    if (enabled) {
      const current = await status(accountId);
      if (!current.pushConfigured) return { ok: false, code: "PUSH_UNAVAILABLE", error: "Пуши временно недоступны. Попробуйте позже." };
      if (!current.notificationsEnabled) return { ok: false, code: "PROFILE_DISABLED", error: "Включите уведомления в профиле, затем вернитесь сюда и нажмите «Включить»." };
      if (!current.hasSubscription) return { ok: false, code: "DEVICE_REQUIRED", error: "Откройте профиль, включите пуш-уведомления и разрешите их на устройстве. Затем вернитесь сюда и нажмите «Включить»." };
    }
    const rows = await redisPipeline([[enabled ? "SADD" : "SREM", SUBSCRIBERS_KEY, accountId]]);
    if (!rows || !rows[0] || rows[0].error || rows[0].result == null) throw new Error("Не удалось сохранить подписку. Попробуйте ещё раз.");
    return { ok: true, subscribed: enabled };
  }

  async function notifyCreated(raffle) {
    if (!raffle || !raffle.id || raffle.status !== "active" || raffle.prizeKind !== "tournament_ticket") return;
    const rows = await redisPipeline([["SMEMBERS", SUBSCRIBERS_KEY]]);
    if (!rows || !rows[0] || rows[0].error || !Array.isArray(rows[0].result)) throw new Error("Не удалось прочитать подписчиков турнирных розыгрышей");
    const subscribers = [...new Set(rows[0].result)].filter((id) => /^ID\d{6}$/.test(id));
    for (let offset = 0; offset < subscribers.length; offset += 10) {
      const results = await Promise.allSettled(subscribers.slice(offset, offset + 10).map(async (accountId) => {
        // Recheck opt-in and the profile preference immediately before delivery.
        const current = await status(accountId);
        if (!current.subscribed || !current.notificationsEnabled || !current.hasSubscription || !current.pushConfigured) return;
        await sendToMemberDevices(accountId, {
          title: "Начался турнирный розыгрыш",
          body: String(raffle.title || "Новый розыгрыш билетов на турнир").slice(0, 180) + ". Участвуйте!",
          kind: "raffle_tournament_start",
          raffleId: String(raffle.id),
          tag: "poker-raffle-start-" + raffle.id,
          openUrl: "./?startapp=r_" + encodeURIComponent(raffle.id),
          dedupeKey: "raffle-tournament-start:" + raffle.id,
          dedupeTtlSeconds: 30 * 24 * 60 * 60,
        });
      }));
      results.forEach((result) => {
        if (result.status === "rejected") console.error("[raffles] subscriber push failed", { raffleId: raffle.id, error: String(result.reason && result.reason.message || result.reason) });
      });
    }
  }

  return { status, setSubscription, notifyCreated };
}

function defaultService() {
  const push = require("./chat-webpush-notify");
  return createTournamentPushService({
    redisPipeline: require("./redis").pipeline,
    sendToMemberDevices: push.sendToMemberDevices,
    disabledKey: push.CHAT_PUSH_DISABLED,
    subscriptionPrefix: push.CHAT_PUSH_SUB_PREFIX,
    pushConfigured: () => push.readVapidEnv().pushConfigured,
  });
}

module.exports = { SUBSCRIBERS_KEY, createTournamentPushService, defaultService };
