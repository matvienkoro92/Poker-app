(function () {
  var dailyPokerState = {
    status: null,
    serverDeltaMs: 0,
    timer: null,
    homeTimer: null,
    revealing: false,
    optimisticStatusBeforePlay: null,
    lastBonusBalance: null,
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

  function animateBonusBalance(el, nextValue) {
    if (!el) return;
    var to = Math.max(0, parseInt(nextValue || "0", 10) || 0);
    var from = dailyPokerState.lastBonusBalance;
    if (from == null || from === to || !window.requestAnimationFrame) {
      el.textContent = formatBonus(to);
      dailyPokerState.lastBonusBalance = to;
      return;
    }
    var start = Date.now();
    var duration = 520;
    el.classList.add("daily-poker__balance--bump");
    function frame() {
      var progress = Math.min(1, (Date.now() - start) / duration);
      var value = Math.round(from + (to - from) * progress);
      el.textContent = formatBonus(value);
      if (progress < 1) {
        window.requestAnimationFrame(frame);
      } else {
        dailyPokerState.lastBonusBalance = to;
        setTimeout(function () {
          el.classList.remove("daily-poker__balance--bump");
        }, 220);
      }
    }
    frame();
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

  function secondsUntilNextAttempt(status) {
    var payload = status || dailyPokerState.status || {};
    if (!payload.nextFreeAttemptAt) return 0;
    var nextMs = Date.parse(payload.nextFreeAttemptAt || "");
    return Math.max(0, Math.ceil((nextMs - currentServerMs()) / 1000) || 0);
  }

  function syncHomeTile(data) {
    var tile = $("dailyPokerHomeTile");
    if (!tile) return;
    var badge = $("dailyPokerHomeBadge");
    var desc = $("dailyPokerHomeDesc");
    var status = data || dailyPokerState.status || {};
    tile.classList.remove("feature--daily-poker-ready", "feature--daily-poker-extra", "feature--daily-poker-cooldown");
    if (!status || Object.keys(status).length === 0) {
      tile.classList.add("feature--daily-poker-ready");
      if (badge) badge.textContent = "Доступно";
      if (desc) desc.textContent = "1 раз в сутки";
      return;
    }
    if (status.canPlay && status.attemptsLeft > 0 && status.baseAttemptUsedToday) {
      tile.classList.add("feature--daily-poker-extra");
      if (badge) badge.textContent = "+1 попытка";
      if (desc) desc.textContent = "дополнительная раздача";
      return;
    }
    if (status.canPlay) {
      tile.classList.add("feature--daily-poker-ready");
      if (badge) badge.textContent = "Доступно";
      if (desc) desc.textContent = "1 раз в сутки";
      return;
    }
    tile.classList.add("feature--daily-poker-cooldown");
    if (badge) badge.textContent = "через";
    if (desc) desc.textContent = "через " + formatDuration(secondsUntilNextAttempt(status));
  }

  function updateTimer() {
    var timerEl = $("dailyPokerTimer");
    var status = dailyPokerState.status || {};
    syncHomeTile(status);
    if (!timerEl) return;
    if (!dailyPokerState.status) {
      timerEl.textContent = "Проверяем доступность раздачи…";
      return;
    }
    if (status.authRequired) {
      timerEl.textContent = "Войдите, чтобы проверить раздачу.";
      return;
    }
    if (status.canPlay) {
      timerEl.textContent = status.baseAttemptUsedToday && status.attemptsLeft > 0 ? "Доступна дополнительная попытка" : "Сегодняшняя раздача доступна";
      return;
    }
    if (!status.nextFreeAttemptAt) {
      timerEl.textContent = "Не удалось проверить доступность раздачи.";
      return;
    }
    timerEl.textContent = "Следующая раздача через " + formatDuration(secondsUntilNextAttempt(status));
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
    animateBonusBalance(balanceEl, data.bonusBalance);
    if (attemptsEl) attemptsEl.textContent = "Попытки: " + (data.attemptsLeft || 0);
    if (streakEl) {
      streakEl.textContent = formatTicketlessStreak(data);
      streakEl.classList.toggle("daily-poker__ticketless-streak--award", !!data.ticketlessStreakAward);
    }
    if (playBtn) {
      playBtn.hidden = !!(data.baseAttemptUsedToday && data.attemptsLeft > 0);
      playBtn.disabled = !data.canPlay || dailyPokerState.revealing;
      playBtn.textContent = "Получить раздачу";
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

  function cardKey(card) {
    return String(card && card.rank ? card.rank : "") + ":" + String(card && card.suit ? card.suit : "");
  }

  function rankValue(rank) {
    return { "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, J: 11, Q: 12, K: 13, A: 14 }[rank] || 0;
  }

  function highestStraightValues(values) {
    var set = {};
    values.forEach(function (value) {
      value = Number(value) || 0;
      if (value) set[value] = true;
      if (value === 14) set[1] = true;
    });
    for (var high = 14; high >= 5; high -= 1) {
      var ok = true;
      for (var step = 0; step < 5; step += 1) {
        if (!set[high - step]) ok = false;
      }
      if (ok) return [high, high - 1, high - 2, high - 3, high - 4].map(function (value) { return value === 1 ? 14 : value; });
    }
    return [];
  }

  function pickCardsByValues(cards, values, suit) {
    var out = [];
    values.forEach(function (value) {
      var found = cards.find(function (card) {
        return (!suit || card.suit === suit) && rankValue(card.rank) === value && out.indexOf(cardKey(card)) === -1;
      });
      if (found) out.push(cardKey(found));
    });
    return out;
  }

  function winningCardKeys(result) {
    var cards = (result.holeCards || []).concat(result.boardCards || []);
    var rank = String(result.handRank || "");
    var byRank = {};
    var bySuit = {};
    cards.forEach(function (card) {
      var rv = rankValue(card.rank);
      if (!byRank[rv]) byRank[rv] = [];
      byRank[rv].push(card);
      if (!bySuit[card.suit]) bySuit[card.suit] = [];
      bySuit[card.suit].push(card);
    });
    if (rank === "royal_flush" || rank === "straight_flush") {
      var best = [];
      Object.keys(bySuit).forEach(function (suit) {
        var suited = bySuit[suit];
        if (!suited || suited.length < 5) return;
        var values = highestStraightValues(suited.map(function (card) { return rankValue(card.rank); }));
        if (rank === "royal_flush" && values[0] !== 14) return;
        if (values.length && (!best.length || values[0] > best[0])) best = [values[0], suit].concat(values);
      });
      return best.length ? pickCardsByValues(bySuit[best[1]] || [], best.slice(2), best[1]) : [];
    }
    if (rank === "four_of_a_kind") {
      var quad = Object.keys(byRank).filter(function (value) { return byRank[value].length >= 4; }).sort(function (a, b) { return b - a; })[0];
      return quad ? byRank[quad].slice(0, 4).map(cardKey) : [];
    }
    if (rank === "full_house") {
      var trips = Object.keys(byRank).filter(function (value) { return byRank[value].length >= 3; }).sort(function (a, b) { return b - a; });
      var trip = trips[0];
      var pair = Object.keys(byRank).filter(function (value) { return value !== trip && byRank[value].length >= 2; }).sort(function (a, b) { return b - a; })[0] || trips[1];
      return (trip ? byRank[trip].slice(0, 3).map(cardKey) : []).concat(pair ? byRank[pair].slice(0, 2).map(cardKey) : []);
    }
    if (rank === "flush") {
      var flushSuit = Object.keys(bySuit).filter(function (suit) { return bySuit[suit].length >= 5; })[0];
      return flushSuit ? bySuit[flushSuit].sort(function (a, b) { return rankValue(b.rank) - rankValue(a.rank); }).slice(0, 5).map(cardKey) : [];
    }
    if (rank === "straight") {
      return pickCardsByValues(cards, highestStraightValues(cards.map(function (card) { return rankValue(card.rank); })));
    }
    if (rank === "three_of_a_kind") {
      var set = Object.keys(byRank).filter(function (value) { return byRank[value].length >= 3; }).sort(function (a, b) { return b - a; })[0];
      return set ? byRank[set].slice(0, 3).map(cardKey) : [];
    }
    return [];
  }

  function cardHtml(card, hidden, highlighted) {
    var suit = card && card.suit ? String(card.suit) : "";
    var rank = card && card.rank ? String(card.rank) : "";
    var red = suit === "hearts" || suit === "diamonds";
    if (hidden) return '<div class="daily-poker-card daily-poker-card--back" aria-hidden="true"></div>';
    return '<div class="daily-poker-card' + (red ? " daily-poker-card--red" : "") + (highlighted ? " daily-poker-card--win" : "") + '">' +
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

  function runWinEffect(result) {
    var section = document.querySelector(".daily-poker");
    var rewardEl = $("dailyPokerReward");
    var reward = result && result.reward ? result.reward : {};
    var isWin = !!(reward.ticketAmount > 0 || reward.bonusAmount > 0 || reward.grantsExtraAttempt || result.ticketlessStreakAward);
    if (rewardEl) rewardEl.classList.toggle("daily-poker__reward--win", isWin);
    if (!section || !isWin) return;
    section.classList.add("daily-poker--win");
    setTimeout(function () {
      section.classList.remove("daily-poker--win");
    }, 1500);
  }

  function revealCards(result) {
    var hole = $("dailyPokerHoleCards");
    var board = $("dailyPokerBoardCards");
    var resultEl = $("dailyPokerResult");
    var rewardEl = $("dailyPokerReward");
    var claimBtn = $("dailyPokerClaimBtn");
    dailyPokerState.revealing = true;
    var section = document.querySelector(".daily-poker");
    if (section) section.classList.remove("daily-poker--win");
    if (rewardEl) rewardEl.classList.remove("daily-poker__reward--win");
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
      var winKeys = winningCardKeys(result);
      if (hole) hole.innerHTML = (result.holeCards || []).map(function (card) {
        return cardHtml(card, false, winKeys.indexOf(cardKey(card)) !== -1);
      }).join("");
      if (board) board.innerHTML = (result.boardCards || []).map(function (card) {
        return cardHtml(card, false, winKeys.indexOf(cardKey(card)) !== -1);
      }).join("");
      dailyPokerState.revealing = false;
      setLiveText(resultEl, result.handName || "Комбинация определена");
      setLiveText(rewardEl, result.reward && result.reward.message ? result.reward.message : "Сегодня без приза. Возвращайся завтра — новая раздача уже ждет.");
      if (claimBtn) claimBtn.hidden = true;
      syncStatus(result);
      runWinEffect(result);
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
      syncStatus({ canPlay: false, authRequired: true, attemptsLeft: 0, bonusBalance: 0, ticketlessStreak: 0, ticketlessStreakTarget: 7, ticketlessStreakTicketAmount: 300, nextFreeAttemptAt: "", serverTime: new Date().toISOString() });
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

  function loadHomeTileStatus() {
    var tile = $("dailyPokerHomeTile");
    if (!tile) return Promise.resolve(false);
    var base = apiBase();
    if (!base || !hasCredential()) {
      syncHomeTile({ canPlay: true, attemptsLeft: 1, baseAttemptUsedToday: false, serverTime: new Date().toISOString() });
      return Promise.resolve(false);
    }
    return fetch(authUrl("status"), { cache: "no-store" })
      .then(readJson)
      .then(function (data) {
        if (!data || data.ok === false) throw new Error(data && data.error ? data.error : "status failed");
        syncStatus(data);
        return true;
      })
      .catch(function () {
        syncHomeTile({ canPlay: true, attemptsLeft: 1, baseAttemptUsedToday: false, serverTime: new Date().toISOString() });
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

  window.initDailyPokerHomeTile = function () {
    loadHomeTileStatus();
    if (dailyPokerState.homeTimer) clearInterval(dailyPokerState.homeTimer);
    dailyPokerState.homeTimer = setInterval(updateTimer, 1000);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", window.initDailyPokerHomeTile);
  } else {
    window.initDailyPokerHomeTile();
  }
})();
