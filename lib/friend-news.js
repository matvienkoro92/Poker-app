"use strict";

const crypto = require("crypto");
const { pipeline, hscanall, isConfigured } = require("./redis");
const { sendToMemberDevices } = require("./chat-webpush-notify");
const { resolveAccountId } = require("./account-id");
const READ_PREFIX = "poker_app:friend_news_read:";
const HISTORY_MS = 60 * 86400000;

function nickKey(value) {
  const key = String(value || "").normalize("NFKC").toLowerCase().replace(/^@+/, "").replace(/\s+/g, "");
  // Explicit club aliases only: no fuzzy matching between different players.
  if (["waaarr", "waaaar", "waaar"].includes(key)) return "waaar";
  return key === "романдий" ? "покерманки" : key;
}

function profileNick(row) {
  return String(row && (row.pokerPlusNickname || row.ratingNick) || "").trim();
}

function buildSharedEvents(self, friends, rows, now = Date.now()) {
  if (!self || !profileNick(self)) return [];
  const ownKey = nickKey(profileNick(self));
  const friendByNick = new Map();
  for (const friend of friends || []) {
    const key = nickKey(profileNick(friend));
    if (!key || key === ownKey) continue;
    // Ambiguous identities are not attributed to an arbitrary account.
    if (friendByNick.has(key) && friendByNick.get(key)?.userId !== friend.userId) friendByNick.set(key, null);
    else if (!friendByNick.has(key)) friendByNick.set(key, friend);
  }
  const tournaments = new Map();
  for (const row of rows || []) {
    const at = Date.parse(String(row.date || "") + (/Z$|[+-]\d\d:\d\d$/.test(row.date || "") ? "" : "+03:00"));
    if (!row.tournamentId || !(row.reward > 0) || !(row.place > 0) || !Number.isFinite(at) || at > now || now - at > HISTORY_MS) continue;
    if (!tournaments.has(row.tournamentId)) tournaments.set(row.tournamentId, new Map());
    tournaments.get(row.tournamentId).set(nickKey(row.nick), row);
  }
  const events = [];
  for (const [tournamentId, results] of tournaments) {
    const own = results.get(ownKey);
    if (!own) continue;
    for (const [key, friend] of friendByNick) {
      const other = results.get(key);
      if (!friend || !other) continue;
      const pair = [String(self.userId), String(friend.userId)].sort();
      const id = "shared-tournament:" + crypto.createHash("sha256").update(JSON.stringify([tournamentId, pair])).digest("hex").slice(0, 32);
      const names = [profileNick(self), profileNick(friend)];
      const lines = ["Оба в призах турнира «" + own.tournament + "»", names[0] + ": " + own.place + "-е место, " + Number(own.reward).toLocaleString("ru-RU") + " ₽", names[1] + ": " + other.place + "-е место, " + Number(other.reward).toLocaleString("ru-RU") + " ₽"];
      events.push({ id, type: "achievement", icon: "🤝", _eventKind: "shared-tournament", newsTitle: names.join(" и "), newsLines: lines, text: names.join(" и ") + ". " + lines.join(". "), at: own.date + (/Z$|[+-]\d\d:\d\d$/.test(own.date) ? "" : "+03:00"), actorId: friend.userId, actorNick: names[1], actorAvatar: friend.avatarUrl || "", affectedActorIds: pair, affectedActorNicks: names, tournamentId, tournamentName: own.tournament, target: "profile" });
    }
  }
  return events.sort((a, b) => Date.parse(b.at) - Date.parse(a.at));
}

async function readState(accountId) {
  const result = await pipeline([["SMEMBERS", READ_PREFIX + accountId]], { context: "friend-news.read-state" });
  if (!result || !result[0] || result[0].error) throw new Error("read_state_unavailable");
  return Array.isArray(result[0].result) ? result[0].result : [];
}

async function markRead(accountId, ids) {
  const clean = [...new Set((Array.isArray(ids) ? ids : []).filter((id) => typeof id === "string" && id.length > 0 && id.length <= 1000))].slice(0, 500);
  if (!clean.length) return;
  const result = await pipeline([["SADD", READ_PREFIX + accountId, ...clean], ["EXPIRE", READ_PREFIX + accountId, String(120 * 86400)]], { context: "friend-news.mark-read" });
  if (!result || result.some((row) => row.error)) throw new Error("read_state_unavailable");
}

async function notifySharedResults() {
  if (!isConfigured()) return { ok: false, skipped: "redis" };
  const rows = require("./friend-tournament-results.json");
  const now = Date.now();
  // Only recently played events may generate push; older history is feed-only.
  const recentRows = rows.filter((row) => now - Date.parse(row.date + "+03:00") <= 3 * 86400000);
  if (!recentRows.length) return { ok: true, sent: 0 };
  const participants = new Set(recentRows.map((row) => nickKey(row.nick)));
  const profiles = await hscanall("poker_app:pokerplus_profiles");
  if (!profiles) throw new Error("profiles_unavailable");
  const accounts = new Set();
  for (const [id, raw] of Object.entries(profiles)) {
    let profile;
    try { profile = JSON.parse(raw); } catch (_) { continue; }
    const p = profile && (profile.data || profile.profile || profile);
    if (!p || !participants.has(nickKey(p.nickname || p.Nike || p.nick || p.name || p.displayName || p.display_name))) continue;
    const account = await resolveAccountId(id);
    if (account) accounts.add(account);
  }
  let sent = 0;
  for (const account of accounts) {
    const roster = await require("./api-handlers/friends").readNewsFriends(account, account);
    const events = buildSharedEvents(roster.self, roster.friends, recentRows, now);
    for (const event of events) {
      sent += await sendToMemberDevices(account, {
        title: "🤝 Вы с " + event.actorNick + " попали в призы",
        body: event.newsLines.join(". "),
        tag: event.id,
        kind: "friend_news",
        openUrl: "./?startapp=friend_news",
        dedupeKey: event.id,
        dedupeTtlSeconds: 180 * 86400,
      });
    }
  }
  return { ok: true, sent, accounts: accounts.size };
}

module.exports = { nickKey, buildSharedEvents, readState, markRead, notifySharedResults };
