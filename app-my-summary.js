(function () {
  "use strict";
  var generation = 0, pending = false, loadedAt = 0, spin = null, offset = 0, nickname = "", account = "";
  var root;
  var chartHistory = null, chartSeen = {}, chartCheckPending = false;
  function chartFingerprint(row) {
    var text = JSON.stringify(row), hash = 2166136261;
    for(var i=0;i<text.length;i++)hash=Math.imul(hash^text.charCodeAt(i),16777619);
    return (hash>>>0).toString(36);
  }
  function renderChartUnread() {
    var unread = !!(chartHistory && (chartHistory.rows || []).some(function(row) {return chartSeen[row.handId] !== chartFingerprint(row);}));
    try {
      var auth = typeof pokerApiAuthJsonBody === 'function' ? pokerApiAuthJsonBody({}) : {};
      var identity = auth.pwaSession || auth.pwaVkSession || auth.initData;
      if(identity){
        var key='poker-chart-unread:'+chartFingerprint({identity:identity});
        if(chartHistory)localStorage.setItem(key,unread?'1':'0');
        else unread=localStorage.getItem(key)==='1';
      }
    } catch (_) {}
    document.querySelectorAll('#mySummaryBadge,[data-chart-unread]').forEach(function(badge) {
      badge.hidden = !unread; badge.textContent = ''; badge.classList.add('chart-unread-dot');
      badge.setAttribute('aria-label', 'Есть непросмотренный график');
    });
  }
  function acceptChartHistory(data) {
    chartHistory = data; chartSeen = {};
    try {chartSeen = JSON.parse(localStorage.getItem('poker-chart-seen:' + data.playerId) || '{}') || {};} catch (_) {}
    renderChartUnread();
  }
  async function checkChartUnread() {
    if (chartCheckPending || document.hidden) return;
    chartCheckPending = true;
    var seq = generation;
    try {
      if(!chartHistory){
        var initial = await request('starting-hands', {action:'list'});
        if(seq===generation)acceptChartHistory(initial);
        return;
      }
      var latest = await request('starting-hands', {action:'version'});
      if (seq !== generation) return;
      if (!chartHistory || chartHistory.playerId !== latest.playerId || chartHistory.version !== latest.version) {
        var data = await request('starting-hands', {action:'list'});
        if (seq === generation) acceptChartHistory(data);
      }
    } catch (_) {} finally {chartCheckPending = false;}
  }
  var scheduleTab = "tournaments", summaryTab = "play";
  function applySummaryTab() {
    var groups = {play:["starting-hands","reviews-entry","bonus","friends"],progress:["results","rival","achievements","hero"],schedule:["schedule"]};
    document.querySelectorAll('[data-summary-tab]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.summaryTab===summaryTab));});
    if(root)root.querySelectorAll(':scope > .summary-card').forEach(function(card){
      var id=card.id==='summary-hero'?'hero':Array.from(card.classList).find(function(c){return c.indexOf('summary-card--')===0;});
      if(id&&id!=='hero')id=id.slice('summary-card--'.length);
      card.hidden=groups[summaryTab].indexOf(id)<0;
      makeCardAction(card);
    });
  }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
  function num(n) { return Number(n).toLocaleString("ru-RU", {maximumFractionDigits: 0}); }
  function link(text, target) { return '<a href="#" class="summary-link" data-view-target="' + target + '">' + esc(text) + ' <span aria-hidden="true">→</span></a>'; }
  function section(id, title, body) {
    var arts = {spin:"summer-rating-player-prushnik.webp", "starting-hands":"summary-starting-cards-v1.webp", "reviews-entry":"summary-reviews-discussion-v1.webp"};
    var icons = {
      bonus:'<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v5c0 4 16 4 16 0V6M4 11v5c0 4 16 4 16 0v-5"/>',
      raffles:'<path d="M7 3h10v7a5 5 0 0 1-10 0zM7 5H3v3a4 4 0 0 0 4 4m10-7h4v3a4 4 0 0 1-4 4M12 15v5m-5 1h10"/>',
      friends:'<circle cx="9" cy="7" r="3"/><path d="M2 21v-3a7 7 0 0 1 14 0v3M16 4a3 3 0 0 1 0 6m3 3a5 5 0 0 1 3 5v3"/>',
      schedule:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 2v6m10-6v6M3 11h18m-13 5h3"/>'
    };
    var art = arts[id] ? '<img class="summary-art summary-art--' + id + '" src="./assets/' + arts[id] + '" alt="" aria-hidden="true" decoding="async">' : '';
    var icon = icons[id] ? '<span class="summary-card-icon" aria-hidden="true">' + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + icons[id] + '</svg></span>' : '';
    return '<section class="summary-card summary-card--' + id + '" aria-labelledby="summary-title-' + id + '">' + art + icon + '<h2 id="summary-title-' + id + '">' + title + '</h2><div id="summary-' + id + '">' + body + '</div></section>';
  }
  function makeCardAction(card) {
    if (!card || !card.matches(':is(.summary-card--starting-hands,.summary-card--reviews-entry,.summary-card--spin,.summary-card--bonus,.summary-card--raffles,.summary-card--friends)')) return;
    var action = card.querySelector(':scope > div > .summary-link:last-child');
    if (!action) return;
    var previous = card.querySelector(':scope > .summary-card-action');
    if (previous) previous.remove();
    action.setAttribute('aria-label', card.querySelector('h2').textContent + ': ' + action.textContent.replace('→', '').trim());
    action.classList.remove('summary-link');
    action.classList.add('summary-card-action');
    action.replaceChildren();
    card.appendChild(action);
    card.classList.add('summary-card--actionable');
  }
  function put(id, html) {
    var el = document.getElementById("summary-" + id);
    if (el) {
      el.innerHTML = html;
      var card = el.closest && el.closest('.summary-card');
      if (card) {
        var previous = card.querySelector(':scope > .summary-card-action');
        if (previous) previous.remove();
        card.classList.remove('summary-card--actionable');
        makeCardAction(card);
      }
    }
  }
  function dateLabel(d) { return new Intl.DateTimeFormat("ru-RU", {timeZone:"Europe/Moscow", day:"numeric", month:"short", hour:"2-digit",minute:"2-digit"}).format(new Date(d)) + " мск"; }
  function request(path, body) {
    var controller = new AbortController(), timeout = setTimeout(function () { controller.abort(); }, 12000);
    var opts = {cache:"no-store", signal:controller.signal};
    if (body) { opts.method = "POST"; opts.headers = {"Content-Type":"application/json"}; opts.body = JSON.stringify(pokerApiAuthJsonBody(body)); }
    else path += pokerApiAuthQuery("?") + (path === "raffles" ? "&scope=active" : "");
    return fetch(getApiBase() + "/api/" + path, opts).then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); }).then(function (d) { if (d.ok === false) throw new Error("API"); return d; }).finally(function () { clearTimeout(timeout); });
  }
  function error(id) { put(id, '<p class="summary-muted">Не удалось загрузить. Попробуйте обновить сводку.</p>'); }
  function renderReviewUnread(count) {
    var badge = root && root.querySelector("[data-summary-review-unread]");
    if (!badge) return;
    count = Math.max(0, Number(count) || 0);
    badge.hidden = count === 0;
    badge.textContent = count > 99 ? "99+" : String(count);
    badge.setAttribute("aria-label", "Непросмотренных тем: " + count);
  }
  var reviewUnreadRequest = 0;
  function loadReviewUnread(valid) {
    var seq = generation, requestId = ++reviewUnreadRequest;
    return request("club-reviews", {action:"summary"}).then(function (d) {
      if (seq !== generation || requestId !== reviewUnreadRequest || (valid && !valid())) return;
      renderReviewUnread((d.threads || []).filter(function (thread) {return thread && thread.unread;}).length);
    }).catch(function () { /* Keep the last confirmed count on a network error. */ });
  }
  function friends() {
    var data = typeof window.pokerGetFriendNewsSummary === "function" ? window.pokerGetFriendNewsSummary() : null;
    put("friends", '<strong class="summary-value">' + (data && data.accountId && data.ready !== false ? (data.unread ? num(data.unread) + ' непрочитанных' : 'Вы всё прочитали') : 'События ваших друзей') + '</strong><p class="summary-muted">Результаты и события друзей.</p><button type="button" class="summary-link" data-summary-friends>Новости друзей →</button>');
    var badge = document.getElementById("mySummaryBadge");
    if (badge) {
      renderChartUnread();
    }
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
    put("bonus", '<strong class="summary-value">' + num(spin.bonusBalance) + '</strong><p class="summary-spin-status" role="status">' + esc(spinText()) + '</p>' + link("Бонусы и крутка", "daily-poker"));
    friends();
  }
  function renderSchedule() {
    var slots = pokerCollectFullScheduleSlots(new Date()).filter(function (s) { return s.start.getTime() > Date.now(); }).sort(function (a,b) { return a.start - b.start; });
    function isFree(s) { return /^0\s*(?:₽|руб\.?|р\.?)?$/i.test(String(s.item.buyin).trim()); }
    var freeTab = scheduleTab === "freerolls";
    var chosen = slots.filter(function (s) { return isFree(s) === freeTab; }).slice(0, 3);
    var tabs = '<div class="summary-schedule-tabs" role="tablist" aria-label="Ближайшие игры">' +
      [{id:"tournaments",label:"Турниры"},{id:"freerolls",label:"Фрироллы"}].map(function (tab) {
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
  function achievementPlace(def, value, players) {
    if (!players) return '<p class="summary-muted">Текущее место: данные пока недоступны.</p>';
    if (value <= 0) return '<p class="summary-muted">Текущее место: пока вне рейтинга.</p>';
    var others = players.filter(function (p) { return !winterRatingSamePlayer(p.nick, nickname); });
    var place = 1 + others.filter(function (p) { return p[def.id] > value; }).length;
    var tied = others.some(function (p) { return p[def.id] === value; });
    return '<p class="summary-achievement-place">Текущее место: <b>' + num(place) + '</b>' + (tied ? ' · делите с другими игроками' : '') + '</p>';
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
  async function shareResults(button) {
    if (button.dataset.busy) return;
    button.dataset.busy = "1";
    var url = "";
    try {
      if (document.fonts) await document.fonts.ready;
      var card = button.closest(".summary-card"), rect = card.getBoundingClientRect();
      var width = Math.ceil(rect.width), height = Math.ceil(rect.height), clone = card.cloneNode(true);
      var originals = [card].concat(Array.from(card.querySelectorAll("*")));
      var copies = [clone].concat(Array.from(clone.querySelectorAll("*")));
      originals.forEach(function (original, i) {
        var style = getComputedStyle(original), copy = copies[i];
        Array.from(style).forEach(function (key) { copy.style.setProperty(key, style.getPropertyValue(key)); });
        Array.from(copy.style).forEach(function (key) { if (/^(inset|margin|padding)-(inline|block)/.test(key)) copy.style.removeProperty(key); });
        copy.style.animation = "none"; copy.style.transition = "none";
      });
      clone.querySelectorAll("button, a, [role=button]").forEach(function (control) { control.remove(); });
      var lastContent = Array.from(card.children).filter(function (child) { return !child.matches("button, a, [role=button]"); }).pop();
      if (lastContent) {
        var cardStyle = getComputedStyle(card);
        height = Math.ceil(lastContent.getBoundingClientRect().bottom - rect.top + parseFloat(cardStyle.paddingBottom || 0) + parseFloat(cardStyle.borderBottomWidth || 0));
      }
      clone.style.minHeight = "0";
      clone.style.margin = "0"; clone.style.width = width + "px"; clone.style.height = height + "px";
      clone.style.position = "relative"; clone.style.inset = "auto"; clone.style.transform = "none";
      button.disabled = true;
      async function embed(url) {
        var response = await fetch(url); if (!response.ok) throw new Error("font");
        var blob = await response.blob();
        return new Promise(function (resolve, reject) { var reader = new FileReader(); reader.onload = function () {resolve(reader.result);}; reader.onerror = reject; reader.readAsDataURL(blob); });
      }
      var fontCss = "";
      async function fonts(rules, base) {
        for (var rule of Array.from(rules)) {
          if (rule.type === 5) {
            var css = rule.cssText, matches = Array.from(css.matchAll(/url\(["']?([^"')]+)["']?\)/g));
            for (var match of matches) css = css.replace(match[0], 'url("' + await embed(new URL(match[1], base || location.href).href) + '")');
            fontCss += css;
          } else if (rule.cssRules) await fonts(rule.cssRules, base);
        }
      }
      for (var sheet of Array.from(document.styleSheets)) {
        var rules; try {rules = sheet.cssRules;} catch (_) {continue;}
        await fonts(rules, sheet.href);
      }
      var wrapper = document.createElement("div"); wrapper.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
      wrapper.style.cssText = "width:" + width + "px;height:" + height + "px;background:#090d10";
      var fontStyle = document.createElement("style"); fontStyle.textContent = fontCss; wrapper.append(fontStyle, clone);
      var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '"><foreignObject width="100%" height="100%">' + new XMLSerializer().serializeToString(wrapper) + '</foreignObject></svg>';
      var image = new Image(); await new Promise(function (resolve, reject) {image.onload=resolve;image.onerror=reject;image.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg);});
      var canvas = document.createElement("canvas"); canvas.width=width*2;canvas.height=height*2;
      var ctx=canvas.getContext("2d");ctx.scale(2,2);ctx.drawImage(image,0,0);
      var png=await new Promise(function(resolve){canvas.toBlob(resolve,"image/png");});if(!png)throw new Error("png");
      var file=new File([png],"poker21-tournament-results.png",{type:"image/png"});url=URL.createObjectURL(png);
      var dialog=document.createElement("dialog");dialog.className="summary-share-preview";
      dialog.innerHTML='<button type="button" data-close>Закрыть ×</button><img alt="Турнирные результаты — копия блока"><div><button type="button" data-send>Поделиться картинкой</button> <a data-save download="poker21-tournament-results.png">Скачать PNG</a></div><p role="status"></p>';
      dialog.querySelector("img").src=url;dialog.querySelector("[data-save]").href=url;
      dialog.querySelector("[data-close]").onclick=function(){dialog.close();};
      var canShare=!!(navigator.share&&navigator.canShare&&navigator.canShare({files:[file]}));
      dialog.querySelector("[data-send]").hidden=!canShare;
      dialog.querySelector("[data-send]").onclick=async function(){try{await navigator.share({files:[file]});}catch(error){if(error.name!=="AbortError")dialog.querySelector("p").textContent="Не удалось отправить. Скачайте PNG и прикрепите его к сообщению.";}};
      if(!canShare)dialog.querySelector("p").textContent="Скачайте картинку и прикрепите её к сообщению. На iPhone можно зажать изображение и сохранить в Фото.";
      var savedUrl=url;dialog.addEventListener("close",function(){URL.revokeObjectURL(savedUrl);dialog.remove();},{once:true});
      document.body.appendChild(dialog);dialog.showModal();url="";
    } catch (_) {
      if(url)URL.revokeObjectURL(url);
      window.alert("Не удалось подготовить картинку. Попробуйте ещё раз.");
    } finally {button.disabled=false;delete button.dataset.busy;}
  }
  function renderStats(stats) {
    var nowParts = new Intl.DateTimeFormat("en-CA", {timeZone:"Europe/Moscow",year:"numeric",month:"2-digit"}).formatToParts(new Date());
    var month = nowParts.find(function (p) {return p.type === "year";}).value + "-" + nowParts.find(function (p) {return p.type === "month";}).value;
    var rows = (stats.rows || []).filter(function (r) {return Number(r.reward) > 0;});
    var current = rows.filter(function (r) {return monthKey(r.date) === month;});
    var latest = rows.slice().sort(function (a,b) {return stamp(b).localeCompare(stamp(a));})[0];
    put("results", '<span class="summary-kicker">' + esc(new Intl.DateTimeFormat("ru-RU", {month:"long", timeZone:"Europe/Moscow"}).format(new Date())) + '</span><strong class="summary-value">' + num(current.reduce(function (sum,r) {return sum + Number(r.reward);},0)) + ' ₽</strong><p>Учтённые призовые · попаданий в призы: ' + current.length + '</p>' + (latest ? '<div class="summary-event"><span class="summary-kicker">Последнее призовое место · ' + esc(latest.date) + '</span><strong>' + esc(latest.tournamentLabel || latest.tournament || "Турнир") + '</strong><p>' + esc(latest.place) + '-е место · ' + num(latest.reward) + ' ₽</p></div>' : '<p class="summary-muted">Призовых результатов пока нет.</p>') + '<p class="summary-muted">По опубликованным результатам клуба. Это призовые, не чистая прибыль.</p>' + link("Мой профиль", "profile") + ' <button type="button" class="summary-link" data-summary-share-results>Поделиться ↗</button>');
    var defs = [
      {id:"wins",name:"Король турниров",value:stats.firstPlaces,tiers:[1,15,50,100,250],unit:"побед"},
      {id:"hero",name:"Герой дня",value:(stats.dayHeroes || []).length,tiers:[1,5,15,30,100],unit:"раз"},
      {id:"million",name:"Миллионер клуба",value:stats.totalReward,tiers:[1000000,2000000,3000000,4000000,5000000],unit:"₽"}
    ];
    var competitors = achievementCompetitors();
    var hidden = []; try { hidden = JSON.parse(localStorage.getItem("my-summary-hidden:" + account) || "[]"); if (!Array.isArray(hidden)) hidden = []; } catch (_) {}
    put("achievements", '<details class="summary-achievement-picker"><summary>Выбрать ачивки для отслеживания</summary><p class="summary-muted">Отметьте нужные ачивки — они появятся ниже.</p><div class="summary-picks">' + defs.map(function (d) {return '<label><input type="checkbox" data-summary-pin="' + d.id + '"' + (hidden.indexOf(d.id) < 0 ? ' checked' : '') + '> ' + d.name + '</label>';}).join("") + '</div><p class="summary-muted" data-summary-catalog-status>Загружаем остальные ачивки…</p></details>' + defs.map(function (d) {
      var value = Number(d.value) || 0, next = d.tiers.find(function (n) {return n > value;});
      return '<div class="summary-event" data-summary-progress="' + d.id + '"' + (hidden.indexOf(d.id) >= 0 ? ' hidden' : '') + '><strong>' + d.name + '</strong>' + achievementPlace(d, value, competitors) + '<p>' + num(value) + (next ? ' / ' + num(next) : '') + ' ' + d.unit + '</p><progress max="' + (next || value || 1) + '" value="' + value + '"></progress><p class="summary-muted">' + (next ? 'До следующей ступени: ' + num(next - value) + ' ' + d.unit : 'Все ступени открыты') + '</p>' + achievementRival(d, value, competitors) + '</div>';
    }).join("") + '<div id="summary-extra-achievements"></div>' + link("Все достижения", "profile"));
    var heroes = window.POKER_CLUB_NEWS_DATA && window.POKER_CLUB_NEWS_DATA.dayHeroes;
    var raceIntro = '<p><strong>Вы в гонке за 25 000 ₽ в сентябре!</strong></p><p>Заберите больше всех ачивок «Герой дня» в сентябре и получите 25 000 ₽.</p><h3 class="summary-rival-heading">Ближайший конкурент</h3>';
    put("rival", raceIntro + '<p class="summary-muted">Данные гонки пока недоступны.</p>');
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
      put("rival", raceIntro + '<span class="summary-kicker">Герой месяца · ' + esc(new Intl.DateTimeFormat("ru-RU", {month:"long",timeZone:"Europe/Moscow"}).format(new Date())) + '</span>' +
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
  function init() {
    root = document.getElementById("mySummaryContent"); if (!root || pending) return;
    root.classList.remove("summary-bootstrap-skeleton");root.removeAttribute("aria-busy");root.removeAttribute("aria-label");
    friends();
    if (Date.now() - loadedAt < 30000) {renderSpin(); return;}
    var seq = ++generation; pending = true; account = "";
    var loading = '<div class="summary-card-loading" role="status" aria-label="Загружаем"><i></i><b></b><span></span></div>';
    root.innerHTML = section("starting-hands", "Мои раздачи", '<span data-chart-unread class="chart-unread-dot" aria-label="Есть непросмотренный график" hidden></span><p class="summary-muted">График</p><button type="button" class="summary-link" data-starting-hands-open>Открыть <span aria-hidden="true">→</span></button>') +
        section("reviews-entry", "Разборы раздач", '<span class="summary-review-unread" data-summary-review-unread hidden></span><p class="summary-muted">Получайте билеты за активность</p>' + link("Открыть", "club-reviews")) +
      section("bonus","Бонусы",loading) + section("friends","Новости друзей",loading) + section("schedule","Расписание",loading) + section("results","Турнирные результаты",loading) + section("rival","Гонка за 25 000 ₽",loading) + section("achievements","Мой прогресс",loading);
    applySummaryTab();
    friends();
    function valid() {return seq === generation;}
    var schedule = Promise.resolve().then(function () {return pokerEnsureScriptDomains(["tournament"]);}).then(function () {if(valid()) renderSchedule();}).catch(function () {if(valid()) error("schedule");});
    var authed = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
    if (!authed) {
      ["bonus","achievements","results","rival"].forEach(function (id) {put(id, '<p class="summary-muted">Войдите, чтобы увидеть свои данные.</p>' + link("Открыть профиль", "profile"));});
      pending = false; return;
    }
    loadReviewUnread(valid);
    renderChartUnread(); checkChartUnread();
    var daily = request("promo/daily-poker/status").then(function (d) {if (!valid()) return; if (typeof d.canPlay !== "boolean" || !Number.isFinite(Number(d.bonusBalance))) throw new Error("Invalid status"); spin = d; offset = Date.parse(d.serverTime) - Date.now(); if (!isFinite(offset)) offset = 0; renderSpin();}).catch(function () {if(valid()) {spin=null;error("bonus");}});
    var profile = request("pokerplus-player", {}).then(function (d) {
      if (!valid()) return;
      account = String(d.accountId || ""); var p = d.profile || {}; nickname = p.nickname || p.Nike || p.nick || p.name || "";
      document.getElementById("mySummaryName").textContent = nickname || "";
      if(['ID400800'].includes(account)) {
        var heroCard=document.createElement('section');heroCard.id='summary-hero';heroCard.className='summary-card';heroCard.innerHTML='<h3>Мой герой</h3><p>Вещи, кубки и образы ПокерМанки</p><button type="button" class="summary-link" data-profile-hero-open>Открыть коллекцию →</button>';root.appendChild(heroCard);
        request('profile-hero',{action:'get'}).then(function(h){if(valid()&&h.hero){var model=window.POKER_HERO_CATALOG&&window.POKER_HERO_CATALOG.model(h.hero.goal);heroCard.querySelector('p').textContent=h.hero.pendingChoice?'Продолжите выбор одной из трёх вещей':model?'Цель: '+model.name+' · '+h.hero.dust+'/'+model.cost+' оск.':h.hero.chests+' наград за уровни'+(h.hero.adventureAvailable?' · подарок доступен':'');}}).catch(function(){});
      }
      applySummaryTab();
      return d;
    });
    var progress = profile.then(function (d) {
      if (!valid()) return;
      var p = d.profile || {};
      if (d.linked && !nickname) throw new Error("Profile cache unavailable");
      if (!d.linked) { ["results","achievements","rival"].forEach(function (id) {put(id,'<p class="summary-muted">Привяжите Poker21 в профиле, чтобы увидеть результаты и прогресс.</p>' + link("Привязать Poker21", "profile"));}); return; }
      return Promise.resolve(pokerEnsureScriptDomains(["rating-common", "rating-winter", "rating-spring", "rating-summer"])).then(function () {return window.pokerGetTournamentAchievementStatsReady(nickname);}).then(function (stats) {if(valid()) {renderStats(stats);return loadAchievementCatalog(Object.assign({},p,{accountId:account}),valid);}});
    }).catch(function () {if(valid()) {error("results");error("achievements");error("rival");}});
    Promise.allSettled([schedule,daily,progress]).then(function () {if(valid()) {pending=false;loadedAt=Date.now();}});
  }
  function closeStartingHands(destroy) {
    var modal=document.getElementById('startingHandsDialog');if(!modal)return;
    if(modal.open)modal.close();
    modal.style.display='none';
    if(destroy===true)modal.remove();
  }
  function openStartingHands() {
    var existing=document.getElementById('startingHandsDialog');
    if(existing){existing.showModal();existing.style.display='grid';var existingFrame=existing.querySelector('iframe');if(existingFrame?.contentWindow)existingFrame.contentWindow.postMessage({type:'starting-hands-resume'},window.location.origin);return;}
    var modal=document.createElement('dialog');modal.id='startingHandsDialog';
    modal.style.cssText='position:fixed;inset:0;width:100%;max-width:100%;height:100dvh;max-height:100dvh;box-sizing:border-box;margin:0;padding:var(--tg-ui-top-clearance, calc(env(safe-area-inset-top, 0px) + 8px)) 0 env(safe-area-inset-bottom, 0px);border:0;background:#050816;color:#e5e7eb;overflow:hidden;grid-template-rows:48px minmax(0,1fr);';
    modal.innerHTML='<button type="button" style="height:48px;padding:0 20px;background:#101827;color:#e5e7eb;border:0;width:100%;text-align:left;font:inherit">← Моя сводка</button><iframe title="Стартовые руки" src="starting-hands/index.html?v=20260920-opponent-alias-1" style="display:block;width:100%;height:100%;min-height:0;border:0"></iframe>';
    modal.querySelector('button').onclick=function(){closeStartingHands(false);};
    modal.addEventListener('close',function(){modal.style.display='none';});
    document.body.append(modal);modal.showModal();modal.style.display="grid";
  }
  window.addEventListener('message',async function(event){
    var frame=document.querySelector('#startingHandsDialog iframe');
    if(!frame||event.source!==frame.contentWindow||event.origin!==window.location.origin)return;
    if(event.data?.type==='starting-hands-chart-viewed'){
      if(!document.querySelector('#startingHandsDialog[open]') || document.hidden || !chartHistory || String(event.data.playerId)!==String(chartHistory.playerId) || String(event.data.version)!==String(chartHistory.version) || !Array.isArray(event.data.handIds))return;
      var viewed = new Set(event.data.handIds.map(String));
      (chartHistory.rows||[]).forEach(function(row){if(viewed.has(String(row.handId)))chartSeen[row.handId]=chartFingerprint(row);});
      try {localStorage.setItem('poker-chart-seen:'+chartHistory.playerId,JSON.stringify(chartSeen));}catch(_){}
      renderChartUnread();return;
    }
    if(event.data?.type==='starting-hands-open-review'){
      closeStartingHands(false);
      if(typeof window.pokerOpenClubReview==='function')window.pokerOpenClubReview(event.data.id||'');
      return;
    }
    if(event.data?.type!=='starting-hands-request')return;
    var message=event.data,seq=generation;
    if(!['list','replay','insights','opponents','stacks','version','chart-wall','review-publish'].includes(message.action))return;
    if(message.action==='review-publish'){
      try{
        var published=await pokerSocialRequest('club-reviews',{action:'create',requestId:message.requestId,type:'hand',title:message.title,question:message.question,context:message.context,outcome:'',hideShowdown:message.hideShowdown===true,forCoach:false,image:message.image,cards:message.cards,handId:message.handId,gameMode:message.gameMode,bigBlindMinor:message.bigBlindMinor,startingStackMinor:message.startingStackMinor,totalPotMinor:message.totalPotMinor});
        window.dispatchEvent(new Event('poker-reviews-updated'));
        frame.contentWindow.postMessage({type:'starting-hands-response',id:message.id,payload:{ok:true,id:published.thread&&published.thread.id,activity:published.activity,activityAward:published.activityAward}},window.location.origin);
      }catch(error){frame.contentWindow.postMessage({type:'starting-hands-response',id:message.id,error:error.message||'Не удалось опубликовать раздачу'},window.location.origin);}
      return;
    }
    if(message.action==='chart-wall'){
      try{
        if(typeof message.handId!=='string'||!message.handId.startsWith('data:image/webp;base64,')||message.handId.length>450000)throw new Error('image');
        await profileOwnWallRequest({action:'create',text:'Моя игра · График результата',image:message.handId,shareToClub:false});
        if(typeof refreshProfileOwnWall==='function')refreshProfileOwnWall();
        frame.contentWindow.postMessage({type:'starting-hands-response',id:message.id,payload:{ok:true}},window.location.origin);
      }catch(_){frame.contentWindow.postMessage({type:'starting-hands-response',id:message.id,error:'publish failed'},window.location.origin);}
      return;
    }
    try {var data=await request('starting-hands',{action:message.action,handId:message.handId,handIds:message.handIds});
      if(seq!==generation||!frame.isConnected)return;
      if(message.action==='list')acceptChartHistory(data);
      frame.contentWindow.postMessage({type:'starting-hands-response',id:message.id,payload:message.action==='replay'?data.replay:data},window.location.origin);
    }catch(_){if(seq===generation&&frame.isConnected)frame.contentWindow.postMessage({type:'starting-hands-response',id:message.id,error:'load failed'},window.location.origin);}
  });
  window.addEventListener('poker-telegram-auth',function(){closeStartingHands(true);});
  window.initMySummary = init;
  document.addEventListener("click", function (e) {
    var shareButton=e.target.closest("[data-summary-share-results]");
    if(shareButton){e.preventDefault();shareResults(shareButton);return;}
    var summaryButton=e.target.closest('[data-summary-tab]');
    if(summaryButton){summaryTab=summaryButton.dataset.summaryTab;applySummaryTab();}
    if(e.target.closest("[data-starting-hands-open]"))openStartingHands();
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
  window.addEventListener('poker-telegram-auth', function(){chartHistory=null;chartSeen={};renderChartUnread();setTimeout(checkChartUnread,0);});
  document.addEventListener('visibilitychange',function(){if(!document.hidden)checkChartUnread();});
  window.addEventListener('storage',function(e){if(chartHistory && e.key==='poker-chart-seen:'+chartHistory.playerId)acceptChartHistory(chartHistory);});
  renderChartUnread();
  setTimeout(checkChartUnread,0);
  setInterval(checkChartUnread,60000);
  window.addEventListener("poker-reviews-updated", function(){loadedAt=0;if(root&&root.querySelector("[data-summary-review-unread]"))loadReviewUnread();});
  window.addEventListener("poker-telegram-auth", function () {generation++;pending=false;loadedAt=0;spin=null;account="";nickname="";var name=document.getElementById("mySummaryName");if(name)name.textContent="";if(root)root.innerHTML="";friends();if(document.querySelector('[data-view="my-summary"].view--active'))init();});
  setInterval(function () {if(document.hidden || !document.querySelector('[data-view="my-summary"].view--active'))return;if(spin && !spin.canPlay && Date.parse(spin.nextFreeAttemptAt)<=Date.now()+offset && Date.now()-loadedAt>30000){loadedAt=0;init();}else renderSpin();}, 30000);
})();
