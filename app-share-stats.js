function initShareStatsAdminModal() {
  var SHARE_BUTTON_LABELS = {
    tournament_day: "Турнир дня (поделиться)",
    daily_prediction: "Предсказание на день",
    gazette_article: "Газета (новость)",
    winter_rating_week_top: "Рейтинг — топы недели",
    winter_rating_spring_top: "Рейтинг весны — топы",
    winter_rating_player_share: "Рейтинг — карточка игрока",
    winter_rating_date: "Рейтинг — дата",
    raffle_hero: "Розыгрыши — пригласить друга",
    raffle_card: "Розыгрыш — карточка (пригласить)",
    video_lessons_hero: "Видеоуроки — отправить другу",
    video_lessons_coach_reviews: "Видеоуроки — ссылка на отзывы о тренере",
    video_lessons_coach_reviews_copy: "Видеоуроки — копирование ссылки на отзывы"
  };
  var btn = document.getElementById("adminShareStatsBtn");
  var modal = document.getElementById("shareStatsAdminModal");
  var closeBtn = document.getElementById("shareStatsAdminModalClose");
  var backdrop = document.getElementById("shareStatsAdminModalBackdrop");
  var tbody = document.getElementById("shareStatsAdminTableBody");
  if (!btn || !modal || !tbody) return;
  if (btn.dataset.shareStatsBound === "1") return;
  btn.dataset.shareStatsBound = "1";
  function closeShareStatsModal() {
    modal.setAttribute("aria-hidden", "true");
    if (document.body) document.body.style.overflow = "";
  }
  function openShareStatsModal() {
    if (typeof window.pokerEnsureVisitorsAdminAccess === "function") {
      window.pokerEnsureVisitorsAdminAccess().then(function (allowed) {
        if (allowed) openShareStatsModalChecked();
      });
      return;
    }
    openShareStatsModalChecked();
  }
  function openShareStatsModalChecked() {
    modal.setAttribute("aria-hidden", "false");
    if (document.body) document.body.style.overflow = "hidden";
    tbody.innerHTML = "<tr><td colspan=\"2\">Загрузка…</td></tr>";
    var base = getApiBase();
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
      tbody.innerHTML = "<tr><td colspan=\"2\">Нет сессии. Войдите в Telegram или PWA.</td></tr>";
      return;
    }
    var q = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
    fetch(base + "/api/share-button-stats" + q)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data || !data.ok || !data.stats) {
          tbody.innerHTML = "<tr><td colspan=\"2\">Нет данных</td></tr>";
          return;
        }
        var ids = Object.keys(SHARE_BUTTON_LABELS);
        var rows = ids.map(function (id) {
          var label = SHARE_BUTTON_LABELS[id] || id;
          var count = data.stats[id] != null ? data.stats[id] : 0;
          return "<tr><td>" + String(label).replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</td><td>" + count + "</td></tr>";
        });
        if (rows.length === 0) rows.push("<tr><td colspan=\"2\">Нет записей</td></tr>");
        tbody.innerHTML = rows.join("");
      })
      .catch(function () {
        tbody.innerHTML = "<tr><td colspan=\"2\">Ошибка загрузки</td></tr>";
      });
  }
  btn.addEventListener("click", openShareStatsModal);
  if (closeBtn) closeBtn.addEventListener("click", closeShareStatsModal);
  if (backdrop) backdrop.addEventListener("click", closeShareStatsModal);
}
window.pokerInitShareStatsAdminModal = initShareStatsAdminModal;
initShareStatsAdminModal();
