// View router: tab navigation, view switching, route clicks, and active-view classes.

// Простая навигация по разделам (вкладки внизу)
const navItems = document.querySelectorAll("[data-view-target]:not(.bonus-game-back)");
const footer = document.querySelector(".card__footer");

function setDownloadPage(pageName) {
  var downloadPages = document.querySelectorAll("[data-download-page]");
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

function pokerGetViewNodes() {
  return document.querySelectorAll("[data-view]");
}

/** Inert только у экранов .view — не у body[data-view] и пр., иначе весь документ (в т.ч. .bottom-nav) перестаёт получать клики. */
function pokerSyncInertForViewScreensOnly() {
  try {
    if (typeof HTMLElement === "undefined" || !("inert" in HTMLElement.prototype)) return;
    /* Снять ошибочный inert с body после старых сборок */
    if (document.body) document.body.removeAttribute("inert");
    pokerGetViewNodes().forEach(function (view) {
      if (!view.classList || !view.classList.contains("view")) return;
      if (view.classList.contains("view--active")) view.removeAttribute("inert");
      else view.setAttribute("inert", "");
    });
  } catch (e) {}
}

(function pokerInitInactiveViewsInert() {
  function apply() {
    pokerSyncInertForViewScreensOnly();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply);
  else apply();
})();

// При запуске: главная / локальный браузер (скролл на body на всех не-chat экранах без initData)
(function () {
  var initialView = document.querySelector(".view--active[data-view]");
  var viewName = initialView ? initialView.getAttribute("data-view") : "";
  if (viewName === "home") {
    document.documentElement.classList.add("app-view-home");
  }
  document.documentElement.classList.toggle("app-view-home-html-scroll", viewName === "home");
  document.documentElement.classList.toggle("app-view-download-html-scroll", viewName === "download");
  document.documentElement.classList.toggle("app-view-cashout-html-scroll", viewName === "cashout");
  document.documentElement.classList.toggle("app-view-spring-rating-html-scroll", viewName === "spring-rating");
  document.documentElement.classList.toggle("app-view-profile-html-scroll", viewName === "profile");
  document.documentElement.classList.toggle("app-view-video-lessons-html-scroll", viewName === "video-lessons");
  document.documentElement.classList.toggle("app-view-raffles-html-scroll", viewName === "raffles");
  document.documentElement.classList.remove("app-view-vl-html-scroll");
  document.documentElement.classList.toggle("app-view-browser-local", viewName !== "chat");
  /* long-scroll без главной и без «Скачать»: внутренний scrollport в .card__content (как у главной). */
  var longScrollInit =
    viewName === "learn-play-hub" ||
    viewName === "poker-tasks" ||
    viewName === "hall-of-fame";
  document.documentElement.classList.toggle("app-view-long-scroll", longScrollInit);
  if (document.body) document.body.classList.toggle("app-view-long-scroll", longScrollInit);
})();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    try {
      if (typeof window.__pokerInitSiteHomeInstructionModal === "function") window.__pokerInitSiteHomeInstructionModal();
      if (typeof window.__pokerSyncSiteHomeInstructionMode === "function") window.__pokerSyncSiteHomeInstructionMode();
      if (typeof window.__pokerSyncProfileGuestWebsiteMode === "function") window.__pokerSyncProfileGuestWebsiteMode();
    } catch (eSiteHomeInit) {}
  });
} else {
  try {
    if (typeof window.__pokerInitSiteHomeInstructionModal === "function") window.__pokerInitSiteHomeInstructionModal();
    if (typeof window.__pokerSyncSiteHomeInstructionMode === "function") window.__pokerSyncSiteHomeInstructionMode();
    if (typeof window.__pokerSyncProfileGuestWebsiteMode === "function") window.__pokerSyncProfileGuestWebsiteMode();
  } catch (eSiteHomeInitNow) {}
}

/** Открытие диалога менеджера из депозита после setView("chat"): не полагаться на фиксированный таймаут. */
function pokerTryConsumePendingManagerFromCashout() {
  var pm = window.__pendingOpenManagerFromCashout;
  if (!pm || !pm.userId) return;
  if (typeof window.chatOpenConvFromDialogs !== "function") return;
  window.__pendingOpenManagerFromCashout = null;
  window.chatOpenConvFromDialogs(pm.userId, pm.userName || "Менеджер");
}

function pokerChatDomainScriptsReady() {
  return typeof initChatUserModals === "function" &&
    typeof initChatGeneralLoader === "function" &&
    typeof initChatPersonalLoader === "function";
}

