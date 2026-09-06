"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

test("third SNG banner and participant confirmation are used in notifications", () => {
  const source = fs.readFileSync(require.resolve("../lib/api-handlers/sng-champions"), "utf8");
  assert.match(source, /home-sng-champions-battle-3\.webp\?v=1/);
  assert.match(source, /participantChatId[\s\S]*Вы записаны в[\s\S]*Списано: 1 000 ₽/);
  assert.match(source, /Новый участник в СНГ-баттле: /);
  assert.doesNotMatch(source, /Оплаченная запись в /);
});

const vm = require("node:vm");
const source = fs.readFileSync(require.resolve("../lib/api-handlers/sng-champions"), "utf8");
const imageHelper = source.slice(source.indexOf("async function sngApplicationImage("), source.indexOf("async function notifySngApplication("));
async function applicationImage(avatars, fail = false) {
  const context = {
    getPokerPlusBoundAccountIds: async () => ({ p21: ["linked"] }),
    getAvatars: async () => { if (fail) throw new Error("offline"); return avatars; },
    sngBannerUrl: () => "https://example.com/sng.webp",
    console: { warn() {} },
  };
  vm.runInNewContext(imageHelper, context);
  return context.sngApplicationImage({ accountId: "account", memberId: "tg_12345", pokerPlusUserId: "p21" }, {});
}

test("SNG application uses the saved personal avatar", async () => {
  const result = await applicationImage({ account: "data:image/jpeg;base64,YQ==" });
  assert.equal(result.imageDataUrl, "data:image/jpeg;base64,YQ==");
  assert.equal(result.imageUrl, undefined);
});

test("SNG application finds personal avatar on a linked account ahead of a preset", async () => {
  const result = await applicationImage({ account: "./assets/avatar-tiger.jpg", linked: "data:image/png;base64,YQ==" });
  assert.equal(result.imageDataUrl, "data:image/png;base64,YQ==");
});

test("SNG application retains banner for missing avatars, presets and lookup failure", async () => {
  for (const [avatars, fail] of [[{}, false], [{ account: "./assets/avatar-tiger.jpg" }, false], [{}, true]]) {
    const result = await applicationImage(avatars, fail);
    assert.equal(result.imageUrl, "https://example.com/sng.webp");
    assert.equal(result.imageDataUrl, undefined);
  }
});
