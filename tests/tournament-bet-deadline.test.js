"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { applyRegistrationDeadline } = require("../lib/api-handlers/tournament-bet");

test("club registration closes exactly at 20 Moscow and stays closed next day", () => {
  const event = { status: "open", createdAt: "2026-09-15T09:00:00Z", entries: [{ stake: 500 }] };
  for (const [now, status] of [["2026-09-15T16:59:59.999Z", "open"], ["2026-09-15T17:00:00Z", "closed"], ["2026-09-16T06:00:00Z", "closed"]]) {
    const result = applyRegistrationDeadline(event, Date.parse(now));
    assert.equal(result.status, status);
    assert.deepEqual(result.entries, event.entries);
    if (status === "closed") assert.equal(result.closedAt, "2026-09-15T17:00:00.000Z");
  }
});

test("deadline uses Moscow creation date and preserves personal and completed events", () => {
  const event = { status: "open", createdAt: "2026-09-14T22:00:00Z" };
  assert.equal(applyRegistrationDeadline(event, Date.parse("2026-09-15T16:00:00Z")).status, "open");
  for (const source of [{ ...event, createdByPlayer: true }, { ...event, status: "settled" }, { ...event, status: "cancelled" }]) {
    assert.equal(applyRegistrationDeadline(source, Date.parse("2026-09-16T00:00:00Z")), source);
  }
});
