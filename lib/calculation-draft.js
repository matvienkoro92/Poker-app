"use strict";
const crypto = require("crypto");
const { pipeline } = require("./redis");
const { compareAndSet } = require("./redis-cas");
const PREFIX = "poker_app:admin_report_calculations_draft:";
const FIELDS = {
  cash: ["cash"], winloss: ["roomWinLoss"],
  figures: ["figuresDate", "rake", "manualPoker21Rake", "romanPaid", "winLoss", "agentsPaid", "backingReturn", "raffleTicketsReturn", "raffleCashReturn", "approxRakebackEnabled", "approxRakebackRate", "approxRomanRake", "extras"],
};
const version = raw => crypto.createHash("sha256").update(raw == null ? "missing" : "value:" + raw).digest("hex");
const failure = (status, error) => ({ status, json: { ok: false, error } });
async function syncCalculationDraft(body, userId) {
  const week = String(body.weekStart || "").replace(/[^\d]/g, "").slice(0, 20);
  if (!week) return failure(400, "Не выбран период расчётов");
  const key = PREFIX + week;
  const rows = await pipeline([["GET", key]], { timeoutMs: 9000 });
  if (!rows) return failure(503, "Не удалось прочитать расчёты. Ваши изменения не сохранены.");
  const raw = rows[0].result;
  let previous = null;
  try {
    previous = raw == null ? null : JSON.parse(raw);
    if (raw != null && (!previous || !previous.draft || typeof previous.draft !== "object" || Array.isArray(previous.draft))) throw Error("Invalid draft");
  } catch (_) { return failure(503, "Сохранённые расчёты повреждены. Перезапись заблокирована."); }
  const revision = version(raw);
  if (body.action === "calculation_draft_load") return { status: 200, json: { ok: true, calculationDraft: previous, calculationDraftVersion: revision } };
  if (body.calculationDraftVersion !== revision) return failure(409, "Расчёты изменились или ещё не загружены. Скопируйте свои правки и обновите расчёты перед сохранением.");
  const incoming = body.calculationDraft;
  if (!incoming || typeof incoming !== "object" || Array.isArray(incoming)) return failure(400, "Некорректный черновик");
  const group = String(body.calculationDraftGroup || "").toLowerCase();
  if (group && !FIELDS[group]) return failure(400, "Неизвестная группа расчётов");
  const draft = group ? { ...(previous && previous.draft || {}) } : { ...incoming };
  if (group) for (const field of FIELDS[group]) if (Object.prototype.hasOwnProperty.call(incoming, field)) draft[field] = incoming[field];
  if (JSON.stringify(draft).length > 200000) return failure(413, "Черновик слишком большой");
  const stored = { draft, updatedAt: new Date().toISOString(), updatedBy: userId };
  const next = JSON.stringify(stored);
  const saved = await compareAndSet(key, raw, next);
  if (saved == null) return failure(503, "Не удалось подтвердить сохранение. Обновите расчёты и проверьте значения.");
  if (!saved) return failure(409, "Расчёты изменились в другом окне. Скопируйте свои правки и обновите расчёты.");
  return { status: 200, json: { ok: true, calculationDraft: stored, calculationDraftVersion: version(next) } };
}
module.exports = { syncCalculationDraft };
