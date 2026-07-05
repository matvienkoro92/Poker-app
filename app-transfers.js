(function () {
  var state = {
    bound: false,
    loading: false,
    loadedAt: 0,
    filter: "active",
    kind: "cashout",
    items: [],
    viewer: null,
    maxAmount: 2500,
  };
  var tickTimer = null;

  function root() {
    return document.getElementById("transfersView");
  }

  function apiBase() {
    return typeof getApiBase === "function" ? getApiBase() : "";
  }

  function authQuery() {
    if (typeof pokerRafflesApiQueryLeading === "function") return pokerRafflesApiQueryLeading();
    if (typeof pokerApiAuthQuery === "function") return pokerApiAuthQuery("?");
    return "?initData=";
  }

  function authedBody(extra) {
    return typeof pokerGuestOrAuthedPostBody === "function" ? pokerGuestOrAuthedPostBody(extra || {}) : extra || {};
  }

  function fetchJson(url, init) {
    var run = typeof pokerFetchRetry === "function" ? pokerFetchRetry : fetch;
    return run(url, init || {}, { timeoutMs: 16000, maxAttempts: 2 })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          if (!res.ok && data && !data.error) data.error = "Ошибка " + res.status;
          return data;
        });
      });
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function setFeedback(text, kind) {
    var el = byId("transfersCreateFeedback");
    if (!el) return;
    el.textContent = text || "";
    el.classList.toggle("transfers-feedback--error", kind === "error");
    el.classList.toggle("transfers-feedback--ok", kind === "ok");
  }

  function textNode(tag, className, text) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (text != null) el.textContent = String(text);
    return el;
  }

  function formatAmount(amount) {
    var n = Math.max(0, Number(amount) || 0);
    try {
      return n.toLocaleString("ru-RU") + " ₽";
    } catch (e) {
      return String(n) + " ₽";
    }
  }

  function formatLeft(until) {
    var left = Math.max(0, Number(until || 0) - Date.now());
    var total = Math.ceil(left / 1000);
    var min = Math.floor(total / 60);
    var sec = total % 60;
    return min + ":" + (sec < 10 ? "0" : "") + sec;
  }

  function statusText(item) {
    if (!item) return "";
    if (item.status === "completed") return "Закрыта";
    if (item.status === "cancelled") return "Отменена";
    if (item.status === "seller_transferred") return "Ждёт подтверждение";
    if (item.status === "buyer_sent") return "Деньги отправлены";
    if (item.status === "reserved") return "В работе " + formatLeft(item.reservedUntil);
    return "Открыта";
  }

  function kindText(kind) {
    return kind === "deposit" ? "Депозит" : "Кешаут";
  }

  function renderMode() {
    var details = byId("transfersDetailsField");
    var detailsInput = byId("transfersDetailsInput");
    var submit = byId("transfersCreateSubmit");
    var label = byId("transfersDetailsLabel");
    Array.prototype.slice.call(document.querySelectorAll("[data-transfers-kind]")).forEach(function (btn) {
      var active = btn.getAttribute("data-transfers-kind") === state.kind;
      btn.classList.toggle("transfers-create__mode-btn--active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
    if (details) details.hidden = state.kind === "deposit";
    if (detailsInput) detailsInput.required = state.kind === "cashout";
    if (submit) submit.textContent = state.kind === "deposit" ? "Хочу сделать депозит" : "Разместить кешаут";
    if (label) label.textContent = state.kind === "deposit" ? "Реквизиты" : "Реквизиты";
  }

  function visibleItems() {
    var items = state.items.slice();
    if (state.filter === "mine") return items.filter(function (item) { return !!item.isMine; });
    if (state.filter === "completed") return items.filter(function (item) { return item.status === "completed"; });
    return items.filter(function (item) { return item.status !== "completed" && item.status !== "cancelled"; });
  }

  function addMeta(row, label, value) {
    if (!value) return;
    var item = textNode("span", "transfers-card__meta-item");
    item.appendChild(textNode("span", "transfers-card__meta-label", label));
    item.appendChild(textNode("span", "transfers-card__meta-value", value));
    row.appendChild(item);
  }

  function actionButton(action, label, item) {
    var btn = textNode("button", "transfers-card__action", label);
    btn.type = "button";
    btn.setAttribute("data-transfers-action", action);
    btn.setAttribute("data-transfer-id", item.id);
    return btn;
  }

  function renderRequisites(card, item) {
    if (!item.canSeeRequisites || !item.requisites) return;
    var box = textNode("div", "transfers-card__details");
    box.appendChild(textNode("span", "transfers-card__details-label", "Реквизиты"));
    box.appendChild(textNode("pre", "transfers-card__details-text", item.requisites));
    card.appendChild(box);
  }

  function renderTakeDetails(actions, item) {
    if (item.kind !== "deposit") return;
    var field = textNode("label", "transfers-card__take-details");
    field.appendChild(textNode("span", "transfers-card__take-label", "Ваши реквизиты"));
    var textarea = document.createElement("textarea");
    textarea.rows = 2;
    textarea.maxLength = 700;
    textarea.placeholder = "карта, банк, телефон";
    textarea.setAttribute("data-transfers-take-details", item.id);
    field.appendChild(textarea);
    actions.appendChild(field);
  }

  function renderActions(card, item) {
    var actions = textNode("div", "transfers-card__actions");
    if (item.status === "open" && !item.isMine) {
      renderTakeDetails(actions, item);
      actions.appendChild(actionButton("take", "Взял", item));
    }
    if (item.status === "open" && item.isOwner) {
      actions.appendChild(actionButton("cancel", "Отменить", item));
    }
    if (item.status === "reserved" && item.isBuyer) {
      actions.appendChild(actionButton("sent", "Отправил", item));
    }
    if (item.status === "buyer_sent" && item.isSeller) {
      actions.appendChild(actionButton("transferred", "Перевёл", item));
    }
    if (item.status === "seller_transferred" && item.isBuyer) {
      actions.appendChild(actionButton("received", "Получил", item));
    }
    if (actions.children.length) card.appendChild(actions);
  }

  function renderCard(item) {
    var card = textNode("article", "transfers-card transfers-card--" + item.status + " transfers-card--" + item.kind);
    card.setAttribute("data-transfer-card", item.id);

    var top = textNode("div", "transfers-card__top");
    var titleBlock = textNode("div", "transfers-card__title-block");
    titleBlock.appendChild(textNode("span", "transfers-card__kind", kindText(item.kind)));
    titleBlock.appendChild(textNode("strong", "transfers-card__amount", formatAmount(item.amount)));
    top.appendChild(titleBlock);
    top.appendChild(textNode("span", "transfers-card__status", statusText(item)));
    card.appendChild(top);

    var meta = textNode("div", "transfers-card__meta");
    addMeta(meta, "Автор", item.ownerAccountId);
    addMeta(meta, "Покупатель", item.buyerAccountId);
    addMeta(meta, "Продавец", item.sellerAccountId);
    card.appendChild(meta);

    if (item.comment) card.appendChild(textNode("p", "transfers-card__comment", item.comment));
    renderRequisites(card, item);
    renderActions(card, item);
    return card;
  }

  function renderTabs() {
    Array.prototype.slice.call(document.querySelectorAll("[data-transfers-filter]")).forEach(function (btn) {
      var active = btn.getAttribute("data-transfers-filter") === state.filter;
      btn.classList.toggle("transfers-tabs__btn--active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function render() {
    var list = byId("transfersList");
    var empty = byId("transfersEmpty");
    var viewer = byId("transfersViewerId");
    if (viewer && state.viewer && state.viewer.accountId) {
      viewer.hidden = false;
      viewer.textContent = "Ваш ID: " + state.viewer.accountId;
    }
    renderMode();
    renderTabs();
    if (!list) return;
    list.textContent = "";
    var items = visibleItems();
    items.forEach(function (item) {
      list.appendChild(renderCard(item));
    });
    if (empty) {
      empty.hidden = items.length > 0 || state.loading;
      if (!items.length && !state.loading) {
        empty.textContent = state.filter === "completed" ? "Закрытых сделок пока нет." : "Заявок пока нет.";
      }
    }
  }

  function setLoading(value) {
    state.loading = !!value;
    var r = root();
    if (r) r.classList.toggle("transfers-page--loading", state.loading);
    var refresh = byId("transfersRefreshBtn");
    if (refresh) refresh.disabled = state.loading;
  }

  function loadTransfers(force) {
    var base = apiBase();
    var q = authQuery();
    if (!base || !q || q === "?initData=") {
      setFeedback("Нужно войти в аккаунт", "error");
      render();
      return Promise.resolve(null);
    }
    if (state.loading) return Promise.resolve(null);
    if (!force && state.loadedAt && Date.now() - state.loadedAt < 15000) {
      render();
      return Promise.resolve(state.items);
    }
    setLoading(true);
    return fetchJson(base + "/api/transfers" + q, { method: "GET" })
      .then(function (data) {
        if (!data || !data.ok) throw new Error((data && data.error) || "Не удалось загрузить заявки");
        state.items = Array.isArray(data.items) ? data.items : [];
        state.viewer = data.viewer || null;
        state.maxAmount = Number(data.maxAmount || 2500) || 2500;
        state.loadedAt = Date.now();
        render();
        return state.items;
      })
      .catch(function (err) {
        setFeedback(err && err.message ? err.message : "Не удалось загрузить заявки", "error");
        render();
        return null;
      })
      .finally(function () {
        setLoading(false);
      });
  }

  function upsertItem(item) {
    if (!item || !item.id) return;
    state.items = state.items.filter(function (row) { return row.id !== item.id; });
    state.items.unshift(item);
    state.items.sort(function (a, b) {
      return Number(b.updatedAt || b.createdAt || 0) - Number(a.updatedAt || a.createdAt || 0);
    });
    state.loadedAt = Date.now();
    render();
  }

  function postAction(payload, button) {
    var base = apiBase();
    if (!base) return Promise.resolve(null);
    var prev = button ? button.textContent : "";
    if (button) {
      button.disabled = true;
      button.textContent = "Ждём...";
    }
    setFeedback("", "");
    return fetchJson(base + "/api/transfers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authedBody(payload)),
    })
      .then(function (data) {
        if (!data || !data.ok) throw new Error((data && data.error) || "Не удалось выполнить действие");
        if (data.item) upsertItem(data.item);
        if (payload.action === "received") {
          try {
            if (typeof pokerClearCurrentProfileUserInfoCache === "function") pokerClearCurrentProfileUserInfoCache();
          } catch (eProfileCache) {}
        }
        setFeedback("Готово", "ok");
        return data;
      })
      .catch(function (err) {
        setFeedback(err && err.message ? err.message : "Не удалось выполнить действие", "error");
        return null;
      })
      .finally(function () {
        if (button) {
          button.disabled = false;
          button.textContent = prev;
        }
      });
  }

  function handleCreate(event) {
    event.preventDefault();
    var amountEl = byId("transfersAmountInput");
    var commentEl = byId("transfersCommentInput");
    var detailsEl = byId("transfersDetailsInput");
    var amount = amountEl ? Number(amountEl.value) || 0 : 0;
    if (!amount || amount > state.maxAmount) {
      setFeedback("Максимум " + state.maxAmount + " ₽", "error");
      return;
    }
    var details = detailsEl ? detailsEl.value.trim() : "";
    if (state.kind === "cashout" && !details) {
      setFeedback("Укажите реквизиты", "error");
      return;
    }
    var submit = byId("transfersCreateSubmit");
    postAction({
      action: "create",
      kind: state.kind,
      amount: amount,
      comment: commentEl ? commentEl.value : "",
      requisites: state.kind === "cashout" ? details : "",
    }, submit).then(function (data) {
      if (!data || !data.ok) return;
      if (commentEl) commentEl.value = "";
      if (detailsEl) detailsEl.value = "";
      if (amountEl) amountEl.value = "";
    });
  }

  function handleAction(event) {
    var btn = event.target && event.target.closest ? event.target.closest("[data-transfers-action]") : null;
    if (!btn || btn.disabled) return;
    var action = btn.getAttribute("data-transfers-action");
    var id = btn.getAttribute("data-transfer-id");
    if (!action || !id) return;
    var payload = { action: action, id: id };
    if (action === "take") {
      var details = document.querySelector('[data-transfers-take-details="' + id.replace(/"/g, '\\"') + '"]');
      if (details) {
        payload.requisites = details.value.trim();
        if (!payload.requisites) {
          setFeedback("Укажите реквизиты", "error");
          return;
        }
      }
    }
    postAction(payload, btn);
  }

  function bind() {
    var r = root();
    if (!r || state.bound) return;
    state.bound = true;
    r.addEventListener("click", function (event) {
      var mode = event.target && event.target.closest ? event.target.closest("[data-transfers-kind]") : null;
      if (mode) {
        state.kind = mode.getAttribute("data-transfers-kind") || "cashout";
        setFeedback("", "");
        render();
        return;
      }
      var preset = event.target && event.target.closest ? event.target.closest("[data-transfers-amount]") : null;
      if (preset) {
        var amountEl = byId("transfersAmountInput");
        if (amountEl) amountEl.value = preset.getAttribute("data-transfers-amount") || "";
        return;
      }
      var filter = event.target && event.target.closest ? event.target.closest("[data-transfers-filter]") : null;
      if (filter) {
        state.filter = filter.getAttribute("data-transfers-filter") || "active";
        render();
        return;
      }
      var refresh = event.target && event.target.closest ? event.target.closest("#transfersRefreshBtn") : null;
      if (refresh) {
        loadTransfers(true);
        return;
      }
      handleAction(event);
    });
    var form = byId("transfersCreateForm");
    if (form) form.addEventListener("submit", handleCreate);
  }

  function activeView() {
    return document.body && document.body.getAttribute("data-view") === "transfers";
  }

  function bindBodyObserver() {
    if (window.__pokerTransfersBodyObserverBound) return;
    window.__pokerTransfersBodyObserverBound = true;
    try {
      var observer = new MutationObserver(function () {
        if (activeView()) {
          bind();
          loadTransfers(false);
        }
      });
      if (document.body) observer.observe(document.body, { attributes: true, attributeFilter: ["data-view"] });
    } catch (eObserver) {}
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden && activeView() && Date.now() - Number(state.loadedAt || 0) > 60000) loadTransfers(true);
    });
  }

  function startTicker() {
    if (tickTimer) return;
    tickTimer = setInterval(function () {
      if (!activeView()) return;
      Array.prototype.slice.call(document.querySelectorAll(".transfers-card--reserved .transfers-card__status")).forEach(function (el) {
        var card = el.closest("[data-transfer-card]");
        var id = card ? card.getAttribute("data-transfer-card") : "";
        var item = state.items.filter(function (row) { return row.id === id; })[0];
        if (item) el.textContent = statusText(item);
      });
    }, 1000);
  }

  function initTransfers() {
    bindBodyObserver();
    bind();
    render();
    startTicker();
    if (activeView()) loadTransfers(false);
  }

  window.pokerInitTransfers = initTransfers;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTransfers);
  } else {
    initTransfers();
  }
})();
