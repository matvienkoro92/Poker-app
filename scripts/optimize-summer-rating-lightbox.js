#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const assetsDir = path.join(root, "assets");
const mapNames = ["summer-rating-images-league1.js", "summer-rating-images-league2.js"];

async function main() {
  const replacements = new Map();

  for (const mapName of mapNames) {
    const source = fs.readFileSync(path.join(root, mapName), "utf8");
    const context = {};
    vm.createContext(context);
    vm.runInContext(source, context, { filename: mapName });

    for (const [key, dates] of Object.entries(context)) {
      if (!/_RATING_IMAGES(?:_|$)/.test(key)) continue;
      for (const files of Object.values(dates || {})) {
        for (const relative of files || []) {
          if (replacements.has(relative) || !/\.jpe?g$/i.test(relative)) continue;
          const input = path.join(assetsDir, relative);
          if (!fs.existsSync(input)) continue;
          const metadata = await sharp(input).metadata();
          if (!metadata.width || metadata.width > 600) continue;

          const outputRelative = relative.replace(/\.jpe?g$/i, ".avif");
          const output = path.join(assetsDir, outputRelative);
          await sharp(input)
            .resize({ width: 1040, withoutEnlargement: false, kernel: "lanczos3" })
            .sharpen({ sigma: 0.7, m1: 0.7, m2: 1.2, x1: 2, y2: 10, y3: 20 })
            .avif({ quality: 50, effort: 3 })
            .toFile(output);
          replacements.set(relative, outputRelative);
        }
      }
    }
  }

  for (const mapName of mapNames) {
    const mapPath = path.join(root, mapName);
    let source = fs.readFileSync(mapPath, "utf8");
    for (const [before, after] of replacements) source = source.split(before).join(after);
    fs.writeFileSync(mapPath, source);
  }

  for (const before of replacements.keys()) fs.unlinkSync(path.join(assetsDir, before));
  console.log(`Summer lightbox images: ${replacements.size} enhanced AVIF files written`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
