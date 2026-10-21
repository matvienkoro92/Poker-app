'use strict';

// This pilot access grants no administrator permissions.
function hasPlayerHallPilotAccess(identity) {
  if (!identity || identity.vkId != null) return false;
  const username = String(identity.telegramUsername || identity.pwaUsername || '')
    .replace(/^@+/, '').trim().toLowerCase();
  return ['polyapineapple', 'qweenpoker'].includes(username);
}

function hasVillaOwnerAccess(identity) {
  if (!identity || identity.vkId != null) return false;
  const id = String(identity.id || '').replace(/^tg_/, '');
  const username = String(identity.telegramUsername || identity.pwaUsername || '').replace(/^@+/, '').trim().toLowerCase();
  return ['388008256', '5053253480'].includes(id) || ['roman1787443', 'roman1_matvienko', 'matvienkoro92@gmail.com', 'matvienko.r2@yandex.ru'].includes(username);
}
module.exports = { hasPlayerHallPilotAccess, hasVillaOwnerAccess };
