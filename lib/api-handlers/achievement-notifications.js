"use strict";

const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { ensureDtIdForUserId } = require("../account-id");
const { setCors } = require("../api-auth");
const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
const { sendToMemberDevices } = require("../chat-webpush-notify");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const SNAPSHOT_PREFIX = "poker_app:achievement_notification_snapshot:";
const SNAPSHOT_READY_KEY = "__ready";

function cleanText(value, max) {
  return String(value || "").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

function normalizeRows(value) {
  const seen = new Set();
  return (Array.isArray(value) ? value : []).slice(0, 80).reduce((rows, item) => {
    const key = cleanText(item && item.key, 80).toLowerCase().replace(/[^a-zа-я0-9_-]+/gi, "-");
    const title = cleanText(item && item.title, 80);
    const count = Math.max(0, Math.min(1000000, parseInt(item && item.value, 10) || 0));
    if (!key || !title || seen.has(key)) return rows;
    seen.add(key);
    rows.push({ key, title, value: count });
    return rows;
  }, []);
}

module.exports = async function handler(req, res) {
  setCors(res, "POST, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "POST only" });

  let body = {};
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  } catch (e) {
    return res.status(400).json({ ok: false, error: "Invalid JSON" });
  }
  const identity = resolveTelegramIdentity(req, body, BOT_TOKEN);
  if (!identity) return res.status(401).json({ ok: false, error: "Authentication required" });
  const memberId = memberIdFromIdentity(identity);
  const accountId = memberId ? await ensureDtIdForUserId(memberId) : "";
  if (!accountId) return res.status(401).json({ ok: false, error: "Account not found" });
  if (!redisConfigured()) return res.status(503).json({ ok: false, error: "Redis unavailable" });

  const rows = normalizeRows(body.achievements);
  if (!rows.length) return res.status(200).json({ ok: true, baseline: false, newAchievements: [] });
  const key = SNAPSHOT_PREFIX + accountId;
  const existingResults = await redisPipeline([
    ["HGET", key, SNAPSHOT_READY_KEY],
    ...rows.map((row) => ["HGET", key, row.key]),
  ]);
  const previous = {};
  previous[SNAPSHOT_READY_KEY] = existingResults && existingResults[0] && existingResults[0].result != null
    ? String(existingResults[0].result)
    : "";
  rows.forEach((row, index) => {
    const value = existingResults && existingResults[index + 1] && existingResults[index + 1].result;
    if (value != null) previous[row.key] = String(value);
  });
  const baseline = previous[SNAPSHOT_READY_KEY] !== "1";
  const fresh = baseline ? [] : rows.filter((row) => {
    if (!Object.prototype.hasOwnProperty.call(previous, row.key)) return false;
    return row.value > (parseInt(previous[row.key], 10) || 0);
  });

  const commands = [["HSET", key, SNAPSHOT_READY_KEY, "1"]];
  rows.forEach((row) => commands.push(["HSET", key, row.key, String(row.value)]));
  await redisPipeline(commands);

  const newAchievements = fresh.map((row) => ({
    key: row.key,
    title: row.title,
    value: row.value,
    message: row.title.toLowerCase() === "герой дня"
      ? "Вы участвуете в августовской гонке за 15 000 ₽"
      : "Достижение добавлено в ваш профиль",
  }));
  for (const row of newAchievements.slice(0, 8)) {
    try {
      await sendToMemberDevices(accountId, {
        title: "🏆 Новая ачивка: " + row.title,
        body: row.message,
        tag: "poker-achievement-" + row.key,
        openUrl: "./?startapp=profile",
        kind: "achievement",
        accountId,
      });
    } catch (error) {
      console.error("[achievement-notifications] push failed", error && error.message ? error.message : error);
    }
  }

  return res.status(200).json({ ok: true, baseline, newAchievements });
};
