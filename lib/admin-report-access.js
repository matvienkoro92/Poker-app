"use strict";

const DEFAULT_REPORT_ADMIN_IDS = ["2144406710", "1897001087"];
const DEFAULT_REPORT_ADMIN_USERNAMES = ["roman1787443", "roman1_matvienko"];
const DEFAULT_REPORT_ADMIN_EMAILS = ["matvienkoro92@gmail.com"];

function splitEnvList(value) {
  return String(value || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function uniq(arr) {
  return arr.filter((item, index) => item && arr.indexOf(item) === index);
}

const REPORT_ADMIN_IDS = uniq(
  splitEnvList(process.env.ADMIN_REPORT_TELEGRAM_IDS || process.env.ADMIN_REPORT_TELEGRAM_ID).concat(DEFAULT_REPORT_ADMIN_IDS),
);

const REPORT_ADMIN_USERNAMES = uniq(
  splitEnvList(process.env.ADMIN_REPORT_USERNAMES || process.env.ADMIN_REPORT_USERNAME)
    .map((s) => s.replace(/^@+/, "").trim().toLowerCase())
    .concat(DEFAULT_REPORT_ADMIN_USERNAMES),
);

const REPORT_ADMIN_EMAILS = uniq(
  splitEnvList(process.env.ADMIN_REPORT_EMAILS || process.env.ADMIN_REPORT_EMAIL)
    .map((s) => s.trim().toLowerCase())
    .concat(DEFAULT_REPORT_ADMIN_EMAILS),
);

function normalizeId(id) {
  return String(id || "").replace(/^tg_/, "").trim();
}

function isAdminReportId(id) {
  const normalized = normalizeId(id);
  return Boolean(normalized && REPORT_ADMIN_IDS.includes(normalized));
}

function isAdminReportUsername(username) {
  const normalized = String(username || "").replace(/^@+/, "").trim().toLowerCase();
  return Boolean(normalized && REPORT_ADMIN_USERNAMES.includes(normalized));
}

function isAdminReportEmail(email) {
  const normalized = String(email || "").trim().toLowerCase();
  return Boolean(normalized && REPORT_ADMIN_EMAILS.includes(normalized));
}

function isAdminReportIdentity(identity, memberId) {
  if (memberId && isAdminReportId(memberId)) return true;
  if (!identity) return false;
  if (identity.adminReportAccess === true) return true;
  if (identity.id != null && isAdminReportId(identity.id)) return true;
  if (isAdminReportUsername(identity.telegramUsername || identity.pwaUsername || identity.username || "")) return true;
  return isAdminReportEmail(identity.email || "");
}

module.exports = {
  REPORT_ADMIN_EMAILS,
  REPORT_ADMIN_IDS,
  REPORT_ADMIN_USERNAMES,
  isAdminReportEmail,
  isAdminReportId,
  isAdminReportIdentity,
  isAdminReportUsername,
};
