"use strict";

const { isAdmin } = require("./api-auth");
const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("./redis");
const { resolveTelegramOpenButtonUrl, sendTelegramMessage } = require("./telegram-bot-send");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const ONBOARDING_DUE_KEY = "poker_app:engagement:onboarding_due";
const INACTIVE_DUE_KEY = "poker_app:engagement:inactive_due";
const LAST_SEEN_KEY = "poker_app:engagement:last_seen";
const ONBOARDING_SENT_KEY = "poker_app:engagement:onboarding_sent";
const INACTIVE_SENT_FOR_KEY = "poker_app:engagement:inactive_sent_for";
const FIRST_SEEN_KEY = "poker_app:visitor_first_seen";
const DT_IDS_KEY = "poker_app:visitor_dt_ids";
const POKERPLUS_BIND_KEY = "poker_app:pokerplus_user_ids";
const RAFFLE_ACTIVE_IDS_KEY = "poker_app:raffle_active_ids";
const RAFFLE_PREFIX = "poker_app:raffle:";
const DAY_MS = 24 * 60 * 60 * 1000;
const ONBOARDING_DELAY_MS = DAY_MS;
const INACTIVE_DELAY_MS = 10 * DAY_MS;

function miniAppLink(startapp) {
  const fallback = "https://t.me/Poker_dvatuza_bot/DvaTuza";
  const base = resolveTelegramOpenButtonUrl(fallback) || fallback;
  try {
    const url = new URL(base);
    url.searchParams.set("startapp", startapp);
    return url.toString();
  } catch (error) {
    const separator = base.indexOf("?") >= 0 ? "&" : "?";
    return base + separator + "startapp=" + encodeURIComponent(startapp);
  }
}

function parseRaffle(raw) {
  try {
    const raffle = JSON.parse(String(raw || ""));
    if (!raffle || raffle.status !== "active") return null;
    const endMs = Date.parse(String(raffle.endDate || ""));
    if (Number.isFinite(endMs) && endMs <= Date.now()) return null;
    const title = String(raffle.cardTitle || raffle.title || "").trim();
    return title ? title.slice(0, 120) : null;
  } catch (error) {
    return null;
  }
}

async function activeRaffleTitles() {
  const idsResult = await redisPipeline([["SMEMBERS", RAFFLE_ACTIVE_IDS_KEY]], {
    context: "engagement.active-raffle-ids",
  });
  const ids = Array.isArray(idsResult && idsResult[0] && idsResult[0].result)
    ? idsResult[0].result.map(String).filter(Boolean).slice(0, 12)
    : [];
  if (!ids.length) return [];
  const rows = await redisPipeline([["MGET", ...ids.map((id) => RAFFLE_PREFIX + id)]], {
    context: "engagement.active-raffles",
  });
  const values = Array.isArray(rows && rows[0] && rows[0].result) ? rows[0].result : [];
  return values.map(parseRaffle).filter(Boolean).filter((title, index, all) => all.indexOf(title) === index).slice(0, 2);
}

function raffleOfferText(titles) {
  if (!titles.length) return "клубные розыгрыши";
  if (titles.length === 1) return "розыгрыш «" + titles[0] + "»";
  return "розыгрыши «" + titles[0] + "» и «" + titles[1] + "»";
}

function onboardingText(titles) {
  return "Попалася рыбешка! Привет, каталкин, ты же зарегался, но не дорегался, а ведь тебе доступна ежедневная крутка за билет, где можно выигрывать билеты каждый день, и " +
    raffleOfferText(titles) + ". Надо только привязать Poker21. Делай, бро 👇";
}

function inactiveText(titles) {
  return "Привет, каталкин! Давненько не виделись 👋\n\n" +
    "Тебе доступна «Крутка дня» и " + raffleOfferText(titles) + ".\n\n" +
    "Заходи, не забывай!";
}

function telegramChatId(memberId) {
  const match = String(memberId || "").match(/^tg_(\d+)$/);
  return match ? match[1] : "";
}

