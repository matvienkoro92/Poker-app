// Exercise the archived puzzle without replacing a live campaign chapter.
const fs = require("node:fs");
const vm = require("node:vm");
const sandbox = {LastBuyInChapters: []};
sandbox.LastBuyInChapters[10] = {mode: "portal", goal: "Порталы"};
vm.runInNewContext(fs.readFileSync(require.resolve("../../app-last-buy-in-campaign-engine"), "utf8"), sandbox);
module.exports = sandbox.LastBuyInCampaignEngine;
