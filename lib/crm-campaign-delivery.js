"use strict";
const crypto = require("crypto");
const { pipeline } = require("./redis");
const FINISH = `-- crm_delivery_finish_v1
if redis.call('GET', KEYS[1]) ~= ARGV[1] then return 0 end
if ARGV[2] == '' then redis.call('DEL', KEYS[1]) else redis.call('SET', KEYS[1], ARGV[2], 'EX', 604800) end
return 1`;
function failure(status, message) { const e = new Error(message); e.status = status; return e; }
async function runCampaignRecipient(jobId, recipientId, send) {
  const key = "poker_app:crm_delivery:" + crypto.createHash("sha256").update(JSON.stringify([jobId, recipientId])).digest("hex");
  const token = "pending:" + crypto.randomBytes(16).toString("hex");
  const claim = await pipeline([["SET", key, token, "NX", "EX", "604800"]], { throwOnError: true, context: "crm.delivery.claim" });
  if (claim[0].result !== "OK") {
    const rows = await pipeline([["GET", key]], { throwOnError: true, context: "crm.delivery.read" });
    let saved;
    try { saved = JSON.parse(rows[0].result); } catch (_) {}
    if (saved && saved.state === "done" && saved.result) return saved.result;
    throw failure(409, "Доставка одному из получателей ещё выполняется или не подтверждена. Проверьте её перед новой рассылкой; автоматический повтор заблокирован.");
  }
  // A thrown/ambiguous delivery keeps the claim. Retrying an uncertain external send is unsafe.
  const result = await send();
  const value = result && result.rateLimited ? "" : JSON.stringify({ state: "done", result });
  const rows = await pipeline([["EVAL", FINISH, "1", key, token, value]], { throwOnError: true, context: "crm.delivery.finish" });
  if (Number(rows[0].result) !== 1) throw failure(409, "Не удалось подтвердить результат доставки. Повторная отправка заблокирована.");
  return result;
}
async function withCampaignJob(jobId, work) {
  const key = "poker_app:crm_job_lock:" + jobId;
  const token = crypto.randomBytes(16).toString("hex");
  const rows = await pipeline([["SET", key, token, "NX", "EX", "300"]], { throwOnError: true, context: "crm.job.lock" });
  if (rows[0].result !== "OK") return { status: 409, json: { ok: false, error: "Рассылка уже обрабатывается в другом запросе. Дождитесь завершения и обновите статус." } };
  try { return await work(); }
  finally { await pipeline([["EVAL", FINISH, "1", key, token, ""]], { context: "crm.job.unlock" }); }
}
module.exports = { runCampaignRecipient, withCampaignJob, FINISH };
