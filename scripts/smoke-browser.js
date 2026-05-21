#!/usr/bin/env node
"use strict";

const fs = require("fs");
const http = require("http");
const path = require("path");

const root = path.join(__dirname, "..");
const host = "127.0.0.1";
const port = Number(process.env.SMOKE_BROWSER_PORT || 4197);

function resolvePlaywright() {
  try {
    return require("playwright");
  } catch (errLocal) {}

  const npxRoot = path.join(process.env.HOME || "", ".npm", "_npx");
  if (npxRoot && fs.existsSync(npxRoot)) {
    const dirs = fs.readdirSync(npxRoot).sort();
    for (let i = dirs.length - 1; i >= 0; i -= 1) {
      const candidate = path.join(npxRoot, dirs[i], "node_modules", "playwright");
      try {
        return require(candidate);
      } catch (errNpx) {}
    }
  }

  throw new Error("Playwright is not available. Run `npx playwright install chromium` once, then retry `npm run smoke:browser`.");
}

function chromiumExecutablePath() {
  const candidates = [
    path.join(process.env.HOME || "", "Library", "Caches", "ms-playwright", "chromium-1217", "chrome-mac-arm64", "Google Chrome for Testing.app", "Contents", "MacOS", "Google Chrome for Testing"),
  ];
  return candidates.find((file) => file && fs.existsSync(file));
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".html") return "text/html; charset=utf-8";
  if (ext === ".js") return "application/javascript; charset=utf-8";
  if (ext === ".css") return "text/css; charset=utf-8";
  if (ext === ".json" || ext === ".webmanifest") return "application/json; charset=utf-8";
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  if (ext === ".avif") return "image/avif";
  if (ext === ".mp4") return "video/mp4";
  if (ext === ".mov") return "video/quicktime";
  if (ext === ".woff2") return "font/woff2";
  return "application/octet-stream";
}

function startServer() {
  const server = http.createServer((req, res) => {
    try {
      const rawUrl = new URL(req.url || "/", `http://${host}:${port}`);
      let rel = decodeURIComponent(rawUrl.pathname || "/");
      if (rel === "/") rel = "/index.html";
      const abs = path.normalize(path.join(root, rel));
      if (!abs.startsWith(root + path.sep) && abs !== root) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
      }
      fs.readFile(abs, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end("Not found");
          return;
        }
        res.writeHead(200, {
          "Content-Type": contentType(abs),
          "Cache-Control": "no-store",
        });
        res.end(data);
      });
    } catch (err) {
      res.writeHead(500);
      res.end("Server error");
    }
  });
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, host, () => resolve(server));
  });
}

async function newPage(browser) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const pageErrors = [];
  page.on("pageerror", (err) => {
    pageErrors.push(err && (err.stack || err.message) ? (err.stack || err.message) : String(err));
  });
  return { page, pageErrors };
}

async function openIndex(page) {
  await page.goto(`http://${host}:${port}/index.html`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => !!document.getElementById("app"), null, { timeout: 5000 });
}

async function installAdminReportMocks(page, options = {}) {
  let draft = {
    rows: Array.isArray(options.rows) ? options.rows : [],
    updatedAt: new Date().toISOString(),
    updatedBy: "smoke",
  };
  await page.route(/\/api\/admin-report-shifts(?:\?|$)/, async (route) => {
    const req = route.request();
    const headers = {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,PUT,OPTIONS",
      "access-control-allow-headers": "content-type",
    };
    if (req.method() === "OPTIONS") {
      await route.fulfill({ status: 204, headers, body: "" });
      return;
    }
    if (req.method() === "POST" || req.method() === "PUT") {
      const payload = JSON.parse(req.postData() || "{}");
      if (payload.action === "rakeback_draft_save") {
        draft = {
          rows: Array.isArray(payload.rakebackRows) ? payload.rakebackRows : [],
          updatedAt: new Date().toISOString(),
          updatedBy: "smoke",
        };
        await route.fulfill({
          status: 200,
          headers,
          contentType: "application/json; charset=utf-8",
          body: JSON.stringify({ ok: true, rakebackDraft: draft }),
        });
        return;
      }
      await route.fulfill({
        status: 200,
        headers,
        contentType: "application/json; charset=utf-8",
        body: JSON.stringify({ ok: true, report: Object.assign({ id: "smoke-report", createdAt: new Date().toISOString() }, payload) }),
      });
      return;
    }
    const url = req.url();
    if (new URL(url).searchParams.get("rakebackDraft") === "1") {
      await route.fulfill({
        status: 200,
        headers,
        contentType: "application/json; charset=utf-8",
        body: JSON.stringify({ ok: true, rakebackDraft: draft }),
      });
      return;
    }
    await route.fulfill({
      status: 200,
      headers,
      contentType: "application/json; charset=utf-8",
      body: JSON.stringify({ ok: true, reports: [], scope: "all", currentWeekStart: Date.now(), hasArchive: false }),
    });
  });
}

