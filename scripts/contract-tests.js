#!/usr/bin/env node
"use strict";

const assert = require("assert");
const crypto = require("crypto");
const path = require("path");

const root = path.join(__dirname, "..");
const BOT_TOKEN = "contract-test-bot-token";
const MSK_OFFSET_MS = 3 * 60 * 60 * 1000;
const DAILY_CASH_START_TIME = "20:16";
const DAILY_CASH_DURATION_MS = (23 * 60 + 59) * 60 * 1000;
const DAILY_CASH_SERIES_ID = "raffle_daily_cash_20_40_20_15";

function contractMoscowParts(date) {
  const d = new Date(date.getTime() + MSK_OFFSET_MS);
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
  };
}

function contractMoscowDateTimeToUtc(parts, time) {
  const [hh, mm] = String(time).split(":").map((n) => parseInt(n, 10) || 0);
  return new Date(Date.UTC(parts.year, parts.month - 1, parts.day, hh - 3, mm, 0, 0));
}

function contractMoscowStartOnOrBefore(date, time) {
  const parts = contractMoscowParts(date);
  let start = contractMoscowDateTimeToUtc(parts, time);
  if (start > date) {
    start = contractMoscowDateTimeToUtc({ year: parts.year, month: parts.month, day: parts.day - 1 }, time);
  }
  return start;
}

async function testRaffleCurrentWeekReturnsCalculation(redis) {
  const raffles = loadHandler("raffles");
  const {
    currentMoscowWeekRange,
    currentWeekRaffleWinnerReturnAmount,
    currentWeekRaffleIssueTotalsFromRaffles,
  } = raffles._test;
  const range = currentMoscowWeekRange(new Date("2026-07-25T12:00:00.000Z"));
  assert.strictEqual(
    new Date(range.startMs).toISOString(),
    "2026-07-20T03:00:00.000Z",
    "raffle week starts Monday at 06:00 Moscow"
  );
  const raffle = {
    drawnAt: "2026-07-26T17:15:00.000Z",
    groups: [
      { prize: "Беккинг-билет 500 ₽ — Magic MKO" },
      { prize: "Беккинг-байин 1000 ₽ на кеш 20/40" },
    ],
  };

  assert.strictEqual(currentWeekRaffleWinnerReturnAmount(raffle, {
    groupIndex: 0,
    winnerSeatStatus: "not_seated",
    winnerSeatStatusAt: "2026-07-27T10:42:06.930Z",
  }, range), 0, "return follows the status-edit date and stays out of an earlier week");

  assert.strictEqual(currentWeekRaffleWinnerReturnAmount(raffle, {
    groupIndex: 1,
    winnerSeatStatus: "not_seated",
    winnerSeatStatusAt: "2026-07-21T18:17:36.527Z",
    winnerReroll: true,
  }, range), 1000, "issued reroll return is counted as a real return");

  assert.strictEqual(currentWeekRaffleWinnerReturnAmount(raffle, {
    groupIndex: 1,
    winnerSeatStatus: "seated",
    winnerCashoutStatus: "plus",
    winnerCashoutAmount: 2635,
    winnerCashoutAt: "2026-07-23T22:33:20.669Z",
  }, range), 2635, "cashout return keeps the stored amount");

  assert.strictEqual(currentWeekRaffleWinnerReturnAmount({
    ...raffle,
    drawnAt: "2026-07-19T20:59:59.999Z",
  }, {
    groupIndex: 1,
    winnerSeatStatus: "not_seated",
    winnerSeatStatusAt: "2026-07-20T14:00:00.000Z",
  }, range), 1000, "a return added this week is included even when the raffle was drawn earlier");

  const totals = currentWeekRaffleIssueTotalsFromRaffles([{
    prizeKind: "tournament_ticket",
    drawnAt: "2026-07-26T17:15:00.000Z",
    groups: raffle.groups,
    winners: [
      {
        groupIndex: 0,
        winnerStatus: "ok",
        winnerStatusAt: "2026-07-20T12:00:00.000Z",
        winnerSeatStatus: "not_seated",
        winnerSeatStatusAt: "2026-07-20T14:42:06.930Z",
      },
      {
        groupIndex: 0,
        winnerStatus: "ok",
        winnerStatusAt: "2026-07-20T12:00:00.000Z",
        winnerSeatStatus: "seated",
        winnerCashoutStatus: "plus",
        winnerCashoutAmount: 2635,
        winnerCashoutAt: "2026-07-23T22:33:20.669Z",
      },
      {
        groupIndex: 0,
        winnerStatus: "ok",
        winnerStatusAt: "2026-07-20T12:00:00.000Z",
        winnerSeatStatus: "not_seated",
        winnerSeatStatusAt: "2026-07-20T14:42:06.930Z",
        winnerReroll: true,
      },
    ],
  }], new Date("2026-07-25T12:00:00.000Z"));
  assert.deepStrictEqual(totals.ticket, { issued: 1500, returned: 3635 }, "issued rerolls remain part of the weekly totals");
  assert.deepStrictEqual(totals.cash, { issued: 0, returned: 0 }, "returns stay grouped by the source raffle type");
  assert.strictEqual(totals.returnCount, 3, "issued reroll return is included in the count");

  const cashTotals = currentWeekRaffleIssueTotalsFromRaffles([{
    prizeKind: "cash",
    drawnAt: "2026-07-19T20:59:59.999Z",
    groups: raffle.groups,
    winners: [{
      groupIndex: 1,
      winnerStatus: "ok",
      winnerStatusAt: "2026-07-19T21:00:00.000Z",
      winnerSeatStatus: "seated",
      winnerCashoutStatus: "plus",
      winnerCashoutAmount: 2500,
      winnerCashoutAt: "2026-07-23T12:00:00.000Z",
    }],
  }], new Date("2026-07-25T12:00:00.000Z"));
  assert.deepStrictEqual(cashTotals.cash, { issued: 0, returned: 2500 }, "cashout amount is added to the week when the admin entered it");

  const liveRange = currentMoscowWeekRange(new Date());
  const weekCacheKey = "poker_app:raffles_week_issue_totals:v2:" + new Date(liveRange.startMs).toISOString();
  const followupRaffleId = "contract-followup-cache";
  redis.kv.set(weekCacheKey, JSON.stringify({ ticket: { issued: 0, returned: 0 }, cash: { issued: 0, returned: 0 } }));
  redis.kv.set("poker_app:raffle:" + followupRaffleId, JSON.stringify({
    id: followupRaffleId,
    status: "completed",
    prizeKind: "cash",
    drawnAt: new Date(liveRange.startMs - 86400000).toISOString(),
    groups: [{ prize: "Кеш 2500 ₽" }],
    winners: [{
      userId: "tg_1001",
      groupIndex: 0,
      winnerStatus: "ok",
      winnerReadySlotId: "initial_0",
      winnerSeatStatus: "seated",
    }],
  }));
  const followupResponse = await call(raffles, req("POST", {}, {
    pwaSession: sessions().admin,
    action: "setWinnerFollowup",
    raffleId: followupRaffleId,
    winnerUserId: "tg_1001",
    winnerSlotId: "initial_0",
    kind: "outcome",
    value: "plus",
    amount: 2500,
  }));
  assert.strictEqual(followupResponse.statusCode, 200, "cashout follow-up saves successfully");
  assert.strictEqual(followupResponse.body && followupResponse.body.ok, true, "cashout follow-up returns success");
  assert.strictEqual(redis.kv.has(weekCacheKey), false, "cashout follow-up invalidates the weekly totals cache: " + JSON.stringify([...redis.kv.keys()].filter((key) => key.includes("week_issue"))));
}

process.env.UPSTASH_REDIS_REST_URL = "https://mock-redis.local";
process.env.UPSTASH_REDIS_REST_TOKEN = "mock-token";
process.env.TELEGRAM_BOT_TOKEN = BOT_TOKEN;
process.env.TELEGRAM_ADMIN_ID = "388008256";
process.env.RAFFLE_READY_ROMAN_ADMIN_IDS = "388008256";
process.env.CLUB_CHAT_REQUIRE_APPLICATION = "0";
process.env.CRON_SECRET = "contract-cron-secret";
process.env.MINI_APP_URL = "https://t.me/Poker_dvatuza_bot/DvaTuza";
process.env.NODE_ENV = "test";

class MemoryRedis {
  constructor() {
    this.kv = new Map();
    this.hash = new Map();
    this.sets = new Map();
    this.zsets = new Map();
    this.lists = new Map();
  }

  h(key) {
    if (!this.hash.has(key)) this.hash.set(key, new Map());
    return this.hash.get(key);
  }

  s(key) {
    if (!this.sets.has(key)) this.sets.set(key, new Set());
    return this.sets.get(key);
  }

  z(key) {
    if (!this.zsets.has(key)) this.zsets.set(key, new Map());
    return this.zsets.get(key);
  }

  l(key) {
    if (!this.lists.has(key)) this.lists.set(key, []);
    return this.lists.get(key);
  }

  result(value) {
    return { result: value };
  }

  exec(command) {
    const cmd = String(command[0] || "").toUpperCase();
    const key = command[1] != null ? String(command[1]) : "";
    if (cmd === "GET") return this.result(this.kv.has(key) ? this.kv.get(key) : null);
    if (cmd === "MGET") {
      return this.result(command.slice(1).map((item) => {
        const itemKey = String(item);
        return this.kv.has(itemKey) ? this.kv.get(itemKey) : null;
      }));
    }
    if (cmd === "SET") {
      const opts = command.slice(3).map((item) => String(item || "").toUpperCase());
      if (opts.includes("NX") && this.kv.has(key)) return this.result(null);
      this.kv.set(key, String(command[2] == null ? "" : command[2]));
      return this.result("OK");
    }
    if (cmd === "SETEX") {
      this.kv.set(key, String(command[3] == null ? "" : command[3]));
      return this.result("OK");
    }
    if (cmd === "INCR") {
      const next = (parseInt(this.kv.get(key) || "0", 10) || 0) + 1;
      this.kv.set(key, String(next));
      return this.result(next);
    }
    if (cmd === "INCRBY") {
      const next = (parseInt(this.kv.get(key) || "0", 10) || 0) + (parseInt(command[2], 10) || 0);
      this.kv.set(key, String(next));
      return this.result(next);
    }
    if (cmd === "DEL") {
      let n = 0;
      for (let i = 1; i < command.length; i += 1) {
        const k = String(command[i]);
        if (this.kv.delete(k)) n += 1;
        if (this.hash.delete(k)) n += 1;
        if (this.sets.delete(k)) n += 1;
        if (this.zsets.delete(k)) n += 1;
        if (this.lists.delete(k)) n += 1;
      }
      return this.result(n);
    }
    if (cmd === "EVAL") {
      const keyCount = Math.max(0, parseInt(command[2], 10) || 0);
      const keys = command.slice(3, 3 + keyCount).map(String);
      const args = command.slice(3 + keyCount).map(String);
      if (
        /redis\.call\(['"]get['"]/.test(String(command[1] || "")) &&
        /redis\.call\(['"]del['"]/.test(String(command[1] || "")) &&
        keys[0] &&
        this.kv.get(keys[0]) === args[0]
      ) {
        this.kv.delete(keys[0]);
        return this.result(1);
      }
      return this.result(0);
    }
    if (cmd === "HGET") return this.result(this.h(key).has(String(command[2])) ? this.h(key).get(String(command[2])) : null);
    if (cmd === "HSET") {
      const h = this.h(key);
      let count = 0;
      for (let i = 2; i < command.length; i += 2) {
        const field = String(command[i]);
        if (!h.has(field)) count += 1;
        h.set(field, String(command[i + 1] == null ? "" : command[i + 1]));
      }
      return this.result(count);
    }
    if (cmd === "HSETNX") {
      const h = this.h(key);
      const field = String(command[2]);
      if (h.has(field)) return this.result(0);
      h.set(field, String(command[3] == null ? "" : command[3]));
      return this.result(1);
    }
    if (cmd === "HDEL") {
      const h = this.h(key);
      let count = 0;
      for (let i = 2; i < command.length; i += 1) if (h.delete(String(command[i]))) count += 1;
      return this.result(count);
    }
    if (cmd === "HINCRBY") {
      const h = this.h(key);
      const field = String(command[2]);
      const next = (parseInt(h.get(field) || "0", 10) || 0) + (parseInt(command[3], 10) || 0);
      h.set(field, String(next));
      return this.result(next);
    }
    if (cmd === "HGETALL") {
      const out = [];
      for (const [field, value] of this.h(key).entries()) out.push(field, value);
      return this.result(out);
    }
    if (cmd === "HSCAN") {
      const cursor = Math.max(0, parseInt(command[2], 10) || 0);
      const countIndex = command.findIndex((value) => String(value).toUpperCase() === "COUNT");
      const count = countIndex >= 0 ? Math.max(1, parseInt(command[countIndex + 1], 10) || 10) : 10;
      const entries = Array.from(this.h(key).entries());
      const page = entries.slice(cursor, cursor + count);
      const next = cursor + page.length >= entries.length ? "0" : String(cursor + page.length);
      return this.result([next, page.flat()]);
    }
    if (cmd === "HMGET") {
      const h = this.h(key);
      return this.result(command.slice(2).map((field) => h.has(String(field)) ? h.get(String(field)) : null));
    }
    if (cmd === "HLEN") return this.result(this.h(key).size);
    if (cmd === "LPUSH") {
      const l = this.l(key);
      for (let i = 2; i < command.length; i += 1) l.unshift(String(command[i]));
      return this.result(l.length);
    }
    if (cmd === "RPUSH") {
      const l = this.l(key);
      for (let i = 2; i < command.length; i += 1) l.push(String(command[i]));
      return this.result(l.length);
    }
    if (cmd === "LRANGE") {
      const l = this.l(key);
      let start = parseInt(command[2], 10) || 0;
      let stop = parseInt(command[3], 10);
      if (start < 0) start = l.length + start;
      if (stop < 0) stop = l.length + stop;
      return this.result(l.slice(Math.max(0, start), stop + 1));
    }
    if (cmd === "LTRIM") {
      const l = this.l(key);
      let start = parseInt(command[2], 10) || 0;
      let stop = parseInt(command[3], 10);
      if (start < 0) start = l.length + start;
      if (stop < 0) stop = l.length + stop;
      this.lists.set(key, l.slice(Math.max(0, start), stop + 1));
      return this.result("OK");
    }
    if (cmd === "LINDEX") {
      const l = this.l(key);
      let idx = parseInt(command[2], 10) || 0;
      if (idx < 0) idx = l.length + idx;
      return this.result(l[idx] == null ? null : l[idx]);
    }
    if (cmd === "LSET") {
      const l = this.l(key);
      let idx = parseInt(command[2], 10) || 0;
      if (idx < 0) idx = l.length + idx;
      if (idx < 0 || idx >= l.length) return { error: "index out of range" };
      l[idx] = String(command[3]);
      return this.result("OK");
    }
    if (cmd === "LREM") {
      const l = this.l(key);
      const value = String(command[3]);
      const before = l.length;
      this.lists.set(key, l.filter((item) => item !== value));
      return this.result(before - this.lists.get(key).length);
    }
    if (cmd === "LPOS") {
      const idx = this.l(key).indexOf(String(command[2]));
      return this.result(idx >= 0 ? idx : null);
    }
    if (cmd === "LLEN") return this.result(this.l(key).length);
    if (cmd === "SADD") {
      const s = this.s(key);
      let count = 0;
      for (let i = 2; i < command.length; i += 1) {
        const size = s.size;
        s.add(String(command[i]));
        if (s.size > size) count += 1;
      }
      return this.result(count);
    }
    if (cmd === "SREM") {
      const s = this.s(key);
      let count = 0;
      for (let i = 2; i < command.length; i += 1) if (s.delete(String(command[i]))) count += 1;
      return this.result(count);
    }
    if (cmd === "SISMEMBER") return this.result(this.s(key).has(String(command[2])) ? 1 : 0);
    if (cmd === "SMEMBERS") return this.result(Array.from(this.s(key)));
    if (cmd === "SSCAN") {
      const cursor = Math.max(0, parseInt(command[2], 10) || 0);
      const countIndex = command.findIndex((value) => String(value).toUpperCase() === "COUNT");
      const count = countIndex >= 0 ? Math.max(1, parseInt(command[countIndex + 1], 10) || 10) : 10;
      const values = Array.from(this.s(key));
      const page = values.slice(cursor, cursor + count);
      const next = cursor + page.length >= values.length ? "0" : String(cursor + page.length);
      return this.result([next, page]);
    }
    if (cmd === "SCARD") return this.result(this.s(key).size);
    if (cmd === "ZADD") {
      this.z(key).set(String(command[3]), Number(command[2]) || 0);
      return this.result(1);
    }
    if (cmd === "ZSCORE") {
      const z = this.z(key);
      return this.result(z.has(String(command[2])) ? String(z.get(String(command[2]))) : null);
    }
    if (cmd === "ZREVRANGE") {
      const z = this.z(key);
      let start = parseInt(command[2], 10) || 0;
      let stop = parseInt(command[3], 10);
      const items = Array.from(z.entries())
        .sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])))
        .map((entry) => entry[0]);
      if (start < 0) start = items.length + start;
      if (stop < 0) stop = items.length + stop;
      return this.result(items.slice(Math.max(0, start), stop + 1));
    }
    return this.result(null);
  }

  pipeline(commands) {
    return commands.map((command) => this.exec(command));
  }
}

function installFetch(redis) {
  global.fetch = async function fetchMock(url, opts) {
    const u = String(url || "");
    if (u.includes("mock-redis.local")) {
      const body = opts && opts.body ? JSON.parse(opts.body) : [];
      const payload = u.endsWith("/pipeline") ? redis.pipeline(body) : { result: null };
      return {
        ok: true,
        async json() { return payload; },
        async text() { return JSON.stringify(payload); },
      };
    }
    if (u.includes("/getChat?")) {
      return {
        ok: true,
        async json() { return { ok: true, result: { id: 1001, type: "private" } }; },
        async text() { return JSON.stringify({ ok: true }); },
      };
    }
    if (u.includes("/getChatMember?")) {
      return {
        ok: true,
        async json() { return { ok: true, result: { status: "member" } }; },
        async text() { return JSON.stringify({ ok: true }); },
      };
    }
    return {
      ok: true,
      async json() { return { ok: true, result: true }; },
      async text() { return JSON.stringify({ ok: true }); },
    };
  };
}

function installTelegramGateFetch(redis, options) {
  const opts = Object.assign({ botOk: true, channelOk: true }, options || {});
  function queryValue(url, key) {
    try {
      return new URL(String(url)).searchParams.get(key) || "";
    } catch (e) {
      return "";
    }
  }
  function expectedTelegramIdOk(url, key) {
    const expected = opts.expectedTelegramId != null ? String(opts.expectedTelegramId).trim() : "";
    if (!expected) return true;
    return queryValue(url, key) === expected;
  }
  global.fetch = async function fetchGateMock(url, requestOpts) {
    const u = String(url || "");
    if (u.includes("mock-redis.local")) {
      const body = requestOpts && requestOpts.body ? JSON.parse(requestOpts.body) : [];
      const payload = u.endsWith("/pipeline") ? redis.pipeline(body) : { result: null };
      return {
        ok: true,
        async json() { return payload; },
        async text() { return JSON.stringify(payload); },
      };
    }
    if (u.includes("/getChat?")) {
      const ok = !!opts.botOk && expectedTelegramIdOk(u, "chat_id");
      const payload = ok
        ? { ok: true, result: { id: 1001, type: "private" } }
        : { ok: false, error_code: 400, description: "Bad Request: chat not found" };
      return {
        ok,
        async json() { return payload; },
        async text() { return JSON.stringify(payload); },
      };
    }
    if (u.includes("/getChatMember?")) {
      const ok = !!opts.channelOk && expectedTelegramIdOk(u, "user_id");
      const payload = ok
        ? { ok: true, result: { status: "member" } }
        : { ok: true, result: { status: "left" } };
      return {
        ok: true,
        async json() { return payload; },
        async text() { return JSON.stringify(payload); },
      };
    }
    return {
      ok: true,
      async json() { return { ok: true, result: true }; },
      async text() { return JSON.stringify({ ok: true }); },
    };
  };
}

function installRecordingFetch(redis, sentMessages) {
  global.fetch = async function fetchRecordingMock(url, opts) {
    const u = String(url || "");
    if (u.includes("mock-redis.local")) {
      const body = opts && opts.body ? JSON.parse(opts.body) : [];
      const payload = u.endsWith("/pipeline") ? redis.pipeline(body) : { result: null };
      return {
        ok: true,
        async json() { return payload; },
        async text() { return JSON.stringify(payload); },
      };
    }
    if (u.includes("/getChat?")) {
      return {
        ok: true,
        async json() { return { ok: true, result: { id: 1001, type: "private" } }; },
        async text() { return JSON.stringify({ ok: true }); },
      };
    }
    if (u.includes("/getChatMember?")) {
      return {
        ok: true,
        async json() { return { ok: true, result: { status: "member" } }; },
        async text() { return JSON.stringify({ ok: true }); },
      };
    }
    if (u.includes("/sendMessage")) {
      const payload = opts && opts.body ? JSON.parse(opts.body) : {};
      sentMessages.push({ url: u, body: payload });
      return {
        ok: true,
        async json() { return { ok: true, result: true }; },
        async text() { return JSON.stringify({ ok: true }); },
      };
    }
    return {
      ok: true,
      async json() { return { ok: true, result: true }; },
      async text() { return JSON.stringify({ ok: true }); },
    };
  };
}

function persistContractRaffle(redis, raffle, id) {
  const raffleId = String(id || (raffle && raffle.id) || "").trim();
  assert.ok(raffleId, "contract raffle id is required");
  redis.kv.set("poker_app:raffle:" + raffleId, JSON.stringify(raffle));
}

function clearProjectRequireCache() {
  const prefix = root + path.sep;
  Object.keys(require.cache).forEach((file) => {
    if (file.startsWith(prefix) && !file.endsWith(path.join("scripts", "contract-tests.js"))) {
      delete require.cache[file];
    }
  });
}

function req(method, query, body, headers) {
  return {
    method,
    query: query || {},
    body: body == null ? undefined : body,
    headers: Object.assign({ host: "contract.test", "x-forwarded-for": "10.0.0.1" }, headers || {}),
  };
}

function res() {
  const out = {
    statusCode: 200,
    headers: {},
    body: undefined,
    ended: false,
    setHeader(name, value) { this.headers[name.toLowerCase()] = value; },
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.body = payload; this.ended = true; return this; },
    end(payload) { this.body = payload; this.ended = true; return this; },
  };
  return out;
}

function loadHandler(name) {
  clearProjectRequireCache();
  return require(path.join(root, "lib", "api-handlers", name + ".js"));
}

function sessions() {
  const { signPwaSession } = require(path.join(root, "lib", "poker-pwa-session"));
  return {
    user: signPwaSession({ id: 1001, username: "player", first_name: "Player" }, BOT_TOKEN),
    peer: signPwaSession({ id: 1002, username: "peer", first_name: "Peer" }, BOT_TOKEN),
    admin: signPwaSession({ id: 388008256, username: "admin", first_name: "Admin" }, BOT_TOKEN),
    adminSecondary: signPwaSession({ id: 2144406710, username: "admin_two", first_name: "Admin Two" }, BOT_TOKEN),
    rakebackEditor: signPwaSession({ id: 1897001087, username: "vika", first_name: "Vika" }, BOT_TOKEN),
  };
}

function telegramLoginWidgetPayload(user) {
  const payload = Object.assign({
    auth_date: String(Math.floor(Date.now() / 1000)),
  }, user || {});
  const dataCheckString = Object.keys(payload)
    .filter((key) => payload[key] != null && String(payload[key]) !== "")
    .sort()
    .map((key) => key + "=" + payload[key])
    .join("\n");
  const secretKey = crypto.createHash("sha256").update(BOT_TOKEN).digest();
  payload.hash = crypto.createHmac("sha256", secretKey).update(dataCheckString).digest("hex");
  return payload;
}

function telegramWebAppInitData(user) {
  const params = new URLSearchParams();
  params.set("auth_date", String(Math.floor(Date.now() / 1000)));
  params.set("user", JSON.stringify(user || {}));
  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => k + "=" + v)
    .join("\n");
  const secretKey = crypto.createHmac("sha256", "WebAppData").update(BOT_TOKEN).digest();
  params.set("hash", crypto.createHmac("sha256", secretKey).update(dataCheckString).digest("hex"));
  return params.toString();
}

async function call(handler, request) {
  const response = res();
  await handler(request, response);
  return response;
}

async function testAuthAndAdmin(redis) {
  const chat = loadHandler("chat");
  let r = await call(chat, req("POST", {}, { text: "no auth" }));
  assert.strictEqual(r.statusCode, 401, "chat write requires auth");

  const raffles = loadHandler("raffles");
  const s = sessions();
  r = await call(raffles, req("POST", {}, { pwaSession: s.user, action: "create", title: "X" }));
  assert.strictEqual(r.statusCode, 403, "raffle create is admin-only");

  const countBeforePastCreate = redis.l("poker_app:raffle_ids").length;
  r = await call(raffles, req("POST", {}, {
    pwaSession: s.admin,
    action: "create",
    title: "Past raffle",
    totalWinners: 1,
    groups: [{ prize: "Ticket", count: 1 }],
    endDate: new Date(Date.now() - 60_000).toISOString(),
    createIdempotencyKey: "contract-create-past",
  }));
  assert.strictEqual(r.statusCode, 400, "admin cannot create raffle with past end date");
  assert.ok(String(r.body.error || "").includes("будущем"), "past create error explains future deadline");
  assert.strictEqual(redis.l("poker_app:raffle_ids").length, countBeforePastCreate, "past create does not save raffle id");

  const chatBeforeRaffleCreate = redis.l("poker_app:chat_messages").length;
  r = await call(raffles, req("POST", {}, {
    pwaSession: s.admin,
    action: "create",
    title: "Admin raffle",
    totalWinners: 1,
    groups: [{ prize: "Ticket", count: 1 }],
    endDate: new Date(Date.now() + 3600_000).toISOString(),
    idemKey: "contract-create",
  }));
  assert.strictEqual(r.statusCode, 200, "admin can create raffle");
  assert.ok(r.body && r.body.ok && r.body.raffle && r.body.raffle.id, "create returns raffle");
  assert.strictEqual(redis.l("poker_app:chat_messages").length, chatBeforeRaffleCreate, "raffle create does not post to general chat");
  const createdRaffleId = r.body.raffle.id;

  r = await call(raffles, req("POST", {}, { pwaSession: s.user, action: "delete", raffleId: createdRaffleId }));
  assert.strictEqual(r.statusCode, 403, "raffle delete is admin-only");

  r = await call(raffles, req("POST", {}, { pwaSession: s.admin, action: "delete", raffleId: createdRaffleId }));
  assert.strictEqual(r.statusCode, 200, "admin can delete raffle");
  assert.strictEqual(redis.kv.has("poker_app:raffle:" + createdRaffleId), false, "delete removes raffle record");
  assert.strictEqual(redis.l("poker_app:raffle_ids").includes(createdRaffleId), false, "delete removes raffle id from index");

  r = await call(raffles, req("POST", {}, {
    pwaSession: s.adminSecondary,
    action: "create",
    title: "Second admin raffle",
    totalWinners: 1,
    groups: [{ prize: "Ticket", count: 1 }],
    endDate: new Date(Date.now() + 3600_000).toISOString(),
    idemKey: "contract-create-secondary-admin",
  }));
  assert.strictEqual(r.statusCode, 200, "secondary known admin can create raffle");

  const plannerAccess = require(path.join(root, "lib", "gazette-planner-access"));
  assert.strictEqual(
    plannerAccess.isGazettePlannerEditor({ id: 2144406710, telegramUsername: "", pwaUsername: null }),
    true,
    "secondary known admin can use gazette planner",
  );
  assert.strictEqual(
    plannerAccess.isGazettePlannerEditor({ id: 0, telegramUsername: "roman1787443", pwaUsername: null }),
    true,
    "roman1787443 can use shared gazette planner",
  );
  assert.strictEqual(
    plannerAccess.isGazettePlannerEditor({ id: 0, telegramUsername: "polyapineapple", pwaUsername: null }),
    true,
    "polyapineapple can use solo gazette planner",
  );
  assert.strictEqual(
    plannerAccess.isGazettePlannerEditor({ id: 0, telegramUsername: "unknown_player", pwaUsername: null }),
    false,
    "unknown user cannot use gazette planner",
  );
  const apiAuth = require(path.join(root, "lib", "api-auth"));
  assert.strictEqual(apiAuth.isAdminUsername("roman1_matvienko"), true, "roman1 username is admin");
  assert.strictEqual(apiAuth.isAdminUsername("roman1787443"), false, "editor username is not full admin");
  assert.strictEqual(apiAuth.isAdminEmail("matvienkoro92@gmail.com"), true, "roman1 email is admin");
  assert.strictEqual(apiAuth.isAdminEmail("other@example.com"), false, "unknown email is not admin");
  assert.strictEqual(
    apiAuth.isAdminIdentity({ id: 0, pwaUsername: "roman1_matvienko", adminAccess: false }, "mail_ID000001"),
    true,
    "admin username grants API admin identity",
  );
  assert.strictEqual(
    apiAuth.isAdminIdentity({ id: 0, pwaUsername: "player", adminAccess: false }, "mail_ID000002"),
    false,
    "unknown identity is not admin",
  );
  const bonusAccess = require(path.join(root, "lib", "bonus-admin-access"));
  assert.strictEqual(bonusAccess.isBonusAdminUsername("roman1787443"), true, "roman1787443 can access bonus admin");
  assert.strictEqual(bonusAccess.isBonusAdminUsername("unknown_player"), false, "unknown username cannot access bonus admin");
  assert.strictEqual(
    bonusAccess.isBonusAdminIdentity({ id: 0, pwaUsername: "roman1787443", adminAccess: false }, "mail_ID000003"),
    true,
    "roman1787443 pwa session grants bonus admin identity",
  );
  assert.strictEqual(
    bonusAccess.isBonusAdminIdentity({ id: 0, pwaUsername: "player", adminAccess: false }, "mail_ID000004"),
    false,
    "unknown pwa session does not grant bonus admin identity",
  );
  const pwa = require(path.join(root, "lib", "poker-pwa-session"));
  const adminToken = pwa.signPwaSession({ id: 0, memberId: "mail_ID000001", username: "", adminAccess: true }, BOT_TOKEN);
  assert.strictEqual(pwa.verifyPwaSessionToken(adminToken, BOT_TOKEN).adminAccess, true, "pwa session carries admin access");
  const bonusAdminToken = pwa.signPwaSession({ id: 0, memberId: "mail_ID000003", username: "roman1787443" }, BOT_TOKEN);
  const nonBonusAdminToken = pwa.signPwaSession({ id: 0, memberId: "mail_ID000004", username: "player" }, BOT_TOKEN);
  redis.h("poker_app:id_to_user").set("ID111111", "tg_2144406710");
  redis.h("poker_app:id_to_user").set("ID222222", "tg_2144406710");
  redis.h("poker_app:visitor_usernames").set("tg_2144406710", "qweenpoker");
  redis.h("poker_app:bonus_balances").set("ID111111", "849");
  redis.h("poker_app:daily_poker_played_count").set("ID111111", "36");
  redis.h("poker_app:daily_poker_played_count").set("ID222222", "5");
  redis.s("poker_app:bonus_users").add("ID111111");
  redis.s("poker_app:daily_poker_users").add("ID222222");
  const adminHandler = loadHandler("admin");
  let bonusRes = await call(adminHandler, req("GET", { path: "bonus-balances", pwaSession: bonusAdminToken }));
  assert.strictEqual(bonusRes.statusCode, 200, "bonus balances initial page loads before search");
  bonusRes = await call(adminHandler, req("GET", { path: "bonus-balances", pwaSession: bonusAdminToken, search: "qweenpoker" }));
  assert.strictEqual(bonusRes.statusCode, 200, "roman1787443 can open bonus admin API");
  assert.strictEqual(bonusRes.body.total, 1, "bonus admin merges zero-balance aliases linked to one Telegram user");
  assert.strictEqual(bonusRes.body.users[0].bonusBalance, 849, "linked bonus user keeps the real balance");
  assert.strictEqual(bonusRes.body.users[0].dailyPokerGamesPlayed, 41, "linked bonus user includes alias game stats");
  assert.deepStrictEqual(bonusRes.body.users[0].historyUserIds, ["ID111111", "ID222222"], "linked bonus user exposes all history account ids");
  const primaryLedger = {
    id: "bonus_primary_history", user_id: "ID111111", amount: 20, direction: "credit",
    operation_type: "admin_credit", balance_before: 829, balance_after: 849,
    source: "admin_manual", source_id: "admin", admin_id: "admin", comment: "primary", created_at: "2026-07-10T10:00:00.000Z",
  };
  const aliasLedger = {
    id: "bonus_alias_history", user_id: "ID222222", amount: 5, direction: "debit",
    operation_type: "admin_debit", balance_before: 5, balance_after: 0,
    source: "admin_manual", source_id: "admin", admin_id: "admin", comment: "alias", created_at: "2026-07-10T11:00:00.000Z",
  };
  redis.kv.set("poker_app:bonus_ledger:" + primaryLedger.id, JSON.stringify(primaryLedger));
  redis.kv.set("poker_app:bonus_ledger:" + aliasLedger.id, JSON.stringify(aliasLedger));
  redis.l("poker_app:bonus_ledger_user:ID111111").push(primaryLedger.id);
  redis.l("poker_app:bonus_ledger_user:ID222222").push(aliasLedger.id);
  const historyRes = await call(adminHandler, req("GET", {
    path: "users/ID111111/bonus-ledger",
    pwaSession: bonusAdminToken,
    relatedUserIds: "ID111111,ID222222",
  }));
  assert.strictEqual(historyRes.statusCode, 200, "bonus admin can open linked player history");
  assert.deepStrictEqual(historyRes.body.operations.map((op) => op.id), [aliasLedger.id, primaryLedger.id], "linked history merges all accounts newest first");
  assert.deepStrictEqual(historyRes.body.operations.map((op) => op.userId), ["ID222222", "ID111111"], "linked history preserves operation account ids");
  let manualBonusRes = await call(adminHandler, req("POST", { path: "users/ID123456/bonus-credit" }, {
    pwaSession: bonusAdminToken,
    amount: 120,
    comment: "contract credit",
  }));
  assert.strictEqual(manualBonusRes.statusCode, 200, "bonus admin can credit a user");
  manualBonusRes = await call(adminHandler, req("POST", { path: "users/ID123456/bonus-debit" }, {
    pwaSession: bonusAdminToken,
    amount: 45,
    comment: "contract debit",
    tournament: {
      id: "weekly-6|18|0|Фриролл",
      title: "Фриролл",
      time: "18:00 МСК",
      buyin: "45₽",
    },
  }));
  assert.strictEqual(manualBonusRes.statusCode, 200, "bonus admin can debit a user");
  assert.strictEqual(manualBonusRes.body.operation.tournamentTitle, "Фриролл", "bonus debit keeps the selected tournament");
  const bonusIssuesRes = await call(adminHandler, req("GET", { path: "bonus-issues", pwaSession: bonusAdminToken }));
  assert.strictEqual(bonusIssuesRes.statusCode, 200, "bonus admin can open issued bonuses journal");
  assert.strictEqual(bonusIssuesRes.body.operations[0].tournamentTitle, "Фриролл", "issued bonuses journal returns tournament metadata");
  bonusRes = await call(adminHandler, req("GET", { path: "bonus-balances", pwaSession: bonusAdminToken }));
  assert.strictEqual(bonusRes.body.bonusTotals.totalDebited, 45, "bonus admin API returns total debited points");
  bonusRes = await call(adminHandler, req("GET", { path: "bonus-balances", pwaSession: nonBonusAdminToken }));
  assert.strictEqual(bonusRes.statusCode, 403, "ordinary user cannot open bonus admin API");
  const reportAccess = require(path.join(root, "lib", "admin-report-access"));
  assert.strictEqual(reportAccess.isAdminReportIdentity({ id: 388008256, telegramUsername: "roman1787443" }, "tg_388008256"), true, "roman1787443 can access admin reports");
  assert.strictEqual(reportAccess.isAdminReportIdentity({ id: 2144406710, telegramUsername: "" }, "tg_2144406710"), true, "anna can access admin reports");
  assert.strictEqual(reportAccess.isAdminReportIdentity({ id: 0, pwaUsername: "roman1_matvienko" }, "mail_ID000001"), true, "roman1 can access admin reports by username");
  assert.strictEqual(reportAccess.isAdminReportIdentity({ id: 0, telegramUsername: "player", pwaUsername: "roman1_matvienko" }, "mail_ID000001"), true, "roman1 pwa username grants admin reports even with another telegram username field");
  assert.strictEqual(reportAccess.isAdminReportEmail("matvienkoro92@gmail.com"), true, "roman1 can access admin reports by email");
  const reportToken = pwa.signPwaSession({ id: 2144406710, username: "anna", adminReportAccess: true }, BOT_TOKEN);
  assert.strictEqual(pwa.verifyPwaSessionToken(reportToken, BOT_TOKEN).adminReportAccess, true, "pwa session carries admin report access");

  const reportHandler = loadHandler("admin-report-shifts");
  const roman1ReportToken = pwa.signPwaSession({ id: 0, memberId: "mail_ID000001", username: "roman1_matvienko" }, BOT_TOKEN);
  const roman178ReportToken = pwa.signPwaSession({ id: 388008256, memberId: "tg_388008256", username: "roman1787443" }, BOT_TOKEN);
  let reportAccessRes = await call(reportHandler, req("GET", { pwaSession: roman1ReportToken, access: "1" }));
  assert.strictEqual(reportAccessRes.statusCode, 200, "report admin access probe succeeds");
  assert.strictEqual(reportAccessRes.body.allowed, true, "report admin access probe confirms access");
  reportAccessRes = await call(reportHandler, req("GET", { pwaSession: nonBonusAdminToken, access: "1" }));
  assert.strictEqual(reportAccessRes.statusCode, 403, "ordinary user report access probe is denied");
  const calculationMenuToken = require(path.join(root, "lib", "admin-menu-access-token"))
    .signAccessToken("calculations", "mail_ID000004", BOT_TOKEN);
  let protectedCalculationDraftRes = await call(reportHandler, req("POST", {}, {
    pwaSession: nonBonusAdminToken,
    menuAccessToken: calculationMenuToken,
    action: "calculation_draft_save",
    weekStart: "1785121200001",
    calculationDraftGroup: "figures",
    calculationDraft: { rake: ["123"] },
  }));
  assert.strictEqual(protectedCalculationDraftRes.statusCode, 200, "calculations menu token can save its protected draft");
  const crmMenuToken = require(path.join(root, "lib", "admin-menu-access-token"))
    .signAccessToken("crm", "mail_ID000004", BOT_TOKEN);
  protectedCalculationDraftRes = await call(reportHandler, req("POST", {}, {
    pwaSession: nonBonusAdminToken,
    menuAccessToken: crmMenuToken,
    action: "calculation_draft_save",
    weekStart: "1785121200002",
    calculationDraftGroup: "figures",
    calculationDraft: { rake: ["456"] },
  }));
  assert.strictEqual(protectedCalculationDraftRes.statusCode, 200, "CRM menu token can save the calculations draft mounted in CRM");
  protectedCalculationDraftRes = await call(reportHandler, req("POST", {}, {
    pwaSession: nonBonusAdminToken,
    menuAccessToken: calculationMenuToken,
    action: "delete",
    id: "forbidden-report",
  }));
  assert.strictEqual(protectedCalculationDraftRes.statusCode, 403, "calculations menu token cannot mutate admin reports");
  const calculationWeekStart = "1785121200000";
  let calculationDraftRes = await call(reportHandler, req("POST", {}, {
    pwaSession: roman1ReportToken,
    action: "calculation_draft_save",
    weekStart: calculationWeekStart,
    calculationDraftGroup: "cash",
    calculationDraft: { cash: ["100", "200"], rake: ["stale-rake"] },
  }));
  assert.strictEqual(calculationDraftRes.statusCode, 200, "calculation cash group saves");
  calculationDraftRes = await call(reportHandler, req("POST", {}, {
    pwaSession: roman1ReportToken,
    action: "calculation_draft_save",
    weekStart: calculationWeekStart,
    calculationDraftGroup: "figures",
    calculationDraft: { cash: ["stale-cash"], rake: ["300", "400"], raffleTicketsReturn: "50" },
  }));
  assert.strictEqual(calculationDraftRes.statusCode, 200, "calculation figures group saves");
  assert.deepStrictEqual(calculationDraftRes.body.calculationDraft.draft.cash, ["100", "200"], "figures save preserves cash saved by another group");
  assert.deepStrictEqual(calculationDraftRes.body.calculationDraft.draft.rake, ["300", "400"], "figures save updates rake fields");
  calculationDraftRes = await call(reportHandler, req("POST", {}, {
    pwaSession: roman1ReportToken,
    action: "calculation_draft_save",
    weekStart: calculationWeekStart,
    calculationDraftGroup: "winloss",
    calculationDraft: { roomWinLoss: ["10", "-20"], rake: ["stale-rake"] },
  }));
  assert.deepStrictEqual(calculationDraftRes.body.calculationDraft.draft.cash, ["100", "200"], "win/loss save preserves cash group");
  assert.deepStrictEqual(calculationDraftRes.body.calculationDraft.draft.rake, ["300", "400"], "win/loss save preserves figures group");
  assert.deepStrictEqual(calculationDraftRes.body.calculationDraft.draft.roomWinLoss, ["10", "-20"], "win/loss save updates only its group");
  let shiftReportRes = await call(reportHandler, req("POST", {}, {
    pwaSession: roman1ReportToken,
    date: "01.06.2026",
    weekday: "Понедельник",
    deposit: 100,
    cashout: 0,
    prodamus: 0,
    robokassa: 0,
    romaCrypto: 0,
    botCryptoDep: 0,
    botExchipDep: 0,
    botExchipCashout: 0,
    bonuses: 0,
    transfers: 0,
    ret: 0,
    sergeyMarina: 0,
    rakeback: 0,
    extraFields: [],
  }));
  assert.strictEqual(shiftReportRes.statusCode, 200, "roman1 can create an admin shift report");
  const shiftReportId = shiftReportRes.body && shiftReportRes.body.report && shiftReportRes.body.report.id;
  assert.ok(shiftReportId, "admin shift report returns id");
  shiftReportRes = await call(reportHandler, req("PUT", {}, {
    pwaSession: roman1ReportToken,
    id: shiftReportId,
    date: "01.06.2026",
    weekday: "Понедельник",
    deposit: 250,
    cashout: 0,
    prodamus: 0,
    robokassa: 0,
    romaCrypto: 0,
    botCryptoDep: 0,
    botExchipDep: 0,
    botExchipCashout: 0,
    bonuses: 0,
    transfers: 0,
    ret: 0,
    sergeyMarina: 0,
    rakeback: 0,
    extraFields: [],
  }));
  assert.strictEqual(shiftReportRes.statusCode, 200, "roman1 can edit a sent admin shift report");
  assert.strictEqual(shiftReportRes.body.report.deposit, 250, "sent report edit updates deposit");
  shiftReportRes = await call(reportHandler, req("POST", {}, {
    pwaSession: roman178ReportToken,
    action: "delete",
    id: shiftReportId,
  }));
  assert.strictEqual(shiftReportRes.statusCode, 200, "roman178 can delete a sent admin shift report");
  shiftReportRes = await call(reportHandler, req("GET", { pwaSession: roman178ReportToken, scope: "all" }));
  assert.strictEqual(shiftReportRes.statusCode, 200, "roman178 can list sent reports after delete");
  assert.strictEqual((shiftReportRes.body.reports || []).some((report) => report.id === shiftReportId), false, "deleted sent report is gone");

  shiftReportRes = await call(reportHandler, req("POST", {}, {
    pwaSession: roman178ReportToken,
    date: "15.06.2026",
    weekday: "Понедельник",
    deposit: 100,
    cashout: 0,
    prodamus: 0,
    robokassa: 0,
    romaCrypto: 0,
    botCryptoDep: 0,
    botExchipDep: 0,
    botExchipCashout: 0,
    bonuses: 0,
    transfers: 0,
    ret: 0,
    sergeyMarina: 0,
    rakeback: 999,
    extraFields: [],
  }));
  assert.strictEqual(shiftReportRes.statusCode, 200, "roman178 can create a report before rakeback is issued");
  const rakebackSyncReportId = shiftReportRes.body && shiftReportRes.body.report && shiftReportRes.body.report.id;
  assert.strictEqual(shiftReportRes.body.report.rakeback, 0, "manual rakeback body is ignored without rows");

  const issuedAt = new Date(Date.UTC(2026, 5, 15, 16, 0, 0, 0)).toISOString();
  let syncDraftRes = await call(reportHandler, req("POST", {}, {
    pwaSession: roman178ReportToken,
    action: "rakeback_draft_save",
    date: "shared",
    rakebackRows: [{
      groupId: "contract_report_sync_rakeback",
      kind: "base",
      room: "P21",
      playerId: "P21-REPORT-SYNC",
      rake: 150,
      percent: 50,
      roomAmount: 75,
      amount: 75,
      saved: true,
      entryAddedAt: issuedAt,
      createdAt: issuedAt,
    }],
    deletedTemplates: [],
    deletedRows: [],
  }));
  assert.strictEqual(syncDraftRes.statusCode, 200, "rakeback draft save succeeds after sent report exists");
  assert.strictEqual(syncDraftRes.body.reportSync && syncDraftRes.body.reportSync.rowsAttached, 1, "issued rakeback row is attached to the sent report");
  const syncedDraftRow = (syncDraftRes.body.rakebackDraft.rows || []).find((row) => row.groupId === "contract_report_sync_rakeback");
  assert.strictEqual(syncedDraftRow && syncedDraftRow.accounted, true, "attached rakeback row becomes accounted in draft");
  assert.strictEqual(syncedDraftRow && syncedDraftRow.reportId, rakebackSyncReportId, "attached rakeback row points at the sent report");

  shiftReportRes = await call(reportHandler, req("GET", { pwaSession: roman178ReportToken, scope: "all" }));
  assert.strictEqual(shiftReportRes.statusCode, 200, "roman178 can list reports after rakeback sync");
  const syncedReport = (shiftReportRes.body.reports || []).find((report) => report.id === rakebackSyncReportId);
  assert.strictEqual(syncedReport && syncedReport.rakeback, 75, "sent report rakeback is recalculated from attached rows");
  assert.strictEqual(syncedReport && syncedReport.total, 175, "sent report total includes attached rakeback row");
  assert.strictEqual(Array.isArray(syncedReport && syncedReport.rakebackRows) && syncedReport.rakebackRows.length, 1, "sent report stores attached rakeback row");
  shiftReportRes = await call(reportHandler, req("POST", {}, {
    pwaSession: roman178ReportToken,
    action: "delete",
    id: rakebackSyncReportId,
  }));
  assert.strictEqual(shiftReportRes.statusCode, 200, "synced rakeback report cleanup succeeds");

  let draftRes = await call(reportHandler, req("POST", {}, {
    pwaSession: roman178ReportToken,
    action: "rakeback_draft_save",
    date: "shared",
    rakebackRows: [{
      groupId: "contract_vika_rakeback_editor",
      kind: "base",
      room: "P21",
      playerId: "P21-VIKA-EDIT",
      rake: 100,
      percent: 50,
      roomAmount: 50,
      amount: 50,
      saved: true,
    }],
    deletedTemplates: [],
    deletedRows: [],
  }));
  assert.strictEqual(draftRes.statusCode, 200, "roman178 can save own rakeback draft row");
  let contractRakebackRow = (draftRes.body.rakebackDraft.rows || []).find((row) => row.groupId === "contract_vika_rakeback_editor");
  assert.strictEqual(contractRakebackRow && contractRakebackRow.ownerId, "tg_388008256", "rakeback draft row is owned by creator");

  draftRes = await call(reportHandler, req("POST", {}, {
    pwaSession: reportToken,
    action: "rakeback_draft_save",
    date: "shared",
    rakebackPatch: true,
    rakebackRows: [{
      groupId: "contract_vika_rakeback_editor",
      kind: "base",
      room: "P21",
      playerId: "P21-VIKA-EDIT",
      rake: 250,
      percent: 50,
      roomAmount: 125,
      amount: 125,
      saved: true,
      ownerId: "tg_388008256",
    }],
    deletedTemplates: [],
    deletedRows: [],
  }));
  assert.strictEqual(draftRes.statusCode, 200, "admin report writer save request succeeds");
  contractRakebackRow = (draftRes.body.rakebackDraft.rows || []).find((row) => row.groupId === "contract_vika_rakeback_editor");
  assert.strictEqual(contractRakebackRow && contractRakebackRow.rake, 100, "admin report writer cannot overwrite another owner rakeback row");

  draftRes = await call(reportHandler, req("POST", {}, {
    pwaSession: s.rakebackEditor,
    action: "rakeback_draft_save",
    date: "shared",
    rakebackPatch: true,
    rakebackRows: [{
      groupId: "contract_vika_rakeback_editor",
      kind: "base",
      room: "P21",
      playerId: "P21-VIKA-EDIT",
      rake: 700,
      percent: 50,
      roomAmount: 350,
      amount: 350,
      saved: true,
      ownerId: "tg_388008256",
    }],
    deletedTemplates: [],
    deletedRows: [],
  }));
  assert.strictEqual(draftRes.statusCode, 200, "Vika can save another owner rakeback draft row");
  contractRakebackRow = (draftRes.body.rakebackDraft.rows || []).find((row) => row.groupId === "contract_vika_rakeback_editor");
  assert.strictEqual(contractRakebackRow && contractRakebackRow.rake, 700, "Vika rakeback editor update is applied");
  assert.strictEqual(contractRakebackRow && contractRakebackRow.ownerId, "tg_388008256", "Vika edit preserves original row owner");
}

async function testPrivateCashRandomSeatAssignment(redis) {
  const handler = loadHandler("private-cash");
  const s = sessions();
  const { signPwaSession } = require(path.join(root, "lib", "poker-pwa-session"));
  const eventId = "contract_private_cash_random_seats";
  redis.kv.set("poker_app:private_cash_event:" + eventId, JSON.stringify({
    id: eventId,
    date: "2026-07-01",
    time: "20:00",
    gameType: "Холдем",
    stakes: "100/200",
    buyIn: "10000",
    status: "active",
    createdAt: new Date().toISOString(),
    createdBy: "contract",
  }));
  redis.l("poker_app:private_cash_events").push(eventId);

  const tokens = Array.from({ length: 9 }, (_, index) => signPwaSession({
    id: 7100 + index,
    username: "cash_player_" + index,
    first_name: "Cash " + index,
  }, BOT_TOKEN));

  for (let i = 0; i < 6; i += 1) {
    const r = await call(handler, req("POST", {}, { pwaSession: tokens[i], action: "join", eventId }, {
      "x-forwarded-for": "10.10.0." + i,
    }));
    assert.strictEqual(r.statusCode, 200, "private cash join " + i + " succeeds");
  }

  let stateRes = await call(handler, req("GET", { pwaSession: tokens[0] }));
  assert.strictEqual(stateRes.statusCode, 200, "private cash state loads");
  assert.strictEqual(stateRes.body.activeEvent.houseParticipant.accountId, "tg_388008256", "private cash active event includes Pokermanki as house player");
  assert.strictEqual(stateRes.body.activeEvent.houseParticipant.displayName, "ПокерМанки", "private cash house player has Pokermanki name");

  const participantsKey = "poker_app:private_cash_participants:" + eventId;
  const inGameRows = Array.from(redis.h(participantsKey).values()).map((raw) => JSON.parse(raw));
  const inGameSeats = inGameRows.map((row) => row.seatIndex).sort((a, b) => a - b);
  assert.deepStrictEqual(inGameSeats, [0, 1, 2, 3, 4, 5], "first six joins fill each in-game seat once");

  let r = await call(handler, req("POST", {}, { pwaSession: tokens[6], action: "join", eventId }, {
    "x-forwarded-for": "10.10.0.7",
  }));
  assert.strictEqual(r.statusCode, 200, "seventh private cash join succeeds");
  const afterReserveRows = Array.from(redis.h(participantsKey).values()).map((raw) => JSON.parse(raw));
  const reserveRow = afterReserveRows.find((row) => Number(row.seatIndex) >= 6);
  assert.ok(reserveRow, "seventh join goes to reserve when all seats are busy");

  const cancelled = inGameRows[3];
  r = await call(handler, req("POST", {}, { pwaSession: tokens[3], action: "cancel", eventId }, {
    "x-forwarded-for": "10.10.0.3",
  }));
  assert.strictEqual(r.statusCode, 200, "pending player can cancel private cash seat");

  r = await call(handler, req("POST", {}, { pwaSession: tokens[7], action: "join", eventId }, {
    "x-forwarded-for": "10.10.0.8",
  }));
  assert.strictEqual(r.statusCode, 200, "new player can join after cancellation");
  const finalRows = Array.from(redis.h(participantsKey).values()).map((raw) => JSON.parse(raw));
  const replacement = finalRows.find((row) => row.memberId === "tg_7107");
  assert.ok(replacement, "replacement row is stored");
  assert.strictEqual(replacement.seatIndex, cancelled.seatIndex, "replacement takes the freed in-game seat");

  redis.h("poker_app:visitor_dt_ids").set("tg_7999", "ID107999");
  redis.h("poker_app:id_to_user").set("ID107999", "tg_7999");
  redis.h("poker_app:visitor_usernames").set("tg_7999", "indexed_cash_player");
  redis.h("poker_app:visitor_chat_display_names").set("ID107999", "Индекс Игрок");
  redis.h("poker_app:pokerplus_user_ids").set("ID107999", "P21-INDEX");
  redis.h("poker_app:pokerplus_profiles").set("ID107999", JSON.stringify({ nickname: "Indexed Poker" }));
  const indexedSuggestReq = req("GET", { pwaSession: s.admin, suggest: "1", query: "indexed" });
  indexedSuggestReq.url = "/api/private-cash?pwaSession=" + encodeURIComponent(s.admin) + "&suggest=1&query=indexed";
  r = await call(handler, indexedSuggestReq);
  assert.strictEqual(r.statusCode, 200, "private cash indexed suggestions build succeeds");
  assert.ok(r.body.suggestions.some((row) => row.accountId === "ID107999"), "private cash suggestions include indexed player");
  assert.ok(redis.kv.get("poker_app:private_cash_search_ready:v1"), "private cash suggestions mark reverse index ready");
  assert.ok(redis.h("poker_app:private_cash_search_docs:v1").has("ID107999"), "private cash suggestions store compact player document");
  const indexedSuggestReuseReq = req("GET", { pwaSession: s.admin, suggest: "1", query: "indexed" });
  indexedSuggestReuseReq.url = "/api/private-cash?pwaSession=" + encodeURIComponent(s.admin) + "&suggest=1&query=indexed";
  r = await call(handler, indexedSuggestReuseReq);
  assert.strictEqual(r.statusCode, 200, "private cash indexed suggestions reuse succeeds");
  assert.ok(r.body.suggestions.some((row) => row.accountId === "ID107999"), "private cash indexed suggestions reuse player document");
}

async function testChatSendEditDelete(redis) {
  const chat = loadHandler("chat");
  const { convKey } = require(path.join(root, "lib", "chat-core.js"));
  const s = sessions();
  let r = await call(chat, req("POST", {}, { pwaSession: s.user, with: "tg_1002", text: "hello peer" }));
  assert.strictEqual(r.statusCode, 200, "chat DM send succeeds");
  assert.ok(r.body && r.body.message && r.body.message.id, "send returns message");
  const messageId = r.body.message.id;

  r = await call(chat, req("PATCH", {}, { pwaSession: s.user, action: "edit", with: "tg_1002", messageId, text: "edited text" }));
  assert.strictEqual(r.statusCode, 200, "chat edit succeeds");
  assert.strictEqual(r.body.message.text, "edited text", "edit updates message text");
  assert.strictEqual(r.body.message.edited, true, "edit marks message");

  r = await call(chat, req("DELETE", {}, { pwaSession: s.user, with: "tg_1002", messageId }));
  assert.strictEqual(r.statusCode, 200, "chat delete succeeds");
  assert.strictEqual(r.body.deleted, true, "delete returns deleted flag");

  const dmKey = convKey("tg_1001", "tg_1002");
  const messagesBeforeBlockedSend = redis.l(dmKey).length;
  r = await call(chat, req("POST", {}, { pwaSession: s.peer, action: "dmBlock", userId: "tg_1001" }));
  assert.strictEqual(r.statusCode, 200, "chat DM block succeeds");
  assert.strictEqual(r.body.blockedByMe, true, "block returns blocked state");

  r = await call(chat, req("POST", {}, { pwaSession: s.user, with: "tg_1002", text: "blocked hello" }));
  assert.strictEqual(r.statusCode, 403, "blocked player cannot send DM");
  assert.strictEqual(r.body.blockedMe, true, "blocked send explains recipient block");
  assert.strictEqual(redis.l(dmKey).length, messagesBeforeBlockedSend, "blocked DM send does not write message");

  r = await call(chat, req("GET", { pwaSession: s.user, with: "tg_1002" }));
  assert.strictEqual(r.statusCode, 200, "blocked DM status loads for sender");
  assert.strictEqual(r.body.blockedMe, true, "thread exposes that peer blocked me");
  assert.strictEqual(r.body.blockedByMe, false, "thread exposes that I did not block peer");

  r = await call(chat, req("GET", { pwaSession: s.peer, with: "tg_1001" }));
  assert.strictEqual(r.statusCode, 200, "block owner DM status loads");
  assert.strictEqual(r.body.blockedByMe, true, "thread exposes my block");

  r = await call(chat, req("POST", {}, { pwaSession: s.peer, action: "dmUnblock", userId: "tg_1001" }));
  assert.strictEqual(r.statusCode, 200, "chat DM unblock succeeds");
  assert.strictEqual(r.body.blockedByMe, false, "unblock returns unblocked state");

  r = await call(chat, req("POST", {}, { pwaSession: s.user, with: "tg_1002", text: "after unblock" }));
  assert.strictEqual(r.statusCode, 200, "unblocked player can send DM again");
}

async function testCrmAppUserBlock(redis) {
  const crm = loadHandler("player-crm");
  const chat = loadHandler("chat");
  const user = loadHandler("user");
  const { signAccessToken } = require(path.join(root, "lib", "admin-menu-access-token"));
  const s = sessions();
  const menuAccessToken = signAccessToken("crm", "tg_388008256", BOT_TOKEN);
  redis.h("poker_app:visitor_dt_ids").set("tg_1001", "ID100001");
  redis.h("poker_app:id_to_user").set("ID100001", "tg_1001");
  redis.h("poker_app:visitor_usernames").set("tg_1001", "player");
  redis.h("poker_app:pokerplus_user_ids").set("ID100001", "4430");
  redis.h("poker_app:pokerplus_user_ids").set("ID199991", "4430");
  redis.h("poker_app:pokerplus_bound_at").set("ID100001", String(Date.parse("2026-07-27T04:00:00.000Z")));
  redis.h("poker_app:pokerplus_bound_at").set("ID199991", String(Date.parse("2026-07-27T04:30:00.000Z")));
  redis.s("poker_app:visitors").add("tg_1001");
  redis.h("poker_app:visitor_dt_ids").set("tg_1002", "ID100002");
  redis.h("poker_app:id_to_user").set("ID100002", "tg_1002");
  redis.h("poker_app:visitor_usernames").set("tg_1002", "bot_only_player");
  redis.s("poker_app:visitors").add("tg_1002");
  const raffleId = "contract_crm_external_participants";
  const raffleNow = new Date().toISOString();
  redis.l("poker_app:raffle_ids").push(raffleId);
  redis.kv.set("poker_app:raffle:" + raffleId, JSON.stringify({
    id: raffleId,
    status: "completed",
    createdAt: raffleNow,
    completedAt: raffleNow,
    drawnAt: raffleNow,
    participantsCount: 9,
    participants: undefined,
    winners: [
      { accountId: "ID100001", name: "Winner One" },
      { accountId: "ID100002", name: "Winner Two" },
    ],
  }));
  redis.kv.set("poker_app:raffle_participants_data:" + raffleId, JSON.stringify(
    Array.from({ length: 9 }, (_, index) => ({
      accountId: "ID" + String(200001 + index),
      name: "Participant " + String(index + 1),
      joinedAt: raffleNow,
    }))
  ));

  let r = await call(crm, req("POST", {}, {
    pwaSession: s.admin,
    action: "block_player",
    targetId: "tg_1001",
    reason: "must be rejected without password",
  }));
  assert.strictEqual(r.statusCode, 403, "CRM rejects an owner without the password token");
  assert.strictEqual(r.body.code, "crm_password_required", "CRM reports the missing password token");

  r = await call(crm, req("POST", {}, {
    pwaSession: s.admin,
    menuAccessToken,
    action: "block_player",
    targetId: "tg_1001",
    reason: "contract block",
  }));
  assert.strictEqual(r.statusCode, 200, "CRM owner can block app user");
  assert.strictEqual(r.body.blocked, true, "CRM block response marks blocked");

  r = await call(crm, req("POST", {}, {
    pwaSession: s.admin,
    menuAccessToken,
    action: "calculation_draft_save",
    weekStart: "1785121200999",
    calculationDraftGroup: "figures",
    calculationDraft: { rake: ["777"], raffleTicketsReturn: "50" },
  }));
  assert.strictEqual(r.statusCode, 200, "CRM calculations save through the CRM endpoint");
  assert.deepStrictEqual(r.body.calculationDraft.draft.rake, ["777"], "CRM endpoint persists calculation figures");
  r = await call(crm, req("POST", {}, {
    pwaSession: s.admin,
    menuAccessToken,
    action: "calculation_draft_load",
    weekStart: "1785121200999",
  }));
  assert.strictEqual(r.statusCode, 200, "CRM calculations load through the CRM endpoint");
  assert.strictEqual(r.body.calculationDraft.draft.raffleTicketsReturn, "50", "CRM endpoint returns the saved draft");

  const coreRequest = req("GET", { pwaSession: s.admin, mode: "core" });
  coreRequest.url = "/api/player-crm?pwaSession=" + encodeURIComponent(s.admin) + "&menuAccessToken=" + encodeURIComponent(menuAccessToken) + "&mode=core";
  r = await call(crm, coreRequest);
  assert.strictEqual(r.statusCode, 200, "CRM loads blocked list");
  assert.ok((r.body.blockedUsers || []).some((row) => row && row.reason === "contract block"), "CRM exposes blocked users list");
  assert.strictEqual(r.body.statsSummary.raffles.pending, true, "CRM core defers the slow raffle archive scan");
  assert.deepStrictEqual(r.body.players, [], "CRM core response omits the heavy player collection");
  assert.strictEqual(r.body.playersPending, true, "CRM core response tells the client to load players on demand");
  const raffleSummaryRequest = req("GET", { pwaSession: s.admin, mode: "raffle-summary" });
  raffleSummaryRequest.url = "/api/player-crm?pwaSession=" + encodeURIComponent(s.admin) + "&menuAccessToken=" + encodeURIComponent(menuAccessToken) + "&mode=raffle-summary";
  r = await call(crm, raffleSummaryRequest);
  assert.strictEqual(r.statusCode, 200, "CRM loads the selected-period raffle summary on demand");
  assert.strictEqual(r.body.raffles.uniqueParticipants, 9, "raffle summary reads external participant storage");
  assert.strictEqual(r.body.raffles.uniqueWinners, 2, "raffle summary includes unique winners");
  assert.strictEqual(r.body.raffles.recipientsPending, true, "raffle summary defers recipient details until the modal opens");
  const raffleStatsDayKey = require(path.join(root, "lib", "player-crm-utils")).mskDateKeyFromMs(Date.parse(raffleNow));
  assert.strictEqual(redis.kv.get("poker_app:raffle_stats_index:v2:ready"), "1", "raffle summary completes the historical date index");
  assert.ok(redis.s("poker_app:raffle_stats_day:v2:" + raffleStatsDayKey).has(raffleId), "historical raffle is indexed under its CRM business day");
  const calculationsAccessToken = signAccessToken("calculations", "tg_388008256", BOT_TOKEN);
  const calculationSummaryRequest = req("GET", { pwaSession: s.admin, mode: "raffle-summary" });
  calculationSummaryRequest.url = "/api/player-crm?pwaSession=" + encodeURIComponent(s.admin) +
    "&menuAccessToken=" + encodeURIComponent(calculationsAccessToken) + "&mode=raffle-summary";
  r = await call(crm, calculationSummaryRequest);
  assert.strictEqual(r.statusCode, 200, "calculations access token loads the lightweight raffle summary");
  assert.strictEqual(r.body.raffles.uniqueParticipants, 9, "calculations raffle summary includes indexed participants");
  const issuedInPeriodRaffleId = "contract_raffle_issued_in_selected_period";
  const issuedDay = raffleStatsDayKey;
  redis.l("poker_app:raffle_ids").push(issuedInPeriodRaffleId);
  redis.kv.set("poker_app:raffle:" + issuedInPeriodRaffleId, JSON.stringify({
    id: issuedInPeriodRaffleId,
    status: "drawn",
    title: "Турнирный билет",
    createdAt: "2026-01-01T12:00:00.000Z",
    drawnAt: "2026-01-01T12:00:00.000Z",
    groups: [{ prize: "5 000 ₽" }],
    winners: [{
      accountId: "ID100001",
      groupIndex: 0,
      winnerStatus: "ok",
      winnerStatusAt: raffleNow,
      winnerCashoutStatus: "plus",
      winnerCashoutAmount: 1200,
      winnerCashoutAt: raffleNow,
    }],
  }));
  redis.s("poker_app:raffle_stats_day:v2:" + issuedDay).add(issuedInPeriodRaffleId);
  const issuedPeriodRequest = req("GET", { pwaSession: s.admin, mode: "raffle-summary", from: issuedDay, to: issuedDay });
  issuedPeriodRequest.url = "/api/player-crm?pwaSession=" + encodeURIComponent(s.admin) +
    "&menuAccessToken=" + encodeURIComponent(calculationsAccessToken) + "&mode=raffle-summary&from=" + issuedDay + "&to=" + issuedDay;
  r = await call(crm, issuedPeriodRequest);
  assert.strictEqual(r.statusCode, 200, "selected-period raffle summary loads issued prizes");
  assert.strictEqual(r.body.raffles.issuedTicketAmount, 5000, "selected period uses prize issue date even when the raffle was drawn earlier");
  assert.strictEqual(r.body.raffles.returnedTicketAmount, 1200, "selected period uses ticket return date even when the raffle was drawn earlier");
  const calculationRafflesRequest = req("GET", { pwaSession: s.admin, mode: "raffles" });
  calculationRafflesRequest.url = "/api/player-crm?pwaSession=" + encodeURIComponent(s.admin) +
    "&menuAccessToken=" + encodeURIComponent(calculationsAccessToken) + "&mode=raffles";
  r = await call(crm, calculationRafflesRequest);
  assert.strictEqual(r.statusCode, 200, "calculations access token loads protected raffle totals");
  assert.strictEqual(r.body.raffles.uniqueParticipants, 9, "calculations raffle response includes external participants");

  const heavyRequest = req("GET", { pwaSession: s.admin, mode: "players" });
  heavyRequest.url = "/api/player-crm?pwaSession=" + encodeURIComponent(s.admin) + "&menuAccessToken=" + encodeURIComponent(menuAccessToken) + "&mode=players";
  r = await call(crm, heavyRequest);
  assert.strictEqual(r.statusCode, 200, "CRM linked player list loads on demand");
  assert.ok((r.body.players || []).some((row) => row && row.appBlocked === true), "CRM marks blocked player rows");
  assert.ok((r.body.players || []).some((row) => row && row.pokerPlusUserId === "4430"), "CRM player list includes Poker21-linked accounts");
  assert.ok(
    (r.body.players || []).some((row) => row && row.accountId === "ID100002" && row.channels && row.channels.bot && !row.pokerPlusUserId),
    "CRM player list also includes bot subscribers without Poker21",
  );
  const poker21PlayersRequest = req("GET", { pwaSession: s.admin, mode: "players", segment: "has_poker21" });
  poker21PlayersRequest.url = "/api/player-crm?pwaSession=" + encodeURIComponent(s.admin) + "&menuAccessToken=" + encodeURIComponent(menuAccessToken) + "&mode=players&segment=has_poker21";
  r = await call(crm, poker21PlayersRequest);
  const poker21Rows4430 = (r.body.players || []).filter((row) => row && row.pokerPlusUserId === "4430");
  assert.strictEqual(poker21Rows4430.length, 1, "CRM Poker21 segment removes duplicate Poker21 IDs before pagination");
  assert.strictEqual(poker21Rows4430[0].accountId, "ID199991", "CRM Poker21 segment keeps the most recently linked duplicate");

  r = await call(chat, req("POST", {}, { pwaSession: s.user, with: "tg_1002", text: "blocked globally" }));
  assert.strictEqual(r.statusCode, 403, "globally blocked user cannot use chat");
  assert.strictEqual(r.body.code, "APP_USER_BLOCKED", "chat returns app-blocked code");

  r = await call(user, req("GET", { pwaSession: s.user, path: "bonus-balance" }));
  assert.strictEqual(r.statusCode, 403, "globally blocked user cannot load user endpoint");
  assert.strictEqual(r.body.code, "APP_USER_BLOCKED", "user endpoint returns app-blocked code");

  r = await call(crm, req("POST", {}, {
    pwaSession: s.admin,
    menuAccessToken,
    action: "unblock_player",
    targetId: "tg_1001",
  }));
  assert.strictEqual(r.statusCode, 200, "CRM owner can unblock app user");
  assert.strictEqual(r.body.blocked, false, "CRM unblock response marks unblocked");

  r = await call(chat, req("POST", {}, { pwaSession: s.user, with: "tg_1002", text: "after global unblock" }));
  assert.strictEqual(r.statusCode, 200, "unblocked app user can use chat again");
}

async function testCrmWeekUsesMondaySixMoscowCutoff() {
  const utils = require(path.join(root, "lib", "player-crm-utils"));
  const reportShifts = loadHandler("admin-report-shifts")._test;
  const originalNow = Date.now;
  try {
    Date.now = () => Date.parse("2026-07-27T02:59:59.999Z");
    let current = utils.rangeForPeriodKey("current_week");
    let previous = utils.rangeForPeriodKey("last_week");
    assert.strictEqual(current.from, "2026-07-20", "before Monday 06:00 MSK current week still starts on the previous Monday");
    assert.strictEqual(current.to, "2026-07-26", "before Monday 06:00 MSK Sunday is still the current business day");
    assert.strictEqual(previous.from, "2026-07-13", "previous week starts one report week earlier before handover");
    assert.strictEqual(previous.to, "2026-07-19", "previous week ends before the active report week");
    assert.strictEqual(
      reportShifts.crmDisplayWeekStartMs(),
      Date.parse("2026-07-20T03:00:00.000Z"),
      "reports keep the ending week active until Monday 06:00 MSK"
    );

    Date.now = () => Date.parse("2026-07-27T03:00:00.000Z");
    current = utils.rangeForPeriodKey("current_week");
    previous = utils.rangeForPeriodKey("last_week");
    assert.strictEqual(current.from, "2026-07-27", "at Monday 06:00 MSK a new current week starts");
    assert.strictEqual(current.to, "2026-07-27", "the new current week initially contains Monday");
    assert.strictEqual(previous.from, "2026-07-20", "after handover last week starts on the preceding Monday");
    assert.strictEqual(previous.to, "2026-07-26", "after handover last week ends on the preceding Sunday");
    assert.strictEqual(current.fromMs, Date.parse("2026-07-27T03:00:00.000Z"), "server range starts exactly at Monday 06:00 MSK");
    assert.strictEqual(
      reportShifts.crmDisplayWeekStartMs(),
      Date.parse("2026-07-27T03:00:00.000Z"),
      "reports switch to the new week exactly at Monday 06:00 MSK"
    );
  } finally {
    Date.now = originalNow;
  }
}

async function testCrmPokerPlusStatsDeduplicatePokerId() {
  const crm = loadHandler("player-crm");
  const summary = crm._test.computeStatsSummary({
    players: [
      { pokerPlusUserId: "4430", pokerPlusLinkedAt: "2026-07-27T04:00:00.000Z", channels: {}, deposits: {}, depositCount: {} },
      { pokerPlusUserId: "4430", pokerPlusLinkedAt: "2026-07-27T04:30:00.000Z", channels: {}, deposits: {}, depositCount: {} },
    ],
    registeredAccounts: [],
    pokerPlusAccounts: [
      { accountId: "tg_1", pokerPlusUserId: "4430", linkedAt: "2026-07-27T04:00:00.000Z" },
      { accountId: "mail_ID000001", pokerPlusUserId: "4430", linkedAt: "2026-07-27T04:30:00.000Z" },
    ],
    range: {
      from: "2026-07-27",
      to: "2026-07-27",
      fromMs: Date.parse("2026-07-27T03:00:00.000Z"),
      toMs: Date.parse("2026-07-28T02:59:59.999Z"),
    },
    rangeKey: "current_week",
    visitDailySummary: null,
    activeAnonymousInstallations: 0,
    analyticsSummary: null,
  });
  assert.strictEqual(summary.current.pokerPlus, 1, "current Poker21 total counts a Poker21 ID only once");
  assert.strictEqual(summary.pokerPlus, 1, "period Poker21 bindings count a Poker21 ID only once");
  assert.strictEqual(summary.pokerPlusNet, 1, "period Poker21 net does not include duplicate account bindings");
}

async function testSundayReportCollectsPendingWeeklyRakeback() {
  const reportShifts = loadHandler("admin-report-shifts")._test;
  function row(groupId, stamp, ownerId, accounted) {
    return {
      groupId,
      kind: "base",
      room: "P21",
      playerId: groupId,
      rake: 1000,
      percent: 20,
      amount: 200,
      saved: true,
      ownerId,
      entryAddedAt: Date.parse(stamp),
      createdAt: Date.parse(stamp),
      accounted: accounted === true,
    };
  }
  const result = reportShifts.collectDraftRakebackRowsForReport({
    rows: [
      row("monday_pending", "2026-07-20T08:00:00.000Z", "tg_admin", false),
      row("sunday_pending", "2026-07-26T08:00:00.000Z", "tg_admin", false),
      row("previous_week", "2026-07-19T08:00:00.000Z", "tg_admin", false),
      row("another_owner", "2026-07-22T08:00:00.000Z", "tg_other", false),
      row("already_accounted", "2026-07-23T08:00:00.000Z", "tg_admin", true),
    ],
  }, {
    id: "sunday_report",
    date: "26.07.2026",
    createdAt: "2026-07-26T18:00:00.000Z",
  }, "tg_admin");
  assert.deepStrictEqual(
    result.rows.map((item) => item.groupId).sort(),
    ["monday_pending", "sunday_pending"],
    "Sunday report closes the week with all still-unaccounted rows for its author only"
  );
}

async function testRakebackReportUsesAddonDelta() {
  const reportShifts = loadHandler("admin-report-shifts")._test;
  const rows = [
    {
      groupId: "series",
      kind: "base",
      room: "P21",
      playerId: "4430",
      rake: 1000,
      percent: 20,
      amount: 200,
      entryAddedAt: Date.parse("2026-07-20T08:00:00.000Z"),
    },
    {
      groupId: "series",
      kind: "addon",
      room: "P21",
      playerId: "4430",
      rake: 1500,
      percent: 20,
      amount: 300,
      entryAddedAt: Date.parse("2026-07-21T08:00:00.000Z"),
    },
  ];
  const contributions = reportShifts.rakebackReportedContributionMap(rows);
  assert.strictEqual(contributions.get("series|base|P21|4430"), 200, "base row reports its full contribution");
  assert.strictEqual(
    contributions.get("series|addon|P21|4430|" + String(rows[1].entryAddedAt)),
    100,
    "addon reports only the rake delta contribution"
  );
  const report = reportShifts.recalcReportTotalsFromRows({
    deposit: 0,
    rakebackRows: rows.map((row) => ({
      ...row,
      reportedAmount: contributions.get(
        row.kind === "addon"
          ? "series|addon|P21|4430|" + String(row.entryAddedAt)
          : "series|base|P21|4430"
      ),
    })),
  });
  assert.strictEqual(report.rakeback, 300, "report total sums base and addon delta without cumulative duplication");
  const weekStart = Date.parse("2026-07-20T03:00:00.000Z");
  assert.strictEqual(
    reportShifts.rakebackWeekReportedTotal(rows.map((row) => ({ ...row, saved: true })), weekStart),
    300,
    "weekly report total uses the same base plus addon-delta formula as CRM"
  );
}

async function testRaffleJoinLeave(redis) {
  const raffles = loadHandler("raffles");
  const s = sessions();
  const pwa = require(path.join(root, "lib", "poker-pwa-session"));
  const linkedAccountToken = pwa.signPwaSession(
    { id: 1001, memberId: "mail_ID100001", username: "player" },
    BOT_TOKEN
  );
  const raffle = {
    id: "contract_raffle",
    title: "Contract raffle",
    totalWinners: 1,
    groups: [{ prize: "Ticket", count: 1 }],
    endDate: new Date(Date.now() + 3600_000).toISOString(),
    participants: [],
    winners: [],
    status: "active",
    createdAt: new Date().toISOString(),
  };
  redis.kv.set("poker_app:raffle:contract_raffle", JSON.stringify(raffle));
  redis.l("poker_app:raffle_ids").push("contract_raffle");
  redis.h("poker_app:visitor_p21_ids").set("ID100001", "P21-1001");
  redis.h("poker_app:visitor_dt_ids").set("tg_1001", "ID100001");
  redis.h("poker_app:id_to_user").set("ID100001", "tg_1001");
  redis.h("poker_app:visitor_p21_ids").set("ID100002", "P21-1002");
  redis.h("poker_app:visitor_dt_ids").set("tg_1002", "ID100002");
  redis.h("poker_app:id_to_user").set("ID100002", "tg_1002");

  let r = await call(raffles, req("POST", {}, {
    pwaSession: "not-a-valid-session",
    guestDeviceId: "dev-contract-auth-fallback",
    action: "join",
    raffleId: "contract_raffle",
    deviceId: "dev-contract-auth-fallback",
  }));
  assert.strictEqual(r.statusCode, 401, "raffle invalid auth does not fall back to guest");
  assert.strictEqual(r.body.code, "AUTH_INVALID", "raffle invalid auth returns auth-invalid code");

  r = await call(raffles, req("POST", {}, { pwaSession: linkedAccountToken, action: "join", raffleId: "contract_raffle", deviceId: "dev-contract-device-1" }));
  assert.strictEqual(r.statusCode, 200, "raffle join succeeds");
  assert.strictEqual(r.body.raffle.participants.length, 1, "join adds participant");
  assert.strictEqual(r.body.raffle.participants[0].accountId, "ID100001", "join stores account id");

  redis.h("poker_app:raffle_devices:contract_raffle").delete("dev-contract-device-1");
  r = await call(raffles, req("POST", {}, {
    pwaSession: s.peer,
    action: "join",
    raffleId: "contract_raffle",
    deviceId: "dev-contract-device-1",
  }, { "x-forwarded-for": "10.0.0.2" }));
  assert.strictEqual(r.statusCode, 400, "raffle blocks another account from the same device");
  assert.strictEqual(r.body.code, "SAME_DEVICE", "raffle returns same-device code");
  const storedAfterSameDevice = JSON.parse(redis.kv.get("poker_app:raffle:contract_raffle"));
  const separatelyStoredParticipants = JSON.parse(redis.kv.get("poker_app:raffle_participants_data:contract_raffle") || "[]");
  assert.strictEqual(storedAfterSameDevice.participants, undefined, "participants are not kept in monolithic raffle JSON");
  assert.strictEqual(separatelyStoredParticipants.length, 1, "same-device account is not added");

  r = await call(raffles, req("POST", {}, { pwaSession: s.user, action: "leave", raffleId: "contract_raffle" }));
  assert.strictEqual(r.statusCode, 200, "raffle leave succeeds");
  assert.strictEqual(r.body.raffle.participants.length, 0, "leave removes participant");
}

async function testRaffleAccessLevelGate(redis) {
  const raffles = loadHandler("raffles");
  const s = sessions();
  installTelegramGateFetch(redis, { botOk: true, channelOk: true });

  const allAccessRaffle = {
    id: "contract_raffle_access_all",
    title: "Contract all access raffle",
    totalWinners: 1,
    groups: [{ prize: "Ticket", count: 1 }],
    endDate: new Date(Date.now() + 3600_000).toISOString(),
    participants: [],
    winners: [],
    status: "active",
    accessLevel: 0,
    createdAt: new Date().toISOString(),
  };
  redis.kv.set("poker_app:raffle:contract_raffle_access_all", JSON.stringify(allAccessRaffle));
  redis.l("poker_app:raffle_ids").push("contract_raffle_access_all");
  redis.h("poker_app:visitor_dt_ids").set("tg_1001", "ID100001");
  redis.h("poker_app:id_to_user").set("ID100001", "tg_1001");

  let r = await call(raffles, req("POST", {}, {
    pwaSession: s.user,
    action: "join",
    raffleId: "contract_raffle_access_all",
    deviceId: "access-all-device",
  }, { "x-forwarded-for": "10.0.0.20" }));
  assert.strictEqual(r.statusCode, 200, "access level 0 allows a user without Poker21 profile");
  assert.strictEqual(r.body.raffle.participants[0].p21Id, "", "access level 0 stores empty p21 id when not linked");

  r = await call(raffles, req("POST", {}, {
    pwaSession: s.peer,
    action: "join",
    raffleId: "contract_raffle_access_all",
    deviceId: "access-all-device-peer",
  }, { "x-forwarded-for": "10.0.0.20" }));
  assert.strictEqual(r.statusCode, 200, "shared public IP does not block a different legitimate device");
  assert.strictEqual(r.body.raffle.participants.length, 2, "both accounts on a shared IP can participate");

  const firstLevelRaffle = {
    id: "contract_raffle_access_first_level",
    title: "Contract first level gated raffle",
    totalWinners: 1,
    groups: [{ prize: "Ticket", count: 1 }],
    endDate: new Date(Date.now() + 3600_000).toISOString(),
    participants: [],
    winners: [],
    status: "active",
    accessLevel: 1,
    createdAt: new Date().toISOString(),
  };
  redis.kv.set("poker_app:raffle:contract_raffle_access_first_level", JSON.stringify(firstLevelRaffle));
  redis.l("poker_app:raffle_ids").push("contract_raffle_access_first_level");

  r = await call(raffles, req("POST", {}, {
    pwaSession: s.user,
    action: "join",
    raffleId: "contract_raffle_access_first_level",
    deviceId: "access-first-level-device",
  }, { "x-forwarded-for": "10.0.0.21" }));
  assert.strictEqual(r.statusCode, 403, "access level 1 blocks a user without Poker21 profile");
  assert.strictEqual(r.body.code, "RAFFLE_LEVEL_REQUIRED", "missing Poker21 first level response keeps level code");
  assert.strictEqual(r.body.error, "Привяжите аккаунт Poker21 в профиле.", "missing Poker21 first level response explains binding");
  assert.strictEqual(r.body.requiresPoker21Profile, true, "missing Poker21 first level response marks profile requirement");

  redis.h("poker_app:pokerplus_profiles").set("tg_1001", JSON.stringify({ nickname: "Legacy Linked", totalCounter: { fee: 500000 } }));
  r = await call(raffles, req("POST", {}, {
    pwaSession: s.user,
    action: "join",
    raffleId: "contract_raffle_access_first_level",
    deviceId: "access-first-level-legacy-profile",
  }, { "x-forwarded-for": "10.0.0.21" }));
  assert.strictEqual(r.statusCode, 200, "raffle level lookup follows the account preferred Telegram id");
  assert.ok(r.body.viewerPokerPlusStatusLevel >= 1, "successful join returns the confirmed viewer level for UI sync");

  const gatedRaffle = {
    id: "contract_raffle_access_level",
    title: "Contract level gated raffle",
    totalWinners: 1,
    groups: [{ prize: "Ticket", count: 1 }],
    endDate: new Date(Date.now() + 3600_000).toISOString(),
    participants: [],
    winners: [],
    status: "active",
    accessLevel: 3,
    createdAt: new Date().toISOString(),
  };
  redis.kv.set("poker_app:raffle:contract_raffle_access_level", JSON.stringify(gatedRaffle));
  redis.l("poker_app:raffle_ids").push("contract_raffle_access_level");
  redis.h("poker_app:visitor_dt_ids").set("tg_1002", "ID100002");
  redis.h("poker_app:id_to_user").set("ID100002", "tg_1002");
  redis.h("poker_app:visitor_p21_ids").set("ID100002", "P21-LOW");
  redis.h("poker_app:pokerplus_profiles").set("ID100002", JSON.stringify({ nickname: "Low Level", totalCounter: { fee: 4000 } }));

  r = await call(raffles, req("POST", {}, {
    pwaSession: s.peer,
    action: "join",
    raffleId: "contract_raffle_access_level",
    deviceId: "access-level-device-low",
  }, { "x-forwarded-for": "10.0.0.22" }));
  assert.strictEqual(r.statusCode, 403, "raffle blocks a player below required Poker21 level");
  assert.strictEqual(r.body.code, "RAFFLE_LEVEL_REQUIRED", "low level response has stable code");
  assert.ok(String(r.body.error || "").includes("Ваш уровень:"), "low level response explains the current level");

  redis.h("poker_app:pokerplus_profiles").set("ID100002", JSON.stringify({ nickname: "Enough Level", totalCounter: { fee: 9000 } }));
  r = await call(raffles, req("POST", {}, {
    pwaSession: s.peer,
    action: "join",
    raffleId: "contract_raffle_access_level",
    deviceId: "access-level-device-ok",
  }, { "x-forwarded-for": "10.0.0.23" }));
  assert.strictEqual(r.statusCode, 200, "raffle allows a player at or above required Poker21 level");
  assert.strictEqual(r.body.raffle.accessLevel, 3, "raffle payload keeps access level");
  assert.strictEqual(r.body.raffle.participants[0].pokerPlusStatusLevel, 4, "join stores hydrated Poker21 level");
}

async function testRaffleAdminUpsertParticipantAddsTickets(redis) {
  const raffles = loadHandler("raffles");
  const s = sessions();
  const sentMessages = [];
  installRecordingFetch(redis, sentMessages);
  const raffle = {
    id: "contract_admin_upsert_tickets",
    title: "Contract admin upsert tickets",
    totalWinners: 1,
    groups: [{ prize: "Ticket", count: 1 }],
    endDate: new Date(Date.now() + 3600_000).toISOString(),
    participants: [],
    winners: [],
    status: "active",
    ticketEntryMode: "admin",
    drawMode: "weighted_tickets",
    weightedTickets: true,
    createdAt: new Date().toISOString(),
  };
  redis.kv.set("poker_app:raffle:contract_admin_upsert_tickets", JSON.stringify(raffle));
  redis.l("poker_app:raffle_ids").push("contract_admin_upsert_tickets");
  redis.h("poker_app:pokerplus_user_ids").set("ID100001", "P21ADD");
  redis.h("poker_app:visitor_p21_ids").set("tg_1001", "P21ADD");
  redis.h("poker_app:visitor_dt_ids").set("tg_1001", "ID100001");
  redis.h("poker_app:id_to_user").set("ID100001", "tg_1001");
  redis.h("poker_app:visitor_usernames").set("tg_1001", "ticket_player");
  redis.h("poker_app:visitor_usernames").set("tg_1002", "other_player");
  redis.h("poker_app:visitor_chat_display_names").set("tg_1001", "Ticket Player");
  redis.h("poker_app:pokerplus_profiles").set("ID100001", JSON.stringify({
    nickname: "Ticket Nick",
    totalCounter: { fee: 12000 },
  }));

  let r = await call(raffles, req("POST", {}, {
    pwaSession: s.admin,
    action: "adminUpsertParticipant",
    raffleId: "contract_admin_upsert_tickets",
    p21Id: "P21ADD",
    ticketCount: 2,
  }));
  assert.strictEqual(r.statusCode, 200, "raffle admin upsert adds participant");
  assert.strictEqual(r.body.raffle.participants.length, 1, "raffle admin upsert creates one participant");
  assert.strictEqual(r.body.raffle.participants[0].ticketCount, 2, "raffle admin upsert stores first ticket count");
  assert.strictEqual(r.body.raffle.participants[0].userId, "tg_1001", "raffle admin upsert links participant by p21 profile");
  assert.strictEqual(r.body.raffle.participants[0].accountId, "ID100001", "raffle admin upsert stores linked account id");
  assert.strictEqual(r.body.raffle.participants[0].telegramUsername, "ticket_player", "raffle admin upsert fills telegram username");
  assert.strictEqual(r.body.raffle.participants[0].pokerPlusNickname, "Ticket Nick", "raffle admin upsert fills pokerplus nickname");
  assert.strictEqual(sentMessages.length, 1, "raffle admin upsert notifies linked player once");
  assert.strictEqual(sentMessages[0].body.chat_id, "1001", "raffle admin upsert sends ticket notice only to linked player");
  assert.match(sentMessages[0].body.text, /Вам добавили 2 билета/i, "raffle admin upsert notice includes added tickets");
  assert.ok(!sentMessages.some((msg) => msg.body.chat_id === "1002"), "raffle admin upsert does not notify unrelated players");

  r = await call(raffles, req("POST", {}, {
    pwaSession: s.admin,
    action: "adminUpsertParticipant",
    raffleId: "contract_admin_upsert_tickets",
    p21Id: "P21ADD",
    ticketCount: 3,
  }));
  assert.strictEqual(r.statusCode, 200, "raffle admin upsert can add tickets to existing participant");
  assert.strictEqual(r.body.updated, true, "raffle admin upsert reports existing participant update");
  assert.strictEqual(r.body.raffle.participants.length, 1, "raffle admin upsert keeps one row for same participant");
  assert.strictEqual(r.body.raffle.participants[0].ticketCount, 5, "raffle admin upsert adds new tickets to previous count");
  assert.strictEqual(r.body.raffle.participants[0].entryTicketCount, 5, "raffle admin upsert keeps entry ticket count in sync");
  assert.strictEqual(sentMessages.length, 2, "raffle admin upsert notifies linked player on every ticket add");
  assert.strictEqual(sentMessages[1].body.chat_id, "1001", "raffle admin upsert sends second ticket notice only to linked player");
  assert.match(sentMessages[1].body.text, /Теперь у вас 5 билетов/i, "raffle admin upsert notice includes total tickets");

  const storedManualRow = JSON.parse(redis.kv.get("poker_app:raffle:contract_admin_upsert_tickets"));
  storedManualRow.participants = [{
    userId: "manual_raffle_legacy",
    name: "Legacy Manual",
    p21Id: "P21ADD",
    ticketCount: 1,
    entryTicketCount: 1,
    manualRaffleParticipant: true,
  }];
  redis.kv.set("poker_app:raffle:contract_admin_upsert_tickets", JSON.stringify(storedManualRow));
  sentMessages.length = 0;
  r = await call(raffles, req("POST", {}, {
    pwaSession: s.admin,
    action: "adminUpsertParticipant",
    raffleId: "contract_admin_upsert_tickets",
    p21Id: "P21ADD",
    ticketCount: 1,
  }));
  assert.strictEqual(r.statusCode, 200, "raffle admin upsert links legacy manual row");
  assert.strictEqual(r.body.raffle.participants[0].userId, "tg_1001", "raffle admin upsert replaces legacy manual id with linked user");
  assert.strictEqual(r.body.raffle.participants[0].ticketCount, 2, "raffle admin upsert keeps legacy manual tickets and adds new ones");
  assert.strictEqual(sentMessages.length, 1, "raffle admin upsert notifies after linking legacy manual row");
  assert.strictEqual(sentMessages[0].body.chat_id, "1001", "raffle admin upsert notifies linked user after legacy manual row update");
}

async function testRaffleAdminAddPrizeGroups(redis) {
  const raffles = loadHandler("raffles");
  const s = sessions();
  installFetch(redis);
  const raffle = {
    id: "contract_admin_add_prizes",
    title: "Contract admin add prizes",
    totalWinners: 3,
    groups: [
      { prize: "Ticket 300", count: 2 },
      { prize: "Ticket 500", count: 1 },
    ],
    endDate: new Date(Date.now() + 3600_000).toISOString(),
    participants: [],
    winners: [],
    status: "active",
    createdAt: new Date().toISOString(),
  };
  redis.kv.set("poker_app:raffle:contract_admin_add_prizes", JSON.stringify(raffle));
  redis.l("poker_app:raffle_ids").push("contract_admin_add_prizes");

  let r = await call(raffles, req("POST", {}, {
    pwaSession: s.admin,
    action: "addPrizeGroups",
    raffleId: "contract_admin_add_prizes",
    groups: [{ count: 2, prize: "Ticket 1000" }],
  }));
  assert.strictEqual(r.statusCode, 200, "raffle admin add prizes can append a new group");
  assert.strictEqual(r.body.raffle.groups.length, 3, "raffle admin add prizes appends one group");
  assert.strictEqual(r.body.raffle.groups[2].count, 2, "raffle admin add prizes stores new group count");
  assert.strictEqual(r.body.raffle.groups[2].prize, "Ticket 1000", "raffle admin add prizes stores new group prize");
  assert.strictEqual(r.body.raffle.totalWinners, 5, "raffle admin add prizes updates total winners after append");

  r = await call(raffles, req("POST", {}, {
    pwaSession: s.admin,
    action: "addPrizeGroups",
    raffleId: "contract_admin_add_prizes",
    targetGroupIndex: 0,
    count: 3,
  }));
  assert.strictEqual(r.statusCode, 200, "raffle admin add prizes can increase existing group");
  assert.strictEqual(r.body.updatedGroupIndex, 0, "raffle admin add prizes reports updated group index");
  assert.strictEqual(r.body.raffle.groups.length, 3, "raffle admin add prizes keeps group count when updating existing group");
  assert.strictEqual(r.body.raffle.groups[0].count, 5, "raffle admin add prizes increases selected group count");
  assert.strictEqual(r.body.raffle.groups[0].prize, "Ticket 300", "raffle admin add prizes keeps selected group prize");
  assert.strictEqual(r.body.raffle.totalWinners, 8, "raffle admin add prizes updates total winners after existing group increase");
}

async function testRaffleAdminRemoveParticipant(redis) {
  const raffles = loadHandler("raffles");
  const s = sessions();
  const raffle = {
    id: "contract_admin_remove",
    title: "Contract admin remove",
    totalWinners: 1,
    groups: [{ prize: "Ticket", count: 1 }],
    endDate: new Date(Date.now() + 3600_000).toISOString(),
    participants: [
      {
        userId: "manual_raffle_remove_me",
        name: "Remove Me",
        p21Id: "P21REMOVE",
        ticketCount: 2,
        entryTicketCount: 2,
        manualRaffleParticipant: true,
        ip: "10.10.0.1",
        deviceId: "dev-remove-me",
      },
      {
        userId: "manual_raffle_keep_me",
        name: "Keep Me",
        p21Id: "P21KEEP",
        ticketCount: 1,
        entryTicketCount: 1,
        manualRaffleParticipant: true,
        ip: "10.10.0.2",
        deviceId: "dev-keep-me",
      },
    ],
    winners: [],
    status: "active",
    ticketEntryMode: "admin",
    drawMode: "weighted_tickets",
    weightedTickets: true,
    createdAt: new Date().toISOString(),
  };
  redis.kv.set("poker_app:raffle:contract_admin_remove", JSON.stringify(raffle));
  redis.l("poker_app:raffle_ids").push("contract_admin_remove");
  redis.h("poker_app:raffle_ips:contract_admin_remove").set("10.10.0.1", "manual_raffle_remove_me");
  redis.h("poker_app:raffle_devices:contract_admin_remove").set("dev-remove-me", "manual_raffle_remove_me");

  let r = await call(raffles, req("POST", {}, {
    pwaSession: s.user,
    action: "adminRemoveParticipant",
    raffleId: "contract_admin_remove",
    p21Id: "P21REMOVE",
  }));
  assert.strictEqual(r.statusCode, 403, "raffle admin remove is admin-only");

  r = await call(raffles, req("POST", {}, {
    pwaSession: s.admin,
    action: "adminRemoveParticipant",
    raffleId: "contract_admin_remove",
    p21Id: "P21REMOVE",
  }));
  assert.strictEqual(r.statusCode, 200, "raffle admin remove succeeds");
  assert.strictEqual(r.body.removedCount, 1, "raffle admin remove returns removed count");
  assert.strictEqual(r.body.raffle.participants.length, 1, "raffle admin remove keeps other participants");
  assert.strictEqual(r.body.raffle.participants[0].p21Id, "P21KEEP", "raffle admin remove removes selected participant");
  assert.strictEqual(
    redis.h("poker_app:raffle_ips:contract_admin_remove").has("10.10.0.1"),
    false,
    "raffle admin remove clears removed participant ip lock"
  );
  assert.strictEqual(
    redis.h("poker_app:raffle_devices:contract_admin_remove").has("dev-remove-me"),
    false,
    "raffle admin remove clears removed participant device lock"
  );

  r = await call(raffles, req("POST", {}, {
    pwaSession: s.admin,
    action: "adminRemoveParticipant",
    raffleId: "contract_admin_remove",
    p21Id: "P21REMOVE",
  }));
  assert.strictEqual(r.statusCode, 200, "raffle admin remove is idempotent");
  assert.strictEqual(r.body.alreadyRemoved, true, "raffle admin remove reports already removed participant");

  const ambiguous = {
    id: "contract_admin_remove_ambiguous",
    title: "Contract admin remove ambiguous",
    totalWinners: 1,
    groups: [{ prize: "Ticket", count: 1 }],
    endDate: new Date(Date.now() + 3600_000).toISOString(),
    participants: [
      { userId: "manual_raffle_same_a", name: "Участник", ticketCount: 1, manualRaffleParticipant: true },
      { userId: "manual_raffle_same_b", name: "Участник", ticketCount: 1, manualRaffleParticipant: true },
    ],
    winners: [],
    status: "active",
    ticketEntryMode: "admin",
    drawMode: "weighted_tickets",
    weightedTickets: true,
    createdAt: new Date().toISOString(),
  };
  redis.kv.set("poker_app:raffle:contract_admin_remove_ambiguous", JSON.stringify(ambiguous));
  redis.l("poker_app:raffle_ids").push("contract_admin_remove_ambiguous");
  r = await call(raffles, req("POST", {}, {
    pwaSession: s.admin,
    action: "adminRemoveParticipant",
    raffleId: "contract_admin_remove_ambiguous",
    name: "Участник",
  }));
  assert.strictEqual(r.statusCode, 400, "raffle admin remove rejects generic participant names");
  const ambiguousStored = JSON.parse(redis.kv.get("poker_app:raffle:contract_admin_remove_ambiguous"));
  assert.strictEqual(ambiguousStored.participants.length, 2, "raffle admin remove keeps all participants on ambiguous target");

  r = await call(raffles, req("POST", {}, {
    pwaSession: s.admin,
    action: "adminRemoveParticipant",
    raffleId: "contract_admin_remove_ambiguous",
    userId: "manual_raffle_same_a",
    name: "Участник",
  }));
  assert.strictEqual(r.statusCode, 200, "raffle admin remove allows exact manual row id with generic name");
  assert.strictEqual(r.body.removedCount, 1, "raffle admin remove deletes one exact manual row");
  assert.strictEqual(r.body.raffle.participants.length, 1, "raffle admin remove leaves other generic rows");
  assert.strictEqual(r.body.raffle.participants[0].userId, "manual_raffle_same_b", "raffle admin remove keeps the non-selected manual row");
}

async function testRaffleActiveListIncludesDailySibling(redis) {
  const raffles = loadHandler("raffles");
  const s = sessions();
  const base = Date.now();
  const first = {
    id: "contract_active_regular",
    title: "Contract active regular",
    totalWinners: 1,
    groups: [{ prize: "Ticket regular", count: 1 }],
    endDate: new Date(base + 3600_000).toISOString(),
    participants: [],
    winners: [],
    status: "active",
    createdAt: new Date(base - 2000).toISOString(),
  };
  const second = {
    id: "contract_active_daily",
    title: "Contract active daily",
    totalWinners: 1,
    groups: [{ prize: "Ticket daily", count: 1 }],
    endDate: new Date(base + 7200_000).toISOString(),
    participants: [],
    winners: [],
    status: "active",
    createdAt: new Date(base - 1000).toISOString(),
    daily: true,
    recurrence: {
      type: "daily",
      timeZone: "Europe/Moscow",
      startTime: "12:00",
      seriesId: "contract_daily_series",
      scheduledStartAt: new Date(base - 1000).toISOString(),
      nextStartAt: new Date(base + 24 * 3600_000).toISOString(),
      durationMs: 7200_000,
      template: {
        title: "Contract active daily",
        totalWinners: 1,
        groups: [{ prize: "Ticket daily", count: 1 }],
        prizeKind: "tournament_ticket",
      },
    },
  };
  redis.kv.set("poker_app:raffle:contract_active_regular", JSON.stringify(first));
  redis.kv.set("poker_app:raffle:contract_active_daily", JSON.stringify(second));
  redis.l("poker_app:raffle_ids").push("contract_active_regular");
  redis.l("poker_app:raffle_ids").push("contract_active_daily");

  const r = await call(raffles, req("GET", { pwaSession: s.user }));
  assert.strictEqual(r.statusCode, 200, "raffle list succeeds with two active raffles");
  const activeIds = (r.body.activeRaffles || []).map((raffle) => raffle.id);
  assert.deepStrictEqual(
    activeIds.sort(),
    ["contract_active_daily", "contract_active_regular"].sort(),
    "activeRaffles exposes every active raffle"
  );
  assert.strictEqual(
    (r.body.raffles || []).filter((raffle) => raffle && raffle.status === "active").length,
    2,
    "raffles payload keeps both active raffle records"
  );

  const compact = await call(raffles, req("GET", {
    pwaSession: s.user,
    scope: "active",
    bypassListCache: "1",
  }));
  assert.strictEqual(compact.statusCode, 200, "compact active raffle list succeeds");
  assert.deepStrictEqual(
    (compact.body.activeRaffles || []).map((raffle) => raffle.id).sort(),
    ["contract_active_daily", "contract_active_regular"].sort(),
    "compact active payload keeps every active raffle"
  );
  assert.strictEqual(
    (compact.body.raffles || []).some((raffle) => raffle && raffle.status === "active"),
    false,
    "compact active payload does not duplicate active raffle records"
  );
  assert.strictEqual(
    Object.prototype.hasOwnProperty.call(compact.body, "activeRaffle"),
    false,
    "compact active payload does not duplicate the first active raffle"
  );

  const completed = {
    ...first,
    id: "contract_completed_target",
    status: "drawn",
    completedNumber: 777,
    completedAt: new Date(base - 500).toISOString(),
    winners: [{ userId: "tg_1001", name: "Winner", prize: "Ticket", groupIndex: 0 }],
  };
  redis.kv.set("poker_app:raffle:contract_completed_target", JSON.stringify(completed));
  redis.l("poker_app:raffle_ids").push("contract_completed_target");
  const completedOne = await call(raffles, req("GET", {
    pwaSession: s.user,
    scope: "completed-one",
    target: "777",
  }));
  assert.strictEqual(completedOne.statusCode, 200, "completed raffle deeplink target loads separately");
  assert.strictEqual(completedOne.body.raffle.id, "contract_completed_target", "completed raffle deeplink resolves archive number");
}

async function testParticipationRequiresBotAndChannel(redis) {
  const raffles = loadHandler("raffles");
  const promo = loadHandler("promo");
  const s = sessions();
  const raffle = {
    id: "contract_raffle_gate",
    title: "Contract gated raffle",
    totalWinners: 1,
    groups: [{ prize: "Ticket", count: 1 }],
    endDate: new Date(Date.now() + 3600_000).toISOString(),
    participants: [],
    winners: [],
    status: "active",
    createdAt: new Date().toISOString(),
  };
  redis.kv.set("poker_app:raffle:contract_raffle_gate", JSON.stringify(raffle));
  redis.l("poker_app:raffle_ids").push("contract_raffle_gate");
  redis.h("poker_app:visitor_p21_ids").set("ID100001", "P21-1001");
  redis.h("poker_app:visitor_dt_ids").set("tg_1001", "ID100001");
  redis.h("poker_app:id_to_user").set("ID100001", "tg_1001");

  let r = await call(raffles, req("POST", {}, {
    guestDeviceId: "guest-raffle-gate-device",
    action: "join",
    raffleId: "contract_raffle_gate",
    deviceId: "guest-raffle-gate-device",
  }));
  assert.strictEqual(r.statusCode, 403, "guest raffle join requires login before Telegram subscription gate");
  assert.strictEqual(r.body.code, "RAFFLE_LOGIN_REQUIRED", "guest raffle join returns login-required code");
  assert.ok(!r.body.botUrl && !r.body.channelUrl, "guest raffle join does not show subscription links before login");

  r = await call(promo, req("POST", { path: "daily-poker/play" }, {
    pwaSession: s.user,
    idempotencyKey: "daily-gate-poker21",
  }));
  assert.strictEqual(r.statusCode, 403, "daily poker play requires a linked Poker21 account");
  assert.strictEqual(r.body.code, "POKER21_REQUIRED", "daily poker returns Poker21-required code");
  assert.strictEqual(r.body.requiresPoker21Profile, true, "daily poker explains that Poker21 profile is required");
  redis.h("poker_app:pokerplus_user_ids").set("ID100001", "P21-1001");

  installTelegramGateFetch(redis, { botOk: false, channelOk: true });
  r = await call(raffles, req("POST", {}, {
    pwaSession: s.user,
    action: "join",
    raffleId: "contract_raffle_gate",
    deviceId: "gate-dev-1",
  }));
  assert.strictEqual(r.statusCode, 403, "raffle join requires bot");
  assert.strictEqual(r.body.code, "BOT_REQUIRED", "raffle join returns bot-required code");
  assert.ok(String(r.body.error || "").includes("/start"), "raffle bot error explains start command");
  assert.ok(
    Array.isArray(r.body.missingRequirements) && r.body.missingRequirements.some((item) => item && item.key === "bot" && item.url),
    "raffle bot error includes concrete bot requirement"
  );

  installTelegramGateFetch(redis, { botOk: true, channelOk: false });
  r = await call(raffles, req("POST", {}, {
    pwaSession: s.user,
    action: "join",
    raffleId: "contract_raffle_gate",
    deviceId: "gate-dev-2",
  }));
  assert.strictEqual(r.statusCode, 403, "raffle join requires channel");
  assert.strictEqual(r.body.code, "CHANNEL_REQUIRED", "raffle join returns channel-required code");
  assert.ok(String(r.body.error || "").includes("@Dva_tuza_club"), "raffle channel error names club channel");
  assert.ok(
    Array.isArray(r.body.missingRequirements) && r.body.missingRequirements.some((item) => item && item.key === "channel" && item.url),
    "raffle channel error includes concrete channel requirement"
  );

  installTelegramGateFetch(redis, { botOk: true, channelOk: false });
  r = await call(promo, req("POST", { path: "daily-poker/play" }, {
    pwaSession: s.user,
    idempotencyKey: "daily-gate-channel",
  }));
  assert.strictEqual(r.statusCode, 403, "daily poker play requires channel");
  assert.strictEqual(r.body.code, "CHANNEL_REQUIRED", "daily poker returns channel-required code");
  assert.ok(String(r.body.error || "").includes("Раздать карты"), "daily poker channel error explains retry action");
  assert.ok(
    Array.isArray(r.body.missingRequirements) && r.body.missingRequirements.some((item) => item && item.key === "channel" && item.url),
    "daily poker channel error includes concrete channel requirement"
  );

  installTelegramGateFetch(redis, { botOk: false, channelOk: true });
  r = await call(promo, req("POST", { path: "daily-poker/play" }, {
    pwaSession: s.user,
    idempotencyKey: "daily-gate-bot",
  }));
  assert.strictEqual(r.statusCode, 403, "daily poker play requires bot");
  assert.strictEqual(r.body.code, "BOT_REQUIRED", "daily poker returns bot-required code");
  assert.ok(String(r.body.error || "").includes("@Poker_dvatuza_bot"), "daily poker bot error names club bot");
  assert.ok(
    Array.isArray(r.body.missingRequirements) && r.body.missingRequirements.some((item) => item && item.key === "bot" && item.url),
    "daily poker bot error includes concrete bot requirement"
  );
}

async function testRaffleEmailAccountSubscriptionGate(redis) {
  const subscribe = loadHandler("raffle-subscribe");
  const pwa = require(path.join(root, "lib", "poker-pwa-session"));
  const emailOnlyToken = pwa.signPwaSession(
    { id: 0, memberId: "mail_ID100004", username: "", email: "email-only@example.test" },
    BOT_TOKEN
  );
  installTelegramGateFetch(redis, { botOk: true, channelOk: true });
  let r = await call(subscribe, req("POST", {}, { pwaSession: emailOnlyToken }));
  assert.strictEqual(r.statusCode, 400, "email-only raffle subscribe requires Telegram bot");
  assert.strictEqual(r.body.code, "BOT_REQUIRED", "email-only subscribe returns bot-required code");
  assert.strictEqual(redis.s("poker_app:raffle_account_subscribers").has("ID100004"), false, "email-only subscribe is not saved");

  const emailToken = pwa.signPwaSession(
    { id: 0, memberId: "mail_ID100003", username: "", email: "player@example.test" },
    BOT_TOKEN
  );
  redis.h("poker_app:visitor_dt_ids").set("tg_1003", "ID100003");
  redis.h("poker_app:id_to_user").set("ID100003", "tg_1003");
  redis.s("poker_app:raffle_subscribers").add("0");
  redis.h("poker_app:bot_subscribed_at").set("0", "legacy");

  installTelegramGateFetch(redis, { botOk: false, channelOk: true });
  r = await call(subscribe, req("POST", {}, { pwaSession: emailToken }));
  assert.strictEqual(r.statusCode, 403, "linked email raffle subscribe requires reachable bot");
  assert.strictEqual(r.body.code, "BOT_REQUIRED", "linked email subscribe returns bot-required code");
  assert.strictEqual(redis.s("poker_app:raffle_account_subscribers").has("ID100003"), false, "unreachable bot subscribe is not saved");

  installTelegramGateFetch(redis, { botOk: true, channelOk: true });
  r = await call(subscribe, req("POST", {}, { pwaSession: emailToken }));
  assert.strictEqual(r.statusCode, 200, "linked email raffle subscribe succeeds after bot start");
  assert.strictEqual(redis.s("poker_app:raffle_account_subscribers").has("ID100003"), true, "email subscribe stores account id");
  assert.strictEqual(redis.s("poker_app:raffle_subscribers").has("1003"), true, "email subscribe stores linked Telegram chat id");
  assert.strictEqual(redis.s("poker_app:raffle_subscribers").has("0"), false, "email subscribe cleans legacy chat id 0");
  assert.strictEqual(redis.h("poker_app:bot_subscribed_at").has("0"), false, "email subscribe cleans legacy bot_subscribed_at 0");

  const users = loadHandler("users");
  r = await call(users, req("GET", { pwaSession: emailToken }));
  assert.strictEqual(r.statusCode, 200, "email profile user info succeeds");
  assert.strictEqual(r.body.telegramSubscriptions.accountSubscribed, true, "profile reports account subscription");
  assert.strictEqual(r.body.telegramSubscriptions.botSubscribed, true, "profile marks bot checklist item from account subscription");
  assert.strictEqual(r.body.telegramSubscriptions.channelSubscribed, true, "profile marks channel checklist item from account subscription");

  const raffles = loadHandler("raffles");
  const raffle = {
    id: "contract_raffle_email_gate",
    title: "Contract email gated raffle",
    totalWinners: 1,
    groups: [{ prize: "Ticket", count: 1 }],
    endDate: new Date(Date.now() + 3600_000).toISOString(),
    participants: [],
    winners: [],
    status: "active",
    createdAt: new Date().toISOString(),
  };
  redis.kv.set("poker_app:raffle:contract_raffle_email_gate", JSON.stringify(raffle));
  redis.l("poker_app:raffle_ids").push("contract_raffle_email_gate");
  redis.h("poker_app:visitor_p21_ids").set("ID100003", "P21-1003");

  installTelegramGateFetch(redis, { botOk: true, channelOk: true });
  r = await call(raffles, req("POST", {}, {
    pwaSession: emailToken,
    action: "join",
    raffleId: "contract_raffle_email_gate",
    deviceId: "email-gate-dev-1",
  }));
  assert.strictEqual(r.statusCode, 200, "linked email account with bot access can join raffle");
  assert.strictEqual(r.body.raffle.participants[0].accountId, "ID100003", "email join stores dt account id");

  redis.h("poker_app:email_links").set("player@example.test", "ID100003");
  redis.h("poker_app:visitor_dt_ids").set("mail_pending_contract_old", "ID199999");
  redis.h("poker_app:id_to_user").set("ID199999", "mail_pending_contract_old");
  const staleNumericEmailToken = pwa.signPwaSession(
    { id: 9999, memberId: "mail_pending_contract_old", username: "", email: "player@example.test" },
    BOT_TOKEN
  );
  const staleNumericRaffle = {
    id: "contract_raffle_email_gate_stale_numeric",
    title: "Contract email gated raffle stale numeric",
    totalWinners: 1,
    groups: [{ prize: "Ticket", count: 1 }],
    endDate: new Date(Date.now() + 3600_000).toISOString(),
    participants: [],
    winners: [],
    status: "active",
    createdAt: new Date().toISOString(),
  };
  redis.kv.set("poker_app:raffle:contract_raffle_email_gate_stale_numeric", JSON.stringify(staleNumericRaffle));
  redis.l("poker_app:raffle_ids").push("contract_raffle_email_gate_stale_numeric");

  installTelegramGateFetch(redis, { botOk: true, channelOk: true, expectedTelegramId: "1003" });
  r = await call(raffles, req("POST", {}, {
    pwaSession: staleNumericEmailToken,
    action: "join",
    raffleId: "contract_raffle_email_gate_stale_numeric",
    deviceId: "email-gate-dev-2",
  }));
  assert.strictEqual(r.statusCode, 200, "email join uses linked Telegram id before stale pwa numeric id");
  assert.strictEqual(r.body.raffle.participants[0].accountId, "ID100003", "stale numeric email join still stores dt account id");
}

async function testRaffleWinnerReady(redis) {
  const sentMessages = [];
  installRecordingFetch(redis, sentMessages);
  const raffles = loadHandler("raffles");
  const s = sessions();
  const raffle = {
    id: "contract_raffle_ready",
    title: "Ready raffle",
    totalWinners: 1,
    groups: [{ prize: "Ticket", count: 1 }],
    endDate: new Date(Date.now() - 3600_000).toISOString(),
    participants: [],
    winners: [{
      userId: "tg_1001",
      accountId: "ID100001",
      name: "Player",
      p21Id: "P21-1001",
      groupIndex: 0,
      prize: "Ticket",
    }],
    status: "drawn",
    createdAt: new Date(Date.now() - 7200_000).toISOString(),
    drawnAt: new Date(Date.now() - 1800_000).toISOString(),
  };
  redis.kv.set("poker_app:raffle:contract_raffle_ready", JSON.stringify(raffle));
  redis.l("poker_app:raffle_ids").push("contract_raffle_ready");
  redis.h("poker_app:visitor_dt_ids").set("tg_1001", "ID100001");
  redis.h("poker_app:id_to_user").set("ID100001", "tg_1001");
  redis.h("poker_app:visitor_dt_ids").set("tg_1002", "ID100002");
  redis.h("poker_app:id_to_user").set("ID100002", "tg_1002");

  let r = await call(raffles, req("POST", {}, {
    pwaSession: s.peer,
    action: "setWinnerReady",
    raffleId: "contract_raffle_ready",
    winnerUserId: "tg_1001",
  }));
  assert.strictEqual(r.statusCode, 403, "non-winner cannot mark winner ready");

  r = await call(raffles, req("POST", {}, {
    pwaSession: s.user,
    action: "setWinnerReady",
    raffleId: "contract_raffle_ready",
    winnerUserId: "tg_1001",
  }));
  assert.strictEqual(r.statusCode, 200, "winner can mark self ready");
  assert.strictEqual(r.body.raffle.winners[0].winnerReady, true, "winner ready flag is stored");
  assert.strictEqual(r.body.raffle.winners[0].winnerReadyBy, "tg_1001", "winner ready author is stored");
  assert.ok(r.body.raffle.winners[0].winnerReadyAt, "winner ready timestamp is stored");
  for (let i = 0; i < 8 && sentMessages.length === 0; i += 1) {
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
}

async function testRaffleWinnerReadyPrivateCashReserve(redis) {
  const sentMessages = [];
  installRecordingFetch(redis, sentMessages);
  const raffles = loadHandler("raffles");
  const s = sessions();
  const eventId = "contract_private_cash_raffle_ready_event";
  redis.kv.set("poker_app:private_cash_event:" + eventId, JSON.stringify({
    id: eventId,
    date: "2026-07-01",
    time: "20:00",
    gameType: "Холдем",
    stakes: "20/40",
    buyIn: "1000",
    status: "active",
    createdAt: new Date().toISOString(),
    createdBy: "contract",
  }));
  redis.l("poker_app:private_cash_events").push(eventId);

  let r = await call(raffles, req("POST", {}, {
    pwaSession: s.admin,
    action: "create",
    totalWinners: 1,
    groups: [{ prize: "Резерв на приватный кеш", count: 1 }],
    endDate: new Date(Date.now() + 3600_000).toISOString(),
    title: "Розыгрыш на приватный кеш",
    prizeKind: "cash",
    prizeAction: "private_cash",
  }));
  assert.strictEqual(r.statusCode, 200, "admin can create private cash raffle");
  assert.strictEqual(r.body.raffle.prizeAction, "private_cash", "private cash raffle stores prize action");

  const raffle = {
    id: "contract_raffle_private_cash_ready",
    title: "Розыгрыш на приватный кеш",
    prizeKind: "cash",
    prizeAction: "private_cash",
    totalWinners: 1,
    groups: [{ prize: "Резерв на приватный кеш", count: 1 }],
    endDate: new Date(Date.now() - 3600_000).toISOString(),
    participants: [],
    winners: [{
      userId: "tg_1001",
      accountId: "ID100001",
      name: "Player",
      p21Id: "P21-1001",
      groupIndex: 0,
      prize: "Резерв на приватный кеш",
    }],
    status: "drawn",
    createdAt: new Date(Date.now() - 7200_000).toISOString(),
    drawnAt: new Date(Date.now() - 1800_000).toISOString(),
  };
  redis.kv.set("poker_app:raffle:" + raffle.id, JSON.stringify(raffle));
  redis.l("poker_app:raffle_ids").push(raffle.id);
  redis.h("poker_app:visitor_dt_ids").set("tg_1001", "ID100001");
  redis.h("poker_app:id_to_user").set("ID100001", "tg_1001");

  r = await call(raffles, req("POST", {}, {
    pwaSession: s.user,
    action: "setWinnerReady",
    raffleId: raffle.id,
    winnerUserId: "tg_1001",
  }));
  assert.strictEqual(r.statusCode, 200, "private cash winner can mark self ready");
  assert.strictEqual(r.body.raffle.winners[0].winnerReady, true, "private cash winner ready flag is stored");
  assert.strictEqual(r.body.raffle.winners[0].privateCashRegistered, true, "winner is marked registered in private cash");
  assert.strictEqual(r.body.raffle.winners[0].privateCashEventId, eventId, "winner is linked to active private cash event");
  assert.strictEqual(r.body.raffle.winners[0].winnerStatus, undefined, "private cash registration does not auto-issue prize");

  const privateCashRowRaw = redis.h("poker_app:private_cash_participants:" + eventId).get("ID100001");
  assert.ok(privateCashRowRaw, "private cash participant row is stored");
  const privateCashRow = JSON.parse(privateCashRowRaw);
  assert.strictEqual(privateCashRow.status, "pending", "private cash raffle winner is stored as a pending reserve request");
  assert.ok(Number(privateCashRow.seatIndex) >= 7, "private cash raffle winner goes to private cash reserve");

  r = await call(raffles, req("POST", {}, {
    pwaSession: s.admin,
    action: "setWinnerStatus",
    raffleId: raffle.id,
    winnerUserId: "tg_1001",
    status: "ok",
  }));
  assert.strictEqual(r.statusCode, 200, "admin can issue private cash raffle prize");
  assert.strictEqual(r.body.raffle.winners[0].winnerStatus, "ok", "admin green check issues private cash raffle prize");
  for (let i = 0; i < 8 && !sentMessages.some((msg) => String(msg.body.text || "").includes("Приз начислен")); i += 1) {
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  assert.ok(
    sentMessages.some((msg) => String(msg.body.chat_id) === "1001" && String(msg.body.text || "").includes("Приз начислен")),
    "private cash raffle winner receives normal prize issued notification after admin green check",
  );
}

async function testRaffleWinnerReadyCannotConfirmAnotherWinner(redis) {
  const sentMessages = [];
  installRecordingFetch(redis, sentMessages);
  const raffles = loadHandler("raffles");
  const s = sessions();
  const raffle = {
    id: "contract_raffle_ready_own_only",
    title: "Ready own only raffle",
    totalWinners: 2,
    groups: [{ prize: "Ticket", count: 2 }],
    endDate: new Date(Date.now() - 3600_000).toISOString(),
    participants: [],
    winners: [{
      userId: "tg_1001",
      accountId: "ID100001",
      name: "Player One",
      p21Id: "P21-1001",
      groupIndex: 0,
      prize: "Ticket",
    }, {
      userId: "tg_1002",
      accountId: "ID100002",
      name: "Player Two",
      p21Id: "P21-1002",
      groupIndex: 0,
      prize: "Ticket",
    }],
    status: "drawn",
    createdAt: new Date(Date.now() - 7200_000).toISOString(),
    drawnAt: new Date(Date.now() - 1800_000).toISOString(),
  };
  redis.kv.set("poker_app:raffle:contract_raffle_ready_own_only", JSON.stringify(raffle));
  redis.l("poker_app:raffle_ids").push("contract_raffle_ready_own_only");
  redis.h("poker_app:visitor_dt_ids").set("tg_1001", "ID100001");
  redis.h("poker_app:id_to_user").set("ID100001", "tg_1001");
  redis.h("poker_app:visitor_dt_ids").set("tg_1002", "ID100002");
  redis.h("poker_app:id_to_user").set("ID100002", "tg_1002");

  let r = await call(raffles, req("POST", {}, {
    pwaSession: s.user,
    action: "setWinnerReady",
    raffleId: "contract_raffle_ready_own_only",
    winnerUserId: "tg_1002",
  }));
  assert.strictEqual(r.statusCode, 403, "winner cannot mark another winner ready");
  let stored = JSON.parse(redis.kv.get("poker_app:raffle:contract_raffle_ready_own_only"));
  assert.strictEqual(stored.winners[0].winnerReady, undefined, "wrong-target ready does not mark requester ready");
  assert.strictEqual(stored.winners[1].winnerReady, undefined, "wrong-target ready does not mark target ready");

  r = await call(raffles, req("POST", {}, {
    pwaSession: s.user,
    action: "setWinnerReady",
    raffleId: "contract_raffle_ready_own_only",
    winnerUserId: "tg_1001",
  }));
  assert.strictEqual(r.statusCode, 200, "winner can still mark own row ready");
  stored = JSON.parse(redis.kv.get("poker_app:raffle:contract_raffle_ready_own_only"));
  assert.strictEqual(stored.winners[0].winnerReady, true, "own ready marks requester");
  assert.strictEqual(stored.winners[1].winnerReady, undefined, "own ready does not mark another winner");
  for (let i = 0; i < 8 && sentMessages.length === 0; i += 1) {
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
}

async function testRaffleWinnerReadyAdminNotifications(redis) {
  const sentMessages = [];
  installRecordingFetch(redis, sentMessages);
  const webpush = require("web-push");
  const keys = webpush.generateVAPIDKeys();
  process.env.WEBPUSH_VAPID_PUBLIC_KEY = keys.publicKey;
  process.env.WEBPUSH_VAPID_PRIVATE_KEY = keys.privateKey;
  process.env.WEBPUSH_CONTACT_EMAIL = "mailto:contract@example.test";
  const raffleNotifications = require(path.join(root, "lib", "raffle-notifications"));
  const workingAdmin = raffleNotifications.resolveWorkingRaffleAdmin(new Date());
  const adminIds = [...new Set([workingAdmin && workingAdmin.userId].filter(Boolean))];
  const sentPushes = [];
  let webpushRuntime = null;
  let originalSendNotification = null;
  try {
    adminIds.forEach((adminId) => {
      redis.s("poker_app:chat_push_registry").add(adminId);
      redis.h("poker_app:chat_push_sub:" + adminId).set("ready-admin-endpoint", JSON.stringify({
        endpoint: "https://push.example.test/ready-admin-" + adminId.replace(/^tg_/, ""),
        expirationTime: null,
        keys: {
          p256dh: keys.publicKey,
          auth: Buffer.alloc(16, 7).toString("base64url"),
        },
      }));
    });

    const raffles = loadHandler("raffles");
    webpushRuntime = require("web-push");
    originalSendNotification = webpushRuntime.sendNotification;
    webpushRuntime.sendNotification = async function sendNotificationMock(subscription, payload, opts) {
      sentPushes.push({
        subscription,
        payload: JSON.parse(payload),
        opts,
      });
      return { statusCode: 201 };
    };
    const s = sessions();
    const raffle = {
      id: "contract_raffle_ready_admin_notify",
      title: "Ready admin notification raffle",
      completedNumber: 44,
      totalWinners: 1,
      groups: [{ prize: "Беккинг-билет 1 000 ₽", count: 1 }],
      endDate: new Date(Date.now() - 3600_000).toISOString(),
      participants: [],
      winners: [{
        userId: "tg_1001",
        accountId: "ID100001",
        name: "Ready Player",
        telegramUsername: "ready_player",
        p21Id: "799755",
        groupIndex: 0,
        prize: "Беккинг-билет 1 000 ₽",
      }],
      status: "drawn",
      createdAt: new Date(Date.now() - 7200_000).toISOString(),
      drawnAt: new Date(Date.now() - 1800_000).toISOString(),
    };
    redis.kv.set("poker_app:raffle:contract_raffle_ready_admin_notify", JSON.stringify(raffle));
    redis.l("poker_app:raffle_ids").push("contract_raffle_ready_admin_notify");
    redis.h("poker_app:visitor_dt_ids").set("tg_1001", "ID100001");
    redis.h("poker_app:id_to_user").set("ID100001", "tg_1001");

    let r = await call(raffles, req("POST", {}, {
      pwaSession: s.user,
      action: "setWinnerReady",
      raffleId: "contract_raffle_ready_admin_notify",
      winnerUserId: "tg_1001",
    }));
    assert.strictEqual(r.statusCode, 200, "winner ready succeeds before admin notifications finish");

    const expectedReadyHeadline = "ID799755 готов забрать 1000р беккинг-билет";
    for (let i = 0; i < 16; i += 1) {
      const allMessages = adminIds.every((adminId) =>
        sentMessages.some((msg) => {
          const text = String(msg.body.text || "");
          return (
            String(msg.body.chat_id) === adminId.replace(/^tg_/, "") &&
            text.includes(expectedReadyHeadline) &&
            text.includes("Ready admin notification raffle")
          );
        })
      );
      const allPushes = adminIds.every((adminId) =>
        sentPushes.some((push) => String(push.subscription.endpoint || "").includes(adminId.replace(/^tg_/, "")))
      );
      if (allMessages && allPushes) break;
      await new Promise((resolve) => setTimeout(resolve, 0));
    }

    adminIds.forEach((adminId) => {
      const chatId = adminId.replace(/^tg_/, "");
      const message = sentMessages.find((msg) => {
        const text = String(msg.body.text || "");
        return (
          String(msg.body.chat_id) === chatId &&
          text.includes(expectedReadyHeadline) &&
          text.includes("Ready admin notification raffle")
        );
      });
      assert.ok(message, "ready admin receives bot popup message " + adminId);
      const text = String(message.body.text || "");
      assert.ok(text.includes(expectedReadyHeadline), "admin message headline includes ready prize");
      assert.ok(text.includes("799755"), "admin message includes Poker21 id");
      assert.ok(text.includes("Ready Player"), "admin message includes winner name");
      const push = sentPushes.find((item) => String(item.subscription.endpoint || "").includes(chatId));
      assert.ok(push, "ready admin receives web push " + adminId);
      assert.strictEqual(push.payload.kind, "raffle_winner_ready", "ready admin push kind is stable");
      assert.strictEqual(push.payload.title, expectedReadyHeadline, "ready admin push title includes id and prize");
      assert.ok(String(push.payload.body || "").includes("799755"), "ready admin push includes Poker21 id");
    });

    const messageCount = sentMessages.length;
    const pushCount = sentPushes.length;
    r = await call(raffles, req("POST", {}, {
      pwaSession: s.user,
      action: "setWinnerReady",
      raffleId: "contract_raffle_ready_admin_notify",
      winnerUserId: "tg_1001",
    }));
    assert.strictEqual(r.statusCode, 200, "repeated ready request still succeeds");
    for (let i = 0; i < 6; i += 1) await new Promise((resolve) => setTimeout(resolve, 0));
    assert.strictEqual(sentMessages.length, messageCount, "repeated ready does not duplicate bot messages");
    assert.strictEqual(sentPushes.length, pushCount, "repeated ready does not duplicate web pushes");
  } finally {
    if (webpushRuntime && originalSendNotification) webpushRuntime.sendNotification = originalSendNotification;
  }
}

async function testRaffleWinnerStatusPrizeNotification(redis) {
  const sentMessages = [];
  installRecordingFetch(redis, sentMessages);
  const raffles = loadHandler("raffles");
  const s = sessions();
  const raffle = {
    id: "contract_raffle_prize_notify",
    title: "Prize notification raffle",
    totalWinners: 1,
    groups: [{ prize: "Беккинг-билет 1 000 ₽", count: 1 }],
    endDate: new Date(Date.now() - 3600_000).toISOString(),
    participants: [],
    winners: [{
      userId: "tg_1001",
      accountId: "ID100001",
      name: "Player",
      p21Id: "799755",
      groupIndex: 0,
      prize: "Беккинг-билет 1 000 ₽",
      winnerReady: true,
      winnerReadyState: "ready",
    }],
    status: "drawn",
    createdAt: new Date(Date.now() - 7200_000).toISOString(),
    drawnAt: new Date(Date.now() - 1800_000).toISOString(),
  };
  redis.kv.set("poker_app:raffle:contract_raffle_prize_notify", JSON.stringify(raffle));
  redis.l("poker_app:raffle_ids").push("contract_raffle_prize_notify");

  let r = await call(raffles, req("POST", {}, {
    pwaSession: s.admin,
    action: "setWinnerStatus",
    raffleId: "contract_raffle_prize_notify",
    winnerUserId: "tg_1001",
    status: "ok",
  }));
  assert.strictEqual(r.statusCode, 200, "admin can mark winner prize issued");
  for (let i = 0; i < 8 && !sentMessages.find((msg) => String(msg.body.chat_id) === "1001"); i += 1) {
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  const winnerMessage = sentMessages.find((msg) => String(msg.body.chat_id) === "1001");
  assert.ok(winnerMessage, "winner receives prize issued bot message");
  const text = String(winnerMessage.body.text || "");
  assert.ok(text.includes("Приз начислен"), "message says prize is credited");
  assert.ok(text.includes("799755"), "message includes Poker21 id");
  assert.ok(text.includes("Вас ждут в игре"), "message invites winner to the game");

  r = await call(raffles, req("POST", {}, {
    pwaSession: s.admin,
    action: "setWinnerStatus",
    raffleId: "contract_raffle_prize_notify",
    winnerUserId: "tg_1001",
    status: "ok",
  }));
  assert.strictEqual(r.statusCode, 200, "repeated ok status request succeeds");
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.strictEqual(
    sentMessages.filter((msg) => String(msg.body.chat_id) === "1001").length,
    1,
    "repeated ok status does not duplicate prize notification"
  );

  redis.h("poker_app:visitor_usernames").set("tg_1003", "real_prize_winner");
  redis.h("poker_app:visitor_usernames").set("tg_1004", "wrong_prize_owner");
  redis.h("poker_app:id_to_user").set("ID100004", "tg_1004");
  const usernameRaffle = {
    id: "contract_raffle_prize_notify_username",
    title: "Prize notification username raffle",
    totalWinners: 1,
    groups: [{ prize: "Беккинг-билет 1 000 ₽", count: 1 }],
    endDate: new Date(Date.now() - 3600_000).toISOString(),
    participants: [],
    winners: [{
      userId: "manual_raffle_prize_winner",
      accountId: "ID100004",
      telegramUsername: "real_prize_winner",
      name: "Manual Prize Winner",
      p21Id: "799756",
      groupIndex: 0,
      prize: "Беккинг-билет 1 000 ₽",
      winnerReady: true,
      winnerReadyState: "ready",
      winnerReadySlotId: "initial_0",
    }],
    status: "drawn",
    createdAt: new Date(Date.now() - 7200_000).toISOString(),
    drawnAt: new Date(Date.now() - 1800_000).toISOString(),
  };
  redis.kv.set("poker_app:raffle:contract_raffle_prize_notify_username", JSON.stringify(usernameRaffle));
  redis.l("poker_app:raffle_ids").push("contract_raffle_prize_notify_username");
  r = await call(raffles, req("POST", {}, {
    pwaSession: s.admin,
    action: "setWinnerStatus",
    raffleId: "contract_raffle_prize_notify_username",
    winnerUserId: "manual_raffle_prize_winner",
    status: "ok",
  }));
  assert.strictEqual(r.statusCode, 200, "admin can mark username winner prize issued");
  for (let i = 0; i < 8 && !sentMessages.find((msg) => String(msg.body.chat_id) === "1003"); i += 1) {
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  assert.strictEqual(sentMessages.filter((msg) => String(msg.body.chat_id) === "1003").length, 1, "prize notification resolves explicit Telegram username");
  assert.strictEqual(sentMessages.filter((msg) => String(msg.body.chat_id) === "1004").length, 0, "prize notification skips mismatched account owner");

  const rerollRaffle = {
    id: "contract_raffle_prize_notify_reroll_only",
    title: "Cash reroll prize notification raffle",
    prizeKind: "cash",
    totalWinners: 1,
    groups: [{ prize: "Беккинг-байин 1 000 ₽ на кеш", count: 1 }],
    endDate: new Date(Date.now() - 3600_000).toISOString(),
    participants: [],
    winners: [
      {
        userId: "tg_1005",
        accountId: "ID100005",
        name: "Missed Winner",
        p21Id: "799757",
        groupIndex: 0,
        prize: "Беккинг-байин 1 000 ₽ на кеш",
        winnerReadyExpired: true,
        winnerReadyState: "missed",
        winnerReadySlotId: "initial_0",
      },
      {
        userId: "tg_1006",
        accountId: "ID100006",
        name: "Reroll Winner",
        p21Id: "799758",
        groupIndex: 0,
        prize: "Беккинг-байин 1 000 ₽ на кеш",
        winnerReroll: true,
        winnerReady: true,
        winnerReadyState: "ready",
        winnerReadySlotId: "reroll_1_1",
      },
    ],
    status: "drawn",
    createdAt: new Date(Date.now() - 7200_000).toISOString(),
    drawnAt: new Date(Date.now() - 1800_000).toISOString(),
  };
  redis.kv.set("poker_app:raffle:contract_raffle_prize_notify_reroll_only", JSON.stringify(rerollRaffle));
  redis.l("poker_app:raffle_ids").push("contract_raffle_prize_notify_reroll_only");
  r = await call(raffles, req("POST", {}, {
    pwaSession: s.admin,
    action: "setWinnerStatus",
    raffleId: "contract_raffle_prize_notify_reroll_only",
    winnerSlotId: "initial_0",
    status: "ok",
  }));
  assert.strictEqual(r.statusCode, 200, "admin can mark missed original winner without prize notification");
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.strictEqual(sentMessages.filter((msg) => String(msg.body.chat_id) === "1005").length, 0, "missed original winner does not receive cash prize issued notification");

  r = await call(raffles, req("POST", {}, {
    pwaSession: s.admin,
    action: "setWinnerStatus",
    raffleId: "contract_raffle_prize_notify_reroll_only",
    winnerSlotId: "reroll_1_1",
    status: "ok",
  }));
  assert.strictEqual(r.statusCode, 200, "admin can mark reroll winner prize issued");
  for (let i = 0; i < 8 && !sentMessages.find((msg) => String(msg.body.chat_id) === "1006"); i += 1) {
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  assert.strictEqual(sentMessages.filter((msg) => String(msg.body.chat_id) === "1006").length, 1, "reroll winner receives cash prize issued notification");
}

async function testRaffleWinnerReadyRerollAndBurn(redis) {
  const sentMessages = [];
  installRecordingFetch(redis, sentMessages);
  const raffles = loadHandler("raffles");
  const s = sessions();
  const now = Date.now();
  const pastDeadline = new Date(now - 60_000).toISOString();
  const startedAt = new Date(now - 11 * 60_000).toISOString();
  const prize = "Беккинг-билет 500 ₽";
  const participants = [
    { userId: "tg_1001", accountId: "ID100001", name: "Ready Player", p21Id: "P21-1001" },
    { userId: "tg_1002", accountId: "ID100002", name: "Late Player", p21Id: "P21-1002" },
    { userId: "tg_1003", accountId: "ID100003", name: "Backup One", p21Id: "P21-1003" },
    { userId: "tg_1004", accountId: "ID100004", name: "Backup Two", p21Id: "P21-1004" },
  ];
  const raffle = {
    id: "contract_raffle_ready_reroll",
    title: "Ready reroll raffle",
    totalWinners: 2,
    groups: [{ prize, count: 2 }],
    endDate: new Date(now - 3600_000).toISOString(),
    participants,
    winners: [{
      ...participants[0],
      groupIndex: 0,
      prize,
      winnerReady: true,
      winnerReadyAt: new Date(now - 5 * 60_000).toISOString(),
      winnerReadyRound: 0,
      winnerReadyWindowStartedAt: startedAt,
      winnerReadyDeadlineAt: pastDeadline,
      winnerReadyState: "ready",
    }, {
      ...participants[1],
      groupIndex: 0,
      prize,
      winnerReadyRound: 0,
      winnerReadyWindowStartedAt: startedAt,
      winnerReadyDeadlineAt: pastDeadline,
      winnerReadyState: "pending",
    }],
    status: "drawn",
    createdAt: new Date(now - 7200_000).toISOString(),
    drawnAt: new Date(now - 1800_000).toISOString(),
    winnerReadyWindowMs: 15 * 60 * 1000,
  };
  redis.kv.set("poker_app:raffle:contract_raffle_ready_reroll", JSON.stringify(raffle));
  redis.l("poker_app:raffle_ids").push("contract_raffle_ready_reroll");
  redis.h("poker_app:visitor_dt_ids").set("tg_1001", "ID100001");
  redis.h("poker_app:id_to_user").set("ID100001", "tg_1001");
  redis.h("poker_app:visitor_dt_ids").set("tg_1002", "ID100002");
  redis.h("poker_app:id_to_user").set("ID100002", "tg_1002");

  let r = await call(raffles, req("GET", { pwaSession: s.admin, id: "contract_raffle_ready_reroll" }));
  assert.strictEqual(r.statusCode, 200, "admin can load and settle expired ready window");
  const readyOriginal = r.body.raffle.winners.find((w) => w.userId === "tg_1001");
  const missed = r.body.raffle.winners.find((w) => w.userId === "tg_1002");
  const replacement = r.body.raffle.winners.find((w) => w.winnerReroll === true);
  assert.ok(readyOriginal, "ready original winner is still shown");
  assert.strictEqual(readyOriginal.winnerReadyState, "ready", "expired ready winner stays ready");
  assert.notStrictEqual(readyOriginal.winnerStatus, "ok", "expired ready winner is not auto-issued");
  assert.ok(missed, "late original winner is still shown");
  assert.strictEqual(missed.winnerReadyState, "missed", "late original winner is marked missed");
  assert.strictEqual(missed.winnerReadyExpired, true, "late original winner cannot confirm later");
  assert.ok(replacement, "replacement winner is appended after reroll");
  assert.strictEqual(replacement.winnerReadyRound, 1, "replacement receives reroll round");
  assert.ok(["tg_1003", "tg_1004"].includes(replacement.userId), "replacement comes from non-winning participants");
  assert.ok(new Date(replacement.winnerReadyDeadlineAt).getTime() > Date.now(), "replacement receives a fresh ready deadline");
  assert.ok(!r.body.raffle.readyBurned || !r.body.raffle.readyBurned.count, "first missed original is rerolled, not burned");
  assert.ok(
    sentMessages.find((msg) => String(msg.body.chat_id) === String(replacement.userId).replace(/^tg_/, "")),
    "replacement winner receives reroll notification"
  );
  const rerollWinnerMessages = sentMessages.filter((msg) => String(msg.body.text || "").includes("Вы выиграли розыгрыш"));
  assert.strictEqual(rerollWinnerMessages.length, 1, "reroll sends exactly one winner notification");
  assert.strictEqual(
    String(rerollWinnerMessages[0].body.chat_id),
    String(replacement.userId).replace(/^tg_/, ""),
    "reroll winner notification is addressed to replacement only"
  );
  assert.ok(
    !sentMessages.find((msg) => String(msg.body.chat_id) === "1002"),
    "missed original winner is not notified after reroll"
  );

  r = await call(raffles, req("POST", {}, {
    pwaSession: s.peer,
    action: "setWinnerReady",
    raffleId: "contract_raffle_ready_reroll",
    winnerUserId: "tg_1002",
  }));
  assert.strictEqual(r.statusCode, 400, "missed original winner cannot mark ready after reroll");

  const stored = JSON.parse(redis.kv.get("poker_app:raffle:contract_raffle_ready_reroll"));
  const storedReplacement = stored.winners.find((w) => w.winnerReroll === true);
  assert.ok(storedReplacement, "stored raffle keeps replacement winner");
  storedReplacement.winnerReady = true;
  storedReplacement.winnerReadyAt = new Date(Date.now() - 5 * 60_000).toISOString();
  storedReplacement.winnerReadyBy = storedReplacement.userId;
  storedReplacement.winnerReadyState = "ready";
  storedReplacement.winnerReadyWindowStartedAt = new Date(Date.now() - 11 * 60_000).toISOString();
  storedReplacement.winnerReadyDeadlineAt = new Date(Date.now() - 60_000).toISOString();
  redis.kv.set("poker_app:raffle:contract_raffle_ready_reroll", JSON.stringify(stored));

  r = await call(raffles, req("GET", { pwaSession: s.admin, id: "contract_raffle_ready_reroll" }));
  assert.strictEqual(r.statusCode, 200, "admin can load expired ready reroll window");
  const readyReplacement = r.body.raffle.winners.find((w) => w.winnerReroll === true);
  assert.strictEqual(readyReplacement.winnerReady, true, "ready reroll winner keeps ready flag after deadline");
  assert.strictEqual(readyReplacement.winnerReadyState, "ready", "expired ready reroll winner stays ready");
  assert.notStrictEqual(readyReplacement.winnerStatus, "ok", "expired ready reroll winner is not auto-issued");
  assert.notStrictEqual(readyReplacement.winnerBurned, true, "expired ready reroll winner is not burned");

  const storedForBurn = JSON.parse(redis.kv.get("poker_app:raffle:contract_raffle_ready_reroll"));
  const storedReplacementForBurn = storedForBurn.winners.find((w) => w.winnerReroll === true);
  assert.ok(storedReplacementForBurn, "stored raffle keeps replacement winner for burn check");
  delete storedReplacementForBurn.winnerReady;
  delete storedReplacementForBurn.winnerReadyAt;
  delete storedReplacementForBurn.winnerReadyBy;
  delete storedReplacementForBurn.winnerReadyAccountId;
  storedReplacementForBurn.winnerReadyState = "pending";
  storedReplacementForBurn.winnerReadyWindowStartedAt = new Date(Date.now() - 11 * 60_000).toISOString();
  storedReplacementForBurn.winnerReadyDeadlineAt = new Date(Date.now() - 60_000).toISOString();
  redis.kv.set("poker_app:raffle:contract_raffle_ready_reroll", JSON.stringify(storedForBurn));

  r = await call(raffles, req("GET", { pwaSession: s.admin, id: "contract_raffle_ready_reroll" }));
  assert.strictEqual(r.statusCode, 200, "admin can load and settle expired reroll window");
  const burnedReplacement = r.body.raffle.winners.find((w) => w.winnerReroll === true);
  assert.strictEqual(burnedReplacement.winnerReadyState, "burned", "expired reroll winner is burned");
  assert.strictEqual(burnedReplacement.winnerBurned, true, "burned reroll winner is locked");
  assert.strictEqual(r.body.raffle.readyBurned.count, 1, "one prize is counted as burned");
  assert.strictEqual(r.body.raffle.readyBurned.totalPrizeAmount, 500, "burned prize amount is summed");
}

async function testRaffleCashWinnerReadyThirdRerollBeforeBurn(redis) {
  installRecordingFetch(redis, []);
  const raffles = loadHandler("raffles");
  const s = sessions();
  const now = Date.now();
  const pastDeadline = new Date(now - 60_000).toISOString();
  const startedAt = new Date(now - 16 * 60_000).toISOString();
  const prize = "Беккинг-байин 500 ₽ на кеш";
  const participants = [
    { userId: "tg_1001", accountId: "ID100001", name: "Late Cash Player", p21Id: "P21-1001" },
    { userId: "tg_1002", accountId: "ID100002", name: "Cash Backup One", p21Id: "P21-1002" },
    { userId: "tg_1003", accountId: "ID100003", name: "Cash Backup Two", p21Id: "P21-1003" },
    { userId: "tg_1004", accountId: "ID100004", name: "Cash Backup Three", p21Id: "P21-1004" },
  ];
  const raffle = {
    id: "contract_raffle_cash_ready_third_reroll",
    title: "Розыгрыш беккинг-байинов на кеш",
    totalWinners: 1,
    groups: [{ prize, count: 1 }],
    prizeKind: "cash",
    endDate: new Date(now - 3600_000).toISOString(),
    participants,
    winners: [{
      ...participants[0],
      groupIndex: 0,
      prize,
      winnerReadyRound: 0,
      winnerReadyWindowStartedAt: startedAt,
      winnerReadyDeadlineAt: pastDeadline,
      winnerReadyState: "pending",
    }],
    status: "drawn",
    createdAt: new Date(now - 7200_000).toISOString(),
    drawnAt: new Date(now - 1800_000).toISOString(),
    winnerReadyWindowMs: 15 * 60 * 1000,
  };
  redis.kv.set("poker_app:raffle:contract_raffle_cash_ready_third_reroll", JSON.stringify(raffle));
  redis.l("poker_app:raffle_ids").push("contract_raffle_cash_ready_third_reroll");

  let r = await call(raffles, req("GET", { pwaSession: s.admin, id: "contract_raffle_cash_ready_third_reroll" }));
  assert.strictEqual(r.statusCode, 200, "cash raffle first missed winner settles");
  assert.ok(
    (r.body.raffle.winners || []).some((w) => w && w.winnerReroll === true && w.winnerReadyRound === 1),
    "cash raffle appends first reroll winner",
  );

  for (let expectedRound = 2; expectedRound <= 3; expectedRound += 1) {
    const stored = JSON.parse(redis.kv.get("poker_app:raffle:contract_raffle_cash_ready_third_reroll"));
    const previous = (stored.winners || []).find((w) => w && w.winnerReroll === true && w.winnerReadyRound === expectedRound - 1);
    assert.ok(previous, "stored cash raffle keeps previous reroll winner");
    previous.winnerReadyState = "pending";
    previous.winnerReadyWindowStartedAt = startedAt;
    previous.winnerReadyDeadlineAt = pastDeadline;
    redis.kv.set("poker_app:raffle:contract_raffle_cash_ready_third_reroll", JSON.stringify(stored));

    r = await call(raffles, req("GET", { pwaSession: s.admin, id: "contract_raffle_cash_ready_third_reroll" }));
    assert.strictEqual(r.statusCode, 200, "cash raffle reroll window settles");
    assert.ok(
      (r.body.raffle.winners || []).some((w) => w && w.winnerReroll === true && w.winnerReadyRound === expectedRound),
      "cash raffle appends reroll round " + expectedRound,
    );
    assert.ok(!r.body.raffle.readyBurned || !r.body.raffle.readyBurned.count, "cash raffle does not burn before third reroll misses");
  }

  const storedForBurn = JSON.parse(redis.kv.get("poker_app:raffle:contract_raffle_cash_ready_third_reroll"));
  const third = (storedForBurn.winners || []).find((w) => w && w.winnerReroll === true && w.winnerReadyRound === 3);
  assert.ok(third, "stored cash raffle keeps third reroll winner");
  third.winnerReadyState = "pending";
  third.winnerReadyWindowStartedAt = startedAt;
  third.winnerReadyDeadlineAt = pastDeadline;
  redis.kv.set("poker_app:raffle:contract_raffle_cash_ready_third_reroll", JSON.stringify(storedForBurn));

  r = await call(raffles, req("GET", { pwaSession: s.admin, id: "contract_raffle_cash_ready_third_reroll" }));
  assert.strictEqual(r.statusCode, 200, "cash raffle third reroll timeout settles");
  const burnedThird = (r.body.raffle.winners || []).find((w) => w && w.winnerReroll === true && w.winnerReadyRound === 3);
  assert.strictEqual(burnedThird.winnerReadyState, "burned", "cash raffle burns only after third reroll misses");
  assert.strictEqual(burnedThird.winnerBurned, true, "cash raffle third reroll winner is locked after burn");
  assert.strictEqual(r.body.raffle.readyBurned.count, 1, "cash raffle counts one burned prize after third reroll");
  assert.strictEqual(
    (r.body.raffle.winners || []).filter((w) => w && w.winnerReroll === true).length,
    3,
    "cash raffle stops at three reroll winners",
  );
}

async function testRaffleReadyRerollSettlementLock(redis) {
  const sentMessages = [];
  installRecordingFetch(redis, sentMessages);
  const raffles = loadHandler("raffles");
  const s = sessions();
  const now = Date.now();
  const pastDeadline = new Date(now - 60_000).toISOString();
  const startedAt = new Date(now - 16 * 60_000).toISOString();
  const prize = "Беккинг-билет 500 ₽";
  const participants = [
    { userId: "tg_1001", accountId: "ID100001", name: "Late Player", p21Id: "P21-1001" },
    { userId: "tg_1002", accountId: "ID100002", name: "Backup One", p21Id: "P21-1002" },
  ];
  const raffle = {
    id: "contract_raffle_ready_reroll_lock",
    title: "Ready reroll lock raffle",
    totalWinners: 1,
    groups: [{ prize, count: 1 }],
    endDate: new Date(now - 3600_000).toISOString(),
    participants,
    winners: [{
      ...participants[0],
      groupIndex: 0,
      prize,
      winnerReadyRound: 0,
      winnerReadyWindowStartedAt: startedAt,
      winnerReadyDeadlineAt: pastDeadline,
      winnerReadyState: "pending",
    }],
    status: "drawn",
    createdAt: new Date(now - 7200_000).toISOString(),
    drawnAt: new Date(now - 1800_000).toISOString(),
    winnerReadyWindowMs: 15 * 60 * 1000,
  };
  redis.kv.set("poker_app:raffle:contract_raffle_ready_reroll_lock", JSON.stringify(raffle));
  redis.l("poker_app:raffle_ids").push("contract_raffle_ready_reroll_lock");
  const lockKey = "poker_app:raffle_ready_settle_lock:" +
    crypto.createHash("sha1").update("contract_raffle_ready_reroll_lock").digest("hex").slice(0, 32);
  redis.kv.set(lockKey, "external-lock");

  let r = await call(raffles, req("GET", { pwaSession: s.admin, id: "contract_raffle_ready_reroll_lock" }));
  assert.strictEqual(r.statusCode, 200, "locked reroll detail GET still succeeds");
  assert.strictEqual((r.body.raffle.winners || []).filter((w) => w && w.winnerReroll === true).length, 0, "locked reroll does not append replacement");
  assert.strictEqual(sentMessages.filter((msg) => String(msg.body.text || "").includes("Вы выиграли розыгрыш")).length, 0, "locked reroll does not notify a replacement");
  let stored = JSON.parse(redis.kv.get("poker_app:raffle:contract_raffle_ready_reroll_lock"));
  assert.strictEqual((stored.winners || []).filter((w) => w && w.winnerReroll === true).length, 0, "locked reroll does not write replacement");

  redis.kv.delete(lockKey);
  r = await call(raffles, req("GET", { pwaSession: s.admin, id: "contract_raffle_ready_reroll_lock" }));
  assert.strictEqual(r.statusCode, 200, "unlocked reroll detail GET succeeds");
  const replacement = (r.body.raffle.winners || []).find((w) => w && w.winnerReroll === true);
  assert.ok(replacement, "unlocked reroll appends replacement");
  assert.strictEqual(
    sentMessages.filter((msg) => String(msg.body.text || "").includes("Вы выиграли розыгрыш")).length,
    1,
    "unlocked reroll notifies replacement once",
  );
}

async function testRaffleTelegramUsernamesAdminOnly(redis) {
  const raffles = loadHandler("raffles");
  const s = sessions();
  const raffle = {
    id: "contract_raffle_tg_privacy",
    title: "Telegram privacy raffle",
    totalWinners: 1,
    groups: [{ prize: "Ticket", count: 1 }],
    endDate: new Date(Date.now() - 3600_000).toISOString(),
    participants: [{
      userId: "tg_1001",
      accountId: "ID100001",
      name: "@player_public",
      p21Id: "P21-1001",
      telegramUsername: "player_public",
    }, {
      userId: "legacy_p21_208238",
      name: "Участник",
      p21Id: "208238",
    }],
    winners: [{
      userId: "tg_1001",
      accountId: "ID100001",
      name: "@player_public",
      p21Id: "P21-1001",
      groupIndex: 0,
      prize: "Ticket",
      telegramUsername: "player_public",
    }],
    status: "drawn",
    createdAt: new Date(Date.now() - 7200_000).toISOString(),
    drawnAt: new Date(Date.now() - 1800_000).toISOString(),
  };
  redis.kv.set("poker_app:raffle:contract_raffle_tg_privacy", JSON.stringify(raffle));
  redis.l("poker_app:raffle_ids").push("contract_raffle_tg_privacy");
  redis.h("poker_app:visitor_usernames").set("tg_1001", "player_public");
  redis.h("poker_app:pokerplus_user_ids").set("ID400800", "208238");
  redis.h("poker_app:pokerplus_profiles").set("ID100001", JSON.stringify({ nickname: "Poker21Nick", totalCounter: { fee: 12000 } }));
  redis.h("poker_app:pokerplus_profiles").set("ID400800", JSON.stringify({ nickname: "Роман", totalCounter: { fee: 32000 } }));

  let r = await call(raffles, req("GET", { pwaSession: s.user, id: "contract_raffle_tg_privacy" }));
  assert.strictEqual(r.statusCode, 200, "non-admin can load raffle");
  assert.strictEqual(r.body.isAdmin, false, "non-admin response is not admin");
  assert.strictEqual(r.body.raffle.participants[0].telegramUsername, undefined, "non-admin does not receive participant telegram username");
  assert.strictEqual(r.body.raffle.winners[0].telegramUsername, undefined, "non-admin does not receive winner telegram username");
  assert.strictEqual(r.body.raffle.participants[0].name, "Участник", "non-admin does not receive participant telegram login as name");
  assert.strictEqual(r.body.raffle.winners[0].name, "Участник", "non-admin does not receive winner telegram login as name");
  assert.strictEqual(r.body.raffle.participants[1].name, "Роман", "non-admin receives Poker21 participant name by p21 id");
  assert.strictEqual(r.body.raffle.participants[1].pokerPlusNickname, "Роман", "non-admin receives Poker21 participant nickname by p21 id");
  assert.strictEqual(r.body.raffle.participants[1].pokerPlusStatusLevel, 10, "non-admin receives Poker21 participant fish level");
  assert.strictEqual(r.body.raffle.winners[0].pokerPlusNickname, "Poker21Nick", "non-admin receives winner Poker21 nickname");
  assert.strictEqual(r.body.raffle.winners[0].pokerPlusStatusLevel, 5, "non-admin receives winner fish level");

  r = await call(raffles, req("GET", { pwaSession: s.admin, id: "contract_raffle_tg_privacy" }));
  assert.strictEqual(r.statusCode, 200, "admin can load raffle");
  assert.strictEqual(r.body.isAdmin, true, "admin response is admin");
  assert.strictEqual(r.body.raffle.participants[0].telegramUsername, "player_public", "admin receives participant telegram username");
  assert.strictEqual(r.body.raffle.winners[0].telegramUsername, "player_public", "admin receives winner telegram username");
  assert.strictEqual(r.body.raffle.participants[0].name, "@player_public", "admin receives participant telegram login name");
  assert.strictEqual(r.body.raffle.winners[0].name, "@player_public", "admin receives winner telegram login name");
  assert.strictEqual(r.body.raffle.participants[1].name, "Роман", "admin receives Poker21 participant name by p21 id");
  assert.strictEqual(r.body.raffle.participants[1].pokerPlusNickname, "Роман", "admin receives Poker21 participant nickname by p21 id");
  assert.strictEqual(r.body.raffle.participants[1].pokerPlusStatusLevel, 10, "admin receives Poker21 participant fish level");
  assert.strictEqual(r.body.raffle.winners[0].pokerPlusNickname, "Poker21Nick", "admin receives winner Poker21 nickname");
  assert.strictEqual(r.body.raffle.winners[0].pokerPlusStatusLevel, 5, "admin receives winner fish level");

  r = await call(raffles, req("GET", { pwaSession: s.user }));
  const listed = (r.body.raffles || []).find((item) => item.id === "contract_raffle_tg_privacy");
  assert.ok(listed, "non-admin list includes raffle");
  assert.strictEqual(listed.winners[0].telegramUsername, undefined, "non-admin list hides winner telegram username");
  assert.strictEqual(listed.winners[0].name, "Участник", "non-admin list hides winner telegram login name");
  assert.strictEqual(listed.winners[0].pokerPlusNickname, "Poker21Nick", "non-admin list exposes winner Poker21 nickname");

  const p21OnlyRaffle = {
    id: "contract_raffle_p21_only",
    title: "Poker21 only participant raffle",
    totalWinners: 1,
    groups: [{ prize: "Ticket", count: 1 }],
    endDate: new Date(Date.now() + 3600_000).toISOString(),
    participants: [{
      name: "208238",
      p21Id: "208238",
    }],
    winners: [],
    status: "active",
    createdAt: new Date(Date.now() - 7200_000).toISOString(),
  };
  redis.kv.set("poker_app:raffle:contract_raffle_p21_only", JSON.stringify(p21OnlyRaffle));
  r = await call(raffles, req("GET", { pwaSession: s.user, id: "contract_raffle_p21_only" }));
  assert.strictEqual(r.statusCode, 200, "non-admin can load p21-only participant raffle");
  assert.strictEqual(r.body.raffle.participants[0].name, "Роман", "non-admin receives Poker21 name without user id");
  assert.strictEqual(r.body.raffle.participants[0].pokerPlusNickname, "Роман", "non-admin receives Poker21 nickname without user id");
  assert.strictEqual(r.body.raffle.participants[0].pokerPlusStatusLevel, 10, "non-admin receives Poker21 fish level without user id");
}

async function testRaffleCashBroadcastAndWinnerInstruction(redis) {
  const sentMessages = [];
  installRecordingFetch(redis, sentMessages);
  const s = sessions();

  redis.s("poker_app:raffle_subscribers").add("1001");
  const manual = loadHandler("raffle-manual-subscribers");
  let r = await call(manual, req("POST", {}, {
    pwaSession: s.admin,
    prizeKind: "cash",
    endDate: new Date(Date.now() + 3600_000).toISOString(),
    broadcastIdempotencyKey: "contract-cash-broadcast",
  }));
  assert.strictEqual(r.statusCode, 200, "cash raffle subscriber broadcast succeeds");
  const subscriberMessage = sentMessages.find((msg) => String(msg.body.chat_id) === "1001");
  assert.ok(subscriberMessage, "subscriber receives cash raffle message");
  assert.ok(String(subscriberMessage.body.text).includes("беккинг-байинов на кеш"), "cash broadcast says backing buy-ins");
  assert.ok(!String(subscriberMessage.body.text).includes("беккинг-билетов"), "cash broadcast does not say backing tickets");

  sentMessages.length = 0;
  r = await call(manual, req("POST", {}, {
    pwaSession: s.admin,
    activeRafflesSummary: true,
    activeRafflesCount: 2,
    activeRafflesTotalPrize: 22000,
    broadcastIdempotencyKey: "contract-active-raffles-summary-broadcast",
  }));
  assert.strictEqual(r.statusCode, 200, "active raffles summary broadcast succeeds");
  const summaryMessage = sentMessages.find((msg) => String(msg.body.chat_id) === "1001");
  assert.ok(summaryMessage, "subscriber receives active raffles summary message");
  const summaryText = String(summaryMessage.body.text || "");
  assert.ok(summaryText.includes("Стартовали 2 розыгрыша"), "summary broadcast says two raffles started");
  assert.ok(summaryText.includes("22 000 ₽"), "summary broadcast includes total active raffle prize");
  assert.ok(!summaryText.includes("startapp=raffles"), "summary broadcast keeps raffle participation link out of text");
  assert.strictEqual(
    summaryMessage.body.reply_markup &&
      summaryMessage.body.reply_markup.inline_keyboard &&
      summaryMessage.body.reply_markup.inline_keyboard[0] &&
      summaryMessage.body.reply_markup.inline_keyboard[0][0] &&
      summaryMessage.body.reply_markup.inline_keyboard[0][0].url,
    "https://t.me/Poker_dvatuza_bot/DvaTuza?startapp=raffles",
    "summary broadcast includes raffle participation inline button"
  );
  assert.ok(!summaryText.includes("стартовал новый розыгрыш"), "summary broadcast does not append single-raffle default text");

  sentMessages.length = 0;
  const raffles = loadHandler("raffles");
  const webpush = require("web-push");
  const keys = webpush.generateVAPIDKeys();
  process.env.WEBPUSH_VAPID_PUBLIC_KEY = keys.publicKey;
  process.env.WEBPUSH_VAPID_PRIVATE_KEY = keys.privateKey;
  process.env.WEBPUSH_CONTACT_EMAIL = "mailto:contract@example.test";
  const sentPushes = [];
  const originalSendNotification = webpush.sendNotification;
  webpush.sendNotification = async function sendNotificationMock(subscription, payload, opts) {
    sentPushes.push({
      subscription,
      payload: JSON.parse(payload),
      opts,
    });
    return { statusCode: 201 };
  };
  try {
    redis.h("poker_app:visitor_dt_ids").set("tg_1001", "ID100001");
    redis.h("poker_app:id_to_user").set("ID100001", "tg_1001");
    redis.s("poker_app:chat_push_registry").add("ID100001");
    redis.h("poker_app:chat_push_sub:ID100001").set("contract-endpoint", JSON.stringify({
      endpoint: "https://push.example.test/raffle-winner-1001",
      expirationTime: null,
      keys: {
        p256dh: "BN-contract-p256dh",
        auth: "contract-auth",
      },
    }));

    const oldDrawnRaffle = {
      id: "contract_old_drawn_raffle",
      title: "Старый завершённый розыгрыш",
      totalWinners: 1,
      groups: [{ prize: "Ticket 100 ₽", count: 1 }],
      endDate: new Date(Date.now() - 7200_000).toISOString(),
      participants: [],
      winners: [],
      status: "drawn",
      drawnAt: new Date(Date.now() - 7100_000).toISOString(),
      createdAt: new Date(Date.now() - 8200_000).toISOString(),
    };
    redis.kv.set("poker_app:raffle:contract_old_drawn_raffle", JSON.stringify(oldDrawnRaffle));
    redis.l("poker_app:raffle_ids").push("contract_old_drawn_raffle");

    const raffle = {
      id: "contract_cash_raffle",
      title: "Розыгрыш беккинг-байинов на кеш",
      prizeKind: "cash",
      totalWinners: 1,
      groups: [{ prize: "Беккинг-байин 500 ₽ на кеш", count: 1 }],
      endDate: new Date(Date.now() - 60_000).toISOString(),
      participants: [{
        userId: "tg_1001",
        accountId: "ID100001",
        name: "Player",
        p21Id: "P21-1001",
      }],
      winners: [],
      status: "active",
      createdAt: new Date(Date.now() - 3600_000).toISOString(),
    };
    redis.kv.set("poker_app:raffle:contract_cash_raffle", JSON.stringify(raffle));
    redis.l("poker_app:raffle_ids").push("contract_cash_raffle");

    r = await call(raffles, req("POST", {}, {
      pwaSession: s.admin,
      action: "complete",
      raffleId: "contract_cash_raffle",
    }));
    assert.strictEqual(r.statusCode, 200, "cash raffle can be completed");
    assert.strictEqual(r.body.raffle.prizeKind, "cash", "cash raffle keeps prize kind after draw");
    assert.strictEqual(r.body.raffle.completedNumber, 2, "completed raffle receives short completed number after existing results");
    assert.ok(
      sentMessages.find((msg) => String(msg.body.chat_id) === "1001"),
      "complete waits until winner Telegram notification is attempted"
    );
    assert.ok(
      sentPushes.find((item) => item.payload && item.payload.kind === "raffle_winner"),
      "complete waits until winner push is attempted"
    );

    let winnerMessage = null;
    let winnerPush = null;
    for (let i = 0; i < 8 && (!winnerMessage || !winnerPush); i += 1) {
      await new Promise((resolve) => setTimeout(resolve, 0));
      winnerMessage = sentMessages.find((msg) => String(msg.body.chat_id) === "1001");
      winnerPush = sentPushes.find((item) => item.payload && item.payload.kind === "raffle_winner");
    }
    assert.ok(winnerMessage, "winner receives raffle ready instruction");
    const winnerText = String(winnerMessage.body.text || "");
    assert.ok(winnerText.includes("startapp=raffle_2"), "winner message includes short completed raffle deeplink");
    assert.ok(!winnerText.includes("startapp=raffle_contract_cash_raffle"), "winner message does not expose long raffle id");
    assert.ok(winnerText.includes("«Я готов»"), "winner message explains ready button");
    assert.ok(winnerText.includes("2. Рядом со своим ником нажмите кнопку «Я готов»."), "winner message keeps ready button as step two");
    assert.ok(!winnerText.includes("Ссылка откроет вкладку"), "winner message omits completed-tab hint step");
    assert.ok(winnerText.includes("отметку «Готов»"), "winner message explains admin-ready badge");
    assert.ok(winnerPush, "winner receives personal raffle web push");
    assert.strictEqual(winnerPush.subscription.endpoint, "https://push.example.test/raffle-winner-1001", "winner push uses winner subscription");
    assert.strictEqual(winnerPush.payload.title, "Вы выиграли розыгрыш", "winner push title omits club name");
    assert.ok(!String(winnerPush.payload.title || "").includes("Два туза"), "winner push title does not duplicate source name");
    assert.ok(
      String(winnerPush.payload.body || "").includes("Розыгрыш беккинг-байинов на кеш · Приз: Беккинг-байин 500 ₽ на кеш\nОткройте"),
      "winner push keeps title and prize on one line before instruction"
    );
    assert.strictEqual(winnerPush.payload.openUrl, "./?startapp=raffle_2", "winner push opens short completed raffle link");
    assert.strictEqual(winnerPush.payload.raffleId, "contract_cash_raffle", "winner push carries raffle id");
    assert.ok(String(winnerPush.payload.body || "").includes("Я готов"), "winner push asks to press ready");
  } finally {
    webpush.sendNotification = originalSendNotification;
  }
}

async function testRaffleCompleteNotifiesOnlyDrawnWinners(redis) {
  const sentMessages = [];
  installRecordingFetch(redis, sentMessages);
  const raffles = loadHandler("raffles");
  const webpush = require("web-push");
  const keys = webpush.generateVAPIDKeys();
  process.env.WEBPUSH_VAPID_PUBLIC_KEY = keys.publicKey;
  process.env.WEBPUSH_VAPID_PRIVATE_KEY = keys.privateKey;
  process.env.WEBPUSH_CONTACT_EMAIL = "mailto:contract@example.test";
  const sentPushes = [];
  const originalSendNotification = webpush.sendNotification;
  webpush.sendNotification = async function sendNotificationMock(subscription, payload, opts) {
    sentPushes.push({
      subscription,
      payload: JSON.parse(payload),
      opts,
    });
    return { statusCode: 201 };
  };
  try {
    const s = sessions();
    const participants = [1001, 1002, 1003, 1004].map((id) => ({
      userId: "tg_" + id,
      accountId: "ID" + String(100000 + id),
      name: "Player " + id,
      p21Id: "P21-" + id,
    }));
    participants.forEach((participant) => {
      redis.h("poker_app:visitor_dt_ids").set(participant.userId, participant.accountId);
      redis.h("poker_app:id_to_user").set(participant.accountId, participant.userId);
      redis.s("poker_app:chat_push_registry").add(participant.accountId);
      redis.h("poker_app:chat_push_sub:" + participant.accountId).set("contract-endpoint", JSON.stringify({
        endpoint: "https://push.example.test/raffle-complete-" + participant.accountId,
        expirationTime: null,
        keys: {
          p256dh: "BN-complete-" + participant.accountId,
          auth: "auth-" + participant.accountId,
        },
      }));
    });

    const raffle = {
      id: "contract_raffle_complete_only_winners",
      title: "Complete only winners raffle",
      totalWinners: 2,
      groups: [{ prize: "Ticket 500 ₽", count: 2 }],
      endDate: new Date(Date.now() - 60_000).toISOString(),
      participants,
      winners: [],
      status: "active",
      createdAt: new Date(Date.now() - 3600_000).toISOString(),
    };
    redis.kv.set("poker_app:raffle:contract_raffle_complete_only_winners", JSON.stringify(raffle));
    redis.l("poker_app:raffle_ids").push("contract_raffle_complete_only_winners");

    const r = await call(raffles, req("POST", {}, {
      pwaSession: s.admin,
      action: "complete",
      raffleId: "contract_raffle_complete_only_winners",
    }));
    assert.strictEqual(r.statusCode, 200, "raffle complete succeeds");
    const winners = r.body.raffle.winners || [];
    assert.strictEqual(winners.length, 2, "draw produces exactly two winners");
    const winnerTelegramIds = new Set(winners.map((w) => String(w.userId || "").replace(/^tg_/, "")));
    const winnerAccountIds = new Set(winners.map((w) => String(w.accountId || "").trim()).filter(Boolean));
    const participantTelegramIds = new Set(participants.map((p) => p.userId.replace(/^tg_/, "")));
    const participantAccountIds = new Set(participants.map((p) => p.accountId));

    const winnerMessages = sentMessages.filter((msg) => String(msg.body.text || "").includes("Вы выиграли розыгрыш"));
    assert.strictEqual(winnerMessages.length, winners.length, "winner Telegram notification count matches drawn winners");
    const notifiedTelegramIds = new Set(winnerMessages.map((msg) => String(msg.body.chat_id)));
    assert.deepStrictEqual(notifiedTelegramIds, winnerTelegramIds, "winner Telegram recipients match drawn winners");
    participantTelegramIds.forEach((id) => {
      assert.strictEqual(notifiedTelegramIds.has(id), winnerTelegramIds.has(id), "non-winner Telegram recipient is not notified " + id);
    });

    const winnerPushes = sentPushes.filter((item) => item.payload && item.payload.kind === "raffle_winner");
    assert.strictEqual(winnerPushes.length, winners.length, "winner push count matches drawn winners");
    const pushedAccountIds = new Set(winnerPushes.map((item) => String(item.payload.accountId || "").trim()).filter(Boolean));
    assert.deepStrictEqual(pushedAccountIds, winnerAccountIds, "winner push recipients match drawn winner accounts");
    participantAccountIds.forEach((id) => {
      assert.strictEqual(pushedAccountIds.has(id), winnerAccountIds.has(id), "non-winner push recipient is not notified " + id);
    });
  } finally {
    webpush.sendNotification = originalSendNotification;
  }
}

async function testRaffleWinnerNotificationDedup(redis) {
  const sentMessages = [];
  installRecordingFetch(redis, sentMessages);
  const { createRaffleNotificationService } = require(path.join(root, "lib/raffle-notifications"));
  const sentPushes = [];
  const service = createRaffleNotificationService({
    botToken: BOT_TOKEN,
    adminIds: [],
    miniAppUrl: "https://t.me/Poker_dvatuza_bot/DvaTuza",
    rafflePrefix: "poker_app:raffle:",
    redisPipeline: async (commands) => redis.pipeline(commands),
    sendWebPushToMember: async (memberId, payload) => {
      sentPushes.push({ memberId, payload });
      return 1;
    },
  });
  const raffle = {
    id: "contract_raffle_notify_dedup",
    title: "Dedup raffle",
    groups: [{ prize: "Ticket 500 ₽", count: 1 }],
    winners: [{
      userId: "tg_1001",
      accountId: "ID100001",
      name: "Player",
      p21Id: "P21-1001",
      prize: "Ticket 500 ₽",
    }],
    status: "drawn",
    drawnAt: new Date().toISOString(),
  };
  persistContractRaffle(redis, raffle);
  await Promise.all(Array.from({ length: 60 }, () =>
    service.notifyWinnersRaffleCompleted("contract_raffle_notify_dedup", JSON.parse(JSON.stringify(raffle)))
  ));
  const winnerMessages = sentMessages.filter((msg) => String(msg.body.chat_id) === "1001");
  const winnerPushes = sentPushes.filter((item) => item.payload && item.payload.kind === "raffle_winner");
  assert.strictEqual(winnerMessages.length, 1, "winner Telegram notification is sent once under duplicate triggers");
  assert.strictEqual(winnerPushes.length, 1, "winner web push is sent once under duplicate triggers");
}

async function testRaffleWinnerNotificationRetriesPushAfterZero(redis) {
  const sentMessages = [];
  installRecordingFetch(redis, sentMessages);
  const { createRaffleNotificationService } = require(path.join(root, "lib/raffle-notifications"));
  const sentPushes = [];
  let pushCalls = 0;
  const service = createRaffleNotificationService({
    botToken: BOT_TOKEN,
    adminIds: [],
    miniAppUrl: "https://t.me/Poker_dvatuza_bot/DvaTuza",
    rafflePrefix: "poker_app:raffle:",
    redisPipeline: async (commands) => redis.pipeline(commands),
    sendWebPushToMember: async (memberId, payload) => {
      pushCalls += 1;
      sentPushes.push({ memberId, payload, call: pushCalls });
      return pushCalls <= 2 ? 0 : 1;
    },
  });
  const raffle = {
    id: "contract_raffle_notify_push_retry",
    title: "Push retry raffle",
    groups: [{ prize: "Ticket 500 ₽", count: 1 }],
    winners: [{
      userId: "tg_1001",
      accountId: "ID100001",
      name: "Player",
      prize: "Ticket 500 ₽",
    }],
    status: "drawn",
    drawnAt: new Date().toISOString(),
  };
  persistContractRaffle(redis, raffle);
  await service.notifyWinnersRaffleCompleted("contract_raffle_notify_push_retry", JSON.parse(JSON.stringify(raffle)));
  await service.notifyWinnersRaffleCompleted("contract_raffle_notify_push_retry", JSON.parse(JSON.stringify(raffle)));
  const winnerMessages = sentMessages.filter((msg) => String(msg.body.chat_id) === "1001");
  const winnerPushes = sentPushes.filter((item) => item.payload && item.payload.kind === "raffle_winner");
  assert.strictEqual(winnerMessages.length, 1, "winner Telegram notification stays deduped while retrying push");
  assert.strictEqual(winnerPushes.length, 3, "winner push is retried after zero deliveries");
  assert.strictEqual(winnerPushes[0].memberId, "ID100001", "first push tries account id");
  assert.strictEqual(winnerPushes[1].memberId, "tg_1001", "first push falls back to telegram id");
  assert.strictEqual(winnerPushes[2].memberId, "ID100001", "second notification run retries account id");
}

async function testRaffleWinnerNotificationResolvesAccountId(redis) {
  const sentMessages = [];
  installRecordingFetch(redis, sentMessages);
  redis.h("poker_app:id_to_user").set("ID100002", "tg_1002");
  const { createRaffleNotificationService } = require(path.join(root, "lib/raffle-notifications"));
  const sentPushes = [];
  const service = createRaffleNotificationService({
    botToken: BOT_TOKEN,
    adminIds: [],
    miniAppUrl: "https://t.me/Poker_dvatuza_bot/DvaTuza",
    rafflePrefix: "poker_app:raffle:",
    redisPipeline: async (commands) => redis.pipeline(commands),
    sendWebPushToMember: async (memberId, payload) => {
      sentPushes.push({ memberId, payload });
      return 1;
    },
  });
  const raffle = {
    id: "contract_raffle_notify_account_id",
    title: "Account ID raffle",
    groups: [{ prize: "Ticket 500 ₽", count: 1 }],
    winners: [{
      userId: "ID100002",
      accountId: "ID100002",
      name: "Account Player",
      prize: "Ticket 500 ₽",
    }],
    status: "drawn",
    drawnAt: new Date().toISOString(),
  };
  persistContractRaffle(redis, raffle);
  await service.notifyWinnersRaffleCompleted("contract_raffle_notify_account_id", raffle);
  const winnerMessages = sentMessages.filter((msg) => String(msg.body.chat_id) === "1002");
  assert.strictEqual(winnerMessages.length, 1, "account-id winner resolves Telegram recipient");
  assert.strictEqual(sentPushes.length, 1, "account-id winner receives push attempt");
  assert.strictEqual(sentPushes[0].memberId, "ID100002", "push is addressed to account id");

  redis.h("poker_app:visitor_usernames").set("tg_1003", "real_winner");
  redis.h("poker_app:visitor_usernames").set("tg_1004", "wrong_owner");
  redis.h("poker_app:id_to_user").set("ID100004", "tg_1004");
  const usernameRaffle = {
    id: "contract_raffle_notify_username_preferred",
    title: "Username preferred raffle",
    totalWinners: 1,
    groups: [{ prize: "Ticket 500 ₽", count: 1 }],
    winners: [{
      userId: "manual_raffle_real_winner",
      accountId: "ID100004",
      telegramUsername: "real_winner",
      name: "Manual Winner",
      prize: "Ticket 500 ₽",
      groupIndex: 0,
    }],
    status: "drawn",
    drawnAt: new Date().toISOString(),
  };
  persistContractRaffle(redis, usernameRaffle);
  await service.notifyWinnersRaffleCompleted("contract_raffle_notify_username_preferred", usernameRaffle);
  assert.strictEqual(sentMessages.filter((msg) => String(msg.body.chat_id) === "1003").length, 1, "manual winner resolves by explicit Telegram username");
  assert.strictEqual(sentMessages.filter((msg) => String(msg.body.chat_id) === "1004").length, 0, "account-id owner with mismatched username is not notified");
  assert.strictEqual(sentPushes.filter((item) => item.memberId === "ID100004").length, 0, "mismatched account id does not receive winner push");
  assert.strictEqual(sentPushes.filter((item) => item.memberId === "tg_1003").length, 1, "resolved Telegram user receives winner push fallback");
}

async function testRaffleWinnerNotificationCapsOverflow(redis) {
  const sentMessages = [];
  installRecordingFetch(redis, sentMessages);
  const { createRaffleNotificationService } = require(path.join(root, "lib/raffle-notifications"));
  const sentPushes = [];
  const service = createRaffleNotificationService({
    botToken: BOT_TOKEN,
    adminIds: [],
    miniAppUrl: "https://t.me/Poker_dvatuza_bot/DvaTuza",
    rafflePrefix: "poker_app:raffle:",
    redisPipeline: async (commands) => redis.pipeline(commands),
    sendWebPushToMember: async (memberId, payload) => {
      sentPushes.push({ memberId, payload });
      return 1;
    },
  });
  const raffle = {
    id: "contract_raffle_notify_caps_overflow",
    title: "Overflow winner raffle",
    totalWinners: 1,
    groups: [{ prize: "Ticket 500 ₽", count: 1 }],
    participants: [
      { userId: "tg_1001", accountId: "ID100001", name: "Winner" },
      { userId: "tg_1002", accountId: "ID100002", name: "Participant 2" },
      { userId: "tg_1003", accountId: "ID100003", name: "Participant 3" },
    ],
    winners: [
      { userId: "tg_1001", accountId: "ID100001", name: "Winner", prize: "Ticket 500 ₽", groupIndex: 0 },
      { userId: "tg_1002", accountId: "ID100002", name: "Participant 2" },
      { userId: "tg_1003", accountId: "ID100003", name: "Participant 3" },
    ],
    status: "drawn",
    drawnAt: new Date().toISOString(),
  };
  persistContractRaffle(redis, raffle);
  await service.notifyWinnersRaffleCompleted("contract_raffle_notify_caps_overflow", raffle);
  assert.strictEqual(sentMessages.filter((msg) => String(msg.body.chat_id) === "1001").length, 1, "real winner receives Telegram notification");
  assert.strictEqual(sentMessages.filter((msg) => String(msg.body.chat_id) === "1002").length, 0, "overflow participant 2 does not receive Telegram notification");
  assert.strictEqual(sentMessages.filter((msg) => String(msg.body.chat_id) === "1003").length, 0, "overflow participant 3 does not receive Telegram notification");
  const winnerPushes = sentPushes.filter((item) => item.payload && item.payload.kind === "raffle_winner");
  assert.strictEqual(winnerPushes.length, 1, "only capped winner receives web push");
  assert.strictEqual(winnerPushes[0].memberId, "ID100001", "web push is addressed to capped winner");

  const participantRows = [
    { userId: "tg_1004", accountId: "ID100004", name: "Participant 4" },
    { userId: "tg_1005", accountId: "ID100005", name: "Participant 5" },
  ];
  const participantRaffle = {
    id: "contract_raffle_notify_participants_as_winners",
    title: "Participants copied into winners",
    totalWinners: 1,
    groups: [{ prize: "Ticket 500 ₽", count: 1 }],
    participants: participantRows,
    winners: participantRows.map((row) => ({ ...row })),
    status: "drawn",
    drawnAt: new Date().toISOString(),
  };
  persistContractRaffle(redis, participantRaffle);
  await service.notifyWinnersRaffleCompleted("contract_raffle_notify_participants_as_winners", participantRaffle);
  assert.strictEqual(sentMessages.filter((msg) => String(msg.body.chat_id) === "1004").length, 0, "participant-shaped overflow does not notify first participant");
  assert.strictEqual(sentMessages.filter((msg) => String(msg.body.chat_id) === "1005").length, 0, "participant-shaped overflow does not notify second participant");
  assert.strictEqual(sentPushes.filter((item) => item.memberId === "ID100004" || item.memberId === "ID100005").length, 0, "participant-shaped overflow does not push participants");

  const exactParticipantRows = [
    { userId: "tg_1006", accountId: "ID100006", name: "Participant 6" },
    { userId: "tg_1007", accountId: "ID100007", name: "Participant 7" },
  ];
  const exactParticipantRaffle = {
    id: "contract_raffle_notify_exact_participants_as_winners",
    title: "Participants copied into exact winner slots",
    totalWinners: 2,
    groups: [{ prize: "Ticket 500 ₽", count: 2 }],
    participants: exactParticipantRows,
    winners: exactParticipantRows.map((row) => ({ ...row })),
    status: "drawn",
    drawnAt: new Date().toISOString(),
  };
  persistContractRaffle(redis, exactParticipantRaffle);
  await service.notifyWinnersRaffleCompleted("contract_raffle_notify_exact_participants_as_winners", exactParticipantRaffle);
  assert.strictEqual(sentMessages.filter((msg) => String(msg.body.chat_id) === "1006").length, 0, "participant-shaped exact list does not notify first participant");
  assert.strictEqual(sentMessages.filter((msg) => String(msg.body.chat_id) === "1007").length, 0, "participant-shaped exact list does not notify second participant");
  assert.strictEqual(sentPushes.filter((item) => item.memberId === "ID100006" || item.memberId === "ID100007").length, 0, "participant-shaped exact list does not push participants");

  const readyParticipantRows = [
    { userId: "tg_1008", accountId: "ID100008", name: "Participant 8" },
    { userId: "tg_1009", accountId: "ID100009", name: "Participant 9" },
  ];
  const readyParticipantRaffle = {
    id: "contract_raffle_notify_ready_participants_as_winners",
    title: "Participants copied into winners with ready window",
    totalWinners: 1,
    groups: [{ prize: "Ticket 500 ₽", count: 1 }],
    participants: readyParticipantRows,
    winners: readyParticipantRows.map((row, index) => ({
      ...row,
      winnerReadySlotId: "initial_" + index,
      winnerReadyWindowStartedAt: new Date().toISOString(),
      winnerReadyDeadlineAt: new Date(Date.now() + 600_000).toISOString(),
      winnerReadyState: "pending",
    })),
    status: "drawn",
    drawnAt: new Date().toISOString(),
  };
  persistContractRaffle(redis, readyParticipantRaffle);
  await service.notifyWinnersRaffleCompleted("contract_raffle_notify_ready_participants_as_winners", readyParticipantRaffle);
  assert.strictEqual(sentMessages.filter((msg) => String(msg.body.chat_id) === "1008").length, 0, "participant rows with ready timers do not notify first participant");
  assert.strictEqual(sentMessages.filter((msg) => String(msg.body.chat_id) === "1009").length, 0, "participant rows with ready timers do not notify second participant");
  assert.strictEqual(sentPushes.filter((item) => item.memberId === "ID100008" || item.memberId === "ID100009").length, 0, "participant rows with ready timers do not push participants");
}

async function testRaffleWinnerNotificationRequiresStoredWinner(redis) {
  const sentMessages = [];
  installRecordingFetch(redis, sentMessages);
  const { createRaffleNotificationService } = require(path.join(root, "lib/raffle-notifications"));
  const sentPushes = [];
  const service = createRaffleNotificationService({
    botToken: BOT_TOKEN,
    adminIds: [],
    miniAppUrl: "https://t.me/Poker_dvatuza_bot/DvaTuza",
    rafflePrefix: "poker_app:raffle:",
    redisPipeline: async (commands) => redis.pipeline(commands),
    sendWebPushToMember: async (memberId, payload) => {
      sentPushes.push({ memberId, payload });
      return 1;
    },
  });
  const storedRaffle = {
    id: "contract_raffle_notify_requires_stored_winner",
    title: "Stored winner check raffle",
    totalWinners: 1,
    groups: [{ prize: "Ticket 500 ₽", count: 1 }],
    winners: [{
      userId: "tg_1001",
      accountId: "ID100001",
      name: "Stored Winner",
      prize: "Ticket 500 ₽",
      groupIndex: 0,
      winnerReadySlotId: "initial_0",
    }],
    status: "drawn",
    drawnAt: new Date().toISOString(),
  };
  persistContractRaffle(redis, storedRaffle);
  const staleCandidateRaffle = {
    ...storedRaffle,
    winners: [{
      userId: "tg_1002",
      accountId: "ID100002",
      name: "Wrong Candidate",
      prize: "Ticket 500 ₽",
      groupIndex: 0,
      winnerReadySlotId: "initial_0",
    }],
  };
  await service.notifyWinnersRaffleCompleted("contract_raffle_notify_requires_stored_winner", staleCandidateRaffle);
  assert.strictEqual(sentMessages.filter((msg) => String(msg.body.chat_id) === "1002").length, 0, "candidate missing from stored winners is not notified");
  assert.strictEqual(sentPushes.filter((item) => item.memberId === "ID100002").length, 0, "candidate missing from stored winners does not receive push");

  await service.notifyWinnersRaffleCompleted("contract_raffle_notify_requires_stored_winner", storedRaffle);
  assert.strictEqual(sentMessages.filter((msg) => String(msg.body.chat_id) === "1001").length, 1, "stored winner still receives Telegram notification");
  assert.strictEqual(sentPushes.filter((item) => item.memberId === "ID100001").length, 1, "stored winner still receives web push");
}

async function testRaffleAutoCompleteNotificationDedup(redis) {
  const sentMessages = [];
  installRecordingFetch(redis, sentMessages);
  const raffles = loadHandler("raffles");
  const s = sessions();
  redis.h("poker_app:visitor_dt_ids").set("tg_1001", "ID100001");
  redis.h("poker_app:id_to_user").set("ID100001", "tg_1001");
  const raffle = {
    id: "contract_raffle_auto_notify_dedup",
    title: "Auto dedup raffle",
    totalWinners: 1,
    groups: [{ prize: "Ticket 500 ₽", count: 1 }],
    endDate: new Date(Date.now() - 60_000).toISOString(),
    participants: [{
      userId: "tg_1001",
      accountId: "ID100001",
      name: "Player",
      p21Id: "P21-1001",
    }],
    winners: [],
    status: "active",
    createdAt: new Date(Date.now() - 3600_000).toISOString(),
  };
  redis.kv.set("poker_app:raffle:contract_raffle_auto_notify_dedup", JSON.stringify(raffle));
  redis.l("poker_app:raffle_ids").push("contract_raffle_auto_notify_dedup");
  await Promise.all(Array.from({ length: 50 }, () => call(raffles, req("GET", { pwaSession: s.user }))));
  for (let i = 0; i < 8; i += 1) await new Promise((resolve) => setTimeout(resolve, 0));
  const winnerMessages = sentMessages.filter((msg) => String(msg.body.chat_id) === "1001");
  assert.strictEqual(winnerMessages.length, 1, "auto-complete sends winner Telegram notification once under duplicate GETs");
  const stored = JSON.parse(redis.kv.get("poker_app:raffle:contract_raffle_auto_notify_dedup"));
  assert.strictEqual(stored.status, "drawn", "auto-complete stores drawn raffle");
  assert.strictEqual((stored.winners || []).length, 1, "auto-complete stores one winner");
}

async function testDoubleRaffleConcurrentBatchNotifications(redis) {
  const sentMessages = [];
  installRecordingFetch(redis, sentMessages);
  const raffles = loadHandler("raffles");
  const s = sessions();
  const now = Date.now();
  const participants = Array.from({ length: 24 }, (_, index) => {
    const telegramId = 910000 + index;
    return {
      userId: "tg_" + telegramId,
      accountId: "ID" + String(910000 + index),
      name: "Double player " + index,
      p21Id: "P21-" + telegramId,
      pokerPlusStatusLevel: 10,
    };
  });
  participants.forEach((participant) => {
    redis.h("poker_app:id_to_user").set(participant.accountId, participant.userId);
  });
  const raffle = {
    id: "contract_double_raffle_concurrent",
    title: "Double concurrent raffle",
    totalWinners: 10,
    accessLevel: 10,
    groups: [
      { prize: "First batch", count: 7, accessLevel: 10 },
      { prize: "Second batch", count: 3, accessLevel: 10 },
    ],
    resultBatches: [
      { label: "First 7", endDate: new Date(now - 60_000).toISOString() },
      { label: "Second 3", endDate: new Date(now + 3600_000).toISOString() },
    ],
    endDate: new Date(now + 3600_000).toISOString(),
    participants,
    winners: [],
    status: "active",
    createdAt: new Date(now - 3600_000).toISOString(),
  };
  persistContractRaffle(redis, raffle);
  redis.s("poker_app:raffle_active_ids").add(raffle.id);
  redis.kv.set("poker_app:raffle_active_ids:ready", "1");

  const concurrentPublicReads = () => Promise.all(Array.from({ length: 50 }, (_, index) => call(raffles, req("GET",
    index % 2 === 0
      ? { pwaSession: s.user, id: raffle.id }
      : { pwaSession: s.user, activeOnly: "1", bypassListCache: "1" }
  ))));
  await concurrentPublicReads();
  let stored = JSON.parse(redis.kv.get("poker_app:raffle:" + raffle.id));
  let firstWinners = (stored.winners || []).filter((winner) => Number(winner.groupIndex) === 0);
  assert.strictEqual(firstWinners.length, 7, "concurrent first batch stores exactly seven winners");
  const firstStoredIds = new Set(firstWinners.map((winner) => String(winner.userId).replace(/^tg_/, "")));
  const firstNotifiedIds = new Set(sentMessages
    .filter((msg) => String(msg.body.text || "").includes("Вы выиграли розыгрыш"))
    .map((msg) => String(msg.body.chat_id)));
  assert.deepStrictEqual(firstNotifiedIds, firstStoredIds, "concurrent first batch notifies only committed winners");

  stored.resultBatches[1].endDate = new Date(now - 1000).toISOString();
  stored.endDate = new Date(now - 1000).toISOString();
  redis.kv.set("poker_app:raffle:" + raffle.id, JSON.stringify(stored));
  await concurrentPublicReads();
  stored = JSON.parse(redis.kv.get("poker_app:raffle:" + raffle.id));
  assert.strictEqual(stored.status, "drawn", "concurrent second batch completes raffle");
  const initialWinners = (stored.winners || []).filter((winner) => !winner.winnerReroll);
  assert.strictEqual(initialWinners.length, 10, "concurrent second batch preserves exactly ten initial winners");
  const finalStoredIds = new Set(initialWinners.map((winner) => String(winner.userId).replace(/^tg_/, "")));
  const allNotifiedIds = new Set(sentMessages
    .filter((msg) => String(msg.body.text || "").includes("Вы выиграли розыгрыш"))
    .map((msg) => String(msg.body.chat_id)));
  assert.deepStrictEqual(allNotifiedIds, finalStoredIds, "concurrent second batch notifies only committed final winners");
}

async function testRaffleCronRetriesMissingWinnerNotifications(redis) {
  const sentMessages = [];
  installRecordingFetch(redis, sentMessages);
  const raffles = loadHandler("raffles");
  const now = Date.now();
  const winners = [1001, 1002, 1003].map((id, index) => ({
    userId: "tg_" + id,
    accountId: "ID" + String(100000 + id),
    name: "Player " + id,
    prize: "Ticket " + (index + 1),
    groupIndex: index,
    winnerReadySlotId: "initial_" + index,
    winnerReadyWindowStartedAt: new Date(now - 60_000).toISOString(),
    winnerReadyDeadlineAt: new Date(now + 14 * 60_000).toISOString(),
    winnerReadyState: "pending",
  }));
  const raffle = {
    id: "contract_raffle_retry_missing_winner_notify",
    title: "Retry missing notification raffle",
    totalWinners: 3,
    groups: [{ prize: "Ticket", count: 3 }],
    participants: winners,
    winners,
    status: "drawn",
    createdAt: new Date(now - 3600_000).toISOString(),
    drawnAt: new Date(now - 60_000).toISOString(),
    winnersNotifiedAt: new Date(now - 30_000).toISOString(),
  };
  persistContractRaffle(redis, raffle);
  redis.l("poker_app:raffle_ids").push(raffle.id);
  redis.kv.set("poker_app:raffle_winner_notify_sent:" + raffle.id + ":ID101001:tg", "1");

  const r = await call(raffles, req("GET", {
    action: "tick",
    secret: process.env.CRON_SECRET,
  }, undefined, { "x-cron-secret": process.env.CRON_SECRET }));
  assert.strictEqual(r.statusCode, 200, "cron tick succeeds");
  assert.strictEqual(r.body.winnerNotificationRetries, 1, "cron reports one raffle retried");
  assert.strictEqual(sentMessages.filter((msg) => String(msg.body.chat_id) === "1001").length, 0, "already sent winner is not duplicated");
  assert.strictEqual(sentMessages.filter((msg) => String(msg.body.chat_id) === "1002").length, 1, "missing winner 1002 is retried");
  assert.strictEqual(sentMessages.filter((msg) => String(msg.body.chat_id) === "1003").length, 1, "missing winner 1003 is retried");
}

async function testRaffleCronRetriesMissingActiveBatchWinnerNotifications(redis) {
  const sentMessages = [];
  installRecordingFetch(redis, sentMessages);
  const raffles = loadHandler("raffles");
  const now = Date.now();
  const winners = [1001, 1002, 1003].map((id, index) => ({
    userId: "tg_" + id,
    accountId: "ID" + String(100000 + id),
    name: "Player " + id,
    prize: "Ticket " + (index + 1),
    groupIndex: index,
    winnerReadySlotId: "initial_" + index,
    winnerReadyWindowStartedAt: new Date(now - 60_000).toISOString(),
    winnerReadyDeadlineAt: new Date(now + 14 * 60_000).toISOString(),
    winnerReadyState: "pending",
  }));
  const raffle = {
    id: "contract_active_batch_notify",
    title: "Retry active batch notification raffle",
    totalWinners: 3,
    groups: [
      { prize: "Ticket 1", count: 1 },
      { prize: "Ticket 2", count: 1 },
      { prize: "Ticket 3", count: 1 },
    ],
    participants: winners,
    winners,
    status: "active",
    resultBatches: [
      {
        label: "First batch",
        endDate: new Date(now - 60_000).toISOString(),
        drawnAt: new Date(now - 60_000).toISOString(),
        groupIndexes: [0, 1],
      },
      {
        label: "Future batch",
        endDate: new Date(now + 3600_000).toISOString(),
        groupIndexes: [2],
      },
    ],
    endDate: new Date(now + 3600_000).toISOString(),
    createdAt: new Date(now - 3600_000).toISOString(),
    drawnAt: "",
    winnersNotifiedAt: new Date(now - 30_000).toISOString(),
  };
  persistContractRaffle(redis, raffle);
  redis.l("poker_app:raffle_ids").push(raffle.id);
  redis.kv.set("poker_app:raffle_winner_notify_sent:" + raffle.id + ":ID101001:tg", "1");

  const r = await call(raffles, req("GET", {
    action: "tick",
    secret: process.env.CRON_SECRET,
  }, undefined, { "x-cron-secret": process.env.CRON_SECRET }));
  assert.strictEqual(r.statusCode, 200, "cron tick succeeds for active batch retry");
  assert.strictEqual(r.body.winnerNotificationRetries, 1, "cron reports active batch raffle retried");
  assert.strictEqual(sentMessages.filter((msg) => String(msg.body.chat_id) === "1001").length, 0, "already sent active batch winner is not duplicated");
  assert.strictEqual(sentMessages.filter((msg) => String(msg.body.chat_id) === "1002").length, 1, "missing active batch winner is retried");
  assert.strictEqual(sentMessages.filter((msg) => String(msg.body.chat_id) === "1003").length, 0, "future batch winner is not notified early");
}

async function testRaffleDrawnGetDoesNotNotifyWinners(redis) {
  const sentMessages = [];
  installRecordingFetch(redis, sentMessages);
  const raffles = loadHandler("raffles");
  const s = sessions();
  redis.h("poker_app:visitor_dt_ids").set("tg_1001", "ID100001");
  redis.h("poker_app:id_to_user").set("ID100001", "tg_1001");
  const raffle = {
    id: "contract_raffle_drawn_get_no_notify",
    title: "Drawn GET no notify",
    totalWinners: 1,
    groups: [{ prize: "Ticket 500 ₽", count: 1 }],
    endDate: new Date(Date.now() - 60_000).toISOString(),
    participants: [{
      userId: "tg_1001",
      accountId: "ID100001",
      name: "Player",
      p21Id: "P21-1001",
    }],
    winners: [{
      userId: "tg_1001",
      accountId: "ID100001",
      name: "Player",
      p21Id: "P21-1001",
      prize: "Ticket 500 ₽",
    }],
    status: "drawn",
    drawnAt: new Date(Date.now() - 30_000).toISOString(),
    createdAt: new Date(Date.now() - 3600_000).toISOString(),
  };
  redis.kv.set("poker_app:raffle:contract_raffle_drawn_get_no_notify", JSON.stringify(raffle));
  redis.l("poker_app:raffle_ids").push("contract_raffle_drawn_get_no_notify");

  let r = await call(raffles, req("GET", { pwaSession: s.user }));
  assert.strictEqual(r.statusCode, 200, "drawn raffle list GET succeeds");
  r = await call(raffles, req("GET", {
    pwaSession: s.user,
    id: "contract_raffle_drawn_get_no_notify",
  }));
  assert.strictEqual(r.statusCode, 200, "drawn raffle detail GET succeeds");
  for (let i = 0; i < 8; i += 1) await new Promise((resolve) => setTimeout(resolve, 0));
  const winnerMessages = sentMessages.filter((msg) => String(msg.body.chat_id) === "1001");
  assert.strictEqual(winnerMessages.length, 0, "GET of an already-drawn raffle does not send winner Telegram notifications");
}

async function testRaffleDailyRecurring(redis) {
  const raffles = loadHandler("raffles");
  const s = sessions();
  const createStart = contractMoscowStartOnOrBefore(new Date(Date.now() + 24 * 3600_000), DAILY_CASH_START_TIME);
  let r = await call(raffles, req("POST", {}, {
    pwaSession: s.admin,
    action: "create",
    title: "20 беккинг-байинов на кеш",
    totalWinners: 2,
    groups: [{ prize: "10 байинов по 1000р на 20/40", count: 1 }, { prize: "10 байинов по 200р на 5/10", count: 1 }],
    endDate: new Date(createStart.getTime() + DAILY_CASH_DURATION_MS).toISOString(),
    daily: true,
    dailyStartTime: "9:05",
    idemKey: "contract-daily-create",
  }));
  assert.strictEqual(r.statusCode, 200, "admin can create a daily raffle");
  assert.strictEqual(r.body.raffle.daily, true, "daily raffle is marked daily");
  assert.strictEqual(r.body.raffle.accessLevel, 10, "daily cash raffle defaults to level 10+ access");
  assert.strictEqual(r.body.raffle.recurrence.template.accessLevel, 10, "daily cash template defaults to level 10+ access");
  assert.strictEqual(r.body.raffle.recurrence.startTime, DAILY_CASH_START_TIME, "cash daily start time is canonical");
  assert.strictEqual(r.body.raffle.recurrence.seriesId, DAILY_CASH_SERIES_ID, "cash daily uses one canonical series");
  assert.strictEqual(r.body.raffle.recurrence.durationMs, DAILY_CASH_DURATION_MS, "cash daily lasts until 20:15 next day");
  assert.strictEqual(
    r.body.raffle.endDate,
    new Date(new Date(r.body.raffle.createdAt).getTime() + DAILY_CASH_DURATION_MS).toISOString(),
    "cash daily end date is canonical",
  );
  const createdDailyId = r.body.raffle.id;
  redis.kv.delete("poker_app:raffle:" + createdDailyId);
  const dailyIds = redis.l("poker_app:raffle_ids");
  const dailyIdx = dailyIds.indexOf(createdDailyId);
  if (dailyIdx !== -1) dailyIds.splice(dailyIdx, 1);

  const dueStart = contractMoscowStartOnOrBefore(new Date(), DAILY_CASH_START_TIME);
  const oldStart = new Date(dueStart.getTime() - 24 * 3600_000);
  const durationMs = DAILY_CASH_DURATION_MS;
  const source = {
    id: "daily_contract_source",
    createdBy: "tg_388008256",
    title: "Daily cash source",
    totalWinners: 1,
    groups: [{ prize: "10 байинов по 1000р на кеш", count: 1 }],
    prizeKind: "cash",
    endDate: new Date(oldStart.getTime() + durationMs).toISOString(),
    participants: [],
    winners: [],
    status: "drawn",
    createdAt: oldStart.toISOString(),
    daily: true,
    recurrence: {
      type: "daily",
      timeZone: "Europe/Moscow",
      startTime: "11:30",
      seriesId: "contract_daily_series",
      scheduledStartAt: oldStart.toISOString(),
      nextStartAt: dueStart.toISOString(),
      durationMs,
      qstashScheduleId: "contract_daily_schedule_id",
      qstashCron: "CRON_TZ=Europe/Moscow 30 11 * * *",
      qstashScheduledAt: new Date(Date.now() - 3600_000).toISOString(),
      template: {
        title: "Daily cash source",
        totalWinners: 1,
        groups: [{ prize: "10 байинов по 1000р на кеш", count: 1 }],
        prizeKind: "cash",
      },
    },
  };
  redis.kv.set("poker_app:raffle:daily_contract_source", JSON.stringify(source));
  redis.l("poker_app:raffle_ids").push("daily_contract_source");

  r = await call(raffles, req("GET", { pwaSession: s.user }));
  assert.strictEqual(r.statusCode, 200, "raffles list succeeds with daily series");
  const generated = (r.body.raffles || []).filter((raffle) => raffle.recurrence && raffle.recurrence.seriesId === DAILY_CASH_SERIES_ID && raffle.id !== source.id);
  assert.strictEqual(generated.length, 1, "due daily series creates one next raffle");
  assert.strictEqual(generated[0].status, "active", "generated daily raffle is active");
  assert.strictEqual(generated[0].accessLevel, 10, "generated daily cash raffle uses level 10+ access");
  assert.strictEqual(generated[0].recurrence.template.accessLevel, 10, "generated daily cash template keeps level 10+ access");
  assert.strictEqual(generated[0].createdAt, dueStart.toISOString(), "generated daily raffle starts at scheduled time");
  assert.strictEqual(generated[0].endDate, new Date(dueStart.getTime() + durationMs).toISOString(), "generated daily raffle keeps original duration");
  assert.strictEqual(
    generated[0].recurrence.qstashScheduleId,
    undefined,
    "generated daily raffle drops stale non-canonical QStash schedule id",
  );
}

async function testRaffleDailyScheduleDedupe(redis) {
  const previousQstashToken = process.env.QSTASH_TOKEN;
  const previousAppUrl = process.env.APP_URL;
  const previousFetch = global.fetch;
  const scheduleCalls = [];

  process.env.QSTASH_TOKEN = "contract-qstash-token";
  process.env.APP_URL = "https://contract.test";
  global.fetch = async function fetchScheduleDedupeMock(url, opts) {
    const u = String(url || "");
    if (u.includes("/v2/schedules/")) {
      scheduleCalls.push({ url: u, headers: Object.assign({}, (opts && opts.headers) || {}) });
      return {
        ok: true,
        async json() { return { ok: true }; },
        async text() { return JSON.stringify({ ok: true }); },
      };
    }
    return previousFetch(url, opts);
  };

  try {
    const raffles = loadHandler("raffles");
    const s = sessions();
    const createStart = contractMoscowStartOnOrBefore(new Date(Date.now() + 24 * 3600_000), DAILY_CASH_START_TIME);
    let r = await call(raffles, req("POST", {}, {
      pwaSession: s.admin,
      action: "create",
      title: "Daily schedule cash dedupe",
      totalWinners: 1,
      groups: [{ prize: "10 байинов по 1000р на кеш", count: 1 }],
      endDate: new Date(createStart.getTime() + DAILY_CASH_DURATION_MS).toISOString(),
      daily: true,
      dailyStartTime: "10:40",
      idemKey: "contract-daily-schedule-dedupe",
    }));
    assert.strictEqual(r.statusCode, 200, "admin can create scheduled daily raffle");
    assert.strictEqual(scheduleCalls.length, 1, "initial daily raffle creates one QStash schedule");
    const sourceId = r.body.raffle.id;
    const stored = JSON.parse(redis.kv.get("poker_app:raffle:" + sourceId));
    assert.ok(stored.recurrence.qstashScheduleId, "stored daily raffle keeps QStash schedule id");
    assert.strictEqual(stored.recurrence.startTime, DAILY_CASH_START_TIME, "stored cash daily keeps canonical time");
    assert.strictEqual(stored.accessLevel, 10, "stored cash daily keeps level 10+ access");
    assert.strictEqual(stored.recurrence.template.accessLevel, 10, "stored cash daily template keeps level 10+ access");

    const dueStart = contractMoscowStartOnOrBefore(new Date(), DAILY_CASH_START_TIME);
    const firstStart = new Date(dueStart.getTime() - 24 * 3600_000).toISOString();
    const durationMs = DAILY_CASH_DURATION_MS;
    stored.status = "drawn";
    stored.createdAt = firstStart;
    stored.startedAt = firstStart;
    stored.endDate = new Date(new Date(firstStart).getTime() + durationMs).toISOString();
    stored.recurrence.scheduledStartAt = firstStart;
    stored.recurrence.nextStartAt = dueStart.toISOString();
    stored.recurrence.durationMs = durationMs;
    redis.kv.set("poker_app:raffle:" + sourceId, JSON.stringify(stored));

    r = await call(raffles, req("GET", { pwaSession: s.user }));
    assert.strictEqual(r.statusCode, 200, "raffles list creates due scheduled daily raffle");
    const generated = (r.body.raffles || []).filter((raffle) => raffle.recurrence && raffle.recurrence.seriesId === DAILY_CASH_SERIES_ID && raffle.id !== sourceId);
    assert.strictEqual(generated.length, 1, "scheduled daily series creates one generated raffle");
    assert.strictEqual(
      generated[0].recurrence.qstashScheduleId,
      stored.recurrence.qstashScheduleId,
      "generated daily raffle reuses the original QStash schedule id",
    );
    assert.strictEqual(generated[0].accessLevel, 10, "scheduled daily generated raffle keeps level 10+ access");
    assert.strictEqual(scheduleCalls.length, 1, "generated daily raffle does not create a second QStash schedule");
  } finally {
    if (previousQstashToken === undefined) delete process.env.QSTASH_TOKEN;
    else process.env.QSTASH_TOKEN = previousQstashToken;
    if (previousAppUrl === undefined) delete process.env.APP_URL;
    else process.env.APP_URL = previousAppUrl;
    global.fetch = previousFetch;
  }
}

async function testRaffleDailyCronTick(redis) {
  const cronRaffles = loadHandler("cron-raffles");
  const dueStart = contractMoscowStartOnOrBefore(new Date(), DAILY_CASH_START_TIME);
  const previousStart = new Date(dueStart.getTime() - 24 * 3600_000);
  const durationMs = DAILY_CASH_DURATION_MS;
  const source = {
    id: "daily_contract_cron_source",
    createdBy: "tg_388008256",
    title: "Daily cron cash source",
    totalWinners: 1,
    groups: [{ prize: "10 байинов по 1000р на кеш", count: 1 }],
    prizeKind: "cash",
    endDate: new Date(previousStart.getTime() + durationMs).toISOString(),
    participants: [],
    winners: [],
    status: "drawn",
    createdAt: previousStart.toISOString(),
    daily: true,
    recurrence: {
      type: "daily",
      timeZone: "Europe/Moscow",
      startTime: "12:15",
      seriesId: "contract_daily_cron_series",
      scheduledStartAt: previousStart.toISOString(),
      nextStartAt: dueStart.toISOString(),
      durationMs,
      template: {
        title: "Daily cron cash source",
        totalWinners: 1,
        groups: [{ prize: "10 байинов по 1000р на кеш", count: 1 }],
        prizeKind: "cash",
      },
    },
  };
  redis.kv.set("poker_app:raffle:daily_contract_cron_source", JSON.stringify(source));
  redis.l("poker_app:raffle_ids").push("daily_contract_cron_source");

  const r = await call(cronRaffles, req("POST", {}, {}, { authorization: "Bearer contract-cron-secret" }));
  assert.strictEqual(r.statusCode, 200, "raffle cron tick succeeds without user session");
  assert.strictEqual(r.body.mode, "raffles_tick", "raffle cron tick returns tick mode");
  assert.strictEqual(r.body.dailyCreated, 1, "raffle cron tick creates due daily raffle");
  const ids = redis.l("poker_app:raffle_ids");
  const createdId = ids.find((id) => id !== source.id && String(id).indexOf("raffle_") === 0);
  assert.ok(createdId, "raffle cron tick stores generated raffle id");
  const generated = JSON.parse(redis.kv.get("poker_app:raffle:" + createdId));
  assert.strictEqual(generated.status, "active", "cron generated daily raffle is active");
  assert.strictEqual(generated.createdAt, dueStart.toISOString(), "cron generated daily raffle starts at scheduled time");
  assert.strictEqual(generated.endDate, new Date(dueStart.getTime() + durationMs).toISOString(), "cron generated daily raffle keeps duration");
  assert.strictEqual(generated.recurrence.seriesId, DAILY_CASH_SERIES_ID, "cron generated daily raffle uses canonical cash series");
  assert.strictEqual(generated.accessLevel, 10, "cron generated daily cash raffle keeps level 10+ access");
  assert.strictEqual(generated.recurrence.template.accessLevel, 10, "cron generated daily cash template keeps level 10+ access");
}

async function testRaffleDuplicateOptions(redis) {
  const raffles = loadHandler("raffles");
  const s = sessions();
  for (let i = 1; i <= 4; i += 1) {
    const createdAt = new Date(Date.now() - (5 - i) * 3600_000).toISOString();
    const raffle = {
      id: "duplicate_option_" + i,
      title: "Duplicate source " + i,
      totalWinners: i,
      groups: [{ prize: "Prize " + i, count: i }],
      endDate: new Date(Date.now() + (i + 1) * 3600_000).toISOString(),
      participants: [],
      winners: [],
      status: i % 2 === 0 ? "drawn" : "active",
      createdAt,
    };
    if (i === 2) {
      raffle.daily = true;
      raffle.recurrence = {
        type: "daily",
        timeZone: "Europe/Moscow",
        startTime: "10:15",
        seriesId: "duplicate_option_daily_series",
        scheduledStartAt: createdAt,
        nextStartAt: new Date(Date.now() + 24 * 3600_000).toISOString(),
        durationMs: 3600_000,
        template: {
          title: raffle.title,
          totalWinners: raffle.totalWinners,
          groups: raffle.groups,
        },
      };
    }
    redis.kv.set("poker_app:raffle:" + raffle.id, JSON.stringify(raffle));
    redis.l("poker_app:raffle_ids").push(raffle.id);
  }

  let r = await call(raffles, req("POST", {}, { pwaSession: s.admin, action: "duplicateOptions" }));
  assert.strictEqual(r.statusCode, 200, "admin can load raffle duplicate options");
  assert.deepStrictEqual(
    (r.body.raffles || []).map((raffle) => raffle.id),
    ["duplicate_option_4", "duplicate_option_3", "duplicate_option_2"],
    "duplicate options return three latest raffles",
  );
  assert.strictEqual(r.body.raffles[2].groups[0].prize, "Prize 2", "duplicate options include group params");
  assert.strictEqual(r.body.raffles[2].daily, true, "duplicate options can show a daily source");

  r = await call(raffles, req("POST", {}, {
    pwaSession: s.admin,
    action: "duplicateLast",
    sourceRaffleId: "duplicate_option_2",
    createIdempotencyKey: "contract-duplicate-selected",
  }));
  assert.strictEqual(r.statusCode, 200, "admin can duplicate selected raffle");
  assert.strictEqual(r.body.raffle.title, "Duplicate source 2", "selected duplicate keeps source title");
  assert.strictEqual(r.body.raffle.groups[0].prize, "Prize 2", "selected duplicate keeps source prize");
  assert.strictEqual(r.body.raffle.daily, undefined, "selected duplicate does not create another daily series");
  assert.strictEqual(r.body.raffle.recurrence, undefined, "selected duplicate drops source recurrence");
}

async function testRespectVoteWithdraw(redis) {
  const respect = loadHandler("respect");
  const s = sessions();
  redis.h("poker_app:visitor_dt_ids").set("tg_1001", "ID100001");
  redis.h("poker_app:id_to_user").set("ID100001", "tg_1001");
  redis.h("poker_app:visitor_dt_ids").set("tg_1002", "ID100002");
  redis.h("poker_app:id_to_user").set("ID100002", "tg_1002");
  redis.h("poker_app:visitor_usernames").set("tg_1001", "player");

  let r = await call(respect, req("POST", {}, { pwaSession: s.user, targetUserId: "tg_1002", action: "up" }));
  assert.strictEqual(r.statusCode, 200, "respect up succeeds");
  assert.strictEqual(r.body.score, 1, "respect up increments");
  assert.strictEqual(r.body.myVote, "up", "respect stores up vote");

  r = await call(respect, req("GET", { pwaSession: s.peer, userId: "tg_1002", list: "1" }));
  assert.strictEqual(r.statusCode, 200, "respect voter list succeeds");
  assert.strictEqual(r.body.voterDisplay.ID100001, "ID100001", "hidden Telegram username is absent from voter list");

  redis.h("poker_app:telegram_visible").set("ID100001", "1");
  r = await call(respect, req("GET", { pwaSession: s.peer, userId: "tg_1002", list: "1" }));
  assert.strictEqual(r.body.voterDisplay.ID100001, "@player", "public Telegram username remains visible in voter list");

  r = await call(respect, req("POST", {}, { pwaSession: s.user, targetUserId: "tg_1002", action: "withdraw" }));
  assert.strictEqual(r.statusCode, 200, "respect withdraw succeeds");
  assert.strictEqual(r.body.score, 0, "withdraw reverts score");
  assert.strictEqual(r.body.myVote, null, "withdraw clears vote");
}

async function testProfileUserLookup(redis) {
  const users = loadHandler("users");
  const s = sessions();
  redis.h("poker_app:visitor_dt_ids").set("tg_1001", "ID100001");
  redis.h("poker_app:id_to_user").set("ID100001", "tg_1001");
  redis.h("poker_app:visitor_dt_ids").set("tg_1002", "ID100002");
  redis.h("poker_app:id_to_user").set("ID100002", "tg_1002");
  redis.h("poker_app:visitor_usernames").set("tg_1002", "peer");
  redis.h("poker_app:telegram_visible").set("ID100002", "1");
  redis.h("poker_app:visitor_personal").set("ID100002", "public bio");
  redis.h("poker_app:profile_birth_dates").set("ID100002", "1992-04-05");
  redis.h("poker_app:profile_specialties").set("ID100002", "cash");
  redis.h("poker_app:visitor_chat_display_names").set("ID100002", "Peer Display");
  redis.h("poker_app:pokerplus_user_ids").set("ID100002", "P21-1002");
  redis.h("poker_app:pokerplus_stats_visible").set("ID100002", "1");
  redis.h("poker_app:email_originals").set("ID100002", "peer-private@example.test");
  redis.h("poker_app:pokerplus_profiles").set("ID100002", JSON.stringify({
    totalCounter: {
      fee: 100,
      hands: 200,
      winnings: 300,
      bb: 4.5,
      ofcWinnings: 40,
      mttRound: 6,
      mttWinnings: 70,
      mttCount: 8,
      mttItmCount: 3,
      mttFirstCount: 1,
      sngRound: 9,
      sngWinnings: 80,
      sngCount: 10,
      sngItmCount: 4,
      sngFirstCount: 2,
    },
  }));

  let r = await call(users, req("GET", { pwaSession: s.user, dtIdHint: "ID999999" }));
  assert.strictEqual(r.statusCode, 200, "profile self lookup succeeds with ignored hint");
  assert.strictEqual(r.body.dtId, "ID100001", "profile self lookup keeps existing account id");
  assert.strictEqual(redis.h("poker_app:visitor_dt_ids").get("tg_1001"), "ID100001", "profile self lookup does not relink to untrusted hint");

  r = await call(users, req("GET", { pwaSession: s.user, userId: "ID100002" }));
  assert.strictEqual(r.statusCode, 200, "profile user lookup succeeds");
  assert.strictEqual(r.body.userId, "ID100002", "lookup returns dt id");
  assert.strictEqual(r.body.chatUserId, "tg_1002", "lookup resolves chat user id");
  assert.strictEqual(r.body.userName, "@peer", "lookup returns username");
  assert.strictEqual(r.body.p21Id, "P21-1002", "lookup returns PokerPlus id");
  assert.strictEqual(r.body.chatDisplayName, "Peer Display", "lookup returns display name");
  assert.strictEqual(r.body.profileBirthDate, "1992-04-05", "lookup returns immutable birth date");
  assert.strictEqual(r.body.profileSpecialty, "cash", "lookup returns poker specialty");
  assert.strictEqual(Object.prototype.hasOwnProperty.call(r.body, "email"), false, "public player lookup never exposes email");
  assert.strictEqual(r.body.pokerPlusStatsVisible, true, "lookup returns visible PokerPlus stats flag");
  assert.deepStrictEqual(
    r.body.pokerPlusStats,
    {
      fee: 100,
      hands: 200,
      bb: 4.5,
      winnings: 300,
      ofcWinnings: 40,
      mttRound: 6,
      mttWinnings: 70,
      mttCount: 8,
      mttItmCount: 3,
      mttFirstCount: 1,
      sngRound: 9,
      sngWinnings: 80,
      sngCount: 10,
      sngItmCount: 4,
      sngFirstCount: 2,
    },
    "lookup exposes extended public PokerPlus stats",
  );
  r = await call(users, req("GET", { pwaSession: s.admin, username: "pe", suggest: "1" }));
  assert.strictEqual(r.statusCode, 200, "player username suggestions build succeeds");
  assert.ok(r.body.suggestions.some((row) => row.userId === "tg_1002"), "player username suggestions include matching user");
  assert.ok(redis.kv.get("poker_app:visitor_username_search_ready:v1"), "player username suggestions mark prefix index ready");
  r = await call(users, req("GET", { pwaSession: s.admin, username: "pe", suggest: "1" }));
  assert.strictEqual(r.statusCode, 200, "player username suggestions reuse prefix index");
  assert.ok(r.body.suggestions.some((row) => row.userId === "tg_1002"), "indexed player username suggestions remain stable");

  redis.h("poker_app:telegram_visible").delete("ID100002");
  r = await call(users, req("GET", { pwaSession: s.user, userId: "ID100002" }));
  assert.strictEqual(r.statusCode, 200, "player can open hidden public profile");
  assert.strictEqual(r.body.telegramVisible, false, "hidden public profile reports private Telegram state");
  assert.strictEqual(r.body.userName, "TG скрыт", "public profile hides Telegram username from another player");
  r = await call(users, req("GET", { pwaSession: s.admin, userId: "ID100002" }));
  assert.strictEqual(r.statusCode, 200, "admin can open hidden public profile");
  assert.strictEqual(r.body.userName, "@peer", "admin can see hidden Telegram username");

  redis.h("poker_app:visitor_dt_ids").set("tg_661891", "ID661891");
  redis.h("poker_app:id_to_user").set("ID661891", "tg_661891");
  redis.h("poker_app:pokerplus_profiles").set("ID661891", JSON.stringify({
    linked: true,
    pokerPlusUserId: "124128",
    nickname: "Em13",
  }));
  r = await call(users, req("GET", { pwaSession: s.user, ratingNick: "Em13!!" }));
  assert.strictEqual(r.statusCode, 200, "rating nick lookup matches normalized Em13 alias");
  assert.strictEqual(r.body.userId, "ID661891", "rating nick lookup resolves profile-only PokerPlus account");
  assert.strictEqual(r.body.p21Id, "124128", "rating nick lookup uses PokerPlus id from cached profile");
  assert.strictEqual(r.body.pokerPlusVerified, true, "rating nick lookup marks cached PokerPlus profile verified");
  assert.strictEqual(r.body.pokerPlusNickname, "Em13", "rating nick lookup returns cached PokerPlus nickname");
  assert.strictEqual(
    redis.h("poker_app:pokerplus_accounts_by_nickname").get("em13"),
    "ID661891",
    "rating nick lookup backfills reverse nickname index",
  );
  r = await call(users, req("GET", { pwaSession: s.user, ratingNick: "Em13!!" }));
  assert.strictEqual(r.statusCode, 200, "rating nick lookup reuses reverse nickname index");

  redis.h("poker_app:visitor_dt_ids").set("tg_661892", "ID661892");
  redis.h("poker_app:id_to_user").set("ID661892", "tg_661892");
  redis.h("poker_app:pokerplus_profiles").set("ID661892", JSON.stringify({
    linked: true,
    pokerPlusUserId: "124129",
    nickname: "Waaarr",
  }));
  r = await call(users, req("GET", { pwaSession: s.user, ratingNick: "Waaar" }));
  assert.strictEqual(r.statusCode, 200, "rating nick lookup matches shared alias normalizer");
  assert.strictEqual(r.body.userId, "ID661892", "rating nick lookup resolves another aliased PokerPlus nickname");

  r = await call(users, req("POST", {}, { pwaSession: s.user, birthDate: "1990-01-02", specialty: "mtt" }));
  assert.strictEqual(r.statusCode, 200, "profile details save succeeds");
  assert.strictEqual(redis.h("poker_app:profile_birth_dates").get("ID100001"), "1990-01-02", "profile birth date is stored");
  assert.strictEqual(redis.h("poker_app:profile_specialties").get("ID100001"), "mtt", "profile specialty is stored");

  r = await call(users, req("POST", {}, { pwaSession: s.user, birthDate: "1991-01-02" }));
  assert.strictEqual(r.statusCode, 409, "profile birth date cannot be changed");
  assert.strictEqual(redis.h("poker_app:profile_birth_dates").get("ID100001"), "1990-01-02", "profile birth date remains unchanged");

  r = await call(users, req("POST", {}, { pwaSession: s.user, specialty: "cash" }));
  assert.strictEqual(r.statusCode, 200, "profile specialty can be changed");
  assert.strictEqual(redis.h("poker_app:profile_specialties").get("ID100001"), "cash", "profile specialty updates");
}

async function testDailyPokerWinners(redis) {
  const promo = loadHandler("promo");
  const s = sessions();
  const meta = promo._internals.dailyWindow(new Date(), promo._internals.configuredTimeZone());
  const dateKey = (accountId, gameDate) => "poker_app:daily_poker_games_date:" + accountId + ":" + gameDate;
  const previousDate = (gameDate) => {
    const parts = String(gameDate || "").split("-").map((part) => parseInt(part, 10));
    const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2] - 1));
    return [
      String(date.getUTCFullYear()).padStart(4, "0"),
      String(date.getUTCMonth() + 1).padStart(2, "0"),
      String(date.getUTCDate()).padStart(2, "0"),
    ].join("-");
  };
  const shiftDate = (gameDate, days) => {
    const parts = String(gameDate || "").split("-").map((part) => parseInt(part, 10));
    const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2] + days));
    return [
      String(date.getUTCFullYear()).padStart(4, "0"),
      String(date.getUTCMonth() + 1).padStart(2, "0"),
      String(date.getUTCDate()).padStart(2, "0"),
    ].join("-");
  };
  const datesBetween = (startDate, endDate) => {
    const out = [];
    let current = endDate;
    while (current && current >= startDate) {
      out.push(current);
      if (current === startDate) break;
      current = previousDate(current);
    }
    return out;
  };
  const weekStartDate = (gameDate) => {
    const parts = String(gameDate || "").split("-").map((part) => parseInt(part, 10));
    const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
    return shiftDate(gameDate, -((date.getUTCDay() + 6) % 7));
  };
  const currentWeekStart = weekStartDate(meta.gameDate);
  const weekDate = previousDate(meta.gameDate) >= currentWeekStart ? previousDate(meta.gameDate) : meta.gameDate;
  const previousWeekStart = shiftDate(currentWeekStart, -7);
  const previousWeekDate = shiftDate(currentWeekStart, -1);
  const currentMonthStart = meta.gameDate.slice(0, 8) + "01";
  const currentMonthDate = previousDate(meta.gameDate) >= currentMonthStart ? previousDate(meta.gameDate) : meta.gameDate;
  const previousMonthDate = previousDate(currentMonthStart);
  const previousMonthStart = previousMonthDate.slice(0, 8) + "01";
  const weekDateSet = new Set(datesBetween(currentWeekStart, meta.gameDate));
  const previousWeekDateSet = new Set(datesBetween(previousWeekStart, previousWeekDate));
  const monthDateSet = new Set(datesBetween(currentMonthStart, meta.gameDate));
  const previousMonthDateSet = new Set(datesBetween(previousMonthStart, previousMonthDate));
  const publicSpinDates = [
    ["ID100002", meta.gameDate],
    ["ID100003", meta.gameDate],
    ["ID100005", meta.gameDate],
    ["ID100006", meta.gameDate],
    ["ID100007", weekDate],
    ["ID100008", previousWeekDate],
    ["ID100009", previousMonthDate],
    ["ID100010", currentMonthDate],
  ];
  const expectedUniqueForDates = (dateSet) => {
    const ids = new Set();
    publicSpinDates.forEach(([accountId, spinDate]) => {
      if (dateSet.has(spinDate)) ids.add(accountId);
    });
    return ids.size;
  };
  const expectedTotalForDates = (dateSet) =>
    publicSpinDates.reduce((sum, pair) => sum + (dateSet.has(pair[1]) ? 1 : 0), 0) + (dateSet.has(meta.gameDate) ? 1 : 0);
  const expectedSpinStats = {
    totalUniquePlayers: new Set(publicSpinDates.map(([accountId]) => accountId)).size,
    totalSpins: 6,
    todayUniquePlayers: expectedUniqueForDates(new Set([meta.gameDate])),
    todayTotalSpins: expectedTotalForDates(new Set([meta.gameDate])),
    weekUniquePlayers: expectedUniqueForDates(weekDateSet),
    weekTotalSpins: expectedTotalForDates(weekDateSet),
    previousWeekUniquePlayers: expectedUniqueForDates(previousWeekDateSet),
    previousWeekTotalSpins: expectedTotalForDates(previousWeekDateSet),
    monthUniquePlayers: expectedUniqueForDates(monthDateSet),
    monthTotalSpins: expectedTotalForDates(monthDateSet),
    previousMonthUniquePlayers: expectedUniqueForDates(previousMonthDateSet),
    previousMonthTotalSpins: expectedTotalForDates(previousMonthDateSet),
    firstSpinAt: "2026-05-20T08:00:00.000Z",
    firstSpinDate: "2026-05-20",
    handCounts: {
      royal_flush: 0,
      straight_flush: 0,
      four_of_a_kind: 1,
      full_house: 1,
      flush: 2,
      straight: 0,
      three_of_a_kind: 1,
      two_pair: 0,
      pair: 1,
      high_card: 0,
    },
    consolationBonusCount: 0,
    consolationBonusAmount: 0,
  };
  redis.s("poker_app:daily_poker_users").add("ID100002");
  redis.s("poker_app:daily_poker_users").add("ID100003");
  redis.s("poker_app:daily_poker_users").add("ID100004");
  redis.s("poker_app:daily_poker_users").add("ID100005");
  redis.s("poker_app:daily_poker_users").add("ID100006");
  redis.s("poker_app:daily_poker_users").add("ID100007");
  redis.s("poker_app:daily_poker_users").add("ID100008");
  redis.s("poker_app:daily_poker_users").add("ID100009");
  redis.s("poker_app:daily_poker_users").add("ID100010");
  redis.h("poker_app:id_to_user").set("ID100002", "tg_1002");
  redis.h("poker_app:id_to_user").set("ID100003", "tg_1003");
  redis.h("poker_app:id_to_user").set("ID100004", "tg_388008256");
  redis.h("poker_app:id_to_user").set("ID100005", "tg_1005");
  redis.h("poker_app:id_to_user").set("ID100006", "tg_1006");
  redis.h("poker_app:id_to_user").set("ID100007", "tg_1007");
  redis.h("poker_app:id_to_user").set("ID100008", "tg_1008");
  redis.h("poker_app:id_to_user").set("ID100009", "tg_1009");
  redis.h("poker_app:id_to_user").set("ID100010", "tg_1010");
  redis.h("poker_app:visitor_usernames").set("tg_1002", "peer");
  redis.h("poker_app:visitor_usernames").set("tg_1003", "leader");
  redis.h("poker_app:visitor_usernames").set("tg_388008256", "roman1_matvienko");
  redis.h("poker_app:visitor_usernames").set("tg_1005", "attempt_only");
  redis.h("poker_app:visitor_usernames").set("tg_1006", "bonus_only");
  redis.h("poker_app:visitor_usernames").set("tg_1007", "week_spin");
  redis.h("poker_app:visitor_usernames").set("tg_1008", "previous_week_spin");
  redis.h("poker_app:visitor_usernames").set("tg_1009", "previous_month_spin");
  redis.h("poker_app:visitor_usernames").set("tg_1010", "current_month_spin");
  redis.h("poker_app:visitor_chat_display_names").set("ID100002", "Peer Display");
  redis.h("poker_app:visitor_chat_display_names").set("ID100003", "Leader Display");
  redis.h("poker_app:visitor_chat_display_names").set("ID100004", "Admin Display");
  redis.h("poker_app:visitor_chat_display_names").set("ID100005", "Attempt Display");
  redis.h("poker_app:visitor_chat_display_names").set("ID100006", "Bonus Display");
  redis.h("poker_app:visitor_chat_display_names").set("ID100007", "Week Spin Display");
  redis.h("poker_app:visitor_chat_display_names").set("ID100008", "Previous Week Spin Display");
  redis.h("poker_app:visitor_chat_display_names").set("ID100009", "Previous Month Spin Display");
  redis.h("poker_app:visitor_chat_display_names").set("ID100010", "Current Month Spin Display");
  redis.h("poker_app:pokerplus_user_ids").set("ID100002", "P21-PEER");
  redis.h("poker_app:pokerplus_user_ids").set("ID100003", "P21-LEADER");
  redis.h("poker_app:pokerplus_profiles").set("ID100002", JSON.stringify({
    name: "Peer Poker21 Name",
    nickname: "PeerPoker21Nick",
    totalCounter: { fee: 12000 },
  }));
  redis.h("poker_app:pokerplus_profiles").set("ID100003", JSON.stringify({
    name: "Leader Poker21 Name",
    nickname: "LeaderPoker21Nick",
    totalCounter: { fee: 32000 },
  }));
  redis.l("poker_app:daily_poker_games_user:ID100002").push("daily_win_1", "daily_old_win_1", "daily_no_prize_1");
  redis.l("poker_app:daily_poker_games_user:ID100003").push("daily_leader_win_1");
  redis.l("poker_app:daily_poker_games_user:ID100004").push("daily_admin_win_1");
  redis.l("poker_app:daily_poker_games_user:ID100005").push("daily_attempt_win_1");
  redis.l("poker_app:daily_poker_games_user:ID100006").push("daily_bonus_win_1");
  redis.l(dateKey("ID100002", meta.gameDate)).push("daily_win_1", "daily_no_prize_1");
  redis.l(dateKey("ID100003", meta.gameDate)).push("daily_leader_win_1");
  redis.l(dateKey("ID100004", meta.gameDate)).push("daily_admin_win_1");
  redis.l(dateKey("ID100005", meta.gameDate)).push("daily_attempt_win_1");
  redis.l(dateKey("ID100006", meta.gameDate)).push("daily_bonus_win_1");
  redis.l(dateKey("ID100007", weekDate)).push("daily_week_spin_1");
  redis.l(dateKey("ID100008", previousWeekDate)).push("daily_previous_week_spin_1");
  redis.l(dateKey("ID100009", previousMonthDate)).push("daily_previous_month_spin_1");
  redis.l(dateKey("ID100010", currentMonthDate)).push("daily_current_month_spin_1");
  redis.kv.set("poker_app:daily_poker_game:daily_win_1", JSON.stringify({
    id: "daily_win_1",
    user_id: "ID100002",
    game_date: meta.gameDate,
    hand_rank: "full_house",
    hand_name: "Фулл-хаус",
    ticket_balance_credited: 300,
    bonus_credited: 0,
    extra_attempt_granted: false,
    created_at: "2026-05-30T08:00:00.000Z",
  }));
  redis.kv.set("poker_app:daily_poker_game:daily_old_win_1", JSON.stringify({
    id: "daily_old_win_1",
    user_id: "ID100002",
    game_date: "2026-05-20",
    hand_rank: "flush",
    hand_name: "Флеш",
    ticket_balance_credited: 0,
    bonus_credited: 50,
    extra_attempt_granted: true,
    created_at: "2026-05-20T08:00:00.000Z",
  }));
  redis.kv.set("poker_app:daily_poker_game:daily_no_prize_1", JSON.stringify({
    id: "daily_no_prize_1",
    user_id: "ID100002",
    game_date: meta.gameDate,
    hand_rank: "pair",
    hand_name: "Пара",
    ticket_balance_credited: 0,
    bonus_credited: 0,
    extra_attempt_granted: false,
    created_at: "2026-05-30T09:00:00.000Z",
  }));
  redis.kv.set("poker_app:daily_poker_game:daily_leader_win_1", JSON.stringify({
    id: "daily_leader_win_1",
    user_id: "ID100003",
    game_date: meta.gameDate,
    hand_rank: "four_of_a_kind",
    hand_name: "Каре",
    ticket_balance_credited: 500,
    bonus_credited: 0,
    extra_attempt_granted: false,
    created_at: "2026-05-30T10:00:00.000Z",
  }));
  redis.kv.set("poker_app:daily_poker_game:daily_admin_win_1", JSON.stringify({
    id: "daily_admin_win_1",
    user_id: "ID100004",
    game_date: meta.gameDate,
    hand_rank: "royal_flush",
    hand_name: "Роял-флеш",
    ticket_balance_credited: 10000,
    bonus_credited: 0,
    extra_attempt_granted: false,
    created_at: "2026-05-30T11:00:00.000Z",
  }));
  redis.kv.set("poker_app:daily_poker_game:daily_attempt_win_1", JSON.stringify({
    id: "daily_attempt_win_1",
    user_id: "ID100005",
    game_date: meta.gameDate,
    hand_rank: "three_of_a_kind",
    hand_name: "Сет",
    ticket_balance_credited: 0,
    bonus_credited: 0,
    extra_attempt_granted: true,
    created_at: "2026-05-30T12:00:00.000Z",
  }));
  redis.kv.set("poker_app:daily_poker_game:daily_bonus_win_1", JSON.stringify({
    id: "daily_bonus_win_1",
    user_id: "ID100006",
    game_date: meta.gameDate,
    hand_rank: "flush",
    hand_name: "Флеш",
    ticket_balance_credited: 0,
    bonus_credited: 50,
    extra_attempt_granted: true,
    created_at: "2026-05-30T13:00:00.000Z",
  }));

  const r = await call(promo, req("GET", { path: "daily-poker/winners", pwaSession: s.user, limit: "5" }));
  assert.strictEqual(r.statusCode, 200, "daily poker winners succeeds");
  assert.strictEqual(r.body.ok, true, "daily poker winners returns ok");
  assert.strictEqual(r.body.period, "all_time", "daily poker winners returns all-time period");
  assert.strictEqual(r.body.totalWinners, 3, "daily poker winners includes ticket and bonus prizes while excluding admins");
  assert.strictEqual(r.body.totalPrizeRubles, 900, "daily poker winners exposes the complete all-time ticket and bonus total");
  assert.strictEqual(r.body.totalUniquePlayers, expectedSpinStats.totalUniquePlayers, "daily poker winners exposes all-time unique public spinners");
  assert.strictEqual(r.body.todayUniquePlayers, expectedSpinStats.todayUniquePlayers, "daily poker winners exposes unique public spinners today");
  assert.strictEqual(r.body.todayTotalSpins, expectedSpinStats.todayTotalSpins, "daily poker winners exposes public spins total today");
  assert.strictEqual(r.body.weekUniquePlayers, expectedSpinStats.weekUniquePlayers, "daily poker winners exposes unique public spinners this week");
  assert.strictEqual(r.body.weekTotalSpins, expectedSpinStats.weekTotalSpins, "daily poker winners exposes public spins total this week");
  assert.strictEqual(r.body.previousWeekUniquePlayers, expectedSpinStats.previousWeekUniquePlayers, "daily poker winners exposes unique public spinners previous week");
  assert.strictEqual(r.body.previousWeekTotalSpins, expectedSpinStats.previousWeekTotalSpins, "daily poker winners exposes public spins total previous week");
  assert.strictEqual(r.body.monthUniquePlayers, expectedSpinStats.monthUniquePlayers, "daily poker winners exposes unique public spinners this month");
  assert.strictEqual(r.body.monthTotalSpins, expectedSpinStats.monthTotalSpins, "daily poker winners exposes public spins total this month");
  assert.strictEqual(r.body.previousMonthUniquePlayers, expectedSpinStats.previousMonthUniquePlayers, "daily poker winners exposes unique public spinners previous month");
  assert.strictEqual(r.body.previousMonthTotalSpins, expectedSpinStats.previousMonthTotalSpins, "daily poker winners exposes public spins total previous month");
  assert.strictEqual(r.body.firstSpinAt, expectedSpinStats.firstSpinAt, "daily poker winners exposes first public spin timestamp");
  assert.strictEqual(r.body.firstSpinDate, expectedSpinStats.firstSpinDate, "daily poker winners exposes first public spin date");
  assert.deepStrictEqual(r.body.spinStats, expectedSpinStats, "daily poker winners exposes grouped spin stats");
  assert.strictEqual(r.body.winners.length, 3, "daily poker winners returns public ticket and bonus winners");
  assert.strictEqual(r.body.isAdmin, false, "daily poker winners marks regular viewer");
  assert.strictEqual(r.body.winners[0].displayName, "Leader Poker21 Name", "daily poker winners prefers Poker21 name publicly");
  assert.strictEqual(r.body.winners[0].pokerPlusNickname, "LeaderPoker21Nick", "daily poker winners exposes Poker21 nick publicly");
  assert.strictEqual(r.body.winners[0].pokerPlusStatusLevel, 10, "daily poker winners exposes leader fish level");
  assert.strictEqual(r.body.winners[0].telegramUsername, undefined, "daily poker winners hides Telegram username publicly");
  assert.strictEqual(r.body.winners[0].telegramDisplayName, undefined, "daily poker winners hides Telegram display publicly");
  assert.strictEqual(r.body.winners[0].totalPrizeAmount, 500, "daily poker winners exposes leader total");
  assert.strictEqual(r.body.winners[0].prize, "Всего: 500 ₽", "daily poker winners formats total ticket prize");
  assert.strictEqual(r.body.winners[0].spinCount, 1, "daily poker winners exposes leader spin count");
  assert.strictEqual(r.body.winners[1].displayName, "Peer Poker21 Name", "daily poker winners resolves Poker21 display names");
  assert.strictEqual(r.body.winners[1].pokerPlusNickname, "PeerPoker21Nick", "daily poker winners exposes peer Poker21 nick");
  assert.strictEqual(r.body.winners[1].pokerPlusStatusLevel, 5, "daily poker winners exposes peer fish level");
  assert.strictEqual(r.body.winners[1].totalPrizeAmount, 350, "daily poker winners aggregates all-time prizes");
  assert.strictEqual(r.body.winners[1].prize, "Всего: 300 ₽ + 50 бонусов", "daily poker winners formats mixed total prize");
  assert.strictEqual(r.body.winners[1].spinCount, 3, "daily poker winners exposes peer spin count");
  assert.strictEqual(r.body.winners.some((winner) => winner.displayName === "Admin Display"), false, "daily poker winners hides admins");
  assert.strictEqual(r.body.winners.some((winner) => winner.displayName === "Attempt Display"), false, "daily poker winners hides attempt-only prizes");
  assert.strictEqual(r.body.winners.some((winner) => winner.totalPrizeAmount === 50), true, "daily poker winners includes bonus-only prizes");

  const adminWinners = await call(promo, req("GET", { path: "daily-poker/winners", pwaSession: s.admin, limit: "5" }));
  assert.strictEqual(adminWinners.statusCode, 200, "daily poker admin winners succeeds");
  assert.strictEqual(adminWinners.body.isAdmin, true, "daily poker winners marks admin viewer");
  assert.strictEqual(adminWinners.body.winners[0].displayName, "Leader Poker21 Name", "daily poker admin winners keeps Poker21 public name");
  assert.strictEqual(adminWinners.body.winners[0].telegramUsername, "leader", "daily poker admin winners exposes Telegram username");
  assert.strictEqual(adminWinners.body.winners[0].telegramDisplayName, "Leader Display", "daily poker admin winners exposes Telegram display");

  const calculationLedgerRows = [
    { id: "calc_daily_week_1", user_id: "ID100002", amount: 700, direction: "debit", operation_type: "admin_debit", created_at: meta.gameDate + "T12:00:00.000Z" },
    { id: "calc_daily_week_2", user_id: "ID100003", amount: 300, direction: "debit", operation_type: "admin_debit", created_at: weekDate + "T12:00:00.000Z" },
    { id: "calc_daily_prev_month", user_id: "ID100002", amount: 400, direction: "debit", operation_type: "admin_debit", created_at: previousMonthDate + "T12:00:00.000Z" },
  ];
  calculationLedgerRows.forEach((entry) => {
    redis.kv.set("poker_app:bonus_ledger:" + entry.id, JSON.stringify(entry));
    redis.l("poker_app:bonus_ledger_all").push(entry.id);
  });
  redis.kv.set("poker_app:bonus_ledger_version", "calculation-contract-1");
  redis.h("poker_app:bonus_issue_reviews").set("calc_daily_week_1", JSON.stringify({ status: "plus", amount: 120 }));
  redis.h("poker_app:bonus_issue_reviews").set("calc_daily_prev_month", JSON.stringify({ status: "plus", amount: 50 }));

  const weekBalanceSummary = await call(promo, req("GET", {
    path: "daily-poker/winners",
    pwaSession: s.admin,
    summary: "1",
    balanceSummary: "1",
    from: currentWeekStart,
    to: meta.gameDate,
    balanceFrom: currentWeekStart,
    balanceTo: meta.gameDate,
  }));
  assert.strictEqual(weekBalanceSummary.statusCode, 200, "calculation daily-poker week summary succeeds");
  assert.strictEqual(weekBalanceSummary.body.bonusBalanceDebited, 1000, "calculation daily-poker week summary uses ledger debits");
  assert.strictEqual(weekBalanceSummary.body.bonusBalanceReturned, 120, "calculation daily-poker week summary uses verified returns");
  assert.strictEqual(weekBalanceSummary.body.spinStats, undefined, "calculation summary does not scan or return game statistics");

  const monthBalanceSummary = await call(promo, req("GET", {
    path: "daily-poker/winners",
    pwaSession: s.admin,
    summary: "1",
    balanceSummary: "1",
    from: previousMonthStart,
    to: previousMonthDate,
    balanceFrom: previousMonthStart,
    balanceTo: previousMonthDate,
  }));
  assert.strictEqual(monthBalanceSummary.statusCode, 200, "calculation daily-poker month summary succeeds");
  assert.strictEqual(monthBalanceSummary.body.bonusBalanceDebited, 400, "calculation daily-poker month summary uses the selected month only");
  assert.strictEqual(monthBalanceSummary.body.bonusBalanceReturned, 50, "calculation daily-poker month summary keeps month returns separate");
}

async function testPokerPlusKeyBindFallbackMatrix(redis) {
  process.env.POKERPLUS_BASE_URL = "https://pokerplus.test/service_v1";
  process.env.POKERPLUS_MERCHANT_ID = "merchant-contract";
  process.env.POKERPLUS_SECRET_KEY = "secret-contract";
  process.env.POKERPLUS_STORAGE_SECRET = "storage-contract";
  clearProjectRequireCache();

  const attempts = [];
  global.fetch = async function fetchMock(url, opts) {
    const u = String(url || "");
    if (u.includes("mock-redis.local")) {
      const body = opts && opts.body ? JSON.parse(opts.body) : [];
      const payload = u.endsWith("/pipeline") ? redis.pipeline(body) : { result: null };
      return {
        ok: true,
        async json() { return payload; },
        async text() { return JSON.stringify(payload); },
      };
    }
    const form = opts && opts.body && typeof opts.body.entries === "function"
      ? Object.fromEntries(opts.body.entries())
      : {};
    if (u.endsWith("/getToken")) {
      return {
        ok: true,
        async json() { return { status: 1, message: "success", data: { token: "token-contract" }, code: 0 }; },
        async text() { return ""; },
      };
    }
    if (u.endsWith("/getBindMiniAppPlayer")) {
      attempts.push(form);
      if (form.key === "ABC123" && form.user_app_id === "1001" && !form.mail) {
        return {
          ok: true,
          async json() { return { status: 1, message: "success", data: { Id: "P21-42", Nike: "Bound Player" }, code: 0 }; },
          async text() { return ""; },
        };
      }
      return {
        ok: true,
        async json() { return { status: 0, message: "Binding failed", data: {}, code: 0 }; },
        async text() { return ""; },
      };
    }
    throw new Error("Unexpected fetch URL: " + u);
  };

  const { bindMiniAppPlayer, pokerPlusSafeKeyMeta } = require(path.join(root, "lib", "pokerplus"));
  assert.deepStrictEqual(
    pokerPlusSafeKeyMeta("A\u200BB\u0421123"),
    { length: 6, ascii: true, alnum: true },
    "safe key metadata normalizes without exposing the key",
  );
  const profile = await bindMiniAppPlayer("ID100001", ["tg_1001"], "A\u200BB\u0421123", "");
  assert.strictEqual(profile.pokerPlusUserId, "P21-42", "PokerPlus bind succeeds through key + user fallback");
  assert.deepStrictEqual(
    attempts.slice(0, 7).map((payload) => ["ciphertext", "cipherText", "key", "code"].find((field) => payload[field] != null)),
    ["ciphertext", "cipherText", "key", "code", "ciphertext", "cipherText", "key"],
    "bind tries compatible key fields before and during metadata fallback",
  );
  assert.strictEqual(attempts[0].user_app_id, undefined, "first bind attempt omits user_app_id");
  assert.strictEqual(attempts[0].mail, undefined, "first bind attempt omits mail");
  assert.strictEqual(attempts[6].key, "ABC123", "bind removes invisible chars and Cyrillic lookalikes");
  assert.strictEqual(redis.h("poker_app:pokerplus_user_ids").get("ID100001"), "P21-42", "bind stores PokerPlus user id");
  await assert.rejects(
    () => bindMiniAppPlayer("ID100002", ["tg_1001"], "ABC123", ""),
    (error) => error && error.statusCode === 409 && error.code === "POKER21_ALREADY_BOUND",
    "bind rejects the same PokerPlus account on a second internal profile",
  );
  assert.strictEqual(
    redis.h("poker_app:pokerplus_user_ids").has("ID100002"),
    false,
    "rejected duplicate bind is not stored",
  );
}

async function testPokerPlusFastBindWithEmailUsesMail(redis) {
  process.env.POKERPLUS_BASE_URL = "https://pokerplus.test/service_v1";
  process.env.POKERPLUS_MERCHANT_ID = "merchant-contract";
  process.env.POKERPLUS_SECRET_KEY = "secret-contract";
  process.env.POKERPLUS_STORAGE_SECRET = "storage-contract";
  clearProjectRequireCache();

  const attempts = [];
  global.fetch = async function fetchMock(url, opts) {
    const u = String(url || "");
    if (u.includes("mock-redis.local")) {
      const body = opts && opts.body ? JSON.parse(opts.body) : [];
      const payload = u.endsWith("/pipeline") ? redis.pipeline(body) : { result: null };
      return {
        ok: true,
        async json() { return payload; },
        async text() { return JSON.stringify(payload); },
      };
    }
    const form = opts && opts.body && typeof opts.body.entries === "function"
      ? Object.fromEntries(opts.body.entries())
      : {};
    if (u.endsWith("/getToken")) {
      return {
        ok: true,
        async json() { return { status: 1, message: "success", data: { token: "token-contract" }, code: 0 }; },
        async text() { return ""; },
      };
    }
    if (u.endsWith("/getBindMiniAppPlayer")) {
      attempts.push(form);
      if (form.ciphertext === "ABC123" && form.user_app_id === "ID100001" && form.mail === "Player@Test.com") {
        return {
          ok: true,
          async json() { return { status: 1, message: "success", data: { Id: "P21-MAIL", Nike: "Mail Player" }, code: 0 }; },
          async text() { return ""; },
        };
      }
      return {
        ok: true,
        async json() { return { status: 0, message: "Parameter error", data: {}, code: 0 }; },
        async text() { return ""; },
      };
    }
    throw new Error("Unexpected fetch URL: " + u);
  };

  const { bindMiniAppPlayer } = require(path.join(root, "lib", "pokerplus"));
  const profile = await bindMiniAppPlayer("ID100001", [], "ABC123", "Player@Test.com", { fast: true });
  const firstBoundAt = redis.h("poker_app:pokerplus_bound_at").get("ID100001");
  await bindMiniAppPlayer("ID100001", [], "ABC123", "Player@Test.com", { fast: true });
  assert.strictEqual(profile.pokerPlusUserId, "P21-MAIL", "fast-requested bind still uses mail when email is available");
  assert.ok(
    attempts.some((payload) => payload.user_app_id === "ID100001" && payload.mail === "Player@Test.com"),
    "bind retries with dtId and linked email for email-only accounts",
  );
  assert.strictEqual(redis.h("poker_app:pokerplus_emails").get("ID100001"), "Player@Test.com", "successful email bind stores the matched Poker21 mail");
  assert.strictEqual(
    redis.h("poker_app:pokerplus_bound_at").get("ID100001"),
    firstBoundAt,
    "updating an existing Poker21 binding does not rewrite its binding date",
  );
}

async function testPokerPlusKeyBindFailurePrefersBindingFailed(redis) {
  process.env.POKERPLUS_BASE_URL = "https://pokerplus.test/service_v1";
  process.env.POKERPLUS_MERCHANT_ID = "merchant-contract";
  process.env.POKERPLUS_SECRET_KEY = "secret-contract";
  process.env.POKERPLUS_STORAGE_SECRET = "storage-contract";
  clearProjectRequireCache();

  global.fetch = async function fetchMock(url, opts) {
    const u = String(url || "");
    if (u.includes("mock-redis.local")) {
      const body = opts && opts.body ? JSON.parse(opts.body) : [];
      const payload = u.endsWith("/pipeline") ? redis.pipeline(body) : { result: null };
      return {
        ok: true,
        async json() { return payload; },
        async text() { return JSON.stringify(payload); },
      };
    }
    const form = opts && opts.body && typeof opts.body.entries === "function"
      ? Object.fromEntries(opts.body.entries())
      : {};
    if (u.endsWith("/getToken")) {
      return {
        ok: true,
        async json() { return { status: 1, message: "success", data: { token: "token-contract" }, code: 0 }; },
        async text() { return ""; },
      };
    }
    if (u.endsWith("/getBindMiniAppPlayer")) {
      let message = "Parameter error";
      if (form.user_app_id && !form.mail) message = "Binding failed";
      if (form.user_app_id && form.mail) message = "Player data not found";
      return {
        ok: true,
        async json() { return { status: 0, message, data: {}, code: 0 }; },
        async text() { return ""; },
      };
    }
    throw new Error("Unexpected fetch URL: " + u);
  };

  const { bindMiniAppPlayer } = require(path.join(root, "lib", "pokerplus"));
  await assert.rejects(
    () => bindMiniAppPlayer("ID100001", ["tg_1001"], "ABC123", "Player@Test.com"),
    (err) => {
      assert.strictEqual(err.message, "Binding failed", "bind failure keeps the real key rejection");
      assert.ok(err.pokerPlusBindAttempts.length > 20, "bind failure keeps the full safe attempt matrix");
      assert.strictEqual(err.pokerPlusBindAttemptsTotal, err.pokerPlusBindAttempts.length, "attempt total is recorded");
      return true;
    },
  );
}

async function testPokerPlusKeyBindFallsBackToAccountId(redis) {
  process.env.POKERPLUS_BASE_URL = "https://pokerplus.test/service_v1";
  process.env.POKERPLUS_MERCHANT_ID = "merchant-contract";
  process.env.POKERPLUS_SECRET_KEY = "secret-contract";
  process.env.POKERPLUS_STORAGE_SECRET = "storage-contract";
  clearProjectRequireCache();

  const attempts = [];
  global.fetch = async function fetchMock(url, opts) {
    const u = String(url || "");
    if (u.includes("mock-redis.local")) {
      const body = opts && opts.body ? JSON.parse(opts.body) : [];
      const payload = u.endsWith("/pipeline") ? redis.pipeline(body) : { result: null };
      return {
        ok: true,
        async json() { return payload; },
        async text() { return JSON.stringify(payload); },
      };
    }
    const form = opts && opts.body && typeof opts.body.entries === "function"
      ? Object.fromEntries(opts.body.entries())
      : {};
    if (u.endsWith("/getToken")) {
      return {
        ok: true,
        async json() { return { status: 1, message: "success", data: { token: "token-contract" }, code: 0 }; },
        async text() { return ""; },
      };
    }
    if (u.endsWith("/getBindMiniAppPlayer")) {
      attempts.push(form);
      if (form.ciphertext === "ABC123" && form.user_app_id === "ID100001" && !form.mail) {
        return {
          ok: true,
          async json() { return { status: 1, message: "success", data: { Id: "P21-DTID" }, code: 0 }; },
          async text() { return ""; },
        };
      }
      return {
        ok: true,
        async json() { return { status: 0, message: form.user_app_id ? "Binding failed" : "Parameter error", data: {}, code: 0 }; },
        async text() { return ""; },
      };
    }
    throw new Error("Unexpected fetch URL: " + u);
  };

  const { bindMiniAppPlayer } = require(path.join(root, "lib", "pokerplus"));
  const profile = await bindMiniAppPlayer("ID100001", ["tg_1001"], "ABC123", "");
  assert.strictEqual(profile.pokerPlusUserId, "P21-DTID", "bind can fall back to dtId as user_app_id");
  assert.ok(
    attempts.some((payload) => payload.user_app_id === "ID100001" && payload.ciphertext === "ABC123"),
    "bind attempts account id after Telegram candidates",
  );
  assert.strictEqual(redis.h("poker_app:pokerplus_telegram_values").get("ID100001"), "ID100001", "successful dtId user_app_id is saved for refresh");
}

async function testPokerPlusRefreshUsesSavedKey(redis) {
  process.env.POKERPLUS_BASE_URL = "https://pokerplus.test/service_v1";
  process.env.POKERPLUS_MERCHANT_ID = "merchant-contract";
  process.env.POKERPLUS_SECRET_KEY = "secret-contract";
  process.env.POKERPLUS_STORAGE_SECRET = "storage-contract";
  clearProjectRequireCache();

  const attempts = [];
  global.fetch = async function fetchMock(url, opts) {
    const u = String(url || "");
    if (u.includes("mock-redis.local")) {
      const body = opts && opts.body ? JSON.parse(opts.body) : [];
      const payload = u.endsWith("/pipeline") ? redis.pipeline(body) : { result: null };
      return {
        ok: true,
        async json() { return payload; },
        async text() { return JSON.stringify(payload); },
      };
    }
    const form = opts && opts.body && typeof opts.body.entries === "function"
      ? Object.fromEntries(opts.body.entries())
      : {};
    if (u.endsWith("/getToken")) {
      return {
        ok: true,
        async json() { return { status: 1, message: "success", data: { token: "token-contract" }, code: 0 }; },
        async text() { return ""; },
      };
    }
    if (u.endsWith("/getBindMiniAppPlayer")) {
      attempts.push(form);
      if (form.mail && !form.ciphertext && !form.cipherText && !form.key && !form.code) {
        throw new Error("refresh must not use email-only Poker21 lookup");
      }
      if ((form.ciphertext === "ABC123" || form.key === "ABC123") && form.user_app_id === "ID100001" && !form.mail) {
        return {
          ok: true,
          async json() { return { status: 1, message: "success", data: { Id: "P21-REFRESH", Nike: "Key Refresh" }, code: 0 }; },
          async text() { return ""; },
        };
      }
      return {
        ok: true,
        async json() { return { status: 0, message: form.user_app_id ? "Binding failed" : "Parameter error", data: {}, code: 0 }; },
        async text() { return ""; },
      };
    }
    throw new Error("Unexpected fetch URL: " + u);
  };

  const { bindMiniAppPlayer, refreshMiniAppPlayerBySavedKey } = require(path.join(root, "lib", "pokerplus"));
  await bindMiniAppPlayer("ID100001", ["tg_1001"], "ABC123", "Player@Test.com");
  attempts.length = 0;
  const profile = await refreshMiniAppPlayerBySavedKey("ID100001", ["tg_1001"], "Player@Test.com");
  assert.strictEqual(profile.pokerPlusUserId, "P21-REFRESH", "refresh uses the saved key to read Poker21 data");
  assert.ok(attempts.length > 0, "refresh makes Poker21 attempts");
  assert.ok(
    attempts.every((payload) => payload.ciphertext || payload.cipherText || payload.key || payload.code),
    "refresh never performs email-only Poker21 lookup",
  );
  assert.ok(
    attempts.some((payload) => payload.user_app_id === "ID100001" && payload.ciphertext === "ABC123" && !payload.mail),
    "refresh retries saved key with account id and no email",
  );
}

async function testPokerPlusCounterHandsAliases(redis) {
  process.env.POKERPLUS_BASE_URL = "https://pokerplus.test/service_v1";
  process.env.POKERPLUS_MERCHANT_ID = "merchant-contract";
  process.env.POKERPLUS_SECRET_KEY = "secret-contract";
  process.env.POKERPLUS_STORAGE_SECRET = "storage-contract";
  clearProjectRequireCache();

  global.fetch = async function fetchMock(url, opts) {
    const u = String(url || "");
    if (u.includes("mock-redis.local")) {
      const body = opts && opts.body ? JSON.parse(opts.body) : [];
      const payload = u.endsWith("/pipeline") ? redis.pipeline(body) : { result: null };
      return {
        ok: true,
        async json() { return payload; },
        async text() { return JSON.stringify(payload); },
      };
    }
    const form = opts && opts.body && typeof opts.body.entries === "function"
      ? Object.fromEntries(opts.body.entries())
      : {};
    if (u.endsWith("/getToken")) {
      return {
        ok: true,
        async json() { return { status: 1, message: "success", data: { token: "token-contract" }, code: 0 }; },
        async text() { return ""; },
      };
    }
    if (u.endsWith("/getBindMiniAppPlayer")) {
      if (form.ciphertext === "ABC123" && form.user_app_id === "ID100001") {
        return {
          ok: true,
          async json() {
            return {
              status: 1,
              message: "success",
              data: {
                Id: "P21-HANDS",
                today_counter: {
                  fee: 10,
                  hand_count: 77,
                  mtt_count: 2,
                  mtt_itm_count: 1,
                  mtt_1st_count: 0,
                  sng_count: 3,
                  sng_itm_count: 2,
                  sng_1st_count: 1,
                },
                week_counter: {
                  fee: 20,
                  hands_count: 177,
                  mtt_round: 8,
                  sng_round: 9,
                  ofc_winnings: 5,
                },
                total_counter: {
                  fee: 30,
                  played_hands: 277,
                  mtt_round: 576,
                  mtt_winnings: -37756.64,
                  mtt_counted_winnings: 1280,
                  sng_round: 55,
                  sng_winnings: 1018,
                  winnings: 993750.55,
                  bb: 83.97,
                  ofc_winnings: 1804.26,
                  mtt_count: 4,
                  mtt_itm_count: 3,
                  mtt_1st_count: 2,
                  sng_count: 6,
                  sng_itm_count: 5,
                  sng_1st_count: 1,
                },
              },
              code: 0,
            };
          },
          async text() { return ""; },
        };
      }
      return {
        ok: true,
        async json() { return { status: 0, message: form.user_app_id ? "Binding failed" : "Parameter error", data: {}, code: 0 }; },
        async text() { return ""; },
      };
    }
    throw new Error("Unexpected fetch URL: " + u);
  };

  const { bindMiniAppPlayer, readPokerPlusProfile } = require(path.join(root, "lib", "pokerplus"));
  const profile = await bindMiniAppPlayer("ID100001", ["tg_1001"], "ABC123", "");
  assert.strictEqual(profile.todayCounter.hands, 77, "today counter accepts hand_count as hands");
  assert.strictEqual(profile.todayCounter.mttCount, 2, "today counter accepts mtt_count");
  assert.strictEqual(profile.todayCounter.mttItmCount, 1, "today counter accepts mtt_itm_count");
  assert.strictEqual(profile.todayCounter.mttFirstCount, 0, "today counter accepts mtt_1st_count");
  assert.strictEqual(profile.todayCounter.sngCount, 3, "today counter accepts sng_count");
  assert.strictEqual(profile.todayCounter.sngItmCount, 2, "today counter accepts sng_itm_count");
  assert.strictEqual(profile.todayCounter.sngFirstCount, 1, "today counter accepts sng_1st_count");
  assert.strictEqual(profile.weekCounter.hands, 177, "week counter accepts hands_count as hands");
  assert.strictEqual(profile.weekCounter.mttRound, 8, "week counter accepts mtt_round");
  assert.strictEqual(profile.weekCounter.sngRound, 9, "week counter accepts sng_round");
  assert.strictEqual(profile.weekCounter.ofcWinnings, 5, "week counter accepts ofc_winnings");
  assert.strictEqual(profile.totalCounter.hands, 277, "total counter accepts played_hands as hands");
  assert.strictEqual(profile.totalCounter.mttRound, 576, "total counter stores mtt_round");
  assert.strictEqual(profile.totalCounter.mttWinnings, -37756.64, "total counter stores mtt_winnings");
  assert.strictEqual(profile.totalCounter.mttCountedWinnings, 1280, "total counter stores mtt_counted_winnings");
  assert.strictEqual(profile.totalCounter.sngRound, 55, "total counter stores sng_round");
  assert.strictEqual(profile.totalCounter.sngWinnings, 1018, "total counter stores sng_winnings");
  assert.strictEqual(profile.totalCounter.bb, 83.97, "total counter stores bb");
  assert.strictEqual(profile.totalCounter.ofcWinnings, 1804.26, "total counter stores ofc_winnings");
  assert.strictEqual(profile.totalCounter.mttCount, 4, "total counter stores mtt_count");
  assert.strictEqual(profile.totalCounter.mttItmCount, 3, "total counter stores mtt_itm_count");
  assert.strictEqual(profile.totalCounter.mttFirstCount, 2, "total counter stores mtt_1st_count");
  assert.strictEqual(profile.totalCounter.sngCount, 6, "total counter stores sng_count");
  assert.strictEqual(profile.totalCounter.sngItmCount, 5, "total counter stores sng_itm_count");
  assert.strictEqual(profile.totalCounter.sngFirstCount, 1, "total counter stores sng_1st_count");
  assert.ok(profile.statsSnapshots && profile.statsSnapshots.dates.length >= 1, "profile response includes Poker21 snapshot dates");
  const snapshotDate = profile.statsSnapshots.dates[profile.statsSnapshots.dates.length - 1];
  assert.strictEqual(profile.statsSnapshots.dailyCounters[snapshotDate].hands, 77, "snapshot stores today counter for date range filters");
  const cached = await readPokerPlusProfile("ID100001");
  assert.strictEqual(cached.statsSnapshots.dailyCounters[snapshotDate].fee, 10, "cached profile reads Poker21 snapshots");
}

async function testPokerPlusKeyPersistsWithoutStorageSecret(redis) {
  process.env.POKERPLUS_BASE_URL = "https://pokerplus.test/service_v1";
  process.env.POKERPLUS_MERCHANT_ID = "merchant-contract";
  process.env.POKERPLUS_SECRET_KEY = "secret-contract";
  delete process.env.POKERPLUS_STORAGE_SECRET;
  delete process.env.POKERPLUS_CIPHERTEXT_SECRET;
  clearProjectRequireCache();

  global.fetch = async function fetchMock(url, opts) {
    const u = String(url || "");
    if (u.includes("mock-redis.local")) {
      const body = opts && opts.body ? JSON.parse(opts.body) : [];
      const payload = u.endsWith("/pipeline") ? redis.pipeline(body) : { result: null };
      return {
        ok: true,
        async json() { return payload; },
        async text() { return JSON.stringify(payload); },
      };
    }
    const form = opts && opts.body && typeof opts.body.entries === "function"
      ? Object.fromEntries(opts.body.entries())
      : {};
    if (u.endsWith("/getToken")) {
      return {
        ok: true,
        async json() { return { status: 1, message: "success", data: { token: "token-contract" }, code: 0 }; },
        async text() { return ""; },
      };
    }
    if (u.endsWith("/getBindMiniAppPlayer")) {
      if (form.ciphertext === "ABC123" && form.user_app_id === "ID100001") {
        return {
          ok: true,
          async json() { return { status: 1, message: "success", data: { Id: "P21-STORED" }, code: 0 }; },
          async text() { return ""; },
        };
      }
      return {
        ok: true,
        async json() { return { status: 0, message: form.user_app_id ? "Binding failed" : "Parameter error", data: {}, code: 0 }; },
        async text() { return ""; },
      };
    }
    throw new Error("Unexpected fetch URL: " + u);
  };

  const { bindMiniAppPlayer, readPokerPlusCiphertext } = require(path.join(root, "lib", "pokerplus"));
  await bindMiniAppPlayer("ID100001", ["tg_1001"], "ABC123", "");
  assert.strictEqual(await readPokerPlusCiphertext("ID100001"), "ABC123", "saved key survives without a dedicated storage secret");
  assert.ok(
    String(redis.h("poker_app:pokerplus_ciphertexts").get("ID100001") || "").startsWith("enc:v1:"),
    "saved key is still encrypted at rest",
  );
}

async function testPokerPlusClubLeagueDataAndChipLogs(redis) {
  process.env.POKERPLUS_BASE_URL = "https://pokerplus.test/service_v1";
  process.env.POKERPLUS_MERCHANT_ID = "merchant-contract";
  process.env.POKERPLUS_SECRET_KEY = "secret-contract";
  process.env.POKERPLUS_STORAGE_SECRET = "storage-contract";
  clearProjectRequireCache();

  let chipLogPayload = null;
  global.fetch = async function fetchMock(url, opts) {
    const u = String(url || "");
    if (u.includes("mock-redis.local")) {
      const body = opts && opts.body ? JSON.parse(opts.body) : [];
      const payload = u.endsWith("/pipeline") ? redis.pipeline(body) : { result: null };
      return {
        ok: true,
        async json() { return payload; },
        async text() { return JSON.stringify(payload); },
      };
    }
    const form = opts && opts.body && typeof opts.body.entries === "function"
      ? Object.fromEntries(opts.body.entries())
      : {};
    if (u.endsWith("/getToken")) {
      return {
        ok: true,
        async json() { return { status: 1, message: "success", data: { token: "token-contract" }, code: 0 }; },
        async text() { return ""; },
      };
    }
    if (u.endsWith("/getGroupOrLeagueData")) {
      assert.strictEqual(form.token, "token-contract", "club/league data sends token");
      return {
        ok: true,
        async json() {
          return {
            status: 1,
            message: "success",
            data: {
              today: { service_charge: "12.5", round: 3, score: "40", mtt_fee: 4, sng_fee: 5, mtt_score: 6, sng_score: 7 },
              week: { service_charge: 82, round: "9", score: 100, mtt_fee: "10", sng_fee: "11", mtt_score: "12", sng_score: "13" },
            },
            code: 0,
          };
        },
        async text() { return ""; },
      };
    }
    if (u.endsWith("/getPlayerChipsChangeLog")) {
      chipLogPayload = form;
      return {
        ok: true,
        async json() {
          return {
            status: 1,
            message: "success",
            data: {
              list: [
                { userId: "990907", operUserId: "990911", operType: "0", operGold: "-40", groupId: "7526", leagueId: "8944", operTime: "1774315929" },
                { user_id: "990908", oper_user_id: "990912", oper_type: "1", oper_gold: "12.5", group_id: "7527", league_id: "8945", oper_time: "1774315930" },
              ],
              page: "2",
              pageSize: "50",
              totalPage: "13",
              totalCount: "254",
            },
            code: 0,
          };
        },
        async text() { return ""; },
      };
    }
    throw new Error("Unexpected fetch URL: " + u);
  };

  const { getGroupOrLeagueData, getPlayerChipsChangeLog } = require(path.join(root, "lib", "pokerplus"));
  const clubLeagueData = await getGroupOrLeagueData();
  assert.strictEqual(clubLeagueData.today.serviceCharge, 12.5, "club/league today service_charge is normalized");
  assert.strictEqual(clubLeagueData.week.sngScore, 13, "club/league week sng_score is normalized");

  const chipLogs = await getPlayerChipsChangeLog({
    userAppId: "tg_1001",
    mail: "Player@Test.com",
    page: 2,
    pageSize: 50,
  });
  assert.strictEqual(chipLogPayload.user_app_id, "1001", "chip log strips tg_ prefix from user_app_id");
  assert.strictEqual(chipLogPayload.mail, "Player@Test.com", "chip log sends mail");
  assert.strictEqual(chipLogPayload.page, "2", "chip log sends page");
  assert.strictEqual(chipLogPayload.pageSize, "50", "chip log sends pageSize");
  assert.strictEqual(chipLogPayload.token, "token-contract", "chip log sends token");
  assert.strictEqual(chipLogs.totalCount, 254, "chip log total count is normalized");
  assert.strictEqual(chipLogs.list[0].operGold, -40, "chip log operGold is numeric");
  assert.strictEqual(chipLogs.list[0].operTime, 1774315929, "chip log operTime is numeric");
  assert.strictEqual(chipLogs.list[1].operUserId, "990912", "chip log accepts snake_case operator id");
  assert.strictEqual(chipLogs.list[1].operGold, 12.5, "chip log accepts snake_case amount");
}

async function testPokerPlusChipLogsMultiCashierSources(redis) {
  const previousEnv = {
    POKERPLUS_BASE_URL: process.env.POKERPLUS_BASE_URL,
    POKERPLUS_MERCHANT_ID: process.env.POKERPLUS_MERCHANT_ID,
    POKERPLUS_SECRET_KEY: process.env.POKERPLUS_SECRET_KEY,
    POKERPLUS_STORAGE_SECRET: process.env.POKERPLUS_STORAGE_SECRET,
    POKERPLUS_CASH_HISTORY_USER_APP_IDS: process.env.POKERPLUS_CASH_HISTORY_USER_APP_IDS,
    POKERPLUS_CASH_HISTORY_MAILS: process.env.POKERPLUS_CASH_HISTORY_MAILS,
    POKERPLUS_CASH_HISTORY_USER_APP_ID: process.env.POKERPLUS_CASH_HISTORY_USER_APP_ID,
    POKERPLUS_CASH_HISTORY_MAIL: process.env.POKERPLUS_CASH_HISTORY_MAIL,
  };
  process.env.POKERPLUS_BASE_URL = "https://pokerplus.test/service_v1";
  process.env.POKERPLUS_MERCHANT_ID = "merchant-contract";
  process.env.POKERPLUS_SECRET_KEY = "secret-contract";
  process.env.POKERPLUS_STORAGE_SECRET = "storage-contract";
  process.env.POKERPLUS_CASH_HISTORY_USER_APP_IDS = "369073,467511,208238";
  process.env.POKERPLUS_CASH_HISTORY_MAILS = "one@example.test,two@example.test,three@example.test";
  delete process.env.POKERPLUS_CASH_HISTORY_USER_APP_ID;
  delete process.env.POKERPLUS_CASH_HISTORY_MAIL;
  clearProjectRequireCache();

  const chipLogForms = [];
  global.fetch = async function fetchMock(url, opts) {
    const u = String(url || "");
    if (u.includes("mock-redis.local")) {
      const body = opts && opts.body ? JSON.parse(opts.body) : [];
      const payload = u.endsWith("/pipeline") ? redis.pipeline(body) : { result: null };
      return {
        ok: true,
        async json() { return payload; },
        async text() { return JSON.stringify(payload); },
      };
    }
    const form = opts && opts.body && typeof opts.body.entries === "function"
      ? Object.fromEntries(opts.body.entries())
      : {};
    if (u.endsWith("/getToken")) {
      return {
        ok: true,
        async json() { return { status: 1, message: "success", data: { token: "token-contract" }, code: 0 }; },
        async text() { return ""; },
      };
    }
    if (u.endsWith("/getPlayerChipsChangeLog")) {
      chipLogForms.push(form);
      const rowsBySource = {
        "369073": [
          { userId: "player-a", operUserId: "369073", operType: "0", operGold: "10", groupId: "g", leagueId: "l", operTime: "1774315931" },
        ],
        "467511": [
          { userId: "player-b", operUserId: "467511", operType: "0", operGold: "20", groupId: "g", leagueId: "l", operTime: "1774315932" },
        ],
        "208238": [
          { userId: "player-c", operUserId: "208238", operType: "0", operGold: "30", groupId: "g", leagueId: "l", operTime: "1774315933" },
        ],
      };
      return {
        ok: true,
        async json() {
          return {
            status: 1,
            message: "success",
            data: {
              list: rowsBySource[form.user_app_id] || [],
              page: "1",
              pageSize: "200",
              totalPage: "1",
              totalCount: "1",
            },
            code: 0,
          };
        },
        async text() { return ""; },
      };
    }
    throw new Error("Unexpected fetch URL: " + u);
  };

  try {
    const handler = loadHandler("pokerplus-chip-logs");
    const r = await call(handler, req("POST", {}, { pwaSession: sessions().admin, all: true, pageSize: 200 }));
    assert.strictEqual(r.statusCode, 200, "admin chip logs can merge multiple cashier sources");
    assert.deepStrictEqual(
      chipLogForms.map((form) => form.user_app_id).sort(),
      ["208238", "369073", "467511"],
      "multi-source chip log requests all cashier operator ids",
    );
    assert.strictEqual(r.body.chipLogs.sourceCount, 3, "multi-source chip logs report source count");
    assert.deepStrictEqual(
      r.body.chipLogs.list.map((row) => row.operUserId).sort(),
      ["208238", "369073", "467511"],
      "multi-source chip logs include all operators",
    );
  } finally {
    Object.keys(previousEnv).forEach((key) => {
      if (previousEnv[key] == null) delete process.env[key];
      else process.env[key] = previousEnv[key];
    });
    clearProjectRequireCache();
  }
}

async function testPokerPlusChipLogsAdminLinkedMailFallback(redis) {
  const previousEnv = {
    POKERPLUS_BASE_URL: process.env.POKERPLUS_BASE_URL,
    POKERPLUS_MERCHANT_ID: process.env.POKERPLUS_MERCHANT_ID,
    POKERPLUS_SECRET_KEY: process.env.POKERPLUS_SECRET_KEY,
    POKERPLUS_STORAGE_SECRET: process.env.POKERPLUS_STORAGE_SECRET,
    POKERPLUS_CASH_HISTORY_USER_APP_IDS: process.env.POKERPLUS_CASH_HISTORY_USER_APP_IDS,
    POKERPLUS_CASH_HISTORY_MAILS: process.env.POKERPLUS_CASH_HISTORY_MAILS,
    POKERPLUS_CASH_HISTORY_USER_APP_ID: process.env.POKERPLUS_CASH_HISTORY_USER_APP_ID,
    POKERPLUS_CASH_HISTORY_MAIL: process.env.POKERPLUS_CASH_HISTORY_MAIL,
    POKERPLUS_CHIP_LOG_USER_APP_IDS: process.env.POKERPLUS_CHIP_LOG_USER_APP_IDS,
    POKERPLUS_CHIP_LOG_MAILS: process.env.POKERPLUS_CHIP_LOG_MAILS,
    POKERPLUS_CHIP_LOG_USER_APP_ID: process.env.POKERPLUS_CHIP_LOG_USER_APP_ID,
    POKERPLUS_CHIP_LOG_MAIL: process.env.POKERPLUS_CHIP_LOG_MAIL,
    POKERPLUS_CASH_HISTORY_OPERATOR_IDS: process.env.POKERPLUS_CASH_HISTORY_OPERATOR_IDS,
    POKERPLUS_CHIP_LOG_OPERATOR_IDS: process.env.POKERPLUS_CHIP_LOG_OPERATOR_IDS,
  };
  process.env.POKERPLUS_BASE_URL = "https://pokerplus.test/service_v1";
  process.env.POKERPLUS_MERCHANT_ID = "merchant-contract";
  process.env.POKERPLUS_SECRET_KEY = "secret-contract";
  process.env.POKERPLUS_STORAGE_SECRET = "storage-contract";
  process.env.POKERPLUS_CASH_HISTORY_OPERATOR_IDS = "369073,467511,208238";
  delete process.env.POKERPLUS_CASH_HISTORY_USER_APP_IDS;
  delete process.env.POKERPLUS_CASH_HISTORY_MAILS;
  delete process.env.POKERPLUS_CASH_HISTORY_USER_APP_ID;
  delete process.env.POKERPLUS_CASH_HISTORY_MAIL;
  delete process.env.POKERPLUS_CHIP_LOG_USER_APP_IDS;
  delete process.env.POKERPLUS_CHIP_LOG_MAILS;
  delete process.env.POKERPLUS_CHIP_LOG_USER_APP_ID;
  delete process.env.POKERPLUS_CHIP_LOG_MAIL;
  delete process.env.POKERPLUS_CHIP_LOG_OPERATOR_IDS;
  clearProjectRequireCache();

  redis.h("poker_app:pokerplus_user_ids").set("ID000003", "p21-current");
  redis.h("poker_app:pokerplus_emails").set("ID000003", "cashier@example.test");

  const chipLogForms = [];
  global.fetch = async function fetchMock(url, opts) {
    const u = String(url || "");
    if (u.includes("mock-redis.local")) {
      const body = opts && opts.body ? JSON.parse(opts.body) : [];
      const payload = u.endsWith("/pipeline") ? redis.pipeline(body) : { result: null };
      return {
        ok: true,
        async json() { return payload; },
        async text() { return JSON.stringify(payload); },
      };
    }
    const form = opts && opts.body && typeof opts.body.entries === "function"
      ? Object.fromEntries(opts.body.entries())
      : {};
    if (u.endsWith("/getToken")) {
      return {
        ok: true,
        async json() { return { status: 1, message: "success", data: { token: "token-contract" }, code: 0 }; },
        async text() { return ""; },
      };
    }
    if (u.endsWith("/getPlayerChipsChangeLog")) {
      chipLogForms.push(form);
      return {
        ok: true,
        async json() {
          return {
            status: 1,
            message: "success",
            data: {
              list: [{ userId: "player-" + form.user_app_id, operUserId: form.user_app_id, operType: "0", operGold: "10", groupId: "g", leagueId: "l", operTime: "1774315931" }],
              page: "1",
              pageSize: "200",
              totalPage: "1",
              totalCount: "1",
            },
            code: 0,
          };
        },
        async text() { return ""; },
      };
    }
    throw new Error("Unexpected fetch URL: " + u);
  };

  try {
    const { signPwaSession } = require(path.join(root, "lib", "poker-pwa-session"));
    const adminToken = signPwaSession({ id: 0, memberId: "mail_ID000003", username: "roman1787443" }, BOT_TOKEN);
    const handler = loadHandler("pokerplus-chip-logs");
    const r = await call(handler, req("POST", {}, { pwaSession: adminToken, all: true, pageSize: 200 }));
    assert.strictEqual(r.statusCode, 200, "admin chip logs can use linked mail as cashier fallback");
    assert.strictEqual(r.body.source, "cash-history-admin-linked-mail", "cash history uses admin linked mail fallback");
    assert.deepStrictEqual(
      chipLogForms.map((form) => form.user_app_id).sort(),
      ["ID000003"],
      "linked-mail fallback requests only the linked admin source",
    );
    assert.deepStrictEqual(
      [...new Set(chipLogForms.map((form) => form.mail))],
      ["cashier@example.test"],
      "linked-mail fallback reuses the admin linked Poker21 mail",
    );
    assert.deepStrictEqual(
      r.body.chipLogs.list.map((row) => row.operUserId).sort(),
      ["ID000003"],
      "linked-mail fallback does not present cross-operator partial rows as full cashier history",
    );
  } finally {
    Object.keys(previousEnv).forEach((key) => {
      if (previousEnv[key] == null) delete process.env[key];
      else process.env[key] = previousEnv[key];
    });
    clearProjectRequireCache();
  }
}

async function testPokerPlusChipLogsAdminLinkedOperatorMails(redis) {
  const previousEnv = {
    POKERPLUS_BASE_URL: process.env.POKERPLUS_BASE_URL,
    POKERPLUS_MERCHANT_ID: process.env.POKERPLUS_MERCHANT_ID,
    POKERPLUS_SECRET_KEY: process.env.POKERPLUS_SECRET_KEY,
    POKERPLUS_STORAGE_SECRET: process.env.POKERPLUS_STORAGE_SECRET,
    POKERPLUS_CASH_HISTORY_USER_APP_IDS: process.env.POKERPLUS_CASH_HISTORY_USER_APP_IDS,
    POKERPLUS_CASH_HISTORY_MAILS: process.env.POKERPLUS_CASH_HISTORY_MAILS,
    POKERPLUS_CASH_HISTORY_USER_APP_ID: process.env.POKERPLUS_CASH_HISTORY_USER_APP_ID,
    POKERPLUS_CASH_HISTORY_MAIL: process.env.POKERPLUS_CASH_HISTORY_MAIL,
    POKERPLUS_CHIP_LOG_USER_APP_IDS: process.env.POKERPLUS_CHIP_LOG_USER_APP_IDS,
    POKERPLUS_CHIP_LOG_MAILS: process.env.POKERPLUS_CHIP_LOG_MAILS,
    POKERPLUS_CHIP_LOG_USER_APP_ID: process.env.POKERPLUS_CHIP_LOG_USER_APP_ID,
    POKERPLUS_CHIP_LOG_MAIL: process.env.POKERPLUS_CHIP_LOG_MAIL,
    POKERPLUS_CASH_HISTORY_OPERATOR_IDS: process.env.POKERPLUS_CASH_HISTORY_OPERATOR_IDS,
    POKERPLUS_CHIP_LOG_OPERATOR_IDS: process.env.POKERPLUS_CHIP_LOG_OPERATOR_IDS,
  };
  process.env.POKERPLUS_BASE_URL = "https://pokerplus.test/service_v1";
  process.env.POKERPLUS_MERCHANT_ID = "merchant-contract";
  process.env.POKERPLUS_SECRET_KEY = "secret-contract";
  process.env.POKERPLUS_STORAGE_SECRET = "storage-contract";
  process.env.POKERPLUS_CASH_HISTORY_OPERATOR_IDS = "369073,467511,208238";
  delete process.env.POKERPLUS_CASH_HISTORY_USER_APP_IDS;
  delete process.env.POKERPLUS_CASH_HISTORY_MAILS;
  delete process.env.POKERPLUS_CASH_HISTORY_USER_APP_ID;
  delete process.env.POKERPLUS_CASH_HISTORY_MAIL;
  delete process.env.POKERPLUS_CHIP_LOG_USER_APP_IDS;
  delete process.env.POKERPLUS_CHIP_LOG_MAILS;
  delete process.env.POKERPLUS_CHIP_LOG_USER_APP_ID;
  delete process.env.POKERPLUS_CHIP_LOG_MAIL;
  delete process.env.POKERPLUS_CHIP_LOG_OPERATOR_IDS;
  clearProjectRequireCache();

  redis.h("poker_app:pokerplus_user_ids").set("IDOP001", "369073");
  redis.h("poker_app:pokerplus_user_ids").set("IDOP002", "467511");
  redis.h("poker_app:pokerplus_user_ids").set("IDOP003", "208238");
  redis.h("poker_app:pokerplus_telegram_values").set("IDOP001", "2144406710");
  redis.h("poker_app:pokerplus_telegram_values").set("IDOP002", "1897001087");
  redis.h("poker_app:pokerplus_telegram_values").set("IDOP003", "ID400800");
  redis.h("poker_app:pokerplus_emails").set("IDOP001", "one@example.test");
  redis.h("poker_app:pokerplus_emails").set("IDOP003", "three@example.test");
  redis.h("poker_app:email_originals").set("IDOP002", "two@example.test");

  const chipLogForms = [];
  global.fetch = async function fetchMock(url, opts) {
    const u = String(url || "");
    if (u.includes("mock-redis.local")) {
      const body = opts && opts.body ? JSON.parse(opts.body) : [];
      const payload = u.endsWith("/pipeline") ? redis.pipeline(body) : { result: null };
      return {
        ok: true,
        async json() { return payload; },
        async text() { return JSON.stringify(payload); },
      };
    }
    const form = opts && opts.body && typeof opts.body.entries === "function"
      ? Object.fromEntries(opts.body.entries())
      : {};
    if (u.endsWith("/getToken")) {
      return {
        ok: true,
        async json() { return { status: 1, message: "success", data: { token: "token-contract" }, code: 0 }; },
        async text() { return ""; },
      };
    }
    if (u.endsWith("/getPlayerChipsChangeLog")) {
      chipLogForms.push(form);
      const expectedMailByOperator = {
        "369073": "one@example.test",
        "467511": "two@example.test",
        "208238": "three@example.test",
      };
      const okPair = expectedMailByOperator[form.user_app_id] === form.mail;
      return {
        ok: true,
        async json() {
          return {
            status: 1,
            message: "success",
            data: {
              list: okPair
                ? [{ userId: "player-without-208238-" + form.user_app_id, operUserId: form.user_app_id, operType: "0", operGold: "10", groupId: "g", leagueId: "l", operTime: "1774315931" }]
                : [],
              page: "1",
              pageSize: "200",
              totalPage: "1",
              totalCount: okPair ? "1" : "0",
            },
            code: 0,
          };
        },
        async text() { return ""; },
      };
    }
    throw new Error("Unexpected fetch URL: " + u);
  };

  try {
    const handler = loadHandler("pokerplus-chip-logs");
    const r = await call(handler, req("POST", {}, { pwaSession: sessions().admin, all: true, pageSize: 200 }));
    assert.strictEqual(r.statusCode, 200, "admin chip logs can use saved operator mails");
    assert.strictEqual(r.body.source, "cash-history-linked-bindings", "cash history reports linked operator bindings source");
    assert.deepStrictEqual(
      chipLogForms.map((form) => [form.user_app_id, form.mail]).sort(),
      [["208238", "three@example.test"], ["369073", "one@example.test"], ["467511", "two@example.test"], ["ID400800", "three@example.test"]],
      "linked operator sources request exact pairs, app-email fallbacks, and saved dt source variants only",
    );
    assert.deepStrictEqual(
      r.body.chipLogs.list.map((row) => row.operUserId).sort(),
      ["208238", "369073", "467511"],
      "linked operator sources include rows that do not involve the current admin id",
    );
  } finally {
    Object.keys(previousEnv).forEach((key) => {
      if (previousEnv[key] == null) delete process.env[key];
      else process.env[key] = previousEnv[key];
    });
    clearProjectRequireCache();
  }
}

async function testPokerPlusChipLogsBoundPokerPlusIds(redis) {
  const previousEnv = {
    POKERPLUS_BASE_URL: process.env.POKERPLUS_BASE_URL,
    POKERPLUS_MERCHANT_ID: process.env.POKERPLUS_MERCHANT_ID,
    POKERPLUS_SECRET_KEY: process.env.POKERPLUS_SECRET_KEY,
    POKERPLUS_STORAGE_SECRET: process.env.POKERPLUS_STORAGE_SECRET,
    POKERPLUS_CASH_HISTORY_USER_APP_IDS: process.env.POKERPLUS_CASH_HISTORY_USER_APP_IDS,
    POKERPLUS_CASH_HISTORY_MAILS: process.env.POKERPLUS_CASH_HISTORY_MAILS,
    POKERPLUS_CASH_HISTORY_USER_APP_ID: process.env.POKERPLUS_CASH_HISTORY_USER_APP_ID,
    POKERPLUS_CASH_HISTORY_MAIL: process.env.POKERPLUS_CASH_HISTORY_MAIL,
    POKERPLUS_CHIP_LOG_USER_APP_IDS: process.env.POKERPLUS_CHIP_LOG_USER_APP_IDS,
    POKERPLUS_CHIP_LOG_MAILS: process.env.POKERPLUS_CHIP_LOG_MAILS,
    POKERPLUS_CHIP_LOG_USER_APP_ID: process.env.POKERPLUS_CHIP_LOG_USER_APP_ID,
    POKERPLUS_CHIP_LOG_MAIL: process.env.POKERPLUS_CHIP_LOG_MAIL,
    POKERPLUS_CASH_HISTORY_OPERATOR_IDS: process.env.POKERPLUS_CASH_HISTORY_OPERATOR_IDS,
    POKERPLUS_CHIP_LOG_OPERATOR_IDS: process.env.POKERPLUS_CHIP_LOG_OPERATOR_IDS,
  };
  process.env.POKERPLUS_BASE_URL = "https://pokerplus.test/service_v1";
  process.env.POKERPLUS_MERCHANT_ID = "merchant-contract";
  process.env.POKERPLUS_SECRET_KEY = "secret-contract";
  process.env.POKERPLUS_STORAGE_SECRET = "storage-contract";
  process.env.POKERPLUS_CASH_HISTORY_OPERATOR_IDS = "369073,467511,208238";
  delete process.env.POKERPLUS_CASH_HISTORY_USER_APP_IDS;
  delete process.env.POKERPLUS_CASH_HISTORY_MAILS;
  delete process.env.POKERPLUS_CASH_HISTORY_USER_APP_ID;
  delete process.env.POKERPLUS_CASH_HISTORY_MAIL;
  delete process.env.POKERPLUS_CHIP_LOG_USER_APP_IDS;
  delete process.env.POKERPLUS_CHIP_LOG_MAILS;
  delete process.env.POKERPLUS_CHIP_LOG_USER_APP_ID;
  delete process.env.POKERPLUS_CHIP_LOG_MAIL;
  delete process.env.POKERPLUS_CHIP_LOG_OPERATOR_IDS;
  clearProjectRequireCache();

  redis.h("poker_app:pokerplus_user_ids").set("IDOP001", "369073");
  redis.h("poker_app:pokerplus_telegram_values").set("IDOP001", "2144406710");
  redis.h("poker_app:pokerplus_emails").set("IDOP001", "one@example.test");

  const chipLogForms = [];
  global.fetch = async function fetchMock(url, opts) {
    const u = String(url || "");
    if (u.includes("mock-redis.local")) {
      const body = opts && opts.body ? JSON.parse(opts.body) : [];
      const payload = u.endsWith("/pipeline") ? redis.pipeline(body) : { result: null };
      return {
        ok: true,
        async json() { return payload; },
        async text() { return JSON.stringify(payload); },
      };
    }
    const form = opts && opts.body && typeof opts.body.entries === "function"
      ? Object.fromEntries(opts.body.entries())
      : {};
    if (u.endsWith("/getToken")) {
      return {
        ok: true,
        async json() { return { status: 1, message: "success", data: { token: "token-contract" }, code: 0 }; },
        async text() { return ""; },
      };
    }
    if (u.endsWith("/getPlayerChipsChangeLog")) {
      chipLogForms.push(form);
      return {
        ok: true,
        async json() {
          return {
            status: 1,
            message: "success",
            data: {
              list: [{ userId: "player-" + form.user_app_id, operUserId: form.user_app_id, operType: "0", operGold: "10", groupId: "g", leagueId: "l", operTime: "1774315931" }],
              page: "1",
              pageSize: "200",
              totalPage: "1",
              totalCount: "1",
            },
            code: 0,
          };
        },
        async text() { return ""; },
      };
    }
    throw new Error("Unexpected fetch URL: " + u);
  };

  try {
    const handler = loadHandler("pokerplus-chip-logs");
    const r = await call(handler, req("POST", {}, { pwaSession: sessions().admin, all: true, pageSize: 200 }));
    assert.strictEqual(r.statusCode, 200, "admin chip logs can use saved Poker21 user ids as cashier sources");
    assert.strictEqual(r.body.source, "cash-history-linked-bindings", "cash history still reports linked bindings source");
    assert.deepStrictEqual(
      chipLogForms.map((form) => [form.user_app_id, form.mail]).sort(),
      [["369073", "one@example.test"]],
      "linked cashier source uses Poker21 user id without borrowing its mail for other operators",
    );
    assert.deepStrictEqual(
      r.body.chipLogs.list.map((row) => row.operUserId).sort(),
      ["369073"],
      "single linked cashier source does not present cross-operator partial rows as full cashier history",
    );
  } finally {
    Object.keys(previousEnv).forEach((key) => {
      if (previousEnv[key] == null) delete process.env[key];
      else process.env[key] = previousEnv[key];
    });
    clearProjectRequireCache();
  }
}

async function testPokerPlusChipLogsSharedBoundMailAndDtSource(redis) {
  const previousEnv = {
    POKERPLUS_BASE_URL: process.env.POKERPLUS_BASE_URL,
    POKERPLUS_MERCHANT_ID: process.env.POKERPLUS_MERCHANT_ID,
    POKERPLUS_SECRET_KEY: process.env.POKERPLUS_SECRET_KEY,
    POKERPLUS_STORAGE_SECRET: process.env.POKERPLUS_STORAGE_SECRET,
    POKERPLUS_CASH_HISTORY_USER_APP_IDS: process.env.POKERPLUS_CASH_HISTORY_USER_APP_IDS,
    POKERPLUS_CASH_HISTORY_MAILS: process.env.POKERPLUS_CASH_HISTORY_MAILS,
    POKERPLUS_CASH_HISTORY_USER_APP_ID: process.env.POKERPLUS_CASH_HISTORY_USER_APP_ID,
    POKERPLUS_CASH_HISTORY_MAIL: process.env.POKERPLUS_CASH_HISTORY_MAIL,
    POKERPLUS_CHIP_LOG_USER_APP_IDS: process.env.POKERPLUS_CHIP_LOG_USER_APP_IDS,
    POKERPLUS_CHIP_LOG_MAILS: process.env.POKERPLUS_CHIP_LOG_MAILS,
    POKERPLUS_CHIP_LOG_USER_APP_ID: process.env.POKERPLUS_CHIP_LOG_USER_APP_ID,
    POKERPLUS_CHIP_LOG_MAIL: process.env.POKERPLUS_CHIP_LOG_MAIL,
    POKERPLUS_CASH_HISTORY_OPERATOR_IDS: process.env.POKERPLUS_CASH_HISTORY_OPERATOR_IDS,
    POKERPLUS_CHIP_LOG_OPERATOR_IDS: process.env.POKERPLUS_CHIP_LOG_OPERATOR_IDS,
  };
  process.env.POKERPLUS_BASE_URL = "https://pokerplus.test/service_v1";
  process.env.POKERPLUS_MERCHANT_ID = "merchant-contract";
  process.env.POKERPLUS_SECRET_KEY = "secret-contract";
  process.env.POKERPLUS_STORAGE_SECRET = "storage-contract";
  process.env.POKERPLUS_CASH_HISTORY_OPERATOR_IDS = "369073,467511,208238";
  delete process.env.POKERPLUS_CASH_HISTORY_USER_APP_IDS;
  delete process.env.POKERPLUS_CASH_HISTORY_MAILS;
  delete process.env.POKERPLUS_CASH_HISTORY_USER_APP_ID;
  delete process.env.POKERPLUS_CASH_HISTORY_MAIL;
  delete process.env.POKERPLUS_CHIP_LOG_USER_APP_IDS;
  delete process.env.POKERPLUS_CHIP_LOG_MAILS;
  delete process.env.POKERPLUS_CHIP_LOG_USER_APP_ID;
  delete process.env.POKERPLUS_CHIP_LOG_MAIL;
  delete process.env.POKERPLUS_CHIP_LOG_OPERATOR_IDS;
  clearProjectRequireCache();

  redis.h("poker_app:pokerplus_user_ids").set("ID400800", "208238");
  redis.h("poker_app:pokerplus_user_ids").set("ID494359", "208238");
  redis.h("poker_app:pokerplus_telegram_values").set("ID400800", "ID400800");
  redis.h("poker_app:pokerplus_emails").set("ID494359", "roman@example.test");

  const chipLogForms = [];
  global.fetch = async function fetchMock(url, opts) {
    const u = String(url || "");
    if (u.includes("mock-redis.local")) {
      const body = opts && opts.body ? JSON.parse(opts.body) : [];
      const payload = u.endsWith("/pipeline") ? redis.pipeline(body) : { result: null };
      return {
        ok: true,
        async json() { return payload; },
        async text() { return JSON.stringify(payload); },
      };
    }
    const form = opts && opts.body && typeof opts.body.entries === "function"
      ? Object.fromEntries(opts.body.entries())
      : {};
    if (u.endsWith("/getToken")) {
      return {
        ok: true,
        async json() { return { status: 1, message: "success", data: { token: "token-contract" }, code: 0 }; },
        async text() { return ""; },
      };
    }
    if (u.endsWith("/getPlayerChipsChangeLog")) {
      chipLogForms.push(form);
      const works = form.user_app_id === "ID400800" && form.mail === "roman@example.test";
      return {
        ok: true,
        async json() {
          return {
            status: 1,
            message: "success",
            data: {
              list: works
                ? [{ userId: "player-208238", operUserId: "208238", operType: "0", operGold: "10", groupId: "g", leagueId: "l", operTime: "1774315931" }]
                : [],
              page: "1",
              pageSize: "200",
              totalPage: "1",
              totalCount: works ? "1" : "0",
            },
            code: 0,
          };
        },
        async text() { return ""; },
      };
    }
    throw new Error("Unexpected fetch URL: " + u);
  };

  try {
    const handler = loadHandler("pokerplus-chip-logs");
    const r = await call(handler, req("POST", {}, { pwaSession: sessions().admin, all: true, pageSize: 200 }));
    assert.strictEqual(r.statusCode, 200, "admin chip logs can combine mail and saved dt source from the same Poker21 binding");
    assert.strictEqual(r.body.source, "cash-history-linked-bindings", "cash history reports linked bindings source");
    assert.deepStrictEqual(
      chipLogForms.map((form) => [form.user_app_id, form.mail]).sort(),
      [["208238", "roman@example.test"], ["ID400800", "roman@example.test"], ["ID494359", "roman@example.test"]],
      "linked cashier sources try canonical id plus saved dt/account id variants with the grouped mail",
    );
    assert.deepStrictEqual(
      r.body.chipLogs.list.map((row) => row.operUserId),
      ["208238"],
      "shared bound source recovers cashier rows for the operator id",
    );
  } finally {
    Object.keys(previousEnv).forEach((key) => {
      if (previousEnv[key] == null) delete process.env[key];
      else process.env[key] = previousEnv[key];
    });
    clearProjectRequireCache();
  }
}

async function testAuthEmailAndPwaCode(redis) {
  process.env.RESEND_API_KEY = "contract-resend-key";
  process.env.EMAIL_AUTH_FROM = "TWO ACES <login@example.test>";

  const authEmail = loadHandler("auth-email");
  redis.h("poker_app:id_to_user").set("ID123456", "tg_reserved");
  let r = await call(authEmail, req("POST", {}, {
    action: "request",
    email: "Player@Test.com",
    dtIdHint: "ID123456",
  }));
  assert.strictEqual(r.statusCode, 200, "email code request succeeds");
  assert.strictEqual(r.body.sent, true, "email code request marks sent");

  const emailCode = JSON.parse(redis.kv.get("poker_app:email_code:player@test.com"));
  assert.ok(/^ID\d{6}$/.test(emailCode.dtId), "email code creates account id");
  assert.notStrictEqual(emailCode.dtId, "ID123456", "email code ignores untrusted account id hint");
  assert.ok(/^\d{6}$/.test(emailCode.code), "email code is 6 digits");
  const emailDtId = emailCode.dtId;

  r = await call(authEmail, req("POST", {}, {
    action: "verify",
    email: "player@test.com",
    code: emailCode.code,
  }));
  assert.strictEqual(r.statusCode, 200, "email code can be confirmed before password setup");
  assert.strictEqual(r.body.passwordRequired, true, "email verify asks for password setup");

  r = await call(authEmail, req("POST", {}, {
    action: "verify",
    email: "player@test.com",
    code: emailCode.code,
    password: "secret123",
  }));
  assert.strictEqual(r.statusCode, 200, "email verify with password succeeds");
  assert.strictEqual(r.body.dtId, emailDtId, "email verify returns account id");
  assert.ok(r.body.pwaSession, "email verify returns PWA session");
  assert.strictEqual(redis.h("poker_app:email_links").get("player@test.com"), emailDtId, "email verify links email");
  assert.strictEqual(redis.h("poker_app:email_by_dt_id").get(emailDtId), "player@test.com", "email verify stores reverse email index");
  assert.strictEqual(redis.kv.has("poker_app:email_code:player@test.com"), false, "email verify clears code");

  r = await call(authEmail, req("POST", {}, {
    action: "login",
    email: "PLAYER@test.com",
    password: "secret123",
  }));
  assert.strictEqual(r.statusCode, 200, "email password login succeeds");
  assert.strictEqual(r.body.dtId, emailDtId, "email password login returns linked account");
  const emailPwaSession = r.body.pwaSession;

  const authTelegramLogin = loadHandler("auth-telegram-login");
  redis.h("poker_app:visitor_dt_ids").set("tg_2002", "ID222222");
  redis.h("poker_app:id_to_user").set("ID222222", "tg_2002");
  r = await call(authTelegramLogin, req("POST", {}, Object.assign(
    telegramLoginWidgetPayload({
      id: 2002,
      first_name: "Linked",
      last_name: "Player",
      username: "linked_player",
      photo_url: "https://contract.test/player.jpg",
    }),
    {
      dtIdHint: "ID222222",
      linkPwaSession: emailPwaSession,
      existingPwaSession: "local-field-ignored-by-telegram-signature",
    }
  )));
  assert.strictEqual(r.statusCode, 200, "telegram login can link from email pwa session");
  assert.strictEqual(r.body.dtId, emailDtId, "telegram login reuses linked email account id");
  assert.strictEqual(redis.h("poker_app:visitor_dt_ids").get("tg_2002"), emailDtId, "telegram id is linked to email account");
  assert.strictEqual(redis.h("poker_app:id_to_user").get(emailDtId), "tg_2002", "telegram id becomes preferred account login");

  redis.h("poker_app:id_to_user").set("ID654321", "tg_victim");
  r = await call(authTelegramLogin, req("POST", {}, Object.assign(
    telegramLoginWidgetPayload({
      id: 2003,
      first_name: "Hint",
      username: "hint_player",
    }),
    { dtIdHint: "ID654321" }
  )));
  assert.strictEqual(r.statusCode, 200, "telegram login ignores untrusted account hint");
  assert.notStrictEqual(r.body.dtId, "ID654321", "telegram login does not reuse untrusted hint");
  assert.notStrictEqual(redis.h("poker_app:visitor_dt_ids").get("tg_2003"), "ID654321", "telegram id is not linked to untrusted hint");

  const authTelegram = loadHandler("auth-telegram");
  r = await call(authTelegram, req("POST", {}, {
    initData: telegramWebAppInitData({ id: 2004, first_name: "Mini", username: "mini_hint" }),
    dtIdHint: "ID654321",
    wantPwaSession: true,
  }));
  assert.strictEqual(r.statusCode, 200, "mini app auth ignores untrusted account hint");
  assert.notStrictEqual(r.body.dtId, "ID654321", "mini app auth does not reuse untrusted hint");

  redis.h("poker_app:visitor_usernames").set("tg_1001", "player");
  const authPwaCode = loadHandler("auth-pwa-code");
  r = await call(authPwaCode, req("POST", {}, { action: "request", username: "player" }));
  assert.strictEqual(r.statusCode, 200, "telegram PWA code request succeeds");
  assert.strictEqual(r.body.sent, true, "telegram PWA code request marks sent");

  const tgCode = JSON.parse(redis.kv.get("poker_app:pwa_login_code:player"));
  assert.strictEqual(tgCode.userId, "tg_1001", "telegram code binds the username account");
  assert.ok(/^\d{6}$/.test(tgCode.code), "telegram PWA code is 6 digits");

  r = await call(authPwaCode, req("POST", {}, {
    action: "verify",
    username: "player",
    code: tgCode.code,
    password: "secret123",
  }));
  assert.strictEqual(r.statusCode, 200, "telegram PWA verify succeeds");
  assert.ok(r.body.pwaSession, "telegram PWA verify returns session");
  assert.strictEqual(redis.kv.has("poker_app:pwa_login_code:player"), false, "telegram PWA verify clears code");

  r = await call(authPwaCode, req("POST", {}, {
    action: "login",
    username: "player",
    password: "secret123",
  }));
  assert.strictEqual(r.statusCode, 200, "telegram PWA password login succeeds");
  assert.strictEqual(r.body.user.username, "player", "telegram PWA login returns username");

  redis.h("poker_app:id_to_user").set("ID400800", "tg_referrer");
  redis.h("poker_app:visitor_dt_ids").set("tg_referrer", "ID400800");
  redis.h("poker_app:visitor_usernames").set("tg_3001", "late_ref");
  r = await call(authPwaCode, req("POST", {}, { action: "request", username: "late_ref" }));
  assert.strictEqual(r.statusCode, 200, "first telegram PWA code request can create pending technical account");
  const pendingDtId = redis.h("poker_app:visitor_dt_ids").get("tg_3001");
  assert.ok(/^ID\d{6}$/.test(pendingDtId), "pending telegram PWA request creates a dt id");
  r = await call(authPwaCode, req("POST", {}, {
    action: "request",
    username: "late_ref",
    referralStartParam: "home__ref_ID400800",
  }));
  assert.strictEqual(r.statusCode, 200, "second telegram PWA code request with referral succeeds before registration completes");
  const lateRefCode = JSON.parse(redis.kv.get("poker_app:pwa_login_code:late_ref"));
  assert.strictEqual(lateRefCode.referralAllowed, true, "pending technical account still allows referral");
  r = await call(authPwaCode, req("POST", {}, {
    action: "verify",
    username: "late_ref",
    code: lateRefCode.code,
    password: "secret456",
  }));
  assert.strictEqual(r.statusCode, 200, "telegram PWA verify succeeds after pending referral request");
  assert.strictEqual(redis.h("poker_app:referrals:referrer").get(pendingDtId), "ID400800", "pending telegram PWA account records referral after verify");
}

async function testReferralsTrustedDtIdHint(redis) {
  const referrals = loadHandler("referrals");
  const s = sessions();
  redis.h("poker_app:id_to_user").set("ID400800", "tg_1001");
  redis.h("poker_app:id_to_user").set("ID999999", "tg_9999");
  redis.h("poker_app:referrals:referrer").set("ID111111", "ID400800");
  redis.h("poker_app:referrals:referrer").set("ID222222", "ID400800");
  redis.h("poker_app:referrals:referrer").set("ID333333", "ID400800");
  redis.h("poker_app:referrals:referrer").set("ID444444", "ID999999");
  redis.h("poker_app:visitor_usernames").set("tg_1111", "one");
  redis.h("poker_app:id_to_user").set("ID111111", "tg_1111");

  let r = await call(referrals, req("GET", { pwaSession: s.user, dtIdHint: "ID999999" }));
  assert.strictEqual(r.statusCode, 200, "referrals endpoint ignores untrusted dt id hint");
  assert.notStrictEqual(r.body.accountId, "ID999999", "untrusted referrals hint is not used");
  assert.strictEqual(r.body.invited.length, 0, "untrusted referrals hint does not expose another account invites");

  r = await call(referrals, req("GET", { pwaSession: s.user, dtIdHint: "ID400800" }));
  assert.strictEqual(r.statusCode, 200, "referrals endpoint accepts trusted id_to_user dt id hint");
  assert.strictEqual(r.body.accountId, "ID400800", "trusted referrals hint selects the owner account");
  assert.strictEqual(r.body.invited.length, 3, "trusted referrals hint returns own invited players");
  assert.strictEqual(redis.h("poker_app:visitor_dt_ids").get("tg_1001"), "ID400800", "trusted referrals hint repairs reverse dt mapping");
}

async function testFriendsFlow(redis) {
  const friends = loadHandler("friends");
  const s = sessions();
  redis.h("poker_app:visitor_usernames").set("tg_1002", "peer");
  redis.h("poker_app:visitor_dt_ids").set("tg_1001", "ID100001");
  redis.h("poker_app:visitor_dt_ids").set("tg_1002", "ID100002");
  redis.h("poker_app:id_to_user").set("ID100001", "tg_1001");
  redis.h("poker_app:id_to_user").set("ID100002", "tg_1002");
  redis.h("poker_app:pokerplus_user_ids").set("ID100001", "P21-1001");
  redis.h("poker_app:pokerplus_user_ids").set("ID100002", "P21-1002");
  redis.h("poker_app:pokerplus_profiles").set("ID100001", JSON.stringify({ nickname: "Poker21 User", totalCounter: { fee: 12000 } }));
  redis.h("poker_app:pokerplus_profiles").set("ID100002", JSON.stringify({ nickname: "Poker21 Peer", totalCounter: { fee: 12000 } }));

  let r = await call(friends, req("POST", {}, {
    pwaSession: s.user,
    targetUserId: "tg_1002",
    contactName: "  Buddy\u0007  ",
  }));
  assert.strictEqual(r.statusCode, 200, "friend add succeeds");
  assert.strictEqual(r.body.pending, true, "friend add creates outgoing request");

  const myAccountId = redis.h("poker_app:visitor_dt_ids").get("tg_1001");
  const peerAccountId = redis.h("poker_app:visitor_dt_ids").get("tg_1002");
  assert.ok(myAccountId && peerAccountId, "friends flow creates account ids");
  assert.strictEqual(redis.h("poker_app:friend_requests:out:" + myAccountId).has(peerAccountId), true, "friend add stores outgoing request");
  assert.strictEqual(redis.h("poker_app:friend_requests:in:" + peerAccountId).has(myAccountId), true, "friend add stores incoming request");

  r = await call(friends, req("GET", { pwaSession: s.peer, preview: "1" }));
  assert.strictEqual(r.statusCode, 200, "friend preview succeeds");
  assert.strictEqual(r.body.preview, true, "friend preview marks compact response");
  assert.strictEqual(r.body.incomingCount, 1, "friend preview includes incoming request count");

  r = await call(friends, req("POST", {}, { pwaSession: s.user, action: "cancel", targetUserId: peerAccountId }));
  assert.strictEqual(r.statusCode, 200, "friend request cancel succeeds");
  assert.strictEqual(r.body.cancelled, true, "friend request cancel returns state");
  assert.strictEqual(redis.h("poker_app:friend_requests:out:" + myAccountId).has(peerAccountId), false, "cancel removes outgoing request");
  assert.strictEqual(redis.h("poker_app:friend_requests:in:" + peerAccountId).has(myAccountId), false, "cancel removes peer incoming request");

  r = await call(friends, req("POST", {}, { pwaSession: s.user, targetUserId: peerAccountId }));
  assert.strictEqual(r.statusCode, 200, "friend request can be sent again after cancel");
  r = await call(friends, req("POST", {}, { pwaSession: s.peer, action: "reject", targetUserId: myAccountId }));
  assert.strictEqual(r.statusCode, 200, "friend reject succeeds");
  assert.strictEqual(r.body.rejected, true, "friend reject returns state");
  r = await call(friends, req("GET", { pwaSession: s.user }));
  assert.strictEqual(r.statusCode, 200, "friend notices load succeeds");
  assert.strictEqual((r.body.notices || []).some((row) => row && row.userId === peerAccountId && row.status === "rejected"), true, "friend reject creates notice");

  r = await call(friends, req("POST", {}, { pwaSession: s.user, targetUserId: peerAccountId }));
  assert.strictEqual(r.statusCode, 200, "friend request can be sent again after reject");
  r = await call(friends, req("POST", {}, { pwaSession: s.peer, action: "accept", targetUserId: myAccountId }));
  assert.strictEqual(r.statusCode, 200, "friend accept succeeds");
  assert.strictEqual(redis.s("poker_app:friendships:" + myAccountId).has(peerAccountId), true, "friend accept stores normalized account id");
  const friendshipDate = redis.h("poker_app:friendship_dates:" + myAccountId).get(peerAccountId);
  assert.ok(friendshipDate && !Number.isNaN(new Date(friendshipDate).getTime()), "friend accept stores exact friendship date");
  assert.strictEqual(
    redis.h("poker_app:friendship_dates:" + peerAccountId).get(myAccountId),
    friendshipDate,
    "friend accept stores the same friendship date for both players"
  );

  r = await call(friends, req("POST", {}, {
    pwaSession: s.user,
    targetUserId: peerAccountId,
    contactName: "  Buddy\u0007  ",
  }));
  assert.strictEqual(r.statusCode, 200, "friend alias update succeeds");
  assert.strictEqual(r.body.alreadyFriend, true, "friend alias update keeps existing friendship");
  assert.strictEqual(redis.h("poker_app:friend_alias:" + myAccountId).get(peerAccountId), "Buddy", "friend alias is sanitized");
  redis.h("poker_app:visitor_chat_display_names").set(peerAccountId, "Peer Display");
  redis.h("poker_app:pokerplus_user_ids").set(peerAccountId, "P21-1002");
  redis.h("poker_app:pokerplus_profiles").set(peerAccountId, JSON.stringify({ nickname: "Poker21 Buddy", totalCounter: { fee: 12000 } }));

  r = await call(friends, req("GET", { pwaSession: s.user }));
  assert.strictEqual(r.statusCode, 200, "friend list succeeds");
  const peerFriend = (r.body.friends || []).find((row) => row && row.userId === peerAccountId);
  assert.ok(peerFriend, "friend list returns added friend");
  assert.strictEqual(peerFriend.userId, peerAccountId, "friend list exposes account id");
  assert.strictEqual(peerFriend.chatUserId, "tg_1002", "friend list resolves chat id");
  assert.strictEqual(peerFriend.userName, "TG скрыт", "friend list masks hidden telegram username");
  assert.strictEqual(peerFriend.contactName, "Buddy", "friend list returns alias");
  assert.strictEqual(peerFriend.chatDisplayName, "Peer Display", "friend list exposes stored display name");
  assert.strictEqual(peerFriend.pokerPlusNickname, "Poker21 Buddy", "friend list exposes Poker21 nickname");
  assert.strictEqual(peerFriend.friendSince, friendshipDate, "friend list exposes exact friendship date");

  redis.h("poker_app:visitor_dt_ids").set("tg_1003", "ID100003");
  redis.h("poker_app:id_to_user").set("ID100003", "tg_1003");
  redis.h("poker_app:visitor_usernames").set("tg_1003", "legacy_peer");
  redis.s("poker_app:friends:tg_1001").add("tg_1003");
  redis.h("poker_app:friend_alias:tg_1001").set("tg_1003", "Legacy Buddy");

  r = await call(friends, req("GET", { pwaSession: s.user }));
  assert.strictEqual(r.statusCode, 200, "friend list with legacy friends succeeds");
  const legacyFriend = (r.body.friends || []).find((row) => row && row.userId === "ID100003");
  assert.ok(legacyFriend, "friend list migrates legacy friend set");
  assert.strictEqual(legacyFriend.chatUserId, "tg_1003", "legacy friend resolves chat id");
  assert.strictEqual(legacyFriend.contactName, "Legacy Buddy", "legacy friend alias is preserved");
  assert.strictEqual(redis.s("poker_app:friendships:" + myAccountId).has("ID100003"), true, "legacy friend migrates to current friendship set");
  assert.strictEqual(redis.s("poker_app:friendships:ID100003").has(myAccountId), true, "legacy friend migration is reciprocal");
  assert.strictEqual(redis.sets.has("poker_app:friends:tg_1001"), false, "legacy friend set is cleaned after migration");

  r = await call(friends, req("DELETE", {}, { pwaSession: s.user, targetUserId: "tg_1002" }));
  assert.strictEqual(r.statusCode, 200, "friend delete succeeds");
  assert.strictEqual(redis.s("poker_app:friendships:" + myAccountId).has(peerAccountId), false, "friend delete removes member");
  assert.strictEqual(redis.h("poker_app:friend_alias:" + myAccountId).has(peerAccountId), false, "friend delete removes alias");

  redis.h("poker_app:pokerplus_user_ids").delete(myAccountId);
  redis.h("poker_app:pokerplus_profiles").delete(myAccountId);
  r = await call(friends, req("POST", {}, { pwaSession: s.user, targetUserId: peerAccountId }));
  assert.strictEqual(r.statusCode, 403, "friend request requires Poker21 binding and level");
}

async function testChatPushSubscribeAndBroadcast(redis) {
  const webpush = require("web-push");
  const keys = webpush.generateVAPIDKeys();
  process.env.WEBPUSH_VAPID_PUBLIC_KEY = keys.publicKey;
  process.env.WEBPUSH_VAPID_PRIVATE_KEY = keys.privateKey;
  process.env.WEBPUSH_CONTACT_EMAIL = "mailto:contract@example.test";

  const pushSubscribe = loadHandler("chat-push-subscribe");
  const pushAdminBroadcast = loadHandler("chat-push-admin-broadcast");
  const s = sessions();

  let r = await call(pushSubscribe, req("GET"));
  assert.strictEqual(r.statusCode, 200, "chat push public config succeeds");
  assert.strictEqual(r.body.pushConfigured, true, "chat push sees VAPID config");

  r = await call(pushSubscribe, req("POST", {}, { pwaSession: s.user, action: "status" }));
  assert.strictEqual(r.statusCode, 200, "chat push status succeeds");
  assert.strictEqual(r.body.notificationsEnabled, true, "chat push status starts enabled");
  assert.strictEqual(r.body.hasSubscription, false, "chat push status starts without subscription");

  const subscription = {
    endpoint: "https://push.example.test/contract-user-1001",
    expirationTime: null,
    keys: {
      p256dh: "BN-contract-p256dh",
      auth: "contract-auth",
    },
  };
  r = await call(pushSubscribe, req("POST", {}, { pwaSession: s.user, action: "subscribe", subscription }));
  assert.strictEqual(r.statusCode, 200, "chat push subscribe succeeds");
  assert.strictEqual(r.body.subscribed, true, "chat push subscribe returns subscribed");

  const myAccountId = redis.h("poker_app:visitor_dt_ids").get("tg_1001");
  assert.strictEqual(redis.s("poker_app:chat_push_registry").has(myAccountId), true, "chat push registry stores account id");
  assert.strictEqual(redis.h("poker_app:chat_push_sub:" + myAccountId).size, 1, "chat push stores subscription hash");
  redis.h("poker_app:chat_push_subscribed_at").set(myAccountId, "123456789");
  r = await call(pushSubscribe, req("POST", {}, { pwaSession: s.user, action: "subscribe", subscription }));
  assert.strictEqual(r.statusCode, 200, "chat push repeat subscribe succeeds");
  assert.strictEqual(
    redis.h("poker_app:chat_push_subscribed_at").get(myAccountId),
    "123456789",
    "chat push repeat subscribe does not create a new subscription event"
  );

  const webpushRuntime = require("web-push");
  const sentPushes = [];
  const originalSendNotification = webpushRuntime.sendNotification;
  webpushRuntime.sendNotification = async function sendNotificationMock(subscription, payload, opts) {
    sentPushes.push({ subscription, payload: JSON.parse(payload), opts });
    return { statusCode: 201 };
  };
  try {
    const { sendToMemberDevices } = require(path.join(root, "lib", "chat-webpush-notify"));
    let delivered = await sendToMemberDevices(myAccountId, {
      title: "Contract direct",
      body: "Direct body",
      openUrl: "./?startapp=club_chat",
    });
    assert.strictEqual(delivered, 1, "chat push sends to canonical account id subscription");

    redis.h("poker_app:visitor_dt_ids").set("tg_1002", "ID100002");
    redis.h("poker_app:id_to_user").set("ID100002", "tg_1002");
    redis.s("poker_app:chat_push_registry").add("tg_1002");
    redis.h("poker_app:chat_push_sub:tg_1002").set("legacy-endpoint", JSON.stringify({
      endpoint: "https://push.example.test/legacy-user-1002",
      expirationTime: null,
      keys: {
        p256dh: "BN-legacy-p256dh",
        auth: "legacy-auth",
      },
    }));
    delivered = await sendToMemberDevices("ID100002", {
      title: "Contract legacy",
      body: "Legacy body",
      openUrl: "./?startapp=club_chat",
    });
    assert.strictEqual(delivered, 1, "chat push sends to legacy runtime-id subscription from account id");
    assert.strictEqual(redis.s("poker_app:chat_push_registry").has("ID100002"), true, "legacy push send also marks canonical account id");
  } finally {
    webpushRuntime.sendNotification = originalSendNotification;
  }

  r = await call(pushAdminBroadcast, req("GET", { pwaSession: s.admin }));
  assert.strictEqual(r.statusCode, 200, "admin chat push list succeeds");
  assert.strictEqual(r.body.count, 2, "admin chat push list sees active canonical and legacy subscribers");

  r = await call(pushSubscribe, req("POST", {}, { pwaSession: s.user, action: "disable" }));
  assert.strictEqual(r.statusCode, 200, "chat push disable succeeds");
  assert.strictEqual(r.body.notificationsEnabled, false, "chat push disable returns disabled");
  assert.strictEqual(redis.s("poker_app:chat_push_registry").has(myAccountId), false, "chat push disable removes registry member");
  redis.s("poker_app:chat_push_registry").delete("tg_1002");
  redis.s("poker_app:chat_push_registry").delete("ID100002");
  redis.hash.delete("poker_app:chat_push_sub:tg_1002");

  r = await call(pushAdminBroadcast, req("POST", {}, {
    pwaSession: s.admin,
    title: "Contract broadcast",
    text: "Contract body",
    openUrl: "./?startapp=club_chat",
  }));
  assert.strictEqual(r.statusCode, 200, "admin chat push broadcast succeeds with no active recipients");
  assert.strictEqual(r.body.recipients, 0, "admin chat push broadcast skips disabled subscriber");
}

async function testTrackingLinksFlow() {
  const trackingLinks = loadHandler("tracking-links");
  const trackingHit = loadHandler("tracking-link-hit");
  const trackingEvent = loadHandler("tracking-link-event");
  const s = sessions();

  let r = await call(trackingLinks, req("POST", {}, {
    pwaSession: s.admin,
    label: "Contract story",
    params: { utm: "contract", screen: "home" },
  }));
  assert.strictEqual(r.statusCode, 200, "tracking link create succeeds");
  assert.ok(/^[a-f0-9]{8}$/.test(r.body.id), "tracking link create returns slug");
  const slug = r.body.id;

  r = await call(trackingHit, req("POST", {}, {
    ref: "ref_" + slug,
    visitor_id: "visitor#1",
  }));
  assert.strictEqual(r.statusCode, 200, "tracking hit succeeds");
  assert.strictEqual(r.body.recorded, true, "tracking hit is recorded");

  r = await call(trackingEvent, req("POST", {}, {
    ref: "ref_" + slug,
    visitor_id: "visitor#1",
    action: "home:open",
    detail: "hero",
  }));
  assert.strictEqual(r.statusCode, 200, "tracking event succeeds");
  assert.strictEqual(r.body.recorded, true, "tracking event is recorded");

  r = await call(trackingLinks, req("GET", { pwaSession: s.admin }));
  assert.strictEqual(r.statusCode, 200, "tracking links list succeeds");
  assert.strictEqual(r.body.links.length, 1, "tracking links list returns created link");
  assert.strictEqual(r.body.links[0].id, slug, "tracking links list keeps slug");
  assert.strictEqual(r.body.links[0].totalClicks, 1, "tracking links list counts total clicks");
  assert.strictEqual(r.body.links[0].uniqueClicks, 1, "tracking links list counts unique clicks");
  assert.strictEqual(r.body.links[0].actionEvents, 1, "tracking links list counts events");
  assert.strictEqual(r.body.links[0].activeVisitors, 1, "tracking links list counts active visitors");

  r = await call(trackingLinks, req("GET", { pwaSession: s.admin, id: slug, visitors: "1" }));
  assert.strictEqual(r.statusCode, 200, "tracking visitors list succeeds");
  assert.strictEqual(r.body.visitors.length, 1, "tracking visitors list returns hit");
  assert.strictEqual(r.body.visitors[0].visitorId, "visitor_1", "tracking visitors list sanitizes visitor id");
  assert.strictEqual(r.body.visitors[0].activity.total, 1, "tracking visitors list includes activity total");
  assert.strictEqual(r.body.visitors[0].activity.counts["home:open"], 1, "tracking visitors list includes action count");

  r = await call(trackingLinks, req("DELETE", {}, { pwaSession: s.admin, id: slug }));
  assert.strictEqual(r.statusCode, 200, "tracking link delete succeeds");
  assert.strictEqual(r.body.deleted, slug, "tracking link delete returns removed slug");
  r = await call(trackingLinks, req("GET", { pwaSession: s.admin }));
  assert.strictEqual(r.statusCode, 200, "tracking links list succeeds after delete");
  assert.strictEqual(r.body.links.length, 0, "deleted tracking link disappears from list");
  r = await call(trackingHit, req("POST", {}, { ref: "ref_" + slug, visitor_id: "visitor#2" }));
  assert.strictEqual(r.body.recorded, false, "deleted tracking link no longer records clicks");
}

async function testRatingGazetteNotifications(redis) {
  const ratingSubscribe = loadHandler("rating-subscribe");
  const gazetteSubscribe = loadHandler("gazette-subscribe");
  const s = sessions();

  let r = await call(ratingSubscribe, req("POST", {}, { pwaSession: s.user }));
  assert.strictEqual(r.statusCode, 200, "rating subscribe succeeds");
  assert.strictEqual(r.body.subscribed, true, "rating subscribe returns subscribed");
  assert.strictEqual(redis.s("poker_app:rating_subscribers").has("1001"), true, "rating subscribe stores Telegram chat id");
  const firstBotSubscribedAt = redis.h("poker_app:bot_subscribed_at").get("1001");

  const ratingNotify = loadHandler("rating-notify");
  r = await call(ratingNotify, req("POST", {}, {
    ratingId: "contract-rating-1",
    message: "Contract rating updated",
  }, { "x-cron-secret": "contract-cron-secret" }));
  assert.strictEqual(r.statusCode, 200, "rating notify succeeds");
  assert.strictEqual(r.body.sent, 1, "rating notify sends to subscriber");
  assert.strictEqual(r.body.total, 1, "rating notify counts subscribers");
  assert.strictEqual(redis.s("poker_app:rating_notified_ids").has("contract-rating-1"), true, "rating notify stores idempotency key");

  r = await call(ratingNotify, req("POST", {}, {
    ratingId: "contract-rating-1",
    message: "Contract rating updated again",
  }, { "x-cron-secret": "contract-cron-secret" }));
  assert.strictEqual(r.statusCode, 200, "rating notify duplicate succeeds");
  assert.strictEqual(r.body.alreadySent, true, "rating notify duplicate is idempotent");

  r = await call(gazetteSubscribe, req("POST", {}, { pwaSession: s.user }));
  assert.strictEqual(r.statusCode, 200, "gazette subscribe succeeds");
  assert.strictEqual(r.body.subscribed, true, "gazette subscribe returns subscribed");
  assert.strictEqual(redis.s("poker_app:gazette_subscribers").has("1001"), true, "gazette subscribe stores Telegram chat id");
  assert.strictEqual(
    redis.h("poker_app:bot_subscribed_at").get("1001"),
    firstBotSubscribedAt,
    "enabling another notification type does not rewrite the bot subscription date",
  );

  const gazetteNotify = loadHandler("gazette-notify");
  r = await call(gazetteNotify, req("POST", {}, {
    newsId: "contract-news-1",
    message: "Contract gazette updated",
    headline: "Contract headline",
    postToChat: true,
    articleIndex: 0,
  }, { "x-cron-secret": "contract-cron-secret" }));
  assert.strictEqual(r.statusCode, 200, "gazette notify succeeds");
  assert.strictEqual(r.body.sent, 1, "gazette notify sends to subscriber");
  assert.strictEqual(r.body.total, 1, "gazette notify counts subscribers");
  assert.strictEqual(r.body.chatPosted, true, "gazette notify can post to chat");
  assert.strictEqual(redis.s("poker_app:gazette_notified_ids").has("contract-news-1"), true, "gazette notify stores idempotency key");
  assert.ok(redis.l("poker_app:chat_messages").some((line) => String(line).includes("Contract headline")), "gazette notify writes chat message");

  r = await call(gazetteNotify, req("POST", {}, {
    newsId: "contract-news-1",
    message: "Contract gazette updated again",
  }, { "x-cron-secret": "contract-cron-secret" }));
  assert.strictEqual(r.statusCode, 200, "gazette notify duplicate succeeds");
  assert.strictEqual(r.body.alreadySent, true, "gazette notify duplicate is idempotent");

  r = await call(ratingSubscribe, req("POST", {}, { pwaSession: s.user, unsubscribe: true }));
  assert.strictEqual(r.statusCode, 200, "rating unsubscribe succeeds");
  assert.strictEqual(
    redis.h("poker_app:bot_unsubscribed_at").has("1001"),
    false,
    "disabling one notification type does not record a bot unsubscribe while another remains",
  );

  r = await call(gazetteSubscribe, req("POST", {}, { pwaSession: s.user, unsubscribe: true }));
  assert.strictEqual(r.statusCode, 200, "gazette unsubscribe succeeds");
  assert.strictEqual(
    redis.h("poker_app:bot_unsubscribed_at").has("1001"),
    true,
    "disabling the last notification type records a real bot unsubscribe",
  );
}

async function testChatCoreInvariants() {
  const core = require(path.join(root, "lib", "chat-core.js"));
  const storage = require(path.join(root, "lib", "chat-storage.js"));
  const access = require(path.join(root, "lib", "chat-access.js"));
  const groups = require(path.join(root, "lib", "chat-groups.js"));
  const groupMembers = require(path.join(root, "lib", "chat-group-members.js"));
  const messageEnrichment = require(path.join(root, "lib", "chat-message-enrichment.js"));
  const pagination = require(path.join(root, "lib", "chat-pagination.js"));
  const threadStore = require(path.join(root, "lib", "chat-thread-store.js"));
  const unread = require(path.join(root, "lib", "chat-unread.js"));
  const notifications = require(path.join(root, "lib", "chat-notifications.js"));
  const raffleNotifications = require(path.join(root, "lib", "raffle-notifications.js"));

  assert.strictEqual(core.isGroupChatId("group_abcdefgh"), true, "valid group id is accepted");
  assert.strictEqual(core.isGroupChatId("group_short"), false, "short group id is rejected");
  assert.strictEqual(core.normalizePeerChatUserId("1001"), "tg_1001", "numeric peer becomes tg id");
  assert.strictEqual(core.normalizePeerChatUserId("tg_1001"), "tg_1001", "tg peer stays stable");
  assert.strictEqual(core.normalizePeerChatUserId("vk_99"), "vk_99", "vk peer stays stable");
  assert.strictEqual(core.normalizePeerChatUserId("tg_roman"), "tg_388008256", "roman alias is normalized");
  assert.strictEqual(core.normalizeStoredMessageFromId("1001"), "tg_1001", "legacy message sender becomes tg id");
  assert.strictEqual(core.normalizeStoredMessageFromId("guest_1"), "guest_1", "guest sender stays stable");
  assert.strictEqual(core.convKey("tg_2", "tg_10"), "poker_app:chat:10_2", "conversation key preserves old lexical order");
  assert.strictEqual(
    core.chatMessageIsNewerThanLastViewed("2026-01-01T00:00:01.000Z", "2026-01-01T00:00:00Z"),
    true,
    "newer message beats cursor",
  );
  assert.strictEqual(
    core.mergeReadCursors("2026-01-01T00:00:00Z", "2026-01-01T00:00:01.000Z"),
    "2026-01-01T00:00:01.000Z",
    "newer cursor wins",
  );
  assert.strictEqual(storage.groupMetaKey("group_abcdefgh"), "poker_app:chat_group_meta:group_abcdefgh", "group meta key is stable");
  assert.strictEqual(storage.groupMsgsKey("group_abcdefgh"), "poker_app:chat_group_msgs:group_abcdefgh", "group message key is stable");
  assert.strictEqual(storage.userChatGroupsKey("tg_1001"), "poker_app:user_chat_groups:tg_1001", "user group index key is stable");
  assert.strictEqual(
    storage.threadMetaKeyByStorageKey("poker_app:chat:1_2"),
    "poker_app:chat_thread_meta:poker_app:chat:1_2",
    "thread meta key is stable",
  );
  assert.strictEqual(
    storage.buildThreadPreviewText({ fromName: "Player", text: "hello     world" }),
    "Player: hello world",
    "thread preview compacts text",
  );
  assert.strictEqual(access.CLUB_CHAT_PENDING_KEY, "poker_app:club_chat_pending", "club pending key is stable");
  const pendingCountCommands = [];
  const previousClubChatRequireApplication = process.env.CLUB_CHAT_REQUIRE_APPLICATION;
  process.env.CLUB_CHAT_REQUIRE_APPLICATION = "1";
  let pendingReviewCount = 0;
  try {
    pendingReviewCount = await access.getClubChatPendingCount(async (commands) => {
      pendingCountCommands.push(...commands);
      return [{ result: ["tg_1001", "vk_2002", "mail_pending_3", "", "tg_1001"] }];
    });
  } finally {
    process.env.CLUB_CHAT_REQUIRE_APPLICATION = previousClubChatRequireApplication;
  }
  assert.deepStrictEqual(
    pendingCountCommands,
    [["SMEMBERS", "poker_app:club_chat_pending"]],
    "club pending count reads ids for filtering",
  );
  assert.strictEqual(pendingReviewCount, 2, "club pending badge ignores non-actionable ids");
  assert.strictEqual(unread.unreadHashKey("tg_1001"), "poker_app:chat_unread:tg_1001", "unread hash key is stable");
  assert.strictEqual(
    notifications.buildClubChatMiniAppLink("https://t.me/Poker_dvatuza_bot/DvaTuza)"),
    "https://t.me/Poker_dvatuza_bot/DvaTuza?startapp=club_chat",
    "club chat mini app link trims legacy closing paren",
  );
  assert.strictEqual(raffleNotifications.isHourInShift(1, 18, 2), true, "overnight admin shift includes late hour");
  assert.strictEqual(raffleNotifications.isHourInShift(2, 18, 2), false, "overnight admin shift ends on boundary");
  assert.strictEqual(
    raffleNotifications.resolveWorkingRaffleAdmin(new Date("2026-06-02T04:00:00.000Z")).userId,
    "tg_2144406710",
    "raffle winner admin resolves Anna during day shift",
  );
  assert.strictEqual(
    raffleNotifications.resolveWorkingRaffleAdmin(new Date("2026-06-02T16:30:00.000Z")).userId,
    "tg_1897001087",
    "raffle winner admin resolves Vika during evening shift",
  );
  assert.strictEqual(
    raffleNotifications.buildRaffleWinnerAdminChatLink("https://t.me/Poker_dvatuza_bot/DvaTuza)", "tg_1897001087"),
    "https://t.me/Poker_dvatuza_bot/DvaTuza?startapp=club_chat_dm_tg_1897001087",
    "raffle winner admin link keeps peer id inside Telegram startapp",
  );
  assert.strictEqual(
    raffleNotifications.buildRaffleWinnerAdminChatLink("https://poker-app-ebon.vercel.app/", "1897001087"),
    "https://poker-app-ebon.vercel.app?startapp=club_chat_dm&with=tg_1897001087",
    "raffle winner admin link keeps browser/PWA with param",
  );
  const unreadCommands = [];
  const redisPipeline = async (commands) => {
    unreadCommands.push(...commands);
    return commands.map(() => ({ result: 1 }));
  };
  await unread.incrementThreadUnreadForRecipients(redisPipeline, ["tg_2", "tg_2", "tg_3"], "tg_1");
  assert.deepStrictEqual(
    unreadCommands,
    [
      ["HINCRBY", "poker_app:chat_unread:tg_2", "tg_1", 1],
      ["HINCRBY", "poker_app:chat_unread:tg_3", "tg_1", 1],
    ],
    "thread unread increments unique recipients",
  );
  assert.strictEqual(groups.sanitizeGroupTitle("  Team\u0007 Alpha  "), "Team Alpha", "group title strips control chars");
  assert.strictEqual(groups.sanitizeGroupDescription("x".repeat(2500)).length, 2000, "group description is capped");
  assert.strictEqual(groups.sanitizeGroupAvatarInput("https://example.com/a.png"), null, "group avatar only accepts data images");
  assert.strictEqual(groups.groupMetaHasMember({ members: ["1001"] }, "tg_1001"), true, "group membership normalizes legacy ids");
  assert.strictEqual(groups.readGroupMetaOnlyFlag({ query: { metaOnly: "1" } }), true, "group meta flag is recognized");
  assert.strictEqual(groups.readContactsMetaOnlyFlag({ query: { contactsmetaonly: "1" } }), true, "contacts meta flag is recognized");
  const messages = [{ from: "1001", replyTo: { from: "tg_1002" } }];
  assert.deepStrictEqual(messageEnrichment.collectMessageFromIdsForAlias(messages), ["1001", "tg_1002"], "message ids include replies");
  messageEnrichment.applyPeerChatDisplayNamesToMessages(messages, { tg_1001: "One", tg_1002: "Two" });
  assert.strictEqual(messages[0].fromName, "One", "display name applies to sender");
  assert.strictEqual(messages[0].replyTo.fromName, "Two", "display name applies to reply sender");
  messageEnrichment.applyViewerFriendAliasesToMessages(messages, { tg_1001: "Alias One" });
  assert.strictEqual(messages[0].fromName, "Alias One", "friend alias overrides display name");
  const pageMessages = [
    { id: "1", time: "2026-01-01T00:00:00.000Z" },
    { id: "2", time: "2026-01-01T00:00:01.000Z" },
    { id: "3", time: "2026-01-01T00:00:02.000Z" },
  ];
  assert.deepStrictEqual(pagination.filterMessagesAfterCursor(pageMessages, "1").map((m) => m.id), ["2", "3"], "after id cursor slices newer messages");
  assert.deepStrictEqual(
    pagination.sliceMessagesBeforeCursor(pageMessages, "3", "", 1),
    { messages: [{ id: "2", time: "2026-01-01T00:00:01.000Z" }], hasMoreBefore: true },
    "before cursor returns bounded previous page",
  );
  const memberRows = await groupMembers.buildGroupMembersPublicList({
    chatLastSeenHash: "seen",
    chatLastSeenIsoFromRedisRaw: (raw) => raw ? new Date(Number(raw)).toISOString() : null,
    chatOnlineKey: "online",
    creatorId: "tg_1002",
    friendAliasKeyPrefix: "alias:",
    getAvatars: async () => ({ tg_1001: "avatar" }),
    getChatDisplayNameMapForIds: async () => ({ tg_1001: "Display One" }),
    getDtIds: async () => ({ tg_1001: "ID100001" }),
    getP21Ids: async () => ({ tg_1001: "P21-1" }),
    getPokerPlusVerifiedIds: async () => ({ tg_1001: true }),
    isAdmin: (id) => id === "tg_1002",
    memberIds: ["tg_1001", "tg_1001", "tg_1002"],
    minScore: 10,
    myId: "tg_1001",
    normalizeLegacyAccountDisplayLabel: (value) => String(value || "").replace(/^tg_/, ""),
    redisPipeline: async (commands) => {
      const cmd = commands[0] || [];
      if (cmd[0] === "HMGET" && cmd[1] === "seen") return [{ result: ["0", "1000"] }];
      if (cmd[0] === "HMGET" && cmd[1] === "alias:tg_1001") return [{ result: ["Alias One", null] }];
      if (cmd[0] === "HMGET") return [{ result: ["one", "two"] }];
      return commands.map((c) => ({ result: c[2] === "tg_1001" ? "11" : "0" }));
    },
    sanitizeFriendContactNameForChat: (value) => String(value || "").trim(),
    usernamesKey: "usernames",
  });
  assert.strictEqual(memberRows.length, 2, "group member rows are de-duplicated");
  assert.strictEqual(memberRows[0].name, "Alias One", "member alias wins");
  assert.strictEqual(memberRows[0].online, true, "member online score is applied");
  assert.strictEqual(memberRows[1].isGroupCreator, true, "group creator is marked");
  const storeCommands = [];
  const storeRedis = async (commands) => {
    storeCommands.push(...commands);
    if (commands[0] && commands[0][0] === "HGET") return [{ result: JSON.stringify({ id: "m1", text: "hi" }) }];
    if (commands[0] && commands[0][0] === "LPOS") return [{ result: 0 }];
    return commands.map(() => ({ result: 1 }));
  };
  await threadStore.writeThreadMeta(storeRedis, "thread", { id: "m1", time: "2026-01-01T00:00:00Z", fromName: "A", text: "hello" });
  assert.deepStrictEqual(
    storeCommands.slice(0, 3),
    [
      ["HSET", "poker_app:chat_thread_meta:thread", "lastMessageTime", "2026-01-01T00:00:00Z"],
      ["HSET", "poker_app:chat_thread_meta:thread", "lastMessageId", "m1"],
      ["HSET", "poker_app:chat_thread_meta:thread", "lastMessagePreview", "A: hello"],
    ],
    "thread meta writes stable fields",
  );
  const located = await threadStore.locateThreadMessageById(storeRedis, "thread", "m1");
  assert.strictEqual(located.found, true, "thread locate finds indexed message");
  assert.strictEqual(located.fromIndex, true, "thread locate uses index when present");
}

async function testGuestbookAdminDelete(redis) {
  const guestbook = loadHandler("club-guestbook");
  const feedback = loadHandler("profile-event-feedback");
  const s = sessions();
  const postsKey = "poker_app:club_guestbook:v1";
  const postId = "contract-review-delete";
  const eventId = "club-guestbook:" + postId;
  const eventHash = crypto.createHash("sha256").update(eventId).digest("hex").slice(0, 32);
  const commentsKey = "poker_app:profile_event_comments:" + eventHash;
  const reactionsKey = "poker_app:profile_event_reactions:" + eventHash;
  const viewsKey = "poker_app:profile_event_views:" + eventHash;
  const commentId = "contract-comment-delete";
  const commentReactionsKey = "poker_app:profile_comment_reactions:" +
    crypto.createHash("sha256").update(eventId + ":" + commentId).digest("hex").slice(0, 32);
  const post = {
    id: postId,
    type: "review",
    text: "Contract review",
    authorId: "ID999999",
    authorName: "Player",
    createdAt: new Date().toISOString(),
  };
  const comment = JSON.stringify({
    id: commentId,
    memberId: "ID888888",
    author: "Another player",
    text: "Contract comment",
    at: new Date().toISOString(),
  });

  redis.kv.set(postsKey, JSON.stringify([post]));
  redis.l(commentsKey).push(comment);
  redis.h(reactionsKey).set("ID777777", "👍");
  redis.h(viewsKey).set("ID777777", new Date().toISOString());
  redis.h(commentReactionsKey).set("ID777777", "❤️");
  redis.h("poker_app:id_to_user").set("ID888888", "1002");
  redis.h("poker_app:pokerplus_profiles").set("ID888888", JSON.stringify({ nickname: "Comment Player", totalCounter: { fee: 12000 } }));
  redis.h("poker_app:pokerplus_user_ids").set("ID888888", "415678");
  redis.h("poker_app:visitor_dt_ids").set("tg_1001", "ID100001");
  redis.h("poker_app:id_to_user").set("ID100001", "tg_1001");
  redis.h("poker_app:pokerplus_user_ids").set("ID100001", "4430");

  let r = await call(feedback, req("POST", {}, {
    pwaSession: s.user,
    action: "list",
    eventIds: [eventId],
    scope: "club",
  }));
  const enrichedComment = r.body.feedback[eventId].comments[0];
  assert.strictEqual(enrichedComment.authorProfileId, "1002", "guestbook comment exposes a clickable profile id");
  assert.strictEqual(enrichedComment.author, "Comment Player", "guestbook comment uses the Poker21 nickname");
  assert.strictEqual(enrichedComment.authorPoker21Id, "415678", "guestbook comment exposes the Poker21 id");
  assert.ok(enrichedComment.authorLevel > 0, "guestbook comment exposes the calculated level");
  assert.strictEqual(enrichedComment.authorVerified, true, "guestbook comment marks a linked Poker21 profile");

  r = await call(guestbook, req("POST", {}, { pwaSession: s.user, action: "list" }));
  assert.strictEqual(r.body.canPost, true, "linked user is eligible for the profile review invite");
  assert.strictEqual(r.body.hasReview, false, "linked user without a review is reported for the profile invite");
  redis.kv.set(postsKey, JSON.stringify([Object.assign({}, post, { authorId: "ID100001" })]));
  r = await call(guestbook, req("POST", {}, { pwaSession: s.user, action: "list" }));
  assert.strictEqual(r.body.hasReview, true, "own review hides the profile invite");
  redis.kv.set(postsKey, JSON.stringify([post]));

  r = await call(guestbook, req("POST", {}, { pwaSession: s.user, action: "delete", postId }));
  assert.strictEqual(r.statusCode, 403, "guestbook post delete is admin-only");
  assert.strictEqual(JSON.parse(redis.kv.get(postsKey)).length, 1, "failed post delete keeps the post");

  r = await call(feedback, req("POST", {}, {
    pwaSession: s.user,
    action: "delete-comment",
    eventId,
    commentId,
  }));
  assert.strictEqual(r.statusCode, 403, "ordinary user cannot delete another player's guestbook comment");
  assert.strictEqual(redis.l(commentsKey).length, 1, "failed comment delete keeps the comment");

  r = await call(feedback, req("POST", {}, {
    pwaSession: s.admin,
    action: "delete-comment",
    eventId,
    commentId,
  }));
  assert.strictEqual(r.statusCode, 200, "admin can delete another player's guestbook comment");
  assert.strictEqual(redis.l(commentsKey).length, 0, "admin comment delete removes the comment");
  assert.strictEqual(redis.hash.has(commentReactionsKey), false, "admin comment delete removes its reactions");

  redis.l(commentsKey).push(comment);
  redis.h(commentReactionsKey).set("ID777777", "❤️");
  r = await call(guestbook, req("POST", {}, { pwaSession: s.admin, action: "delete", postId }));
  assert.strictEqual(r.statusCode, 200, "admin can delete a guestbook post");
  assert.strictEqual(JSON.parse(redis.kv.get(postsKey)).length, 0, "admin post delete removes the post");
  assert.strictEqual(redis.lists.has(commentsKey), false, "admin post delete removes comments");
  assert.strictEqual(redis.hash.has(reactionsKey), false, "admin post delete removes reactions");
  assert.strictEqual(redis.hash.has(viewsKey), false, "admin post delete removes views");
  assert.strictEqual(redis.hash.has(commentReactionsKey), false, "admin post delete removes comment reactions");
}

async function main() {
  const tests = [
    ["chat core invariants", testChatCoreInvariants],
    ["auth required and admin-only", testAuthAndAdmin],
    ["guestbook admin delete", testGuestbookAdminDelete],
    ["private cash random seat assignment", testPrivateCashRandomSeatAssignment],
    ["chat send/edit/delete", testChatSendEditDelete],
    ["crm app user block", testCrmAppUserBlock],
    ["crm week Monday 06:00 MSK cutoff", testCrmWeekUsesMondaySixMoscowCutoff],
    ["crm Poker21 stats deduplicate Poker21 ID", testCrmPokerPlusStatsDeduplicatePokerId],
    ["Sunday report collects pending weekly rakeback", testSundayReportCollectsPendingWeeklyRakeback],
    ["rakeback report uses addon delta", testRakebackReportUsesAddonDelta],
    ["raffle join/leave", testRaffleJoinLeave],
    ["raffle current week returns calculation", testRaffleCurrentWeekReturnsCalculation],
    ["raffle access level gate", testRaffleAccessLevelGate],
    ["raffle admin upsert participant tickets", testRaffleAdminUpsertParticipantAddsTickets],
    ["raffle admin add prize groups", testRaffleAdminAddPrizeGroups],
    ["raffle admin remove participant", testRaffleAdminRemoveParticipant],
    ["raffle active list includes daily sibling", testRaffleActiveListIncludesDailySibling],
    ["participation requires bot and channel", testParticipationRequiresBotAndChannel],
    ["raffle email account subscription gate", testRaffleEmailAccountSubscriptionGate],
    ["raffle winner ready", testRaffleWinnerReady],
    ["raffle winner ready private cash reserve", testRaffleWinnerReadyPrivateCashReserve],
    ["raffle winner ready own row only", testRaffleWinnerReadyCannotConfirmAnotherWinner],
    ["raffle winner ready admin notifications", testRaffleWinnerReadyAdminNotifications],
    ["raffle winner status prize notification", testRaffleWinnerStatusPrizeNotification],
    ["raffle winner ready reroll and burn", testRaffleWinnerReadyRerollAndBurn],
    ["raffle cash winner ready third reroll before burn", testRaffleCashWinnerReadyThirdRerollBeforeBurn],
    ["raffle ready reroll settlement lock", testRaffleReadyRerollSettlementLock],
    ["raffle telegram usernames admin-only", testRaffleTelegramUsernamesAdminOnly],
    ["raffle cash broadcast and winner instruction", testRaffleCashBroadcastAndWinnerInstruction],
    ["raffle complete notifies only drawn winners", testRaffleCompleteNotifiesOnlyDrawnWinners],
    ["raffle winner notification dedup", testRaffleWinnerNotificationDedup],
    ["raffle winner push retry after zero", testRaffleWinnerNotificationRetriesPushAfterZero],
    ["raffle winner notification account id", testRaffleWinnerNotificationResolvesAccountId],
    ["raffle winner notification caps overflow", testRaffleWinnerNotificationCapsOverflow],
    ["raffle winner notification requires stored winner", testRaffleWinnerNotificationRequiresStoredWinner],
    ["raffle auto-complete notification dedup", testRaffleAutoCompleteNotificationDedup],
    ["double raffle concurrent batch notifications", testDoubleRaffleConcurrentBatchNotifications],
    ["raffle cron retries missing winner notifications", testRaffleCronRetriesMissingWinnerNotifications],
    ["raffle cron retries missing active batch winner notifications", testRaffleCronRetriesMissingActiveBatchWinnerNotifications],
    ["raffle drawn get does not notify winners", testRaffleDrawnGetDoesNotNotifyWinners],
    ["raffle daily recurring", testRaffleDailyRecurring],
    ["raffle daily schedule dedupe", testRaffleDailyScheduleDedupe],
    ["raffle daily cron tick", testRaffleDailyCronTick],
    ["raffle duplicate options", testRaffleDuplicateOptions],
    ["respect vote/withdraw", testRespectVoteWithdraw],
    ["profile/user lookup", testProfileUserLookup],
    ["daily poker winners", testDailyPokerWinners],
    ["pokerplus key bind fallback matrix", testPokerPlusKeyBindFallbackMatrix],
    ["pokerplus fast bind with email uses mail", testPokerPlusFastBindWithEmailUsesMail],
    ["pokerplus bind failure error priority", testPokerPlusKeyBindFailurePrefersBindingFailed],
    ["pokerplus key bind account id fallback", testPokerPlusKeyBindFallsBackToAccountId],
    ["pokerplus refresh saved key", testPokerPlusRefreshUsesSavedKey],
    ["pokerplus counter hands aliases", testPokerPlusCounterHandsAliases],
    ["pokerplus key persists without storage secret", testPokerPlusKeyPersistsWithoutStorageSecret],
    ["pokerplus club league data and chip logs", testPokerPlusClubLeagueDataAndChipLogs],
    ["pokerplus multi cashier chip logs", testPokerPlusChipLogsMultiCashierSources],
    ["pokerplus admin linked-mail cashier chip logs", testPokerPlusChipLogsAdminLinkedMailFallback],
    ["pokerplus admin linked operator mails chip logs", testPokerPlusChipLogsAdminLinkedOperatorMails],
    ["pokerplus admin bound cashier source chip logs", testPokerPlusChipLogsBoundPokerPlusIds],
    ["pokerplus admin shared bound cashier source chip logs", testPokerPlusChipLogsSharedBoundMailAndDtSource],
    ["auth email and pwa code", testAuthEmailAndPwaCode],
    ["referrals trusted dt id hint", testReferralsTrustedDtIdHint],
    ["friends add/list/delete", testFriendsFlow],
    ["chat push subscribe/broadcast", testChatPushSubscribeAndBroadcast],
    ["tracking links hit/event/list", testTrackingLinksFlow],
    ["rating/gazette notifications", testRatingGazetteNotifications],
  ];
  const results = [];
  const filter = String(process.env.CONTRACT_TEST_FILTER || "").trim().toLowerCase();
  const selectedTests = filter ? tests.filter(([name]) => String(name).toLowerCase().includes(filter)) : tests;
  if (filter && selectedTests.length === 0) {
    throw new Error("No contract tests matched filter: " + filter);
  }
  for (const [name, fn] of selectedTests) {
    const redis = new MemoryRedis();
    installFetch(redis);
    await fn(redis);
    results.push({ name, ok: true });
  }
  console.log(JSON.stringify({ ok: true, results }, null, 2));
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
});
