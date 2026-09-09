"use strict";

const { createHash } = require("crypto");
const { pipeline } = require("./redis");
const DEVICE_BINDING_SECONDS = 14 * 24 * 60 * 60;
const CLAIM_DEVICE_SCRIPT = `
local owner = redis.call('GET', KEYS[1])
if owner and owner ~= ARGV[1] then return 0 end
redis.call('SET', KEYS[1], ARGV[1], 'EX', ARGV[2])
return 1
`;

async function claimDailyPokerDevice(deviceId, accountId, run = pipeline) {
  if (!deviceId || !accountId) return false;
  const digest = createHash("sha256").update(String(deviceId)).digest("hex");
  const rows = await run([["EVAL", CLAIM_DEVICE_SCRIPT, "1",
    "poker_app:daily_poker_device_owner:v1:" + digest,
    String(accountId), String(DEVICE_BINDING_SECONDS)]], {
    context: "daily-poker.device-owner", throwOnError: true,
  });
  if (!rows || !rows[0] || rows[0].error || ![0, 1].includes(rows[0].result)) {
    throw new Error("Could not verify daily poker device ownership");
  }
  return rows[0].result === 1;
}

module.exports = { claimDailyPokerDevice, DEVICE_BINDING_SECONDS };
