// Active raffle card rendering runtime.

function initRafflesActiveViewRuntime(opts) {
  opts = opts || {};
  with (opts) {
  function splitRaffleCardHeadingText(text) {
    var raw = String(text || "").trim();
    if (!raw) return { title: "", subtitle: "" };
    var m = raw.match(/^(.+?[.!?])\s+(.+)$/);
    if (!m) return { title: raw, subtitle: "" };
    return {
      title: (m[1] || "").trim(),
      subtitle: (m[2] || "").trim(),
    };
  }

  function setRaffleCardHeadingText(text) {
    var parts = splitRaffleCardHeadingText(text);
    if (raffleCardHeading) raffleCardHeading.textContent = parts.title;
    if (raffleCardSubheading) {
      raffleCardSubheading.textContent = parts.subtitle;
      raffleCardSubheading.hidden = !parts.subtitle;
    }
  }

  function renderRaffle(raffle) {
    if (!raffle || !raffleCard) return;
    if (raffleTimerInterval) {
      clearInterval(raffleTimerInterval);
      raffleTimerInterval = null;
    }
    currentRaffleId = raffle.id;
    currentRaffleData = raffle;
    var isCashPrize = typeof pokerRafflesIsCashPrize === "function" && pokerRafflesIsCashPrize(raffle);
    raffleCard.dataset.rafflePrizeKind = isCashPrize ? "cash" : "tournament_ticket";
    raffleCard.classList.toggle("raffle-card--cash", isCashPrize);
    raffleCard.classList.toggle("raffle-card--ticket", !isCashPrize);
    setRaffleCardHeadingText(buildActiveRaffleCardHeading(raffle));
    var endDate = raffle.endDate ? new Date(raffle.endDate) : null;
    var isActive = raffle.status === "active";
    currentRaffleEndDate = isActive && endDate ? endDate : null;
    if (currentRaffleEndDate) {
      updateRaffleEndText();
      raffleTimerInterval = setInterval(updateRaffleEndText, 1000);
    } else {
      var fallbackEndText = raffle.status === "drawn"
        ? "Завершён"
        : (endDate ? endDate.toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }) : "");
      if (typeof setRaffleEndStatusText === "function") setRaffleEndStatusText(fallbackEndText);
      else if (raffleEnd) raffleEnd.textContent = fallbackEndText;
    }
    if (raffleCompleteBtn) {
      var showComplete = rafflesIsAdmin && raffle.status === "active";
      raffleCompleteBtn.classList.toggle("raffle-cancel-btn--hidden", !showComplete);
      raffleCompleteBtn.disabled = !showComplete;
    }
    if (raffleCancelBtn) {
      var showCancel = rafflesIsAdmin && raffle.status === "active";
      raffleCancelBtn.classList.toggle("raffle-cancel-btn--hidden", !showCancel);
      raffleCancelBtn.disabled = !showCancel;
    }
    if (raffleUpdateEndBtn) {
      var showUpdate = rafflesIsAdmin && raffle.status === "active";
      raffleUpdateEndBtn.classList.toggle("raffle-cancel-btn--hidden", !showUpdate);
      raffleUpdateEndBtn.disabled = !showUpdate;
    }
    if (raffleDeleteBtn) {
      var showDelete = rafflesIsAdmin;
      raffleDeleteBtn.classList.toggle("raffle-cancel-btn--hidden", !showDelete);
      raffleDeleteBtn.disabled = !showDelete;
    }
    if (rafflePrizes) {
      rafflePrizes.innerHTML = "";
      rafflePrizes.hidden = true;
    }
    var raffleIds = collectRaffleIdentityIds();
    var iAmIn =
      raffleIds.length > 0 &&
      raffle.participants &&
      raffle.participants.some(function (p) {
        var uid = String(p.userId != null ? p.userId : "").trim();
        return uid && raffleIds.indexOf(uid) !== -1;
      });
    var guestRaffleBlock = rafflesViewerIsGuestOnly();
    var showRaffleGuestGate = !!(guestRaffleBlock && isActive && !iAmIn);
    if (raffleGuestGate) {
      raffleGuestGate.classList.toggle("raffle-guest-gate--hidden", !showRaffleGuestGate);
      raffleGuestGate.hidden = !showRaffleGuestGate;
    }
    if (raffleJoinToggleBtn) {
      var showToggle = raffle.status === "active" && !showRaffleGuestGate;
      raffleJoinToggleBtn.classList.toggle("raffle-join-toggle-btn--hidden", !showToggle);
      if (!showToggle) {
        raffleJoinToggleBtn.disabled = true;
      } else {
        var pastEnd = !!(endDate && endDate <= new Date());
        raffleJoinToggleBtn.disabled = pastEnd;
        if (iAmIn) {
          raffleJoinToggleBtn.textContent = "Отменить участие";
          raffleJoinToggleBtn.setAttribute("data-raffle-action", "leave");
          raffleJoinToggleBtn.classList.add("raffle-join-toggle-btn--leave");
        } else {
          raffleJoinToggleBtn.textContent = "Участвовать";
          raffleJoinToggleBtn.setAttribute("data-raffle-action", "join");
          raffleJoinToggleBtn.classList.remove("raffle-join-toggle-btn--leave");
        }
      }
    }
    if (raffleJoinedMsg) raffleJoinedMsg.classList.toggle("raffle-joined-msg--hidden", !iAmIn);
    var parts = raffle.participants || [];
    if (raffleParticipantsCount) raffleParticipantsCount.textContent = "(" + parts.length + ")";
    var chancePct = "";
    if (parts.length > 0 && total > 0) {
      var pct = Math.min(100, (total / parts.length) * 100);
      chancePct = "Ваш шанс выиграть: " + (pct >= 100 ? "100" : pct.toFixed(1)) + "%";
    }
    if (raffleParticipantsChance) {
      raffleParticipantsChance.textContent = chancePct;
      raffleParticipantsChance.style.display = chancePct ? "" : "none";
    }
    raffleParticipants.innerHTML =
      parts.length === 0
        ? "<li class=\"raffle-participants-empty\">Пока никого</li>"
        : parts.map(function (p) {
            return raffleParticipantLineHtml(p, rafflesIsAdmin);
          }).join("");
    if (raffle.status === "drawn" && raffle.winners && raffle.winners.length > 0) {
      raffleWinnersWrap.classList.remove("raffle-winners-wrap--hidden");
      var byGroup = {};
      raffle.winners.forEach(function (w) {
        var g = w.groupIndex >= 0 ? "Группа " + (w.groupIndex + 1) : "Без группы";
        if (!byGroup[g]) byGroup[g] = [];
        byGroup[g].push(w);
      });
      var winHtml = "";
      Object.keys(byGroup).forEach(function (g) {
        var prize = byGroup[g][0] && byGroup[g][0].prize ? byGroup[g][0].prize : "";
        winHtml += "<li class=\"raffle-winner-group\"><strong>" + escapeHtml(g) + (prize ? ": " + escapeHtml(raffleDisplayPrizeText(prize)) : "") + "</strong><ul>";
        byGroup[g].forEach(function (w, index) {
          if (rafflesCompletedRuntime && typeof rafflesCompletedRuntime.buildWinnerRowHtml === "function") winHtml += rafflesCompletedRuntime.buildWinnerRowHtml(w, raffle.id, rafflesIsAdmin, index + 1);
        });
        winHtml += "</ul></li>";
      });
      raffleWinners.innerHTML = winHtml;
      if (rafflesCompletedRuntime && typeof rafflesCompletedRuntime.bindWinnerStatusButtons === "function") rafflesCompletedRuntime.bindWinnerStatusButtons(raffleWinners, raffle.id);
    } else {
      raffleWinnersWrap.classList.add("raffle-winners-wrap--hidden");
    }
  }


    return { renderRaffle: renderRaffle };
  }
}
