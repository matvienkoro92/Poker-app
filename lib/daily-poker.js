"use strict";

const crypto = require("crypto");

const RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const SUITS = ["spades", "hearts", "diamonds", "clubs"];
const RANK_VALUE = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const HAND_NAMES = {
  royal_flush: "Роял-флеш",
  straight_flush: "Стрит-флеш",
  four_of_a_kind: "Каре",
  full_house: "Фулл-хаус",
  flush: "Флеш",
  straight: "Стрит",
  three_of_a_kind: "Сет",
  two_pair: "Две пары",
  pair: "Пара",
  high_card: "Старшая карта",
};

const HAND_STRENGTH = {
  high_card: 1,
  pair: 2,
  two_pair: 3,
  three_of_a_kind: 4,
  straight: 5,
  flush: 6,
  full_house: 7,
  four_of_a_kind: 8,
  straight_flush: 9,
  royal_flush: 10,
};

const FREE_ATTEMPT_COOLDOWN_MS = 24 * 60 * 60 * 1000;
const TICKETLESS_STREAK_TARGET = 7;
const TICKETLESS_STREAK_TICKET_AMOUNT = 300;
const TICKETLESS_STREAK_MAX_GAP_MS = 48 * 60 * 60 * 1000;

function createDeck() {
  const deck = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) deck.push({ rank, suit });
  }
  return deck;
}

function cardKey(card) {
  return String(card && card.rank ? card.rank : "") + ":" + String(card && card.suit ? card.suit : "");
}

function assertValidCards(cards, expectedCount) {
  if (!Array.isArray(cards)) throw new Error("cards must be an array");
  if (expectedCount != null && cards.length !== expectedCount) {
    throw new Error("expected " + expectedCount + " cards");
  }
  const seen = new Set();
  cards.forEach((card) => {
    if (!card || !Object.prototype.hasOwnProperty.call(RANK_VALUE, card.rank) || SUITS.indexOf(card.suit) === -1) {
      throw new Error("invalid card: " + JSON.stringify(card));
    }
    const key = cardKey(card);
    if (seen.has(key)) throw new Error("duplicate card: " + key);
    seen.add(key);
  });
}

function shuffleDeck(deck, randomInt) {
  const out = (Array.isArray(deck) ? deck : createDeck()).map((card) => ({ rank: card.rank, suit: card.suit }));
  const rnd = typeof randomInt === "function" ? randomInt : crypto.randomInt;
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = rnd(0, i + 1);
    const tmp = out[i];
    out[i] = out[j];
    out[j] = tmp;
  }
  return out;
}

function dealDailyPokerHand(randomInt) {
  const deck = shuffleDeck(createDeck(), randomInt);
  const holeCards = deck.slice(0, 2);
  const boardCards = deck.slice(2, 7);
  return { holeCards, boardCards };
}

function highestStraight(values) {
  const set = new Set(values.map((value) => Number(value)).filter((value) => Number.isFinite(value)));
  if (set.has(14)) set.add(1);
  const sorted = Array.from(set).sort((a, b) => b - a);
  for (let i = 0; i < sorted.length; i += 1) {
    const high = sorted[i];
    let ok = true;
    for (let step = 1; step < 5; step += 1) {
      if (!set.has(high - step)) {
        ok = false;
        break;
      }
    }
    if (ok) return high === 1 ? 5 : high;
  }
  return 0;
}

function rankCounts(cards) {
  const counts = new Map();
  cards.forEach((card) => {
    const value = RANK_VALUE[card.rank];
    counts.set(value, (counts.get(value) || 0) + 1);
  });
  return counts;
}

function valuesByCount(counts, minCount) {
  return Array.from(counts.entries())
    .filter((entry) => entry[1] >= minCount)
    .map((entry) => entry[0])
    .sort((a, b) => b - a);
}

