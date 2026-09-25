(function () {
  "use strict";

  function textElement(tag, className, value) {
    var element = document.createElement(tag);
    if (className) element.className = className;
    element.textContent = value;
    return element;
  }

  function prizeWord(count) {
    var last = count % 10;
    var lastTwo = count % 100;
    return count + " побед" + (last === 1 && lastTwo !== 11 ? "а" : last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14) ? "ы" : "");
  }

  function appendRanking(dialog, title, names, totals, money) {
    var section = document.createElement("section");
    section.className = "home-tournament-history-dialog__ranking";
    section.appendChild(textElement("h3", "", title));
    if (!names.length) {
      section.appendChild(textElement("p", "home-tournament-history-dialog__empty", "Пока нет сохранённых результатов."));
    }
    names.forEach(function (nick, index) {
      var row = document.createElement("div");
      row.className = "home-tournament-history-dialog__rank-row";
      row.appendChild(textElement("span", "", (index + 1) + ". " + nick));
      row.appendChild(textElement("strong", "", prizeWord(totals[nick].wins) + " · " + money.format(totals[nick].prize) + " ₽"));
      section.appendChild(row);
    });
    dialog.appendChild(section);
  }

  function openHistory(button) {
    var weekday = Number(button.getAttribute("data-tournament-weekday"));
    var source = typeof HOME_TOURNAMENT_HISTORY_BY_WEEKDAY !== "undefined" && HOME_TOURNAMENT_HISTORY_BY_WEEKDAY[weekday];
    var selectedBuyin = Number(String(button.getAttribute("data-tournament-buyin") || "").replace(/\D/g, ""));
    var results = source && source.buyin === selectedBuyin && Array.isArray(source.results) ? source.results : [];
    var name = button.getAttribute("data-tournament-name") || "Турнир";
    var buyin = button.getAttribute("data-tournament-buyin") || "—";
    var day = button.getAttribute("data-tournament-day") || "Турнирный день";
    var time = button.getAttribute("data-tournament-time") || "18:00";
    var guarantee = button.getAttribute("data-tournament-guarantee") || "—";
    var money = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 2 });
    var oldDialog = document.getElementById("homeTournamentHistoryDialog");
    if (oldDialog) oldDialog.remove();
    var dialog = document.createElement("dialog");
    dialog.id = "homeTournamentHistoryDialog";
    dialog.className = "home-tournament-history-dialog";

    var close = textElement("button", "home-tournament-history-dialog__close", "×");
    close.type = "button";
    close.setAttribute("aria-label", "Закрыть историю турнира");
    close.addEventListener("click", function () { dialog.close(); });
    dialog.appendChild(close);
    dialog.appendChild(textElement("h2", "", name + " " + buyin + " · рейтинг призёров"));
    var period = results.length ? " Результаты с " + results[0][0] + " по " + results[results.length - 1][0] + "." : " Сохранённых результатов пока нет.";
    dialog.appendChild(textElement("p", "", day + ", " + time + " МСК · бай-ин " + buyin + " · призовой фонд " + guarantee + "." + period));

    var winners = Object.create(null);
    var overall = Object.create(null);
    results.forEach(function (entry) {
      entry[1].forEach(function (player) {
        var nick = player[1];
        if (!overall[nick]) overall[nick] = { wins: 0, prize: 0 };
        overall[nick].prize += player[2];
        if (player[0] !== 1) return;
        overall[nick].wins += 1;
        if (!winners[nick]) winners[nick] = { wins: 0, prize: 0 };
        winners[nick].wins += 1;
        winners[nick].prize += player[2];
      });
    });
    function sortedNames(totals) {
      return Object.keys(totals).sort(function (a, b) {
        return totals[b].wins - totals[a].wins || totals[b].prize - totals[a].prize || a.localeCompare(b, "ru");
      });
    }
    appendRanking(dialog, "Победители · по числу первых мест", sortedNames(winners), winners, money);
    appendRanking(dialog, "Общий рейтинг топ‑3 · победы и призовые", sortedNames(overall), overall, money);
    dialog.appendChild(textElement("h3", "home-tournament-history-dialog__section-title", "Топ‑3 по датам"));
    var list = document.createElement("div");
    list.className = "home-tournament-history-dialog__list";
    results.slice().reverse().forEach(function (entry) {
      var section = document.createElement("section");
      section.appendChild(textElement("h3", "", entry[0]));
      entry[1].forEach(function (player) {
        var row = document.createElement("div");
        row.className = "home-tournament-history-dialog__row";
        row.appendChild(textElement("span", "", player[0] + ". " + player[1]));
        row.appendChild(textElement("strong", "", money.format(player[2]) + " ₽"));
        section.appendChild(row);
      });
      list.appendChild(section);
    });
    dialog.appendChild(list);
    dialog.appendChild(textElement("p", "home-tournament-history-dialog__note", "Показаны только результаты игроков клуба, сохранённые в приложении. Отсутствующие места в топ‑3 неизвестны."));
    dialog.addEventListener("click", function (event) { if (event.target === dialog) dialog.close(); });
    document.body.appendChild(dialog);
    dialog.showModal();
  }

  document.addEventListener("click", function (event) {
    var button = event.target && event.target.closest && event.target.closest("#homeTournamentHistoryOpen");
    if (button) openHistory(button);
  });
})();
