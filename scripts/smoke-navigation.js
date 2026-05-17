#!/usr/bin/env node
"use strict";

const fs = require("fs");
const http = require("http");
const path = require("path");
const { pathToFileURL } = require("url");

const root = path.join(__dirname, "..");
const port = Number(process.env.SMOKE_NAV_PORT || 4177);
const host = "127.0.0.1";

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

  throw new Error("Playwright is not available. Run `npx playwright install chromium` once, then retry `npm run smoke:nav`.");
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

function chromiumExecutablePath() {
  const candidates = [
    path.join(process.env.HOME || "", "Library", "Caches", "ms-playwright", "chromium-1217", "chrome-mac-arm64", "Google Chrome for Testing.app", "Contents", "MacOS", "Google Chrome for Testing"),
  ];
  return candidates.find((file) => file && fs.existsSync(file));
}

async function clickVisibleOrSetView(page, target) {
  const clicked = await page.evaluate((targetName) => {
    if (targetName === "home" && window.__pokerPlayerCrmStandaloneOpen && typeof window.pokerClosePlayerCrmStandalone === "function") {
      window.pokerClosePlayerCrmStandalone();
      return true;
    }
    function isActuallyVisible(node) {
      if (!node || !node.getBoundingClientRect) return false;
      const view = node.closest && node.closest(".view");
      if (view && !view.classList.contains("view--active")) return false;
      let cur = node;
      while (cur && cur.nodeType === 1) {
        if (cur.hidden || cur.getAttribute("aria-hidden") === "true") return false;
        const style = getComputedStyle(cur);
        if (style.display === "none" || style.visibility === "hidden" || style.visibility === "collapse") return false;
        cur = cur.parentElement;
      }
      const rect = node.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.right > 0 && rect.top < window.innerHeight && rect.left < window.innerWidth;
    }
    const selector = targetName === "player-crm" ? '[data-crm-open="player-crm"], [data-view-target]' : "[data-view-target]";
    const els = Array.from(document.querySelectorAll(selector))
      .filter((node) => node.getAttribute("data-view-target") === targetName || node.getAttribute("data-crm-open") === targetName)
      .filter((node) => targetName !== "home" || !node.classList.contains("bonus-game-back"));
    const el = els.find(isActuallyVisible);
    if (!el) return false;
    el.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
    return true;
  }, target);

  if (!clicked) {
    await page.evaluate((targetName) => {
      if (targetName === "player-crm" && typeof window.pokerOpenPlayerCrmFromHome === "function") {
        window.pokerOpenPlayerCrmFromHome();
        return;
      }
      if (typeof setView !== "function") throw new Error("setView is not available");
      setView(targetName);
    }, target);
  }
  return clicked ? "click" : "setView";
}

