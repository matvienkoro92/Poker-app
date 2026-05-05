function initRafflesAdminCreateRuntime(opts) {
  opts = opts || {};
  with (opts) {
    var createToggle = document.getElementById("rafflesCreateToggle");
    var duplicateLastBtn = document.getElementById("rafflesDuplicateLastBtn");
    var createForm = document.getElementById("raffleCreateForm");
    var raffleTypeTickets = document.getElementById("raffleTypeTickets");
    var raffleTypeOther = document.getElementById("raffleTypeOther");
    var raffleCreatePanelTickets = document.getElementById("raffleCreatePanelTickets");
    var raffleCreatePanelOther = document.getElementById("raffleCreatePanelOther");
    var raffleTicketGroupCount = document.getElementById("raffleTicketGroupCount");
    var raffleTicketWinnersWrap = document.getElementById("raffleTicketWinnersWrap");
    var raffleTicketWinnersCount = document.getElementById("raffleTicketWinnersCount");
    var raffleTicketGroups = document.getElementById("raffleTicketGroups");
    var raffleTicketTournamentSelect = document.getElementById("raffleTicketTournamentSelect");
    var raffleCreateTotal = document.getElementById("raffleCreateTotal");
    var raffleEndDateInput = document.getElementById("raffleEndDate");
    var groupCountInput = document.getElementById("raffleGroupCount");
    var raffleGroupsEl = document.getElementById("raffleGroups");
    var raffleEndDateOther = document.getElementById("raffleEndDateOther");
    var createBtn = document.getElementById("raffleCreateBtn");

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

  }
}
