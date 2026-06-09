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
  chatFragment: read("html-fragments/chat.html"),
  downloadFragment: read("html-fragments/download.html"),
  hallOfFameFragment: read("html-fragments/hall-of-fame.html"),
  videoLessonsFragment: read("html-fragments/video-lessons.html"),
  rafflesFragment: read("html-fragments/raffles.html"),
  profileFragment: read("html-fragments/profile.html"),
  winterRatingFragment: read("html-fragments/winter-rating.html"),
  bonusGameFragment: read("html-fragments/bonus-game.html"),
  coolerGameFragment: read("html-fragments/cooler-game.html"),
  plastererGameFragment: read("html-fragments/plasterer-game.html"),
  learnPlayHubFragment: read("html-fragments/learn-play-hub.html"),
  pokerTasksFragment: read("html-fragments/poker-tasks.html"),
  playerCrmFragment: read("html-fragments/player-crm.html"),
  cashoutFragment: read("html-fragments/cashout.html"),
  streamsFragment: read("html-fragments/streams.html"),
  scheduleFragment: read("html-fragments/schedule.html"),
  globalModalsFragment: read("html-fragments/global-modals.html"),
  globalModalsMediaFragment: read("html-fragments/global-modals-media.html"),
  globalModalsAdminFragment: read("html-fragments/global-modals-admin.html"),
  globalModalsHomeFragment: read("html-fragments/global-modals-home.html"),
  globalModalsChatRatingFragment: read("html-fragments/global-modals-chat-rating.html"),
  globalModalsAccessFragment: read("html-fragments/global-modals-access.html"),
  app: read("app.js"),
  appNetwork: read("app-network.js"),
  appSharedHelpers: read("app-shared-helpers.js"),
  appVisitorId: read("app-visitor-id.js"),
  appVisitorIdModule: read("app-visitor-id.module.mjs"),
  appPopstateRecovery: read("app-popstate-recovery.js"),
  appShellBootstrap: read("app-shell-bootstrap.js"),
  appHomeInit: read("app-home-init.js"),
  appHomePlannerAccess: read("app-home-planner-access.js"),
  appHomePlanner: read("app-home-planner.js"),
  appHomePlannerRuntime: read("app-home-planner-runtime.js"),
  appHomeTasks: read("app-home-tasks.js"),
  appHomeDeepLinks: read("app-home-deeplinks.js"),
  appHomeClubInfoModals: read("app-home-club-info-modals.js"),
  appHomeVpnProxyModal: read("app-home-vpn-proxy-modal.js"),
  appHomeGazetteTasks: read("app-home-gazette-tasks.js"),
  appPwaAuthLanguageUi: read("app-pwa-auth-language-ui.js"),
  appPwaAuthTelegramCode: read("app-pwa-auth-telegram-code.js"),
  appPwaAuthEmailLogin: read("app-pwa-auth-email-login.js"),
  appPwaAuthRestore: read("app-pwa-auth-restore.js"),
  appPwaAuthEntryScreen: read("app-pwa-auth-entry-screen.js"),
  appPwaAuthMode: read("app-pwa-auth-mode.js"),
  appPwaAuthOverlay: read("app-pwa-auth-overlay.js"),
  appPwaAuthRuntime: read("app-pwa-auth-runtime.js"),
  appPwaAuth: read("app-pwa-auth.js"),
  appPwaAuthKeyboardLift: read("app-pwa-auth-keyboard-lift.js"),
  appPwaOpenHandlers: read("app-pwa-open-handlers.js"),
  appChatOpenPeerHydrate: read("app-chat-open-peer-hydrate.js"),
  appChatContactSwipeActions: read("app-chat-contact-swipe-actions.js"),
  appChatDialogPreview: read("app-chat-dialog-preview.js"),
  appChatVoiceRecording: read("app-chat-voice-recording.js"),
  appChatMediaLayout: read("app-chat-media-layout.js"),
  appChatLifecycle: read("app-chat-lifecycle.js"),
  appChatPushOpen: read("app-chat-push-open.js"),
  appChatVoiceMedia: read("app-chat-voice-media.js"),
  appChatKeyboardOverlay: read("app-chat-keyboard-overlay.js"),
  appChatScrollBottom: read("app-chat-scroll-bottom.js"),
  appChatComposerCore: read("app-chat-composer-core.js"),
  appChatComposerSend: read("app-chat-composer-send.js"),
  appChatPresenceTyping: read("app-chat-presence-typing.js"),
  appChatBootstrapPrefetch: read("app-chat-bootstrap-prefetch.js"),
  appChatKeyboardDockFoundation: read("app-chat-keyboard-dock-foundation.js"),
  appChatKeyboardDockLifecycle: read("app-chat-keyboard-dock-lifecycle.js"),
  appChatKeyboardDockComposerLayout: read("app-chat-keyboard-dock-composer-layout.js"),
  appChatKeyboardDockViewportEvents: read("app-chat-keyboard-dock-viewport-events.js"),
  appChatKeyboardDock: read("app-chat-keyboard-dock.js"),
  appChatViewGlue: read("app-chat-view-glue.js"),
  appChatHeaderAvatar: read("app-chat-header-avatar.js"),
  appChatAttachments: read("app-chat-attachments.js"),
  appChatEmojiPicker: read("app-chat-emoji-picker.js"),
  appChatReplyRetryGlue: read("app-chat-reply-retry-glue.js"),
  appChatKeyboardDebug: read("app-chat-keyboard-debug.js"),
  appChatOverscrollDebug: read("app-chat-overscroll-debug.js"),
  appChatGuestGate: read("app-chat-guest-gate.js"),
  appWebviewKeyboard: read("app-webview-keyboard.js"),
  appViewRouter: read("app-view-router.js"),
  appHtmlFragments: read("app-html-fragments.js"),
  appLazyLoader: read("app-lazy-loader.js"),
  appHallFame: read("app-hall-fame.js"),
  appTournamentDay: read("app-tournament-day.js"),
  appRaffles: read("app-raffles.js"),
  appRafflesSubscribe: read("app-raffles-subscribe.js"),
  appRafflesBroadcast: read("app-raffles-broadcast.js"),
  appRafflesAdminCreate: read("app-raffles-admin-create.js"),
  appRafflesCompleted: read("app-raffles-completed.js"),
  appRafflesPublic: read("app-raffles-public.js"),
  appRafflesActiveView: read("app-raffles-active-view.js"),
  appRafflesFormatters: read("app-raffles-formatters.js"),
  appRafflesShare: read("app-raffles-share.js"),
  appPlayerCrmFormatters: read("app-player-crm-formatters.js"),
  appPlayerCrmFormattersModule: read("app-player-crm-formatters.module.mjs"),
  appPlayerCrmRegistrations: read("app-player-crm-registrations.js"),
  appPlayerCrmViewportShell: read("app-player-crm-viewport-shell.js"),
  appPlayerCrmRuntime: read("app-player-crm-runtime.js"),
  appPlayerCrm: read("app-player-crm.js"),
  appRating: read("app-rating.js"),
  appRatingViewAdapter: read("app-rating-view-adapter.js"),
  appRatingSpringRuntime: read("app-rating-spring-runtime.js"),
  appRatingWinterRuntime: read("app-rating-winter-runtime.js"),
  springRatingImagesLeague1: read("spring-rating-images-league1.js"),
  springRatingImagesLeague2: read("spring-rating-images-league2.js"),
  springRatingMeta: read("spring-rating-meta.js"),
  springRatingDataMarch: read("spring-rating-data-march.js"),
  springRatingDataApril: read("spring-rating-data-april.js"),
  springRatingData: read("spring-rating-data.js"),
  winterRatingData: read("winter-rating-data.js"),
  sw: read("sw.js"),
  redisLib: read("lib/redis.js"),
  accountIdLib: read("lib/account-id.js"),
  chatDisplayLabel: read("lib/chat-display-label.js"),
  chatProfileStatus: read("lib/chat-profile-status.js"),
  chatProfileLookups: read("lib/chat-profile-lookups.js"),
  chatReadReceipts: read("lib/chat-read-receipts.js"),
  chatHandler: read("lib/api-handlers/chat.js"),
  chatHandlerRuntime: read("lib/api-handlers/chat-runtime.js"),
  chatMessageActions: read("lib/chat-message-actions.js"),
  chatRouteGet: read("lib/chat-route-get.js"),
  chatRouteGetUpdates: read("lib/chat-route-get-updates.js"),
  chatRouteGetContacts: read("lib/chat-route-get-contacts.js"),
  chatRouteGetThread: read("lib/chat-route-get-thread.js"),
  chatRouteGetClubManage: read("lib/chat-route-get-club-manage.js"),
  chatRouteGetGeneral: read("lib/chat-route-get-general.js"),
  chatRoutePost: read("lib/chat-route-post.js"),
  chatRoutePostGroups: read("lib/chat-route-post-groups.js"),
  chatRoutePostSend: read("lib/chat-route-post-send.js"),
  chatRoutePostMedia: read("lib/chat-route-post-media.js"),
  chatRoutePostNotify: read("lib/chat-route-post-notify.js"),
  apiRouter: read("api/[[...slug]].js"),
  rafflesHandler: read("lib/api-handlers/raffles.js"),
  cronRafflesHandler: read("lib/api-handlers/cron-raffles.js"),
  respectHandler: read("lib/api-handlers/respect.js"),
  usersHandler: read("lib/api-handlers/users.js"),
  chatWebpushNotify: read("lib/chat-webpush-notify.js"),
  chatPushAdminBroadcastHandler: read("lib/api-handlers/chat-push-admin-broadcast.js"),
  authPwaCodeHandler: read("lib/api-handlers/auth-pwa-code.js"),
  authEmailHandler: read("lib/api-handlers/auth-email.js"),
  telegramBotWebhookHandler: read("lib/api-handlers/telegram-bot-webhook.js"),
  pwaSessionLib: read("lib/poker-pwa-session.js"),
  cssManifest: read("css-manifest.json"),
  jsManifest: read("js-manifest.json"),
  globalDepsManifest: read("global-deps-manifest.json"),
  globalDepsWindowBaseline: read("global-deps-window-baseline.json"),
  bumpPwaVersion: read("scripts/bump-pwa-login-version.js"),
  copyToPublic: read("scripts/copy-to-public.js"),
  checkJsSyntax: read("scripts/check-js-syntax.js"),
  styles: read("styles.css"),
  stylesHomeLegacyTail: read("styles-home-legacy-tail.css"),
  stylesHomeOverrides: read("styles-home-overrides.css"),
  stylesHomeRatingPromoLegacy: read("styles-home-rating-promo-legacy.css"),
  stylesHomeRatingPromoLate: read("styles-home-rating-promo-late.css"),
  stylesLayoutTouchTargets: read("styles-layout-touch-targets.css"),
  stylesRating: read("styles-rating.css"),
  stylesRatingRaffles: read("styles-rating-raffles.css"),
};

files.globalModalsAll = [
  files.globalModalsFragment,
  files.globalModalsMediaFragment,
  files.globalModalsAdminFragment,
  files.globalModalsHomeFragment,
  files.globalModalsChatRatingFragment,
  files.globalModalsAccessFragment,
].join("\n");

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