function evaluateSevenCardHand(cards) {
  assertValidCards(cards, 7);
  const values = cards.map((card) => RANK_VALUE[card.rank]);
  const counts = rankCounts(cards);
  const cardsBySuit = {};
  SUITS.forEach((suit) => { cardsBySuit[suit] = []; });
  cards.forEach((card) => cardsBySuit[card.suit].push(card));

  let bestStraightFlushHigh = 0;
  for (const suit of SUITS) {
    if (cardsBySuit[suit].length < 5) continue;
    const suitedValues = cardsBySuit[suit].map((card) => RANK_VALUE[card.rank]);
    bestStraightFlushHigh = Math.max(bestStraightFlushHigh, highestStraight(suitedValues));
  }
  if (bestStraightFlushHigh >= 14) {
    return { rank: "royal_flush", name: HAND_NAMES.royal_flush, strength: HAND_STRENGTH.royal_flush };
  }
  if (bestStraightFlushHigh) {
    return { rank: "straight_flush", name: HAND_NAMES.straight_flush, strength: HAND_STRENGTH.straight_flush };
  }

  if (valuesByCount(counts, 4).length) {
    return { rank: "four_of_a_kind", name: HAND_NAMES.four_of_a_kind, strength: HAND_STRENGTH.four_of_a_kind };
  }

  const trips = valuesByCount(counts, 3);
  const pairs = valuesByCount(counts, 2);
  const hasFullHouse = trips.length >= 2 || (trips.length >= 1 && pairs.some((value) => value !== trips[0]));
  if (hasFullHouse) {
    return { rank: "full_house", name: HAND_NAMES.full_house, strength: HAND_STRENGTH.full_house };
  }

  if (SUITS.some((suit) => cardsBySuit[suit].length >= 5)) {
    return { rank: "flush", name: HAND_NAMES.flush, strength: HAND_STRENGTH.flush };
  }

  if (highestStraight(values)) {
    return { rank: "straight", name: HAND_NAMES.straight, strength: HAND_STRENGTH.straight };
  }

  if (trips.length) {
    return { rank: "three_of_a_kind", name: HAND_NAMES.three_of_a_kind, strength: HAND_STRENGTH.three_of_a_kind };
  }
  if (pairs.length >= 2) {
    return { rank: "two_pair", name: HAND_NAMES.two_pair, strength: HAND_STRENGTH.two_pair };
  }
  if (pairs.length === 1) {
    return { rank: "pair", name: HAND_NAMES.pair, strength: HAND_STRENGTH.pair };
  }
  return { rank: "high_card", name: HAND_NAMES.high_card, strength: HAND_STRENGTH.high_card };
}

function normalizeDailyPokerState(state) {
  const s = state && typeof state === "object" ? state : {};
  return {
    baseAttemptUsed: s.baseAttemptUsed === true || s.base_attempt_used === true,
    baseAttemptAt: s.baseAttemptAt || s.base_attempt_at || s.basePlayedAt || s.base_played_at || "",
    extraAttemptGranted: s.extraAttemptGranted === true || s.extra_attempt_granted === true,
    extraAttemptUsed: s.extraAttemptUsed === true || s.extra_attempt_used === true,
    ticketlessStreak: Math.max(0, parseInt(s.ticketlessStreak || s.ticketless_streak || "0", 10) || 0),
    ticketlessStreakAt: s.ticketlessStreakAt || s.ticketless_streak_at || "",
    ticketlessStreakGameDate: s.ticketlessStreakGameDate || s.ticketless_streak_game_date || "",
    createdAt: s.createdAt || s.created_at || "",
    updatedAt: s.updatedAt || s.updated_at || "",
  };
}

function parseTimeMs(value) {
  const ms = Date.parse(value || "");
  return Number.isFinite(ms) ? ms : 0;
}

function currentMs(nowIso) {
  const ms = Date.parse(nowIso || "");
  return Number.isFinite(ms) ? ms : Date.now();
}

function baseAttemptAtMs(state) {
  const s = normalizeDailyPokerState(state);
  return parseTimeMs(s.baseAttemptAt) || parseTimeMs(s.updatedAt) || parseTimeMs(s.createdAt);
}

function nextFreeAttemptAt(state) {
  const s = normalizeDailyPokerState(state);
  if (!s.baseAttemptUsed) return "";
  const baseMs = baseAttemptAtMs(s);
  if (!baseMs) return "";
  return new Date(baseMs + FREE_ATTEMPT_COOLDOWN_MS).toISOString();
}

function isBaseAttemptAvailable(state, nowIso) {
  const s = normalizeDailyPokerState(state);
  if (!s.baseAttemptUsed) return true;
  const nextIso = nextFreeAttemptAt(s);
  if (!nextIso) return true;
  return currentMs(nowIso) >= parseTimeMs(nextIso);
}

