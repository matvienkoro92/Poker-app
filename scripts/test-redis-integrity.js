#!/usr/bin/env node
"use strict";

// Isolated real Redis, Unix socket only, no persistence and no production credentials.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawn, execFile } = require("node:child_process");
const { promisify } = require("node:util");
const run = promisify(execFile);
const serverBin = process.env.REDIS_SERVER_BIN || "redis-server";
const cliBin = process.env.REDIS_CLI_BIN || "redis-cli";

async function main() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "poker-redis-test-"));
  const socket = path.join(dir, "redis.sock");
  const server = spawn(serverBin, ["--port", "0", "--unixsocket", socket, "--save", "", "--appendonly", "no", "--dir", dir], { stdio: "ignore" });
  let startupError;
  server.on("error", (error) => { startupError = error; });
  async function command(args) {
    const { stdout } = await run(cliBin, ["-s", socket, "--json", ...args.map(String)], { maxBuffer: 1024 * 1024 });
    if (stdout.startsWith("error:")) throw new Error(stdout.trim());
    return JSON.parse(stdout);
  }
  const originalFetch = global.fetch;
  try {
    for (let i = 0; i < 100 && !fs.existsSync(socket) && !startupError; i++) await new Promise((resolve) => setTimeout(resolve, 30));
    if (startupError) throw startupError;
    assert.equal(await command(["PING"]), "PONG");
    process.env.UPSTASH_REDIS_REST_URL = "https://isolated-redis.invalid";
    process.env.UPSTASH_REDIS_REST_TOKEN = "local-test";
    global.fetch = async (url, options) => {
      assert.equal(String(url), "https://isolated-redis.invalid/pipeline");
      const rows = [];
      for (const cmd of JSON.parse(options.body)) {
        try { rows.push({ result: await command(cmd) }); }
        catch (error) { rows.push({ error: error.message }); }
      }
      return { ok: true, json: async () => rows };
    };
    const { pipeline, setJson } = require("../lib/redis");
    const { atomicWrite } = require("../lib/redis-atomic");
    const ledger = require("../lib/bonus-ledger");
    const { rejectAuthAbuse } = require("../lib/auth-rate-limit");

    await command(["HSET", ledger.BONUS_BALANCES_KEY, "ID1", "100", "ID2", "200"]);
    const first = await ledger.addBonusOperation({ userId: "ID1", amount: 20, operationType: "admin_credit" });
    assert.equal(first.bonusBalance, 120);
    assert.equal(await command(["GET", ledger.BONUS_TOTAL_BALANCE_KEY]), "320");
    assert.equal(await command(["LLEN", ledger.BONUS_LEDGER_ALL_KEY]), 1);

    const concurrent = await Promise.allSettled(Array.from({ length: 10 }, () => ledger.addBonusOperation({ userId: "ID1", amount: 5, operationType: "admin_credit" })));
    const successful = concurrent.filter((result) => result.status === "fulfilled").length;
    assert.ok(successful >= 1);
    assert.equal(await ledger.getBonusBalance("ID1"), 120 + successful * 5);
    assert.equal(await command(["LLEN", ledger.BONUS_LEDGER_ALL_KEY]), 1 + successful);
    // Independent account locks still update the shared total without lost updates.
    await Promise.all([ledger.addBonusOperation({ userId: "ID1", amount: 1, operationType: "credit" }), ledger.addBonusOperation({ userId: "ID2", amount: 2, operationType: "credit" })]);
    assert.equal(Number(await command(["GET", ledger.BONUS_TOTAL_BALANCE_KEY])), 323 + successful * 5);

    const lock = await ledger.acquireRedisLock("test:lease", 10);
    await command(["SET", lock.key, "new-owner"]);
    await ledger.releaseRedisLock(lock);
    assert.equal(await command(["GET", lock.key]), "new-owner");
    await assert.rejects(atomicWrite([["SET", "test:untouched", "no"]], { locks: [lock] }));
    assert.equal(await command(["GET", "test:untouched"]), null);

    const before = await ledger.getBonusBalance("ID1");
    await command(["DEL", ledger.BONUS_LEDGER_ALL_KEY]);
    await command(["SET", ledger.BONUS_LEDGER_ALL_KEY, "wrong-type"]);
    await assert.rejects(ledger.addBonusOperation({ userId: "ID1", amount: 50, operationType: "credit" }));
    assert.equal(await ledger.getBonusBalance("ID1"), before, "wrong-type error cannot partially credit balance");
    await command(["DEL", ledger.BONUS_LEDGER_ALL_KEY]);
    await command(["SET", ledger.BONUS_LEDGER_VERSION_KEY, "not-an-integer"]);
    await assert.rejects(ledger.addBonusOperation({ userId: "ID1", amount: 50, operationType: "credit" }));
    assert.equal(await ledger.getBonusBalance("ID1"), before, "bad counter cannot partially credit balance");
    await command(["SET", ledger.BONUS_LEDGER_VERSION_KEY, "1"]);
    await assert.rejects(ledger.addBonusOperation({ userId: "ID1", amount: before + 1, operationType: "debit" }));
    assert.equal(await ledger.getBonusBalance("ID1"), before);
    await assert.rejects(atomicWrite([["HSET", ledger.BONUS_BALANCES_KEY, "ID1", "1"]], { balances: [{ key: ledger.BONUS_BALANCES_KEY, userId: "ID1", value: before - 1 }] }));
    assert.equal(await ledger.getBonusBalance("ID1"), before);

    const request = { headers: { "x-forwarded-for": "192.0.2.1" }, body: {} };
    function response() { return { code: 200, headers: {}, setHeader(k,v) { this.headers[k]=v; }, status(code) { this.code=code; return this; }, json(body) { this.body=body; return this; } }; }
    for (let i = 0; i < 3; i++) assert.equal(await rejectAuthAbuse(request, response(), "email", "request", "one@example.test"), false);
    const blocked = response();
    // A fresh module represents another serverless instance using the same Redis.
    delete require.cache[require.resolve("../lib/auth-rate-limit")];
    assert.equal(await require("../lib/auth-rate-limit").rejectAuthAbuse(request, blocked, "email", "request", "one@example.test"), true);
    assert.equal(blocked.code, 429);
    assert.ok(Number(blocked.headers["Retry-After"]) > 0);
    for (let i = 0; i < 10; i++) assert.equal(await rejectAuthAbuse(request, response(), "email", "verify", "two@example.test"), false);
    const attempts = response();
    assert.equal(await rejectAuthAbuse(request, attempts, "email", "login", "two@example.test"), true);
    assert.equal(attempts.code, 429);


    await command(["FLUSHDB"]);
    const manual = { userId: "ID123456", adminId: "tg_1", amount: 10, operationType: "admin_credit", operationId: "retry_request_000001" };
    const committed = await ledger.addBonusOperation(manual);
    const retried = await ledger.addBonusOperation(manual);
    assert.equal(retried.entry.id, committed.entry.id);
    assert.equal(retried.replayed, true);
    assert.equal(await ledger.getBonusBalance(manual.userId), 10);
    await assert.rejects(ledger.addBonusOperation({ ...manual, amount: 20 }), /operation_id_conflict/);
    assert.equal(await command(["LLEN", ledger.BONUS_LEDGER_ALL_KEY]), 1);

    // Entries older than both former index caps remain reportable without migration.
    await command(["FLUSHDB"]);
    await command(["EVAL", `for i=1,5001 do
      local id='old_'..i
      redis.call('SET', 'poker_app:bonus_ledger:'..id, cjson.encode({id=id,user_id='ID123456',amount=1,direction='debit',created_at='2026-08-01T12:00:00Z'}))
      redis.call('HSET', 'poker_app:bonus_issue_reviews',id,cjson.encode({status='plus',amount=1}))
    end return 1`, "0"]);
    await command(["SET", ledger.BONUS_TOTAL_BALANCE_KEY, "0"]);
    await command(["INCR", ledger.BONUS_LEDGER_VERSION_KEY]);
    const history = await ledger.getBonusLedgerRangeSummary(5000, "2026-08-01", "2026-08-01");
    assert.equal(history.debitedDuringRange, 5001);
    assert.equal(history.returnedDuringRange, 5001);
    assert.equal((await ledger.getBonusLedgerTotals()).totalDebited, 5001);
    const realFetch = global.fetch;
    await command(["INCR", ledger.BONUS_LEDGER_VERSION_KEY]);
    global.fetch = async (url, options) => JSON.parse(options.body).some(cmd => cmd[0] === "MGET")
      ? { ok: true, json: async () => [{ error: "injected MGET failure" }] } : realFetch(url, options);
    await assert.rejects(ledger.getBonusLedgerRangeSummary(5000, "2026-08-01", "2026-08-01"));
    global.fetch = realFetch;

    await command(["FLUSHDB"]);
    const passwords = require("../lib/account-password");
    const { consumePasswordCode } = require("../lib/password-code");
    const sessions = require("../lib/session-revocation");
    process.env.TELEGRAM_BOT_TOKEN = "test-secret";
    await command(["HSET", "poker_app:visitor_dt_ids", "tg_99", "ID123456"]);
    const oldToken = await sessions.issuePwaSession({ id: 99, memberId: "tg_99" }, "test-secret");
    const codeKey = "test:password-code";
    await command(["SET", codeKey, JSON.stringify({ code: "123456", userId: "tg_99", dtId: "ID123456" })]);
    const input = { codeKey, code: "123456", accountId: "ID123456", userId: "tg_99", password: "new-password" };
    assert.equal((await consumePasswordCode({ ...input, password: "bad" })).ok, false);
    assert.ok(await command(["GET", codeKey]), "invalid password does not consume code");
    // Wrong Redis type must leave both code and password untouched.
    await command(["SET", passwords.SESSION_VERSIONS_KEY, "wrong-type"]);
    await assert.rejects(consumePasswordCode(input));
    assert.ok(await command(["GET", codeKey]));
    assert.equal(await command(["HGET", passwords.ACCOUNT_PASSWORDS_KEY, input.accountId]), null);
    await command(["DEL", passwords.SESSION_VERSIONS_KEY]);
    const codeAttempts = await Promise.allSettled([consumePasswordCode(input), consumePasswordCode({ ...input, password: "other-password" })]);
    assert.equal(codeAttempts.filter(r => r.status === "fulfilled" && r.value.ok).length, 1);
    const winningPassword = (await passwords.verifyAccountPassword(input.accountId, input.password)).ok ? input.password : "other-password";
    assert.equal((await consumePasswordCode({ ...input, password: winningPassword })).replayed, true);
    assert.equal(await command(["HGET", passwords.SESSION_VERSIONS_KEY, input.accountId]), "1");
    const denied = response();
    assert.equal(await sessions.rejectRevokedSessions({ method: "POST", body: { pwaSession: oldToken } }, denied), true);
    assert.equal(denied.code, 401);
    const proof = await passwords.verifyAccountPassword(input.accountId, winningPassword);
    const fresh = await sessions.issuePwaSession({ id: 99, memberId: "tg_99", passwordProof: proof }, "test-secret");
    assert.equal(await sessions.rejectRevokedSessions({ method: "GET", query: { pwaSession: fresh } }, response()), false);
    await passwords.setAccountPassword(input.accountId, "later-password");
    await assert.rejects(sessions.issuePwaSession({ id: 99, memberId: "tg_99", passwordProof: proof }, "test-secret"), /credentials_changed/);
    assert.equal(await sessions.rejectRevokedSessions({ method: "GET", query: { pwaSession: fresh } }, response()), true);
    const routed = response();
    await require("../api/[[...slug]].js")({ method: "GET", url: "/api/users", query: { pwaSession: fresh } }, routed);
    assert.equal(routed.code, 401, "central router rejects revoked token before endpoint");
    process.env.PWA_VK_SESSION_SECRET = "vk-test-secret";
    await command(["HSET", "poker_app:visitor_dt_ids", "vk_123", input.accountId]);
    const vkToken = await sessions.issuePwaVkSession({ vkId: 123 });
    const emailToken = await sessions.issuePwaSession({ id: 0, memberId: "mail_" + input.accountId }, "test-secret");
    await passwords.setAccountPassword(input.accountId, "third-password");
    for (const body of [{ pwaVkSession: vkToken }, { pwaSession: emailToken }]) {
      assert.equal(await sessions.rejectRevokedSessions({ method: "POST", body }, response()), true);
    }
    const email = "person@example.test";
    await command(["SET", "poker_app:email_code:" + email, JSON.stringify({ code: "654321", userId: "tg_99", dtId: input.accountId })]);
    const emailInput = { ...input, codeKey: "poker_app:email_code:" + email, code: "654321", email, password: "email-password" };
    assert.equal((await consumePasswordCode(emailInput)).ok, true);
    assert.equal(await command(["HGET", "poker_app:email_links", email]), input.accountId);
    assert.equal((await consumePasswordCode(emailInput)).replayed, true);

    global.fetch = async () => ({ ok: true, json: async () => [{ error: "simulated failure" }] });
    assert.equal(await setJson("test", {}), false);
    await assert.rejects(pipeline([["GET", "test"]], { throwOnError: true }));
    await assert.rejects(ledger.getBonusBalance("ID1"));
    const unavailable = response();
    assert.equal(await rejectAuthAbuse(request, unavailable, "email", "login", "user"), true);
    assert.equal(unavailable.code, 503);
    console.log("Redis integrity passed: atomic writes, concurrency, lease ownership, wrong types, bad counters, insufficient funds, rate limits, idempotent retries, 5001-entry reports, failed reads, one-time codes and session revocation.");
  } finally {
    global.fetch = originalFetch;
    server.kill("SIGTERM");
    await new Promise((resolve) => server.exitCode != null ? resolve() : server.once("exit", resolve));
    fs.rmSync(dir, { recursive: true, force: true });
  }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
