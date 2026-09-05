"use strict";
const crypto = require("crypto");
const { getJson, setJson } = require("./redis");
const { getGroupMemberData } = require("./pokerplus");
const { processDirectChange } = require("./api-handlers/pokerplus-chips");
const ENTRY_PRICE = 1000;
const insufficient = () => Object.assign(new Error("Для записи на СНГ нужно 1 000 ₽. Пополните баланс Poker21 и нажмите «Записаться» ещё раз."), { status: 409, code: "POKER21_INSUFFICIENT_BALANCE" });
function createPayments(deps = {}) {
  const read = deps.read || getJson, write = deps.write || setJson;
  async function persist(key, value) {
    if (await write(key, value, { throwOnError: true }) === false) throw new Error("Payment storage unavailable");
  }
  const player = deps.player || getGroupMemberData, change = deps.change || processDirectChange;
  async function charge({ tournamentId, accountId, userId, cycle }) {
    const key = "sng-entry:" + crypto.createHash("sha256").update(JSON.stringify([tournamentId, accountId, cycle || "initial"])).digest("hex");
    const storageKey = "poker_app:" + key;
    let payment = await read(storageKey, null, { throwOnError: true });
    if (!payment) {
      if (!userId) throw Object.assign(new Error("Сначала привяжите аккаунт Poker21 в профиле."), { status: 403 });
      const data = await player({ userId });
      if (!Number.isFinite(Number(data.balance)) || Number(data.balance) < ENTRY_PRICE) throw insufficient();
      payment = { key, userId, amount: ENTRY_PRICE, status: "pending" };
      // Persist the operation identity before contacting Poker21. A retry after a
      // successful debit must not check the now lower balance or debit twice.
      await persist(storageKey, payment);
    }
    if (payment.status !== "paid") {
      try {
        await change({ userId: payment.userId, chips: -payment.amount, idempotencyKey: key,
          reference: "sng:" + tournamentId, requestedBy: "sng:" + accountId });
      } catch (error) {
        if (/insufficient|not enough|недостат/i.test(error.message || "")) throw insufficient();
        throw Object.assign(new Error("Не удалось подтвердить оплату СНГ. Повторите запись: повторного списания не будет."), { status: error.statusCode || 502 });
      }
      payment.status = "paid";
      await persist(storageKey, payment);
    }
    return payment;
  }
  async function refund(payment) {
    if (!payment || payment.status !== "paid") return;
    await change({ userId: payment.userId, chips: payment.amount, idempotencyKey: payment.key + ":refund",
      reference: payment.key, requestedBy: "sng:refund" });
  }
  return { charge, refund };
}
module.exports = { ENTRY_PRICE, createPayments };
