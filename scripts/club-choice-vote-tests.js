"use strict";

const assert = require("assert");
const { applyVote } = require("../lib/api-handlers/club-choice-vote")._test;

async function run() {
  const match = {
    votes: { left: 1, right: 0 },
    voters: {
      "p21:208238": {
        accountId: "ID400800",
        memberId: "tg_1",
        p21Id: "208238",
        candidateId: "left",
      },
    },
  };

  await applyVote(match, "right", {
    accountId: "ID494359",
    memberId: "mail_ID494359",
    p21Id: "208238",
  }, "ПокерМанки", "2026-08-06T10:00:00.000Z");

  assert.deepStrictEqual(match.votes, { left: 0, right: 1 });
  assert.deepStrictEqual(Object.keys(match.voters), ["p21:208238"]);
  assert.strictEqual(match.voters["p21:208238"].accountId, "ID494359");
  assert.strictEqual(match.voters["p21:208238"].candidateId, "right");

  await applyVote(match, "right", {
    accountId: "ID400800",
    memberId: "tg_1",
    p21Id: "208238",
  }, "ПокерМанки", "2026-08-06T10:01:00.000Z");
  assert.deepStrictEqual(match.votes, { left: 0, right: 1 });
  console.log("club-choice-vote tests: ok");
}

run().catch((error) => {
  console.error(error && error.stack || error);
  process.exitCode = 1;
});
