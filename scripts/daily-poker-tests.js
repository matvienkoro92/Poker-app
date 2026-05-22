#!/usr/bin/env node
"use strict";

const assert = require("assert");
const {
  applyAttemptToState,
  createDeck,
  evaluateSevenCardHand,
  getAttemptsLeft,
  getNextAttemptType,
  rewardForHandRank,
} = require("../lib/daily-poker");
const { buildBonusLedgerEntry } = require("../lib/bonus-ledger");

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

function playPure(state, handRank) {
  const attemptType = getNextAttemptType(state);
  assert.ok(attemptType, "attempt is available");
  const reward = rewardForHandRank(handRank, state);
  const next = applyAttemptToState(state, attemptType, reward, "2026-05-22T12:00:00.000Z");
  return { attemptType, reward, state: next };
}

function testAttemptEconomy() {
  let state = {};
  assert.strictEqual(getAttemptsLeft(state), 1, "user can play once per day");
  let first = playPure(state, "high_card");
  state = first.state;
  assert.strictEqual(getAttemptsLeft(state), 0, "second play without extra is blocked");

  state = {};
  first = playPure(state, "three_of_a_kind");
  assert.strictEqual(first.reward.grantsExtraAttempt, true, "set grants extra attempt");
  assert.strictEqual(getAttemptsLeft(first.state), 1, "extra attempt is available");
  const extra = playPure(first.state, "straight");
  assert.strictEqual(extra.attemptType, "extra", "extra attempt is used after base");
  assert.strictEqual(extra.reward.grantsExtraAttempt, false, "extra attempt cannot create an infinite chain");
  assert.strictEqual(getAttemptsLeft(extra.state), 0, "extra attempt cannot be issued twice");

  state = {};
  first = playPure(state, "straight");
  assert.strictEqual(first.reward.grantsExtraAttempt, true, "straight grants extra attempt");

  state = {};
  first = playPure(state, "flush");
  assert.strictEqual(first.reward.grantsExtraAttempt, true, "flush grants extra attempt");
  assert.strictEqual(first.reward.bonusAmount, 50, "flush gives 50 bonuses");
  const flushExtra = playPure(first.state, "flush");
  assert.strictEqual(flushExtra.reward.grantsExtraAttempt, false, "second flush does not grant another extra attempt");
  assert.strictEqual(flushExtra.reward.bonusAmount, 50, "second flush still credits bonus reward through ledger");
}

function testRewardsAndLedger() {
  assert.strictEqual(rewardForHandRank("full_house", {}).ticketAmount, 500, "full house ticket 500");
  assert.strictEqual(rewardForHandRank("four_of_a_kind", {}).ticketAmount, 1000, "four of a kind ticket 1000");
  assert.strictEqual(rewardForHandRank("straight_flush", {}).ticketAmount, 3000, "straight flush ticket 3000");
  assert.strictEqual(rewardForHandRank("royal_flush", {}).ticketAmount, 10000, "royal flush ticket 10000");
  assert.strictEqual(rewardForHandRank("straight_flush", {}).bonusAmount, 0, "straight flush is not paid as a flush");
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

testDeck();
testHandRanks();
testAttemptEconomy();
testRewardsAndLedger();

console.log("Daily poker tests passed.");
