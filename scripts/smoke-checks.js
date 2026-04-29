#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

const files = {
  html: read("index.html"),
  app: read("app.js"),
  appTournamentDay: read("app-tournament-day.js"),
  sw: read("sw.js"),
  chatHandler: read("lib/api-handlers/chat.js"),
  chatWebpushNotify: read("lib/chat-webpush-notify.js"),
  chatPushAdminBroadcastHandler: read("lib/api-handlers/chat-push-admin-broadcast.js"),
  authPwaCodeHandler: read("lib/api-handlers/auth-pwa-code.js"),
  authEmailHandler: read("lib/api-handlers/auth-email.js"),
  telegramBotWebhookHandler: read("lib/api-handlers/telegram-bot-webhook.js"),
  pwaSessionLib: read("lib/poker-pwa-session.js"),
  cssManifest: read("css-manifest.json"),
  jsManifest: read("js-manifest.json"),
  bumpPwaVersion: read("scripts/bump-pwa-login-version.js"),
};

const checks = [];

function add(name, fn) {
  checks.push({ name, fn });
}

function has(file, pattern) {
  const text = files[file];
  if (pattern instanceof RegExp) return pattern.test(text);
  return text.includes(pattern);
}

function hasAll(file, patterns) {
  return patterns.every((pattern) => has(file, pattern));
}

function stripAssetUrl(raw) {
  return String(raw || "")
    .trim()
    .replace(/^\.\/+/, "")
    .split("#")[0]
    .split("?")[0];
}

function localRootScriptFilesFromIndex() {
  const out = [];
  const re = /<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = re.exec(files.html))) {
    const file = stripAssetUrl(match[1]);
    if (!file || /^(?:https?:)?\/\//i.test(file) || file.startsWith("/")) continue;
    if (file.includes("/") || !file.endsWith(".js")) continue;
    out.push(file);
  }
  return [...new Set(out)];
}

function localAssetVersionsFromIndex() {
  const out = [];
  const re = /\b(?:href|src)=["']\.\/([^"']+\.(?:css|js))(?:\?v=([^"']+))?["']/gi;
  let match;
  while ((match = re.exec(files.html))) {
    const file = stripAssetUrl(match[1]);
    if (!file || file.includes("/")) continue;
    out.push({ file, version: match[2] || "" });
  }
  return out;
}

function localAppFilesFromRoot() {
  return fs.readdirSync(root)
    .filter((name) => /^app.*\.js$/.test(name))
    .sort();
}

function jsManifestFiles() {
  let parsed;
  try {
    parsed = JSON.parse(files.jsManifest);
  } catch (err) {
    return [];
  }
  const domains = parsed && parsed.domains && typeof parsed.domains === "object" ? parsed.domains : {};
  const out = [];
  Object.keys(domains).forEach((name) => {
    const list = Array.isArray(domains[name]) ? domains[name] : [];
    list.forEach((file) => {
      if (/^app.*\.js$/.test(file)) out.push(file);
    });
  });
  const adminModules = parsed && parsed.domains && parsed.domains.adminModules && typeof parsed.domains.adminModules === "object"
    ? parsed.domains.adminModules
    : {};
  Object.keys(adminModules).forEach((name) => {
    const list = Array.isArray(adminModules[name]) ? adminModules[name] : [];
    list.forEach((file) => {
      if (/^app.*\.js$/.test(file)) out.push(file);
    });
  });
  return [...new Set(out)].sort();
}

function indexScriptOrder() {
  return localRootScriptFilesFromIndex();
}

function appearsBefore(list, before, after) {
  const a = list.indexOf(before);
  const b = list.indexOf(after);
  return a >= 0 && b >= 0 && a < b;
}

