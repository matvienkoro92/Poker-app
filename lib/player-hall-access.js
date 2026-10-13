'use strict';

// This pilot access grants no administrator permissions.
function hasPlayerHallPilotAccess(identity) {
  if (!identity || identity.vkId != null) return false;
  const username = String(identity.telegramUsername || identity.pwaUsername || '')
    .replace(/^@+/, '').trim().toLowerCase();
  return username === 'polyapineapple';
}

module.exports = { hasPlayerHallPilotAccess };
