// Rating view adapter: shared spring/winter DOM, tables, lightbox, and player modal.

var winterRatingLightboxDirectItems = null;

function syncWinterRatingLightboxSingleClass(box) {
  if (!box) return;
  var single = !!(box.dataset.lightboxOverrideFile || box.dataset.lightboxSingleOnly === "1");
  box.classList.toggle("winter-rating-lightbox--single", single);
}

function openWinterRatingLightbox(dateStr, index, leagueNum, opts) {
  opts = opts || {};
  var box = document.getElementById("winterRatingLightbox");
  var img = box && box.querySelector(".winter-rating-lightbox__img");
  if (!box || !img) {
    if (!opts.__globalModalsEnsured && typeof window.pokerEnsureGlobalModalsHtml === "function") {
      var retryOpts = {};
      Object.keys(opts).forEach(function (key) {
        retryOpts[key] = opts[key];
      });
      retryOpts.__globalModalsEnsured = true;
      Promise.resolve(window.pokerEnsureGlobalModalsHtml()).then(function () {
        openWinterRatingLightbox(dateStr, index, leagueNum, retryOpts);
      }).catch(function () {});
    }
    return;
  }
  initWinterRatingLightbox();
  if (opts.overrideFile) {
    delete box.dataset.lightboxSingleOnly;
    box.dataset.lightboxOverrideFile = opts.overrideFile;
    box.dataset.lightboxDate = dateStr || "";
    box.dataset.lightboxIndex = "0";
    box.dataset.lightboxLeague = "";
    box.dataset.lightboxWinterImages = "";
    img.src = getAssetUrl(opts.overrideFile) + "?v=19";
    img.alt = "Скрин турнира";
    box.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    syncWinterRatingLightboxSingleClass(box);
    updateWinterRatingLightboxArrows();
    return;
  }
  delete box.dataset.lightboxOverrideFile;
  if (opts.directItems && opts.directItems.length) {
    var directItems = opts.directItems.filter(function (item) { return item && item.src; });
    if (!directItems.length) return;
    if (index < 0) index = 0;
    if (index >= directItems.length) index = directItems.length - 1;
    winterRatingLightboxDirectItems = directItems;
    delete box.dataset.lightboxSingleOnly;
    box.dataset.lightboxDirect = "1";
    box.dataset.lightboxDate = dateStr || "";
    box.dataset.lightboxIndex = String(index);
    box.dataset.lightboxLeague = leagueNum != null ? String(leagueNum) : "";
    box.dataset.lightboxWinterImages = "";
    img.src = directItems[index].src;
    img.alt = directItems[index].alt || ("Скрин рейтинга " + (dateStr || "") + " (" + (index + 1) + ")");
    box.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    syncWinterRatingLightboxSingleClass(box);
    updateWinterRatingLightboxArrows();
    return;
  }
  delete box.dataset.lightboxDirect;
  winterRatingLightboxDirectItems = null;
  var files;
  if (opts.winterImages === true && typeof WINTER_RATING_IMAGES !== "undefined") {
    files = (WINTER_RATING_IMAGES[dateStr] || []);
  } else if (leagueNum === 1 || leagueNum === 2) {
    // Скрины марта/весны по лиге — всегда из SPRING_RATING_IMAGES_LEAGUE*, даже на экране «Рейтинг зимы»
    // (иначе для мартовских дат подставлялись зимние файлы или пустой список → «не те» картинки).
    files = (getSpringRatingImagesByLeague(leagueNum)[dateStr] || []);
  } else {
    files = (getRatingImages()[dateStr] || []);
  }
  if (!files || !files.length) return;
  if (index < 0) index = 0;
  if (index >= files.length) index = files.length - 1;
  box.dataset.lightboxDate = dateStr;
  box.dataset.lightboxIndex = String(index);
  box.dataset.lightboxLeague = leagueNum != null ? String(leagueNum) : "";
  box.dataset.lightboxWinterImages = opts.winterImages ? "1" : "";
  if (opts.singleImageOnly) box.dataset.lightboxSingleOnly = "1";
  else delete box.dataset.lightboxSingleOnly;
  img.src = getAssetUrl(files[index]) + "?v=19";
  img.alt = "Скрин рейтинга " + dateStr + " (" + (index + 1) + ")";
  box.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  syncWinterRatingLightboxSingleClass(box);
  updateWinterRatingLightboxArrows();
}

function getWinterRatingLightboxFiles(box) {
  if (!box) return null;
  if (box.dataset.lightboxOverrideFile) {
    return [box.dataset.lightboxOverrideFile];
  }
  if (box.dataset.lightboxDirect === "1") {
    return winterRatingLightboxDirectItems || [];
  }
  if (!box.dataset.lightboxDate) return null;
  var dateStr = box.dataset.lightboxDate;
  var full;
  if (box.dataset.lightboxWinterImages === "1" && typeof WINTER_RATING_IMAGES !== "undefined") {
    full = WINTER_RATING_IMAGES[dateStr] || [];
  } else {
    var leagueStr = box.dataset.lightboxLeague;
    var leagueNum = leagueStr === "1" || leagueStr === "2" ? parseInt(leagueStr, 10) : null;
    if (leagueNum === 1 || leagueNum === 2) {
      full = getSpringRatingImagesByLeague(leagueNum)[dateStr] || [];
    } else {
      full = getRatingImages()[dateStr] || [];
    }
  }
  if (box.dataset.lightboxSingleOnly === "1") {
    var idx = parseInt(box.dataset.lightboxIndex, 10) || 0;
    if (idx < 0 || idx >= full.length) return full.length ? [full[0]] : [];
    return [full[idx]];
  }
  return full;
}

function updateWinterRatingLightboxArrows() {
  var box = document.getElementById("winterRatingLightbox");
  if (!box || box.getAttribute("aria-hidden") === "true") return;
  var prevBtn = box.querySelector(".winter-rating-lightbox__prev");
  var nextBtn = box.querySelector(".winter-rating-lightbox__next");
  var counter = box.querySelector(".winter-rating-lightbox__counter");
  if (box.dataset.lightboxSingleOnly === "1") {
    if (prevBtn) prevBtn.style.display = "none";
    if (nextBtn) nextBtn.style.display = "none";
    if (counter) counter.textContent = "";
    return;
  }
  var index = parseInt(box.dataset.lightboxIndex, 10) || 0;
  var files = getWinterRatingLightboxFiles(box);
  if (prevBtn) prevBtn.style.display = files && index > 0 ? "" : "none";
  if (nextBtn) nextBtn.style.display = files && index < files.length - 1 ? "" : "none";
  if (counter && files) counter.textContent = (index + 1) + " / " + files.length;
}

function closeWinterRatingLightbox() {
  var box = document.getElementById("winterRatingLightbox");
  if (box) {
    box.setAttribute("aria-hidden", "true");
    delete box.dataset.lightboxSingleOnly;
    delete box.dataset.lightboxDirect;
    winterRatingLightboxDirectItems = null;
    box.classList.remove("winter-rating-lightbox--single");
    document.body.style.overflow = "";
  }
}

function initWinterRatingLightbox() {
  var box = document.getElementById("winterRatingLightbox");
  if (!box || box.getAttribute("data-inited") === "1") return;
  box.setAttribute("data-inited", "1");
  var closeBtn = box.querySelector(".winter-rating-lightbox__close");
  var backBtn = box.querySelector(".winter-rating-lightbox__back");
  var prevBtn = box.querySelector(".winter-rating-lightbox__prev");
  var nextBtn = box.querySelector(".winter-rating-lightbox__next");
  if (closeBtn) {
    closeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeWinterRatingLightbox();
    });
  }
  if (backBtn) {
    backBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeWinterRatingLightbox();
    });
  }
  if (prevBtn) prevBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (box.dataset.lightboxSingleOnly === "1") return;
    var dateStr = box.dataset.lightboxDate;
    var index = parseInt(box.dataset.lightboxIndex, 10) || 0;
    var leagueStr = box.dataset.lightboxLeague;
    var leagueNum = leagueStr === "1" || leagueStr === "2" ? parseInt(leagueStr, 10) : undefined;
    var lbOpts = box.dataset.lightboxDirect === "1"
      ? { directItems: winterRatingLightboxDirectItems || [] }
      : { winterImages: box.dataset.lightboxWinterImages === "1" };
    if (index > 0) openWinterRatingLightbox(dateStr, index - 1, leagueNum, lbOpts);
  });
  if (nextBtn) nextBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (box.dataset.lightboxSingleOnly === "1") return;
    var dateStr = box.dataset.lightboxDate;
    var index = parseInt(box.dataset.lightboxIndex, 10) || 0;
    var leagueStr = box.dataset.lightboxLeague;
    var leagueNum = leagueStr === "1" || leagueStr === "2" ? parseInt(leagueStr, 10) : undefined;
    var files = getWinterRatingLightboxFiles(box);
    var lbOpts = box.dataset.lightboxDirect === "1"
      ? { directItems: winterRatingLightboxDirectItems || [] }
      : { winterImages: box.dataset.lightboxWinterImages === "1" };
    if (files && index < files.length - 1) openWinterRatingLightbox(dateStr, index + 1, leagueNum, lbOpts);
  });
  box.addEventListener("click", function (e) {
    var t = e.target;
    if (t === box || (t && t.classList && t.classList.contains("winter-rating-lightbox__img"))) {
      closeWinterRatingLightbox();
    }
  });
  document.addEventListener("keydown", function (e) {
    if (box.getAttribute("aria-hidden") !== "false") return;
    if (e.key === "Escape") closeWinterRatingLightbox();
    else if (e.key === "ArrowLeft") {
      if (box.dataset.lightboxSingleOnly === "1") return;
      var dateStr = box.dataset.lightboxDate;
      var idx = parseInt(box.dataset.lightboxIndex, 10) || 0;
      var leagueStr = box.dataset.lightboxLeague;
      var leagueNum = leagueStr === "1" || leagueStr === "2" ? parseInt(leagueStr, 10) : undefined;
      var kbOpts = box.dataset.lightboxDirect === "1"
        ? { directItems: winterRatingLightboxDirectItems || [] }
        : { winterImages: box.dataset.lightboxWinterImages === "1" };
      if (idx > 0) openWinterRatingLightbox(dateStr, idx - 1, leagueNum, kbOpts);
    } else if (e.key === "ArrowRight") {
      if (box.dataset.lightboxSingleOnly === "1") return;
      var dateStr = box.dataset.lightboxDate;
      var idx = parseInt(box.dataset.lightboxIndex, 10) || 0;
      var leagueStr = box.dataset.lightboxLeague;
      var leagueNum = leagueStr === "1" || leagueStr === "2" ? parseInt(leagueStr, 10) : undefined;
      var files = getWinterRatingLightboxFiles(box);
      var kbOptsR = box.dataset.lightboxDirect === "1"
        ? { directItems: winterRatingLightboxDirectItems || [] }
        : { winterImages: box.dataset.lightboxWinterImages === "1" };
      if (files && idx < files.length - 1) openWinterRatingLightbox(dateStr, idx + 1, leagueNum, kbOptsR);
    }
  });
}

function winterRatingRowClass(place) {
  if (place === 1) return "winter-rating__row--gold";
  if (place === 2) return "winter-rating__row--silver";
  if (place === 3) return "winter-rating__row--bronze";
  return "";
}

function formatRewardRound(val) {
  return Math.round(Number(val) || 0).toLocaleString("ru-RU");
}

function winterRatingDisplayRewardValue(reward) {
  var value = Number(reward) || 0;
  return value > 0 ? value : 0;
}

function winterRatingDisplayReward(reward) {
  return formatRewardRound(winterRatingDisplayRewardValue(reward));
}

function winterRatingPrizeByPlace(place) {
  var prizes = { 1: 110000, 2: 60000, 3: 30000, 4: 20000, 5: 10000, 6: 10000, 7: 10000 };
  var amount = prizes[place];
  return amount != null ? formatRewardRound(amount) + " ₽" : "<span class=\"winter-rating__prize-respect\">уважение</span>";
}

function winterRatingPlaceCell(place) {
  if (place === 1 || place === 2 || place === 3) {
    var medal = place === 1 ? "🥇" : (place === 2 ? "🥈" : "🥉");
    return "<span class=\"winter-rating__place-cell winter-rating__place-cell--top\"><span class=\"winter-rating__place-medal\" aria-hidden=\"true\">" + medal + "</span><span class=\"winter-rating__place-number\">" + place + "</span></span>";
  }
  return "<span class=\"winter-rating__place-cell\"><span class=\"winter-rating__place-number\">" + place + "</span></span>";
}

function winterRatingPointsForPlace(place, reward) {
  if (reward == null || reward <= 0) return 0;
  var pts = XPOKER_BALLS[place];
  return pts != null ? pts : 0;
}

function winterRatingTournamentPlayerPoints(p) {
  if (!p) return 0;
  if (p.points != null) {
    var ex = Number(p.points);
    if (ex === ex) return ex;
  }
  return winterRatingPointsForPlace(p.place, p.reward);
}

function winterRatingRewardTone(reward) {
  var rewardNum = Number(String(reward || 0).replace(/\s/g, "")) || 0;
  if (rewardNum >= 100000) return "high";
  if (rewardNum >= 50000) return "mid";
  return "";
}

function mergeWinterRatingRowsByNick(rows) {
  if (!rows || !rows.length) return [];
  var byNick = {};
  rows.forEach(function (r) {
    var n = normalizeWinterNick(r && r.nick);
    var pts = Number(r.points);
    var rew = Number(r.reward);
    if (!byNick[n]) byNick[n] = { nick: n, points: 0, reward: 0 };
    byNick[n].points += (pts === pts ? pts : 0);
    byNick[n].reward += (rew === rew ? rew : 0);
  });
  return Object.keys(byNick).map(function (n) { return byNick[n]; });
}

function renderWinterRatingTable(rows) {
  if (!rows || !rows.length) return "";
  rows = mergeWinterRatingRowsByNick(rows);
  var filtered = rows.filter(function (r) { return r.points !== 0 || winterRatingDisplayRewardValue(r.reward) !== 0; });
  var sorted = filtered.slice().sort(function (a, b) { return (b.points - a.points) || (b.reward - a.reward); });
  var place = 0;
  var totalReward = sorted.reduce(function (sum, r) { return sum + winterRatingDisplayRewardValue(r.reward); }, 0);
  var tfoot = "<tfoot><tr class=\"winter-rating__table-total-row\"><td colspan=\"3\">Сумма призовых за день</td><td>" + (totalReward ? formatRewardRound(totalReward) : "0") + "</td></tr></tfoot>";
  return "<table class=\"winter-rating__table\"><thead><tr><th>Место</th><th>Ник</th><th>Баллы</th><th>Призовые</th></tr></thead><tbody>" +
    sorted.map(function (r) {
      place++;
      var trClass = winterRatingRowClass(place);
      var rewardTone = winterRatingRewardTone(winterRatingDisplayRewardValue(r.reward));
      if (rewardTone === "high") trClass = (trClass ? trClass + " " : "") + "winter-rating__tr--reward-high";
      else if (rewardTone === "mid") trClass = (trClass ? trClass + " " : "") + "winter-rating__tr--reward-mid";
      var placeCell = winterRatingPlaceCell(place);
      return "<tr" + (trClass ? " class=\"" + trClass + "\"" : "") + "><td>" + placeCell + "</td><td>" + String(r.nick).replace(/</g, "&lt;") + "</td><td>" + r.points + "</td><td>" + winterRatingDisplayReward(r.reward) + "</td></tr>";
    }).join("") + "</tbody>" + tfoot + "</table>";
}

function escapeHtmlRating(s) {
  if (s == null) return "";
  return String(s).replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;");
}

