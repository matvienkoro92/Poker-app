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
  var events = [];
  var activeIndex = 0;
  var lastFriendsSignature = "";
  var lastLoadAt = 0;
  var loadSequence = 0;
  var REMOTE_CACHE_PREFIX = "poker_home_friend_news_remote_v1:";
  var RENDERED_EVENTS_CACHE_KEY = "poker_home_friend_news_rendered_v1";

  function readRenderedEventsCache() {
    try {
      var rows = JSON.parse(sessionStorage.getItem(RENDERED_EVENTS_CACHE_KEY) || "[]");
      return (Array.isArray(rows) ? rows : []).filter(function (row) {
        return row && row.id && (row.type === "birthday" || isRecentEvent(row.at));
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
      if (typeof authQuerySafe === "function") return authQuerySafe();
      if (typeof getAuthQuery === "function") return getAuthQuery();
    } catch (error) {}
    return "";
  }

  function apiBase() {
    try { return typeof getApiBase === "function" ? getApiBase() : ""; } catch (error) { return ""; }
  }

  function ensureDom() {
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
            '<header class="home-friend-news-modal__header"><div><span>Друзья и клуб</span>' +
              '<h2 id="homeFriendNewsModalTitle">Новости друзей</h2></div>' +
              '<button type="button" class="home-friend-news-modal__close" data-home-friend-news-close aria-label="Закрыть">×</button>' +
            '</header><div class="home-friend-news-modal__list" id="homeFriendNewsList"></div>' +
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
        pokerPlusNickname: linked.pokerPlusNickname || linked.nickname || friend.pokerPlusNickname || "",
        pokerPlusName: linked.name || linked.pokerPlusName || "",
      });
    });
  }

  function matchKey(value) {
    var normalized = String(value == null ? "" : value).replace(/^@+/, "").trim().toLowerCase();
    try { normalized = normalized.normalize("NFKC"); } catch (error) {}
    return normalized.replace(/[\uFE0E\uFE0F]/g, "").replace(/\s+/g, "");
  }

  function eventTime(value) {
    var time = new Date(value || 0).getTime();
    return Number.isFinite(time) ? time : 0;
  }

  function formatRub(value) {
    return Math.max(0, Math.round(Number(value) || 0)).toLocaleString("ru-RU") + " ₽";
  }

  function isRecentEvent(value) {
    var time = eventTime(value);
    return !!time && time <= Date.now() + 86400000 && Date.now() - time <= RECENT_EVENT_MS;
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
    var previous = readJson(TOURNAMENT_SNAPSHOTS_KEY, null);
    var next = {};
    var savedEvents = readJson(GENERATED_EVENTS_KEY, []);
    (friends || []).forEach(function (friend) {
      var id = friendId(friend);
      var nickKey = matchKey(friend && friend.pokerPlusNickname);
      var current = nickKey && snapshots && snapshots[nickKey];
      if (!id || !current) return;
      next[id] = current;
      var before = previous && previous[id];
      if (!before) return;
      [
        { key: "bigWins50", title: "оформил новый занос 50–99К" },
        { key: "bigWins100", title: "оформил новый занос от 100К" },
        { key: "firstPlaces", title: "одержал новую победу в турнире" },
        { key: "top10Finishes", title: "получил новую ачивку «Топ-10 рейтинга»" },
        { key: "seasonCups", title: "получил новый сезонный кубок" },
        { key: "raffleWins", title: "продвинулся в ачивке «Золотой билет»" },
        { key: "luckyMonths", title: "получил новую ачивку «Счастливчик месяца»" },
      ].forEach(function (metric) {
        if (!Object.prototype.hasOwnProperty.call(before, metric.key)) return;
        var delta = Number(current[metric.key]) - Number(before[metric.key]);
        if (delta <= 0) return;
        savedEvents.unshift({
          id: "achievement:" + metric.key + ":" + id + ":" + Number(current[metric.key]),
          type: "achievement",
          icon: "◆",
          text: friendName(friend) + " " + metric.title + (delta > 1 ? " (+" + delta + ")" : ""),
          at: new Date().toISOString(),
          target: "winter-rating",
        });
      });
      var oldMillionaireTier = Number(before.millionaireTier) || 0;
      var newMillionaireTier = Number(current.millionaireTier) || 0;
      var oldTotalReward = Number(before.totalReward) || 0;
      var newTotalReward = Number(current.totalReward) || 0;
      if (Object.prototype.hasOwnProperty.call(before, "totalReward") && newTotalReward > oldTotalReward) {
        savedEvents.unshift({
          id: "achievement:totalReward:" + id + ":" + newTotalReward,
          type: "achievement",
          icon: "◆",
          text: friendName(friend) + " продвинулся в ачивке «Миллионер клуба»: " +
            formatRub(oldTotalReward) + " → " + formatRub(newTotalReward),
          at: new Date().toISOString(),
          target: "winter-rating",
        });
      }
      if (Object.prototype.hasOwnProperty.call(before, "millionaireTier") && newMillionaireTier > oldMillionaireTier) {
        savedEvents.unshift({
          id: "achievement:millionaire:" + id + ":" + newMillionaireTier,
          type: "achievement",
          icon: "◆",
          text: friendName(friend) + " открыл " + newMillionaireTier + " уровень ачивки «Миллионер клуба»",
          at: new Date().toISOString(),
          target: "winter-rating",
        });
      }
      [1, 2].forEach(function (league) {
        var key = league === 1 ? "league1Place" : "league2Place";
        var oldPlace = Number(before[key]) || 0;
        var newPlace = Number(current[key]) || 0;
        if (!oldPlace || !newPlace || newPlace >= oldPlace) return;
        savedEvents.unshift({
          id: "rating:league" + league + ":" + id + ":" + newPlace,
          type: "rating",
          icon: "▲",
          text: friendName(friend) + " поднялся в Лиге " + league + ": " + oldPlace + " → " + newPlace + " место",
          at: new Date().toISOString(),
          target: "winter-rating",
        });
      });
    });
    writeJson(TOURNAMENT_SNAPSHOTS_KEY, next);
    return saveGeneratedEvents(savedEvents);
  }

  function recentTournamentEvents(friends, snapshots) {
    var byNick = {};
    (friends || []).forEach(function (friend) {
      var key = matchKey(friend && friend.pokerPlusNickname);
      if (key && !byNick[key]) byNick[key] = friend;
    });
    return (Array.isArray(snapshots && snapshots.__recentEvents) ? snapshots.__recentEvents : []).map(function (row) {
      var friend = byNick[String(row && row.nickKey || "")];
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
      return {
        id: "history:tournament:" + friendId(friend) + ":" + String(row.dateLabel || row.date) + ":" + place + ":" + reward + ":" + detail,
        type: place === 1 || reward >= 50000 ? "achievement" : "rating",
        icon: place === 1 ? "◆" : "▲",
        text: displayName + " " + action + (detail ? " · " + detail : ""),
        at: row.date,
        target: "winter-rating",
        actorId: friendId(friend),
        actorNick: String(friend && friend.pokerPlusNickname || displayName).trim(),
      };
    }).filter(Boolean).slice(0, MAX_EVENTS);
  }

  function tournamentSnapshotsReady(friends) {
    var nicks = (friends || []).map(function (friend) {
      return String(friend && friend.pokerPlusNickname || "").trim();
    }).filter(Boolean);
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
      if (!friend || !isRecentEvent(winner && winner.lastWonAt)) return null;
      var prize = String((winner && (winner.lastPrize || winner.bestPrize || winner.prize)) || "").trim();
      return {
        id: "daily:" + String(winner.id || "") + ":" + String(winner.lastWonAt || winner.bestPrize || prize),
        type: "daily",
        icon: "★",
        text: friendName(friend) + " выиграл" + (prize ? " " + prize : "") + " в Крутке дня",
        at: winner.lastWonAt || "",
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

  function eventIconSvg(type) {
    var icons = {
      friend: '<svg viewBox="0 0 24 24"><path d="M8.2 11.2a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2Z"/><path d="M2.6 19.5v-1.1c0-2.8 2.5-5 5.6-5 1.2 0 2.3.3 3.2.9"/><path d="M16.7 10.1v7.2M13.1 13.7h7.2"/></svg>',
      level: '<svg viewBox="0 0 24 24"><path d="m12 3 4.3 4.3-2.2 2.2L12 7.4 9.9 9.5 7.7 7.3 12 3Z"/><path d="m12 9.3 4.3 4.3-2.2 2.2-2.1-2.1-2.1 2.1-2.2-2.2L12 9.3Z"/><path d="M5 20h14"/></svg>',
      rating: '<svg viewBox="0 0 24 24"><path d="M5 18V13M12 18V9M19 18V5"/><path d="m4 8 5-4 4 3 6-5"/><path d="M16 2h3v3"/></svg>',
      achievement: '<svg viewBox="0 0 24 24"><path d="M8 3h8v5a4 4 0 0 1-8 0V3Z"/><path d="M8 5H4v2a4 4 0 0 0 4 4M16 5h4v2a4 4 0 0 1-4 4M12 12v5M8 21h8M9 17h6"/></svg>',
      daily: '<svg viewBox="0 0 24 24"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/><circle cx="12" cy="12" r="4.3"/><path d="m12 9.3.8 1.7 1.9.2-1.4 1.3.4 1.9-1.7-.9-1.7.9.4-1.9-1.4-1.3 1.9-.2.8-1.7Z"/></svg>',
      birthday: '<svg viewBox="0 0 24 24"><path d="M4 12h16v8H4v-8ZM3 9h18v4H3V9Z"/><path d="M12 9v11M12 9H8.5a2.5 2.5 0 1 1 2.5-2.5L12 9Zm0 0h3.5A2.5 2.5 0 1 0 13 6.5L12 9Z"/></svg>',
      empty: '<svg viewBox="0 0 24 24"><path d="M8.5 19h7M10 15h4M12 3a6 6 0 0 1 3.8 10.6c-.9.7-1.3 1.2-1.3 2.4h-5c0-1.2-.4-1.7-1.3-2.4A6 6 0 0 1 12 3Z"/></svg>',
    };
    return icons[type] || icons.achievement;
  }

  function eventHtml(row, ticker) {
    var timeLabel = row.type === "birthday" && Number(row.upcomingDays) > 0
      ? "через " + Number(row.upcomingDays) + " дн."
      : relativeTime(row.at);
    return '<span class="' + (ticker ? "home-friend-news__slide" : "home-friend-news-modal__item") +
      ' home-friend-news-event--' + esc(row.type) +
      '" data-home-news-target="' + esc(row.target || "") + '">' +
      '<span class="' + (ticker ? "home-friend-news__event-icon" : "home-friend-news-modal__icon") +
      ' home-friend-news--' + esc(row.type) + '" aria-hidden="true">' + eventIconSvg(row.type) + "</span>" +
      '<span class="' + (ticker ? "home-friend-news__event-text" : "home-friend-news-modal__copy") + '">' +
      (ticker ? esc(row.text) : "<strong>" + esc(row.text) + "</strong><small>" + esc(timeLabel) + "</small>") +
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
      return '<section class="home-friend-news-modal__day-group">' +
        '<div class="home-friend-news-modal__date"><span>' + esc(eventDateLabel(group.at, true)) + "</span></div>" +
        '<div class="home-friend-news-modal__day-events">' +
          group.rows.map(function (row) { return eventHtml(row, false); }).join("") +
        "</div>" +
      "</section>";
    }).join("");
  }

  function showIndex(index, animate) {
    var track = el("homeFriendNewsTrack");
    var ticker = el("homeFriendNewsOpen");
    if (!track || !events.length) return;
    activeIndex = (index + events.length) % events.length;
    if (ticker) ticker.setAttribute("data-news-type", String(events[activeIndex].type || "empty"));
    if (!animate) track.classList.add("home-friend-news__track--instant");
    track.style.transform = "translateY(-" + (activeIndex * 100) + "%)";
    if (!animate) requestAnimationFrame(function () { track.classList.remove("home-friend-news__track--instant"); });
  }

  function startRotation() {
    clearInterval(rotateTimer);
    if (events.length < 2) return;
    rotateTimer = setInterval(function () { showIndex(activeIndex + 1, true); }, ROTATE_MS);
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
    renderModalList(events);
    showIndex(0, false);
    startRotation();
  }

  function renderModalList(rows) {
    var list = el("homeFriendNewsList");
    if (!list) return;
    var snapshot = Array.isArray(rows) ? rows.slice() : [];
    list.innerHTML = snapshot[0] && snapshot[0].id === "empty"
      ? '<div class="home-friend-news-modal__empty"><span aria-hidden="true">♣</span><strong>Новостей пока нет</strong><small>Здесь появятся повышения уровня, выигрыши, дни рождения и новые ачивки друзей.</small></div>'
      : modalEventsHtml(snapshot);
  }

  function openModal() {
    var modal = el("homeFriendNewsModal");
    if (!modal) return;
    renderModalList(events);
    modal.hidden = false;
    document.body.classList.add("home-friend-news-modal-open");
  }

  function closeModal() {
    var modal = el("homeFriendNewsModal");
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove("home-friend-news-modal-open");
  }

  function bind() {
    var open = el("homeFriendNewsOpen");
    var modal = el("homeFriendNewsModal");
    if (open && open.dataset.friendNewsBound !== "1") {
      open.dataset.friendNewsBound = "1";
      open.addEventListener("click", openModal);
    }
    if (modal && modal.dataset.friendNewsBound !== "1") {
      modal.dataset.friendNewsBound = "1";
      modal.addEventListener("click", function (event) {
      if (event.target.closest("[data-home-friend-news-close]")) {
        closeModal();
        return;
      }
      var target = event.target.closest("[data-home-news-target]");
      var view = target && target.getAttribute("data-home-news-target");
      if (view && typeof setView === "function") {
        closeModal();
        setView(view);
      }
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
    if (signature) lastFriendsSignature = signature;
    lastLoadAt = Date.now();
    var suffix = authSuffix();
    var joiner = suffix ? "&" : "?";
    var friendsPromise = suppliedFriends
      ? Promise.resolve({ ok: true, friends: suppliedFriends })
      : fetch(base + "/api/friends" + suffix, { cache: "no-store" }).then(function (response) { return response.json(); });
    friendsPromise.then(function (friendsPayload) {
      if (requestSequence !== loadSequence) return null;
      var friends = friendsPayload && Array.isArray(friendsPayload.friends) ? friendsPayload.friends : [];
      if (!friends.length) {
        if (!events.length || events[0].id === "empty") {
          events = [];
          render();
        }
        return null;
      }
      return Promise.all([
        Promise.resolve(friendsPayload),
        cachedFetchJson(base + "/api/promo/daily-poker/winners" + suffix + joiner + "limit=50", "daily:" + signature + ":" + suffix, 60 * 1000, { cache: "default" }),
        cachedFetchJson(base + "/api/sng-champions?mode=achievements", "sng", 5 * 60 * 1000, { cache: "default" })
          .catch(function () { return { rows: [] }; }),
        cachedFetchJson(base + "/api/club-choice-vote?mode=achievements", "choice", 5 * 60 * 1000, { cache: "default" })
          .catch(function () { return { rows: [] }; }),
        tournamentSnapshotsReady(friends),
        cachedFetchJson(base + "/api/raffles" + suffix + joiner + "mode=achievements", "raffles:" + suffix, 5 * 60 * 1000, { cache: "default" })
          .catch(function () { return { raffles: [] }; }),
        cachedFetchJson(base + "/api/player-crm?publicLevels=1", "public-levels", 5 * 60 * 1000, { cache: "default" })
          .catch(function () { return { levelRows: [] }; }),
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
      events = collectLevelEvents(friends).concat(
        collectNewFriendEvents(friends),
        collectTournamentEvents(friends, tournamentSnapshots),
        recentTournamentEvents(friends, tournamentSnapshots),
        winnerEvents(friends, winners),
        birthdayEvents(friends),
        achievementEvents(friends, sngRows, choiceRows)
      )
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
      writeRenderedEventsCache(events);
      render();
    }).catch(function () {});
  }

  function init() {
    events = readRenderedEventsCache();
    mountWhenProfileReady();
    window.addEventListener("poker-profile-friends-ready", function (event) {
      var supplied = event && event.detail && Array.isArray(event.detail.friends)
        ? event.detail.friends
        : null;
      load(supplied);
    });
    window.addEventListener("poker-auth-changed", function () {
      lastFriendsSignature = "";
      lastLoadAt = 0;
      events = [];
      try { sessionStorage.removeItem(RENDERED_EVENTS_CACHE_KEY); } catch (error) {}
      render();
      load();
    });
    load();
    setInterval(function () { load(); }, 5 * 60 * 1000);
  }

  window.pokerGetPlayerNews = function (identity) {
    var player = identity && typeof identity === "object" ? identity : {};
    var id = String(player.userId || player.accountId || player.id || "").trim();
    var nick = String(player.pokerPlusNickname || player.ratingNick || player.nick || player.name || "").replace(/^@+/, "").trim();
    if (!nick) return Promise.resolve([]);
    var pseudoFriend = {
      userId: id || ("player:" + matchKey(nick)),
      pokerPlusNickname: nick,
      pokerPlusName: String(player.pokerPlusName || player.displayName || "").trim(),
    };
    return tournamentSnapshotsReady([pseudoFriend]).then(function (snapshots) {
      var history = recentTournamentEvents([pseudoFriend], snapshots || {});
      var cached = readRenderedEventsCache().filter(function (row) {
        if (!row || row.id === "empty") return false;
        if (id && String(row.actorId || "").trim() === id) return true;
        if (nick && matchKey(row.actorNick) === matchKey(nick)) return true;
        var text = String(row.text || "").trim();
        return !!nick &&
          matchKey(text.slice(0, nick.length)) === matchKey(nick) &&
          (!text.charAt(nick.length) || /\s/.test(text.charAt(nick.length)));
      });
      return history.concat(cached)
        .sort(function (a, b) { return eventTime(b && b.at) - eventTime(a && a.at); })
        .filter(function (row, index, rows) {
          return row && rows.findIndex(function (candidate) { return candidate.id === row.id; }) === index;
        })
        .slice(0, MAX_EVENTS);
    }).catch(function () { return []; });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
