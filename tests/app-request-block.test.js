"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

function load(identity) {
  const calls = [];
  const module = { exports: {} };
  vm.runInNewContext(fs.readFileSync(require.resolve("../lib/app-request-block"), "utf8"), {
    module, process: { env: {} }, URL,
    require(name) {
      if (name === "./resolve-telegram-auth") return {
        resolveTelegramIdentity(req, body) { calls.push({ query: req.query, body }); return identity; },
        memberIdFromIdentity: () => "tg_937891050",
      };
      if (name === "./app-user-blocks") return {
        async rejectBlockedAppUser(req, res, auth) {
          calls.push(auth);
          res.status(403).json({ code: "APP_USER_BLOCKED" });
          return true;
        },
      };
      throw Error(name);
    },
  });
  return { check: module.exports.rejectBlockedAuthenticatedRequest, calls };
}

test("blocked signed-in players are rejected for every game before dispatch", async () => {
  for (const endpoint of ["board-games", "billiards", "monkey-race", "cooler-flight", "nards-tournaments", "promo", "raffles"]) {
    const { check, calls } = load({ id: 937891050 });
    let status;
    const res = { status(value) { status = value; return this; }, json() {} };
    assert.equal(await check({ method: "POST", url: "/api/" + endpoint, body: '{"pwaSession":"signed"}' }, res), true);
    assert.equal(status, 403);
    assert.equal(calls[0].body.pwaSession, "signed");
    assert.equal(calls[1].memberId, "tg_937891050");
  }
});

test("GET query credentials reach identity verification", async () => {
  const { check, calls } = load(null);
  assert.equal(await check({ method: "GET", url: "/api/board-games?pwaSession=signed" }, {}), false);
  assert.equal(calls[0].query.pwaSession, "signed");
});

test("anonymous, malformed and preflight requests retain endpoint validation", async () => {
  const { check, calls } = load(null);
  assert.equal(await check({ method: "OPTIONS" }, {}), false);
  assert.equal(calls.length, 0);
  for (const body of [null, "null", "broken", {}]) {
    assert.equal(await check({ method: "POST", url: "/api/board-games", body }, {}), false);
  }
});
