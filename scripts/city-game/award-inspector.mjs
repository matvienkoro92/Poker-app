import {villaAwardCaption} from './villa-awards.mjs';

export function createAwardInspector({getInteraction,getState,freeze,resume}){
 let dialog=null,active=null,closing=false;const listeners=[];
 const on=(node,event,fn,options)=>{node.addEventListener(event,fn,options);listeners.push(()=>node.removeEventListener(event,fn,options));};
 function render(record){active=record;const {item,source}=record,caption=villaAwardCaption(item),history=item.history||{};dialog.querySelector('img').src=source;dialog.querySelector('img').alt=caption.title;dialog.querySelector('h2').textContent=caption.title;dialog.querySelector('[data-award-summary]').textContent=caption.description;dialog.querySelector('[data-award-description]').textContent=item.condition||item.origin||'Награда из личной коллекции игрока.';
  const result=history.results?.[0],prize=Number(result?.reward),facts=dialog.querySelector('[data-award-facts]');facts.replaceChildren();for(const [label,value]of [['Награда',item.title],['Призовые',Number.isFinite(prize)&&prize>0?new Intl.NumberFormat('ru-RU').format(prize)+' ₽':null],['Источник',history.source]])if(value){const row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;row.append(dt,dd);facts.append(row);}
  const all=getInteraction().records(),index=all.findIndex(r=>r.item.id===item.id);dialog.querySelector('[data-award-counter]').textContent=(index+1)+' / '+all.length;dialog.querySelector('[data-award-prev]').disabled=index<=0;dialog.querySelector('[data-award-next]').disabled=index>=all.length-1;
 }
 function shift(direction){const all=getInteraction().records(),index=all.findIndex(r=>r.item.id===active?.item.id),record=all[index+direction];if(record)render(record);}
 function ensure(){if(dialog)return;dialog=document.createElement('dialog');dialog.className='city-dialog city-award-dialog';dialog.setAttribute('aria-labelledby','cityAwardTitle');dialog.innerHTML='<header><span class="city-eyebrow">ЛИЧНАЯ ВИТРИНА</span><button type="button" data-award-close aria-label="Закрыть карточку награды">×</button></header><div class="city-award-art"><img alt=""></div><h2 id="cityAwardTitle"></h2><p data-award-summary></p><p data-award-description></p><dl data-award-facts></dl><nav aria-label="Награды на полках"><button type="button" data-award-prev aria-label="Предыдущая награда">←</button><span data-award-counter></span><button type="button" data-award-next aria-label="Следующая награда">→</button></nav>';document.body.append(dialog);
  on(dialog.querySelector('[data-award-close]'),'click',()=>dialog.close());on(dialog.querySelector('[data-award-prev]'),'click',()=>shift(-1));on(dialog.querySelector('[data-award-next]'),'click',()=>shift(1));on(dialog,'close',()=>{active=null;if(!closing)resume();});
  on(window,'keydown',e=>{if(!dialog.open)return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();e.stopPropagation();shift(e.key==='ArrowLeft'?-1:1);}},true);
 }
 function open(record){if(!record)return false;ensure();freeze();render(record);if(!dialog.open)dialog.showModal();return true;}
 return {open,near(){return getInteraction()?.nearest(getState())||null;},get isOpen(){return !!dialog?.open;},close(){if(dialog?.open)dialog.close();},dispose(){closing=true;listeners.forEach(fn=>fn());dialog?.remove();}};
}
