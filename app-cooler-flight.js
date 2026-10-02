(function () {
  'use strict';
  var E = window.CoolerFlightEngine;
  var ui, ctx, state, phase = 'ready', mode = 'solo', runId = '', taps = [], pendingFlap = false;
  var raf = 0, lastTime = 0, accumulator = 0, room = null, roomTimer = 0, polling = false;
  var generation = 0, pendingResult = null, best = 0, bestKey = '', sound = false, audio = null;
  var particles = [], lastScore = 0, clockOffset = 0, duelStarted = false, toastUntil = 0, soloCountdown = null, resultClosed = false;
  var previousY = 270, previousDistance = 0, drawOffset = 0;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var pilot = new Image(), monkey = new Image(), fan = new Image();
  pilot.src = './assets/cooler-flight/cooler-pilot-v1.webp';
  monkey.src = './assets/pokermanki-animation-head.webp';
  fan.src = './assets/hero-poker/pilots-v1/cooler-fan.webp';
  function active() { return document.body.getAttribute('data-view') === 'cooler-flight'; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]; }); }
  function storageKey() {
    var identity = 'guest';
    try {
      var auth = window.__pokerTelegramAuth, user = auth && auth.user;
      if (auth && (auth.status === 'verified' || auth.status === 'dev_skip') && user) identity = String(user.memberId || user.id || 'guest');
    } catch (_) {}
    var hash = 0; for (var i = 0; i < identity.length; i++) hash = (Math.imul(hash, 31) + identity.charCodeAt(i)) >>> 0;
    return 'cooler-flight-v3-best-' + hash;
  }
  function readBest() { bestKey = storageKey(); try { best = Math.max(0, Math.min(10000, Number(localStorage.getItem(bestKey)) || 0)); } catch (_) { best = 0; } }
  var chipLines = ['ОПА!', 'НИХ@Я!', 'Пошла отмазка!', 'Сюда', 'Сюдааааа!', 'Попалася рыбешка', 'Банк растёт!', 'Вот это занос!', 'Фишечку сюда!', 'Плюс в копилку!', 'Дядя в деле!', 'Лови натс!', 'Хорошо пошла!', 'Ещё одну!', 'Забираем банк!'];
  var chipStreak = 0, lastChipGate = -2, previousChipLine = '', chipSpeech = '', chipSpeechUntil = 0;
  function collectedChip(time) {
    var gate = state.obstacles.find(function(o){return o.collected && o.id > lastChipGate;});
    if(gate){chipStreak = gate.id === lastChipGate + 1 ? chipStreak + 1 : 1;lastChipGate = gate.id;}
    var part = chipStreak % 6;
    if(part >= 1 && part <= 3)chipSpeech = ['Игру-то', 'понимать', 'надо'][part - 1];
    else {var options=chipLines.filter(function(line){return line !== previousChipLine;});chipSpeech=options[Math.floor(Math.random()*options.length)];}
    if(state.score===31)chipSpeech='Турбо-кулер!';
    previousChipLine=chipSpeech;chipSpeechUntil=time+(state.score===31?2000:1100);
  }
  function saveBest() { if (state.score <= best) return false; best = state.score; try { localStorage.setItem(bestKey, String(best)); } catch (_) {} return true; }
  function api(action, data) {
    var base = typeof getApiBase === 'function' ? getApiBase() : location.origin;
    var controller = new AbortController(), timeout = setTimeout(function () { controller.abort(); }, 8000);
    var body = Object.assign({ action: action }, data || {});
    if (typeof pokerApiAuthJsonBody === 'function') body = pokerApiAuthJsonBody(body);
    return fetch(base + '/api/cooler-flight', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: controller.signal })
      .then(function (r) { return r.json().then(function (d) { if (!r.ok || !d.ok) { var e = new Error(d.error || 'Сервер игры недоступен.'); e.status = r.status; throw e; } return d; }); })
      .finally(function () { clearTimeout(timeout); });
  }
  function status(s) { if (ui && ui.status.textContent !== (s || '')) ui.status.textContent = s || ''; }
  function tone(freq, length, type) {
    if (!sound) return;
    try {
      if (!audio) audio = new (window.AudioContext || window.webkitAudioContext)();
      if (audio.state === 'suspended') audio.resume();
      var osc = audio.createOscillator(), gain = audio.createGain(); osc.type = type || 'sine';
      osc.frequency.setValueAtTime(freq, audio.currentTime); osc.frequency.exponentialRampToValueAtTime(Math.max(80, freq * .6), audio.currentTime + length);
      gain.gain.setValueAtTime(.065, audio.currentTime); gain.gain.exponentialRampToValueAtTime(.001, audio.currentTime + length);
      osc.connect(gain); gain.connect(audio.destination); osc.start(); osc.stop(audio.currentTime + length);
    } catch (_) {}
  }
  function button(action, label, secondary) { return '<button type="button" class="flight-button' + (secondary ? ' flight-button--secondary' : '') + '" data-flight-action="' + action + '">' + label + '</button>'; }
  function panel(html, kind) {
    ui.overlay.hidden = false; ui.overlay.dataset.kind = kind || '';
    ui.panel.innerHTML = ((kind === 'result' || kind === 'spectator') ? '<button class="cooler-flight__close" data-flight-action="close-result" aria-label="Закрыть меню результата">×</button>' : '') + html; ui.pause.hidden = true;
    if((kind === 'result' || kind === 'spectator') && resultClosed)ui.overlay.hidden = true;
  }
  function prizeRules(){return '<p><b>Каждый день — билет победителю!</b><br>Набери больше всех фишек к 17:00 МСК. В будни — билет на турнир вечера, в субботу и воскресенье — билет за 500 ₽. После 17:00 начинается новый круг.</p><p>Засчитывается лучший завершённый полёт в аккаунте. При равенстве побеждает более ранний результат. Тренировка без сохранения не участвует.</p>';}
  function dailyBoard(d){if(!d)return '';return '<h2>Билет дня</h2><p>'+esc(d.prize)+' · до 17:00 МСК '+esc(d.date)+'</p>'+ (d.rows.length?'<ol>'+d.rows.map(function(r){return '<li><b>'+r.place+'</b><span>'+esc(r.name)+(r.mine?' · ты':'')+'</span><strong>'+r.score+'</strong></li>';}).join('')+'</ol>':'<p>Новый круг: стань первым!</p>')+'<h2>Победители</h2>'+(d.winners.length?'<ol>'+d.winners.map(function(w){return '<li><span>'+esc(w.date)+' · '+esc(w.name)+'<br>'+esc(w.prize)+'</span><strong>'+w.score+'</strong></li>';}).join('')+'</ol>':'<p>Здесь появятся победители ежедневных кругов.</p>');}
  function ready() {
    resultClosed = false; soloCountdown = null; phase = 'ready'; pendingResult = null; state = E.create((Math.random() * 4294967296) >>> 0); taps = []; particles = []; lastScore = 0; chipStreak=0;lastChipGate=-2;chipSpeech='';chipSpeechUntil=0;
    ui.hint.textContent = 'Нажал — взлетел · Отпустил — снижаешься'; ui.score.textContent = '0'; ui.best.textContent = best;
    ui.hint.textContent = 'Нажал — взлетел · Отпустил — снижаешься';
    if (mode === 'solo') panel('<span class="flight-tag">БЕЗЛИМИТНЫЕ ПОПЫТКИ</span><h2>Помоги Кулеру набить банкролл и не разбиться об натс ПокерМанки</h2><p>Собирай фишки между стенами: одна фишка — одно очко.</p>' + prizeRules() + button('start', 'Полетели →'), 'ready');
    else panel('<span class="flight-tag">ИГРА НА ДВОИХ</span><h2>Кто набьёт больше?</h2>' + prizeRules() + button('create', 'Создать дуэль') + '<label>Код дуэли<input id="coolerFlightRoomCode" placeholder="Вставь код или ссылку" autocomplete="off" maxlength="300"></label>' + button('join', 'Присоединиться', true), 'ready');
    ensureLoop();
  }
  function ensureLoop() { if (!raf && active()) { lastTime = 0; raf = requestAnimationFrame(frame); } }
  function begin(seed, id) {
    if (!active()) return;
    resultClosed = false; soloCountdown = null; runId = id || ''; state = E.create(seed); previousY=state.y;previousDistance=state.distance;phase = 'playing'; taps = []; particles = []; lastScore = 0; chipStreak=0;lastChipGate=-2;chipSpeech='';chipSpeechUntil=0; accumulator = 0; lastTime = 0; pendingFlap = true;
    ui.overlay.hidden = true; ui.pause.hidden = mode === 'duel'; ui.toast.textContent = ''; ui.canvas.focus({ preventScroll: true });
    window.scrollTo(0, 0);
    var shell = document.querySelector('.card'); if (shell) shell.scrollTop = 0;
    ui.hint.textContent = mode === 'duel' ? 'Твой Кулер яркий · Соперник полупрозрачный' : 'Касайся поля или нажимай пробел, чтобы взлететь';
    ensureLoop();
  }
  async function startSolo() {
    if (phase === 'loading') return;
    var g = ++generation; phase = 'loading'; panel('<span class="flight-tag">КУЛЕР ПРОГРЕВАЕТ ВЕНТИЛЯТОР</span><h2>Готовимся к полёту…</h2>');
    try {
      var d = await api('start'); if (g !== generation || !active()) return;
      status('Результат будет проверен и сохранён в топ клуба.'); countdownSolo(d.seed, d.runId);
    } catch (e) {
      if (g !== generation || !active()) return;
      status(e.status === 401 ? 'Тренировка. Войдите в аккаунт для топа клуба и дуэлей.' : 'Тренировка: сервер недоступен. Рекорд сохранится на этом устройстве.');
      countdownSolo((Math.random() * 4294967296) >>> 0, '');
    }
  }
  function countdownSolo(seed, id) {
    soloCountdown = { seed: seed, id: id, end: performance.now() + 3000 };
    phase = 'countdown';panel('<span class="flight-tag">КУЛЕР ГОТОВ</span><h2>Приготовься!</h2><div class="flight-score" data-flight-countdown>3</div><p>Нажимай на поле, чтобы взлететь.</p>');ensureLoop();
  }
  function flap() {
    if((phase === 'over' || phase === 'spectating') && resultClosed){resultClosed=false;resultPanel(false);return;}
    if (phase !== 'playing') return;
    pendingFlap = true;
  }
  function pause() {
    if (phase !== 'playing' || mode !== 'solo') return;
    phase = 'paused'; pendingFlap = false;
    panel('<span class="flight-tag">ПАУЗА</span><h2>Вентилятор отдыхает</h2><p>Твой полёт сохранён. Можно продолжить.</p>' + button('resume', 'Продолжить →') + button('quit', 'Закончить полёт', true));
  }
  function resume() { phase = 'playing'; accumulator = 0; lastTime = 0; ui.overlay.hidden = true; ui.pause.hidden = false; ui.canvas.focus({ preventScroll: true }); ensureLoop(); }
  function splash() {
    for (var i = 0; i < 36; i++) particles.push({ x: state.x, y: state.y + 18, vx: Math.cos(i * 2.4) * (2 + i % 5), vy: -2 - i % 7, life: 50 + i % 12 });
    tone(180, .35, 'sawtooth');
  }
  function resultPanel(newBest) {
    if (room && !room.result && !room.expired && room.opponentName) {
      phase = 'spectating';
      panel('<span class="flight-tag">СМОТРИМ ПОЛЁТ</span><h2>' + esc(room.opponentName) + ' ещё в игре</h2><p>Твои фишки: ' + state.score + ' · Фишки соперника: ' + (room.opponent ? Math.max(0, room.opponent.score) : 0) + '</p>' + (pendingResult ? button('save', 'Повторить сохранение', true) : ''), 'spectator');
      ui.hint.textContent = 'Соперник доигрывает · Затем можно повторить вдвоём';
      ensureLoop(); return;
    }
    var title = newBest ? 'Новый личный рекорд!' : state.score ? 'Манки забрал банк' : 'Кулер, ещё попытку?';
    var outcome = room && room.result;
    if (outcome) title = outcome === 'win' ? 'Ты выиграл дуэль!' : outcome === 'draw' ? 'Ничья! Реванш?' : 'Соперник набил больше';
    var caption = 'Собрано фишек: ' + state.score;
    if (room && room.opponent && room.opponent.finished) caption += '<br>' + esc(room.opponentName) + ': ' + (room.opponent.forfeited ? 'вышел из дуэли' : 'Фишек: ' + room.opponent.score);
    else if (room && !outcome) caption += '<br>Ждём результат ' + esc(room.opponentName || 'друга') + '…';
    if(room && room.opponentReady && !room.rematchReady)caption += '<br>Друг готов к реваншу — нажми «Повторить»';
    panel('<span class="flight-tag">' + (mode === 'duel' ? 'ДУЭЛЬ' : 'ЕЩЁ ОДИН ПОЛЁТ?') + '</span><h2>' + title + '</h2><div class="flight-score">' + state.score + '</div><p>' + caption + '</p>' +
      button(mode === 'duel' ? 'rematch' : 'start', mode === 'duel' ? (room && room.rematchReady ? 'Ждём, когда друг нажмёт «Повторить»' : 'Повторить →') : 'Ещё полететь →') + button('share', 'Похвастаться результатом', true) + button('card', 'Сохранить карточку рекорда', true) + (pendingResult ? button('save', 'Повторить сохранение', true) : ''), 'result');
  }
  async function submit() {
    if (!pendingResult) return;
    var payload = pendingResult, g = generation; status('Проверяем полёт…');
    try {
      var d = await api('finish', payload); if (g !== generation || !active()) return;
      if(room && payload.runId !== room.runId)return;
      pendingResult = null;
      status('Результат подтверждён · Рекорд: ' + d.best + (d.place ? ' · Место в клубе: ' + d.place : ''));
      resultPanel(state.score >= best && state.score > 0);
    } catch (e) {
      if (g !== generation || !active() || (room && payload.runId !== room.runId)) return;
      if (e.status === 409) pendingResult = null;
      status(e.message); resultPanel(false);
    }
  }
  function finish() {
    if (phase !== 'playing') return;
    phase = 'over'; pendingFlap = false; splash(); ui.pause.hidden = true;
    var newBest = saveBest(); ui.best.textContent = best;
    pendingResult = runId ? { runId: runId, ticks: state.tick, taps: taps.slice() } : null;
    var g = generation;
    setTimeout(function () { if (g === generation && active() && (phase === 'over' || phase === 'spectating')) { if(phase === 'over')resultPanel(newBest); if (pendingResult) submit(); } }, 450);
  }
  function round(x, y, w, h, r, fill, stroke) {
    if (h <= 0 || w <= 0) return;
    ctx.beginPath(); ctx.roundRect(x, y, w, h, Math.min(r, h / 2, w / 2)); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.stroke(); }
  }
  function chip(x, y, w, color) {
    round(x, y, w, 9, 4, color, '#e3d4a566');
    ctx.strokeStyle = '#fff3bc'; ctx.lineWidth = 3;
    [x + 7, x + w / 2, x + w - 7].forEach(function (px) { ctx.beginPath(); ctx.moveTo(px, y + 1); ctx.lineTo(px, y + 5); ctx.stroke(); });
    ctx.lineWidth = 1;
  }
  function playingCard(x, y, rank, suit, angle, w, h) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(angle || 0); round(-w / 2, -h / 2, w, h, 6, '#f3efdc', '#c3a76e');
    ctx.fillStyle = suit === '♥' || suit === '♦' ? '#bd493c' : '#182e27'; ctx.font = 'bold ' + Math.floor(w * .32) + 'px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(rank, 0, -h * .12); ctx.fillText(suit, 0, h * .22); ctx.restore();
  }
  var backdrop;
  function makeBackdrop() {
    backdrop = document.createElement('canvas'); backdrop.width = 390; backdrop.height = 600;
    var old = ctx; ctx = backdrop.getContext('2d');
    var bg = ctx.createLinearGradient(0, 0, 0, 600); bg.addColorStop(0, '#071b1c'); bg.addColorStop(.7, '#164f42'); bg.addColorStop(1, '#051910'); ctx.fillStyle = bg; ctx.fillRect(0,0,390,600);
    var glow = ctx.createRadialGradient(230,220,20,230,220,290); glow.addColorStop(0,'#39ac7730'); glow.addColorStop(1,'#164f4200'); ctx.fillStyle = glow; ctx.fillRect(0,0,390,600);
    for (var i=0;i<5;i++) { ctx.strokeStyle='#a8ae6630'; ctx.lineWidth=2; round(-35+i*105,90,80,335,40,null,'#9baf8430'); round(-25+i*105,110,60,300,30,'#021b2438',null); }
    ctx.strokeStyle='#9ea36e'; ctx.globalAlpha=.3; ctx.beginPath();ctx.moveTo(0,80);ctx.lineTo(390,80);ctx.stroke();ctx.globalAlpha=1;
    ctx.font='800 29px sans-serif'; ctx.textAlign='center';ctx.fillStyle='#b7dbbd0d';ctx.fillText('ДВА ТУЗА',195,175);
    round(-30,430,450,165,80,'#052819','#816934');round(-25,440,440,143,72,'#116244','#28a078');
    ctx.setLineDash([5,8]);round(-10,452,410,115,60,null,'#d1d6a441');ctx.setLineDash([]);
    playingCard(151,499,'A','♠',-.15,35,50);playingCard(189,499,'K','♥',.03,35,50);playingCard(227,499,'Q','♣',.15,35,50);
    ctx.fillStyle='#052117';ctx.fillRect(0,548,390,52);ctx.fillStyle='#7b6138';ctx.fillRect(0,548,390,3);
    ctx.font='bold 10px sans-serif';ctx.fillStyle='#e5cc94';ctx.fillText('POKER21 × ДВА ТУЗА',195,580);
    ctx=old;
  }
  function drawPilot(x,y,size,ghost) {
    ctx.save();ctx.translate(x,y);ctx.globalAlpha=ghost?.38:1;ctx.rotate((phase === 'playing' || phase === 'spectating') ? Math.max(-.22,Math.min(.32,state.vy*.035)) : -.05);
    if (pilot.complete && pilot.naturalWidth) ctx.drawImage(pilot,-size*.37,-size*.55,size*.75,size);
    if(state && state.version>=6 && state.passes>=30){
      // Compact upgraded chassis stays inside the existing sprite footprint.
      ctx.fillStyle='#9baebd';ctx.strokeStyle='#66f5ff';ctx.lineWidth=1.5;
      ctx.fillRect(-size*.22,size*.03,size*.43,size*.31);ctx.strokeRect(-size*.22,size*.03,size*.43,size*.31);
      ctx.fillStyle='#183c58';ctx.fillRect(-size*.16,size*.07,size*.31,size*.2);
      ctx.fillStyle='#5ff3ff';ctx.fillRect(-size*.13,size*.1,size*.25,size*.035);
      for(var side of [-1,1]){ctx.save();ctx.translate(side*size*.26,size*.2);ctx.fillStyle='#142b40';ctx.beginPath();ctx.arc(0,0,size*.115,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.rotate(state.tick*.4);ctx.fillStyle='#c1faff';for(var blade=0;blade<3;blade++){ctx.rotate(Math.PI*2/3);ctx.fillRect(-size*.018,-size*.08,size*.036,size*.09);}ctx.restore();}
    }
    if (!ghost && fan.complete && fan.naturalWidth) { ctx.save();ctx.translate(-size*.23,size*.14);ctx.rotate((state ? state.tick : performance.now()/16)*.32);ctx.globalAlpha=.72;ctx.drawImage(fan,-size*.11,-size*.11,size*.22,size*.22);ctx.restore(); }
    if (!ghost) { ctx.strokeStyle='#78e8e2';ctx.globalAlpha=.45;ctx.lineWidth=2;for(var j=0;j<3;j++){ctx.beginPath();ctx.moveTo(-size*.37-j*5,size*.12+j*7);ctx.lineTo(-size*.53-j*7,size*.12+j*7);ctx.stroke();} }
    ctx.restore();
  }
  function drawObstacleArt(o) {
    var top=o.center-o.gap/2,bottom=o.center+o.gap/2,x=o.x;
    ctx.save();
    round(x-4,0,o.width+8,top-3,8,'#051d20','#938454');
    for(var y=25;y<top-22;y+=58) playingCard(x+o.width/2,y,'A',o.variant===1?'♥':'♠',(o.variant-1)*.07,46,57);
    round(x-8,top-9,o.width+16,10,4,'#dbc88d','#fff1ba');
    round(x-4,bottom,o.width+8,E.FLOOR-bottom,8,'#091b19','#3d7451');
    for(var cy=E.FLOOR-10;cy>bottom+4;cy-=11) chip(x,cy,o.width,o.variant===1?'#b35145':o.variant===2?'#273e66':'#1c8765');
    round(x-8,bottom,o.width+16,10,4,'#e5c477','#fff1ba');
    if(monkey.complete && monkey.naturalWidth) {
      var above=o.id%2===0, my=above?top-46:bottom+42;
      ctx.drawImage(monkey,x-4,my-29,o.width+8,59);
    }

    ctx.restore();
  }
  function drawObstacle(o) {
    var ready = monkey.complete && monkey.naturalWidth;
    if(!o._art || o._artReady !== ready){
      var art=document.createElement('canvas'),scale=Math.min(2,window.devicePixelRatio||1);art.width=86*scale;art.height=E.FLOOR*scale;
      var main=ctx;ctx=art.getContext('2d');ctx.scale(scale,scale);ctx.translate(12,0);
      drawObstacleArt({x:0,width:o.width,center:o.center,gap:o.gap,variant:o.variant,id:o.id});ctx=main;o._art=art;o._artReady=ready;
    }
    var x=o.x+drawOffset;
    ctx.drawImage(o._art,x-12,0,86,E.FLOOR);
    if(!o.collected){ctx.beginPath();ctx.arc(x+o.width/2,o.center,12,0,Math.PI*2);ctx.fillStyle='#edc05f';ctx.fill();ctx.strokeStyle='#fff2bd';ctx.lineWidth=3;ctx.setLineDash([4,3]);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle='#674114';ctx.font='bold 11px sans-serif';ctx.textAlign='center';ctx.fillText('1',x+o.width/2,o.center+4);}
  }
  function opponentFlight() {
    var remote=room && room.opponent;if(!remote || !Array.isArray(remote.taps))return null;
    var now=performance.now();
    if(!remote._flight){remote._flight=E.create(room.seed);remote._time=now;remote._acc=0;remote._previousY=remote._flight.y;remote._previousDistance=0;}
    remote._acc+=Math.min(100,now-remote._time);remote._time=now;
    var target=Math.max(0,remote.tick-18);
    if(remote._controlsSource!==remote.taps){remote._controlsSource=remote.taps;remote._controls=new Set(remote.taps);}
    var controls=remote._controls;
    while(remote._acc>=1000/60&&remote._flight.alive&&remote._flight.tick<target){remote._previousY=remote._flight.y;remote._previousDistance=remote._flight.distance;E.step(remote._flight,controls.has(remote._flight.tick));remote._acc-=1000/60;}
    if(remote._flight.tick>=target)remote._acc=Math.min(remote._acc,1000/60);
    var blend=Math.min(1,remote._acc/(1000/60));
    remote._renderY=remote._previousY+(remote._flight.y-remote._previousY)*blend;
    remote._drawOffset=(remote._flight.distance-remote._previousDistance)*(1-blend);
    return remote._flight;
  }
  function pilotSize(flight){return flight.version>=6 && flight.passes>=30?61:122;}
  function opponentName(x,y) {
    ctx.font='bold 12px sans-serif';ctx.textAlign='center';var name=room.opponentName||'Соперник';
    var width=Math.min(210,ctx.measureText(name).width+16),cx=Math.max(width/2+4,Math.min(386-width/2,x)),cy=Math.max(115,y-78);
    ctx.fillStyle='#10292de0';ctx.fillRect(cx-width/2,cy-16,width,23);ctx.fillStyle='#a8f4ff';ctx.fillText(name,cx,cy,194);
  }
  function draw() {
    if(!ctx || !state) return;
    if (phase === 'spectating') {
      drawOffset=0;ctx.clearRect(0,0,390,600);ctx.drawImage(backdrop,0,0);
      var remote = room && room.opponent;
      if (remote && Array.isArray(remote.taps)) {
        opponentFlight();
        var own=state;state=remote._flight;drawOffset=remote._drawOffset;state.obstacles.forEach(drawObstacle);drawPilot(state.x,remote._renderY,pilotSize(state),false);opponentName(state.x,remote._renderY);state=own;drawOffset=0;
      }
      return;
    }
    ctx.clearRect(0,0,390,600);ctx.drawImage(backdrop,0,0);
    var reduced=reducedMotion.matches;
    var blend=phase==='playing'?Math.max(0,Math.min(1,accumulator/(1000/60))):1;
    drawOffset=phase==='playing'?(state.distance-previousDistance)*(1-blend):0;
    var renderY=phase==='playing'?previousY+(state.y-previousY)*blend:state.y;
    var d=phase==='playing'?state.distance-drawOffset:0;
    for(var i=0;i<9;i++){var x=(i*63-d*.35)%570;if(x<0)x+=570;ctx.globalAlpha=.12;ctx.fillStyle='#f4d18b';ctx.font='22px serif';ctx.textAlign='center';ctx.fillText(i%2?'♠':'♦',x-80,390+(i%3)*17);ctx.globalAlpha=1;}
    if(room && phase === 'playing' && room.opponent && !room.opponent.finished){
      var hologram=opponentFlight();if(hologram){var ownFlight=state;state=hologram;drawPilot(ownFlight.x+26,room.opponent._renderY,pilotSize(state),true);opponentName(ownFlight.x+26,room.opponent._renderY);state=ownFlight;}
    }
    state.obstacles.forEach(drawObstacle);
    if(phase==='ready'||phase==='loading'||phase==='waiting'||phase==='countdown') {
      var bob=reduced?0:Math.sin(performance.now()/650)*4;
      drawPilot(115,190+bob,190,false);
      if(monkey.complete&&monkey.naturalWidth)ctx.drawImage(monkey,262,190-bob,88,77);
      ctx.font='bold 12px sans-serif';ctx.fillStyle='#f2d9a4';ctx.textAlign='center';ctx.fillText('ПОКЕРМАНКИ',306,283);
    } else {
      drawPilot(state.x,renderY,pilotSize(state),false);
    }
    if(phase==='playing' && chipSpeech && performance.now()<chipSpeechUntil){ctx.font='bold 14px sans-serif';ctx.textAlign='center';var bubbleWidth=ctx.measureText(chipSpeech).width+20;var bx=Math.max(bubbleWidth/2+6,Math.min(384-bubbleWidth/2,state.x+38)),by=Math.max(120,renderY-80);ctx.fillStyle='#fff4d6';ctx.fillRect(bx-bubbleWidth/2,by-18,bubbleWidth,28);ctx.fillStyle='#241409';ctx.fillText(chipSpeech,bx,by+1);}
    particles.forEach(function(p){ctx.globalAlpha=Math.max(0,p.life/62);ctx.fillStyle='#84eaff';ctx.beginPath();ctx.ellipse(p.x,p.y,3,6,.4,0,Math.PI*2);ctx.fill();});ctx.globalAlpha=1;
    if(room&&phase==='playing'){ctx.font='bold 12px sans-serif';ctx.fillStyle='#daf5df';ctx.textAlign='center';ctx.fillText((room.opponentName||'Соперник')+': '+(room.opponent?Math.max(0,room.opponent.score):0),195,97);}
  }
  function frame(time) {
    raf=0;if(!active())return;
    var delta=lastTime?Math.min(100,time-lastTime):0;lastTime=time;
    if(phase==='countdown'&&soloCountdown){var remaining=Math.min(3,Math.ceil((soloCountdown.end-time)/1000));if(remaining<=0){var start=soloCountdown;begin(start.seed,start.id);}else{var number=ui.panel.querySelector('[data-flight-countdown]');if(number)number.textContent=remaining;}}
    if(phase==='countdown'&&room&&room.startAt){var left=Math.ceil((room.startAt-(Date.now()+clockOffset))/1000);if(left<=0&&!duelStarted){duelStarted=true;status('Дуэль началась!');begin(room.seed,room.runId);}else if(left>0){var count=ui.panel.querySelector('[data-flight-countdown]');if(count)count.textContent=left;}}
    if(phase==='playing') {
      accumulator+=delta;
      while(accumulator>=1000/60&&state.alive){
        var doFlap=pendingFlap&&state.tick-state.lastFlap>=7;
        if(doFlap){taps.push(state.tick);tone(460,.065);pendingFlap=false;}
        var wasSmall=pilotSize(state)===61;previousY=state.y;previousDistance=state.distance;E.step(state,doFlap);accumulator-=1000/60;
        var hint = 'Этап ' + state.stage + ' · Следующий после ' + (5 - state.passes % 5) + ' ворот';
        if(ui.hint.textContent !== hint)ui.hint.textContent = hint;
        if(state.score!==lastScore){lastScore=state.score;ui.score.textContent=state.score;tone(880,.13);collectedChip(time);ui.toast.textContent='+1 фишка · Собрано: '+state.score;toastUntil=time+1000;}
        if(!wasSmall && pilotSize(state)===61){chipSpeech='Уменьшаемся!';chipSpeechUntil=time+2000;}
      }
      if(!state.alive)finish();
    }
    if(toastUntil&&time>toastUntil){ui.toast.textContent='';toastUntil=0;}
    if(!reducedMotion.matches)particles.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.vy+=.2;p.life--;});
    particles=particles.filter(function(p){return p.life>0;});draw();
    if(!document.hidden)raf=requestAnimationFrame(frame);
  }
  function stopPolling(){if(roomTimer)clearTimeout(roomTimer);roomTimer=0;polling=false;}
  function abandon(){if(runId&&mode==='duel'&&phase!=='over')api('abandon',{runId:runId}).catch(function(){});runId='';}
  function adoptRoom(d) {
    if(room && (d.round || 1) < (room.round || 1))return;
    if(!d.waiting && !d.opponent)d.opponent={tick:0,taps:[],score:0,finished:false};
    if(room && room.runId===d.runId && room.opponent && room.opponent._flight && d.opponent){d.opponent._flight=room.opponent._flight;d.opponent._time=room.opponent._time;d.opponent._acc=room.opponent._acc;d.opponent._previousY=room.opponent._previousY;d.opponent._previousDistance=room.opponent._previousDistance;}
    if(room && room.runId !== d.runId){duelStarted=false;phase='ready';pendingResult=null;particles=[];ui.score.textContent='0';}
    room=d;runId=d.runId;clockOffset=d.serverNow-Date.now();
    if(d.expired){stopPolling();phase='over';panel('<h2>Дуэль завершена</h2><p>Время ожидания истекло. Создайте новую дуэль.</p>'+button('rematch','Новая дуэль'));return;}
    if(d.result){if(phase!=='over'&&d.mine&&d.mine.finished){state=E.create(d.seed);state.score=Math.max(0,d.mine.score);state.perfect=d.mine.perfect||0;state.tick=d.mine.tick;state.alive=false;phase='over';}if(phase==='over')resultPanel(false);return;}
    if(d.mine&&d.mine.finished){phase='over';state=E.create(d.seed);state.score=Math.max(0,d.mine.score);state.perfect=d.mine.perfect||0;state.tick=d.mine.tick;state.alive=false;resultPanel(false);return;}
    if(d.waiting){phase='waiting';panel('<span class="flight-tag">ПРИГЛАШЕНИЕ ГОТОВО</span><h2>Ждём второго Кулера</h2><p>Отправь другу ссылку или этот код:</p><div class="flight-code">'+esc(d.roomId)+'</div>'+button('invite','Поделиться приглашением')+button('cancel','Отменить',true),'ready');}
    else if(!duelStarted&&phase!=='playing'&&phase!=='over'){
      if(d.startAt<Date.now()+clockOffset-10000){status('Начало пропущено. Создайте новую дуэль.');abandon();stopPolling();phase='ready';ready();return;}
      phase='countdown';ui.hint.textContent='Нажал — взлетел · Отпустил — снижаешься';status('Раунд '+(d.round||1)+' · Приготовься к старту');panel('<span class="flight-tag">'+esc(d.opponentName)+' УЖЕ ЗДЕСЬ</span><h2>Приготовься!</h2><div class="flight-score" data-flight-countdown>5</div><p>Одна трасса. Кто соберёт больше фишек?</p>');
    }
  }
  function pollRoom() {
    if(!room||!active()||polling)return;
    polling=true;var g=generation, roomId=room.roomId;
    var req=phase==='playing'?api('progress',{runId:runId,tick:state.tick,y:state.y,score:state.score,taps:taps.slice()}).catch(function(){return null;}):Promise.resolve();
    req.then(function(){return api('room',{roomId:roomId});}).then(function(d){if(g===generation&&active()){adoptRoom(d);if(phase==='playing')status('Дуэль с '+d.opponentName);}}).catch(function(e){if(g===generation&&active())status(e.message);}).finally(function(){if(g===generation&&active()){polling=false;if(room&&!room.expired)roomTimer=setTimeout(pollRoom,phase==='playing'||phase==='spectating'?250:500);}});
  }
  async function createRoom() {
    abandon();stopPolling();duelStarted=false;room=null;var g=++generation;phase='loading';panel('<h2>Создаём дуэль…</h2>');
    try { var d=await api('create');if(g!==generation||!active())return;adoptRoom(d);status('Дуэль без ставок. Приглашение действует 2 часа.');pollRoom(); }
    catch(e){if(g!==generation||!active())return;ready();status(e.message);}
  }
  async function rematch() {
    if(!room || room.expired){createRoom();return;}
    if(room.rematchReady){status('Ждём, когда друг нажмёт «Повторить».');return;}
    var g=generation;
    try{var d=await api('rematch',{roomId:room.roomId,runId:room.runId});if(g!==generation||!active())return;adoptRoom(d);status(d.rematchReady?'Ты готов. Ждём друга.':'Реванш начинается!');if(!polling)pollRoom();}
    catch(e){if(g===generation&&active())status(e.message);}
  }
  function parseRoom(value){var m=String(value||'').match(/(?:coolerDuel=|cooler_duel_)([a-f0-9]{12})/i);if(m)return m[1].toLowerCase();return /^[a-f0-9]{12}$/i.test(String(value||'').trim())?String(value).trim().toLowerCase():'';}
  async function joinRoom(code) {
    code=parseRoom(code);if(!code){status('Вставьте ссылку или 12-значный код дуэли.');return;}
    abandon();stopPolling();duelStarted=false;var g=++generation;phase='loading';panel('<h2>Подключаемся к другу…</h2>');
    try{var d=await api('join',{roomId:code});if(g!==generation||!active())return;adoptRoom(d);pollRoom();}
    catch(e){if(g!==generation||!active())return;ready();status(e.message);}
  }
  function invitationUrl() {
    var base=typeof getApiBase==='function'?getApiBase():location.origin;
    var url=new URL(base);url.searchParams.set('coolerDuel',room.roomId);url.searchParams.set('startapp','cooler_duel_'+room.roomId);return url.toString();
  }
  function resultCard() {
    var c = document.createElement('canvas'); c.width = 900; c.height = 1100;
    var g = c.getContext('2d'), bg = g.createLinearGradient(0,0,900,1100);
    bg.addColorStop(0,'#062a24'); bg.addColorStop(1,'#031612');g.fillStyle=bg;g.fillRect(0,0,900,1100);
    g.strokeStyle='#d3b770';g.lineWidth=3;g.beginPath();g.roundRect(25,25,850,1050,35);g.stroke();
    g.textAlign='center';g.fillStyle='#a8c8b7';g.font='bold 22px sans-serif';g.fillText('АРКАДА КЛУБА ДВА ТУЗА',450,89);
    g.fillStyle='#ffe2a1';g.font='bold 46px sans-serif';g.fillText('КУЛЕРШАН',450,185);
    if(pilot.complete&&pilot.naturalWidth)g.drawImage(pilot,155,270,360,477);
    if(monkey.complete&&monkey.naturalWidth)g.drawImage(monkey,578,372,165,144);
    g.font='900 150px sans-serif';g.fillStyle='#ffe2a1';g.fillText(String(state.score),450,900);
    g.font='bold 30px sans-serif';g.fillStyle='#ceead8';g.fillText('ФИШЕК · ПОБЕЙ МОЙ РЕКОРД',450,952);
    g.font='22px sans-serif';g.fillStyle='#83bdac';g.fillText('POKER21 × ДВА ТУЗА',450,1030);
    return new Promise(function(resolve){c.toBlob(resolve,'image/png');});
  }
  async function downloadCard() {
    var blob=await resultCard();if(!blob){status('Не удалось создать карточку.');return;}
    var url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='cooler-record-'+state.score+'.png';a.click();setTimeout(function(){URL.revokeObjectURL(url);},10000);
    status('Карточка рекорда сохранена.');
  }
  async function share(invite) {
    var text=invite?'Летим на Кулерах? Одна трасса, два игрока. Код: '+room.roomId:'Кулершан: мой результат — '+state.score+' фишек! Побьёшь?';
    var url=invite?invitationUrl():(typeof getApiBase==='function'?getApiBase():location.origin)+'/?startapp=cooler_flight';
    try {
      if(navigator.share) {
        if(!invite&&navigator.canShare){var blob=await resultCard();if(blob){var file=new File([blob],'cooler-record-'+state.score+'.png',{type:'image/png'});if(navigator.canShare({files:[file]})){await navigator.share({title:'Кулершан',text:text+'\n'+url,files:[file]});return;}}}
        await navigator.share({title:'Кулершан',text:text,url:url});
      } else {await navigator.clipboard.writeText(text+'\n'+url);status(invite?'Приглашение скопировано. Отправьте другу.':'Результат и ссылка скопированы.');}
    }catch(e){if(e.name!=='AbortError')status('Скопируйте ссылку: '+url);}
  }
  async function showTop() {
    if(phase==='playing'||phase==='paused'||phase==='waiting'||phase==='countdown'){status('Завершите полёт или отмените дуэль, чтобы открыть топ.');return;}
    var g=++generation;phase='top';panel('<h2>Рекорды клуба</h2><p>Загружаем…</p>'+button('back','Вернуться',true));
    try{
      var d=await api('leaderboard');if(g!==generation||!active()||phase!=='top')return;
      panel('<span class="flight-tag">ПРОВЕРЕННЫЕ ПОЛЁТЫ</span><h2>Рекорды клуба</h2>'+dailyBoard(d.daily)+'<h2>За всё время</h2>'+(d.rows.length?'<ol>'+d.rows.map(function(r){return '<li class="'+(r.mine?'flight-mine':'')+'"><b>'+r.place+'</b><span>'+esc(r.name)+(r.mine?' · ты':'')+'</span><strong>'+r.score+'</strong></li>';}).join('')+'</ol>':'<p>Здесь пока пусто.<br>Стань первым Кулером в топе!</p>')+(d.place?'<p>Твоё место: '+d.place+' · Рекорд: '+d.best+'</p>':'')+button('back','Вернуться к полёту',true));
    }catch(e){if(g===generation&&active())panel('<h2>Топ пока недоступен</h2><p>'+esc(e.message)+'</p>'+button('back','Вернуться',true));}
  }
  function action(a) {
    if(a==='close-result'){resultClosed=true;ui.overlay.hidden=true;ui.hint.textContent='Коснись поля, чтобы открыть результат';return;}
    if(a==='start')startSolo();else if(a==='resume')resume();else if(a==='create')createRoom();else if(a==='rematch')rematch();
    else if(a==='join'){var el=document.getElementById('coolerFlightRoomCode');joinRoom(el?el.value:'');}
    else if(a==='invite')share(true);else if(a==='share')share(false);else if(a==='card')downloadCard();else if(a==='save')submit();
    else if(a==='cancel'||a==='back'||a==='quit'){abandon();generation++;stopPolling();room=null;duelStarted=false;status('');ready();}
  }
  function cleanup() {
    abandon();generation++;stopPolling();if(raf)cancelAnimationFrame(raf);raf=0;if(state)state.obstacles=[];particles=[];soloCountdown=null;room=null;phase='ready';pendingFlap=false;duelStarted=false;pendingResult=null;
  }
  window.initCoolerFlight=function(){
    var canvas=document.getElementById('coolerFlightCanvas');if(!canvas)return;
    if(!ui){
      ui={canvas:canvas,panel:document.getElementById('coolerFlightPanel'),overlay:document.getElementById('coolerFlightOverlay'),score:document.getElementById('coolerFlightScore'),best:document.getElementById('coolerFlightBest'),status:document.getElementById('coolerFlightStatus'),hint:document.getElementById('coolerFlightHint'),pause:document.getElementById('coolerFlightPause'),toast:document.getElementById('coolerFlightToast')};
      ctx=canvas.getContext('2d');var dpr=Math.min(2,window.devicePixelRatio||1);canvas.width=390*dpr;canvas.height=600*dpr;ctx.scale(dpr,dpr);makeBackdrop();
      canvas.addEventListener('pointerdown',function(e){if(e.button!==0&&e.pointerType==='mouse')return;e.preventDefault();flap();});
      canvas.addEventListener('keydown',function(e){if(e.code==='Space'||e.code==='ArrowUp'){e.preventDefault();if(!e.repeat)flap();}else if(e.code==='Escape')pause();});
      document.querySelector('.cooler-flight').addEventListener('click',function(e){if(e.target.closest('.cooler-flight__back')){e.preventDefault();e.stopPropagation();cleanup();if(typeof window.setView==='function')window.setView('profile',{fromBack:true});else location.href='/';return;}var b=e.target.closest('[data-flight-action]');if(b)action(b.dataset.flightAction);var m=e.target.closest('[data-flight-mode]');if(m){if(phase==='playing'||phase==='paused'||phase==='countdown'||phase==='waiting'){status('Завершите полёт или отмените дуэль, чтобы сменить режим.');return;}generation++;stopPolling();room=null;runId='';mode=m.dataset.flightMode;document.querySelectorAll('[data-flight-mode]').forEach(function(n){n.setAttribute('aria-pressed',n===m?'true':'false');});status('');ready();}});
      ui.pause.addEventListener('click',pause);document.getElementById('coolerFlightTop').addEventListener('click',showTop);
      document.getElementById('coolerFlightSound').addEventListener('click',function(){sound=!sound;this.setAttribute('aria-pressed',String(sound));this.setAttribute('aria-label',sound?'Выключить звук':'Включить звук');tone(660,.1);});
      new MutationObserver(function(){if(!active())cleanup();}).observe(document.body,{attributes:true,attributeFilter:['data-view']});
      document.addEventListener('visibilitychange',function(){if(!active())return;if(document.hidden){if(mode==='solo')pause();else if(phase==='playing'||phase==='countdown'){abandon();stopPolling();phase='over';panel('<h2>Ты вышел из дуэли</h2><p>При сворачивании полёт завершается. Можно создать новую дуэль.</p>'+button('rematch','Новая дуэль'));}if(raf)cancelAnimationFrame(raf);raf=0;}else ensureLoop();});
      window.addEventListener('pagehide',cleanup);
    }
    readBest();ready();
    var code=window.__pendingCoolerDuel;window.__pendingCoolerDuel='';
    if(code){mode='duel';document.querySelectorAll('[data-flight-mode]').forEach(function(n){n.setAttribute('aria-pressed',n.dataset.flightMode==='duel'?'true':'false');});joinRoom(code);}
  };
})();
