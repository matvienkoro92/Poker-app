#!/usr/bin/env node
"use strict";

const assert = require("assert");
const path = require("path");

const root = path.join(__dirname, "..");
const BOT_TOKEN = "contract-test-bot-token";

process.env.UPSTASH_REDIS_REST_URL = "https://mock-redis.local";
process.env.UPSTASH_REDIS_REST_TOKEN = "mock-token";
process.env.TELEGRAM_BOT_TOKEN = BOT_TOKEN;
process.env.TELEGRAM_ADMIN_ID = "388008256";
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
      const payload = opts.botOk
        ? { ok: true, result: { id: 1001, type: "private" } }
        : { ok: false, error_code: 400, description: "Bad Request: chat not found" };
      return {
        ok: !!opts.botOk,
        async json() { return payload; },
        async text() { return JSON.stringify(payload); },
      };
    }
    if (u.includes("/getChatMember?")) {
      const payload = opts.channelOk
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
  };
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
  const adminHandler = loadHandler("admin");
  let bonusRes = await call(adminHandler, req("GET", { path: "bonus-balances", pwaSession: bonusAdminToken }));
  assert.strictEqual(bonusRes.statusCode, 200, "roman1787443 can open bonus admin API");
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
  }));
  assert.strictEqual(manualBonusRes.statusCode, 200, "bonus admin can debit a user");
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
}

async function testChatSendEditDelete() {
  const chat = loadHandler("chat");
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
}

async function testRaffleJoinLeave(redis) {
  const raffles = loadHandler("raffles");
  const s = sessions();
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

  let r = await call(raffles, req("POST", {}, { pwaSession: s.user, action: "join", raffleId: "contract_raffle", deviceId: "dev-1" }));
  assert.strictEqual(r.statusCode, 200, "raffle join succeeds");
  assert.strictEqual(r.body.raffle.participants.length, 1, "join adds participant");
  assert.strictEqual(r.body.raffle.participants[0].accountId, "ID100001", "join stores account id");

  r = await call(raffles, req("POST", {}, { pwaSession: s.user, action: "leave", raffleId: "contract_raffle" }));
  assert.strictEqual(r.statusCode, 200, "raffle leave succeeds");
  assert.strictEqual(r.body.raffle.participants.length, 0, "leave removes participant");
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

  installTelegramGateFetch(redis, { botOk: false, channelOk: true });
  let r = await call(raffles, req("POST", {}, {
    pwaSession: s.user,
    action: "join",
    raffleId: "contract_raffle_gate",
    deviceId: "gate-dev-1",
  }));
  assert.strictEqual(r.statusCode, 403, "raffle join requires bot");
  assert.strictEqual(r.body.code, "BOT_REQUIRED", "raffle join returns bot-required code");
  assert.ok(String(r.body.error || "").includes("/start"), "raffle bot error explains start command");

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

  installTelegramGateFetch(redis, { botOk: true, channelOk: false });
  r = await call(promo, req("POST", { path: "daily-poker/play" }, {
    pwaSession: s.user,
    idempotencyKey: "daily-gate-channel",
  }));
  assert.strictEqual(r.statusCode, 403, "daily poker play requires channel");
  assert.strictEqual(r.body.code, "CHANNEL_REQUIRED", "daily poker returns channel-required code");
  assert.ok(String(r.body.error || "").includes("Раздать карты"), "daily poker channel error explains retry action");

  installTelegramGateFetch(redis, { botOk: false, channelOk: true });
  r = await call(promo, req("POST", { path: "daily-poker/play" }, {
    pwaSession: s.user,
    idempotencyKey: "daily-gate-bot",
  }));
  assert.strictEqual(r.statusCode, 403, "daily poker play requires bot");
  assert.strictEqual(r.body.code, "BOT_REQUIRED", "daily poker returns bot-required code");
  assert.ok(String(r.body.error || "").includes("@Poker_dvatuza_bot"), "daily poker bot error names club bot");
}

