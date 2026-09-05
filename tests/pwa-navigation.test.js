const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
function runtime(fetch) {
  let expire, delay;
  const handlers = {};
  const context = { Response, AbortController, URL, Promise, fetch,
    setTimeout: (fn, ms) => { expire = fn; delay = ms; return 1; }, clearTimeout() {},
    self: { location: { origin: 'https://club.test' }, addEventListener: (name, fn) => handlers[name] = fn }
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../sw.js'), 'utf8'), context);
  return { context, handlers, timeout: () => expire(), delay: () => delay };
}
test('navigation returns successful document unchanged', async () => {
  const response = new Response('<html>Club</html>');
  assert.equal(await runtime(async () => response).context.pokerSwNavigation({}), response);
});
for (const [name, fetch] of [
  ['offline', async () => { throw new Error('offline'); }],
  ['server error', async () => new Response('error', {status:502})]
]) test(name + ' shows an uncached retry page', async () => {
  const response = await runtime(fetch).context.pokerSwNavigation({});
  assert.equal(response.status,503);
  assert.equal(response.headers.get('cache-control'),'no-store');
  assert.match(await response.text(),/Повторить загрузку/);
});
test('slow response headers get seven seconds before fallback', async () => {
  const r = runtime(() => new Promise(() => {}));
  const pending = r.context.pokerSwNavigation({});
  assert.equal(r.delay(), 7000);
  r.timeout();
  assert.equal((await pending).status, 503);
});
test('HTML streams immediately without waiting for the complete body', async () => {
  const response = {ok:true,clone:()=>{throw new Error('Must not buffer HTML');}};
  assert.equal(await runtime(async () => response).context.pokerSwNavigation({}), response);
});
test('retry uses a native link and preserves the original route and query', async () => {
  const r = runtime(async () => {throw new Error('offline');});
  const html = await (await r.context.pokerSwNavigation({url:'https://club.test/?startapp=raffles&x=1'})).text();
  assert.match(html, /href="https:\/\/club.test\/\?startapp=raffles&amp;x=1"/);
  assert.doesNotMatch(html, /onclick=/);
});
test('reload navigation also uses the timeout handler', async () => {
  const r = runtime(async () => new Response('ok'));
  let pending;
  r.handlers.fetch({request:{method:'GET',url:'https://club.test/',mode:'navigate',cache:'reload'},respondWith:p=>pending=p});
  assert.equal(await (await pending).text(),'ok');
});
