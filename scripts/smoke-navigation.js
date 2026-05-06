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
    const els = Array.from(document.querySelectorAll("[data-view-target]"))
      .filter((node) => node.getAttribute("data-view-target") === targetName);
    const el = els.find(isActuallyVisible);
    if (!el) return false;
    el.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
    return true;
  }, target);

  if (!clicked) {
    await page.evaluate((targetName) => {
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
    const errors = [];
    page.on("pageerror", (err) => errors.push(String((err && (err.stack || err.message)) || err)));

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
    });

    const route = ["chat", "download", "cashout", "profile", "player-crm", "home", "bonus-game", "home", "raffles", "spring-rating"];
    const views = [];
    for (const target of route) {
      const via = await clickVisibleOrSetView(page, target);
      if (target === "player-crm") {
        await page.waitForFunction((targetName) => document.body.getAttribute("data-view") === targetName, target, { timeout: 6000 });
      } else {
        await page.waitForTimeout(target === "chat" ? 1200 : 350);
      }
      const view = await page.evaluate(() => document.body.getAttribute("data-view"));
      views.push({ target, via, view });
      if (view !== target) throw new Error(`Expected ${target}, got ${view}`);
      if (target === "player-crm") {
        await page.waitForFunction(() => typeof window.pokerInitPlayerCrm === "function", null, { timeout: 4000 });
        const crmState = await page.evaluate(() => {
          const root = document.getElementById("playerCrmView");
          const section = root && root.querySelector(".player-crm");
          const rootRect = root ? root.getBoundingClientRect() : null;
          const rect = section ? section.getBoundingClientRect() : null;
          return {
            bound: root && root.dataset.crmBound === "1",
            rootTall: !!(rootRect && rootRect.height >= Math.min(window.innerHeight || 0, 640)),
            visible: !!(section && rect && rect.width > 0 && rect.height > 0 && getComputedStyle(section).visibility !== "hidden"),
            sectionInViewport: !!(rect && rect.bottom > 180 && rect.top < Math.max(360, (window.innerHeight || 0) - 120)),
            hasFeedback: !!(document.getElementById("playerCrmStats") && document.getElementById("playerCrmStats").textContent.trim()) ||
              !!(document.getElementById("playerCrmAnalytics") && document.getElementById("playerCrmAnalytics").textContent.trim()),
          };
        });
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

    console.log(JSON.stringify({ ok: true, url: pathToFileURL(path.join(root, "index.html")).href, views, state, winterState }, null, 2));
  } finally {
    if (browser) await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
});