function setView(viewName, navOpts) {
  navOpts = navOpts || {};
  try {
    if (!navOpts.htmlReady && typeof window.pokerEnsureViewHtml === "function") {
      var htmlViewName = viewName === "spring-rating" ? "winter-rating" : viewName;
      var htmlReady = window.pokerEnsureViewHtml(htmlViewName);
      if (htmlReady && typeof htmlReady.then === "function") {
        htmlReady.then(function () {
          var nextOpts = {};
          Object.keys(navOpts).forEach(function (key) {
            nextOpts[key] = navOpts[key];
          });
          nextOpts.htmlReady = true;
          setView(viewName, nextOpts);
        }).catch(function (err) {
          if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.showAlert) {
            window.Telegram.WebApp.showAlert("Не удалось загрузить раздел. Попробуйте ещё раз.");
          }
          if (typeof console !== "undefined" && console.warn) console.warn("view html fragment", err);
        });
        return;
      }
    }
  } catch (eHtmlView) {}
  try {
    pokerPushOpenStateDebug("setView-enter", String(viewName || ""));
  } catch (eSetViewDbg0) {}
  var restoreScrollOnEnter = navOpts.fromBack === true;
  try {
    if (viewName !== "chat" && viewName !== "keyboard-lab") {
      setTelegramIosKeyboardRootLock(false);
    }
  } catch (eTgKbUnlockView) {}
  /* Чаты всегда открываются (нижнее меню). Верификация — pokerEnsure на диалогах/отправке. */
  var prevView = "";
  try {
    if (document.body && document.body.getAttribute) prevView = document.body.getAttribute("data-view") || "";
  } catch (ePrev) {}
  /* Уход с чата по таббару/жесту: blur и полный сброс клавиатуры/ visualViewport — иначе на iOS залипают
     html.chat-keyboard-open (overflow:hidden), inset и таббар «парит» с зазором снизу до главной. */
  if (prevView === "chat" && viewName !== "chat") {
    try {
      if (document.body && document.body.classList) document.body.classList.remove("chat-conversation-open");
      if (document.documentElement && document.documentElement.classList) document.documentElement.classList.remove("chat-conversation-open");
    } catch (eChatConvClassLeave) {}
    try {
      var compLeave = document.getElementById("chatSharedComposer");
      if (compLeave && document.activeElement === compLeave && typeof compLeave.blur === "function") compLeave.blur();
      var dlgLeave = document.getElementById("chatFindByIdInputDialogs");
      if (dlgLeave && document.activeElement === dlgLeave && typeof dlgLeave.blur === "function") dlgLeave.blur();
      var findLeave = document.getElementById("chatFindByIdInput");
      if (findLeave && document.activeElement === findLeave && typeof findLeave.blur === "function") findLeave.blur();
    } catch (eBlurLeaveChat) {}
    try {
      if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") {
        window.__pokerFinalizeChatKeyboardDismiss();
      } else {
        if (typeof window.__pokerClearChatKeyboardViewportState === "function") {
          window.__pokerClearChatKeyboardViewportState();
        }
        if (typeof window.__pokerChatDetachVisualViewportListeners === "function") {
          window.__pokerChatDetachVisualViewportListeners();
        }
      }
    } catch (eFinKb) {}
    try {
      var twLeave = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (twLeave && typeof twLeave.expand === "function") twLeave.expand();
    } catch (eTwExp) {}
    try {
      if (typeof window.dispatchEvent === "function") window.dispatchEvent(new Event("resize"));
    } catch (eRes) {}
    try {
      if (typeof pokerApplyAppTopPadding === "function") pokerApplyAppTopPadding();
    } catch (ePadL) {}
    try {
      var bnavLeaveChat = document.querySelector(".bottom-nav");
      if (bnavLeaveChat) {
        bnavLeaveChat.classList.add("bottom-nav--no-transition");
        var rafLvc = window.requestAnimationFrame || function (fn) {
          setTimeout(fn, 16);
        };
        rafLvc(function () {
          rafLvc(function () {
            bnavLeaveChat.classList.remove("bottom-nav--no-transition");
          });
        });
      }
    } catch (eNavLvc) {}
    setTimeout(function () {
      try {
        if (document.body.classList.contains("chat-keyboard-open")) return;
        if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") window.__pokerFinalizeChatKeyboardDismiss();
      } catch (eKb2) {}
      try {
        if (typeof pokerNukeIosKeyboardViewportArtifacts === "function") pokerNukeIosKeyboardViewportArtifacts({ resetMainScroll: true });
      } catch (eNk2) {}
      try {
        var tw2 = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tw2 && typeof tw2.expand === "function") tw2.expand();
      } catch (eTw2) {}
      try {
        if (typeof pokerFlushBottomNavAndViewportAfterChatChrome === "function") pokerFlushBottomNavAndViewportAfterChatChrome();
      } catch (eFlLv) {}
    }, 120);
    setTimeout(function () {
      try {
        if (document.body.classList.contains("chat-keyboard-open")) return;
        if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") window.__pokerFinalizeChatKeyboardDismiss();
      } catch (eKb3) {}
      try {
        if (typeof pokerNukeIosKeyboardViewportArtifacts === "function") pokerNukeIosKeyboardViewportArtifacts({ resetMainScroll: true });
      } catch (eNk3) {}
      try {
        if (typeof pokerFlushBottomNavAndViewportAfterChatChrome === "function") pokerFlushBottomNavAndViewportAfterChatChrome();
      } catch (eFlLv2) {}
    }, 380);
  }
  if (prevView && prevView !== viewName) {
    viewScrollMemory[prevView] = getMainDocumentScrollY();
  }
  if (document.body) {
    pokerClearBodyDocumentScrollLockInline();
    document.body.setAttribute("data-view", viewName || "");
    try {
      if (typeof window.__pokerSyncProfileGuestWebsiteMode === "function") {
        window.__pokerSyncProfileGuestWebsiteMode();
      }
    } catch (eProfileGuestSync) {}
    try {
      if (viewName !== "home" && prevView === "home") {
        var olH = document.querySelector(".view[data-view=\"home\"] .home-welcome-outline");
        if (olH) olH.style.removeProperty("--home-welcome-outline-frame-h");
      }
    } catch (eHof) {}
  }
  try {
    if (typeof window.__pokerSyncSiteHomeInstructionMode === "function") window.__pokerSyncSiteHomeInstructionMode();
  } catch (eSiteHomeHdrView) {}
  try {
    if (viewName === "chat") {
      var guestChatGate = document.getElementById("chatDialogsGuestGate");
      var isTelegramMiniView = !!(window.Telegram && window.Telegram.WebApp);
      if (
        guestChatGate &&
        document.documentElement &&
        document.documentElement.classList &&
        (isTelegramMiniView ||
          document.documentElement.classList.contains("poker-ios-pwa") ||
          document.documentElement.classList.contains("poker-android-pwa"))
      ) {
        guestChatGate.hidden = true;
      }
    }
  } catch (eGuestGatePwaHide) {}
  /* После data-view: иначе при выходе из чата ensure видел data-view=chat и выходил раньше времени */
  if (viewName !== "chat") pokerEnsureUnlockedDocumentScrollForNonChat();
  if (prevView === "chat" && viewName !== "chat") {
    try {
      if (typeof window.__pokerStopChatDmFocusSession === "function") window.__pokerStopChatDmFocusSession();
    } catch (eDmLv) {}
    try {
      var rafPostChat = window.requestAnimationFrame || function (fn) {
        setTimeout(fn, 16);
      };
      rafPostChat(function () {
        try {
          if (typeof pokerNukeIosKeyboardViewportArtifacts === "function") pokerNukeIosKeyboardViewportArtifacts({ resetMainScroll: true });
        } catch (ePostNv) {}
      });
    } catch (ePostChat) {}
  }
  pokerGetViewNodes().forEach(function (view) {
    if (view.dataset.view === viewName) {
      view.classList.add("view--active");
    } else {
      view.classList.remove("view--active");
    }
  });
  try {
    pokerSyncInertForViewScreensOnly();
  } catch (eInactiveViewsInert) {}
  // Мгновенный финальный вид нижней навигации при возврате на главную (без 250ms «доезда» поверх контента).
  if (viewName === "home" && prevView !== "home") {
    try {
      var bnavNt = document.querySelector(".bottom-nav");
      if (bnavNt) {
        bnavNt.classList.add("bottom-nav--no-transition");
        var rafNavNt = window.requestAnimationFrame || function (fn) { setTimeout(fn, 16); };
        rafNavNt(function () {
          rafNavNt(function () {
            bnavNt.classList.remove("bottom-nav--no-transition");
          });
        });
      }
    } catch (eNavNt) {}
  }
  navItems.forEach(function (item) {
    if (item.dataset.viewTarget === viewName) {
      item.classList.add("bottom-nav__item--active");
    } else {
      item.classList.remove("bottom-nav__item--active");
    }
  });
  if (footer) {
    if (viewName === "home") {
      footer.classList.remove("card__footer--hidden");
      fetchVisitorStatsOnly();
      if (typeof fetchRaffleBadge === "function") fetchRaffleBadge();
      if (typeof tryChillRadioPlay === "function") tryChillRadioPlay();
    } else {
      footer.classList.add("card__footer--hidden");
    }
  }
  if (viewName === "home") {
    initPokerShowsPlayer();
    if (typeof updateTournamentDayBlock === "function") updateTournamentDayBlock();
    try {
      var runHomeChatBoot = function () {
        if (typeof window.__pokerScheduleChatBootstrapFetch === "function") {
          window.__pokerScheduleChatBootstrapFetch();
        }
      };
      if (typeof isTelegramWebApp === "function" && isTelegramWebApp()) {
        setTimeout(runHomeChatBoot, 0);
      } else {
        var idleChatBoot = window.requestIdleCallback || function (cb) { setTimeout(cb, 80); };
        idleChatBoot(runHomeChatBoot);
      }
    } catch (eChatBootHome) {}
    if (!window.chatListenersAttached && typeof initChat === "function") {
      var idle = window.requestIdleCallback || function (cb) { setTimeout(cb, 100); };
      idle(function () {
        var canInitHomeChat = false;
        try {
          canInitHomeChat = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
        } catch (eHomeChatCred) {}
        if (!canInitHomeChat && window.Telegram && window.Telegram.WebApp) {
          try {
            canInitHomeChat = !!String(window.Telegram.WebApp.initData || "");
          } catch (eHomeChatTg) {}
        }
        if (canInitHomeChat) initChat();
      });
    }
    try {
      if (typeof pokerUpdateHomeWelcomeOutlineFrame === "function") {
        var rafHof = window.requestAnimationFrame || function (fn) { setTimeout(fn, 0); };
        rafHof(function () {
          rafHof(function () {
            pokerUpdateHomeWelcomeOutlineFrame();
          });
        });
      }
    } catch (eHomeOf) {}
  }
  if (viewName === "chat") {
    try {
      pokerPushOpenStateDebug("setView-chat-branch", "");
    } catch (eSetViewDbg1) {}
    try {
      if (typeof window.__pokerClearChatKeyboardViewportState === "function") window.__pokerClearChatKeyboardViewportState();
    } catch (eChatKbCls) {}
    /* Один expand вместо burst: повторы дергали viewportChanged/padding и таббар подпрыгивал */
    if (prevView !== "chat" && typeof window.tryTelegramWebAppExpand === "function") {
      window.tryTelegramWebAppExpand();
    }
    try {
      if (prevView !== "chat") {
        var bnavChat = document.querySelector(".bottom-nav");
        if (bnavChat) {
          bnavChat.classList.add("bottom-nav--no-transition");
          var rafNavChat = window.requestAnimationFrame || function (fn) {
            setTimeout(fn, 16);
          };
          rafNavChat(function () {
            rafNavChat(function () {
              bnavChat.classList.remove("bottom-nav--no-transition");
            });
          });
        }
      }
    } catch (eNavChat) {}
    if (prevView !== "chat") {
      try {
        var rafDmEnter = window.requestAnimationFrame || function (fn) {
          setTimeout(fn, 16);
        };
        rafDmEnter(function () {
          try {
            if (typeof window.pokerUpdateChatDmFocusFromUiState === "function") window.pokerUpdateChatDmFocusFromUiState();
          } catch (eDmEnt) {}
        });
      } catch (eRafDm) {}
    }
    if (!window.chatListenersAttached && typeof initChat === "function") {
      try {
        pokerPushOpenStateDebug("setView-chat-initChat", "listeners=0");
      } catch (eSetViewDbg2) {}
      var runChatInit = function () {
        if (!window.chatListenersAttached && typeof initChat === "function") initChat();
      };
      if (typeof isTelegramWebApp === "function" && isTelegramWebApp()) {
        setTimeout(runChatInit, 0);
      } else {
        var idleChat = window.requestIdleCallback || function (cb) { setTimeout(cb, 100); };
        idleChat(runChatInit);
      }
    } else if (window.chatListenersAttached) {
      try {
        pokerPushOpenStateDebug("setView-chat-refresh-path", "listeners=1");
      } catch (eSetViewDbg3) {}
      if (window.__pendingOpenClubChatGeneral) {
        window.__pendingOpenClubChatGeneral = false;
        if (typeof window.tryOpenClubChatFromDialogs === "function") window.tryOpenClubChatFromDialogs();
        else if (typeof window.openClubChat === "function") window.openClubChat();
      } else if (window.__pendingOpenChatPersonalFromDeepLink && typeof window.chatOpenConvFromDialogs === "function") {
        try {
          var pendingDmSetView = window.__pendingOpenChatPersonalFromDeepLink;
          var pendingPeerSetView =
            pendingDmSetView && pendingDmSetView.userId != null ? String(pendingDmSetView.userId).trim() : "";
          pokerPushOpenStateDebug("setView-chat-open-pending", pendingPeerSetView || "");
          if (
            pendingPeerSetView &&
            typeof pokerOpenResolvedChatPeer === "function" &&
            pokerOpenResolvedChatPeer(
              pendingPeerSetView,
              pendingDmSetView.userName || pendingPeerSetView
            )
          ) {
            window.__pendingOpenChatPersonalFromDeepLink = null;
          } else if (
            pendingPeerSetView &&
            typeof pokerOpenPendingPushDmWithoutContacts === "function" &&
            pokerOpenPendingPushDmWithoutContacts(
              pendingPeerSetView,
              pendingDmSetView.userName || pendingPeerSetView
            )
          ) {
            pokerSchedulePendingPushDmContactsReload(
              pendingPeerSetView,
              pendingDmSetView.userName || pendingPeerSetView
            );
          } else if (
            pendingPeerSetView &&
            typeof pokerOpenChatPeerDirectFallback === "function" &&
            pokerOpenChatPeerDirectFallback(
              pendingPeerSetView,
              pendingDmSetView.userName || pendingPeerSetView
            )
          ) {
            pokerSchedulePendingPushDmContactsReload(
              pendingPeerSetView,
              pendingDmSetView.userName || pendingPeerSetView
            );
          } else {
            if (typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function") {
              window.__pokerEnsureOpenPendingChatPersonalFromDeepLink();
            }
          }
        } catch (eSetViewOpenPending) {
          try {
            window.__pokerForceAllowPendingPushConvOpen = false;
          } catch (eSetViewForceReset) {}
          if (typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function") {
            window.__pokerEnsureOpenPendingChatPersonalFromDeepLink();
          }
        }
      } else if (window.__pendingOpenChatPersonalFromDeepLink) {
        try {
          pokerPushOpenStateDebug(
            "setView-chat-wait-exports",
            "openConv=" + (typeof window.chatOpenConvFromDialogs) + " pushImm=" + (typeof window.__pokerOpenPushDmImmediate)
          );
        } catch (eSetViewDbg4) {}
        window.__pokerPendingChatDeepLinkNeedsLateFlush = true;
      } else if (typeof pokerGuardDefaultDialogsOpen === "function" && pokerGuardDefaultDialogsOpen()) {
      } else if (typeof window.chatShowDialogs === "function") {
        window.chatShowDialogs();
      }
    }
  }
  if (viewName === "winter-rating") {
    var winterView = document.querySelector('[data-view="winter-rating"]');
    var springView = document.querySelector('[data-view="spring-rating"]');
    var ratingSection = document.getElementById("winterRatingSection");
    var springPlaceholder = document.getElementById("springRatingSectionPlaceholder");
    if (ratingSection && springPlaceholder && ratingSection.classList.contains("spring-rating")) {
      ratingSection.classList.remove("spring-rating");
      if (winterView) winterView.appendChild(ratingSection);
    }
    try {
      initWinterRating();
    } catch (err) {
      if (typeof console !== "undefined" && console.error) console.error("initWinterRating", err);
    }
  }
  if (viewName === "spring-rating") {
    var winterView = document.querySelector('[data-view="winter-rating"]');
    var ratingSection = document.getElementById("winterRatingSection");
    var springPlaceholder = document.getElementById("springRatingSectionPlaceholder");
    if (ratingSection && springPlaceholder && winterView && ratingSection.parentNode === winterView) {
      winterView.removeChild(ratingSection);
      ratingSection.classList.add("spring-rating");
      springPlaceholder.appendChild(ratingSection);
    } else if (ratingSection && !ratingSection.classList.contains("spring-rating")) {
      ratingSection.classList.add("spring-rating");
    }
    try {
      initWinterRating();
    } catch (err) {
      if (typeof console !== "undefined" && console.error) console.error("initWinterRating", err);
    }
    if (typeof initSpringRatingViewScrollButton === "function") {
      initSpringRatingViewScrollButton();
      requestAnimationFrame(updateSpringRatingViewScrollButton);
    }
  }
  if (viewName === "profile") {
    try {
      pokerRememberTransportMemberIdFromEnvironment();
    } catch (eRememberEnvProfile) {}
    updateProfileUserName();
    updateProfileExitBtnVisibility();
    updateProfileDtId();
    try {
      if (typeof loadProfileDebugInfo === "function") loadProfileDebugInfo();
    } catch (eProfileDebugInit) {}
    try {
      if (typeof pokerRefreshFriendsCountFromApi === "function") pokerRefreshFriendsCountFromApi();
    } catch (eFrC) {}
    initProfileKeyboardViewportCleanup();
    initProfileTabs();
    initProfileP21Id();
    initProfilePokerPlus();
    initProfileEmailAuth();
    initProfilePersonal();
    initProfileAvatar();
    syncProfileStatusVisual();
    initProfileFishCollectionModal();
    loadProfileRespect();
    initProfileRespectVotersButton();
    initProfileFriends();
    initProfileExitBtn();
    initProfileChatPush();
  }
  if (viewName === "cashout") {
    initCashoutDepositForm();
  }
  if (viewName === "streams") {
    initStreams();
    // После initStreams: и при первом полном init, и при раннем return (__streamsInitAttached)
    // нужно съесть __pendingStreamsRoomId (deep link из Telegram / ?startapp=streams_…).
    if (typeof consumePendingStreamsWatchRoom === "function") consumePendingStreamsWatchRoom();
  } else {
    if (typeof streamsCleanup === "function") streamsCleanup();
  }
  if (viewName === "bonus-game") {
    initBonusGame();
    if (typeof bonusPikhaninaInterval !== "undefined" && bonusPikhaninaInterval) clearInterval(bonusPikhaninaInterval);
    if (typeof updatePikhaninaStats === "function" && typeof updateBonusStats === "function") {
      bonusPikhaninaInterval = setInterval(function () {
        updatePikhaninaStats();
        updateBonusStats();
      }, 60000);
    }
  } else if (typeof bonusPikhaninaInterval !== "undefined" && bonusPikhaninaInterval) {
    clearInterval(bonusPikhaninaInterval);
    bonusPikhaninaInterval = null;
  }
  if (viewName === "cooler-game") initCoolerGame();
  if (viewName === "plasterer-game") initPlastererGame();
  if (viewName === "raffles") {
    if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
    initRaffles();
  }
  if (viewName === "equilator") initEquilator();
  if (viewName === "video-lessons") {
    initVideoLessons();
    if (window.__pendingVideoLessonsOpenReviews) {
      window.__pendingVideoLessonsOpenReviews = false;
      try {
        if (typeof trackLinkSessionEvent === "function") trackLinkSessionEvent("deep:vl_reviews_nikolay", "");
      } catch (eVlDeep) {}
      var rafVlReviews = window.requestAnimationFrame || function (cb) {
        setTimeout(cb, 16);
      };
      rafVlReviews(function () {
        rafVlReviews(function () {
          var revOpenBtn = document.getElementById("videoLessonsReviewsOpenBtn");
          if (revOpenBtn && typeof revOpenBtn.click === "function") revOpenBtn.click();
        });
      });
    }
  }
  if (viewName === "poker-tasks") {
    var startScreen = document.getElementById("pokerTasksStartScreen");
    var streakScreen = document.getElementById("pokerStreakScreen");
    var resultScreen = document.getElementById("pokerStreakResultScreen");
    var pokerTasksView = document.querySelector('[data-view="poker-tasks"]');
    if (startScreen) startScreen.style.display = "";
    if (streakScreen) {
      streakScreen.classList.add("poker-streak-screen--hidden");
      streakScreen.style.display = "none";
    }
    if (resultScreen) {
      resultScreen.classList.add("poker-streak-result-screen--hidden");
      resultScreen.style.display = "none";
    }
    if (pokerTasksView) pokerTasksView.classList.remove("poker-tasks--task-visible");
    if (typeof window.refreshMttStats === "function") window.refreshMttStats();
    initClubTasksPlanner();
  }
  var headerGreeting = document.getElementById("headerGreeting");
  var headerSwitcherWrap = document.getElementById("headerChatSwitcherWrap");
  var greetingWrap = headerGreeting && headerGreeting.closest(".header-greeting-wrap");
  if (greetingWrap) greetingWrap.classList.toggle("header-greeting--hidden", viewName === "chat");
  if (headerSwitcherWrap) headerSwitcherWrap.classList.toggle("header-chat-switcher--hidden", viewName !== "chat");
  if (viewName === "chat") {
    document.documentElement.classList.add("app-view-chat");
    document.documentElement.classList.remove("app-view-winter-rating", "app-view-home");
    if (typeof updateChatNavDot === "function") updateChatNavDot();
    if (window.chatListenersAttached && typeof window.chatRefresh === "function") {
      window.chatRefresh();
    } else if (typeof initChat === "function") {
      initChat();
    }
    try {
      if (
        !window.__pendingOpenClubChatGeneral &&
        !window.__pendingOpenChatPersonalFromDeepLink &&
        typeof window.chatShowDialogs === "function"
      ) {
        setTimeout(function () {
          try {
            if (
              document.body &&
              document.body.getAttribute("data-view") === "chat" &&
              !window.__pendingOpenClubChatGeneral &&
              !window.__pendingOpenChatPersonalFromDeepLink &&
              typeof window.chatShowDialogs === "function"
            ) {
              window.chatShowDialogs();
            }
          } catch (eChatShowDialogsLater) {}
        }, 0);
      }
    } catch (eChatShowDialogsEnter) {}
    try {
      [0, 250, 900].forEach(function (delay) {
        setTimeout(function () {
          try {
            var contacts = document.getElementById("chatContacts");
            if (!contacts || !contacts.querySelector || !contacts.querySelector(".chat-empty--skeleton")) return;
            if (typeof window.__pokerKickChatContactsLoad === "function") {
              window.__pokerKickChatContactsLoad({ forceRerender: true });
            } else if (typeof window.__pokerReloadChatContacts === "function") {
              window.__pokerReloadChatContacts({ forceRerender: true });
            } else if (typeof window.chatShowDialogs === "function") {
              window.chatShowDialogs();
            }
          } catch (eChatContactsKick) {}
        }, delay);
      });
    } catch (eChatContactsKickSetup) {}
    try {
      pokerTryConsumePendingManagerFromCashout();
    } catch (eCashoutMgr) {}
    try {
      if (window.__pokerPushNeedsFullChatBootstrap) {
        pokerPushOpenStateDebug("setView-chat-full-bootstrap", "");
        window.__pokerPushNeedsFullChatBootstrap = false;
        try {
          window.__pokerContactsMetaPollRev = null;
          window.__pokerGeneralPollRev = "";
          window.__pokerPersonalPollRev = "";
        } catch (eChatBootstrapRevReset) {}
        setTimeout(function () {
          try {
            if (typeof loadContacts === "function") loadContacts();
          } catch (eChatBootstrapContacts) {}
          try {
            if (typeof loadGeneral === "function") loadGeneral();
          } catch (eChatBootstrapGeneral) {}
          try {
            if (typeof window.__pokerScheduleChatBootstrapFetch === "function") {
              window.__pokerScheduleChatBootstrapFetch();
            }
          } catch (eChatBootstrapFetch) {}
        }, 0);
      }
    } catch (eChatBootstrapWrap) {}
    try {
      if (window.__pendingOpenChatPersonalFromDeepLink) {
        var pendingAfterChatRefresh = window.__pendingOpenChatPersonalFromDeepLink;
        var pendingAfterChatPeer =
          pendingAfterChatRefresh && pendingAfterChatRefresh.userId != null
            ? String(pendingAfterChatRefresh.userId).trim()
            : "";
        if (pendingAfterChatPeer) {
          setTimeout(function () {
            try {
              pokerPushOpenStateDebug("setView-chat-post-refresh-open", pendingAfterChatPeer);
              if (
                window.__pendingOpenChatPersonalFromDeepLink &&
                typeof pokerOpenResolvedChatPeer === "function" &&
                pokerOpenResolvedChatPeer(
                  pendingAfterChatPeer,
                  pendingAfterChatRefresh.userName || pendingAfterChatPeer
                )
              ) {
                window.__pendingOpenChatPersonalFromDeepLink = null;
                return;
              }
              if (
                window.__pendingOpenChatPersonalFromDeepLink &&
                typeof pokerOpenPendingPushDmWithoutContacts === "function" &&
                pokerOpenPendingPushDmWithoutContacts(
                  pendingAfterChatPeer,
                  pendingAfterChatRefresh.userName || pendingAfterChatPeer
                )
              ) {
                pokerSchedulePendingPushDmContactsReload(
                  pendingAfterChatPeer,
                  pendingAfterChatRefresh.userName || pendingAfterChatPeer
                );
                return;
              }
              if (
                window.__pendingOpenChatPersonalFromDeepLink &&
                typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function"
              ) {
                if (typeof window.__pokerEnsureOpenPendingChatPersonalFromDeepLink === "function") {
                  window.__pokerEnsureOpenPendingChatPersonalFromDeepLink();
                }
              }
            } catch (eChatPostRefreshOpen) {}
          }, 0);
        }
      }
    } catch (eChatPostRefreshWrap) {}
  } else if (viewName === "winter-rating") {
    document.documentElement.classList.remove("app-view-chat", "app-view-home", "app-view-spring-rating");
    document.documentElement.classList.add("app-view-winter-rating");
  } else if (viewName === "spring-rating") {
    document.documentElement.classList.remove("app-view-chat", "app-view-home", "app-view-winter-rating");
    document.documentElement.classList.add("app-view-spring-rating");
  } else if (viewName === "home") {
    document.documentElement.classList.remove("app-view-chat", "app-view-winter-rating", "app-view-spring-rating");
    document.documentElement.classList.add("app-view-home");
    var ratingSection = document.getElementById("winterRatingSection");
    var winterView = document.querySelector('[data-view="winter-rating"]');
    var springPlaceholder = document.getElementById("springRatingSectionPlaceholder");
    if (ratingSection && ratingSection.classList.contains("spring-rating") && winterView && springPlaceholder && ratingSection.parentNode === springPlaceholder) {
      ratingSection.classList.remove("spring-rating");
      springPlaceholder.removeChild(ratingSection);
      winterView.appendChild(ratingSection);
    }
  } else {
    document.documentElement.classList.remove("app-view-chat", "app-view-winter-rating", "app-view-spring-rating", "app-view-home");
    var ratingSection = document.getElementById("winterRatingSection");
    var winterView = document.querySelector('[data-view="winter-rating"]');
    var springPlaceholder = document.getElementById("springRatingSectionPlaceholder");
    if (ratingSection && ratingSection.classList.contains("spring-rating") && winterView && springPlaceholder && ratingSection.parentNode === springPlaceholder) {
      ratingSection.classList.remove("spring-rating");
      springPlaceholder.removeChild(ratingSection);
      winterView.appendChild(ratingSection);
    }
  }
  document.documentElement.classList.toggle("app-view-browser-local", viewName !== "chat");
  /* Длинные экраны без :has() в CSS — часть WebView Telegram не крутит страницу; главную сюда не включать (ломает скролл). */
  var longScroll =
    viewName === "learn-play-hub" ||
    viewName === "poker-tasks" ||
    viewName === "hall-of-fame";
  document.documentElement.classList.toggle("app-view-long-scroll", longScroll);
  if (document.body) document.body.classList.toggle("app-view-long-scroll", longScroll);
  /* Видеоуроки: внутренний scrollport в .card__content (как профиль); класс app-view-video-lessons-html-scroll — см. styles.css */
  document.documentElement.classList.remove("app-view-vl-html-scroll");
  /* Зал славы: класс на html — внутренний scrollport в .card__content (как «Скачать»); раньше был scroll на <html>. */
  document.documentElement.classList.toggle("app-view-hall-html-scroll", viewName === "hall-of-fame");
  /* Скачать: scrollport в .card__content (локальный Chrome + TG); класс на html — цепочка высот/overflow */
  document.documentElement.classList.toggle("app-view-download-html-scroll", viewName === "download");
  /* Главная, депозит, рейтинг весны, профиль, видеоуроки: тот же внутренний scrollport в .card__content, что и у «Скачать». */
  document.documentElement.classList.toggle("app-view-home-html-scroll", viewName === "home");
  document.documentElement.classList.toggle("app-view-cashout-html-scroll", viewName === "cashout");
  document.documentElement.classList.toggle("app-view-spring-rating-html-scroll", viewName === "spring-rating");
  document.documentElement.classList.toggle("app-view-profile-html-scroll", viewName === "profile");
  document.documentElement.classList.toggle("app-view-video-lessons-html-scroll", viewName === "video-lessons");
  document.documentElement.classList.toggle("app-view-raffles-html-scroll", viewName === "raffles");
  var appEl = document.getElementById("app");
  if (appEl) appEl.classList.toggle("app--view-home", viewName === "home");
  try {
    if (typeof pokerApplyTelegramTopClearance === "function") pokerApplyTelegramTopClearance();
  } catch (eTgClear) {}
  if (viewName === "hall-of-fame") {
    var rafHall = window.requestAnimationFrame || function (fn) {
      setTimeout(fn, 16);
    };
    rafHall(function () {
      rafHall(function () {
        if (typeof showHallOfFamePanel === "function") showHallOfFamePanel("legends");
      });
    });
  }
  try {
    if (typeof trackLinkSessionEvent === "function") trackLinkSessionEvent("view:" + (viewName || "unknown"), "");
  } catch (eTrackView) {}
  if (viewName && viewName !== prevView) {
    try {
      if (typeof window.pokerRecordSectionViewOpen === "function") window.pokerRecordSectionViewOpen(viewName);
      if (typeof window.pokerAdminRefreshSectionViewsDebounced === "function") window.pokerAdminRefreshSectionViewsDebounced();
    } catch (eSecView) {}
  }
  /* С верха при обычной навигации; по «Назад» — восстанавливаем сохранённый Y (после смены классов на html/body). */
  if (viewName !== prevView) {
    var rafScroll = window.requestAnimationFrame || function (fn) {
      setTimeout(fn, 16);
    };
    if (restoreScrollOnEnter && Object.prototype.hasOwnProperty.call(viewScrollMemory, viewName)) {
      var yBack = viewScrollMemory[viewName];
      var restoreScheduledAt = Date.now();
      var restoreMainScrollIfStillIdle = function () {
        try {
          if (
            typeof window.pokerGetLastMainScrollUserIntentAt === "function" &&
            window.pokerGetLastMainScrollUserIntentAt() >= restoreScheduledAt
          ) {
            return;
          }
        } catch (eRestoreIntent) {}
        setMainDocumentScrollY(yBack);
      };
      rafScroll(function () {
        restoreMainScrollIfStillIdle();
        rafScroll(function () {
          restoreMainScrollIfStillIdle();
        });
      });
      setTimeout(function () {
        restoreMainScrollIfStillIdle();
      }, 0);
      setTimeout(function () {
        restoreMainScrollIfStillIdle();
      }, 50);
      setTimeout(function () {
        restoreMainScrollIfStillIdle();
      }, 120);
    } else {
      scrollMainDocumentToTop();
      /* Чат: только синхронный сброс — повторный rAF доводил окно и давал «вверх—вниз» в первые сотни мс вместе с лентой. */
      if (viewName !== "chat") {
        rafScroll(function () {
          if (typeof window.pokerScheduleScrollMainDocumentToTop === "function") {
            window.pokerScheduleScrollMainDocumentToTop(0);
            return;
          }
          scrollMainDocumentToTop();
        });
        if (typeof window.pokerScheduleScrollMainDocumentToTop === "function") {
          window.pokerScheduleScrollMainDocumentToTop(0);
          window.pokerScheduleScrollMainDocumentToTop(50);
        } else {
          setTimeout(scrollMainDocumentToTop, 0);
          setTimeout(scrollMainDocumentToTop, 50);
        }
      }
    }
  }
  try {
    pokerApplyBottomTabbarPad();
    if (viewName === "home") {
      var rafBtp = window.requestAnimationFrame || function (fn) {
        setTimeout(fn, 16);
      };
      rafBtp(function () {
        rafBtp(function () {
          if (typeof pokerApplyBottomTabbarPad === "function") pokerApplyBottomTabbarPad();
        });
      });
      setTimeout(function () {
        if (typeof pokerApplyBottomTabbarPad === "function") pokerApplyBottomTabbarPad();
      }, 150);
    }
  } catch (eBtpSetView) {}
}


