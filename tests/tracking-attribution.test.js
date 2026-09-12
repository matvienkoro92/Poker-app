"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const hashes = new Map(), sets = new Map(), lists = new Map();
const h = key => { if (!hashes.has(key)) hashes.set(key, new Map()); return hashes.get(key); };
const s = key => { if (!sets.has(key)) sets.set(key, new Set()); return sets.get(key); };
function command([op, key, ...args]) {
  if (op === "HGET") return h(key).get(args[0]) || null;
  if (op === "HMGET") return args.map(f => h(key).get(f) || null);
  if (op === "HSET" || op === "HSETNX") { if (op === "HSETNX" && h(key).has(args[0])) return 0; h(key).set(args[0], args[1]); return 1; }
  if (op === "SADD") { s(key).add(args[0]); return 1; }
  if (op === "LRANGE") return lists.get(key) || [];
  if (op === "HSCAN") return ["0", [...h(key).entries()].flat()];
  throw new Error(op);
}
const redisPath = require.resolve("../lib/redis");
require.cache[redisPath] = { id: redisPath, filename: redisPath, loaded: true, exports: {
  pipeline: async commands => commands.map(c => ({ result: command(c) })),
  sscanall: async key => [...s(key)],
} };
let conflictOnce = false;
const atomicPath = require.resolve("../lib/redis-atomic");
require.cache[atomicPath] = { id: atomicPath, filename: atomicPath, loaded: true, exports: {
  atomicWrite: async (commands, opts) => {
    if (conflictOnce) { conflictOnce = false; throw new Error("value_changed"); }
    for (const guard of opts.values) assert.equal(h(guard.key).get(guard.field) || "", guard.value);
    commands.forEach(command);
  },
} };
const attribution = require("../lib/tracking-attribution");
const P = "poker_app:attribution:v1:";
let now = 1700000000000, sequence = 0;
const event = (overrides = {}) => ({ installationId: "ins_person_one", sessionId: "ses_first_visit", eventId: "evt_unique_" + ++sequence, type: "section_opened", section: "home", ...overrides });

test("persistent source, verified identity, repeat visits, account isolation, CRM and durable timeline", async () => {
  const originalNow = Date.now;
  Date.now = () => now;
  try {
    h("poker_app:track_links:meta").set("aaaaaaaa", JSON.stringify({ label: "Channel A" }));
    h("poker_app:track_links:meta").set("bbbbbbbb", JSON.stringify({ label: "Channel B" }));
    await attribution.recordAttribution(event({ ref: "ref_deadbeef" }));
    assert.equal(h(P + "contexts").size, 0, "unknown sources are not accepted");
    const first = event({ ref: "ref_aaaaaaaa" });
    conflictOnce = true;
    await attribution.recordAttribution(first);
    await attribution.recordAttribution(first);
    assert.equal(h(P + "events:ins_person_one").size, 1, "retries cannot duplicate the journey");
    const firstAt = now;
    now += 10000;
    await attribution.recordAttribution(event({ accountId: "ID123456", type: "registration_completed" }));
    assert.equal(JSON.parse(h(P + "contexts").get("ID123456")).first.at, firstAt, "guest source transfers on verified login");
    now += 10000;
    await attribution.recordAttribution(event({ installationId: "ins_second_device", accountId: "ID123456", sessionId: "ses_second_visit" }));
    assert.equal(JSON.parse(h(P + "contexts").get("ID123456")).first.ref, "aaaaaaaa", "direct return on another device retains the source");
    now += 10000;
    await attribution.recordAttribution(event({ accountId: "ID123456", sessionId: "ses_third_visit", ref: "ref_bbbbbbbb" }));
    const context = JSON.parse(h(P + "contexts").get("ID123456"));
    assert.equal(context.first.ref, "aaaaaaaa");
    assert.equal(context.last.ref, "bbbbbbbb");
    await attribution.recordAttribution(event({ accountId: "ID999999" }));
    assert.equal(h(P + "contexts").has("ID999999"), false, "another account on the same device does not inherit a source");
    h("poker_app:email_linked_at").set("ID123456", new Date(firstAt + 5000).toISOString());
    h("poker_app:pokerplus_user_ids").set("ID123456", "7788");
    h("poker_app:id_to_user").set("ID123456", "tg_123456");
    const deposit = { id: "deposit_1", type: "deposit", at: new Date(now).toISOString(), amount: 1500 };
    lists.set("poker_app:crm_activity_events:ID123456", [JSON.stringify(deposit), JSON.stringify({ ...deposit, id: "before", at: new Date(firstAt - 1).toISOString() })]);
    lists.set("poker_app:crm_activity_events:tg_123456", [JSON.stringify(deposit)]);
    const sourceA = await attribution.readJourneys("aaaaaaaa");
    assert.equal(sourceA.total, 1, "guest and account count as one person");
    assert.equal(sourceA.rows[0].status, "new");
    assert.equal(sourceA.rows[0].pokerId, "7788");
    assert.equal(sourceA.rows[0].depositCount, 1, "alias duplicates and deposits before acquisition are excluded");
    assert.equal(sourceA.rows[0].depositAmount, 1500);
    const sourceB = await attribution.readJourneys("bbbbbbbb");
    assert.equal(sourceB.rows[0].depositAmount, 0, "a second campaign does not claim the same acquisition deposit");
    let cursor = "0", timeline = [];
    do { const page = await attribution.readTimeline("aaaaaaaa", "ID123456", cursor); timeline.push(...page.events); cursor = page.cursor; } while (cursor);
    assert.equal(timeline.filter(e => !e.verified).length, 4, "history includes the guest, registration and second device");
    await assert.rejects(() => attribution.readTimeline("aaaaaaaa", "ID999999"), /invalid_actor/);
    for (let i = 0; i < 30; i++) await attribution.recordAttribution(event({ accountId: "ID123456" }));
    assert.ok(h(P + "events:ID123456").size > 25, "the old 25-event trim is not used");
  } finally { Date.now = originalNow; }
});

test("malformed deposit values are excluded", () => {
  const rows = [NaN, Infinity, -20, 0, 100].map((amount, i) => JSON.stringify({ id: String(i), type: "deposit", at: "2026-09-12", amount }));
  assert.equal(attribution.depositRows(rows, 0).length, 1);
});

test("browser analytics passes source and retries the same event ID", async () => {
  const vm = require("node:vm"), fs = require("node:fs");
  const storage = new Map(), sent = [];
  const scope = {
    window: { addEventListener() {}, crypto: require("node:crypto").webcrypto },
    localStorage: { getItem: k => storage.get(k), setItem: (k,v) => storage.set(k,v) },
    getInstallationId: () => "ins_client_test", getVisitorId: () => "guest_test",
    getApiBase: () => "https://test.invalid", getPokerTrackingRefFromEnv: () => "ref_aaaaaaaa",
    fetch: async (_url, opts) => { sent.push(JSON.parse(opts.body)); return { status: sent.length === 1 ? 503 : 200, json: async () => ({ok:true}) }; },
  };
  vm.runInNewContext(fs.readFileSync(require.resolve("../app-analytics.js"), "utf8"), scope);
  await scope.window.pokerTrackAnalyticsEvent("section_opened", {section:"cashout"});
  assert.equal(sent.length, 3);
  assert.equal(sent[0].event_id, sent[1].event_id);
  assert.equal(sent[2].tracking_ref, "ref_aaaaaaaa");
});
