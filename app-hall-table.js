(function () {
  'use strict';
  var audio,cardGame,cardAccount;
  function game(){var auth=window.__pokerTelegramAuth||{},account=String(auth.accountId||auth.id||auth.user?.id||"guest");if(!cardGame||cardAccount!==account){cardAccount=account;var storage;try{storage=window.localStorage;}catch(_){storage={getItem:function(){return null;},setItem:function(){}};}cardGame=window.PokerHallCardPick.create({storage:storage,account:account});}return cardGame;}
  function esc(value) { return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  window.pokerHallTableHtml = function (hall) {
    var p = hall.levelProgress || {}, level = Math.max(0, Number(hall.garage && hall.garage.stats && hall.garage.stats.level) || 0);
    return '<div class="hall-table" data-card-effect="'+(window.PokerHallCardPick&&game().effect()?.id||'')+'" data-table-level="' + level + '" data-table-xp="' + esc(p.xp == null ? '' : p.xp) + '" data-table-target="' + esc(p.target == null ? '' : p.target) + '">' +
      '<button type="button" class="hall-table__glass" data-table-action="glass" aria-label="Коснуться стакана — звон льда" title="Звон льда"><span class="hall-table__liquid" aria-hidden="true"></span><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i></button>' +
      '<button type="button" class="hall-table__chips" data-table-action="chips" aria-label="Фишки Poker21 — прогресс уровня" title="Ваш уровень"><span class="hall-table__stack" aria-hidden="true">' + Array.from({length:5}, function (_, i) { return '<i style="--chip:' + i + '"></i>'; }).join('') + '</span></button>' +
      '<button type="button" class="hall-table__deck" data-table-action="chest" aria-label="Открыть шкатулку — выбрать одну из трёх карт" title="Три карты Манки"><span aria-hidden="true">♠</span></button>' +
      '<button type="button" class="hall-table__prediction-link" data-table-action="prediction" aria-label="Покерное предсказание">♠ Предсказание</button>'+
      '<span class="hall-table__hint">Коснитесь предметов</span><span class="hall-table__status" role="status"></span></div>';
  };
  function animate(node, frames, duration, delay) {
    if (node && node.animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) node.animate(frames, { duration: duration, delay: delay || 0, easing: 'cubic-bezier(.2,.7,.3,1)' });
  }
  function clink() {
    try {
      var Context = window.AudioContext || window.webkitAudioContext;
      if (!Context) return;
      if (!audio) audio = new Context();
      if (audio.state === 'suspended') audio.resume().catch(function () {});
      [0, .065, .15].forEach(function (delay, n) {
        var oscillator = audio.createOscillator(), gain = audio.createGain(), start = audio.currentTime + delay;
        oscillator.type = 'sine'; oscillator.frequency.setValueAtTime([2450, 3190, 2780][n], start);
        gain.gain.setValueAtTime(0, start); gain.gain.linearRampToValueAtTime(.035, start + .004); gain.gain.exponentialRampToValueAtTime(.0001, start + .18);
        oscillator.connect(gain); gain.connect(audio.destination); oscillator.start(start); oscillator.stop(start + .19);
        oscillator.onended = function () { oscillator.disconnect(); gain.disconnect(); };
      });
    } catch (_) {}
  }
  function chipClack(delay){try{var Context=window.AudioContext||window.webkitAudioContext;if(!Context)return;if(!audio)audio=new Context();if(audio.state==='suspended')audio.resume().catch(function(){});var buffer=audio.createBuffer(1,Math.floor(audio.sampleRate*.045),audio.sampleRate),samples=buffer.getChannelData(0);for(var i=0;i<samples.length;i++)samples[i]=(Math.random()*2-1)*Math.exp(-i/(audio.sampleRate*.008));var source=audio.createBufferSource(),filter=audio.createBiquadFilter(),gain=audio.createGain();source.buffer=buffer;filter.type='bandpass';filter.frequency.value=1450;filter.Q.value=.8;gain.gain.value=.045;source.connect(filter);filter.connect(gain);gain.connect(audio.destination);source.start(audio.currentTime+(delay||0));source.onended=function(){source.disconnect();filter.disconnect();gain.disconnect();};}catch(_){}}
  function panel(title, content, kind) {
    var d = document.createElement('dialog'); d.className = 'hall-table-dialog hall-table-dialog--' + kind;
    d.setAttribute('aria-labelledby', 'hallTableTitle');
    d.innerHTML = '<button type="button" class="hall-table-dialog__close" aria-label="Закрыть">×</button><span class="hall-table-dialog__suit" aria-hidden="true">♠</span><small>ДВА ТУЗА · ВАШ СТОЛИК</small><h2 id="hallTableTitle">' + title + '</h2>' + content;
    document.body.appendChild(d); d.querySelector('button').onclick = function () { d.close(); };
    d.addEventListener('click', function (e) { if (e.target === d) { var r = d.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close(); } });
    d.addEventListener('close', function () { d.remove(); }, {once:true}); d.showModal();
    animate(d, [{opacity:0,transform:'translateY(12px) rotate(-2deg)'},{opacity:1,transform:'translateY(0) rotate(0)'}], 360);return d;
  }
  async function prediction(){if(typeof window.getPokerDailyPredictionForToday!=='function'&&window.pokerEnsureLazyDomains)await window.pokerEnsureLazyDomains(['learning'],{scripts:true,styles:false});if(typeof window.getPokerDailyPredictionForToday!=='function')throw Error('prediction_unavailable');return window.getPokerDailyPredictionForToday();}
  function openChest(table){
    if(!window.PokerHallCardPick)return;
    var g=game(),state=g.state(),d=panel('Три карты Манки','<div class="hall-card-chest" aria-hidden="true"><i></i><span>♠</span></div><p class="hall-card-instruction">Угадай, где туз. Один выбор в день.</p><div class="hall-card-hand">'+[0,1,2].map(function(i){return '<button type="button" class="hall-pick-card" data-pick-card="'+i+'" aria-label="Выбрать карту '+(i+1)+'"><span class="hall-pick-card__back">♠</span><span class="hall-pick-card__face"></span></button>';}).join('')+'</div><p class="hall-card-result" role="status" aria-live="polite"></p><small>Туз открывает оформление столика до конца дня.<br>Другие карты — покерное предсказание.</small>','cards');
    function reveal(result,animateCards){d.classList.add('hall-card-picked');d.querySelectorAll('[data-pick-card]').forEach(function(card,i){card.disabled=true;card.classList.toggle('hall-pick-card--chosen',i===result.choice);var face=card.querySelector('.hall-pick-card__face');face.textContent=i===result.ace?'A ♠':i<result.ace?'K ♦':'Q ♥';if(i!==result.ace)face.classList.add('hall-pick-card__face--red');card.setAttribute('aria-label',(i===result.choice?'Ваш выбор: ':'')+face.textContent);if(animateCards)animate(card,[{transform:'rotateY(90deg)'},{transform:'rotateY(0)'}],450,i*90);});d.querySelector('.hall-card-instruction').textContent=result.won?'Туз найден!':'Сегодня туз оказался в другой карте.';var output=d.querySelector('.hall-card-result');if(result.won){output.textContent=result.reward.title+' · '+result.reward.text;document.querySelectorAll('.hall-table').forEach(function(t){t.dataset.cardEffect=result.reward.id;});}else{output.textContent='Открываем предсказание…';prediction().then(function(text){if(d.isConnected)output.textContent=text;}).catch(function(){if(d.isConnected)output.textContent='Манки советует сегодня беречь терпение: хорошая карта любит выдержку.';});}}
    d.addEventListener('click',function(e){var card=e.target.closest('[data-pick-card]');if(!card||card.disabled)return;reveal(g.choose(Number(card.dataset.pickCard)),true);});
    if(state.choice!==null)reveal(g.choose(state.choice),false);
  }
  document.addEventListener('click', async function (event) {
    var button = event.target.closest('[data-table-action]'); if (!button || button.disabled) return;
    var table = button.closest('.hall-table'), hall = button.closest('.player-hall-dialog'), action = button.dataset.tableAction;
    if (!hall || !hall.open) return;
    event.preventDefault(); event.stopPropagation();
    if(action==='chest'){animate(button,[{transform:'rotateX(0)'},{transform:'rotateX(-28deg)'},{transform:'rotateX(0)'}],450);openChest(table);return;}
    if (action === 'glass') {
      if (button._lastClink && Date.now() - button._lastClink < 1150) return; button._lastClink = Date.now(); clink();
      animate(button.querySelector('.hall-table__liquid'), [
        {transform:'translateY(0) rotate(0) scale(1)',opacity:.5},
        {transform:'translateY(-20%) rotate(18deg) scale(1.12,1.5)',opacity:1,offset:.18},
        {transform:'translateY(12%) rotate(-14deg) scale(1.08,1.25)',opacity:.9,offset:.4},
        {transform:'translateY(-8%) rotate(8deg) scale(1.05,1.15)',opacity:.8,offset:.64},
        {transform:'translateY(0) rotate(-3deg) scale(1)',opacity:.65,offset:.82},
        {transform:'translateY(0) rotate(0) scale(1)',opacity:.5}
      ], 1250);
      button.querySelectorAll('i').forEach(function (ice, n) {
        var direction = n % 2 ? -1 : 1;
        animate(ice, [
          {transform:'translate(0,0) rotate(15deg)',opacity:.5},
          {transform:'translate(' + direction * 85 + '%,-70%) rotate(' + direction * 65 + 'deg)',opacity:1,offset:.18},
          {transform:'translate(' + direction * -65 + '%,35%) rotate(' + direction * -35 + 'deg)',opacity:.95,offset:.42},
          {transform:'translate(' + direction * 35 + '%,-25%) rotate(' + direction * 35 + 'deg)',opacity:.85,offset:.65},
          {transform:'translate(' + direction * -12 + '%,10%) rotate(7deg)',opacity:.7,offset:.83},
          {transform:'translate(0,0) rotate(15deg)',opacity:.5}
        ], 1100 + n * 65);
      }); return;
    }
    if (action === 'chips') {
      button.disabled = true;
      button.querySelectorAll('i').forEach(function (chip, n) {
        var side=n%2?-1:1,delay=(4-n)*65;
        animate(chip,[
          {transform:'translate(0,0) rotate(0) scaleY(1)'},
          {transform:'translate('+side*12+'%,-80%) rotate('+side*9+'deg) scaleY(1.15)',offset:.25},
          {transform:'translate('+side*26+'%,-170%) rotate('+side*18+'deg) scaleY(1.7)',offset:.48},
          {transform:'translate('+side*4+'%,8%) rotate('+side*-4+'deg) scaleY(.88)',offset:.78},
          {transform:'translate(0,-12%) rotate(2deg) scaleY(1.06)',offset:.9},
          {transform:'translate(0,0) rotate(0) scaleY(1)'}
        ],900+n*45,delay);
        chipClack((delay+(900+n*45)*.78)/1000);
      });
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) await new Promise(function(resolve){setTimeout(resolve,1250);});
      button.disabled = false;
      if (!button.isConnected || !hall.open) return;
      var level = Number(table.dataset.tableLevel), xp = table.dataset.tableXp, target = Number(table.dataset.tableTarget), known = xp !== '' && target > 0;
      panel('Уровень ' + level, known ? '<p>Опыт до следующего уровня</p><progress max="' + target + '" value="' + Math.min(target, Number(xp)) + '"></progress><strong class="hall-table-dialog__xp">' + Number(xp).toLocaleString('ru-RU') + ' / ' + target.toLocaleString('ru-RU') + '</strong><p>До уровня ' + (level + 1) + ' осталось ' + Math.max(0, target - Number(xp)).toLocaleString('ru-RU') + ' опыта.</p>' : '<p>' + (target === 0 && xp !== '' ? 'Максимальный уровень клуба достигнут.' : 'Играйте в клубе и собирайте опыт — ваша стопка растёт вместе с уровнем.') + '</p>', 'level'); return;
    }
    button.disabled = true; var status = table.querySelector('[role="status"]'); status.textContent = 'Вытягиваем карту…';
    animate(button.querySelector('span'), [{transform:'translateY(0) rotate(0)'},{transform:'translateY(-18px) rotate(-12deg)'},{transform:'translateY(-6px) rotate(5deg)'},{transform:'translateY(0) rotate(0)'}], 650);
    try {
      if (typeof window.getPokerDailyPredictionForToday !== 'function' && window.pokerEnsureLazyDomains) await window.pokerEnsureLazyDomains(['learning'], {scripts:true,styles:false});
      if (!button.isConnected || !hall.open) return;
      if (typeof window.getPokerDailyPredictionForToday !== 'function') throw new Error('prediction_unavailable');
      var text = window.getPokerDailyPredictionForToday();
      if (!text) throw new Error('prediction_empty');
      if (typeof window.markDailyPredictionRead === 'function') window.markDailyPredictionRead();
      if (typeof window.updateDailyPredictionBadge === 'function') window.updateDailyPredictionBadge();
      status.textContent = ''; panel('Ваша карта на сегодня', '<p class="hall-table-dialog__prediction">' + esc(text) + '</p><small>Завтра колода приготовит новое предсказание.</small>', 'prediction');
    } catch (_) { if (button.isConnected) status.textContent = 'Не удалось вытянуть карту. Нажмите на колоду ещё раз.'; }
    finally { button.disabled = false; }
  });
  ['poker-telegram-auth','poker-auth-changed'].forEach(function (name) { window.addEventListener(name, function () { document.querySelectorAll('.hall-table-dialog').forEach(function (d) { d.close(); }); }); });
})();