function localStartupScriptFilesFromIndex() {
  const out = [];
  const re = /<script\b([^>]*)\bsrc=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = re.exec(files.html))) {
    const attrs = match[1] || "";
    if (/type=["']application\/poker-lazy["']/i.test(attrs)) continue;
    const file = stripAssetUrl(match[2]);
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

function localCssImportVersionsFromStyles() {
  const out = [];
  const re = /@import\s+url\(["']?\.\/([^"')?#]+\.css)(?:\?v=([^"')?#]+))?["']?\)/gi;
  let match;
  while ((match = re.exec(files.styles || read("styles.css")))) {
    out.push({ file: stripAssetUrl(match[1]), version: match[2] || "" });
  }
  return out;
}

function localAppFilesFromRoot() {
  return fs.readdirSync(root)
    .filter((name) => /^app.*\.js$/.test(name))
    .sort();
}

function localRootModuleFilesFromRoot() {
  return fs.readdirSync(root)
    .filter((name) => /^app.*\.mjs$/.test(name))
    .sort();
}

function walkJsFiles(relDir) {
  const dir = path.join(root, relDir);
  const out = [];
  function walk(absDir) {
    fs.readdirSync(absDir, { withFileTypes: true }).forEach((entry) => {
      const abs = path.join(absDir, entry.name);
      if (entry.isDirectory()) return walk(abs);
      if (entry.isFile() && entry.name.endsWith(".js")) out.push(path.relative(root, abs));
    });
  }
  walk(dir);
  return out.sort();
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

function jsManifestDomainMap() {
  let parsed;
  try {
    parsed = JSON.parse(files.jsManifest);
  } catch (err) {
    return {};
  }
  return parsed && parsed.domains && typeof parsed.domains === "object" ? parsed.domains : {};
}

function globalDepsManifestData() {
  try {
    return JSON.parse(files.globalDepsManifest);
  } catch (err) {
    return {};
  }
}

function globalDepsWindowBaselineData() {
  try {
    return JSON.parse(files.globalDepsWindowBaseline);
  } catch (err) {
    return {};
  }
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function fileContainsGlobalExport(rel, name) {
  let text;
  try {
    text = read(rel);
  } catch (err) {
    return false;
  }
  const n = escapeRegex(name);
  const patterns = [
    new RegExp("\\bfunction\\s+" + n + "\\s*\\("),
    new RegExp("\\b(?:var|let|const)\\s+" + n + "\\b"),
    new RegExp("\\bwindow\\s*\\.\\s*" + n + "\\s*=(?!=)"),
    new RegExp("\\bwindow\\s*\\[\\s*[\"']" + n + "[\"']\\s*\\]\\s*=(?!=)"),
  ];
  return patterns.some((pattern) => pattern.test(text));
}

function fileContainsGlobalConsumer(rel, name) {
  let text;
  try {
    text = read(rel);
  } catch (err) {
    return false;
  }
  return new RegExp("\\b" + escapeRegex(name) + "\\b").test(text);
}

function manifestGlobalExportKeys() {
  const manifest = globalDepsManifestData();
  const items = manifest && Array.isArray(manifest.globals) ? manifest.globals : [];
  const keys = new Set();
  items.forEach((item) => {
    if (!item || typeof item.name !== "string") return;
    const name = item.name.trim();
    if (!name || !Array.isArray(item.exportedBy)) return;
    item.exportedBy.forEach((file) => {
      if (typeof file === "string" && file.trim()) keys.add(file.trim() + ":" + name);
    });
  });
  return keys;
}

function windowGlobalAssignments() {
  const out = [];
  const candidates = [...new Set([
    ...localAppFilesFromRoot(),
    ...localRootScriptFilesFromIndex(),
    ...jsManifestFiles(),
  ])].sort();
  candidates.forEach((file) => {
    let text;
    try {
      text = read(file);
    } catch (err) {
      return;
    }
    const re = /\bwindow\s*(?:\.\s*([A-Za-z_$][\w$]*)|\[\s*["']([^"']+)["']\s*\])\s*=(?!=)/g;
    let match;
    while ((match = re.exec(text))) {
      const name = String(match[1] || match[2] || "").trim();
      if (!name) continue;
      out.push({ file, name, signature: file + ":" + name });
    }
  });
  return out;
}

function legacyWindowExportBaselineSet() {
  const parsed = globalDepsWindowBaselineData();
  const items = parsed && Array.isArray(parsed.exports) ? parsed.exports : [];
  return new Set(items.filter((item) => typeof item === "string" && item.includes(":")));
}

function indexScriptOrder() {
  return localRootScriptFilesFromIndex();
}

function htmlViewNames() {
  const out = new Set();
  const re = /<[^>]+\bclass=["'][^"']*\bview\b[^"']*["'][^>]*\bdata-view=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = re.exec(files.html))) out.add(match[1]);
  return out;
}

function htmlViewTargets() {
  const out = [];
  const re = /\bdata-view-target=["']([^"']+)["']/gi;
  let match;
  const text = [
    files.html,
    files.chatFragment,
    files.hallOfFameFragment,
    files.profileFragment,
    files.globalModalsAll,
  ].join("\n");
  while ((match = re.exec(text))) out.push(match[1]);
  return out;
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

function cssManifestData() {
  try {
    return JSON.parse(files.cssManifest);
  } catch (err) {
    return {};
  }
}

function cssManifestDomainFiles() {
  const parsed = cssManifestData();
  const domains = parsed && parsed.domains && typeof parsed.domains === "object" ? parsed.domains : {};
  const out = [];
  Object.keys(domains).forEach((name) => {
    const list = Array.isArray(domains[name]) ? domains[name] : [];
    list.forEach((file) => {
      if (/^styles.*\.css$/.test(file)) out.push(file);
    });
  });
  return [...new Set(out)].sort();
}

function localStyleFilesFromRoot() {
  return fs.readdirSync(root)
    .filter((name) => /^styles.*\.css$/.test(name))
    .sort();
}

function dirSizeBytes(dir) {
  let total = 0;
  if (!fs.existsSync(dir)) return 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) total += dirSizeBytes(p);
    else total += fs.statSync(p).size;
  }
  return total;
}

const engineeringBudgets = {
  indexHtmlMaxBytes: 100 * 1024,
  eagerScriptsMax: 159,
  lazyScriptsMax: 25,
  runtimeFiles: {
    "app-pwa-auth-runtime.js": { maxBytes: 76 * 1024, maxLines: 1700 },
    "app-player-crm-runtime.js": { maxBytes: 80 * 1024, maxLines: 1680 },
    "app-home-planner-runtime.js": { maxBytes: 76 * 1024, maxLines: 1780 },
    "lib/api-handlers/chat-runtime.js": { maxBytes: 60 * 1024, maxLines: 1450 },
  },
};

function indexScriptLoadingStats() {
  const stats = { eager: 0, lazy: 0, total: 0 };
  const re = /<script\b([^>]*)\bsrc=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = re.exec(files.html))) {
    const attrs = match[1] || "";
    if (/type=["']application\/poker-lazy["']/i.test(attrs)) stats.lazy += 1;
    else stats.eager += 1;
    stats.total += 1;
  }
  return stats;
}

function fileLineCount(rel) {
  return read(rel).split(/\r?\n/).length;
}

function previewList(items, limit) {
  const head = items.slice(0, limit);
  const rest = items.length - head.length;
  return head.join(", ") + (rest > 0 ? ", +" + rest + " more" : "");
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

add("Profile login button opens visible auth overlay", () =>
  hasAll("client", [
    "function openSharedAccountAuthFlow(opts)",
    "opts && opts.forceOverlay === true",
    "if (forceOverlay || shouldUseOverlayAuthScreen()) openOverlayAuthEntryScreen();",
    "function handleSharedAccountAuthClick(e)",
    "openSharedAccountAuthFlow({ forceOverlay: true });",
    "window.__pokerOpenSharedAccountAuthFlow({ forceOverlay: true });",
  ])
);

add("PWA service worker is versioned", () =>
  has("client", 'var swUrl = "./sw.js"') &&
  has("client", 'getAttribute("data-app-version")') &&
  has("client", "navigator.serviceWorker.register(swUrl")
);

add("PWA saved session restores before empty initData login gate", () =>
  hasAll("client", [
    "function restoreSavedPwaAuthBeforeGate()",
    "var restoredAtStart = restoreSavedPwaAuthBeforeGate();",
    "if (!initData) {",
    "if (restoredAtStart) {",
  ])
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
    './app-pwa-auth-session.js?v=',
    './app-pwa-auth-i18n.js?v=',
    './app-pwa-auth-language-ui.js?v=',
    './app-pwa-auth-telegram-code.js?v=',
    './app-pwa-auth-email-login.js?v=',
    './app-pwa-auth-restore.js?v=',
    './app-pwa-auth-entry-screen.js?v=',
    './app-pwa-auth-mode.js?v=',
    './app-pwa-auth-overlay.js?v=',
    './app-pwa-auth-runtime.js?v=',
    './app-pwa-auth.js?v=',
    './app-pwa-auth-keyboard-lift.js?v=',
  ])
);

add("PWA version bump also cache-busts local CSS and JS assets", () =>
  hasAll("bumpPwaVersion", [
    "data-app-version",
    "(?:href|src)",
    "?v=${next}",
    "styles.css",
    "@import",
  ])
);

add("Local CSS, JS, and split CSS imports use data-app-version cache bust", () => {
  const versionMatch = files.html.match(/data-app-version="([^"]+)"/);
  const version = versionMatch && versionMatch[1];
  if (!version) return false;
  return localAssetVersionsFromIndex().every((asset) => asset.version === version) &&
    localCssImportVersionsFromStyles().every((asset) => asset.version === version);
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
  hasAll("authEmailHandler", [
    "let dtId = existingLinkedDtId",
    "\"mail_pending_\"",
  ]) &&
  !has("authEmailHandler", "existingLinkedDtId || hintedDtId") &&
  hasAll("client", [
    "function switchEmailToPasswordSetup()",
    "emailPasswordSetupHint",
    "function switchTelegramToPasswordSetup()",
    "telegramPasswordSetupHint",
    "data && data.passwordSetupRequired",
  ])
);

add("PWA account auth requests use retrying no-store fetch", () =>
  hasAll("client", [
    "function pokerAuthFetch(url, init)",
    'Object.assign({ cache: "no-store" }',
    "pokerFetchRetry(url, opts",
    'pokerAuthFetch(base + "/api/auth-email"',
    'pokerAuthFetch(base + "/api/auth-pwa-code"',
    'pokerAuthFetch(base + "/api/auth-telegram-login"',
  ]) &&
  !has("client", 'fetch(base + "/api/auth-email"') &&
  !has("client", 'fetch(base + "/api/auth-pwa-code"') &&
  !has("client", 'fetch(base + "/api/auth-telegram-login"')
);

add("Admin push broadcast can choose a click target section", () =>
  hasAll("html", [
    'id="globalModalsFragmentHost"',
    'data-html-fragment="./html-fragments/global-modals.html"',
  ]) &&
  !has("html", 'id="adminPushAllTargetSelect"') &&
  hasAll("globalModalsAdminFragment", [
    'id="adminPushAllTargetSelect"',
    'value="./?startapp=schedule"',
    'value="./?startapp=raffles"',
    'value="./?startapp=spring_rating"',
    'id="adminReportModal"',
    'id="visitorsAdminModal"',
    'id="trackingLinksAdminModal"',
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

add("Chat shell is lazy-loaded from a hydrated HTML fragment", () =>
  hasAll("html", [
    'data-view="chat"',
    'data-html-fragment="./html-fragments/chat.html"',
    'data-html-fragment-view="chat"',
  ]) &&
  !has("html", 'id="chatDialogsView"') &&
  hasAll("chatFragment", [
    'id="chatDialogsView"',
    'id="chatContacts"',
    'id="chatGeneralView"',
    'id="chatPersonalView"',
    'id="chatConvView"',
    'id="chatMessages"',
    'id="chatConvProfileOpenBtn"',
  ]) &&
  hasAll("appChatLifecycle", [
    "function initChat()",
    'document.getElementById("chatDialogsView")',
  ])
);

add("Download HTML is lazy-loaded from a fragment", () =>
  hasAll("html", [
    'data-view="download"',
    'data-html-fragment="./html-fragments/download.html"',
    'data-html-fragment-view="download"',
  ]) &&
  !has("html", 'data-download-page="poker21"') &&
  !has("html", 'class="download-image"') &&
  hasAll("downloadFragment", [
    'data-view="download"',
    'data-html-fragment-view="download"',
    'data-download-page="main"',
    'data-download-page="poker21"',
    'data-download-page="xpoker"',
    'data-download-page="pppoker"',
    'data-download-page="supremapoker"',
  ]) &&
  fs.existsSync(path.join(root, "html-fragments", "download.html"))
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
  hasAll("chatRouteGet", [
    "fastOpen",
    "afterId",
    "afterTime",
  ]) &&
  hasAll("chatRouteGetUpdates", [
    "notModified",
    "contactsPollRev",
  ]) &&
  hasAll("chatRouteGetContacts", [
    "contactsMetaOnly",
  ])
);

add("Chat updates fetch changed bodies without self-hit notModified", () =>
  hasAll("client", [
    "loadGeneral({ skipPoll: true })",
    "loadMessages({ skipPoll: true })",
    "loadContacts({ metaOnly: true, skipPoll: true })",
    "\"&skipPresence=1\"",
    "!opts.skipPoll && typeof window.__pokerGeneralPollRev",
    "!opts.skipPoll && typeof window.__pokerPersonalPollRev",
    "!opts.skipPoll && window.__pokerContactsMetaPollRev",
  ]) &&
  hasAll("chatHandlerRuntime", [
    "Presence changes are intentionally excluded",
    "online-only churn should not wake long-poll",
  ])
);

add("Chat separates presence refresh from message/contact meta delivery", () =>
  hasAll("client", [
    "contactsPresenceOnly=1",
    "loadContacts({ presenceOnly: true })",
    "CHAT_PRESENCE_IDLE_MS",
    "mergeContactsPresencePayload",
    "opts.metaOnly && !opts.includePresence",
  ]) &&
  hasAll("chatHandlerRuntime", [
    "const skipPresence",
    "!skipPresence && idsForOnline.length > 0",
    "if (!skipPresence) row.online",
    "skipPresence ? {} : await buildGeneralChatStatsForContacts",
  ]) &&
  hasAll("chatRouteGetContacts", [
    "contactsPresenceOnly",
    "onlineById",
    "contacts-presence",
  ])
);

add("Chat updates use cheap Redis contact revisions", () =>
  hasAll("chatHandlerRuntime", [
    "CHAT_CONTACTS_UPDATE_REV_HASH",
    "function contactsUpdateRevField",
    "async function bumpContactsUpdateRev",
    "async function getContactsUpdateRev",
    "contacts-rev",
  ]) &&
  hasAll("chatRouteGetUpdates", [
    "getContactsUpdateRev(myId)",
    "const contactsPollRev = contactsSinceRev ?",
  ]) &&
  !has("chatRouteGetUpdates", "buildContactsMetaOnlyPayload") &&
  !has("chatRouteGetUpdates", "computeContactsMetaPollRev") &&
  hasAll("chatRouteGetContacts", [
    "let contactsMetaPollRev = await getContactsUpdateRev(myId)",
    "() => getContactsUpdateRev(myId)",
    "buildContactsMetaOnlyPayload(myId, admin, req)",
  ]) &&
  hasAll("chatRoutePostSend", [
    "await bumpContactsUpdateRev(gMetaPost.members)",
    "await bumpContactsUpdateRev([myId, otherId])",
  ]) &&
  hasAll("chatRoutePostGroups", [
    "await bumpContactsUpdateRev(allMembers)",
    "await bumpContactsUpdateRev(metaAdd.members)",
    "await bumpContactsUpdateRev(curMembersRm)",
  ])
);

add("Chat message payload can use compact usersById metadata", () =>
  hasAll("client", [
    "usersById=1",
    "pokerHydrateChatMessagesFromUsersById",
    "data.usersById",
  ]) &&
  hasAll("chatRouteGetGeneral", [
    "prepareChatMessagesUsersByIdResponse",
    "usersById: preparedMessagesGen.usersById",
    "stripChatMessageUserFields",
  ]) &&
  hasAll("chatRouteGetThread", [
    "prepareChatMessagesUsersByIdResponse",
    "usersById: preparedMessagesG.usersById",
    "usersById: preparedMessagesDm.usersById",
  ])
);

add("Chat API delegates GET and POST route handlers", () =>
  hasAll("chatHandler", [
    'module.exports = require("./chat-runtime")',
  ]) &&
  hasAll("chatHandlerRuntime", [
    'require("../chat-display-label")',
    'require("../chat-profile-status")',
    'require("../chat-route-get")',
    'require("../chat-route-post")',
    "createChatGetHandler(chatRouteDeps)",
    "createChatPostHandler(chatRouteDeps)",
    "GET: handleChatGet",
    "POST: handleChatPost",
  ]) &&
  hasAll("chatRouteGet", [
    'require("./chat-route-get-updates")',
    'require("./chat-route-get-contacts")',
    'require("./chat-route-get-thread")',
    'require("./chat-route-get-club-manage")',
    'require("./chat-route-get-general")',
    "function createChatGetHandler",
    "} = deps;",
    "createChatGetUpdatesHandler(deps)",
    "createChatGetContactsHandler(deps)",
    "createChatGetThreadHandler(deps)",
    "createChatGetClubManageHandler(deps)",
    "createChatGetGeneralHandler(deps)",
    "return async function handleChatGet",
    "module.exports",
  ]) &&
  hasAll("chatRouteGetUpdates", [
    "function createChatGetUpdatesHandler",
    "mode === \"updates\"",
    "contactsPollRev",
    "notModified",
    "module.exports",
  ]) &&
  hasAll("chatRouteGetContacts", [
    "function createChatGetContactsHandler",
    "contactsMetaOnly",
    "contactsFast",
    "generalChatPreview",
    "module.exports",
  ]) &&
  hasAll("chatRouteGetThread", [
    "function createChatGetThreadHandler",
    "isGroupChatId(rawWith)",
    "messagesBare",
    "mode: \"dm\"",
    "module.exports",
  ]) &&
  hasAll("chatRouteGetClubManage", [
    "function createChatGetClubManageHandler",
    "mode !== \"clubChatManage\"",
    "enrichClubUserList",
    "clubChatManage",
    "module.exports",
  ]) &&
  hasAll("chatRouteGetGeneral", [
    "function createChatGetGeneralHandler",
    "mode !== \"general\"",
    "generalPinned",
    "computeGeneralPollRev",
    "mode: \"general\"",
    "module.exports",
  ]) &&
  hasAll("chatRoutePost", [
    'require("./chat-route-post-groups")',
    'require("./chat-route-post-send")',
    "function createChatPostHandler",
    "} = deps;",
    "createChatPostGroupCommandHandler(deps)",
    "createChatPostSendHandler(deps)",
    "return async function handleChatPost",
    "module.exports",
  ]) &&
  hasAll("chatRoutePostGroups", [
    "function createChatPostGroupCommandHandler",
    "postAction === \"creategroup\"",
    "postAction === \"removegroupmember\"",
    "module.exports",
  ]) &&
  hasAll("chatRoutePostSend", [
    'require("./chat-route-post-media")',
    'require("./chat-route-post-notify")',
    "function createChatPostSendHandler",
    "normalizeChatPostMedia(body, myId)",
    "createChatPostNotifyHelpers",
    "post_general",
    "module.exports",
  ]) &&
  hasAll("chatRoutePostMedia", [
    "function normalizeChatPostMedia",
    "tryUploadChatImageDataUrl",
    "data:audio/webm",
    "document.pdf",
    "module.exports",
  ]) &&
  hasAll("chatRoutePostNotify", [
    "function createChatPostNotifyHelpers",
    "notifyChatGroupWebPush",
    "notifyChatDmWebPush",
    "triggerGeneralChatWebPush",
    "module.exports",
  ]) &&
  !has("chatRouteGet", "with (deps)") &&
  !has("chatRouteGetThread", "with (deps)") &&
  !has("chatRouteGetClubManage", "with (deps)") &&
  !has("chatRouteGetGeneral", "with (deps)") &&
  !has("chatRoutePost", "with (deps)") &&
  !has("chatRouteGet", "mode === \"updates\"") &&
  !has("chatRouteGet", "contactsMetaOnly") &&
  !has("chatRouteGet", "isGroupChatId(rawWith)") &&
  !has("chatRouteGet", "mode === \"clubChatManage\"") &&
  !has("chatRouteGet", "mode === \"general\"") &&
  !has("chatRoutePost", "postAction === \"creategroup\"") &&
  !has("chatRoutePost", "post_general") &&
  !has("chatRoutePostSend", "tryUploadChatImageDataUrl(image, myId)") &&
  !has("chatRoutePostSend", "require(\"./chat-webpush-notify\")") &&
  !has("chatHandlerRuntime", "async function handleChatGet") &&
  !has("chatHandlerRuntime", "async function handleChatPost")
);

add("Chat API delegates message mutation actions", () =>
  hasAll("chatHandlerRuntime", [
    'require("../chat-message-actions")',
    "createChatDeleteHandler({",
    "createChatPatchHandler({",
    "DELETE: handleChatDelete",
    "PATCH: handleChatPatch",
  ]) &&
  hasAll("chatMessageActions", [
    "function createChatDeleteHandler",
    "function createChatPatchHandler",
    "resolveMessageCommandThread",
    "action === \"edit\"",
    "action === \"reaction\"",
    "action === \"typing\"",
    "module.exports",
  ]) &&
  !has("chatHandlerRuntime", "async function handleChatDelete") &&
  !has("chatHandlerRuntime", "async function handleChatPatch")
);

add("Shared Redis layer owns pipeline helpers for contract-covered handlers", () =>
  hasAll("redisLib", [
    "function pipeline(commands, options)",
    "function getJson(key, fallback, options)",
    "function setJson(key, value, options)",
    "function hgetall(key, options)",
    "function timeout(promise, ms, context)",
    "function normalizeRedisError(error, context)",
    "AbortController",
    "module.exports",
  ]) &&
  has("accountIdLib", 'require("./redis")') &&
  has("chatHandlerRuntime", 'require("../redis")') &&
  has("rafflesHandler", 'require("../redis")') &&
  has("respectHandler", 'require("../redis")') &&
  has("usersHandler", 'require("../redis")') &&
  !has("accountIdLib", "function redisPipeline") &&
  !has("chatHandlerRuntime", "function redisPipeline") &&
  !has("rafflesHandler", "function redisPipeline") &&
  !has("respectHandler", "function redisPipeline") &&
  !has("usersHandler", "function redisPipeline")
);

add("Shared Redis layer has no local pipeline clones left in project code", () => {
  const filesToCheck = walkJsFiles("lib").concat(walkJsFiles("scripts"))
    .filter((rel) => rel !== "lib/redis.js" && rel !== "scripts/smoke-checks.js" && rel !== "scripts/contract-tests.js");
  return filesToCheck.every((rel) => {
    const text = read(rel);
    return !/async function redisPipeline\b/.test(text) &&
      !/function redisPipeline\b/.test(text) &&
      !/fetch\([^)]*\/pipeline/.test(text);
  });
});

add("Daily raffles have a cron tick entrypoint and QStash schedule", () =>
  hasAll("apiRouter", [
    '"cron-raffles"',
    '"cron-raffles.js"',
  ]) &&
  hasAll("cronRafflesHandler", [
    'require("./raffles")',
    'action: "tick"',
    '"x-cron-secret": CRON_SECRET',
  ]) &&
  hasAll("rafflesHandler", [
    "const QSTASH_TOKEN = process.env.QSTASH_TOKEN",
    "function scheduleDailyRaffleTick(raffle)",
    "CRON_TZ=Europe/Moscow",
    "/api/cron-raffles?seriesId=",
    "const isCronTick = req.method === \"GET\" && actionParam === \"tick\"",
    'mode: "raffles_tick"',
  ])
);

add("Chat sender label hides Telegram login when a name exists", () =>
  has("chatDisplayLabel", "if (nameParts) return nameParts;") &&
  !has("chatDisplayLabel", 'return nameParts + " · " + nickDisplay') &&
  hasAll("chatProfileStatus", [
    "function pokerProfileStatusFromRakeServer",
    "function pokerProfileFeeFromCachedProfile",
    "module.exports",
  ]) &&
  !has("chatHandlerRuntime", "function pokerProfileStatusFromRakeServer") &&
  !has("chatHandlerRuntime", "function buildChatDisplayName")
);

add("Schedule keeps weekly, day and daily tournament order", () =>
  hasAll("html", [
    'data-view="schedule"',
    'data-html-fragment="./html-fragments/schedule.html"',
    'data-html-fragment-view="schedule"',
  ]) &&
  !has("html", 'schedule-section--week-tournament') &&
  hasAll("scheduleFragment", [
    'schedule-section--week-tournament',
    "Нокаут недели</td><td>2 000₽</td><td>R:2 000₽</td><td>300 000₽</td><td>18:00",
    "Турниры дня в 18:00 МСК",
    "<td>Турнир Тракториста</td>",
    "<td>Турнир Стольник</td>",
    "<tr><td>Четверг</td><td>Мистери+</td><td>1 200₽</td><td>R:1 200₽</td><td>220 000₽</td><td>18:00</td></tr>",
    '<tr class="schedule-row--freeroll"><td>Суббота</td><td><span class="schedule-freeroll-name">Фриролл</span></td><td>0₽</td><td>R:400₽ / A:800₽</td><td>200 000₽</td><td>18:00</td></tr>',
    "<tr><td>PKO/MKO</td><td>300₽</td><td>R:300₽</td><td>25 000₽</td><td>17:00</td></tr>",
    "<tr><td>PLO4</td><td>300₽</td><td>—</td><td>10 000₽</td><td>20:00</td></tr>",
  ]) &&
  has("appTournamentDay", 'guarantee: "300 000₽"') &&
  has("appTournamentDay", /buyin:\s*"1 200₽",\s*guarantee:\s*"220 000₽"/) &&
  !has("scheduleFragment", "schedule-section--xpoker-freerolls") &&
  !has("scheduleFragment", "Rebuy (19:00)")
);

add("Player card exposes Poker21, status, stats and actions", () =>
  hasAll("globalModalsChatRatingFragment", [
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
    'data-view="profile"',
    'data-html-fragment="./html-fragments/profile.html"',
    'data-html-fragment-view="profile"',
  ]) &&
  !has("html", 'id="profilePoker21TabBtn"') &&
  hasAll("profileFragment", [
    'id="profilePoker21TabBtn"',
    'id="profilePokerPlusSection"',
    'data-profile-pokerplus-stats-kind="cash"',
    'data-profile-pokerplus-stats-kind="mtt"',
    'data-profile-pokerplus-stats-kind="sng"',
    'data-profile-pokerplus-stats-visible="1"',
    'data-profile-pokerplus-stats-visible="0"',
    'id="profileStatusSection"',
    'id="profileStatusVisual"',
  ]) &&
  hasAll("client", [
    "window.pokerApplyPokerPlusStatsVisible",
    "Отвязать аккаунт Poker21 от профиля?",
    "Обновить",
    "profileStatusVisual",
  ])
);

add("Hall of fame shell is lazy-loaded from a hydrated HTML fragment", () =>
  hasAll("html", [
    'data-view="hall-of-fame"',
    'data-html-fragment="./html-fragments/hall-of-fame.html"',
    'data-html-fragment-view="hall-of-fame"',
  ]) &&
  !has("html", 'id="hallOfFameView"') &&
  hasAll("hallOfFameFragment", [
    'id="hallOfFameView"',
    'data-hall-panel="legends"',
    'data-hall-panel="top2026"',
    'data-hall-fame-share',
  ]) &&
  hasAll("appHallFame", [
    "function initHallOfFamePanelShareButtons()",
    "window.pokerInitHallOfFamePanelShareButtons",
  ]) &&
  has("appHtmlFragments", "pokerInitHallOfFamePanelShareButtons")
);

add("Global admin modal tail is lazy-loaded with re-init hooks", () =>
  hasAll("html", [
    'id="globalModalsFragmentHost"',
    'data-html-fragment="./html-fragments/global-modals.html"',
    '<nav class="bottom-nav"',
    'id="chatNavBtn"',
  ]) &&
  !has("html", 'id="adminReportModal"') &&
  !has("html", 'id="imageLightbox"') &&
  !has("globalModalsFragment", '<nav class="bottom-nav"') &&
  hasAll("globalModalsFragment", [
    'data-global-modal-fragment="./html-fragments/global-modals-media.html"',
    'data-global-modal-fragment="./html-fragments/global-modals-admin.html"',
    'data-global-modal-fragment="./html-fragments/global-modals-home.html"',
    'data-global-modal-fragment="./html-fragments/global-modals-chat-rating.html"',
    'data-global-modal-fragment="./html-fragments/global-modals-access.html"',
  ]) &&
  hasAll("globalModalsAll", [
    'id="adminReportModal"',
    'id="broadcastReportsModal"',
    'id="visitorsAdminModal"',
    'id="shareStatsAdminModal"',
    'id="trackingLinksAdminModal"',
    'id="imageLightbox"',
    'id="partnershipModal"',
  ]) &&
  hasAll("appHtmlFragments", [
    "pokerEnsureGlobalModalsHtml",
    "hydrateGlobalModalSubfragments",
    "data-global-modal-fragment",
    "pokerInitAdminReportModal",
    "pokerInitVisitorsAdminUi",
    "pokerInitImageLightbox",
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
  return localRootScriptFilesFromIndex().concat(localRootModuleFilesFromRoot()).every((file) =>
    fs.existsSync(path.join(root, file)) &&
    fs.existsSync(path.join(publicDir, file))
  );
});

add("ES module bridges keep synchronous globals and build guards", () =>
  hasAll("appVisitorIdModule", [
    "export function createVisitorIdRuntime",
    "export function installVisitorIdGlobal",
    "scope.getVisitorId = getVisitorId",
  ]) &&
  hasAll("appVisitorId", [
    "function createFallbackVisitorIdRuntime",
    'import("./app-visitor-id.module.mjs")',
    "window.pokerVisitorIdReady",
    "window.getVisitorId",
  ]) &&
  hasAll("appPlayerCrmFormattersModule", [
    "export function pokerPlayerCrmEsc",
    "export function installPlayerCrmFormattersGlobal",
    "scope.pokerPlayerCrmEsc",
  ]) &&
  hasAll("appPlayerCrmFormatters", [
    'import("./app-player-crm-formatters.module.mjs")',
    "window.pokerPlayerCrmFormattersReady",
    "scope.pokerPlayerCrmEsc",
  ]) &&
  hasAll("copyToPublic", [
    "localModuleFiles",
    ".mjs",
  ]) &&
  hasAll("checkJsSyntax", [
    "localRootModuleFiles",
    ".mjs",
  ])
);

add("JS manifest covers every app module in the workspace", () => {
  const manifestFiles = jsManifestFiles();
  const appFiles = localAppFilesFromRoot();
  return appFiles.every((file) => manifestFiles.includes(file));
});

add("JS manifest maps core app domains", () =>
  hasAll("jsManifest", [
    '"entrypoint": "index.html"',
    '"auth":',
    '"network":',
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
    '"app-network.js"',
    '"app-shared-helpers.js"',
    '"app-home-init.js"',
    '"app-home-planner-access.js"',
    '"app-home-planner-runtime.js"',
    '"app-home-planner.js"',
    '"app-home-gazette-comments.js"',
    '"app-pwa-auth-i18n.js"',
    '"app-pwa-auth-language-ui.js"',
    '"app-pwa-auth-telegram-code.js"',
    '"app-pwa-auth-email-login.js"',
    '"app-pwa-auth-restore.js"',
    '"app-pwa-auth-entry-screen.js"',
    '"app-pwa-auth-mode.js"',
    '"app-pwa-auth-overlay.js"',
    '"app-pwa-auth-runtime.js"',
    '"app-pwa-auth.js"',
    '"app-pwa-auth-keyboard-lift.js"',
    '"app-profile-hero.js"',
    '"app-profile-user-info.js"',
    '"app-profile-pokerplus.js"',
    '"app-profile-email-auth.js"',
    '"app-profile-friends.js"',
    '"app-profile-avatar-cache.js"',
    '"app-profile-avatar.js"',
    '"app-profile-shows.js"',
    '"app-chat-keyboard-debug.js"',
    '"app-chat-overscroll-debug.js"',
    '"app-chat-lifecycle.js"',
    '"app-html-fragments.js"',
    '"app-webview-keyboard.js"',
    '"app-visitor-id.js"',
    '"app-popstate-recovery.js"',
    '"app-shell-bootstrap.js"',
    '"app-pwa-open-handlers.js"',
    '"app-view-router.js"',
    '"app-auth-debug.js"',
    '"app-tournament-day.js"',
    '"app-player-crm-registrations.js"',
    '"app-player-crm-viewport-shell.js"',
    '"app-player-crm-runtime.js"',
    '"app-player-crm.js"',
  ])
);

add("JS manifest preserves critical load order", () => {
  const order = indexScriptOrder();
  return appearsBefore(order, "app-auth.js", "app-pwa-auth.js") &&
    appearsBefore(order, "app-pwa-auth-session.js", "app-pwa-auth-i18n.js") &&
    appearsBefore(order, "app-pwa-auth-i18n.js", "app-pwa-auth-language-ui.js") &&
    appearsBefore(order, "app-pwa-auth-language-ui.js", "app-pwa-auth-telegram-code.js") &&
    appearsBefore(order, "app-pwa-auth-telegram-code.js", "app-pwa-auth-email-login.js") &&
    appearsBefore(order, "app-pwa-auth-email-login.js", "app-pwa-auth-restore.js") &&
    appearsBefore(order, "app-pwa-auth-restore.js", "app-pwa-auth-entry-screen.js") &&
    appearsBefore(order, "app-pwa-auth-entry-screen.js", "app-pwa-auth-mode.js") &&
    appearsBefore(order, "app-pwa-auth-mode.js", "app-pwa-auth-overlay.js") &&
    appearsBefore(order, "app-pwa-auth-overlay.js", "app-pwa-auth-runtime.js") &&
    appearsBefore(order, "app-pwa-auth-runtime.js", "app-pwa-auth.js") &&
    appearsBefore(order, "app-pwa-auth.js", "app-pwa-auth-keyboard-lift.js") &&
    appearsBefore(order, "app-profile-hero.js", "app-profile-user-info.js") &&
    appearsBefore(order, "app-profile-user-info.js", "app-profile-pokerplus.js") &&
    appearsBefore(order, "app-profile-pokerplus.js", "app-profile-email-auth.js") &&
    appearsBefore(order, "app-profile-email-auth.js", "app-profile-friends.js") &&
    appearsBefore(order, "app-profile-friends.js", "app-profile-avatar-cache.js") &&
    appearsBefore(order, "app-profile-avatar-cache.js", "app-profile-avatar.js") &&
    appearsBefore(order, "app-profile-avatar.js", "app-profile.js") &&
    appearsBefore(order, "app-profile.js", "app-profile-shows.js") &&
    appearsBefore(order, "app-profile-shows.js", "app-pwa-auth-session.js") &&
    appearsBefore(order, "app-auth.js", "app-network.js") &&
    appearsBefore(order, "app-network.js", "app-shared-helpers.js") &&
    appearsBefore(order, "app-shared-helpers.js", "app-home-init.js") &&
    appearsBefore(order, "app-lazy-loader.js", "app-home-planner-access.js") &&
    appearsBefore(order, "app-home-planner-access.js", "app-home-planner-runtime.js") &&
    appearsBefore(order, "app-home-planner-runtime.js", "app-home-planner.js") &&
    appearsBefore(order, "app-home-planner.js", "app-home-tasks.js") &&
    appearsBefore(order, "app-home-tasks.js", "app-home-deeplinks.js") &&
    appearsBefore(order, "app-home-deeplinks.js", "app-home-club-info-modals.js") &&
    appearsBefore(order, "app-home-club-info-modals.js", "app-home-vpn-proxy-modal.js") &&
    appearsBefore(order, "app-home-vpn-proxy-modal.js", "app-home-gazette-comments.js") &&
    appearsBefore(order, "app-home-gazette-comments.js", "app-home-gazette-tasks.js") &&
    appearsBefore(order, "app-home-vpn-proxy-modal.js", "app-home-gazette-tasks.js") &&
    appearsBefore(order, "app-network.js", "app-pwa-auth-runtime.js") &&
    appearsBefore(order, "app-network.js", "app-pwa-auth.js") &&
    appearsBefore(order, "app-navigation-scroll.js", "app-webview-keyboard.js") &&
    appearsBefore(order, "app-navigation-scroll.js", "app-html-fragments.js") &&
    appearsBefore(order, "app-html-fragments.js", "app-view-router.js") &&
    appearsBefore(order, "app-webview-keyboard.js", "app-chat-lifecycle.js") &&
    appearsBefore(order, "app-chat-lifecycle.js", "app-view-router.js") &&
    appearsBefore(order, "app-pwa-open-handlers.js", "app-view-router.js") &&
    appearsBefore(order, "app-view-router.js", "app-popstate-recovery.js") &&
    appearsBefore(order, "app-popstate-recovery.js", "app-visitor-id.js") &&
    appearsBefore(order, "app-visitor-id.js", "app-api-tracking.js") &&
    appearsBefore(order, "app-api-tracking.js", "app-shell-bootstrap.js") &&
    appearsBefore(order, "app-shell-bootstrap.js", "app.js") &&
    appearsBefore(order, "app-view-router.js", "app.js") &&
    appearsBefore(order, "app-network.js", "app-api-tracking.js") &&
    appearsBefore(order, "app-network.js", "app.js") &&
    appearsBefore(order, "app-auth.js", "app-auth-debug.js") &&
    appearsBefore(order, "app-chat-utils.js", "app-chat-render-utils.js") &&
    appearsBefore(order, "app-chat-render-utils.js", "app-chat-message-render-helpers.js") &&
    appearsBefore(order, "app-chat-message-render-helpers.js", "app-chat-message-builders.js") &&
    appearsBefore(order, "app-chat-message-builders.js", "app-chat-message-render-runtime.js") &&
    appearsBefore(order, "app-chat-message-render-runtime.js", "app-chat-media-layout.js") &&
    appearsBefore(order, "app-chat-media-layout.js", "app-chat-outgoing-helpers.js") &&
    appearsBefore(order, "app-chat-open-shell.js", "app-chat-open-peer-hydrate.js") &&
    appearsBefore(order, "app-chat-open-peer-hydrate.js", "app-chat-club-gate.js") &&
    appearsBefore(order, "app-chat-friend-actions.js", "app-chat-contact-swipe-actions.js") &&
    appearsBefore(order, "app-chat-contact-swipe-actions.js", "app-chat-unread.js") &&
    appearsBefore(order, "app-chat-auth-guard.js", "app-chat-bootstrap.js") &&
    appearsBefore(order, "app-chat-bootstrap.js", "app-chat-dialog-actions.js") &&
    appearsBefore(order, "app-chat-dialog-actions.js", "app-chat-dialog-preview.js") &&
    appearsBefore(order, "app-chat-dialog-preview.js", "app-chat-push-open.js") &&
    appearsBefore(order, "app-chat-push-open.js", "app-chat-voice-media.js") &&
    appearsBefore(order, "app-chat-voice-media.js", "app-chat-voice-recording.js") &&
    appearsBefore(order, "app-chat-voice-recording.js", "app-chat-keyboard-overlay.js") &&
    appearsBefore(order, "app-chat-keyboard-overlay.js", "app-chat-scroll-bottom.js") &&
    appearsBefore(order, "app-chat-scroll-bottom.js", "app-chat-composer-core.js") &&
    appearsBefore(order, "app-chat-composer-core.js", "app-chat-composer-send.js") &&
    appearsBefore(order, "app-chat-composer-send.js", "app-chat-presence-typing.js") &&
    appearsBefore(order, "app-chat-presence-typing.js", "app-chat-bootstrap-prefetch.js") &&
    appearsBefore(order, "app-chat-bootstrap-prefetch.js", "app-chat-keyboard-dock-foundation.js") &&
    appearsBefore(order, "app-chat-keyboard-dock-foundation.js", "app-chat-keyboard-dock-lifecycle.js") &&
    appearsBefore(order, "app-chat-keyboard-dock-lifecycle.js", "app-chat-keyboard-dock-composer-layout.js") &&
    appearsBefore(order, "app-chat-keyboard-dock-composer-layout.js", "app-chat-keyboard-dock-viewport-events.js") &&
    appearsBefore(order, "app-chat-keyboard-dock-viewport-events.js", "app-chat-keyboard-dock.js") &&
    appearsBefore(order, "app-chat-keyboard-dock.js", "app-chat-view-glue.js") &&
    appearsBefore(order, "app-chat-view-glue.js", "app-chat-header-avatar.js") &&
    appearsBefore(order, "app-chat-header-avatar.js", "app-chat-attachments.js") &&
    appearsBefore(order, "app-chat-attachments.js", "app-chat-emoji-picker.js") &&
    appearsBefore(order, "app-chat-emoji-picker.js", "app-chat-reply-retry-glue.js") &&
    appearsBefore(order, "app-chat-reply-retry-glue.js", "app-chat-guest-gate.js") &&
    appearsBefore(order, "app-chat-guest-gate.js", "app-chat-keyboard-debug.js") &&
    appearsBefore(order, "app-chat-keyboard-debug.js", "app-chat-overscroll-debug.js") &&
    appearsBefore(order, "app-chat-overscroll-debug.js", "app-chat-lifecycle.js") &&
    appearsBefore(order, "app-rating-core.js", "app-rating-spring-season.js") &&
    appearsBefore(order, "app-rating-spring-season.js", "app-rating-view.js") &&
    appearsBefore(order, "app-rating-view.js", "app-rating-view-adapter.js") &&
    appearsBefore(order, "app-rating-view-adapter.js", "app-rating-spring-runtime.js") &&
    appearsBefore(order, "app-rating-spring-runtime.js", "app-rating.js") &&
    appearsBefore(order, "spring-rating-images-league1.js", "spring-rating-data.js") &&
    appearsBefore(order, "spring-rating-images-league2.js", "spring-rating-data.js") &&
    appearsBefore(order, "spring-rating-meta.js", "spring-rating-data.js") &&
    appearsBefore(order, "spring-rating-data-march.js", "spring-rating-data.js") &&
    appearsBefore(order, "spring-rating-data-april.js", "spring-rating-data.js") &&
    appearsBefore(order, "app-rating-winter-runtime.js", "winter-rating-data.js") &&
    appearsBefore(order, "app-raffles-subscribe.js", "app-raffles.js") &&
    appearsBefore(order, "app-raffles-broadcast.js", "app-raffles.js") &&
    appearsBefore(order, "app-raffles-admin-create.js", "app-raffles.js") &&
    appearsBefore(order, "app-raffles-completed.js", "app-raffles.js") &&
    appearsBefore(order, "app-raffles-public.js", "app-raffles.js") &&
    appearsBefore(order, "app-raffles-active-view.js", "app-raffles.js") &&
    appearsBefore(order, "app-raffles-formatters.js", "app-raffles.js") &&
    appearsBefore(order, "app-raffles.js", "app-raffles-share.js") &&
    appearsBefore(order, "app-player-crm-formatters.js", "app-player-crm-periods.js") &&
    appearsBefore(order, "app-player-crm-periods.js", "app-player-crm-stats.js") &&
    appearsBefore(order, "app-player-crm-stats.js", "app-player-crm-charts.js") &&
    appearsBefore(order, "app-player-crm-charts.js", "app-player-crm-reports.js") &&
    appearsBefore(order, "app-player-crm-reports.js", "app-player-crm-registrations.js") &&
    appearsBefore(order, "app-player-crm-registrations.js", "app-player-crm-viewport-shell.js") &&
    appearsBefore(order, "app-player-crm-viewport-shell.js", "app-player-crm-runtime.js") &&
    appearsBefore(order, "app-player-crm-runtime.js", "app-player-crm.js") &&
    appearsBefore(order, "app.js", "app-section-views.js") &&
    appearsBefore(order, "app-visitors-admin.js", "app-admin-reports.js") &&
    appearsBefore(order, "app-admin-reports.js", "app-auth-debug.js");
});

add("PWA auth shell delegates language, code, email, restore, and keyboard modules", () =>
  hasAll("appPwaAuthLanguageUi", [
    "function pokerInitPwaAuthLanguageUi",
    "window.pokerInitPwaAuthLanguageUi",
    "function syncGlobalAppLanguageUi",
  ]) &&
  hasAll("appPwaAuthTelegramCode", [
    "function pokerMountPwaUsernameCodeLogin",
    "window.pokerMountPwaUsernameCodeLogin",
    'base + "/api/auth-pwa-code"',
  ]) &&
  hasAll("appPwaAuthEmailLogin", [
    "function pokerMountPwaEmailLogin",
    "window.pokerMountPwaEmailLogin",
    'base + "/api/auth-email"',
  ]) &&
  hasAll("appPwaAuthKeyboardLift", [
    "initPwaAuthVisualViewportLift",
    "--pwa-auth-vv-inset",
  ]) &&
  hasAll("appPwaAuthRestore", [
    "function initPwaAuthRestoreRuntime",
    "restoreSavedPwaAuthBeforeGate",
    "attemptPwaSideAuthRestoreAsync",
  ]) &&
  hasAll("appPwaAuthEntryScreen", [
    "function initPwaAuthEntryScreenRuntime",
    "function mountPwaStandaloneEnterButton",
    "function showPwaStandaloneEntryScreen",
  ]) &&
  hasAll("appPwaAuthRuntime", [
    "window.pokerInitPwaAuthLanguageUi",
    "window.pokerMountPwaUsernameCodeLogin",
    "window.pokerMountPwaEmailLogin",
    "initPwaAuthRestoreRuntime",
    "initPwaAuthEntryScreenRuntime",
  ]) &&
  hasAll("appPwaAuth", [
    "PWA auth entrypoint",
    "Runtime lives in app-pwa-auth-runtime.js",
  ]) &&
  !has("appPwaAuthRuntime", "function pokerMountPwaEmailLogin") &&
  !has("appPwaAuthRuntime", "function pokerMountPwaUsernameCodeLogin") &&
  !has("appPwaAuthRuntime", "function initPwaAuthVisualViewportLift")
);

add("Large domain entrypoints stay thin after runtime split", () =>
  hasAll("appHomePlanner", [
    "Home planner entrypoint",
    "app-home-planner-runtime.js",
  ]) &&
  hasAll("appHomePlannerRuntime", [
    "function pokerInitHomePlanner",
    "window.pokerOpenRomanTaskPlanner",
  ]) &&
  hasAll("appHomePlannerAccess", [
    "function initHomePlannerAccessRuntime",
    "plannerStorageKey",
    "isPlannerAllowedUser",
  ]) &&
  !has("appHomePlannerRuntime", "function plannerStorageKey") &&
  hasAll("appPwaAuth", [
    "PWA auth entrypoint",
    "app-pwa-auth-runtime.js",
  ]) &&
  hasAll("appPwaAuthMode", [
    "function initPwaAuthModeRuntime",
    "getTelegramWebAppNow",
    "shouldUseOverlayAuthScreen",
  ]) &&
  hasAll("appPwaAuthOverlay", [
    "function initPwaAuthOverlayRuntime",
    "openOverlayAuthEntryScreen",
    "rerenderCurrentPwaAuthScreen",
  ]) &&
  hasAll("appPwaAuthRuntime", [
    "initPwaAuthModeRuntime",
    "initPwaAuthOverlayRuntime",
    "window.__pokerTelegramAuth",
  ]) &&
  !has("appPwaAuthRuntime", "function showPwaAuthScreen") &&
  hasAll("appPlayerCrm", [
    "Player CRM entrypoint",
    "app-player-crm-runtime.js",
  ]) &&
  hasAll("appPlayerCrmRegistrations", [
    "function initPlayerCrmRegistrationsRuntime",
    "registrationRowsByMethod",
    "exportRegistrationModalRows",
  ]) &&
  hasAll("appPlayerCrmViewportShell", [
    "function initPlayerCrmViewportShellRuntime",
    "stableViewportHeight",
    "window.pokerGetStablePlayerCrmViewportHeight",
    "window.screen && window.screen.height",
    "syncCrmViewportShell",
    "window.__pokerPlayerCrmStandaloneOpen",
    "pokerSyncPlayerCrmStandaloneLayout",
    'root.style.setProperty("z-index", "2147483000", "important")',
    'section.style.setProperty("position", "absolute", "important")',
    'section.style.setProperty("top", "max(74px',
  ]) &&
  hasAll("appViewRouter", [
    "function pokerGetStablePlayerCrmViewportHeight",
    "function pokerApplyPlayerCrmStandaloneLayout",
    "function pokerSchedulePlayerCrmViewportSync",
    "function pokerInstallPlayerCrmBlackScreenRescue",
    "function pokerFinalizePlayerCrmDirectOpen",
    "function pokerClosePlayerCrmStandalone",
    "function pokerOpenPlayerCrmFromHome",
    "window.pokerClosePlayerCrmStandalone",
    "player-crm-standalone",
    "window.__pokerPlayerCrmStandaloneOpen",
    "pokerWarmPlayerCrmScripts",
    "pokerOpenPlayerCrmFromHome();",
    '[data-crm-open="player-crm"]',
    '[data-crm-close="player-crm"]',
  ]) &&
  !has("appViewRouter", 'setView("player-crm", { htmlReady: true, scriptsReady: true })') &&
  !has("appViewRouter", "scriptsReady.then(activateCrmNow)") &&
  hasAll("html", [
    'data-crm-open="player-crm"',
  ]) &&
  hasAll("playerCrmFragment", [
    'data-crm-close="player-crm"',
    "Загрузка дашборда…",
    "График загрузится после открытия дашборда.",
  ]) &&
  hasAll("appPlayerCrmRuntime", [
    "function pokerInitPlayerCrm",
    "window.pokerInitPlayerCrm",
  ]) &&
  !has("appPlayerCrmRuntime", "function registrationRowsByMethod") &&
  !has("appPlayerCrmRuntime", "function syncCrmViewportShell") &&
  hasAll("chatHandler", [
    'module.exports = require("./chat-runtime")',
  ]) &&
  hasAll("chatReadReceipts", [
    "function createChatReadReceiptHelpers",
    "bumpSeenCursor",
    "applyPeerReadReceiptsToMyMessages",
  ]) &&
  hasAll("chatProfileLookups", [
    "function createChatProfileLookupHelpers",
    "getPokerProfileStatusMeta",
    "getAvatars",
  ]) &&
  hasAll("chatHandlerRuntime", [
    'require("../chat-read-receipts")',
    'require("../chat-profile-lookups")',
    "const chatRouteDeps =",
    "dispatchChatRoute(chatRequest",
  ]) &&
  !has("chatHandlerRuntime", "async function getAvatars") &&
  !has("chatHandlerRuntime", "function seenCursorField")
);

add("Global dependency manifest covers exported browser globals", () => {
  const manifest = globalDepsManifestData();
  const items = manifest && Array.isArray(manifest.globals) ? manifest.globals : [];
  const seen = new Set();
  return manifest.entrypoint === "index.html" &&
    items.length >= 10 &&
    items.every((item) => {
      if (!item || typeof item !== "object") return false;
      const name = typeof item.name === "string" ? item.name.trim() : "";
      const domain = typeof item.domain === "string" ? item.domain.trim() : "";
      const exportedBy = Array.isArray(item.exportedBy) ? item.exportedBy : [];
      const consumedBy = Array.isArray(item.consumedBy) ? item.consumedBy : [];
      if (!name || !domain || seen.has(domain + ":" + name)) return false;
      seen.add(domain + ":" + name);
      if (!exportedBy.length || !consumedBy.length) return false;
      if (!exportedBy.every((file) => fs.existsSync(path.join(root, file)))) return false;
      if (!consumedBy.every((file) => fs.existsSync(path.join(root, file)))) return false;
      if (!exportedBy.some((file) => fileContainsGlobalExport(file, name))) return false;
      return consumedBy.every((file) => fileContainsGlobalConsumer(file, name));
    });
});

add("New direct window globals are declared in the global dependency manifest", () => {
  const manifestExports = manifestGlobalExportKeys();
  const legacyExports = legacyWindowExportBaselineSet();
  const unmanifested = windowGlobalAssignments()
    .filter((item) => !manifestExports.has(item.signature));
  const missing = unmanifested
    .filter((item) => !legacyExports.has(item.signature))
    .map((item) => item.signature);
  if (missing.length) throw new Error(previewList(missing, 8));
  return true;
});

add("Index loading stays within the static script budget", () => {
  const stats = indexScriptLoadingStats();
  const indexBytes = Buffer.byteLength(files.html, "utf8");
  const failures = [];
  if (indexBytes > engineeringBudgets.indexHtmlMaxBytes) {
    failures.push("index.html " + indexBytes + "/" + engineeringBudgets.indexHtmlMaxBytes + " bytes");
  }
  if (stats.eager > engineeringBudgets.eagerScriptsMax) {
    failures.push("eager scripts " + stats.eager + "/" + engineeringBudgets.eagerScriptsMax);
  }
  if (stats.lazy > engineeringBudgets.lazyScriptsMax) {
    failures.push("lazy scripts " + stats.lazy + "/" + engineeringBudgets.lazyScriptsMax);
  }
  if (failures.length) throw new Error(failures.join("; "));
  return true;
});

add("Large runtime files stay within split budgets", () => {
  const failures = [];
  Object.keys(engineeringBudgets.runtimeFiles).forEach((file) => {
    const budget = engineeringBudgets.runtimeFiles[file];
    const abs = path.join(root, file);
    if (!fs.existsSync(abs)) {
      failures.push(file + " missing");
      return;
    }
    const bytes = fs.statSync(abs).size;
    const lines = fileLineCount(file);
    if (bytes > budget.maxBytes) failures.push(file + " " + bytes + "/" + budget.maxBytes + " bytes");
    if (lines > budget.maxLines) failures.push(file + " " + lines + "/" + budget.maxLines + " lines");
  });
  if (failures.length) throw new Error(failures.join("; "));
  return true;
});

add("Network helpers stay isolated from the app monolith", () =>
  hasAll("appNetwork", [
    "var POKER_NET_ERR",
    "var POKER_FETCH_TIMEOUT_MS",
    "function pokerFetchWithTimeout",
    "function pokerFetchRetry",
  ]) &&
  !has("app", "function pokerFetchWithTimeout") &&
  !has("app", "function pokerFetchRetry") &&
    !has("app", "var POKER_FETCH_TIMEOUT_MS")
);

add("App monolith delegates shared helpers, home init, and PWA install", () =>
  hasAll("appSharedHelpers", [
    "function pokerAutosizeTextarea",
    "function pokerTryBootOverlayNetworkError",
    "function pokerRememberTransportMemberIdFromEnvironment",
  ]) &&
  hasAll("appVisitorId", [
    "function getVisitorId",
    "poker_visitor_id",
    "__pokerTelegramAuth",
  ]) &&
  hasAll("appPopstateRecovery", [
    'window.addEventListener("popstate"',
    "pokerClearBodyDocumentScrollLockInline",
  ]) &&
  hasAll("appShellBootstrap", [
    "function tryInitWinterRatingLightboxEarly",
    "function pokerRunShellReadyBootstrap",
    "runGazetteAndTasksInit",
    "updateSpringRatingPromoDateFromVar",
    "updateVisitorCounter",
    "initChat",
    "initPokerShowsPlayer",
  ]) &&
  hasAll("appHomeInit", [
    "initTheme",
    "initRadioToggle",
    "function updateRaffleBadge",
    "pokerTasksStartBtn",
  ]) &&
  hasAll("appPwaOpenHandlers", [
    "initPwaInstall",
    "beforeinstallprompt",
    "getAppBaseUrlForLinks",
  ]) &&
  hasAll("appPwaOpenHandlers", [
    "poker-telegram-auth",
    "__pendingOpenChatPersonalFromDeepLink",
    "visibilitychange",
    "__pokerRefreshChatUnreadForPwaBadge",
  ]) &&
  !has("app", "function pokerAutosizeTextarea") &&
  !has("app", "function pokerTryBootOverlayNetworkError") &&
  !has("app", "function updateRaffleBadge") &&
  !has("app", "function getVisitorId") &&
  !has("app", "function tryInitWinterRatingLightboxEarly") &&
  !has("app", "popstate") &&
  !has("app", "runGazetteAndTasksInit") &&
  !has("app", "beforeinstallprompt") &&
  !has("app", "poker-telegram-auth") &&
  !has("app", "__pendingOpenChatPersonalFromDeepLink")
);

add("Home gazette delegates Roman task planner", () =>
  hasAll("appHomePlannerRuntime", [
    "function pokerInitHomePlanner",
    "function initRomanGazetteTaskPlanner",
    "window.pokerInitRomanGazetteTaskPlanner",
    "window.pokerOpenRomanTaskPlanner",
  ]) &&
  hasAll("appHomePlanner", [
    "Home planner entrypoint",
    "Runtime lives in app-home-planner-runtime.js",
  ]) &&
  hasAll("appHomeGazetteTasks", [
    "function runGazetteAndTasksInit",
    "pokerInitHomePlanner",
    "pokerInitHomeTasks",
  ]) &&
  !has("appHomeGazetteTasks", "function initRomanGazetteTaskPlanner") &&
  !has("appHomePlannerRuntime", "function initGazetteModal")
);

add("Home gazette delegates deep-link glue", () =>
  hasAll("appHomeDeepLinks", [
    "function pokerInitHomeDeepLinks",
    "function pokerApplyStartAppDeepLink",
    "pokerReadTelegramLaunchStartParam",
    "club_chat_dm",
  ]) &&
  hasAll("appHomeGazetteTasks", [
    "pokerInitHomeDeepLinks",
    "openGazette: openGazette",
    "initHomeClubInfoModals",
  ]) &&
  !has("appHomeGazetteTasks", "function pokerApplyStartAppDeepLink") &&
  !has("appHomeDeepLinks", "function initGazetteModal")
);

add("Home gazette delegates task widgets", () =>
  hasAll("appHomeTasks", [
    "function pokerInitHomeTasks",
    "function initPartnershipModal",
    "function calculateMttScore",
    "function setRatingSubscribeButtonState",
    "pokerTasksStartBound",
    "pokerTasksChallengeBound",
    "ratingSubscribeBound",
  ]) &&
  has("appViewRouter", 'if (typeof window.pokerInitHomeTasks === "function") window.pokerInitHomeTasks();') &&
  hasAll("appHomeGazetteTasks", [
    "pokerInitHomeTasks",
    "initHomeClubInfoModals",
  ]) &&
  !has("appHomeGazetteTasks", "function calculateMttScore") &&
  !has("appHomeTasks", "function initGazetteModal")
);

add("Home gazette delegates club info and VPN/proxy modals", () =>
  hasAll("appHomeGazetteTasks", [
    "function runGazetteAndTasksInit",
    "initHomeClubInfoModals",
    "initHomeVpnProxyModal",
    "pokerBuildGazetteCommentItemHtml",
  ]) &&
  hasAll("appHomeClubInfoModals", [
    "function initHomeClubInfoModals",
    "function initClubCharterModal",
    "function initClubWelcomeModal",
    "openClubCharterModal",
  ]) &&
  hasAll("appHomeVpnProxyModal", [
    "function initHomeVpnProxyModal",
    "function initVpnProxyModal",
    "__pokerVpnProxyReloadCommentFeed",
    "openVpnProxyModal",
  ]) &&
  !has("appHomeGazetteTasks", "function initClubCharterModal") &&
  !has("appHomeGazetteTasks", "function initVpnProxyModal")
);

add("Raffles delegates public, admin, completed, broadcast, subscribe, and share runtimes", () =>
  hasAll("appRaffles", [
    "function initRaffles",
    "initRafflesSubscribeRuntime",
    "initRafflesBroadcastRuntime",
    "initRafflesAdminCreateRuntime",
    "initRafflesCompletedRuntime",
    "initRafflesPublicRuntime",
    "initRafflesActiveViewRuntime",
    "function renderRaffle",
    "function loadRaffles",
  ]) &&
  hasAll("appRafflesSubscribe", [
    "function initRafflesSubscribeRuntime",
    "raffle-subscribe",
    "poker_raffles_subscribed",
  ]) &&
  hasAll("appRafflesBroadcast", [
    "function initRafflesBroadcastRuntime",
    "raffle-manual-subscribers",
    "initRafflesRetryFailedBroadcast",
    "initRafflesPurgeBlockedSubscribers",
  ]) &&
  hasAll("appRafflesAdminCreate", [
    "function initRafflesAdminCreateRuntime",
    "function getRaffleCreateType",
    "action: \"create\"",
    "action: \"duplicateLast\"",
  ]) &&
  hasAll("appRafflesCompleted", [
    "function initRafflesCompletedRuntime",
    "function renderCompletedRafflesPanel",
    "function setRaffleWinnerStatus",
    'raffle-winner-ready-badge--issued',
    'raffle-winner-row--ready',
    'raffle-winner-row--issued',
    "Выдано",
    "raffle-completed-card__delete-btn",
  ]) &&
  hasAll("stylesRatingRaffles", [
    ".raffle-winner-row--ready",
    ".raffle-winner-row--issued",
    ".raffle-winner-ready-badge--issued",
  ]) &&
  hasAll("appRafflesPublic", [
    "function initRafflesPublicRuntime",
    "function parseRaffleApiResponse",
    "action: \"join\"",
    "action: \"leave\"",
  ]) &&
  hasAll("appRafflesActiveView", [
    "function initRafflesActiveViewRuntime",
    "function renderRaffle",
    "raffleParticipantsChance",
    "raffleWinnersWrap",
  ]) &&
  hasAll("appRafflesShare", [
    "initRafflesHeroShare",
    "rafflesDeepLink",
    "raffle_hero",
  ]) &&
  !has("appRaffles", "function initRafflesSubscribe") &&
  !has("appRaffles", "function raffleManualSubscribersParseResponse") &&
  !has("appRaffles", "function getRaffleCreateType") &&
  !has("appRaffles", "function parseRaffleApiResponse") &&
  !has("appRaffles", "function setRaffleWinnerStatus") &&
  !has("appRaffles", "raffleWinnersWrap.classList.remove") &&
  !has("appRaffles", "initRafflesHeroShare")
);

add("App monolith delegates chat lifecycle, webview keyboard, and view router", () =>
  hasAll("appChatLifecycle", [
    "function initChat()",
    "initChatPushOpenHandlers",
    "initChatVoiceMedia",
    "initChatScrollBottom",
    "initChatComposerCore",
    "initChatPresenceTyping",
    "initChatKeyboardOverlay",
    "initChatKeyboardDockRuntime",
    "initChatHeaderAvatarRuntime",
    "initChatAttachmentsRuntime",
    "initChatBootstrapPrefetchRuntime",
    "initChatEmojiPickerRuntime",
    "initChatReplyRetryGlue",
    "initChatGuestGateRuntime",
    "initChatOpenPeerHydrate",
    "initChatContactSwipeActions",
    "initChatDialogPreviewRuntime",
    "initChatComposerSendRuntime",
    "initChatVoiceRecordingRuntime",
    "initChatMediaLayoutRuntime",
    "initChatOverscrollDebugRuntime",
  ]) &&
  hasAll("appChatOpenPeerHydrate", [
    "function initChatOpenPeerHydrate",
    "function hydrateOpenDmHeaderFromContactsLocal",
    "function scheduleDmHeaderHydrateLocal",
  ]) &&
  hasAll("appChatContactSwipeActions", [
    "function initChatContactSwipeActions",
    "chat-contact-swipe__pin",
    "chat-contact-swipe__friend--remove",
  ]) &&
  hasAll("appChatDialogPreview", [
    "function initChatDialogPreviewRuntime",
    "function renderDialogPreviewMessagesInto",
    "chatDialogPreviewOpenBtn",
  ]) &&
  hasAll("appChatVoiceMedia", [
    "function initChatVoiceMedia",
    "function pokerNormalizeVoiceDataUrl",
    "function chatVoiceMessageHtml",
    "function appendChatVoiceToTextWrap",
    "__pokerChatVoiceRateUiBound",
  ]) &&
  hasAll("appChatScrollBottom", [
    "function initChatScrollBottom",
    "function chatMessagesNearBottom",
    "function scheduleChatKeyboardBottomFollow",
    "__pokerScheduleSyncChatScrollBottomButtons",
  ]) &&
  hasAll("appChatComposerCore", [
    "function initChatComposerCore",
    "function flushChatComposerToDrafts",
    "function mountChatComposer",
    "function setGeneralSendBusy",
  ]) &&
  hasAll("appChatComposerSend", [
    "function initChatComposerSendRuntime",
    "function bindChatSendTap",
    "function bindChatComposerInputEvents",
    "function updateGeneralSendBtnIcon",
  ]) &&
  hasAll("appChatVoiceRecording", [
    "function initChatVoiceRecordingRuntime",
    "MediaRecorder",
    "chatGeneralVoiceStop",
    "chatPersonalVoiceStop",
  ]) &&
  hasAll("appChatMediaLayout", [
    "function initChatMediaLayoutRuntime",
    "function resizeImage",
    "function settleChatOpeningMediaLayout",
    "function pinChatMessagesToBottom",
  ]) &&
  hasAll("appChatPresenceTyping", [
    "function initChatPresenceTyping",
    "function pokerChatSendTypingState",
    "function pokerUpdateChatDmFocusFromUiState",
    "__pokerStopChatDmFocusSession",
  ]) &&
  hasAll("appChatKeyboardOverlay", [
    "function initChatKeyboardOverlay",
    "function openTelegramIosComposeOverlay",
    "function shouldUseTelegramIosComposeOverlay",
  ]) &&
  hasAll("appChatKeyboardDock", [
    "function initChatKeyboardDockRuntime",
    "initChatKeyboardDockFoundation",
    "initChatKeyboardDockLifecycle",
    "initChatKeyboardDockComposerLayout",
    "initChatKeyboardDockViewportEvents",
  ]) &&
  hasAll("appChatKeyboardDockFoundation", [
    "function initChatKeyboardDockFoundation",
    "__pokerKeepChatComposerFocusAfterSend",
    "__pokerFinalizeChatKeyboardDismiss",
  ]) &&
  hasAll("appChatKeyboardDockLifecycle", [
    "function initChatKeyboardDockLifecycle",
    "__pokerIosPwaChatThreadLifecycleDockBound",
    "__pokerIosPwaChatThreadDismissPointerBound",
  ]) &&
  hasAll("appChatKeyboardDockComposerLayout", [
    "function initChatKeyboardDockComposerLayout",
    "__pokerChatThreadDockBottomCssPx",
    "__pokerChatTmaThreadFocusSession",
  ]) &&
  hasAll("appChatKeyboardDockViewportEvents", [
    "function initChatKeyboardDockViewportEvents",
    "__pokerActivateChatKeyboardViewport",
    "function isChatKeyboardLayoutEffectivelyClosed",
  ]) &&
  hasAll("appChatViewGlue", [
    "function initChatViewGlue",
    "window.chatRefresh",
    "chatConvProfileOpenBtn",
    "findByIdAndOpen",
  ]) &&
  hasAll("appChatHeaderAvatar", [
    "function initChatHeaderAvatarRuntime",
    "function updateChatHeaderStats",
    "function applyConvPeerAvatarHeader",
    "function clearConvPeerAvatarHeader",
  ]) &&
  hasAll("appChatAttachments", [
    "function initChatAttachmentsRuntime",
    "chatGeneralFileInput",
    "chatPersonalFileInput",
    "closePersonalAttachDropdown",
  ]) &&
  hasAll("appChatBootstrapPrefetch", [
    "function initChatBootstrapPrefetchRuntime",
    "function pokerPrefetchDiskPeersWarmup",
    "function scheduleChatBootstrapFetch",
    "__pokerScheduleChatBootstrapFetch",
  ]) &&
  hasAll("appChatEmojiPicker", [
    "function initChatEmojiPickerRuntime",
    "var CHAT_EMOJIS",
    "function hideChatEmojiPicker",
    "function insertEmojiAtCursor",
  ]) &&
  hasAll("appChatReplyRetryGlue", [
    "function initChatReplyRetryGlue",
    "chatGeneralReplyPreview",
    "chatPersonalReplyPreview",
    "data-chat-retry",
  ]) &&
  hasAll("appChatGuestGate", [
    "function initChatGuestGateRuntime",
    "function syncChatWebsiteGuestGate",
    "function bindGuestAuthButton",
  ]) &&
  hasAll("appChatKeyboardDebug", [
    "function initChatKeyboardDebugRuntime",
    "function getChatKeyboardDebugSnapshot",
    "function installChatKeyboardDebugObservers",
  ]) &&
  hasAll("appChatOverscrollDebug", [
    "function initChatOverscrollDebugRuntime",
    "function pokerDebugChatOverscroll",
    "function collectChatOverscrollSnapshot",
  ]) &&
  hasAll("appChatPushOpen", [
    "window.__pokerRefreshChatUnreadForPwaBadge",
    "window.__pokerHandleIncomingChatPush",
  ]) &&
  hasAll("appWebviewKeyboard", [
    "var telegramIosKeyboardRootLockActive",
    "function setTelegramIosKeyboardRootLock",
    "(function initKeyboardLab()",
  ]) &&
  hasAll("appViewRouter", [
    "function setView(viewName, navOpts)",
    "function pokerGetViewNodes()",
    "function pokerOpenChatFromTab",
    "function handleViewLinkClick",
  ]) &&
  !has("app", "function initChat()") &&
  !has("appChatLifecycle", "function chatVoiceMessageHtml") &&
  !has("appChatLifecycle", "function chatMessagesNearBottom") &&
  !has("appChatLifecycle", "function flushChatComposerToDrafts") &&
  !has("appChatLifecycle", "function pokerChatSendTypingState") &&
  !has("appChatLifecycle", "function isChatKeyboardLayoutEffectivelyClosed") &&
  !has("appChatLifecycle", "function applyConvPeerAvatarHeader") &&
  !has("appChatLifecycle", "var generalFileInput") &&
  !has("appChatLifecycle", "var personalFileInput") &&
  !has("appChatLifecycle", "var CHAT_EMOJIS") &&
  !has("appChatLifecycle", "var generalReplyCancel") &&
  !has("appChatLifecycle", "function findChatContactByPeerIdLocal") &&
  !has("appChatLifecycle", "function bindChatContactSwipeAndPinList") &&
  !has("appChatLifecycle", "function renderDialogPreviewMessagesInto") &&
  !has("appChatLifecycle", "function bindChatSendTap") &&
  !has("appChatLifecycle", "function isWebsiteGuestChatGateMode") &&
  !has("appChatLifecycle", "function getChatKeyboardDebugSnapshot") &&
  !has("appChatLifecycle", "function initVoiceRecording") &&
  !has("appChatKeyboardDock", "window.__pokerKeepChatComposerFocusAfterSend") &&
  !has("appChatKeyboardDock", "function isChatKeyboardLayoutEffectivelyClosed") &&
  !has("appChatLifecycle", "window.chatRefresh = function") &&
  !has("app", "function setView(viewName, navOpts)") &&
  !has("app", "var telegramIosKeyboardRootLockActive")
);

add("Heavy video lessons HTML is lazy-loaded from a fragment", () =>
  hasAll("html", [
    'data-view="video-lessons"',
    'data-html-fragment="./html-fragments/video-lessons.html"',
  ]) &&
  !has("html", 'id="videoLessonsList"') &&
  hasAll("appHtmlFragments", [
    "window.pokerEnsureViewHtml",
    "data-html-fragment",
    "pokerInitVideoLessonsModals",
  ]) &&
  hasAll("appViewRouter", [
    "pokerEnsureViewHtml(htmlViewName)",
    "nextOpts.htmlReady = true",
  ]) &&
  fs.existsSync(path.join(root, "html-fragments", "video-lessons.html"))
);

add("Equilator HTML is lazy-loaded from a fragment", () =>
  hasAll("html", [
    'data-view="equilator"',
    'data-html-fragment="./html-fragments/equilator.html"',
  ]) &&
  !has("html", 'id="equilatorCalcBtn"') &&
  hasAll("appViewRouter", [
    "pokerEnsureViewHtml(htmlViewName)",
    "if (viewName === \"equilator\") initEquilator();",
  ]) &&
  fs.existsSync(path.join(root, "html-fragments", "equilator.html"))
);

add("Raffles HTML is lazy-loaded from a fragment", () =>
  hasAll("html", [
    'data-view="raffles"',
    'data-html-fragment="./html-fragments/raffles.html"',
    'data-html-fragment-view="raffles"',
  ]) &&
  !has("html", 'id="rafflesAdminWrap"') &&
  !has("html", 'id="raffleCreateForm"') &&
  hasAll("rafflesFragment", [
    'data-view="raffles"',
    'data-html-fragment-view="raffles"',
    'id="rafflesAdminWrap"',
    'id="raffleCreateForm"',
    'id="rafflesTabs"',
    'id="raffleCurrent"',
    'id="raffleWinnerLeadersModal"',
  ]) &&
  fs.existsSync(path.join(root, "html-fragments", "raffles.html"))
);

add("Secondary utility views are lazy-loaded from HTML fragments", () =>
  hasAll("html", [
    'data-view="bonus-game" data-html-fragment="./html-fragments/bonus-game.html" data-html-fragment-view="bonus-game"',
    'data-view="cooler-game" data-html-fragment="./html-fragments/cooler-game.html" data-html-fragment-view="cooler-game"',
    'data-view="plasterer-game" data-html-fragment="./html-fragments/plasterer-game.html" data-html-fragment-view="plasterer-game"',
    'data-view="learn-play-hub" data-html-fragment="./html-fragments/learn-play-hub.html" data-html-fragment-view="learn-play-hub"',
    'data-view="poker-tasks" data-html-fragment="./html-fragments/poker-tasks.html" data-html-fragment-view="poker-tasks"',
    'data-view="cashout" data-html-fragment="./html-fragments/cashout.html" data-html-fragment-view="cashout"',
    'data-view="streams" data-html-fragment="./html-fragments/streams.html" data-html-fragment-view="streams"',
    'data-view="schedule" data-html-fragment="./html-fragments/schedule.html" data-html-fragment-view="schedule"',
  ]) &&
  !has("html", 'id="bonusGameCards"') &&
  !has("html", 'id="coolerGameCards"') &&
  !has("html", 'id="plastererBoard"') &&
  !has("html", 'id="learnPlayHubInviteFriendBtn"') &&
  !has("html", 'id="pokerTasksStartBtn"') &&
  !has("html", 'class="cashout-manager-block"') &&
  !has("html", 'id="streamsStartBtn"') &&
  !has("html", 'schedule-section--week-tournament') &&
  hasAll("bonusGameFragment", ['id="bonusGameCards"', 'data-view="bonus-game"']) &&
  hasAll("coolerGameFragment", ['id="coolerGameCards"', 'data-view="cooler-game"']) &&
  hasAll("plastererGameFragment", ['id="plastererBoard"', 'data-view="plasterer-game"']) &&
  hasAll("learnPlayHubFragment", ['id="learnPlayHubInviteFriendBtn"', 'data-view="learn-play-hub"']) &&
  hasAll("pokerTasksFragment", ['id="pokerTasksStartBtn"', 'data-view="poker-tasks"']) &&
  hasAll("cashoutFragment", ['class="cashout-manager-block"', 'data-view="cashout"']) &&
  hasAll("streamsFragment", ['id="streamsStartBtn"', 'data-view="streams"']) &&
  hasAll("scheduleFragment", ['schedule-section--week-tournament', 'data-view="schedule"']) &&
  fs.existsSync(path.join(root, "html-fragments", "bonus-game.html")) &&
  fs.existsSync(path.join(root, "html-fragments", "cooler-game.html")) &&
  fs.existsSync(path.join(root, "html-fragments", "plasterer-game.html")) &&
  fs.existsSync(path.join(root, "html-fragments", "learn-play-hub.html")) &&
  fs.existsSync(path.join(root, "html-fragments", "poker-tasks.html")) &&
  fs.existsSync(path.join(root, "html-fragments", "cashout.html")) &&
  fs.existsSync(path.join(root, "html-fragments", "streams.html")) &&
  fs.existsSync(path.join(root, "html-fragments", "schedule.html"))
);

add("Winter rating HTML is lazy-loaded from a fragment", () =>
  hasAll("html", [
    'data-view="winter-rating"',
    'data-html-fragment="./html-fragments/winter-rating.html"',
    'data-view="spring-rating"',
    'id="springRatingSectionPlaceholder"',
  ]) &&
  !has("html", 'id="winterRatingSection"') &&
  hasAll("appViewRouter", [
    'var htmlViewName = (viewName === "spring-rating" || viewName === "summer-rating") ? "winter-rating" : viewName;',
    "pokerEnsureViewHtml(htmlViewName)",
    'if (viewName === "spring-rating" || viewName === "summer-rating")',
  ]) &&
  fs.existsSync(path.join(root, "html-fragments", "winter-rating.html"))
);

add("Winter rating archive fragment does not ship static date DOM", () =>
  hasAll("winterRatingFragment", [
    'data-view="winter-rating"',
    'id="winterRatingSection"',
    'id="winterRatingDates"',
    "Архив рейтинга зимы",
  ]) &&
  !has("winterRatingFragment", 'class="winter-rating__date-item"') &&
  hasAll("appRatingViewAdapter", [
    'item.setAttribute("data-rating-season", currentDateSeason);',
    'btn.setAttribute("data-rating-toggle-bound", "1");',
  ])
);

add("Selected heavy views use JavaScript lazy gates while hall loads eagerly", () =>
  hasAll("html", [
    'src="./app-lazy-loader.js',
    'defer data-poker-eager-domain="app" src="./app-hall-fame.js',
    'defer src="./app-video-lessons.js',
    'defer src="./app-video-lessons-modals.js',
    'defer src="./app-equilator.js',
    'type="application/poker-lazy" data-poker-lazy-domain="club-tasks" src="./app-club-tasks.js',
    'type="application/poker-lazy" data-poker-lazy-domain="admin-reports" src="./app-admin-reports.js',
    'type="application/poker-lazy" data-poker-lazy-domain="player-crm" src="./app-player-crm.js',
    'type="application/poker-lazy" data-poker-lazy-domain="rating-winter" src="./app-rating-winter-runtime.js',
    'type="application/poker-lazy" data-poker-lazy-domain="rating-winter" src="./winter-rating-data.js',
  ]) &&
  hasAll("client", [
    "pokerEnsureViewScripts(viewName)",
    "function setView(viewName, navOpts)",
    "navItems.forEach(function (item)",
    "setView(target)",
  ]) &&
  hasAll("appLazyLoader", [
    '"winter-rating": ["rating-winter"]',
    '"poker-tasks": ["club-tasks"]',
    '"player-crm": ["player-crm"]',
    '"admin-bonuses": ["admin-bonuses"]',
    '"#adminReportBtn,#adminBroadcastReportsBtn"',
    "window.pokerEnsureViewScripts",
  ]) &&
  !has("html", 'data-poker-lazy-domain="hall"') &&
  !has("appLazyLoader", '"hall-of-fame": ["hall"]')
);

add("Home fish rating moved to the header without duplicate content button", () =>
  !has("html", 'id="hallFishRatingBtn"') &&
  !has("html", 'id="hallFishRatingBtnLegacy"') &&
  !has("html", "fish-king-home.png") &&
  hasAll("appHomeInit", [
    "function openHeaderFishRatingModal",
    "waitForHallFishModal",
    "__pokerOpenHallFishRatingModal",
  ]) &&
  hasAll("appPwaAuthRuntime", [
    "header-greeting--status",
    "openHeaderPoker21Levels",
  ]) &&
  hasAll("appHallFame", [
    '"#headerPokerStatus,.header-greeting--status"',
  ]) &&
  !has("appLazyLoader", '"#headerPokerStatus,.header-greeting--status"')
);

add("iOS/PWA chat keyboard dock has metric and recovery smoke coverage", () =>
  hasAll("appChatKeyboardDockFoundation", [
    "__pokerChatThreadDockBottomCssPx",
    "chat-keyboard-open",
    "--chat-keyboard-fallback-inset",
    "PWA_IOS_CHAT_KEYBOARD_COVER_STORAGE_KEY",
  ]) &&
  hasAll("appChatKeyboardDockComposerLayout", [
    "__pokerChatKeyboardFocusAtMs",
    "__pokerChatThreadDockBottomCssPx",
    "collectChatOverscrollSnapshot",
    "chat-input-area--vv-dock",
  ]) &&
  hasAll("appChatKeyboardDockViewportEvents", [
    "computeChatVisualViewportMetrics",
    "visualViewport.addEventListener",
    "__pokerChatKeyboardFocusAtMs",
    "__pokerChatThreadDockBottomCssPx",
  ]) &&
  hasAll("appChatKeyboardDebug", [
    "__pokerChatKeyboardDebugVvBound",
    "visualViewport.addEventListener",
    "__pokerChatThreadDockBottomCssPx",
  ]) &&
  hasAll("appWebviewKeyboard", [
    "keyboardLabUpdateMetrics",
    "visualViewport.addEventListener",
    "chat-keyboard-open",
  ])
);

add("Chat JavaScript domain is eager-loaded before router", () =>
  hasAll("html", [
    'defer data-poker-eager-domain="chat" src="./app-chat-utils.js',
    'defer data-poker-eager-domain="chat" src="./app-chat-open-peer-hydrate.js',
    'defer data-poker-eager-domain="chat" src="./app-chat-contact-swipe-actions.js',
    'defer data-poker-eager-domain="chat" src="./app-chat-bootstrap.js',
    'defer data-poker-eager-domain="chat" src="./app-chat-dialog-actions.js',
    'defer data-poker-eager-domain="chat" src="./app-chat-dialog-preview.js',
    'defer data-poker-eager-domain="chat" src="./app-chat-push-open.js',
    'defer data-poker-eager-domain="chat" src="./app-chat-voice-media.js',
    'defer data-poker-eager-domain="chat" src="./app-chat-voice-recording.js',
    'defer data-poker-eager-domain="chat" src="./app-chat-keyboard-overlay.js',
    'defer data-poker-eager-domain="chat" src="./app-chat-scroll-bottom.js',
    'defer data-poker-eager-domain="chat" src="./app-chat-composer-core.js',
    'defer data-poker-eager-domain="chat" src="./app-chat-composer-send.js',
    'defer data-poker-eager-domain="chat" src="./app-chat-presence-typing.js',
    'defer data-poker-eager-domain="chat" src="./app-chat-bootstrap-prefetch.js',
    'defer data-poker-eager-domain="chat" src="./app-chat-keyboard-dock-foundation.js',
    'defer data-poker-eager-domain="chat" src="./app-chat-keyboard-dock-lifecycle.js',
    'defer data-poker-eager-domain="chat" src="./app-chat-keyboard-dock-composer-layout.js',
    'defer data-poker-eager-domain="chat" src="./app-chat-keyboard-dock-viewport-events.js',
    'defer data-poker-eager-domain="chat" src="./app-chat-keyboard-dock.js',
    'defer data-poker-eager-domain="chat" src="./app-chat-header-avatar.js',
    'defer data-poker-eager-domain="chat" src="./app-chat-attachments.js',
    'defer data-poker-eager-domain="chat" src="./app-chat-emoji-picker.js',
    'defer data-poker-eager-domain="chat" src="./app-chat-reply-retry-glue.js',
    'defer data-poker-eager-domain="chat" src="./app-chat-keyboard-debug.js',
    'defer data-poker-eager-domain="chat" src="./app-chat-guest-gate.js',
    'defer data-poker-eager-domain="chat" src="./app-chat-lifecycle.js',
    'src="./app-lazy-loader.js',
  ]) &&
  !has("html", 'type="application/poker-lazy" data-poker-lazy-domain="chat"') &&
  has("appViewRouter", "pokerEnsureViewScripts")
);

add("Spring rating, fish game, hall, tools, and raffles stay eager while selected heavy domains are lazy", () => {
  const startup = localStartupScriptFilesFromIndex();
  const eagerFiles = ["app-rating-spring-season.js", "app-rating-view.js", "app-rating-view-adapter.js", "app-rating.js", "app-rating-week-tops.js", "spring-rating-images-league1.js", "spring-rating-images-league2.js", "spring-rating-meta.js", "spring-rating-data-march.js", "spring-rating-data-april.js", "spring-rating-data.js", "app-games.js", "app-hall-fame.js", "app-video-lessons.js", "app-video-lessons-modals.js", "app-equilator.js", "app-raffles-subscribe.js", "app-raffles-broadcast.js", "app-raffles-admin-create.js", "app-raffles-completed.js", "app-raffles-public.js", "app-raffles-active-view.js", "app-raffles-formatters.js", "app-raffles.js", "app-raffles-share.js"];
  const lazyFiles = ["app-club-tasks.js", "app-rating-winter-runtime.js", "winter-rating-data.js"];
  return eagerFiles.every((file) => startup.includes(file) && files.html.includes(`src="./${file}`)) &&
    lazyFiles.every((file) => !startup.includes(file) && files.html.includes(`type="application/poker-lazy"`) && files.html.includes(`src="./${file}`));
});

add("Rating seasonal data is split by spring and winter", () =>
  has("springRatingImagesLeague1", "var SPRING_RATING_IMAGES_LEAGUE1") &&
  has("springRatingImagesLeague2", "var SPRING_RATING_IMAGES_LEAGUE2") &&
  has("springRatingMeta", "var SPRING_RATING_UPDATED") &&
  has("springRatingDataMarch", "var SPRING_RATING_TOURNAMENTS_MARCH_BY_DATE") &&
  has("springRatingDataApril", "var SPRING_RATING_TOURNAMENTS_APRIL_BY_DATE") &&
  hasAll("springRatingData", [
    "var SPRING_RATING_TOURNAMENTS_BY_DATE",
    "SPRING_RATING_TOURNAMENTS_MARCH_BY_DATE",
    "SPRING_RATING_TOURNAMENTS_APRIL_BY_DATE",
  ]) &&
  !has("springRatingData", "var WINTER_RATING_BY_DATE") &&
  hasAll("winterRatingData", [
    "var WINTER_RATING_BY_DATE",
    "var WINTER_RATING_IMAGES",
    "var WINTER_RATING_TOURNAMENTS_BY_DATE",
  ]) &&
  !has("winterRatingData", "var SPRING_RATING_TOURNAMENTS_BY_DATE")
);

add("Startup root JavaScript includes every eager app module", () => {
  const startup = localStartupScriptFilesFromIndex();
  return startup.length >= 50 && startup.includes("app.js") && startup.includes("app-chat-lifecycle.js") && startup.includes("app-raffles.js");
});

add("Primary view route chain has DOM targets and click wiring", () => {
  const route = ["home", "chat", "download", "cashout", "profile", "home", "raffles", "spring-rating"];
  const views = htmlViewNames();
  const targets = htmlViewTargets();
  const requiredTargets = ["home", "chat", "download", "cashout", "profile", "raffles", "spring-rating"];
  return route.every((view) => views.has(view)) &&
    requiredTargets.every((view) => targets.includes(view)) &&
    hasAll("client", [
      "navItems.forEach(function (item)",
      "var target = item.dataset.viewTarget",
      "setView(target)",
      'if (target === "download" && typeof setDownloadPage === "function") setDownloadPage("main")',
      "function pokerOpenChatFromTab()",
      'setView("chat")',
      'typeof window.chatShowDialogs === "function"',
    ]);
});

add("JS manifest still maps key domains for build ownership", () => {
  const domains = jsManifestDomainMap();
  return Array.isArray(domains.chat) &&
    Array.isArray(domains.rating) &&
    Array.isArray(domains.ratingWinter) &&
    Array.isArray(domains.raffles) &&
    Array.isArray(domains.profile) &&
    domains.chat.includes("app-chat-contacts-loader.js") &&
    domains.chat.includes("app-chat-open-peer-hydrate.js") &&
    domains.chat.includes("app-chat-contact-swipe-actions.js") &&
    domains.chat.includes("app-chat-dialog-preview.js") &&
    domains.chat.includes("app-chat-voice-recording.js") &&
    domains.chat.includes("app-chat-composer-core.js") &&
    domains.chat.includes("app-chat-composer-send.js") &&
    domains.chat.includes("app-chat-presence-typing.js") &&
    domains.chat.includes("app-chat-bootstrap-prefetch.js") &&
    domains.chat.includes("app-chat-keyboard-dock-foundation.js") &&
    domains.chat.includes("app-chat-keyboard-dock-lifecycle.js") &&
    domains.chat.includes("app-chat-keyboard-dock-composer-layout.js") &&
    domains.chat.includes("app-chat-keyboard-dock-viewport-events.js") &&
    domains.chat.includes("app-chat-keyboard-dock.js") &&
    domains.chat.includes("app-chat-view-glue.js") &&
    domains.chat.includes("app-chat-header-avatar.js") &&
    domains.chat.includes("app-chat-attachments.js") &&
    domains.chat.includes("app-chat-emoji-picker.js") &&
    domains.chat.includes("app-chat-reply-retry-glue.js") &&
    domains.chat.includes("app-chat-guest-gate.js") &&
    domains.chat.includes("app-chat-scroll-bottom.js") &&
    domains.home.includes("app-home-club-info-modals.js") &&
    domains.home.includes("app-home-vpn-proxy-modal.js") &&
    domains.rating.includes("app-rating.js") &&
    domains.rating.includes("app-rating-view-adapter.js") &&
    domains.rating.includes("app-rating-spring-runtime.js") &&
    domains.ratingWinter.includes("app-rating-winter-runtime.js") &&
    domains.ratingWinter.includes("winter-rating-data.js") &&
    domains.raffles.includes("app-raffles-subscribe.js") &&
    domains.raffles.includes("app-raffles-broadcast.js") &&
    domains.raffles.includes("app-raffles-admin-create.js") &&
    domains.raffles.includes("app-raffles-completed.js") &&
    domains.raffles.includes("app-raffles-public.js") &&
    domains.raffles.includes("app-raffles-active-view.js") &&
    domains.raffles.includes("app-raffles.js") &&
    domains.raffles.includes("app-raffles-share.js") &&
    domains.profile.includes("app-cashout.js");
});

add("Rating runtime separates spring and winter responsibilities", () =>
  hasAll("appRatingSpringRuntime", [
    "function updateSpringRatingFinalCountdown",
    "function getSpringRatingOverallByLeague",
    "function initSpringRatingViewScrollButton",
  ]) &&
  hasAll("appRatingViewAdapter", [
    "function initWinterRating",
    "function initWinterRatingLightbox",
    "function renderWinterRatingTable",
    "function openWinterRatingPlayerModal",
  ]) &&
  hasAll("appRatingWinterRuntime", [
    "function getWinterRatingCounters",
    "WINTER_RATING_START",
    "WINTER_RATING_END",
  ]) &&
  hasAll("appChatLifecycle", [
    "initChatScrollBottom",
  ]) &&
  !has("appRatingSpringRuntime", "function initWinterRating") &&
  !has("appRatingWinterRuntime", "function initWinterRating") &&
  !has("appRatingWinterRuntime", "function updateSpringRatingHomePromoStats") &&
  !has("appRatingSpringRuntime", "function renderWinterRatingTable") &&
  !has("appRating", "function initWinterRating")
);

add("JS manifest files exist in root and build output", () => {
  const publicDir = path.join(root, "public");
  return jsManifestFiles().every((file) =>
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

add("CSS manifest owns every split stylesheet", () => {
  const parsed = cssManifestData();
  const domains = parsed && parsed.domains && typeof parsed.domains === "object" ? parsed.domains : {};
  const ownership = parsed && parsed.ownership && typeof parsed.ownership === "object" ? parsed.ownership : {};
  const domainNames = Object.keys(domains);
  const manifestFiles = cssManifestDomainFiles();
  const rootCssFiles = localStyleFilesFromRoot().filter((file) => file !== "styles.css");
  const importedFiles = localCssImportsFromStyles();
  return parsed.entrypoint === "styles.css" &&
    domainNames.length > 0 &&
    domainNames.every((name) => ownership[name] && ownership[name].owner && ownership[name].scope) &&
    rootCssFiles.every((file) => manifestFiles.includes(file)) &&
    rootCssFiles.every((file) => importedFiles.includes(file)) &&
    manifestFiles.every((file) => importedFiles.includes(file)) &&
    manifestFiles.every((file) => fs.existsSync(path.join(root, file)));
});

add("Large unused movie assets are not shipped", () =>
  !fs.existsSync(path.join(root, "assets", "rat_2.mov")) &&
  !fs.existsSync(path.join(root, "public", "assets", "rat_2.mov")) &&
  !fs.existsSync(path.join(root, "assets", "chat-push-notify.wav")) &&
  !fs.existsSync(path.join(root, "public", "assets", "chat-push-notify.wav")) &&
  has("client", 'var POKER_CHAT_MESSAGE_NOTIFY_SRC = "./assets/chat-message-notify.mp3?v=') &&
  !fs.existsSync(path.join(root, "public", "assets", "README.md")) &&
  has("downloadFragment", 'src="./assets/download-hero.png"') &&
  has("downloadFragment", 'srcset="./assets/download-hero.avif" type="image/avif"') &&
  has("downloadFragment", 'srcset="./assets/download-hero.webp" type="image/webp"') &&
  !has("html", 'rel="preload" as="image" href="./assets/download-hero.png"') &&
  has("downloadFragment", 'class="download-image"') &&
  has("downloadFragment", 'loading="lazy"')
);

add("Modern image variants exist for heavy visual assets", () => {
  const assets = [
    "download-hero",
    "raffles-hero",
    "video-lessons-coach-nikolay",
    "gazette-frankl-vaaar-march8",
    "coach-review-screen-01",
    "student-mikhail-gataulin-telegram-review",
  ];
  return assets.every((name) =>
    fs.existsSync(path.join(root, "assets", name + ".webp")) &&
    fs.existsSync(path.join(root, "assets", name + ".avif")) &&
    fs.existsSync(path.join(root, "public", "assets", name + ".webp")) &&
    fs.existsSync(path.join(root, "public", "assets", name + ".avif"))
  ) &&
    has("rafflesFragment", 'srcset="./assets/raffles-hero.avif" type="image/avif"') &&
    has("videoLessonsFragment", 'srcset="./assets/video-lessons-coach-nikolay.avif" type="image/avif"') &&
    has("globalModalsHomeFragment", 'srcset="./assets/gazette-frankl-vaaar-march8.avif" type="image/avif"');
});

add("Hidden cashout manager photos do not preload on home", () =>
  !has("html", 'rel="preload" as="image" href="./assets/dep-manager.jpg"') &&
  !has("html", 'rel="preload" as="image" href="./assets/dep-manager-vika.jpg"') &&
  !has("html", 'src="./assets/dep-manager.jpg"') &&
  !has("html", 'src="./assets/dep-manager-vika.jpg"') &&
  hasAll("cashoutFragment", [
    'src="./assets/dep-manager.jpg"',
    'src="./assets/dep-manager-vika.jpg"',
    'class="cashout-image"',
    'loading="lazy"',
  ])
);

add("Public build stays under the mobile asset budget", () => {
  const publicBytes = dirSizeBytes(path.join(root, "public"));
  const budgetBytes = 80 * 1024 * 1024;
  return publicBytes > 0 && publicBytes <= budgetBytes;
});

add("Individual shipped assets stay under the mobile file budget", () => {
  const publicDir = path.join(root, "public");
  const maxBytes = 2 * 1024 * 1024;
  let largest = 0;
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else largest = Math.max(largest, fs.statSync(p).size);
    }
  }
  walk(publicDir);
  return largest > 0 && largest <= maxBytes;
});

add("CSS domain entrypoints cover auth and tournament styles", () =>
  localCssImportsFromStyles().includes("styles-auth.css") &&
  localCssImportsFromStyles().includes("styles-pwa.css") &&
  localCssImportsFromStyles().includes("styles-tournament.css") &&
  localCssImportsFromStyles().includes("styles-hall-tournament-day.css") &&
  localCssImportsFromStyles().includes("styles-home-overrides.css") &&
  !localCssImportsFromStyles().includes("styles-home-tournament.css")
);

add("CSS manifest maps split home and tournament domains", () => {
  const parsed = cssManifestData();
  const views = parsed && parsed.views && typeof parsed.views === "object" ? parsed.views : {};
  return hasAll("cssManifest", [
    '"entrypoint": "styles.css"',
    '"auth":',
    '"home":',
    '"tournament":',
    '"learning":',
    '"raffles":',
    '"download":',
    '"styles-home-shell.css"',
    '"styles-home-sections.css"',
    '"styles-home-modals.css"',
    '"styles-home-planner.css"',
    '"styles-home-overrides.css"',
    '"styles-home-rating-promo-legacy.css"',
    '"styles-home-rating-promo-late.css"',
    '"styles-layout-touch-targets.css"',
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
    '"styles-learning-games.css"',
    '"styles-raffles.css"',
    '"styles-download.css"',
    '"styles-rating-learning.css"',
    '"styles-rating-games.css"',
    '"styles-rating-learning-games-responsive.css"',
  ]) &&
    Array.isArray(views.home) &&
    Array.isArray(views.chat) &&
    Array.isArray(views["spring-rating"]) &&
    views.home.includes("home") &&
    views.home.includes("tournament") &&
    !views.home.includes("download") &&
    views.cashout.includes("download") &&
    views.chat.includes("chat") &&
    views.raffles.includes("raffles") &&
    views.download.includes("download") &&
    views["video-lessons"].includes("learning") &&
    views["spring-rating"].includes("rating");
});

add("Rating CSS entrypoint no longer owns learning games raffles or download", () =>
  hasAll("styles", [
    "styles-learning-games.css?v=",
    "styles-raffles.css?v=",
    "styles-download.css?v=",
    "styles-home-legacy-prelude.css?v=",
    "styles-home-legacy-tail.css?v=",
    "styles-home-rating-promo-legacy.css?v=",
    "styles-layout-touch-targets.css?v=",
    "styles-home-rating-promo-late.css?v=",
    "styles-rating.css?v=",
  ]) &&
  !has("stylesRating", "styles-rating-learning-games.css") &&
  !has("stylesRating", "styles-rating-raffles.css") &&
  !has("stylesRating", "styles-rating-home-download.css") &&
  !fs.existsSync(path.join(root, "styles-rating-home-download.css")) &&
  hasAll("stylesRating", [
    "styles-rating-tables-modals.css",
    "styles-rating-chat-modals.css",
  ])
);

add("Late CSS ownership keeps home rating and shared controls out of tournament overrides", () =>
  !has("stylesHomeLegacyTail", "feature--rating-spring-promo") &&
  !has("stylesHomeLegacyTail", "spring-rating-home-promo-unified") &&
  !has("stylesHomeOverrides", "feature--rating-spring-promo") &&
  !has("stylesHomeOverrides", "spring-rating-home-promo-unified") &&
  !has("stylesHomeOverrides", "bonus-game-back") &&
  hasAll("stylesHomeRatingPromoLegacy", [
    "feature--rating-spring-promo",
    "spring-rating-home-promo-unified",
  ]) &&
  hasAll("stylesHomeRatingPromoLate", [
    "features--home-rating-on-border",
    "spring-rating-home-promo-unified",
  ]) &&
  hasAll("stylesLayoutTouchTargets", [
    "bonus-game-back",
    "chat-conv-top__toolbar-back",
    "raffle-winner-leaders-modal__close",
  ])
);

add("Admin auth debug panel is wired", () =>
  hasAll("globalModalsAdminFragment", [
    'id="adminAuthDebugBtn"',
    'id="adminAuthDebugModal"',
  ]) &&
  hasAll("html", [
    './app-auth-debug.js?v=',
  ]) &&
  hasAll("client", [
    "window.__pokerCollectAuthDebug",
    "window.pokerInitAuthDebugModal",
    "pokerReadPwaSessionRecordAsync",
    "adminAuthDebugOutput",
  ])
);

const failures = [];
for (const check of checks) {
  let ok = false;
  let error = null;
  try {
    ok = !!check.fn();
  } catch (err) {
    error = err;
    ok = false;
  }
  if (!ok) {
    const message = error && error.message ? ": " + error.message : "";
    failures.push(check.name + message);
  }
}

if (failures.length) {
  console.error("Smoke checks failed:");
  failures.forEach((name) => console.error("- " + name));
  process.exit(1);
}

console.log("Smoke checks passed: " + checks.length);
