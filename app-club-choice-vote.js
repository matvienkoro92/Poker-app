(function () {
  "use strict";

  var API_PATH = "/api/club-choice-vote";
  var CLUB_CHOICE_START_PARAM = "club_choice_vote";
  var timer = null;
  var state = null;
  var loading = false;
  var modal = null;
  var bodyEl = null;
  var statusEl = null;

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
    if (typeof buildMiniAppStartLink === "function") return buildMiniAppStartLink(CLUB_CHOICE_START_PARAM);
    if (typeof pokerBuildWebsiteStartLink === "function") {
      var webLink = pokerBuildWebsiteStartLink(CLUB_CHOICE_START_PARAM);
      if (webLink) return webLink;
    }
    var base = typeof getAppBaseUrlForLinks === "function" ? getAppBaseUrlForLinks() : "";
    if (!base && window.location) base = String(window.location.origin || "") + "/";
    base = String(base || "").trim().replace(/\/+$/, "");
    return base ? base + (base.indexOf("?") >= 0 ? "&" : "?") + "startapp=" + encodeURIComponent(CLUB_CHOICE_START_PARAM) : "";
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
      showAlert(ok ? "Ссылка на голосование скопирована." : "Скопируйте ссылку вручную: " + link);
    });
  }

  function openCandidateProfile(profileEl) {
    if (!profileEl) return;
    var nick = String(profileEl.getAttribute("data-club-choice-profile-nick") || "").trim();
    var profileId = String(profileEl.getAttribute("data-club-choice-profile-id") || "").trim();
    var hasUnifiedByNick = nick && typeof window.pokerOpenUnifiedPlayerProfileByRatingNick === "function";
    var hasTournamentProfile = nick && typeof window.pokerOpenTournamentRatingPlayer === "function";
    var hasLatestRatingProfile = nick && typeof window.pokerOpenLatestTournamentRatingPlayerModal === "function";
    var hasChatProfile = profileId && typeof window.openChatUserModalById === "function";
    if (!hasUnifiedByNick && !hasTournamentProfile && !hasLatestRatingProfile && !hasChatProfile) {
      showAlert("Профиль игрока пока недоступен.");
      return;
    }
    try {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
    } catch (eExpand) {}
    closeModal();
    if (hasUnifiedByNick) {
      window.pokerOpenUnifiedPlayerProfileByRatingNick(nick, { season: "summer" });
      return;
    }
    if (hasTournamentProfile) {
      window.pokerOpenTournamentRatingPlayer(nick, { season: "summer" });
      return;
    }
    if (hasChatProfile) {
      window.openChatUserModalById(profileId, nick || "Игрок", null);
      return;
    }
    window.pokerOpenLatestTournamentRatingPlayerModal(nick, { season: "summer" });
  }

  function monthLabel(monthKey) {
    var raw = String(monthKey || "").trim();
    var parts = raw.match(/^(\d{4})-(\d{2})$/);
    if (!parts) return "месяца";
    var names = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
    var idx = parseInt(parts[2], 10) - 1;
    return (names[idx] || "месяц") + " " + parts[1];
  }

  function candidateMap(data) {
    var map = {};
    (data && data.candidates || []).forEach(function (candidate) {
      if (candidate && candidate.id) map[candidate.id] = candidate;
    });
    return map;
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

  function accessLabel(value) {
    if (value === "level1") return "Уровень 1+";
    if (value === "level10") return "Уровень 10+";
    if (value === "level25") return "Уровень 25+";
    if (value === "level50") return "Уровень 50+";
    return "Все авторизованные";
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
        if (bodyEl) bodyEl.innerHTML = '<div class="club-choice-vote-modal__empty">' + escapeHtml(error.message || "Ошибка загрузки") + "</div>";
      })
      .finally(function () {
        loading = false;
      });
  }

  function postAction(payload) {
    var base = baseUrl();
    setStatus("Идет загрузка...");
    return fetch(base + API_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiBody(payload || {})),
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data && data.state && data.state.ok) {
          state = data.state;
          render();
          return state;
        }
        if (!data || !data.ok) throw new Error((data && data.error) || "Ошибка");
        state = data;
        render();
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

  function renderMatch(match, data, candidates) {
    var canVote = data.canVote && !match.winnerId;
    return '<article class="club-choice-vote-modal__match">' +
      (match.candidateIds || []).map(function (id) {
        var candidate = candidates[id] || {};
        var votes = Number(match.votes && match.votes[id]) || 0;
        var active = match.myVote === id;
        var winner = match.winnerId === id;
        return '<div class="club-choice-vote-modal__player' +
          (active ? " club-choice-vote-modal__player--active" : "") +
          (winner ? " club-choice-vote-modal__player--winner" : "") +
          '" role="button" tabindex="0" data-club-choice-profile="1" data-club-choice-profile-id="' + escapeHtml(candidate.accountId || "") + '" data-club-choice-profile-nick="' + escapeHtml(candidate.nick || "") + '">' +
            '<span><strong>' + escapeHtml(candidate.nick || "Игрок") + '</strong><small>' + escapeHtml(candidate.description || "") + '</small></span>' +
            '<button type="button" class="club-choice-vote-modal__vote-chip" data-club-choice-vote="' + escapeHtml(match.id) + '" data-club-choice-candidate="' + escapeHtml(id) + '" aria-label="Голосовать за ' + escapeHtml(candidate.nick || "игрока") + '" title="Голосовать"' +
              (canVote ? "" : " disabled") + '>' +
              '<em>' + String(votes) + '</em>' +
            '</button>' +
          '</div>';
      }).join('<span class="club-choice-vote-modal__versus">vs</span>') +
      renderVoters(match, candidates) +
    '</article>';
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

  function renderActive(data) {
    var round = currentRound(data);
    var candidates = candidateMap(data);
    var matches = round && round.matches ? round.matches : [];
    var left = matches.filter(function (match) { return match.side === "left"; });
    var right = matches.filter(function (match) { return match.side === "right"; });
    var final = matches.filter(function (match) { return match.side === "final"; });
    var access = data.settings && data.settings.accessLevel;
    var paused = data.paused === true;
    setStatus(paused ? "Голосование стоит на паузе" : "Раунд идет. Голосование: " + accessLabel(access));
    var bracketHtml = final.length
      ? '<div class="club-choice-vote-modal__bracket club-choice-vote-modal__bracket--final club-choice-vote-modal__bracket--tournament">' +
          '<div class="club-choice-vote-modal__final-lane" aria-hidden="true"><span></span></div>' +
          '<div class="club-choice-vote-modal__side club-choice-vote-modal__side--final club-choice-vote-modal__side--cup"><h3>Финал</h3><div class="club-choice-vote-modal__match-list">' + final.map(function (match) { return renderMatch(match, data, candidates); }).join("") + '</div></div>' +
          '<div class="club-choice-vote-modal__final-lane" aria-hidden="true"><span></span></div>' +
        '</div>'
      : '<div class="club-choice-vote-modal__bracket club-choice-vote-modal__bracket--tournament">' +
          '<div class="club-choice-vote-modal__side club-choice-vote-modal__side--left"><h3>Левая сетка</h3><div class="club-choice-vote-modal__match-list">' + (left.map(function (match) { return renderMatch(match, data, candidates); }).join("") || '<div class="club-choice-vote-modal__empty">Ожидает пары</div>') + '</div></div>' +
          '<div class="club-choice-vote-modal__bracket-spine" aria-hidden="true"><span>Финал</span></div>' +
          '<div class="club-choice-vote-modal__side club-choice-vote-modal__side--right"><h3>Правая сетка</h3><div class="club-choice-vote-modal__match-list">' + (right.map(function (match) { return renderMatch(match, data, candidates); }).join("") || '<div class="club-choice-vote-modal__empty">Ожидает пары</div>') + '</div></div>' +
        '</div>';
    bodyEl.innerHTML =
      '<div class="club-choice-vote-modal__summary club-choice-vote-modal__summary--timer">' +
        '<span>' + escapeHtml(round ? round.name : "Раунд") + '</span>' +
        (paused
          ? '<strong class="club-choice-vote-modal__paused-label">Голосование на паузе</strong>'
          : '<strong data-club-choice-countdown="' + escapeHtml(round && round.endsAt || "") + '">Идет загрузка...</strong>') +
        (data.isAdmin
          ? '<button type="button" class="club-choice-vote-modal__pause-btn" data-club-choice-pause="' + (paused ? "resume" : "pause") + '">' + (paused ? "Продолжить" : "Пауза") + '</button>'
          : '') +
      '</div>' +
      (paused
        ? '<div class="club-choice-vote-modal__notice club-choice-vote-modal__notice--paused">Голосование стоит на паузе. Таймер остановлен, новые голоса сейчас не принимаются.</div>'
        : '') +
      (!data.canVote && !paused
        ? '<div class="club-choice-vote-modal__notice">Вашему аккаунту сейчас недоступно голосование по выбранному уровню доступа.</div>'
        : '') +
      bracketHtml;
    if (!paused) startTimer();
  }

  function renderCompleted(data) {
    var last = (data.history || [])[0] || {};
    var winners = last.winners || [];
    setStatus("Голосование завершено");
    bodyEl.innerHTML =
      '<div class="club-choice-vote-modal__summary">' +
        '<span>Итоги ' + escapeHtml(monthLabel(last.month || data.monthKey)) + '</span>' +
        '<strong>Народный герой</strong>' +
        '<p class="club-choice-vote-modal__summary-desc">Победитель этого блока выбран игроками клуба среди кандидатов с самыми заметными результатами и поступками месяца.</p>' +
      '</div>' +
      '<div class="club-choice-vote-modal__winners">' + (winners.length ? winners.map(function (winner) {
        return '<article class="club-choice-vote-modal__winner">' +
          '<span>Топ ' + escapeHtml(winner.place || "") + '</span>' +
          '<strong>' + escapeHtml(winner.nick || "Игрок") + '</strong>' +
          '<em>' + escapeHtml(winner.votes || 0) + ' голосов</em>' +
        '</article>';
      }).join("") : '<div class="club-choice-vote-modal__empty">Итоги пока не сформированы.</div>') + '</div>' +
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
      postAction({
        action: "vote",
        matchId: vote.getAttribute("data-club-choice-vote") || "",
        candidateId: vote.getAttribute("data-club-choice-candidate") || "",
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
  }

  window.openClubChoiceVoteModal = openModal;

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
  else bind();
})();
