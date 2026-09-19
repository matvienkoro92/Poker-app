(function(){
  'use strict';
  var generation=0,serial=0,mine=false,cursor=null,rows=[],thread=null,busy=false,imageData='',imageBusy=false,formKey='',replyKey='',parentId='',handMetric='bb',listMetric='bb',listMode='all';
  var answerObserver=null,viewerId='',activity=null;
  function esc(s){return pokerSocialEscape(s);}
  function api(b){var gen=generation;return pokerSocialRequest('club-reviews',b).then(function(d){if(gen===generation){if(d.activity)activity=d.activity;if(d.accountId)viewerId=d.accountId;}return d;});}
  function activityHtml(){
    if(!activity)return '';
    var target=Number(activity.target)||5;
    function track(label,value){return '<div class="review-activity__heading"><strong>'+label+'</strong><span>'+value+' / '+target+'</span></div><div class="review-activity__track" role="progressbar" aria-label="'+label+'" aria-valuemin="0" aria-valuemax="'+target+'" aria-valuenow="'+value+'">'+Array.from({length:target},function(_,i){return '<i'+(i<value?' class="is-filled"':'')+'></i>';}).join('')+'</div>';}
    var publicationProgress=Number(activity.publicationProgress)||0,commentProgress=Number(activity.commentProgress)||0;
    return '<section class="review-activity" aria-label="Награды за активность">'+track('Публикации раздач',publicationProgress)+track('Полезные комментарии',commentProgress)+'<p>Публикации сегодня: '+Number(activity.publicationsToday)+' / '+Number(activity.publicationLimit)+'</p>'+(activity.spinsAvailable?'<button type="button" class="social-button" data-review-action="activity-play">Крутки за активность: '+Number(activity.spinsAvailable)+' →</button>':'')+'<details><summary>Как получить награды</summary><p>За каждые 5 публикаций своих раздач с вопросом — 1 крутка. До 7 публикаций в день, обновление в 00:00 МСК. Вопрос — минимум 20 букв или цифр. Повторную раздачу опубликовать нельзя.</p><p>За каждые 5 подходящих комментариев в чужих разборах — ещё 1 крутка. Для зачёта нужно от 60 букв или цифр без ссылок, цитат и эмодзи. Один зачёт на раздачу, без бессмысленных повторов и почти одинаковых комментариев. Короткие комментарии разрешены, но не дают прогресса.</p><p>Это два независимых счётчика. Прогресс и заработанные крутки не сгорают. Комментарии в своих разборах не учитываются. Нужен привязанный игровой аккаунт.</p></details></section>';
  }
  function activityNotice(d){
    if(d.activityAward)return 'Опубликовано · +1 к прогрессу'+(d.activityAward.spin?' · +1 крутка!':'');
    var reasons={author_unlinked:'игровой аккаунт автора старой раздачи не подтверждён',own_thread:'свои разборы не дают действий',unlinked:'для наград привяжите игровой аккаунт',text_rules:'для зачёта нужен текст от 60 букв/цифр без бессмысленных повторов',already_counted:'комментарий в этой раздаче уже зачтён',similar_text:'повторяющийся или почти одинаковый текст не даёт действий'};
    return 'Опубликовано'+(reasons[d.activityReason]?'. Без награды: '+reasons[d.activityReason]+'.':'');
  }
  function countedText(text){return String(text||'').normalize('NFKC').split(/\r?\n/).filter(function(line){return !/^\s*>/.test(line);}).join(' ').replace(/https?:\/\/\S+|www\.\S+|«[^»]*»|“[^”]*”|"[^"]*"/giu,'').replace(/[^\p{L}\p{N}]/gu,'').length;}
  document.addEventListener('input',function(e){if(!e.target.matches('#reviewReplyForm textarea'))return;var hint=document.getElementById('reviewActivityHint');if(hint&&thread&&thread.authorId!==viewerId)hint.textContent='Для зачёта: '+countedText(e.target.value)+' / 60 букв и цифр · один комментарий на чужую раздачу';});
  function root(){return document.getElementById('clubReviewsContent');}
  function topicPushPanel(){
    var panel=document.createElement('section');panel.className='review-topic-push';
    panel.innerHTML='<div><strong>Пуши о новых темах</strong><small>Отдельно от розыгрышей и ответов</small></div><button type="button" class="social-button" aria-pressed="false" disabled>Загрузка…</button><p role="status"></p>';
    var btn=panel.querySelector('button'),hint=panel.querySelector('p'),gen=generation;
    function active(){return gen===generation&&panel.isConnected;}
    function render(data){btn.textContent=data.subscribed?'Выключить':'Включить';btn.setAttribute('aria-pressed',String(!!data.subscribed));hint.textContent=data.subscribed&&(!data.notificationsEnabled||!data.hasSubscription)?'Подписка сохранена. Включите пуш-уведомления в профиле.':'';}
    api({action:'topic-push-status'}).then(function(data){if(active())render(data);}).catch(function(){if(active()){btn.textContent='Повторить';hint.textContent='Не удалось проверить подписку.';}}).finally(function(){if(active())btn.disabled=false;});
    btn.addEventListener('click',async function(){
      btn.disabled=true;hint.textContent='';
      try{
        var current=await api({action:'topic-push-status'});if(!active())return;render(current);
        if(!current.subscribed){
          if(typeof pokerChatPushIosNeedsStandalonePwa==='function'&&pokerChatPushIosNeedsStandalonePwa())throw new Error('На iPhone добавьте приложение на экран «Домой» и включите уведомления в профиле.');
          if(typeof Notification==='undefined'||Notification.permission!=='granted'||!navigator.serviceWorker)throw new Error('Включите пуш-уведомления в профиле и разрешите их на устройстве, затем вернитесь сюда.');
          var registration=await navigator.serviceWorker.getRegistration();
          var subscription=registration&&registration.pushManager?await registration.pushManager.getSubscription():null;
          if(!subscription)throw new Error('На этом устройстве пуши не настроены. Включите их в профиле.');
        }
        if(!active())return;
        var saved=await api({action:'topic-push-set',enabled:!current.subscribed});
        if(active()){render(saved);hint.textContent=saved.subscribed?'Пуши о новых темах включены.':'Пуши о новых темах выключены.';}
      }catch(error){if(active())hint.textContent=error.message;}
      finally{if(active())btn.disabled=false;}
    });
    return panel;
  }
  function date(s){return new Date(s).toLocaleString('ru-RU',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});}
  function feedback(text){
    var loading=/^(?:Загружаем разборы|Открываем обсуждение)/.test(text||'');
    var loader=document.getElementById('clubReviewsLoading');if(loader)loader.hidden=!loading;
    var el=document.getElementById('clubReviewsFeedback');if(el)el.textContent=loading?'':text||'';
  }
  function resetReviewsScroll(){
    var view=root()?.closest('[data-view="club-reviews"]');
    if(view)view.scrollTop=0;
    if(typeof scrollMainDocumentToTop==='function')scrollMainDocumentToTop({force:true});
  }
  function keepReviewReplyVisible(){
    var textarea=document.querySelector('[data-view="club-reviews"].view--active #reviewReplyForm textarea');
    if(!textarea||document.activeElement!==textarea)return;
    var view=textarea.closest('[data-view="club-reviews"]');
    var viewport=window.visualViewport,top=(viewport?Number(viewport.offsetTop):0)+12;
    var bottom=(viewport?Number(viewport.offsetTop)+Number(viewport.height):window.innerHeight)-16;
    if(!view)return;
    // The keyboard and each clipping ancestor can independently hide the form.
    // Reserve enough scroll room even when iOS pans the layout viewport.
    view.style.setProperty('--review-keyboard-space',Math.max(0,window.innerHeight-bottom)+'px');
    var form=textarea.closest('form'),rect=form.getBoundingClientRect();
    for(var ancestor=view;ancestor&&ancestor!==document.body;ancestor=ancestor.parentElement){
      if(/auto|scroll|hidden|clip/.test(getComputedStyle(ancestor).overflowY)){
        var bounds=ancestor.getBoundingClientRect();
        top=Math.max(top,bounds.top+12);bottom=Math.min(bottom,bounds.bottom-12);
      }
    }
    if(bottom<=top)return;
    if(rect.height>bottom-top)rect=textarea.getBoundingClientRect();
    if(rect.height>bottom-top)view.scrollTop+=rect.top-top;
    else if(rect.bottom>bottom)view.scrollTop+=rect.bottom-bottom;
    else if(rect.top<top)view.scrollTop-=top-rect.top;
  }
  function scheduleReviewReplyVisible(){[0,80,180,360,650].forEach(function(delay){setTimeout(keepReviewReplyVisible,delay);});}
  function headerAction(t){
    var host=document.getElementById('clubReviewsHeaderAction');if(!host)return;
    if(!t){host.innerHTML='';return;}
    host.innerHTML=button(t.following?'Отписаться':'Подписаться','subscribe');
    host.querySelector('[data-review-action="subscribe"]').title='Новые комментарии будут приходить в личные сообщения бота';
  }
  document.addEventListener('click',function(e){if(!e.target.closest('[data-review-back]'))return;if(thread){loadList(false);return;}setView(window.pokerReviewsReturnView||'my-summary',{fromBack:true});});
  function button(text,action,id,cls){return '<button type="button" class="social-button '+(cls||'')+'" data-review-action="'+action+'"'+(id?' data-id="'+esc(id)+'"':'')+'>'+esc(text)+'</button>';}
  function shareButtons(){return '<button type="button" class="social-button review-share-button" data-review-action="share"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 16V3m0 0L7 8m5-5 5 5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/></svg><span>Поделиться</span></button><button type="button" class="social-button review-copy-button" data-review-action="copy" aria-label="Скопировать ссылку" title="Скопировать ссылку"><svg aria-hidden="true" viewBox="0 0 24 24"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M15 9V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4"/></svg></button>';}
  function setBusy(value){busy=value;var r=root();if(r)r.querySelectorAll('button,input,textarea,select').forEach(function(el){el.disabled=value;});}
  function topicLink(id){return new URL('./?startapp=review_'+id,location.href).href;}
  function cardsText(t){return (t.cards||[]).map(function(c){return c.replace(/^T/,'10').replace(/[shdc]$/,function(s){return {s:'♠',h:'♥',d:'♦',c:'♣'}[s];});}).join(' ');}
  function cardsHtml(t){return (t.cards||[]).map(function(c){var suit=c.slice(-1),rank=c.slice(0,-1).replace(/^T$/,'10');return '<span class="playing-card suit-'+suit+'">'+esc(rank+({s:'♠',h:'♥',d:'♦',c:'♣'}[suit]||''))+'</span>';}).join('');}
  function handMode(t){return t.gameMode||(/\bфишек\b/i.test(t.context||'')?'mtt':/(?:₽|руб)/i.test(t.context||'')?'cash':'');}
  function handAuthor(t){return t&&t.type==='hand'&&(t.authorNick||'').trim()||t.authorName||'';}
  function handFormat(t,metric){
    if(!t||t.type!=='hand')return '';
    var mode=handMode(t);
    var bigBlind=Number(t.bigBlindMinor)/100;
    if(!(bigBlind>0)){var match=/большой блайнд\s+([\d\s.,]+)/i.exec(t.context||'');if(match)bigBlind=Number(match[1].replace(/\s/g,'').replace(',','.'));}
    var pot=Number.isSafeInteger(t.totalPotMinor)?t.totalPotMinor/100:NaN;
    var nativeUnit=mode==='cash'?'₽':'фишек';
    var bank='';
    if(Number.isFinite(pot)&&pot>=0){var shown=metric==='bb'&&bigBlind>0?pot/bigBlind:pot;bank=' · Банк '+shown.toLocaleString('ru-RU',{maximumFractionDigits:2})+' '+(metric==='bb'?'BB':nativeUnit);}
    if(mode==='mtt')return 'МТТ'+bank;
    if(mode==='cash')return 'КЕШ'+(bigBlind>0?' · '+(bigBlind/2).toLocaleString('ru-RU',{maximumFractionDigits:2})+'/'+bigBlind.toLocaleString('ru-RU',{maximumFractionDigits:2})+' ₽':'')+bank;
    return '';
  }
  function topicTitle(t){return (t.cards||[]).length?handAuthor(t)+' · '+cardsText(t):t.title;}
  function topicTitleHtml(t,metric){var format=handFormat(t,metric);return (format?'<span class="review-hand-format">'+esc(format)+'</span> · ':'')+((t.cards||[]).length?esc(handAuthor(t))+' · '+cardsHtml(t):esc(t.title));}
  function topicListTitleHtml(t){
    var format=handFormat(t,listMetric);
    return '<span class="review-topic__format">'+esc(format)+'</span><span class="review-topic__hand">'+esc(handAuthor(t))+' · '+cardsHtml(t)+'</span>';
  }
  function inlineCards(text){
    var raw=String(text||''),out='',last=0,re=/(10|[2-9JQKA])([♠♥♦♣])/g,match;
    while((match=re.exec(raw))){out+=esc(raw.slice(last,match.index));var suit={"♠":"s","♥":"h","♦":"d","♣":"c"}[match[2]];out+='<span class="playing-card suit-'+suit+'">'+esc(match[0])+'</span>';last=re.lastIndex;}
    return out+esc(raw.slice(last));
  }
  function actionLineHtml(line,heroName,actionClass){
    var match=/^(.+?)\s+—\s+(.+)$/.exec(line),html=inlineCards(line);
    if(match){var actor=match[1].trim(),plainActor=actor.replace(/^[A-Z0-9+]{2,5}:\s*/, '');if(plainActor==='Вы'||heroName&&plainActor===heroName)html=(actor!==plainActor?esc(actor.slice(0,actor.length-plainActor.length)):'')+'<strong class="review-hand-text__hero">'+esc(plainActor)+'</strong> — '+inlineCards(match[2]);}
    return '<div class="review-hand-text__line'+(/\s—\sФолд(?:\s|$)/.test(line)?' review-hand-text__line--fold':'')+(actionClass?' '+actionClass:'')+'">'+html+'</div>';
  }
  function contextLinesHtml(lines,heroName){
    var cardsLine=lines.find(function(line){return /^Мои карты:\s*/.test(line);})||'';
    var heroCards=cardsLine.replace(/^Мои карты:\s*/, '');
    var raisesOnStreet=0;
    return lines.map(function(line,index){
      if(!line.trim())return /^(?:Флоп|Тёрн|Ривер)(?::|$)/.test(lines[index+1]||'')?'':'<span class="review-hand-text__space" aria-hidden="true"></span>';
      if(line==='Два туза · Моя игра')return '';
      if(/^(?:Раздача #|Мои карты:|Позиция:)/.test(line))return '';
      var street=/^(Префлоп|Флоп|Тёрн|Ривер)(?::|\s*·|$)/.exec(line);
      if(street){raisesOnStreet=0;var pot=/\s·\sБанк:\s*(.+)$/.exec(line),streetText=(pot?line.slice(0,pot.index):line)+(street[1]==='Префлоп'&&heroCards?' · '+heroCards:'');return '<div class="review-hand-text__street review-hand-text__street--'+({"Префлоп":"preflop","Флоп":"flop","Тёрн":"turn","Ривер":"river"}[street[1]])+'"><span class="review-hand-text__board">'+inlineCards(streetText)+'</span>'+(pot?'<span class="review-hand-text__pot"><span>Банк</span><span>'+inlineCards(pot[1])+'</span></span>':'')+'</div>';}
      if(/^Вскрытие:/.test(line))return '<div class="review-hand-text__showdown">'+inlineCards(line)+'</div>';
      if(/^Итоговый банк:/.test(line))return '<div class="review-hand-text__final-pot">'+inlineCards(line)+'</div>';
      if(/^Результат:/.test(line))return '<div class="review-hand-text__result">'+inlineCards(line)+'</div>';
      if(/\s—\s/.test(line)){var actionClass='';if(/\s—\sКолл(?:\s|$)/.test(line))actionClass='review-hand-text__line--call';else if(/\s—\sСтавка(?:\s|$)/.test(line))actionClass='review-hand-text__line--bet';else if(/\s—\sОлл-ин(?:\s|$)/.test(line))actionClass='review-hand-text__line--allin';else if(/\s—\sРейз(?:\s|$)/.test(line)){actionClass=raisesOnStreet?'review-hand-text__line--reraise':'review-hand-text__line--raise';raisesOnStreet++;}return actionLineHtml(line,heroName,actionClass);}
      return '<div class="review-hand-text__line'+(index<3?' review-hand-text__line--meta':'')+'">'+inlineCards(line)+'</div>';
    }).join('');
  }
  function contextHtml(text,hideShowdown,heroName){
    var parts=window.PokerHandShare.splitOutcome(text);
    return '<p class="social-muted">'+(hideShowdown?'Раздача опубликована без ШД — вскрытие и результат скрыты':'Вскрытие и результат — под спойлером')+'</p><div class="review-hand-text">'+contextLinesHtml(parts.visible.split('\n'),heroName)+'</div>'+(!hideShowdown&&parts.hidden?'<details class="review-hand-spoiler"><summary>Показать продолжение, вскрытие и результат</summary><div class="review-hand-text review-hand-spoiler__body">'+contextLinesHtml(parts.hidden.split('\n'),heroName)+'</div></details>':'');
  }
  function detectHandMetric(text){return /Банк:[^\n]*(?:₽|фишек)/i.test(text||'')?'native':'bb';}
  function handUnitToggle(t){
    if(t.type!=='hand'||!(Number(t.bigBlindMinor)>0))return '';
    var nativeLabel=t.gameMode==='cash'?'₽':'Фишки';
    return '<div class="review-unit-toggle" role="group" aria-label="Единицы раздачи"><button type="button" data-review-action="unit" data-id="bb" aria-pressed="'+(handMetric==='bb')+'">BB</button><button type="button" data-review-action="unit" data-id="native" aria-pressed="'+(handMetric==='native')+'">'+nativeLabel+'</button></div>';
  }
  function parseAmount(value){return Number(String(value||'').replace(/[\s\u00a0\u202f]/g,'').replace(',','.'));}
  function formatAmount(value,withPlus){
    var rounded=Math.round((Number(value)||0)*100)/100;
    return (withPlus&&rounded>0?'+':'')+rounded.toLocaleString('ru-RU',{maximumFractionDigits:2});
  }
  function contextInMetric(text,t,metric){
    var blind=Number(t.bigBlindMinor)/100;
    if(!(blind>0)||!['bb','native'].includes(metric))return String(text||'');
    var nativeUnit=t.gameMode==='cash'?'₽':'фишек';
    return String(text||'').split(/\r?\n/).map(function(line){
      if(/^Результат:/.test(line)){
        var values=Array.from(line.matchAll(/([+-]?\d[\d\s\u00a0\u202f]*(?:[,.]\d+)?)\s*(bb|₽|фишек)/gi));
        var preferred=values.find(function(match){return metric==='bb'?match[2].toLowerCase()==='bb':match[2].toLowerCase()!=='bb';})||values[0];
        if(preferred){var amount=parseAmount(preferred[1]),isBb=preferred[2].toLowerCase()==='bb',converted=metric==='bb'?(isBb?amount:amount/blind):(isBb?amount*blind:amount);return 'Результат: '+formatAmount(converted,/\+/.test(preferred[1]))+' '+(metric==='bb'?'bb':nativeUnit);}
      }
      return line.replace(/([+-]?\d[\d\s\u00a0\u202f]*(?:[,.]\d+)?)\s*(bb|₽|фишек)/gi,function(full,value,unit){
        var amount=parseAmount(value),isBb=unit.toLowerCase()==='bb';
        if(!Number.isFinite(amount))return full;
        var converted=metric==='bb'?(isBb?amount:amount/blind):(isBb?amount*blind:amount);
        return formatAmount(converted,/\+/.test(value))+' '+(metric==='bb'?'bb':nativeUnit);
      });
    }).join('\n');
  }
  function openingPotContext(text,t){
    var raw=String(text||'');
    if(!t.handId||t.potTiming==='opening'||/^Итоговый банк:/m.test(raw))return raw;
    var lines=raw.split(/\r?\n/),streets=[];
    lines.forEach(function(line,index){var match=/^(Префлоп|Флоп|Тёрн|Ривер)(.*?)(\s·\sБанк:\s*)(.+)$/.exec(line);if(match)streets.push({index:index,head:match[1]+match[2]+match[3],pot:match[4]});});
    if(!streets.length)return raw;
    var unit=/(bb|₽|фишек)\s*$/i.exec(streets[0].pot),zero='0 '+(unit?unit[1]:'');
    streets.forEach(function(street,index){lines[street.index]=street.head+(index?streets[index-1].pot:zero);});
    var finalLine='Итоговый банк: '+streets[streets.length-1].pot;
    var insert=lines.findIndex(function(line){return /^(?:Вскрытие:|Результат:|Два туза ·)/.test(line);});
    if(insert<0)insert=lines.length;
    while(insert>0&&!lines[insert-1].trim())insert--;
    lines.splice(insert,0,'',finalLine,'');
    return lines.join('\n');
  }
  function avatar(t){return '<span class="review-topic__avatar"><img src="/api/avatar?userId='+encodeURIComponent(t.authorId)+'&format=image" alt="" loading="lazy"><span>'+esc((handAuthor(t)||'И').slice(0,1))+'</span></span>';}
  function replyHtml(reply,t){
    var parent=t.replies.find(function(row){return row.id===reply.parentId;}),name=reply.authorNick||reply.authorName||'Игрок';
    var avatarUrl='/api/avatar?userId='+encodeURIComponent(reply.authorId)+'&format=image';
    return '<article class="review-comment'+(reply.coach?' review-comment--coach':'')+'"><header><button type="button" class="review-comment__author" data-review-action="profile" data-id="'+esc(reply.authorId)+'" data-name="'+esc(name)+'"><span class="review-comment__avatar"><span>'+esc(name.slice(0,1).toUpperCase())+'</span><img src="'+esc(avatarUrl)+'" alt="" loading="lazy"></span><span class="review-comment__identity"><strong>'+esc(name)+'</strong><small data-review-read-id="'+esc(reply.id)+'">'+(reply.authorLevel?'Уровень '+Math.max(0,Number(reply.authorLevel)||0)+' · ':'')+date(reply.createdAt)+'</small></span></button>'+(reply.coach?'<span class="review-coach">Тренер</span>':'')+(reply.canDelete?'<button type="button" class="review-comment__delete" data-review-action="delete-reply" data-id="'+esc(reply.id)+'" aria-label="Удалить комментарий" title="Удалить комментарий">×</button>':'')+'</header>'+(parent?'<blockquote>В ответ '+esc(parent.authorNick||parent.authorName)+': '+esc(parent.text.slice(0,140))+'</blockquote>':'')+'<p>'+esc(reply.text)+'</p><footer><button type="button" class="review-comment__reply" data-review-action="reply-to" data-id="'+esc(reply.id)+'">↩ Ответить</button></footer></article>';
  }
  function renderList(){
    var r=root();if(!r)return;
    document.body.classList.remove('review-reply-input-active');
    document.querySelector('[data-view="club-reviews"] .club-reviews-header')?.classList.remove('club-reviews-header--thread');
    var visibleRows=rows.filter(function(t){return listMode==='all'||handMode(t)===listMode;});
    r.innerHTML='<div class="social-tabs" role="group" aria-label="Раздачи"><button type="button" data-review-action="all" aria-pressed="'+!mine+'">Все раздачи</button><button type="button" data-review-action="mine" aria-pressed="'+mine+'">Мои раздачи</button></div><div class="review-list-filters"><div role="group" aria-label="Тип игры"><button type="button" data-review-action="list-mode" data-id="all" aria-pressed="'+(listMode==='all')+'">Все</button><button type="button" data-review-action="list-mode" data-id="cash" aria-pressed="'+(listMode==='cash')+'">Кеш</button><button type="button" data-review-action="list-mode" data-id="mtt" aria-pressed="'+(listMode==='mtt')+'">МТТ</button></div><div role="group" aria-label="Единицы"><button type="button" data-review-action="list-unit" data-id="bb" aria-pressed="'+(listMetric==='bb')+'">BB</button><button type="button" data-review-action="list-unit" data-id="native" aria-pressed="'+(listMetric==='native')+'">₽ / фишки</button></div></div><div class="review-topic-list">'+visibleRows.map(function(t){return '<article class="review-topic">'+avatar(t)+'<button type="button" class="review-title review-topic__body" data-review-action="open" data-id="'+esc(t.id)+'"><strong>'+topicListTitleHtml(t)+'</strong><small>'+esc(date(t.updatedAt))+(t.unread?' · Новые комментарии':'')+'</small></button><span class="review-topic__count" aria-label="Комментарии: '+t.replyCount+'">💬 '+t.replyCount+'</span></article>';}).join('')+'</div>'+(!visibleRows.length?'<p class="social-muted">Раздач с такими параметрами пока нет.</p>':'')+(cursor!==null?button('Показать ещё','more'):'');
    r.querySelectorAll('.review-topic__avatar img').forEach(function(img){img.onerror=function(){img.hidden=true;};});
    r.querySelectorAll('.review-topic').forEach(function(article,index){
      var topic=visibleRows[index];if(!topic.canDelete)return;
      var controls=document.createElement('div');controls.className='review-topic__controls';
      var count=article.querySelector('.review-topic__count');count.replaceWith(controls);controls.append(count);
      controls.insertAdjacentHTML('beforeend',button('Удалить','delete-topic',topic.id,'review-topic__delete'));
    });
    r.insertAdjacentHTML('afterbegin',activityHtml());
    r.prepend(topicPushPanel());
  }
  function loadList(more){
    var seq=++serial,gen=generation;thread=null;headerAction(null);feedback('Загружаем разборы…');
    return api({action:'list',mine:mine,cursor:more?cursor:0}).then(function(d){if(seq!==serial||gen!==generation)return;rows=more?rows.concat(d.threads):d.threads;cursor=d.nextCursor;renderList();feedback('');}).catch(function(e){if(seq!==serial||gen!==generation)return;feedback(e.message);if(!rows.length)root().innerHTML=button('Повторить','reload');});
  }
  function renderThread(t,resetDraft){
    document.body.classList.remove('review-reply-input-active');
    var same=thread&&thread.id===t.id,oldInput=document.querySelector('#reviewReplyForm textarea');
    var draft=same&&!resetDraft&&oldInput?oldInput.value:'';
    var oldParent=same&&!resetDraft?parentId:'';
    thread=t;var r=root();if(!r)return;
    var sorted=t.replies.slice().sort(function(a,b){return Number(b.coach)-Number(a.coach)||a.createdAt.localeCompare(b.createdAt);});
    r.innerHTML='<div class="social-actions">'+button('← Все разборы','back')+button(t.following?'Отписаться':'Следить за ответами','subscribe')+'</div><article class="social-card"><div class="social-kicker">'+(t.forCoach?'Вопрос тренеру · отвечать могут все':'Обсуждение с игроками')+'</div><h2>'+esc(t.title)+'</h2><p class="social-muted">'+esc(handAuthor(t))+' · '+date(t.createdAt)+'</p><p class="social-copy">'+esc(t.question)+'</p>'+(t.context?'<div class="review-context"><h3>Ситуация</h3><p class="social-copy">'+esc(t.context)+'</p></div>':'')+(t.image?'<a href="'+esc(t.image)+'" target="_blank" rel="noopener"><img class="review-image" src="'+esc(t.image)+'" alt="Раздача игрока"></a>':'')+(t.outcome?'<details class="review-outcome"><summary>Показать исход раздачи</summary><p class="social-copy">'+esc(t.outcome)+'</p></details>':'')+(t.type==='hand'?'<div class="review-votes"><h3>Как бы вы сыграли?</h3>'+[['fold','Пас'],['call','Колл'],['raise','Рейз']].map(function(v){return '<button type="button" class="social-button" data-review-action="vote" data-id="'+v[0]+'" aria-pressed="'+(t.myVote===v[0])+'">'+v[1]+(t.myVote?' · '+t.votes[v[0]]:'')+'</button>';}).join('')+'<p class="social-muted">Мнение участников, а не оценка правильности решения.</p></div>':'')+'</article>'+sorted.map(function(reply){return replyHtml(reply,t);}).join('')+'<form id="reviewReplyForm" class="social-form review-reply-form"><p id="reviewReplyTarget" class="social-muted"></p><textarea name="text" aria-label="Комментарий" required minlength="2" maxlength="3000" rows="3" placeholder="Напишите комментарий…"></textarea><div class="review-reply-form__actions"><button class="social-button social-button--primary" type="submit">Отправить</button><span class="social-muted">Комментировать могут все участники клуба</span></div></form>';
    r.querySelector('.review-votes')?.remove();
    var oldThreadActions=r.firstElementChild;
    if(oldThreadActions&&oldThreadActions.classList.contains('social-actions'))oldThreadActions.classList.add('review-thread-nav');
    document.querySelector('[data-view="club-reviews"] .club-reviews-header')?.classList.add('club-reviews-header--thread');
    headerAction(null);
    var article=r.querySelector('article');article.classList.add('review-thread-card');
    article.querySelector('.social-kicker')?.remove();
    var title=article.querySelector('h2');title.innerHTML='<span>'+esc(handAuthor(t))+'</span><span class="review-title-cards">'+cardsHtml(t)+'</span>';
    var share=document.createElement('div');share.className='social-actions review-share-actions';
    share.innerHTML=shareButtons()+(t.canDelete?button('Удалить раздачу','delete',t.id):'');
    var heading=document.createElement('div');heading.className='review-thread-heading-row';
    article.insertBefore(heading,title);heading.append(title,share);
    var format=document.createElement('div');format.className='review-thread-format';format.textContent=handFormat(t,handMetric);heading.after(format);
    var context=article.querySelector('.review-context');
    if(context){context.querySelector('h3')?.remove();context.insertAdjacentHTML('afterbegin',handUnitToggle(t));var contextCopy=context.querySelector('.social-copy');if(contextCopy)contextCopy.innerHTML=contextHtml(contextInMetric(openingPotContext(t.context,t),t,handMetric),t.hideShowdown===true,handAuthor(t));}
    article.querySelector('.review-image')?.closest('a')?.remove();
    r.querySelectorAll('.review-comment__avatar img').forEach(function(img){img.onerror=function(){img.hidden=true;};});
    article.querySelectorAll('details').forEach(function(details){var summary=details.querySelector(':scope > summary');if(summary&&summary.textContent.trim()==='Текст раздачи'){summary.remove();details.replaceWith.apply(details,Array.from(details.childNodes));}});
    if(!same||resetDraft||!replyKey)replyKey=pokerSocialRequestId();parentId=oldParent;
    document.querySelector('#reviewReplyForm textarea').value=draft;
    var replyingTo=t.replies.find(function(r){return r.id===parentId;});
    if(replyingTo)document.getElementById('reviewReplyTarget').textContent='В ответ '+replyingTo.authorName;else parentId='';
    var replyForm=document.getElementById('reviewReplyForm');
    replyForm.querySelector('textarea').insertAdjacentHTML('afterend','<p id="reviewActivityHint" class="social-muted review-activity-hint">'+(t.authorId===viewerId?'Комментарии в своей раздаче не дают действий.':'Для зачёта: от 60 букв и цифр · один комментарий на чужую раздачу')+'</p>');
    r.insertAdjacentHTML('afterbegin',activityHtml());
    observeAnswers(t);
  }
  function observeAnswers(t){
    if(answerObserver)answerObserver.disconnect();
    var gen=generation,view=root(),pending=new Set(t.replies.filter(function(r){return r.authorId!==viewerId && (!r.readVersion || r.readVersion>(t.readVersion||0));}).map(function(r){return r.id;})),sent=false;
    function active(){return gen===generation&&thread===t&&!document.hidden&&document.querySelector('[data-view="club-reviews"].view--active');}
    function finish(){if(pending.size||sent||!active())return;sent=true;api({action:'read',id:t.id,version:t.version}).then(function(){if(gen===generation)window.dispatchEvent(new Event('poker-reviews-updated'));}).catch(function(){sent=false;});}
    if(!pending.size){finish();return;}
    if(typeof IntersectionObserver!=='function')return;
    answerObserver=new IntersectionObserver(function(entries){entries.forEach(function(entry){
      var node=entry.target;if(!entry.isIntersecting){clearTimeout(node._answerTimer);return;}
      clearTimeout(node._answerTimer);node._answerTimer=setTimeout(function(){
        if(!node.isConnected||!active())return;
        var id=node.getAttribute('data-review-read-id');pending.delete(id);
        var reply=t.replies.find(function(r){return r.id===id;});
        if(viewerId&&reply&&reply.authorId!==viewerId&&typeof window.pokerTrackEngagement==='function')window.pokerTrackEngagement('review_answer_read',{entity:t.id,source:'club-reviews',once:true,onceKey:id});
        finish();
      },800);
    });},{threshold:0.5});
    view.querySelectorAll('[data-review-read-id]').forEach(function(node){if(pending.has(node.getAttribute('data-review-read-id')))answerObserver.observe(node);});
  }
  function open(id){var seq=++serial,gen=generation;feedback('Открываем обсуждение…');return api({action:'get',id:id}).then(function(d){if(gen!==generation||seq!==serial)return;viewerId=d.accountId||'';handMetric=detectHandMetric(d.thread.context);renderThread(d.thread);resetReviewsScroll();requestAnimationFrame(resetReviewsScroll);if(typeof window.pokerTrackEngagement==='function')window.pokerTrackEngagement('review_opened',{entity:id,source:'club-reviews',once:true});feedback('');}).catch(function(e){if(gen===generation&&seq===serial){feedback(e.message);root().innerHTML=button('К списку разборов','back');}});}
  function form(type){thread=null;serial++;imageData='';imageBusy=false;formKey=pokerSocialRequestId();feedback('');root().innerHTML=button('← К разборам','back')+'<form id="reviewCreateForm" class="social-card social-form" data-type="'+type+'"><div class="social-kicker">'+(type==='hand'?'Разбор раздачи':'Вопрос клубу')+'</div><h2>'+(type==='hand'?'Как здесь сыграть?':'Что хотите обсудить?')+'</h2><label>Короткий заголовок<input name="title" required minlength="3" maxlength="140" placeholder="Например: колл на тёрне с топ-парой?"></label><label>Конкретный вопрос<textarea name="question" required minlength="5" maxlength="3000" rows="4" placeholder="В чём сомневаетесь? Какие варианты рассматриваете?"></textarea></label><label>Кому адресован вопрос<select name="audience"><option value="coach">Тренеру и игрокам</option value="players">Игрокам клуба</option></select></label>'+(type==='hand'?'<label>Позиции, стеки и ход раздачи<textarea name="context" maxlength="2000" rows="5" placeholder="Формат турнира, блайнды, эффективный стек, позиции, карты, борд и ставки по улицам."></textarea></label><label>Скриншот раздачи<input type="file" id="reviewImageInput" accept="image/jpeg,image/png,image/webp"></label><p class="social-muted">Можно приложить один скриншот. Проверьте, что на нём нет личных данных.</p><div id="reviewImagePreview"></div><label>Чем закончилась раздача (необязательно)<textarea name="outcome" maxlength="2000" rows="3" placeholder="Будет скрыто под кнопкой «Показать исход»."></textarea></label>':'')+'<p class="social-muted">Вопрос и ответы видны участникам клуба. Вы будете подписаны на новые ответы. Ответ тренера появится, когда он разберёт вопрос.</p><button type="submit" class="social-button social-button--primary">Опубликовать</button></form>';}
  async function resizeImage(file){if(!file||!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>12*1024*1024)throw new Error('Выберите JPG, PNG или WebP до 12 МБ');var bitmap=await createImageBitmap(file);try{var scale=Math.min(1,1400/Math.max(bitmap.width,bitmap.height)),canvas=document.createElement('canvas');canvas.width=Math.round(bitmap.width*scale);canvas.height=Math.round(bitmap.height*scale);canvas.getContext('2d').drawImage(bitmap,0,0,canvas.width,canvas.height);for(var quality=.85;quality>=.25;quality-=.15){var data=canvas.toDataURL('image/jpeg',quality);if(data.length<=450000)return data;}throw new Error('Скриншот слишком большой. Обрежьте его до раздачи.');}finally{bitmap.close();}}
  document.addEventListener('change',function(e){if(e.target.id!=='reviewImageInput')return;var gen=generation,key=formKey;imageBusy=true;imageData='';feedback('Подготавливаем изображение…');resizeImage(e.target.files[0]).then(function(data){if(gen!==generation||key!==formKey)return;imageData=data;document.getElementById('reviewImagePreview').innerHTML='<img class="review-image" src="'+data+'" alt="Прикреплённый скриншот">'+button('Убрать изображение','remove-image');feedback('');}).catch(function(err){if(gen===generation)feedback(err.message);}).finally(function(){if(gen===generation)imageBusy=false;});});
  document.addEventListener('focusin',function(e){if(!e.target.matches('[data-view="club-reviews"] #reviewReplyForm textarea'))return;document.body.classList.add('review-reply-input-active');scheduleReviewReplyVisible();});
  document.addEventListener('focusout',function(e){if(!e.target.matches('[data-view="club-reviews"] #reviewReplyForm textarea'))return;setTimeout(function(){if(!document.activeElement?.matches('[data-view="club-reviews"] #reviewReplyForm textarea'))document.body.classList.remove('review-reply-input-active');},120);});
  if(window.visualViewport){window.visualViewport.addEventListener('resize',keepReviewReplyVisible);window.visualViewport.addEventListener('scroll',keepReviewReplyVisible);}
  document.addEventListener('submit',function(e){if(!['reviewCreateForm','reviewReplyForm'].includes(e.target.id))return;e.preventDefault();if(busy)return;if(imageBusy){feedback('Дождитесь подготовки изображения');return;}var f=e.target,values=new FormData(f),payload=f.id==='reviewCreateForm'?{action:'create',requestId:formKey,type:f.dataset.type,title:values.get('title'),question:values.get('question'),context:values.get('context'),outcome:values.get('outcome'),forCoach:values.get('audience')==='coach',image:imageData}:{action:'reply',id:thread.id,requestId:replyKey,parentId:parentId,text:values.get('text')};var gen=generation;setBusy(true);feedback('Отправляем…');api(payload).then(function(d){if(gen!==generation)return;renderThread(d.thread,true);if(typeof window.pokerTrackEngagement==='function')window.pokerTrackEngagement(payload.action==='reply'?'review_reply_created':'review_created',{entity:d.thread.id,source:'club-reviews',once:true,onceKey:payload.requestId});feedback(activityNotice(d));window.dispatchEvent(new Event('poker-reviews-updated'));}).catch(function(err){if(gen===generation)feedback(err.message);}).finally(function(){if(gen===generation)setBusy(false);});});
  document.addEventListener('click',function(e){var el=e.target.closest('[data-review-action]');if(!el||busy)return;var action=el.dataset.reviewAction,id=el.dataset.id;
    if(action==='activity-play'){setView('daily-poker');return;}
    if(action==='new-question'||action==='new-hand'){form(action==='new-hand'?'hand':'question');return;}
    if(['all','mine','back','reload','more'].includes(action)){if(action==='all'||action==='mine')mine=action==='mine';loadList(action==='more');return;}
    if(action==='open'){open(id);return;}
    if(action==='profile'){var profileName=el.dataset.name||'Игрок',profileAvatar='/api/avatar?userId='+encodeURIComponent(id)+'&format=image';if(typeof window.pokerOpenChatUserModalSafe==='function')window.pokerOpenChatUserModalSafe(id,profileName,profileAvatar);else if(typeof window.openChatUserModalById==='function')window.openChatUserModalById(id,profileName,profileAvatar);return;}
    if(action==='list-mode'&&['all','cash','mtt'].includes(id)){listMode=id;renderList();return;}
    if(action==='list-unit'&&['bb','native'].includes(id)){listMetric=id;renderList();return;}
    if(action==='remove-image'){imageData='';document.getElementById('reviewImageInput').value='';document.getElementById('reviewImagePreview').innerHTML='';return;}
    if(action==='reply-to'){parentId=id;var reply=thread.replies.find(function(r){return r.id===id;});document.getElementById('reviewReplyTarget').textContent='В ответ '+(reply.authorNick||reply.authorName);document.querySelector('#reviewReplyForm textarea').focus();return;}
    if(action==='delete-topic'){
      var topic=rows.find(function(t){return t.id===id;});if(!topic||!topic.canDelete)return;
      if(!window.confirm('Удалить эту раздачу вместе с обсуждением?'))return;
      var deleteGeneration=generation;setBusy(true);
      api({action:'delete',id:id}).then(function(){if(deleteGeneration!==generation)return;loadList(false);window.dispatchEvent(new Event('poker-reviews-updated'));}).catch(function(err){if(deleteGeneration===generation)feedback(err.message);}).finally(function(){if(deleteGeneration===generation)setBusy(false);});
      return;
    }
    if(!thread)return;
    if(action==='unit'&&['bb','native'].includes(id)){handMetric=id;renderThread(thread);return;}
    if(action==='copy'||action==='share'){
      var url=topicLink(thread.id);
      if(action==='share'&&navigator.share){navigator.share({title:topicTitle(thread),url:url}).catch(function(e){if(e.name!=='AbortError')feedback('Не удалось поделиться. Скопируйте ссылку.');});}
      else if(typeof pokerCopyTextToClipboard==='function'){pokerCopyTextToClipboard(url).then(function(ok){feedback(ok?'Ссылка скопирована':'Не удалось скопировать ссылку');});}
      else{navigator.clipboard.writeText(url).then(function(){feedback('Ссылка скопирована');}).catch(function(){feedback('Не удалось скопировать ссылку');});}
      return;
    }
    if((action==='delete'||action==='delete-reply')&&!window.confirm(action==='delete'?'Удалить этот разбор вместе с обсуждением?':'Удалить этот ответ?'))return;
    var gen=generation;setBusy(true);api({action:action,id:thread.id,replyId:id,vote:id,follow:!thread.following}).then(function(d){if(gen!==generation)return;if(d.thread)renderThread(d.thread);else loadList(false);feedback('');window.dispatchEvent(new Event('poker-reviews-updated'));}).catch(function(err){if(gen===generation)feedback(err.message);}).finally(function(){if(gen===generation)setBusy(false);});
  });
  window.initClubReviews=function(){if(typeof pokerApiHasCredential!=='function'||!pokerApiHasCredential()){root().innerHTML='<div class="social-empty"><h2>Войдите, чтобы участвовать</h2><p>Вопросы тренеру, раздачи и ответы игроков клуба.</p><a class="social-button" href="#" data-view-target="profile">Открыть профиль</a></div>';return;}var id=window.pokerPendingReviewId;window.pokerPendingReviewId='';if(id)open(id);else loadList(false);};
  window.pokerOpenClubReview=function(id){window.pokerPendingReviewId=id||'';setView('club-reviews');};
  window.addEventListener('poker-telegram-auth',function(){generation++;serial++;viewerId='';activity=null;if(answerObserver)answerObserver.disconnect();rows=[];thread=null;busy=false;imageData='';imageBusy=false;formKey='';replyKey='';parentId='';if(root())root().innerHTML='';feedback('');if(document.querySelector('[data-view="club-reviews"].view--active'))window.initClubReviews();});
})();
