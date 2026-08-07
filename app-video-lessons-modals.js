// Видеоуроки: уникальная ссылка на раздел = мини‑апп с ?startapp=video_lessons
function initVideoLessonsHeroShare() {
  function videoLessonsSectionLink() {
    return typeof buildMiniAppStartLink === "function" ? buildMiniAppStartLink("video_lessons") : "";
  }
  var shareInviteText =
    "Привет! Видеокурс тренера клуба «Два туза»: 1 урок бесплатно, ещё 17 уроков — одним пакетом за 3 000 ₽:";
  var copyBtn = document.getElementById("videoLessonsCopyLinkBtn");
  if (copyBtn && copyBtn.getAttribute("data-share-bound") !== "1") {
    copyBtn.setAttribute("data-share-bound", "1");
    copyBtn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var link = videoLessonsSectionLink();
      if (!link) return;
      var msg = "Скопирована ссылка на раздел с видеоуроками. Отправьте её другу.";
      pokerCopyTextToClipboard(link).then(function (copied) {
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (copied) {
          if (tg && tg.showAlert) tg.showAlert(msg);
          else alert("Ссылка скопирована.");
        } else if (tg && tg.showAlert) {
          tg.showAlert("Ссылка: " + link);
        } else {
          alert("Ссылка: " + link);
        }
      });
    });
  }
  var inviteBtn = document.getElementById("videoLessonsInviteFriendBtn");
  if (inviteBtn && inviteBtn.getAttribute("data-share-bound") !== "1") {
    inviteBtn.setAttribute("data-share-bound", "1");
    inviteBtn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var link = videoLessonsSectionLink();
      if (!link) return;
      if (isTelegramWebApp() && typeof pokerOpenTelegramShareUrlOnly === "function" && pokerOpenTelegramShareUrlOnly(link)) {
        if (typeof recordShareButtonClick === "function") recordShareButtonClick("video_lessons_hero");
        return;
      }
      var inviteFull = shareInviteText + "\n" + link;
      var shareUrl =
        typeof pokerBuildTelegramShareUrlDialog === "function" ? pokerBuildTelegramShareUrlDialog(link, shareInviteText) : "";
      pokerTryPwaWebShare({ text: inviteFull, url: link }).then(function (pwaOk) {
        if (pwaOk) {
          if (typeof recordShareButtonClick === "function") recordShareButtonClick("video_lessons_hero");
          return;
        }
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.openTelegramLink) tg.openTelegramLink(shareUrl);
        else window.open(shareUrl, "_blank");
        if (typeof recordShareButtonClick === "function") recordShareButtonClick("video_lessons_hero");
      });
    });
  }
}

// Хаб «Научиться играть»: ?startapp=learn_play_hub (тот же t.me, что и остальные разделы)
(function initLearnPlayHubShare() {
  function learnPlayHubSectionLink() {
    return typeof buildMiniAppStartLink === "function" ? buildMiniAppStartLink("learn_play_hub") : "";
  }
  var shareInviteText = "Видеокурс «Научиться играть» в приложении клуба «Два туза»: 1 урок бесплатно, ещё 17 уроков за 3 000 ₽:";
  var copyBtn = document.getElementById("learnPlayHubCopyLinkBtn");
  if (copyBtn && copyBtn.getAttribute("data-share-bound") !== "1") {
    copyBtn.setAttribute("data-share-bound", "1");
    copyBtn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var link = learnPlayHubSectionLink();
      if (!link) return;
      var msg = "Скопирована ссылка на раздел «Научиться играть». Отправьте её другу.";
      pokerCopyTextToClipboard(link).then(function (copied) {
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (copied) {
          if (tg && tg.showAlert) tg.showAlert(msg);
          else alert("Ссылка скопирована.");
          if (typeof recordShareButtonClick === "function") recordShareButtonClick("learn_play_hub_copy");
        } else if (tg && tg.showAlert) {
          tg.showAlert("Ссылка: " + link);
        } else {
          alert("Ссылка: " + link);
        }
      });
    });
  }
  var inviteBtn = document.getElementById("learnPlayHubInviteFriendBtn");
  if (inviteBtn && inviteBtn.getAttribute("data-share-bound") !== "1") {
    inviteBtn.setAttribute("data-share-bound", "1");
    inviteBtn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var link = learnPlayHubSectionLink();
      if (!link) return;
      if (isTelegramWebApp() && typeof pokerOpenTelegramShareUrlOnly === "function" && pokerOpenTelegramShareUrlOnly(link)) {
        if (typeof recordShareButtonClick === "function") recordShareButtonClick("learn_play_hub_invite");
        return;
      }
      var inviteFull = shareInviteText + "\n" + link;
      var shareUrl =
        typeof pokerBuildTelegramShareUrlDialog === "function" ? pokerBuildTelegramShareUrlDialog(link, shareInviteText) : "";
      pokerTryPwaWebShare({ text: inviteFull, url: link }).then(function (pwaOk) {
        if (pwaOk) {
          if (typeof recordShareButtonClick === "function") recordShareButtonClick("learn_play_hub_invite");
          return;
        }
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.openTelegramLink) tg.openTelegramLink(shareUrl);
        else window.open(shareUrl, "_blank");
        if (typeof recordShareButtonClick === "function") recordShareButtonClick("learn_play_hub_invite");
      });
    });
  }
})();

