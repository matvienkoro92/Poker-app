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
  assert.match(await response.text(),/Попробовать ещё раз/);
});
test('slow response headers get thirty seconds before fallback', async () => {
  const r = runtime(() => new Promise(() => {}));
  const pending = r.context.pokerSwNavigation({});
  assert.equal(r.delay(), 30000);
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
  assert.match(html, /href="https:\/\/club.test\/\?startapp=raffles&amp;x=1&amp;_club_retry=\d+"/);
  assert.doesNotMatch(html, /onclick=/);
});
test('reload navigation also uses the timeout handler', async () => {
  const r = runtime(async () => new Response('ok'));
  let pending;
  r.handlers.fetch({request:{method:'GET',url:'https://club.test/',mode:'navigate',cache:'reload'},respondWith:p=>pending=p});
  assert.equal(await (await pending).text(),'ok');
});

test('navigation bypasses HTTP cache and aborts a stalled request', async () => {
  let options;
  const r = runtime((request, init) => { options = init; return new Promise(() => {}); });
  const pending = r.context.pokerSwNavigation({url:'https://club.test/'});
  assert.equal(options.cache, 'no-store');
  assert.equal(options.signal.aborted, false);
  r.timeout();
  assert.equal((await pending).status, 503);
  assert.equal(options.signal.aborted, true);
});
test('retry executes a new navigation with Telegram fragment and launch query intact', async () => {
  const r = runtime(async () => { throw new Error('offline'); });
  const html = await (await r.context.pokerSwNavigation({url:'https://club.test/?startapp=raffles&_club_retry=old'})).text();
  let click, destination, prevented = false;
  const link = {addEventListener(name, handler) { assert.equal(name, 'click'); click = handler; }};
  const original = 'https://club.test/?startapp=raffles&_club_retry=old#tgWebAppData=launch%26auth';
  vm.runInNewContext(html.match(/<script>([\s\S]*?)<\/script>/)[1], {
    URL, Date, setTimeout:()=>1, clearTimeout(){}, document:{querySelector:()=>link},
    window:{location:{href:original, hash:new URL(original).hash, replace:url=>destination=url}}
  });
  assert.equal(link.hash, new URL(original).hash);
  click({preventDefault(){ prevented = true; }});
  assert.equal(prevented, true);
  const target = new URL(destination);
  assert.equal(target.hash, new URL(original).hash);
  assert.equal(target.searchParams.get('startapp'), 'raffles');
  assert.notEqual(target.searchParams.get('_club_retry'), 'old');
  assert.equal(target.searchParams.getAll('_club_retry').length, 1);
  assert.equal(link.textContent, 'Загружаем…');
});

for (const failure of ['network', 'gateway']) test('temporary ' + failure + ' failure recovers without an error page', async () => {
  let calls = 0;
  const response = new Response('<html>Recovered</html>');
  const r = runtime(async () => {
    if (++calls === 1) {
      if (failure === 'network') throw new Error('connection reset');
      return new Response('gateway unavailable', {status:502});
    }
    return response;
  });
  assert.equal(await r.context.pokerSwNavigation({}), response);
  assert.equal(calls, 2);
});
test('persistent failure is limited to two attempts', async () => {
  let calls = 0;
  const r = runtime(async () => { calls++; throw new Error('offline'); });
  assert.equal((await r.context.pokerSwNavigation({})).status, 503);
  assert.equal(calls, 2);
});
test('client errors do not cause automatic retries', async () => {
  let calls = 0;
  const r = runtime(async () => { calls++; return new Response('missing', {status:404}); });
  assert.equal((await r.context.pokerSwNavigation({})).status, 503);
  assert.equal(calls, 1);
});
test('raffle scripts use fresh network code rather than a cached broken renderer',async()=>{
 const fresh={status:200,type:'basic',clone(){return this}},stale={old:true};let reads=0,writes=0;
 const r=runtime(async()=>fresh);
 r.context.caches={open:async()=>({match:async()=>{reads++;return stale;},put:()=>writes++})};
 let pending;
 r.handlers.fetch({request:{url:'https://club.test/app-raffles.js?v=4.031',method:'GET'},respondWith:value=>pending=value});
 assert.equal(await pending,fresh);assert.equal(reads,0);assert.equal(writes,1);
});
test('raffle code remains available from cache when offline',async()=>{
 const cached={offline:true};const r=runtime(async()=>{throw Error('offline')});
 r.context.caches={open:async()=>({match:async()=>cached})};let pending;
 r.handlers.fetch({request:{url:'https://club.test/app-raffles-completed.js?v=1',method:'GET'},respondWith:value=>pending=value});
 assert.equal(await pending,cached);
});
