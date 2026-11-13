const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const sw = fs.readFileSync(require.resolve('../sw.js'), 'utf8');
const context = { URL };
vm.runInNewContext(sw.slice(sw.indexOf('function pokerSwIsImmutableCodeRequest'), sw.indexOf('function pokerSwIsVersionedCodeRequest')), context);
test('only content hashes and stamped game releases use immutable code caching', () => {
  const immutable = path => context.pokerSwIsImmutableCodeRequest(new URL(path, 'https://club.test'));
  assert.equal(immutable('/app.js?v=1234567890abcdef'), true);
  assert.equal(immutable('/styles.css?release=' + 'a'.repeat(32)), true);
  assert.equal(immutable('/app.js?v=4.002'), false);
  assert.equal(immutable('/club-news-data.js'), false);
  assert.equal(immutable('/app.js'), false);
  assert.equal(immutable('/api/users?v=1234567890abcdef'), false);
});

test('hashed code is fetched once while legacy URLs still check the network', async () => {
  const listeners = {}, stores = new Map();
  let requests = 0;
  const environment = {
    URL, Request, Response, AbortController, setTimeout, clearTimeout,
    self: { location: { origin: 'https://club.test' }, addEventListener(name, fn) { listeners[name] = fn; } },
    caches: { async open(name) {
      if (!stores.has(name)) stores.set(name, new Map());
      const store = stores.get(name);
      return { match: async request => store.get(request.url)?.clone(),
        put: async (request, response) => store.set(request.url, response.clone()) };
    } },
    fetch: async () => {
      requests++;
      const response = new Response('current-code');
      Object.defineProperty(response, 'type', { value: 'basic' });
      return response;
    },
  };
  vm.runInNewContext(sw, environment);
  async function load(path) {
    let result;
    listeners.fetch({ request: new Request('https://club.test' + path), respondWith(promise) { result = promise; } });
    assert.equal(await (await result).text(), 'current-code');
  }
  await load('/app.js?v=1234567890abcdef');
  await load('/app.js?v=1234567890abcdef');
  assert.equal(requests, 1);
  await load('/app.js?v=4.002');
  await load('/app.js?v=4.002');
  assert.equal(requests, 3);
});