function dateKeyFromNow(offsetDays) {
  const d = new Date();
  d.setDate(d.getDate() + (Number(offsetDays) || 0));
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

async function installPokerPlusProfileMocks(page) {
  const today = dateKeyFromNow(0);
  const yesterday = dateKeyFromNow(-1);
  const profile = {
    linked: true,
    pokerPlusUserId: "P21-SMOKE",
    nickname: "Smoke",
    totalCounter: {
      fee: 10,
      hands: 277,
      winnings: 993750.55,
      mttWinnings: 1084734,
      mttItmCount: 4,
      mttFirstCount: 0,
      sngWinnings: 1018,
      sngCount: 6,
      sngItmCount: 5,
      sngFirstCount: 1,
    },
    todayCounter: {
      mttWinnings: 125000,
      mttCount: 2,
      mttItmCount: 1,
      mttFirstCount: 0,
    },
    weekCounter: {
      mttWinnings: 300000,
      mttCount: 4,
      mttItmCount: 2,
      mttFirstCount: 0,
    },
    statsSnapshots: {
      dates: [yesterday, today],
      dailyCounters: {
        [yesterday]: { mttWinnings: 175000, mttCount: 1, mttItmCount: 1, mttFirstCount: 0 },
        [today]: { mttWinnings: 125000, mttCount: 1, mttItmCount: 1, mttFirstCount: 0 },
      },
    },
  };
  await page.route(/\/api\/pokerplus-player(?:\?|$)/, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json; charset=utf-8",
      body: JSON.stringify({ ok: true, linked: true, accountId: "SMOKE", pokerPlusUserId: "P21-SMOKE", profile }),
    });
  });
  await page.route(/\/api\/(?:profile-info|profile-status|profile-personal|profile-visible-to-others|friends)(?:\?|$)/, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json; charset=utf-8",
      body: JSON.stringify({ ok: true }),
    });
  });
}

async function enableVikaAdmin(page) {
  await page.evaluate(() => {
    window.__pokerTelegramAuth = {
      status: "verified",
      adminReportAccess: true,
      user: { id: 1897001087, first_name: "Vika" },
    };
    window.pokerApiHasCredential = function () { return true; };
    window.getApiBase = function () { return window.location.origin; };
    document.getElementById("app")?.setAttribute("data-api-base", window.location.origin);
    window.pokerRafflesApiQueryLeading = function () { return "?initData=smoke"; };
    window.pokerGuestOrAuthedPostBody = function (extra) {
      return Object.assign({ initData: "smoke" }, extra || {});
    };
    const btn = document.getElementById("adminReportBtn");
    if (!btn) throw new Error("admin report button is missing");
    btn.classList.remove("header-admin-report--hidden");
    btn.hidden = false;
    btn.disabled = false;
    btn.removeAttribute("aria-hidden");
    window.dispatchEvent(new CustomEvent("poker-telegram-auth"));
  });
}

async function enableVerifiedProfile(page) {
  await page.evaluate(() => {
    window.__pokerTelegramAuth = {
      status: "verified",
      user: { id: 1897001087, first_name: "Smoke" },
    };
    window.pokerApiHasCredential = function () { return true; };
    window.getApiBase = function () { return window.location.origin; };
    window.pokerRafflesApiQueryLeading = function () { return "?initData=smoke"; };
    window.pokerGuestOrAuthedPostBody = function (extra) {
      return Object.assign({ initData: "smoke" }, extra || {});
    };
    window.dispatchEvent(new CustomEvent("poker-telegram-auth"));
  });
}

async function openRakebackTab(page) {
  await page.locator("#adminReportBtn").click();
  await page.waitForFunction(() => document.getElementById("adminReportModal")?.getAttribute("aria-hidden") === "false", null, { timeout: 5000 });
  await page.locator("[data-admin-report-tab='rakeback']").click();
  await page.waitForFunction(() => {
    return document.querySelector(".admin-report-panel--active")?.getAttribute("data-admin-report-panel") === "rakeback";
  }, null, { timeout: 5000 });
}

async function openProfilePoker21(page) {
  await page.locator("[data-view-target='profile']").first().click();
  await page.waitForSelector("#profileView", { timeout: 7000 });
  await enableVerifiedProfile(page);
  await page.locator("#profilePoker21TabBtn").click();
  await page.waitForSelector("#profilePokerPlusSection.profile-pokerplus-card--linked", { timeout: 7000 });
  await page.locator("[data-profile-pokerplus-stats-period='total']").click();
  await page.waitForFunction(() => {
    const section = document.querySelector(".profile-pokerplus-stats-section--mtt");
    const active = (document.querySelector(".profile-pokerplus-stats-tabs__btn--active")?.textContent || "").trim();
    return !!section && active === "Всего";
  }, null, { timeout: 7000 });
}

