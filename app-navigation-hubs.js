(function () {
  function updateNextTournament() {
    var title = document.getElementById("playNextTitle");
    var details = document.getElementById("playNextDetails");
    if (!title || !details || typeof pokerCollectFullScheduleSlots !== "function") return;
    var now = new Date();
    var next = pokerCollectFullScheduleSlots(now).filter(function (slot) {
      return slot.item.category === "Турнир дня" && slot.start > now;
    }).sort(function (a, b) { return a.start - b.start; })[0];
    if (!next) {
      title.textContent = "Расписание обновляется";
      details.textContent = "Посмотрите полное расписание ближайших игр.";
      return;
    }
    title.textContent = next.item.name;
    details.textContent = new Intl.DateTimeFormat("ru-RU", { timeZone: "Europe/Moscow", weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }).format(next.start) + " мск · вход " + next.item.buyin;
  }
  document.addEventListener("click", function (event) {
    if (event.target.closest('[data-view-target="play"]')) updateNextTournament();
    if (event.target.closest("[data-club-friend-news-open]") && typeof window.pokerOpenFriendNews === "function") window.pokerOpenFriendNews();
    if (event.target.closest("[data-club-friends-open]")) {
      if (typeof setView === "function") setView("profile", { profileTab: "friends" });
    }
  });
  updateNextTournament();
})();
