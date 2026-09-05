"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { createPayments } = require("../lib/sng-entry-payment");
const request = { tournamentId: "sng1", accountId: "ID1", userId: "123", cycle: "open1" };
function fixture(balance = 1000) {
  const records = new Map(), operations = new Map();
  let failPaidWrite = false, reads = 0;
  const api = createPayments({
    read: async key => records.get(key) ? structuredClone(records.get(key)) : null,
    write: async (key, value) => {
      if (value.status === "paid" && failPaidWrite) { failPaidWrite = false; throw new Error("Redis unavailable"); }
      records.set(key, structuredClone(value)); return true;
    },
    player: async () => { reads++; return { balance }; },
    change: async value => {
      if (!operations.has(value.idempotencyKey)) {
        balance += value.chips;
        operations.set(value.idempotencyKey, value);
      }
    },
  });
  return { api, operations, records, balance: () => balance, reads: () => reads,
    failNextPaidWrite: () => { failPaidWrite = true; } };
}
test("insufficient funds never debit or create a payment", async () => {
  for (const amount of [0, 999, NaN]) {
    const f = fixture(amount);
    await assert.rejects(f.api.charge(request), { code: "POKER21_INSUFFICIENT_BALANCE" });
    assert.equal(f.operations.size, 0); assert.equal(f.records.size, 0);
  }
});
test("exactly 1000 is charged once, retries work with zero remaining balance", async () => {
  const f = fixture();
  const first = await f.api.charge(request);
  assert.equal(first.status, "paid"); assert.equal(f.balance(), 0);
  await f.api.charge(request);
  assert.equal(f.operations.size, 1); assert.equal(f.reads(), 1);
});
test("successful debit followed by storage failure recovers without another debit", async () => {
  const f = fixture(); f.failNextPaidWrite();
  await assert.rejects(f.api.charge(request), /Redis unavailable/);
  assert.equal(f.balance(), 0);
  const recovered = await f.api.charge(request);
  assert.equal(recovered.status, "paid"); assert.equal(f.balance(), 0);
  assert.equal(f.operations.size, 1); assert.equal(f.reads(), 1);
});
test("refund retries do not credit twice; a new registration is charged again", async () => {
  const f = fixture(); const payment = await f.api.charge(request);
  await f.api.refund(payment); await f.api.refund(payment);
  assert.equal(f.balance(), 1000); assert.equal(f.operations.size, 2);
  await f.api.charge({ ...request, cycle: "cancelled1" });
  assert.equal(f.balance(), 0); assert.equal(f.operations.size, 3);
});
test("legacy unpaid registrations are never refunded", async () => {
  const f = fixture(); await f.api.refund(null);
  assert.equal(f.operations.size, 0);
});

test("player cancellation is rejected by the server and absent from the UI", () => {
  const fs = require("node:fs"), vm = require("node:vm");
  const source = fs.readFileSync(require.resolve("../lib/api-handlers/sng-champions"), "utf8");
  const branch = source.split('} else if (action === "cancel") {')[1].split('} else if (action === "approve"')[0];
  let status, payload;
  const res = { status(value) { status = value; return this; }, json(value) { payload = value; } };
  vm.runInNewContext('(function () {' + branch + '})()', { res });
  assert.equal(status, 403);
  assert.equal(payload.ok, false);
  const client = fs.readFileSync(require.resolve("../app-sng-champions"), "utf8");
  assert.ok(!client.includes('data-sng-action="cancel"'));
});
