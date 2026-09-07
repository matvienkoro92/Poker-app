#!/usr/bin/env node
"use strict";

const assert = require("assert");
const {
  applyAttemptToState,
  applyTicketlessStreakToState,
  createDeck,
  evaluateSevenCardHand,
  evaluateDailyPokerHand,
  getAttemptsLeft,
  getNextAttemptType,
  nextFreeAttemptAt,
  publicStatePayload,
  rewardForHandRank,
  rewardForDailyPokerHand,
} = require("../lib/daily-poker");
const { buildBonusLedgerEntry } = require("../lib/bonus-ledger");
const promoInternals = require("../lib/api-handlers/promo")._internals;

function c(rank, suit) {
  return { rank, suit };
}

function rank(cards) {
  return evaluateSevenCardHand(cards).rank;
}

function testDeck() {
  const deck = createDeck();
  assert.strictEqual(deck.length, 52, "deck has 52 cards");
  assert.strictEqual(new Set(deck.map((card) => card.rank + card.suit)).size, 52, "deck has no duplicates");
}

function testHandRanks() {
  assert.strictEqual(rank([
    c("A", "spades"), c("K", "spades"), c("Q", "spades"), c("J", "spades"), c("10", "spades"), c("3", "hearts"), c("8", "clubs"),
  ]), "royal_flush", "royal flush");
  assert.strictEqual(rank([
    c("9", "hearts"), c("8", "hearts"), c("7", "hearts"), c("6", "hearts"), c("5", "hearts"), c("A", "clubs"), c("2", "spades"),
  ]), "straight_flush", "straight flush");
  assert.strictEqual(rank([
    c("9", "hearts"), c("9", "clubs"), c("9", "spades"), c("9", "diamonds"), c("5", "hearts"), c("A", "clubs"), c("2", "spades"),
  ]), "four_of_a_kind", "four of a kind");
  assert.strictEqual(rank([
    c("K", "hearts"), c("K", "clubs"), c("K", "spades"), c("5", "diamonds"), c("5", "hearts"), c("A", "clubs"), c("2", "spades"),
  ]), "full_house", "full house");
  assert.strictEqual(rank([
    c("A", "clubs"), c("J", "clubs"), c("9", "clubs"), c("6", "clubs"), c("2", "clubs"), c("K", "hearts"), c("8", "spades"),
  ]), "flush", "flush");
  assert.strictEqual(rank([
    c("9", "hearts"), c("8", "clubs"), c("7", "spades"), c("6", "diamonds"), c("5", "hearts"), c("A", "clubs"), c("2", "spades"),
  ]), "straight", "straight");
  assert.strictEqual(rank([
    c("A", "hearts"), c("2", "clubs"), c("3", "spades"), c("4", "diamonds"), c("5", "hearts"), c("K", "clubs"), c("9", "spades"),
  ]), "straight", "wheel straight");
  assert.strictEqual(rank([
    c("Q", "hearts"), c("Q", "clubs"), c("Q", "spades"), c("4", "diamonds"), c("8", "hearts"), c("A", "clubs"), c("2", "spades"),
  ]), "three_of_a_kind", "three of a kind");
  assert.strictEqual(rank([
    c("Q", "hearts"), c("Q", "clubs"), c("8", "spades"), c("8", "diamonds"), c("4", "hearts"), c("A", "clubs"), c("2", "spades"),
  ]), "two_pair", "two pair");
  assert.strictEqual(rank([
    c("Q", "hearts"), c("Q", "clubs"), c("8", "spades"), c("7", "diamonds"), c("4", "hearts"), c("A", "clubs"), c("2", "spades"),
  ]), "pair", "pair");
  assert.strictEqual(rank([
    c("A", "hearts"), c("K", "clubs"), c("8", "spades"), c("7", "diamonds"), c("4", "hearts"), c("3", "clubs"), c("2", "spades"),
  ]), "high_card", "high card");
}

