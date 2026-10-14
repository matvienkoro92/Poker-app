(function () {
  'use strict';
  var audio;
  function esc(value) { return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  window.pokerHallTableHtml = function (hall) {
    var p = hall.levelProgress || {}, level = Math.max(0, Number(hall.garage && hall.garage.stats && hall.garage.stats.level) || 0);
    return '<div class="hall-table" data-table-level="' + level + '" data-table-xp="' + esc(p.xp == null ? '' : p.xp) + '" data-table-target="' + esc(p.target == null ? '' : p.target) + '">' +
      '<button type="button" class="hall-table__glass" data-table-action="glass" aria-label="Коснуться стакана — звон льда" title="Звон льда"><span class="hall-table__liquid" aria-hidden="true"></span><i aria-hidden="true"></i><i aria-hidden="true"></i></button>' +
      '<button type="button" class="hall-table__chips" data-table-action="chips" aria-label="Фишки — прогресс уровня" title="Ваш уровень"><span class="hall-table__stack" aria-hidden="true">' + Array.from({length:7}, function (_, i) { return '<i style="--chip:' + i + '"></i>'; }).join('') + '</span></button>' +
      '<button type="button" class="hall-table__deck" data-table-action="prediction" aria-label="Вытянуть покерное предсказание" title="Покерное предсказание"><span aria-hidden="true">♠</span></button>' +
      '<span class="hall-table__hint">Коснитесь предметов</span><span class="hall-table__status" role="status"></span></div>';
  };
  function animate(node, frames, duration) {
    if (node && node.animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) node.animate(frames, { duration: duration, easing: 'cubic-bezier(.2,.7,.3,1)' });
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
  function panel(title, content, kind) {
    var d = document.createElement('dialog'); d.className = 'hall-table-dialog hall-table-dialog--' + kind;
    d.setAttribute('aria-labelledby', 'hallTableTitle');
    d.innerHTML = '<button type="button" class="hall-table-dialog__close" aria-label="Закрыть">×</button><span class="hall-table-dialog__suit" aria-hidden="true">♠</span><small>ДВА ТУЗА · ВАШ СТОЛИК</small><h2 id="hallTableTitle">' + title + '</h2>' + content;
    document.body.appendChild(d); d.querySelector('button').onclick = function () { d.close(); };
    d.addEventListener('click', function (e) { if (e.target === d) { var r = d.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close(); } });
    d.addEventListener('close', function () { d.remove(); }, {once:true}); d.showModal();
    animate(d, [{opacity:0,transform:'translateY(12px) rotate(-2deg)'},{opacity:1,transform:'translateY(0) rotate(0)'}], 360);
  }
  document.addEventListener('click', async function (event) {
    var button = event.target.closest('[data-table-action]'); if (!button || button.disabled) return;
    var table = button.closest('.hall-table'), hall = button.closest('.player-hall-dialog'), action = button.dataset.tableAction;
    if (!hall || !hall.open) return;
    event.preventDefault(); event.stopPropagation();
    if (action === 'glass') {
      if (button._lastClink && Date.now() - button._lastClink < 650) return; button._lastClink = Date.now(); clink();
      animate(button.querySelector('.hall-table__liquid'), [{transform:'rotate(0)'},{transform:'rotate(9deg)'},{transform:'rotate(-6deg)'},{transform:'rotate(3deg)'},{transform:'rotate(0)'}], 850);
      button.querySelectorAll('i').forEach(function (ice, n) { animate(ice, [{transform:'translate(0,0) rotate(15deg)'},{transform:'translate(' + (n ? -3 : 3) + 'px,-2px) rotate(35deg)'},{transform:'translate(0,0) rotate(15deg)'}], 650); }); return;
    }
    if (action === 'chips') {
      button.querySelectorAll('i').forEach(function (chip, n) { animate(chip, [{transform:'translateY(' + (-24 - n * 4) + 'px)',opacity:0},{transform:'translateY(0)',opacity:1}], 260 + n * 55); });
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