/** Пока открыта модалка «О тренере» или «Отзывы» на видеоуроках — блокируем скролл ленты (.card__content). */
function syncVideoLessonsModalScrollLock() {
  var coach = document.getElementById("videoLessonsCoachModal");
  var rev = document.getElementById("videoLessonsReviewsModal");
  var anyOpen =
    (coach && coach.getAttribute("aria-hidden") === "false") ||
    (rev && rev.getAttribute("aria-hidden") === "false");
  var root = document.documentElement;
  if (anyOpen) {
    if (!root.classList.contains("vl-modal-scroll-lock")) {
      var panelOpen = typeof pokerGetPanelScrollCardContentEl === "function" ? pokerGetPanelScrollCardContentEl() : null;
      var y = 0;
      if (panelOpen) y = panelOpen.scrollTop || 0;
      else y = root.scrollTop || 0;
      if (y == null || isNaN(y)) y = 0;
      root.setAttribute("data-vl-scroll-lock-top", String(y));
      root.classList.add("vl-modal-scroll-lock");
    }
  } else if (root.classList.contains("vl-modal-scroll-lock")) {
    var saved = parseInt(root.getAttribute("data-vl-scroll-lock-top"), 10);
    if (isNaN(saved)) saved = 0;
    root.classList.remove("vl-modal-scroll-lock");
    root.removeAttribute("data-vl-scroll-lock-top");
    var panelRestore = typeof pokerGetPanelScrollCardContentEl === "function" ? pokerGetPanelScrollCardContentEl() : null;
    var raf = window.requestAnimationFrame || function (cb) {
      setTimeout(cb, 16);
    };
    raf(function () {
      if (panelRestore) panelRestore.scrollTop = saved;
      else root.scrollTop = saved;
      raf(function () {
        if (panelRestore) panelRestore.scrollTop = saved;
        else root.scrollTop = saved;
      });
    });
  }
}

