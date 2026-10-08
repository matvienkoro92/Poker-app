const test = require('node:test');
const assert = require('node:assert/strict');
const { tablePages } = require('../lib/telegram-club-commands');
const base = { leagueId: '184691', playerCount: 2, playType: 'NLH', deskName: 'Bonus Game', blindAnnotation: '5/10' };

test('table messages show occupied seat IDs in seat order and omit empty or invalid seats', () => {
  const text = tablePages([{ ...base, pos: { pos9: '9007199254740993', pos1: 990919, pos2: 0, pos3: '0', pos4: null, pos5: '<b>bad</b>' } }], 'cash', new Map([['990919', 'Ник <&>']])).join('\n');
  assert.match(text, /Игроки · место \/ ID \/ ник:\n1\. <code>990919<\/code> — Ник &lt;&amp;&gt;\n9\. <code>9007199254740993<\/code> — ник неизвестен/);
  assert.doesNotMatch(text, /<code>0<\/code>|bad/);
  assert.match(text, /Игроков: 2 · Блайнды: 5\/10/);
});

test('older table responses keep rendering and private table seating stays excluded', () => {
  const text = tablePages([base, { ...base, leagueId: 'private', pos: { pos1: 123456 } }], 'cash').join('\n');
  assert.match(text, /Bonus Game/);
  assert.doesNotMatch(text, /Игроки · место|123456/);
});

test('seating also appears for tournament tables and long batches paginate', () => {
  const rows = Array.from({ length: 40 }, (_, i) => ({ ...base, deskName: 'SNG ' + i, playType: 'SNG', pos: { pos1: 990919, pos9: '9007199254740993' } }));
  const pages = tablePages(rows, 'tournaments');
  assert.ok(pages.length > 1);
  assert.ok(pages.every(page => page.length <= 3500));
  assert.equal((pages.join('\n').match(/Игроки · место/g) || []).length, 40);
  for (const page of pages) assert.equal((page.match(/<code>/g) || []).length, (page.match(/<\/code>/g) || []).length);
});
