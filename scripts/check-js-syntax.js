#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.join(__dirname, "..");
const roots = ["app.js", "api", "lib", "scripts"];
const skipDirs = new Set(["node_modules", "public", ".git"]);
const files = [];

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
