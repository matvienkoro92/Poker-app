// Предсказание на день: тексты (расширенный список), без префиксов «День N»
var POKER_DAILY_PREDICTIONS = [
  "Сегодня твои тузы будут вести себя как короли на балу — все им кланяются, но помни: даже короли иногда проигрывают революцию.",
  "Твои JJ сегодня — как два надежных друга: они всегда рядом, но иногда предают в самый неподходящий момент.",
  "Сегодня ты на кнопке — как шеф-повар на кухне: все ингредиенты под рукой, но не пересоли с агрессией.",
  "Твой стил сегодня — как грабитель в бархатных перчатках: тихо, элегантно, но иногда попадаешь на сигнализацию.",
  "Твои блайнды сегодня — как крепостные стены: иногда их нужно защищать, даже если внутри только мыши и паутина.",
  "Малый блайнд сегодня — как младший брат: всегда первый в драке, но редко выходит победителем.",
  "Большой блайнд сегодня — как старый дуб: крепко стоит на своем, но молния может ударить в любую минуту.",
  "Сегодня твой колл против кнопки — как танго с незнакомцем: страшно, но интригующе.",
  "Твой большой блайнд против кат-оффа — как медведь в берлоге: кажется, спит, но проснется в самый неожиданный момент.",
  "Твой 3-бет сегодня — как дорогое вино: чем старше, тем лучше, но не всем по вкусу.",
  "Сегодня твой блефовый 3-бет — как фокусник: все видят, но никто не верит своим глазам.",
  "Когда тебе делают 3-бет — как на экзамене: знаешь ответ, но боишься ошибиться.",
  "Сегодня твой 3-бет/фолд — как романтическое свидание: идешь с надеждой, но готов уйти при первых признаках проблем.",
  "Твой 4-бет сегодня — как ядерная кнопка: мощно, эффектно, но использовать можно только раз.",
  "Сегодня твой блефовый 4-бет — как прыжок с парашютом: страшно, но адреналин того стоит.",
  "Когда тебе делают 4-бет — как встреча с призраком: не веришь, но дрожь по спине пробегает.",
  "Сегодня твоя префлоп-война — как шахматная партия: каждый ход просчитан, но соперник может сделать неожиданный.",
  "Твой стил сегодня — как искусный вор: не просто берет, а оставляет визитную карточку.",
  "Сегодня война блайндов — как соседские склоки: много шума, но мало смысла.",
  "Твой сквиз сегодня — как бутерброд с колбасой: чем больше слоев, тем вкуснее.",
  "Сегодня твой стил против лимперов — как сбор грибов в лесу: много мусора, но иногда находишь белый.",
  "Война блайндов сегодня — как детская драка: много крика, но никто не пострадает.",
  "Твой позиционный 3-бет — как удар с правого фланга: неожиданно, точно, болезненно.",
  "3-бет с кнопки сегодня — как домашнее задание: делать лень, но надо.",
  "3-бет с кат-оффа — как утренний кофе: бодрит, но может обжечь.",
  "Сегодня твой 3-бет против кат-оффа — как спор двух профессоров: умно, но непонятно.",
  "Твой чек-рейз сегодня — как засада в лесу: тихо ждешь, потом БАЦ!",
  "Чек-рейз на флопе — как сюрприз на день рождения: все ждут, но всё равно удивляются.",
  "На сухом флопе твой чек-рейз — как дождь в пустыне: редкий, но жизненно важный.",
  "3-бет из малого блайнда — как вызов на дуэль: благородно, но опасно.",
  "Сквиз из малого блайнда — как выход из запасного выхода: неожиданно, но эффективно.",
  "Когда у тебя AA, а на флопе 7-8-9 — твои тузы как котик в коробке: милые, но совершенно беспомощные. Расслабься, это просто раздача.",
  "JJ в ранней позиции — как крючки на тонкой леске: выглядят крепко, но могут оборваться в самый важный момент.",
  "Сидеть на кнопке с 7-2o и думать «ну я же в позиции» — как выйти на балкон без парапета: формально вид красивый, но шаг в сторону и всё.",
  "Стил с CO и украденные блайнды — как ограбление века в микроскопе: ощущаешь себя Оушеном, хотя забрал всего пару фишек.",
  "Защищать BB с 9-3o в надежде увидеть флоп 9-9-3 — как ждать единорога в метро: теория не запрещает, но практика смеётся.",
  "Малый блайнд — как младший брат в драке: первый вписывается, первый получает по шапке. Иногда лучше просто отойти в сторону.",
  "Защищать большой блайнд как мать-одиночка — благородно, но помни: банк не даёт алименты за каждый колл.",
  "Колл с 6-4s против кнопки «ну это же дро» — как вера в предвыборные обещания: звучит красиво, но редко доезжает.",
  "Колл с любыми двумя против поздней позиции — как игра в угадайку: кажется, что он блефует, но чаще всего это просто вэлью.",
  "3-бет с QQ и ощущение супергероя — классика жанра, но где-то рядом уже поджидают злодеи с KK и AA.",
  "3-бет блеф с 7-2o «я читаю его как книгу» — как перепутать роман с инструкцией к микроволновке: буквы те же, смысл другой.",
  "Когда тебе прилетает 3-бет и начинается внутренняя паника — просто дыши глубже: иногда лучший мув — честный фолд.",
  "Сделал 3-бет и получил 4-бет — это как выйти в центр сцены и забыть текст: хочется продолжить, но иногда лучше поклониться и уйти.",
  "4-бет с AA — как молитва о колле: половину раз срабатывает, а вторую половину тебе просто уважаемо скидывают.",
  "4-бет блеф — как прыжок без проверки парашюта: если раскроется — легенда, если нет — учебный спот для разбора.",
  "Получить 4-бет и думать «ну теперь-то точно AA» — как смотреть ужастик в десятый раз: знаешь концовку, но все равно страшно.",
  "Префлопная война 3-бет/4-бет — как дуэль на рассвете: красиво со стороны, но кому-то всё равно придётся упасть.",
  "Стилить как профессионал «тихо и незаметно» — это идеал, но в реальности тебя выдают звук фишек и лишний таймбанк.",
  "Война блайндов — как ссора соседей: много шума, царапин и эмоций, а в итоге оба остаются немного в минусе."
];

