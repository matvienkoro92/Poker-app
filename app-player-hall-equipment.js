(function(){
'use strict';
window.pokerOpenBilliardsEquipment=function(entry,hall,onSaved){
 var cue=entry==='cues',catalog=cue?window.PokerBilliardsCues:window.PokerBilliardsTables;
 if(!catalog||!hall?.self||!hall.accountId)return false;
 var items=cue?catalog.cues:catalog.skins,level=Number(hall.garage?.stats?.level)||0,key='p21:billiards:'+(cue?'cue':'table')+':v1:'+hall.accountId,saved;
 try{saved=localStorage.getItem(key);}catch(_){}
 var selected=catalog.available(saved,level),d=document.createElement('dialog');d.className='hall-equipment';d.setAttribute('aria-label',cue?'Выбрать кий':'Выбрать стол');
 d.innerHTML='<header><div><small>TWO ACES · КОЛЛЕКЦИЯ</small><h2></h2></div><button type="button" data-close aria-label="Закрыть">✕</button></header><p data-level></p><div class="hall-equipment__list"></div><footer><p role="status" data-status></p><button type="button" data-save>Сохранить</button><small>Меняется внешний вид. Правила и физика одинаковые.</small></footer>';
 d.querySelector('h2').textContent=cue?'Выбрать кий':'Выбрать стол';d.querySelector('[data-level]').textContent='Уровень '+level+' · доступно '+items.filter(i=>i.level<=level).length+' из '+items.length;
 var list=d.querySelector('.hall-equipment__list');
 function paint(){for(var card of list.children){var item=items.find(i=>i.id===card.dataset.item);card.setAttribute('aria-pressed',String(item.id===selected.id));card.querySelector('span').textContent=item.level>level?'🔒 С '+item.level+' уровня':item.id===selected.id?'✓ Выбран':'Выбрать';}}
 items.forEach(function(item){var card=document.createElement('button');card.type='button';card.dataset.item=item.id;card.disabled=item.level>level;var image=document.createElement('img');image.src=cue?item.art:item.image;image.alt=item.name;image.loading='lazy';image.className=cue?'is-cue':'';var title=document.createElement('strong');title.textContent=item.name;var desc=document.createElement('small');desc.textContent=cue?(item.level?'С '+item.level+' уровня':'Доступен всем'):item.description;var state=document.createElement('span');card.append(image,title,desc,state);card.onclick=function(){selected=item;paint();};list.append(card);});paint();
 d.querySelector('[data-close]').onclick=function(){d.close();};d.querySelector('[data-save]').onclick=function(){try{localStorage.setItem(key,selected.id);onSaved?.(selected);d.close();}catch(_){d.querySelector('[data-status]').textContent='Не удалось сохранить выбор. Разрешите хранение данных в браузере.';}};
 d.addEventListener('close',function(){d.remove();},{once:true});document.body.append(d);d.showModal();return true;
};
})();