navItems.forEach(function (item) {
  item.addEventListener("click", function (e) {
    var target = item.dataset.viewTarget;
    if (target) {
      setView(target);
      if (target === "download" && typeof setDownloadPage === "function") setDownloadPage("main");
    }
  });
});

function pokerFinalizeChatFromTabOpen() {
  [0, 80, 240, 700, 1400, 2400].forEach(function (delay) {
    setTimeout(function () {
      try {
        if (typeof initChat === "function" && !window.chatListenersAttached) initChat();
      } catch (eInitChatTab) {}
      try {
        if (
          document.body &&
          document.body.getAttribute("data-view") === "chat" &&
          !window.__pendingOpenClubChatGeneral &&
          !window.__pendingOpenChatPersonalFromDeepLink &&
          typeof window.chatShowDialogs === "function"
        ) {
          window.chatShowDialogs();
        }
      } catch (eShowChatTab) {}
      try {
        var contacts = document.getElementById("chatContacts");
        var clubPreview = document.getElementById("chatDialogClubPreview");
        var contactsStuck = !!(contacts && contacts.querySelector && contacts.querySelector(".chat-empty--skeleton"));
        var clubPreviewStuck = !!(clubPreview && clubPreview.classList && clubPreview.classList.contains("chat-dialog-item__preview--skeleton"));
        if (!contactsStuck && !clubPreviewStuck) return;
        if (typeof window.__pokerKickChatContactsLoad === "function") {
          window.__pokerKickChatContactsLoad({ forceRerender: true });
        } else if (typeof window.__pokerReloadChatContacts === "function") {
          window.__pokerReloadChatContacts({ forceRerender: true });
        }
      } catch (eKickChatContactsTab) {}
    }, delay);
  });
}

