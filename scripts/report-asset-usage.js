#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const root = path.join(__dirname, "..");
const publicAssets = path.join(root, "public", "assets");
const config = JSON.parse(fs.readFileSync(path.join(root, "asset-budgets.json"), "utf8"));

function mib(bytes) {
  return +(bytes / 1048576).toFixed(2);
}

const seasonal = { core: 0, current: 0, archive: 0 };
const counts = { core: 0, current: 0, archive: 0 };
const largest = { core: [], current: [], archive: [] };
function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(file);
      continue;
    }
    const rel = path.relative(publicAssets, file);
    const date = rel.match(/rating-(\d{2})-(\d{2})-2026/i);
    const month = date ? Number(date[2]) : 0;
    const bucket = config.seasonRouting.currentMonths.includes(month)
      ? "current"
      : config.seasonRouting.archiveMonths.includes(month)
        ? "archive"
        : "core";
    const bytes = fs.statSync(file).size;
    seasonal[bucket] += bytes;
    counts[bucket] += 1;
    largest[bucket].push({ file: rel, bytes });
  }
}
walk(publicAssets);

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
function localFileFromUrl(url) {
  const rel = String(url || "").replace(/^\.\//, "").split(/[?#]/)[0];
  if (!rel || rel.includes("..") || /^(?:https?:)?\/\//i.test(rel)) return "";
  const file = path.join(root, rel);
  return file.startsWith(root + path.sep) && fs.existsSync(file) ? file : "";
}

function collectCssGraph(entryFile, seen) {
  if (!entryFile || seen.has(entryFile)) return [];
  seen.add(entryFile);
  const text = fs.readFileSync(entryFile, "utf8");
  const files = [entryFile];
  for (const match of text.matchAll(/@import\s+url\(["']?([^"')]+\.css[^"')]*)/gi)) {
    const imported = localFileFromUrl(match[1]);
    files.push(...collectCssGraph(imported, seen));
  }
  return files;
}

const eagerScripts = Array.from(html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+\.js[^"']*)["'][^>]*>/gi))
  .filter((match) => !/type=["']application\/poker-lazy["']/i.test(match[0]))
  .map((match) => localFileFromUrl(match[1]))
  .filter(Boolean);
const eagerStyleEntries = Array.from(html.matchAll(/<link\b[^>]*\bhref=["']([^"']+\.css[^"']*)["'][^>]*>/gi))
  .filter((match) => !/type=["']application\/poker-lazy-style["']/i.test(match[0]))
  .map((match) => localFileFromUrl(match[1]))
  .filter(Boolean);
const eagerStyles = Array.from(new Set(eagerStyleEntries.flatMap((file) => collectCssGraph(file, new Set()))));
const eager = new Set();
for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
  const tag = match[0];
  if (!/loading=["']eager["']|fetchpriority=["']high["']/i.test(tag)) continue;
  const srcset = tag.match(/\bsrcset=["']([^"']+)["']/i);
  if (srcset) {
    const candidates = srcset[1].split(",").map((item) => item.trim().split(/\s+/)[0]);
    const responsive = candidates.map((url) => url.match(/^\.\/assets\/([^?#]+)/i)).find(Boolean);
    if (responsive) {
      eager.add(responsive[1]);
      continue;
    }
  }
  const src = tag.match(/\bsrc=["']\.\/assets\/([^"'?#]+)/i);
  if (src) eager.add(src[1]);
}
const eagerFiles = Array.from(eager).map((rel) => {
  const file = path.join(publicAssets, rel);
  return { file: rel, bytes: fs.existsSync(file) ? fs.statSync(file).size : 0 };
}).sort((a, b) => b.bytes - a.bytes);

const startupFiles = [path.join(root, "index.html"), ...eagerScripts, ...eagerStyles, ...eagerFiles.map((item) => path.join(publicAssets, item.file))]
  .filter((file, index, files) => fs.existsSync(file) && files.indexOf(file) === index);
const startup = {
  transferBytes: startupFiles.reduce((sum, file) => sum + zlib.gzipSync(fs.readFileSync(file), { level: 9 }).length, 0),
  jsParseBytes: eagerScripts.reduce((sum, file) => sum + fs.statSync(file).size, 0),
  cssParseBytes: eagerStyles.reduce((sum, file) => sum + fs.statSync(file).size, 0),
  requestCount: startupFiles.length,
  eagerScriptCount: eagerScripts.length,
  eagerStyleFileCount: eagerStyles.length,
};
const startupBudget = config.startupBudgetsKiB || {};
const violations = [];
if (startupBudget.transfer && startup.transferBytes / 1024 > startupBudget.transfer) violations.push(`startup transfer ${Math.ceil(startup.transferBytes / 1024)} KiB > ${startupBudget.transfer} KiB`);
if (startupBudget.jsParse && startup.jsParseBytes / 1024 > startupBudget.jsParse) violations.push(`startup JS parse ${Math.ceil(startup.jsParseBytes / 1024)} KiB > ${startupBudget.jsParse} KiB`);
if (startupBudget.cssParse && startup.cssParseBytes / 1024 > startupBudget.cssParse) violations.push(`startup CSS parse ${Math.ceil(startup.cssParseBytes / 1024)} KiB > ${startupBudget.cssParse} KiB`);

console.log(JSON.stringify({
  seasonalMiB: Object.fromEntries(Object.entries(seasonal).map(([key, bytes]) => [key, mib(bytes)])),
  seasonalFiles: counts,
  largestByBucket: Object.fromEntries(Object.entries(largest).map(([bucket, files]) => [
    bucket,
    files.sort((a, b) => b.bytes - a.bytes).slice(0, 15).map((item) => ({
      file: item.file,
      KiB: +(item.bytes / 1024).toFixed(1),
    })),
  ])),
  eagerMiB: mib(eagerFiles.reduce((sum, item) => sum + item.bytes, 0)),
  eagerFiles: eagerFiles.map((item) => ({ file: item.file, KiB: +(item.bytes / 1024).toFixed(1) })),
  startupCost: {
    transferKiB: +(startup.transferBytes / 1024).toFixed(1),
    jsParseKiB: +(startup.jsParseBytes / 1024).toFixed(1),
    cssParseKiB: +(startup.cssParseBytes / 1024).toFixed(1),
    requests: startup.requestCount,
    eagerScripts: startup.eagerScriptCount,
    eagerStyleFiles: startup.eagerStyleFileCount,
  },
  startupBudgetsKiB: startupBudget,
  violations,
  budgetsMiB: config.budgetsMiB,
}, null, 2));
if (violations.length) process.exitCode = 1;