function escapeHtml(s) {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function winterRatingDateKeyToStamp(dateStr) {
  var parts = dateStr.split(".");
  if (parts.length !== 3) return 0;
  var d = parseInt(parts[0], 10), m = parseInt(parts[1], 10), y = parseInt(parts[2], 10);
  return (y * 10000 + m * 100 + d) || 0;
}

function normalizeWinterRatingPlayerSeasonKey(value) {
  var key = String(value || "").trim().toLowerCase();
  if (key === "current" || key === "latest") key = "summer";
  if (key === "summer" || key === "spring" || key === "winter") return key;
  return "";
}

function getWinterRatingPlayerSeasonKey(options) {
  options = options || {};
  var forced = normalizeWinterRatingPlayerSeasonKey(options.season || options.ratingSeason || options.forceSeason);
  if (forced) return forced;
  if (typeof isSummerRatingMode === "function" && isSummerRatingMode()) return "summer";
  if (typeof isSpringRatingMode === "function" && isSpringRatingMode()) return "spring";
  return "winter";
}

function isWinterRatingPlayerSeasonalKey(seasonKey) {
  return seasonKey === "spring" || seasonKey === "summer";
}

function getWinterRatingPlayerSeasonConfig(seasonKey) {
  if (seasonKey === "summer" && typeof SUMMER_RATING_SEASON !== "undefined") return SUMMER_RATING_SEASON;
  if (seasonKey === "spring" && typeof SPRING_RATING_SEASON !== "undefined") return SPRING_RATING_SEASON;
  if (typeof getRatingSeasonConfig === "function" && isWinterRatingPlayerSeasonalKey(seasonKey)) return getRatingSeasonConfig();
  return null;
}

function getWinterRatingPlayerSeasonStartAppPrefix(kind, seasonKey) {
  var config = getWinterRatingPlayerSeasonConfig(seasonKey);
  if (config) {
    if (kind === "date") return config.datePrefix || "spring_rating_date_";
    if (kind === "league") return config.leaguePrefix || "spring_rating_league_";
    if (kind === "player") return config.playerPrefix || "spring_rating_player_";
  }
  return kind === "player" ? "winter_rating_player_" : "rating_";
}

var SUMMER_RATING_PLAYER_ART_BY_NICK = {
  "porquinho": { src: "./assets/sng-finalist-porquinho.webp" },
  "поркиньо": { src: "./assets/sng-finalist-porquinho.webp" },
  "поркиньё": { src: "./assets/sng-finalist-porquinho.webp" },
  "штукатур": { src: "./assets/sng-finalist-shtukatur.webp" },
  "shtukatur": { src: "./assets/sng-finalist-shtukatur.webp" },
  "hakas": { src: "./assets/sng-finalist-hakas.webp" },
  "хакас": { src: "./assets/sng-finalist-hakas.webp" },
  "aza": { src: "./assets/sng-finalist-aza.webp" },
  "aza32": { src: "./assets/sng-finalist-aza.webp" },
  "аза": { src: "./assets/sng-finalist-aza.webp" },
  "аза32": { src: "./assets/sng-finalist-aza.webp" },
  "waaar": { src: "./assets/summer-rating-player-waaar.webp", place: 1, league: 1 },
  "покерманки": { src: "./assets/summer-rating-player-pokermanki.webp?v=3.547", place: 2, league: 1 },
  "coo1er91": { src: "./assets/summer-rating-player-cooler.webp", place: 3, league: 1 },
  "em13!!": { src: "./assets/summer-rating-player-emil.webp", place: 4, league: 1 },
  "winifly": { src: "./assets/summer-rating-player-winifly.webp", place: 5, league: 1 },
  "missclick": { src: "./assets/summer-rating-player-missclick.webp", place: 6, league: 1 },
  "рыбнадзор": { src: "./assets/summer-rating-player-rybnadzor.webp", place: 7, league: 1 },
  "nikola233": { src: "./assets/summer-rating-player-nikola233.webp", place: 7, league: 1 },
  "milkyway77": { src: "./assets/summer-rating-player-milkyway.webp", place: 8, league: 1 },
  "пряник": { src: "./assets/summer-rating-player-pryanik.webp", place: 9, league: 1 },
  "pryanik2la": { src: "./assets/summer-rating-player-pryanik.webp", place: 9, league: 1 },
  "prushnik": { src: "./assets/summer-rating-player-prushnik.webp", place: 9, league: 1 },
  "evgen1722": { src: "./assets/summer-rating-player-evgen1722.webp", place: 10, league: 1 },
  "хер вам)))))": { src: "./assets/summer-rating-player-khervam.webp", place: 10, league: 1 },
  "frankl": { src: "./assets/summer-rating-player-morf.webp", place: 10, league: 1 },
  "kriak": { src: "./assets/summer-rating-player-kriak.webp", place: 10, league: 1 },
  "andrushamorf": { src: "./assets/summer-rating-player-morf.webp", place: 10, league: 1 },
  "4ezzi": { src: "./assets/summer-rating-player-morf.webp", place: 10, league: 1 },
  "morf": { src: "./assets/summer-rating-player-morf.webp", place: 10, league: 1 },
  "морф": { src: "./assets/summer-rating-player-morf.webp", place: 10, league: 1 },
  "alenast": { src: "./assets/summer-rating-league2-player-alena.webp", place: 1, league: 2 },
  "shkarubo": { src: "./assets/summer-rating-league2-player-shkarubo.webp", place: 2, league: 2 },
  "sarmat1305": { src: "./assets/summer-rating-league2-player-sarmat.webp", place: 3, league: 2 },
  "палач": { src: "./assets/summer-rating-league2-player-palach.webp", place: 5, league: 2 },
  "nakurikota": { src: "./assets/summer-rating-league2-player-nakurikota.webp", place: 6, league: 2 },
  "накурикота": { src: "./assets/summer-rating-league2-player-nakurikota.webp", place: 6, league: 2 },
  "wildboar": { src: "./assets/summer-rating-league2-player-wildboar.webp", place: 7, league: 2 },
  "бабник": { src: "./assets/summer-rating-league2-player-babnik.webp", place: 9, league: 2 },
  "виктор": { src: "./assets/summer-rating-league2-player-viktor.webp", place: 5, league: 2 },
  "мистерfox": { src: "./assets/summer-rating-league2-player-mr-fox.webp", place: 7, league: 2 },
  "babyshark": { src: "./assets/summer-rating-league2-player-babyshark.webp", place: 8, league: 2 },
  "аспирин": { src: "./assets/summer-rating-league2-player-aspirin.webp", place: 9, league: 2 },
  "ksuha": { src: "./assets/summer-rating-league2-player-ksyukha.webp", place: 10, league: 2 },
  "ksuha🐍": { src: "./assets/summer-rating-league2-player-ksyukha.webp", place: 10, league: 2 },
  "ksuha🐊": { src: "./assets/summer-rating-league2-player-ksyukha.webp", place: 10, league: 2 },
  "ksuha🦖": { src: "./assets/summer-rating-league2-player-ksyukha.webp", place: 10, league: 2 },
  "ksuha🐉": { src: "./assets/summer-rating-league2-player-ksyukha.webp", place: 10, league: 2 },
  "zagrebnagreb": { src: "./assets/summer-rating-league2-player-zagrebnagreb.webp", place: 10, league: 2 },
  "zagrebrnagreb": { src: "./assets/summer-rating-league2-player-zagrebnagreb.webp", place: 10, league: 2 },
};

function getSummerRatingPlayerArtKey(nick) {
  var normalized = typeof normalizeWinterNick === "function" ? normalizeWinterNick(nick) : String(nick || "").trim();
  return String(normalized || "").trim().toLowerCase();
}

function pokerGetSummerRatingPlayerArt(nick) {
  var key = getSummerRatingPlayerArtKey(nick);
  var art = key ? SUMMER_RATING_PLAYER_ART_BY_NICK[key] : null;
  if (!art) return null;
  var normalizedNick = typeof normalizeWinterNick === "function" ? normalizeWinterNick(nick) : String(nick || "").trim();
  return {
    nick: normalizedNick,
    src: art.src,
    place: art.place,
    league: art.league,
    key: key,
  };
}

window.pokerGetSummerRatingPlayerArt = pokerGetSummerRatingPlayerArt;

function summerRatingPlayerArtCssUrl(nick) {
  var art = pokerGetSummerRatingPlayerArt(nick);
  if (!art || !art.src) return "none";
  return "url('" + String(art.src).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "')";
}

function summerRatingTableAvatarStyle(nick) {
  var art = pokerGetSummerRatingPlayerArt(nick);
  if (!art || !art.src) return "background-image:none;";
  var size = "165% auto";
  var position = "50% 8%";
  if (art.key === "alenast") size = "155% auto";
  else if (art.key === "shkarubo") {
    size = "230% auto";
    position = "67% 10%";
  } else if (art.key === "sarmat1305") size = "170% auto";
  else if (art.key === "babyshark") size = "175% auto";
  return "background-image:" + summerRatingPlayerArtCssUrl(nick) + ";background-position:" + position + ";background-size:" + size + ";";
}

function summerRatingLowerArtSizeStyle(place, nick) {
  var art = pokerGetSummerRatingPlayerArt(nick);
  if (!art) return "";
  var size = summerRatingPlayerArtStageSize(art.key);
  return size ? "--summer-lower-art-" + place + "-size:" + size + ";" : "";
}

function summerRatingTop3ArtSizeStyle(slotName, nick) {
  var art = pokerGetSummerRatingPlayerArt(nick);
  if (!art) return "";
  // Top-3 podium art is rendered through inline CSS variables; CSS background fallbacks below do not control these sizes.
  var size = "";
  if (art.league === 1) {
    if (art.key === "waaar" && slotName === "left") size = "22.4%";
    else if (art.key === "покерманки" && slotName === "center") size = "38.1%";
    else if (art.key === "coo1er91" && slotName === "right") size = "22.4%";
    else if (art.key === "em13!!" && slotName === "right") size = "19.55%";
  } else if (art.league === 2) {
    // League 2 source canvases for AlenaSt and misterFox are much taller than
    // League 1 art, so matching width percentages makes them look oversized.
    // These per-player widths match the displayed character heights in League 1.
    if (art.key === "мистерfox" && slotName === "center") size = "23.1%";
    else if (art.key === "alenast" && slotName === "left") size = "14.5%";
    else if (slotName === "center") size = "38.1%";
    else if (slotName === "left") size = "22.4%";
    else if (slotName === "right") size = "19.55%";
  }
  return size ? "--summer-top3-art-" + slotName + "-size:" + size + ";" : "";
}

function summerRatingPlayerArtStageSize(key) {
  switch (key) {
    case "waaar": return "14.7%";
    case "покерманки": return "17.9%";
    case "coo1er91": return "14.0%";
    case "em13!!": return "12.9%";
    case "winifly": return "13.9%";
    case "missclick": return "14.2%";
    case "рыбнадзор": return "14.3%";
    case "nikola233": return "12.5%";
    case "milkyway77": return "11.9%";
    case "пряник":
    case "pryanik2la": return "8.6%";
    case "prushnik": return "14.5%";
    case "evgen1722": return "14.1%";
    case "хер вам)))))": return "11.5%";
    case "frankl":
    case "andrushamorf":
    case "4ezzi":
    case "morf":
    case "морф": return "17.2%";
    case "shkarubo": return "16.3%";
    case "sarmat1305": return "13.0%";
    case "палач": return "15.84%";
    case "nakurikota":
    case "накурикота": return "14.1%";
    case "wildboar": return "14.2%";
    case "бабник": return "14.0%";
    case "виктор": return "10.3%";
    case "мистерfox": return "9.5%";
    case "babyshark": return "12.8%";
    case "аспирин": return "10.7%";
    case "ksuha":
    case "ksuha🐍":
    case "ksuha🐊":
    case "ksuha🦖":
    case "ksuha🐉": return "9.4%";
    case "zagrebnagreb":
    case "zagrebrnagreb": return "19.5%";
    default: return "";
  }
}

function syncWinterRatingPlayerModalArt(modal, nick, seasonKey) {
  if (!modal) return;
  var artWrap = document.getElementById("winterRatingPlayerModalArt") || modal.querySelector(".winter-rating-player-modal__art");
  if (!artWrap) {
    var summary = document.getElementById("winterRatingPlayerModalSummary") || modal.querySelector(".winter-rating-player-modal__summary");
    artWrap = document.createElement("div");
    artWrap.id = "winterRatingPlayerModalArt";
    artWrap.className = "winter-rating-player-modal__art";
    artWrap.hidden = true;
    if (summary && summary.parentNode) summary.parentNode.insertBefore(artWrap, summary);
    else modal.appendChild(artWrap);
  }
  var art = seasonKey === "summer" && typeof pokerGetSummerRatingPlayerArt === "function" ? pokerGetSummerRatingPlayerArt(nick) : null;
  if (!art || !art.src) {
    artWrap.hidden = true;
    artWrap.innerHTML = "";
    artWrap.className = "winter-rating-player-modal__art";
    return;
  }
  var nickEsc = escapeHtml(art.nick || nick || "");
  var srcEsc = escapeHtml(art.src);
  var artKeyName =
    art.key === "мистерfox" ? "misterfox" :
    art.key === "пряник" || art.key === "pryanik2la" ? "pryanik" :
    String(art.key || "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  var artKeyClass = artKeyName ? " winter-rating-player-modal__art--key-" + artKeyName : "";
  artWrap.hidden = false;
  artWrap.className = "winter-rating-player-modal__art winter-rating-player-modal__art--league-" + art.league + " winter-rating-player-modal__art--place-" + art.place + artKeyClass;
  artWrap.innerHTML = "<img class=\"winter-rating-player-modal__art-img\" src=\"" + srcEsc + "\" alt=\"" + nickEsc + "\" loading=\"eager\" decoding=\"async\" />";
}

function getTournamentRatingTournamentsBySeason(seasonKey) {
  seasonKey = normalizeWinterRatingPlayerSeasonKey(seasonKey);
  if (seasonKey === "summer") {
    if (typeof getSummerRatingTournamentsByDate === "function") return getSummerRatingTournamentsByDate() || {};
    return typeof SUMMER_RATING_TOURNAMENTS_BY_DATE !== "undefined" ? SUMMER_RATING_TOURNAMENTS_BY_DATE || {} : {};
  }
  if (seasonKey === "spring") {
    if (typeof getSpringRatingTournamentsByDate === "function" && !(typeof isSummerRatingMode === "function" && isSummerRatingMode())) return getSpringRatingTournamentsByDate() || {};
    return typeof SPRING_RATING_TOURNAMENTS_BY_DATE !== "undefined" ? SPRING_RATING_TOURNAMENTS_BY_DATE || {} : {};
  }
  return {};
}

function getTournamentRatingOverallByLeagueForSeason(seasonKey, leagueNum) {
  seasonKey = normalizeWinterRatingPlayerSeasonKey(seasonKey);
  var tournamentsByDate = getTournamentRatingTournamentsBySeason(seasonKey);
  var seasonConfig = getWinterRatingPlayerSeasonConfig(seasonKey) || {};
  var monthRegex = seasonConfig.monthRegex || (seasonKey === "summer" ? /\.(06|07|08)\.2026$/ : /\.(03|04|05)\.2026$/);
  var byNick = {};
  var dateStrs = Object.keys(tournamentsByDate || {}).filter(function (d) { return monthRegex.test(d); });
  for (var i = 0; i < dateStrs.length; i++) {
    var list = tournamentsByDate[dateStrs[i]];
    if (!Array.isArray(list) || !list.length) continue;
    for (var j = 0; j < list.length; j++) {
      var t = list[j];
      var forcedLeague = t.league != null ? Number(t.league) : NaN;
      var buyin = t.buyin != null ? Number(t.buyin) : NaN;
      var inLeague1 = forcedLeague === 1 || (forcedLeague !== forcedLeague && (buyin >= 500 || (buyin !== buyin)));
      var inLeague2 = forcedLeague === 2 || (forcedLeague !== forcedLeague && buyin >= 100 && buyin < 500);
      var include = (leagueNum === 1 && inLeague1) || (leagueNum === 2 && inLeague2);
      if (!include) continue;
      var players = t.players || [];
      for (var k = 0; k < players.length; k++) {
        var p = players[k];
        var n = normalizeWinterNickForFinalTable(p && p.nick);
        if (!n) continue;
        var pts = winterRatingTournamentPlayerPoints(p);
        var rew = p.reward != null ? Number(p.reward) : 0;
        if (rew !== rew) rew = 0;
        if (!byNick[n]) byNick[n] = { nick: n, points: 0, reward: 0 };
        byNick[n].points += pts;
        byNick[n].reward += rew;
      }
    }
  }
  var arr = Object.keys(byNick).map(function (n) { return byNick[n]; });
  arr = arr.filter(function (r) {
    var p = Number(r.points);
    var w = Number(r.reward);
    return (p === p && p !== 0) || (w === w && w !== 0);
  });
  arr.sort(function (a, b) {
    var ap = Number(a.points);
    var bp = Number(b.points);
    var aw = Number(a.reward);
    var bw = Number(b.reward);
    if (ap !== ap) ap = 0;
    if (bp !== bp) bp = 0;
    if (aw !== aw) aw = 0;
    if (bw !== bw) bw = 0;
    return (bp - ap) || (bw - aw);
  });
  return arr;
}

function buildWinterRatingOverallRowsFromData(data) {
  var byNick = {};
  var dateStrs = Object.keys(data || {});
  for (var i = 0; i < dateStrs.length; i++) {
    var dateStr = dateStrs[i];
    var list = data[dateStr];
    if (!Array.isArray(list) || !list.length) continue;
    for (var j = 0; j < list.length; j++) {
      var r = list[j];
      var n = normalizeWinterNick(r && r.nick);
      if (!n) continue;
      var pts = Number(r.points);
      var rew = Number(r.reward);
      if (pts !== pts) pts = 0;
      if (rew !== rew) rew = 0;
      if (!byNick[n]) byNick[n] = { nick: n, points: 0, reward: 0 };
      byNick[n].points += pts;
      byNick[n].reward += rew;
    }
  }
  if (byNick["Coo1er91"]) byNick["Coo1er91"].points += 55; else byNick["Coo1er91"] = { nick: "Coo1er91", points: 55, reward: 0 };
  if (byNick["Waaar"]) byNick["Waaar"].points += 325; else byNick["Waaar"] = { nick: "Waaar", points: 325, reward: 0 };
  if (byNick["Waaar"]) { byNick["Waaar"].points += 765; byNick["Waaar"].reward += 588225; } else { byNick["Waaar"] = { nick: "Waaar", points: 765, reward: 588225 }; }
  if (byNick["Waaar"]) { byNick["Waaar"].points -= 405; byNick["Waaar"].reward -= 475000; }
  var arr = Object.keys(byNick).map(function (n) { return byNick[n]; });
  arr = arr.filter(function (r) {
    var p = Number(r.points);
    var w = Number(r.reward);
    return (p === p && p !== 0) || (w === w && w !== 0);
  });
  arr.sort(function (a, b) {
    var ap = Number(a.points);
    var bp = Number(b.points);
    var aw = Number(a.reward);
    var bw = Number(b.reward);
    if (ap !== ap) ap = 0;
    if (bp !== bp) bp = 0;
    if (aw !== aw) aw = 0;
    if (bw !== bw) bw = 0;
    return (bp - ap) || (bw - aw);
  });
  return arr;
}

function buildWinterRatingOverallRowsFromTournamentsByLeague(leagueNum) {
  var tournamentsByDate = typeof WINTER_RATING_TOURNAMENTS_BY_DATE !== "undefined" ? WINTER_RATING_TOURNAMENTS_BY_DATE || {} : {};
  var byNick = {};
  var hasLeagueMeta = false;
  Object.keys(tournamentsByDate || {}).forEach(function (dateStr) {
    var list = tournamentsByDate[dateStr];
    if (!Array.isArray(list) || !list.length) return;
    list.forEach(function (t) {
      var league = t && t.league != null ? Number(t.league) : null;
      if ((league == null || league !== league) && t && t.buyin != null) {
        var buyin = Number(t.buyin);
        if (buyin === buyin) league = buyin >= 500 ? 1 : (buyin >= 100 ? 2 : 1);
      }
      if (league === 1 || league === 2) hasLeagueMeta = true;
      if (league !== leagueNum) return;
      var players = t && Array.isArray(t.players) ? t.players : [];
      players.forEach(function (p) {
        var n = normalizeWinterNick(p && p.nick);
        if (!n) return;
        var pts = winterRatingTournamentPlayerPoints(p);
        var rew = p && p.reward != null ? Number(p.reward) : 0;
        if (rew !== rew) rew = 0;
        if (!byNick[n]) byNick[n] = { nick: n, points: 0, reward: 0 };
        byNick[n].points += pts;
        byNick[n].reward += rew;
      });
    });
  });
  if (!hasLeagueMeta) return null;
  var arr = Object.keys(byNick).map(function (n) { return byNick[n]; });
  arr = arr.filter(function (r) {
    var p = Number(r.points);
    var w = Number(r.reward);
    return (p === p && p !== 0) || (w === w && w !== 0);
  });
  arr.sort(function (a, b) {
    var ap = Number(a.points);
    var bp = Number(b.points);
    var aw = Number(a.reward);
    var bw = Number(b.reward);
    if (ap !== ap) ap = 0;
    if (bp !== bp) bp = 0;
    if (aw !== aw) aw = 0;
    if (bw !== bw) bw = 0;
    return (bp - ap) || (bw - aw);
  });
  return arr;
}

function getTournamentRatingPlaceRows(nick, seasonKey) {
  var normalizedNick = normalizeWinterNick(nick);
  if (!normalizedNick) return [];
  seasonKey = normalizeWinterRatingPlayerSeasonKey(seasonKey);
  if (seasonKey === "spring" || seasonKey === "summer") {
    var places = [];
    [1, 2].forEach(function (leagueNum) {
      var rows = getTournamentRatingOverallByLeagueForSeason(seasonKey, leagueNum);
      for (var i = 0; i < rows.length; i++) {
        if (winterRatingSamePlayer(rows[i].nick, normalizedNick)) {
          places.push({ league: leagueNum, place: i + 1, nick: rows[i].nick });
          break;
        }
      }
    });
    return places;
  }
  if (typeof WINTER_RATING_BY_DATE === "undefined") return [];
  var winterData = WINTER_RATING_BY_DATE || {};
  var winterLeaguePlaces = [];
  [1, 2].forEach(function (leagueNum) {
    var leagueRows = buildWinterRatingOverallRowsFromTournamentsByLeague(leagueNum);
    if (!leagueRows) return;
    for (var li = 0; li < leagueRows.length; li++) {
      if (winterRatingSamePlayer(leagueRows[li].nick, normalizedNick)) {
        winterLeaguePlaces.push({ league: leagueNum, place: li + 1, nick: leagueRows[li].nick });
        break;
      }
    }
  });
  if (winterLeaguePlaces.length) return winterLeaguePlaces;
  var winterRows = buildWinterRatingOverallRowsFromData(winterData);
  for (var wi = 0; wi < winterRows.length; wi++) {
    if (winterRatingSamePlayer(winterRows[wi].nick, normalizedNick)) return [{ league: 1, place: wi + 1, nick: winterRows[wi].nick }];
  }
  return [];
}

function pokerGetTournamentRatingPlacesReady(nick, seasonKey) {
  seasonKey = normalizeWinterRatingPlayerSeasonKey(seasonKey);
  if (seasonKey === "winter" && typeof WINTER_RATING_BY_DATE === "undefined" && typeof window.pokerEnsureScriptDomains === "function") {
    return Promise.resolve(window.pokerEnsureScriptDomains(["rating-winter"]))
      .then(function () { return getTournamentRatingPlaceRows(nick, seasonKey); })
      .catch(function () { return getTournamentRatingPlaceRows(nick, seasonKey); });
  }
  return Promise.resolve(getTournamentRatingPlaceRows(nick, seasonKey));
}

window.pokerGetTournamentRatingPlaces = getTournamentRatingPlaceRows;
window.pokerGetTournamentRatingPlacesReady = pokerGetTournamentRatingPlacesReady;

var pokerTournamentProfileOpenLoadingNick = "";
var pokerTournamentProfileOpenLoadingTimer = null;

function pokerTournamentProfileOpenLoadingKey(nick) {
  return String(nick || "").trim().replace(/^@+/, "").replace(/\s+/g, " ").toLowerCase();
}

function setPokerTournamentProfileOpenLoading(nick, active) {
  var key = pokerTournamentProfileOpenLoadingKey(nick);
  if (pokerTournamentProfileOpenLoadingTimer) {
    clearTimeout(pokerTournamentProfileOpenLoadingTimer);
    pokerTournamentProfileOpenLoadingTimer = null;
  }
  if (!active) {
    pokerTournamentProfileOpenLoadingNick = "";
  } else {
    pokerTournamentProfileOpenLoadingNick = key;
  }
  var buttons = document.querySelectorAll("[data-nick]");
  Array.prototype.forEach.call(buttons, function (btn) {
    var btnKey = pokerTournamentProfileOpenLoadingKey(btn && btn.dataset ? btn.dataset.nick : "");
    var isLoading = !!active && !!key && btnKey === key;
    btn.classList.toggle("winter-rating__nick-btn--loading-profile", isLoading);
    if (isLoading) {
      btn.setAttribute("aria-busy", "true");
      btn.setAttribute("aria-disabled", "true");
    } else {
      btn.removeAttribute("aria-busy");
      btn.removeAttribute("aria-disabled");
    }
  });
  var toast = document.getElementById("ratingProfileOpenLoadingToast");
  if (active) {
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "ratingProfileOpenLoadingToast";
      toast.className = "rating-profile-open-loading";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.innerHTML = '<span class="rating-profile-open-loading__spinner" aria-hidden="true"></span><span>Открываем профиль...</span>';
    toast.hidden = false;
  } else if (toast) {
    toast.hidden = true;
  }
}

function pokerOpenUnifiedPlayerProfileByRatingNick(nick, options) {
  nick = String(nick || "").trim();
  if (!nick) return Promise.resolve(false);
  var fallbackOptions = copyWinterRatingPlayerOptions(options || {});
  function openRatingFallback() {
    if (typeof openWinterRatingPlayerModalReady === "function") return Promise.resolve(openWinterRatingPlayerModalReady(nick, fallbackOptions)).then(function () { return false; });
    if (typeof openWinterRatingPlayerModal === "function") openWinterRatingPlayerModal(nick, fallbackOptions);
    return Promise.resolve(false);
  }
  var base = typeof getApiBase === "function" ? getApiBase() : "";
  if (!base || typeof fetch !== "function") return Promise.resolve(openRatingFallback());
  var authQuery = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?";
  if (!authQuery || authQuery === "?") authQuery = "?";
  var sep = authQuery.length > 1 ? "&" : "";
  var url = base + "/api/users" + authQuery + sep + "ratingNick=" + encodeURIComponent(nick);
  return fetch(url)
    .then(function (r) { return r.json().catch(function () { return null; }); })
    .then(function (data) {
      if (!data || !data.ok) return openRatingFallback();
      if (data.self) {
        if (typeof setView === "function") setView("profile");
        return true;
      }
      function openUnified() {
        var userId = String(data.userId || data.chatUserId || data.dtId || data.id || "").trim();
        if (!userId) return openRatingFallback();
        var displayName = data.chatDisplayName || data.contactName || data.pokerPlusNickname || data.userName || nick;
        var openOptions = { deferReveal: true, ratingNick: nick };
        if (typeof window.pokerOpenChatUserModalSafe === "function") {
          return Promise.resolve(window.pokerOpenChatUserModalSafe(userId, displayName, "", openOptions))
            .then(function (opened) { return opened ? true : openRatingFallback(); });
        }
        if (
          typeof window.openChatUserModalById === "function" &&
          window.openChatUserModalById.__pokerFallback !== true
        ) {
          window.openChatUserModalById(userId, displayName, "", openOptions);
          return true;
        }
        return openRatingFallback();
      }
      if (
        typeof window.pokerOpenChatUserModalSafe === "function" ||
        (typeof window.openChatUserModalById === "function" && window.openChatUserModalById.__pokerFallback !== true)
      ) return openUnified();
      if (typeof window.pokerEnsureGlobalModalsHtml === "function" || typeof window.pokerEnsureScriptDomains === "function") {
        var modalPromise = typeof window.pokerEnsureGlobalModalsHtml === "function"
          ? Promise.resolve(window.pokerEnsureGlobalModalsHtml())
          : Promise.resolve();
        return modalPromise
          .then(function () {
            return typeof window.pokerEnsureScriptDomains === "function"
              ? window.pokerEnsureScriptDomains(["chat"])
              : null;
          })
          .then(openUnified)
          .catch(openRatingFallback);
      }
      return openRatingFallback();
    })
    .catch(openRatingFallback);
}

function pokerOpenTournamentRatingPlayer(nick, options) {
  nick = String(nick || "").trim();
  if (!nick) return Promise.resolve(false);
  var key = pokerTournamentProfileOpenLoadingKey(nick);
  if (pokerTournamentProfileOpenLoadingNick && pokerTournamentProfileOpenLoadingNick === key) return Promise.resolve(false);
  setPokerTournamentProfileOpenLoading(nick, true);
  var openedAt = Date.now();
  var openPromise;
  if (typeof window.pokerOpenUnifiedPlayerProfileByRatingNick === "function") {
    openPromise = window.pokerOpenUnifiedPlayerProfileByRatingNick(nick, options);
  } else if (typeof openWinterRatingPlayerModalReady === "function") {
    openPromise = openWinterRatingPlayerModalReady(nick, options);
  } else {
    if (typeof openWinterRatingPlayerModal === "function") openWinterRatingPlayerModal(nick, options);
    openPromise = Promise.resolve(false);
  }
  return Promise.resolve(openPromise)
    .catch(function (err) {
      if (typeof console !== "undefined" && console.warn) console.warn("open tournament profile", err);
      return false;
    })
    .then(function (result) {
      var left = Math.max(0, 650 - (Date.now() - openedAt));
      pokerTournamentProfileOpenLoadingTimer = setTimeout(function () {
        setPokerTournamentProfileOpenLoading(nick, false);
      }, left);
      return result;
    });
}

window.pokerOpenUnifiedPlayerProfileByRatingNick = pokerOpenUnifiedPlayerProfileByRatingNick;
window.pokerOpenTournamentRatingPlayer = pokerOpenTournamentRatingPlayer;

var pokerRatingNickVerificationCache = {};
var pokerRatingNickVerificationPending = {};

function pokerRatingVerificationKey(nick) {
  return String(nick || "").trim().replace(/^@+/, "").replace(/\s+/g, " ").toLowerCase();
}

function pokerSetRatingNickButtonVerified(btn, verified) {
  if (!btn || !btn.classList) return;
  btn.classList.toggle("winter-rating__nick-btn--verified", !!verified);
  var badge = btn.querySelector(".winter-rating__verified-badge");
  if (!badge) return;
  badge.hidden = !verified;
  badge.setAttribute("aria-hidden", verified ? "false" : "true");
}

function pokerEnsureRatingNickBadge(btn) {
  if (!btn || btn.querySelector(".winter-rating__verified-badge")) return;
  var badge = document.createElement("span");
  badge.className = "winter-rating__verified-badge";
  badge.textContent = "✓";
  badge.title = "Профиль Poker21 привязан";
  badge.setAttribute("aria-label", "Профиль Poker21 привязан");
  badge.hidden = true;
  btn.appendChild(badge);
}

function pokerCheckRatingNickVerified(nick) {
  var key = pokerRatingVerificationKey(nick);
  if (!key) return Promise.resolve(false);
  if (Object.prototype.hasOwnProperty.call(pokerRatingNickVerificationCache, key)) {
    return Promise.resolve(!!pokerRatingNickVerificationCache[key]);
  }
  if (pokerRatingNickVerificationPending[key]) return pokerRatingNickVerificationPending[key];
  var base = typeof getApiBase === "function" ? getApiBase() : "";
  if (!base || typeof fetch !== "function") return Promise.resolve(false);
  var authQuery = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?";
  if (!authQuery || authQuery === "?") authQuery = "?";
  var sep = authQuery.length > 1 ? "&" : "";
  var url = base + "/api/users" + authQuery + sep + "ratingNick=" + encodeURIComponent(nick);
  pokerRatingNickVerificationPending[key] = fetch(url)
    .then(function (r) { return r.json().catch(function () { return null; }); })
    .then(function (data) {
      var verified = !!(data && data.ok && (data.pokerPlusVerified || data.p21Id));
      pokerRatingNickVerificationCache[key] = verified;
      delete pokerRatingNickVerificationPending[key];
      return verified;
    })
    .catch(function () {
      pokerRatingNickVerificationCache[key] = false;
      delete pokerRatingNickVerificationPending[key];
      return false;
    });
  return pokerRatingNickVerificationPending[key];
}

function pokerMarkVerifiedRatingNickButtons(root) {
  root = root || document;
  if (!root || !root.querySelectorAll) return;
  var buttons = Array.prototype.slice.call(root.querySelectorAll(".winter-rating__nick-btn[data-nick]"));
  var seen = {};
  buttons.forEach(function (btn) {
    var nick = String(btn.dataset.nick || "").trim();
    var key = pokerRatingVerificationKey(nick);
    if (!key) return;
    pokerEnsureRatingNickBadge(btn);
    if (Object.prototype.hasOwnProperty.call(pokerRatingNickVerificationCache, key)) {
      pokerSetRatingNickButtonVerified(btn, pokerRatingNickVerificationCache[key]);
    }
    if (seen[key]) return;
    seen[key] = true;
    pokerCheckRatingNickVerified(nick).then(function (verified) {
      buttons.forEach(function (candidate) {
        if (pokerRatingVerificationKey(candidate.dataset && candidate.dataset.nick) === key) {
          pokerSetRatingNickButtonVerified(candidate, verified);
        }
      });
    });
  });
}

window.pokerMarkVerifiedRatingNickButtons = pokerMarkVerifiedRatingNickButtons;

function shouldLoadWinterRatingPlayerHistory(options) {
  var seasonKey = getWinterRatingPlayerSeasonKey(options);
  if (!isWinterRatingPlayerSeasonalKey(seasonKey)) return false;
  return !(options && Array.isArray(options.onlyDates) && options.onlyDates.length);
}

function hasWinterRatingPlayerHistoryData() {
  return typeof WINTER_RATING_TOURNAMENTS_BY_DATE !== "undefined" || typeof WINTER_RATING_BY_DATE !== "undefined";
}

function copyWinterRatingPlayerOptions(options) {
  var out = {};
  options = options || {};
  Object.keys(options).forEach(function (key) {
    out[key] = options[key];
  });
  return out;
}

function mergeWinterRatingDateMap(target, source) {
  if (!target || !source || typeof source !== "object") return target;
  Object.keys(source).forEach(function (key) {
    target[key] = source[key];
  });
  return target;
}

function getWinterRatingActualSpringTournamentsByDate() {
  return typeof SPRING_RATING_TOURNAMENTS_BY_DATE !== "undefined" ? SPRING_RATING_TOURNAMENTS_BY_DATE || {} : {};
}

function getWinterRatingActiveSeasonTournamentsByDate(seasonKey) {
  seasonKey = getWinterRatingPlayerSeasonKey({ season: seasonKey });
  if (seasonKey === "summer") {
    if (typeof getSummerRatingTournamentsByDate === "function") return getSummerRatingTournamentsByDate() || {};
    return typeof SUMMER_RATING_TOURNAMENTS_BY_DATE !== "undefined" ? SUMMER_RATING_TOURNAMENTS_BY_DATE || {} : {};
  }
  if (typeof getSpringRatingTournamentsByDate === "function") return getSpringRatingTournamentsByDate() || {};
  return getWinterRatingActualSpringTournamentsByDate();
}

function ensureWinterRatingPlayerHistoryData(options) {
  if (!shouldLoadWinterRatingPlayerHistory(options) || hasWinterRatingPlayerHistoryData()) return Promise.resolve(true);
  if (typeof window.pokerEnsureScriptDomains !== "function") return Promise.resolve(true);
  return Promise.resolve(window.pokerEnsureScriptDomains(["rating-winter"]));
}

function getWinterRatingPlayerMonthLabel(monthKey) {
  var monthNames = { "12": "Декабрь", "01": "Январь", "02": "Февраль", "03": "Март", "04": "Апрель", "05": "Май", "06": "Июнь", "07": "Июль", "08": "Август", "09": "Сентябрь", "10": "Октябрь", "11": "Ноябрь" };
  var parts = String(monthKey || "").split(".");
  return monthNames[parts[0]] || String(monthKey || "");
}

function syncWinterRatingPlayerMonthOptions(monthSelect, summary) {
  if (!monthSelect) return;
  var months = {};
  (Array.isArray(summary) ? summary : []).forEach(function (row) {
    var parts = String(row && row.date || "").split(".");
    if (parts.length === 3) months[parts[1] + "." + parts[2]] = true;
  });
  var keys = Object.keys(months).sort(function (a, b) {
    var ap = a.split(".");
    var bp = b.split(".");
    return ((parseInt(bp[1], 10) || 0) * 12 + (parseInt(bp[0], 10) || 0)) -
      ((parseInt(ap[1], 10) || 0) * 12 + (parseInt(ap[0], 10) || 0));
  });
  var html = '<option value="all">Турниры за все время</option>';
  keys.forEach(function (key) {
    html += '<option value="' + escapeHtmlRating(key) + '">' + escapeHtmlRating(getWinterRatingPlayerMonthLabel(key)) + '</option>';
  });
  monthSelect.innerHTML = html;
}

function getWinterRatingPlayerSummary(nick, options) {
  nick = normalizeWinterNick(nick);
  var seasonKey = getWinterRatingPlayerSeasonKey(options);
  var isSeasonal = isWinterRatingPlayerSeasonalKey(seasonKey);
  var seasonConfig = getWinterRatingPlayerSeasonConfig(seasonKey) || {};
  var dateSet = {};
  var tournamentsByDate;
  if (isSeasonal) {
    tournamentsByDate = {};
    var winterT = typeof WINTER_RATING_TOURNAMENTS_BY_DATE !== "undefined" ? WINTER_RATING_TOURNAMENTS_BY_DATE : {};
    mergeWinterRatingDateMap(tournamentsByDate, winterT);
    mergeWinterRatingDateMap(tournamentsByDate, getWinterRatingActualSpringTournamentsByDate());
    mergeWinterRatingDateMap(tournamentsByDate, getWinterRatingActiveSeasonTournamentsByDate(seasonKey));
  } else {
    tournamentsByDate = getRatingTournamentsByDate();
  }
  var byDate = getRatingByDate();
  if (isSeasonal && typeof WINTER_RATING_BY_DATE !== "undefined") {
    var mergedByDate = {};
    Object.keys(WINTER_RATING_BY_DATE || {}).forEach(function (k) { mergedByDate[k] = WINTER_RATING_BY_DATE[k]; });
    Object.keys(byDate || {}).forEach(function (k) { mergedByDate[k] = byDate[k]; });
    byDate = mergedByDate;
  }
  if (typeof tournamentsByDate === "object") {
    Object.keys(tournamentsByDate).forEach(function (k) { dateSet[k] = true; });
  }
  if (typeof byDate === "object") {
    Object.keys(byDate).forEach(function (k) { dateSet[k] = true; });
  }
  var dates = Object.keys(dateSet).sort(function (a, b) {
    return winterRatingDateKeyToStamp(b) - winterRatingDateKeyToStamp(a);
  });
  var out = [];
  dates.forEach(function (dateStr) {
    var tournaments = tournamentsByDate && tournamentsByDate[dateStr];
    if (tournaments && tournaments.length) {
      tournaments.forEach(function (t) {
        var p = t.players && t.players.find(function (r) { return winterRatingSamePlayer(r.nick, nick); });
        if (p) {
          var reward = p.reward != null ? p.reward : 0;
          var league = t.league != null ? Number(t.league) : null;
          var seasonToneRegex = seasonConfig.monthToneRegex || /\.(03|04|05|06|07|08)\./;
          if (league == null && isSeasonal && seasonToneRegex.test(String(dateStr)) && t.buyin != null) {
            var buyin = Number(t.buyin);
            if (buyin === buyin) {
              league = buyin >= 500 ? 1 : (buyin >= 100 ? 2 : 1);
            }
          }
          out.push({
            date: dateStr,
            time: t.time || "",
            tournamentLabel: t.name || t.time || "",
            place: p.place,
            points: winterRatingTournamentPlayerPoints(p),
            reward: reward,
            league: league,
          });
        }
      });
      return;
    }
    var list = byDate && byDate[dateStr];
    if (!list || !list.length) return;
    var filtered = list.filter(function (r) { return r.points !== 0 || r.reward !== 0; });
    var sorted = filtered.slice().sort(function (a, b) { return (b.points - a.points) || (b.reward - a.reward); });
    var idx = sorted.findIndex(function (r) { return winterRatingSamePlayer(r.nick, nick); });
    if (idx === -1) return;
    var row = sorted[idx];
    out.push({
      date: dateStr,
      time: "",
      tournamentLabel: "",
      place: idx + 1,
      points: row.points,
      reward: row.reward != null ? row.reward : 0,
    });
  });
  return out.filter(function (s) {
    var p = Number(s.points);
    var w = Number(s.reward);
    return (p === p && p !== 0) || (w === w && w !== 0);
  });
}

function pokerGetWinterRatingPlayerTotalReward(nick, options) {
  var summary = getWinterRatingPlayerSummary(nick, options);
  var total = 0;
  for (var i = 0; i < summary.length; i++) total += Number(summary[i] && summary[i].reward) || 0;
  if (String(normalizeWinterNick(nick)) === "Waaar" && !(options && isWinterRatingPlayerSeasonalKey(getWinterRatingPlayerSeasonKey(options)))) {
    total += 588225;
  }
  return total;
}

window.pokerGetWinterRatingPlayerTotalReward = pokerGetWinterRatingPlayerTotalReward;

function pokerGetRatingPlayerTotalReward(nick, options) {
  options = options || {};
  var season = normalizeWinterRatingPlayerSeasonKey(options.season || options.ratingSeason || options.forceSeason);
  if (!season) {
    season = typeof SUMMER_RATING_TOURNAMENTS_BY_DATE !== "undefined"
      ? "summer"
      : (typeof SPRING_RATING_TOURNAMENTS_BY_DATE !== "undefined" ? "spring" : "winter");
  }
  return pokerGetWinterRatingPlayerTotalReward(nick, { season: season });
}

window.pokerGetRatingPlayerTotalReward = pokerGetRatingPlayerTotalReward;

function pokerRatingAchievementMonthLabel(monthKey) {
  var labels = {
    "01": "Январь",
    "02": "Февраль",
    "03": "Март",
    "04": "Апрель",
    "05": "Май",
    "06": "Июнь",
    "07": "Июль",
    "08": "Август",
    "09": "Сентябрь",
    "10": "Октябрь",
    "11": "Ноябрь",
    "12": "Декабрь",
  };
  var parts = String(monthKey || "").split(".");
  if (parts.length !== 2) return String(monthKey || "");
  return (labels[parts[0]] || parts[0]) + " " + parts[1];
}

window.pokerRatingAchievementMonthLabel = pokerRatingAchievementMonthLabel;

function pokerRatingAchievementTournamentRowsForSeason(seasonKey) {
  var maps = [];
  if (seasonKey === "winter") {
    if (typeof WINTER_RATING_TOURNAMENTS_BY_DATE !== "undefined") maps.push(WINTER_RATING_TOURNAMENTS_BY_DATE || {});
  } else if (seasonKey === "spring") {
    maps.push(getWinterRatingActualSpringTournamentsByDate());
  } else if (seasonKey === "summer") {
    maps.push(getWinterRatingActiveSeasonTournamentsByDate("summer"));
  }
  var rows = [];
  maps.forEach(function (map) {
    Object.keys(map || {}).forEach(function (dateStr) {
      var tournaments = map && map[dateStr];
      if (!Array.isArray(tournaments)) return;
      tournaments.forEach(function (tournament) {
        var players = tournament && Array.isArray(tournament.players) ? tournament.players : [];
        players.forEach(function (player) {
          var reward = player && player.reward != null ? Number(player.reward) : 0;
          if (reward !== reward || !isFinite(reward)) reward = 0;
          rows.push({
            season: seasonKey,
            date: dateStr,
            time: tournament && tournament.time || "",
            tournamentLabel: tournament && (tournament.name || tournament.time) || "",
            nick: normalizeWinterNick(player && player.nick),
            place: parseInt(player && player.place, 10) || 0,
            points: winterRatingTournamentPlayerPoints(player),
            reward: reward,
          });
        });
      });
    });
  });
  if (seasonKey === "winter" && typeof WINTER_RATING_BY_DATE !== "undefined") {
    var winterTournamentMap = typeof WINTER_RATING_TOURNAMENTS_BY_DATE !== "undefined" ? WINTER_RATING_TOURNAMENTS_BY_DATE || {} : {};
    Object.keys(WINTER_RATING_BY_DATE || {}).forEach(function (dateStr) {
      var tournamentList = winterTournamentMap && winterTournamentMap[dateStr];
      if (Array.isArray(tournamentList) && tournamentList.length) return;
      var list = WINTER_RATING_BY_DATE && WINTER_RATING_BY_DATE[dateStr];
      if (!Array.isArray(list) || !list.length) return;
      var sorted = list.filter(function (row) {
        return row && ((Number(row.points) || 0) !== 0 || (Number(row.reward) || 0) !== 0);
      }).slice().sort(function (a, b) {
        return ((Number(b.points) || 0) - (Number(a.points) || 0)) ||
          ((Number(b.reward) || 0) - (Number(a.reward) || 0));
      });
      sorted.forEach(function (row, index) {
        var reward = row && row.reward != null ? Number(row.reward) : 0;
        if (reward !== reward || !isFinite(reward)) reward = 0;
        rows.push({
          season: seasonKey,
          date: dateStr,
          time: "",
          tournamentLabel: "",
          nick: normalizeWinterNick(row && row.nick),
          place: index + 1,
          points: Number(row && row.points) || 0,
          reward: reward,
        });
      });
    });
  }
  return rows;
}

function pokerRatingAchievementAllTournamentRows() {
  return []
    .concat(pokerRatingAchievementTournamentRowsForSeason("winter"))
    .concat(pokerRatingAchievementTournamentRowsForSeason("spring"))
    .concat(pokerRatingAchievementTournamentRowsForSeason("summer"));
}

function pokerRatingAchievementOverallRowsForSeason(seasonKey) {
  seasonKey = normalizeWinterRatingPlayerSeasonKey(seasonKey);
  if (seasonKey === "spring" || seasonKey === "summer") {
    return [1, 2].reduce(function (items, leagueNum) {
      var rows = getTournamentRatingOverallByLeagueForSeason(seasonKey, leagueNum);
      return items.concat((Array.isArray(rows) ? rows : []).map(function (row, index) {
        return Object.assign({}, row, {
          season: seasonKey,
          league: leagueNum,
          place: index + 1,
        });
      }));
    }, []);
  }
  if (seasonKey === "winter") {
    var winterRows = [];
    [1, 2].forEach(function (leagueNum) {
      var leagueRows = buildWinterRatingOverallRowsFromTournamentsByLeague(leagueNum);
      if (!Array.isArray(leagueRows)) return;
      winterRows = winterRows.concat(leagueRows.map(function (row, index) {
        return Object.assign({}, row, {
          season: seasonKey,
          league: leagueNum,
          place: index + 1,
        });
      }));
    });
    if (winterRows.length) return winterRows;
    if (typeof WINTER_RATING_BY_DATE !== "undefined") {
      return buildWinterRatingOverallRowsFromData(WINTER_RATING_BY_DATE || {}).map(function (row, index) {
        return Object.assign({}, row, {
          season: seasonKey,
          league: "",
          place: index + 1,
        });
      });
    }
  }
  return [];
}

function pokerRatingAchievementAllOverallRows() {
  return []
    .concat(pokerRatingAchievementOverallRowsForSeason("winter"))
    .concat(pokerRatingAchievementOverallRowsForSeason("spring"))
    .concat(pokerRatingAchievementOverallRowsForSeason("summer"));
}

function pokerGetTournamentAchievementStats(nick) {
  var normalizedNick = normalizeWinterNick(nick);
  if (!normalizedNick) {
    return {
      firstPlaces: 0,
      overallFirstPlaces: 0,
      topWin: 0,
      totalReward: 0,
      bigWins50: [],
      bigWins100: [],
      dayHeroes: [],
      monthlyChampions: [],
      viceMonthlyChampions: [],
      rows: [],
    };
  }
  var allRows = pokerRatingAchievementAllTournamentRows();
  var playerRows = allRows.filter(function (row) {
    return row && winterRatingSamePlayer(row.nick, normalizedNick) && ((Number(row.points) || 0) !== 0 || (Number(row.reward) || 0) !== 0 || Number(row.place) === 1);
  }).sort(function (a, b) {
    return winterRatingDateKeyToStamp(a.date) - winterRatingDateKeyToStamp(b.date);
  });
  var overallFirstPlaces = pokerRatingAchievementAllOverallRows().filter(function (row) {
    return row && Number(row.place) === 1 && winterRatingSamePlayer(row.nick, normalizedNick);
  }).length;
  var firstPlaces = 0;
  var totalReward = 0;
  var topWin = 0;
  var bigWins50 = [];
  var bigWins100 = [];
  var dayHeroes = [];
  playerRows.forEach(function (row) {
    var reward = Number(row.reward) || 0;
    if (Number(row.place) === 1) firstPlaces += 1;
    totalReward += reward;
    if (reward > topWin) topWin = reward;
    if (reward >= 100000) bigWins100.push(row);
    else if (reward >= 50000) bigWins50.push(row);
  });

  var indexedHeroes = window.POKER_CLUB_NEWS_DATA && window.POKER_CLUB_NEWS_DATA.dayHeroes;
  if (indexedHeroes && typeof indexedHeroes === "object") {
    Object.keys(indexedHeroes).forEach(function (date) {
      var hero = indexedHeroes[date];
      if (winterRatingDateKeyToStamp(date) < 20260101 || !hero || !winterRatingSamePlayer(hero.nick, normalizedNick)) return;
      dayHeroes.push({ date: date, reward: Number(hero.reward) || 0, tournament: hero.tournament || "" });
    });
  } else {
    var heroDays = {};
    allRows.forEach(function (row) {
      if (!row || !row.nick || winterRatingDateKeyToStamp(row.date) < 20260101) return;
      var reward = Math.max(0, Number(row.reward) || 0);
      if (!reward) return;
      var nickKey = normalizeWinterNick(row.nick);
      if (!nickKey) return;
      var day = heroDays[row.date] || (heroDays[row.date] = {});
      var bestWin = day[nickKey];
      if (!bestWin || reward > bestWin.reward) day[nickKey] = { nick: row.nick, reward: reward, tournament: row.tournamentLabel || "" };
    });
    Object.keys(heroDays).forEach(function (date) {
      var hero = Object.keys(heroDays[date]).map(function (key) { return heroDays[date][key]; }).sort(function (a, b) {
        return (Number(b.reward) || 0) - (Number(a.reward) || 0) || String(a.nick || "").localeCompare(String(b.nick || ""), "ru");
      })[0];
      if (hero && winterRatingSamePlayer(hero.nick, normalizedNick)) dayHeroes.push({ date: date, reward: hero.reward, tournament: hero.tournament || "" });
    });
  }

  var byMonth = {};
  allRows.forEach(function (row) {
    if (!row || !row.nick) return;
    var parts = String(row.date || "").split(".");
    if (parts.length !== 3) return;
    var monthKey = parts[1] + "." + parts[2];
    if (!byMonth[monthKey]) byMonth[monthKey] = {};
    var nickKey = normalizeWinterNick(row.nick);
    if (!nickKey) return;
    if (!byMonth[monthKey][nickKey]) byMonth[monthKey][nickKey] = { nick: nickKey, wins: 0, reward: 0 };
    if (Number(row.place) === 1) byMonth[monthKey][nickKey].wins += 1;
    byMonth[monthKey][nickKey].reward += Number(row.reward) || 0;
  });
  var monthlyChampions = [];
  var viceMonthlyChampions = [];
  Object.keys(byMonth).forEach(function (monthKey) {
    var rows = Object.keys(byMonth[monthKey]).map(function (key) { return byMonth[monthKey][key]; })
      .filter(function (row) { return (Number(row.reward) || 0) > 0; })
      .sort(function (a, b) {
        return (Number(b.reward) || 0) - (Number(a.reward) || 0) ||
          String(a.nick || "").localeCompare(String(b.nick || ""), "ru");
      });
    if (!rows.length) return;
    rows.slice(0, 2).forEach(function (row, index) {
      if (!winterRatingSamePlayer(row.nick, normalizedNick)) return;
      var item = {
        monthKey: monthKey,
        place: index + 1,
        wins: row.wins,
        reward: row.reward,
        byReward: true,
      };
      if (index === 0) monthlyChampions.push(item);
      else if (index === 1) viceMonthlyChampions.push(item);
    });
  });
  function sortMonthRows(a, b) {
    var ap = String(a.monthKey || "").split(".");
    var bp = String(b.monthKey || "").split(".");
    return ((parseInt(bp[1], 10) || 0) * 12 + (parseInt(bp[0], 10) || 0)) -
      ((parseInt(ap[1], 10) || 0) * 12 + (parseInt(ap[0], 10) || 0));
  }
  monthlyChampions.sort(sortMonthRows);
  viceMonthlyChampions.sort(sortMonthRows);

  return {
    firstPlaces: firstPlaces,
    overallFirstPlaces: overallFirstPlaces,
    topWin: topWin,
    totalReward: totalReward,
    bigWins50: bigWins50.sort(function (a, b) { return (Number(b.reward) || 0) - (Number(a.reward) || 0); }),
    bigWins100: bigWins100.sort(function (a, b) { return (Number(b.reward) || 0) - (Number(a.reward) || 0); }),
    dayHeroes: dayHeroes.sort(function (a, b) { return winterRatingDateKeyToStamp(b.date) - winterRatingDateKeyToStamp(a.date); }),
    monthlyChampions: monthlyChampions,
    viceMonthlyChampions: viceMonthlyChampions,
    rows: playerRows,
  };
}

function pokerGetTournamentAchievementStatsReady(nick) {
  var ensure = [];
  if (typeof window.pokerEnsureScriptDomains === "function") {
    ensure.push(Promise.resolve(window.pokerEnsureScriptDomains(["rating-winter", "rating-spring", "rating-summer"])).catch(function () { return false; }));
  }
  return Promise.all(ensure).then(function () {
    return pokerGetTournamentAchievementStats(nick);
  }).catch(function () {
    return pokerGetTournamentAchievementStats(nick);
  });
}

window.pokerGetTournamentAchievementStats = pokerGetTournamentAchievementStats;
window.pokerGetTournamentAchievementStatsReady = pokerGetTournamentAchievementStatsReady;

function pokerGetFriendNewsTournamentSnapshots(nicks) {
  function snapshotNickKey(nick) {
    return String(normalizeWinterNick(nick) || "").trim().toLowerCase().replace(/\s+/g, "");
  }
  var requested = {};
  (Array.isArray(nicks) ? nicks : []).forEach(function (nick) {
    var key = snapshotNickKey(nick);
    if (key) requested[key] = true;
  });
  var snapshots = {};
  var recentEvents = [];
  var recentCutoff = Date.now() - 60 * 24 * 60 * 60 * 1000;
  Object.keys(requested).forEach(function (key) {
    snapshots[key] = {
      firstPlaces: 0,
      bigWins50: 0,
      bigWins100: 0,
      totalReward: 0,
      millionaireTier: 0,
      top10Finishes: 0,
      seasonCups: 0,
      monthChampions: 0,
      viceMonthChampions: 0,
      league1Place: 0,
      league2Place: 0,
    };
  });
  pokerRatingAchievementAllTournamentRows().forEach(function (row) {
    var key = snapshotNickKey(row && row.nick);
    var snapshot = snapshots[key];
    if (!snapshot) return;
    var reward = Number(row && row.reward) || 0;
    if (Number(row && row.place) === 1) snapshot.firstPlaces += 1;
    snapshot.totalReward += reward;
    if (reward >= 100000) snapshot.bigWins100 += 1;
    else if (reward >= 50000) snapshot.bigWins50 += 1;
    var dateParts = String(row && row.date || "").split(".");
    var rowDate = dateParts.length === 3
      ? new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]), 12, 0, 0)
      : null;
    if (rowDate && Number.isFinite(rowDate.getTime()) && rowDate.getTime() >= recentCutoff && rowDate.getTime() <= Date.now() + 86400000) {
      recentEvents.push({
        nickKey: key,
        nick: String(row && row.nick || "").trim(),
        date: rowDate.toISOString(),
        dateLabel: String(row.date || ""),
        place: Number(row && row.place) || 0,
        reward: reward,
        tournament: String(row && (row.tournamentLabel || row.time) || "").trim(),
        firstPlacesCount: snapshot.firstPlaces,
        bigWins50Count: snapshot.bigWins50,
        bigWins100Count: snapshot.bigWins100,
        totalReward: snapshot.totalReward,
      });
    }
  });
  Object.keys(snapshots).forEach(function (key) {
    snapshots[key].millionaireTier = Math.min(5, Math.floor(snapshots[key].totalReward / 1000000));
  });
  pokerRatingAchievementAllOverallRows().forEach(function (row) {
    var key = snapshotNickKey(row && row.nick);
    var snapshot = snapshots[key];
    var place = Number(row && row.place) || 0;
    if (!snapshot || !place) return;
    if (place <= 10) snapshot.top10Finishes += 1;
    if (place <= 3 && String(row && row.season || "") !== "summer") snapshot.seasonCups += 1;
  });
  var monthly = {};
  var friendNewsNow = new Date();
  var currentMonthKey = String(friendNewsNow.getMonth() + 1).padStart(2, "0") + "." + friendNewsNow.getFullYear();
  pokerRatingAchievementAllTournamentRows().forEach(function (row) {
    var parts = String(row && row.date || "").split(".");
    var key = snapshotNickKey(row && row.nick);
    if (parts.length !== 3 || !key || !snapshots[key]) return;
    var monthKey = parts[1] + "." + parts[2];
    if (!monthly[monthKey]) monthly[monthKey] = {};
    if (!monthly[monthKey][key]) monthly[monthKey][key] = 0;
    monthly[monthKey][key] += Number(row && row.reward) || 0;
  });
  Object.keys(monthly).forEach(function (monthKey) {
    if (monthKey === currentMonthKey) return;
    Object.keys(monthly[monthKey]).map(function (key) {
      return { key: key, reward: monthly[monthKey][key] };
    }).filter(function (row) {
      return row.reward > 0;
    }).sort(function (a, b) {
      return b.reward - a.reward || a.key.localeCompare(b.key, "ru");
    }).slice(0, 2).forEach(function (row, index) {
      if (!snapshots[row.key]) return;
      if (index === 0) snapshots[row.key].monthChampions += 1;
      else snapshots[row.key].viceMonthChampions += 1;
    });
  });
  [1, 2].forEach(function (leagueNum) {
    getTournamentRatingOverallByLeagueForSeason("summer", leagueNum).forEach(function (row, index) {
      var key = snapshotNickKey(row && row.nick);
      if (!snapshots[key]) return;
      snapshots[key][leagueNum === 1 ? "league1Place" : "league2Place"] = index + 1;
    });
  });
  snapshots.__recentEvents = recentEvents.sort(function (a, b) {
    return new Date(b.date).getTime() - new Date(a.date).getTime() || b.reward - a.reward;
  }).slice(0, 500);
  return snapshots;
}