function initVideoLessonsCoachModal() {
  var modal = document.getElementById("videoLessonsCoachModal");
  var btn = document.getElementById("videoLessonsCoachHintBtn");
  if (!modal || !btn || btn.getAttribute("data-coach-modal-bound") === "1") return;
  btn.setAttribute("data-coach-modal-bound", "1");
  var closeNodes = modal.querySelectorAll("[data-video-lessons-coach-close]");
  var lastFocus = null;
  function isOpen() {
    return modal.getAttribute("aria-hidden") === "false";
  }
  function openModal() {
    var revModal = document.getElementById("videoLessonsReviewsModal");
    var revBtn = document.getElementById("videoLessonsReviewsOpenBtn");
    if (revModal && revModal.getAttribute("aria-hidden") === "false") {
      revModal.setAttribute("aria-hidden", "true");
      if (revBtn) revBtn.setAttribute("aria-expanded", "false");
    }
    lastFocus = document.activeElement;
    modal.setAttribute("aria-hidden", "false");
    btn.setAttribute("aria-expanded", "true");
    syncVideoLessonsModalScrollLock();
    var closeBtn = modal.querySelector(".video-lessons__coach-modal-close");
    if (closeBtn && typeof closeBtn.focus === "function") {
      try {
        closeBtn.focus();
      } catch (eFocus) {}
    }
  }
  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    btn.setAttribute("aria-expanded", "false");
    syncVideoLessonsModalScrollLock();
    if (lastFocus && typeof lastFocus.focus === "function") {
      try {
        lastFocus.focus();
      } catch (e2) {}
    }
    lastFocus = null;
  }
  btn.addEventListener("click", function (ev) {
    ev.preventDefault();
    if (!isOpen()) openModal();
  });
  closeNodes.forEach(function (node) {
    node.addEventListener("click", function () {
      closeModal();
    });
  });
  document.addEventListener("keydown", function (ev) {
    if (ev.key !== "Escape") return;
    var revModal = document.getElementById("videoLessonsReviewsModal");
    if (revModal && revModal.getAttribute("aria-hidden") === "false") return;
    if (!isOpen()) return;
    ev.preventDefault();
    closeModal();
  });
  function coachModalSetStudentTab(studentId, activeBtn) {
    var tabs = modal.querySelectorAll("[data-vl-coach-student]");
    var panels = modal.querySelectorAll("[data-vl-coach-panel]");
    tabs.forEach(function (t) {
      var on = t.getAttribute("data-vl-coach-student") === studentId;
      t.classList.toggle("video-lessons__coach-student-tab--active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    panels.forEach(function (p) {
      var on = p.getAttribute("data-vl-coach-panel") === studentId;
      p.classList.toggle("video-lessons__coach-student-panel--active", on);
      p.hidden = !on;
    });
    if (activeBtn && typeof activeBtn.focus === "function") {
      try {
        activeBtn.focus();
      } catch (eTabFocus) {}
    }
  }
  modal.addEventListener(
    "mousedown",
    function (ev) {
      var tab = ev.target && ev.target.closest && ev.target.closest("[data-vl-coach-student]");
      if (!tab || !modal.contains(tab) || ev.button !== 0) return;
      ev.preventDefault();
    },
    true
  );
  modal.addEventListener("click", function (ev) {
    var tab = ev.target && ev.target.closest && ev.target.closest("[data-vl-coach-student]");
    if (!tab || !modal.contains(tab)) return;
    ev.preventDefault();
    var sid = tab.getAttribute("data-vl-coach-student");
    if (sid) coachModalSetStudentTab(sid, tab);
  });
}

