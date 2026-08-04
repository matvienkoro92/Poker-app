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
    reminderSubscribed: false,
  };

  var DAILY_POKER_START_PROMPT = "Нажмите на кнопку «Раздать карты», чтобы начать";
  var DAILY_POKER_INVITE_TEXT = "Клуб «Два туза» разыгрывает беккинг-билеты на турниры";
  var DAILY_POKER_AUTH_ERROR_TEXT = "Авторизация не подтвердилась. Войдите заново через профиль или откройте мини-приложение из Telegram.";
  var DAILY_POKER_WINNERS_CACHE_MS = 60 * 1000;
  var DAILY_POKER_WINNERS_PREVIEW_LIMIT = 3;
  var DAILY_POKER_DEAL_SOUND_SRC = "./assets/daily-poker-here-we-go-again.mp3?v=20260706";
  var DAILY_POKER_WIN_SOUND_SRC = "./assets/daily-poker-win-miscom.mp3?v=20260706";
  var DAILY_POKER_LOSE_SOUND_SRC = "./assets/daily-poker-lose-keep-up.mp3?v=20260706";
  var dailyPokerDealAudio = null;
  var dailyPokerWinAudio = null;
  var dailyPokerLoseAudio = null;
  var dailyPokerWinnersCache = null;
  var dailyPokerWinnersCacheAt = 0;
  var dailyPokerWinnersPromise = null;
  var dailyPokerWinnersExpanded = false;
  var DAILY_POKER_HAND_ORDER = [
    "royal_flush",
    "straight_flush",
    "four_of_a_kind",
    "full_house",
    "flush",
    "straight",
    "three_of_a_kind",
    "two_pair",
    "pair",
    "high_card",
  ];
  var DAILY_POKER_HAND_LABELS = {
    royal_flush: "Роял-флеш",
    straight_flush: "Стрит-флеш",
    four_of_a_kind: "Каре",
    full_house: "Фулл-хаус",
    flush: "Флеш",
    straight: "Стрит",
    three_of_a_kind: "Сет",
    two_pair: "Две пары",
    pair: "Пара",
    high_card: "Старшая карта",
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

  function normalizeErrorText(message, fallback) {
    var text = String(message || "").trim();
    var low = text.toLowerCase();
    if (!text) return fallback || (typeof POKER_NET_ERR !== "undefined" ? POKER_NET_ERR : "Ошибка сети");
    if (low === "auth required" || low === "member not resolved" || low === "unauthorized") {
      return DAILY_POKER_AUTH_ERROR_TEXT;
    }
    return text;
  }

  function errorTextFrom(err, fallback) {
    return normalizeErrorText(err && err.message, fallback);
  }

  function setResultText(text, isError) {
    var resultEl = $("dailyPokerResult");
    if (resultEl) {
      var message = String(text || "");
      resultEl.innerHTML = message
        ? '<span class="daily-poker__result-primary">' + esc(message) + "</span>"
        : "";
      resultEl.hidden = !message.trim();
      resultEl.classList.toggle("daily-poker__result--error", !!isError);
      resultEl.classList.remove("daily-poker__result--prompt", "daily-poker__result--timer", "daily-poker__result--login");
      resultEl.dataset.dailyPokerPrompt = "";
    }
    setLiveText($("dailyPokerReward"), "");
  }

  function showLoginRequiredMessage(text) {
    var resultEl = $("dailyPokerResult");
    if (!resultEl) return;
    resultEl.innerHTML =
      '<span class="daily-poker__result-primary">' +
      esc(text || "Войдите в аккаунт, чтобы продолжить.") +
      "</span>" +
      '<button type="button" class="daily-poker__login-btn" data-poker-login-action="1">Войти</button>';
    resultEl.hidden = false;
    resultEl.classList.add("daily-poker__result--error", "daily-poker__result--login");
    resultEl.classList.remove("daily-poker__result--prompt", "daily-poker__result--timer");
    resultEl.dataset.dailyPokerPrompt = "";
    setLiveText($("dailyPokerReward"), "");
  }

  function playDailyPokerAudio(audio, src, preloadOnly) {
    try {
      if (!audio) {
        audio = new Audio(src);
        audio.preload = "auto";
        audio.volume = 1;
        try {
          audio.load();
        } catch (errLoad) {}
      }
      if (preloadOnly) return audio;
      audio.pause();
      audio.currentTime = 0;
      var p = audio.play();
      if (p && typeof p.catch === "function") p.catch(function () {});
    } catch (errAudio) {}
    return audio || null;
  }

  function playDailyPokerDealSound() {
    dailyPokerDealAudio = playDailyPokerAudio(dailyPokerDealAudio, DAILY_POKER_DEAL_SOUND_SRC);
  }

  window.playDailyPokerDealSound = playDailyPokerDealSound;

  function playDailyPokerWinSound() {
    dailyPokerWinAudio = playDailyPokerAudio(dailyPokerWinAudio, DAILY_POKER_WIN_SOUND_SRC);
  }

  function playDailyPokerLoseSound() {
    dailyPokerLoseAudio = playDailyPokerAudio(dailyPokerLoseAudio, DAILY_POKER_LOSE_SOUND_SRC);
  }

  function preloadDailyPokerSounds() {
    dailyPokerDealAudio = playDailyPokerAudio(dailyPokerDealAudio, DAILY_POKER_DEAL_SOUND_SRC, true);
    dailyPokerWinAudio = playDailyPokerAudio(dailyPokerWinAudio, DAILY_POKER_WIN_SOUND_SRC, true);
    dailyPokerLoseAudio = playDailyPokerAudio(dailyPokerLoseAudio, DAILY_POKER_LOSE_SOUND_SRC, true);
  }

  function hasDailyPokerWin(result) {
    var reward = result && result.reward ? result.reward : {};
    var streak = result && result.ticketlessStreakAward ? result.ticketlessStreakAward : null;
    return !!(
      Number(reward.amount || 0) > 0 ||
      Number(reward.ticketAmount || 0) > 0 ||
      Number(reward.bonusAmount || 0) > 0 ||
      reward.grantsExtraAttempt === true ||
      (streak && Number(streak.amount || 0) > 0)
    );
  }

  function setResultPrompt(primary, detail, isTimer) {
    var resultEl = $("dailyPokerResult");
    if (!resultEl) return;
    var details = Array.isArray(detail) ? detail.map(function (part) {
      return String(part || "").trim();
    }).filter(Boolean) : [];
    var primaryHtml = esc(primary || "");
    if (primary === DAILY_POKER_START_PROMPT) {
      primaryHtml = '<span class="daily-poker__result-nowrap">Нажмите на кнопку «Раздать карты», чтобы начать</span>';
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
    resultEl.classList.remove("daily-poker__result--login");
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
    return "Баланс Беккинг-бонусов: " + n + " бонусов";
  }

  function buildDailyPokerBalanceHtml(value) {
    var n = Math.max(0, parseInt(value || "0", 10) || 0);
    return (
      '<span class="daily-poker__balance-label">Баланс Беккинг-бонусов</span> ' +
      "<strong>" + n + "</strong> " +
      '<span class="daily-poker__balance-unit">бонусов</span>' +
      '<span class="daily-poker__balance-note">Поменяйте через менеджера на беккинг-билеты от 300 ₽. 1 бонус = 1 рубль</span>'
    );
  }

  function formatCompactAmount(value) {
    var n = Math.max(0, parseInt(value || "0", 10) || 0);
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  function formatRubles(value) {
    return formatCompactAmount(value) + " ₽";
  }

  function nonNegativeInt(value) {
    return Math.max(0, parseInt(value || "0", 10) || 0);
  }

  function dailyPokerHandStatsHtml(stats) {
    var counts = stats && stats.handCounts && typeof stats.handCounts === "object" ? stats.handCounts : {};
    var parts = DAILY_POKER_HAND_ORDER.map(function (rank) {
      var count = Math.max(0, parseInt(counts[rank] || "0", 10) || 0);
      if (count <= 0) return "";
      return DAILY_POKER_HAND_LABELS[rank] + " " + formatCompactAmount(count);
    }).filter(Boolean);
    return parts.length
      ? '<span>Комбинации: <strong>' + esc(parts.join(" · ")) + '</strong></span>'
      : "";
  }

  function dailyPokerConsolationStatsHtml(stats) {
    var count = Math.max(0, parseInt(stats && stats.consolationBonusCount || "0", 10) || 0);
    var amount = Math.max(0, parseInt(stats && stats.consolationBonusAmount || "0", 10) || 0);
    if (count <= 0 && amount <= 0) return "";
    return '<span>Утешительные бонус-билеты: <strong>' +
      esc(formatCompactAmount(count)) + " на " + esc(formatRubles(amount)) +
    "</strong></span>";
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
    var wins = nonNegativeInt(row && row.winsCount);
    var spins = nonNegativeInt(row && row.spinCount);
    var parts = [];
    if (spins > 0) parts.push(spins + " " + pluralRu(spins, "крутка", "крутки", "круток"));
    if (wins > 0) parts.push(wins + " " + pluralRu(wins, "выигрыш", "выигрыша", "выигрышей"));
    if (row && row.bestPrize) parts.push("лучший: " + row.bestPrize);
    return parts.join(" · ");
  }

  function normalizeWinnerNamePart(value) {
    return String(value == null ? "" : value).trim();
  }

  function sameWinnerNamePart(a, b) {
    return normalizeWinnerNamePart(a).toLowerCase() === normalizeWinnerNamePart(b).toLowerCase();
  }

  function winnerFishLevelHtml(row) {
    if (!row || row.pokerPlusStatusLevel == null || row.pokerPlusStatusLevel === "") return "";
    var level = parseInt(row.pokerPlusStatusLevel, 10);
    if (!isFinite(level)) return "";
    level = Math.max(0, Math.min(100, level));
    var fishHtml = "";
    if (typeof pokerProfileStatusFishIconHtml === "function") {
      fishHtml = pokerProfileStatusFishIconHtml(level, "daily-poker-winner__fish");
    }
    var label = level > 0 ? "Уровень " + String(level) : "Привяжите аккаунт";
    return '<span class="daily-poker-winner__fish-level">' +
      fishHtml +
      '<span>' + esc(label) + '</span>' +
    '</span>';
  }

  function winnerIdentityHtml(row) {
    var name = normalizeWinnerNamePart(row && (row.pokerPlusName || row.displayName)) || "Игрок";
    var nick = normalizeWinnerNamePart(row && row.pokerPlusNickname);
    var nickHtml = nick && !sameWinnerNamePart(nick, name)
      ? '<span class="daily-poker-winner__poker-nick">' + esc(nick) + '</span>'
      : "";
    return '<span class="daily-poker-winner__identity"><strong>' + esc(name) + '</strong>' + nickHtml + '</span>';
  }

  function winnerTelegramHtml(row) {
    var login = normalizeWinnerNamePart(row && row.telegramUsername).replace(/^@+/g, "");
    var name = normalizeWinnerNamePart(row && row.telegramDisplayName);
    var parts = [];
    if (login) parts.push("@" + login);
    if (name && !sameWinnerNamePart(name, login) && !sameWinnerNamePart(name, "@" + login)) parts.push(name);
    if (!parts.length) return "";
    return '<small class="daily-poker-winner__telegram">Telegram: ' + esc(parts.join(" · ")) + '</small>';
  }

  function winnerPrizeText(row) {
    row = row || {};
    var hasTicketTotal = Object.prototype.hasOwnProperty.call(row, "ticketTotal");
    var hasBonusTotal = Object.prototype.hasOwnProperty.call(row, "bonusTotal");
    var ticketTotal = hasTicketTotal ? nonNegativeInt(row.ticketTotal) : 0;
    var bonusTotal = hasBonusTotal ? nonNegativeInt(row.bonusTotal) : 0;
    var totalAmount = nonNegativeInt(row.totalPrizeAmount);
    var extraAttempts = nonNegativeInt(row.extraAttempts);
    var parts = [];
    if (!hasTicketTotal && totalAmount > 0) ticketTotal = Math.max(0, totalAmount - bonusTotal);
    if (ticketTotal > 0) parts.push(formatRubles(ticketTotal));
    if (bonusTotal > 0) parts.push(formatCompactAmount(bonusTotal) + " бонусов");
    if (!parts.length && extraAttempts > 0) {
      parts.push(formatCompactAmount(extraAttempts) + " " + pluralRu(extraAttempts, "доп. попытка", "доп. попытки", "доп. попыток"));
    }
    if (parts.length) return "Всего: " + parts.join(" + ");
    return row.prize || "Суммарный приз";
  }

  function setWinnersMessage(text, isError) {
    var list = $("dailyPokerWinnersList");
    if (!list) return;
    list.innerHTML = '<div class="daily-poker__winners-empty' + (isError ? " daily-poker__winners-empty--error" : "") + '">' + esc(text || "") + '</div>';
  }

  function formatDailyPokerStartDate(value) {
    var raw = String(value || "").trim();
    if (!raw) return "";
    var m = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) return m[3] + "." + m[2] + "." + m[1];
    var d = new Date(raw);
    if (!isNaN(d.getTime())) {
      try {
        return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
      } catch (e) {
        return d.toLocaleDateString("ru-RU");
      }
    }
    return "";
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
    var totalUnique = Math.max(0, parseInt(stats.totalUniquePlayers || data.totalUniquePlayers || "0", 10) || 0);
    var today = Math.max(0, parseInt(stats.todayUniquePlayers || data.todayUniquePlayers || "0", 10) || 0);
    var todayTotal = Math.max(0, parseInt(stats.todayTotalSpins || data.todayTotalSpins || "0", 10) || 0);
    var week = Math.max(0, parseInt(stats.weekUniquePlayers || data.weekUniquePlayers || "0", 10) || 0);
    var weekTotal = Math.max(0, parseInt(stats.weekTotalSpins || data.weekTotalSpins || "0", 10) || 0);
    var month = Math.max(0, parseInt(stats.monthUniquePlayers || data.monthUniquePlayers || "0", 10) || 0);
    var monthTotal = Math.max(0, parseInt(stats.monthTotalSpins || data.monthTotalSpins || "0", 10) || 0);
    var previousMonth = Math.max(0, parseInt(stats.previousMonthUniquePlayers || data.previousMonthUniquePlayers || "0", 10) || 0);
    var previousMonthTotal = Math.max(0, parseInt(stats.previousMonthTotalSpins || data.previousMonthTotalSpins || "0", 10) || 0);
    var firstSpinDate = formatDailyPokerStartDate(stats.firstSpinDate || data.firstSpinDate || stats.firstSpinAt || data.firstSpinAt);
    var handStatsHtml = dailyPokerHandStatsHtml(stats);
    var consolationStatsHtml = dailyPokerConsolationStatsHtml(stats);
    el.hidden = false;
    el.innerHTML =
      (firstSpinDate ? '<span>Игра запущена: <strong>' + esc(firstSpinDate) + '</strong></span>' : "") +
      '<span>Всего уникальных: <strong>' + esc(formatCompactAmount(totalUnique)) + '</strong></span>' +
      '<span>Сегодня крутили уникальных: <strong>' + esc(formatCompactAmount(today)) + '</strong></span>' +
      '<span>Сегодня крутили всего: <strong>' + esc(formatCompactAmount(todayTotal || today)) + '</strong></span>' +
      '<span>На этой неделе крутили уникальных: <strong>' + esc(formatCompactAmount(week)) + '</strong></span>' +
      '<span>На этой неделе крутили всего: <strong>' + esc(formatCompactAmount(weekTotal || week)) + '</strong></span>' +
      '<span>В этом месяце крутили уникальных: <strong>' + esc(formatCompactAmount(month)) + '</strong></span>' +
      '<span>В этом месяце крутили всего: <strong>' + esc(formatCompactAmount(monthTotal || month)) + '</strong></span>' +
      '<span>В прошлом месяце крутили уникальных: <strong>' + esc(formatCompactAmount(previousMonth)) + '</strong></span>' +
      '<span>В прошлом месяце крутили всего: <strong>' + esc(formatCompactAmount(previousMonthTotal || previousMonth)) + '</strong></span>' +
      handStatsHtml +
      consolationStatsHtml;
  }

  function renderHeroStats(data) {
    var uniqueEl = $("dailyPokerTotalUniquePlayers");
    var spinsEl = $("dailyPokerTotalSpins");
    var prizeEl = $("dailyPokerTotalPrize");
    if (!uniqueEl && !spinsEl && !prizeEl) return;
    var stats = data && data.spinStats && typeof data.spinStats === "object" ? data.spinStats : (data || {});
    var totalUnique = Math.max(0, parseInt(stats.totalUniquePlayers || (data && data.totalUniquePlayers) || "0", 10) || 0);
    var totalSpins = Math.max(0, parseInt(stats.totalSpins || (data && data.totalSpins) || "0", 10) || 0);
    var totalPrize = Math.max(0, parseInt((data && data.totalPrizeRubles) || "0", 10) || 0);
    if (uniqueEl) uniqueEl.textContent = formatCompactAmount(totalUnique);
    if (spinsEl) spinsEl.textContent = formatCompactAmount(totalSpins);
    if (prizeEl) prizeEl.textContent = formatRubles(totalPrize);
  }

  function winnerHtml(winner, index) {
    var row = winner || {};
    var rank = Math.max(1, index + 1);
    var subline = winnerSubline(row);
    var fishLevel = winnerFishLevelHtml(row);
    var telegram = winnerTelegramHtml(row);
    return '<article class="daily-poker-winner">' +
      '<div class="daily-poker-winner__avatar" aria-hidden="true">' + rank + '</div>' +
      '<div class="daily-poker-winner__body">' +
        '<div class="daily-poker-winner__top">' +
          winnerIdentityHtml(row) +
          '<span class="daily-poker-winner__rank">#' + rank + '</span>' +
        '</div>' +
        fishLevel +
        '<p>' + esc(winnerPrizeText(row)) + '</p>' +
        (subline ? '<small>' + esc(subline) + '</small>' : "") +
        telegram +
      '</div>' +
    '</article>';
  }

  function winnersToggleHtml(winners, visibleCount) {
    var hiddenCount = Math.max(0, winners.length - visibleCount);
    if (winners.length <= DAILY_POKER_WINNERS_PREVIEW_LIMIT) return "";
    var label = dailyPokerWinnersExpanded ? "Скрыть" : "Еще";
    var detail = dailyPokerWinnersExpanded ? "" : " +" + hiddenCount;
    return '<div class="daily-poker__winners-more">' +
      '<button type="button" class="daily-poker__winners-more-btn" data-daily-poker-winners-toggle="1" aria-expanded="' +
      (dailyPokerWinnersExpanded ? "true" : "false") +
      '">' + esc(label + detail) + '</button>' +
    '</div>';
  }

  function renderWinners(data) {
    var list = $("dailyPokerWinnersList");
    var meta = $("dailyPokerWinnersMeta");
    if (!list) return;
    var winners = data && Array.isArray(data.winners) ? data.winners : [];
    var totalRubles = Math.max(0, parseInt(data && data.totalPrizeRubles || "0", 10) || 0);
    if (meta) meta.textContent = totalRubles ? "За всё время: " + formatRubles(totalRubles) : "За всё время";
    renderHeroStats(data);
    renderSpinStats(data);
    if (!winners.length) {
      setWinnersMessage("Рублёвых выигрышей пока нет.");
      return;
    }
    var visibleCount = dailyPokerWinnersExpanded ? winners.length : Math.min(DAILY_POKER_WINNERS_PREVIEW_LIMIT, winners.length);
    var visibleWinners = winners.slice(0, visibleCount);
    list.innerHTML = visibleWinners.map(winnerHtml).join("") + winnersToggleHtml(winners, visibleCount);
  }

  function toggleWinnersExpanded(evt) {
    var target = evt && evt.target && evt.target.closest ? evt.target.closest("[data-daily-poker-winners-toggle]") : null;
    if (!target) return;
    if (evt && typeof evt.preventDefault === "function") evt.preventDefault();
    dailyPokerWinnersExpanded = !dailyPokerWinnersExpanded;
    if (dailyPokerWinnersCache) renderWinners(dailyPokerWinnersCache);
  }

  function loadWinners(options) {
    options = options || {};
    var force = options.force === true;
    if (!force && dailyPokerWinnersCache && Date.now() - dailyPokerWinnersCacheAt < DAILY_POKER_WINNERS_CACHE_MS) {
      renderWinners(dailyPokerWinnersCache);
      return Promise.resolve(true);
    }
    if (!force && dailyPokerWinnersPromise) return dailyPokerWinnersPromise;
    var base = apiBase();
    if (!base) {
      setWinnersMessage("Не удалось загрузить победителей.");
      renderHeroStats(null);
      renderSpinStats(null);
      return Promise.resolve(false);
    }
    dailyPokerWinnersPromise = fetch(withQuery(authUrl("winners"), "limit=50"), { cache: "no-store" })
      .then(readJson)
      .then(function (data) {
        if (!data || data.ok === false) throw new Error(data && data.error ? data.error : "winners failed");
        dailyPokerWinnersCache = data;
        dailyPokerWinnersCacheAt = Date.now();
        renderWinners(data);
        return true;
      })
      .catch(function () {
        setWinnersMessage("Не удалось загрузить победителей.", true);
        renderHeroStats(null);
        renderSpinStats(null);
        return false;
      })
      .then(function (ok) {
        dailyPokerWinnersPromise = null;
        return ok;
      });
    return dailyPokerWinnersPromise;
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
    if (typeof document !== "undefined" && (
      document.hidden || !document.querySelector('[data-view="daily-poker"].view--active')
    )) return;
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
    setSubscribeRequirementsVisible(!!(data.subscriptionRequired || isDailyPokerRequirementCode(data.code)));
    if (Object.prototype.hasOwnProperty.call(data, "dailyPokerReminderSubscribed")) {
      setReminderButtonState(!!data.dailyPokerReminderSubscribed, false);
    }
    var serverMs = Date.parse(data.serverTime || "");
    if (Number.isFinite(serverMs)) dailyPokerState.serverDeltaMs = serverMs - Date.now();
    var balanceEl = $("dailyPokerBalance");
    var battleBonusEl = $("dailyPokerBattleBonus");
    var playBtn = $("dailyPokerPlayBtn");
    var extraBtn = $("dailyPokerExtraBtn");
    if (balanceEl) {
      balanceEl.innerHTML = buildDailyPokerBalanceHtml(data.bonusBalance);
    }
    if (battleBonusEl && Object.prototype.hasOwnProperty.call(data, "bonusBalance")) {
      battleBonusEl.textContent = formatCompactAmount(data.bonusBalance) + " баллов";
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
    var result = dailyPokerState.stagedDealResult || {};
    if (hole) hole.innerHTML = (result.holeCards || []).map(function (card) { return cardHtml(card, false, false); }).join("");
    if (board) board.innerHTML = boardHtml(result.boardCards || [], 5, [4]);
    dailyPokerState.revealing = false;
    setResultText(formatResultLine(result), false);
    if (hasDailyPokerWin(result)) playDailyPokerWinSound();
    else playDailyPokerLoseSound();
    resetManualDeal();
    syncStatus(result);
    loadWinners({ force: true });
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
    dailyPokerState.stagedDealResult = result || {};
    dailyPokerState.dealStage = "hole";
    setActiveDealButton(triggerBtn || getDealButton());
    dailyPokerState.revealing = false;
    setResultText("Карты на руках. Следующий ход — флоп.", false);
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

  function dailyPokerDeviceId() {
    return typeof pokerGetRaffleStableDeviceId === "function" ? pokerGetRaffleStableDeviceId() : "";
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

  function openDailyPokerRequirementLink(data) {
    var url = data && data.openUrl ? String(data.openUrl) : "";
    if (!url && data && data.code === "CHANNEL_REQUIRED") url = "https://t.me/Dva_tuza_club";
    if (!url && data && data.code === "BOT_REQUIRED") url = "https://t.me/Poker_dvatuza_bot";
    if (!url && data && data.code === "SUBSCRIPTION_REQUIRED") url = "https://t.me/Poker_dvatuza_bot";
    if (!url) return false;
    try {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tg && tg.openTelegramLink) {
        tg.openTelegramLink(url);
        return true;
      }
      if (typeof window.open === "function") {
        window.open(url, "_blank");
        return true;
      }
    } catch (e) {}
    return false;
  }

  function isDailyPokerRequirementCode(code) {
    return code === "CHANNEL_REQUIRED" || code === "BOT_REQUIRED" || code === "SUBSCRIPTION_REQUIRED" || code === "TELEGRAM_REQUIRED";
  }

  function isDailyPokerIdentityConflictCode(code) {
    return [
      "SAME_DEVICE",
      "SAME_TELEGRAM",
      "SAME_POKER21",
      "SAME_DT_ID",
      "SAME_IP",
    ].indexOf(String(code || "").toUpperCase()) !== -1;
  }

  function setSubscribeRequirementsVisible(visible) {
    var el = document.querySelector(".daily-poker__subscribe-requirements");
    if (!el) return;
    el.hidden = !visible;
    el.setAttribute("aria-hidden", visible ? "false" : "true");
  }

  function setReminderButtonState(subscribed, busy) {
    dailyPokerState.reminderSubscribed = !!subscribed;
    var btn = $("dailyPokerNotifyBtn");
    if (!btn) return;
    btn.disabled = !!busy;
    btn.dataset.subscribed = subscribed ? "1" : "0";
    btn.setAttribute(
      "aria-label",
      subscribed ? "Отключить уведомление об окончании таймера" : "Получать уведомление об окончании таймера"
    );
    btn.setAttribute("title", subscribed ? "Уведомление включено" : "Получать уведомление");
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
    if (typeof pokerBuildPersonalInviteLink === "function") return pokerBuildPersonalInviteLink("daily_poker");
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
      btn.setAttribute("aria-label", "Скопировать личную пригласительную ссылку на Раздачу дня");
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
      showMessage("Ссылка скопирована.", false);
    }).catch(function () {
      showMessage("Не удалось скопировать ссылку. Попробуйте кнопку «Позвать друга».", true);
    });
  }

  function toggleDailyPokerReminder(evt) {
    if (evt && typeof evt.preventDefault === "function") evt.preventDefault();
    if (!apiBase() || !hasCredential()) {
      showLoginRequiredMessage("Войдите в аккаунт, чтобы включить уведомление.");
      return;
    }
    var current = dailyPokerState.status || {};
    var previousSubscribed = dailyPokerState.reminderSubscribed === true;
    var unsubscribe = previousSubscribed;
    setReminderButtonState(previousSubscribed, true);
    fetch(apiBase().replace(/\/$/, "") + "/api/daily-poker-reminder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authBody({
        unsubscribe: unsubscribe,
        canPlay: current.canPlay,
        attemptsLeft: current.attemptsLeft,
        baseAttemptUsedToday: current.baseAttemptUsedToday,
        nextFreeAttemptAt: current.nextFreeAttemptAt || "",
      })),
    })
      .then(function (r) {
        return readJson(r).then(function (data) {
          if (!r.ok || !data || data.ok === false) {
            throw new Error(data && data.error ? data.error : "Не удалось обновить уведомление.");
          }
          return data;
        });
      })
      .then(function (data) {
        setReminderButtonState(!!data.subscribed, false);
        if (data.subscribed && typeof window.playPokerSubscribeSound === "function") window.playPokerSubscribeSound();
        var tgw = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tgw && tgw.HapticFeedback && typeof tgw.HapticFeedback.notificationOccurred === "function") {
          tgw.HapticFeedback.notificationOccurred(data.subscribed ? "success" : "warning");
        }
        showMessage(data.subscribed ? "Уведомление включено. Напишем в бот, когда таймер закончится." : "Уведомление отключено.", false);
      })
      .catch(function (err) {
        setReminderButtonState(previousSubscribed, false);
        showMessage(errorTextFrom(err, "Не удалось обновить уведомление."), true);
      });
  }

  function loadStatus() {
    var base = apiBase();
    if (!base || !hasCredential()) {
      showLoginRequiredMessage("Войдите в аккаунт, чтобы сыграть в Раздачу дня.");
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
        showMessage(errorTextFrom(err, POKER_NET_ERR), true);
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
      showLoginRequiredMessage("Войдите в аккаунт, чтобы сыграть.");
      return;
    }
    playDailyPokerDealSound();
    dailyPokerState.revealing = true;
    spendAttemptImmediately();
    setBusy(true);
    showMessage("Начинаем раздачу", false);
    var playIdempotencyKey = idempotencyKey();
    fetch(authUrl("play"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authBody({ idempotencyKey: playIdempotencyKey, deviceId: dailyPokerDeviceId() })),
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
        if (typeof pokerTrackAnalyticsEvent === "function") {
          pokerTrackAnalyticsEvent("daily_poker_spin", { event_id: "evt_daily_" + String(playIdempotencyKey).replace(/[^a-zA-Z0-9_-]/g, "_") });
        }
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
        if (err && err.data && isDailyPokerIdentityConflictCode(err.data.code)) {
          setResultText("", false);
        } else if (err && err.data && isDailyPokerRequirementCode(err.data.code)) {
          setSubscribeRequirementsVisible(true);
          showMessage(errorTextFrom(err, "Для игры нужно открыть бота и подписаться на канал."), true);
          openDailyPokerRequirementLink(err.data);
        } else {
          showMessage(errorTextFrom(err, POKER_NET_ERR), true);
        }
      });
  }

  function bind() {
    var playBtn = $("dailyPokerPlayBtn");
    var extraBtn = $("dailyPokerExtraBtn");
    var inviteBtn = $("dailyPokerInviteBtn");
    var notifyBtn = $("dailyPokerNotifyBtn");
    var copyBtn = $("dailyPokerCopyLinkBtn");
    var winnersList = $("dailyPokerWinnersList");
    if (playBtn && playBtn.dataset.dailyPokerBound !== "1") {
      playBtn.dataset.dailyPokerBound = "1";
      playBtn.addEventListener("pointerover", preloadDailyPokerSounds, { passive: true });
      playBtn.addEventListener("touchstart", preloadDailyPokerSounds, { passive: true });
      playBtn.addEventListener("click", play);
    }
    if (extraBtn && extraBtn.dataset.dailyPokerBound !== "1") {
      extraBtn.dataset.dailyPokerBound = "1";
      extraBtn.addEventListener("pointerover", preloadDailyPokerSounds, { passive: true });
      extraBtn.addEventListener("touchstart", preloadDailyPokerSounds, { passive: true });
      extraBtn.addEventListener("click", play);
    }
    if (inviteBtn && inviteBtn.dataset.dailyPokerBound !== "1") {
      inviteBtn.dataset.dailyPokerBound = "1";
      inviteBtn.addEventListener("click", openDailyPokerInvite);
    }
    if (notifyBtn && notifyBtn.dataset.dailyPokerBound !== "1") {
      notifyBtn.dataset.dailyPokerBound = "1";
      notifyBtn.addEventListener("click", toggleDailyPokerReminder);
    }
    if (copyBtn && copyBtn.dataset.dailyPokerBound !== "1") {
      copyBtn.dataset.dailyPokerBound = "1";
      copyBtn.addEventListener("click", copyDailyPokerLink);
    }
    if (winnersList && winnersList.dataset.dailyPokerBound !== "1") {
      winnersList.dataset.dailyPokerBound = "1";
      winnersList.addEventListener("click", toggleWinnersExpanded);
    }
  }

  window.initDailyPoker = function () {
    resetManualDeal();
    bind();
    dailyPokerWinnersExpanded = false;
    renderEmptyCards();
    setResultPrompt(DAILY_POKER_START_PROMPT, [], false);
    setWinnersMessage("Загружаем победителей…");
    loadWinners();
    loadStatus();
    if (dailyPokerState.timer) clearInterval(dailyPokerState.timer);
    dailyPokerState.timer = setInterval(updateTimer, 1000);
  };
})();
