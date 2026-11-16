'use strict';
const redis=require('./redis');
const {applyOperation}=require('./admin-deposits');
const STORE='poker21:admin-deposits:v1';
async function save({accountId,telegramId,nick,poker21Id,xpokerId,actor,actorName,requestId,replacePlayerId,room='X'}){
 for(let attempt=0;attempt<5;attempt++){
  const [row]=await redis.pipeline([['GET',STORE]],{throwOnError:true,context:'support.xpoker.read'});
  const raw=row?.result||'',state=raw?JSON.parse(raw):{revision:0,entries:[],requests:[]};
  const operation={action:'link-player-identity',room,playerId:xpokerId,replacePlayerId,accountId,telegramId,nick,poker21Id:poker21Id||null,requestId};
  const result=applyOperation(state,operation,String(actor),Date.now(),actorName);
  if(result.duplicate)return;
  const [written]=await redis.pipeline([['EVAL',"if (redis.call('GET',KEYS[1]) or '')~=ARGV[1] then return 0 end; redis.call('SET',KEYS[1],ARGV[2]); return 1",1,STORE,raw,JSON.stringify(result.state)]],{throwOnError:true,context:'support.xpoker.save'});
  if(Number(written?.result)===1)return;
 }
 throw Error('Данные изменились. Повторите привязку.');
}
async function handle({cb,m,source,user,client,group,token,api,saveClient,readPlayerIdentity,syncPlayerCard,operatorName}){
 const link=['support:xpoker','support:supr','support:pp','support:p21'].includes(cb?.data),confirm=cb?.data==='support:xpoker-confirm',cancel=cb?.data==='support:xpoker-cancel';
 const command=String(m?.text||'').trim().match(/^\/(xid|sid|ppid|p21key)(?:@Poker_dvatuza_bot)?(?:\s+(.*))?$/i);
 // Entry is restricted to authorized managers by telegram-support.handle.
 const active=client.xpokerLink?.expiresAt>Date.now();
 const waiting=active&&client.xpokerLink.actor===String(user.id);
 if(!link&&!confirm&&!cancel&&!command&&!(waiting&&m))return false;
 const room=link?({'support:xpoker':'X','support:supr':'Supr','support:pp':'PP','support:p21':'P21'})[cb.data]:command?({xid:'X',sid:'Supr',ppid:'PP',p21key:'P21'})[command[1].toLowerCase()]:client.xpokerLink?.room||'X';
 const label=({X:'X-Poker',Supr:'Suprema',PP:'PPPoker',P21:'Poker21'})[room],cmd=({X:'xid',Supr:'sid',PP:'ppid',P21:'p21key'})[room];
 const notice=text=>api(token,'sendMessage',{chat_id:group,message_thread_id:client.threadId,text});
 const identity=()=>readPlayerIdentity({id:Number(client.id),first_name:client.name||'Игрок'});
 if(cb){
  if(!source.from?.is_bot||!(source.message_id===client.headerMessageId||(active&&(confirm||cancel)&&source.message_id===client.xpokerLink?.promptMessageId)))return false;
  await api(token,'answerCallbackQuery',{callback_query_id:cb.id});
 }
 if(cancel){if(active){delete client.xpokerLink;await saveClient(group,client);await syncPlayerCard(token,group,client,{id:Number(client.id),first_name:client.name},true);await notice('Смена привязки отменена. Выберите рум в карточке игрока, чтобы начать заново.');}else await notice('Нет активной смены привязки. Выберите рум в карточке игрока.');return true;}
 if(link||command||waiting&&!confirm){
  const player=await identity();
  if(player.unavailable||player.xpokerUnavailable){await notice('Профиль временно недоступен. Повторите позже.');return true;}
  const accountId=player.accountId||await require('./account-id').ensureDtIdForUserId('tg_'+client.id);
  const ids=room==='P21'?(player.poker21Id?[player.poker21Id]:[]):player[({X:'xpokerIds',Supr:'supremaIds',PP:'pppokerIds'})[room]]||[];
  const value=command?command[2]:link?'':String(m.text||'').trim();
  if(room!=='P21'&&value&&!/^[1-9]\d{0,15}$/.test(value)){await notice('Введите числовой '+label+' ID, например /'+cmd+' 2335996. Это сообщение игроку не отправляется.');return true;}
  client.xpokerLink={room,replacePlayerId:ids.length===1?ids[0]:undefined,actor:String(user.id),accountId,telegramId:String(client.id),nick:player.name||client.name,poker21Id:player.poker21Id,xpokerId:value?(room==='P21'?'новая привязка':value):null,...(room==='P21'?{ciphertext:value}:{}),expiresAt:Date.now()+600000,requestId:'xpoker_'+require('node:crypto').randomUUID().replace(/-/g,'')};
  await saveClient(group,client);
  await syncPlayerCard(token,group,client,{id:Number(client.id),first_name:client.name},true);
  if(room!=='P21'&&value){
   const sent=await api(token,'sendMessage',{chat_id:group,message_thread_id:client.threadId,text:'Новый '+label+' ID: '+value+'.'+(ids.length===1&&ids[0]!==value?' Заменит '+ids[0]+'.':'')+'\nНажмите кнопку ниже, чтобы сохранить.',reply_markup:{inline_keyboard:[[{text:'✅ Сохранить ID '+value,callback_data:'support:xpoker-confirm'},{text:'Отмена',callback_data:'support:xpoker-cancel'}]]}});
   if(Number.isSafeInteger(sent?.message_id)){client.xpokerLink.promptMessageId=sent.message_id;await saveClient(group,client);}
  }
  if(room==='P21'&&value)await notice('Ключ Poker21 получен. Подтвердите смену привязки в карточке игрока.');
  if(!value&&room==='P21')await notice('Пришлите ключ привязки из приложения Poker21 в этой теме. Ключ используется для профиля игрока, а не менеджера.');
  if(!value&&room!=='P21')await notice((ids.length===1?'Текущий '+label+' ID: '+ids[0]+'. После подтверждения он будет заменён.\n':'')+'Введите '+label+' ID в этой теме в течение 10 минут. Можно командой /'+cmd+' 2335996. Сообщение останется внутренним.');
  return true;
 }
 if(confirm){
  if(!active||!client.xpokerLink.xpokerId){await notice('Подтверждение устарело. Нажмите «Привязать '+label+' ID» заново.');return true;}
  const player=await identity(),pending=client.xpokerLink;
  if(player.unavailable||!pending.accountId||player.accountId!==pending.accountId){await notice('Профиль игрока изменился. Начните заново.');return true;}
  try{if(pending.room==='P21'){
    const {bindMiniAppPlayer}=require('./pokerplus');
    const candidates=await require('./pokerplus-identity').pokerPlusTelegramIdCandidates(pending.accountId,{id:Number(client.id)});
    const email=await require('./email-auth').getLinkedEmailOriginalByDtId(pending.accountId)||'';
    const profile=await bindMiniAppPlayer(pending.accountId,candidates,pending.ciphertext,email,{fast:true});
    pending.xpokerId=String(profile?.pokerPlusUserId||'');
  }else await save({...pending,poker21Id:player.poker21Id,actor:user.id,actorName:operatorName(user)});}
  catch(e){await notice('Не удалось привязать '+label+': '+(room==='P21'?'Poker21 не подтвердил ключ. Проверьте ключ и повторите.':e.message));return true;}
  delete client.xpokerLink;await saveClient(group,client);
  await syncPlayerCard(token,group,client,{id:Number(client.id),first_name:client.name},true);
  await notice('✅ '+label+' '+pending.xpokerId+' привязан к игроку '+(player.name||client.name||client.id)+'.');return true;
 }
 return false;
}
module.exports={handle,save};
