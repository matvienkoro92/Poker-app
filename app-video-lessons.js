/** Видео с Яндекс.Диска: прямая ссылка через /api/yandex-disk-play + нативный video (playsinline для iOS / Telegram). */
window.loadVideoLessonNative = function loadVideoLessonNative(videoEl, playerWrap) {
  var publicUrl = videoEl.getAttribute("data-disk-public");
  if (!publicUrl) return;
  var errP = playerWrap.querySelector(".video-lessons__video-error");
  function setErr(msg) {
    if (!errP) return;
    if (msg) {
      errP.textContent = msg;
      errP.removeAttribute("hidden");
    } else {
      errP.setAttribute("hidden", "");
      errP.textContent = "";
    }
  }
  setErr("");
  try {
    videoEl.pause();
    videoEl.removeAttribute("src");
    videoEl.load();
  } catch (err) {}

  var apiPath = "/api/yandex-disk-play?public_key=" + encodeURIComponent(publicUrl);

  function applyHref(href) {
    if (href) videoEl.src = href;
  }

  fetch(apiPath)
    .then(function (res) {
      return res.json().then(function (body) {
        return { ok: res.ok, body: body };
      });
    })
    .then(function (r) {
      if (!r.ok || !r.body || !r.body.ok || !r.body.href) {
        throw new Error((r.body && r.body.error) || "fail");
      }
      applyHref(r.body.href);
    })
    .catch(function () {
      setErr("");
    });

  videoEl.addEventListener(
    "error",
    function onVideoErr() {
      videoEl.removeEventListener("error", onVideoErr);
      fetch(apiPath)
        .then(function (res) {
          return res.json().then(function (body) {
            return { ok: res.ok, body: body };
          });
        })
        .then(function (r) {
          if (r.ok && r.body && r.body.ok && r.body.href) applyHref(r.body.href);
        })
        .catch(function () {});
    },
    { once: true }
  );
};

