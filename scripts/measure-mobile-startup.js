#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");
const http = require("http");
const zlib = require("zlib");
const assert = require("node:assert/strict");
const { chromium } = require("playwright");
const root = path.join(__dirname, "..");
const publicRoot = path.join(root, "public");
const out = path.join(root, "tmp", "mobile-startup");
const mime = { ".html": "text/html", ".js": "application/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
async function main() {
  fs.mkdirSync(out, { recursive: true });
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");
    let file = path.resolve(publicRoot, "." + (url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname)));
    if (!file.startsWith(publicRoot + path.sep)) { res.writeHead(403); return res.end(); }
    fs.readFile(file, (error, data) => {
      if (error) { res.writeHead(404); return res.end(); }
      const ext = path.extname(file);
      if (ext === ".html") data = Buffer.from(data.toString().replace(/data-api-base="[^"]*"/, 'data-api-base=""'));
      const gzip = [".html", ".js", ".css", ".json", ".svg"].includes(ext);
      res.writeHead(200, { "Content-Type": mime[ext] || "application/octet-stream", "Cache-Control": "no-store", ...(gzip ? { "Content-Encoding": "gzip" } : {}) });
      res.end(gzip ? zlib.gzipSync(data) : data);
    });
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const origin = "http://127.0.0.1:" + server.address().port;
  let browser;
  try {
    const cached = path.join(process.env.HOME || "", "Library/Caches/ms-playwright/chromium-1217/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing");
    browser = await chromium.launch(fs.existsSync(cached) ? { executablePath: cached } : {});
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, serviceWorkers: "block" });
    const apiCalls = [];
    await context.route("**/*", async (route) => {
      const url = new URL(route.request().url());
      if (url.pathname.startsWith("/api/")) {
        apiCalls.push(url.pathname + url.search);
        const payload = url.pathname === "/api/tournament-bet"
          ? { ok: true, id: "tb_mobile_test", title: "Тестовый турнир", status: "open", bank: 1000, stakePrice: 100, entries: [], events: [], canJoin: false }
          : { ok: false, error: "Offline test fixture" };
        return route.fulfill({ status: payload.ok ? 200 : 503, contentType: "application/json", body: JSON.stringify(payload) });
      }
      if (url.origin !== origin) return route.abort();
      return route.continue();
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.addInitScript(() => {
      sessionStorage.setItem("poker_pwa_guest_session", "1");
      window.__mobileAudit = { lcp: 0, cls: 0, longTasks: 0, shifts: [], lcpElement: "" };
      for (const type of ["largest-contentful-paint", "layout-shift", "longtask"]) {
        try { new PerformanceObserver((list) => { for (const e of list.getEntries()) {
          if (type === "largest-contentful-paint") { window.__mobileAudit.lcp = e.startTime; window.__mobileAudit.lcpElement = e.element?.outerHTML?.slice(0, 350); }
          if (type === "layout-shift" && !e.hadRecentInput) { window.__mobileAudit.cls += e.value; window.__mobileAudit.shifts.push({ time: e.startTime, value: e.value, sources: (e.sources || []).map(s => ({ element: s.node?.outerHTML?.slice(0, 180), before: s.previousRect, after: s.currentRect })) }); }
          if (type === "longtask") window.__mobileAudit.longTasks += Math.max(0, e.duration - 50);
        } }).observe({ type, buffered: true }); } catch (e) {}
      }
    });
    const cdp = await context.newCDPSession(page);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: process.env.MOBILE_UNTHROTTLED ? 1 : 4 });
    await cdp.send("Network.enable");
    await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: process.env.MOBILE_UNTHROTTLED ? 0 : 100, downloadThroughput: process.env.MOBILE_UNTHROTTLED ? -1 : 200000, uploadThroughput: 93750 });
    await page.goto(origin, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForFunction(() => typeof setView === "function" && typeof window.openTournamentBetModal === "function", null, { timeout: 45000 });
    await page.waitForFunction(() => [...document.styleSheets].some(s => /styles-home-overrides\.css/.test(s.href || "")), null, { timeout: 45000 });
    await page.waitForTimeout(2000);
    const startup = await page.evaluate(() => {
      const resources = performance.getEntriesByType("resource");
      return {
        ...window.__mobileAudit,
        fcp: performance.getEntriesByName("first-contentful-paint")[0]?.startTime || 0,
        domContentLoaded: performance.getEntriesByType("navigation")[0]?.domContentLoadedEventEnd,
        requests: resources.length,
        transferredKiB: +((resources.reduce((sum, e) => sum + e.transferSize, 0) + performance.getEntriesByType("navigation")[0].transferSize) / 1024).toFixed(1),
        earlySng: resources.some((e) => /app-sng-champions\.js/.test(e.name)),
        earlyBetCss: resources.some((e) => /styles-tournament-bet\.css/.test(e.name)),
        horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 4,
      };
    });
    assert.equal(startup.earlySng, false);
    assert.equal(startup.earlyBetCss, false);
    assert.equal(startup.horizontalOverflow, false);
    await page.screenshot({ path: path.join(out, "home.png") });
    // Validate the real opener waits for the stylesheet before showing the modal.
    await page.evaluate(() => window.openTournamentBetModal());
    await page.waitForSelector(".tournament-bet-modal:not([hidden])", { timeout: 30000 });
    assert.equal(await page.evaluate(() => [...document.styleSheets].some((s) => /styles-tournament-bet\.css/.test(s.href || ""))), true);
    await page.evaluate(() => window.pokerEnsureStyleDomains(["home-widget-modals"]));
    assert.equal(await page.locator(".tournament-bet-modal:not([hidden])").isVisible(), true, "Late shared CSS must not hide the tournament modal");
    await page.screenshot({ path: path.join(out, "tournament-bet.png") });
    await page.keyboard.press("Escape");
    await page.evaluate(() => setView("daily-poker"));
    await page.waitForFunction(() => typeof window.openSngChampionsModal === "function", null, { timeout: 45000 });
    await page.screenshot({ path: path.join(out, "daily-poker.png") });
    await page.goto(origin + "/?startapp=tournament_bet_tb_mobile_test", { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForSelector(".tournament-bet-modal:not([hidden])", { timeout: 30000 });
    assert.ok(apiCalls.some((url) => url.includes("eventId=tb_mobile_test")));
    assert.deepEqual(errors, []);
    const result = { device: "390x844, DPR 2, touch; Chromium emulation", network: process.env.MOBILE_UNTHROTTLED ? "Unthrottled diagnostic" : "1.6 Mbps down, 100 ms latency, CPU x4", limitations: "Synthetic guest session and mocked API; not a physical phone or production latency measurement", startup, scenarios: ["guest startup", "tournament modal CSS before display", "modal remains visible after shared CSS", "lazy SNG in daily poker", "tournament event deep link"], errors };
    fs.writeFileSync(path.join(out, "report.json"), JSON.stringify(result, null, 2) + "\n");
    console.log(JSON.stringify(result, null, 2));
  } finally {
    if (browser) await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