function initVideoLessonsReviewsModal() {
  var modal = document.getElementById("videoLessonsReviewsModal");
  var btn = document.getElementById("videoLessonsReviewsOpenBtn");
  var coachModal = document.getElementById("videoLessonsCoachModal");
  var coachBtn = document.getElementById("videoLessonsCoachHintBtn");
  var form = document.getElementById("videoLessonsReviewForm");
  var textarea = document.getElementById("videoLessonsReviewText");
  var submitBtn = document.getElementById("videoLessonsReviewSubmitBtn");
  var statusEl = document.getElementById("videoLessonsReviewFormStatus");
  var feed = document.getElementById("videoLessonsReviewsFeed");
  var reviewsCopyHint = document.getElementById("videoLessonsReviewsCopyHint");
  if (!modal || !btn || btn.getAttribute("data-reviews-modal-bound") === "1") return;
  btn.setAttribute("data-reviews-modal-bound", "1");
  var closeNodes = modal.querySelectorAll("[data-video-lessons-reviews-close]");
  var lastFocus = null;
  var VL_REVIEWS_COACH_SLUG = "nikolay_fishkopcheny";
  var reviewsFeedIsAdmin = false;
  function isOpen() {
    return modal.getAttribute("aria-hidden") === "false";
  }
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function formatReviewDate(at) {
    try {
      var d = new Date(at);
      if (isNaN(d.getTime())) return "";
      return d.toLocaleString("ru-RU", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (eFmt) {
      return "";
    }
  }
  function renderReviews(items, canDeleteServer) {
    if (!feed) return;
    if (!items.length) {
      feed.innerHTML =
        '<p class="video-lessons__reviews-feed-empty">Пока нет отзывов — напишите первым.</p>';
      return;
    }
    var allowDel = !!canDeleteServer;
    feed.innerHTML = items
      .map(function (r) {
        var text = escapeHtml(r.text || "");
        var author = escapeHtml(r.author || "Ученик");
        var dateStr = formatReviewDate(r.at);
        var meta = dateStr
          ? '<time class="video-lessons__reviews-feed-time">' + escapeHtml(dateStr) + "</time>"
          : "";
        var rid = r.id != null ? String(r.id) : "";
        var showDel = allowDel && rid && rid.indexOf("l_") !== 0;
        var delBtn = showDel
          ? '<button type="button" class="video-lessons__reviews-feed-delete" data-vl-review-delete="' +
            escapeHtml(rid) +
            '" title="Удалить отзыв" aria-label="Удалить отзыв">Удалить</button>'
          : "";
        return (
          '<article class="video-lessons__reviews-feed-item" data-vl-review-id="' +
          escapeHtml(rid || "") +
          '"><header class="video-lessons__reviews-feed-item-head"><span class="video-lessons__reviews-feed-author">' +
          author +
          "</span>" +
          meta +
          delBtn +
          '</header><p class="video-lessons__reviews-feed-text">' +
          text +
          "</p></article>"
        );
      })
      .join("");
  }
  function refreshReviews() {
    if (feed) {
      feed.innerHTML = '<p class="video-lessons__reviews-feed-loading">Загрузка…</p>';
    }
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    if (!base) {
      reviewsFeedIsAdmin = false;
      if (feed) feed.innerHTML = '<p class="video-lessons__reviews-feed-empty">Не удалось загрузить отзывы.</p>';
      return;
    }
    var q =
      "?coach=" +
      encodeURIComponent(VL_REVIEWS_COACH_SLUG) +
      (typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("&") : "");
    fetch(base + "/api/video-lesson-reviews" + q)
      .then(function (r) {
        return r.json().then(function (data) {
          return { ok: r.ok, data: data };
        });
      })
      .then(function (res) {
        if (res.ok && res.data && res.data.ok && Array.isArray(res.data.reviews)) {
          reviewsFeedIsAdmin = !!res.data.isAdmin;
          if (reviewsFeedIsAdmin && typeof window.pokerMarkAdminAccess === "function") {
            window.pokerMarkAdminAccess("video-lesson-reviews");
          }
          renderReviews(res.data.reviews, reviewsFeedIsAdmin);
        } else {
          reviewsFeedIsAdmin = false;
          if (feed) feed.innerHTML = '<p class="video-lessons__reviews-feed-empty">Не удалось загрузить отзывы.</p>';
        }
      })
      .catch(function () {
        reviewsFeedIsAdmin = false;
        if (feed) feed.innerHTML = '<p class="video-lessons__reviews-feed-empty">Не удалось загрузить отзывы.</p>';
      });
  }
  if (feed && feed.getAttribute("data-vl-review-delete-bound") !== "1") {
    feed.setAttribute("data-vl-review-delete-bound", "1");
    feed.addEventListener("click", function (ev) {
      var delEl = ev.target && ev.target.closest && ev.target.closest("[data-vl-review-delete]");
      if (!delEl || !feed.contains(delEl)) return;
      ev.preventDefault();
      var rid = delEl.getAttribute("data-vl-review-delete");
      if (!rid) return;
      if (!confirm("Удалить этот отзыв? Действие необратимо.")) return;
      var baseDel = typeof getApiBase === "function" ? getApiBase() : "";
      if (!baseDel || typeof pokerApiAuthJsonBody !== "function") return;
      if (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential()) return;
      delEl.disabled = true;
      var payload = Object.assign(
        { action: "delete", reviewId: rid, coach: VL_REVIEWS_COACH_SLUG },
        pokerApiAuthJsonBody({})
      );
      fetch(baseDel + "/api/video-lesson-reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (r) {
          return r.json().then(function (data) {
            return { ok: r.ok, status: r.status, data: data };
          });
        })
        .then(function (res) {
          delEl.disabled = false;
          if (res.ok && res.data && res.data.ok) {
            refreshReviews();
            return;
          }
          var msg =
            res.data && res.data.error
              ? String(res.data.error)
              : res.status === 403
                ? "Нет прав"
                : "Не удалось удалить";
          var tgA = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tgA && tgA.showAlert) tgA.showAlert(msg);
          else alert(msg);
        })
        .catch(function () {
          delEl.disabled = false;
          var tgB = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tgB && tgB.showAlert) tgB.showAlert("Сеть недоступна");
          else alert("Сеть недоступна");
        });
    });
  }
  function closeCoachIfOpen() {
    if (!coachModal || coachModal.getAttribute("aria-hidden") !== "false") return;
    coachModal.setAttribute("aria-hidden", "true");
    if (coachBtn) coachBtn.setAttribute("aria-expanded", "false");
  }
  function openModal() {
    closeCoachIfOpen();
    lastFocus = document.activeElement;
    modal.setAttribute("aria-hidden", "false");
    btn.setAttribute("aria-expanded", "true");
    if (statusEl) statusEl.textContent = "";
    if (reviewsCopyHint) reviewsCopyHint.textContent = "";
    refreshReviews();
    syncVideoLessonsModalScrollLock();
    var closeBtn = modal.querySelector(".video-lessons__coach-modal-close");
    if (closeBtn && typeof closeBtn.focus === "function") {
      try {
        closeBtn.focus();
      } catch (eFocus) {}
    }
  }
  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    btn.setAttribute("aria-expanded", "false");
    syncVideoLessonsModalScrollLock();
    if (lastFocus && typeof lastFocus.focus === "function") {
      try {
        lastFocus.focus();
      } catch (e2) {}
    }
    lastFocus = null;
  }
  btn.addEventListener("click", function (ev) {
    ev.preventDefault();
    if (!isOpen()) openModal();
  });
  closeNodes.forEach(function (node) {
    node.addEventListener("click", function () {
      closeModal();
    });
  });
  document.addEventListener("keydown", function (ev) {
    if (ev.key !== "Escape") return;
    if (!isOpen()) return;
    ev.preventDefault();
    closeModal();
  });
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (statusEl) statusEl.textContent = "";
      var text = textarea && textarea.value ? textarea.value.trim() : "";
      if (!text) {
        if (statusEl) statusEl.textContent = "Введите текст отзыва.";
        return;
      }
      var tgW = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      var initData = tgW && tgW.initData ? tgW.initData : "";
      var base = typeof getApiBase === "function" ? getApiBase() : "";
      if (submitBtn) submitBtn.disabled = true;
      function doneSubmitting() {
        if (submitBtn) submitBtn.disabled = false;
      }
      if (initData && base) {
        fetch(base + "/api/video-lesson-reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: text,
            initData: initData,
            coach: VL_REVIEWS_COACH_SLUG,
          }),
        })
          .then(function (r) {
            return r.json().then(function (data) {
              return { ok: r.ok, status: r.status, data: data };
            });
          })
          .then(function (res) {
            doneSubmitting();
            if (res.ok && res.data && res.data.ok) {
              if (textarea) textarea.value = "";
              if (statusEl) statusEl.textContent = "Спасибо! Отзыв сохранён.";
              refreshReviews();
              return;
            }
            if (res.data && res.data.error) {
              if (statusEl) statusEl.textContent = String(res.data.error);
            }
            if (res.status === 401 || res.status === 400) {
              return;
            }
            if (statusEl) {
              statusEl.textContent =
                res.status === 503
                  ? "Сервер временно недоступен — отзыв не отправлен."
                  : "Не удалось отправить отзыв.";
            }
          })
          .catch(function () {
            doneSubmitting();
            if (statusEl) statusEl.textContent = "Сеть недоступна — отзыв не отправлен.";
          });
      } else {
        if (statusEl) {
          statusEl.textContent = initData
            ? "Сервер временно недоступен — отзыв не отправлен."
            : "Войдите в аккаунт, чтобы оставить отзыв.";
        }
        doneSubmitting();
      }
    });
  }
  var reviewsInviteBtn = document.getElementById("videoLessonsReviewsInviteBtn");
  var reviewsCopyBtn = document.getElementById("videoLessonsReviewsCopyLinkBtn");
  var coachReviewsShareText =
    "Отзывы учеников о тренере Николае FishKopcheny (клуб «Два туза»). Написать отзыв или почитать другие — в мини-приложении:";
  function coachReviewsDeepLink() {
    return typeof buildMiniAppStartLink === "function" ? buildMiniAppStartLink("vl_reviews_nikolay") : "";
  }
  var reviewsCopyHintTimer = null;
  function showReviewsCopyHint(text) {
    if (reviewsCopyHint) reviewsCopyHint.textContent = text || "";
    if (reviewsCopyHintTimer) clearTimeout(reviewsCopyHintTimer);
    if (text && reviewsCopyHint) {
      reviewsCopyHintTimer = setTimeout(function () {
        if (reviewsCopyHint) reviewsCopyHint.textContent = "";
        reviewsCopyHintTimer = null;
      }, 6000);
    }
  }
  if (reviewsCopyBtn && reviewsCopyBtn.getAttribute("data-share-bound") !== "1") {
    reviewsCopyBtn.setAttribute("data-share-bound", "1");
    reviewsCopyBtn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var linkCr = coachReviewsDeepLink();
      if (!linkCr) {
        showReviewsCopyHint("Не удалось сформировать ссылку.");
        return;
      }
      function afterCopyOk() {
        showReviewsCopyHint("Скопировано. Вставьте ссылку в любой чат: " + linkCr);
        if (typeof recordShareButtonClick === "function") recordShareButtonClick("video_lessons_coach_reviews_copy");
      }
      pokerCopyTextToClipboard(linkCr).then(function (copied) {
        if (copied) {
          afterCopyOk();
        } else {
          showReviewsCopyHint("Ссылка (скопируйте вручную): " + linkCr);
          var tgCr2 = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tgCr2 && tgCr2.showAlert) tgCr2.showAlert("Ссылка: " + linkCr);
          else alert("Ссылка: " + linkCr);
        }
      });
    });
  }
  if (reviewsInviteBtn && reviewsInviteBtn.getAttribute("data-share-bound") !== "1") {
    reviewsInviteBtn.setAttribute("data-share-bound", "1");
    reviewsInviteBtn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var linkInv = coachReviewsDeepLink();
      if (!linkInv) return;
      var reviewsFull = coachReviewsShareText + "\n" + linkInv;
      var shareUrlInv =
        typeof pokerBuildTelegramShareUrlDialog === "function"
          ? pokerBuildTelegramShareUrlDialog(linkInv, coachReviewsShareText)
          : "";
      pokerTryPwaWebShare({ text: reviewsFull, url: linkInv }).then(function (pwaOk) {
        if (pwaOk) {
          if (typeof recordShareButtonClick === "function") recordShareButtonClick("video_lessons_coach_reviews");
          return;
        }
        var tgInv = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tgInv && tgInv.openTelegramLink) tgInv.openTelegramLink(shareUrlInv);
        else window.open(shareUrlInv, "_blank");
        if (typeof recordShareButtonClick === "function") recordShareButtonClick("video_lessons_coach_reviews");
      });
    });
  }
}

window.pokerInitVideoLessonsModals = function () {
  initVideoLessonsHeroShare();
  initVideoLessonsCoachModal();
  initVideoLessonsReviewsModal();
};

window.pokerInitVideoLessonsModals();