function pokerOpenChatFromTab() {
  if (window.__pokerChatTabOpenInFlight) return;
  window.__pokerChatTabOpenInFlight = true;
  setTimeout(function () {
    window.__pokerChatTabOpenInFlight = false;
  }, 900);
  function activateChatNow() {
    try {
      setView("chat", { htmlReady: true, scriptsReady: true });
    } catch (eSetChatImmediate) {
      try { setView("chat"); } catch (eSetChatFallback) {}
    }
    pokerFinalizeChatFromTabOpen();
  }
  try {
    var htmlReady = typeof window.pokerEnsureViewHtml === "function"
      ? window.pokerEnsureViewHtml("chat")
      : false;
    if (htmlReady && typeof htmlReady.then === "function") {
      htmlReady.then(activateChatNow).catch(function () {
        setView("chat");
        pokerFinalizeChatFromTabOpen();
      });
      return;
    }
  } catch (eChatHtml) {}
  activateChatNow();
}

(function bindChatTabFastOpen() {
  var btn = document.getElementById("chatNavBtn");
  if (!btn || btn.__pokerFastOpenBound) return;
  btn.__pokerFastOpenBound = true;
  btn.addEventListener("pointerdown", function () {
    pokerOpenChatFromTab();
  }, { passive: true });
  btn.addEventListener("touchend", function (e) {
    e.preventDefault();
    e.stopPropagation();
    pokerOpenChatFromTab();
  }, { passive: false });
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    pokerOpenChatFromTab();
  });
})();

