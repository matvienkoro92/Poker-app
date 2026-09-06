"use strict";
const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");
const { artByNick } = require("../lib/sng-player-art");
const { notificationArtPath } = require("../lib/sng-notification-art");
const root = path.resolve(__dirname, "..");
(async () => {
  const sources = [...new Set(Object.values(artByNick).map(art => art.src))];
  await fs.mkdir(path.join(root, "public/assets/sng-notifications"), { recursive: true });
  for (const art of sources) {
    const input = art.includes("summer-rating-player-pokermanki-v2") ? "assets/sng-pokermanki-white.png" : art.split("?")[0];
    await sharp(path.join(root, input)).resize({ width: 1000, height: 1000, fit: "contain", background: "#ffffff" })
      .flatten({ background: "#ffffff" }).jpeg({ quality: 92 })
      .toFile(path.join(root, "public", notificationArtPath(art)));
  }
  console.log("Generated white SNG notification images:", sources.length);
})().catch(error => { console.error(error); process.exitCode = 1; });
