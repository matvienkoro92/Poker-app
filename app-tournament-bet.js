(function initTournamentBet() {
  "use strict";

  var API_PATH = "/api/tournament-bet";
  var modal = null;
  var bodyEl = null;
  var statusEl = null;
  var state = null;
  var loading = false;
  var refreshTimer = 0;

  function baseUrl() {
    return typeof getApiBase === "function" ? getApiBase().replace(/\/$/, "") : "";
  }

  function authQuery(lead) {
    return typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery(lead) : lead + "initData=";
  }

  function authBody(extra) {
    return typeof pokerApiAuthJsonBody === "function" ? pokerApiAuthJsonBody(extra || {}) : extra || {};
  }

  function esc(value) {
    return String(value == null ? "" : value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function rub(value) {
    return Math.max(0, Math.floor(Number(value) || 0)).toLocaleString("ru-RU").replace(/\u00a0/g, " ") + " ₽";
  }

  function eveningTournaments() {
    if (typeof window.pokerGetEveningTournamentOptions !== "function") return [];
    var rows = window.pokerGetEveningTournamentOptions();
    return Array.isArray(rows) ? rows : [];
  }

  function tournamentBannerUrl(file) {
    var clean = String(file || "").trim();
    if (!clean) return "";
    if (typeof getHomeTournamentBannerUrl === "function") return getHomeTournamentBannerUrl(clean);
    return "./assets/" + encodeURIComponent(clean);
  }

  function tournamentBannerHtml(data, preview) {
    var file = String(data && (data.tournamentBanner || data.banner) || "").trim();
    var src = data && data.bannerUrl || tournamentBannerUrl(file);
    if (!src) return "";
    var name = String(data && (data.tournamentBannerAlt || data.bannerAlt || data.title || data.name) || "Турнир вечера");
    var width = Math.max(1, Number(data && (data.tournamentBannerWidth || data.bannerWidth)) || 640);
    var height = Math.max(1, Number(data && (data.tournamentBannerHeight || data.bannerHeight)) || 915);
    return '<figure class="tournament-bet-modal__tournament-banner' + (preview ? ' tournament-bet-modal__tournament-banner--preview' : '') + '">' +
      '<img src="' + esc(src) + '" alt="' + esc(name) + '" width="' + width + '" height="' + height + '" loading="eager" decoding="async"></figure>';
  }

  function showAlert(message) {
    var tg = window.Telegram && window.Telegram.WebApp;
    if (tg && typeof tg.showAlert === "function") tg.showAlert(String(message || "Ошибка"));
    else window.alert(String(message || "Ошибка"));
  }

  function setStatus(message, tone) {
    if (!statusEl) return;
    statusEl.textContent = String(message || "");
    statusEl.dataset.tone = tone || "";
  }

  function ensureModal() {
    if (modal) return modal;
    modal = document.createElement("div");
    modal.className = "club-choice-vote-modal tournament-bet-modal";
    modal.hidden = true;
    modal.innerHTML =
      '<div class="club-choice-vote-modal__backdrop" data-tournament-bet-close></div>' +
      '<section class="club-choice-vote-modal__panel tournament-bet-modal__panel" role="dialog" aria-modal="true" aria-labelledby="tournamentBetTitle">' +
        '<header class="club-choice-vote-modal__head tournament-bet-modal__head"><div>' +
          '<p class="club-choice-vote-modal__eyebrow">Турнир вечера</p>' +
          '<h2 class="club-choice-vote-modal__title" id="tournamentBetTitle">Ставка на себя</h2>' +
        '</div><button type="button" class="club-choice-vote-modal__close" data-tournament-bet-close aria-label="Закрыть">×</button></header>' +
        '<div class="club-choice-vote-modal__status" data-tournament-bet-status role="status" aria-live="polite"></div>' +
        '<div class="club-choice-vote-modal__body tournament-bet-modal__body" data-tournament-bet-body></div>' +
      '</section>';
    document.body.appendChild(modal);
    bodyEl = modal.querySelector("[data-tournament-bet-body]");
    statusEl = modal.querySelector("[data-tournament-bet-status]");
    modal.addEventListener("click", onClick);
    modal.addEventListener("submit", onSubmit);
    return modal;
  }

  function participantHtml(entry, index) {
    var avatar = entry.avatar
      ? '<img src="' + esc(entry.avatar) + '" alt="" loading="lazy" decoding="async">'
      : '<span>' + esc(String(entry.name || "И").slice(0, 1).toUpperCase()) + '</span>';
    return '<article class="sng-champions-modal__entry tournament-bet-modal__entry' + (entry.mine ? ' tournament-bet-modal__entry--mine' : '') + (entry.winner ? ' tournament-bet-modal__entry--winner' : '') + '">' +
      '<span class="tournament-bet-modal__place">' + (index + 1) + '</span>' +
      '<span class="sng-champions-modal__entry-avatar tournament-bet-modal__avatar">' + avatar + '</span>' +
      '<div class="sng-champions-modal__entry-main"><strong class="sng-champions-modal__entry-name">' + esc(entry.name || "Игрок") + '</strong>' +
        '<span class="sng-champions-modal__entry-status">' + (entry.winner ? "Победитель · забрал банк" : entry.mine ? "Ваша ставка принята" : "Сделал ставку на себя") + '</span></div>' +
    '</article>';
  }

  function adminHtml(data) {
    if (!data.isAdmin) return "";
    if (!data.id || data.status === "settled" || (data.status !== "open" && !(data.entries && data.entries.length))) {
      var tournaments = eveningTournaments();
      var first = tournaments[0] || null;
      return '<form class="tournament-bet-modal__admin" data-tournament-bet-create>' +
        '<h3>Создать событие</h3><label><span>Турнир вечера</span><select name="tournamentId" data-tournament-bet-tournament required>' +
          '<option value="">Выберите турнир</option>' + tournaments.map(function (item, index) {
            return '<option value="' + esc(item.id) + '"' + (index === 0 ? ' selected' : '') + '>' +
              esc(item.day + " · " + item.name + (item.buyin ? " · " + item.buyin : "")) + '</option>';
          }).join("") + '</select></label>' +
        '<div data-tournament-bet-banner-preview>' + tournamentBannerHtml(first, true) + '</div>' +
        '<label><span>Стартовый банк</span><input name="startingBank" type="number" min="1" step="1" placeholder="10000" required></label>' +
        '<label><span>Цена ставки</span><input name="stakePrice" type="number" min="1" step="1" placeholder="500" required></label>' +
        '<button type="submit">Создать и открыть ставки</button></form>';
    }
    var closeButton = data.status === "open" ? '<button type="button" data-tournament-bet-action="close">Закрыть приём ставок</button>' : "";
    var settle = data.entries && data.entries.length && data.status !== "settled"
      ? '<form data-tournament-bet-settle><label><span>Кто прошёл дальше всех</span><select name="winnerAccountId" required><option value="">Выберите победителя</option>' + data.entries.map(function (entry) {
          return '<option value="' + esc(entry.accountId) + '">' + esc(entry.name) + '</option>';
        }).join("") + '</select></label><button type="submit">Начислить победителю весь банк</button></form>' : "";
    return '<section class="tournament-bet-modal__admin"><h3>Управление событием</h3>' + closeButton + settle + '</section>';
  }

  function render() {
    ensureModal();
    var data = state || { active: false, entries: [] };
    if (!data.id) {
      bodyEl.innerHTML = '<section class="tournament-bet-modal__empty"><span aria-hidden="true">♠</span><strong>Ставки ещё не открыты</strong><p>Администратор создаст событие перед турниром.</p></section>' + adminHtml(data);
      updateHomeButton(data);
      return;
    }
    var joined = !!data.myEntry;
    var action = data.status === "open"
      ? joined
        ? '<button type="button" class="tournament-bet-modal__bet tournament-bet-modal__bet--done" disabled>✓ Ваша ставка принята</button>'
        : '<button type="button" class="tournament-bet-modal__bet" data-tournament-bet-action="bet">Сделать ставку на себя · ' + rub(data.stakePrice) + '</button>'
      : data.status === "settled"
        ? '<div class="tournament-bet-modal__closed">Событие завершено</div>'
        : '<div class="tournament-bet-modal__closed">Приём ставок закрыт</div>';
    var entries = Array.isArray(data.entries) ? data.entries : [];
    bodyEl.innerHTML =
      '<section class="tournament-bet-modal__hero tournament-bet-modal__hero--banner"><span class="tournament-bet-modal__suit" aria-hidden="true">♠</span>' + tournamentBannerHtml(data, false) + '</section>' +
      '<section class="tournament-bet-modal__offer">' +
        '<p>Турнир вечера</p><h3>' + esc(data.title || "Турнир вечера") + '</h3>' +
        '<h4>Сделай ставку на себя</h4>' +
        '<div class="tournament-bet-modal__bank"><span>Банк сейчас</span><strong>' + rub(data.bank) + '</strong></div>' +
        '<p class="tournament-bet-modal__lead">Пройди дальше всех в турнире и забери весь банк. Ставка спишется с баланса Poker21.</p>' + action +
      '</section>' +
      '<section class="tournament-bet-modal__participants"><header><h3>Участники</h3><span>' + entries.length + '</span></header>' +
        (entries.length ? entries.map(participantHtml).join("") : '<p class="tournament-bet-modal__participants-empty">Пока никто не сделал ставку. Будьте первым.</p>') +
      '</section>' + adminHtml(data);
    updateHomeButton(data);
  }

  function updateHomeButton(data) {
    var amount = document.querySelector("[data-tournament-bet-home-bank]");
    var button = document.querySelector("[data-tournament-bet-open]");
    if (amount) amount.textContent = data && data.id ? "Банк " + rub(data.bank) : "Скоро";
    if (button) button.classList.toggle("home-mini-icon-item--vote-active", !!(data && data.status === "open"));
  }

  function load(silent) {
    if (loading) return Promise.resolve(state);
    loading = true;
    if (!silent && bodyEl) bodyEl.innerHTML = '<div class="club-choice-vote-modal__loading">Идёт загрузка…</div>';
    return fetch(baseUrl() + API_PATH + authQuery("?"), { cache: "no-store" }).then(function (response) {
      return response.json().catch(function () { return {}; }).then(function (data) {
        if (!response.ok || !data.ok) throw new Error(data.error || "Не удалось загрузить событие");
        state = data;
        render();
        return data;
      });
    }).catch(function (error) {
      if (!silent) setStatus(error.message, "error");
      return null;
    }).finally(function () { loading = false; });
  }

  function post(payload, pendingText) {
    if (loading) return Promise.resolve(null);
    loading = true;
    setStatus(pendingText || "Сохраняю…", "loading");
    return fetch(baseUrl() + API_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authBody(payload)),
    }).then(function (response) {
      return response.json().catch(function () { return {}; }).then(function (data) {
        if (!response.ok || !data.ok) throw new Error(data.error || "Не удалось выполнить действие");
        state = data;
        setStatus("Готово", "success");
        render();
        return data;
      });
    }).catch(function (error) {
      setStatus(error.message, "error");
      showAlert(error.message);
      return null;
    }).finally(function () { loading = false; });
  }

  function open() {
    ensureModal();
    modal.hidden = false;
    document.body.classList.add("tournament-bet-modal-open");
    setStatus("");
    load(false);
    clearInterval(refreshTimer);
    refreshTimer = window.setInterval(function () { if (modal && !modal.hidden) load(true); }, 15000);
  }

  function close() {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove("tournament-bet-modal-open");
    clearInterval(refreshTimer);
  }

  function onClick(event) {
    if (event.target.closest("[data-tournament-bet-close]")) { close(); return; }
    var actionEl = event.target.closest("[data-tournament-bet-action]");
    if (!actionEl) return;
    var action = actionEl.getAttribute("data-tournament-bet-action");
    if (action === "bet") {
      if (!state || !window.confirm("Списать " + rub(state.stakePrice) + " с баланса Poker21 и сделать ставку на себя?")) return;
      post({ action: "bet" }, "Проверяю баланс и принимаю ставку…");
    } else if (action === "close" && window.confirm("Закрыть приём ставок?")) {
      post({ action: "close" }, "Закрываю приём ставок…");
    }
  }

  function onChange(event) {
    var select = event.target.closest("[data-tournament-bet-tournament]");
    if (!select) return;
    var form = select.closest("[data-tournament-bet-create]");
    var preview = form && form.querySelector("[data-tournament-bet-banner-preview]");
    var selected = eveningTournaments().find(function (item) { return String(item.id) === String(select.value); });
    if (preview) preview.innerHTML = tournamentBannerHtml(selected, true);
  }

  function onSubmit(event) {
    var create = event.target.closest("[data-tournament-bet-create]");
    if (create) {
      event.preventDefault();
      var selected = eveningTournaments().find(function (item) {
        return String(item.id) === String(create.elements.tournamentId.value);
      });
      if (!selected) { showAlert("Выберите турнир вечера"); return; }
      post({
        action: "create",
        tournamentId: selected.id,
        tournamentTitle: selected.name,
        tournamentBanner: selected.banner,
        tournamentBannerAlt: selected.bannerAlt,
        tournamentBannerWidth: selected.bannerWidth,
        tournamentBannerHeight: selected.bannerHeight,
        tournamentBuyin: selected.buyin,
        tournamentGuarantee: selected.guarantee,
        startingBank: create.elements.startingBank.value,
        stakePrice: create.elements.stakePrice.value,
      }, "Создаю событие…");
      return;
    }
    var settle = event.target.closest("[data-tournament-bet-settle]");
    if (settle) {
      event.preventDefault();
      var winnerId = settle.elements.winnerAccountId.value;
      if (!winnerId || !window.confirm("Начислить выбранному игроку весь банк " + rub(state && state.bank) + "?")) return;
      post({ action: "settle", winnerAccountId: winnerId }, "Начисляю банк победителю…");
    }
  }

  document.addEventListener("click", function (event) {
    var trigger = event.target && event.target.closest ? event.target.closest("[data-tournament-bet-open]") : null;
    if (!trigger) return;
    event.preventDefault();
    open();
  });
  document.addEventListener("change", onChange);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal && !modal.hidden) close();
  });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { load(true); }, { once: true });
  else load(true);
  window.openTournamentBetModal = open;
})();
