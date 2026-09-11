const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../app-view-router.js'), 'utf8');
function runtime() {
  const attrs = new Map(), classes = new Set(), timers = new Map();
  let next = 0;
  const overlay = {
    getAttribute: key => attrs.get(key) || null,
    setAttribute: (key, value) => attrs.set(key, value),
    classList: {add: (...names) => names.forEach(n => classes.add(n)), remove: (...names) => names.forEach(n => classes.delete(n))},
    querySelector: () => null
  };
  const context = {
    document: {getElementById: id => id === 'pokerSectionLoadingOverlay' ? overlay : null, body: {getAttribute: () => null}},
    window: {}, Date, Number, String, Math,
    pokerSectionLoadingOverlayTimer: null, pokerSectionLoadingOverlayShownAt: 0,
    pokerSectionLoadingReadyWaitSeq: 0, pokerSectionLoadingTitles: {}, pokerSectionLoadingLabel: name => name,
    setTimeout: fn => {timers.set(++next, fn); return next;}, clearTimeout: id => timers.delete(id)
  };
  vm.createContext(context);
  for (const [start, end] of [
    ['pokerShowSectionLoadingOverlay', 'pokerHideSectionLoadingOverlay'],
    ['pokerHideSectionLoadingOverlay', 'pokerViewInitialContentReady'],
    ['pokerClearViewLoadingShell', 'pokerBeginProgressiveViewNavigation']
  ]) vm.runInContext(source.slice(source.indexOf('function '+start+'('), source.indexOf('function '+end+'(')), context);
  return {context, overlay, classes, flushOne() {const [id, fn] = timers.entries().next().value; timers.delete(id); fn();}};
}
test('cancelled section immediately releases the input-blocking overlay', () => {
  const r = runtime();
  r.context.pokerShowSectionLoadingOverlay('home');
  r.context.pokerClearViewLoadingShell('home', true);
  assert.equal(r.classes.has('app-boot-overlay--hidden'), true);
  assert.equal(r.overlay.getAttribute('aria-busy'), 'false');
  assert.equal(r.context.pokerSectionLoadingReadyWaitSeq, 1);
});
test('old finishing animation cannot hide a newly requested section', () => {
  const r = runtime();
  r.context.pokerShowSectionLoadingOverlay('home');
  r.context.pokerHideSectionLoadingOverlay('home', false);
  r.flushOne();
  r.context.pokerShowSectionLoadingOverlay('chat');
  r.flushOne();
  assert.equal(r.classes.has('app-boot-overlay--hidden'), false);
  assert.equal(r.overlay.getAttribute('aria-busy'), 'true');
});
test('cancelling another view does not hide the current loader', () => {
  const r = runtime();
  r.context.pokerShowSectionLoadingOverlay('chat');
  r.context.pokerHideSectionLoadingOverlay('home', true);
  assert.equal(r.classes.has('app-boot-overlay--hidden'), false);
});
