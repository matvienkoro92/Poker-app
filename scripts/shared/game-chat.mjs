// A small, independent channel: no game revisions, render loops or move queue.
export function mountGameChat({container,request}){
 const button=document.createElement('button');button.type='button';button.dataset.gameChat='';button.textContent='Чат';button.hidden=true;button.setAttribute('aria-expanded','false');container.append(button);
 const panel=document.createElement('section');panel.className='game-chat';panel.hidden=true;panel.setAttribute('aria-label','Чат партии');
 panel.innerHTML='<header><strong>Чат партии</strong><button type="button" data-chat-close aria-label="Закрыть чат">×</button></header><div class="game-chat__messages" role="log" aria-live="polite" aria-relevant="additions"></div><p class="game-chat__status" role="status"></p><form><label class="game-chat__label">Сообщение<input name="message" maxlength="1000" autocomplete="off" enterkeyhint="send" placeholder="Написать сопернику…"></label><button type="submit">Отправить</button></form>';
 document.body.append(panel);
 const log=panel.querySelector('[role=log]'),form=panel.querySelector('form'),input=form.elements.message,status=panel.querySelector('[role=status]');
 let roomId='',player=-1,epoch=0,timer=0,reading=false,opened=false,unread=0,initialized=false,cursor=0,failures=0,disposed=false;
 let readFlight=null;
 const entries=new Map();
 const label=()=>{button.textContent='Чат'+(unread?' · '+unread:'');button.dataset.unread=unread||'';button.setAttribute('aria-label','Чат партии'+(unread?', непрочитанных: '+unread:''));};
 function paintEntry(entry){
  const {message,node}=entry;node.className='game-chat__message'+(message.player===player?' is-mine':'');node.replaceChildren();
  const name=document.createElement('strong');name.textContent=message.player===player?'Вы':message.nick||'Игрок';
  const text=document.createElement('p');text.textContent=message.text;
  const meta=document.createElement('small');meta.textContent=entry.pending?'Отправляется…':entry.failed?'Не отправлено':new Date(message.createdAt).toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'});
  node.append(name,text,meta);
  if(entry.failed){const retry=document.createElement('button');retry.type='button';retry.textContent='Повторить';retry.onclick=()=>sendEntry(entry);node.append(retry);}
 }
 function merge(messages,{initial=false}={}){
  const nearBottom=log.scrollHeight-log.scrollTop-log.clientHeight<70;let changed=false;
  for(const message of messages){
   const key=message.player+':'+message.clientId;let entry=entries.get(key);
   if(entry){if(entry.pending||entry.failed||entry.message.sequence!==message.sequence){entry.message=message;entry.pending=false;entry.failed=false;paintEntry(entry);}continue;}
   changed=true;
   entry={message,node:document.createElement('article')};entries.set(key,entry);paintEntry(entry);
   if(!initial&&!opened&&message.player!==player)unread=Math.min(99,unread+1);
  }
  if(!changed){label();return;}
  const sorted=[...entries.entries()].sort((a,b)=>(a[1].message.sequence??Infinity)-(b[1].message.sequence??Infinity));
  while(sorted.length>80){const [key,entry]=sorted.shift();entries.delete(key);entry.node.remove();}
  for(const [,entry]of sorted)log.append(entry.node);
  if(nearBottom||initial)log.scrollTop=log.scrollHeight;label();
 }
 function schedule(delay=opened?1000:5000){clearTimeout(timer);if(roomId&&!document.hidden&&!disposed)timer=setTimeout(poll,delay);}
 async function poll(){
  if(!roomId||document.hidden||disposed||reading)return;
  const generation=epoch,id=roomId;reading=true;const flight={controller:new AbortController(),cancelled:false};readFlight=flight;const timeout=setTimeout(()=>flight.controller.abort(),10000);
  try{const data=await request({action:'chat-read',roomId:id,sinceSequence:cursor},flight.controller.signal);if(generation!==epoch||flight.cancelled)return;merge(data.messages||[],{initial:!initialized});initialized=true;cursor=data.sequence??cursor;failures=0;status.textContent='';}
  catch(e){if(generation!==epoch||flight.cancelled)return;failures++;status.textContent=e.status===404?'Комната закрыта.':'Нет связи с чатом. Переподключаемся…';}
  finally{clearTimeout(timeout);if(readFlight===flight)readFlight=null;if(generation===epoch&&!flight.cancelled){reading=false;schedule(failures?Math.min(15000,1000*2**Math.min(failures,4)):undefined);}}
 }
 async function sendEntry(entry){
  if(entry.pending||!roomId||player<0)return;
  const generation=epoch,id=roomId;entry.pending=true;entry.failed=false;paintEntry(entry);
  try{const data=await request({action:'chat-send',roomId:id,messageId:entry.message.clientId,text:entry.message.text});if(generation!==epoch)return;merge([data.message]);status.textContent='';schedule(0);}
  catch(e){if(generation!==epoch)return;entry.pending=false;entry.failed=!Number.isSafeInteger(entry.message.sequence);paintEntry(entry);if(entry.failed)status.textContent=e.message||'Сообщение не отправлено.';}
 }
 form.onsubmit=e=>{e.preventDefault();const text=input.value.trim();if(!text||player<0)return;if(Array.from(text).length>500){status.textContent='До 500 символов в сообщении.';return;}
  if([...entries.values()].filter(e=>e.pending||e.failed).length>=5){status.textContent='Дождитесь отправки или повторите неотправленное сообщение.';return;}
  const message={clientId:crypto.randomUUID?.()||Array.from(crypto.getRandomValues(new Uint8Array(16)),n=>n.toString(16).padStart(2,'0')).join(''),player,text,createdAt:Date.now()};merge([message]);const entry=entries.get(player+':'+message.clientId);input.value='';sendEntry(entry);log.scrollTop=log.scrollHeight;
 };
 function toggle(value){opened=value;panel.hidden=!value;button.setAttribute('aria-expanded',String(value));if(value){unread=0;label();log.scrollTop=log.scrollHeight;if(!reading)poll();}else schedule();}
 button.onclick=()=>toggle(!opened);panel.querySelector('[data-chat-close]').onclick=()=>toggle(false);
 panel.addEventListener('keydown',e=>{if(e.key==='Escape'){toggle(false);button.focus();}});
 function cancelRead(){if(readFlight){readFlight.cancelled=true;readFlight.controller.abort();readFlight=null;}reading=false;}
 function reset(){cancelRead();epoch++;roomId='';player=-1;reading=false;initialized=false;cursor=0;failures=unread=0;clearTimeout(timer);entries.clear();log.replaceChildren();input.value='';status.textContent='';toggle(false);button.hidden=true;label();}
 function observe(view){if(!view.roomId)return;if(view.roomId!==roomId){reset();roomId=view.roomId;player=view.spectator?-1:view.player;button.hidden=false;form.hidden=player<0;schedule(0);}else if(view.player!==undefined){player=view.spectator?-1:view.player;form.hidden=player<0;}}
 function visibility(){clearTimeout(timer);cancelRead();if(!document.hidden)schedule(0);}
 document.addEventListener('visibilitychange',visibility);
 const hide=()=>{clearTimeout(timer);cancelRead();};window.addEventListener('pagehide',hide);window.addEventListener('pageshow',visibility);window.addEventListener('online',visibility);
 return {observe,reset,dispose(){reset();disposed=true;document.removeEventListener('visibilitychange',visibility);window.removeEventListener('pagehide',hide);window.removeEventListener('pageshow',visibility);window.removeEventListener('online',visibility);button.remove();panel.remove();}};
}
