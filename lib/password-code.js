"use strict";
const crypto = require("crypto");
const { pipeline } = require("./redis");
const { atomicWrite } = require("./redis-atomic");
const { validatePassword, verifyAccountPassword, ACCOUNT_PASSWORDS_KEY, SESSION_VERSIONS_KEY } = require("./account-password");

async function consumePasswordCode({ codeKey, code, accountId, userId, password, email, originalEmail, replayKey }) {
  const valid = validatePassword(password);
  if (!valid.ok) return valid;
  const usedKey = codeKey + ":used";
  const rows = await pipeline([["GET", codeKey], ["GET", usedKey], ["HGET", ACCOUNT_PASSWORDS_KEY, accountId]], { throwOnError: true });
  if (!rows[0].result) {
    const used = rows[1].result ? JSON.parse(rows[1].result) : null;
    if (used && used.accountId === accountId && used.payload.code === code && used.payload.userId === userId && used.passwordRecord === rows[2].result && (await verifyAccountPassword(accountId, password)).ok) return { ok: true, replayed: true, passwordRecord: used.passwordRecord, accountId };
    return { ok: false, error: "Код уже использован или истёк. Запросите новый." };
  }
  const raw = String(rows[0].result);
  const payload = JSON.parse(raw);
  if (payload.code !== code || payload.userId !== userId || (payload.dtId && payload.dtId !== accountId)) return { ok: false, error: "Неверный код." };
  const salt = crypto.randomBytes(16).toString("hex");
  const passwordRecord = salt + ":" + crypto.scryptSync(valid.password, salt, 64).toString("hex");
  const values = [{ key: codeKey, value: raw }];
  const commands = [
    ["HSET", ACCOUNT_PASSWORDS_KEY, accountId, passwordRecord],
    ["HINCRBY", SESSION_VERSIONS_KEY, accountId, "1"],
  ];
  if (email) {
    const links = "poker_app:email_links", byId = "poker_app:email_by_dt_id";
    const existing = await pipeline([["HGET", links, email], ["HGET", byId, accountId]], { throwOnError: true });
    const owner = String(existing[0].result || ""), previous = String(existing[1].result || "");
    if (owner && owner !== accountId) return { ok: false, error: "Email уже связан с другим аккаунтом." };
    values.push({ key: links, field: email, value: owner }, { key: byId, field: accountId, value: previous });
    if (previous && previous !== email) {
      const old = await pipeline([["HGET", links, previous]], { throwOnError: true });
      values.push({ key: links, field: previous, value: String(old[0].result || "") });
      if (old[0].result === accountId) commands.push(["HDEL", links, previous]);
    }
    commands.push(["HSET", links, email, accountId], ["HSET", byId, accountId, email], ["HSET", "poker_app:email_originals", accountId, originalEmail || email], ["HSETNX", "poker_app:email_linked_at", accountId, String(Date.now())]);
  }
  commands.push(["DEL", codeKey], ["SET", usedKey, JSON.stringify({ payload, accountId, passwordRecord }), "EX", "180"]);
  if (replayKey) commands.push(["SET", replayKey, JSON.stringify({ userId, code, dtId: accountId }), "EX", "180"]);
  await atomicWrite(commands, { values, context: "auth.consume-password-code" });
  return { ok: true, passwordRecord, accountId };
}
module.exports = { consumePasswordCode };
