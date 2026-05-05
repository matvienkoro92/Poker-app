#!/usr/bin/env node
"use strict";

const fs = require("fs");
const http = require("http");
const path = require("path");

const root = path.join(__dirname, "..");
const port = Number(process.env.SMOKE_CHAT_PORT || 4183);
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
  throw new Error("Playwright is not available. Run `npx playwright install chromium` once, then retry `npm run smoke:chat`.");
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
  if (ext === ".mp3") return "audio/mpeg";
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

function jsonResponse(body, status = 200) {
  return {
    status,
    contentType: "application/json; charset=utf-8",
    body: JSON.stringify(body),
  };
}

async function waitForVisible(page, selector, label) {
  await page.waitForFunction((sel) => {
    const el = document.querySelector(sel);
    if (!el) return false;
    const st = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return st.display !== "none" && st.visibility !== "hidden" && r.width > 0 && r.height > 0;
  }, selector, { timeout: 6000 }).catch(async (err) => {
    let snapshot = {};
    try {
      snapshot = await page.evaluate(() => ({
        bodyView: document.body && document.body.getAttribute("data-view"),
        auth: window.__pokerTelegramAuth || null,
        chatActiveTab: window.chatActiveTab || null,
        generalViewClass: (document.getElementById("chatGeneralView") && document.getElementById("chatGeneralView").className) || "",
        generalInputClass: (document.getElementById("chatGeneralInputArea") && document.getElementById("chatGeneralInputArea").className) || "",
        generalSend: (() => {
          const btn = document.getElementById("chatGeneralSendBtn");
          return btn ? {
            text: btn.textContent || "",
            cls: btn.className || "",
            busy: btn.getAttribute("aria-busy"),
            title: btn.getAttribute("title"),
          } : null;
        })(),
        generalVoicePreviewClass: (document.getElementById("chatGeneralVoicePreview") && document.getElementById("chatGeneralVoicePreview").className) || "",
        personalViewClass: (document.getElementById("chatPersonalView") && document.getElementById("chatPersonalView").className) || "",
        convViewClass: (document.getElementById("chatConvView") && document.getElementById("chatConvView").className) || "",
        personalSend: (() => {
          const btn = document.getElementById("chatSendBtn");
          return btn ? {
            text: btn.textContent || "",
            cls: btn.className || "",
            busy: btn.getAttribute("aria-busy"),
            title: btn.getAttribute("title"),
            bound: !!btn._pokerChatSendTapBound,
            hasUnbind: typeof btn._pokerChatSendTapUnbind === "function",
            disabled: !!btn.disabled,
          } : null;
        })(),
        personalVoicePreviewClass: (document.getElementById("chatPersonalVoicePreview") && document.getElementById("chatPersonalVoicePreview").className) || "",
        lastAlert: window.__smokeLastAlert || "",
        contactsHtml: (document.getElementById("chatContacts") && document.getElementById("chatContacts").innerHTML || "").slice(0, 1000),
        dialogsText: (document.getElementById("chatDialogsView") && document.getElementById("chatDialogsView").innerText || "").slice(0, 1000),
      }));
    } catch (eSnapshot) {}
    throw new Error(`${label || selector} did not become visible: ${err.message}\n${JSON.stringify(snapshot, null, 2)}`);
  });
}

async function setComposerText(page, mode, text) {
  const areaId = mode === "general" ? "chatGeneralInputArea" : "chatPersonalInputArea";
  const visibleComposer = page.locator(`#${areaId} textarea:visible`).first();
  if (await visibleComposer.count()) {
    await visibleComposer.fill(text);
    return;
  }
  await page.evaluate(({ mode: nextMode, text: nextText }) => {
    const areaId = nextMode === "general" ? "chatGeneralInputArea" : "chatPersonalInputArea";
    const area = document.getElementById(areaId);
    const direct = area && area.querySelectorAll ? Array.from(area.querySelectorAll("textarea")) : [];
    const shared = document.getElementById("chatSharedComposer");
    const composers = direct.slice();
    if (shared && !composers.includes(shared)) composers.push(shared);
    const composer = composers[0] || null;
    if (!composer) throw new Error(`composer textarea not found for ${nextMode}`);
    composers.forEach((ta) => {
      ta.disabled = false;
      ta.hidden = false;
      ta.removeAttribute("aria-hidden");
      ta.removeAttribute("tabindex");
      ta.value = nextText;
      ta.dispatchEvent(new Event("input", { bubbles: true }));
      ta.dispatchEvent(new Event("change", { bubbles: true }));
    });
    try {
      composer.focus({ preventScroll: true });
    } catch (errFocus) {
      composer.focus();
    }
  }, { mode, text });
}