document.addEventListener("click", function (e) {
  var coachProfile = e.target && e.target.closest ? e.target.closest("[data-video-coach-profile]") : null;
  if (coachProfile) {
    e.preventDefault();
    var coachNick = coachProfile.getAttribute("data-video-coach-profile") || "FishKopcheny";
    if (typeof window.pokerOpenUnifiedPlayerProfileByRatingNick === "function") {
      window.pokerOpenUnifiedPlayerProfileByRatingNick(coachNick, { season: "summer" });
    } else if (typeof window.pokerOpenChatUserModalSafe === "function") {
      window.pokerOpenChatUserModalSafe("371998", coachNick, "./assets/club-news-personal/fishkopcheny-coach-card.png");
    }
    return;
  }
  var trainingBtn = e.target && e.target.closest ? e.target.closest(".learn-play-hub__training-btn, .video-lessons__training-link") : null;
  if (trainingBtn && trainingBtn.closest(".video-lessons--guest-lock")) {
    e.preventDefault();
    if (typeof window.__pokerOpenPwaLoginScreen === "function") window.__pokerOpenPwaLoginScreen();
    return;
  }
  if (trainingBtn) {
    var href = trainingBtn.getAttribute("href");
    if (href && href.indexOf("t.me") !== -1) {
      e.preventDefault();
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      if (tg && tg.openTelegramLink) tg.openTelegramLink(href);
      else if (tg && tg.openLink) tg.openLink(href);
      else window.open(href, "_blank", "noopener,noreferrer");
    }
    return;
  }
  var attachment = e.target && e.target.closest ? e.target.closest(".video-lessons__attachment") : null;
  if (attachment && attachment.closest(".video-lessons--guest-lock")) {
    e.preventDefault();
    if (typeof window.__pokerOpenPwaLoginScreen === "function") window.__pokerOpenPwaLoginScreen();
    return;
  }
  if (attachment) {
    var href = attachment.getAttribute("href");
    if (href) {
      e.preventDefault();
      var url = href.indexOf("http") === 0 ? href : (function () { try { return new URL(href, window.location.href).href; } catch (err) { return href; } })();
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      if (tg && tg.openLink) tg.openLink(url);
      else window.open(url, "_blank", "noopener,noreferrer");
    }
    return;
  }
  var openExt = e.target && e.target.closest ? e.target.closest(".video-lessons__open-external") : null;
  if (openExt && openExt.closest(".video-lessons--guest-lock")) {
    e.preventDefault();
    if (typeof window.__pokerOpenPwaLoginScreen === "function") window.__pokerOpenPwaLoginScreen();
    return;
  }
  if (openExt) {
    var extHref = openExt.getAttribute("href");
    if (extHref && extHref.indexOf("http") === 0) {
      e.preventDefault();
      var tgEx = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      if (tgEx && tgEx.openLink) tgEx.openLink(extHref);
      else window.open(extHref, "_blank", "noopener,noreferrer");
    }
    return;
  }
  var item = e.target && e.target.closest ? e.target.closest(".video-lessons__item") : null;
  if (!item) return;
  e.preventDefault();
  var card = item.closest(".video-lessons__card");
  var playerWrap = card ? card.querySelector(".video-lessons__player-wrap") : null;
  if (!card || !playerWrap) return;
  var isOpen = !playerWrap.classList.contains("video-lessons__player-wrap--hidden");
  document.querySelectorAll(".video-lessons__video").forEach(function (v) {
    try {
      v.pause();
      v.removeAttribute("src");
      v.load();
    } catch (err) {}
  });
  document.querySelectorAll(".video-lessons__player-wrap").forEach(function (w) {
    w.classList.add("video-lessons__player-wrap--hidden");
  });
  document.querySelectorAll(".video-lessons__item[aria-expanded]").forEach(function (btn) {
    btn.setAttribute("aria-expanded", "false");
  });
  document.querySelectorAll(".video-lessons__card--open").forEach(function (c) {
    c.classList.remove("video-lessons__card--open");
  });
  if (!isOpen) {
    playerWrap.classList.remove("video-lessons__player-wrap--hidden");
    item.setAttribute("aria-expanded", "true");
    card.classList.add("video-lessons__card--open");
    var url = item.getAttribute("data-video-url");
    var vlViewForLock = item.closest('[data-view="video-lessons"]');
    var guestLessonsLocked = vlViewForLock && vlViewForLock.classList.contains("video-lessons--guest-lock");
    if (url && url !== "#" && !guestLessonsLocked) {
      /* Сначала кадр с раскрытым блоком (стабильная высота под aspect-ratio), затем сеть/видео — меньше мерцания */
      requestAnimationFrame(function () {
        var nativeVideo = playerWrap.querySelector(".video-lessons__video[data-disk-public]");
        if (nativeVideo && typeof window.loadVideoLessonNative === "function") {
          window.loadVideoLessonNative(nativeVideo, playerWrap);
        } else {
          var iframe = playerWrap.querySelector(".video-lessons__iframe[data-video-src]");
          if (iframe && !iframe.src) iframe.src = iframe.getAttribute("data-video-src") || url;
        }
      });
    }
  }
});

/* WebKit/Telegram: фокус по клику на кнопку урока дёргает scrollIntoView — шапка уезжает вверх */
document.addEventListener(
  "mousedown",
  function (e) {
    var vlItem = e.target && e.target.closest && e.target.closest(".video-lessons__item");
    if (!vlItem || e.button !== 0) return;
    e.preventDefault();
  },
  true
);

