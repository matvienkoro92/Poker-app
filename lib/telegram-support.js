'use strict';
const {randomUUID}=require('node:crypto');
const redis=require('./redis');
const policy=require('./telegram-group-policy');
const {isAdmin}=require('./api-auth');
const {KEY,config}=require('./telegram-support-config');
const {readPlayerIdentity,identityText}=require('./telegram-support-player');
const queue=require('./telegram-support-queue');
const timerService=token=>require('./telegram-support-timers').create({api:(method,body)=>api(token,method,body),lock});
const PREFIX='poker_app:telegram:support:v1:';
// Default letter icon. Status emoji must not be the topic's first character.
const TOPIC_ICON_ID='';
const TOPIC_WAITING_ICON='5379748062124056162'; // Red exclamation
const TOPIC_ANSWERED_ICON='5237699328843200968'; // Green check
function topicColor(){return 0x8EEE98;}
const TOPIC_PAYMENT_ICON='5350452584119279096'; // Money bag, verified via getForumTopicIconStickers
function topicStatusIcon(client){if(!client.topicClosed&&client.awaitingPayment?.iconId)return client.awaitingPayment.iconId;return !client.topicClosed&&(client.lastInboundMessageId||0)>(client.lastAnsweredInboundId||0)?TOPIC_WAITING_ICON:TOPIC_ANSWERED_ICON;}
const owners=new Set(['388008256','5053253480']);
function operatorName(user){return ({'2144406710':'Аня','1897001087':'Вика'})[String(user.id)]||String(user.first_name||user.username||'Оператор').replace(/[\r\n]/g,' ').trim().slice(0,64)||'Оператор';}
const content=m=>['text','photo','document','voice','audio','video','video_note','sticker','animation','contact','location','venue'].some(k=>m[k]!==undefined);

