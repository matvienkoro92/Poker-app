const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../app-daily-poker.js'), 'utf8');
const context = { cleanSentencePart: value => value.trim().replace(/[.!?]+$/g, ''), formatRubles: n => n + ' ₽' };
vm.createContext(context);
vm.runInContext(source.slice(source.indexOf('  function dailyPokerWinShareText('), source.indexOf('  // Snapshot the live table')), context);
test('win caption uses the actual reward instead of repeating the in-game notification', () => {
  assert.equal(context.dailyPokerWinShareText({ handName: 'Сет', reward: { grantsExtraAttempt: true, message: 'Сет! Ты получаешь еще одну попытку сегодня.' } }), 'Мой выигрыш в раздаче дня клуба «Два туза»: Сет. Мой приз — ещё одна попытка сегодня. Попробуйте тоже бесплатно!');
});
test('win caption includes combined bonuses and streak tickets', () => {
  const text = context.dailyPokerWinShareText({ handName: 'Флеш', reward: { bonusAmount: 50, grantsExtraAttempt: true }, ticketlessStreakAward: { amount: 300 } });
  assert.match(text, /50 бонусов и ещё одна попытка сегодня и билет за 300 ₽/);
  assert.match(context.dailyPokerWinShareText({ handName: 'Фулл-хаус', reward: { ticketAmount: 300 } }), /билет на турнир за 300 ₽/);
});
