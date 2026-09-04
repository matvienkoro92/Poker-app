"use strict";

const BOT_SUBSCRIPTION_SET_KEYS = [
  "poker_app:tournament_bet_subscribers",
  "poker_app:gazette_subscribers",
  "poker_app:rating_subscribers",
  "poker_app:raffle_subscribers",
  "poker_app:private_cash_subscribers",
];

const BOT_SUBSCRIBED_AT_KEY = "poker_app:bot_subscribed_at";
const BOT_UNSUBSCRIBED_AT_KEY = "poker_app:bot_unsubscribed_at";

async function hasAnyBotSubscription(redisPipeline, telegramChatId) {
  const id = String(telegramChatId || "").trim();
  if (!id) return false;
  const rows = await redisPipeline(
    BOT_SUBSCRIPTION_SET_KEYS.map((key) => ["SISMEMBER", key, id])
  );
  return BOT_SUBSCRIPTION_SET_KEYS.some((key, index) => {
    const row = rows && rows[index];
    return !!(row && !row.error && Number(row.result) === 1);
  });
}

async function recordBotSubscriptionTransition(redisPipeline, telegramChatId, wasSubscribed, isSubscribed, at) {
  const id = String(telegramChatId || "").trim();
  if (!id || wasSubscribed === isSubscribed) return false;
  const timestamp = String(at || Date.now());
  const command = isSubscribed
    ? ["HSET", BOT_SUBSCRIBED_AT_KEY, id, timestamp]
    : ["HSET", BOT_UNSUBSCRIBED_AT_KEY, id, timestamp];
  const rows = await redisPipeline([command]);
  return !!(rows && rows[0] && !rows[0].error);
}

module.exports = {
  BOT_SUBSCRIPTION_SET_KEYS,
  BOT_SUBSCRIBED_AT_KEY,
  BOT_UNSUBSCRIBED_AT_KEY,
  hasAnyBotSubscription,
  recordBotSubscriptionTransition,
};
