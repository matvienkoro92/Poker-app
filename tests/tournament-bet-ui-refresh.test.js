"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const fs = require("node:fs");

function harness() {
  let resolveGet;
  const requests = [];
  const body = { innerHTML: "draft: 25000 / 750", querySelector: () => ({}) };
  const context = {
    URLSearchParams, Promise,
    window: { location: {}, localStorage: { removeItem() {} }, alert() {} },
    document: { readyState: "loading", addEventListener() {}, querySelector() { return null; } },
    fetch(url, options) {
      requests.push(options);
      if (options.method === "POST") return Promise.resolve({ ok: true, json: async () => ({ ok: true, id: "tb_new", status: "open" }) });
      return new Promise(resolve => { resolveGet = resolve; });
    },
  };
  let source = fs.readFileSync(require.resolve("../app-tournament-bet.js"), "utf8");
  source = source.replace("  window.openTournamentBetModal = open;", `
    window.testApi = { load, post, setup(body) {
      bodyEl = body;
      modal = { querySelector() { return null; } };
      render = function () { body.innerHTML = "rendered"; };
    } };`);
  vm.runInNewContext(source, context);
  context.window.testApi.setup(body);
  return { api: context.window.testApi, body, requests, finishGet() {
    resolveGet({ ok: true, json: async () => ({ ok: true, isAdmin: true }) });
  } };
}

test("background refresh preserves an unfocused admin form", async () => {
  const h = harness();
  const pending = h.api.load(true);
  h.finishGet();
  await pending;
  assert.equal(h.body.innerHTML, "draft: 25000 / 750");
});

test("create during refresh waits and submits the entered amounts once", async () => {
  const h = harness();
  const refresh = h.api.load(true);
  const submission = h.api.post({ action: "create", startingBank: "25000", stakePrice: "750" });
  assert.equal(h.requests.length, 1);
  h.finishGet();
  await refresh;
  const result = await submission;
  assert.equal(result.id, "tb_new");
  assert.equal(h.requests.length, 2);
  assert.deepEqual(JSON.parse(h.requests[1].body), { action: "create", startingBank: "25000", stakePrice: "750" });
  assert.equal(h.body.innerHTML, "rendered");
});
