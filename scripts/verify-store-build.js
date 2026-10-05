'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const web = path.join(root, 'output/store-release/native/www');
const output = path.join(root, 'output/store-release');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.avif': 'image/avif' };
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = path.resolve(web, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!file.startsWith(web + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); res.end(); return; }
  res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});
(async () => {
  const config = JSON.parse(fs.readFileSync(path.join(output, 'native/capacitor.config.json'), 'utf8'));
  assert.equal(config.server.url, undefined, 'Native app must not load the website interface');
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = 'http://127.0.0.1:' + server.address().port;
  const browser = await chromium.launch({ headless: true });
  const result = { checks: [], startupErrors: [], externalRequestsBlocked: 0 };
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, serviceWorkers: 'block' });
    await context.route('**/*', route => {
      if (route.request().url().startsWith(origin + '/')) return route.continue();
      result.externalRequestsBlocked++;
      return route.abort();
    });
    const page = await context.newPage();
    page.on('pageerror', error => result.startupErrors.push(error.message));
    await page.goto(origin, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => {
      var overlay = document.getElementById('appBootOverlay');
      return !overlay || getComputedStyle(overlay).display === 'none' || getComputedStyle(overlay).visibility === 'hidden' || Number(getComputedStyle(overlay).opacity) === 0;
    }, null, { timeout: 20000 });
    const blocked = await page.locator('[data-view-target="cashout"],[data-vpn-proxy-open],#vpnProxyOpenBtn').count();
    assert.equal(blocked, 0, 'Cash desk and paid VPN must be absent');
    const currency = await page.locator('body').innerText();
    assert.doesNotMatch(currency, /₽|рубл/i);
    result.checks.push('Mobile guest startup has no currency text or cash-desk/VPN controls');
    await page.screenshot({ path: path.join(output, 'mobile-home.png') });
    await page.evaluate(() => {
      const node = document.createElement('p'); node.id = 'store-dynamic-check'; node.textContent = 'Баланс: 125 ₽'; document.body.appendChild(node);
      const link = document.createElement('button'); link.id = 'store-blocked-check'; link.dataset.viewTarget = 'cashout'; document.body.appendChild(link);
    });
    await page.waitForFunction(() => document.getElementById('store-dynamic-check').textContent === 'Баланс: 125 ◉');
    assert.equal(await page.locator('#store-blocked-check').count(), 0);
    result.checks.push('Late-loaded currency labels become chips; late-loaded cash-desk links are removed');
    await page.evaluate(() => document.getElementById('store-dynamic-check').remove());
    await page.evaluate(() => { if (typeof setView !== 'function') throw new Error('Missing router'); setView('cashout'); });
    assert.notEqual(await page.locator('body').getAttribute('data-view'), 'cashout');
    result.checks.push('Direct navigation to cash desk does not open it');
    await page.evaluate(() => setView('daily-poker'));
    await page.waitForFunction(() => {
      const ready = document.body.dataset.view === 'daily-poker' && !document.getElementById('appBootOverlay');
      if (!ready) { window.__storeTestSettledAt = 0; return false; }
      if (!window.__storeTestSettledAt) window.__storeTestSettledAt = performance.now();
      return performance.now() - window.__storeTestSettledAt > 1000;
    }, null, { timeout: 20000 });
    assert.doesNotMatch(await page.locator('body').innerText(), /₽|рубл|1 бонус =/i);
    await page.screenshot({ path: path.join(output, 'mobile-daily-poker.png') });
    result.checks.push('Daily-poker mobile screen uses chips and has no cash exchange instruction');
    assert.deepEqual(result.startupErrors, [], 'Guest startup must not throw JavaScript errors');
    fs.writeFileSync(path.join(output, 'verification.json'), JSON.stringify(result, null, 2) + '\n');
    console.log(JSON.stringify(result, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => server.close());
