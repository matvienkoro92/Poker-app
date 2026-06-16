(function initClubReferralsMenu() {
  var invitedState = {
    loading: false,
    loaded: false,
    error: "",
    data: null,
  };

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function apiBase() {
    if (typeof getApiBase === "function") return String(getApiBase() || "").replace(/\/$/, "");
    try {
      var app = document.getElementById("app");
      var dataBase = app && app.getAttribute("data-api-base");
      if (dataBase && String(dataBase).trim()) return String(dataBase).trim().replace(/\/$/, "");
    } catch (eDataBase) {}
    try {
      return String(location.origin || "").replace(/\/$/, "");
    } catch (eLocation) {}
    return "";
  }

  function authQuery(lead) {
    if (typeof pokerApiAuthQuery === "function") return pokerApiAuthQuery(lead || "?");
    return (lead || "?") + "initData=";
  }

  function closeHeaderMoreMenu() {
    var menu = document.getElementById("headerMoreMenu");
    var toggle = document.getElementById("headerMoreMenuBtn");
    if (menu) menu.hidden = true;
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  function buildStartLink(startParam) {
    if (typeof pokerBuildPersonalInviteLink === "function") return pokerBuildPersonalInviteLink(startParam);
    if (typeof buildMiniAppStartLink === "function") return buildMiniAppStartLink(startParam);
    return "";
  }

  function buildRaffleLink() {
    if (typeof pokerBuildRaffleShareLink === "function") return pokerBuildRaffleShareLink("r_1");
    return buildStartLink("r_1");
  }

  function formatDate(value) {
    if (!value) return "";
    try {
      return new Date(value).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "2-digit" });
    } catch (eDate) {
      return "";
    }
  }

  function pluralPlayers(n) {
    var value = Math.abs(Number(n) || 0);
    var mod10 = value % 10;
    var mod100 = value % 100;
    if (mod10 === 1 && mod100 !== 11) return "приглашенный";
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "приглашенных";
    return "приглашенных";
  }

  function referralLinks() {
    return [
      { title: "Ссылка на розыгрыш", hint: "Открывает актуальный розыгрыш #1", link: buildRaffleLink() },
      { title: "Блок розыгрышей", hint: "Все активные розыгрыши", link: buildStartLink("raffles") },
      { title: "Раздача дня", hint: "Игра дня с личной ссылкой", link: buildStartLink("daily_poker") },
      { title: "Общий чат", hint: "Чат клуба", link: buildStartLink("club_chat") },
      { title: "Газета клуба", hint: "Новости и задачи клуба", link: buildStartLink("news") },
      { title: "Устав клуба", hint: "Правила клуба", link: buildStartLink("club_charter") },
      { title: "Рейтинг лета", hint: "Летний рейтинг", link: buildStartLink("summer_rating") },
      { title: "Рейтинг весны", hint: "Весенний рейтинг", link: buildStartLink("spring_rating") },
      { title: "Зал славы", hint: "Топ 2026", link: buildStartLink("hall_fame_top2026") },
      { title: "Видеоуроки", hint: "Раздел обучения", link: buildStartLink("video_lessons") },
      { title: "Научиться играть", hint: "Обучающий хаб", link: buildStartLink("learn_play_hub") },
      { title: "Расписание", hint: "Турниры и фрироллы", link: buildStartLink("schedule") },
      { title: "Стримы", hint: "Комнаты трансляций", link: buildStartLink("streams") },
      { title: "Привязать Poker21", hint: "Профиль Poker21", link: buildStartLink("profile") },
      { title: "Депозит", hint: "Касса клуба", link: buildStartLink("cashout") },
      { title: "Главная", hint: "Главный экран приложения", link: buildStartLink("home") },
    ].filter(function (item) {
      return item.link;
    });
  }

  function ensureModal() {
    var modal = document.getElementById("clubReferralsModal");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.className = "club-referrals-modal club-referrals-modal--hidden";
    modal.id = "clubReferralsModal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-label", "Приглашённые");
    modal.innerHTML =
      '<div class="club-referrals-modal__backdrop" data-referrals-close></div>' +
      '<section class="club-referrals-modal__panel">' +
        '<button type="button" class="club-referrals-modal__close" data-referrals-close aria-label="Закрыть">×</button>' +
        '<h2 class="club-referrals-modal__title">Приглашённые</h2>' +
        '<p class="club-referrals-modal__lead">Выберите любую ссылку ниже на любой раздел который будет интересен вашему другу</p>' +
        '<div class="club-referrals-modal__promo">Билет за 10 000 ₽ тому, кто пригласит больше всех до 15 июля</div>' +
        '<div class="club-referrals-modal__status" id="clubReferralsStatus" aria-live="polite"></div>' +
        '<div class="club-referrals-modal__tabs" role="tablist" aria-label="Пригласительные ссылки">' +
          '<button type="button" class="club-referrals-modal__tab club-referrals-modal__tab--active" data-referrals-tab="links" role="tab" aria-selected="true">Ссылки</button>' +
          '<button type="button" class="club-referrals-modal__tab" data-referrals-tab="invited" role="tab" aria-selected="false">Ваши приглашенные</button>' +
          '<button type="button" class="club-referrals-modal__tab" data-referrals-tab="ranking" role="tab" aria-selected="false">Рейтинг пригласивших</button>' +
        '</div>' +
        '<div class="club-referrals-modal__panel-tab" data-referrals-panel="links">' +
          '<div class="club-referrals-modal__rules">' +
            '<strong>Как засчитывается приглашение</strong>' +
            '<ul>' +
              '<li>Игрок должен открыть вашу ссылку и создать новый аккаунт.</li>' +
              '<li>Если игрок уже был зарегистрирован до перехода по ссылке, он не засчитывается.</li>' +
              '<li>Один и тот же DT-ID, Telegram ID или Poker21 ID не может засчитаться повторно.</li>' +
              '<li>Если игрок уже закреплён за другим пригласившим, привязка не перезаписывается.</li>' +
            '</ul>' +
          '</div>' +
          '<div class="club-referrals-modal__list" id="clubReferralsList"></div>' +
        '</div>' +
        '<div class="club-referrals-modal__panel-tab club-referrals-modal__panel-tab--hidden" data-referrals-panel="invited">' +
          '<div class="club-referrals-modal__invited" id="clubReferralsInvited"></div>' +
        '</div>' +
        '<div class="club-referrals-modal__panel-tab club-referrals-modal__panel-tab--hidden" data-referrals-panel="ranking">' +
          '<div class="club-referrals-modal__ranking" id="clubReferralsRanking"></div>' +
        '</div>' +
      '</section>';
    document.body.appendChild(modal);
    modal.addEventListener("click", function (e) {
      var close = e.target && e.target.closest ? e.target.closest("[data-referrals-close]") : null;
      if (close && modal.contains(close)) closeModal();
      var tab = e.target && e.target.closest ? e.target.closest("[data-referrals-tab]") : null;
      if (tab && modal.contains(tab)) {
        switchTab(tab.getAttribute("data-referrals-tab") || "links");
        return;
      }
      var copyBtn = e.target && e.target.closest ? e.target.closest("[data-referral-copy]") : null;
      if (copyBtn && modal.contains(copyBtn)) {
        var link = copyBtn.getAttribute("data-referral-copy") || "";
        copyReferralLink(link, copyBtn);
      }
    });
    return modal;
  }

  function switchTab(name) {
    var modal = document.getElementById("clubReferralsModal");
    if (!modal) return;
    var active = name === "invited" || name === "ranking" ? name : "links";
    Array.prototype.slice.call(modal.querySelectorAll("[data-referrals-tab]")).forEach(function (btn) {
      var on = (btn.getAttribute("data-referrals-tab") || "") === active;
      btn.classList.toggle("club-referrals-modal__tab--active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
    Array.prototype.slice.call(modal.querySelectorAll("[data-referrals-panel]")).forEach(function (panel) {
      var on = (panel.getAttribute("data-referrals-panel") || "") === active;
      panel.classList.toggle("club-referrals-modal__panel-tab--hidden", !on);
    });
    if (active === "invited" || active === "ranking") loadInvited();
  }

  function renderLinks() {
    var list = document.getElementById("clubReferralsList");
    var status = document.getElementById("clubReferralsStatus");
    if (!list) return;
    var refCode = typeof pokerGetMyReferralCode === "function" ? pokerGetMyReferralCode() : "";
    if (status) {
      status.textContent = refCode
        ? "Ваш код: " + refCode
        : "Войдите в аккаунт, чтобы ссылки стали личными.";
      status.classList.toggle("club-referrals-modal__status--warn", !refCode);
    }
    list.innerHTML = referralLinks().map(function (item) {
      return '<article class="club-referrals-modal__item">' +
        '<div class="club-referrals-modal__item-head">' +
          '<strong>' + esc(item.title) + '</strong>' +
          '<span>' + esc(item.hint) + '</span>' +
        '</div>' +
        '<div class="club-referrals-modal__copy-row">' +
          '<input class="club-referrals-modal__link" value="' + esc(item.link) + '" readonly aria-label="' + esc(item.title) + '">' +
          '<button type="button" class="club-referrals-modal__copy-btn" data-referral-copy="' + esc(item.link) + '">Скопировать</button>' +
        '</div>' +
      '</article>';
    }).join("");
  }

  function invitedEmptyHtml(text) {
    return '<div class="club-referrals-modal__empty">' + esc(text || "Пока нет приглашённых игроков.") + "</div>";
  }

  function renderInvited() {
    var root = document.getElementById("clubReferralsInvited");
    if (!root) return;
    if (invitedState.loading) {
      root.innerHTML = invitedEmptyHtml("Загружаю приглашённых...");
      return;
    }
    if (invitedState.error) {
      root.innerHTML = invitedEmptyHtml(invitedState.error);
      return;
    }
    var data = invitedState.data || {};
    var invited = Array.isArray(data.invited) ? data.invited : [];
    var totals = data.totals || {};
    if (!invited.length) {
      root.innerHTML = invitedEmptyHtml("Пока никто не зарегистрировался по вашим ссылкам.");
      return;
    }
    var summary =
      '<div class="club-referrals-modal__summary">' +
        '<span><strong>' + esc(totals.invited || invited.length) + '</strong> ' + esc(pluralPlayers(totals.invited || invited.length)) + '</span>' +
        '<span><strong>' + esc(totals.dailySpins || 0) + '</strong>круток</span>' +
        '<span><strong>' + esc(totals.rafflesParticipated || 0) + '</strong>участий</span>' +
        '<span><strong>' + esc(totals.rafflesWon || 0) + '</strong>побед</span>' +
      '</div>';
    var rows = invited.map(function (item) {
      var name = item.telegramLogin || item.name || item.accountId || "Игрок";
      var sub = [item.accountId, item.invitedAt ? "с " + formatDate(item.invitedAt) : "", item.inviteSource || ""].filter(Boolean).join(" · ");
      var linkedLabels = { telegram: "Telegram", email: "Email", poker21: "Poker21" };
      var linked = Array.isArray(item.linked) && item.linked.length
        ? item.linked.map(function (key) { return linkedLabels[key] || key; }).join(", ")
        : "нет";
      return '<article class="club-referrals-modal__invited-card">' +
        '<div class="club-referrals-modal__invited-head">' +
          '<strong>' + esc(name) + '</strong>' +
          '<span>ур. ' + esc(item.level || 0) + '</span>' +
        '</div>' +
        '<div class="club-referrals-modal__invited-sub">' + esc(sub) + '</div>' +
        '<div class="club-referrals-modal__metrics">' +
          '<span>Крутки: <strong>' + esc(item.dailyPoker && item.dailyPoker.spins || 0) + '</strong></span>' +
          '<span>Билеты: <strong>' + esc(item.dailyPoker && item.dailyPoker.ticketsWon || 0) + '</strong></span>' +
          '<span>Розыгрыши: <strong>' + esc(item.raffles && item.raffles.participated || 0) + '</strong></span>' +
          '<span>Победы: <strong>' + esc(item.raffles && item.raffles.won || 0) + '</strong></span>' +
        '</div>' +
        '<div class="club-referrals-modal__bindings">Привязки: ' + esc(linked) + '</div>' +
      '</article>';
    }).join("");
    root.innerHTML = summary + '<div class="club-referrals-modal__invited-list">' + rows + "</div>";
  }

  function renderRanking() {
    var root = document.getElementById("clubReferralsRanking");
    if (!root) return;
    if (invitedState.loading) {
      root.innerHTML = invitedEmptyHtml("Загружаю рейтинг...");
      return;
    }
    if (invitedState.error) {
      root.innerHTML = invitedEmptyHtml(invitedState.error);
      return;
    }
    var data = invitedState.data || {};
    var ranking = Array.isArray(data.ranking) ? data.ranking : [];
    if (!ranking.length) {
      root.innerHTML = invitedEmptyHtml("Пока нет игроков с приглашёнными.");
      return;
    }
    var rows = ranking.map(function (item) {
      var name = item.telegramLogin || item.name || item.accountId || "Игрок";
      var sub = [item.accountId, item.telegramLogin && item.name && item.telegramLogin !== item.name ? item.name : ""].filter(Boolean).join(" · ");
      return '<article class="club-referrals-modal__invited-card club-referrals-modal__ranking-card">' +
        '<div class="club-referrals-modal__invited-head">' +
          '<strong><span class="club-referrals-modal__rank">#' + esc(item.rank || "") + '</span>' + esc(name) + '</strong>' +
          '<span>' + esc(item.invitedCount || 0) + ' чел.</span>' +
        '</div>' +
        '<div class="club-referrals-modal__invited-sub">' + esc(sub) + '</div>' +
        '<div class="club-referrals-modal__metrics club-referrals-modal__metrics--ranking">' +
          '<span>Приглашено <strong>' + esc(item.invitedCount || 0) + '</strong></span>' +
          '<span>Сумма уровней <strong>' + esc(item.totalPoker21Level || 0) + '</strong></span>' +
          '<span>Poker21 привязали <strong>' + esc(item.poker21LinkedInvited || 0) + '</strong></span>' +
        '</div>' +
      '</article>';
    }).join("");
    root.innerHTML = '<div class="club-referrals-modal__invited-list">' + rows + "</div>";
  }

  function loadInvited() {
    if (invitedState.loading || invitedState.loaded) {
      renderInvited();
      renderRanking();
      return;
    }
    var base = apiBase();
    if (!base || typeof fetch !== "function") {
      invitedState.error = "Не удалось загрузить приглашённых.";
      renderInvited();
      renderRanking();
      return;
    }
    invitedState.loading = true;
    invitedState.error = "";
    renderInvited();
    renderRanking();
    fetch(base + "/api/referrals" + authQuery("?"), { cache: "no-store" })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          if (!res.ok || !data || data.ok === false) throw new Error(data && data.error ? data.error : "load_failed");
          return data;
        });
      })
      .then(function (data) {
        invitedState.data = data || {};
        invitedState.loaded = true;
      })
      .catch(function () {
        invitedState.error = "Не удалось загрузить приглашённых. Попробуйте позже.";
      })
      .then(function () {
        invitedState.loading = false;
        renderInvited();
        renderRanking();
      });
  }

  function copyReferralLink(link, btn) {
    if (!link) return;
    var original = btn ? btn.textContent : "";
    var done = function (ok) {
      if (!btn) return;
      btn.textContent = ok ? "Скопировано" : "Не скопировано";
      clearTimeout(btn.__refCopyTimer);
      btn.__refCopyTimer = setTimeout(function () {
        btn.textContent = original || "Скопировать";
      }, 1300);
    };
    if (typeof pokerCopyTextToClipboard === "function") {
      pokerCopyTextToClipboard(link).then(done).catch(function () { done(false); });
      return;
    }
    done(false);
  }

  function openModal() {
    var modal = ensureModal();
    renderLinks();
    switchTab("links");
    modal.classList.remove("club-referrals-modal--hidden");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("club-referrals-modal-open");
    var closeBtn = modal.querySelector(".club-referrals-modal__close");
    if (closeBtn && closeBtn.focus) setTimeout(function () { closeBtn.focus(); }, 0);
  }

  function closeModal() {
    var modal = document.getElementById("clubReferralsModal");
    if (!modal) return;
    modal.classList.add("club-referrals-modal--hidden");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("club-referrals-modal-open");
  }

  document.addEventListener("click", function (e) {
    var btn = e.target && e.target.closest ? e.target.closest("#clubReferralsOpenBtn") : null;
    if (!btn) return;
    e.preventDefault();
    closeHeaderMoreMenu();
    openModal();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });
})();