function pokerGetFriendNewsTournamentSnapshotsReady(nicks) {
  var ready = typeof window.pokerEnsureScriptDomains === "function"
    ? Promise.resolve(window.pokerEnsureScriptDomains(["rating-winter", "rating-spring", "rating-summer"])).catch(function () { return false; })
    : Promise.resolve(false);
  return ready.then(function () {
    return pokerGetFriendNewsTournamentSnapshots(nicks);
  });
}

function pokerGetClubNewsTournamentSnapshotsReady() {
  var ready = typeof window.pokerEnsureScriptDomains === "function"
    ? Promise.resolve(window.pokerEnsureScriptDomains(["rating-winter", "rating-spring", "rating-summer"])).catch(function () { return false; })
    : Promise.resolve(false);
  return ready.then(function () {
    function clubNewsRatingNickKey(nick) {
      return String(normalizeWinterNick(nick) || "").trim().toLowerCase().replace(/\s+/g, "");
    }
    var allRows = pokerRatingAchievementAllTournamentRows();
    var nicks = allRows.map(function (row) {
      return row && row.nick;
    }).filter(Boolean);
    var snapshots = pokerGetFriendNewsTournamentSnapshots(nicks);
    snapshots.__sourceRowCount = allRows.length;
    snapshots.__latestSourceDateStamp = allRows.reduce(function (latest, row) {
      return Math.max(latest, winterRatingDateKeyToStamp(String(row && row.date || "")));
    }, 0);
    var latestStamp = snapshots.__latestSourceDateStamp;
    var latestDate = allRows.map(function (row) { return String(row && row.date || ""); }).find(function (date) {
      return winterRatingDateKeyToStamp(date) === latestStamp;
    }) || "";
    var latestNickKeys = {};
    allRows.forEach(function (row) {
      if (String(row && row.date || "") !== latestDate) return;
      var key = clubNewsRatingNickKey(row && row.nick);
      if (key) latestNickKeys[key] = String(row.nick || "").trim();
    });
    snapshots.__ratingChanges = [];
    [1, 2].forEach(function (leagueNum) {
      var currentRows = getTournamentRatingOverallByLeagueForSeason("summer", leagueNum);
      var tournaments = getTournamentRatingTournamentsBySeason("summer");
      var removedLatest = tournaments[latestDate];
      if (!latestDate || !removedLatest) return;
      delete tournaments[latestDate];
      var previousRows = getTournamentRatingOverallByLeagueForSeason("summer", leagueNum);
      tournaments[latestDate] = removedLatest;
      var previousPlaces = {};
      previousRows.forEach(function (row, index) { previousPlaces[clubNewsRatingNickKey(row && row.nick)] = index + 1; });
      var currentPlaces = {};
      currentRows.forEach(function (row, index) { currentPlaces[clubNewsRatingNickKey(row && row.nick)] = index + 1; });
      currentRows.forEach(function (row, index) {
        var key = clubNewsRatingNickKey(row && row.nick);
        if (!latestNickKeys[key]) return;
        var oldPlace = Number(previousPlaces[key]) || 0;
        var newPlace = index + 1;
        if (!oldPlace || oldPlace === newPlace) return;
        var rose = newPlace < oldPlace;
        var displacedRow = rose ? previousRows[newPlace - 1] : null;
        var displacedKey = clubNewsRatingNickKey(displacedRow && displacedRow.nick);
        var displacedNewPlace = Number(currentPlaces[displacedKey]) || 0;
        var didDisplace = rose && displacedKey && displacedKey !== key &&
          (!displacedNewPlace || displacedNewPlace > newPlace);
        var displacedText = didDisplace
          ? ", сместив " + String(displacedRow.nick || "игрока") + " с " + newPlace + "-го" +
            (displacedNewPlace ? " на " + displacedNewPlace + "-е место" : " ниже")
          : "";
        snapshots.__ratingChanges.push({
          id: "rating-change:rating:" + key + ":league" + leagueNum + ":" + oldPlace + ":" + newPlace + ":" + latestDate,
          type: "rating",
          icon: rose ? "▲" : "▼",
          text: latestNickKeys[key] + (rose ? " поднялся" : " спустился") + " в рейтинге Лиги " + leagueNum +
            " с " + oldPlace + "-го на " + newPlace + "-е место" + displacedText,
          at: latestDate.split(".").reverse().join("-") + "T23:55:00",
          actorId: "rating:" + key,
          actorNick: latestNickKeys[key],
          affectedActorNicks: didDisplace && displacedRow && displacedRow.nick
            ? [latestNickKeys[key], String(displacedRow.nick)] : [latestNickKeys[key]],
          _ratingLeague: leagueNum,
          _ratingOldPlace: oldPlace,
          _ratingNewPlace: newPlace,
          _eventKind: "rating-change",
        });
      });
    });
    return snapshots;
  });
}