document.addEventListener("click", function (e) {
  var interactive = e.target.closest("button, a[href], .feature--link, .home-mini-icon-item, .hero__link, .bottom-nav__item, [data-view-target], .feature, [role=\"button\"]");
  if (!interactive || e.target.closest("audio, [aria-hidden=\"true\"]") || typeof playClickSound !== "function") return;
  var defer = window.requestAnimationFrame || function (fn) { setTimeout(fn, 0); };
  defer(function () {
    try {
      playClickSound();
    } catch (eClickSound) {}
  });
}, false);

(function scrollVsTap() {
  var touchStartX = 0;
  var touchStartY = 0;
  var touchMoved = false;
  var scrollThreshold = 12;
  document.addEventListener("touchstart", function (e) {
    if (e.touches.length) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchMoved = false;
    }
  }, { passive: true });
  document.addEventListener("touchmove", function (e) {
    if (e.touches.length && !touchMoved) {
      var dx = e.touches[0].clientX - touchStartX;
      var dy = e.touches[0].clientY - touchStartY;
      if (Math.abs(dx) > scrollThreshold || Math.abs(dy) > scrollThreshold) touchMoved = true;
    }
  }, { passive: true });
  window.__touchWasScroll = function () { return touchMoved; };
  document.addEventListener("touchend", function () {
    setTimeout(function () { touchMoved = false; }, 0);
  }, { passive: true });
})();