function getAttemptsLeft(state, nowIso) {
  const s = normalizeDailyPokerState(state);
  if (isBaseAttemptAvailable(s, nowIso)) return 1;
  if (s.extraAttemptGranted && !s.extraAttemptUsed) return 1;
  return 0;
}

function getNextAttemptType(state, nowIso) {
  const s = normalizeDailyPokerState(state);
  if (isBaseAttemptAvailable(s, nowIso)) return "base";
  if (s.extraAttemptGranted && !s.extraAttemptUsed) return "extra";
  return null;
}

function rewardForHandRank(handRank, state) {
  const s = normalizeDailyPokerState(state);
  const rank = String(handRank || "");
  if (rank === "royal_flush") {
    return { type: "ticket", amount: 10000, title: "Билет на Нокаут за 10 000 ₽", ticketAmount: 10000, bonusAmount: 0, grantsExtraAttempt: false };
  }
  if (rank === "straight_flush") {
    return { type: "ticket", amount: 3000, title: "Билет на турнир за 3 000 ₽", ticketAmount: 3000, bonusAmount: 0, grantsExtraAttempt: false };
  }
  if (rank === "four_of_a_kind") {
    return { type: "ticket", amount: 500, title: "Билет за 500 ₽", ticketAmount: 500, bonusAmount: 0, grantsExtraAttempt: false };
  }
  if (rank === "full_house") {
    return { type: "ticket", amount: 300, title: "Билет за 300 ₽", ticketAmount: 300, bonusAmount: 0, grantsExtraAttempt: false };
  }
  if (rank === "flush") {
    const grantsExtraAttempt = !s.extraAttemptGranted;
    return {
      type: grantsExtraAttempt ? "bonus_and_extra_attempt" : "bonus",
      amount: 50,
      title: grantsExtraAttempt ? "Флеш: +50 бонусов и ещё одна попытка" : "Флеш: +50 бонусов",
      ticketAmount: 0,
      bonusAmount: 50,
      grantsExtraAttempt,
    };
  }
  if (rank === "straight") {
    const grantsExtraAttempt = !s.extraAttemptGranted;
    return {
      type: grantsExtraAttempt ? "bonus_and_extra_attempt" : "bonus",
      amount: 50,
      title: grantsExtraAttempt ? "Стрит: +50 бонусов и ещё одна попытка" : "Стрит: +50 бонусов",
      ticketAmount: 0,
      bonusAmount: 50,
      grantsExtraAttempt,
    };
  }
  if (rank === "three_of_a_kind") {
    const grantsExtraAttempt = !s.extraAttemptGranted;
    return {
      type: grantsExtraAttempt ? "extra_attempt" : "none",
      amount: grantsExtraAttempt ? 1 : 0,
      title: grantsExtraAttempt ? "Ещё одна попытка сегодня" : "Без дополнительной попытки",
      ticketAmount: 0,
      bonusAmount: 0,
      grantsExtraAttempt,
    };
  }
  return { type: "none", amount: 0, title: "Без приза", ticketAmount: 0, bonusAmount: 0, grantsExtraAttempt: false };
}

function ticketlessStreakReward() {
  return {
    type: "ticketless_streak_ticket",
    amount: TICKETLESS_STREAK_TICKET_AMOUNT,
    title: "Билет за 300 ₽ за 7 дней без билета",
    ticketAmount: TICKETLESS_STREAK_TICKET_AMOUNT,
    bonusAmount: 0,
    grantsExtraAttempt: false,
    isTicketlessStreakReward: true,
  };
}

function applyAttemptToState(state, attemptType, reward, nowIso) {
  const s = normalizeDailyPokerState(state);
  const iso = nowIso || new Date().toISOString();
  if (!s.createdAt) s.createdAt = iso;
  s.updatedAt = iso;
  if (attemptType === "base") {
    s.baseAttemptUsed = true;
    s.baseAttemptAt = iso;
    s.extraAttemptGranted = false;
    s.extraAttemptUsed = false;
  }
  if (attemptType === "extra") s.extraAttemptUsed = true;
  if (reward && reward.grantsExtraAttempt) s.extraAttemptGranted = true;
  return s;
}

