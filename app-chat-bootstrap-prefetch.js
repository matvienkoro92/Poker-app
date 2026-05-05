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
        var lvB = Object.assign({}, opts.lastViewedPersonal || {});
        if (opts.lastViewedGeneral != null) lvB.general = opts.lastViewedGeneral;
        lastVP = "&lastViewed=" + encodeURIComponent(JSON.stringify(lvB));
      } catch (eLvB) {}
      var qB = typeof opts.pokerApiAuthQuery === "function" ? opts.pokerApiAuthQuery("?") : "?";
      var urlContactsB = base + "/api/chat" + qB + "&mode=contacts" + lastVP;
      var urlGeneralB = base + "/api/chat" + qB + "&mode=general&trackSeen=0";
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
          if (typeof opts.ingestBootstrapGeneralSnapshot === "function") opts.ingestBootstrapGeneralSnapshot(dg);
        })
        .catch(function () {});
    } catch (eBoot) {}
  }
  try {
    window.__pokerScheduleChatBootstrapFetch = scheduleChatBootstrapFetch;
  } catch (eExBoot) {}

  return {
    pokerPrefetchDiskPeersWarmup: pokerPrefetchDiskPeersWarmup,
    scheduleChatBootstrapFetch: scheduleChatBootstrapFetch
  };
}