function initVideoLessons() {
  var vlView = document.querySelector('[data-view="video-lessons"]');
  var guestLessonsLocked = typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode();
  if (vlView) vlView.classList.toggle("video-lessons--guest-lock", !!guestLessonsLocked);

  var intro = vlView && vlView.querySelector(".video-lessons__intro");
  var gate = document.getElementById("videoLessonsGuestGate");
  if (guestLessonsLocked && intro) {
    if (!gate) {
      gate = document.createElement("div");
      gate.id = "videoLessonsGuestGate";
      gate.className = "video-lessons__guest-gate";
      gate.innerHTML =
        '<p class="video-lessons__guest-gate-text">Чтобы посмотреть видео бесплатно, войдите в\u00a0аккаунт.</p>' +
        '<button type="button" class="profile-exit-btn" id="videoLessonsGuestLoginBtn" data-poker-login-action="1">Войти в аккаунт</button>';
      intro.parentNode.insertBefore(gate, intro.nextSibling);
    }
    gate.hidden = false;
    gate.classList.remove("video-lessons__guest-gate--hidden");
  } else if (gate) {
    gate.hidden = true;
    gate.classList.add("video-lessons__guest-gate--hidden");
  }

  var list = document.getElementById("videoLessonsList");
  if (list) {
    list.querySelectorAll(".video-lessons__card").forEach(function (card) {
      var item = card.querySelector(".video-lessons__item");
      var video = card.querySelector(".video-lessons__video");
      if (!item || !video) return;
      var duration = item.querySelector(".video-lessons__duration");
      if (!duration) {
        duration = document.createElement("span");
        duration.className = "video-lessons__duration";
        duration.textContent = "Время: загрузка…";
        item.insertBefore(duration, item.querySelector(".video-lessons__chevron"));
      }
      if (!video._pokerDurationBound) {
        video._pokerDurationBound = true;
        video.addEventListener("loadedmetadata", function () {
          if (!Number.isFinite(video.duration) || video.duration <= 0) return;
          var totalSeconds = Math.round(video.duration);
          var hours = Math.floor(totalSeconds / 3600);
          var minutes = Math.floor((totalSeconds % 3600) / 60);
          var seconds = totalSeconds % 60;
          duration.textContent = "Время: " + (hours ? hours + ":" + String(minutes).padStart(2, "0") : minutes) + ":" + String(seconds).padStart(2, "0");
        });
      }
    });
    if (guestLessonsLocked) {
      list.querySelectorAll(".video-lessons__video").forEach(function (v) {
        try {
          v.pause();
          v.removeAttribute("src");
          v.load();
        } catch (errV) {}
        var disk = v.getAttribute("data-disk-public");
        if (disk) {
          v.setAttribute("data-vl-saved-disk", disk);
          v.removeAttribute("data-disk-public");
        }
      });
      list.querySelectorAll(".video-lessons__iframe").forEach(function (f) {
        if (f.src) {
          f.setAttribute("data-vl-saved-iframe-src", f.src);
          f.removeAttribute("src");
        }
      });
      list.querySelectorAll("a.video-lessons__open-external, a.video-lessons__attachment, a.video-lessons__training-link").forEach(function (a) {
        var h = a.getAttribute("href");
        if (h && h !== "#") {
          a.setAttribute("data-vl-saved-href", h);
          a.setAttribute("href", "#");
        }
      });
      list.querySelectorAll(".video-lessons__player-wrap").forEach(function (w) {
        w.classList.add("video-lessons__player-wrap--hidden");
      });
      list.querySelectorAll(".video-lessons__item").forEach(function (btn) {
        btn.setAttribute("aria-expanded", "false");
      });
      list.querySelectorAll(".video-lessons__card--open").forEach(function (c) {
        c.classList.remove("video-lessons__card--open");
      });
    } else {
      list.querySelectorAll(".video-lessons__video").forEach(function (v) {
        var d = v.getAttribute("data-vl-saved-disk");
        if (d) {
          v.setAttribute("data-disk-public", d);
          v.removeAttribute("data-vl-saved-disk");
        }
      });
      list.querySelectorAll(".video-lessons__iframe").forEach(function (f) {
        var s = f.getAttribute("data-vl-saved-iframe-src");
        if (s) {
          f.src = s;
          f.removeAttribute("data-vl-saved-iframe-src");
        }
      });
      list.querySelectorAll("a[data-vl-saved-href]").forEach(function (a) {
        a.setAttribute("href", a.getAttribute("data-vl-saved-href"));
        a.removeAttribute("data-vl-saved-href");
      });
    }
  }

  /* Длинный экран: при входе показываем шапку с фото и заголовком, а не середину списка */
  function scrollTopNow() {
    try {
      if (typeof scrollMainDocumentToTop === "function") scrollMainDocumentToTop();
      else {
        if (typeof window.scrollTo === "function") {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        } else {
          window.scrollTo(0, 0);
        }
        var se = document.scrollingElement;
        if (se) se.scrollTop = 0;
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
      }
    } catch (err) {}
  }
  scrollTopNow();
  requestAnimationFrame(scrollTopNow);
  setTimeout(scrollTopNow, 0);
  /* Первый урок: после стабилизации скролла/вёрстки — иначе fetch+src и scrollTop конкурируют и экран «мерцает» */
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      if (guestLessonsLocked) return;
      try {
        var listL = document.getElementById("videoLessonsList");
        var firstCard = listL && listL.querySelector(".video-lessons__card");
        if (firstCard && firstCard.classList.contains("video-lessons__card--open")) {
          var pw = firstCard.querySelector(".video-lessons__player-wrap");
          if (pw && !pw.classList.contains("video-lessons__player-wrap--hidden")) {
            var nv = pw.querySelector(".video-lessons__video[data-disk-public]");
            if (nv && !nv.src && typeof window.loadVideoLessonNative === "function") {
              window.loadVideoLessonNative(nv, pw);
            }
          }
        }
      } catch (eFirstLesson) {}
    });
  });
}

