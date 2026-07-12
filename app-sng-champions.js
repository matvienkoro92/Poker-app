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
  var activeTabManual = false;
  var activeBracketStage = 0;
  var activeLoserBracketStage = 0;
  var activeBracketStageManual = false;
  var activeLoserBracketStageManual = false;
  var activeBracketView = "winners";
  var bracketMapExpanded = false;
  var bracketMapFit = { winners: false, losers: false };
  var activeBracketMapSelection = null;
  var bracketTimerInterval = null;
  var versionChecking = false;
  var stateRevision = "";
  var activeTournamentId = "";
  var tournamentDetailOpen = false;
  var expandedTournamentParticipantsId = "";
  var tournamentCreateFormOpen = false;
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
    modal.addEventListener("keydown", onModalKeydown);
    modal.addEventListener("submit", onModalSubmit);
    modal.addEventListener("input", updateTournamentPayoutPreview);
    modal.addEventListener("change", updateTournamentPayoutPreview);
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && modal.classList.contains("club-choice-vote-modal--open")) closeModal();
    });
    return modal;
  }

  function openModal() {
    ensureModal();
    try {
      if (typeof window.pokerRecordSectionViewOpen === "function") window.pokerRecordSectionViewOpen("sng-champions");
    } catch (eTrack) {}
    modal.classList.add("club-choice-vote-modal--open");
    document.body.classList.add("club-choice-vote-open");
    activeTabManual = false;
    tournamentDetailOpen = false;
    startBracketTimerRefresh();
    renderLoading();
    loadState();
  }

  function closeModal() {
    if (!modal) return;
    bracketMapExpanded = false;
    bracketMapFit.winners = false;
    bracketMapFit.losers = false;
    modal.classList.remove("club-choice-vote-modal--open");
    document.body.classList.remove("club-choice-vote-open");
    stopBracketTimerRefresh();
  }

  function startBracketTimerRefresh() {
    if (bracketTimerInterval) return;
    bracketTimerInterval = window.setInterval(function () {
      if (!modal || !modal.classList.contains("club-choice-vote-modal--open")) return;
      checkStateVersion();
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
    var selected = activeTournamentId ? "&tournamentId=" + encodeURIComponent(activeTournamentId) : "";
    return fetch(baseUrl() + API_PATH + apiAuthQuery("?") + selected + "&_t=" + Date.now(), { cache: "no-store" }).then(function (res) {
      return res.json();
    });
  }

  function rememberStateRevision(data) {
    stateRevision = String(data && (data.revision || data.updatedAt) || "").trim();
  }

  function fetchStateVersion() {
    return fetch(
      baseUrl() + API_PATH + apiAuthQuery("?") + "&mode=version&revision=" + encodeURIComponent(stateRevision || ""),
      { cache: "no-store" }
    ).then(function (res) {
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
        activeTournamentId = data.tournamentId || activeTournamentId;
        rememberStateRevision(data);
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
      body: JSON.stringify(apiBody(Object.assign({ tournamentId: activeTournamentId }, payload || {}))),
      signal: controller ? controller.signal : undefined,
    })
      .then(function (res) {
        return res.json().then(function (data) {
          if (!res.ok || !data || !data.ok) throw new Error((data && data.error) || "Ошибка");
          if (payload && payload.action === "join" && typeof pokerTrackAnalyticsEvent === "function") {
            var sngEventId = payload.eventId || payload.event_id || data.eventId || data.event_id || "current";
            pokerTrackAnalyticsEvent("sng_joined", { name: String(sngEventId), event_id: "evt_sng_" + String(sngEventId).replace(/[^a-zA-Z0-9_-]/g, "_") + "_" + (typeof getInstallationId === "function" ? getInstallationId() : "") });
          }
          state = data;
          activeTournamentId = data.tournamentId || activeTournamentId;
          rememberStateRevision(data);
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

  function checkStateVersion() {
    if (versionChecking || loading) return;
    if (!state || state.status !== "bracket") return;
    if (document.hidden) return;
    versionChecking = true;
    fetchStateVersion()
      .then(function (data) {
        if (!data || !data.ok) return;
        var nextRevision = String(data.revision || data.updatedAt || "").trim();
        if (nextRevision && nextRevision !== stateRevision) {
          loadState();
        }
      })
      .catch(function () {})
      .finally(function () {
        versionChecking = false;
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
    if (round && round.stageLabel) return String(round.stageLabel);
    if (round && (String(round.name || "").toLowerCase() === "гранд-финал" || (round.loserBracket && Number(round.index) === 9))) return "Гранд финал";
    if (Array.isArray(rounds) && rounds.length) {
      if (rounds.length === 6) {
        return ["1/16", "1/8", "1/4", "Полуфинал", "Финал", "Гранд финал"][Number(index) || 0] || "Сетка";
      }
      var remaining = rounds.length - (Number(index) || 0);
      if (remaining === 1) return "Финал";
      if (remaining === 2) return "Полуфинал";
      if (remaining === 3) return "1/4";
      if (remaining === 4) return "1/8";
      if (remaining === 5) return "1/16";
    }
    var matches = Array.isArray(round && round.matches) ? round.matches.length : 0;
    if (matches >= 16) return "1/16";
    if (matches === 8) return "1/8";
    if (matches === 4) return "1/4";
    if (matches === 2) return "Полуфинал";
    if (matches === 1) return "Финал";
    return round && round.name ? round.name : "Сетка";
  }

  function roundStageClass(round, index, rounds) {
    var label = roundStageLabel(round, index, rounds);
    if (label === "1/4") return "quarter";
    if (label === "Полуфинал") return "semi";
    if (label === "Финал" || label === "Гранд финал") return "final";
    return "";
  }

  function loserRoundStageLabel(round, index) {
    var step = Number(index) || 0;
    if (step === 0) return "L 1/8";
    if (step === 1) return "L 1/8";
    if (step === 2) return "L 1/4";
    if (step === 3) return "L 1/4";
    if (step === 4) return "L 1/2";
    if (step === 5) return "L 1/2";
    if (step === 6) return "L финал";
    if (step === 7) return "Финал сетки №2";
    if (step === 8) return "Гранд-Финал";
    return round && round.name ? round.name : "Сетка №2";
  }

  function loserRoundStageClass(round, index) {
    var label = loserRoundStageLabel(round, index);
    if (label === "L 1/4" || label === "L 1/4 вход") return "quarter";
    if (label === "L 1/2" || label === "L 1/2 вход") return "semi";
    if (label === "Финал сетки №2" || label === "Гранд-Финал") return "final";
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

  function playerCityText(player) {
    return String(player && (player.profileCity || player.city) || "").trim();
  }

  function playerMetaText(player) {
    return [playerLevelText(player), playerCityText(player)].filter(Boolean).join(" · ");
  }

  function playerMetaHtml(player, className) {
    var level = playerLevelText(player);
    var city = playerCityText(player);
    if (!level && !city) return "";
    return '<small class="' + escapeHtml(className) + '">' +
      (level ? '<span>' + escapeHtml(level) + '</span>' : '') +
      (city ? '<span>' + escapeHtml(city) + '</span>' : '') +
    '</small>';
  }

  function playerTelegram(player) {
    var raw = player && (
      player.telegram ||
      player.telegramUsername ||
      player.telegram_username ||
      player.tgUsername ||
      player.tg_username ||
      player.username ||
      player.telegramLogin
    );
    var value = String(raw || "").trim();
    if (!value) return null;
    value = value.replace(/^https?:\/\/t\.me\//i, "").replace(/^tg:\/\//i, "").replace(/^@+/, "").split(/[/?#]/)[0].trim();
    if (!/^[A-Za-z0-9_]{5,32}$/.test(value)) return null;
    return {
      label: "@" + value,
      href: "https://t.me/" + value,
    };
  }

  function playerInitial(player) {
    var name = playerName(player);
    return String(name || "И").trim().charAt(0).toUpperCase() || "И";
  }

  function buildBracketSkeletonRounds(data) {
    var participants = Number(data && data.capacity) || 32;
    if (data && data.tournamentType === "team") participants = Math.max(2, Math.floor(participants / 2));
    var counts = [];
    var matchCount = Math.max(1, Math.floor(participants / 2));
    while (matchCount >= 1) { counts.push(matchCount); if (matchCount === 1) break; matchCount = Math.floor(matchCount / 2); }
    var stages = counts.map(function (count) { return count === 1 ? "Финал" : count === 2 ? "Полуфинал" : "1/" + String(count); });
    return counts.map(function (count, roundIndex) {
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
        name: stages[roundIndex] === "Гранд финал" ? "Гранд-Финал" : "",
        stageLabel: stages[roundIndex],
        loserBracket: stages[roundIndex] === "Гранд финал",
        matches: matches,
      };
    });
  }

  function buildLoserBracketSkeletonRounds() {
    return [8, 8, 4, 4, 2, 2, 1, 1, 1].map(function (count, roundIndex) {
      var matches = [];
      for (var index = 0; index < count; index += 1) {
        matches.push({
          id: "loser-preview-" + String(roundIndex) + "-" + String(index),
          index: index + 1,
          playerIds: [],
          loserBracket: true,
        });
      }
      return {
        id: "loser-preview-round-" + String(roundIndex),
        index: roundIndex + 1,
        name: roundIndex === 8 ? "Гранд-финал" : "",
        matches: matches,
        loserBracket: true,
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
    "покерманки": "./assets/summer-rating-player-pokermanki.webp?v=3.547",
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
    return entry && (entry.avatar || entry.avatarUrl || entry.profileAvatar || entry.photoUrl || entry.photo_url)
      ? String(entry.avatar || entry.avatarUrl || entry.profileAvatar || entry.photoUrl || entry.photo_url)
      : "";
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

  function renderBracketPlayerAvatar(player) {
    var profileId = player && player.accountId ? String(player.accountId) : "";
    var profileName = playerName(player);
    var avatar = playerAvatar(player);
    var attrs = profileId
      ? ' data-sng-profile="' + escapeHtml(profileId) + '" data-sng-profile-name="' + escapeHtml(profileName) + '" data-sng-profile-avatar="' + escapeHtml(avatar) + '"'
      : "";
    return '<button type="button" class="sng-champions-modal__bracket-avatar" aria-label="Открыть профиль ' + escapeHtml(profileName) + '"' + attrs + '>' +
      renderPlayerImage(player) +
      (player.level != null ? '<em>' + escapeHtml(String(Math.max(0, Math.floor(Number(player.level) || 0)))) + '</em>' : '') +
    '</button>';
  }

  function renderBracketPlayerName(player) {
    var profileId = player && player.accountId ? String(player.accountId) : "";
    var profileName = playerName(player);
    var avatar = playerAvatar(player);
    var telegram = playerTelegram(player);
    var attrs = profileId
      ? ' data-sng-profile="' + escapeHtml(profileId) + '" data-sng-profile-name="' + escapeHtml(profileName) + '" data-sng-profile-avatar="' + escapeHtml(avatar) + '"'
      : "";
    return '<span class="sng-champions-modal__bracket-player-main">' +
      '<button type="button" class="sng-champions-modal__bracket-player-name"' + attrs + '>' + escapeHtml(profileName) + '</button>' +
      playerMetaHtml(player, "sng-champions-modal__bracket-player-level") +
      (telegram ? '<a class="sng-champions-modal__bracket-player-telegram" href="' + escapeHtml(telegram.href) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(telegram.label) + '</a>' : '') +
    '</span>';
  }

  function matchScoreText(match) {
    var score = match && match.score && typeof match.score === "object" ? match.score : null;
    if (!score) return "";
    var winner = Number(score.winner);
    var loser = Number(score.loser);
    if (!Number.isFinite(winner) || !Number.isFinite(loser)) return "";
    return String(winner) + "-" + String(loser);
  }

  function seriesTargetFromLabel(label, losers) {
    var normalized = String(label || "").toLowerCase();
    if (losers) {
      if (normalized.indexOf("гранд-финал") >= 0) return 3;
      return normalized === "l финал" || normalized === "финал сетки №2" ? 2 : 0;
    }
    if (normalized === "полуфинал" || normalized.indexOf("1/2") >= 0) return 2;
    if (normalized.indexOf("финал") >= 0) return 3;
    return 0;
  }

  function matchSeriesTarget(match, data) {
    var groups = [
      { rounds: Array.isArray(data && data.rounds) ? data.rounds : [], losers: false },
      { rounds: Array.isArray(data && data.loserRounds) ? data.loserRounds : [], losers: true },
    ];
    for (var groupIndex = 0; groupIndex < groups.length; groupIndex += 1) {
      var rounds = groups[groupIndex].rounds;
      for (var roundIndex = 0; roundIndex < rounds.length; roundIndex += 1) {
        var matches = Array.isArray(rounds[roundIndex] && rounds[roundIndex].matches) ? rounds[roundIndex].matches : [];
        if (matches.indexOf(match) < 0) continue;
        var label = groups[groupIndex].losers
          ? loserRoundStageLabel(rounds[roundIndex], roundIndex)
          : roundStageLabel(rounds[roundIndex], roundIndex, rounds);
        return seriesTargetFromLabel(label, groups[groupIndex].losers);
      }
    }
    return 0;
  }

  function matchSeriesScore(match) {
    var ids = Array.isArray(match && match.playerIds) ? match.playerIds.filter(Boolean) : [];
    var live = match && match.liveScore && typeof match.liveScore === "object" ? match.liveScore : null;
    if (!match || ids.length < 2) return { first: 0, second: 0, text: "0-0" };
    if (!match.winnerId || !match.score) {
      var liveFirst = Math.max(0, Math.floor(Number(live && live.first) || 0));
      var liveSecond = Math.max(0, Math.floor(Number(live && live.second) || 0));
      return { first: liveFirst, second: liveSecond, text: String(liveFirst) + "-" + String(liveSecond) };
    }
    var winnerGames = Math.max(0, Math.floor(Number(match.score.winner) || 0));
    var loserGames = Math.max(0, Math.floor(Number(match.score.loser) || 0));
    var winnerId = String(match.score.winnerId || match.winnerId || "");
    var first = winnerId === String(ids[0]) ? winnerGames : loserGames;
    var second = winnerId === String(ids[1]) ? winnerGames : loserGames;
    return { first: first, second: second, text: String(first) + "-" + String(second) };
  }

  function seriesRuleText(target) {
    return target ? "Игра до " + String(target) + " побед" : "";
  }

  function renderBracketSeriesRule(match, data, map) {
    var target = matchSeriesTarget(match, data);
    if (!target) return "";
    return '<span class="sng-champions-modal__' + (map ? 'map-' : '') + 'series-rule">' + escapeHtml(seriesRuleText(target)) + '</span>';
  }

  function renderBracketMatchSeriesScore(match, data) {
    var target = matchSeriesTarget(match, data);
    var ids = Array.isArray(match && match.playerIds) ? match.playerIds.filter(Boolean) : [];
    if (!target || ids.length < 2) return "";
    var score = matchSeriesScore(match);
    if (!data.isAdmin) {
      return '<div class="sng-champions-modal__series-score"><span>Счёт матча</span><strong>' + escapeHtml(score.text) + '</strong></div>';
    }
    var firstPlayer = data.playersById && data.playersById[ids[0]] ? data.playersById[ids[0]] : { id: ids[0] };
    var secondPlayer = data.playersById && data.playersById[ids[1]] ? data.playersById[ids[1]] : { id: ids[1] };
    return '<div class="sng-champions-modal__series-score sng-champions-modal__series-score--editable" data-sng-score-editor="' + escapeHtml(match.id || "") + '">' +
      '<span>Счёт матча</span>' +
      '<label title="' + escapeHtml(playerName(firstPlayer)) + '"><input type="number" min="0" max="' + escapeHtml(match.winnerId ? target : target - 1) + '" inputmode="numeric" value="' + escapeHtml(score.first) + '" data-sng-score-first aria-label="Победы ' + escapeHtml(playerName(firstPlayer)) + '"></label>' +
      '<b>:</b>' +
      '<label title="' + escapeHtml(playerName(secondPlayer)) + '"><input type="number" min="0" max="' + escapeHtml(match.winnerId ? target : target - 1) + '" inputmode="numeric" value="' + escapeHtml(score.second) + '" data-sng-score-second aria-label="Победы ' + escapeHtml(playerName(secondPlayer)) + '"></label>' +
      '<button type="button" data-sng-save-score="' + escapeHtml(match.id || "") + '" aria-label="Сохранить промежуточный счёт">✓</button>' +
    '</div>';
  }

  function renderBracketMapSeriesScore(match, data) {
    if (!matchSeriesTarget(match, data)) return "";
    return '<span class="sng-champions-modal__map-series-score">Счёт ' + escapeHtml(matchSeriesScore(match).text) + '</span>';
  }

  function matchRequiresScore(match, data) {
    if (!match || !data) return false;
    var ids = (match.playerIds || []).filter(Boolean);
    if (ids.length < 2) return false;
    return matchSeriesTarget(match, data) > 0;
  }

  function findMatchById(data, matchId) {
    var rounds = []
      .concat(Array.isArray(data && data.rounds) ? data.rounds : [])
      .concat(Array.isArray(data && data.loserRounds) ? data.loserRounds : []);
    for (var i = 0; i < rounds.length; i += 1) {
      var matches = Array.isArray(rounds[i] && rounds[i].matches) ? rounds[i].matches : [];
      for (var j = 0; j < matches.length; j += 1) {
        if (String(matches[j] && matches[j].id || "") === String(matchId || "")) return matches[j];
      }
    }
    return null;
  }

  function bracketAllMatches(data) {
    var out = [];
    []
      .concat(Array.isArray(data && data.rounds) ? data.rounds : [])
      .concat(Array.isArray(data && data.loserRounds) ? data.loserRounds : [])
      .forEach(function (round) {
        (round && Array.isArray(round.matches) ? round.matches : []).forEach(function (match) {
          out.push(match);
        });
      });
    return out;
  }

  function sameBracketPair(match, firstId, secondId) {
    var ids = Array.isArray(match && match.playerIds) ? match.playerIds.filter(Boolean) : [];
    if (ids.length < 2) return false;
    return (ids[0] === firstId && ids[1] === secondId) || (ids[0] === secondId && ids[1] === firstId);
  }

  function bracketMatchCompletedTime(match) {
    var time = Date.parse(String(match && match.completedAt || ""));
    return Number.isFinite(time) ? time : NaN;
  }

  function bracketHeadToHeadScore(match, data) {
    var ids = Array.isArray(match && match.playerIds) ? match.playerIds.filter(Boolean) : [];
    if (ids.length < 2) return null;
    var firstId = ids[0];
    var secondId = ids[1];
    var matches = bracketAllMatches(data);
    var currentIndex = matches.indexOf(match);
    var currentTime = bracketMatchCompletedTime(match);
    var firstWins = 0;
    var secondWins = 0;
    matches.forEach(function (item, index) {
      if (!item || !item.winnerId || !sameBracketPair(item, firstId, secondId)) return;
      var include = false;
      if (item === match) {
        include = !!match.winnerId;
      } else {
        var itemTime = bracketMatchCompletedTime(item);
        if (Number.isFinite(currentTime) && Number.isFinite(itemTime)) include = itemTime <= currentTime;
        else if (Number.isFinite(currentTime)) include = currentIndex < 0 || index < currentIndex;
        else if (Number.isFinite(itemTime)) include = true;
        else include = currentIndex < 0 || index < currentIndex;
      }
      if (!include) return;
      if (item.winnerId === firstId) firstWins += 1;
      else if (item.winnerId === secondId) secondWins += 1;
    });
    return {
      first: firstWins,
      second: secondWins,
      text: String(firstWins) + "-" + String(secondWins),
    };
  }

  function renderBracketHeadToHead(match, data) {
    var ids = Array.isArray(match && match.playerIds) ? match.playerIds.filter(Boolean) : [];
    if (ids.length < 2) return "";
    var score = bracketHeadToHeadScore(match, data);
    if (!score) return "";
    return '<div class="sng-champions-modal__match-meta sng-champions-modal__match-meta--h2h"><span>Личные встречи</span><strong>' + escapeHtml(score.text) + '</strong></div>';
  }

  function renderBracketMapHeadToHead(match, data) {
    var ids = Array.isArray(match && match.playerIds) ? match.playerIds.filter(Boolean) : [];
    if (ids.length < 2) return "";
    var score = bracketHeadToHeadScore(match, data);
    if (!score) return "";
    return '<span class="sng-champions-modal__map-h2h" aria-label="Личные встречи ' + escapeHtml(score.text) + '">' +
      '<span>' + escapeHtml(score.first) + '</span>' +
      '<span>−</span>' +
      '<span>' + escapeHtml(score.second) + '</span>' +
    '</span>';
  }

  function readMatchScore(winnerName, targetWins) {
    var target = Math.max(1, Number(targetWins) || 1);
    var example = String(target) + "-0";
    var text = window.prompt("Введите итоговый счёт для " + String(winnerName || "победителя") + ". Например: " + example, example);
    if (text == null) return null;
    var match = String(text || "").trim().match(/^(\d{1,2})\s*[-:]\s*(\d{1,2})$/);
    if (!match) {
      showAlert("Введите счёт в формате 2-1 или 3-1.");
      return false;
    }
    var winner = Number(match[1]);
    var loser = Number(match[2]);
    if (!Number.isFinite(winner) || !Number.isFinite(loser) || winner !== target || loser < 0 || loser >= target) {
      showAlert("Итоговый счёт должен соответствовать игре до " + String(target) + " побед.");
      return false;
    }
    return { winner: winner, loser: loser, text: String(winner) + "-" + String(loser) };
  }

  function renderTabs(createHtml, signupHtml, bracketHtml, teamsHtml, data) {
    var isAdmin = !!(data && data.isAdmin);
    var bracketStarted = data && data.status === "bracket";
    var tab = activeTabManual
      ? (activeTab === "bracket" ? "bracket" : activeTab === "teams" && data.tournamentType === "team" ? "teams" : activeTab === "create" && isAdmin ? "create" : "signup")
      : (bracketStarted ? "bracket" : activeTab === "create" && isAdmin ? "create" : "signup");
    var signupTab = '<button type="button" class="club-choice-vote-modal__tab' + (tab === "signup" ? " club-choice-vote-modal__tab--active" : "") + '" role="tab" aria-selected="' + (tab === "signup" ? "true" : "false") + '" data-sng-tab="signup">Инфо</button>';
    var bracketTab = '<button type="button" class="club-choice-vote-modal__tab' + (tab === "bracket" ? " club-choice-vote-modal__tab--active" : "") + '" role="tab" aria-selected="' + (tab === "bracket" ? "true" : "false") + '" data-sng-tab="bracket">Сетка</button>';
    var teamsTab = data.tournamentType === "team" ? '<button type="button" class="club-choice-vote-modal__tab' + (tab === "teams" ? " club-choice-vote-modal__tab--active" : "") + '" data-sng-tab="teams">Команды</button>' : '';
    activeTab = tab;
    return '<div class="sng-champions-modal__detail-nav"><button type="button" class="sng-champions-modal__back" data-sng-tournament-back>← Турниры</button></div>' +
      '<div class="club-choice-vote-modal__tabs sng-champions-modal__tabs" role="tablist" aria-label="Разделы турнира">' +
        bracketTab + teamsTab + signupTab +
      '</div>' +
      '<div class="club-choice-vote-modal__tab-panels">' +
        (isAdmin ? '<div class="club-choice-vote-modal__tab-panel" data-sng-tab-panel="create"' + (tab === "create" ? "" : " hidden") + '>' + createHtml + '</div>' : "") +
        '<div class="club-choice-vote-modal__tab-panel" data-sng-tab-panel="signup"' + (tab === "signup" ? "" : " hidden") + '>' + signupHtml + '</div>' +
        '<div class="club-choice-vote-modal__tab-panel" data-sng-tab-panel="bracket"' + (tab === "bracket" ? "" : " hidden") + '>' + bracketHtml + '</div>' +
        (data.tournamentType === "team" ? '<div class="club-choice-vote-modal__tab-panel" data-sng-tab-panel="teams"' + (tab === "teams" ? "" : " hidden") + '>' + teamsHtml + '</div>' : '') +
      '</div>';
  }

  function setTab(tabName) {
    var isAdmin = !!(state && state.isAdmin);
    activeTab = tabName === "bracket" ? "bracket" : tabName === "teams" && state && state.tournamentType === "team" ? "teams" : tabName === "create" && isAdmin ? "create" : "signup";
    activeTabManual = true;
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

  function scrollSngBodyTop() {
    if (!bodyEl) return;
    try {
      bodyEl.scrollTop = 0;
    } catch (eScrollTop) {}
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
    var winner = data.winnerId && data.playersById ? data.playersById[data.winnerId] : null;
    var winnerHtml = winner ? '<article class="club-choice-vote-modal__candidate sng-champions-modal__champion-card">' +
      '<div class="club-choice-vote-modal__candidate-main">' + renderPlayerAvatar(Object.assign({ id: data.winnerId }, winner)) +
      '<div><span>Победитель турнира</span><strong>' + escapeHtml(winner.pokerPlusNickname || winner.displayName || "Чемпион") + '</strong></div></div></article>' : "";
    return '<div class="sng-champions-modal__tournament-card' + (winner ? ' sng-champions-modal__tournament-card--completed' : '') + '">' +
      '<div class="sng-champions-modal__tournament-main"><figure class="sng-champions-modal__hero">' +
        '<img src="./assets/sng-champions-hero-v2.webp?v=1" alt="Кубок СНГ Лиги Чемпионов, фишки и два туза на современной покерной арене" width="1672" height="941" loading="eager" decoding="async">' +
        '<span class="sng-champions-modal__hero-season">СЕЗОН 2026 · LIVE</span>' +
        '<strong class="sng-champions-modal__hero-title">СНГ ЛИГА ЧЕМПИОНОВ<small>ДВА ТУЗА</small></strong>' +
        (data.activeStage ? '<span class="sng-champions-modal__hero-stage"><i></i>' + escapeHtml(data.activeStage) + '</span>' : '') +
        '<span class="sng-champions-modal__hero-live sng-champions-modal__hero-live--players" aria-label="Подтвержденных игроков">' + escapeHtml(String(approved) + "/" + String(capacity)) + '</span>' +
        '<span class="sng-champions-modal__hero-live sng-champions-modal__hero-live--requests" aria-label="Активных заявок">' + escapeHtml(activeEntries) + '</span>' +
        '<span class="sng-champions-modal__hero-live sng-champions-modal__hero-live--waiting" aria-label="Ждут подтверждения">' + escapeHtml(pending) + '</span>' +
        (edit ? '<figcaption class="sng-champions-modal__signup-tools">' + edit + '</figcaption>' : '') +
      '</figure></div>' + winnerHtml + '</div>';
  }

  function renderTournamentMenu(data) {
    var rows = Array.isArray(data.tournaments) ? data.tournaments : [];
    if (!rows.length) return "";
    var createForm = data.isAdmin && tournamentCreateFormOpen
      ? '<form class="sng-champions-modal__create-tournament" data-sng-create-tournament-form>' +
          '<h3>Новый турнир</h3>' +
          '<label class="sng-champions-modal__create-wide"><span>Название</span><input type="text" name="title" maxlength="80" required value="1ый СНГ-баттл Лига чемпионов Два туза"></label>' +
          '<label class="sng-champions-modal__create-wide"><span>Описание</span><textarea name="description" maxlength="280" rows="3" placeholder="Условия и важные детали турнира"></textarea></label>' +
          '<label><span>Формат</span><select name="tournamentType"><option value="solo">Одиночный</option><option value="team">Командный · по 2 игрока</option></select></label>' +
          '<label><span>Вход</span><input type="text" name="buyIn" maxlength="80" required value="1000р"></label>' +
          '<label><span>Количество участников</span><select name="capacity"><option value="16">16</option><option value="32" selected>32</option><option value="64">64</option></select></label>' +
          '<label><span>1 место</span><input type="text" name="prize1" maxlength="160" required value="50 000р"></label>' +
          '<label><span>2 место</span><input type="text" name="prize2" maxlength="160" required value="Билет за 10 000р"></label>' +
          '<label class="sng-champions-modal__create-wide"><span>Сетка лузеров</span><select name="loserBracketEnabled"><option value="true">Да — Double Elimination</option><option value="false">Нет — на выбывание</option></select></label>' +
          '<label class="sng-champions-modal__create-wide"><span>Нокаут</span><select name="knockoutEnabled"><option value="false">Нет</option><option value="true">Да</option></select></label>' +
          '<section class="sng-champions-modal__payout-builder sng-champions-modal__create-wide" data-sng-payout-builder hidden>' +
            '<h4>Распределение призового фонда</h4><p>Нокаут в командном турнире выплачивается команде целиком. При сетке лузеров учитывается только верхняя сетка.</p>' +
            '<div class="sng-champions-modal__payout-summary"><span>Общий фонд <b data-sng-payout-total>0р</b></span><span>Осталось <b data-sng-payout-left>0р</b></span></div>' +
            '<h5>Награды за места</h5><div class="sng-champions-modal__payout-grid">' + [1,2,3,4,5].map(function (place) { return '<label><span>' + place + ' место</span><input type="number" min="0" step="100" name="payoutPlace' + place + '" value="0"></label>'; }).join('') + '</div>' +
            '<h5>Нокауты в верхней сетке</h5><div class="sng-champions-modal__payout-grid">' + ["1/32","1/16","1/8","1/4","1/2","Финал"].map(function (stage, index) { return '<label data-sng-knockout-stage="' + escapeHtml(stage) + '"><span>' + escapeHtml(stage) + '</span><input type="number" min="0" step="100" name="payoutStage' + index + '" value="0"></label>'; }).join('') + '</div>' +
          '</section>' +
          '<label class="sng-champions-modal__create-wide sng-champions-modal__create-check"><input type="checkbox" name="isTest"><span><b>Тестовый турнир</b><small>Виден только администраторам и не попадает в общие списки и достижения.</small></span></label>' +
          '<div class="sng-champions-modal__create-actions"><button type="button" data-sng-create-tournament-cancel>Отмена</button><button type="submit">Создать турнир</button></div>' +
        '</form>'
      : '';
    return '<section class="sng-champions-modal__tournament-picker"><div class="sng-champions-modal__tournament-picker-head"><span>Выберите турнир</span>' +
      (data.isAdmin ? '<button type="button" data-sng-create-tournament>+ Новый турнир</button>' : '') + '</div><div class="sng-champions-modal__tournament-options">' +
      rows.map(function (item) {
        var expanded = expandedTournamentParticipantsId === item.id;
        var participantRows = expanded && data.tournamentId === item.id ? (data.entries || []).filter(function (entry) { return entry && entry.status !== "rejected"; }) : [];
        var participantHtml = expanded
          ? '<div class="sng-champions-modal__tournament-participants">' +
              (data.tournamentId === item.id
                ? (participantRows.length ? renderEntryColumn("Участники", participantRows, data) : '<div class="sng-champions-modal__entries-empty">Пока участников нет.</div>')
                : '<div class="club-choice-vote-modal__loading">Загружаем участников...</div>') +
            '</div>'
          : '';
        return '<article class="sng-champions-modal__tournament-option-wrap' + (item.id === data.tournamentId ? ' is-active' : '') + '">' +
          (data.isAdmin && item.status !== "bracket" && item.status !== "completed" ? '<button type="button" class="sng-champions-modal__tournament-delete" data-sng-delete-tournament="' + escapeHtml(item.id) + '" data-sng-delete-title="' + escapeHtml(item.title) + '" aria-label="Удалить турнир ' + escapeHtml(item.title) + '">×</button>' : '') +
          '<button type="button" class="sng-champions-modal__tournament-option" data-sng-tournament="' + escapeHtml(item.id) + '">' +
            '<span class="sng-champions-modal__tournament-art" aria-hidden="true"><img src="./assets/sng-tournament-card-art.webp?v=3" alt=""></span>' +
            '<span class="sng-champions-modal__tournament-content"><strong class="sng-champions-modal__tournament-title">' + escapeHtml(item.title) + (item.isTest ? ' <em class="sng-champions-modal__test-badge">ТЕСТ</em>' : '') + '</strong>' +
              '<span class="sng-champions-modal__tournament-live"><i></i>' + escapeHtml(item.activeStage ? 'Сейчас идёт: ' + item.activeStage : statusLabel(item.status)) + ' · <b>' + escapeHtml(String(item.approved || 0)) + '/' + escapeHtml(String(item.capacity || 32)) + '</b></span>' +
              '<dl class="sng-champions-modal__tournament-facts">' +
                '<div><dt><i>●</i>Вход</dt><dd>' + escapeHtml(item.buyIn || "1000р") + '</dd></div>' +
                '<div><dt><i>★</i>1 место</dt><dd>' + escapeHtml(item.prize1 || "50 000р") + '</dd></div>' +
                '<div><dt><i>♧</i>Сетка лузеров</dt><dd>' + (item.loserBracket ? 'Да' : 'Нет') + '</dd></div>' +
                (item.knockoutEnabled ? '<div><dt><i>KO</i>Нокаут</dt><dd>Да</dd></div>' : '') +
              '</dl>' +
            '</span>' +
          '</button>' +
          '<button type="button" class="sng-champions-modal__participants-toggle" data-sng-tournament-participants="' + escapeHtml(item.id) + '" aria-expanded="' + (expanded ? 'true' : 'false') + '"><span>Участники</span><b>' + escapeHtml(String(item.approved || 0)) + '</b><i>⌄</i></button>' + participantHtml + '</article>';
      }).join('') +
      '</div>' + createForm + '</section>';
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
    var canForm = data.status === "open" && data.counts && data.counts.approved >= data.capacity && (data.tournamentType !== "team" || (data.teams || []).length === data.capacity / 2);
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
        playerMetaHtml(entry, "sng-champions-modal__entry-meta") +
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
    var adminButton = data.isAdmin && data.status === "bracket" && matchPlayers.length >= 2 && !match.winnerId
      ? '<button type="button" class="sng-champions-modal__winner-btn" data-sng-winner="' + escapeHtml(match.id) + '" data-sng-player="' + escapeHtml(player.id) + '">Победил</button>'
      : "";
    var readyBadge = !won ? '<small class="sng-champions-modal__ready-badge sng-champions-modal__ready-badge--' + (ready ? "ready" : "waiting") + '">' + (ready ? "Готов" : "Ждет") + '</small>' : "";
    var scoreBadge = won && matchScoreText(match) ? '<small class="sng-champions-modal__ready-badge sng-champions-modal__ready-badge--score">Счёт ' + escapeHtml(matchScoreText(match)) + '</small>' : "";
    var playerClass = "sng-champions-modal__bracket-player" +
      (advanced ? " sng-champions-modal__bracket-player--advanced" : "") +
      (ready && !won && !match.winnerId ? " sng-champions-modal__bracket-player--ready" : "") +
      (match.winnerId && !won ? " sng-champions-modal__bracket-player--lost" : "") +
      (won ? " sng-champions-modal__bracket-player--winner" : "");
    return '<div class="' + playerClass + '">' +
      renderBracketPlayerAvatar(player) +
      renderBracketPlayerName(player) +
      readyBadge +
      scoreBadge +
      (won ? '<strong>Победитель</strong>' : adminButton) +
      '</div>';
  }

  function renderBracketPendingPlayer() {
    return '<div class="sng-champions-modal__bracket-player sng-champions-modal__bracket-player--pending">' +
      '<span class="sng-champions-modal__bracket-avatar sng-champions-modal__bracket-avatar--pending"><b>?</b></span>' +
      '<span class="sng-champions-modal__bracket-player-main"><span class="sng-champions-modal__bracket-player-name">???</span></span>' +
      '<small class="sng-champions-modal__ready-badge sng-champions-modal__ready-badge--waiting">Ждет</small>' +
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
    var password = String(match.tablePassword || "").replace(/\D/g, "").slice(0, 4);
    return '<div class="sng-champions-modal__playing-tools">' +
      '<label class="sng-champions-modal__table-password"><span>Пароль стола</span><input type="text" inputmode="numeric" pattern="[0-9]*" maxlength="4" autocomplete="off" data-sng-table-password="' + escapeHtml(match.id || "") + '" value="' + escapeHtml(password) + '"' + (active ? " disabled" : "") + '></label>' +
      '<button type="button" class="sng-champions-modal__playing-btn' + (active ? " sng-champions-modal__playing-btn--active" : "") + '" data-sng-playing="' + escapeHtml(match.id || "") + '">' + (active ? "Играют" : "Играют") + '</button>' +
    '</div>';
  }

  function renderRemindAction(match, players, data) {
    if (!data || !data.isAdmin || data.status !== "bracket" || !match || match.winnerId || players.length < 2) return "";
    var allReady = players.every(function (id) { return match.readyById && match.readyById[id] === true; });
    if (allReady) return "";
    return '<button type="button" class="sng-champions-modal__remind-btn" data-sng-remind="' + escapeHtml(match.id || "") + '">Напомнить</button>';
  }

  function renderBracketMatch(match, data) {
    var players = (match.playerIds || []).filter(Boolean);
    var countdown = formatReadyCountdown(match, data);
    var tablePassword = String(match.tablePassword || "").replace(/\D/g, "").slice(0, 4);
    var tablePasswordHtml = '<div class="sng-champions-modal__match-meta' + (tablePassword ? "" : " sng-champions-modal__match-meta--empty") + '">' +
      '<span>Пароль стола</span><strong>' + (tablePassword ? escapeHtml(tablePassword) : '&nbsp;') + '</strong>' +
    '</div>';
    var playerRows = players.length ? players.map(function (id) {
      return renderBracketPlayer((data.playersById && data.playersById[id]) || { id: id, displayName: "Игрок" }, match, data);
    }).join("") + (players.length === 1 && !match.winnerId ? renderBracketPendingPlayer() : "") : '<div class="club-choice-vote-modal__empty">Ожидает победителей.</div>';
    var matchClass = "sng-champions-modal__bracket-match" +
      (match.playingAt && !match.winnerId ? " sng-champions-modal__bracket-match--playing" : "") +
      (match.winnerId ? " sng-champions-modal__bracket-match--done" : "") +
      (matchSeriesTarget(match, data) ? " sng-champions-modal__bracket-match--series" : "");
    var knockoutBadge = Number(data && data.stageKnockoutAmount) > 0 ? '<span class="sng-champions-modal__match-knockout">Нокаут <b>' + escapeHtml(Number(data.stageKnockoutAmount).toLocaleString("ru-RU")) + 'р</b></span>' : '';
    return '<article class="' + matchClass + '">' +
      renderBracketSeriesRule(match, data, false) +
      '<header>Пара ' + escapeHtml(match.index || "") + knockoutBadge + (countdown ? '<small>' + escapeHtml(countdown) + '</small>' : '') + '</header>' +
      renderBracketHeadToHead(match, data) +
      playerRows +
      tablePasswordHtml +
      renderPlayingAction(match, players, data) +
      renderRemindAction(match, players, data) +
      renderReadyAction(match, players, data) +
      renderBracketMatchSeriesScore(match, data) +
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

  function renderBracketMapPlayer(id, match, data, waitingForOpponent, unplayed) {
    var player = (data.playersById && data.playersById[id]) || { id: id, displayName: "Игрок" };
    var won = match.winnerId && match.winnerId === id;
    var advanced = playerAdvancedToOpenMatch(id, match, data);
    var lost = match.winnerId && !won;
    var ready = match.readyById && match.readyById[id] === true;
    return '<span class="sng-champions-modal__map-player' + (advanced ? " sng-champions-modal__map-player--advanced" : "") + (ready && !match.winnerId ? " sng-champions-modal__map-player--ready" : "") + (lost ? " sng-champions-modal__map-player--lost" : "") + (won ? " sng-champions-modal__map-player--winner" : "") + (waitingForOpponent ? " sng-champions-modal__map-player--waiting" : "") + (unplayed ? " sng-champions-modal__map-player--unplayed" : "") + '">' +
      '<span class="sng-champions-modal__map-player-name">' + escapeHtml(playerName(player)) + '</span>' +
      playerMetaHtml(player, "sng-champions-modal__map-player-meta") +
    '</span>';
  }

  function renderBracketMapPendingPlayer() {
    return '<span class="sng-champions-modal__map-player sng-champions-modal__map-player--pending">???</span>';
  }

  function nextMapMatchIndex(round, match, roundIndex, rounds) {
    if (!round || !match || !Array.isArray(rounds) || roundIndex >= rounds.length - 1) return 0;
    var matchIndex = Math.max(1, Number(match.index) || 1);
    if (round.loserBracket) {
      var lowerRoundIndex = Number(round.index) || (roundIndex + 1);
      if (lowerRoundIndex === 1 || lowerRoundIndex === 3 || lowerRoundIndex === 5) return matchIndex;
      if (lowerRoundIndex === 7 || lowerRoundIndex === 8) return 1;
    }
    return Math.ceil(matchIndex / 2);
  }

  function mapLaneClass(nextIndex) {
    if (!nextIndex) return "";
    return " sng-champions-modal__map-match--lane-" + String(((Math.max(1, nextIndex) - 1) % 8) + 1);
  }

  function renderBracketMapMatch(match, data, round, roundIndex, rounds, options) {
    options = options || {};
    var playerIds = Array.isArray(match.playerIds) ? match.playerIds.slice(0, 2) : [];
    var nextIndex = nextMapMatchIndex(round, match, roundIndex, rounds);
    while (playerIds.length < 2) playerIds.push("");
    var knownCount = playerIds.filter(function (id) { return !!id; }).length;
    var hasKnownPlayer = knownCount > 0;
    var hasPendingPlayer = playerIds.some(function (id) { return !id; });
    var waitingForOpponent = !match.winnerId && hasKnownPlayer && hasPendingPlayer;
    var unplayed = !match.winnerId && knownCount >= 2;
    var hasRichPlayerMeta = playerIds.some(function (id) {
      var player = id && data.playersById ? data.playersById[id] : null;
      return !!(player && (playerLevelText(player) || playerCityText(player)));
    });
    var selectedClass = options.selected ? " sng-champions-modal__map-match--selected" : "";
    var focusClass = options.focus ? " sng-champions-modal__map-match--focus" : "";
    var seriesClass = matchSeriesTarget(match, data) ? " sng-champions-modal__map-match--series" : "";
    var styleParts = [];
    if (options.rowStart) styleParts.push("--sng-map-row-start:" + String(options.rowStart));
    if (options.rowSpan) styleParts.push("--sng-map-row-span:" + String(options.rowSpan));
    if (options.connectorHeight) styleParts.push("--sng-map-connector-height:" + String(options.connectorHeight));
    var styleAttr = styleParts.length ? ' style="' + escapeHtml(styleParts.join(";")) + '"' : "";
    var attrs = options.interactive === false ? "" : ' role="button" tabindex="0" data-sng-map-match="' + escapeHtml(match.id || "") + '" data-sng-map-round="' + escapeHtml(roundIndex) + '"';
    var knockoutReward = Number(options.knockoutAmount) || 0;
    return '<article class="sng-champions-modal__map-match' + selectedClass + focusClass + seriesClass + (match.winnerId ? " sng-champions-modal__map-match--done" : "") + (waitingForOpponent ? " sng-champions-modal__map-match--waiting" : "") + (unplayed ? " sng-champions-modal__map-match--unplayed" : "") + (hasRichPlayerMeta ? " sng-champions-modal__map-match--rich" : "") + (nextIndex ? " sng-champions-modal__map-match--has-next" : "") + mapLaneClass(nextIndex) + '"' + styleAttr + attrs + '>' +
      (knockoutReward ? '<span class="sng-champions-modal__map-match-reward">+' + escapeHtml(knockoutReward.toLocaleString("ru-RU")) + 'р команде за проход</span>' : '') +
      renderBracketSeriesRule(match, data, true) +
      '<span class="sng-champions-modal__map-match-index">' + escapeHtml(match.index || "") + '</span>' +
      '<span class="sng-champions-modal__map-players">' +
        playerIds.map(function (id) { return id ? renderBracketMapPlayer(id, match, data, waitingForOpponent, unplayed) : renderBracketMapPendingPlayer(); }).join("") +
      '</span>' +
      renderBracketMapHeadToHead(match, data) +
      renderBracketMapSeriesScore(match, data) +
      (nextIndex ? '<span class="sng-champions-modal__map-next">к паре ' + escapeHtml(nextIndex) + '</span>' : '') +
    '</article>';
  }

  function selectedBracketMapMatch(rounds, kind) {
    if (!activeBracketMapSelection || activeBracketMapSelection.kind !== kind) return null;
    var roundIndex = Math.max(0, Number(activeBracketMapSelection.roundIndex) || 0);
    var round = rounds[roundIndex];
    var matches = Array.isArray(round && round.matches) ? round.matches : [];
    var matchId = String(activeBracketMapSelection.matchId || "");
    var match = matches.find(function (item) {
      return item && String(item.id || "") === matchId;
    });
    return match ? { round: round, roundIndex: roundIndex, match: match } : null;
  }

  function renderBracketMap(rounds, data, isPreview, options) {
    options = options || {};
    var labelFn = options.labelFn || roundStageLabel;
    var stageIndex = Number(options.stageIndex) || 0;
    var stageAttr = options.stageAttr || "data-sng-stage-index";
    var title = options.title || "Вся сетка";
    var kind = options.kind || "winners";
    var fitToScreen = !!bracketMapFit[kind];
    var selected = selectedBracketMapMatch(rounds, kind);
    var extraClass = options.extraClass ? " " + options.extraClass : "";
    var expandedClass = bracketMapExpanded ? " sng-champions-modal__bracket-map-wrap--expanded" : "";
    var fitClass = fitToScreen ? " sng-champions-modal__bracket-map-wrap--fit" : "";
    var mapToggleButton = '<button type="button" data-sng-bracket-map="' + (bracketMapExpanded ? "close" : "open") + '">' + (bracketMapExpanded ? "Закрыть" : "Увеличить") + '</button>';
    var mapFitButton = '<button type="button" data-sng-bracket-map-fit="' + escapeHtml(kind) + '">' + (fitToScreen ? "Вернуть" : "Уменьшить") + '</button>';
    var baseMatchCount = Math.max.apply(null, rounds.map(function (round) {
      return Array.isArray(round && round.matches) ? round.matches.length : 0;
    }).concat([1]));
    var isTournamentMap = /\bsng-champions-modal__bracket-map-wrap--(?:winners|losers)\b/.test(options.extraClass || "");
    var connectorRowStep = isTournamentMap
      ? (kind === "losers" ? (bracketMapExpanded ? 93 : 68) : (bracketMapExpanded ? 89 : 64))
      : (bracketMapExpanded ? 47 : 46);
    return '<section class="sng-champions-modal__bracket-map-wrap' + expandedClass + fitClass + (isPreview ? " sng-champions-modal__bracket-map-wrap--preview" : "") + extraClass + '" aria-label="Миниатюрная сетка всего турнира">' +
      '<div class="sng-champions-modal__bracket-map-head">' +
        '<strong>' + escapeHtml(title) + '</strong>' +
        '<span class="sng-champions-modal__bracket-map-head-actions">' + mapToggleButton + mapFitButton + '</span>' +
      '</div>' +
      '<div class="sng-champions-modal__bracket-map-legend"><span aria-hidden="true"></span>Красный круг - пара еще не сыграла</div>' +
      '<div class="sng-champions-modal__bracket-map" style="--sng-map-rows:' + escapeHtml(baseMatchCount) + '" role="img" aria-label="Обзор всех этапов СНГ Лиги Чемпионов">' +
        rounds.map(function (round, index) {
          var matchCount = Array.isArray(round && round.matches) ? round.matches.length : 0;
          var compactRoundClass = matchCount > 0 && matchCount <= 8 ? " sng-champions-modal__map-round--compact" : "";
          var roundLabel = labelFn(round, index, rounds);
          var payoutStage = roundLabel === "Полуфинал" ? "1/2" : roundLabel;
          var showMapAwards = kind === "winners" && !round.loserBracket && ["1/4", "1/2", "Финал"].indexOf(payoutStage) >= 0;
          var mapPayout = data && data.payoutConfig || { places: {}, knockouts: {} };
          var mapKnockout = showMapAwards && data.knockoutEnabled ? Number(mapPayout.knockouts && mapPayout.knockouts[payoutStage]) || 0 : 0;
          var mapPlaces = payoutStage === "Финал" ? [1, 2] : payoutStage === "1/2" ? [3, 4] : payoutStage === "1/4" ? [5] : [];
          var mapAwards = showMapAwards ? '<div class="sng-champions-modal__map-awards">' +
            mapPlaces.map(function (place) { var amount = Number(mapPayout.places && mapPayout.places[place]) || 0; return amount ? '<span class="sng-champions-modal__map-award"><b>' + place + ' место</b> +' + escapeHtml(amount.toLocaleString("ru-RU")) + 'р</span>' : ''; }).join('') +
          '</div>' : '';
          var namedStageClass = ["1/4", "Полуфинал", "Финал", "Гранд финал"].indexOf(roundLabel) >= 0
            ? " sng-champions-modal__map-round--named-stage"
            : "";
          var finalStageClass = payoutStage === "Финал" && kind === "winners" ? " sng-champions-modal__map-round--final-stage" : "";
          return '<div class="sng-champions-modal__map-round' + (index === stageIndex ? " sng-champions-modal__map-round--active" : "") + compactRoundClass + namedStageClass + finalStageClass + ' sng-champions-modal__map-round--matches-' + escapeHtml(matchCount) + '">' +
            '<button type="button" class="sng-champions-modal__map-round-title" ' + stageAttr + '="' + escapeHtml(index) + '"><span>' + escapeHtml(roundLabel) + '</span></button>' +
            mapAwards +
            '<div class="sng-champions-modal__map-round-matches">' +
              ((round.matches || []).map(function (match, matchIndex) {
                var isSelected = !!(selected && selected.roundIndex === index && selected.match && match && selected.match.id === match.id);
                var rowSpan = matchCount ? Math.max(1, Math.round(baseMatchCount / matchCount)) : 1;
                return renderBracketMapMatch(match, data, round, index, rounds, {
                  selected: isSelected,
                  rowStart: (matchIndex * rowSpan) + 1,
                  rowSpan: rowSpan,
                  knockoutAmount: mapKnockout,
                  connectorHeight: String(Math.max(28, (rowSpan * connectorRowStep) + (bracketMapExpanded ? 4 : 3))) + "px"
                });
              }).join("") || '<span class="sng-champions-modal__map-empty">Пусто</span>') +
            '</div>' +
          '</div>';
        }).join("") +
      '</div>' +
    '</section>';
  }

  function bracketRoundStatus(round) {
    var matches = Array.isArray(round && round.matches) ? round.matches : [];
    var playableMatches = matches.filter(function (match) {
      var ids = Array.isArray(match && match.playerIds) ? match.playerIds.filter(Boolean) : [];
      return ids.length >= 2;
    });
    if (!playableMatches.length) return null;
    var doneCount = matches.filter(function (match) { return !!match.winnerId; }).length;
    var totalCount = matches.length;
    var allDone = doneCount === totalCount;
    return allDone
      ? { kind: "done", text: "Все пары сыграли", done: doneCount, total: totalCount }
      : { kind: "live", text: "Идет", done: doneCount, total: totalCount };
  }

  function preferredBracketStageIndex(rounds, currentIndex) {
    var safeIndex = Math.max(0, Math.min(rounds.length - 1, Number(currentIndex) || 0));
    var currentStatus = bracketRoundStatus(rounds[safeIndex]);
    if (currentStatus && currentStatus.kind === "live") return safeIndex;
    var liveIndex = rounds.findIndex(function (round) {
      var status = bracketRoundStatus(round);
      return status && status.kind === "live";
    });
    return liveIndex >= 0 ? liveIndex : safeIndex;
  }

  function pairWord(count) {
    var value = Math.abs(Number(count) || 0);
    var lastTwo = value % 100;
    var last = value % 10;
    if (lastTwo >= 11 && lastTwo <= 14) return "пар";
    if (last === 1) return "пару";
    if (last >= 2 && last <= 4) return "пары";
    return "пар";
  }

  function grandFinalRound(data) {
    var rounds = Array.isArray(data && data.loserRounds) ? data.loserRounds : [];
    return rounds.filter(function (round) {
      return round && (Number(round.index) === 9 || String(round.name || "").toLowerCase() === "гранд-финал");
    })[0] || null;
  }

  function winnerDisplayRounds(data) {
    return Array.isArray(data && data.rounds) ? data.rounds.slice() : [];
  }

  function loserDisplayRounds(data) {
    return Array.isArray(data && data.loserRounds) ? data.loserRounds.slice() : [];
  }

  function renderBracketView(data, options) {
    options = options || {};
    var isLosers = options.kind === "losers";
    var realRounds = options.rounds || [];
    var isPreview = !realRounds.length;
    var rounds = isPreview ? (isLosers ? buildLoserBracketSkeletonRounds() : buildBracketSkeletonRounds(data)) : realRounds;
    var previewData = data;
    if (isPreview) {
      previewData = Object.assign({}, data, {
        currentRoundId: "",
        isAdmin: false,
        playersById: buildBracketSkeletonPlayers(rounds),
      });
    }
    var stageIndex = isLosers ? activeLoserBracketStage : activeBracketStage;
    var stageManual = isLosers ? activeLoserBracketStageManual : activeBracketStageManual;
    if (stageIndex < 0) stageIndex = 0;
    if (stageIndex >= rounds.length) stageIndex = rounds.length - 1;
    if (!isPreview && !stageManual) stageIndex = preferredBracketStageIndex(rounds, stageIndex);
    if (isLosers) activeLoserBracketStage = stageIndex;
    else activeBracketStage = stageIndex;
    var round = rounds[stageIndex] || rounds[0];
    var active = data.currentRoundId && data.currentRoundId === round.id;
    var labelFn = isLosers ? loserRoundStageLabel : roundStageLabel;
    var classFn = isLosers ? loserRoundStageClass : roundStageClass;
    var stageLabel = labelFn(round, stageIndex, rounds);
    var payout = data && data.payoutConfig || { places: {}, knockouts: {} };
    var upperPayoutStage = !isLosers && !round.loserBracket;
    var knockoutAmount = upperPayoutStage && data.knockoutEnabled ? Number(payout.knockouts && payout.knockouts[stageLabel]) || 0 : 0;
    var placeAwards = [];
    if (upperPayoutStage && stageLabel === "Финал") placeAwards = [1, 2];
    else if (upperPayoutStage && stageLabel === "1/2") placeAwards = [3, 4];
    else if (upperPayoutStage && stageLabel === "1/4") placeAwards = [5];
    var payoutBadges = (knockoutAmount ? '<em class="sng-champions-modal__stage-payout">Нокаут: ' + escapeHtml(knockoutAmount.toLocaleString("ru-RU")) + 'р</em>' : '') + placeAwards.map(function (place) { var amount = Number(payout.places && payout.places[place]) || 0; return amount ? '<em class="sng-champions-modal__stage-payout sng-champions-modal__stage-payout--place">' + place + ' место: ' + escapeHtml(amount.toLocaleString("ru-RU")) + 'р</em>' : ''; }).join('');
    var roundData = Object.assign({}, previewData, { stageKnockoutAmount: knockoutAmount });
    var stageClass = classFn(round, stageIndex, rounds);
    var stageSeriesTarget = seriesTargetFromLabel(stageLabel, isLosers);
    var stageStatus = isPreview ? null : bracketRoundStatus(round);
    var showRoundLabel = stageClass === "quarter" || stageClass === "semi" || stageSeriesTarget > 0;
    var prevDisabled = stageIndex <= 0;
    var nextDisabled = stageIndex >= rounds.length - 1;
    var stageAttr = isLosers ? "data-sng-loser-stage-index" : "data-sng-stage-index";
    var stageMoveAttr = isLosers ? "data-sng-loser-stage" : "data-sng-stage";
    var stageDotsHtml = '<div class="sng-champions-modal__stage-dots" aria-label="Этапы сетки">' + rounds.map(function (item, index) {
      var dotStatus = isPreview ? null : bracketRoundStatus(item);
      var complete = dotStatus && dotStatus.kind === "done";
      var live = dotStatus && dotStatus.kind === "live";
      return '<button type="button" class="' + (index === stageIndex ? "is-active" : "") + (complete ? " is-complete" : "") + (live ? " is-live" : "") + '" ' + stageAttr + '="' + escapeHtml(index) + '">' +
        '<span>' + escapeHtml(labelFn(item, index, rounds)) + '</span>' +
        (complete ? '<small>все сыграли</small>' : '') +
        (live ? '<small>Сыграли ' + escapeHtml(dotStatus.done) + ' ' + escapeHtml(pairWord(dotStatus.done)) + ' из ' + escapeHtml(dotStatus.total) + '</small>' : '') +
      '</button>';
    }).join("") + '</div>';
    var bracketMapHtml = renderBracketMap(rounds, previewData, isPreview, {
      labelFn: labelFn,
      stageIndex: stageIndex,
      stageAttr: stageAttr,
      kind: isLosers ? "losers" : "winners",
      title: isLosers ? "Сетка №2" : "Вся сетка винеров",
      extraClass: isLosers ? "sng-champions-modal__bracket-map-wrap--losers" : "sng-champions-modal__bracket-map-wrap--winners",
    });
    return '<div class="sng-champions-modal__bracket-slider' + (isPreview ? " sng-champions-modal__bracket-slider--preview" : "") + '">' +
      bracketMapHtml +
      '<div class="sng-champions-modal__stage-head">' +
        '<button type="button" class="sng-champions-modal__stage-arrow" ' + stageMoveAttr + '="prev"' + (prevDisabled ? " disabled" : "") + ' aria-label="Предыдущий этап">‹</button>' +
        '<div>' +
          '<span>Этап ' + escapeHtml(stageIndex + 1) + ' из ' + escapeHtml(rounds.length) + '</span>' +
          '<strong>' + escapeHtml(stageLabel) + '</strong>' +
          payoutBadges +
          (stageStatus ? '<em class="sng-champions-modal__stage-status sng-champions-modal__stage-status--' + escapeHtml(stageStatus.kind) + '">' + escapeHtml(stageStatus.text) + '</em>' : '') +
          (isPreview ? '<em>предпросмотр сетки</em>' : active ? '<em>текущий этап</em>' : '') +
        '</div>' +
        '<button type="button" class="sng-champions-modal__stage-arrow" ' + stageMoveAttr + '="next"' + (nextDisabled ? " disabled" : "") + ' aria-label="Следующий этап">›</button>' +
      '</div>' +
      stageDotsHtml +
      '<section class="sng-champions-modal__round sng-champions-modal__round--slider' + (active ? " sng-champions-modal__round--active" : "") + (stageClass ? " sng-champions-modal__round--" + stageClass : "") + '">' +
        (showRoundLabel ? '<div class="sng-champions-modal__round-label"><span>' + escapeHtml(stageLabel) + '</span></div>' : '') +
        '<div class="sng-champions-modal__round-matches sng-champions-modal__round-matches--slider">' +
          ((round.matches || []).map(function (match) { return renderBracketMatch(match, roundData); }).join("") || '<div class="club-choice-vote-modal__empty">Пары пустые.</div>') +
        '</div>' +
      '</section>' +
      stageDotsHtml +
    '</div>';
  }

  function renderBracket(data) {
    var winnersHtml = renderBracketView(data, { kind: "winners", rounds: winnerDisplayRounds(data) });
    if (data.loserBracketEnabled === false) {
      activeBracketView = "winners";
      return '<div class="sng-champions-modal__bracket-subpanel" data-sng-bracket-view-panel="winners">' + winnersHtml + '</div>';
    }
    var losersHtml = renderBracketView(data, { kind: "losers", rounds: loserDisplayRounds(data) });
    activeBracketView = activeBracketView === "losers" ? "losers" : "winners";
    return '<div class="sng-champions-modal__bracket-subnav" aria-label="Раздел вкладки Сетка">' +
        '<span class="sng-champions-modal__bracket-subnav-label">Вкладка Сетка</span>' +
        '<div class="sng-champions-modal__bracket-subtabs" role="tablist" aria-label="Сетки турнира">' +
          '<button type="button" class="sng-champions-modal__bracket-subtab' + (activeBracketView === "winners" ? " sng-champions-modal__bracket-subtab--active" : "") + '" data-sng-bracket-view="winners" aria-selected="' + (activeBracketView === "winners" ? "true" : "false") + '">Сетка Винеров</button>' +
          '<button type="button" class="sng-champions-modal__bracket-subtab' + (activeBracketView === "losers" ? " sng-champions-modal__bracket-subtab--active" : "") + '" data-sng-bracket-view="losers" aria-selected="' + (activeBracketView === "losers" ? "true" : "false") + '">Сетка №2</button>' +
        '</div>' +
      '</div>' +
      '<div class="sng-champions-modal__bracket-subpanel"' + (activeBracketView === "winners" ? "" : " hidden") + ' data-sng-bracket-view-panel="winners">' + winnersHtml + '</div>' +
      '<div class="sng-champions-modal__bracket-subpanel"' + (activeBracketView === "losers" ? "" : " hidden") + ' data-sng-bracket-view-panel="losers">' + losersHtml + '</div>';
  }

  function renderTeams(data) {
    var teams = data.teams || [];
    var adminAction = data.isAdmin && data.status === "open" ? '<button type="button" class="sng-champions-modal__main-action" data-sng-action="formTeams">Сформировать команды</button>' : '';
    return '<section class="sng-champions-modal__teams"><div class="sng-champions-modal__teams-head"><div><h3>Команды</h3><p>Игроки распределяются случайно по два человека.</p></div>' + adminAction + '</div>' +
      (teams.length ? '<div class="sng-champions-modal__teams-grid">' + teams.map(function (team) { return '<article class="sng-champions-modal__team"><strong>' + escapeHtml(team.name) + '</strong>' + (team.members || []).map(function (member) { return '<span>' + renderPlayerImage(member) + '<b>' + escapeHtml(member.pokerPlusNickname || member.displayName) + '</b></span>'; }).join('') + (team.canRename ? '<button type="button" data-sng-rename-team="' + escapeHtml(team.id) + '" data-sng-team-name="' + escapeHtml(team.name) + '">Изменить название</button>' : '') + '</article>'; }).join('') + '</div>' : '<div class="club-choice-vote-modal__empty">Команды ещё не сформированы.</div>') + '</section>';
  }

  function render() {
    ensureModal();
    var data = state || {};
    setStatus("");
    bodyEl.innerHTML = tournamentDetailOpen
      ? renderTabs(renderCreate(data), renderSignup(data), renderBracket(data), renderTeams(data), data)
      : renderTournamentMenu(data);
    updateJoinDockBodyClass();
    window.requestAnimationFrame(fitBracketMapsToViewport);
  }

  function fitBracketMapsToViewport() {
    if (!bodyEl) return;
    Array.prototype.forEach.call(bodyEl.querySelectorAll(".sng-champions-modal__bracket-map-wrap--fit"), function (wrap) {
      var map = wrap.querySelector(".sng-champions-modal__bracket-map");
      if (!map) return;
      wrap.scrollLeft = 0;
      wrap.scrollTop = 0;
      map.style.removeProperty("--sng-map-fit-scale");
      var wrapStyle = window.getComputedStyle(wrap);
      var availableWidth = Math.max(1, wrap.clientWidth - (parseFloat(wrapStyle.paddingLeft) || 0) - (parseFloat(wrapStyle.paddingRight) || 0));
      var availableHeight = Math.max(1, wrap.clientHeight - map.offsetTop - (parseFloat(wrapStyle.paddingBottom) || 0));
      var scale = Math.min(1, availableWidth / Math.max(1, map.scrollWidth), availableHeight / Math.max(1, map.scrollHeight));
      map.style.setProperty("--sng-map-fit-scale", String(Math.max(0.08, scale).toFixed(4)));
    });
  }

  function updateHomePlaque() {
    if (!state) return;
    var buttons = Array.prototype.slice.call(document.querySelectorAll("[data-sng-open], #sngChampionsOpen"));
    if (!buttons.length) return;
    var approved = (state.counts && state.counts.approved) || 0;
    buttons.forEach(function (button) {
      var count = button.querySelector(".home-club-choice-plaque__count");
      var sub = button.querySelector(".home-club-choice-plaque__subtext");
      var title = button.querySelector(".home-club-choice-plaque__text");
      var prize = button.querySelector(".home-club-choice-plaque__prize");
      var entry = button.querySelector(".home-club-choice-plaque__entry");
      if (count) count.textContent = String(approved) + "/" + String(state.capacity || 32);
      if (title && state.title) {
        var normalizedTitle = String(state.title).trim();
        if (/^1(?:ый|й)\s+снг[-\s]?баттл\s+лига\s+чемпионов\s+два\s+туза$/i.test(normalizedTitle)) {
          title.innerHTML = '<span class="home-club-choice-plaque__dynamic-title home-club-choice-plaque__dynamic-title--battle"><span><b class="home-club-choice-plaque__ordinal-one">1</b>ый СНГ-баттл</span><span>Лига чемпионов</span><span>Два туза</span></span>';
        } else {
          title.innerHTML = '<span class="home-club-choice-plaque__dynamic-title">' + escapeHtml(normalizedTitle).replace(/^1/, '<b class="home-club-choice-plaque__ordinal-one">1</b>') + '</span>';
        }
      }
      if (prize && state.prizes && state.prizes[0]) prize.textContent = state.prizes[0].text || "";
      if (entry) entry.textContent = "Вход " + String(state.buyIn || "0р");
      if (sub) {
        if (state.status === "open") sub.textContent = "Запись открыта";
        else if (state.status === "bracket") sub.textContent = state.activeStage || "Сетка идет";
        else if (state.status === "completed") sub.textContent = "Итоги готовы";
        else sub.textContent = "Запись закрыта";
      }
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-sng-home-cta]"), function (cta) {
      var canJoin = state.status === "open";
      var canWatch = state.status === "bracket" || state.status === "completed";
      cta.hidden = !canJoin && !canWatch;
      cta.textContent = canJoin ? "Записаться" : "Смотреть";
      cta.setAttribute("aria-label", canJoin ? "Записаться на СНГ-турнир" : "Смотреть сетку СНГ-турнира");
      cta.classList.toggle("home-sng-champions-action__cta--watch", canWatch);
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
    var renameTeam = event.target && event.target.closest ? event.target.closest("[data-sng-rename-team]") : null;
    if (renameTeam) {
      var teamName = window.prompt("Название команды", renameTeam.getAttribute("data-sng-team-name") || "");
      if (!teamName) return;
      postAction({ action: "renameTeam", teamId: renameTeam.getAttribute("data-sng-rename-team") || "", name: teamName }, { status: "Сохраняю название...", success: "Название команды обновлено" });
      return;
    }
    var deleteTournament = event.target && event.target.closest ? event.target.closest("[data-sng-delete-tournament]") : null;
    if (deleteTournament) {
      var deleteId = deleteTournament.getAttribute("data-sng-delete-tournament") || "";
      var deleteTitle = deleteTournament.getAttribute("data-sng-delete-title") || "этот турнир";
      if (!window.confirm('Удалить турнир «' + deleteTitle + '»? Это действие нельзя отменить.')) return;
      postAction({ action: "deleteTournament", tournamentId: deleteId }, { status: "Удаляю турнир...", success: "Турнир удалён" }).then(function (data) {
        if (!data) return;
        tournamentDetailOpen = false;
        expandedTournamentParticipantsId = "";
        activeTournamentId = data.tournamentId || "";
        render();
      });
      return;
    }
    var participantsToggle = event.target && event.target.closest ? event.target.closest("[data-sng-tournament-participants]") : null;
    if (participantsToggle) {
      var participantsId = participantsToggle.getAttribute("data-sng-tournament-participants") || "";
      expandedTournamentParticipantsId = expandedTournamentParticipantsId === participantsId ? "" : participantsId;
      if (expandedTournamentParticipantsId && (!state || state.tournamentId !== participantsId)) {
        activeTournamentId = participantsId;
        render();
        loadState();
      } else render();
      return;
    }
    var tournament = event.target && event.target.closest ? event.target.closest("[data-sng-tournament]") : null;
    if (tournament) {
      activeTournamentId = tournament.getAttribute("data-sng-tournament") || "";
      tournamentDetailOpen = true;
      activeTab = "bracket";
      activeTabManual = true;
      renderLoading(); loadState(); return;
    }
    var tournamentBack = event.target && event.target.closest ? event.target.closest("[data-sng-tournament-back]") : null;
    if (tournamentBack) {
      tournamentDetailOpen = false;
      activeTabManual = false;
      render();
      return;
    }
    var createTournament = event.target && event.target.closest ? event.target.closest("[data-sng-create-tournament]") : null;
    if (createTournament) {
      tournamentCreateFormOpen = true;
      render();
      window.requestAnimationFrame(function () { var input = bodyEl && bodyEl.querySelector('[data-sng-create-tournament-form] input[name="title"]'); if (input) input.focus(); });
      return;
    }
    if (event.target && event.target.closest && event.target.closest("[data-sng-create-tournament-cancel]")) {
      tournamentCreateFormOpen = false;
      render();
      return;
    }
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
      try {
        if (typeof window.playPokerDailyDealSound === "function") window.playPokerDailyDealSound();
        else if (typeof window.playDailyPokerDealSound === "function") window.playDailyPokerDealSound();
      } catch (eReadySound) {}
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
      var matchId = playing.getAttribute("data-sng-playing") || "";
      var matchCard = playing.closest ? playing.closest(".sng-champions-modal__bracket-match") : null;
      var passwordInput = matchCard && matchCard.querySelector ? matchCard.querySelector('[data-sng-table-password="' + matchId.replace(/"/g, '\\"') + '"]') : null;
      var tablePassword = passwordInput ? String(passwordInput.value || "").replace(/\D/g, "").slice(0, 4) : "";
      if (!/^\d{4}$/.test(tablePassword)) {
        showAlert("Введите пароль стола из 4 цифр.");
        if (passwordInput && passwordInput.focus) passwordInput.focus();
        return;
      }
      setButtonLoading(playing, true);
      postAction({
        action: "setPlaying",
        matchId: matchId,
        tablePassword: tablePassword,
      }, { status: "Отмечаю матч...", success: "Матч отмечен как играющий" })
        .finally(function () { setButtonLoading(playing, false); });
      return;
    }
    var remind = event.target && event.target.closest ? event.target.closest("[data-sng-remind]") : null;
    if (remind) {
      setButtonLoading(remind, true);
      postAction({
        action: "remindMatchReady",
        matchId: remind.getAttribute("data-sng-remind") || "",
      }, { status: "Отправляю напоминание...", success: "Напоминание отправлено" })
        .finally(function () { setButtonLoading(remind, false); });
      return;
    }
    var scoreSave = event.target && event.target.closest ? event.target.closest("[data-sng-save-score]") : null;
    if (scoreSave) {
      var scoreEditor = scoreSave.closest ? scoreSave.closest("[data-sng-score-editor]") : null;
      var firstScoreInput = scoreEditor && scoreEditor.querySelector ? scoreEditor.querySelector("[data-sng-score-first]") : null;
      var secondScoreInput = scoreEditor && scoreEditor.querySelector ? scoreEditor.querySelector("[data-sng-score-second]") : null;
      var firstScore = Number(firstScoreInput && firstScoreInput.value);
      var secondScore = Number(secondScoreInput && secondScoreInput.value);
      if (!Number.isInteger(firstScore) || !Number.isInteger(secondScore) || firstScore < 0 || secondScore < 0) {
        showAlert("Введите промежуточный счёт целыми числами.");
        return;
      }
      setButtonLoading(scoreSave, true);
      postAction({
        action: "setMatchScore",
        matchId: scoreSave.getAttribute("data-sng-save-score") || "",
        score: { first: firstScore, second: secondScore },
      }, { status: "Сохраняю счёт...", success: "Счёт матча сохранён" })
        .finally(function () { setButtonLoading(scoreSave, false); });
      return;
    }
    var winner = event.target && event.target.closest ? event.target.closest("[data-sng-winner]") : null;
    if (winner) {
      var winnerMatchId = winner.getAttribute("data-sng-winner") || "";
      var winnerPlayerId = winner.getAttribute("data-sng-player") || "";
      var currentMatch = findMatchById(state || {}, winnerMatchId);
      var score = null;
      if (matchRequiresScore(currentMatch, state || {})) {
        var player = state && state.playersById ? state.playersById[winnerPlayerId] : null;
        var playerLabel = playerName(player || { name: winnerPlayerId });
        score = readMatchScore(playerLabel, matchSeriesTarget(currentMatch, state || {}));
        if (score == null) return;
        if (score === false) return;
      }
      setButtonLoading(winner, true);
      postAction({
        action: "setWinner",
        matchId: winnerMatchId,
        playerId: winnerPlayerId,
        score: score,
      }, { status: "Обновляю сетку...", success: "Победитель пары сохранен" })
        .finally(function () { setButtonLoading(winner, false); });
      return;
    }
    var bracketView = event.target && event.target.closest ? event.target.closest("[data-sng-bracket-view]") : null;
    if (bracketView) {
      activeBracketView = bracketView.getAttribute("data-sng-bracket-view") === "losers" ? "losers" : "winners";
      render();
      setTab("bracket");
      return;
    }
    var stage = event.target && event.target.closest ? event.target.closest("[data-sng-stage]") : null;
    if (stage) {
      activeBracketStageManual = true;
      activeBracketStage += stage.getAttribute("data-sng-stage") === "next" ? 1 : -1;
      render();
      setTab("bracket");
      return;
    }
    var loserStage = event.target && event.target.closest ? event.target.closest("[data-sng-loser-stage]") : null;
    if (loserStage) {
      activeLoserBracketStageManual = true;
      activeLoserBracketStage += loserStage.getAttribute("data-sng-loser-stage") === "next" ? 1 : -1;
      activeBracketView = "losers";
      render();
      setTab("bracket");
      return;
    }
    var stageIndex = event.target && event.target.closest ? event.target.closest("[data-sng-stage-index]") : null;
    if (stageIndex) {
      activeBracketStageManual = true;
      activeBracketStage = Math.max(0, Number(stageIndex.getAttribute("data-sng-stage-index")) || 0);
      activeBracketView = "winners";
      render();
      setTab("bracket");
      return;
    }
    var mapMatch = event.target && event.target.closest ? event.target.closest("[data-sng-map-match]") : null;
    if (mapMatch) {
      var mapRoundIndex = Math.max(0, Number(mapMatch.getAttribute("data-sng-map-round")) || 0);
      var isLoserMap = !!(mapMatch.closest && mapMatch.closest(".sng-champions-modal__bracket-map-wrap--losers"));
      if (isLoserMap) {
        activeLoserBracketStageManual = true;
        activeLoserBracketStage = mapRoundIndex;
      } else {
        activeBracketStageManual = true;
        activeBracketStage = mapRoundIndex;
      }
      activeBracketView = isLoserMap ? "losers" : "winners";
      activeBracketMapSelection = {
        kind: isLoserMap ? "losers" : "winners",
        roundIndex: mapRoundIndex,
        matchId: mapMatch.getAttribute("data-sng-map-match") || "",
      };
      bracketMapExpanded = true;
      render();
      setTab("bracket");
      return;
    }
    var loserStageIndex = event.target && event.target.closest ? event.target.closest("[data-sng-loser-stage-index]") : null;
    if (loserStageIndex) {
      activeLoserBracketStageManual = true;
      activeLoserBracketStage = Math.max(0, Number(loserStageIndex.getAttribute("data-sng-loser-stage-index")) || 0);
      activeBracketView = "losers";
      render();
      setTab("bracket");
      return;
    }
    var bracketMap = event.target && event.target.closest ? event.target.closest("[data-sng-bracket-map]") : null;
    if (bracketMap) {
      bracketMapExpanded = bracketMap.getAttribute("data-sng-bracket-map") === "open";
      bracketMapFit.winners = false;
      bracketMapFit.losers = false;
      render();
      setTab("bracket");
      window.requestAnimationFrame(scrollSngBodyTop);
      return;
    }
    var bracketMapFitButton = event.target && event.target.closest ? event.target.closest("[data-sng-bracket-map-fit]") : null;
    if (bracketMapFitButton) {
      var fitKind = bracketMapFitButton.getAttribute("data-sng-bracket-map-fit") === "losers" ? "losers" : "winners";
      var nextFit = !bracketMapFit[fitKind];
      bracketMapExpanded = false;
      bracketMapFit.winners = false;
      bracketMapFit.losers = false;
      bracketMapFit[fitKind] = nextFit;
      activeBracketView = fitKind;
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

  function onModalKeydown(event) {
    if (event.key !== "Enter" && event.key !== " ") return;
    var mapMatch = event.target && event.target.closest ? event.target.closest("[data-sng-map-match]") : null;
    if (!mapMatch) return;
    event.preventDefault();
    mapMatch.click();
  }

  function onModalSubmit(event) {
    var form = event.target && event.target.matches && event.target.matches("[data-sng-create-tournament-form]") ? event.target : null;
    if (!form) return;
    event.preventDefault();
    var field = function (name) { var input = form.elements && form.elements[name]; return input ? String(input.value || "").trim() : ""; };
    var checked = function (name) { var input = form.elements && form.elements[name]; return !!(input && input.checked); };
    var stageNames = ["1/32", "1/16", "1/8", "1/4", "1/2", "Финал"];
    var payoutConfig = { places: {}, knockouts: {} };
    [1,2,3,4,5].forEach(function (place) { payoutConfig.places[place] = Number(field("payoutPlace" + place)) || 0; });
    stageNames.forEach(function (stage, index) { payoutConfig.knockouts[stage] = Number(field("payoutStage" + index)) || 0; });
    var submit = form.querySelector('[type="submit"]');
    setButtonLoading(submit, true);
    postAction({
      action: "createTournament",
      title: field("title"),
      description: field("description"),
      buyIn: field("buyIn"),
      prize1: field("prize1"),
      prize2: field("prize2"),
      tournamentType: field("tournamentType"),
      capacity: Number(field("capacity")) || 32,
      loserBracketEnabled: field("loserBracketEnabled") !== "false",
      knockoutEnabled: field("knockoutEnabled") === "true",
      isTest: checked("isTest"),
      payoutConfig: payoutConfig,
    }, { status: "Создаю турнир...", success: "Турнир создан" }).then(function (data) {
      if (!data) return;
      tournamentCreateFormOpen = false;
      tournamentDetailOpen = false;
      activeTournamentId = data.tournamentId || activeTournamentId;
      render();
    }).finally(function () { setButtonLoading(submit, false); });
  }

  function updateTournamentPayoutPreview(event) {
    var form = event && event.target && event.target.closest ? event.target.closest("[data-sng-create-tournament-form]") : null;
    if (!form) return;
    var builder = form.querySelector("[data-sng-payout-builder]");
    var knockout = form.elements.knockoutEnabled && form.elements.knockoutEnabled.value === "true";
    if (builder) builder.hidden = !knockout;
    if (!knockout) return;
    var capacity = Number(form.elements.capacity && form.elements.capacity.value) || 32;
    var team = form.elements.tournamentType && form.elements.tournamentType.value === "team";
    var units = team ? capacity / 2 : capacity;
    var counts = {};
    while (units > 1) { var matches = units / 2; counts[matches === 1 ? "Финал" : "1/" + matches] = matches; units = matches; }
    var stageNames = ["1/32", "1/16", "1/8", "1/4", "1/2", "Финал"];
    var distributed = 0;
    [1,2,3,4,5].forEach(function (place) { distributed += Number(form.elements["payoutPlace" + place] && form.elements["payoutPlace" + place].value) || 0; });
    stageNames.forEach(function (stage, index) {
      var row = form.querySelector('[data-sng-knockout-stage="' + stage + '"]');
      if (row) row.hidden = !counts[stage];
      distributed += (Number(form.elements["payoutStage" + index] && form.elements["payoutStage" + index].value) || 0) * (counts[stage] || 0);
    });
    var buyIn = Number(String(form.elements.buyIn && form.elements.buyIn.value || "").replace(/[^\d]/g, "")) || 0;
    var total = buyIn * capacity;
    var totalEl = form.querySelector("[data-sng-payout-total]");
    var leftEl = form.querySelector("[data-sng-payout-left]");
    if (totalEl) totalEl.textContent = total.toLocaleString("ru-RU") + "р";
    if (leftEl) { leftEl.textContent = (total - distributed).toLocaleString("ru-RU") + "р"; leftEl.classList.toggle("is-error", total - distributed !== 0); }
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
          rememberStateRevision(data);
          updateHomePlaque();
        }
      }).catch(function () {});
    }
  }

  window.openSngChampionsModal = openModal;

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
  else bind();
})();
