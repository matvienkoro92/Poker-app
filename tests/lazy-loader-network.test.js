const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync(require.resolve('../app-lazy-loader.js'), 'utf8');
const loader = source.slice(0, source.indexOf('  function ensureDomainsMaybeAsync')) +
  'globalThis.ensureDomain = ensureDomain; })();';

function setup(failOnce = '') {
  const events = [];
  const executed = [];
  function node(attrs = {}) {
    return {
      getAttribute: key => attrs[key] || null,
      setAttribute: (key, value) => { attrs[key] = value; },
      remove() {},
    };
  }
  const scripts = ['first.js', 'second.js', 'third.js'].map(src => node({
    src, 'data-poker-lazy-domain': 'chat',
  }));
  const head = { appendChild(element) {
    events.push({ type: element.rel || 'script', url: element.src || element.href });
    if (element.rel === 'preload') return;
    queueMicrotask(() => {
      if (element.src === failOnce) {
        failOnce = '';
        element.onerror();
      } else {
        if (element.src) executed.push(element.src);
        element.onload();
      }
    });
  }, insertBefore(element, anchor) {
    events.push({ type: 'insert-before', anchor });
    this.appendChild(element);
  } };
  const style = node({ href: 'theme.css', 'data-poker-lazy-domain': 'theme', 'data-poker-lazy-position': 'source' });
  style.parentNode = head;
  const context = vm.createContext({ document: {
    head, createElement: () => node(),
    querySelectorAll: selector => selector.startsWith('script') ? scripts : [style],
  } });
  vm.runInContext(loader, context);
  return { context, events, executed, style };
}

test('chat starts all downloads before execution, evaluates in order and does not repeat loads', async () => {
  const { context, events, executed } = setup();
  await context.ensureDomain('chat');
  assert.deepEqual(events.slice(0, 3).map(e => e.type), ['preload', 'preload', 'preload']);
  assert.deepEqual(executed, ['first.js', 'second.js', 'third.js']);
  const count = events.length;
  await context.ensureDomain('chat');
  assert.equal(events.length, count);
});

test('a failed dependency stops evaluation; retry resumes without repeating successful scripts', async () => {
  const { context, executed } = setup('second.js');
  await assert.rejects(context.ensureDomain('chat'), /second.js/);
  assert.deepEqual(executed, ['first.js']);
  await context.ensureDomain('chat');
  assert.deepEqual(executed, ['first.js', 'second.js', 'third.js']);
});

test('style-only loading neither downloads chat scripts nor changes a source-positioned style order', async () => {
  const { context, events, style } = setup();
  await context.ensureDomain('chat', { scripts: false });
  assert.deepEqual(events, []);
  await context.ensureDomain('theme', { scripts: false });
  assert.equal(events[0].type, 'insert-before');
  assert.equal(events[0].anchor, style);
});