function getDailyPredictionStorage() {
  try {
    var raw = localStorage.getItem("poker_daily_prediction_state");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function saveDailyPredictionStorage(state) {
  try {
    localStorage.setItem("poker_daily_prediction_state", JSON.stringify(state));
  } catch (e) {}
}

function getTodayKey() {
  var d = new Date();
  var y = d.getFullYear();
  var m = String(d.getMonth() + 1).padStart(2, "0");
  var day = String(d.getDate()).padStart(2, "0");
  return y + "-" + m + "-" + day;
}

function ensureTodayPredictionState() {
  var key = getTodayKey();
  var state = getDailyPredictionStorage();
  var index;
  if (state && state.date === key && typeof state.index === "number") {
    index = state.index;
  } else {
    var prevIndex = state && typeof state.index === "number" ? state.index : null;
    if (!POKER_DAILY_PREDICTIONS.length) {
      index = 0;
    } else {
      index = Math.floor(Math.random() * POKER_DAILY_PREDICTIONS.length);
      if (POKER_DAILY_PREDICTIONS.length > 1 && prevIndex != null && index === prevIndex) {
        index = (index + 1) % POKER_DAILY_PREDICTIONS.length;
      }
    }
    state = { date: key, index: index, read: false };
    saveDailyPredictionStorage(state);
  }
  return state;
}

function getPokerDailyPredictionForToday() {
  var state = ensureTodayPredictionState();
  return POKER_DAILY_PREDICTIONS[state.index] || "";
}

function markDailyPredictionRead() {
  var state = ensureTodayPredictionState();
  if (!state.read) {
    state.read = true;
    saveDailyPredictionStorage(state);
  }
}

function updateDailyPredictionBadge() {
  var badge = document.getElementById("dailyPredictionBadge");
  var preview = document.getElementById("dailyPredictionPreview");
  if (!badge) return;
  var state = ensureTodayPredictionState();
  var unread = !state.read;
  badge.classList.toggle("feature__badge--hidden", !unread);
  badge.setAttribute("aria-hidden", unread ? "false" : "true");
  if (preview && !unread) {
    preview.textContent = "Совет на сегодня уже открыт";
  }
}

var dailyPredictionTimerId = null;

function formatMsToHms(ms) {
  if (ms < 0) ms = 0;
  var totalSec = Math.floor(ms / 1000);
  var h = Math.floor(totalSec / 3600);
  var m = Math.floor((totalSec % 3600) / 60);
  var s = totalSec % 60;
  function pad(n) { return n < 10 ? "0" + n : String(n); }
  return pad(h) + ":" + pad(m) + ":" + pad(s);
}

function updateDailyPredictionTimer() {
  var el = document.getElementById("dailyPredictionTimer");
  if (!el) return;
  var now = new Date();
  var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
  var diff = tomorrow - now;
  el.textContent = "Следующее через " + formatMsToHms(diff);
}

function startDailyPredictionTimer() {
  updateDailyPredictionTimer();
  if (dailyPredictionTimerId) clearInterval(dailyPredictionTimerId);
  dailyPredictionTimerId = setInterval(updateDailyPredictionTimer, 1000);
}

function stopDailyPredictionTimer() {
  if (dailyPredictionTimerId) {
    clearInterval(dailyPredictionTimerId);
    dailyPredictionTimerId = null;
  }
}

function playClickSound() {
  if (typeof window.playPokerClickSound === "function" && window.playPokerClickSound !== playClickSound) {
    window.playPokerClickSound();
    return;
  }
  var audio = null;
  try {
    audio = playClickSound.__audio;
    if (!audio) {
      audio = playClickSound.__audio = new Audio("./assets/gta-sa-menu.mp3?v=2026070602");
      audio.preload = "auto";
      audio.volume = 0.78;
      try {
        audio.load();
      } catch (errLoad) {}
    }
  } catch (errAudio) {}
  if (!audio) return;
  try {
    audio.pause();
    audio.currentTime = 0;
    var p = audio.play();
    if (p && typeof p.catch === "function") p.catch(function () {});
  } catch (err) {}
}

function tryChillRadioPlay() {
  var mode = localStorage.getItem("chill_radio_mode") || "";
  if (mode !== "chill" && mode !== "lounge" && mode !== "90s" && mode !== "radio7") return;
  var radio = document.getElementById("chillRadio");
  if (!radio) return;
  var urls = { chill: "https://ice2.somafm.com/groovesalad-128-mp3", lounge: "https://ice5.somafm.com/illstreet-128-mp3", "90s": "https://nostalgiafm.hostingradio.ru:8014/nostalgiafm.mp3", radio7: "https://stream.rcast.net/263744" };
  if (urls[mode]) radio.src = urls[mode];
  var p = radio.play();
  if (p && typeof p.then === "function") p.catch(function () {});
}

(function initChillRadio() {
  var radio = document.getElementById("chillRadio");
  if (!radio) return;
  function tryPlay() {
    tryChillRadioPlay();
  }
  document.addEventListener("click", tryPlay, { once: true, passive: true });
  document.addEventListener("touchstart", tryPlay, { once: true, passive: true });
  tryChillRadioPlay();
})();

// Модалка «Предсказание на день»
function openDailyPredictionModal() {
  var modal = document.getElementById("dailyPredictionModal");
  if (!modal) return;
  try {
    if (typeof window.pokerRecordSectionViewOpen === "function") window.pokerRecordSectionViewOpen("daily-prediction");
  } catch (eTrack) {}
  var textEl = document.getElementById("dailyPredictionText");
  if (textEl) {
    textEl.textContent = getPokerDailyPredictionForToday();
  }
  markDailyPredictionRead();
  updateDailyPredictionBadge();
  modal.setAttribute("aria-hidden", "false");
  modal.classList.add("daily-prediction-modal--open");
   startDailyPredictionTimer();
  if (document.body) document.body.style.overflow = "hidden";
}

function closeDailyPredictionModal() {
  var modal = document.getElementById("dailyPredictionModal");
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
  modal.classList.remove("daily-prediction-modal--open");
  stopDailyPredictionTimer();
  if (document.body) document.body.style.overflow = "";
}

(function initDailyPredictionModal() {
  var btn = document.getElementById("dailyPredictionBtn");
  var modal = document.getElementById("dailyPredictionModal");
  if (!btn || !modal) return;
  if (modal.dataset.dailyPredictionBound === "1") return;
  modal.dataset.dailyPredictionBound = "1";
  var closeBtn = modal.querySelector(".daily-prediction-modal__close");
  var backdrop = modal.querySelector(".daily-prediction-modal__backdrop");
  var shareBtn = document.getElementById("dailyPredictionShareBtn");
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    openDailyPredictionModal();
  });
  if (closeBtn) closeBtn.addEventListener("click", function () { closeDailyPredictionModal(); });
  if (backdrop) backdrop.addEventListener("click", function () { closeDailyPredictionModal(); });
  if (shareBtn && !shareBtn._bound) {
    shareBtn._bound = true;
    shareBtn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var predictionTextEl = document.getElementById("dailyPredictionText");
      var prediction = predictionTextEl ? predictionTextEl.textContent.trim() : "";
      var link =
        typeof buildMiniAppStartLink === "function" ? buildMiniAppStartLink("daily_prediction") : "";
      var shortText = "Моё покерное предсказание на сегодня:";
      if (prediction) shortText += "\n\n" + prediction;
      shortText += "\n\nПосмотрите своё предсказание здесь.";
      var shareUrl =
        typeof pokerBuildTelegramShareUrlDialog === "function" ? pokerBuildTelegramShareUrlDialog(link, shortText) : "";
      pokerTryPwaWebShare({ text: shortText + "\n\n" + link, url: link }).then(function (pwaOk) {
        if (pwaOk) {
          if (typeof recordShareButtonClick === "function") recordShareButtonClick("daily_prediction");
          return;
        }
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.openTelegramLink) {
          tg.openTelegramLink(shareUrl);
        } else if (tg && tg.openLink) {
          tg.openLink(shareUrl);
        } else {
          window.open(shareUrl, "_blank");
        }
        if (typeof recordShareButtonClick === "function") recordShareButtonClick("daily_prediction");
      });
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeDailyPredictionModal();
  });
  // Обновляем бейдж при инициализации
  updateDailyPredictionBadge();
})();
window.pokerInitDailyPredictionModal = function () {
  var btn = document.getElementById("dailyPredictionBtn");
  var modal = document.getElementById("dailyPredictionModal");
  if (!btn || !modal || modal.dataset.dailyPredictionBound === "1") return;
  modal.dataset.dailyPredictionBound = "1";
  var closeBtn = modal.querySelector(".daily-prediction-modal__close");
  var backdrop = modal.querySelector(".daily-prediction-modal__backdrop");
  var shareBtn = document.getElementById("dailyPredictionShareBtn");
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    openDailyPredictionModal();
  });
  if (closeBtn) closeBtn.addEventListener("click", function () { closeDailyPredictionModal(); });
  if (backdrop) backdrop.addEventListener("click", function () { closeDailyPredictionModal(); });
  if (shareBtn && !shareBtn._bound) {
    shareBtn._bound = true;
    shareBtn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var predictionTextEl = document.getElementById("dailyPredictionText");
      var prediction = predictionTextEl ? predictionTextEl.textContent.trim() : "";
      var link =
        typeof buildMiniAppStartLink === "function" ? buildMiniAppStartLink("daily_prediction") : "";
      var shortText = "Моё покерное предсказание на сегодня:";
      if (prediction) shortText += "\n\n" + prediction;
      shortText += "\n\nПосмотрите своё предсказание здесь.";
      var shareUrl =
        typeof pokerBuildTelegramShareUrlDialog === "function" ? pokerBuildTelegramShareUrlDialog(link, shortText) : "";
      pokerTryPwaWebShare({ text: shortText + "\n\n" + link, url: link }).then(function (pwaOk) {
        if (pwaOk) return;
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.openTelegramLink && shareUrl) tg.openTelegramLink(shareUrl);
        else if (shareUrl) window.open(shareUrl, "_blank", "noopener");
      });
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeDailyPredictionModal();
  });
  updateDailyPredictionBadge();
};

