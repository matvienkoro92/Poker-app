#!/usr/bin/env node
/**
 * Увеличивает data-app-version на <html> в index.html на 0.001 (1.005 → 1.006).
 * Оверлей загрузки, PWA-экран входа и футер читают версию из этого атрибута.
 * Вызывается из scripts/pre-push (после npm run install-hooks).
 * Пропуск: SKIP_PWA_VERSION_BUMP=1 git push
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const indexPath = path.join(root, "index.html");

let html = fs.readFileSync(indexPath, "utf8");
const re = /data-app-version="(\d+)\.(\d{3})"/;
const m = html.match(re);
if (!m) {
  console.error("bump-pwa-login-version: не найден data-app-version=\"…\" в index.html");
  process.exit(1);
}
const major = parseInt(m[1], 10);
let minor = parseInt(m[2], 10);
minor += 1;
let nextMajor = major;
if (minor >= 1000) {
  nextMajor += 1;
  minor = 0;
}
const next = `${nextMajor}.${String(minor).padStart(3, "0")}`;
const out = html.replace(re, `data-app-version="${next}"`);
fs.writeFileSync(indexPath, out, "utf8");
console.log(`bump-pwa-login-version: ${m[1]}.${m[2]} → ${next}`);
