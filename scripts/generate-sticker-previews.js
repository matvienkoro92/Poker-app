#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const root = path.join(__dirname, "..");
async function main() {
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const refs = [...new Set([...html.matchAll(/assets\/sticker-previews\/(league\d\/[^"?]+)\.webp/g)].map((match) => match[1]))];
  let before = 0, after = 0;
  for (const ref of refs) {
    const input = path.join(root, "assets/stickers", ref + ".png");
    const output = path.join(root, "assets/sticker-previews", ref + ".webp");
    if (!fs.existsSync(input)) throw new Error("Missing sticker original: " + input);
    fs.mkdirSync(path.dirname(output), { recursive: true });
    if (!fs.existsSync(output) || fs.statSync(output).mtimeMs < fs.statSync(input).mtimeMs) {
      await sharp(input).resize({ width: 512, height: 512, fit: "inside", withoutEnlargement: true }).webp({ quality: 85, effort: 5 }).toFile(output);
    }
    before += fs.statSync(input).size;
    after += fs.statSync(output).size;
  }
  console.log(JSON.stringify({ stickers: refs.length, originalMiB: +(before / 1048576).toFixed(2), previewMiB: +(after / 1048576).toFixed(2) }));
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
