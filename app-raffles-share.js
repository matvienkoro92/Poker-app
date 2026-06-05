// Кнопки шаринга в шапке розыгрышей. Разметка приходит lazy-фрагментом, поэтому init можно безопасно повторять.
function pokerInitRafflesHeroShare() {
  function currentRaffleStartParam() {
    var card = document.getElementById("raffleCard");
    var number = card && card.dataset ? parseInt(String(card.dataset.raffleShareNumber || ""), 10) : 0;
    if (Number.isFinite(number) && number > 0) return "r_" + String(number);
    var id = card && card.dataset ? String(card.dataset.raffleId || "").trim() : "";
    if (id && typeof window.pokerBuildRaffleActiveStartParam === "function") {
      return window.pokerBuildRaffleActiveStartParam(id);
    }
    return "raffles";
  }

  function rafflesDeepLink() {
    var startParam = currentRaffleStartParam();
    return typeof window.pokerBuildRaffleShareLink === "function"
      ? window.pokerBuildRaffleShareLink(startParam)
      : buildMiniAppStartLink(startParam);
  }
  function showRafflesCopyFeedback(text) {
    var feedback = document.getElementById("rafflesCopyFeedback");
    var copyButtons = [
      document.getElementById("rafflesCopyLinkBtn"),
      document.getElementById("raffleCopyLinkInlineBtn"),
    ].filter(function (btn) {
      return !!btn;
    });
    if (!feedback) return false;
    if (showRafflesCopyFeedback.timer) clearTimeout(showRafflesCopyFeedback.timer);
    feedback.textContent = text || "";
    feedback.hidden = !feedback.textContent;
    copyButtons.forEach(function (btn) {
      if (!btn.dataset.copyDefaultLabel) {
        btn.dataset.copyDefaultLabel = btn.getAttribute("aria-label") || "Скопировать ссылку на розыгрыши";
      }
      btn.classList.add("raffles-hero__share-btn--copied");
      btn.setAttribute("aria-label", text || "Ссылка скопирована");
    });
    showRafflesCopyFeedback.timer = setTimeout(function () {
      feedback.hidden = true;
      feedback.textContent = "";
      copyButtons.forEach(function (btn) {
        btn.classList.remove("raffles-hero__share-btn--copied");
        btn.setAttribute("aria-label", btn.dataset.copyDefaultLabel || "Скопировать ссылку на розыгрыши");
      });
      showRafflesCopyFeedback.timer = null;
    }, 2200);
    return true;
  }
  function showRafflesCopyResult(link, copied) {
    var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    var successMsg = "Ссылка скопирована. Отправьте другу — откроется этот розыгрыш.";
    var fallbackMsg = "Ссылка: " + link;
    if (copied) {
      var showedInline = showRafflesCopyFeedback("Скопировано");
      if (!showedInline && tg && tg.showToast) tg.showToast("Скопировано");
      else if (!showedInline && tg && tg.showAlert) tg.showAlert(successMsg);
      else if (!showedInline) alert("Ссылка скопирована.");
      return;
    }
    showRafflesCopyFeedback("Не скопировано");
    if (tg && tg.showAlert) tg.showAlert(fallbackMsg);
    else alert(fallbackMsg);
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
  function currentRaffleHeadingLooksCash() {
    var headingEl = document.getElementById("raffleCardHeading");
    var subheadingEl = document.getElementById("raffleCardSubheading");
    var prizesEl = document.getElementById("rafflePrizes");
    var text = [
      headingEl && headingEl.textContent,
      subheadingEl && subheadingEl.textContent,
      prizesEl && prizesEl.textContent,
    ].join(" ").toLowerCase();
    return text.indexOf("на кеш") !== -1 || text.indexOf("кеш") !== -1 || text.indexOf("cash") !== -1 || text.indexOf("бонус гейм") !== -1;
  }
  function currentRaffleLooksCashForShare() {
    var card = document.getElementById("raffleCard");
    var kind = card && card.dataset ? String(card.dataset.rafflePrizeKind || "").trim().toLowerCase() : "";
    if (kind === "cash") return true;
    if (kind === "tournament_ticket") return false;
    return currentRaffleHeadingLooksCash();
  }
  function buildRafflesInviteBody() {
    if (currentRaffleLooksCashForShare()) {
      return "В клубе «Два туза» разыгрываются беккинг-байины на кеш бесплатно. Столы Бонус гейм на Poker21. Заходи и участвуй!";
    }
    return "Клуб «Два туза» снова разыгрывает беккинг-билеты на турниры бесплатно. Заходи и участвуй!";
  }
  function bindRafflesCopyButton(btn, trackingName) {
    if (!btn || btn.getAttribute("data-share-bound") === "1") return;
    btn.setAttribute("data-share-bound", "1");
    btn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var link = rafflesDeepLink();
      copyRafflesLinkText(link).then(function (copied) {
        showRafflesCopyResult(link, copied);
        if (typeof recordShareButtonClick === "function") recordShareButtonClick(trackingName || "raffle_hero_copy");
      });
    });
  }
  bindRafflesCopyButton(document.getElementById("rafflesCopyLinkBtn"), "raffle_hero_copy");
  bindRafflesCopyButton(document.getElementById("raffleCopyLinkInlineBtn"), "raffle_card_copy");
  var rafflesInviteFriendBtn = document.getElementById("rafflesInviteFriendBtn");
  if (rafflesInviteFriendBtn && rafflesInviteFriendBtn.getAttribute("data-share-bound") !== "1") {
    rafflesInviteFriendBtn.setAttribute("data-share-bound", "1");
    rafflesInviteFriendBtn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var link = rafflesDeepLink();
      var inviteBody = buildRafflesInviteBody();
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
