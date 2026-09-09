"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const redis = require("../lib/redis");
const original = redis.pipeline;
let result = [];
let commands;
redis.pipeline = async (input) => { commands = input; return result; };
const { blockedIdentityField, rejectBlockedRequestIdentity, isAppUserBlocked } = require("../lib/app-user-blocks");
redis.pipeline = original;

test("identity hashes are scoped by type and do not disclose device IDs", () => {
  assert.equal(blockedIdentityField("device", ""), "");
  assert.notEqual(blockedIdentityField("device", "123"), blockedIdentityField("poker21", "123"));
  assert.equal(blockedIdentityField("poker21", " ABC "), blockedIdentityField("poker21", "abc"));
  assert.notEqual(blockedIdentityField("device", "ABC"), blockedIdentityField("device", "abc"));
});
test("known banned device is rejected before account creation", async () => {
  result = [{ result: ["ID302339"] }];
  let status; let payload;
  const res = { status(code) { status = code; return this; }, json(data) { payload = data; } };
  assert.equal(await rejectBlockedRequestIdentity({ body: { guestDeviceId: "known-device" } }, res), true);
  assert.equal(status, 403);
  assert.equal(payload.code, "APP_USER_BLOCKED");
  assert.equal(commands[0][2], blockedIdentityField("device", "known-device"));
  result = [{ result: [null] }];
  assert.equal(await rejectBlockedRequestIdentity({ query: { guestDeviceId: "another-device" } }, res), false);
  assert.equal(await rejectBlockedRequestIdentity({}, res), false);
});
