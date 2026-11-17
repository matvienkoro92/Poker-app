'use strict';

const HANDS = require('./daily-poker').HAND_NAMES;
const RANKS = new Set(['four_of_a_kind', 'straight_flush', 'royal_flush']);
function eligible(game) {
  return !!game && RANKS.has(game.hand_rank) && game.hole_cards_contribute === true &&
    !game.board_only_reward_blocked && Number(game.ticket_balance_credited) > 0;
}
function message(game, name) {
  const player = String(name || 'Игрок').replace(/[\u0000-\u001f\u007f-\u009f\u2028\u2029]/g, ' ').slice(0, 100);
  const amount = Number(game.ticket_balance_credited).toLocaleString('ru-RU');
  const url = new URL(process.env.MINI_APP_URL || process.env.APP_URL || 'https://t.me/Poker_dvatuza_bot/DvaTuza');
  url.searchParams.set('startapp', 'daily_poker');
  return {
    text: ['🎉 ' + HANDS[game.hand_rank] + ' в «Раздаче дня»!', '',
      'Игрок: ' + player, '🎟 Бонус: билет за ' + amount + ' ₽ зачислен на баланс.'].join('\n'),
    reply_markup: { inline_keyboard: [[{ text: '🃏 Крутить «Раздачу дня»', url: url.href }]] },
  };
}
async function notify({ game, name, commands, playersGroup, send }) {
  if (!eligible(game) || !/^dpg_\d+_[a-f0-9]+$/.test(String(game.id))) return false;
  const chat = String(await playersGroup());
  if (!/^-\d+$/.test(chat)) return false;
  const key = 'poker_app:daily_poker_win_notice:' + game.id;
  const [claim] = await commands([['SET', key, 'pending', 'NX', 'EX', 2592000]]);
  if (!claim) return false;
  // Preserve the claim on ambiguous network failures to avoid duplicate announcements.
  const response = await send({ chat_id: chat, ...message(game, name) });
  const data = await response.json();
  if (!response.ok || !data.ok) {
    await commands([['DEL', key]]);
    throw Error('Telegram rejected daily poker win notification');
  }
  await commands([['SET', key, String(data.result?.message_id || 'sent'), 'XX', 'KEEPTTL']]);
  return true;
}
module.exports = async function ({ game, name, token }) {
  if (!token || !eligible(game)) return false;
  return notify({ game, name,
    commands: async commands => {
      const rows = await require('./redis').pipeline(commands, { throwOnError: true, context: 'daily-poker.win-notification' });
      if (!rows || rows.some(row => row.error)) throw Error('Win notification storage unavailable');
      return rows.map(row => row.result);
    },
    playersGroup: () => require('./tracking-link-milestones').playersGroup(),
    send: payload => require('./telegram-group-policy').guardedFetch('https://api.telegram.org/bot' + token + '/sendMessage', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    }, 'daily-poker-win'),
  });
};
module.exports.eligible = eligible;
module.exports.message = message;
module.exports.notify = notify;
