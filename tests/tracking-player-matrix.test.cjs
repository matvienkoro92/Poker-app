'use strict';
const test = require('node:test'), assert = require('node:assert/strict'), vm = require('node:vm'), fs = require('node:fs');
const source = fs.readFileSync(require.resolve('../app-player-crm-runtime-core'), 'utf8');
const start = source.indexOf('  function crmLinkPlayersMatrixHtml('), end = source.indexOf('  function renderCrmLinkDetailsModal(', start);
function render(steps) {
  const scope = { Intl, esc: v => String(v), intFmt: v => String(v), crmLinkJourneyHtml: () => '' };
  vm.runInNewContext(source.slice(start, end), scope);
  return scope.crmLinkPlayersMatrixHtml([{ actor: 'ID123456', steps }]);
}
test('unknown deposits stay unknown in the player matrix; confirmed zero remains zero', () => {
  assert.match(render({ depositAmount: null }), /<td>—<\/td><td><details>/);
  assert.match(render({ depositAmount: 0 }), /<td>0<\/td><td><details>/);
  assert.match(render({ depositAmount: 1250.5 }), /1\D250,5/);
});
test('matrix preserves complete spin and participation counts, without turning unknown into zero', () => {
  assert.match(render({ raffleCount: 4, spinCount: 17 }), /<td>4<\/td><td>17<\/td>/);
  assert.match(render({ raffleCount: null, spinCount: null }), /<td>—<\/td><td>—<\/td>/);
});
