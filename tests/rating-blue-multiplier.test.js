"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const path = require("node:path");
const { detectBlueInterface, parseSnippetInput, verifySourceMultipliers } = require("../scripts/rating-entry-helper");

test("blue screenshots cannot be imported without x100 multiplier", async () => {
  const parsed = parseSnippetInput(`date: 04.08.2026\nleague: 2\ntime: 20:00\nname: Test\nsource: ${__filename}\nplayers:\n1 | Player | 12.34\n`);
  await assert.rejects(
    verifySourceMultipliers(parsed.tournaments, async () => true),
    /requires blue: yes or multiplier: 100/
  );
});

test("blue: yes enables x100 multiplier verification", async () => {
  const parsed = parseSnippetInput(`date: 04.08.2026\nleague: 2\nblue: yes\ntime: 20:00\nname: Test\nsource: ${__filename}\nplayers:\n1 | Player | 12.34\n`);
  await verifySourceMultipliers(parsed.tournaments, async () => true);
  assert.equal(parsed.tournaments[0].multiplier, 100);
});

test("interface detector distinguishes saved blue and red rating screenshots", async () => {
  const assets = path.resolve(__dirname, "../assets/rating-compressed-preview");
  assert.equal(await detectBlueInterface(path.join(assets, "rating-04-08-2026-league2-s-bounty-2-3-120k-00h.avif")), true);
  assert.equal(await detectBlueInterface(path.join(assets, "rating-04-08-2026-league2-tournament-rebuy-14h.avif")), false);
});
