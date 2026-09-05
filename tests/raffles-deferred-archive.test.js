const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

test('refreshing recent raffles preserves the loading archive and expanded state', () => {
  const source = fs.readFileSync(require('node:path').join(__dirname, '../app-raffles.js'), 'utf8');
  const start = source.indexOf('  function renderDeferredCompletedArchivePanel(');
  const end = source.indexOf('  function requestCompletedArchiveLoad(', start);
  const archive = { open: true, dataset: { archiveLoading: '1' } };
  let attached = archive;
  const context = {
    rafflesArchiveLoaded: false,
    rafflesCompleted: {
      querySelector: () => attached,
      appendChild: node => { attached = node; },
      insertAdjacentHTML: () => { throw new Error('Must not replace the pending archive'); }
    },
    renderCompletedRafflesPanel: () => { attached = null; }
  };
  vm.createContext(context);
  vm.runInContext(source.slice(start, end), context);
  context.renderDeferredCompletedArchivePanel([{ id: 'recent' }]);
  assert.equal(attached, archive);
  assert.equal(attached.open, true);
  assert.equal(attached.dataset.archiveLoading, '1');
  // The pending request still writes into the visible archive.
  archive.result = ['September'];
  assert.deepEqual(attached.result, ['September']);
});
