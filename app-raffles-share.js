// Кнопки шаринга в шапке розыгрышей. Разметка приходит lazy-фрагментом, поэтому init можно безопасно повторять.
function pokerInitRafflesHeroShare() {
  function rafflesDeepLink() {
    return buildMiniAppStartLink("raffles");
  }
  function showRafflesCopyResult(link, copied) {
    var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    var successMsg = "Ссылка скопирована. Отправьте другу — откроется раздел розыгрышей.";
    var fallbackMsg = "Ссылка: " + link;
    if (tg && tg.showAlert) {
      tg.showAlert(copied ? successMsg : fallbackMsg);
      return;
    }
    alert(copied ? "Ссылка скопирована." : fallbackMsg);
  }
  function copyRafflesLinkText(text) {
    return new Promise(function (resolve) {
      var value = text != null ? String(text) : "";
      if (!value) {
        resolve(false);
        return;
      }
      function copyWithFallback() {
        var input = null;
        try {
          input = document.createElement("textarea");
          input.value = value;
          input.setAttribute("readonly", "readonly");
          input.style.position = "fixed";
          input.style.left = "-9999px";
          input.style.top = "0";
          document.body.appendChild(input);
          input.focus();
          input.select();
          input.setSelectionRange(0, input.value.length);
          var ok = typeof document.execCommand === "function" && document.execCommand("copy");
          if (input.parentNode) input.parentNode.removeChild(input);
          resolve(!!ok);
        } catch (e) {
          if (input && input.parentNode) input.parentNode.removeChild(input);
          resolve(false);
        }
      }
      if (typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        navigator.clipboard.writeText(value).then(function () {
          resolve(true);
        }).catch(copyWithFallback);
        return;
      }
      copyWithFallback();
    });
  }
  var rafflesCopyLinkBtn = document.getElementById("rafflesCopyLinkBtn");
  if (rafflesCopyLinkBtn && rafflesCopyLinkBtn.getAttribute("data-share-bound") !== "1") {
    rafflesCopyLinkBtn.setAttribute("data-share-bound", "1");
    rafflesCopyLinkBtn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var link = rafflesDeepLink();
      copyRafflesLinkText(link).then(function (copied) {
        showRafflesCopyResult(link, copied);
        if (typeof recordShareButtonClick === "function") recordShareButtonClick("raffle_hero_copy");
      });
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
}

window.pokerInitRafflesHeroShare = pokerInitRafflesHeroShare;
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", pokerInitRafflesHeroShare, { once: true });
} else {
  pokerInitRafflesHeroShare();
}
