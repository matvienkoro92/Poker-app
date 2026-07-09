function pokerRemoveFriendFromOpenFriendsList(userId, chatUserId) {
  var listEl = document.getElementById("friendsListModalList");
  if (!listEl) return false;
  var ids = [userId, chatUserId].map(function (id) {
    return String(id || "").trim();
  }).filter(Boolean);
  if (!ids.length) return false;
  var removed = false;
  listEl.querySelectorAll('.friends-list-modal__item[data-section="friends"]').forEach(function (item) {
    var itemUserId = String(item.getAttribute("data-user-id") || "").trim();
    var itemChatUserId = String(item.getAttribute("data-chat-user-id") || "").trim();
    if (ids.indexOf(itemUserId) !== -1 || ids.indexOf(itemChatUserId) !== -1) {
      item.remove();
      removed = true;
    }
  });
  if (!removed) return false;
  var remaining = listEl.querySelectorAll('.friends-list-modal__item[data-section="friends"]').length;
  try {
    if (typeof pokerUpdateFriendsCountLabels === "function") pokerUpdateFriendsCountLabels(remaining);
    if (typeof window.pokerRefreshProfileFriendsPreview === "function") window.pokerRefreshProfileFriendsPreview();
  } catch (eFriendCount) {}
  return true;
}
window.pokerRemoveFriendFromOpenFriendsList = pokerRemoveFriendFromOpenFriendsList;

var POKER_FRIENDS_UNREAD_KEY = "poker_profile_friends_unread_v1";
var POKER_FRIENDS_SEEN_KEY = "poker_profile_friends_seen_v1";
var POKER_FRIENDS_STABLE_CACHE_KEY = "poker_profile_friends_stable_v1";

function pokerFriendsReadJson(key, fallback) {
  try {
    var raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (eReadFriendsSeen) {
    return fallback;
  }
}

function pokerFriendsWriteJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value || {}));
  } catch (eWriteFriendsSeen) {}
}

function pokerFriendsRowId(row) {
  return String((row && (row.userId || row.chatUserId || row.id)) || "").trim();
}

function pokerFriendsUniqueSorted(ids) {
  var seen = {};
  var out = [];
  (Array.isArray(ids) ? ids : []).forEach(function (id) {
    var s = String(id || "").trim();
    if (!s || seen[s]) return;
    seen[s] = true;
    out.push(s);
  });
  return out.sort();
}

function pokerFriendsDataState(data) {
  var incoming = Array.isArray(data && data.incoming) ? data.incoming : [];
  var friends = Array.isArray(data && data.friends) ? data.friends : [];
  var notices = Array.isArray(data && data.notices) ? data.notices : [];
  return {
    incomingIds: pokerFriendsUniqueSorted(incoming.map(pokerFriendsRowId)),
    friendIds: pokerFriendsUniqueSorted(friends.map(pokerFriendsRowId)),
    acceptedNoticeIds: pokerFriendsUniqueSorted(notices.filter(function (row) {
      return row && row.status === "accepted";
    }).map(pokerFriendsRowId)),
  };
}

function pokerFriendsHasNewIncoming(state, seen) {
  var seenIncoming = {};
  ((seen && Array.isArray(seen.incomingIds)) ? seen.incomingIds : []).forEach(function (id) {
    seenIncoming[String(id || "").trim()] = true;
  });
  return (state.incomingIds || []).some(function (id) { return !seenIncoming[id]; });
}

function pokerReadFriendsUnreadFlag() {
  var raw = pokerFriendsReadJson(POKER_FRIENDS_UNREAD_KEY, null);
  return !!(raw && raw.unread);
}

function pokerWriteFriendsUnreadFlag(unread) {
  pokerFriendsWriteJson(POKER_FRIENDS_UNREAD_KEY, {
    unread: !!unread,
    updatedAt: new Date().toISOString(),
  });
}

function pokerApplyFriendsUnreadIndicators(unread) {
  var active = !!unread;
  try {
    var profileNav = document.querySelector('.bottom-nav__item[data-view-target="profile"]');
    if (profileNav) {
      profileNav.classList.toggle("bottom-nav__item--friends-unread", active);
      profileNav.setAttribute("data-friends-unread", active ? "1" : "0");
    }
  } catch (eNavUnread) {}
  try {
    var panel = document.getElementById("profileFriendsPanel");
    if (panel) panel.classList.toggle("profile-friends--unread", active);
    var btn = document.getElementById("profileFriendsBtn");
    if (btn) {
      btn.classList.toggle("profile-friends__btn--unread", active);
      btn.setAttribute("data-friends-unread", active ? "1" : "0");
    }
  } catch (ePanelUnread) {}
}

function pokerRefreshFriendsUnreadIndicators() {
  pokerApplyFriendsUnreadIndicators(pokerReadFriendsUnreadFlag());
}

function pokerUpdateFriendsUnreadFromData(data) {
  if (!data || !data.ok) return;
  var state = pokerFriendsDataState(data);
  var seen = pokerFriendsReadJson(POKER_FRIENDS_SEEN_KEY, null);
  var explicitNewFriend = state.acceptedNoticeIds.length > 0;
  var explicitIncoming = state.incomingIds.length > 0 && pokerFriendsHasNewIncoming(state, seen);
  if (!seen && !explicitIncoming && !explicitNewFriend) {
    pokerFriendsWriteJson(POKER_FRIENDS_SEEN_KEY, {
      incomingIds: state.incomingIds,
      friendIds: state.friendIds,
      seenAt: new Date().toISOString(),
    });
  }
  if (explicitIncoming || explicitNewFriend) pokerWriteFriendsUnreadFlag(true);
  pokerRefreshFriendsUnreadIndicators();
}

function pokerMarkFriendsSeen(data) {
  var state = pokerFriendsDataState(data || {});
  pokerFriendsWriteJson(POKER_FRIENDS_SEEN_KEY, {
    incomingIds: state.incomingIds,
    friendIds: state.friendIds,
    seenAt: new Date().toISOString(),
  });
  pokerWriteFriendsUnreadFlag(false);
  pokerRefreshFriendsUnreadIndicators();
}

window.pokerUpdateFriendsUnreadFromData = pokerUpdateFriendsUnreadFromData;
window.pokerMarkFriendsSeen = pokerMarkFriendsSeen;
window.pokerRefreshFriendsUnreadIndicators = pokerRefreshFriendsUnreadIndicators;

