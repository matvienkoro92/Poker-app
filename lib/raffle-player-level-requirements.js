"use strict";

// Fixed targets requested by the club owner on 2026-09-09.
// Match both identities so changing a login or Poker21 binding cannot reset the target.
const REQUIREMENTS = [
  { accountId: "ID319715", poker21Id: "524129", level: 30 },
  { accountId: "ID138504", poker21Id: "508911", level: 20 },
  { accountId: "ID864019", poker21Id: "773051", level: 9 },
  { accountId: "ID477374", poker21Id: "433837", level: 10 },
  { accountId: "ID182810", poker21Id: "108754", level: 16 },
  { accountId: "ID700388", poker21Id: "964474", level: 19 },
  { accountId: "ID197353", poker21Id: "180560", level: 22 },
  { accountId: "ID506432", poker21Id: "255750", level: 10 },
  { accountId: "ID301661", poker21Id: "644956", level: 16 },
];

function playerRaffleRequiredLevel(accountId, poker21Id) {
  const account = String(accountId || "").trim();
  const poker21 = String(poker21Id || "").trim();
  return REQUIREMENTS.reduce((level, row) => (
    row.accountId === account || row.poker21Id === poker21 ? Math.max(level, row.level) : level
  ), 0);
}

function playerRaffleLevelError(accountId, poker21Id, currentLevel) {
  const required = playerRaffleRequiredLevel(accountId, poker21Id);
  if (!required || (Number.isFinite(Number(currentLevel)) && Number(currentLevel) >= required)) return null;
  return {
    ok: false,
    code: "RAFFLE_LEVEL_REQUIRED",
    error: "Чтобы участвовать в розыгрышах, достигните " + required + " уровня.",
    accessLevel: required,
    currentLevel: Number.isFinite(Number(currentLevel)) ? Number(currentLevel) : 0,
  };
}

module.exports = { playerRaffleRequiredLevel, playerRaffleLevelError };
