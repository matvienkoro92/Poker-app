'use strict';

const {sendTelegramMessage} = require('./telegram-bot-send');
const titles = {billiards: 'Бильярд', chess: 'Шахматы', short: 'Короткие нарды', long: 'Длинные нарды'};

module.exports = async function notifyAccepted({family, member, view, commands, token, loadRoom}) {
  if (view?.tournament) return;
  if (!token || !view.ready || view.player !== 1) return;
  const game = family === 'billiards' ? family : view.state?.discipline;
  if (!Object.hasOwn(titles, game)) return;
  const room = await loadRoom(view.roomId);
  if (room?.players?.[1] !== member) return;
  const chatId = /^tg_([1-9]\d*)$/.exec(room.players[0])?.[1];
  if (!chatId) return;

  const key = 'poker_app:game-accepted-private:' + family + ':' + view.roomId;
  const [reserved] = await commands([['SET', key, '1', 'NX', 'EX', 7200]]);
  if (!reserved) return;
  const opponent = view.playerProfiles?.[1]?.name || 'Соперник';
  const prefix = family === 'billiards' ? 'billiards_' : 'board_';
  await sendTelegramMessage(token, {
    chatId,
    text: titles[game] + ' · Ваш вызов принят!\n\nСоперник: ' + opponent,
    buttonText: 'Войти в игру',
    buttonUrl: 'https://t.me/Poker_dvatuza_bot/DvaTuza?startapp=' + prefix + view.roomId,
  });
};
