(function(){
'use strict';
window.pokerOpenBilliardsEquipment=function(entry,hall,onSaved){
 var cue=entry==='cues',catalog=cue?window.PokerBilliardsCues:window.PokerBilliardsTables;
 if(!catalog||!hall?.self||!hall.accountId)return false;
 var items=cue?catalog.cues:catalog.skins,level=Number(hall.garage?.stats?.level)||0,key='p21:billiards:'+(cue?'cue':'table')+':v1:'+hall.accountId,saved;
 try{saved=localStorage.getItem(key);}catch(_){}
 var wins=Number(hall.superShot?.wins)||0;function unlocked(item){return cue?catalog.unlocked(item,level,wins):item.level<=level;}
 var selected=catalog.available(saved,level,wins),d=document.createElement('dialog');d.className='hall-equipment hall-equipment--strip';d.setAttribute('aria-label',cue?'Выбрать кий':'Выбрать стол');
 d.innerHTML='<header><div><small>TWO ACES · КОЛЛЕКЦИЯ</small><h2></h2></div><button type="button" data-close aria-label="Закрыть">✕</button></header><p data-level></p><div class="hall-equipment__list"></div><footer><p role="status" data-status></p><button type="button" data-save>Сохранить</button><small>Меняется внешний вид. Правила и физика одинаковые.</small></footer>';
 d.querySelector('h2').textContent=cue?'Выбрать кий':'Выбрать стол';d.querySelector('[data-level]').textContent='Уровень '+level+' · доступно '+items.filter(unlocked).length+' из '+items.length+(cue?' · Суперударов: '+wins+' · Жетонов: '+(hall.superShot?.tokens||0):'');
 if(cue){var shop=document.createElement('div');shop.className='hall-equipment__rewards';d.querySelector('[data-level]').after(shop);function paintShop(){shop.replaceChildren();var progress=hall.superShot||{wins:0,tokens:0,effects:[]};d.querySelector('[data-level]').textContent='Уровень '+level+' · Суперударов: '+wins+' · Жетонов: '+progress.tokens;[['master-spark','Вспышка у лузы'],['master-trail','Золотой след шара'],['master-victory','Сияние победы']].forEach(function(pair){var owned=progress.effects?.includes(pair[0]),chosen=owned&&(progress.selectedEffect||'master-spark')===pair[0],button=document.createElement('button');button.type='button';button.textContent=pair[1]+(chosen?' · ✓ Выбрано':owned?' · Выбрать':' · 3 жетона');button.disabled=chosen||!owned&&progress.tokens<3;button.onclick=async function(){shop.querySelectorAll('button').forEach(b=>b.disabled=true);try{var result=await window.pokerSocialRequest('billiards',{action:'super-shot-shop',item:pair[0]});hall.superShot=result.superShot;d.querySelector('[data-status]').textContent='✓ Оформление сохранено';}catch(error){d.querySelector('[data-status]').textContent=error.message||'Не удалось сохранить оформление.';}paintShop();};shop.append(button);});}paintShop();}
 var list=d.querySelector('.hall-equipment__list'),hallDialog=document.querySelector('.player-hall-dialog[open]'),confirmed=selected,saveQueue=Promise.resolve(),selectionVersion=0;
 if(hallDialog)hallDialog.classList.add('has-billiards-picker');
 function preview(item){if(cue)localStorage.setItem(key,item.id);else window.PokerBilliardsEquipmentSync.preview(hall.accountId,item.id);onSaved?.(item);}
 function choose(item){selected=item;var version=++selectionVersion;preview(item);paint();d.querySelector('[data-status]').textContent='Сохраняем…';saveQueue=saveQueue.catch(function(){}).then(async function(){if(version!==selectionVersion)return;try{if(!cue)await window.PokerBilliardsEquipmentSync.save(hall.accountId,item.id,window.pokerSocialRequest);confirmed=item;if(version===selectionVersion)d.querySelector('[data-status]').textContent='✓ Применено';else preview(selected);}catch(_){if(version===selectionVersion){selected=confirmed;preview(confirmed);paint();d.querySelector('[data-status]').textContent='Не удалось сохранить. Попробуйте ещё раз.';}}});}
 function paint(){for(var card of list.children){var item=items.find(i=>i.id===card.dataset.item);card.setAttribute('aria-pressed',String(item.id===selected.id));card.querySelector('span').textContent=!unlocked(item)?(item.superShotWins?'🔒 За '+item.superShotWins+' суперударов':'🔒 С '+item.level+' уровня'):item.id===selected.id?'✓ Выбран':'Выбрать';}}
 items.forEach(function(item){var card=document.createElement('button');card.type='button';card.dataset.item=item.id;card.disabled=!unlocked(item);var image=document.createElement('img');image.src=cue?item.art:item.image;image.alt=item.name;image.loading='lazy';image.className=cue?'is-cue':'';var title=document.createElement('strong');title.textContent=item.name;var desc=document.createElement('small');desc.textContent=cue?(item.superShotWins?(item.superShotWins===1?'За первый суперудар':'За '+item.superShotWins+' суперударов'):item.level?'С '+item.level+' уровня':'Доступен всем'):item.description;var state=document.createElement('span');card.append(image,title,desc,state);card.onclick=function(){if(cue)choose(item);else{selected=item;paint();}};list.append(card);});paint();
 d.querySelector('[data-close]').onclick=function(){d.close();};var saveButton=d.querySelector('[data-save]');
 if(cue){saveButton.remove();d.querySelector('footer small').remove();}
 else saveButton.onclick=async function(){
  saveButton.disabled=true;list.inert=true;
  d.querySelector('[data-status]').textContent='Сохраняем…';
  try{
   await window.PokerBilliardsEquipmentSync.save(hall.accountId,selected.id,window.pokerSocialRequest);
   onSaved?.(selected);
   if(d.open)d.close();
  }catch(error){
   d.querySelector('[data-status]').textContent=error.message||'Не удалось сохранить стол.';
  }finally{saveButton.disabled=false;list.inert=false;}
 };
 d.addEventListener('close',function(){if(hallDialog)hallDialog.classList.remove('has-billiards-picker');d.remove();},{once:true});document.body.append(d);d.showModal();return true;
};
})();
