(function () {
  var dailyPokerState = {
    status: null,
    serverDeltaMs: 0,
    timer: null,
    revealing: false,
    optimisticStatusBeforePlay: null,
  };

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

  function formatBonus(value) {
    var n = Math.max(0, parseInt(value || "0", 10) || 0);
    return "Бонусный баланс: " + n + " бонусов";
  }

  function formatTicketlessStreak(data) {
    var payload = data || {};
    var target = Math.max(1, parseInt(payload.ticketlessStreakTarget || "7", 10) || 7);
    var amount = Math.max(0, parseInt(payload.ticketlessStreakTicketAmount || "300", 10) || 300);
    if (payload.ticketlessStreakAward && payload.ticketlessStreakAward.amount) {
      return "Серия без билета: " + target + "/" + target + " — билет " + amount + " ₽ зачислен";
    }
    var streak = Math.max(0, parseInt(payload.ticketlessStreak || "0", 10) || 0);
    return "Серия без билета: " + Math.min(streak, target) + "/" + target;
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
    var streakEl = $("dailyPokerTicketlessStreak");
    var playBtn = $("dailyPokerPlayBtn");
    var extraBtn = $("dailyPokerExtraBtn");
    if (balanceEl) balanceEl.textContent = formatBonus(data.bonusBalance);
    if (attemptsEl) attemptsEl.textContent = "Попытки: " + (data.attemptsLeft || 0);
    if (streakEl) {
      streakEl.textContent = formatTicketlessStreak(data);
      streakEl.classList.toggle("daily-poker__ticketless-streak--award", !!data.ticketlessStreakAward);
    }
    if (playBtn) {
      playBtn.hidden = !!(data.baseAttemptUsedToday && data.attemptsLeft > 0);
      playBtn.disabled = !data.canPlay || dailyPokerState.revealing;
      playBtn.textContent = data.baseAttemptUsedToday ? "Играть" : "Играть";
    }
    if (extraBtn) {
      extraBtn.hidden = !(data.baseAttemptUsedToday && data.attemptsLeft > 0);
      extraBtn.disabled = !data.canPlay || dailyPokerState.revealing;
    }
    updateTimer();
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
    if (attemptsEl) attemptsEl.textContent = "Попытки: " + next.attemptsLeft;
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
      Object.prototype.hasOwnProperty.call(data, "ticketlessStreak") ||
      Object.prototype.hasOwnProperty.call(data, "nextFreeAttemptAt")
    ));
  }

  function cardHtml(card, hidden) {
    var suit = card && card.suit ? String(card.suit) : "";
    var rank = card && card.rank ? String(card.rank) : "";
    var red = suit === "hearts" || suit === "diamonds";
    if (hidden) return '<div class="daily-poker-card daily-poker-card--back" aria-hidden="true"></div>';
    return '<div class="daily-poker-card' + (red ? " daily-poker-card--red" : "") + '">' +
      '<span class="daily-poker-card__rank">' + esc(rank) + '</span>' +
      '<span class="daily-poker-card__suit">' + esc(suitSymbols[suit] || "?") + '</span>' +
      '</div>';
  }

  function renderEmptyCards() {
    var hole = $("dailyPokerHoleCards");
    var board = $("dailyPokerBoardCards");
    if (hole) hole.innerHTML = cardHtml(null, true) + cardHtml(null, true);
    if (board) board.innerHTML = [0, 1, 2, 3, 4].map(function () { return cardHtml(null, true); }).join("");
  }

  function revealCards(result) {
    var hole = $("dailyPokerHoleCards");
    var board = $("dailyPokerBoardCards");
    var resultEl = $("dailyPokerResult");
    var rewardEl = $("dailyPokerReward");
    var claimBtn = $("dailyPokerClaimBtn");
    dailyPokerState.revealing = true;
    setLiveText(resultEl, "Открываем карты…");
    setLiveText(rewardEl, "");
    if (claimBtn) claimBtn.hidden = true;
    renderEmptyCards();

    setTimeout(function () {
      if (hole) hole.innerHTML = (result.holeCards || []).map(function (card) { return cardHtml(card, false); }).join("");
    }, 160);
    setTimeout(function () {
      if (board) {
        var cards = result.boardCards || [];
        board.innerHTML = cards.slice(0, 3).map(function (card) { return cardHtml(card, false); }).join("") +
          cardHtml(null, true) + cardHtml(null, true);
      }
    }, 720);
    setTimeout(function () {
      if (board) {
        var cards = result.boardCards || [];
        board.innerHTML = cards.slice(0, 4).map(function (card) { return cardHtml(card, false); }).join("") +
          cardHtml(null, true);
      }
    }, 1280);
    setTimeout(function () {
      if (board) board.innerHTML = (result.boardCards || []).map(function (card) { return cardHtml(card, false); }).join("");
      dailyPokerState.revealing = false;
      setLiveText(resultEl, result.handName || "Комбинация определена");
      setLiveText(rewardEl, result.reward && result.reward.message ? result.reward.message : "Сегодня без приза. Возвращайся завтра за новой раздачей.");
      if (claimBtn) claimBtn.hidden = true;
      syncStatus(result);
    }, 1840);
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
    var resultEl = $("dailyPokerResult");
    if (!resultEl) return;
    setLiveText(resultEl, text || "");
    resultEl.classList.toggle("daily-poker__result--error", !!isError);
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
      syncStatus({ canPlay: false, attemptsLeft: 0, bonusBalance: 0, ticketlessStreak: 0, ticketlessStreakTarget: 7, ticketlessStreakTicketAmount: 300, nextFreeAttemptAt: "", serverTime: new Date().toISOString() });
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

  function play() {
    var base = apiBase();
    if (dailyPokerState.revealing) return;
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
        syncStatus(data);
        revealCards(data);
      })
      .catch(function (err) {
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
    bind();
    renderEmptyCards();
    loadStatus();
    if (dailyPokerState.timer) clearInterval(dailyPokerState.timer);
    dailyPokerState.timer = setInterval(updateTimer, 1000);
  };
})();
