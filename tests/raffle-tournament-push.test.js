"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const Module = require("node:module");
const path = require("node:path");
const { createTournamentPushService, SUBSCRIBERS_KEY } = require("../lib/raffle-tournament-push");

function fixture() {
  const subscribers = new Set();
  const disabled = new Set();
  const devices = new Set(["ID000001", "ID000002"]);
  const deliveries = [];
  let configured = true;
  const redisPipeline = async (commands) => commands.map(([cmd, key, id]) => {
    if (cmd === "SMEMBERS") return { result: [...subscribers] };
    if (cmd === "SISMEMBER") return { result: Number((key === SUBSCRIBERS_KEY ? subscribers : disabled).has(id)) };
    if (cmd === "HLEN") return { result: Number(devices.has(key.slice(4))) };
    if (cmd === "SADD") { subscribers.add(id); return { result: 1 }; }
    if (cmd === "SREM") { subscribers.delete(id); return { result: 1 }; }
    throw new Error("Unexpected command " + cmd);
  });
  const service = createTournamentPushService({ redisPipeline, disabledKey: "disabled", subscriptionPrefix: "sub:", pushConfigured: () => configured,
    sendToMemberDevices: async (id, payload) => { deliveries.push({ id, payload }); return 1; } });
  return { service, subscribers, disabled, devices, deliveries, setConfigured: (value) => { configured = value; } };
}

test("enabling requires profile notifications, a device and configured push; disabling always works", async () => {
  const f = fixture();
  f.disabled.add("ID000001");
  assert.equal((await f.service.setSubscription("ID000001", true)).code, "PROFILE_DISABLED");
  assert.equal(f.subscribers.size, 0);
  f.disabled.clear(); f.devices.clear();
  assert.equal((await f.service.setSubscription("ID000001", true)).code, "DEVICE_REQUIRED");
  f.devices.add("ID000001");
  assert.equal((await f.service.setSubscription("ID000001", true)).subscribed, true);
  f.setConfigured(false);
  assert.equal((await f.service.setSubscription("ID000001", true)).code, "PUSH_UNAVAILABLE");
  assert.equal((await f.service.setSubscription("ID000001", false)).subscribed, false);
  assert.equal(f.subscribers.size, 0);
});

test("creation targets only opted-in accounts still enabled in profile with a saved device", async () => {
  const f = fixture();
  f.subscribers.add("ID000001"); f.subscribers.add("ID000002"); f.subscribers.add("ID000003");
  f.disabled.add("ID000002");
  const raffle = { id: "raffle_123_abc", status: "active", prizeKind: "tournament_ticket", title: "Турнир" };
  await f.service.notifyCreated(raffle);
  assert.deepEqual(f.deliveries.map((row) => row.id), ["ID000001"]);
  assert.equal(f.deliveries[0].payload.openUrl, "./?startapp=r_raffle_123_abc");
  assert.equal(f.deliveries[0].payload.dedupeKey, "raffle-tournament-start:raffle_123_abc");
  await f.service.setSubscription("ID000001", false);
  await f.service.notifyCreated({ ...raffle, id: "next" });
  assert.equal(f.deliveries.length, 1);
});

test("cash, physical prizes and completed raffles do not send tournament start pushes", async () => {
  const f = fixture(); f.subscribers.add("ID000001");
  for (const prizeKind of ["cash", "prizes", ""]) await f.service.notifyCreated({ id: "one", status: "active", prizeKind });
  await f.service.notifyCreated({ id: "one", status: "drawn", prizeKind: "tournament_ticket" });
  assert.equal(f.deliveries.length, 0);
});

test("Redis errors fail closed instead of enabling notifications", async () => {
  const service = createTournamentPushService({ redisPipeline: async () => [{ error: "unavailable" }], pushConfigured: () => true });
  await assert.rejects(service.setSubscription("ID000001", true), /проверить/);
  await assert.rejects(service.setSubscription("ID000001", false), /сохранить/);
});

test("creation sends only after persistence, skips failed writes, and keeps a saved raffle on push failure", async () => {
  const filename = require.resolve("../lib/api-handlers/raffles");
  const source = fs.readFileSync(filename, "utf8");
  const start = source.indexOf("async function persistCreatedRaffle(");
  const end = source.indexOf("\nasync function updateRaffleActiveIndex", start);
  const vm = require("node:vm");
  const events = [];
  let failWrite = false, failPush = false;
  const context = {
    dailyRecurrence: () => null,
    RAFFLE_IDS_KEY: "ids", RAFFLE_PREFIX: "raffle:", RAFFLE_PUBLIC_LIST_CACHE_KEY: "cache", RAFFLE_SUMMARY_CACHE_KEY: "summary",
    RAFFLE_ARCHIVE_INDEX_CACHE_KEY: "archive", RAFFLE_ACTIVE_IDS_KEY: "active", RAFFLE_ACTIVE_INDEX_READY_KEY: "ready",
    redisPipeline: async () => { events.push("write"); return [{ result: failWrite ? null : "OK", error: failWrite ? "failed" : undefined }]; },
    require: () => ({ defaultService: () => ({ notifyCreated: async () => { events.push("push"); if (failPush) throw new Error("offline"); } }) }),
    console: { error: () => {} },
  };
  vm.createContext(context); vm.runInContext(source.slice(start, end), context);
  const raffle = { id: "one", status: "active", prizeKind: "tournament_ticket" };
  assert.equal((await context.persistCreatedRaffle(raffle, "idem")).ok, true);
  assert.deepEqual(events, ["write", "write", "push"]);
  events.length = 0; failWrite = true;
  assert.equal((await context.persistCreatedRaffle(raffle)).ok, false);
  assert.deepEqual(events, ["write"]);
  failWrite = false; failPush = true;
  assert.equal((await context.persistCreatedRaffle(raffle)).ok, true);
});

test("subscription endpoint uses authenticated canonical account, never body accountId", async () => {
  const filename = require.resolve("../lib/api-handlers/raffle-tournament-push");
  const mod = new Module(filename, module); mod.filename = filename; mod.paths = Module._nodeModulePaths(path.dirname(filename));
  let identity = { id: 123 }, recorded;
  mod.require = (name) => ({
    "../resolve-telegram-auth": { resolveTelegramIdentity: () => identity, memberIdFromIdentity: () => "tg_123" },
    "../account-id": { ensureDtIdForUserId: async () => "ID000001" },
    "../app-user-blocks": { rejectBlockedAppUser: async () => false },
    "../redis": { isConfigured: () => true },
    "../raffle-tournament-push": { defaultService: () => ({ setSubscription: async (id, enabled) => { recorded = id; return { ok: true, subscribed: enabled }; } }) },
  })[name];
  mod._compile(fs.readFileSync(filename, "utf8"), filename);
  let status, data;
  const res = { setHeader() {}, status(value) { status = value; return this; }, json(value) { data = value; } };
  const req = { method: "POST", body: { action: "enable", accountId: "ID999999" } };
  await mod.exports(req, res);
  assert.equal(recorded, "ID000001"); assert.equal(status, 200); assert.equal(data.subscribed, true);
  identity = null; recorded = null;
  await mod.exports(req, res);
  assert.equal(status, 401); assert.equal(recorded, null);
});
