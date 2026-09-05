#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const previewDir = path.join(root, "assets", "rating-compressed-preview");
const mapFiles = [
  "spring-rating-images-league1.js",
  "spring-rating-images-league2.js",
  "summer-rating-images-league1.js",
  "summer-rating-images-league2.js",
];
const concurrency = Math.max(1, Number(process.env.RATING_PREVIEW_CONCURRENCY || 4));
const quality = Math.max(1, Math.min(100, Number(process.env.RATING_PREVIEW_AVIF_QUALITY || 45)));
const batchSize = Math.max(1, Number(process.env.RATING_PREVIEW_BATCH_SIZE || 60));

sharp.cache(false);

function referencedJpegs() {
  const refs = new Set();
  const pattern = /rating-compressed-preview\/[^"'`\s)]+\.jpe?g/gi;
  for (const file of mapFiles) {
    const source = fs.readFileSync(path.join(root, file), "utf8");
    let match;
    while ((match = pattern.exec(source))) refs.add(match[0]);
  }
  return Array.from(refs).sort();
}

async function convert(relative) {
  const input = path.join(root, "assets", relative);
  const outputRelative = relative.replace(/\.jpe?g$/i, ".avif");
  const output = path.join(root, "assets", outputRelative);
  if (!fs.existsSync(input)) return { status: "missing", relative };
  const before = fs.statSync(input).size;
  if (fs.existsSync(output)) {
    const after = fs.statSync(output).size;
    if (after < before) return { status: "converted-existing", relative, outputRelative, before, after };
    return { status: "collision", relative, outputRelative, before, after };
  }

  const temporary = output + `.tmp-${process.pid}`;
  await sharp(input, { limitInputPixels: false })
    .rotate()
    .avif({ quality, effort: 4 })
    .toFile(temporary);
  const after = fs.statSync(temporary).size;
  if (after >= before) {
    fs.rmSync(temporary, { force: true });
    return { status: "not-smaller", relative, before, after };
  }
  fs.renameSync(temporary, output);
  return { status: "converted", relative, outputRelative, before, after };
}

async function main() {
  const referenced = referencedJpegs();
  const existingOutputs = referenced.filter((relative) =>
    fs.existsSync(path.join(root, "assets", relative.replace(/\.jpe?g$/i, ".avif"))),
  );
  const pending = referenced.filter((relative) => !existingOutputs.includes(relative));
  const queue = existingOutputs.concat(pending.slice(0, batchSize));
  const results = [];
  let index = 0;

  async function worker() {
    while (index < queue.length) {
      const relative = queue[index++];
      results.push(await convert(relative));
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, queue.length) }, worker));

  const converted = results.filter((item) => item.status === "converted" || item.status === "converted-existing");
  const skipped = results.filter((item) => item.status !== "converted" && item.status !== "converted-existing");
  const replacements = new Map(converted.map((item) => [item.relative, item.outputRelative]));
  for (const file of mapFiles) {
    const filePath = path.join(root, file);
    let source = fs.readFileSync(filePath, "utf8");
    for (const [before, after] of replacements) source = source.split(before).join(after);
    fs.writeFileSync(filePath, source);
  }
  if (!process.argv.includes("--keep-originals")) {
    for (const item of converted) fs.unlinkSync(path.join(root, "assets", item.relative));
  }

  const before = converted.reduce((sum, item) => sum + item.before, 0);
  const after = converted.reduce((sum, item) => sum + item.after, 0);
  console.log(JSON.stringify({
    referenced: referenced.length,
    scanned: queue.length,
    remainingForNextRun: Math.max(0, pending.length - batchSize),
    converted: converted.length,
    skipped: skipped.length,
    beforeMiB: +(before / 1048576).toFixed(2),
    afterMiB: +(after / 1048576).toFixed(2),
    savedMiB: +((before - after) / 1048576).toFixed(2),
    skippedDetails: skipped,
  }, null, 2));
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : error);
  process.exitCode = 1;
});
