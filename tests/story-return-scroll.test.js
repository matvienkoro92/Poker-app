'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require.resolve('../app-navigation-scroll.js'), 'utf8');
const restoreSource = source.slice(source.indexOf('// Preserve the exact app screen'));
function fixture() {
  let view = 'profile', y = 0, now = 1000, saved = JSON.stringify({ pending: true, view: 'profile', panelY: 900, windowY: 0 });
  const timers = new Map(), listeners = new Map();
  let id = 0;
  const panel = { get scrollTop() { return y; }, set scrollTop(value) { y = value; } };
  const window = {
    setView(value) { view = value; }, scrollTo() {},
    addEventListener(type, fn) { if (!listeners.has(type)) listeners.set(type, new Set()); listeners.get(type).add(fn); },
    removeEventListener(type, fn) { listeners.get(type)?.delete(fn); }
  };
  vm.runInNewContext(restoreSource, { window, document: { readyState: 'complete', body: { getAttribute() { return view; } }, addEventListener() {} },
    sessionStorage: { getItem() { return saved; }, removeItem() { saved = null; } },
    pokerGetPanelScrollCardContentEl() { return panel; }, Date: { now() { return now; } },
    setInterval(fn) { timers.set(++id, fn); return id; }, clearInterval(i) { timers.delete(i); }
  });
  return { tick() { now += 100; [...timers.values()].forEach(fn => fn()); }, input(type) { [...(listeners.get(type) || [])].forEach(fn => fn()); },
    get y() { return y; }, set y(value) { y = value; }, set view(value) { view = value; }, get saved() { return saved; },
    get active() { return timers.size; }, pageshow() { [...listeners.get('pageshow')].forEach(fn => fn()); } };
}
for (const type of ['touchstart', 'wheel', 'pointerdown', 'keydown']) {
  test(`story return releases scroll on ${type}`, () => {
    const f = fixture(); f.tick(); assert.equal(f.y, 900);
    f.input(type); f.y = 1400; for (let i = 0; i < 30; i++) f.tick();
    assert.equal(f.y, 1400); assert.equal(f.saved, null); assert.equal(f.active, 0);
  });
}
test('navigation away is not pulled back to profile', () => {
  const f = fixture(); f.tick(); f.view = 'home'; f.y = 200; f.tick();
  assert.equal(f.y, 200); assert.equal(f.active, 0);
});
test('duplicate pageshow replaces restoration and settled restoration ends', () => {
  const f = fixture(); f.pageshow(); assert.equal(f.active, 1);
  for (let i = 0; i < 22; i++) f.tick();
  assert.equal(f.y, 900); assert.equal(f.active, 0); assert.equal(f.saved, null);
});
test('input before first restoration preserves the new position', () => {
  const f = fixture(); f.input('touchstart'); f.y = 300; f.tick(); assert.equal(f.y, 300); assert.equal(f.active, 0);
});
