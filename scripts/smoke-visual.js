#!/usr/bin/env node
"use strict";

const fs = require("fs");
const http = require("http");
const path = require("path");

const root = path.join(__dirname, "..");
const port = Number(process.env.SMOKE_VISUAL_PORT || 4181);
const host = "127.0.0.1";
const outDir = path.join(root, "tmp", "visual-smoke");

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
  throw new Error("Playwright is not available. Run `npx playwright install chromium` once, then retry `npm run smoke:visual`.");
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
  if (ext === ".pdf") return "application/pdf";
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
        res.writeHead(200, { "Content-Type": contentType(abs), "Cache-Control": "no-store" });
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
  const candidate = path.join(
    process.env.HOME || "",
    "Library",
    "Caches",
    "ms-playwright",
    "chromium-1217",
    "chrome-mac-arm64",
    "Google Chrome for Testing.app",
    "Contents",
    "MacOS",
    "Google Chrome for Testing"
  );
  return fs.existsSync(candidate) ? candidate : undefined;
}

async function showView(page, view) {
  await page.evaluate((viewName) => {
    if (viewName === "home") {
      if (typeof setView === "function") setView("home");
      return;
    }
    if (typeof setView !== "function") throw new Error("setView is not available");
    setView(viewName);
  }, view);
  await page.waitForTimeout(view === "chat" ? 1400 : 700);
}

async function inspectView(page, view) {
  return page.evaluate((viewName) => {
    const active = document.querySelector('[data-view="' + viewName + '"]');
    const nav = document.querySelector(".bottom-nav");
    const doc = document.documentElement;
    const body = document.body;
    const visibleTextNodes = Array.from(document.querySelectorAll("h1,h2,h3,p,button,a,span"))
      .filter((node) => {
        const r = node.getBoundingClientRect();
        const st = getComputedStyle(node);
        return r.width > 0 && r.height > 0 && st.visibility !== "hidden" && st.display !== "none";
      })
      .slice(0, 400);
    const overflows = visibleTextNodes
      .map((node) => {
        const r = node.getBoundingClientRect();
        const p = node.parentElement && node.parentElement.getBoundingClientRect();
        return {
          tag: node.tagName,
          text: String(node.textContent || "").trim().slice(0, 80),
          left: Math.round(r.left),
          right: Math.round(r.right),
          parentLeft: p ? Math.round(p.left) : 0,
          parentRight: p ? Math.round(p.right) : 0,
        };
      })
      .filter((item) => item.text && (item.left < -2 || item.right > window.innerWidth + 2));
    return {
      bodyView: body.getAttribute("data-view"),
      active: !!active,
      activeBox: active ? active.getBoundingClientRect().toJSON() : null,
      navVisible: !!nav && getComputedStyle(nav).visibility !== "hidden" && nav.getBoundingClientRect().height > 0,
      scrollWidth: Math.ceil(doc.scrollWidth),
      clientWidth: Math.ceil(doc.clientWidth),
      bodyText: String(body.innerText || "").trim().length,
      overflows: overflows.slice(0, 10),
    };
  }, view);
}

async function main() {
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
  const { chromium } = resolvePlaywright();
  const server = await startServer();
  let browser;
  try {
    const launchOptions = {};
    const executablePath = chromiumExecutablePath();
    if (executablePath) launchOptions.executablePath = executablePath;
    browser = await chromium.launch(launchOptions);
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
    const errors = [];
    page.on("pageerror", (err) => errors.push(String((err && err.message) || err)));
    await page.goto(`http://${host}:${port}/`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1200);

    const views = [
      "home",
      "chat",
      "download",
      "cashout",
      "profile",
      "poker-tasks",
      "schedule",
      "streams",
      "learn-play-hub",
      "video-lessons",
      "spring-rating",
    ];
    const results = [];
    for (const view of views) {
      await showView(page, view);
      const data = await inspectView(page, view);
      const shot = path.join(outDir, view + ".png");
      await page.screenshot({ path: shot, fullPage: false });
      const shotBytes = fs.statSync(shot).size;
      results.push({ view, shot: path.relative(root, shot), shotBytes, data });
      if (data.bodyView !== view) throw new Error(`Expected body view ${view}, got ${data.bodyView}`);
      if (!data.active) throw new Error(`Active view ${view} is missing`);
      if (!data.activeBox || data.activeBox.width < 280 || data.activeBox.height < 120) throw new Error(`Active view ${view} is visually too small`);
      if (!data.navVisible) throw new Error(`Bottom nav is hidden on ${view}`);
      if (data.scrollWidth > data.clientWidth + 4) throw new Error(`Horizontal overflow on ${view}: ${data.scrollWidth} > ${data.clientWidth}`);
      if (data.bodyText < 120) throw new Error(`View ${view} looks blank`);
      if (shotBytes < 12000) throw new Error(`Screenshot for ${view} looks blank`);
      if (data.overflows.length) throw new Error(`Text overflow on ${view}: ${JSON.stringify(data.overflows[0])}`);
    }
    if (errors.length) throw new Error(`Page errors:\n${errors.join("\n")}`);
    console.log(JSON.stringify({ ok: true, screenshots: outDir, results }, null, 2));
  } finally {
    if (browser) await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
});
