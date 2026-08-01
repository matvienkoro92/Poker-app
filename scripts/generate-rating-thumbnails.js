#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const sharp = require("sharp");
const root = path.join(__dirname, "..");
const assetsDir = path.join(root, "assets");
const outputDir = path.join(assetsDir, "rating-thumbnails");
const mapFiles = [
  "winter-rating-data.js",
  "spring-rating-images-league1.js",
  "spring-rating-images-league2.js",
  "summer-rating-images-league1.js",
  "summer-rating-images-league2.js",
];

function collectRatingFiles() {
  const out = new Set();
  for (const name of mapFiles) {
    const context = {};
    vm.createContext(context);
    vm.runInContext(fs.readFileSync(path.join(root, name), "utf8"), context, { filename: name });
    for (const key of Object.keys(context)) {
      if (!/_RATING_IMAGES(?:_|$)/.test(key)) continue;
      for (const files of Object.values(context[key] || {})) {
        for (const file of Array.isArray(files) ? files : []) out.add(String(file));
      }
    }
  }
  return Array.from(out).sort();
}

async function main() {
  const files = collectRatingFiles();
  let written = 0;
  let skipped = 0;
  for (const relative of files) {
    const source = path.join(assetsDir, relative);
    const parsed = path.parse(relative);
    const destination = path.join(outputDir, parsed.dir, parsed.name + ".avif");
    if (!fs.existsSync(source)) continue;
    const sourceStat = fs.statSync(source);
    if (fs.existsSync(destination) && fs.statSync(destination).mtimeMs >= sourceStat.mtimeMs) {
      skipped += 1;
      continue;
    }
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    await sharp(source).rotate().resize({ width: 150, withoutEnlargement: true }).avif({ quality: 44, effort: 5 }).toFile(destination);
    written += 1;
  }
  console.log(`Rating thumbnails: ${written} written, ${skipped} current, ${files.length} referenced`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
