// Decorative wells never intercept a legal point's click target.
export function createLandingWell(preview=false){const well=document.createElement('span');well.className=preview?'living-preview-well':'nards-landing-well';well.setAttribute('aria-hidden','true');return well;}
export function paintStorage(element,player,count=0){
 element.classList.add('nards-storage');element.dataset.side=player===0?'white':'black';element.setAttribute('aria-label',(player===0?'Белые':'Чёрные')+' · выведено '+count+' из 15');element.replaceChildren();
 const number=document.createElement('strong');number.textContent=count;number.title='Выведено '+count+' из 15';const slots=document.createElement('div');slots.className='nards-storage-slots';slots.setAttribute('aria-hidden','true');
 for(let i=0;i<15;i++){const slot=document.createElement('i');slot.className=i<count?'is-filled':'';if(i<count){const edge=document.createElement('span');edge.className='nards-stored-edge';slot.append(edge);}slots.append(slot);}
 element.append(number,slots);
}