(function initChatNavDropdown() {
  window.closeChatNavDropdown = function () {};
})();

// Подстраницы раздела «Скачать»
const downloadPages = document.querySelectorAll(".download-page[data-download-page]");
const downloadAppButtons = document.querySelectorAll("[data-download-app]");
const downloadBackButtons = document.querySelectorAll("[data-download-back]");

function setDownloadPage(pageName) {
  downloadPages.forEach(function (page) {
    if (page.dataset.downloadPage === pageName) {
      page.classList.add("download-page--active");
    } else {
      page.classList.remove("download-page--active");
    }
  });
  var dlCc = typeof pokerGetDownloadCardContentScrollEl === "function" ? pokerGetDownloadCardContentScrollEl() : null;
  if (dlCc) dlCc.scrollTop = 0;
}

downloadAppButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    var app = btn.dataset.downloadApp;
    if (app) setDownloadPage(app);
  });
});

downloadBackButtons.forEach(function (btn) {
  btn.addEventListener("click", function () { setDownloadPage("main"); });
});

// Мини-игра «Найди Пиханину» — колода буби (13) + колода пики (13) + джокер Пиханина = 27 карт
const BONUS_DIAMONDS = ["2♦", "3♦", "4♦", "5♦", "6♦", "7♦", "8♦", "9♦", "10♦", "J♦", "Q♦", "K♦", "A♦"];
const BONUS_SPADES = ["2♠", "3♠", "4♠", "5♠", "6♠", "7♠", "8♠", "9♠", "10♠", "J♠", "Q♠", "K♠", "A♠"];
const BONUS_PIHANINA = "Пиханина";
const BONUS_ALL_SUITS = BONUS_DIAMONDS.concat(BONUS_SPADES);
const BONUS_GAME_CARDS_COUNT = 27;
const BONUS_PROMO_CODES = ["ПИХ200-7К2М", "ПИХ200-Л9Н4", "ПИХ200-П1РС", "ПИХ200-Т8УФ", "ПИХ200-Х3ЦЧ"];
const BONUS_MAX_ATTEMPTS = 5;
const BONUS_STORAGE_VERSION = "v3";
let bonusGameContents = [];
var bonusPikhaninaInterval = null;

function bonusStorageKey(name) {
  return name + getDeviceId() + "_" + BONUS_STORAGE_VERSION;
}

function getDeviceId() {
  var key = "poker_device_id";
  var id = localStorage.getItem(key);
  if (!id) {
    id = "dev_" + Date.now() + "_" + Math.random().toString(36).slice(2, 14);
    localStorage.setItem(key, id);
  }
  return id;
}

function getBonusAttempts() {
  return parseInt(localStorage.getItem(bonusStorageKey("poker_bonus_attempts_")) || "0", 10);
}

function setBonusAttempts(n) {
  localStorage.setItem(bonusStorageKey("poker_bonus_attempts_"), String(n));
}

function getUsedPromoIndices() {
  try {
    var raw = localStorage.getItem(bonusStorageKey("poker_bonus_used_promos_"));
    if (raw) return JSON.parse(raw);
    return [];
  } catch (_) {
    return [];
  }
}

function markPromoUsed(index) {
  var used = getUsedPromoIndices();
  if (used.indexOf(index) === -1) used.push(index);
  localStorage.setItem(bonusStorageKey("poker_bonus_used_promos_"), JSON.stringify(used));
}

function resetBonusLimitForDevice() {
  localStorage.removeItem(bonusStorageKey("poker_bonus_attempts_"));
  localStorage.removeItem(bonusStorageKey("poker_bonus_used_promos_"));
}

function updateBonusStats() {
  const attemptsEl = document.getElementById("bonusGameAttemptsCount");
  if (attemptsEl) attemptsEl.textContent = String(Math.max(0, BONUS_MAX_ATTEMPTS - getBonusAttempts()));
}

var PIKHANINA_DEFAULT_MAX = 15;

