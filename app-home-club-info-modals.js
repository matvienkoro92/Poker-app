// Home club charter and welcome modal runtimes.

function initHomeClubInfoModals() {
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
        if (typeof window.pokerRecordSectionViewOpen === "function") window.pokerRecordSectionViewOpen("club-charter");
      } catch (eTrack) {}
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
      var textToCopy = link;
      if (!textToCopy) {
        notifyUser("Не удалось сформировать ссылку.");
        return;
      }
      pokerCopyTextToClipboard(textToCopy).then(function (copied) {
        notifyUser(copied ? "Ссылка скопирована." : "Скопируйте ссылку вручную: " + textToCopy);
      });
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

  (function initClubGuestbook() {
    var openBtn = document.getElementById("clubGuestbookOpenBtn");
    if (!openBtn) return;
    var activeTab = "review";
    var posts = [];
    var feedback = {};
    var ratingSnapshots = {};
    var canPost = false;
    var loading = false;
    var profileReturnState = null;
    function esc(value) { return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
    function apiBase() { return typeof getApiBase === "function" ? getApiBase() : ""; }
    function authBody(body) { return typeof pokerApiAuthJsonBody === "function" ? pokerApiAuthJsonBody(body) : body; }
    function request(path, body) {
      return fetch(apiBase() + path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(authBody(body)) })
        .then(function (response) { return response.json().then(function (data) { if (!response.ok || !data || !data.ok) throw new Error(data && data.error || "Ошибка загрузки"); return data; }); });
    }
    document.body.insertAdjacentHTML("beforeend",
      '<div class="club-guestbook" id="clubGuestbook" hidden>' +
        '<button type="button" class="club-guestbook__backdrop" data-guestbook-close aria-label="Закрыть"></button>' +
        '<section class="club-guestbook__panel" role="dialog" aria-modal="true" aria-labelledby="clubGuestbookTitle">' +
          '<header class="club-guestbook__header"><div><small>КЛУБ «ДВА ТУЗА»</small><h2 id="clubGuestbookTitle">Книга отзывов и жалоб</h2></div><button type="button" data-guestbook-close aria-label="Закрыть">×</button></header>' +
          '<div class="club-guestbook__tabs" role="tablist"><button type="button" data-guestbook-tab="review" class="is-active">Отзывы</button><button type="button" data-guestbook-tab="complaint">Жалобы</button></div>' +
          '<button type="button" class="club-guestbook__copy" id="clubGuestbookCopy" data-guestbook-copy>⧉ <span>Скопировать ссылку на отзывы</span></button>' +
          '<form class="club-guestbook__composer" id="clubGuestbookForm"><textarea maxlength="1500" rows="3" id="clubGuestbookText" placeholder="Напишите отзыв о клубе…"></textarea><div><span id="clubGuestbookGate"></span><button type="submit">Опубликовать</button></div></form>' +
          '<div class="club-guestbook__feed" id="clubGuestbookFeed"></div>' +
        '</section></div>');
    var root = document.getElementById("clubGuestbook");
    var feed = document.getElementById("clubGuestbookFeed");
    var form = document.getElementById("clubGuestbookForm");
    var input = document.getElementById("clubGuestbookText");
    var gate = document.getElementById("clubGuestbookGate");
    var copyBtn = document.getElementById("clubGuestbookCopy");
    var reactions = ["❤️", "🔥", "👍", "👏"];
    function dateLabel(value) { try { return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }).format(new Date(value)); } catch (e) { return ""; } }
    function eventId(post) { return "club-guestbook:" + String(post.id || ""); }
    function avatarHtml(url, name, cls) { return url ? '<img class="' + cls + '" src="' + esc(url) + '" alt="">' : '<span class="' + cls + '">' + esc(String(name || "И").charAt(0).toUpperCase()) + '</span>'; }
    function ratingSnapshotForNick(value) {
      var exact = String(value || "").replace(/^@+/, "").trim().toLowerCase();
      try { exact = exact.normalize("NFKC"); } catch (error) {}
      exact = exact.replace(/[\uFE0E\uFE0F]/g, "").replace(/\s+/g, "");
      var relaxed = exact.replace(/[!！?？.,:;"'`~()\[\]{}<>«»]+$/g, "");
      return ratingSnapshots[exact] || ratingSnapshots[relaxed] || null;
    }
    function bindingGateHtml(compact) {
      return '<div class="club-guestbook__binding-gate' + (compact ? ' club-guestbook__binding-gate--compact' : '') + '"><span>Привяжите аккаунт Poker21, чтобы оставлять ' + (compact ? 'комментарии' : 'отзывы и жалобы') + '.</span><button type="button" data-guestbook-bind>Привязать Poker21</button></div>';
    }
    function openPoker21Binding() {
      close();
      var nav = document.querySelector('.bottom-nav__item[data-view-target="profile"]');
      if (nav) nav.click();
      window.setTimeout(function () { if (typeof setProfileTab === "function") setProfileTab("poker21"); }, 0);
    }
    function authorMetaHtml(post) {
      var snapshot = ratingSnapshotForNick(post.authorName);
      var league1Place = Math.max(0, Number(snapshot && snapshot.league1Place) || 0);
      var league2Place = Math.max(0, Number(snapshot && snapshot.league2Place) || 0);
      var league = league1Place && (!league2Place || league1Place <= league2Place) ? 1 : (league2Place ? 2 : 0);
      var place = league === 1 ? league1Place : (league === 2 ? league2Place : 0);
      var parts = [];
      if (post.authorPoker21Id) parts.push("ID " + String(post.authorPoker21Id));
      if (post.authorLevel) parts.push("Уровень " + Math.max(0, Number(post.authorLevel) || 0));
      if (league && place) parts.push("Лига " + league + " · " + place + "-е место");
      return parts.length ? '<span class="club-guestbook__author-meta">' + esc(parts.join(" · ")) + '</span>' : "";
    }
    function authorButtonHtml(post) {
      var profileId = String(post.authorProfileId || post.authorId || "");
      return '<button type="button" class="club-guestbook__author" data-guestbook-profile="' + esc(profileId) + '" data-profile-name="' + esc(post.authorName || "Игрок") + '" data-profile-avatar="' + esc(post.authorAvatar || "") + '"' + (profileId ? "" : " disabled") + '>' +
        avatarHtml(post.authorAvatar, post.authorName, "club-guestbook__avatar") + '<span><strong>' + esc(post.authorName || "Игрок") + '</strong>' +
        (post.authorVerified ? '<i class="club-guestbook__verified" title="Poker21 привязан" aria-label="Poker21 привязан">✓</i>' : "") +
        authorMetaHtml(post) + '<small>' + esc(dateLabel(post.createdAt)) + '</small></span></button>';
    }
    function commentsHtml(post, info) {
      var comments = Array.isArray(info.comments) ? info.comments : [];
      return '<div class="club-guestbook__comments">' + comments.map(function (comment) {
        return '<div class="club-guestbook__comment">' + avatarHtml(comment.authorAvatar, comment.author, "club-guestbook__comment-avatar") + '<div><b>' + esc(comment.author || "Игрок") + '</b><p>' + esc(comment.text) + '</p></div></div>';
      }).join("") + (canPost ? '<form class="club-guestbook__comment-form" data-guestbook-comment="' + esc(post.id) + '"><input maxlength="500" placeholder="Написать комментарий…"><button type="submit">Отправить</button></form>' : bindingGateHtml(true)) + '</div>';
    }
    function render() {
      var rows = posts.filter(function (post) { return post.type === activeTab; });
      input.placeholder = activeTab === "complaint" ? "Опишите жалобу или проблему…" : "Напишите отзыв о клубе…";
      if (copyBtn) {
        var copyLabel = copyBtn.querySelector("span");
        if (copyLabel) copyLabel.textContent = activeTab === "complaint" ? "Скопировать ссылку на жалобы" : "Скопировать ссылку на отзывы";
      }
      gate.textContent = canPost ? "Публикация от привязанного аккаунта Poker21" : "";
      input.disabled = !canPost;
      form.querySelector('button[type="submit"]').disabled = !canPost || loading;
      form.classList.toggle("club-guestbook__composer--locked", !canPost);
      var oldGate = form.querySelector(".club-guestbook__binding-gate");
      if (oldGate) oldGate.remove();
      if (!canPost) form.insertAdjacentHTML("beforeend", bindingGateHtml(false));
      feed.innerHTML = rows.length ? rows.map(function (post) {
        var info = feedback[eventId(post)] || {};
        var buttons = reactions.map(function (emoji) { var count = Number(info.reactions && info.reactions[emoji]) || 0; return '<button type="button" class="club-guestbook__reaction' + (info.myReaction === emoji ? ' is-mine' : '') + '" data-guestbook-reaction="' + esc(post.id) + '" data-emoji="' + emoji + '">' + emoji + (count ? '<span>' + count + '</span>' : '') + '</button>'; }).join("");
        return '<article class="club-guestbook__post"><header>' + authorButtonHtml(post) + '<span class="club-guestbook__kind">' + (post.type === "complaint" ? "Жалоба" : "Отзыв") + '</span></header><p class="club-guestbook__text">' + esc(post.text) + '</p><div class="club-guestbook__reactions">' + buttons + '<span>💬 ' + (Number(info.commentCount) || 0) + '</span></div>' + commentsHtml(post, info) + '</article>';
      }).join("") : '<div class="club-guestbook__empty">' + (loading ? "Загрузка…" : (activeTab === "complaint" ? "Жалоб пока нет" : "Отзывов пока нет")) + '</div>';
    }
    function loadFeedback() {
      var ids = posts.map(eventId);
      if (!ids.length) { feedback = {}; render(); return Promise.resolve(); }
      return request("/api/profile-event-feedback", { action: "list", eventIds: ids, scope: "club" }).then(function (data) { feedback = data.feedback || {}; render(); }).catch(function () { feedback = {}; render(); });
    }
    function load() {
      loading = true; render();
      function readRatings() {
        return typeof window.pokerGetClubNewsTournamentSnapshotsReady === "function"
          ? window.pokerGetClubNewsTournamentSnapshotsReady()
          : Promise.resolve({});
      }
      var ratingsReady = typeof window.pokerGetClubNewsTournamentSnapshotsReady === "function"
        ? readRatings()
        : (typeof window.pokerEnsureScriptDomains === "function"
            ? Promise.resolve(window.pokerEnsureScriptDomains(["rating-common", "rating-winter", "rating-spring", "rating-summer"])).then(readRatings)
            : Promise.resolve({}));
      return Promise.all([request("/api/club-guestbook", { action: "list" }), ratingsReady.catch(function () { return {}; })]).then(function (results) { posts = results[0].posts || []; canPost = results[0].canPost === true; ratingSnapshots = results[1] || {}; return loadFeedback(); }).catch(function (error) { feed.innerHTML = '<div class="club-guestbook__empty">' + esc(error.message) + '</div>'; }).finally(function () { loading = false; render(); });
    }
    function open() { root.hidden = false; document.body.classList.add("club-guestbook-open"); load(); }
    function close() { root.hidden = true; document.body.classList.remove("club-guestbook-open"); }
    function restoreAfterProfile() {
      document.removeEventListener("poker:chat-user-modal-close", restoreAfterProfile);
      var state = profileReturnState;
      profileReturnState = null;
      if (!state) return;
      activeTab = state.activeTab === "complaint" ? "complaint" : "review";
      root.querySelectorAll("[data-guestbook-tab]").forEach(function (button) {
        button.classList.toggle("is-active", button.getAttribute("data-guestbook-tab") === activeTab);
      });
      root.hidden = false;
      document.body.classList.add("club-guestbook-open");
      render();
      window.requestAnimationFrame(function () { feed.scrollTop = Number(state.scrollTop) || 0; });
    }
    function openAuthorProfile(profileId, profileName, profileAvatar) {
      profileReturnState = { activeTab: activeTab, scrollTop: feed.scrollTop };
      document.removeEventListener("poker:chat-user-modal-close", restoreAfterProfile);
      document.addEventListener("poker:chat-user-modal-close", restoreAfterProfile);
      close();
      var opened = null;
      if (typeof window.pokerOpenChatUserModalSafe === "function") {
        opened = window.pokerOpenChatUserModalSafe(profileId, profileName, profileAvatar);
      } else if (typeof window.openChatUserModalById === "function") {
        window.openChatUserModalById(profileId, profileName, profileAvatar);
        opened = true;
      } else if (typeof window.pokerEnsureScriptDomains === "function") {
        opened = Promise.resolve(window.pokerEnsureScriptDomains(["chat"])).then(function () {
          if (typeof window.openChatUserModalById !== "function") return false;
          window.openChatUserModalById(profileId, profileName, profileAvatar);
          return true;
        });
      }
      if (!opened) return restoreAfterProfile();
      if (opened && typeof opened.then === "function") {
        Promise.resolve(opened).then(function (ok) {
          if (ok === false) restoreAfterProfile();
        }).catch(restoreAfterProfile);
      }
    }
    openBtn.addEventListener("click", open);
    root.addEventListener("click", function (event) {
      if (event.target.closest("[data-guestbook-close]")) return close();
      if (event.target.closest("[data-guestbook-bind]")) { openPoker21Binding(); return; }
      var profile = event.target.closest("[data-guestbook-profile]");
      if (profile) {
        var profileId = profile.getAttribute("data-guestbook-profile");
        if (!profileId) return;
        var profileName = profile.getAttribute("data-profile-name") || "Игрок";
        var profileAvatar = profile.getAttribute("data-profile-avatar") || "";
        openAuthorProfile(profileId, profileName, profileAvatar);
        return;
      }
      var tab = event.target.closest("[data-guestbook-tab]");
      if (tab) { activeTab = tab.getAttribute("data-guestbook-tab") === "complaint" ? "complaint" : "review"; root.querySelectorAll("[data-guestbook-tab]").forEach(function (button) { button.classList.toggle("is-active", button === tab); }); render(); return; }
      var copy = event.target.closest("[data-guestbook-copy]");
      if (copy) {
        var startParam = activeTab === "complaint" ? "club_guestbook_complaints" : "club_guestbook_reviews";
        var link = typeof buildMiniAppStartLink === "function"
          ? buildMiniAppStartLink(startParam)
          : window.location.origin + window.location.pathname + "?startapp=" + startParam;
        var result = typeof pokerCopyTextToClipboard === "function" ? pokerCopyTextToClipboard(link) : Promise.resolve(false);
        Promise.resolve(result).then(function (ok) {
          var label = copy.querySelector("span");
          if (label) label.textContent = ok ? "Ссылка скопирована" : "Не удалось скопировать";
          window.setTimeout(render, 1600);
        });
        return;
      }
      var reaction = event.target.closest("[data-guestbook-reaction]");
      if (reaction) { var post = posts.find(function (row) { return String(row.id) === reaction.getAttribute("data-guestbook-reaction"); }); if (!post) return; request("/api/profile-event-feedback", { action: "reaction", eventId: eventId(post), emoji: reaction.getAttribute("data-emoji"), scope: "club" }).then(function (data) { feedback[eventId(post)] = data.feedback; render(); }); }
    });
    root.addEventListener("submit", function (event) {
      var commentForm = event.target.closest("[data-guestbook-comment]");
      if (!commentForm) return;
      event.preventDefault(); var field = commentForm.querySelector("input"); var post = posts.find(function (row) { return String(row.id) === commentForm.getAttribute("data-guestbook-comment"); }); if (!post || !field.value.trim()) return;
      request("/api/profile-event-feedback", { action: "comment", eventId: eventId(post), text: field.value, scope: "club" }).then(function (data) { field.value = ""; feedback[eventId(post)] = data.feedback; render(); });
    });
    form.addEventListener("submit", function (event) { event.preventDefault(); var text = input.value.trim(); if (!text || !canPost || loading) return; loading = true; render(); request("/api/club-guestbook", { action: "create", type: activeTab, text: text }).then(function (data) { posts = data.posts || []; input.value = ""; return loadFeedback(); }).catch(function (error) { gate.textContent = error.message; }).finally(function () { loading = false; render(); }); });
    document.addEventListener("keydown", function (event) { if (event.key === "Escape" && !root.hidden) close(); });
  })();


}
