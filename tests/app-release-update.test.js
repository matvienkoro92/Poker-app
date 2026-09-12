const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require.resolve('../app-push.js'), 'utf8');
const updater = source.slice(source.indexOf('(function initPwaServiceWorkerGlobal()'));
function harness(remote) {
  const buttons = [], intervals = [], listeners = {};
  let requests = 0, reloads = 0;
  const context = {
    navigator: {}, URL, AbortController, Promise, Date,
    setTimeout() { return 1; }, clearTimeout() {}, setInterval(fn) { intervals.push(fn); },
    fetch: async () => { requests++; if (remote instanceof Error) throw remote; return { ok: true, json: async () => remote }; },
    window: { location: { reload() { reloads++; } }, addEventListener(n, f) { listeners[n] = f; } },
    document: { hidden: false, baseURI: 'https://example.test/', documentElement: { getAttribute: () => 'current' },
      getElementById: id => buttons.find(b => b.id === id),
      createElement: () => ({ style: {}, addEventListener(n, fn) { this[n] = fn; } }),
      body: { appendChild(b) { buttons.push(b); } }, addEventListener(n, f) { listeners[n] = f; } }
  };
  vm.runInNewContext(updater, context);
  return { context, buttons, intervals, listeners, requests: () => requests, reloads: () => reloads };
}
const settle = () => new Promise(resolve => setImmediate(resolve));
test('new deployment prompts even without service workers; reload requires a click', async () => {
  const h = harness({ releaseId: 'new' });
  h.intervals[0](); await settle();
  assert.equal(h.buttons.length, 1);
  assert.equal(h.reloads(), 0);
  h.listeners.focus(); await settle();
  assert.equal(h.buttons.length, 1);
  await h.buttons[0].click(); await settle();
  assert.equal(h.reloads(), 1);
});
test('same release and network errors do not prompt or reload', async () => {
  for (const remote of [{ releaseId: 'current' }, {}, new Error('offline')]) {
    const h = harness(remote); h.intervals[0](); await settle();
    assert.equal(h.buttons.length, 0); assert.equal(h.reloads(), 0);
  }
});
test('hidden app skips checks and checks when visible again', async () => {
  const h = harness({ releaseId: 'new' }); h.context.document.hidden = true;
  h.intervals[0](); await settle(); assert.equal(h.requests(), 0);
  h.context.document.hidden = false; h.listeners.visibilitychange(); await settle();
  assert.equal(h.buttons.length, 1);
});