function updatePikhaninaStats() {
  const countEl = document.getElementById("bonusGamePromoCount");
  const allDoneEl = document.getElementById("bonusGameAllCodesDone");
  if (!countEl) return;
  const base = getApiBase();
  if (!base) {
    countEl.textContent = String(PIKHANINA_DEFAULT_MAX);
    if (allDoneEl) allDoneEl.style.display = "none";
    return;
  }
  fetch(base + "/api/pikhanina", { method: "GET" })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      var remaining = (data && typeof data.remaining === "number") ? Math.min(data.remaining, PIKHANINA_DEFAULT_MAX) : PIKHANINA_DEFAULT_MAX;
      var s = String(remaining);
      if (countEl.textContent !== s) countEl.textContent = s;
      if (allDoneEl) {
        var show = remaining === 0 ? "block" : "none";
        if (allDoneEl.style.display !== show) allDoneEl.style.display = show;
      }
    })
    .catch(function () {
      var s = String(PIKHANINA_DEFAULT_MAX);
      if (countEl.textContent !== s) countEl.textContent = s;
      if (allDoneEl && allDoneEl.style.display !== "none") allDoneEl.style.display = "none";
    });
}

function notifyBonusWon(promoCode) {
  const base = getApiBase();
  if (!base) return;
  const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  const initData = tg && tg.initData ? tg.initData : "";
  if (!initData) return;
      fetch(base + "/api/pikhanina", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ initData: initData, promoCode: promoCode }),
  }).catch(function () {});
}

function getNextPromoCode() {
  const used = getUsedPromoIndices();
  const available = BONUS_PROMO_CODES.map(function (_, i) { return i; }).filter(function (i) { return used.indexOf(i) === -1; });
  if (available.length === 0) return null;
  const idx = available[Math.floor(Math.random() * available.length)];
  markPromoUsed(idx);
  return BONUS_PROMO_CODES[idx];
}

function getCardRank(str) {
  return str.replace("♦", "").replace("♠", "");
}

function buildCardFaceContent(value) {
  if (value === BONUS_PIHANINA) {
    return "<span class=\"bonus-card__face-text bonus-card__face--joker\">Пиханина</span>";
  }
  const rank = getCardRank(value);
  const isSpade = value.indexOf("♠") !== -1;
  const suit = isSpade ? "♠" : "♦";
  const suitClass = isSpade ? "bonus-card__suit bonus-card__suit--spade" : "bonus-card__suit";
  return "<span class=\"bonus-card__rank bonus-card__rank--tl\">" + rank + "</span>" +
         "<span class=\"bonus-card__rank bonus-card__rank--br\">" + rank + "</span>" +
         "<span class=\"" + suitClass + "\">" + suit + "</span>";
}

function initBonusGame() {
  const container = document.getElementById("bonusGameCards");
  const resultEl = document.getElementById("bonusGameResult");
  const retryBtn = document.getElementById("bonusGameRetry");
  const noAttemptsEl = document.getElementById("bonusGameNoAttempts");
  if (!container || !resultEl || !retryBtn) return;

  updateBonusStats();
  updatePikhaninaStats();
  const attempts = getBonusAttempts();
  if (attempts >= BONUS_MAX_ATTEMPTS) {
    container.innerHTML = "";
    container.style.display = "none";
    if (noAttemptsEl) noAttemptsEl.style.display = "block";
    retryBtn.style.display = "none";
    resultEl.textContent = "";
    return;
  }

  if (noAttemptsEl) noAttemptsEl.style.display = "none";
  container.style.display = "";

  const pihaninaIndex = Math.floor(Math.random() * BONUS_GAME_CARDS_COUNT);
  bonusGameContents = [];
  for (let i = 0; i < BONUS_GAME_CARDS_COUNT; i++) {
    bonusGameContents.push(i === pihaninaIndex ? BONUS_PIHANINA : BONUS_ALL_SUITS[i < pihaninaIndex ? i : i - 1]);
  }

  container.innerHTML = "";
  for (let i = 0; i < BONUS_GAME_CARDS_COUNT; i++) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "bonus-card";
    card.dataset.cardIndex = String(i);
    card.setAttribute("aria-label", "Карта " + (i + 1));
    card.innerHTML = "<span class=\"bonus-card__back\">Poker21</span><span class=\"bonus-card__face\" aria-hidden=\"true\"></span>";
    container.appendChild(card);
  }

  resultEl.textContent = "";
  resultEl.className = "bonus-game-result";
  retryBtn.style.display = "none";
}

document.getElementById("bonusGameCards")?.addEventListener("click", (e) => {
  const card = e.target.closest(".bonus-card");
  if (!card || card.classList.contains("bonus-card--revealed")) return;
  const resultEl = document.getElementById("bonusGameResult");
  const retryBtn = document.getElementById("bonusGameRetry");
  if (!resultEl || !retryBtn) return;

  const attempts = getBonusAttempts();
  if (attempts >= BONUS_MAX_ATTEMPTS) {
    resultEl.textContent = "Вы проиграли и не смогли поймать Пиханину, он ускользнул от вас и счастливый пошел пушить K6s.";
    resultEl.className = "bonus-game-result bonus-game-result--lose";
    return;
  }
  setBonusAttempts(attempts + 1);

  const cards = card.parentElement.querySelectorAll(".bonus-card");
  const clickedIndex = parseInt(card.dataset.cardIndex, 10);
  const isWin = bonusGameContents[clickedIndex] === BONUS_PIHANINA;

  cards.forEach((c, i) => {
    c.classList.add("bonus-card--revealed");
    c.disabled = true;
    const face = c.querySelector(".bonus-card__face");
    if (face) {
      face.innerHTML = buildCardFaceContent(bonusGameContents[i]);
    }
    if (bonusGameContents[i] === BONUS_PIHANINA) c.classList.add("bonus-card--win");
    else if (i === clickedIndex) c.classList.add("bonus-card--lose");
  });

  if (isWin) {
    const base = getApiBase();
    const onWinDone = function (remaining, promoCode) {
      updateBonusStats();
      let promoText;
      if (remaining === 0 || !promoCode) {
        promoText = "Их Пиханины уже выбили сегодня все бонусы, но вы можете сыграть просто так.";
      } else {
        promoText = "Поздравляем, вы поймали Пиханину! Ваш приз 200р. Промокод для получения — " + promoCode + ". Напишите его в чат игроков.";
      }
      resultEl.textContent = promoText;
      resultEl.classList.add("bonus-game-result--win");
      const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tg && tg.HapticFeedback) tg.HapticFeedback.notificationOccurred("success");
      if (promoCode) notifyBonusWon(promoCode);
      updatePikhaninaStats();
    };
    if (base) {
      fetch(base + "/api/pikhanina", { method: "GET" })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (data) {
          const remaining = (data && typeof data.remaining === "number") ? data.remaining : 0;
          const promoCode = remaining > 0 ? getNextPromoCode() : null;
          onWinDone(remaining, promoCode);
        })
        .catch(function () {
          const promoCode = getNextPromoCode();
          onWinDone(0, promoCode);
        });
    } else {
      const promoCode = getNextPromoCode();
      onWinDone(0, promoCode);
    }
  } else {
    const attemptsLeft = BONUS_MAX_ATTEMPTS - getBonusAttempts();
    resultEl.textContent = "Это не Пиханина. В следующий раз повезёт! Осталось попыток: " + attemptsLeft + ".";
    resultEl.classList.add("bonus-game-result--lose");
  }
  if (isWin) {
    retryBtn.style.display = "none";
    updateBonusStats();
  } else {
    const attemptsLeft = BONUS_MAX_ATTEMPTS - getBonusAttempts();
    updateBonusStats();
    if (attemptsLeft > 0) {
      retryBtn.style.display = "block";
    } else {
      retryBtn.style.display = "none";
      resultEl.textContent = "Вы проиграли и не смогли поймать Пиханину, он ускользнул от вас и счастливый пошел пушить K6s.";
    }
  }
  updateBonusStats();
});

