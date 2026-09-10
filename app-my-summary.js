(function () {
  "use strict";
  var generation = 0, pending = false, loadedAt = 0, spin = null, offset = 0, nickname = "", account = "";
  var root;
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
  function num(n) { return Number(n).toLocaleString("ru-RU", {maximumFractionDigits: 0}); }
  function link(text, target) { return '<a href="#" class="summary-link" data-view-target="' + target + '">' + esc(text) + ' <span aria-hidden="true">→</span></a>'; }
  function section(id, title, body) { return '<section class="summary-card" aria-labelledby="summary-title-' + id + '"><h2 id="summary-title-' + id + '">' + title + '</h2><div id="summary-' + id + '">' + body + '</div></section>'; }
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
    put("friends", '<strong class="summary-value">' + (data && data.accountId ? (data.unread ? num(data.unread) + ' непрочитанных' : 'Вы всё прочитали') : 'События ваших друзей') + '</strong><p class="summary-muted">Призовые места, достижения и ваши совместные результаты.</p><button type="button" class="summary-link" data-summary-friends>Новости друзей →</button>');
    var home = document.getElementById("mySummaryHint");
    if (home) home.textContent = (spin ? spinText() : "Ваш прогресс и ближайшие события") + (data && data.unread ? " · Новости друзей: " + data.unread : "");
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
    put("bonus", '<strong class="summary-value">' + num(spin.bonusBalance) + ' <small>бонусов</small></strong><p class="summary-muted">Бонусы на билеты для бэкинга. Обмен — в «Раздаче дня».</p>' + link("Использовать бонусы", "daily-poker"));
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
      var competition = document.createElement("div");competition.className = "summary-event";
      competition.innerHTML = '<span class="summary-kicker">Герой месяца · текущая позиция</span><strong>' + (place >= 0 ? (place + 1) + '-е место · героем дня: ' + leaders[place].wins : 'Пока без звания героя дня в этом месяце') + '</strong><p class="summary-muted">По числу званий героя дня; при равенстве — по сумме призовых этих дней. Итоги ещё меняются.</p>';
      document.getElementById("summary-results").appendChild(competition);
    }
    var defs = [
      {id:"wins",name:"Король турниров",value:stats.firstPlaces,tiers:[1,15,50,100,250],unit:"побед"},
      {id:"hero",name:"Герой дня",value:(stats.dayHeroes || []).length,tiers:[1,5,15,30,100],unit:"раз"},
      {id:"million",name:"Миллионер клуба",value:stats.totalReward,tiers:[1000000,2000000,3000000,4000000,5000000],unit:"₽"}
    ];
    var hidden = []; try { hidden = JSON.parse(localStorage.getItem("my-summary-hidden:" + account) || "[]"); if (!Array.isArray(hidden)) hidden = []; } catch (_) {}
    put("achievements", '<p class="summary-muted">Выберите, какой прогресс держать перед глазами.</p><div class="summary-picks">' + defs.map(function (d) {return '<label><input type="checkbox" data-summary-pin="' + d.id + '"' + (hidden.indexOf(d.id) < 0 ? ' checked' : '') + '> ' + d.name + '</label>';}).join("") + '</div>' + defs.map(function (d) {
      var value = Number(d.value) || 0, next = d.tiers.find(function (n) {return n > value;});
      return '<div class="summary-event" data-summary-progress="' + d.id + '"' + (hidden.indexOf(d.id) >= 0 ? ' hidden' : '') + '><strong>' + d.name + '</strong><p>' + num(value) + (next ? ' / ' + num(next) : '') + ' ' + d.unit + '</p><progress max="' + (next || value || 1) + '" value="' + value + '"></progress><p class="summary-muted">' + (next ? 'До следующей ступени: ' + num(next - value) + ' ' + d.unit : 'Все ступени открыты') + '</p></div>';
    }).join("") + link("Все достижения", "profile"));
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
    root.innerHTML = section("spin","Раздача дня",loading) + section("bonus","Мои бонусы",loading) + section("schedule","Ближайшие турниры",loading) + section("achievements","Мой прогресс",loading) + section("results","Турнирные результаты",loading) + section("raffles","Розыгрыши",loading) + section("friends","Друзья",loading);
    friends();
    function valid() {return seq === generation;}
    var schedule = Promise.resolve().then(function () {return pokerEnsureScriptDomains(["tournament"]);}).then(function () {if(valid()) renderSchedule();}).catch(function () {if(valid()) error("schedule");});
    var authed = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
    if (!authed) {
      ["spin","bonus","achievements","results","raffles"].forEach(function (id) {put(id, '<p class="summary-muted">Войдите, чтобы увидеть свои данные.</p>' + link("Открыть профиль", "profile"));});
      pending = false; return;
    }
    var daily = request("promo/daily-poker/status").then(function (d) {if (!valid()) return; if (typeof d.canPlay !== "boolean" || !Number.isFinite(Number(d.bonusBalance))) throw new Error("Invalid status"); spin = d; offset = Date.parse(d.serverTime) - Date.now(); if (!isFinite(offset)) offset = 0; renderSpin();}).catch(function () {if(valid()) {spin=null;error("spin");error("bonus");}});
    var profile = request("pokerplus-player", {}).then(function (d) {
      if (!valid()) return;
      account = String(d.accountId || ""); var p = d.profile || {}; nickname = p.nickname || p.Nike || p.nick || p.name || "";
      document.getElementById("mySummaryName").textContent = nickname ? nickname + ", всё главное здесь" : "Всё главное для вас";
      if (d.linked && !nickname) throw new Error("Profile cache unavailable");
      if (!d.linked) { ["results","achievements"].forEach(function (id) {put(id,'<p class="summary-muted">Привяжите Poker21 в профиле, чтобы увидеть результаты и прогресс.</p>' + link("Привязать Poker21", "profile"));}); return; }
      return Promise.resolve(pokerEnsureScriptDomains(["rating-common", "rating-winter", "rating-spring", "rating-summer"])).then(function () {return window.pokerGetTournamentAchievementStatsReady(nickname);}).then(function (stats) {if(valid()) renderStats(stats);});
    }).catch(function () {if(valid()) {error("results");error("achievements");}});
    var raffles = profile.then(function () {if(!valid()) return; return requestRaffles();}).then(function (d) {if(valid() && d) renderRaffles(d);}).catch(function () {if(valid()) error("raffles");});
    Promise.allSettled([schedule,daily,profile,raffles]).then(function () {if(valid()) {pending=false;loadedAt=Date.now();}});
  }
  function requestRaffles() { return request("raffles").then(function (d) {return d;}); }
  window.initMySummary = init;
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-summary-refresh]")) {loadedAt=0;init();}
    if (e.target.closest("[data-summary-friends]") && typeof window.pokerOpenFriendNews === "function") window.pokerOpenFriendNews();
  });
  document.addEventListener("change", function (e) {
    if (!e.target.matches("[data-summary-pin]")) return;
    var hidden = [];
    root.querySelectorAll("[data-summary-pin]").forEach(function (input) {root.querySelector('[data-summary-progress="' + input.dataset.summaryPin + '"]').hidden = !input.checked; if(!input.checked) hidden.push(input.dataset.summaryPin);});
    if(account) try {localStorage.setItem("my-summary-hidden:" + account, JSON.stringify(hidden));} catch (_) {}
  });
  window.addEventListener("poker-friend-news-updated", friends);
  window.addEventListener("poker-telegram-auth", function () {generation++;pending=false;loadedAt=0;spin=null;account="";nickname="";var name=document.getElementById("mySummaryName");if(name)name.textContent="Всё главное для вас";if(root)root.innerHTML="";friends();if(document.querySelector('[data-view="my-summary"].view--active'))init();});
  setInterval(function () {if(document.hidden || !document.querySelector('[data-view="my-summary"].view--active'))return;if(spin && !spin.canPlay && Date.parse(spin.nextFreeAttemptAt)<=Date.now()+offset && Date.now()-loadedAt>30000){loadedAt=0;init();}else renderSpin();}, 30000);
})();