function testHoleCardContribution() {
  const cards = (text) => text.split(" ").map((token) => ({
    rank: token[0] === "T" ? "10" : token[0],
    suit: { s: "spades", h: "hearts", d: "diamonds", c: "clubs" }[token[1]],
  }));
  const cases = [
    ["board straight", "As Kd", "4s 5h 6c 7d 8s", "straight", false],
    ["equal straight replacing a board rank", "7s Kd", "4s 5h 6c 7d 8s", "straight", false],
    ["higher straight", "9s Kd", "4s 5h 6c 7d 8s", "straight", true],
    ["wheel made with hole ace", "As Kd", "2s 3h 4c 5d 9s", "straight", true],
    ["board wheel", "Ac Kd", "As 2h 3c 4d 5s", "straight", false],
    ["board flush with low suited hole", "2s Kd", "4s 6s 8s Ts Qs", "flush", false],
    ["better flush of same category", "As Kd", "4s 6s 8s Ts Qs", "flush", true],
    ["board full house improved to quads", "Ac Kd", "Ah Ad As Kh Ks", "four_of_a_kind", true],
    ["same board full house", "Kc Qd", "Ah Ad As Kh Ks", "full_house", false],
    ["higher full house", "3c Qd", "2h 2d 2s 3h 3s", "full_house", true],
    ["board quads even with better kicker", "Ac Qd", "2h 2d 2s 2c 3s", "four_of_a_kind", false],
    ["quads made with hole card", "2c Qd", "2h 2d 2s 3c 4s", "four_of_a_kind", true],
    ["board trips even with better kicker", "Ac Qd", "2h 2d 2s 3c 4s", "three_of_a_kind", false],
    ["trips made with hole card", "2c Qd", "2h 2d 5s 3c 4s", "three_of_a_kind", true],
    ["board trips improved to full house", "Ac Ad", "2h 2d 2s 3c 4s", "full_house", true],
    ["board royal flush", "Ac Kd", "Ts Js Qs Ks As", "royal_flush", false],
    ["royal flush made with hole card", "As Kd", "Ts Js Qs Ks 2h", "royal_flush", true],
    ["board straight flush", "Ac Kd", "4s 5s 6s 7s 8s", "straight_flush", false],
    ["better straight flush", "9s Kd", "4s 5s 6s 7s 8s", "straight_flush", true],
  ];
  for (const [label, hole, board, rank, contributes] of cases) {
    const evaluated = evaluateDailyPokerHand(cards(hole), cards(board));
    assert.strictEqual(evaluated.rank, rank, label);
    assert.strictEqual(evaluated.holeCardsContribute, contributes, label);
    const reward = rewardForDailyPokerHand(evaluated, {});
    if (contributes) assert.deepStrictEqual(reward, rewardForHandRank(rank, {}), label + " keeps ordinary reward");
    else {
      assert.strictEqual(reward.bonusAmount, 0, label + " gives no bonus");
      assert.strictEqual(reward.ticketAmount, 0, label + " gives no ticket");
      assert.strictEqual(reward.grantsExtraAttempt, false, label + " gives no extra attempt");
      const streak = applyTicketlessStreakToState({ ticketlessStreak: 5, ticketlessStreakAt: "2026-09-05T12:00:00Z" }, "base", reward, "2026-09-06T12:00:00Z", "2026-09-06", 10);
      assert.strictEqual(streak.state.ticketlessStreak, 6, "unpaid board combination does not reset a losing series");
      assert.ok(promoInternals.prizeTextForHand(rank, reward, null).includes("не начисляется"));
    }
  }
  assert.throws(() => evaluateDailyPokerHand(cards("As Kd"), cards("As 2h 3c 4d 5s")), /duplicate card/);
}

function playPure(state, handRank, nowIso) {
  const now = nowIso || "2026-05-22T12:00:00.000Z";
  const attemptType = getNextAttemptType(state, now);
  assert.ok(attemptType, "attempt is available");
  const reward = rewardForHandRank(handRank, attemptType === "base" ? {} : state);
  const next = applyAttemptToState(state, attemptType, reward, now);
  return { attemptType, reward, state: next };
}

function gameDateFromIso(iso) {
  return String(iso || "").slice(0, 10);
}

