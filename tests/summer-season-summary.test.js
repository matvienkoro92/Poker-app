const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require.resolve('../app-rating-view-adapter'), 'utf8');
const ctx = {};
vm.runInNewContext(source.slice(0, source.indexOf('function summerRatingSeasonStatsHtml')), ctx);
test('summer totals combine players, retain separate wins and respect thresholds and season', () => {
  const data = {
    '01.06.2026': [{ players: [{ nick: 'A', reward: 50000 }, { nick: 'B', reward: 99999 }, { nick: 'C', reward: 49999 }] }],
    '01.08.2026': [{ players: [{ nick: 'a', reward: 100000 }, { nick: 'A', reward: 200000 }, { nick: 'Z', reward: -10 }] }],
    '01.09.2026': [{ players: [{ nick: 'X', reward: 999999 }] }],
    '01.06.2025': [{ players: [{ nick: 'X', reward: 999999 }] }]
  };
  const stats = ctx.summerRatingSeasonStats(data);
  assert.equal(stats.total, 499998);
  assert.equal(stats.mid, 2);
  assert.equal(stats.high, 2);
  assert.equal(stats.topPlayers[0].reward, 350000);
  assert.equal(stats.topWins.length, 5);
  assert.equal(stats.topWins[0].reward, 200000);
  assert.equal(stats.topWins[1].reward, 100000);
});
test('both lists are limited to ten rows', () => {
  const stats = ctx.summerRatingSeasonStats({'01.07.2026': [{players:Array.from({length:15},(_,i)=>({nick:'P'+i,reward:i+1}))}]});
  assert.equal(stats.topPlayers.length,10);
  assert.equal(stats.topWins.length,10);
});
