// Chat open-conversation peer header hydration from contacts/cache/profile.

function initChatOpenPeerHydrate(opts) {
  opts = opts || {};
  var base = opts.base || "";
  var pokerApiAuthQuery = typeof opts.pokerApiAuthQuery === "function" ? opts.pokerApiAuthQuery : function () { return ""; };
  var peerChatIdsEqual = typeof opts.peerChatIdsEqual === "function" ? opts.peerChatIdsEqual : function (a, b) { return String(a || "") === String(b || ""); };
  var getChatWithUserId = typeof opts.getChatWithUserId === "function" ? opts.getChatWithUserId : function () { return ""; };
  var getChatWithUserName = typeof opts.getChatWithUserName === "function" ? opts.getChatWithUserName : function () { return ""; };
  var setChatWithUserName = typeof opts.setChatWithUserName === "function" ? opts.setChatWithUserName : function () {};
  var setChatWithPeerAvatarUrl = typeof opts.setChatWithPeerAvatarUrl === "function" ? opts.setChatWithPeerAvatarUrl : function () {};
  var getConvTitle = typeof opts.getConvTitle === "function" ? opts.getConvTitle : function () { return null; };
  var setTextContentIfChanged = typeof opts.setTextContentIfChanged === "function" ? opts.setTextContentIfChanged : function (el, txt) { if (el) el.textContent = txt || ""; };
  var setChatConvTitleIdText = typeof opts.setChatConvTitleIdText === "function" ? opts.setChatConvTitleIdText : function () {};
  var setChatPeerVerified = typeof opts.setChatPeerVerified === "function" ? opts.setChatPeerVerified : function () {};
  var setChatConvTitleFish = typeof opts.setChatConvTitleFish === "function" ? opts.setChatConvTitleFish : function () {};
  var applyConvPeerAvatarHeader = typeof opts.applyConvPeerAvatarHeader === "function" ? opts.applyConvPeerAvatarHeader : function () {};
  var pokerTryReadContactsCache = typeof opts.pokerTryReadContactsCache === "function" ? opts.pokerTryReadContactsCache : function () { return null; };
  var pokerGetCachedChatPeerMeta = typeof opts.pokerGetCachedChatPeerMeta === "function" ? opts.pokerGetCachedChatPeerMeta : function () { return null; };
  var pokerPushOpenDebug = typeof opts.pokerPushOpenDebug === "function" ? opts.pokerPushOpenDebug : function () {};
  var loadContacts = typeof opts.loadContacts === "function" ? opts.loadContacts : function () {};

  function findChatContactByPeerIdLocal(peerId) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid) return null;
    var data = window.__pokerLastContactsApiData;
    if ((!data || !Array.isArray(data.contacts) || data.contacts.length === 0) && typeof pokerTryReadContactsCache === "function") {
      try {
        var cached = pokerTryReadContactsCache();
        if (cached && cached.ok && Array.isArray(cached.contacts)) data = cached;
      } catch (eChatPeerLocalCache) {}
    }
    if (!data || !Array.isArray(data.contacts)) return null;
    for (var i = 0; i < data.contacts.length; i++) {
      var c = data.contacts[i];
      if (!c || c.id == null) continue;
      if (peerChatIdsEqual(c.id, pid)) return c;
    }
    return null;
  }

  function hydrateOpenDmHeaderFromContactsLocal(peerId) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid) return false;
    var found = findChatContactByPeerIdLocal(pid);
    var cachedMeta = null;
    try {
      cachedMeta = pokerGetCachedChatPeerMeta(pid);
    } catch (eChatPeerLocalMeta) {}
    if (!found && cachedMeta) found = Object.assign({ id: pid }, cachedMeta);
    if (!found) return false;
    try {
      var resolvedName = found.contactName || found.name || (cachedMeta && (cachedMeta.contactName || cachedMeta.name)) || "";
      if (resolvedName) {
        setChatWithUserName(resolvedName);
        if (getConvTitle()) setTextContentIfChanged(getConvTitle(), resolvedName);
      }
      var resolvedP21Id = found.p21Id != null ? found.p21Id : cachedMeta && cachedMeta.p21Id != null ? cachedMeta.p21Id : "";
      setChatConvTitleIdText(resolvedP21Id);
      if ((found.pokerPlusVerified === true) || (cachedMeta && cachedMeta.pokerPlusVerified === true)) setChatPeerVerified(true);
      var resolvedStatusLevel = found.statusLevel != null ? found.statusLevel : cachedMeta && cachedMeta.statusLevel != null ? cachedMeta.statusLevel : "";
      if (resolvedStatusLevel != null && String(resolvedStatusLevel).trim() !== "") setChatConvTitleFish(resolvedStatusLevel);
      var resolvedAvatar = found.avatar != null && String(found.avatar).trim()
        ? String(found.avatar).trim()
        : cachedMeta && cachedMeta.avatar != null && String(cachedMeta.avatar).trim()
          ? String(cachedMeta.avatar).trim()
          : "";
      if (resolvedAvatar) {
        setChatWithPeerAvatarUrl(resolvedAvatar);
        applyConvPeerAvatarHeader(resolvedAvatar, getChatWithUserName() || resolvedName || pid);
      } else if (getChatWithUserName() || resolvedName) {
        applyConvPeerAvatarHeader("", getChatWithUserName() || resolvedName || pid);
      }
      pokerPushOpenDebug("header-hydrated-local", pid);
      return true;
    } catch (eChatPeerLocalHydrate) {}
    return false;
  }

  function hydrateOpenDmHeaderFromProfileLocal(peerId) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid) return false;
    fetch(base + "/api/users?userId=" + encodeURIComponent(pid) + pokerApiAuthQuery("&"))
      .then(function (r) {
        return r.json().catch(function () { return { ok: false }; });
      })
      .then(function (data) {
        try {
          if (!data || !data.ok) return;
          if (!getChatWithUserId() || !peerChatIdsEqual(getChatWithUserId(), pid)) return;
          var profileName =
            data.contactName != null && String(data.contactName).trim()
              ? String(data.contactName).trim()
              : data.chatDisplayName != null && String(data.chatDisplayName).trim()
                ? String(data.chatDisplayName).trim()
                : data.userName != null && String(data.userName).trim()
                  ? String(data.userName).trim()
                  : "";
          if (profileName) {
            setChatWithUserName(profileName);
            if (getConvTitle()) setTextContentIfChanged(getConvTitle(), profileName);
          }
          setChatConvTitleIdText(data.p21Id != null ? data.p21Id : "");
          if (data.pokerPlusVerified === true) setChatPeerVerified(true);
          if (data.statusLevel != null && String(data.statusLevel).trim() !== "") setChatConvTitleFish(data.statusLevel);
          var profileAvatar = data.avatar != null && String(data.avatar).trim() ? String(data.avatar).trim() : "";
          if (profileAvatar) {
            setChatWithPeerAvatarUrl(profileAvatar);
            applyConvPeerAvatarHeader(profileAvatar, getChatWithUserName() || profileName || pid);
          } else if (profileName) {
            applyConvPeerAvatarHeader("", profileName);
          }
          pokerPushOpenDebug("header-profile-hydrated-local", pid);
        } catch (eChatPeerLocalProfileApply) {}
      })
      .catch(function () {});
    return true;
  }

  function scheduleDmHeaderHydrateLocal(peerId) {
    var pid = peerId != null ? String(peerId).trim() : "";
    if (!pid) return;
    try {
      if (hydrateOpenDmHeaderFromContactsLocal(pid)) return;
    } catch (eChatPeerLocalHydrateCache) {}
    try {
      clearTimeout(window.__pokerPushDmHeaderHydrateTimer || 0);
    } catch (eChatPeerLocalHydrateClr) {}
    window.__pokerPushDmHeaderHydrateTimer = setTimeout(function () {
      try {
        if (hydrateOpenDmHeaderFromContactsLocal(pid)) return;
        loadContacts({
          metaOnly: true,
          onLoaded: function () {
            try {
              if (hydrateOpenDmHeaderFromContactsLocal(pid)) return;
              hydrateOpenDmHeaderFromProfileLocal(pid);
            } catch (eChatPeerLocalHydrateLoaded) {}
          },
        });
      } catch (eChatPeerLocalHydrateLoad) {}
    }, 80);
  }

  return {
    findChatContactByPeerIdLocal: findChatContactByPeerIdLocal,
    hydrateOpenDmHeaderFromContactsLocal: hydrateOpenDmHeaderFromContactsLocal,
    hydrateOpenDmHeaderFromProfileLocal: hydrateOpenDmHeaderFromProfileLocal,
    scheduleDmHeaderHydrateLocal: scheduleDmHeaderHydrateLocal,
  };
}
