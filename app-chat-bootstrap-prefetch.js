// Chat bootstrap cache warmup and fresh contacts/general prefetch runtime.

function initChatBootstrapPrefetchRuntime(opts) {
  opts = opts || {};

  function pokerPrefetchDiskPeersWarmup() {
    try {
      if (typeof opts.pokerHydrateChatSnapshotsFromDisk === "function") opts.pokerHydrateChatSnapshotsFromDisk();
    } catch (eHydW) {}
    var cache = opts.personalMessagesCache || {};
    var idx = 0;
    for (var pk in cache) {
      if (!Object.prototype.hasOwnProperty.call(cache, pk)) continue;
      if (idx >= 20) break;
      var pid = String(pk);
      if (!pid) continue;
      var activePeer = opts.chatWithUserId;
      if (activePeer && typeof opts.peerChatIdsEqual === "function" && opts.peerChatIdsEqual(activePeer, pid)) continue;
      (function (idWarm, delayMs) {
        setTimeout(function () {
          try {
            if (typeof opts.prefetchPersonalMessages === "function") opts.prefetchPersonalMessages(idWarm);
          } catch (ePf) {}
        }, delayMs);
      })(pid, idx * 40);
      idx++;
    }
  }

  function chatSummaryNumber(value) {
    var n = parseInt(String(value != null && value !== false ? value : "0"), 10);
    return isFinite(n) && n > 0 ? n : 0;
  }

  function applyChatHomeSummaryPayload(data) {
    if (!data || !data.ok) return;
    var generalUnread = chatSummaryNumber(data.generalUnreadCount != null ? data.generalUnreadCount : data.generalUnread);
    var personalUnread = chatSummaryNumber(
      data.personalUnreadTotal != null ? data.personalUnreadTotal : data.personalUnreadCount
    );
    try {
      window.chatGeneralUnreadCount = generalUnread;
      window.chatGeneralUnread = generalUnread > 0;
      window.chatPersonalUnreadTotalFromContacts = personalUnread;
      window.chatPersonalUnreadCount = personalUnread;
      if (data.clubChatPendingReviewCount != null) {
        window.chatClubPendingReviewCount = chatSummaryNumber(data.clubChatPendingReviewCount);
      }
    } catch (eSumState) {}
    try {
      if (typeof opts.updateChatNavDot === "function") opts.updateChatNavDot();
      else if (typeof updateChatNavDot === "function") updateChatNavDot();
    } catch (eSumDot) {}
    try {
      window.dispatchEvent(new CustomEvent("poker-chat-home-summary", { detail: data }));
    } catch (eSumEvent) {}
  }

  function scheduleChatHomeSummaryFetch() {
    try {
      if (typeof opts.pokerReadPwaGuestMode === "function" && opts.pokerReadPwaGuestMode()) return;
      if (typeof opts.pokerApiHasCredential !== "function" || !opts.pokerApiHasCredential()) return;
      if (typeof opts.pokerChatContactsAuthFingerprint === "function" && !opts.pokerChatContactsAuthFingerprint()) return;
      var base = opts.base || "";
      if (!base) return;
      var nowS = Date.now();
      var hiddenS = typeof document !== "undefined" && document.visibilityState !== "visible";
      var cooldownMs = hiddenS ? 300000 : 60000;
      if (window.__pokerChatHomeSummaryCooldownUntil && nowS < window.__pokerChatHomeSummaryCooldownUntil) return;
      window.__pokerChatHomeSummaryCooldownUntil = nowS + cooldownMs;
      var genS = (window.__pokerChatHomeSummaryGen || 0) + 1;
      window.__pokerChatHomeSummaryGen = genS;
      var lastVS = "";
      try {
        var lvS = {};
        if (opts.lastViewedGeneral != null) lvS.general = opts.lastViewedGeneral;
        if (lvS.general != null) lastVS = "&lastViewed=" + encodeURIComponent(JSON.stringify(lvS));
      } catch (eLvS) {}
      var qS = typeof opts.pokerApiAuthQuery === "function" ? opts.pokerApiAuthQuery("?") : "?";
      fetch(base + "/api/chat" + qS + "&mode=homeSummary" + lastVS, { cache: "no-store" })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (genS !== window.__pokerChatHomeSummaryGen) return;
          applyChatHomeSummaryPayload(data);
        })
        .catch(function () {});
    } catch (eSum) {}
  }

  function scheduleChatBootstrapFetch() {
    try {
      if (typeof opts.pokerReadPwaGuestMode === "function" && opts.pokerReadPwaGuestMode()) return;
      if (typeof opts.pokerApiHasCredential !== "function" || !opts.pokerApiHasCredential()) return;
      if (typeof opts.pokerChatContactsAuthFingerprint === "function" && !opts.pokerChatContactsAuthFingerprint()) return;
      var base = opts.base || "";
      if (!base) return;
      var nowB = Date.now();
      if (window.__pokerChatBootstrapCooldownUntil && nowB < window.__pokerChatBootstrapCooldownUntil) return;
      window.__pokerChatBootstrapCooldownUntil = nowB + 2800;
      var genB = (window.__pokerChatBootstrapGen || 0) + 1;
      window.__pokerChatBootstrapGen = genB;
      var lastVP = "";
      try {
        var lvB = {};
        if (opts.lastViewedGeneral != null) lvB.general = opts.lastViewedGeneral;
        if (lvB.general != null) lastVP = "&lastViewed=" + encodeURIComponent(JSON.stringify(lvB));
      } catch (eLvB) {}
      var qB = typeof opts.pokerApiAuthQuery === "function" ? opts.pokerApiAuthQuery("?") : "?";
      var urlContactsB = base + "/api/chat" + qB + "&mode=contacts" + lastVP;
      var urlGeneralB = base + "/api/chat" + qB + "&mode=general&usersById=1&trackSeen=0";
      fetch(urlContactsB, { cache: "no-store" })
        .then(function (r) {
          return r.json();
        })
        .then(function (dc) {
          if (genB !== window.__pokerChatBootstrapGen) return;
          if (dc && dc.ok) {
            try {
              if (typeof opts.pokerWriteContactsCache === "function") opts.pokerWriteContactsCache(dc);
            } catch (eWrC) {}
            var onChatV = document.body && document.body.getAttribute("data-view") === "chat";
            if (onChatV) {
              try {
                if (typeof opts.applyContactsApiResponse === "function") opts.applyContactsApiResponse(dc);
              } catch (eAppC) {}
            }
            try {
              if (Array.isArray(dc.contacts) && typeof opts.prefetchTopPersonalDialogs === "function") {
                opts.prefetchTopPersonalDialogs(dc.contacts);
              }
            } catch (ePreC) {}
          }
        })
        .catch(function () {});
      fetch(urlGeneralB, { cache: "no-store" })
        .then(function (r) {
          return r.json();
        })
        .then(function (dg) {
          if (genB !== window.__pokerChatBootstrapGen) return;
          if (dg && dg.ok && Array.isArray(dg.messages) && typeof pokerHydrateChatMessagesFromUsersById === "function") {
            dg = Object.assign({}, dg, {
              messages: pokerHydrateChatMessagesFromUsersById(dg.messages, dg.usersById),
            });
          }
          if (typeof opts.ingestBootstrapGeneralSnapshot === "function") opts.ingestBootstrapGeneralSnapshot(dg);
        })
        .catch(function () {});
    } catch (eBoot) {}
  }
  try {
    window.__pokerScheduleChatBootstrapFetch = scheduleChatBootstrapFetch;
    window.__pokerScheduleChatHomeSummaryFetch = scheduleChatHomeSummaryFetch;
  } catch (eExBoot) {}

  return {
    pokerPrefetchDiskPeersWarmup: pokerPrefetchDiskPeersWarmup,
    scheduleChatHomeSummaryFetch: scheduleChatHomeSummaryFetch,
    scheduleChatBootstrapFetch: scheduleChatBootstrapFetch
  };
}
