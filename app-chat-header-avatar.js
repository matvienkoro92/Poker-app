// Chat conversation title, status chips, and peer/group avatar header runtime.

function initChatHeaderAvatarRuntime(opts) {
  opts = opts || {};
  with (opts) {
  var convTitle = document.getElementById("chatConvTitle");
  var convTitleFish = document.getElementById("chatConvTitleFish");
  var convTitleLevel = document.getElementById("chatConvTitleLevel");
  var convTitleId = document.getElementById("chatConvTitleId");
  var convVerifiedBadge = document.getElementById("chatConvVerifiedBadge");
  var chatConvTitleIdPeerId = "";
  var chatConvTitleP21ByPeer = {};
  var convGroupDescEl = document.getElementById("chatConvGroupDesc");
  /** Описание группы не дублируем под шапкой чата — только в модалке «Информация о группе». */
  function applyConvGroupDescription() {
    if (!convGroupDescEl) return;
    convGroupDescEl.textContent = "";
    convGroupDescEl.classList.add("chat-conv-group-desc--hidden");
    convGroupDescEl.setAttribute("aria-hidden", "true");
  }
  function setChatConvTitleFish(level) {
    if (!convTitleFish) return;
    var hasLevel = level != null && level !== "";
    var fishLevel = hasLevel ? pokerProfileStatusFishLevel(level) : 0;
    if (!hasLevel) {
      convTitleFish.hidden = true;
      convTitleFish.removeAttribute("src");
      convTitleFish.removeAttribute("data-status-fish-level");
      if (convTitleLevel) {
        convTitleLevel.hidden = true;
        convTitleLevel.textContent = "";
        convTitleLevel.removeAttribute("data-status-level");
      }
      return;
    }
    convTitleFish.src = pokerProfileStatusFishSrc(fishLevel);
    convTitleFish.setAttribute("data-status-fish-level", String(fishLevel));
    convTitleFish.hidden = false;
    if (convTitleLevel) {
      convTitleLevel.textContent = "Уровень: " + String(fishLevel);
      convTitleLevel.setAttribute("data-status-level", String(fishLevel));
      convTitleLevel.hidden = false;
    }
  }
  function syncChatConvTitleMetaVisibility() {
    var wrap = convTitleId && convTitleId.closest ? convTitleId.closest(".chat-conv-peer-title-chip__id") : null;
    if (!wrap) return;
    var hasId = !!(convTitleId && String(convTitleId.textContent || "").trim());
    wrap.hidden = !hasId;
  }
  function normalizeChatConvTitlePeerId(peerId) {
    var raw = peerId != null ? String(peerId).trim() : "";
    if (!raw) return "";
    try {
      if (typeof normalizePeerIdForChat === "function") return normalizePeerIdForChat(raw);
    } catch (eTitlePeerNorm) {}
    return raw;
  }
  function getOpenPersonalTitlePeerId() {
    try {
      if (!chatWithUserId || String(chatWithUserId).indexOf("group_") === 0) return "";
      if (convView && convView.classList && convView.classList.contains("chat-conv-view--hidden")) return "";
      return normalizeChatConvTitlePeerId(chatWithUserId);
    } catch (eTitlePeerOpen) {
      return "";
    }
  }
  function isChatConvTitleTransientMeta(value) {
    var s = value != null ? String(value).trim() : "";
    return s === "печатает…" || s === "typing…";
  }
  function setTextContentIfChanged(el, txt) {
    if (!el) return;
    var next = txt != null ? String(txt) : "";
    if (el.textContent !== next) el.textContent = next;
  }
  function scheduleChatPostRenderSync(fn) {
    if (typeof fn !== "function") return;
    var run = function () {
      try {
        fn();
      } catch (ePostRender) {}
    };
    if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
      window.requestAnimationFrame(function () {
        setTimeout(run, 0);
      });
      return;
    }
    setTimeout(run, 0);
  }
  function updateChatHeaderStats() {
    var el = document.getElementById("chatHeaderStats");
    if (!el) return;
    if (window.__pokerChatNetworkOnline === false) {
      setTextContentIfChanged(el, "Нет сети");
      return;
    }
    var txt = "";
    if (chatActiveTab === "general") txt = window.lastGeneralStats || "";
    else if (chatActiveTab === "admins") txt = "Админы";
    else if (chatWithUserId && convView && !convView.classList.contains("chat-conv-view--hidden")) txt = window.lastConvStats || "";
    else txt = window.lastListStats || "";
    setTextContentIfChanged(el, txt);
  }
  function rememberChatConvTitleP21Id(peerId, value) {
    var key = normalizeChatConvTitlePeerId(peerId);
    var clean = value != null ? String(value).trim() : "";
    if (!key || !clean || isChatConvTitleTransientMeta(clean)) return "";
    chatConvTitleP21ByPeer[key] = clean;
    chatConvTitleIdPeerId = key;
    return clean;
  }
  function resolveChatConvTitleP21Id(peerId) {
    var key = normalizeChatConvTitlePeerId(peerId);
    if (!key) return "";
    try {
      var current = convTitleId ? String(convTitleId.textContent || "").trim() : "";
      if (
        current &&
        !isChatConvTitleTransientMeta(current) &&
        chatConvTitleIdPeerId &&
        (
          chatConvTitleIdPeerId === key ||
          (typeof peerChatIdsEqual === "function" && peerChatIdsEqual(chatConvTitleIdPeerId, key))
        )
      ) return current;
    } catch (eTitleCurrent) {}
    if (chatConvTitleP21ByPeer[key]) return chatConvTitleP21ByPeer[key];
    try {
      var meta = typeof pokerGetCachedChatPeerMeta === "function" ? pokerGetCachedChatPeerMeta(key) : null;
      if (meta && meta.p21Id != null && String(meta.p21Id).trim()) return rememberChatConvTitleP21Id(key, meta.p21Id);
    } catch (eTitleCached) {}
    return "";
  }
  function setChatConvTitleIdText(value) {
    if (!convTitleId) return;
    var clean = value != null ? String(value).trim() : "";
    var peerKey = getOpenPersonalTitlePeerId();
    if (peerKey && clean && !isChatConvTitleTransientMeta(clean)) {
      clean = rememberChatConvTitleP21Id(peerKey, clean);
    } else if (peerKey && !clean) {
      clean = resolveChatConvTitleP21Id(peerKey);
    } else if (!peerKey && !clean) {
      chatConvTitleIdPeerId = "";
    }
    setTextContentIfChanged(convTitleId, clean);
    syncChatConvTitleMetaVisibility();
  }
  var convPeerAvatar = document.getElementById("chatConvPeerAvatar");
  var convPeerAvatarPh = document.getElementById("chatConvPeerAvatarPh");
  var convPeerAvatarWrap = document.getElementById("chatConvPeerAvatarWrap");
  var convGroupAvatarFile = document.getElementById("chatConvGroupAvatarFile");
  var convGroupCanChangeAvatar = false;
  function setChatPeerVerified(on) {
    chatWithUserPokerPlusVerified = !!on;
    if (convVerifiedBadge) convVerifiedBadge.classList.toggle("chat-verified-badge--hidden", !chatWithUserPokerPlusVerified);
    syncChatConvTitleMetaVisibility();
  }
  function getInlineChatHeaderTopOffsetPx() {
    try {
      var root = document.documentElement;
      if (
        root &&
        root.classList &&
        (root.classList.contains("poker-ios-pwa") || root.classList.contains("poker-android-pwa"))
      ) {
        return "0px";
      }
    } catch (ePwaHeaderClassTop) {}
    try {
      if (typeof isPwaStandaloneMode === "function" && isPwaStandaloneMode()) return "0px";
    } catch (ePwaHeadTop) {}
    try {
      if (typeof window.__pokerIsChatPhysicalKeyboardContext === "function" && window.__pokerIsChatPhysicalKeyboardContext()) {
        return "0px";
      }
    } catch (eDeskHeadTop) {}
    return "50px";
  }
  function syncConvGroupAvatarEditUi() {
    if (!convPeerAvatarWrap) return;
    var on = !!(
      convGroupCanChangeAvatar &&
      chatWithUserId &&
      String(chatWithUserId).indexOf("group_") === 0
    );
    convPeerAvatarWrap.classList.toggle("chat-conv-peer-avatar-wrap--editable", on);
    if (on) {
      convPeerAvatarWrap.setAttribute("aria-hidden", "false");
      convPeerAvatarWrap.setAttribute("aria-label", "Сменить аватар группы");
      convPeerAvatarWrap.setAttribute("role", "button");
      convPeerAvatarWrap.setAttribute("tabindex", "0");
    } else {
      convPeerAvatarWrap.setAttribute("aria-hidden", "true");
      convPeerAvatarWrap.removeAttribute("aria-label");
      convPeerAvatarWrap.setAttribute("role", "presentation");
      convPeerAvatarWrap.setAttribute("tabindex", "-1");
    }
  }
  function applyConvPeerAvatarHeader(url, displayName) {
    if (!convPeerAvatar || !convPeerAvatarPh) return;
    var nm = displayName != null && String(displayName).trim() ? String(displayName).trim() : "";
    convPeerAvatarPh.textContent = nm ? nm.charAt(0) : "?";
    var u = url != null && String(url).trim() ? String(url).trim() : "";
    convPeerAvatar.onload = null;
    convPeerAvatar.onerror = null;
    if (!u) {
      convPeerAvatar.removeAttribute("src");
      try {
        convPeerAvatar.removeAttribute("fetchpriority");
      } catch (eRmFp) {}
      convPeerAvatar.classList.add("chat-conv-peer-avatar--hidden");
      convPeerAvatarPh.classList.remove("chat-conv-peer-avatar--hidden");
      convPeerAvatar.alt = "";
      return;
    }
    convPeerAvatar.alt = nm || "";
    try {
      convPeerAvatar.setAttribute("decoding", "async");
      convPeerAvatar.setAttribute("fetchpriority", "high");
    } catch (eFp) {}
    convPeerAvatar.onload = function () {
      convPeerAvatar.classList.remove("chat-conv-peer-avatar--hidden");
      convPeerAvatarPh.classList.add("chat-conv-peer-avatar--hidden");
    };
    convPeerAvatar.onerror = function () {
      convPeerAvatar.classList.add("chat-conv-peer-avatar--hidden");
      convPeerAvatarPh.classList.remove("chat-conv-peer-avatar--hidden");
    };
    convPeerAvatar.src = u;
    if (convPeerAvatar.complete) {
      if (convPeerAvatar.naturalWidth > 0) convPeerAvatar.onload();
      else convPeerAvatar.onerror();
    }
  }
  function clearConvPeerAvatarHeader() {
    chatWithPeerAvatarUrl = null;
    convGroupCanChangeAvatar = false;
    syncConvGroupAvatarEditUi();
    applyConvPeerAvatarHeader("", "");
    applyConvGroupDescription("");
  }

    return {
      convTitle: convTitle,
      convTitleFish: convTitleFish,
      convTitleLevel: convTitleLevel,
      convTitleId: convTitleId,
      convVerifiedBadge: convVerifiedBadge,
      convPeerAvatarWrap: convPeerAvatarWrap,
      convGroupAvatarFile: convGroupAvatarFile,
      applyConvGroupDescription: applyConvGroupDescription,
      setChatConvTitleFish: setChatConvTitleFish,
      syncChatConvTitleMetaVisibility: syncChatConvTitleMetaVisibility,
      normalizeChatConvTitlePeerId: normalizeChatConvTitlePeerId,
      setTextContentIfChanged: setTextContentIfChanged,
      scheduleChatPostRenderSync: scheduleChatPostRenderSync,
      updateChatHeaderStats: updateChatHeaderStats,
      rememberChatConvTitleP21Id: rememberChatConvTitleP21Id,
      resolveChatConvTitleP21Id: resolveChatConvTitleP21Id,
      setChatConvTitleIdText: setChatConvTitleIdText,
      setChatPeerVerified: setChatPeerVerified,
      getInlineChatHeaderTopOffsetPx: getInlineChatHeaderTopOffsetPx,
      syncConvGroupAvatarEditUi: syncConvGroupAvatarEditUi,
      applyConvPeerAvatarHeader: applyConvPeerAvatarHeader,
      clearConvPeerAvatarHeader: clearConvPeerAvatarHeader,
      getConvGroupCanChangeAvatar: function () { return convGroupCanChangeAvatar; },
      setConvGroupCanChangeAvatar: function (value) {
        convGroupCanChangeAvatar = !!value;
        syncConvGroupAvatarEditUi();
      }
    };
  }
}