function testAttemptEconomy() {
  const now = "2026-05-22T12:00:00.000Z";
  let state = {};
  assert.strictEqual(getAttemptsLeft(state, now), 1, "user can play a free hand");
  let first = playPure(state, "high_card", now);
  state = first.state;
  assert.strictEqual(getAttemptsLeft(state, "2026-05-23T11:59:59.000Z"), 0, "second free play before 24h is blocked");
  assert.strictEqual(nextFreeAttemptAt(state), "2026-05-23T12:00:00.000Z", "next free play is 24h after the base hand");
  assert.strictEqual(getAttemptsLeft(state, "2026-05-23T12:00:00.000Z"), 1, "free play unlocks exactly 24h after the base hand");

  state = {};
  first = playPure(state, "three_of_a_kind", now);
  assert.strictEqual(first.reward.grantsExtraAttempt, true, "set grants extra attempt");
  assert.strictEqual(getAttemptsLeft(first.state, "2026-05-22T12:05:00.000Z"), 1, "extra attempt is available");
  const setPayload = publicStatePayload(first.state, { serverTime: "2026-05-22T12:05:00.000Z" }, 0);
  assert.strictEqual(setPayload.attemptsLeft, 1, "set keeps one playable attempt in the public counter");
  assert.strictEqual(setPayload.extraAttemptGrantedToday, true, "set marks the extra attempt in public state");
  const extra = playPure(first.state, "straight", "2026-05-22T12:05:00.000Z");
  assert.strictEqual(extra.attemptType, "extra", "extra attempt is used after base");
  assert.strictEqual(extra.reward.grantsExtraAttempt, false, "extra attempt cannot create an infinite chain");
  assert.strictEqual(extra.reward.bonusAmount, 50, "straight on an extra attempt still credits 50 bonuses");
  assert.strictEqual(getAttemptsLeft(extra.state, "2026-05-22T12:06:00.000Z"), 0, "extra attempt cannot be issued twice");
  assert.strictEqual(getNextAttemptType(extra.state, "2026-05-23T12:05:00.000Z"), "base", "next base attempt is available 24h after the original base hand");

  state = {};
  first = playPure(state, "straight", now);
  assert.strictEqual(first.reward.grantsExtraAttempt, true, "straight grants extra attempt");
  assert.strictEqual(first.reward.bonusAmount, 50, "straight gives 50 bonuses");

  state = {};
  first = playPure(state, "flush", now);
  assert.strictEqual(first.reward.grantsExtraAttempt, true, "flush grants extra attempt");
  assert.strictEqual(first.reward.bonusAmount, 50, "flush gives 50 bonuses");
  const flushExtra = playPure(first.state, "flush", "2026-05-22T12:05:00.000Z");
  assert.strictEqual(flushExtra.reward.grantsExtraAttempt, false, "second flush does not grant another extra attempt");
  assert.strictEqual(flushExtra.reward.bonusAmount, 50, "second flush still credits bonus reward through ledger");
}

function testTicketlessStreak() {
  let state = {};
  let streakReward = null;
  for (let day = 0; day < 6; day += 1) {
    const iso = new Date(Date.UTC(2026, 4, 1 + day, 12, 0, 0)).toISOString();
    const reward = rewardForHandRank("high_card", {});
    const afterAttempt = applyAttemptToState(state, "base", reward, iso);
    const streak = applyTicketlessStreakToState(afterAttempt, "base", reward, iso, gameDateFromIso(iso), 10);
    state = streak.state;
    streakReward = streak.streakReward;
    assert.strictEqual(state.ticketlessStreak, day + 1, "ticketless streak grows for base hands without tickets");
    assert.strictEqual(streakReward, null, "ticketless streak is not paid before day 7");
  }
  const seventhIso = "2026-05-07T12:00:00.000Z";
  const noPrize = rewardForHandRank("pair", {});
  const seventhAttempt = applyAttemptToState(state, "base", noPrize, seventhIso);
  const seventh = applyTicketlessStreakToState(seventhAttempt, "base", noPrize, seventhIso, gameDateFromIso(seventhIso), 10);
  assert.strictEqual(seventh.awarded, true, "seventh ticketless base hand pays the consolation ticket");
  assert.strictEqual(seventh.streakReward.ticketAmount, 300, "ticketless streak reward is a 300 ticket");
  assert.strictEqual(seventh.state.ticketlessStreak, 0, "ticketless streak resets after the 300 ticket");

  const repeatSameDate = applyTicketlessStreakToState(seventh.state, "base", noPrize, seventhIso, gameDateFromIso(seventhIso), 10);
  assert.strictEqual(repeatSameDate.state.ticketlessStreak, 0, "same date cannot increment the streak twice");

  const extraNoTicket = applyTicketlessStreakToState(seventh.state, "extra", noPrize, "2026-05-08T12:00:00.000Z", "2026-05-08");
  assert.strictEqual(extraNoTicket.state.ticketlessStreak, 0, "extra attempts without tickets do not increment the daily streak");

  state = { ticketlessStreak: 4, ticketlessStreakAt: "2026-05-10T12:00:00.000Z", ticketlessStreakGameDate: "2026-05-10" };
  const ticketReward = rewardForHandRank("full_house", {});
  const ticketAttempt = applyAttemptToState(state, "base", ticketReward, "2026-05-11T12:00:00.000Z");
  const reset = applyTicketlessStreakToState(ticketAttempt, "base", ticketReward, "2026-05-11T12:00:00.000Z", "2026-05-11");
  assert.strictEqual(reset.state.ticketlessStreak, 0, "any ticket reward resets the ticketless streak");

  state = { ticketlessStreak: 3, ticketlessStreakAt: "2026-05-01T12:00:00.000Z", ticketlessStreakGameDate: "2026-05-01" };
  const lateIso = "2026-05-05T12:00:00.000Z";
  const lateAttempt = applyAttemptToState(state, "base", noPrize, lateIso);
  const late = applyTicketlessStreakToState(lateAttempt, "base", noPrize, lateIso, "2026-05-05");
  assert.strictEqual(late.state.ticketlessStreak, 1, "missed days restart the ticketless streak");
}