document.getElementById("bonusGameRetry")?.addEventListener("click", function () {
  initBonusGame();
});

// Мини-игра «Слезы Кулера» — 27 карт (буби + пики + платок), найти платок = билет на турнир
const COOLER_HANDKERCHIEF = "Платок";
let coolerGameContents = [];

function buildCoolerCardFaceContent(value) {
  if (value === COOLER_HANDKERCHIEF) {
    return "<span class=\"bonus-card__face-text bonus-card__face--joker\">Платок</span>";
  }
  const rank = getCardRank(value);
  const isSpade = value.indexOf("♠") !== -1;
  const suit = isSpade ? "♠" : "♦";
  const suitClass = isSpade ? "bonus-card__suit bonus-card__suit--spade" : "bonus-card__suit";
  return "<span class=\"bonus-card__rank bonus-card__rank--tl\">" + rank + "</span>" +
         "<span class=\"bonus-card__rank bonus-card__rank--br\">" + rank + "</span>" +
         "<span class=\"" + suitClass + "\">" + suit + "</span>";
}

function initCoolerGame() {
  const container = document.getElementById("coolerGameCards");
  const resultEl = document.getElementById("coolerGameResult");
  const retryBtn = document.getElementById("coolerGameRetry");
  if (!container || !resultEl || !retryBtn) return;

  const handkerchiefIndex = Math.floor(Math.random() * BONUS_GAME_CARDS_COUNT);
  coolerGameContents = [];
  for (let i = 0; i < BONUS_GAME_CARDS_COUNT; i++) {
    coolerGameContents.push(i === handkerchiefIndex ? COOLER_HANDKERCHIEF : BONUS_ALL_SUITS[i < handkerchiefIndex ? i : i - 1]);
  }

  container.innerHTML = "";
  for (let i = 0; i < BONUS_GAME_CARDS_COUNT; i++) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "bonus-card";
    card.dataset.cardIndex = String(i);
    card.setAttribute("aria-label", "Карта " + (i + 1));
    card.innerHTML = "<span class=\"bonus-card__back\">Poker21</span><span class=\"bonus-card__face\" aria-hidden=\"true\"></span>";
    container.appendChild(card);
  }

  resultEl.textContent = "";
  resultEl.className = "bonus-game-result";
  retryBtn.style.display = "none";
}

document.getElementById("coolerGameCards")?.addEventListener("click", (e) => {
  const card = e.target.closest(".bonus-card");
  if (!card || card.classList.contains("bonus-card--revealed")) return;
  const resultEl = document.getElementById("coolerGameResult");
  const retryBtn = document.getElementById("coolerGameRetry");
  if (!resultEl || !retryBtn) return;

  const cards = card.parentElement.querySelectorAll(".bonus-card");
  const clickedIndex = parseInt(card.dataset.cardIndex, 10);
  const isWin = coolerGameContents[clickedIndex] === COOLER_HANDKERCHIEF;

  cards.forEach((c, i) => {
    c.classList.add("bonus-card--revealed");
    c.disabled = true;
    const face = c.querySelector(".bonus-card__face");
    if (face) {
      face.innerHTML = buildCoolerCardFaceContent(coolerGameContents[i]);
    }
    if (coolerGameContents[i] === COOLER_HANDKERCHIEF) c.classList.add("bonus-card--win");
    else if (i === clickedIndex) c.classList.add("bonus-card--lose");
  });

  if (isWin) {
    resultEl.textContent = "Спасибо! Кулер вытер слёзы и дал вам билет на турнир. Напишите в чат игроков.";
    resultEl.classList.add("bonus-game-result--win");
    retryBtn.style.display = "none";
    const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (tg && tg.HapticFeedback) tg.HapticFeedback.notificationOccurred("success");
  } else {
    resultEl.textContent = "Это не платок. Попробуйте ещё раз!";
    resultEl.classList.add("bonus-game-result--lose");
    retryBtn.style.display = "block";
  }
});

document.getElementById("coolerGameRetry")?.addEventListener("click", function () {
  initCoolerGame();
});

// Игра «Переедь Штукатура» — попытки безлимитные, считаем попытки до победы
var PLASTERER_RANKS = "2 3 4 5 6 7 8 9 T J Q K A".split(" ");
var PLASTERER_SUITS = ["\u2660", "\u2665", "\u2666", "\u2663"];
var plastererDeck = [];
var plastererOpponentHand = [];
var plastererPlayerHand = [];
var plastererBoardCards = [];
var plastererAttemptCount = 0;
var plastererBoardStep = 0;

function buildPlastererDeck() {
  var d = [];
  for (var s = 0; s < PLASTERER_SUITS.length; s++) {
    for (var r = 0; r < PLASTERER_RANKS.length; r++) {
      d.push(PLASTERER_RANKS[r] + PLASTERER_SUITS[s]);
    }
  }
  return d;
}

function shufflePlasterer(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
  }
  return arr;
}

function plastererCardRank(card) {
  var r = card.charAt(0);
  var i = PLASTERER_RANKS.indexOf(r);
  return i >= 0 ? i : 0;
}

function plastererCardSuit(card) {
  return card.length >= 2 ? card.charAt(1) : "";
}

