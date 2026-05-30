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
  };

  var DAILY_POKER_START_PROMPT = "Нажмите на кнопку «Раздать карты», чтобы начать";

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
    if (resultEl) resultEl.classList.toggle("daily-poker__result--error", !!isError);
    setLiveText($("dailyPokerReward"), "");
  }

  function syncStartPrompt(data) {
    var resultEl = $("dailyPokerResult");
    if (!resultEl || dailyPokerState.revealing || dailyPokerState.stagedDealResult) return;
    var current = String(resultEl.textContent || "").trim();
    if (data && data.canPlay && (!current || current === DAILY_POKER_START_PROMPT)) {
      setResultText(DAILY_POKER_START_PROMPT, false);
    } else if (current === DAILY_POKER_START_PROMPT) {
      setResultText("", false);
    }
  }

  function formatBonus(value) {
    var n = Math.max(0, parseInt(value || "0", 10) || 0);
    return "Бонусный баланс: " + n + " бонусов";
  }

  function formatWinnerTime(value) {
    var date = new Date(value || "");
    if (!Number.isFinite(date.getTime())) return "";
    try {
      return date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
    } catch (e) {
      return "";
    }
  }

  function setWinnersMessage(text, isError) {
    var list = $("dailyPokerWinnersList");
    if (!list) return;
    list.innerHTML = '<div class="daily-poker__winners-empty' + (isError ? " daily-poker__winners-empty--error" : "") + '">' + esc(text || "") + '</div>';
  }

  function winnerHtml(winner) {
    var row = winner || {};
    var time = formatWinnerTime(row.createdAt);
    return '<article class="daily-poker-winner">' +
      '<div class="daily-poker-winner__avatar" aria-hidden="true">★</div>' +
      '<div class="daily-poker-winner__body">' +
        '<div class="daily-poker-winner__top">' +
          '<strong>' + esc(row.displayName || "Игрок") + '</strong>' +
          (time ? '<span>' + esc(time) + '</span>' : "") +
        '</div>' +
        '<p>' + esc(row.prize || "Приз") + '</p>' +
        (row.handName ? '<small>' + esc(row.handName) + '</small>' : "") +
      '</div>' +
    '</article>';
  }

  function renderWinners(data) {
    var list = $("dailyPokerWinnersList");
    var meta = $("dailyPokerWinnersMeta");
    if (!list) return;
    var winners = data && Array.isArray(data.winners) ? data.winners : [];
    if (meta) meta.textContent = winners.length ? "Сегодня: " + winners.length : "Сегодня";
    if (!winners.length) {
      setWinnersMessage("Сегодня победителей пока нет.");
      return;
    }
    list.innerHTML = winners.map(winnerHtml).join("");
  }

  function loadWinners() {
    var base = apiBase();
    if (!base || !hasCredential()) {
      setWinnersMessage("Войдите, чтобы увидеть победителей.");
      return Promise.resolve(false);
    }
    return fetch(withQuery(authUrl("winners"), "limit=8"), { cache: "no-store" })
      .then(readJson)
      .then(function (data) {
        if (!data || data.ok === false) throw new Error(data && data.error ? data.error : "winners failed");
        renderWinners(data);
        return true;
      })
      .catch(function () {
        setWinnersMessage("Не удалось загрузить победителей.", true);
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
    var timerEl = $("dailyPokerTimer");
    if (!timerEl) return;
    var status = dailyPokerState.status || {};
    if (!dailyPokerState.status) {
      timerEl.textContent = "Проверяем доступность раздачи…";
      return;
    }
    if (status.canPlay) {
      timerEl.textContent = status.specialDailyLimit ? "Раздача доступна." : (status.attemptsLeft > 1 ? "Доступна раздача и дополнительная попытка." : "Раздача доступна.");
      return;
    }
    if (!status.nextFreeAttemptAt) {
      timerEl.textContent = "Не удалось проверить доступность раздачи.";
      return;
    }
    var nextMs = Date.parse(status.nextFreeAttemptAt || "");
    var left = Math.max(0, Math.ceil((nextMs - currentServerMs()) / 1000) || 0);
    timerEl.textContent = "Следующая бесплатная раздача через: " + formatDuration(left);
  }

  function syncStatus(data) {
    if (!data) return;
    dailyPokerState.status = data;
    var serverMs = Date.parse(data.serverTime || "");
    if (Number.isFinite(serverMs)) dailyPokerState.serverDeltaMs = serverMs - Date.now();
    var balanceEl = $("dailyPokerBalance");
    var attemptsEl = $("dailyPokerAttempts");
    var playBtn = $("dailyPokerPlayBtn");
    var extraBtn = $("dailyPokerExtraBtn");
    if (balanceEl) {
      var bonusValue = Math.max(0, parseInt(data.bonusBalance || "0", 10) || 0);
      balanceEl.innerHTML = '<span class="daily-poker__balance-label">Бонусный баланс:</span> <strong>' + bonusValue + '</strong> <span>бонусов</span>';
    }
    if (attemptsEl) attemptsEl.innerHTML = '<span>Попытки:</span> <strong>' + (data.attemptsLeft || 0) + '</strong>';
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
    var attemptsEl = $("dailyPokerAttempts");
    var timerEl = $("dailyPokerTimer");
    if (attemptsEl) attemptsEl.innerHTML = '<span>Попытки:</span> <strong>' + next.attemptsLeft + '</strong>';
    if (timerEl) timerEl.textContent = "Раздача выполняется…";
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
      setResultText("Флоп на борде. Теперь раздай терн.", false);
      setDealButtonLabel("Раздать терн");
      return;
    }
    if (dailyPokerState.dealStage === "flop") {
      if (board) board.innerHTML = boardHtml(result.boardCards || [], 4, [3]);
      dailyPokerState.dealStage = "turn";
      setResultText("Терн открыт. Остался ривер.", false);
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
    setResultText("Карты на руках. Теперь раздай флоп.", false);
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
  }

  window.initDailyPoker = function () {
    resetManualDeal();
    bind();
    renderEmptyCards();
    setResultText(DAILY_POKER_START_PROMPT, false);
    setWinnersMessage("Загружаем победителей…");
    loadWinners();
    loadStatus();
    if (dailyPokerState.timer) clearInterval(dailyPokerState.timer);
    dailyPokerState.timer = setInterval(updateTimer, 1000);
  };
})();
