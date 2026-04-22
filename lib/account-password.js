const crypto = require("crypto");
const { redisPipeline } = require("./account-id");

const ACCOUNT_PASSWORDS_KEY = "poker_app:account_passwords";
const PASSWORD_MIN_LEN = 6;

function normalizePassword(raw) {
  return String(raw || "").trim();
}

function validatePassword(raw) {
  const password = normalizePassword(raw);
  if (password.length < PASSWORD_MIN_LEN) {
    return { ok: false, error: `Пароль должен быть не короче ${PASSWORD_MIN_LEN} символов.` };
  }
  if (password.length > 128) {
    return { ok: false, error: "Пароль слишком длинный." };
  }
  return { ok: true, password };
}

function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

async function getAccountPasswordRecord(dtId) {
  const accountId = String(dtId || "").trim();
  if (!accountId) return "";
  const res = await redisPipeline([["HGET", ACCOUNT_PASSWORDS_KEY, accountId]]);
  return res && res[0] && res[0].result != null ? String(res[0].result).trim() : "";
}

async function hasAccountPassword(dtId) {
  return !!(await getAccountPasswordRecord(dtId));
}

async function setAccountPassword(dtId, rawPassword) {
  const accountId = String(dtId || "").trim();
  if (!accountId) return { ok: false, error: "Не удалось определить аккаунт." };
  const validated = validatePassword(rawPassword);
  if (!validated.ok) return validated;
  const salt = crypto.randomBytes(16).toString("hex");
  const digest = hashPassword(validated.password, salt);
  const record = `${salt}:${digest}`;
  const saved = await redisPipeline([["HSET", ACCOUNT_PASSWORDS_KEY, accountId, record]]);
  return saved ? { ok: true } : { ok: false, error: "Не удалось сохранить пароль." };
}

async function verifyAccountPassword(dtId, rawPassword) {
  const accountId = String(dtId || "").trim();
  if (!accountId) return { ok: false, error: "Не удалось определить аккаунт." };
  const validated = validatePassword(rawPassword);
  if (!validated.ok) return validated;
  const record = await getAccountPasswordRecord(accountId);
  if (!record) return { ok: false, error: "PASSWORD_NOT_SET" };
  const parts = record.split(":");
  if (parts.length !== 2 || !parts[0] || !parts[1]) return { ok: false, error: "PASSWORD_NOT_SET" };
  const digest = hashPassword(validated.password, parts[0]);
  if (digest !== parts[1]) return { ok: false, error: "Неверный пароль." };
  return { ok: true };
}

module.exports = {
  ACCOUNT_PASSWORDS_KEY,
  PASSWORD_MIN_LEN,
  getAccountPasswordRecord,
  hasAccountPassword,
  normalizePassword,
  setAccountPassword,
  validatePassword,
  verifyAccountPassword,
};
