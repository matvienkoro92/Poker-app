(function initTournamentDayShareRuntime() {
  function handleTournamentDayShare() {
    if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
    var share = window._tournamentDayShare || {};
    var name = (share.name || "").trim() || "турнир клуба";
    var guarantee = (share.guarantee || "").trim();
    var time = (share.time || "18:00").trim();
    var link = typeof buildMiniAppStartLink === "function" ? buildMiniAppStartLink("schedule") : "";
    var text;
    var textForDialog;

    if (name === "Фриролл" && guarantee) {
      textForDialog = "Привет, сегодня Фриролл на " + guarantee + " в Poker21. Скачать можно здесь:";
      text = "Привет, сегодня Фриролл на " + guarantee + " в Poker21. Скачать можно здесь:\n" + link;
    } else {
      textForDialog =
        "Привет, сегодня " +
        name +
        " в " +
        time +
        " в Poker21." +
        (guarantee ? " Призовой фонд " + guarantee + "." : "") +
        " Скачать можно здесь:";
      text =
        "Привет, сегодня " +
        name +
        " в " +
        time +
        " в Poker21." +
        (guarantee ? " Призовой фонд " + guarantee + "." : "") +
        " Скачать можно здесь:\n" +
        link;
    }

    var shareUrl =
      typeof pokerBuildTelegramShareUrlDialog === "function" ? pokerBuildTelegramShareUrlDialog(link, textForDialog) : "";
    pokerTryPwaWebShare({ text: text, url: link }).then(function (pwaOk) {
      if (pwaOk) {
        if (typeof recordShareButtonClick === "function") recordShareButtonClick("tournament_day");
        return;
      }
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tg && tg.openTelegramLink) tg.openTelegramLink(shareUrl);
      else if (tg && tg.openLink) tg.openLink(shareUrl);
      else window.open(shareUrl, "_blank");
      if (typeof recordShareButtonClick === "function") recordShareButtonClick("tournament_day");
    });
  }

  var shareBtns = [document.getElementById("scheduleTournamentDayShareBtn")];
  shareBtns.forEach(function (btn) {
    if (btn) btn.addEventListener("click", handleTournamentDayShare);
  });
})();
