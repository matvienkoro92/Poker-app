#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const targetMaxBytes = Number(process.env.IMAGE_TARGET_MAX_KB || 50) * 1024;
const sourceMinBytes = Number(process.env.IMAGE_SOURCE_MIN_KB || 50) * 1024;
const concurrency = Math.max(1, Number(process.env.IMAGE_COMPRESS_CONCURRENCY || 4));
const dryRun = process.argv.includes("--dry-run");
const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif"]);

sharp.cache(false);

function gitTrackedImageFiles() {
  const out = execFileSync("git", ["ls-files"], { cwd: root, encoding: "utf8" });
  return out
    .split("\n")
    .filter(Boolean)
    .filter((file) => imageExtensions.has(path.extname(file).toLowerCase()))
    .filter((file) => {
      const abs = path.join(root, file);
      return fs.existsSync(abs) && fs.statSync(abs).size > sourceMinBytes;
    });
}

function largestSide(metadata) {
  return Math.max(metadata.width || 0, metadata.height || 0);
}

function resizeSteps(metadata, steps) {
  const maxSide = largestSide(metadata);
  return [null, ...steps.filter((step) => maxSide > step)];
}

function outputFormat(metadata) {
  if (metadata.format === "jpeg") return "jpeg";
  if (metadata.format === "png") return "png";
  if (metadata.format === "webp") return "webp";
  if (metadata.format === "heif" || metadata.format === "avif") return "avif";
  return null;
}

function buildPlans(format, metadata) {
  if (format === "jpeg") {
    const qualities = [82, 79, 76, 73, 70, 67, 64, 61, 58, 55, 52, 49, 46, 43, 40, 37, 34, 31, 28, 25, 22, 20];
    return resizeSteps(metadata, [1800, 1600, 1400, 1200, 1000, 850, 720, 640, 560, 480, 420, 360, 320])
      .flatMap((maxDim) => qualities.map((quality) => ({ format, maxDim, quality })));
  }

  if (format === "webp") {
    const qualities = [78, 75, 72, 69, 66, 63, 60, 57, 54, 51, 48, 45, 42, 39, 36, 33, 30, 27, 24, 21, 18];
    return resizeSteps(metadata, [1600, 1400, 1200, 1000, 850, 720, 640, 560, 480, 420, 360, 320])
      .flatMap((maxDim) => qualities.map((quality) => ({ format, maxDim, quality })));
  }

  if (format === "avif") {
    const qualities = [48, 45, 42, 39, 36, 33, 30, 27, 24, 21, 18, 15];
    return resizeSteps(metadata, [1600, 1400, 1200, 1000, 850, 720, 640, 560, 480, 420, 360, 320])
      .flatMap((maxDim) => qualities.map((quality) => ({ format, maxDim, quality })));
  }

  if (format === "png") {
    const colours = [256, 224, 192, 160, 128, 96, 80, 64, 48, 32, 24, 16, 12, 8];
    return resizeSteps(metadata, [1400, 1200, 1000, 850, 720, 640, 560, 480, 420, 360, 320, 280])
      .flatMap((maxDim) =>
        colours.map((count) => ({
          format,
          maxDim,
          colours: count,
          quality: count >= 128 ? 82 : count >= 64 ? 74 : count >= 32 ? 66 : 58,
        })),
      );
  }

  return [];
}

async function encodeCandidate(abs, plan) {
  let image = sharp(abs, { animated: false, limitInputPixels: false }).rotate();
  if (plan.maxDim) {
    image = image.resize({
      width: plan.maxDim,
      height: plan.maxDim,
      fit: "inside",
      kernel: "lanczos3",
      withoutEnlargement: true,
    });
  }

  if (plan.format === "jpeg") {
    return image.jpeg({ quality: plan.quality, mozjpeg: true, progressive: true }).toBuffer();
  }
  if (plan.format === "webp") {
    return image.webp({ quality: plan.quality, effort: 6 }).toBuffer();
  }
  if (plan.format === "avif") {
    return image.avif({ quality: plan.quality, effort: 6 }).toBuffer();
  }
  if (plan.format === "png") {
    return image
      .png({
        palette: true,
        colours: plan.colours,
        quality: plan.quality,
        compressionLevel: 9,
        adaptiveFiltering: true,
        effort: 9,
        dither: 0.85,
      })
      .toBuffer();
  }
  throw new Error(`Unsupported output format: ${plan.format}`);
}

