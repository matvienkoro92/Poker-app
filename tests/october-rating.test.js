'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
test('October is shown separately from September and summer archive', () => {
  const c = { window: {}, document: { body: { getAttribute: () => 'summer-rating' } },
    SUMMER_RATING_SEASON: { key: 'summer', label: 'Лето 2026' },
    SUMMER_RATING_TOURNAMENTS_BY_DATE: { '01.08.2026': [] },
    SUMMER_RATING_TOURNAMENTS_SEPTEMBER_BY_DATE: { '30.09.2026': [] },
    SUMMER_RATING_TOURNAMENTS_OCTOBER_BY_DATE: { '01.10.2026': [{ name: 'PLO4', buyin: 200, players: [{ place: 7, reward: 989, points: 0 }] }] },
    winterRatingPointsForPlace: () => 40 };
  vm.createContext(c);
  for (const file of ['app-rating-data-registry.js', 'app-rating.js']) vm.runInContext(fs.readFileSync(file, 'utf8').split('window.openWinterRatingPlayerModalReady =')[0], c);
  const data = c.pokerRatingGetSummerTournamentsByDate();
  assert.deepEqual(Object.keys(data), ['01.10.2026']);
  assert.equal(data['01.10.2026'][0].league, 2);
  assert.equal(data['01.10.2026'][0].players[0].points, 40);
  assert.equal(c.SUMMER_RATING_TOURNAMENTS_OCTOBER_BY_DATE['01.10.2026'][0].players[0].points, 0);
  assert.equal(c.getRatingSeasonConfig().label, 'Октябрь 2026');
  c.window.__pokerSummerArchive = true;
  assert.deepEqual(Object.keys(c.pokerRatingGetSummerTournamentsByDate()), ['01.08.2026']);
  assert.equal(c.getRatingSeasonConfig().label, 'Лето 2026');
});
