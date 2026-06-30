(function () {
  "use strict";

  var API_PATH = "/api/private-cash";
  var PRIVATE_CASH_START_PARAM = "private_cash";
  var modal = null;
  var bodyEl = null;
  var statusEl = null;
  var state = null;
  var loading = false;
  var activeTab = "signup";
  var editingEventId = "";
  var manualSuggestTimer = 0;
  var BONUS_PRESETS = [
    { id: "four-kind", amount: "1000 ₽", condition: "за каре" },
    { id: "straight-flush", amount: "2500 ₽", condition: "за стрит-флеш" },
    { id: "royal", amount: "5000 ₽", condition: "за роял" },
    { id: "knockout", amount: "500-1500 ₽", condition: "за нокаут топ10 Лиги1" },
    { id: "badbeat", amount: "1200 ₽", condition: "бабблу" },
  ];
  var DEFAULT_CASH_BONUS_TEXT = "+10% на любой стек от 5к до 20к, первым 6 записавшимся";

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

  function privateCashLink() {
    if (typeof buildMiniAppStartLink === "function") return buildMiniAppStartLink(PRIVATE_CASH_START_PARAM);
    if (typeof pokerBuildWebsiteStartLink === "function") {
      var webLink = pokerBuildWebsiteStartLink(PRIVATE_CASH_START_PARAM);
      if (webLink) return webLink;
    }
    var base = typeof getAppBaseUrlForLinks === "function" ? getAppBaseUrlForLinks() : "";
    if (!base && window.location) base = String(window.location.origin || "") + "/";
    base = String(base || "").trim().replace(/\/+$/, "");
    return base ? base + (base.indexOf("?") >= 0 ? "&" : "?") + "startapp=" + encodeURIComponent(PRIVATE_CASH_START_PARAM) : "";
  }

  function sharePrivateCash() {
    var link = privateCashLink();
    var text = "Запись на приватный кеш клуба «Два туза»:";
    if (!link) {
      showAlert("Не удалось сформировать ссылку.");
      return;
    }
    if (typeof pokerTryPwaWebShare === "function") {
      pokerTryPwaWebShare({ title: "Приватный кеш", text: text + "\n" + link, url: link }).then(function (ok) {
        if (ok) return;
        openTelegramShare(link, text);
      });
      return;
    }
    openTelegramShare(link, text);
  }

  function openTelegramShare(link, text) {
    var shareUrl = typeof pokerBuildTelegramShareUrlDialog === "function"
      ? pokerBuildTelegramShareUrlDialog(link, text)
      : "https://t.me/share/url?url=" + encodeURIComponent(link) + "&text=" + encodeURIComponent(text || "");
    var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (tg && typeof tg.openTelegramLink === "function") tg.openTelegramLink(shareUrl);
    else if (tg && typeof tg.openLink === "function") tg.openLink(shareUrl);
    else window.open(shareUrl, "_blank", "noopener,noreferrer");
  }

  function copyPrivateCashLink() {
    var link = privateCashLink();
    if (!link) {
      showAlert("Не удалось сформировать ссылку.");
      return;
    }
    var copy = typeof pokerCopyTextToClipboard === "function"
      ? pokerCopyTextToClipboard(link)
      : Promise.resolve(false);
    copy.then(function (ok) {
      showAlert(ok ? "Ссылка на приватный кеш скопирована." : "Скопируйте ссылку вручную: " + link);
    });
  }

  function setStatus(text) {
    if (statusEl) statusEl.textContent = String(text || "");
  }

  function setProfileLoading(profile, active, name) {
    if (!profile) return;
    profile.classList.toggle("private-cash-modal__profile-loading", !!active);
    if (active) {
      profile.setAttribute("aria-busy", "true");
      profile.setAttribute("data-private-cash-loading-label", "Открываю");
      setStatus("Открываю профиль " + (name || "игрока") + "...");
    } else {
      profile.removeAttribute("aria-busy");
      profile.removeAttribute("data-private-cash-loading-label");
      setStatus("");
    }
  }

  function clearProfileLoadingLater(profile, name, delay) {
    window.setTimeout(function () {
      setProfileLoading(profile, false, name);
    }, delay || 1400);
  }

  function statusLabel(value) {
    if (value === "approved") return "Подтвержден";
    if (value === "rejected") return "Отклонен";
    return "Подал заявку";
  }

  function formatDate(raw) {
    var s = String(raw || "").trim();
    var m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return s;
    return m[3] + "." + m[2] + "." + m[1];
  }

  function privateCashEventDateMs(event) {
    var date = String(event && event.date || "").trim();
    var time = String(event && event.time || "").trim();
    if (!date || !time) return 0;
    var d = new Date(date + "T" + time + ":00");
    var ms = d.getTime();
    return Number.isFinite(ms) ? ms : 0;
  }

  function formatPrivateCashCountdown(msLeft) {
    if (!Number.isFinite(msLeft) || msLeft <= 0) return "Игра уже началась";
    var totalMinutes = Math.ceil(msLeft / 60000);
    var days = Math.floor(totalMinutes / 1440);
    var hours = Math.floor((totalMinutes % 1440) / 60);
    var minutes = totalMinutes % 60;
    if (days > 0) return "Осталось " + days + "д " + hours + "ч";
    if (hours > 0) return "Осталось " + hours + "ч " + minutes + "м";
    return "Осталось " + minutes + "м";
  }

  function updatePrivateCashCountdowns() {
    if (!modal || !modal.classList.contains("private-cash-modal--open")) return;
    Array.prototype.slice.call(modal.querySelectorAll("[data-private-cash-countdown]")).forEach(function (el) {
      var endMs = Number(el.getAttribute("data-private-cash-countdown")) || 0;
      el.textContent = formatPrivateCashCountdown(endMs - Date.now());
    });
  }

  window.setInterval(updatePrivateCashCountdowns, 1000);

  function eventTablePassword(event) {
    return String(event && (event.tablePassword || event.table_password || event.password) || "7788").trim() || "7788";
  }

  function bonusLines(raw) {
    return String(raw || "")
      .split(/\r?\n/)
      .map(function (line) { return line.trim(); })
      .filter(Boolean);
  }

  function parseBonusLine(line) {
    var raw = String(line || "").trim();
    var parts = raw.split("|").map(function (part) { return part.trim(); });
    if (parts.length >= 2) return { amount: parts[0], condition: parts.slice(1).join(" | ") };
    var dash = raw.match(/^(.+?)\s+[—-]\s+(.+)$/);
    if (dash) return { amount: dash[1].trim(), condition: dash[2].trim() };
    return { amount: raw, condition: "" };
  }

  function serializeBonus(amount, condition) {
    amount = String(amount || "").trim();
    condition = String(condition || "").trim();
    if (!amount && !condition) return "";
    return amount + " | " + condition;
  }

  function renderBonusCard(row, options) {
    var bonus = parseBonusLine(row);
    var removable = options && options.removable;
    return '<article class="private-cash-modal__bonus-card">' +
      '<strong>' + escapeHtml(bonus.amount || "Бонус") + '</strong>' +
      (bonus.condition ? '<span>' + escapeHtml(bonus.condition) + '</span>' : '') +
      (removable ? '<button type="button" class="private-cash-modal__bonus-remove" data-private-cash-bonus-remove aria-label="Убрать бонус">×</button>' : '') +
    '</article>';
  }

  function updateBonusPreview(form) {
    if (!form || !form.elements || !form.elements.bonusText) return;
    var preview = form.querySelector("[data-private-cash-bonus-preview]");
    if (!preview) return;
    var rows = bonusLines(form.elements.bonusText.value);
    preview.innerHTML = rows.length
      ? rows.map(function (row, index) {
        return '<div class="private-cash-modal__bonus-preview-item" data-private-cash-bonus-index="' + index + '">' + renderBonusCard(row, { removable: true }) + '</div>';
      }).join("")
      : '<p class="private-cash-modal__bonus-preview-empty">Добавьте бонусы, и они появятся здесь плитками.</p>';
  }

  function addBonusFromForm(form) {
    if (!form || !form.elements || !form.elements.bonusText) return;
    var amountEl = form.elements.bonusAmount;
    var conditionEl = form.elements.bonusCondition;
    var line = serializeBonus(amountEl && amountEl.value, conditionEl && conditionEl.value);
    if (!line) return;
    var rows = bonusLines(form.elements.bonusText.value);
    rows.push(line);
    form.elements.bonusText.value = rows.join("\n");
    if (amountEl) amountEl.value = "";
    if (conditionEl) conditionEl.value = "";
    updateBonusPreview(form);
  }

  function renderBonusPicker() {
    return '<div class="private-cash-modal__bonus-picker">' +
      '<div class="private-cash-modal__bonus-head">' +
        '<span class="private-cash-modal__bonus-label">Бонусы к кешу</span>' +
        '<small>Введите сумму и условие, затем добавьте плитку</small>' +
      '</div>' +
      '<div class="private-cash-modal__bonus-grid" role="group" aria-label="Выберите бонус">' +
        BONUS_PRESETS.map(function (bonus) {
          return '<button type="button" class="private-cash-modal__bonus-tile" data-private-cash-bonus="' + escapeHtml(bonus.id) + '" data-private-cash-bonus-amount="' + escapeHtml(bonus.amount) + '" data-private-cash-bonus-condition="' + escapeHtml(bonus.condition) + '">' +
            '<strong>' + escapeHtml(bonus.amount) + '</strong>' +
            '<span>' + escapeHtml(bonus.condition) + '</span>' +
          '</button>';
        }).join("") +
      '</div>' +
      '<div class="private-cash-modal__bonus-builder">' +
        '<label>Сумма<input name="bonusAmount" maxlength="40" placeholder="1000 ₽"></label>' +
        '<label>Условие<input name="bonusCondition" maxlength="120" placeholder="за каре"></label>' +
        '<button type="button" class="private-cash-modal__ghost private-cash-modal__bonus-add" data-private-cash-bonus-add>Добавить бонус</button>' +
      '</div>' +
      '<textarea name="bonusText" class="private-cash-modal__bonus-storage" maxlength="900" rows="4" aria-label="Список бонусов"></textarea>' +
      '<div class="private-cash-modal__bonus-display private-cash-modal__bonus-preview" data-private-cash-bonus-preview aria-live="polite">' +
        '<p class="private-cash-modal__bonus-preview-empty">Добавьте бонусы, и они появятся здесь плитками.</p>' +
      '</div>' +
    '</div>';
  }

  function renderGameTypeOptions(selected) {
    var current = String(selected || "");
    var options = ["Холдем", "Холдем 3-1 флоп", "Холдем 3-1 терн", "Омаха5", "Омаха6"];
    return '<option value="">Выберите вид игры</option>' +
      options.map(function (value) {
        return '<option value="' + escapeHtml(value) + '"' + (value === current ? " selected" : "") + '>' + escapeHtml(value) + '</option>';
      }).join("");
  }

  function renderAccessLevelOptions(selected) {
    var current = Math.max(0, Math.floor(Number(selected) || 0));
    var html = '<option value="0"' + (current === 0 ? " selected" : "") + '>Все игроки</option>';
    for (var i = 1; i <= 6; i += 1) {
      html += '<option value="' + i + '"' + (current === i ? " selected" : "") + '>Уровень ' + i + '+</option>';
    }
    return html;
  }

  function renderEventBonuses(raw) {
    var rows = bonusLines(raw);
    var fallback = !rows.length;
    if (fallback) rows = [DEFAULT_CASH_BONUS_TEXT];
    return '<div class="private-cash-modal__bonus-display private-cash-modal__bonus-display--event' + (fallback ? ' private-cash-modal__bonus-display--single' : '') + '" aria-label="Актуальные бонусы">' +
      rows.map(function (row) {
        return renderBonusCard(row);
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
    modal.addEventListener("input", onModalInput);
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

  function updateHomeButton(data) {
    var button = document.getElementById("privateCashSignupOpen");
    if (!button || !data || !data.ok) return;
    var active = !!(data.activeEvent && data.activeEvent.status === "active");
    button.classList.toggle("home-club-choice-plaque--cash-open", active);
    button.setAttribute("aria-label", active ? "Открыта запись на приватный кеш" : "Открыть приватный кеш");
  }

  function refreshHomeButtonStatus() {
    fetchState()
      .then(function (data) {
        updateHomeButton(data);
      })
      .catch(function () {});
  }

  function loadState() {
    if (loading) return;
    loading = true;
    fetchState()
      .then(function (data) {
        if (!data || !data.ok) throw new Error((data && data.error) || "Ошибка загрузки");
        state = data;
        updateHomeButton(data);
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
        updateHomeButton(state);
        render();
        setStatus("");
        return state;
      })
      .catch(function (error) {
        setStatus("");
        showAlert(error.message || "Ошибка");
      });
  }

  function fetchManualSuggestions(query) {
    return fetch(baseUrl() + API_PATH + apiAuthQuery("?") + "&suggest=1&query=" + encodeURIComponent(query || "") + "&_t=" + Date.now(), { cache: "no-store" })
      .then(function (res) { return res.json(); });
  }

  function renderManualSuggestions(form, rows, raw) {
    var box = form && form.querySelector("[data-private-cash-manual-suggestions]");
    if (!box) return;
    rows = Array.isArray(rows) ? rows.slice(0, 8) : [];
    raw = String(raw || "").trim();
    if (!rows.length && raw.length < 2) {
      box.hidden = true;
      box.innerHTML = "";
      return;
    }
    var manualRow = raw ? '<button type="button" class="private-cash-modal__manual-suggestion private-cash-modal__manual-suggestion--manual" data-private-cash-manual-pick="' + escapeHtml(raw) + '" data-private-cash-manual-label="' + escapeHtml(raw) + '">' +
      '<span>Добавить: ' + escapeHtml(raw) + '</span><small>без профиля</small></button>' : "";
    box.innerHTML =
      (rows.length ? '<div class="private-cash-modal__manual-suggestions-title">Похожие игроки</div>' : '') +
      rows.map(function (row) {
        var name = row && (row.name || row.pokerPlusNickname || row.displayName || row.telegram || row.accountId) || "Игрок";
        var meta = [];
        if (row && row.p21Id) meta.push("Poker21 " + row.p21Id);
        if (row && row.telegram) meta.push(row.telegram);
        if (row && row.accountId) meta.push(row.accountId);
        return '<button type="button" class="private-cash-modal__manual-suggestion" data-private-cash-manual-pick="' + escapeHtml(row.accountId || name) + '" data-private-cash-manual-label="' + escapeHtml(name) + '">' +
          '<span>' + escapeHtml(name) + '</span><small>' + escapeHtml(meta.join(" · ") || "профиль найден") + '</small></button>';
      }).join("") +
      manualRow;
    box.hidden = false;
  }

  function clearManualSuggestions(form) {
    var box = form && form.querySelector("[data-private-cash-manual-suggestions]");
    if (!box) return;
    box.hidden = true;
    box.innerHTML = "";
  }

  function onModalInput(event) {
    var input = event.target && event.target.closest ? event.target.closest("[data-private-cash-manual-query]") : null;
    if (!input) return;
    var form = input.closest("[data-private-cash-form='manual-add']");
    if (!form) return;
    if (form.elements.selectedQuery) form.elements.selectedQuery.value = "";
    var raw = String(input.value || "").trim();
    window.clearTimeout(manualSuggestTimer);
    if (raw.length < 2) {
      clearManualSuggestions(form);
      return;
    }
    manualSuggestTimer = window.setTimeout(function () {
      fetchManualSuggestions(raw).then(function (data) {
        if (!data || !data.ok) throw new Error((data && data.error) || "Ошибка поиска");
        if (String(input.value || "").trim() !== raw) return;
        renderManualSuggestions(form, data.suggestions || [], raw);
      }).catch(function () {
        renderManualSuggestions(form, [], raw);
      });
    }, 180);
  }

  function renderAdminForm() {
    if (!state || !state.isAdmin) return "";
    return '<form class="private-cash-modal__form" data-private-cash-form="create">' +
      '<div class="private-cash-modal__grid">' +
        '<label>Дата<input name="date" type="date" required></label>' +
        '<label>Время<input name="time" type="time" required></label>' +
      '</div>' +
      '<label>Вид игры<select name="gameType" required>' +
        renderGameTypeOptions("") +
      '</select></label>' +
      '<label>Ставки<input name="stakes" maxlength="80" placeholder="Например: 50/100 ₽" required></label>' +
      '<label>Вход<input name="buyIn" maxlength="80" placeholder="Например: 5 000 ₽" required></label>' +
      '<label>Пароль стола<input name="tablePassword" maxlength="40" value="7788" placeholder="Например: 7788"></label>' +
      '<label>Уровень доступа<select name="accessLevel">' +
        renderAccessLevelOptions(1) +
      '</select></label>' +
      '<label>Описание<textarea name="description" maxlength="500" rows="3" placeholder="Формат, место, условия"></textarea></label>' +
      renderBonusPicker() +
      '<label class="private-cash-modal__push-check"><input type="checkbox" name="sendPush"><span><strong>Отправить пуш</strong><small>Если галочка включена, всем уйдет уведомление об открытии записи.</small></span></label>' +
      '<button type="submit" class="private-cash-modal__primary private-cash-modal__primary--gold">Создать запись</button>' +
    '</form>';
  }

  function renderAdminEditForm(event) {
    if (!state || !state.isAdmin || !event || !event.id) return "";
    if (String(editingEventId || "") !== String(event.id || "")) return "";
    return '<form class="private-cash-modal__form private-cash-modal__form--edit-event" data-private-cash-form="update">' +
      '<input type="hidden" name="eventId" value="' + escapeHtml(event.id) + '">' +
      '<div class="private-cash-modal__form-head">' +
        '<strong>Редактировать параметры</strong>' +
        '<span>Изменения сразу обновят карточку записи.</span>' +
      '</div>' +
      '<div class="private-cash-modal__grid">' +
        '<label>Дата<input name="date" type="date" value="' + escapeHtml(event.date) + '" required></label>' +
        '<label>Время<input name="time" type="time" value="' + escapeHtml(event.time) + '" required></label>' +
      '</div>' +
      '<div class="private-cash-modal__grid private-cash-modal__grid--even">' +
        '<label>Статус<select name="status">' +
          '<option value="active"' + (event.status === "active" ? " selected" : "") + '>Открыта запись</option>' +
          '<option value="closed"' + (event.status === "closed" ? " selected" : "") + '>Закрыто</option>' +
        '</select></label>' +
        '<label>Доступ<select name="accessLevel">' + renderAccessLevelOptions(event.accessLevel) + '</select></label>' +
      '</div>' +
      '<label>Вид игры<select name="gameType" required>' + renderGameTypeOptions(event.gameType) + '</select></label>' +
      '<div class="private-cash-modal__grid private-cash-modal__grid--even">' +
        '<label>Ставки<input name="stakes" maxlength="80" value="' + escapeHtml(event.stakes) + '" required></label>' +
        '<label>Вход<input name="buyIn" maxlength="80" value="' + escapeHtml(event.buyIn) + '" required></label>' +
      '</div>' +
      '<label>Пароль стола<input name="tablePassword" maxlength="40" value="' + escapeHtml(eventTablePassword(event)) + '" placeholder="Например: 7788"></label>' +
      '<label>Описание<textarea name="description" maxlength="500" rows="2" placeholder="Формат, место, условия">' + escapeHtml(event.description || "") + '</textarea></label>' +
      '<label>Бонусы<textarea name="combinations" maxlength="900" rows="3" placeholder="5000 ₽ | за роял">' + escapeHtml(event.combinations || "") + '</textarea></label>' +
      '<div class="private-cash-modal__form-actions">' +
        '<button type="submit" class="private-cash-modal__primary">Сохранить изменения</button>' +
        '<button type="button" class="private-cash-modal__ghost" data-private-cash-edit-cancel>Отмена</button>' +
      '</div>' +
    '</form>';
  }

  function renderShareActions() {
    var subscribed = !!(state && state.privateCashSubscribed);
    return '<section class="private-cash-modal__share-actions" aria-label="Ссылка и уведомления">' +
      '<button type="button" class="private-cash-modal__share-btn private-cash-modal__share-btn--invite" data-private-cash-share>Позвать друга</button>' +
      '<button type="button" class="private-cash-modal__share-btn private-cash-modal__share-btn--copy" data-private-cash-copy aria-label="Скопировать ссылку">Скопировать</button>' +
      '<button type="button" class="private-cash-modal__share-btn private-cash-modal__share-btn--subscribe' + (subscribed ? ' private-cash-modal__share-btn--active' : '') + '" data-private-cash-subscribe>' +
        (subscribed ? "Отписаться" : "Подписаться") +
      '</button>' +
    '</section>';
  }

  function renderRules() {
    return '<section class="private-cash-modal__rules" aria-label="Условия записи">' +
      '<div class="private-cash-modal__rule">' +
        '<span class="private-cash-modal__rule-icon private-cash-modal__rule-icon--money" aria-hidden="true"></span>' +
        '<p>Админ примет вашу заявку только если у вас есть 5 000 ₽ на счете на вход.</p>' +
      '</div>' +
      '<div class="private-cash-modal__rule">' +
        '<span class="private-cash-modal__rule-icon private-cash-modal__rule-icon--card" aria-hidden="true"></span>' +
        '<p>Если вы записались и не пришли, вы получаете желтую карточку.</p>' +
      '</div>' +
      '<div class="private-cash-modal__rule">' +
        '<span class="private-cash-modal__rule-icon private-cash-modal__rule-icon--password" aria-hidden="true"></span>' +
        '<p>Пароль от кеша будет отправлен в день игры всем, кто записался.</p>' +
      '</div>' +
    '</section>';
  }

  var SEAT_POSITIONS = [
    { x: 26, y: 33 },
    { x: 74, y: 33 },
    { x: 12, y: 67 },
    { x: 88, y: 69 },
    { x: 26, y: 86 },
    { x: 75, y: 86 },
  ];

  var SEAT_MONKEYS = [
    "./assets/private-cash-seat-monkey-4.webp",
    "./assets/private-cash-seat-monkey-2.webp",
    "./assets/private-cash-seat-monkey-4.webp",
    "./assets/private-cash-seat-monkey-5.webp",
    "./assets/private-cash-seat-monkey-1.webp",
    "./assets/private-cash-seat-monkey-7.webp",
  ];

  function seatPoker21Nickname(row) {
    var p = row && typeof row === "object" ? row : {};
    return String(
      p.pokerPlusNickname ||
      p.poker21Nickname ||
      p.poker21Nick ||
      p.pokerNickname ||
      p.nickname ||
      p.nick ||
      ""
    ).trim();
  }

  function seatName(row) {
    var poker21Name = seatPoker21Nickname(row);
    var name = row && (poker21Name || row.displayName || row.telegramUsername) ? String(poker21Name || row.displayName || row.telegramUsername).trim() : "";
    return name.replace(/^@+/, "") || "Игрок";
  }

  function adminParticipantName(row) {
    var poker21Name = seatPoker21Nickname(row);
    var telegramName = row && row.telegramUsername ? String(row.telegramUsername).replace(/^@+/, "").trim() : "";
    var displayName = row && row.displayName ? String(row.displayName).trim() : "";
    return (poker21Name || telegramName || displayName).replace(/^@+/, "") || "Игрок";
  }

  function seatSpecialtyLabel(row) {
    var raw = String(row && (row.profileSpecialty || row.specialty || row.pokerSpecialty) || "").trim().toLowerCase();
    if (raw === "cash" || raw === "кеш" || raw === "кэш") return "Кеш";
    if (raw === "mtt" || raw === "мтт") return "МТТ";
    return "";
  }

  function seatAgeLabel(row) {
    var age = Math.floor(Number(row && (row.profileAge || row.age)) || 0);
    if (age <= 0 || age > 120) return "";
    var mod10 = age % 10;
    var mod100 = age % 100;
    var word = mod10 === 1 && mod100 !== 11 ? "год" : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14) ? "года" : "лет";
    return age + " " + word;
  }

  function seatMetaText(row) {
    if (row && row.manual) return "Без профиля";
    var level = Math.max(0, Math.floor(Number(row && row.level) || 0));
    var parts = ["Уровень " + level];
    var age = seatAgeLabel(row);
    var specialty = seatSpecialtyLabel(row);
    if (age) parts.push(age);
    if (specialty) parts.push(specialty);
    return parts.join(" · ");
  }

  function visibleSeatRows(event) {
    var rows = (event && (event.seatedParticipants || event.participants)) || [];
    return rows.filter(function (row) {
      return row && row.status !== "rejected";
    });
  }

  function visibleSeatIndex(event, accountId) {
    accountId = String(accountId || "").trim();
    if (!accountId) return -1;
    return visibleSeatRows(event).findIndex(function (row) {
      return String(row && row.accountId || "").trim() === accountId;
    });
  }

  function rowSeatGroup(event, row) {
    if (row && row.seatGroup) return row.seatGroup;
    var seatIndex = Number.parseInt(row && row.seatIndex, 10);
    if (Number.isFinite(seatIndex)) return seatIndex >= SEAT_POSITIONS.length ? "reserve" : "inGame";
    var index = visibleSeatIndex(event, row && row.accountId);
    return index >= SEAT_POSITIONS.length ? "reserve" : "inGame";
  }

  function hasReserveOnlyJoin(event) {
    return privateCashSeatsLeft(event) <= 0;
  }

  function privateCashSeatsLeft(event) {
    var taken = visibleSeatRows(event).filter(function (row) {
      return rowSeatGroup(event, row) !== "reserve";
    }).length;
    return Math.max(0, SEAT_POSITIONS.length - taken);
  }

  function renderPrivateCashSeats(event) {
    var rows = visibleSeatRows(event);
    if (!rows.length) return "";
    var seated = rows
      .map(function (row, fallbackIndex) {
        var seatIndex = Number.parseInt(row && row.seatIndex, 10);
        if (!Number.isFinite(seatIndex)) seatIndex = fallbackIndex;
        return { row: row, seatIndex: seatIndex };
      })
      .filter(function (item) {
        return item.seatIndex >= 0 && item.seatIndex < SEAT_POSITIONS.length;
      })
      .sort(function (a, b) {
        return a.seatIndex - b.seatIndex;
      });
    return '<div class="private-cash-modal__table-seats" aria-label="Занятые места">' +
      seated.map(function (item) {
        var row = item.row;
        var index = item.seatIndex;
        var pos = SEAT_POSITIONS[index];
        var status = row.status === "approved" ? "approved" : "pending";
        var monkey = SEAT_MONKEYS[index % SEAT_MONKEYS.length];
        return '<button type="button" class="private-cash-modal__table-seat private-cash-modal__table-seat--' + escapeHtml(status) + '" style="--seat-x:' + pos.x + '%;--seat-y:' + pos.y + '%;" data-seat-index="' + index + '" data-private-cash-profile="' + escapeHtml(row.manual ? "" : row.accountId || "") + '" data-private-cash-profile-name="' + escapeHtml(seatName(row)) + '">' +
          '<span class="private-cash-modal__table-seat-label">' +
            '<span class="private-cash-modal__table-seat-name">' + escapeHtml(seatName(row)) + '</span>' +
            '<small>' + escapeHtml(statusLabel(status)) + '</small>' +
          '</span>' +
          '<span class="private-cash-modal__table-seat-monkey" aria-hidden="true">' +
            '<img src="' + escapeHtml(monkey) + '?v=3.672" alt="" loading="lazy" decoding="async">' +
          '</span>' +
        '</button>';
      }).join("") +
    '</div>';
  }

  function houseSeat(event) {
    return event && event.houseParticipant && event.status === "active" ? event.houseParticipant : null;
  }

  function renderPrivateCashHouseSeat(event) {
    var row = houseSeat(event);
    if (!row) return "";
    return '<button type="button" class="private-cash-modal__table-house-seat" data-private-cash-profile="' + escapeHtml(row.accountId || "") + '" data-private-cash-profile-name="' + escapeHtml(seatName(row)) + '" aria-label="Открыть профиль ' + escapeHtml(seatName(row)) + '">' +
      '<span class="private-cash-modal__table-house-seat-name">' + escapeHtml(seatName(row)) + '</span>' +
      '<small>Подтвержден</small>' +
    '</button>';
  }

  function renderPrivateCashEmptySeatRings(event) {
    var occupiedCount = Math.min(visibleSeatRows(event).length, SEAT_POSITIONS.length);
    if (occupiedCount >= SEAT_POSITIONS.length) return "";
    return '<div class="private-cash-modal__table-empty-seats" aria-hidden="true">' +
      SEAT_POSITIONS.map(function (pos, index) {
        if (index < occupiedCount) return "";
        return '<span class="private-cash-modal__table-empty-seat" style="--seat-x:' + pos.x + '%;--seat-y:' + pos.y + '%;" data-seat-index="' + index + '"></span>';
      }).join("") +
    '</div>';
  }

  function renderCashSeatListItem(row) {
    var status = row && row.status === "approved" ? "approved" : "pending";
    var label = status === "approved" ? "Подтвержден" : "Ожидает подтверждения";
    return '<li><button type="button" class="private-cash-modal__seat-list-btn private-cash-modal__seat-list-btn--' + escapeHtml(status) + '" data-private-cash-profile="' + escapeHtml(row.manual ? "" : row.accountId || "") + '" data-private-cash-profile-name="' + escapeHtml(seatName(row)) + '">' +
      '<strong>' + escapeHtml(seatName(row)) + '</strong>' +
      '<span>' + escapeHtml(seatMetaText(row)) + '</span>' +
      '<em>' + escapeHtml(label) + '</em>' +
    '</button></li>';
  }

  function renderCashSeatLists(event) {
    var rows = visibleSeatRows(event).filter(function (row) {
      return row && row.status !== "rejected";
    });
    var house = houseSeat(event);
    if (house) rows.unshift(house);
    if (!rows.length) return "";
    var inGame = rows.filter(function (row) {
      return rowSeatGroup(event, row) !== "reserve";
    });
    var reserve = rows.filter(function (row) {
      return rowSeatGroup(event, row) === "reserve";
    });
    if (!inGame.length && !reserve.length) return "";
    return '<section class="private-cash-modal__seat-lists" aria-label="Игроки в приватном кеше">' +
      '<div class="private-cash-modal__seat-list private-cash-modal__seat-list--game">' +
        '<h3>В игре:</h3>' +
        (inGame.length ? '<ul>' + inGame.map(renderCashSeatListItem).join("") + '</ul>' : '<p>Пока нет игроков.</p>') +
      '</div>' +
      '<div class="private-cash-modal__seat-list private-cash-modal__seat-list--reserve">' +
        '<h3>В резерве:</h3>' +
        (reserve.length ? '<ul>' + reserve.map(renderCashSeatListItem).join("") + '</ul>' : '<p>Пока пусто.</p>') +
      '</div>' +
    '</section>';
  }

  function renderPrivateCashHero(event) {
    return '<figure class="private-cash-modal__table-hero">' +
      '<img src="./assets/private-cash-table-hero-clean.webp?v=3.714" alt="Приватный кеш Two Aces Poker Club" loading="lazy" decoding="async">' +
      renderPrivateCashHouseSeat(event) +
      renderPrivateCashSeats(event) +
    '</figure>';
  }

  function renderSeatsLeft(event) {
    if (!event || event.status !== "active") return "";
    var left = privateCashSeatsLeft(event);
    return '<div class="private-cash-modal__seats-left">' +
      '<span>Свободных мест</span><strong>' + escapeHtml(left) + '</strong>' +
    '</div>';
  }

  function renderParticipant(event, my) {
    if (state && state.isAdmin) return "";
    if (event && event.bookingBlock) {
      return '<div class="private-cash-modal__my-status private-cash-modal__my-status--blocked">' +
        '<span>Бронь недоступна</span><strong>2 желтые карточки</strong>' +
        '<small>Вы пропускаете эту и следующую игру.</small>' +
      '</div>';
    }
    if (my && my.status) {
      var extra = "";
      var myReserve = visibleSeatIndex(event, my.accountId) >= SEAT_POSITIONS.length;
      if (my.status === "pending") extra = '<small>' + (myReserve ? "Вы записаны в резерв, админ еще не подтвердил бронь." : "Место занято за вами, админ еще не подтвердил бронь.") + '</small>';
      if (my.status === "approved") extra = '<small>' + (myReserve ? "Вы зарегистрированы в резерв приватного кеша." : "Вы зарегистрированы в приватный кеш.") + '</small>';
      if (my.status === "rejected") {
        extra = '<small>' + (my.warningCount >= 2
          ? "Вторая желтая карточка: вы пропускаете эту и следующую игру."
          : "Первая желтая карточка. После второй бронь будет заблокирована на две игры.") + '</small>';
      }
      return '<div class="private-cash-modal__my-status private-cash-modal__my-status--' + escapeHtml(my.status) + '">' +
        '<span>Ваша заявка</span><strong>' + escapeHtml(statusLabel(my.status)) + '</strong>' +
        extra +
        (my.status === "pending" ? '<button type="button" class="private-cash-modal__cancel-request" data-private-cash-cancel="' + escapeHtml(event.id) + '">Отменить заявку</button>' : '') +
      '</div>';
    }
    if (event.status !== "active") return '<div class="private-cash-modal__notice">Запись закрыта.</div>';
    return '<div class="private-cash-modal__join-dock">' +
      '<button type="button" class="private-cash-modal__primary private-cash-modal__primary--wide" data-private-cash-join="' + escapeHtml(event.id) + '">' + (hasReserveOnlyJoin(event) ? "Записаться в резерв" : "Записаться") + '</button>' +
    '</div>';
  }

  function renderParticipants(event) {
    if (!state || !state.isAdmin) return "";
    var rows = event.participants || [];
    return '<div class="private-cash-modal__participants">' +
      '<h3>Заявки</h3>' +
      '<form class="private-cash-modal__manual-add" data-private-cash-form="manual-add">' +
        '<div class="private-cash-modal__manual-search">' +
          '<input name="query" type="text" maxlength="120" placeholder="ID, @telegram, Poker21 ID или ник" autocomplete="off" data-private-cash-manual-query>' +
          '<input name="selectedQuery" type="hidden" value="">' +
          '<div class="private-cash-modal__manual-suggestions" data-private-cash-manual-suggestions hidden></div>' +
        '</div>' +
        '<input name="eventId" type="hidden" value="' + escapeHtml(event.id) + '">' +
        '<button type="submit" class="private-cash-modal__ghost">Добавить</button>' +
      '</form>' +
      (rows.length ? rows.map(function (row) {
        var approved = row.status === "approved";
        var rejected = row.status === "rejected";
        return '<article class="private-cash-modal__participant">' +
          '<div><strong>' + escapeHtml(adminParticipantName(row)) + '</strong>' +
            '<span>' + escapeHtml(row.manual ? "без профиля" : row.telegramUsername ? "@" + row.telegramUsername : row.accountId) + '</span>' +
            (row.warningCount ? '<small>Желтые карточки: ' + escapeHtml(row.warningCount) + '</small>' : '') + '</div>' +
          '<div class="private-cash-modal__participant-actions">' +
            '<em class="private-cash-modal__badge private-cash-modal__badge--' + escapeHtml(row.status) + '">' + escapeHtml(statusLabel(row.status)) + '</em>' +
            (approved || rejected ? "" : '<button type="button" class="private-cash-modal__ghost" data-private-cash-approve="' + escapeHtml(row.accountId) + '" data-private-cash-event="' + escapeHtml(event.id) + '">Одобрить</button>') +
            (approved || rejected ? "" : '<button type="button" class="private-cash-modal__ghost private-cash-modal__ghost--danger" data-private-cash-reject="' + escapeHtml(row.accountId) + '" data-private-cash-event="' + escapeHtml(event.id) + '">Отклонить</button>') +
            (approved && !row.warningIssuedAt ? '<button type="button" class="private-cash-modal__ghost private-cash-modal__ghost--warning" data-private-cash-warn="' + escapeHtml(row.accountId) + '" data-private-cash-event="' + escapeHtml(event.id) + '">Выдать желтую карточку</button>' : '') +
            (approved ? '<button type="button" class="private-cash-modal__ghost private-cash-modal__ghost--danger" data-private-cash-remove="' + escapeHtml(row.accountId) + '" data-private-cash-event="' + escapeHtml(event.id) + '">Удалить</button>' : '') +
          '</div>' +
        '</article>';
      }).join("") : '<div class="private-cash-modal__empty private-cash-modal__empty--compact">Заявок пока нет.</div>') +
    '</div>';
  }

  function renderEvent(event) {
    var my = event.myParticipant || null;
    var accessLevel = Math.max(0, Math.floor(Number(event && event.accessLevel) || 0));
    var countdownMs = privateCashEventDateMs(event);
    var tablePassword = eventTablePassword(event);
    var adminEditButton = state && state.isAdmin
      ? '<button type="button" class="private-cash-modal__summary-edit" data-private-cash-edit="' + escapeHtml(event.id) + '" aria-expanded="' + (String(editingEventId || "") === String(event.id || "") ? "true" : "false") + '">Редактировать</button>'
      : "";
    return '<article class="private-cash-modal__event">' +
      '<section class="private-cash-modal__summary" aria-label="Детали игры">' +
        '<div class="private-cash-modal__event-head private-cash-modal__summary-head">' +
          '<div><span>Дата и время</span><strong>' + escapeHtml(formatDate(event.date)) + ' · ' + escapeHtml(event.time) + '</strong></div>' +
          '<div class="private-cash-modal__summary-actions">' +
            '<span class="private-cash-modal__summary-status-stack">' +
              '<em>' + escapeHtml(event.status === "active" ? "Открыта запись" : "Закрыто") + '</em>' +
              (countdownMs ? '<span class="private-cash-modal__summary-countdown" data-private-cash-countdown="' + escapeHtml(countdownMs) + '">' + escapeHtml(formatPrivateCashCountdown(countdownMs - Date.now())) + '</span>' : '') +
              '<span class="private-cash-modal__summary-password"><span>Пароль стола</span><strong>' + escapeHtml(tablePassword) + '</strong></span>' +
            '</span>' +
            adminEditButton +
          '</div>' +
        '</div>' +
        '<div class="private-cash-modal__summary-grid">' +
          '<div class="private-cash-modal__meta">' +
            '<span>Ставки</span><strong>' + escapeHtml(event.stakes) + '</strong>' +
          '</div>' +
          (event.gameType ? '<div class="private-cash-modal__meta private-cash-modal__meta--game"><span>Вид игры</span><strong>' + escapeHtml(event.gameType) + '</strong></div>' : '') +
          (event.buyIn ? '<div class="private-cash-modal__meta private-cash-modal__meta--game"><span>Вход</span><strong>' + escapeHtml(event.buyIn) + '</strong></div>' : '') +
          '<div class="private-cash-modal__meta private-cash-modal__meta--access"><span>Доступ</span><strong>' + escapeHtml(accessLevel > 0 ? "Ур. " + accessLevel + "+" : "Все") + '</strong></div>' +
        '</div>' +
      '</section>' +
      renderAdminEditForm(event) +
      (event.description ? '<p class="private-cash-modal__text">' + escapeHtml(event.description) + '</p>' : '') +
      renderPrivateCashHero(event) +
      renderSeatsLeft(event) +
      renderEventBonuses(event.combinations) +
      renderCashSeatLists(event) +
      renderRules() +
      renderShareActions() +
      renderParticipant(event, my) +
      renderParticipants(event) +
    '</article>';
  }

  function renderTabs() {
    var isAdmin = !!(state && state.isAdmin);
    var createTabHtml = state && state.isAdmin
      ? '<button type="button" class="private-cash-modal__tab' + (activeTab === "create" ? " private-cash-modal__tab--active" : "") + '" data-private-cash-tab="create" role="tab" aria-selected="' + (activeTab === "create" ? "true" : "false") + '">Создать</button>'
      : "";
    return '<div class="private-cash-modal__tabs private-cash-modal__tabs--' + (isAdmin ? "admin" : "user") + '" role="tablist" aria-label="Разделы приватного кеша">' +
      createTabHtml +
      '<button type="button" class="private-cash-modal__tab' + (activeTab === "signup" ? " private-cash-modal__tab--active" : "") + '" data-private-cash-tab="signup" role="tab" aria-selected="' + (activeTab === "signup" ? "true" : "false") + '">Запись</button>' +
      '<button type="button" class="private-cash-modal__tab' + (activeTab === "results" ? " private-cash-modal__tab--active" : "") + '" data-private-cash-tab="results" role="tab" aria-selected="' + (activeTab === "results" ? "true" : "false") + '">Кеш-рейтинг</button>' +
    '</div>';
  }

  function renderSignupTab(events) {
    return '<section class="private-cash-modal__events">' +
        (events.length ? events.map(renderEvent).join("") : renderPrivateCashHero(null) + '<div class="private-cash-modal__empty">Открытых записей пока нет.</div>' + renderRules()) +
      '</section>';
  }

  function renderResultsTab() {
    return '<section class="private-cash-modal__results">' +
      '<p>Здесь будут результаты приватных кеш-игр</p>' +
    '</section>';
  }

  function renderTabPanel(content) {
    return '<div class="private-cash-modal__tab-panel" role="tabpanel" data-private-cash-active-tab="' + escapeHtml(activeTab) + '">' +
      content +
    '</div>';
  }

  function render() {
    ensureModal();
    if (!state) {
      renderLoading();
      return;
    }
    if (activeTab === "create" && !state.isAdmin) activeTab = "signup";
    var events = state.events || [];
    var content = activeTab === "create" ? renderAdminForm() : activeTab === "results" ? renderResultsTab() : renderSignupTab(events);
    bodyEl.innerHTML =
      renderTabs() +
      renderTabPanel(content);
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
        tablePassword: form.elements.tablePassword ? form.elements.tablePassword.value : "7788",
        accessLevel: form.elements.accessLevel ? form.elements.accessLevel.value : "0",
        description: form.elements.description.value,
        combinations: form.elements.bonusText.value,
        sendPush: !!form.elements.sendPush.checked,
      }).then(function () {
        form.reset();
        Array.prototype.slice.call(form.querySelectorAll(".private-cash-modal__bonus-tile--active")).forEach(function (btn) {
          btn.classList.remove("private-cash-modal__bonus-tile--active");
        });
        updateBonusPreview(form);
      });
      return;
    }
    if (form.getAttribute("data-private-cash-form") === "update") {
      var updatedEventId = form.elements.eventId ? form.elements.eventId.value : "";
      postAction({
        action: "update",
        eventId: updatedEventId,
        date: form.elements.date.value,
        time: form.elements.time.value,
        status: form.elements.status ? form.elements.status.value : "active",
        gameType: form.elements.gameType.value,
        stakes: form.elements.stakes.value,
        buyIn: form.elements.buyIn.value,
        tablePassword: form.elements.tablePassword ? form.elements.tablePassword.value : "7788",
        accessLevel: form.elements.accessLevel ? form.elements.accessLevel.value : "0",
        description: form.elements.description ? form.elements.description.value : "",
        combinations: form.elements.combinations ? form.elements.combinations.value : "",
      }).then(function (nextState) {
        if (nextState) {
          editingEventId = "";
          render();
        }
      });
      return;
    }
    if (form.getAttribute("data-private-cash-form") === "manual-add") {
      postAction({
        action: "manualAdd",
        eventId: form.elements.eventId ? form.elements.eventId.value : "",
        query: form.elements.selectedQuery && form.elements.selectedQuery.value ? form.elements.selectedQuery.value : form.elements.query ? form.elements.query.value : "",
      }).then(function () {
        if (form.elements.query) form.elements.query.value = "";
        if (form.elements.selectedQuery) form.elements.selectedQuery.value = "";
        clearManualSuggestions(form);
      });
    }
  }

  function onModalClick(event) {
    var close = event.target && event.target.closest ? event.target.closest("[data-private-cash-close]") : null;
    if (close) {
      closeModal();
      return;
    }
    var tab = event.target && event.target.closest ? event.target.closest("[data-private-cash-tab]") : null;
    if (tab) {
      var nextTab = tab.getAttribute("data-private-cash-tab");
      activeTab = nextTab === "create" && state && state.isAdmin ? "create" : nextTab === "results" ? "results" : "signup";
      editingEventId = "";
      render();
      return;
    }
    var edit = event.target && event.target.closest ? event.target.closest("[data-private-cash-edit]") : null;
    if (edit) {
      var eventId = edit.getAttribute("data-private-cash-edit") || "";
      editingEventId = String(editingEventId || "") === String(eventId || "") ? "" : eventId;
      render();
      return;
    }
    var editCancel = event.target && event.target.closest ? event.target.closest("[data-private-cash-edit-cancel]") : null;
    if (editCancel) {
      editingEventId = "";
      render();
      return;
    }
    var manualPick = event.target && event.target.closest ? event.target.closest("[data-private-cash-manual-pick]") : null;
    if (manualPick) {
      var manualForm = manualPick.closest("[data-private-cash-form='manual-add']");
      if (manualForm) {
        if (manualForm.elements.query) manualForm.elements.query.value = manualPick.getAttribute("data-private-cash-manual-label") || "";
        if (manualForm.elements.selectedQuery) manualForm.elements.selectedQuery.value = manualPick.getAttribute("data-private-cash-manual-pick") || "";
        clearManualSuggestions(manualForm);
      }
      return;
    }
    var bonus = event.target && event.target.closest ? event.target.closest("[data-private-cash-bonus]") : null;
    if (bonus) {
      var form = bonus.closest("[data-private-cash-form]");
      var amount = bonus.getAttribute("data-private-cash-bonus-amount") || "";
      var condition = bonus.getAttribute("data-private-cash-bonus-condition") || "";
      Array.prototype.slice.call(form ? form.querySelectorAll(".private-cash-modal__bonus-tile") : []).forEach(function (btn) {
        btn.classList.toggle("private-cash-modal__bonus-tile--active", btn === bonus);
      });
      if (form && form.elements) {
        if (form.elements.bonusAmount) form.elements.bonusAmount.value = amount;
        if (form.elements.bonusCondition) form.elements.bonusCondition.value = condition;
        if (form.elements.bonusCondition) form.elements.bonusCondition.focus();
      }
      return;
    }
    var addBonus = event.target && event.target.closest ? event.target.closest("[data-private-cash-bonus-add]") : null;
    if (addBonus) {
      addBonusFromForm(addBonus.closest("[data-private-cash-form]"));
      return;
    }
    var removeBonus = event.target && event.target.closest ? event.target.closest("[data-private-cash-bonus-remove]") : null;
    if (removeBonus) {
      var removeForm = removeBonus.closest("[data-private-cash-form]");
      var item = removeBonus.closest("[data-private-cash-bonus-index]");
      var index = item ? Number(item.getAttribute("data-private-cash-bonus-index")) : -1;
      if (removeForm && removeForm.elements && removeForm.elements.bonusText && index >= 0) {
        var rows = bonusLines(removeForm.elements.bonusText.value);
        rows.splice(index, 1);
        removeForm.elements.bonusText.value = rows.join("\n");
        updateBonusPreview(removeForm);
      }
      return;
    }
    var join = event.target && event.target.closest ? event.target.closest("[data-private-cash-join]") : null;
    if (join) {
      postAction({ action: "join", eventId: join.getAttribute("data-private-cash-join") || "" });
      return;
    }
    var share = event.target && event.target.closest ? event.target.closest("[data-private-cash-share]") : null;
    if (share) {
      sharePrivateCash();
      return;
    }
    var copy = event.target && event.target.closest ? event.target.closest("[data-private-cash-copy]") : null;
    if (copy) {
      copyPrivateCashLink();
      return;
    }
    var subscribe = event.target && event.target.closest ? event.target.closest("[data-private-cash-subscribe]") : null;
    if (subscribe) {
      var next = !(state && state.privateCashSubscribed);
      postAction({ action: "subscribe", subscribe: next }).then(function (nextState) {
        if (nextState) showAlert(next ? "Подписка на приватный кеш включена." : "Подписка отключена.");
      });
      return;
    }
    var cancel = event.target && event.target.closest ? event.target.closest("[data-private-cash-cancel]") : null;
    if (cancel) {
      postAction({ action: "cancel", eventId: cancel.getAttribute("data-private-cash-cancel") || "" });
      return;
    }
    var profile = event.target && event.target.closest ? event.target.closest("[data-private-cash-profile]") : null;
    if (profile) {
      var profileId = profile.getAttribute("data-private-cash-profile") || "";
      var profileName = profile.getAttribute("data-private-cash-profile-name") || "Игрок";
      if (!profileId) return;
      setProfileLoading(profile, true, profileName);
      if (typeof window.pokerOpenChatUserModalSafe === "function") {
        window.pokerOpenChatUserModalSafe(profileId, profileName).then(function (ok) {
          setProfileLoading(profile, false, profileName);
          if (!ok && typeof window.openChatUserModalById === "function") {
            setProfileLoading(profile, true, profileName);
            window.openChatUserModalById(profileId, profileName);
            clearProfileLoadingLater(profile, profileName);
          }
        }).catch(function () {
          setProfileLoading(profile, false, profileName);
          showAlert("Не удалось открыть профиль.");
        });
      } else if (typeof window.openChatUserModalById === "function") {
        window.openChatUserModalById(profileId, profileName);
        clearProfileLoadingLater(profile, profileName);
      } else {
        setProfileLoading(profile, false, profileName);
        showAlert("Профиль пока загружается. Попробуйте еще раз.");
      }
      return;
    }
    var approve = event.target && event.target.closest ? event.target.closest("[data-private-cash-approve]") : null;
    if (approve) {
      postAction({
        action: "approve",
        eventId: approve.getAttribute("data-private-cash-event") || "",
        accountId: approve.getAttribute("data-private-cash-approve") || "",
      });
      return;
    }
    var reject = event.target && event.target.closest ? event.target.closest("[data-private-cash-reject]") : null;
    if (reject) {
      postAction({
        action: "reject",
        eventId: reject.getAttribute("data-private-cash-event") || "",
        accountId: reject.getAttribute("data-private-cash-reject") || "",
      });
      return;
    }
    var warn = event.target && event.target.closest ? event.target.closest("[data-private-cash-warn]") : null;
    if (warn) {
      postAction({
        action: "warn",
        eventId: warn.getAttribute("data-private-cash-event") || "",
        accountId: warn.getAttribute("data-private-cash-warn") || "",
      });
      return;
    }
    var remove = event.target && event.target.closest ? event.target.closest("[data-private-cash-remove]") : null;
    if (remove) {
      postAction({
        action: "remove",
        eventId: remove.getAttribute("data-private-cash-event") || "",
        accountId: remove.getAttribute("data-private-cash-remove") || "",
      });
    }
  }

  function bind() {
    var button = document.getElementById("privateCashSignupOpen");
    if (!button) return;
    button.addEventListener("click", openModal);
    refreshHomeButtonStatus();
  }

  window.openPrivateCashModal = openModal;

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
  else bind();
})();