window.pokerGetFriendNewsTournamentSnapshots = pokerGetFriendNewsTournamentSnapshots;
window.pokerGetFriendNewsTournamentSnapshotsReady = pokerGetFriendNewsTournamentSnapshotsReady;
window.pokerGetClubNewsTournamentSnapshotsReady = pokerGetClubNewsTournamentSnapshotsReady;

function applyWinterRatingPlayerModalFilterAndRender(modal) {
  var fullSummary = modal._winterPlayerModalFullSummary;
  var showPoints = modal._winterPlayerModalShowPoints;
  var tableWrap = modal.querySelector(".winter-rating-player-modal__table-wrap");
  var summaryBlock = document.getElementById("winterRatingPlayerModalSummary");
  var monthSelect = document.getElementById("winterRatingPlayerModalMonth");
  var sortByBtn = document.getElementById("winterRatingPlayerModalSortBy");
  var sortDirBtn = document.getElementById("winterRatingPlayerModalSortDir");
  var monthVal = monthSelect && monthSelect.value ? monthSelect.value : "all";
  modal.classList.toggle("winter-rating-player-modal--all-time", monthVal === "all");
  if (!fullSummary || !tableWrap) return;
  var leagueSelect = document.getElementById("winterRatingPlayerModalLeague");
  var leagueVal = leagueSelect && leagueSelect.value ? leagueSelect.value : "all";
  var sortByText = sortByBtn ? String(sortByBtn.textContent || "").toLowerCase() : "";
  var sortBy = sortByText.indexOf("призов") !== -1 ? "reward" : "date";
  var sortDesc = (sortDirBtn && sortDirBtn.textContent.indexOf("↑") === -1);
  var modalSeasonKey = modal._winterPlayerModalSeasonKey || getWinterRatingPlayerSeasonKey();
  var list = monthVal === "all" ? fullSummary.slice() : fullSummary.filter(function (s) {
    var parts = String(s.date).split(".");
    return parts.length === 3 && parts[1] + "." + parts[2] === monthVal;
  });
  if (leagueVal === "1" || leagueVal === "2") {
    var leagueNum = parseInt(leagueVal, 10);
    list = list.filter(function (s) { return s.league === leagueNum; });
  }
  list.sort(function (a, b) {
    var cmp = 0;
    if (sortBy === "date") {
      cmp = winterRatingDateKeyToStamp(a.date) - winterRatingDateKeyToStamp(b.date);
    } else {
      cmp = (Number(a.reward) || 0) - (Number(b.reward) || 0);
    }
    return sortDesc ? -cmp : cmp;
  });
  if (list.length) {
    var PLAYER_MODAL_TOURNAMENTS_LIMIT = 15;
    var expanded = !!modal._winterPlayerModalTableExpanded;
    var displayList = list.length > PLAYER_MODAL_TOURNAMENTS_LIMIT && !expanded
      ? list.slice(0, PLAYER_MODAL_TOURNAMENTS_LIMIT)
      : list;
    var totalPointsFiltered = 0;
    for (var pi = 0; pi < list.length; pi++) { totalPointsFiltered += Number(list[pi].points) || 0; }
    var totalRewardFiltered = 0;
    for (var ri = 0; ri < list.length; ri++) { totalRewardFiltered += winterRatingDisplayRewardValue(list[ri].reward); }
    if (monthVal === "all" && modal._winterPlayerModalNick === "Waaar" && !isWinterRatingPlayerSeasonalKey(modalSeasonKey)) totalRewardFiltered += 588225;
    var totalRewardFilteredStr = totalRewardFiltered ? formatRewardRound(totalRewardFiltered) : "0";
    var headers = "<th class=\"winter-rating-player-modal__th-date\">Дата</th><th class=\"winter-rating-player-modal__th-tournament\">Турнир</th><th class=\"winter-rating-player-modal__th-place\">Место</th>";
    if (showPoints) headers += "<th class=\"winter-rating-player-modal__th-points\">Баллы</th>";
    headers += "<th class=\"winter-rating-player-modal__th-reward\">Призовые</th>";
    var footerCells = "<td colspan=\"3\" class=\"winter-rating-player-modal__total-label\">Итого призовые</td>";
    if (showPoints) footerCells += "<td class=\"winter-rating-player-modal__total-value\">" + totalPointsFiltered + "</td>";
    footerCells += "<td class=\"winter-rating-player-modal__total-value\">" + totalRewardFilteredStr + "</td>";
    var tableHtml = "<table class=\"winter-rating__table winter-rating-player-modal__table\"><thead><tr>" + headers + "</tr></thead><tbody>" +
      displayList.map(function (s, i) {
        var placeStr = winterRatingPlaceCell(s.place);
        var rewardStr = winterRatingDisplayReward(s.reward);
        var showDate = (i === 0 || displayList[i - 1].date !== s.date);
        var dateCell = showDate ? escapeHtmlRating(s.date) : "";
        var tourCell = escapeHtmlRating(s.tournamentLabel || s.time || "—");
        var ptsCell = showPoints ? "<td class=\"winter-rating-player-modal__td-points\">" + (s.points || 0) + "</td>" : "";
        var dateParts = String(s.date || "").split(".");
        var monthKey = dateParts.length >= 3 ? dateParts[1] + "." + dateParts[2] : "";
        var prevParts = i > 0 ? String(displayList[i - 1].date || "").split(".") : [];
        var prevMonthKey = prevParts.length >= 3 ? prevParts[1] + "." + prevParts[2] : "";
        var isNewMonth = i > 0 && monthKey && monthKey !== prevMonthKey;
        var rewardTone = winterRatingRewardTone(winterRatingDisplayRewardValue(s.reward));
        var rewardClass = rewardTone === "high" ? " winter-rating-player-modal__tr--reward-high" : (rewardTone === "mid" ? " winter-rating-player-modal__tr--reward-mid" : "");
        var trClass = (isNewMonth ? " winter-rating-player-modal__tr--month-start" : "") + rewardClass;
        return "<tr class=\"" + trClass.replace(/^ /, "") + "\"><td class=\"winter-rating-player-modal__td-date\">" + dateCell + "</td><td class=\"winter-rating-player-modal__td-tournament\">" + tourCell + "</td><td class=\"winter-rating-player-modal__td-place\">" + placeStr + "</td>" + ptsCell + "<td class=\"winter-rating-player-modal__td-reward\">" + rewardStr + "</td></tr>";
      }).join("") + "</tbody><tfoot><tr class=\"winter-rating-player-modal__total-row\">" + footerCells + "</tr></tfoot></table>";
    var showAllHtml = list.length > PLAYER_MODAL_TOURNAMENTS_LIMIT
      ? "<div class=\"winter-rating-player-modal__show-all-wrap\"><button type=\"button\" class=\"winter-rating-player-modal__show-all-btn\" aria-label=\"Раскрыть или свернуть список\">" + (expanded ? "Свернуть" : "Показать все (" + list.length + ")") + "</button></div>"
      : "";
    tableWrap.innerHTML = tableHtml + showAllHtml;
    var firstsList = list.filter(function (s) { return Number(s.place) === 1; });
    var firsts = firstsList.length;
    var firstsReward = 0;
    for (var fi = 0; fi < firstsList.length; fi++) { firstsReward += Number(firstsList[fi].reward) || 0; }
    var firstsRewardStr = firstsReward ? formatRewardRound(firstsReward) : "0";
    var secondsList = list.filter(function (s) { return Number(s.place) === 2; });
    var seconds = secondsList.length;
    var secondsReward = 0;
    for (var si = 0; si < secondsList.length; si++) { secondsReward += Number(secondsList[si].reward) || 0; }
    var secondsRewardStr = secondsReward ? formatRewardRound(secondsReward) : "0";
    var thirdsList = list.filter(function (s) { return Number(s.place) === 3; });
    var thirds = thirdsList.length;
    var thirdsReward = 0;
    for (var ti = 0; ti < thirdsList.length; ti++) { thirdsReward += Number(thirdsList[ti].reward) || 0; }
    var thirdsRewardStr = thirdsReward ? formatRewardRound(thirdsReward) : "0";
    var totalReward = 0;
    for (var i = 0; i < list.length; i++) { totalReward += Number(list[i].reward) || 0; }
    if (monthVal === "all" && modal._winterPlayerModalNick === "Waaar" && !isWinterRatingPlayerSeasonalKey(modalSeasonKey)) totalReward += 588225;
    var totalStr = totalReward ? formatRewardRound(totalReward) : "0";
    var topReward = 0;
    for (var ri = 0; ri < list.length; ri++) {
      var r = Number(list[ri].reward) || 0;
      if (r > topReward) topReward = r;
    }
    var topRewardStr = topReward ? formatRewardRound(topReward) : "0";
    var monthNames = { "12": "Декабрь", "01": "Январь", "02": "Февраль", "03": "Март", "04": "Апрель", "05": "Май", "06": "Июнь", "07": "Июль", "08": "Август", "09": "Сентябрь", "10": "Октябрь", "11": "Ноябрь" };
    var fullSummaryForMonths = modal._winterPlayerModalFullSummary || [];
    var byMonth = {};
    for (var mi = 0; mi < fullSummaryForMonths.length; mi++) {
      var parts = String(fullSummaryForMonths[mi].date).split(".");
      if (parts.length === 3) {
        var monthKey = parts[1] + "." + parts[2];
        if (!byMonth[monthKey]) byMonth[monthKey] = { key: monthKey, sum: 0 };
        byMonth[monthKey].sum += Number(fullSummaryForMonths[mi].reward) || 0;
      }
    }
    var monthOrder = ["12.2025", "01.2026", "02.2026", "03.2026", "04.2026", "05.2026", "06.2026", "07.2026", "08.2026", "09.2026", "10.2026", "11.2026"];
    var monthRows = "";
    monthOrder.forEach(function (monthKey) {
      if (byMonth[monthKey] && byMonth[monthKey].sum) {
        var p = monthKey.split(".");
        var monthLabel = (monthNames[p[0]] || p[0]) + " " + p[1];
        monthRows += "<tr><td class=\"winter-rating-player-modal__summary-label\">" + escapeHtmlRating(monthLabel) + "</td><td class=\"winter-rating-player-modal__summary-value\">" + formatRewardRound(byMonth[monthKey].sum) + "</td></tr>";
      }
    });
    modal._winterPlayerModalTotalStr = totalStr;
    if (summaryBlock) {
      summaryBlock.innerHTML = "<table class=\"winter-rating-player-modal__summary-table\"><tbody>" +
        "<tr class=\"winter-rating-player-modal__summary-total-row\"><td class=\"winter-rating-player-modal__summary-label\">Общие призовые</td><td class=\"winter-rating-player-modal__summary-value\">" + totalStr + "</td></tr>" +
        "<tr><td class=\"winter-rating-player-modal__summary-label\">Топ призовых</td><td class=\"winter-rating-player-modal__summary-value\">" + topRewardStr + "</td></tr>" +
        "<tr><td class=\"winter-rating-player-modal__summary-label\">Первых мест</td><td class=\"winter-rating-player-modal__summary-value\">" + firsts + " (призовые — " + firstsRewardStr + ")</td></tr>" +
        "<tr><td class=\"winter-rating-player-modal__summary-label\">Вторых мест</td><td class=\"winter-rating-player-modal__summary-value\">" + seconds + " (призовые — " + secondsRewardStr + ")</td></tr>" +
        "<tr><td class=\"winter-rating-player-modal__summary-label\">Третьих мест</td><td class=\"winter-rating-player-modal__summary-value\">" + thirds + " (призовые — " + thirdsRewardStr + ")</td></tr>" +
        (monthRows ? "<tr class=\"winter-rating-player-modal__summary-months-sep\"><td colspan=\"2\">Призовые по месяцам</td></tr>" + monthRows : "") +
        "</tbody></table>";
      summaryBlock.style.display = "";
    }
  } else {
    modal._winterPlayerModalTotalStr = "0";
    tableWrap.innerHTML = "<p class=\"winter-rating-player-modal__empty\">Нет данных за выбранный период</p>";
    if (summaryBlock) { summaryBlock.innerHTML = ""; summaryBlock.style.display = "none"; }
  }
}

