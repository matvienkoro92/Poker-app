function initRafflesPublicRuntime(opts) {
  opts = opts || {};
  with (opts) {
    var raffleInviteFriendInlineBtn = document.getElementById("raffleInviteFriendInlineBtn");
    var raffleJoinToggleBtn = document.getElementById("raffleJoinToggleBtn");

  if (raffleInviteFriendInlineBtn) {
    raffleInviteFriendInlineBtn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      if (!currentRaffleData) return;
      var raffle = currentRaffleData;
      var groups = raffle.groups || [];
      var total = raffle.totalWinners || 0;
      var totalPrize = getRaffleTotalPrize(raffle);
      var isCashPrize = typeof pokerRafflesIsCashPrize === "function" && pokerRafflesIsCashPrize(raffle);
      var cashPrizeWord = typeof pokerRafflesPluralizeCashBuyinsForHeading === "function"
        ? pokerRafflesPluralizeCashBuyinsForHeading(total || 0)
        : "беккинг-байинов";
      var tournamentName = raffleDisplayPrizeText((raffle.title || (groups[0] && groups[0].prize) || "").trim()) || "турнир клуба";
      var startParam =
        typeof window.pokerBuildRaffleActiveStartParam === "function"
          ? window.pokerBuildRaffleActiveStartParam(raffle)
          : "raffles";
      var link =
        typeof window.pokerBuildRaffleShareLink === "function"
          ? window.pokerBuildRaffleShareLink(startParam)
          : buildMiniAppStartLink(startParam);
      var text = isCashPrize
        ? "Разыгрываем " + (total || 0) + " " + cashPrizeWord + " на кеш. Сумма " + (totalPrize || 0) + "₽. Столы Бонус гейм на Poker21"
        : "Разыгрываем " +
          (total || 0) +
          " беккинг-билетов на сумму " +
          (totalPrize || 0) +
          "₽ на " +
          tournamentName;
      var textWithLink = text + "\n" + link;
      var shareTitleRaw =
        (typeof buildActiveRaffleCardHeading === "function" ? buildActiveRaffleCardHeading(raffle) : "") ||
        raffleDisplayPrizeText((raffle.title || "").trim()) ||
        "Розыгрыш — Два туза";
      var shareTitle = String(shareTitleRaw).trim();
      if (shareTitle.length > 200) shareTitle = shareTitle.slice(0, 199) + "…";
      var shareUrl =
        typeof pokerBuildTelegramShareUrlDialog === "function" ? pokerBuildTelegramShareUrlDialog(link, text) : "";
      pokerTryPwaWebShare({ title: shareTitle, text: textWithLink, url: link }).then(function (pwaOk) {
        if (pwaOk) {
          if (typeof recordShareButtonClick === "function") recordShareButtonClick("raffle_card");
          return;
        }
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.openTelegramLink) tg.openTelegramLink(shareUrl);
        else window.open(shareUrl, "_blank");
        if (typeof recordShareButtonClick === "function") recordShareButtonClick("raffle_card");
      });
    });
  }


  function parseRaffleApiResponse(r) {
    return r
      .json()
      .then(function (data) {
        if (data && typeof data === "object") return data;
        return { ok: false, error: "Пустой ответ сервера", code: "EMPTY_RESPONSE" };
      })
      .catch(function () {
        return {
          ok: false,
          error:
            "Сервер вернул некорректный ответ" +
            (r && r.status ? " (HTTP " + r.status + "). Перезайдите в мини-приложение и попробуйте снова через 10–30 секунд." : ". Перезайдите в мини-приложение и попробуйте снова через 10–30 секунд."),
          code: "INVALID_SERVER_RESPONSE",
        };
      });
  }

  function openRaffleRequirementLink(data) {
    var url = data && data.openUrl ? String(data.openUrl) : "";
    if (!url && data && data.code === "CHANNEL_REQUIRED") url = "https://t.me/dva_tuza_club";
    if (!url && data && data.code === "BOT_REQUIRED") url = "https://t.me/Poker_dvatuza_bot";
    if (!url && data && data.code === "SUBSCRIPTION_REQUIRED") url = "https://t.me/Poker_dvatuza_bot";
    if (!url) return;
    if (tg && tg.openTelegramLink) {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      tg.openTelegramLink(url);
      return;
    }
    if (typeof window.open === "function") window.open(url, "_blank");
  }

  function renderRaffleAfterParticipation(data) {
    if (data && data.raffle) {
      if (typeof refreshActiveChooserAfterAction === "function") refreshActiveChooserAfterAction(data.raffle);
      renderRaffle(data.raffle);
      return;
    }
    if (currentRaffleData) renderRaffle(currentRaffleData);
  }

  if (!document.documentElement.dataset.raffleTelegramLinksBound) {
    document.documentElement.dataset.raffleTelegramLinksBound = "1";
    document.addEventListener("click", function (e) {
      var target = e && e.target;
      var link = target && target.closest ? target.closest("[data-raffle-telegram-link]") : null;
      if (!link) return;
      var url = String(link.getAttribute("href") || "").trim();
      if (!/^https:\/\/t\.me\/[A-Za-z0-9_]{3,64}(?:[/?#].*)?$/i.test(url)) return;
      var tgLink = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tgLink && tgLink.openTelegramLink) {
        e.preventDefault();
        if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
        tgLink.openTelegramLink(url);
      }
    });
  }

  if (raffleJoinToggleBtn) {
    raffleJoinToggleBtn.addEventListener("click", function () {
      if (!currentRaffleId) {
        if (tg && tg.showAlert) tg.showAlert("Розыгрыш не выбран. Обновите страницу.");
        return;
      }
      var act = raffleJoinToggleBtn.getAttribute("data-raffle-action") || "join";
      if (act === "locked") {
        if (tg && tg.showAlert) tg.showAlert("Участников этого розыгрыша добавляет админ.");
        return;
      }
      if (act === "leave") {
        if (!base || !rafflesViewerApiReady()) return;
        raffleJoinToggleBtn.disabled = true;
        raffleJoinToggleBtn.textContent = "Отмена…";
        fetch(base + "/api/raffles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pokerGuestOrAuthedPostBody({ action: "leave", raffleId: currentRaffleId })),
        })
          .then(parseRaffleApiResponse)
          .then(function (data) {
            if (data && data.ok) {
              renderRaffleAfterParticipation(data);
              var leaveMsg = data.alreadyLeft ? "Вы не были в списке участников." : "Участие отменено.";
              showRaffleFeedback(leaveMsg, "ok");
            } else {
              if (currentRaffleData) renderRaffle(currentRaffleData);
              var eLeave = (data && data.error) || "Ошибка";
              showRaffleFeedback(eLeave, "err");
              if (tg && tg.showAlert) tg.showAlert(eLeave);
              else if (typeof alert === "function") alert(eLeave);
            }
          })
          .catch(function () {
            if (currentRaffleData) renderRaffle(currentRaffleData);
            showRaffleFeedback(POKER_NET_ERR, "err");
            if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
            else if (typeof alert === "function") alert(POKER_NET_ERR);
          });
        return;
      }
      if (rafflesViewerIsGuestOnly()) {
        if (tg && tg.showAlert) tg.showAlert("Чтобы участвовать в розыгрышах, войдите в аккаунт.");
        else if (typeof alert === "function") alert("Чтобы участвовать в розыгрышах, войдите в аккаунт.");
        return;
      }
      if (!rafflesViewerApiReady()) {
        if (tg && tg.showAlert) tg.showAlert("Нет доступа к серверу. Проверьте сеть.");
        else if (typeof alert === "function") alert("Нет доступа к серверу. Проверьте сеть.");
        return;
      }
      raffleJoinToggleBtn.disabled = true;
      raffleJoinToggleBtn.textContent = "Отправка…";
      var joinBody = {
        action: "join",
        raffleId: currentRaffleId,
        deviceId: getRaffleDeviceId(),
      };
      fetch(base + "/api/raffles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pokerGuestOrAuthedPostBody(joinBody)),
      })
        .then(parseRaffleApiResponse)
        .then(function (data) {
          if (data && data.ok) {
            renderRaffleAfterParticipation(data);
            showRaffleFeedback(data.alreadyJoined ? "Вы уже участвуете." : "Вы участвуете в розыгрыше.", "ok");
          } else {
            if (currentRaffleData) renderRaffle(currentRaffleData);
            var err = (data && data.error) || "Ошибка";
            var isRequirementError =
              data &&
              (data.code === "CHANNEL_REQUIRED" ||
                data.code === "BOT_REQUIRED" ||
                data.code === "SUBSCRIPTION_REQUIRED" ||
                data.code === "TELEGRAM_REQUIRED");
            if (isRequirementError) {
              showRaffleFeedback(err, "err", {
                botUrl: data.botUrl,
                channelUrl: data.channelUrl,
                openUrl: data.openUrl,
                missing: data.missing,
                missingRequirements: data.missingRequirements,
                sticky: true,
              });
            } else {
              showRaffleFeedback(err, "err");
            }
            if (data && data.code === "P21_REQUIRED") {
              if (tg && tg.showAlert) tg.showAlert("Для участия нужен ваш айди из Poker21, чтобы на него выдать выигрыш, для этого привяжите его в разделе Профиль.");
              if (typeof setView === "function") setView("profile");
            } else if (isRequirementError) {
              if (tg && tg.showAlert) tg.showAlert(err);
              openRaffleRequirementLink(data);
            } else if (data && data.code === "AUTH_INVALID") {
              showRaffleFeedback(err || "Сессия входа не подтвердилась. Войдите ещё раз.", "err", { sticky: true });
              if (tg && tg.showAlert) tg.showAlert(err || "Сессия входа не подтвердилась. Войдите ещё раз.");
              if (typeof window.__pokerOpenSharedAccountAuthFlow === "function") window.__pokerOpenSharedAccountAuthFlow();
            } else if (data && data.code === "RAFFLE_LOGIN_REQUIRED") {
              if (tg && tg.showAlert) tg.showAlert(err || "Чтобы участвовать в розыгрышах, войдите в аккаунт.");
              else if (typeof alert === "function") alert(err || "Чтобы участвовать в розыгрышах, войдите в аккаунт.");
            } else if (data && (data.code === "SAME_IP" || data.code === "SAME_DEVICE")) {
              if (tg && tg.showAlert) tg.showAlert(err + " Если это ошибка, перезайдите в мини-приложение и повторите попытку.");
            } else if (data && data.code === "INVALID_SERVER_RESPONSE") {
              if (tg && tg.showAlert) tg.showAlert(err + " Если повторяется — напишите администратору.");
            } else if (tg && tg.showAlert) {
              tg.showAlert(err + " Попробуйте снова через 10–30 секунд. Если не поможет — перезайдите в мини-приложение.");
            } else if (typeof alert === "function") {
              alert(err);
            }
          }
        })
        .catch(function () {
          if (currentRaffleData) renderRaffle(currentRaffleData);
          showRaffleFeedback(POKER_NET_ERR + " Попробуйте снова.", "err");
          if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR + " Перезайдите в мини-приложение и попробуйте снова.");
          else if (typeof alert === "function") alert(POKER_NET_ERR);
        });
    });
  }

  (function bindRaffleParticipantProfileOpens() {
    if (initRaffles.__profileOpenDelegate) return;
    var root = document.querySelector('.view[data-view="raffles"]');
    if (!root) return;
    initRaffles.__profileOpenDelegate = true;
    root.addEventListener("click", function (e) {
      if (e.target.closest(".raffle-winner-btn")) return;
      var feedbackLink = e.target.closest(".raffle-feedback-link[href]");
      if (feedbackLink && root.contains(feedbackLink)) {
        var feedbackHref = feedbackLink.getAttribute("href") || "";
        if (feedbackHref && tg && tg.openTelegramLink && typeof isTelegramWebApp === "function" && isTelegramWebApp()) {
          e.preventDefault();
          try {
            tg.openTelegramLink(feedbackHref);
          } catch (eTgFeedbackOpen) {
            if (typeof window.open === "function") window.open(feedbackHref, "_blank");
          }
        }
        return;
      }
      var tgLink = e.target.closest(".raffle-winner-row__tg[href]");
      if (tgLink && root.contains(tgLink)) {
        var href = tgLink.getAttribute("href") || "";
        if (href && tg && tg.openTelegramLink && typeof isTelegramWebApp === "function" && isTelegramWebApp()) {
          e.preventDefault();
          try {
            tg.openTelegramLink(href);
          } catch (eTgOpen) {
            if (typeof window.open === "function") window.open(href, "_blank");
          }
        }
        return;
      }
      var btn = e.target.closest(".raffle-participants__profile-btn");
      if (!btn || !root.contains(btn)) return;
      e.preventDefault();
      var id = btn.getAttribute("data-user-id");
      var nm = (btn.getAttribute("data-user-name") || "").trim() || id;
      if (!id || typeof window.openChatUserModalById !== "function") return;
      try {
        if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      } catch (eEx) {}
      window.openChatUserModalById(id, nm, null);
    });
  })();
  }
}