var viewHandledInTouchend = false;

document.addEventListener("touchend", function (e) {
  if (!e.target || !e.target.closest) return;
  if (window.__touchWasScroll && window.__touchWasScroll()) return;
  var backBtn = e.target.closest(".bonus-game-back[data-view-target]");
  if (backBtn) {
    e.preventDefault();
    e.stopPropagation();
    viewHandledInTouchend = true;
    var target = backBtn.getAttribute("data-view-target");
    if (target) setView(target, { fromBack: true });
    return;
  }
  if (e.target.closest("[data-download-back]")) {
    e.preventDefault();
    e.stopPropagation();
    viewHandledInTouchend = true;
    setDownloadPage("main");
  }
}, { passive: false });

/** Клик по UI голоса в чате: <audio class="chat-msg__voice"> (в т.ч. кнопка play внутри UA shadow) или обёртка .chat-msg__voice-wrap. */
function pokerEventPathHasChatVoiceUi(e) {
  try {
    if (e && e.target && e.target.closest) {
      if (e.target.closest(".chat-msg__voice-wrap")) return true;
      if (e.target.closest("audio.chat-msg__voice")) return true;
    }
  } catch (e0) {}
  try {
    var path = typeof e.composedPath === "function" ? e.composedPath() : [];
    for (var i = 0; i < path.length; i++) {
      var n = path[i];
      if (!n || !n.nodeName) continue;
      if (n.nodeName === "AUDIO" && n.classList && n.classList.contains("chat-msg__voice")) return true;
      if (n.classList && n.classList.contains("chat-msg__voice-wrap")) return true;
    }
  } catch (e1) {}
  return false;
}

