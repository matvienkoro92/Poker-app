'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync(require.resolve('../app-games.js'), 'utf8');
function setup(initial, blocked = false) {
  let now = Date.parse('2026-10-15T12:00:00Z'), saved = initial == null ? null : JSON.stringify(initial);
  class Clock extends Date { constructor(...args) { super(...(args.length ? args : [now])); } }
  const math = Object.create(Math); math.random = () => 0;
  const context = vm.createContext({ Date: Clock, Math: math, localStorage: {
    getItem() { if (blocked) throw Error('blocked'); return saved; },
    setItem(_, value) { if (blocked) throw Error('blocked'); saved = value; },
  } });
  vm.runInContext(source.slice(0, source.indexOf('function updateDailyPredictionBadge()')), context);
  return { context, nextDay: () => { now += 86400000; }, read: () => JSON.parse(saved) };
}
test('catalog has 120 distinct predictions that fit a short card', () => {
  const { context: c } = setup(), rows = Array.from(c.POKER_DAILY_PREDICTIONS);
  assert.equal(rows.length, 120);
  assert.equal(new Set(rows).size, 120);
  assert.ok(rows.every(text => text.length >= 45 && text.length <= 260));
});
test('all daily openings share one prediction; the full catalog passes before any repeat', () => {
  const h = setup(), seen = new Set();
  for (let day = 0; day < 120; day++) {
    const text = h.context.getPokerDailyPredictionForToday();
    assert.equal(h.context.getPokerDailyPredictionForToday(), text);
    assert.ok(!seen.has(text), 'unexpected repeat on day ' + day);
    seen.add(text); h.nextDay();
  }
  assert.equal(seen.size, 120);
  assert.ok(seen.has(h.context.getPokerDailyPredictionForToday()));
});
test('legacy or invalid stored predictions migrate to the new catalog safely', () => {
  for (const state of [{date:'2026-10-15',index:9999,read:true}, {version:2,date:'2026-10-15',index:-1,history:[null,'bad',9999]}]) {
    const h = setup(state);
    assert.ok(h.context.getPokerDailyPredictionForToday());
    assert.equal(h.read().version, 2);
    assert.ok(h.read().index >= 0 && h.read().index < 120);
  }
});
test('read state survives reopening and denied storage still keeps the daily result', () => {
  const h = setup(); const text = h.context.getPokerDailyPredictionForToday();
  h.context.markDailyPredictionRead();
  assert.equal(h.read().read, true);
  assert.equal(setup(h.read()).context.getPokerDailyPredictionForToday(), text);
  const blocked = setup(null, true);
  const first = blocked.context.getPokerDailyPredictionForToday();
  assert.equal(blocked.context.getPokerDailyPredictionForToday(), first);
});
