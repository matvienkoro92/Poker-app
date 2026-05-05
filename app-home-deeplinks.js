// Home deep links: Telegram/PWA startapp routing and notification open glue.

function pokerInitHomeDeepLinks(opts) {
  opts = opts || {};
  var openGazette = typeof opts.openGazette === "function" ? opts.openGazette : null;
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
}
