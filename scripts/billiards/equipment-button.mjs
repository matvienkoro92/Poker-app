export function paintEquipmentButton(button,label,value){
 const title=document.createElement('small');title.className='room-control__label';title.textContent=label;
 const name=document.createElement('strong');name.className='room-control__value';name.textContent=value;
 button.replaceChildren(title,name);button.title=label+' · '+value;button.setAttribute('aria-label','Выбрать '+label.toLowerCase()+'. Выбран: '+value);
}
