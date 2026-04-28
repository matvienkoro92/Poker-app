#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.join(__dirname, "..");
const roots = ["app.js", "api", "lib", "scripts"];
const skipDirs = new Set(["node_modules", "public", ".git"]);
const files = [];

function stripAssetUrl(raw) {
  return String(raw || "")
    .trim()
    .replace(/^\.\/+/, "")
    .split("#")[0]
    .split("?")[0];
}

function addLocalRootScriptsFromIndex() {
  const htmlPath = path.join(root, "index.html");
  if (!fs.existsSync(htmlPath)) return;
  const html = fs.readFileSync(htmlPath, "utf8");
  const re = /<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = re.exec(html))) {
    const file = stripAssetUrl(match[1]);
    if (!file || /^(?:https?:)?\/\//i.test(file) || file.startsWith("/")) continue;
    if (file.includes("/") || !file.endsWith(".js")) continue;
    if (fs.existsSync(path.join(root, file))) files.push(file);
  }
}

function walk(relPath) {
  const abs = path.join(root, relPath);
  if (!fs.existsSync(abs)) return;
  const stat = fs.statSync(abs);
  if (stat.isDirectory()) {
    const base = path.basename(abs);
    if (skipDirs.has(base)) return;
    for (const name of fs.readdirSync(abs)) {
      walk(path.join(relPath, name));
    }
    return;
  }
  if (stat.isFile() && relPath.endsWith(".js")) files.push(relPath);
}

for (const rel of roots) walk(rel);
addLocalRootScriptsFromIndex();
const seen = new Set();
for (let i = files.length - 1; i >= 0; i -= 1) {
  if (seen.has(files[i])) files.splice(i, 1);
  else seen.add(files[i]);
}
files.sort();

let failed = false;
for (const rel of files) {
  const result = spawnSync(process.execPath, ["--check", path.join(root, rel)], {
    cwd: root,
    encoding: "utf8",
  });
  if (result.status !== 0) {
    failed = true;
    console.error("\nSyntax check failed:", rel);
    if (result.stdout) process.stdout.write(result.stdout);
    if (result.stderr) process.stderr.write(result.stderr);
  }
}

if (failed) process.exit(1);
console.log(`Checked ${files.length} JavaScript files.`);
