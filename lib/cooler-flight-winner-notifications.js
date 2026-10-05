'use strict';
const records = require('./cooler-flight-record-notifications');
const QUEUE_KEY = 'poker_app:cooler_flight:winner_notifications:v1';
const escape = value => String(value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function text(winner) {
  const date = String(winner.date).split('-').reverse().join('.');
  return `🏆 Победитель дня в Кулершане — ${escape(date)}!\n\n${escape(winner.name)} — <b>${Number(winner.score)} очков</b>.\n\nПриз: <b>${escape(winner.prize)}</b>.\nРезультаты закрыты в 17:00 МСК. Поздравляем!\n\nНовый игровой день уже начался — попробуй выиграть следующий приз 👇`;
}
function flush(commands, dependencies = {}) {
  return records.flush(commands, { ...dependencies, queueKey: QUEUE_KEY, notificationScope: 'cooler-winner', text });
}
module.exports = { QUEUE_KEY, text, flush };
