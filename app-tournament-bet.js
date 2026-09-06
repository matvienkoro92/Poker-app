(function initTournamentBet() {
  "use strict";

  var API_PATH = "/api/tournament-bet";
  var modal = null;
  var bodyEl = null;
  var statusEl = null;
  var state = null;
  var loading = false;
  var loadPromise = null;
  var subscribed = false;
  var refreshTimer = 0;
  var activeTab = "event";
  var selectedEventId = "";
  var deepLinkEventId = "";
  var deepLinkSection = false;
  try { window.localStorage.removeItem("pokerTournamentBetEventId"); } catch (error) {}

  try {
    var startParams = new URLSearchParams(window.location.search || "");
    var startValue = typeof pokerStartAppQueryFromUrlSearchParams === "function" ? pokerStartAppQueryFromUrlSearchParams(startParams) : startParams.get("startapp") || "";
    deepLinkSection = String(startValue || "").toLowerCase() === "tournament_bet";
    var startMatch = String(startValue || "").match(/^tournament_bet_(tb_[a-z0-9_:-]+)$/i);
    if (startMatch) { deepLinkEventId = startMatch[1]; selectedEventId = deepLinkEventId; }
  } catch (error) {}

  function baseUrl() {
    return typeof getApiBase === "function" ? getApiBase().replace(/\/$/, "") : "";
  }

  function authQuery(lead) {
    return typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery(lead) : lead + "initData=";
  }

  function authBody(extra) {
    return typeof pokerApiAuthJsonBody === "function" ? pokerApiAuthJsonBody(extra || {}) : extra || {};
  }

  function esc(value) {
    return String(value == null ? "" : value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function rub(value) {
    return Math.max(0, Math.floor(Number(value) || 0)).toLocaleString("ru-RU").replace(/\u00a0/g, " ") + " ₽";
  }

  function signedRub(value) {
    var amount = Math.trunc(Number(value) || 0);
    return (amount > 0 ? "+" : amount < 0 ? "−" : "") + Math.abs(amount).toLocaleString("ru-RU").replace(/\u00a0/g, " ") + " ₽";
  }

  function betTime(value) {
    var date = new Date(value || "");
    if (!Number.isFinite(date.getTime())) return "";
    try {
      return date.toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
    } catch (error) { return ""; }
  }

  function eveningTournaments() {
    if (typeof window.pokerGetEveningTournamentOptions !== "function") return [];
    var rows = window.pokerGetEveningTournamentOptions();
    return Array.isArray(rows) ? rows : [];
  }

  function stakeTournaments() {
    if (typeof window.pokerGetStakeTournamentOptions !== "function") return [];
    var rows = window.pokerGetStakeTournamentOptions();
    return Array.isArray(rows) ? rows : [];
  }

  function declinedPersonalEvents() {
    try { return JSON.parse(window.localStorage.getItem("pokerTournamentBetDeclined") || "[]"); } catch (error) { return []; }
  }

  function declinePersonalEvent(id) {
    var rows = declinedPersonalEvents().filter(Boolean);
    if (rows.indexOf(id) < 0) rows.push(id);
    try { window.localStorage.setItem("pokerTournamentBetDeclined", JSON.stringify(rows.slice(-100))); } catch (error) {}
  }

  function tournamentBannerUrl(file) {
    var clean = String(file || "").trim();
    if (!clean) return "";
    if (typeof getHomeTournamentBannerUrl === "function") return getHomeTournamentBannerUrl(clean);
    return "./assets/" + encodeURIComponent(clean);
  }

  function tournamentBannerHtml(data, preview) {
    var file = String(data && (data.tournamentBanner || data.banner) || "").trim();
    var src = data && data.bannerUrl || tournamentBannerUrl(file);
    if (!src) return "";
    var name = String(data && (data.tournamentBannerAlt || data.bannerAlt || data.title || data.name) || "Турнир вечера");
    var width = Math.max(1, Number(data && (data.tournamentBannerWidth || data.bannerWidth)) || 640);
    var height = Math.max(1, Number(data && (data.tournamentBannerHeight || data.bannerHeight)) || 915);
    return '<figure class="tournament-bet-modal__tournament-banner' + (preview ? ' tournament-bet-modal__tournament-banner--preview' : '') + '">' +
      '<img src="' + esc(src) + '" alt="' + esc(name) + '" width="' + width + '" height="' + height + '" loading="eager" decoding="async"></figure>';
  }

  function showAlert(message) {
    var tg = window.Telegram && window.Telegram.WebApp;
    if (tg && typeof tg.showAlert === "function") tg.showAlert(String(message || "Ошибка"));
    else window.alert(String(message || "Ошибка"));
  }

  function eventShareLink(id) {
    var startParam = "tournament_bet_" + String(id || "");
    if (typeof buildMiniAppStartLink === "function") return buildMiniAppStartLink(startParam);
    if (typeof pokerBuildWebsiteStartLink === "function") {
      var webLink = pokerBuildWebsiteStartLink(startParam);
      if (webLink) return webLink;
    }
    var base = typeof getAppBaseUrlForLinks === "function" ? getAppBaseUrlForLinks() : String(window.location.origin || "") + String(window.location.pathname || "/");
    base = String(base || "").replace(/\?.*$/, "").replace(/\/+$/, "");
    return base + "/?startapp=" + encodeURIComponent(startParam);
  }

  function copyEventLink(id) {
    var link = eventShareLink(id);
    var copied = typeof pokerCopyTextToClipboard === "function" ? pokerCopyTextToClipboard(link) : navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(link).then(function () { return true; }).catch(function () { return false; }) : Promise.resolve(false);
    Promise.resolve(copied).then(function (ok) { showAlert(ok ? "Ссылка на ставку скопирована." : "Скопируйте ссылку: " + link); });
  }

  function shareEvent(data) {
    var link = eventShareLink(data && data.id);
    var textValue = "Ставка на себя в турнире «" + String(data && data.title || "Турнир") + "» · " + rub(data && data.stakePrice);
    if (typeof pokerTryPwaWebShare === "function") {
      pokerTryPwaWebShare({ title: "Ставка на себя", text: textValue + "\n" + link, url: link }).then(function (ok) { if (!ok) openTelegramEventShare(link, textValue); });
    } else openTelegramEventShare(link, textValue);
  }

  function openTelegramEventShare(link, textValue) {
    var shareUrl = typeof pokerBuildTelegramShareUrlDialog === "function" ? pokerBuildTelegramShareUrlDialog(link, textValue) : "https://t.me/share/url?url=" + encodeURIComponent(link) + "&text=" + encodeURIComponent(textValue);
    var tg = window.Telegram && window.Telegram.WebApp;
    if (tg && typeof tg.openTelegramLink === "function") tg.openTelegramLink(shareUrl);
    else if (tg && typeof tg.openLink === "function") tg.openLink(shareUrl);
    else window.open(shareUrl, "_blank", "noopener,noreferrer");
  }

  function setStatus(message, tone) {
    var value = String(message || "");
    var inline = modal && modal.querySelector("[data-tournament-bet-inline-status]");
    if (inline) {
      inline.textContent = value;
      inline.dataset.tone = tone || "";
      inline.hidden = !value;
    }
    if (!statusEl) return;
    statusEl.textContent = inline ? "" : value;
    statusEl.dataset.tone = inline ? "" : tone || "";
  }

  function ensureModal() {
    if (modal) return modal;
    modal = document.createElement("div");
    modal.className = "club-choice-vote-modal tournament-bet-modal";
    modal.hidden = true;
    modal.innerHTML =
      '<div class="club-choice-vote-modal__backdrop" data-tournament-bet-close></div>' +
      '<section class="club-choice-vote-modal__panel tournament-bet-modal__panel" role="dialog" aria-modal="true" aria-labelledby="tournamentBetTitle">' +
        '<header class="club-choice-vote-modal__head tournament-bet-modal__head"><div>' +
          '<p class="club-choice-vote-modal__eyebrow">Турнир вечера</p>' +
          '<h2 class="club-choice-vote-modal__title" id="tournamentBetTitle">Ставка на себя</h2>' +
        '</div><button type="button" class="club-choice-vote-modal__close" data-tournament-bet-close aria-label="Закрыть">×</button></header>' +
        '<div class="club-choice-vote-modal__status" data-tournament-bet-status role="status" aria-live="polite"></div>' +
        '<div class="club-choice-vote-modal__body tournament-bet-modal__body" data-tournament-bet-body></div>' +
      '</section>';
    document.body.appendChild(modal);
    bodyEl = modal.querySelector("[data-tournament-bet-body]");
    statusEl = modal.querySelector("[data-tournament-bet-status]");
    modal.addEventListener("click", onClick);
    modal.addEventListener("submit", onSubmit);
    return modal;
  }

  function participantHtml(entry, index, data) {
    var art = "";
    if (typeof window.pokerGetSummerRatingPlayerArt === "function") {
      var sharedArt = window.pokerGetSummerRatingPlayerArt(entry && entry.name);
      if (sharedArt && sharedArt.src) art = String(sharedArt.src);
    }
    var avatarSrc = art || entry.avatar || "";
    var avatar = avatarSrc
      ? '<span class="sng-champions-modal__entry-avatar-media"><img class="sng-champions-modal__entry-avatar-img' + (art ? ' sng-champions-modal__entry-avatar-img--art' : '') + '" src="' + esc(avatarSrc) + '" alt="" loading="lazy" decoding="async"></span>'
      : '<span>' + esc(String(entry.name || "И").slice(0, 1).toUpperCase()) + '</span>';
    var level = entry.level == null ? "" : String(Math.max(0, Math.floor(Number(entry.level) || 0)));
    var city = String(entry.profileCity || "").trim();
    var poker21Id = data && data.isAdmin ? String(entry.poker21Id || "").trim() : "";
    var joined = betTime(entry.joinedAt);
    var status = entry.winner ? "Победитель · забрал банк" : entry.mine ? "Ваша ставка принята" : "Ставка принята";
    return '<article class="sng-champions-modal__entry tournament-bet-modal__entry' + (entry.mine ? ' tournament-bet-modal__entry--mine' : '') + (entry.winner ? ' tournament-bet-modal__entry--winner' : '') + '">' +
      '<span class="tournament-bet-modal__place">' + (index + 1) + '</span>' +
      '<span class="sng-champions-modal__entry-avatar tournament-bet-modal__avatar">' + avatar + (level ? '<em>' + esc(level) + '</em>' : '') + '</span>' +
      '<div class="sng-champions-modal__entry-main tournament-bet-modal__entry-main">' +
        '<strong class="sng-champions-modal__entry-name">' + esc(entry.name || "Игрок") + '</strong>' +
        '<span class="sng-champions-modal__entry-status">✓ ' + esc(status) + '</span>' +
        (poker21Id ? '<span class="sng-champions-modal__entry-poker21"><small>ID Poker21</small><strong>' + esc(poker21Id) + '</strong></span>' : '') +
        ((level || city) ? '<small class="sng-champions-modal__entry-meta">' + (level ? '<span>Уровень ' + esc(level) + '</span>' : '') + (city ? '<span>' + esc(city) + '</span>' : '') + '</small>' : '') +
        '<span class="tournament-bet-modal__entry-stake"><small>Ставка' + (joined ? ' · ' + esc(joined) : '') + '</small><strong>' + rub(entry.stake || data.stakePrice) + '</strong></span>' +
      '</div>' +
    '</article>';
  }

  function ratingHtml(data) {
    var rows = Array.isArray(data.rating) ? data.rating : [];
    if (!rows.length) return '<section class="tournament-bet-modal__rating-empty"><strong>Рейтинг пока пуст</strong><p>Статистика появится после первой ставки.</p></section>';
    return '<section class="tournament-bet-modal__rating"><header><h3>Рейтинг ставочников</h3><span>' + rows.length + '</span></header><div class="tournament-bet-modal__rating-list">' + rows.map(function (entry) {
      var art = "";
      if (typeof window.pokerGetSummerRatingPlayerArt === "function") {
        var sharedArt = window.pokerGetSummerRatingPlayerArt(entry.name);
        if (sharedArt && sharedArt.src) art = String(sharedArt.src);
      }
      var src = art || entry.avatar || "";
      var avatar = src ? '<span class="sng-champions-modal__entry-avatar-media"><img class="sng-champions-modal__entry-avatar-img' + (art ? ' sng-champions-modal__entry-avatar-img--art' : '') + '" src="' + esc(src) + '" alt="" loading="lazy" decoding="async"></span>' : '<b>' + esc(String(entry.name || "И").slice(0, 1).toUpperCase()) + '</b>';
      var level = entry.level == null ? "" : '<em>' + esc(Math.max(0, Math.floor(Number(entry.level) || 0))) + '</em>';
      return '<article class="tournament-bet-modal__rating-row' + (entry.mine ? ' tournament-bet-modal__rating-row--mine' : '') + '">' +
        '<strong class="tournament-bet-modal__rating-place">' + esc(entry.place) + '</strong>' +
        '<span class="sng-champions-modal__entry-avatar tournament-bet-modal__rating-avatar">' + avatar + level + '</span>' +
        '<div class="tournament-bet-modal__rating-player"><strong>' + esc(entry.name || "Игрок") + '</strong><small>' + esc(entry.profileCity || "Участник клуба") + '</small></div>' +
        '<dl><div><dt>Участий</dt><dd>' + esc(entry.participations) + '</dd></div><div><dt>Побед</dt><dd>' + esc(entry.wins) + '</dd></div><div><dt>Внесено</dt><dd>' + rub(entry.totalStaked) + '</dd></div><div><dt>Выиграно</dt><dd>' + rub(entry.totalWon) + '</dd></div><div><dt>Результат</dt><dd class="' + (entry.net >= 0 ? 'is-positive' : 'is-negative') + '">' + signedRub(entry.net) + '</dd></div><div><dt>Винрейт</dt><dd>' + esc(entry.winRate) + '%</dd></div></dl>' +
      '</article>';
    }).join("") + '</div></section>';
  }

  function createBetHtml(data) {
    var tournaments = stakeTournaments();
    var declined = declinedPersonalEvents();
    var personalEvents = Array.isArray(data && data.events) ? data.events.filter(function (item) { return item && item.createdByPlayer && declined.indexOf(item.id) < 0; }) : [];
    var personalList = personalEvents.length ? '<section class="tournament-bet-modal__personal-events"><h3>Персональные ставки</h3><div>' + personalEvents.map(function (item) {
      var accept = item.joined ? '<button type="button" disabled>✓ Ставка принята</button>' : '<button type="button" data-tournament-bet-personal-accept="' + esc(item.id) + '" data-stake-price="' + esc(item.stakePrice) + '">Принять</button>';
      return '<article><button type="button" class="tournament-bet-modal__personal-open" data-tournament-bet-personal-event="' + esc(item.id) + '"><strong>' + esc(item.title || "Турнир") + '</strong><span>Ставка ' + rub(item.stakePrice) + ' · банк ' + rub(item.bank) + ' · участников ' + esc(item.participantsCount || 0) + '</span></button><div>' + accept + '<button type="button" data-tournament-bet-personal-decline="' + esc(item.id) + '">Отклонить</button></div></article>';
    }).join("") + '</div></section>' : "";
    return personalList + '<form class="tournament-bet-modal__player-create" data-tournament-bet-player-create>' +
      '<h3>Создать персональную ставку</h3><p>Выберите турнир, в котором хотите поставить на себя</p>' +
      '<label><span>Турнир</span><select name="tournamentId" required><option value="">Выберите турнир</option>' + tournaments.map(function (item) {
        return '<option value="' + esc(item.id) + '">' + esc(item.day + ' · ' + item.time + ' · ' + item.name + ' · вход ' + item.buyinLabel) + '</option>';
      }).join("") + '</select></label>' +
      '<label><span>Цена вашей ставки</span><input name="stakePrice" type="text" inputmode="numeric" pattern="[0-9 ]*" autocomplete="off" placeholder="500" required></label>' +
      '<small>Стартового банка нет. Банк начнётся с вашей ставки и будет расти с каждой новой ставкой участника.</small>' +
      '<div class="tournament-bet-modal__inline-status" data-tournament-bet-inline-status role="status" aria-live="assertive" hidden></div>' +
      '<button type="submit">Создать и поставить на себя</button>' +
    '</form>';
  }

  function subscriptionButtonHtml() {
    return '<button type="button" data-tournament-bet-subscribe aria-pressed="' + subscribed + '">' +
      (subscribed ? 'Отписаться от раздела' : 'Подписаться на раздел') + '</button>';
  }

  function closedEventHtml(data) {
    var entries = Array.isArray(data.entries) ? data.entries : [];
    var winner = entries.find(function (entry) { return entry.winner; });
    var winnerArt = winner && typeof window.pokerGetSummerRatingPlayerArt === "function" ? window.pokerGetSummerRatingPlayerArt(winner.name) : null;
    var winnerArtSrc = winnerArt && winnerArt.src || "";
    if (!winnerArtSrc && winner && /^(frankl|andrushamorf|4ezzi)$/i.test(String(winner.name || "").trim())) winnerArtSrc = "./assets/summer-rating-player-morf.webp";
    var settled = data.status === "settled";
    var expanded = bodyEl && bodyEl.querySelector(".tournament-bet-modal__closed-event[open]");
    var payout = data.winnerPaidAmount == null ? data.bank : data.winnerPaidAmount;
    return '<details class="tournament-bet-modal__closed-event"' + (expanded ? ' open' : '') + '><summary' + (winnerArtSrc ? ' class="tournament-bet-modal__result-with-art"' : '') + '>' +
      (winnerArtSrc ? '<img class="tournament-bet-modal__result-art" src="' + esc(winnerArtSrc) + '" alt="" loading="lazy" decoding="async">' : '') +
      '<span class="tournament-bet-modal__result-status">' + (settled ? 'Событие завершено' : 'Приём ставок закрыт') + '</span>' +
      '<strong class="tournament-bet-modal__result-title">' + esc(data.title || "Ласт-лонгер") + '</strong>' +
      (winner ? '<span class="tournament-bet-modal__result-winner">🏆 ' + esc(winner.name || "Игрок") + '</span>' +
        '<span class="tournament-bet-modal__result-amounts"><span>Поставил <strong>' + rub(winner.stake || data.stakePrice) + '</strong></span><span>Забрал <strong>' + rub(payout) + '</strong></span></span>' :
        '<span class="tournament-bet-modal__result-pending">' + (settled ? 'Победитель не указан' : 'Ожидаем результат турнира') + '</span>') +
      '<span class="tournament-bet-modal__result-toggle">Участники: ' + entries.length + ' · Подробнее <span aria-hidden="true">⌄</span></span></summary>' +
      '<div class="tournament-bet-modal__participants-grid">' + entries.map(function (entry, index) { return participantHtml(entry, index, data); }).join("") + '</div>' +
      '<div class="tournament-bet-modal__share"><button type="button" data-tournament-bet-copy>Скопировать ссылку</button><button type="button" data-tournament-bet-share>Поделиться</button></div></details>' +
      '<div class="tournament-bet-modal__share">' + subscriptionButtonHtml() + '</div>' + adminHtml(data);
  }

  function eventHtml(data) {
    if (data.status === "settled" || data.status === "closed") return closedEventHtml(data);
    var tournament = eveningTournaments().concat(stakeTournaments()).find(function (item) {
      return String(item.id) === String(data.tournamentId) && item.name === data.title;
    }) || {};
    var startTime = data.tournamentTime || tournament.time || "";
    if (startTime && !/МСК/i.test(startTime)) startTime += " МСК";
    var details = [["Гарантия", data.tournamentGuarantee || tournament.guarantee || "Уточняется"],
      ["Старт", startTime || "Уточняется"],
      ["Вход", data.tournamentBuyin || tournament.buyinLabel || tournament.buyin || "Уточняется"]];
    var joined = !!data.myEntry;
    var action = data.status === "open"
      ? joined
        ? '<button type="button" class="tournament-bet-modal__bet tournament-bet-modal__bet--done" disabled>✓ Ваша ставка принята</button>'
        : '<button type="button" class="tournament-bet-modal__bet" data-tournament-bet-action="bet">Сделать ставку на себя · ' + rub(data.stakePrice) + '</button>'
      : data.status === "settled"
        ? '<div class="tournament-bet-modal__closed">Событие завершено</div>'
        : '<div class="tournament-bet-modal__closed">Приём ставок закрыт</div>';
    var entries = Array.isArray(data.entries) ? data.entries : [];
    var back = data.createdByPlayer ? '<button type="button" class="tournament-bet-modal__personal-back" data-tournament-bet-personal-back>← Все персональные ставки</button>' : "";
    return back + '<section class="tournament-bet-modal__feature"><div class="tournament-bet-modal__offer">' +
        '<p>Турнир вечера</p><h3>' + esc(data.title || "Турнир вечера") + '</h3>' +
        (/^magic\s+mko$/i.test(String(data.title || "").trim()) ? '<p class="tournament-bet-modal__subtitle">ПЯТНИЦА 18:00 мск</p>' : '') +
        '<dl class="tournament-bet-modal__details">' + details.map(function (item) {
          return '<div><dt>' + esc(item[0]) + '</dt><dd>' + esc(item[1]) + '</dd></div>';
        }).join("") + '</dl>' +
        '<h4>Сделай ставку на себя</h4>' +
        '<div class="tournament-bet-modal__bank"><span>Банк сейчас</span><strong>' + rub(data.bank) + '</strong></div>' +
        '<p class="tournament-bet-modal__lead">Пройдите дальше тех, кто сделал ставку на себя, и заберите весь банк.</p>' +
      '</div><figure class="tournament-bet-modal__feature-art"><img src="./assets/tournament-bet-self-hero-v2.jpg" alt="" width="511" height="768" loading="eager" decoding="async"></figure></section>' +
      '<div class="tournament-bet-modal__share"><button type="button" data-tournament-bet-copy>Скопировать ссылку</button><button type="button" data-tournament-bet-share>Поделиться</button>' + subscriptionButtonHtml() + '</div>' +
      '<section class="tournament-bet-modal__participants"><header><h3>Участники</h3><span>' + entries.length + '</span></header>' +
        (entries.length ? '<div class="tournament-bet-modal__participants-grid">' + entries.map(function (entry, index) { return participantHtml(entry, index, data); }).join("") + '</div>' : '<p class="tournament-bet-modal__participants-empty">Пока никто не сделал ставку. Будьте первым.</p>') +
      '</section>' + adminHtml(data) +
      '<div class="tournament-bet-modal__sticky-action"><div class="tournament-bet-modal__inline-status" data-tournament-bet-inline-status role="status" aria-live="assertive" hidden></div>' + action + '</div>';
  }

  function adminHtml(data) {
    if (!data.isAdmin) return "";
    if (!data.id || data.status === "settled" || (data.status !== "open" && !(data.entries && data.entries.length))) {
      var tournaments = eveningTournaments();
      var first = tournaments[0] || null;
      return '<form class="tournament-bet-modal__admin" data-tournament-bet-create>' +
        '<h3>Создать событие</h3><label><span>Турнир вечера</span><select name="tournamentId" data-tournament-bet-tournament required>' +
          '<option value="">Выберите турнир</option>' + tournaments.map(function (item, index) {
            return '<option value="' + esc(item.id) + '"' + (index === 0 ? ' selected' : '') + '>' +
              esc(item.day + " · " + item.name + (item.buyin ? " · " + item.buyin : "")) + '</option>';
          }).join("") + '</select></label>' +
        '<div data-tournament-bet-banner-preview>' + tournamentBannerHtml(first, true) + '</div>' +
        '<label><span>Стартовый банк</span><input name="startingBank" type="number" min="1" step="1" placeholder="10000" required></label>' +
        '<label><span>Цена ставки</span><input name="stakePrice" type="number" min="1" step="1" placeholder="500" required></label>' +
        '<div class="tournament-bet-modal__inline-status" data-tournament-bet-inline-status role="status" aria-live="assertive" hidden></div>' +
        '<button type="submit">Создать и открыть ставки</button></form>';
    }
    var closeButton = data.status === "open" ? '<button type="button" data-tournament-bet-action="close">Закрыть приём ставок</button>' : "";
    var startingBankForm = data.status !== "settled" ? '<form data-tournament-bet-starting-bank><label><span>Стартовый банк</span><input name="startingBank" type="text" inputmode="numeric" pattern="[0-9 ]*" autocomplete="off" value="' + esc(data.startingBank || 0) + '" required></label><button type="submit">Изменить стартовый банк</button></form>' : "";
    var settle = data.entries && data.entries.length && data.status !== "settled"
      ? '<form data-tournament-bet-settle><label><span>Кто прошёл дальше всех</span><select name="winnerAccountId" required><option value="">Выберите победителя</option>' + data.entries.map(function (entry) {
          return '<option value="' + esc(entry.accountId) + '">' + esc(entry.name) + '</option>';
        }).join("") + '</select></label><button type="submit">Начислить победителю весь банк</button></form>' : "";
    return '<section class="tournament-bet-modal__admin"><h3>Управление событием</h3>' + startingBankForm + closeButton + settle + '</section>';
  }

  function render() {
    ensureModal();
    var data = state || { active: false, entries: [] };
    var tabs = '<nav class="tournament-bet-modal__tabs" aria-label="Разделы"><button type="button" data-tournament-bet-tab="event" class="' + (activeTab === "event" ? 'is-active' : '') + '">Ставка на себя</button><button type="button" data-tournament-bet-tab="create" class="' + (activeTab === "create" ? 'is-active' : '') + '">Личная ставка</button><button type="button" data-tournament-bet-tab="rating" class="' + (activeTab === "rating" ? 'is-active' : '') + '">Рейтинг</button></nav>';
    if (!data.id) {
      var emptyEvent = '<section class="tournament-bet-modal__empty"><span aria-hidden="true">♠</span><strong>Ставки ещё не открыты</strong><p>Администратор создаст событие перед турниром.</p></section><div class="tournament-bet-modal__share">' + subscriptionButtonHtml() + '</div>' + adminHtml(data);
      bodyEl.innerHTML = tabs + '<div class="tournament-bet-modal__tab-panel">' + (activeTab === "rating" ? ratingHtml(data) : activeTab === "create" ? createBetHtml(data) : emptyEvent) + '</div>';
      updateHomeButton(data);
      return;
    }
    var panel = activeTab === "rating" ? ratingHtml(data) : activeTab === "create" ? (data.createdByPlayer ? eventHtml(data) : createBetHtml(data)) : eventHtml(data);
    bodyEl.innerHTML = tabs + '<div class="tournament-bet-modal__tab-panel">' + panel + '</div>';
    updateHomeButton(data);
  }

  function updateHomeButton(data) {
    var amount = document.querySelector("[data-tournament-bet-home-bank]");
    var button = document.querySelector("[data-tournament-bet-open]");
    var hasEvent = !!(data && data.id);
    if (amount) {
      amount.hidden = false;
      amount.textContent = hasEvent ? rub(data.bank) : "—";
    }
    var players = document.querySelector("[data-tournament-bet-home-players]");
    var stake = document.querySelector("[data-tournament-bet-home-stake]");
    if (players) players.textContent = hasEvent ? String(data.participantsCount || 0) : "—";
    if (stake) stake.textContent = hasEvent ? rub(data.stakePrice) : "—";
    if (button) button.classList.toggle("home-mini-icon-item--vote-active", !!(data && data.status === "open"));
  }

  function load(silent) {
    if (loading) return Promise.resolve(state);
    loading = true;
    if (!silent && bodyEl) bodyEl.innerHTML = '<div class="club-choice-vote-modal__loading">Идёт загрузка…</div>';
    var eventQuery = selectedEventId ? "eventId=" + encodeURIComponent(selectedEventId) + "&" : "";
    loadPromise = fetch(baseUrl() + API_PATH + authQuery("?" + eventQuery), { cache: "no-store" }).then(function (response) {
      return response.json().catch(function () { return {}; }).then(function (data) {
        if (!response.ok || !data.ok) throw new Error(data.error || "Не удалось загрузить событие");
        var activeField = modal && document.activeElement && modal.contains(document.activeElement) && document.activeElement.matches("input, select, textarea");
        if (typeof data.subscribed === "boolean") subscribed = data.subscribed;
        state = data;
        if (deepLinkEventId && data && data.id === deepLinkEventId) { activeTab = data.createdByPlayer ? "create" : "event"; deepLinkEventId = ""; }
        var adminForm = bodyEl && bodyEl.querySelector("form");
        if (!(silent && (activeTab === "create" || activeField || adminForm))) render();
        else updateHomeButton(data);
        return data;
      });
    }).catch(function (error) {
      if (!silent) setStatus(error.message, "error");
      return null;
    }).finally(function () { loading = false; loadPromise = null; });
    return loadPromise;
  }

  function post(payload, pendingText) {
    if (loadPromise) {
      setStatus(pendingText || "Сохраняю…", "loading");
      return loadPromise.then(function () { return post(payload, pendingText); });
    }
    if (loading) return Promise.resolve(null);
    loading = true;
    setStatus(pendingText || "Сохраняю…", "loading");
    if (state && state.id && payload.action !== "create" && payload.action !== "create_player" && !payload.eventId) payload.eventId = state.id;
    return fetch(baseUrl() + API_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authBody(payload)),
    }).then(function (response) {
      return response.json().catch(function () { return {}; }).then(function (data) {
        if (!response.ok || !data.ok) throw new Error(data.error || "Не удалось выполнить действие");
        if (payload.action === "subscribe" || payload.action === "unsubscribe") {
          subscribed = data.subscribed === true;
          render();
          setStatus(subscribed ? "Подписка включена. Новые события будут приходить в бот." : "Подписка отключена.", "success");
          return data;
        }
        state = data;
        if (data && data.id && payload.action === "create_player") {
          selectedEventId = data.id;
        } else if (payload.action === "create") {
          selectedEventId = "";
        }
        setStatus("Готово", "success");
        render();
        return data;
      });
    }).catch(function (error) {
      setStatus(error.message, "error");
      showAlert(error.message);
      return null;
    }).finally(function () { loading = false; });
  }

  function open() {
    var styles = typeof window.pokerEnsureStyleDomains === "function" ? window.pokerEnsureStyleDomains(["tournament", "tournament-bet"]) : null;
    return Promise.resolve(styles).then(function () {
      ensureModal();
      modal.hidden = false;
      document.body.classList.add("tournament-bet-modal-open");
      setStatus("");
      load(false);
      clearInterval(refreshTimer);
      refreshTimer = window.setInterval(function () { if (modal && !modal.hidden) load(true); }, 15000);
    }).catch(function () { setStatus("Не удалось открыть турнир. Попробуйте ещё раз."); });
  }

  function close() {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove("tournament-bet-modal-open");
    clearInterval(refreshTimer);
  }

  function onClick(event) {
    if (event.target.closest("[data-tournament-bet-subscribe]")) {
      post({ action: subscribed ? "unsubscribe" : "subscribe" }, "Сохраняю подписку…");
      return;
    }
    if (event.target.closest("[data-tournament-bet-close]")) { close(); return; }
    var tabEl = event.target.closest("[data-tournament-bet-tab]");
    if (tabEl) {
      var requestedTab = tabEl.getAttribute("data-tournament-bet-tab");
      activeTab = requestedTab === "rating" || requestedTab === "create" ? requestedTab : "event";
      if (activeTab === "event") { selectedEventId = ""; load(false); } else if (activeTab === "create" && state && state.createdByPlayer) render(); else render();
      return;
    }
    var personalEvent = event.target.closest("[data-tournament-bet-personal-event]");
    if (personalEvent) { selectedEventId = personalEvent.getAttribute("data-tournament-bet-personal-event") || ""; activeTab = "create"; load(false); return; }
    var personalAccept = event.target.closest("[data-tournament-bet-personal-accept]");
    if (personalAccept) {
      var acceptId = personalAccept.getAttribute("data-tournament-bet-personal-accept") || "";
      var acceptPrice = personalAccept.getAttribute("data-stake-price") || "";
      if (!acceptId || !window.confirm("Списать " + rub(acceptPrice) + " с баланса Poker21 и принять ставку?")) return;
      post({ action: "bet", eventId: acceptId }, "Проверяю баланс и принимаю ставку…").then(function (result) { if (result) { selectedEventId = ""; activeTab = "create"; load(false); } });
      return;
    }
    var personalDecline = event.target.closest("[data-tournament-bet-personal-decline]");
    if (personalDecline) { declinePersonalEvent(personalDecline.getAttribute("data-tournament-bet-personal-decline") || ""); render(); return; }
    if (event.target.closest("[data-tournament-bet-personal-back]")) { selectedEventId = ""; activeTab = "create"; load(false); return; }
    if (event.target.closest("[data-tournament-bet-copy]")) { if (state && state.id) copyEventLink(state.id); return; }
    if (event.target.closest("[data-tournament-bet-share]")) { if (state && state.id) shareEvent(state); return; }
    var actionEl = event.target.closest("[data-tournament-bet-action]");
    if (!actionEl) return;
    var action = actionEl.getAttribute("data-tournament-bet-action");
    if (action === "bet") {
      if (!state || !window.confirm("Списать " + rub(state.stakePrice) + " с баланса Poker21 и сделать ставку на себя?")) return;
      post({ action: "bet" }, "Проверяю баланс и принимаю ставку…");
    } else if (action === "close" && window.confirm("Закрыть приём ставок?")) {
      post({ action: "close" }, "Закрываю приём ставок…");
    }
  }

  function onChange(event) {
    var eventSelect = event.target.closest("[data-tournament-bet-event]");
    if (eventSelect) {
      selectedEventId = String(eventSelect.value || "");
      load(false);
      return;
    }
    var select = event.target.closest("[data-tournament-bet-tournament]");
    if (!select) return;
    var form = select.closest("[data-tournament-bet-create]");
    var preview = form && form.querySelector("[data-tournament-bet-banner-preview]");
    var selected = eveningTournaments().find(function (item) { return String(item.id) === String(select.value); });
    if (preview) preview.innerHTML = tournamentBannerHtml(selected, true);
  }

  function onSubmit(event) {
    var startingBank = event.target.closest("[data-tournament-bet-starting-bank]");
    if (startingBank) {
      event.preventDefault();
      post({ action: "update_starting_bank", startingBank: startingBank.elements.startingBank.value }, "Обновляю стартовый банк…");
      return;
    }
    var playerCreate = event.target.closest("[data-tournament-bet-player-create]");
    if (playerCreate) {
      event.preventDefault();
      var tournament = stakeTournaments().find(function (item) { return String(item.id) === String(playerCreate.elements.tournamentId.value); });
      var stakePrice = playerCreate.elements.stakePrice.value;
      if (!tournament) { showAlert("Выберите турнир"); return; }
      if (!window.confirm("Списать " + rub(stakePrice) + " с Poker21 и создать ставку на турнир «" + tournament.name + "»?")) return;
      post({ action: "create_player", tournamentId: tournament.id, tournamentTitle: tournament.name, tournamentBuyin: tournament.buyin,
        tournamentBuyinLabel: tournament.buyinLabel, tournamentGuarantee: tournament.guarantee, tournamentTime: tournament.time, stakePrice: stakePrice }, "Создаю ставку и проверяю баланс…").then(function (result) {
        if (result) { activeTab = "create"; render(); }
      });
      return;
    }
    var create = event.target.closest("[data-tournament-bet-create]");
    if (create) {
      event.preventDefault();
      var selected = eveningTournaments().find(function (item) {
        return String(item.id) === String(create.elements.tournamentId.value);
      });
      if (!selected) { showAlert("Выберите турнир вечера"); return; }
      post({
        action: "create",
        tournamentId: selected.id,
        tournamentTitle: selected.name,
        tournamentBanner: selected.banner,
        tournamentBannerAlt: selected.bannerAlt,
        tournamentBannerWidth: selected.bannerWidth,
        tournamentBannerHeight: selected.bannerHeight,
        tournamentBuyin: selected.buyin,
        tournamentGuarantee: selected.guarantee,
        tournamentTime: selected.time,
        startingBank: create.elements.startingBank.value,
        stakePrice: create.elements.stakePrice.value,
      }, "Создаю событие…");
      return;
    }
    var settle = event.target.closest("[data-tournament-bet-settle]");
    if (settle) {
      event.preventDefault();
      var winnerId = settle.elements.winnerAccountId.value;
      if (!winnerId || !window.confirm("Начислить выбранному игроку весь банк " + rub(state && state.bank) + "?")) return;
      post({ action: "settle", winnerAccountId: winnerId }, "Начисляю банк победителю…");
    }
  }

  document.addEventListener("click", function (event) {
    var trigger = event.target && event.target.closest ? event.target.closest("[data-tournament-bet-open]") : null;
    if (!trigger) return;
    event.preventDefault();
    open();
  });
  document.addEventListener("change", onChange);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal && !modal.hidden) close();
  });
  function initialLoad() { if (deepLinkEventId || deepLinkSection) open(); else load(true); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialLoad, { once: true });
  else initialLoad();
  window.openTournamentBetModal = open;
})();
