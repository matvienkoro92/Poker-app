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

  function renderHistory(dialog, tournament) {
    var source = typeof HOME_TOURNAMENT_HISTORY_BY_WEEKDAY !== "undefined" &&
      HOME_TOURNAMENT_HISTORY_BY_WEEKDAY[tournament.historyKey];
    var selectedBuyin = Number(String(tournament.buyin || "").replace(/\D/g, ""));
    var results = source && source.buyin === selectedBuyin && Array.isArray(source.results) ? source.results : [];
    var name = tournament.name || "Турнир";
    var buyin = tournament.buyin || "—";
    var day = tournament.day || "Турнирный день";
    if (source && source.buyin === selectedBuyin && source.historyDays) day = source.historyDays;
    var time = (tournament.time || "18:00").replace(/\s+МСК$/i, "");
    var guarantee = tournament.guarantee || "—";
    var money = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 2 });
    var heading = textElement("h2", "", name + " " + buyin + " · рейтинг призёров");
    heading.id = "homeTournamentHistoryTitle";
    dialog.appendChild(heading);
    var period = results.length ? " Результаты с " + results[0][0] + " по " + results[results.length - 1][0] + "." : " Сохранённых результатов пока нет.";
    dialog.appendChild(textElement("p", "", day + ", " + time + " МСК · бай-ин " + buyin + " · призовой фонд " + guarantee + "." + period));

    if (results.length) {
      var navigation = document.createElement("nav");
      navigation.className = "home-tournament-history-dialog__navigation";
      navigation.setAttribute("aria-label", "Даты результатов");
      var previous = textElement("button", "", "←");
      var next = textElement("button", "", "→");
      previous.type = next.type = "button";
      previous.setAttribute("aria-label", "Предыдущая дата");
      next.setAttribute("aria-label", "Следующая дата");
      var dates = document.createElement("select");
      dates.setAttribute("aria-label", "Дата результатов");
      dates.appendChild(textElement("option", "", "Все даты"));
      results.slice().reverse().forEach(function (entry) {
        dates.appendChild(textElement("option", "", entry[0]));
      });
      navigation.append(previous, dates, next);
      dialog.appendChild(navigation);
      var rankings = document.createElement("div");
      dialog.appendChild(rankings);
      function showDate() {
        var index = dates.selectedIndex;
        previous.disabled = index === results.length;
        next.disabled = index === 0;
        rankings.replaceChildren();
        appendRankings(rankings, index ? [results[results.length - index]] : results, money);
      }
      previous.addEventListener("click", function () { dates.selectedIndex++; showDate(); });
      next.addEventListener("click", function () { dates.selectedIndex--; showDate(); });
      dates.addEventListener("change", showDate);
      showDate();
    } else {
      appendRankings(dialog, results, money);
    }
    dialog.appendChild(textElement("p", "home-tournament-history-dialog__note", "Показаны только результаты игроков клуба, сохранённые в приложении. Отсутствующие места в топ‑3 неизвестны."));
  }

  function appendRankings(dialog, results, money) {
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
  }

  function openHistory(button) {
    var data = button.dataset;
    var weekday = Number(data.tournamentWeekday);
    var current = {
      weekday: weekday,
      historyKey: data.tournamentHistoryKey || String(weekday),
      name: data.tournamentName,
      buyin: data.tournamentBuyin,
      day: data.tournamentDay,
      time: data.tournamentTime,
      guarantee: data.tournamentGuarantee
    };
    var options = typeof window.pokerGetEveningTournamentOptions === "function"
      ? window.pokerGetEveningTournamentOptions() : [];
    var index = options.findIndex(function (item) { return item.weekday === weekday; });
    if (index < 0) {
      index = 0;
      options = [current].concat(options);
    } else {
      options[index] = current;
    }

    var oldDialog = document.getElementById("homeTournamentHistoryDialog");
    if (oldDialog) oldDialog.remove();
    var dialog = document.createElement("dialog");
    dialog.id = "homeTournamentHistoryDialog";
    dialog.className = "home-tournament-history-dialog";
    dialog.setAttribute("aria-labelledby", "homeTournamentHistoryTitle");

    var close = textElement("button", "home-tournament-history-dialog__close", "×");
    close.type = "button";
    close.setAttribute("aria-label", "Закрыть историю турнира");
    close.addEventListener("click", function () { dialog.close(); });
    dialog.appendChild(close);

    if (options.length > 1) {
      var navigation = document.createElement("nav");
      navigation.className = "home-tournament-history-dialog__navigation";
      navigation.setAttribute("aria-label", "Турниры вечера");
      var previous = textElement("button", "", "←");
      var next = textElement("button", "", "→");
      var position = textElement("span", "", "");
      position.setAttribute("aria-live", "polite");
      previous.type = next.type = "button";
      previous.setAttribute("aria-label", "Предыдущий турнир вечера");
      next.setAttribute("aria-label", "Следующий турнир вечера");
      navigation.append(previous, position, next);
      dialog.appendChild(navigation);
      function showTournament() {
        var item = options[index];
        position.textContent = item.day + " · " + (index + 1) + " / " + options.length;
        while (navigation.nextSibling) navigation.nextSibling.remove();
        renderHistory(dialog, item);
        dialog.scrollTop = 0;
      }
      previous.addEventListener("click", function () {
        index = (index + options.length - 1) % options.length;
        showTournament();
      });
      next.addEventListener("click", function () {
        index = (index + 1) % options.length;
        showTournament();
      });
      showTournament();
    } else {
      renderHistory(dialog, current);
    }
    dialog.addEventListener("click", function (event) { if (event.target === dialog) dialog.close(); });
    document.body.appendChild(dialog);
    dialog.showModal();
  }

  document.addEventListener("click", function (event) {
    var button = event.target && event.target.closest && event.target.closest("#homeTournamentHistoryOpen");
    if (button) openHistory(button);
  });
})();
