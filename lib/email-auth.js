const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("./redis");
const { ensureDtIdForUserId, getDtIdByUserId, getPreferredUserIdByDtId, getUserIdByDtId } = require("./account-id");

const EMAIL_LINKS_KEY = "poker_app:email_links";
const EMAIL_ORIGINALS_KEY = "poker_app:email_originals";
const EMAIL_LINKED_AT_KEY = "poker_app:email_linked_at";
const EMAIL_CODE_PREFIX = "poker_app:email_code:";

function normalizeEmail(raw) {
  const email = String(raw || "")
    .trim()
    .toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "";
  return email.slice(0, 190);
}

function normalizeEmailOriginal(raw) {
  const email = String(raw || "").trim();
  const canonical = normalizeEmail(email);
  if (!canonical) return "";
  return email.slice(0, 190);
}

function emailCodeKey(email) {
  return EMAIL_CODE_PREFIX + email;
}

function generateEmailCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function getLinkedDtIdByEmail(email) {
  const normalized = normalizeEmail(email);
  if (!normalized) return null;
  const res = await redisPipeline([["HGET", EMAIL_LINKS_KEY, normalized]]);
  const value = res && res[0] && res[0].result != null ? String(res[0].result).trim() : "";
  return value || null;
}

async function getLinkedEmailByDtId(dtId) {
  if (!dtId) return null;
  const res = await redisPipeline([["HGETALL", EMAIL_LINKS_KEY]]);
  const raw = res && res[0] && res[0].result;
  if (Array.isArray(raw)) {
    for (let i = 0; i < raw.length; i += 2) {
      const email = raw[i] != null ? String(raw[i]).trim() : "";
      const linkedDtId = raw[i + 1] != null ? String(raw[i + 1]).trim() : "";
      if (email && linkedDtId === dtId) return email;
    }
  } else if (raw && typeof raw === "object") {
    for (const email of Object.keys(raw)) {
      if (String(raw[email] || "").trim() === dtId) return String(email).trim();
    }
  }
  return null;
}

async function getLinkedEmailOriginalByDtId(dtId) {
  if (!dtId) return null;
  const res = await redisPipeline([["HGET", EMAIL_ORIGINALS_KEY, String(dtId)]]);
  const original = res && res[0] && res[0].result != null ? String(res[0].result).trim() : "";
  if (original) return original;
  return getLinkedEmailByDtId(dtId);
}

async function saveEmailCode(email, payload, ttlSec) {
  const normalized = normalizeEmail(email);
  if (!normalized) return false;
  const res = await redisPipeline([["SETEX", emailCodeKey(normalized), String(ttlSec || 600), JSON.stringify(payload)]]);
  return !!(res && (!res[0] || !res[0].error));
}

async function readEmailCode(email) {
  const normalized = normalizeEmail(email);
  if (!normalized) return null;
  const res = await redisPipeline([["GET", emailCodeKey(normalized)]]);
  const raw = res && res[0] ? res[0].result : null;
  if (!raw) return null;
  try {
    return JSON.parse(String(raw));
  } catch (e) {
    return null;
  }
}

async function clearEmailCode(email) {
  const normalized = normalizeEmail(email);
  if (!normalized) return;
  await redisPipeline([["DEL", emailCodeKey(normalized)]]);
}

async function linkEmailToDtId(email, dtId) {
  const normalized = normalizeEmail(email);
  const original = normalizeEmailOriginal(email);
  if (!normalized || !dtId) return false;
  const previousEmail = await getLinkedEmailByDtId(String(dtId));
  const commands = [];
  if (previousEmail && previousEmail !== normalized) {
    commands.push(["HDEL", EMAIL_LINKS_KEY, previousEmail]);
  }
  commands.push(["HSET", EMAIL_LINKS_KEY, normalized, String(dtId)]);
  commands.push(["HSET", EMAIL_ORIGINALS_KEY, String(dtId), original || normalized]);
  commands.push(["HSETNX", EMAIL_LINKED_AT_KEY, String(dtId), String(Date.now())]);
  const res = await redisPipeline(commands);
  return !!(res && (!res[0] || !res[0].error));
}

async function sendEmailCode(email, code) {
  const apiKey = process.env.RESEND_API_KEY || "";
  const fromEmail = process.env.EMAIL_AUTH_FROM || process.env.EMAIL_FROM || "";
  if (!apiKey || !fromEmail) {
    return { ok: false, userMessage: "Сервер пока не настроен для отправки писем." };
  }
  const subject = "Код входа в TWO ACES";
  const html =
    "<div style=\"font-family:Arial,sans-serif;font-size:16px;line-height:1.5;color:#111\">" +
    "<p>Ваш код входа в TWO ACES:</p>" +
    "<p style=\"font-size:28px;font-weight:700;letter-spacing:4px;margin:16px 0\">" +
    code +
    "</p>" +
    "<p>Код действует 10 минут.</p>" +
    "<p>Если это были не вы, просто проигнорируйте письмо.</p>" +
    "</div>";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [email],
        subject,
        html,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) return { ok: true };
    const msg = data && data.message ? String(data.message) : "";
    return { ok: false, userMessage: msg || "Не удалось отправить письмо. Попробуйте позже." };
  } catch (e) {
    return { ok: false, userMessage: "Письмо не отправилось из-за ошибки сети. Попробуйте позже." };
  }
}

module.exports = {
  EMAIL_LINKS_KEY,
  EMAIL_ORIGINALS_KEY,
  clearEmailCode,
  ensureDtIdForUserId,
  generateEmailCode,
  getDtIdByUserId,
  getLinkedDtIdByEmail,
  getLinkedEmailByDtId,
  getLinkedEmailOriginalByDtId,
  getPreferredUserIdByDtId,
  getUserIdByDtId,
  linkEmailToDtId,
  normalizeEmail,
  normalizeEmailOriginal,
  readEmailCode,
  redisPipeline,
  saveEmailCode,
  sendEmailCode,
};
