(function(){'use strict';const B=window.PokerBicycle;if(!B)return;const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function transportPartIcon(kind){
 const paths={
 body:'M5 18l9-12 5 4-9 12H5v-4Z M12 8l5 4 M17 2l1 3 M21 6l2 1 M4 13c-3 3-3 5-1 5s3-2 1-5Z',
 deck:'M3 15 16 7l5 3-13 8-5-3Z M3 15v3l5 3 13-8v-3 M8 18v3 M8 13l6-4 M11 15l6-4',
 wheels:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20 M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12 M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4 M12 6v4 M18 12h-4 M12 18v-4 M6 12h4',
 brakes:'M12 3a9 9 0 1 0 9 9 M12 7a5 5 0 1 0 5 5 M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4 M14 2h6l2 8-5 2-3-10Z M7 6l1 1 M4 12h2 M7 18l1-1 M12 19v-2',
 suspension:'M8 2l3 3 M17 19l3 3 M10 4l-4 6 8-2-6 6 8-2-6 6 8-2-4 6 M7 3l3-2 M18 23l3-2',
 motor:'M5 8h13v12H5Z M8 8V5h7v3 M2 11h3 M2 17h3 M18 11h4v6h-4 M12 10l-3 5h4l-2 4',
 frame:'M3 18 8 6l6 12H3Z M8 6h8l5 12h-7 M6 3h5 M15 3h4 M17 3l-1 3',
 tyres:'M7 3h10l3 5v9l-3 4H7l-3-4V8l3-5Z M9 3v18 M15 3v18 M4 8h5 M4 13h5 M4 17h5 M15 8h5 M15 13h5 M15 17h5',
 lights:'M12 6v12H8a6 6 0 0 1 0-12h4Z M16 6l5-2 M16 12h6 M16 18l5 2',
 cockpit:'M3 5h6l3 7 3-7h6 M12 12v10 M9 2v6 M15 2v6'
 };
 return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+(paths[kind]||paths.lights)+'"/></svg>';
}
function mountTransport(root,view,editable,onSave,options){const B=options.catalog,transport=options.transport;
 root._bikeDispose?.();const level=view?.level||1;let draft=B.normalize(view?.loadout,level),viewer=null,busy=false,dead=false,kind=Object.keys(B.groups)[0];
 root.classList.add('bicycle-workshop','micro-workshop','garage-workshop--fitted','garage-workshop--car');
 const editableParts=Object.keys(B.groups).length>0;
 root.innerHTML='<header class="garage-workshop__header"><div><span>TWO ACES · УРОВЕНЬ '+level+'</span><h3>'+(editableParts?'Апгрейд '+(transport==='scooter'?'самоката':'велосипеда'):options.title)+'</h3></div><button type="button" data-bike-close aria-label="Закрыть настройки">×</button></header><div class="garage-customizer-layout" data-category="micro"><div class="garage-preview garage-preview--3d"><div class="bicycle-workshop__stage garage-3d-stage" tabindex="0" aria-label="3D-транспорт: потяните, чтобы повернуть"><p>Загружаем 3D-модель…</p></div><p class="garage-orbit-hint">Потяните, чтобы повернуть</p></div>'+(editableParts?'<nav class="garage-categories" aria-label="Детали транспорта"></nav>':'')+'</div><div class="bicycle-workshop__parts garage-options"></div>'+(editableParts?'<footer class="garage-workshop__footer"><p role="status"></p><div><button type="button" data-bike-reset>Сбросить</button>'+(options.preset?'<button type="button" data-transport-preset '+(level<12||!editable?'disabled':'')+'>'+(level>=12?'Комплектация Hyper':'Hyper · с 12-го ур.')+'</button>':'')+(editable?'<button type="button" class="bicycle-workshop__save garage-save" data-bike-save>Сохранить</button>':'')+'</div></footer>':'<p class="micro-workshop__description">'+options.hint+'</p><p role="status" hidden></p>');
 const stage=root.querySelector('.bicycle-workshop__stage'),parts=root.querySelector('.bicycle-workshop__parts'),status=root.querySelector('[role=status]');
 function paint(){
 const categories=root.querySelector('.garage-categories');if(categories)categories.innerHTML=Object.entries(B.groups).map(([id,title])=>'<button type="button" data-micro-kind="'+id+'" aria-pressed="'+(kind===id)+'"><span class="garage-category-icon" aria-hidden="true">'+transportPartIcon(id)+'</span><span>'+esc(title)+'</span></button>').join('');
 parts.hidden=!editableParts;parts.innerHTML=B.catalog(level).filter(i=>i.kind===kind).map(i=>'<button type="button" class="garage-option" data-bike-kind="'+i.kind+'" data-bike-item="'+i.id+'" aria-pressed="'+(draft[i.kind]===i.id)+'"'+(!i.unlocked||!editable||busy?' disabled':'')+'><span class="micro-part-symbol" aria-hidden="true">'+transportPartIcon(i.kind)+'</span><strong>'+esc(i.title)+'</strong><small>'+(i.unlocked?'✓ Доступно':'🔒 С '+i.level+'-го уровня')+'</small><span class="garage-option-action" aria-hidden="true">'+(draft[i.kind]===i.id?'✓ Выбрано':i.unlocked?'Примерить':'Закрыто')+'</span></button>').join('');const save=root.querySelector('[data-bike-save]');if(save)save.disabled=busy;
 }
 function dispose(){if(dead)return;dead=true;viewer?.dispose();observer.disconnect();}
 root._bikeDispose=dispose;const observer=new MutationObserver(()=>{if(!root.isConnected)dispose();});observer.observe(document.body,{subtree:true,childList:true});
 root.onclick=async event=>{const button=event.target.closest('button');if(!button||button.disabled)return;if(button.hasAttribute('data-bike-close')){dispose();const close=root.closest('.player-hall__section-panel')?.querySelector('[data-hall-garage]');if(close)close.click();else root.closest('dialog')?.close();return;}
 if(button.dataset.microKind){kind=button.dataset.microKind;paint();return;}
 if(button.hasAttribute('data-bike-reset')){draft=B.normalize(view?.loadout,level);viewer?.update({...window.PokerGarage.defaults,transport,[transport]:draft});status.textContent='Примерка сброшена';paint();return;}
 if(button.hasAttribute('data-transport-preset')&&level>=12&&editable&&!busy){draft=Object.fromEntries(B.catalog(level).filter(i=>i.unlocked).map(i=>[i.kind,i.id]));viewer?.update({...window.PokerGarage.defaults,transport,[transport]:draft});status.textContent='Комплектация Hyper готова. Сохраните изменения.';paint();return;}
 if(button.dataset.bikeKind){const item=B.catalog(level).find(i=>i.kind===button.dataset.bikeKind&&i.id===button.dataset.bikeItem);if(!item?.unlocked||!editable||busy)return;draft={...draft,[item.kind]:item.id};viewer?.update({...window.PokerGarage.defaults,transport,[transport]:draft});status.textContent='Есть несохранённые изменения';paint();return;}
 if(button.hasAttribute('data-bike-save')&&editable&&!busy){busy=true;status.textContent='Сохраняем…';paint();try{const saved=await onSave({...draft});if(dead)return;draft=B.normalize(saved?.loadout||draft,level);status.textContent=''+options.savedLabel+'';}catch(error){if(!dead)status.textContent=error.message||'Не удалось сохранить';}finally{busy=false;if(!dead)paint();}}
 };
 paint();window.pokerLoadGarageViewer().then(()=>window.pokerPrepareGarageVehicle({transport})).then(()=>{if(dead||!root.isConnected)return;stage.textContent='';viewer=window.pokerCreateGarage3D(stage,{...window.PokerGarage.defaults,transport,[transport]:draft},{yaw:.60,pitch:.19,manual:true});}).catch(()=>{if(!dead)stage.textContent='Не удалось загрузить 3D-модель. Откройте настройки ещё раз.';});
 return {dispose};
}
window.pokerMountBicycleWorkshop=(root,view,editable,onSave)=>mountTransport(root,view,editable,onSave,{catalog:window.PokerBicycle,transport:'bicycle',heading:'ВАШ ВЕЛОСИПЕД',title:'Детали и улучшения',hint:'Улучшения доступны с 1-го по 12-й уровень.',saveLabel:'Сохранить велосипед',savedLabel:'✓ Велосипед сохранён'});
window.pokerMountScooterWorkshop=(root,view,editable,onSave)=>mountTransport(root,view,editable,onSave,{catalog:window.PokerScooter,transport:'scooter',heading:'ВАШ САМОКАТ',title:'От городского до Hyper',hint:'Улучшения с 3-го по 12-й уровень. На 12-м можно собрать полную комплектацию Hyper.',saveLabel:'Сохранить самокат',savedLabel:'✓ Самокат сохранён',preset:true});
window.pokerMountHoverboardPreview=root=>mountTransport(root,{level:7,loadout:{}},false,async()=>({}),{catalog:{groups:{},defaults:{},catalog:()=>[],normalize:()=>({})},transport:'hoverboard',heading:'SKYBOARD',title:'Летающий скейт',hint:'Парящая дека, четыре подъёмных двигателя и неоновый контур. Доступен с 7-го уровня.',saveLabel:'',savedLabel:''});
})();
