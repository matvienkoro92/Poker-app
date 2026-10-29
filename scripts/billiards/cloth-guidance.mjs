import {radius} from './engine.mjs';
export function mountClothGuidance({room}){
 const note=document.createElement('div');note.className='billiards-cloth-hint';note.hidden=true;note.setAttribute('role','status');note.setAttribute('aria-live','polite');
 const area=document.createElementNS('http://www.w3.org/2000/svg','svg');area.classList.add('billiards-placement-area');area.setAttribute('aria-hidden','true');area.style.display='none';const outline=document.createElementNS(area.namespaceURI,'polygon');outline.setAttribute('fill','none');outline.setAttribute('stroke','rgba(255,245,210,.55)');outline.setAttribute('stroke-width','1.5');outline.setAttribute('stroke-dasharray','5 6');area.append(outline);document.querySelector('main').append(note,area);let previous='';
 function render(s,{active,can,placing,cueId,message=''}){
  const view=room()?.inspect().viewport,b=view?.bounds,key=JSON.stringify([active,can,placing,cueId,s.breakPending,s.inHand,s.handZone,s.pending?.type,s.moving,s.winner,b,message]);if(key===previous)return;previous=key;
  let text='';if(active&&can&&!s.moving&&s.winner===null){if(s.pending?.type==='pyramid-foul')text='Заберите шар соперника · нажмите на него';else if(s.inHand||placing)text=s.handZone==='head'||s.breakPending?'Поставьте биток в пунктирной области':'Поставьте биток на свободное место';else if(s.breakPending)text='Подвинуть биток? Нажмите на него';else if(s.discipline==='pyramid')text='Биток № '+cueId+' · нажмите на другой шар для выбора';}
  // Keep glyphs in the DOM rather than filtering them through the low-resolution 3D canvas.
  const content=active?[message,text].filter(Boolean).join('\n'):'';
  room()?.setClothMessage('');
  note.hidden=!content||!b;if(!note.hidden){note.textContent=content;const width=Math.round((b.right-b.left)*.78);Object.assign(note.style,{left:Math.round((b.left+b.right-width)/2)+'px',top:Math.round(b.top+(b.bottom-b.top)*.555)+'px',width:width+'px',transform:'none'});}
  const show=active&&can&&placing&&!s.moving&&!s.pending&&!!b;area.style.display=show?'block':'none';if(show){const margin=radius(s),edge=s.handZone==='head'||s.breakPending?249:1000-margin;const points=[[margin,margin],[edge,margin],[edge,500-margin],[margin,500-margin]].map(([x,y])=>room().projectPoint(x,y));outline.setAttribute('points',points.map(p=>p.x+','+p.y).join(' '));}
 }
 return {render};
}