function plastererEval5(cards) {
  var ranks = cards.map(plastererCardRank).sort(function (a, b) { return b - a; });
  var suits = cards.map(plastererCardSuit);
  var countByRank = {};
  var countBySuit = {};
  for (var i = 0; i < 5; i++) {
    countByRank[ranks[i]] = (countByRank[ranks[i]] || 0) + 1;
    countBySuit[suits[i]] = (countBySuit[suits[i]] || 0) + 1;
  }
  var flush = Object.keys(countBySuit).length === 1;
  var sorted = ranks.slice().sort(function (a, b) { return a - b; });
  var wheel = sorted[0] === 0 && sorted[1] === 1 && sorted[2] === 2 && sorted[3] === 3 && sorted[4] === 12;
  var straight = wheel || (sorted[4] - sorted[0] === 4 && sorted[1] - sorted[0] === 1 && sorted[2] - sorted[1] === 1 && sorted[3] - sorted[2] === 1 && sorted[4] - sorted[3] === 1);
  var quads = false, set = false, pairCount = 0, pairRank = -1, pairRank2 = -1, setRank = -1, quadRank = -1;
  for (var r = 12; r >= 0; r--) {
    var c = countByRank[r] || 0;
    if (c === 4) { quads = true; quadRank = r; }
    if (c === 3) { set = true; setRank = r; }
    if (c === 2) { pairCount++; if (pairRank < 0) pairRank = r; else if (pairRank2 < 0) pairRank2 = r; }
  }
  var kickers = ranks.filter(function (x) {
    if (quadRank >= 0 && x === quadRank) return false;
    if (setRank >= 0 && x === setRank) return false;
    if (pairRank >= 0 && x === pairRank) return false;
    if (pairRank2 >= 0 && x === pairRank2) return false;
    return true;
  }).slice(0, 5);
  var score = 0;
  if (flush && straight) score = 11000000000 + (wheel ? 0 : sorted[4]) * 1e7;
  else if (quads) score = 10000000000 + quadRank * 1e8 + (kickers[0] !== undefined ? kickers[0] : 0) * 1e6;
  else if (set && pairCount >= 1) score = 9000000000 + setRank * 1e8 + pairRank * 1e6;
  else if (flush) score = 8000000000 + ranks[0] * 1e7 + ranks[1] * 1e5 + ranks[2] * 1e3 + ranks[3] * 10 + ranks[4];
  else if (straight) score = 7000000000 + (wheel ? 0 : sorted[4]) * 1e7;
  else if (set) score = 6000000000 + setRank * 1e8 + (kickers[0] !== undefined ? kickers[0] : 0) * 1e6 + (kickers[1] !== undefined ? kickers[1] : 0) * 1e4;
  else if (pairCount === 2) score = 4000000000 + Math.max(pairRank, pairRank2) * 1e8 + Math.min(pairRank, pairRank2) * 1e6 + (kickers[0] !== undefined ? kickers[0] : 0) * 1e4;
  else if (pairCount === 1) score = 2000000000 + pairRank * 1e8 + (kickers[0] !== undefined ? kickers[0] : 0) * 1e6 + (kickers[1] !== undefined ? kickers[1] : 0) * 1e4 + (kickers[2] !== undefined ? kickers[2] : 0) * 1e2;
  else score = 1000000000 + ranks[0] * 1e7 + ranks[1] * 1e5 + ranks[2] * 1e3 + ranks[3] * 10 + ranks[4];
  return score;
}

function plastererBestHand(seven) {
  var best = 0;
  for (var i = 0; i < 7; i++) {
    for (var j = i + 1; j < 7; j++) {
      var five = seven.filter(function (_, idx) { return idx !== i && idx !== j; });
      var s = plastererEval5(five);
      if (s > best) best = s;
    }
  }
  return best;
}

var PLASTERER_RANK_NAMES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "валета", "дамы", "короля", "туза"];
var PLASTERER_RANK_NAMES_PLURAL = ["двоек", "троек", "четвёрок", "пятёрок", "шестёрок", "семёрок", "восьмёрок", "девяток", "десяток", "валетов", "дам", "королей", "тузов"];

function plastererGetHandName5(fiveCards) {
  if (!fiveCards || fiveCards.length !== 5) return "";
  var ranks = fiveCards.map(plastererCardRank).sort(function (a, b) { return b - a; });
  var suits = fiveCards.map(plastererCardSuit);
  var countByRank = {};
  var countBySuit = {};
  for (var i = 0; i < 5; i++) {
    countByRank[ranks[i]] = (countByRank[ranks[i]] || 0) + 1;
    countBySuit[suits[i]] = (countBySuit[suits[i]] || 0) + 1;
  }
  var flush = Object.keys(countBySuit).length === 1;
  var sorted = ranks.slice().sort(function (a, b) { return a - b; });
  var wheel = sorted[0] === 0 && sorted[1] === 1 && sorted[2] === 2 && sorted[3] === 3 && sorted[4] === 12;
  var straight = wheel || (sorted[4] - sorted[0] === 4 && sorted[1] - sorted[0] === 1 && sorted[2] - sorted[1] === 1 && sorted[3] - sorted[2] === 1 && sorted[4] - sorted[3] === 1);
  var quads = false, set = false, pairCount = 0, pairRank = -1, pairRank2 = -1, setRank = -1, quadRank = -1;
  for (var r = 12; r >= 0; r--) {
    var c = countByRank[r] || 0;
    if (c === 4) { quads = true; quadRank = r; }
    if (c === 3) { set = true; setRank = r; }
    if (c === 2) { pairCount++; if (pairRank < 0) pairRank = r; else if (pairRank2 < 0) pairRank2 = r; }
  }
  var rn = function (i) { return PLASTERER_RANK_NAMES[i] || ""; };
  var rnPlural = function (i) { return PLASTERER_RANK_NAMES_PLURAL[i] || rn(i); };
  if (flush && straight) return wheel ? "Стрит-флеш (колесо)" : "Стрит-флеш";
  if (quads) return "Каре " + rnPlural(quadRank);
  if (set && pairCount >= 1) return "Фулл-хаус (" + rnPlural(setRank) + " и " + rnPlural(pairRank) + ")";
  if (flush) return "Флеш";
  if (straight) return wheel ? "Стрит (колесо)" : "Стрит";
  if (set) return "Сет " + rnPlural(setRank);
  if (pairCount === 2) return "Две пары (" + rnPlural(Math.max(pairRank, pairRank2)) + " и " + rnPlural(Math.min(pairRank, pairRank2)) + ")";
  if (pairCount === 1) return "Пара " + rnPlural(pairRank);
  return "Старшая карта " + rn(ranks[0]);
}

function plastererPlayerBestHandName(knownBoardCount) {
  var cards = plastererPlayerHand.concat(plastererBoardCards.slice(0, knownBoardCount));
  if (cards.length < 5) return "";
  var bestScore = 0, bestFive = null;
  if (cards.length === 5) {
    bestFive = cards;
    bestScore = plastererEval5(cards);
  } else {
    if (cards.length === 6) {
      for (var i = 0; i < cards.length; i++) {
        var five = cards.filter(function (_, idx) { return idx !== i; });
        var s = plastererEval5(five);
        if (s > bestScore) { bestScore = s; bestFive = five; }
      }
    } else {
      for (var i = 0; i < cards.length; i++) {
        for (var j = i + 1; j < cards.length; j++) {
          var five = cards.filter(function (_, idx) { return idx !== i && idx !== j; });
          var s = plastererEval5(five);
          if (s > bestScore) { bestScore = s; bestFive = five; }
        }
      }
    }
  }
  return bestFive ? plastererGetHandName5(bestFive) : "";
}

