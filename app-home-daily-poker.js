/* Mount the existing game on home; keep one table and one server play handler. */
(function () {
  'use strict';
  var pending=null, ready=false, dialog=null;
  function activeHome(){return !!document.querySelector('[data-view="home"].view--active');}
  function mount(){
    var host=document.querySelector('[data-home-daily-mount]');
    if(!host||!activeHome())return Promise.resolve();
    if(pending)return pending;
    if(ready){window.pokerMountDailyPokerTable(host);window.initDailyPoker();return Promise.resolve();}
    pending=Promise.all([
      window.pokerEnsureViewHtml?window.pokerEnsureViewHtml('daily-poker'):Promise.resolve(),
      window.pokerEnsureViewStyles?window.pokerEnsureViewStyles('daily-poker'):Promise.resolve(),
      window.pokerEnsureViewScripts?window.pokerEnsureViewScripts('daily-poker'):Promise.resolve()
    ]).then(function(){
      if(typeof window.pokerMountDailyPokerTable!=='function')throw Error('Игра пока недоступна');
      ready=true;
      if(!activeHome())return;
      window.pokerMountDailyPokerTable(host);
      host.setAttribute('aria-busy','false');
      window.initDailyPoker();
    }).catch(function(){
      host.setAttribute('aria-busy','false');
      host.innerHTML='<p class="home-daily-poker__loading">Не удалось подготовить стол.</p><button type="button" data-home-daily-retry>Попробовать ещё раз</button>';
    }).finally(function(){pending=null;});
    return pending;
  }
  function rules(){
    if(!dialog){dialog=document.createElement('dialog');dialog.className='home-daily-rules';dialog.setAttribute('aria-label','Правила раздачи дня');document.body.appendChild(dialog);}
    // Use the live prize list as the source, so home never invents different rewards.
    var prizes=document.querySelector('[data-view="daily-poker"] .daily-poker__prizes');
    var rows=prizes?Array.from(prizes.children).map(function(li){var row=document.createElement('li');row.textContent=li.getAttribute('aria-label')||li.textContent;return row;}):[];
    dialog.innerHTML='<header><h2>Раздача дня</h2><button type="button" data-home-daily-close aria-label="Закрыть правила">×</button></header><p>Одна бесплатная попытка каждые 24 часа. Дополнительные попытки показываются на столе.</p><ul></ul><p>Карманная карта должна собрать или усилить комбинацию. Один кикер не считается.</p><button type="button" data-view-target="daily-poker" data-home-daily-details>Победители и все подробности →</button>';
    rows.forEach(function(row){dialog.querySelector('ul').appendChild(row);});
    if(!dialog.open)dialog.showModal();
  }
  document.addEventListener('click',function(e){
    if(e.target.closest('[data-home-daily-retry]'))mount();
    if(e.target.closest('[data-home-daily-rules]')){mount().then(rules);}
    if(e.target.closest('[data-home-daily-close],[data-home-daily-details]')&&dialog)dialog.close();
  });
  window.pokerMountHomeDailyPoker=mount;
  function start(){
    var home=document.querySelector('.view[data-view="home"]');if(!home)return;
    new MutationObserver(function(){if(activeHome())mount();}).observe(home,{attributes:true,attributeFilter:['class']});
    mount();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
