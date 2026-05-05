// Кнопки шаринга в шапке розыгрышей: один раз при загрузке (не внутри initRaffles — иначе при каждом заходе дублируются обработчики).
(function initRafflesHeroShare() {
  function rafflesDeepLink() {
    return buildMiniAppStartLink("raffles");
  }
  var rafflesCopyLinkBtn = document.getElementById("rafflesCopyLinkBtn");
  if (rafflesCopyLinkBtn && rafflesCopyLinkBtn.getAttribute("data-share-bound") !== "1") {
    rafflesCopyLinkBtn.setAttribute("data-share-bound", "1");
    rafflesCopyLinkBtn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var link = rafflesDeepLink();
      if (isTelegramWebApp() && typeof pokerOpenTelegramShareUrlOnly === "function" && pokerOpenTelegramShareUrlOnly(link)) {
        if (typeof recordShareButtonClick === "function") recordShareButtonClick("raffle_hero");
        return;
      }
      var msg = "Ссылка скопирована. Отправьте другу — откроется раздел розыгрышей.";
      if (typeof navigator.clipboard !== "undefined" && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(link).then(function () {
          var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tg && tg.showAlert) tg.showAlert(msg); else alert("Ссылка скопирована.");
        }).catch(function () {
          var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tg && tg.showAlert) tg.showAlert("Ссылка: " + link); else alert("Ссылка: " + link);
        });
      } else {
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.showAlert) tg.showAlert("Ссылка: " + link); else alert("Ссылка: " + link);
      }
    });
  }
  var rafflesInviteFriendBtn = document.getElementById("rafflesInviteFriendBtn");
  if (rafflesInviteFriendBtn && rafflesInviteFriendBtn.getAttribute("data-share-bound") !== "1") {
    rafflesInviteFriendBtn.setAttribute("data-share-bound", "1");
    rafflesInviteFriendBtn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var link = rafflesDeepLink();
      if (isTelegramWebApp() && typeof pokerOpenTelegramShareUrlOnly === "function" && pokerOpenTelegramShareUrlOnly(link)) {
        if (typeof recordShareButtonClick === "function") recordShareButtonClick("raffle_hero");
        return;
      }
      var inviteBody =
        "Клуб «Два туза» снова разыгрывает беккинг-билеты на турниры бесплатно. Заходи и участвуй!";
      var inviteBodyWithLink = inviteBody + "\n" + link;
      var shareUrl =
        typeof pokerBuildTelegramShareUrlDialog === "function" ? pokerBuildTelegramShareUrlDialog(link, inviteBody) : "";
      var headingEl = document.getElementById("raffleCardHeading");
      var heroTitle = headingEl && headingEl.textContent ? String(headingEl.textContent).trim() : "";
      if (heroTitle.length > 200) heroTitle = heroTitle.slice(0, 199) + "…";
      if (!heroTitle) heroTitle = "Розыгрыши — клуб «Два туза»";
      pokerTryPwaWebShare({ title: heroTitle, text: inviteBodyWithLink, url: link }).then(function (pwaOk) {
        if (pwaOk) {
          if (typeof recordShareButtonClick === "function") recordShareButtonClick("raffle_hero");
          return;
        }
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.openTelegramLink) tg.openTelegramLink(shareUrl);
        else window.open(shareUrl, "_blank");
        if (typeof recordShareButtonClick === "function") recordShareButtonClick("raffle_hero");
      });
    });
  }
})();