function testRewardsAndLedger() {
  assert.strictEqual(rewardForHandRank("full_house", {}).ticketAmount, 300, "full house ticket 300");
  assert.strictEqual(rewardForHandRank("four_of_a_kind", {}).ticketAmount, 800, "four of a kind ticket 800");
  assert.strictEqual(rewardForHandRank("straight_flush", {}).ticketAmount, 3000, "straight flush ticket 3000");
  assert.strictEqual(rewardForHandRank("royal_flush", {}).ticketAmount, 10000, "royal flush ticket 10000");
  assert.strictEqual(rewardForHandRank("four_of_a_kind", {}).title, "Билет за 800 ₽", "four of a kind ticket title matches prize card");
  assert.strictEqual(rewardForHandRank("straight_flush", {}).bonusAmount, 0, "straight flush is not paid as a flush");
  assert.strictEqual(rewardForHandRank("straight", {}).bonusAmount, 50, "straight is paid like a flush");
  const promo = buildBonusLedgerEntry({
    userId: "ID100001",
    amount: 50,
    direction: "credit",
    operationType: "promo_reward",
    balanceBefore: 100,
    source: "daily_poker_flush",
    sourceId: "game1",
  });
  assert.strictEqual(promo.balance_after, 150, "bonuses are credited through ledger entry");
  const ticket = buildBonusLedgerEntry({
    userId: "ID100001",
    amount: 500,
    direction: "credit",
    operationType: "promo_ticket",
    balanceBefore: 150,
    source: "daily_poker_ticket",
    sourceId: "ticket1",
  });
  assert.strictEqual(ticket.balance_after, 650, "ticket rewards are credited through ledger entry");
  assert.strictEqual(ticket.operation_type, "promo_ticket", "ticket reward uses ticket operation type");
  assert.throws(() => buildBonusLedgerEntry({
    userId: "ID100001",
    amount: 101,
    direction: "debit",
    operationType: "admin_debit",
    balanceBefore: 100,
  }), /insufficient_bonus_balance/, "admin cannot debit more than balance");
  const debit = buildBonusLedgerEntry({
    userId: "ID100001",
    amount: 40,
    direction: "debit",
    operationType: "admin_debit",
    balanceBefore: 100,
    adminId: "tg_admin",
  });
  assert.strictEqual(debit.balance_after, 60, "admin debit creates ledger entry with new balance");
  assert.throws(() => buildBonusLedgerEntry({
    userId: "ID100001",
    amount: 0,
    direction: "credit",
    operationType: "admin_credit",
    balanceBefore: 100,
  }), /amount_must_be_positive/, "zero bonus operation is rejected");
}