function plastererOpponentBestHandName(knownBoardCount) {
  var cards = plastererOpponentHand.concat(plastererBoardCards.slice(0, knownBoardCount));
  if (cards.length < 5) return "";
  var bestScore = 0, bestFive = null;
  if (cards.length === 5) {
    bestFive = cards;
    bestScore = plastererEval5(cards);
  } else {
    if (cards.length === 6) {
      for (var i = 0; i < cards.length; i++) {
        var five = cards.filter(function (_, idx) { return idx !== i; });
        var s = plastererEval5(five);
        if (s > bestScore) { bestScore = s; bestFive = five; }
      }
    } else {
      for (var i = 0; i < cards.length; i++) {
        for (var j = i + 1; j < cards.length; j++) {
          var five = cards.filter(function (_, idx) { return idx !== i && idx !== j; });
          var s = plastererEval5(five);
          if (s > bestScore) { bestScore = s; bestFive = five; }
        }
      }
    }
  }
  return bestFive ? plastererGetHandName5(bestFive) : "";
}

var PLASTERER_RANK_DISPLAY = { "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "T": "10", "J": "J", "Q": "Q", "K": "K", "A": "A" };

function plastererSuitToKey(suitCh) {
  return suitCh === "\u2660" ? "s" : suitCh === "\u2665" ? "h" : suitCh === "\u2666" ? "d" : suitCh === "\u2663" ? "c" : "";
}

function renderPlastererCardBack() {
  return "<div class=\"equilator-card-slot plasterer-card\"><span class=\"equilator-card-slot__text\">—</span></div>";
}

function renderPlastererCard(card) {
  if (!card || card.length < 2) return "";
  var rankCh = card.charAt(0);
  var suitCh = card.charAt(1);
  var suitKey = plastererSuitToKey(suitCh);
  if (!suitKey) return "";
  var rank = rankCh;
  var label = (PLASTERER_RANK_DISPLAY[rank] || rank) + suitCh;
  var suitClass = suitKey === "s" ? "equilator-card-slot--spade" : suitKey === "h" ? "equilator-card-slot--heart" : suitKey === "d" ? "equilator-card-slot--diamond" : "equilator-card-slot--club";
  return "<div class=\"equilator-card-slot plasterer-card " + suitClass + "\" data-rank=\"" + rank.replace(/"/g, "&quot;") + "\" data-suit=\"" + suitKey + "\"><span class=\"equilator-card-slot__text\">" + label.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</span></div>";
}

function renderPlastererCards(containerId, cards, showBacks) {
  var el = document.getElementById(containerId);
  if (!el) return;
  if (showBacks && cards.length > 0) {
    el.innerHTML = Array(cards.length).fill(0).map(function () { return renderPlastererCardBack(); }).join("");
  } else {
    el.innerHTML = cards.map(function (c) { return renderPlastererCard(c); }).join("");
  }
}

function initPlastererGame() {
  var nameEl = document.getElementById("plastererPlayerName");
  if (nameEl) {
    var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    var user = tg && tg.initDataUnsafe && tg.initDataUnsafe.user;
    nameEl.textContent = user && user.first_name ? user.first_name : "Вы";
  }
  plastererAttemptCount = 0;
  dealPlastererHands();
  renderPlastererCards("plastererOpponentCards", plastererOpponentHand, true);
  renderPlastererCards("plastererPlayerCards", plastererPlayerHand, true);
  plastererBoardStep = 0;
  ["plastererFlop0", "plastererFlop1", "plastererFlop2", "plastererTurn", "plastererRiver"].forEach(function (id) {
    var slot = document.getElementById(id);
    if (slot) { slot.innerHTML = ""; slot.classList.remove("has-card"); }
  });
  var resultEl = document.getElementById("plastererResult");
  if (resultEl) { resultEl.textContent = ""; resultEl.className = "plasterer-result"; }
  var oppEq = document.getElementById("plastererOpponentEquity");
  var plEq = document.getElementById("plastererPlayerEquity");
  if (oppEq) oppEq.textContent = "";
  if (plEq) plEq.textContent = "";
  var handNameEl = document.getElementById("plastererPlayerHandName");
  if (handNameEl) handNameEl.textContent = "";
  var oppHandNameEl = document.getElementById("plastererOpponentHandName");
  if (oppHandNameEl) oppHandNameEl.textContent = "";
  var avatarImg = document.getElementById("plastererOpponentAvatarImg");
  if (avatarImg) avatarImg.src = "./assets/plasterer-smile.png";
  var dealBtn = document.getElementById("plastererDealBtn");
  var spinBtn = document.getElementById("plastererSpinBtn");
  var againBtn = document.getElementById("plastererPlayAgainBtn");
  if (dealBtn) dealBtn.style.display = "";
  if (spinBtn) spinBtn.style.display = "none";
  if (againBtn) againBtn.style.display = "none";
}

function dealPlastererHands() {
  var deck = buildPlastererDeck();
  var aces = deck.filter(function (c) { return c.charAt(0) === "A"; });
  shufflePlasterer(aces);
  plastererOpponentHand = aces.slice(0, 2);
  var rest = deck.filter(function (c) { return plastererOpponentHand.indexOf(c) < 0; });
  shufflePlasterer(rest);
  plastererPlayerHand = rest.slice(0, 2);
  plastererBoardCards = rest.slice(2, 7);
}

function plastererEquity(knownBoardCount) {
  knownBoardCount = knownBoardCount || 0;
  var known = plastererOpponentHand.concat(plastererPlayerHand);
  var boardKnown = plastererBoardCards.slice(0, knownBoardCount);
  for (var i = 0; i < boardKnown.length; i++) known.push(boardKnown[i]);
  var deck = buildPlastererDeck();
  var remaining = deck.filter(function (c) { return known.indexOf(c) < 0; });
  var need = 5 - knownBoardCount;
  var playerWins = 0, oppWins = 0, ties = 0;
  var trials = 1500;
  for (var t = 0; t < trials; t++) {
    shufflePlasterer(remaining);
    var board = boardKnown.concat(remaining.slice(0, need));
    var oppScore = plastererBestHand(plastererOpponentHand.concat(board));
    var plScore = plastererBestHand(plastererPlayerHand.concat(board));
    if (plScore > oppScore) playerWins++;
    else if (plScore < oppScore) oppWins++;
    else ties++;
  }
  return {
    player: (playerWins / trials) * 100,
    opponent: (oppWins / trials) * 100,
    tie: (ties / trials) * 100
  };
}

function formatEquityPct(value) {
  if (value >= 99.95) return "100%";
  if (value > 0 && value < 1) return value.toFixed(2) + "%";
  if (value === 0) return "0.0%";
  if (value >= 1 && value < 99) return Math.round(value) + "%";
  if (value >= 99) return value.toFixed(1) + "%";
  return value.toFixed(1) + "%";
}

function updatePlastererEquity(knownBoardCount) {
  var eq = plastererEquity(knownBoardCount);
  var oppEl = document.getElementById("plastererOpponentEquity");
  var plEl = document.getElementById("plastererPlayerEquity");
  if (oppEl) oppEl.textContent = "Шансы на победу: " + formatEquityPct(eq.opponent);
  if (plEl) plEl.textContent = "Шансы на победу: " + formatEquityPct(eq.player);
  var plHandEl = document.getElementById("plastererPlayerHandName");
  if (plHandEl) plHandEl.textContent = knownBoardCount === 0 ? "—" : plastererPlayerBestHandName(knownBoardCount);
  var oppHandEl = document.getElementById("plastererOpponentHandName");
  if (oppHandEl) oppHandEl.textContent = knownBoardCount === 0 ? "—" : plastererOpponentBestHandName(knownBoardCount);
}

function showPlastererBoard() {
  var ids = ["plastererFlop0", "plastererFlop1", "plastererFlop2", "plastererTurn", "plastererRiver"];
  ids.forEach(function (id, i) {
    var slot = document.getElementById(id);
    if (slot && plastererBoardCards[i]) {
      slot.innerHTML = renderPlastererCard(plastererBoardCards[i]);
      slot.classList.add("has-card");
    }
  });
}

function dealPlastererOnly() {
  plastererAttemptCount++;
  dealPlastererHands();
  renderPlastererCards("plastererOpponentCards", plastererOpponentHand, false);
  renderPlastererCards("plastererPlayerCards", plastererPlayerHand, false);
  ["plastererFlop0", "plastererFlop1", "plastererFlop2", "plastererTurn", "plastererRiver"].forEach(function (id) {
    var slot = document.getElementById(id);
    if (slot) { slot.innerHTML = ""; slot.classList.remove("has-card"); }
  });
  var resultEl = document.getElementById("plastererResult");
  if (resultEl) resultEl.textContent = "";
  plastererBoardStep = 0;
  var dealBtn = document.getElementById("plastererDealBtn");
  var spinBtn = document.getElementById("plastererSpinBtn");
  if (dealBtn) dealBtn.style.display = "none";
  if (spinBtn) {
    spinBtn.style.display = "";
    spinBtn.textContent = "Крути шарманку";
  }
  updatePlastererEquity(0);
}

function runPlastererBoardStep() {
  var spinBtn = document.getElementById("plastererSpinBtn");
  var resultEl = document.getElementById("plastererResult");

  if (plastererBoardStep === 0) {
    var ids = ["plastererFlop0", "plastererFlop1", "plastererFlop2"];
    ids.forEach(function (id, i) {
      var slot = document.getElementById(id);
      if (slot && plastererBoardCards[i]) {
        slot.innerHTML = renderPlastererCard(plastererBoardCards[i]);
        slot.classList.add("has-card");
      }
    });
    plastererBoardStep = 1;
    if (spinBtn) spinBtn.textContent = "Показать терн";
    updatePlastererEquity(3);
    return;
  }

  if (plastererBoardStep === 1) {
    var slot = document.getElementById("plastererTurn");
    if (slot && plastererBoardCards[3]) {
      slot.innerHTML = renderPlastererCard(plastererBoardCards[3]);
      slot.classList.add("has-card");
    }
    plastererBoardStep = 2;
    if (spinBtn) spinBtn.textContent = "Показать ривер";
    updatePlastererEquity(4);
    return;
  }

  if (plastererBoardStep === 2) {
    var riverSlot = document.getElementById("plastererRiver");
    if (riverSlot && plastererBoardCards[4]) {
      riverSlot.innerHTML = renderPlastererCard(plastererBoardCards[4]);
      riverSlot.classList.add("has-card");
    }
    renderPlastererCards("plastererOpponentCards", plastererOpponentHand, false);
    renderPlastererCards("plastererPlayerCards", plastererPlayerHand, false);
    updatePlastererEquity(5);
    var oppScore = plastererBestHand(plastererOpponentHand.concat(plastererBoardCards));
    var plScore = plastererBestHand(plastererPlayerHand.concat(plastererBoardCards));
    if (resultEl) {
      var avatarImg = document.getElementById("plastererOpponentAvatarImg");
      if (plScore > oppScore) {
        if (avatarImg) avatarImg.src = "./assets/plasterer-sad.png";
        var ord = plastererAttemptCount === 1 ? "1-й" : plastererAttemptCount + "-й";
        resultEl.textContent = "Вы выиграли Штукатура с " + ord + " попытки!";
        resultEl.className = "plasterer-result plasterer-result--win";
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.HapticFeedback) tg.HapticFeedback.notificationOccurred("success");
        var againBtn = document.getElementById("plastererPlayAgainBtn");
        if (spinBtn) spinBtn.style.display = "none";
        if (againBtn) againBtn.style.display = "";
      } else if (plScore < oppScore) {
        if (avatarImg) avatarImg.src = "./assets/plasterer-happy.png";
        resultEl.textContent = "Штукатур победил. В следующий раз повезёт!";
        resultEl.className = "plasterer-result plasterer-result--lose";
        if (spinBtn) spinBtn.style.display = "none";
        var dealBtn = document.getElementById("plastererDealBtn");
        if (dealBtn) dealBtn.style.display = "";
      } else {
        if (avatarImg) avatarImg.src = "./assets/plasterer-smile.png";
        resultEl.textContent = "Ничья!";
        resultEl.className = "plasterer-result";
        if (spinBtn) spinBtn.style.display = "none";
        var dealBtn = document.getElementById("plastererDealBtn");
        if (dealBtn) dealBtn.style.display = "";
      }
    }
  }
}

document.getElementById("plastererDealBtn")?.addEventListener("click", function () {
  dealPlastererOnly();
});

document.getElementById("plastererSpinBtn")?.addEventListener("click", function () {
  runPlastererBoardStep();
});

document.getElementById("plastererPlayAgainBtn")?.addEventListener("click", function () {
  initPlastererGame();
});

// Рендомайзер: из чисел 1..N выбрать K случайных
(function initRandomizer() {
  var maxInput = document.getElementById("randomizerMax");
  var countInput = document.getElementById("randomizerCount");
  var btn = document.getElementById("randomizerPickBtn");
  var resultEl = document.getElementById("randomizerResult");
  if (!btn || !maxInput || !countInput || !resultEl) return;
  btn.addEventListener("click", function () {
    var max = parseInt(maxInput.value, 10) || 0;
    var count = parseInt(countInput.value, 10) || 0;
    if (max < 1) { resultEl.textContent = "Введите число не меньше 1."; resultEl.className = "randomizer-result randomizer-result--error"; return; }
    if (count < 1) { resultEl.textContent = "Количество победителей не меньше 1."; resultEl.className = "randomizer-result randomizer-result--error"; return; }
    if (count > max) { resultEl.textContent = "Количество победителей не может быть больше " + max + "."; resultEl.className = "randomizer-result randomizer-result--error"; return; }
    var pool = [];
    for (var i = 1; i <= max; i++) pool.push(i);
    for (var j = pool.length - 1; j > 0; j--) {
      var r = Math.floor(Math.random() * (j + 1));
      var t = pool[j]; pool[j] = pool[r]; pool[r] = t;
    }
    var winners = pool.slice(0, count).sort(function (a, b) { return a - b; });
    resultEl.textContent = count === 1 ? "Победитель: " + winners[0] : "Победители: " + winners.join(", ");
    resultEl.className = "randomizer-result randomizer-result--ok";
  });
})();