function localCssImportsFromStyles() {
  const out = [];
  const seen = new Set();
  function walk(rel) {
    let css = "";
    try {
      css = read(rel);
    } catch (err) {
      return;
    }
    const re = /@import\s+url\(["']?([^"')]+)["']?\)/gi;
    let match;
    while ((match = re.exec(css))) {
      const file = stripAssetUrl(match[1]);
      if (!file || /^(?:https?:)?\/\//i.test(file) || file.startsWith("/")) continue;
      if (file.includes("/") || !file.endsWith(".css")) continue;
      if (seen.has(file)) continue;
      seen.add(file);
      out.push(file);
      walk(file);
    }
  }
  walk("styles.css");
  return out;
}

files.client = localRootScriptFilesFromIndex()
  .map((file) => {
    try {
      return read(file);
    } catch (err) {
      return "";
    }
  })
  .join("\n");

add("PWA auth shell is present", () =>
  hasAll("html", [
    'id="pwaAuthScreen"',
    'id="pwaAuthLoginMount"',
    'id="pwaLoginScreenVersion"',
    "pwa-auth-preinit",
  ]) &&
  hasAll("client", [
    "pokerReadPwaGuestMode",
    "__pokerOpenSharedAccountAuthFlow",
    "pwaAuthScreen",
  ])
);

add("PWA service worker is versioned", () =>
  has("client", 'var swUrl = "./sw.js"') &&
  has("client", 'getAttribute("data-app-version")') &&
  has("client", "navigator.serviceWorker.register(swUrl")
);

add("PWA saved session restores before empty initData login gate", () =>
  has("client", /if \(!initData\) \{\s*attemptPwaSideAuthRestoreAsync\(hideBootOverlay\)\.then\(function \(restored\) \{\s*if \(restored\) return;/)
);

add("PWA email login does not force a post-auth reload", () =>
  !has("client", "eReloadAfterEmailPasswordLogin") && !has("client", "eReloadAfterEmailLogin")
);

add("PWA auth keeps verified sessions over stale unauthorized UI", () =>
  hasAll("client", [
    "function hasActiveVerifiedAuthState()",
    "function showUnauthorized(force)",
    "if (!force && hasActiveVerifiedAuthState())",
    "var hasStoredSessionForRestore =",
    "attemptPwaSideAuthRestoreAsync().then(function (restored)",
    "var authFlowGeneration = 0",
    "var verifyFlowGeneration = bumpAuthFlowGeneration()",
  ])
);

add("PWA Telegram startup keeps restored session during initData refresh", () =>
  hasAll("client", [
    "var restoredBeforeInitDataRefresh = false",
    "restoredBeforeInitDataRefresh = attemptPwaSideAuthRestore(hideBootOverlay)",
    "var hadVerifiedBeforeInitDataRefresh = restoredBeforeInitDataRefresh || hasActiveVerifiedAuthState()",
    "function keepRestoredAuthIfPossible()",
    "if (keepRestoredAuthIfPossible()) return",
  ])
);

add("PWA auth scripts are cache-busted after session fixes", () =>
  hasAll("html", [
    './app-auth.js?v=',
    './app-pwa-auth.js?v=',
  ])
);

add("PWA version bump also cache-busts local CSS and JS assets", () =>
  hasAll("bumpPwaVersion", [
    "data-app-version",
    "(?:href|src)",
    "?v=${next}",
  ])
);

add("Local CSS and JS assets use data-app-version cache bust", () => {
  const versionMatch = files.html.match(/data-app-version="([^"]+)"/);
  const version = versionMatch && versionMatch[1];
  if (!version) return false;
  return localAssetVersionsFromIndex().every((asset) => asset.version === version);
});

add("PWA session has cookie fallback for storage-hostile browsers", () =>
  hasAll("client", [
    "function pokerReadAuthCookie(name)",
    "function pokerWriteAuthCookie(name, value)",
    "function pokerClearAuthCookie(name)",
    "function pokerMinimalPwaSessionCookiePayload(token, authMethod, sessionExtra)",
    "function pokerBuildUserFromPwaSessionToken(token, isVk)",
    "pokerReadAuthCookie(POKER_PWA_TG_SESSION_KEY)",
    "pokerReadAuthCookie(POKER_PWA_VK_SESSION_KEY)",
    "pokerClearAuthCookie(POKER_PWA_TG_SESSION_KEY)",
  ])
);

add("PWA session has IndexedDB fallback before login gate", () =>
  hasAll("client", [
    "function pokerOpenPwaAuthDb()",
    "function pokerWritePwaSessionToIdb(key, payload)",
    "function pokerReadPwaSessionRecordAsync(key)",
    "function attemptPwaSideAuthRestoreAsync(hideBootOverlay)",
    "attemptPwaSideAuthRestoreAsync(hideBootOverlay).then(function (restored)",
    "pokerSavePwaTgSession(record.token, record.user",
  ])
);

add("PWA session persistence rehydrates sync stores and lasts 180 days", () =>
  hasAll("client", [
    "POKER_PWA_AUTH_COOKIE_MAX_AGE_SEC = 15552000",
    "Max-Age=\" + POKER_PWA_AUTH_COOKIE_MAX_AGE_SEC",
    "pokerSavePwaTgSession(record.token, record.user",
    "pokerSavePwaVkSession(record.token, record.user)",
  ]) &&
  hasAll("pwaSessionLib", [
    "PWA_SESSION_TTL_SEC = 60 * 60 * 24 * 180",
    "ttlSec || PWA_SESSION_TTL_SEC",
  ])
);

add("PWA Telegram code requests use current auth and avoid stale username binds", () =>
  hasAll("client", [
    'pokerApiAuthJsonBody({ action: "request", username: username })',
    'pokerApiAuthJsonBody({ action: "verify", username: username, code: code, password: passwordValue() })',
  ]) &&
  hasAll("authPwaCodeHandler", [
    "resolveTelegramIdentity",
    "memberIdFromIdentity",
    "pruneDuplicateUsernameMappings",
    "Для этого @username найдено несколько старых привязок",
  ]) &&
  hasAll("telegramBotWebhookHandler", [
    "usernameRedisCommands",
    "HGETALL",
    "commands.push([\"HDEL\", USERNAMES_KEY, key])",
  ])
);

add("Email login prefers the linked email account over stale device hints", () =>
  has("authEmailHandler", "let dtId = existingLinkedDtId || hintedDtId") &&
  hasAll("client", [
    "function switchEmailToPasswordSetup()",
    "emailPasswordSetupHint",
    "function switchTelegramToPasswordSetup()",
    "telegramPasswordSetupHint",
    "data && data.passwordSetupRequired",
  ])
);

add("Admin push broadcast can choose a click target section", () =>
  hasAll("html", [
    'id="adminPushAllTargetSelect"',
    'value="./?startapp=schedule"',
    'value="./?startapp=raffles"',
    'value="./?startapp=spring_rating"',
  ]) &&
  hasAll("client", [
    "adminPushAllTargetSelect",
    "openUrl: openUrl",
    'streams: "streams"',
    'if (startApp !== "club_chat" && startApp !== "club_chat_dm") return;',
  ]) &&
  hasAll("chatWebpushNotify", [
    "normalizeAdminPushOpenUrl",
    "ADMIN_PUSH_ALLOWED_STARTAPPS",
    "hall_fame_top2026",
  ]) &&
  has("chatPushAdminBroadcastHandler", "openUrl")
);

add("Chat shell has dialog, general and conversation views", () =>
  hasAll("html", [
    'id="chatDialogsView"',
    'id="chatContacts"',
    'id="chatGeneralView"',
    'id="chatConvView"',
    'id="chatMessages"',
    'id="chatConvProfileOpenBtn"',
  ])
);

add("Chat open keeps instant local snapshots", () =>
  hasAll("client", [
    "pokerTryReadContactsCache",
    "pokerWriteContactsCache",
    "pokerTryReadGeneralSnapshotFromDisk",
    "pokerWriteGeneralSnapshotToDisk",
    "pokerWritePersonalPeerSnapshotToDisk",
    "getPersonalMessagesSnapshotForOpen",
    "pokerMessagesForFastOpenSnapshot",
    "renderMessages(openMessagesCopy)",
  ])
);

add("Fresh chat GET paths bypass browser/SW cache", () =>
  has("client", /fetch\(url,\s*\{\s*cache:\s*"no-store"\s*\}\)/) &&
  has("client", /fetch\(urlContactsB,\s*\{\s*cache:\s*"no-store"\s*\}\)/) &&
  has("client", /fetch\(urlGeneralB,\s*\{\s*cache:\s*"no-store"\s*\}\)/) &&
  has("client", /fetch\(base \+ "\/api\/chat" \+ pokerApiAuthQuery\("\?"\) \+ q,\s*\{\s*cache:\s*"no-store"\s*\}\)/)
);

add("Chat API supports fast/diff/poll responses", () =>
  hasAll("chatHandler", [
    "fastOpen",
    "notModified",
    "pollRev",
    "afterId",
    "afterTime",
    "contactsMetaOnly",
  ])
);

add("Chat sender label hides Telegram login when a name exists", () =>
  has("chatHandler", "if (nameParts) return nameParts;") &&
  !has("chatHandler", 'return nameParts + " · " + nickDisplay')
);

add("Schedule keeps weekly, day and daily tournament order", () =>
  hasAll("html", [
    'schedule-section--week-tournament',
    "Турнир Недели Нокаут Меджик</td><td>2 000₽</td><td>R:2 000₽</td><td>300 000₽</td><td>18:00",
    "Турниры дня в 18:00 МСК",
    '<tr class="schedule-row--freeroll"><td>Суббота</td><td><span class="schedule-freeroll-name">Фриролл</span>',
    "<tr><td>PKO/MKO</td><td>300₽</td><td>R:300₽</td><td>25 000₽</td><td>17:00</td></tr>",
    "<tr><td>PLO4</td><td>300₽</td><td>—</td><td>10 000₽</td><td>20:00</td></tr>",
  ]) &&
  has("appTournamentDay", 'guarantee: "300 000₽"') &&
  !has("html", "schedule-section--xpoker-freerolls") &&
  !has("html", "Rebuy (19:00)")
);

add("Player card exposes Poker21, status, stats and actions", () =>
  hasAll("html", [
    'id="chatUserModal"',
    'id="chatUserModalP21"',
    'id="chatUserModalStatusScale"',
    'id="chatUserModalPlayerStats"',
    'id="chatUserModalWriteBtn"',
    'id="chatUserModalVerifiedBadge"',
  ])
);

add("Poker21 profile privacy/status controls are wired", () =>
  hasAll("html", [
    'id="profilePoker21TabBtn"',
    'id="profilePokerPlusSection"',
    'id="profilePokerPlusStatsVisibleYes"',
    'id="profilePokerPlusStatsVisibleNo"',
    'id="profileStatusSection"',
    'id="profileStatusVisual"',
  ]) &&
  hasAll("client", [
    "window.pokerApplyPokerPlusStatsVisible",
    "Ваша статистика теперь видна другим.",
    "Ваша статистика теперь НЕ видна другим.",
    "profileStatusVisual",
  ])
);

add("Service worker does not stale-cache explicit fresh chat requests", () =>
  hasAll("sw", [
    'u.pathname.indexOf("/api/chat")',
    'u.pathname.indexOf("/api/chat-image")',
    'cmode === "no-store"',
    'cmode === "reload"',
    "pokerSwChatApiStaleWhileRevalidate",
  ])
);

add("Build output contains every local script from index.html", () => {
  const publicDir = path.join(root, "public");
  return localRootScriptFilesFromIndex().every((file) =>
    fs.existsSync(path.join(root, file)) &&
    fs.existsSync(path.join(publicDir, file))
  );
});

add("JS manifest covers every app module in the workspace", () => {
  const manifestFiles = jsManifestFiles();
  const appFiles = localAppFilesFromRoot();
  return appFiles.every((file) => manifestFiles.includes(file));
});

add("JS manifest maps core app domains", () =>
  hasAll("jsManifest", [
    '"entrypoint": "index.html"',
    '"auth":',
    '"chat":',
    '"rating":',
    '"tournament":',
    '"profile":',
    '"push":',
    '"admin":',
    '"adminModules":',
    '"visitors":',
    '"broadcasts":',
    '"reports":',
    '"tracking":',
    '"auth-debug":',
    '"app-auth.js"',
    '"app-pwa-auth.js"',
    '"app-auth-debug.js"',
    '"app-tournament-day.js"',
  ])
);

add("JS manifest preserves critical load order", () => {
  const order = indexScriptOrder();
  return appearsBefore(order, "app-auth.js", "app-pwa-auth.js") &&
    appearsBefore(order, "app-auth.js", "app-auth-debug.js") &&
    appearsBefore(order, "app-chat-utils.js", "app-chat-render-utils.js") &&
    appearsBefore(order, "app-chat-render-utils.js", "app-chat-message-render-helpers.js") &&
    appearsBefore(order, "app-chat-message-render-helpers.js", "app-chat-message-builders.js") &&
    appearsBefore(order, "app-rating-core.js", "app-rating.js") &&
    appearsBefore(order, "app.js", "app-section-views.js") &&
    appearsBefore(order, "app-visitors-admin.js", "app-admin-reports.js") &&
    appearsBefore(order, "app-admin-reports.js", "app-auth-debug.js");
});

add("Build output contains every local CSS import from styles.css", () => {
  const publicDir = path.join(root, "public");
  return localCssImportsFromStyles().every((file) =>
    fs.existsSync(path.join(root, file)) &&
    fs.existsSync(path.join(publicDir, file))
  );
});

add("CSS domain entrypoints cover auth and tournament styles", () =>
  localCssImportsFromStyles().includes("styles-auth.css") &&
  localCssImportsFromStyles().includes("styles-pwa.css") &&
  localCssImportsFromStyles().includes("styles-tournament.css") &&
  localCssImportsFromStyles().includes("styles-hall-tournament-day.css") &&
  localCssImportsFromStyles().includes("styles-home-tournament.css") &&
  localCssImportsFromStyles().includes("styles-home-overrides.css")
);

add("CSS manifest maps split home and tournament domains", () =>
  hasAll("cssManifest", [
    '"entrypoint": "styles.css"',
    '"auth":',
    '"home":',
    '"tournament":',
    '"styles-home-shell.css"',
    '"styles-home-sections.css"',
    '"styles-home-modals.css"',
    '"styles-home-planner.css"',
    '"styles-home-tournament.css"',
    '"styles-chat-after-shell.css"',
    '"styles-chat-after-modals.css"',
    '"styles-chat-after-responsive.css"',
    '"styles-rating-tables.css"',
    '"styles-rating-modals.css"',
    '"styles-rating-late.css"',
    '"styles-chat-threads.css"',
    '"styles-chat-contacts.css"',
    '"styles-chat-threads-contacts-responsive.css"',
    '"styles-chat-dialogs-list.css"',
    '"styles-chat-groups.css"',
    '"styles-chat-dialogs-groups-responsive.css"',
    '"styles-hall-main-shell.css"',
    '"styles-hall-main-players.css"',
    '"styles-hall-main-responsive.css"',
    '"styles-rating-learning.css"',
    '"styles-rating-games.css"',
    '"styles-rating-learning-games-responsive.css"',
  ])
);

add("Admin auth debug panel is wired", () =>
  hasAll("html", [
    'id="adminAuthDebugBtn"',
    'id="adminAuthDebugModal"',
    './app-auth-debug.js?v=',
  ]) &&
  hasAll("client", [
    "window.__pokerCollectAuthDebug",
    "pokerReadPwaSessionRecordAsync",
    "adminAuthDebugOutput",
  ])
);

const failures = [];
for (const check of checks) {
  let ok = false;
  try {
    ok = !!check.fn();
  } catch (err) {
    ok = false;
  }
  if (!ok) failures.push(check.name);
}

if (failures.length) {
  console.error("Smoke checks failed:");
  failures.forEach((name) => console.error("- " + name));
  process.exit(1);
}

console.log("Smoke checks passed: " + checks.length);
