function initRafflesCompletedRuntime(opts) {
  opts = opts || {};
  with (opts) {
    var rafflesCompleted = document.getElementById("rafflesCompleted");
    var rafflesCompletedEmpty = document.getElementById("rafflesCompletedEmpty");
    var raffleWinnerLeaders = document.getElementById("raffleWinnerLeaders");
    var raffleWinnerLeadersList = document.getElementById("raffleWinnerLeadersList");
    var raffleWinnerLeadersSummary = document.getElementById("raffleWinnerLeadersSummary");
    var raffleWinnerLeadersExpandBtn = document.getElementById("raffleWinnerLeadersExpandBtn");
    var raffleWinnerLeadersModal = document.getElementById("raffleWinnerLeadersModal");
    var raffleWinnerLeadersModalBackdrop = document.getElementById("raffleWinnerLeadersModalBackdrop");
    var raffleWinnerLeadersModalClose = document.getElementById("raffleWinnerLeadersModalClose");
    var raffleWinnerLeadersModalList = document.getElementById("raffleWinnerLeadersModalList");
    var raffleWinnerLeaderRows = [];
    var RAFFLE_WINNER_LEADERS_PREVIEW_LIMIT = 5;

  function buildRaffleWinnerRowHtml(w, raffleId, isAdmin) {
    var uidRaw = String(w.userId != null ? w.userId : "").trim();
    var uidAttr = escapeHtml(uidRaw);
    var status = w.winnerStatus;
    var statusIcon = status === "ok" ? " ✓" : status === "fail" ? " ✗" : "";
    var statusClass = status === "ok" ? "raffle-winner-status--ok" : status === "fail" ? "raffle-winner-status--fail" : "";
    var winnerReady = w.winnerReady === true || String(w.winnerReady || "").toLowerCase() === "true";
    var viewerIds = [];
    try {
      viewerIds = typeof collectRaffleIdentityIds === "function" ? collectRaffleIdentityIds() : [];
    } catch (eViewerIds) {
      viewerIds = [];
    }
    var isMyWin = !!(uidRaw && viewerIds.indexOf(uidRaw) !== -1);
    var readyBadge = winnerReady
      ? "<span class=\"raffle-winner-ready-badge\">Готов</span>"
      : (isAdmin ? "<span class=\"raffle-winner-ready-badge raffle-winner-ready-badge--pending\">Не готов</span>" : "");
    var readyAction = isMyWin && status !== "ok"
      ? "<button type=\"button\" class=\"raffle-winner-ready-btn" +
        (winnerReady ? " raffle-winner-ready-btn--active" : "") +
        "\" data-raffle-id=\"" +
        escapeHtml(raffleId) +
        "\" data-winner-user-id=\"" +
        uidAttr +
        "\"" +
        (winnerReady ? " disabled aria-disabled=\"true\"" : "") +
        ">" +
        (winnerReady ? "Готов" : "Я готов") +
        "</button>"
      : "";
    var raffleIdText = w.p21Id != null && String(w.p21Id).trim()
      ? String(w.p21Id).trim()
      : (w.accountId != null && String(w.accountId).trim() ? String(w.accountId).trim() : uidRaw);
    var primaryLabel = String(w.name || "").trim() || uidRaw || "Игрок";
    var primaryText = raffleIdText ? primaryLabel + " — " + raffleIdText : primaryLabel;
    var tgLogin = w.telegramUsername != null ? String(w.telegramUsername).trim().replace(/^@+/g, "") : "";
    if (!/^[A-Za-z0-9_]{5,32}$/.test(tgLogin)) tgLogin = "";
    var profileOpen =
      uidRaw && (uidRaw.indexOf("tg_") === 0 || uidRaw.indexOf("vk_") === 0)
        ? "<button type=\"button\" class=\"raffle-participants__profile-btn raffle-winner-row__profile\" data-user-id=\"" +
          uidAttr +
          "\" data-user-name=\"" +
          escapeHtml(w.name || "") +
          "\">" +
          "<span class=\"raffle-winner-row__primary\">" +
          escapeHtml(primaryText) +
          "</span>" +
          "</button>"
        : "<span class=\"raffle-winner-row__primary\">" + escapeHtml(primaryText) + "</span>";
    var tgOpen = isAdmin && tgLogin
      ? "<a class=\"raffle-winner-row__tg\" href=\"https://t.me/" +
        escapeHtml(tgLogin) +
        "\" target=\"_blank\" rel=\"noopener noreferrer\">@" +
        escapeHtml(tgLogin) +
        "</a>"
      : "";
    var profileBlock = "<span class=\"raffle-winner-row__person\">" + profileOpen + tgOpen + readyBadge + "</span>";
    if (isAdmin) {
      var okActive = status === "ok" ? " raffle-winner-btn--active" : "";
      var failActive = status === "fail" ? " raffle-winner-btn--active" : "";
      return (
        "<li class=\"raffle-winner-row\">" +
        profileBlock +
        "<span class=\"raffle-winner-status " +
        statusClass +
        "\">" +
        statusIcon +
        "</span>" +
        readyAction +
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
      profileBlock +
      "<span class=\"raffle-winner-status " +
      statusClass +
      "\">" +
      statusIcon +
      "</span>" +
      readyAction +
      "</li>"
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

  function raffleWinnerPrizeAmount(prize) {
    var text = prize != null ? String(prize).replace(/\u00a0|\u202f/g, " ") : "";
    if (!text) return 0;
    var currencyMatch = text.match(/(\d[\d\s]*(?:[.,]\d+)?)\s*(?:₽|р\.?|руб\.?)/i);
    if (!currencyMatch) return 0;
    var normalized = currencyMatch[1].replace(/\s+/g, "").replace(",", ".");
    var value = parseFloat(normalized);
    return isFinite(value) && value > 0 ? value : 0;
  }

  function raffleWinnerPrizeText(raffle, winner) {
    if (winner && winner.prize) return winner.prize;
    var groupIndex = winner && winner.groupIndex != null ? parseInt(winner.groupIndex, 10) : -1;
    var groups = raffle && Array.isArray(raffle.groups) ? raffle.groups : [];
    if (groupIndex >= 0 && groups[groupIndex] && groups[groupIndex].prize) return groups[groupIndex].prize;
    return "";
  }

  function raffleWinnerLeaderTotalText(amount) {
    var n = Math.round(parseFloat(amount) || 0);
    if (n <= 0) return "";
    if (typeof formatRaffleSum === "function") return formatRaffleSum(n);
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f") + " ₽";
  }

  function raffleWinnerLeaderId(w) {
    if (!w) return "";
    var p21 = w.p21Id != null ? String(w.p21Id).trim() : "";
    if (p21) return p21;
    var accountId = w.accountId != null ? String(w.accountId).trim() : "";
    if (accountId) return accountId;
    var uid = w.userId != null ? String(w.userId).trim() : "";
    return uid;
  }

  function buildRaffleWinnerLeaderSummary(completed) {
    var participants = {};
    var winners = {};
    (completed || []).forEach(function (raffle) {
      if (!raffle || raffle.status === "cancelled") return;
      var participantRows = Array.isArray(raffle.participants) ? raffle.participants : [];
      var winnerRows = Array.isArray(raffle.winners) ? raffle.winners : [];
      if (!participantRows.length && !winnerRows.length) return;
      participantRows.forEach(function (p) {
        var id = raffleWinnerLeaderId(p);
        if (id) participants[id] = true;
      });
      winnerRows.forEach(function (w) {
        var id = raffleWinnerLeaderId(w);
        if (!id) return;
        winners[id] = true;
        participants[id] = true;
      });
    });
    return {
      participants: Object.keys(participants).length,
      winners: Object.keys(winners).length
    };
  }

  function raffleWinnerLeaderMetaText(row) {
    if (!row) return "";
    var parts = [];
    var login = row.telegramUsername != null ? String(row.telegramUsername).trim().replace(/^@+/g, "") : "";
    if (rafflesIsAdmin && login) parts.push("@" + login);
    var name = row.name != null ? String(row.name).trim() : "";
    if (name && name !== "Участник" && parts.indexOf(name) === -1) parts.push(name);
    return parts.join(" · ");
  }

  function raffleWinnerLeaderPokerNick(row) {
    if (!row) return "";
    var nick = row.pokerPlusNickname != null ? String(row.pokerPlusNickname).trim() : "";
    if (!nick) return "";
    if (row.id != null && nick === String(row.id).trim()) return "";
    return nick;
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
            pokerPlusNickname: w.pokerPlusNickname != null ? String(w.pokerPlusNickname).trim() : "",
            count: 0,
            totalPrize: 0
          };
        } else {
          if (!byId[id].name && w.name != null && String(w.name).trim()) byId[id].name = String(w.name).trim();
          if (!byId[id].telegramUsername && w.telegramUsername != null && String(w.telegramUsername).trim()) byId[id].telegramUsername = String(w.telegramUsername).trim();
          if (!byId[id].pokerPlusNickname && w.pokerPlusNickname != null && String(w.pokerPlusNickname).trim()) byId[id].pokerPlusNickname = String(w.pokerPlusNickname).trim();
          if (!byId[id].userId && w.userId != null && String(w.userId).trim()) byId[id].userId = String(w.userId).trim();
        }
        byId[id].count += 1;
        byId[id].totalPrize += raffleWinnerPrizeAmount(raffleWinnerPrizeText(raffle, w));
      });
    });
    return Object.keys(byId)
      .map(function (id) { return byId[id]; })
      .sort(function (a, b) {
        if (b.count !== a.count) return b.count - a.count;
        if ((b.totalPrize || 0) !== (a.totalPrize || 0)) return (b.totalPrize || 0) - (a.totalPrize || 0);
        return String(a.id).localeCompare(String(b.id), "ru");
      });
  }

  function raffleWinnerLeaderRowsHtml(rows) {
    return (rows || []).map(function (row) {
      var pokerNick = raffleWinnerLeaderPokerNick(row);
      var meta = raffleWinnerLeaderMetaText(row);
      var totalText = raffleWinnerLeaderTotalText(row.totalPrize);
      return (
        '<li class="raffle-winner-leaders__item"><span class="raffle-winner-leaders__id">' +
        escapeHtml(row.id) +
        (pokerNick ? '<span class="raffle-winner-leaders__poker-nick">Poker21: ' + escapeHtml(pokerNick) + "</span>" : "") +
        (meta ? '<span class="raffle-winner-leaders__meta">' + escapeHtml(meta) + "</span>" : "") +
        '</span><span class="raffle-winner-leaders__stats"><span class="raffle-winner-leaders__count">— ' +
        escapeHtml(raffleWinCountText(row.count)) +
        "</span>" +
        (totalText ? '<span class="raffle-winner-leaders__total">Итого: ' + escapeHtml(totalText) + "</span>" : "") +
        "</span></li>"
      );
    }).join("");
  }

  function renderRaffleWinnerLeaders(completed) {
    raffleWinnerLeaderRows = buildRaffleWinnerLeaderRows(completed);
    var summary = buildRaffleWinnerLeaderSummary(completed);
    var hasRows = raffleWinnerLeaderRows.length > 0;
    if (raffleWinnerLeaders) {
      raffleWinnerLeaders.hidden = !hasRows;
      raffleWinnerLeaders.classList.toggle("raffle-winner-leaders--hidden", !hasRows);
    }
    if (raffleWinnerLeadersSummary) {
      raffleWinnerLeadersSummary.textContent = hasRows
        ? "Уникальных участников: " + summary.participants + " · победителей: " + summary.winners
        : "";
    }
    if (raffleWinnerLeadersList) {
      raffleWinnerLeadersList.innerHTML = hasRows ? raffleWinnerLeaderRowsHtml(raffleWinnerLeaderRows.slice(0, RAFFLE_WINNER_LEADERS_PREVIEW_LIMIT)) : "";
    }
    if (raffleWinnerLeadersExpandBtn) {
      raffleWinnerLeadersExpandBtn.hidden = raffleWinnerLeaderRows.length <= RAFFLE_WINNER_LEADERS_PREVIEW_LIMIT;
      raffleWinnerLeadersExpandBtn.textContent = raffleWinnerLeaderRows.length > RAFFLE_WINNER_LEADERS_PREVIEW_LIMIT ? "Развернуть" : "Все показаны";
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

  function setRaffleWinnerReady(rid, wid, btn, onDone) {
    if (!rid || !wid || !base) {
      if (onDone) onDone(false);
      return;
    }
    fetch(base + "/api/raffles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerGuestOrAuthedPostBody({ action: "setWinnerReady", raffleId: rid, winnerUserId: wid })),
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.ok) {
          if (btn) {
            btn.textContent = "Готов";
            btn.disabled = true;
            btn.setAttribute("aria-disabled", "true");
            btn.classList.add("raffle-winner-ready-btn--active");
          }
          loadRaffles();
        } else if (tg && tg.showAlert) {
          tg.showAlert((data && data.error) || "Не удалось подтвердить готовность.");
        }
        if (onDone) onDone(!!(data && data.ok));
      })
      .catch(function () {
        if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
        if (onDone) onDone(false);
      });
  }

  function bindRaffleWinnerStatusButtons(container, raffleId) {
    if (!container || !base) return;
    container.querySelectorAll(".raffle-winner-ready-btn").forEach(function (btn) {
      if (btn.dataset.readyBound === "1") return;
      btn.dataset.readyBound = "1";
      btn.addEventListener("click", function () {
        if (btn.disabled) return;
        var rid = this.getAttribute("data-raffle-id") || raffleId;
        var wid = this.getAttribute("data-winner-user-id");
        if (!rid || !wid) return;
        btn.disabled = true;
        setRaffleWinnerReady(rid, wid, btn, function (ok) { if (!ok) btn.disabled = false; });
      });
    });
    if (!rafflesIsAdmin) return;
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


        function renderCompletedRafflesPanel(completed) {
          renderRaffleWinnerLeaders(completed);
          if (!rafflesCompleted) return;
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
              var adminActionsHtml = rafflesIsAdmin
                ? "<div class=\"raffle-completed-card__actions\"><button type=\"button\" class=\"raffle-completed-card__refresh-btn\" data-raffle-id=\"" +
                  escapeHtml(raffle.id || "") +
                  "\">Обновить</button><button type=\"button\" class=\"raffle-completed-card__delete-btn\" data-raffle-id=\"" +
                  escapeHtml(raffle.id || "") + "\">Удалить розыгрыш (админ)</button></div>"
                : "";
              return "<div class=\"raffle-completed-card\" data-raffle-id=\"" + escapeHtml(raffle.id || "") + "\"><p class=\"raffle-completed-card__meta\">" + escapeHtml(meta) + "</p>" +
                adminActionsHtml +
                (winHtml ? "<p class=\"raffle-completed-card__winners-title\">Победители</p><ul class=\"raffle-completed-card__winners\">" + winHtml + "</ul>" : "") + "</div>";
              }).join("");
          } else {
            rafflesCompleted.innerHTML = "";
            if (rafflesCompletedEmpty) rafflesCompletedEmpty.classList.remove("raffle-empty--hidden");
          }
        }


    if (raffleWinnerLeadersExpandBtn) raffleWinnerLeadersExpandBtn.addEventListener("click", openRaffleWinnerLeadersModal);
    if (raffleWinnerLeadersModalClose) raffleWinnerLeadersModalClose.addEventListener("click", closeRaffleWinnerLeadersModal);
    if (raffleWinnerLeadersModalBackdrop) raffleWinnerLeadersModalBackdrop.addEventListener("click", closeRaffleWinnerLeadersModal);

  if (rafflesCompleted) {
    rafflesCompleted.addEventListener("click", function (e) {
      var readyBtn = e.target.closest(".raffle-winner-ready-btn");
      if (readyBtn) {
        if (readyBtn.disabled) return;
        var readyRid = readyBtn.getAttribute("data-raffle-id");
        var readyWid = readyBtn.getAttribute("data-winner-user-id");
        if (!readyRid || !readyWid) return;
        readyBtn.disabled = true;
        setRaffleWinnerReady(readyRid, readyWid, readyBtn, function (ok) { if (!ok) readyBtn.disabled = false; });
        return;
      }
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
      var refreshBtn = e.target.closest(".raffle-completed-card__refresh-btn");
      if (refreshBtn) {
        if (refreshBtn.disabled) return;
        refreshBtn.disabled = true;
        refreshBtn.textContent = "Обновляю";
        clearRafflesCache();
        loadRaffles();
        setTimeout(function () {
          if (!refreshBtn || !refreshBtn.isConnected) return;
          refreshBtn.disabled = false;
          refreshBtn.textContent = "Обновить";
        }, 2500);
        return;
      }
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
      confirmRaffleAdminAction("Удалить этот завершённый розыгрыш окончательно?", doDelete);
    });
  }





    return {
      renderPanel: renderCompletedRafflesPanel,
      buildWinnerRowHtml: buildRaffleWinnerRowHtml,
      bindWinnerStatusButtons: bindRaffleWinnerStatusButtons
    };
  }
}
