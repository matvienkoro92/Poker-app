"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const fs = require("node:fs");
const crypto = require("node:crypto");

function load(file, mocks, extras = {}) {
  const context = { module: { exports: {} }, require: (id) => {
    if (id in mocks) return mocks[id];
    throw new Error("Unexpected dependency " + id);
  }, console, process: { env: {} }, ...extras };
  vm.runInNewContext(fs.readFileSync(require.resolve(file), "utf8"), context);
  return context.module.exports;
}

function response() {
  return { statusCode: 200, setHeader() {}, status(n) { this.statusCode = n; return this; }, json(data) { this.body = data; return this; }, end() { return this; } };
}

test("feed and read receipts use authenticated canonical account, never client accountId", async () => {
  const writes = [];
  const handler = load("../lib/api-handlers/friend-news.js", {
    "../resolve-telegram-auth": { resolveTelegramIdentity: (req) => req.authed ? {} : null, memberIdFromIdentity: () => "mail_transport" },
    "../app-user-blocks": { rejectBlockedAppUser: async () => false },
    "../api-auth": { setCors() {} }, "../redis": { isConfigured: () => true },
    "./friends": { resolveNewsAccountId: async () => "ID400800", readNewsFriends: async () => ({ self: {}, friends: [] }) },
    "../friend-news": { buildSharedEvents: () => [], readState: async (id) => { assert.equal(id, "ID400800"); return ["read"]; }, markRead: async (id, ids) => writes.push({ id, ids }) },
    "../friend-tournament-results.json": [],
  });
  const unauth = response(); await handler({ method: "POST", body: {} }, unauth); assert.equal(unauth.statusCode, 401);
  const feed = response(); await handler({ method: "POST", authed: true, body: { accountId: "ID999999" } }, feed);
  assert.equal(feed.body.accountId, "ID400800"); assert.equal(feed.body.readIds[0], "read");
  const read = response(); await handler({ method: "POST", authed: true, body: { action: "read", accountId: "ID999999", ids: ["one"] } }, read);
  assert.equal(writes[0].id, "ID400800"); assert.equal(writes[0].ids[0], "one");
});

test("read receipt storage is account-scoped, validates input and surfaces Redis failures", async () => {
  const commands = [];
  let fail = false;
  const mod = load("../lib/friend-news.js", {
    crypto,
    "./redis": { pipeline: async (rows) => { commands.push(rows); return fail ? null : rows.map(() => ({ result: [] })); } },
    "./chat-webpush-notify": {}, "./account-id": {},
  });
  await mod.markRead("ID400800", ["one", "one", "", 4, "x".repeat(1001)]);
  assert.equal(commands[0][0][1], "poker_app:friend_news_read:ID400800");
  assert.equal(commands[0][0].length, 3);
  fail = true;
  await assert.rejects(mod.readState("ID400800"), /unavailable/);
  await assert.rejects(mod.markRead("ID400800", ["two"]), /unavailable/);
});

test("push is per participant, uses stable dedupe key and excludes old results", async () => {
  const now = Date.parse("2026-09-10T12:00:00Z");
  const a = { userId: "ID400800", pokerPlusNickname: "ПокерМанки" };
  const b = { userId: "ID403173", pokerPlusNickname: "Waaar" };
  const sent = [];
  const seen = new Set();
  const mod = load("../lib/friend-news.js", {
    crypto,
    "./redis": { isConfigured: () => true, hscanall: async () => ({ [a.userId]: JSON.stringify({ nickname: a.pokerPlusNickname }), [b.userId]: JSON.stringify({ nickname: b.pokerPlusNickname }) }) },
    "./account-id": { resolveAccountId: async (id) => id },
    "./api-handlers/friends": { readNewsFriends: async (id) => ({ self: id === a.userId ? a : b, friends: [id === a.userId ? b : a] }) },
    "./friend-tournament-results.json": require("../lib/friend-tournament-results.json"),
    "./chat-webpush-notify": { sendToMemberDevices: async (id, payload) => {
      const key = id + payload.dedupeKey;
      if (seen.has(key)) return 0;
      seen.add(key); sent.push({ id, payload }); return 1;
    } },
  }, { Date: class extends Date { static now() { return now; } } });
  assert.equal((await mod.notifySharedResults()).sent, 2);
  assert.equal((await mod.notifySharedResults()).sent, 0);
  assert.equal(sent.length, 2);
  assert.ok(sent.every((row) => row.payload.openUrl === "./?startapp=friend_news"));
  assert.equal(sent[0].payload.dedupeKey, sent[1].payload.dedupeKey);
});

test("cron cannot send notifications without its server secret", async () => {
  let calls = 0;
  const handler = load("../lib/api-handlers/cron-friend-news.js", {
    "../friend-news": { notifySharedResults: async () => { calls++; return { ok: true }; } },
  }, { process: { env: { CRON_SECRET: "test-secret" } } });
  const denied = response(); await handler({ method: "GET", headers: {} }, denied);
  assert.equal(denied.statusCode, 403); assert.equal(calls, 0);
  const allowed = response(); await handler({ method: "GET", headers: { authorization: "Bearer test-secret" } }, allowed);
  assert.equal(allowed.statusCode, 200); assert.equal(calls, 1);
});
