"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const source = fs.readFileSync(require.resolve("../app-player-crm-runtime-core.js"), "utf8");
const build = source.slice(source.indexOf("  function buildCrmLinkUrl("), source.indexOf("  function copyCrmLinkText("));
function setup(standalone) {
  const scope = {
    getWebsiteOriginBaseForLinks: () => "https://club.example/",
    POKER_DEFAULT_TELEGRAM_MINI_APP_URL: "https://t.me/club_bot/app",
    getAppBaseUrlForLinks: () => standalone ? "https://club.example/" : "https://t.me/club_bot/app"
  };
  vm.runInNewContext(build, scope);
  return scope.buildCrmLinkUrl;
}
for (const standalone of [false, true]) {
  test(`explicit destinations remain stable (standalone=${standalone})`, () => {
    const url = setup(standalone);
    assert.equal(url("ref_123", "website"), "https://club.example?startapp=ref_123");
    assert.equal(url("ref_123", "telegram"), "https://t.me/club_bot/app?startapp=ref_123");
    assert.equal(url("ref_123"), standalone ? "https://club.example?startapp=ref_123" : "https://t.me/club_bot/app?startapp=ref_123");
  });
}