async function domClick(page, selector) {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) throw new Error(`click target not found: ${sel}`);
    if (typeof el.click === "function") {
      el.click();
      return;
    }
    el.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
  }, selector);
}

async function waitForPostedText(apiCalls, text, timeoutMs = 5000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const found = apiCalls.some((call) => call.pathname === "/api/chat" && call.method === "POST" && call.body && call.body.text === text);
    if (found) return;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error(`POST text was not observed: ${text}`);
}

async function main() {
  const { chromium } = resolvePlaywright();
  const server = await startServer();
  const apiCalls = [];
  let browser;
  try {
    const launchOptions = {};
    const executablePath = chromiumExecutablePath();
    if (executablePath) launchOptions.executablePath = executablePath;
    browser = await chromium.launch(launchOptions);
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
    const errors = [];
    page.on("pageerror", (err) => errors.push(String((err && (err.stack || err.message)) || err)));

    await page.addInitScript(() => {
      const user = { id: 1001, memberId: "tg_1001", first_name: "Smoke", username: "smoke_user" };
      localStorage.setItem("poker_pwa_tg_session", JSON.stringify({ token: "smoke-session", user }));
      window.__pokerTelegramAuth = { status: "dev_skip", user, error: null };
      window.Telegram = window.Telegram || {};
      window.Telegram.WebApp = window.Telegram.WebApp || {
        initData: "",
        initDataUnsafe: { user },
        platform: "smoke",
        ready() {},
        expand() {},
        showAlert(message) { window.__smokeLastAlert = String(message || ""); },
        HapticFeedback: { impactOccurred() {}, notificationOccurred() {} },
      };
      Object.defineProperty(navigator, "mediaDevices", {
        configurable: true,
        value: {
          getUserMedia: () => Promise.resolve({ getTracks: () => [{ stop() {} }] }),
        },
      });
      window.MediaRecorder = class FakeMediaRecorder {
        constructor(stream) {
          this.stream = stream;
          this.state = "inactive";
          this.mimeType = "audio/webm";
        }
        start() {
          this.state = "recording";
        }
        requestData() {
          if (this.ondataavailable) this.ondataavailable({ data: new Blob(["smoke"], { type: "audio/webm" }) });
        }
        stop() {
          this.requestData();
          this.state = "inactive";
          if (this.onstop) setTimeout(() => this.onstop(), 0);
        }
      };
    });

    await page.route("**/api/**", async (route) => {
      const req = route.request();
      const url = new URL(req.url());
      const method = req.method();
      const pathname = url.pathname;
      let body = null;
      try {
        body = method === "GET" ? null : JSON.parse(req.postData() || "{}");
      } catch (err) {
        body = {};
      }
      apiCalls.push({ method, pathname, search: url.search, body });
      if (pathname === "/api/users") {
        return route.fulfill(jsonResponse({
          ok: true,
          userName: "Smoke Friend",
          chatDisplayName: "Smoke Friend",
          p21Id: "ID123456",
          avatar: "",
          statusLevel: 7,
          pokerPlusVerified: true,
        }));
      }
      if (pathname === "/api/friends") {
        return route.fulfill(jsonResponse({ ok: true }));
      }
      if (pathname === "/api/chat" && method === "GET") {
        const mode = url.searchParams.get("mode") || "";
        const peer = url.searchParams.get("with") || "";
        if (mode === "contacts") {
          return route.fulfill(jsonResponse({
            ok: true,
            isAdmin: true,
            clubChatAccess: "open",
            clubChatPendingReviewCount: 0,
            contacts: [
              {
                id: "tg_friend",
                name: "Smoke Friend",
                contactName: "Smoke Friend",
                p21Id: "ID123456",
                unreadCount: 2,
                lastText: "Unread smoke message",
                lastTime: new Date().toISOString(),
                online: true,
                statusLevel: 7,
                pokerPlusVerified: true,
              },
            ],
          }));
        }
        if (peer) {
          return route.fulfill(jsonResponse({
            ok: true,
            isAdmin: true,
            otherName: "Smoke Friend",
            otherP21Id: "ID123456",
            otherAvatar: "",
            otherStatusLevel: 7,
            otherPokerPlusVerified: true,
            messages: [
              {
                id: "pm_1",
                from: "tg_friend",
                fromName: "Smoke Friend",
                text: "Unread smoke message",
                time: new Date(Date.now() - 60000).toISOString(),
              },
            ],
          }));
        }
        return route.fulfill(jsonResponse({
          ok: true,
          isAdmin: true,
          clubChatAccess: "open",
          participantsCount: 2,
          onlineCount: 2,
          messages: [
            {
              id: "gm_1",
              from: "tg_friend",
              fromName: "Smoke Friend",
              text: "General smoke seed",
              time: new Date(Date.now() - 120000).toISOString(),
            },
          ],
        }));
      }
      if (pathname === "/api/chat" && method === "POST") {
        return route.fulfill(jsonResponse({
          ok: true,
          message: {
            id: "srv_" + apiCalls.length,
            from: "tg_1001",
            fromName: "Smoke",
            text: body && body.text ? String(body.text) : "",
            image: body && body.image ? body.image : "",
            voice: body && body.voice ? body.voice : "",
            time: new Date().toISOString(),
          },
        }));
      }
      return route.fulfill(jsonResponse({ ok: true }));
    });

    await page.goto(`http://${host}:${port}/`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(700);
    await page.evaluate(() => {
      const user = { id: 1001, memberId: "tg_1001", first_name: "Smoke", username: "smoke_user" };
      localStorage.setItem("poker_pwa_tg_session", JSON.stringify({ token: "smoke-session", user }));
      window.__pokerTelegramAuth = { status: "verified", user, error: null, adminAccess: true };
      window.pokerApiHasCredential = function () { return true; };
      window.pokerApiAuthQuery = function (lead) { return (lead || "?") + "pwaSession=smoke-session"; };
      window.pokerApiAuthJsonBody = function (body) {
        return Object.assign({}, body || {}, { pwaSession: "smoke-session" });
      };
      if (typeof setView !== "function") throw new Error("setView is not available");
      setView("chat");
    });
    await waitForVisible(page, "#chatContacts .chat-contact[data-chat-id='tg_friend']", "contact row");
    const unreadVisible = await page.$eval("#chatContacts .chat-contact[data-chat-id='tg_friend'] .chat-contact__unread", (el) =>
      el.classList.contains("chat-contact__unread--visible") && (el.textContent || "").trim() === "2"
    );
    if (!unreadVisible) throw new Error("unread badge did not render from contacts payload");

    const contact = page.locator("#chatContacts .chat-contact[data-chat-id='tg_friend']").first();
    const box = await contact.boundingBox();
    if (!box) throw new Error("contact row has no box");
    await page.mouse.move(box.x + box.width * 0.7, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.2, box.y + box.height / 2, { steps: 6 });
    await page.mouse.up();
    await waitForVisible(page, ".chat-contact-swipe--show-actions .chat-contact-swipe__pin", "swipe pin action");

    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(650);
    await page.mouse.up();
    await waitForVisible(page, "#chatDialogPreviewModal.chat-dialog-preview-modal--open", "dialog preview modal");
    const previewText = await page.locator("#chatDialogPreviewMessages").innerText();
    if (!/Unread smoke message/.test(previewText)) throw new Error("dialog preview did not render messages");
    await page.click("#chatDialogPreviewClose");

    await page.evaluate(() => {
      if (typeof window.chatOpenConvFromDialogs !== "function") throw new Error("chatOpenConvFromDialogs is not available");
      window.chatOpenConvFromDialogs("tg_friend", "Smoke Friend", "ID123456");
    });
    await waitForVisible(page, "#chatConvView:not(.chat-conv-view--hidden)", "conversation view");
    const title = await page.locator("#chatConvTitle").innerText();
    if (!/Smoke Friend/.test(title)) throw new Error(`conversation title mismatch: ${title}`);

    await setComposerText(page, "personal", "client smoke personal");
    await domClick(page, "#chatSendBtn");
    await waitForPostedText(apiCalls, "client smoke personal");

    await page.evaluate(() => {
      if (typeof window.openClubChat === "function") {
        window.openClubChat();
        return;
      }
      if (typeof window.chatSetTab === "function") window.chatSetTab("general");
    });
    await waitForVisible(page, "#chatGeneralView:not(.chat-general-view--hidden)", "general chat view");
    await setComposerText(page, "general", "client smoke general");
    await domClick(page, "#chatGeneralSendBtn");
    await waitForPostedText(apiCalls, "client smoke general");
    await page.waitForFunction(() => {
      const btn = document.getElementById("chatGeneralSendBtn");
      return btn && btn.getAttribute("aria-busy") !== "true";
    }, null, { timeout: 5000 });

    const postedTexts = apiCalls
      .filter((call) => call.pathname === "/api/chat" && call.method === "POST")
      .map((call) => call.body && call.body.text)
      .filter(Boolean);
    if (!postedTexts.includes("client smoke personal")) throw new Error("personal send POST was not observed");
    if (!postedTexts.includes("client smoke general")) throw new Error("general send POST was not observed");

    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForTimeout(700);
    await page.evaluate(() => {
      const user = { id: 1001, memberId: "tg_1001", first_name: "Smoke", username: "smoke_user" };
      localStorage.setItem("poker_pwa_tg_session", JSON.stringify({ token: "smoke-session", user }));
      window.__pokerTelegramAuth = { status: "verified", user, error: null, adminAccess: true };
      window.pokerApiHasCredential = function () { return true; };
      window.pokerApiAuthQuery = function (lead) { return (lead || "?") + "pwaSession=smoke-session"; };
      window.pokerApiAuthJsonBody = function (body) {
        return Object.assign({}, body || {}, { pwaSession: "smoke-session" });
      };
      if (typeof setView !== "function") throw new Error("setView is not available after reload");
      setView("chat");
    });
    await waitForVisible(page, "#chatContacts .chat-contact[data-chat-id='tg_friend']", "contact row after reload");
    await page.evaluate(() => {
      if (typeof window.chatOpenConvFromDialogs !== "function") throw new Error("chatOpenConvFromDialogs is not available");
      window.chatOpenConvFromDialogs("tg_friend", "Smoke Friend", "ID123456");
    });
    await waitForVisible(page, "#chatConvView:not(.chat-conv-view--hidden)", "conversation view for voice");
    await setComposerText(page, "personal", "");
    await page.locator("#chatSendBtn").click({ force: true });
    await waitForVisible(page, "#chatPersonalVoicePreview:not(.chat-voice-preview--hidden)", "personal voice preview");
    await page.click("#chatPersonalVoiceStop");
    await page.waitForFunction(() => {
      const preview = document.getElementById("chatPersonalVoicePreview");
      return preview && !preview.classList.contains("chat-voice-preview--hidden") && !preview.classList.contains("chat-voice-preview--recording");
    }, null, { timeout: 5000 });

    if (errors.length) throw new Error("Page errors:\n" + errors.join("\n"));

    console.log(JSON.stringify({
      ok: true,
      checks: [
        "contacts unread",
        "contact swipe action",
        "dialog long-press preview",
        "open conversation",
        "personal send",
        "general send",
        "voice recording preview",
      ],
      apiCalls: apiCalls.length,
    }, null, 2));
  } finally {
    if (browser) await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
});
