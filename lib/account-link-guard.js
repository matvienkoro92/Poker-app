const { getDtIdByUserId } = require("./account-id");
const { resolveDtIdFromLinkedPwaSession } = require("./pwa-session-link");

function normalizeDtId(raw) {
  const value = String(raw || "").trim().toUpperCase();
  return /^ID\d{6}$/.test(value) ? value : "";
}

async function resolveTrustedAuthDtId(options) {
  const opts = options && typeof options === "object" ? options : {};
  const userId = String(opts.userId || "").trim();
  const hint = normalizeDtId(opts.dtIdHint);
  const linkedSessionDtId = normalizeDtId(await resolveDtIdFromLinkedPwaSession(opts.body || {}, opts.botToken || ""));
  const existingDtIdRaw = userId ? await getDtIdByUserId(userId) : "";
  const existingDtId = normalizeDtId(existingDtIdRaw);
  const trustedHint = hint && (hint === linkedSessionDtId || hint === existingDtId) ? hint : "";
  return {
    dtId: linkedSessionDtId || trustedHint || existingDtId || "",
    existingDtId,
    ignoredHint: !!hint && !trustedHint,
    linkedSessionDtId,
    trustedHint,
  };
}

async function resolveTrustedDtIdHintForUserId(userId, dtIdHint) {
  const rawUserId = String(userId || "").trim();
  const hint = normalizeDtId(dtIdHint);
  if (!rawUserId || !hint) return "";
  const existingDtId = normalizeDtId(await getDtIdByUserId(rawUserId));
  return existingDtId === hint ? hint : "";
}

module.exports = {
  normalizeDtId,
  resolveTrustedAuthDtId,
  resolveTrustedDtIdHintForUserId,
};
