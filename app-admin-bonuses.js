(function () {
  var ADMIN_BONUSES_INITIAL_LIMIT = 15;
  var ADMIN_BONUSES_ALL_LIMIT = 500;
  var adminBonusesState = {
    page: 1,
    users: [],
    total: 0,
    showingAll: false,
    selectedUserId: "",
    operation: "",
    loading: false,
    totalDebited: null,
    issuesLoaded: false,
    issueOperations: [],
    tournamentOptions: [],
  };

  function $(id) {
    return document.getElementById(id);
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function apiBase() {
    return typeof getApiBase === "function" ? getApiBase() : "";
  }

  function authQuery() {
    return typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
  }

  function appendQuery(q, name, value) {
    q = String(q || "?");
    var sep = q.indexOf("?") === -1 ? "?" : (q === "?" || /[?&]$/.test(q) ? "" : "&");
    return q + sep + encodeURIComponent(name) + "=" + encodeURIComponent(value);
  }

  function authUrl(path, query) {
    var q = authQuery();
    if (q && q.charAt(0) !== "?") q = "?" + q.replace(/^&+/, "");
    var url = apiBase() + "/api/admin/" + String(path || "").split("/").map(encodeURIComponent).join("/") + (q || "");
    Object.keys(query || {}).forEach(function (name) {
      var value = String(query[name] == null ? "" : query[name]).trim();
      if (!value) return;
      url = appendQuery(url, name, value);
    });
    return url;
  }

  function authBody(extra) {
    return typeof pokerGuestOrAuthedPostBody === "function" ? pokerGuestOrAuthedPostBody(extra || {}) : extra || {};
  }

  function hasCredential() {
    return typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
  }

  function setStatus(text, isError) {
    var el = $("adminBonusesStatus");
    if (!el) return;
    el.textContent = text || "";
    el.classList.toggle("admin-bonuses__notice--error", !!isError);
  }

  function fmtDate(iso) {
    if (!iso) return "—";
    var d = new Date(iso);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
  }

  function fmtPoints(value) {
    var amount = Math.max(0, Math.floor(Number(value) || 0));
    return amount.toLocaleString("ru-RU");
  }

  function tournamentBuyinAmount(value) {
    var amount = Number(String(value || "").replace(/[^\d]/g, ""));
    return Number.isFinite(amount) ? Math.max(0, Math.floor(amount)) : 0;
  }

  function businessDateKey(value) {
    var ms = value instanceof Date ? value.getTime() : Date.parse(String(value || ""));
    return Number.isFinite(ms) ? new Date(ms - 3 * 60 * 60 * 1000).toISOString().slice(0, 10) : "";
  }

  function formatBusinessDate(key) {
    var parts = String(key || "").split("-");
    if (parts.length !== 3) return key || "Без даты";
    var date = new Date(Date.UTC(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])));
    var label = date.toLocaleDateString("ru-RU", { timeZone: "UTC", weekday: "long", day: "2-digit", month: "long" });
    return label.charAt(0).toUpperCase() + label.slice(1);
  }

  function tournamentTimeMinutes(value) {
    var match = String(value || "").match(/(?:^|\D)([01]?\d|2[0-3]):([0-5]\d)(?:\D|$)/);
    if (!match) return Number.POSITIVE_INFINITY;
    return Number(match[1]) * 60 + Number(match[2]);
  }

  function compareIssueTournaments(a, b) {
    var timeDifference = tournamentTimeMinutes(a && a.tournamentTime) - tournamentTimeMinutes(b && b.tournamentTime);
    if (timeDifference) return timeDifference;
    var titleDifference = String(a && a.tournamentTitle || "").localeCompare(String(b && b.tournamentTitle || ""), "ru");
    if (titleDifference) return titleDifference;
    return Date.parse(String(a && a.createdAt || "")) - Date.parse(String(b && b.createdAt || ""));
  }

  function currentBusinessWeekStartKey() {
    var key = businessDateKey(new Date());
    var parts = key.split("-");
    if (parts.length !== 3) return key;
    var date = new Date(Date.UTC(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])));
    date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 6) % 7));
    return date.toISOString().slice(0, 10);
  }

  function renderIssuesWeekTotal(operations) {
    var totalEl = $("adminBonusesIssuesWeekTotal");
    if (!totalEl) return;
    var weekStart = currentBusinessWeekStartKey();
    var currentDay = businessDateKey(new Date());
    var total = (Array.isArray(operations) ? operations : []).reduce(function (sum, op) {
      var key = String(op && op.businessDate || businessDateKey(op && op.createdAt) || "");
      if (!key || key < weekStart || key > currentDay) return sum;
      return sum + Math.max(0, Number(op && op.amount) || 0);
    }, 0);
    totalEl.textContent = fmtPoints(total);
  }

  function scheduleTournamentId(item, index) {
    return [
      item && item.date ? "date-" + item.date : item && item.repeat === "weekly" ? "weekly-" + item.dow : "daily",
      item && item.hour != null ? item.hour : 0,
      item && item.minute != null ? item.minute : 0,
      item && item.name ? item.name : index,
    ].join("|");
  }

  function currentScheduleTournamentOptions() {
    var source = typeof POKER_FULL_TOURNAMENT_SCHEDULE !== "undefined" && Array.isArray(POKER_FULL_TOURNAMENT_SCHEDULE)
      ? POKER_FULL_TOURNAMENT_SCHEDULE.slice()
      : [];
    var dateKey = businessDateKey(new Date());
    if (dateKey === "2026-07-19") {
      source.push({
        date: "2026-07-19",
        category: "Сателлит",
        name: "Сателлит",
        buyin: "400₽",
        hour: 15,
        minute: 0,
      });
    }
    var date = new Date(dateKey + "T00:00:00.000Z");
    var dow = date.getUTCDay();
    return source.filter(function (item) {
      if (!item) return false;
      if (item.date) return item.date === dateKey;
      if (item.repeat === "daily") return true;
      return item.repeat === "weekly" && Number(item.dow) === dow;
    }).map(function (item, index) {
      var hour = String(Math.max(0, Number(item.hour) || 0)).padStart(2, "0");
      var minute = String(Math.max(0, Number(item.minute) || 0)).padStart(2, "0");
      var time = hour + ":" + minute + " МСК";
      return {
        id: scheduleTournamentId(item, index),
        title: String(item.name || item.category || "Турнир"),
        time: time,
        buyin: String(item.buyin || ""),
        label: time + " · " + String(item.name || item.category || "Турнир") + (item.buyin ? " · " + item.buyin : ""),
      };
    }).sort(function (a, b) { return a.time.localeCompare(b.time) || a.title.localeCompare(b.title); });
  }

  function populateTournamentOptions() {
    var select = $("adminBonusesOperationTournament");
    if (!select) return;
    adminBonusesState.tournamentOptions = currentScheduleTournamentOptions();
    select.innerHTML = '<option value="">Выберите турнир</option>' + adminBonusesState.tournamentOptions.map(function (item) {
      return '<option value="' + esc(item.id) + '">' + esc(item.label) + '</option>';
    }).join("");
    select.value = "";
  }

  function syncDebitAmountWithTournament() {
    if (adminBonusesState.operation !== "debit") return;
    var select = $("adminBonusesOperationTournament");
    var amount = $("adminBonusesOperationAmount");
    var message = $("adminBonusesOperationMessage");
    var tournamentId = String(select && select.value || "");
    var tournament = adminBonusesState.tournamentOptions.find(function (item) {
      return item.id === tournamentId;
    }) || null;
    var buyin = tournament ? tournamentBuyinAmount(tournament.buyin) : 0;
    if (amount) amount.value = tournament ? String(buyin) : "";
    if (message) {
      message.textContent = tournament && buyin <= 0
        ? "Для бесплатного турнира списание не требуется."
        : "";
    }
  }

  function rowTitle(user) {
    return user.displayName || user.nickname || (user.username ? "@" + user.username : user.userId);
  }

  function currentLimit() {
    return adminBonusesState.showingAll ? ADMIN_BONUSES_ALL_LIMIT : ADMIN_BONUSES_INITIAL_LIMIT;
  }

  function listUrl() {
    return authUrl("bonus-balances", {
      search: $("adminBonusesSearch") && $("adminBonusesSearch").value,
      minBalance: $("adminBonusesMinBalance") && $("adminBonusesMinBalance").value,
      maxBalance: $("adminBonusesMaxBalance") && $("adminBonusesMaxBalance").value,
      sortBy: $("adminBonusesSort") && $("adminBonusesSort").value,
      page: adminBonusesState.page,
      limit: currentLimit(),
    });
  }

  function readJson(r) {
    return r.text().then(function (text) {
      if (!text) return {};
      try {
        return JSON.parse(text);
      } catch (e) {
        var err = new Error("Сервер вернул неожиданный ответ. Обновите приложение и попробуйте ещё раз.");
        err.status = r && r.status;
        err.raw = String(text || "").slice(0, 120);
        throw err;
      }
    });
  }

  function renderContact(user) {
    var lines = [];
    if (user.email) {
      lines.push('<span class="admin-bonuses__contact-line admin-bonuses__contact-email">' + esc(user.email) + '</span>');
    }
    if (user.phone) {
      lines.push('<span class="admin-bonuses__contact-line">' + esc(user.phone) + '</span>');
    }
    return lines.length ? lines.join("") : "—";
  }

  function syncShowAllButton(shown, total) {
    var btn = $("adminBonusesShowAllBtn");
    if (!btn) return;
    var canShowAll = !adminBonusesState.showingAll && total > shown;
    if (btn.parentElement) btn.parentElement.hidden = !canShowAll;
    btn.hidden = !canShowAll;
    btn.disabled = adminBonusesState.loading;
    btn.textContent = total > 0 ? "Показать всех (" + total + ")" : "Показать всех";
  }

  function syncTotalDebited(total) {
    var wrap = $("adminBonusesTotalDebited");
    var value = $("adminBonusesTotalDebitedValue");
    if (!wrap || !value) return;
    if (total == null || !Number.isFinite(Number(total))) {
      wrap.hidden = true;
      return;
    }
    wrap.hidden = false;
    value.textContent = fmtPoints(total);
  }

  function renderTable(users) {
    var body = $("adminBonusesTableBody");
    if (!body) return;
    if (!users || !users.length) {
      body.innerHTML = '<tr><td colspan="5" class="admin-bonuses__empty">Пользователей не найдено.</td></tr>';
      return;
    }
    body.innerHTML = users.map(function (user) {
      var name = rowTitle(user);
      var sub = user.username ? "@" + user.username : "";
      return '<tr data-user-id="' + esc(user.userId) + '">' +
        '<td class="admin-bonuses__user-cell"><strong>' + esc(name) + '</strong>' + (sub ? '<span>' + esc(sub) + '</span>' : "") +
        '</td>' +
        '<td class="admin-bonuses__actions-cell">' +
          '<div class="admin-bonuses__actions-panel">' +
            '<button type="button" data-admin-bonus-history="' + esc(user.userId) + '" aria-expanded="false">История</button>' +
            '<button type="button" data-admin-bonus-credit="' + esc(user.userId) + '">Начислить</button>' +
            '<button type="button" data-admin-bonus-debit="' + esc(user.userId) + '">Списать</button>' +
          '</div>' +
        '</td>' +
        '<td><strong>' + esc(user.bonusBalance || 0) + '</strong></td>' +
        '<td>' + esc(user.dailyPokerGamesPlayed || 0) + '</td>' +
        '<td>' + esc(user.ticketsWon || 0) + '</td>' +
      '</tr>';
    }).join("");
  }

  function loadList() {
    var base = apiBase();
    if (!base || !hasCredential()) {
      setStatus("Нет админской сессии.", true);
      syncShowAllButton(0, 0);
      return;
    }
    adminBonusesState.loading = true;
    syncShowAllButton(adminBonusesState.users.length, adminBonusesState.total);
    setStatus("Загрузка…", false);
    fetch(listUrl(), { cache: "no-store" })
      .then(readJson)
      .then(function (data) {
        adminBonusesState.loading = false;
        if (!data || !data.ok) throw new Error(data && data.error ? data.error : "Ошибка загрузки");
        adminBonusesState.users = data.users || [];
        adminBonusesState.total = Number(data.total || adminBonusesState.users.length || 0);
        adminBonusesState.totalDebited = data.bonusTotals ? data.bonusTotals.totalDebited : 0;
        renderTable(adminBonusesState.users);
        syncShowAllButton(adminBonusesState.users.length, adminBonusesState.total);
        syncTotalDebited(adminBonusesState.totalDebited);
        setStatus("Показано: " + adminBonusesState.users.length + " из " + adminBonusesState.total, false);
      })
      .catch(function (err) {
        adminBonusesState.loading = false;
        syncShowAllButton(0, 0);
        syncTotalDebited(adminBonusesState.totalDebited);
        setStatus(err && err.message ? err.message : POKER_NET_ERR, true);
      });
  }

  function loadHistory(userId) {
    var base = apiBase();
    var userRow = document.querySelector('#adminBonusesTableBody tr[data-user-id="' + CSS.escape(userId) + '"]');
    if (!base || !userRow) return;
    var previous = document.querySelector(".admin-bonuses__history-inline-row");
    var historyButtons = document.querySelectorAll("[data-admin-bonus-history]");
    if (previous && previous.dataset.userId === userId) {
      previous.remove();
      adminBonusesState.selectedUserId = "";
      historyButtons.forEach(function (button) {
        button.setAttribute("aria-expanded", "false");
      });
      return;
    }
    if (previous) previous.remove();
    historyButtons.forEach(function (button) {
      button.setAttribute("aria-expanded", button.getAttribute("data-admin-bonus-history") === userId ? "true" : "false");
    });
    adminBonusesState.selectedUserId = userId;
    var found = adminBonusesState.users.find(function (user) { return user.userId === userId; });
    var detailRow = document.createElement("tr");
    detailRow.className = "admin-bonuses__history-inline-row";
    detailRow.dataset.userId = userId;
    var detailCell = document.createElement("td");
    detailCell.colSpan = 5;
    var section = document.createElement("section");
    section.className = "admin-bonuses__history";
    section.setAttribute("aria-live", "polite");
    section.innerHTML = "<h3></h3><div class=\"admin-bonuses__history-body\"></div>";
    var heading = section.querySelector("h3");
    var body = section.querySelector(".admin-bonuses__history-body");
    heading.textContent = "История: " + (found ? rowTitle(found) : userId);
    body.innerHTML = "Загрузка истории…";
    detailCell.appendChild(section);
    detailRow.appendChild(detailCell);
    userRow.insertAdjacentElement("afterend", detailRow);
    var historyUserIds = found && Array.isArray(found.historyUserIds) ? found.historyUserIds : [userId];
    fetch(authUrl("users/" + userId + "/bonus-ledger", {
      relatedUserIds: historyUserIds.join(","),
    }), { cache: "no-store" })
      .then(readJson)
      .then(function (data) {
        if (!data || !data.ok) throw new Error(data && data.error ? data.error : "История не загрузилась");
        var ops = data.operations || [];
        var showsSeveralAccounts = Array.isArray(data.userIds) && data.userIds.length > 1;
        if (!ops.length) {
          body.innerHTML = "Операций пока нет.";
          return;
        }
        body.innerHTML = ops.map(function (op) {
          var sign = op.direction === "debit" ? "-" : "+";
          return '<article class="admin-bonuses__history-item">' +
            '<div><strong>' + esc(sign + op.amount) + '</strong><span>' + esc(op.operationType) + '</span></div>' +
            '<div>Баланс: ' + esc(op.balanceBefore) + ' → ' + esc(op.balanceAfter) + '</div>' +
            '<div>' + esc(fmtDate(op.createdAt)) + (showsSeveralAccounts ? ' · счёт: ' + esc(op.userId) : '') + (op.adminId ? ' · admin: ' + esc(op.adminId) : "") + '</div>' +
            (op.tournamentTitle ? '<p><strong>Турнир:</strong> ' + esc([op.tournamentTime, op.tournamentTitle, op.tournamentBuyin].filter(Boolean).join(" · ")) + '</p>' : "") +
            (op.comment ? '<p>' + esc(op.comment) + '</p>' : "") +
          '</article>';
        }).join("");
      })
      .catch(function (err) {
        body.innerHTML = esc(err && err.message ? err.message : POKER_NET_ERR);
      });
  }

  function renderIssues(operations) {
    var body = $("adminBonusesIssuesBody");
    if (!body) return;
    renderIssuesWeekTotal(operations);
    if (!operations || !operations.length) {
      body.innerHTML = '<div class="admin-bonuses__notice">Списаний пока нет.</div>';
      return;
    }
    var groups = {};
    operations.forEach(function (op) {
      var key = op.businessDate || businessDateKey(op.createdAt) || "unknown";
      if (!groups[key]) groups[key] = [];
      groups[key].push(op);
    });
    body.innerHTML = Object.keys(groups).sort().reverse().map(function (key) {
      var rows = groups[key].slice().sort(compareIssueTournaments);
      var total = rows.reduce(function (sum, row) { return sum + Math.max(0, Number(row.amount) || 0); }, 0);
      return '<section class="admin-bonuses__issue-day">' +
        '<h4 class="admin-bonuses__issue-day-title"><span>' + esc(formatBusinessDate(key)) + '</span><strong>Итого ' + esc(fmtPoints(total)) + '</strong></h4>' +
        rows.map(function (op) {
          var poker21Label = op.poker21Id ? "Poker21 " + op.poker21Id : "Poker21 не привязан";
          var poker21Nickname = op.poker21Nickname || op.displayName || op.userId;
          var playerSub = [op.displayName && op.displayName !== poker21Nickname ? op.displayName : "", op.username ? "@" + op.username : ""].filter(Boolean).join(" · ");
          var tournamentTitle = op.tournamentTitle || "Турнир не указан";
          var tournamentMeta = [op.tournamentTime, op.tournamentBuyin].filter(Boolean).join(" · ");
          var currentBalance = Number(op.currentBalance);
          var balanceAfterHtml = Number.isFinite(currentBalance)
            ? '<span class="admin-bonuses__issue-balance">Текущий баланс <strong>' + esc(fmtPoints(Math.max(0, currentBalance))) + '</strong></span>'
            : "";
          var reviewStatus = String(op.reviewStatus || "");
          var reviewFinal = reviewStatus === "minus" || reviewStatus === "plus";
          var reviewHtml = reviewFinal
            ? '<button type="button" class="admin-bonuses__issue-review-result admin-bonuses__issue-review-result--' + reviewStatus + '" disabled>' +
                (reviewStatus === "plus" ? "+ " + esc(fmtPoints(op.reviewAmount)) : "−") +
              '</button>'
            : '<button type="button" data-admin-bonus-issue-review="' + esc(op.id) + '" data-admin-bonus-issue-review-status="minus" aria-label="Не сняли">−</button>' +
              '<button type="button" data-admin-bonus-issue-review="' + esc(op.id) + '" data-admin-bonus-issue-review-status="plus" aria-label="Сняли">+</button>';
          return '<article class="admin-bonuses__issue-row">' +
            '<div class="admin-bonuses__issue-player">' +
              '<strong class="admin-bonuses__issue-poker-nick">' + esc(poker21Nickname) + '</strong>' +
              '<strong class="admin-bonuses__issue-poker-id">' + esc(poker21Label) + '</strong>' +
              (playerSub ? '<span>' + esc(playerSub) + '</span>' : "") +
            '</div>' +
            '<div class="admin-bonuses__issue-tournament"><strong>' + esc(tournamentTitle) + '</strong><span>' + esc(tournamentMeta || fmtDate(op.createdAt)) + '</span></div>' +
            '<div class="admin-bonuses__issue-amount-wrap"><div class="admin-bonuses__issue-amount">−' + esc(fmtPoints(op.amount)) + '</div>' + balanceAfterHtml + '</div>' +
            '<div class="admin-bonuses__issue-review">' + reviewHtml + '</div>' +
          '</article>';
        }).join("") +
      '</section>';
    }).join("");
  }

  function loadIssues(force) {
    var body = $("adminBonusesIssuesBody");
    if (!body || (adminBonusesState.issuesLoaded && !force)) return;
    body.textContent = "Загрузка выдач…";
    fetch(authUrl("bonus-issues", { limit: 1500 }), { cache: "no-store" })
      .then(readJson)
      .then(function (data) {
        if (!data || !data.ok) throw new Error(data && data.error ? data.error : "Выдачи не загрузились");
        adminBonusesState.issueOperations = data.operations || [];
        adminBonusesState.issuesLoaded = true;
        renderIssues(adminBonusesState.issueOperations);
      })
      .catch(function (err) {
        body.textContent = err && err.message ? err.message : POKER_NET_ERR;
      });
  }

  function verifyIssue(button) {
    var operationId = String(button && button.getAttribute("data-admin-bonus-issue-review") || "");
    var status = String(button && button.getAttribute("data-admin-bonus-issue-review-status") || "");
    if (!operationId || button.disabled) return;
    var amount = 0;
    if (status === "plus") {
      var entered = prompt("Сколько сняли?", "");
      if (entered == null) return;
      amount = Number(String(entered).replace(/\s+/g, "").replace(",", "."));
      if (!isFinite(amount) || amount <= 0) {
        alert("Введите сумму больше нуля");
        return;
      }
    }
    var reviewButtons = button.parentNode ? button.parentNode.querySelectorAll("button") : [button];
    var originalLabel = button.textContent;
    reviewButtons.forEach(function (item) { item.disabled = true; });
    button.classList.add("admin-bonuses__issue-review-btn--loading");
    button.textContent = "";
    button.setAttribute("aria-label", "Сохраняем");
    fetch(authUrl("bonus-issues/" + operationId + "/verify"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authBody({ status: status, amount: amount })),
    })
      .then(readJson)
      .then(function (data) {
        if (!data || !data.ok) throw new Error(data && data.error ? data.error : "Проверка не сохранилась");
        var operation = adminBonusesState.issueOperations.find(function (item) { return item.id === operationId; });
        if (operation) {
          operation.reviewVerified = true;
          operation.reviewVerifiedAt = data.review && data.review.verifiedAt || "";
          operation.reviewVerifiedBy = data.review && data.review.adminId || "";
          operation.reviewStatus = data.review && data.review.status || status;
          operation.reviewAmount = Number(data.review && data.review.amount) || 0;
        }
        renderIssues(adminBonusesState.issueOperations);
      })
      .catch(function (err) {
        reviewButtons.forEach(function (item) { item.disabled = false; });
        button.classList.remove("admin-bonuses__issue-review-btn--loading");
        button.textContent = originalLabel;
        button.setAttribute("aria-label", status === "plus" ? "Сняли" : "Не сняли");
        alert(err && err.message ? err.message : POKER_NET_ERR);
      });
  }

  function setActiveTab(name) {
    name = name === "issues" ? "issues" : "balances";
    document.querySelectorAll("[data-admin-bonuses-tab]").forEach(function (button) {
      var active = button.getAttribute("data-admin-bonuses-tab") === name;
      button.classList.toggle("admin-bonuses__tab--active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
    });
    document.querySelectorAll("[data-admin-bonuses-panel]").forEach(function (panel) {
      panel.hidden = panel.getAttribute("data-admin-bonuses-panel") !== name;
    });
    if (name === "issues") loadIssues(false);
  }

  function openOperation(userId, operation) {
    adminBonusesState.selectedUserId = userId;
    adminBonusesState.operation = operation;
    var modal = $("adminBonusesOperationModal");
    var title = $("adminBonusesOperationTitle");
    var userEl = $("adminBonusesOperationUser");
    var amount = $("adminBonusesOperationAmount");
    var comment = $("adminBonusesOperationComment");
    var tournamentWrap = $("adminBonusesOperationTournamentWrap");
    var message = $("adminBonusesOperationMessage");
    var found = adminBonusesState.users.find(function (u) { return u.userId === userId; });
    if (title) title.textContent = operation === "debit" ? "Списать бонусы" : "Начислить бонусы";
    if (userEl) userEl.textContent = (found ? rowTitle(found) + " · " : "") + userId;
    if (amount) {
      amount.value = "";
      amount.readOnly = operation === "debit";
    }
    if (comment) comment.value = "";
    if (tournamentWrap) tournamentWrap.hidden = operation !== "debit";
    if (operation === "debit") populateTournamentOptions();
    if (message) message.textContent = "";
    if (modal) {
      modal.hidden = false;
      modal.setAttribute("aria-hidden", "false");
    }
  }

  function closeOperation() {
    var modal = $("adminBonusesOperationModal");
    if (modal) {
      modal.hidden = true;
      modal.setAttribute("aria-hidden", "true");
    }
  }

  function showOperationSuccess(operation, userId, amount, tournament, balance) {
    var previous = document.querySelector(".admin-bonuses__success-toast");
    if (previous) previous.remove();
    var found = adminBonusesState.users.find(function (user) { return user.userId === userId; });
    var toast = document.createElement("div");
    toast.className = "admin-bonuses__success-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "assertive");
    var action = operation === "debit" ? "Списание прошло успешно" : "Начисление прошло успешно";
    toast.innerHTML =
      '<span class="admin-bonuses__success-icon" aria-hidden="true">✓</span>' +
      '<span><strong>' + esc(action) + '</strong>' +
      '<small>' + esc((found ? rowTitle(found) : userId) + " · " + fmtPoints(amount) + " бонусов") + '</small>' +
      (tournament ? '<small>' + esc(tournament.title) + '</small>' : "") +
      '<small>Новый баланс: ' + esc(fmtPoints(balance)) + '</small></span>';
    toast.addEventListener("click", function () { toast.remove(); });
    document.body.appendChild(toast);
    requestAnimationFrame(function () { toast.classList.add("admin-bonuses__success-toast--visible"); });
    setTimeout(function () {
      toast.classList.remove("admin-bonuses__success-toast--visible");
      setTimeout(function () { toast.remove(); }, 250);
    }, 4500);
    try {
      var tg = window.Telegram && window.Telegram.WebApp;
      if (tg && tg.HapticFeedback) tg.HapticFeedback.notificationOccurred("success");
    } catch (e) {}
  }

  function submitOperation() {
    var userId = adminBonusesState.selectedUserId;
    var operation = adminBonusesState.operation;
    var amountEl = $("adminBonusesOperationAmount");
    var commentEl = $("adminBonusesOperationComment");
    var tournamentEl = $("adminBonusesOperationTournament");
    var message = $("adminBonusesOperationMessage");
    var amount = Math.floor(Number(amountEl && amountEl.value));
    if (!userId || (operation !== "credit" && operation !== "debit")) return;
    if (operation !== "debit" && (!Number.isFinite(amount) || amount <= 0)) {
      if (message) message.textContent = "Сумма должна быть больше 0.";
      return;
    }
    var tournament = null;
    if (operation === "debit") {
      var tournamentId = String(tournamentEl && tournamentEl.value || "");
      tournament = adminBonusesState.tournamentOptions.find(function (item) { return item.id === tournamentId; }) || null;
      if (!tournament) {
        if (message) message.textContent = "Выберите турнир из расписания.";
        return;
      }
      var tournamentBuyin = tournamentBuyinAmount(tournament.buyin);
      if (tournamentBuyin <= 0) {
        if (message) message.textContent = "Для бесплатного турнира списание не требуется.";
        return;
      }
      if (amount !== tournamentBuyin) {
        if (amountEl) amountEl.value = String(tournamentBuyin);
        if (message) message.textContent = "Сумма списания должна совпадать с бай-ином турнира.";
        return;
      }
    }
    if (!confirm((operation === "debit" ? "Списать " : "Начислить ") + amount + " бонусов?")) return;
    var base = apiBase();
    var endpoint = operation === "debit" ? "bonus-debit" : "bonus-credit";
    if (message) message.textContent = "Сохраняем…";
    fetch(authUrl("users/" + userId + "/" + endpoint), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authBody({ amount: amount, comment: commentEl && commentEl.value, tournament: tournament })),
    })
      .then(readJson)
      .then(function (data) {
        if (!data || !data.ok) throw new Error(data && data.error ? data.error : "Операция не выполнена");
        if (message) message.textContent = "Готово. Новый баланс: " + data.bonusBalance;
        showOperationSuccess(operation, userId, amount, tournament, data.bonusBalance);
        loadList();
        loadHistory(userId);
        adminBonusesState.issuesLoaded = false;
        if (operation === "debit") loadIssues(true);
        setTimeout(closeOperation, 650);
      })
      .catch(function (err) {
        if (message) message.textContent = err && err.message ? err.message : POKER_NET_ERR;
      });
  }

  function bind() {
    document.querySelectorAll("[data-admin-bonuses-tab]").forEach(function (button) {
      if (button.dataset.bound === "1") return;
      button.dataset.bound = "1";
      button.addEventListener("click", function () {
        setActiveTab(button.getAttribute("data-admin-bonuses-tab"));
      });
    });
    var issuesRefresh = $("adminBonusesIssuesRefreshBtn");
    if (issuesRefresh && issuesRefresh.dataset.bound !== "1") {
      issuesRefresh.dataset.bound = "1";
      issuesRefresh.addEventListener("click", function () { loadIssues(true); });
    }
    var issuesBody = $("adminBonusesIssuesBody");
    if (issuesBody && issuesBody.dataset.reviewBound !== "1") {
      issuesBody.dataset.reviewBound = "1";
      issuesBody.addEventListener("click", function (event) {
        var button = event.target.closest("[data-admin-bonus-issue-review]");
        if (button) verifyIssue(button);
      });
    }
    var refresh = $("adminBonusesRefreshBtn");
    if (refresh && refresh.dataset.bound !== "1") {
      refresh.dataset.bound = "1";
      refresh.addEventListener("click", function () {
        adminBonusesState.showingAll = false;
        loadList();
      });
    }
    var showAll = $("adminBonusesShowAllBtn");
    if (showAll && showAll.dataset.bound !== "1") {
      showAll.dataset.bound = "1";
      showAll.addEventListener("click", function () {
        adminBonusesState.showingAll = true;
        loadList();
      });
    }
    ["adminBonusesSearch", "adminBonusesMinBalance", "adminBonusesMaxBalance", "adminBonusesSort"].forEach(function (id) {
      var el = $(id);
      if (!el || el.dataset.bound === "1") return;
      el.dataset.bound = "1";
      el.addEventListener(id === "adminBonusesSort" ? "change" : "input", function () {
        adminBonusesState.showingAll = false;
        clearTimeout(el.__adminBonusesTimer);
        el.__adminBonusesTimer = setTimeout(loadList, 350);
      });
    });
    var body = $("adminBonusesTableBody");
    if (body && body.dataset.bound !== "1") {
      body.dataset.bound = "1";
      body.addEventListener("click", function (e) {
        var h = e.target.closest("[data-admin-bonus-history]");
        var c = e.target.closest("[data-admin-bonus-credit]");
        var d = e.target.closest("[data-admin-bonus-debit]");
        if (h) loadHistory(h.getAttribute("data-admin-bonus-history"));
        if (c) openOperation(c.getAttribute("data-admin-bonus-credit"), "credit");
        if (d) openOperation(d.getAttribute("data-admin-bonus-debit"), "debit");
      });
    }
    var close = $("adminBonusesOperationClose");
    var backdrop = $("adminBonusesOperationBackdrop");
    var confirmBtn = $("adminBonusesOperationConfirm");
    var tournamentSelect = $("adminBonusesOperationTournament");
    if (close && close.dataset.bound !== "1") {
      close.dataset.bound = "1";
      close.addEventListener("click", closeOperation);
    }
    if (backdrop && backdrop.dataset.bound !== "1") {
      backdrop.dataset.bound = "1";
      backdrop.addEventListener("click", closeOperation);
    }
    if (confirmBtn && confirmBtn.dataset.bound !== "1") {
      confirmBtn.dataset.bound = "1";
      confirmBtn.addEventListener("click", submitOperation);
    }
    if (tournamentSelect && tournamentSelect.dataset.bound !== "1") {
      tournamentSelect.dataset.bound = "1";
      tournamentSelect.addEventListener("change", syncDebitAmountWithTournament);
    }
  }

  window.initAdminBonuses = function () {
    bind();
    syncTotalDebited(adminBonusesState.totalDebited);
    loadList();
  };
})();