function testTicketlessStreakLevelGate() {
  const state = { ticketlessStreak: 6, ticketlessStreakAt: "2026-09-05T12:00:00.000Z", ticketlessStreakGameDate: "2026-09-05" };
  const iso = "2026-09-06T12:00:00.000Z";
  for (const level of [undefined, null, 0, 1, 9, NaN, Infinity]) {
    const handReward = rewardForHandRank("pair", {});
    const result = applyTicketlessStreakToState(state, "base", handReward, iso, "2026-09-06", level);
    assert.strictEqual(result.awarded, false, "unqualified or unknown level cannot receive the streak ticket");
    assert.strictEqual(result.streakReward, null, "no ticket to credit to the ledger below level 10");
    assert.strictEqual(result.state.ticketlessStreak, 0, "completed ineligible series does not bank a future payout");
    const next = applyTicketlessStreakToState(result.state, "base", rewardForHandRank("pair", {}), "2026-09-07T12:00:00.000Z", "2026-09-07", 10);
    assert.strictEqual(next.awarded, false, "reaching level 10 does not pay a completed ineligible series retroactively");
    assert.strictEqual(next.state.ticketlessStreak, 1);
  }
  for (const level of [10, 11, 100]) {
    const result = applyTicketlessStreakToState(state, "base", rewardForHandRank("pair", {}), iso, "2026-09-06", level);
    assert.strictEqual(result.streakReward.ticketAmount, 300, "level 10 and above receives exactly 300");
    assert.strictEqual(result.awarded, true);
    assert.strictEqual(result.state.ticketlessStreak, 0);
    const extra = applyTicketlessStreakToState(state, "extra", rewardForHandRank("pair", {}), iso, "2026-09-06", level);
    assert.strictEqual(extra.awarded, false, "level 10 does not bypass base-attempt requirement");
    const ticket = applyTicketlessStreakToState(state, "base", rewardForHandRank("full_house", {}), iso, "2026-09-06", level);
    assert.strictEqual(ticket.awarded, false, "winning a regular ticket resets the series without a second ticket");
  }
}

function testBonusResetsStreak() {
  const state = { ticketlessStreak: 6, ticketlessStreakAt: "2026-09-05T12:00:00.000Z", ticketlessStreakGameDate: "2026-09-05" };
  for (const rank of ["straight", "flush"]) {
    for (const type of ["base", "extra"]) {
      const reward = rewardForHandRank(rank, type === "extra" ? { extraAttemptGranted: true } : {});
      const result = applyTicketlessStreakToState(state, type, reward, "2026-09-06T12:00:00.000Z", "2026-09-06", 10);
      assert.strictEqual(result.state.ticketlessStreak, 0, rank + " resets the series on " + type);
      assert.strictEqual(result.awarded, false, "50 bonus cannot be combined with the 300 streak ticket");
      assert.strictEqual(result.streakReward, null);
      assert.strictEqual(reward.bonusAmount, 50, "ordinary bonus is unchanged");
      assert.strictEqual(reward.grantsExtraAttempt, type === "base", "ordinary extra-attempt rule is unchanged");
      const sameDateWin = applyTicketlessStreakToState({ ...state, ticketlessStreakGameDate: "2026-09-06" }, type, reward, "2026-09-06T12:00:00.000Z", "2026-09-06", 10);
      assert.strictEqual(sameDateWin.state.ticketlessStreak, 0, "same-date guard never prevents a prize from resetting the series");
      const sameDay = applyTicketlessStreakToState(result.state, "base", rewardForHandRank("pair", {}), "2026-09-06T13:00:00.000Z", "2026-09-06", 10);
      assert.strictEqual(sameDay.state.ticketlessStreak, 0, "same-day hand cannot restart a reset series");
      const nextDay = applyTicketlessStreakToState(result.state, "base", rewardForHandRank("pair", {}), "2026-09-07T12:00:00.000Z", "2026-09-07", 10);
      assert.strictEqual(nextDay.state.ticketlessStreak, 1, "next losing day starts a new series");
    }
  }
  const set = applyTicketlessStreakToState(state, "base", rewardForHandRank("three_of_a_kind", {}), "2026-09-06T12:00:00.000Z", "2026-09-06", 10);
  assert.strictEqual(set.awarded, true, "an extra attempt without balance credit does not reset the series");
}

