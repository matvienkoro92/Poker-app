(function () {
  "use strict";

  var API_PATH = "/api/sng-champions";
  var SNG_START_PARAM = "sng_champions";
  var modal = null;
  var bodyEl = null;
  var statusEl = null;
  var state = null;
  var loading = false;
  var homeSummaryInFlight = null;
  var homeSummaryLoadedAt = 0;
  var activeTab = "signup";
  var activeBracketStage = 0;
  var bracketMapExpanded = false;
  var bracketTimerInterval = null;
  var HOME_SUMMARY_CACHE_MS = 60000;

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

  function sngLink() {
    if (typeof buildMiniAppStartLink === "function") return buildMiniAppStartLink(SNG_START_PARAM);
    if (typeof pokerBuildWebsiteStartLink === "function") {
      var webLink = pokerBuildWebsiteStartLink(SNG_START_PARAM);
      if (webLink) return webLink;
    }
    var base = typeof getAppBaseUrlForLinks === "function" ? getAppBaseUrlForLinks() : "";
    if (!base && window.location) base = String(window.location.origin || "") + "/";
    base = String(base || "").trim().replace(/\/+$/, "");
    return base ? base + (base.indexOf("?") >= 0 ? "&" : "?") + "startapp=" + encodeURIComponent(SNG_START_PARAM) : "";
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

  function shareSng() {
    var link = sngLink();
    var text = "СНГ Лига Чемпионов Два Туза: запись на турнир клуба.";
    if (!link) {
      showAlert("Не удалось сформировать ссылку.");
      return;
    }
    if (typeof pokerTryPwaWebShare === "function") {
      pokerTryPwaWebShare({ title: "СНГ Лига Чемпионов Два Туза", text: text + "\n" + link, url: link }).then(function (ok) {
        if (ok) return;
        openTelegramShare(link, text);
      });
      return;
    }
    openTelegramShare(link, text);
  }

  function copySngLink() {
    var link = sngLink();
    if (!link) {
      showAlert("Не удалось сформировать ссылку.");
      return;
    }
    var copy = typeof pokerCopyTextToClipboard === "function"
      ? pokerCopyTextToClipboard(link)
      : Promise.resolve(false);
    copy.then(function (ok) {
      showAlert(ok ? "Ссылка на СНГ скопирована." : "Скопируйте ссылку вручную: " + link);
    });
  }

  function ensureModal() {
    if (modal) return modal;
    modal = document.createElement("div");
    modal.className = "club-choice-vote-modal sng-champions-modal";
    modal.innerHTML =
      '<div class="club-choice-vote-modal__backdrop" data-sng-close="1"></div>' +
      '<section class="club-choice-vote-modal__panel sng-champions-modal__panel" role="dialog" aria-modal="true" aria-labelledby="sngChampionsTitle">' +
        '<header class="club-choice-vote-modal__head">' +
          '<div>' +
            '<p class="club-choice-vote-modal__eyebrow">Турнир по записи</p>' +
            '<h2 class="club-choice-vote-modal__title" id="sngChampionsTitle">СНГ Лига Чемпионов Два Туза</h2>' +
          '</div>' +
          '<button type="button" class="club-choice-vote-modal__close" data-sng-close="1" aria-label="Закрыть">×</button>' +
        '</header>' +
        '<div class="club-choice-vote-modal__status" id="sngChampionsStatus" role="status" aria-live="polite"></div>' +
        '<div class="club-choice-vote-modal__body sng-champions-modal__body" id="sngChampionsBody">' +
          '<div class="club-choice-vote-modal__loading">Идет загрузка...</div>' +
        '</div>' +
        '<footer class="club-choice-vote-modal__footer" aria-label="Поделиться турниром">' +
          '<button type="button" class="club-choice-vote-modal__share club-choice-vote-modal__share--primary" data-sng-share="1">Поделиться</button>' +
          '<button type="button" class="club-choice-vote-modal__share club-choice-vote-modal__share--copy" data-sng-copy="1">Скопировать</button>' +
        '</footer>' +
      '</section>';
    document.body.appendChild(modal);
    bodyEl = document.getElementById("sngChampionsBody");
    statusEl = document.getElementById("sngChampionsStatus");
    modal.addEventListener("click", onModalClick);
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && modal.classList.contains("club-choice-vote-modal--open")) closeModal();
    });
    return modal;
  }

  function openModal() {
    ensureModal();
    modal.classList.add("club-choice-vote-modal--open");
    document.body.classList.add("club-choice-vote-open");
    startBracketTimerRefresh();
    renderLoading();
    loadState();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("club-choice-vote-modal--open");
    document.body.classList.remove("club-choice-vote-open");
    stopBracketTimerRefresh();
  }

  function startBracketTimerRefresh() {
    if (bracketTimerInterval) return;
    bracketTimerInterval = window.setInterval(function () {
      if (!modal || !modal.classList.contains("club-choice-vote-modal--open")) return;
      if (state && state.status === "bracket") loadState();
    }, 60000);
  }

  function stopBracketTimerRefresh() {
    if (!bracketTimerInterval) return;
    window.clearInterval(bracketTimerInterval);
    bracketTimerInterval = null;
  }

  function renderLoading() {
    ensureModal();
    if (bodyEl) bodyEl.innerHTML = '<div class="club-choice-vote-modal__loading">Идет загрузка...</div>';
    setStatus("");
  }

  function fetchState() {
    return fetch(baseUrl() + API_PATH + apiAuthQuery("?") + "&_t=" + Date.now(), { cache: "no-store" }).then(function (res) {
      return res.json();
    });
  }

  function fetchHomeSummary(force) {
    var now = Date.now();
    if (!force && state && state.summary && homeSummaryLoadedAt && now - homeSummaryLoadedAt < HOME_SUMMARY_CACHE_MS) {
      return Promise.resolve(state);
    }
    if (homeSummaryInFlight) return homeSummaryInFlight;
    homeSummaryInFlight = fetch(baseUrl() + API_PATH + apiAuthQuery("?") + "&summary=1", { cache: "default" })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data && data.ok) {
          homeSummaryLoadedAt = Date.now();
        }
        return data;
      })
      .finally(function () {
        homeSummaryInFlight = null;
      });
    return homeSummaryInFlight;
  }

  function loadState() {
    if (loading) return;
    loading = true;
    fetchState()
      .then(function (data) {
        if (!data || !data.ok) throw new Error((data && data.error) || "Ошибка загрузки");
        state = data;
        updateHomePlaque();
        render();
      })
      .catch(function (error) {
        if (bodyEl) bodyEl.innerHTML = '<div class="club-choice-vote-modal__empty">' + escapeHtml(error.message || "Ошибка загрузки") + "</div>";
      })
      .finally(function () {
        loading = false;
      });
  }

  function postAction(payload, options) {
    options = options || {};
    var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timeoutMs = Math.max(5000, Number(options.timeoutMs) || 18000);
    var timeoutId = controller ? window.setTimeout(function () {
      controller.abort();
    }, timeoutMs) : null;
    setStatus(options.status || "Идет загрузка...");
    return fetch(baseUrl() + API_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiBody(payload || {})),
      signal: controller ? controller.signal : undefined,
    })
      .then(function (res) {
        return res.json().then(function (data) {
          if (!res.ok || !data || !data.ok) throw new Error((data && data.error) || "Ошибка");
          state = data;
          render();
          updateHomePlaque();
          setStatus(options.success || "");
          return data;
        });
      })
      .catch(function (error) {
        setStatus("");
        showAlert(error && error.name === "AbortError" ? "Заявка не отправилась: сервер не ответил. Попробуйте еще раз." : (error.message || "Ошибка"));
      })
      .finally(function () {
        if (timeoutId) window.clearTimeout(timeoutId);
      });
  }

  function setButtonLoading(button, active) {
    if (!button) return;
    button.disabled = !!active;
    if (active) {
      button.setAttribute("aria-busy", "true");
      button.dataset.sngOriginalText = button.textContent || "";
      button.textContent = "Загрузка...";
    } else {
      button.removeAttribute("aria-busy");
      if (button.dataset.sngOriginalText) button.textContent = button.dataset.sngOriginalText;
      delete button.dataset.sngOriginalText;
    }
  }

  function statusLabel(value) {
    if (value === "open") return "Открыта запись";
    if (value === "bracket") return "Сетка сформирована";
    if (value === "completed") return "Турнир завершен";
    return "Черновик";
  }

  function entryStatusLabel(value) {
    if (value === "approved") return "Подтвержден";
    if (value === "rejected") return "Отклонен";
    if (value === "balance_requested") return "Админ запросил пополнить баланс";
    return "Ждет подтверждения";
  }

  function roundStageLabel(round, index, rounds) {
    if (Array.isArray(rounds) && rounds.length) {
      var remaining = rounds.length - (Number(index) || 0);
      if (remaining === 1) return "Финал";
      if (remaining === 2) return "1/2";
      if (remaining === 3) return "1/4";
      if (remaining === 4) return "1/8";
      if (remaining === 5) return "1/16";
    }
    var matches = Array.isArray(round && round.matches) ? round.matches.length : 0;
    if (matches >= 16) return "1/16";
    if (matches === 8) return "1/8";
    if (matches === 4) return "1/4";
    if (matches === 2) return "1/2";
    if (matches === 1) return "Финал";
    return round && round.name ? round.name : "Сетка";
  }

  function roundStageClass(round, index, rounds) {
    var label = roundStageLabel(round, index, rounds);
    if (label === "1/4") return "quarter";
    if (label === "1/2") return "semi";
    if (label === "Финал") return "final";
    return "";
  }

  function playerName(player) {
    return String(player && (player.pokerPlusNickname || player.displayName) || "Игрок").trim() || "Игрок";
  }

  function playerLevelText(player) {
    var raw = player && player.level;
    if (raw == null || raw === "") return "";
    var level = Math.max(0, Math.floor(Number(raw) || 0));
    return "Уровень " + String(level);
  }

  function playerInitial(player) {
    var name = playerName(player);
    return String(name || "И").trim().charAt(0).toUpperCase() || "И";
  }

  function buildBracketSkeletonRounds() {
    return [16, 8, 4, 2, 1].map(function (count, roundIndex) {
      var matches = [];
      for (var index = 0; index < count; index += 1) {
        matches.push({
          id: "preview-" + String(roundIndex) + "-" + String(index),
          index: index + 1,
          playerIds: [
            "preview-" + String(roundIndex) + "-" + String(index) + "-a",
            "preview-" + String(roundIndex) + "-" + String(index) + "-b",
          ],
        });
      }
      return {
        id: "preview-round-" + String(roundIndex),
        matches: matches,
      };
    });
  }

  function buildBracketSkeletonPlayers(rounds) {
    var players = {};
    rounds.forEach(function (round) {
      (round.matches || []).forEach(function (match) {
        (match.playerIds || []).forEach(function (id) {
          players[id] = { id: id, displayName: "Random Random" };
        });
      });
    });
    return players;
  }

  var SNG_PLAYER_ART_BY_NICK = {
    "waaar": "./assets/summer-rating-player-waaar.webp",
    "покерманки": "./assets/summer-rating-player-pokermanki.webp?v=3.546",
    "coo1er91": "./assets/summer-rating-player-cooler.webp",
    "em13!!": "./assets/summer-rating-player-emil.webp",
    "winifly": "./assets/summer-rating-player-winifly.webp",
    "missclick": "./assets/summer-rating-player-missclick.webp",
    "рыбнадзор": "./assets/summer-rating-player-rybnadzor.webp",
    "nikola233": "./assets/summer-rating-player-nikola233.webp",
    "milkyway77": "./assets/summer-rating-player-milkyway.webp",
    "пряник": "./assets/summer-rating-player-pryanik.webp",
    "pryanik2la": "./assets/summer-rating-player-pryanik.webp",
    "prushnik": "./assets/summer-rating-player-prushnik.webp",
    "evgen1722": "./assets/summer-rating-player-evgen1722.webp",
    "хер вам)))))": "./assets/summer-rating-player-khervam.webp",
    "alenast": "./assets/summer-rating-league2-player-alena.webp",
    "shkarubo": "./assets/summer-rating-league2-player-shkarubo.webp",
    "sarmat1305": "./assets/summer-rating-league2-player-sarmat.webp",
    "палач": "./assets/summer-rating-league2-player-palach.webp",
    "nakurikota": "./assets/summer-rating-league2-player-nakurikota.webp",
    "накурикота": "./assets/summer-rating-league2-player-nakurikota.webp",
    "wildboar": "./assets/summer-rating-league2-player-wildboar.webp",
    "бабник": "./assets/summer-rating-league2-player-babnik.webp",
    "виктор": "./assets/summer-rating-league2-player-viktor.webp",
    "мистерfox": "./assets/summer-rating-league2-player-mr-fox.webp",
    "babyshark": "./assets/summer-rating-league2-player-babyshark.webp",
    "аспирин": "./assets/summer-rating-league2-player-aspirin.webp",
    "ksuha": "./assets/summer-rating-league2-player-ksyukha.webp",
    "ksuha🐍": "./assets/summer-rating-league2-player-ksyukha.webp",
    "ksuha🐊": "./assets/summer-rating-league2-player-ksyukha.webp",
    "ksuha🦖": "./assets/summer-rating-league2-player-ksyukha.webp",
    "ksuha🐉": "./assets/summer-rating-league2-player-ksyukha.webp",
  };

  function sngPlayerArtKey(nick) {
    var normalized = typeof normalizeWinterNick === "function" ? normalizeWinterNick(nick) : String(nick || "").trim();
    return String(normalized || "").trim().toLowerCase();
  }

  function sngPlayerArt(entry) {
    var nick = entry && (entry.pokerPlusNickname || entry.displayName);
    if (typeof window.pokerGetSummerRatingPlayerArt === "function") {
      var sharedArt = window.pokerGetSummerRatingPlayerArt(nick);
      if (sharedArt && sharedArt.src) return String(sharedArt.src);
    }
    return SNG_PLAYER_ART_BY_NICK[sngPlayerArtKey(nick)] || "";
  }

  function playerAvatar(entry) {
    return entry && entry.avatar ? String(entry.avatar) : "";
  }

  function renderPlayerImage(entry) {
    var art = sngPlayerArt(entry);
    if (art) {
      return '<span class="sng-champions-modal__entry-avatar-media"><img class="sng-champions-modal__entry-avatar-img sng-champions-modal__entry-avatar-img--art" src="' + escapeHtml(art) + '" alt="" loading="lazy" decoding="async"></span>';
    }
    var avatar = playerAvatar(entry);
    if (avatar) {
      return '<span class="sng-champions-modal__entry-avatar-media"><img class="sng-champions-modal__entry-avatar-img" src="' + escapeHtml(avatar) + '" alt="" loading="lazy" decoding="async"></span>';
    }
    return '<b>' + escapeHtml(playerInitial(entry)) + '</b>';
  }

  function renderPlayerAvatar(entry) {
    var profileId = entry && entry.accountId ? String(entry.accountId) : "";
    var profileName = playerName(entry);
    var avatar = playerAvatar(entry);
    var attrs = ' data-sng-profile="' + escapeHtml(profileId) + '" data-sng-profile-name="' + escapeHtml(profileName) + '" data-sng-profile-avatar="' + escapeHtml(avatar) + '"';
    return '<button type="button" class="sng-champions-modal__entry-avatar" aria-label="Открыть профиль ' + escapeHtml(profileName) + '"' + attrs + '>' +
      renderPlayerImage(entry) +
      (entry.level != null ? '<em>' + escapeHtml(String(Math.max(0, Math.floor(Number(entry.level) || 0)))) + '</em>' : '') +
    '</button>';
  }

  function renderPlayerNameButton(entry) {
    var profileId = entry && entry.accountId ? String(entry.accountId) : "";
    var profileName = playerName(entry);
    var avatar = playerAvatar(entry);
    return '<button type="button" class="sng-champions-modal__entry-name" data-sng-profile="' + escapeHtml(profileId) + '" data-sng-profile-name="' + escapeHtml(profileName) + '" data-sng-profile-avatar="' + escapeHtml(avatar) + '">' + escapeHtml(profileName) + '</button>';
  }

  function renderTabs(createHtml, signupHtml, bracketHtml, data) {
    var isAdmin = !!(data && data.isAdmin);
    var tab = activeTab === "bracket" ? "bracket" : activeTab === "create" && isAdmin ? "create" : "signup";
    return '<div class="club-choice-vote-modal__tabs sng-champions-modal__tabs' + (isAdmin ? " sng-champions-modal__tabs--admin" : "") + '" role="tablist" aria-label="Разделы СНГ">' +
        (isAdmin ? '<button type="button" class="club-choice-vote-modal__tab' + (tab === "create" ? " club-choice-vote-modal__tab--active" : "") + '" role="tab" aria-selected="' + (tab === "create" ? "true" : "false") + '" data-sng-tab="create">Создать</button>' : "") +
        '<button type="button" class="club-choice-vote-modal__tab' + (tab === "signup" ? " club-choice-vote-modal__tab--active" : "") + '" role="tab" aria-selected="' + (tab === "signup" ? "true" : "false") + '" data-sng-tab="signup">Запись</button>' +
        '<button type="button" class="club-choice-vote-modal__tab' + (tab === "bracket" ? " club-choice-vote-modal__tab--active" : "") + '" role="tab" aria-selected="' + (tab === "bracket" ? "true" : "false") + '" data-sng-tab="bracket">Сетка</button>' +
      '</div>' +
      '<div class="club-choice-vote-modal__tab-panels">' +
        (isAdmin ? '<div class="club-choice-vote-modal__tab-panel" data-sng-tab-panel="create"' + (tab === "create" ? "" : " hidden") + '>' + createHtml + '</div>' : "") +
        '<div class="club-choice-vote-modal__tab-panel" data-sng-tab-panel="signup"' + (tab === "signup" ? "" : " hidden") + '>' + signupHtml + '</div>' +
        '<div class="club-choice-vote-modal__tab-panel" data-sng-tab-panel="bracket"' + (tab === "bracket" ? "" : " hidden") + '>' + bracketHtml + '</div>' +
      '</div>';
  }

  function setTab(tabName) {
    var isAdmin = !!(state && state.isAdmin);
    activeTab = tabName === "bracket" ? "bracket" : tabName === "create" && isAdmin ? "create" : "signup";
    if (!modal) return;
    Array.prototype.slice.call(modal.querySelectorAll("[data-sng-tab]")).forEach(function (button) {
      var active = button.getAttribute("data-sng-tab") === activeTab;
      button.classList.toggle("club-choice-vote-modal__tab--active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
    });
    Array.prototype.slice.call(modal.querySelectorAll("[data-sng-tab-panel]")).forEach(function (panel) {
      panel.hidden = panel.getAttribute("data-sng-tab-panel") !== activeTab;
    });
    updateJoinDockBodyClass();
  }

  function updateJoinDockBodyClass() {
    if (!bodyEl) return;
    var activePanel = bodyEl.querySelector('[data-sng-tab-panel="' + activeTab + '"]');
    bodyEl.classList.toggle("sng-champions-modal__body--with-join-dock", !!(activePanel && activePanel.querySelector(".sng-champions-modal__join-dock")));
  }

  function renderPrizes(data) {
    return '<div class="sng-champions-modal__prizes">' + (data.prizes || []).map(function (prize) {
      return '<article><span>' + escapeHtml(prize.place || "") + ' место</span><strong>' + escapeHtml(prize.text || "") + '</strong></article>';
    }).join("") + '</div>';
  }

  function renderBuyIn(data) {
    return '<div class="sng-champions-modal__buyin"><span>Байин</span><strong>' + escapeHtml(data.buyIn || "0р") + '</strong></div>';
  }

  function renderInfoCard(label, value, extraClass) {
    var className = "sng-champions-modal__summary-card" + (extraClass ? " " + extraClass : "");
    var valueHtml = escapeHtml(value || "").replace(/(\d)\s+(\d{3})(р|₽)/g, "$1&nbsp;$2$3");
    return '<div class="' + escapeHtml(className) + '"><span>' + escapeHtml(label) + '</span><strong>' + valueHtml + '</strong></div>';
  }

  function renderSignupSummary(data, entries) {
    var edit = data.isAdmin
      ? '<button type="button" class="sng-champions-modal__edit-btn" data-sng-tab="create">Редактировать</button>'
      : "";
    var approved = (data.counts && Number(data.counts.approved)) || entries.filter(function (entry) { return entry.status === "approved"; }).length;
    var pending = (data.counts && Number(data.counts.pending)) || entries.filter(function (entry) { return entry.status === "pending" || entry.status === "balance_requested"; }).length;
    var activeEntries = approved + pending;
    var capacity = Number(data.capacity) || 32;
    return '<div class="sng-champions-modal__signup-tools">' + edit + '</div>' +
      '<figure class="sng-champions-modal__hero">' +
        '<img src="./assets/sng-champions-hero.webp?v=1" alt="СНГ Лига Чемпионов: байин 1000р, первое место 50 000р, второе место билет на HOK 10 000р" width="1672" height="941" loading="eager" decoding="async">' +
        '<span class="sng-champions-modal__hero-live sng-champions-modal__hero-live--players" aria-label="Подтвержденных игроков">' + escapeHtml(String(approved) + "/" + String(capacity)) + '</span>' +
        '<span class="sng-champions-modal__hero-live sng-champions-modal__hero-live--requests" aria-label="Активных заявок">' + escapeHtml(activeEntries) + '</span>' +
        '<span class="sng-champions-modal__hero-live sng-champions-modal__hero-live--waiting" aria-label="Ждут подтверждения">' + escapeHtml(pending) + '</span>' +
      '</figure>';
  }

  function renderDescription(data) {
    var text = String(data && data.description || "").trim();
    if (!text) return "";
    var html = text.split(/\n{2,}/).map(function (paragraph) {
      return '<p>' + escapeHtml(paragraph.trim()).replace(/\n/g, "<br>") + '</p>';
    }).join("");
    return '<div class="sng-champions-modal__description"><span>Описание</span><div class="sng-champions-modal__description-text">' + html + '</div></div>';
  }

  function renderUserAction(data) {
    var mine = data.myEntry;
    if (data.status === "open" && !mine) {
      return '<div class="sng-champions-modal__join-dock">' +
        '<button type="button" class="sng-champions-modal__main-action sng-champions-modal__main-action--wide" data-sng-action="join">Записаться</button>' +
      '</div>';
    }
    if (data.status === "open" && mine && mine.status === "rejected") {
      return '<div class="sng-champions-modal__notice sng-champions-modal__notice--rejected">Ваша заявка отклонена. Пополните баланс на 1000р и подайте заявку еще раз.</div>' +
        '<div class="sng-champions-modal__join-dock">' +
          '<button type="button" class="sng-champions-modal__main-action sng-champions-modal__main-action--wide" data-sng-action="join">Подать заявку еще раз</button>' +
        '</div>';
    }
    if (data.status === "open" && mine && mine.status !== "rejected") {
      var notice = mine.status === "approved"
        ? '<div class="sng-champions-modal__notice sng-champions-modal__notice--good">Вы подтверждены в СНГ Лиге Чемпионов Два Туза.</div>'
        : mine.status === "balance_requested"
          ? '<div class="sng-champions-modal__notice sng-champions-modal__notice--balance">Админ запросил пополнить баланс.</div>'
          : '<div class="sng-champions-modal__notice sng-champions-modal__notice--pending">Вы подали заявку. Админ должен подтвердить участие.</div>';
      return notice;
    }
    if (mine && mine.status === "approved") {
      return '<div class="sng-champions-modal__notice sng-champions-modal__notice--good">Вы подтверждены в СНГ Лиге Чемпионов Два Туза.</div>';
    }
    if (mine && mine.status === "rejected") {
      return '<div class="sng-champions-modal__notice sng-champions-modal__notice--rejected">Ваша заявка отклонена.</div>';
    }
    if (data.status === "draft") return '<div class="sng-champions-modal__notice sng-champions-modal__notice--closed">Запись еще не открыта.</div>';
    return '<div class="sng-champions-modal__notice sng-champions-modal__notice--closed">Запись закрыта, смотрите сетку турнира.</div>';
  }

  function renderCancelAction(data) {
    var mine = data && data.myEntry;
    if (data && data.status === "open" && mine && mine.status !== "rejected") {
      return '<div class="sng-champions-modal__bottom-actions">' +
        '<button type="button" class="sng-champions-modal__secondary-action sng-champions-modal__secondary-action--cancel" data-sng-action="cancel">Отменить заявку</button>' +
      '</div>';
    }
    return "";
  }

  function renderAdminPanel(data) {
    if (!data.isAdmin) return "";
    var canForm = data.status === "open" && data.counts && data.counts.approved >= data.capacity;
    var canBroadcastRoundOne = data.status === "bracket" && data.rounds && data.rounds[0] && data.rounds[0].matches && data.rounds[0].matches.length;
    var prizes = data.prizes || [];
    var prize1 = prizes[0] && prizes[0].text || "30 000р";
    var prize2 = prizes[1] && prizes[1].text || "билет на нок за 10 000р от клуба";
    var canOpen = data.status === "draft";
    return '<section class="sng-champions-modal__admin">' +
      '<div class="sng-champions-modal__settings">' +
        '<label class="sng-champions-modal__settings-wide"><span>Описание</span><textarea data-sng-description maxlength="280" rows="3" placeholder="Описание турнира, условия записи или важные детали">' + escapeHtml(data.description || "") + '</textarea></label>' +
        '<label><span>Байин</span><input type="text" data-sng-buy-in value="' + escapeHtml(data.buyIn || "0р") + '" placeholder="Например: 1 000р"></label>' +
        '<label><span>1 место</span><input type="text" data-sng-prize1 value="' + escapeHtml(prize1) + '" placeholder="30 000р"></label>' +
        '<label><span>2 место</span><input type="text" data-sng-prize2 value="' + escapeHtml(prize2) + '" placeholder="билет на нок за 10 000р от клуба"></label>' +
      '</div>' +
      '<div class="sng-champions-modal__admin-actions">' +
        '<button type="button" class="sng-champions-modal__secondary-action" data-sng-action="updateSettings">Сохранить изменения</button>' +
        '<button type="button" class="sng-champions-modal__secondary-action" data-sng-action="open"' + (canOpen ? "" : " disabled") + '>Открыть турнир</button>' +
        '<button type="button" class="sng-champions-modal__main-action" data-sng-action="formPairs"' + (canForm ? "" : " disabled") + '>Сформировать пары</button>' +
        '<button type="button" class="sng-champions-modal__main-action" data-sng-action="broadcastRoundOnePairs"' + (canBroadcastRoundOne ? "" : " disabled") + '>Разослать пары 1/16</button>' +
        '<button type="button" class="sng-champions-modal__danger-action" data-sng-action="reset">Сбросить</button>' +
      '</div>' +
      (canOpen ? "" : '<p class="sng-champions-modal__admin-hint">Турнир уже создан: меняйте описание, байин и призы через «Сохранить изменения».</p>') +
      (canForm ? "" : '<p class="sng-champions-modal__admin-hint">Для формирования пар нужно 32 подтвержденных игрока.</p>') +
    '</section>';
  }

  function renderCreate(data) {
    if (!data.isAdmin) return "";
    return renderAdminPanel(data);
  }

  function renderEntry(entry, data) {
    var level = playerLevelText(entry);
    var adminButtons = "";
    if (data.isAdmin && data.status === "open") {
      if (entry.status !== "approved") {
        adminButtons += '<button type="button" class="sng-champions-modal__entry-action sng-champions-modal__entry-action--approve" data-sng-approve="' + escapeHtml(entry.accountId || "") + '"><span aria-hidden="true">✓</span><strong>Подтвердить</strong></button>';
        adminButtons += '<button type="button" class="sng-champions-modal__entry-action sng-champions-modal__entry-action--balance" data-sng-request-balance="' + escapeHtml(entry.accountId || "") + '"' + (entry.status === "balance_requested" ? " disabled" : "") + '><span aria-hidden="true">₽</span><strong>Пополнить баланс</strong></button>';
      }
      adminButtons += '<button type="button" class="sng-champions-modal__entry-action sng-champions-modal__entry-action--reject" data-sng-reject="' + escapeHtml(entry.accountId || "") + '"' + (entry.status === "rejected" ? " disabled" : "") + '><span aria-hidden="true">×</span><strong>Отклонить</strong></button>';
    }
    var adminActions = adminButtons ? '<div class="sng-champions-modal__entry-actions">' + adminButtons + '</div>' : "";
    return '<article class="sng-champions-modal__entry sng-champions-modal__entry--' + escapeHtml(entry.status || "pending") + '">' +
      renderPlayerAvatar(entry) +
      '<div class="sng-champions-modal__entry-main">' +
        renderPlayerNameButton(entry) +
        '<span class="sng-champions-modal__entry-status sng-champions-modal__entry-status--' + escapeHtml(entry.status || "pending") + '">' + (entry.status === "approved" ? '<i aria-hidden="true">✓</i>' : '') + escapeHtml(entryStatusLabel(entry.status)) + (entry.mine ? " · это вы" : "") + '</span>' +
        (level ? '<small>' + escapeHtml(level) + '</small>' : '') +
      '</div>' +
      adminActions +
    '</article>';
  }

  function renderEntryColumn(title, entries, data) {
    var key = title.toLowerCase().indexOf("подтверж") >= 0 ? "approved" : "pending";
    return '<section class="sng-champions-modal__entries-column sng-champions-modal__entries-column--' + key + '">' +
      '<h3>' + escapeHtml(title) + '</h3>' +
      (entries.length ? entries.map(function (entry) { return renderEntry(entry, data); }).join("") : '<div class="sng-champions-modal__entries-empty">Пока пусто.</div>') +
    '</section>';
  }

  function renderSignup(data) {
    var entries = (data.entries || []).filter(function (entry) {
      return entry && entry.status !== "rejected";
    }).sort(function (a, b) {
      var order = { pending: 0, approved: 1, rejected: 2 };
      return (order[a.status] || 0) - (order[b.status] || 0);
    });
    var approvedEntries = entries.filter(function (entry) { return entry.status === "approved"; });
    var pendingEntries = entries.filter(function (entry) { return entry.status === "pending" || entry.status === "balance_requested"; });
    var columnsHtml = renderEntryColumn("Подтверждены", approvedEntries, data) +
      (pendingEntries.length ? renderEntryColumn("Подали заявку", pendingEntries, data) : "");
    return renderSignupSummary(data, entries) +
      renderDescription(data) +
      renderUserAction(data) +
      '<div class="sng-champions-modal__entries">' +
        columnsHtml +
      '</div>' +
      renderCancelAction(data);
  }

  function renderBracketPlayer(player, match, data) {
    var won = match.winnerId && match.winnerId === player.id;
    var matchPlayers = (match.playerIds || []).filter(Boolean);
    var ready = match.readyById && match.readyById[player.id] === true;
    var advanced = playerAdvancedToOpenMatch(player.id, match, data);
    var allReady = matchPlayers.length >= 2 && matchPlayers.every(function (id) { return match.readyById && match.readyById[id] === true; });
    var adminButton = data.isAdmin && data.status === "bracket" && matchPlayers.length >= 2 && allReady && !match.winnerId
      ? '<button type="button" class="sng-champions-modal__winner-btn" data-sng-winner="' + escapeHtml(match.id) + '" data-sng-player="' + escapeHtml(player.id) + '">Победил</button>'
      : "";
    var readyBadge = !won ? '<small class="sng-champions-modal__ready-badge sng-champions-modal__ready-badge--' + (ready ? "ready" : "waiting") + '">' + (ready ? "Готов" : "Ждет") + '</small>' : "";
    var playerClass = "sng-champions-modal__bracket-player" +
      (advanced ? " sng-champions-modal__bracket-player--advanced" : "") +
      (ready && !won && !match.winnerId ? " sng-champions-modal__bracket-player--ready" : "") +
      (won ? " sng-champions-modal__bracket-player--winner" : "");
    return '<div class="' + playerClass + '">' +
      '<span>' + escapeHtml(playerName(player)) + '</span>' +
      readyBadge +
      (won ? '<strong>Победитель</strong>' : adminButton) +
    '</div>';
  }

  function formatReadyCountdown(match, data) {
    if (!match || !match.readyDeadlineAt || match.winnerId) return "";
    if (match.playingAt) return "Играют";
    var end = Date.parse(match.readyDeadlineAt);
    var base = Date.now();
    if (!isFinite(end)) return "";
    var diff = Math.max(0, end - (isFinite(base) ? base : Date.now()));
    var hours = Math.floor(diff / 3600000);
    var mins = Math.floor((diff % 3600000) / 60000);
    if (diff <= 0) return "Таймер истек";
    if (hours >= 1) return "До готовности: " + String(hours) + "ч " + String(mins).padStart(2, "0") + "м";
    return "До готовности: " + String(mins || 1) + "м";
  }

  function renderReadyAction(match, players, data) {
    if (!data || data.status !== "bracket" || !match || match.winnerId || players.length < 2) return "";
    var myId = data.myEntryId || (data.myEntry && data.myEntry.id) || "";
    if (!myId || players.indexOf(myId) < 0) return "";
    if (match.readyById && match.readyById[myId] === true) {
      return '<div class="sng-champions-modal__ready-action sng-champions-modal__ready-action--done">Вы нажали «Готов»</div>';
    }
    return '<button type="button" class="sng-champions-modal__ready-btn" data-sng-ready="' + escapeHtml(match.id || "") + '">Готов</button>';
  }

  function renderPlayingAction(match, players, data) {
    if (!data || !data.isAdmin || data.status !== "bracket" || !match || match.winnerId || players.length < 2) return "";
    var active = !!match.playingAt;
    return '<button type="button" class="sng-champions-modal__playing-btn' + (active ? " sng-champions-modal__playing-btn--active" : "") + '" data-sng-playing="' + escapeHtml(match.id || "") + '">' + (active ? "Играют" : "Играют") + '</button>';
  }

  function renderBracketMatch(match, data) {
    var players = (match.playerIds || []).filter(Boolean);
    var countdown = formatReadyCountdown(match, data);
    var matchClass = "sng-champions-modal__bracket-match" +
      (match.playingAt && !match.winnerId ? " sng-champions-modal__bracket-match--playing" : "") +
      (match.winnerId ? " sng-champions-modal__bracket-match--done" : "");
    return '<article class="' + matchClass + '">' +
      '<header>Пара ' + escapeHtml(match.index || "") + (countdown ? '<small>' + escapeHtml(countdown) + '</small>' : '') + '</header>' +
      (players.length ? players.map(function (id) {
        return renderBracketPlayer((data.playersById && data.playersById[id]) || { id: id, displayName: "Игрок" }, match, data);
      }).join("") : '<div class="club-choice-vote-modal__empty">Ожидает победителей.</div>') +
      renderPlayingAction(match, players, data) +
      renderReadyAction(match, players, data) +
    '</article>';
  }

  function playerAdvancedToOpenMatch(id, match, data) {
    if (!id || !match || match.winnerId) return false;
    var rounds = data && Array.isArray(data.rounds) ? data.rounds : [];
    for (var i = 0; i < rounds.length; i += 1) {
      var matches = rounds[i] && Array.isArray(rounds[i].matches) ? rounds[i].matches : [];
      for (var j = 0; j < matches.length; j += 1) {
        if (matches[j] && matches[j].winnerId === id && matches[j].id !== match.id) return true;
      }
    }
    return false;
  }

  function renderBracketMapPlayer(id, match, data) {
    var player = (data.playersById && data.playersById[id]) || { id: id, displayName: "Игрок" };
    var won = match.winnerId && match.winnerId === id;
    var advanced = playerAdvancedToOpenMatch(id, match, data);
    return '<span class="sng-champions-modal__map-player' + (advanced ? " sng-champions-modal__map-player--advanced" : "") + (won ? " sng-champions-modal__map-player--winner" : "") + '">' + escapeHtml(playerName(player)) + '</span>';
  }

  function renderBracketMapMatch(match, data) {
    var players = (match.playerIds || []).filter(Boolean);
    return '<article class="sng-champions-modal__map-match' + (match.winnerId ? " sng-champions-modal__map-match--done" : "") + '">' +
      '<span class="sng-champions-modal__map-match-index">' + escapeHtml(match.index || "") + '</span>' +
      '<span class="sng-champions-modal__map-players">' +
        (players.length ? players.map(function (id) { return renderBracketMapPlayer(id, match, data); }).join("") : '<span class="sng-champions-modal__map-player">ждет</span>') +
      '</span>' +
    '</article>';
  }

  function renderBracketMap(rounds, data, isPreview) {
    var expandedClass = bracketMapExpanded ? " sng-champions-modal__bracket-map-wrap--expanded" : "";
    return '<section class="sng-champions-modal__bracket-map-wrap' + expandedClass + (isPreview ? " sng-champions-modal__bracket-map-wrap--preview" : "") + '" aria-label="Миниатюрная сетка всего турнира">' +
      '<div class="sng-champions-modal__bracket-map-head">' +
        '<strong>Вся сетка</strong>' +
        '<button type="button" data-sng-bracket-map="' + (bracketMapExpanded ? "close" : "open") + '">' + (bracketMapExpanded ? "Закрыть" : "Увеличить") + '</button>' +
      '</div>' +
      '<div class="sng-champions-modal__bracket-map" role="img" aria-label="Обзор всех этапов СНГ Лиги Чемпионов">' +
        rounds.map(function (round, index) {
          return '<div class="sng-champions-modal__map-round' + (index === activeBracketStage ? " sng-champions-modal__map-round--active" : "") + '">' +
            '<button type="button" class="sng-champions-modal__map-round-title" data-sng-stage-index="' + escapeHtml(index) + '">' + escapeHtml(roundStageLabel(round, index, rounds)) + '</button>' +
            '<div class="sng-champions-modal__map-round-matches">' +
              ((round.matches || []).map(function (match) { return renderBracketMapMatch(match, data); }).join("") || '<span class="sng-champions-modal__map-empty">Пусто</span>') +
            '</div>' +
          '</div>';
        }).join("") +
      '</div>' +
    '</section>';
  }

  function renderBracket(data) {
    var realRounds = data.rounds || [];
    var isPreview = !realRounds.length;
    var rounds = isPreview ? buildBracketSkeletonRounds() : realRounds;
    var previewData = data;
    if (isPreview) {
      previewData = Object.assign({}, data, {
        currentRoundId: "",
        isAdmin: false,
        playersById: buildBracketSkeletonPlayers(rounds),
      });
    }
    if (activeBracketStage < 0) activeBracketStage = 0;
    if (activeBracketStage >= rounds.length) activeBracketStage = rounds.length - 1;
    var round = rounds[activeBracketStage] || rounds[0];
    var active = data.currentRoundId && data.currentRoundId === round.id;
    var stageLabel = roundStageLabel(round, activeBracketStage, rounds);
    var stageClass = roundStageClass(round, activeBracketStage, rounds);
    var showRoundLabel = stageClass === "quarter" || stageClass === "semi";
    var prevDisabled = activeBracketStage <= 0;
    var nextDisabled = activeBracketStage >= rounds.length - 1;
    return '<div class="sng-champions-modal__bracket-slider' + (isPreview ? " sng-champions-modal__bracket-slider--preview" : "") + '">' +
      '<div class="sng-champions-modal__stage-head">' +
        '<button type="button" class="sng-champions-modal__stage-arrow" data-sng-stage="prev"' + (prevDisabled ? " disabled" : "") + ' aria-label="Предыдущий этап">‹</button>' +
        '<div>' +
          '<span>Этап ' + escapeHtml(activeBracketStage + 1) + ' из ' + escapeHtml(rounds.length) + '</span>' +
          '<strong>' + escapeHtml(stageLabel) + '</strong>' +
          (isPreview ? '<em>предпросмотр сетки</em>' : active ? '<em>текущий этап</em>' : '') +
        '</div>' +
        '<button type="button" class="sng-champions-modal__stage-arrow" data-sng-stage="next"' + (nextDisabled ? " disabled" : "") + ' aria-label="Следующий этап">›</button>' +
      '</div>' +
      '<section class="sng-champions-modal__round sng-champions-modal__round--slider' + (active ? " sng-champions-modal__round--active" : "") + (stageClass ? " sng-champions-modal__round--" + stageClass : "") + '">' +
        (showRoundLabel ? '<div class="sng-champions-modal__round-label">' + escapeHtml(stageLabel) + '</div>' : '') +
        '<div class="sng-champions-modal__round-matches sng-champions-modal__round-matches--slider">' +
          ((round.matches || []).map(function (match) { return renderBracketMatch(match, previewData); }).join("") || '<div class="club-choice-vote-modal__empty">Пары пустые.</div>') +
        '</div>' +
      '</section>' +
      '<div class="sng-champions-modal__stage-dots" aria-label="Этапы сетки">' + rounds.map(function (item, index) {
        return '<button type="button" class="' + (index === activeBracketStage ? "is-active" : "") + '" data-sng-stage-index="' + escapeHtml(index) + '">' + escapeHtml(roundStageLabel(item, index, rounds)) + '</button>';
      }).join("") + '</div>' +
      renderBracketMap(rounds, previewData, isPreview) +
    '</div>';
  }

  function render() {
    ensureModal();
    var data = state || {};
    setStatus("");
    bodyEl.innerHTML = renderTabs(renderCreate(data), renderSignup(data), renderBracket(data), data);
    updateJoinDockBodyClass();
  }

  function updateHomePlaque() {
    if (!state) return;
    var buttons = Array.prototype.slice.call(document.querySelectorAll("[data-sng-open], #sngChampionsOpen"));
    if (!buttons.length) return;
    var approved = (state.counts && state.counts.approved) || 0;
    buttons.forEach(function (button) {
      var count = button.querySelector(".home-club-choice-plaque__count");
      var sub = button.querySelector(".home-club-choice-plaque__subtext");
      if (count) count.textContent = String(approved) + "/" + String(state.capacity || 32);
      if (sub) {
        if (state.status === "open") sub.textContent = "Запись открыта";
        else if (state.status === "bracket") sub.textContent = "Сетка идет";
        else if (state.status === "completed") sub.textContent = "Итоги готовы";
        else sub.textContent = "Запись закрыта";
      }
    });
  }

  function readSettingsPayload(actionName) {
    if ((actionName !== "open" && actionName !== "updateSettings") || !modal) return { action: actionName };
    var description = modal.querySelector("[data-sng-description]");
    var buyIn = modal.querySelector("[data-sng-buy-in]");
    var prize1 = modal.querySelector("[data-sng-prize1]");
    var prize2 = modal.querySelector("[data-sng-prize2]");
    return {
      action: actionName,
      description: description ? description.value : "",
      buyIn: buyIn ? buyIn.value : "",
      prize1: prize1 ? prize1.value : "",
      prize2: prize2 ? prize2.value : "",
    };
  }

  function onModalClick(event) {
    var close = event.target && event.target.closest ? event.target.closest("[data-sng-close]") : null;
    if (close) {
      closeModal();
      return;
    }
    var tab = event.target && event.target.closest ? event.target.closest("[data-sng-tab]") : null;
    if (tab) {
      setTab(tab.getAttribute("data-sng-tab"));
      return;
    }
    var share = event.target && event.target.closest ? event.target.closest("[data-sng-share]") : null;
    if (share) {
      shareSng();
      return;
    }
    var copy = event.target && event.target.closest ? event.target.closest("[data-sng-copy]") : null;
    if (copy) {
      copySngLink();
      return;
    }
    var approve = event.target && event.target.closest ? event.target.closest("[data-sng-approve]") : null;
    if (approve) {
      setButtonLoading(approve, true);
      postAction({ action: "approve", accountId: approve.getAttribute("data-sng-approve") || "" }, { status: "Подтверждаю заявку...", success: "Заявка подтверждена" })
        .finally(function () { setButtonLoading(approve, false); });
      return;
    }
    var profile = event.target && event.target.closest ? event.target.closest("[data-sng-profile]") : null;
    if (profile) {
      var profileId = profile.getAttribute("data-sng-profile") || "";
      var profileName = profile.getAttribute("data-sng-profile-name") || "Игрок";
      var profileAvatar = profile.getAttribute("data-sng-profile-avatar") || "";
      if (!profileId) return;
      if (typeof window.pokerOpenChatUserModalSafe === "function") {
        window.pokerOpenChatUserModalSafe(profileId, profileName, profileAvatar).catch(function () {
          showAlert("Не удалось открыть профиль.");
        });
      } else if (typeof window.openChatUserModalById === "function") {
        window.openChatUserModalById(profileId, profileName, profileAvatar);
      } else {
        showAlert("Профиль пока загружается. Попробуйте еще раз.");
      }
      return;
    }
    var requestBalance = event.target && event.target.closest ? event.target.closest("[data-sng-request-balance]") : null;
    if (requestBalance) {
      setButtonLoading(requestBalance, true);
      postAction({ action: "requestBalance", accountId: requestBalance.getAttribute("data-sng-request-balance") || "" }, { status: "Запрашиваю пополнение баланса...", success: "Запрос на пополнение отправлен" })
        .finally(function () { setButtonLoading(requestBalance, false); });
      return;
    }
    var reject = event.target && event.target.closest ? event.target.closest("[data-sng-reject]") : null;
    if (reject) {
      setButtonLoading(reject, true);
      postAction({ action: "reject", accountId: reject.getAttribute("data-sng-reject") || "" }, { status: "Отклоняю заявку...", success: "Заявка отклонена" })
        .finally(function () { setButtonLoading(reject, false); });
      return;
    }
    var ready = event.target && event.target.closest ? event.target.closest("[data-sng-ready]") : null;
    if (ready) {
      setButtonLoading(ready, true);
      postAction({
        action: "setReady",
        matchId: ready.getAttribute("data-sng-ready") || "",
      }, { status: "Отмечаю готовность...", success: "Готовность сохранена" })
        .finally(function () { setButtonLoading(ready, false); });
      return;
    }
    var playing = event.target && event.target.closest ? event.target.closest("[data-sng-playing]") : null;
    if (playing) {
      setButtonLoading(playing, true);
      postAction({
        action: "setPlaying",
        matchId: playing.getAttribute("data-sng-playing") || "",
      }, { status: "Отмечаю матч...", success: "Матч отмечен как играющий" })
        .finally(function () { setButtonLoading(playing, false); });
      return;
    }
    var winner = event.target && event.target.closest ? event.target.closest("[data-sng-winner]") : null;
    if (winner) {
      setButtonLoading(winner, true);
      postAction({
        action: "setWinner",
        matchId: winner.getAttribute("data-sng-winner") || "",
        playerId: winner.getAttribute("data-sng-player") || "",
      }, { status: "Обновляю сетку...", success: "Победитель пары сохранен" })
        .finally(function () { setButtonLoading(winner, false); });
      return;
    }
    var stage = event.target && event.target.closest ? event.target.closest("[data-sng-stage]") : null;
    if (stage) {
      activeBracketStage += stage.getAttribute("data-sng-stage") === "next" ? 1 : -1;
      render();
      setTab("bracket");
      return;
    }
    var stageIndex = event.target && event.target.closest ? event.target.closest("[data-sng-stage-index]") : null;
    if (stageIndex) {
      activeBracketStage = Math.max(0, Number(stageIndex.getAttribute("data-sng-stage-index")) || 0);
      render();
      setTab("bracket");
      return;
    }
    var bracketMap = event.target && event.target.closest ? event.target.closest("[data-sng-bracket-map]") : null;
    if (bracketMap) {
      bracketMapExpanded = bracketMap.getAttribute("data-sng-bracket-map") === "open";
      render();
      setTab("bracket");
      return;
    }
    var action = event.target && event.target.closest ? event.target.closest("[data-sng-action]") : null;
    if (!action) return;
    var name = action.getAttribute("data-sng-action") || "";
    if (name === "reset" && !window.confirm("Сбросить СНГ Лигу Чемпионов Два Туза?")) return;
    setButtonLoading(action, true);
    postAction(readSettingsPayload(name), {
      status: "Идет загрузка...",
      success: name === "join" ? "Заявка отправлена" : name === "formPairs" ? "Пары сформированы" : name === "broadcastRoundOnePairs" ? "Пары 1/16 разосланы" : name === "updateSettings" ? "Изменения сохранены" : "",
    }).finally(function () {
      setButtonLoading(action, false);
    });
  }

  function bind() {
    if (!document.documentElement.dataset.sngChampionsOpenBound) {
      document.documentElement.dataset.sngChampionsOpenBound = "1";
      document.addEventListener("click", function (event) {
        var trigger = event.target && event.target.closest ? event.target.closest("[data-sng-open], #sngChampionsOpen") : null;
        if (!trigger) return;
        updateHomePlaque();
        openModal();
      });
    }
    if (!document.documentElement.dataset.sngChampionsPlaqueObserverBound && window.MutationObserver) {
      document.documentElement.dataset.sngChampionsPlaqueObserverBound = "1";
      new MutationObserver(function (mutations) {
        if (!state) return;
        for (var i = 0; i < mutations.length; i++) {
          var nodes = mutations[i].addedNodes || [];
          for (var j = 0; j < nodes.length; j++) {
            var node = nodes[j];
            if (!node || node.nodeType !== 1) continue;
            if ((node.matches && node.matches("[data-sng-open], #sngChampionsOpen")) || (node.querySelector && node.querySelector("[data-sng-open], #sngChampionsOpen"))) {
              updateHomePlaque();
              return;
            }
          }
        }
      }).observe(document.body, { childList: true, subtree: true });
    }
    if (window.__pokerHomeWidgetOpening !== "sngChampions") {
      fetchHomeSummary().then(function (data) {
        if (data && data.ok) {
          state = data;
          updateHomePlaque();
        }
      }).catch(function () {});
    }
  }

  window.openSngChampionsModal = openModal;

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
  else bind();
})();
