(function initHomeFriendNews() {
  "use strict";

  var LEVELS_KEY = "poker_home_friend_levels_v1";
  var LEVEL_EVENTS_KEY = "poker_home_friend_level_events_v1";
  var TOURNAMENT_SNAPSHOTS_KEY = "poker_home_friend_tournament_snapshots_v2";
  var GENERATED_EVENTS_KEY = "poker_home_friend_generated_events_v6";
  var FRIEND_IDS_KEY = "poker_home_friend_ids_v3";
  var MAX_EVENTS = 50;
  var RECENT_EVENT_MS = 60 * 24 * 60 * 60 * 1000;
  var ROTATE_MS = 4600;
  var rotateTimer = null;
  var clubRotateTimer = null;
  var events = [];
  var clubEvents = [];
  var activeIndex = 0;
  var clubActiveIndex = 0;
  var eventFeedback = {};
  var eventCommentsOpen = {};
  var eventCommentReplies = {};
  var eventCommentDrafts = {};
  var newsModalMode = "friends";
  var friendNewsLoading = true;
  var friendNewsLoaded = false;
  var lastFriendsSignature = "";
  var lastLoadAt = 0;
  var loadSequence = 0;
  var REMOTE_CACHE_PREFIX = "poker_home_friend_news_remote_v1:";
  var RENDERED_EVENTS_CACHE_KEY = "poker_home_friend_news_rendered_v1";
  var PLAYER_EVENTS_CACHE_PREFIX = "poker_player_news_rendered_v1:";
  var CLUB_EVENTS_CACHE_KEY = "poker_home_club_news_rendered_v8";
  var clubNewsLoading = true;
  var clubNewsLoaded = false;
  var clubNewsLoadPromise = null;
  var clubNewsRetryTimer = 0;
  var clubNewsRetryCount = 0;
  var clubProfileByNick = {};
  var homeNewsLongPressTimer = 0;
  var homeNewsLongPressTriggered = false;
  var newsProfileReturnState = null;
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
      return (Array.isArray(rows) ? rows : []).filter(function (row) {
        return row && row.id && !isUndatedTournamentSnapshotEvent(row) &&
          (row.type === "birthday" || isRecentEvent(row.at));
      }).slice(0, MAX_EVENTS);
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
      var rows = JSON.parse(sessionStorage.getItem(CLUB_EVENTS_CACHE_KEY) || "[]");
      return (Array.isArray(rows) ? rows : []).filter(function (row) {
        return row && row.id && row.id !== "club-empty" && row.id !== "club-loading" && isCurrentClubEvent(row);
      }).slice(0, MAX_EVENTS);
    } catch (error) {
      return [];
    }
  }

  function writeClubEventsCache(rows) {
    try {
      sessionStorage.setItem(CLUB_EVENTS_CACHE_KEY, JSON.stringify(
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
      return stored.rows.filter(function (row) {
        return row && row.id && !isUndatedTournamentSnapshotEvent(row) &&
          (row.type === "birthday" || isRecentEvent(row.at));
      }).slice(0, MAX_EVENTS);
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
    return fetch(url, requestOptions || {}).then(function (response) {
      return response.json();
    }).then(function (data) {
      try {
        sessionStorage.setItem(REMOTE_CACHE_PREFIX + cacheKey, JSON.stringify({ at: Date.now(), data: data }));
      } catch (error) {}
      return data;
    });
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
    if (typeof window.pokerOpenChatUserModalSafe === "function") {
      window.pokerOpenChatUserModalSafe(id, name || "Игрок", avatar || "");
      return true;
    }
    if (typeof window.openChatUserModalById === "function" && window.openChatUserModalById.__pokerFallback !== true) {
      window.openChatUserModalById(id, name || "Игрок", avatar || "");
      return true;
    }
    if (typeof window.pokerEnsureScriptDomains === "function") {
      Promise.resolve(window.pokerEnsureScriptDomains(["chat"])).then(function () {
        if (typeof window.openChatUserModalById === "function") {
          window.openChatUserModalById(id, name || "Игрок", avatar || "");
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
            '<span class="home-friend-news__label">Новости клуба · итоги</span>' +
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
              '<button type="button" class="home-friend-news-modal__close" data-home-friend-news-close aria-label="Закрыть">×</button>' +
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
    return String(row && (row.pokerPlusNickname || row.pokerPlusName || row.contactName || row.chatDisplayName || row.userName) || "Ваш друг")
      .replace(/^@+/, "")
      .trim();
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
    return relaxed && relaxed !== exact && relaxed.length >= 3 ? [exact, relaxed] : [exact];
  }

  function clubProfileForNick(value) {
    var keys = nicknameMatchKeys(value);
    for (var i = 0; i < keys.length; i += 1) {
      if (clubProfileByNick[keys[i]]) return clubProfileByNick[keys[i]];
    }
    return null;
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

  function isDailyClubEvent(row) {
    return String(row && row.id || "").indexOf("daily:") === 0;
  }

  function isCurrentClubEvent(row) {
    if (!row || !row.at) return false;
    var tournamentDay = clubTournamentDayKey();
    if (isDailyClubEvent(row)) {
      return tournamentDay ? eventDayKey(row.at) === tournamentDay : isPreviousCalendarDay(row.at);
    }
    return tournamentDay ? eventDayKey(row.at) === tournamentDay : isRecentEvent(row.at);
  }

  function compareClubEvents(a, b) {
    var sourceOrder = Number(isDailyClubEvent(a)) - Number(isDailyClubEvent(b));
    var amountOrder = Math.max(0, Number(b && b.prizeAmount) || 0) - Math.max(0, Number(a && a.prizeAmount) || 0);
    return sourceOrder || amountOrder || eventTime(b && b.at) - eventTime(a && a.at);
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
      var level = Math.max(0, Number(friend && friend.statusLevel) || 0);
      if (!id || !level) return;
      next[id] = level;
      if (previous[id] && level > Number(previous[id])) {
        savedEvents.unshift({
          id: "level:" + id + ":" + level,
          type: "level",
          icon: "♠",
          text: friendName(friend) + " поднялся на " + level + " уровень",
          at: new Date().toISOString(),
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

  function collectTournamentEvents(friends, snapshots) {
    var next = {};
    (friends || []).forEach(function (friend) {
      var id = friendId(friend);
      var current = friendSnapshot(friend, snapshots);
      if (!id || !current) return;
      next[id] = current;
    });
    writeJson(TOURNAMENT_SNAPSHOTS_KEY, next);
    return saveGeneratedEvents(readJson(GENERATED_EVENTS_KEY, []).filter(function (row) {
      return !isUndatedTournamentSnapshotEvent(row) &&
        String(row && row.id || "").indexOf("achievement:totalReward:") !== 0;
    }));
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
      var action = place === 1
        ? "одержал победу" + (reward > 0 ? " — " + formatRub(reward) : "")
        : reward >= 100000
          ? "оформил занос от 100К — " + formatRub(reward)
          : reward >= 50000
            ? "оформил занос 50–99К — " + formatRub(reward)
            : reward > 0
              ? "получил " + formatRub(reward) + " призовых"
              : "";
      if (!action) return null;
      var detail = String(row && row.tournament || "").trim();
      var displayName = String(row && row.nick || "").trim() || friendName(friend);
      var stableActorKey = "rating:" + (matchKey(displayName) || matchKey(friendName(friend)));
      return {
        id: "history:tournament:" + stableActorKey + ":" + String(row.dateLabel || row.date) + ":" + place + ":" + reward + ":" + detail,
        type: place === 1 || reward >= 50000 ? "achievement" : "rating",
        icon: place === 1 ? "◆" : "▲",
        text: displayName + " " + action + (detail ? " · " + detail : ""),
        prizeAmount: reward,
        at: row.date,
        target: "winter-rating",
        actorId: friendId(friend),
        // Keep the snapshot nickname authoritative. The matched profile row
        // may be stale and must not silently change which player opens.
        actorNick: displayName,
      };
    }).filter(Boolean).slice(0, MAX_EVENTS);
  }

  function recentTournamentAchievementEvents(friends, snapshots) {
    var byNick = {};
    (friends || []).forEach(function (friend) {
      friendRatingNickCandidates(friend).forEach(function (nick) {
        nicknameMatchKeys(nick).forEach(function (key) {
          if (key && !byNick[key]) byNick[key] = friend;
        });
      });
    });
    var out = [];
    (Array.isArray(snapshots && snapshots.__recentEvents) ? snapshots.__recentEvents : []).forEach(function (row) {
      var friend = nicknameMatchKeys(row && (row.nick || row.nickKey)).map(function (key) { return byNick[key]; }).find(Boolean);
      if (!friend) return;
      var reward = Number(row && row.reward) || 0;
      var place = Number(row && row.place) || 0;
      var name = String(row && row.nick || "").trim() || friendName(friend);
      var stableActorKey = "rating:" + (matchKey(name) || matchKey(friendName(friend)));
      var baseId = stableActorKey + ":" + String(row && (row.dateLabel || row.date)) + ":" + place + ":" + reward;
      var shared = {
        type: "achievement",
        icon: "◆",
        prizeAmount: reward,
        at: row && row.date,
        target: "winter-rating",
        actorId: friendId(friend),
        actorNick: name,
      };
      if (place === 1) {
        out.push(Object.assign({}, shared, {
          id: "history:achievement:king:" + baseId,
          text: name + " продвинулся в ачивке «Король турниров»: " +
            Math.max(1, Number(row && row.firstPlacesCount) || 1) + " побед",
        }));
      }
      if (reward >= 100000) {
        out.push(Object.assign({}, shared, {
          id: "history:achievement:100k:" + baseId,
          text: name + " продвинулся в ачивке «Занос от 100к»: " +
            Math.max(1, Number(row && row.bigWins100Count) || 1),
        }));
      } else if (reward >= 50000) {
        out.push(Object.assign({}, shared, {
          id: "history:achievement:50k:" + baseId,
          text: name + " продвинулся в ачивке «Занос от 50 до 100к»: " +
            Math.max(1, Number(row && row.bigWins50Count) || 1),
        }));
      }
    });
    return out.slice(0, MAX_EVENTS);
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
      ["❤️", "🔥", "👏"].map(function (emoji) {
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

  function eventFeedbackHtml(row) {
    var rowId = String(row && row.id || "");
    var feedback = eventFeedback[rowId] || {};
    var reactions = feedback.reactions || {};
    var reactionButtons = ["❤️", "🔥", "👏"].map(function (emoji) {
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
    var clubKindHtml = newsModalMode === "club"
      ? '<span class="home-friend-news-modal__kind home-friend-news-modal__kind--' +
        (String(rowId).indexOf("daily:") === 0 ? "daily" : "mtt") + '">' +
        (String(rowId).indexOf("daily:") === 0 ? '<span aria-hidden="true">🎰</span> КРУТКА ДНЯ' : '<span aria-hidden="true">🏆</span> ВЫИГРЫШ В МТТ') + "</span>"
      : "";
    var commentsHtml = comments.length ? comments.map(function (comment) {
      var name = String(comment.author || "Игрок");
      var avatar = String(comment.authorAvatar || "");
      var profileId = String(comment.authorProfileId || comment.memberId || "");
      var commentReactions = comment.reactions || {};
      var commentReactionHtml = ["❤️", "🔥", "👏"].map(function (emoji) {
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
    return '<span class="chat-user-modal__news-actions">' +
      reactionButtons +
      '<button type="button" class="chat-user-modal__news-comment-toggle' +
        (eventCommentsOpen[rowId] ? " chat-user-modal__news-comment-toggle--active" : "") +
        '" data-home-news-comments>💬 <b>Комментировать</b>' +
        (feedback.commentCount ? "<span>" + Number(feedback.commentCount) + "</span>" : "") +
      "</button>" + clubKindHtml + "</span>" +
      '<span class="chat-user-modal__news-comments"' + (eventCommentsOpen[rowId] ? "" : " hidden") + ">" +
        '<span class="chat-user-modal__news-comments-list">' + commentsHtml + "</span>" +
        '<form class="chat-user-modal__news-comment-form" data-home-news-comment-form>' +
          replyPreview +
          '<span class="home-news-comment-input-wrap"><button type="button" class="home-news-comment-emoji-btn" data-home-comment-emoji-toggle aria-label="Выбрать смайл">☺</button>' +
          '<input type="text" maxlength="500" value="' + esc(draft) + '" placeholder="Написать комментарий…" aria-label="Комментарий к событию">' + emojiPicker + "</span>" +
          '<button type="submit">Отправить</button>' +
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

  function eventHtml(row, ticker) {
    var timeLabel = row.type === "birthday" && Number(row.upcomingDays) > 0
      ? "через " + Number(row.upcomingDays) + " дн."
      : relativeTime(row.at);
    var linkedClubProfile = newsModalMode === "club" ? clubProfileForNick(row && row.actorNick) : null;
    // In club news only an exact, public nickname mapping may open a profile.
    // Snapshot actor ids can be stale, synthetic, or belong to another player.
    var eventPlayerId = newsModalMode === "club"
      ? String(linkedClubProfile && linkedClubProfile.id || "")
      : String(row && row.actorId || "");
    var avatar = String(linkedClubProfile && linkedClubProfile.avatar || row && row.actorAvatar || "").trim();
    var visual = avatar
      ? '<img class="home-friend-news__avatar" src="' + esc(avatar) + '" alt="" loading="lazy" decoding="async">'
      : eventIconSvg(row.type);
    var playerStyle = row && row.playerAccent && row.playerRgb
      ? ' style="--friend-news-accent:' + esc(row.playerAccent) + ';--friend-news-rgb:' + esc(row.playerRgb) + '"'
      : "";
    var playerAttrs = !ticker && eventPlayerId
      ? ' data-home-news-player-id="' + esc(eventPlayerId) + '"' +
        ' data-home-news-player-name="' + esc(row.actorNick || "Игрок") + '"' +
        ' data-home-news-player-avatar="' + esc(avatar) + '"' +
        ' role="button" tabindex="0"'
      : "";
    return '<span class="' + (ticker ? "home-friend-news__slide" : "home-friend-news-modal__item") +
      ' home-friend-news-event--' + esc(row.type) +
      '" data-home-news-target="' + esc(row.target || "") + '"' +
      (ticker ? "" : ' data-home-news-event-id="' + esc(row.id || "") + '"') + playerAttrs + playerStyle + ">" +
      '<span class="' + (ticker ? "home-friend-news__event-icon" : "home-friend-news-modal__icon") +
      ' home-friend-news--' + esc(row.type) + (avatar ? " home-friend-news__event-icon--avatar" : "") +
      '" aria-hidden="true">' + visual + "</span>" +
      '<span class="' + (ticker ? "home-friend-news__event-text" : "home-friend-news-modal__copy") + '">' +
      (ticker ? eventTextHtml(row.text) : "<strong>" + eventTextHtml(row.text) + "</strong>" +
        (row.image ? '<img class="chat-user-modal__wall-image" src="' + esc(row.image) + '" alt="Фото к записи" loading="lazy">' : "") +
        "<small>" + esc(timeLabel) + "</small>" + eventFeedbackHtml(row)) +
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
      return '<section class="home-friend-news-modal__day-group">' +
        '<div class="home-friend-news-modal__date"><span>' + esc(eventDateLabel(group.at, true)) + "</span></div>" +
        '<div class="home-friend-news-modal__day-events">' +
          group.rows.map(function (row) { return eventHtml(row, false); }).join("") +
        '</div><div class="home-friend-news-modal__day-count">Всего за день: <strong>' + count + " " + countWord + "</strong></div>" +
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
    root.hidden = false;
    track.innerHTML = displayRows.map(function (row) { return eventHtml(row, true); }).join("");
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
    var hasRealRows = Array.isArray(rows) && rows.some(function (row) { return row && row.id !== "empty"; });
    if (newsModalMode === "club" && clubNewsLoading && !hasRealRows) {
      list.innerHTML = '<div class="home-friend-news-modal__loading" role="status">' +
        '<span aria-hidden="true"></span><strong>Загружаем новости клуба…</strong>' +
        '<small>Собираем все события за вчера</small></div>';
      return;
    }
    if (friendNewsLoading && !friendNewsLoaded && !hasRealRows) {
      list.innerHTML = '<div class="home-friend-news-modal__loading" role="status">' +
        '<span aria-hidden="true"></span><strong>Загружаем новости всех друзей…</strong>' +
        '<small>Собираем результаты и достижения игроков</small></div>';
      return;
    }
    var snapshot = Array.isArray(rows) ? rows.slice() : [];
    list.innerHTML = snapshot[0] && snapshot[0].id === "empty"
      ? '<div class="home-friend-news-modal__empty"><span aria-hidden="true">♣</span><strong>Новостей пока нет</strong><small>Здесь появятся повышения уровня, выигрыши, дни рождения и новые ачивки друзей.</small></div>'
      : modalEventsHtml(snapshot);
  }

  function activeModalEvents() {
    return newsModalMode === "club" ? clubEvents : events;
  }

  function syncNewsModalHeading() {
    var title = el("homeFriendNewsModalTitle");
    var eyebrow = el("homeFriendNewsModalEyebrow");
    var modal = el("homeFriendNewsModal");
    if (title) title.textContent = newsModalMode === "club" ? "Новости клуба" : "Новости друзей";
    if (eyebrow) eyebrow.textContent = newsModalMode === "club" ? "Клуб · итоги игровых дней" : "Друзья и клуб";
    if (modal) modal.classList.toggle("home-friend-news-modal--club", newsModalMode === "club");
  }

  function loadActiveModalFeedback(rows) {
    var ids = (Array.isArray(rows) ? rows : []).map(function (row) { return String(row && row.id || ""); })
      .filter(function (id) { return id && id !== "empty" && id !== "club-empty"; });
    if (!ids.length) return;
    feedbackRequest({ action: "list", eventIds: ids }).then(function (data) {
      Object.assign(eventFeedback, data.feedback || {});
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
  }

  function openClubModal() {
    if (!clubEvents.length) loadClubNews(true);
    var modal = el("homeFriendNewsModal");
    if (!modal) return;
    newsModalMode = "club";
    syncNewsModalHeading();
    renderModalList(clubEvents);
    modal.hidden = false;
    document.body.classList.add("home-friend-news-modal-open");
    loadActiveModalFeedback(clubEvents);
  }

  function closeModal() {
    var modal = el("homeFriendNewsModal");
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove("home-friend-news-modal-open");
  }

  function bind() {
    var open = el("homeFriendNewsOpen");
    var clubOpen = el("homeClubNewsOpen");
    var modal = el("homeFriendNewsModal");
    if (open && open.dataset.friendNewsBound !== "1") {
      open.dataset.friendNewsBound = "1";
      open.addEventListener("click", openModal);
    }
    if (clubOpen && clubOpen.dataset.clubNewsBound !== "1") {
      clubOpen.dataset.clubNewsBound = "1";
      clubOpen.addEventListener("click", openClubModal);
    }
    if (modal && modal.dataset.friendNewsBound !== "1") {
      modal.dataset.friendNewsBound = "1";
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
        if (playerId) {
          var playerName = playerCard.getAttribute("data-home-news-player-name") || "Игрок";
          var linkedProfile = clubProfileForNick(playerName);
          // Club event snapshots can contain a stale or mismatched actor id.
          // The visible poker nickname is the authoritative identity here.
          if (newsModalMode === "club" && linkedProfile && linkedProfile.id) {
            playerId = linkedProfile.id;
          } else if (String(playerId).indexOf("rating:") === 0 && linkedProfile) {
            playerId = linkedProfile.id || playerId;
          }
          handoffNewsModalToPlayer(
            playerId,
            playerName,
            linkedProfile && linkedProfile.avatar || playerCard.getAttribute("data-home-news-player-avatar") || ""
          );
          return;
        }
        var target = event.target.closest("[data-home-news-target]");
        var view = target && target.getAttribute("data-home-news-target");
        if (view && typeof setView === "function") {
          closeModal();
          setView(view);
        }
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
        if (submit) submit.disabled = true;
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
          eventFeedback[eventId] = data.feedback || {};
          eventCommentsOpen[eventId] = true;
          delete eventCommentReplies[eventId];
          delete eventCommentDrafts[eventId];
          renderModalList(activeModalEvents());
        }).catch(function (error) {
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
    if (signature && signature === lastFriendsSignature && Date.now() - lastLoadAt < 30000) return;
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
    friendsPromise.then(function (friendsPayload) {
      if (requestSequence !== loadSequence) return null;
      var friends = friendsPayload && Array.isArray(friendsPayload.friends) ? friendsPayload.friends : [];
      if (!friends.length) {
        friendNewsLoading = false;
        friendNewsLoaded = true;
        if (!events.some(function (row) { return row && row.id !== "empty"; })) {
          events = [];
          render();
        }
        return null;
      }
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
      var nextEvents = attachFriendAvatars(collectLevelEvents(friends).concat(
        collectNewFriendEvents(friends),
        personalPostEvents(friends, results[7] && results[7].posts),
        collectTournamentEvents(friends, tournamentSnapshots),
        recentTournamentEvents(friends, tournamentSnapshots),
        recentTournamentAchievementEvents(friends, tournamentSnapshots),
        winnerEvents(friends, winners),
        birthdayEvents(friends),
        achievementEvents(friends, sngRows, choiceRows)
      ), friends)
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

  function buildClubEventsFromRows(players, winners) {
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
    return attachFriendAvatars(
      recentTournamentEvents(allPlayers, snapshots).concat(
        recentTournamentAchievementEvents(allPlayers, snapshots),
        winnerEvents(allPlayers, Array.isArray(winners) ? winners : [])
      ),
      allPlayers
    ).filter(function (row) {
      return isCurrentClubEvent(row);
    }).sort(compareClubEvents).filter(function (row, index, rows) {
      return row && rows.findIndex(function (candidate) { return candidate.id === row.id; }) === index;
    }).slice(0, MAX_EVENTS);
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
    return rows.sort(compareClubEvents).slice(0, MAX_EVENTS);
  }

  function loadClubNews(force) {
    var preservedClubEvents = clubEvents.slice();
    var base = apiBase();
    if (!base) {
      clubNewsLoading = true;
      renderClubNews();
      scheduleClubNewsRetry();
      return;
    }
    if (clubNewsLoadPromise) return clubNewsLoadPromise;
    clubNewsLoading = true;
    renderClubNews();
    var suffix = authSuffix();
    var joiner = suffix ? "&" : "?";
    var tournamentDay = clubTournamentDayKey();
    var dailyRangeQuery = tournamentDay ? "&from=" + encodeURIComponent(tournamentDay) + "&to=" + encodeURIComponent(tournamentDay) : "";
    var request = Promise.all([
      cachedFetchJson(base + "/api/player-crm?publicLevels=1", "club-news-public-levels-v2", 5 * 60 * 1000, { cache: "default" })
        .catch(function () { return { levelRows: [], failed: true }; }),
      cachedFetchJson(
        base + "/api/promo/daily-poker/winners" + suffix + joiner + "limit=100" + dailyRangeQuery,
        "club-news-daily:" + (tournamentDay || "latest") + ":" + suffix,
        60 * 1000,
        { cache: "default" }
      )
        .catch(function () { return { winners: [], failed: true }; }),
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
      var ambiguousClubProfileNicks = {};
      players.forEach(function (row) {
        var profile = { id: friendId(row), avatar: friendAvatar(row) || clubNewsFallbackAvatar(row && row.pokerPlusNickname) };
        nicknameMatchKeys(row && row.pokerPlusNickname).forEach(function (key) {
          if (!key || ambiguousClubProfileNicks[key]) return;
          if (clubProfileByNick[key] && clubProfileByNick[key].id !== profile.id) {
            delete clubProfileByNick[key];
            ambiguousClubProfileNicks[key] = true;
            return;
          }
          clubProfileByNick[key] = profile;
        });
      });
      var winners = results[1] && Array.isArray(results[1].winners) ? results[1].winners : [];
      var nextClubEvents = stableClubEvents(buildClubEventsFromRows(players, winners), preservedClubEvents);
      // Publish one complete snapshot only after both remote sources settle.
      // This prevents static tournament rows from flashing first and daily
      // poker events from jumping into the list a moment later.
      clubEvents = nextClubEvents;
      clubNewsLoaded = true;
      clubNewsLoading = false;
      clubNewsRetryCount = 0;
      writeClubEventsCache(clubEvents);
      renderClubNews();
      if (newsModalMode === "club") renderModalList(clubEvents);
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
    load();
    setInterval(function () {
      load();
      loadClubNews();
    }, 5 * 60 * 1000);
  }

  window.pokerReadCachedPlayerNews = readPlayerNewsCache;

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
        recentTournamentEvents([pseudoFriend], snapshots || {}).concat(
          recentTournamentAchievementEvents([pseudoFriend], snapshots || {}),
          birthdayEvents([pseudoFriend]),
          readPlayerNewsCache(identity)
        ),
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
      var tournamentAchievements = recentTournamentAchievementEvents([pseudoFriend], snapshots);
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
      var cached = readRenderedEventsCache().filter(function (row) {
        if (!row || row.id === "empty") return false;
        if (id && String(row.actorId || "").trim() === id) return true;
        if (nick && matchKey(row.actorNick) === matchKey(nick)) return true;
        var text = String(row.text || "").trim();
        return !!nick &&
          matchKey(text.slice(0, nick.length)) === matchKey(nick) &&
          (!text.charAt(nick.length) || /\s/.test(text.charAt(nick.length)));
      });
      var rows = attachFriendAvatars(history.concat(tournamentAchievements, daily, achievements, birthdays, cached), [pseudoFriend])
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
