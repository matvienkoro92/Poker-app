"use strict";

const { mskDateKeyFromMs, unique } = require("./player-crm-utils");

const RAFFLE_STATS_DAY_PREFIX = "poker_app:raffle_stats_day:v2:";
const RAFFLE_STATS_INDEX_READY_KEY = "poker_app:raffle_stats_index:v2:ready";

function raffleStatsDateValues(raffle) {
  if (!raffle || typeof raffle !== "object") return [];
  const values = [
    raffle.createdAt,
    raffle.drawnAt,
    raffle.completedAt,
    raffle.endDate,
    raffle.updatedAt,
  ];
  (Array.isArray(raffle.participants) ? raffle.participants : []).forEach((row) => {
    values.push(row && (row.joinedAt || row.createdAt || row.manualTicketsAddedAt || row.manualTicketsUpdatedAt));
  });
  (Array.isArray(raffle.winners) ? raffle.winners : []).forEach((row) => {
    values.push(row && (row.winnerStatusAt || row.prizeIssuedAt));
    values.push(row && row.winnerSeatStatusAt);
    values.push(row && row.winnerCashoutAt);
  });
  return values.filter(Boolean);
}

function raffleStatsDayKeys(raffle) {
  return unique(raffleStatsDateValues(raffle).map((value) => {
    const ms = Date.parse(String(value || ""));
    return Number.isFinite(ms) ? mskDateKeyFromMs(ms) : "";
  }).filter(Boolean));
}

function raffleStatsIndexCommands(raffle, raffleIdInput) {
  const raffleId = String(raffleIdInput || (raffle && (raffle.id || raffle.raffleId)) || "").trim();
  if (!raffleId) return [];
  return raffleStatsDayKeys(raffle).map((dayKey) => ["SADD", RAFFLE_STATS_DAY_PREFIX + dayKey, raffleId]);
}

module.exports = {
  RAFFLE_STATS_DAY_PREFIX,
  RAFFLE_STATS_INDEX_READY_KEY,
  raffleStatsDayKeys,
  raffleStatsIndexCommands,
};