/**
 * Спойлер «Платный курс МТТ»: фокус на <summary> в Telegram/WebKit прокручивает страницу вверх — возвращаем scroll.
 * (Тот же класс багов, что и hallFameSetScrollY в showHallOfFamePanel.)
 */
(function initVideoLessonsMttSpoilerScrollFix() {
  var SEL = ".video-lessons__mtt-spoiler";
  var pendingY = null;
  function getScrollY() {
    try {
      if (typeof getMainDocumentScrollY === "function") return getMainDocumentScrollY();
      var se = document.scrollingElement || document.documentElement;
      return (se && se.scrollTop) || document.documentElement.scrollTop || document.body.scrollTop || 0;
    } catch (e) {
      return 0;
    }
  }
  function setScrollY(y) {
    try {
      y = Math.max(0, y);
      if (typeof setMainDocumentScrollY === "function") setMainDocumentScrollY(y);
      else {
        if (typeof window.scrollTo === "function") window.scrollTo(0, y);
        var se = document.scrollingElement || document.documentElement;
        if (se) se.scrollTop = y;
        if (document.documentElement) document.documentElement.scrollTop = y;
        if (document.body) document.body.scrollTop = y;
      }
    } catch (e2) {}
  }
  document.addEventListener(
    "click",
    function (e) {
      var summary = e.target && e.target.closest ? e.target.closest(".video-lessons__mtt-summary") : null;
      if (!summary) return;
      var det = summary.closest(SEL);
      if (!det) return;
      if (det.open) {
        pendingY = null;
        return;
      }
      pendingY = getScrollY();
    },
    true
  );
  function bind(det) {
    if (!det || det._pokerMttSpoilerScrollFix) return;
    det._pokerMttSpoilerScrollFix = true;
    det.addEventListener("toggle", function () {
      if (!this.open || pendingY == null) return;
      var y = pendingY;
      pendingY = null;
      var raf = window.requestAnimationFrame || function (fn) {
        setTimeout(fn, 16);
      };
      raf(function () {
        setScrollY(y);
        raf(function () {
          setScrollY(y);
        });
      });
      setTimeout(function () {
        setScrollY(y);
      }, 0);
      setTimeout(function () {
        setScrollY(y);
      }, 64);
    });
  }
  bind(document.querySelector(SEL));
})();
