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

  function pokerGacEsc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function pokerGacTrimUrlTrailing(s) {
    return String(s || "").replace(/[),.;:!?]+$/g, "");
  }
  function pokerGacLinkifyUrls(raw) {
    var s = String(raw || "");
    var re = /(https?:\/\/\S+)/gi;
    var parts = s.split(re);
    var out = "";
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      if (i % 2 === 1 && /^https?:\/\//i.test(p)) {
        var safeHref = pokerGacTrimUrlTrailing(p);
        var href = pokerGacEsc(safeHref);
        out +=
          '<a href="' +
          href +
          '" target="_blank" rel="noopener noreferrer" class="vpn-proxy-modal__text-link">' +
          pokerGacEsc(p) +
          "</a>";
      } else {
        out += pokerGacEsc(p);
      }
    }
    return out;
  }
  function pokerGacMyMemberId() {
    try {
      if (typeof window.pokerResolveMyChatMemberId === "function") return window.pokerResolveMyChatMemberId();
    } catch (eMid) {}
    return null;
  }
  function pokerReloadGazetteOrVpnCommentFeed(feed) {
    if (!feed) return;
    var vpnM = document.getElementById("vpnProxyModal");
    if (vpnM && vpnM.contains(feed)) {
      if (typeof window.__pokerVpnProxyReloadCommentFeed === "function") window.__pokerVpnProxyReloadCommentFeed(feed);
      return;
    }
    if (typeof window.__pokerGazetteReloadCommentFeed === "function") window.__pokerGazetteReloadCommentFeed(feed);
  }
  function pokerBuildGazetteCommentItemHtml(c, aidAttrEscaped, isAdmin, useLinkify) {
    var esc = pokerGacEsc;
    var textPlain = String((c && c.text) || "");
    var textBody = useLinkify ? pokerGacLinkifyUrls(textPlain) : esc(textPlain);
    var cd = c.chatDisplayName != null ? String(c.chatDisplayName).trim() : "";
    var slug = c.userNameSlug != null ? String(c.userNameSlug).replace(/^@+/, "").trim() : "";
    var authorPlain = cd
      ? cd
      : slug
        ? "@" + slug
        : c.author != null
          ? String(c.author)
          : "Читатель";
    var authorEsc = esc(authorPlain);
    var midRaw = c.memberId != null ? String(c.memberId).trim() : "";
    var authorNode =
      midRaw && (/^tg_\d+$/.test(midRaw) || /^vk_\d+$/.test(midRaw))
        ? '<button type="button" class="gazette-article-comments__author gazette-article-comments__author--profile" data-gazette-comment-member-id="' +
          esc(midRaw) +
          '" data-gazette-comment-display-name="' +
          esc(authorPlain) +
          '">' +
          authorEsc +
          "</button>"
        : '<span class="gazette-article-comments__author">' + authorEsc + "</span>";
    var ds = "";
    try {
      var d = new Date(c.at);
      if (!isNaN(d.getTime())) {
        ds = d.toLocaleString("ru-RU", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      }
    } catch (eDs) {}
    var meta = ds ? '<time class="gazette-article-comments__time">' + esc(ds) + "</time>" : "";
    var editedBadge = c.editedAt
      ? '<span class="gazette-article-comments__edited" title="Отредактировано">изм.</span>'
      : "";
    var cid = c.id != null ? String(c.id) : "";
    var myMid = pokerGacMyMemberId();
    var cm = midRaw;
    var own = !!(myMid && cm && String(myMid).trim() === String(cm).trim());
    var showMods = !!cid && (isAdmin || own);
    var modActions = "";
    if (showMods) {
      modActions =
        '<span class="gazette-article-comments__mod-actions">' +
        '<button type="button" class="gazette-article-comments__edit">Изменить</button>' +
        '<button type="button" class="gazette-article-comments__delete" data-gazette-comment-delete="' +
        esc(cid) +
        '" data-gazette-comment-article="' +
        aidAttrEscaped +
        '">Удалить</button>' +
        "</span>";
    }
    var textEnc = esc(encodeURIComponent(textPlain));
    return (
      '<article class="gazette-article-comments__item" data-gazette-text-enc="' +
      textEnc +
      '"><header class="gazette-article-comments__item-head">' +
      authorNode +
      meta +
      editedBadge +
      modActions +
      '</header><div class="gazette-article-comments__body">' +
      '<p class="gazette-article-comments__text">' +
      textBody +
      '</p><div class="gazette-article-comments__edit-box" hidden>' +
      '<textarea class="gazette-article-comments__edit-textarea" maxlength="2000" rows="4" aria-label="Редактирование комментария"></textarea>' +
      '<div class="gazette-article-comments__edit-btns">' +
      '<button type="button" class="gazette-article-comments__edit-save">Сохранить</button>' +
      '<button type="button" class="gazette-article-comments__edit-cancel">Отмена</button>' +
      "</div></div></div></article>"
    );
  }
  function pokerGacGlobalCommentClick(ev) {
    var t = ev.target;
    if (!t || !t.closest) return;
    var delEl = t.closest("[data-gazette-comment-delete]");
    if (delEl) {
      var feedDel = delEl.closest(".gazette-article-comments__feed");
      if (!feedDel) return;
      ev.preventDefault();
      var cid = delEl.getAttribute("data-gazette-comment-delete");
      var artId = delEl.getAttribute("data-gazette-comment-article");
      if (!cid || !artId) return;
      if (!confirm("Удалить комментарий?")) return;
      var baseDel = typeof getApiBase === "function" ? getApiBase() : "";
      if (!baseDel || typeof pokerApiAuthJsonBody !== "function") return;
      if (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential()) return;
      delEl.disabled = true;
      fetch(baseDel + "/api/gazette-article-comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          pokerApiAuthJsonBody({
            action: "delete",
            commentId: cid,
            articleId: parseInt(artId, 10),
          })
        ),
      })
        .then(function (r) {
          return r.json().then(function (data) {
            return { ok: r.ok, data: data };
          });
        })
        .then(function (res) {
          delEl.disabled = false;
          if (res.ok && res.data && res.data.ok) {
            pokerReloadGazetteOrVpnCommentFeed(feedDel);
            return;
          }
          var msg = res.data && res.data.error ? String(res.data.error) : "Не удалось удалить";
          var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tg && tg.showAlert) tg.showAlert(msg);
          else alert(msg);
        })
        .catch(function () {
          delEl.disabled = false;
          var tg2 = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tg2 && tg2.showAlert) tg2.showAlert("Сеть недоступна");
          else alert("Сеть недоступна");
        });
      return;
    }
    var editBtn = t.closest(".gazette-article-comments__edit");
    if (editBtn && !t.closest(".gazette-article-comments__edit-save") && !t.closest(".gazette-article-comments__edit-cancel")) {
      var feedE = editBtn.closest(".gazette-article-comments__feed");
      if (!feedE) return;
      ev.preventDefault();
      var art = editBtn.closest(".gazette-article-comments__item");
      if (!art) return;
      var enc = art.getAttribute("data-gazette-text-enc") || "";
      var raw = "";
      try {
        raw = decodeURIComponent(enc);
      } catch (eDec) {
        raw = "";
      }
      var p = art.querySelector(".gazette-article-comments__text");
      var box = art.querySelector(".gazette-article-comments__edit-box");
      var taEd = art.querySelector(".gazette-article-comments__edit-textarea");
      if (taEd) taEd.value = raw;
      if (p) p.hidden = true;
      if (box) box.hidden = false;
      art.classList.add("gazette-article-comments__item--editing");
      try {
        taEd.focus();
      } catch (eF) {}
      return;
    }
    var cancelBtn = t.closest(".gazette-article-comments__edit-cancel");
    if (cancelBtn) {
      var feedC = cancelBtn.closest(".gazette-article-comments__feed");
      if (!feedC) return;
      ev.preventDefault();
      var artC = cancelBtn.closest(".gazette-article-comments__item");
      if (!artC) return;
      var pC = artC.querySelector(".gazette-article-comments__text");
      var boxC = artC.querySelector(".gazette-article-comments__edit-box");
      if (pC) pC.hidden = false;
      if (boxC) boxC.hidden = true;
      artC.classList.remove("gazette-article-comments__item--editing");
      return;
    }
    var saveBtn = t.closest(".gazette-article-comments__edit-save");
    if (saveBtn) {
      var feedS = saveBtn.closest(".gazette-article-comments__feed");
      if (!feedS) return;
      ev.preventDefault();
      var artS = saveBtn.closest(".gazette-article-comments__item");
      if (!artS) return;
      var delBtnS = artS.querySelector("[data-gazette-comment-delete]");
      var cidS = delBtnS ? delBtnS.getAttribute("data-gazette-comment-delete") : "";
      var artIdS = delBtnS ? delBtnS.getAttribute("data-gazette-comment-article") : "";
      if (!cidS || !artIdS) return;
      var taS = artS.querySelector(".gazette-article-comments__edit-textarea");
      var textS = taS && taS.value ? taS.value.trim() : "";
      if (!textS) {
        var tgE = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tgE && tgE.showAlert) tgE.showAlert("Введите текст");
        else alert("Введите текст");
        return;
      }
      if (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential()) return;
      var baseS = typeof getApiBase === "function" ? getApiBase() : "";
      if (!baseS || typeof pokerApiAuthJsonBody !== "function") return;
      saveBtn.disabled = true;
      fetch(baseS + "/api/gazette-article-comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          pokerApiAuthJsonBody({
            action: "edit",
            commentId: cidS,
            articleId: parseInt(artIdS, 10),
            text: textS,
          })
        ),
      })
        .then(function (r) {
          return r.json().then(function (data) {
            return { ok: r.ok, data: data };
          });
        })
        .then(function (res) {
          saveBtn.disabled = false;
          if (res.ok && res.data && res.data.ok) {
            pokerReloadGazetteOrVpnCommentFeed(feedS);
            return;
          }
          var msgS = res.data && res.data.error ? String(res.data.error) : "Не удалось сохранить";
          var tgS = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tgS && tgS.showAlert) tgS.showAlert(msgS);
          else alert(msgS);
        })
        .catch(function () {
          saveBtn.disabled = false;
          var tgSc = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tgSc && tgSc.showAlert) tgSc.showAlert("Сеть недоступна");
          else alert("Сеть недоступна");
        });
    }
  }

  if (!window.__pokerGacCommentUiBound) {
    window.__pokerGacCommentUiBound = true;
    document.addEventListener("click", pokerGacGlobalCommentClick);
  }

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
  if (openBtn) openBtn.addEventListener("click", openGazette);
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
        if (typeof navigator.clipboard !== "undefined" && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(link).then(function () {
            var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
            if (tg && tg.showAlert) tg.showAlert("Ссылка скопирована. Отправьте её другу — по ней откроется эта новость."); else alert("Ссылка скопирована.");
          }).catch(function () {
            var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
            if (tg && tg.showAlert) tg.showAlert("Ссылка: " + link); else alert("Ссылка: " + link);
          });
        } else {
          var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tg && tg.showAlert) tg.showAlert("Ссылка: " + link); else alert("Ссылка: " + link);
        }
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
        esc(hintText) +
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
          if (st) st.textContent = "Войдите в приложение, чтобы комментировать.";
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

  function initRomanGazetteTaskPlanner() {
    var plannerModal = document.getElementById("romanTaskPlannerModal");
    var plannerBackdrop = document.getElementById("romanTaskPlannerModalBackdrop");
    var plannerClose = document.getElementById("romanTaskPlannerModalClose");
    var openBtn = document.getElementById("romanTaskPlannerOpenBtn");
    var boardEl = document.getElementById("romanTaskPlannerBoard");
    var listAll = document.getElementById("romanTaskListAll");
    var form = document.getElementById("romanTaskAddForm");
    var input = document.getElementById("romanTaskInput");
    var importantCheckbox = document.getElementById("romanTaskImportantCheckbox");
    if (!plannerModal || !boardEl || !listAll || !form || !input || !openBtn) return;
    if (plannerModal.dataset.romanTaskPlannerBound === "1") return;
    plannerModal.dataset.romanTaskPlannerBound = "1";
    var PLANNER_TAB_STORAGE_KEY = "poker_gazette_planner_tab_v1";
    function readPlannerTabStorage() {
      try {
        var s = sessionStorage.getItem(PLANNER_TAB_STORAGE_KEY);
        if (s === "important" || s === "normal" || s === "done") return s;
        if (s === "tasks") return "important";
      } catch (eRd) {}
      return "important";
    }
    var plannerTab = readPlannerTabStorage();
    function writePlannerTabStorage(v) {
      try {
        sessionStorage.setItem(PLANNER_TAB_STORAGE_KEY, v);
      } catch (eWr) {}
    }
    var tabImportantBtn = document.getElementById("romanPlannerTabImportant");
    var tabNormalBtn = document.getElementById("romanPlannerTabNormal");
    var tabDoneBtn = document.getElementById("romanPlannerTabDone");
    var tabImportantCount = document.getElementById("romanPlannerTabImportantCount");
    var tabNormalCount = document.getElementById("romanPlannerTabNormalCount");
    var tabDoneCount = document.getElementById("romanPlannerTabDoneCount");
    function setPlannerTabUi() {
      var isDone = plannerTab === "done";
      var showAddForm = !isDone;
      if (tabImportantBtn) {
        tabImportantBtn.classList.toggle("roman-task-planner__tab--active", plannerTab === "important");
        tabImportantBtn.setAttribute("aria-selected", plannerTab === "important" ? "true" : "false");
      }
      if (tabNormalBtn) {
        tabNormalBtn.classList.toggle("roman-task-planner__tab--active", plannerTab === "normal");
        tabNormalBtn.setAttribute("aria-selected", plannerTab === "normal" ? "true" : "false");
      }
      if (tabDoneBtn) {
        tabDoneBtn.classList.toggle("roman-task-planner__tab--active", isDone);
        tabDoneBtn.setAttribute("aria-selected", isDone ? "true" : "false");
      }
      if (form) form.classList.toggle("roman-task-planner__add--hidden", !showAddForm);
    }
    var PLANNER_COMPOSER_MIN_PX = 52;
    var PLANNER_COMPOSER_MAX_PX = 280;
    var PLANNER_ORDER_STEP = 1000;
    function resizePlannerComposer() {
      if (!input || input.tagName !== "TEXTAREA") return;
      if (typeof pokerAutosizeTextarea === "function") {
        pokerAutosizeTextarea(input, {
          maxHeight: PLANNER_COMPOSER_MAX_PX,
          minHeight: PLANNER_COMPOSER_MIN_PX,
        });
      }
    }
    /** Общий планер двух Романов. */
    var PLANNER_ROMAN_SHARED_USERNAMES = { roman1787443: true, roman1_matvienko: true };
    /** Отдельный список задач (не общий с Романами). */
    var PLANNER_SOLO_USERNAMES = { polyapineapple: true };
    /**
     * Доступ по числовому Telegram id, если username в WebApp пустой (скрыт в настройках).
     * Штатные админы тоже видят общий планер: это важно для контроля задач без отдельной выдачи роли.
     * Для @polyapineapple при скрытом username задайте тот же id, что в env GAZETTE_EDITOR_PLANNER_POLY_TELEGRAM_ID на сервере.
     */
    var PLANNER_ALLOWED_TELEGRAM_IDS = { 388008256: true, 2144406710: true, 1897001087: true };
    /** Числовой id Telegram для @polyapineapple, если username скрыт (должен совпадать с серверным env). */
    var PLANNER_POLY_TELEGRAM_ID = null;
    var LEGACY_PLANNER_STORAGE_KEY = "poker_roman1787443_planner_v1";
    var PLANNER_SHARED_STORAGE_KEY = "poker_gazette_editor_planner_shared_v1";
    var PLANNER_OLD_KEYS_TO_MIGRATE = [
      LEGACY_PLANNER_STORAGE_KEY,
      "poker_gazette_editor_planner_v1_roman1787443",
      "poker_gazette_editor_planner_v1_roman1_matvienko",
    ];
    function getPlannerTelegramUser() {
      var user =
        typeof getPokerResolvedTelegramUser === "function" ? getPokerResolvedTelegramUser() : null;
      if (!user && window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
        user = window.Telegram.WebApp.initDataUnsafe.user;
      }
      return user || null;
    }
    function plannerAuthUsernameLower() {
      try {
        var _ap = window.__pokerTelegramAuth;
        if (_ap && _ap.user && _ap.user.username != null) {
          return String(_ap.user.username).replace(/^@+/, "").trim().toLowerCase();
        }
      } catch (eAu) {}
      try {
        var _rec = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
        if (_rec && _rec.user && _rec.user.username != null) {
          return String(_rec.user.username).replace(/^@+/, "").trim().toLowerCase();
        }
      } catch (eRec) {}
      return "";
    }
    function plannerAuthEmailLower() {
      try {
        var _ap = window.__pokerTelegramAuth;
        if (_ap && _ap.user && _ap.user.email != null) {
          return String(_ap.user.email).trim().toLowerCase();
        }
      } catch (eAuEmail) {}
      try {
        var _rec = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
        if (_rec && _rec.user && _rec.user.email != null) {
          return String(_rec.user.email).trim().toLowerCase();
        }
      } catch (eRecEmail) {}
      return "";
    }
    function normUser() {
      var user = getPlannerTelegramUser();
      var u = user && user.username ? String(user.username) : "";
      var n = u.replace(/^@+/, "").trim().toLowerCase();
      if (n) return n;
      return plannerAuthUsernameLower();
    }
    function isPlannerSoloUser() {
      var u = normUser();
      if (u && PLANNER_SOLO_USERNAMES[u]) return true;
      var user = getPlannerTelegramUser();
      if (user && user.id != null && PLANNER_POLY_TELEGRAM_ID != null) {
        if (Number(user.id) === PLANNER_POLY_TELEGRAM_ID) return true;
      }
      try {
        var _ap = window.__pokerTelegramAuth;
        if (_ap && _ap.user && _ap.user.id != null && PLANNER_POLY_TELEGRAM_ID != null) {
          if (Number(_ap.user.id) === PLANNER_POLY_TELEGRAM_ID) return true;
        }
        var _recTg = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
        if (_recTg && _recTg.user && _recTg.user.id != null && PLANNER_POLY_TELEGRAM_ID != null) {
          if (Number(_recTg.user.id) === PLANNER_POLY_TELEGRAM_ID) return true;
        }
      } catch (eSo) {}
      return false;
    }
    function isPlannerAllowedUser() {
      try {
        var _ap = window.__pokerTelegramAuth;
        if (_ap && _ap.adminAccess === true) return true;
        if (_ap && _ap.gazettePlannerAccess === true) return true;
        var _recTg = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
        if (_recTg && _recTg.adminAccess === true) return true;
        if (_recTg && _recTg.gazettePlannerAccess === true) return true;
      } catch (ePlAllow) {}
      var ua = plannerAuthUsernameLower();
      if (ua && (PLANNER_SOLO_USERNAMES[ua] || PLANNER_ROMAN_SHARED_USERNAMES[ua])) return true;
      if (ua === "roman1_matvienko") return true;
      if (plannerAuthEmailLower() === "matvienkoro92@gmail.com") return true;
      var user = getPlannerTelegramUser();
      if (user) {
        var u = user.username != null ? String(user.username).replace(/^@+/, "").trim().toLowerCase() : "";
        if (u && PLANNER_SOLO_USERNAMES[u]) return true;
        if (u && PLANNER_ROMAN_SHARED_USERNAMES[u]) return true;
        if (u === "roman1_matvienko") return true;
        if (user.id != null) {
          var idNum = Number(user.id);
          if (!isNaN(idNum)) {
            if (PLANNER_POLY_TELEGRAM_ID != null && idNum === PLANNER_POLY_TELEGRAM_ID) return true;
            if (PLANNER_ALLOWED_TELEGRAM_IDS[idNum]) return true;
          }
        }
      }
      try {
        var authCandidates = [];
        var auth = window.__pokerTelegramAuth;
        if (auth && auth.user) authCandidates.push(auth.user);
        var rec = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
        if (rec && rec.user) authCandidates.push(rec.user);
        for (var i = 0; i < authCandidates.length; i++) {
          var id = authCandidates[i] && authCandidates[i].id != null ? Number(authCandidates[i].id) : NaN;
          if (!isNaN(id) && PLANNER_ALLOWED_TELEGRAM_IDS[id]) return true;
        }
      } catch (eAuthIds) {}
      return false;
    }
    function plannerStorageKey() {
      if (!isPlannerAllowedUser()) return null;
      if (isPlannerSoloUser()) {
        var u = normUser();
        if ((!u || !PLANNER_SOLO_USERNAMES[u]) && PLANNER_POLY_TELEGRAM_ID != null) {
          var userK = getPlannerTelegramUser();
          var idK = userK && userK.id != null ? Number(userK.id) : NaN;
          if (idK === PLANNER_POLY_TELEGRAM_ID) u = "polyapineapple";
        }
        if (!u || !PLANNER_SOLO_USERNAMES[u]) u = plannerAuthUsernameLower();
        if (u && PLANNER_SOLO_USERNAMES[u]) return "poker_gazette_editor_planner_solo_" + u + "_v1";
        return "poker_gazette_editor_planner_solo_polyapineapple_v1";
      }
      return PLANNER_SHARED_STORAGE_KEY;
    }
    function updatePlannerHintText(rawOpt) {
      var el = document.getElementById("romanTaskPlannerHint");
      if (!el) return;
      if (!isPlannerAllowedUser()) {
        el.textContent =
          "Планер задач редакторов: общий список или личный — подсказка обновится после входа.";
        return;
      }
      var raw = rawOpt != null ? rawOpt : loadTasks();
      if (!Array.isArray(raw)) raw = [];
      var total = 0;
      var imp = 0;
      var norm = 0;
      var doneC = 0;
      for (var hi = 0; hi < raw.length; hi++) {
        var t = raw[hi];
        if (!t) continue;
        if (t.done) {
          doneC++;
          continue;
        }
        total++;
        if (t.important) imp++;
        else norm++;
      }
      el.textContent = "Всего задач: " + total;
      if (tabImportantCount) tabImportantCount.textContent = "(" + imp + ")";
      if (tabNormalCount) tabNormalCount.textContent = "(" + norm + ")";
      if (tabDoneCount) tabDoneCount.textContent = "(" + doneC + ")";
      if (tabImportantBtn) tabImportantBtn.setAttribute("aria-label", "Важные (" + imp + ")");
      if (tabNormalBtn) tabNormalBtn.setAttribute("aria-label", "Не важные (" + norm + ")");
      if (tabDoneBtn) tabDoneBtn.setAttribute("aria-label", "Выполненные (" + doneC + ")");
    }
    var romanPlannerDirtySinceOpen = false;
    var romanPlannerPushTimer = null;
    var romanPlannerSaveGeneration = 0;
    var romanPlannerPullInFlight = false;
    var romanPlannerLiveSyncInterval = null;
    var romanPlannerLastAmbientPullMs = 0;
    function romanPlannerApiOk() {
      if (!isPlannerAllowedUser()) return false;
      if (typeof getApiBase !== "function" || !getApiBase()) return false;
      if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return false;
      return true;
    }
    function romanPlannerApplyServerTasksIfClean(tasks) {
      if (romanPlannerDirtySinceOpen) return;
      var key = plannerStorageKey();
      if (!key) return;
      try {
        localStorage.setItem(key, JSON.stringify(tasks));
      } catch (eSet) {}
      if (plannerModal.getAttribute("aria-hidden") === "false") renderTasks();
    }
    function romanPlannerPostFullList(tasks, onDone) {
      if (!romanPlannerApiOk()) {
        if (onDone) onDone(false);
        return;
      }
      var base = getApiBase();
      var body =
        typeof pokerApiAuthJsonBody === "function" ? pokerApiAuthJsonBody({ tasks: tasks }) : { tasks: tasks };
      fetch(base + "/api/gazette-editor-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
      })
        .then(function (r) {
          return r.json();
        })
        .then(function (data) {
          var ok = !!(data && data.ok);
          if (ok && Array.isArray(data.tasks) && !romanPlannerDirtySinceOpen) {
            try {
              var k = plannerStorageKey();
              if (k) localStorage.setItem(k, JSON.stringify(data.tasks));
            } catch (eSync) {}
            if (plannerModal.getAttribute("aria-hidden") === "false") renderTasks();
          }
          if (onDone) onDone(ok);
        })
        .catch(function () {
          if (onDone) onDone(false);
        });
    }
    function romanPlannerPullFromServer() {
      if (!romanPlannerApiOk()) return;
      if (romanPlannerPullInFlight) return;
      romanPlannerPullInFlight = true;
      var base = getApiBase();
      var q = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?initData=";
      fetch(base + "/api/gazette-editor-planner" + q, { cache: "no-store" })
        .then(function (r) {
          return r.json();
        })
        .then(function (data) {
          if (!data || !data.ok || data.offline) return;
          var serverTasks = Array.isArray(data.tasks) ? data.tasks : [];
          if (serverTasks.length === 0) {
            var seed = loadTasks();
            if (seed.length) {
              romanPlannerPostFullList(seed, function () {});
            }
            return;
          }
          romanPlannerApplyServerTasksIfClean(serverTasks);
        })
        .catch(function () {})
        .then(function () {
          romanPlannerPullInFlight = false;
        });
    }
    /** Повторный GET с паузой — при возврате во вкладку / Mini App, чтобы второе устройство подтянуло список. */
    function romanPlannerPullAmbient() {
      var now = Date.now();
      if (now - romanPlannerLastAmbientPullMs < 1200) return;
      romanPlannerLastAmbientPullMs = now;
      romanPlannerPullFromServer();
    }
    function romanPlannerStopLiveSync() {
      if (romanPlannerLiveSyncInterval != null) {
        clearInterval(romanPlannerLiveSyncInterval);
        romanPlannerLiveSyncInterval = null;
      }
    }
    /** Пока модалка открыта — периодически синхронизировать с Redis (два телефона без смены вкладки). */
    function romanPlannerStartLiveSync() {
      romanPlannerStopLiveSync();
      if (!romanPlannerApiOk()) return;
      romanPlannerLiveSyncInterval = setInterval(function () {
        if (!plannerModal || plannerModal.getAttribute("aria-hidden") !== "false") {
          romanPlannerStopLiveSync();
          return;
        }
        romanPlannerPullFromServer();
      }, 18000);
    }
    function mergeRomanPlannerArraysFromKeys() {
      var arrs = [];
      for (var i = 0; i < PLANNER_OLD_KEYS_TO_MIGRATE.length; i++) {
        try {
          var r = localStorage.getItem(PLANNER_OLD_KEYS_TO_MIGRATE[i]);
          if (!r) continue;
          var a = JSON.parse(r);
          if (Array.isArray(a) && a.length) arrs.push(a);
        } catch (eK) {}
      }
      if (!arrs.length) return [];
      var seen = {};
      var out = [];
      for (var j = 0; j < arrs.length; j++) {
        var arr = arrs[j];
        for (var k = 0; k < arr.length; k++) {
          var t = arr[k];
          if (!t || t.id == null) continue;
          var id = String(t.id);
          if (seen[id]) continue;
          seen[id] = true;
          out.push(t);
        }
      }
      return out;
    }
    function cleanupRomanPlannerLegacyKeys() {
      for (var ci = 0; ci < PLANNER_OLD_KEYS_TO_MIGRATE.length; ci++) {
        try {
          localStorage.removeItem(PLANNER_OLD_KEYS_TO_MIGRATE[ci]);
        } catch (eRm) {}
      }
    }
    function mergeLegacyPlannerIntoList(list) {
      var key = plannerStorageKey();
      if (!key || key !== PLANNER_SHARED_STORAGE_KEY) return list;
      var merged = mergeRomanPlannerArraysFromKeys();
      if (!merged.length) return list;
      var base = Array.isArray(list) ? list : [];
      var byId = {};
      for (var i = 0; i < base.length; i++) {
        if (base[i] && base[i].id != null) byId[String(base[i].id)] = true;
      }
      var out = base.slice();
      var added = false;
      for (var j = 0; j < merged.length; j++) {
        var t = merged[j];
        if (!t || t.id == null) continue;
        var id = String(t.id);
        if (byId[id]) continue;
        byId[id] = true;
        out.push(t);
        added = true;
      }
      if (added) {
        try {
          localStorage.setItem(key, JSON.stringify(out));
          cleanupRomanPlannerLegacyKeys();
        } catch (eMg) {}
      }
      return out;
    }
    function escHtml(s) {
      return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }
    function loadTasks() {
      var key = plannerStorageKey();
      if (!key) return [];
      try {
        var raw = localStorage.getItem(key);
        if (!raw) {
          if (key === PLANNER_SHARED_STORAGE_KEY) {
            var merged = mergeRomanPlannerArraysFromKeys();
            if (merged.length) {
              try {
                ensurePlannerOrdersMutateTasks(merged);
                localStorage.setItem(key, JSON.stringify(merged));
                cleanupRomanPlannerLegacyKeys();
              } catch (eMig) {}
              return merged;
            }
          }
          return [];
        }
        var arr = JSON.parse(raw);
        var list = Array.isArray(arr) ? arr : [];
        list = mergeLegacyPlannerIntoList(list);
        if (ensurePlannerOrdersMutateTasks(list)) {
          try {
            localStorage.setItem(key, JSON.stringify(list));
          } catch (eOrd) {}
        }
        return list;
      } catch (eLoad) {
        return [];
      }
    }
    function saveTasks(tasks) {
      var key = plannerStorageKey();
      if (!key) return;
      try {
        localStorage.setItem(key, JSON.stringify(tasks));
      } catch (eSave) {}
      romanPlannerDirtySinceOpen = true;
      if (!romanPlannerApiOk()) return;
      romanPlannerSaveGeneration++;
      var gen = romanPlannerSaveGeneration;
      var snapshot = tasks;
      clearTimeout(romanPlannerPushTimer);
      romanPlannerPushTimer = setTimeout(function () {
        romanPlannerPushTimer = null;
        romanPlannerPostFullList(snapshot, function (ok) {
          if (ok && gen === romanPlannerSaveGeneration) romanPlannerDirtySinceOpen = false;
        });
      }, 450);
    }
    function sortTasksByCreatedAsc(arr) {
      var copy = arr.slice();
      copy.sort(function (a, b) {
        var ta = a && a.createdAt ? Number(a.createdAt) : 0;
        var tb = b && b.createdAt ? Number(b.createdAt) : 0;
        return ta - tb;
      });
      return copy;
    }
    /** Порядок внутри вкладки «Важные» / «Не важные»: plannerOrder, затем «Выполняется», затем дата. */
    function sortBucketActiveTasks(arr) {
      var copy = arr.slice();
      copy.sort(function (a, b) {
        var oa = a && a.plannerOrder != null && !isNaN(Number(a.plannerOrder)) ? Number(a.plannerOrder) : Number.MAX_SAFE_INTEGER;
        var ob = b && b.plannerOrder != null && !isNaN(Number(b.plannerOrder)) ? Number(b.plannerOrder) : Number.MAX_SAFE_INTEGER;
        if (oa !== ob) return oa - ob;
        var da = a && a.doing ? 1 : 0;
        var db = b && b.doing ? 1 : 0;
        if (da !== db) return db - da;
        var ta = a && a.createdAt ? Number(a.createdAt) : 0;
        var tb = b && b.createdAt ? Number(b.createdAt) : 0;
        return ta - tb;
      });
      return copy;
    }
    function ensurePlannerOrdersMutateTasks(tasks) {
      if (!Array.isArray(tasks)) return false;
      var changed = false;
      function fix(pred) {
        var sub = [];
        for (var i = 0; i < tasks.length; i++) {
          var t = tasks[i];
          if (!t || t.done) continue;
          if (!pred(t)) continue;
          sub.push(t);
        }
        if (!sub.length) return;
        var missing = false;
        for (var k = 0; k < sub.length; k++) {
          var po = sub[k].plannerOrder;
          if (po == null || isNaN(Number(po))) {
            missing = true;
            break;
          }
        }
        if (!missing) return;
        sub.sort(function (a, b) {
          var da = a && a.doing ? 1 : 0;
          var db = b && b.doing ? 1 : 0;
          if (da !== db) return db - da;
          return (Number(a.createdAt) || 0) - (Number(b.createdAt) || 0);
        });
        for (var j = 0; j < sub.length; j++) {
          var want = j * PLANNER_ORDER_STEP;
          if (Number(sub[j].plannerOrder) !== want) {
            sub[j].plannerOrder = want;
            changed = true;
          }
        }
      }
      fix(function (t) {
        return !!t.important;
      });
      fix(function (t) {
        return !t.important;
      });
      return changed;
    }
    function nextPlannerOrderInBucket(tasks, wantImportant) {
      var max = 0;
      for (var i = 0; i < tasks.length; i++) {
        var t = tasks[i];
        if (!t || t.done) continue;
        if (!!t.important !== !!wantImportant) continue;
        var o = Number(t.plannerOrder);
        if (!isNaN(o) && o > max) max = o;
      }
      return max + PLANNER_ORDER_STEP;
    }
    function movePlannerTaskInList(taskId, delta) {
      var tid = taskId != null ? String(taskId) : "";
      if (!tid || (delta !== -1 && delta !== 1)) return;
      if (plannerTab !== "important" && plannerTab !== "normal") return;
      var keepListScrollTop = listAll ? listAll.scrollTop || 0 : 0;
      var keepPageScrollTop =
        (document.scrollingElement && document.scrollingElement.scrollTop) ||
        (document.documentElement && document.documentElement.scrollTop) ||
        (document.body && document.body.scrollTop) ||
        0;
      var tasks = loadTasks();
      ensurePlannerOrdersMutateTasks(tasks);
      var pred =
        plannerTab === "important"
          ? function (t) {
              return t && !t.done && !!t.important;
            }
          : function (t) {
              return t && !t.done && !t.important;
            };
      var bucket = [];
      for (var i = 0; i < tasks.length; i++) {
        if (pred(tasks[i])) bucket.push(tasks[i]);
      }
      bucket = sortBucketActiveTasks(bucket);
      var idx = -1;
      for (var j = 0; j < bucket.length; j++) {
        if (bucket[j] && String(bucket[j].id) === tid) {
          idx = j;
          break;
        }
      }
      if (idx < 0) return;
      var j2 = idx + delta;
      if (j2 < 0 || j2 >= bucket.length) return;
      var a = bucket[idx];
      var b = bucket[j2];
      var oa = Number(a.plannerOrder);
      var ob = Number(b.plannerOrder);
      if (isNaN(oa) || isNaN(ob)) {
        ensurePlannerOrdersMutateTasks(tasks);
        oa = Number(a.plannerOrder);
        ob = Number(b.plannerOrder);
      }
      a.plannerOrder = ob;
      b.plannerOrder = oa;
      saveTasks(tasks);
      try {
        if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
      } catch (eBlur) {}
      renderTasks();
      function restorePlannerMoveScroll() {
        if (listAll) listAll.scrollTop = keepListScrollTop;
        var se = document.scrollingElement || document.documentElement || document.body;
        if (se) se.scrollTop = keepPageScrollTop;
      }
      restorePlannerMoveScroll();
      try {
        requestAnimationFrame(restorePlannerMoveScroll);
      } catch (eRaf) {
        setTimeout(restorePlannerMoveScroll, 0);
      }
    }
    function findTaskById(tasks, id) {
      var sid = String(id);
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i] && String(tasks[i].id) === sid) return i;
      }
      return -1;
    }
    function renderTaskRow(t, columnDone, displayNum, reorderOpts) {
      var id = t.id != null ? String(t.id) : "";
      var text = t.text != null ? String(t.text) : "";
      var important = !!(t && t.important);
      var doing = !!(t && t.doing);
      var stage = t && (t.stage === "waiting" || t.stage === "checking") ? t.stage : "";
      var completeBtn =
        '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--complete" data-roman-task-complete="' +
        escHtml(id) +
        '">Выполнено</button>';
      var uncompleteBtn =
        '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--ghost" data-roman-task-uncomplete="' +
        escHtml(id) +
        '">Вернуть</button>';
      var badges = "";
      if (important && !columnDone) {
        badges += '<span class="roman-task-planner__badge roman-task-planner__badge--important">Важно</span>';
      }
      if (doing && !columnDone) {
        badges += '<span class="roman-task-planner__badge roman-task-planner__badge--doing">Выполняется</span>';
      }
      if (stage === "waiting" && !columnDone) {
        badges += '<span class="roman-task-planner__badge roman-task-planner__badge--waiting">Ожидаю выполнения</span>';
      }
      if (stage === "checking" && !columnDone) {
        badges += '<span class="roman-task-planner__badge roman-task-planner__badge--checking">Проверяю выполнение</span>';
      }
      var badgesRow = "";
      if (badges) badgesRow = '<div class="roman-task-planner__meta-badges">' + badges + "</div>";
      var numberBadge =
        displayNum != null && displayNum > 0
          ? '<span class="roman-task-planner__num-cell" aria-label="Номер в списке">' + displayNum + ".</span>"
          : "";
      var taskTopLine = numberBadge || badgesRow ? '<div class="roman-task-planner__top-line">' + numberBadge + badgesRow + "</div>" : "";
      var reorderBtns =
        !columnDone && reorderOpts
          ? '<div class="roman-task-planner__reorder-col">' +
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--reorder" data-roman-task-move-up="' +
            escHtml(id) +
            '"' +
            (reorderOpts.canUp ? "" : " disabled") +
            ' aria-label="Выше в списке">↑</button>' +
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--reorder" data-roman-task-move-down="' +
            escHtml(id) +
            '"' +
            (reorderOpts.canDown ? "" : " disabled") +
            ' aria-label="Ниже в списке">↓</button>' +
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--reorder-edit" data-roman-task-edit="' +
            escHtml(id) +
            '">Изм.</button>' +
            "</div>"
          : "";
      var bodyContent = "";
      if (displayNum != null && displayNum > 0) {
        bodyContent =
          '<div class="roman-task-planner__body-row">' +
          '<div class="roman-task-planner__main-col">' +
          taskTopLine +
          '<div class="roman-task-planner__text">' +
          escHtml(text) +
          "</div>" +
          "</div>" +
          reorderBtns +
          "</div>";
      } else {
        bodyContent =
          taskTopLine +
          '<div class="roman-task-planner__text">' +
          escHtml(text) +
          "</div>";
      }
      var statusBtns = "";
      if (!columnDone) {
        if (doing) {
          statusBtns +=
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--ghost" data-roman-task-clear-doing="' +
            escHtml(id) +
            '">Стоп</button>';
        } else {
          statusBtns +=
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--doing" data-roman-task-set-doing="' +
            escHtml(id) +
            '">В работе</button>';
        }
        if (important) {
          statusBtns +=
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--ghost" data-roman-task-clear-important="' +
            escHtml(id) +
            '">Не важно</button>';
        } else {
          statusBtns +=
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--important" data-roman-task-set-important="' +
            escHtml(id) +
            '">Важно</button>';
        }
        if (stage === "waiting") {
          statusBtns +=
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--ghost" data-roman-task-clear-stage="' +
            escHtml(id) +
            '">Не жду</button>';
        } else {
          statusBtns +=
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--waiting" data-roman-task-set-stage="' +
            escHtml(id) +
            '" data-roman-task-stage="waiting">Ожидаю</button>';
        }
        if (stage === "checking") {
          statusBtns +=
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--ghost" data-roman-task-clear-stage="' +
            escHtml(id) +
            '">Не провер.</button>';
        } else {
          statusBtns +=
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--checking" data-roman-task-set-stage="' +
            escHtml(id) +
            '" data-roman-task-stage="checking">Проверяю</button>';
        }
      }
      var actionsHtml =
        (columnDone ? uncompleteBtn : statusBtns + completeBtn) +
        '<button type="button" class="roman-task-planner__btn" data-roman-task-edit="' +
        escHtml(id) +
        '">Изм.</button>' +
        '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--danger" data-roman-task-delete="' +
        escHtml(id) +
        '">Удалить</button>';
      var itemClass =
        "roman-task-planner__item" +
        (columnDone ? " roman-task-planner__item--done" : "") +
        (important && !columnDone ? " roman-task-planner__item--flag-important" : "") +
        (doing && !columnDone ? " roman-task-planner__item--in-progress" : "");
      return (
        '<li class="' +
        itemClass +
        '" data-roman-task-id="' +
        escHtml(id) +
        '">' +
        '<div class="roman-task-planner__swipe-clip">' +
        '<div class="roman-task-planner__swipe-track">' +
        '<div class="roman-task-planner__swipe-front">' +
        '<div class="roman-task-planner__body">' +
        bodyContent +
        "</div></div>" +
        '<div class="roman-task-planner__swipe-actions">' +
        actionsHtml +
        "</div></div></div></li>"
      );
    }
    function romanPlannerCloseAllSwipes(exceptClip) {
      if (!boardEl) return;
      var tracks = boardEl.querySelectorAll(".roman-task-planner__swipe-track");
      var exceptId = "";
      for (var i = 0; i < tracks.length; i++) {
        var tr = tracks[i];
        var c = tr && tr.closest ? tr.closest(".roman-task-planner__swipe-clip") : null;
        if (exceptClip && c === exceptClip) {
          var exceptItem = c.closest(".roman-task-planner__item[data-roman-task-id]");
          exceptId = exceptItem ? String(exceptItem.getAttribute("data-roman-task-id") || "") : "";
          continue;
        }
        tr.style.transform = "";
        tr.classList.remove("roman-task-planner__swipe-track--open");
      }
      romanPlannerOpenSwipeTaskId = exceptId;
    }
    var romanPlannerSwipeActive = null;
    var romanPlannerReorderActive = null;
    var romanPlannerOpenSwipeTaskId = "";
    /** passive: false — иначе preventDefault на pointermove не гасит скролл во время горизонтального свайпа (iOS / часть WebView). */
    var romanPlannerSwipeDocListenerOpts = { capture: true, passive: false };
    var romanPlannerSwipeDocEndOpts = { capture: true, passive: true };
    /** Touch: в части WebView (TG / iOS) pointermove для касания не идёт, пока скроллит родитель — ведём жест через touch*. */
    var romanPlannerSwipeTouchDocMoveOpts = { capture: true, passive: false };
    var romanPlannerSwipeTouchDocEndOpts = { capture: true, passive: true };
    function romanPlannerApplyOpenForClip(clip) {
      var track = clip.querySelector(".roman-task-planner__swipe-track");
      var front = clip.querySelector(".roman-task-planner__swipe-front");
      var actionsEl = clip.querySelector(".roman-task-planner__swipe-actions");
      if (!track || !front) return null;
      var cw = clip.offsetWidth || 0;
      var openPx = cw > 0 ? Math.max(120, cw - 8) : 0;
      if (actionsEl && cw > 0) {
        actionsEl.style.width = openPx + "px";
        actionsEl.style.flex = "0 0 " + openPx + "px";
      }
      if (cw > 0) {
        track.style.width = cw + openPx + "px";
        front.style.flex = "0 0 " + cw + "px";
        if (actionsEl) {
          actionsEl.style.width = openPx + "px";
          actionsEl.style.flex = "0 0 " + openPx + "px";
        }
      }
      return { track: track, openPx: openPx };
    }
    function romanPlannerSwipeGetTx(track) {
      var m = (track.style.transform || "").match(/translateX\((-?[0-9.]+)px\)/);
      return m ? parseFloat(m[1], 10) || 0 : 0;
    }
    function romanPlannerSwipeSetTx(track, openPx, px) {
      var min = -openPx;
      var max = 0;
      var x = px;
      if (x < min) x = min;
      if (x > max) x = max;
      track.style.transform = "translateX(" + x + "px)";
    }
    function romanPlannerSwipeSnap(track, openPx) {
      var cur = romanPlannerSwipeGetTx(track);
      var frac = 0.35;
      var wasOpen = track.classList.contains("roman-task-planner__swipe-track--open");
      var item = track.closest ? track.closest(".roman-task-planner__item[data-roman-task-id]") : null;
      var taskId = item ? String(item.getAttribute("data-roman-task-id") || "") : "";
      if (wasOpen) {
        /* Уже открыто: закрываем, если увели полосу правее чем (1−frac) пути к 0 — иначе тот же порог, что «влево», ломал свайп вправо. */
        var closeThreshold = -openPx * (1 - frac);
        if (cur > closeThreshold) {
          track.classList.remove("roman-task-planner__swipe-track--open");
          romanPlannerSwipeSetTx(track, openPx, 0);
          if (romanPlannerOpenSwipeTaskId === taskId) romanPlannerOpenSwipeTaskId = "";
        } else {
          track.classList.add("roman-task-planner__swipe-track--open");
          romanPlannerSwipeSetTx(track, openPx, -openPx);
          romanPlannerOpenSwipeTaskId = taskId;
        }
      } else {
        var openThreshold = -openPx * frac;
        if (cur < openThreshold) {
          track.classList.add("roman-task-planner__swipe-track--open");
          romanPlannerSwipeSetTx(track, openPx, -openPx);
          romanPlannerOpenSwipeTaskId = taskId;
        } else {
          track.classList.remove("roman-task-planner__swipe-track--open");
          romanPlannerSwipeSetTx(track, openPx, 0);
          if (romanPlannerOpenSwipeTaskId === taskId) romanPlannerOpenSwipeTaskId = "";
        }
      }
    }
    function romanPlannerSwipeRemoveDocListeners() {
      if (!romanPlannerSwipeActive || !romanPlannerSwipeActive._docBound) return;
      var st = romanPlannerSwipeActive;
      if (st._touchDocBound) {
        document.removeEventListener("touchmove", romanPlannerSwipeTouchDocMove, romanPlannerSwipeTouchDocMoveOpts);
        document.removeEventListener("touchend", romanPlannerSwipeTouchDocEnd, romanPlannerSwipeTouchDocEndOpts);
        document.removeEventListener("touchcancel", romanPlannerSwipeTouchDocEnd, romanPlannerSwipeTouchDocEndOpts);
        st._touchDocBound = false;
      } else {
        document.removeEventListener("pointermove", romanPlannerSwipeDocMove, romanPlannerSwipeDocListenerOpts);
        document.removeEventListener("pointerup", romanPlannerSwipeDocEnd, romanPlannerSwipeDocEndOpts);
        document.removeEventListener("pointercancel", romanPlannerSwipeDocEnd, romanPlannerSwipeDocEndOpts);
      }
      if (st.clip && st._lostCapBound) {
        try {
          st.clip.removeEventListener("lostpointercapture", romanPlannerSwipeLostCap);
        } catch (eRm) {}
        st._lostCapBound = false;
      }
      st._docBound = false;
    }
    function romanPlannerSwipeEnd(doSnap) {
      var st = romanPlannerSwipeActive;
      if (!st) return;
      romanPlannerSwipeRemoveDocListeners();
      var pid = st.pointerId;
      var clip = st.clip;
      var track = st.track;
      var openPx = st.openPx;
      var hadCapture = st.pointerCaptureSet;
      romanPlannerSwipeActive = null;
      if (clip != null && pid != null && hadCapture) {
        try {
          clip.releasePointerCapture(pid);
        } catch (eRel) {}
      }
      if (doSnap && track) romanPlannerSwipeSnap(track, openPx);
    }
    function romanPlannerSwipeLostCap(evLost) {
      var st = romanPlannerSwipeActive;
      if (!st || !st.dragging || st.pointerId == null) return;
      if (evLost.pointerId !== st.pointerId) return;
      st.dragging = false;
      romanPlannerSwipeEnd(true);
    }
    function romanPlannerSwipeFindTouch(ev, id) {
      var i;
      for (i = 0; i < ev.touches.length; i++) {
        if (ev.touches[i].identifier === id) return ev.touches[i];
      }
      return null;
    }
    function romanPlannerSwipeFindTouchChanged(ev, id) {
      var i;
      for (i = 0; i < ev.changedTouches.length; i++) {
        if (ev.changedTouches[i].identifier === id) return ev.changedTouches[i];
      }
      return null;
    }
    /**
     * @param {number} clientX
     * @param {number} clientY
     * @param {Event} evPrevent — для preventDefault и setPointerCapture (PointerEvent); у TouchEvent capture не нужен.
     * @param {boolean} isMouse
     */
    function romanPlannerSwipeApplyMove(clientX, clientY, evPrevent, isMouse) {
      if (romanPlannerReorderActive && romanPlannerReorderActive.active) return;
      var st = romanPlannerSwipeActive;
      if (!st || !st.dragging) return;
      var dx = clientX - st.startX;
      var dy = clientY - st.startY;
      var adx = Math.abs(dx);
      var ady = Math.abs(dy);
      /** Пока палец не вышел из «мёртвой зоны», не трогаем скролл и не двигаем ряд — иначе preventDefault ломает вертикальный скролл списка. */
      var slop = isMouse ? 5 : 10;
      /** На тачскрине чуть шире допуск по диагонали — иначе вертикальный скролл списка часто «перебивает» свайп. */
      var tilt = isMouse ? 4 : 6;
      if (!st.swipeAxisLocked) {
        if (Math.max(adx, ady) < slop) return;
        /** Только явная вертикаль уступает скроллу списка; иначе — горизонтальный свайп (диагональ «влево» не обрываем). */
        if (ady > adx + tilt) {
          romanPlannerSwipeSetTx(st.track, st.openPx, st.baseTx);
          st.dragging = false;
          romanPlannerSwipeEnd(false);
          return;
        }
        st.swipeAxisLocked = true;
        if (romanPlannerReorderActive && !romanPlannerReorderActive.active) {
          romanPlannerReorderCancel();
        }
        if (!st.pointerCaptureSet && st.pointerId != null && evPrevent && typeof evPrevent.pointerId === "number") {
          st.pointerCaptureSet = true;
          try {
            st.clip.setPointerCapture(evPrevent.pointerId);
          } catch (eCap) {}
          if (!st._lostCapBound) {
            st._lostCapBound = true;
            try {
              st.clip.addEventListener("lostpointercapture", romanPlannerSwipeLostCap);
            } catch (eL) {}
          }
        }
      }
      try {
        evPrevent.preventDefault();
      } catch (ePm) {}
      romanPlannerSwipeSetTx(st.track, st.openPx, st.baseTx + dx);
    }
    function romanPlannerSwipeDocMove(ev) {
      var st = romanPlannerSwipeActive;
      if (!st || !st.dragging || ev.pointerId !== st.pointerId) return;
      var isMouse = ev.pointerType === "mouse";
      romanPlannerSwipeApplyMove(ev.clientX, ev.clientY, ev, isMouse);
    }
    function romanPlannerSwipeTouchDocMove(ev) {
      var reorder = romanPlannerReorderActive;
      if (reorder && reorder.active && reorder.touchId != null) {
        var dragTouch = romanPlannerSwipeFindTouch(ev, reorder.touchId);
        if (dragTouch) {
          try { ev.preventDefault(); } catch (eReorderTouchPd) {}
          romanPlannerReorderMoveTo(dragTouch.clientY);
          return;
        }
      }
      var st = romanPlannerSwipeActive;
      if (!st || !st.dragging || st.touchId == null) return;
      var touch = romanPlannerSwipeFindTouch(ev, st.touchId);
      if (!touch) return;
      romanPlannerSwipeApplyMove(touch.clientX, touch.clientY, ev, false);
    }
    function romanPlannerSwipeDocEnd(ev) {
      var st = romanPlannerSwipeActive;
      if (!st || ev.pointerId !== st.pointerId) return;
      if (!st.dragging) return;
      st.dragging = false;
      romanPlannerSwipeEnd(true);
    }
    function romanPlannerSwipeTouchDocEnd(ev) {
      var reorder = romanPlannerReorderActive;
      if (reorder && reorder.touchId != null && romanPlannerSwipeFindTouchChanged(ev, reorder.touchId)) {
        var wasReorderActive = reorder.active;
        var keepReorderScrollTop = reorder.keepScrollTop;
        var keepReorderPageScrollTop = reorder.keepPageScrollTop;
        if (wasReorderActive) {
          romanPlannerReorderClearTimer();
          reorder.item.classList.remove("roman-task-planner__item--dragging");
          if (listAll) listAll.classList.remove("roman-task-planner__list--dragging");
          document.body.classList.remove("tasks-drag-active");
          romanPlannerReorderActive = null;
          romanPlannerReorderSaveDomOrder(keepReorderScrollTop, keepReorderPageScrollTop);
          if (romanPlannerSwipeActive) romanPlannerSwipeEnd(false);
          return;
        }
        romanPlannerReorderCancel();
      }
      var st = romanPlannerSwipeActive;
      if (!st || st.touchId == null) return;
      if (!romanPlannerSwipeFindTouchChanged(ev, st.touchId)) return;
      if (!st.dragging) return;
      st.dragging = false;
      romanPlannerSwipeEnd(true);
    }
    function romanPlannerSwipeStartOnClip(clip, clientX, clientY, pointerId, touchId) {
      if (romanPlannerReorderActive && romanPlannerReorderActive.active) return false;
      romanPlannerCloseAllSwipes(clip);
      var layout = romanPlannerApplyOpenForClip(clip);
      if (!layout) return false;
      var track = layout.track;
      var openPx = layout.openPx;
      var useTouch = touchId != null;
      romanPlannerSwipeActive = {
        clip: clip,
        track: track,
        openPx: openPx,
        pointerId: pointerId,
        touchId: touchId,
        startX: clientX,
        startY: clientY,
        baseTx: romanPlannerSwipeGetTx(track),
        dragging: true,
        swipeAxisLocked: false,
        pointerCaptureSet: false,
        _lostCapBound: false,
        _docBound: true,
        _touchDocBound: useTouch,
      };
      if (useTouch) {
        document.addEventListener("touchmove", romanPlannerSwipeTouchDocMove, romanPlannerSwipeTouchDocMoveOpts);
        document.addEventListener("touchend", romanPlannerSwipeTouchDocEnd, romanPlannerSwipeTouchDocEndOpts);
        document.addEventListener("touchcancel", romanPlannerSwipeTouchDocEnd, romanPlannerSwipeTouchDocEndOpts);
      } else {
        document.addEventListener("pointermove", romanPlannerSwipeDocMove, romanPlannerSwipeDocListenerOpts);
        document.addEventListener("pointerup", romanPlannerSwipeDocEnd, romanPlannerSwipeDocEndOpts);
        document.addEventListener("pointercancel", romanPlannerSwipeDocEnd, romanPlannerSwipeDocEndOpts);
      }
      return true;
    }
    function romanPlannerReorderClearTimer() {
      if (romanPlannerReorderActive && romanPlannerReorderActive.timer) {
        clearTimeout(romanPlannerReorderActive.timer);
        romanPlannerReorderActive.timer = null;
      }
    }
    function romanPlannerReorderItemAt(clientY, draggingItem) {
      var items = Array.prototype.slice.call(listAll.querySelectorAll(".roman-task-planner__item[data-roman-task-id]"));
      var closest = { offset: Number.NEGATIVE_INFINITY, element: null };
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item === draggingItem) continue;
        var rect = item.getBoundingClientRect();
        var offset = clientY - rect.top - rect.height / 2;
        if (offset < 0 && offset > closest.offset) closest = { offset: offset, element: item };
      }
      return closest.element;
    }
    function romanPlannerReorderMoveTo(clientY) {
      var st = romanPlannerReorderActive;
      if (!st || !st.active || !st.item) return;
      var beforeEl = romanPlannerReorderItemAt(clientY, st.item);
      if (beforeEl) listAll.insertBefore(st.item, beforeEl);
      else listAll.appendChild(st.item);
    }
    function romanPlannerReorderSaveDomOrder(keepScrollTop, keepPageScrollTop) {
      var tasks = loadTasks();
      var byId = {};
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i] && tasks[i].id != null) byId[String(tasks[i].id)] = tasks[i];
      }
      var cards = Array.prototype.slice.call(listAll.querySelectorAll(".roman-task-planner__item[data-roman-task-id]"));
      var order = 0;
      for (var j = 0; j < cards.length; j++) {
        var id = cards[j].getAttribute("data-roman-task-id");
        if (!byId[id]) continue;
        if (plannerTab === "important") byId[id].important = true;
        if (plannerTab === "normal") byId[id].important = false;
        byId[id].plannerOrder = order * PLANNER_ORDER_STEP;
        order++;
      }
      saveTasks(tasks);
      renderTasks();
      function restore() {
        if (listAll) listAll.scrollTop = keepScrollTop || 0;
        var se = document.scrollingElement || document.documentElement || document.body;
        if (se) se.scrollTop = keepPageScrollTop || 0;
      }
      restore();
      try { requestAnimationFrame(restore); } catch (eRaf) { setTimeout(restore, 0); }
    }
    function romanPlannerReorderCancel() {
      romanPlannerReorderClearTimer();
      if (romanPlannerReorderActive && romanPlannerReorderActive.item) {
        romanPlannerReorderActive.item.classList.remove("roman-task-planner__item--dragging");
        try {
          if (romanPlannerReorderActive.pointerId != null) {
            romanPlannerReorderActive.item.releasePointerCapture(romanPlannerReorderActive.pointerId);
          }
        } catch (eRel) {}
      }
      if (listAll) listAll.classList.remove("roman-task-planner__list--dragging");
      document.body.classList.remove("tasks-drag-active");
      romanPlannerReorderActive = null;
    }
    function romanPlannerReorderStart() {
      var st = romanPlannerReorderActive;
      if (!st || st.active || !st.item) return;
      romanPlannerReorderClearTimer();
      if (romanPlannerSwipeActive) romanPlannerSwipeEnd(false);
      romanPlannerCloseAllSwipes();
      st.active = true;
      st.item.classList.add("roman-task-planner__item--dragging");
      listAll.classList.add("roman-task-planner__list--dragging");
      document.body.classList.add("tasks-drag-active");
    }
    function romanPlannerReorderPointerDown(ev) {
      if (!listAll || plannerTab === "done") return;
      if (ev.pointerType === "mouse" && ev.button !== 0) return;
      if (romanPlannerReorderActive) return;
      var t = ev.target;
      if (!t || !t.closest) return;
      if (t.closest(".roman-task-planner__btn, .roman-task-planner__edit-ta, input, textarea, select, a")) return;
      var item = t.closest(".roman-task-planner__item[data-roman-task-id]");
      if (!item || !listAll.contains(item)) return;
      romanPlannerReorderActive = {
        item: item,
        pointerId: ev.pointerId,
        startX: ev.clientX,
        startY: ev.clientY,
        startedAt: Date.now(),
        active: false,
        timer: setTimeout(romanPlannerReorderStart, 220),
        keepScrollTop: listAll.scrollTop || 0,
        keepPageScrollTop:
          (document.scrollingElement && document.scrollingElement.scrollTop) ||
          (document.documentElement && document.documentElement.scrollTop) ||
          (document.body && document.body.scrollTop) ||
          0,
      };
      try { item.setPointerCapture(ev.pointerId); } catch (eCap) {}
    }
    function romanPlannerReorderPointerMove(ev) {
      var st = romanPlannerReorderActive;
      if (!st || st.pointerId !== ev.pointerId) return;
      var dx = ev.clientX - st.startX;
      var dy = ev.clientY - st.startY;
      if (!st.active) {
        var elapsed = Date.now() - st.startedAt;
        if (Math.abs(dx) > 14 || (Math.abs(dy) > 14 && elapsed < 180)) {
          romanPlannerReorderCancel();
          return;
        }
        return;
      }
      try { ev.preventDefault(); } catch (ePd) {}
      romanPlannerReorderMoveTo(ev.clientY);
    }
    function romanPlannerReorderPointerUp(ev) {
      var st = romanPlannerReorderActive;
      if (!st || st.pointerId !== ev.pointerId) return;
      var wasActive = st.active;
      var keepScrollTop = st.keepScrollTop;
      var keepPageScrollTop = st.keepPageScrollTop;
      if (wasActive) {
        try { ev.preventDefault(); } catch (ePd) {}
        romanPlannerReorderClearTimer();
        st.item.classList.remove("roman-task-planner__item--dragging");
        try { st.item.releasePointerCapture(ev.pointerId); } catch (eRel) {}
        listAll.classList.remove("roman-task-planner__list--dragging");
        document.body.classList.remove("tasks-drag-active");
        romanPlannerReorderActive = null;
        romanPlannerReorderSaveDomOrder(keepScrollTop, keepPageScrollTop);
        return;
      }
      romanPlannerReorderCancel();
    }
    function romanPlannerListTouchStart(ev) {
      if (!listAll || !boardEl) return;
      if (ev.touches.length !== 1) return;
      var touch = ev.touches[0];
      var t = ev.target;
      if (!t || !t.closest) return;
      var clip = t.closest(".roman-task-planner__swipe-clip");
      if (!clip || !listAll.contains(clip)) return;
      if (t.closest(".roman-task-planner__btn")) return;
      if (t.closest(".roman-task-planner__edit-ta")) return;
      if (romanPlannerSwipeActive) return;
      if (romanPlannerReorderActive && romanPlannerReorderActive.active) return;
      var item = t.closest(".roman-task-planner__item[data-roman-task-id]");
      if (!romanPlannerReorderActive && item && listAll.contains(item) && plannerTab !== "done") {
        romanPlannerReorderActive = {
          item: item,
          pointerId: null,
          touchId: touch.identifier,
          startX: touch.clientX,
          startY: touch.clientY,
          startedAt: Date.now(),
          active: false,
          timer: setTimeout(romanPlannerReorderStart, 220),
          keepScrollTop: listAll.scrollTop || 0,
          keepPageScrollTop:
            (document.scrollingElement && document.scrollingElement.scrollTop) ||
            (document.documentElement && document.documentElement.scrollTop) ||
            (document.body && document.body.scrollTop) ||
            0,
        };
      }
      if (romanPlannerReorderActive && !romanPlannerReorderActive.active) {
        romanPlannerReorderActive.touchId = touch.identifier;
      }
      romanPlannerSwipeStartOnClip(clip, touch.clientX, touch.clientY, null, touch.identifier);
    }
    function romanPlannerListPointerDown(ev) {
      if (!listAll || !boardEl) return;
      var t = ev.target;
      if (!t || !t.closest) return;
      var clip = t.closest(".roman-task-planner__swipe-clip");
      if (!clip || !listAll.contains(clip)) return;
      if (t.closest(".roman-task-planner__btn")) return;
      if (t.closest(".roman-task-planner__edit-ta")) return;
      if (ev.pointerType === "mouse" && ev.button !== 0) return;
      if (romanPlannerSwipeActive) return;
      if (romanPlannerReorderActive && romanPlannerReorderActive.active) return;
      /** Касание уже обработано touchstart (там touchmove с passive:false). */
      if (ev.pointerType === "touch") return;
      try {
        ev.preventDefault();
      } catch (ePd) {}
      romanPlannerSwipeStartOnClip(clip, ev.clientX, ev.clientY, ev.pointerId, null);
    }
    function initRomanPlannerSwipeRows() {
      if (!boardEl) return;
      if (listAll && listAll.dataset.romanPlannerSwipeDelegation !== "1") {
        listAll.dataset.romanPlannerSwipeDelegation = "1";
        listAll.addEventListener("pointerdown", romanPlannerReorderPointerDown, true);
        listAll.addEventListener("pointermove", romanPlannerReorderPointerMove, true);
        listAll.addEventListener("pointerup", romanPlannerReorderPointerUp, true);
        listAll.addEventListener("pointercancel", romanPlannerReorderCancel, true);
        listAll.addEventListener("touchstart", romanPlannerListTouchStart, { capture: true, passive: true });
        listAll.addEventListener("pointerdown", romanPlannerListPointerDown);
        listAll.addEventListener(
          "dragstart",
          function (eDg) {
            if (eDg.target && eDg.target.closest && eDg.target.closest(".roman-task-planner__swipe-clip")) eDg.preventDefault();
          },
          true
        );
      }
      var clips = boardEl.querySelectorAll(".roman-task-planner__swipe-clip");
      for (var c = 0; c < clips.length; c++) {
        romanPlannerApplyOpenForClip(clips[c]);
      }
    }
    function romanPlannerRestoreOpenSwipe() {
      if (!romanPlannerOpenSwipeTaskId || !boardEl) return;
      var item = boardEl.querySelector(
        '.roman-task-planner__item[data-roman-task-id="' + cssEscape(romanPlannerOpenSwipeTaskId) + '"]'
      );
      var clip = item ? item.querySelector(".roman-task-planner__swipe-clip") : null;
      if (!clip) {
        romanPlannerOpenSwipeTaskId = "";
        return;
      }
      var layout = romanPlannerApplyOpenForClip(clip);
      if (!layout || !layout.track) {
        romanPlannerOpenSwipeTaskId = "";
        return;
      }
      layout.track.classList.add("roman-task-planner__swipe-track--open");
      romanPlannerSwipeSetTx(layout.track, layout.openPx, -layout.openPx);
    }
    function renderTasks() {
      setPlannerTabUi();
      var raw = loadTasks();
      var activeRaw = raw.filter(function (x) {
        return !x.done;
      });
      var importantActive = sortBucketActiveTasks(
        activeRaw.filter(function (x) {
          return !!x.important;
        })
      );
      var normalActive = sortBucketActiveTasks(
        activeRaw.filter(function (x) {
          return !x.important;
        })
      );
      var doneCol = sortTasksByCreatedAsc(raw.filter(function (x) {
        return !!x.done;
      }));
      var parts = [];
      parts.push('<li class="roman-task-planner__list-hint">Свайп влево открывает меню действий</li>');
      if (plannerTab === "important") {
        if (importantActive.length) {
          for (var ai = 0; ai < importantActive.length; ai++) {
            parts.push(
              renderTaskRow(importantActive[ai], false, ai + 1, {
                canUp: ai > 0,
                canDown: ai < importantActive.length - 1,
              })
            );
          }
        } else {
          parts.push(
            '<li class="roman-task-planner__empty roman-task-planner__empty--stacked">Нет важных задач</li>'
          );
        }
      } else if (plannerTab === "normal") {
        if (normalActive.length) {
          for (var ni = 0; ni < normalActive.length; ni++) {
            parts.push(
              renderTaskRow(normalActive[ni], false, ni + 1, {
                canUp: ni > 0,
                canDown: ni < normalActive.length - 1,
              })
            );
          }
        } else {
          parts.push(
            '<li class="roman-task-planner__empty roman-task-planner__empty--stacked">Нет неважных задач</li>'
          );
        }
      } else {
        if (doneCol.length) {
          for (var di = 0; di < doneCol.length; di++) {
            parts.push(renderTaskRow(doneCol[di], true, di + 1, null));
          }
        } else {
          parts.push(
            '<li class="roman-task-planner__empty roman-task-planner__empty--stacked">Нет выполненных</li>'
          );
        }
      }
      listAll.innerHTML = parts.join("");
      initRomanPlannerSwipeRows();
      romanPlannerRestoreOpenSwipe();
      updatePlannerHintText(raw);
    }
    function openPlannerModal() {
      if (!isPlannerAllowedUser() || !plannerModal) return;
      romanPlannerDirtySinceOpen = false;
      plannerTab = readPlannerTabStorage();
      renderTasks();
      plannerModal.setAttribute("aria-hidden", "false");
      romanPlannerPullFromServer();
      romanPlannerStartLiveSync();
      try {
        var raf = window.requestAnimationFrame || function (fn) {
          setTimeout(fn, 0);
        };
        raf(function () {
          resizePlannerComposer();
        });
      } catch (eRz) {}
    }
    window.pokerOpenRomanTaskPlanner = openPlannerModal;
    function closePlannerModal() {
      romanPlannerStopLiveSync();
      if (plannerModal) plannerModal.setAttribute("aria-hidden", "true");
      if (plannerModal) plannerModal.classList.remove("roman-task-planner-modal--keyboard");
      try {
        var ae = document.activeElement;
        if (ae && plannerModal && plannerModal.contains(ae) && ae.blur) ae.blur();
      } catch (eB) {}
      try {
        document.documentElement.classList.remove("gazette-comment-keyboard");
      } catch (eGk) {}
      try {
        if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") {
          window.__pokerFinalizeChatKeyboardDismiss();
        }
      } catch (eKb) {}
    }
    function syncVisibility() {
      if (!isPlannerAllowedUser()) {
        openBtn.classList.remove("welcome-planner-icon--hidden");
        closePlannerModal();
        return;
      }
      openBtn.classList.remove("welcome-planner-icon--hidden");
      if (plannerModal.getAttribute("aria-hidden") === "false") {
        renderTasks();
        romanPlannerPullFromServer();
        romanPlannerStartLiveSync();
      }
    }
    try {
      document.addEventListener("visibilitychange", function () {
        if (typeof document.visibilityState !== "undefined" && document.visibilityState !== "visible") return;
        if (!plannerModal || plannerModal.getAttribute("aria-hidden") !== "false") return;
        romanPlannerPullAmbient();
      });
    } catch (eVis) {}
    try {
      window.addEventListener("pageshow", function () {
        if (!plannerModal || plannerModal.getAttribute("aria-hidden") !== "false") return;
        romanPlannerPullAmbient();
      });
    } catch (ePs) {}
    if (tabImportantBtn) {
      tabImportantBtn.addEventListener("click", function () {
        plannerTab = "important";
        writePlannerTabStorage("important");
        renderTasks();
      });
    }
    if (tabNormalBtn) {
      tabNormalBtn.addEventListener("click", function () {
        plannerTab = "normal";
        writePlannerTabStorage("normal");
        renderTasks();
      });
    }
    if (tabDoneBtn) {
      tabDoneBtn.addEventListener("click", function () {
        plannerTab = "done";
        writePlannerTabStorage("done");
        renderTasks();
      });
    }
    openBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (!isPlannerAllowedUser()) return;
      openPlannerModal();
    });
    if (plannerBackdrop) {
      plannerBackdrop.addEventListener("click", function () {
        closePlannerModal();
      });
    }
    if (plannerClose) {
      plannerClose.addEventListener("click", function () {
        closePlannerModal();
      });
    }
    (function bindPlannerModalKeyboardRepair() {
      if (!plannerModal) return;
      var blurTimer = null;
      function updatePlannerKeyboardLayout() {
        var vv = window.visualViewport || null;
        var h = vv && vv.height ? Math.round(vv.height) : window.innerHeight || 0;
        var top = vv && vv.offsetTop ? Math.round(vv.offsetTop) : 0;
        if (h > 0) plannerModal.style.setProperty("--roman-planner-viewport-height", h + "px");
        plannerModal.style.setProperty("--roman-planner-viewport-top", top + "px");
      }
      function keepPlannerFieldVisible(field) {
        if (!field || !plannerModal.contains(field)) return;
        updatePlannerKeyboardLayout();
        try {
          field.scrollIntoView({ block: "center", inline: "nearest", behavior: "smooth" });
        } catch (eSv) {
          try { field.scrollIntoView(false); } catch (eSv2) {}
        }
      }
      function scheduleKeepPlannerFieldVisible(field) {
        keepPlannerFieldVisible(field);
        setTimeout(function () { keepPlannerFieldVisible(field); }, 180);
        setTimeout(function () { keepPlannerFieldVisible(field); }, 420);
      }
      function scheduleFinalizePlannerKb() {
        clearTimeout(blurTimer);
        blurTimer = setTimeout(function () {
          blurTimer = null;
          var active = document.activeElement;
          var kbField =
            active &&
            active.classList &&
            (active.classList.contains("roman-task-planner__input") ||
              active.classList.contains("roman-task-planner__edit-ta"));
          if (kbField && plannerModal.contains(active)) return;
          plannerModal.classList.remove("roman-task-planner-modal--keyboard");
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
      plannerModal.addEventListener(
        "focusin",
        function (ev) {
          var t = ev.target;
          if (
            !t ||
            !t.classList ||
            (!t.classList.contains("roman-task-planner__input") &&
              !t.classList.contains("roman-task-planner__edit-ta"))
          ) {
            return;
          }
          if (!plannerModal.contains(t)) return;
          try {
            document.documentElement.classList.add("gazette-comment-keyboard");
          } catch (eIn) {}
          plannerModal.classList.add("roman-task-planner-modal--keyboard");
          scheduleKeepPlannerFieldVisible(t);
        },
        true
      );
      plannerModal.addEventListener(
        "focusout",
        function (ev) {
          var t = ev.target;
          if (
            !t ||
            !t.classList ||
            (!t.classList.contains("roman-task-planner__input") &&
              !t.classList.contains("roman-task-planner__edit-ta"))
          ) {
            return;
          }
          if (!plannerModal.contains(t)) return;
          scheduleFinalizePlannerKb();
        },
        true
      );
      try {
        if (window.visualViewport) {
          window.visualViewport.addEventListener("resize", function () {
            var active = document.activeElement;
            var kbField =
              active &&
              active.classList &&
              (active.classList.contains("roman-task-planner__input") ||
                active.classList.contains("roman-task-planner__edit-ta"));
            if (!kbField || !plannerModal.contains(active)) return;
            scheduleKeepPlannerFieldVisible(active);
          });
        }
      } catch (eVv) {}
    })();
    window.addEventListener("poker-telegram-auth", function () {
      syncVisibility();
    });
    window.__pokerSyncRomanTaskPlanner = syncVisibility;
    input.addEventListener("input", function () {
      resizePlannerComposer();
    });
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!isPlannerAllowedUser()) return;
      var text = input.value ? input.value.trim() : "";
      if (!text) return;
      var wantImportant = !!(importantCheckbox && importantCheckbox.checked);
      var tasks = loadTasks();
      tasks.push({
        id: "t_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9),
        text: text,
        done: false,
        doing: false,
        important: wantImportant,
        createdAt: Date.now(),
        plannerOrder: nextPlannerOrderInBucket(tasks, wantImportant),
      });
      saveTasks(tasks);
      input.value = "";
      if (importantCheckbox) importantCheckbox.checked = false;
      if (wantImportant && plannerTab !== "important") {
        plannerTab = "important";
        writePlannerTabStorage("important");
        setPlannerTabUi();
      }
      renderTasks();
      resizePlannerComposer();
    });
    boardEl.addEventListener("click", function (ev) {
      if (!isPlannerAllowedUser()) return;
      var t = ev.target;
      if (!t || !t.closest) return;
      var setDoing = t.closest("[data-roman-task-set-doing]");
      if (setDoing) {
        var idSd = setDoing.getAttribute("data-roman-task-set-doing");
        var tasksSd = loadTasks();
        var ixSd = findTaskById(tasksSd, idSd);
        if (ixSd >= 0 && !tasksSd[ixSd].done) {
          tasksSd[ixSd].doing = true;
          saveTasks(tasksSd);
          renderTasks();
        }
        return;
      }
      var clearDoing = t.closest("[data-roman-task-clear-doing]");
      if (clearDoing) {
        var idCd = clearDoing.getAttribute("data-roman-task-clear-doing");
        var tasksCd = loadTasks();
        var ixCd = findTaskById(tasksCd, idCd);
        if (ixCd >= 0) {
          tasksCd[ixCd].doing = false;
          saveTasks(tasksCd);
          renderTasks();
        }
        return;
      }
      var setImp = t.closest("[data-roman-task-set-important]");
      if (setImp) {
        var idSi = setImp.getAttribute("data-roman-task-set-important");
        var tasksSi = loadTasks();
        var ixSi = findTaskById(tasksSi, idSi);
        if (ixSi >= 0 && !tasksSi[ixSi].done) {
          tasksSi[ixSi].important = true;
          tasksSi[ixSi].plannerOrder = nextPlannerOrderInBucket(tasksSi, true);
          saveTasks(tasksSi);
          renderTasks();
        }
        return;
      }
      var clearImp = t.closest("[data-roman-task-clear-important]");
      if (clearImp) {
        var idCi = clearImp.getAttribute("data-roman-task-clear-important");
        var tasksCi = loadTasks();
        var ixCi = findTaskById(tasksCi, idCi);
        if (ixCi >= 0) {
          tasksCi[ixCi].important = false;
          tasksCi[ixCi].plannerOrder = nextPlannerOrderInBucket(tasksCi, false);
          saveTasks(tasksCi);
          renderTasks();
        }
        return;
      }
      var setStage = t.closest("[data-roman-task-set-stage]");
      if (setStage) {
        var idSt = setStage.getAttribute("data-roman-task-set-stage");
        var nextStage = setStage.getAttribute("data-roman-task-stage") || "";
        var tasksSt = loadTasks();
        var ixSt = findTaskById(tasksSt, idSt);
        if (ixSt >= 0 && !tasksSt[ixSt].done && (nextStage === "waiting" || nextStage === "checking")) {
          tasksSt[ixSt].stage = nextStage;
          saveTasks(tasksSt);
          renderTasks();
        }
        return;
      }
      var clearStage = t.closest("[data-roman-task-clear-stage]");
      if (clearStage) {
        var idCs = clearStage.getAttribute("data-roman-task-clear-stage");
        var tasksCs = loadTasks();
        var ixCs = findTaskById(tasksCs, idCs);
        if (ixCs >= 0) {
          delete tasksCs[ixCs].stage;
          saveTasks(tasksCs);
          renderTasks();
        }
        return;
      }
      var moveUpEl = t.closest("[data-roman-task-move-up]");
      if (moveUpEl) {
        if (moveUpEl.disabled) return;
        var idMu = moveUpEl.getAttribute("data-roman-task-move-up");
        movePlannerTaskInList(idMu, -1);
        return;
      }
      var moveDownEl = t.closest("[data-roman-task-move-down]");
      if (moveDownEl) {
        if (moveDownEl.disabled) return;
        var idMd = moveDownEl.getAttribute("data-roman-task-move-down");
        movePlannerTaskInList(idMd, 1);
        return;
      }
      var completeBtn = t.closest("[data-roman-task-complete]");
      if (completeBtn) {
        var idC = completeBtn.getAttribute("data-roman-task-complete");
        var tasksC = loadTasks();
        var ixC = findTaskById(tasksC, idC);
        if (ixC >= 0) {
          tasksC[ixC].done = true;
          saveTasks(tasksC);
          renderTasks();
        }
        return;
      }
      var uncompleteBtn = t.closest("[data-roman-task-uncomplete]");
      if (uncompleteBtn) {
        var idU = uncompleteBtn.getAttribute("data-roman-task-uncomplete");
        var tasksU = loadTasks();
        var ixU = findTaskById(tasksU, idU);
        if (ixU >= 0) {
          tasksU[ixU].done = false;
          tasksU[ixU].plannerOrder = nextPlannerOrderInBucket(tasksU, !!tasksU[ixU].important);
          saveTasks(tasksU);
          renderTasks();
        }
        return;
      }
      var del = t.closest("[data-roman-task-delete]");
      if (del) {
        var idD = del.getAttribute("data-roman-task-delete");
        if (!confirm("Удалить задачу?")) return;
        var tasksD = loadTasks();
        var ixD = findTaskById(tasksD, idD);
        if (ixD >= 0) {
          tasksD.splice(ixD, 1);
          saveTasks(tasksD);
          renderTasks();
        }
        return;
      }
      var saveB = t.closest("[data-roman-task-save]");
      if (saveB) {
        var idS = saveB.getAttribute("data-roman-task-save");
        var liS = saveB.closest(".roman-task-planner__item");
        var taS = liS && liS.querySelector(".roman-task-planner__edit-ta");
        var newText = taS && taS.value ? taS.value.trim() : "";
        if (!newText) {
          var tg0 = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tg0 && tg0.showAlert) tg0.showAlert("Введите текст задачи.");
          else alert("Введите текст задачи.");
          return;
        }
        var tasksS = loadTasks();
        var ixS = findTaskById(tasksS, idS);
        if (ixS >= 0) {
          tasksS[ixS].text = newText;
          saveTasks(tasksS);
          renderTasks();
        }
        return;
      }
      var cancelB = t.closest("[data-roman-task-cancel]");
      if (cancelB) {
        renderTasks();
        return;
      }
      var edit = t.closest("[data-roman-task-edit]");
      if (!edit) return;
      var idE = edit.getAttribute("data-roman-task-edit");
      var li = edit.closest(".roman-task-planner__item");
      if (!li || li.getAttribute("data-roman-editing") === "1") return;
      var tasksE = loadTasks();
      var ixE = findTaskById(tasksE, idE);
      if (ixE < 0) return;
      var body = li.querySelector(".roman-task-planner__body");
      if (!body) return;
      var editClip = li.querySelector(".roman-task-planner__swipe-clip");
      romanPlannerCloseAllSwipes();
      if (editClip) romanPlannerApplyOpenForClip(editClip);
      li.setAttribute("data-roman-editing", "1");
      var cur = tasksE[ixE].text != null ? String(tasksE[ixE].text) : "";
      body.innerHTML =
        '<textarea class="roman-task-planner__edit-ta" maxlength="500" aria-label="Редактирование задачи"></textarea>' +
        '<div class="roman-task-planner__edit-actions">' +
        '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--primary" data-roman-task-save="' +
        escHtml(idE) +
        '">Сохранить</button>' +
        '<button type="button" class="roman-task-planner__btn" data-roman-task-cancel="' +
        escHtml(idE) +
        '">Отмена</button>' +
        "</div>";
      var taEd = body.querySelector(".roman-task-planner__edit-ta");
      if (taEd) taEd.value = cur;
      if (editClip) romanPlannerApplyOpenForClip(editClip);
      try {
        taEd.focus();
      } catch (eFoc) {}
    });
    syncVisibility();
    updatePlannerHintText();
    resizePlannerComposer();
  }
  window.pokerInitRomanGazetteTaskPlanner = initRomanGazetteTaskPlanner;
  initRomanGazetteTaskPlanner();
  if (!window.__pokerRomanPlannerDelegatedOpenBound) {
    window.__pokerRomanPlannerDelegatedOpenBound = true;
    document.addEventListener(
      "click",
      function (ev) {
        var btn = ev.target && ev.target.closest ? ev.target.closest("#romanTaskPlannerOpenBtn") : null;
        if (!btn) return;
        ev.preventDefault();
        ev.stopPropagation();
        var ensure =
          typeof window.pokerEnsureGlobalModalsHtml === "function"
            ? window.pokerEnsureGlobalModalsHtml()
            : Promise.resolve(true);
        Promise.resolve(ensure)
          .then(function () {
            if (typeof window.pokerInitRomanGazetteTaskPlanner === "function") {
              window.pokerInitRomanGazetteTaskPlanner();
            }
            if (typeof window.pokerOpenRomanTaskPlanner === "function") {
              window.pokerOpenRomanTaskPlanner();
            }
          })
          .catch(function () {});
      },
      true
    );
  }

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

  var startParam = pokerReadTelegramLaunchStartParam();
  startParam = pokerNormalizeWebAppStartParam(startParam);
  function parseStreamsRoomIdFromStartParam(val) {
    if (!val) return null;
    val = String(val).trim();
    if (!val) return null;
    var m =
      val.match(/^streams_(\d{6})$/) ||
      val.match(/startapp=streams_(\d{6})/i);
    if (m && m[1]) return m[1];
    if (/^\d{6}$/.test(val)) return val;
    return null;
  }
  /**
   * Один вход для deep link: Telegram start_param и PWA/браузер ?startapp=… (+ ?with= для club_chat_dm).
   * Раньше почти всё обрабатывалось только из Telegram — ссылки с query открывали главную.
   */
  function pokerApplyStartAppDeepLink(startParamRaw, opts) {
    opts = opts || {};
    var withPeerOpt = opts.withPeer != null ? String(opts.withPeer).trim() : "";
    var startParam = startParamRaw != null ? String(startParamRaw).trim() : "";
    if (!startParam) return;
    if (startParam === "news" || startParam.indexOf("news_") === 0) {
      var articleNum = startParam === "news" ? undefined : parseInt(startParam.replace("news_", ""), 10);
      if (startParam !== "news" && (Number.isNaN(articleNum) || articleNum < 0)) articleNum = undefined;
      setTimeout(function () {
        if (typeof openGazette === "function") openGazette("news", articleNum);
      }, 300);
      return;
    }
    if (startParam === "winter_rating") {
      setTimeout(function () {
        if (typeof setView === "function") setView("winter-rating");
      }, 0);
      return;
    }
    if (startParam === "spring_rating") {
      setTimeout(function () {
        if (typeof setView === "function") setView("spring-rating");
      }, 0);
      return;
    }
    if (startParam === "spring_rating_league_1" || startParam === "spring_rating_league_2") {
      var leagueNum = startParam === "spring_rating_league_1" ? "1" : "2";
      setTimeout(function () {
        if (typeof setView === "function") setView("spring-rating");
        setTimeout(function () {
          if (typeof window.switchSpringRatingMainTab === "function") window.switchSpringRatingMainTab(leagueNum);
        }, 400);
      }, 0);
      return;
    }
    if (startParam.indexOf("winter_rating_player_") === 0) {
      var playerNickW = decodeURIComponent(startParam.replace("winter_rating_player_", "").replace(/\+/g, " "));
      if (playerNickW) {
        setTimeout(function () {
          if (typeof setView === "function") setView("winter-rating");
          setTimeout(function () {
            if (typeof openWinterRatingPlayerModal === "function") openWinterRatingPlayerModal(playerNickW);
          }, 400);
        }, 0);
      }
      return;
    }
    if (startParam.indexOf("spring_rating_player_") === 0) {
      var playerNickS = decodeURIComponent(startParam.replace("spring_rating_player_", "").replace(/\+/g, " "));
      if (playerNickS) {
        setTimeout(function () {
          if (typeof setView === "function") setView("spring-rating");
          setTimeout(function () {
            if (typeof openWinterRatingPlayerModal === "function") openWinterRatingPlayerModal(playerNickS);
          }, 400);
        }, 0);
      }
      return;
    }
    if (startParam.indexOf("rating_") === 0 && startParam.indexOf("spring_rating_date_") !== 0) {
      var dateParamR = startParam.replace("rating_", "").replace(/_/g, ".");
      setTimeout(function () {
        if (typeof setView === "function") setView("winter-rating");
        setTimeout(function () {
          if (typeof window.openWinterRatingDatePanel === "function") window.openWinterRatingDatePanel(dateParamR);
        }, 400);
      }, 0);
      return;
    }
    if (startParam.indexOf("spring_rating_date_") === 0) {
      var dateParamSp = startParam.replace("spring_rating_date_", "").replace(/_/g, ".");
      setTimeout(function () {
        if (typeof setView === "function") setView("spring-rating");
        setTimeout(function () {
          if (typeof window.openWinterRatingDatePanel === "function") window.openWinterRatingDatePanel(dateParamSp);
        }, 400);
      }, 0);
      return;
    }
    if (
      startParam === "rating_top_past" ||
      startParam === "rating_top_current" ||
      startParam === "rating_top_february" ||
      startParam === "rating_top_mar"
    ) {
      var ratingTopKind =
        startParam === "rating_top_current" ? "current" : startParam === "rating_top_february" ? "feb" : startParam === "rating_top_mar" ? "feb" : "past";
      var viewForTop = startParam === "rating_top_mar" ? "spring-rating" : "winter-rating";
      setTimeout(function () {
        if (typeof setView === "function") setView(viewForTop);
        setTimeout(function () {
          if (typeof window.openWinterRatingWeekTopModal === "function") window.openWinterRatingWeekTopModal(ratingTopKind);
        }, 350);
      }, 0);
      return;
    }
    if (startParam === "daily_prediction") {
      setTimeout(function () {
        if (typeof setView === "function") setView("home");
        setTimeout(function () {
          if (typeof openDailyPredictionModal === "function") openDailyPredictionModal();
        }, 400);
      }, 0);
      return;
    }
    var hallSecStart = resolveHallFameSectionFromStartParam(startParam);
    if (hallSecStart) {
      setTimeout(function () {
        navigateToHallFameSection(hallSecStart);
      }, 0);
      return;
    }
    if (startParam === "raffles") {
      setTimeout(function () {
        if (typeof setView === "function") setView("raffles");
      }, 0);
      return;
    }
    if (startParam === "video_lessons") {
      setTimeout(function () {
        if (typeof setView === "function") setView("video-lessons");
      }, 0);
      return;
    }
    if (startParam === "vl_reviews_nikolay" || startParam === "video_lessons_reviews_nikolay") {
      window.__pendingVideoLessonsOpenReviews = true;
      setTimeout(function () {
        if (typeof setView === "function") setView("video-lessons");
      }, 0);
      return;
    }
    if (startParam === "club_chat") {
      window.__pendingOpenClubChatGeneral = true;
      setTimeout(function () {
        if (typeof setView === "function") setView("chat");
        if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      }, 0);
      return;
    }
    if (startParam === "club_chat_dm") {
      if (withPeerOpt) {
        window.__pendingOpenChatPersonalFromDeepLink = {
          userId: withPeerOpt,
          userName: null,
          peerP21Id: null,
        };
      }
      setTimeout(function () {
        if (typeof setView === "function") setView("chat");
        if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      }, 0);
      return;
    }
    if (startParam === "club_charter") {
      setTimeout(function () {
        if (typeof window.openClubCharterModal === "function") window.openClubCharterModal();
      }, 0);
      return;
    }
    if (startParam === "vpn_proxy" || startParam === "vpn_proxy_vpn") {
      setTimeout(function () {
        if (typeof window.openVpnProxyModal === "function") window.openVpnProxyModal({ tab: "vpn" });
      }, 0);
      return;
    }
    if (startParam === "vpn_proxy_proxy" || startParam === "vpn_proxy_tab_proxy") {
      setTimeout(function () {
        if (typeof window.openVpnProxyModal === "function") window.openVpnProxyModal({ tab: "proxy" });
      }, 0);
      return;
    }
    if (startParam === "stream") {
      setTimeout(function () {
        if (typeof setView === "function") setView("streams");
      }, 0);
      return;
    }
    var streamsRoomId = parseStreamsRoomIdFromStartParam(startParam);
    if (streamsRoomId) {
      window.__pendingStreamsRoomId = streamsRoomId;
      setTimeout(function () {
        if (typeof setView === "function") setView("streams");
      }, 0);
      return;
    }
    if (startParam.indexOf("poker_task_") === 0) {
      setTimeout(function () {
        if (typeof setView === "function") setView("poker-tasks");
        setTimeout(function () {
          if (typeof window.startMttChallenge === "function") window.startMttChallenge();
        }, 400);
      }, 0);
      return;
    }
    var simpleViewByStartApp = {
      schedule: "schedule",
      download: "download",
      equilator: "equilator",
      cashout: "cashout",
      profile: "profile",
      streams: "streams",
      learn_play_hub: "learn-play-hub",
      bonus_game: "bonus-game",
      plasterer_game: "plasterer-game",
      cooler_game: "cooler-game",
    };
    if (simpleViewByStartApp[startParam]) {
      var vn = simpleViewByStartApp[startParam];
      setTimeout(function () {
        if (typeof setView === "function") setView(vn);
      }, 0);
    }
  }
  function pokerFindChatContactByPeerId(peerId) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid) return null;
    var data = window.__pokerLastContactsApiData;
    if ((!data || !Array.isArray(data.contacts) || data.contacts.length === 0) && typeof pokerTryReadContactsCache === "function") {
      try {
        var cached = pokerTryReadContactsCache();
        if (cached && cached.ok && Array.isArray(cached.contacts)) data = cached;
      } catch (eCtFind) {}
    }
    if (!data || !Array.isArray(data.contacts)) return null;
    for (var i = 0; i < data.contacts.length; i++) {
      var c = data.contacts[i];
      if (!c || !c.id) continue;
      if (peerChatIdsEqual(c.id, pid)) return c;
    }
    return null;
  }
  function pokerResolveChatPeerLabel(peerId, fallbackName) {
    var pid = peerId != null ? String(peerId).trim() : "";
    var fallback = fallbackName != null ? String(fallbackName).trim() : "";
    if (!pid) return fallback;
    try {
      var found = pokerFindChatContactByPeerId(pid);
      if (found) {
        var contactLabel = found.contactName != null && String(found.contactName).trim() ? String(found.contactName).trim() : "";
        var baseLabel = found.name != null && String(found.name).trim() ? String(found.name).trim() : "";
        if (contactLabel) return contactLabel;
        if (baseLabel) return baseLabel;
      }
      if (chatWithUserId && peerChatIdsEqual(chatWithUserId, pid) && chatWithUserName && String(chatWithUserName).trim()) {
        return String(chatWithUserName).trim();
      }
    } catch (ePeerLbl) {}
    return fallback || pid;
  }
  function pokerOpenResolvedChatPeer(peerId, fallbackName) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid || typeof pokerOpenPushDmHard !== "function") return false;
    var found = pokerFindChatContactByPeerId(pid);
    if (found) {
      try {
        pokerPushOpenDebug("openConv-resolved", pid);
      } catch (eOpenResolvedDbg) {}
      return pokerOpenPushDmHard(
        found.id,
        found.contactName || found.name || fallbackName || found.id,
          found.p21Id != null ? found.p21Id : undefined,
          found.avatar || undefined
      );
    }
    return false;
  }
  function pokerPendingPushDmNeedsContacts(peerId) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid) return false;
    return !pokerFindChatContactByPeerId(pid);
  }
  function pokerHydrateOpenDmHeaderFromContacts(peerId) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid) return false;
    var found = pokerFindChatContactByPeerId(pid);
    if (!found) return false;
    try {
      var resolvedName = found.contactName || found.name || "";
      if (resolvedName) {
        chatWithUserName = resolvedName;
        if (convTitle) setTextContentIfChanged(convTitle, resolvedName);
      }
      setChatConvTitleIdText(found.p21Id != null ? found.p21Id : "");
      var resolvedAvatar = found.avatar != null && String(found.avatar).trim() ? String(found.avatar).trim() : "";
      if (resolvedAvatar) {
        chatWithPeerAvatarUrl = resolvedAvatar;
        applyConvPeerAvatarHeader(resolvedAvatar, chatWithUserName || resolvedName || pid);
      } else if (chatWithUserName || resolvedName) {
        applyConvPeerAvatarHeader("", chatWithUserName || resolvedName || pid);
      }
      pokerPushOpenDebug("header-hydrated", pid);
      return true;
    } catch (eHdrHydrate) {}
    return false;
  }
  function pokerSchedulePushDmHeaderHydrate(peerId) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid || typeof loadContacts !== "function") return;
    try {
      if (pokerHydrateOpenDmHeaderFromContacts(pid)) return;
    } catch (eHdrHydrateCache) {}
    try {
      clearTimeout(window.__pokerPushDmHeaderHydrateTimer || 0);
    } catch (eHdrHydrateClr) {}
    window.__pokerPushDmHeaderHydrateTimer = setTimeout(function () {
      try {
        if (pokerHydrateOpenDmHeaderFromContacts(pid)) return;
        loadContacts({
          metaOnly: true,
          onLoaded: function () {
            try {
              if (pokerHydrateOpenDmHeaderFromContacts(pid)) return;
              if (typeof pokerHydrateOpenDmHeaderFromProfile === "function") pokerHydrateOpenDmHeaderFromProfile(pid);
            } catch (eHdrHydrateLoaded) {}
          },
        });
      } catch (eHdrHydrateLoad) {}
    }, 80);
  }
  function pokerHydrateOpenDmHeaderFromProfile(peerId) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid) return false;
    fetch(base + "/api/users?userId=" + encodeURIComponent(pid) + pokerApiAuthQuery("&"))
      .then(function (r) {
        return r.json().catch(function () { return { ok: false }; });
      })
      .then(function (data) {
        try {
          if (!data || !data.ok) return;
          if (!chatWithUserId || !peerChatIdsEqual(chatWithUserId, pid)) return;
          var profileName =
            data.contactName != null && String(data.contactName).trim()
              ? String(data.contactName).trim()
              : data.chatDisplayName != null && String(data.chatDisplayName).trim()
                ? String(data.chatDisplayName).trim()
                : data.userName != null && String(data.userName).trim()
                  ? String(data.userName).trim()
                  : "";
          if (profileName) {
            chatWithUserName = profileName;
            if (convTitle) setTextContentIfChanged(convTitle, profileName);
          }
          setChatConvTitleIdText(data.p21Id != null ? data.p21Id : "");
          var profileAvatar = data.avatar != null && String(data.avatar).trim() ? String(data.avatar).trim() : "";
          if (profileAvatar) {
            chatWithPeerAvatarUrl = profileAvatar;
            applyConvPeerAvatarHeader(profileAvatar, chatWithUserName || profileName || pid);
          } else if (profileName) {
            applyConvPeerAvatarHeader("", profileName);
          }
          pokerPushOpenDebug("header-profile-hydrated", pid);
        } catch (eHdrProfileApply) {}
      })
      .catch(function () {});
    return true;
  }
  function pokerSchedulePendingPushDmContactsReload(peerId, fallbackName) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid || typeof loadContacts !== "function") return;
    if (window.__pokerPendingChatDeepLinkContactsLoading) return;
    window.__pokerPendingChatDeepLinkContactsLoading = true;
    loadContacts({
      metaOnly: !pokerPendingPushDmNeedsContacts(pid),
      onLoaded: function () {
        window.__pokerPendingChatDeepLinkContactsLoading = false;
        try {
          if (!window.__pendingOpenChatPersonalFromDeepLink) return;
          if (pokerOpenResolvedChatPeer(pid, fallbackName || pid)) {
            window.__pendingOpenChatPersonalFromDeepLink = null;
            return;
          }
          if (typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function") {
            window.__pokerEnsureOpenPendingChatPersonalFromDeepLink();
          }
        } catch (ePendingReload) {}
      },
    });
  }
  function pokerGetActivePushDmTarget() {
    var pending = window.__pendingOpenChatPersonalFromDeepLink;
    if (pending && pending.userId != null && String(pending.userId).trim()) {
      return String(pending.userId).trim();
    }
    var forcedPeer = window.__pokerForcePushDmPeer ? String(window.__pokerForcePushDmPeer).trim() : "";
    var forcedUntil = Number(window.__pokerForcePushDmPeerUntil || 0);
    if (forcedPeer && forcedUntil > Date.now()) return forcedPeer;
    return "";
  }
  function pokerGuardDefaultDialogsOpen() {
    var activePeer = pokerGetActivePushDmTarget();
    if (!activePeer) return false;
    pokerPushOpenDebug("dialogs-guard-reroute", activePeer);
    try {
      if (typeof window.closeChatNavDropdown === "function") window.closeChatNavDropdown();
      if (dialogsView) dialogsView.classList.add("chat-dialogs-view--hidden");
      if (generalView) {
        generalView.classList.add("chat-general-view--hidden");
        generalView.style.display = "none";
      }
      if (personalView) personalView.classList.remove("chat-personal-view--hidden");
      if (listView) listView.classList.add("chat-list-view--hidden");
      if (convView) convView.classList.remove("chat-conv-view--hidden");
      chatActiveTab = "personal";
      if (!chatWithUserId) chatWithUserId = normalizePeerIdForChat(activePeer);
      if (!chatWithUserName) chatWithUserName = activePeer;
      updateChatHeaderStats();
      updateUnreadDots();
    } catch (eGuardShell) {}
    if (typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function") {
      if (window.__pokerEnsureOpenPendingChatPersonalFromDeepLink()) return true;
    }
    if (typeof pokerOpenChatPeerDirectFallback === "function") {
      pokerOpenChatPeerDirectFallback(activePeer, activePeer);
    }
    return true;
  }
  function pokerOpenPushDmHard(peerId, fallbackName, peerP21Id, peerAvatarOpt) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid || typeof showConv !== "function") return false;
    try {
      pokerPushOpenDebug("openConv-hard", pid);
      window.__pokerForcePushDmPeer = normalizePeerIdForChat(pid);
      window.__pokerForcePushDmPeerUntil = Date.now() + 15000;
      window.__pokerForceAllowPendingPushConvOpen = true;
      if (typeof window.closeChatNavDropdown === "function") window.closeChatNavDropdown();
      if (dialogsView) dialogsView.classList.add("chat-dialogs-view--hidden");
      if (generalView) {
        generalView.classList.add("chat-general-view--hidden");
        generalView.style.display = "none";
      }
      if (personalView) personalView.classList.remove("chat-personal-view--hidden");
      if (listView) listView.classList.add("chat-list-view--hidden");
      if (convView) convView.classList.remove("chat-conv-view--hidden");
      chatActiveTab = "personal";
      chatWithUserId = normalizePeerIdForChat(pid);
      chatWithUserName = fallbackName || pid;
      showConv(
        normalizePeerIdForChat(pid),
        fallbackName || pid,
        peerP21Id != null ? peerP21Id : undefined,
        peerAvatarOpt || undefined
      );
      try {
        pokerSchedulePushDmHeaderHydrate(pid);
      } catch (ePushHdrHydrate) {}
      return true;
    } catch (eOpenHard) {}
    finally {
      window.__pokerForceAllowPendingPushConvOpen = false;
    }
    return false;
  }
  function pokerSchedulePushDmHardStabilize(peerId, fallbackName, peerP21Id, peerAvatarOpt) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid) return;
    try {
      clearTimeout(window.__pokerPushDmHardStabilizeTimer || 0);
    } catch (eHardStableClr) {}
    window.__pokerPushDmHardStabilizeTimer = setTimeout(function () {
      try {
        var samePeer = !!(chatWithUserId && peerChatIdsEqual(chatWithUserId, pid));
        var convVisible = !!(convView && !convView.classList.contains("chat-conv-view--hidden"));
        if (samePeer && convVisible) return;
        pokerPushOpenDebug("openConv-hard-stabilize", pid);
        pokerOpenPushDmHard(pid, fallbackName || pid, peerP21Id, peerAvatarOpt);
      } catch (eHardStable) {}
    }, 500);
  }
  function pokerOpenChatPeerDirectFallback(peerId, fallbackName) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid) return false;
    try {
      pokerPushOpenDebug("openConv-direct", pid);
      if (typeof pokerOpenPushDmHard === "function") {
        if (!pokerOpenPushDmHard(normalizePeerIdForChat(pid), fallbackName || pid)) return false;
      } else if (typeof window.__pokerOpenPushDmImmediate === "function") {
        window.__pokerOpenPushDmImmediate(normalizePeerIdForChat(pid), fallbackName || pid);
      } else {
        return false;
      }
      try {
        clearTimeout(window.__pokerPushDmOpenRetryTimer || 0);
      } catch (eRetryClr) {}
      window.__pokerPushDmOpenRetryTimer = setTimeout(function retryPushDmOpen() {
        try {
          var convVisible = !!(convView && !convView.classList.contains("chat-conv-view--hidden"));
          var samePeer = !!(chatWithUserId && peerChatIdsEqual(chatWithUserId, pid));
          if (convVisible && samePeer) return;
          pokerPushOpenDebug("openConv-retry", pid);
          if (typeof pokerOpenPushDmHard === "function") {
            pokerOpenPushDmHard(normalizePeerIdForChat(pid), fallbackName || pid);
          } else if (typeof window.__pokerOpenPushDmImmediate === "function") {
            window.__pokerOpenPushDmImmediate(normalizePeerIdForChat(pid), fallbackName || pid);
          }
          setTimeout(function () {
            try {
              var convVisible2 = !!(convView && !convView.classList.contains("chat-conv-view--hidden"));
              var samePeer2 = !!(chatWithUserId && peerChatIdsEqual(chatWithUserId, pid));
              if (convVisible2 && samePeer2) return;
              pokerPushOpenDebug("openConv-retry2", pid);
              if (typeof pokerOpenPushDmHard === "function") {
                pokerOpenPushDmHard(normalizePeerIdForChat(pid), fallbackName || pid);
              } else if (typeof window.__pokerOpenPushDmImmediate === "function") {
                window.__pokerOpenPushDmImmediate(normalizePeerIdForChat(pid), fallbackName || pid);
              }
            } catch (eRetry2) {}
          }, 700);
        } catch (eRetry1) {}
      }, 350);
      return true;
    } catch (eOpenPeerFallback) {}
    return false;
  }
  function pokerOpenPendingPushDmWithoutContacts(peerId, fallbackName) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid || (typeof pokerOpenPushDmHard !== "function" && typeof window.__pokerOpenPushDmImmediate !== "function")) return false;
    try {
      pokerPushOpenDebug("openPendingNoContacts", pid);
      if (typeof pokerOpenPushDmHard === "function") {
        if (!pokerOpenPushDmHard(normalizePeerIdForChat(pid), fallbackName || pid)) return false;
      } else {
        window.__pokerOpenPushDmImmediate(normalizePeerIdForChat(pid), fallbackName || pid);
      }
      try {
        clearTimeout(window.__pokerPushDmNoContactsRetryTimer || 0);
      } catch (eNoContactsClr) {}
      window.__pokerPushDmNoContactsRetryTimer = setTimeout(function () {
        try {
          var convVisible = !!(convView && !convView.classList.contains("chat-conv-view--hidden"));
          var samePeer = !!(chatWithUserId && peerChatIdsEqual(chatWithUserId, pid));
          if (convVisible && samePeer) return;
          pokerPushOpenDebug("openPendingNoContacts-retry", pid);
          if (typeof pokerOpenPushDmHard === "function") {
            pokerOpenPushDmHard(normalizePeerIdForChat(pid), fallbackName || pid);
          } else {
            window.__pokerOpenPushDmImmediate(normalizePeerIdForChat(pid), fallbackName || pid);
          }
        } catch (eNoContactsRetry) {}
      }, 400);
      return true;
    } catch (eOpenNoContacts) {
    }
    return false;
  }
  function pokerEnsureOpenPendingChatPersonalFromDeepLink() {
    try {
      var pending = window.__pendingOpenChatPersonalFromDeepLink;
      if (!pending) return false;
      var peerId = pending.userId != null ? String(pending.userId).trim() : "";
      if (!peerId) return false;
      pokerPushOpenDebug("pending-dm", peerId);
      if (
        typeof pokerOpenPushDmHard === "function" &&
        pokerOpenPushDmHard(peerId, pending.userName || peerId, pending.peerP21Id, pending.avatar || pending.peerAvatar)
      ) {
        try {
          pokerSchedulePushDmHardStabilize(
            peerId,
            pending.userName || peerId,
            pending.peerP21Id,
            pending.avatar || pending.peerAvatar
          );
        } catch (ePendingHardStable) {}
        try {
          pokerSchedulePendingPushDmContactsReload(peerId, pending.userName || peerId);
        } catch (ePendingHardBg) {}
        return true;
      }
      if (pokerOpenResolvedChatPeer(peerId, pending.userName || peerId)) {
        window.__pendingOpenChatPersonalFromDeepLink = null;
        return true;
      }
      if (typeof window.__pokerOpenPushDmImmediate === "function") {
        if (pokerOpenPendingPushDmWithoutContacts(peerId, pending.userName || peerId)) {
          try {
            pokerSchedulePendingPushDmContactsReload(peerId, pending.userName || peerId);
          } catch (ePendingDmNoContactsBg) {}
          return true;
        }
      }
      if (window.chatListenersAttached && typeof window.chatOpenConvFromDialogs === "function") {
        if (pokerOpenChatPeerDirectFallback(peerId, pending.userName || peerId)) {
          try {
            pokerSchedulePendingPushDmContactsReload(peerId, pending.userName || peerId);
          } catch (ePendingDmContactsBg) {}
          return true;
        }
      }
      if (!window.chatListenersAttached) {
        pokerSchedulePendingPushDmContactsReload(peerId, pending.userName || peerId);
      }
      if (pokerOpenChatPeerDirectFallback(peerId, pending.userName || peerId)) {
        pokerSchedulePendingPushDmContactsReload(peerId, pending.userName || peerId);
        return true;
      }
    } catch (eEnsurePendingDm) {}
    return false;
  }
  window.__pokerEnsureOpenPendingChatPersonalFromDeepLink = pokerEnsureOpenPendingChatPersonalFromDeepLink;
  function pokerOpenChatFromCurrentUrlIfAny() {
    try {
      if (typeof location === "undefined" || !location.search) return false;
      var sp = new URLSearchParams(String(location.search || ""));
      var startApp = pokerNormalizeWebAppStartParam(pokerStartAppQueryFromUrlSearchParams(sp));
      var withPeer = (sp.get("with") || "").trim();
      if (startApp === "club_chat" && typeof window.openClubChat === "function") {
        window.openClubChat();
        return true;
      }
      if (startApp === "club_chat_dm" && withPeer) {
        if (pokerOpenResolvedChatPeer(withPeer, withPeer)) {
          return true;
        }
        window.__pendingOpenChatPersonalFromDeepLink = {
          userId: withPeer,
          userName: withPeer,
        };
        if (typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function") {
          window.__pokerEnsureOpenPendingChatPersonalFromDeepLink();
        }
        if (typeof setView === "function") setView("chat");
        return true;
      }
    } catch (eCurPushUrl) {}
    return false;
  }
  window.__pokerApplyStartAppDeepLink = pokerApplyStartAppDeepLink;
  window.__pokerFlushPendingChatDeepLink = function () {
    try {
      if (pokerOpenChatFromCurrentUrlIfAny()) return true;
      if (window.__pendingOpenClubChatGeneral) {
        window.__pendingOpenClubChatGeneral = false;
        if (typeof window.openClubChat === "function") {
          window.openClubChat();
          return true;
        }
      }
      if (window.__pendingOpenChatPersonalFromDeepLink && typeof window.chatOpenConvFromDialogs === "function") {
        if (
          typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function" &&
          window.__pokerEnsureOpenPendingChatPersonalFromDeepLink()
        ) {
          return true;
        }
      }
    } catch (eFlushDeep) {}
    return false;
  };
  window.__pokerOpenChatFromPushUrl = function (rawUrl) {
    try {
      var urlObj = new URL(String(rawUrl || "").trim() || "./?startapp=club_chat", window.location.href);
      var sp = new URLSearchParams(urlObj.search || "");
      var startApp = pokerNormalizeWebAppStartParam(pokerStartAppQueryFromUrlSearchParams(sp));
      var withPeer = (sp.get("with") || "").trim();
      if (!startApp) return;
      pokerPushOpenDebug("push-url", startApp + (withPeer ? " with=" + withPeer : ""));
      try {
        window.__pokerLastPushOpenUrl = String(rawUrl || "");
        window.__pokerLastPushOpenAt = Date.now();
      } catch (ePushMark) {}
      try {
        if (startApp === "club_chat" || startApp === "club_chat_dm") {
          window.__pokerPushNeedsFullChatBootstrap = true;
        }
      } catch (ePushBootstrapMark) {}
      try {
        if (typeof history !== "undefined" && history && typeof history.replaceState === "function") {
          history.replaceState(history.state, "", urlObj.href);
        }
      } catch (ePushHistory) {}
      pokerApplyStartAppDeepLink(startApp, { withPeer: withPeer });
      if (startApp !== "club_chat" && startApp !== "club_chat_dm") return;
      if (startApp === "club_chat_dm" && withPeer) {
        try {
          if (typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function") {
            window.__pokerEnsureOpenPendingChatPersonalFromDeepLink();
          }
        } catch (ePushOpenDmEnsure) {}
      }
      setTimeout(function () {
        try {
          if (typeof setView === "function") setView("chat");
        } catch (ePushView) {}
        try {
          if (typeof window.__pokerFlushPendingChatDeepLink === "function") window.__pokerFlushPendingChatDeepLink();
        } catch (ePushFlush1) {}
        setTimeout(function () {
          try {
            if (typeof window.__pokerFlushPendingChatDeepLink === "function") window.__pokerFlushPendingChatDeepLink();
          } catch (ePushFlush2) {}
        }, 180);
      }, 0);
    } catch (ePushDeep) {}
  };
  var qStartApp = "";
  var qWithParam = "";
  try {
    var qsDeep = new URLSearchParams(typeof location !== "undefined" && location.search ? location.search : "");
    qStartApp = pokerNormalizeWebAppStartParam(pokerStartAppQueryFromUrlSearchParams(qsDeep));
    qWithParam = (qsDeep.get("with") || "").trim();
  } catch (eQsDeep) {}
  var deepLinkParam = (startParam && String(startParam).trim()) || qStartApp;
  var hadDeepLinkAtInit = !!deepLinkParam;
  if (deepLinkParam) {
    pokerApplyStartAppDeepLink(deepLinkParam, { withPeer: qWithParam });
  }
  if (isTelegramWebApp()) {
    setTimeout(function () {
      try {
        var normLate = pokerNormalizeWebAppStartParam(pokerReadTelegramLaunchStartParam());
        var qsLate = new URLSearchParams(typeof location !== "undefined" && location.search ? location.search : "");
        var qStartLate = pokerNormalizeWebAppStartParam(pokerStartAppQueryFromUrlSearchParams(qsLate));
        var qWithLate = (qsLate.get("with") || "").trim();
        var deepLate = (normLate && String(normLate).trim()) || qStartLate;
        if (deepLate && !hadDeepLinkAtInit) {
          pokerApplyStartAppDeepLink(deepLate, { withPeer: qWithLate });
          return;
        }
        if (normLate === "raffles") {
          var vNow = document.body && document.body.getAttribute("data-view");
          if (vNow === "raffles") return;
          pokerApplyStartAppDeepLink("raffles", { withPeer: qWithParam });
        }
      } catch (eTgRaffleRetry) {}
    }, 220);
  }
  if (window.location.hash === "#streams") {
    setTimeout(function () {
      if (typeof setView === "function") setView("streams");
    }, 0);
  }
  if (window.location.hash === "#stream") {
    setTimeout(function () {
      if (typeof setView === "function") setView("streams");
    }, 0);
  }
  if (window.location.hash && window.location.hash.indexOf("#poker_task_") === 0) {
    setTimeout(function () {
      if (typeof setView === "function") setView("poker-tasks");
      setTimeout(function () {
        if (typeof window.startMttChallenge === "function") window.startMttChallenge();
      }, 400);
    }, 0);
  }
  (function initClubCharterModal() {
    var CLUB_CHARTER_HASH = "#club-charter";
    var modal = document.getElementById("clubCharterModal");
    var openBtn = document.getElementById("clubCharterOpenBtn");
    var closeBtn = document.getElementById("clubCharterModalClose");
    var backBtn = document.getElementById("clubCharterModalBack");
    var shareBtn = document.getElementById("clubCharterShareBtn");
    var copyBtn = document.getElementById("clubCharterCopyBtn");
    var backdrop = document.getElementById("clubCharterModalBackdrop");
    var paper = modal && modal.querySelector(".club-charter-modal__paper");
    var tabRaffle = document.getElementById("clubCharterTabRaffle");
    var tabComm = document.getElementById("clubCharterTabComm");
    var panelRaffle = document.getElementById("clubCharterPanelRaffle");
    var panelComm = document.getElementById("clubCharterPanelComm");
    var charterScrollLockY = 0;
    var charterBehindLocked = false;
    function lockCharterBehindScroll() {
      if (charterBehindLocked) return;
      charterScrollLockY =
        window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop) || 0;
      charterBehindLocked = true;
      try {
        document.documentElement.classList.add("club-charter-modal-open");
        var b = document.body;
        if (b) {
          b.style.overflow = "hidden";
          b.style.position = "fixed";
          b.style.top = "-" + charterScrollLockY + "px";
          b.style.left = "0";
          b.style.right = "0";
          b.style.width = "100%";
        }
      } catch (eLock) {}
    }
    function unlockCharterBehindScroll() {
      if (!charterBehindLocked) return;
      charterBehindLocked = false;
      try {
        document.documentElement.classList.remove("club-charter-modal-open");
        var b = document.body;
        if (b) {
          b.style.overflow = "";
          b.style.position = "";
          b.style.top = "";
          b.style.left = "";
          b.style.right = "";
          b.style.width = "";
        }
        window.scrollTo(0, charterScrollLockY);
      } catch (eUnlock) {}
    }
    if (!modal || !openBtn) return;
    function setCharterTab(which) {
      var isRaffle = which === "raffle";
      if (tabRaffle) {
        tabRaffle.setAttribute("aria-selected", isRaffle ? "true" : "false");
        tabRaffle.classList.toggle("club-charter-modal__menu-item--active", isRaffle);
      }
      if (tabComm) {
        tabComm.setAttribute("aria-selected", isRaffle ? "false" : "true");
        tabComm.classList.toggle("club-charter-modal__menu-item--active", !isRaffle);
      }
      if (panelRaffle) {
        panelRaffle.hidden = !isRaffle;
        panelRaffle.setAttribute("aria-hidden", isRaffle ? "false" : "true");
      }
      if (panelComm) {
        panelComm.hidden = isRaffle;
        panelComm.setAttribute("aria-hidden", isRaffle ? "true" : "false");
      }
    }
    function openCharter(opts) {
      opts = opts || {};
      try {
        if (typeof window.closeVpnProxyModal === "function") window.closeVpnProxyModal();
      } catch (eVpnClose) {}
      try {
        if (typeof window.closeClubWelcomeModal === "function") window.closeClubWelcomeModal();
      } catch (eWelClose) {}
      lockCharterBehindScroll();
      modal.setAttribute("aria-hidden", "false");
      setCharterTab("raffle");
      if (paper) paper.scrollTop = 0;
      if (!opts.skipHistory) {
        try {
          if (String(window.location.hash || "") !== CLUB_CHARTER_HASH) {
            window.history.replaceState({}, "", window.location.pathname + window.location.search + CLUB_CHARTER_HASH);
          }
        } catch (eHist) {}
      }
    }
    function closeCharter() {
      modal.setAttribute("aria-hidden", "true");
      unlockCharterBehindScroll();
      try {
        if (String(window.location.hash || "") === CLUB_CHARTER_HASH) {
          window.history.replaceState({}, "", window.location.pathname + window.location.search);
        }
      } catch (eCloseHist) {}
    }
    function getCharterShareText() {
      return "Устав клуба «Два туза»";
    }
    function getCharterShareLink() {
      if (typeof buildMiniAppStartLink === "function") {
        var tgl = buildMiniAppStartLink("club_charter");
        if (tgl) return tgl;
      }
      var fb = String(POKER_DEFAULT_TELEGRAM_MINI_APP_URL || "")
        .trim()
        .replace(/\/+$/, "");
      if (!fb) return "";
      var sep = fb.indexOf("?") >= 0 ? "&" : "?";
      var needSlash = sep === "?" && /^https?:\/\/[^/?#]+$/i.test(fb);
      return fb + (needSlash ? "/" : "") + sep + "startapp=" + encodeURIComponent("club_charter");
    }
    function notifyUser(text) {
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tg && typeof tg.showAlert === "function") tg.showAlert(text);
      else if (typeof alert === "function") alert(text);
    }
    function runCharterShare() {
      var link = getCharterShareLink();
      var shareText = getCharterShareText();
      var shareUrl = "https://t.me/share/url?url=" + encodeURIComponent(link) + "&text=" + encodeURIComponent(shareText);
      pokerTryPwaWebShare({ title: shareText, text: shareText + "\n" + link, url: link }).then(function (pwaOk) {
        if (pwaOk) return;
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && typeof tg.openTelegramLink === "function") tg.openTelegramLink(shareUrl);
        else if (tg && typeof tg.openLink === "function") tg.openLink(shareUrl);
        else window.open(shareUrl, "_blank");
      });
    }
    function runCharterCopy() {
      var link = getCharterShareLink();
      var shareText = getCharterShareText();
      var textToCopy = link;
      try {
        if (typeof navigator !== "undefined" && navigator && typeof navigator.clipboard !== "undefined" && typeof navigator.clipboard.writeText === "function") {
          navigator.clipboard.writeText(textToCopy).then(function () {
            notifyUser("Ссылка скопирована.");
          }).catch(function () {
            notifyUser("Не удалось скопировать ссылку.");
          });
        } else {
          notifyUser("Скопируйте ссылку вручную: " + shareText);
        }
      } catch (eCopy) {
        notifyUser("Не удалось скопировать ссылку.");
      }
    }
    window.openClubCharterModal = openCharter;
    window.closeClubCharterModal = closeCharter;
    openBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openCharter();
    });
    if (closeBtn) closeBtn.addEventListener("click", closeCharter);
    if (backBtn) {
      backBtn.addEventListener("click", function (e) {
        e.preventDefault();
        closeCharter();
      });
    }
    if (backdrop) backdrop.addEventListener("click", closeCharter);
    if (shareBtn) {
      shareBtn.addEventListener("click", function (e) {
        e.preventDefault();
        runCharterShare();
      });
    }
    if (copyBtn) {
      copyBtn.addEventListener("click", function (e) {
        e.preventDefault();
        runCharterCopy();
      });
    }
    if (tabRaffle) {
      tabRaffle.addEventListener("click", function (e) {
        e.preventDefault();
        setCharterTab("raffle");
      });
    }
    if (tabComm) {
      tabComm.addEventListener("click", function (e) {
        e.preventDefault();
        setCharterTab("comm");
      });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (modal.getAttribute("aria-hidden") !== "false") return;
      closeCharter();
    });
    window.addEventListener("hashchange", function () {
      if (window.location.hash === CLUB_CHARTER_HASH) {
        openCharter({ skipHistory: true });
      } else if (modal.getAttribute("aria-hidden") === "false") {
        closeCharter();
      }
    });
    setTimeout(function () {
      if (window.location.hash === CLUB_CHARTER_HASH) openCharter({ skipHistory: true });
    }, 0);
  })();

  (function initClubWelcomeModal() {
    var modal = document.getElementById("clubWelcomeModal");
    var openBtn = document.getElementById("headerClubWelcomeBtn");
    var closeBtn = document.getElementById("clubWelcomeModalClose");
    var backdrop = document.getElementById("clubWelcomeModalBackdrop");
    var paper = modal && modal.querySelector(".club-welcome-modal__paper");
    var welcomeLockY = 0;
    var welcomeBehindLocked = false;
    function lockWelcomeBehindScroll() {
      if (welcomeBehindLocked) return;
      welcomeLockY =
        window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop) || 0;
      welcomeBehindLocked = true;
      try {
        document.documentElement.classList.add("club-charter-modal-open");
        var b = document.body;
        if (b) {
          b.style.overflow = "hidden";
          b.style.position = "fixed";
          b.style.top = "-" + welcomeLockY + "px";
          b.style.left = "0";
          b.style.right = "0";
          b.style.width = "100%";
        }
      } catch (eLock) {}
    }
    function unlockWelcomeBehindScroll() {
      if (!welcomeBehindLocked) return;
      welcomeBehindLocked = false;
      try {
        document.documentElement.classList.remove("club-charter-modal-open");
        var b = document.body;
        if (b) {
          b.style.overflow = "";
          b.style.position = "";
          b.style.top = "";
          b.style.left = "";
          b.style.right = "";
          b.style.width = "";
        }
        window.scrollTo(0, welcomeLockY);
      } catch (eUnlock) {}
    }
    if (!modal) return;
    function openWelcome() {
      try {
        if (typeof window.closeClubCharterModal === "function") window.closeClubCharterModal();
      } catch (eC) {}
      try {
        if (typeof window.closeVpnProxyModal === "function") window.closeVpnProxyModal();
      } catch (eV) {}
      lockWelcomeBehindScroll();
      modal.setAttribute("aria-hidden", "false");
      if (paper) paper.scrollTop = 0;
    }
    function closeWelcome() {
      modal.setAttribute("aria-hidden", "true");
      unlockWelcomeBehindScroll();
    }
    window.closeClubWelcomeModal = closeWelcome;
    window.openClubWelcomeModal = openWelcome;
    function bindWelcomeOpen(el) {
      if (!el) return;
      el.addEventListener("click", function (e) {
        e.preventDefault();
        if (window.__touchWasScroll && window.__touchWasScroll()) return;
        openWelcome();
      });
    }
    bindWelcomeOpen(openBtn);
    bindWelcomeOpen(document.getElementById("homeWelcomeTitleBtn"));
    if (closeBtn) closeBtn.addEventListener("click", closeWelcome);
    if (backdrop) backdrop.addEventListener("click", closeWelcome);
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (!modal || modal.getAttribute("aria-hidden") !== "false") return;
      closeWelcome();
    });
  })();

  (function initVpnProxyModal() {
    var VPN_PROXY_HASH = "#vpn-proxy";
    var VPN_PROXY_HASH_PROXY = "#vpn-proxy-proxy";
    var modal = document.getElementById("vpnProxyModal");
    var openBtn = document.getElementById("vpnProxyOpenBtn");
    var closeBtn = document.getElementById("vpnProxyModalClose");
    var backdrop = document.getElementById("vpnProxyModalBackdrop");
    var paper = modal && modal.querySelector(".club-charter-modal__paper");
    var tabVpn = document.getElementById("vpnProxyTabVpn");
    var tabProxy = document.getElementById("vpnProxyTabProxy");
    var panelVpn = document.getElementById("vpnProxyPanelVpn");
    var panelProxy = document.getElementById("vpnProxyPanelProxy");
    var feedVpn = document.getElementById("vpnProxyFeedVpn");
    var feedProxy = document.getElementById("vpnProxyFeedProxy");
    var hintVpn = document.getElementById("vpnProxyHintVpn");
    var hintProxy = document.getElementById("vpnProxyHintProxy");
    var compVpn = document.getElementById("vpnProxyComposerVpn");
    var compProxy = document.getElementById("vpnProxyComposerProxy");
    var lockY = 0;
    var behindLocked = false;

    function esc(s) {
      return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }
    function renderVpnProxyFeed(feed, items, isAdmin) {
      if (!feed) return;
      var linkify = feed.getAttribute("data-vpn-proxy-linkify") === "1";
      if (!items || !items.length) {
        feed.innerHTML =
          '<p class="gazette-article-comments__empty">Пока нет сообщений — напишите первым.</p>';
        return;
      }
      var aidAttrV = esc(String(feed.getAttribute("data-gazette-article-comments-article-id") || ""));
      feed.innerHTML = items
        .map(function (c) {
          return pokerBuildGazetteCommentItemHtml(c, aidAttrV, isAdmin, !!linkify);
        })
        .join("");
    }
    function loadVpnProxyFeed(feed) {
      if (!feed) return;
      var aid = feed.getAttribute("data-gazette-article-comments-article-id");
      if (!aid) return;
      var base = typeof getApiBase === "function" ? getApiBase() : "";
      if (!base) {
        renderVpnProxyFeed(feed, [], false);
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
              window.pokerMarkAdminAccess("vpn-proxy-comments");
            }
            renderVpnProxyFeed(feed, res.data.comments, !!res.data.isAdmin);
          } else {
            renderVpnProxyFeed(feed, [], false);
          }
        })
        .catch(function () {
          renderVpnProxyFeed(feed, [], false);
        });
    }
    function refreshVpnProxyAuthUi() {
      var cred = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
      if (hintVpn) {
        if (cred) hintVpn.setAttribute("hidden", "");
        else hintVpn.removeAttribute("hidden");
      }
      if (hintProxy) {
        if (cred) hintProxy.setAttribute("hidden", "");
        else hintProxy.removeAttribute("hidden");
      }
      if (compVpn) {
        if (cred) compVpn.removeAttribute("hidden");
        else compVpn.setAttribute("hidden", "");
      }
      if (compProxy) {
        if (cred) compProxy.removeAttribute("hidden");
        else compProxy.setAttribute("hidden", "");
      }
    }
    function lockBehind() {
      if (behindLocked || !modal) return;
      behindLocked = true;
      lockY =
        window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop) || 0;
      try {
        document.documentElement.classList.add("vpn-proxy-modal-open");
        var b = document.body;
        if (b) {
          b.style.overflow = "hidden";
          b.style.position = "fixed";
          b.style.top = "-" + lockY + "px";
          b.style.left = "0";
          b.style.right = "0";
          b.style.width = "100%";
        }
      } catch (eL) {}
    }
    function unlockBehind() {
      if (!behindLocked) return;
      behindLocked = false;
      try {
        document.documentElement.classList.remove("vpn-proxy-modal-open");
        var b = document.body;
        if (b) {
          b.style.overflow = "";
          b.style.position = "";
          b.style.top = "";
          b.style.left = "";
          b.style.right = "";
          b.style.width = "";
        }
        window.scrollTo(0, lockY);
      } catch (eU) {}
    }
    function vpnProxyHashToTab(h) {
      return h === VPN_PROXY_HASH_PROXY ? "proxy" : "vpn";
    }
    function isVpnProxyHash(h) {
      return h === VPN_PROXY_HASH || h === VPN_PROXY_HASH_PROXY;
    }
    function syncVpnProxyLocationHashForTab(which) {
      try {
        var want = which === "proxy" ? VPN_PROXY_HASH_PROXY : VPN_PROXY_HASH;
        if (String(window.location.hash || "") !== want) {
          window.history.replaceState({}, "", window.location.pathname + window.location.search + want);
        }
      } catch (eHash) {}
    }
    function vpnProxyCurrentHash() {
      return panelProxy && !panelProxy.hidden ? VPN_PROXY_HASH_PROXY : VPN_PROXY_HASH;
    }
    function vpnProxyShareAbsoluteUrl() {
      try {
        if (typeof buildMiniAppStartLink === "function") {
          var hTg = vpnProxyCurrentHash();
          return buildMiniAppStartLink(hTg === VPN_PROXY_HASH_PROXY ? "vpn_proxy_proxy" : "vpn_proxy");
        }
      } catch (eU) {}
      return "";
    }
    function setVpnProxyTab(which) {
      var isVpn = which === "vpn";
      if (tabVpn) {
        tabVpn.setAttribute("aria-selected", isVpn ? "true" : "false");
        tabVpn.classList.toggle("club-charter-modal__menu-item--active", isVpn);
      }
      if (tabProxy) {
        tabProxy.setAttribute("aria-selected", isVpn ? "false" : "true");
        tabProxy.classList.toggle("club-charter-modal__menu-item--active", !isVpn);
      }
      if (panelVpn) {
        panelVpn.hidden = !isVpn;
        panelVpn.setAttribute("aria-hidden", isVpn ? "false" : "true");
      }
      if (panelProxy) {
        panelProxy.hidden = isVpn;
        panelProxy.setAttribute("aria-hidden", isVpn ? "true" : "false");
      }
    }
    function openModal(opts) {
      opts = opts || {};
      if (!modal) return;
      try {
        if (typeof window.closeClubCharterModal === "function") window.closeClubCharterModal();
      } catch (eCh) {}
      try {
        if (typeof window.closeClubWelcomeModal === "function") window.closeClubWelcomeModal();
      } catch (eWel) {}
      var tab = opts.tab === "proxy" ? "proxy" : "vpn";
      lockBehind();
      modal.setAttribute("aria-hidden", "false");
      refreshVpnProxyAuthUi();
      setVpnProxyTab(tab);
      if (paper) paper.scrollTop = 0;
      loadVpnProxyFeed(feedVpn);
      loadVpnProxyFeed(feedProxy);
      if (!opts.skipHistory) {
        syncVpnProxyLocationHashForTab(tab);
      }
    }
    function closeModal() {
      if (!modal) return;
      modal.setAttribute("aria-hidden", "true");
      unlockBehind();
      try {
        var h = String(window.location.hash || "");
        if (h === VPN_PROXY_HASH || h === VPN_PROXY_HASH_PROXY) {
          window.history.replaceState({}, "", window.location.pathname + window.location.search);
        }
      } catch (eCloseH) {}
    }
    window.__pokerVpnProxyReloadCommentFeed = loadVpnProxyFeed;
    window.closeVpnProxyModal = closeModal;
    window.openVpnProxyModal = function (opts) {
      openModal(opts || {});
    };
    if (!modal) return;
    if (openBtn) {
      openBtn.addEventListener("click", function (e) {
        e.preventDefault();
        openModal({ tab: "vpn" });
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        closeModal();
      });
    }
    if (backdrop) backdrop.addEventListener("click", closeModal);
    if (tabVpn) {
      tabVpn.addEventListener("click", function (e) {
        e.preventDefault();
        setVpnProxyTab("vpn");
        if (modal.getAttribute("aria-hidden") === "false") syncVpnProxyLocationHashForTab("vpn");
      });
    }
    if (tabProxy) {
      tabProxy.addEventListener("click", function (e) {
        e.preventDefault();
        setVpnProxyTab("proxy");
        if (modal.getAttribute("aria-hidden") === "false") syncVpnProxyLocationHashForTab("proxy");
      });
    }
    var vpnProxyCopyBtn = document.getElementById("vpnProxyCopyLinkBtn");
    if (vpnProxyCopyBtn && vpnProxyCopyBtn.getAttribute("data-vpn-proxy-share-bound") !== "1") {
      vpnProxyCopyBtn.setAttribute("data-vpn-proxy-share-bound", "1");
      vpnProxyCopyBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
        var linkCp = vpnProxyShareAbsoluteUrl();
        if (!linkCp) return;
        var msgCp = "Ссылка скопирована. Отправьте другу — откроется подборка ВПН и прокси.";
        if (typeof navigator.clipboard !== "undefined" && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(linkCp).then(function () {
            var tgCp = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
            if (tgCp && tgCp.showAlert) tgCp.showAlert(msgCp);
            else alert("Ссылка скопирована.");
            if (typeof recordShareButtonClick === "function") recordShareButtonClick("vpn_proxy_modal_copy");
          }).catch(function () {
            var tgCp2 = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
            if (tgCp2 && tgCp2.showAlert) tgCp2.showAlert("Ссылка: " + linkCp);
            else alert("Ссылка: " + linkCp);
          });
        } else {
          var tgCp3 = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tgCp3 && tgCp3.showAlert) tgCp3.showAlert("Ссылка: " + linkCp);
          else alert("Ссылка: " + linkCp);
        }
      });
    }
    var vpnProxyShareBtn = document.getElementById("vpnProxyShareBtn");
    if (vpnProxyShareBtn && vpnProxyShareBtn.getAttribute("data-vpn-proxy-share-bound") !== "1") {
      vpnProxyShareBtn.setAttribute("data-vpn-proxy-share-bound", "1");
      vpnProxyShareBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
        var linkSh = vpnProxyShareAbsoluteUrl();
        if (!linkSh) return;
        var shareBody =
          "Подборка ВПН и прокси от игроков клуба «Два туза»:\n" + linkSh;
        var shareCaption = "Подборка ВПН и прокси от игроков клуба «Два туза».";
        var shareUrl =
          typeof pokerBuildTelegramShareUrlDialog === "function"
            ? pokerBuildTelegramShareUrlDialog(linkSh, shareCaption)
            : "";
        pokerTryPwaWebShare({ text: shareBody, url: linkSh }).then(function (pwaOk) {
          if (pwaOk) {
            if (typeof recordShareButtonClick === "function") recordShareButtonClick("vpn_proxy_modal");
            return;
          }
          var tgSh = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tgSh && tgSh.openTelegramLink) tgSh.openTelegramLink(shareUrl);
          else window.open(shareUrl, "_blank");
          if (typeof recordShareButtonClick === "function") recordShareButtonClick("vpn_proxy_modal");
        });
      });
    }
    window.addEventListener("hashchange", function () {
      var h = String(window.location.hash || "");
      if (isVpnProxyHash(h)) {
        openModal({ skipHistory: true, tab: vpnProxyHashToTab(h) });
      } else if (modal.getAttribute("aria-hidden") === "false") {
        closeModal();
      }
    });
    setTimeout(function () {
      var h0 = String(window.location.hash || "");
      if (isVpnProxyHash(h0)) openModal({ skipHistory: true, tab: vpnProxyHashToTab(h0) });
    }, 0);
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (!modal || modal.getAttribute("aria-hidden") !== "false") return;
      closeModal();
    });
    modal.addEventListener("submit", function (ev) {
      var form = ev.target;
      if (!form || !form.classList || !form.classList.contains("gazette-article-comments__form")) return;
      if (!modal.contains(form)) return;
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
        if (st) st.textContent = "Введите текст.";
        return;
      }
      if (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential()) {
        if (st) st.textContent = "Войдите в приложение.";
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
            if (st) st.textContent = "Опубликовано.";
            loadVpnProxyFeed(feed);
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
    modal.addEventListener("click", function (ev) {
      var profBtn = ev.target && ev.target.closest && ev.target.closest("[data-gazette-comment-member-id]");
      if (profBtn && modal.contains(profBtn)) {
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
    (function bindVpnProxyKbRepair() {
      if (!modal) return;
      var blurTimer = null;
      function scheduleFin() {
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
          scheduleFin();
        },
        true
      );
    })();
  })();
})();
}
