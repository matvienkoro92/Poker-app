(function () {
  "use strict";

  /*
   * Итоги клубного голосования за игрока месяца.
   * Формат месяца: YYYY-MM. В winners попадает топ-2 голосования.
   * Пример:
   * {
   *   month: "2026-06",
   *   winners: [
   *     { place: 1, accountId: "ID403173", nick: "Waaar", votes: 42 },
   *     { place: 2, accountId: "ID000000", nick: "Player", votes: 31 }
   *   ]
   * }
   */
  window.POKER_CLUB_CHOICE_ACHIEVEMENTS = window.POKER_CLUB_CHOICE_ACHIEVEMENTS || [];
})();
