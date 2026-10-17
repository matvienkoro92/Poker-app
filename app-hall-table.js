(function () {
  'use strict';
  var audio,cardGame,cardAccount;
  function game(){var auth=window.__pokerTelegramAuth||{},account=String(auth.accountId||auth.id||auth.user?.id||"guest");if(!cardGame||cardAccount!==account){cardAccount=account;var storage;try{storage=window.localStorage;}catch(_){storage={getItem:function(){return null;},setItem:function(){}};}cardGame=window.PokerHallCardPick.create({storage:storage,account:account,canReplay:function(){return window.__pokerTelegramAuth?.adminAccess===true;}});}return cardGame;}
  function esc(value) { return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  window.pokerHallTableHtml = function (hall) {
    var p = hall.levelProgress || {}, level = Math.max(0, Number(hall.garage && hall.garage.stats && hall.garage.stats.level) || 0);
    return '<div class="hall-table" data-card-effect="'+(window.PokerHallCardPick&&game().effect()?.id||'')+'" data-table-level="' + level + '" data-table-xp="' + esc(p.xp == null ? '' : p.xp) + '" data-table-target="' + esc(p.target == null ? '' : p.target) + '">' +
      '<button type="button" class="hall-table__glass" data-table-action="glass" aria-label="Коснуться стакана — звон льда" title="Звон льда"><span class="hall-table__liquid" aria-hidden="true"></span><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i></button>' +
      '<button type="button" class="hall-table__chips" data-table-action="chips" aria-label="Фишки Poker21 — прогресс уровня" title="Ваш уровень"><span class="hall-table__stack" aria-hidden="true">' + Array.from({length:4}, function (_, i) { return '<i style="--chip:' + i + '"><svg class="hall-chip-face" viewBox="0 0 100 100" preserveAspectRatio="none"><circle cx="50" cy="50" r="48" fill="#9c252d" stroke="#240e12" stroke-width="3"/><circle cx="50" cy="50" r="42" fill="none" stroke="#e8dfbd" stroke-width="10" stroke-dasharray="13 20"/><circle cx="50" cy="50" r="32" fill="#172226" stroke="#d6b369" stroke-width="2"/><text x="50" y="47" text-anchor="middle" fill="#ffe4a2" font-family="Arial" font-size="15" font-weight="900">POKER</text><text x="50" y="68" text-anchor="middle" fill="#fff0bd" font-family="Arial" font-size="25" font-weight="900">21</text></svg></i>'; }).join('') + '</span></button>' +
      '<button type="button" class="hall-table__deck" data-table-action="chest" aria-label="Открыть шкатулку — ежедневный бонус" title="Ежедневный бонус" aria-expanded="false"><span class="hall-chest-interior" aria-hidden="true"><i>♠</i><i>♠</i><i>♠</i></span><span class="hall-chest-lid" aria-hidden="true">♠</span></button>' +
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
  async function openChest(table){
    if(!window.PokerHallCardPick)return;
    var remote;try{remote=await pokerSocialRequest('hall-card-pick',{action:'get'});}catch(e){panel('Три карты Манки','<p role="status">'+esc(e.message||'Игра временно недоступна')+'</p>','cards');return;}var g={canReplay:function(){return remote.admin===true;},choose:async function(index){remote=await pokerSocialRequest('hall-card-pick',{action:'choose',choice:index});return remote.state;},restart:async function(){await pokerSocialRequest('hall-card-pick',{action:'restart'});}},state=remote.state,busy=false,reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var d=panel('Три карты Манки','<p class="hall-card-instruction">Перемешиваем колоду…</p><div class="hall-card-hand" data-phase="shuffle">'+[0,1,2].map(function(i){return '<button type="button" class="hall-pick-card" style="--card:'+i+'" data-pick-card="'+i+'" disabled aria-label="Выбрать карту '+(i+1)+'"><span class="hall-pick-card__inner"><span class="hall-pick-card__back"><small>TWO ACES</small><b>♠</b><small>POKER21</small></span><span class="hall-pick-card__face"></span></span></button>';}).join('')+'</div><p class="hall-card-result" role="status" aria-live="polite"></p><div class="hall-card-rules"><strong>Найдите туза</strong><span>Туз: чай/кофе (60%), скидка 100 ₽ на взнос от 500 ₽ (30%) или бонус 200 ₽ на взнос от 1 000 ₽ (10%). Шанс найти туза — 1 из 3. Одна попытка в день; один клубный приз за 7 дней. Купон действует 7 дней. Скидки и бонусы не суммируются, не обмениваются на деньги. Король и дама — предсказание.</span></div>','cards');
    function coupons(){return (remote.admin?'<p>Администратор: тестовая игра без выдачи реальных купонов.</p>':remote.nextClubPrizeAt>Date.now()?'<p>Следующий клубный приз — после '+new Date(remote.nextClubPrizeAt).toLocaleString('ru-RU')+'. Пока за туза выдаётся оформление столика.</p>':'')+'<div class="hall-card-coupons"><strong>Ваши купоны</strong>'+((remote.coupons||[]).length?remote.coupons.map(function(c){return '<p><b>'+esc(c.prize.title)+'</b><br>'+esc(c.prize.text)+'<br>'+ (c.redeemedAt?'Погашен':Date.now()>=c.expiresAt?'Истёк':'Действует до '+new Date(c.expiresAt).toLocaleString('ru-RU'))+'<br><small>Код: '+esc(c.id)+'</small></p>';}).join(''):'<p>Пока нет купонов</p>')+'</div>'+(remote.admin?'<label>Код купона игрока<input data-coupon-code autocomplete="off" placeholder="Вставьте код купона"></label><button type="button" data-coupon-redeem>Проверить и погасить</button><p data-coupon-status role="status"></p>':'');}d.querySelector('.hall-card-rules').insertAdjacentHTML('beforeend',coupons());
 var cards=Array.from(d.querySelectorAll('[data-pick-card]')),hand=d.querySelector('.hall-card-hand'),output=d.querySelector('.hall-card-result');
    function delay(ms){return new Promise(function(resolve){setTimeout(resolve,reduced?0:ms);});}
    function showFace(card,index,result){var ace=index===result.ace,other=[0,1,2].filter(function(i){return i!==result.ace;}).indexOf(index),rank=ace?'A':other===0?'K':'Q',suit=ace?'♠':other===0?'♦':'♥',face=card.querySelector('.hall-pick-card__face');face.classList.toggle('hall-pick-card__face--red',!ace);face.innerHTML='<span class="hall-card-corner">'+rank+'<small>'+suit+'</small></span><b>'+suit+'</b><span class="hall-card-corner hall-card-corner--bottom">'+rank+'<small>'+suit+'</small></span>';card.setAttribute('aria-label',(index===result.choice?'Ваш выбор: ':'')+rank+' '+suit);card.classList.add('hall-pick-card--revealed');}
    async function reveal(result,animated){busy=true;hand.dataset.phase='reveal';cards.forEach(function(card,i){card.disabled=true;card.classList.toggle('hall-pick-card--chosen',i===result.choice);});d.querySelector('.hall-card-instruction').textContent='Ваш выбор сделан';showFace(cards[result.choice],result.choice,result);if(animated)await delay(650);if(!d.isConnected)return;for(var i=0;i<3;i++)if(i!==result.choice){showFace(cards[i],i,result);if(animated)await delay(160);}if(!d.isConnected)return;hand.dataset.phase='done';d.classList.add(result.won?'hall-card-won':'hall-card-lost');d.querySelector('.hall-card-instruction').textContent=result.won?'Туз ваш!':'Туз был рядом';if(result.won){output.innerHTML='<strong>'+esc(result.reward.title)+'</strong><span>'+esc(result.reward.text)+'</span>'+(result.message?'<span>'+esc(result.message)+'</span>':'');document.querySelectorAll('.hall-table').forEach(function(t){t.dataset.cardEffect=result.reward.id;});}else{output.textContent='Ваша карта принесла предсказание…';try{var text=await prediction();if(d.isConnected)output.textContent=text;}catch(_){if(d.isConnected)output.textContent='Манки советует сегодня беречь терпение: хорошая карта любит выдержку.';}}var rules=d.querySelector('.hall-card-rules');rules.innerHTML=g.canReplay()?'<strong>Режим администратора · без лимита попыток</strong><span>Тестовые попытки не выдают настоящие купоны.</span><button type="button" data-card-replay>Перемешать ещё раз</button>':'<strong>Выбор сохранён</strong><span>Завтра можно снова найти туза. Сегодня результат уже не изменится.</span>';rules.insertAdjacentHTML('beforeend',coupons());busy=false;}
    d.addEventListener('click',async function(e){if(e.target.closest('[data-coupon-redeem]')){var status=d.querySelector('[data-coupon-status]'),id=d.querySelector('[data-coupon-code]').value.trim();try{var check=await pokerSocialRequest('hall-card-pick',{action:'inspect',couponId:id});if(check.coupon.redeemedAt||Date.now()>=check.coupon.expiresAt)throw Error('Купон уже использован или истёк');if(!window.confirm('Выдать «'+check.coupon.prize.title+'» игроку '+check.coupon.accountId+'?\n'+check.coupon.prize.text+'\nПогасить купон после выдачи?'))return;await pokerSocialRequest('hall-card-pick',{action:'redeem',couponId:id});status.textContent='Купон погашен. Повторная выдача невозможна.';}catch(err){status.textContent=err.message||'Не удалось погасить купон';}return;}if(e.target.closest('[data-card-replay]')&&!busy&&g.canReplay()){try{await g.restart();d.close();d.remove();openChest(table);}catch(err){output.textContent=err.message||'Не удалось начать новую попытку';}return;}var card=e.target.closest('[data-pick-card]');if(!card||card.disabled||busy)return;busy=true;card.disabled=true;try{await reveal(await g.choose(Number(card.dataset.pickCard)),true);}catch(err){busy=false;cards.forEach(function(c){c.disabled=false;});output.textContent=err.message||'Не удалось сохранить выбор. Повторите попытку.';}});
    if(state.choice!==null){reveal(state,false);}else{setTimeout(function(){if(!d.isConnected)return;hand.dataset.phase='ready';cards.forEach(function(c){c.disabled=false;});d.querySelector('.hall-card-instruction').textContent=remote.admin?'Тест администратора · выберите карту':'Выберите одну из трёх карт';},reduced?0:1100);}
  }
  async function handleTableAction(event) {
    var button = event.target.closest('[data-table-action]'); if(!button){document.querySelectorAll('.hall-table__deck--open').forEach(function(box){box.classList.remove('hall-table__deck--open');box.setAttribute('aria-expanded','false');});return;}if(button.disabled)return;
    var table = button.closest('.hall-table'), hall = button.closest('.player-hall-dialog'), action = button.dataset.tableAction;
    if (!hall || !hall.open) return;
    event.preventDefault(); event.stopPropagation();
    if(action==='chest'){
      button.disabled=true;button.classList.add('hall-table__deck--open');button.setAttribute('aria-expanded','true');
      try{
        await new Promise(function(resolve){setTimeout(resolve,window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:360);});
        if(!button.isConnected||!hall.open)return;
        var bonus=panel('Ежедневный бонус','<p class="hall-table-dialog__prediction">Здесь скоро будет ежедневный бонус</p>','bonus');
        bonus.addEventListener('close',function(){button.classList.remove('hall-table__deck--open');button.setAttribute('aria-expanded','false');if(button.isConnected&&hall.open)button.focus();},{once:true});
      }finally{button.disabled=false;}
      return;
    }
    if (action === 'glass') {
      if (button._lastClink && Date.now() - button._lastClink < 1150) return; button._lastClink = Date.now(); clink();button.classList.remove('hall-table__glass--clink');void button.offsetWidth;button.classList.add('hall-table__glass--clink');setTimeout(function(){button.classList.remove('hall-table__glass--clink');},1500);
      return;
    }
    if (action === 'chips') {
      button.disabled = true;
      button.classList.remove('hall-table__chips--shuffle');void button.offsetWidth;button.classList.add('hall-table__chips--shuffle');
      button.querySelectorAll('i').forEach(function(chip,n){chipClack(((3-n)*65+850)/1000);});
      await new Promise(function(resolve){setTimeout(resolve,window.matchMedia('(prefers-reduced-motion: reduce)').matches?220:1250);});
      button.disabled = false;button.classList.remove('hall-table__chips--shuffle');
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
  }
  // WebViews can suppress the compatibility click after a touch on a transformed scene.
  // Handle a real tap directly, without also handling the generated click.
  var tableTouch;
  document.addEventListener('touchstart',function(event){
    var button=event.target.closest&&event.target.closest('[data-table-action="glass"],[data-table-action="chips"],[data-table-action="chest"]');
    var point=event.touches.length===1&&event.touches[0];
    tableTouch=button&&point?{button:button,x:point.clientX,y:point.clientY,moved:false}:null;
  },{passive:true,capture:true});
  document.addEventListener('touchmove',function(event){
    if(!tableTouch)return;var point=event.touches[0];
    if(!point||event.touches.length!==1||Math.abs(point.clientX-tableTouch.x)>12||Math.abs(point.clientY-tableTouch.y)>12)tableTouch.moved=true;
  },{passive:true,capture:true});
  document.addEventListener('touchcancel',function(){tableTouch=null;},{passive:true,capture:true});
  document.addEventListener('touchend',function(event){
    var touch=tableTouch;tableTouch=null;
    if(!touch||touch.moved||event.touches.length||!touch.button.isConnected)return;
    var point=event.changedTouches[0],rect=touch.button.getBoundingClientRect();
    if(!point||point.clientX<rect.left||point.clientX>rect.right||point.clientY<rect.top||point.clientY>rect.bottom)return;
    event.preventDefault();touch.button._tableTouchHandledAt=Date.now();
    handleTableAction(event);
  },{passive:false,capture:true});
  document.addEventListener('click',function(event){
    var button=event.target.closest&&event.target.closest('[data-table-action]');
    if(button&&event.detail!==0&&Date.now()-(button._tableTouchHandledAt||0)<900){event.preventDefault();return;}
    handleTableAction(event);
  });
  ['poker-telegram-auth','poker-auth-changed'].forEach(function (name) { window.addEventListener(name, function () { document.querySelectorAll('.hall-table-dialog').forEach(function (d) { d.close(); }); }); });
})();
