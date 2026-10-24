'use strict';
// The opening roll and each player's first turn allow time to learn the board.
module.exports = function turnLimitSeconds(state, regularSeconds) {
  return ['short','long'].includes(state?.discipline) && (state.turns?.[state.turn] || 0) === 0 ? 90 : regularSeconds;
};
