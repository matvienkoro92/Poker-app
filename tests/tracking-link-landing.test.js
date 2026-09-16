"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const fs = require("node:fs");
function setup() {
  const storage = new Map(), timers = [], views = [], requests = [];
  const scope = {
    window: {}, document: { getElementById: () => null, addEventListener() {} },
    sessionStorage: { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value) },
    setTimeout: fn => timers.push(fn), setView: view => views.push(view),
    getVisitorId: () => "visitor_test",
    fetch: async (url, opts) => { requests.push(JSON.parse(opts.body)); return { json: async () => ({ ok: true, recorded: true, link: { params: { target_view: "cashout" } } }) }; },
  };
  vm.runInNewContext(fs.readFileSync(require.resolve("../app-api-tracking.js"), "utf8"), scope);
  scope.getApiBase = () => "https://test.invalid";
  scope.trackLinkSessionEvent = () => {};
  return { scope, storage, timers, views, requests };
}
test("deep landing waits for lazy runtime instead of falling back to home", () => {
  const { scope, timers, views, storage } = setup();
  scope.pokerApplyTrackingLinkLanding({ ref: "ref_aaaaaaaa", params: { target_startapp: "tournament_bet", target_view: "home" } });
  timers.shift()();
  assert.deepEqual(views, []);
  assert.equal(storage.get("poker_session_tracking_landing_applied_aaaaaaaa"), undefined);
  const deep = [];
  scope.window.__pokerApplyStartAppDeepLink = value => deep.push(value);
  timers.shift()();
  assert.deepEqual(deep, ["tournament_bet"]);
  assert.equal(storage.get("poker_session_tracking_landing_applied_aaaaaaaa"), "1");
});
test("view landing waits for navigation and marks success only after opening", () => {
  const { scope, timers, storage } = setup();
  delete scope.setView;
  scope.pokerApplyTrackingLinkLanding({ ref: "ref_aaaaaaaa", params: { target_view: "cashout" } });
  timers.shift()();
  assert.equal(storage.size, 0);
  const views = [];
  scope.setView = view => views.push(view);
  timers.shift()();
  assert.deepEqual(views, ["cashout"]);
});
test("returning from B to A resolves A instead of applying the cached B context", async () => {
  const { scope, storage, requests } = setup();
  storage.set("poker_track_ref_aaaaaaaa", "1");
  scope.pokerSaveTrackingLinkContext("ref_bbbbbbbb", { params: { target_view: "download" } });
  scope.recordTrackingLinkHit("ref_aaaaaaaa");
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(requests.length, 1);
  assert.equal(requests[0].ref, "ref_aaaaaaaa");
  assert.equal(scope.pokerGetTrackingLinkContext().ref, "ref_aaaaaaaa");
  assert.equal(scope.pokerGetTrackingLinkContext().params.target_view, "cashout");
  scope.recordTrackingLinkHit("ref_aaaaaaaa");
  assert.equal(requests.length, 1, "repeated initialization of the same link does not count a second hit");
});