async function compressOne(file) {
  const abs = path.join(root, file);
  const before = fs.statSync(abs).size;
  const metadata = await sharp(abs, { animated: true, limitInputPixels: false }).metadata();
  if ((metadata.pages || 1) > 1) {
    return { status: "skipped-animated", file, before };
  }

  const format = outputFormat(metadata);
  if (!format) {
    return { status: "skipped-format", file, before, format: metadata.format || "unknown" };
  }

  let fallback = null;
  for (const plan of buildPlans(format, metadata)) {
    const buffer = await encodeCandidate(abs, plan);
    const after = buffer.length;
    if (after >= before) continue;
    if (!fallback || after < fallback.after) fallback = { buffer, after, plan };
    if (after <= targetMaxBytes) {
      if (!dryRun) {
        const tmp = `${abs}.compress-${process.pid}`;
        fs.writeFileSync(tmp, buffer);
        fs.renameSync(tmp, abs);
      }
      return { status: "compressed", file, before, after, plan };
    }
  }

  if (fallback) {
    if (!dryRun) {
      const tmp = `${abs}.compress-${process.pid}`;
      fs.writeFileSync(tmp, fallback.buffer);
      fs.renameSync(tmp, abs);
    }
    return { status: "compressed-over-target", file, before, after: fallback.after, plan: fallback.plan };
  }

  return { status: "unchanged", file, before };
}

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function run() {
  const files = gitTrackedImageFiles();
  const results = [];
  let index = 0;
  let done = 0;

  async function worker() {
    while (index < files.length) {
      const file = files[index++];
      try {
        const result = await compressOne(file);
        results.push(result);
      } catch (error) {
        results.push({ status: "failed", file, error: error.message });
      }

      done += 1;
      if (done % 50 === 0 || done === files.length) {
        console.log(`Processed ${done}/${files.length}`);
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, files.length) }, worker));

  const compressed = results.filter((item) => item.status === "compressed" || item.status === "compressed-over-target");
  const beforeTotal = compressed.reduce((sum, item) => sum + item.before, 0);
  const afterTotal = compressed.reduce((sum, item) => sum + item.after, 0);
  const overTarget = results.filter((item) => item.status === "compressed-over-target");
  const skipped = results.filter((item) => item.status.startsWith("skipped"));
  const failed = results.filter((item) => item.status === "failed");

  console.log("");
  console.log(`Scanned heavy tracked images: ${files.length}`);
  console.log(`Compressed: ${compressed.length}`);
  console.log(`Saved: ${formatKb(beforeTotal - afterTotal)} (${formatKb(beforeTotal)} -> ${formatKb(afterTotal)})`);
  if (overTarget.length) {
    console.log(`Still above target: ${overTarget.length}`);
    overTarget
      .sort((a, b) => b.after - a.after)
      .slice(0, 20)
      .forEach((item) => console.log(`  ${formatKb(item.after)} ${item.file}`));
  }
  if (skipped.length) {
    console.log(`Skipped: ${skipped.length}`);
    skipped.slice(0, 20).forEach((item) => console.log(`  ${item.status} ${item.file}`));
  }
  if (failed.length) {
    console.log(`Failed: ${failed.length}`);
    failed.slice(0, 20).forEach((item) => console.log(`  ${item.file}: ${item.error}`));
    process.exitCode = 1;
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
