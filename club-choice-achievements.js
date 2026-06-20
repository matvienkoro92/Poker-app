(function () {
  "use strict";

  /*
   * Итоги клубного голосования за игрока месяца.
   * Формат месяца: YYYY-MM. В winners попадает только топ-1 голосования.
   * Пример:
   * {
   *   month: "2026-06",
   *   winners: [
   *     { place: 1, accountId: "ID403173", nick: "Waaar", votes: 42 }
   *   ]
   * }
   */
  window.POKER_CLUB_CHOICE_ACHIEVEMENTS = window.POKER_CLUB_CHOICE_ACHIEVEMENTS || [
    {
      month: "2026-05",
      winners: [
        { place: 1, nick: "Em13" },
      ],
    },
  ];
})();
