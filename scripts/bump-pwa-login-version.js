#!/usr/bin/env node
/**
 * Увеличивает число в строке Version X.YYY на id="pwaLoginScreenVersion" в index.html на 0.001.
 * Вызывается из scripts/pre-push (после npm run install-hooks).
 * Пропуск: SKIP_PWA_VERSION_BUMP=1 git push
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const indexPath = path.join(root, "index.html");

let html = fs.readFileSync(indexPath, "utf8");
const re = /(<p class="pwa-auth-screen__version" id="pwaLoginScreenVersion">Version )(\d+)\.(\d{3})(<\/p>)/;
const m = html.match(re);
if (!m) {
  console.error("bump-pwa-login-version: не найдена строка Version в index.html");
  process.exit(1);
}
const major = parseInt(m[2], 10);
let minor = parseInt(m[3], 10);
minor += 1;
let nextMajor = major;
if (minor >= 1000) {
  nextMajor += 1;
  minor = 0;
}
const next = `${nextMajor}.${String(minor).padStart(3, "0")}`;
const out = html.replace(re, `$1${next}$4`);
fs.writeFileSync(indexPath, out, "utf8");
console.log(`bump-pwa-login-version: Version ${m[2]}.${m[3]} → Version ${next}`);
