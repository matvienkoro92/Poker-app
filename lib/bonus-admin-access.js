"use strict";

const { isAdminIdentity } = require("./api-auth");

const DEFAULT_BONUS_ADMIN_USERNAMES = ["roman1787443"];

function splitEnvList(value) {
  return String(value || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function uniq(arr) {
  return arr.filter((item, index) => item && arr.indexOf(item) === index);
}

const BONUS_ADMIN_USERNAMES = uniq(
  splitEnvList(process.env.BONUS_ADMIN_USERNAMES || process.env.BONUS_ADMIN_USERNAME)
    .map((s) => s.replace(/^@+/, "").trim().toLowerCase())
    .concat(DEFAULT_BONUS_ADMIN_USERNAMES),
);

function isBonusAdminUsername(username) {
  const normalized = String(username || "").replace(/^@+/, "").trim().toLowerCase();
  return Boolean(normalized && BONUS_ADMIN_USERNAMES.includes(normalized));
}

function isBonusAdminIdentity(identity, memberId) {
  if (isAdminIdentity(identity, memberId)) return true;
  if (!identity || identity.vkId != null || /^vk_/.test(String(memberId || identity.emailMemberId || ""))) return false;
  return isBonusAdminUsername(identity.telegramUsername || identity.pwaUsername || identity.username || "");
}

module.exports = {
  BONUS_ADMIN_USERNAMES,
  isBonusAdminIdentity,
  isBonusAdminUsername,
};