function applyTicketlessStreakToState(state, attemptType, reward, nowIso, gameDate) {
  const s = normalizeDailyPokerState(state);
  const iso = nowIso || new Date().toISOString();
  const currentGameDate = String(gameDate || "").trim();
  const hasTicketReward = !!(reward && reward.ticketAmount > 0);
  if (hasTicketReward) {
    s.ticketlessStreak = 0;
    s.ticketlessStreakAt = iso;
    if (currentGameDate) s.ticketlessStreakGameDate = currentGameDate;
    return { state: s, streakReward: null, awarded: false, ticketlessStreakBeforeAward: 0 };
  }
  if (attemptType !== "base") {
    return { state: s, streakReward: null, awarded: false, ticketlessStreakBeforeAward: s.ticketlessStreak };
  }
  if (currentGameDate && s.ticketlessStreakGameDate === currentGameDate) {
    return { state: s, streakReward: null, awarded: false, ticketlessStreakBeforeAward: s.ticketlessStreak };
  }
  const previousCount = Math.max(0, parseInt(s.ticketlessStreak || "0", 10) || 0);
  const previousMs = parseTimeMs(s.ticketlessStreakAt);
  const nowMs = currentMs(iso);
  const isConsecutive = previousCount > 0 && previousMs > 0 && nowMs >= previousMs && nowMs - previousMs <= TICKETLESS_STREAK_MAX_GAP_MS;
  const nextCount = isConsecutive ? previousCount + 1 : 1;
  s.ticketlessStreakAt = iso;
  if (currentGameDate) s.ticketlessStreakGameDate = currentGameDate;
  if (nextCount >= TICKETLESS_STREAK_TARGET) {
    s.ticketlessStreak = 0;
    return {
      state: s,
      streakReward: ticketlessStreakReward(),
      awarded: true,
      ticketlessStreakBeforeAward: nextCount,
    };
  }
  s.ticketlessStreak = nextCount;
  return { state: s, streakReward: null, awarded: false, ticketlessStreakBeforeAward: nextCount };
}

function publicStatePayload(state, meta, bonusBalance) {
  const s = normalizeDailyPokerState(state);
  const serverTime = meta && meta.serverTime ? meta.serverTime : new Date().toISOString();
  const attemptsLeft = getAttemptsLeft(s, serverTime);
  const nextAttemptAt = nextFreeAttemptAt(s);
  const baseAttemptUsedInWindow = !!(s.baseAttemptUsed && !isBaseAttemptAvailable(s, serverTime));
  const secondsUntilNextAttempt = Math.max(0, Math.ceil((Date.parse(nextAttemptAt) - Date.parse(serverTime)) / 1000) || 0);
  const payload = {
    canPlay: attemptsLeft > 0,
    attemptsLeft,
    baseAttemptUsedToday: baseAttemptUsedInWindow,
    extraAttemptGrantedToday: baseAttemptUsedInWindow && !!s.extraAttemptGranted,
    extraAttemptUsedToday: baseAttemptUsedInWindow && !!s.extraAttemptUsed,
    nextFreeAttemptAt: nextAttemptAt,
    serverTime,
    bonusBalance: Math.max(0, parseInt(bonusBalance, 10) || 0),
    ticketlessStreak: Math.max(0, parseInt(s.ticketlessStreak || "0", 10) || 0),
    ticketlessStreakTarget: TICKETLESS_STREAK_TARGET,
    ticketlessStreakTicketAmount: TICKETLESS_STREAK_TICKET_AMOUNT,
  };
  if (attemptsLeft <= 0) payload.secondsUntilNextAttempt = secondsUntilNextAttempt;
  return payload;
}

module.exports = {
  HAND_NAMES,
  HAND_STRENGTH,
  RANKS,
  RANK_VALUE,
  SUITS,
  TICKETLESS_STREAK_TARGET,
  TICKETLESS_STREAK_TICKET_AMOUNT,
  applyAttemptToState,
  applyTicketlessStreakToState,
  assertValidCards,
  createDeck,
  dealDailyPokerHand,
  evaluateSevenCardHand,
  getAttemptsLeft,
  getNextAttemptType,
  highestStraight,
  isBaseAttemptAvailable,
  nextFreeAttemptAt,
  normalizeDailyPokerState,
  publicStatePayload,
  rewardForHandRank,
  shuffleDeck,
};
