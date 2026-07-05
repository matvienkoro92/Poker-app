#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.join(__dirname, "..");
const roots = ["api", "lib", "scripts"];
const skipDirs = new Set(["node_modules", "public", ".git"]);
const files = [];
const redisGuardSkipFiles = new Set(["lib/redis-bandwidth-guard.js"]);

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
const redisBandwidthIssues = [];
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
  redisBandwidthIssues.push(...findRedisBandwidthGuardIssues(rel));
}

if (redisBandwidthIssues.length) {
  failed = true;
  console.error("\nRedis bandwidth guard check failed:");
  redisBandwidthIssues.slice(0, 40).forEach((issue) => {
    console.error(`${issue.file}:${issue.line}: ${issue.message}`);
  });
  if (redisBandwidthIssues.length > 40) {
    console.error(`...and ${redisBandwidthIssues.length - 40} more Redis bandwidth issues.`);
  }
}

if (failed) process.exit(1);
console.log(`Checked ${uniqueFiles.length} JavaScript files.`);

function findRedisBandwidthGuardIssues(rel) {
  if (!rel || redisGuardSkipFiles.has(rel)) return [];
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) return [];
  const lines = fs.readFileSync(abs, "utf8").split(/\r?\n/);
  const issues = [];
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const windowText = lines.slice(i, Math.min(lines.length, i + 24)).join("\n");
    if (/\[\s*["']KEYS["']/.test(line) && !/allowDangerousRedisRead\s*:\s*true/.test(windowText)) {
      issues.push({
        file: rel,
        line: i + 1,
        message: "KEYS needs allowDangerousRedisRead: true and a context.",
      });
    }
    if (/\[\s*["']LRANGE["']/.test(line) && redisLrangeCanReadWholeList(line) && !/allowLargeRedisRead\s*:/.test(windowText)) {
      issues.push({
        file: rel,
        line: i + 1,
        message: "Full-list LRANGE needs allowLargeRedisRead and a context.",
      });
    }
  }
  return issues;
}

function redisLrangeCanReadWholeList(line) {
  const text = String(line || "");
  if (!/["']0["']/.test(text)) return false;
  if (/["']-1["']/.test(text)) return true;
  if (/\bneedsFull[A-Za-z0-9_]*\b/.test(text)) return true;
  return false;
}
