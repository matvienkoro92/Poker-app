const { pipeline: redisPipeline } = require("./redis");

const REFERRAL_REFERRER_HASH = "poker_app:referrals:referrer";
const REFERRAL_AT_HASH = "poker_app:referrals:at";
const REFERRAL_SOURCE_HASH = "poker_app:referrals:source";

function normalizeReferralAccountId(raw) {
  const s = String(raw || "").trim();
  return /^ID\d{6}$/.test(s) ? s : "";
}

function splitReferralStartParam(raw) {
  let start = String(raw || "").trim();
  if (!start) return { routeStartParam: "", referrerId: "" };
  try {
    start = decodeURIComponent(start.replace(/\+/g, " "));
  } catch (e) {}
  start = start.trim();
  const wrapped = start.match(/^startapp=([^&]+)$/i);
  if (wrapped && wrapped[1]) {
    try {
      start = decodeURIComponent(String(wrapped[1]).trim());
    } catch (eWrap) {
      start = String(wrapped[1]).trim();
    }
  }
  const match = start.match(/^(.*?)__ref_(ID\d{6})$/);
  if (match) {
    return {
      routeStartParam: String(match[1] || "").trim() || "home",
      referrerId: normalizeReferralAccountId(match[2]),
    };
  }
  const direct = start.match(/^ref_(ID\d{6})$/);
  if (direct) return { routeStartParam: "home", referrerId: normalizeReferralAccountId(direct[1]) };
  return { routeStartParam: start, referrerId: "" };
}

function referralFromBodyOrInitData(body, initData) {
  const srcBody = body && typeof body === "object" ? body : {};
  let referrerId = normalizeReferralAccountId(srcBody.referrerId || srcBody.referrer_id);
  let routeStartParam = "";
  const rawStart =
    srcBody.referralStartParam ||
    srcBody.referral_start_param ||
    srcBody.startParam ||
    srcBody.start_param ||
    "";
  if (!referrerId && rawStart) {
    const parsed = splitReferralStartParam(rawStart);
    referrerId = parsed.referrerId;
    routeStartParam = parsed.routeStartParam;
  }
  if (!referrerId && initData) {
    try {
      const sp = new URLSearchParams(String(initData));
      const parsed = splitReferralStartParam(sp.get("start_param") || "");
      referrerId = parsed.referrerId;
      routeStartParam = parsed.routeStartParam;
    } catch (eInit) {}
  }
  return { referrerId, routeStartParam };
}

async function applyReferralForAccount(accountId, body, opts = {}) {
  const referredId = normalizeReferralAccountId(accountId);
  if (!referredId) return null;
  const parsed = referralFromBodyOrInitData(body, opts.initData || "");
  const referrerId = normalizeReferralAccountId(parsed.referrerId);
  if (!referrerId || referrerId === referredId) return null;
  const source = String(parsed.routeStartParam || "").trim().slice(0, 160);
  const now = String(Date.now());
  const commands = [
    ["HSETNX", REFERRAL_REFERRER_HASH, referredId, referrerId],
    ["HSETNX", REFERRAL_AT_HASH, referredId, now],
  ];
  if (source) commands.push(["HSETNX", REFERRAL_SOURCE_HASH, referredId, source]);
  await redisPipeline(commands);
  return { referredId, referrerId, source };
}

module.exports = {
  REFERRAL_REFERRER_HASH,
  REFERRAL_AT_HASH,
  REFERRAL_SOURCE_HASH,
  normalizeReferralAccountId,
  splitReferralStartParam,
  referralFromBodyOrInitData,
  applyReferralForAccount,
};
