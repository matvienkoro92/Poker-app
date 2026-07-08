(function () {
  "use strict";

  var API_PATH = "/api/club-choice-vote";
  var CLUB_CHOICE_START_PARAM = "club_choice_vote";
  var CLUB_CHOICE_CURRENT_START_PARAM = "club_choice_vote_current";
  var timer = null;
  var state = null;
  var loading = false;
  var modal = null;
  var bodyEl = null;
  var statusEl = null;
  var activeRoundTab = "votes";
  var activeVotesRoundId = "";
  var homePlaqueTimer = null;
  var copyFeedbackTimer = null;
  var homePlaqueLoading = false;
  var homePlaqueState = null;
  var homeSummaryInFlight = null;
  var homeSummaryLoadedAt = 0;
  var HOME_SUMMARY_CACHE_MS = 45000;

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

  function voteLink() {
    if (typeof buildMiniAppStartLink === "function") return buildMiniAppStartLink(CLUB_CHOICE_CURRENT_START_PARAM);
    if (typeof pokerBuildWebsiteStartLink === "function") {
      var webLink = pokerBuildWebsiteStartLink(CLUB_CHOICE_CURRENT_START_PARAM);
      if (webLink) return webLink;
    }
    var base = typeof getAppBaseUrlForLinks === "function" ? getAppBaseUrlForLinks() : "";
    if (!base && window.location) base = String(window.location.origin || "") + "/";
    base = String(base || "").trim().replace(/\/+$/, "");
    return base ? base + (base.indexOf("?") >= 0 ? "&" : "?") + "startapp=" + encodeURIComponent(CLUB_CHOICE_CURRENT_START_PARAM) : "";
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

  function shareVote() {
    var link = voteLink();
    var text = "Клубное голосование «Два туза»: выбери достижение месяца.";
    if (!link) {
      showAlert("Не удалось сформировать ссылку.");
      return;
    }
    if (typeof recordShareButtonClick === "function") {
      try { recordShareButtonClick("club_choice_vote"); } catch (eShareTrack) {}
    }
    if (typeof pokerTryPwaWebShare === "function") {
      pokerTryPwaWebShare({ title: "Достижение месяца", text: text + "\n" + link, url: link }).then(function (ok) {
        if (ok) return;
        openTelegramShare(link, text);
      });
      return;
    }
    openTelegramShare(link, text);
  }

  function setCopyFeedback(ok, text) {
    if (copyFeedbackTimer) {
      clearTimeout(copyFeedbackTimer);
      copyFeedbackTimer = null;
    }
    if (!modal) return;
    var button = modal.querySelector("[data-club-choice-copy]");
    var feedback = modal.querySelector("[data-club-choice-copy-feedback]");
    if (button) {
      if (!button.dataset.defaultLabel) button.dataset.defaultLabel = button.textContent || "Скопировать";
      button.classList.toggle("club-choice-vote-modal__share--copied", !!ok);
      button.textContent = ok ? "Скопировано" : button.dataset.defaultLabel;
    }
    if (feedback) {
      feedback.textContent = text || "";
      feedback.classList.toggle("club-choice-vote-modal__copy-feedback--visible", !!text);
    }
    copyFeedbackTimer = setTimeout(function () {
      if (button) {
        button.classList.remove("club-choice-vote-modal__share--copied");
        button.textContent = button.dataset.defaultLabel || "Скопировать";
      }
      if (feedback) {
        feedback.textContent = "";
        feedback.classList.remove("club-choice-vote-modal__copy-feedback--visible");
      }
      copyFeedbackTimer = null;
    }, 2200);
  }

  function copyVoteLink() {
    var link = voteLink();
    if (!link) {
      showAlert("Не удалось сформировать ссылку.");
      return;
    }
    var copy = typeof pokerCopyTextToClipboard === "function"
      ? pokerCopyTextToClipboard(link)
      : Promise.resolve(false);
    copy.then(function (ok) {
      if (ok) {
        setCopyFeedback(true, "Ссылка скопирована");
        return;
      }
      setCopyFeedback(false, "Не удалось скопировать");
      showAlert("Скопируйте ссылку вручную: " + link);
    }).catch(function () {
      setCopyFeedback(false, "Не удалось скопировать");
      showAlert("Скопируйте ссылку вручную: " + link);
    });
  }

  function openCandidateProfile(profileEl) {
    if (!profileEl) return;
    var nick = String(profileEl.getAttribute("data-club-choice-profile-nick") || "").trim();
    var ratingNick = String(profileEl.getAttribute("data-club-choice-rating-nick") || "").trim() || clubChoiceRatingNick(nick);
    var profileId = String(profileEl.getAttribute("data-club-choice-profile-id") || "").trim();
    var profileNick = ratingNick || nick;
    var hasUnifiedByNick = profileNick && typeof window.pokerOpenUnifiedPlayerProfileByRatingNick === "function";
    var hasTournamentProfile = profileNick && typeof window.pokerOpenTournamentRatingPlayer === "function";
    var hasLatestRatingProfile = profileNick && typeof window.pokerOpenLatestTournamentRatingPlayerModal === "function";
    var hasChatProfile = profileId && typeof window.openChatUserModalById === "function";
    if (!hasUnifiedByNick && !hasTournamentProfile && !hasLatestRatingProfile && !hasChatProfile) {
      showAlert("Профиль игрока пока недоступен.");
      return;
    }
    try {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
    } catch (eExpand) {}

    function openProfileOverlay(openProfile) {
      var openResult = null;
      try {
        openResult = openProfile();
      } catch (eOpen) {
        showAlert("Не удалось открыть профиль игрока.");
        return;
      }
      if (openResult && typeof openResult.then === "function") {
        openResult.catch(function () {
          showAlert("Не удалось открыть профиль игрока.");
        });
      }
    }

    if (hasUnifiedByNick) {
      openProfileOverlay(function () {
        return window.pokerOpenUnifiedPlayerProfileByRatingNick(profileNick, { season: "summer" });
      });
      return;
    }
    if (hasTournamentProfile) {
      openProfileOverlay(function () {
        return window.pokerOpenTournamentRatingPlayer(profileNick, { season: "summer" });
      });
      return;
    }
    if (hasChatProfile) {
      window.openChatUserModalById(profileId, nick || "Игрок", null);
      return;
    }
    openProfileOverlay(function () {
      return window.pokerOpenLatestTournamentRatingPlayerModal(nick, { season: "summer" });
    });
  }

  function monthLabel(monthKey) {
    var raw = String(monthKey || "").trim();
    var parts = raw.match(/^(\d{4})-(\d{2})$/);
    if (!parts) return "месяца";
    var names = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
    var idx = parseInt(parts[2], 10) - 1;
    return (names[idx] || "месяц") + " " + parts[1];
  }

  function monthNameOnly(monthKey) {
    var label = monthLabel(monthKey).split(/\s+/)[0] || "месяц";
    return label.charAt(0).toUpperCase() + label.slice(1);
  }

  function candidateMap(data) {
    var map = {};
    (data && data.candidates || []).forEach(function (candidate) {
      if (candidate && candidate.id) map[candidate.id] = candidate;
    });
    return map;
  }

  function clubChoiceCanonicalNick(nick) {
    var raw = String(nick || "").trim();
    var key = raw.toLowerCase().replace(/\s+/g, " ");
    if (key === "em13" || key === "em13!!" || (key.indexOf("эмиль") >= 0 && key.indexOf("em13") >= 0)) return "Em13!!";
    return raw;
  }

  function clubChoiceRatingNick(nick) {
    var raw = String(nick || "").trim();
    var key = raw.toLowerCase().replace(/\s+/g, " ");
    if (!key) return raw;
    if (key === "odna.pluha" || key === "илья odna.pluha") return "odna.pluha";
    if (key === "бардюр") return "Бардюр";
    if (key === "fishkopcheny" || key === "фишкопченый" || key === "фишкапченый") return "FishKopcheny";
    if (key === "voron" || key === "ворон" || key === "voron💰💰💰") return "VORON💰💰💰";
    if (key === "em13" || key === "em13!!" || (key.indexOf("эмиль") >= 0 && key.indexOf("em13") >= 0)) return "Em13!!";
    return clubChoiceCanonicalNick(raw);
  }

  function clubChoiceDisplayNick(nick) {
    var raw = String(nick || "").trim();
    var key = raw.toLowerCase().replace(/\s+/g, " ");
    if (key === "odna.pluha" || key === "илья odna.pluha") return "odna.pluha";
    if (key === "бардюр") return "Бардюр";
    if (key === "fishkopcheny" || key === "фишкопченый" || key === "фишкапченый") return "FishKopcheny";
    if (key === "voron" || key === "ворон" || key === "voron💰💰💰") return "VORON💰💰💰";
    return clubChoiceCanonicalNick(raw);
  }

  function formatLeft(ms) {
    var total = Math.max(0, Math.floor(ms / 1000));
    var h = Math.floor(total / 3600);
    var m = Math.floor((total % 3600) / 60);
    var s = total % 60;
    return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  }

  function currentRound(data) {
    var id = data && data.currentRoundId;
    return (data && data.rounds || []).filter(function (round) { return round && round.id === id; })[0] || null;
  }

  function voteRounds(data) {
    var currentId = String(data && data.currentRoundId || "");
    var rounds = (data && data.rounds || []).filter(function (round) { return round && round.id; });
    return rounds.slice().sort(function (a, b) {
      if (String(a.id) === currentId) return -1;
      if (String(b.id) === currentId) return 1;
      return (Number(b.index) || 0) - (Number(a.index) || 0);
    });
  }

  function roundShortLabel(round) {
    if (!round) return "Раунд";
    var name = String(round.name || "").trim().toLowerCase();
    if (name.indexOf("финал") >= 0 || String(round.side || "") === "final") return "Финал";
    var index = parseInt(round.index, 10);
    if (isFinite(index) && index > 0) return String(index) + "ый раунд";
    return String(round.name || "Раунд");
  }

  function accessLabel(value) {
    if (value === "level1") return "Уровень 1+";
    if (value === "level10") return "Уровень 10+";
    if (value === "level25") return "Уровень 25+";
    if (value === "level50") return "Уровень 50+";
    return "Все авторизованные";
  }

  function votingAccessHint(value) {
    var label = accessLabel(value);
    if (value === "all") return "Голосовать могут все авторизованные игроки";
    return "Голосовать могут только игроки " + label.toLowerCase();
  }

  function setStatus(text) {
    if (statusEl) statusEl.textContent = String(text || "");
  }

  function ensureModal() {
    if (modal) return modal;
    modal = document.createElement("div");
    modal.className = "club-choice-vote-modal";
    modal.innerHTML =
      '<div class="club-choice-vote-modal__backdrop" data-club-choice-close="1"></div>' +
      '<section class="club-choice-vote-modal__panel" role="dialog" aria-modal="true" aria-labelledby="clubChoiceVoteTitle">' +
        '<header class="club-choice-vote-modal__head">' +
          '<div>' +
            '<p class="club-choice-vote-modal__eyebrow">Клубное голосование</p>' +
            '<h2 class="club-choice-vote-modal__title" id="clubChoiceVoteTitle">Достижение месяца</h2>' +
          '</div>' +
          '<button type="button" class="club-choice-vote-modal__close" data-club-choice-close="1" aria-label="Закрыть">×</button>' +
        '</header>' +
        '<div class="club-choice-vote-modal__status" id="clubChoiceVoteStatus" role="status" aria-live="polite"></div>' +
        '<div class="club-choice-vote-modal__body" id="clubChoiceVoteBody">' +
          '<div class="club-choice-vote-modal__loading">Идет загрузка...</div>' +
        '</div>' +
        '<footer class="club-choice-vote-modal__footer" aria-label="Поделиться голосованием">' +
          '<button type="button" class="club-choice-vote-modal__share club-choice-vote-modal__share--primary" data-club-choice-share="1">Поделиться</button>' +
          '<button type="button" class="club-choice-vote-modal__share club-choice-vote-modal__share--copy" data-club-choice-copy="1">Скопировать</button>' +
          '<span class="club-choice-vote-modal__copy-feedback" data-club-choice-copy-feedback role="status" aria-live="polite"></span>' +
        '</footer>' +
      '</section>';
    document.body.appendChild(modal);
    bodyEl = document.getElementById("clubChoiceVoteBody");
    statusEl = document.getElementById("clubChoiceVoteStatus");
    modal.addEventListener("click", onModalClick);
    modal.addEventListener("keydown", onModalKeydown);
    modal.addEventListener("submit", onModalSubmit);
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && modal.classList.contains("club-choice-vote-modal--open")) closeModal();
    });
    return modal;
  }

  function openModal() {
    ensureModal();
    try {
      if (typeof window.pokerRecordSectionViewOpen === "function") window.pokerRecordSectionViewOpen("club-choice-vote");
    } catch (eTrack) {}
    activeRoundTab = "votes";
    activeVotesRoundId = "";
    modal.classList.add("club-choice-vote-modal--open");
    document.body.classList.add("club-choice-vote-open");
    renderLoading();
    loadState();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("club-choice-vote-modal--open");
    document.body.classList.remove("club-choice-vote-open");
    stopTimer();
  }

  function renderLoading() {
    ensureModal();
    if (bodyEl) bodyEl.classList.remove("club-choice-vote-modal__body--tournament");
    if (bodyEl) bodyEl.innerHTML = '<div class="club-choice-vote-modal__loading">Идет загрузка...</div>';
    setStatus("");
  }

  function fetchState() {
    var base = baseUrl();
    return fetch(base + API_PATH + apiAuthQuery("?") + "&_t=" + Date.now(), { cache: "no-store" }).then(function (res) {
      return res.json();
    });
  }

  function fetchHomeSummary(force) {
    var now = Date.now();
    if (!force && homePlaqueState && homePlaqueState.summary && homeSummaryLoadedAt && now - homeSummaryLoadedAt < HOME_SUMMARY_CACHE_MS) {
      return Promise.resolve(homePlaqueState);
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
        homePlaqueState = data;
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

  function homePlaqueText(data) {
    if (!data || !data.ok) return "Открыть голосование";
    if (data.status === "active") {
      if (data.paused === true) return "Голосование на паузе";
      var round = currentRound(data);
      var end = Date.parse(round && round.endsAt || "");
      if (end) return roundShortLabel(round) + " · " + formatLeft(end - Date.now());
      return roundShortLabel(round);
    }
    if (data.status === "completed") return "Итоги готовы";
    return "Открыть голосование";
  }

  function updateHomePlaque() {
    var plaque = document.getElementById("clubChoiceVoteOpen");
    if (!plaque) return;
    var data = homePlaqueState || state;
    var subtext = plaque.querySelector(".home-club-choice-plaque__subtext");
    var count = plaque.querySelector(".home-club-choice-plaque__count");
    var completed = !!(data && data.status === "completed");
    if (subtext) subtext.textContent = homePlaqueText(data);
    if (count) {
      count.hidden = completed;
      count.setAttribute("aria-hidden", completed ? "true" : "false");
    }
    var round = data && data.status === "active" ? currentRound(data) : null;
    var end = Date.parse(round && round.endsAt || "");
    if (end && end <= Date.now() && !homePlaqueLoading) refreshHomePlaqueState(true);
  }

  function startHomePlaqueTimer() {
    if (homePlaqueTimer) return;
    var plaque = document.getElementById("clubChoiceVoteOpen");
    if (
      plaque &&
      !plaque.querySelector(".home-club-choice-plaque__subtext") &&
      !plaque.querySelector(".home-club-choice-plaque__count")
    ) {
      return;
    }
    homePlaqueTimer = window.setInterval(updateHomePlaque, 1000);
  }

  function refreshHomePlaqueState(force) {
    if (homePlaqueLoading) return;
    homePlaqueLoading = true;
    fetchHomeSummary(!!force)
      .then(function (data) {
        if (data && data.ok) {
          homePlaqueState = data;
          updateHomePlaque();
        }
      })
      .catch(function () {})
      .finally(function () {
        homePlaqueLoading = false;
      });
  }

  function restoreBodyScroll(top) {
    if (!bodyEl || top == null) return;
    window.requestAnimationFrame(function () {
      bodyEl.scrollTop = top;
    });
  }

  function setVoteButtonLoading(button, active) {
    if (!button) return;
    button.classList.toggle("club-choice-vote-modal__vote-loading", !!active);
    button.disabled = !!active;
    if (active) {
      button.setAttribute("aria-busy", "true");
      button.setAttribute("data-club-choice-loading-label", "Идет загрузка...");
    } else {
      button.removeAttribute("aria-busy");
      button.removeAttribute("data-club-choice-loading-label");
    }
  }

  function postAction(payload, opts) {
    opts = opts || {};
    var base = baseUrl();
    var keepScrollTop = opts.preserveScroll && bodyEl ? bodyEl.scrollTop : null;
    if (!opts.quiet) setStatus("Идет загрузка...");
    return fetch(base + API_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiBody(payload || {})),
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data && data.state && data.state.ok) {
          state = data.state;
          homePlaqueState = state;
          render();
          restoreBodyScroll(keepScrollTop);
          return state;
        }
        if (!data || !data.ok) throw new Error((data && data.error) || "Ошибка");
        state = data;
        homePlaqueState = data;
        render();
        restoreBodyScroll(keepScrollTop);
        return data;
      })
      .catch(function (error) {
        showAlert(error.message || "Ошибка");
        setStatus("");
      });
  }

  function renderCandidateList(data) {
    var rows = data.candidates || [];
    if (!rows.length) return '<div class="club-choice-vote-modal__empty">Кандидаты пока не добавлены.</div>';
    return '<div class="club-choice-vote-modal__candidates">' + rows.map(function (candidate) {
      return '<article class="club-choice-vote-modal__candidate">' +
        '<div class="club-choice-vote-modal__candidate-main" data-club-choice-candidate-view>' +
          '<strong>' + escapeHtml(candidate.nick) + '</strong>' +
          '<span>' + escapeHtml(candidate.description || "Без описания") + '</span>' +
        '</div>' +
        (data.isAdmin && data.status === "draft"
          ? '<div class="club-choice-vote-modal__candidate-actions" data-club-choice-candidate-view>' +
              '<button type="button" class="club-choice-vote-modal__ghost" data-club-choice-edit="' + escapeHtml(candidate.id) + '">Редактировать</button>' +
              '<button type="button" class="club-choice-vote-modal__ghost" data-club-choice-remove="' + escapeHtml(candidate.id) + '">Убрать</button>' +
            '</div>' +
            '<form class="club-choice-vote-modal__candidate-edit" data-club-choice-form="candidate-edit" data-club-choice-candidate-form="' + escapeHtml(candidate.id) + '" hidden>' +
              '<label>Никнейм<input name="nick" maxlength="48" autocomplete="off" value="' + escapeHtml(candidate.nick || "") + '" required></label>' +
              '<label>Описание<textarea name="description" maxlength="180" rows="2">' + escapeHtml(candidate.description || "") + '</textarea></label>' +
              '<div class="club-choice-vote-modal__candidate-actions">' +
                '<button type="submit" class="club-choice-vote-modal__primary">Сохранить</button>' +
                '<button type="button" class="club-choice-vote-modal__ghost" data-club-choice-cancel-edit="' + escapeHtml(candidate.id) + '">Отмена</button>' +
              '</div>' +
            '</form>'
          : '') +
      '</article>';
    }).join("") + "</div>";
  }

  function renderAdminDraft(data) {
    if (!data.isAdmin) return "";
    var monthKey = String(data.monthKey || "").match(/^\d{4}-\d{2}$/) ? data.monthKey : "";
    return '<section class="club-choice-vote-modal__admin">' +
      '<form class="club-choice-vote-modal__form" data-club-choice-form="candidate">' +
        '<label>Никнейм<input name="nick" maxlength="48" autocomplete="off" placeholder="Ник игрока" required></label>' +
        '<label>Описание<textarea name="description" maxlength="180" rows="2" placeholder="Почему этот игрок в списке"></textarea></label>' +
        '<button type="submit" class="club-choice-vote-modal__primary">Добавить кандидата</button>' +
      '</form>' +
      '<form class="club-choice-vote-modal__start" data-club-choice-form="start">' +
        '<label>Месяц опроса<input name="monthKey" type="month" value="' + escapeHtml(monthKey) + '" required></label>' +
        '<label>Кто голосует<select name="accessLevel">' +
          '<option value="all">Все авторизованные</option>' +
          '<option value="level1">Уровень 1+</option>' +
          '<option value="level10">Уровень 10+</option>' +
          '<option value="level25">Уровень 25+</option>' +
          '<option value="level50">Уровень 50+</option>' +
        '</select></label>' +
        '<label class="club-choice-vote-modal__check"><input type="checkbox" name="anonymous" checked> Анонимный опрос</label>' +
        '<button type="submit" class="club-choice-vote-modal__primary club-choice-vote-modal__primary--gold"' +
          + ((data.candidates || []).length < 2 ? " disabled" : "") + '>Запустить голосование</button>' +
      '</form>' +
    '</section>';
  }

  function renderDraft(data) {
    setStatus("Голосование еще не запущено");
    bodyEl.innerHTML =
      '<div class="club-choice-vote-modal__summary">' +
        '<span>Достижение месяца</span>' +
        '<strong>' + escapeHtml(monthLabel(data.monthKey)) + '</strong>' +
        '<p class="club-choice-vote-modal__summary-desc">Здесь клуб выбирает главное достижение месяца. В кандидаты попадают игроки, которые за месяц отметились крупным заносом, победой, сильным рывком в рейтинге или вкладом в жизнь клуба.</p>' +
      '</div>' +
      renderAdminDraft(data) +
      '<h3 class="club-choice-vote-modal__section-title">Кандидаты</h3>' +
      renderCandidateList(data);
  }

  function matchVoteCount(match, id) {
    return Number(match && match.votes && match.votes[id]) || 0;
  }

  function candidateLostMatch(match, id) {
    return !!(match && match.winnerId && id && match.winnerId !== id);
  }

  function renderEliminatedStamp() {
    return '<b class="club-choice-vote-modal__eliminated-stamp" aria-label="Выбыл">Выбыл</b>';
  }

  function voteWord(count) {
    var n = Math.abs(Number(count) || 0) % 100;
    var n1 = n % 10;
    if (n > 10 && n < 20) return "голосов";
    if (n1 > 1 && n1 < 5) return "голоса";
    if (n1 === 1) return "голос";
    return "голосов";
  }

  function renderAchievementCard(className, description) {
    var text = String(description || "").trim() || "Достижение игрока";
    return '<small class="' + className + ' club-choice-vote-modal__achievement-card">' +
      '<span class="club-choice-vote-modal__achievement-card-text">' + escapeHtml(text) + '</span>' +
    '</small>';
  }

  function renderDuelPlayer(match, candidates, id, side) {
    var candidate = candidates[id] || {};
    var displayNick = clubChoiceDisplayNick(candidate.ratingNick || candidate.rating_nick || candidate.nick || "Игрок") || "Игрок";
    var ratingNick = clubChoiceRatingNick(candidate.ratingNick || candidate.rating_nick || candidate.nick || displayNick);
    var votes = matchVoteCount(match, id);
    var active = match.myVote === id;
    var winner = match.winnerId === id;
    var eliminated = candidateLostMatch(match, id);
    return '<div class="club-choice-vote-modal__duel-player club-choice-vote-modal__duel-player--' + escapeHtml(side) +
      (active ? " club-choice-vote-modal__duel-player--active" : "") +
      (winner ? " club-choice-vote-modal__duel-player--winner" : "") +
      (eliminated ? " club-choice-vote-modal__duel-player--eliminated" : "") +
      '">' +
        '<button type="button" class="club-choice-vote-modal__duel-profile" data-club-choice-profile="1" data-club-choice-profile-id="' + escapeHtml(candidate.accountId || "") + '" data-club-choice-profile-nick="' + escapeHtml(displayNick) + '" data-club-choice-rating-nick="' + escapeHtml(ratingNick) + '">' +
          (eliminated ? renderEliminatedStamp() : "") +
          '<strong>' + escapeHtml(displayNick) + '</strong>' +
          '<span class="club-choice-vote-modal__duel-avatar">' + renderPlayerAvatar(candidate, id) + '</span>' +
          (active ? '<span class="club-choice-vote-modal__selected-badge">Вы выбрали</span>' : '') +
        '</button>' +
        renderAchievementCard("club-choice-vote-modal__duel-desc", candidate.description) +
        '<em class="club-choice-vote-modal__duel-votes">' + String(votes) + ' ' + voteWord(votes) + '</em>' +
      '</div>';
  }

  function renderMatch(match, data, candidates, pairLabel) {
    var canVote = data.canVote && !match.winnerId;
    var ids = match.candidateIds || [];
    if (ids.length >= 2) {
      var leftId = ids[0];
      var rightId = ids[1];
      var leftCandidate = candidates[leftId] || {};
      var rightCandidate = candidates[rightId] || {};
      var leftNick = clubChoiceDisplayNick(leftCandidate.ratingNick || leftCandidate.rating_nick || leftCandidate.nick || "Игрок") || "Игрок";
      var rightNick = clubChoiceDisplayNick(rightCandidate.ratingNick || rightCandidate.rating_nick || rightCandidate.nick || "Игрок") || "Игрок";
      return '<article class="club-choice-vote-modal__match club-choice-vote-modal__match--duel">' +
        '<h4 class="club-choice-vote-modal__pair-title">' + escapeHtml(pairLabel || "Пара") + '</h4>' +
        '<div class="club-choice-vote-modal__duel-card">' +
          '<div class="club-choice-vote-modal__duel-players">' +
            renderDuelPlayer(match, candidates, leftId, "left") +
            '<span class="club-choice-vote-modal__duel-vs" aria-hidden="true"><img src="./assets/club-choice-vs-black.png?v=2" alt="" /></span>' +
            renderDuelPlayer(match, candidates, rightId, "right") +
          '</div>' +
          '<p class="club-choice-vote-modal__duel-question">Кого выбираешь ты?</p>' +
          '<div class="club-choice-vote-modal__duel-actions" aria-label="Голосование в паре">' +
            '<button type="button" class="club-choice-vote-modal__duel-vote club-choice-vote-modal__duel-vote--left' + (match.myVote === leftId ? " club-choice-vote-modal__duel-vote--selected" : "") + '" data-club-choice-vote="' + escapeHtml(match.id) + '" data-club-choice-candidate="' + escapeHtml(leftId) + '" aria-label="Голосовать за ' + escapeHtml(leftNick) + '"' + (canVote ? "" : " disabled") + '><span aria-hidden="true">' + (match.myVote === leftId ? "✓" : "👍") + '</span><strong>' + escapeHtml((match.myVote === leftId ? "Выбрано: " : "") + leftNick) + '</strong></button>' +
            '<button type="button" class="club-choice-vote-modal__duel-vote club-choice-vote-modal__duel-vote--right' + (match.myVote === rightId ? " club-choice-vote-modal__duel-vote--selected" : "") + '" data-club-choice-vote="' + escapeHtml(match.id) + '" data-club-choice-candidate="' + escapeHtml(rightId) + '" aria-label="Голосовать за ' + escapeHtml(rightNick) + '"' + (canVote ? "" : " disabled") + '><strong>' + escapeHtml((match.myVote === rightId ? "Выбрано: " : "") + rightNick) + '</strong><span aria-hidden="true">' + (match.myVote === rightId ? "✓" : "👍") + '</span></button>' +
          '</div>' +
        '</div>' +
        renderVoters(match, candidates) +
      '</article>';
    }
    return '<article class="club-choice-vote-modal__match">' +
      '<h4 class="club-choice-vote-modal__pair-title">' + escapeHtml(pairLabel || "Пара") + '</h4>' +
      (match.candidateIds || []).map(function (id) {
        var candidate = candidates[id] || {};
        var displayNick = clubChoiceDisplayNick(candidate.ratingNick || candidate.rating_nick || candidate.nick || "Игрок") || "Игрок";
        var ratingNick = clubChoiceRatingNick(candidate.ratingNick || candidate.rating_nick || candidate.nick || displayNick);
        var votes = matchVoteCount(match, id);
        var active = match.myVote === id;
        var winner = match.winnerId === id;
        var eliminated = candidateLostMatch(match, id);
        return '<div class="club-choice-vote-modal__player' +
          (active ? " club-choice-vote-modal__player--active" : "") +
          (winner ? " club-choice-vote-modal__player--winner" : "") +
          (eliminated ? " club-choice-vote-modal__player--eliminated" : "") +
          '">' +
            '<div class="club-choice-vote-modal__player-profile" role="button" tabindex="0" data-club-choice-profile="1" data-club-choice-profile-id="' + escapeHtml(candidate.accountId || "") + '" data-club-choice-profile-nick="' + escapeHtml(displayNick) + '" data-club-choice-rating-nick="' + escapeHtml(ratingNick) + '">' +
              (eliminated ? renderEliminatedStamp() : "") +
              '<span class="club-choice-vote-modal__player-copy"><strong>' + escapeHtml(displayNick) + '</strong></span>' +
              renderPlayerAvatar(candidate, id) +
              (active ? '<span class="club-choice-vote-modal__selected-badge">Вы выбрали</span>' : '') +
              renderAchievementCard("club-choice-vote-modal__player-desc", candidate.description) +
            '</div>' +
            '<button type="button" class="club-choice-vote-modal__vote-chip" data-club-choice-vote="' + escapeHtml(match.id) + '" data-club-choice-candidate="' + escapeHtml(id) + '" aria-label="Голосовать за ' + escapeHtml(displayNick) + '" title="Голосовать"' +
              (canVote ? "" : " disabled") + '>' +
              '<span>' + escapeHtml(active ? "✓ Выбрано" : "Голосовать") + '</span>' +
              '<em>' + String(votes) + '</em>' +
            '</button>' +
          '</div>';
      }).join('<span class="club-choice-vote-modal__versus">vs</span>') +
      renderVoters(match, candidates) +
    '</article>';
  }

  function bracketProgress(data) {
    var progress = {};
    (data && data.rounds || []).forEach(function (round) {
      (round.matches || []).forEach(function (match) {
        (match.candidateIds || []).forEach(function (id) {
          if (!id) return;
          if (!progress[id]) progress[id] = { advanced: false, eliminated: false, finalist: false, winner: false };
          if (match.winnerId) {
            if (match.winnerId === id) progress[id].advanced = true;
            else progress[id].eliminated = true;
          }
          if (String(match.side || "") === "final") progress[id].finalist = true;
        });
        if (String(match.side || "") === "final" && match.winnerId) {
          if (!progress[match.winnerId]) progress[match.winnerId] = { advanced: false, eliminated: false, finalist: false, winner: false };
          progress[match.winnerId].winner = true;
        }
      });
    });
    return progress;
  }

  function renderBracketNode(match, candidates, id, progress) {
    var candidate = candidates[id] || {};
    var displayNick = clubChoiceDisplayNick(candidate.ratingNick || candidate.rating_nick || candidate.nick || "Игрок") || "Игрок";
    var votes = matchVoteCount(match, id);
    var row = progress && progress[id] ? progress[id] : {};
    var winner = row.winner && String(match && match.side || "") === "final" && match.winnerId === id;
    var advanced = match && match.winnerId === id;
    var eliminated = candidateLostMatch(match, id);
    return '<span class="club-choice-vote-modal__scheme-player' +
      (winner ? " club-choice-vote-modal__scheme-player--winner" : "") +
      (advanced && !winner ? " club-choice-vote-modal__scheme-player--advanced" : "") +
      (eliminated ? " club-choice-vote-modal__scheme-player--eliminated" : "") +
      '">' +
        '<strong>' + escapeHtml(displayNick) + '</strong>' +
        '<em>' + String(votes) + '</em>' +
        (winner ? '<i>победитель</i>' : (advanced ? '<i>прошёл</i>' : '')) +
        (eliminated ? renderEliminatedStamp() : '') +
      '</span>';
  }

  function renderBracketScheme(data, candidates, extraClass) {
    var rounds = (data && data.rounds || []).filter(function (round) { return round && Array.isArray(round.matches); });
    var matches = [];
    rounds.forEach(function (round) {
      (round.matches || []).forEach(function (match) {
        matches.push(match);
      });
    });
    if (!matches.length) return "";
    var progress = bracketProgress(data);
    var left = matches.filter(function (match) { return match.side === "left"; });
    var right = matches.filter(function (match) { return match.side === "right"; });
    var final = matches.filter(function (match) { return match.side === "final"; });
    function renderSchemeMatch(match, index, total) {
      var ids = match.candidateIds || [];
      var label = total > 1 ? "Пара " + String(index + 1) : "Пара";
      return '<div class="club-choice-vote-modal__scheme-match">' +
        '<b>' + escapeHtml(label) + '</b>' +
        '<div class="club-choice-vote-modal__scheme-pair">' + ids.map(function (id, playerIndex) {
          return renderBracketNode(match, candidates, id, progress);
        }).join('<span class="club-choice-vote-modal__scheme-vs">vs</span>') + '</div>' +
      '</div>';
    }
    function renderSideColumn(sideMatches, sideName, className) {
      if (!sideMatches.length) return '<div class="club-choice-vote-modal__scheme-column ' + className + '"><span class="club-choice-vote-modal__scheme-round-title">' + escapeHtml(sideName) + '</span><div class="club-choice-vote-modal__empty">Ожидает пары</div></div>';
      var byRound = {};
      sideMatches.forEach(function (match) {
        var index = parseInt(String(match.id || "").replace(/^round_(\d+).*$/, "$1"), 10) || 1;
        if (!byRound[index]) byRound[index] = [];
        byRound[index].push(match);
      });
      return '<div class="club-choice-vote-modal__scheme-column ' + className + '">' +
        '<span class="club-choice-vote-modal__scheme-round-title">' + escapeHtml(sideName) + '</span>' +
        Object.keys(byRound).sort(function (a, b) { return Number(a) - Number(b); }).map(function (roundIndex) {
          var group = byRound[roundIndex];
          var title = Number(roundIndex) === 1 ? "Старт" : "Раунд " + String(roundIndex);
          return '<div class="club-choice-vote-modal__scheme-round-group">' +
            '<span class="club-choice-vote-modal__scheme-stage-title">' + escapeHtml(title) + '</span>' +
            group.map(function (match, index) { return renderSchemeMatch(match, index, group.length); }).join("") +
          '</div>';
        }).join("") +
      '</div>';
    }
    return '<section class="club-choice-vote-modal__scheme' + (extraClass ? " " + escapeHtml(extraClass) : "") + '" aria-label="Схема турнира">' +
      '<h3>Сетка</h3>' +
      '<div class="club-choice-vote-modal__scheme-layout">' +
        renderSideColumn(left, "Сетка слева", "club-choice-vote-modal__scheme-column--left") +
        '<div class="club-choice-vote-modal__scheme-final"><span>Финал</span>' + (final.length ? '<div class="club-choice-vote-modal__scheme-round-group">' + final.map(function (match, index) { return renderSchemeMatch(match, index, final.length); }).join("") + '</div>' : '<em>Ожидает финалистов</em>') + '</div>' +
        renderSideColumn(right, "Сетка справа", "club-choice-vote-modal__scheme-column--right") +
      '</div>' +
    '</section>';
  }

  function renderCompletedFallbackScheme(entry) {
    var winners = Array.isArray(entry && entry.winners) ? entry.winners : [];
    if (!winners.length) return "";
    return '<section class="club-choice-vote-modal__scheme club-choice-vote-modal__scheme--compact club-choice-vote-modal__scheme--completed-fallback" aria-label="Мини-сетка итогов">' +
      '<h3>Мини-сетка итогов</h3>' +
      '<div class="club-choice-vote-modal__completed-grid">' +
        winners.map(function (winner) {
          var votes = parseInt(winner && winner.votes, 10) || 0;
          return '<article class="club-choice-vote-modal__completed-grid-card">' +
            '<span>Топ ' + escapeHtml(winner && winner.place || 1) + '</span>' +
            '<strong>' + escapeHtml(winner && winner.nick || "Игрок") + '</strong>' +
            '<em>' + escapeHtml(votes) + ' ' + escapeHtml(voteWord(votes)) + '</em>' +
            '<i>победитель</i>' +
          '</article>';
        }).join("") +
      '</div>' +
    '</section>';
  }

  function completedRounds(data) {
    return (data && data.rounds || []).filter(function (round) {
      return round && round.id && Array.isArray(round.matches) && round.matches.length;
    }).slice().sort(function (a, b) {
      var aIndex = Number(a.index) || 0;
      var bIndex = Number(b.index) || 0;
      if (aIndex !== bIndex) return aIndex - bIndex;
      if (String(a.side || "") === "final") return 1;
      if (String(b.side || "") === "final") return -1;
      return String(a.id || "").localeCompare(String(b.id || ""));
    });
  }

  function renderCompletedRoundHistory(data, candidates) {
    var rounds = completedRounds(data);
    if (!rounds.length) return "";
    return '<section class="club-choice-vote-modal__round-history" aria-label="Прошедшие раунды">' +
      '<div class="club-choice-vote-modal__round-history-head">' +
        '<h3>Прошедшие раунды</h3>' +
        '<span>' + String(rounds.length) + '</span>' +
      '</div>' +
      rounds.map(function (round) {
        var matches = Array.isArray(round.matches) ? round.matches : [];
        return '<article class="club-choice-vote-modal__round-history-card">' +
          '<header class="club-choice-vote-modal__round-history-title">' +
            '<strong>' + escapeHtml(round.name || roundShortLabel(round)) + '</strong>' +
            '<em>' + String(matches.length) + ' ' + (matches.length === 1 ? "пара" : "пар") + '</em>' +
          '</header>' +
          '<div class="club-choice-vote-modal__round-history-matches">' +
            matches.map(function (match, index) {
              var ids = (match.candidateIds || []).filter(Boolean);
              return '<div class="club-choice-vote-modal__round-history-match">' +
                '<b>Пара ' + String(index + 1) + '</b>' +
                '<div class="club-choice-vote-modal__round-history-players">' +
                  ids.map(function (id) {
                    var candidate = candidates[id] || {};
                    var displayNick = clubChoiceDisplayNick(candidate.ratingNick || candidate.rating_nick || candidate.nick || "Игрок") || "Игрок";
                    var votes = matchVoteCount(match, id);
                    var winner = match.winnerId === id;
                    var eliminated = candidateLostMatch(match, id);
                    return '<span class="club-choice-vote-modal__round-history-player' +
                      (winner ? " club-choice-vote-modal__round-history-player--winner" : "") +
                      (eliminated ? " club-choice-vote-modal__round-history-player--eliminated" : "") +
                      '">' +
                        '<strong>' + escapeHtml(displayNick) + '</strong>' +
                        '<em>' + String(votes) + '</em>' +
                        (winner ? '<i>прошел</i>' : '') +
                        (eliminated ? '<i>выбыл</i>' : '') +
                      '</span>';
                  }).join('<small>vs</small>') +
                '</div>' +
              '</div>';
            }).join("") +
          '</div>' +
        '</article>';
      }).join("") +
    '</section>';
  }

  function completedWinnerDescription(winner, entry) {
    var description = String(winner && winner.description || "").trim();
    var month = String(entry && entry.month || "").trim();
    var nick = clubChoiceRatingNick(winner && winner.nick);
    if (month === "2026-06" && nick === "Waaar" && (!description || description === "Победитель клубного голосования за достижение месяца.")) {
      return "Стабильный июньский рывок в рейтингах и турнирах клуба.";
    }
    return description;
  }

  function completedWinnerCandidate(winner, candidates) {
    var winnerNick = clubChoiceRatingNick(winner && winner.nick);
    var keys = Object.keys(candidates || {});
    for (var i = 0; i < keys.length; i += 1) {
      var candidate = candidates[keys[i]] || {};
      var candidateNick = clubChoiceRatingNick(candidate.ratingNick || candidate.rating_nick || candidate.nick);
      if (candidateNick && candidateNick === winnerNick) return candidate;
    }
    return {
      nick: winner && winner.nick,
      ratingNick: winnerNick,
      description: winner && winner.description,
      avatar: winner && winner.avatar,
      accountId: winner && winner.accountId,
    };
  }

  function renderCompletedHeroWinner(entry, winners, candidates) {
    var winner = (winners || [])[0];
    if (!winner) return '<div class="club-choice-vote-modal__empty">Итоги пока не сформированы.</div>';
    var candidate = completedWinnerCandidate(winner, candidates);
    var displayNick = clubChoiceDisplayNick(candidate.ratingNick || candidate.rating_nick || winner.nick || candidate.nick || "Игрок") || "Игрок";
    var ratingNick = clubChoiceRatingNick(candidate.ratingNick || candidate.rating_nick || winner.nick || candidate.nick || displayNick);
    var month = monthNameOnly(entry && entry.month);
    var description = completedWinnerDescription(winner, entry) || "Победитель клубного голосования за достижение месяца.";
    return '<section class="club-choice-vote-modal__hero-winner" aria-label="Победитель голосования">' +
      '<div class="club-choice-vote-modal__hero-winner-avatar" data-club-choice-profile="1" data-club-choice-profile-id="' + escapeHtml(candidate.accountId || "") + '" data-club-choice-profile-nick="' + escapeHtml(displayNick) + '" data-club-choice-rating-nick="' + escapeHtml(ratingNick) + '" role="button" tabindex="0">' +
        renderCompletedWinnerArt(candidate, winner && winner.id) +
      '</div>' +
      '<div class="club-choice-vote-modal__hero-winner-main">' +
        '<span class="club-choice-vote-modal__hero-winner-badge">Победитель</span>' +
        '<strong>' + escapeHtml(displayNick) + '</strong>' +
        '<em>Народный герой ' + escapeHtml(month) + '</em>' +
        '<p>' + escapeHtml(description) + '</p>' +
      '</div>' +
    '</section>';
  }

  function renderCompletedWinnerArt(candidate, id) {
    var src = "";
    var nick = clubChoiceRatingNick(candidate && (candidate.ratingNick || candidate.rating_nick || candidate.nick));
    try {
      var art = typeof window.pokerGetSummerRatingPlayerArt === "function" ? window.pokerGetSummerRatingPlayerArt(nick) : null;
      if (art && art.src) src = String(art.src).trim();
    } catch (eHeroArt) {
      src = "";
    }
    if (!src && nick === "Waaar") src = "./assets/summer-rating-player-waaar.webp";
    if (!src) return renderPlayerAvatar(candidate, id);
    return '<span class="club-choice-vote-modal__hero-art" aria-hidden="true">' +
      '<img src="' + escapeHtml(src) + '" alt="" loading="lazy" decoding="async">' +
    '</span>';
  }

  function renderPlayerAvatar(candidate, id) {
    var src = candidate && candidate.avatar ? String(candidate.avatar).trim() : "";
    var art = null;
    try {
      art = !src && typeof window.pokerGetSummerRatingPlayerArt === "function"
        ? window.pokerGetSummerRatingPlayerArt(clubChoiceRatingNick(candidate && (candidate.ratingNick || candidate.rating_nick || candidate.nick)))
        : null;
    } catch (ePlayerArt) {
      art = null;
    }
    if (!src && art && art.src) src = String(art.src).trim();
    if (!src) src = fallbackPlayerAvatar(candidate, id);
    return '<span class="club-choice-vote-modal__avatar" aria-hidden="true">' +
      '<img src="' + escapeHtml(src) + '" alt="" loading="lazy" decoding="async">' +
    '</span>';
  }

  function fallbackPlayerAvatar(candidate, id) {
    var key = String((candidate && (candidate.accountId || candidate.nick)) || id || "");
    var nickKey = String((candidate && candidate.nick) || "").trim().toLowerCase();
    var forcedMaleByNick = {
      "бардюр": true,
      "ворон": true
    };
    var hash = 0;
    var avatars = [
      "./assets/chat-profile-default-hero-male.webp",
      "./assets/chat-profile-default-hero-female.webp?v=3.001"
    ];

    if (forcedMaleByNick[nickKey]) return avatars[0];

    for (var i = 0; i < key.length; i += 1) {
      hash = ((hash * 31) + key.charCodeAt(i)) >>> 0;
    }

    return avatars[hash % avatars.length];
  }

  function renderVoters(match, candidates) {
    var rows = Array.isArray(match && match.voters) ? match.voters : [];
    rows = rows.filter(function (row) { return row && row.displayName; });
    if (!rows.length) return "";
    return '<div class="club-choice-vote-modal__voters">' + rows.map(function (row) {
      var candidate = candidates[row.candidateId] || {};
      return '<span>' + escapeHtml(row.displayName) + ' → ' + escapeHtml(candidate.nick || "игрок") + '</span>';
    }).join("") + '</div>';
  }

  function renderRoundTabs(votesHtml, schemeHtml) {
    var tab = activeRoundTab === "scheme" ? "scheme" : "votes";
    return '<div class="club-choice-vote-modal__tabs" role="tablist" aria-label="Разделы голосования">' +
        '<button type="button" class="club-choice-vote-modal__tab' + (tab === "votes" ? " club-choice-vote-modal__tab--active" : "") + '" role="tab" aria-selected="' + (tab === "votes" ? "true" : "false") + '" data-club-choice-tab="votes">Голоса</button>' +
        '<button type="button" class="club-choice-vote-modal__tab' + (tab === "scheme" ? " club-choice-vote-modal__tab--active" : "") + '" role="tab" aria-selected="' + (tab === "scheme" ? "true" : "false") + '" data-club-choice-tab="scheme">Сетка</button>' +
      '</div>' +
      '<div class="club-choice-vote-modal__tab-panels">' +
        '<div class="club-choice-vote-modal__tab-panel" data-club-choice-tab-panel="votes"' + (tab === "votes" ? "" : " hidden") + '>' + votesHtml + '</div>' +
        '<div class="club-choice-vote-modal__tab-panel" data-club-choice-tab-panel="scheme"' + (tab === "scheme" ? "" : " hidden") + '>' + (schemeHtml || '<div class="club-choice-vote-modal__empty">Сетка пока не сформирована.</div>') + '</div>' +
      '</div>';
  }

  function roundVoteTabLabel(round, currentId) {
    if (!round) return "Раунд";
    if (String(round.id) === String(currentId || "")) return "Текущий раунд";
    return String(round.name || "Раунд");
  }

  function renderVoteRoundTabs(data, rounds) {
    if (!rounds || rounds.length <= 1) return "";
    var currentId = String(data && data.currentRoundId || "");
    return '<div class="club-choice-vote-modal__vote-round-tabs" role="tablist" aria-label="Раунды голосов">' +
      rounds.map(function (round) {
        var active = String(round.id) === String(activeVotesRoundId || "");
        return '<button type="button" class="club-choice-vote-modal__vote-round-tab' + (active ? " club-choice-vote-modal__vote-round-tab--active" : "") + '" role="tab" aria-selected="' + (active ? "true" : "false") + '" data-club-choice-votes-round="' + escapeHtml(round.id) + '">' +
          escapeHtml(roundVoteTabLabel(round, currentId)) +
        '</button>';
      }).join("") +
    '</div>';
  }

  function renderRoundMatches(round, data, candidates) {
    var matches = Array.isArray(round && round.matches) ? round.matches : [];
    var left = matches.filter(function (match) { return match.side === "left"; });
    var right = matches.filter(function (match) { return match.side === "right"; });
    var final = matches.filter(function (match) { return match.side === "final"; });
    var viewData = {};
    Object.keys(data || {}).forEach(function (key) { viewData[key] = data[key]; });
    viewData.canVote = data.canVote && String(round && round.id || "") === String(data.currentRoundId || "");
    var pairNumber = 0;
    function renderMatchWithPair(match) {
      pairNumber += 1;
      return renderMatch(match, viewData, candidates, "Пара " + String(pairNumber));
    }
    if (final.length) {
      return '<div class="club-choice-vote-modal__bracket club-choice-vote-modal__bracket--final club-choice-vote-modal__bracket--tournament">' +
        '<div class="club-choice-vote-modal__final-lane" aria-hidden="true"><span></span></div>' +
        '<div class="club-choice-vote-modal__side club-choice-vote-modal__side--final club-choice-vote-modal__side--cup"><h3>Финал</h3><div class="club-choice-vote-modal__match-list">' + final.map(renderMatchWithPair).join("") + '</div></div>' +
        '<div class="club-choice-vote-modal__final-lane" aria-hidden="true"><span></span></div>' +
      '</div>';
    }
    return '<div class="club-choice-vote-modal__bracket club-choice-vote-modal__bracket--tournament">' +
      '<div class="club-choice-vote-modal__side club-choice-vote-modal__side--left"><h3>Сетка слева</h3><div class="club-choice-vote-modal__match-list">' + (left.map(renderMatchWithPair).join("") || '<div class="club-choice-vote-modal__empty">Ожидает пары</div>') + '</div></div>' +
      '<div class="club-choice-vote-modal__bracket-spine" aria-hidden="true"><span>Финал</span></div>' +
      '<div class="club-choice-vote-modal__side club-choice-vote-modal__side--right"><h3>Сетка справа</h3><div class="club-choice-vote-modal__match-list">' + (right.map(renderMatchWithPair).join("") || '<div class="club-choice-vote-modal__empty">Ожидает пары</div>') + '</div></div>' +
    '</div>';
  }

  function renderRoundSummary(round, data, isCurrent) {
    var access = data.settings && data.settings.accessLevel;
    var paused = data.paused === true;
    if (isCurrent) {
      return '<div class="club-choice-vote-modal__summary club-choice-vote-modal__summary--timer">' +
        '<span>' + escapeHtml(round ? round.name : "Раунд") + '</span>' +
        (paused
          ? '<strong class="club-choice-vote-modal__paused-label">Голосование на паузе</strong>'
          : '<strong data-club-choice-countdown="' + escapeHtml(round && round.endsAt || "") + '">Идет загрузка...</strong>') +
        (data.isAdmin
          ? '<button type="button" class="club-choice-vote-modal__pause-btn" data-club-choice-pause="' + (paused ? "resume" : "pause") + '">' + (paused ? "Продолжить" : "Пауза") + '</button>'
          : '') +
        '<p class="club-choice-vote-modal__access-hint">' + escapeHtml(votingAccessHint(access)) + '</p>' +
      '</div>' +
      (paused
        ? '<div class="club-choice-vote-modal__notice club-choice-vote-modal__notice--paused">Голосование стоит на паузе. Таймер остановлен, новые голоса сейчас не принимаются.</div>'
        : '') +
      (!data.canVote && !paused
        ? '<div class="club-choice-vote-modal__notice">Вашему аккаунту сейчас недоступно голосование по выбранному уровню доступа.</div>'
        : '');
    }
    return '<div class="club-choice-vote-modal__summary club-choice-vote-modal__summary--past-round">' +
      '<span>' + escapeHtml(round ? round.name : "Раунд") + '</span>' +
      '<strong>Результаты раунда</strong>' +
      '<p class="club-choice-vote-modal__access-hint">Раунд завершен, голоса показаны по парам.</p>' +
    '</div>';
  }

  function setVotesRound(roundId) {
    activeVotesRoundId = String(roundId || "");
    render();
  }

  function setRoundTab(tabName) {
    activeRoundTab = tabName === "scheme" ? "scheme" : "votes";
    if (!modal) return;
    Array.prototype.slice.call(modal.querySelectorAll("[data-club-choice-tab]")).forEach(function (button) {
      var active = button.getAttribute("data-club-choice-tab") === activeRoundTab;
      button.classList.toggle("club-choice-vote-modal__tab--active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
    });
    Array.prototype.slice.call(modal.querySelectorAll("[data-club-choice-tab-panel]")).forEach(function (panel) {
      panel.hidden = panel.getAttribute("data-club-choice-tab-panel") !== activeRoundTab;
    });
  }

  function renderActive(data) {
    var round = currentRound(data);
    var candidates = candidateMap(data);
    var rounds = voteRounds(data);
    if (!rounds.length && round) rounds = [round];
    if (!rounds.filter(function (item) { return String(item.id) === String(activeVotesRoundId || ""); }).length) {
      activeVotesRoundId = String(data.currentRoundId || (rounds[0] && rounds[0].id) || "");
    }
    var selectedRound = rounds.filter(function (item) { return String(item.id) === String(activeVotesRoundId || ""); })[0] || round || rounds[0];
    var isCurrentRound = selectedRound && String(selectedRound.id) === String(data.currentRoundId || "");
    var paused = data.paused === true;
    setStatus("");
    var votesHtml =
      renderVoteRoundTabs(data, rounds) +
      renderRoundSummary(selectedRound, data, isCurrentRound) +
      renderRoundMatches(selectedRound, data, candidates);
    bodyEl.innerHTML = renderRoundTabs(votesHtml, renderBracketScheme(data, candidates));
    if (!paused) startTimer();
  }

  function renderCompleted(data) {
    var last = (data.history || [])[0] || {};
    var winners = last.winners || [];
    var candidates = candidateMap(data);
    setStatus("Голосование завершено");
    bodyEl.innerHTML =
      '<div class="club-choice-vote-modal__summary">' +
        '<span>Итоги ' + escapeHtml(monthLabel(last.month || data.monthKey)) + '</span>' +
        '<strong>Народный герой</strong>' +
        '<p class="club-choice-vote-modal__summary-desc">Победитель этого блока выбран игроками клуба среди кандидатов с самыми заметными результатами и поступками месяца.</p>' +
      '</div>' +
      renderCompletedHeroWinner(last, winners, candidates) +
      (data.isAdmin
        ? '<button type="button" class="club-choice-vote-modal__primary club-choice-vote-modal__primary--wide" data-club-choice-new-draft="1">Новое голосование</button>'
        : '');
  }

  function render() {
    ensureModal();
    stopTimer();
    if (!state) {
      renderLoading();
      return;
    }
    if (bodyEl) bodyEl.classList.toggle("club-choice-vote-modal__body--tournament", state.status === "active");
    if (state.status === "active") renderActive(state);
    else if (state.status === "completed") renderCompleted(state);
    else renderDraft(state);
  }

  function startTimer() {
    stopTimer();
    tickTimer();
    timer = window.setInterval(tickTimer, 1000);
  }

  function stopTimer() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }

  function tickTimer() {
    if (!modal) return;
    var el = modal.querySelector("[data-club-choice-countdown]");
    if (!el) return;
    var end = Date.parse(el.getAttribute("data-club-choice-countdown") || "");
    if (!end) {
      el.textContent = "Идет загрузка...";
      return;
    }
    var left = end - Date.now();
    el.textContent = "До следующего раунда " + formatLeft(left);
    if (left <= 0) loadState();
  }

  function onModalSubmit(event) {
    var form = event.target && event.target.closest ? event.target.closest("[data-club-choice-form]") : null;
    if (!form) return;
    event.preventDefault();
    if (form.getAttribute("data-club-choice-form") === "candidate") {
      postAction({
        action: "addCandidate",
        nick: form.elements.nick.value,
        description: form.elements.description.value,
      }).then(function () {
        form.reset();
      });
      return;
    }
    if (form.getAttribute("data-club-choice-form") === "candidate-edit") {
      postAction({
        action: "updateCandidate",
        candidateId: form.getAttribute("data-club-choice-candidate-form") || "",
        nick: form.elements.nick.value,
        description: form.elements.description.value,
      });
      return;
    }
    if (form.getAttribute("data-club-choice-form") === "start") {
      postAction({
        action: "start",
        monthKey: form.elements.monthKey ? form.elements.monthKey.value : "",
        accessLevel: form.elements.accessLevel.value,
        anonymous: !!form.elements.anonymous.checked,
      });
    }
  }

  function onModalClick(event) {
    var close = event.target && event.target.closest ? event.target.closest("[data-club-choice-close]") : null;
    if (close) {
      closeModal();
      return;
    }
    var edit = event.target && event.target.closest ? event.target.closest("[data-club-choice-edit]") : null;
    if (edit) {
      var editArticle = edit.closest(".club-choice-vote-modal__candidate");
      var editForm = editArticle ? editArticle.querySelector("[data-club-choice-candidate-form]") : null;
      Array.prototype.slice.call(editArticle ? editArticle.querySelectorAll("[data-club-choice-candidate-view]") : []).forEach(function (el) {
        el.hidden = true;
      });
      if (editForm) {
        editForm.hidden = false;
        var firstInput = editForm.querySelector("input, textarea");
        if (firstInput && typeof firstInput.focus === "function") firstInput.focus();
      }
      return;
    }
    var cancelEdit = event.target && event.target.closest ? event.target.closest("[data-club-choice-cancel-edit]") : null;
    if (cancelEdit) {
      var cancelArticle = cancelEdit.closest(".club-choice-vote-modal__candidate");
      var cancelForm = cancelArticle ? cancelArticle.querySelector("[data-club-choice-candidate-form]") : null;
      if (cancelForm) cancelForm.hidden = true;
      Array.prototype.slice.call(cancelArticle ? cancelArticle.querySelectorAll("[data-club-choice-candidate-view]") : []).forEach(function (el) {
        el.hidden = false;
      });
      return;
    }
    var remove = event.target && event.target.closest ? event.target.closest("[data-club-choice-remove]") : null;
    if (remove) {
      postAction({ action: "removeCandidate", candidateId: remove.getAttribute("data-club-choice-remove") || "" });
      return;
    }
    var newDraft = event.target && event.target.closest ? event.target.closest("[data-club-choice-new-draft]") : null;
    if (newDraft) {
      postAction({ action: "newDraft" });
      return;
    }
    var pause = event.target && event.target.closest ? event.target.closest("[data-club-choice-pause]") : null;
    if (pause) {
      postAction({ action: pause.getAttribute("data-club-choice-pause") === "resume" ? "resume" : "pause" });
      return;
    }
    var tab = event.target && event.target.closest ? event.target.closest("[data-club-choice-tab]") : null;
    if (tab) {
      setRoundTab(tab.getAttribute("data-club-choice-tab") || "votes");
      return;
    }
    var votesRound = event.target && event.target.closest ? event.target.closest("[data-club-choice-votes-round]") : null;
    if (votesRound) {
      setVotesRound(votesRound.getAttribute("data-club-choice-votes-round") || "");
      return;
    }
    var share = event.target && event.target.closest ? event.target.closest("[data-club-choice-share]") : null;
    if (share) {
      shareVote();
      return;
    }
    var copy = event.target && event.target.closest ? event.target.closest("[data-club-choice-copy]") : null;
    if (copy) {
      copyVoteLink();
      return;
    }
    var vote = event.target && event.target.closest ? event.target.closest("[data-club-choice-vote]") : null;
    if (vote) {
      event.preventDefault();
      event.stopPropagation();
      if (vote.disabled) return;
      setVoteButtonLoading(vote, true);
      postAction({
        action: "vote",
        matchId: vote.getAttribute("data-club-choice-vote") || "",
        candidateId: vote.getAttribute("data-club-choice-candidate") || "",
      }, { quiet: true, preserveScroll: true }).then(function () {
        if (vote && vote.isConnected) setVoteButtonLoading(vote, false);
      });
      return;
    }
    var profile = event.target && event.target.closest ? event.target.closest("[data-club-choice-profile]") : null;
    if (profile) {
      openCandidateProfile(profile);
      return;
    }
  }

  function onModalKeydown(event) {
    if (event.key !== "Enter" && event.key !== " ") return;
    if (event.target && event.target.closest && event.target.closest("[data-club-choice-vote]")) return;
    var profile = event.target && event.target.closest ? event.target.closest("[data-club-choice-profile]") : null;
    if (!profile) return;
    event.preventDefault();
    openCandidateProfile(profile);
  }

  function bind() {
    var plaque = document.getElementById("clubChoiceVoteOpen");
    if (!plaque) return;
    plaque.addEventListener("click", function () {
      openModal();
    });
    startHomePlaqueTimer();
    if (window.__pokerHomeWidgetOpening !== "clubChoiceVote") refreshHomePlaqueState();
  }

  window.openClubChoiceVoteModal = openModal;

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
  else bind();
})();
