"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const fs = require("node:fs");

function setup() {
  const members = new Set();
  const messages = [];
  let reachable = true;
  const pipeline = async (commands) => commands.map(([cmd, key, id]) => {
    if (cmd === "SISMEMBER") return { result: Number(members.has(id)) };
    if (cmd === "SADD") members.add(id);
    if (cmd === "SREM") members.delete(id);
    return { result: 1 };
  });
  const deps = {
    "./redis": { pipeline, sscanall: async () => [...members] },
    "./account-id": { getPreferredUserIdByDtId: async () => "tg_42" },
    "./telegram-participation-gate": { canReachTelegramBot: async () => reachable },
    "./telegram-bot-send": { sendTelegramMessage: async (token, msg) => { messages.push(msg); return { ok: true }; } },
    "./bot-subscription-events": { hasAnyBotSubscription: async () => false, recordBotSubscriptionTransition: async () => {} },
  };
  const context = { module: { exports: {} }, require: (id) => deps[id], process: { env: {} }, URL, console };
  vm.runInNewContext(fs.readFileSync(require.resolve("../lib/tournament-bet-subscriptions"), "utf8"), context);
  return { api: context.module.exports, members, messages, setReachable: (value) => { reachable = value; } };
}
const auth = { ok: true, memberId: "tg_123", identity: { id: 123 } };

test("subscription persists, is idempotent, and can be disabled", async () => {
  const { api, members } = setup();
  assert.equal(await api.status(auth, "ID123456"), false);
  await api.subscribe(auth, "ID123456", true, "token");
  await api.subscribe(auth, "ID123456", true, "token");
  assert.equal(members.size, 1);
  assert.equal(await api.status(auth, "ID123456"), true);
  await api.subscribe(auth, "ID123456", false, "token");
  assert.equal(await api.status(auth, "ID123456"), false);
});

test("unreachable bot does not create a subscription; unauthenticated status is false", async () => {
  const { api, members, setReachable } = setup();
  setReachable(false);
  assert.equal((await api.subscribe(auth, "ID123456", true, "token")).ok, false);
  assert.equal(members.size, 0);
  assert.equal(await api.status({ ok: false }, ""), false);
});

test("new events notify only subscribers with an event deep link and stake", async () => {
  const { api, messages } = setup();
  await api.subscribe(auth, "ID123456", true, "token");
  await api.notify({ id: "tb_test_1", title: "Magic MKO", stakePrice: 500, tournamentTime: "18:00", createdByPlayer: true }, "token");
  assert.equal(messages.length, 1);
  assert.equal(messages[0].chat_id, "123");
  assert.match(messages[0].text, /Сумма ставки: 500 ₽/);
  assert.match(messages[0].text, /Личная ставка/);
  assert.equal(new URL(messages[0].buttonUrl).searchParams.get("startapp"), "tournament_bet_tb_test_1");
  await api.subscribe(auth, "ID123456", false, "token");
  await api.notify({ id: "tb_test_2", title: "Next", stakePrice: 100 }, "token");
  assert.equal(messages.length, 1);
});

test("new participant notifies existing event players once, without section subscription", async () => {
  const { api, messages } = setup();
  const newcomer = { accountId: "ID000003", memberId: "tg_333", name: "New Nick" };
  const event = { id: "tb_join", title: "Magic MKO", entries: [
    { accountId: "ID000001", memberId: "tg_111" },
    { accountId: "ID000002", memberId: "tg_222" },
    { accountId: "ID000004", memberId: "tg_111" }, newcomer,
  ] };
  await api.notifyParticipantJoined(event, newcomer, 9500, "token");
  assert.deepEqual(messages.map((msg) => msg.chat_id), ["111", "222"]);
  assert.match(messages[0].text, /Новый участник «New Nick» сделал ставку на себя/);
  assert.match(messages[0].text.replace(/\u00a0/g, " "), /Общий банк теперь: 9 500 ₽/);
  assert.match(messages[0].text, /Событие — турнир «Magic MKO»/);
  assert.equal(new URL(messages[0].buttonUrl).searchParams.get("startapp"), "tournament_bet_tb_join");
});

test("first participant has no other participants to notify", async () => {
  const { api, messages } = setup();
  const entry = { accountId: "ID000001", memberId: "tg_111", name: "First" };
  await api.notifyParticipantJoined({ id: "tb_first", title: "Tournament", entries: [entry] }, entry, 500, "token");
  assert.equal(messages.length, 0);
});

test("registration confirmation goes to the entrant with their stake and updated bank", async () => {
  const { api, messages } = setup();
  const entry = { accountId: "ID000003", memberId: "tg_333", stake: 500 };
  await api.notifyRegistration({ id: "tb_registered", title: "Magic MKO", stakePrice: 999 }, entry, 9500, "token");
  assert.equal(messages.length, 1);
  assert.equal(messages[0].chat_id, "333");
  const text = messages[0].text.replace(/\u00a0/g, " ");
  assert.match(text, /Вы зарегистрированы в событии «Ставка на себя» в турнире «Magic MKO»/);
  assert.match(text, /Ваша ставка: 500 ₽/);
  assert.match(text, /Общий банк: 9 500 ₽/);
  assert.equal(new URL(messages[0].buttonUrl).searchParams.get("startapp"), "tournament_bet_tb_registered");
});

test("personal event creator receives confirmation with their initial bank", async () => {
  const { api, messages } = setup();
  const entry = { accountId: "ID000001", memberId: "tg_111", stake: 700 };
  await api.notifyRegistration({ id: "tb_personal", title: "Personal tournament", createdByPlayer: true }, entry, 700, "token");
  assert.equal(messages[0].chat_id, "111");
  assert.match(messages[0].text, /Ваша ставка: 700 ₽/);
  assert.match(messages[0].text, /Общий банк: 700 ₽/);
});
