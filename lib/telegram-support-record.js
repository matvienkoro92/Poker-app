'use strict';
const {createHash}=require('node:crypto');
const redis=require('./redis');
const {applyOperation}=require('./admin-deposits');
const STORE='poker21:admin-deposits:v1';
const CAS="if (redis.call('GET',KEYS[1]) or '')~=ARGV[1] then return 0 end; redis.call('SET',KEYS[1],ARGV[2]); return 1";
const CHANNELS={runex:'Рунекс',exchip:'Эксчип бот','r-crypto':'Рома Крипта',allfriends:'Алл френдс',transfer:'Перевод',bonuses:'Бонусы'};
const ROOMS={P21:'Poker21',X:'X-Poker',Supr:'Suprema',PP:'PPPoker'};
function accounts(player){
 if(player.unavailable||player.xpokerUnavailable||!player.accountId)throw Error('Профиль недоступен. Проверьте привязки игрока.');
 return [{room:'P21',ids:player.poker21Id?[player.poker21Id]:[]},{room:'X',ids:player.xpokerIds||[]},{room:'Supr',ids:player.supremaIds||[]},{room:'PP',ids:player.pppokerIds||[]}].flatMap(row=>[...new Set(row.ids)].map(playerId=>({room:row.room,playerId:String(playerId)})));
}
function amount(text){
 const match=String(text||'').trim().match(/^(\d+)(?:[.,](\d{1,2}))?\s*(?:₽|р|руб)?$/i);
 if(!match)return null;
 const value=Number(match[1])*100+Number((match[2]||'').padEnd(2,'0'));
 return Number.isSafeInteger(value)&&value>0&&value<=1e10?value:null;
}
async function run(commands){
 const rows=await redis.pipeline(commands,{throwOnError:true,context:'support.record'});
 if(!rows||rows.length!==commands.length||rows.some(r=>r.error))throw Error('Хранилище недоступно');
 return rows.map(r=>r.result);
}
async function handle({cb,m,source,user,client,group,token,api,saveClient,readPlayerIdentity,operatorName}){
 const text=String(m?.text||'').trim(),bonusStart=!cb&&/^\/бонусы(?:@Poker_dvatuza_bot)?$/i.test(text),start=bonusStart||!cb&&/^\/(?:записать|zapisat)(?:@Poker_dvatuza_bot)?$/i.test(text);
 const button=String(cb?.data||'').match(/^support:record:([a-f0-9]{16}):(channel|account|from|to|confirm|cancel)(?::([a-z0-9-]+))?$/);
 const actor=String(user.id),saved=client.recordDrafts?.[actor];
 const notice=async(text,keyboard=[])=>{
  const draft=client.recordDrafts?.[actor];
  const body={chat_id:group,text,reply_markup:{inline_keyboard:keyboard}};
  if(Number.isSafeInteger(draft?.messageId)){
   await run([['SET','poker_app:telegram:support:record-message:'+group+':'+draft.messageId,String(client.id),'EX',86400]]);
   try{return await api(token,'editMessageText',{...body,message_id:draft.messageId});}
   catch(error){if(/message is not modified/i.test(error.telegramDescription||''))return;throw error;}
  }
  const sent=await api(token,'sendMessage',{...body,message_thread_id:client.threadId});
  draft.messageId=sent.message_id;
  await saveClient(group,client);
  await run([['SET','poker_app:telegram:support:record-message:'+group+':'+draft.messageId,String(client.id),'EX',86400]]);
  return sent;
 };
 const accountLabel=p=>ROOMS[p.room]+' · ID '+p.playerId;
 const details=draft=>draft.channel==='transfer'?'Откуда: '+accountLabel(draft.from)+'\nКуда: '+accountLabel(draft.selected):CHANNELS[draft.channel]+' · '+accountLabel(draft.selected);
 const preview=draft=>notice((draft.channel==='transfer'?'Проверьте перевод':draft.channel==='bonuses'?'Проверьте бонус':'Проверьте приход')+'\n'+draft.name+'\n'+details(draft)+'\nСумма: '+(draft.amount/100).toLocaleString('ru-RU')+' ₽'+(draft.channel==='bonuses'?'\nЗа что: '+draft.reason:'')+'\n\n'+(draft.channel==='transfer'?'Подтвердите фактически выполненный перевод. Запись не перемещает фишки автоматически.':draft.channel==='bonuses'?'Будет создана запись в «Бонусах».':'Подтвердите только фактически полученные деньги.'),[[{text:draft.channel==='transfer'?'✅ Записать перевод':draft.channel==='bonuses'?'✅ Записать бонус':'✅ Записать приход',callback_data:'support:record:'+draft.id+':confirm'}],[{text:'Отмена',callback_data:'support:record:'+draft.id+':cancel'}]]);
 const amountReceipt=!cb&&m&&!text.startsWith('/')?'poker_app:telegram:support:record-amount:'+group+':'+m.message_id:null;
 if(amountReceipt){
  const [consumed]=await run([['GET',amountReceipt]]);
  if(consumed){
   const sameDraft=consumed===saved?.id||consumed===saved?.id+':reason';
   const resume=consumed===saved?.id&&saved?.stage==='amount'||consumed===saved?.id+':reason'&&saved?.stage==='reason';
   if(!resume){if(sameDraft&&saved.stage==='confirm'&&saved.expiresAt>Date.now())await preview(saved);return true;}
  }
 }
 const waiting=['amount','reason'].includes(saved?.stage)&&saved.expiresAt>Date.now();
 const cancel=!cb&&/^\/отмена(?:@Poker_dvatuza_bot)?$/i.test(text)&&saved&&!['done','cancelled'].includes(saved.stage);
 if(!start&&!button&&!cancel&&!(waiting&&m&&!/^(?:\/|\/\/)/.test(text)))return false;
 const identity=()=>readPlayerIdentity({id:Number(client.id),first_name:client.name||'Игрок'});
 const persist=()=>saveClient(group,client);
 if(start){
  const id=createHash('sha256').update(group+':'+client.threadId+':'+m.message_id+':'+actor).digest('hex').slice(0,16);
  client.recordDrafts ||= {};
  for(const [key,draft] of Object.entries(client.recordDrafts))if(draft.expiresAt<Date.now())delete client.recordDrafts[key];
  if(saved?.id!==id)client.recordDrafts[actor]={id,stage:'channel',expiresAt:Date.now()+900000,actorName:operatorName(user)};
  if(client.xpokerLink?.actor===actor)delete client.xpokerLink;
  await persist();
  if(bonusStart){
   const draft=client.recordDrafts[actor];
   try{const player=await identity();draft.accounts=accounts(player);draft.accountId=player.accountId;draft.name=player.name||client.name||client.id;}
   catch(e){await notice(e.message);return true;}
   if(!draft.accounts.length){await notice('Нет привязанных ID. Сначала привяжите аккаунт в карточке игрока.');return true;}
   draft.channel='bonuses';draft.stage='account';await persist();
   await notice('Бонусы\nВыберите привязанный рум и ID игрока:',draft.accounts.map((p,i)=>[{text:accountLabel(p),callback_data:'support:record:'+id+':account:'+i}]).concat([[{text:'Отмена',callback_data:'support:record:'+id+':cancel'}]]));return true;
  }
  await notice('Записать операцию в «Депозитах»\nВыберите способ оплаты или перевод:',[
   ['runex','exchip'].map(key=>({text:CHANNELS[key],callback_data:'support:record:'+id+':channel:'+key})),
   ['r-crypto','allfriends'].map(key=>({text:CHANNELS[key],callback_data:'support:record:'+id+':channel:'+key})),
   [{text:'Перевод',callback_data:'support:record:'+id+':channel:transfer'},{text:'Бонусы',callback_data:'support:record:'+id+':channel:bonuses'}]
  ]);return true;
 }
 if(button){
  if(!source.from?.is_bot)return true;
  await api(token,'answerCallbackQuery',{callback_query_id:cb.id});
 }
 const draft=client.recordDrafts?.[actor];
 if(!draft||draft.expiresAt<Date.now()||(button&&draft.id!==button[1])||(button&&draft.messageId&&draft.messageId!==source.message_id)){
  if(cb)await api(token,'answerCallbackQuery',{callback_query_id:cb.id,text:'Этот выбор устарел или принадлежит другому менеджеру. Начните заново: /записать.',show_alert:true});
  return true;
 }
 if(button&&!draft.messageId){
  draft.messageId=source.message_id;await persist();
  await run([['SET','poker_app:telegram:support:record-message:'+group+':'+draft.messageId,String(client.id),'EX',86400]]);
 }
 const callback=(action,value)=>'support:record:'+draft.id+':'+action+(value===undefined?'':':'+value);
 const cancelButton=[{text:'Отмена',callback_data:callback('cancel')}];
 if(cancel||button?.[2]==='cancel'){
  if(draft.stage==='done'){await notice('Операция уже записана. Отменить её можно в «Депозитах».');return true;}
  draft.stage='cancelled';await persist();await notice('Запись отменена.');return true;
 }
 if(button?.[2]==='channel'&&(draft.stage==='channel'||['account','from'].includes(draft.stage)&&draft.channel===button[3])&&Object.hasOwn(CHANNELS,button[3])){
  try{const player=await identity();draft.accounts=accounts(player);draft.accountId=player.accountId;draft.name=player.name||client.name||client.id;}
  catch(e){await notice(e.message);return true;}
  if(!draft.accounts.length){await notice('Нет привязанных ID. Сначала привяжите аккаунт в карточке игрока, затем отправьте /записать.');return true;}
  if(button[3]==='transfer'&&new Set(draft.accounts.map(p=>p.room)).size<2){await notice('Для перевода нужны привязанные аккаунты игрока минимум в двух разных румах.');return true;}
  draft.channel=button[3];draft.stage=draft.channel==='transfer'?'from':'account';await persist();
  await notice(CHANNELS[draft.channel]+'\n'+(draft.channel==='transfer'?'Выберите, откуда перевести:':'Выберите привязанный рум и ID игрока:'),draft.accounts.map((p,i)=>[{text:ROOMS[p.room]+' · ID '+p.playerId,callback_data:callback(draft.channel==='transfer'?'from':'account',i)}]).concat([cancelButton]));return true;
 }
 if(button?.[2]==='from'&&draft.channel==='transfer'&&['from','to'].includes(draft.stage)&&/^\d+$/.test(button[3]||'')&&draft.accounts[Number(button[3])]){
  if(draft.stage==='to'&&draft.fromIndex!==Number(button[3])){await notice('Этот шаг уже завершён. Для новой записи отправьте /записать.');return true;}
  draft.fromIndex=Number(button[3]);draft.from=draft.accounts[draft.fromIndex];draft.stage='to';await persist();
  await notice('Откуда: '+accountLabel(draft.from)+'\nВыберите, куда перевести:',draft.accounts.flatMap((p,i)=>p.room!==draft.from.room?[[{text:accountLabel(p),callback_data:callback('to',i)}]]:[]).concat([cancelButton]));return true;
 }
 if(button?.[2]==='to'&&draft.channel==='transfer'&&['to','amount'].includes(draft.stage)&&/^\d+$/.test(button[3]||'')&&draft.accounts[Number(button[3])]){
  const selected=draft.accounts[Number(button[3])];
  if(selected.room===draft.from.room||draft.stage==='amount'&&(draft.selected.room!==selected.room||draft.selected.playerId!==selected.playerId)){await notice('Выберите другой рум из предложенного списка.');return true;}
  draft.selected=selected;draft.stage='amount';await persist();
  await notice(details(draft)+'\nВведите сумму перевода в рублях, например 2000.\n/отмена — отменить запись.',[cancelButton]);return true;
 }
 if(button?.[2]==='account'&&draft.channel!=='transfer'&&(draft.stage==='account'||draft.stage==='amount')&&/^\d+$/.test(button[3]||'')&&draft.accounts[Number(button[3])]&&(draft.stage!=='amount'||draft.selected===draft.accounts[Number(button[3])]||draft.selected.room===draft.accounts[Number(button[3])].room&&draft.selected.playerId===draft.accounts[Number(button[3])].playerId)){
  draft.selected=draft.accounts[Number(button[3])];draft.stage='amount';await persist();
  await notice(CHANNELS[draft.channel]+' · '+ROOMS[draft.selected.room]+' · ID '+draft.selected.playerId+'\n'+(draft.channel==='bonuses'?'Введите сумму бонуса в рублях, например 1000.':'Введите сумму прихода в рублях, например 2000.')+'\n/отмена — отменить запись.',[cancelButton]);return true;
 }
 if(!cb&&draft.stage==='amount'){
  const value=amount(text);if(value===null){await notice('Введите положительную сумму в рублях, например 2000 или 1500,50. Для отмены — /отмена.');return true;}
  await run([['SET',amountReceipt,draft.id,'EX',86400]]);
  draft.amount=value;draft.stage=draft.channel==='bonuses'?'reason':'confirm';await persist();
  if(draft.channel==='bonuses'){await notice(details(draft)+'\nСумма: '+(value/100).toLocaleString('ru-RU')+' ₽\nЗа что начисляется бонус? Введите причину (до 300 символов).',[cancelButton]);return true;}
  await preview(draft);return true;
 }
 if(!cb&&draft.stage==='reason'){
  if(!text||text.length>300){await notice('Укажите, за что бонус: от 1 до 300 символов.',[cancelButton]);return true;}
  await run([['SET',amountReceipt,draft.id+':reason','EX',86400]]);
  draft.reason=text;draft.stage='confirm';await persist();await preview(draft);return true;
 }
 if(button?.[2]==='confirm'&&draft.stage==='done'){await notice('Эта операция уже записана.');return true;}
 if(button?.[2]==='confirm'&&draft.stage==='confirm'){
  try{
   const player=await identity();
   if(player.accountId!==draft.accountId||[draft.selected,...(draft.channel==='transfer'?[draft.from]:[])].some(selected=>!accounts(player).some(p=>p.room===selected.room&&p.playerId===selected.playerId)))throw Error('Привязка игрока изменилась. Начните заново: /записать.');
   if(draft.channel==='bonuses'&&!draft.reason)throw Error('Укажите причину бонуса.');
   const operation=draft.channel==='transfer'?{action:'transfer',requestId:'support_record_'+draft.id,fromRoom:draft.from.room,fromPlayerId:draft.from.playerId,toRoom:draft.selected.room,toPlayerId:draft.selected.playerId,amount:draft.amount}:{action:'channel-operation',requestId:'support_record_'+draft.id,channelId:draft.channel==='allfriends'?'other':draft.channel,direction:'income',room:draft.selected.room,playerId:draft.selected.playerId,amount:draft.amount,...(draft.channel==='bonuses'?{note:draft.reason}:{}),...(draft.channel==='allfriends'?{counterparty:'allfriends'}:{})};
   let completed=false;
   for(let attempt=0;attempt<5;attempt++){
    const [raw]=await run([['GET',STORE]]),state=raw?JSON.parse(raw):{revision:0,entries:[],requests:[]};
    const result=applyOperation(state,operation,'tg_'+actor,Date.now(),draft.actorName);
    if(result.duplicate){completed=true;break;}
    const [written]=await run([['EVAL',CAS,1,STORE,raw||'',JSON.stringify(result.state)]]);
    if(Number(written)===1){completed=true;break;}
   }
   if(!completed)throw Error('Данные меняются другим менеджером. Повторите подтверждение.');
  }catch(e){await notice('Не удалось записать операцию: '+e.message);return true;}
  draft.stage='done';await persist();
  await notice((draft.channel==='transfer'?'✅ Перевод записан в «Депозитах».':draft.channel==='bonuses'?'✅ Бонус записан в «Бонусах».':'✅ Приход записан в «Депозитах».')+'\n'+details(draft)+'\n'+(draft.amount/100).toLocaleString('ru-RU')+' ₽'+(draft.channel==='bonuses'?'\nЗа что: '+draft.reason:''));return true;
 }
 await notice('Этот шаг уже завершён. Для новой записи отправьте /записать.');return true;
}
module.exports={handle,accounts,amount};
