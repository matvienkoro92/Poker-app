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
const displayImages = [
  ["logo-two-aces.png", 256],
  ["daily-poker-character-no-stacks-v1.webp", 720],
  ["home-lounge-chat-v1-light-v1.webp", 480],
  ["home-lounge-raffles-v1-light-v1.webp", 480],
  ["home-lounge-players-v1-light-v1.webp", 480],
  ["home-lounge-background-v1.webp", 1200],
  ["home-tournament-shtukatur-transparent-v8-light-v1.webp", 960],
  ["home-tournament-shtukatur-bucket-name-v1-light-v1.webp", 960],
  ["home-table-seam-no-glow-v1.webp", 960],
  ["home-tournament-cooler-scene-v1.webp", 960],
  ["home-tournament-raffle-chest-scene-v1.webp", 960],
  ["home-rating-rocket-monkey.png", 284],
  ["home-games-learn-card-v2.webp", 560],
  ["home-games-partnership-card.webp", 560],
  ["summer-rating-league2-player-shkarubo-light-v1.webp", 640],
  ["club-news-personal/bardur-news-cutout.webp", 720],
  ["club-news-personal/rybnadzor-big-fish-transparent-v2.webp", 640],
  ["daily-poker-monkey.webp", 400],
];
const presetNames = ["tiger", "raccoon", "skull", "phoenix", "octopus", "cat", "robot", "bulldog", "fox", "chip", "koala", "raven", "crocodile", "rabbit", "chameleon", "panda", "wolf", "owl", "bat", "gorilla"];
presetNames.forEach(name => displayImages.push(["avatar-" + name + ".jpg", 256]));
const displayTarget = source => source.replace(/\.[^.]+$/, "-display-v1.webp");
// Preserve full canvas coordinates. These layers are clipped/masked by
// styles-home-tournament-scene.css; pixels outside padded bounds never show.
const visibleBounds = {
  "home-tournament-shtukatur-bucket-name-v1-light-v1.webp": [0.04, 0.39, 0.27, 0.51],
  "home-table-seam-no-glow-v1.webp": [0, 0.55, 1, 0.64],
  "home-tournament-raffle-chest-scene-v1.webp": [0, 0.31, 0.31, 0.58],
};
async function main() {
  const only = process.env.HOME_ART_ONLY ? process.env.HOME_ART_ONLY.split(",") : null;
  for (const [source, target, width] of only ? [] : images) {
    await sharp(path.join(assets, source)).resize({width,withoutEnlargement:true}).webp({quality:90,alphaQuality:100,effort:6}).toFile(path.join(assets,target));
    console.log(`${target}: ${fs.statSync(path.join(assets,source)).size} → ${fs.statSync(path.join(assets,target)).size} bytes`);
  }
  for (const [source, width] of displayImages) {
    if (only && !only.includes(source)) continue;
    const target = displayTarget(source);
    let input = path.join(assets, source);
    if (visibleBounds[source]) {
      const m = await sharp(input).metadata(), b = visibleBounds[source];
      const left = Math.floor(m.width*b[0]), top = Math.floor(m.height*b[1]);
      const right = Math.ceil(m.width*b[2]), bottom = Math.ceil(m.height*b[3]);
      input = await sharp(input).extract({left,top,width:right-left,height:bottom-top})
        .extend({left,top,right:m.width-right,bottom:m.height-bottom,background:{r:0,g:0,b:0,alpha:0}}).png().toBuffer();
    }
    await sharp(input).resize({width,withoutEnlargement:true}).webp({quality:84,alphaQuality:100,effort:6}).toFile(path.join(assets,target));
    console.log(`${target}: ${fs.statSync(path.join(assets,source)).size} → ${fs.statSync(path.join(assets,target)).size} bytes`);
  }
}
if (require.main === module) main().catch(error=>{console.error(error);process.exitCode=1;});
module.exports = { displayImages, displayTarget };
