export function mountGameResume({container,request,resume}){
 const card=document.createElement('section');card.className='active-game-resume';card.hidden=true;
 const title=document.createElement('strong'),note=document.createElement('p'),button=document.createElement('button');title.textContent='У вас есть незавершённая партия';button.className='primary';button.textContent='Вернуться в текущую партию';card.append(title,note,button);container.prepend(card);
 let current=null;
 async function refresh(){try{const data=await request({action:'active'});current=data.active||null;card.hidden=!current;if(current)note.textContent=current.ready?'Соперник: '+current.opponent:'Комната создана · ждём соперника';}catch{}}
 button.onclick=async()=>{if(!current)return;button.disabled=true;try{await resume(current.roomId);}catch(e){note.textContent=e.message||'Не удалось подключиться. Попробуйте ещё раз.';}finally{button.disabled=false;}};
 refresh();return {refresh,element:card};
}
