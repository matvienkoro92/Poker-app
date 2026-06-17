(function initClubReferralsMenu() {
  var invitedState = {
    loading: false,
    loaded: false,
    error: "",
    data: null,
    requestId: 0,
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

  function referralsAuthQuery() {
    var query = authQuery("?");
    var refCode = typeof pokerGetMyReferralCode === "function" ? pokerGetMyReferralCode() : "";
    if (!refCode) return query;
    return query + (query.indexOf("?") >= 0 && query !== "?" ? "&" : "") + "dtIdHint=" + encodeURIComponent(refCode);
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

  function referralIcon(kind) {
    var paths = {
      link: '<path d="M10 13a5 5 0 0 0 7.1.1l2.8-2.8a5 5 0 0 0-7.1-7.1l-1.6 1.6"></path><path d="M14 11a5 5 0 0 0-7.1-.1l-2.8 2.8a5 5 0 0 0 7.1 7.1l1.6-1.6"></path>',
      ticket: '<path d="M3 9a3 3 0 0 0 0 6v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3a3 3 0 0 0 0-6V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Z"></path><path d="m9 12 2 2 4-5"></path>',
      users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
      trophy: '<path d="M8 21h8"></path><path d="M12 17v4"></path><path d="M7 4h10v5a5 5 0 0 1-10 0Z"></path><path d="M5 5H3v3a4 4 0 0 0 4 4"></path><path d="M19 5h2v3a4 4 0 0 1-4 4"></path>',
      star: '<path d="m12 3 2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8Z"></path>',
      copy: '<rect x="9" y="9" width="13" height="13" rx="2"></rect><rect x="2" y="2" width="13" height="13" rx="2"></rect>',
      send: '<path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path>',
      gift: '<rect x="3" y="8" width="18" height="13" rx="2"></rect><path d="M12 8v13"></path><path d="M3 12h18"></path><path d="M7.5 8A2.5 2.5 0 1 1 12 5.5 2.5 2.5 0 1 1 16.5 8"></path>',
      card: '<rect x="5" y="3" width="14" height="18" rx="2"></rect><path d="M9 7h3"></path><path d="M9 17h6"></path><path d="m9 11 3-2 3 2-3 3Z"></path>',
      newspaper: '<path d="M4 19V5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2Z"></path><path d="M8 7h6"></path><path d="M8 11h6"></path><path d="M8 15h4"></path>',
      message: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"></path>',
      calendar: '<path d="M8 2v4"></path><path d="M16 2v4"></path><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M3 10h18"></path>',
      play: '<path d="m8 5 11 7-11 7Z"></path>',
      wallet: '<path d="M3 7h18v13H3z"></path><path d="M16 12h5v4h-5a2 2 0 0 1 0-4Z"></path><path d="M3 7l3-4h12l3 4"></path>',
      home: '<path d="m3 11 9-8 9 8"></path><path d="M5 10v11h14V10"></path><path d="M9 21v-6h6v6"></path>',
      chart: '<path d="M3 3v18h18"></path><path d="m7 14 4-4 3 3 5-7"></path>',
      book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"></path>',
      user: '<path d="M20 21a8 8 0 0 0-16 0"></path><circle cx="12" cy="7" r="4"></circle>',
    };
    return '<svg class="club-referrals-modal__svg" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (paths[kind] || paths.link) + '</svg>';
  }

  function referralLinks() {
    return [
      { title: "Ссылка на розыгрыш", hint: "Открывает актуальный розыгрыш #1", icon: "link", link: buildRaffleLink() },
      { title: "Блок розыгрышей", hint: "Все активные розыгрыши", icon: "gift", link: buildStartLink("raffles") },
      { title: "Раздача дня", hint: "Игра дня с личной ссылкой", icon: "card", link: buildStartLink("daily_poker") },
      { title: "Общий чат", hint: "Чат клуба", icon: "message", link: buildStartLink("club_chat") },
      { title: "Газета клуба", hint: "Новости и задачи клуба", icon: "newspaper", link: buildStartLink("news") },
      { title: "Устав клуба", hint: "Правила клуба", icon: "star", link: buildStartLink("club_charter") },
      { title: "Рейтинг лета", hint: "Летний рейтинг", icon: "chart", link: buildStartLink("summer_rating") },
      { title: "Рейтинг весны", hint: "Весенний рейтинг", icon: "chart", link: buildStartLink("spring_rating") },
      { title: "Зал славы", hint: "Топ 2026", icon: "trophy", link: buildStartLink("hall_fame_top2026") },
      { title: "Видеоуроки", hint: "Раздел обучения", icon: "play", link: buildStartLink("video_lessons") },
      { title: "Научиться играть", hint: "Обучающий хаб", icon: "book", link: buildStartLink("learn_play_hub") },
      { title: "Расписание", hint: "Турниры и фрироллы", icon: "calendar", link: buildStartLink("schedule") },
      { title: "Стримы", hint: "Комнаты трансляций", icon: "play", link: buildStartLink("streams") },
      { title: "Привязать Poker21", hint: "Профиль Poker21", icon: "user", link: buildStartLink("profile") },
      { title: "Депозит", hint: "Касса клуба", icon: "wallet", link: buildStartLink("cashout") },
      { title: "Главная", hint: "Главный экран приложения", icon: "home", link: buildStartLink("home") },
    ].filter(function (item) {
      return item.link;
    });
  }

  function shortReferralLink(link) {
    var raw = String(link || "").trim();
    if (!raw) return "";
    try {
      var url = new URL(raw);
      var start = url.searchParams.get("startapp") || url.searchParams.get("start");
      if (start) return ".../" + start;
      if (url.pathname && url.pathname !== "/") return url.host.replace(/^www\./, "").replace(/^(.{9}).+$/, "$1...") + url.pathname;
      return url.host.replace(/^www\./, "");
    } catch (eUrl) {
      return raw.length > 28 ? raw.slice(0, 12) + "..." + raw.slice(-12) : raw;
    }
  }

  function referralShareText(item) {
    var title = item && item.title ? String(item.title) : "раздел клуба";
    var hint = item && item.hint ? String(item.hint) : "";
    return "Заходи в " + title + " клуба «Два туза»" + (hint ? ": " + hint : "") + ".";
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
        '<div class="club-referrals-modal__hero">' +
          '<h2 class="club-referrals-modal__title">Приглашённые</h2>' +
          '<p class="club-referrals-modal__lead">Выберите любую ссылку ниже на любой раздел который будет интересен вашему другу</p>' +
        '</div>' +
        '<div class="club-referrals-modal__promo">' +
          '<span class="club-referrals-modal__promo-icon">' + referralIcon("ticket") + '</span>' +
          '<span><strong>Билет за 10 000 ₽</strong><em>тому, кто пригласит больше всех до 15 июля</em></span>' +
        '</div>' +
        '<div class="club-referrals-modal__status" id="clubReferralsStatus" aria-live="polite"></div>' +
        '<div class="club-referrals-modal__tabs" role="tablist" aria-label="Пригласительные ссылки">' +
          '<button type="button" class="club-referrals-modal__tab club-referrals-modal__tab--active" data-referrals-tab="links" role="tab" aria-selected="true">' + referralIcon("link") + '<span>Ссылки</span></button>' +
          '<button type="button" class="club-referrals-modal__tab" data-referrals-tab="invited" role="tab" aria-selected="false">' + referralIcon("users") + '<span>Ваши приглашенные</span></button>' +
          '<button type="button" class="club-referrals-modal__tab" data-referrals-tab="ranking" role="tab" aria-selected="false">' + referralIcon("trophy") + '<span>Рейтинг пригласивших</span></button>' +
        '</div>' +
        '<div class="club-referrals-modal__panel-tab" data-referrals-panel="links">' +
          '<div class="club-referrals-modal__rules">' +
            '<span class="club-referrals-modal__rules-icon">' + referralIcon("star") + '</span>' +
            '<div>' +
              '<strong>Как засчитывается приглашение</strong>' +
              '<ul>' +
                '<li>Игрок должен открыть вашу ссылку и создать новый аккаунт.</li>' +
                '<li>Если игрок уже был зарегистрирован до перехода по ссылке, он не засчитывается.</li>' +
                '<li>Один и тот же DT-ID, Telegram ID или Poker21 ID не может засчитаться повторно.</li>' +
                '<li>Если игрок уже закреплён за другим пригласившим, привязка не перезаписывается.</li>' +
              '</ul>' +
            '</div>' +
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
        return;
      }
      var shareBtn = e.target && e.target.closest ? e.target.closest("[data-referral-share]") : null;
      if (shareBtn && modal.contains(shareBtn)) {
        shareReferralLink(shareBtn.getAttribute("data-referral-share") || "", shareBtn.getAttribute("data-referral-share-title") || "", shareBtn.getAttribute("data-referral-share-text") || "");
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
    if (active === "invited" || active === "ranking") loadInvited(true);
  }

  function renderLinks() {
    var list = document.getElementById("clubReferralsList");
    var status = document.getElementById("clubReferralsStatus");
    if (!list) return;
    var refCode = typeof pokerGetMyReferralCode === "function" ? pokerGetMyReferralCode() : "";
    if (status) {
      status.innerHTML = refCode
        ? '<span class="club-referrals-modal__status-icon">' + referralIcon("ticket") + '</span><span class="club-referrals-modal__status-label">Ваш код:</span> <strong>' + esc(refCode) + '</strong>'
        : '<span class="club-referrals-modal__status-icon">' + referralIcon("user") + '</span><span>Войдите в аккаунт, чтобы ссылки стали личными.</span>';
      status.classList.toggle("club-referrals-modal__status--warn", !refCode);
    }
    list.innerHTML = referralLinks().map(function (item) {
      return '<article class="club-referrals-modal__item">' +
        '<span class="club-referrals-modal__item-icon">' + referralIcon(item.icon) + '</span>' +
        '<div class="club-referrals-modal__item-head">' +
          '<strong>' + esc(item.title) + '</strong>' +
          '<span>' + esc(item.hint) + '</span>' +
          '<em class="club-referrals-modal__item-link-preview">' + referralIcon("link") + esc(shortReferralLink(item.link)) + '</em>' +
        '</div>' +
        '<div class="club-referrals-modal__item-actions" role="group" aria-label="Действия со ссылкой">' +
          '<button type="button" class="club-referrals-modal__action-btn club-referrals-modal__action-btn--copy" data-referral-copy="' + esc(item.link) + '">' + referralIcon("copy") + '<span>Копия</span></button>' +
          '<button type="button" class="club-referrals-modal__action-btn club-referrals-modal__action-btn--share" data-referral-share="' + esc(item.link) + '" data-referral-share-title="' + esc(item.title) + '" data-referral-share-text="' + esc(referralShareText(item)) + '">' + referralIcon("send") + '<span>Отправить другу</span></button>' +
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
      return '<article class="club-referrals-modal__invited-card club-referrals-modal__invited-card--list">' +
        '<div class="club-referrals-modal__invited-main">' +
          '<div class="club-referrals-modal__invited-head">' +
            '<strong>' + esc(name) + '</strong>' +
            '<span>ур. ' + esc(item.level || 0) + '</span>' +
          '</div>' +
          '<div class="club-referrals-modal__invited-sub">' + esc(sub) + '</div>' +
          '<div class="club-referrals-modal__bindings">Привязки: ' + esc(linked) + '</div>' +
        '</div>' +
        '<div class="club-referrals-modal__invited-stats" aria-label="Активность приглашенного">' +
          '<span><b>' + esc(item.dailyPoker && item.dailyPoker.spins || 0) + '</b> крутки</span>' +
          '<span><b>' + esc(item.dailyPoker && item.dailyPoker.ticketsWon || 0) + '</b> билеты</span>' +
          '<span><b>' + esc(item.raffles && item.raffles.participated || 0) + '</b> розыгрыши</span>' +
          '<span><b>' + esc(item.raffles && item.raffles.won || 0) + '</b> победы</span>' +
        '</div>' +
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

  function loadInvited(force) {
    if (invitedState.loading && !force) {
      renderInvited();
      renderRanking();
      return;
    }
    if (invitedState.loaded && !force) {
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
    var requestId = invitedState.requestId + 1;
    invitedState.requestId = requestId;
    renderInvited();
    renderRanking();
    fetch(base + "/api/referrals" + referralsAuthQuery(), { cache: "no-store" })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          if (!res.ok || !data || data.ok === false) throw new Error(data && data.error ? data.error : "load_failed");
          return data;
        });
      })
      .then(function (data) {
        if (requestId !== invitedState.requestId) return;
        invitedState.data = data || {};
        invitedState.loaded = true;
      })
      .catch(function () {
        if (requestId !== invitedState.requestId) return;
        invitedState.error = "Не удалось загрузить приглашённых. Попробуйте позже.";
      })
      .then(function () {
        if (requestId !== invitedState.requestId) return;
        invitedState.loading = false;
        renderInvited();
        renderRanking();
      });
  }

  function copyReferralLink(link, btn) {
    if (!link) return;
    var originalHtml = btn ? btn.innerHTML : "";
    var done = function (ok) {
      if (!btn) return;
      btn.innerHTML = ok ? '<span>Скопировано</span>' : '<span>Не скопировано</span>';
      clearTimeout(btn.__refCopyTimer);
      btn.__refCopyTimer = setTimeout(function () {
        btn.innerHTML = originalHtml || "Копия";
      }, 1300);
    };
    if (typeof pokerCopyTextToClipboard === "function") {
      pokerCopyTextToClipboard(link).then(done).catch(function () { done(false); });
      return;
    }
    done(false);
  }

  function shareReferralLink(link, title, text) {
    if (!link) return;
    var shareText = text || ("Заходи в " + (title || "клуб «Два туза»") + ".");
    var payloadText = shareText + "\n" + link;
    var shareUrl = typeof pokerBuildTelegramShareUrlDialog === "function"
      ? pokerBuildTelegramShareUrlDialog(link, shareText)
      : "https://t.me/share/url?url=" + encodeURIComponent(link) + "&text=" + encodeURIComponent(shareText);
    function fallback() {
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tg && typeof tg.openTelegramLink === "function") tg.openTelegramLink(shareUrl);
      else if (tg && typeof tg.openLink === "function") tg.openLink(shareUrl);
      else window.open(shareUrl, "_blank", "noopener");
      if (typeof recordShareButtonClick === "function") recordShareButtonClick("referrals_link_share");
    }
    if (typeof pokerTryPwaWebShare === "function") {
      pokerTryPwaWebShare({ title: title || "Приглашение в клуб", text: payloadText, url: link }).then(function (ok) {
        if (ok) {
          if (typeof recordShareButtonClick === "function") recordShareButtonClick("referrals_link_share");
          return;
        }
        fallback();
      }).catch(fallback);
      return;
    }
    fallback();
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
