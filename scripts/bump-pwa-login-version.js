#!/usr/bin/env node
/**
 * Увеличивает data-app-version на <html> в index.html на 0.001 (1.005 → 1.006).
 * Оверлей загрузки, PWA-экран входа и футер читают версию из этого атрибута.
 * Запускается вручную: npm run bump:pwa-version.
 */
const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const root = path.resolve(__dirname, "..");
const indexPath = path.join(root, "index.html");
const stylesPath = path.join(root, "styles.css");

function gitLines(args) {
  try {
    return cp.execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] })
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  } catch (e) {
    return [];
  }
}

function collectChangedFiles() {
  const files = new Set();
  gitLines(["diff", "--name-only"]).forEach((file) => files.add(file));
  gitLines(["diff", "--name-only", "--cached"]).forEach((file) => files.add(file));
  const upstream = gitLines(["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"])[0];
  if (upstream) {
    gitLines(["diff", "--name-only", upstream + "...HEAD"]).forEach((file) => files.add(file));
  } else {
    gitLines(["diff", "--name-only", "HEAD~1..HEAD"]).forEach((file) => files.add(file));
  }
  files.delete("index.html");
  files.delete("public/index.html");
  return files;
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function toVersionedResource(file) {
  const clean = String(file || "").replace(/^public\//, "").replace(/\\/g, "/");
  if (!/\.(?:css|js|json)$/.test(clean)) return "";
  if (clean.includes("/") && !clean.startsWith("assets/")) return "";
  return clean;
}

function collectHtmlVersionedResources(htmlText) {
  const out = new Set();
  const re = /\b(?:href|src)=["']\.\/([^"']+\.(?:css|js))(?:\?v=[^"']+)?["']/gi;
  let match;
  while ((match = re.exec(htmlText))) {
    const clean = String(match[1] || "").replace(/\\/g, "/");
    if (clean && !clean.includes("/")) out.add(clean);
  }
  return out;
}

function collectCssImportResources(cssText) {
  const out = new Set();
  const re = /@import\s+url\(["']?\.\/([^"')?#]+\.css)(?:\?v=[^"')?#]+)?["']?\)/gi;
  let match;
  while ((match = re.exec(cssText))) {
    const clean = String(match[1] || "").replace(/\\/g, "/");
    if (clean) out.add(clean);
  }
  return out;
}

function bumpHtmlRef(htmlText, resource, next) {
  const escaped = escapeRegExp(resource);
  const withVersion = new RegExp(`((?:href|src)="\\.\\/${escaped})\\?v=[^"#]+(")`, "g");
  let changed = false;
  let nextText = htmlText.replace(withVersion, function (_match, start, end) {
    changed = true;
    return `${start}?v=${next}${end}`;
  });
  if (changed) return { text: nextText, changed: true };
  const withoutVersion = new RegExp(`((?:href|src)="\\.\\/${escaped})(")`, "g");
  nextText = nextText.replace(withoutVersion, function (_match, start, end) {
    changed = true;
    return `${start}?v=${next}${end}`;
  });
  return { text: nextText, changed };
}

function bumpCssImport(cssText, resource, next) {
  const escaped = escapeRegExp(resource);
  const withVersion = new RegExp(`(@import\\s+url\\(["']?\\.\\/${escaped})\\?v=[^"')?#]+(["']?\\))`, "g");
  let changed = false;
  let nextText = cssText.replace(withVersion, function (_match, start, end) {
    changed = true;
    return `${start}?v=${next}${end}`;
  });
  if (changed) return { text: nextText, changed: true };
  const withoutVersion = new RegExp(`(@import\\s+url\\(["']?\\.\\/${escaped})(["']?\\))`, "g");
  nextText = nextText.replace(withoutVersion, function (_match, start, end) {
    changed = true;
    return `${start}?v=${next}${end}`;
  });
  return { text: nextText, changed };
}

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
let out = html.replace(re, `data-app-version="${next}"`);
const changedFiles = collectChangedFiles();
const versionTargets = new Set();
changedFiles.forEach((file) => {
  const resource = toVersionedResource(file);
  if (resource) versionTargets.add(resource);
});
collectHtmlVersionedResources(html).forEach((resource) => versionTargets.add(resource));
let stylesChanged = versionTargets.has("styles.css");
// Every imported stylesheet needs its own URL version: changing the parent URL
// does not invalidate a nested browser HTTP cache entry.
for (const name of fs.readdirSync(root).filter(name => name.endsWith(".css"))) {
  const file = path.join(root, name);
  let styles = fs.readFileSync(file, "utf8");
  for (const resource of collectCssImportResources(styles)) {
    styles = bumpCssImport(styles, resource, next).text;
  }
  fs.writeFileSync(file, styles, "utf8");
}
const swPath = path.join(root, "sw.js");
let sw = fs.readFileSync(swPath, "utf8");
const cache = sw.match(/var POKER_STATIC_CACHE = "poker-static-v(\d+)"/);
if (!cache) throw new Error("Missing static service worker cache version");
sw = sw.replace(cache[0], `var POKER_STATIC_CACHE = "poker-static-v${Number(cache[1]) + 1}"`)
  .replace(/(var POKER_STATIC_OLD_CACHES = \[)/, `$1"poker-static-v${cache[1]}", `)
  .replace(/var POKER_SW_BUILD = "[^"]+"/, `var POKER_SW_BUILD = "${next}"`);
fs.writeFileSync(swPath, sw, "utf8");
versionTargets.forEach((resource) => {
  const result = bumpHtmlRef(out, resource, next);
  out = result.text;
});
fs.writeFileSync(indexPath, out, "utf8");
console.log(`bump-pwa-login-version: ${m[1]}.${m[2]} → ${next}; resources: ${versionTargets.size ? Array.from(versionTargets).sort().join(", ") : "none"}`);
