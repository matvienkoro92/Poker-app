"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { claimDailyPokerDevice, DEVICE_BINDING_SECONDS } = require("../lib/daily-poker-device-guard");

test("device claims use an atomic operation and a fourteen-day expiry", async () => {
  let command;
  assert.equal(await claimDailyPokerDevice("device-123", "ID123456", async (commands, options) => {
    command = commands[0];
    assert.equal(options.throwOnError, true);
    return [{ result: 1 }];
  }), true);
  assert.equal(command[0], "EVAL");
  assert.equal(command[4], "ID123456");
  assert.equal(command[5], String(14 * 86400));
  assert.equal(DEVICE_BINDING_SECONDS, 1209600);
  assert.ok(!command[3].includes("device-123"));
});

test("another device owner is rejected", async () => {
  assert.equal(await claimDailyPokerDevice("device-123", "ID654321", async () => [{ result: 0 }]), false);
});

test("missing identity and Redis errors never allow a spin", async () => {
  const unexpected = () => { throw new Error("unexpected Redis call"); };
  assert.equal(await claimDailyPokerDevice("", "ID123456", unexpected), false);
  assert.equal(await claimDailyPokerDevice("device-123", "", unexpected), false);
  for (const response of [null, [], [{ error: "unavailable" }], [{ result: null }]]) {
    await assert.rejects(claimDailyPokerDevice("device-123", "ID123456", async () => response));
  }
  await assert.rejects(claimDailyPokerDevice("device-123", "ID123456", async () => { throw new Error("offline"); }));
});
