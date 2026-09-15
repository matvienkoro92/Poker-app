const test = require('node:test');
const assert = require('node:assert/strict');
const { achievementNotificationMessage: message } = require('../lib/achievement-notification-message');
test('September hero push uses the confirmed contest and prize', () => {
  assert.match(message('Герой дня', new Date('2026-09-15T10:00:00Z')), /Герой сентября.*25 000 ₽/);
});
test('Moscow month boundaries prevent advertising an ended contest', () => {
  assert.match(message('Герой дня', new Date('2026-08-31T21:00:00Z')), /25 000/);
  assert.doesNotMatch(message('Герой дня', new Date('2026-09-30T21:00:00Z')), /гонке|25 000|август/);
});
test('other achievements retain their normal message', () => {
  assert.equal(message('Победитель', new Date('2026-09-15')), 'Достижение добавлено в ваш профиль');
});
