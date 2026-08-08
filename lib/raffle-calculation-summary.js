"use strict";

const { pipeline: redisPipeline } = require("./redis");
const { RAFFLE_STATS_DAY_PREFIX, RAFFLE_STATS_INDEX_READY_KEY } = require("./raffle-stats-index");
const { dateKeysBetween, mskDateKeyFromMs, normalizeDateOnly, unique } = require("./player-crm-utils");

const RAFFLE_IDS_KEY = "poker_app:raffle_ids";
const RAFFLE_PREFIX = "poker_app:raffle:";
const RAFFLE_CALCULATION_CACHE_PREFIX = "poker_app:raffle_calculation_summary:v1:";
const RAFFLE_CALCULATION_CACHE_TTL_SEC = 300;

function dateInRange(value, from, to) {
  const ms = Date.parse(String(value || ""));
  if (!Number.isFinite(ms)) return false;
  const key = mskDateKeyFromMs(ms);
  return !!key && key >= from && key <= to;
}
function prizeAmount(raffle, winner) {
  const groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
  const groupIndex = parseInt(String(winner && winner.groupIndex != null ? winner.groupIndex : ""), 10);
  const prize = String((winner && winner.prize) || (groups[groupIndex] && groups[groupIndex].prize) || "").replace(/\u00a0|\u202f/g, " ");
  const match = prize.match(/(\d[\d\s]*(?:[.,]\d+)?)\s*(?:₽|р\.?|руб\.?)/i);
  const amount = match ? parseFloat(match[1].replace(/\s+/g, "").replace(",", ".")) : 0;
  return Number.isFinite(amount) && amount > 0 ? amount : 0;
}
function prizeKind(raffle) {
  const explicit = String(raffle && (raffle.prizeKind || raffle.prize_kind) || "").trim().toLowerCase();
  if (["cash", "cash_buyin", "cash_buyins", "cash-backing", "other"].includes(explicit)) return "cash";
  if (["ticket", "tickets", "tournament", "tournament_ticket", "tournament_tickets"].includes(explicit)) return "ticket";
  const groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
  const text = [raffle && raffle.title].concat(groups.map((group) => group && group.prize)).join(" ").toLowerCase();
  return /(?:на\s+кеш|кеш|cash|бонус\s+гейм|bonus\s+game)/i.test(text) ? "cash" : "ticket";
}

function summarizeRafflesForRange(raffles, from, to) {
  const totals = {
    available: true,
    issuedPrizeAmount: 0,
    issuedCashAmount: 0,
    issuedTicketAmount: 0,
    returnedAmount: 0,
    returnedCashAmount: 0,
    returnedTicketAmount: 0,
    manualReturnedTicketAmount: 0,
    returnCount: 0,
  };
  (Array.isArray(raffles) ? raffles : []).forEach((raffle) => {
    if (!raffle) return;
    const raffleDate = raffle.drawnAt || raffle.completedAt || raffle.endDate || raffle.createdAt;
    const kind = prizeKind(raffle);
    (Array.isArray(raffle.winners) ? raffle.winners : []).forEach((winner) => {
      const amount = prizeAmount(raffle, winner);
      if (String(winner && winner.winnerStatus || "").toLowerCase() === "ok") {
        const issuedDate = winner.winnerStatusAt || winner.prizeIssuedAt || raffleDate;
        if (dateInRange(issuedDate, from, to)) {
          totals.issuedPrizeAmount += amount;
          if (kind === "cash") totals.issuedCashAmount += amount;
          else totals.issuedTicketAmount += amount;
        }
      }
      if (String(winner && winner.winnerSeatStatus || "").toLowerCase() === "not_seated") {
        const returnedAt = winner.winnerSeatStatusAt || winner.winnerStatusAt || raffleDate;
        if (kind === "cash" && amount > 0 && dateInRange(returnedAt, from, to)) {
          totals.returnCount += 1;
          totals.returnedAmount += amount;
          totals.returnedCashAmount += amount;
        }
      } else if (String(winner && winner.winnerCashoutStatus || "").toLowerCase() === "plus") {
        const returnedAt = winner.winnerCashoutAt || winner.winnerStatusAt || raffleDate;
        const returned = Math.max(0, Number(winner.winnerCashoutAmount) || 0);
        if (returned > 0 && dateInRange(returnedAt, from, to)) {
          totals.returnCount += 1;
          totals.returnedAmount += returned;
          if (kind === "ticket") totals.returnedTicketAmount += returned;
          else totals.returnedCashAmount += returned;
        }
      }
    });
  });
  return totals;
}

