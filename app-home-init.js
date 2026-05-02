// Темы: тёмная / светлая / золотая клубная / неоновая
(function initTheme() {
  /** Сплошной слой под градиентом: при верхнем/нижнем overscroll WebView рисует именно его, не белый */
  var LIGHT_OVERSCROLL = "#fff7ed";
  var DARK_OVERSCROLL = "#0f172a";
  var GOLD_OVERSCROLL = "#05070d";
  var NEON_OVERSCROLL = "#020611";
  var LIGHT_GRAD =
    "linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #fed7aa 100%)";
  var DARK_GRAD = "radial-gradient(circle at top, #0f172a 0, #020617 55%, #000 100%)";
  var GOLD_GRAD =
    "radial-gradient(circle at 18% 0%, rgba(180, 121, 34, 0.22), transparent 34%), radial-gradient(circle at 86% 12%, rgba(245, 158, 11, 0.12), transparent 36%), linear-gradient(145deg, #05070d 0%, #09111f 48%, #02040a 100%)";
  var NEON_GRAD =
    "radial-gradient(circle at 15% 8%, rgba(255, 38, 96, 0.22), transparent 30%), radial-gradient(circle at 82% 4%, rgba(34, 211, 238, 0.2), transparent 34%), radial-gradient(circle at 50% 92%, rgba(168, 85, 247, 0.16), transparent 38%), linear-gradient(145deg, #020611 0%, #071126 46%, #02030a 100%)";
  var DEFAULT_THEME = "gold";
  var THEMES = ["gold", "dark", "light", "neon"];
  function normalizeTheme(value) {
    return THEMES.indexOf(value) !== -1 ? value : DEFAULT_THEME;
  }
  function isTelegramThemeRuntime() {
    try {
      if (typeof isTelegramWebApp === "function" && isTelegramWebApp()) return true;
    } catch (eIsTgThemeFn) {}
    try {
      var root = document.documentElement;
      return !!(
        root &&
        root.classList &&
        (root.classList.contains("app--telegram-miniapp") || root.classList.contains("poker-telegram-miniapp"))
      );
    } catch (eIsTgThemeClass) {}
    return false;
  }
  function applyBg() {
    var current = normalizeTheme(document.documentElement.getAttribute("data-theme"));
    var isLight = current === "light";
    var isGold = current === "gold";
    var isNeon = current === "neon";
    var canvas = isLight ? LIGHT_OVERSCROLL : isGold ? GOLD_OVERSCROLL : isNeon ? NEON_OVERSCROLL : DARK_OVERSCROLL;
    var grad = isLight ? LIGHT_GRAD : isGold ? GOLD_GRAD : isNeon ? NEON_GRAD : DARK_GRAD;
    function paintRoot(el) {
      if (!el) return;
      el.style.background = "";
      el.style.backgroundColor = canvas;
      el.style.backgroundImage = grad;
    }
    paintRoot(document.documentElement);
    paintRoot(document.body);
    paintRoot(document.getElementById("app"));
  }
  var forceTelegramGoldTheme = isTelegramThemeRuntime();
  var stored = "";
  try {
    stored = localStorage.getItem("poker_theme");
  } catch (eReadTheme) {}
  var theme = forceTelegramGoldTheme ? DEFAULT_THEME : normalizeTheme(stored);
  if (forceTelegramGoldTheme) {
    try {
      localStorage.setItem("poker_theme", DEFAULT_THEME);
    } catch (eWriteTelegramTheme) {}
  }
  document.documentElement.setAttribute("data-theme", theme);
  applyBg();
  var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  if (tg && tg.setBackgroundColor) {
    tg.setBackgroundColor(theme === "light" ? LIGHT_OVERSCROLL : theme === "gold" ? GOLD_OVERSCROLL : theme === "neon" ? NEON_OVERSCROLL : DARK_OVERSCROLL);
  }
  var btn = document.getElementById("themeToggle");
  if (btn) {
    function syncThemeButton() {
      btn.setAttribute("data-theme-current", theme);
      btn.title = theme === "dark" ? "Тема: тёмная" : theme === "light" ? "Тема: светлая" : theme === "gold" ? "Тема: золотая" : "Тема: неон";
      btn.setAttribute("aria-label", btn.title);
    }
    syncThemeButton();
    btn.addEventListener("click", function () {
      var idx = THEMES.indexOf(theme);
      theme = THEMES[(idx + 1) % THEMES.length];
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("poker_theme", theme);
      syncThemeButton();
      applyBg();
      if (tg && tg.setBackgroundColor) tg.setBackgroundColor(theme === "light" ? LIGHT_OVERSCROLL : theme === "gold" ? GOLD_OVERSCROLL : theme === "neon" ? NEON_OVERSCROLL : DARK_OVERSCROLL);
    });
  }
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

function updateRaffleBadge(hasActive) {
  var badge = document.getElementById("raffleActiveBadge");
  if (badge) {
    badge.classList.toggle("feature__badge--hidden", !hasActive);
    badge.setAttribute("aria-hidden", hasActive ? "false" : "true");
  }
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("poker_raffle_active_badge", hasActive ? "1" : "0");
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
