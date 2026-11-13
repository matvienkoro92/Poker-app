const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function harness() {
  let now = 1000000, requests = 0, finish;
  const window = { addEventListener() {} };
  const document = { hidden: false, addEventListener() {}, getElementById() { return null; },
    querySelectorAll() { return []; }, querySelector() { return null; } };
  const context = { window, document, location: { hostname: 'club.test', search: '' }, URLSearchParams,
    pokerApiHasCredential: () => true, pokerApiAuthJsonBody: body => body, AbortController, Intl,
    Date: class extends Date { static now() { return now; } },
    setTimeout() { return 1; }, clearTimeout() {}, setInterval() { return 1; },
    fetch() { requests++; return new Promise(resolve => { finish = () => resolve({ ok: true, json: async () => ({ ok: true, count: 2 }) }); }); },
  };
  const source = fs.readFileSync(require.resolve('../app-my-summary.js'), 'utf8')
    .replace('  window.initMySummary = init;', '  window.testUnread = loadReviewUnread; window.initMySummary = init;');
  vm.runInNewContext(source, context);
  return { window, document, requests: () => requests, finish: () => finish(), advance: ms => { now += ms; } };
}

test('unread badges share concurrent requests, respect TTL and pause while hidden', async () => {
  const h = harness();
  const first = h.window.testUnread(), second = h.window.testUnread();
  assert.equal(h.requests(), 1);
  h.finish(); await Promise.all([first, second]);
  await h.window.testUnread();
  assert.equal(h.requests(), 1);
  h.advance(5 * 60000);
  h.document.hidden = true;
  await h.window.testUnread();
  assert.equal(h.requests(), 1);
  h.document.hidden = false;
  const next = h.window.testUnread();
  assert.equal(h.requests(), 2);
  h.finish(); await next;
});
