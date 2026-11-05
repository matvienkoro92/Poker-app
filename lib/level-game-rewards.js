'use strict';

function gameLevelRewards() {
  const nards = require('./nards-equipment');
  const chess = require('./chess-equipment');
  const tables = require('../app-billiards-tables');
  const cues = require('../app-billiards-cues');
  const groups = [
    ['Нарды · доски', nards.NARDS_BOARDS],
    ['Нарды · внутренняя отделка', nards.NARDS_INTERIORS],
    ['Нарды · кубики', nards.NARDS_DICE],
    ['Нарды · шашки', [...nards.LUXURY_CHECKERS, ...nards.DESIGN_CHECKERS]],
    ['Шахматы · доски', chess.BOARDS],
    ['Шахматы · фигуры', chess.PIECES],
    ['Бильярд · столы', tables.skins],
    ['Бильярд · кии', cues.cues.filter(item => !item.superShotWins)],
  ];
  return groups.flatMap(([category, items]) => items.filter(item => item.level > 0)
    .map(item => ({category, title: item.name, level: item.level})));
}

module.exports = {gameLevelRewards};