function openWinterRatingPlayerModal(nick, options) {
  options = options || {};
  if (shouldLoadWinterRatingPlayerHistory(options) && !options.__winterHistoryEnsured && !hasWinterRatingPlayerHistoryData()) {
    var deferredOptions = copyWinterRatingPlayerOptions(options);
    deferredOptions.__winterHistoryEnsured = true;
    ensureWinterRatingPlayerHistoryData(options).then(function () {
      openWinterRatingPlayerModal(nick, deferredOptions);
    }).catch(function () {
      openWinterRatingPlayerModal(nick, deferredOptions);
    });
    return;
  }
  var modal = document.getElementById("winterRatingPlayerModal");
  if (modal) initWinterRatingPlayerModal();
  var titleEl = modal && modal.querySelector(".winter-rating-player-modal__title");
  var tableWrap = modal && modal.querySelector(".winter-rating-player-modal__table-wrap");
  var summaryBlock = modal && document.getElementById("winterRatingPlayerModalSummary");
  var monthSelect = document.getElementById("winterRatingPlayerModalMonth");
  var sortByBtn = document.getElementById("winterRatingPlayerModalSortBy");
  var sortDirBtn = document.getElementById("winterRatingPlayerModalSortDir");
  if (!modal || !titleEl || !tableWrap) return;
  var seasonKey = getWinterRatingPlayerSeasonKey(options);
  var summary = getWinterRatingPlayerSummary(nick, options);
  var fromGazette = options.onlyDates && Array.isArray(options.onlyDates) && options.onlyDates.length;
  if (fromGazette) {
    var allowedSet = {};
    options.onlyDates.forEach(function (d) { allowedSet[d] = true; });
    summary = summary.filter(function (s) { return allowedSet[s.date]; });
  }
  var useGazetteStyle = fromGazette && !options.skipGazetteStyle;
  modal.classList.toggle("winter-rating-player-modal--gazette", !!useGazetteStyle);
  titleEl.textContent = nick;
  modal._winterPlayerModalFullSummary = summary;
  modal._winterPlayerModalTableExpanded = false;
  modal._winterPlayerModalShowPoints = !useGazetteStyle;
  modal._winterPlayerModalNick = normalizeWinterNick(nick);
  modal._winterPlayerModalSeasonKey = seasonKey;
  syncWinterRatingPlayerModalArt(modal, nick, seasonKey);
  syncWinterRatingPlayerMonthOptions(monthSelect, summary);
  if (monthSelect) monthSelect.value = "all";
  var leagueWrap = document.getElementById("winterRatingPlayerModalLeagueWrap");
  var leagueSelect = document.getElementById("winterRatingPlayerModalLeague");
  if (leagueWrap) leagueWrap.style.display = (isWinterRatingPlayerSeasonalKey(seasonKey) && summary.length) ? "" : "none";
  if (leagueSelect) leagueSelect.value = "all";
  if (sortByBtn) sortByBtn.textContent = "По дате";
  if (sortDirBtn) { sortDirBtn.textContent = "↓"; sortDirBtn.title = "По убыванию"; }
  var toolbar = modal.querySelector(".winter-rating-player-modal__toolbar");
  var tableLabel = document.getElementById("winterRatingPlayerModalTableLabel");
  if (toolbar) toolbar.style.display = summary.length ? "" : "none";
  if (tableLabel) tableLabel.style.display = summary.length ? "" : "none";
  if (summary.length) {
    applyWinterRatingPlayerModalFilterAndRender(modal);
    var shareWrap = modal.querySelector(".winter-rating-player-modal__share-wrap");
    if (shareWrap) shareWrap.style.display = "";
  } else {
    tableWrap.innerHTML = "<p class=\"winter-rating-player-modal__empty\">Нет данных по датам</p>";
    if (summaryBlock) { summaryBlock.innerHTML = ""; summaryBlock.style.display = "none"; }
    var shareWrap = modal.querySelector(".winter-rating-player-modal__share-wrap");
    if (shareWrap) shareWrap.style.display = "none";
  }
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function openWinterRatingPlayerModalReady(nick, options) {
  if (!nick) return Promise.resolve(false);
  options = options || {};
  function openReadyModal() {
    var nextOptions = copyWinterRatingPlayerOptions(options);
    if (shouldLoadWinterRatingPlayerHistory(options)) nextOptions.__winterHistoryEnsured = true;
    openWinterRatingPlayerModal(nick, nextOptions);
    return true;
  }
  function ensureHistoryAndOpen() {
    return ensureWinterRatingPlayerHistoryData(options).then(openReadyModal).catch(openReadyModal);
  }
  if (document.getElementById("winterRatingPlayerModal")) {
    return ensureHistoryAndOpen();
  }
  if (typeof window.pokerEnsureGlobalModalsHtml === "function") {
    return Promise.resolve(window.pokerEnsureGlobalModalsHtml()).then(function () {
      return ensureHistoryAndOpen();
    }).catch(function () {
      return ensureHistoryAndOpen();
    });
  }
  return ensureHistoryAndOpen();
}

function getLatestTournamentRatingSeasonKey() {
  if (typeof SUMMER_RATING_SEASON !== "undefined") return "summer";
  if (typeof SPRING_RATING_SEASON !== "undefined") return "spring";
  return "winter";
}

function pokerOpenLatestTournamentRatingPlayerModal(nick, options) {
  if (!nick) return;
  var nextOptions = copyWinterRatingPlayerOptions(options || {});
  if (!nextOptions.season && !nextOptions.ratingSeason && !nextOptions.forceSeason) {
    nextOptions.season = getLatestTournamentRatingSeasonKey();
  }
  openWinterRatingPlayerModalReady(nick, nextOptions);
}

window.pokerOpenLatestTournamentRatingPlayerModal = pokerOpenLatestTournamentRatingPlayerModal;

function closeWinterRatingPlayerModal() {
  var modal = document.getElementById("winterRatingPlayerModal");
  if (modal) {
    modal.setAttribute("aria-hidden", "true");
    delete modal._winterPlayerModalSeasonKey;
    document.body.style.overflow = "";
  }
}

function initWinterRatingPlayerModal() {
  var modal = document.getElementById("winterRatingPlayerModal");
  if (!modal || modal.getAttribute("data-inited") === "1") return;
  modal.setAttribute("data-inited", "1");
  var closeBtn = modal.querySelector(".winter-rating-player-modal__close");
  var backBtn = document.getElementById("winterRatingPlayerModalBack") || modal.querySelector(".winter-rating-player-modal__back");
  if (closeBtn) closeBtn.addEventListener("click", closeWinterRatingPlayerModal);
  if (backBtn) backBtn.addEventListener("click", closeWinterRatingPlayerModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeWinterRatingPlayerModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeWinterRatingPlayerModal();
  });
  var monthSelect = document.getElementById("winterRatingPlayerModalMonth");
  var sortByBtn = document.getElementById("winterRatingPlayerModalSortBy");
  var sortDirBtn = document.getElementById("winterRatingPlayerModalSortDir");
  if (monthSelect) {
    monthSelect.addEventListener("change", function () {
      if (modal._winterPlayerModalFullSummary) applyWinterRatingPlayerModalFilterAndRender(modal);
    });
  }
  var leagueSelect = document.getElementById("winterRatingPlayerModalLeague");
  if (leagueSelect) {
    leagueSelect.addEventListener("change", function () {
      if (modal._winterPlayerModalFullSummary) applyWinterRatingPlayerModalFilterAndRender(modal);
    });
  }
  if (sortByBtn) {
    sortByBtn.addEventListener("click", function () {
      if (sortByBtn.textContent.indexOf("дате") !== -1) {
        sortByBtn.textContent = "По призовым";
      } else {
        sortByBtn.textContent = "По дате";
      }
      if (modal._winterPlayerModalFullSummary) applyWinterRatingPlayerModalFilterAndRender(modal);
    });
  }
  if (sortDirBtn) {
    sortDirBtn.addEventListener("click", function () {
      if (sortDirBtn.textContent.indexOf("↑") !== -1) {
        sortDirBtn.textContent = "↓";
        sortDirBtn.title = "По убыванию";
      } else {
        sortDirBtn.textContent = "↑";
        sortDirBtn.title = "По возрастанию";
      }
      if (modal._winterPlayerModalFullSummary) applyWinterRatingPlayerModalFilterAndRender(modal);
    });
  }
  modal.addEventListener("click", function (e) {
    var btn = e.target && e.target.closest && e.target.closest(".winter-rating-player-modal__show-all-btn");
    if (btn && modal._winterPlayerModalFullSummary) {
      modal._winterPlayerModalTableExpanded = !modal._winterPlayerModalTableExpanded;
      applyWinterRatingPlayerModalFilterAndRender(modal);
    }
  });
  var shareBtn = document.getElementById("winterRatingPlayerModalShareBtn");
  if (shareBtn) {
    shareBtn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var titleEl = modal.querySelector(".winter-rating-player-modal__title");
      var nick = modal._winterPlayerModalNick || (titleEl && titleEl.textContent) || "";
      if (!nick) return;
      var seasonKey = modal._winterPlayerModalSeasonKey || getWinterRatingPlayerSeasonKey();
      var startApp = getWinterRatingPlayerSeasonStartAppPrefix("player", seasonKey);
      var link =
        typeof buildMiniAppStartLink === "function" ? buildMiniAppStartLink(startApp + nick) : "";
      pokerCopyTextToClipboard(link).then(function (copied) {
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (copied) {
          if (tg && tg.showAlert) tg.showAlert("Ссылка скопирована. Отправьте другу — откроется сводка по игроку " + nick + "."); else alert("Ссылка скопирована.");
        } else if (tg && tg.showAlert) {
          tg.showAlert("Ссылка: " + link);
        } else {
          alert("Ссылка: " + link);
        }
      });
    });
  }
  var shareTelegramBtn = document.getElementById("winterRatingPlayerModalShareTelegramBtn");
  if (shareTelegramBtn) {
    shareTelegramBtn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var titleEl = modal.querySelector(".winter-rating-player-modal__title");
      var nick = modal._winterPlayerModalNick || (titleEl && titleEl.textContent) || "";
      if (!nick) return;
      var seasonKey = modal._winterPlayerModalSeasonKey || getWinterRatingPlayerSeasonKey();
      var startApp = getWinterRatingPlayerSeasonStartAppPrefix("player", seasonKey);
      var link =
        typeof buildMiniAppStartLink === "function" ? buildMiniAppStartLink(startApp + nick) : "";
      if (!link) return;
      if (isTelegramWebApp() && typeof pokerOpenTelegramShareUrlOnly === "function" && pokerOpenTelegramShareUrlOnly(link)) {
        if (typeof recordShareButtonClick === "function") recordShareButtonClick("winter_rating_player_share");
        return;
      }
      var totalStr = modal._winterPlayerModalTotalStr || "0";
      var shareText = "Игрок " + nick + " уже выиграл " + totalStr + ". Посмотрите отчет по турнирам.";
      var shareUrl =
        typeof pokerBuildTelegramShareUrlDialog === "function" ? pokerBuildTelegramShareUrlDialog(link, shareText) : "";
      pokerTryPwaWebShare({ text: shareText + "\n" + link, url: link }).then(function (pwaOk) {
        if (pwaOk) {
          if (typeof recordShareButtonClick === "function") recordShareButtonClick("winter_rating_player_share");
          return;
        }
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.openTelegramLink) tg.openTelegramLink(shareUrl);
        else if (tg && tg.openLink) tg.openLink(shareUrl);
        else window.open(shareUrl, "_blank");
        if (typeof recordShareButtonClick === "function") recordShareButtonClick("winter_rating_player_share");
      });
    });
  }
}

function getWinterRatingOverall() {
  if (isSpringRatingMode()) return [];
  var byNick = {};
  var data = getRatingByDate() || {};
  var dateStrs = Object.keys(data);
  for (var i = 0; i < dateStrs.length; i++) {
    var dateStr = dateStrs[i];
    var list = data[dateStr];
    if (!Array.isArray(list) || !list.length) continue;
    for (var j = 0; j < list.length; j++) {
      var r = list[j];
      var n = normalizeWinterNick(r && r.nick);
      if (!n) continue;
      var pts = Number(r.points);
      var rew = Number(r.reward);
      if (pts !== pts) pts = 0;
      if (rew !== rew) rew = 0;
      if (!byNick[n]) byNick[n] = { nick: n, points: 0, reward: 0 };
      byNick[n].points += pts;
      byNick[n].reward += rew;
    }
  }
  if (!isSpringRatingMode()) {
  if (byNick["Coo1er91"]) byNick["Coo1er91"].points += 55; else byNick["Coo1er91"] = { nick: "Coo1er91", points: 55, reward: 0 };
  if (byNick["Waaar"]) byNick["Waaar"].points += 325; else byNick["Waaar"] = { nick: "Waaar", points: 325, reward: 0 };
  if (byNick["Waaar"]) { byNick["Waaar"].points += 765; byNick["Waaar"].reward += 588225; } else { byNick["Waaar"] = { nick: "Waaar", points: 765, reward: 588225 }; }
  if (byNick["Waaar"]) { byNick["Waaar"].points -= 405; byNick["Waaar"].reward -= 475000; }
  }
  var arr = Object.keys(byNick).map(function (n) { return byNick[n]; });
  arr = arr.filter(function (r) {
    var p = Number(r.points);
    var w = Number(r.reward);
    return (p === p && p !== 0) || (w === w && w !== 0);
  });
  arr.sort(function (a, b) {
    var ap = Number(a.points);
    var bp = Number(b.points);
    var aw = Number(a.reward);
    var bw = Number(b.reward);
    if (ap !== ap) ap = 0;
    if (bp !== bp) bp = 0;
    if (aw !== aw) aw = 0;
    if (bw !== bw) bw = 0;
    return (bp - ap) || (bw - aw);
  });
  return arr;
}

function ratingSeasonDataIsLoading(seasonConfig) {
  if (!seasonConfig || !seasonConfig.key || !isSpringRatingMode()) return false;
  if (seasonConfig.key === "summer") return typeof SUMMER_RATING_TOURNAMENTS_BY_DATE === "undefined";
  if (seasonConfig.key === "spring") return typeof SPRING_RATING_TOURNAMENTS_BY_DATE === "undefined";
  return false;
}

function getSummerRatingInitialLoader() {
  return document.getElementById("summerRatingInitialLoader");
}

function setSummerRatingInitialLoading(active, ratingSectionEl) {
  var loader = getSummerRatingInitialLoader();
  if (loader) {
    if (active) loader.removeAttribute("hidden");
    else loader.setAttribute("hidden", "");
  }
  if (ratingSectionEl) {
    ratingSectionEl.classList.toggle("summer-rating--boot-loading", !!active);
  }
}

function getSummerRatingInitialAssetUrls() {
  return [
    "./assets/summer-rating-podium.webp",
    "./assets/summer-rating-player-waaar.webp",
    "./assets/summer-rating-player-pokermanki.webp?v=3.547",
    "./assets/summer-rating-player-cooler.webp",
    "./assets/summer-rating-player-emil.webp",
    "./assets/summer-rating-player-winifly.webp",
    "./assets/summer-rating-player-missclick.webp",
    "./assets/summer-rating-player-rybnadzor.webp",
    "./assets/summer-rating-player-nikola233.webp",
    "./assets/summer-rating-player-milkyway.webp",
    "./assets/summer-rating-player-pryanik.webp",
    "./assets/summer-rating-player-prushnik.webp",
    "./assets/summer-rating-player-evgen1722.webp",
    "./assets/summer-rating-player-khervam.webp",
    "./assets/summer-rating-player-kriak.webp",
    "./assets/summer-rating-player-morf.webp",
    "./assets/summer-rating-league2-player-alena.webp",
    "./assets/summer-rating-league2-player-shkarubo.webp",
    "./assets/summer-rating-league2-player-sarmat.webp",
    "./assets/summer-rating-league2-player-palach.webp",
    "./assets/summer-rating-league2-player-nakurikota.webp",
    "./assets/summer-rating-league2-player-wildboar.webp",
    "./assets/summer-rating-league2-player-babnik.webp",
    "./assets/summer-rating-league2-player-viktor.webp",
    "./assets/summer-rating-league2-player-mr-fox.webp",
    "./assets/summer-rating-league2-player-babyshark.webp",
    "./assets/summer-rating-league2-player-aspirin.webp",
    "./assets/summer-rating-league2-player-ksyukha.webp",
    "./assets/summer-rating-league2-player-zagrebnagreb.webp"
  ];
}

function preloadSummerRatingImage(src) {
  return new Promise(function (resolve) {
    if (!src || typeof Image === "undefined") {
      resolve(false);
      return;
    }
    var done = false;
    var img = new Image();
    var finish = function (ok) {
      if (done) return;
      done = true;
      resolve(!!ok);
    };
    img.onload = function () { finish(true); };
    img.onerror = function () { finish(false); };
    setTimeout(function () { finish(false); }, 4500);
    img.src = src;
  });
}

function waitForSummerRatingInitialAssets() {
  try {
    if (window.__pokerSummerRatingInitialAssetsPromise) return window.__pokerSummerRatingInitialAssetsPromise;
    window.__pokerSummerRatingInitialAssetsPromise = Promise.all(getSummerRatingInitialAssetUrls().map(preloadSummerRatingImage));
    return window.__pokerSummerRatingInitialAssetsPromise;
  } catch (e) {
    return Promise.resolve([]);
  }
}

function finishSummerRatingInitialLoadWhenReady(ratingSectionEl) {
  if (!ratingSectionEl || !document.body || document.body.getAttribute("data-view") !== "summer-rating") return;
  if (window.__pokerSummerRatingBootReady) {
    setSummerRatingInitialLoading(false, ratingSectionEl);
    return;
  }
  setSummerRatingInitialLoading(true, ratingSectionEl);
  waitForSummerRatingInitialAssets().then(function () {
    var raf = window.requestAnimationFrame || function (fn) { setTimeout(fn, 16); };
    raf(function () {
      raf(function () {
        if (!document.body || document.body.getAttribute("data-view") !== "summer-rating") return;
        window.__pokerSummerRatingBootReady = true;
        setSummerRatingInitialLoading(false, ratingSectionEl);
        if (typeof updateSpringRatingViewScrollButton === "function") updateSpringRatingViewScrollButton();
      });
    });
  }).catch(function () {
    window.__pokerSummerRatingBootReady = true;
    setSummerRatingInitialLoading(false, ratingSectionEl);
  });
}

function pokerRefreshRatingSeasonAfterDataReady(seasonKey) {
  var season = String(seasonKey || "").trim().toLowerCase();
  if (season !== "spring" && season !== "summer") return;
  try {
    window.__pokerRatingSeasonDataReady = window.__pokerRatingSeasonDataReady || {};
    window.__pokerRatingSeasonDataReady[season] = true;
  } catch (eReadyFlag) {}
  var viewName = season + "-rating";
  var currentView = document.body && document.body.getAttribute ? document.body.getAttribute("data-view") : "";
  if (currentView !== viewName) return;
  try {
    window.__pokerRatingSeasonDataRefreshTimers = window.__pokerRatingSeasonDataRefreshTimers || {};
    if (window.__pokerRatingSeasonDataRefreshTimers[season]) {
      clearTimeout(window.__pokerRatingSeasonDataRefreshTimers[season]);
    }
    window.__pokerRatingSeasonDataRefreshTimers[season] = setTimeout(function () {
      try {
        if (!document.body || document.body.getAttribute("data-view") !== viewName) return;
        if (typeof initWinterRating === "function") initWinterRating();
        if (typeof initSpringRatingViewScrollButton === "function") initSpringRatingViewScrollButton();
        if (typeof updateSpringRatingViewScrollButton === "function") {
          var raf = window.requestAnimationFrame || function (fn) { setTimeout(fn, 16); };
          raf(updateSpringRatingViewScrollButton);
        }
      } catch (eRefresh) {
        if (typeof console !== "undefined" && console.warn) console.warn("rating season data refresh", eRefresh);
      }
    }, 0);
  } catch (eScheduleRefresh) {}
}
window.__pokerRefreshRatingSeasonAfterDataReady = pokerRefreshRatingSeasonAfterDataReady;