async function checkLoad(browser) {
  const { page, pageErrors } = await newPage(browser);
  await openIndex(page);
  const state = await page.evaluate(() => ({
    app: !!document.getElementById("app"),
    version: document.documentElement.getAttribute("data-app-version") || "",
    view: document.body.getAttribute("data-view") || "",
  }));
  await page.close();
  if (!state.app || !state.version) throw new Error("app shell did not load: " + JSON.stringify(state));
  if (pageErrors.length) throw new Error("page errors during load check:\n" + pageErrors.join("\n"));
  return state;
}

async function checkAdminRakeback(browser) {
  const { page, pageErrors } = await newPage(browser);
  await installAdminReportMocks(page);
  await openIndex(page);
  await enableVikaAdmin(page);
  await openRakebackTab(page);
  await page.locator("#adminReportRakebackSearch").fill("no-visible-new-row");
  await page.locator("#adminReportRakebackAddBtn").click();
  await page.waitForFunction(() => {
    return !document.getElementById("adminReportRakebackSearch")?.value &&
      document.querySelectorAll("#adminReportRakebackTableBody [data-rakeback-shared-row]").length >= 1;
  }, null, { timeout: 5000 });
  const idInput = page.locator("#adminReportRakebackTableBody [data-rakeback-shared-row] [data-rakeback-player-id]").first();
  await idInput.click();
  await idInput.fill("12345");
  const state = await page.evaluate(() => {
    const row = document.querySelector("#adminReportRakebackTableBody [data-rakeback-shared-row]");
    const dateInput = row?.querySelector("[data-rakeback-entry-date]");
    const idInputEl = row?.querySelector("[data-rakeback-player-id]");
    const badge = row?.querySelector("[data-rakeback-date-badge]");
    const separator = document.querySelector("#adminReportRakebackTableBody .admin-report-rakeback-date-separator--entries");
    const separatorStack = separator?.querySelector(".admin-report-rakeback-date-separator__stack");
    const separatorDate = separator?.querySelector(".admin-report-rakeback-date-separator__date");
    const separatorWeekday = separator?.querySelector(".admin-report-rakeback-date-separator__weekday");
    const separatorDateStyle = separatorDate ? getComputedStyle(separatorDate) : null;
    const separatorStackStyle = separatorStack ? getComputedStyle(separatorStack) : null;
    const separatorDateRect = separatorDate ? separatorDate.getBoundingClientRect() : null;
    const separatorWeekdayRect = separatorWeekday ? separatorWeekday.getBoundingClientRect() : null;
    return {
      dateType: dateInput?.type || "",
      dateTabIndex: dateInput?.getAttribute("tabindex") || "",
      badgePointer: badge ? getComputedStyle(badge).pointerEvents : "",
      idValue: idInputEl?.value || "",
      activeIsId: document.activeElement === idInputEl,
      dateInputs: document.querySelectorAll("#adminReportRakebackTableBody input[type='date']").length,
      rows: document.querySelectorAll("#adminReportRakebackTableBody [data-rakeback-shared-row]").length,
      separatorDateText: (separatorDate?.textContent || "").trim(),
      separatorWeekdayText: (separatorWeekday?.textContent || "").trim(),
      separatorStackDisplay: separatorStackStyle?.display || "",
      separatorDateBorderTop: separatorDateStyle?.borderTopWidth || "",
      separatorDateBackground: separatorDateStyle?.backgroundColor || "",
      separatorHeaderInline: !!(separatorDateRect && separatorWeekdayRect && Math.abs(separatorDateRect.top - separatorWeekdayRect.top) <= 2),
    };
  });
  await page.close();
  if (state.dateInputs !== 0 || state.dateType !== "hidden" || state.badgePointer !== "none" || state.idValue !== "12345") {
    throw new Error("admin rakeback smoke failed: " + JSON.stringify(state));
  }
  if (!state.separatorDateText || !state.separatorWeekdayText || !state.separatorStackDisplay.includes("grid") || state.separatorDateBorderTop !== "0px" || (state.separatorDateBackground !== "rgba(0, 0, 0, 0)" && state.separatorDateBackground !== "transparent") || !state.separatorHeaderInline) {
    throw new Error("admin rakeback date separator smoke failed: " + JSON.stringify(state));
  }
  if (pageErrors.length) throw new Error("page errors during admin-rakeback check:\n" + pageErrors.join("\n"));
  return state;
}

