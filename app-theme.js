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
  var THEMES = ["dark", "light", "gold", "neon"];
  function normalizeTheme(value) {
    return THEMES.indexOf(value) !== -1 ? value : "dark";
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
  var stored = localStorage.getItem("poker_theme");
  var theme = normalizeTheme(stored);
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
