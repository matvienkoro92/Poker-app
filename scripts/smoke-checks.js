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

function localCssImportsFromStyles() {
  const css = read("styles.css");
  const out = [];
  const re = /@import\s+url\(["']?([^"')]+)["']?\)/gi;
  let match;
  while ((match = re.exec(css))) {
    const file = stripAssetUrl(match[1]);
    if (!file || /^(?:https?:)?\/\//i.test(file) || file.startsWith("/")) continue;
    if (file.includes("/") || !file.endsWith(".css")) continue;
    out.push(file);
  }
  return [...new Set(out)];
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
    './app-auth.js?v=2',
    './app-pwa-auth.js?v=2',
  ])
);

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

add("Build output contains every local CSS import from styles.css", () => {
  const publicDir = path.join(root, "public");
  return localCssImportsFromStyles().every((file) =>
    fs.existsSync(path.join(root, file)) &&
    fs.existsSync(path.join(publicDir, file))
  );
});

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
