"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

test("tables API passes occupied and empty seats through and distinguishes missing seating", async () => {
  const seats = Object.fromEntries(Array.from({ length: 9 }, (_, i) => ["pos" + (i + 1), 0]));
  const occupied = { ...seats, pos1: 990919, pos9: "9007199254740993" };
  const rows = [
    { deskId: "130601", playerCount: 2, pos: occupied },
    { deskId: "130602", playerCount: 0, pos: seats },
    { deskId: "130603", playerCount: 3 },
  ];
  const mod = { exports: {} };
  vm.runInNewContext(fs.readFileSync(require.resolve("../lib/pokerplus"), "utf8"), {
    module: mod,
    require: name => name === "./account-id" ? { redisPipeline: async () => [{ result: "test-token" }] }
      : name === "./redis" ? {} : require(name),
    process: { env: { POKERPLUS_MERCHANT_ID: "test", POKERPLUS_SECRET_KEY: "test" } },
    FormData, AbortController, setTimeout, clearTimeout, Buffer,
    fetch: async (url, options) => {
      assert.ok(url.endsWith("/getPlayingTables"));
      assert.equal(options.body.get("token"), "test-token");
      return { ok: true, json: async () => ({ status: 1, data: { list: rows } }) };
    },
  });
  const handlerModule = { exports: {} };
  vm.runInNewContext(fs.readFileSync(require.resolve("../lib/api-handlers/pokerplus-tables"), "utf8"), {
    module: handlerModule, require: () => mod.exports,
  });
  let body;
  const res = { setHeader() {}, status(code) { assert.equal(code, 200); return this; }, json(value) { body = JSON.parse(JSON.stringify(value)); } };
  await handlerModule.exports({ method: "GET" }, res);
  assert.equal(body.ok, true);
  assert.deepEqual(body.tables.map(row => row.pos), [occupied, seats, null]);
  assert.deepEqual(body.tables.map(row => row.playerCount), [2, 0, 3]);
  assert.deepEqual(body.tables.map(row => row.deskId), ["130601", "130602", "130603"]);
});
