"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

function loadPokerPlusWithFetch(responses) {
  process.env.POKERPLUS_MERCHANT_ID = "merchant-test";
  process.env.POKERPLUS_SECRET_KEY = "secret-test";
  delete require.cache[require.resolve("../lib/pokerplus")];
  const calls = [];
  global.fetch = async function (url, options) {
    calls.push({ url: String(url), form: Object.fromEntries(options.body.entries()) });
    const payload = responses.shift();
    return { ok: true, status: 200, json: async () => payload };
  };
  return { api: require("../lib/pokerplus"), calls };
}

test("changeGroupMemberChips sends a signed positive or negative chip delta", async (t) => {
  const previousFetch = global.fetch;
  t.after(() => { global.fetch = previousFetch; });
  const fixture = loadPokerPlusWithFetch([
    { status: 1, data: { token: "token-test" } },
    { status: 1, data: [] },
  ]);

  const result = await fixture.api.changeGroupMemberChips({ userId: "990919", chips: -100, orderId: "12345678901234567890" });
  assert.deepEqual(result, { userId: "990919", chips: -100, orderId: "12345678901234567890" });
  assert.equal(fixture.calls[1].url.endsWith("/changeGroupMemberChips"), true);
  assert.deepEqual(fixture.calls[1].form, { userId: "990919", chips: "-100", orderId: "12345678901234567890", token: "token-test" });
});

test("changeGroupMemberChips requires the documented 20-digit order ID", async (t) => {
  const previousFetch = global.fetch;
  t.after(() => { global.fetch = previousFetch; });
  const fixture = loadPokerPlusWithFetch([]);
  await assert.rejects(
    fixture.api.changeGroupMemberChips({ userId: "990919", chips: 1, orderId: "short" }),
    /exactly 20 digits/
  );
  assert.equal(fixture.calls.length, 0);
});

test("agentSendChipsToPlayer rejects deductions before calling Poker21", async (t) => {
  const previousFetch = global.fetch;
  t.after(() => { global.fetch = previousFetch; });
  const fixture = loadPokerPlusWithFetch([]);
  await assert.rejects(
    fixture.api.agentSendChipsToPlayer({ agentId: "85956", userId: "89779", chips: -1 }),
    /greater than zero/
  );
  assert.equal(fixture.calls.length, 0);
});

test("getAgentBalances normalizes the documented balance response", async (t) => {
  const previousFetch = global.fetch;
  t.after(() => { global.fetch = previousFetch; });
  const fixture = loadPokerPlusWithFetch([
    { status: 1, data: { token: "token-test" } },
    { status: 1, data: { group_id: "1072", user_id: "85956", position: "3", group_gold: "36480192", group_gold_limit: "248900" } },
  ]);

  const result = await fixture.api.getAgentBalances({ agentId: "85956" });
  assert.deepEqual(result, {
    agentId: "85956",
    groupId: "1072",
    userId: "85956",
    position: "3",
    chips: 36480192,
    points: 248900,
  });
});
