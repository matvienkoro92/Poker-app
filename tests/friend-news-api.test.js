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
  const writes = [], fullReads = [];
  const handler = load("../lib/api-handlers/friend-news.js", {
    "../resolve-telegram-auth": { resolveTelegramIdentity: (req) => req.authed ? {} : null, memberIdFromIdentity: () => "mail_transport" },
    "../app-user-blocks": { rejectBlockedAppUser: async () => false },
    "../api-auth": { setCors() {} }, "../redis": { isConfigured: () => true },
    "./friends": { resolveNewsAccountId: async () => "ID400800", readNewsFriends: async () => ({ self: {}, friends: [] }) },
    "../friend-news": { buildSharedEvents: () => [], readTrackingSince: async () => "2026-09-10T10:00:00Z", readMembership: async (id, ids) => { assert.equal(id, "ID400800"); return ids.map(key => key === "read" ? "1" : "0").join(""); }, readState: async (id) => { fullReads.push(id); assert.equal(id, "ID400800"); return ["read"]; }, markRead: async (id, ids) => writes.push({ id, ids }) },
    "../friend-tournament-results.json": [],
  });
  const unauth = response(); await handler({ method: "POST", body: {} }, unauth); assert.equal(unauth.statusCode, 401);
  const feed = response(); await handler({ method: "POST", authed: true, body: { accountId: "ID999999" } }, feed);
  assert.equal(feed.body.accountId, "ID400800"); assert.equal(feed.body.readIds[0], "read");
  const scoped = response();
  await handler({method:"POST", authed:true, body:{action:"feed", scopedReadStatus:true}}, scoped);
  assert.equal(scoped.body.scopedReadStatus, true);
  assert.equal(scoped.body.readIds.length, 0);
  assert.equal(fullReads.length, 1);
  const status = response();
  await handler({method:"POST", authed:true, body:{action:"read-status", accountId:"wrong", ids:["new","read"]}}, status);
  assert.equal(status.body.membership, "01");
  const invalid = response();
  await handler({method:"POST", authed:true, body:{action:"read-status", ids:Array(501).fill("x")}}, invalid);
  assert.equal(invalid.statusCode, 400);
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
    "./friend-tournament-results.json": require("./helpers/september-friend-results.cjs"),
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

test("notification baseline is stable across devices and fails closed on storage errors", async () => {
  const values = new Map(); const calls = []; let fail = false;
  const mod = load("../lib/friend-news.js", {
    crypto, "./chat-webpush-notify": {}, "./account-id": {},
    "./redis": { pipeline: async commands => fail ? null : commands.map(([op,key,value]) => {
      calls.push(op);
      if(op === "SET" && !values.has(key)) { values.set(key,value); return {result:"OK"}; }
      return {result:op === "GET" ? values.get(key) : null};
    }) },
  });
  const first = await mod.readTrackingSince("ID400800");
  assert.deepEqual(calls, ["GET", "SET"]);
  calls.length = 0;
  assert.equal(await mod.readTrackingSince("ID400800"),first);
  assert.deepEqual(calls, ["GET"]);
  await mod.readTrackingSince("ID403173");
  assert.equal(values.size,2);
  fail=true;
  await assert.rejects(mod.readTrackingSince("ID400800"),/unavailable/);
});

test("two simultaneous first visits use the same Redis notification baseline", async () => {
  let baseline;
  const ops = [];
  const mod = load("../lib/friend-news.js", {
    crypto, "./chat-webpush-notify": {}, "./account-id": {},
    "./redis": { pipeline: async ([[op, , value, condition]]) => {
      ops.push(op);
      if (op === "GET") return [{result:baseline ?? null}];
      assert.equal(condition,"NX");
      if (baseline) return [{result:null}];
      baseline = value;
      return [{result:"OK"}];
    } },
  });
  const results = await Promise.all([mod.readTrackingSince("A"), mod.readTrackingSince("A")]);
  assert.deepEqual(results,[baseline,baseline]);
  assert.deepEqual(ops,["GET","GET","SET","SET","GET"]);
});

test("scoped receipts check only the supplied IDs and preserve order", async () => {
  const calls = [];
  const mod = load("../lib/friend-news.js", {
    crypto, "./chat-webpush-notify": {}, "./account-id": {},
    "./redis": { pipeline: async commands => { calls.push(...commands); return [{ result:[0,1,0] }]; } }
  });
  assert.equal(await mod.readMembership("A", []), "");
  assert.equal(await mod.readMembership("A", ["new","read","new2"]), "010");
  assert.deepEqual(Array.from(calls[0]), ["SMISMEMBER","poker_app:friend_news_read:A","new","read","new2"]);
  await assert.rejects(mod.readMembership("A", ["one"]), /unavailable/);
});
