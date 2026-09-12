"use strict";

const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("./redis");
const { listActiveChatPushSubscribers, sendToMemberDevices, readVapidEnv } = require("./chat-webpush-notify");

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

async function notifyNewDayHero(hero, options = {}) {
  const item = dayHeroIdentity(hero);
  if (!item) return { ok: false, skipped: "invalid" };
  if (!redisConfigured()) return { ok: false, skipped: "redis" };
  const vapid = readVapidEnv();
  if (!vapid || !vapid.publicKey || !vapid.privateKey) return { ok: false, skipped: "vapid" };
  // An explicit repeat has a stable ID so retrying the same operation is safe.
  const repeatId = clean(options.repeatId, 100);
  const key = DAY_HERO_PUSH_PREFIX + Buffer.from(item.id).toString("base64url").slice(0, 180);
  const reportKey = key + ":report:v2" + (repeatId ? ":" + repeatId : "");
  const lockKey = key + ":lock:v2";
  const token = require("crypto").randomUUID();
  const run = async commands => {
    const rows = await redisPipeline(commands, { context: "day-hero-push", throwOnError: true });
    if (!Array.isArray(rows) || rows.some(row => !row || row.error)) throw new Error("Push state persistence failed");
    return rows;
  };
  const lock = await run([["SET", lockKey, token, "NX", "EX", "900"]]);
  if (lock[0].result !== "OK") return { ok: false, skipped: "running" };
  let report;
  const save = async () => {
    report.updatedAt = new Date().toISOString();
    await run([["SET", reportKey, JSON.stringify(report), "EX", String(DAY_HERO_PUSH_TTL_SECONDS)]]);
  };
  try {
    const prior = await run([["GET", reportKey], ["GET", key]]);
    if (prior[0].result) report = JSON.parse(prior[0].result);
    if (report && report.status === "completed") return { ok: true, duplicate: true, ...report };
    // Legacy timestamps prove only that a run started. Do not claim delivery
    // or automatically repeat an old broadcast on every production build.
    if (!report && prior[1].result && !repeatId) {
      let summary;
      try { summary = JSON.parse(prior[1].result); } catch (_) {}
      if (summary && summary.status === "completed") return { ok: true, duplicate: true, status: "completed", acceptedDevices: summary.acceptedDevices || 0 };
      return { ok: false, skipped: summary ? "previous_run_needs_retry" : "legacy_delivery_unverified" };
    }
    const { activeMemberIds } = await listActiveChatPushSubscribers();
    const { resolveAccountId } = require("./account-id");
    const recipients = [...new Set((await Promise.all(activeMemberIds.map(id => resolveAccountId(id)))).filter(Boolean))];
    report = report || { hero: item, repeatId, startedAt: new Date().toISOString(), acceptedAccounts: [], acceptedDevices: 0 };
    report.status = "sending";
    report.recipients = recipients.length;
    report.failedAccounts = [];
    await save();
    for (const id of recipients) {
      if (report.acceptedAccounts.includes(id)) continue;
      // Renew the owned lock before each recipient; a stopped process expires.
      const renewed = await run([["EVAL", "if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('EXPIRE',KEYS[1],900) else return 0 end", "1", lockKey, token]]);
      if (Number(renewed[0].result) !== 1) throw new Error("Push lock lost");
      let accepted = 0;
      try {
        accepted = await sendToMemberDevices(id, {
          title: "🏆 Герой дня — " + item.nick,
          body: formatHeroDate(item.date) + " · выигрыш " + formatRub(item.reward),
          openUrl: "./?startapp=club_news",
          kind: "day_hero",
          tag: "day-hero:" + item.id + (repeatId ? ":" + repeatId : ""),
          dedupeKey: "day-hero:v2:" + item.id + (repeatId ? ":" + repeatId : ""),
        });
      } catch (_) { /* A failed recipient must not abort the remaining batch. */ }
      if (accepted > 0) {
        report.acceptedAccounts.push(id);
        report.acceptedDevices += accepted;
      } else report.failedAccounts.push(id);
      await save();
    }
    report.status = !recipients.length ? "no_recipients" : report.failedAccounts.length ? "partial" : "completed";
    report.finishedAt = new Date().toISOString();
    await save();
    // The summary is written AFTER all attempts, never before the broadcast.
    await run([["SET", key, JSON.stringify({ status: report.status, reportKey, finishedAt: report.finishedAt, acceptedAccounts: report.acceptedAccounts.length, acceptedDevices: report.acceptedDevices, failedAccounts: report.failedAccounts.length }), "EX", String(DAY_HERO_PUSH_TTL_SECONDS)]]);
    return { ok: report.status === "completed", duplicate: false, ...report };
  } catch (error) {
    if (report) { report.status = "interrupted"; await save(); }
    throw error;
  } finally {
    await run([["EVAL", "if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) else return 0 end", "1", lockKey, token]]);
  }
}

module.exports = {
  notifyNewDayHero,
  dayHeroIdentity,
  formatRub,
  formatHeroDate,
  DAY_HERO_PUSH_PREFIX,
};
