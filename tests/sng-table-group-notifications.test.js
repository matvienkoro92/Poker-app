"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const source = fs.readFileSync(require.resolve("../lib/api-handlers/sng-champions"), "utf8");
const helpers = source.slice(source.indexOf("async function buildTournamentBroadcastNotifications("), source.indexOf("async function buildMatchReadyReminderNotifications(")) +
  source.slice(source.indexOf("async function notifyEntryStatus("), source.indexOf("function entryId("));

for (const action of ["matchStarted", "teamRoundStarted", "matchAdvancedBroadcast"]) {
  for (const duplicate of [false, true]) {
    test(`${action} sends announcement to club once, existing admin target: ${duplicate}`, async () => {
      const calls = [];
      const context = {
        BOT_TOKEN: "test", console,
        SNG_APPLICATION_NOTIFY_USERNAMES: [], ADMIN_USERNAMES: [],
        SNG_APPLICATION_NOTIFY_CHAT_IDS: [], ADMIN_IDS: [],
        telegramChatIdFromMemberId: (id) => id,
        resolveSngApplicationNotifyChatIds: async () => duplicate ? ["123", "-1001227353220"] : ["123"],
        eventChatId: async () => "-1001227353220",
        sngOpenUrl: () => "https://t.me/test?startapp=sng",
        sngBannerUrl: () => "https://example.com/banner.webp",
        sendTelegramMessage: async (_token, options) => { calls.push(options); return { ok: true }; },
      };
      vm.createContext(context);
      vm.runInContext(helpers, context);
      const text = action === "matchAdvancedBroadcast"
        ? "Игрок Monfokon прошёл CD_u_Dymau в стадии «1/16». Прошёл в стадию «1/8»."
        : "Создан стол: Venius — GUCCI.\nПароль стола: 1111";
      const notifications = await context.buildTournamentBroadcastNotifications({ entries: [{ status: "approved", memberId: "123" }] }, action, text);
      for (const notification of notifications) await context.notifyEntryStatus(notification, {});
      assert.equal(calls.length, 2);
      const club = calls.find((call) => call.chatId === "-1001227353220");
      assert.equal(club.text, text);
      assert.equal(club.notificationScope, "sng-application");
      assert.equal(club.imageUrl, "https://example.com/banner.webp");
      assert.equal(club.buttonText, "СНГ Лига чемпионов");
      assert.equal(calls.find((call) => call.chatId === "123").notificationScope, "");
      assert.equal((await context.buildTournamentBroadcastNotifications({ entries: [] }, "otherBroadcast", "Другое сообщение")).length, duplicate ? 2 : 1);
    });
  }
}