function testPrizeMessages() {
  const ticketMessage = promoInternals.prizeTextForHand("full_house", rewardForHandRank("full_house", {}), null);
  assert.ok(ticketMessage.includes("Бонус начислен на ваш баланс выше"), "ticket reward explains the credited balance");
  assert.ok(ticketMessage.includes("обменять на билеты от 300 ₽"), "ticket reward explains exchange threshold");

  const bonusMessage = promoInternals.prizeTextForHand("flush", rewardForHandRank("flush", {}), null);
  assert.ok(bonusMessage.includes("Бонус начислен на ваш баланс выше"), "bonus reward explains the credited balance");

  const bonusAndStreakMessage = promoInternals.prizeTextForHand("straight", rewardForHandRank("straight", {}), {
    ticketAmount: 300,
  });
  assert.ok(bonusAndStreakMessage.includes("+50 бонусов"), "combined reward explains the hand bonus");
  assert.ok(bonusAndStreakMessage.includes("Дополнительно за 7 дней без бонусов и билетов начислен билет 300 ₽"), "combined reward explains the streak ticket");

  const extraAttemptMessage = promoInternals.prizeTextForHand("three_of_a_kind", rewardForHandRank("three_of_a_kind", {}), null);
  assert.ok(!extraAttemptMessage.includes("Бонус начислен"), "extra attempt without balance credit does not mention credited bonus");
}

function testRomanDailyPokerLimit() {
  assert.strictEqual(promoInternals.isRomanDailyPokerIdentity({
    memberId: "tg_388008256",
    identity: { id: 388008256, telegramUsername: "roman1787443" },
  }), true, "roman1787443 has the daily poker admin limit");
  assert.strictEqual(promoInternals.isRomanDailyPokerIdentity({
    memberId: "mail_ID000001",
    identity: { id: 0, pwaUsername: "roman1_matvienko" },
  }), true, "roman1_matvienko has the daily poker admin limit");
  assert.strictEqual(promoInternals.isRomanDailyPokerIdentity({
    memberId: "tg_2144406710",
    identity: { id: 2144406710, telegramUsername: "another_admin" },
  }), false, "other admins do not get Roman's daily poker limit");

  const meta = {
    serverTime: "2026-05-23T06:00:00.000Z",
    nextFreeAttemptAt: "2026-05-23T17:00:00.000Z",
  };
  const almostDone = promoInternals.romanDailyPokerStatePayload(99, meta, 75);
  assert.strictEqual(almostDone.specialDailyLimit, true, "payload marks the special daily limit");
  assert.strictEqual(almostDone.dailyPlayLimit, 100, "Roman daily limit is 100 hands");
  assert.strictEqual(almostDone.attemptsLeft, 1, "one hand remains after 99 plays");
  assert.strictEqual(almostDone.canPlay, true, "Roman can play before the 100th hand");
  assert.strictEqual(almostDone.bonusBalance, 75, "payload keeps the current bonus balance");

  const done = promoInternals.romanDailyPokerStatePayload(100, meta, 75);
  assert.strictEqual(done.attemptsLeft, 0, "no hands remain after 100 plays");
  assert.strictEqual(done.canPlay, false, "Roman is blocked after 100 plays");
  assert.ok(done.secondsUntilNextAttempt > 0, "blocked payload includes countdown to the next daily reset");

  const withExtra = promoInternals.romanDailyPokerStatePayload(1, meta, 75, 1);
  assert.strictEqual(withExtra.dailyExtraAttemptsGranted, 1, "Roman payload counts earned extra attempts");
  assert.strictEqual(withExtra.attemptsLeft, 100, "earned extra attempt is added back to Roman's counter");
  const limitWithExtra = promoInternals.romanDailyPokerStatePayload(100, meta, 75, 1);
  assert.strictEqual(limitWithExtra.canPlay, true, "Roman can use earned extra attempt after 100 regular hands");
  assert.strictEqual(limitWithExtra.attemptsLeft, 1, "one earned extra attempt remains at the regular limit");

  const over = promoInternals.romanDailyPokerStatePayload(101, meta, 75);
  assert.strictEqual(over.attemptsLeft, 0, "attempts never go below zero");
}

testDeck();
testHandRanks();
testHoleCardContribution();
testAttemptEconomy();
testTicketlessStreak();
testTicketlessStreakLevelGate();
testBonusResetsStreak();
testRewardsAndLedger();
testPrizeMessages();
testRomanDailyPokerLimit();

console.log("Daily poker tests passed.");