async function main() {
  const { chromium } = resolvePlaywright();
  const server = await startServer();
  let browser;
  try {
    const launchOptions = {};
    const executablePath = chromiumExecutablePath();
    if (executablePath) launchOptions.executablePath = executablePath;
    browser = await chromium.launch(launchOptions);
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const adminReportRequestScopes = [];
    const smokeCurrentReport = {
      id: "smoke-current-report",
      createdAt: new Date().toISOString(),
      authorName: "Smoke",
      deposit: 1000,
      cashout: 250,
      prodamus: 120,
      robokassa: 80,
      botExchipDep: 300,
      botExchipCashout: 70,
      bonuses: 40,
      transfers: 15,
      rakeback: 25,
      extraFields: [{ name: "Аня ЗП", amount: 10 }],
    };
    const smokeArchiveReport = {
      id: "smoke-archive-report",
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      authorName: "Archive",
      deposit: 500,
      cashout: 100,
      bonuses: 20,
      rakeback: 5,
    };
    let releaseAdminReportCore;
    let holdAdminReportCore = true;
    const submittedAdminReports = [];
    const submittedRakebackDrafts = [];
    let smokeRakebackDraft = { rows: [], updatedAt: null };
    const adminReportCoreGate = new Promise((resolve) => {
      releaseAdminReportCore = resolve;
    });
    await page.route(/\/app-admin-reports(?:-[^/?]+)?\.js(?:\?|$)/, async (route) => {
      const url = route.request().url();
      const isCore = /\/app-admin-reports\.js(?:\?|$)/.test(url);
      const isSent = /\/app-admin-reports-sent\.js(?:\?|$)/.test(url);
      if (isCore && holdAdminReportCore) await adminReportCoreGate;
      await new Promise((resolve) => setTimeout(resolve, isCore ? 1600 : isSent ? 120 : 1400));
      await route.continue();
    });
    await page.route(/\/api\/admin-report-shifts(?:\?|$)/, async (route) => {
      const url = route.request().url();
      const method = route.request().method();
      const corsHeaders = {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET,POST,PUT,OPTIONS",
        "access-control-allow-headers": "content-type",
      };
      if (method === "OPTIONS") {
        await route.fulfill({
          status: 204,
          headers: corsHeaders,
          body: "",
        });
        return;
      }
      if (method === "POST" || method === "PUT") {
        const payload = JSON.parse(route.request().postData() || "{}");
        if (payload.action === "rakeback_draft_save") {
          submittedRakebackDrafts.push(payload);
          smokeRakebackDraft = {
            rows: Array.isArray(payload.rakebackRows) ? payload.rakebackRows : [],
            deletedTemplates: [],
            deletedRows: [],
            updatedAt: new Date().toISOString(),
            updatedBy: "smoke",
          };
          await route.fulfill({
            status: 200,
            headers: corsHeaders,
            contentType: "application/json; charset=utf-8",
            body: JSON.stringify({ ok: true, rakebackDraft: smokeRakebackDraft }),
          });
          return;
        }
        submittedAdminReports.push(payload);
        await route.fulfill({
          status: 200,
          headers: corsHeaders,
          contentType: "application/json; charset=utf-8",
          body: JSON.stringify({
            ok: true,
            report: Object.assign({ id: "smoke-submitted-report", createdAt: new Date().toISOString() }, payload),
          }),
        });
        return;
      }
      const scope = new URL(url).searchParams.get("scope") || "all";
      if (new URL(url).searchParams.get("rakebackDraft") === "1") {
        await route.fulfill({
          status: 200,
          headers: corsHeaders,
          contentType: "application/json; charset=utf-8",
          body: JSON.stringify({ ok: true, rakebackDraft: smokeRakebackDraft }),
        });
        return;
      }
      adminReportRequestScopes.push(scope);
      await new Promise((resolve) => setTimeout(resolve, 120));
      const reports = scope === "archive"
        ? [smokeArchiveReport]
        : [smokeCurrentReport];
      await route.fulfill({
        status: 200,
        headers: corsHeaders,
        contentType: "application/json; charset=utf-8",
        body: JSON.stringify({
          ok: true,
          scope,
          hasArchive: scope === "currentWeek",
          reports,
        }),
      });
    });
    const errors = [];
    const adminReportRequests = [];
    page.on("pageerror", (err) => errors.push(String((err && (err.stack || err.message)) || err)));
    page.on("request", (request) => {
      if (/\/api\/admin-report-shifts/.test(request.url())) {
        adminReportRequests.push({ method: request.method(), url: request.url() });
      }
    });
    page.on("requestfailed", (request) => {
      if (/\/api\/admin-report-shifts/.test(request.url())) {
        const failure = request.failure();
        adminReportRequests.push({ method: request.method(), url: request.url(), failed: failure && failure.errorText });
      }
    });

    await page.goto(`http://${host}:${port}/`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(120);

    const initialLazy = await page.evaluate(() => ({
      initChat: typeof window.initChat,
      initWinterRating: typeof window.initWinterRating,
      initVideoLessons: typeof window.initVideoLessons,
      initRaffles: typeof window.initRaffles,
      initAdminReport: typeof window.pokerInitAdminReportModal,
      startupScriptTags: Array.from(document.scripts || [])
        .filter((script) => script.src && script.type !== "application/poker-lazy")
        .map((script) => script.src.split("/").pop().split("?")[0]),
      lazyScriptTags: Array.from(document.scripts || [])
        .filter((script) => script.src && script.type === "application/poker-lazy")
        .map((script) => script.src.split("/").pop().split("?")[0]),
      chatScripts: performance.getEntriesByType("resource")
        .filter((entry) => /app-chat-.*\.js/.test(entry.name) || /app-chat-lifecycle\.js/.test(entry.name))
        .map((entry) => entry.name.split("/").pop().split("?")[0]),
      heavyScripts: performance.getEntriesByType("resource")
        .filter((entry) => /app-(hall-fame|rating(?:-spring-season|-spring-runtime|-winter-runtime|-view|-view-adapter|-week-tops)?|streams|video-lessons(?:-modals)?|games|club-tasks|raffles(?:-subscribe|-broadcast|-formatters|-share)?|equilator|auth-debug|share-stats|tracking-links)\.js/.test(entry.name) || /spring-rating-(?:images-league[12]|meta|data(?:-(?:march|april))?)\.js/.test(entry.name) || /winter-rating-data\.js/.test(entry.name) || /peerjs\.min\.js/.test(entry.name))
        .map((entry) => entry.name.split("/").pop().split("?")[0]),
      hiddenImages: performance.getEntriesByType("resource")
        .filter((entry) => /\/assets\/(?:download-hero)\./.test(entry.name))
        .map((entry) => entry.name.split("/").pop()),
    }));
    if (initialLazy.initChat !== "function") throw new Error("initChat must be ready before first chat open");
    if (initialLazy.initVideoLessons === "function") throw new Error("video lessons should be lazy before navigation");
    if (initialLazy.chatScripts.length < 30) throw new Error("chat scripts must be eager-loaded before first chat open");
    const startupTags = new Set(initialLazy.startupScriptTags);
    const lazyTags = new Set(initialLazy.lazyScriptTags);
    ["app-rating-spring-season.js", "app-rating-view.js", "app-rating-view-adapter.js", "app-rating-spring-runtime.js", "app-rating.js", "app-rating-week-tops.js", "spring-rating-images-league1.js", "spring-rating-images-league2.js", "spring-rating-meta.js", "spring-rating-data-march.js", "spring-rating-data-april.js", "spring-rating-data.js", "app-games.js", "app-raffles-subscribe.js", "app-raffles-broadcast.js", "app-raffles-admin-create.js", "app-raffles-completed.js", "app-raffles-public.js", "app-raffles-active-view.js", "app-raffles-formatters.js", "app-raffles.js", "app-raffles-share.js"].forEach((file) => {
      if (!startupTags.has(file)) throw new Error(`expected eager script tag before navigation: ${file}`);
    });
    ["app-video-lessons.js", "app-video-lessons-modals.js", "app-hall-fame.js", "app-equilator.js", "app-rating-winter-runtime.js", "winter-rating-data.js"].forEach((file) => {
      if (!lazyTags.has(file)) throw new Error(`expected lazy script tag before navigation: ${file}`);
    });
    const initialHeavy = new Set(initialLazy.heavyScripts);
    ["app-video-lessons.js", "app-video-lessons-modals.js", "app-hall-fame.js", "app-equilator.js"].forEach((file) => {
      if (initialHeavy.has(file)) throw new Error(`expected lazy script after navigation only: ${file}`);
    });
    if (initialHeavy.has("app-rating-winter-runtime.js")) throw new Error("winter rating runtime should be lazy before winter navigation");
    if (initialHeavy.has("winter-rating-data.js")) throw new Error("winter rating data should be lazy before winter navigation");
    if (initialLazy.hiddenImages.length) throw new Error("hidden section images loaded before navigation: " + initialLazy.hiddenImages.join(", "));

    {
      await page.evaluate(() => {
        window.__pokerTelegramAuth = {
          status: "verified",
          adminReportAccess: true,
          user: { id: 388008256, username: "roman1787443", first_name: "Smoke" },
        };
        window.pokerApiHasCredential = function () { return true; };
        window.getApiBase = function () { return window.location.origin; };
        document.getElementById("app")?.setAttribute("data-api-base", window.location.origin);
        window.pokerRafflesApiQueryLeading = function () { return "?initData=smoke"; };
        const btn = document.getElementById("adminReportBtn");
        if (!btn) throw new Error("admin report button is missing");
        btn.classList.remove("header-admin-report--hidden");
        btn.hidden = false;
        btn.disabled = false;
        btn.removeAttribute("aria-hidden");
      });
      const earlyReportClickStartedAt = Date.now();
      await page.locator("#adminReportBtn").click();
      await page.waitForFunction(() => {
        const modal = document.getElementById("adminReportModal");
        return !!(modal && modal.getAttribute("aria-hidden") === "false");
      }, null, { timeout: 1200 });
      const earlyReportOpenDelayMs = Date.now() - earlyReportClickStartedAt;
      const earlyReportShellState = await page.evaluate(() => {
        const calcTab = document.querySelector("[data-admin-report-tab='calculations']");
        const sentTab = document.querySelector("[data-admin-report-tab='sent']");
        const activePanel = document.querySelector(".admin-report-panel--active");
        return {
          calculationsExists: !!calcTab,
          calculationsHidden: calcTab ? calcTab.hidden : true,
          sentExists: !!sentTab,
          sentHidden: sentTab ? sentTab.hidden : true,
          directOpen: typeof window.pokerOpenAdminReportModal,
          activePanel: activePanel ? activePanel.getAttribute("data-admin-report-panel") : "",
        };
      });
      earlyReportShellState.openDelayMs = earlyReportOpenDelayMs;
      if (earlyReportShellState.openDelayMs > 1400) throw new Error(`admin report instant shell opened too slowly: ${earlyReportShellState.openDelayMs}ms`);
      if (earlyReportShellState.directOpen === "function") throw new Error("admin report core loaded before instant shell assertions");
      if (!earlyReportShellState.calculationsExists || earlyReportShellState.calculationsHidden) {
        throw new Error("admin report calculations tab is hidden before the core module loads");
      }
      if (!earlyReportShellState.sentExists || earlyReportShellState.sentHidden) {
        throw new Error("admin report sent tab is hidden before the core module loads");
      }

      const earlySentClickStartedAt = Date.now();
      await page.locator("[data-admin-report-tab='sent']").click();
      await page.waitForFunction(() => {
        const list = document.getElementById("adminReportSentList");
        const activePanel = document.querySelector(".admin-report-panel--active");
        const text = list ? String(list.textContent || "").trim() : "";
        return !!(activePanel && activePanel.getAttribute("data-admin-report-panel") === "sent" && /Текущая неделя|Неделя/.test(text) && !/Загрузка/.test(text));
      }, null, { timeout: 1800 });
      const earlySentOpenDelayMs = Date.now() - earlySentClickStartedAt;
      await page.waitForFunction(() => {
        return typeof window.AdminReportSentTab === "object" &&
          !!document.querySelector(".admin-report-sent-detail__deposit-group");
      }, null, { timeout: 1800 });
      const earlySentState = await page.evaluate(() => {
        const list = document.getElementById("adminReportSentList");
        const activePanel = document.querySelector(".admin-report-panel--active");
        const archiveHint = document.querySelector("[data-admin-report-sent-archive] .admin-report-sent-period-hint");
        return {
          openDelayMs: 0,
          text: list ? String(list.textContent || "").trim() : "",
          activePanel: activePanel ? activePanel.getAttribute("data-admin-report-panel") : "",
          sentModule: typeof window.AdminReportSentTab,
          sentScriptLoaded: Array.from(document.scripts || []).some((script) => script.getAttribute("data-admin-report-module") === "app-admin-reports-sent.js" && script.getAttribute("data-admin-report-loaded") === "1"),
          hasDepositGroup: !!document.querySelector(".admin-report-sent-detail__deposit-group"),
          hasCalcBlock: !!document.querySelector(".admin-report-sent-detail__field-block--calc"),
          hasDangerBlock: !!document.querySelector(".admin-report-sent-detail__field-block--danger"),
          archiveHint: archiveHint ? String(archiveHint.textContent || "").trim() : "",
        };
      });
      earlySentState.openDelayMs = earlySentOpenDelayMs;
      if (earlySentState.openDelayMs > 1600) throw new Error(`admin report sent shell loaded too slowly before core: ${earlySentState.openDelayMs}ms`);
      if (earlySentState.activePanel !== "sent") throw new Error("admin report sent tab did not become active before core");
      if (!earlySentState.text || /Загрузка/.test(earlySentState.text)) throw new Error("admin report sent tab is stuck loading before core");
      if (earlySentState.sentModule !== "object") throw new Error("admin report sent module did not load before core");
      if (!earlySentState.sentScriptLoaded) throw new Error("admin report sent script was not priority-loaded before core");
      if (!earlySentState.hasDepositGroup || !earlySentState.hasCalcBlock || !earlySentState.hasDangerBlock) {
        throw new Error("admin report sent shell lost highlighted detail sections before core");
      }
      if (!/Откройте/.test(earlySentState.archiveHint)) throw new Error("admin report archive did not stay as a lazy hint before click");
      if (adminReportRequestScopes.includes("archive")) throw new Error("admin report archive loaded before the archive block was opened");
      await page.locator("[data-admin-report-sent-archive] > summary").click();
      await page.waitForFunction(() => {
        const inner = document.querySelector("[data-admin-report-sent-archive] .admin-report-sent-archive__inner");
        const text = inner ? String(inner.textContent || "").trim() : "";
        return !!(text && !/Загрузка/.test(text) && /Archive|Итого/.test(text));
      }, null, { timeout: 1800 });
      if (!adminReportRequestScopes.includes("archive")) throw new Error("admin report archive was not loaded after opening the archive block");
      holdAdminReportCore = false;
      releaseAdminReportCore();
      await page.waitForFunction(() => typeof window.pokerOpenAdminReportModal === "function", null, { timeout: 4500 });
      await page.locator("#adminReportModalClose").click();
    }

    await page.locator("#hallFishRatingBtn").click();
    await page.waitForFunction(() => {
      const modal = document.getElementById("hallFishRatingModal");
      return !!(modal && modal.hidden === false);
    }, null, { timeout: 5000 });
    const fishModalState = await page.evaluate(() => ({
      modalOpen: !!(document.getElementById("hallFishRatingModal") && document.getElementById("hallFishRatingModal").hidden === false),
      initFunction: typeof window.pokerInitHallFishRatingModal,
      lazyScriptExecuted: Array.from(document.scripts || [])
        .some((script) => /app-hall-fame\.js/.test(script.src || "") && script.getAttribute("data-poker-lazy-loaded-from") === "hall"),
    }));
    if (!fishModalState.modalOpen) throw new Error("home fish rating modal did not open on first click");
    if (fishModalState.initFunction !== "function") throw new Error("hall fish modal init function did not load");
    if (!fishModalState.lazyScriptExecuted) throw new Error("hall script was not lazy-loaded by fish button");
    await page.evaluate(() => {
      const close = document.querySelector("#hallFishRatingModal [data-hall-fish-close]");
      if (close) close.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
      const modal = document.getElementById("hallFishRatingModal");
      if (modal) modal.remove();
    });

    const route = ["chat", "download", "cashout", "profile", "home", "player-crm", "home", "bonus-game", "home", "raffles", "spring-rating"];
    const views = [];
    for (const target of route) {
      if (target === "player-crm") {
        await page.evaluate(() => {
          const btn = document.querySelector('[data-crm-open="player-crm"]');
          if (!btn) throw new Error("direct player CRM button is missing");
          btn.hidden = false;
          btn.disabled = false;
          btn.removeAttribute("aria-hidden");
        });
      }
      const via = await clickVisibleOrSetView(page, target);
      if (target === "player-crm") {
        await page.waitForFunction(() => {
          const root = document.getElementById("playerCrmView");
          return !!(window.__pokerPlayerCrmStandaloneOpen && root && root.classList.contains("player-crm-standalone"));
        }, null, { timeout: 6000 });
      } else {
        await page.waitForTimeout(target === "chat" ? 1200 : 350);
      }
      const view = await page.evaluate(() => document.body.getAttribute("data-view"));
      const crmStandalone = await page.evaluate(() => !!window.__pokerPlayerCrmStandaloneOpen);
      views.push({ target, via, view, crmStandalone });
      if (target === "player-crm") {
        if (!crmStandalone) throw new Error("player CRM standalone overlay did not open");
      } else if (view !== target) {
        throw new Error(`Expected ${target}, got ${view}`);
      }
      if (target === "player-crm") {
        await page.waitForFunction(() => typeof window.pokerInitPlayerCrm === "function", null, { timeout: 4000 });
        await page.waitForFunction(() => {
          const stats = document.getElementById("playerCrmStats");
          const analytics = document.getElementById("playerCrmAnalytics");
          const statsText = stats ? String(stats.textContent || "").trim() : "";
          const analyticsText = analytics ? String(analytics.textContent || "").trim() : "";
          return !/Загрузка CRM/i.test(statsText) && !/График загрузится после открытия CRM/i.test(analyticsText);
        }, null, { timeout: 5000 });
        const crmState = await page.evaluate(() => {
          const root = document.getElementById("playerCrmView");
          const section = root && root.querySelector(".player-crm");
          const rootRect = root ? root.getBoundingClientRect() : null;
          const rect = section ? section.getBoundingClientRect() : null;
          return {
            standalone: !!window.__pokerPlayerCrmStandaloneOpen,
            classed: !!(root && root.classList && root.classList.contains("player-crm-standalone")),
            bound: root && root.dataset.crmBound === "1",
            rootTall: !!(rootRect && rootRect.height >= Math.min(window.innerHeight || 0, 640)),
            visible: !!(section && rect && rect.width > 0 && rect.height > 0 && getComputedStyle(section).visibility !== "hidden"),
            sectionInViewport: !!(rect && rect.bottom > 180 && rect.top < Math.max(360, (window.innerHeight || 0) - 120)),
            hasFeedback: !!(document.getElementById("playerCrmStats") && document.getElementById("playerCrmStats").textContent.trim()) ||
              !!(document.getElementById("playerCrmAnalytics") && document.getElementById("playerCrmAnalytics").textContent.trim()),
          };
        });
        if (!crmState.standalone || !crmState.classed) throw new Error("player CRM standalone layout was not applied");
        if (!crmState.bound) throw new Error("player CRM runtime did not bind");
        if (!crmState.rootTall) throw new Error("player CRM root collapsed on mobile viewport");
        if (!crmState.visible) throw new Error("player CRM section is not visible on mobile viewport");
        if (!crmState.sectionInViewport) throw new Error("player CRM content is clipped below the back button");
        if (!crmState.hasFeedback) throw new Error("player CRM opened without feedback content");
      }
    }

    await page.evaluate(() => {
      if (typeof window.pokerEnsureGlobalModalsHtml !== "function") {
        throw new Error("pokerEnsureGlobalModalsHtml is not available");
      }
      return window.pokerEnsureGlobalModalsHtml();
    });
    await page.waitForTimeout(250);

    const state = await page.evaluate(() => ({
      setView: typeof setView,
      initChat: typeof initChat,
      dialogs: !!document.getElementById("chatDialogsView"),
      chatGeneral: !!document.getElementById("chatGeneralView"),
      chatPersonal: !!document.getElementById("chatPersonalView"),
      profileView: !!document.getElementById("profileView"),
      profileStatus: !!document.getElementById("profileStatusVisual"),
      rafflesView: !!document.querySelector('[data-view="raffles"]'),
      rafflesPanel: !!document.getElementById("rafflesPanelActive"),
      springRatingView: !!document.getElementById("springRatingView"),
      springRatingSection: !!document.getElementById("winterRatingSection"),
      bottomNav: !!document.querySelector(".bottom-nav"),
      bottomNavVisible: !!document.querySelector(".bottom-nav") && getComputedStyle(document.querySelector(".bottom-nav")).visibility !== "hidden",
      globalModalsHost: !!document.getElementById("globalModalsFragmentHost"),
      adminReportModal: !!document.getElementById("adminReportModal"),
      visitorsAdminModal: !!document.getElementById("visitorsAdminModal"),
      imageLightbox: !!document.getElementById("imageLightbox"),
      modules: performance.getEntriesByType("resource")
        .filter((entry) => /app-(chat-lifecycle|webview-keyboard|view-router)\.js/.test(entry.name))
        .map((entry) => entry.name.split("/").pop().split("?")[0]),
      chatScripts: performance.getEntriesByType("resource")
        .filter((entry) => /app-chat-.*\.js/.test(entry.name) || /app-chat-lifecycle\.js/.test(entry.name))
        .map((entry) => entry.name.split("/").pop().split("?")[0]),
      eagerDomainScripts: performance.getEntriesByType("resource")
        .filter((entry) => /app-(hall-fame|rating(?:-spring-season|-spring-runtime|-winter-runtime|-view|-view-adapter|-week-tops)?|streams|video-lessons(?:-modals)?|games|club-tasks|raffles(?:-subscribe|-broadcast|-admin-create|-completed|-public|-active-view|-formatters|-share)?|equilator|visitors-admin|admin-reports|auth-debug|share-stats|tracking-links|tournament-day)\.js/.test(entry.name) || /spring-rating-(?:images-league[12]|meta|data(?:-(?:march|april))?)\.js/.test(entry.name) || /winter-rating-data\.js/.test(entry.name) || /peerjs\.min\.js/.test(entry.name))
        .map((entry) => entry.name.split("/").pop().split("?")[0]),
    }));

    if (state.setView !== "function") throw new Error("setView is not a function");
    if (state.initChat !== "function") throw new Error("initChat is not a function");
    if (!state.dialogs) throw new Error("chat dialogs DOM is missing");
    if (!state.chatGeneral) throw new Error("chat general DOM is missing");
    if (!state.chatPersonal) throw new Error("chat personal DOM is missing");
    if (!state.profileView) throw new Error("profile fragment was not hydrated");
    if (!state.profileStatus) throw new Error("profile status DOM is missing");
    if (!state.rafflesView) throw new Error("raffles fragment was not hydrated");
    if (!state.rafflesPanel) throw new Error("raffles active panel is missing");
    if (!state.springRatingView) throw new Error("spring rating view is missing");
    if (!state.springRatingSection) throw new Error("spring rating section was not hydrated");
    if (!state.bottomNav) throw new Error("bottom nav is missing from initial DOM");
    if (!state.bottomNavVisible) throw new Error("bottom nav is not visible");
    if (state.globalModalsHost) throw new Error("global modals host was not replaced");
    if (!state.adminReportModal) throw new Error("admin report modal fragment was not hydrated");
    if (!state.visitorsAdminModal) throw new Error("visitors admin modal fragment was not hydrated");
    if (!state.imageLightbox) throw new Error("image lightbox fragment was not hydrated");
    if (state.modules.length < 3) throw new Error("split app modules were not loaded");
    if (state.chatScripts.length < 20) throw new Error("chat scripts were not eager-loaded");
    const loadedDomainScripts = new Set(state.eagerDomainScripts);
    ["app-rating-spring-season.js", "app-rating-view.js", "app-rating-view-adapter.js", "app-rating-spring-runtime.js", "app-rating.js", "app-rating-week-tops.js", "spring-rating-images-league1.js", "spring-rating-images-league2.js", "spring-rating-meta.js", "spring-rating-data-march.js", "spring-rating-data-april.js", "spring-rating-data.js", "app-games.js", "app-raffles-subscribe.js", "app-raffles-broadcast.js", "app-raffles-admin-create.js", "app-raffles-completed.js", "app-raffles-public.js", "app-raffles-active-view.js", "app-raffles-formatters.js", "app-raffles.js", "app-raffles-share.js"].forEach((file) => {
      if (!loadedDomainScripts.has(file)) throw new Error(`expected domain script after navigation: ${file}`);
    });
    if (loadedDomainScripts.has("app-rating-winter-runtime.js")) throw new Error("winter rating runtime loaded during spring navigation");
    if (loadedDomainScripts.has("winter-rating-data.js")) throw new Error("winter rating data loaded during spring navigation");

    await clickVisibleOrSetView(page, "home");
    await page.waitForFunction(() => document.body.getAttribute("data-view") === "home", null, { timeout: 4000 });
    await page.evaluate(() => {
      const fishModal = document.getElementById("hallFishRatingModal");
      if (fishModal) fishModal.remove();
      window.__pokerTelegramAuth = {
        status: "verified",
        adminReportAccess: true,
        user: { id: 388008256, username: "roman1787443", first_name: "Smoke" },
      };
      window.pokerApiHasCredential = function () { return true; };
      window.getApiBase = function () { return window.location.origin; };
      document.getElementById("app")?.setAttribute("data-api-base", window.location.origin);
      window.pokerRafflesApiQueryLeading = function () { return "?initData=smoke"; };
      window.localStorage?.removeItem("poker_admin_report_rakeback_templates_open");
      const btn = document.getElementById("adminReportBtn");
      if (!btn) throw new Error("admin report button is missing");
      btn.classList.remove("header-admin-report--hidden");
      btn.hidden = false;
      btn.disabled = false;
      btn.removeAttribute("aria-hidden");
    });
    const reportClickStartedAt = Date.now();
    await page.locator("#adminReportBtn").click();
    await page.waitForFunction(() => {
      const modal = document.getElementById("adminReportModal");
      return !!(modal && modal.getAttribute("aria-hidden") === "false");
    }, null, { timeout: 1200 });
    const reportOpenDelayMs = Date.now() - reportClickStartedAt;
    const reportShellState = await page.evaluate(() => {
      const calcTab = document.querySelector("[data-admin-report-tab='calculations']");
      const sentTab = document.querySelector("[data-admin-report-tab='sent']");
      const activePanel = document.querySelector(".admin-report-panel--active");
      return {
        calculationsExists: !!calcTab,
        calculationsHidden: calcTab ? calcTab.hidden : true,
        sentExists: !!sentTab,
        sentHidden: sentTab ? sentTab.hidden : true,
        directOpen: typeof window.pokerOpenAdminReportModal,
        activePanel: activePanel ? activePanel.getAttribute("data-admin-report-panel") : "",
      };
    });
    if (!reportShellState.calculationsExists || reportShellState.calculationsHidden) {
      throw new Error("admin report calculations tab is hidden in the instant shell");
    }
    if (!reportShellState.sentExists || reportShellState.sentHidden) {
      throw new Error("admin report sent tab is hidden in the instant shell");
    }

    await page.locator("[data-admin-report-tab='rakeback']").click();
    try {
      await page.waitForFunction(() => {
        const activePanel = document.querySelector(".admin-report-panel--active");
        const toggle = document.querySelector("[data-rakeback-template-toggle]");
        const templateRows = Array.from(document.querySelectorAll("#adminReportRakebackTableBody [data-rakeback-template-row]"));
        const ids = Array.from(document.querySelectorAll("#adminReportRakebackTableBody [data-rakeback-player-id]"))
          .map((input) => String(input.value || "").trim())
          .filter(Boolean);
        return !!(
          activePanel &&
          activePanel.getAttribute("data-admin-report-panel") === "rakeback" &&
          toggle &&
          toggle.getAttribute("aria-expanded") === "false" &&
          templateRows.length > 20 &&
          templateRows.every((row) => row.getAttribute("data-rakeback-template-collapsed") === "1") &&
          ids.includes("691016")
        );
      }, null, { timeout: 4200 });
    } catch (rakebackWaitErr) {
      const rakebackDebugState = await page.evaluate(() => ({
        activePanel: document.querySelector(".admin-report-panel--active")?.getAttribute("data-admin-report-panel") || "",
        modalShellBound: document.getElementById("adminReportModal")?.dataset.adminReportShellBound || "",
        statusText: document.getElementById("adminReportRakebackStatus")?.textContent || "",
        rowText: document.getElementById("adminReportRakebackTableBody")?.textContent || "",
        templateToggleExpanded: document.querySelector("[data-rakeback-template-toggle]")?.getAttribute("aria-expanded") || "",
        templateRows: document.querySelectorAll("#adminReportRakebackTableBody [data-rakeback-template-row]").length,
        hiddenTemplateRows: document.querySelectorAll("#adminReportRakebackTableBody [data-rakeback-template-collapsed='1']").length,
        ids: Array.from(document.querySelectorAll("#adminReportRakebackTableBody [data-rakeback-player-id]")).map((input) => String(input.value || "").trim()).filter(Boolean).slice(0, 8),
        dataGlobal: typeof window.AdminReportRakebackStaticData,
        tabGlobal: typeof window.AdminReportRakebackTab,
        directOpen: typeof window.pokerOpenAdminReportModal,
        scripts: Array.from(document.scripts || [])
          .map((script) => ({
            name: (script.src || "").split("/").pop().split("?")[0],
            module: script.getAttribute("data-admin-report-module") || "",
            loaded: script.getAttribute("data-admin-report-loaded") || "",
            lazy: script.getAttribute("data-poker-lazy-loaded-from") || "",
          }))
          .filter((script) => /admin-reports/.test(script.name || script.module)),
      }));
      throw new Error("admin report rakeback shell templates did not render: " + JSON.stringify(rakebackDebugState) + "\nPage errors:\n" + errors.join("\n"));
    }
    const rakebackShellState = await page.evaluate(() => {
      const activePanel = document.querySelector(".admin-report-panel--active");
      const ids = Array.from(document.querySelectorAll("#adminReportRakebackTableBody [data-rakeback-player-id]"))
        .map((input) => String(input.value || "").trim())
        .filter(Boolean);
      const templateToggle = document.querySelector("[data-rakeback-template-toggle]");
      return {
        activePanel: activePanel ? activePanel.getAttribute("data-admin-report-panel") : "",
        rowCount: ids.length,
        firstId: ids[0] || "",
        hasTemplateId: ids.includes("691016"),
        templateToggleExpanded: templateToggle ? templateToggle.getAttribute("aria-expanded") : "",
        templateRows: document.querySelectorAll("#adminReportRakebackTableBody [data-rakeback-template-row]").length,
        hiddenTemplateRows: document.querySelectorAll("#adminReportRakebackTableBody [data-rakeback-template-collapsed='1']").length,
        dataScriptLoaded: Array.from(document.scripts || []).some((script) => script.getAttribute("data-admin-report-module") === "app-admin-reports-rakeback-data.js" && script.getAttribute("data-admin-report-loaded") === "1"),
        tabScriptLoaded: Array.from(document.scripts || []).some((script) => script.getAttribute("data-admin-report-module") === "app-admin-reports-rakeback.js" && script.getAttribute("data-admin-report-loaded") === "1"),
      };
    });
    if (rakebackShellState.activePanel !== "rakeback") throw new Error("admin report rakeback shell tab did not become active");
    if (rakebackShellState.rowCount <= 20 || !rakebackShellState.hasTemplateId) {
      throw new Error("admin report rakeback shell did not insert template rows: " + JSON.stringify(rakebackShellState));
    }
    if (rakebackShellState.templateToggleExpanded !== "false" || rakebackShellState.hiddenTemplateRows !== rakebackShellState.templateRows) {
      throw new Error("admin report rakeback template spoiler is not collapsed by default: " + JSON.stringify(rakebackShellState));
    }
    if (!rakebackShellState.dataScriptLoaded || !rakebackShellState.tabScriptLoaded) {
      throw new Error("admin report rakeback shell did not priority-load template scripts: " + JSON.stringify(rakebackShellState));
    }
    await page.locator("[data-rakeback-template-toggle]").click();
    await page.waitForFunction(() => {
      const toggle = document.querySelector("[data-rakeback-template-toggle]");
      return !!(
        toggle &&
        toggle.getAttribute("aria-expanded") === "true" &&
        !document.querySelector("#adminReportRakebackTableBody [data-rakeback-template-collapsed='1']")
      );
    }, null, { timeout: 1200 });
    const rakebackSpoilerState = await page.evaluate(() => ({
      expanded: document.querySelector("[data-rakeback-template-toggle]")?.getAttribute("aria-expanded") || "",
      storageValue: window.localStorage?.getItem("poker_admin_report_rakeback_templates_open") || "",
      visibleTemplateRows: Array.from(document.querySelectorAll("#adminReportRakebackTableBody [data-rakeback-template-row]"))
        .filter((row) => getComputedStyle(row).display !== "none").length,
    }));
    if (rakebackSpoilerState.expanded !== "true" || rakebackSpoilerState.storageValue !== "1" || rakebackSpoilerState.visibleTemplateRows <= 20) {
      throw new Error("admin report rakeback template spoiler did not open persistently: " + JSON.stringify(rakebackSpoilerState));
    }
    const rakebackDraftSaveResponse = page.waitForResponse((response) => {
      return /\/api\/admin-report-shifts/.test(response.url()) && response.request().method() === "POST";
    }, { timeout: 2500 });
    await page.locator("#adminReportRakebackAddBtn").click();
    await rakebackDraftSaveResponse;
    await page.locator("#adminReportRakebackSearch").fill("smoke-shared");
    await page.locator("#adminReportRakebackSearch").fill("");
    await page.locator("#adminReportRakebackRefreshBtn").click();
    await page.waitForFunction(() => {
      return Array.from(document.querySelectorAll("#adminReportRakebackTableBody [data-rakeback-shared-row] [data-rakeback-player-id]"))
        .some((input) => String(input.value || "").trim() === "");
    }, null, { timeout: 2500 });
    const rakebackSharedState = await page.evaluate(() => {
      const addBtn = document.getElementById("adminReportRakebackAddBtn");
      const refreshBtn = document.getElementById("adminReportRakebackRefreshBtn");
      const sharedRows = Array.from(document.querySelectorAll("#adminReportRakebackTableBody [data-rakeback-shared-row]"));
      return {
        addVisible: !!(addBtn && !addBtn.hidden),
        addDisabled: !!(addBtn && addBtn.disabled),
        refreshVisible: !!(refreshBtn && !refreshBtn.hidden),
        refreshDisabled: !!(refreshBtn && refreshBtn.disabled),
        sharedRows: sharedRows.length,
      };
    });
    if (!rakebackSharedState.addVisible || rakebackSharedState.addDisabled) {
      throw new Error("admin report rakeback add button is not usable: " + JSON.stringify(rakebackSharedState));
    }
    if (!rakebackSharedState.refreshVisible) {
      throw new Error("admin report rakeback refresh button is missing: " + JSON.stringify(rakebackSharedState));
    }
    if (!submittedRakebackDrafts.length || !(submittedRakebackDrafts[submittedRakebackDrafts.length - 1].rakebackRows || []).length) {
      throw new Error("admin report rakeback add button did not save shared draft");
    }

    const sentClickStartedAt = Date.now();
    await page.locator("[data-admin-report-tab='sent']").click();
    await page.waitForFunction(() => {
      const list = document.getElementById("adminReportSentList");
      const activePanel = document.querySelector(".admin-report-panel--active");
      const text = list ? String(list.textContent || "").trim() : "";
      return !!(activePanel && activePanel.getAttribute("data-admin-report-panel") === "sent" && /Текущая неделя|Неделя/.test(text) && !/Загрузка/.test(text));
    }, null, { timeout: 1800 });
    const sentOpenDelayMs = Date.now() - sentClickStartedAt;
    await page.waitForFunction(() => {
      return typeof window.AdminReportSentTab === "object" &&
        !!document.querySelector(".admin-report-sent-detail__deposit-group");
    }, null, { timeout: 1800 });
    const sentState = await page.evaluate(() => {
      const list = document.getElementById("adminReportSentList");
      const activePanel = document.querySelector(".admin-report-panel--active");
      return {
        openDelayMs: 0,
        text: list ? String(list.textContent || "").trim() : "",
        activePanel: activePanel ? activePanel.getAttribute("data-admin-report-panel") : "",
        sentModule: typeof window.AdminReportSentTab,
        sentScriptLoaded: Array.from(document.scripts || []).some((script) => script.getAttribute("data-admin-report-module") === "app-admin-reports-sent.js" && script.getAttribute("data-admin-report-loaded") === "1"),
      };
    });
    sentState.openDelayMs = sentOpenDelayMs;
    if (sentState.openDelayMs > 1600) throw new Error(`admin report sent tab loaded too slowly: ${sentState.openDelayMs}ms`);
    if (sentState.activePanel !== "sent") throw new Error("admin report sent tab did not become active");
    if (!sentState.text || /Загрузка/.test(sentState.text)) throw new Error("admin report sent tab is stuck loading");
    if (sentState.sentModule !== "object") throw new Error("admin report sent module did not load");
    if (!sentState.sentScriptLoaded) throw new Error("admin report sent script was not priority-loaded");

    holdAdminReportCore = false;
    releaseAdminReportCore();
    await page.waitForFunction(() => {
      const btn = document.getElementById("adminReportBtn");
      return typeof window.pokerOpenAdminReportModal === "function" &&
        !!(btn && btn.dataset.adminReportBound === "1") &&
        Array.from(document.scripts || []).some((script) => /app-admin-reports\.js/.test(script.src || "") && script.getAttribute("data-poker-lazy-loaded-from") === "admin-reports");
    }, null, { timeout: 4500 });
    const reportState = await page.evaluate(() => ({
      open: !!(document.getElementById("adminReportModal") && document.getElementById("adminReportModal").getAttribute("aria-hidden") === "false"),
      directOpen: typeof window.pokerOpenAdminReportModal,
      bound: document.getElementById("adminReportBtn")?.dataset.adminReportBound || "",
      loadedCore: Array.from(document.scripts || []).some((script) => /app-admin-reports\.js/.test(script.src || "") && script.getAttribute("data-poker-lazy-loaded-from") === "admin-reports"),
    }));
    reportState.openDelayMs = reportOpenDelayMs;
    if (!reportState.open) throw new Error("admin report modal did not open from the home button");
    if (reportState.openDelayMs > 1400) throw new Error(`admin report modal opened too slowly: ${reportState.openDelayMs}ms`);
    if (reportState.directOpen !== "function") throw new Error("admin report direct opener is not available");
    if (reportState.bound !== "1") throw new Error("admin report button was not bound after lazy load");
    if (!reportState.loadedCore) throw new Error("admin report core script was not lazy-loaded by the home button");
    await page.locator("[data-admin-report-tab='form']").click();
    await page.locator("#adminReportDeposit").fill("321");
    const submitResponse = page.waitForResponse((response) => {
      return /\/api\/admin-report-shifts/.test(response.url()) && response.request().method() === "POST";
    }, { timeout: 2500 });
    await page.locator("#adminReportSubmitBtn").click();
    try {
      await submitResponse;
    } catch (submitWaitErr) {
      const submitDebugState = await page.evaluate(() => ({
        activePanel: document.querySelector(".admin-report-panel--active")?.getAttribute("data-admin-report-panel") || "",
        depositInput: document.getElementById("adminReportDeposit")?.value || "",
        submitDisabled: !!document.getElementById("adminReportSubmitBtn")?.disabled,
        submitShellBound: document.getElementById("adminReportSubmitBtn")?.dataset.adminReportSubmitShellBound || "",
        documentSubmitShellBound: document.documentElement.dataset.adminReportSubmitShellBound || "",
        formLogicLoaded: typeof window.AdminReportFormLogic,
        hasCredential: typeof window.pokerApiHasCredential === "function" ? window.pokerApiHasCredential() : null,
        apiBase: typeof window.getApiBase === "function" ? window.getApiBase() : "",
        appApiBase: document.getElementById("app")?.getAttribute("data-api-base") || "",
      }));
      throw new Error("admin report submit POST response was not observed: " + JSON.stringify(submitDebugState) + "\nRequests:\n" + JSON.stringify(adminReportRequests) + "\nPage errors:\n" + errors.join("\n"));
    }
    await page.waitForTimeout(500);
    const submittedReportState = await page.evaluate(() => ({
      activePanel: document.querySelector(".admin-report-panel--active")?.getAttribute("data-admin-report-panel") || "",
      depositInput: document.getElementById("adminReportDeposit")?.value || "",
      submitDisabled: !!document.getElementById("adminReportSubmitBtn")?.disabled,
      submitShellBound: document.getElementById("adminReportSubmitBtn")?.dataset.adminReportSubmitShellBound || "",
      documentSubmitShellBound: document.documentElement.dataset.adminReportSubmitShellBound || "",
      formLogicLoaded: typeof window.AdminReportFormLogic,
      hasCredential: typeof window.pokerApiHasCredential === "function" ? window.pokerApiHasCredential() : null,
      apiBase: typeof window.getApiBase === "function" ? window.getApiBase() : "",
    }));
    if (!submittedAdminReports.length) throw new Error("admin report submit button did not send a report: " + JSON.stringify(submittedReportState) + "\nRequests:\n" + JSON.stringify(adminReportRequests) + "\nPage errors:\n" + errors.join("\n"));
    if (submittedAdminReports[submittedAdminReports.length - 1].deposit !== 321) throw new Error("admin report submit payload lost deposit value");
    if (submittedReportState.activePanel !== "sent") throw new Error("admin report submit did not switch to sent reports: " + JSON.stringify(submittedReportState));
    if (submittedReportState.depositInput) throw new Error("admin report form was not cleared after submit");
    const currentWeekRequestsBeforeCalc = adminReportRequestScopes.filter((scope) => scope === "currentWeek").length;
    await page.locator("[data-admin-report-tab='calculations']").click();
    await page.waitForFunction(() => {
      const activePanel = document.querySelector(".admin-report-panel--active");
      const deposit = document.getElementById("adminReportCalcDeposit");
      return !!(activePanel && activePanel.getAttribute("data-admin-report-panel") === "calculations" && deposit && !/^0(?:\s*₽)?$/.test(String(deposit.textContent || "").trim()));
    }, null, { timeout: 1800 });
    const calculationsState = await page.evaluate(() => {
      const activePanel = document.querySelector(".admin-report-panel--active");
      return {
        activePanel: activePanel ? activePanel.getAttribute("data-admin-report-panel") : "",
        deposit: document.getElementById("adminReportCalcDeposit")?.textContent || "",
        bonuses: document.getElementById("adminReportCalcBonuses")?.textContent || "",
        rakeback: document.getElementById("adminReportCalcRakeback")?.textContent || "",
        cashout: document.getElementById("adminReportCalcCashout")?.textContent || "",
        botExchipCashout: document.getElementById("adminReportCalcBotExchipCashout")?.textContent || "",
      };
    });
    if (calculationsState.activePanel !== "calculations") throw new Error("admin report calculations tab did not become active");
    if (!/1\s*000|1000/.test(calculationsState.deposit)) throw new Error("admin report calculations did not load sent report deposits");
    if (adminReportRequestScopes.filter((scope) => scope === "currentWeek").length <= currentWeekRequestsBeforeCalc) {
      throw new Error("admin report calculations did not request the current week report scope");
    }
    await page.locator("[data-admin-report-tab='rakeback']").click();
    await page.waitForFunction(() => {
      const activePanel = document.querySelector(".admin-report-panel--active");
      return !!(activePanel && activePanel.getAttribute("data-admin-report-panel") === "rakeback");
    }, null, { timeout: 1800 });
    await page.locator("#adminReportRakebackArchiveBtn").click();
    await page.waitForFunction(() => {
      const archiveBtn = document.getElementById("adminReportRakebackArchiveBtn");
      return !!(archiveBtn && archiveBtn.getAttribute("aria-pressed") === "true");
    }, null, { timeout: 1800 });
    const rakebackArchiveState = await page.evaluate(() => {
      const archiveBtn = document.getElementById("adminReportRakebackArchiveBtn");
      return {
        archivePressed: archiveBtn ? archiveBtn.getAttribute("aria-pressed") : "",
        archiveActive: !!(archiveBtn && archiveBtn.classList.contains("admin-report-rakeback-archive-tab--active")),
        selectedRoomTabs: Array.from(document.querySelectorAll(".admin-report-rakeback-room-tab[aria-selected='true']")).map((tab) => tab.textContent || ""),
      };
    });
    if (rakebackArchiveState.archivePressed !== "true" || !rakebackArchiveState.archiveActive) {
      throw new Error("admin report rakeback archive button did not show active state");
    }
    if (rakebackArchiveState.selectedRoomTabs.length) {
      throw new Error("admin report rakeback room tab stayed selected while archive is active");
    }
    await page.locator("#adminReportModalClose").click();

    const winterVia = await clickVisibleOrSetView(page, "winter-rating");
    await page.waitForFunction(() => document.body.getAttribute("data-view") === "winter-rating", null, { timeout: 4000 }).catch(() => {});
    views.push({
      target: "winter-rating",
      via: winterVia,
      view: await page.evaluate(() => document.body.getAttribute("data-view")),
    });
    const winterState = await page.evaluate(() => ({
      bodyView: document.body.getAttribute("data-view"),
      section: !!document.getElementById("winterRatingSection"),
      springClass: !!(document.getElementById("winterRatingSection") && document.getElementById("winterRatingSection").classList.contains("spring-rating")),
      title: document.querySelector("#winterRatingSection .winter-rating__title-text")?.textContent || "",
      springDateItems: document.querySelectorAll("#winterRatingDates .winter-rating__date-item[data-rating-season='spring']").length,
      winterDateItems: document.querySelectorAll("#winterRatingDates .winter-rating__date-item[data-rating-season='winter']").length,
      counters: typeof window.getWinterRatingCounters,
      winterData: typeof window.WINTER_RATING_BY_DATE,
      loadedScripts: performance.getEntriesByType("resource")
        .filter((entry) => /app-rating-winter-runtime\.js|winter-rating-data\.js/.test(entry.name))
        .map((entry) => entry.name.split("/").pop().split("?")[0]),
      executedLazyScripts: Array.from(document.scripts || [])
        .filter((script) => script.src && (script.getAttribute("data-poker-loaded") === "1" || script.getAttribute("data-poker-lazy-loaded-from")))
        .map((script) => script.src.split("/").pop().split("?")[0]),
    }));
    if (winterState.bodyView !== "winter-rating") throw new Error("winter rating view did not open");
    if (!winterState.section) throw new Error("winter rating section is missing after lazy navigation");
    if (winterState.springClass) throw new Error("winter rating section kept spring class after lazy navigation");
    if (!/Архив рейтинга зимы/.test(winterState.title)) throw new Error("winter rating archive title is missing");
    if (winterState.springDateItems) throw new Error("spring rating date items leaked into winter archive");
    if (!winterState.winterDateItems) throw new Error("winter archive date items were not created dynamically");
    if (winterState.counters !== "function") throw new Error("winter rating runtime did not load");
    if (winterState.winterData === "undefined") throw new Error("winter rating data did not load");
    const winterLoadedScripts = new Set([].concat(winterState.loadedScripts, winterState.executedLazyScripts));
    if (!winterLoadedScripts.has("app-rating-winter-runtime.js")) throw new Error("winter rating runtime script was not fetched");
    if (!winterLoadedScripts.has("winter-rating-data.js")) throw new Error("winter rating data script was not fetched");
    if (errors.length) throw new Error(`Page errors:\n${errors.join("\n")}`);

    console.log(JSON.stringify({ ok: true, url: pathToFileURL(path.join(root, "index.html")).href, views, state, reportShellState, rakebackShellState, rakebackSharedState, reportState, sentState, calculationsState, rakebackArchiveState, winterState }, null, 2));
  } finally {
    if (browser) await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
});
