'use strict';
const crypto=require('node:crypto');
const redis=require('./redis');
const PREFIX='poker_app:telegram:support:v1:';
const WAIT_MS=10*60*1000;
const DUE=PREFIX+'timers-due';
const key=id=>PREFIX+'timer:'+id;
const activeKey=(group,lead)=>PREFIX+'active-timer:'+group+':'+lead;
function create({api,lock,pipeline=redis.pipeline,schedule:scheduleJob,now=Date.now}){
 const run=async cmds=>{const rows=await pipeline(cmds,{throwOnError:true,context:'support.timers'});if(!rows||rows.some(r=>r.error))throw Error('Timer storage unavailable');return rows;};
 const schedule=scheduleJob||(record=>run([['ZADD',DUE,record.dueAt,record.id]]));
 const read=async k=>{const [r]=await run([['GET',k]]);return r?.result?JSON.parse(r.result):null;};
 const save=r=>run([['SET',key(r.id),JSON.stringify(r),'EX',30*86400]]);
 const client=async r=>read(PREFIX+'client:'+r.group+':'+r.lead);
 async function control(r,text,buttons=[]){if(!r.controlMessageId)return;try{await api('editMessageText',{chat_id:r.group,message_id:r.controlMessageId,text,reply_markup:{inline_keyboard:buttons}});}catch(error){if(!/message is not modified/i.test(error.telegramDescription||''))throw error;}}
 async function leadControl(r,text){if(!r.leadControlMessageId)return;try{await api('editMessageText',{chat_id:r.lead,message_id:r.leadControlMessageId,text,reply_markup:{inline_keyboard:[]}});}catch(error){if(!/message is not modified/i.test(error.telegramDescription||''))throw error;}}
 async function finish(r,state,text){r.state=state;r.groupStatusText=text;await save(r);await run([['EVAL',"if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) end; return 0",1,activeKey(r.group,r.lead),JSON.stringify(r.id)]]);await control(r,text);await run([['ZREM',DUE,r.id]]);}
 async function offer(group,c,source){
  const sent=c.lastReply;if(!sent||sent.sourceMessageId!==source.message_id||sent.threadId!==c.threadId||!Number.isSafeInteger(sent.privateMessageId))return;
  const id=crypto.createHash('sha256').update(JSON.stringify([group,c.id,source.message_id])).digest('hex').slice(0,24);
  let r=await read(key(id));if(r?.controlMessageId)return;
  if(!r){r={id,group:String(group),lead:String(c.id),threadId:c.threadId,sourceMessageId:source.message_id,privateMessageId:sent.privateMessageId,inboundMessageId:c.lastInboundMessageId||0,state:'ready',createdAt:now()};await save(r);}
  const message=await api('sendMessage',{chat_id:group,message_thread_id:c.threadId,text:'Таймер для этого сообщения · удаление из лички лида, если он не продолжит диалог.',reply_parameters:{message_id:source.message_id,allow_sending_without_reply:true},reply_markup:{inline_keyboard:[[{text:'⏱ Ждём оплату · 10 минут',callback_data:'support:timer:start:'+id}]]}});
  r.controlMessageId=message.message_id;await save(r);await run([['SET',PREFIX+'timer-control:'+group+':'+message.message_id,id,'EX',30*86400]]);
 }
 async function callback(cb,group){
  const match=String(cb?.data||'').match(/^support:timer:(start|cancel):([a-f0-9]{24})$/);if(!match)return false;
  const r=await read(key(match[2]));if(!r||r.group!==String(group)||String(cb.message?.chat?.id)!==String(group)||r.controlMessageId!==cb.message?.message_id||r.threadId!==cb.message?.message_thread_id)return false;
  return lock(PREFIX+'lock:'+r.group+':'+r.lead,async()=>{
   const current=await read(key(r.id)),c=await client(r);if(!c||c.threadId!==r.threadId)return false;
   if(match[1]==='cancel'){
    if(current.state==='active'){await finish(current,'cancelled','⏹ Таймер отменён менеджером. Сообщение сохранено.');await leadControl(current,'⏹ Менеджер остановил таймер.');}
    await api('answerCallbackQuery',{callback_query_id:cb.id,text:'Таймер остановлен'});return true;
   }
   if(current.state!=='ready'){await api('answerCallbackQuery',{callback_query_id:cb.id,text:current.state==='active'?'Таймер уже запущен':'Этот таймер уже завершён'});return true;}
   if((c.lastInboundMessageId||0)>current.inboundMessageId||c.topicClosed){await api('answerCallbackQuery',{callback_query_id:cb.id,text:'Лид уже продолжил диалог или тема закрыта. Таймер не запущен.',show_alert:true});return true;}
   const active=await read(activeKey(r.group,r.lead));if(active&&active!==r.id){const previous=await read(key(active));if(previous?.state==='active')await finish(previous,'cancelled','⏹ Вместо этого таймера запущен новый. Сообщение сохранено.');}
   current.state='active';current.dueAt=now()+WAIT_MS;current.startedBy=String(cb.from.id);await save(current);await run([['SET',activeKey(r.group,r.lead),JSON.stringify(r.id),'EX',86400]]);
   try{await schedule(current);}catch(error){current.state='ready';await save(current);await run([['DEL',activeKey(r.group,r.lead)]]);await api('answerCallbackQuery',{callback_query_id:cb.id,text:'Не удалось запустить таймер. Сообщение не будет удалено.',show_alert:true});return true;}
   const time=new Intl.DateTimeFormat('ru-RU',{timeZone:'Europe/Moscow',hour:'2-digit',minute:'2-digit'}).format(current.dueAt);
   let sent;try{sent=await api('sendMessage',{chat_id:current.lead,text:'⏱ Ждём оплату 10 минут, до '+time+' МСК. Если передумали, нажмите «Отказаться».',reply_markup:{inline_keyboard:[[{text:'✅ Оплатил',callback_data:'support:pay:paid:'+current.id},{text:'❌ Отказаться',callback_data:'support:pay:refuse:'+current.id}]]}});}catch(error){await finish(current,'cancelled','⏹ Не удалось доставить таймер лиду. Удаление отменено.');throw error;}
   current.leadControlMessageId=sent.message_id;await save(current);await run([['SET',PREFIX+'timer-private:'+current.group+':'+current.lead+':'+sent.message_id,current.id,'EX',30*86400]]);
   await control(current,'⏱ Ждём оплату до '+time+' МСК · 10 минут. Новое сообщение лида отменит удаление.',[[{text:'⏹ Отменить таймер',callback_data:'support:timer:cancel:'+r.id}]]);
   await api('answerCallbackQuery',{callback_query_id:cb.id,text:'Таймер запущен на 10 минут'});return true;
  });
 }
 async function observe(group,message){
  if(message?.chat?.type!=='private'||message.from?.is_bot||String(message.chat.id)!==String(message.from?.id)||!Number.isSafeInteger(message.message_id))return;
  const id=await read(activeKey(group,message.from.id));if(!id)return;
  return lock(PREFIX+'lock:'+group+':'+message.from.id,async()=>{const r=await read(key(id));if(r?.state==='active'&&message.message_id>r.inboundMessageId){await finish(r,'cancelled','💬 Лид продолжил диалог. Таймер отменён, сообщение сохранено.');await leadControl(r,'💬 Диалог продолжен. Таймер остановлен.');}});
 }
 async function expire(id,group){
  if(!/^[a-f0-9]{24}$/.test(String(id)))return false;
  const r=await read(key(id));if(!r){await run([['ZREM',DUE,id]]);return false;}if(r.group!==String(group))return false;
  return lock(PREFIX+'lock:'+r.group+':'+r.lead,async()=>{
   const current=await read(key(id));if(current?.groupStatusText&&!['active','deleting'].includes(current.state)){await control(current,current.groupStatusText);await run([['ZREM',DUE,id]]);return false;}if(!['active','deleting'].includes(current?.state)||(now()<current.dueAt&&current.choice!=='refuse'))return false;
   const c=await client(current);if(!c||c.threadId!==current.threadId||c.topicClosed||(c.lastInboundMessageId||0)>current.inboundMessageId){await finish(current,'cancelled','💬 Диалог изменился. Таймер отменён, сообщение сохранено.');return false;}
   current.state='deleting';await save(current);
   await run([['SET',PREFIX+'timer-delete:'+current.group+':'+current.lead+':'+current.privateMessageId,current.id,'EX',86400]]);
   try{await api('deleteMessage',{chat_id:current.lead,message_id:current.privateMessageId});}catch(error){if(error.telegramErrorCode!==400||!/message to delete not found/i.test(error.telegramDescription||''))throw error;}
   const refused=current.choice==='refuse';
   await finish(current,refused?'refused':'deleted',refused?'❌ Лид отказался. Реквизиты удалены.':'⌛ 10 минут без сообщения лида. Реквизиты удалены из его лички.');await leadControl(current,refused?'❌ Вы отказались. Таймер остановлен, реквизиты удалены.':'⌛ Время ожидания истекло. Реквизиты удалены.');return true;
  });
 }
 async function leadCallback(cb,group){
  const match=String(cb?.data||'').match(/^support:pay:(paid|refuse):([a-f0-9]{24})$/);if(!match)return false;
  const r=await read(key(match[2]));if(!r||r.group!==String(group)||cb.from?.is_bot||cb.message?.chat?.type!=='private'||String(cb.from?.id)!==r.lead||String(cb.message?.chat?.id)!==r.lead||cb.message?.message_id!==r.leadControlMessageId)return false;
  if(match[1]==='refuse'){
   const shouldDelete=await lock(PREFIX+'lock:'+r.group+':'+r.lead,async()=>{const current=await read(key(r.id));if(!['active','deleting'].includes(current.state))return false;current.choice='refuse';await save(current);return true;});
   if(shouldDelete)await expire(r.id,group);
  }else await lock(PREFIX+'lock:'+r.group+':'+r.lead,async()=>{const current=await read(key(r.id));if(current.state==='active'){current.choice='paid';await finish(current,'paid','✅ Лид нажал «Оплатил». Оплату нужно проверить.');await leadControl(current,'✅ Вы сообщили об оплате. Менеджер проверит поступление.');}});
  const final=await read(key(r.id));
  const accepted=match[1]==='paid'?final.state==='paid':final.state==='refused';
  if(final.groupStatusText)await control(final,final.groupStatusText);
  await api('answerCallbackQuery',{callback_query_id:cb.id,text:accepted?(match[1]==='paid'?'Отметка об оплате передана менеджеру':'Отказ принят'):'Этот таймер уже завершён'});return true;
 }
 async function sweep(group){const [row]=await run([['ZRANGEBYSCORE',DUE,'-inf',now(),'LIMIT',0,20]]);let deleted=0,failed=0;for(const id of row?.result||[]){try{if(await expire(id,group))deleted++;}catch(error){failed++;}}return {deleted,failed};}
 return {offer,callback,leadCallback,observe,expire,sweep};
}
module.exports={create,WAIT_MS,PREFIX,DUE,key,activeKey};
