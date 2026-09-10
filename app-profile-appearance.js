(function(){
  'use strict';
  var generation=0,ownRequest=null,ownData=null,dialog=null,selection=null,saving=false,loadedAt=0,embeddedCard=null,cardHome=null;
  function esc(s){return pokerSocialEscape(s);}
  function apply(root,data){if(!root)return;if(window.pokerRenderProfileHero)window.pokerRenderProfileHero(root,data&&data.hero);var avatar=root.querySelector('.chat-user-modal__avatar-wrap');if(avatar)avatar.dataset.appearanceFrame=data&&data.frame||'none';var old=root.querySelector('.profile-featured-achievement');if(old)old.remove();if(root===ownRoot())return;if(data&&data.achievement){var badge=document.createElement('div');badge.className='profile-featured-achievement';badge.textContent=data.achievement.icon+' '+data.achievement.title;badge.setAttribute('aria-label','Витринная ачивка: '+data.achievement.title);var title=root.querySelector('.chat-user-modal__title-block');if(title)title.appendChild(badge);}}
  function ownRoot(){return document.getElementById('profilePublicShowcase');}
  window.pokerRefreshOwnAppearance=function(force){
    if(!ownRoot())return Promise.resolve(null);
    if(typeof pokerApiHasCredential!=='function'||!pokerApiHasCredential()){apply(ownRoot(),null);return Promise.resolve(null);}
    if(ownRequest)return ownRequest;
    if(!force&&ownData&&Date.now()-loadedAt<15000){apply(ownRoot(),ownData);return Promise.resolve(ownData);}
    var gen=generation;
    var request=pokerSocialRequest('profile-appearance',{action:'get'}).then(function(d){if(gen!==generation)return null;ownData=d.appearance;loadedAt=Date.now();apply(ownRoot(),ownData);return ownData;}).finally(function(){if(ownRequest===request)ownRequest=null;});ownRequest=request;return request;
  };
  window.pokerApplyMemberAppearance=function(id,root){if(!root)return;apply(root,null);var key=String(id)+':'+Math.random();root._appearanceRequest=key;var gen=generation;pokerSocialRequest('profile-appearance',{action:'get',targetId:id}).then(function(d){if(gen===generation&&root._appearanceRequest===key){apply(root,d.appearance);if(root===embeddedCard)preview();}}).catch(function(){});};
  function releaseCard(){
    if(!embeddedCard)return;
    var card=embeddedCard;embeddedCard=null;
    if(typeof window.pokerCloseChatUserModal==='function')window.pokerCloseChatUserModal();
    card.classList.remove('chat-user-modal--appearance-editor');
    apply(card,ownData);
    if(cardHome&&cardHome.parentNode)cardHome.replaceWith(card);
    cardHome=null;
  }
  function preview(){
    if(!dialog||!selection)return;
    var a=ownData.achievements.find(function(row){return row.id===selection.achievement;});
    apply(embeddedCard,{frame:selection.frame,achievement:a||null,hero:ownData.hero});
    dialog.querySelectorAll('[data-appearance-frame-choice]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.appearanceFrameChoice===selection.frame));});
  }
  async function mountCard(data){
    var gen=generation;
    if(typeof window.pokerEnsureLazyDomains==='function')await window.pokerEnsureLazyDomains(['chat'],{styles:true,scripts:true});
    if(typeof window.pokerEnsureGlobalModalsHtml==='function')await window.pokerEnsureGlobalModalsHtml();
    if(gen!==generation||!dialog.open)return;
    if(typeof window.pokerEnsureChatUserModalReady!=='function'||!window.pokerEnsureChatUserModalReady())throw new Error('Не удалось загрузить карточку профиля. Попробуйте ещё раз.');
    var card=document.getElementById('chatUserModal');
    cardHome=document.createComment('public-profile-home');card.before(cardHome);
    embeddedCard=card;
    card.classList.add('chat-user-modal--appearance-editor');
    dialog.querySelector('.appearance-public-card').appendChild(card);
    var avatar=document.getElementById('profilePublicAvatar');
    window.openChatUserModalById(data.accountId,data.name,avatar&&avatar.style.display!=='none'?avatar.src:'',{selfProfile:true});
    preview();
  }
  function render(data){
    ownData=data;selection={frame:data.frame,achievement:data.achievement?data.achievement.id:''};
    dialog.innerHTML='<form method="dialog" class="appearance-close-row"><button class="social-button" aria-label="Закрыть оформление">✕</button></form><span class="social-kicker">Ваша карточка в клубе</span><h2 id="appearanceTitle">Оформить профиль</h2><p class="social-muted">Рамку и ачивку увидят игроки, открывшие ваш профиль.</p><div class="hero-editor"></div><details class="appearance-card-preview"><summary>Как профиль видят другие игроки</summary><div class="appearance-public-card"></div></details><h3>Рамка аватара</h3><div class="appearance-frames">'+data.frames.map(function(f){return '<button type="button" class="social-button" data-appearance-frame-choice="'+f.id+'" aria-pressed="'+(f.id===data.frame)+'"><span class="appearance-swatch" data-appearance-frame="'+f.id+'"></span>'+esc(f.title)+'</button>';}).join('')+'</div><label class="appearance-label">Витринная ачивка<select id="appearanceAchievement"><option value="">Без ачивки</option>'+data.achievements.map(function(a){return '<option value="'+a.id+'"'+(a.id===selection.achievement?' selected':'')+'>'+esc(a.title)+'</option>';}).join('')+'</select></label>'+(!data.achievements.length?'<p class="social-muted">Здесь появятся заработанные турнирные ачивки после публикации результатов и привязки Poker21.</p>':'')+'<p class="social-muted">На витрине доступны турнирные достижения: победы, герой дня, миллион призовых и крупные заносы.</p><p id="appearanceFeedback" role="status" aria-live="polite"></p><button type="button" id="appearanceSave" class="social-button social-button--primary">Сохранить оформление</button>';
    if(window.pokerMountHeroEditor)window.pokerMountHeroEditor(dialog.querySelector('.hero-editor'),data.hero);
    return mountCard(data);
  }
  function open(){
    if(!dialog){dialog=document.createElement('dialog');dialog.className='appearance-dialog';dialog.setAttribute('aria-labelledby','appearanceTitle');document.body.appendChild(dialog);dialog.addEventListener('cancel',function(e){if(saving)e.preventDefault();});dialog.addEventListener('close',releaseCard);}
    releaseCard();
    dialog.innerHTML='<h2 id="appearanceTitle">Оформить профиль</h2><p role="status">Загружаем оформление…</p><form method="dialog"><button class="social-button">Закрыть</button></form>';if(!dialog.open)dialog.showModal();
    var gen=generation;window.pokerRefreshOwnAppearance(true).then(function(data){if(gen!==generation||!dialog.open)return;if(!data)throw new Error('Войдите в аккаунт, чтобы оформить профиль');return render(data);}).catch(function(e){if(gen!==generation)return;releaseCard();dialog.innerHTML='<h2 id="appearanceTitle">Оформить профиль</h2><p role="alert">'+esc(e.message)+'</p><form method="dialog"><button class="social-button">Закрыть</button></form>';});
  }
  document.addEventListener('click',function(e){
    if(e.target.closest('[data-profile-appearance-open]')){open();return;}
    var frame=e.target.closest('[data-appearance-frame-choice]');if(frame&&selection&&!saving){selection.frame=frame.dataset.appearanceFrameChoice;preview();return;}
    if(e.target.id!=='appearanceSave'||saving)return;
    var gen=generation;saving=true;dialog.querySelectorAll('button,select').forEach(function(el){el.disabled=true;});dialog.querySelector('#appearanceFeedback').textContent='Сохраняем…';
    pokerSocialRequest('profile-appearance',{action:'save',frame:selection.frame,achievement:selection.achievement}).then(function(d){if(gen!==generation)return;ownData=d.appearance;loadedAt=Date.now();apply(ownRoot(),ownData);if(typeof window.pokerTrackEngagement==='function')window.pokerTrackEngagement('appearance_saved',{source:'profile'});dialog.querySelector('#appearanceFeedback').textContent='Оформление сохранено';window.dispatchEvent(new Event('poker-profile-appearance-updated'));}).catch(function(e){if(gen===generation)dialog.querySelector('#appearanceFeedback').textContent=e.message;}).finally(function(){if(gen!==generation)return;saving=false;dialog.querySelectorAll('button,select').forEach(function(el){el.disabled=false;});});
  });
  document.addEventListener('change',function(e){if(e.target.id==='appearanceAchievement'&&selection&&!saving){selection.achievement=e.target.value;preview();}});
  window.addEventListener('poker-hero-updated',function(e){if(!ownData)return;ownData.hero=e.detail;apply(ownRoot(),ownData);if(embeddedCard)preview();});
  window.addEventListener('poker-telegram-auth',function(){generation++;ownData=null;ownRequest=null;loadedAt=0;selection=null;saving=false;apply(ownRoot(),null);var modal=document.getElementById('chatUserModal');if(modal){modal._appearanceRequest='';apply(modal,null);}releaseCard();if(dialog){dialog.close();dialog.innerHTML='';}});
})();
