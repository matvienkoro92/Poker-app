const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');

test('summary request works before the API base helper loads', async () => {
  const urls = [];
  const context = {
    window: { addEventListener() {} },
    document: { addEventListener() {}, getElementById() { return null; }, querySelectorAll() { return []; } },
    fetch(url) { urls.push(url); return Promise.resolve({ ok: true, json: () => Promise.resolve({ ok: true }) }); },
    pokerApiAuthJsonBody: (body) => body,
    AbortController,
    setTimeout() { return 1; },
    clearTimeout() {},
    setInterval() { return 1; },
    Intl,
    Date,
  };
  const source = fs.readFileSync(require.resolve('../app-my-summary.js'), 'utf8')
    .replace('  window.initMySummary = init;', '  window.testSummaryRequest = request;');
  vm.createContext(context);
  vm.runInContext(source, context);
  await context.window.testSummaryRequest('club-reviews', { action: 'summary' });
  assert.deepEqual(urls, ['/api/club-reviews']);
});

test('guest startup does not request private hand history or unread reviews', async () => {
  const timers = [];
  const urls = [];
  const context = {
    window: { addEventListener() {} },
    document: { hidden: false, addEventListener() {}, getElementById() { return null; }, querySelectorAll() { return []; } },
    fetch(url) { urls.push(url); return Promise.resolve({ ok: true, json: () => Promise.resolve({ ok: true }) }); },
    pokerApiHasCredential: () => false,
    pokerApiAuthJsonBody: (body) => body,
    AbortController,
    setTimeout(fn) { timers.push(fn); return timers.length; },
    clearTimeout() {},
    setInterval() { return 1; },
    Intl,
    Date,
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(require.resolve('../app-my-summary.js'), 'utf8'), context);
  for (const timer of timers) await timer();
  assert.deepEqual(urls, []);
});
