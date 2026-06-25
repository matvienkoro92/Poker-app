(function () {
  "use strict";

  var API_PATH = "/api/private-cash";
  var modal = null;
  var bodyEl = null;
  var statusEl = null;
  var state = null;
  var loading = false;
  var BONUS_PRESETS = [
    { id: "top-pair", title: "Топ-пара", text: "Бонус за выигранный банк с топ-парой" },
    { id: "set", title: "Сет", text: "Бонус за выигранный банк с сетом" },
    { id: "straight", title: "Стрит", text: "Бонус за выигранный банк со стритом" },
    { id: "flush", title: "Флеш", text: "Бонус за выигранный банк с флешем" },
    { id: "full-house", title: "Фулл-хаус", text: "Бонус за выигранный банк с фулл-хаусом" },
    { id: "four-kind", title: "Каре", text: "Бонус за выигранный банк с каре" },
    { id: "badbeat", title: "Бэдбит", text: "Бонус за болезненный переезд" },
    { id: "custom", title: "Свой", text: "Свой бонус" },
  ];

  function baseUrl() {
    return typeof getApiBase === "function" ? getApiBase().replace(/\/$/, "") : "";
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function apiAuthQuery(lead) {
    return typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery(lead) : lead + "initData=";
  }

  function apiBody(extra) {
    return typeof pokerApiAuthJsonBody === "function" ? pokerApiAuthJsonBody(extra || {}) : extra || {};
  }

  function showAlert(text) {
    var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (tg && typeof tg.showAlert === "function") tg.showAlert(String(text || "Ошибка"));
    else window.alert(String(text || "Ошибка"));
  }

  function setStatus(text) {
    if (statusEl) statusEl.textContent = String(text || "");
  }

  function statusLabel(value) {
    return value === "approved" ? "Одобрен" : "Ждет одобрения";
  }

  function formatDate(raw) {
    var s = String(raw || "").trim();
    var m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return s;
    return m[3] + "." + m[2] + "." + m[1];
  }

  function bonusLines(raw) {
    return String(raw || "")
      .split(/\r?\n/)
      .map(function (line) { return line.trim(); })
      .filter(Boolean);
  }

  function bonusTitle(text) {
    var raw = String(text || "").trim();
    if (!raw) return "Бонус";
    return raw.length > 18 ? raw.slice(0, 18).trim() + "..." : raw;
  }

  function renderBonusPicker() {
    return '<div class="private-cash-modal__bonus-picker">' +
      '<span class="private-cash-modal__bonus-label">Актуальные бонусы</span>' +
      '<div class="private-cash-modal__bonus-grid" role="group" aria-label="Выберите бонус">' +
        BONUS_PRESETS.map(function (bonus) {
          return '<button type="button" class="private-cash-modal__bonus-tile" data-private-cash-bonus="' + escapeHtml(bonus.id) + '" data-private-cash-bonus-text="' + escapeHtml(bonus.text) + '">' +
            '<strong>' + escapeHtml(bonus.title) + '</strong>' +
          '</button>';
        }).join("") +
      '</div>' +
      '<label class="private-cash-modal__bonus-editor">Текст выбранного бонуса<textarea name="bonusText" maxlength="500" rows="3" placeholder="Выберите бонус выше и отредактируйте текст"></textarea></label>' +
    '</div>';
  }

  function renderEventBonuses(raw) {
    var rows = bonusLines(raw);
    if (!rows.length) return "";
    return '<div class="private-cash-modal__bonus-display" aria-label="Актуальные бонусы">' +
      rows.map(function (row) {
        return '<article class="private-cash-modal__bonus-card">' +
          '<strong>' + escapeHtml(bonusTitle(row)) + '</strong>' +
          '<span>' + escapeHtml(row) + '</span>' +
        '</article>';
      }).join("") +
    '</div>';
  }

  function ensureModal() {
    if (modal) return modal;
    modal = document.createElement("div");
    modal.className = "private-cash-modal";
    modal.innerHTML =
      '<div class="private-cash-modal__backdrop" data-private-cash-close="1"></div>' +
      '<section class="private-cash-modal__panel" role="dialog" aria-modal="true" aria-labelledby="privateCashTitle">' +
        '<header class="private-cash-modal__head">' +
          '<div>' +
            '<p class="private-cash-modal__eyebrow">Клубная игра</p>' +
            '<h2 class="private-cash-modal__title" id="privateCashTitle">Приватный кеш</h2>' +
          '</div>' +
          '<button type="button" class="private-cash-modal__close" data-private-cash-close="1" aria-label="Закрыть">×</button>' +
        '</header>' +
        '<div class="private-cash-modal__status" id="privateCashStatus" role="status" aria-live="polite"></div>' +
        '<div class="private-cash-modal__body" id="privateCashBody">' +
          '<div class="private-cash-modal__loading">Идет загрузка...</div>' +
        '</div>' +
      '</section>';
    document.body.appendChild(modal);
    bodyEl = document.getElementById("privateCashBody");
    statusEl = document.getElementById("privateCashStatus");
    modal.addEventListener("click", onModalClick);
    modal.addEventListener("submit", onModalSubmit);
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && modal.classList.contains("private-cash-modal--open")) closeModal();
    });
    return modal;
  }

  function openModal() {
    ensureModal();
    modal.classList.add("private-cash-modal--open");
    document.body.classList.add("private-cash-open");
    renderLoading();
    loadState();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("private-cash-modal--open");
    document.body.classList.remove("private-cash-open");
  }

  function renderLoading() {
    ensureModal();
    if (bodyEl) bodyEl.innerHTML = '<div class="private-cash-modal__loading">Идет загрузка...</div>';
    setStatus("");
  }

  function fetchState() {
    return fetch(baseUrl() + API_PATH + apiAuthQuery("?") + "&_t=" + Date.now(), { cache: "no-store" })
      .then(function (res) { return res.json(); });
  }

  function loadState() {
    if (loading) return;
    loading = true;
    fetchState()
      .then(function (data) {
        if (!data || !data.ok) throw new Error((data && data.error) || "Ошибка загрузки");
        state = data;
        render();
      })
      .catch(function (error) {
        if (bodyEl) bodyEl.innerHTML = '<div class="private-cash-modal__empty">' + escapeHtml(error.message || "Ошибка загрузки") + "</div>";
      })
      .finally(function () {
        loading = false;
      });
  }

  function postAction(payload) {
    setStatus("Идет загрузка...");
    return fetch(baseUrl() + API_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiBody(payload || {})),
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (!data || !data.ok) throw new Error((data && data.error) || "Ошибка");
        state = data.state && data.state.ok ? data.state : data;
        render();
        setStatus("");
        return state;
      })
      .catch(function (error) {
        setStatus("");
        showAlert(error.message || "Ошибка");
      });
  }

  function renderAdminForm() {
    if (!state || !state.isAdmin) return "";
    return '<form class="private-cash-modal__form" data-private-cash-form="create">' +
      '<div class="private-cash-modal__grid">' +
        '<label>Дата<input name="date" type="date" required></label>' +
        '<label>Время<input name="time" type="time" required></label>' +
      '</div>' +
      '<label>Вид игры<select name="gameType" required>' +
        '<option value="">Выберите вид игры</option>' +
        '<option value="Холдем">Холдем</option>' +
        '<option value="Холдем 3-1 флоп">Холдем 3-1 флоп</option>' +
        '<option value="Холдем 3-1 терн">Холдем 3-1 терн</option>' +
        '<option value="Омаха5">Омаха5</option>' +
        '<option value="Омаха6">Омаха6</option>' +
      '</select></label>' +
      '<label>Ставки<input name="stakes" maxlength="80" placeholder="Например: 50/100 ₽" required></label>' +
      '<label>Вход<input name="buyIn" maxlength="80" placeholder="Например: 5 000 ₽" required></label>' +
      '<label>Описание<textarea name="description" maxlength="500" rows="3" placeholder="Формат, место, условия"></textarea></label>' +
      renderBonusPicker() +
      '<label class="private-cash-modal__push-check"><input type="checkbox" name="sendPush"> Отправить пуш всем об открытии записи</label>' +
      '<button type="submit" class="private-cash-modal__primary private-cash-modal__primary--gold">Создать запись</button>' +
    '</form>';
  }

  function renderRules() {
    return '<section class="private-cash-modal__rules" aria-label="Условия записи">' +
      '<div class="private-cash-modal__rule">' +
        '<span class="private-cash-modal__rule-icon" aria-hidden="true">₽</span>' +
        '<p>Админ примет вашу заявку только если у вас есть 5 000 ₽ на счете на вход.</p>' +
      '</div>' +
      '<div class="private-cash-modal__rule">' +
        '<span class="private-cash-modal__rule-icon private-cash-modal__rule-icon--card" aria-hidden="true">▰</span>' +
        '<p>Если вы записались и не пришли, вы получаете желтую карточку.</p>' +
      '</div>' +
      '<div class="private-cash-modal__rule">' +
        '<span class="private-cash-modal__rule-icon private-cash-modal__rule-icon--password" aria-hidden="true">•••</span>' +
        '<p>Пароль от кеша будет отправлен в день игры всем, кто записался.</p>' +
      '</div>' +
    '</section>';
  }

  function renderParticipant(event, my) {
    if (state && state.isAdmin) return "";
    if (my && my.status) {
      return '<div class="private-cash-modal__my-status private-cash-modal__my-status--' + escapeHtml(my.status) + '">' +
        '<span>Ваша заявка</span><strong>' + escapeHtml(statusLabel(my.status)) + '</strong>' +
      '</div>';
    }
    if (event.status !== "active") return '<div class="private-cash-modal__notice">Запись закрыта.</div>';
    return '<button type="button" class="private-cash-modal__primary private-cash-modal__primary--wide" data-private-cash-join="' + escapeHtml(event.id) + '">Записаться</button>';
  }

  function renderParticipants(event) {
    if (!state || !state.isAdmin) return "";
    var rows = event.participants || [];
    return '<div class="private-cash-modal__participants">' +
      '<h3>Заявки</h3>' +
      (rows.length ? rows.map(function (row) {
        var approved = row.status === "approved";
        return '<article class="private-cash-modal__participant">' +
          '<div><strong>' + escapeHtml(row.displayName || "Игрок") + '</strong>' +
            '<span>' + escapeHtml(row.telegramUsername ? "@" + row.telegramUsername : row.accountId) + '</span></div>' +
          '<div class="private-cash-modal__participant-actions">' +
            '<em class="private-cash-modal__badge private-cash-modal__badge--' + escapeHtml(row.status) + '">' + escapeHtml(statusLabel(row.status)) + '</em>' +
            (approved ? "" : '<button type="button" class="private-cash-modal__ghost" data-private-cash-approve="' + escapeHtml(row.accountId) + '" data-private-cash-event="' + escapeHtml(event.id) + '">Одобрить</button>') +
          '</div>' +
        '</article>';
      }).join("") : '<div class="private-cash-modal__empty private-cash-modal__empty--compact">Заявок пока нет.</div>') +
    '</div>';
  }

  function renderEvent(event) {
    var my = event.myParticipant || null;
    return '<article class="private-cash-modal__event">' +
      '<div class="private-cash-modal__event-head">' +
        '<div><span>Дата и время</span><strong>' + escapeHtml(formatDate(event.date)) + ' · ' + escapeHtml(event.time) + '</strong></div>' +
        '<em>' + escapeHtml(event.status === "active" ? "Открыта запись" : "Закрыто") + '</em>' +
      '</div>' +
      '<div class="private-cash-modal__meta">' +
        '<span>Ставки</span><strong>' + escapeHtml(event.stakes) + '</strong>' +
      '</div>' +
      (event.gameType ? '<div class="private-cash-modal__meta private-cash-modal__meta--game"><span>Вид игры</span><strong>' + escapeHtml(event.gameType) + '</strong></div>' : '') +
      (event.buyIn ? '<div class="private-cash-modal__meta private-cash-modal__meta--game"><span>Вход</span><strong>' + escapeHtml(event.buyIn) + '</strong></div>' : '') +
      (event.description ? '<p class="private-cash-modal__text">' + escapeHtml(event.description) + '</p>' : '') +
      renderEventBonuses(event.combinations) +
      renderParticipant(event, my) +
      renderParticipants(event) +
    '</article>';
  }

  function render() {
    ensureModal();
    if (!state) {
      renderLoading();
      return;
    }
    var events = state.events || [];
    bodyEl.innerHTML =
      renderAdminForm() +
      renderRules() +
      '<section class="private-cash-modal__events">' +
        (events.length ? events.map(renderEvent).join("") : '<div class="private-cash-modal__empty">Открытых записей пока нет.</div>') +
      '</section>';
  }

  function onModalSubmit(event) {
    var form = event.target && event.target.closest ? event.target.closest("[data-private-cash-form]") : null;
    if (!form) return;
    event.preventDefault();
    if (form.getAttribute("data-private-cash-form") === "create") {
      postAction({
        action: "create",
        date: form.elements.date.value,
        time: form.elements.time.value,
        gameType: form.elements.gameType.value,
        stakes: form.elements.stakes.value,
        buyIn: form.elements.buyIn.value,
        description: form.elements.description.value,
        combinations: form.elements.bonusText.value,
        sendPush: !!form.elements.sendPush.checked,
      }).then(function () {
        form.reset();
        Array.prototype.slice.call(form.querySelectorAll(".private-cash-modal__bonus-tile--active")).forEach(function (btn) {
          btn.classList.remove("private-cash-modal__bonus-tile--active");
        });
      });
    }
  }

  function onModalClick(event) {
    var close = event.target && event.target.closest ? event.target.closest("[data-private-cash-close]") : null;
    if (close) {
      closeModal();
      return;
    }
    var bonus = event.target && event.target.closest ? event.target.closest("[data-private-cash-bonus]") : null;
    if (bonus) {
      var form = bonus.closest("[data-private-cash-form]");
      var text = bonus.getAttribute("data-private-cash-bonus-text") || "";
      Array.prototype.slice.call(form ? form.querySelectorAll(".private-cash-modal__bonus-tile") : []).forEach(function (btn) {
        btn.classList.toggle("private-cash-modal__bonus-tile--active", btn === bonus);
      });
      if (form && form.elements && form.elements.bonusText) {
        form.elements.bonusText.value = text;
        form.elements.bonusText.focus();
      }
      return;
    }
    var join = event.target && event.target.closest ? event.target.closest("[data-private-cash-join]") : null;
    if (join) {
      postAction({ action: "join", eventId: join.getAttribute("data-private-cash-join") || "" });
      return;
    }
    var approve = event.target && event.target.closest ? event.target.closest("[data-private-cash-approve]") : null;
    if (approve) {
      postAction({
        action: "approve",
        eventId: approve.getAttribute("data-private-cash-event") || "",
        accountId: approve.getAttribute("data-private-cash-approve") || "",
      });
    }
  }

  function bind() {
    var button = document.getElementById("privateCashSignupOpen");
    if (!button) return;
    button.addEventListener("click", openModal);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
  else bind();
})();
