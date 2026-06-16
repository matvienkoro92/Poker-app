(function initClubReferralsMenu() {
  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function closeHeaderMoreMenu() {
    var menu = document.getElementById("headerMoreMenu");
    var toggle = document.getElementById("headerMoreMenuBtn");
    if (menu) menu.hidden = true;
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  function buildStartLink(startParam) {
    if (typeof buildMiniAppStartLink === "function") return buildMiniAppStartLink(startParam);
    if (typeof pokerBuildPersonalInviteLink === "function") return pokerBuildPersonalInviteLink(startParam);
    return "";
  }

  function buildRaffleLink() {
    if (typeof pokerBuildRaffleShareLink === "function") return pokerBuildRaffleShareLink("r_1");
    return buildStartLink("r_1");
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
        '<p class="club-referrals-modal__lead">Отправьте ссылку другу чтобы пригласить и закрепить за вами</p>' +
        '<div class="club-referrals-modal__status" id="clubReferralsStatus" aria-live="polite"></div>' +
        '<div class="club-referrals-modal__list" id="clubReferralsList"></div>' +
      '</section>';
    document.body.appendChild(modal);
    modal.addEventListener("click", function (e) {
      var close = e.target && e.target.closest ? e.target.closest("[data-referrals-close]") : null;
      if (close && modal.contains(close)) closeModal();
      var copyBtn = e.target && e.target.closest ? e.target.closest("[data-referral-copy]") : null;
      if (copyBtn && modal.contains(copyBtn)) {
        var link = copyBtn.getAttribute("data-referral-copy") || "";
        copyReferralLink(link, copyBtn);
      }
    });
    return modal;
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
