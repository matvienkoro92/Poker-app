"use strict";

const assert = require("assert");

process.env.UPSTASH_REDIS_REST_URL = "https://analytics-test.invalid";
process.env.UPSTASH_REDIS_REST_TOKEN = "test";

const strings = new Map();
const hashes = new Map();
const sets = new Map();

function hash(key) {
  if (!hashes.has(key)) hashes.set(key, new Map());
  return hashes.get(key);
}

function set(key) {
  if (!sets.has(key)) sets.set(key, new Set());
  return sets.get(key);
}

function redis(command) {
  const [op, key, ...args] = command;
  if (op === "SET") {
    if (args.includes("NX") && strings.has(key)) return null;
    strings.set(key, args[0]);
    return "OK";
  }
  if (op === "SETNX") {
    if (strings.has(key)) return 0;
    strings.set(key, args[0]);
    return 1;
  }
  if (op === "GET") return strings.get(key) || null;
  if (op === "SADD") {
    let added = 0;
    args.forEach((value) => {
      if (!set(key).has(value)) {
        set(key).add(value);
        added += 1;
      }
    });
    return added;
  }
  if (op === "SMEMBERS") return Array.from(set(key));
  if (op === "HSET" || op === "HSETNX") {
    const [field, value] = args;
    if (op === "HSETNX" && hash(key).has(field)) return 0;
    const isNew = !hash(key).has(field);
    hash(key).set(field, value);
    return isNew ? 1 : 0;
  }
  if (op === "HGET") return hash(key).get(args[0]) || null;
  if (op === "HMGET") return args.map((field) => hash(key).get(field) || null);
  if (op === "HGETALL") {
    const out = [];
    hash(key).forEach((value, field) => out.push(field, value));
    return out;
  }
  throw new Error("Unsupported Redis command in analytics test: " + op);
}

global.fetch = async function (_url, options) {
  const commands = JSON.parse(options.body);
  return { ok: true, json: async () => commands.map((command) => ({ result: redis(command) })) };
};

const analytics = require("../lib/analytics-tracking");

async function main() {
  const realNow = Date.now;
  let now = Date.UTC(2026, 6, 9, 12, 0, 0);
  Date.now = () => now;
  const installation = "ins_analytics_test_1";
  const firstSession = "ses_analytics_test_1";

  await analytics.recordAnalyticsEvent({ installationId: installation, sessionId: firstSession, eventId: "evt_session_test_1", type: "session_started" });
  await analytics.recordAnalyticsEvent({ installationId: installation, sessionId: firstSession, eventId: "evt_section_test_1", type: "section_opened", section: "home" });
  const duplicate = await analytics.recordAnalyticsEvent({ installationId: installation, sessionId: firstSession, eventId: "evt_section_test_1", type: "section_opened", section: "home" });
  assert.strictEqual(duplicate.duplicate, true, "event retries are idempotent");

  await analytics.recordAnalyticsEvent({ installationId: installation, sessionId: firstSession, eventId: "evt_auth_test_1", type: "session_started", accountId: "ID123456" });
  now += 86400000;
  await analytics.recordAnalyticsEvent({ installationId: installation, sessionId: "ses_analytics_test_2", eventId: "evt_session_test_2", type: "session_started", accountId: "ID123456" });
  await analytics.recordAnalyticsEvent({ installationId: installation, sessionId: "ses_analytics_test_2", eventId: "evt_section_test_2", type: "section_opened", section: "home", accountId: "ID123456" });
  await analytics.recordAnalyticsEvent({ installationId: installation, sessionId: "ses_analytics_test_2", eventId: "evt_spin_test_1", type: "daily_poker_spin", accountId: "ID123456" });

  // This account existed before the tracked installation. Opening the app on a
  // new device must not turn an existing person into a new visitor.
  hash("poker_app:id_to_user").set("ID123456", "tg_123456");
  hash("poker_app:visitor_first_seen").set("tg_123456", String(Date.UTC(2026, 5, 1, 12, 0, 0)));

  const summary = await analytics.readAnalyticsSummary({
    from: "2026-07-09",
    to: "2026-07-10",
    fromMs: Date.UTC(2026, 6, 8, 21, 0, 0),
    toMs: Date.UTC(2026, 6, 10, 20, 59, 59, 999),
  });
  assert.strictEqual(summary.uniqueVisitors, 1, "guest and registered identity are merged");
  assert.strictEqual(summary.guestInstallations, 1, "guest state at first session is preserved");
  assert.strictEqual(summary.registeredVisitors, 1, "verified visitor is counted once");
  assert.strictEqual(summary.sessions, 2, "session rewrites do not duplicate visits");
  assert.strictEqual(summary.returningVisitors, 1, "returning means sessions on two dates");
  assert.strictEqual(summary.guestConverted, 1, "guest-to-account conversion is retained");
  assert.strictEqual(summary.guestConversionRate, 100, "conversion rate uses deduplicated guest audience");
  assert.strictEqual(summary.averageSessionsBeforeRegistration, 1, "sessions before registration are calculated");
  assert.strictEqual(summary.newVisitors, 0, "existing account on a new installation is not counted as a new person");
  assert.strictEqual(summary.sections[0].events, 2, "section opens remain event counts");
  assert.strictEqual(summary.sections[0].uniqueVisitors, 1, "section audience is canonicalized");
  assert.strictEqual(summary.activities[0].name, "daily_poker_spin");
  assert.strictEqual(summary.daily.reduce((sum, row) => sum + row.participations, 0), 1, "participations are available for the chart");
  Date.now = realNow;
  console.log("Analytics tracking tests passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
