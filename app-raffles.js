function initRaffles() {
  if (initRaffles.__listenersBound === true) {
    var currentRoot = document.querySelector('.view[data-view="raffles"]');
    var sameRoot = currentRoot && initRaffles.__boundRoot === currentRoot;
    var sameControls =
      document.getElementById("raffleCancelBtn") === initRaffles.__boundRaffleCancelBtn &&
      document.getElementById("raffleDeleteBtn") === initRaffles.__boundRaffleDeleteBtn &&
      document.getElementById("raffleCompleteBtn") === initRaffles.__boundRaffleCompleteBtn &&
      document.getElementById("rafflesCompleted") === initRaffles.__boundRafflesCompleted;
    if (sameRoot && sameControls) {
      if (typeof initRaffles.__reload === "function") initRaffles.__reload();
      return;
    }
    initRaffles.__listenersBound = false;
    initRaffles.__profileOpenDelegate = false;
  }
  var rafflesRoot = document.querySelector('.view[data-view="raffles"]');
  var base = getApiBase();
  var initData = (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initData) || "";
  var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  var rafflesSubscribeBtn = document.getElementById("rafflesSubscribeBtn");
  var adminWrap = document.getElementById("rafflesAdminWrap");
  var raffleAdminActions = document.getElementById("raffleAdminActions");
  var createToggle = document.getElementById("rafflesCreateToggle");
  var duplicateLastBtn = document.getElementById("rafflesDuplicateLastBtn");
  var createForm = document.getElementById("raffleCreateForm");
  var raffleTypeTickets = document.getElementById("raffleTypeTickets");
  var raffleTypeOther = document.getElementById("raffleTypeOther");
  var raffleCreatePanelTickets = document.getElementById("raffleCreatePanelTickets");
  var raffleCreatePanelOther = document.getElementById("raffleCreatePanelOther");
  var raffleTicketGroupCount = document.getElementById("raffleTicketGroupCount");
  var raffleTicketWinnersWrap = document.getElementById("raffleTicketWinnersWrap");
  var raffleTicketSingleWinnersLabel = document.getElementById("raffleTicketSingleWinnersLabel");
  var raffleTicketWinnersCount = document.getElementById("raffleTicketWinnersCount");
  var raffleTicketGroups = document.getElementById("raffleTicketGroups");
  var raffleTicketTournamentSelect = document.getElementById("raffleTicketTournamentSelect");
  var raffleCreateTotal = document.getElementById("raffleCreateTotal");
  var raffleEndDateInput = document.getElementById("raffleEndDate");
  var groupCountInput = document.getElementById("raffleGroupCount");
  var raffleGroupsEl = document.getElementById("raffleGroups");
  var raffleEndDateOther = document.getElementById("raffleEndDateOther");
  var createBtn = document.getElementById("raffleCreateBtn");
  var raffleCurrent = document.getElementById("raffleCurrent");
  var raffleEmpty = document.getElementById("raffleEmpty");
  var rafflesTabActive = document.getElementById("rafflesTabActive");
  var rafflesTabCompleted = document.getElementById("rafflesTabCompleted");
  var rafflesPanelActive = document.getElementById("rafflesPanelActive");
  var rafflesPanelCompleted = document.getElementById("rafflesPanelCompleted");
  var rafflesTabActiveCount = document.getElementById("rafflesTabActiveCount");
  var rafflesTabActiveSum = document.getElementById("rafflesTabActiveSum");
  var rafflesTabCompletedCount = document.getElementById("rafflesTabCompletedCount");
  var rafflesTabCompletedSum = document.getElementById("rafflesTabCompletedSum");
  var rafflesCompleted = document.getElementById("rafflesCompleted");
  var rafflesCompletedEmpty = document.getElementById("rafflesCompletedEmpty");
  var raffleWinnerLeaders = document.getElementById("raffleWinnerLeaders");
  var raffleWinnerLeadersList = document.getElementById("raffleWinnerLeadersList");
  var raffleWinnerLeadersExpandBtn = document.getElementById("raffleWinnerLeadersExpandBtn");
  var raffleWinnerLeadersModal = document.getElementById("raffleWinnerLeadersModal");
  var raffleWinnerLeadersModalBackdrop = document.getElementById("raffleWinnerLeadersModalBackdrop");
  var raffleWinnerLeadersModalClose = document.getElementById("raffleWinnerLeadersModalClose");
  var raffleWinnerLeadersModalList = document.getElementById("raffleWinnerLeadersModalList");
  var raffleCard = document.getElementById("raffleCard");
  var raffleCardHeading = document.getElementById("raffleCardHeading");
  var raffleCompleteBtn = document.getElementById("raffleCompleteBtn");
  var raffleCancelBtn = document.getElementById("raffleCancelBtn");
  var raffleUpdateEndBtn = document.getElementById("raffleUpdateEndBtn");
  var raffleDeleteBtn = document.getElementById("raffleDeleteBtn");
  var raffleStatWinners = document.getElementById("raffleStatWinners");
  var raffleStatPrize = document.getElementById("raffleStatPrize");
  var raffleStatPrizeValue = document.getElementById("raffleStatPrizeValue");
  var raffleStatGroups = document.getElementById("raffleStatGroups");
  var raffleEnd = document.getElementById("raffleEnd");
  var rafflePrizes = document.getElementById("rafflePrizes");
  var raffleJoinToggleBtn = document.getElementById("raffleJoinToggleBtn");
  var raffleJoinedMsg = document.getElementById("raffleJoinedMsg");
  var raffleGuestGate = document.getElementById("raffleGuestGate");
  var raffleGuestLoginBtn = document.getElementById("raffleGuestLoginBtn");
  var raffleParticipantsCount = document.getElementById("raffleParticipantsCount");
  var raffleParticipantsChance = document.getElementById("raffleParticipantsChance");
  var raffleParticipants = document.getElementById("raffleParticipants");
  var raffleWinnersWrap = document.getElementById("raffleWinnersWrap");
  var raffleWinners = document.getElementById("raffleWinners");
  var raffleInviteFriendInlineBtn = document.getElementById("raffleInviteFriendInlineBtn");
  var raffleActionFeedback = document.getElementById("raffleActionFeedback");
  var rafflesNotifySubsBtn = document.getElementById("rafflesNotifySubsBtn");
  var rafflesNotifySubsHint = document.getElementById("rafflesNotifySubsHint");
  var rafflesLastBroadcastReportBtn = document.getElementById(
    "rafflesLastBroadcastReportBtn"
  );
  var rafflesRetryFailedBroadcastBtn = document.getElementById(
    "rafflesRetryFailedBroadcastBtn"
  );
  var rafflesPurgeBlockedSubsBtn = document.getElementById("rafflesPurgeBlockedSubsBtn");
  var currentRaffleId = null;
  var currentRaffleEndDate = null;
  var currentRaffleData = null;
  var raffleTimerInterval = null;
  var raffleWinnerLeaderRows = [];
  var rafflesIsAdmin = false;
  var myRaffleUserId = null;
  var raffleFeedbackTimer = null;
  var rafflesFocusedActiveId = null;

  function showRaffleFeedback(message, kind) {
    if (!message) return;
    if (raffleFeedbackTimer) {
      clearTimeout(raffleFeedbackTimer);
      raffleFeedbackTimer = null;
    }
    if (tg && tg.HapticFeedback && tg.HapticFeedback.notificationOccurred) {
      try {
        tg.HapticFeedback.notificationOccurred(kind === "err" ? "error" : "success");
      } catch (eH) {}
    }
    if (raffleActionFeedback) {
      raffleActionFeedback.textContent = message;
      raffleActionFeedback.classList.remove("raffle-action-feedback--hidden");
      raffleActionFeedback.classList.toggle("raffle-action-feedback--ok", kind !== "err");
      raffleActionFeedback.classList.toggle("raffle-action-feedback--err", kind === "err");
      raffleFeedbackTimer = setTimeout(function () {
        if (raffleActionFeedback) raffleActionFeedback.classList.add("raffle-action-feedback--hidden");
        raffleFeedbackTimer = null;
      }, 5000);
    } else if (typeof alert === "function") {
      alert(message);
    }
  }

  // Подписка на уведомления о новых розыгрышах
  (function initRafflesSubscribe() {
    if (!rafflesSubscribeBtn) return;
    var RAFFLE_SUBSCRIBED_KEY = "poker_raffles_subscribed";
    function setRaffleSubscribeState(subscribed) {
      rafflesSubscribeBtn.disabled = false;
      rafflesSubscribeBtn.textContent = subscribed ? "Отписаться" : "Подписаться";
      rafflesSubscribeBtn.dataset.subscribed = subscribed ? "1" : "0";
    }
    try {
      setRaffleSubscribeState(localStorage.getItem(RAFFLE_SUBSCRIBED_KEY) === "1");
    } catch (e) {
      setRaffleSubscribeState(false);
    }
    rafflesSubscribeBtn.addEventListener("click", function () {
      var tgLocal = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      var baseUrl = getApiBase();
      if (!baseUrl) {
        if (tgLocal && tgLocal.showAlert) tgLocal.showAlert("Не задан адрес API.");
        else alert("Не задан адрес API.");
        return;
      }
      if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
        if (tgLocal && tgLocal.showAlert) {
          tgLocal.showAlert(
            "Войдите в приложение (Telegram в мини‑аппе или через кнопку входа на сайте), чтобы подписаться."
          );
        } else {
          alert("Войдите в приложение, чтобы подписаться.");
        }
        return;
      }
      var subscribed = rafflesSubscribeBtn.dataset.subscribed === "1";
      var payload =
        typeof pokerApiAuthJsonBody === "function"
          ? pokerApiAuthJsonBody({ unsubscribe: subscribed })
          : { initData: (tgLocal && tgLocal.initData) || initData || "", unsubscribe: subscribed };
      if (!payload.initData && !payload.pwaSession && !payload.pwaVkSession) {
        if (tgLocal && tgLocal.showAlert) tgLocal.showAlert("Не удалось определить аккаунт. Обновите страницу или войдите снова.");
        else alert("Не удалось определить аккаунт. Обновите страницу или войдите снова.");
        return;
      }
      rafflesSubscribeBtn.disabled = true;
      rafflesSubscribeBtn.textContent = "Подписываем…";
      fetch(baseUrl.replace(/\/$/, "") + "/api/raffle-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (r) {
          return r.json().catch(function () {
            return { ok: false, error: "Ошибка ответа сервера" };
          });
        })
        .then(function (data) {
          if (data && data.ok) {
            try {
              localStorage.setItem(RAFFLE_SUBSCRIBED_KEY, data.subscribed ? "1" : "0");
            } catch (e) {}
            setRaffleSubscribeState(!!data.subscribed);
            var tgNow = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
            if (tgNow && tgNow.showAlert) {
              tgNow.showAlert(
                data.subscribed
                  ? "Подписка оформлена. Уведомления о новых розыгрышах будут приходить в Telegram."
                  : "Вы отписаны от уведомлений о розыгрышах."
              );
            } else {
              alert(data.subscribed ? "Подписка оформлена." : "Вы отписаны.");
            }
          } else {
            var msg = (data && data.error) || "Ошибка. Попробуйте позже.";
            var tgNow2 = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
            if (tgNow2 && tgNow2.showAlert) tgNow2.showAlert(msg);
            else alert(msg);
            setRaffleSubscribeState(subscribed);
          }
        })
        .catch(function () {
          var tgNow3 = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tgNow3 && tgNow3.showAlert) tgNow3.showAlert(POKER_NET_ERR);
          else alert(POKER_NET_ERR);
          setRaffleSubscribeState(subscribed);
        })
        .finally(function () {
          rafflesSubscribeBtn.disabled = false;
        });
    });
  })();

  function formatRaffleCountdown(endDate) {
    if (!endDate) return "";
    var now = new Date();
    var ms = endDate.getTime() - now.getTime();
    if (ms <= 0) return "Завершён";
    var sec = Math.floor(ms / 1000) % 60;
    var min = Math.floor(ms / 60000) % 60;
    var hours = Math.floor(ms / 3600000) % 24;
    var days = Math.floor(ms / 86400000);
    var parts = [];
    if (days > 0) parts.push(days + " д.");
    if (hours > 0 || parts.length) parts.push(hours + " ч.");
    parts.push(min + " мин.");
    parts.push(sec + " сек.");
    return parts.join(" ");
  }

  function updateRaffleEndText() {
    if (!raffleEnd || !currentRaffleEndDate) return;
    var text = formatRaffleCountdown(currentRaffleEndDate);
    if (text === "Завершён") {
      raffleEnd.textContent = "Завершён";
      if (raffleTimerInterval) {
        clearInterval(raffleTimerInterval);
        raffleTimerInterval = null;
      }
      loadRaffles();
      return;
    }
    raffleEnd.textContent = "Завершится через " + text;
  }

  function escapeHtml(s) {
    if (s == null) return "";
    var str = String(s);
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /** Текст строки: имя + (@tg_login) для tg_ из API + « — » + P21. */
  function raffleParticipantDisplayLine(p) {
    var namePart = escapeHtml(p.name);
    var uid0 = String(p.userId != null ? p.userId : "").trim();
    var raffleIdText = p.p21Id != null && String(p.p21Id).trim()
      ? String(p.p21Id).trim()
      : (p.accountId != null && String(p.accountId).trim() ? String(p.accountId).trim() : uid0);
    var un =
      p.telegramUsername != null ? String(p.telegramUsername).trim().replace(/^@+/g, "") : "";
    if (un && uid0.indexOf("tg_") === 0) {
      namePart += " (@" + escapeHtml(un) + ")";
    }
    return raffleIdText ? namePart + " — " + escapeHtml(raffleIdText) : namePart;
  }

  /** Строка участника: клик открывает карточку профиля (tg_/vk_). */
  function raffleParticipantLineHtml(p) {
    var uid = String(p.userId != null ? p.userId : "").trim();
    var line = raffleParticipantDisplayLine(p);
    if (!uid || (uid.indexOf("tg_") !== 0 && uid.indexOf("vk_") !== 0)) {
      return "<li class=\"raffle-participants-item\">" + line + "</li>";
    }
    return (
      "<li class=\"raffle-participants-item\"><button type=\"button\" class=\"raffle-participants__profile-btn\" data-user-id=\"" +
      escapeHtml(uid) +
      "\" data-user-name=\"" +
      escapeHtml(p.name || "") +
      "\">" +
      line +
      "</button></li>"
    );
  }

  /** Подмена старого «билет» на «беккинг-билет» при отображении (для данных из БД до переименования). */
  function raffleDisplayPrizeText(s) {
    if (s == null || typeof s !== "string") return s;
    var ph = "\x01BECKING_PH\x02";
    return s.replace(/беккинг-билет/gi, ph).replace(/Билет/g, "Беккинг-билет").replace(/билет/g, "беккинг-билет").split(ph).join("беккинг-билет");
  }

  function buildRaffleWinnerRowHtml(w, raffleId, isAdmin) {
    var uidRaw = String(w.userId != null ? w.userId : "").trim();
    var uidAttr = escapeHtml(uidRaw);
    var status = w.winnerStatus;
    var statusIcon = status === "ok" ? " ✓" : status === "fail" ? " ✗" : "";
    var statusClass = status === "ok" ? "raffle-winner-status--ok" : status === "fail" ? "raffle-winner-status--fail" : "";
    var textInner = raffleParticipantDisplayLine(w);
    var profileOpen =
      uidRaw && (uidRaw.indexOf("tg_") === 0 || uidRaw.indexOf("vk_") === 0)
        ? "<button type=\"button\" class=\"raffle-participants__profile-btn raffle-winner-row__profile\" data-user-id=\"" +
          uidAttr +
          "\" data-user-name=\"" +
          escapeHtml(w.name || "") +
          "\">" +
          textInner +
          "</button>"
        : "<span class=\"raffle-winner-row__text\">" + textInner + "</span>";
    if (isAdmin) {
      var okActive = status === "ok" ? " raffle-winner-btn--active" : "";
      var failActive = status === "fail" ? " raffle-winner-btn--active" : "";
      return (
        "<li class=\"raffle-winner-row\">" +
        profileOpen +
        "<span class=\"raffle-winner-status " +
        statusClass +
        "\">" +
        statusIcon +
        "</span>" +
        "<span class=\"raffle-winner-btns\"><button type=\"button\" class=\"raffle-winner-btn raffle-winner-btn--ok" +
        okActive +
        "\" data-raffle-id=\"" +
        escapeHtml(raffleId) +
        "\" data-winner-user-id=\"" +
        uidAttr +
        "\" title=\"Подтвердить\">✓</button>" +
        "<button type=\"button\" class=\"raffle-winner-btn raffle-winner-btn--fail" +
        failActive +
        "\" data-raffle-id=\"" +
        escapeHtml(raffleId) +
        "\" data-winner-user-id=\"" +
        uidAttr +
        "\" title=\"Отклонить\">✗</button></span></li>"
      );
    }
    return (
      "<li class=\"raffle-winner-row\">" +
      profileOpen +
      "<span class=\"raffle-winner-status " +
      statusClass +
      "\">" +
      statusIcon +
      "</span></li>"
    );
  }

  function raffleWinCountText(n) {
    var v = Math.abs(parseInt(n, 10) || 0) % 100;
    var d = v % 10;
    if (v >= 11 && v <= 19) return n + " раз";
    if (d === 1) return n + " раз";
    if (d >= 2 && d <= 4) return n + " раза";
    return n + " раз";
  }

  function raffleWinnerLeaderId(w) {
    if (!w) return "";
    var p21 = w.p21Id != null ? String(w.p21Id).trim() : "";
    if (p21) return p21;
    var uid = w.userId != null ? String(w.userId).trim() : "";
    return uid;
  }

  function raffleWinnerLeaderMetaText(row) {
    if (!row) return "";
    var parts = [];
    var login = row.telegramUsername != null ? String(row.telegramUsername).trim().replace(/^@+/g, "") : "";
    if (login) parts.push("@" + login);
    var name = row.name != null ? String(row.name).trim() : "";
    if (name && name !== "Участник" && parts.indexOf(name) === -1) parts.push(name);
    return parts.join(" · ");
  }

  function buildRaffleWinnerLeaderRows(completed) {
    var byId = {};
    (completed || []).forEach(function (raffle) {
      var winners = raffle && Array.isArray(raffle.winners) ? raffle.winners : [];
      winners.forEach(function (w) {
        var id = raffleWinnerLeaderId(w);
        if (!id) return;
        if (!byId[id]) {
          byId[id] = {
            id: id,
            userId: w.userId != null ? String(w.userId).trim() : "",
            name: w.name != null ? String(w.name).trim() : "",
            telegramUsername: w.telegramUsername != null ? String(w.telegramUsername).trim() : "",
            count: 0
          };
        } else {
          if (!byId[id].name && w.name != null && String(w.name).trim()) byId[id].name = String(w.name).trim();
          if (!byId[id].telegramUsername && w.telegramUsername != null && String(w.telegramUsername).trim()) byId[id].telegramUsername = String(w.telegramUsername).trim();
          if (!byId[id].userId && w.userId != null && String(w.userId).trim()) byId[id].userId = String(w.userId).trim();
        }
        byId[id].count += 1;
      });
    });
    return Object.keys(byId)
      .map(function (id) { return byId[id]; })
      .sort(function (a, b) {
        if (b.count !== a.count) return b.count - a.count;
        return String(a.id).localeCompare(String(b.id), "ru");
      });
  }

  function raffleWinnerLeaderRowsHtml(rows) {
    return (rows || []).map(function (row) {
      var meta = raffleWinnerLeaderMetaText(row);
      return (
        '<li class="raffle-winner-leaders__item"><span class="raffle-winner-leaders__id">' +
        escapeHtml(row.id) +
        (meta ? '<span class="raffle-winner-leaders__meta">' + escapeHtml(meta) + "</span>" : "") +
        '</span><span class="raffle-winner-leaders__count">— ' +
        escapeHtml(raffleWinCountText(row.count)) +
        "</span></li>"
      );
    }).join("");
  }

  function renderRaffleWinnerLeaders(completed) {
    raffleWinnerLeaderRows = buildRaffleWinnerLeaderRows(completed);
    var hasRows = raffleWinnerLeaderRows.length > 0;
    if (raffleWinnerLeaders) {
      raffleWinnerLeaders.hidden = !hasRows;
      raffleWinnerLeaders.classList.toggle("raffle-winner-leaders--hidden", !hasRows);
    }
    if (raffleWinnerLeadersList) {
      raffleWinnerLeadersList.innerHTML = hasRows ? raffleWinnerLeaderRowsHtml(raffleWinnerLeaderRows.slice(0, 10)) : "";
    }
    if (raffleWinnerLeadersExpandBtn) {
      raffleWinnerLeadersExpandBtn.hidden = raffleWinnerLeaderRows.length <= 10;
      raffleWinnerLeadersExpandBtn.textContent = raffleWinnerLeaderRows.length > 10 ? "Развернуть" : "Все показаны";
    }
  }

  function openRaffleWinnerLeadersModal() {
    if (!raffleWinnerLeadersModal || !raffleWinnerLeaderRows.length) return;
    if (raffleWinnerLeadersModalList) {
      raffleWinnerLeadersModalList.innerHTML = raffleWinnerLeaderRowsHtml(raffleWinnerLeaderRows);
    }
    raffleWinnerLeadersModal.classList.remove("raffle-winner-leaders-modal--hidden");
    raffleWinnerLeadersModal.setAttribute("aria-hidden", "false");
  }

  function closeRaffleWinnerLeadersModal() {
    if (!raffleWinnerLeadersModal) return;
    raffleWinnerLeadersModal.classList.add("raffle-winner-leaders-modal--hidden");
    raffleWinnerLeadersModal.setAttribute("aria-hidden", "true");
  }

  function setRaffleWinnerStatus(rid, wid, btnIsOk, currentStatus, onDone) {
    var newStatus = btnIsOk ? "ok" : "fail";
    if ((btnIsOk && currentStatus === "ok") || (!btnIsOk && currentStatus === "fail")) newStatus = null;
    fetch(base + "/api/raffles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerGuestOrAuthedPostBody({ action: "setWinnerStatus", raffleId: rid, winnerUserId: wid, status: newStatus })),
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.ok) loadRaffles();
        if (onDone) onDone(!!(data && data.ok));
      })
      .catch(function () {
        if (onDone) onDone(false);
      });
  }

  function bindRaffleWinnerStatusButtons(container, raffleId) {
    if (!container || !rafflesIsAdmin || !base) return;
    container.querySelectorAll(".raffle-winner-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var rid = this.getAttribute("data-raffle-id");
        var wid = this.getAttribute("data-winner-user-id");
        var row = this.closest(".raffle-winner-row");
        var statusEl = row && row.querySelector(".raffle-winner-status");
        var currentStatus = statusEl && statusEl.classList.contains("raffle-winner-status--ok") ? "ok" : statusEl && statusEl.classList.contains("raffle-winner-status--fail") ? "fail" : null;
        if (!rid || !wid) return;
        btn.disabled = true;
        setRaffleWinnerStatus(rid, wid, this.classList.contains("raffle-winner-btn--ok"), currentStatus, function (ok) { if (!ok) btn.disabled = false; });
      });
    });
  }

  function parsePrizeValue(prizeStr) {
    if (prizeStr == null || prizeStr === "") return 0;
    var m = String(prizeStr).trim().match(/\d+(?:[.,]\d+)?/);
    return m ? parseFloat(m[0].replace(",", ".")) : 0;
  }

  function getRaffleTotalPrize(raffle) {
    if (!raffle || !raffle.groups) return 0;
    return raffle.groups.reduce(function (sum, g) {
      var count = Math.max(0, parseInt(g.count, 10) || 0);
      var nominal = parsePrizeValue(g.prize);
      return sum + (nominal > 0 ? nominal * count : 0);
    }, 0);
  }

  function formatRaffleSum(rub) {
    var n = Math.round(rub);
    if (n === 0) return "0 ₽";
    return (n < 0 ? "-" : "") + String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f") + " ₽";
  }


  function pluralizeBackingTicketsForHeading(n) {
    var v = Math.abs(n) % 100;
    var d = v % 10;
    if (v >= 11 && v <= 19) return "беккинг-билетов";
    if (d === 1) return "беккинг-билет";
    if (d >= 2 && d <= 4) return "беккинг-билета";
    return "беккинг-билетов";
  }

  function parseRafflePrizeTournamentNameFromPrize(prizeStr) {
    var s = String(prizeStr || "").trim();
    var idx = s.indexOf(" — ");
    if (idx === -1) idx = s.search(/\s[–—-]\s/);
    if (idx === -1) return "";
    return s.slice(idx).replace(/^\s[–—-]\s/, "").trim();
  }

  function isGenericRaffleTitleForHeading(s) {
    var t = String(s || "").toLowerCase();
    return t.indexOf("розыгрыш") !== -1 && (t.indexOf("беккинг") !== -1 || t.indexOf("билет") !== -1);
  }

  /** Заголовок карточки активного розыгрыша (беккинг-билеты / призы). */
  function buildActiveRaffleCardHeading(raffle) {
    if (!raffle) return "";
    var groups = Array.isArray(raffle.groups) ? raffle.groups : [];
    var totalTickets = Math.max(0, parseInt(raffle.totalWinners, 10) || 0);
    if (!totalTickets && groups.length) {
      totalTickets = groups.reduce(function (s, g) {
        return s + Math.max(0, parseInt(g.count, 10) || 0);
      }, 0);
    }
    var totalPrize = getRaffleTotalPrize(raffle);
    var sumText = totalPrize > 0 ? formatRaffleSum(totalPrize) : "—";
    var rawTitle = (raffle.title || "").trim();
    var ticketWord = pluralizeBackingTicketsForHeading(totalTickets || 0);

    function tourPhraseFromNames(uniqueNames) {
      if (uniqueNames.length >= 2) return "на турниры «" + uniqueNames.join("», «") + "»";
      if (uniqueNames.length === 1) return "на турнир «" + uniqueNames[0] + "»";
      if (rawTitle && !isGenericRaffleTitleForHeading(rawTitle)) return "на турнир «" + rawTitle + "»";
      return "на турнир «турнир клуба»";
    }

    if (!groups.length) {
      if (rawTitle) return "Розыгрыш: " + rawTitle + ". Итого сумма розыгрыша " + sumText + ".";
      return "Розыгрыш. Итого сумма розыгрыша " + sumText + ".";
    }

    var rows = [];
    for (var i = 0; i < groups.length; i++) {
      var g = groups[i];
      var c = Math.max(0, parseInt(g.count, 10) || 0);
      var nom = parsePrizeValue(g.prize);
      var tname = parseRafflePrizeTournamentNameFromPrize(g.prize || "");
      rows.push({ count: c, nominal: nom, tournament: tname });
    }

    var uniqueNom = [];
    for (var ni = 0; ni < rows.length; ni++) {
      var nv = rows[ni].nominal;
      if (nv > 0 && uniqueNom.indexOf(nv) === -1) uniqueNom.push(nv);
    }

    var uniqueNames = [];
    for (var nj = 0; nj < rows.length; nj++) {
      var tn = rows[nj].tournament;
      if (tn && uniqueNames.indexOf(tn) === -1) uniqueNames.push(tn);
    }

    if (uniqueNom.length === 1) {
      var price = uniqueNom[0];
      var nomText = formatRaffleSum(price);
      var tourPhrase = tourPhraseFromNames(uniqueNames);
      return (
        "Розыгрыш " +
        totalTickets +
        " " +
        ticketWord +
        " за " +
        nomText +
        " (цена билета) " +
        tourPhrase +
        ". Итого сумма розыгрыша " +
        sumText +
        "."
      );
    }

    if (uniqueNom.length > 1) {
      var mixParts = [];
      for (var mk = 0; mk < rows.length; mk++) {
        var r = rows[mk];
        if (r.count > 0 && r.nominal > 0) mixParts.push(r.count + "×" + formatRaffleSum(r.nominal));
      }
      var mix = mixParts.join(", ");
      var tourPhraseM = tourPhraseFromNames(uniqueNames);
      return (
        "Розыгрыш " +
        totalTickets +
        " " +
        ticketWord +
        ": " +
        mix +
        ". " +
        tourPhraseM +
        ". Итого сумма розыгрыша " +
        sumText +
        "."
      );
    }

    var firstPrize = groups[0] && groups[0].prize ? String(groups[0].prize).trim() : "";
    var prizeLine = firstPrize ? raffleDisplayPrizeText(firstPrize) : "";
    var label = prizeLine || rawTitle || "приз";
    return "Розыгрыш " + totalTickets + " призов: " + label + ". Итого сумма розыгрыша " + sumText + ".";
  }

  /** Все варианты member id (tg/vk/guest) без одного «первого попавшегося» кэша — чтобы кнопка «Отменить участие» не терялась при гонке initData/PWA. */
  function collectRaffleIdentityIds() {
    var ids = [];
    function add(s) {
      if (s == null || s === "") return;
      s = String(s).trim();
      if (!s || ids.indexOf(s) !== -1) return;
      ids.push(s);
    }
    try {
      var uRes = typeof getPokerResolvedTelegramUser === "function" ? getPokerResolvedTelegramUser() : null;
      if (uRes && uRes.id != null) add("tg_" + uRes.id);
    } catch (e0) {}
    if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user && tg.initDataUnsafe.user.id != null) {
      add("tg_" + tg.initDataUnsafe.user.id);
    }
    try {
      var recTg = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
      if (recTg && recTg.user && recTg.user.memberId) add(recTg.user.memberId);
      if (recTg && recTg.user && recTg.user.id != null) add("tg_" + recTg.user.id);
    } catch (eT) {}
    try {
      var recVk = typeof pokerReadPwaVkSessionRecord === "function" ? pokerReadPwaVkSessionRecord() : null;
      if (recVk && recVk.user && recVk.user.id != null) add("vk_" + recVk.user.id);
    } catch (eV) {}
    if (myRaffleUserId) add(myRaffleUserId);
    return ids;
  }

  function rafflesViewerApiReady() {
    return !!(base && (pokerApiHasCredential() || pokerCanSyncGuestProfileToServer()));
  }

  function rafflesViewerIsGuestOnly() {
    var guestMode = false;
    try {
      guestMode = typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode();
    } catch (eGuest) {}
    if (!guestMode) return false;
    try {
      if (typeof pokerApiHasCredential === "function" && pokerApiHasCredential()) return false;
    } catch (eCred) {}
    try {
      var auth = window.__pokerTelegramAuth;
      if (auth && auth.user && auth.status && auth.status !== "guest") return false;
    } catch (eAuth) {}
    return true;
  }

  function parseMoscowDateTimeLocal(value) {
    if (!value) return null;
    if (/[zZ]$/.test(value) || /[+-]\d\d:\d\d$/.test(value)) return new Date(value);
    return new Date(value + ":00+03:00");
  }

  function clearRafflesCache() {
    try {
      if (typeof window !== "undefined") window._rafflesCache = null;
    } catch (e) {}
  }

  function focusRaffleAfterMutation(raffleId) {
    rafflesFocusedActiveId = raffleId ? String(raffleId) : null;
  }
  function formatMoscowDateTimeLocalForInput(date) {
    if (!date) return "";
    try {
      // sv-SE даёт ISO-подобный формат: "YYYY-MM-DD HH:mm:ss"
      var s = date.toLocaleString("sv-SE", { timeZone: "Europe/Moscow", hour12: false });
      return s.replace(" ", "T").slice(0, 16);
    } catch (e) {
      return "";
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
    if (raffleCardHeading) raffleCardHeading.textContent = buildActiveRaffleCardHeading(raffle);
    var total = raffle.totalWinners || 0;
    var groups = raffle.groups || [];
    var totalPrize = getRaffleTotalPrize(raffle);
    var endDate = raffle.endDate ? new Date(raffle.endDate) : null;
    var isActive = raffle.status === "active";
    currentRaffleEndDate = isActive && endDate ? endDate : null;
    if (raffleStatWinners) raffleStatWinners.textContent = "Победителей: " + total;
    if (raffleStatPrizeValue) raffleStatPrizeValue.textContent = totalPrize > 0 ? totalPrize + " р" : "—";
    if (raffleStatGroups) raffleStatGroups.textContent = "Групп призов: " + (groups.length > 0 ? groups.length : "—");
    if (currentRaffleEndDate) {
      updateRaffleEndText();
      raffleTimerInterval = setInterval(updateRaffleEndText, 1000);
    } else {
      raffleEnd.textContent = raffle.status === "drawn"
        ? "Завершён"
        : (endDate ? "Завершится через " + endDate.toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }) : "");
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
    var prizesHtml = "";
    groups.forEach(function (g, i) {
      var cnt = g.count != null ? parseInt(g.count, 10) : 0;
      var cntStr = isNaN(cnt) ? "0" : String(cnt);
      prizesHtml += "<div class=\"raffle-prize\">Группа " + (i + 1) + " (" + cntStr + " побед.): " + escapeHtml(raffleDisplayPrizeText(g.prize || "—")) + "</div>";
    });
    rafflePrizes.innerHTML = prizesHtml || "<p class=\"raffle-no-prizes\">Призы не указаны</p>";
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
            return raffleParticipantLineHtml(p);
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
        byGroup[g].forEach(function (w) {
          winHtml += buildRaffleWinnerRowHtml(w, raffle.id, rafflesIsAdmin);
        });
        winHtml += "</ul></li>";
      });
      raffleWinners.innerHTML = winHtml;
      bindRaffleWinnerStatusButtons(raffleWinners, raffle.id);
    } else {
      raffleWinnersWrap.classList.add("raffle-winners-wrap--hidden");
    }
  }

  function getRaffleDeviceId() {
    return pokerGetRaffleStableDeviceId();
  }

  function loadRaffles(switchToCompleted) {
    if (!base) return;
    var hostname = typeof window !== "undefined" && window.location && window.location.hostname ? window.location.hostname : "";
    var baseStr = (base || "").toString();
    var isLocal = /localhost|127\.0\.0\.1/i.test(hostname) || /localhost|127\.0\.0\.1/i.test(baseStr);
    var qLead = pokerRafflesApiQueryLeading();
    if (!isLocal && qLead === "?initData=" && !pokerCanSyncGuestProfileToServer()) return;

    function showRafflesLoading() {
      if (raffleEmpty) {
        raffleEmpty.innerHTML = "<span class=\"raffle-loading__spinner\" aria-hidden=\"true\"></span><span class=\"raffle-loading__text\">Подождите, Розыгрыш загружается</span>";
        raffleEmpty.classList.remove("raffle-empty--hidden");
      }
      if (raffleCurrent) raffleCurrent.classList.add("raffle-current--hidden");
    }
    function showRafflesError() {
      if (raffleEmpty) {
        raffleEmpty.textContent = "Ошибка загрузки. Проверьте сеть или перезайдите.";
        raffleEmpty.classList.remove("raffle-empty--hidden");
      }
      if (raffleCurrent) raffleCurrent.classList.add("raffle-current--hidden");
    }

    var cache = typeof window !== "undefined" ? window._rafflesCache : null;
    var cacheUsable = !!(cache && cache.data && cache.data.ok);
    if (cacheUsable) {
      applyRafflesData(cache.data, switchToCompleted);
    } else {
      showRafflesLoading();
    }

    function startFetch() {
      var url = base + "/api/raffles" + qLead + "&_t=" + Date.now() + (isLocal ? "&demo=1" : "");
      fetch(url)
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (!data || !data.ok) {
            if (!cacheUsable) showRafflesError();
            return;
          }
          if (typeof window !== "undefined") window._rafflesCache = { data: data, time: Date.now() };
          applyRafflesData(data, switchToCompleted);
        })
        .catch(function () {
          if (!cacheUsable) showRafflesError();
        });
    }

    if (qLead.indexOf("guestDeviceId=") !== -1) {
      pokerComputeGuestMemberId(pokerGetRaffleStableDeviceId()).then(function (gid) {
        if (gid) myRaffleUserId = gid;
        if (currentRaffleData) renderRaffle(currentRaffleData);
        startFetch();
      });
    } else {
      startFetch();
    }
  }

  function applyRafflesData(data, switchToCompleted) {
        if (!data || !data.ok) return;
        rafflesIsAdmin = !!data.isAdmin;
        if (rafflesIsAdmin && typeof window.pokerMarkAdminAccess === "function") {
          window.pokerMarkAdminAccess("raffles");
        }
        if (adminWrap) adminWrap.classList.toggle("raffles-admin-wrap--hidden", !rafflesIsAdmin);
        var raw = data.raffles || [];
        var seen = {};
        var allRaffles = raw.filter(function (r) {
          var id = r && r.id;
          if (!id || seen[id]) return false;
          seen[id] = true;
          return true;
        });
        rafflesIsAdmin = !!data.isAdmin;
        if (rafflesIsAdmin && typeof window.pokerMarkAdminAccess === "function") {
          window.pokerMarkAdminAccess("raffles");
        }
        if (adminWrap) adminWrap.classList.toggle("raffles-admin-wrap--hidden", !rafflesIsAdmin);
        if (raffleAdminActions) {
          raffleAdminActions.classList.toggle("raffle-admin-actions--hidden", !rafflesIsAdmin);
          raffleAdminActions.setAttribute("aria-hidden", rafflesIsAdmin ? "false" : "true");
        }
        if (raffleCompleteBtn) {
          raffleCompleteBtn.classList.toggle("raffle-cancel-btn--hidden", !rafflesIsAdmin);
          raffleCompleteBtn.disabled = !rafflesIsAdmin;
        }
        if (raffleCancelBtn) {
          raffleCancelBtn.classList.toggle("raffle-cancel-btn--hidden", !rafflesIsAdmin);
          raffleCancelBtn.disabled = !rafflesIsAdmin;
        }
        if (raffleDeleteBtn) {
          raffleDeleteBtn.classList.toggle("raffle-cancel-btn--hidden", !rafflesIsAdmin);
          raffleDeleteBtn.disabled = !rafflesIsAdmin;
        }
        if (rafflesIsAdmin && window.updateRaffleSubsCount) {
          window.updateRaffleSubsCount();
        }

        var now = new Date();

        function isTournamentDayRaffle(r) {
          if (!r) return false;
          var title = (r.title || "").toLowerCase();
          if (title.indexOf("турнир дня") !== -1) return true;
          var groups = Array.isArray(r.groups) ? r.groups : [];
          for (var gi = 0; gi < groups.length; gi++) {
            var prizeStr = (groups[gi].prize || "").toLowerCase();
            if (prizeStr.indexOf("турнир дня") !== -1) return true;
          }
          return false;
        }

        var activeList = allRaffles.filter(function (r) {
          if (r.status !== "active") return false;
          var end = r.endDate ? new Date(r.endDate) : null;
          return !end || end > now;
        });
        // Турниры дня всегда первыми в списке активных розыгрышей
        activeList.sort(function (a, b) {
          var aTd = isTournamentDayRaffle(a) ? 1 : 0;
          var bTd = isTournamentDayRaffle(b) ? 1 : 0;
          if (aTd !== bTd) return bTd - aTd;
          var endA = a.endDate ? new Date(a.endDate).getTime() : 0;
          var endB = b.endDate ? new Date(b.endDate).getTime() : 0;
          return endA - endB;
        });
        var completed = allRaffles.filter(function (r) {
          if (r.status !== "active") return true;
          var end = r.endDate ? new Date(r.endDate) : null;
          return end && end <= now;
        });
        completed.sort(function (a, b) {
          var endA = a.endDate ? new Date(a.endDate).getTime() : 0;
          var endB = b.endDate ? new Date(b.endDate).getTime() : 0;
          return endB - endA;
        });

        // Вкладка «Активные»: показываем один розыгрыш. После админского создания держим
        // фокус на созданном id, иначе сортировка могла показать другой активный розыгрыш.
        var active = null;
        if (rafflesFocusedActiveId) {
          for (var afi = 0; afi < activeList.length; afi++) {
            if (String(activeList[afi].id || "") === rafflesFocusedActiveId) {
              active = activeList[afi];
              break;
            }
          }
          if (!active) rafflesFocusedActiveId = null;
        }
        if (!active) active = activeList[0] || null;
        var activeCount = active ? 1 : 0;
        var activeSumRub = active ? getRaffleTotalPrize(active) : 0;
        if (rafflesTabActiveCount) rafflesTabActiveCount.textContent = String(activeCount);
        if (rafflesTabActiveSum) rafflesTabActiveSum.textContent = formatRaffleSum(activeSumRub);

        if (active) {
          if (raffleCurrent) raffleCurrent.classList.remove("raffle-current--hidden");
          if (raffleEmpty) raffleEmpty.classList.add("raffle-empty--hidden");
          renderRaffle(active);
        } else {
          if (raffleCurrent) raffleCurrent.classList.add("raffle-current--hidden");
          if (raffleEmpty) {
            raffleEmpty.textContent = "Нет активных розыгрышей.";
            raffleEmpty.classList.remove("raffle-empty--hidden");
          }
          var rgGate = document.getElementById("raffleGuestGate");
          if (rgGate) {
            rgGate.classList.add("raffle-guest-gate--hidden");
            rgGate.hidden = true;
          }
          currentRaffleId = null;
          currentRaffleEndDate = null;
          if (raffleTimerInterval) {
            clearInterval(raffleTimerInterval);
            raffleTimerInterval = null;
          }
        }
        updateRaffleBadge(!!active);

        if (switchToCompleted && typeof setRafflesTab === "function") setRafflesTab("completed");

        // Вкладка «Завершённые»: количество розыгрышей и сумма разыгранная за все время (₽)
        var completedCount = completed.length;
        var completedSumRub = completed.reduce(function (s, r) { return s + getRaffleTotalPrize(r); }, 0);
        if (rafflesTabCompletedCount) rafflesTabCompletedCount.textContent = String(completedCount);
        if (rafflesTabCompletedSum) rafflesTabCompletedSum.textContent = formatRaffleSum(completedSumRub);
        renderRaffleWinnerLeaders(completed);

        if (rafflesCompleted) {
          if (completed.length > 0) {
            if (rafflesCompletedEmpty) rafflesCompletedEmpty.classList.add("raffle-empty--hidden");
            rafflesCompleted.innerHTML = completed.map(function (raffle) {
              var created = raffle.createdAt ? new Date(raffle.createdAt).toLocaleDateString("ru-RU") : "";
              var end = raffle.endDate ? new Date(raffle.endDate).toLocaleString("ru-RU") : "";
              var meta = "Розыгрыш" + (created ? " от " + created : "") + (end ? " · Завершён " + end : "");
              var winners = raffle.winners || [];
              var byGroup = {};
              winners.forEach(function (w) {
                var g = w.groupIndex >= 0 ? "Группа " + (w.groupIndex + 1) : "Без группы";
                if (!byGroup[g]) byGroup[g] = [];
                byGroup[g].push(w);
              });
              var winHtml = "";
              Object.keys(byGroup).forEach(function (g) {
                var prize = byGroup[g][0] && byGroup[g][0].prize ? byGroup[g][0].prize : "";
                winHtml += "<li class=\"raffle-winner-group\"><strong>" + escapeHtml(g) + (prize ? ": " + escapeHtml(raffleDisplayPrizeText(prize)) : "") + "</strong><ul>";
                byGroup[g].forEach(function (w) {
                  winHtml += buildRaffleWinnerRowHtml(w, raffle.id, rafflesIsAdmin);
                });
                winHtml += "</ul></li>";
              });
              var deleteHtml = rafflesIsAdmin
                ? "<div class=\"raffle-completed-card__actions\"><button type=\"button\" class=\"raffle-completed-card__delete-btn\" data-raffle-id=\"" +
                  escapeHtml(raffle.id || "") + "\">Удалить розыгрыш (админ)</button></div>"
                : "";
              return "<div class=\"raffle-completed-card\"><p class=\"raffle-completed-card__meta\">" + escapeHtml(meta) + "</p>" +
                deleteHtml +
                (winHtml ? "<p class=\"raffle-completed-card__winners-title\">Победители</p><ul class=\"raffle-completed-card__winners\">" + winHtml + "</ul>" : "") + "</div>";
              }).join("");
          } else {
            rafflesCompleted.innerHTML = "";
            if (rafflesCompletedEmpty) rafflesCompletedEmpty.classList.remove("raffle-empty--hidden");
          }
        }
  }

  /** Разбор JSON от raffle-manual-subscribers; при HTML/таймауте — понятная ошибка */
  function raffleManualSubscribersParseResponse(r) {
    return r.text().then(function (t) {
      try {
        return JSON.parse(t);
      } catch (e) {
        return {
          ok: false,
          error:
            "Ответ не JSON" +
            (!r.ok ? " (HTTP " + r.status + ")" : "") +
            ". Часто это таймаут — рассылка могла выполниться частично. Нажмите «Отчёт последней рассылки»." +
            (t ? " Фрагмент: " + String(t).slice(0, 100) : ""),
        };
      }
    });
  }

  /** Поля для POST raffle-manual-subscribers (текущий активный розыгрыш в форме) */
  function raffleManualBroadcastBodyFromCurrentRaffle() {
    var endDate =
      currentRaffleData && currentRaffleData.endDate
        ? currentRaffleData.endDate
        : undefined;
    function pluralizeTickets(n) {
      var v = Math.abs(n) % 100;
      var d = v % 10;
      if (v >= 11 && v <= 19) return "билетов";
      if (d === 1) return "билет";
      if (d >= 2 && d <= 4) return "билета";
      return "билетов";
    }
    var ticketCount = 0;
    // Разбивка по номиналам (например: 3 за 1000 и 12 за 300)
    var nominalToCount = {};
    try {
      var groups =
        currentRaffleData && Array.isArray(currentRaffleData.groups)
          ? currentRaffleData.groups
          : [];
      for (var gi = 0; gi < groups.length; gi++) {
        var c = Math.max(0, parseInt(groups[gi].count, 10) || 0);
        ticketCount += c;
        var n = parsePrizeValue(groups[gi].prize);
        if (n > 0 && c > 0) {
          nominalToCount[n] = (nominalToCount[n] || 0) + c;
        }
      }
    } catch (e) {}
    var broadcastText = "";
    var nominalKeys = Object.keys(nominalToCount);
    if (ticketCount > 0 && nominalKeys.length) {
      // Для одного номинала оставляем старый формат
      if (nominalKeys.length === 1) {
        var nominalOnly = Number(nominalKeys[0]) || 0;
        var ticketNominalText = nominalOnly > 0 ? formatRaffleSum(nominalOnly) : "";
        if (ticketNominalText) {
          broadcastText =
            "Разыгрывается " + ticketCount + " " + pluralizeTickets(ticketCount) + " за " + ticketNominalText + ".";
        }
      } else {
        // Составляем breakdown в порядке убывания номинала (обычно 1000, потом 300)
        nominalKeys
          .map(function (k) { return Number(k) || 0; })
          .filter(function (n) { return n > 0; })
          .sort(function (a, b) { return b - a; });
        var parts = nominalKeys
          .map(function (k) {
            var nominal = Number(k) || 0;
            return nominal > 0
              ? { nominal: nominal, count: nominalToCount[nominal] || 0 }
              : null;
          })
          .filter(function (x) { return x && x.count > 0; })
          .sort(function (a, b) { return b.nominal - a.nominal; })
          .map(function (p) {
            return p.count + " за " + formatRaffleSum(p.nominal);
          });
        if (parts.length) {
          var breakdownText = parts.length === 2 ? parts[0] + " и " + parts[1] : parts.slice(0, -1).join(", ") + " и " + parts[parts.length - 1];
          broadcastText =
            "Разыгрывается " +
            ticketCount +
            " " +
            pluralizeTickets(ticketCount) +
            ": " +
            breakdownText +
            ".";
        }
      }
    }
    return {
      endDate: endDate,
      message: broadcastText || undefined,
      ticketsCount: ticketCount || undefined,
      // ticketPrice может не использоваться на сервере, но оставляем для совместимости: первый номинал
      ticketPrice:
        nominalKeys && nominalKeys.length ? Number(nominalKeys[0]) || undefined : undefined,
    };
  }

  // Админская рассылка подписчикам розыгрышей
  window.updateRaffleSubsCount = function () {
    if (!rafflesNotifySubsBtn) return;
    if (!base || !pokerApiHasCredential()) return;
    fetch(base + "/api/raffle-manual-subscribers?stats=1" + pokerRafflesApiQueryLeading().replace("?", "&"))
      .then(function (r) {
        if (!r.ok) return Promise.reject(new Error("http " + r.status));
        return r.json();
      })
      .then(function (data) {
        if (!data || !data.ok || typeof data.total !== "number") return;
        var total = data.total;
        var baseText = "Разослать подписчикам розыгрыша";
        var current = rafflesNotifySubsBtn.textContent || baseText;
        var idx = current.indexOf(" (");
        if (idx !== -1) current = current.slice(0, idx);
        rafflesNotifySubsBtn.textContent = current + " (" + total + ")";
      })
      .catch(function () {});
  };

  (function initRafflesSubscribersAdminNotify() {
    if (!rafflesNotifySubsBtn) return;
    rafflesNotifySubsBtn.addEventListener("click", function () {
      if (window.__pokerRaffleSubsBroadcastInFlight) return;
      if (!base || !pokerApiHasCredential()) {
        if (tg && tg.showAlert) tg.showAlert("Войдите в приложение (Telegram или PWA).");
        return;
      }
      window.__pokerRaffleSubsBroadcastInFlight = true;
      var btn = rafflesNotifySubsBtn;
      var originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Рассылаем…";
      if (rafflesNotifySubsHint) rafflesNotifySubsHint.textContent = "";
      var extra = raffleManualBroadcastBodyFromCurrentRaffle();
      var broadcastIdemKey =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now()) + "_" + Math.random().toString(36).slice(2, 11);
      fetch(base + "/api/raffle-manual-subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          Object.assign(pokerGuestOrAuthedPostBody({}), extra, {
            broadcastIdempotencyKey: broadcastIdemKey,
          })
        ),
      })
        .then(raffleManualSubscribersParseResponse)
        .then(function (data) {
          if (rafflesNotifySubsHint) {
            rafflesNotifySubsHint.classList.remove("raffles-admin-hint--pre");
          }
          if (data && data.ok) {
            var sent =
              data && typeof data.sent === "number" && data.sent >= 0 ? data.sent : 0;
            var total =
              data && typeof data.total === "number" && data.total >= 0
                ? data.total
                : 0;
            var failN =
              data && typeof data.failuresTotal === "number" && data.failuresTotal > 0
                ? data.failuresTotal
                : 0;
            if (rafflesNotifySubsHint) {
              var warn =
                data && data.warning
                  ? " " + data.warning
                  : "";
              rafflesNotifySubsHint.textContent =
                "Личные сообщения отправлены: " +
                sent +
                " из " +
                total +
                (data && data.retry ? " (досылка тем, кому не дошло)." : " подписчиков розыгрыша.") +
                (failN
                  ? " Не доставлено (ошибка Telegram): " + failN + ". Подробности — «Отчёт последней рассылки»."
                  : "") +
                warn;
            }
          } else if (rafflesNotifySubsHint) {
            rafflesNotifySubsHint.textContent =
              "Ошибка рассылки: " +
              (data && data.error ? data.error : "не удалось отправить") +
              " Если был таймаут — откройте «Отчёт последней рассылки».";
          }
        })
        .catch(function () {
          if (rafflesNotifySubsHint) rafflesNotifySubsHint.textContent = POKER_NET_ERR;
        })
        .finally(function () {
          window.__pokerRaffleSubsBroadcastInFlight = false;
          btn.disabled = false;
          btn.textContent = originalText;
        });
    });
  })();

  (function initRafflesLastBroadcastReport() {
    if (!rafflesLastBroadcastReportBtn) return;
    function formatLastBroadcastReport(last) {
      if (!last)
        return (
          "Нет сохранённого отчёта. Он появится после рассылки на сервере с поддержкой отчётов (или Redis недоступен)."
        );
      var lines = [];
      lines.push("Время старта рассылки (UTC): " + (last.at || "—"));
      if (last.inProgress) {
        lines.push(
          "⚠ Неполный отчёт (обрыв по таймауту или рассылка ещё шла): обработано " +
            (last.processed != null ? last.processed : "—") +
            " из " +
            (last.total != null ? last.total : "—")
        );
      }
      lines.push(
        "Успешных отправок (ответ Telegram ok): " +
          (last.sent != null ? last.sent : "—") +
          " из " +
          (last.total != null ? last.total : "—")
      );
      var fails = last.failures || [];
      if (fails.length) {
        lines.push("Chat ID — причина (не доставлено):");
        for (var fi = 0; fi < fails.length; fi++) {
          lines.push(
            "  " + fails[fi].chatId + " — " + (fails[fi].hint || "")
          );
        }
      } else {
        lines.push(
          "Список сбоев пуст (всем ответил ok или подписчиков не было)."
        );
      }
      if (last.failuresTruncated)
        lines.push("… в отчёте обрезано ещё ошибок: " + last.failuresTruncated);
      lines.push("");
      if (Array.isArray(last.successfulChatIds)) {
        lines.push(
          "В отчёте сохранены успешные chat_id — досылка идёт всем текущим подписчикам, кроме них (заблокировавших бота не беспокоим)."
        );
      } else {
        lines.push(
          "Старый отчёт: успешные id не сохранены — досылка только по списку ошибок (кроме user_blocked)."
        );
      }
      lines.push(
        "Сбойные id см. выше. Текст рассылки берётся из последнего отчёта."
      );
      return lines.join("\n");
    }
    rafflesLastBroadcastReportBtn.addEventListener("click", function () {
      if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
        if (tg && tg.showAlert) tg.showAlert("Войдите в приложение (Telegram или PWA).");
        return;
      }
      var btn = rafflesLastBroadcastReportBtn;
      btn.disabled = true;
      if (rafflesNotifySubsHint) {
        rafflesNotifySubsHint.textContent = "Загружаем отчёт…";
        rafflesNotifySubsHint.classList.add("raffles-admin-hint--pre");
      }
      var q = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
      fetch(base + "/api/raffle-manual-subscribers?lastLog=1" + q.replace("?", "&"))
        .then(raffleManualSubscribersParseResponse)
        .then(function (data) {
          if (!data || !data.ok) {
            if (rafflesNotifySubsHint) {
              rafflesNotifySubsHint.classList.remove("raffles-admin-hint--pre");
              rafflesNotifySubsHint.textContent =
                "Не удалось загрузить отчёт: " +
                (data && data.error ? data.error : "ошибка");
            }
            return;
          }
          var text = formatLastBroadcastReport(data.last);
          if (rafflesNotifySubsHint) {
            rafflesNotifySubsHint.textContent = text;
            rafflesNotifySubsHint.classList.add("raffles-admin-hint--pre");
          }
        })
        .catch(function () {
          if (rafflesNotifySubsHint) {
            rafflesNotifySubsHint.classList.remove("raffles-admin-hint--pre");
            rafflesNotifySubsHint.textContent = POKER_NET_ERR;
          }
        })
        .finally(function () {
          btn.disabled = false;
        });
    });
  })();

  (function initRafflesRetryFailedBroadcast() {
    if (!rafflesRetryFailedBroadcastBtn) return;
    function runRetryFailedBroadcast() {
      if (window.__pokerRaffleSubsBroadcastInFlight) return;
      if (!base || !initData) {
        if (tg && tg.showAlert) tg.showAlert("Откройте приложение в Telegram.");
        return;
      }
      window.__pokerRaffleSubsBroadcastInFlight = true;
      var btn = rafflesRetryFailedBroadcastBtn;
      var originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Шлём повтор…";
      if (rafflesNotifySubsHint) {
        rafflesNotifySubsHint.classList.remove("raffles-admin-hint--pre");
        rafflesNotifySubsHint.textContent = "";
      }
      var extra = raffleManualBroadcastBodyFromCurrentRaffle();
      var retryIdemKey =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now()) + "_" + Math.random().toString(36).slice(2, 11);
      var payload = Object.assign({ initData: initData, retryFailedOnly: true }, extra, {
        broadcastIdempotencyKey: retryIdemKey,
      });
      fetch(base + "/api/raffle-manual-subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(raffleManualSubscribersParseResponse)
        .then(function (data) {
          if (rafflesNotifySubsHint) {
            rafflesNotifySubsHint.classList.remove("raffles-admin-hint--pre");
          }
          if (data && data.ok) {
            var sent =
              data && typeof data.sent === "number" && data.sent >= 0 ? data.sent : 0;
            var total =
              data && typeof data.total === "number" && data.total >= 0
                ? data.total
                : 0;
            var failN =
              data && typeof data.failuresTotal === "number" && data.failuresTotal > 0
                ? data.failuresTotal
                : 0;
            if (rafflesNotifySubsHint) {
              var warn =
                data && data.warning
                  ? " " + data.warning
                  : "";
              rafflesNotifySubsHint.textContent =
                "Досылка (кому не дошло): отправлено " +
                sent +
                " из " +
                total +
                "." +
                (failN
                  ? " Снова не доставлено: " + failN + ". Смотрите «Отчёт последней рассылки»."
                  : "") +
                warn;
            }
          } else if (rafflesNotifySubsHint) {
            rafflesNotifySubsHint.textContent =
              "Повтор не выполнен: " +
              (data && data.error ? data.error : "ошибка");
          }
        })
        .catch(function () {
          if (rafflesNotifySubsHint) rafflesNotifySubsHint.textContent = POKER_NET_ERR;
        })
        .finally(function () {
          window.__pokerRaffleSubsBroadcastInFlight = false;
          btn.disabled = false;
          btn.textContent = originalText;
        });
    }
    rafflesRetryFailedBroadcastBtn.addEventListener("click", function () {
      var msg =
        "Дослать тем же текстом всем из списка подписчиков, кому в прошлый раз не было успешной доставки (в т.ч. если оборвалось по таймауту)? Заблокировавших бота пропускаем.";
      if (tg && typeof tg.showConfirm === "function") {
        tg.showConfirm(msg, function (ok) {
          if (ok) runRetryFailedBroadcast();
        });
      } else if (window.confirm(msg)) {
        runRetryFailedBroadcast();
      }
    });
  })();

  (function initRafflesPurgeBlockedSubscribers() {
    if (!rafflesPurgeBlockedSubsBtn) return;
    function runPurge() {
      if (!base || !initData) {
        if (tg && tg.showAlert) tg.showAlert("Откройте приложение в Telegram.");
        return;
      }
      var btn = rafflesPurgeBlockedSubsBtn;
      var originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Проверяем…";
      if (rafflesNotifySubsHint) {
        rafflesNotifySubsHint.classList.remove("raffles-admin-hint--pre");
        rafflesNotifySubsHint.textContent = "";
      }
      fetch(base + "/api/raffle-manual-subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ initData: initData, purgeBlockedSubscribers: true }),
      })
        .then(raffleManualSubscribersParseResponse)
        .then(function (data) {
          if (data && data.ok && data.purgeBlocked) {
            var rem = typeof data.remaining === "number" ? data.remaining : "—";
            var rm = typeof data.removed === "number" ? data.removed : "—";
            var chk = typeof data.checked === "number" ? data.checked : "—";
            if (rafflesNotifySubsHint) {
              rafflesNotifySubsHint.textContent =
                "Проверено записей: " +
                chk +
                ". Удалено из подписчиков (бот заблокирован / чат недоступен): " +
                rm +
                ". Осталось в списке: " +
                rem +
                ".";
              if (data.rateLimitedHint) {
                rafflesNotifySubsHint.textContent += " " + data.rateLimitedHint;
              }
            }
            if (typeof window.updateRaffleSubsCount === "function") {
              window.updateRaffleSubsCount();
            }
            if (tg && tg.showAlert) {
              tg.showAlert(
                "Готово. Удалено: " + rm + ". Сейчас подписчиков в базе: " + rem + "."
              );
            }
          } else if (rafflesNotifySubsHint) {
            rafflesNotifySubsHint.textContent =
              "Очистка не выполнена: " +
              (data && data.error ? data.error : "ошибка");
          }
        })
        .catch(function () {
          if (rafflesNotifySubsHint) rafflesNotifySubsHint.textContent = POKER_NET_ERR;
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = originalText;
        });
    }
    rafflesPurgeBlockedSubsBtn.addEventListener("click", function () {
      var msg =
        "Проверить всех подписчиков розыгрышей через Telegram и удалить из списка тех, кто заблокировал бота или недоступен? Счётчик «Разослать подписчикам (N)» обновится.";
      if (tg && typeof tg.showConfirm === "function") {
        tg.showConfirm(msg, function (ok) {
          if (ok) runPurge();
        });
      } else if (window.confirm(msg)) {
        runPurge();
      }
    });
  })();

  function getRaffleCreateType() {
    return raffleTypeTickets && raffleTypeTickets.checked ? "tickets" : "other";
  }

  function getRaffleTournamentSelectedOption(select) {
    if (!select || select.selectedIndex < 0) return null;
    return select.options[select.selectedIndex] || null;
  }

  function getRaffleTournamentBuyin(select) {
    var opt = getRaffleTournamentSelectedOption(select);
    if (!opt) return 0;
    var raw = opt.getAttribute("data-price");
    if (raw == null || raw === "") raw = opt.value;
    var n = parseFloat(String(raw).replace(",", "."));
    return isNaN(n) ? 0 : n;
  }

  function getRaffleTournamentName(select) {
    var opt = getRaffleTournamentSelectedOption(select);
    if (!opt) return "";
    return (opt.getAttribute("data-name") || opt.textContent || "").trim();
  }

  function setupTournamentDaySelect() {
    var select = document.getElementById("raffleTicketTournamentSelect");
    if (!select || select._tournamentDaySetupDone) return;
    select._tournamentDaySetupDone = true;
    Array.prototype.forEach.call(select.options || [], function (opt) {
      if (!opt) return;
      if (opt.value !== "" && opt.value !== "custom" && !opt.hasAttribute("data-price")) {
        opt.setAttribute("data-price", opt.value);
      }
    });

    // Поднять группу «Турнир дня» наверх
    var groups = select.querySelectorAll("optgroup");
    var tdGroup = null;
    for (var gi = 0; gi < groups.length; gi++) {
      var label = (groups[gi].getAttribute("label") || "").toLowerCase();
      if (label.indexOf("турнир дня") !== -1) {
        tdGroup = groups[gi];
        break;
      }
    }
    if (tdGroup && select.firstElementChild && tdGroup !== select.firstElementChild) {
      // Оставляем первую «— Выберите турнир —», а группу турнирa дня ставим сразу после неё
      var first = select.firstElementChild;
      if (first && first.tagName === "OPTION" && first.nextSibling) {
        select.insertBefore(tdGroup, first.nextSibling);
      }
    }

    // Выделить сегодняшний турнир дня
    var now = new Date();
    var moscowOffsetMs = 3 * 60 * 60 * 1000;
    var moscowNow = new Date(now.getTime() + moscowOffsetMs);
    var weekday = moscowNow.getUTCDay(); // 0=Вс,1=Пн...
    var dayMap = { 1: "(Пн)", 2: "(Вт)", 3: "(Ср)", 4: "(Чт)", 5: "(Пт)", 6: "(Сб)", 0: "(Вс)" };
    var marker = dayMap[weekday];
    if (!marker) return;
    var options = tdGroup ? tdGroup.querySelectorAll("option") : [];
    var todayOpt = null;
    for (var oi = 0; oi < options.length; oi++) {
      var txt = options[oi].textContent || "";
      if (txt.indexOf(marker) !== -1) {
        todayOpt = options[oi];
        break;
      }
    }
    if (todayOpt) {
      todayOpt.selected = true;
      if (todayOpt.textContent.indexOf("сегодня") === -1) {
        todayOpt.textContent = todayOpt.textContent + " — сегодня";
      }
    }
  }

  function switchRaffleCreatePanel() {
    var isTickets = getRaffleCreateType() === "tickets";
    if (raffleCreatePanelTickets) raffleCreatePanelTickets.classList.toggle("raffle-create-form__panel--hidden", !isTickets);
    if (raffleCreatePanelOther) raffleCreatePanelOther.classList.toggle("raffle-create-form__panel--hidden", isTickets);
    if (isTickets) {
      setupTournamentDaySelect();
      buildTicketGroupInputs();
      syncSingleTicketCustomInputs();
      updateRaffleCreateTotal();
    } else {
      buildGroupInputs();
    }
  }

  var raffleTicketTournamentWrap = document.getElementById("raffleTicketTournamentWrap");
  var raffleTicketCustomFields = document.getElementById("raffleTicketCustomFields");
  var raffleTicketCustomName = document.getElementById("raffleTicketCustomName");
  var raffleTicketCustomPrice = document.getElementById("raffleTicketCustomPrice");
  function ensureSingleTicketCustomFields() {
    if (raffleTicketCustomFields && raffleTicketCustomName && raffleTicketCustomPrice) return;
    if (!raffleTicketTournamentWrap) return;
    var wrap = document.createElement("div");
    wrap.id = "raffleTicketCustomFields";
    wrap.style.display = "none";
    wrap.innerHTML =
      '<label class="randomizer-label">' +
      '<span class="randomizer-label__text">Название турнира:</span>' +
      '<input type="text" id="raffleTicketCustomName" class="randomizer-input" maxlength="120" placeholder="Например, Sunday Million" />' +
      "</label>" +
      '<label class="randomizer-label">' +
      '<span class="randomizer-label__text">Цена билета:</span>' +
      '<input type="number" id="raffleTicketCustomPrice" class="randomizer-input" min="0" step="0.01" inputmode="decimal" placeholder="Например, 550" />' +
      "</label>";
    raffleTicketTournamentWrap.appendChild(wrap);
    raffleTicketCustomFields = document.getElementById("raffleTicketCustomFields");
    raffleTicketCustomName = document.getElementById("raffleTicketCustomName");
    raffleTicketCustomPrice = document.getElementById("raffleTicketCustomPrice");
    if (raffleTicketCustomName) raffleTicketCustomName.addEventListener("input", updateRaffleCreateTotal);
    if (raffleTicketCustomPrice) raffleTicketCustomPrice.addEventListener("input", updateRaffleCreateTotal);
  }
  function buildTicketGroupInputs() {
    if (!raffleTicketGroupCount || !raffleTicketWinnersWrap || !raffleTicketGroups) return;
    var n = Math.max(1, Math.min(10, parseInt(raffleTicketGroupCount.value, 10) || 1));
    raffleTicketWinnersWrap.classList.toggle("raffle-ticket-winners-wrap--single", n === 1);
    if (raffleTicketTournamentWrap) raffleTicketTournamentWrap.style.display = n === 1 ? "" : "none";
    if (n === 1) {
      raffleTicketGroups.innerHTML = "";
      return;
    }
    raffleTicketGroups.innerHTML = "";
    for (var i = 0; i < n; i++) {
      var div = document.createElement("div");
      div.className = "raffle-ticket-group-row";
      var tournamentSelect = raffleTicketTournamentSelect ? raffleTicketTournamentSelect.cloneNode(true) : null;
      if (tournamentSelect) {
        tournamentSelect.removeAttribute("id");
        tournamentSelect.className = "randomizer-input raffle-tournament-select raffle-ticket-group-tournament";
        tournamentSelect.setAttribute("data-group-index", String(i));
        tournamentSelect.setAttribute("aria-label", "Турнир для группы " + (i + 1));
      }
      var selectHtml = tournamentSelect ? tournamentSelect.outerHTML : "<select class=\"randomizer-input raffle-tournament-select raffle-ticket-group-tournament\" data-group-index=\"" + i + "\" aria-label=\"Турнир для группы " + (i + 1) + "\"><option value=\"\">— Выберите турнир —</option></select>";
      div.innerHTML = "<label class=\"randomizer-label\"><span class=\"randomizer-label__text\">Группа " + (i + 1) + " (<span class=\"raffle-ticket-group-winners-num\" data-group-index=\"" + i + "\">1</span> побед.) — турнир:</span>" + selectHtml + "</label><label class=\"randomizer-label raffle-ticket-group-custom-name-wrap\" style=\"display:none;\"><span class=\"randomizer-label__text\">название турнира:</span><input type=\"text\" class=\"raffle-ticket-group-custom-name randomizer-input\" maxlength=\"120\" data-group-index=\"" + i + "\" placeholder=\"Например, Sunday Million\" /></label><label class=\"randomizer-label raffle-ticket-group-custom-price-wrap\" style=\"display:none;\"><span class=\"randomizer-label__text\">цена билета:</span><input type=\"number\" class=\"raffle-ticket-group-custom-price randomizer-input\" min=\"0\" step=\"0.01\" inputmode=\"decimal\" data-group-index=\"" + i + "\" placeholder=\"Например, 550\" /></label><label class=\"randomizer-label\"><span class=\"randomizer-label__text\">мест:</span><input type=\"number\" class=\"raffle-ticket-group-count randomizer-input\" min=\"0\" max=\"100\" value=\"1\" data-group-index=\"" + i + "\" /></label>";
      raffleTicketGroups.appendChild(div);
    }
    syncTicketGroupCustomInputs();
    updateRaffleCreateTotal();
    updateTicketGroupWinnersLabels();
  }

  function syncSingleTicketCustomInputs() {
    ensureSingleTicketCustomFields();
    if (!raffleTicketTournamentSelect || !raffleTicketCustomFields) return;
    raffleTicketCustomFields.style.display = raffleTicketTournamentSelect.value === "custom" ? "" : "none";
  }

  function syncTicketGroupCustomInputs() {
    if (!raffleTicketGroups) return;
    raffleTicketGroups.querySelectorAll(".raffle-ticket-group-row").forEach(function (row) {
      var groupSelect = row.querySelector(".raffle-ticket-group-tournament");
      var isCustom = !!(groupSelect && groupSelect.value === "custom");
      var nameWrap = row.querySelector(".raffle-ticket-group-custom-name-wrap");
      var priceWrap = row.querySelector(".raffle-ticket-group-custom-price-wrap");
      if (nameWrap) nameWrap.style.display = isCustom ? "" : "none";
      if (priceWrap) priceWrap.style.display = isCustom ? "" : "none";
    });
  }

  function updateTicketGroupWinnersLabels() {
    if (!raffleTicketGroups) return;
    raffleTicketGroups.querySelectorAll(".raffle-ticket-group-row").forEach(function (row) {
      var countInput = row.querySelector(".raffle-ticket-group-count");
      var numEl = row.querySelector(".raffle-ticket-group-winners-num");
      if (numEl && countInput) {
        var n = Math.max(0, parseInt(countInput.value, 10) || 0);
        numEl.textContent = String(n);
      }
    });
  }

  function updateRaffleCreateTotal() {
    if (!raffleCreateTotal) return;
    var total = 0;
    var parts = [];
    if (raffleTicketGroupCount && parseInt(raffleTicketGroupCount.value, 10) === 1) {
      var c = Math.max(0, parseInt(raffleTicketWinnersCount.value, 10) || 0);
      var buyin = 0;
      if (raffleTicketTournamentSelect && raffleTicketTournamentSelect.value && raffleTicketTournamentSelect.value !== "custom") {
        buyin = getRaffleTournamentBuyin(raffleTicketTournamentSelect);
      } else if (raffleTicketTournamentSelect && raffleTicketTournamentSelect.value === "custom" && raffleTicketCustomPrice && raffleTicketCustomPrice.value) {
        buyin = parseFloat(raffleTicketCustomPrice.value) || 0;
      }
      total = c * buyin;
      if (c > 0 && buyin >= 0) parts.push(c + " × " + (buyin % 1 === 0 ? buyin : buyin.toFixed(2)) + " ₽");
    } else if (raffleTicketGroups) {
      var rows = raffleTicketGroups.querySelectorAll(".raffle-ticket-group-row");
      for (var i = 0; i < rows.length; i++) {
        var countInput = rows[i].querySelector(".raffle-ticket-group-count");
        var groupSelect = rows[i].querySelector(".raffle-ticket-group-tournament");
        var cnt = countInput ? Math.max(0, parseInt(countInput.value, 10) || 0) : 0;
        var buyin = 0;
        if (groupSelect && groupSelect.value && groupSelect.value !== "custom") {
          buyin = getRaffleTournamentBuyin(groupSelect);
        } else if (groupSelect && groupSelect.value === "custom") {
          var customPrice = rows[i].querySelector(".raffle-ticket-group-custom-price");
          if (customPrice && customPrice.value) buyin = parseFloat(customPrice.value) || 0;
        }
        total += cnt * buyin;
        if (cnt > 0 && buyin >= 0) parts.push(cnt + " × " + (buyin % 1 === 0 ? buyin : buyin.toFixed(2)) + " ₽");
      }
    }
    var suffix = parts.length > 0 ? " (" + parts.join(", ") + ")" : "";
    raffleCreateTotal.textContent = "Итого: " + (total % 1 === 0 ? total : total.toFixed(2)) + " ₽" + suffix;
  }

  function buildGroupInputs() {
    if (!groupCountInput || !raffleGroupsEl) return;
    var n = Math.max(1, Math.min(10, parseInt(groupCountInput.value, 10) || 1));
    raffleGroupsEl.innerHTML = "";
    for (var i = 0; i < n; i++) {
      var div = document.createElement("div");
      div.className = "raffle-group-row";
      div.innerHTML = "<label class=\"randomizer-label\"><span class=\"randomizer-label__text\">Группа " + (i + 1) + " — мест:</span><input type=\"number\" class=\"raffle-group-count randomizer-input\" min=\"0\" max=\"100\" value=\"1\" data-group-index=\"" + i + "\" /></label>" +
        "<label class=\"randomizer-label\"><span class=\"randomizer-label__text\">Приз:</span><input type=\"text\" class=\"raffle-group-prize randomizer-input\" placeholder=\"Название приза\" data-group-index=\"" + i + "\" /></label>";
      raffleGroupsEl.appendChild(div);
    }
  }

  function setRafflesTab(tab) {
    var isActive = tab === "active";
    if (rafflesTabActive) rafflesTabActive.classList.toggle("raffles-tab--active", isActive);
    if (rafflesTabCompleted) rafflesTabCompleted.classList.toggle("raffles-tab--active", !isActive);
    if (rafflesPanelActive) rafflesPanelActive.classList.toggle("raffles-panel--active", isActive);
    if (rafflesPanelActive) rafflesPanelActive.classList.toggle("raffles-panel--hidden", !isActive);
    if (rafflesPanelCompleted) rafflesPanelCompleted.classList.toggle("raffles-panel--active", !isActive);
    if (rafflesPanelCompleted) rafflesPanelCompleted.classList.toggle("raffles-panel--hidden", isActive);
  }
  if (rafflesTabActive) rafflesTabActive.addEventListener("click", function () { setRafflesTab("active"); });
  if (rafflesTabCompleted) rafflesTabCompleted.addEventListener("click", function () { setRafflesTab("completed"); });
  if (raffleWinnerLeadersExpandBtn) raffleWinnerLeadersExpandBtn.addEventListener("click", openRaffleWinnerLeadersModal);
  if (raffleWinnerLeadersModalClose) raffleWinnerLeadersModalClose.addEventListener("click", closeRaffleWinnerLeadersModal);
  if (raffleWinnerLeadersModalBackdrop) raffleWinnerLeadersModalBackdrop.addEventListener("click", closeRaffleWinnerLeadersModal);

  if (raffleInviteFriendInlineBtn) {
    raffleInviteFriendInlineBtn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      if (!currentRaffleData) return;
      var raffle = currentRaffleData;
      var groups = raffle.groups || [];
      var total = raffle.totalWinners || 0;
      var totalPrize = getRaffleTotalPrize(raffle);
      var tournamentName = raffleDisplayPrizeText((raffle.title || (groups[0] && groups[0].prize) || "").trim()) || "турнир клуба";
      var link = buildMiniAppStartLink("raffles");
      if (isTelegramWebApp() && typeof pokerOpenTelegramShareUrlOnly === "function" && pokerOpenTelegramShareUrlOnly(link)) {
        if (typeof recordShareButtonClick === "function") recordShareButtonClick("raffle_card");
        return;
      }
      var text =
        "Разыгрываем " +
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

  if (createToggle && createForm) {
    createToggle.addEventListener("click", function () {
      createForm.classList.toggle("raffle-create-form--hidden");
      if (!createForm.classList.contains("raffle-create-form--hidden")) switchRaffleCreatePanel();
    });
  }
  if (duplicateLastBtn) {
    duplicateLastBtn.addEventListener("click", function () {
      if (window.__pokerRaffleCreateInFlight) return;
      window.__pokerRaffleCreateInFlight = true;
      duplicateLastBtn.disabled = true;
      var prevDuplicateText = duplicateLastBtn.textContent;
      duplicateLastBtn.textContent = "Повторяем…";
      var idemKey =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now()) + "_" + Math.random().toString(36).slice(2, 11);
      function raffleDuplicateResetUi() {
        window.__pokerRaffleCreateInFlight = false;
        duplicateLastBtn.disabled = false;
        duplicateLastBtn.textContent = prevDuplicateText;
      }
      fetch(base + "/api/raffles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          pokerGuestOrAuthedPostBody({
            action: "duplicateLast",
            createIdempotencyKey: idemKey,
          })
        ),
      })
        .then(function (r) {
          return r
            .json()
            .catch(function () {
              return { ok: false, error: "Не удалось разобрать ответ сервера" };
            })
            .then(function (data) {
              var d = data && typeof data === "object" ? data : { ok: false, error: "Ошибка ответа" };
              if (!r.ok && !d.error) {
                d = Object.assign({}, d, { ok: false, error: "Ошибка " + (r.status || "") + (r.statusText ? " " + r.statusText : "") });
              }
              return d;
            });
        })
        .then(function (data) {
          raffleDuplicateResetUi();
          if (data && data.ok && data.raffle) {
            if (createForm) createForm.classList.add("raffle-create-form--hidden");
            focusRaffleAfterMutation(data.raffle.id);
            clearRafflesCache();
            loadRaffles();
            if (!data.idempotentReplay) {
              if (tg && tg.showAlert) tg.showAlert("Розыгрыш повторён");
              else if (typeof alert === "function") alert("Розыгрыш повторён");
            }
          } else {
            var errMsg = (data && data.error) || "Ошибка";
            if (tg && tg.showAlert) tg.showAlert(errMsg);
            else if (typeof alert === "function") alert(errMsg);
          }
        })
        .catch(function () {
          raffleDuplicateResetUi();
          if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
          else if (typeof alert === "function") alert(POKER_NET_ERR);
        });
    });
  }
  if (raffleTypeTickets) raffleTypeTickets.addEventListener("change", switchRaffleCreatePanel);
  if (raffleTypeOther) raffleTypeOther.addEventListener("change", switchRaffleCreatePanel);
  if (raffleTicketTournamentSelect) raffleTicketTournamentSelect.addEventListener("change", function () {
    syncSingleTicketCustomInputs();
    updateRaffleCreateTotal();
  });
  if (raffleTicketGroupCount) raffleTicketGroupCount.addEventListener("change", buildTicketGroupInputs);
  if (raffleTicketGroupCount) raffleTicketGroupCount.addEventListener("input", buildTicketGroupInputs);
  if (raffleTicketWinnersCount) raffleTicketWinnersCount.addEventListener("input", updateRaffleCreateTotal);
  if (raffleTicketCustomName) raffleTicketCustomName.addEventListener("input", updateRaffleCreateTotal);
  if (raffleTicketCustomPrice) raffleTicketCustomPrice.addEventListener("input", updateRaffleCreateTotal);
  if (raffleTicketGroups) {
    raffleTicketGroups.addEventListener("input", function (e) {
      if (e.target && (e.target.classList.contains("raffle-ticket-group-count") || e.target.classList.contains("raffle-ticket-group-custom-name") || e.target.classList.contains("raffle-ticket-group-custom-price"))) {
        updateTicketGroupWinnersLabels();
        updateRaffleCreateTotal();
      }
    });
    raffleTicketGroups.addEventListener("change", function (e) {
      if (e.target && e.target.classList.contains("raffle-ticket-group-tournament")) {
        syncTicketGroupCustomInputs();
        updateRaffleCreateTotal();
      }
    });
  }
  if (groupCountInput && raffleGroupsEl) {
    groupCountInput.addEventListener("change", buildGroupInputs);
  }
  if (createBtn) {
    createBtn.addEventListener("click", function () {
      if (window.__pokerRaffleCreateInFlight) return;
      var isTickets = getRaffleCreateType() === "tickets";
      var endDateEl = isTickets ? raffleEndDateInput : raffleEndDateOther;
      var endVal = endDateEl ? endDateEl.value : "";
      if (!endVal) {
        if (tg && tg.showAlert) tg.showAlert("Укажите дату и время завершения");
        return;
      }
      var endDate = parseMoscowDateTimeLocal(endVal);
      if (isNaN(endDate.getTime())) {
        if (tg && tg.showAlert) tg.showAlert("Некорректная дата");
        return;
      }
      var totalWinners;
      var groups;
      var title = "";
      if (isTickets) {
        totalWinners = 0;
        groups = [];
        if (raffleTicketGroupCount && parseInt(raffleTicketGroupCount.value, 10) === 1) {
          var c = Math.max(0, parseInt(raffleTicketWinnersCount.value, 10) || 0);
          totalWinners = c;
          var singleBuyin = 0;
          if (raffleTicketTournamentSelect && raffleTicketTournamentSelect.value && raffleTicketTournamentSelect.value !== "custom") {
            singleBuyin = getRaffleTournamentBuyin(raffleTicketTournamentSelect);
          } else if (raffleTicketTournamentSelect && raffleTicketTournamentSelect.value === "custom" && raffleTicketCustomPrice && raffleTicketCustomPrice.value) {
            singleBuyin = parseFloat(raffleTicketCustomPrice.value) || 0;
          }
          var singleTournamentName = "";
          if (raffleTicketTournamentSelect && raffleTicketTournamentSelect.value === "custom") {
            singleTournamentName = raffleTicketCustomName ? raffleTicketCustomName.value.trim() : "";
          } else if (raffleTicketTournamentSelect) {
            singleTournamentName = getRaffleTournamentName(raffleTicketTournamentSelect);
          }
          var singlePrizeText = singleBuyin > 0 ? "Беккинг-билет " + (singleBuyin % 1 === 0 ? singleBuyin : singleBuyin.toFixed(2)) + " ₽" : "Беккинг-билет на турнир";
          var singlePrize = singlePrizeText + (singleTournamentName ? " — " + singleTournamentName : "");
          if (c > 0) groups.push({ count: c, prize: singlePrize });
        } else if (raffleTicketGroups) {
          var rows = raffleTicketGroups.querySelectorAll(".raffle-ticket-group-row");
          for (var i = 0; i < rows.length; i++) {
            var countInput = rows[i].querySelector(".raffle-ticket-group-count");
            var groupSelect = rows[i].querySelector(".raffle-ticket-group-tournament");
            var cnt = countInput ? Math.max(0, parseInt(countInput.value, 10) || 0) : 0;
            var groupBuyin = 0;
            if (groupSelect && groupSelect.value && groupSelect.value !== "custom") {
              groupBuyin = getRaffleTournamentBuyin(groupSelect);
            } else if (groupSelect && groupSelect.value === "custom") {
              var groupCustomPrice = rows[i].querySelector(".raffle-ticket-group-custom-price");
              if (groupCustomPrice && groupCustomPrice.value) groupBuyin = parseFloat(groupCustomPrice.value) || 0;
            }
            var groupTournamentName = "";
            if (groupSelect && groupSelect.value === "custom") {
              var groupCustomName = rows[i].querySelector(".raffle-ticket-group-custom-name");
              groupTournamentName = groupCustomName ? groupCustomName.value.trim() : "";
            } else if (groupSelect) {
              groupTournamentName = getRaffleTournamentName(groupSelect);
            }
            var groupPrizeText = groupBuyin > 0 ? "Беккинг-билет " + (groupBuyin % 1 === 0 ? groupBuyin : groupBuyin.toFixed(2)) + " ₽" : "Беккинг-билет на турнир";
            var groupPrize = groupPrizeText + (groupTournamentName ? " — " + groupTournamentName : "");
            totalWinners += cnt;
            if (cnt > 0) groups.push({ count: cnt, prize: groupPrize });
          }
        }
        if (groups.length === 0) {
          if (tg && tg.showAlert) tg.showAlert("Укажите количество победителей");
          return;
        }
        title = "Розыгрыш беккинг-билетов на турниры";
      } else {
        var groupInputs = raffleGroupsEl ? raffleGroupsEl.querySelectorAll(".raffle-group-count") : [];
        var prizeInputs = raffleGroupsEl ? raffleGroupsEl.querySelectorAll(".raffle-group-prize") : [];
        groups = [];
        totalWinners = 0;
        for (var j = 0; j < groupInputs.length; j++) {
          var count = Math.max(0, parseInt(groupInputs[j].value, 10) || 0);
          var prize = prizeInputs[j] ? prizeInputs[j].value.trim().slice(0, 200) : "";
          totalWinners += count;
          groups.push({ count: count, prize: prize });
        }
        if (groups.length === 0) groups = [{ count: 1, prize: "Приз" }];
        totalWinners = Math.max(1, totalWinners);
        title = document.getElementById("raffleTitle") ? document.getElementById("raffleTitle").value.trim().slice(0, 200) : "";
      }
      window.__pokerRaffleCreateInFlight = true;
      createBtn.disabled = true;
      var prevCreateBtnText = createBtn.textContent;
      createBtn.textContent = "Создание…";
      var idemKey =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now()) + "_" + Math.random().toString(36).slice(2, 11);
      function raffleCreateResetUi() {
        window.__pokerRaffleCreateInFlight = false;
        createBtn.disabled = false;
        createBtn.textContent = prevCreateBtnText;
      }
      fetch(base + "/api/raffles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          pokerGuestOrAuthedPostBody({
            action: "create",
            totalWinners: totalWinners,
            groups: groups,
            endDate: endDate.toISOString(),
            title: title || undefined,
            createIdempotencyKey: idemKey,
          })
        ),
      })
        .then(function (r) {
          return r
            .json()
            .catch(function () {
              return { ok: false, error: "Не удалось разобрать ответ сервера" };
            })
            .then(function (data) {
              var d = data && typeof data === "object" ? data : { ok: false, error: "Ошибка ответа" };
              if (!r.ok && !d.error) {
                d = Object.assign({}, d, { ok: false, error: "Ошибка " + (r.status || "") + (r.statusText ? " " + r.statusText : "") });
              }
              return d;
            });
        })
        .then(function (data) {
          raffleCreateResetUi();
          if (data && data.ok && data.raffle) {
            createForm.classList.add("raffle-create-form--hidden");
            focusRaffleAfterMutation(data.raffle.id);
            clearRafflesCache();
            loadRaffles();
            if (!data.idempotentReplay) {
              if (tg && tg.showAlert) tg.showAlert("Розыгрыш создан");
              else if (typeof alert === "function") alert("Розыгрыш создан");
            }
          } else {
            var errMsg = (data && data.error) || "Ошибка";
            if (tg && tg.showAlert) tg.showAlert(errMsg);
            else if (typeof alert === "function") alert(errMsg);
          }
        })
        .catch(function () {
          raffleCreateResetUi();
          if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
          else if (typeof alert === "function") alert(POKER_NET_ERR);
        });
    });
  }

  if (raffleCompleteBtn) {
    raffleCompleteBtn.addEventListener("click", function () {
      if (!rafflesIsAdmin) return;
      if (!currentRaffleId) {
        if (tg && tg.showAlert) tg.showAlert("Розыгрыш не выбран. Обновите страницу.");
        return;
      }
      if (!base || !pokerApiHasCredential()) {
        if (tg && tg.showAlert) tg.showAlert("Откройте приложение в Telegram.");
        return;
      }
      var doComplete = function () {
        raffleCompleteBtn.disabled = true;
        fetch(base + "/api/raffles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pokerGuestOrAuthedPostBody({ action: "complete", raffleId: currentRaffleId })),
        })
          .then(function (r) {
            return r.json().catch(function () { return { ok: false, error: "Ошибка ответа сервера" }; });
          })
          .then(function (data) {
            raffleCompleteBtn.disabled = false;
            if (data && data.ok) {
              if (currentRaffleId) focusRaffleAfterMutation(null);
              clearRafflesCache();
              if (tg && tg.showAlert) tg.showAlert("Розыгрыш завершён. Победители определены.");
              loadRaffles(true);
            } else if (tg && tg.showAlert) {
              tg.showAlert((data && data.error) || "Ошибка завершения розыгрыша");
            }
          })
          .catch(function () {
            raffleCompleteBtn.disabled = false;
            if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
          });
      };
      if (tg && tg.showConfirm) {
        tg.showConfirm("Завершить розыгрыш сейчас и определить победителей? Приём заявок будет остановлен.", function (ok) {
          if (ok) doComplete();
        });
      } else {
        var sure = window.confirm("Завершить розыгрыш сейчас и определить победителей? Приём заявок будет остановлен.");
        if (sure) doComplete();
      }
    });
  }

  function runActiveRaffleAdminAction(action, button, confirmMessage, successMessage, errorMessage, afterOk) {
    if (!rafflesIsAdmin) return;
    if (!currentRaffleId) {
      if (tg && tg.showAlert) tg.showAlert("Розыгрыш не выбран. Обновите страницу.");
      return;
    }
    if (!base || !pokerApiHasCredential()) {
      if (tg && tg.showAlert) tg.showAlert("Откройте приложение в Telegram.");
      return;
    }
    var doAction = function () {
      var raffleIdForAction = currentRaffleId;
      if (button) button.disabled = true;
      fetch(base + "/api/raffles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pokerGuestOrAuthedPostBody({ action: action, raffleId: raffleIdForAction })),
      })
        .then(function (r) {
          return r.json().catch(function () { return { ok: false, error: "Ошибка ответа сервера" }; });
        })
        .then(function (data) {
          if (button) button.disabled = false;
          if (data && data.ok) {
            if (typeof afterOk === "function") afterOk(raffleIdForAction, data);
            clearRafflesCache();
            if (tg && tg.showAlert) tg.showAlert(successMessage);
            loadRaffles();
          } else if (tg && tg.showAlert) {
            tg.showAlert((data && data.error) || errorMessage);
          }
        })
        .catch(function () {
          if (button) button.disabled = false;
          if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
        });
    };
    if (tg && tg.showConfirm) {
      tg.showConfirm(confirmMessage, function (ok) {
        if (ok) doAction();
      });
    } else {
      var sure = window.confirm(confirmMessage);
      if (sure) doAction();
    }
  }

  function cancelActiveRaffle(button) {
    runActiveRaffleAdminAction(
      "cancel",
      button || raffleCancelBtn,
      "Отменить розыгрыш? Это действие нельзя будет отменить.",
      "Розыгрыш отменён",
      "Ошибка отмены розыгрыша",
      function () {
        if (currentRaffleId) focusRaffleAfterMutation(null);
      }
    );
  }

  function deleteActiveRaffle(button) {
    runActiveRaffleAdminAction(
      "delete",
      button || raffleDeleteBtn,
      "Удалить этот розыгрыш окончательно?",
      "Розыгрыш удалён",
      "Ошибка удаления розыгрыша",
      function (deletedRaffleId) {
        if (rafflesFocusedActiveId === deletedRaffleId) focusRaffleAfterMutation(null);
        if (currentRaffleId === deletedRaffleId) currentRaffleId = null;
      }
    );
  }

  if (raffleCancelBtn) {
    raffleCancelBtn.addEventListener("click", function (e) {
      if (e) e.__pokerRaffleAdminHandled = true;
      cancelActiveRaffle(raffleCancelBtn);
    });
  }

  if (raffleUpdateEndBtn) {
    raffleUpdateEndBtn.addEventListener("click", function () {
      if (!rafflesIsAdmin) return;
      if (!currentRaffleId) {
        if (tg && tg.showAlert) tg.showAlert("Розыгрыш не выбран. Обновите страницу.");
        return;
      }
      if (!base || !pokerApiHasCredential()) {
        if (tg && tg.showAlert) tg.showAlert("Откройте приложение в Telegram.");
        return;
      }
      var currentStr = currentRaffleEndDate ? formatMoscowDateTimeLocalForInput(currentRaffleEndDate) : "";
      var ans = prompt("Новое время завершения/итогов (МСК)\nФормат: ГГГГ-ММ-ДДTЧЧ:ММ", currentStr);
      if (ans == null) return;
      ans = String(ans).trim();
      if (!ans) return;
      var dt = parseMoscowDateTimeLocal(ans);
      if (!dt || !(dt instanceof Date) || isNaN(dt.getTime())) {
        if (tg && tg.showAlert) tg.showAlert("Не удалось распознать дату/время. Пример: 2026-03-17T21:00");
        return;
      }
      raffleUpdateEndBtn.disabled = true;
      fetch(base + "/api/raffles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          pokerGuestOrAuthedPostBody({ action: "updateEndDate", raffleId: currentRaffleId, endDate: dt.toISOString() })
        ),
      })
        .then(function (r) { return r.json().catch(function () { return { ok: false, error: "Ошибка ответа сервера" }; }); })
        .then(function (data) {
          raffleUpdateEndBtn.disabled = false;
          if (data && data.ok) {
            if (data.raffle && data.raffle.id) focusRaffleAfterMutation(data.raffle.id);
            clearRafflesCache();
            if (tg && tg.showAlert) tg.showAlert("Время итогов обновлено");
            loadRaffles();
          } else if (tg && tg.showAlert) {
            tg.showAlert((data && data.error) || "Ошибка обновления времени");
          }
        })
        .catch(function () {
          raffleUpdateEndBtn.disabled = false;
          if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
        });
    });
  }

  if (raffleDeleteBtn) {
    raffleDeleteBtn.addEventListener("click", function (e) {
      if (e) e.__pokerRaffleAdminHandled = true;
      deleteActiveRaffle(raffleDeleteBtn);
    });
  }

  if (rafflesRoot && !rafflesRoot.__pokerActiveRaffleAdminFallbackBound) {
    rafflesRoot.__pokerActiveRaffleAdminFallbackBound = true;
    rafflesRoot.addEventListener("click", function (e) {
      if (!e || e.__pokerRaffleAdminHandled) return;
      var btn = e.target && e.target.closest ? e.target.closest("#raffleCancelBtn, #raffleDeleteBtn") : null;
      if (!btn || !rafflesRoot.contains(btn)) return;
      e.__pokerRaffleAdminHandled = true;
      if (btn.id === "raffleCancelBtn") cancelActiveRaffle(btn);
      else if (btn.id === "raffleDeleteBtn") deleteActiveRaffle(btn);
    });
  }

  if (rafflesCompleted) {
    rafflesCompleted.addEventListener("click", function (e) {
      var winnerBtn = e.target.closest(".raffle-winner-btn");
      if (winnerBtn && rafflesIsAdmin) {
        if (!base || !pokerApiHasCredential()) {
          if (tg && tg.showAlert) tg.showAlert("Откройте приложение в Telegram.");
          return;
        }
        var rid = winnerBtn.getAttribute("data-raffle-id");
        var wid = winnerBtn.getAttribute("data-winner-user-id");
        var row = winnerBtn.closest(".raffle-winner-row");
        var statusEl = row && row.querySelector(".raffle-winner-status");
        var currentStatus = statusEl && statusEl.classList.contains("raffle-winner-status--ok") ? "ok" : statusEl && statusEl.classList.contains("raffle-winner-status--fail") ? "fail" : null;
        if (rid && wid) {
          winnerBtn.disabled = true;
          setRaffleWinnerStatus(rid, wid, winnerBtn.classList.contains("raffle-winner-btn--ok"), currentStatus, function (ok) { if (!ok) winnerBtn.disabled = false; });
        }
        return;
      }
      if (!rafflesIsAdmin) return;
      var btn = e.target.closest(".raffle-completed-card__delete-btn");
      if (!btn) return;
      if (!base || !pokerApiHasCredential()) {
        if (tg && tg.showAlert) tg.showAlert("Откройте приложение в Telegram.");
        return;
      }
      var raffleId = btn.getAttribute("data-raffle-id") || "";
      if (!raffleId) return;
      var doDelete = function () {
        var deletingRaffleId = raffleId;
        btn.disabled = true;
        fetch(base + "/api/raffles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pokerGuestOrAuthedPostBody({ action: "delete", raffleId: deletingRaffleId })),
        })
          .then(function (r) {
            return r.json().catch(function () { return { ok: false, error: "Ошибка ответа сервера" }; });
          })
          .then(function (data) {
            btn.disabled = false;
            if (data && data.ok) {
              if (rafflesFocusedActiveId === deletingRaffleId) focusRaffleAfterMutation(null);
              clearRafflesCache();
              if (tg && tg.showAlert) tg.showAlert("Розыгрыш удалён");
              loadRaffles();
            } else if (tg && tg.showAlert) {
              tg.showAlert((data && data.error) || "Ошибка удаления розыгрыша");
            }
          })
          .catch(function () {
            btn.disabled = false;
            if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
          });
      };
      if (tg && tg.showConfirm) {
        tg.showConfirm("Удалить этот завершённый розыгрыш окончательно?", function (ok) {
          if (ok) doDelete();
        });
      } else {
        var sure = window.confirm("Точно удалить этот завершённый розыгрыш окончательно?");
        if (sure) doDelete();
      }
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

  if (raffleGuestLoginBtn && raffleGuestLoginBtn.dataset.bound !== "1") {
    raffleGuestLoginBtn.dataset.bound = "1";
    raffleGuestLoginBtn.addEventListener("click", function () {
      if (typeof window.__pokerOpenSharedAccountAuthFlow === "function") window.__pokerOpenSharedAccountAuthFlow();
    });
  }

  if (raffleJoinToggleBtn) {
    raffleJoinToggleBtn.addEventListener("click", function () {
      if (!currentRaffleId) {
        if (tg && tg.showAlert) tg.showAlert("Розыгрыш не выбран. Обновите страницу.");
        return;
      }
      var act = raffleJoinToggleBtn.getAttribute("data-raffle-action") || "join";
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
              if (data.raffle) renderRaffle(data.raffle);
              else if (currentRaffleData) renderRaffle(currentRaffleData);
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
            if (data.raffle) renderRaffle(data.raffle);
            else if (currentRaffleData) renderRaffle(currentRaffleData);
            showRaffleFeedback(data.alreadyJoined ? "Вы уже участвуете." : "Вы участвуете в розыгрыше.", "ok");
          } else {
            if (currentRaffleData) renderRaffle(currentRaffleData);
            var err = (data && data.error) || "Ошибка";
            showRaffleFeedback(err, "err");
            if (data && data.code === "P21_REQUIRED") {
              if (tg && tg.showAlert) tg.showAlert("Заполните свой ID в профиле. На него будет начисляться выигрыш. После сохранения вернитесь в «Розыгрыши» и нажмите «Участвовать» снова.");
              if (typeof setView === "function") setView("profile");
            } else if (data && data.code === "CHANNEL_REQUIRED") {
              if (tg && tg.showAlert) tg.showAlert(err + " После подписки вернитесь в мини-приложение и нажмите «Участвовать» снова.");
              if (tg && tg.openTelegramLink) {
                if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
                tg.openTelegramLink("https://t.me/dva_tuza_club");
              }
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

  initRaffles.__listenersBound = true;
  initRaffles.__boundRoot = rafflesRoot;
  initRaffles.__boundRaffleCancelBtn = raffleCancelBtn;
  initRaffles.__boundRaffleDeleteBtn = raffleDeleteBtn;
  initRaffles.__boundRaffleCompleteBtn = raffleCompleteBtn;
  initRaffles.__boundRafflesCompleted = rafflesCompleted;
  initRaffles.__reload = function () {
    loadRaffles();
  };
  loadRaffles();
}

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