async function testRaffleWinnerReady(redis) {
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
      name: "Player",
      p21Id: "P21-1001",
      telegramUsername: "player_public",
    }],
    winners: [{
      userId: "tg_1001",
      accountId: "ID100001",
      name: "Player",
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
  redis.h("poker_app:pokerplus_profiles").set("ID100001", JSON.stringify({ nickname: "Poker21Nick" }));

  let r = await call(raffles, req("GET", { pwaSession: s.user, id: "contract_raffle_tg_privacy" }));
  assert.strictEqual(r.statusCode, 200, "non-admin can load raffle");
  assert.strictEqual(r.body.isAdmin, false, "non-admin response is not admin");
  assert.strictEqual(r.body.raffle.participants[0].telegramUsername, undefined, "non-admin does not receive participant telegram username");
  assert.strictEqual(r.body.raffle.winners[0].telegramUsername, undefined, "non-admin does not receive winner telegram username");
  assert.strictEqual(r.body.raffle.winners[0].pokerPlusNickname, "Poker21Nick", "non-admin receives winner Poker21 nickname");

  r = await call(raffles, req("GET", { pwaSession: s.admin, id: "contract_raffle_tg_privacy" }));
  assert.strictEqual(r.statusCode, 200, "admin can load raffle");
  assert.strictEqual(r.body.isAdmin, true, "admin response is admin");
  assert.strictEqual(r.body.raffle.participants[0].telegramUsername, "player_public", "admin receives participant telegram username");
  assert.strictEqual(r.body.raffle.winners[0].telegramUsername, "player_public", "admin receives winner telegram username");
  assert.strictEqual(r.body.raffle.winners[0].pokerPlusNickname, "Poker21Nick", "admin receives winner Poker21 nickname");

  r = await call(raffles, req("GET", { pwaSession: s.user }));
  const listed = (r.body.raffles || []).find((item) => item.id === "contract_raffle_tg_privacy");
  assert.ok(listed, "non-admin list includes raffle");
  assert.strictEqual(listed.winners[0].telegramUsername, undefined, "non-admin list hides winner telegram username");
  assert.strictEqual(listed.winners[0].pokerPlusNickname, "Poker21Nick", "non-admin list exposes winner Poker21 nickname");
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

    let winnerMessage = null;
    let winnerPush = null;
    for (let i = 0; i < 8 && (!winnerMessage || !winnerPush); i += 1) {
      await new Promise((resolve) => setTimeout(resolve, 0));
      winnerMessage = sentMessages.find((msg) => String(msg.body.chat_id) === "1001");
      winnerPush = sentPushes.find((item) => item.payload && item.payload.kind === "raffle_winner");
    }
    assert.ok(winnerMessage, "winner receives raffle ready instruction");
    const winnerText = String(winnerMessage.body.text || "");
    assert.ok(winnerText.includes("startapp=raffle_contract_cash_raffle"), "winner message includes completed raffle deeplink");
    assert.ok(winnerText.includes("«Я готов»"), "winner message explains ready button");
    assert.ok(winnerText.includes("2. Рядом со своим ником нажмите кнопку «Я готов»."), "winner message keeps ready button as step two");
    assert.ok(!winnerText.includes("Ссылка откроет вкладку"), "winner message omits completed-tab hint step");
    assert.ok(winnerText.includes("отметку «Готов»"), "winner message explains admin-ready badge");
    assert.ok(winnerPush, "winner receives personal raffle web push");
    assert.strictEqual(winnerPush.subscription.endpoint, "https://push.example.test/raffle-winner-1001", "winner push uses winner subscription");
    assert.strictEqual(winnerPush.payload.openUrl, "./?startapp=raffle_contract_cash_raffle", "winner push opens completed raffle");
    assert.strictEqual(winnerPush.payload.raffleId, "contract_cash_raffle", "winner push carries raffle id");
    assert.ok(String(winnerPush.payload.body || "").includes("Я готов"), "winner push asks to press ready");
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
  await service.notifyWinnersRaffleCompleted("contract_raffle_notify_account_id", raffle);
  const winnerMessages = sentMessages.filter((msg) => String(msg.body.chat_id) === "1002");
  assert.strictEqual(winnerMessages.length, 1, "account-id winner resolves Telegram recipient");
  assert.strictEqual(sentPushes.length, 1, "account-id winner receives push attempt");
  assert.strictEqual(sentPushes[0].memberId, "ID100002", "push is addressed to account id");
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
  let r = await call(raffles, req("POST", {}, {
    pwaSession: s.admin,
    action: "create",
    title: "Daily contract raffle",
    totalWinners: 2,
    groups: [{ prize: "Ticket", count: 2 }],
    endDate: new Date(Date.now() + 3600_000).toISOString(),
    daily: true,
    dailyStartTime: "9:05",
    idemKey: "contract-daily-create",
  }));
  assert.strictEqual(r.statusCode, 200, "admin can create a daily raffle");
  assert.strictEqual(r.body.raffle.daily, true, "daily raffle is marked daily");
  assert.strictEqual(r.body.raffle.recurrence.startTime, "09:05", "daily start time is normalized");
  assert.ok(new Date(r.body.raffle.recurrence.nextStartAt) > new Date(r.body.raffle.createdAt), "daily next start is after first launch");

  const dueStart = new Date(Date.now() - 5 * 60_000);
  const durationMs = 60 * 60_000;
  const source = {
    id: "daily_contract_source",
    createdBy: "tg_388008256",
    title: "Daily source",
    totalWinners: 1,
    groups: [{ prize: "Daily ticket", count: 1 }],
    endDate: new Date(Date.now() - 30 * 60_000).toISOString(),
    participants: [],
    winners: [],
    status: "drawn",
    createdAt: new Date(Date.now() - 2 * 3600_000).toISOString(),
    daily: true,
    recurrence: {
      type: "daily",
      timeZone: "Europe/Moscow",
      startTime: "11:30",
      seriesId: "contract_daily_series",
      scheduledStartAt: new Date(Date.now() - 2 * 3600_000).toISOString(),
      nextStartAt: dueStart.toISOString(),
      durationMs,
      template: {
        title: "Daily source",
        totalWinners: 1,
        groups: [{ prize: "Daily ticket", count: 1 }],
      },
    },
  };
  redis.kv.set("poker_app:raffle:daily_contract_source", JSON.stringify(source));
  redis.l("poker_app:raffle_ids").push("daily_contract_source");

  r = await call(raffles, req("GET", { pwaSession: s.user }));
  assert.strictEqual(r.statusCode, 200, "raffles list succeeds with daily series");
  const generated = (r.body.raffles || []).filter((raffle) => raffle.recurrence && raffle.recurrence.seriesId === "contract_daily_series" && raffle.id !== source.id);
  assert.strictEqual(generated.length, 1, "due daily series creates one next raffle");
  assert.strictEqual(generated[0].status, "active", "generated daily raffle is active");
  assert.strictEqual(generated[0].createdAt, dueStart.toISOString(), "generated daily raffle starts at scheduled time");
  assert.strictEqual(generated[0].endDate, new Date(dueStart.getTime() + durationMs).toISOString(), "generated daily raffle keeps original duration");
}

async function testRaffleDuplicateOptions(redis) {
  const raffles = loadHandler("raffles");
  const s = sessions();
  for (let i = 1; i <= 4; i += 1) {
    const raffle = {
      id: "duplicate_option_" + i,
      title: "Duplicate source " + i,
      totalWinners: i,
      groups: [{ prize: "Prize " + i, count: i }],
      endDate: new Date(Date.now() + (i + 1) * 3600_000).toISOString(),
      participants: [],
      winners: [],
      status: i % 2 === 0 ? "drawn" : "active",
      createdAt: new Date(Date.now() - (5 - i) * 3600_000).toISOString(),
    };
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

  r = await call(raffles, req("POST", {}, {
    pwaSession: s.admin,
    action: "duplicateLast",
    sourceRaffleId: "duplicate_option_2",
    createIdempotencyKey: "contract-duplicate-selected",
  }));
  assert.strictEqual(r.statusCode, 200, "admin can duplicate selected raffle");
  assert.strictEqual(r.body.raffle.title, "Duplicate source 2", "selected duplicate keeps source title");
  assert.strictEqual(r.body.raffle.groups[0].prize, "Prize 2", "selected duplicate keeps source prize");
}

async function testRespectVoteWithdraw(redis) {
  const respect = loadHandler("respect");
  const s = sessions();
  redis.h("poker_app:visitor_dt_ids").set("tg_1001", "ID100001");
  redis.h("poker_app:id_to_user").set("ID100001", "tg_1001");
  redis.h("poker_app:visitor_dt_ids").set("tg_1002", "ID100002");
  redis.h("poker_app:id_to_user").set("ID100002", "tg_1002");

  let r = await call(respect, req("POST", {}, { pwaSession: s.user, targetUserId: "tg_1002", action: "up" }));
  assert.strictEqual(r.statusCode, 200, "respect up succeeds");
  assert.strictEqual(r.body.score, 1, "respect up increments");
  assert.strictEqual(r.body.myVote, "up", "respect stores up vote");

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
  redis.h("poker_app:visitor_personal").set("ID100002", "public bio");
  redis.h("poker_app:visitor_chat_display_names").set("ID100002", "Peer Display");
  redis.h("poker_app:pokerplus_user_ids").set("ID100002", "P21-1002");
  redis.h("poker_app:pokerplus_stats_visible").set("ID100002", "1");
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

  let r = await call(users, req("GET", { pwaSession: s.user, userId: "ID100002" }));
  assert.strictEqual(r.statusCode, 200, "profile user lookup succeeds");
  assert.strictEqual(r.body.userId, "ID100002", "lookup returns dt id");
  assert.strictEqual(r.body.chatUserId, "tg_1002", "lookup resolves chat user id");
  assert.strictEqual(r.body.userName, "@peer", "lookup returns username");
  assert.strictEqual(r.body.p21Id, "P21-1002", "lookup returns PokerPlus id");
  assert.strictEqual(r.body.chatDisplayName, "Peer Display", "lookup returns display name");
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
  const expectedSpinStats = {
    totalUniquePlayers: new Set(publicSpinDates.map(([accountId]) => accountId)).size,
    todayUniquePlayers: expectedUniqueForDates(new Set([meta.gameDate])),
    weekUniquePlayers: expectedUniqueForDates(weekDateSet),
    previousWeekUniquePlayers: expectedUniqueForDates(previousWeekDateSet),
    monthUniquePlayers: expectedUniqueForDates(monthDateSet),
    previousMonthUniquePlayers: expectedUniqueForDates(previousMonthDateSet),
    firstSpinAt: "2026-05-20T08:00:00.000Z",
    firstSpinDate: "2026-05-20",
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
    ticket_balance_credited: 500,
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
    ticket_balance_credited: 1200,
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
  assert.strictEqual(r.body.totalWinners, 2, "daily poker winners excludes non-ruble games and admins");
  assert.strictEqual(r.body.totalPrizeRubles, 1700, "daily poker winners exposes all-time ruble total");
  assert.strictEqual(r.body.totalUniquePlayers, expectedSpinStats.totalUniquePlayers, "daily poker winners exposes all-time unique public spinners");
  assert.strictEqual(r.body.todayUniquePlayers, expectedSpinStats.todayUniquePlayers, "daily poker winners exposes unique public spinners today");
  assert.strictEqual(r.body.weekUniquePlayers, expectedSpinStats.weekUniquePlayers, "daily poker winners exposes unique public spinners this week");
  assert.strictEqual(r.body.previousWeekUniquePlayers, expectedSpinStats.previousWeekUniquePlayers, "daily poker winners exposes unique public spinners previous week");
  assert.strictEqual(r.body.monthUniquePlayers, expectedSpinStats.monthUniquePlayers, "daily poker winners exposes unique public spinners this month");
  assert.strictEqual(r.body.previousMonthUniquePlayers, expectedSpinStats.previousMonthUniquePlayers, "daily poker winners exposes unique public spinners previous month");
  assert.strictEqual(r.body.firstSpinAt, expectedSpinStats.firstSpinAt, "daily poker winners exposes first public spin timestamp");
  assert.strictEqual(r.body.firstSpinDate, expectedSpinStats.firstSpinDate, "daily poker winners exposes first public spin date");
  assert.deepStrictEqual(r.body.spinStats, expectedSpinStats, "daily poker winners exposes grouped spin stats");
  assert.strictEqual(r.body.winners.length, 2, "daily poker winners returns public winners");
  assert.strictEqual(r.body.winners[0].displayName, "Leader Display", "daily poker winners sorts by ruble total desc");
  assert.strictEqual(r.body.winners[0].totalPrizeAmount, 1200, "daily poker winners exposes leader total");
  assert.strictEqual(r.body.winners[0].prize, "Всего: 1 200 ₽", "daily poker winners formats total ticket prize");
  assert.strictEqual(r.body.winners[1].displayName, "Peer Display", "daily poker winners resolves display names");
  assert.strictEqual(r.body.winners[1].totalPrizeAmount, 550, "daily poker winners aggregates all-time prizes");
  assert.strictEqual(r.body.winners[1].prize, "Всего: 500 ₽ + 50 бонусов", "daily poker winners formats mixed total prize");
  assert.strictEqual(r.body.winners.some((winner) => winner.displayName === "Admin Display"), false, "daily poker winners hides admins");
  assert.strictEqual(r.body.winners.some((winner) => winner.displayName === "Attempt Display"), false, "daily poker winners hides attempt-only prizes");
  assert.strictEqual(r.body.winners.some((winner) => winner.displayName === "Bonus Display"), false, "daily poker winners hides bonus-only prizes");
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
  let r = await call(authEmail, req("POST", {}, {
    action: "request",
    email: "Player@Test.com",
    dtIdHint: "ID123456",
  }));
  assert.strictEqual(r.statusCode, 200, "email code request succeeds");
  assert.strictEqual(r.body.sent, true, "email code request marks sent");

  const emailCode = JSON.parse(redis.kv.get("poker_app:email_code:player@test.com"));
  assert.strictEqual(emailCode.dtId, "ID123456", "email code keeps hinted account id");
  assert.ok(/^\d{6}$/.test(emailCode.code), "email code is 6 digits");

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
  assert.strictEqual(r.body.dtId, "ID123456", "email verify returns account id");
  assert.ok(r.body.pwaSession, "email verify returns PWA session");
  assert.strictEqual(redis.h("poker_app:email_links").get("player@test.com"), "ID123456", "email verify links email");
  assert.strictEqual(redis.kv.has("poker_app:email_code:player@test.com"), false, "email verify clears code");

  r = await call(authEmail, req("POST", {}, {
    action: "login",
    email: "PLAYER@test.com",
    password: "secret123",
  }));
  assert.strictEqual(r.statusCode, 200, "email password login succeeds");
  assert.strictEqual(r.body.dtId, "ID123456", "email password login returns linked account");

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
}

async function testFriendsFlow(redis) {
  const friends = loadHandler("friends");
  const s = sessions();
  redis.h("poker_app:visitor_usernames").set("tg_1002", "peer");

  let r = await call(friends, req("POST", {}, {
    pwaSession: s.user,
    targetUserId: "tg_1002",
    contactName: "  Buddy\u0007  ",
  }));
  assert.strictEqual(r.statusCode, 200, "friend add succeeds");

  const myAccountId = redis.h("poker_app:visitor_dt_ids").get("tg_1001");
  const peerAccountId = redis.h("poker_app:visitor_dt_ids").get("tg_1002");
  assert.ok(myAccountId && peerAccountId, "friends flow creates account ids");
  assert.strictEqual(redis.s("poker_app:friends:" + myAccountId).has(peerAccountId), true, "friend add stores normalized account id");
  assert.strictEqual(redis.h("poker_app:friend_alias:" + myAccountId).get(peerAccountId), "Buddy", "friend alias is sanitized");

  r = await call(friends, req("GET", { pwaSession: s.user }));
  assert.strictEqual(r.statusCode, 200, "friend list succeeds");
  assert.strictEqual(r.body.friends.length, 1, "friend list returns added friend");
  assert.strictEqual(r.body.friends[0].userId, peerAccountId, "friend list exposes account id");
  assert.strictEqual(r.body.friends[0].chatUserId, "tg_1002", "friend list resolves chat id");
  assert.strictEqual(r.body.friends[0].userName, "@peer", "friend list resolves username");
  assert.strictEqual(r.body.friends[0].contactName, "Buddy", "friend list returns alias");

  r = await call(friends, req("DELETE", {}, { pwaSession: s.user, targetUserId: "tg_1002" }));
  assert.strictEqual(r.statusCode, 200, "friend delete succeeds");
  assert.strictEqual(redis.s("poker_app:friends:" + myAccountId).has(peerAccountId), false, "friend delete removes member");
  assert.strictEqual(redis.h("poker_app:friend_alias:" + myAccountId).has(peerAccountId), false, "friend delete removes alias");
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

  r = await call(pushAdminBroadcast, req("GET", { pwaSession: s.admin }));
  assert.strictEqual(r.statusCode, 200, "admin chat push list succeeds");
  assert.strictEqual(r.body.count, 1, "admin chat push list sees active subscriber");

  r = await call(pushSubscribe, req("POST", {}, { pwaSession: s.user, action: "disable" }));
  assert.strictEqual(r.statusCode, 200, "chat push disable succeeds");
  assert.strictEqual(r.body.notificationsEnabled, false, "chat push disable returns disabled");
  assert.strictEqual(redis.s("poker_app:chat_push_registry").has(myAccountId), false, "chat push disable removes registry member");

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
}

async function testRatingGazetteNotifications(redis) {
  const ratingSubscribe = loadHandler("rating-subscribe");
  const gazetteSubscribe = loadHandler("gazette-subscribe");
  const s = sessions();

  let r = await call(ratingSubscribe, req("POST", {}, { pwaSession: s.user }));
  assert.strictEqual(r.statusCode, 200, "rating subscribe succeeds");
  assert.strictEqual(r.body.subscribed, true, "rating subscribe returns subscribed");
  assert.strictEqual(redis.s("poker_app:rating_subscribers").has("1001"), true, "rating subscribe stores Telegram chat id");

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

async function main() {
  const tests = [
    ["chat core invariants", testChatCoreInvariants],
    ["auth required and admin-only", testAuthAndAdmin],
    ["chat send/edit/delete", testChatSendEditDelete],
    ["raffle join/leave", testRaffleJoinLeave],
    ["participation requires bot and channel", testParticipationRequiresBotAndChannel],
    ["raffle winner ready", testRaffleWinnerReady],
    ["raffle telegram usernames admin-only", testRaffleTelegramUsernamesAdminOnly],
    ["raffle cash broadcast and winner instruction", testRaffleCashBroadcastAndWinnerInstruction],
    ["raffle winner notification dedup", testRaffleWinnerNotificationDedup],
    ["raffle winner push retry after zero", testRaffleWinnerNotificationRetriesPushAfterZero],
    ["raffle winner notification account id", testRaffleWinnerNotificationResolvesAccountId],
    ["raffle auto-complete notification dedup", testRaffleAutoCompleteNotificationDedup],
    ["raffle drawn get does not notify winners", testRaffleDrawnGetDoesNotNotifyWinners],
    ["raffle daily recurring", testRaffleDailyRecurring],
    ["raffle duplicate options", testRaffleDuplicateOptions],
    ["respect vote/withdraw", testRespectVoteWithdraw],
    ["profile/user lookup", testProfileUserLookup],
    ["daily poker winners", testDailyPokerWinners],
    ["pokerplus key bind fallback matrix", testPokerPlusKeyBindFallbackMatrix],
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
    ["friends add/list/delete", testFriendsFlow],
    ["chat push subscribe/broadcast", testChatPushSubscribeAndBroadcast],
    ["tracking links hit/event/list", testTrackingLinksFlow],
    ["rating/gazette notifications", testRatingGazetteNotifications],
  ];
  const results = [];
  for (const [name, fn] of tests) {
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
