(function initHomeFriendNews() {
  "use strict";

  var LEVELS_KEY = "poker_home_friend_levels_v1";
  var LEVEL_EVENTS_KEY = "poker_home_friend_level_events_v1";
  var MAX_EVENTS = 50;
  var ROTATE_MS = 4600;
  var rotateTimer = null;
  var events = [];
  var activeIndex = 0;
  var lastFriendsSignature = "";

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
        '<section class="home-friend-news" id="homeFriendNews" data-profile-friends-panel aria-label="Обновления друзей" hidden>' +
          '<button type="button" class="home-friend-news__ticker" id="homeFriendNewsOpen" aria-haspopup="dialog" aria-controls="homeFriendNewsModal">' +
            '<span class="home-friend-news__badge" aria-hidden="true">●</span>' +
            '<span class="home-friend-news__label">Обновления друзей</span>' +
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
              '<h2 id="homeFriendNewsModalTitle">Обновления друзей</h2></div>' +
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
    return String(row && (row.contactName || row.chatDisplayName || row.pokerPlusNickname || row.userName) || "Ваш друг")
      .replace(/^@+/, "")
      .trim();
  }

  function relativeTime(value) {
    var time = new Date(value || 0).getTime();
    if (!time) return "";
    var delta = Math.max(0, Date.now() - time);
    if (delta < 3600000) return Math.max(1, Math.floor(delta / 60000)) + " мин назад";
    if (delta < 86400000) return Math.floor(delta / 3600000) + " ч назад";
    if (delta < 172800000) return "вчера";
    return new Date(time).toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
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
      return row && rows.findIndex(function (candidate) { return candidate.id === row.id; }) === index;
    }).slice(0, MAX_EVENTS);
    writeJson(LEVEL_EVENTS_KEY, savedEvents);
    return savedEvents;
  }

  function winnerEvents(friends, winners) {
    var byId = {};
    (friends || []).forEach(function (friend) {
      var ids = [friend && friend.userId, friend && friend.accountId, friend && friend.dtId, friend && friend.chatUserId];
      ids.forEach(function (id) {
        id = String(id || "").trim();
        if (id) byId[id] = friend;
      });
    });
    return (winners || []).map(function (winner) {
      var friend = byId[String(winner && winner.id || "").trim()];
      if (!friend) return null;
      var prize = String(winner.prize || "").trim();
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
      ].map(function (value) { return String(value || "").replace(/^@+/, "").trim().toLowerCase(); }).filter(Boolean);
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
      ].map(function (value) { return String(value || "").replace(/^@+/, "").trim().toLowerCase(); }).filter(Boolean);
      var match = friendKeys.find(function (candidate) {
        return candidate.keys.some(function (key) { return keys.indexOf(key) !== -1; });
      });
      return match && match.friend;
    }
    var out = [];
    (sngRows || []).forEach(function (season) {
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
          at: season.completedAt || season.updatedAt || "",
        });
      });
    });
    (choiceRows || []).forEach(function (period) {
      var winners = Array.isArray(period && period.winners) ? period.winners
        : Array.isArray(period && period.top) ? period.top
          : Array.isArray(period && period.players) ? period.players : [];
      winners.forEach(function (winner) {
        var friend = matchingFriend(winner);
        var place = Math.max(0, Number(winner && winner.place) || 0);
        if (!friend || place !== 1) return;
        var month = String(period.month || period.monthKey || period.period || "").trim();
        out.push({
          id: "achievement:choice:" + friendId(friend) + ":" + String(month || period.id || winner.description || "top"),
          type: "achievement",
          icon: "◆",
          text: friendName(friend) + " получил новую ачивку: выбор клуба",
          at: period.completedAt || period.updatedAt || (month ? month + "-01T00:00:00.000Z" : ""),
        });
      });
    });
    return out;
  }

  function eventHtml(row, ticker) {
    var timeLabel = row.type === "birthday" && Number(row.upcomingDays) > 0
      ? "через " + Number(row.upcomingDays) + " дн."
      : relativeTime(row.at);
    return '<span class="' + (ticker ? "home-friend-news__slide" : "home-friend-news-modal__item") +
      '" data-home-news-target="' + esc(row.target || "") + '">' +
      '<span class="' + (ticker ? "home-friend-news__event-icon" : "home-friend-news-modal__icon") +
      ' home-friend-news--' + esc(row.type) + '" aria-hidden="true">' + esc(row.icon) + "</span>" +
      '<span class="' + (ticker ? "home-friend-news__event-text" : "home-friend-news-modal__copy") + '">' +
      (ticker ? esc(row.text) : "<strong>" + esc(row.text) + "</strong><small>" + esc(timeLabel) + "</small>") +
      "</span></span>";
  }

  function showIndex(index, animate) {
    var track = el("homeFriendNewsTrack");
    if (!track || !events.length) return;
    activeIndex = (index + events.length) % events.length;
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
    var list = el("homeFriendNewsList");
    if (!root || !track || !list) return;
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
    list.innerHTML = events[0].id === "empty"
      ? '<div class="home-friend-news-modal__empty"><span aria-hidden="true">♣</span><strong>Новостей пока нет</strong><small>Здесь появятся повышения уровня, выигрыши, дни рождения и новые ачивки друзей.</small></div>'
      : events.map(function (row) { return eventHtml(row, false); }).join("");
    showIndex(0, false);
    startRotation();
  }

  function openModal() {
    var modal = el("homeFriendNewsModal");
    if (!modal) return;
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
    if (signature && signature === lastFriendsSignature) return;
    if (signature) lastFriendsSignature = signature;
    var suffix = authSuffix();
    var joiner = suffix ? "&" : "?";
    Promise.all([
      suppliedFriends
        ? Promise.resolve({ ok: true, friends: suppliedFriends })
        : fetch(base + "/api/friends" + suffix, { cache: "no-store" }).then(function (response) { return response.json(); }),
      fetch(base + "/api/promo/daily-poker/winners" + suffix + joiner + "limit=50", { cache: "no-store" })
        .then(function (response) { return response.json(); }),
      fetch(base + "/api/sng-champions?mode=achievements", { cache: "default" })
        .then(function (response) { return response.json(); })
        .catch(function () { return { rows: [] }; }),
      fetch(base + "/api/club-choice-vote?mode=achievements", { cache: "default" })
        .then(function (response) { return response.json(); })
        .catch(function () { return { rows: [] }; }),
    ]).then(function (results) {
      var friends = results[0] && Array.isArray(results[0].friends) ? results[0].friends : [];
      var winners = results[1] && Array.isArray(results[1].winners) ? results[1].winners : [];
      var sngRows = results[2] && Array.isArray(results[2].rows) ? results[2].rows : [];
      var choiceRows = results[3] && Array.isArray(results[3].rows) ? results[3].rows : [];
      events = collectLevelEvents(friends).concat(
        winnerEvents(friends, winners),
        birthdayEvents(friends),
        achievementEvents(friends, sngRows, choiceRows)
      )
        .sort(function (a, b) {
          var aBirthday = a.type === "birthday" ? Number(a.upcomingDays) : null;
          var bBirthday = b.type === "birthday" ? Number(b.upcomingDays) : null;
          if (aBirthday === 0 && bBirthday !== 0) return -1;
          if (bBirthday === 0 && aBirthday !== 0) return 1;
          return new Date(b.at || 0).getTime() - new Date(a.at || 0).getTime();
        })
        .filter(function (row, index, rows) {
          return rows.findIndex(function (candidate) { return candidate.id === row.id; }) === index;
        }).slice(0, MAX_EVENTS);
      render();
    }).catch(function () {});
  }

  function init() {
    mountWhenProfileReady();
    window.addEventListener("poker-profile-friends-ready", function (event) {
      var friends = event && event.detail && Array.isArray(event.detail.friends) ? event.detail.friends : [];
      load(friends);
    });
    window.addEventListener("poker-auth-changed", function () {
      lastFriendsSignature = "";
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
