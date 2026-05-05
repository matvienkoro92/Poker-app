// Home tasks: partnership modal, MTT task game, and rating subscription buttons.

function pokerInitHomeTasks() {
  function initPartnershipModal() {
    var modal = document.getElementById("partnershipModal");
    var backdrop = document.getElementById("partnershipModalBackdrop");
    var closeBtn = document.getElementById("partnershipModalClose");
    var track = document.getElementById("partnershipModalTrack");
    var indicator = document.getElementById("partnershipPageIndicator");
    var openBtn = document.getElementById("partnershipOpenBtn");
    if (!modal || !track || !indicator || modal.dataset.partnershipBound === "1") return;
    modal.dataset.partnershipBound = "1";
    var partnershipAssets = [
      "partnership-2026-overview.jpg",
      "partnership-2026-step1.jpg",
      "partnership-2026-step2.jpg",
      "partnership-2026-step3.jpg",
      "partnership-2026-cost.jpg"
    ];
    var imgs = modal.querySelectorAll(".partnership-modal__img");
    for (var i = 0; i < imgs.length && i < partnershipAssets.length; i++) {
      imgs[i].src = getAssetUrl(partnershipAssets[i]);
    }
    var currentIndex = 0;
    var totalSheets = 5;
    function setSlide(index) {
      currentIndex = Math.max(0, Math.min(index, totalSheets - 1));
      track.style.transform = "translateX(-" + currentIndex * 20 + "%)";
      indicator.textContent = (currentIndex + 1) + " / " + totalSheets;
    }
    function openPartnership() {
      setSlide(0);
      modal.setAttribute("aria-hidden", "false");
    }
    function closePartnership() {
      modal.setAttribute("aria-hidden", "true");
    }
    if (openBtn) openBtn.addEventListener("click", function (e) { e.preventDefault(); openPartnership(); });
    if (closeBtn) closeBtn.addEventListener("click", closePartnership);
    if (backdrop) backdrop.addEventListener("click", closePartnership);
    modal.addEventListener("click", function (e) {
      var nextBtn = e.target && e.target.closest ? e.target.closest(".partnership-modal__next") : null;
      var prevBtn = e.target && e.target.closest ? e.target.closest(".partnership-modal__prev") : null;
      if (nextBtn) {
        e.preventDefault();
        if (currentIndex < totalSheets - 1) setSlide(currentIndex + 1);
      }
      if (prevBtn) {
        e.preventDefault();
        if (currentIndex > 0) setSlide(currentIndex - 1);
      }
      var link = e.target && e.target.closest ? e.target.closest("a.partnership-modal__link[href^=\"https://t.me/\"]") : null;
      if (link && link.href) {
        e.preventDefault();
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.openTelegramLink) {
          if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
          tg.openTelegramLink(link.href);
        } else window.open(link.href, "_blank");
      }
    });
  }
  window.pokerInitPartnershipModal = initPartnershipModal;
  initPartnershipModal();

  (function initPokerTasksMtt() {
    var startScreen = document.getElementById("pokerTasksStartScreen");
    var startBtn = document.getElementById("pokerTasksStartBtn");
    var leaderboardBody = document.getElementById("pokerTasksLeaderboardBody");
    if (!startScreen || !startBtn) return;
    startBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (typeof window.startMttChallenge === "function") {
        window.startMttChallenge();
      } else {
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.showAlert) tg.showAlert("Задачи ещё загружаются. Обновите страницу."); else alert("Задачи ещё загружаются. Обновите страницу.");
      }
    });
    function renderMttLeaderboard() {
      if (!leaderboardBody) return;
      var list = (typeof MTT_LEADERBOARD !== "undefined" && Array.isArray(MTT_LEADERBOARD)) ? MTT_LEADERBOARD : [];
      var levels = typeof MTT_LEVELS !== "undefined" ? MTT_LEVELS : [];
      leaderboardBody.innerHTML = list.map(function (r) {
        var lvl = r.level != null ? r.level : 1;
        var lvlName = levels[lvl - 1] ? levels[lvl - 1].name : "Ур." + lvl;
        return "<tr><td>" + (r.place || "") + "</td><td>" + (r.nick || "—") + "</td><td>" + lvlName + "</td><td>" + (r.points != null ? r.points : "—") + "</td></tr>";
      }).join("") || "<tr><td colspan=\"4\">Пока пусто</td></tr>";
    }
    renderMttLeaderboard();
    window.refreshMttStats = function () {
      var levelEl = document.getElementById("mttStatLevel");
      var pointsEl = document.getElementById("mttStatPoints");
      var dailyEl = document.getElementById("mttStatDaily");
      if (!levelEl || !pointsEl || !dailyEl) return;
      var data = { totalPoints: 0, dailyCompleted: 0, dailyDate: "" };
      try {
        var raw = localStorage.getItem("mtt_challenge_progress");
        if (raw) data = JSON.parse(raw);
      } catch (e) {}
      var today = new Date().toDateString();
      if (data.dailyDate !== today) {
        data.dailyCompleted = 0;
        data.dailyDate = today;
        try { localStorage.setItem("mtt_challenge_progress", JSON.stringify(data)); } catch (e) {}
      }
      var level = 1;
      var nextRequired = 100;
      if (typeof MTT_LEVELS !== "undefined" && MTT_LEVELS.length) {
        for (var i = MTT_LEVELS.length - 1; i >= 0; i--) {
          if (data.totalPoints >= MTT_LEVELS[i].requiredPoints) {
            level = MTT_LEVELS[i].level;
            nextRequired = i < MTT_LEVELS.length - 1 ? MTT_LEVELS[i + 1].requiredPoints : MTT_LEVELS[i].requiredPoints;
            break;
          }
        }
      }
      var levelName = "Новичок";
      if (typeof MTT_LEVELS !== "undefined") {
        for (var j = 0; j < MTT_LEVELS.length; j++) {
          if (MTT_LEVELS[j].level === level) { levelName = MTT_LEVELS[j].name; break; }
        }
      }
      levelEl.textContent = level + " — " + levelName;
      pointsEl.textContent = data.totalPoints + " / " + nextRequired;
      dailyEl.textContent = data.dailyCompleted + " / 5";
    };
  })();

  (function initMttChallenge() {
    var streakScreen = document.getElementById("pokerStreakScreen");
    var startScreen = document.getElementById("pokerTasksStartScreen");
    var resultScreen = document.getElementById("pokerStreakResultScreen");
    var view = document.querySelector('[data-view="poker-tasks"]');
    var timerEl = document.getElementById("pokerStreakTimer");
    var streakEl = document.getElementById("pokerStreakStreak");
    var levelEl = document.getElementById("pokerStreakLevel");
    var pointsEl = document.getElementById("pokerStreakPoints");
    var dailyEl = document.getElementById("pokerStreakDaily");
    var multiplierEl = document.getElementById("pokerStreakMultiplier");
    var progressEl = document.getElementById("pokerStreakProgress");
    var situationEl = document.getElementById("pokerStreakSituation");
    var cardsEl = document.getElementById("pokerStreakCards");
    var questionEl = document.getElementById("pokerStreakQuestion");
    var optionsEl = document.getElementById("pokerStreakOptions");
    var feedbackEl = document.getElementById("pokerStreakFeedback");
    var feedbackResultEl = document.getElementById("pokerStreakFeedbackResult");
    var feedbackScoreEl = document.getElementById("pokerStreakFeedbackScore");
    var feedbackExplanationEl = document.getElementById("pokerStreakFeedbackExplanation");
    var nextBtn = document.getElementById("pokerStreakNextBtn");
    var backBtn = document.getElementById("pokerStreakBackBtn");
    var playAgainBtn = document.getElementById("pokerStreakPlayAgainBtn");
    var resultStatsEl = document.getElementById("pokerStreakResultStats");
    if (!streakScreen || !timerEl || !optionsEl) return;
    var tasks = [];
    var taskIndex = 0;
    var sessionScore = 0;
    var streak = 0;
    var correctCount = 0;
    var timerId = null;
    var timeElapsed = 0;
    var answered = false;
    var SPEED_BONUS_REF = 30;
    var DAILY_LIMIT = 5;
    var SUIT_SYMBOLS = { s: "\u2660", h: "\u2665", d: "\u2666", c: "\u2663" };
    var RANK_DISPLAY = { T: "10", J: "J", Q: "Q", K: "K", A: "A" };
    function esc(s) {
      if (s == null) return "";
      return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    function parseCard(cardStr) {
      if (!cardStr || cardStr.length < 1) return { rank: cardStr, suit: "", red: false };
      var r = cardStr.charAt(0);
      var s = cardStr.length >= 2 ? cardStr.charAt(1) : "";
      var red = s === "h" || s === "d";
      var rank = RANK_DISPLAY[r] || r;
      var suit = SUIT_SYMBOLS[s] || s;
      return { rank: rank, suit: suit, red: red };
    }
    function renderCard(cardStr) {
      var c = parseCard(String(cardStr));
      var cls = "poker-streak-card";
      if (c.red) cls += " poker-streak-card--red";
      return "<span class=\"" + cls + "\">" + esc(c.rank) + (c.suit ? "<span class=\"poker-streak-card__suit\">" + c.suit + "</span>" : "") + "</span>";
    }
    function shuffle(arr) {
      var a = arr.slice();
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }
    function clearTimer() {
      if (timerId) { clearInterval(timerId); timerId = null; }
    }
    function getMttProgress() {
      var data = { totalPoints: 0, dailyCompleted: 0, dailyDate: "" };
      try {
        var raw = localStorage.getItem("mtt_challenge_progress");
        if (raw) data = JSON.parse(raw);
      } catch (e) {}
      var today = new Date().toDateString();
      if (data.dailyDate !== today) {
        data.dailyCompleted = 0;
        data.dailyDate = today;
      }
      return data;
    }
    function saveMttProgress(data) {
      try { localStorage.setItem("mtt_challenge_progress", JSON.stringify(data)); } catch (e) {}
    }
    function getLevelForPoints(points) {
      var lvl = 1;
      var nextReq = 100;
      if (typeof MTT_LEVELS !== "undefined" && MTT_LEVELS.length) {
        for (var i = MTT_LEVELS.length - 1; i >= 0; i--) {
          if (points >= MTT_LEVELS[i].requiredPoints) {
            lvl = MTT_LEVELS[i].level;
            nextReq = i < MTT_LEVELS.length - 1 ? MTT_LEVELS[i + 1].requiredPoints : MTT_LEVELS[i].requiredPoints;
            break;
          }
        }
      }
      return { level: lvl, nextRequired: nextReq };
    }
    function getLevelName(level) {
      if (typeof MTT_LEVELS !== "undefined") {
        for (var j = 0; j < MTT_LEVELS.length; j++) {
          if (MTT_LEVELS[j].level === level) return MTT_LEVELS[j].name;
        }
      }
      return "Новичок";
    }
    function calculateMttScore(isCorrect, timeTaken, streakBefore, taskLevel, playerLevel) {
      taskLevel = Math.max(1, taskLevel || 1);
      playerLevel = Math.max(1, playerLevel || 1);
      if (!isCorrect) {
        var penalty = -20 * Math.pow(1.03, playerLevel - 1);
        return Math.round(penalty);
      }
      var basePoints = 50 * Math.pow(1.05, taskLevel - 1);
      var speedBonus = basePoints * 0.5 * Math.max(0, 1 - timeTaken / SPEED_BONUS_REF);
      var streakBonus = Math.min(streakBefore * 0.1 * basePoints, basePoints);
      var diff = taskLevel - playerLevel;
      var difficultyMultiplier = diff <= -5 ? 0.5 : diff <= -2 ? 0.75 : diff <= 2 ? 1.0 : diff <= 5 ? 1.25 : 1.5;
      return Math.round((basePoints + speedBonus + streakBonus) * difficultyMultiplier);
    }
    function updateHeader() {
      var prog = getMttProgress();
      var lvlInfo = getLevelForPoints(prog.totalPoints);
      if (levelEl) levelEl.textContent = "Ур. " + lvlInfo.level + " — " + getLevelName(lvlInfo.level);
      if (pointsEl) pointsEl.textContent = prog.totalPoints + "/" + lvlInfo.nextRequired;
      if (dailyEl) dailyEl.textContent = "Задачи: " + prog.dailyCompleted + "/5";
      if (streakEl) streakEl.textContent = "Стрик: " + streak;
      if (multiplierEl) multiplierEl.textContent = "\u00D7" + (1 + streak * 0.1).toFixed(1);
    }
    function showTask() {
      if (taskIndex >= tasks.length) {
        endGame();
        return;
      }
      answered = false;
      clearTimer();
      var task = tasks[taskIndex];
      timeElapsed = 0;
      if (situationEl) situationEl.textContent = task.situation || "";
      if (questionEl) questionEl.textContent = task.question || "";
      if (progressEl) progressEl.textContent = "Задача " + (taskIndex + 1) + " из " + tasks.length;
      if (cardsEl) {
        var cardsHtml = "<div class=\"poker-streak-cards__player\">Ваши карты: ";
        if (task.player_cards && task.player_cards.length) {
          for (var i = 0; i < task.player_cards.length; i++) {
            cardsHtml += renderCard(task.player_cards[i]);
          }
        } else {
          cardsHtml += "—";
        }
        cardsHtml += "</div>";
        if (task.board_cards && task.board_cards.length) {
          cardsHtml += "<div class=\"poker-streak-cards__board\">Стол: ";
          for (var j = 0; j < task.board_cards.length; j++) {
            cardsHtml += renderCard(task.board_cards[j]);
          }
          cardsHtml += "</div>";
        }
        cardsEl.innerHTML = cardsHtml;
      }
      if (optionsEl) {
        optionsEl.innerHTML = "";
        optionsEl.classList.remove("poker-streak-options--disabled");
        if (task.options && task.options.length) {
          for (var k = 0; k < task.options.length; k++) {
            var opt = task.options[k];
            var btn = document.createElement("button");
            btn.type = "button";
            btn.className = "poker-streak-option";
            btn.textContent = opt.text || "";
            btn.dataset.answerId = opt.id || "";
            btn.dataset.correct = (opt.id === task.correct_answer) ? "1" : "0";
            optionsEl.appendChild(btn);
          }
        }
      }
      if (feedbackEl) feedbackEl.classList.add("poker-streak-feedback--hidden");
      if (timerEl) timerEl.textContent = "0.0";
      var startTime = Date.now();
      timerId = setInterval(function () {
        timeElapsed = (Date.now() - startTime) / 1000;
        if (timerEl) timerEl.textContent = timeElapsed.toFixed(1);
      }, 100);
    }
    function handleAnswer(answerId, isCorrect) {
      if (answered) return;
      answered = true;
      clearTimer();
      if (optionsEl) optionsEl.classList.add("poker-streak-options--disabled");
      var task = tasks[taskIndex];
      var timeTaken = timeElapsed;
      var streakBefore = streak;
      var progCur = getMttProgress();
      var lvlCur = getLevelForPoints(progCur.totalPoints);
      var pts = calculateMttScore(isCorrect, timeTaken, streakBefore, task.level || 1, lvlCur.level);
      if (isCorrect) {
        streak++;
        correctCount++;
        sessionScore += pts;
      } else {
        streak = 0;
      }
      var prog = getMttProgress();
      prog.totalPoints = Math.max(0, prog.totalPoints + pts);
      prog.dailyCompleted++;
      saveMttProgress(prog);
      updateHeader();
      if (feedbackEl) {
        feedbackEl.classList.remove("poker-streak-feedback--hidden");
        if (feedbackResultEl) {
          feedbackResultEl.textContent = isCorrect ? "Правильно!" : "Неправильно";
          feedbackResultEl.className = "poker-streak-feedback__result " + (isCorrect ? "poker-streak-feedback__result--correct" : "poker-streak-feedback__result--wrong");
        }
        if (feedbackScoreEl) feedbackScoreEl.textContent = isCorrect ? "+" + pts + " баллов" : pts + " баллов";
        if (feedbackExplanationEl) feedbackExplanationEl.textContent = task.explanation || "";
      }
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tg && tg.HapticFeedback) tg.HapticFeedback.notificationOccurred(isCorrect ? "success" : "error");
    }
    function nextTask() {
      taskIndex++;
      showTask();
    }
    function endGame() {
      if (streakScreen) streakScreen.classList.add("poker-streak-screen--hidden");
      if (resultScreen) {
        resultScreen.classList.remove("poker-streak-result-screen--hidden");
        resultScreen.style.display = "";
        var prog = getMttProgress();
        var lvlInfo = getLevelForPoints(prog.totalPoints);
        if (resultStatsEl) {
          resultStatsEl.innerHTML = "<p><strong>Баллов за сессию:</strong> " + sessionScore + "</p><p><strong>Правильно:</strong> " + correctCount + " / " + tasks.length + "</p><p><strong>Всего баллов:</strong> " + prog.totalPoints + "</p><p><strong>Уровень:</strong> " + lvlInfo.level + " — " + getLevelName(lvlInfo.level) + "</p>";
        }
      }
      if (typeof window.refreshMttStats === "function") window.refreshMttStats();
    }
    function bindOptions() {
      if (!optionsEl) return;
      optionsEl.addEventListener("click", function (e) {
        var btn = e.target && e.target.closest ? e.target.closest(".poker-streak-option") : null;
        if (!btn || answered) return;
        var correct = btn.dataset.correct === "1";
        handleAnswer(btn.dataset.answerId, correct);
      });
    }
    window.startMttChallenge = function () {
      if (typeof MTT_TASKS === "undefined" || !MTT_TASKS.length) {
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.showAlert) tg.showAlert("Задачи не загружены."); else alert("Задачи не загружены.");
        return;
      }
      var prog = getMttProgress();
      if (prog.dailyCompleted >= DAILY_LIMIT) {
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.showAlert) tg.showAlert("Сегодня вы уже выполнили 5 задач. Завтра лимит обновится."); else alert("Сегодня вы уже выполнили 5 задач. Завтра лимит обновится.");
        return;
      }
      var lvlInfo = getLevelForPoints(prog.totalPoints);
      var filtered = MTT_TASKS.filter(function (t) { return t.level <= lvlInfo.level + 1; });
      if (!filtered.length) filtered = MTT_TASKS;
      var toTake = Math.min(DAILY_LIMIT - prog.dailyCompleted, 5, filtered.length);
      tasks = shuffle(filtered).slice(0, toTake);
      taskIndex = 0;
      sessionScore = 0;
      streak = 0;
      correctCount = 0;
      if (startScreen) startScreen.style.display = "none";
      if (resultScreen) { resultScreen.classList.add("poker-streak-result-screen--hidden"); resultScreen.style.display = "none"; }
      streakScreen.classList.remove("poker-streak-screen--hidden");
      streakScreen.style.display = "flex";
      if (view) view.classList.add("poker-tasks--task-visible");
      updateHeader();
      showTask();
    };
    if (nextBtn) nextBtn.addEventListener("click", function (e) { e.preventDefault(); nextTask(); });
    if (backBtn) {
      backBtn.addEventListener("click", function (e) {
        e.preventDefault();
        clearTimer();
        streakScreen.classList.add("poker-streak-screen--hidden");
        if (startScreen) startScreen.style.display = "";
        if (view) view.classList.remove("poker-tasks--task-visible");
        if (typeof window.refreshMttStats === "function") window.refreshMttStats();
      });
    }
    if (playAgainBtn && resultScreen) {
      playAgainBtn.addEventListener("click", function (e) {
        e.preventDefault();
        resultScreen.classList.add("poker-streak-result-screen--hidden");
        resultScreen.style.display = "none";
        window.startMttChallenge();
      });
    }
    bindOptions();
  })();

  (function initRatingSubscribe() {
    var ratingSubscribeBtns = Array.prototype.slice.call(document.querySelectorAll(".rating-subscribe-btn"));
    var RATING_SUBSCRIBED_KEY = "poker_rating_subscribed";
    var ratingInDevHtml = "";
    function setRatingSubscribeButtonState(subscribed) {
      if (!ratingSubscribeBtns.length) return;
      ratingSubscribeBtns.forEach(function (btn) {
        var league = btn.getAttribute("data-spring-league") || "";
        var label;
        if (league === "1") {
          label = subscribed ? "Отписаться от Лиги 1" : "Подписаться на Лигу 1";
        } else if (league === "2") {
          label = subscribed ? "Отписаться от Лиги 2" : "Подписаться на Лигу 2";
        } else {
          label = subscribed ? "Отписаться" : "Подписаться";
        }
        btn.disabled = false;
        btn.innerHTML = "<span>" + label + "</span>" + ratingInDevHtml;
        btn.dataset.subscribed = subscribed ? "1" : "0";
      });
    }
    function updateRatingSubscribeFromStorage() {
      try {
        setRatingSubscribeButtonState(localStorage.getItem(RATING_SUBSCRIBED_KEY) === "1");
      } catch (e) {
        setRatingSubscribeButtonState(false);
      }
    }
    updateRatingSubscribeFromStorage();
    if (ratingSubscribeBtns.length) {
      ratingSubscribeBtns.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          if (window.__touchWasScroll && window.__touchWasScroll()) return;
          if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
            var tgCred = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
            var msgCred =
              "Войдите в приложение (Telegram в мини‑аппе или через кнопку входа на сайте), чтобы подписаться.";
            if (tgCred && tgCred.showAlert) tgCred.showAlert(msgCred);
            else alert(msgCred);
            return;
          }
          var subscribed = btn.dataset.subscribed === "1";
          var payload =
            typeof pokerApiAuthJsonBody === "function"
              ? pokerApiAuthJsonBody({ unsubscribe: subscribed })
              : {
                  initData: (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initData) || "",
                  unsubscribe: subscribed,
                };
          if (!payload.initData && !payload.pwaSession && !payload.pwaVkSession) {
            var tgEmpty = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
            if (tgEmpty && tgEmpty.showAlert) tgEmpty.showAlert("Не удалось определить аккаунт. Обновите страницу или войдите снова.");
            else alert("Не удалось определить аккаунт. Обновите страницу или войдите снова.");
            return;
          }
          var appEl = document.getElementById("app");
          var base = (appEl && appEl.getAttribute("data-api-base")) || (typeof location !== "undefined" && location.origin) || "";
          var apiUrl = (base ? base.replace(/\/$/, "") : "") + "/api/rating-subscribe";
          ratingSubscribeBtns.forEach(function (b) {
            b.disabled = true;
            b.innerHTML = "<span>Подписываем…</span>" + ratingInDevHtml;
          });
          fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
            .then(function (r) { return r.json().catch(function () { return { ok: false, error: "Ошибка ответа сервера" }; }); })
            .then(function (data) {
              if (data && data.ok) {
                try {
                  localStorage.setItem(RATING_SUBSCRIBED_KEY, data.subscribed ? "1" : "0");
                } catch (e) {}
                setRatingSubscribeButtonState(!!data.subscribed);
                var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
                if (tg && tg.showAlert) {
                  tg.showAlert(data.subscribed ? "Подписка оформлена. Уведомления об обновлении рейтинга будут приходить в Telegram." : "Вы отписаны от уведомлений рейтинга.");
                } else {
                  alert(data.subscribed ? "Подписка оформлена." : "Вы отписаны.");
                }
              } else {
                var msg = (data && data.error) || "Ошибка. Попробуйте позже.";
                var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
                if (tg && tg.showAlert) tg.showAlert(msg); else alert(msg);
                setRatingSubscribeButtonState(subscribed);
              }
            })
            .catch(function () {
              var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
              if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR); else alert(POKER_NET_ERR);
              setRatingSubscribeButtonState(subscribed);
            })
            .finally(function () {
              ratingSubscribeBtns.forEach(function (b) { b.disabled = false; });
            });
        });
      });
    }
  })();
}
