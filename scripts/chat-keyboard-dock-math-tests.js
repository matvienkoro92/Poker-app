#!/usr/bin/env node
"use strict";

const assert = require("assert");
const {
  pokerChatClampNumber,
  pokerChatVisualViewportMetrics,
  pokerChatFallbackInsetMetrics,
  pokerChatViewportCoverMetrics,
} = require("../app-chat-keyboard-dock-math.js");

assert.strictEqual(pokerChatClampNumber(12, 0, 10), 10);
assert.strictEqual(pokerChatClampNumber(-2, 0, 10), 0);
assert.strictEqual(pokerChatClampNumber("7", 0, 10), 7);

assert.deepStrictEqual(
  pokerChatVisualViewportMetrics({ innerHeight: 800, visualViewportHeight: 500, offsetTop: 0 }),
  { vvh: 500, ih: 800, offsetTop: 0, heightLoss: 300, overlap: 300 }
);

assert.deepStrictEqual(
  pokerChatVisualViewportMetrics({ innerHeight: 800, visualViewportHeight: 760, offsetTop: 36 }),
  { vvh: 760, ih: 800, offsetTop: 36, heightLoss: 40, overlap: 40 }
);

const fallback = pokerChatFallbackInsetMetrics({ innerHeight: 700, baseline: 900, hasFocusedComposer: false });
assert.strictEqual(fallback.loss, 200);
assert(fallback.inset >= 170 && fallback.inset <= fallback.cap);

const focusedFallback = pokerChatFallbackInsetMetrics({ innerHeight: 700, baseline: 700, hasFocusedComposer: true });
assert.strictEqual(focusedFallback.loss, 0);
assert(focusedFallback.inset >= Math.round(700 * 0.38));

const cover = pokerChatViewportCoverMetrics({
  innerHeight: 620,
  visualViewportHeight: 430,
  offsetTop: 0,
  baseline: 760,
});
assert.strictEqual(cover.overlap, 190);
assert.strictEqual(cover.winLoss, 140);
assert.strictEqual(cover.cover, 190);

console.log(JSON.stringify({ ok: true, checks: 8 }, null, 2));
