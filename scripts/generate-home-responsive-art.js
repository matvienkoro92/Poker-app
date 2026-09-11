#!/usr/bin/env node
"use strict";
const path = require("node:path");
const fs = require("node:fs");
const sharp = require("sharp");
const assets = path.resolve(__dirname, "../assets");
const images = [
  ["home-lounge-chat-v1-light-v1.webp", "home-lounge-chat-v1-480.webp", 480],
  ["home-lounge-raffles-v1-light-v1.webp", "home-lounge-raffles-v1-480.webp", 480],
  ["home-lounge-players-v1-light-v1.webp", "home-lounge-players-v1-480.webp", 480],
  ["last-longer-chip-reference-v1-light-v1.webp", "last-longer-chip-reference-v1-320.webp", 320],
  ["daily-poker-character-no-stacks-v1.webp", "daily-poker-character-no-stacks-v1-720.webp", 720],
];
async function main() {
  for (const [source, target, width] of images) {
    await sharp(path.join(assets, source)).resize({width,withoutEnlargement:true}).webp({quality:90,alphaQuality:100,effort:6}).toFile(path.join(assets,target));
    console.log(`${target}: ${fs.statSync(path.join(assets,source)).size} → ${fs.statSync(path.join(assets,target)).size} bytes`);
  }
}
main().catch(error=>{console.error(error);process.exitCode=1;});
