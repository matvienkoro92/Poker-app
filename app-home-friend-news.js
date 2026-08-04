(function initHomeFriendNews() {
  "use strict";

  var LEVELS_KEY = "poker_home_friend_levels_v1";
  var LEVEL_EVENTS_KEY = "poker_home_friend_level_events_v1";
  var TOURNAMENT_SNAPSHOTS_KEY = "poker_home_friend_tournament_snapshots_v2";
  var RATING_RISE_EVENTS_KEY = "poker_home_friend_rating_rise_events_v1";
  var CLUB_RATING_SNAPSHOTS_KEY = "poker_home_club_rating_snapshots_v1";
  var CLUB_RATING_RISE_EVENTS_KEY = "poker_home_club_rating_rise_events_v1";
  var CLUB_LEVELS_KEY = "poker_home_club_levels_v1";
  var CLUB_LEVEL_EVENTS_KEY = "poker_home_club_level_events_v1";
  var GENERATED_EVENTS_KEY = "poker_home_friend_generated_events_v6";
  var FRIEND_IDS_KEY = "poker_home_friend_ids_v3";
  var MAX_EVENTS = 50;
  var HOME_NEWS_REACTIONS = ["❤️", "🔥", "👍", "👏", "😂", "😮", "😢", "😡"];
  var RECENT_EVENT_MS = 60 * 24 * 60 * 60 * 1000;
  var ROTATE_MS = 4600;
  var rotateTimer = null;
  var clubRotateTimer = null;
  var events = [];
  var clubEvents = [];
  var clubWallEvents = [];
  var clubNewsTab = "wins";
  var activeIndex = 0;
  var clubActiveIndex = 0;
  var eventFeedback = {};
  var eventCommentsOpen = {};
  var eventCommentReplies = {};
  var eventCommentDrafts = {};
  var eventCommentSubmitting = {};
  var newsModalMode = "friends";
  var friendNewsLoading = true;
  var friendNewsLoaded = false;
  var lastFriendsSignature = "";
  var lastLoadAt = 0;
  var loadSequence = 0;
  var friendNewsLoadPromise = null;
  var remoteFetchInFlight = {};
  var REMOTE_CACHE_PREFIX = "poker_home_friend_news_remote_v1:";
  var RENDERED_EVENTS_CACHE_KEY = "poker_home_friend_news_rendered_v2";
  var PLAYER_EVENTS_CACHE_PREFIX = "poker_player_news_rendered_v2:";
  var CLUB_EVENTS_CACHE_KEY = "poker_home_club_news_rendered_v9";
  var clubNewsLoading = true;
  var clubNewsLoaded = false;
  var clubNewsLoadPromise = null;
  var clubNewsUpdatedAt = 0;
  var clubWallLoadPromise = null;
  var clubWallLoading = false;
  var clubNewsRetryTimer = 0;
  var clubNewsRetryCount = 0;
  var clubProfileByNick = {};
  var clubProfileLookupPromises = {};
  var friendProfileByNick = {};
  var friendProfileById = {};
  var homeNewsLongPressTimer = 0;
  var homeNewsLongPressTriggered = false;
  var newsProfileReturnState = null;
  var returnToClubNewsAfterAchievements = false;
  var returnToClubNewsScrollTop = 0;
  var PLAYER_NEWS_COLORS = [
    { accent: "#65c7ff", rgb: "101, 199, 255" },
    { accent: "#68e2ad", rgb: "104, 226, 173" },
    { accent: "#ffbf59", rgb: "255, 191, 89" },
    { accent: "#ff829f", rgb: "255, 130, 159" },
    { accent: "#aa92ff", rgb: "170, 146, 255" },
    { accent: "#ff9368", rgb: "255, 147, 104" },
    { accent: "#64e2df", rgb: "100, 226, 223" },
    { accent: "#d9e56b", rgb: "217, 229, 107" },
    { accent: "#f080d8", rgb: "240, 128, 216" },
    { accent: "#7fa9ff", rgb: "127, 169, 255" },
  ];
  var HOME_COMMENT_EMOJIS = [
    "😀", "😂", "😍", "😎", "🤔", "😢", "😡", "🥳",
    "👍", "👎", "👏", "🙏", "💪", "🤝", "🔥", "❤️",
    "🎉", "🏆", "💰", "🎯", "♠️", "♥️", "♦️", "♣️",
  ];

  function isUndatedTournamentSnapshotEvent(row) {
    var id = String(row && row.id || "");
    return /^achievement:(?:bigWins50|bigWins100|firstPlaces|top10Finishes|seasonCups|raffleWins|luckyMonths|millionaire):/.test(id) ||
      /^rating:league[12]:/.test(id);
  }

  function readRenderedEventsCache() {
    try {
      var rows = JSON.parse(sessionStorage.getItem(RENDERED_EVENTS_CACHE_KEY) || "[]");
      return mergeRelatedPlayerEvents((Array.isArray(rows) ? rows : []).filter(function (row) {
        return row && row.id && !isUndatedTournamentSnapshotEvent(row) &&
          (row.type === "birthday" || isRecentEvent(row.at));
      })).slice(0, MAX_EVENTS);
    } catch (error) {
      return [];
    }
  }

  function writeRenderedEventsCache(rows) {
    try {
      sessionStorage.setItem(RENDERED_EVENTS_CACHE_KEY, JSON.stringify(
        (Array.isArray(rows) ? rows : []).filter(function (row) { return row && row.id !== "empty"; }).slice(0, MAX_EVENTS)
      ));
    } catch (error) {}
  }

  function readClubEventsCache() {
    try {
      var stored = localStorage.getItem(CLUB_EVENTS_CACHE_KEY) || sessionStorage.getItem(CLUB_EVENTS_CACHE_KEY) || "[]";
      var rows = JSON.parse(stored);
      return distributeDailyClubEvents(mergeRelatedPlayerEvents((Array.isArray(rows) ? rows : []).filter(function (row) {
        return row && row.id && row.id !== "club-empty" && row.id !== "club-loading" && isCurrentClubEvent(row);
      }))).slice(0, MAX_EVENTS);
    } catch (error) {
      return [];
    }
  }

  function writeClubEventsCache(rows) {
    try {
      localStorage.setItem(CLUB_EVENTS_CACHE_KEY, JSON.stringify(
        (Array.isArray(rows) ? rows : []).filter(function (row) {
          return row && row.id !== "club-empty" && row.id !== "club-loading";
        }).slice(0, MAX_EVENTS)
      ));
    } catch (error) {}
  }

  function playerNewsCacheKey(identity) {
    var player = identity && typeof identity === "object" ? identity : {};
    var id = String(player.userId || player.accountId || player.id || "").trim();
    var nick = String(player.pokerPlusNickname || player.ratingNick || player.nick || player.name || "").replace(/^@+/, "").trim();
    return id || matchKey(nick);
  }

  function readPlayerNewsCache(identity) {
    var key = playerNewsCacheKey(identity);
    if (!key) return [];
    try {
      var stored = JSON.parse(sessionStorage.getItem(PLAYER_EVENTS_CACHE_PREFIX + key) || "null");
      if (!stored || !Array.isArray(stored.rows)) return [];
      return mergeRelatedPlayerEvents(stored.rows.filter(function (row) {
        return row && row.id && !isUndatedTournamentSnapshotEvent(row) &&
          (row.type === "birthday" || isRecentEvent(row.at));
      })).slice(0, MAX_EVENTS);
    } catch (error) {
      return [];
    }
  }

  function writePlayerNewsCache(identity, rows) {
    var key = playerNewsCacheKey(identity);
    if (!key) return;
    try {
      sessionStorage.setItem(PLAYER_EVENTS_CACHE_PREFIX + key, JSON.stringify({
        at: Date.now(),
        rows: (Array.isArray(rows) ? rows : []).slice(0, MAX_EVENTS),
      }));
    } catch (error) {}
  }

  function cachedFetchJson(url, cacheKey, ttlMs, requestOptions) {
    var now = Date.now();
    try {
      var stored = JSON.parse(sessionStorage.getItem(REMOTE_CACHE_PREFIX + cacheKey) || "null");
      if (stored && stored.at && now - Number(stored.at) < ttlMs && stored.data) {
        return Promise.resolve(stored.data);
      }
    } catch (error) {}
    if (remoteFetchInFlight[cacheKey]) return remoteFetchInFlight[cacheKey];
    var request = fetch(url, requestOptions || {}).then(function (response) {
      return response.json();
    }).then(function (data) {
      try {
        sessionStorage.setItem(REMOTE_CACHE_PREFIX + cacheKey, JSON.stringify({ at: Date.now(), data: data }));
      } catch (error) {}
      return data;
    });
    remoteFetchInFlight[cacheKey] = request.then(function (data) {
      delete remoteFetchInFlight[cacheKey];
      return data;
    }, function (error) {
      delete remoteFetchInFlight[cacheKey];
      throw error;
    });
    return remoteFetchInFlight[cacheKey];
  }

  function el(id) {
    return document.getElementById(id);
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function readJson(key, fallback) {
    try {
      var value = JSON.parse(localStorage.getItem(key) || "");
      return value == null ? fallback : value;
    } catch (error) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) {}
  }

  function authSuffix() {
    try {
      if (typeof pokerApiAuthQuery === "function") return pokerApiAuthQuery("?");
      if (typeof authQuerySafe === "function") return authQuerySafe();
      if (typeof getAuthQuery === "function") return getAuthQuery();
    } catch (error) {}
    return "";
  }

  function apiBase() {
    try {
      if (typeof getApiBase === "function") {
        var configured = String(getApiBase() || "").replace(/\/$/, "");
        if (configured) return configured;
      }
      return window.location && window.location.origin ? String(window.location.origin).replace(/\/$/, "") : "";
    } catch (error) {
      return window.location && window.location.origin ? String(window.location.origin).replace(/\/$/, "") : "";
    }
  }

  function openNewsPlayerProfile(id, name, avatar) {
    id = String(id || "").trim();
    if (!id) return false;
    var openOptions = { deferReveal: true };
    if (typeof window.pokerOpenChatUserModalSafe === "function") {
      window.pokerOpenChatUserModalSafe(id, name || "Игрок", avatar || "", openOptions);
      return true;
    }
    if (typeof window.openChatUserModalById === "function" && window.openChatUserModalById.__pokerFallback !== true) {
      window.openChatUserModalById(id, name || "Игрок", avatar || "", openOptions);
      return true;
    }
    if (typeof window.pokerEnsureScriptDomains === "function") {
      Promise.resolve(window.pokerEnsureScriptDomains(["chat"])).then(function () {
        if (typeof window.openChatUserModalById === "function") {
          window.openChatUserModalById(id, name || "Игрок", avatar || "", openOptions);
        }
      }).catch(function () {});
      return true;
    }
    return false;
  }

  function handoffNewsModalToPlayer(id, name, avatar) {
    var settled = false;
    var timeoutId = 0;
    var list = el("homeFriendNewsList");
    newsProfileReturnState = {
      mode: newsModalMode,
      scrollTop: list ? list.scrollTop : 0,
    };
    setNewsProfileLoading(true, name);

    function restoreNewsAfterProfile() {
      document.removeEventListener("poker:chat-user-modal-close", restoreNewsAfterProfile);
      var state = newsProfileReturnState;
      newsProfileReturnState = null;
      if (!state) return;
      newsModalMode = state.mode === "club" ? "club" : "friends";
      syncNewsModalHeading();
      var rows = activeModalEvents();
      renderModalList(rows);
      var modal = el("homeFriendNewsModal");
      if (modal) modal.hidden = false;
      document.body.classList.add("home-friend-news-modal-open");
      window.requestAnimationFrame(function () {
        var restoredList = el("homeFriendNewsList");
        if (restoredList) restoredList.scrollTop = Number(state.scrollTop) || 0;
      });
    }

    function cancelHandoff() {
      setNewsProfileLoading(false);
      newsProfileReturnState = null;
      document.removeEventListener("poker:chat-user-modal-close", restoreNewsAfterProfile);
    }

    function profileOpened() {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeoutId);
      document.removeEventListener("poker:chat-user-modal-open", profileOpened);
      setNewsProfileLoading(false);
      closeModal();
    }
    document.addEventListener("poker:chat-user-modal-open", profileOpened);
    document.addEventListener("poker:chat-user-modal-close", restoreNewsAfterProfile);
    timeoutId = window.setTimeout(function () {
      if (settled) return;
      settled = true;
      document.removeEventListener("poker:chat-user-modal-open", profileOpened);
      cancelHandoff();
    }, 15000);
    if (!openNewsPlayerProfile(id, name, avatar)) {
      settled = true;
      window.clearTimeout(timeoutId);
      document.removeEventListener("poker:chat-user-modal-open", profileOpened);
      cancelHandoff();
    }
  }

  function setNewsProfileLoading(active, name) {
    var overlay = el("homeNewsProfileLoading");
    if (!overlay) return;
    var label = el("homeNewsProfileLoadingName");
    if (label) label.textContent = active && name ? String(name) : "";
    overlay.hidden = !active;
  }

  function ensureDom() {
    var homeShortcuts = document.querySelector(".home-daily-shortcuts");
    if (homeShortcuts && !el("homeClubNews")) {
      homeShortcuts.insertAdjacentHTML("afterend",
        '<section class="home-friend-news home-club-news" id="homeClubNews" aria-label="Новости клуба">' +
          '<button type="button" class="home-friend-news__ticker home-club-news__ticker" id="homeClubNewsOpen">' +
            '<span class="home-friend-news__label" id="homeClubNewsLabel">Новости клуба</span>' +
            '<span class="home-friend-news__viewport"><span class="home-friend-news__track" id="homeClubNewsTrack" aria-live="polite"></span></span>' +
            '<span class="home-friend-news__arrow" aria-hidden="true">›</span>' +
          "</button>" +
        "</section>");
    }
    var friendsPanel = el("profileFriendsPanel");
    if (friendsPanel && !el("homeFriendNews")) {
      friendsPanel.insertAdjacentHTML("beforebegin",
        '<section class="home-friend-news" id="homeFriendNews" data-profile-friends-panel aria-label="Новости друзей" hidden>' +
          '<button type="button" class="home-friend-news__ticker" id="homeFriendNewsOpen" aria-haspopup="dialog" aria-controls="homeFriendNewsModal">' +
            '<span class="home-friend-news__badge" aria-hidden="true">●</span>' +
            '<span class="home-friend-news__label">Новости друзей</span>' +
            '<span class="home-friend-news__viewport"><span class="home-friend-news__track" id="homeFriendNewsTrack" aria-live="polite"></span></span>' +
            '<span class="home-friend-news__arrow" aria-hidden="true">›</span>' +
          "</button>" +
        "</section>");
    }
    if (!el("homeFriendNewsModal")) {
      document.body.insertAdjacentHTML("beforeend",
        '<div class="home-friend-news-modal" id="homeFriendNewsModal" hidden>' +
          '<button type="button" class="home-friend-news-modal__backdrop" data-home-friend-news-close aria-label="Закрыть новости"></button>' +
          '<section class="home-friend-news-modal__panel" role="dialog" aria-modal="true" aria-labelledby="homeFriendNewsModalTitle">' +
            '<header class="home-friend-news-modal__header"><div><span id="homeFriendNewsModalEyebrow">Друзья и клуб</span>' +
              '<h2 id="homeFriendNewsModalTitle">Новости друзей</h2></div>' +
              '<div class="home-friend-news-modal__header-actions">' +
                '<button type="button" class="home-friend-news-modal__copy-link" id="homeClubNewsCopyLink" aria-label="Копировать ссылку на новости клуба" title="Копировать ссылку" hidden>' +
                  '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2"></rect><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"></path></svg>' +
                '</button>' +
                '<button type="button" class="home-friend-news-modal__close" data-home-friend-news-close aria-label="Закрыть">×</button>' +
              '</div>' +
            '</header><div class="home-friend-news-modal__list" id="homeFriendNewsList"></div>' +
            '<div class="home-news-profile-loading" id="homeNewsProfileLoading" hidden role="status" aria-live="polite">' +
              '<span class="home-news-profile-loading__spinner" aria-hidden="true"></span>' +
              '<strong>Загрузка профиля…</strong>' +
              '<span id="homeNewsProfileLoadingName"></span>' +
            '</div>' +
          "</section>" +
        "</div>");
    }
  }

  function friendId(row) {
    return String(row && (row.userId || row.accountId || row.dtId || row.chatUserId) || "").trim();
  }

  function friendName(row) {
    var name = String(row && (row.pokerPlusNickname || row.pokerPlusName || row.contactName || row.chatDisplayName || row.userName) || "Ваш друг")
      .replace(/^@+/, "")
      .trim();
    return matchKey(name) === "романдий" ? "ПокерМанки" : name;
  }

  function friendPokerIdentity(row) {
    var nick = String(row && row.pokerPlusNickname || "").replace(/^@+/, "").trim();
    var name = String(row && (row.pokerPlusName || row.contactName || row.chatDisplayName) || "").replace(/^@+/, "").trim();
    var p21Id = String(row && (row.p21Id || row.poker21Id || row.pokerPlusUserId) || "").trim();
    var parts = [];
    if (nick) parts.push(nick);
    if (name && matchKey(name) !== matchKey(nick)) parts.push(name);
    if (p21Id) parts.push("Poker21 ID " + p21Id);
    return parts.join(" · ") || friendName(row);
  }

  function friendAvatar(row) {
    var value = String(row && (
      row.avatarUrl ||
      row.avatar ||
      row.photoUrl ||
      row.pokerPlusAvatarUrl ||
      row.profileAvatarUrl
    ) || "").trim();
    var presets = {
      tiger: "./assets/avatar-tiger.jpg", raccoon: "./assets/avatar-raccoon.jpg", skull: "./assets/avatar-skull.jpg",
      phoenix: "./assets/avatar-phoenix.jpg", octopus: "./assets/avatar-octopus.jpg", cat: "./assets/avatar-cat.jpg",
      robot: "./assets/avatar-robot.jpg", bulldog: "./assets/avatar-bulldog.jpg", monkey: "./assets/daily-poker-monkey.webp",
      fox: "./assets/avatar-fox.jpg", chip: "./assets/avatar-chip.jpg", koala: "./assets/avatar-koala.jpg",
      raven: "./assets/avatar-raven.jpg", crocodile: "./assets/avatar-crocodile.jpg", rabbit: "./assets/avatar-rabbit.jpg",
      chameleon: "./assets/avatar-chameleon.jpg", panda: "./assets/avatar-panda.jpg", wolf: "./assets/avatar-wolf.jpg",
      owl: "./assets/avatar-owl.jpg", bat: "./assets/avatar-bat.jpg", gorilla: "./assets/avatar-gorilla.jpg",
    };
    return value.indexOf("preset:") === 0 ? (presets[value.slice(7)] || "") : value;
  }

  function clubNewsFallbackAvatar(value) {
    var avatars = [
      "./assets/avatar-tiger.jpg", "./assets/avatar-raccoon.jpg", "./assets/avatar-phoenix.jpg",
      "./assets/avatar-octopus.jpg", "./assets/avatar-cat.jpg", "./assets/avatar-robot.jpg",
      "./assets/daily-poker-monkey.webp", "./assets/avatar-fox.jpg", "./assets/avatar-koala.jpg",
      "./assets/avatar-raven.jpg", "./assets/avatar-panda.jpg", "./assets/avatar-wolf.jpg",
    ];
    var source = matchKey(value) || "player";
    var hash = 0;
    for (var i = 0; i < source.length; i += 1) hash = (hash * 31 + source.charCodeAt(i)) >>> 0;
    return avatars[hash % avatars.length];
  }

  function playerNewsColor(value) {
    var source = matchKey(value) || "player";
    var hash = 0;
    for (var i = 0; i < source.length; i += 1) hash = (hash * 31 + source.charCodeAt(i)) >>> 0;
    return PLAYER_NEWS_COLORS[hash % PLAYER_NEWS_COLORS.length];
  }

  function attachFriendAvatars(rows, friends) {
    var candidates = (friends || []).map(function (friend) {
      return {
        id: friendId(friend),
        nick: friendName(friend),
        nickKey: matchKey(friend && friend.pokerPlusNickname) || matchKey(friendName(friend)),
        avatar: friendAvatar(friend),
      };
    });
    return (rows || []).map(function (row) {
      if (!row || row.playerAccent) return row;
      var text = String(row.text || "");
      var actorNickKey = matchKey(row.actorNick);
      var actor = actorNickKey && candidates.find(function (candidate) {
        return candidate.nickKey && actorNickKey === candidate.nickKey;
      });
      if (!actor) {
        actor = candidates.find(function (candidate) {
          return candidate.id && String(row.actorId || "") === candidate.id;
        });
      }
      if (!actor) {
        actor = candidates.find(function (candidate) {
          return candidate.nick && text.indexOf(candidate.nick) !== -1;
        });
      }
      if (!actor) return row;
      var color = playerNewsColor(actor.nickKey || actor.nick || actor.id);
      return Object.assign({}, row, {
        actorAvatar: actor.avatar || row.actorAvatar || "",
        actorId: actorNickKey && actor.nickKey === actorNickKey ? (actor.id || row.actorId) : (row.actorId || actor.id),
        actorNick: row.actorNick || actor.nick,
        playerAccent: color.accent,
        playerRgb: color.rgb,
      });
    });
  }

  function enrichFriendsWithPoker21(friends, publicRows) {
    var byAccount = {};
    (Array.isArray(publicRows) ? publicRows : []).forEach(function (row) {
      [row && row.accountId, row && row.userId, row && row.dtId].forEach(function (id) {
        id = String(id || "").trim();
        if (id && !byAccount[id]) byAccount[id] = row;
      });
    });
    return (friends || []).map(function (friend) {
      var linked = byAccount[friendId(friend)];
      if (!linked) return friend;
      return Object.assign({}, friend, {
        p21Id: linked.p21Id || linked.poker21Id || linked.pokerPlusUserId || friend.p21Id || "",
        pokerPlusNickname: linked.pokerPlusNickname || linked.ratingNick || linked.ratingNickname ||
          linked.nickname || linked.nick || friend.pokerPlusNickname || "",
        pokerPlusName: linked.name || linked.pokerPlusName || "",
        statusLevel: linked.statusLevel || linked.level || friend.statusLevel || friend.level || 0,
      });
    });
  }

  function matchKey(value) {
    var normalized = String(value == null ? "" : value).replace(/^@+/, "").trim().toLowerCase();
    try { normalized = normalized.normalize("NFKC"); } catch (error) {}
    return normalized.replace(/[\uFE0E\uFE0F]/g, "").replace(/\s+/g, "");
  }

  function nicknameMatchKeys(value) {
    var exact = matchKey(value);
    if (!exact) return [];
    var relaxed = exact.replace(/[!！?？.,:;"'`~()\[\]{}<>«»]+$/g, "");
    var keys = relaxed && relaxed !== exact && relaxed.length >= 3 ? [exact, relaxed] : [exact];
    if (exact === "романдий" && keys.indexOf("покерманки") === -1) keys.push("покерманки");
    if (exact === "покерманки" && keys.indexOf("романдий") === -1) keys.push("романдий");
    return keys;
  }

  function clubProfileForNick(value) {
    var keys = nicknameMatchKeys(value);
    for (var i = 0; i < keys.length; i += 1) {
      if (clubProfileByNick[keys[i]]) return clubProfileByNick[keys[i]];
    }
    return null;
  }

  function resolveClubProfileForNick(value) {
    var nick = String(value || "").replace(/^@+/, "").trim();
    var key = matchKey(nick);
    var known = clubProfileForNick(nick);
    if (known && known.id) return Promise.resolve(known);
    if (!nick || !key) return Promise.resolve(null);
    if (clubProfileLookupPromises[key]) return clubProfileLookupPromises[key];
    var base = apiBase();
    if (!base) return Promise.resolve(null);
    var suffix = authSuffix();
    var url = base + "/api/users" + suffix + (suffix ? "&" : "?") + "ratingNick=" + encodeURIComponent(nick);
    var lookupFetch = typeof pokerFetchWithTimeout === "function"
      ? pokerFetchWithTimeout(url, { cache: "no-store" }, 5000)
      : fetch(url, { cache: "no-store" });
    clubProfileLookupPromises[key] = lookupFetch.then(function (response) {
      if (!response.ok) return null;
      return response.json();
    }).then(function (data) {
      var id = String(data && (data.userId || data.chatUserId) || "").trim();
      if (!id) return null;
      var profile = { id: id, avatar: "" };
      nicknameMatchKeys(nick).forEach(function (alias) {
        if (alias) clubProfileByNick[alias] = profile;
      });
      return profile;
    }).catch(function () {
      return null;
    }).then(function (profile) {
      delete clubProfileLookupPromises[key];
      return profile;
    });
    return clubProfileLookupPromises[key];
  }

  function friendRatingNickCandidates(friend) {
    var seen = {};
    return [
      friend && friend.pokerPlusNickname,
      friend && friend.ratingNick,
      friend && friend.ratingNickname,
      friend && friend.nickname,
      friend && friend.nick,
      friend && friend.pokerPlusName,
      friend && friend.contactName,
      friend && friend.chatDisplayName,
      friend && friend.userName,
    ].map(function (value) {
      return String(value || "").replace(/^@+/, "").trim();
    }).filter(function (value) {
      var key = matchKey(value);
      if (!key || seen[key]) return false;
      seen[key] = true;
      return true;
    });
  }

  function friendSnapshot(friend, snapshots) {
    var candidates = friendRatingNickCandidates(friend);
    for (var i = 0; i < candidates.length; i += 1) {
      var snapshot = snapshots && snapshots[matchKey(candidates[i])];
      if (snapshot) return snapshot;
    }
    return null;
  }

  function eventTime(value) {
    var time = new Date(value || 0).getTime();
    return Number.isFinite(time) ? time : 0;
  }

  function formatRub(value) {
    return Math.max(0, Math.round(Number(value) || 0)).toLocaleString("ru-RU") + " ₽";
  }

  function eventTextHtml(value) {
    var text = String(value == null ? "" : value);
    var pattern = /\d(?:[\d\s\u00a0\u202f]*\d)?\s*₽/g;
    var html = "";
    var cursor = 0;
    var match;
    while ((match = pattern.exec(text))) {
      html += esc(text.slice(cursor, match.index));
      html += '<span class="home-friend-news__amount">' + esc(match[0]) + "</span>";
      cursor = match.index + match[0].length;
    }
    return html + esc(text.slice(cursor));
  }

  function isRecentEvent(value) {
    var time = eventTime(value);
    return !!time && time <= Date.now() + 86400000 && Date.now() - time <= RECENT_EVENT_MS;
  }

  function isPreviousCalendarDay(value) {
    var date = new Date(value || 0);
    if (!Number.isFinite(date.getTime())) return false;
    var now = new Date();
    var previous = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    return eventDayKey(date) === eventDayKey(previous);
  }

  function clubTournamentDayKey() {
    var data = window.POKER_CLUB_NEWS_DATA || {};
    var match = String(data.latestDate || "").match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
    return match ? match[3] + "-" + match[2] + "-" + match[1] : "";
  }

  function clubTodayDayKey() {
    return eventDayKey(new Date());
  }

  function isDailyClubEvent(row) {
    return String(row && row.id || "").indexOf("daily:") === 0;
  }

  function isCurrentClubEvent(row) {
    if (!row || !row.at) return false;
    var tournamentDay = clubTournamentDayKey();
    if (row.type === "birthday" && eventDayKey(row.at) === clubTodayDayKey()) return true;
    if (isDailyClubEvent(row)) {
      return tournamentDay ? eventDayKey(row.at) === tournamentDay : isPreviousCalendarDay(row.at);
    }
    return tournamentDay ? eventDayKey(row.at) === tournamentDay : isRecentEvent(row.at);
  }

  function compareClubEvents(a, b) {
    var timeOrder = eventTime(b && b.at) - eventTime(a && a.at);
    var amountOrder = Math.max(0, Number(b && b.prizeAmount) || 0) - Math.max(0, Number(a && a.prizeAmount) || 0);
    return timeOrder || amountOrder;
  }

  function distributeDailyClubEvents(rows) {
    var sorted = (Array.isArray(rows) ? rows : []).slice().sort(compareClubEvents).filter(function (row, index, list) {
      return row && list.findIndex(function (candidate) { return candidate && candidate.id === row.id; }) === index;
    });
    var regular = sorted.filter(function (row) { return !isDailyClubEvent(row); });
    var daily = sorted.filter(isDailyClubEvent);
    if (!daily.length) return regular;
    // A spin result must never lead the feed or sit next to another spin result.
    // Until there is a regular club event to separate it, keep it out of the feed.
    if (!regular.length) return [];
    daily = daily.slice(0, regular.length);
    var spread = [];
    var regularIndex = 0;
    daily.forEach(function (row, index) {
      var target = Math.max(
        regularIndex + 1,
        Math.round(((index + 1) * regular.length) / (daily.length + 1))
      );
      while (regularIndex < target && regularIndex < regular.length) {
        spread.push(regular[regularIndex]);
        regularIndex += 1;
      }
      spread.push(row);
    });
    while (regularIndex < regular.length) {
      spread.push(regular[regularIndex]);
      regularIndex += 1;
    }
    return spread;
  }

  function eventDateLabel(value, includeYear) {
    var time = new Date(value || 0).getTime();
    if (!time) return "";
    var eventDate = new Date(time);
    var nowDate = new Date();
    return eventDate.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: includeYear || eventDate.getFullYear() !== nowDate.getFullYear() ? "numeric" : undefined,
    });
  }

  function eventDayKey(value) {
    var date = new Date(value || 0);
    if (!Number.isFinite(date.getTime())) return "unknown";
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
  }

  function clubDayHero(value) {
    var date = new Date(value || 0);
    if (!Number.isFinite(date.getTime())) return null;
    var label = String(date.getDate()).padStart(2, "0") + "." +
      String(date.getMonth() + 1).padStart(2, "0") + "." + date.getFullYear();
    var data = window.POKER_CLUB_NEWS_DATA || {};
    return data.dayHeroes && data.dayHeroes[label] || null;
  }

  function eventActorKey(row) {
    var actor = matchKey(row && row.actorNick);
    if (actor) return actor;
    return String(row && row.actorId || "").trim().toLowerCase();
  }

  function playerNewsDisplayTitle(nick) {
    var value = String(nick || "").trim();
    return matchKey(value) === matchKey("Рыбнадзор") ? value + " (Мужначас)" : value;
  }

  function ensureStructuredPlayerEvent(row) {
    if (!row || !row.actorNick) return row;
    if (!row.newsTitle || matchKey(row.newsTitle) === matchKey(row.actorNick)) {
      row.newsTitle = playerNewsDisplayTitle(row.actorNick);
    }
    if (!Array.isArray(row.newsLines) || !row.newsLines.length) {
      var text = String(row.text || "").trim();
      var title = String(row.newsTitle || "").trim();
      var actorTitle = String(row.actorNick || "").trim();
      if (actorTitle && matchKey(text.slice(0, actorTitle.length)) === matchKey(actorTitle)) text = text.slice(actorTitle.length).trim();
      else if (title && matchKey(text.slice(0, title.length)) === matchKey(title)) text = text.slice(title.length).trim();
      row.newsLines = text.split(/\.\s+(?:И\s+)?/).map(function (line) {
        return line.replace(/[.\s]+$/, "").trim();
      }).filter(Boolean);
    }
    var seenLines = {};
    row.newsLines = row.newsLines.filter(function (line) {
      var key = matchKey(String(line || "").replace(/[.\s]+$/, ""));
      if (!key || seenLines[key]) return false;
      seenLines[key] = true;
      return true;
    });
    return row;
  }

  function mergeRelatedPlayerEvents(rows) {
    var source = (Array.isArray(rows) ? rows : []).filter(Boolean);
    var consumed = {};
    source.forEach(function (row) {
      if (row && (row._eventKind === "tournament" || String(row.id || "").indexOf("history:tournament:") === 0)) {
        ensureStructuredPlayerEvent(row);
      }
    });
    source.forEach(function (extra, extraIndex) {
      if (extra._eventKind !== "rating-change" && String(extra.id || "").indexOf("rating-change:") !== 0 && extra.type !== "level") return;
      var actorKey = eventActorKey(extra);
      var dayKey = eventDayKey(extra.at);
      if (!actorKey || dayKey === "unknown") return;
      var tournament = source.map(function (row, index) { return { row: row, index: index }; }).filter(function (item) {
        return item.row && (item.row._eventKind === "tournament" || String(item.row.id || "").indexOf("history:tournament:") === 0) &&
          eventActorKey(item.row) === actorKey && eventDayKey(item.row.at) === dayKey;
      }).sort(function (a, b) {
        return (Number(b.row.prizeAmount) || 0) - (Number(a.row.prizeAmount) || 0);
      })[0];
      if (!tournament) return;
      ensureStructuredPlayerEvent(tournament.row);
      var prefix = String(extra.actorNick || "").trim();
      var detail = String(extra.text || "").trim();
      if (prefix && matchKey(detail.slice(0, prefix.length)) === matchKey(prefix)) {
        detail = detail.slice(prefix.length).trim();
      }
      if (!detail) return;
      detail = detail.charAt(0).toUpperCase() + detail.slice(1);
      detail = detail.replace(/[.\s]+$/, "");
      var detailKey = matchKey(detail);
      var alreadyIncluded = tournament.row.newsLines.some(function (line) {
        return matchKey(String(line || "").replace(/[.\s]+$/, "")) === detailKey;
      });
      if (!alreadyIncluded) tournament.row.newsLines.push(detail);
      tournament.row.text = tournament.row.newsTitle + " " + tournament.row.newsLines.join(". ") + ".";
      // Feedback is keyed by the tournament event id. Keep it stable when
      // rating or level details are merged into the visible card.
      var legacyFeedbackId = String(tournament.row._feedbackLegacyTail || tournament.row.id || "") +
        ":with:" + String(extra.id || extraIndex);
      tournament.row._feedbackLegacyTail = legacyFeedbackId;
      tournament.row._feedbackLegacyIds = (tournament.row._feedbackLegacyIds || []).concat(legacyFeedbackId);
      consumed[extraIndex] = true;
    });
    return source.filter(function (row, index) { return !consumed[index]; });
  }

  function relativeTime(value) {
    var time = new Date(value || 0).getTime();
    if (!time) return "";
    var delta = Math.max(0, Date.now() - time);
    if (delta < 3600000) return Math.max(1, Math.floor(delta / 60000)) + " мин назад";
    if (delta < 86400000) return Math.floor(delta / 3600000) + " ч назад";
    if (delta < 172800000) return "вчера";
    return eventDateLabel(value, false);
  }

  function collectLevelEvents(friends) {
    var previous = readJson(LEVELS_KEY, {});
    var savedEvents = readJson(LEVEL_EVENTS_KEY, []);
    var next = {};
    (friends || []).forEach(function (friend) {
      var id = friendId(friend);
      var level = Math.max(0, Number(friend && (friend.statusLevel || friend.level)) || 0);
      if (!id || !level) return;
      next[id] = level;
      var oldLevel = Math.max(0, Number(previous[id]) || 0);
      if (oldLevel && level !== oldLevel) {
        var rose = level > oldLevel;
        savedEvents.unshift({
          id: "level:" + id + ":" + oldLevel + ":" + level,
          type: "level",
          icon: rose ? "▲" : "▼",
          text: rose
            ? friendName(friend) + " повысил уровень с " + oldLevel + " до " + level
            : friendName(friend) + " понизил уровень с " + oldLevel + " до " + level,
          at: new Date().toISOString(),
          actorId: id,
          actorNick: friendName(friend),
          actorAvatar: friendAvatar(friend),
        });
      }
    });
    writeJson(LEVELS_KEY, next);
    savedEvents = savedEvents.filter(function (row, index, rows) {
      return row && isRecentEvent(row.at) && rows.findIndex(function (candidate) { return candidate.id === row.id; }) === index;
    }).slice(0, MAX_EVENTS);
    writeJson(LEVEL_EVENTS_KEY, savedEvents);
    return savedEvents;
  }

  function collectClubLevelEvents(players) {
    var previous = readJson(CLUB_LEVELS_KEY, {});
    var savedEvents = readJson(CLUB_LEVEL_EVENTS_KEY, []);
    var next = {};
    var tournamentDay = clubTournamentDayKey();
    var changedAt = tournamentDay ? tournamentDay + "T23:55:00" : new Date().toISOString();
    (players || []).forEach(function (player) {
      var id = friendId(player);
      var level = Math.max(0, Number(player && (player.statusLevel || player.level)) || 0);
      if (!id || !level) return;
      next[id] = level;
      var oldLevel = Math.max(0, Number(previous[id]) || 0);
      if (!oldLevel || oldLevel === level) return;
      var rose = level > oldLevel;
      savedEvents.unshift({
        id: "club-level:" + id + ":" + oldLevel + ":" + level + ":" + eventDayKey(changedAt),
        type: "level",
        icon: rose ? "▲" : "▼",
        text: rose
          ? friendName(player) + " повысил уровень с " + oldLevel + " до " + level
          : friendName(player) + " понизил уровень с " + oldLevel + " до " + level,
        at: changedAt,
        actorId: id,
        actorNick: friendName(player),
        actorAvatar: friendAvatar(player),
      });
    });
    writeJson(CLUB_LEVELS_KEY, next);
    savedEvents = savedEvents.filter(function (row, index, rows) {
      return row && isCurrentClubEvent(row) && rows.findIndex(function (candidate) {
        return candidate && candidate.id === row.id;
      }) === index;
    }).slice(0, MAX_EVENTS);
    writeJson(CLUB_LEVEL_EVENTS_KEY, savedEvents);
    return savedEvents;
  }

  function collectNewFriendEvents(friends) {
    var next = {};
    var exactEvents = (friends || []).map(function (friend) {
      var id = friendId(friend);
      var friendSince = String(friend && friend.friendSince || "").trim();
      if (!id) return null;
      next[id] = true;
      if (!friendSince || !isRecentEvent(friendSince)) return null;
      return {
        id: "friend:" + id + ":" + friendSince,
        type: "friend",
        icon: "♣",
        text: "Вы теперь друзья с " + friendPokerIdentity(friend),
        at: friendSince,
      };
    }).filter(Boolean);
    writeJson(FRIEND_IDS_KEY, next);
    return exactEvents;
  }

  function saveGeneratedEvents(rows) {
    var saved = (Array.isArray(rows) ? rows : []).filter(function (row, index, list) {
      return row && isRecentEvent(row.at) && list.findIndex(function (candidate) { return candidate.id === row.id; }) === index;
    }).slice(0, MAX_EVENTS);
    writeJson(GENERATED_EVENTS_KEY, saved);
    return saved;
  }

  function collectRatingRiseEvents(friends, snapshots, snapshotKey, eventsKey) {
    var previous = readJson(snapshotKey, {});
    var next = {};
    var created = [];
    var recentRows = Array.isArray(snapshots && snapshots.__recentEvents) ? snapshots.__recentEvents : [];
    (friends || []).forEach(function (friend) {
      var id = friendId(friend);
      var current = friendSnapshot(friend, snapshots);
      if (!id || !current) return;
      next[id] = current;
      var before = previous[id];
      if (!before) return;
      var actorNicks = friendRatingNickCandidates(friend);
      var actorNick = actorNicks[0] || friendName(friend);
      var actorKeys = [];
      actorNicks.forEach(function (nick) {
        nicknameMatchKeys(nick).forEach(function (key) {
          if (actorKeys.indexOf(key) === -1) actorKeys.push(key);
        });
      });
      var latestAt = recentRows.filter(function (row) {
        return nicknameMatchKeys(row && (row.nick || row.nickKey)).some(function (key) {
          return actorKeys.indexOf(key) !== -1;
        });
      }).reduce(function (latest, row) {
        return eventTime(row && row.date) > eventTime(latest) ? row.date : latest;
      }, "") || new Date().toISOString();
      [1, 2].forEach(function (league) {
        var field = league === 1 ? "league1Place" : "league2Place";
        var oldPlace = Math.max(0, Number(before[field]) || 0);
        var newPlace = Math.max(0, Number(current[field]) || 0);
        var wasTop10 = oldPlace > 0 && oldPlace <= 10;
        var isTop10 = newPlace > 0 && newPlace <= 10;
        var changeText = "";
        var changeIcon = "▲";
        if (!oldPlace && isTop10) {
          changeText = actorNick + " вошёл в топ-10 рейтинга Лиги " + league + " на " + newPlace + "-е место";
        } else if (wasTop10 && !newPlace) {
          changeText = actorNick + " покинул топ-10 рейтинга Лиги " + league;
          changeIcon = "▼";
        } else if (!wasTop10 && isTop10) {
          changeText = actorNick + " вошёл в топ-10 рейтинга Лиги " + league +
            " — поднялся с " + oldPlace + "-го на " + newPlace + "-е место";
        } else if (wasTop10 && !isTop10) {
          changeText = actorNick + " покинул топ-10 рейтинга Лиги " + league +
            " — спустился с " + oldPlace + "-го на " + newPlace + "-е место";
          changeIcon = "▼";
        } else if (wasTop10 && isTop10 && newPlace < oldPlace) {
          changeText = actorNick + " поднялся в топ-10 рейтинга Лиги " + league +
            " с " + oldPlace + "-го на " + newPlace + "-е место";
        } else if (wasTop10 && isTop10 && newPlace > oldPlace) {
          changeText = actorNick + " спустился в топ-10 рейтинга Лиги " + league +
            " с " + oldPlace + "-го на " + newPlace + "-е место";
          changeIcon = "▼";
        } else if (oldPlace && newPlace && newPlace < oldPlace) {
          changeText = actorNick + " поднялся в рейтинге Лиги " + league +
            " с " + oldPlace + "-го на " + newPlace + "-е место";
        } else if (oldPlace && newPlace && newPlace > oldPlace) {
          changeText = actorNick + " спустился в рейтинге Лиги " + league +
            " с " + oldPlace + "-го на " + newPlace + "-е место";
          changeIcon = "▼";
        }
        if (!changeText) return;
        created.push({
          id: "rating-change:" + id + ":league" + league + ":" + oldPlace + ":" + newPlace,
          type: "rating",
          icon: changeIcon,
          text: changeText,
          at: latestAt,
          target: "winter-rating",
          actorId: id,
          actorNick: actorNick,
          _ratingLeague: league,
          _ratingOldPlace: oldPlace,
          _ratingNewPlace: newPlace,
          _ratingDirection: newPlace && (!oldPlace || newPlace < oldPlace) ? "up" : "down",
          _eventKind: "rating-change",
        });
      });
    });
    created.filter(function (row) {
      return row._ratingDirection === "up" && row._ratingNewPlace > 0;
    }).forEach(function (rise) {
      var displaced = created.filter(function (row) {
        if (row._ratingDirection !== "down" || row._ratingPaired) return false;
        if (row._ratingLeague !== rise._ratingLeague || !row._ratingOldPlace) return false;
        if (!rise._ratingOldPlace) {
          return row._ratingOldPlace <= 10 && (!row._ratingNewPlace || row._ratingNewPlace > 10);
        }
        return row._ratingOldPlace >= rise._ratingNewPlace &&
          (!row._ratingNewPlace || row._ratingNewPlace <= rise._ratingOldPlace);
      }).sort(function (a, b) {
        var aExact = a._ratingOldPlace === rise._ratingNewPlace ? 0 : 1;
        var bExact = b._ratingOldPlace === rise._ratingNewPlace ? 0 : 1;
        return aExact - bExact || a._ratingOldPlace - b._ratingOldPlace;
      })[0];
      if (!displaced) return;
      rise.text += ", сместив " + displaced.actorNick + " на " +
        (displaced._ratingNewPlace ? displaced._ratingNewPlace + "-е место" : "позицию ниже топ-10");
      rise.affectedActorNicks = [rise.actorNick, displaced.actorNick].filter(Boolean);
      rise.id += ":displaced:" + displaced.actorId + ":" + displaced._ratingOldPlace + ":" + displaced._ratingNewPlace;
      displaced._ratingPaired = true;
    });
    created = created.filter(function (row) {
      if (row._ratingPaired) return false;
      delete row._ratingLeague;
      delete row._ratingOldPlace;
      delete row._ratingNewPlace;
      delete row._ratingDirection;
      delete row._ratingPaired;
      return true;
    });
    writeJson(snapshotKey, next);
    var previousEvents = readJson(eventsKey, []).map(function (row) {
      if (row && String(row.id || "").indexOf(":displaced:") !== -1) {
        row.text = String(row.text || "").replace(
          /;\s+(.+?)\s+спустился на\s+(.+)$/,
          ", сместив $1 на $2"
        );
      }
      return row;
    });
    var saved = created.concat(previousEvents).filter(function (row, index, rows) {
      return row && isRecentEvent(row.at) && rows.findIndex(function (candidate) { return candidate.id === row.id; }) === index;
    }).slice(0, MAX_EVENTS);
    writeJson(eventsKey, saved);
    return saved;
  }

  function clubTop10RatingEventsForFriends(friends) {
    var friendNickKeys = {};
    (friends || []).forEach(function (friend) {
      friendRatingNickCandidates(friend).forEach(function (nick) {
        nicknameMatchKeys(nick).forEach(function (key) {
          if (key) friendNickKeys[key] = true;
        });
      });
    });
    return (Array.isArray(clubEvents) ? clubEvents : []).filter(function (row) {
      if (!row || row.type !== "rating" || String(row.text || "").indexOf("топ-10") === -1) return false;
      var actorNicks = Array.isArray(row.affectedActorNicks) && row.affectedActorNicks.length
        ? row.affectedActorNicks
        : [row.actorNick];
      var directlyAffected = actorNicks.some(function (nick) {
        return nicknameMatchKeys(nick).some(function (key) { return !!friendNickKeys[key]; });
      });
      if (directlyAffected) return true;
      var textKey = matchKey(row.text);
      return Object.keys(friendNickKeys).some(function (key) {
        return key.length >= 3 && textKey.indexOf(key) !== -1;
      });
    });
  }

  function collectTournamentEvents(friends, snapshots) {
    var ratingRiseEvents = collectRatingRiseEvents(
      friends,
      snapshots,
      TOURNAMENT_SNAPSHOTS_KEY,
      RATING_RISE_EVENTS_KEY
    );
    return saveGeneratedEvents(ratingRiseEvents.concat(readJson(GENERATED_EVENTS_KEY, []).filter(function (row) {
      return !isUndatedTournamentSnapshotEvent(row) &&
        String(row && row.id || "").indexOf("achievement:totalReward:") !== 0;
    })));
  }

  function recentTournamentEvents(friends, snapshots) {
    var byNick = {};
    (friends || []).forEach(function (friend) {
      friendRatingNickCandidates(friend).forEach(function (nick) {
        nicknameMatchKeys(nick).forEach(function (key) {
          if (key && !byNick[key]) byNick[key] = friend;
        });
      });
    });
    return (Array.isArray(snapshots && snapshots.__recentEvents) ? snapshots.__recentEvents : []).map(function (row) {
      var friend = nicknameMatchKeys(row && (row.nick || row.nickKey)).map(function (key) { return byNick[key]; }).find(Boolean);
      if (!friend) return null;
      var reward = Number(row && row.reward) || 0;
      var place = Number(row && row.place) || 0;
      var action = reward > 0 ? "выиграл " + formatRub(reward) : "";
      if (!action) return null;
      var detail = String(row && row.tournament || "").trim();
      var displayName = String(row && row.nick || "").trim() || friendName(friend);
      var displayTitle = playerNewsDisplayTitle(displayName);
      var stableActorKey = "rating:" + (matchKey(displayName) || matchKey(friendName(friend)));
      var achievementParts = [];
      if (place === 1) {
        var victoryCount = Math.max(1, Number(row && row.firstPlacesCount) || 1);
        var victoryWord = victoryCount % 10 === 1 && victoryCount % 100 !== 11
          ? "победа"
          : victoryCount % 10 >= 2 && victoryCount % 10 <= 4 && (victoryCount % 100 < 12 || victoryCount % 100 > 14)
            ? "победы"
            : "побед";
        achievementParts.push("продвинулся в ачивке «Король турниров»: " + victoryCount + " " + victoryWord);
      }
      if (reward >= 100000) {
        achievementParts.push("продвинулся в ачивке «Занос от 100к»: " +
          Math.max(1, Number(row && row.bigWins100Count) || 1));
      } else if (reward >= 50000) {
        achievementParts.push("продвинулся в ачивке «Занос от 50 до 100к»: " +
          Math.max(1, Number(row && row.bigWins50Count) || 1));
      }
      var newsLines = [(place > 0 ? "Занял " + place + "-е место" : "Получил приз") +
        (detail ? " в турнире " + detail : "") + (action ? " и " + action : "")];
      achievementParts.forEach(function (part) {
        newsLines.push(part.charAt(0).toUpperCase() + part.slice(1));
      });
      return {
        id: "history:tournament:" + stableActorKey + ":" + String(row.dateLabel || row.date) + ":" + place + ":" + reward + ":" + detail,
        type: place === 1 || reward >= 50000 ? "achievement" : "rating",
        icon: place === 1 ? "◆" : "▲",
        text: displayTitle + " " + newsLines.join(". ") + ".",
        newsTitle: displayTitle,
        newsLines: newsLines,
        prizeAmount: reward,
        tournamentName: detail,
        tournamentPlace: place,
        at: row.date,
        target: "winter-rating",
        actorId: friendId(friend),
        // Keep the snapshot nickname authoritative. The matched profile row
        // may be stale and must not silently change which player opens.
        actorNick: displayName,
        _eventKind: "tournament",
      };
    }).filter(Boolean).slice(0, MAX_EVENTS);
  }

  function tournamentSnapshotsReady(friends) {
    var seen = {};
    var nicks = [];
    (friends || []).forEach(function (friend) {
      friendRatingNickCandidates(friend).forEach(function (nick) {
        var key = matchKey(nick);
        if (!key || seen[key]) return;
        seen[key] = true;
        nicks.push(nick);
      });
    });
    if (!nicks.length) return Promise.resolve({});
    function read() {
      return typeof window.pokerGetFriendNewsTournamentSnapshotsReady === "function"
        ? window.pokerGetFriendNewsTournamentSnapshotsReady(nicks)
        : Promise.resolve({});
    }
    if (typeof window.pokerGetFriendNewsTournamentSnapshotsReady === "function") return read();
    if (typeof window.pokerEnsureScriptDomains === "function") {
      return Promise.resolve(window.pokerEnsureScriptDomains([
        "rating-common",
        "rating-winter",
        "rating-spring",
        "rating-summer",
      ])).then(read).catch(function () { return {}; });
    }
    return Promise.resolve({});
  }

  function clubTournamentSnapshotsReady() {
    function read() {
      return typeof window.pokerGetClubNewsTournamentSnapshotsReady === "function"
        ? window.pokerGetClubNewsTournamentSnapshotsReady()
        : Promise.resolve({});
    }
    if (typeof window.pokerGetClubNewsTournamentSnapshotsReady === "function") return read();
    if (typeof window.pokerEnsureScriptDomains === "function") {
      return Promise.resolve(window.pokerEnsureScriptDomains([
        "rating-common", "rating-winter", "rating-spring", "rating-summer",
      ])).then(read).catch(function () { return {}; });
    }
    return Promise.resolve({});
  }

  function applyRaffleSnapshots(friends, snapshots, raffles) {
    var candidates = (friends || []).map(function (friend) {
      return {
        friend: friend,
        nickKey: matchKey(friend && friend.pokerPlusNickname),
        keys: [
          friend && friend.userId,
          friend && friend.accountId,
          friend && friend.dtId,
          friend && friend.chatUserId,
          friend && friend.pokerPlusNickname,
          friend && friend.chatDisplayName,
          friend && friend.userName,
        ].map(matchKey).filter(Boolean),
      };
    });
    var monthly = {};
    candidates.forEach(function (candidate) {
      if (snapshots[candidate.nickKey]) {
        snapshots[candidate.nickKey].raffleWins = 0;
        snapshots[candidate.nickKey].luckyMonths = 0;
      }
    });
    (Array.isArray(raffles) ? raffles : []).forEach(function (raffle) {
      if (!raffle || raffle.status === "cancelled") return;
      var date = new Date(raffle.drawnAt || raffle.completedAt || raffle.endDate || raffle.createdAt || 0);
      var month = Number.isFinite(date.getTime()) ? date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") : "";
      (Array.isArray(raffle.winners) ? raffle.winners : []).forEach(function (winner) {
        var state = String(winner && winner.winnerReadyState || "").toLowerCase();
        if (!winner || winner.winnerReadyExpired === true || winner.winnerBurned === true || state === "missed" || state === "burned") return;
        var winnerKeys = [
          winner.userId, winner.accountId, winner.dtId, winner.memberId, winner.p21Id,
          winner.poker21Id, winner.pokerPlusId, winner.pokerPlusUserId,
          winner.pokerPlusNickname, winner.poker21Nickname, winner.ratingNick,
          winner.nickname, winner.nick, winner.name, winner.telegramUsername,
        ].map(matchKey).filter(Boolean);
        var candidate = candidates.find(function (item) {
          return item.keys.some(function (key) { return winnerKeys.indexOf(key) !== -1; });
        });
        var leaderKey = candidate ? "friend:" + friendId(candidate.friend) : "winner:" + (winnerKeys[0] || "");
        if (!leaderKey || leaderKey === "winner:") return;
        if (month) {
          if (!monthly[month]) monthly[month] = {};
          monthly[month][leaderKey] = (monthly[month][leaderKey] || 0) + 1;
        }
        if (candidate && snapshots[candidate.nickKey]) snapshots[candidate.nickKey].raffleWins += 1;
      });
    });
    Object.keys(monthly).forEach(function (month) {
      Object.keys(monthly[month]).map(function (key) {
        return { key: key, count: monthly[month][key] };
      }).sort(function (a, b) {
        return b.count - a.count || a.key.localeCompare(b.key);
      }).slice(0, 3).forEach(function (leader) {
        if (leader.key.indexOf("friend:") !== 0) return;
        var id = leader.key.slice(7);
        var candidate = candidates.find(function (item) { return friendId(item.friend) === id; });
        if (candidate && snapshots[candidate.nickKey]) snapshots[candidate.nickKey].luckyMonths += 1;
      });
    });
    return snapshots;
  }

  function winnerEvents(friends, winners) {
    var byId = {};
    var byName = {};
    (friends || []).forEach(function (friend) {
      var ids = [friend && friend.userId, friend && friend.accountId, friend && friend.dtId, friend && friend.chatUserId];
      ids.forEach(function (id) {
        id = String(id || "").trim();
        if (id) byId[id] = friend;
      });
      [friend && friend.pokerPlusNickname, friend && friend.chatDisplayName, friend && friend.userName].forEach(function (name) {
        var key = matchKey(name);
        if (key && !byName[key]) byName[key] = friend;
      });
    });
    return (winners || []).map(function (winner) {
      var friend = byId[String(winner && winner.id || "").trim()];
      if (!friend) {
        var winnerNames = [winner && winner.pokerPlusNickname, winner && winner.pokerPlusName, winner && winner.displayName];
        for (var ni = 0; ni < winnerNames.length && !friend; ni += 1) friend = byName[matchKey(winnerNames[ni])];
      }
      var premiumHandAt = String(winner && winner.lastPremiumHandAt || "").trim();
      if (!friend || !isRecentEvent(premiumHandAt)) return null;
      var prize = String(winner && winner.lastPremiumHandPrize || "").trim();
      var handRank = String(winner && winner.lastPremiumHandRank || "").trim();
      var handName = String(winner && winner.lastPremiumHandName || "Выигрышную комбинацию").trim();
      var prizeRub = Number(String(prize).replace(/[^\d.,-]/g, "").replace(/\s/g, "").replace(",", ".")) || 0;
      if (["full_house", "four_of_a_kind", "straight_flush", "royal_flush"].indexOf(handRank) === -1 || !prize || prizeRub <= 0) return null;
      return {
        id: "daily:" + String(winner.id || "") + ":premium-hand:" + handRank + ":" + premiumHandAt,
        type: "daily",
        icon: "★",
        text: friendName(friend) + " выиграл " + prize + " за комбинацию «" + handName + "» в Крутке дня",
        prizeAmount: prizeRub,
        at: premiumHandAt,
        target: "daily-poker",
      };
    }).filter(Boolean);
  }

  function birthdayEvents(friends) {
    var now = new Date();
    var todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return (friends || []).map(function (friend) {
      var raw = String(friend && friend.profileBirthDate || "").trim();
      var match = raw.match(/^\d{4}-(\d{2})-(\d{2})$/);
      if (!match) return null;
      var month = Number(match[1]) - 1;
      var day = Number(match[2]);
      var birthday = new Date(now.getFullYear(), month, day);
      if (birthday < todayStart) birthday.setFullYear(now.getFullYear() + 1);
      var days = Math.round((birthday.getTime() - todayStart.getTime()) / 86400000);
      if (days > 14) return null;
      var text = days === 0
        ? "Сегодня день рождения у " + friendName(friend)
        : "У " + friendName(friend) + " день рождения " +
          birthday.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
      return {
        id: "birthday:" + friendId(friend) + ":" + birthday.getFullYear(),
        type: "birthday",
        icon: "♥",
        text: text,
        at: days === 0 ? new Date().toISOString() : birthday.toISOString(),
        upcomingDays: days,
      };
    }).filter(Boolean);
  }

  function clubBirthdayEvents(players, dayKey) {
    var parts = String(dayKey || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!parts) return [];
    var year = Number(parts[1]);
    var monthDay = parts[2] + "-" + parts[3];
    var seen = {};
    return (players || []).map(function (player) {
      var birth = String(player && (player.profileBirthDate || player.birthDate) || "").trim();
      var match = birth.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (!match || match[2] + "-" + match[3] !== monthDay) return null;
      var age = year - Number(match[1]);
      var ageLastTwo = age % 100;
      var ageLast = age % 10;
      var ageWord = ageLastTwo >= 11 && ageLastTwo <= 14
        ? "лет"
        : ageLast === 1 ? "год" : ageLast >= 2 && ageLast <= 4 ? "года" : "лет";
      var birthdayLine = age > 0 && age <= 100
        ? "День рождения · Исполнилось " + age + " " + ageWord
        : "День рождения";
      var actorId = friendId(player);
      var name = friendName(player);
      var key = actorId || matchKey(name);
      if (!key || seen[key]) return null;
      seen[key] = true;
      return {
        id: "birthday:club:" + key + ":" + year,
        type: "birthday",
        icon: "♥",
        text: "У " + name + " день рождения",
        at: dayKey + "T12:00:00+07:00",
        actorId: actorId,
        actorNick: name,
        actorAvatar: friendAvatar(player),
        newsTitle: name,
        newsLines: [birthdayLine],
        _eventKind: "birthday",
      };
    }).filter(Boolean);
  }

  function achievementEvents(friends, sngRows, choiceRows) {
    var friendKeys = [];
    (friends || []).forEach(function (friend) {
      var keys = [
        friend && friend.userId,
        friend && friend.accountId,
        friend && friend.dtId,
        friend && friend.chatUserId,
        friend && friend.pokerPlusNickname,
        friend && friend.chatDisplayName,
        friend && friend.userName,
      ].map(matchKey).filter(Boolean);
      friendKeys.push({ friend: friend, keys: keys });
    });
    function matchingFriend(row) {
      var keys = [
        row && row.userId,
        row && row.accountId,
        row && row.dtId,
        row && row.p21Id,
        row && row.pokerPlusUserId,
        row && row.pokerPlusNickname,
        row && row.nick,
        row && row.name,
      ].map(matchKey).filter(Boolean);
      var match = friendKeys.find(function (candidate) {
        return candidate.keys.some(function (key) { return keys.indexOf(key) !== -1; });
      });
      return match && match.friend;
    }
    var out = [];
    (sngRows || []).forEach(function (season) {
      var completedAt = String((season && (season.completedAt || season.updatedAt)) || "").trim();
      if (!isRecentEvent(completedAt)) return;
      (Array.isArray(season && season.winners) ? season.winners : []).forEach(function (winner) {
        var friend = matchingFriend(winner);
        var place = Math.max(0, Number(winner && winner.place) || 0);
        if (!friend || !place || place > 3) return;
        var title = place === 1 ? "Чемпион СНГ" : place + " место в СНГ";
        if (season.season) title += " · " + season.season;
        out.push({
          id: "achievement:sng:" + friendId(friend) + ":" + String(season.id || season.season || season.completedAt || title),
          type: "achievement",
          icon: "◆",
          text: friendName(friend) + " получил новую ачивку: " + title,
          at: completedAt,
        });
      });
    });
    (choiceRows || []).forEach(function (period) {
      var month = String(period && (period.month || period.monthKey || period.period) || "").trim();
      var completedAt = String(period && (period.completedAt || period.updatedAt) || "").trim();
      var eventAt = completedAt || (month ? month + "-01T00:00:00.000Z" : "");
      if (!isRecentEvent(eventAt)) return;
      var winners = Array.isArray(period && period.winners) ? period.winners
        : Array.isArray(period && period.top) ? period.top
          : Array.isArray(period && period.players) ? period.players : [];
      winners.forEach(function (winner) {
        var friend = matchingFriend(winner);
        var place = Math.max(0, Number(winner && winner.place) || 0);
        if (!friend || place !== 1) return;
        out.push({
          id: "achievement:choice:" + friendId(friend) + ":" + String(month || period.id || winner.description || "top"),
          type: "achievement",
          icon: "◆",
          text: friendName(friend) + " получил новую ачивку: выбор клуба",
          at: eventAt,
        });
      });
    });
    return out;
  }

  function personalPostEvents(friends, posts) {
    var byId = {};
    (friends || []).forEach(function (friend) {
      [friendId(friend), friend && friend.accountId, friend && friend.dtId].forEach(function (id) {
        id = String(id || "").trim();
        if (id) byId[id] = friend;
      });
    });
    return (Array.isArray(posts) ? posts : []).map(function (post) {
      var accountId = String(post && post.accountId || "").trim();
      var friend = byId[accountId];
      if (!friend && post && post.isMine) {
        friend = {
          accountId: accountId,
          userId: accountId,
          pokerPlusNickname: typeof profilePublicCardDisplayName === "function" ? profilePublicCardDisplayName() : "Вы",
          avatarUrl: typeof profilePublicCardAvatarUrl === "function" ? profilePublicCardAvatarUrl() : "",
        };
      }
      var text = String(post && post.text || "").trim();
      var image = String(post && post.image || "").trim();
      if (!friend || (!text && !image) || !isRecentEvent(post.createdAt)) return null;
      return {
        id: "wall:" + accountId + ":" + String(post.id || ""),
        type: "personal",
        icon: "✎",
        text: friendName(friend) + (text ? " написал: " + text : " опубликовал фото"),
        image: image,
        at: post.createdAt,
        actorId: friendId(friend) || accountId,
        actorNick: friendName(friend),
        actorAvatar: friendAvatar(friend),
        newsTitle: friendName(friend),
        newsLines: [text || "Опубликовал фото"],
        _eventKind: "wall",
      };
    }).filter(Boolean);
  }

  function eventIconSvg(type) {
    var icons = {
      friend: '<svg viewBox="0 0 24 24"><path d="M8.2 11.2a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2Z"/><path d="M2.6 19.5v-1.1c0-2.8 2.5-5 5.6-5 1.2 0 2.3.3 3.2.9"/><path d="M16.7 10.1v7.2M13.1 13.7h7.2"/></svg>',
      level: '<svg viewBox="0 0 24 24"><path d="m12 3 4.3 4.3-2.2 2.2L12 7.4 9.9 9.5 7.7 7.3 12 3Z"/><path d="m12 9.3 4.3 4.3-2.2 2.2-2.1-2.1-2.1 2.1-2.2-2.2L12 9.3Z"/><path d="M5 20h14"/></svg>',
      rating: '<svg viewBox="0 0 24 24"><path d="M5 18V13M12 18V9M19 18V5"/><path d="m4 8 5-4 4 3 6-5"/><path d="M16 2h3v3"/></svg>',
      achievement: '<svg viewBox="0 0 24 24"><path d="M8 3h8v5a4 4 0 0 1-8 0V3Z"/><path d="M8 5H4v2a4 4 0 0 0 4 4M16 5h4v2a4 4 0 0 1-4 4M12 12v5M8 21h8M9 17h6"/></svg>',
      daily: '<svg viewBox="0 0 24 24"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/><circle cx="12" cy="12" r="4.3"/><path d="m12 9.3.8 1.7 1.9.2-1.4 1.3.4 1.9-1.7-.9-1.7.9.4-1.9-1.4-1.3 1.9-.2.8-1.7Z"/></svg>',
      birthday: '<svg viewBox="0 0 24 24"><path d="M4 12h16v8H4v-8ZM3 9h18v4H3V9Z"/><path d="M12 9v11M12 9H8.5a2.5 2.5 0 1 1 2.5-2.5L12 9Zm0 0h3.5A2.5 2.5 0 1 0 13 6.5L12 9Z"/></svg>',
      personal: '<svg viewBox="0 0 24 24"><path d="M5 4h14v13H9l-4 3V4Z"/><path d="M8 8h8M8 12h6"/></svg>',
      empty: '<svg viewBox="0 0 24 24"><path d="M8.5 19h7M10 15h4M12 3a6 6 0 0 1 3.8 10.6c-.9.7-1.3 1.2-1.3 2.4h-5c0-1.2-.4-1.7-1.3-2.4A6 6 0 0 1 12 3Z"/></svg>',
    };
    return icons[type] || icons.achievement;
  }

  function feedbackRequest(payload) {
    payload = Object.assign({}, payload || {}, {
      scope: newsModalMode === "club" ? "club" : "friends",
    });
    var body = typeof pokerApiAuthJsonBody === "function" ? pokerApiAuthJsonBody(payload) : payload;
    return fetch(apiBase() + "/api/profile-event-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then(function (response) {
      return response.json().then(function (data) {
        if (!response.ok || !data || !data.ok) throw new Error(data && data.error || "Ошибка");
        return data;
      });
    });
  }

  function optimisticFeedbackReaction(eventId, emoji, commentId) {
    var current = eventFeedback[eventId] || {};
    var snapshot = JSON.parse(JSON.stringify(current));
    var target = current;
    if (commentId) {
      target = (Array.isArray(current.comments) ? current.comments : []).find(function (row) {
        return String(row.id) === String(commentId);
      });
    }
    if (!target) return snapshot;
    target.reactions = target.reactions || {};
    var previous = String(target.myReaction || "");
    if (previous) target.reactions[previous] = Math.max(0, (Number(target.reactions[previous]) || 0) - 1);
    target.myReaction = previous === emoji ? "" : emoji;
    if (target.myReaction) target.reactions[emoji] = (Number(target.reactions[emoji]) || 0) + 1;
    eventFeedback[eventId] = current;
    renderModalList(activeModalEvents());
    return snapshot;
  }

  function sendOptimisticReaction(eventId, emoji, commentId) {
    var snapshot = optimisticFeedbackReaction(eventId, emoji, commentId);
    return feedbackRequest({ action: commentId ? "comment-reaction" : "reaction", eventId: eventId, commentId: commentId || "", emoji: emoji })
      .then(function (data) {
        eventFeedback[eventId] = data.feedback || {};
        renderModalList(activeModalEvents());
      }).catch(function (error) {
        eventFeedback[eventId] = snapshot || {};
        renderModalList(activeModalEvents());
        if (typeof alertText === "function") alertText(error.message || "Не удалось поставить реакцию");
      });
  }

  function showReactionUsers(feedback, emoji) {
    var rows = (Array.isArray(feedback && feedback.reactors) ? feedback.reactors : []).filter(function (row) {
      return row && row.emoji === emoji;
    });
    var old = document.querySelector(".profile-reaction-users");
    if (old) old.remove();
    var overlay = document.createElement("div");
    overlay.className = "profile-reaction-users";
    overlay.innerHTML = '<div class="profile-reaction-users__dialog" role="dialog" aria-modal="true" aria-label="Кто поставил реакцию">' +
      '<button type="button" class="profile-reaction-users__close" aria-label="Закрыть">×</button>' +
      '<h3>' + esc(emoji) + ' Кто поставил реакцию</h3><div class="profile-reaction-users__list">' +
      (rows.length ? rows.map(function (row) {
        var name = String(row.name || "Игрок");
        return '<button type="button" class="profile-reaction-users__person" data-reaction-profile-id="' + esc(row.profileId || "") +
          '" data-reaction-profile-name="' + esc(name) + '" data-reaction-profile-avatar="' + esc(row.avatar || "") + '">' +
          (row.avatar ? '<img src="' + esc(row.avatar) + '" alt="">' : '<span>' + esc(name.charAt(0).toUpperCase()) + "</span>") +
          "<strong>" + esc(name) + "</strong></button>";
      }).join("") : '<p class="profile-reaction-users__empty">Пока никого</p>') +
      "</div></div>";
    document.body.appendChild(overlay);
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay || event.target.closest(".profile-reaction-users__close")) {
        overlay.remove();
        return;
      }
      var person = event.target.closest("[data-reaction-profile-id]");
      if (!person) return;
      var profileId = person.getAttribute("data-reaction-profile-id");
      overlay.remove();
      if (profileId) handoffNewsModalToPlayer(profileId, person.getAttribute("data-reaction-profile-name") || "Игрок", person.getAttribute("data-reaction-profile-avatar") || "");
    });
  }
  window.pokerShowProfileReactionUsers = showReactionUsers;

  function openReactionPicker(onSelect) {
    var old = document.querySelector(".profile-reaction-picker");
    if (old) old.remove();
    var picker = document.createElement("div");
    picker.className = "profile-reaction-picker";
    picker.innerHTML = '<div class="profile-reaction-picker__panel" role="dialog" aria-label="Выберите реакцию">' +
      HOME_NEWS_REACTIONS.map(function (emoji) {
        return '<button type="button" data-picker-reaction="' + esc(emoji) + '">' + esc(emoji) + "</button>";
      }).join("") + "</div>";
    document.body.appendChild(picker);
    picker.addEventListener("click", function (event) {
      var button = event.target.closest("[data-picker-reaction]");
      if (button) {
        var emoji = button.getAttribute("data-picker-reaction");
        picker.remove();
        onSelect(emoji);
      } else if (event.target === picker) {
        picker.remove();
      }
    });
  }
  window.pokerOpenProfileReactionPicker = openReactionPicker;

  function eventFeedbackHtml(row, profileCueHtml) {
    var rowId = feedbackEventId(row);
    var feedback = eventFeedback[rowId] || {};
    var reactions = feedback.reactions || {};
    var reactionButtons = HOME_NEWS_REACTIONS.map(function (emoji) {
      var count = Math.max(0, Number(reactions[emoji]) || 0);
      if (!count) return "";
      return '<button type="button" class="chat-user-modal__news-reaction' +
        (feedback.myReaction === emoji ? " chat-user-modal__news-reaction--mine" : "") +
        '" data-home-news-reaction="' + esc(emoji) + '">' + esc(emoji) +
        (count ? '<span data-home-news-reaction-users="' + esc(emoji) + '" title="Кто поставил">' + count + "</span>" : "") + "</button>";
    }).join("");
    var comments = Array.isArray(feedback.comments) ? feedback.comments.slice().sort(function (a, b) {
      return String(a && a.at || "").localeCompare(String(b && b.at || ""));
    }) : [];
    var activeReply = eventCommentReplies[rowId] || null;
    var draft = String(eventCommentDrafts[rowId] || "");
    var commentsHtml = comments.length ? comments.map(function (comment) {
      var name = String(comment.author || "Игрок");
      var avatar = String(comment.authorAvatar || "");
      var profileId = String(comment.authorProfileId || comment.memberId || "");
      var commentReactions = comment.reactions || {};
      var commentReactionHtml = HOME_NEWS_REACTIONS.map(function (emoji) {
        var count = Math.max(0, Number(commentReactions[emoji]) || 0);
        if (!count) return "";
        return '<button type="button" class="chat-user-modal__comment-reaction' +
          (comment.myReaction === emoji ? " chat-user-modal__comment-reaction--mine" : "") +
          '" data-home-comment-reaction="' + esc(emoji) + '" data-comment-id="' + esc(comment.id || "") + '">' +
          esc(emoji) + (count ? '<span data-home-comment-reaction-users="' + esc(emoji) + '">' + count + "</span>" : "") + "</button>";
      }).join("");
      var replyQuote = comment.replyTo
        ? '<blockquote class="home-news-comment-quote"><strong>' + esc(comment.replyTo.fromName || "Игрок") +
          '</strong><span>' + esc(String(comment.replyTo.text || "").slice(0, 160)) + "</span></blockquote>"
        : "";
      return '<div class="chat-user-modal__news-comment' + (comment.pending ? " chat-user-modal__news-comment--pending" : "") +
        '" data-home-comment-id="' + esc(comment.id || "") + '">' +
        '<button type="button" class="chat-user-modal__news-comment-author" data-home-news-comment-author' +
          ' data-user-id="' + esc(profileId) + '" data-user-name="' + esc(name) +
          '" data-user-avatar="' + esc(avatar) + '">' +
          (avatar ? '<img src="' + esc(avatar) + '" alt="">' :
            '<span aria-hidden="true">' + esc((name || "И").charAt(0).toUpperCase()) + "</span>") +
          "<strong>" + esc(name) + "</strong></button>" +
        (comment.isMine && !comment.pending ? '<button type="button" class="chat-user-modal__news-comment-delete" data-home-comment-delete="' +
          esc(comment.id || "") + '" aria-label="Удалить комментарий" title="Удалить комментарий">×</button>' : "") +
        replyQuote + "<p>" + esc(comment.text || "") +
        (comment.pending ? '<small class="home-news-comment-pending-label">Отправка…</small>' : "") +
        '<span class="chat-user-modal__comment-reactions">' + commentReactionHtml +
          (comment.pending ? "" :
          '<button type="button" class="home-news-comment-reply-btn" data-home-comment-reply="' + esc(comment.id || "") +
          '" aria-label="Ответить на комментарий">↩ Ответить</button>') +
        "</span></div>";
    }).join("") : '<p class="chat-user-modal__news-comments-empty">Комментариев пока нет</p>';
    var replyPreview = activeReply
      ? '<span class="home-news-reply-preview"><span><strong>Ответ на ' + esc(activeReply.fromName || "Игрок") +
        '</strong><small>' + esc(String(activeReply.text || "").slice(0, 100)) +
        '</small></span><button type="button" data-home-comment-reply-cancel aria-label="Отменить ответ">×</button></span>'
      : "";
    var emojiPicker = '<span class="home-news-emoji-picker" hidden>' + HOME_COMMENT_EMOJIS.map(function (emoji) {
      return '<button type="button" data-home-comment-emoji="' + esc(emoji) + '" aria-label="Вставить ' + esc(emoji) + '">' + esc(emoji) + "</button>";
    }).join("") + "</span>";
    return '<span class="home-friend-news-modal__action-row"><span class="chat-user-modal__news-actions">' +
        reactionButtons +
        '<button type="button" class="chat-user-modal__news-comment-toggle' +
          (eventCommentsOpen[rowId] ? " chat-user-modal__news-comment-toggle--active" : "") +
          '" data-home-news-comments aria-label="Открыть комментарии">💬 <b>Комментировать</b>' +
          (feedback.commentCount ? "<span>" + Number(feedback.commentCount) + "</span>" : "") +
        "</button></span>" +
        '<span class="home-friend-news-modal__action-meta">' + (profileCueHtml || "") + "</span></span>" +
      '<span class="chat-user-modal__news-comments"' + (eventCommentsOpen[rowId] ? "" : " hidden") + ">" +
        '<span class="chat-user-modal__news-comments-list">' + commentsHtml + "</span>" +
        '<form class="chat-user-modal__news-comment-form" data-home-news-comment-form>' +
          replyPreview +
          '<span class="home-news-comment-input-wrap"><button type="button" class="home-news-comment-emoji-btn" data-home-comment-emoji-toggle aria-label="Выбрать смайл">☺</button>' +
          '<input type="text" maxlength="500" value="' + esc(draft) + '" placeholder="Написать комментарий…" aria-label="Комментарий к событию">' + emojiPicker + "</span>" +
          '<button type="submit"' + (eventCommentSubmitting[rowId] ? ' class="is-sending" disabled aria-busy="true">Отправка…' : '>Отправить') + '</button>' +
      "</form></span>";
  }

  function focusHomeNewsCommentInput(eventId) {
    window.setTimeout(function () {
      Array.prototype.some.call(document.querySelectorAll("[data-home-news-comment-form]"), function (form) {
        var item = form.closest("[data-home-news-event-id]");
        if (!item || item.getAttribute("data-home-news-event-id") !== String(eventId || "")) return false;
        var input = form.querySelector("input");
        if (input) {
          input.focus();
          input.selectionStart = input.selectionEnd = input.value.length;
        }
        return true;
      });
    }, 0);
  }

  function insertHomeNewsCommentEmoji(input, emoji) {
    if (!input) return;
    var text = String(input.value || "");
    var start = typeof input.selectionStart === "number" ? input.selectionStart : text.length;
    var end = typeof input.selectionEnd === "number" ? input.selectionEnd : start;
    input.value = (text.slice(0, start) + emoji + text.slice(end)).slice(0, 500);
    input.selectionStart = input.selectionEnd = Math.min(start + emoji.length, input.value.length);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.focus();
  }

  function clubTickerText(row) {
    var amount = Math.max(0, Number(row && row.prizeAmount) || 0);
    var actor = String(row && (row.newsTitle || row.actorNick) || "").trim();
    var tournament = String(row && row.tournamentName || "").trim();
    var place = Math.max(0, Number(row && row.tournamentPlace) || 0);
    var lines = Array.isArray(row && row.newsLines) ? row.newsLines : [];
    var source = lines.join(". ") || String(row && row.text || "");
    if (!place) {
      var placeMatch = source.match(/Занял\s+(\d+)-е\s+место/i);
      if (placeMatch) place = Math.max(0, Number(placeMatch[1]) || 0);
    }
    if (!tournament) {
      var tournamentMatch = source.match(/в\s+турнире\s+(.+?)(?:\s+и\s+выиграл|[.]|$)/i);
      if (tournamentMatch) tournament = String(tournamentMatch[1] || "").trim();
    }
    if (!amount || !actor || !tournament) return String(row && row.text || "");
    return "+" + formatRub(amount) + " " + actor + " выиграл в " + tournament +
      (place ? " за " + place + "-е место" : "");
  }

  function eventHtml(row, ticker, isDayHero, clubTicker) {
    var timeLabel = row.type === "birthday" && Number(row.upcomingDays) > 0
      ? "через " + Number(row.upcomingDays) + " дн."
      : relativeTime(row.at);
    var linkedClubProfile = newsModalMode === "club" ? clubProfileForNick(row && row.actorNick) : null;
    var friendProfileKey = matchKey(row && row.actorNick);
    var linkedFriendProfile = newsModalMode === "friends"
      ? (friendProfileById[String(row && row.actorId || "").trim()] || friendProfileByNick[friendProfileKey] || null)
      : null;
    var linkedProfile = linkedClubProfile || linkedFriendProfile;
    // In club news only an exact, public nickname mapping may open a profile.
    // Snapshot actor ids can be stale, synthetic, or belong to another player.
    var eventPlayerId = newsModalMode === "club"
      ? String(linkedClubProfile && linkedClubProfile.id || "")
      : String(row && row.actorId || "");
    var avatar = String(linkedProfile && linkedProfile.avatar || row && row.actorAvatar || "").trim();
    var visual = avatar
      ? '<img class="home-friend-news__avatar" src="' + esc(avatar) + '" alt="" loading="lazy" decoding="async">'
      : eventIconSvg(row.type);
    var playerStyle = row && row.playerAccent && row.playerRgb
      ? ' style="--friend-news-accent:' + esc(row.playerAccent) + ';--friend-news-rgb:' + esc(row.playerRgb) + '"'
      : "";
    var canResolveClubPlayer = newsModalMode === "club" && !!String(row && row.actorNick || "").trim();
    var canOpenProfile = !ticker && !!(eventPlayerId || canResolveClubPlayer);
    var profileLevel = Math.max(0, Number(linkedProfile && linkedProfile.level) || 0);
    var profileRatingPlace = Math.max(0, Number(linkedProfile && linkedProfile.ratingPlace) || 0);
    var profileRatingLeague = Math.max(0, Number(linkedProfile && linkedProfile.ratingLeague) || 0);
    var profileMetaParts = [];
    if (profileLevel) profileMetaParts.push("Уровень " + profileLevel);
    if (profileRatingPlace && profileRatingLeague) {
      profileMetaParts.push("Лига " + profileRatingLeague + " · " + profileRatingPlace + "-е место");
    }
    var profileMetaHtml = !ticker && profileMetaParts.length
      ? '<span class="home-friend-news-modal__player-meta">' + esc(profileMetaParts.join(" · ")) + '</span>'
      : "";
    var poker21LinkedHtml = !ticker && linkedProfile && linkedProfile.poker21Linked
      ? '<span class="home-friend-news-modal__poker21-linked" title="Poker21 привязан" aria-label="Poker21 привязан">✓</span>'
      : "";
    var playerAttrs = canOpenProfile
      ? ' data-home-news-player-id="' + esc(eventPlayerId) + '"' +
        ' data-home-news-player-name="' + esc(row.actorNick || "Игрок") + '"' +
        ' data-home-news-player-avatar="' + esc(avatar) + '"' +
        ' role="button" tabindex="0"'
      : "";
    var structuredText = row && row.newsTitle && Array.isArray(row.newsLines) && row.newsLines.length
      ? '<span class="home-friend-news-modal__player-title"><span class="home-friend-news-modal__player-name">' + esc(row.newsTitle) + '</span>' +
        poker21LinkedHtml + (isDayHero ? '<span class="home-friend-news-modal__day-hero">ГЕРОЙ ДНЯ</span>' : "") + '</span>' +
        profileMetaHtml +
        '<span class="home-friend-news-modal__event-lines">' + row.newsLines.map(function (line) {
          return "<strong>" + eventTextHtml(line) + "</strong>";
        }).join("") + "</span>"
      : "<strong>" + eventTextHtml(row.text) + "</strong>";
    var profileCue = canOpenProfile
      ? '<span class="home-friend-news-modal__profile-cue">Открыть профиль <b aria-hidden="true">›</b></span>'
      : "";
    return '<span class="' + (ticker ? "home-friend-news__slide" : "home-friend-news-modal__item") +
      ' home-friend-news-event--' + esc(row.type) +
      '" data-home-news-target="' + esc(!ticker && (eventPlayerId || canResolveClubPlayer) ? "" : row.target || "") + '"' +
      (ticker ? "" : ' data-home-news-event-id="' + esc(feedbackEventId(row)) + '"') + playerAttrs + playerStyle + ">" +
      '<span class="' + (ticker ? "home-friend-news__event-icon" : "home-friend-news-modal__icon") +
      ' home-friend-news--' + esc(row.type) + (avatar ? " home-friend-news__event-icon--avatar" : "") +
      '" aria-hidden="true">' + visual + "</span>" +
      '<span class="' + (ticker ? "home-friend-news__event-text" : "home-friend-news-modal__copy") + '">' +
      (ticker ? eventTextHtml(clubTicker ? clubTickerText(row) : row.text) : structuredText +
        (row.image ? '<img class="chat-user-modal__wall-image" src="' + esc(row.image) + '" alt="Фото к записи" loading="lazy">' : "") +
        "<small>" + esc(timeLabel) + "</small>" +
        eventFeedbackHtml(row, profileCue)) +
      "</span></span>";
  }

  function modalEventsHtml(rows) {
    var groups = [];
    (rows || []).forEach(function (row) {
      var day = eventDayKey(row && row.at);
      var group = groups.length ? groups[groups.length - 1] : null;
      if (!group || group.day !== day) {
        group = { day: day, at: row && row.at, rows: [] };
        groups.push(group);
      }
      group.rows.push(row);
    });
    return groups.map(function (group) {
      var count = group.rows.length;
      var mod10 = count % 10;
      var mod100 = count % 100;
      var countWord = mod10 === 1 && mod100 !== 11 ? "запись" : (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14) ? "записи" : "записей");
      var clubHero = clubDayHero(group.at);
      var dayHero = group.rows.filter(function (row) {
        return clubHero && matchKey(row && row.actorNick) === matchKey(clubHero.nick) &&
          Math.max(0, Number(row && row.prizeAmount) || 0) > 0;
      }).sort(function (a, b) {
        return (Number(b && b.prizeAmount) || 0) - (Number(a && a.prizeAmount) || 0);
      })[0];
      return '<section class="home-friend-news-modal__day-group">' +
        '<div class="home-friend-news-modal__date"><span>' + esc(eventDateLabel(group.at, true)) + "</span></div>" +
        (newsModalMode === "club" ? '<div class="home-friend-news-modal__club-tabs" role="tablist" aria-label="Разделы новостей клуба">' +
          '<button type="button" data-club-news-tab="wins" class="home-friend-news-modal__club-tab' +
            (clubNewsTab === "wins" ? ' home-friend-news-modal__club-tab--active' : '') + '">Выигрыши</button>' +
          '<button type="button" data-club-news-tab="wall" class="home-friend-news-modal__club-tab' +
            (clubNewsTab === "wall" ? ' home-friend-news-modal__club-tab--active' : '') + '">Записи игроков</button></div>' : "") +
        '<div class="home-friend-news-modal__day-count">Всего за день: <strong>' + count + " " + countWord + "</strong></div>" +
        '<div class="home-friend-news-modal__day-events">' +
          group.rows.map(function (row) { return eventHtml(row, false, row === dayHero); }).join("") +
        "</div>" +
      "</section>";
    }).join("");
  }

  function showIndex(index, animate) {
    var track = el("homeFriendNewsTrack");
    var ticker = el("homeFriendNewsOpen");
    if (!track || !events.length) return;
    activeIndex = (index + events.length) % events.length;
    if (ticker) {
      var active = events[activeIndex] || {};
      ticker.setAttribute("data-news-type", String(active.type || "empty"));
      if (active.playerAccent && active.playerRgb) {
        ticker.style.setProperty("--friend-news-accent", active.playerAccent);
        ticker.style.setProperty("--friend-news-rgb", active.playerRgb);
      } else {
        ticker.style.removeProperty("--friend-news-accent");
        ticker.style.removeProperty("--friend-news-rgb");
      }
    }
    if (!animate) track.classList.add("home-friend-news__track--instant");
    track.style.transform = "translateY(-" + (activeIndex * 100) + "%)";
    if (!animate) requestAnimationFrame(function () { track.classList.remove("home-friend-news__track--instant"); });
  }

  function startRotation() {
    clearInterval(rotateTimer);
    if (events.length < 2) return;
    rotateTimer = setInterval(function () { showIndex(activeIndex + 1, true); }, ROTATE_MS);
  }

  function showClubIndex(index, animate) {
    var track = el("homeClubNewsTrack");
    var ticker = el("homeClubNewsOpen");
    if (!track || !clubEvents.length) return;
    clubActiveIndex = (index + clubEvents.length) % clubEvents.length;
    var active = clubEvents[clubActiveIndex] || {};
    if (ticker) {
      ticker.setAttribute("data-news-type", String(active.type || "empty"));
      if (active.playerAccent && active.playerRgb) {
        ticker.style.setProperty("--friend-news-accent", active.playerAccent);
        ticker.style.setProperty("--friend-news-rgb", active.playerRgb);
      } else {
        ticker.style.removeProperty("--friend-news-accent");
        ticker.style.removeProperty("--friend-news-rgb");
      }
    }
    if (!animate) track.classList.add("home-friend-news__track--instant");
    track.style.transform = "translateY(-" + (clubActiveIndex * 100) + "%)";
    if (!animate) requestAnimationFrame(function () { track.classList.remove("home-friend-news__track--instant"); });
  }

  function renderClubNews() {
    var root = el("homeClubNews");
    var track = el("homeClubNewsTrack");
    var label = el("homeClubNewsLabel");
    if (!root || !track) return;
    var displayRows = clubEvents;
    if (!displayRows.length) {
      displayRows = [{
        id: clubNewsLoading ? "club-loading" : "club-empty",
        type: "empty",
        text: clubNewsLoading ? "Загрузка новостей клуба…" : "За последний игровой день новостей клуба нет",
        at: "",
      }];
    }
    if (label) {
      var labelDate = displayRows.map(function (row) { return row && row.at; }).find(function (value) {
        return eventTime(value) > 0;
      });
      label.textContent = "Новости клуба" + (labelDate ? " · " + eventDateLabel(labelDate, false) : "");
    }
    root.hidden = false;
    track.innerHTML = displayRows.map(function (row) { return eventHtml(row, true, false, true); }).join("");
    showClubIndex(0, false);
    clearInterval(clubRotateTimer);
    if (displayRows.length > 1) {
      clubRotateTimer = setInterval(function () { showClubIndex(clubActiveIndex + 1, true); }, ROTATE_MS);
    }
  }

  function render() {
    var root = el("homeFriendNews");
    var track = el("homeFriendNewsTrack");
    if (!root || !track) return;
    root.hidden = false;
    if (!events.length) {
      events = [{
        id: "empty",
        type: "empty",
        icon: "♣",
        text: "Здесь появятся новости ваших друзей",
        at: "",
      }];
    }
    track.innerHTML = events.map(function (row) { return eventHtml(row, true); }).join("");
    renderModalList(activeModalEvents());
    showIndex(0, false);
    startRotation();
  }

  function renderModalList(rows) {
    var list = el("homeFriendNewsList");
    if (!list) return;
    var achievementPromo = newsModalMode === "club"
      ? '<aside class="home-friend-news-modal__achievement-promo" aria-label="Награда за достижение Герой дня">' +
          '<strong>НАГРАДА 15 000 ₽</strong>' +
          '<span><b>Больше всех «Героев дня» в августе</b>' +
          '<small>Чтобы получить «Героя дня», выиграйте больше всех за день в одном турнире.</small></span>' +
          '<button type="button" class="home-friend-news-modal__achievement-promo-action" data-home-news-achievements-open>Смотреть &gt;&gt;</button>' +
        '</aside>'
      : "";
    var hasRealRows = Array.isArray(rows) && rows.some(function (row) { return row && row.id !== "empty"; });
    var activeClubLoading = newsModalMode === "club" && !hasRealRows &&
      (clubNewsTab === "wall" ? clubWallLoading : clubNewsLoading);
    if (activeClubLoading) {
      var skeletonAt = clubEvents[0] && clubEvents[0].at ||
        (clubTournamentDayKey() ? clubTournamentDayKey() + "T12:00:00" : new Date().toISOString());
      list.innerHTML = achievementPromo + '<section class="home-friend-news-modal__day-group" aria-busy="true">' +
        '<div class="home-friend-news-modal__date"><span>' + esc(eventDateLabel(skeletonAt, true)) + '</span></div>' +
        '<div class="home-friend-news-modal__club-tabs" role="tablist" aria-label="Разделы новостей клуба">' +
          '<button type="button" data-club-news-tab="wins" class="home-friend-news-modal__club-tab' +
            (clubNewsTab === "wins" ? ' home-friend-news-modal__club-tab--active' : '') + '">Выигрыши</button>' +
          '<button type="button" data-club-news-tab="wall" class="home-friend-news-modal__club-tab' +
            (clubNewsTab === "wall" ? ' home-friend-news-modal__club-tab--active' : '') + '">Записи игроков</button></div>' +
        '<div class="home-friend-news-modal__skeleton" role="status" aria-label="Загружаем записи">' +
          '<span></span><span></span><span></span></div></section>';
      return;
    }
    if (friendNewsLoading && !friendNewsLoaded && !hasRealRows) {
      list.innerHTML = '<div class="home-friend-news-modal__loading" role="status">' +
        '<span aria-hidden="true"></span><strong>' +
          (newsModalMode === "club" ? "Загружаем новости клуба…" : "Загружаем новости всех друзей…") +
        '</strong><small>Собираем результаты и достижения игроков</small></div>';
      return;
    }
    var snapshot = Array.isArray(rows) ? rows.slice() : [];
    var wallInvite = newsModalMode === "club" && clubNewsTab === "wall"
      ? '<div class="home-friend-news-modal__wall-invite">Добавьте запись у себя на стене, чтобы она отобразилась в новостях клуба. ' +
          '<button type="button" data-club-news-write>Написать</button></div>' : "";
    var emptyClubWall = newsModalMode === "club" && clubNewsTab === "wall" && !snapshot.length;
    var emptyClubWallHtml = emptyClubWall
      ? '<section class="home-friend-news-modal__day-group"><div class="home-friend-news-modal__date"><span>' +
          esc(eventDateLabel(clubEvents[0] && clubEvents[0].at, true)) + '</span></div>' +
          '<div class="home-friend-news-modal__club-tabs" role="tablist" aria-label="Разделы новостей клуба">' +
            '<button type="button" data-club-news-tab="wins" class="home-friend-news-modal__club-tab">Выигрыши</button>' +
            '<button type="button" data-club-news-tab="wall" class="home-friend-news-modal__club-tab home-friend-news-modal__club-tab--active">Записи игроков</button></div>' +
          '<div class="home-friend-news-modal__empty"><span aria-hidden="true">✎</span><strong>Записей за этот день пока нет</strong></div></section>'
      : "";
    list.innerHTML = achievementPromo + emptyClubWallHtml + (!emptyClubWall && snapshot[0] && snapshot[0].id === "empty"
      ? '<div class="home-friend-news-modal__empty"><span aria-hidden="true">♣</span><strong>Новостей пока нет</strong><small>Здесь появятся личные записи, повышения уровня, выигрыши, дни рождения и новые ачивки друзей.</small></div>'
      : (!emptyClubWall ? modalEventsHtml(snapshot) : "")) + wallInvite;
  }

  function activeModalEvents() {
    return newsModalMode === "club" ? (clubNewsTab === "wall" ? clubWallEvents : clubEvents) : events;
  }

  function feedbackEventId(row) {
    var ownId = String(row && row.id || "");
    if (newsModalMode !== "friends" || !row || !clubEvents.length) return ownId;
    var rowText = String(row.text || "").trim();
    var rowActor = matchKey(row.actorNick);
    var rowTime = eventTime(row.at);
    var linked = clubEvents.find(function (candidate) {
      if (!candidate || String(candidate.text || "").trim() !== rowText) return false;
      if (rowActor && matchKey(candidate.actorNick) !== rowActor) return false;
      return eventTime(candidate.at) === rowTime;
    });
    return String(linked && linked.id || ownId);
  }

  function syncNewsModalHeading() {
    var title = el("homeFriendNewsModalTitle");
    var eyebrow = el("homeFriendNewsModalEyebrow");
    var modal = el("homeFriendNewsModal");
    var copy = el("homeClubNewsCopyLink");
    if (title) title.textContent = newsModalMode === "club" ? "Новости клуба" : "Новости друзей";
    if (eyebrow) eyebrow.textContent = newsModalMode === "club" ? "Клуб · итоги игровых дней" : "Друзья и клуб";
    if (modal) modal.classList.toggle("home-friend-news-modal--club", newsModalMode === "club");
    if (copy) copy.hidden = newsModalMode !== "club";
  }

  function copyClubNewsLink() {
    var link = typeof buildMiniAppStartLink === "function"
      ? buildMiniAppStartLink("club_news")
      : window.location.origin + window.location.pathname + "?startapp=club_news";
    function notify(copied) {
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      var message = copied ? "Ссылка на новости клуба скопирована" : "Не удалось скопировать ссылку: " + link;
      if (tg && tg.showToast && copied) tg.showToast(message);
      else if (tg && tg.showAlert) tg.showAlert(message);
      else window.alert(message);
    }
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      navigator.clipboard.writeText(link).then(function () { notify(true); }).catch(function () { notify(false); });
      return;
    }
    var input = document.createElement("textarea");
    input.value = link;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    var copied = false;
    try { copied = document.execCommand("copy"); } catch (error) {}
    input.remove();
    notify(copied);
  }

  function loadActiveModalFeedback(rows) {
    var sourceRows = Array.isArray(rows) ? rows : [];
    var ids = sourceRows.reduce(function (all, row) {
      return all.concat(feedbackEventId(row), Array.isArray(row && row._feedbackLegacyIds) ? row._feedbackLegacyIds : []);
    }, [])
      .filter(function (id) { return id && id !== "empty" && id !== "club-empty"; });
    if (!ids.length) return;
    feedbackRequest({ action: "view", eventIds: ids }).then(function (data) {
      Object.assign(eventFeedback, data.feedback || {});
      sourceRows.forEach(function (row) {
        var currentId = feedbackEventId(row);
        var current = eventFeedback[currentId] || {};
        var currentActivity = (Number(current.commentCount) || 0) + Object.keys(current.reactions || {}).reduce(function (sum, emoji) {
          return sum + (Number(current.reactions[emoji]) || 0);
        }, 0);
        if (currentActivity) return;
        (Array.isArray(row && row._feedbackLegacyIds) ? row._feedbackLegacyIds : []).some(function (legacyId) {
          var legacy = eventFeedback[legacyId] || {};
          var legacyActivity = (Number(legacy.commentCount) || 0) + Object.keys(legacy.reactions || {}).reduce(function (sum, emoji) {
            return sum + (Number(legacy.reactions[emoji]) || 0);
          }, 0);
          if (!legacyActivity) return false;
          eventFeedback[currentId] = Object.assign({}, legacy, {
            viewCount: Math.max(Number(current.viewCount) || 0, Number(legacy.viewCount) || 0),
          });
          return true;
        });
      });
      var modal = el("homeFriendNewsModal");
      if (modal && !modal.hidden) renderModalList(activeModalEvents());
    }).catch(function () {});
  }

  function openModal() {
    var modal = el("homeFriendNewsModal");
    if (!modal) return;
    newsModalMode = "friends";
    syncNewsModalHeading();
    renderModalList(activeModalEvents());
    modal.hidden = false;
    document.body.classList.add("home-friend-news-modal-open");
    loadActiveModalFeedback(events);
    // Refresh on every open so a friend's newly published wall post appears
    // immediately instead of waiting for the five-minute background update.
    load();
  }

  function openClubModal() {
    var modal = el("homeFriendNewsModal");
    if (!modal) return;
    if (!clubEvents.length && clubNewsStaticRows().length) {
      clubEvents = buildClubEventsFromRows([], []);
      clubNewsLoaded = clubEvents.length > 0;
    }
    newsModalMode = "club";
    clubNewsTab = "wins";
    syncNewsModalHeading();
    renderModalList(clubEvents);
    modal.hidden = false;
    document.body.classList.add("home-friend-news-modal-open");
    Promise.resolve(loadClubNews()).then(function () {
      if (newsModalMode === "club" && !modal.hidden) loadActiveModalFeedback(clubEvents);
    });
  }
  window.pokerOpenClubNewsModal = openClubModal;

  function closeModal() {
    var modal = el("homeFriendNewsModal");
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove("home-friend-news-modal-open");
  }

  function bind() {
    var open = el("homeFriendNewsOpen");
    var clubOpen = el("homeClubNewsOpen");
    var clubCopy = el("homeClubNewsCopyLink");
    var modal = el("homeFriendNewsModal");
    if (open && open.dataset.friendNewsBound !== "1") {
      open.dataset.friendNewsBound = "1";
      open.addEventListener("click", openModal);
    }
    if (clubOpen && clubOpen.dataset.clubNewsBound !== "1") {
      clubOpen.dataset.clubNewsBound = "1";
      clubOpen.addEventListener("click", openClubModal);
    }
    if (clubCopy && clubCopy.dataset.clubNewsCopyBound !== "1") {
      clubCopy.dataset.clubNewsCopyBound = "1";
      clubCopy.addEventListener("click", copyClubNewsLink);
    }
    if (modal && modal.dataset.friendNewsBound !== "1") {
      modal.dataset.friendNewsBound = "1";
      modal.addEventListener("contextmenu", function (event) {
        var item = event.target.closest("[data-home-news-event-id]");
        if (!item || event.target.closest("input, textarea")) return;
        event.preventDefault();
        event.stopPropagation();
        clearTimeout(homeNewsLongPressTimer);
        homeNewsLongPressTriggered = true;
        window.setTimeout(function () { homeNewsLongPressTriggered = false; }, 400);
        var comment = event.target.closest("[data-home-comment-id]");
        var eventId = item.getAttribute("data-home-news-event-id");
        var commentId = comment && comment.getAttribute("data-home-comment-id");
        openReactionPicker(function (emoji) {
          sendOptimisticReaction(eventId, emoji, commentId);
        });
      });
      modal.addEventListener("pointerdown", function (event) {
        var item = event.target.closest("[data-home-news-event-id]");
        var comment = event.target.closest("[data-home-comment-id]");
        if (!item || event.target.closest("button, input, textarea")) return;
        if (!comment && event.target.closest(".chat-user-modal__news-actions, .chat-user-modal__news-comments")) return;
        clearTimeout(homeNewsLongPressTimer);
        homeNewsLongPressTriggered = false;
        var eventId = item.getAttribute("data-home-news-event-id");
        var commentId = comment && comment.getAttribute("data-home-comment-id");
        homeNewsLongPressTimer = window.setTimeout(function () {
          homeNewsLongPressTriggered = true;
          openReactionPicker(function (emoji) {
            sendOptimisticReaction(eventId, emoji, commentId);
          });
        }, 280);
      });
      ["pointerup", "pointercancel", "pointerleave"].forEach(function (type) {
        modal.addEventListener(type, function () { clearTimeout(homeNewsLongPressTimer); });
      });
      modal.addEventListener("click", function (event) {
        if (homeNewsLongPressTriggered) {
          homeNewsLongPressTriggered = false;
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        if (event.target.closest("[data-home-friend-news-close]")) {
          closeModal();
          return;
        }
        var clubTab = event.target.closest("[data-club-news-tab]");
        if (clubTab) {
          clubNewsTab = clubTab.getAttribute("data-club-news-tab") === "wall" ? "wall" : "wins";
          if (clubNewsTab === "wall") {
            loadClubWallNews(true);
          } else {
            renderModalList(clubEvents);
            loadActiveModalFeedback(clubEvents);
          }
          return;
        }
        if (event.target.closest("[data-club-news-write]")) {
          closeModal();
          var profileNav = document.querySelector('.bottom-nav__item[data-view-target="profile"]');
          if (profileNav) profileNav.click();
          else if (typeof setView === "function") setView("profile");
          window.setTimeout(function () {
            var attempts = 0;
            var openOwnWall = function () {
              var personalTab = document.querySelector('[data-profile-wall-tab="personal"]');
              var wall = document.getElementById("profileOwnWall");
              if (personalTab && wall) {
                personalTab.click();
                if (wall.scrollIntoView) wall.scrollIntoView({ behavior: "smooth", block: "start" });
                return;
              }
              attempts += 1;
              if (attempts < 12) window.setTimeout(openOwnWall, 150);
            };
            openOwnWall();
          }, 100);
          return;
        }
        var achievementsOpen = event.target.closest("[data-home-news-achievements-open]");
        if (achievementsOpen) {
          event.preventDefault();
          if (achievementsOpen.disabled) return;
          var list = el("homeFriendNewsList");
          returnToClubNewsAfterAchievements = true;
          returnToClubNewsScrollTop = list ? list.scrollTop : 0;
          achievementsOpen.disabled = true;
          achievementsOpen.classList.add("is-loading");
          achievementsOpen.setAttribute("aria-busy", "true");
          achievementsOpen.textContent = "Загрузка…";
          var resetAchievementsButton = function () {
            achievementsOpen.disabled = false;
            achievementsOpen.classList.remove("is-loading");
            achievementsOpen.removeAttribute("aria-busy");
            achievementsOpen.textContent = "Смотреть >>";
          };
          var openAchievements = function () {
            if (typeof window.openHallFishAchievementsModal !== "function") return false;
            resetAchievementsButton();
            closeModal();
            window.openHallFishAchievementsModal("dayHero");
            return true;
          };
          if (!openAchievements() && typeof window.pokerEnsureScriptDomains === "function") {
            Promise.resolve(window.pokerEnsureScriptDomains(["hall"])).then(function () {
              if (openAchievements()) return;
              returnToClubNewsAfterAchievements = false;
              resetAchievementsButton();
              openClubModal();
            }).catch(function () {
              returnToClubNewsAfterAchievements = false;
              resetAchievementsButton();
              openClubModal();
            });
          } else if (typeof window.openHallFishAchievementsModal !== "function") {
            returnToClubNewsAfterAchievements = false;
            resetAchievementsButton();
            openClubModal();
          }
          return;
        }
        var author = event.target.closest("[data-home-news-comment-author]");
        if (author) {
          var authorId = author.getAttribute("data-user-id");
          if (authorId) {
            handoffNewsModalToPlayer(
              authorId,
              author.getAttribute("data-user-name") || "Игрок",
              author.getAttribute("data-user-avatar") || ""
            );
          }
          return;
        }
        var item = event.target.closest("[data-home-news-event-id]");
        var eventId = item && item.getAttribute("data-home-news-event-id");
        var replyButton = event.target.closest("[data-home-comment-reply]");
        if (eventId && replyButton) {
          var replyId = replyButton.getAttribute("data-home-comment-reply");
          var replyComment = ((eventFeedback[eventId] || {}).comments || []).find(function (row) {
            return String(row && row.id || "") === String(replyId || "");
          });
          if (replyComment) {
            eventCommentReplies[eventId] = {
              id: String(replyComment.id || ""),
              fromName: String(replyComment.author || "Игрок"),
              text: String(replyComment.text || "").slice(0, 160),
            };
            eventCommentsOpen[eventId] = true;
            renderModalList(activeModalEvents());
            focusHomeNewsCommentInput(eventId);
          }
          return;
        }
        if (eventId && event.target.closest("[data-home-comment-reply-cancel]")) {
          delete eventCommentReplies[eventId];
          renderModalList(activeModalEvents());
          focusHomeNewsCommentInput(eventId);
          return;
        }
        var emojiToggle = event.target.closest("[data-home-comment-emoji-toggle]");
        if (eventId && emojiToggle) {
          var emojiForm = emojiToggle.closest("[data-home-news-comment-form]");
          var emojiPicker = emojiForm && emojiForm.querySelector(".home-news-emoji-picker");
          document.querySelectorAll(".home-news-emoji-picker").forEach(function (picker) {
            if (picker !== emojiPicker) picker.hidden = true;
          });
          if (emojiPicker) emojiPicker.hidden = !emojiPicker.hidden;
          var emojiInput = emojiForm && emojiForm.querySelector("input");
          if (emojiInput) emojiInput.focus();
          return;
        }
        var emojiChoice = event.target.closest("[data-home-comment-emoji]");
        if (eventId && emojiChoice) {
          var choiceForm = emojiChoice.closest("[data-home-news-comment-form]");
          insertHomeNewsCommentEmoji(choiceForm && choiceForm.querySelector("input"), emojiChoice.getAttribute("data-home-comment-emoji") || "");
          var choicePicker = choiceForm && choiceForm.querySelector(".home-news-emoji-picker");
          if (choicePicker) choicePicker.hidden = true;
          return;
        }
        var deleteComment = event.target.closest("[data-home-comment-delete]");
        if (eventId && deleteComment) {
          var deleteCommentId = deleteComment.getAttribute("data-home-comment-delete");
          if (!window.confirm("Удалить комментарий?")) return;
          deleteComment.disabled = true;
          feedbackRequest({ action: "delete-comment", eventId: eventId, commentId: deleteCommentId })
            .then(function (data) { eventFeedback[eventId] = data.feedback || {}; renderModalList(activeModalEvents()); })
            .catch(function (error) {
              deleteComment.disabled = false;
              if (typeof alertText === "function") alertText(error.message || "Не удалось удалить комментарий");
            });
          return;
        }
        var reaction = event.target.closest("[data-home-news-reaction]");
        var commentReaction = event.target.closest("[data-home-comment-reaction]");
        if (eventId && commentReaction) {
          var commentId = commentReaction.getAttribute("data-comment-id");
          var comment = ((eventFeedback[eventId] || {}).comments || []).find(function (row) { return String(row.id) === String(commentId); });
          var commentUsersTrigger = event.target.closest("[data-home-comment-reaction-users]");
          if (commentUsersTrigger) {
            showReactionUsers(comment || {}, commentUsersTrigger.getAttribute("data-home-comment-reaction-users"));
            return;
          }
          sendOptimisticReaction(eventId, commentReaction.getAttribute("data-home-comment-reaction"), commentId);
          return;
        }
        if (eventId && reaction) {
          var usersTrigger = event.target.closest("[data-home-news-reaction-users]");
          if (usersTrigger) {
            showReactionUsers(eventFeedback[eventId] || {}, usersTrigger.getAttribute("data-home-news-reaction-users"));
            return;
          }
          sendOptimisticReaction(eventId, reaction.getAttribute("data-home-news-reaction"), "");
          return;
        }
        if (eventId && event.target.closest("[data-home-news-comments]")) {
          eventCommentsOpen[eventId] = !eventCommentsOpen[eventId];
          renderModalList(activeModalEvents());
          return;
        }
        if (event.target.closest(".chat-user-modal__news-actions, .chat-user-modal__news-comments")) return;
        var playerCard = event.target.closest("[data-home-news-player-id]");
        var playerId = playerCard && playerCard.getAttribute("data-home-news-player-id");
        if (playerCard) {
          var playerName = playerCard.getAttribute("data-home-news-player-name") || "Игрок";
          var linkedProfile = clubProfileForNick(playerName);
          // Club event snapshots can contain a stale or mismatched actor id.
          // The visible poker nickname is the authoritative identity here.
          if (newsModalMode === "club" && linkedProfile && linkedProfile.id) {
            playerId = linkedProfile.id;
          } else if (String(playerId).indexOf("rating:") === 0 && linkedProfile) {
            playerId = linkedProfile.id || playerId;
          }
          if (newsModalMode === "club" && (!linkedProfile || !linkedProfile.id)) {
            setNewsProfileLoading(true, playerName);
            resolveClubProfileForNick(playerName).then(function (resolvedProfile) {
              if (!resolvedProfile || !resolvedProfile.id) {
                setNewsProfileLoading(false);
                if (typeof alertText === "function") alertText("Профиль игрока «" + playerName + "» пока не найден");
                return;
              }
              handoffNewsModalToPlayer(resolvedProfile.id, playerName,
                resolvedProfile.avatar || playerCard.getAttribute("data-home-news-player-avatar") || "");
            });
            return;
          }
          if (playerId) {
            handoffNewsModalToPlayer(
              playerId,
              playerName,
              linkedProfile && linkedProfile.avatar || playerCard.getAttribute("data-home-news-player-avatar") || ""
            );
          }
          return;
        }
        var target = event.target.closest("[data-home-news-target]");
        var view = target && target.getAttribute("data-home-news-target");
        if (view && typeof setView === "function") {
          closeModal();
          setView(view);
        }
      });
      document.addEventListener("poker:hall-fish-close", function () {
        if (!returnToClubNewsAfterAchievements) return;
        returnToClubNewsAfterAchievements = false;
        var newsModal = el("homeFriendNewsModal");
        var list = el("homeFriendNewsList");
        newsModalMode = "club";
        syncNewsModalHeading();
        if (newsModal) newsModal.hidden = false;
        document.body.classList.add("home-friend-news-modal-open");
        if (list) list.scrollTop = returnToClubNewsScrollTop;
      });
      modal.addEventListener("input", function (event) {
        var form = event.target.closest("[data-home-news-comment-form]");
        if (!form || event.target.tagName !== "INPUT") return;
        var item = form.closest("[data-home-news-event-id]");
        var eventId = item && item.getAttribute("data-home-news-event-id");
        if (eventId) eventCommentDrafts[eventId] = String(event.target.value || "").slice(0, 500);
      });
      modal.addEventListener("submit", function (event) {
        var form = event.target.closest("[data-home-news-comment-form]");
        if (!form) return;
        event.preventDefault();
        var item = form.closest("[data-home-news-event-id]");
        var eventId = item && item.getAttribute("data-home-news-event-id");
        var input = form.querySelector("input");
        var text = String(input && input.value || "").trim();
        if (!eventId || !text) return;
        var submit = form.querySelector('button[type="submit"]');
        eventCommentSubmitting[eventId] = true;
        if (submit) {
          submit.disabled = true;
          submit.classList.add("is-sending");
          submit.setAttribute("aria-busy", "true");
          submit.textContent = "Отправка…";
        }
        var previousFeedback = eventFeedback[eventId] || {};
        var previousReply = eventCommentReplies[eventId] || null;
        var payload = { action: "comment", eventId: eventId, text: text };
        if (previousReply) payload.replyTo = { id: previousReply.id };
        var optimisticComment = {
          id: "pending:" + Date.now().toString(36),
          author: "Вы",
          text: text,
          at: new Date().toISOString(),
          isMine: true,
          pending: true,
        };
        if (previousReply) {
          optimisticComment.replyTo = {
            id: previousReply.id,
            fromName: previousReply.fromName,
            text: previousReply.text,
          };
        }
        var previousComments = Array.isArray(previousFeedback.comments) ? previousFeedback.comments : [];
        eventFeedback[eventId] = Object.assign({}, previousFeedback, {
          comments: previousComments.concat([optimisticComment]),
          commentCount: previousComments.length + 1,
        });
        eventCommentsOpen[eventId] = true;
        delete eventCommentReplies[eventId];
        delete eventCommentDrafts[eventId];
        renderModalList(activeModalEvents());
        feedbackRequest(payload).then(function (data) {
          delete eventCommentSubmitting[eventId];
          eventFeedback[eventId] = data.feedback || {};
          eventCommentsOpen[eventId] = true;
          delete eventCommentReplies[eventId];
          delete eventCommentDrafts[eventId];
          renderModalList(activeModalEvents());
        }).catch(function (error) {
          delete eventCommentSubmitting[eventId];
          eventFeedback[eventId] = previousFeedback;
          eventCommentDrafts[eventId] = text;
          if (previousReply) eventCommentReplies[eventId] = previousReply;
          renderModalList(activeModalEvents());
          if (typeof alertText === "function") alertText(error.message || "Не удалось отправить комментарий");
        });
      });
      modal.addEventListener("keydown", function (event) {
        if (event.key !== "Enter" && event.key !== " ") return;
        if (event.target.closest(".chat-user-modal__news-actions, .chat-user-modal__news-comments")) return;
        var playerCard = event.target.closest("[data-home-news-player-id]");
        if (!playerCard) return;
        event.preventDefault();
        playerCard.click();
      });
    }
  }

  function mountWhenProfileReady() {
    ensureDom();
    if (el("homeFriendNews")) {
      bind();
      render();
      return;
    }
    var observer = new MutationObserver(function () {
      if (!el("profileFriendsPanel")) return;
      observer.disconnect();
      ensureDom();
      bind();
      render();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function load(friendsOverride) {
    var base = apiBase();
    if (!base) return;
    var suppliedFriends = Array.isArray(friendsOverride) ? friendsOverride : null;
    var signature = suppliedFriends
      ? (suppliedFriends.map(friendId).filter(Boolean).sort().join("|") || "__empty__")
      : "";
    if (friendNewsLoadPromise) return friendNewsLoadPromise;
    if (Date.now() - lastLoadAt < 30000 && (!signature || signature === lastFriendsSignature)) {
      return Promise.resolve();
    }
    var requestSequence = ++loadSequence;
    friendNewsLoading = true;
    if (!friendNewsLoaded && el("homeFriendNewsModal") && !el("homeFriendNewsModal").hidden) renderModalList(activeModalEvents());
    if (signature) lastFriendsSignature = signature;
    lastLoadAt = Date.now();
    var suffix = authSuffix();
    var joiner = suffix ? "&" : "?";
    var friendsPromise = suppliedFriends
      ? Promise.resolve({ ok: true, friends: suppliedFriends })
      : fetch(base + "/api/friends" + suffix, { cache: "no-store" }).then(function (response) {
          if (!response.ok) throw new Error("friends_http_" + response.status);
          return response.json();
        }).then(function (payload) {
          if (!payload || payload.ok !== true || !Array.isArray(payload.friends)) throw new Error("friends_invalid");
          return payload;
        });
    var request = friendsPromise.then(function (friendsPayload) {
      if (requestSequence !== loadSequence) return null;
      var friends = friendsPayload && Array.isArray(friendsPayload.friends) ? friendsPayload.friends : [];
      return Promise.all([
        Promise.resolve(friendsPayload),
        cachedFetchJson(base + "/api/promo/daily-poker/winners" + suffix + joiner + "limit=50", "daily:" + signature + ":" + suffix, 60 * 1000, { cache: "default" })
          .catch(function () { return { winners: [] }; }),
        cachedFetchJson(base + "/api/sng-champions?mode=achievements", "sng", 5 * 60 * 1000, { cache: "default" })
          .catch(function () { return { rows: [] }; }),
        cachedFetchJson(base + "/api/club-choice-vote?mode=achievements", "choice", 5 * 60 * 1000, { cache: "default" })
          .catch(function () { return { rows: [] }; }),
        tournamentSnapshotsReady(friends),
        cachedFetchJson(base + "/api/raffles" + suffix + joiner + "mode=achievements", "raffles:" + suffix, 5 * 60 * 1000, { cache: "default" })
          .catch(function () { return { raffles: [] }; }),
        cachedFetchJson(base + "/api/player-crm?publicLevels=1", "public-levels", 5 * 60 * 1000, { cache: "default" })
          .catch(function () { return { levelRows: [] }; }),
        fetch(base + "/api/profile-wall", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(typeof pokerApiAuthJsonBody === "function"
            ? pokerApiAuthJsonBody({ action: "friend-feed" })
            : { action: "friend-feed" }),
        }).then(function (response) {
          if (!response.ok) throw new Error("friend_feed_http_" + response.status);
          return response.json();
        }).then(function (payload) {
          if (!payload || payload.ok !== true || !Array.isArray(payload.posts)) throw new Error("friend_feed_invalid");
          return payload;
        }).catch(function () { return { posts: [], failed: true }; }),
      ]);
    }).then(function (results) {
      if (!results || requestSequence !== loadSequence) return;
      var friends = enrichFriendsWithPoker21(
        results[0] && Array.isArray(results[0].friends) ? results[0].friends : [],
        results[6] && Array.isArray(results[6].levelRows) ? results[6].levelRows : []
      );
      var winners = results[1] && Array.isArray(results[1].winners) ? results[1].winners : [];
      var sngRows = results[2] && Array.isArray(results[2].rows) ? results[2].rows : [];
      var choiceRows = results[3] && Array.isArray(results[3].rows) ? results[3].rows : [];
      var tournamentSnapshots = applyRaffleSnapshots(
        friends,
        results[4] || {},
        results[5] && Array.isArray(results[5].raffles) ? results[5].raffles : []
      );
      friendProfileByNick = {};
      friendProfileById = {};
      friends.forEach(function (friend) {
        var snapshot = friendSnapshot(friend, tournamentSnapshots);
        var league1Place = Math.max(0, Number(snapshot && snapshot.league1Place) || 0);
        var league2Place = Math.max(0, Number(snapshot && snapshot.league2Place) || 0);
        var ratingLeague = league1Place && (!league2Place || league1Place <= league2Place) ? 1 : (league2Place ? 2 : 0);
        var profile = {
          id: friendId(friend),
          avatar: friendAvatar(friend),
          poker21Linked: !!String(friend && (friend.p21Id || friend.poker21Id || friend.pokerPlusUserId) || "").trim(),
          level: Math.max(0, Number(friend && (friend.statusLevel || friend.level)) || 0),
          ratingLeague: ratingLeague,
          ratingPlace: ratingLeague === 1 ? league1Place : (ratingLeague === 2 ? league2Place : 0),
        };
        if (profile.id) friendProfileById[profile.id] = profile;
        friendRatingNickCandidates(friend).forEach(function (nick) {
          nicknameMatchKeys(nick).forEach(function (key) {
            if (key && !friendProfileByNick[key]) friendProfileByNick[key] = profile;
          });
        });
      });
      var nextEvents = attachFriendAvatars(mergeRelatedPlayerEvents(collectLevelEvents(friends).concat(
        collectNewFriendEvents(friends),
        personalPostEvents(friends, results[7] && results[7].posts),
        clubTop10RatingEventsForFriends(friends),
        collectTournamentEvents(friends, tournamentSnapshots),
        recentTournamentEvents(friends, tournamentSnapshots),
        winnerEvents(friends, winners),
        birthdayEvents(friends),
        achievementEvents(friends, sngRows, choiceRows)
      )), friends)
        .sort(function (a, b) {
          var aBirthday = a.type === "birthday" ? Number(a.upcomingDays) : null;
          var bBirthday = b.type === "birthday" ? Number(b.upcomingDays) : null;
          var aGroup = aBirthday === 0 ? 0 : (a.type === "birthday" ? 2 : 1);
          var bGroup = bBirthday === 0 ? 0 : (b.type === "birthday" ? 2 : 1);
          if (aGroup !== bGroup) return aGroup - bGroup;
          if (aGroup === 2) return aBirthday - bBirthday;
          return eventTime(b.at) - eventTime(a.at);
        })
        .filter(function (row, index, rows) {
          return rows.findIndex(function (candidate) { return candidate.id === row.id; }) === index;
        }).slice(0, MAX_EVENTS);
      var previousEvents = events.filter(function (row) { return row && row.id !== "empty" && isRecentEvent(row.at); });
      events = nextEvents.length ? nextEvents : previousEvents;
      friendNewsLoading = false;
      friendNewsLoaded = true;
      writeRenderedEventsCache(events);
      render();
    }).catch(function () {
      if (requestSequence !== loadSequence) return;
      friendNewsLoading = false;
      friendNewsLoaded = true;
      if (el("homeFriendNewsModal") && !el("homeFriendNewsModal").hidden) renderModalList(activeModalEvents());
    });
    friendNewsLoadPromise = request.then(function (result) {
      if (friendNewsLoadPromise === guardedRequest) friendNewsLoadPromise = null;
      return result;
    }, function (error) {
      if (friendNewsLoadPromise === guardedRequest) friendNewsLoadPromise = null;
      throw error;
    });
    var guardedRequest = friendNewsLoadPromise;
    return guardedRequest;
  }

  function scheduleClubNewsRetry() {
    if (clubNewsRetryTimer || clubEvents.length || clubNewsRetryCount >= 12) return;
    clubNewsRetryCount += 1;
    clubNewsRetryTimer = window.setTimeout(function () {
      clubNewsRetryTimer = 0;
      loadClubNews(true);
    }, Math.min(4000, 350 * Math.pow(1.45, clubNewsRetryCount - 1)));
  }

  function clubNewsStaticRows() {
    var data = window.POKER_CLUB_NEWS_DATA;
    return data && Array.isArray(data.rows) ? data.rows : [];
  }

  function clubNewsStaticBirthdayEvents(dayKey) {
    var data = window.POKER_CLUB_NEWS_DATA;
    var year = String(dayKey || "").slice(0, 4);
    return (data && Array.isArray(data.birthdays) ? data.birthdays : []).map(function (row) {
      var nick = String(row && row.nick || "").trim();
      var key = matchKey(nick);
      if (!key || String(row && row.date || "") !== dayKey) return null;
      return {
        id: "birthday:club:" + key + ":" + year,
        type: "birthday",
        icon: "♥",
        text: "У " + nick + " день рождения",
        at: dayKey + "T12:00:00+07:00",
        actorId: "",
        actorNick: nick,
        actorAvatar: clubNewsFallbackAvatar(nick),
        newsTitle: nick,
        newsLines: ["День рождения"],
        _eventKind: "birthday",
      };
    }).filter(Boolean);
  }

  function buildClubEventsFromRows(players, winners, tournamentSnapshots) {
    var sourceRows = clubNewsStaticRows();
    var allPlayers = Array.isArray(players) ? players.slice() : [];
    var knownNicks = {};
    allPlayers.forEach(function (row) {
      nicknameMatchKeys(row && row.pokerPlusNickname).forEach(function (key) { knownNicks[key] = true; });
    });
    sourceRows.forEach(function (row) {
      var nick = String(row && row.nick || "").trim();
      var key = matchKey(nick);
      var aliases = nicknameMatchKeys(nick);
      if (!key || aliases.some(function (alias) { return knownNicks[alias]; })) return;
      aliases.forEach(function (alias) { knownNicks[alias] = true; });
      allPlayers.push({
        userId: "rating:" + key,
        pokerPlusNickname: nick,
        pokerPlusName: nick,
        avatarUrl: clubNewsFallbackAvatar(nick),
      });
    });
    var snapshots = { __recentEvents: sourceRows };
    var ratingChanges = Array.isArray(tournamentSnapshots && tournamentSnapshots.__ratingChanges)
      ? tournamentSnapshots.__ratingChanges : [];
    var tournamentDay = clubTournamentDayKey();
    var todayDay = clubTodayDayKey();
    var birthdays = clubBirthdayEvents(allPlayers, tournamentDay);
    if (todayDay && todayDay !== tournamentDay) {
      birthdays = birthdays.concat(clubBirthdayEvents(allPlayers, todayDay));
    }
    clubNewsStaticBirthdayEvents(todayDay).forEach(function (row) {
      var key = matchKey(row && row.actorNick);
      var alreadyLoaded = birthdays.some(function (birthday) {
        return matchKey(birthday && birthday.actorNick) === key;
      });
      if (!alreadyLoaded) birthdays.push(row);
    });
    return distributeDailyClubEvents(attachFriendAvatars(
      recentTournamentEvents(allPlayers, snapshots).concat(
        winnerEvents(allPlayers, Array.isArray(winners) ? winners : []),
        birthdays,
        ratingChanges
      ),
      allPlayers
    ).filter(function (row) {
      return isCurrentClubEvent(row);
    })).slice(0, MAX_EVENTS);
  }

  function loadClubWallEvents(players, tournamentDay) {
    var base = apiBase();
    var byAccount = {};
    var accountIds = [];
    (players || []).forEach(function (player) {
      [player && player.accountId, player && player.dtId, player && player.userId].forEach(function (id) {
        id = String(id || "").trim();
        if (!id || byAccount[id]) return;
        byAccount[id] = player;
        accountIds.push(id);
      });
    });
    // Club news follows the reporting day: 06:00 MSK through 06:00 MSK,
    // so early-morning wall posts still belong to the displayed game day.
    var dayStart = tournamentDay ? new Date(tournamentDay + "T06:00:00+03:00") : null;
    var dayEnd = dayStart && Number.isFinite(dayStart.getTime()) ? new Date(dayStart.getTime() + 86400000) : null;
    var payload = {
      action: "club-feed",
      accountIds: accountIds,
      from: dayStart && Number.isFinite(dayStart.getTime()) ? dayStart.toISOString() : "",
      to: dayEnd ? dayEnd.toISOString() : "",
    };
    return fetch(base + "/api/profile-wall", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(typeof pokerApiAuthJsonBody === "function" ? pokerApiAuthJsonBody(payload) : payload),
    }).then(function (response) {
      if (!response.ok) throw new Error("club_wall_http_" + response.status);
      return response.json();
    }).then(function (data) {
      return (data && Array.isArray(data.posts) ? data.posts : []).map(function (post) {
        var accountId = String(post && post.accountId || "");
        var player = byAccount[accountId] || {};
        var name = friendName(player);
        return {
          id: "wall:" + accountId + ":" + String(post.id || ""),
          type: "personal",
          icon: "✎",
          text: String(post.text || ""),
          image: String(post.image || ""),
          at: post.createdAt,
          actorId: friendId(player) || accountId,
          actorNick: name,
          actorAvatar: friendAvatar(player),
          newsTitle: name,
          newsLines: [String(post.text || "")].filter(Boolean),
          _eventKind: "wall",
        };
      }).filter(function (row) { return row.text || row.image; });
    });
  }

  function loadClubWallNews(force) {
    if (clubWallLoadPromise) return clubWallLoadPromise;
    var base = apiBase();
    if (!base) return Promise.resolve();
    clubWallLoading = true;
    if (newsModalMode === "club" && clubNewsTab === "wall") renderModalList(clubWallEvents);
    var request = cachedFetchJson(
      base + "/api/player-crm?publicLevels=1",
      "club-wall-public-levels-v1",
      force ? 0 : 5 * 60 * 1000,
      { cache: force ? "no-store" : "default" }
    ).then(function (data) {
      var players = (data && Array.isArray(data.levelRows) ? data.levelRows : []).map(function (row) {
        return Object.assign({}, row, {
          userId: row && (row.profileId || row.userId || row.accountId || row.dtId) || "",
          pokerPlusNickname: row && (row.pokerPlusNickname || row.ratingNick || row.nickname || row.nick) || "",
          pokerPlusName: row && (row.pokerPlusName || row.name || row.displayName) || "",
        });
      });
      return loadClubWallEvents(players, clubTournamentDayKey());
    }).then(function (rows) {
      clubWallEvents = Array.isArray(rows) ? rows : [];
      if (newsModalMode === "club" && clubNewsTab === "wall") {
        renderModalList(clubWallEvents);
        loadActiveModalFeedback(clubWallEvents);
      }
    }).catch(function () {
      if (newsModalMode === "club" && clubNewsTab === "wall") renderModalList(clubWallEvents);
    }).finally(function () {
      clubWallLoading = false;
      if (clubWallLoadPromise === request) clubWallLoadPromise = null;
      if (newsModalMode === "club" && clubNewsTab === "wall") renderModalList(clubWallEvents);
    });
    clubWallLoadPromise = request;
    return request;
  }

  function stableClubEvents(nextRows, previousRows) {
    var rows = (Array.isArray(nextRows) ? nextRows : []).filter(function (row) {
      return isCurrentClubEvent(row);
    });
    (Array.isArray(previousRows) ? previousRows : []).forEach(function (row) {
      if (!isDailyClubEvent(row) || !isCurrentClubEvent(row)) return;
      if (/\b50\s*(?:₽|р\.?|руб)/i.test(String(row.text || ""))) return;
      if (!rows.some(function (candidate) { return candidate && candidate.id === row.id; })) rows.push(row);
    });
    return distributeDailyClubEvents(mergeRelatedPlayerEvents(rows)).slice(0, MAX_EVENTS);
  }

  function loadClubNews(force) {
    var base = apiBase();
    if (!base) {
      clubNewsLoading = true;
      renderClubNews();
      scheduleClubNewsRetry();
      return;
    }
    if (clubNewsLoadPromise) return clubNewsLoadPromise;
    if (!force && clubNewsLoaded && clubNewsUpdatedAt && Date.now() - clubNewsUpdatedAt < 60 * 1000) {
      return Promise.resolve();
    }
    if (!clubEvents.length && clubNewsStaticRows().length) {
      clubEvents = buildClubEventsFromRows([], []);
      clubNewsLoaded = clubEvents.length > 0;
    }
    clubNewsLoading = !clubEvents.length;
    renderClubNews();
    var suffix = authSuffix();
    var joiner = suffix ? "&" : "?";
    var tournamentDay = clubTournamentDayKey();
    var dailyRangeQuery = tournamentDay ? "&from=" + encodeURIComponent(tournamentDay) + "&to=" + encodeURIComponent(tournamentDay) : "";
    var request = Promise.all([
      cachedFetchJson(base + "/api/player-crm?publicLevels=1", "public-levels", 5 * 60 * 1000, { cache: "default" })
        .catch(function () { return { levelRows: [], failed: true }; }),
      cachedFetchJson(
        base + "/api/promo/daily-poker/winners" + suffix + joiner + "limit=100" + dailyRangeQuery,
        "club-news-daily:" + (tournamentDay || "latest") + ":" + suffix,
        60 * 1000,
        { cache: "default" }
      )
        .catch(function () { return { winners: [], failed: true }; }),
      clubTournamentSnapshotsReady().catch(function () { return {}; }),
    ]).then(function (results) {
      if ((results[0] && results[0].failed) || (results[1] && results[1].failed)) {
        throw new Error("club news source unavailable");
      }
      var players = (results[0] && Array.isArray(results[0].levelRows) ? results[0].levelRows : []).map(function (row) {
        return Object.assign({}, row, {
          userId: row && (row.profileId || row.userId || row.accountId || row.dtId) || "",
          pokerPlusNickname: row && (row.pokerPlusNickname || row.ratingNick || row.nickname || row.nick) || "",
          pokerPlusName: row && (row.pokerPlusName || row.name || row.displayName) || "",
        });
      });
      clubProfileByNick = {};
      clubProfileLookupPromises = {};
      var ambiguousClubProfileNicks = {};
      players.forEach(function (row) {
        var snapshot = friendSnapshot(row, results[2]);
        var league1Place = Math.max(0, Number(snapshot && snapshot.league1Place) || 0);
        var league2Place = Math.max(0, Number(snapshot && snapshot.league2Place) || 0);
        var ratingLeague = league1Place && (!league2Place || league1Place <= league2Place) ? 1 : (league2Place ? 2 : 0);
        var profile = {
          id: friendId(row),
          avatar: friendAvatar(row) || clubNewsFallbackAvatar(row && row.pokerPlusNickname),
          poker21Linked: !!String(row && (row.p21Id || row.poker21Id || row.pokerPlusUserId) || "").trim(),
          level: Math.max(0, Number(row && (row.statusLevel || row.level)) || 0),
          ratingLeague: ratingLeague,
          ratingPlace: ratingLeague === 1 ? league1Place : (ratingLeague === 2 ? league2Place : 0),
        };
        friendRatingNickCandidates(row).forEach(function (nickname) {
          nicknameMatchKeys(nickname).forEach(function (key) {
          if (!key || ambiguousClubProfileNicks[key]) return;
          if (clubProfileByNick[key] && clubProfileByNick[key].id !== profile.id) {
            delete clubProfileByNick[key];
            ambiguousClubProfileNicks[key] = true;
            return;
          }
          clubProfileByNick[key] = profile;
          });
        });
      });
      var winners = results[1] && Array.isArray(results[1].winners) ? results[1].winners : [];
      var nextClubEvents = stableClubEvents(
        buildClubEventsFromRows(players, winners, results[2]),
        []
      );
      // Wins are the default tab and must not wait for the optional wall feed.
      // Publish the core club news as soon as its two primary sources settle;
      // wall posts continue loading independently in the background.
      clubEvents = nextClubEvents;
      clubNewsLoaded = true;
      clubNewsLoading = false;
      clubNewsUpdatedAt = Date.now();
      clubNewsRetryCount = 0;
      writeClubEventsCache(clubEvents);
      renderClubNews();
      if (newsModalMode === "club") renderModalList(activeModalEvents());

      if (!clubWallLoadPromise) {
        var wallRequest = loadClubWallEvents(players, tournamentDay).then(function (wallEvents) {
          clubWallEvents = Array.isArray(wallEvents) ? wallEvents : [];
        }).catch(function () {
          return [];
        }).finally(function () {
          clubWallLoading = false;
          if (clubWallLoadPromise === wallRequest) clubWallLoadPromise = null;
          if (newsModalMode === "club" && clubNewsTab === "wall") renderModalList(clubWallEvents);
        });
        clubWallLoading = true;
        clubWallLoadPromise = wallRequest;
      }
    }).catch(function () {
      clubNewsLoading = true;
      renderClubNews();
      scheduleClubNewsRetry();
    }).finally(function () {
      if (clubNewsLoadPromise === request) clubNewsLoadPromise = null;
    });
    clubNewsLoadPromise = request;
    return request;
  }

  function init() {
    events = readRenderedEventsCache();
    clubEvents = readClubEventsCache();
    // The generated tournament feed is already on the page. Use it for the
    // first paint instead of holding the ticker behind two network requests.
    // Remote data still replaces this snapshot with real profiles and daily
    // poker winners as soon as both requests finish.
    if (!clubEvents.length && clubNewsStaticRows().length) {
      clubEvents = buildClubEventsFromRows([], []);
    }
    clubNewsLoaded = clubEvents.length > 0;
    mountWhenProfileReady();
    loadClubNews();
    window.addEventListener("poker-profile-friends-ready", function (event) {
      var readyFriends = event && event.detail && Array.isArray(event.detail.friends)
        ? event.detail.friends
        : null;
      load(readyFriends);
    });
    window.addEventListener("poker-auth-changed", function () {
      lastFriendsSignature = "";
      lastLoadAt = 0;
      friendNewsLoading = true;
      friendNewsLoaded = false;
      events = [];
      try { sessionStorage.removeItem(RENDERED_EVENTS_CACHE_KEY); } catch (error) {}
      render();
      load();
      loadClubNews();
    });
    setInterval(function () {
      if (typeof document !== "undefined" && document.hidden) return;
      // The friends feed is hidden until the user opens it. Do not wake five
      // unrelated achievement APIs in the background before that first open.
      if (friendNewsLoaded || (el("homeFriendNewsModal") && !el("homeFriendNewsModal").hidden && newsModalMode === "friends")) load();
      loadClubNews();
    }, 15 * 60 * 1000);
  }

  window.pokerReadCachedPlayerNews = readPlayerNewsCache;

  function playerProgressEvents(id, nick) {
    var nickKey = matchKey(nick);
    return [
      LEVEL_EVENTS_KEY,
      CLUB_LEVEL_EVENTS_KEY,
      RATING_RISE_EVENTS_KEY,
      CLUB_RATING_RISE_EVENTS_KEY,
    ].reduce(function (rows, key) {
      return rows.concat(readJson(key, []));
    }, []).filter(function (row, index, rows) {
      if (!row || !isRecentEvent(row.at)) return false;
      var matches = !!id && String(row.actorId || "").trim() === id;
      if (!matches && nickKey) matches = matchKey(row.actorNick) === nickKey;
      if (!matches && nickKey && Array.isArray(row.affectedActorNicks)) {
        matches = row.affectedActorNicks.some(function (value) { return matchKey(value) === nickKey; });
      }
      if (!matches && nickKey) {
        var text = String(row.text || "").trim();
        matches = matchKey(text.slice(0, nick.length)) === nickKey &&
          (!text.charAt(nick.length) || /\s/.test(text.charAt(nick.length)));
      }
      return matches && rows.findIndex(function (candidate) { return candidate && candidate.id === row.id; }) === index;
    });
  }

  window.pokerGetPlayerNews = function (identity, options) {
    options = options || {};
    var player = identity && typeof identity === "object" ? identity : {};
    var id = String(player.userId || player.accountId || player.id || "").trim();
    var nick = String(player.pokerPlusNickname || player.ratingNick || player.nick || player.name || "").replace(/^@+/, "").trim();
    if (!nick) return Promise.resolve([]);
    var base = apiBase();
    var suffix = authSuffix();
    var joiner = suffix ? "&" : "?";
    var playerCacheKey = matchKey(nick);
    var pseudoFriend = {
      userId: id || ("player:" + matchKey(nick)),
      accountId: String(player.accountId || id || "").trim(),
      p21Id: String(player.p21Id || player.poker21Id || player.pokerPlusUserId || "").trim(),
      pokerPlusNickname: nick,
      pokerPlusName: String(player.pokerPlusName || player.displayName || "").trim(),
      profileBirthDate: String(player.profileBirthDate || player.birthDate || "").trim(),
      avatarUrl: String(player.avatarUrl || player.avatar || "").trim(),
    };
    var emptyRows = Promise.resolve({ rows: [] });
    var emptyWinners = Promise.resolve({ winners: [] });
    var snapshotsPromise = tournamentSnapshotsReady([pseudoFriend]);
    var dailyPromise = base
      ? cachedFetchJson(base + "/api/promo/daily-poker/winners" + suffix + joiner + "limit=50", "player-daily:" + playerCacheKey + ":" + suffix, 60 * 1000, { cache: "default" })
        .catch(function () { return { winners: [] }; })
      : emptyWinners;
    var sngPromise = base
      ? cachedFetchJson(base + "/api/sng-champions?mode=achievements", "player-sng", 5 * 60 * 1000, { cache: "default" })
        .catch(function () { return { rows: [] }; })
      : emptyRows;
    var choicePromise = base
      ? cachedFetchJson(base + "/api/club-choice-vote?mode=achievements", "player-choice", 5 * 60 * 1000, { cache: "default" })
        .catch(function () { return { rows: [] }; })
      : emptyRows;
    snapshotsPromise.then(function (snapshots) {
      if (typeof options.onUpdate !== "function") return;
      var quickRows = attachFriendAvatars(
        mergeRelatedPlayerEvents(recentTournamentEvents([pseudoFriend], snapshots || {}).concat(
          birthdayEvents([pseudoFriend]),
          playerProgressEvents(id, nick),
          readPlayerNewsCache(identity)
        )),
        [pseudoFriend]
      ).sort(function (a, b) { return eventTime(b && b.at) - eventTime(a && a.at); })
        .filter(function (row, index, rows) {
          return row && rows.findIndex(function (candidate) { return candidate.id === row.id; }) === index;
        }).slice(0, MAX_EVENTS);
      if (quickRows.length) options.onUpdate(quickRows);
    }).catch(function () {});
    return Promise.all([
      snapshotsPromise,
      dailyPromise,
      sngPromise,
      choicePromise,
    ]).then(function (results) {
      var snapshots = results[0] || {};
      var history = recentTournamentEvents([pseudoFriend], snapshots);
      var daily = winnerEvents(
        [pseudoFriend],
        results[1] && Array.isArray(results[1].winners) ? results[1].winners : []
      );
      var achievements = achievementEvents(
        [pseudoFriend],
        results[2] && Array.isArray(results[2].rows) ? results[2].rows : [],
        results[3] && Array.isArray(results[3].rows) ? results[3].rows : []
      );
      var birthdays = birthdayEvents([pseudoFriend]);
      var progress = playerProgressEvents(id, nick);
      var cached = readRenderedEventsCache().filter(function (row) {
        if (!row || row.id === "empty") return false;
        if (id && String(row.actorId || "").trim() === id) return true;
        if (nick && matchKey(row.actorNick) === matchKey(nick)) return true;
        var text = String(row.text || "").trim();
        return !!nick &&
          matchKey(text.slice(0, nick.length)) === matchKey(nick) &&
          (!text.charAt(nick.length) || /\s/.test(text.charAt(nick.length)));
      });
      var rows = attachFriendAvatars(mergeRelatedPlayerEvents(history.concat(daily, achievements, birthdays, progress, cached)), [pseudoFriend])
        .sort(function (a, b) { return eventTime(b && b.at) - eventTime(a && a.at); })
        .filter(function (row, index, rows) {
          return row && rows.findIndex(function (candidate) { return candidate.id === row.id; }) === index;
        })
        .slice(0, MAX_EVENTS);
      writePlayerNewsCache(identity, rows);
      return rows;
    }).catch(function () { return []; });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
