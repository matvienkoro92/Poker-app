#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const assetsDir = path.join(root, "assets");
const minBytes = 80 * 1024;
const avifTargets = [
  "download-hero.png",
  "raffles-hero.png",
  "video-lessons-coach-nikolay.png",
  "gazette-frankl-vaaar-march8.png",
  "coach-review-screen-01.png",
  "student-mikhail-gataulin-telegram-review.png",
];

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function relAsset(file) {
  return path.relative(assetsDir, file).split(path.sep).join("/");
}

function tmpFor(file, suffix) {
  return path.join(path.dirname(file), "." + path.basename(file) + suffix);
}

function shouldReplace(src, out) {
  if (!fs.existsSync(out)) return false;
  var before = fs.statSync(src).size;
  var after = fs.statSync(out).size;
  return after > 0 && after < before * 0.98;
}

async function optimizeOriginal(file) {
  const ext = path.extname(file).toLowerCase();
  const before = fs.statSync(file).size;
  if (before < minBytes) return null;
  const out = tmpFor(file, ".opt" + ext);
  try {
    if (ext === ".png") {
      await sharp(file)
        .png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 })
        .toFile(out);
    } else if (ext === ".jpg" || ext === ".jpeg") {
      await sharp(file)
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(out);
    } else {
      return null;
    }
    if (shouldReplace(file, out)) {
      fs.renameSync(out, file);
      return { file: relAsset(file), before, after: fs.statSync(file).size };
    }
    fs.rmSync(out, { force: true });
  } catch (err) {
    fs.rmSync(out, { force: true });
    throw err;
  }
  return null;
}

async function writeModernVariant(rel, format) {
  const src = path.join(assetsDir, rel);
  if (!fs.existsSync(src)) return null;
  const base = src.replace(/\.[^.]+$/, "");
  const out = base + "." + format;
  const img = sharp(src);
  if (format === "webp") {
    await img.webp({ quality: 78, effort: 6 }).toFile(out);
  } else {
    await img.avif({ quality: 50, effort: 7 }).toFile(out);
  }
  return { file: relAsset(out), bytes: fs.statSync(out).size };
}

async function main() {
  const files = walk(assetsDir).filter((file) => /\.(?:png|jpe?g)$/i.test(file));
  const optimized = [];
  for (const file of files) {
    const result = await optimizeOriginal(file);
    if (result) optimized.push(result);
  }
  const variants = [];
  for (const rel of avifTargets) {
    variants.push(await writeModernVariant(rel, "webp"));
    variants.push(await writeModernVariant(rel, "avif"));
  }
  const saved = optimized.reduce((sum, item) => sum + item.before - item.after, 0);
  console.log(JSON.stringify({
    optimizedCount: optimized.length,
    savedBytes: saved,
    savedMb: +(saved / 1024 / 1024).toFixed(2),
    optimizedTop: optimized
      .slice()
      .sort((a, b) => (b.before - b.after) - (a.before - a.after))
      .slice(0, 30),
    variants: variants.filter(Boolean),
  }, null, 2));
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
});
