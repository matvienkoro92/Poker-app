// Тема приложения: фиксированная золотая клубная.
(function initTheme() {
  /** Сплошной слой под градиентом: при верхнем/нижнем overscroll WebView рисует именно его, не белый */
  var GOLD_OVERSCROLL = "#05070d";
  var GOLD_GRAD =
    "radial-gradient(circle at 18% 0%, rgba(180, 121, 34, 0.22), transparent 34%), radial-gradient(circle at 86% 12%, rgba(245, 158, 11, 0.12), transparent 36%), linear-gradient(145deg, #05070d 0%, #09111f 48%, #02040a 100%)";
  var DEFAULT_THEME = "gold";
  function applyBg() {
    function paintRoot(el) {
      if (!el) return;
      el.style.background = "";
      el.style.backgroundColor = GOLD_OVERSCROLL;
      el.style.backgroundImage = GOLD_GRAD;
    }
    paintRoot(document.documentElement);
    paintRoot(document.body);
    paintRoot(document.getElementById("app"));
  }
  try {
    localStorage.setItem("poker_theme", DEFAULT_THEME);
  } catch (eWriteTheme) {}
  document.documentElement.setAttribute("data-theme", DEFAULT_THEME);
  applyBg();
  var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  if (tg && tg.setBackgroundColor) {
    tg.setBackgroundColor(GOLD_OVERSCROLL);
  }
  var btn = document.getElementById("themeToggle");
  if (btn && btn.parentNode) btn.parentNode.removeChild(btn);
})();

(function initRadioToggle() {
  var radio = document.getElementById("chillRadio");
  var btn = document.getElementById("radioToggle");
  if (!radio || !btn) return;
  var STATIONS = {
    chill: "https://ice2.somafm.com/groovesalad-128-mp3",
    lounge: "https://ice5.somafm.com/illstreet-128-mp3",
    "90s": "https://nostalgiafm.hostingradio.ru:8014/nostalgiafm.mp3",
    radio7: "https://stream.rcast.net/263744"
  };
  var MODES = ["", "chill", "lounge", "90s", "radio7"];
  function getMode() {
    var m = localStorage.getItem("chill_radio_mode") || "";
    return MODES.indexOf(m) >= 0 ? m : "";
  }
  var shortLabels = { "": "Выкл", chill: "Чил", lounge: "Lounge", "90s": "90е РФ", radio7: "Радио7" };
  function setMode(mode) {
    localStorage.setItem("chill_radio_mode", mode);
    btn.classList.remove("radio-toggle--chill", "radio-toggle--lounge", "radio-toggle--90s", "radio-toggle--radio7");
    if (mode === "chill") btn.classList.add("radio-toggle--chill");
    if (mode === "lounge") btn.classList.add("radio-toggle--lounge");
    if (mode === "90s") btn.classList.add("radio-toggle--90s");
    if (mode === "radio7") btn.classList.add("radio-toggle--radio7");
    var labelEl = btn.querySelector(".radio-toggle__label");
    if (labelEl) labelEl.textContent = shortLabels[mode] !== undefined ? shortLabels[mode] : shortLabels[""];
    var listenEl = document.getElementById("radioToggleListen");
    if (listenEl) {
      listenEl.setAttribute("aria-hidden", mode ? "false" : "true");
    }
    var titles = { "": "Радио: выкл", chill: "Радио: чил", lounge: "Радио: Lounge", "90s": "Радио: русские 90‑е", radio7: "Радио 7 на семи холмах" };
    btn.title = titles[mode] || titles[""];
    btn.setAttribute("aria-label", btn.title);
  }
  function applyAndPlay(mode) {
    setMode(mode);
    if (!mode) {
      radio.pause();
      radio.removeAttribute("src");
      return;
    }
    var url = STATIONS[mode];
    if (url) {
      radio.src = url;
      var p = radio.play();
      if (p && typeof p.then === "function") p.catch(function () {});
    }
  }
  setMode(getMode());
  if (getMode()) {
    radio.src = STATIONS[getMode()];
    var p = radio.play();
    if (p && typeof p.then === "function") p.catch(function () {});
  }
  var firstPlayHintKey = "poker_radio_first_play_hint";
  btn.addEventListener("click", function () {
    var cur = getMode();
    var idx = MODES.indexOf(cur);
    var next = MODES[(idx + 1) % MODES.length];
    applyAndPlay(next);
    if (next && !cur && !localStorage.getItem(firstPlayHintKey)) {
      try {
        localStorage.setItem(firstPlayHintKey, "1");
      } catch (e) {}
      alert("Если радио не играет, подождите немного.");
    }
  });
})();

