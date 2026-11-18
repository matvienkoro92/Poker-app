const test = require("node:test");
const assert = require("node:assert/strict");
const { createChatProfileLookupHelpers } = require("../lib/chat-profile-lookups");

test("friend profiles match individual lookups for linked and legacy accounts", async () => {
  const rows = new Map([
    ["dt:tg_456", "ID100001"],
    ["bind:ID100001", "42"],
    ["profile:ID100001", JSON.stringify({ nickname: "Linked" })],
    ["bind:tg_123", "21"],
    ["profile:tg_123", JSON.stringify({ nickname: "Legacy" })],
  ]);
  const commands = [];
  const { getPokerProfileStatusMeta } = createChatProfileLookupHelpers({
    DT_IDS_KEY: "dt",
    POKERPLUS_BIND_HASH_KEY: "bind",
    PROFILE_HASH_KEY: "profile",
    normalizePeerChatUserId: id => String(id).trim(),
    pokerProfileFeeFromCachedProfile: () => null,
    pokerProfileStatusFromCachedProfile: () => ({ level: 1 }),
    redisPipeline: async batch => batch.map(command => {
      commands.push(command);
      return { result: rows.get(command[1] + ":" + command[2]) ?? null };
    }),
  });
  const ids = ["tg_123", "tg_456"];
  const expected = await getPokerProfileStatusMeta(ids);
  assert.equal(expected.tg_123.pokerPlusNickname, "Legacy");
  assert.equal(expected.tg_456.pokerPlusNickname, "Linked");
  commands.length = 0;
  assert.deepEqual(await getPokerProfileStatusMeta(ids, { tg_123: "tg_123", tg_456: "ID100001" }), expected);
  assert.equal(commands.some(([, key]) => key === "dt"), false);
});
