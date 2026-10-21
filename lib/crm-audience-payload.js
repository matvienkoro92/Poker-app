'use strict';
const fields = ['id', 'accountId', 'name', 'handle', 'dtId', 'telegramIds', 'pokerPlusUserId', 'channels', 'deposits', 'lastMessageDays', 'lastDepositDays', 'lastTouchDays', 'touches', 'appBlocked', 'crm'];
function compactAudience(players) {
  return {
    playerFields: fields,
    players: players.map(player => {
      const touch = (player.touches || []).find(row => Number.isFinite(Date.parse(row?.at || row?.createdAt || '')));
      const value = { ...player, channels: { bot: !!player.channels?.bot, push: !!player.channels?.push },
        touches: touch ? [{ at: touch.at || touch.createdAt }] : [], crm: { excludeBroadcast: !!player.crm?.excludeBroadcast } };
      return fields.map(key => value[key] ?? null);
    }),
  };
}
module.exports = { compactAudience };