(function initHomeScrollTargets() {
  function scrollToTarget(targetId) {
    var target = targetId ? document.getElementById(targetId) : null;
    if (!target) return;
    try {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (e) {
      target.scrollIntoView();
    }
  }
  document.addEventListener("click", function (e) {
    var trigger = e.target && e.target.closest ? e.target.closest("[data-home-scroll-target]") : null;
    if (!trigger) return;
    var targetId = trigger.getAttribute("data-home-scroll-target") || "";
    if (!targetId) return;
    e.preventDefault();
    if (document.body && document.body.getAttribute("data-view") !== "home" && typeof setView === "function") {
      setView("home");
      window.setTimeout(function () {
        scrollToTarget(targetId);
      }, 80);
      return;
    }
    scrollToTarget(targetId);
  });
})();

(function initHeaderMoreMenu() {
  var toggle = document.getElementById("headerMoreMenuBtn");
  var menu = document.getElementById("headerMoreMenu");
  if (!toggle || !menu) return;
  function setOpen(open) {
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
  }
  toggle.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (menu.hidden && typeof window.__pokerSyncRomanTaskPlanner === "function") {
      try {
        window.__pokerSyncRomanTaskPlanner();
      } catch (syncErr) {}
    }
    setOpen(menu.hidden);
  });
  menu.addEventListener("click", function (e) {
    if (e.target && e.target.closest && e.target.closest("[data-header-menu-close]")) {
      setOpen(false);
    }
  });
  document.addEventListener("click", function (e) {
    if (menu.hidden) return;
    var target = e.target;
    if (target && (target === toggle || menu.contains(target))) return;
    setOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !menu.hidden) {
      setOpen(false);
      try {
        toggle.focus();
      } catch (focusErr) {}
    }
  });
})();

(function installHeaderPoker21GuestReset() {
  function applyGuestHeaderPoker21Status() {
    var headerStatus = document.getElementById("headerPokerStatus");
    var headerStatusLevel = document.getElementById("headerPokerStatusLevel");
    var headerStatusFish = document.getElementById("headerPokerStatusFish");
    try {
      window.__pokerHeaderPoker21Linked = false;
      window.__pokerHeaderPoker21Nickname = "";
    } catch (eState) {}
    if (headerStatus) {
      headerStatus.classList.remove("header-status--hidden");
      headerStatus.setAttribute("aria-hidden", "false");
      headerStatus.setAttribute("tabindex", "0");
      headerStatus.setAttribute("title", "Игроки по уровню");
      headerStatus.setAttribute("aria-label", "Открыть игроков по уровню");
    }
    if (headerStatusLevel) headerStatusLevel.textContent = "УРОВЕНЬ 0";
    if (headerStatusFish) {
      headerStatusFish.src = "./assets/profile-status-fish-level-01.png";
      headerStatusFish.setAttribute("data-status-fish-level", "0");
    }
    try {
      if (typeof window.__pokerUpdateHeaderGreeting === "function") window.__pokerUpdateHeaderGreeting();
    } catch (eGreeting) {}
  }
  try {
    window.__pokerApplyGuestHeaderPoker21Status = applyGuestHeaderPoker21Status;
    window.__pokerResetHeaderPoker21GuestStatus = applyGuestHeaderPoker21Status;
  } catch (eExport) {}
})();

