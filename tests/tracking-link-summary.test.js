"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { summarize } = require("../lib/tracking-link-summary");
const at = Date.parse("2026-09-30T10:00:00Z");
function row(overrides = {}) {
  return { accountId: "ID123456", status: "new", registrationAt: at,
    context: { first: { ref: "aaaaaaaa", at: at - 1000 } },
    events: [{ ref: "aaaaaaaa", at, type: "section_opened" }], deposits: [], ...overrides };
}
test("automatic views are not engagement; zero denominator has no conversion", () => {
  const result = summarize([row({ accountId: "", status: "guest" })], "aaaaaaaa", 0, "");
  assert.equal(result.visitors, 1);
  assert.equal(result.engaged, 0);
  assert.equal(result.registrations, 0);
  assert.equal(summarize([], "aaaaaaaa", 0, "").depositConversion, null);
});
test("period, verified acquisition, deposits and self exclusion share the same denominator", () => {
  const records = [row({ deposits: [{ at: new Date(at).toISOString(), amount: 500 }] }),
    row({ accountId: "ID654321", status: "returning", events: [{ ref: "aaaaaaaa", at, type: "sng_joined" }] }),
    row({ accountId: "ID111111", events: [{ ref: "aaaaaaaa", at: at - 86400000, type: "section_opened" }] }),
    row({ accountId: "ID222222", context: { first: { ref: "bbbbbbbb" } }, events: [{ ref: "aaaaaaaa", at, type: "section_opened" }] })];
  const result = summarize(records, "aaaaaaaa", at - 1000, "ID222222");
  assert.deepEqual(result, { visitors: 2, registrations: 1, returning: 1, depositors: 1, firstDepositors: 0, depositAmount: 500, engaged: 2, registrationConversion: 50, depositConversion: 50 });
  assert.equal(summarize(records, "aaaaaaaa", at + 1, "").visitors, 0);
  assert.equal(summarize([records[3]], "aaaaaaaa", 0, "").registrations, 0);
});
test("an unrelated campaign event cannot inflate the link's activity", () => {
  assert.equal(summarize([row({ events: [{ ref: "bbbbbbbb", at, type: "sng_joined" }] })], "aaaaaaaa", 0, "").visitors, 0);
});

test("first deposit excludes deposits made before acquisition", () => {
  const deposits = [{ at: new Date(at).toISOString(), amount: 500 }];
  assert.equal(summarize([row({ deposits, firstDepositAt: at })], "aaaaaaaa", 0, "").firstDepositors, 1);
  assert.equal(summarize([row({ deposits, firstDepositAt: at - 10000 })], "aaaaaaaa", 0, "").firstDepositors, 0);
});
