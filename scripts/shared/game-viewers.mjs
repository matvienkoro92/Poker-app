export function mountGameViewers({anchor,container,request,context}){
 const root=document.createElement('div');root.className='game-viewers';root.hidden=true;
 const button=document.createElement('button');button.type='button';button.textContent='👁 Зрители: 0';button.setAttribute('aria-label','Кто сейчас смотрит игру');root.append(button);if(container)container.append(root);else anchor.after(root);
 const session=crypto.randomUUID?.()||Array.from(crypto.getRandomValues(new Uint8Array(16)),n=>n.toString(16).padStart(2,'0')).join('');
 let last=0,announced=false,room='',dialog=null,list=null,note=null;
 function update(data){
  if(!data?.viewers||!data.roomId)return;
  room=data.roomId;if(root.hidden)root.hidden=false;const text='👁 Зрители: '+data.viewers.count;if(button.textContent!==text)button.textContent=text;
  if(dialog?.open&&Array.isArray(data.viewers.names)){
   const names=data.viewers.names,players=Array.isArray(data.viewers.players)?data.viewers.players:names.map(name=>({name})),key=JSON.stringify(players);if(list.dataset.names!==key){list.dataset.names=key;list.replaceChildren(...players.map(viewer=>{
    const li=document.createElement('li');li.className='game-viewer-card';
    const avatar=document.createElement('span');avatar.className='game-viewer-avatar';avatar.textContent=Array.from(viewer.name||'?')[0];
    if(typeof viewer.avatarUrl==='string'&&/^(\/api\/avatar\?|\.?\/assets\/|https:\/\/)/.test(viewer.avatarUrl)){const image=document.createElement('img');image.src=viewer.avatarUrl;image.alt='';image.loading='lazy';image.onerror=()=>image.remove();avatar.append(image);}
    const copy=document.createElement('span'),name=document.createElement('strong');name.textContent=viewer.name;copy.append(name);
    if(viewer.level!=null){const level=document.createElement('small');level.textContent='Уровень '+viewer.level;copy.append(level);}
    if('rating' in viewer){const rating=document.createElement('small'),r=viewer.rating,title={long:'Длинные нарды',short:'Короткие нарды',chess:'Шахматы',billiards:'Бильярд'}[r?.game]||'Рейтинг';rating.textContent=r?title+' · '+(r.mode==='paid'?'на фишки':'бесплатно')+' · '+(r.rank?'№'+r.rank+' из '+r.total+' · '+Number(r.score).toLocaleString('ru-RU',{maximumFractionDigits:2})+' очк.':'пока без рейтинга'):'Рейтинг временно недоступен';copy.append(rating);}
    li.append(avatar,copy);return li;
   }));}
   const noteText=data.viewers.count?('Сейчас смотрят: '+data.viewers.count+(data.viewers.count>names.length?' · показаны первые '+names.length:'')):'Зрителей пока нет';if(note.textContent!==noteText)note.textContent=noteText;
  }
 }
 button.onclick=async()=>{
  if(!room)return;
  if(!dialog){dialog=document.createElement('dialog');dialog.className='game-viewers-dialog';dialog.setAttribute('aria-label','Сейчас смотрят игру');const title=document.createElement('h2'),close=document.createElement('button');title.textContent='Зрители';note=document.createElement('p');note.setAttribute('role','status');list=document.createElement('ul');close.type='button';close.textContent='Закрыть';close.onclick=()=>dialog.close();dialog.append(title,note,list,close);document.body.append(dialog);}
  const id=room;note.textContent='Загружаем зрителей…';list.replaceChildren();delete list.dataset.names;if(!dialog.open)dialog.showModal();
  try{const data=await request({action:context().spectator?'watch':'room',roomId:id,includeViewers:true});if(room===id)update(data);}catch{if(room===id&&dialog.open)note.textContent='Не удалось обновить список. Попробуйте ещё раз.';}
 };
 return {element:root,update,requestBody(body){
  if(!['room','watch'].includes(body.action))return body;
  const next={...body};if(dialog?.open)next.includeViewers=true;
  if(body.action==='watch'){
   const time=Date.now(),visible=!document.hidden;
   if(visible&&(!announced||time-last>=20000)){next.viewerPresence='active';next.viewerSession=session;last=time;announced=true;}
   else if(!visible&&announced){next.viewerPresence='leave';next.viewerSession=session;announced=false;}
  }
  return next;
 },reset(){if(!root.hidden)root.hidden=true;room='';last=0;announced=false;dialog?.close();}};
}
