(function () {
  "use strict";
  var generation = 0, pending = false, loadedAt = 0, spin = null, offset = 0, nickname = "", account = "";
  var root;
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
  function num(n) { return Number(n).toLocaleString("ru-RU", {maximumFractionDigits: 0}); }
  function link(text, target) { return '<a href="#" class="summary-link" data-view-target="' + target + '">' + esc(text) + ' <span aria-hidden="true">→</span></a>'; }
  function section(id, title, body) { return '<section class="summary-card summary-card--' + id + '" aria-labelledby="summary-title-' + id + '"><h2 id="summary-title-' + id + '">' + title + '</h2><div id="summary-' + id + '">' + body + '</div></section>'; }
  function put(id, html) { var el = document.getElementById("summary-" + id); if (el) el.innerHTML = html; }
  function dateLabel(d) { return new Intl.DateTimeFormat("ru-RU", {timeZone:"Europe/Moscow", day:"numeric", month:"short", hour:"2-digit",minute:"2-digit"}).format(new Date(d)) + " мск"; }
  function request(path, body) {
    var controller = new AbortController(), timeout = setTimeout(function () { controller.abort(); }, 12000);
    var opts = {cache:"no-store", signal:controller.signal};
    if (body) { opts.method = "POST"; opts.headers = {"Content-Type":"application/json"}; opts.body = JSON.stringify(pokerApiAuthJsonBody(body)); }
    else path += pokerApiAuthQuery("?") + (path === "raffles" ? "&scope=active" : "");
    return fetch(getApiBase() + "/api/" + path, opts).then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); }).then(function (d) { if (d.ok === false) throw new Error("API"); return d; }).finally(function () { clearTimeout(timeout); });
  }
  function error(id) { put(id, '<p class="summary-muted">Не удалось загрузить. Попробуйте обновить сводку.</p>'); }
  function friends() {
    var data = typeof window.pokerGetFriendNewsSummary === "function" ? window.pokerGetFriendNewsSummary() : null;
    put("friends", '<strong class="summary-value">' + (data && data.accountId && data.ready !== false ? (data.unread ? num(data.unread) + ' непрочитанных' : 'Вы всё прочитали') : 'События ваших друзей') + '</strong><p class="summary-muted">Результаты и события друзей.</p><button type="button" class="summary-link" data-summary-friends>Новости друзей →</button>');
    var home = document.getElementById("mySummaryHint");
    if (home) home.textContent = (spin ? spinText() : "Ваш прогресс и ближайшие события") + (data && data.unread ? " · Новых у друзей: " + data.unread : "");
  }
  function spinText() {
    if (spin.subscriptionRequired) return "Проверьте условия участия";
    if (spin.canPlay) return "Крутка доступна";
    var remaining = Date.parse(spin.nextFreeAttemptAt) - (Date.now() + offset);
    if (!isFinite(remaining)) return "Крутка пока недоступна";
    if (remaining <= 0) return "Проверяем доступность крутки";
    var minutes = Math.ceil(remaining / 60000);
    return "Крутка через " + (minutes >= 60 ? Math.floor(minutes / 60) + " ч " : "") + minutes % 60 + " мин";
  }
  function renderSpin() {
    if (!spin) return;
    put("spin", '<strong class="summary-value">' + esc(spinText()) + '</strong><p class="summary-muted">' + (spin.canPlay ? 'Попыток доступно: ' + num(spin.attemptsLeft) : 'Таймер до следующей бесплатной попытки.') + '</p>' + link("Раздача дня", "daily-poker"));
    put("bonus", '<strong class="summary-value">' + num(spin.bonusBalance) + ' <small>бонусов</small></strong><p class="summary-muted">На билеты для бэкинга.</p>' + link("Обменять", "daily-poker"));
    friends();
  }
  function renderSchedule() {
    var slots = pokerCollectFullScheduleSlots(new Date()).filter(function (s) { return s.start.getTime() > Date.now(); }).sort(function (a,b) { return a.start - b.start; });
    var free = slots.find(function (s) { return /^0\s*(?:₽|руб\.?|р\.?)?$/i.test(String(s.item.buyin).trim()); });
    var chosen = slots.slice(0, 1); if (free && free !== chosen[0]) chosen.push(free);
    put("schedule", chosen.map(function (s) {
      var isFree = s === free;
      return '<div class="summary-event"><span class="summary-kicker">' + (isFree ? 'Бесплатный вход' : 'Ближайший турнир') + '</span><strong>' + esc(s.item.name) + '</strong><p>' + esc(dateLabel(s.start)) + '</p><p class="summary-muted">Вход: ' + esc(s.item.buyin) + (s.item.rebuy ? ' · Ребай: ' + esc(s.item.rebuy) : '') + '</p></div>';
    }).join("") + (!chosen.length ? '<p>В расписании пока нет ближайших турниров.</p>' : '') + link("Всё расписание", "schedule"));
  }
  function monthKey(date) { var m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(String(date)); return m ? m[3] + "-" + m[2] : ""; }
  function stamp(row) { return String(row.date || "").split(".").reverse().join("") + String(row.time || "00:00"); }
  function renderStats(stats) {
    var nowParts = new Intl.DateTimeFormat("en-CA", {timeZone:"Europe/Moscow",year:"numeric",month:"2-digit"}).formatToParts(new Date());
    var month = nowParts.find(function (p) {return p.type === "year";}).value + "-" + nowParts.find(function (p) {return p.type === "month";}).value;
    var rows = (stats.rows || []).filter(function (r) {return Number(r.reward) > 0;});
    var current = rows.filter(function (r) {return monthKey(r.date) === month;});
    var latest = rows.slice().sort(function (a,b) {return stamp(b).localeCompare(stamp(a));})[0];
    put("results", '<span class="summary-kicker">' + esc(new Intl.DateTimeFormat("ru-RU", {month:"long", timeZone:"Europe/Moscow"}).format(new Date())) + '</span><strong class="summary-value">' + num(current.reduce(function (sum,r) {return sum + Number(r.reward);},0)) + ' ₽</strong><p>Учтённые призовые · попаданий в призы: ' + current.length + '</p>' + (latest ? '<div class="summary-event"><span class="summary-kicker">Последнее призовое место · ' + esc(latest.date) + '</span><strong>' + esc(latest.tournamentLabel || latest.tournament || "Турнир") + '</strong><p>' + esc(latest.place) + '-е место · ' + num(latest.reward) + ' ₽</p></div>' : '<p class="summary-muted">Призовых результатов пока нет.</p>') + '<p class="summary-muted">По опубликованным результатам клуба. Это призовые, не чистая прибыль.</p>' + link("Мой профиль", "profile"));
    var heroes = window.POKER_CLUB_NEWS_DATA && window.POKER_CLUB_NEWS_DATA.dayHeroes;
    put("rival", '<p class="summary-muted">Данные гонки пока недоступны.</p>');
    if (heroes && typeof window.winterRatingSamePlayer === "function") {
      var leaders = [];
      Object.keys(heroes).forEach(function (date) {
        var hero = heroes[date]; if (monthKey(date) !== month || !hero || !hero.nick) return;
        var player = leaders.find(function (r) {return winterRatingSamePlayer(r.nick, hero.nick);});
        if (!player) {player = {nick:hero.nick, wins:0, reward:0};leaders.push(player);}
        player.wins++;player.reward += Math.max(0, Number(hero.reward) || 0);
      });
      leaders.sort(function (a,b) {return b.wins-a.wins || b.reward-a.reward || a.nick.localeCompare(b.nick, "ru");});
      var place = leaders.findIndex(function (r) {return winterRatingSamePlayer(r.nick, nickname);});
      var rivalIndex = place === 0 ? 1 : place > 0 ? place - 1 : leaders.length - 1;
      var rival = leaders[rivalIndex];
      var me = place >= 0 ? leaders[place] : { wins: 0, reward: 0 };
      var gap = rival ? Math.abs(rival.wins - me.wins) : 0;
      var rewardGap = rival ? Math.abs(rival.reward - me.reward) : 0;
      put("rival", '<span class="summary-kicker">Герой месяца · ' + esc(new Intl.DateTimeFormat("ru-RU", {month:"long",timeZone:"Europe/Moscow"}).format(new Date())) + '</span>' +
        (rival ? '<strong class="summary-value">' + esc(rival.nick) + '</strong><p>' + (rivalIndex + 1) + '-е место · герой дня: ' + rival.wins + '</p><p class="summary-muted">' +
          (place === 0 ? 'Ближайший преследователь. ' : 'Ближайший впереди. ') +
          (gap ? 'Разница: ' + gap + ' по числу званий.' : 'Званий поровну · разница призовых: ' + num(rewardGap) + ' ₽.') + '</p>' :
          '<strong class="summary-value">' + (place === 0 ? 'Вы лидируете' : 'Гонка ещё не началась') + '</strong><p class="summary-muted">Других участников пока нет.</p>') +
        '<p class="summary-muted">Вы: ' + (place >= 0 ? (place + 1) + '-е место · ' : '') + 'герой дня: ' + me.wins + '</p>' + link("Мой профиль", "profile"));
    }

  }
  function renderRaffles(data) {
    if (!Array.isArray(data.activeRaffles)) throw new Error("Raffle list unavailable");
    var active = data.activeRaffles;
    var mine = active.filter(function (r) {return (r.participants || []).some(function (p) {return account && String(p.accountId || p.userId) === account;});});
    var next = (mine.length ? mine : active).filter(function (r) {return isFinite(Date.parse(r.endDate));}).sort(function (a,b) {return Date.parse(a.endDate)-Date.parse(b.endDate);})[0];
    put("raffles", '<strong class="summary-value">' + (mine.length ? 'Вы участвуете: ' + mine.length : 'Активных розыгрышей: ' + active.length) + '</strong>' + (next ? '<p>' + esc(next.title || next.name || "Ближайший розыгрыш") + '</p><p class="summary-muted">' + esc(dateLabel(next.endDate)) + '</p>' : '<p class="summary-muted">Новые розыгрыши появятся здесь.</p>') + link("Участие и выигрыши", "raffles"));
  }
  function init() {
    root = document.getElementById("mySummaryContent"); if (!root || pending) return;
    friends();
    if (Date.now() - loadedAt < 30000) {renderSpin(); return;}
    var seq = ++generation; pending = true; account = "";
    var loading = '<p class="summary-muted" role="status">Загружаем…</p>';
    root.innerHTML = section("spin","Раздача дня",loading) + section("bonus","Мои бонусы",loading) + section("schedule","Ближайшие турниры",loading) + section("rival","Ближайший конкурент",loading) + section("results","Турнирные результаты",loading) + section("raffles","Розыгрыши",loading) + section("friends","Друзья",loading);
    friends();
    function valid() {return seq === generation;}
    var schedule = Promise.resolve().then(function () {return pokerEnsureScriptDomains(["tournament"]);}).then(function () {if(valid()) renderSchedule();}).catch(function () {if(valid()) error("schedule");});
    var authed = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
    if (!authed) {
      ["spin","bonus","rival","results","raffles"].forEach(function (id) {put(id, '<p class="summary-muted">Войдите, чтобы увидеть свои данные.</p>' + link("Открыть профиль", "profile"));});
      pending = false; return;
    }
    var daily = request("promo/daily-poker/status").then(function (d) {if (!valid()) return; if (typeof d.canPlay !== "boolean" || !Number.isFinite(Number(d.bonusBalance))) throw new Error("Invalid status"); spin = d; offset = Date.parse(d.serverTime) - Date.now(); if (!isFinite(offset)) offset = 0; renderSpin();}).catch(function () {if(valid()) {spin=null;error("spin");error("bonus");}});
    var profile = request("pokerplus-player", {}).then(function (d) {
      if (!valid()) return;
      account = String(d.accountId || ""); var p = d.profile || {}; nickname = p.nickname || p.Nike || p.nick || p.name || "";
      document.getElementById("mySummaryName").textContent = nickname ? nickname : "Всё главное для вас";
      if (d.linked && !nickname) throw new Error("Profile cache unavailable");
      if (!d.linked) { ["results","rival"].forEach(function (id) {put(id,'<p class="summary-muted">Привяжите Poker21 в профиле, чтобы увидеть результаты и прогресс.</p>' + link("Привязать Poker21", "profile"));}); return; }
      return Promise.resolve(pokerEnsureScriptDomains(["rating-common", "rating-winter", "rating-spring", "rating-summer"])).then(function () {return window.pokerGetTournamentAchievementStatsReady(nickname);}).then(function (stats) {if(valid()) renderStats(stats);});
    }).catch(function () {if(valid()) {error("results");error("rival");}});
    var raffles = profile.then(function () {if(!valid()) return; return requestRaffles();}).then(function (d) {if(valid() && d) renderRaffles(d);}).catch(function () {if(valid()) error("raffles");});
    Promise.allSettled([schedule,daily,profile,raffles]).then(function () {if(valid()) {pending=false;loadedAt=Date.now();}});
  }
  function requestRaffles() { return request("raffles").then(function (d) {return d;}); }
  window.initMySummary = init;
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-summary-refresh]")) {loadedAt=0;init();}
    if (e.target.closest("[data-summary-friends]") && typeof window.pokerOpenFriendNews === "function") window.pokerOpenFriendNews();
  });
  window.addEventListener("poker-friend-news-updated", friends);
  window.addEventListener("poker-telegram-auth", function () {generation++;pending=false;loadedAt=0;spin=null;account="";nickname="";var name=document.getElementById("mySummaryName");if(name)name.textContent="Всё главное для вас";if(root)root.innerHTML="";friends();if(document.querySelector('[data-view="my-summary"].view--active'))init();});
  setInterval(function () {if(document.hidden || !document.querySelector('[data-view="my-summary"].view--active'))return;if(spin && !spin.canPlay && Date.parse(spin.nextFreeAttemptAt)<=Date.now()+offset && Date.now()-loadedAt>30000){loadedAt=0;init();}else renderSpin();}, 30000);
})();
