"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync(require.resolve("../lib/api-handlers/sng-champions"), "utf8");
const start = source.indexOf("function participantPairListName(");
const end = source.indexOf("function entryPublicName(", start);
const helpers = source.slice(start, end);

test("forming pairs publishes the full first round to the Two Aces club chat", async function () {
  const calls = [];
  const context = {
    BOT_TOKEN: "test-token",
    DEFAULT_TITLE: "СНГ",
    console,
    cleanText: (value, max) => String(value || "").slice(0, max),
    participantDisplayName: (_state, id) => ({ a: "Ярый", b: "Мажор", c: "Гучи" }[id] || id),
    participantTeamMembersText: () => "",
    playableIds: (match) => match.playerIds.filter(Boolean),
    eventChatId: async () => "-1001227353220",
    sngOpenUrl: () => "https://t.me/Poker_dvatuza_bot/DvaTuza?startapp=sng_champions",
    sendTelegramMessage: async (_token, options) => { calls.push(options); return { ok: true }; },
  };
  vm.createContext(context);
  vm.runInContext(helpers, context);
  const state = {
    title: "3-й СНГ-баттл",
    rounds: [{ index: 1, matches: [{ playerIds: ["a", "b"] }, { playerIds: ["c", null] }] }],
  };

  await context.notifyClubRoundOnePairs(state);

  assert.equal(calls.length, 1);
  assert.equal(calls[0].chatId, "-1001227353220");
  assert.equal(calls[0].notificationScope, "sng-application");
  assert.equal(calls[0].buttonText, "Открыть пары");
  assert.match(calls[0].text, /1\. Ярый — Мажор/);
  assert.match(calls[0].text, /2\. Гучи — проходит без игры/);
  assert.match(calls[0].text, /нажмите «Готов», чтобы получить пароль от стола/);
});

test("club pairs notification is requested only by initial formPairs", function () {
  const formPairs = source.slice(source.indexOf('} else if (action === "formPairs")'), source.indexOf('} else if (action === "formTeams")'));
  const rebroadcast = source.slice(source.indexOf('} else if (action === "broadcastRoundOnePairs")'), source.indexOf('} else if (action === "setReady")'));
  assert.match(formPairs, /clubRoundOnePairsNotificationRequested = true/);
  assert.doesNotMatch(rebroadcast, /clubRoundOnePairsNotificationRequested = true/);
});
