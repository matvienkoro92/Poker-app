"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { summarizeRafflesForRange } = require("../lib/raffle-calculation-summary");

test("calculation raffle summary separates issued tickets, cash and dated returns", () => {
  const totals = summarizeRafflesForRange([
    {
      prizeKind: "tournament_ticket",
      groups: [{ prize: "Билет 500 ₽" }],
      winners: [
        { groupIndex: 0, winnerStatus: "ok", winnerStatusAt: "2026-07-28T10:00:00.000Z", winnerCashoutStatus: "plus", winnerCashoutAmount: 620, winnerCashoutAt: "2026-07-30T10:00:00.000Z" },
      ],
    },
    {
      prizeKind: "cash",
      groups: [{ prize: "Кеш 1000 ₽" }],
      winners: [
        { groupIndex: 0, winnerStatus: "ok", winnerStatusAt: "2026-07-29T10:00:00.000Z", winnerSeatStatus: "not_seated", winnerSeatStatusAt: "2026-07-31T10:00:00.000Z" },
      ],
    },
  ], "2026-07-27", "2026-08-02");

  assert.equal(totals.issuedTicketAmount, 500);
  assert.equal(totals.issuedCashAmount, 1000);
  assert.equal(totals.returnedTicketAmount, 620);
  assert.equal(totals.returnedCashAmount, 1000);
  assert.equal(totals.issuedPrizeAmount, 1500);
});
