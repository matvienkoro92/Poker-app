'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require.resolve('../app-garage-showcase.js'), 'utf8');
function setup(visitHall, lazy) {
  let click;
  const calls = [];
  const window = { PokerGarage: { canAccessHall: () => true }, addEventListener() {} };
  const hall = (...args) => calls.push(['hall', ...args]);
  const garage = (...args) => calls.push(['garage', ...args]);
  if (lazy) window.pokerEnsureLazyDomains = async () => { window.pokerOpenPlayerHall = hall; window.pokerOpenPlayerGarage = garage; };
  else { window.pokerOpenPlayerHall = hall; window.pokerOpenPlayerGarage = garage; }
  const button = {
    disabled: false, dataset: { showcaseOpen: 'ID_OTHER', showcaseFocus: 'kart' },
    hasAttribute: name => name === 'data-showcase-hall' && visitHall,
    closest: () => null,
  };
  const document = { addEventListener: (name, fn) => { if (name === 'click') click = fn; } };
  vm.runInNewContext(source, { window, document });
  const event = { target: { closest: selector => selector === '[data-showcase-open]' ? button : null }, preventDefault() {}, stopImmediatePropagation() {} };
  return { click: () => click(event), calls, button };
}
test('foreign showcase opens the exact player hall with no garage focus', async () => {
  for (const lazy of [false, true]) {
    const h = setup(true, lazy); await h.click();
    assert.deepEqual(h.calls, [['hall', 'ID_OTHER', undefined]]);
    assert.equal(h.button.disabled, false);
  }
});
test('own showcase still opens the garage editor at the selected section', async () => {
  const h = setup(false, false); await h.click();
  assert.deepEqual(h.calls, [['garage', 'ID_OTHER', 'kart']]);
});
test('public hall entry resets previous hall navigation and opens the general scene', () => {
  const hallSource = fs.readFileSync(require.resolve('../app-player-hall.js'), 'utf8');
  const code = hallSource.match(/window\.pokerOpenPlayerHall=function\(target\)\{[^\n]+/)[0];
  const calls = [], context = { window: {}, hallReturn: 'old-player', open: (...args) => calls.push(args) };
  vm.runInNewContext(code, context);
  context.window.pokerOpenPlayerHall('ID_OTHER');
  assert.equal(context.hallReturn, null);
  assert.deepEqual(calls, [['ID_OTHER']]);
});
test('table camera has a labeled return button using the bottom navigation style', () => {
  const text = fs.readFileSync(require.resolve('../app-player-hall.js'), 'utf8');
  const code = text.slice(text.indexOf('  function cameraUI()'), text.indexOf('  function syncRoom()'));
  const context = { space: 'hall', camera: 'table' };
  vm.runInNewContext(code, context);
  const html = context.cameraUI();
  assert.match(html, /hall-table-camera--back/);
  assert.match(html, /data-hall-camera="wide"/);
  assert.match(html, /← В зал/);
});
