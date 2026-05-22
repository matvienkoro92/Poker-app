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

  function buildQuery() {
    var q = authQuery();
    function add(name, value) {
      value = String(value == null ? "" : value).trim();
      if (!value) return;
      q += (q.indexOf("?") === -1 ? "?" : "&") + encodeURIComponent(name) + "=" + encodeURIComponent(value);
    }
    add("search", $("adminBonusesSearch") && $("adminBonusesSearch").value);
    add("minBalance", $("adminBonusesMinBalance") && $("adminBonusesMinBalance").value);
    add("maxBalance", $("adminBonusesMaxBalance") && $("adminBonusesMaxBalance").value);
    add("sortBy", $("adminBonusesSort") && $("adminBonusesSort").value);
    add("page", adminBonusesState.page);
    add("limit", 50);
    return q;
  }

  function renderTable(users) {
    var body = $("adminBonusesTableBody");
    if (!body) return;
    if (!users || !users.length) {
      body.innerHTML = '<tr><td colspan="7" class="admin-bonuses__empty">Пользователей не найдено.</td></tr>';
      return;
    }
    body.innerHTML = users.map(function (user) {
      var name = rowTitle(user);
      var sub = user.username ? "@" + user.username + " · " + user.userId : user.userId;
      var contact = [user.email || "", user.phone || ""].filter(Boolean).map(esc).join("<br>") || "—";
      return '<tr data-user-id="' + esc(user.userId) + '">' +
        '<td><strong>' + esc(name) + '</strong><span>' + esc(sub) + '</span></td>' +
        '<td>' + contact + '</td>' +
        '<td><strong>' + esc(user.bonusBalance || 0) + '</strong></td>' +
        '<td>' + esc(user.dailyPokerGamesPlayed || 0) + '</td>' +
        '<td>' + esc(user.ticketsWon || 0) + '</td>' +
        '<td>' + esc(fmtDate(user.lastGameAt)) + '</td>' +
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
    fetch(base + "/api/admin/bonus-balances" + buildQuery(), { cache: "no-store" })
      .then(function (r) { return r.json(); })
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
    fetch(base + "/api/admin/users/" + encodeURIComponent(userId) + "/bonus-ledger" + authQuery(), { cache: "no-store" })
      .then(function (r) { return r.json(); })
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
    var amount = $("adminBonusesOperationAmount");
    var comment = $("adminBonusesOperationComment");
    var message = $("adminBonusesOperationMessage");
    var found = adminBonusesState.users.find(function (u) { return u.userId === userId; });
    if (title) title.textContent = operation === "debit" ? "Списать бонусы" : "Начислить бонусы";
    if (userEl) userEl.textContent = (found ? rowTitle(found) + " · " : "") + userId;
    if (amount) amount.value = "";
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
    if (!userId || (operation !== "credit" && operation !== "debit")) return;
    if (!Number.isFinite(amount) || amount <= 0) {
      if (message) message.textContent = "Сумма должна быть больше 0.";
      return;
    }
    if (!confirm((operation === "debit" ? "Списать " : "Начислить ") + amount + " бонусов?")) return;
    var base = apiBase();
    var endpoint = operation === "debit" ? "bonus-debit" : "bonus-credit";
    if (message) message.textContent = "Сохраняем…";
    fetch(base + "/api/admin/users/" + encodeURIComponent(userId) + "/" + endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authBody({ amount: amount, comment: commentEl && commentEl.value })),
    })
      .then(function (r) { return r.json(); })
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
