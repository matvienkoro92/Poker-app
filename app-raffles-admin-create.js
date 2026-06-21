function initRafflesAdminCreateRuntime(opts) {
  opts = opts || {};
  with (opts) {
    var createToggle = document.getElementById("rafflesCreateToggle");
    var duplicateLastBtn = document.getElementById("rafflesDuplicateLastBtn");
    var knockoutPresetBtn = document.getElementById("rafflesCreateKnockoutPresetBtn");
    var createForm = document.getElementById("raffleCreateForm");
    var raffleTypeTickets = document.getElementById("raffleTypeTickets");
    var raffleTypePrizes = document.getElementById("raffleTypePrizes");
    var raffleTypeOther = document.getElementById("raffleTypeOther");
    var raffleCreatePanelTickets = document.getElementById("raffleCreatePanelTickets");
    var raffleCreatePanelPrizes = document.getElementById("raffleCreatePanelPrizes");
    var raffleCreatePanelOther = document.getElementById("raffleCreatePanelOther");
    var raffleTicketGroupCount = document.getElementById("raffleTicketGroupCount");
    var raffleTicketWinnersWrap = document.getElementById("raffleTicketWinnersWrap");
    var raffleTicketWinnersCount = document.getElementById("raffleTicketWinnersCount");
    var raffleTicketSingleAccess = document.getElementById("raffleTicketSingleAccess");
    var raffleTicketGroups = document.getElementById("raffleTicketGroups");
    var raffleTicketTournamentSelect = document.getElementById("raffleTicketTournamentSelect");
    var raffleCreateTotal = document.getElementById("raffleCreateTotal");
    var raffleEndDateInput = document.getElementById("raffleEndDate");
    var groupCountInput = document.getElementById("raffleGroupCount");
    var raffleGroupsEl = document.getElementById("raffleGroups");
    var rafflePhysicalGroupCount = document.getElementById("rafflePhysicalGroupCount");
    var rafflePhysicalGroupsEl = document.getElementById("rafflePhysicalGroups");
    var raffleEndDatePrizes = document.getElementById("raffleEndDatePrizes");
    var raffleEndDateOther = document.getElementById("raffleEndDateOther");
    var raffleDailyEnabled = document.getElementById("raffleDailyEnabled");
    var raffleDailyStartWrap = document.getElementById("raffleDailyStartWrap");
    var raffleDailyStartTime = document.getElementById("raffleDailyStartTime");
    var raffleAccessLevel = document.getElementById("raffleAccessLevel");
    var duplicateOptionsEl = document.getElementById("raffleDuplicateOptions");
    var createBtn = document.getElementById("raffleCreateBtn");
    var raffleAdminActionMode = "";

  function getRafflePrizeKind() {
    return getRaffleCreateType() === "other" ? "cash" : "tournament_ticket";
  }

  function raffleAdminCreateFormatMoscowInput(date) {
    if (typeof formatMoscowDateTimeLocalForInput === "function") return formatMoscowDateTimeLocalForInput(date);
    if (!date) return "";
    try {
      var s = date.toLocaleString("sv-SE", { timeZone: "Europe/Moscow", hour12: false });
      return s.replace(" ", "T").slice(0, 16);
    } catch (e) {
      return "";
    }
  }

  function nextMoscowWeekdayDateTime(weekday, hour, minute, minDaysAhead) {
    var now = new Date();
    var moscowOffsetMs = 3 * 60 * 60 * 1000;
    var moscowNow = new Date(now.getTime() + moscowOffsetMs);
    var currentWeekday = moscowNow.getUTCDay();
    var addDays = (weekday - currentWeekday + 7) % 7;
    var minDays = Math.max(0, parseInt(minDaysAhead, 10) || 0);
    while (addDays < minDays) addDays += 7;
    var targetUtc = new Date(Date.UTC(
      moscowNow.getUTCFullYear(),
      moscowNow.getUTCMonth(),
      moscowNow.getUTCDate() + addDays,
      hour - 3,
      minute || 0,
      0,
      0
    ));
    if (targetUtc <= now) {
      targetUtc = new Date(Date.UTC(
        moscowNow.getUTCFullYear(),
        moscowNow.getUTCMonth(),
        moscowNow.getUTCDate() + addDays + 7,
        hour - 3,
        minute || 0,
        0,
        0
      ));
    }
    return targetUtc;
  }

  function createKnockoutTicketPreset() {
    if (!knockoutPresetBtn || window.__pokerRaffleCreateInFlight) return;
    var endDate = nextMoscowWeekdayDateTime(0, 16, 0, 7);
    var endInput = raffleAdminCreateFormatMoscowInput(endDate);
    if (raffleEndDateInput && endInput) raffleEndDateInput.value = endInput;
    if (raffleTypeTickets) raffleTypeTickets.checked = true;
    if (raffleTypeOther) raffleTypeOther.checked = false;
    if (raffleTicketGroupCount) raffleTicketGroupCount.value = "1";
    if (raffleTicketWinnersCount) raffleTicketWinnersCount.value = "3";
    if (raffleTicketTournamentSelect) {
      raffleTicketTournamentSelect.value = "custom";
      syncSingleTicketCustomInputs();
      if (raffleTicketCustomName) raffleTicketCustomName.value = "Мистери с гарантией 300 000р";
      if (raffleTicketCustomPrice) raffleTicketCustomPrice.value = "2000";
    }
    updateRaffleCreateTotal();

    window.__pokerRaffleCreateInFlight = true;
    knockoutPresetBtn.disabled = true;
    var prevText = knockoutPresetBtn.textContent;
    knockoutPresetBtn.textContent = "Создаём...";
    var idemKey =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now()) + "_" + Math.random().toString(36).slice(2, 11);
    function resetPresetBtn() {
      window.__pokerRaffleCreateInFlight = false;
      knockoutPresetBtn.disabled = false;
      knockoutPresetBtn.textContent = prevText || "Мистери 2к";
    }
    fetch(base + "/api/raffles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        pokerGuestOrAuthedPostBody({
          action: "create",
          totalWinners: 3,
          groups: [{ count: 3, prize: "Билет на Мистери за 2 000р — гарантия 300 000р" }],
          endDate: endDate.toISOString(),
          title: "3 билета по 2 000р на Мистери с гарантией 300 000р",
          prizeKind: "tournament_ticket",
          drawMode: "weighted_tickets",
          ticketEntryMode: "admin",
          accessLevel: 0,
          promoGuarantee: "300 000р",
          promoTournamentName: "Мистери",
          cardTitle: "Розыгрыш 6 000р",
          cardSubtitle: "3 билета за 2 000р · Мистери с гарантией 300 000р",
          cardTheme: "knockout_ticket",
          createIdempotencyKey: idemKey,
        })
      ),
    })
      .then(raffleDuplicateParseResponse)
      .then(function (data) {
        resetPresetBtn();
        if (data && data.ok && data.raffle) {
          setRaffleAdminActionTab("");
          focusRaffleAfterMutation(data.raffle.id);
          clearRafflesCache();
          if (typeof setRafflesTab === "function") setRafflesTab("active");
          loadRaffles();
          if (!data.idempotentReplay) {
            if (tg && tg.showAlert) tg.showAlert("Мистери-розыгрыш создан");
            else if (typeof alert === "function") alert("Мистери-розыгрыш создан");
          }
        } else {
          var errMsg = (data && data.error) || "Ошибка";
          if (tg && tg.showAlert) tg.showAlert(errMsg);
          else if (typeof alert === "function") alert(errMsg);
        }
      })
      .catch(function () {
        resetPresetBtn();
        if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
        else if (typeof alert === "function") alert(POKER_NET_ERR);
      });
  }

  function getRaffleCreateType() {
    var checked = document.querySelector('input[name="raffleType"]:checked');
    return checked ? checked.value : (raffleTypeTickets && raffleTypeTickets.checked ? "tickets" : "other");
  }

  function normalizeRaffleCreateAccessLevel(value) {
    var n = parseInt(String(value == null ? "" : value), 10);
    if (!isFinite(n) || n < 0) return 0;
    return Math.max(0, Math.min(55, n));
  }

  function setupRaffleAccessLevelSelect() {
    if (!raffleAccessLevel || raffleAccessLevel.dataset.ready === "1") return;
    raffleAccessLevel.dataset.ready = "1";
    var existing = {};
    Array.prototype.forEach.call(raffleAccessLevel.options || [], function (opt) {
      existing[String(opt.value)] = true;
    });
    for (var level = 1; level <= 55; level += 1) {
      if (existing[String(level)]) continue;
      var opt = document.createElement("option");
      opt.value = String(level);
      opt.textContent = "Уровень " + level + "+";
      raffleAccessLevel.appendChild(opt);
    }
    raffleAccessLevel.value = "0";
  }

  function getRaffleCreateAccessLevel() {
    return normalizeRaffleCreateAccessLevel(raffleAccessLevel ? raffleAccessLevel.value : 0);
  }

  function raffleGroupAccessOptionsHtml(includeInherit) {
    var html = includeInherit ? '<option value="">как общий доступ</option>' : "";
    html += '<option value="0">для всех</option>';
    for (var level = 1; level <= 55; level += 1) {
      html += '<option value="' + level + '">Уровень ' + level + '+</option>';
    }
    return html;
  }

  function setupRaffleGroupAccessSelect(select) {
    if (!select || select.dataset.ready === "1") return;
    var current = select.value;
    select.dataset.ready = "1";
    select.innerHTML = raffleGroupAccessOptionsHtml(true);
    select.value = current != null ? String(current) : "";
  }

  function setupRaffleGroupAccessSelects(root) {
    var scope = root || document;
    Array.prototype.forEach.call(scope.querySelectorAll(".raffle-group-access-select"), setupRaffleGroupAccessSelect);
  }

  function getRaffleGroupAccessLevel(select) {
    if (!select) return null;
    var raw = String(select.value == null ? "" : select.value).trim();
    if (raw === "") return null;
    return normalizeRaffleCreateAccessLevel(raw);
  }

  function applyRaffleGroupAccess(group, select) {
    var level = getRaffleGroupAccessLevel(select);
    if (level != null) group.accessLevel = level;
    return group;
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

  function buildRaffleTicketPrizeText(buyin, tournamentName) {
    var prizeText = buyin > 0 ? "Беккинг-билет " + (buyin % 1 === 0 ? buyin : buyin.toFixed(2)) + " ₽" : "Беккинг-билет на турнир";
    return prizeText + (tournamentName ? " — " + tournamentName : "");
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
    var day = moscowNow.getUTCDate();
    var month = moscowNow.getUTCMonth() + 1;
    var dateMarker = (day < 10 ? "0" : "") + day + "." + (month < 10 ? "0" : "") + month;
    var allOptions = select.querySelectorAll("option");
    var todayDateOpt = null;
    for (var ai = 0; ai < allOptions.length; ai++) {
      var dateTxt = allOptions[ai].textContent || "";
      if (dateTxt.indexOf(dateMarker) !== -1) {
        todayDateOpt = allOptions[ai];
        break;
      }
    }
    if (todayDateOpt) {
      todayDateOpt.selected = true;
      if (todayDateOpt.textContent.indexOf("сегодня") === -1) {
        todayDateOpt.textContent = todayDateOpt.textContent + " — сегодня";
      }
      return;
    }
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
    var type = getRaffleCreateType();
    var isTickets = type === "tickets";
    var isPrizes = type === "prizes";
    if (raffleCreatePanelTickets) raffleCreatePanelTickets.classList.toggle("raffle-create-form__panel--hidden", !isTickets);
    if (raffleCreatePanelPrizes) raffleCreatePanelPrizes.classList.toggle("raffle-create-form__panel--hidden", !isPrizes);
    if (raffleCreatePanelOther) raffleCreatePanelOther.classList.toggle("raffle-create-form__panel--hidden", type !== "other");
    if (isTickets) {
      setupTournamentDaySelect();
      buildTicketGroupInputs();
      syncSingleTicketCustomInputs();
      updateRaffleCreateTotal();
    } else if (isPrizes) {
      buildPhysicalPrizeInputs();
    } else {
      buildGroupInputs();
    }
  }

  setupRaffleAccessLevelSelect();
  setupRaffleGroupAccessSelects(document);

  function syncRaffleDailyControls() {
    var enabled = !!(raffleDailyEnabled && raffleDailyEnabled.checked);
    if (raffleDailyStartWrap) raffleDailyStartWrap.classList.toggle("raffle-create-form__daily-time--hidden", !enabled);
    if (raffleDailyStartTime) {
      raffleDailyStartTime.disabled = !enabled;
      if (enabled) raffleDailyStartTime.value = "20:16";
    }
    if (enabled && raffleAccessLevel && getRaffleCreateAccessLevel() < 1) {
      raffleAccessLevel.value = "1";
    }
  }

  function normalizeRaffleDailyStartTime(value) {
    var raw = String(value || "").trim();
    var m = raw.match(/^(\d{1,2}):(\d{2})$/);
    if (!m) return "";
    var hh = parseInt(m[1], 10);
    var mm = parseInt(m[2], 10);
    if (isNaN(hh) || isNaN(mm) || hh < 0 || hh > 23 || mm < 0 || mm > 59) return "";
    return (hh < 10 ? "0" : "") + hh + ":" + (mm < 10 ? "0" : "") + mm;
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
      div.innerHTML = "<label class=\"randomizer-label\"><span class=\"randomizer-label__text\">Группа " + (i + 1) + " (<span class=\"raffle-ticket-group-winners-num\" data-group-index=\"" + i + "\">1</span> побед.) — турнир:</span>" + selectHtml + "</label><label class=\"randomizer-label raffle-ticket-group-custom-name-wrap\" style=\"display:none;\"><span class=\"randomizer-label__text\">название турнира:</span><input type=\"text\" class=\"raffle-ticket-group-custom-name randomizer-input\" maxlength=\"120\" data-group-index=\"" + i + "\" placeholder=\"Например, Sunday Million\" /></label><label class=\"randomizer-label raffle-ticket-group-custom-price-wrap\" style=\"display:none;\"><span class=\"randomizer-label__text\">цена билета:</span><input type=\"number\" class=\"raffle-ticket-group-custom-price randomizer-input\" min=\"0\" step=\"0.01\" inputmode=\"decimal\" data-group-index=\"" + i + "\" placeholder=\"Например, 550\" /></label><label class=\"randomizer-label\"><span class=\"randomizer-label__text\">мест:</span><input type=\"number\" class=\"raffle-ticket-group-count randomizer-input\" min=\"0\" max=\"100\" value=\"1\" data-group-index=\"" + i + "\" /></label><label class=\"randomizer-label\"><span class=\"randomizer-label__text\">доступ:</span><select class=\"raffle-ticket-group-access randomizer-input raffle-group-access-select\" data-group-index=\"" + i + "\">" + raffleGroupAccessOptionsHtml(true) + "</select></label>";
      raffleTicketGroups.appendChild(div);
    }
    setupRaffleGroupAccessSelects(raffleTicketGroups);
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
        "<label class=\"randomizer-label\"><span class=\"randomizer-label__text\">Приз:</span><input type=\"text\" class=\"raffle-group-prize randomizer-input\" placeholder=\"Например: Беккинг-байин 500 ₽ на кеш\" data-group-index=\"" + i + "\" /></label>" +
        "<label class=\"randomizer-label\"><span class=\"randomizer-label__text\">Доступ:</span><select class=\"raffle-group-access randomizer-input raffle-group-access-select\" data-group-index=\"" + i + "\">" + raffleGroupAccessOptionsHtml(true) + "</select></label>";
      raffleGroupsEl.appendChild(div);
    }
    setupRaffleGroupAccessSelects(raffleGroupsEl);
  }

  function buildPhysicalPrizeInputs() {
    if (!rafflePhysicalGroupCount || !rafflePhysicalGroupsEl) return;
    var n = Math.max(1, Math.min(10, parseInt(rafflePhysicalGroupCount.value, 10) || 2));
    var defaults = ["2 большие пиццы", "Поход в баню"];
    rafflePhysicalGroupsEl.innerHTML = "";
    for (var i = 0; i < n; i++) {
      var div = document.createElement("div");
      div.className = "raffle-group-row raffle-physical-group-row";
      var selected = defaults[i] || defaults[i % defaults.length];
      div.innerHTML =
        "<label class=\"randomizer-label\"><span class=\"randomizer-label__text\">Группа " + (i + 1) + " — приз:</span>" +
        "<select class=\"raffle-physical-prize randomizer-input\" data-group-index=\"" + i + "\">" +
        "<option value=\"2 большие пиццы\"" + (selected === "2 большие пиццы" ? " selected" : "") + ">2 большие пиццы</option>" +
        "<option value=\"Поход в баню\"" + (selected === "Поход в баню" ? " selected" : "") + ">Поход в баню</option>" +
        "</select></label>" +
        "<label class=\"randomizer-label\"><span class=\"randomizer-label__text\">мест:</span>" +
        "<input type=\"number\" class=\"raffle-physical-count randomizer-input\" min=\"0\" max=\"100\" value=\"1\" data-group-index=\"" + i + "\" />" +
        "</label>" +
        "<label class=\"randomizer-label\"><span class=\"randomizer-label__text\">Доступ:</span><select class=\"raffle-physical-access randomizer-input raffle-group-access-select\" data-group-index=\"" + i + "\">" + raffleGroupAccessOptionsHtml(true) + "</select></label>";
      rafflePhysicalGroupsEl.appendChild(div);
    }
    setupRaffleGroupAccessSelects(rafflePhysicalGroupsEl);
  }

  function raffleCreateEscapeHtml(value) {
    if (typeof pokerRafflesEscapeHtml === "function") return pokerRafflesEscapeHtml(value);
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function raffleDuplicateStatusText(status) {
    if (status === "active") return "Активный";
    if (status === "drawn") return "Завершён";
    if (status === "cancelled") return "Отменён";
    return status || "Розыгрыш";
  }

  function raffleDuplicateDateText(raw) {
    if (!raw) return "—";
    var d = new Date(raw);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function raffleDuplicateGroupsText(raffle) {
    var groups = raffle && Array.isArray(raffle.groups) ? raffle.groups : [];
    if (!groups.length) return "Группы: —";
    return groups.map(function (g, i) {
      var access = g && g.accessLevel != null && String(g.accessLevel) !== ""
        ? " · доступ: уровень " + normalizeRaffleCreateAccessLevel(g.accessLevel) + "+"
        : "";
      return "Группа " + (i + 1) + ": " + (parseInt(g.count, 10) || 0) + " мест — " + (g.prize || "Приз") + access;
    }).join("\n");
  }

  function setRaffleAdminActionTab(mode) {
    raffleAdminActionMode = mode === "duplicate" || mode === "create" ? mode : "";
    var isCreate = raffleAdminActionMode === "create";
    var isDuplicate = raffleAdminActionMode === "duplicate";
    if (createForm) createForm.classList.toggle("raffle-create-form--hidden", !isCreate);
    if (duplicateOptionsEl) duplicateOptionsEl.classList.toggle("raffle-duplicate-options--hidden", !isDuplicate);
    if (createToggle) {
      createToggle.classList.toggle("raffles-create-toggle--active", isCreate);
      createToggle.classList.toggle("raffles-create-toggle--ghost", isDuplicate);
      createToggle.setAttribute("aria-selected", isCreate ? "true" : "false");
      createToggle.setAttribute("tabindex", isCreate || !raffleAdminActionMode ? "0" : "-1");
    }
    if (duplicateLastBtn) {
      duplicateLastBtn.classList.toggle("raffles-create-toggle--active", isDuplicate);
      duplicateLastBtn.classList.toggle("raffles-create-toggle--ghost", !isDuplicate);
      duplicateLastBtn.setAttribute("aria-selected", isDuplicate ? "true" : "false");
      duplicateLastBtn.setAttribute("tabindex", isDuplicate ? "0" : "-1");
    }
    if (isCreate) switchRaffleCreatePanel();
  }

  if (typeof window !== "undefined") {
    window.pokerRafflesOpenCreateActionTab = function () {
      setRaffleAdminActionTab("create");
    };
  }

  function setRaffleDuplicateOptionsLoading() {
    if (!duplicateOptionsEl) return;
    duplicateOptionsEl.innerHTML =
      '<p class="raffle-duplicate-options__title">Выберите розыгрыш для повтора</p>' +
      '<p class="raffle-duplicate-options__empty">Загружаем последние розыгрыши…</p>';
    duplicateOptionsEl.classList.remove("raffle-duplicate-options--hidden");
  }

  function renderRaffleDuplicateOptions(raffles) {
    if (!duplicateOptionsEl) return;
    duplicateOptionsEl.dataset.loaded = "1";
    var list = Array.isArray(raffles) ? raffles : [];
    if (!list.length) {
      duplicateOptionsEl.innerHTML =
        '<p class="raffle-duplicate-options__title">Выберите розыгрыш для повтора</p>' +
        '<p class="raffle-duplicate-options__empty">Нет последних розыгрышей для повтора.</p>';
      duplicateOptionsEl.classList.remove("raffle-duplicate-options--hidden");
      return;
    }
    var html = '<p class="raffle-duplicate-options__title">Выберите один из трёх последних розыгрышей</p>';
    html += list.map(function (raffle, i) {
      var title = raffle.title || (raffle.groups && raffle.groups[0] && raffle.groups[0].prize) || "Розыгрыш";
      var daily = raffle.daily && raffle.recurrence
        ? "Ежедневный: старт " + (raffle.recurrence.startTime || "—") + " МСК"
        : "Ежедневный: нет";
      var meta =
        "Создан: " + raffleDuplicateDateText(raffle.createdAt) +
        " · Итоги: " + raffleDuplicateDateText(raffle.endDate) +
        " · Победителей: " + (parseInt(raffle.totalWinners, 10) || 0) +
        " · Участников: " + (parseInt(raffle.participantsCount, 10) || 0);
      return (
        '<article class="raffle-duplicate-card">' +
          '<div class="raffle-duplicate-card__head">' +
            '<span>' + (i + 1) + ". " + raffleCreateEscapeHtml(title) + '</span>' +
            '<span class="raffle-duplicate-card__status">' + raffleCreateEscapeHtml(raffleDuplicateStatusText(raffle.status)) + '</span>' +
          "</div>" +
          '<p class="raffle-duplicate-card__meta">' + raffleCreateEscapeHtml(meta) + '</p>' +
          '<p class="raffle-duplicate-card__daily">' + raffleCreateEscapeHtml(daily) + '</p>' +
          '<p class="raffle-duplicate-card__groups">' + raffleCreateEscapeHtml(raffleDuplicateGroupsText(raffle)) + '</p>' +
          '<button type="button" class="raffle-duplicate-card__btn" data-raffle-duplicate-source="' + raffleCreateEscapeHtml(raffle.id || "") + '">Повторить этот</button>' +
        "</article>"
      );
    }).join("");
    duplicateOptionsEl.innerHTML = html;
    duplicateOptionsEl.classList.remove("raffle-duplicate-options--hidden");
  }

  function raffleDuplicateParseResponse(r) {
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
  }

  function duplicateRaffleById(sourceRaffleId, sourceBtn) {
    if (!sourceRaffleId || window.__pokerRaffleCreateInFlight) return;
    window.__pokerRaffleCreateInFlight = true;
    var buttons = duplicateOptionsEl ? duplicateOptionsEl.querySelectorAll(".raffle-duplicate-card__btn") : [];
    Array.prototype.forEach.call(buttons, function (btn) { btn.disabled = true; });
    var prevText = sourceBtn ? sourceBtn.textContent : "";
    if (sourceBtn) sourceBtn.textContent = "Повторяем…";
    var idemKey =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now()) + "_" + Math.random().toString(36).slice(2, 11);
    function resetDuplicateUi() {
      window.__pokerRaffleCreateInFlight = false;
      Array.prototype.forEach.call(buttons, function (btn) { btn.disabled = false; });
      if (sourceBtn) sourceBtn.textContent = prevText || "Повторить этот";
    }
    fetch(base + "/api/raffles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        pokerGuestOrAuthedPostBody({
          action: "duplicateLast",
          sourceRaffleId: sourceRaffleId,
          createIdempotencyKey: idemKey,
        })
      ),
    })
      .then(raffleDuplicateParseResponse)
      .then(function (data) {
        resetDuplicateUi();
        if (data && data.ok && data.raffle) {
          if (duplicateOptionsEl) duplicateOptionsEl.dataset.loaded = "";
          setRaffleAdminActionTab("");
          focusRaffleAfterMutation(data.raffle.id);
          clearRafflesCache();
          if (typeof setRafflesTab === "function") setRafflesTab("active");
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
        resetDuplicateUi();
        if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
        else if (typeof alert === "function") alert(POKER_NET_ERR);
      });
  }

  if (createToggle && createForm) {
    createToggle.addEventListener("click", function () {
      setRaffleAdminActionTab("create");
    });
  }
  if (duplicateLastBtn) {
    duplicateLastBtn.addEventListener("click", function () {
      setRaffleAdminActionTab("duplicate");
      if (duplicateOptionsEl && duplicateOptionsEl.dataset.loaded === "1") return;
      if (window.__pokerRaffleCreateInFlight || window.__pokerRaffleDuplicateOptionsInFlight) return;
      window.__pokerRaffleDuplicateOptionsInFlight = true;
      duplicateLastBtn.disabled = true;
      var prevDuplicateText = duplicateLastBtn.textContent;
      duplicateLastBtn.textContent = "Загружаем…";
      setRaffleDuplicateOptionsLoading();
      function raffleDuplicateOptionsResetUi() {
        window.__pokerRaffleDuplicateOptionsInFlight = false;
        duplicateLastBtn.disabled = false;
        duplicateLastBtn.textContent = prevDuplicateText;
      }
      fetch(base + "/api/raffles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          pokerGuestOrAuthedPostBody({
            action: "duplicateOptions",
          })
        ),
      })
        .then(raffleDuplicateParseResponse)
        .then(function (data) {
          raffleDuplicateOptionsResetUi();
          if (data && data.ok) {
            renderRaffleDuplicateOptions(data.raffles || []);
            if (raffleAdminActionMode !== "duplicate" && duplicateOptionsEl) {
              duplicateOptionsEl.classList.add("raffle-duplicate-options--hidden");
            }
          } else {
            var errMsg = (data && data.error) || "Ошибка";
            if (tg && tg.showAlert) tg.showAlert(errMsg);
            else if (typeof alert === "function") alert(errMsg);
          }
        })
        .catch(function () {
          raffleDuplicateOptionsResetUi();
          if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
          else if (typeof alert === "function") alert(POKER_NET_ERR);
        });
    });
  }
  if (knockoutPresetBtn) knockoutPresetBtn.addEventListener("click", createKnockoutTicketPreset);
  if (duplicateOptionsEl) {
    duplicateOptionsEl.addEventListener("click", function (e) {
      var btn = e.target && e.target.closest ? e.target.closest("[data-raffle-duplicate-source]") : null;
      if (!btn) return;
      duplicateRaffleById(btn.getAttribute("data-raffle-duplicate-source") || "", btn);
    });
  }
  if (raffleTypeTickets) raffleTypeTickets.addEventListener("change", switchRaffleCreatePanel);
  if (raffleTypePrizes) raffleTypePrizes.addEventListener("change", switchRaffleCreatePanel);
  if (raffleTypeOther) raffleTypeOther.addEventListener("change", switchRaffleCreatePanel);
  if (raffleDailyEnabled) raffleDailyEnabled.addEventListener("change", syncRaffleDailyControls);
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
  if (rafflePhysicalGroupCount && rafflePhysicalGroupsEl) {
    rafflePhysicalGroupCount.addEventListener("change", buildPhysicalPrizeInputs);
    rafflePhysicalGroupCount.addEventListener("input", buildPhysicalPrizeInputs);
  }
  if (createBtn) {
    createBtn.addEventListener("click", function () {
      if (window.__pokerRaffleCreateInFlight) return;
      var createType = getRaffleCreateType();
      var isTickets = createType === "tickets";
      var isPrizes = createType === "prizes";
      var endDateEl = isTickets ? raffleEndDateInput : (isPrizes ? raffleEndDatePrizes : raffleEndDateOther);
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
      if (endDate <= new Date()) {
        if (tg && tg.showAlert) tg.showAlert("Время итогов должно быть в будущем");
        else if (typeof alert === "function") alert("Время итогов должно быть в будущем");
        return;
      }
      var totalWinners;
      var groups;
      var title = "";
      var prizeKind = getRafflePrizeKind();
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
          var singlePrize = buildRaffleTicketPrizeText(singleBuyin, singleTournamentName);
          if (c > 0) groups.push(applyRaffleGroupAccess({ count: c, prize: singlePrize }, raffleTicketSingleAccess));
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
            var groupPrize = buildRaffleTicketPrizeText(groupBuyin, groupTournamentName);
            var groupAccessSelect = rows[i].querySelector(".raffle-ticket-group-access");
            totalWinners += cnt;
            if (cnt > 0) groups.push(applyRaffleGroupAccess({ count: cnt, prize: groupPrize }, groupAccessSelect));
          }
        }
        if (groups.length === 0) {
          if (tg && tg.showAlert) tg.showAlert("Укажите количество победителей");
          return;
        }
        title = "Розыгрыш беккинг-билетов на турниры";
      } else if (isPrizes) {
        var physicalRows = rafflePhysicalGroupsEl ? rafflePhysicalGroupsEl.querySelectorAll(".raffle-physical-group-row") : [];
        groups = [];
        totalWinners = 0;
        for (var pj = 0; pj < physicalRows.length; pj++) {
          var physicalCountInput = physicalRows[pj].querySelector(".raffle-physical-count");
          var physicalPrizeSelect = physicalRows[pj].querySelector(".raffle-physical-prize");
          var physicalCount = physicalCountInput ? Math.max(0, parseInt(physicalCountInput.value, 10) || 0) : 0;
          var physicalPrize = physicalPrizeSelect ? String(physicalPrizeSelect.value || "").trim() : "";
          if (!physicalPrize) physicalPrize = "2 большие пиццы";
          var physicalAccessSelect = physicalRows[pj].querySelector(".raffle-physical-access");
          totalWinners += physicalCount;
          if (physicalCount > 0) groups.push(applyRaffleGroupAccess({ count: physicalCount, prize: physicalPrize }, physicalAccessSelect));
        }
        if (groups.length === 0) {
          if (tg && tg.showAlert) tg.showAlert("Укажите количество победителей");
          return;
        }
        title = "Розыгрыш пицц и бань";
      } else {
        var groupInputs = raffleGroupsEl ? raffleGroupsEl.querySelectorAll(".raffle-group-count") : [];
        var prizeInputs = raffleGroupsEl ? raffleGroupsEl.querySelectorAll(".raffle-group-prize") : [];
        groups = [];
        totalWinners = 0;
        for (var j = 0; j < groupInputs.length; j++) {
          var count = Math.max(0, parseInt(groupInputs[j].value, 10) || 0);
          var prize = prizeInputs[j] ? prizeInputs[j].value.trim().slice(0, 200) : "";
          if (!prize) prize = "Беккинг-байин на кеш";
          var cashGroupRow = groupInputs[j] && groupInputs[j].closest ? groupInputs[j].closest(".raffle-group-row") : null;
          var cashAccessSelect = cashGroupRow ? cashGroupRow.querySelector(".raffle-group-access") : null;
          totalWinners += count;
          groups.push(applyRaffleGroupAccess({ count: count, prize: prize }, cashAccessSelect));
        }
        if (groups.length === 0) groups = [{ count: 1, prize: "Беккинг-байин на кеш" }];
        totalWinners = Math.max(1, totalWinners);
        title = document.getElementById("raffleTitle") ? document.getElementById("raffleTitle").value.trim().slice(0, 200) : "";
        if (!title) title = "Розыгрыш беккинг-байинов на кеш";
      }
      var dailyEnabled = !!(raffleDailyEnabled && raffleDailyEnabled.checked);
      if (dailyEnabled && prizeKind !== "cash") {
        if (tg && tg.showAlert) tg.showAlert("Ежедневный розыгрыш сейчас доступен только на кеш.");
        return;
      }
      var dailyStartTime = dailyEnabled ? "20:16" : "";
      if (dailyEnabled && !dailyStartTime) {
        if (tg && tg.showAlert) tg.showAlert("Укажите время ежедневного старта");
        return;
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
            prizeKind: prizeKind,
            accessLevel: dailyEnabled ? Math.max(3, getRaffleCreateAccessLevel()) : getRaffleCreateAccessLevel(),
            daily: dailyEnabled,
            dailyStartTime: dailyStartTime || undefined,
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
            if (typeof setRafflesTab === "function") setRafflesTab("active");
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
  syncRaffleDailyControls();

  }
}