(function initHomeFishPoker21Status() {
  var headerStatus = document.getElementById("headerPokerStatus");
  var headerStatusLevel = document.getElementById("headerPokerStatusLevel");
  var headerStatusFish = document.getElementById("headerPokerStatusFish");
  if (!headerStatus) return;
  var loadedStatus = false;
  var hallFishRatingLoading = false;
  function fishSrcForLevel(level) {
    if (typeof pokerProfileStatusFishSrc === "function") return pokerProfileStatusFishSrc(level);
    var raw = parseInt(level, 10);
    var n = isFinite(raw) && raw > 0 ? Math.min(55, raw) : 1;
    return "./assets/profile-status-fish-level-" + (n < 10 ? "0" : "") + n + ".png";
  }
  function isGuestAuthMode() {
    try {
      var auth = window.__pokerTelegramAuth;
      if (auth && auth.status === "guest") return true;
    } catch (eAuthGuest) {}
    try {
      if (typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode()) return true;
    } catch (ePwaGuest) {}
    return false;
  }
  function poker21NicknameFromData(data) {
    var raw = data && (data.pokerPlusNickname || data.poker21Nickname || data.nickname || data.Nike || data.nick || data.name);
    return raw != null ? String(raw).trim() : "";
  }
  function syncHeaderPoker21State(linked, nickname) {
    try {
      window.__pokerHeaderPoker21Linked = !!linked;
      window.__pokerHeaderPoker21Nickname = linked ? String(nickname || "").trim() : "";
    } catch (eState) {}
    try {
      if (typeof window.__pokerUpdateHeaderGreeting === "function") window.__pokerUpdateHeaderGreeting();
    } catch (eGreeting) {}
  }
  function waitForHallFishModal(deadline) {
    if (typeof window.openHallFishRatingModal === "function") return Promise.resolve(true);
    if (Date.now() > deadline) return Promise.reject(new Error("hall-fish-modal-timeout"));
    return new Promise(function (resolve) {
      setTimeout(resolve, 32);
    }).then(function () {
      return waitForHallFishModal(deadline);
    });
  }
  function showHallFishLoadError(err) {
    try {
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tg && tg.showAlert) tg.showAlert("Не удалось загрузить список игроков. Попробуйте ещё раз.");
    } catch (eAlert) {}
    try {
      if (window.console && console.warn) console.warn("fish rating modal open failed", err);
    } catch (eWarn) {}
  }
  function openHeaderFishRatingModal(e) {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    if (typeof window.openHallFishRatingModal === "function") {
      window.openHallFishRatingModal();
      return;
    }
    if (hallFishRatingLoading) return;
    hallFishRatingLoading = true;
    waitForHallFishModal(Date.now() + 6000)
      .then(function () {
        hallFishRatingLoading = false;
        if (typeof window.openHallFishRatingModal === "function") window.openHallFishRatingModal();
        else throw new Error("hall-fish-modal-missing");
      })
      .catch(function (err) {
        hallFishRatingLoading = false;
        showHallFishLoadError(err);
      });
  }
  function bindHeaderStatusOpen() {
    if (!headerStatus || headerStatus.dataset.fishRatingBound === "1") return;
    headerStatus.dataset.fishRatingBound = "1";
    headerStatus.setAttribute("role", "button");
    headerStatus.addEventListener("click", openHeaderFishRatingModal);
    headerStatus.addEventListener("keydown", function (e) {
      if (e && (e.key === "Enter" || e.key === " ")) openHeaderFishRatingModal(e);
    });
  }
  try {
    window.__pokerOpenHallFishRatingModal = openHeaderFishRatingModal;
  } catch (eOpenExport) {}
  try {
    window.__pokerResetHeaderPoker21GuestStatus = function () {
      loadedStatus = false;
      applyStatus({ ok: true, pokerPlusVerified: false, p21Id: "", level: 0 });
    };
  } catch (eResetExport) {}
  function applyStatus(data) {
    var hasAuthoritativeStatus = !!(data && data.ok);
    var linked = !!(hasAuthoritativeStatus && (data.pokerPlusVerified || data.p21Id));
    if (!hasAuthoritativeStatus && loadedStatus) return;
    var level = data && data.level != null ? parseInt(data.level, 10) : NaN;
    var safeLevel = linked ? (isFinite(level) && level > 0 ? Math.min(55, level) : 1) : 0;
    var nickname = linked ? poker21NicknameFromData(data) : "";
    var showStatus = hasAuthoritativeStatus || loadedStatus;
    if (hasAuthoritativeStatus) {
      loadedStatus = true;
      showStatus = true;
    }
    syncHeaderPoker21State(linked, nickname);
    if (headerStatus) {
      headerStatus.classList.toggle("header-status--hidden", !showStatus);
      headerStatus.setAttribute("aria-hidden", showStatus ? "false" : "true");
      headerStatus.setAttribute("tabindex", showStatus ? "0" : "-1");
      if (showStatus) {
        headerStatus.setAttribute("title", "Игроки по уровню");
        headerStatus.setAttribute("aria-label", "Открыть игроков по уровню");
      } else {
        headerStatus.removeAttribute("title");
        headerStatus.removeAttribute("aria-label");
      }
    }
    if (headerStatusLevel) headerStatusLevel.textContent = "УРОВЕНЬ " + safeLevel;
    if (headerStatusFish) {
      headerStatusFish.src = fishSrcForLevel(safeLevel);
      headerStatusFish.setAttribute("data-status-fish-level", String(safeLevel));
    }
  }
  function authQuery() {
    if (typeof pokerApiAuthQuery === "function") return pokerApiAuthQuery("?");
    if (typeof pokerRafflesApiQueryLeading === "function") return pokerRafflesApiQueryLeading();
    return "?initData=";
  }
  function loadStatus(attempt) {
    attempt = Number(attempt) || 0;
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    var hasCred = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
    var q = authQuery();
    if (isGuestAuthMode()) {
      loadedStatus = false;
      applyStatus({ ok: true, pokerPlusVerified: false, p21Id: "", level: 0 });
      return;
    }
    if (!base || !hasCred || !q || q === "?initData=") {
      if (attempt < 12) setTimeout(function () { loadStatus(attempt + 1); }, 500);
      else applyStatus(null);
      return;
    }
    try {
      var cached = sessionStorage.getItem("poker_dt_id") || (typeof localStorage !== "undefined" && localStorage.getItem("poker_dt_id"));
      if (cached) q += "&dtIdHint=" + encodeURIComponent(cached);
    } catch (eHint) {}
    fetch(base + "/api/users" + q, { cache: "no-store" })
      .then(function (r) { return r.json(); })
      .then(function (data) { applyStatus(data); })
      .catch(function () {
        if (attempt < 12) setTimeout(function () { loadStatus(attempt + 1); }, 800);
        else applyStatus(null);
      });
  }
  loadStatus(0);
  window.addEventListener("poker-telegram-auth", function () { loadStatus(0); });
  window.addEventListener("poker-pokerplus-status-change", function (ev) {
    var detail = ev && ev.detail ? ev.detail : {};
    if (detail && detail.linked === true) {
      applyStatus({ ok: true, pokerPlusVerified: true, p21Id: detail.p21Id || detail.pokerPlusUserId || "1", level: detail.level, pokerPlusNickname: detail.pokerPlusNickname });
    } else if (detail && detail.linked === false) {
      applyStatus({ ok: true, pokerPlusVerified: false, p21Id: "" });
    }
    loadStatus(0);
  });
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) loadStatus(0);
  });
  bindHeaderStatusOpen();
})();

