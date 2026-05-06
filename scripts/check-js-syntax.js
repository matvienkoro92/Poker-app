#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.join(__dirname, "..");
const roots = ["api", "lib", "scripts"];
const skipDirs = new Set(["node_modules", "public", ".git"]);
const files = [];

function stripAssetUrl(raw) {
  return String(raw || "")
    .trim()
    .replace(/^\.\/+/, "")
    .split("#")[0]
    .split("?")[0];
}

function localRootScriptFilesFromIndex() {
  const indexPath = path.join(root, "index.html");
  if (!fs.existsSync(indexPath)) return ["app.js"];
  const html = fs.readFileSync(indexPath, "utf8");
  const out = [];
  const re = /<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = re.exec(html))) {
    const file = stripAssetUrl(match[1]);
    if (!file || /^(?:https?:)?\/\//i.test(file) || file.startsWith("/")) continue;
    if (file.includes("/") || !file.endsWith(".js")) continue;
    out.push(file);
  }
  return out.length ? out : ["app.js"];
}

function localRootModuleFiles() {
  return fs.readdirSync(root)
    .filter((name) => /^app.*\.mjs$/.test(name))
    .sort();
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
  if (stat.isFile() && (relPath.endsWith(".js") || relPath.endsWith(".mjs"))) files.push(relPath);
}

for (const rel of localRootScriptFilesFromIndex()) walk(rel);
for (const rel of localRootModuleFiles()) walk(rel);
for (const rel of roots) walk(rel);
const uniqueFiles = [...new Set(files)].sort();

let failed = false;
for (const rel of uniqueFiles) {
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
console.log(`Checked ${uniqueFiles.length} JavaScript files.`);
