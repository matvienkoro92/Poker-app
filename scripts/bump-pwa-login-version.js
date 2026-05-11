#!/usr/bin/env node
/**
 * Увеличивает data-app-version на <html> в index.html на 0.001 (1.005 → 1.006).
 * Оверлей загрузки, PWA-экран входа и футер читают версию из этого атрибута.
 * Вызывается из scripts/pre-push (после npm run install-hooks).
 * Пропуск: SKIP_PWA_VERSION_BUMP=1 git push
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

function bumpHtmlRef(htmlText, resource, version) {
  const escaped = escapeRegExp(resource);
  const withVersion = new RegExp(`((?:href|src)="\\.\\/${escaped})\\?v=[^"#]+(")`, "g");
  let changed = false;
  let nextText = htmlText.replace(withVersion, function (_match, start, end) {
    changed = true;
    return start + "?v=" + version + end;
  });
  if (changed) return { text: nextText, changed: true };
  const withoutVersion = new RegExp(`((?:href|src)="\\.\\/${escaped})(")`, "g");
  nextText = nextText.replace(withoutVersion, function (_match, start, end) {
    changed = true;
    return start + "?v=" + version + end;
  });
  return { text: nextText, changed };
}

function bumpCssImport(cssText, resource, version) {
  const escaped = escapeRegExp(resource);
  const withVersion = new RegExp(`(@import\\s+url\\(["']?\\.\\/${escaped})\\?v=[^"')?#]+(["']?\\))`, "g");
  let changed = false;
  let nextText = cssText.replace(withVersion, function (_match, start, end) {
    changed = true;
    return start + "?v=" + version + end;
  });
  if (changed) return { text: nextText, changed: true };
  const withoutVersion = new RegExp(`(@import\\s+url\\(["']?\\.\\/${escaped})(["']?\\))`, "g");
  nextText = nextText.replace(withoutVersion, function (_match, start, end) {
    changed = true;
    return start + "?v=" + version + end;
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
let stylesChanged = versionTargets.has("styles.css");
if (fs.existsSync(stylesPath)) {
  let styles = fs.readFileSync(stylesPath, "utf8");
  Array.from(versionTargets).forEach((resource) => {
    if (resource === "styles.css" || !resource.endsWith(".css")) return;
    const result = bumpCssImport(styles, resource, next);
    styles = result.text;
    if (result.changed) stylesChanged = true;
  });
  if (stylesChanged) {
    fs.writeFileSync(stylesPath, styles, "utf8");
    versionTargets.add("styles.css");
  }
}
versionTargets.forEach((resource) => {
  const result = bumpHtmlRef(out, resource, next);
  out = result.text;
});
fs.writeFileSync(indexPath, out, "utf8");
console.log(`bump-pwa-login-version: ${m[1]}.${m[2]} → ${next}; resources: ${versionTargets.size ? Array.from(versionTargets).sort().join(", ") : "none"}`);
