/**
 * Стабильный внутренний id для гостя PWA по deviceId (тот же id в профиле и розыгрышах).
 */
const crypto = require("crypto");

const GUEST_DEVICE_SALT = "poker_guest_device:";

function guestMemberIdFromDeviceId(deviceId) {
  const d = String(deviceId || "")
    .trim()
    .slice(0, 128);
  if (!d || d.length < 8 || !/^[a-zA-Z0-9_-]+$/.test(d)) return null;
  const hash = crypto.createHash("sha256").update(GUEST_DEVICE_SALT + d).digest("hex").slice(0, 20);
  return "guest_" + hash;
}

module.exports = { guestMemberIdFromDeviceId, GUEST_DEVICE_SALT };