const CARD_REFRESH_MS=12*60*60*1000;
async function read(key){const [row]=await redis.pipeline([['GET',key]],{throwOnError:true,context:'support.read'});return row?.result||null;}
async function write(key,value){await redis.pipeline([['SET',key,value]],{throwOnError:true,context:'support.write'});}
async function api(token,method,body,scope='support-dialog'){
  const response=await policy.guardedFetch('https://api.telegram.org/bot'+token+'/'+method,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(8000)},scope);
  const data=await response.json();
  if(!data.ok && /TOPIC_CLOSED/i.test(data.description||'') && ['sendMessage','copyMessage'].includes(method) && Number.isSafeInteger(body.message_thread_id)){
    const id=await read(topicKey(body.chat_id,body.message_thread_id));
    const client=id?await loadClient(body.chat_id,id):null;
    if(client&&client.threadId===body.message_thread_id){
      client.topicClosed=true;await saveClient(body.chat_id,client);
      await queue.sync(token,body.chat_id,client,{api,lock});
      throw Object.assign(Error('Support topic closed'),{supportTopicClosed:true});
    }
  }
  if(!response.ok||!data.ok)throw Object.assign(Error('Support Telegram request failed: '+method),{telegramErrorCode:data.error_code||response.status,telegramDescription:data.description});
  return data.result;
}
async function lock(key,fn){
  const value=randomUUID();
  const [claim]=await redis.pipeline([['SET',key,value,'NX','EX',60]],{throwOnError:true,context:'support.lock'});
  if(claim.result!=='OK')throw Error('Support dialog busy; retry update');
  try{return await fn();}finally{
    await redis.pipeline([['EVAL',"if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) end; return 0",1,key,value]],{throwOnError:true,context:'support.unlock'});
  }
}
function clientKey(group,id){return PREFIX+'client:'+group+':'+id;}
function topicKey(group,id){return PREFIX+'topic:'+group+':'+id;}
async function loadClient(group,id,token,user){
  const raw=await read(clientKey(group,id)),client=raw?JSON.parse(raw):null;
  if(!client||!token)return client;
  try{
    await api(token,'editForumTopic',{chat_id:group,message_thread_id:client.threadId,name:client.appliedTitle||client.fixedTitle||topicTitle(client)});
  }catch(error){
    if(error.telegramErrorCode===400&&/TOPIC_NOT_MODIFIED/i.test(error.telegramDescription||''))return client;
    if(error.telegramErrorCode!==400||!/TOPIC_ID_INVALID|message thread not found|TOPIC_DELETED/i.test(error.telegramDescription||''))throw error;
    const name=[client.playerName||client.name||'Лид',client.poker21Id,user?.username?'@'+user.username:client.id].filter(Boolean).join(' · ').slice(0,128);
    const topic=await api(token,'createForumTopic',{chat_id:group,name,icon_color:topicColor(client.id)});
    if(!Number.isSafeInteger(topic?.message_thread_id))throw Error('Invalid replacement support topic');
    client.previousThreadIds=[...(client.previousThreadIds||[]),client.threadId];
    client.threadId=topic.message_thread_id;client.fixedTitle=name;client.headerSent=false;client.topicRecoveredAt=Date.now();
    delete client.headerMessageId;delete client.appliedTitle;delete client.appliedIconId;delete client.awaitingAmountNotice;
    await saveClient(group,client);
  }
  return client;
}
async function saveClient(group,client){
  await redis.pipeline([['SET',clientKey(group,client.id),JSON.stringify(client)],['SET',topicKey(group,client.threadId),String(client.id)],...(Number.isSafeInteger(client.headerMessageId)?[['SET',PREFIX+'header:'+group+':'+client.headerMessageId,String(client.id)]]:[])],{throwOnError:true,context:'support.client'});
}
function playerCardKeyboard(client,profile=true){return {inline_keyboard:[...(profile?[[{text:'✉️ Открыть профиль',url:'tg://user?id='+client.id}]]:[]),...[[{text:(client.poker21Id?'Изменить':'Привязать')+' Poker21',callback_data:'support:p21'}]],...[[{text:(client.supremaIds?.length===1?'Изменить ':'Привязать ')+'Супрему',callback_data:'support:supr'}]],...[[{text:(client.pppokerIds?.length===1?'Изменить ':'Привязать ')+'ПП',callback_data:'support:pp'}]],...[[{text:(client.xpokerIds?.length===1?'Изменить ':'Привязать ')+'X-Poker ID',callback_data:'support:xpoker'}]],...(client.xpokerLink&&client.xpokerLink.expiresAt>Date.now()?[[...(client.xpokerLink.xpokerId?[{text:'Подтвердить '+({X:'X-Poker',Supr:'Suprema',PP:'PPPoker',P21:'Poker21'})[client.xpokerLink.room||'X']+' '+client.xpokerLink.xpokerId,callback_data:'support:xpoker-confirm'}]:[]),{text:'Отмена',callback_data:'support:xpoker-cancel'}]]:[]),[{text:'✅ Закрыть без ответа',callback_data:'support:resolve'}]]};}
async function syncPlayerCard(token,group,client,user,force=false,notesOnly=false){
  if(client.topicClosed&&!force)return;
  if(!force&&client.xpokerControlsVersion===4&&client.headerSent&&Date.now()-(client.cardUpdatedAt||0)<CARD_REFRESH_MS)return;
  const card=require('./telegram-support-card');
  const refreshData=!notesOnly||!client.cardBaseText;
  if(refreshData){
    const player=await readPlayerIdentity(user);
    if(!player.unavailable&&!player.xpokerUnavailable){client.poker21Id=player.poker21Id||null;client.xpokerIds=player.xpokerIds||[];client.supremaIds=player.supremaIds||[];client.pppokerIds=player.pppokerIds||[];const field=({X:'xpokerIds',Supr:'supremaIds',PP:'pppokerIds'})[client.xpokerLink?.room||'X'];if(client[field]?.includes(client.xpokerLink?.xpokerId))delete client.xpokerLink;}
  }
  const base=refreshData?await card.text(user):client.cardBaseText;
  const text=require('./telegram-support-notes').append(base,client.internalNotes)+(client.xpokerLink?.xpokerId&&client.xpokerLink.expiresAt>Date.now()?'\n\n🔗 Подтвердите, что '+({X:'X-Poker',Supr:'Suprema',PP:'PPPoker',P21:'Poker21'})[client.xpokerLink.room||'X']+' '+client.xpokerLink.xpokerId+' принадлежит игроку '+(client.name||client.id)+' (профиль '+client.xpokerLink.accountId+').':'');
  client.cardBaseText=base;
  const entities=typeof card.entities==='function'?card.entities(text):[];
  let keyboard=playerCardKeyboard(client);
  async function sendCard(method,body){
    try{return await api(token,method,{...body,entities,reply_markup:keyboard});}
    catch(error){
      if(error.telegramErrorCode!==400||!/BUTTON_USER_PRIVACY_RESTRICTED/i.test(error.telegramDescription||''))throw error;
      keyboard=playerCardKeyboard(client,false);
      return api(token,method,{...body,entities,reply_markup:keyboard});
    }
  }
  if(Number.isSafeInteger(client.headerMessageId))await saveClient(group,client);
  if(client.headerSent&&Number.isSafeInteger(client.headerMessageId)){
    try{await sendCard('editMessageText',{chat_id:group,message_id:client.headerMessageId,text});}
    catch(error){
      if(/message is not modified/i.test(error.telegramDescription||'')){}
      else if(/message to edit not found/i.test(error.telegramDescription||'')){client.headerSent=false;}
      else throw error;
    }
  }else client.headerSent=false;
  if(!client.headerSent){
    const header=await sendCard('sendMessage',{chat_id:group,message_thread_id:client.threadId,text});
    client.headerSent=true;client.headerMessageId=header.message_id;
  }
  client.xpokerControlsVersion=4;
  if(refreshData)client.cardUpdatedAt=Date.now();
  await saveClient(group,client);
}
function topicTitle(client){
  if(client.fixedTitle)return client.fixedTitle.replace(/ · 🟡$/,'');
  const label=String(client.playerName||client.name||'Лид').replace(/[\r\n]/g,' ').slice(0,70);
  return label+' · '+(client.poker21Id||client.id);
}
async function syncTopicStatus(token,group,client){
  if(client.awaitingPayment&&((client.lastInboundMessageId||0)>client.awaitingPayment.sourceMessageId||(client.lastResponseAt||0)>(client.awaitingPayment.createdAt||Infinity)||client.topicClosed))delete client.awaitingPayment;
  if(!client.topicClosed&&client.awaitingPayment&&client.awaitingPayment.iconId!==TOPIC_PAYMENT_ICON)client.awaitingPayment.iconId=TOPIC_PAYMENT_ICON;
  const title=topicTitle(client),icon=topicStatusIcon(client);
  if(!client.fixedTitle||client.appliedTitle!==title||client.appliedIconId!==icon){
    client.fixedTitle=title;
    client.statusTitleHistory=[...(client.statusTitleHistory||[]).filter(name=>name!==title),title].slice(-32);
    client.expectedIconId=icon;await saveClient(group,client);
    try{await api(token,'editForumTopic',{chat_id:group,message_thread_id:client.threadId,name:title,icon_custom_emoji_id:icon});}
    catch(error){if(error.telegramDescription!=='Bad Request: TOPIC_NOT_MODIFIED')throw error;}
    client.appliedTitle=title;client.appliedIconId=icon;await saveClient(group,client);
  }
  await queue.sync(token,group,client,{api,lock});
}
async function once(key,fn){
  if(await read(key))return;
  await fn();
  await redis.pipeline([['SET',key,'sent','EX',30*86400]],{throwOnError:true,context:'support.delivered'});
}
async function handle(update,token,options={}){
  try{return await handleUpdate(update,token,options);}catch(error){if(error.supportTopicClosed)return {handled:true};throw error;}
}
async function handleUpdate(update,token,options={}){
  if(!token||!redis.isConfigured())return {handled:false};
  if((require('./telegram-player-statistics').isCommand(update)||require('./telegram-player-spin').isCommand(update)||require('./telegram-player-bonus-balance').isCommand(update)||require('./telegram-player-chat').isCommand(update)))return {handled:false};
  const m=update.message,cb=update.callback_query;
  if(update.message_reaction)return require('./telegram-support-reactions').handle(update,token,{api,lock});
  if(!m&&!cb)return {handled:false};
  // Setup is an explicit owner command, never a side effect of granting admin rights.
  if(m?.chat?.type==='supergroup'&&m.chat.is_forum&&m.from&&!m.from.is_bot&&!m.sender_chat&&owners.has(String(m.from.id))&&/^\/support_setup(?:@Poker_dvatuza_bot)?$/i.test(String(m.text||'').trim())){
    await write(KEY,JSON.stringify({chatId:String(m.chat.id),enabled:true,configuredBy:String(m.from.id),configuredAt:Date.now()}));
    await lock(PREFIX+'setup:'+m.chat.id,()=>once(PREFIX+'setup-delivery:'+m.chat.id+':'+m.message_id,()=>api(token,'sendMessage',{chat_id:m.chat.id,text:'Диалоги подключены. Новые сообщения в личку боту появятся в отдельных темах. Менеджер просто отвечает в теме — ответ сразу отправляется клиенту, отвечать может любой менеджер. Сообщения со знаком // остаются внутренними.'})));
    return {handled:true};
  }
  const cfg=await config();
  if(!cfg?.enabled)return {handled:false};
  const group=String(cfg.chatId);
  if(cb&&await timerService(token).leadCallback(cb,group))return {handled:true};
  if(cb&&String(cb.message?.chat?.id)===group&&cb.from&&!cb.from.is_bot&&isAdmin(cb.from.id)&&await timerService(token).callback(cb,group))return {handled:true};
  const queuePage=String(cb?.data||'').match(/^support:queue:(\d{1,7})$/);
  if(queuePage&&String(cb.message?.chat?.id)===group&&cb.from&&!cb.from.is_bot&&isAdmin(cb.from.id)){
    const board=await queue.readBoard(group);
    if(board?.messageId!==cb.message.message_id)return {handled:false};
    await api(token,'answerCallbackQuery',{callback_query_id:cb.id});
    await queue.refresh(token,group,{api,lock},Number(queuePage[1]));return {handled:true};
  }
  if((m?.forum_topic_closed||m?.forum_topic_reopened)&&String(m.chat?.id)===group&&m.chat?.type==='supergroup'&&Number.isSafeInteger(m.message_thread_id)){
    const id=await read(topicKey(group,m.message_thread_id));
    if(!id)return {handled:false};
    return lock(PREFIX+'lock:'+group+':'+id,async()=>{
      const client=await loadClient(group,id);
      if(!client||client.threadId!==m.message_thread_id)return {handled:false};
      if(Number.isSafeInteger(m.message_id)&&m.message_id<=(client.topicStateMessageId||0))return {handled:true};
      client.topicClosed=!!m.forum_topic_closed;
      client.topicStateMessageId=m.message_id;
      await saveClient(group,client);
      await queue.sync(token,group,client,{api,lock});
      return {handled:true};
    });
  }
  if(m?.forum_topic_edited&&m.chat?.type==='supergroup'&&String(m.chat.id)===group&&m.from?.is_bot&&String(m.from.username||'').toLowerCase()==='poker_dvatuza_bot'&&Number.isSafeInteger(m.message_thread_id)&&Number.isSafeInteger(m.message_id)){
    const id=await read(topicKey(group,m.message_thread_id));
    const client=id?await loadClient(group,id):null;
    const title=m.forum_topic_edited.name;
    const approvedTitle=typeof title==='string'&&[client?.appliedTitle,...(client?.statusTitleHistory||[])].includes(title);
    const approvedIcon=title===undefined&&[TOPIC_WAITING_ICON,TOPIC_ANSWERED_ICON].includes(m.forum_topic_edited.icon_custom_emoji_id)&&client?.expectedIconId===m.forum_topic_edited.icon_custom_emoji_id;
    if(client&&(approvedTitle||approvedIcon)){
      await lock(PREFIX+'service-lock:'+group+':'+m.message_id,()=>once(PREFIX+'service-deleted:'+group+':'+m.message_id,async()=>{
        await redis.pipeline([['SET',PREFIX+'service-delete:'+group+':'+m.message_id,String(m.message_thread_id),'EX',2*86400]],{throwOnError:true,context:'support.service-delete'});
        try{await api(token,'deleteMessage',{chat_id:group,message_id:m.message_id});}
        catch(error){if(error.telegramErrorCode!==400||!/message to delete not found/i.test(error.telegramDescription||''))throw error;}
      }));
      return {handled:true};
    }
    return {handled:false};
  }
  if(m?.chat?.type==='private'&&!m.from?.is_bot&&m.from&&String(m.chat.id)===String(m.from.id)&&Number.isSafeInteger(m.message_id)&&content(m)){
    const id=String(m.from.id);
    return lock(PREFIX+'lock:'+group+':'+id,async()=>{
      let client=await loadClient(group,id);
      if(client?.topicClosed)return {handled:true};
      client=await loadClient(group,id,token,m.from);
      // Commands stay usable even while a manager is handling the conversation.
      if(!options.includePrivateCommands&&/^\//.test(m.text||''))return {handled:false};
      if(!client){
        const name=([m.from.first_name,m.from.last_name].filter(Boolean).join(' ')||m.from.username||'Лид').slice(0,90);
        const topic=await api(token,'createForumTopic',{chat_id:group,name:(name+' · '+id).slice(0,128),icon_color:topicColor(id)});
        if(!Number.isSafeInteger(topic?.message_thread_id))throw Error('Invalid support topic');
        client={id,name,threadId:topic.message_thread_id,managerId:null,createdAt:Date.now()};
        await saveClient(group,client);
      }
      await syncPlayerCard(token,group,client,m.from);
      const incomingKey=PREFIX+'in:'+group+':'+id+':'+m.message_id;
      await once(incomingKey,async()=>{
        const player=await readPlayerIdentity(m.from);
        client.playerName=player.name;client.poker21Id=player.poker21Id;
        const continued=(client.lastInboundMessageId||0)>(client.lastAnsweredInboundId||0)&&Date.now()-(client.lastInboundAt||0)<10*60*1000&&m.message_id>(client.lastInboundMessageId||0);
        if(m.message_id>(client.lastInboundMessageId||0)){
          client.name=([m.from.first_name,m.from.last_name].filter(Boolean).join(' ')||m.from.username||'Лид').slice(0,90);
          client.lastInboundMessageId=m.message_id;client.lastInboundAt=Date.now();
        }
        await saveClient(group,client);
        // Publish waiting status before the incoming message appears under an old check mark.
        await syncTopicStatus(token,group,client);
        const signature=identityText(m.from,player),prefix=continued?'':signature+'\n\n';
        const bold={type:'bold',offset:0,length:signature.split('\n').slice(0,2).join('\n').length};
        if(typeof m.text==='string'&&prefix.length+m.text.length<=4096){
          const sent=await api(token,'sendMessage',{chat_id:group,message_thread_id:client.threadId,text:prefix+m.text,entities:[...(continued?[]:[bold]),...(Array.isArray(m.entities)?m.entities.map(e=>({...e,offset:e.offset+prefix.length})):[])]});
          await require('./telegram-support-reactions').remember(group,sent.message_id,client,m.message_id);
        }else{
          if(!continued)await once(incomingKey+':identity',()=>api(token,'sendMessage',{chat_id:group,message_thread_id:client.threadId,text:signature,entities:[bold]}));
          const sent=await api(token,'copyMessage',{chat_id:group,message_thread_id:client.threadId,from_chat_id:m.chat.id,message_id:m.message_id});
          await require('./telegram-support-reactions').remember(group,sent.message_id,client,m.message_id);
        }
      });
      await syncTopicStatus(token,group,client);
      return {handled:true};
    });
  }
  const source=cb?.message||m;
  const user=cb?.from||m?.from;
  if(String(source?.chat?.id)!==group||source.chat.type!=='supergroup'||!user||user.is_bot||source.sender_chat||!isAdmin(user.id)||!Number.isSafeInteger(source.message_thread_id))return {handled:false};
  const id=await read(topicKey(group,source.message_thread_id));
  if(!/^\d+$/.test(id||''))return {handled:false};
  const control=cb&&['support:take','support:release'].includes(cb.data)?cb.data:null;
  const paid=cb?.data==='support:payment-paid';
  const resolve=cb?.data==='support:resolve';
  if(cb&&!control&&!resolve&&!paid&&!String(cb.data||'').startsWith('support:record:')&&!['support:xpoker','support:supr','support:pp','support:p21','support:xpoker-confirm','support:xpoker-cancel'].includes(cb.data))return {handled:false};
  return lock(PREFIX+'lock:'+group+':'+id,async()=>{
    const client=await loadClient(group,id);
    if(!client||client.threadId!==source.message_thread_id)return {handled:false};
    if(!cb&&/^\/удалить(?:@Poker_dvatuza_bot)?$/i.test(String(m?.text||'').trim())){
      const notice=text=>api(token,'sendMessage',{chat_id:group,message_thread_id:client.threadId,text});
      const target=m.reply_to_message?.message_id;
      if(!Number.isSafeInteger(target)){await notice('Отправьте /удалить ответом на сообщение менеджера, которое нужно удалить у игрока.');return {handled:true};}
      const mappingKey=PREFIX+'outgoing:'+group+':'+target;
      let record;try{record=JSON.parse(await read(mappingKey)||'null');}catch{}
      if(!record&&client.lastReply?.sourceMessageId===target&&client.lastReply.threadId===client.threadId){
        record={sourceMessageId:target,lead:String(client.id),threadId:client.threadId,managerId:String(m.reply_to_message.from?.id||''),privateMessageIds:[client.lastReply.privateMessageId],createdAt:Number(m.reply_to_message.date)*1000||0};
      }
      if(!record||record.lead!==String(client.id)||record.threadId!==client.threadId||!record.privateMessageIds?.every(id=>Number.isSafeInteger(id)&&id>0)){await notice('Не найдена отправленная копия этого сообщения. Для старых сообщений доступен только последний сохранённый ответ.');return {handled:true};}
      if(record.managerId!==String(user.id)&&!owners.has(String(user.id))){await notice('Удалить сообщение может его автор или владелец.');return {handled:true};}
      if(!record.privateDeleted&&Date.now()-record.createdAt>=48*3600000){await notice('Сообщение старше 48 часов: Telegram не позволяет удалить его у игрока.');return {handled:true};}
      await write(mappingKey,JSON.stringify(record));
      const remove=async(chatId,messageId)=>{
        await redis.pipeline([['SET',PREFIX+'delete-permit:'+group+':'+chatId+':'+messageId,JSON.stringify({group,lead:record.lead,threadId:record.threadId,sourceMessageId:target}),'EX',300]],{throwOnError:true});
        try{await api(token,'deleteMessage',{chat_id:chatId,message_id:messageId},'support-delete');}
        catch(error){if(error.telegramErrorCode!==400||!/message to delete not found/i.test(error.telegramDescription||''))throw error;}
      };
      try{
        if(!record.privateDeleted){
          for(const privateId of record.privateMessageIds){if((record.deletedIds||[]).includes(privateId))continue;await remove(record.lead,privateId);record.deletedIds=[...(record.deletedIds||[]),privateId];await write(mappingKey,JSON.stringify(record));}
          record.privateDeleted=true;await write(mappingKey,JSON.stringify(record));
        }
        if(!record.sourceDeleted){await remove(group,target);record.sourceDeleted=true;await write(mappingKey,JSON.stringify(record));}
      }catch(error){
        if(![400,403].includes(error.telegramErrorCode))throw error;
        await notice(record.privateDeleted?'Копия у игрока удалена, но Telegram не разрешил удалить исходное сообщение в теме.':'Telegram не разрешил удалить сообщение у игрока. Исходное сообщение в теме сохранено.');return {handled:true};
      }
      await once(PREFIX+'delete-notice:'+group+':'+target,()=>notice('✅ Сообщение удалено у игрока и из темы.'));return {handled:true};
    }
    if(await require('./telegram-support-record').handle({cb,m,source,user,client,group,token,api:(t,method,body)=>api(t,method,body,'support-record'),saveClient,readPlayerIdentity,operatorName}))return {handled:true};
    if(cb&&String(cb.data||'').startsWith('support:record:'))return {handled:true};
    if(await require('./telegram-support-xpoker').handle({cb,m,source,user,client,group,token,api,saveClient,readPlayerIdentity,syncPlayerCard,operatorName}))return {handled:true};
    if(cb&&String(cb.data||'').startsWith('support:xpoker'))return {handled:false};
    if(paid){
      if(!source.from?.is_bot||source.message_id!==client.awaitingPayment?.noticeMessageId)return {handled:false};
      delete client.awaitingPayment;client.lastAnsweredInboundId=client.lastInboundMessageId||0;
      await saveClient(group,client);await syncTopicStatus(token,group,client);
      await api(token,'answerCallbackQuery',{callback_query_id:cb.id,text:'Оплата подтверждена менеджером'});
      return {handled:true};
    }
    if(resolve){
      if(!source.from?.is_bot||source.message_id!==client.headerMessageId)return {handled:false};
      if(!(client.controls||[]).some(row=>row.id===cb.id)){
        const originalId=client.lastInboundMessageId||0;
        client.lastAnsweredInboundId=originalId;delete client.awaitingPayment;
        client.resolvedWithoutReply={by:String(user.id),at:Date.now(),inboundMessageId:originalId};
        client.controls=(client.controls||[]).slice(-99).concat({id:cb.id,text:'Закрыто без ответа',inboundMessageId:originalId});
        await saveClient(group,client);
        await syncTopicStatus(token,group,client);
      }
      await api(token,'answerCallbackQuery',{callback_query_id:cb.id,text:'✅ Закрыто без отправки ответа игроку'});
      return {handled:true};
    }
    if(control){
      const actor=String(user.id);
      let text;
      const previous=(client.controls||[]).find(row=>row.id===cb.id);
      if(previous)text=previous.text;
      else{
        client.managerId=control==='support:take'?actor:null;
        client.updatedAt=Date.now();
        text=client.managerId?'Ручной режим включён. Отвечать может любой менеджер.':'Ручной режим завершён';
        client.controls=(client.controls||[]).slice(-99).concat({id:cb.id,text});
        await saveClient(group,client);
      }
      await api(token,'answerCallbackQuery',{callback_query_id:cb.id,text,show_alert:true});
      return {handled:true};
    }
    const noteSource=String(m?.text||m?.caption||'').trimStart();
    if(noteSource.startsWith('//')){
      const text=noteSource.slice(2).trim();
      if(!text)return {handled:true};
      client.internalNotes ||= [];
      if(!client.internalNotes.some(note=>note.messageId===m.message_id)){
        client.internalNotes.push({messageId:m.message_id,authorId:String(user.id),author:operatorName(user),text,createdAt:Number(m.date)*1000||Date.now()});
        await saveClient(group,client);
      }
      await syncPlayerCard(token,group,client,{id:Number(client.id),first_name:client.name||'Игрок'},true,true);
      return {handled:true};
    }
    const template=require('./telegram-support-templates').resolve(m);
    const outgoing=template?{...m,text:template.text,entities:template.entities}:m;
    // Only explicitly configured template commands are sent to the player.
    if(!content(outgoing)||(!template&&/^\//.test(String(m.text||m.caption||'').trimStart())))return {handled:true};
    const deliveryKey=PREFIX+'out:'+group+':'+m.message_id;
    await once(deliveryKey,async()=>{
      try{
        const signature='👤 '+operatorName(user)+' · менеджер:';
        const signatureEntity={type:'bold',offset:0,length:signature.length};
        const prefix=signature+'\n\n';
        let sentReply,signatureId;
        if(typeof outgoing.text==='string'&&prefix.length+outgoing.text.length<=4096){
          sentReply=await api(token,'sendMessage',{chat_id:client.id,text:prefix+outgoing.text,entities:[signatureEntity,...(Array.isArray(outgoing.entities)?outgoing.entities.map(entity=>({...entity,offset:entity.offset+prefix.length})):[])]});
        }else{
          const savedSignature=await read(deliveryKey+':signature-id');
          if(savedSignature)signatureId=Number(savedSignature);
          else{const sentSignature=await api(token,'sendMessage',{chat_id:client.id,text:signature,entities:[signatureEntity]});signatureId=sentSignature.message_id;await write(deliveryKey+':signature-id',String(signatureId));}
          sentReply=await api(token,'copyMessage',{chat_id:client.id,from_chat_id:group,message_id:m.message_id});
        }
        client.lastReply={sourceMessageId:m.message_id,privateMessageId:sentReply.message_id,threadId:client.threadId};
        await write(PREFIX+'outgoing:'+group+':'+m.message_id,JSON.stringify({sourceMessageId:m.message_id,lead:String(client.id),threadId:client.threadId,managerId:String(user.id),privateMessageIds:[signatureId,sentReply.message_id].filter(Number.isSafeInteger),createdAt:Date.now()}));
        client.managerId=String(user.id);client.updatedAt=Date.now();
        client.lastAnsweredInboundId=client.lastInboundMessageId||0;delete client.awaitingPayment;
        client.lastOperatorName=operatorName(user);client.lastResponseAt=Date.now();
        await saveClient(group,client);
      }
      catch(error){
        if(![400,403].includes(error.telegramErrorCode))throw error;
        await api(token,'sendMessage',{chat_id:group,message_thread_id:client.threadId,text:'Не удалось отправить сообщение клиенту: бот заблокирован или Telegram не разрешает скопировать это сообщение. Проверьте диалог; автоматической повторной отправки не будет.',reply_parameters:{message_id:m.message_id,allow_sending_without_reply:true}});
        await write(deliveryKey+':failed','1');
      }
    });
    if(!await read(deliveryKey+':failed')){try{await timerService(token).offer(group,client,m);}catch(error){console.error('support.timer.offer',error.message);}}
    if(template&&!await read(deliveryKey+':failed'))await once(deliveryKey+':template-preview',()=>api(token,'sendMessage',{chat_id:group,message_thread_id:client.threadId,text:template.text,entities:template.entities}));
    await syncTopicStatus(token,group,client);
    return {handled:true};
  });
}
async function refreshTopicStatus(token,group,id,user){
  return lock(PREFIX+'lock:'+group+':'+id,async()=>{
    const client=await loadClient(group,id,token,user);
    if(!client)return false;
    if(!client.fixedTitle){
      const player=await readPlayerIdentity({id:Number(id),first_name:client.name||'Игрок'});
      client.playerName=player.name;client.poker21Id=player.poker21Id;
    }
    await syncTopicStatus(token,group,client);
    return true;
  });
}
async function mirrorBotMessage(token,chatId,messageId,user,options={}){
  try{return await mirrorBotMessageOpen(token,chatId,messageId,user,options);}catch(error){if(error.supportTopicClosed)return true;throw error;}
}
async function mirrorBotMessageOpen(token,chatId,messageId,user,options={}){
  if(!token||!user||user.is_bot||String(user.id)!==String(chatId)||!Number.isSafeInteger(messageId))return false;
  const cfg=await config();if(!cfg?.enabled)return false;
  const group=String(cfg.chatId),id=String(chatId);
  return lock(PREFIX+'lock:'+group+':'+id,async()=>{
    let client=await loadClient(group,id);
    if(client?.topicClosed)return true;
    client=await loadClient(group,id,token,user);
    if(!client){
      const player=await readPlayerIdentity(user);
      const name=String(player.name||[user.first_name,user.last_name].filter(Boolean).join(' ')||user.username||'Лид').slice(0,90);
      const topic=await api(token,'createForumTopic',{chat_id:group,name:(name+' · '+id).slice(0,128),icon_color:topicColor(id)});
      if(!Number.isSafeInteger(topic?.message_thread_id))throw Error('Invalid support topic');
      client={id,name,threadId:topic.message_thread_id,managerId:null,createdAt:Date.now()};
      await saveClient(group,client);
    }
    await syncPlayerCard(token,group,client,user);
    if(options.awaitingAmount){
      if(options.activePromptKey){
        const active=JSON.parse(await read(options.activePromptKey)||'null');
        if(active?.promptMessageId!==messageId)return true;
      }
      await once(PREFIX+'amount-notice-source:'+group+':'+id+':'+messageId,async()=>{
        if(!client.awaitingAmountNotice){
          const notice=await api(token,'sendMessage',{chat_id:group,message_thread_id:client.threadId,text:'Игрок хочет пополнить, ждем сумму'});
          client.awaitingAmountNotice={messageId:notice.message_id,sourceMessageId:messageId,createdAt:Date.now()};
          await saveClient(group,client);
        }
      });
    }else if(options.paymentLink){
      const link=options.paymentLink,provider={robokassa:'Робокасса',prodamus:'Prodamus',mandarin:'Мандарин'}[link.providerId];
      if(!provider||!Number.isSafeInteger(link.amount)||link.amount<=0||!Number.isSafeInteger(link.chargeAmount)||link.chargeAmount<link.amount)throw Error('Invalid payment notice');
      const money=n=>(n/100).toLocaleString('ru-RU')+' ₽';
      await once(PREFIX+'payment-link-notice:'+group+':'+id+':'+messageId,async()=>{
        const player=await readPlayerIdentity(user),header=identityText(user,player);
        const text=header+'\n\nИгроку отправлена ссылка '+provider+' на пополнение '+money(link.amount)+'.\nК оплате: '+money(link.chargeAmount)+'.\n\nОжидаем перевод.';
        const notice=await api(token,'sendMessage',{chat_id:group,message_thread_id:client.threadId,text,entities:[{type:'bold',offset:0,length:header.length},{type:'bold',offset:text.lastIndexOf('Ожидаем перевод.'),length:'Ожидаем перевод.'.length}]});
        client.awaitingPayment={sourceMessageId:messageId,noticeMessageId:notice.message_id,iconId:'',createdAt:Date.now()};
        await saveClient(group,client);
      });
      await syncTopicStatus(token,group,client);
    }else await once(PREFIX+'bot-message:'+group+':'+id+':'+messageId,()=>api(token,'copyMessage',{chat_id:group,message_thread_id:client.threadId,from_chat_id:chatId,message_id:messageId}));
    return true;
  });
}
async function clearAwaitingAmountNotice(token,chatId,options={}){
  if(!token||!/^[1-9]\d*$/.test(String(chatId)))return false;
  const cfg=await config();if(!cfg?.enabled)return false;
  const group=String(cfg.chatId),id=String(chatId);
  return lock(PREFIX+'lock:'+group+':'+id,async()=>{
    const client=await loadClient(group,id),messageId=client?.awaitingAmountNotice?.messageId;
    if(options.cancelPayment&&client?.awaitingPayment&&(!Number.isSafeInteger(options.throughMessageId)||client.awaitingPayment.sourceMessageId<=options.throughMessageId)){
      delete client.awaitingPayment;await saveClient(group,client);await syncTopicStatus(token,group,client);
    }
    if(!Number.isSafeInteger(messageId))return false;
    if(Number.isSafeInteger(options.throughMessageId)&&client.awaitingAmountNotice.sourceMessageId>options.throughMessageId)return false;
    await redis.pipeline([['SET',PREFIX+'amount-notice-delete:'+group+':'+messageId,id,'EX',2*86400]],{throwOnError:true,context:'support.amount-notice-delete'});
    try{await api(token,'deleteMessage',{chat_id:group,message_id:messageId});}
    catch(error){if(error.telegramErrorCode!==400||!/message to delete not found/i.test(error.telegramDescription||''))throw error;}
    delete client.awaitingAmountNotice;await saveClient(group,client);
    return true;
  });
}
async function refreshPlayerCard(token,group,id){
  const cfg=await config();
  if(!cfg?.enabled||String(cfg.chatId)!==String(group))throw Error('Unexpected support group');
  return lock(PREFIX+'lock:'+group+':'+id,async()=>{
    const client=await loadClient(group,id);
    if(!client||!client.headerSent||!Number.isSafeInteger(client.headerMessageId))return false;
    await syncPlayerCard(token,group,client,{id:Number(client.id),first_name:client.name||'Игрок'},true);
    return true;
  });
}
async function refreshResolveButton(token,group,id){
  const cfg=await config();if(!cfg?.enabled||String(cfg.chatId)!==String(group))return false;
  return lock(PREFIX+'lock:'+group+':'+id,async()=>{
    const client=await loadClient(group,id);if(!client?.headerSent||!Number.isSafeInteger(client.headerMessageId))return false;
    const player=await readPlayerIdentity({id:Number(client.id),first_name:client.name||'Игрок'});
    if(player.unavailable||player.xpokerUnavailable)throw Error('Player bindings unavailable');
    client.poker21Id=player.poker21Id||null;client.xpokerIds=player.xpokerIds||[];
    client.supremaIds=player.supremaIds||[];
    client.pppokerIds=player.pppokerIds||[];
    await saveClient(group,client);
    const body={chat_id:group,message_id:client.headerMessageId,reply_markup:playerCardKeyboard(client)};
    try{await api(token,'editMessageReplyMarkup',body);}
    catch(error){if(error.telegramErrorCode===400&&/BUTTON_USER_PRIVACY_RESTRICTED/i.test(error.telegramDescription||'')){await api(token,'editMessageReplyMarkup',{...body,reply_markup:playerCardKeyboard(client,false)});}else if(!/message is not modified/i.test(error.telegramDescription||''))throw error;}
    return true;
  });
}
async function notifyDepositRoom(token,user,messageId,choice){
 const cfg=await config();if(!cfg?.enabled)throw Error('Диалоги недоступны');
 const group=String(cfg.chatId),id=String(user.id);
 return lock(PREFIX+'lock:'+group+':'+id,async()=>{
  const client=await loadClient(group,id);if(!client)throw Error('Диалог игрока не найден');
  const event=PREFIX+'deposit-room:'+group+':'+id+':'+messageId;
  await once(event,()=>api(token,'sendMessage',{chat_id:group,message_thread_id:client.threadId,text:'🎮 Игрок выбрал, куда пополнить: '+require('./telegram-deposit-room').label(choice)+(choice.ids.length?'':'\nID пока не привязан — запросите у игрока.')}));
  return true;
 });
}
async function observeTimerActivity(update,token){const m=update?.message;if(m?.chat?.type!=='private'||m.from?.is_bot)return;const cfg=await config();if(cfg?.enabled)await timerService(token).observe(String(cfg.chatId),m);}
async function expireTimer(id,token){const cfg=await config();if(!cfg?.enabled)return false;return timerService(token).expire(id,String(cfg.chatId));}
async function sweepTimers(token){const cfg=await config();if(!cfg?.enabled)return {deleted:0,failed:0};return timerService(token).sweep(String(cfg.chatId));}
module.exports={notifyDepositRoom,refreshResolveButton,sweepTimers,observeTimerActivity,expireTimer,refreshPlayerCard,handle,PREFIX,topicTitle,TOPIC_ICON_ID,refreshTopicStatus,mirrorBotMessage,clearAwaitingAmountNotice};
