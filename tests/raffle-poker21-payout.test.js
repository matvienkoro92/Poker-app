"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
process.env.RAFFLE_POKER21_AUTO_PAYOUT_ENABLED = "true";
const raffles = require("../lib/api-handlers/raffles")._test;

test("cash raffle payout derives a stable payment identity from raffle and winner slot", () => {
  const raffle = { prizeKind: "cash", groups: [{ prize: "Беккинг-байин 1 000 ₽ на кеш" }] };
  const winner = { p21Id: "208238", groupIndex: 0, winnerReadySlotId: "initial_0" };
  assert.deepEqual(raffles.raffleWinnerPoker21PayoutSpec("raffle_123", raffle, winner), {
    userId: "208238",
    amount: 1000,
    prize: "Беккинг-байин 1 000 ₽ на кеш",
    slotId: "initial_0",
    idempotencyKey: "raffle:raffle_123:winner:initial_0:cash-prize",
  });
});

test("explicit cash raffle accepts a plain numeric nominal from the compact admin form", () => {
  const raffle = { prizeKind: "cash", groups: [{ prize: "300" }] };
  const winner = { p21Id: "208238", groupIndex: 0, winnerReadySlotId: "initial_0" };
  const payout = raffles.raffleWinnerPoker21PayoutSpec("raffle_numeric", raffle, winner);
  assert.equal(payout.amount, 300);
  assert.equal(payout.userId, "208238");
});

test("cash raffle payout refuses missing Poker21 IDs and ambiguous amounts", () => {
  assert.throws(() => raffles.raffleWinnerPoker21PayoutSpec("raffle_123", { groups: [{ prize: "Кеш" }] }, {
    groupIndex: 0,
    winnerReadySlotId: "initial_0",
  }), /Poker21 ID/);
  assert.throws(() => raffles.raffleWinnerPoker21PayoutSpec("raffle_123", { groups: [{ prize: "Кеш без суммы" }] }, {
    p21Id: "208238",
    groupIndex: 0,
    winnerReadySlotId: "initial_0",
  }), /определить сумму/);
});

test("ticket and ambiguous raffles can never trigger Poker21 cash payouts", () => {
  assert.equal(raffles.raffleUsesPoker21CashPayout({
    prizeKind: "cash",
    title: "Розыгрыш на кеш",
    groups: [{ prize: "Беккинг-байин 1 000 ₽ на кеш" }],
  }, {}), true);
  assert.equal(raffles.raffleUsesPoker21CashPayout({
    prizeKind: "tournament_ticket",
    title: "Билет на турнир 1 000 ₽",
    groups: [{ prize: "Билет 1 000 ₽" }],
  }, {}), false);
  assert.equal(raffles.raffleUsesPoker21CashPayout({
    title: "Слово кеш случайно попало в название билета",
    groups: [{ prize: "Турнирный билет 1 000 ₽" }],
  }, {}), false);
});
