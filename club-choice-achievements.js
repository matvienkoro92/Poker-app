(function () {
  "use strict";

  /*
   * Итоги клубного голосования за достижение месяца.
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
        {
          place: 1,
          nick: "Em13!!",
          description: "Выигрыш 2 300 000р в мейне в Калининграде за 1е место. Отобрался с сателлита за 300р в сателлит за 1200р, там выиграл путевку за 120 000р в Калининград, включающую билет на мейн, и выиграл Мейн.",
        },
      ],
    },
  ];
})();
