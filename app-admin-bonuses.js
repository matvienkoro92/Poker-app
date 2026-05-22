(function () {
  var adminBonusesState = {
    page: 1,
    users: [],
    selectedUserId: "",
    operation: "",
    loading: false,
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

  function rowTitle(user) {
    return user.displayName || user.nickname || (user.username ? "@" + user.username : user.userId);
  }

  function listUrl() {
    return authUrl("bonus-balances", {
      search: $("adminBonusesSearch") && $("adminBonusesSearch").value,
      minBalance: $("adminBonusesMinBalance") && $("adminBonusesMinBalance").value,
      maxBalance: $("adminBonusesMaxBalance") && $("adminBonusesMaxBalance").value,
      sortBy: $("adminBonusesSort") && $("adminBonusesSort").value,
      page: adminBonusesState.page,
      limit: 50,
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

  function renderTable(users) {
    var body = $("adminBonusesTableBody");
    if (!body) return;
    if (!users || !users.length) {
      body.innerHTML = '<tr><td colspan="9" class="admin-bonuses__empty">Пользователей не найдено.</td></tr>';
      return;
    }
    body.innerHTML = users.map(function (user) {
      var name = rowTitle(user);
      var userId = user.userId || "—";
      var nick = user.username ? "@" + user.username : (user.nickname || "—");
      return '<tr data-user-id="' + esc(user.userId) + '">' +
        '<td><strong>' + esc(name) + '</strong><span>' + esc(user.email || user.phone || "") + '</span></td>' +
        '<td><span class="admin-bonuses__mono">' + esc(userId) + '</span></td>' +
        '<td>' + esc(nick) + '</td>' +
        '<td><strong>' + esc(user.bonusBalance || 0) + '</strong></td>' +
        '<td>' + esc(fmtDate(user.lastGameAt)) + '</td>' +
        '<td>' + esc(user.dailyPokerGamesPlayed || 0) + '</td>' +
        '<td><strong class="admin-bonuses__amount-plus">+' + esc(user.totalCredited || 0) + '</strong></td>' +
        '<td><strong class="admin-bonuses__amount-minus">-' + esc(user.totalDebited || 0) + '</strong></td>' +
        '<td class="admin-bonuses__actions-cell">' +
          '<button type="button" data-admin-bonus-history="' + esc(user.userId) + '">История</button>' +
          '<button type="button" data-admin-bonus-credit="' + esc(user.userId) + '">Начислить</button>' +
          '<button type="button" data-admin-bonus-debit="' + esc(user.userId) + '">Списать</button>' +
        '</td>' +
      '</tr>';
    }).join("");
  }

  function loadList() {
    var base = apiBase();
    if (!base || !hasCredential()) {
      setStatus("Нет админской сессии.", true);
      return;
    }
    adminBonusesState.loading = true;
    setStatus("Загрузка…", false);
    fetch(listUrl(), { cache: "no-store" })
      .then(readJson)
      .then(function (data) {
        adminBonusesState.loading = false;
        if (!data || !data.ok) throw new Error(data && data.error ? data.error : "Ошибка загрузки");
        adminBonusesState.users = data.users || [];
        renderTable(adminBonusesState.users);
        setStatus("Показано: " + (data.users || []).length + " из " + (data.total || 0), false);
      })
      .catch(function (err) {
        adminBonusesState.loading = false;
        setStatus(err && err.message ? err.message : POKER_NET_ERR, true);
      });
  }

  function loadHistory(userId) {
    var base = apiBase();
    var body = $("adminBonusesHistoryBody");
    if (!base || !body) return;
    adminBonusesState.selectedUserId = userId;
    body.innerHTML = "Загрузка истории…";
    fetch(authUrl("users/" + userId + "/bonus-ledger"), { cache: "no-store" })
      .then(readJson)
      .then(function (data) {
        if (!data || !data.ok) throw new Error(data && data.error ? data.error : "История не загрузилась");
        var ops = data.operations || [];
        if (!ops.length) {
          body.innerHTML = "Операций пока нет.";
          return;
        }
        body.innerHTML = ops.map(function (op) {
          var sign = op.direction === "debit" ? "-" : "+";
          return '<article class="admin-bonuses__history-item">' +
            '<div><strong>' + esc(sign + op.amount) + '</strong><span>' + esc(op.operationType) + '</span></div>' +
            '<div>Баланс: ' + esc(op.balanceBefore) + ' → ' + esc(op.balanceAfter) + '</div>' +
            '<div>' + esc(fmtDate(op.createdAt)) + (op.adminId ? ' · admin: ' + esc(op.adminId) : "") + '</div>' +
            (op.comment ? '<p>' + esc(op.comment) + '</p>' : "") +
          '</article>';
        }).join("");
      })
      .catch(function (err) {
        body.innerHTML = esc(err && err.message ? err.message : POKER_NET_ERR);
      });
  }

  function openOperation(userId, operation) {
    adminBonusesState.selectedUserId = userId;
    adminBonusesState.operation = operation;
    var modal = $("adminBonusesOperationModal");
    var title = $("adminBonusesOperationTitle");
    var userEl = $("adminBonusesOperationUser");
    var balanceEl = $("adminBonusesOperationBalance");
    var amount = $("adminBonusesOperationAmount");
    var comment = $("adminBonusesOperationComment");
    var message = $("adminBonusesOperationMessage");
    var found = adminBonusesState.users.find(function (u) { return u.userId === userId; });
    if (title) title.textContent = operation === "debit" ? "Списать бонусы" : "Начислить бонусы";
    if (userEl) userEl.textContent = (found ? rowTitle(found) + " · " : "") + userId;
    if (balanceEl) balanceEl.textContent = "Текущий баланс: " + (found ? found.bonusBalance || 0 : 0);
    if (amount) {
      amount.value = "";
      if (operation === "debit" && found) amount.max = String(Math.max(0, parseInt(found.bonusBalance || "0", 10) || 0));
      else amount.removeAttribute("max");
    }
    if (comment) comment.value = "";
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

  function submitOperation() {
    var userId = adminBonusesState.selectedUserId;
    var operation = adminBonusesState.operation;
    var amountEl = $("adminBonusesOperationAmount");
    var commentEl = $("adminBonusesOperationComment");
    var message = $("adminBonusesOperationMessage");
    var amount = Math.floor(Number(amountEl && amountEl.value));
    var found = adminBonusesState.users.find(function (u) { return u.userId === userId; });
    if (!userId || (operation !== "credit" && operation !== "debit")) return;
    if (!Number.isFinite(amount) || amount <= 0) {
      if (message) message.textContent = "Сумма должна быть больше 0.";
      return;
    }
    if (operation === "debit" && found && amount > (parseInt(found.bonusBalance || "0", 10) || 0)) {
      if (message) message.textContent = "Нельзя списать больше текущего баланса.";
      return;
    }
    var endpoint = operation === "debit" ? "bonus-debit" : "bonus-credit";
    if (message) message.textContent = "Сохраняем…";
    fetch(authUrl("users/" + userId + "/" + endpoint), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authBody({ amount: amount, comment: commentEl && commentEl.value })),
    })
      .then(readJson)
      .then(function (data) {
        if (!data || !data.ok) throw new Error(data && data.error ? data.error : "Операция не выполнена");
        if (message) message.textContent = "Готово. Новый баланс: " + data.bonusBalance;
        loadList();
        loadHistory(userId);
        setTimeout(closeOperation, 650);
      })
      .catch(function (err) {
        if (message) message.textContent = err && err.message ? err.message : POKER_NET_ERR;
      });
  }

  function bind() {
    var refresh = $("adminBonusesRefreshBtn");
    if (refresh && refresh.dataset.bound !== "1") {
      refresh.dataset.bound = "1";
      refresh.addEventListener("click", loadList);
    }
    ["adminBonusesSearch", "adminBonusesMinBalance", "adminBonusesMaxBalance", "adminBonusesSort"].forEach(function (id) {
      var el = $(id);
      if (!el || el.dataset.bound === "1") return;
      el.dataset.bound = "1";
      el.addEventListener(id === "adminBonusesSort" ? "change" : "input", function () {
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
  }

  window.initAdminBonuses = function () {
    bind();
    loadList();
  };
})();