// Логика кнопки "Начать игру"
const startButton = document.getElementById("startButton");

if (startButton) {
  startButton.addEventListener("click", () => {
    var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (tg) {
      tg.HapticFeedback && tg.HapticFeedback.impactOccurred("medium");
      tg.sendData(JSON.stringify({ action: "enter_club" }));
    } else {
      console.log("Start club mini app (local preview mode)");
      alert(
        "Здесь будет переход к лобби клуба «Два туза». В Telegram Mini App кнопка отправит событие боту."
      );
    }
  });
}

function pokerHomeRaffleParsePrizeValue(prizeStr) {
  if (prizeStr == null || prizeStr === "") return 0;
  var m = String(prizeStr).trim().match(/\d[\d\s\u00a0\u202f]*(?:[.,]\d+)?/);
  return m ? parseFloat(m[0].replace(/[\s\u00a0\u202f]/g, "").replace(",", ".")) : 0;
}

function pokerHomeRaffleTotalPrize(raffle) {
  if (!raffle || !Array.isArray(raffle.groups)) return 0;
  return raffle.groups.reduce(function (sum, g) {
    var count = Math.max(0, parseInt(g && g.count, 10) || 0);
    var nominal = pokerHomeRaffleParsePrizeValue(g && g.prize);
    return sum + (nominal > 0 ? nominal * count : 0);
  }, 0);
}

function pokerHomeRafflesTotalPrize(raffles) {
  return (Array.isArray(raffles) ? raffles : []).reduce(function (sum, raffle) {
    return sum + pokerHomeRaffleTotalPrize(raffle);
  }, 0);
}

function pokerHomeFormatRaffleSum(rub) {
  var n = Math.round(rub);
  if (!n) return "";
  return String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f") + " ₽";
}

function pokerHomeFormatCompactRaffleSum(rub) {
  var n = Math.round(rub);
  if (!n) return "";
  var sign = n < 0 ? "-" : "";
  var abs = Math.abs(n);
  function compact(value) {
    var rounded = value >= 100 ? Math.round(value) : Math.round(value * 10) / 10;
    return String(rounded).replace(".", ",").replace(/,0$/, "");
  }
  if (abs >= 1000000) return sign + compact(abs / 1000000) + "м ₽";
  if (abs >= 1000) return sign + compact(abs / 1000) + "к ₽";
  return sign + String(abs).replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f") + " ₽";
}

