(function () {
  var dailyPokerState = {
    status: null,
    serverDeltaMs: 0,
    timer: null,
    revealing: false,
    optimisticStatusBeforePlay: null,
    stagedDealResult: null,
    dealStage: "idle",
    activeDealButtonId: "",
    copyFeedbackTimer: null,
  };

  var DAILY_POKER_START_PROMPT = "Нажмите на кнопку «Раздать карты», чтобы начать";
  var DAILY_POKER_INVITE_TEXT = "Клуб «Два туза» разыгрывает беккинг-билеты на турниры";

  var suitSymbols = {
    spades: "♠",
    hearts: "♥",
    diamonds: "♦",
    clubs: "♣",
  };

  function $(id) {
    return document.getElementById(id);
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function apiBase() {
    return typeof getApiBase === "function" ? getApiBase() : "";
  }

  function authQuery() {
    return typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
  }

  function authUrl(path) {
    var q = authQuery();
    if (q && q.charAt(0) !== "?") q = "?" + q.replace(/^&+/, "");
    return apiBase() + "/api/promo/daily-poker/" + encodeURIComponent(path) + (q || "");
  }

  function withQuery(url, query) {
    return String(url || "") + (String(url || "").indexOf("?") === -1 ? "?" : "&") + query;
  }

  function authBody(extra) {
    return typeof pokerGuestOrAuthedPostBody === "function" ? pokerGuestOrAuthedPostBody(extra || {}) : extra || {};
  }

  function hasCredential() {
    return typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
  }

  function setLiveText(el, text) {
    if (!el) return;
    text = String(text || "");
    el.textContent = text;
    el.hidden = !text.trim();
  }

  function cleanSentencePart(value) {
    return String(value == null ? "" : value).trim().replace(/[.!?]+$/g, "");
  }

  function formatResultLine(result) {
    var payload = result || {};
    var hand = cleanSentencePart(payload.handName || "Комбинация определена");
    var reward = String(payload.reward && payload.reward.message ? payload.reward.message : "Сегодня без приза. Возвращайся завтра за новой раздачей.").trim();
    if (hand && reward) return hand + ". " + reward;
    return hand || reward;
  }

  function setResultText(text, isError) {
    var resultEl = $("dailyPokerResult");
    setLiveText(resultEl, text || "");
    if (resultEl) {
      resultEl.classList.toggle("daily-poker__result--error", !!isError);
      resultEl.classList.remove("daily-poker__result--prompt", "daily-poker__result--timer");
      resultEl.dataset.dailyPokerPrompt = "";
    }
    setLiveText($("dailyPokerReward"), "");
  }

  function setResultPrompt(primary, detail, isTimer) {
    var resultEl = $("dailyPokerResult");
    if (!resultEl) return;
    var details = Array.isArray(detail) ? detail.map(function (part) {
      return String(part || "").trim();
    }).filter(Boolean) : [];
    var primaryHtml = esc(primary || "");
    if (primary === DAILY_POKER_START_PROMPT) {
      primaryHtml = '<span class="daily-poker__result-nowrap">Нажмите на кнопку «Раздать карты»</span><span>, чтобы начать</span>';
    }
    var html = '<span class="daily-poker__result-primary">' + primaryHtml + '</span>';
    if (details.length) {
      html += '<span class="daily-poker__result-meta">' + details.map(function (part) {
        var className = part === "Раздача доступна." ? ' class="daily-poker__result-meta-available"' : "";
        return '<span' + className + '>' + esc(part) + '</span>';
      }).join("") + '</span>';
    }
    resultEl.innerHTML = html;
    resultEl.hidden = !String(primary || "").trim();
    resultEl.classList.remove("daily-poker__result--error");
    resultEl.classList.add("daily-poker__result--prompt");
    resultEl.classList.toggle("daily-poker__result--timer", !!isTimer);
    resultEl.dataset.dailyPokerPrompt = "1";
    setLiveText($("dailyPokerReward"), "");
  }

  function attemptStatusText(data) {
    var attempts = Math.max(0, parseInt(data && data.attemptsLeft || "0", 10) || 0);
    return "Попытки: " + attempts;
  }

  function availableStatusText(data) {
    if (!data) return "Проверяем доступность раздачи…";
    if (!data.canPlay) return "";
    if (data.specialDailyLimit) return "Раздача доступна.";
    var attempts = Math.max(0, parseInt(data.attemptsLeft || "0", 10) || 0);
    return attempts > 1 ? "Доступна раздача и дополнительная попытка." : "Раздача доступна.";
  }

  function countdownStatusText(data) {
    if (!data) return "Проверяем доступность раздачи…";
    if (!data.nextFreeAttemptAt) return "Не удалось проверить доступность раздачи.";
    var nextMs = Date.parse(data.nextFreeAttemptAt || "");
    var left = Math.max(0, Math.ceil((nextMs - currentServerMs()) / 1000) || 0);
    return "Следующая бесплатная раздача через: " + formatDuration(left);
  }

  function syncStartPrompt(data) {
    var resultEl = $("dailyPokerResult");
    if (!resultEl || dailyPokerState.revealing || dailyPokerState.stagedDealResult) return;
    var current = String(resultEl.textContent || "").trim();
    var isPrompt = resultEl.dataset.dailyPokerPrompt === "1" || current === DAILY_POKER_START_PROMPT;
    if (data && data.canPlay) {
      if (!current || isPrompt) setResultPrompt(DAILY_POKER_START_PROMPT, [availableStatusText(data), attemptStatusText(data)], false);
    } else if (data && !data.canPlay && data.nextFreeAttemptAt) {
      if (!current || isPrompt) setResultPrompt(countdownStatusText(data), [], true);
    } else if (isPrompt) {
      setResultText("", false);
    }
  }

  function formatBonus(value) {
    var n = Math.max(0, parseInt(value || "0", 10) || 0);
    return "Бонусный баланс: " + n + " бонусов";
  }

  function formatCompactAmount(value) {
    var n = Math.max(0, parseInt(value || "0", 10) || 0);
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  function formatRubles(value) {
    return formatCompactAmount(value) + " ₽";
  }

  function pluralRu(count, one, few, many) {
    var n = Math.abs(parseInt(count || "0", 10) || 0);
    var mod10 = n % 10;
    var mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return one;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
    return many;
  }

  function winnerSubline(row) {
    var wins = Math.max(0, parseInt(row && row.winsCount || "0", 10) || 0);
    var parts = [];
    if (wins > 0) parts.push(wins + " " + pluralRu(wins, "выигрыш", "выигрыша", "выигрышей"));
    if (row && row.bestPrize) parts.push("лучший: " + row.bestPrize);
    return parts.join(" · ");
  }

  function setWinnersMessage(text, isError) {
    var list = $("dailyPokerWinnersList");
    if (!list) return;
    list.innerHTML = '<div class="daily-poker__winners-empty' + (isError ? " daily-poker__winners-empty--error" : "") + '">' + esc(text || "") + '</div>';
  }

  function renderSpinStats(data) {
    var el = $("dailyPokerSpinStats");
    if (!el) return;
    if (!data) {
      el.hidden = true;
      el.innerHTML = "";
      return;
    }
    var stats = data.spinStats && typeof data.spinStats === "object" ? data.spinStats : data;
    var today = Math.max(0, parseInt(stats.todayUniquePlayers || data.todayUniquePlayers || "0", 10) || 0);
    var week = Math.max(0, parseInt(stats.weekUniquePlayers || data.weekUniquePlayers || "0", 10) || 0);
    var month = Math.max(0, parseInt(stats.monthUniquePlayers || data.monthUniquePlayers || "0", 10) || 0);
    var previousMonth = Math.max(0, parseInt(stats.previousMonthUniquePlayers || data.previousMonthUniquePlayers || "0", 10) || 0);
    el.hidden = false;
    el.innerHTML =
      '<span>Сегодня крутили: <strong>' + esc(formatCompactAmount(today)) + '</strong></span>' +
      '<span>На этой неделе крутили: <strong>' + esc(formatCompactAmount(week)) + '</strong></span>' +
      '<span>В этом месяце крутили: <strong>' + esc(formatCompactAmount(month)) + '</strong></span>' +
      '<span>В прошлом месяце крутили: <strong>' + esc(formatCompactAmount(previousMonth)) + '</strong></span>';
  }

  function winnerHtml(winner, index) {
    var row = winner || {};
    var rank = Math.max(1, index + 1);
    var subline = winnerSubline(row);
    return '<article class="daily-poker-winner">' +
      '<div class="daily-poker-winner__avatar" aria-hidden="true">' + rank + '</div>' +
      '<div class="daily-poker-winner__body">' +
        '<div class="daily-poker-winner__top">' +
          '<strong>' + esc(row.displayName || "Игрок") + '</strong>' +
          '<span>#' + rank + '</span>' +
        '</div>' +
        '<p>' + esc(row.prize || "Суммарный приз") + '</p>' +
        (subline ? '<small>' + esc(subline) + '</small>' : "") +
      '</div>' +
    '</article>';
  }

  function renderWinners(data) {
    var list = $("dailyPokerWinnersList");
    var meta = $("dailyPokerWinnersMeta");
    if (!list) return;
    var winners = data && Array.isArray(data.winners) ? data.winners : [];
    var totalRubles = Math.max(0, parseInt(data && data.totalPrizeRubles || "0", 10) || 0);
    if (meta) meta.textContent = totalRubles ? "За всё время: " + formatRubles(totalRubles) : "За всё время";
    renderSpinStats(data);
    if (!winners.length) {
      setWinnersMessage("Рублёвых выигрышей пока нет.");
      return;
    }
    list.innerHTML = winners.map(winnerHtml).join("");
  }

  function loadWinners() {
    var base = apiBase();
    if (!base || !hasCredential()) {
      setWinnersMessage("Войдите, чтобы увидеть победителей.");
      renderSpinStats(null);
      return Promise.resolve(false);
    }
    return fetch(withQuery(authUrl("winners"), "limit=50"), { cache: "no-store" })
      .then(readJson)
      .then(function (data) {
        if (!data || data.ok === false) throw new Error(data && data.error ? data.error : "winners failed");
        renderWinners(data);
        return true;
      })
      .catch(function () {
        setWinnersMessage("Не удалось загрузить победителей.", true);
        renderSpinStats(null);
        return false;
      });
  }

  function formatDuration(seconds) {
    var s = Math.max(0, Math.floor(Number(seconds) || 0));
    var h = Math.floor(s / 3600);
    var m = Math.floor((s % 3600) / 60);
    var sec = s % 60;
    return [h, m, sec].map(function (part) {
      return String(part).padStart(2, "0");
    }).join(":");
  }

  function currentServerMs() {
    return Date.now() + (Number(dailyPokerState.serverDeltaMs) || 0);
  }

  function updateTimer() {
    var status = dailyPokerState.status || {};
    if (!dailyPokerState.status) {
      var resultEl = $("dailyPokerResult");
      var current = resultEl ? String(resultEl.textContent || "").trim() : "";
      var isPrompt = resultEl && (resultEl.dataset.dailyPokerPrompt === "1" || current === DAILY_POKER_START_PROMPT);
      if (!current || isPrompt) setResultPrompt("Проверяем доступность раздачи…", [], false);
      return;
    }
    if (status.canPlay) {
      syncStartPrompt(status);
      return;
    }
    syncStartPrompt(status);
  }

  function syncStatus(data) {
    if (!data) return;
    dailyPokerState.status = data;
    var serverMs = Date.parse(data.serverTime || "");
    if (Number.isFinite(serverMs)) dailyPokerState.serverDeltaMs = serverMs - Date.now();
    var balanceEl = $("dailyPokerBalance");
    var playBtn = $("dailyPokerPlayBtn");
    var extraBtn = $("dailyPokerExtraBtn");
    if (balanceEl) {
      var bonusValue = Math.max(0, parseInt(data.bonusBalance || "0", 10) || 0);
      balanceEl.innerHTML = '<span class="daily-poker__balance-label">Бонусный баланс:</span> <strong>' + bonusValue + '</strong> <span>бонусов</span>';
    }
    if (playBtn) {
      playBtn.hidden = !!(data.baseAttemptUsedToday && data.attemptsLeft > 0);
      playBtn.disabled = !data.canPlay || dailyPokerState.revealing;
      playBtn.textContent = "Раздать карты";
    }
    if (extraBtn) {
      extraBtn.hidden = !(data.baseAttemptUsedToday && data.attemptsLeft > 0);
      extraBtn.disabled = !data.canPlay || dailyPokerState.revealing;
      extraBtn.textContent = "Раздать карты";
    }
    updateTimer();
    syncStartPrompt(data);
  }

  function cloneStatus(status) {
    var out = {};
    Object.keys(status || {}).forEach(function (key) {
      out[key] = status[key];
    });
    return out;
  }

  function spendAttemptImmediately() {
    var status = dailyPokerState.status;
    if (!status) return;
    dailyPokerState.optimisticStatusBeforePlay = cloneStatus(status);
    var attemptsLeft = Math.max(0, parseInt(status.attemptsLeft || "0", 10) || 0);
    var next = cloneStatus(status);
    next.attemptsLeft = Math.max(0, attemptsLeft - 1);
    next.canPlay = next.attemptsLeft > 0 && status.canPlay !== false;
    dailyPokerState.status = next;
    syncStartPrompt(next);
  }

  function clearOptimisticSpend() {
    dailyPokerState.optimisticStatusBeforePlay = null;
  }

  function restoreOptimisticSpend() {
    var previous = dailyPokerState.optimisticStatusBeforePlay;
    dailyPokerState.optimisticStatusBeforePlay = null;
    if (previous) syncStatus(previous);
  }

  function hasStatusPayload(data) {
    return !!(data && (
      Object.prototype.hasOwnProperty.call(data, "canPlay") ||
      Object.prototype.hasOwnProperty.call(data, "attemptsLeft") ||
      Object.prototype.hasOwnProperty.call(data, "bonusBalance") ||
      Object.prototype.hasOwnProperty.call(data, "nextFreeAttemptAt")
    ));
  }

  function cardHtml(card, hidden, animate) {
    var suit = card && card.suit ? String(card.suit) : "";
    var rank = card && card.rank ? String(card.rank) : "";
    var suitClass = Object.prototype.hasOwnProperty.call(suitSymbols, suit) ? " daily-poker-card--suit-" + suit : "";
    if (hidden) return '<div class="daily-poker-card daily-poker-card--back" aria-hidden="true"></div>';
    return '<div class="daily-poker-card' + suitClass + (animate ? " daily-poker-card--dealt" : "") + '">' +
      '<span class="daily-poker-card__rank">' + esc(rank) + '</span>' +
      '<span class="daily-poker-card__suit">' + esc(suitSymbols[suit] || "?") + '</span>' +
      '</div>';
  }

  function setBoardActive(active) {
    var board = $("dailyPokerBoardCards");
    var zone = board && board.closest ? board.closest(".daily-poker__zone--board") : null;
    if (zone) zone.hidden = !active;
  }

  function renderEmptyCards() {
    var hole = $("dailyPokerHoleCards");
    var board = $("dailyPokerBoardCards");
    if (hole) hole.innerHTML = cardHtml(null, true) + cardHtml(null, true);
    if (board) board.innerHTML = [0, 1, 2, 3, 4].map(function () { return cardHtml(null, true); }).join("");
    setBoardActive(true);
  }

  function resetManualDeal() {
    dailyPokerState.stagedDealResult = null;
    dailyPokerState.dealStage = "idle";
    dailyPokerState.activeDealButtonId = "";
  }

  function boardHtml(cards, openCount, animatedIndexes) {
    var source = Array.isArray(cards) ? cards : [];
    var animated = {};
    (Array.isArray(animatedIndexes) ? animatedIndexes : []).forEach(function (idx) {
      animated[Number(idx)] = true;
    });
    var out = [];
    for (var i = 0; i < 5; i += 1) {
      out.push(i < openCount && source[i] ? cardHtml(source[i], false, !!animated[i]) : cardHtml(null, true));
    }
    return out.join("");
  }

  function getDealButton() {
    if (dailyPokerState.activeDealButtonId) return $(dailyPokerState.activeDealButtonId);
    var extraBtn = $("dailyPokerExtraBtn");
    if (extraBtn && !extraBtn.hidden) return extraBtn;
    return $("dailyPokerPlayBtn");
  }

  function setDealButtonLabel(label) {
    var btn = getDealButton();
    if (btn) {
      btn.textContent = label;
      btn.disabled = false;
      btn.hidden = false;
    }
  }

  function setActiveDealButton(btn) {
    var playBtn = $("dailyPokerPlayBtn");
    var extraBtn = $("dailyPokerExtraBtn");
    dailyPokerState.activeDealButtonId = btn && btn.id ? btn.id : "";
    if (playBtn && extraBtn && dailyPokerState.activeDealButtonId) {
      playBtn.hidden = dailyPokerState.activeDealButtonId !== playBtn.id;
      extraBtn.hidden = dailyPokerState.activeDealButtonId !== extraBtn.id;
    }
  }

  function finishManualDeal() {
    var hole = $("dailyPokerHoleCards");
    var board = $("dailyPokerBoardCards");
    var claimBtn = $("dailyPokerClaimBtn");
    var result = dailyPokerState.stagedDealResult || {};
    if (hole) hole.innerHTML = (result.holeCards || []).map(function (card) { return cardHtml(card, false, false); }).join("");
    if (board) board.innerHTML = boardHtml(result.boardCards || [], 5, [4]);
    dailyPokerState.revealing = false;
    setResultText(formatResultLine(result), false);
    if (claimBtn) claimBtn.hidden = true;
    resetManualDeal();
    syncStatus(result);
    loadWinners();
  }

  function advanceManualDeal() {
    var board = $("dailyPokerBoardCards");
    var result = dailyPokerState.stagedDealResult;
    if (!result || dailyPokerState.revealing) return;
    if (dailyPokerState.dealStage === "hole") {
      if (board) board.innerHTML = boardHtml(result.boardCards || [], 3, [0, 1, 2]);
      dailyPokerState.dealStage = "flop";
      setResultText("Флоп открыт. Следующий ход — терн.", false);
      setDealButtonLabel("Раздать терн");
      return;
    }
    if (dailyPokerState.dealStage === "flop") {
      if (board) board.innerHTML = boardHtml(result.boardCards || [], 4, [3]);
      dailyPokerState.dealStage = "turn";
      setResultText("Терн открыт. Следующий ход — ривер.", false);
      setDealButtonLabel("Раздать ривер");
      return;
    }
    if (dailyPokerState.dealStage === "turn") {
      finishManualDeal();
    }
  }

  function revealCards(result, triggerBtn) {
    var hole = $("dailyPokerHoleCards");
    var board = $("dailyPokerBoardCards");
    var claimBtn = $("dailyPokerClaimBtn");
    dailyPokerState.stagedDealResult = result || {};
    dailyPokerState.dealStage = "hole";
    setActiveDealButton(triggerBtn || getDealButton());
    dailyPokerState.revealing = false;
    setResultText("Карты на руках. Следующий ход — флоп.", false);
    if (claimBtn) claimBtn.hidden = true;
    renderEmptyCards();
    setBoardActive(true);
    if (hole) hole.innerHTML = (result.holeCards || []).map(function (card) { return cardHtml(card, false, true); }).join("");
    if (board) board.innerHTML = boardHtml(result.boardCards || [], 0);
    setDealButtonLabel("Раздать флоп");
  }

  function idempotencyKey() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") return window.crypto.randomUUID();
    return "daily_" + Date.now() + "_" + Math.random().toString(36).slice(2, 12);
  }

  function setBusy(on) {
    var playBtn = $("dailyPokerPlayBtn");
    var extraBtn = $("dailyPokerExtraBtn");
    if (playBtn) playBtn.disabled = !!on;
    if (extraBtn) extraBtn.disabled = !!on;
  }

  function showMessage(text, isError) {
    setResultText(text || "", !!isError);
  }

  function readJson(r) {
    return r.text().then(function (text) {
      if (!text) return {};
      try {
        return JSON.parse(text);
      } catch (e) {
        var err = new Error("Сервер вернул неожиданный ответ. Обновите приложение и попробуйте ещё раз.");
        err.status = r && r.status;
        err.raw = String(text || "").slice(0, 120);
        throw err;
      }
    });
  }

  function buildDailyPokerInviteLink() {
    if (typeof buildMiniAppStartLink === "function") return buildMiniAppStartLink("daily_poker");
    var appUrl = "";
    if (typeof getAppBaseUrlForLinks === "function") appUrl = getAppBaseUrlForLinks();
    if (!appUrl && typeof location !== "undefined") appUrl = String(location.origin || "") + "/";
    appUrl = String(appUrl || "").trim().replace(/\/+$/, "");
    if (!appUrl) return "";
    return appUrl + (appUrl.indexOf("?") >= 0 ? "&" : "?") + "startapp=daily_poker";
  }

  function openDailyPokerInvite(evt) {
    if (evt && typeof evt.preventDefault === "function") evt.preventDefault();
    if (evt && typeof evt.stopPropagation === "function") evt.stopPropagation();
    if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
    var link = buildDailyPokerInviteLink();
    if (!link) {
      showMessage("Не удалось подготовить ссылку. Попробуйте обновить приложение.", true);
      return;
    }
    var shareUrl = typeof pokerBuildTelegramShareUrlDialog === "function"
      ? pokerBuildTelegramShareUrlDialog(link, DAILY_POKER_INVITE_TEXT)
      : "https://t.me/share/url?url=" + encodeURIComponent(link) + "&text=" + encodeURIComponent(DAILY_POKER_INVITE_TEXT);
    var tgw = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    function recordInviteShare() {
      if (typeof recordShareButtonClick === "function") recordShareButtonClick("daily_poker_invite");
    }
    function openTelegramShare() {
      if (tgw && typeof tgw.openTelegramLink === "function") tgw.openTelegramLink(shareUrl);
      else if (tgw && typeof tgw.openLink === "function") tgw.openLink(shareUrl);
      else window.open(shareUrl, "_blank");
      recordInviteShare();
    }
    if (typeof pokerTryPwaWebShare === "function") {
      pokerTryPwaWebShare({ title: "Раздача дня", text: DAILY_POKER_INVITE_TEXT, url: link }).then(function (pwaOk) {
        if (pwaOk) {
          recordInviteShare();
          return;
        }
        openTelegramShare();
      });
      return;
    }
    openTelegramShare();
  }

  function copyTextToClipboard(text) {
    text = String(text || "");
    if (!text) return Promise.reject(new Error("empty"));
    function copyWithTextarea(resolve, reject) {
      var textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "readonly");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        if (document.execCommand && document.execCommand("copy")) resolve();
        else reject(new Error("copy failed"));
      } catch (err) {
        reject(err);
      } finally {
        document.body.removeChild(textarea);
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      return navigator.clipboard.writeText(text).catch(function () {
        return new Promise(copyWithTextarea);
      });
    }
    return new Promise(copyWithTextarea);
  }

  function setCopyButtonCopied(btn) {
    if (!btn) return;
    btn.classList.add("daily-poker__copy-btn--copied");
    btn.setAttribute("aria-label", "Ссылка скопирована");
    if (dailyPokerState.copyFeedbackTimer) clearTimeout(dailyPokerState.copyFeedbackTimer);
    dailyPokerState.copyFeedbackTimer = setTimeout(function () {
      btn.classList.remove("daily-poker__copy-btn--copied");
      btn.setAttribute("aria-label", "Скопировать ссылку на Раздачу дня");
      dailyPokerState.copyFeedbackTimer = null;
    }, 1400);
  }

  function copyDailyPokerLink(evt) {
    if (evt && typeof evt.preventDefault === "function") evt.preventDefault();
    if (evt && typeof evt.stopPropagation === "function") evt.stopPropagation();
    var btn = evt && evt.currentTarget ? evt.currentTarget : $("dailyPokerCopyLinkBtn");
    var link = buildDailyPokerInviteLink();
    if (!link) {
      showMessage("Не удалось подготовить ссылку. Попробуйте обновить приложение.", true);
      return;
    }
    copyTextToClipboard(link).then(function () {
      var tgw = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tgw && tgw.HapticFeedback && typeof tgw.HapticFeedback.notificationOccurred === "function") {
        tgw.HapticFeedback.notificationOccurred("success");
      }
      setCopyButtonCopied(btn);
    }).catch(function () {
      showMessage("Не удалось скопировать ссылку. Попробуйте кнопку «Позвать друга».", true);
    });
  }

  function loadStatus() {
    var base = apiBase();
    if (!base || !hasCredential()) {
      showMessage("Войдите в аккаунт, чтобы сыграть в Раздачу дня.", true);
      syncStatus({ canPlay: false, attemptsLeft: 0, bonusBalance: 0, nextFreeAttemptAt: "", serverTime: new Date().toISOString() });
      return Promise.resolve(false);
    }
    return fetch(authUrl("status"), { cache: "no-store" })
      .then(readJson)
      .then(function (data) {
        if (!data || data.ok === false) throw new Error(data && data.error ? data.error : "status failed");
        syncStatus(data);
        return true;
      })
      .catch(function (err) {
        showMessage(err && err.message ? err.message : POKER_NET_ERR, true);
        return false;
      });
  }

  function play(evt) {
    var base = apiBase();
    if (dailyPokerState.revealing) return;
    if (dailyPokerState.stagedDealResult) {
      advanceManualDeal();
      return;
    }
    if (!base || !hasCredential()) {
      showMessage("Войдите в аккаунт, чтобы сыграть.", true);
      return;
    }
    dailyPokerState.revealing = true;
    spendAttemptImmediately();
    setBusy(true);
    showMessage("Начинаем раздачу", false);
    fetch(authUrl("play"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authBody({ idempotencyKey: idempotencyKey() })),
    })
      .then(function (r) {
        return readJson(r).then(function (data) {
          if (!r.ok || !data || data.success !== true) {
            var err = new Error(data && data.error ? data.error : "Раздача не сыграна");
            err.data = data;
            throw err;
          }
          return data;
        });
      })
      .then(function (data) {
        clearOptimisticSpend();
        revealCards(data, evt && evt.currentTarget);
      })
      .catch(function (err) {
        resetManualDeal();
        dailyPokerState.revealing = false;
        setBusy(false);
        if (err && hasStatusPayload(err.data)) {
          clearOptimisticSpend();
          syncStatus(err.data);
        } else {
          restoreOptimisticSpend();
        }
        showMessage(err && err.message ? err.message : POKER_NET_ERR, true);
      });
  }

  function bind() {
    var playBtn = $("dailyPokerPlayBtn");
    var extraBtn = $("dailyPokerExtraBtn");
    var claimBtn = $("dailyPokerClaimBtn");
    var inviteBtn = $("dailyPokerInviteBtn");
    var copyBtn = $("dailyPokerCopyLinkBtn");
    if (playBtn && playBtn.dataset.dailyPokerBound !== "1") {
      playBtn.dataset.dailyPokerBound = "1";
      playBtn.addEventListener("click", play);
    }
    if (extraBtn && extraBtn.dataset.dailyPokerBound !== "1") {
      extraBtn.dataset.dailyPokerBound = "1";
      extraBtn.addEventListener("click", play);
    }
    if (claimBtn && claimBtn.dataset.dailyPokerBound !== "1") {
      claimBtn.dataset.dailyPokerBound = "1";
      claimBtn.addEventListener("click", function () {
        showMessage("Билет уже зачислен на баланс.", false);
        claimBtn.hidden = true;
      });
    }
    if (inviteBtn && inviteBtn.dataset.dailyPokerBound !== "1") {
      inviteBtn.dataset.dailyPokerBound = "1";
      inviteBtn.addEventListener("click", openDailyPokerInvite);
    }
    if (copyBtn && copyBtn.dataset.dailyPokerBound !== "1") {
      copyBtn.dataset.dailyPokerBound = "1";
      copyBtn.addEventListener("click", copyDailyPokerLink);
    }
  }

  window.initDailyPoker = function () {
    resetManualDeal();
    bind();
    renderEmptyCards();
    setResultPrompt(DAILY_POKER_START_PROMPT, [], false);
    setWinnersMessage("Загружаем победителей…");
    loadWinners();
    loadStatus();
    if (dailyPokerState.timer) clearInterval(dailyPokerState.timer);
    dailyPokerState.timer = setInterval(updateTimer, 1000);
  };
})();
