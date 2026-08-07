"use strict";

const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("./redis");
const { broadcastAllChatPushSubscribersInner, readVapidEnv } = require("./chat-webpush-notify");

const DAY_HERO_PUSH_PREFIX = "poker_app:day_hero_push:";
const DAY_HERO_PUSH_TTL_SECONDS = 180 * 24 * 60 * 60;

function clean(value, max) {
  return String(value || "").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

function formatRub(value) {
  const amount = Math.max(0, Math.round(Number(value) || 0));
  return new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(amount) + " ₽";
}

function formatHeroDate(value) {
  const match = String(value || "").match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) return clean(value, 10);
  const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  const month = months[Number(match[2]) - 1];
  return month ? Number(match[1]) + " " + month + " " + match[3] : clean(value, 10);
}

function dayHeroIdentity(hero) {
  const date = clean(hero && hero.date, 10);
  const nick = clean(hero && hero.nick, 80);
  const reward = Math.max(0, Math.round((Number(hero && hero.reward) || 0) * 100) / 100);
  if (!/^\d{2}\.\d{2}\.\d{4}$/.test(date) || !nick || !reward) return null;
  const id = [date, nick.toLocaleLowerCase("ru"), reward].join("|");
  return { date, nick, reward, id };
}

async function notifyNewDayHero(hero) {
  const item = dayHeroIdentity(hero);
  if (!item) return { ok: false, skipped: "invalid" };
  if (!redisConfigured()) return { ok: false, skipped: "redis" };
  const vapid = readVapidEnv();
  if (!vapid || !vapid.publicKey || !vapid.privateKey) return { ok: false, skipped: "vapid" };

  const key = DAY_HERO_PUSH_PREFIX + Buffer.from(item.id).toString("base64url").slice(0, 180);
  const claimRows = await redisPipeline([
    ["SET", key, new Date().toISOString(), "NX", "EX", String(DAY_HERO_PUSH_TTL_SECONDS)],
  ], { context: "day-hero-push.claim" });
  const claimed = claimRows && claimRows[0] && String(claimRows[0].result || "").toUpperCase() === "OK";
  if (!claimed) return { ok: true, duplicate: true, recipients: 0 };

  const result = await broadcastAllChatPushSubscribersInner({
    title: "🏆 Герой дня — " + item.nick,
    body: formatHeroDate(item.date) + " · выигрыш " + formatRub(item.reward),
    openUrl: "./?startapp=club_news",
    dedupeKey: "day-hero:" + item.id,
  });
  return Object.assign({ duplicate: false }, result || {});
}

module.exports = {
  notifyNewDayHero,
  dayHeroIdentity,
  formatRub,
  formatHeroDate,
  DAY_HERO_PUSH_PREFIX,
};