function initWinterRating() {
  try {
    var schedPrev = window.requestIdleCallback
      ? function (fn) { window.requestIdleCallback(fn, { timeout: 600 }); }
      : function (fn) { setTimeout(fn, 0); };
    schedPrev(function () {
      if (typeof window.pokerInitWinterRatingWeekTops === "function") window.pokerInitWinterRatingWeekTops();
      if (typeof window.updateWinterRatingWeekTopPreviews === "function") window.updateWinterRatingWeekTopPreviews();
      if (typeof updateSpringRatingHomePromoStats === "function") updateSpringRatingHomePromoStats();
    });
  } catch (e) {}
  try {
    initWinterRatingLightbox();
    initWinterRatingPlayerModal();
  } catch (e) {
    if (typeof console !== "undefined" && console.error) console.error("initWinterRating lightbox/modal", e);
  }
  var ratingSectionEl = document.getElementById("winterRatingSection");
  var seasonConfig = typeof getRatingSeasonConfig === "function" ? getRatingSeasonConfig() : {};
  var isSummerRatingMode = isSpringRatingMode() && seasonConfig.key === "summer";
  var actionTabsEl = document.getElementById("winterRatingSpringActionTabs");
  var achievementsBtn = document.getElementById("springRatingAchievementsBtn");
  var prizesBtn = document.getElementById("springRatingPrizesBtn");
  var sectionCopyBtn = document.getElementById("summerRatingSectionCopyBtn");
  var tabsUpdatedEl = document.getElementById("springRatingTabsUpdated");
  if (isSummerRatingMode) {
    if (ratingSeasonDataIsLoading(seasonConfig)) {
      setSummerRatingInitialLoading(true, ratingSectionEl);
      return;
    }
    if (!window.__pokerSummerRatingBootReady) setSummerRatingInitialLoading(true, ratingSectionEl);
  } else {
    setSummerRatingInitialLoading(false, ratingSectionEl);
  }
  var conditionsBtn = document.getElementById("springRatingConditionsBtn");
  if (conditionsBtn) {
    if (isSummerRatingMode) {
      conditionsBtn.dataset.springMainLeague = "top";
      conditionsBtn.classList.remove("winter-rating__spring-main-tab--conditions", "winter-rating__spring-conditions-btn", "winter-rating__spring-achievements-btn");
      conditionsBtn.innerHTML = "<span>по дням</span>";
      conditionsBtn.setAttribute("aria-label", "Рейтинг по дням");
    } else {
      delete conditionsBtn.dataset.springMainLeague;
      conditionsBtn.classList.remove("winter-rating__spring-achievements-btn");
      conditionsBtn.classList.add("winter-rating__spring-main-tab--conditions", "winter-rating__spring-conditions-btn");
      conditionsBtn.innerHTML = "<span>Условия</span><span>и призы</span>";
      conditionsBtn.removeAttribute("aria-label");
    }
  }
  if (actionTabsEl) {
    actionTabsEl.hidden = !isSummerRatingMode;
    actionTabsEl.style.display = isSummerRatingMode ? "" : "none";
  }
  if (achievementsBtn) {
    achievementsBtn.hidden = !isSummerRatingMode;
    achievementsBtn.style.display = isSummerRatingMode ? "" : "none";
  }
  if (prizesBtn) {
    prizesBtn.hidden = !isSummerRatingMode;
    prizesBtn.style.display = isSummerRatingMode ? "" : "none";
  }
  if (sectionCopyBtn) {
    sectionCopyBtn.hidden = !isSummerRatingMode;
    sectionCopyBtn.style.display = isSummerRatingMode ? "" : "none";
  }
  if (tabsUpdatedEl) {
    tabsUpdatedEl.hidden = !isSummerRatingMode;
    tabsUpdatedEl.style.display = isSummerRatingMode ? "" : "none";
    tabsUpdatedEl.textContent = "обновлено 9 августа";
  }
  if (conditionsBtn && conditionsBtn.getAttribute("data-inited") !== "1") {
    conditionsBtn.setAttribute("data-inited", "1");
    conditionsBtn.addEventListener("click", function () {
      if (conditionsBtn.dataset.springMainLeague) return;
      openSpringRatingInfoModal();
    });
  }
  if (achievementsBtn && achievementsBtn.getAttribute("data-inited") !== "1") {
    achievementsBtn.setAttribute("data-inited", "1");
    achievementsBtn.addEventListener("click", function () {
      var openAchievements = function () {
        if (typeof window.openHallFishAchievementsModal === "function") window.openHallFishAchievementsModal();
      };
      if (typeof window.pokerEnsureLazyDomains === "function") {
        Promise.resolve(window.pokerEnsureLazyDomains(["hall"], { styles: true, scripts: true })).then(openAchievements).catch(openAchievements);
      } else if (typeof window.pokerEnsureScriptDomains === "function") {
        Promise.resolve(window.pokerEnsureScriptDomains(["hall"])).then(openAchievements).catch(openAchievements);
      } else {
        openAchievements();
      }
    });
  }
  if (prizesBtn && prizesBtn.getAttribute("data-inited") !== "1") {
    prizesBtn.setAttribute("data-inited", "1");
    prizesBtn.addEventListener("click", function () {
      var open = function () {
        if (typeof openSpringRatingInfoModal === "function") openSpringRatingInfoModal();
      };
      if (typeof window.pokerEnsureGlobalModalsHtml === "function") {
        window.pokerEnsureGlobalModalsHtml().then(open).catch(open);
      } else {
        open();
      }
    });
  }
  var febBtnLabel = document.querySelector("#winterRatingTopFebruaryBtn .winter-rating__week-top-btn-label");
  if (febBtnLabel) febBtnLabel.textContent = isSpringRatingMode() ? (seasonConfig.topLabel || "Топы весны") : "Топы Февраля";
  var titleTextEl = document.querySelector("#winterRatingSection .winter-rating__title-text");
  if (titleTextEl) {
    titleTextEl.innerHTML = isSpringRatingMode()
      ? "Рейтинг Турнирщиков<br /><span class=\"winter-rating__title-accent\">На 250 000р</span>"
      : "Архив рейтинга зимы<br /><span class=\"winter-rating__title-accent\">на 250 000₽</span>";
  }
  window.openWinterRatingDatePanel = function (dateStr) {
    var container = document.getElementById("winterRatingDates");
    if (!container) return;
    var item = container.querySelector(".winter-rating__date-item[data-rating-date=\"" + (dateStr || "") + "\"]");
    if (!item) return;
    var panel = item.querySelector(".winter-rating__date-panel");
    var btn = item.querySelector(".winter-rating__date-btn");
    if (panel) {
      panel.classList.remove("winter-rating__date-panel--hidden");
      var lwOpen = panel.querySelector(".spring-rating-date-leagues");
      if (lwOpen && typeof window.__pokerFillSpringDateLeagues === "function") window.__pokerFillSpringDateLeagues(lwOpen, dateStr);
    }
    if (btn) btn.setAttribute("aria-expanded", "true");
    try { item.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (e) {}
  };
  var countersEl = document.getElementById("winterRatingCounters");
  var tbody = document.getElementById("winterRatingTableBody");
  var tableCaption = document.querySelector("#winterRatingSection .winter-rating__table-caption");
  if (countersEl) {
    if (isSpringRatingMode()) {
      countersEl.innerHTML = "";
    } else {
      try {
        var c = getWinterRatingCounters();
        countersEl.innerHTML = "Сыграно дней <strong>" + c.daysPassed + "/" + c.totalDays + "</strong>";
      } catch (e) {
        if (typeof console !== "undefined" && console.error) console.error("getWinterRatingCounters", e);
        countersEl.innerHTML = "Сыграно дней <strong>—</strong>";
      }
    }
  }
  if (tableCaption) {
    tableCaption.innerHTML = isSpringRatingMode()
      ? "<span class=\"winter-rating__caption-icon\" aria-hidden=\"true\">" + (seasonConfig.icon || "🌿") + "</span> " + (seasonConfig.label || "Весна 2026")
      : "<span class=\"winter-rating__caption-icon\" aria-hidden=\"true\">❄</span> Итоговая таблица";
  }
  var tableCaptionRow = document.querySelector("#winterRatingSection .winter-rating__table-caption-row");
  var springLeaguesEl = document.getElementById("winterRatingSpringLeagues");
  var springMainTabsEl = document.getElementById("winterRatingSpringMainTabs");
  var winterRatingShareBtn = document.getElementById("winterRatingShareBtn");
  if (springMainTabsEl) springMainTabsEl.setAttribute("aria-label", seasonConfig.key === "summer" ? "Лиги рейтинга лета" : "Лиги рейтинга весны");
  if (springLeaguesEl) {
    springLeaguesEl.setAttribute("aria-label", seasonConfig.key === "summer" ? "Итоговые таблицы рейтинга лета по лигам" : "Итоговые таблицы рейтинга весны по лигам");
    springLeaguesEl.querySelectorAll(".winter-rating__spring-league-updated").forEach(function (el) {
      el.textContent = seasonConfig.updatedLabel || "обновлено 28 июня";
    });
  }
  function filterTableByNick(tbody, searchStr, tableWrap, showAllBtn) {
    if (!tbody) return;
    var q = (searchStr || "").trim().toLowerCase();
    var trs = tbody.querySelectorAll("tr");
    var hadCollapsed = tableWrap && tableWrap.classList.contains("winter-rating__table-wrap--collapsed");
    var scrollTop = tableWrap && tableWrap.scrollTop != null ? tableWrap.scrollTop : 0;
    var docScrollTop = (document.scrollingElement && document.scrollingElement.scrollTop) || document.documentElement.scrollTop || 0;
    if (q) {
      if (tableWrap) tableWrap.classList.remove("winter-rating__table-wrap--collapsed");
      if (showAllBtn) showAllBtn.textContent = "Свернуть";
    } else if (hadCollapsed && tableWrap) {
      tableWrap.classList.add("winter-rating__table-wrap--collapsed");
      if (showAllBtn) showAllBtn.textContent = "Ещё";
    }
    for (var i = 0; i < trs.length; i++) {
      var tr = trs[i];
      var nickBtn = tr.querySelector(".winter-rating__nick-btn");
      var nick = (nickBtn && nickBtn.dataset.nick ? nickBtn.dataset.nick : (nickBtn ? nickBtn.textContent : "")).toLowerCase();
      var match = !q || (nick && nick.indexOf(q) >= 0);
      tr.style.display = match ? "" : "none";
    }
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        if (tableWrap && tableWrap.scrollTop !== scrollTop) tableWrap.scrollTop = scrollTop;
        var el = document.scrollingElement || document.documentElement;
        if (el && el.scrollTop !== docScrollTop) el.scrollTop = docScrollTop;
      });
    });
  }
  function debounceRatingSearch(fn, ms) {
    var t;
    return function () {
      var args = arguments;
      if (t) clearTimeout(t);
      t = setTimeout(function () { t = null; fn.apply(null, args); }, ms);
    };
  }
  if (isSpringRatingMode()) {
    if (tableCaptionRow) tableCaptionRow.style.display = "none";
    if (document.getElementById("winterRatingTableWrap")) document.getElementById("winterRatingTableWrap").style.display = "none";
    var winterShowAllWrap = document.getElementById("winterRatingShowAllWrap");
    if (winterShowAllWrap) winterShowAllWrap.style.display = "none";
    var winterSearchWrap = document.getElementById("winterRatingSearchWrap");
    if (winterSearchWrap) winterSearchWrap.style.display = "none";
    if (springLeaguesEl) { springLeaguesEl.removeAttribute("hidden"); springLeaguesEl.style.display = ""; }
    if (springMainTabsEl) { springMainTabsEl.removeAttribute("hidden"); springMainTabsEl.style.display = ""; }
    if (typeof updateSpringRatingFinalCountdown === "function") try {
      updateSpringRatingFinalCountdown();
    } catch (eCount) {
      if (typeof console !== "undefined" && console.warn) console.warn("updateSpringRatingFinalCountdown", eCount);
    }
  } else {
    if (tableCaptionRow) tableCaptionRow.style.display = "";
    if (document.getElementById("winterRatingTableWrap")) document.getElementById("winterRatingTableWrap").style.display = "";
    if (springLeaguesEl) { springLeaguesEl.setAttribute("hidden", ""); springLeaguesEl.style.display = "none"; }
    if (springMainTabsEl) { springMainTabsEl.setAttribute("hidden", ""); springMainTabsEl.style.display = "none"; }
    if (winterRatingShareBtn) { winterRatingShareBtn.style.display = ""; }
    var winterSearchWrapEl = document.getElementById("winterRatingSearchWrap");
    if (winterSearchWrapEl) winterSearchWrapEl.style.display = "";
  }
  function switchSpringRatingMainTab(league) {
    if (!springMainTabsEl || !springLeaguesEl) return;
    var targetLeague = league === "top" ? "top" : (String(league) === "2" ? "2" : "1");
    if (isSummerRatingMode && ratingSectionEl) ratingSectionEl.setAttribute("data-summer-filter", targetLeague);
    else if (ratingSectionEl) ratingSectionEl.removeAttribute("data-summer-filter");
    var tabs = springMainTabsEl.querySelectorAll(".winter-rating__spring-main-tab");
    var leagues = springLeaguesEl.querySelectorAll(".winter-rating__spring-league--main");
    for (var i = 0; i < tabs.length; i++) tabs[i].classList.toggle("winter-rating__spring-main-tab--active", tabs[i].dataset.springMainLeague === targetLeague);
    for (var j = 0; j < leagues.length; j++) leagues[j].style.display = targetLeague !== "top" && leagues[j].getAttribute("data-spring-league") === targetLeague ? "" : "none";
    if (sectionCopyBtn) {
      sectionCopyBtn.dataset.springLeague = targetLeague;
      sectionCopyBtn.setAttribute("aria-label", targetLeague === "top"
        ? "Скопировать ссылку на рейтинг по дням"
        : "Скопировать ссылку на Лигу " + targetLeague);
    }
  }
  window.switchSpringRatingMainTab = switchSpringRatingMainTab;
  if (springMainTabsEl && springMainTabsEl.getAttribute("data-inited") !== "1") {
    springMainTabsEl.setAttribute("data-inited", "1");
    springMainTabsEl.addEventListener("click", function (e) {
      var tab = e.target && e.target.closest ? e.target.closest(".winter-rating__spring-main-tab") : null;
      if (!tab || !tab.dataset.springMainLeague) return;
      var league = tab.dataset.springMainLeague;
      switchSpringRatingMainTab(league);
    });
  }
  if (isSummerRatingMode) switchSpringRatingMainTab((ratingSectionEl && ratingSectionEl.getAttribute("data-summer-filter")) || "1");
  if (document.body.getAttribute("data-rating-date-share-bound") !== "1") {
    document.body.setAttribute("data-rating-date-share-bound", "1");
    document.body.addEventListener("click", function (e) {
      var shareBtn = e.target && e.target.closest ? e.target.closest(".winter-rating__date-share-btn") : null;
      if (!shareBtn) return;
      var wrap = shareBtn.closest(".winter-rating__date-share");
      var dateStr = wrap && wrap.getAttribute("data-rating-date");
      if (!dateStr) return;
      e.preventDefault();
      e.stopPropagation();
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var isSpring = typeof isSpringRatingMode === "function" && isSpringRatingMode();
      var datePrefix = isSpring && typeof getRatingSeasonStartAppPrefix === "function" ? getRatingSeasonStartAppPrefix("date") : "rating_";
      var startApp = datePrefix + String(dateStr).replace(/\./g, "_");
      var link = typeof buildMiniAppStartLink === "function" ? buildMiniAppStartLink(startApp) : "";
      var msg = "Ссылка скопирована. Отправьте другу — откроется рейтинг за " + dateStr + ".";
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      pokerCopyTextToClipboard(link).then(function (copied) {
        if (copied) {
          if (tg && tg.showAlert) tg.showAlert(msg); else alert("Ссылка скопирована.");
        } else {
          if (tg && tg.showAlert) tg.showAlert("Ссылка: " + link); else alert("Ссылка: " + link);
        }
      });
    }, true);
  }
  function showSpringLeagueCopyFeedback(shareBtn) {
    if (!shareBtn || !shareBtn.closest) return;
    var wrap = shareBtn.closest(".winter-rating__spring-league-share-wrap");
    if (!wrap) return;
    var feedback = wrap.querySelector(".winter-rating__spring-league-copy-feedback");
    if (!feedback) {
      feedback = document.createElement("span");
      feedback.className = "winter-rating__spring-league-copy-feedback";
      feedback.setAttribute("role", "status");
      feedback.setAttribute("aria-live", "polite");
      feedback.hidden = true;
      wrap.appendChild(feedback);
    }
    if (!shareBtn.dataset.originalAriaLabel) shareBtn.dataset.originalAriaLabel = shareBtn.getAttribute("aria-label") || "";
    feedback.textContent = "Скопировано";
    feedback.hidden = false;
    feedback.classList.add("winter-rating__spring-league-copy-feedback--visible");
    shareBtn.classList.add("winter-rating__share-btn--copied");
    shareBtn.setAttribute("aria-label", "Скопировано");
    if (shareBtn.__springLeagueCopyFeedbackTimer) clearTimeout(shareBtn.__springLeagueCopyFeedbackTimer);
    shareBtn.__springLeagueCopyFeedbackTimer = setTimeout(function () {
      feedback.classList.remove("winter-rating__spring-league-copy-feedback--visible");
      feedback.hidden = true;
      shareBtn.classList.remove("winter-rating__share-btn--copied");
      shareBtn.setAttribute("aria-label", shareBtn.dataset.originalAriaLabel || "Скопировать ссылку");
    }, 1800);
  }

  if (document.body.getAttribute("data-spring-league-share-bound") !== "1") {
    document.body.setAttribute("data-spring-league-share-bound", "1");
    document.body.addEventListener("click", function (e) {
      var shareBtn = e.target && e.target.closest ? e.target.closest(".winter-rating__spring-league-share") : null;
      if (!shareBtn || !shareBtn.dataset.springLeague) return;
      e.preventDefault();
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var sectionKey = shareBtn.dataset.springLeague;
      var startApp = sectionKey === "top"
        ? ((typeof isSummerRatingMode === "function" && isSummerRatingMode()) ? "summer_rating_days" : "spring_rating_days")
        : (typeof getRatingSeasonStartAppPrefix === "function" ? getRatingSeasonStartAppPrefix("league") : "spring_rating_league_") + sectionKey;
      var link = typeof buildMiniAppStartLink === "function" ? buildMiniAppStartLink(startApp) : "";
      if (!link) {
        try {
          var fallbackUrl = new URL(window.location.href);
          fallbackUrl.hash = "";
          fallbackUrl.searchParams.set("startapp", startApp);
          link = fallbackUrl.toString();
        } catch (copyUrlError) {
          link = window.location.href;
        }
      }
      var mode = shareBtn.getAttribute("data-rating-share-mode") || "copy";
      if (mode === "share") {
        var leagueLabel = sectionKey === "top" ? "по дням" : (sectionKey === "2" ? "Лига 2" : "Лига 1");
        var seasonLabel = typeof isSummerRatingMode === "function" && isSummerRatingMode() ? "Рейтинг лета 2026" : "Рейтинг весны 2026";
        var shareText = seasonLabel + ": " + leagueLabel;
        var shareUrl = typeof pokerBuildTelegramShareUrlDialog === "function" ? pokerBuildTelegramShareUrlDialog(link, shareText) : "";
        var tryShare = typeof pokerTryPwaWebShare === "function" ? pokerTryPwaWebShare({ title: shareText, text: shareText + "\n" + link, url: link }) : Promise.resolve(false);
        tryShare.then(function (ok) {
          if (ok) return;
          var tgShare = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (shareUrl && tgShare && tgShare.openTelegramLink) tgShare.openTelegramLink(shareUrl);
          else if (shareUrl) window.open(shareUrl, "_blank", "noopener,noreferrer");
        });
        return;
      }
      pokerCopyTextToClipboard(link).then(function (copied) {
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (copied) {
          showSpringLeagueCopyFeedback(shareBtn);
          if (tg && tg.showToast) tg.showToast("Ссылка скопирована");
        } else if (tg && tg.showAlert) {
          tg.showAlert("Ссылка: " + link);
        } else {
          alert("Ссылка: " + link);
        }
      }).catch(function () {
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.showAlert) tg.showAlert("Ссылка: " + link);
        else alert("Ссылка: " + link);
      });
    });
  }
  var allRows = [];
  try {
    allRows = getWinterRatingOverall();
  } catch (e) {
    if (typeof console !== "undefined" && console.error) console.error("getWinterRatingOverall", e);
  }
  if (!Array.isArray(allRows)) allRows = [];
  allRows = allRows.filter(function (r) {
    var p = r && r.points != null ? Number(r.points) : 0;
    var w = r && r.reward != null ? Number(r.reward) : 0;
    if (p !== p || !isFinite(p)) p = 0;
    if (w !== w || !isFinite(w)) w = 0;
    return p !== 0 || w !== 0;
  });
  var rows = [];
  try {
    for (var ri = 0; ri < allRows.length; ri++) {
      var r = allRows[ri];
      var rewardVal = r && r.reward != null ? Number(r.reward) : 0;
      if (rewardVal !== rewardVal || !isFinite(rewardVal)) rewardVal = 0;
      var rewardDisplayVal = winterRatingDisplayRewardValue(rewardVal);
      var rewardStr = formatRewardRound(rewardDisplayVal);
      var pointsVal = r && r.points != null ? Number(r.points) : 0;
      if (pointsVal !== pointsVal || !isFinite(pointsVal)) pointsVal = 0;
      if (pointsVal === 0 && rewardDisplayVal === 0) continue;
      rows.push({
        place: rows.length + 1,
        nick: r && r.nick != null ? String(r.nick) : "",
        points: pointsVal,
        reward: rewardStr
      });
    }
  } catch (e) {
    if (typeof console !== "undefined" && console.error) console.error("winter rating rows map", e);
  }
  if (isSpringRatingMode()) {
    var league1Body = document.getElementById("winterRatingLeague1Body");
    var league2Body = document.getElementById("winterRatingLeague2Body");
    var league1PrizesByPlace = { 1: 100000, 2: 50000, 3: 25000, 4: 10000, 5: 5000 };
    var league2PrizesByPlace = { 1: 30000, 2: 15000, 3: 7500, 4: 5000, 5: 2500 };
    function renderLeagueRows(leagueNum, bodyEl) {
      if (!bodyEl) return;
      var raw = [];
      try { raw = getSpringRatingOverallByLeague(leagueNum); } catch (e) {}
      if (!Array.isArray(raw)) raw = [];
      var leagueRows = [];
      for (var ri = 0; ri < raw.length; ri++) {
        var r = raw[ri];
        var rewardVal = r && r.reward != null ? Number(r.reward) : 0;
        if (rewardVal !== rewardVal || !isFinite(rewardVal)) rewardVal = 0;
        var rewardDisplayVal = winterRatingDisplayRewardValue(rewardVal);
        var rewardStr = formatRewardRound(rewardDisplayVal);
        var pointsVal = r && r.points != null ? Number(r.points) : 0;
        if (pointsVal !== pointsVal || !isFinite(pointsVal)) pointsVal = 0;
        if (pointsVal === 0 && rewardDisplayVal === 0) continue;
        leagueRows.push({ place: leagueRows.length + 1, nick: r && r.nick != null ? String(r.nick) : "", points: pointsVal, reward: rewardStr });
      }
      var hasPrizeColumn = leagueNum === 1 || leagueNum === 2;
      var colspan = hasPrizeColumn ? 5 : 4;
      var prizesByPlace = leagueNum === 1 ? league1PrizesByPlace : leagueNum === 2 ? league2PrizesByPlace : null;
      var parts = [];
      for (var wi = 0; wi < leagueRows.length; wi++) {
        var row = leagueRows[wi];
        var place = row.place != null ? parseInt(row.place, 10) : wi + 1;
        if (place !== place) place = wi + 1;
        var trClass = winterRatingRowClass(place);
        var placeCell = winterRatingPlaceCell(place);
        var nickStr = row.nick != null ? String(row.nick) : "";
        var nickEsc = escapeHtmlRating(nickStr);
        var nickAttr = nickStr.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var nickInner = nickEsc;
        if (seasonConfig.key === "summer") {
          nickInner = "<span class=\"summer-rating-table-player summer-rating-table-player--place-" + place + "\">" +
            (place <= 10 ? "<span class=\"summer-rating-table-avatar summer-rating-table-avatar--place-" + place + "\" style=\"" + summerRatingTableAvatarStyle(nickStr) + "\" aria-hidden=\"true\"></span>" : "") +
            "<span class=\"summer-rating-table-name\">" + nickEsc + "</span></span>";
        }
        var prizeCell = "";
        if (hasPrizeColumn) {
          var prizeVal = prizesByPlace && prizesByPlace[place] != null ? prizesByPlace[place] : null;
          var prizeStr = prizeVal != null && prizeVal >= 1000 ? (prizeVal / 1000) + "К₽" : (prizeVal != null && prizeVal > 0 ? prizeVal + "₽" : "—");
          prizeCell = "<td class=\"winter-rating__td-prize\" title=\"" + (prizeVal ? formatRewardRound(prizeVal) + " ₽" : "—") + "\">" + prizeStr + "</td>";
        }
        parts.push("<tr" + (trClass ? " class=\"" + trClass + "\"" : "") + "><td>" + placeCell + "</td><td><button type=\"button\" class=\"winter-rating__nick-btn\" data-nick=\"" + nickAttr + "\">" + nickInner + "</button></td><td>" + (row.points != null ? row.points : "") + "</td><td>" + (row.reward != null ? row.reward : "0") + "</td>" + prizeCell + "</tr>");
      }
      renderSummerRatingPedestalLabels(leagueNum, leagueRows);
      var placeholderText = ratingSeasonDataIsLoading(seasonConfig)
        ? (seasonConfig.loadingDataText || "Загружаем рейтинг")
        : (seasonConfig.emptyDataText || "Данные с 1 марта");
      bodyEl.innerHTML = parts.length ? parts.join("") : "<tr><td colspan=\"" + colspan + "\" class=\"winter-rating__spring-placeholder\">" + placeholderText + "</td></tr>";
      pokerMarkVerifiedRatingNickButtons(bodyEl);
      bodyEl.removeEventListener("click", bodyEl._leagueNickClick);
      bodyEl._leagueNickClick = function (e) {
        var btn = e.target && e.target.closest && e.target.closest(".winter-rating__nick-btn");
        if (btn && btn.dataset.nick && typeof pokerOpenTournamentRatingPlayer === "function") pokerOpenTournamentRatingPlayer(btn.dataset.nick);
      };
      bodyEl.addEventListener("click", bodyEl._leagueNickClick);
    }
    function renderSummerRatingPedestalLabels(leagueNum, leagueRows) {
      var pedestalWrap = document.getElementById("winterRatingLeague" + leagueNum + "PedestalWrap");
      var showAllWrap = document.getElementById("winterRatingLeague" + leagueNum + "ShowAllWrap");
      if (!pedestalWrap && showAllWrap) {
        pedestalWrap = document.createElement("div");
        pedestalWrap.className = "summer-rating-pedestal-wrap";
        pedestalWrap.id = "winterRatingLeague" + leagueNum + "PedestalWrap";
        var tableWrapForPedestal = showAllWrap.previousElementSibling;
        if (tableWrapForPedestal && tableWrapForPedestal.classList && tableWrapForPedestal.classList.contains("winter-rating__table-wrap--league")) {
          showAllWrap.parentNode.insertBefore(pedestalWrap, tableWrapForPedestal);
        } else {
          showAllWrap.parentNode.insertBefore(pedestalWrap, showAllWrap);
        }
      }
      if (!pedestalWrap) return;
      if (showAllWrap) {
        var staleLabels = showAllWrap.querySelector(".summer-rating-pedestal-labels");
        if (staleLabels) staleLabels.remove();
      }
      var labels = pedestalWrap.querySelector(".summer-rating-pedestal-labels");
      if (seasonConfig.key !== "summer" || (leagueNum !== 1 && leagueNum !== 2) || !leagueRows || leagueRows.length < 4) {
        if (labels) labels.remove();
        pedestalWrap.setAttribute("hidden", "");
        return;
      }
      pedestalWrap.removeAttribute("hidden");
      if (!labels) {
        labels = document.createElement("span");
        pedestalWrap.appendChild(labels);
      }
      labels.removeAttribute("aria-hidden");
      labels.className = "summer-rating-pedestal-labels summer-rating-pedestal-labels--league-" + leagueNum;
      var html = "";
      var labelsStyle = "";
      for (var place = 4; place <= 10; place++) {
        var labelRow = leagueRows[place - 1];
        var labelNick = labelRow && labelRow.nick != null ? String(labelRow.nick) : "";
        var labelNickAttr = labelNick.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var labelNickEsc = escapeHtmlRating(labelNick);
        labelsStyle += "--summer-lower-art-" + place + ":" + summerRatingPlayerArtCssUrl(labelNick) + ";";
        labelsStyle += summerRatingLowerArtSizeStyle(place, labelNick);
        html += "<button type=\"button\" class=\"summer-rating-pedestal-hitbox summer-rating-pedestal-hitbox--place-" + place + "\" data-nick=\"" + labelNickAttr + "\" aria-label=\"Подробнее: " + labelNickEsc + "\"></button>";
        html += "<span class=\"summer-rating-pedestal-label summer-rating-pedestal-label--place-" + place + "\">" + labelNickEsc + "</span>";
      }
      labels.setAttribute("style", labelsStyle);
      labels.innerHTML = html;
      if (pedestalWrap._summerPedestalClick) pedestalWrap.removeEventListener("click", pedestalWrap._summerPedestalClick);
      pedestalWrap._summerPedestalClick = function (e) {
        var btn = e.target && e.target.closest && e.target.closest(".summer-rating-pedestal-hitbox");
        if (btn && btn.dataset.nick && typeof pokerOpenTournamentRatingPlayer === "function") {
          pokerOpenTournamentRatingPlayer(btn.dataset.nick);
        }
      };
      pedestalWrap.addEventListener("click", pedestalWrap._summerPedestalClick);
    }
    function setupLeagueCollapse(bodyEl, leagueNum) {
      if (!bodyEl) return;
      var rows = bodyEl.querySelectorAll("tr");
      var tableWrap = bodyEl.parentElement && bodyEl.parentElement.parentElement;
      var showAllWrap = document.getElementById("winterRatingLeague" + leagueNum + "ShowAllWrap");
      var showAllBtn = showAllWrap && showAllWrap.querySelector(".winter-rating__show-all-btn--league");
      var searchWrap = document.getElementById("winterRatingLeague" + leagueNum + "SearchWrap");
      var searchInput = document.getElementById("winterRatingLeague" + leagueNum + "SearchInput");
      var hasData = rows.length > 0 && !bodyEl.querySelector(".winter-rating__spring-placeholder");
      if (searchWrap) searchWrap.style.display = hasData ? "" : "none";
      if (rows.length > 10 && tableWrap && showAllWrap && showAllBtn) {
        tableWrap.classList.add("winter-rating__table-wrap--collapsed");
        showAllWrap.style.display = "";
        showAllBtn.textContent = "Ещё";
        showAllBtn.classList.remove("winter-rating__show-all-btn--expanded");
        showAllBtn.setAttribute("aria-expanded", "false");
        if (bodyEl.id) showAllBtn.setAttribute("aria-controls", bodyEl.id);
        showAllBtn.onclick = function () {
          var scrollTop = tableWrap && tableWrap.scrollTop != null ? tableWrap.scrollTop : 0;
          var docScrollTop = (document.scrollingElement && document.scrollingElement.scrollTop) || document.documentElement.scrollTop || 0;
          if (tableWrap.classList.contains("winter-rating__table-wrap--collapsed")) {
            tableWrap.classList.remove("winter-rating__table-wrap--collapsed");
            showAllBtn.textContent = "Свернуть";
            showAllBtn.classList.add("winter-rating__show-all-btn--expanded");
            showAllBtn.setAttribute("aria-expanded", "true");
          } else {
            tableWrap.classList.add("winter-rating__table-wrap--collapsed");
            showAllBtn.textContent = "Ещё";
            showAllBtn.classList.remove("winter-rating__show-all-btn--expanded");
            showAllBtn.setAttribute("aria-expanded", "false");
          }
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              if (tableWrap && tableWrap.scrollTop !== scrollTop) tableWrap.scrollTop = scrollTop;
              var el = document.scrollingElement || document.documentElement;
              if (el && el.scrollTop !== docScrollTop) el.scrollTop = docScrollTop;
            });
          });
        };
      } else if (showAllWrap) {
        showAllWrap.style.display = "none";
        if (showAllBtn) {
          showAllBtn.classList.remove("winter-rating__show-all-btn--expanded");
          showAllBtn.setAttribute("aria-expanded", "false");
        }
      }
      if (searchInput && bodyEl) {
        searchInput.value = "";
        var doFilter = debounceRatingSearch(function () { filterTableByNick(bodyEl, searchInput.value, tableWrap, showAllBtn); }, 120);
        searchInput.oninput = doFilter;
        searchInput.onkeydown = function (e) {
          if (e.key === "Escape") { searchInput.value = ""; searchInput.blur(); filterTableByNick(bodyEl, "", tableWrap, showAllBtn); }
        };
      }
    }
    renderLeagueRows(1, league1Body);
    renderLeagueRows(2, league2Body);
    setupLeagueCollapse(league1Body, 1);
    setupLeagueCollapse(league2Body, 2);
  }
  function buildSpringTop3PodiumHtml(rowsForPodium, titleText) {
    if (!rowsForPodium || rowsForPodium.length < 3) return "";
    var top3 = [rowsForPodium[1], rowsForPodium[0], rowsForPodium[2]];
    var places = [2, 1, 3];
    var podiumHtml = titleText ? "<div class=\"spring-rating-top3__title\">" + escapeHtmlRating(titleText) + "</div>" : "";
    var podiumStyle =
      "--summer-top3-art-left:" + summerRatingPlayerArtCssUrl(top3[0] && top3[0].nick) + ";" +
      summerRatingTop3ArtSizeStyle("left", top3[0] && top3[0].nick) +
      "--summer-top3-art-center:" + summerRatingPlayerArtCssUrl(top3[1] && top3[1].nick) + ";" +
      summerRatingTop3ArtSizeStyle("center", top3[1] && top3[1].nick) +
      "--summer-top3-art-right:" + summerRatingPlayerArtCssUrl(top3[2] && top3[2].nick) + ";" +
      summerRatingTop3ArtSizeStyle("right", top3[2] && top3[2].nick);
    podiumHtml += "<div class=\"spring-rating-top3__podium\" style=\"" + podiumStyle.replace(/"/g, "&quot;") + "\">";
    for (var pj = 0; pj < 3; pj++) {
      var r = top3[pj];
      var place = places[pj];
      var nickStr = r && r.nick != null ? String(r.nick) : "";
      var nickEsc = escapeHtmlRating(nickStr);
      var nickAttr = nickStr.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      var initial = nickStr.length ? nickStr.charAt(0).toUpperCase() : "?";
      var pointsStr = r && r.points != null ? String(r.points) : "0";
      var rewardStr = r && r.reward != null ? winterRatingDisplayReward(String(r.reward).replace(/\s/g, "")) : "0";
      var rewardFormatted = rewardStr + " ₽";
      var placeClass = place === 1 ? "spring-rating-top3__card--first" : "";
      podiumHtml += "<div class=\"spring-rating-top3__card " + placeClass + "\"><span class=\"spring-rating-top3__rank\">#" + place + "</span><div class=\"spring-rating-top3__avatar\" aria-hidden=\"true\">" + initial + "</div><span class=\"spring-rating-top3__nick\">" + nickEsc + "</span><div class=\"spring-rating-top3__stats\"><span class=\"spring-rating-top3__points\"><span class=\"spring-rating-top3__points-value\">" + pointsStr + "</span> <span class=\"spring-rating-top3__points-label\">баллов</span></span><span class=\"spring-rating-top3__reward\">" + rewardFormatted + "</span></div><button type=\"button\" class=\"spring-rating-top3__nick-btn\" data-nick=\"" + nickAttr + "\" aria-label=\"Подробнее: " + nickEsc + "\"></button></div>";
    }
    podiumHtml += "</div>";
    return podiumHtml;
  }
  var podiumEl = document.getElementById("springRatingTop3Podium");
  var podiumLeague1El = document.getElementById("springRatingTop3PodiumLeague1");
  var podiumLeague2El = document.getElementById("springRatingTop3PodiumLeague2");
  if (podiumEl || podiumLeague1El || podiumLeague2El) {
    var sectionEl = document.getElementById("winterRatingSection");
    if (sectionEl && sectionEl.getAttribute("data-spring-top3-inited") !== "1") {
      sectionEl.setAttribute("data-spring-top3-inited", "1");
      sectionEl.addEventListener("click", function (e) {
        var btn = e.target && e.target.closest && e.target.closest(".spring-rating-top3__nick-btn");
        if (btn && btn.dataset.nick && typeof pokerOpenTournamentRatingPlayer === "function") pokerOpenTournamentRatingPlayer(btn.dataset.nick);
      });
    }
    if (isSpringRatingMode()) {
      if (podiumEl) { podiumEl.setAttribute("hidden", ""); podiumEl.innerHTML = ""; }
      var league1Raw = [], league2Raw = [];
      try { league1Raw = getSpringRatingOverallByLeague(1); } catch (e) {}
      try { league2Raw = getSpringRatingOverallByLeague(2); } catch (e) {}
      var toPodiumRows = function (raw) {
        var list = [];
        for (var pi = 0; pi < raw.length && pi < 3; pi++) {
          var r = raw[pi];
          var rewardVal = r && r.reward != null ? Number(r.reward) : 0;
          list.push({ place: pi + 1, nick: r && r.nick != null ? String(r.nick) : "", points: r && r.points != null ? r.points : 0, reward: winterRatingDisplayReward(rewardVal) });
        }
        return list;
      };
      var rows1 = toPodiumRows(league1Raw), rows2 = toPodiumRows(league2Raw);
      if (podiumLeague1El) {
        if (rows1.length >= 3) {
          podiumLeague1El.removeAttribute("hidden");
          podiumLeague1El.innerHTML = buildSpringTop3PodiumHtml(rows1, "");
        } else { podiumLeague1El.setAttribute("hidden", ""); podiumLeague1El.innerHTML = ""; }
      }
      if (podiumLeague2El) {
        if (rows2.length >= 3) {
          podiumLeague2El.removeAttribute("hidden");
          podiumLeague2El.innerHTML = buildSpringTop3PodiumHtml(rows2, "");
        } else { podiumLeague2El.setAttribute("hidden", ""); podiumLeague2El.innerHTML = ""; }
      }
    } else {
      var rowsForPodium = rows;
      if (rowsForPodium.length >= 3 && podiumEl) {
        podiumEl.removeAttribute("hidden");
        podiumEl.innerHTML = buildSpringTop3PodiumHtml(rowsForPodium, "Рейтинг Зимы");
      } else if (podiumEl) {
        podiumEl.setAttribute("hidden", "");
        podiumEl.innerHTML = "";
      }
    }
  }
  if (tbody) {
    try {
      if (isSpringRatingMode() && rows.length === 0) {
        tbody.innerHTML = "<tr><td colspan=\"4\" class=\"winter-rating__spring-placeholder\"></td></tr>";
      } else {
        var htmlParts = [];
        for (var wi = 0; wi < rows.length; wi++) {
          var row = rows[wi];
          var place = row.place != null ? parseInt(row.place, 10) : wi + 1;
          if (place !== place) place = wi + 1;
          var trClass = winterRatingRowClass(place);
          var placeCell = winterRatingPlaceCell(place);
          var nickStr = row.nick != null ? String(row.nick) : "";
          var nickEsc = escapeHtmlRating(nickStr);
          var nickAttr = nickStr.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
          htmlParts.push("<tr" + (trClass ? " class=\"" + trClass + "\"" : "") + "><td>" + placeCell + "</td><td><button type=\"button\" class=\"winter-rating__nick-btn\" data-nick=\"" + nickAttr + "\">" + nickEsc + "</button></td><td>" + (row.points != null ? row.points : "") + "</td><td>" + (row.reward != null ? row.reward : "0") + "</td></tr>");
        }
        tbody.innerHTML = htmlParts.join("");
        pokerMarkVerifiedRatingNickButtons(tbody);
      }
    } catch (e) {
      if (typeof console !== "undefined" && console.error) console.error("winter rating table render", e);
      tbody.innerHTML = "<tr><td colspan=\"4\">Ошибка отображения рейтинга</td></tr>";
    }
    tbody.addEventListener("click", function (e) {
      var btn = e.target && e.target.closest(".winter-rating__nick-btn");
      if (btn && btn.dataset.nick && typeof pokerOpenTournamentRatingPlayer === "function") pokerOpenTournamentRatingPlayer(btn.dataset.nick);
    });
    var tableWrap = document.getElementById("winterRatingTableWrap");
    var showAllWrap = document.getElementById("winterRatingShowAllWrap");
    var showAllBtn = document.getElementById("winterRatingShowAllBtn");
    if (rows.length > 10 && tableWrap && showAllWrap && showAllBtn) {
      tableWrap.classList.add("winter-rating__table-wrap--collapsed");
      showAllWrap.style.display = "";
      showAllBtn.textContent = "Ещё";
      showAllBtn.onclick = function () {
        var scrollTop = tableWrap && tableWrap.scrollTop != null ? tableWrap.scrollTop : 0;
        var docScrollTop = (document.scrollingElement && document.scrollingElement.scrollTop) || document.documentElement.scrollTop || 0;
        if (tableWrap.classList.contains("winter-rating__table-wrap--collapsed")) {
          tableWrap.classList.remove("winter-rating__table-wrap--collapsed");
          showAllBtn.textContent = "Свернуть";
        } else {
          tableWrap.classList.add("winter-rating__table-wrap--collapsed");
          showAllBtn.textContent = "Ещё";
        }
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            if (tableWrap && tableWrap.scrollTop !== scrollTop) tableWrap.scrollTop = scrollTop;
            var el = document.scrollingElement || document.documentElement;
            if (el && el.scrollTop !== docScrollTop) el.scrollTop = docScrollTop;
          });
        });
      };
    } else if (showAllWrap) {
      showAllWrap.style.display = "none";
    }
  }
  var winterSearchInput = document.getElementById("winterRatingSearchInput");
  var winterTableWrap = document.getElementById("winterRatingTableWrap");
  if (winterSearchInput && tbody) {
    var winterDoFilter = debounceRatingSearch(function () {
      filterTableByNick(tbody, winterSearchInput.value, winterTableWrap, document.getElementById("winterRatingShowAllBtn"));
    }, 120);
    winterSearchInput.addEventListener("input", winterDoFilter);
    winterSearchInput.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { winterSearchInput.value = ""; winterSearchInput.blur(); filterTableByNick(tbody, "", winterTableWrap, document.getElementById("winterRatingShowAllBtn")); }
    });
  }
  var datesContainer = document.getElementById("winterRatingDates");
  if (!datesContainer) {
    if (isSummerRatingMode) finishSummerRatingInitialLoadWhenReady(ratingSectionEl);
    return;
  }
  var alreadyInited = datesContainer.getAttribute("data-rating-inited") === "1";
  if (!alreadyInited) {
    datesContainer.setAttribute("data-rating-inited", "1");
    datesContainer.addEventListener("click", function (e) {
      var cell = e.target && e.target.closest ? e.target.closest(".winter-rating__screenshot") : null;
      if (!cell) return;
      var screensWrap = cell.parentElement;
      if (!screensWrap || !screensWrap.classList || !screensWrap.classList.contains("winter-rating__screenshots")) return;
      var dateStr = screensWrap.getAttribute("data-rating-date");
      if (!dateStr) return;
      var leagueAttr = screensWrap.getAttribute("data-league");
      var leagueNum = leagueAttr === "1" || leagueAttr === "2" ? parseInt(leagueAttr, 10) : undefined;
      var siblings = screensWrap.querySelectorAll(".winter-rating__screenshot");
      var idx = Array.prototype.indexOf.call(siblings, cell);
      if (idx < 0) return;
      e.preventDefault();
      if (typeof openWinterRatingLightbox === "function") openWinterRatingLightbox(dateStr, idx, leagueNum, {
        directItems: Array.prototype.map.call(siblings, function (item) {
          var img = item.querySelector("img");
          return {
            src: img ? (img.getAttribute("data-rating-full-src") || img.currentSrc || img.src || "") : "",
            alt: img ? (img.alt || "") : "",
          };
        }),
      });
    });
  }
  var dateItems = datesContainer.querySelectorAll(".winter-rating__date-item");
  var currentDateSeason = isSpringRatingMode() ? (seasonConfig.key || "spring") : "winter";
  dateItems.forEach(function (item) {
    var itemSeason = item.getAttribute("data-rating-season") || "winter";
    if (itemSeason !== currentDateSeason && item.parentNode === datesContainer) datesContainer.removeChild(item);
  });
  dateItems = datesContainer.querySelectorAll(".winter-rating__date-item");
  var byDate = getRatingByDate();
  if (typeof byDate === "object" && Object.keys(byDate).length) {
    var dates = Object.keys(byDate).sort(function (a, b) {
      var pa = a.split("."), pb = b.split(".");
      var ka = (pa[2] || "") + (pa[1] || "") + (pa[0] || "");
      var kb = (pb[2] || "") + (pb[1] || "") + (pb[0] || "");
      return kb.localeCompare(ka);
    });
    var existingDates = Array.prototype.map.call(dateItems, function (it) { return it.getAttribute("data-rating-date"); });
    var missingDates = dates.filter(function (d) { return existingDates.indexOf(d) === -1; });
    if (missingDates.length) {
      var firstExisting = datesContainer.querySelector(".winter-rating__date-item");
      missingDates.forEach(function (dateStr) {
        var parts = dateStr.split(".");
        var slug = (parts[0] || "") + (parts[1] || "");
        var item = document.createElement("div");
        item.className = "winter-rating__date-item";
        item.setAttribute("data-rating-date", dateStr);
        item.setAttribute("data-rating-season", currentDateSeason);
        var panelInner = isSpringRatingMode()
          ? "<div class=\"spring-rating-date-leagues\">" +
            "<div class=\"spring-rating-date-league-tabs\"><button type=\"button\" class=\"spring-rating-date-league-tab spring-rating-date-league-tab--active\" data-league=\"1\">Лига 1</button><button type=\"button\" class=\"spring-rating-date-league-tab\" data-league=\"2\">Лига 2</button></div>" +
            "<div class=\"spring-rating-date-league spring-rating-date-league--1\" data-league=\"1\">" +
            "<div class=\"winter-rating__screenshots\" data-rating-date=\"" + dateStr + "\" data-league=\"1\"></div>" +
            "<div class=\"winter-rating__date-tournaments-list\" data-rating-date=\"" + dateStr + "\" data-league=\"1\"></div>" +
            "<div class=\"winter-rating__date-table-wrap spring-rating-date-table\" data-rating-date=\"" + dateStr + "\" data-league=\"1\"></div></div>" +
            "<div class=\"spring-rating-date-league spring-rating-date-league--2\" data-league=\"2\" style=\"display:none\">" +
            "<div class=\"winter-rating__screenshots\" data-rating-date=\"" + dateStr + "\" data-league=\"2\"></div>" +
            "<div class=\"winter-rating__date-tournaments-list\" data-rating-date=\"" + dateStr + "\" data-league=\"2\"></div>" +
            "<div class=\"winter-rating__date-table-wrap spring-rating-date-table\" data-rating-date=\"" + dateStr + "\" data-league=\"2\"></div></div></div>"
          : "<div class=\"winter-rating__screenshots\" data-rating-date=\"" + dateStr + "\"></div><div class=\"winter-rating__date-table-wrap\" id=\"winterRatingDateTable" + slug + "\"></div>";
        var shareIcon = "<span class=\"winter-rating__share-icon\" aria-hidden=\"true\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"/><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"/></svg></span>";
        var shareHtml = "<div class=\"winter-rating__date-share\" data-rating-date=\"" + (dateStr || "") + "\"><button type=\"button\" class=\"winter-rating__share-btn winter-rating__share-btn--copy-icon winter-rating__date-share-btn\" aria-label=\"Скопировать ссылку на рейтинг за " + (dateStr || "") + "\">" + shareIcon + "</button></div>";
        item.innerHTML = "<button type=\"button\" class=\"winter-rating__date-btn\" aria-expanded=\"false\" aria-controls=\"winterRatingPanel" + slug + "\">" + dateStr + "</button>" +
          "<div class=\"winter-rating__date-panel winter-rating__date-panel--hidden\" id=\"winterRatingPanel" + slug + "\" role=\"region\" aria-label=\"Рейтинг на " + dateStr + "\">" + panelInner + shareHtml + "</div>";
        var insertBefore = null;
        for (var i = 0; i < dates.length; i++) {
          if (dates[i] === dateStr && i + 1 < dates.length) {
            var nextDate = dates[i + 1];
            var nextEl = datesContainer.querySelector(".winter-rating__date-item[data-rating-date=\"" + nextDate + "\"]");
            if (nextEl) { insertBefore = nextEl; break; }
          }
        }
        if (insertBefore) datesContainer.insertBefore(item, insertBefore);
        else datesContainer.appendChild(item);
      });
      dateItems = datesContainer.querySelectorAll(".winter-rating__date-item");
    }
  }
  function fillScreensForDate(container, dStr, leagueNum) {
    if (!container) return;
    if (container.getAttribute("data-rating-screens-filled") === "1") return;
    var files = leagueNum != null
      ? (getSpringRatingImagesByLeague(leagueNum)[dStr] || [])
      : (getRatingImages()[dStr] || []);
    if (!files || !files.length) return;
    var cacheV = "v=19";
    container.innerHTML = files.map(function (f, i) {
      var fullSrc = getAssetUrl(f) + "?" + cacheV;
      var thumbSrc = typeof getRatingThumbnailUrl === "function" ? getRatingThumbnailUrl(f) + "?v=1" : fullSrc;
      return "<div class=\"winter-rating__screenshot\" role=\"button\" tabindex=\"0\" data-rating-image-file=\"" + escapeHtml(f) + "\"><img src=\"" + thumbSrc + "\" data-rating-full-src=\"" + fullSrc + "\" alt=\"Скрин рейтинга " + dStr + " (" + (i + 1) + ")\" loading=\"lazy\" decoding=\"async\" /></div>";
    }).join("");
    container.setAttribute("data-rating-screens-filled", "1");
    container.querySelectorAll(".winter-rating__screenshot").forEach(function (cell, idx) {
      var previewImg = cell.querySelector("img");
      if (previewImg) {
        previewImg.addEventListener("error", function ratingThumbnailFallback() {
          var full = previewImg.getAttribute("data-rating-full-src");
          if (full && previewImg.src !== full) previewImg.src = full;
        }, { once: true });
      }
      var openLightbox = function (e) {
        if (e) e.preventDefault();
        var siblings = container.querySelectorAll(".winter-rating__screenshot");
        openWinterRatingLightbox(dStr, idx, leagueNum, {
          directItems: Array.prototype.map.call(siblings, function (item) {
            var img = item.querySelector("img");
            return {
              src: img ? (img.getAttribute("data-rating-full-src") || img.currentSrc || img.src || "") : "",
              alt: img ? (img.alt || "") : "",
            };
          }),
        });
      };
      cell.addEventListener("click", openLightbox);
      cell.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(); }
      });
    });
  }
  function renderSpringLeagueDateCaption(label) {
    var updatedLabel = seasonConfig.updatedLabel || "обновлено 28 июня";
    return "<p class=\"winter-rating__date-tournaments-caption\"><span class=\"winter-rating__date-tournaments-caption-text\">" + label + "</span><span class=\"winter-rating__date-tournaments-updated\">" + updatedLabel + "</span></p>";
  }
  function fillSpringLeagueBlocks(leaguesWrap, dateStr, preferredLeague) {
    if (!leaguesWrap) return;
    var activeTab = leaguesWrap.querySelector(".spring-rating-date-league-tab--active");
    var activeLeague = preferredLeague === "2" || preferredLeague === 2
      ? 2
      : (preferredLeague === "1" || preferredLeague === 1
        ? 1
        : (activeTab && activeTab.getAttribute("data-league") === "2" ? 2 : 1));
    [activeLeague].forEach(function (leagueNum) {
      var block = leaguesWrap.querySelector(".spring-rating-date-league--" + leagueNum);
      if (!block || block.getAttribute("data-spring-filled") === "1") return;
      var screensEl = block.querySelector(".winter-rating__screenshots[data-league=\"" + leagueNum + "\"]");
      var tournamentsEl = block.querySelector(".winter-rating__date-tournaments-list[data-league=\"" + leagueNum + "\"]");
      var tableEl = block.querySelector(".winter-rating__date-table-wrap[data-league=\"" + leagueNum + "\"]");
      if (screensEl) fillScreensForDate(screensEl, dateStr, leagueNum);
      if (tournamentsEl) {
        var label = leagueNum === 1 ? "Лига 1. Турниры от 500₽" : "Лига 2. Турниры от 100р до 499р";
        tournamentsEl.innerHTML = renderSpringLeagueDateCaption(label);
      }
      if (ratingSeasonDataIsLoading(seasonConfig)) {
        if (tableEl) tableEl.innerHTML = "<p class=\"winter-rating__spring-placeholder\" role=\"status\">Загружаю рейтинг…</p>";
        return;
      }
      if (tableEl) {
        var rows = getSpringRatingRowsForDateLeague(dateStr, leagueNum);
        tableEl.innerHTML = rows && rows.length ? renderWinterRatingTable(rows) : "<p class=\"winter-rating__spring-placeholder\">Нет данных за эту дату</p>";
      }
      block.setAttribute("data-spring-filled", "1");
    });
  }
  try {
    window.__pokerFillSpringDateLeagues = fillSpringLeagueBlocks;
  } catch (eSpringFill) {}
  dateItems.forEach(function (item) {
    try {
      var dateStr = item.getAttribute("data-rating-date");
      var btn = item.querySelector(".winter-rating__date-btn");
      var panel = item.querySelector(".winter-rating__date-panel");
      var leaguesWrap = panel && panel.querySelector(".spring-rating-date-leagues");
      var tableWrap = item.querySelector(".winter-rating__date-table-wrap:not(.spring-rating-date-table)");
      var screensContainer = item.querySelector(".winter-rating__screenshots:not([data-league])");
      if (!btn || !panel) return;
      if (leaguesWrap) {
        [1, 2].forEach(function (leagueNum) {
          var block = leaguesWrap.querySelector(".spring-rating-date-league--" + leagueNum);
          if (!block) return;
          var tournamentsEl = block.querySelector(".winter-rating__date-tournaments-list[data-league=\"" + leagueNum + "\"]");
          if (tournamentsEl) {
            var capLabel = leagueNum === 1 ? "Лига 1. Турниры от 500₽" : "Лига 2. Турниры от 100р до 499р";
            tournamentsEl.innerHTML = renderSpringLeagueDateCaption(capLabel);
          }
        });
        if (leaguesWrap.getAttribute("data-tabs-bound") !== "1") {
          leaguesWrap.setAttribute("data-tabs-bound", "1");
          leaguesWrap.addEventListener("click", function (e) {
            var tab = e.target && e.target.closest ? e.target.closest(".spring-rating-date-league-tab") : null;
            if (!tab) return;
            e.preventDefault();
            e.stopPropagation();
            var league = tab.getAttribute("data-league");
            fillSpringLeagueBlocks(leaguesWrap, dateStr, league);
            leaguesWrap.querySelectorAll(".spring-rating-date-league-tab").forEach(function (t) { t.classList.toggle("spring-rating-date-league-tab--active", t.getAttribute("data-league") === league); });
            leaguesWrap.querySelectorAll(".spring-rating-date-league").forEach(function (b) { b.style.display = b.getAttribute("data-league") === league ? "" : "none"; });
          });
        }
      } else {
        var data = getRatingByDate()[dateStr];
        if (data && data.length && tableWrap && !tableWrap.innerHTML) tableWrap.innerHTML = renderWinterRatingTable(data);
        /* Screens are filled only when this date is opened. */
      }
      var shareWrap = panel.querySelector(".winter-rating__date-share");
      if (!shareWrap) {
        shareWrap = document.createElement("div");
        shareWrap.className = "winter-rating__date-share";
        shareWrap.setAttribute("data-rating-date", dateStr || "");
        var shareIcon = "<span class=\"winter-rating__share-icon\" aria-hidden=\"true\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"/><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"/></svg></span>";
        shareWrap.innerHTML = "<button type=\"button\" class=\"winter-rating__share-btn winter-rating__share-btn--copy-icon winter-rating__date-share-btn\" aria-label=\"Скопировать ссылку на рейтинг за " + (dateStr || "") + "\">" + shareIcon + "</button>";
        panel.appendChild(shareWrap);
      }
      if (btn.getAttribute("data-rating-toggle-bound") !== "1") {
        btn.setAttribute("data-rating-toggle-bound", "1");
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          var scrollY = window.scrollY || window.pageYOffset;
          panel.classList.toggle("winter-rating__date-panel--hidden");
          var open = !panel.classList.contains("winter-rating__date-panel--hidden");
          btn.setAttribute("aria-expanded", open ? "true" : "false");
          if (open) {
            if (leaguesWrap) {
              fillSpringLeagueBlocks(leaguesWrap, dateStr);
            } else if (screensContainer) fillScreensForDate(screensContainer, dateStr);
          }
          requestAnimationFrame(function () { window.scrollTo(0, scrollY); });
        });
      }
    } catch (err) {
      if (typeof console !== "undefined" && console.error) console.error("winter rating date item", err);
    }
  });
  var calendarWrap = document.getElementById("winterRatingCalendarWrap");
  if (calendarWrap && dateItems.length) {
    var availableDates = Array.prototype.map.call(dateItems, function (it) { return it.getAttribute("data-rating-date"); });
    var monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    var monthSet = {};
    availableDates.forEach(function (d) {
      var p = d ? d.split(".") : [];
      if (p.length >= 3) {
        var y = parseInt(p[2], 10);
        var m = parseInt(p[1], 10);
        if (y && m) monthSet[y + "-" + (m < 10 ? "0" + m : m)] = { year: y, month: m };
      }
    });
    var availableMonths = Object.keys(monthSet).sort(function (a, b) {
      return b.localeCompare(a);
    }).map(function (k) { return monthSet[k]; });
    if (isSpringRatingMode()) {
      var springByDate = getSpringRatingTournamentsByDate();
      var springKeys = typeof springByDate === "object" && springByDate ? Object.keys(springByDate) : [];
      availableDates = springKeys
        .filter(function (d) { return /\.2026$/.test(d); })
        .sort(function (a, b) { return winterRatingDateKeyToStamp(b) - winterRatingDateKeyToStamp(a); });
      var monthSetSpring = {};
      availableDates.forEach(function (d) {
        var p = d ? d.split(".") : [];
        if (p.length >= 3) {
          var y = parseInt(p[2], 10);
          var m = parseInt(p[1], 10);
          if (y && m) monthSetSpring[y + "-" + (m < 10 ? "0" + m : m)] = { year: y, month: m };
        }
      });
      availableMonths = Object.keys(monthSetSpring)
        .sort(function (a, b) { return b.localeCompare(a); })
        .map(function (k) { return monthSetSpring[k]; });
    }
    if (!availableMonths.length) {
      if (isSummerRatingMode) finishSummerRatingInitialLoadWhenReady(ratingSectionEl);
      return;
    }
    calendarWrap._availableMonths = availableMonths;
    calendarWrap._availableDates = availableDates;
    calendarWrap._calendarMonthIndex = typeof calendarWrap._calendarMonthIndex === "number" ? calendarWrap._calendarMonthIndex : 0;
    if (calendarWrap._calendarMonthIndex >= availableMonths.length) calendarWrap._calendarMonthIndex = availableMonths.length - 1;
    if (calendarWrap._calendarMonthIndex < 0) calendarWrap._calendarMonthIndex = 0;
    var dateModal = document.getElementById("winterRatingDateModal");
    var dateModalBackdrop = document.getElementById("winterRatingDateModalBackdrop");
    var dateModalClose = document.getElementById("winterRatingDateModalClose");
    var dateModalTitle = document.getElementById("winterRatingDateModalTitle");
    var dateModalBody = document.getElementById("winterRatingDateModalBody");
    var dateModalPrev = document.getElementById("winterRatingDateModalPrev");
    var dateModalNext = document.getElementById("winterRatingDateModalNext");
    var dateModalRenderSeq = 0;
    var dateModalLoadPromise = null;
    function refreshDateModalRefs() {
      dateModal = document.getElementById("winterRatingDateModal");
      dateModalBackdrop = document.getElementById("winterRatingDateModalBackdrop");
      dateModalClose = document.getElementById("winterRatingDateModalClose");
      dateModalTitle = document.getElementById("winterRatingDateModalTitle");
      dateModalBody = document.getElementById("winterRatingDateModalBody");
      dateModalPrev = document.getElementById("winterRatingDateModalPrev");
      dateModalNext = document.getElementById("winterRatingDateModalNext");
    }
    function bindDateModalNavButton(navBtn) {
      if (!navBtn || navBtn.getAttribute("data-rating-date-nav-bound") === "1") return;
      navBtn.setAttribute("data-rating-date-nav-bound", "1");
      navBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (navBtn.disabled) return;
        openDateModalByDate(navBtn.dataset.ratingDate || "", getDateModalActiveLeague());
      });
    }
    function ensureDateModalNavControls() {
      refreshDateModalRefs();
      if (!dateModal || !dateModalTitle) return;
      var inner = dateModal.querySelector(".winter-rating-date-modal__inner");
      if (!inner) return;
      var header = dateModal.querySelector(".winter-rating-date-modal__header");
      if (!header) {
        header = document.createElement("div");
        header.className = "winter-rating-date-modal__header";
        dateModalTitle.parentNode.insertBefore(header, dateModalTitle);
        header.appendChild(dateModalTitle);
      }
      if (!dateModalPrev) {
        dateModalPrev = document.createElement("button");
        dateModalPrev.type = "button";
        dateModalPrev.className = "winter-rating-date-modal__nav winter-rating-date-modal__nav--prev";
        dateModalPrev.id = "winterRatingDateModalPrev";
        dateModalPrev.setAttribute("aria-label", "Предыдущая дата");
        dateModalPrev.textContent = "‹";
        header.insertBefore(dateModalPrev, dateModalTitle);
      }
      if (!dateModalNext) {
        dateModalNext = document.createElement("button");
        dateModalNext.type = "button";
        dateModalNext.className = "winter-rating-date-modal__nav winter-rating-date-modal__nav--next";
        dateModalNext.id = "winterRatingDateModalNext";
        dateModalNext.setAttribute("aria-label", "Следующая дата");
        dateModalNext.textContent = "›";
        header.appendChild(dateModalNext);
      }
      bindDateModalNavButton(dateModalPrev);
      bindDateModalNavButton(dateModalNext);
      bindDateModalCloseControls();
    }
    ensureDateModalNavControls();
    function getCalendarCellTone(dateStr) {
      var rows = [];
      try {
        if (isSpringRatingMode() && typeof getSpringRatingRowsForDateLeague === "function") {
          rows = (getSpringRatingRowsForDateLeague(dateStr, 1) || []).concat(getSpringRatingRowsForDateLeague(dateStr, 2) || []);
        } else {
          var byDate = getRatingByDate();
          rows = byDate && byDate[dateStr] ? byDate[dateStr] : [];
        }
      } catch (eTone) {
        return "";
      }
      var hasMidReward = false;
      for (var r = 0; r < rows.length; r++) {
        var tone = winterRatingRewardTone(rows[r] && rows[r].reward);
        if (tone === "high") return "green";
        if (tone === "mid") hasMidReward = true;
      }
      return hasMidReward ? "brown" : "";
    }
    function getCalendarCellTopReward(dateStr) {
      var maxReward = 0;
      try {
        if (isSpringRatingMode()) {
          var springByDate = getSpringRatingTournamentsByDate();
          var tournaments = springByDate && springByDate[dateStr] ? springByDate[dateStr] : [];
          for (var st = 0; st < tournaments.length; st++) {
            var players = tournaments[st] && tournaments[st].players ? tournaments[st].players : [];
            for (var sp = 0; sp < players.length; sp++) {
              var springReward = players[sp] && players[sp].reward != null ? Number(players[sp].reward) : 0;
              if (springReward === springReward && springReward > maxReward) maxReward = springReward;
            }
          }
        } else {
          var byDate = getRatingByDate();
          var rows = byDate && byDate[dateStr] ? byDate[dateStr] : [];
          for (var wr = 0; wr < rows.length; wr++) {
            var reward = rows[wr] && rows[wr].reward != null ? Number(rows[wr].reward) : 0;
            if (reward === reward && reward > maxReward) maxReward = reward;
          }
        }
      } catch (eTopReward) {
        return 0;
      }
      return maxReward;
    }
    function hasCalendarCellRatingRows(dateStr) {
      try {
        if (isSpringRatingMode() && typeof getSpringRatingRowsForDateLeague === "function") {
          return !!((getSpringRatingRowsForDateLeague(dateStr, 1) || []).length || (getSpringRatingRowsForDateLeague(dateStr, 2) || []).length);
        }
        var byDate = getRatingByDate();
        return !!(byDate && byDate[dateStr] && byDate[dateStr].length);
      } catch (eHasRows) {
        return false;
      }
    }
    function countCalendarMonthRewardTones(yearNum, monthNum) {
      var counts = { high: 0, mid: 0 };
      function countPlayerReward(reward) {
        var tone = winterRatingRewardTone(reward);
        if (tone === "high") counts.high += 1;
        else if (tone === "mid") counts.mid += 1;
      }
      try {
        var tournamentsByDate = isSpringRatingMode() && typeof getSpringRatingTournamentsByDate === "function"
          ? getSpringRatingTournamentsByDate()
          : getRatingTournamentsByDate();
        var keys = tournamentsByDate && typeof tournamentsByDate === "object" ? Object.keys(tournamentsByDate) : [];
        for (var ki = 0; ki < keys.length; ki++) {
          var dateStr = keys[ki];
          var parts = String(dateStr || "").split(".");
          if (Number(parts[1]) !== monthNum || Number(parts[2]) !== yearNum) continue;
          var tournaments = Array.isArray(tournamentsByDate[dateStr]) ? tournamentsByDate[dateStr] : [];
          for (var ti = 0; ti < tournaments.length; ti++) {
            var players = tournaments[ti] && Array.isArray(tournaments[ti].players) ? tournaments[ti].players : [];
            for (var pi = 0; pi < players.length; pi++) countPlayerReward(players[pi] && players[pi].reward);
          }
        }
        return counts;
      } catch (eTournamentCounts) {}
      try {
        var byDate = getRatingByDate();
        var rowKeys = byDate && typeof byDate === "object" ? Object.keys(byDate) : [];
        for (var ri = 0; ri < rowKeys.length; ri++) {
          var rowDate = rowKeys[ri];
          var rowParts = String(rowDate || "").split(".");
          if (Number(rowParts[1]) !== monthNum || Number(rowParts[2]) !== yearNum) continue;
          var rows = Array.isArray(byDate[rowDate]) ? byDate[rowDate] : [];
          for (var rpi = 0; rpi < rows.length; rpi++) countPlayerReward(rows[rpi] && rows[rpi].reward);
        }
      } catch (eRowCounts) {}
      return counts;
    }
    function formatCalendarCellRewardShort(reward) {
      var val = Number(reward) || 0;
      if (val >= 1000000) {
        return (Math.round(val / 100000) / 10).toString().replace(".", ",") + "М₽";
      }
      if (val >= 10000) return Math.round(val / 1000) + "К₽";
      if (val >= 1000) return (Math.round(val / 100) / 10).toString().replace(".", ",") + "К₽";
      return formatRewardRound(val) + "₽";
    }
    function getDateModalActiveLeague() {
      if (!dateModalBody) return null;
      var activeTab = dateModalBody.querySelector(".spring-rating-date-league-tab--active");
      var league = activeTab ? activeTab.getAttribute("data-league") : null;
      return league === "1" || league === "2" ? league : null;
    }
    function applyDateModalLeague(leaguesWrap, preferredLeague) {
      if (!leaguesWrap || (preferredLeague !== "1" && preferredLeague !== "2")) return;
      leaguesWrap.querySelectorAll(".spring-rating-date-league-tab").forEach(function (t) {
        t.classList.toggle("spring-rating-date-league-tab--active", t.getAttribute("data-league") === preferredLeague);
      });
      leaguesWrap.querySelectorAll(".spring-rating-date-league").forEach(function (b) {
        b.style.display = b.getAttribute("data-league") === preferredLeague ? "" : "none";
      });
    }
    function openDateModalByDate(dateStr, preferredLeague) {
      if (!dateStr) return;
      var item = datesContainer.querySelector(".winter-rating__date-item[data-rating-date=\"" + dateStr + "\"]");
      if (!item) return;
      var panel = item.querySelector(".winter-rating__date-panel");
      if (panel) openDateModal(dateStr, panel, preferredLeague);
    }
    function updateDateModalNav(dateStr) {
      var avail = calendarWrap._availableDates || availableDates || [];
      var index = avail.indexOf(dateStr);
      var olderDate = index >= 0 ? avail[index + 1] : null;
      var newerDate = index > 0 ? avail[index - 1] : null;
      if (dateModalPrev) {
        dateModalPrev.disabled = !olderDate;
        dateModalPrev.setAttribute("aria-label", olderDate ? "Предыдущая дата: " + olderDate : "Предыдущая дата");
        dateModalPrev.dataset.ratingDate = olderDate || "";
      }
      if (dateModalNext) {
        dateModalNext.disabled = !newerDate;
        dateModalNext.setAttribute("aria-label", newerDate ? "Следующая дата: " + newerDate : "Следующая дата");
        dateModalNext.dataset.ratingDate = newerDate || "";
      }
    }
    function openDateModal(dateStr, panel, preferredLeague) {
      ensureDateModalNavControls();
      if (!panel) return;
      if (!dateModal || !dateModalBody) {
        if (typeof window.pokerEnsureGlobalModalsHtml !== "function") return;
        if (!dateModalLoadPromise) {
          dateModalLoadPromise = Promise.resolve(window.pokerEnsureGlobalModalsHtml())
            .then(function () {
              refreshDateModalRefs();
              ensureDateModalNavControls();
            })
            .finally(function () {
              dateModalLoadPromise = null;
            });
        }
        dateModalLoadPromise.then(function () {
          if (dateModal && dateModalBody) openDateModal(dateStr, panel, preferredLeague);
        }).catch(function () {});
        return;
      }
      if (dateModalTitle) dateModalTitle.textContent = "Рейтинг на " + dateStr;
      updateDateModalNav(dateStr);
      dateModal.setAttribute("aria-hidden", "false");
      if (document.body) document.body.style.overflow = "hidden";
      var renderSeq = ++dateModalRenderSeq;
      dateModalBody.innerHTML = '<p class="winter-rating__spring-placeholder" role="status">Загружаю рейтинг…</p>';
      var renderModalContent = function () {
        if (renderSeq !== dateModalRenderSeq || !dateModal || dateModal.getAttribute("aria-hidden") === "true") return;
        var lwModal = panel.querySelector(".spring-rating-date-leagues");
        if (lwModal && typeof window.__pokerFillSpringDateLeagues === "function") {
          // Fill both blocks before cloning so switching leagues in the modal is immediate.
          window.__pokerFillSpringDateLeagues(lwModal, dateStr, 1);
          window.__pokerFillSpringDateLeagues(lwModal, dateStr, 2);
        }
        var clone = panel.cloneNode(true);
        clone.classList.remove("winter-rating__date-panel--hidden");
        dateModalBody.innerHTML = "";
        dateModalBody.appendChild(clone);
        var cloneLeaguesWrap = clone.querySelector(".spring-rating-date-leagues");
        if (cloneLeaguesWrap) {
          applyDateModalLeague(cloneLeaguesWrap, preferredLeague);
          cloneLeaguesWrap.addEventListener("click", function (e) {
            var tab = e.target && e.target.closest ? e.target.closest(".spring-rating-date-league-tab") : null;
            if (!tab) return;
            e.preventDefault();
            e.stopPropagation();
            var league = tab.getAttribute("data-league");
            fillSpringLeagueBlocks(cloneLeaguesWrap, dateStr, league);
            cloneLeaguesWrap.querySelectorAll(".spring-rating-date-league-tab").forEach(function (t) { t.classList.toggle("spring-rating-date-league-tab--active", t.getAttribute("data-league") === league); });
            cloneLeaguesWrap.querySelectorAll(".spring-rating-date-league").forEach(function (b) { b.style.display = b.getAttribute("data-league") === league ? "" : "none"; });
          });
        }
        dateModalBody.querySelectorAll(".winter-rating__screenshot").forEach(function (cell) {
          var screensWrap = cell.parentElement;
          if (!screensWrap || !screensWrap.classList || !screensWrap.classList.contains("winter-rating__screenshots")) return;
          var dStr = screensWrap.getAttribute("data-rating-date") || dateStr;
          var leagueAttr = screensWrap.getAttribute("data-league");
          var leagueNum = leagueAttr === "1" || leagueAttr === "2" ? parseInt(leagueAttr, 10) : undefined;
          var siblings = screensWrap.querySelectorAll(".winter-rating__screenshot");
          var idx = Array.prototype.indexOf.call(siblings, cell);
          if (idx < 0 || typeof openWinterRatingLightbox !== "function") return;
          var handler = function (e) {
            if (e) e.preventDefault();
            openWinterRatingLightbox(dStr, idx, leagueNum, {
              directItems: Array.prototype.map.call(siblings, function (item) {
                var img = item.querySelector("img");
                return {
                  src: img ? (img.getAttribute("data-rating-full-src") || img.currentSrc || img.src || "") : "",
                  alt: img ? (img.alt || "") : "",
                };
              }),
            });
          };
          cell.addEventListener("click", handler);
          cell.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handler(); }
          });
        });
      };
      var raf = window.requestAnimationFrame || function (fn) { setTimeout(fn, 0); };
      raf(function () { setTimeout(renderModalContent, 0); });
    }
    function closeDateModal() {
      if (!dateModal) return;
      dateModalRenderSeq += 1;
      dateModal.setAttribute("aria-hidden", "true");
      if (document.body) document.body.style.overflow = "";
    }
    function bindDateModalCloseControls() {
      if (dateModalBackdrop && dateModalBackdrop.getAttribute("data-rating-date-close-bound") !== "1") {
        dateModalBackdrop.setAttribute("data-rating-date-close-bound", "1");
        dateModalBackdrop.addEventListener("click", closeDateModal);
      }
      if (dateModalClose && dateModalClose.getAttribute("data-rating-date-close-bound") !== "1") {
        dateModalClose.setAttribute("data-rating-date-close-bound", "1");
        dateModalClose.addEventListener("click", closeDateModal);
      }
    }
    bindDateModalCloseControls();
    [dateModalPrev, dateModalNext].forEach(function (navBtn) {
      bindDateModalNavButton(navBtn);
    });
    function renderCalendarMonth(monthIndex) {
      calendarWrap._calendarMonthIndex = monthIndex;
      var am = calendarWrap._availableMonths;
      var avail = calendarWrap._availableDates;
      if (monthIndex < 0 || monthIndex >= am.length) return;
      var yearNum = am[monthIndex].year;
      var monthNum = am[monthIndex].month;
      var monthLabel = (monthNames[monthNum - 1] || "") + " " + yearNum;
      var firstDay = new Date(yearNum, monthNum - 1, 1);
      var dow = firstDay.getDay();
      var monFirst = (dow + 6) % 7;
      var daysInMonth = new Date(yearNum, monthNum, 0).getDate();
      var cells = [];
      var i;
      for (i = 0; i < monFirst; i++) cells.push({ empty: true });
      for (i = 1; i <= daysInMonth; i++) {
        var d = i < 10 ? "0" + i : "" + i;
        var m = monthNum < 10 ? "0" + monthNum : "" + monthNum;
        var dateStr = d + "." + m + "." + yearNum;
        var hasData = avail.indexOf(dateStr) !== -1 && hasCalendarCellRatingRows(dateStr);
        cells.push({ empty: false, day: i, dateStr: dateStr, hasData: hasData, tone: hasData ? getCalendarCellTone(dateStr) : "", topReward: hasData ? getCalendarCellTopReward(dateStr) : 0 });
      }
      var weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
      var headerRow = "<div class=\"winter-rating__calendar-weekdays\">" + weekdays.map(function (w) { return "<span class=\"winter-rating__calendar-wday\">" + w + "</span>"; }).join("") + "</div>";
      var rowHtml = "";
      var rowsHtml = "";
      for (i = 0; i < cells.length; i++) {
        if (i > 0 && i % 7 === 0) {
          rowsHtml += "<div class=\"winter-rating__calendar-row\">" + rowHtml + "</div>";
          rowHtml = "";
        }
        var cell = cells[i];
        if (cell.empty) {
          rowHtml += "<span class=\"winter-rating__calendar-cell winter-rating__calendar-cell--empty\"></span>";
        } else if (cell.hasData) {
          var toneClass = cell.tone === "green" ? " winter-rating__calendar-cell--green" : (cell.tone === "brown" ? " winter-rating__calendar-cell--brown" : "");
          var rewardText = cell.topReward > 0 ? formatRewardRound(cell.topReward) + " ₽" : "";
          var rewardShortText = cell.topReward > 0 ? formatCalendarCellRewardShort(cell.topReward) : "";
          var rewardAttr = rewardText ? rewardText.replace(/"/g, "&quot;") : "";
          var rewardHtml = rewardText ? "<span class=\"winter-rating__calendar-cell-reward\" title=\"Максимальные призовые: " + rewardAttr + "\">" + rewardShortText + "</span>" : "";
          var ariaReward = rewardText ? ", максимальные призовые " + rewardText : "";
          rowHtml += "<button type=\"button\" class=\"winter-rating__calendar-cell winter-rating__calendar-cell--day" + toneClass + "\" data-rating-date=\"" + cell.dateStr.replace(/"/g, "&quot;") + "\" aria-label=\"Рейтинг на " + cell.dateStr + ariaReward + "\"><span class=\"winter-rating__calendar-cell-daynum\">" + cell.day + "</span>" + rewardHtml + "</button>";
        } else {
          rowHtml += "<span class=\"winter-rating__calendar-cell winter-rating__calendar-cell--no-data\" aria-hidden=\"true\">" + cell.day + "</span>";
        }
      }
      if (cells.length % 7 !== 0) {
        for (i = cells.length % 7; i < 7; i++) rowHtml += "<span class=\"winter-rating__calendar-cell winter-rating__calendar-cell--empty\"></span>";
      }
      rowsHtml += "<div class=\"winter-rating__calendar-row\">" + rowHtml + "</div>";
      var canPrev = monthIndex < am.length - 1;
      var canNext = monthIndex > 0;
      var prevBtn = "<button type=\"button\" class=\"winter-rating__calendar-nav winter-rating__calendar-nav--prev\" aria-label=\"Предыдущий месяц\"" + (canPrev ? "" : " disabled") + ">←</button>";
      var nextBtn = "<button type=\"button\" class=\"winter-rating__calendar-nav winter-rating__calendar-nav--next\" aria-label=\"Следующий месяц\"" + (canNext ? "" : " disabled") + ">→</button>";
      var titleRow = "<div class=\"winter-rating__calendar-title-row\">" + prevBtn + "<span class=\"winter-rating__calendar-title\">" + monthLabel + "</span>" + nextBtn + "</div>";
      var toneCounts = countCalendarMonthRewardTones(yearNum, monthNum);
      var countsHtml =
        "<div class=\"winter-rating__calendar-counts\" aria-label=\"Заносы месяца\">" +
          "<span class=\"winter-rating__calendar-count winter-rating__calendar-count--green\"><span class=\"winter-rating__calendar-count-swatch\" aria-hidden=\"true\"></span><span>100к+:</span> <strong>" + toneCounts.high + "</strong><span>заносов</span></span>" +
          "<span class=\"winter-rating__calendar-count winter-rating__calendar-count--brown\"><span class=\"winter-rating__calendar-count-swatch\" aria-hidden=\"true\"></span><span>50-100к:</span> <strong>" + toneCounts.mid + "</strong><span>заносов</span></span>" +
        "</div>";
      calendarWrap.innerHTML = "<div class=\"winter-rating__calendar\">" + titleRow + headerRow + "<div class=\"winter-rating__calendar-grid\">" + rowsHtml + "</div>" + countsHtml + "</div>";
      calendarWrap.querySelectorAll(".winter-rating__calendar-cell--day").forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          var dateStr = btn.getAttribute("data-rating-date");
          var item = datesContainer.querySelector(".winter-rating__date-item[data-rating-date=\"" + dateStr + "\"]");
          if (!item) return;
          var panel = item.querySelector(".winter-rating__date-panel");
          if (panel) openDateModal(dateStr, panel);
        });
      });
      var prevEl = calendarWrap.querySelector(".winter-rating__calendar-nav--prev");
      var nextEl = calendarWrap.querySelector(".winter-rating__calendar-nav--next");
      if (prevEl && canPrev) prevEl.addEventListener("click", function () { renderCalendarMonth(monthIndex + 1); });
      if (nextEl && canNext) nextEl.addEventListener("click", function () { renderCalendarMonth(monthIndex - 1); });
    }
    renderCalendarMonth(calendarWrap._calendarMonthIndex);
    if ((!dateModal || !dateModalBody) && typeof window.pokerEnsureGlobalModalsHtml === "function") {
      Promise.resolve(window.pokerEnsureGlobalModalsHtml()).then(function () {
        refreshDateModalRefs();
        ensureDateModalNavControls();
      }).catch(function () {});
    }
    calendarWrap.setAttribute("aria-hidden", "false");
  }
  if (isSummerRatingMode) finishSummerRatingInitialLoadWhenReady(ratingSectionEl);
}
