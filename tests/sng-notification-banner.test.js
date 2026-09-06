"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

test("third SNG banner and participant confirmation are used in notifications", () => {
  const source = fs.readFileSync(require.resolve("../lib/api-handlers/sng-champions"), "utf8");
  assert.match(source, /home-sng-champions-battle-3-v2\.webp\?v=3/);
  assert.match(source, /participantChatId[\s\S]*Вы записаны в[\s\S]*Списано: 1 000 ₽/);
  assert.match(source, /Новый участник в СНГ-баттле: /);
  assert.doesNotMatch(source, /Оплаченная запись в /);
});

const vm = require("node:vm");
const source = fs.readFileSync(require.resolve("../lib/api-handlers/sng-champions"), "utf8");
const imageHelper = source.slice(source.indexOf("async function sngApplicationImage("), source.indexOf("async function notifySngApplication("));
const { sngPlayerArt, artByNick } = require("../lib/sng-player-art");
async function applicationImage(entry) {
  const context = { sngPlayerArt, notificationArtPath: require("../lib/sng-notification-art").notificationArtPath, URL, sngBannerUrl: () => "https://example.com/assets/sng.webp" };
  vm.runInNewContext(imageHelper, context);
  return context.sngApplicationImage(entry, {});
}

test("SNG registration uses PokerManki character instead of profile photo", async () => {
  const result = await applicationImage({ pokerPlusNickname: "ПокерМанки", avatar: "data:image/jpeg;base64,YQ==" });
  assert.equal(result.imageUrl, "https://example.com" + require("../lib/sng-notification-art").notificationArtPath(sngPlayerArt({displayName: "ПокерМанки"})));
});

test("SNG registration falls back to banner even if an unknown player has a profile photo", async () => {
  const result = await applicationImage({ displayName: "Unknown player", avatar: "data:image/jpeg;base64,YQ==" });
  assert.equal(result.imageUrl, "https://example.com/assets/sng.webp");
});

test("SNG characters match the rating catalog", () => {
  const client = fs.readFileSync(require.resolve("../app-rating-view-adapter.js"), "utf8");
  const literal = client.match(/var SUMMER_RATING_PLAYER_ART_BY_NICK = (\{[\s\S]*?\n\});/)[1];
  const catalog = vm.runInNewContext("(" + literal + ")");
  assert.deepEqual(JSON.parse(JSON.stringify(artByNick)), JSON.parse(JSON.stringify(catalog)));
  for (const art of Object.values(artByNick)) {
    assert.ok(fs.existsSync(require("node:path").join(__dirname, "..", art.src.split("?")[0])));
  }
});

 test("notification fallback stays aligned with the current SNG banner", () => {
  const client = fs.readFileSync(require.resolve("../app-sng-champions.js"), "utf8");
  const server = source.match(/function sngBannerUrl[\s\S]*?return origin \+ asset;/)[0];
  for (const asset of server.matchAll(/assets\/[^" ]+/g)) assert.ok(client.includes(asset[0]));
});
