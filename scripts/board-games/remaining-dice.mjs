const spots={1:[5],2:[1,9],3:[1,5,9],4:[1,3,7,9],5:[1,3,5,7,9],6:[1,3,4,6,7,9]};
export function paintRemainingDice(element,state,rolling=false){
 const values=state?.discipline!=='chess'&&state?.phase==='moving'&&!rolling?state.dice:[];
 const key=values.join(',');element.hidden=!values.length;
 if(element.dataset.values===key)return;
 element.dataset.values=key;element.replaceChildren();element.setAttribute('aria-label',values.length?'Остались ходы: '+values.join(', '):'Нет оставшихся ходов');
 for(const value of values){const die=document.createElement('span');die.className='remaining-die';die.dataset.value=value;die.setAttribute('role','img');die.setAttribute('aria-label','Ход на '+value);for(const pos of spots[value]){const dot=document.createElement('i');dot.style.gridArea=Math.ceil(pos/3)+' / '+((pos-1)%3+1);die.append(dot);}element.append(die);}
}