async function checkProfilePokerPlus(browser) {
  const { page, pageErrors } = await newPage(browser);
  await installPokerPlusProfileMocks(page);
  await openIndex(page);
  await page.waitForFunction(() => typeof window.pokerApiHasCredential === "function" && typeof window.getApiBase === "function", null, { timeout: 5000 });
  await enableVerifiedProfile(page);
  await openProfilePoker21(page);
  const state = await page.evaluate(() => {
    const mttSection = document.querySelector(".profile-pokerplus-stats-section--mtt");
    const sngSection = document.querySelector(".profile-pokerplus-stats-section--sng");
    const cards = Array.from(mttSection?.querySelectorAll(".profile-pokerplus-stat") || []);
    const lifetimeCard = cards.find((card) => (card.querySelector(".profile-pokerplus-stat__label")?.textContent || "").trim() === "Выигрыш за все время");
    const countedCard = cards.find((card) => (card.querySelector(".profile-pokerplus-stat__label")?.textContent || "").trim() === "Выигрыш с момента ведения статистики");
    const countCard = cards.find((card) => (card.querySelector(".profile-pokerplus-stat__label")?.textContent || "").trim() === "MTT игр");
    const sngStyle = sngSection ? getComputedStyle(sngSection) : null;
    return {
      lifetimeLabel: (lifetimeCard?.querySelector(".profile-pokerplus-stat__label")?.textContent || "").trim(),
      lifetimeValue: (lifetimeCard?.querySelector(".profile-pokerplus-stat__value")?.textContent || "").trim(),
      lifetimeRaw: (lifetimeCard?.querySelector(".profile-pokerplus-stat__raw")?.textContent || "").trim(),
      countedLabel: (countedCard?.querySelector(".profile-pokerplus-stat__label")?.textContent || "").trim(),
      countedValue: (countedCard?.querySelector(".profile-pokerplus-stat__value")?.textContent || "").trim(),
      countedRaw: (countedCard?.querySelector(".profile-pokerplus-stat__raw")?.textContent || "").trim(),
      lifetimeLongLabel: !!lifetimeCard?.classList.contains("profile-pokerplus-stat--long-label"),
      countedLongLabel: !!countedCard?.classList.contains("profile-pokerplus-stat--long-label"),
      cardOrder: cards.map((card) => (card.querySelector(".profile-pokerplus-stat__label")?.textContent || "").trim()).slice(0, 3),
      countValue: (countCard?.querySelector(".profile-pokerplus-stat__value")?.textContent || "").trim(),
      activePeriod: (document.querySelector(".profile-pokerplus-stats-tabs__btn--active")?.textContent || "").trim(),
      sngColorVar: (sngStyle?.getPropertyValue("--profile-p21-section-rgb") || "").trim(),
      sngTextVar: (sngStyle?.getPropertyValue("--profile-p21-section-text") || "").trim(),
    };
  });
  await page.close();
  if (state.lifetimeValue !== "1.1M" || state.lifetimeRaw !== "1084734" || state.countedValue !== "300K" || state.countedRaw !== "300000" || !state.lifetimeLongLabel || !state.countedLongLabel || state.cardOrder[0] !== "Выигрыш за все время" || state.cardOrder[1] !== "Выигрыш с момента ведения статистики" || state.cardOrder[2] !== "MTT игр" || state.countValue !== "4+" || state.activePeriod !== "Всего" || state.sngColorVar !== "168, 85, 247" || state.sngTextVar !== "#c084fc") {
    throw new Error("profile Poker21 counted MTT winnings smoke failed: " + JSON.stringify(state));
  }
  if (pageErrors.length) throw new Error("page errors during profile-pokerplus check:\n" + pageErrors.join("\n"));
  return state;
}

const checks = {
  load: checkLoad,
  "admin-rakeback": checkAdminRakeback,
  "profile-pokerplus": checkProfilePokerPlus,
};

async function main() {
  const requested = process.argv.slice(2);
  const names = requested.length ? requested : ["load", "admin-rakeback", "profile-pokerplus"];
  const unknown = names.filter((name) => !checks[name]);
  if (unknown.length) throw new Error("Unknown browser smoke check(s): " + unknown.join(", "));

  const { chromium } = resolvePlaywright();
  const server = await startServer();
  let browser;
  try {
    const launchOptions = {};
    const executablePath = chromiumExecutablePath();
    if (executablePath) launchOptions.executablePath = executablePath;
    browser = await chromium.launch(launchOptions);
    const results = {};
    for (const name of names) {
      results[name] = await checks[name](browser);
    }
    console.log(JSON.stringify({ ok: true, url: `http://${host}:${port}/index.html`, checks: results }, null, 2));
  } finally {
    if (browser) await browser.close().catch(() => {});
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((err) => {
  console.error(err && (err.stack || err.message) ? (err.stack || err.message) : err);
  process.exit(1);
});