function handleViewLinkClick(e) {
  if (e.target && e.target.closest && e.target.closest("#chatDialogsView")) return;
  if (pokerEventPathHasChatVoiceUi(e)) return;
  var hallTop15Link = e.target.closest("a[data-hall-top15]");
  if (hallTop15Link) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof navigateToHallFameBlogTop15 === "function") navigateToHallFameBlogTop15();
    return;
  }
  if (viewHandledInTouchend) {
    viewHandledInTouchend = false;
    e.preventDefault();
    return;
  }
  var hallSubEarly = e.target.closest(".hall-of-fame__subtab[data-hall-section]");
  if (hallSubEarly) {
    e.preventDefault();
    e.stopPropagation();
    var secEarly = hallSubEarly.getAttribute("data-hall-section");
    if (secEarly && typeof showHallOfFamePanel === "function") {
      showHallOfFamePanel(secEarly, { activeSubtabBtn: hallSubEarly });
    }
    return;
  }
  var spring2024Btn = e.target.closest("#springRating2024InfoBtn");
  if (spring2024Btn) {
    e.preventDefault();
    e.stopPropagation();
    openSpringRating2024Modal();
    return;
  }
  var summer2024Btn = e.target.closest("#summerRating2024InfoBtn");
  if (summer2024Btn) {
    e.preventDefault();
    e.stopPropagation();
    openSummerRating2024Modal();
    return;
  }
  var summer2025Btn = e.target.closest("#summerRating2025InfoBtn");
  if (summer2025Btn) {
    e.preventDefault();
    e.stopPropagation();
    openSummerRating2025Modal();
    return;
  }
  var autumn2025Btn = e.target.closest("#autumnRating2025InfoBtn");
  if (autumn2025Btn) {
    e.preventDefault();
    e.stopPropagation();
    openAutumnRating2025Modal();
    return;
  }
  var springBtn = e.target.closest("#springRatingInfoBtn");
  if (springBtn) {
    e.preventDefault();
    e.stopPropagation();
    openSpringRatingInfoModal();
    return;
  }
  var backBtn = e.target.closest(".bonus-game-back[data-view-target]");
  if (backBtn) {
    e.preventDefault();
    e.stopPropagation();
    var target = backBtn.getAttribute("data-view-target");
    if (target) setView(target, { fromBack: true });
    return;
  }
  var link = e.target.closest("a[data-view-target]");
  if (!link || link.getAttribute("data-download-page")) return;
  e.preventDefault();
  var view = link.getAttribute("data-view-target");
  if (view) setView(view);
}

