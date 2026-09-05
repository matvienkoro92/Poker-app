#!/usr/bin/env node
"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const { chromium } = require("playwright");
async function main() {
  const watchdog = setTimeout(() => { console.error("PWA update timed out"); process.exit(1); }, 60000);
  const sw = fs.readFileSync(path.join(__dirname, "../sw.js"), "utf8");
  const cacheName = sw.match(/var POKER_STATIC_CACHE = "([^"]+)"/)[1];
  const oldCache = sw.match(/var POKER_STATIC_OLD_CACHES = \["([^"]+)"/)[1];
  let updated = false;
  const oldSw = `self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open('${oldCache}').then(c => c.put('/styles.css',new Response('old-css')))); }); self.addEventListener('activate',e => e.waitUntil(self.clients.claim()));`;
  const server = http.createServer((req, res) => {
    res.setHeader("Cache-Control", "no-store");
    if (req.url === "/sw.js") { res.setHeader("Content-Type", "application/javascript"); res.end(updated ? sw : oldSw); }
    else if (req.url.startsWith("/styles.css")) { res.setHeader("Content-Type", "text/css"); res.end("new-css"); }
    else { res.setHeader("Content-Type", "text/html"); res.end(`<html data-release="${updated ? 'new' : 'old'}"><body>PWA upgrade fixture</body></html>`); }
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  let browser;
  try {
    browser = await chromium.launch({ headless: true, executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || (fs.existsSync(path.join(process.env.HOME, "Library/Caches/ms-playwright/chromium-1217/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing")) ? path.join(process.env.HOME, "Library/Caches/ms-playwright/chromium-1217/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing") : undefined) });
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${server.address().port}/`);
    await page.evaluate(() => { window.swReady = false; navigator.serviceWorker.register('/sw.js').then(() => navigator.serviceWorker.ready).then(() => { window.swReady = true; }).catch(e => { window.swError = String(e); }); });
    await page.waitForFunction(() => window.swReady || window.swError);
    assert.equal(await page.evaluate(() => window.swError || ""), "");
    await page.waitForFunction(() => !!navigator.serviceWorker.controller);
    assert.equal(await page.evaluate(async name => !!await (await caches.open(name)).match('/styles.css'), oldCache), true);
    updated = true;
    await page.evaluate(() => { setTimeout(() => { navigator.serviceWorker.getRegistration().then(r => r.update()); }, 50); });
    await page.waitForFunction(() => document.documentElement.dataset.release === 'new', { }, { timeout: 30000 });
    assert.equal(await page.evaluate(name => caches.has(name), oldCache), false);
    assert.equal(await page.evaluate(async () => (await fetch('/styles.css')).text()), 'new-css');
    await page.waitForFunction(name => caches.has(name), cacheName);
    console.log(`PWA upgrade passed: ${oldCache} removed, ${cacheName} active, open page refreshed, fresh CSS loaded.`);
  } finally {
    clearTimeout(watchdog);
    if (browser) await browser.close();
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
