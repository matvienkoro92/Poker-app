(function(){
  'use strict';
  var generation=0,serial=0,mine=false,cursor=null,rows=[],thread=null,busy=false,imageData='',imageBusy=false,formKey='',replyKey='',parentId='';
  var answerObserver=null,viewerId='';
  function esc(s){return pokerSocialEscape(s);}
  function api(b){return pokerSocialRequest('club-reviews',b);}
  function root(){return document.getElementById('clubReviewsContent');}
  function date(s){return new Date(s).toLocaleString('ru-RU',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});}
  function feedback(text){
    var loading=/^(?:Загружаем разборы|Открываем обсуждение)/.test(text||'');
    var loader=document.getElementById('clubReviewsLoading');if(loader)loader.hidden=!loading;
    var el=document.getElementById('clubReviewsFeedback');if(el)el.textContent=loading?'':text||'';
  }
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
  function topicTitle(t){return (t.cards||[]).length?t.authorName+' · '+cardsText(t):t.title;}
  function topicTitleHtml(t){return (t.cards||[]).length?esc(t.authorName)+' · '+cardsHtml(t):esc(t.title);}
  function inlineCards(text){
    var raw=String(text||''),out='',last=0,re=/(10|[2-9JQKA])([♠♥♦♣])/g,match;
    while((match=re.exec(raw))){out+=esc(raw.slice(last,match.index));var suit={"♠":"s","♥":"h","♦":"d","♣":"c"}[match[2]];out+='<span class="playing-card suit-'+suit+'">'+esc(match[0])+'</span>';last=re.lastIndex;}
    return out+esc(raw.slice(last));
  }
  function actionLineHtml(line,heroName){
    var match=/^(.+?)\s+—\s+(.+)$/.exec(line),html=inlineCards(line);
    if(match&&(match[1].trim()==='Вы'||heroName&&match[1].trim()===heroName))html='<strong class="review-hand-text__hero">'+esc(match[1].trim())+'</strong> — '+inlineCards(match[2]);
    return '<div class="review-hand-text__line'+(/\s—\sФолд(?:\s|$)/.test(line)?' review-hand-text__line--fold':'')+'">'+html+'</div>';
  }
  function contextLinesHtml(lines,heroName){
    var cardsLine=lines.find(function(line){return /^Мои карты:\s*/.test(line);})||'';
    var heroCards=cardsLine.replace(/^Мои карты:\s*/, '');
    return lines.map(function(line,index){
      if(!line.trim())return /^(?:Флоп|Тёрн|Ривер)(?::|$)/.test(lines[index+1]||'')?'':'<span class="review-hand-text__space" aria-hidden="true"></span>';
      if(line==='Два туза · Моя игра')return '';
      if(/^(?:Раздача #|Мои карты:|Позиция:)/.test(line))return '';
      var street=/^(Префлоп|Флоп|Тёрн|Ривер)(?::|$)/.exec(line);
      if(street){var streetText=line+(street[1]==='Префлоп'&&heroCards?' · '+heroCards:'');return '<div class="review-hand-text__street review-hand-text__street--'+({"Префлоп":"preflop","Флоп":"flop","Тёрн":"turn","Ривер":"river"}[street[1]])+'">'+inlineCards(streetText)+'</div>';}
      if(/^Вскрытие:/.test(line))return '<div class="review-hand-text__showdown">'+inlineCards(line)+'</div>';
      if(/^Результат:/.test(line))return '<div class="review-hand-text__result">'+inlineCards(line)+'</div>';
      if(/\s—\s/.test(line))return actionLineHtml(line,heroName);
      return '<div class="review-hand-text__line'+(index<3?' review-hand-text__line--meta':'')+'">'+inlineCards(line)+'</div>';
    }).join('');
  }
  function contextHtml(text,hideShowdown,heroName){
    var lines=String(text||'').split(/\r?\n/),split=-1;
    if(hideShowdown){
      var allIn=lines.findIndex(function(line){return /(?:^|\s)[Оо]лл-ин(?:\s|$)/.test(line);});
      split=lines.findIndex(function(line,index){return index>allIn&&(/^(?:Флоп|Тёрн|Ривер)(?::|$)/.test(line)||/^Вскрытие:/.test(line)||/^Результат:/.test(line));});
      if(split<0)split=lines.findIndex(function(line){return /^Вскрытие:/.test(line)||/^Результат:/.test(line);});
      while(split>0&&!lines[split-1].trim())split--;
    }
    var visible=split>=0?lines.slice(0,split):lines,hidden=split>=0?lines.slice(split):[];
    return '<div class="review-hand-text">'+contextLinesHtml(visible,heroName)+'</div>'+(hidden.length?'<details class="review-hand-spoiler"><summary>Показать продолжение и результат</summary><div class="review-hand-text review-hand-spoiler__body">'+contextLinesHtml(hidden,heroName)+'</div></details>':'');
  }
  function avatar(t){return '<span class="review-topic__avatar"><img src="/api/avatar?userId='+encodeURIComponent(t.authorId)+'&format=image" alt="" loading="lazy"><span>'+esc((t.authorName||'И').slice(0,1))+'</span></span>';}
  function renderList(){
    var r=root();if(!r)return;
    r.innerHTML='<div class="social-tabs" role="group" aria-label="Раздачи"><button type="button" data-review-action="all" aria-pressed="'+!mine+'">Все раздачи</button><button type="button" data-review-action="mine" aria-pressed="'+mine+'">Мои раздачи</button></div><div class="review-topic-list">'+rows.map(function(t){return '<article class="review-topic">'+avatar(t)+'<button type="button" class="review-title review-topic__body" data-review-action="open" data-id="'+esc(t.id)+'"><strong>'+topicTitleHtml(t)+'</strong><small>'+esc(date(t.updatedAt))+(t.unread?' · Новые комментарии':'')+'</small></button><span class="review-topic__count" aria-label="Комментарии: '+t.replyCount+'">💬 '+t.replyCount+'</span></article>';}).join('')+'</div>'+(!rows.length?'<p class="social-muted">Раздач пока нет. Нажмите «Опубликовать» рядом с раздачей в разделе «Моя игра».</p>':'')+(cursor!==null?button('Показать ещё','more'):'');
    r.querySelectorAll('.review-topic__avatar img').forEach(function(img){img.onerror=function(){img.hidden=true;};});
  }
  function loadList(more){
    var seq=++serial,gen=generation;thread=null;headerAction(null);feedback('Загружаем разборы…');
    return api({action:'list',mine:mine,cursor:more?cursor:0}).then(function(d){if(seq!==serial||gen!==generation)return;rows=more?rows.concat(d.threads):d.threads;cursor=d.nextCursor;renderList();feedback('');}).catch(function(e){if(seq!==serial||gen!==generation)return;feedback(e.message);if(!rows.length)root().innerHTML=button('Повторить','reload');});
  }
  function renderThread(t,resetDraft){
    var same=thread&&thread.id===t.id,oldInput=document.querySelector('#reviewReplyForm textarea');
    var draft=same&&!resetDraft&&oldInput?oldInput.value:'';
    var oldParent=same&&!resetDraft?parentId:'';
    thread=t;var r=root();if(!r)return;
    var sorted=t.replies.slice().sort(function(a,b){return Number(b.coach)-Number(a.coach)||a.createdAt.localeCompare(b.createdAt);});
    r.innerHTML='<div class="social-actions">'+button('← Все разборы','back')+button(t.following?'Отписаться':'Следить за ответами','subscribe')+'</div><article class="social-card"><div class="social-kicker">'+(t.forCoach?'Вопрос тренеру · отвечать могут все':'Обсуждение с игроками')+'</div><h2>'+esc(t.title)+'</h2><p class="social-muted">'+esc(t.authorName)+' · '+date(t.createdAt)+'</p><p class="social-copy">'+esc(t.question)+'</p>'+(t.context?'<div class="review-context"><h3>Ситуация</h3><p class="social-copy">'+esc(t.context)+'</p></div>':'')+(t.image?'<a href="'+esc(t.image)+'" target="_blank" rel="noopener"><img class="review-image" src="'+esc(t.image)+'" alt="Раздача игрока"></a>':'')+(t.outcome?'<details class="review-outcome"><summary>Показать исход раздачи</summary><p class="social-copy">'+esc(t.outcome)+'</p></details>':'')+(t.type==='hand'?'<div class="review-votes"><h3>Как бы вы сыграли?</h3>'+[['fold','Пас'],['call','Колл'],['raise','Рейз']].map(function(v){return '<button type="button" class="social-button" data-review-action="vote" data-id="'+v[0]+'" aria-pressed="'+(t.myVote===v[0])+'">'+v[1]+(t.myVote?' · '+t.votes[v[0]]:'')+'</button>';}).join('')+'<p class="social-muted">Мнение участников, а не оценка правильности решения.</p></div>':'')+'</article><h2 class="social-section-title">Ответы · '+t.replies.length+'</h2>'+sorted.map(function(reply){var parent=t.replies.find(function(p){return p.id===reply.parentId;});return '<article class="social-card review-reply'+(reply.coach?' review-reply--coach':'')+'"><div class="social-actions"><strong>'+esc(reply.authorName)+'</strong>'+(reply.coach?'<span class="review-coach">Тренер</span>':'')+'</div>'+(parent?'<blockquote>В ответ '+esc(parent.authorName)+': '+esc(parent.text.slice(0,140))+'</blockquote>':'')+'<p class="social-copy">'+esc(reply.text)+'</p><small data-review-read-id="'+esc(reply.id)+'" class="social-muted">'+date(reply.createdAt)+'</small><div class="social-actions">'+button('Ответить','reply-to',reply.id)+(reply.canDelete?button('Удалить','delete-reply',reply.id):'')+'</div></article>';}).join('')+'<form id="reviewReplyForm" class="social-card social-form"><h3>Ваш ответ</h3><p id="reviewReplyTarget" class="social-muted"></p><label>Объясните своё решение<textarea name="text" required minlength="2" maxlength="3000" rows="5" placeholder="Как сыграть в этой ситуации?"></textarea></label><button class="social-button social-button--primary" type="submit">Ответить</button><p class="social-muted">Отвечать могут все участники клуба.</p></form>';
    r.querySelector('.review-votes')?.remove();
    var oldThreadActions=r.firstElementChild;
    if(oldThreadActions&&oldThreadActions.classList.contains('social-actions'))oldThreadActions.remove();
    headerAction(t);
    var article=r.querySelector('article');article.classList.add('review-thread-card');
    article.querySelector('.social-kicker')?.remove();
    article.querySelector('h2').innerHTML=topicTitleHtml(t);
    var share=document.createElement('div');share.className='social-actions review-share-actions';
    share.innerHTML=shareButtons();
    article.insertBefore(share,article.querySelector('h2').nextSibling);
    var context=article.querySelector('.review-context');
    if(context){context.querySelector('h3')?.remove();var contextCopy=context.querySelector('.social-copy');if(contextCopy)contextCopy.innerHTML=contextHtml(t.context,t.hideShowdown===true,t.authorName);}
    article.querySelector('.review-image')?.closest('a')?.remove();
    article.querySelectorAll('details').forEach(function(details){var summary=details.querySelector(':scope > summary');if(summary&&summary.textContent.trim()==='Текст раздачи'){summary.remove();details.replaceWith.apply(details,Array.from(details.childNodes));}});
    if(!same||resetDraft||!replyKey)replyKey=pokerSocialRequestId();parentId=oldParent;
    document.querySelector('#reviewReplyForm textarea').value=draft;
    var replyingTo=t.replies.find(function(r){return r.id===parentId;});
    if(replyingTo)document.getElementById('reviewReplyTarget').textContent='В ответ '+replyingTo.authorName;else parentId='';
    observeAnswers(t);
  }
  function observeAnswers(t){
    if(answerObserver)answerObserver.disconnect();
    var gen=generation,view=root(),pending=new Set(t.replies.map(function(r){return r.id;})),sent=false;
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
    });},{threshold:1});
    view.querySelectorAll('[data-review-read-id]').forEach(function(node){answerObserver.observe(node);});
  }
  function open(id){var seq=++serial,gen=generation;feedback('Открываем обсуждение…');return api({action:'get',id:id}).then(function(d){if(gen!==generation||seq!==serial)return;viewerId=d.accountId||'';renderThread(d.thread);if(typeof window.pokerTrackEngagement==='function')window.pokerTrackEngagement('review_opened',{entity:id,source:'club-reviews',once:true});feedback('');}).catch(function(e){if(gen===generation&&seq===serial){feedback(e.message);root().innerHTML=button('К списку разборов','back');}});}
  function form(type){thread=null;serial++;imageData='';imageBusy=false;formKey=pokerSocialRequestId();feedback('');root().innerHTML=button('← К разборам','back')+'<form id="reviewCreateForm" class="social-card social-form" data-type="'+type+'"><div class="social-kicker">'+(type==='hand'?'Разбор раздачи':'Вопрос клубу')+'</div><h2>'+(type==='hand'?'Как здесь сыграть?':'Что хотите обсудить?')+'</h2><label>Короткий заголовок<input name="title" required minlength="3" maxlength="140" placeholder="Например: колл на тёрне с топ-парой?"></label><label>Конкретный вопрос<textarea name="question" required minlength="5" maxlength="3000" rows="4" placeholder="В чём сомневаетесь? Какие варианты рассматриваете?"></textarea></label><label>Кому адресован вопрос<select name="audience"><option value="coach">Тренеру и игрокам</option value="players">Игрокам клуба</option></select></label>'+(type==='hand'?'<label>Позиции, стеки и ход раздачи<textarea name="context" maxlength="2000" rows="5" placeholder="Формат турнира, блайнды, эффективный стек, позиции, карты, борд и ставки по улицам."></textarea></label><label>Скриншот раздачи<input type="file" id="reviewImageInput" accept="image/jpeg,image/png,image/webp"></label><p class="social-muted">Можно приложить один скриншот. Проверьте, что на нём нет личных данных.</p><div id="reviewImagePreview"></div><label>Чем закончилась раздача (необязательно)<textarea name="outcome" maxlength="2000" rows="3" placeholder="Будет скрыто под кнопкой «Показать исход»."></textarea></label>':'')+'<p class="social-muted">Вопрос и ответы видны участникам клуба. Вы будете подписаны на новые ответы. Ответ тренера появится, когда он разберёт вопрос.</p><button type="submit" class="social-button social-button--primary">Опубликовать</button></form>';}
  async function resizeImage(file){if(!file||!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>12*1024*1024)throw new Error('Выберите JPG, PNG или WebP до 12 МБ');var bitmap=await createImageBitmap(file);try{var scale=Math.min(1,1400/Math.max(bitmap.width,bitmap.height)),canvas=document.createElement('canvas');canvas.width=Math.round(bitmap.width*scale);canvas.height=Math.round(bitmap.height*scale);canvas.getContext('2d').drawImage(bitmap,0,0,canvas.width,canvas.height);for(var quality=.85;quality>=.25;quality-=.15){var data=canvas.toDataURL('image/jpeg',quality);if(data.length<=450000)return data;}throw new Error('Скриншот слишком большой. Обрежьте его до раздачи.');}finally{bitmap.close();}}
  document.addEventListener('change',function(e){if(e.target.id!=='reviewImageInput')return;var gen=generation,key=formKey;imageBusy=true;imageData='';feedback('Подготавливаем изображение…');resizeImage(e.target.files[0]).then(function(data){if(gen!==generation||key!==formKey)return;imageData=data;document.getElementById('reviewImagePreview').innerHTML='<img class="review-image" src="'+data+'" alt="Прикреплённый скриншот">'+button('Убрать изображение','remove-image');feedback('');}).catch(function(err){if(gen===generation)feedback(err.message);}).finally(function(){if(gen===generation)imageBusy=false;});});
  document.addEventListener('submit',function(e){if(!['reviewCreateForm','reviewReplyForm'].includes(e.target.id))return;e.preventDefault();if(busy)return;if(imageBusy){feedback('Дождитесь подготовки изображения');return;}var f=e.target,values=new FormData(f),payload=f.id==='reviewCreateForm'?{action:'create',requestId:formKey,type:f.dataset.type,title:values.get('title'),question:values.get('question'),context:values.get('context'),outcome:values.get('outcome'),forCoach:values.get('audience')==='coach',image:imageData}:{action:'reply',id:thread.id,requestId:replyKey,parentId:parentId,text:values.get('text')};var gen=generation;setBusy(true);feedback('Отправляем…');api(payload).then(function(d){if(gen!==generation)return;renderThread(d.thread,true);if(typeof window.pokerTrackEngagement==='function')window.pokerTrackEngagement(payload.action==='reply'?'review_reply_created':'review_created',{entity:d.thread.id,source:'club-reviews',once:true,onceKey:payload.requestId});feedback('Опубликовано');window.dispatchEvent(new Event('poker-reviews-updated'));}).catch(function(err){if(gen===generation)feedback(err.message);}).finally(function(){if(gen===generation)setBusy(false);});});
  document.addEventListener('click',function(e){var el=e.target.closest('[data-review-action]');if(!el||busy)return;var action=el.dataset.reviewAction,id=el.dataset.id;
    if(action==='new-question'||action==='new-hand'){form(action==='new-hand'?'hand':'question');return;}
    if(['all','mine','back','reload','more'].includes(action)){if(action==='all'||action==='mine')mine=action==='mine';loadList(action==='more');return;}
    if(action==='open'){open(id);return;}
    if(action==='remove-image'){imageData='';document.getElementById('reviewImageInput').value='';document.getElementById('reviewImagePreview').innerHTML='';return;}
    if(action==='reply-to'){parentId=id;var reply=thread.replies.find(function(r){return r.id===id;});document.getElementById('reviewReplyTarget').textContent='В ответ '+reply.authorName;document.querySelector('#reviewReplyForm textarea').focus();return;}
    if(!thread)return;
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
  window.addEventListener('poker-telegram-auth',function(){generation++;serial++;viewerId='';if(answerObserver)answerObserver.disconnect();rows=[];thread=null;busy=false;imageData='';imageBusy=false;formKey='';replyKey='';parentId='';if(root())root().innerHTML='';feedback('');if(document.querySelector('[data-view="club-reviews"].view--active'))window.initClubReviews();});
})();
