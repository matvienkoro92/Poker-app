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