function updateRaffleBadge(activeCount, activeTotalRub) {
  var count = 0;
  var totalRub = 0;
  if (Array.isArray(activeCount)) {
    count = activeCount.length;
    totalRub = pokerHomeRafflesTotalPrize(activeCount);
  } else if (typeof activeCount === "number") {
    count = Math.max(0, Math.floor(activeCount));
    totalRub = Math.max(0, Number(activeTotalRub) || 0);
  } else {
    count = activeCount ? 1 : 0;
    totalRub = Math.max(0, Number(activeTotalRub) || 0);
  }
  var hasActive = count > 0;
  var badge = document.getElementById("raffleActiveBadge");
  var amountBadge = document.getElementById("raffleActiveAmountBadge");
  var sumText = pokerHomeFormatRaffleSum(totalRub);
  var compactSumText = pokerHomeFormatCompactRaffleSum(totalRub);
  if (badge) {
    badge.textContent = String(Math.min(count, 99));
    badge.classList.toggle("feature__badge--hidden", !hasActive);
    badge.setAttribute("aria-hidden", hasActive ? "false" : "true");
    badge.setAttribute("aria-label", hasActive ? "Активных розыгрышей: " + count : "Нет активных розыгрышей");
  }
  if (amountBadge) {
    var showAmount = hasActive && !!sumText;
    amountBadge.textContent = showAmount ? "Идут на " + compactSumText : "";
    amountBadge.classList.toggle("raffle-active-amount-badge--hidden", !showAmount);
    amountBadge.setAttribute("aria-hidden", showAmount ? "false" : "true");
    if (showAmount) {
      amountBadge.setAttribute("aria-label", "Активные розыгрыши идут на " + sumText);
      amountBadge.setAttribute("title", "Идут на " + sumText);
    } else {
      amountBadge.removeAttribute("aria-label");
      amountBadge.removeAttribute("title");
    }
  }
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("poker_raffle_active_badge", hasActive ? "1" : "0");
      localStorage.setItem("poker_raffle_active_badge_count", String(count));
      if (sumText) {
        localStorage.setItem("poker_raffle_active_badge_sum", compactSumText);
        localStorage.setItem("poker_raffle_active_badge_full_sum", sumText);
      } else {
        localStorage.removeItem("poker_raffle_active_badge_sum");
        localStorage.removeItem("poker_raffle_active_badge_full_sum");
      }
    }
  } catch (eRaffleHint) {}
  var cache = (typeof window !== "undefined" && window._rafflesCache && window._rafflesCache.data && window._rafflesCache.data.activeRaffle) ? window._rafflesCache.data.activeRaffle : null;
  var hasTournamentDayTickets = false;
  if (cache) {
    var title = (cache.title || "").toLowerCase();
    if (title.indexOf("турнир дня") !== -1) {
      hasTournamentDayTickets = true;
    } else if (Array.isArray(cache.groups)) {
      for (var i = 0; i < cache.groups.length; i++) {
        var g = cache.groups[i];
        if (g && typeof g.prize === "string" && g.prize.toLowerCase().indexOf("турнир дня") !== -1) {
          hasTournamentDayTickets = true;
          break;
        }
      }
    }
  }
  // Кнопку "Розыгрыш 30 билетов" убрали из главной.
}

document.addEventListener("click", function (e) {
  var hereBtn = e.target && e.target.closest ? e.target.closest(".cashout-manager-btn--here[data-cashout-chat-user-id]") : null;
  if (hereBtn) {
    e.preventDefault();
    var userId = hereBtn.getAttribute("data-cashout-chat-user-id");
    var userName = hereBtn.getAttribute("data-cashout-chat-user-name") || "Менеджер";
    if (userId && typeof setView === "function") {
      window.__pendingOpenManagerFromCashout = { userId: userId, userName: userName };
      setView("chat");
    }
    return;
  }
  var tgBtn = e.target && e.target.closest ? e.target.closest("a.cashout-manager-btn--tg[href^=\"https://t.me/\"]") : null;
  if (tgBtn) {
    var href = tgBtn.getAttribute("href");
    var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (href && tg && tg.openLink) {
      e.preventDefault();
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      tg.openLink(href);
    }
  }
});

document.addEventListener("click", function (e) {
  var btn = e.target && e.target.closest ? e.target.closest("#pokerTasksStartBtn") : null;
  if (!btn) return;
  e.preventDefault();
  e.stopPropagation();
  if (typeof window.startMttChallenge === "function") {
    window.startMttChallenge();
  } else {
    var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (tg && tg.showAlert) tg.showAlert("Задачи ещё загружаются. Обновите страницу."); else alert("Задачи ещё загружаются. Обновите страницу.");
  }
}, true);
