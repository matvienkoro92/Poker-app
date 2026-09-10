(function(){
  'use strict';
  var C=window.POKER_HERO_CATALOG,hero=null,host=null,busy=false,epoch=0,tab='skills',notice='',retry=null,quiz=null;
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function itemName(i){var set=C.sets.find(function(s){return s.id===i.set;});return set?set.pieces[C.slots.findIndex(function(s){return s.id===i.slot;})]:'Предмет';}
  function color(i){return i?C.rarities[i.rarity].color:'#727b84';}
  function figure(data){
    var gear={};(data.equippedItems||[]).forEach(function(i){gear[i.slot]=i;});
    function ink(slot){var i=gear[slot],set=i&&C.sets.find(function(s){return s.id===i.set;});return set?set.color:'#75634f';}
    return '<svg class="hero-figure" viewBox="0 0 320 380" role="img" aria-label="Герой клуба '+((data.equippedItems||[]).length?'в выбранной экипировке':'без экипировки')+'">'+
      '<ellipse cx="160" cy="351" rx="94" ry="15" fill="#000" opacity=".45"/>'+
      (gear.aura?'<g fill="none" stroke="'+ink('aura')+'"><circle cx="160" cy="187" r="136" opacity=".4" stroke-width="3"/><circle cx="160" cy="187" r="127" opacity=".2" stroke-dasharray="4 12" stroke-width="8"/><path d="M160 39V19M160 355v-20M13 187h22M286 187h22" stroke-width="3"/></g>':'')+
      '<path d="M207 262 Q291 270 259 205 Q245 184 240 213" fill="none" stroke="#684635" stroke-width="19" stroke-linecap="round"/>'+
      '<g stroke="#251c1c" stroke-width="4" stroke-linejoin="round"><path d="M126 258L117 331Q107 350 139 349L152 272M173 272L182 347Q219 352 205 330L194 254" fill="#8e6042"/>'+
      '<path d="M111 143Q80 151 78 215L68 269Q75 286 89 272L108 218L126 181M205 144Q235 150 243 213L253 267Q246 285 232 272L213 213L193 180" fill="#9b6949"/>'+
      '<path d="M112 145Q160 123 206 145L200 256Q160 280 119 255Z" fill="#956345"/><path d="M137 162Q159 154 183 164L186 235Q160 248 133 234Z" fill="#c69865" stroke="none"/>'+
      '<path d="M117 244Q160 257 202 244L198 282L165 279L160 264L153 280L123 282Z" fill="#3b4149"/>'+
      '<circle cx="109" cy="93" r="22" fill="#9d704f"/><circle cx="213" cy="93" r="22" fill="#9d704f"/><path d="M113 116Q93 67 123 46Q158 16 198 46Q230 75 206 120L188 142L132 140Z" fill="#805138"/>'+
      '<path d="M117 86Q123 59 147 74Q160 84 172 74Q198 60 207 87L201 120Q162 157 122 120Z" fill="#d4a66f"/>'+
      '<path d="M126 87l23 3M174 90l22-5" stroke="#39251e" stroke-width="7"/><ellipse cx="139" cy="94" rx="4" ry="6" fill="#141b1b" stroke="none"/><ellipse cx="185" cy="94" rx="4" ry="6" fill="#141b1b" stroke="none"/><path d="M155 108h13M141 122Q163 134 185 120" fill="none" stroke="#593923"/>'+
      (gear.body?'<path d="M110 148L137 140L160 167L185 140L209 149L200 248L120 248Z" fill="'+ink('body')+'"/><path d="M137 150L148 240M184 150L174 240M124 194h73" fill="none" stroke="#f2db9c" stroke-width="3"/><path d="M151 180l9-9 10 9-10 12Z" fill="#f8dfa2"/>':'')+
      (gear.head?'<path d="M110 69L105 36L137 53L160 23L184 53L215 37L209 70Q161 55 110 69Z" fill="'+ink('head')+'"/><path d="M151 52l9-12 10 12-10 10Z" fill="#ffe7a5"/>':'')+
      (gear.feet?'<path d="M115 310L141 313L140 348L105 348L109 331ZM180 313L205 309L210 331L218 350L181 348Z" fill="'+ink('feet')+'"/><path d="M118 319l20 4M184 323l18-4" stroke="#f4d998"/>':'')+
      (gear.hand?'<path d="M67 303L91 170L96 151L106 172L80 305Z" fill="'+ink('hand')+'"/><path d="M60 266l41 8M72 287l-4 25" stroke="#f5cf7a" stroke-width="8"/>':'')+
      (gear.charm?'<path d="M137 142Q162 194 184 142" fill="none" stroke="#f5d281" stroke-width="3"/><path d="M150 178l11-12 12 12-12 17Z" fill="'+ink('charm')+'"/>':'')+
      '</g></svg>';
  }
  function stage(data){return '<div class="hero-stage">'+figure(data)+'<div class="hero-stage-caption"><span>ГЕРОЙ КЛУБА</span><strong>Уровень '+data.level+'</strong></div></div><div class="hero-attributes"><span>⚔ <b>'+data.stats.power+'</b> Техника</span><span>◈ <b>'+data.stats.guard+'</b> Дисциплина</span><span>✧ <b>'+data.stats.discovery+'</b> Практика</span></div>';}
  window.pokerRenderProfileHero=function(root,data){
    if(!root)return;var old=root.querySelector('.profile-rpg-hero');if(!data){if(old)old.remove();var previous=root.querySelector('.hero-status-only');if(previous)previous.classList.remove('hero-status-only');return;}
    var target=root.querySelector('.chat-user-modal__hero');if(!target)return;target.classList.add('hero-status-only');
    var section=old||document.createElement('section');section.className='profile-rpg-hero';section.setAttribute('data-chat-user-profile-panel','main');
    section.innerHTML=stage(data)+'<p class="hero-public-gear">'+((data.equippedItems||[]).map(function(i){return '<span style="color:'+color(i)+'">'+esc(itemName(i))+'</span>';}).join(' · ')||'Пока без экипировки')+'</p>';
    var trained=C.skills.filter(function(s){return (data.skills[s.id]||0)>0;});if(trained.length)section.innerHTML+='<p class="hero-public-gear">'+trained.map(function(s){return esc(s.name)+' '+data.skills[s.id]+'/'+s.max;}).join(' · ')+'</p>';
    if(!old)target.insertAdjacentElement('beforebegin',section);
  };
  function button(action,label,attrs,disabled){return '<button type="button" class="hero-button" data-hero-action="'+action+'" '+(attrs||'')+((busy||retry||disabled)?' disabled':'')+'>'+label+'</button>';}
  function render(){
    if(!host||!host.isConnected||!hero)return;
    var h=hero,slots=C.slots.map(function(slot){var i=h.equippedItems.find(function(item){return item.slot===slot.id;});return '<div class="hero-slot" style="--item-color:'+color(i)+'"><span>'+slot.icon+' '+slot.name+'</span><strong>'+esc(i?itemName(i):'Пусто')+'</strong>'+(i?button('unequip','Снять','data-slot="'+slot.id+'"'):'')+'</div>';}).join('');
    var content='';
    if(tab==='skills')content='<p class="hero-help">За каждый уровень после первого — одно очко. Чтобы вложить его, решите задачу по теме. Для следующего навыка нужны 5 рангов предыдущего. Сброс бесплатный.</p><div class="hero-branches">'+C.branches.map(function(branch){return '<section style="--branch-color:'+branch.color+'"><h4>'+branch.name+'</h4>'+C.skills.filter(function(s){return s.branch===branch.id;}).map(function(s){var rank=h.skills[s.id]||0,locked=h.level<s.level||(s.requires&&(h.skills[s.requires]||0)<5);return '<div class="hero-skill"><strong>'+s.name+' <small>'+rank+'/'+s.max+'</small></strong><p>'+s.description+'</p>'+(locked?'<small>Ур. '+s.level+(s.requires?' · предыдущий навык 5/15':'')+'</small>':'')+button('train','+ Навык','data-skill="'+s.id+'"',locked||h.points<1||rank>=s.max)+'</div>';}).join('')+'</section>';}).join('')+'</div>'+button('reset','Сбросить навыки','',Object.keys(h.skills).length===0);
    if(tab==='inventory')content='<p class="hero-help">Три вещи одного комплекта: +5 к его характеристике. Шесть: ещё +10. Разберите ненужные вещи на осколки; за 20 создайте вещь выбранного слота.</p><div class="hero-inventory">'+(h.inventory.map(function(i){var set=C.sets.find(function(s){return s.id===i.set;}),r=C.rarities[i.rarity],equipped=h.equippedItems.some(function(e){return e.id===i.id;});return '<article class="hero-item" style="--item-color:'+r.color+'"><small>'+r.name+' · '+C.slots.find(function(s){return s.id===i.slot;}).name+'</small><strong>'+esc(itemName(i))+'</strong><p>'+set.name+' · +'+(r.bonus+Math.floor(i.level/10))+' '+({power:'техники',guard:'дисциплины',discovery:'практики'}[set.stat])+'</p>'+button('equip',equipped?'Надето':'Надеть','data-item="'+i.id+'"',equipped)+button('salvage','Разобрать +'+r.bonus,'data-item="'+i.id+'"',equipped)+'</article>';}).join('')||'<p class="hero-empty">Рюкзак пуст. Откройте награду за уровень или отправьтесь в приключение.</p>')+'</div><h4>Мастерская · '+h.dust+' осколков</h4><div class="hero-craft">'+C.slots.map(function(s){return button('craft',s.icon+' '+s.name+' · 20','data-slot="'+s.id+'"',h.dust<20);}).join('')+'</div>';
    if(tab==='adventure')content='<p class="hero-help">Одна тренировка с добычей в день, обновление в 00:00 мск. Решите покерную задачу и получите вещь. Техника и дисциплина героя открывают новые темы, практика улучшает редкость добычи.</p>'+C.expeditions.map(function(r){return '<article class="hero-route"><strong>'+r.name+'</strong><p>'+r.description+'</p><small>Техника '+r.power+' · Дисциплина '+r.guard+'</small>'+button('adventure',h.adventureAvailable?'Решить задачу':'Сегодня добыча уже получена','data-route="'+r.id+'"',!h.adventureAvailable||h.stats.power<r.power||h.stats.guard<r.guard)+'</article>';}).join('')+'<p class="hero-help">Характеристики описывают сборку героя. Полезный навык тренируется в задачах и разборах. Они не меняют выплаты, стоимость билетов и вероятность победы в розыгрыше.</p>';
    host.innerHTML='<div class="hero-editor-heading"><div><span class="social-kicker">Ваш персонаж</span><h3>Собери своего героя</h3></div><span class="hero-points">'+h.points+' очков навыков</span></div>'+stage(h)+'<div class="hero-slots">'+slots+'</div><div class="hero-rewards"><div><strong>Награды за уровни: '+h.chests+'</strong><p>Каждый уровень приносит одну вещь. Снаряжение выбираете вы.</p></div>'+button('chest','Открыть награду','',h.chests<1)+'</div><div class="hero-notice" role="status" aria-live="polite">'+esc(notice)+'</div>'+(retry?'<button type="button" class="hero-button" data-hero-action="retry">Повторить запрос</button>':'')+quizHtml()+'<p class="hero-help">Решено задач: '+(h.practice||0)+'. Закрепите тему в клубе: <button type="button" class="hero-button" data-hero-view="club-reviews">Разборы</button><button type="button" class="hero-button" data-hero-view="schedule">Расписание</button><button type="button" class="hero-button" data-hero-view="my-summary">Моя сводка</button></p>'+'<div class="hero-tabs" role="tablist" aria-label="Развитие героя">'+[{id:'skills',name:'Навыки'},{id:'inventory',name:'Рюкзак · '+h.inventory.length},{id:'adventure',name:'Приключения'}].map(function(t){return '<button type="button" role="tab" aria-selected="'+(tab===t.id)+'" data-hero-tab="'+t.id+'">'+t.name+'</button>';}).join('')+'</div><div class="hero-tab-content" role="tabpanel">'+content+'</div>';
  }
  window.pokerMountHeroEditor=function(container,data){epoch++;host=container;hero=data;busy=false;retry=null;notice='';quiz=null;tab='skills';if(!data){container.innerHTML='<p>Герой пока недоступен. Обновите профиль.</p>';return;}render();};
  async function action(body){
    if(busy)return;busy=true;retry=null;notice='Сохраняем…';render();var gen=epoch;
    try{var response=await pokerSocialRequest('profile-hero',body);if(gen!==epoch)return;hero=response.hero;notice=hero.feedback||'Сохранено';quiz=null;if(['chest','adventure','craft'].includes(body.action)){var item=hero.inventory[hero.inventory.length-1];notice=(hero.feedback?hero.feedback+' ':'')+'Новая добыча: '+itemName(item)+' · '+C.rarities[item.rarity].name;tab='inventory';}window.dispatchEvent(new CustomEvent('poker-hero-updated',{detail:hero}));}
    catch(e){if(gen!==epoch)return;notice=e.message||'Не удалось сохранить';try{var fresh=await pokerSocialRequest('profile-hero',{action:'get'});if(gen!==epoch)return;hero=fresh.hero;window.dispatchEvent(new CustomEvent('poker-hero-updated',{detail:hero}));}catch(_){retry=body;notice+=' · Проверьте связь и повторите запрос';}}
    finally{if(gen===epoch){busy=false;render();}}
  }
  function quizHtml(){
    if(!quiz)return '';
    return '<form class="hero-quiz"><h4>Проверка решения</h4><p>'+esc(quiz.lesson.question)+'</p>'+quiz.lesson.choices.map(function(choice,index){return '<label><input type="radio" name="hero-answer" value="'+index+'" required '+(busy?'disabled':'')+'> '+esc(choice)+'</label>';}).join('')+'<button type="submit" class="hero-button" '+(busy?'disabled':'')+'>Проверить и прокачать</button><button type="button" class="hero-button" data-hero-cancel>Отмена</button></form>';
  }
  document.addEventListener('submit',function(e){
    if(!e.target.matches('.hero-quiz'))return;e.preventDefault();if(!quiz||busy)return;
    var checked=e.target.querySelector('input:checked');if(!checked)return;
    action(Object.assign({},quiz.body,{version:hero.version,requestId:crypto.randomUUID(),lessonId:quiz.lesson.id,answer:Number(checked.value)}));
  });
  document.addEventListener('click',function(e){
    var view=e.target.closest('[data-hero-view]');if(view&&host&&host.contains(view)){var dialog=host.closest('dialog');if(dialog)dialog.close();if(typeof setView==='function')setView(view.dataset.heroView);return;}
    if(e.target.closest('[data-hero-cancel]')){quiz=null;render();return;}
    var t=e.target.closest('[data-hero-tab]');if(t&&host&&host.contains(t)){tab=t.dataset.heroTab;quiz=null;render();return;}
    var b=e.target.closest('[data-hero-action]');if(!b||!host||!host.contains(b)||busy)return;
    if(b.dataset.heroAction==='retry'){if(retry)action(retry);return;}
    var body={action:b.dataset.heroAction,version:hero.version,requestId:crypto.randomUUID(),skill:b.dataset.skill,item:b.dataset.item,slot:b.dataset.slot,route:b.dataset.route};
    if(body.action==='train'||body.action==='adventure'){
      var lesson=body.action==='train'?hero.lessons[body.skill]:hero.challenges[body.route];quiz={body:body,lesson:lesson};notice='';render();var form=host.querySelector('.hero-quiz');form.scrollIntoView({block:'center',behavior:'smooth'});form.querySelector('input').focus();return;
    }
    action(body);
  });
  window.addEventListener('poker-telegram-auth',function(){epoch++;hero=null;host=null;busy=false;retry=null;});
})();