async function getRaffleCalculationSummary(fromInput, toInput) {
  const from = normalizeDateOnly(fromInput);
  const to = normalizeDateOnly(toInput);
  if (!from || !to || from > to) throw new Error("invalid_raffle_calculation_range");
  const cacheKey = RAFFLE_CALCULATION_CACHE_PREFIX + from + ":" + to;
  const cacheRows = await redisPipeline([["GET", cacheKey]], { timeoutMs: 2500, context: "raffle-calculation.cache.get" });
  const cachedRaw = cacheRows && cacheRows[0] && cacheRows[0].result;
  if (cachedRaw) {
    try {
      const cached = JSON.parse(String(cachedRaw));
      if (cached && cached.available === true) return cached;
    } catch (_) {}
  }
  const readyRows = await redisPipeline([["GET", RAFFLE_STATS_INDEX_READY_KEY]], { timeoutMs: 3000, context: "raffle-calculation.index-ready" });
  if (!Array.isArray(readyRows)) throw new Error("raffle_calculation_index_unavailable");
  const ready = String(readyRows && readyRows[0] && readyRows[0].result || "") === "1";
  let ids = [];
  if (ready) {
    const dayRows = await redisPipeline(dateKeysBetween(from, to).map((key) => ["SMEMBERS", RAFFLE_STATS_DAY_PREFIX + key]), {
      timeoutMs: 9000, context: "raffle-calculation.period-ids",
    });
    if (!Array.isArray(dayRows)) throw new Error("raffle_calculation_period_ids_unavailable");
    ids = unique((dayRows || []).flatMap((row) => Array.isArray(row && row.result) ? row.result.map(String) : []).filter(Boolean));
  } else {
    const rows = await redisPipeline([["LRANGE", RAFFLE_IDS_KEY, "0", "-1"]], {
      timeoutMs: 9000, allowLargeRedisRead: true, context: "raffle-calculation.fallback-ids",
    });
    if (!Array.isArray(rows)) throw new Error("raffle_calculation_ids_unavailable");
    ids = unique(Array.isArray(rows && rows[0] && rows[0].result) ? rows[0].result.map(String).filter(Boolean) : []);
  }
  const chunks = [];
  for (let offset = 0; offset < ids.length; offset += 200) chunks.push(ids.slice(offset, offset + 200));
  const raffles = [];
  // A bounded amount of parallelism avoids a long chain of Redis round trips
  // without turning a cold historical range into an unbounded request burst.
  for (let offset = 0; offset < chunks.length; offset += 4) {
    const group = chunks.slice(offset, offset + 4);
    const groupRows = await Promise.all(group.map((chunk) => redisPipeline([["MGET", ...chunk.map((id) => RAFFLE_PREFIX + id)]], {
      timeoutMs: 9000, maxRedisMultiReadFields: 200, context: "raffle-calculation.rows",
    })));
    groupRows.forEach((rows) => {
      if (!Array.isArray(rows)) throw new Error("raffle_calculation_rows_unavailable");
      const values = rows[0] && Array.isArray(rows[0].result) ? rows[0].result : [];
      values.forEach((raw) => { try { const raffle = JSON.parse(String(raw || "")); if (raffle) raffles.push(raffle); } catch (_) {} });
    });
  }
  const summary = summarizeRafflesForRange(raffles, from, to);
  await redisPipeline([["SET", cacheKey, JSON.stringify(summary), "EX", String(RAFFLE_CALCULATION_CACHE_TTL_SEC)]], {
    timeoutMs: 2500, context: "raffle-calculation.cache.set",
  }).catch(() => {});
  return summary;
}

module.exports = { getRaffleCalculationSummary, summarizeRafflesForRange };
