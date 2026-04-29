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
    const els = Array.from(document.querySelectorAll("[data-view-target]"))
      .filter((node) => node.getAttribute("data-view-target") === targetName);
    const el = els.find((node) => {
      const rect = node.getBoundingClientRect();
      const style = getComputedStyle(node);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    });
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
    page.on("pageerror", (err) => errors.push(String((err && err.message) || err)));

    await page.goto(`http://${host}:${port}/`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1200);

    const route = ["chat", "download", "cashout", "profile", "home", "video-lessons", "hall-of-fame", "equilator", "raffles", "spring-rating"];
    const views = [];
    for (const target of route) {
      const via = await clickVisibleOrSetView(page, target);
      await page.waitForTimeout(target === "chat" ? 1200 : 350);
      const view = await page.evaluate(() => document.body.getAttribute("data-view"));
      views.push({ target, via, view });
      if (view !== target) throw new Error(`Expected ${target}, got ${view}`);
    }

    const state = await page.evaluate(() => ({
      setView: typeof setView,
      initChat: typeof initChat,
      dialogs: !!document.getElementById("chatDialogsView"),
      chatGeneral: !!document.getElementById("chatGeneralView"),
      chatPersonal: !!document.getElementById("chatPersonalView"),
      profileView: !!document.getElementById("profileView"),
      profileStatus: !!document.getElementById("profileStatusVisual"),
      videoLessonsList: !!document.getElementById("videoLessonsList"),
      hallOfFameView: !!document.getElementById("hallOfFameView"),
      hallTop2026: !!document.querySelector("#hallOfFameView [data-hall-panel='top2026']"),
      equilatorCalc: !!document.getElementById("equilatorCalcBtn"),
      winterRatingSection: !!document.getElementById("winterRatingSection"),
      modules: performance.getEntriesByType("resource")
        .filter((entry) => /app-(chat-lifecycle|webview-keyboard|view-router)\.js/.test(entry.name))
        .map((entry) => entry.name.split("/").pop()),
    }));

    if (state.setView !== "function") throw new Error("setView is not a function");
    if (state.initChat !== "function") throw new Error("initChat is not a function");
    if (!state.dialogs) throw new Error("chat dialogs DOM is missing");
    if (!state.chatGeneral) throw new Error("chat general DOM is missing");
    if (!state.chatPersonal) throw new Error("chat personal DOM is missing");
    if (!state.profileView) throw new Error("profile fragment was not hydrated");
    if (!state.profileStatus) throw new Error("profile status DOM is missing");
    if (!state.videoLessonsList) throw new Error("video lessons fragment was not hydrated");
    if (!state.hallOfFameView) throw new Error("hall of fame fragment was not hydrated");
    if (!state.hallTop2026) throw new Error("hall of fame top2026 panel is missing");
    if (!state.equilatorCalc) throw new Error("equilator fragment was not hydrated");
    if (!state.winterRatingSection) throw new Error("winter rating fragment was not hydrated");
    if (state.modules.length < 3) throw new Error("split app modules were not loaded");
    if (errors.length) throw new Error(`Page errors:\n${errors.join("\n")}`);

    console.log(JSON.stringify({ ok: true, url: pathToFileURL(path.join(root, "index.html")).href, views, state }, null, 2));
  } finally {
    if (browser) await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
});
