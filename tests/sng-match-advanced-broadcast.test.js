"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync(require.resolve("../lib/api-handlers/sng-champions"), "utf8");
const helpers = source.slice(
  source.indexOf("function pendingMatchForParticipant("),
  source.indexOf("async function buildMatchStartedNotifications(")
);

function createContext() {
  const context = {
    cleanText: (value) => String(value || ""),
    playableIds: (match) => (match && Array.isArray(match.playerIds) ? match.playerIds : []).filter(Boolean),
    participantDisplayName: (state, id) => state.names[id] || id,
    participantTeamMembersText: () => "",
    tournamentStageMessageLabel: (_state, round) => round.stage,
    nextRoundForMatch: () => null,
    buildTournamentBroadcastNotifications: async (_state, action, text) => [{ action, text }],
  };
  vm.createContext(context);
  vm.runInContext(helpers, context);
  return context;
}

test("match result broadcast adds the loser's next stage and known opponent in a new paragraph", async () => {
  const context = createContext();
  const completedMatch = { id: "upper-1", playerIds: ["winner", "loser"], winnerId: "winner" };
  const state = {
    status: "bracket",
    loserBracketEnabled: true,
    names: { winner: "EnotSimuran", loser: "Тигр", opponent: "Лев" },
    rounds: [{ stage: "1/16", matches: [completedMatch] }],
    loserRounds: [{ stage: "L 1/8", matches: [{ id: "lower-1", playerIds: ["loser", "opponent"], winnerId: "" }] }],
  };

  const notifications = await context.buildMatchAdvancedBroadcastNotifications(state, state.rounds[0], completedMatch, "winner");

  assert.match(notifications[0].text, /\n\nИгрок Тигр переходит в стадию «L 1\/8» и встретится с Лев\.$/);
});

test("match result broadcast says when the loser is waiting for an opponent", async () => {
  const context = createContext();
  const completedMatch = { id: "upper-1", playerIds: ["winner", "loser"], winnerId: "winner" };
  const state = {
    status: "bracket",
    loserBracketEnabled: true,
    names: { winner: "EnotSimuran", loser: "Тигр" },
    rounds: [{ stage: "1/16", matches: [completedMatch] }],
    loserRounds: [{ stage: "L 1/8", matches: [{ id: "lower-1", playerIds: ["loser", ""], winnerId: "" }] }],
  };

  const notifications = await context.buildMatchAdvancedBroadcastNotifications(state, state.rounds[0], completedMatch, "winner");

  assert.match(notifications[0].text, /\n\nИгрок Тигр переходит в стадию «L 1\/8» и ожидает соперника\.$/);
});
