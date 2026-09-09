"use strict";
const { createHash } = require("crypto");
const { pipeline } = require("./redis");
const { processDirectChange } = require("./api-handlers/pokerplus-chips");
function paymentKey(row) {
  if (!row.groupId) throw new Error("У строки нет постоянного идентификатора");
  const identity = [row.groupId, row.kind === "addon" ? String(row.createdAt) : "base"];
  return "poker_app:rakeback_cash_paid:v1:" + createHash("sha256").update(JSON.stringify(identity)).digest("hex");
}
async function read(key, redis) {
  const rows = await redis([["GET", key]], { throwOnError: true });
  return rows[0].result ? JSON.parse(rows[0].result) : null;
}
async function pay(row, amount, requestedBy, deps = {}) {
  const redis = deps.redis || pipeline;
  const send = deps.send || processDirectChange;
  const key = paymentKey(row);
  const existing = await read(key, redis);
  if (existing) return existing;
  if (row.room !== "P21" || row.saved !== true || !/^\d+$/.test(row.playerId)) throw new Error("Нужна сохранённая строка Poker21 с ID игрока");
  if (!Number.isInteger(amount) || amount <= 0 || amount > 1000) throw new Error("Выдача доступна только для рейкбека от 1 до 1000 ₽");
  const pending = { status: "processing", amount, playerId: row.playerId, requestedBy, createdAt: new Date().toISOString() };
  const reserved = await redis([["SET", key, JSON.stringify(pending), "NX"]], { throwOnError: true });
  if (reserved[0].result !== "OK") return read(key, redis);
  // Never expire or clear this reservation: an uncertain remote result must not be paid twice.
  const result = await send({ userId: row.playerId, chips: amount, requestedBy, idempotencyKey: key, reference: "Рейкбек " + row.groupId });
  const paid = { ...pending, status: "paid", orderId: result.operation.orderId, paidAt: new Date().toISOString() };
  await redis([["SET", key, JSON.stringify(paid)]], { throwOnError: true });
  return paid;
}
module.exports = { pay, paymentKey, status: row => read(paymentKey(row), pipeline) };

async function statuses(rows, redis = pipeline) {
  if (!Array.isArray(rows) || rows.length > 500) throw new Error("Не более 500 строк за запрос");
  if (!rows.length) return [];
  const result = await redis([["MGET", ...rows.map(paymentKey)]], { throwOnError: true });
  return result[0].result.map(raw => raw ? JSON.parse(raw) : null);
}
module.exports.statuses = statuses;
