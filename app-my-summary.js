(function () {
  "use strict";
  var generation = 0, pending = false, loadedAt = 0, spin = null, offset = 0, nickname = "", account = "";
  var root;
  var scheduleTab = "tournaments";
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
    put("spin", '<strong class="summary-value">' + esc(spinText()) + '</strong><p class="summary-muted">' + (spin.canPlay ? 'Попыток: ' + num(spin.attemptsLeft) : 'До бесплатной попытки.') + '</p>' + link("Раздача дня", "daily-poker"));
    put("bonus", '<strong class="summary-value">' + num(spin.bonusBalance) + ' <small>бонусов</small></strong><p class="summary-muted">На билеты для бэкинга.</p>' + link("Обменять", "daily-poker"));
    friends();
  }
  function renderSchedule() {
    var slots = pokerCollectFullScheduleSlots(new Date()).filter(function (s) { return s.start.getTime() > Date.now(); }).sort(function (a,b) { return a.start - b.start; });
    function isFree(s) { return /^0\s*(?:₽|руб\.?|р\.?)?$/i.test(String(s.item.buyin).trim()); }
    var freeTab = scheduleTab === "freerolls";
    var chosen = slots.filter(function (s) { return isFree(s) === freeTab; }).slice(0, 3);
    var tabs = '<div class="summary-schedule-tabs" role="tablist" aria-label="Ближайшие игры">' +
      [{id:"tournaments",label:"Ближайшие турниры"},{id:"freerolls",label:"Ближайшие фрироллы"}].map(function (tab) {
        return '<button type="button" role="tab" id="summary-tab-' + tab.id + '" aria-controls="summary-schedule-panel" aria-selected="' + (scheduleTab === tab.id) + '" data-summary-schedule-tab="' + tab.id + '">' + tab.label + '</button>';
      }).join("") + '</div>';
    put("schedule", tabs + '<div role="tabpanel" id="summary-schedule-panel" aria-labelledby="summary-tab-' + scheduleTab + '">' + chosen.map(function (s) {
      return '<div class="summary-event"><strong>' + esc(s.item.name) + '</strong><p>' + esc(dateLabel(s.start)) + '</p><p class="summary-muted">' + (freeTab ? 'Бесплатный вход' : 'Вход: ' + esc(s.item.buyin)) + (s.item.rebuy && s.item.rebuy !== "—" ? ' · Ребай: ' + esc(s.item.rebuy) : '') + '</p></div>';
    }).join("") + (!chosen.length ? '<p class="summary-muted">' + (freeTab ? 'Ближайших фрироллов пока нет.' : 'Ближайших турниров пока нет.') + '</p>' : '') + '</div>' + link("Всё расписание", "schedule"));
  }

  function monthKey(date) { var m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(String(date)); return m ? m[3] + "-" + m[2] : ""; }
  function stamp(row) { return String(row.date || "").split(".").reverse().join("") + String(row.time || "00:00"); }
  function achievementCompetitors() {
    if (typeof pokerRatingAchievementAllTournamentRows !== "function" || typeof winterRatingSamePlayer !== "function") return null;
    var players = [], byNick = new Map(), days = {};
    function player(nick) {
      if (byNick.has(nick)) return byNick.get(nick);
      var entry = players.find(function (p) { return winterRatingSamePlayer(p.nick, nick); });
      if (!entry) { entry = {nick:nick, wins:0, hero:0, million:0}; players.push(entry); }
      byNick.set(nick, entry); return entry;
    }
    pokerRatingAchievementAllTournamentRows().forEach(function (r) {
      if (!r || !r.nick) return;
      var p = player(r.nick), reward = Number(r.reward) || 0;
      if ((Number(r.points) || 0) !== 0 || reward !== 0 || Number(r.place) === 1) {
        if (Number(r.place) === 1) p.wins++;
        p.million += reward;
      }
      if (stamp(r).slice(0,8) < "20260101" || reward <= 0) return;
      var best = days[r.date];
      if (!best || reward > best.reward || (reward === best.reward && r.nick.localeCompare(best.nick, "ru") < 0)) days[r.date] = {nick:r.nick,reward:reward};
    });
    var heroes = window.POKER_CLUB_NEWS_DATA && window.POKER_CLUB_NEWS_DATA.dayHeroes;
    Object.keys(heroes || days).forEach(function (date) {
      var hero = (heroes || days)[date];
      if (stamp({date:date}).slice(0,8) < "20260101" || !hero || !hero.nick) return;
      player(hero.nick).hero++;
    });
    return players;
  }
  function achievementRival(def, value, players) {
    if (!players) return '<p class="summary-muted">Данные соперников пока недоступны.</p>';
    var others = players.filter(function (p) { return !winterRatingSamePlayer(p.nick, nickname) && p[def.id] > 0; });
    others.sort(function (a,b) { return b[def.id] - a[def.id] || a.nick.localeCompare(b.nick, "ru"); });
    var ahead = others.filter(function (p) { return p[def.id] > value; });
    var rival = ahead.length ? ahead[ahead.length - 1] : others[0];
    if (!rival) return '<p class="summary-muted">Других участников в этой ачивке пока нет.</p>';
    var gap = Math.abs(rival[def.id] - value);
    return '<p class="summary-achievement-rival"><span class="summary-muted">' +
      (ahead.length ? 'Ближайший впереди: ' : gap === 0 ? 'Делите первое место: ' : 'Вы на первом месте · второй: ') +
      '</span><strong>' + esc(rival.nick) + '</strong> — ' + num(rival[def.id]) + ' ' + def.unit +
      '</p><p class="summary-muted">' + (gap === 0 ? 'Результаты равны.' : (ahead.length ? 'До соперника: ' : 'Ваш отрыв: ') + num(gap) + ' ' + def.unit + '.') + '</p>';
  }
  function renderStats(stats) {
    var nowParts = new Intl.DateTimeFormat("en-CA", {timeZone:"Europe/Moscow",year:"numeric",month:"2-digit"}).formatToParts(new Date());
    var month = nowParts.find(function (p) {return p.type === "year";}).value + "-" + nowParts.find(function (p) {return p.type === "month";}).value;
    var rows = (stats.rows || []).filter(function (r) {return Number(r.reward) > 0;});
    var current = rows.filter(function (r) {return monthKey(r.date) === month;});
    var latest = rows.slice().sort(function (a,b) {return stamp(b).localeCompare(stamp(a));})[0];
    put("results", '<span class="summary-kicker">' + esc(new Intl.DateTimeFormat("ru-RU", {month:"long", timeZone:"Europe/Moscow"}).format(new Date())) + '</span><strong class="summary-value">' + num(current.reduce(function (sum,r) {return sum + Number(r.reward);},0)) + ' ₽</strong><p>Учтённые призовые · попаданий в призы: ' + current.length + '</p>' + (latest ? '<div class="summary-event"><span class="summary-kicker">Последнее призовое место · ' + esc(latest.date) + '</span><strong>' + esc(latest.tournamentLabel || latest.tournament || "Турнир") + '</strong><p>' + esc(latest.place) + '-е место · ' + num(latest.reward) + ' ₽</p></div>' : '<p class="summary-muted">Призовых результатов пока нет.</p>') + '<p class="summary-muted">По опубликованным результатам клуба. Это призовые, не чистая прибыль.</p>' + link("Мой профиль", "profile"));
    var defs = [
      {id:"wins",name:"Король турниров",value:stats.firstPlaces,tiers:[1,15,50,100,250],unit:"побед"},
      {id:"hero",name:"Герой дня",value:(stats.dayHeroes || []).length,tiers:[1,5,15,30,100],unit:"раз"},
      {id:"million",name:"Миллионер клуба",value:stats.totalReward,tiers:[1000000,2000000,3000000,4000000,5000000],unit:"₽"}
    ];
    var competitors = achievementCompetitors();
    var hidden = []; try { hidden = JSON.parse(localStorage.getItem("my-summary-hidden:" + account) || "[]"); if (!Array.isArray(hidden)) hidden = []; } catch (_) {}
    put("achievements", '<details class="summary-achievement-picker"><summary>Выбрать ачивки для отслеживания</summary><p class="summary-muted">Отметьте нужные ачивки — они появятся ниже.</p><div class="summary-picks">' + defs.map(function (d) {return '<label><input type="checkbox" data-summary-pin="' + d.id + '"' + (hidden.indexOf(d.id) < 0 ? ' checked' : '') + '> ' + d.name + '</label>';}).join("") + '</div><p class="summary-muted" data-summary-catalog-status>Загружаем остальные ачивки…</p></details>' + defs.map(function (d) {
      var value = Number(d.value) || 0, next = d.tiers.find(function (n) {return n > value;});
      return '<div class="summary-event" data-summary-progress="' + d.id + '"' + (hidden.indexOf(d.id) >= 0 ? ' hidden' : '') + '><strong>' + d.name + '</strong><p>' + num(value) + (next ? ' / ' + num(next) : '') + ' ' + d.unit + '</p><progress max="' + (next || value || 1) + '" value="' + value + '"></progress><p class="summary-muted">' + (next ? 'До следующей ступени: ' + num(next - value) + ' ' + d.unit : 'Все ступени открыты') + '</p>' + achievementRival(d, value, competitors) + '</div>';
    }).join("") + '<div id="summary-extra-achievements"></div>' + link("Все достижения", "profile") + '<div class="summary-event"><h3 class="summary-rival-heading">Ближайший конкурент</h3><div id="summary-rival"></div></div>');
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
  async function loadAchievementCatalog(profileData, valid) {
    try {
      await window.pokerEnsureLazyDomains(["chat"], {styles:true,scripts:true});
      await window.pokerEnsureGlobalModalsHtml();
      if (!valid()) return;
      if (!window.pokerEnsureChatUserModalReady()) throw new Error("Profile achievements unavailable");
      var catalog = await window.pokerBuildProfileAchievements({ratingNick:nickname,userId:account,profileData:profileData,isSelfProfile:true});
      if (!valid()) return;
      var holder = document.createElement("div"); holder.innerHTML = catalog.achievementsHtml;
      var picks = root.querySelector(".summary-picks"), extra = document.getElementById("summary-extra-achievements");
      if (!picks || !extra) return;
      var selected = [];
      try { selected = JSON.parse(localStorage.getItem("my-summary-extra:" + account) || "[]"); if (!Array.isArray(selected)) selected = []; } catch (_) {}
      var seen = new Set(["Король турниров","Герой дня","Миллионер клуба"]);
      function decode(card, key) {
        var text = card.getAttribute("data-chat-achievement-" + key) || "";
        try { return decodeURIComponent(text); } catch (_) { return text; }
      }
      holder.querySelectorAll("[data-chat-achievement-title]").forEach(function (card) {
        var title = decode(card, "title");
        if (!title || seen.has(title)) return;
        seen.add(title);
        var id = "catalog-" + encodeURIComponent(title), checked = selected.indexOf(id) >= 0;
        var label = document.createElement("label"), checkbox = document.createElement("input");
        checkbox.type = "checkbox"; checkbox.dataset.summaryPin = id; checkbox.checked = checked;
        label.append(checkbox, document.createTextNode(" " + title)); picks.appendChild(label);
        var section = document.createElement("div"); section.className = "summary-event"; section.dataset.summaryProgress = id; section.hidden = !checked;
        var heading = document.createElement("strong"); heading.textContent = title; section.appendChild(heading);
        var progress = document.createElement("p"); progress.className = "summary-catalog-progress";
        progress.textContent = decode(card, "progress") || decode(card, "state"); section.appendChild(progress);
        var button = document.createElement("button"); button.type = "button"; button.className = "summary-link"; button.textContent = "Подробнее →";
        Array.from(card.attributes).forEach(function (attr) { if (attr.name.indexOf("data-chat-achievement-") === 0) button.setAttribute(attr.name, attr.value); });
        section.appendChild(button); extra.appendChild(section);
      });
      var status = root.querySelector("[data-summary-catalog-status]"); if (status) status.remove();
    } catch (_) {
      if (!valid()) return;
      var status = root.querySelector("[data-summary-catalog-status]");
      if (status) status.textContent = "Не удалось загрузить весь список. Обновите сводку, чтобы повторить.";
    }
  }
  function renderRaffles(data) {
    if (!Array.isArray(data.activeRaffles)) throw new Error("Raffle list unavailable");
    var active = data.activeRaffles;
    var mine = active.filter(function (r) {return (r.participants || []).some(function (p) {return account && String(p.accountId || p.userId) === account;});});
    var next = (mine.length ? mine : active).filter(function (r) {return isFinite(Date.parse(r.endDate));}).sort(function (a,b) {return Date.parse(a.endDate)-Date.parse(b.endDate);})[0];
    put("raffles", '<strong class="summary-value">' + (mine.length ? 'Вы участвуете: ' + mine.length : 'Активных: ' + active.length) + '</strong>' + (next ? '<p>' + esc(next.title || next.name || "Ближайший розыгрыш") + '</p><p class="summary-muted">' + esc(dateLabel(next.endDate)) + '</p>' : '<p class="summary-muted">Новые розыгрыши появятся здесь.</p>') + link("Открыть", "raffles"));
  }
  function init() {
    root = document.getElementById("mySummaryContent"); if (!root || pending) return;
    friends();
    if (Date.now() - loadedAt < 30000) {renderSpin(); return;}
    var seq = ++generation; pending = true; account = "";
    var loading = '<p class="summary-muted" role="status">Загружаем…</p>';
    root.innerHTML = section("spin","Крутка",loading) + section("bonus","Бонусы",loading) + section("raffles","Розыгрыши",loading) + section("friends","Новости друзей",loading) + section("schedule","Расписание",loading) + section("achievements","Мой прогресс",loading) + section("results","Турнирные результаты",loading) + section("reviews","Мои разборы",loading);
    friends();
    function valid() {return seq === generation;}
    var schedule = Promise.resolve().then(function () {return pokerEnsureScriptDomains(["tournament"]);}).then(function () {if(valid()) renderSchedule();}).catch(function () {if(valid()) error("schedule");});
    var authed = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
    if (!authed) {
      ["spin","bonus","achievements","results","raffles","reviews"].forEach(function (id) {put(id, '<p class="summary-muted">Войдите, чтобы увидеть свои данные.</p>' + link("Открыть профиль", "profile"));});
      pending = false; return;
    }
    var reviews = request("club-reviews", {action:"summary"}).then(function(d) {
      if(!valid())return;
      var fresh=(d.threads || []).filter(function(t){return t.unread;});
      put("reviews", '<strong class="summary-value">' + (fresh.length ? 'Есть новые ответы' : 'Вопросы и обсуждения') + '</strong>' + fresh.slice(0,3).map(function(t){return '<p><button type="button" class="summary-link" data-summary-review="'+esc(t.id)+'">'+esc(t.title)+' →</button></p>';}).join('') + link("Мои разборы", "club-reviews"));
    }).catch(function(){if(valid())error("reviews");});
    var daily = request("promo/daily-poker/status").then(function (d) {if (!valid()) return; if (typeof d.canPlay !== "boolean" || !Number.isFinite(Number(d.bonusBalance))) throw new Error("Invalid status"); spin = d; offset = Date.parse(d.serverTime) - Date.now(); if (!isFinite(offset)) offset = 0; renderSpin();}).catch(function () {if(valid()) {spin=null;error("spin");error("bonus");}});
    var profile = request("pokerplus-player", {}).then(function (d) {
      if (!valid()) return;
      account = String(d.accountId || ""); var p = d.profile || {}; nickname = p.nickname || p.Nike || p.nick || p.name || "";
      document.getElementById("mySummaryName").textContent = nickname ? nickname : "Всё главное для вас";
      if(['ID400800','ID403173','ID495718'].includes(account)) {
        var heroCard=document.createElement('section');heroCard.id='summary-hero';heroCard.className='summary-card';heroCard.innerHTML='<h3>Мой герой</h3><p>Вещи, кубки и образы ПокерМанки</p><button type="button" class="summary-link" data-profile-hero-open>Открыть коллекцию →</button>';root.prepend(heroCard);
        request('profile-hero',{action:'get'}).then(function(h){if(valid()&&h.hero){var model=window.POKER_HERO_CATALOG&&window.POKER_HERO_CATALOG.model(h.hero.goal);heroCard.querySelector('p').textContent=h.hero.pendingChoice?'Продолжите выбор одной из трёх вещей':model?'Цель: '+model.name+' · '+h.hero.dust+'/'+model.cost+' оск.':h.hero.chests+' наград за уровни'+(h.hero.adventureAvailable?' · подарок доступен':'');}}).catch(function(){});
      }
      if (d.linked && !nickname) throw new Error("Profile cache unavailable");
      if (!d.linked) { ["results","achievements"].forEach(function (id) {put(id,'<p class="summary-muted">Привяжите Poker21 в профиле, чтобы увидеть результаты и прогресс.</p>' + link("Привязать Poker21", "profile"));}); return; }
      return Promise.resolve(pokerEnsureScriptDomains(["rating-common", "rating-winter", "rating-spring", "rating-summer"])).then(function () {return window.pokerGetTournamentAchievementStatsReady(nickname);}).then(function (stats) {if(valid()) {renderStats(stats);return loadAchievementCatalog(Object.assign({},p,{accountId:account}),valid);}});
    }).catch(function () {if(valid()) {error("results");error("achievements");}});
    var raffles = profile.then(function () {if(!valid()) return; return requestRaffles();}).then(function (d) {if(valid() && d) renderRaffles(d);}).catch(function () {if(valid()) error("raffles");});
    Promise.allSettled([schedule,daily,profile,raffles,reviews]).then(function () {if(valid()) {pending=false;loadedAt=Date.now();}});
  }
  function requestRaffles() { return request("raffles").then(function (d) {return d;}); }
  window.initMySummary = init;
  document.addEventListener("click", function (e) {
    var tab = e.target.closest("[data-summary-schedule-tab]");
    if (tab) { scheduleTab = tab.dataset.summaryScheduleTab === "freerolls" ? "freerolls" : "tournaments"; renderSchedule(); document.getElementById("summary-tab-" + scheduleTab).focus(); }
    var target=e.target.closest('[data-view="my-summary"] [data-view-target]');
    if(target&&typeof window.pokerTrackEngagement==='function')window.pokerTrackEngagement('summary_action',{target:target.getAttribute('data-view-target'),source:'my-summary'});
    var review=e.target.closest("[data-summary-review]");
    if(review&&typeof window.pokerTrackEngagement==='function')window.pokerTrackEngagement('summary_action',{target:'club-reviews',source:'my-summary'});
    if(e.target.closest('[data-summary-friends]')&&typeof window.pokerTrackEngagement==='function')window.pokerTrackEngagement('summary_action',{target:'friend-news',source:'my-summary'});
    if(review && typeof window.pokerOpenClubReview === "function")window.pokerOpenClubReview(review.dataset.summaryReview);
    if (e.target.closest("[data-summary-refresh]")) {loadedAt=0;init();}
    if (e.target.closest("[data-summary-friends]") && typeof window.pokerOpenFriendNews === "function") window.pokerOpenFriendNews();
  }, true);
  document.addEventListener("change", function (e) {
    if (!e.target.matches("[data-summary-pin]")) return;
    var hidden = [];
    root.querySelectorAll("[data-summary-pin]").forEach(function (input) {root.querySelector('[data-summary-progress="' + input.dataset.summaryPin + '"]').hidden = !input.checked; if(!input.checked) hidden.push(input.dataset.summaryPin);});
    if(account) try {
      localStorage.setItem("my-summary-hidden:" + account, JSON.stringify(hidden));
      var selected = Array.from(root.querySelectorAll('[data-summary-pin]:checked')).map(function (input) { return input.dataset.summaryPin; }).filter(function (id) { return id.indexOf("catalog-") === 0; });
      localStorage.setItem("my-summary-extra:" + account, JSON.stringify(selected));
    } catch (_) {}
  });
  window.addEventListener("poker-friend-news-updated", friends);
  window.addEventListener("poker-reviews-updated", function(){loadedAt=0;});
  window.addEventListener("poker-telegram-auth", function () {generation++;pending=false;loadedAt=0;spin=null;account="";nickname="";var name=document.getElementById("mySummaryName");if(name)name.textContent="Всё главное для вас";if(root)root.innerHTML="";friends();if(document.querySelector('[data-view="my-summary"].view--active'))init();});
  setInterval(function () {if(document.hidden || !document.querySelector('[data-view="my-summary"].view--active'))return;if(spin && !spin.canPlay && Date.parse(spin.nextFreeAttemptAt)<=Date.now()+offset && Date.now()-loadedAt>30000){loadedAt=0;init();}else renderSpin();}, 30000);
})();
