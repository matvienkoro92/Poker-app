(function initScheduleTournamentDayToday() {
  var wrap = document.querySelector(".schedule-table-wrap--tournament-day");
  if (!wrap) return;
  var rows = wrap.querySelectorAll("tbody tr");
  if (rows.length !== 7) return;
  var dayIndex = (new Date().getDay() + 6) % 7;
  var todayRow = rows[dayIndex];
  if (todayRow) {
    todayRow.classList.add("schedule-row--today");
    var firstCell = todayRow.querySelector("td");
    if (firstCell) firstCell.textContent = "СЕГОДНЯ";
  }
})();

(function initUpdatesBlock() {
  var updates = (typeof window !== "undefined" && window.APP_UPDATES) || [];
  var listEl = document.getElementById("updatesList");
  var footerEl = document.getElementById("updatesFooter");
  var ellipsisEl = document.getElementById("updatesEllipsis");
  var toggleBtn = document.getElementById("updatesToggle");
  var blockEl = document.getElementById("updatesBlock");
  if (!listEl || !footerEl || updates.length === 0) {
    if (blockEl) blockEl.style.display = "none";
    return;
  }

  var VISIBLE_COUNT = 2;
  var expanded = false;

  function escapeHtml(s) {
    if (!s) return "";
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function render() {
    var visible = expanded ? updates : updates.slice(0, VISIBLE_COUNT);
    listEl.innerHTML = visible
      .map(function (u) {
        return (
          '<li class="updates-block__item"><span class="updates-block__date">' +
          escapeHtml(u.date) +
          "</span> " +
          escapeHtml(u.text) +
          "</li>"
        );
      })
      .join("");

    if (updates.length <= VISIBLE_COUNT) {
      footerEl.style.display = "none";
    } else {
      footerEl.style.display = "";
      ellipsisEl.style.display = expanded ? "none" : "";
      if (toggleBtn) toggleBtn.textContent = expanded ? "Свернуть" : "Показать все";
    }
  }

  render();

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      expanded = !expanded;
      render();
    });
  }
})();
