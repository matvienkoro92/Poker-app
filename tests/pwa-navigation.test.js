const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
function runtime(fetch) {
  let expire;
  const handlers = {};
  const context = { Response, AbortController, URL, Promise, fetch,
    setTimeout: fn => { expire = fn; return 1; }, clearTimeout() {},
    self: { location: { origin: 'https://club.test' }, addEventListener: (name, fn) => handlers[name] = fn }
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../sw.js'), 'utf8'), context);
  return { context, handlers, timeout: () => expire() };
}
test('navigation returns successful document unchanged', async () => {
  const response = new Response('<html>Club</html>');
  assert.equal(await runtime(async () => response).context.pokerSwNavigation({}), response);
});
for (const [name, fetch] of [
  ['offline', async () => { throw new Error('offline'); }],
  ['server error', async () => new Response('error', {status:502})],
  ['empty document', async () => new Response('')]
]) test(name + ' shows an uncached retry page', async () => {
  const response = await runtime(fetch).context.pokerSwNavigation({});
  assert.equal(response.status,503);
  assert.equal(response.headers.get('cache-control'),'no-store');
  assert.match(await response.text(),/Повторить загрузку/);
});
test('timeout covers stalled headers and stalled body', async () => {
  for (const fetch of [() => new Promise(() => {}), async () => ({ok:true,clone:()=>({text:()=>new Promise(()=>{})})})]) {
    const r = runtime(fetch);
    const pending = r.context.pokerSwNavigation({});
    r.timeout();
    assert.equal((await pending).status,503);
  }
});
test('reload navigation also uses the timeout handler', async () => {
  const r = runtime(async () => new Response('ok'));
  let pending;
  r.handlers.fetch({request:{method:'GET',url:'https://club.test/',mode:'navigate',cache:'reload'},respondWith:p=>pending=p});
  assert.equal(await (await pending).text(),'ok');
});
