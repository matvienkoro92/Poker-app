#!/usr/bin/env node
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const assert = require("node:assert/strict");
const { chromium } = require("playwright");
const root = path.resolve(__dirname, "../public");
const output = path.resolve(__dirname, "../output/startup-layout");
const mime = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".png": "image/png", ".avif": "image/avif", ".json": "application/json" };

async function main() {
  fs.mkdirSync(output, { recursive: true });
  const server = http.createServer((req, res) => {
    const pathname = new URL(req.url, "http://localhost").pathname;
    const file = path.resolve(root, "." + (pathname === "/" ? "/index.html" : pathname));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
    fs.readFile(file, (error, body) => {
      res.writeHead(error ? 404 : 200, { "Content-Type": mime[path.extname(file)] || "application/octet-stream" });
      res.end(error ? "" : body);
    });
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  let browser;
  try {
    browser = await chromium.launch();
    const records = [];
    for (const width of [360, 390, 768, 1280]) {
      const context = await browser.newContext({ viewport: { width, height: 844 }, serviceWorkers: "block" });
      await context.route(/^https?:\/\/(?!127\.0\.0\.1(?::|\/))/, route => route.fulfill({ status: 503, contentType: "application/json", body: '{"ok":false}' }));
      await context.route("**/api/**", route => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, entries: [], events: [], levelRows: [], participants: [], winners: [] }) }));
      let modalCssRequests = 0, rejectModalCss = false;
      await context.route(/styles-home-widget-modals\.css/, async route => {
        modalCssRequests++;
        await new Promise(resolve => setTimeout(resolve, 300));
        if (rejectModalCss) return route.fulfill({ status: 503, body: "Retry" });
        return route.continue();
      });
      const page = await context.newPage();
      const errors = [], alerts = [];
      page.on("pageerror", error => errors.push(error.message));
      page.on("dialog", async dialog => { alerts.push(dialog.message()); await dialog.dismiss(); });
      await page.addInitScript(() => sessionStorage.setItem("poker_pwa_guest_session", "1"));
      await page.goto("http://127.0.0.1:" + server.address().port, { waitUntil: "networkidle" });
      assert.equal(await page.evaluate(() => typeof window.pokerReadPwaGuestMode), "function", "Auth bundle globals available");
      assert.equal(await page.evaluate(() => window.pokerReadPwaGuestMode()), true);
      assert.equal(modalCssRequests, 0, "Closed SNG dialog must not load CSS");
      for (const view of ["home", "profile"]) {
        if (view === "profile") { await page.evaluate(() => setView("profile")); await page.waitForTimeout(700); }
        for (const mode of ["ordinary", "shortcuts", "owner"]) {
          const geometry = await page.evaluate(mode => {
            const header = document.querySelector(".card__header");
            const owner = mode === "owner", shortcuts = mode !== "ordinary";
            const crm = document.getElementById("headerCrmBtn");
            crm.hidden = !owner; crm.disabled = !owner; crm.classList.toggle("header-crm-btn--hidden", !owner);
            crm.setAttribute("aria-hidden", String(!owner));
            header.classList.toggle("card__header--admin-shortcuts", shortcuts);
            const group = document.getElementById("headerAdminShortcuts");
            group.hidden = !shortcuts; group.classList.toggle("header-admin-shortcuts--with-crm", owner);
            for (const id of ["headerReportsShortcutBtn", "headerRafflesShortcutBtn"]) document.getElementById(id).hidden = !shortcuts;
            document.getElementById("headerBalancesShortcutBtn").hidden = !owner;
            document.getElementById("headerGreeting").textContent = "ОченьДлинноеИмяИгрока";
            const elements = [header.querySelector(".logo--welcome"), crm, group, header.querySelector(".header-actions")];
            const rect = element => { const r = element.getBoundingClientRect(); return { name: element.id || element.className, x: r.x, y: r.y, right: r.right, bottom: r.bottom, width: r.width, height: r.height }; };
            return { header: rect(header), children: elements.filter(e => e.getBoundingClientRect().width > 0).map(rect),
              greeting: rect(document.getElementById("headerGreeting")), summary: rect(header.querySelector(".header-profile-summary")),
              menu: rect(document.getElementById("headerMoreMenuBtn")), overflow: document.documentElement.scrollWidth > innerWidth + 4 };
          }, mode);
          assert.equal(geometry.overflow, false, width + " " + view + " " + mode);
          for (const child of geometry.children) {
            assert.ok(child.x >= geometry.header.x - 1 && child.right <= geometry.header.right + 1, "Header child bounds: " + JSON.stringify({ width, view, mode, child }));
            for (const other of geometry.children) {
              if (child === other) continue;
              const overlaps = Math.min(child.right, other.right) - Math.max(child.x, other.x) > 1 && Math.min(child.bottom, other.bottom) - Math.max(child.y, other.y) > 1;
              assert.equal(overlaps, false, "Header overlap: " + JSON.stringify({ width, view, mode, child, other }));
            }
          }
          assert.ok(geometry.greeting.width > 0 && geometry.greeting.right <= geometry.menu.x + 1, "Greeting remains visible before menu");
          records.push({ width, view, mode, geometry });
          if (mode === "owner") await page.screenshot({ path: path.join(output, width + "-" + view + ".png") });
        }
      }
      if (width === 390) {
        rejectModalCss = true;
        await page.evaluate(() => window.openSngChampionsModal());
        for (let i = 0; i < 30 && !alerts.length; i++) await page.waitForTimeout(100);
        assert.equal(alerts.length, 1, "Direct SNG opener reports CSS failure");
        assert.equal(await page.locator(".sng-champions-modal.club-choice-vote-modal--open").count(), 0);
        rejectModalCss = false;
        await page.evaluate(() => window.openSngChampionsModal());
        await page.waitForSelector(".sng-champions-modal.club-choice-vote-modal--open");
        assert.equal(modalCssRequests, 2, "Retry reloads failed stylesheet");
      }
      assert.deepEqual(errors, []);
      await context.close();
    }
    fs.writeFileSync(path.join(output, "results.json"), JSON.stringify(records, null, 2));
    console.log("Passed: 24 header layouts; auth bundle guest startup; SNG CSS deferred, failure and retry.");
  } finally {
    if (browser) await browser.close();
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