document.addEventListener("click", handleViewLinkClick);

/* Зал славы: mousedown по подвкладке без preventDefault даёт фокус кнопке → WebKit скроллит к табам. */
document.addEventListener("mousedown", function (e) {
  var sub = e.target && e.target.closest && e.target.closest(".hall-of-fame__subtab[data-hall-section]");
  if (!sub || e.button !== 0) return;
  e.preventDefault();
}, true);

document.addEventListener("touchend", function (e) {
  var top15 = e.target.closest("a[data-hall-top15]");
  if (top15) {
    if (window.__touchWasScroll && window.__touchWasScroll()) return;
    e.preventDefault();
    viewHandledInTouchend = true;
    if (typeof navigateToHallFameBlogTop15 === "function") navigateToHallFameBlogTop15();
    return;
  }
}, { passive: false });

document.addEventListener("click", function (e) {
  var link = e.target.closest("[data-view-target][data-download-page]");
  if (!link) return;
  e.preventDefault();
  var view = link.getAttribute("data-view-target");
  var page = link.getAttribute("data-download-page");
  if (view) setView(view);
  if (page && typeof setDownloadPage === "function") setDownloadPage(page);
});

document.addEventListener("click", function (e) {
  var appBtn = e.target.closest("[data-download-app]");
  if (appBtn) {
    var app = appBtn.dataset.downloadApp;
    if (app) setDownloadPage(app);
    return;
  }
  if (e.target.closest("[data-download-back]")) setDownloadPage("main");
});
