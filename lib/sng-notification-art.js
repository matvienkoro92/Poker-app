"use strict";
const crypto = require("node:crypto");
function notificationArtPath(art) {
  return "/assets/sng-notifications/" + crypto.createHash("sha256").update(art).digest("hex").slice(0, 16) + ".jpg";
}
module.exports = { notificationArtPath };
