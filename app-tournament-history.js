(function () {
  "use strict";

  // Friday 18:00, 500 ₽. Historical rating entries call it "Пятница Прогрессив".
  // Only recorded club players are available; missing podium places are unknown.
  var results = [
    ["01.05", [[2, "XORTYRETSKOGO", 17050], [3, "Stepchik", 13807.34]]],
    ["08.05", [[1, "Coo1er91", 23100.42], [3, "AlenaSt", 7134.69]]],
    ["15.05", [[1, "ПокерМанки", 27089.88], [2, "Mr.V", 14053.91], [3, "Prushnik", 7695.31]]],
    ["22.05", [[1, "Proxor", 32650.8], [3, "Coo1er91", 8188.75]]],
    ["29.05", [[2, "ПокерМанки", 20345.96], [3, "MORPEH", 12920.65]]],
    ["12.06", [[2, "Waaar", 16400], [3, "мистерFox", 7765]]],
    ["19.06", [[1, "Бабник", 29261.05], [2, "MilkyWay77", 26786.02], [3, "@Felix", 14234.22]]],
    ["03.07", [[1, "Ksuha🐉", 39516.25], [2, "Twisted-fate_08", 28434.97]]],
    ["10.07", [[1, "😘ЛяЛя🤢", 40332.47]]],
    ["24.07", [[1, "@Felix", 45767.8], [2, "SantaClauS", 22831.06]]],
    ["07.08", [[1, "FrankL", 35781.18], [2, "Waaar", 19467.45]]],
    ["14.08", [[1, "Damir86rus", 40743.92], [2, "Ksuha🐉", 22594.02]]],
    ["21.08", [[2, "AliySvin", 25314.8]]],
    ["28.08", [[2, "Waaar", 19841.06]]],
    ["04.09", [[1, "FrankL", 42829.62], [3, "IRIHKA", 11273.75]]],
    ["11.09", [[2, "MissClick", 21064.1]]],
    ["18.09", [[1, "IIIIII", 37878.14], [2, "I🐅I", 22985.89]]]
  ];

  function openHistory() {
    var dialog = document.getElementById("homeTournamentHistoryDialog");
    if (!dialog) {
      dialog = document.createElement("dialog");
      dialog.id = "homeTournamentHistoryDialog";
      dialog.className = "home-tournament-history-dialog";
      var close = document.createElement("button");
      close.type = "button";
      close.className = "home-tournament-history-dialog__close";
      close.setAttribute("aria-label", "Закрыть историю турнира");
      close.textContent = "×";
      close.addEventListener("click", function () { dialog.close(); });
      dialog.appendChild(close);
      var title = document.createElement("h2");
      title.textContent = "Нокаут · рейтинг победителей";
      dialog.appendChild(title);
      var intro = document.createElement("p");
      intro.textContent = "Пятничный турнир, 18:00, вход 500 ₽. Результаты игроков клуба с мая по 18 сентября 2026 года.";
      dialog.appendChild(intro);
      var money = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 2 });
      var winners = {};
      var overall = {};
      results.forEach(function (entry) {
        entry[1].forEach(function (player) {
          if (!overall[player[1]]) overall[player[1]] = { wins: 0, prize: 0 };
          overall[player[1]].prize += player[2];
          if (player[0] === 1) overall[player[1]].wins += 1;
          if (player[0] !== 1) return;
          if (!winners[player[1]]) winners[player[1]] = { wins: 0, prize: 0 };
          winners[player[1]].wins += 1;
          winners[player[1]].prize += player[2];
        });
      });
      var ranking = document.createElement("section");
      ranking.className = "home-tournament-history-dialog__ranking";
      var rankingTitle = document.createElement("h3");
      rankingTitle.textContent = "Победители · по числу первых мест";
      ranking.appendChild(rankingTitle);
      Object.keys(winners).sort(function (a, b) {
        return winners[b].wins - winners[a].wins || winners[b].prize - winners[a].prize || a.localeCompare(b, "ru");
      }).forEach(function (nick, index) {
        var row = document.createElement("div");
        row.className = "home-tournament-history-dialog__rank-row";
        var name = document.createElement("span");
        name.textContent = (index + 1) + ". " + nick;
        var value = document.createElement("strong");
        value.textContent = winners[nick].wins + " побед" + (winners[nick].wins === 1 ? "а" : "ы") + " · " + money.format(winners[nick].prize) + " ₽";
        row.appendChild(name);
        row.appendChild(value);
        ranking.appendChild(row);
      });
      dialog.appendChild(ranking);
      var overallRanking = document.createElement("section");
      overallRanking.className = "home-tournament-history-dialog__ranking home-tournament-history-dialog__ranking--overall";
      var overallTitle = document.createElement("h3");
      overallTitle.textContent = "Общий рейтинг топ‑3 · победы и призовые";
      overallRanking.appendChild(overallTitle);
      Object.keys(overall).sort(function (a, b) {
        return overall[b].wins - overall[a].wins || overall[b].prize - overall[a].prize || a.localeCompare(b, "ru");
      }).forEach(function (nick, index) {
        var row = document.createElement("div");
        row.className = "home-tournament-history-dialog__rank-row";
        var name = document.createElement("span");
        name.textContent = (index + 1) + ". " + nick;
        var value = document.createElement("strong");
        value.textContent = overall[nick].wins + " побед" + (overall[nick].wins === 1 ? "а" : overall[nick].wins >= 2 && overall[nick].wins <= 4 ? "ы" : "") + " · " + money.format(overall[nick].prize) + " ₽";
        row.appendChild(name);
        row.appendChild(value);
        overallRanking.appendChild(row);
      });
      dialog.appendChild(overallRanking);
      var listTitle = document.createElement("h3");
      listTitle.className = "home-tournament-history-dialog__section-title";
      listTitle.textContent = "Топ‑3 по датам";
      dialog.appendChild(listTitle);
      var list = document.createElement("div");
      list.className = "home-tournament-history-dialog__list";
      results.slice().reverse().forEach(function (entry) {
        var section = document.createElement("section");
        var heading = document.createElement("h3");
        heading.textContent = entry[0] + ".2026";
        section.appendChild(heading);
        entry[1].forEach(function (player) {
          var row = document.createElement("div");
          row.className = "home-tournament-history-dialog__row";
          var name = document.createElement("span");
          name.textContent = player[0] + ". " + player[1];
          var prize = document.createElement("strong");
          prize.textContent = money.format(player[2]) + " ₽";
          row.appendChild(name);
          row.appendChild(prize);
          section.appendChild(row);
        });
        list.appendChild(section);
      });
      dialog.appendChild(list);
      var note = document.createElement("p");
      note.className = "home-tournament-history-dialog__note";
      note.textContent = "Показаны только результаты, сохранённые в приложении. Пустые места в топ‑3 неизвестны; за 05.06, 17.07 и 31.07 записей о призёрах нет.";
      dialog.appendChild(note);
      dialog.addEventListener("click", function (event) { if (event.target === dialog) dialog.close(); });
      document.body.appendChild(dialog);
    }
    dialog.showModal();
  }

  document.addEventListener("click", function (event) {
    if (event.target && event.target.closest && event.target.closest("#homeTournamentHistoryOpen")) openHistory();
  });
})();