async function processOnboarding(memberId, nowMs, titles) {
  const chatId = telegramChatId(memberId);
  if (!chatId || isAdmin(memberId)) {
    await redisPipeline([["ZREM", ONBOARDING_DUE_KEY, memberId]]);
    return "skipped";
  }
  const rows = await redisPipeline([
    ["HGET", FIRST_SEEN_KEY, memberId],
    ["HGET", DT_IDS_KEY, memberId],
    ["HGET", ONBOARDING_SENT_KEY, memberId],
  ]);
  const firstSeen = Number(rows && rows[0] && rows[0].result) || 0;
  const dtId = String((rows && rows[1] && rows[1].result) || "").trim();
  const alreadySent = rows && rows[2] && rows[2].result;
  if (!firstSeen || firstSeen + ONBOARDING_DELAY_MS > nowMs || alreadySent) {
    if (alreadySent) await redisPipeline([["ZREM", ONBOARDING_DUE_KEY, memberId]]);
    return "skipped";
  }
  const bindRows = await redisPipeline([["HMGET", POKERPLUS_BIND_KEY, memberId, dtId || memberId]]);
  const bindings = Array.isArray(bindRows && bindRows[0] && bindRows[0].result) ? bindRows[0].result : [];
  if (bindings.some(Boolean)) {
    await redisPipeline([["ZREM", ONBOARDING_DUE_KEY, memberId]]);
    return "skipped";
  }
  const sent = await sendTelegramMessage(BOT_TOKEN, {
    chatId,
    text: onboardingText(titles),
    buttonText: "Привязать Poker21",
    buttonUrl: miniAppLink("profile"),
  });
  if (!sent || !sent.ok) {
    if (sent && sent.hint === "user_blocked") {
      await redisPipeline([["ZREM", ONBOARDING_DUE_KEY, memberId]]);
      return "blocked";
    }
    return "failed";
  }
  await redisPipeline([
    ["HSET", ONBOARDING_SENT_KEY, memberId, new Date(nowMs).toISOString()],
    ["ZREM", ONBOARDING_DUE_KEY, memberId],
  ]);
  return "sent";
}

async function processInactive(memberId, nowMs, titles) {
  const chatId = telegramChatId(memberId);
  if (!chatId || isAdmin(memberId)) {
    await redisPipeline([["ZREM", INACTIVE_DUE_KEY, memberId]]);
    return "skipped";
  }
  const rows = await redisPipeline([
    ["HGET", LAST_SEEN_KEY, memberId],
    ["HGET", INACTIVE_SENT_FOR_KEY, memberId],
  ]);
  const lastSeen = Number(rows && rows[0] && rows[0].result) || 0;
  const sentFor = Number(rows && rows[1] && rows[1].result) || 0;
  if (!lastSeen || lastSeen + INACTIVE_DELAY_MS > nowMs || sentFor === lastSeen) {
    if (!lastSeen || sentFor === lastSeen) await redisPipeline([["ZREM", INACTIVE_DUE_KEY, memberId]]);
    return "skipped";
  }
  const sent = await sendTelegramMessage(BOT_TOKEN, {
    chatId,
    text: inactiveText(titles),
    buttonText: "Открыть крутку дня",
    buttonUrl: miniAppLink("daily_poker"),
  });
  if (!sent || !sent.ok) {
    if (sent && sent.hint === "user_blocked") {
      await redisPipeline([["ZREM", INACTIVE_DUE_KEY, memberId]]);
      return "blocked";
    }
    return "failed";
  }
  await redisPipeline([
    ["HSET", INACTIVE_SENT_FOR_KEY, memberId, String(lastSeen)],
    ["ZREM", INACTIVE_DUE_KEY, memberId],
  ]);
  return "sent";
}

async function tickEngagementAutomations(limit) {
  if (!redisConfigured()) return { ok: false, status: 503, error: "Redis unavailable" };
  if (!BOT_TOKEN) return { ok: false, status: 500, error: "Set TELEGRAM_BOT_TOKEN" };
  const nowMs = Date.now();
  const batchSize = Math.max(1, Math.min(100, parseInt(limit || "40", 10) || 40));
  const dueRows = await redisPipeline([
    ["ZRANGEBYSCORE", ONBOARDING_DUE_KEY, "-inf", String(nowMs), "LIMIT", "0", String(batchSize)],
    ["ZRANGEBYSCORE", INACTIVE_DUE_KEY, "-inf", String(nowMs), "LIMIT", "0", String(batchSize)],
  ]);
  const onboarding = Array.isArray(dueRows && dueRows[0] && dueRows[0].result) ? dueRows[0].result.map(String) : [];
  const inactive = Array.isArray(dueRows && dueRows[1] && dueRows[1].result) ? dueRows[1].result.map(String) : [];
  const titles = await activeRaffleTitles();
  const summary = { ok: true, checked: onboarding.length + inactive.length, sent: 0, skipped: 0, failed: 0, blocked: 0 };
  for (const memberId of onboarding) {
    const result = await processOnboarding(memberId, nowMs, titles);
    summary[result] = (summary[result] || 0) + 1;
  }
  for (const memberId of inactive) {
    const result = await processInactive(memberId, nowMs, titles);
    summary[result] = (summary[result] || 0) + 1;
  }
  return summary;
}

module.exports = {
  activeRaffleTitles,
  inactiveText,
  onboardingText,
  raffleOfferText,
  tickEngagementAutomations,
};
