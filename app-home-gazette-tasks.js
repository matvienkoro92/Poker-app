// Home gazette/tasks initialization: gazette modal, Roman planner, partnership and task widgets.

function runGazetteAndTasksInit() {
(function initGazetteModal() {
  var GAZETTE_READ_KEY = "poker_gazette_read";
  var modal = document.getElementById("gazetteModal");
  var pickEl = document.getElementById("gazetteModalPick");
  var newsEl = document.getElementById("gazetteModalNews");
  var gazetteAdminRow = document.getElementById("gazetteAdminRow");
  var gazetteNotifySubsBtn = document.getElementById("gazetteNotifySubsBtn");
  var gazetteNotifySubsHint = document.getElementById("gazetteNotifySubsHint");
  var openBtn = document.getElementById("gazetteOpenBtn");
  var closeBtn = document.getElementById("gazetteModalClose");
  var backdrop = document.getElementById("gazetteModalBackdrop");
  var unreadDot = document.getElementById("gazetteUnreadDot");

  if (modal && pickEl && newsEl) {
  function getGazetteVersion() {
    var articles = document.querySelectorAll("[data-gazette-article]");
    var max = 0;
    for (var i = 0; i < articles.length; i++) {
      if (articles[i].getAttribute("data-gazette-draft") === "1") continue;
      var n = parseInt(articles[i].getAttribute("data-gazette-article"), 10);
      if (!isNaN(n) && n > max) max = n;
    }
    return max > 0 ? String(max) : "0";
  }
  function hasUnreadGazette() {
    try {
      var current = getGazetteVersion();
      var read = localStorage.getItem(GAZETTE_READ_KEY) || "0";
      return read !== current;
    } catch (e) {
      return false;
    }
  }
  function updateGazetteUnreadDot() {
    if (!unreadDot) return;
    unreadDot.classList.toggle("welcome-gazette-icon__unread--visible", hasUnreadGazette());
  }
  function markGazetteRead() {
    try {
      localStorage.setItem(GAZETTE_READ_KEY, getGazetteVersion());
    } catch (e) {}
    updateGazetteUnreadDot();
  }
  updateGazetteUnreadDot();
  var paperEl = modal && modal.querySelector(".gazette-modal__paper");
  // Админская рассылка по подписчикам газеты
  window.updateGazetteSubsCount = function () {
    if (!gazetteNotifySubsBtn) return;
    var base = getApiBase && getApiBase();
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
    var q = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
    fetch(base + "/api/gazette-manual-subscribers?stats=1" + q.replace("?", "&"))
      .then(function (r) {
        if (!r.ok) return Promise.reject(new Error("http " + r.status));
        return r.json();
      })
      .then(function (data) {
        if (!data || !data.ok || typeof data.total !== "number") return;
        var total = data.total;
        var baseText = "Разослать подписчикам газеты";
        var current = gazetteNotifySubsBtn.textContent || baseText;
        var idx = current.indexOf(" (");
        if (idx !== -1) current = current.slice(0, idx);
        gazetteNotifySubsBtn.textContent = current + " (" + total + ")";
      })
      .catch(function () {});
  };
  function showGazetteView(view) {
    pickEl.hidden = view !== "pick";
    newsEl.hidden = view !== "news";
    if (view === "pick" && newsEl) newsEl.removeAttribute("data-reveal-draft");
    if (paperEl) paperEl.scrollTop = 0;
  }

  (function initGazetteAdminNotify() {
    if (!gazetteNotifySubsBtn) return;
    gazetteNotifySubsBtn.addEventListener("click", function () {
      var base = getApiBase && getApiBase();
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
        if (tg && tg.showAlert) tg.showAlert("Войдите в приложение (Telegram или PWA).");
        return;
      }
      var btn = gazetteNotifySubsBtn;
      var originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Рассылаем…";
      if (gazetteNotifySubsHint) gazetteNotifySubsHint.textContent = "";
      var payload = typeof pokerGuestOrAuthedPostBody === "function" ? pokerGuestOrAuthedPostBody({}) : {};
      if (newsEl) {
        var firstArticle = newsEl.querySelector(
          ".gazette-modal__lead[data-gazette-article]:not([data-gazette-draft='1'])"
        );
        var headlineEl = firstArticle && firstArticle.querySelector(".gazette-modal__headline");
        if (headlineEl) {
          var headlineText = headlineEl.textContent.trim();
          if (headlineText) payload.headline = headlineText;
        }
        if (firstArticle) {
          var articleIdx = firstArticle.getAttribute("data-gazette-article");
          if (articleIdx) payload.articleIndex = parseInt(articleIdx, 10);
        }
      }
      fetch(base + "/api/gazette-manual-subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (r) {
          return r
            .json()
            .catch(function () {
              return { ok: false, error: "Ошибка ответа сервера" };
            });
        })
        .then(function (data) {
          if (data && data.ok) {
            var sent =
              data && typeof data.sent === "number" && data.sent >= 0 ? data.sent : 0;
            var total =
              data && typeof data.total === "number" && data.total >= 0
                ? data.total
                : 0;
            if (gazetteNotifySubsHint) {
              var chatLine =
                data && data.chatPosted === true
                  ? " Также опубликовано в общем чате клуба."
                  : data && data.chatPosted === false
                    ? " Запись в общий чат не создана (ошибка Redis)."
                    : "";
              gazetteNotifySubsHint.textContent =
                "Личные сообщения отправлены: " +
                sent +
                " из " +
                total +
                " подписчиков газеты." +
                chatLine;
            }
          } else if (gazetteNotifySubsHint) {
            gazetteNotifySubsHint.textContent =
              "Ошибка рассылки: " +
              (data && data.error ? data.error : "не удалось отправить");
          }
        })
        .catch(function () {
          if (gazetteNotifySubsHint) gazetteNotifySubsHint.textContent = POKER_NET_ERR;
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = originalText;
        });
    });
  })();
  function openGazette(goToNews, articleIndex) {
    try {
      if (typeof window.pokerRecordSectionViewOpen === "function") window.pokerRecordSectionViewOpen("gazette");
    } catch (eTrack) {}
    if (goToNews === "news") {
      if (newsEl) {
        newsEl.removeAttribute("data-reveal-draft");
        if (typeof articleIndex === "number" && articleIndex >= 0) {
          var draftCheck = newsEl.querySelector(
            '.gazette-modal__lead[data-gazette-article="' + articleIndex + '"]'
          );
          if (draftCheck && draftCheck.getAttribute("data-gazette-draft") === "1") {
            newsEl.setAttribute("data-reveal-draft", String(articleIndex));
          }
        }
      }
      showGazetteView("news");
      if (typeof articleIndex === "number" && articleIndex >= 0 && newsEl) {
        var article = newsEl.querySelector('.gazette-modal__lead[data-gazette-article="' + articleIndex + '"]');
        if (article) {
          setTimeout(function () {
            article.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      }
    } else {
    showGazetteView("pick");
    }
    modal.setAttribute("aria-hidden", "false");
    markGazetteRead();
  }
  window.openGazette = openGazette;
  function closeGazette() {
    modal.setAttribute("aria-hidden", "true");
    showGazetteView("pick");
    try {
      document.documentElement.classList.remove("gazette-comment-keyboard");
    } catch (eGk) {}
    try {
      if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") {
        window.__pokerFinalizeChatKeyboardDismiss();
      }
    } catch (eKb) {}
  }
  modal.addEventListener("click", function (e) {
    var card = e.target && e.target.closest ? e.target.closest(".gazette-modal__page-card") : null;
    if (card && card.dataset.gazettePage === "news") {
      e.preventDefault();
      if (newsEl) newsEl.removeAttribute("data-reveal-draft");
      showGazetteView("news");
      return;
    }
    if (e.target && e.target.id === "gazetteModalBackToHome") {
      e.preventDefault();
      closeGazette();
      return;
    }
    if (e.target && e.target.id === "gazetteModalBackNews" || (e.target.closest && e.target.closest(".gazette-modal__back"))) {
      e.preventDefault();
      showGazetteView("pick");
    }
  });
  function bindGazetteOpenTrigger(trigger) {
    if (!trigger || trigger.dataset.gazetteOpenBound === "1") return;
    trigger.dataset.gazetteOpenBound = "1";
    trigger.addEventListener("click", function (e) {
      if (e && e.preventDefault) e.preventDefault();
      openGazette();
    });
  }
  bindGazetteOpenTrigger(openBtn);
  var gazetteOpenTriggers = document.querySelectorAll("[data-gazette-open]");
  for (var gOpenIdx = 0; gOpenIdx < gazetteOpenTriggers.length; gOpenIdx++) {
    bindGazetteOpenTrigger(gazetteOpenTriggers[gOpenIdx]);
  }
  if (closeBtn) closeBtn.addEventListener("click", closeGazette);
  if (backdrop) backdrop.addEventListener("click", closeGazette);

  modal.addEventListener("click", function (e) {
    var ratingLink = e.target && e.target.closest ? e.target.closest("a[data-close-gazette][data-view-target]") : null;
    if (ratingLink) {
      e.preventDefault();
      e.stopPropagation();
      closeGazette();
      var view = ratingLink.getAttribute("data-view-target");
      if (view && typeof setView === "function") setView(view);
      if (ratingLink.getAttribute("data-hall-shame") === "1" && typeof showHallOfFamePanel === "function") {
        setTimeout(function () {
          showHallOfFamePanel("shame");
        }, 520);
      }
      return;
    }
    var articleLink = e.target && e.target.closest ? e.target.closest("a[data-gazette-article-link]") : null;
    if (articleLink) {
      e.preventDefault();
      var idxStr = articleLink.getAttribute("data-gazette-article-link");
      if (newsEl) {
        newsEl.removeAttribute("data-reveal-draft");
        if (idxStr) {
          var draftTgt = newsEl.querySelector('.gazette-modal__lead[data-gazette-article="' + idxStr + '"]');
          if (draftTgt && draftTgt.getAttribute("data-gazette-draft") === "1") {
            newsEl.setAttribute("data-reveal-draft", idxStr);
          }
        }
      }
      showGazetteView("news");
      if (idxStr && newsEl) {
        var target = newsEl.querySelector('.gazette-modal__lead[data-gazette-article="' + idxStr + '"]');
        if (target) {
          setTimeout(function () {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      }
      return;
    }
    var shareBtn = e.target && e.target.closest ? e.target.closest(".gazette-modal__share-btn") : null;
    if (shareBtn && shareBtn.dataset.gazetteShare !== undefined) {
      e.preventDefault();
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var idx = shareBtn.dataset.gazetteShare;
      var link =
        idx !== undefined && idx !== ""
          ? buildMiniAppStartLink("news_" + idx)
          : buildMiniAppStartLink("news");
      var isTelegramShare = shareBtn.classList && shareBtn.classList.contains("gazette-modal__share-telegram");
      if (isTelegramShare) {
        if (isTelegramWebApp() && typeof pokerOpenTelegramShareUrlOnly === "function" && pokerOpenTelegramShareUrlOnly(link)) {
          if (typeof recordShareButtonClick === "function") recordShareButtonClick("gazette_article");
          return;
        }
        var article = shareBtn.closest && shareBtn.closest("article");
        var headlineEl = article && article.querySelector(".gazette-modal__headline");
        var headline = headlineEl ? headlineEl.textContent.trim() : "";
        var shareText = headline.length > 0 ? headline : "Новая новость в газете «Вестник Два туза»";
        var shareUrl = typeof pokerBuildTelegramShareUrlDialog === "function" ? pokerBuildTelegramShareUrlDialog(link, shareText) : "";
        pokerTryPwaWebShare({ text: shareText + "\n" + link, url: link }).then(function (pwaOk) {
          if (pwaOk) {
            if (typeof recordShareButtonClick === "function") recordShareButtonClick("gazette_article");
            return;
          }
          var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tg && tg.openTelegramLink) tg.openTelegramLink(shareUrl);
          else if (tg && tg.openLink) tg.openLink(shareUrl);
          else window.open(shareUrl, "_blank");
          if (typeof recordShareButtonClick === "function") recordShareButtonClick("gazette_article");
        });
      } else {
        pokerCopyTextToClipboard(link).then(function (copied) {
          var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (copied) {
            if (tg && tg.showAlert) tg.showAlert("Ссылка скопирована. Отправьте её другу — по ней откроется эта новость."); else alert("Ссылка скопирована.");
          } else if (tg && tg.showAlert) {
            tg.showAlert("Ссылка: " + link);
          } else {
            alert("Ссылка: " + link);
          }
        });
      }
    }
  });

  var subscribeBtn = document.getElementById("gazetteSubscribeBtn");
  var subscribeBtnNews = document.getElementById("gazetteSubscribeBtnNews");
  var subscribeWrap = modal && modal.querySelector(".gazette-modal__subscribe-wrap");
  var GAZETTE_SUBSCRIBED_KEY = "poker_gazette_subscribed";
  var inDevHtml = "";
  function setSubscribeButtonState(subscribed) {
    var textPick = subscribed ? "Отписаться от газеты" : "Подписаться на газету";
    var textArticle = subscribed ? "Отписаться" : "Подписаться на газету";
    if (subscribeBtn) {
      subscribeBtn.disabled = false;
      subscribeBtn.innerHTML = textPick + inDevHtml;
      subscribeBtn.dataset.subscribed = subscribed ? "1" : "0";
    }
    if (subscribeBtnNews) {
      subscribeBtnNews.disabled = false;
      subscribeBtnNews.innerHTML = textPick + inDevHtml;
      subscribeBtnNews.dataset.subscribed = subscribed ? "1" : "0";
    }
    var articleBtns = modal && modal.querySelectorAll(".gazette-modal__subscribe-in-article-btn");
    if (articleBtns) {
      for (var i = 0; i < articleBtns.length; i++) {
        var btn = articleBtns[i];
        btn.disabled = false;
        btn.textContent = textArticle;
        btn.dataset.subscribed = subscribed ? "1" : "0";
      }
    }
  }
  function updateSubscribeButtonFromStorage() {
    try {
      setSubscribeButtonState(localStorage.getItem(GAZETTE_SUBSCRIBED_KEY) === "1");
    } catch (e) {
      setSubscribeButtonState(false);
    }
  }
  updateSubscribeButtonFromStorage();
  if (subscribeBtn || subscribeBtnNews) {
    var gazetteSubscribeHandledInTouchend = false;
    function runGazetteSubscribe() {
      if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
        var tgNeed = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        var msgNeed =
          "Войдите в приложение (Telegram в мини‑аппе или через кнопку входа на сайте), чтобы подписаться на газету.";
        if (tgNeed && tgNeed.showAlert) tgNeed.showAlert(msgNeed);
        else alert(msgNeed);
        return;
      }
      var activeBtn = subscribeBtn || subscribeBtnNews;
      var articleBtn = modal && modal.querySelector(".gazette-modal__subscribe-in-article-btn");
      var anyBtn = activeBtn || articleBtn;
      var subscribed = (anyBtn && anyBtn.dataset.subscribed === "1") || false;
      var appEl = document.getElementById("app");
      var base = (appEl && appEl.getAttribute("data-api-base")) || (typeof location !== "undefined" && location.origin) || "";
      var apiUrl = (base ? base.replace(/\/$/, "") : "") + "/api/gazette-subscribe";
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
      if (subscribeBtn) {
        subscribeBtn.disabled = true;
        subscribeBtn.textContent = "Подписываем…";
      }
      if (subscribeBtnNews) {
        subscribeBtnNews.disabled = true;
        subscribeBtnNews.textContent = "Подписываем…";
      }
      var allArticleBtns = modal && modal.querySelectorAll(".gazette-modal__subscribe-in-article-btn");
      if (allArticleBtns) {
        for (var j = 0; j < allArticleBtns.length; j++) {
          allArticleBtns[j].disabled = true;
          allArticleBtns[j].textContent = "Подписываем…";
        }
      }
      fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (r) {
          return r.json().catch(function () { return { ok: false, error: "Ошибка ответа сервера" }; });
        })
        .then(function (data) {
          if (data && data.ok) {
            try {
              localStorage.setItem(GAZETTE_SUBSCRIBED_KEY, data.subscribed ? "1" : "0");
            } catch (e) {}
            setSubscribeButtonState(!!data.subscribed);
            if (data.subscribed && typeof window.playPokerSubscribeSound === "function") window.playPokerSubscribeSound();
            var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
            if (tg && tg.showAlert) {
              tg.showAlert(data.subscribed ? "Подписка оформлена. Пуши о новых новостях будут приходить в Telegram." : "Вы отписаны от уведомлений газеты.");
            } else {
              alert(data.subscribed ? "Подписка оформлена." : "Вы отписаны.");
            }
          } else {
            var msg = (data && data.error) || "Ошибка. Попробуйте позже.";
            var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
            if (tg && tg.showAlert) tg.showAlert(msg); else alert(msg);
            setSubscribeButtonState(subscribed);
          }
        })
        .catch(function () {
          var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR); else alert(POKER_NET_ERR);
          setSubscribeButtonState(subscribed);
        });
    }
    function bindSubscribeClick(btn) {
      if (!btn) return;
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (gazetteSubscribeHandledInTouchend) {
          gazetteSubscribeHandledInTouchend = false;
          return;
        }
        if (window.__touchWasScroll && window.__touchWasScroll()) return;
        runGazetteSubscribe();
      });
      btn.addEventListener("touchend", function (e) {
        if (e.target !== btn && !btn.contains(e.target)) return;
        if (window.__touchWasScroll && window.__touchWasScroll()) return;
        e.preventDefault();
        gazetteSubscribeHandledInTouchend = true;
        runGazetteSubscribe();
      }, { passive: false });
    }
    bindSubscribeClick(subscribeBtn);
    bindSubscribeClick(subscribeBtnNews);
    var articleSubscribeBtns = modal && modal.querySelectorAll(".gazette-modal__subscribe-in-article-btn");
    if (articleSubscribeBtns) {
      for (var k = 0; k < articleSubscribeBtns.length; k++) bindSubscribeClick(articleSubscribeBtns[k]);
    }
  }


  (function initGazetteArticleComments() {
    var shareRowSelector = ".gazette-modal__share-row";
    function esc(s) {
      return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }
    function renderGazetteCommentsFeed(feed, items, isAdmin) {
      if (!feed) return;
      if (!items || !items.length) {
        feed.innerHTML =
          '<p class="gazette-article-comments__empty">Пока нет комментариев — напишите первым.</p>';
        return;
      }
      var aidAttrG = esc(String(feed.getAttribute("data-gazette-article-comments-article-id") || ""));
      feed.innerHTML = items
        .map(function (c) {
          return pokerBuildGazetteCommentItemHtml(c, aidAttrG, isAdmin, false);
        })
        .join("");
    }
    function loadGazetteCommentsFeed(feed) {
      var aid = feed.getAttribute("data-gazette-article-comments-article-id");
      if (!aid) return;
      var base = typeof getApiBase === "function" ? getApiBase() : "";
      if (!base) {
        renderGazetteCommentsFeed(feed, [], false);
        return;
      }
      feed.innerHTML = '<p class="gazette-article-comments__loading">Загрузка…</p>';
      var q =
        "?articleId=" +
        encodeURIComponent(aid) +
        (typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("&") : "");
      fetch(base + "/api/gazette-article-comments" + q)
        .then(function (r) {
          return r.json().then(function (data) {
            return { ok: r.ok, data: data };
          });
        })
        .then(function (res) {
          if (res.ok && res.data && res.data.ok && Array.isArray(res.data.comments)) {
            if (res.data.isAdmin && typeof window.pokerMarkAdminAccess === "function") {
              window.pokerMarkAdminAccess("gazette-comments");
            }
            renderGazetteCommentsFeed(feed, res.data.comments, !!res.data.isAdmin);
          } else {
            renderGazetteCommentsFeed(feed, [], false);
          }
        })
        .catch(function () {
          renderGazetteCommentsFeed(feed, [], false);
        });
    }
    function refreshAllGazetteCommentFeeds() {
      var feeds = newsEl.querySelectorAll(".gazette-article-comments__feed[data-gazette-article-comments-article-id]");
      for (var i = 0; i < feeds.length; i++) loadGazetteCommentsFeed(feeds[i]);
    }
    function injectGazetteCommentsForArticle(article) {
      if (!article || article.getAttribute("data-gazette-comments-injected") === "1") return;
      if (article.getAttribute("data-gazette-draft") === "1") return;
      var aid = article.getAttribute("data-gazette-article");
      if (!aid || !/^\d+$/.test(aid)) return;
      article.setAttribute("data-gazette-comments-injected", "1");
      var shareRow = article.querySelector(shareRowSelector);
      var wrap = document.createElement("section");
      wrap.className = "gazette-article-comments gazette-article-comments--panel";
      wrap.setAttribute("aria-label", "Комментарии к новости");
      var cred = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
      var hintText =
        "Чтобы оставить комментарий, войдите через Telegram или ВКонтакте (PWA) либо откройте приложение в Telegram.";
      wrap.innerHTML =
        '<header class="gazette-article-comments__panel-head">' +
        '<h4 class="gazette-article-comments__title">Комментарии читателей</h4>' +
        '<p class="gazette-article-comments__panel-sub">Лента ниже; своё сообщение можно набрать в отдельном поле.</p>' +
        "</header>" +
        '<p class="gazette-article-comments__hint gazette-article-comments__hint--login"' +
        (cred ? " hidden" : "") +
        ">" +
        '<span>' +
        esc(hintText) +
        '</span><button type="button" class="gazette-article-comments__login-btn" data-poker-login-action="1">Войти</button>' +
        '</p>' +
        '<div class="gazette-article-comments__feed" data-gazette-article-comments-article-id="' +
        esc(aid) +
        '"></div>' +
        '<div class="gazette-article-comments__composer-card"' +
        (cred ? "" : " hidden") +
        '>' +
        '<form class="gazette-article-comments__form"' +
        (cred ? "" : " hidden") +
        ' novalidate aria-label="Новый комментарий">' +
        '<textarea id="gazetteCommentInput_' +
        esc(aid) +
        '" class="gazette-article-comments__textarea" maxlength="2000" rows="4" placeholder="Введите текст — он появится в ленте после отправки." aria-label="Текст комментария"></textarea>' +
        '<button type="submit" class="gazette-article-comments__submit">Отправить</button>' +
        '<p class="gazette-article-comments__form-status" aria-live="polite"></p>' +
        "</form></div>";
      var actionsCard = article.querySelector("[data-gazette-article-actions]");
      if (actionsCard) {
        actionsCard.appendChild(wrap);
      } else {
        var shareRow = article.querySelector(shareRowSelector);
        if (shareRow && shareRow.parentNode) {
          shareRow.parentNode.insertBefore(wrap, shareRow);
        } else {
          article.appendChild(wrap);
        }
      }
      loadGazetteCommentsFeed(wrap.querySelector(".gazette-article-comments__feed"));
    }
    function injectAllGazetteArticleComments() {
      var arts = newsEl.querySelectorAll("article[data-gazette-article]");
      for (var a = 0; a < arts.length; a++) injectGazetteCommentsForArticle(arts[a]);
    }
    injectAllGazetteArticleComments();
    if (typeof MutationObserver !== "undefined" && newsEl) {
      var moGac = new MutationObserver(function () {
        if (newsEl.hidden) return;
        injectAllGazetteArticleComments();
        refreshAllGazetteCommentFeeds();
      });
      try {
        moGac.observe(newsEl, { attributes: true, attributeFilter: ["hidden"] });
      } catch (eMoGac) {}
    }
    var gacDelegatedBound = false;
    function bindGazetteCommentsDelegated() {
      if (gacDelegatedBound || !newsEl) return;
      gacDelegatedBound = true;
      newsEl.addEventListener("submit", function (ev) {
        var form = ev.target;
        if (!form || !form.classList || !form.classList.contains("gazette-article-comments__form")) return;
        if (!newsEl.contains(form)) return;
        ev.preventDefault();
        var section = form.closest(".gazette-article-comments");
        var feed = section && section.querySelector(".gazette-article-comments__feed");
        var ta = form.querySelector(".gazette-article-comments__textarea");
        var st = form.querySelector(".gazette-article-comments__form-status");
        var sub = form.querySelector(".gazette-article-comments__submit");
        if (!feed || !ta) return;
        var aid = feed.getAttribute("data-gazette-article-comments-article-id");
        var text = ta.value ? ta.value.trim() : "";
        if (!text) {
          if (st) st.textContent = "Введите текст комментария.";
          return;
        }
        if (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential()) {
          if (st) {
            st.innerHTML =
              '<span>Войдите в приложение, чтобы комментировать.</span>' +
              '<button type="button" class="gazette-article-comments__login-btn gazette-article-comments__login-btn--inline" data-poker-login-action="1">Войти</button>';
          }
          return;
        }
        var basePost = typeof getApiBase === "function" ? getApiBase() : "";
        if (!basePost || typeof pokerApiAuthJsonBody !== "function") {
          if (st) st.textContent = "Не удалось отправить.";
          return;
        }
        if (sub) sub.disabled = true;
        if (st) st.textContent = "Отправляем…";
        var profileHint = {};
        try {
          var authG = window.__pokerTelegramAuth;
          if (authG && authG.status === "verified" && authG.user) {
            var uG = authG.user;
            if (uG.first_name) profileHint.profileFirstName = String(uG.first_name).trim().slice(0, 64);
            if (uG.last_name) profileHint.profileLastName = String(uG.last_name).trim().slice(0, 64);
          }
        } catch (eHint) {}
        var payload = pokerApiAuthJsonBody(
          Object.assign({ articleId: parseInt(aid, 10), text: text }, profileHint)
        );
        fetch(basePost + "/api/gazette-article-comments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
          .then(function (r) {
            return r.json().then(function (data) {
              return { ok: r.ok, data: data };
            });
          })
          .then(function (res) {
            if (sub) sub.disabled = false;
            if (res.ok && res.data && res.data.ok) {
              ta.value = "";
              if (st) st.textContent = "Комментарий опубликован.";
              loadGazetteCommentsFeed(feed);
              return;
            }
            var msg =
              res.data && res.data.error ? String(res.data.error) : "Не удалось отправить.";
            if (st) st.textContent = msg;
          })
          .catch(function () {
            if (sub) sub.disabled = false;
            if (st) st.textContent = "Сеть недоступна.";
          });
      });
      newsEl.addEventListener("click", function (ev) {
        var profBtn = ev.target && ev.target.closest && ev.target.closest("[data-gazette-comment-member-id]");
        if (profBtn && newsEl.contains(profBtn)) {
          ev.preventDefault();
          ev.stopPropagation();
          var midP = profBtn.getAttribute("data-gazette-comment-member-id");
          if (!midP) return;
          var nameP =
            (profBtn.getAttribute("data-gazette-comment-display-name") || "").trim() ||
            (profBtn.textContent || "").trim() ||
            "Игрок";
          if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
          if (typeof window.openChatUserModalById === "function") {
            window.openChatUserModalById(midP, nameP, null);
          }
          return;
        }
      });
    }
    bindGazetteCommentsDelegated();
    (function bindGazetteCommentKeyboardRepair() {
      if (!modal) return;
      var blurTimer = null;
      function scheduleFinalizeGazetteKb() {
        clearTimeout(blurTimer);
        blurTimer = setTimeout(function () {
          blurTimer = null;
          var active = document.activeElement;
          if (
            active &&
            active.classList &&
            active.classList.contains("gazette-article-comments__textarea") &&
            modal.contains(active)
          ) {
            return;
          }
          try {
            document.documentElement.classList.remove("gazette-comment-keyboard");
          } catch (eRm) {}
          try {
            if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") {
              window.__pokerFinalizeChatKeyboardDismiss();
            }
          } catch (eFin) {}
        }, 120);
      }
      modal.addEventListener(
        "focusin",
        function (ev) {
          var t = ev.target;
          if (!t || !t.classList || !t.classList.contains("gazette-article-comments__textarea")) return;
          if (!modal.contains(t)) return;
          try {
            document.documentElement.classList.add("gazette-comment-keyboard");
          } catch (eIn) {}
        },
        true
      );
      modal.addEventListener(
        "focusout",
        function (ev) {
          var t = ev.target;
          if (!t || !t.classList || !t.classList.contains("gazette-article-comments__textarea")) return;
          if (!modal.contains(t)) return;
          scheduleFinalizeGazetteKb();
        },
        true
      );
    })();
    window.__pokerGazetteReloadCommentFeed = loadGazetteCommentsFeed;
  })();
  }

  if (typeof window.pokerInitHomePlanner === "function") {
    window.pokerInitHomePlanner();
  }

  if (typeof window.pokerInitHomeTasks === "function") {
    window.pokerInitHomeTasks();
  }

  if (typeof window.pokerInitHomeDeepLinks === "function") {
    window.pokerInitHomeDeepLinks({ openGazette: openGazette });
  }
  if (typeof initHomeClubInfoModals === "function") initHomeClubInfoModals();

  if (typeof initHomeVpnProxyModal === "function") {
    initHomeVpnProxyModal({
      pokerBuildGazetteCommentItemHtml: pokerBuildGazetteCommentItemHtml
    });
  }
})();
}