function initProfileFriends() {
  var btn = document.getElementById("profileFriendsBtn");
  var modal = document.getElementById("friendsListModal");
  var listEl = document.getElementById("friendsListModalList");
  var previewEl = document.getElementById("profileFriendsPreview");
  var panelEl = document.getElementById("profileFriendsPanel");
  var incomingNoticeEl = null;
  var searchForm = document.getElementById("profileFriendsSearchForm");
  var searchInput = document.getElementById("profileFriendsSearchInput");
  var searchBtn = document.getElementById("profileFriendsSearchBtn");
  var searchSuggestions = document.getElementById("profileFriendsSearchSuggestions");
  var searchResult = document.getElementById("profileFriendsSearchResult");
  var searchFoundProfile = null;
  var searchSuggestRowsCache = null;
  var searchSuggestRowsPromise = null;
  var searchSuggestTimer = null;
  var focusIncomingOnOpen = false;
  var friendsDataCache = null;
  var friendsFetchPromise = null;
  var friendsPreviewRetryTimer = null;
  var friendsPreviewRetryCount = 0;
  if (!btn || !modal || !listEl) return;
  if (btn.dataset.friendsBound) return;
  btn.dataset.friendsBound = "1";

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function profileFriendsSpecialtyValue(row) {
    var raw = String(row && (row.profileSpecialty || row.specialty || row.pokerSpecialty) || "").trim().toLowerCase();
    if (raw === "mtt" || raw === "мтт") return "mtt";
    if (raw === "cash" || raw === "кеш" || raw === "кэш") return "cash";
    return "";
  }

  function profileFriendsSpecialtyTagHtml(row, className) {
    var value = profileFriendsSpecialtyValue(row);
    if (!value) return "";
    var label = value === "cash" ? "Кеш" : "МТТ";
    var baseClass = className || "profile-friends__specialty-tag";
    return '<span class="' + esc(baseClass) + " " + esc(baseClass + "--" + value) + '">' + esc(label) + "</span>";
  }

  function profileFriendsBirthdayStatus(row) {
    var raw = String(row && (row.profileBirthDate || row.birthDate || row.birthday) || "").trim();
    var m = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return "";
    var today = new Date();
    var currentYear = today.getFullYear();
    var month = Number(m[2]) - 1;
    var day = Number(m[3]);
    var next = new Date(currentYear, month, day);
    today.setHours(0, 0, 0, 0);
    next.setHours(0, 0, 0, 0);
    if (next < today) next = new Date(currentYear + 1, month, day);
    var days = Math.round((next - today) / 86400000);
    if (days === 0) return "today";
    if (days > 0 && days <= 7) return "soon";
    return "";
  }

  function profileFriendsBirthdayTagHtml(row, className) {
    var status = profileFriendsBirthdayStatus(row);
    if (!status) return "";
    var baseClass = className || "profile-friends__birthday-tag";
    var label = status === "today" ? "День рождения" : "Скоро день рождения";
    return '<span class="' + esc(baseClass) + " " + esc(baseClass + "--" + status) + '">' + esc(label) + "</span>";
  }

  function profileFriendsBirthdayPreviewTagHtml(row) {
    var status = profileFriendsBirthdayStatus(row);
    if (!status) return "";
    var label = status === "today" ? "День рождения сегодня" : "Скоро день рождения";
    return '<span class="profile-friends__birthday-tag profile-friends__birthday-tag--' + esc(status) + '">' + esc(label) + "</span>";
  }

  function profileFriendsBirthdayPriority(row) {
    var status = profileFriendsBirthdayStatus(row);
    if (status === "today") return 2;
    if (status === "soon") return 1;
    return 0;
  }

  function alertText(text) {
    if (tg && tg.showAlert) tg.showAlert(text);
    else if (typeof alert === "function") alert(text);
  }

  function setSearchResult(text, kind) {
    if (!searchResult) return;
    var msg = String(text || "").trim();
    searchResult.textContent = msg;
    searchResult.hidden = !msg;
    searchResult.classList.toggle("profile-friends__search-result--error", kind === "error");
    searchResult.classList.toggle("profile-friends__search-result--ok", kind === "ok");
  }

  function profileFriendsSearchErrorText(err) {
    var msg = String((err && err.message) || err || "").trim();
    if (msg === "rating_profile_not_linked" || msg === "Игрок не найден") return "Точного совпадения нет.";
    return msg || "Игрок не найден";
  }

  function clearSearchSuggestions() {
    if (!searchSuggestions) return;
    searchSuggestions.innerHTML = "";
    searchSuggestions.hidden = true;
  }

  function setSearchSuggestions(rows, raw) {
    if (!searchSuggestions) return;
    rows = Array.isArray(rows) ? rows.slice(0, 4) : [];
    if (!rows.length) {
      clearSearchSuggestions();
      return;
    }
    searchSuggestions.innerHTML =
      '<div class="profile-friends__search-suggestions-title">Похожие игроки</div>' +
      rows.map(function (row, idx) {
        var id = String((row && (row.accountId || row.userId || row.chatUserId)) || "").trim();
        var name = profileFriendsDisplayName({
          pokerPlusNickname: row && row.name,
          userName: row && row.telegram,
          userId: id,
        }, raw);
        var subParts = [];
        if (id) subParts.push(id);
        if (row && row.p21Id) subParts.push("Poker21 " + String(row.p21Id));
        if (row && row.telegram) subParts.push(String(row.telegram));
        if (row && row.level) subParts.push("ур. " + String(row.level));
        var specialtyTag = profileFriendsSpecialtyTagHtml(row, "profile-friends__search-suggestion-specialty");
        return '<button type="button" class="profile-friends__search-suggestion" data-profile-search-suggestion="' + esc(String(idx)) + '">' +
          '<span class="profile-friends__search-suggestion-name">' + esc(name) + '</span>' +
          specialtyTag +
          '<span class="profile-friends__search-suggestion-meta">' + esc(subParts.join(" · ") || "Открыть профиль") + '</span>' +
        '</button>';
      }).join("");
    searchSuggestions.hidden = false;
    Array.prototype.forEach.call(searchSuggestions.querySelectorAll("[data-profile-search-suggestion]"), function (item) {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var index = parseInt(item.getAttribute("data-profile-search-suggestion") || "-1", 10);
        var row = rows[index];
        if (!row) return;
        openFoundProfile({
          id: row.accountId || row.userId || row.chatUserId,
          userId: row.accountId || row.userId || row.chatUserId,
          chatUserId: row.chatUserId || "",
          p21Id: row.p21Id || "",
          pokerPlusNickname: row.name || "",
          userName: row.telegram || "",
          name: row.name || row.telegram || row.accountId || "Игрок",
          profileSpecialty: row.profileSpecialty || row.specialty || "",
        }, raw, true);
      });
    });
  }

  function setSearchFoundProfile(data, raw) {
    searchFoundProfile = data ? {
      id: String((data.userId || data.chatUserId || data.dtId) || "").trim(),
      name: profileFriendsDisplayName(data, raw),
      profileSpecialty: data.profileSpecialty || data.specialty || "",
    } : null;
    if (!searchResult) return;
    if (!searchFoundProfile || !searchFoundProfile.id) {
      searchResult.removeAttribute("role");
      searchResult.removeAttribute("tabindex");
      return;
    }
    searchResult.innerHTML =
      '<button type="button" class="profile-friends__search-open" id="profileFriendsSearchOpenBtn">' +
      '<span>Игрок найден: ' + esc(searchFoundProfile.name) + '</span>' +
      profileFriendsSpecialtyTagHtml(searchFoundProfile, "profile-friends__search-suggestion-specialty") +
      '<strong>Открыть профиль</strong>' +
      "</button>";
    searchResult.hidden = false;
    searchResult.classList.remove("profile-friends__search-result--error");
    searchResult.classList.add("profile-friends__search-result--ok");
    searchResult.removeAttribute("role");
    searchResult.removeAttribute("tabindex");
    var openBtn = document.getElementById("profileFriendsSearchOpenBtn");
    if (openBtn) {
      openBtn.addEventListener("click", function (e) {
        e.preventDefault();
        openFoundProfile(searchFoundProfile, raw, true);
      });
    }
  }

  function profileFriendsAuthQuery() {
    return typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("&") : "";
  }

  function profileFriendsHasCredential() {
    try {
      if (typeof pokerApiHasCredential === "function" && pokerApiHasCredential()) return true;
    } catch (eFriendsCred) {}
    try {
      return typeof pokerReadEmailPwaSessionToken === "function" && !!pokerReadEmailPwaSessionToken();
    } catch (eFriendsEmailCred) {}
    return false;
  }

  function scheduleFriendsPreviewRetry() {
    if (friendsPreviewRetryTimer || friendsPreviewRetryCount >= 10) return;
    friendsPreviewRetryCount += 1;
    friendsPreviewRetryTimer = setTimeout(function () {
      friendsPreviewRetryTimer = null;
      loadFriendsPreview();
    }, friendsPreviewRetryCount <= 3 ? 450 : 1000);
  }

  function rememberFriendsData(data) {
    return stableFriendsData(data) || data;
  }

  function fetchFriendsData() {
    if (friendsFetchPromise) return friendsFetchPromise;
    var base = getApiBase();
    if (!base) return Promise.reject(new Error("api_base_missing"));
    var fq = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?initData=";
    friendsFetchPromise = fetch(base + "/api/friends" + fq)
      .then(function (r) { return r.json(); })
      .then(rememberFriendsData)
      .then(function (data) {
        friendsFetchPromise = null;
        return data;
      }, function (err) {
        friendsFetchPromise = null;
        throw err;
      });
    return friendsFetchPromise;
  }

  function readProfileFriendsScrollY() {
    return typeof getMainDocumentScrollY === "function" ? getMainDocumentScrollY() : (window.pageYOffset || 0);
  }

  function profileFriendsHasUserScrolledSince(mark) {
    if (!mark) return false;
    try {
      return (
        typeof window.pokerGetLastMainScrollUserIntentAt === "function" &&
        window.pokerGetLastMainScrollUserIntentAt() > mark
      );
    } catch (eIntent) {
      return false;
    }
  }

  function restoreProfileFriendsScrollY(y, mark) {
    if (y == null) return;
    if (profileFriendsHasUserScrolledSince(mark)) return;
    if (typeof setMainDocumentScrollY === "function") setMainDocumentScrollY(y);
    else if (typeof window.scrollTo === "function") window.scrollTo(0, y);
  }

  function restoreProfileFriendsScrollSoon(y, mark) {
    restoreProfileFriendsScrollY(y, mark);
    setTimeout(function () { restoreProfileFriendsScrollY(y, mark); }, 0);
    var raf = window.requestAnimationFrame || function (fn) { return setTimeout(fn, 16); };
    raf(function () { restoreProfileFriendsScrollY(y, mark); });
  }

  function initProfileFriendsScrollGuard() {
    if (!panelEl || panelEl.dataset.friendsScrollGuardBound === "1") return;
    panelEl.dataset.friendsScrollGuardBound = "1";
    var start = null;
    var readPoint = function (event) {
      var touch = event && event.changedTouches && event.changedTouches[0]
        ? event.changedTouches[0]
        : event && event.touches && event.touches[0]
          ? event.touches[0]
          : event;
      return {
        x: touch && touch.clientX != null ? touch.clientX : 0,
        y: touch && touch.clientY != null ? touch.clientY : 0,
      };
    };
    var remember = function (event) {
      var point = readPoint(event);
      start = {
        x: point.x,
        y: point.y,
        scrollY: readProfileFriendsScrollY(),
        at: Date.now(),
        moved: false,
      };
    };
    var markMoved = function (event) {
      if (!start) return;
      var point = readPoint(event);
      if (Math.abs(point.x - start.x) > 8 || Math.abs(point.y - start.y) > 8) start.moved = true;
    };
    ["pointerdown", "mousedown", "touchstart"].forEach(function (eventName) {
      panelEl.addEventListener(eventName, remember, { capture: true, passive: true });
    });
    ["pointermove", "mousemove", "touchmove"].forEach(function (eventName) {
      panelEl.addEventListener(eventName, markMoved, { capture: true, passive: true });
    });
    ["click", "touchend"].forEach(function (eventName) {
      panelEl.addEventListener(eventName, function (event) {
        if (!start) return;
        markMoved(event);
        var currentY = readProfileFriendsScrollY();
        var isTap = !start.moved && Math.abs(currentY - start.scrollY) <= 2 && Date.now() - start.at < 800;
        if (isTap) restoreProfileFriendsScrollSoon(start.scrollY, start.at);
        start = null;
      }, { capture: true, passive: true });
    });
  }

  function profileFriendsDisplayName(data, fallback) {
    data = data || {};
    var name = data.pokerPlusNickname || data.poker21Nickname || data.nickname || data.contactName || data.chatDisplayName || data.userName || data.dtId || data.userId || fallback || "Игрок";
    name = String(name || "").trim();
    return name.indexOf("@") === 0 ? name.slice(1) : name || "Игрок";
  }

  function fetchProfileSearch(step) {
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    if (!base) base = "";
    return fetch(base + "/api/users?" + step.param + "=" + encodeURIComponent(step.value) + profileFriendsAuthQuery(), { cache: "no-store" })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (data) {
          data = data || {};
          data.__status = r.status;
          return data;
        });
      });
  }

  function profileSearchNormalizeText(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/^@+/, "")
      .replace(/ё/g, "е")
      .replace(/[^0-9a-zа-я_]+/gi, "")
      .trim();
  }

  function profileSearchKeyboardRuToEn(value) {
    var map = {
      "й": "q", "ц": "w", "у": "e", "к": "r", "е": "t", "н": "y", "г": "u", "ш": "i", "щ": "o", "з": "p", "х": "[", "ъ": "]",
      "ф": "a", "ы": "s", "в": "d", "а": "f", "п": "g", "р": "h", "о": "j", "л": "k", "д": "l", "ж": ";", "э": "'",
      "я": "z", "ч": "x", "с": "c", "м": "v", "и": "b", "т": "n", "ь": "m", "б": ",", "ю": "."
    };
    return String(value || "").replace(/[А-Яа-яЁё]/g, function (ch) {
      var low = ch.toLowerCase().replace(/ё/g, "е");
      var next = map[low] || ch;
      return ch === low ? next : String(next).toUpperCase();
    });
  }

  function profileSearchRuToLatin(value) {
    var map = {
      "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "e", "ё": "e", "ж": "zh", "з": "z", "и": "i", "й": "y",
      "к": "k", "л": "l", "м": "m", "н": "n", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u", "ф": "f",
      "х": "h", "ц": "ts", "ч": "ch", "ш": "sh", "щ": "sch", "ъ": "", "ы": "y", "ь": "", "э": "e", "ю": "yu", "я": "ya"
    };
    return String(value || "").replace(/[А-Яа-яЁё]/g, function (ch) {
      var low = ch.toLowerCase();
      var next = map[low] != null ? map[low] : ch;
      return ch === low ? next : String(next).toUpperCase();
    });
  }

  function profileSearchForms(value) {
    var source = String(value || "").trim();
    var variants = [
      source,
      source.replace(/^@+/, ""),
      profileSearchKeyboardRuToEn(source),
      profileSearchRuToLatin(source)
    ];
    var out = [];
    variants.forEach(function (variant) {
      var normalized = profileSearchNormalizeText(variant);
      if (normalized && out.indexOf(normalized) === -1) out.push(normalized);
      var noIdPrefix = normalized.replace(/^id/i, "");
      if (noIdPrefix && noIdPrefix !== normalized && out.indexOf(noIdPrefix) === -1) out.push(noIdPrefix);
    });
    return out;
  }

  function profileSearchDigits(value) {
    return String(value || "").replace(/\D+/g, "");
  }

  function profileSearchDistance(a, b, maxDistance) {
    a = String(a || "");
    b = String(b || "");
    if (Math.abs(a.length - b.length) > maxDistance) return maxDistance + 1;
    var prev = [];
    var cur = [];
    for (var j = 0; j <= b.length; j += 1) prev[j] = j;
    for (var i = 1; i <= a.length; i += 1) {
      cur[0] = i;
      var rowMin = cur[0];
      for (j = 1; j <= b.length; j += 1) {
        var cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
        if (cur[j] < rowMin) rowMin = cur[j];
      }
      if (rowMin > maxDistance) return maxDistance + 1;
      var tmp = prev;
      prev = cur;
      cur = tmp;
    }
    return prev[b.length];
  }

  function profileSearchRowForms(row) {
    var values = [
      row && row.name,
      row && row.telegram,
      row && row.p21Id,
      row && row.accountId,
      String((row && row.accountId) || "").replace(/^ID/i, "")
    ];
    var out = [];
    values.forEach(function (value) {
      profileSearchForms(value).forEach(function (form) {
        if (form && out.indexOf(form) === -1) out.push(form);
      });
    });
    return out;
  }

  function profileSearchSuggestionScore(row, queryForms) {
    var rowForms = profileSearchRowForms(row);
    var best = 0;
    queryForms.forEach(function (q) {
      var qDigits = profileSearchDigits(q);
      var rowDigitForms = [
        profileSearchDigits(row && row.p21Id),
        profileSearchDigits(row && row.accountId)
      ].filter(Boolean);
      if (qDigits.length >= 6) {
        rowDigitForms.forEach(function (digits) {
          if (digits === qDigits) best = Math.max(best, 130);
          else if (digits.indexOf(qDigits) === 0) best = Math.max(best, 112 - Math.max(0, digits.length - qDigits.length));
          else if (digits.indexOf(qDigits) !== -1) best = Math.max(best, 92 - digits.indexOf(qDigits));
          else {
            var numericDistance = profileSearchDistance(qDigits, digits.slice(0, Math.max(qDigits.length, Math.min(digits.length, qDigits.length + 1))), 1);
            if (numericDistance <= 1) best = Math.max(best, 76 - numericDistance * 14);
          }
        });
      }
      rowForms.forEach(function (candidate) {
        if (!q || !candidate) return;
        if (candidate === q) best = Math.max(best, 120);
        else if (candidate.indexOf(q) === 0) best = Math.max(best, 100 - Math.max(0, candidate.length - q.length));
        else if (candidate.indexOf(q) !== -1) best = Math.max(best, 80 - candidate.indexOf(q));
        else if (q.length >= 3) {
          var maxDistance = q.length <= 5 ? 1 : 2;
          var distance = profileSearchDistance(q, candidate.slice(0, Math.max(q.length, Math.min(candidate.length, q.length + 2))), maxDistance);
          if (distance <= maxDistance) best = Math.max(best, 62 - distance * 12);
        }
      });
    });
    return best;
  }

  function profileSearchRowsFromCrmData(data) {
    return (Array.isArray(data && data.levelRows) ? data.levelRows : [])
      .map(function (row) {
        return {
          accountId: String((row && row.accountId) || "").trim(),
          p21Id: String((row && (row.p21Id || row.pokerPlusUserId)) || "").trim(),
          name: String((row && row.name) || "").trim(),
          telegram: String((row && row.telegram) || "").trim(),
          level: Number(row && row.level) || 0,
        };
      })
      .filter(function (row) { return !!row.accountId && (row.name || row.telegram); });
  }

  function loadProfileSearchSuggestRows() {
    if (searchSuggestRowsCache) return Promise.resolve(searchSuggestRowsCache);
    if (searchSuggestRowsPromise) return searchSuggestRowsPromise;
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    searchSuggestRowsPromise = fetch(base + "/api/player-crm?publicLevels=1", { cache: "default" })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data || !data.ok) throw new Error((data && data.error) || "suggestions_failed");
        searchSuggestRowsCache = profileSearchRowsFromCrmData(data);
        return searchSuggestRowsCache;
      })
      .catch(function () {
        searchSuggestRowsCache = [];
        return searchSuggestRowsCache;
      })
      .then(function (rows) {
        searchSuggestRowsPromise = null;
        return rows;
      });
    return searchSuggestRowsPromise;
  }

  function updateProfileSearchSuggestions(raw) {
    raw = String(raw || "").trim();
    var rawDigits = profileSearchDigits(raw);
    var numericSource = raw.replace(/^@+/, "").replace(/^id/i, "").trim();
    var numericQuery = !!rawDigits && /^\d+$/.test(numericSource);
    if (numericQuery && rawDigits.length < 6) {
      clearSearchSuggestions();
      return Promise.resolve([]);
    }
    var queryForms = profileSearchForms(raw).filter(function (form) {
      if (/^\d+$/.test(form)) return form.length >= 6;
      return form.length >= 2;
    });
    if (!queryForms.length) {
      clearSearchSuggestions();
      return Promise.resolve([]);
    }
    return loadProfileSearchSuggestRows().then(function (rows) {
      var suggestions = rows
        .map(function (row) {
          return { row: row, score: profileSearchSuggestionScore(row, queryForms) };
        })
        .filter(function (item) { return item.score >= 50; })
        .sort(function (a, b) {
          return b.score - a.score || (Number(b.row.level) || 0) - (Number(a.row.level) || 0) || String(a.row.name).localeCompare(String(b.row.name), "ru");
        })
        .slice(0, 4)
        .map(function (item) { return item.row; });
      setSearchSuggestions(suggestions, raw);
      return suggestions;
    });
  }

  function scheduleProfileSearchSuggestions() {
    if (searchSuggestTimer) clearTimeout(searchSuggestTimer);
    searchSuggestTimer = setTimeout(function () {
      searchSuggestTimer = null;
      updateProfileSearchSuggestions(searchInput && searchInput.value);
    }, 180);
  }

  function buildProfileSearchSteps(raw) {
    var value = String(raw || "").trim();
    var clean = value.replace(/^@+/, "").trim();
    var upper = value.toUpperCase();
    if (/^ID\d{6}$/.test(upper)) return [{ param: "id", value: upper }];
    if (/^\d+$/.test(clean) || /^(?:poker\s*21|p21|pp)\s*[:#-]?\s*\d+$/i.test(clean)) {
      return [{ param: "ratingNick", value: clean }];
    }
    return [
      { param: "username", value: clean },
      { param: "ratingNick", value: clean },
    ];
  }

  function runProfileSearch(steps, raw, index, lastError) {
    if (index >= steps.length) {
      var err = (lastError && lastError.error) || "Игрок не найден";
      throw new Error(err);
    }
    return fetchProfileSearch(steps[index]).then(function (data) {
      if (data && data.ok && (data.userId || data.chatUserId || data.dtId)) return data;
      return runProfileSearch(steps, raw, index + 1, data);
    });
  }

  function ensureProfileModalReady() {
    if (typeof window.openChatUserModalById === "function") return true;
    if (typeof initChatUserModals !== "function") return false;
    try {
      initChatUserModals({
        base: typeof getApiBase === "function" ? getApiBase() : "",
        tg: typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null,
      });
    } catch (eInitProfileModal) {}
    return typeof window.openChatUserModalById === "function";
  }

  function openFoundProfile(data, raw, explicit) {
    var id = String((data && data.id) || (data && (data.userId || data.chatUserId || data.dtId)) || "").trim();
    if (!id) {
      setSearchResult("Профиль найден, но не удалось открыть карточку.", "error");
      return;
    }
    var name = data && data.name ? String(data.name) : profileFriendsDisplayName(data, raw);
    var openNow = function () {
      window.openChatUserModalById(id, name, "");
      if (explicit) setSearchResult("Открываю профиль: " + name, "ok");
    };
    if (ensureProfileModalReady()) {
      openNow();
      return;
    }
    if (typeof window.pokerOpenChatUserModalSafe === "function") {
      window.pokerOpenChatUserModalSafe(id, name, "").then(function (ok) {
        if (!ok) setSearchFoundProfile({ userId: id, userName: name }, raw);
      });
      return;
    }
    if (typeof window.pokerEnsureGlobalModalsHtml === "function") {
      var modalReady = null;
      try {
        modalReady = window.pokerEnsureGlobalModalsHtml();
      } catch (eEnsureHtml) {
        modalReady = null;
      }
      if (modalReady && typeof modalReady.then === "function") {
        if (explicit) setSearchResult("Открываю карточку игрока...", "");
        modalReady.then(function () {
          if (ensureProfileModalReady()) {
            openNow();
            return;
          }
          setSearchFoundProfile({ userId: id, userName: name }, raw);
          if (explicit) alertText("Не удалось открыть карточку. Попробуйте ещё раз.");
        }).catch(function () {
          setSearchFoundProfile({ userId: id, userName: name }, raw);
          if (explicit) alertText("Не удалось открыть карточку. Попробуйте ещё раз.");
        });
        return;
      }
    }
    setSearchFoundProfile({ userId: id, userName: name }, raw);
  }

  function initProfileFriendsSearch() {
    if (!searchForm || !searchInput || searchForm.dataset.friendsSearchBound) return;
    searchForm.dataset.friendsSearchBound = "1";
    ["pointerdown", "mousedown", "touchend", "click"].forEach(function (eventName) {
      searchForm.addEventListener(eventName, function (e) {
        e.stopPropagation();
      });
      if (searchSuggestions) {
        searchSuggestions.addEventListener(eventName, function (e) {
          e.stopPropagation();
        });
      }
    });
    searchForm.addEventListener("touchend", function (e) {
      e.stopPropagation();
    }, { passive: true });
    if (searchSuggestions) {
      searchSuggestions.addEventListener("touchend", function (e) {
        e.stopPropagation();
      }, { passive: true });
    }
    searchInput.addEventListener("input", function () {
      var raw = String(searchInput.value || "").trim();
      searchFoundProfile = null;
      if (!raw) {
        clearSearchSuggestions();
        setSearchResult("", "");
        return;
      }
      scheduleProfileSearchSuggestions();
    });
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var scrollY = readProfileFriendsScrollY();
      var scrollMark = Date.now();
      var restoreScroll = function () { restoreProfileFriendsScrollSoon(scrollY, scrollMark); };
      var raw = String(searchInput.value || "").trim();
      if (!raw) {
        searchFoundProfile = null;
        setSearchResult("Введите логин TG, ID Poker21 или ник.", "error");
        searchInput.focus();
        restoreScroll();
        return;
      }
      if (searchBtn) searchBtn.disabled = true;
      try { searchInput.blur(); } catch (eSearchBlur) {}
      searchFoundProfile = null;
      setSearchResult("Ищу игрока...", "");
      restoreScroll();
      runProfileSearch(buildProfileSearchSteps(raw), raw, 0, null)
        .then(function (data) {
          clearSearchSuggestions();
          setSearchFoundProfile(data, raw);
          openFoundProfile(data, raw, false);
          restoreScroll();
        })
        .catch(function (err) {
          searchFoundProfile = null;
          var errorText = profileFriendsSearchErrorText(err);
          setSearchResult(errorText, "error");
          updateProfileSearchSuggestions(raw).then(function (suggestions) {
            if (suggestions && suggestions.length) setSearchResult("Точного совпадения нет. Похожие варианты ниже.", "error");
          });
          restoreScroll();
        })
        .then(function () {
          if (searchBtn) searchBtn.disabled = false;
          restoreScroll();
        });
    });
  }

  function closeFriendsModal() {
    modal.setAttribute("aria-hidden", "true");
    modal.classList.remove("friends-list-modal--open");
  }

  function displayData(row) {
    row = row || {};
    var tgLine = row.userName || row.userId || "Игрок";
    var contact = row.contactName != null && String(row.contactName).trim() ? String(row.contactName).trim() : "";
    var chatName = row.chatDisplayName != null && String(row.chatDisplayName).trim() ? String(row.chatDisplayName).trim() : "";
    var pokerName =
      (row.pokerPlusNickname != null && String(row.pokerPlusNickname).trim()) ||
      (row.poker21Nickname != null && String(row.poker21Nickname).trim()) ||
      (row.nickname != null && String(row.nickname).trim()) ||
      "";
    var modalName = pokerName || contact || chatName || (tgLine.indexOf("@") === 0 ? tgLine.slice(1) : tgLine);
    var lines = [];
    var seen = {};
    function addLine(value, kind) {
      var text = String(value || "").trim();
      if (!text) return;
      if ((kind === "tg" || lines.length > 0) && (text === "без TG" || text === "Игрок")) return;
      var key = text.replace(/^@+/, "").toLowerCase();
      if (seen[key]) return;
      seen[key] = true;
      lines.push({ text: text, kind: kind || "name" });
    }
    addLine(pokerName, "nick");
    addLine(contact, "name");
    addLine(chatName, "name");
    addLine(tgLine, "tg");
    if (!lines.length) addLine(modalName, "name");
    return { tgLine: tgLine, contact: contact || chatName, pokerName: pokerName, modalName: modalName, lines: lines };
  }

  function previewLevel(row) {
    var raw = row && (row.statusLevel != null ? row.statusLevel : row.level != null ? row.level : row.pokerPlusStatusLevel);
    var n = parseInt(String(raw == null ? 0 : raw), 10);
    if (!isFinite(n) || n < 0) n = 0;
    return Math.min(100, n);
  }

  function previewAvatar(row) {
    return String((row && (row.avatarUrl || row.avatar || row.photoUrl)) || "./assets/avatar-chip.jpg").trim() || "./assets/avatar-chip.jpg";
  }

  function buildFriendInviteLink() {
    if (typeof window !== "undefined" && typeof window.pokerBuildPersonalInviteLink === "function") return window.pokerBuildPersonalInviteLink("profile");
    if (typeof pokerBuildPersonalInviteLink === "function") return pokerBuildPersonalInviteLink("profile");
    if (typeof buildMiniAppStartLink === "function") return buildMiniAppStartLink("profile");
    try {
      return String(location && location.origin ? location.origin : "").replace(/\/+$/, "") + "/?startapp=profile";
    } catch (eLocation) {
      return "";
    }
  }

  function shareFriendInvite() {
    var link = buildFriendInviteLink();
    if (!link) {
      alertText("Не удалось создать ссылку приглашения.");
      return;
    }
    var title = "Приглашение в покерный клуб";
    var text = "Приглашение стать другом в покерном клубе";
    var fullText = text + "\n" + link;
    var done = function () {
      if (typeof recordShareButtonClick === "function") recordShareButtonClick("profile_friend_invite");
    };
    var fallback = function () {
      var shareUrl = typeof pokerBuildTelegramShareUrlDialog === "function"
        ? pokerBuildTelegramShareUrlDialog(link, text)
        : "https://t.me/share/url?url=" + encodeURIComponent(link) + "&text=" + encodeURIComponent(text);
      var tg = typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tg && typeof tg.openTelegramLink === "function") tg.openTelegramLink(shareUrl);
      else if (tg && typeof tg.openLink === "function") tg.openLink(shareUrl);
      else if (typeof window !== "undefined" && typeof window.open === "function") window.open(shareUrl, "_blank", "noopener");
      done();
    };
    if (typeof pokerTryPwaWebShare === "function") {
      pokerTryPwaWebShare({ title: title, text: fullText, url: link }).then(function (ok) {
        if (ok) {
          done();
          return;
        }
        fallback();
      }).catch(fallback);
      return;
    }
    fallback();
  }

  function inviteSlotHtml() {
    return (
      '<button type="button" class="profile-friends__invite" id="profileFriendsInviteBtn" aria-label="Пригласить друга">' +
      '<span class="profile-friends__invite-plus" aria-hidden="true">+</span>' +
      '<span class="profile-friends__invite-text">Пригласить<br>друга</span>' +
      "</button>"
    );
  }

  function wirePreviewButtons() {
    if (!previewEl) return;
    previewEl.querySelectorAll(".profile-friends__avatar-btn").forEach(function (avatarBtn) {
      avatarBtn.addEventListener("click", function (e) {
        e.preventDefault();
        var id = avatarBtn.dataset.userId || "";
        var chatId = avatarBtn.dataset.chatUserId || "";
        var name = avatarBtn.dataset.userName || "Игрок";
        var avatar = avatarBtn.dataset.avatarUrl || "";
        if ((id || chatId) && typeof window.pokerOpenChatUserModalSafe === "function") {
          window.pokerOpenChatUserModalSafe(id || chatId, name, avatar);
        } else if ((id || chatId) && typeof window.openChatUserModalById === "function") {
          window.openChatUserModalById(id || chatId, name, avatar);
        } else {
          btn.click();
        }
      });
    });
    previewEl.querySelectorAll(".profile-friends__invite").forEach(function (inviteBtn) {
      inviteBtn.addEventListener("click", function (e) {
        e.preventDefault();
        shareFriendInvite();
      });
    });
  }

  initProfileFriendsScrollGuard();
  initProfileFriendsSearch();

  function friendsRowsCount(data) {
    return Array.isArray(data && data.friends) ? data.friends.length : 0;
  }

  function friendsHasAnyRows(data) {
    return !!(data && data.ok && (
      friendsRowsCount(data) ||
      (Array.isArray(data.incoming) && data.incoming.length) ||
      (Array.isArray(data.outgoing) && data.outgoing.length) ||
      (Array.isArray(data.notices) && data.notices.length)
    ));
  }

  function readStableFriendsData() {
    var data = pokerFriendsReadJson(POKER_FRIENDS_STABLE_CACHE_KEY, null);
    if (!data || data.ok !== true) return null;
    return data;
  }

  function writeStableFriendsData(data) {
    if (!friendsHasAnyRows(data)) return;
    pokerFriendsWriteJson(POKER_FRIENDS_STABLE_CACHE_KEY, data);
  }

  function stableFriendsData(data) {
    if (data && data.ok) {
      var cached = friendsDataCache && friendsDataCache.ok ? friendsDataCache : readStableFriendsData();
      if (friendsRowsCount(data) === 0 && friendsRowsCount(cached) > 0) return cached;
      friendsDataCache = data;
      writeStableFriendsData(data);
      return data;
    }
    return friendsDataCache && friendsDataCache.ok ? friendsDataCache : readStableFriendsData();
  }

  function renderFriendsPreview(friends) {
    if (!previewEl) return;
    var rows = (Array.isArray(friends) ? friends.slice() : [])
      .map(function (row, index) {
        return { row: row, index: index, priority: profileFriendsBirthdayPriority(row) };
      })
      .sort(function (a, b) {
        return b.priority - a.priority || a.index - b.index;
      })
      .slice(0, 3)
      .map(function (item) { return item.row; });
    var html = rows.map(function (row) {
      var meta = displayData(row);
      var avatar = previewAvatar(row);
      var level = previewLevel(row);
      var specialtyTag = profileFriendsSpecialtyTagHtml(row);
      var birthdayTag = profileFriendsBirthdayPreviewTagHtml(row);
      return (
        '<button type="button" class="profile-friends__avatar-btn" data-user-id="' + esc(row && row.userId || "") +
        '" data-chat-user-id="' + esc(row && row.chatUserId || "") +
        '" data-user-name="' + esc(meta.modalName) +
        '" data-avatar-url="' + esc(avatar) +
        '" aria-label="Открыть профиль ' + esc(meta.modalName) + '">' +
        '<span class="profile-friends__avatar-stack">' +
          '<span class="profile-friends__avatar-ring"><img src="' + esc(avatar) + '" alt="" loading="lazy" decoding="async"></span>' +
          '<span class="profile-friends__level-badge">' + esc(level) + "</span>" +
        "</span>" +
        '<span class="profile-friends__friend-name">' + esc(meta.modalName) + "</span>" +
        specialtyTag +
        birthdayTag +
        "</button>"
      );
    }).join("");
    previewEl.innerHTML = html + inviteSlotHtml();
    wirePreviewButtons();
  }

  function ensureIncomingNoticeEl() {
    if (incomingNoticeEl && incomingNoticeEl.parentNode) return incomingNoticeEl;
    if (!panelEl || !previewEl) return null;
    incomingNoticeEl = document.createElement("button");
    incomingNoticeEl.type = "button";
    incomingNoticeEl.className = "profile-friends__incoming";
    incomingNoticeEl.id = "profileFriendsIncomingBtn";
    incomingNoticeEl.hidden = true;
    incomingNoticeEl.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      focusIncomingOnOpen = true;
      btn.click();
    });
    panelEl.insertBefore(incomingNoticeEl, previewEl);
    return incomingNoticeEl;
  }

  function renderIncomingNotice(count) {
    var el = ensureIncomingNoticeEl();
    if (!el) return;
    var n = parseInt(count, 10);
    if (!isFinite(n) || n <= 0) {
      el.hidden = true;
      el.textContent = "";
      return;
    }
    el.hidden = false;
    el.innerHTML =
      '<span>Входящие заявки (' + esc(n) + ')</span>' +
      '<strong>Принять</strong>';
  }

  function renderPreviewLoading() {
    if (!previewEl) return;
    previewEl.innerHTML =
      '<span class="profile-friends__loading" role="status" aria-live="polite">' +
        '<span class="profile-friends__avatar-skeleton" aria-hidden="true"></span>' +
        '<span>Идет загрузка друзей...</span>' +
      '</span>' +
      inviteSlotHtml();
    wirePreviewButtons();
  }

  function renderRow(row, section, actionsHtml, noteHtml) {
    var meta = displayData(row);
    var lines = Array.isArray(meta.lines) && meta.lines.length ? meta.lines : [{ text: meta.modalName, kind: "name" }];
    var avatar = previewAvatar(row);
    var level = previewLevel(row);
    var specialtyTag = profileFriendsSpecialtyTagHtml(row, "friends-list-modal__specialty-tag");
    var birthdayTag = profileFriendsBirthdayTagHtml(row, "friends-list-modal__birthday-tag");
    var initial = String(meta.modalName || meta.lines && meta.lines[0] && meta.lines[0].text || "?").trim().charAt(0) || "?";
    var avatarHtml =
      '<span class="friends-list-modal__avatar-wrap" aria-hidden="true">' +
        '<span class="friends-list-modal__avatar">' +
      (avatar
        ? '<img src="' + esc(avatar) + '" alt="" loading="lazy" decoding="async">'
        : '<span>' + esc(initial.toUpperCase()) + "</span>") +
        "</span>" +
        '<span class="friends-list-modal__level-badge">ур. ' + esc(level) + "</span>" +
      "</span>";
    var htmlLabels =
      '<span class="friends-list-modal__item-labels' + (lines.length === 1 ? " friends-list-modal__item-labels--single" : "") + '">' +
      lines.map(function (line, idx) {
        var cls = idx === 0 ? "friends-list-modal__item-name" : "friends-list-modal__item-login";
        return '<span class="' + cls + '">' + esc(line && line.text) + "</span>";
      }).join("") +
      '<span class="friends-list-modal__item-meta">' + specialtyTag + birthdayTag + "</span>" +
      (noteHtml || "") +
      "</span>";
    return (
      '<div class="friends-list-modal__item" data-section="' + esc(section) +
      '" data-user-id="' + esc(row.userId || "") +
      '" data-chat-user-id="' + esc(row.chatUserId || "") +
      '" data-user-name="' + esc(meta.modalName) +
      '" data-avatar-url="' + esc(avatar) + '">' +
      avatarHtml +
      htmlLabels +
      '<div class="friends-list-modal__item-actions">' + actionsHtml + "</div></div>"
    );
  }

  function renderSection(title, rows, section, renderer) {
    rows = Array.isArray(rows) ? rows : [];
    if (!rows.length) return "";
    return (
      '<section class="friends-list-modal__section" data-friends-section="' + esc(section) + '">' +
      '<h4 class="friends-list-modal__section-title">' + esc(title) + "</h4>" +
      rows.map(function (row) { return renderer(row); }).join("") +
      "</section>"
    );
  }

  function wireProfileButtons() {
    listEl.querySelectorAll(".friends-list-modal__btn--profile").forEach(function (profileBtn) {
      profileBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var item = profileBtn.closest(".friends-list-modal__item");
        if (!item) return;
        var id = item.dataset.userId;
        var chatId = item.dataset.chatUserId || "";
        var name = item.dataset.userName;
        var avatar = item.dataset.avatarUrl || "";
        if ((id || chatId) && typeof window.pokerOpenChatUserModalSafe === "function") {
          closeFriendsModal();
          window.pokerOpenChatUserModalSafe(id || chatId, name, avatar);
        } else if ((id || chatId) && typeof window.openChatUserModalById === "function") {
          closeFriendsModal();
          window.openChatUserModalById(id || chatId, name, avatar);
        }
      });
    });
  }

  function afterMutate() {
    if (typeof window.__pokerReloadChatContacts === "function") window.__pokerReloadChatContacts();
    if (typeof window.chatRefresh === "function") window.chatRefresh();
    if (typeof pokerRefreshFriendsCountFromApi === "function") pokerRefreshFriendsCountFromApi();
    loadFriends();
  }

  function postFriendAction(targetUserId, action, button) {
    var base = getApiBase();
    if (!base || !targetUserId) return;
    if (button) button.disabled = true;
    fetch(base + "/api/friends", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerApiAuthJsonBody({ targetUserId: targetUserId, action: action })),
    })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d && d.ok) {
          alertText(action === "accept" ? "Заявка принята" : action === "cancel" ? "Заявка отменена" : "Заявка отклонена");
          afterMutate();
        } else {
          if (button) button.disabled = false;
          alertText((d && d.error) || "Ошибка");
        }
      })
      .catch(function () {
        if (button) button.disabled = false;
        alertText(POKER_NET_ERR);
      });
  }

  function deleteFriend(targetUserId, kind, button) {
    var base = getApiBase();
    if (!base || !targetUserId) return;
    var text = "Убрать этого человека из друзей?";
    var confirmed = typeof window.confirm === "function" ? window.confirm(text) : true;
    if (!confirmed) return;
    if (button) button.disabled = true;
    fetch(base + "/api/friends", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerApiAuthJsonBody({ targetUserId: targetUserId, list: kind })),
    })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d && d.ok) {
          if (typeof pokerRemoveLocalFriendFromChatContacts === "function") {
            pokerRemoveLocalFriendFromChatContacts(targetUserId);
          }
          afterMutate();
        } else {
          if (button) button.disabled = false;
          alertText((d && d.error) || "Ошибка");
        }
      })
      .catch(function () {
        if (button) button.disabled = false;
        alertText(POKER_NET_ERR);
      });
  }

  function wireActionButtons() {
    wireProfileButtons();
    listEl.querySelectorAll(".friends-list-modal__btn--accept").forEach(function (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var item = button.closest(".friends-list-modal__item");
        postFriendAction(item && item.dataset.userId, "accept", button);
      });
    });
    listEl.querySelectorAll(".friends-list-modal__btn--reject").forEach(function (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var item = button.closest(".friends-list-modal__item");
        postFriendAction(item && item.dataset.userId, "reject", button);
      });
    });
    listEl.querySelectorAll(".friends-list-modal__btn--cancel").forEach(function (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var item = button.closest(".friends-list-modal__item");
        postFriendAction(item && item.dataset.userId, "cancel", button);
      });
    });
    listEl.querySelectorAll(".friends-list-modal__btn--remove").forEach(function (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var item = button.closest(".friends-list-modal__item");
        var kind = button.getAttribute("data-delete-kind") || "friends";
        deleteFriend(item && item.dataset.userId, kind, button);
      });
    });
  }

  function renderFriendsData(data) {
    var friends = Array.isArray(data && data.friends) ? data.friends : [];
    var incoming = Array.isArray(data && data.incoming) ? data.incoming : [];
    var outgoing = Array.isArray(data && data.outgoing) ? data.outgoing : [];
    var notices = Array.isArray(data && data.notices) ? data.notices : [];
    var friendIds = {};
    friends.forEach(function (row) {
      var id = pokerFriendsRowId(row);
      if (id) friendIds[id] = true;
    });
    incoming = incoming.filter(function (row) {
      var id = pokerFriendsRowId(row);
      return !id || !friendIds[id];
    });
    outgoing = outgoing.filter(function (row) {
      var id = pokerFriendsRowId(row);
      return !id || !friendIds[id];
    });
    try {
      if (typeof pokerUpdateFriendsCountLabels === "function") pokerUpdateFriendsCountLabels(friends.length);
    } catch (eFcModal) {}
    try { pokerUpdateFriendsUnreadFromData(data); } catch (eUnreadData) {}
    renderIncomingNotice(incoming.length);
    renderFriendsPreview(friends);
    var chunks = [];
    chunks.push(renderSection("Друзья", friends, "friends", function (row) {
      var removeHtml = row && row.defaultFriend
        ? ""
        : '<button type="button" class="friends-list-modal__btn friends-list-modal__btn--remove" data-delete-kind="friends">Удалить из друзей</button>';
      return renderRow(
        row,
        "friends",
        '<button type="button" class="friends-list-modal__btn friends-list-modal__btn--profile">Открыть профиль</button>' +
          removeHtml
      );
    }));
    chunks.push(renderSection("Входящие заявки", incoming, "incoming", function (row) {
      return renderRow(
        row,
        "incoming",
        '<button type="button" class="friends-list-modal__btn friends-list-modal__btn--accept">Принять</button>' +
          '<button type="button" class="friends-list-modal__btn friends-list-modal__btn--reject">Отклонить</button>'
      );
    }));
    chunks.push(renderSection("Отправленные", outgoing, "outgoing", function (row) {
      return renderRow(
        row,
        "outgoing",
        '<button type="button" class="friends-list-modal__btn friends-list-modal__btn--profile">Открыть профиль</button>' +
          '<span class="friends-list-modal__status">Ожидает ответа</span>' +
          '<button type="button" class="friends-list-modal__btn friends-list-modal__btn--cancel">Отменить заявку</button>'
      );
    }));
    chunks.push(renderSection("Ответы", notices, "notices", function (row) {
      var status = row && row.status === "accepted" ? "принял заявку" : "отклонил заявку";
      return renderRow(
        row,
        "notices",
        '<button type="button" class="friends-list-modal__btn friends-list-modal__btn--profile">Открыть профиль</button>',
        '<span class="friends-list-modal__item-login">Игрок ' + esc(status) + "</span>"
      );
    }));
    var html = chunks.join("");
    listEl.innerHTML = html || '<p class="friends-list-modal__empty">Пока нет друзей и заявок</p>';
    wireActionButtons();
    if (focusIncomingOnOpen) {
      focusIncomingOnOpen = false;
      setTimeout(function () {
        var incomingSection = listEl.querySelector('[data-friends-section="incoming"]');
        if (incomingSection && typeof incomingSection.scrollIntoView === "function") {
          incomingSection.scrollIntoView({ block: "start", behavior: "auto" });
        }
      }, 0);
    }
  }

  function loadFriends(options) {
    options = options || {};
    var base = getApiBase();
    if (!base) return;
    var hasCachedData = !!(friendsDataCache && friendsDataCache.ok);
    if (!hasCachedData) {
      friendsDataCache = readStableFriendsData();
      hasCachedData = !!(friendsDataCache && friendsDataCache.ok);
    }
    var displayedCachedData = !!(options.preferCache && hasCachedData);
    if (displayedCachedData) {
      renderFriendsData(friendsDataCache);
      try { pokerMarkFriendsSeen(friendsDataCache); } catch (eSeenCachedFriends) {}
    } else {
      listEl.innerHTML = '<p class="friends-list-modal__loading">Загрузка...</p>';
    }
    fetchFriendsData()
      .then(function (data) {
        if (!data || !data.ok) {
          if (!displayedCachedData) listEl.innerHTML = '<p class="friends-list-modal__empty">Ошибка загрузки</p>';
          try {
            if (typeof pokerRefreshFriendsCountFromApi === "function") pokerRefreshFriendsCountFromApi();
          } catch (eRe) {}
          return;
        }
        renderFriendsData(data);
        try { pokerMarkFriendsSeen(data); } catch (eSeenFriends) {}
      })
      .catch(function () {
        if (!displayedCachedData) listEl.innerHTML = '<p class="friends-list-modal__empty">' + esc(POKER_NET_ERR) + "</p>";
      });
  }

  function loadFriendsPreview() {
    var base = getApiBase();
    if (!base) return;
    if (!profileFriendsHasCredential()) {
      if (!friendsDataCache) friendsDataCache = readStableFriendsData();
      if (friendsDataCache && friendsDataCache.ok) {
        renderIncomingNotice(Array.isArray(friendsDataCache.incoming) ? friendsDataCache.incoming.length : 0);
        renderFriendsPreview(Array.isArray(friendsDataCache.friends) ? friendsDataCache.friends : []);
        try {
          if (typeof pokerUpdateFriendsCountLabels === "function") pokerUpdateFriendsCountLabels(Array.isArray(friendsDataCache.friends) ? friendsDataCache.friends.length : 0);
        } catch (eNoCredCachedPreviewCount) {}
      } else {
        renderPreviewLoading();
      }
      scheduleFriendsPreviewRetry();
      return;
    }
    friendsPreviewRetryCount = 0;
    var previewHadCachedData = !!(friendsDataCache && friendsDataCache.ok);
    if (!previewHadCachedData) {
      friendsDataCache = readStableFriendsData();
      previewHadCachedData = !!(friendsDataCache && friendsDataCache.ok);
    }
    if (previewHadCachedData) {
      renderIncomingNotice(Array.isArray(friendsDataCache.incoming) ? friendsDataCache.incoming.length : 0);
      renderFriendsPreview(Array.isArray(friendsDataCache.friends) ? friendsDataCache.friends : []);
      try {
        if (typeof pokerUpdateFriendsCountLabels === "function") pokerUpdateFriendsCountLabels(Array.isArray(friendsDataCache.friends) ? friendsDataCache.friends.length : 0);
      } catch (eCachedPreviewCount) {}
    } else {
      renderPreviewLoading();
    }
    fetchFriendsData()
      .then(function (data) {
        if (!data || !data.ok) {
          if (!previewHadCachedData) {
            renderIncomingNotice(0);
            renderFriendsPreview([]);
          }
          return;
        }
        var stableData = stableFriendsData(data) || data;
        try { pokerUpdateFriendsUnreadFromData(stableData); } catch (ePreviewUnread) {}
        renderIncomingNotice(Array.isArray(stableData.incoming) ? stableData.incoming.length : 0);
        renderFriendsPreview(Array.isArray(stableData.friends) ? stableData.friends : []);
        try {
          if (typeof pokerUpdateFriendsCountLabels === "function") pokerUpdateFriendsCountLabels(Array.isArray(stableData.friends) ? stableData.friends.length : 0);
        } catch (ePreviewCount) {}
      })
      .catch(function () {
        if (!previewHadCachedData) {
          renderIncomingNotice(0);
          renderFriendsPreview([]);
        }
      });
  }

  var backdrop = modal.querySelector(".friends-list-modal__backdrop");
  var closeBtn = modal.querySelector(".friends-list-modal__close");
  if (backdrop) backdrop.addEventListener("click", closeFriendsModal);
  if (closeBtn) closeBtn.addEventListener("click", closeFriendsModal);
  btn.addEventListener("click", function () {
    var base = getApiBase();
    if (!base) return;
    if (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential()) {
      alertText("Войдите в приложение (Telegram или PWA).");
      return;
    }
    modal.setAttribute("aria-hidden", "false");
    modal.classList.add("friends-list-modal--open");
    loadFriends({ preferCache: true });
  });

  window.pokerRefreshProfileFriendsPreview = loadFriendsPreview;
  window.pokerRenderProfileFriendsPreview = renderFriendsPreview;
  window.addEventListener("poker-telegram-auth", function () {
    friendsFetchPromise = null;
    loadFriendsPreview();
  });
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") loadFriendsPreview();
  });
  loadFriendsPreview();
}

pokerRefreshFriendsUnreadIndicators();
document.addEventListener("DOMContentLoaded", pokerRefreshFriendsUnreadIndicators);
