'use strict';
const {createHash}=require('node:crypto');
const redis=require('./redis');
const {applyOperation}=require('./admin-deposits');
const {depositPlayerDirectory}=require('./deposit-player-directory');
const STORE='poker21:admin-deposits:v1',PREFIX='poker_app:telegram:support:transfer:';
const CAS="if (redis.call('GET',KEYS[1]) or '')~=ARGV[1] then return 0 end; redis.call('SET',KEYS[1],ARGV[2]); return 1";
const rooms={p21:'P21','п21':'P21','покер21':'P21',x:'X','х':'X',xpoker:'X','x-poker':'X','хпокер':'X','х-покер':'X',pp:'PP',pppoker:'PP',supr:'Supr','супрема':'Supr'};
const HELP='Введите /перевод P21 X 2000 — запись перевода между румами одного игрока. Сначала рум списания, затем рум начисления и сумма. Команда и подтверждение остаются в этой теме. Фишки автоматически не перемещаются.';
function parse(text){
 const match=String(text||'').trim().match(/^\/(?:перевод|transfer)(?:@Poker_dvatuza_bot)?(?:\s+([\s\S]*))?$/i);
 if(!match)return null;
 const parts=String(match[1]||'').split(/\s+/),fromRoom=rooms[parts[0]?.toLowerCase()],toRoom=rooms[parts[1]?.toLowerCase()];
 const amount=/^\d+(?:[.,]\d{1,2})?$/.test(parts[2]||'')?Math.round(Number(parts[2].replace(',','.'))*100):0;
 if(parts.length!==3||!fromRoom||!toRoom||fromRoom===toRoom||!Number.isSafeInteger(amount)||amount<=0||amount>1e10)return {error:HELP};
 return {fromRoom,toRoom,amount};
}
async function run(commands){
 const rows=await redis.pipeline(commands,{throwOnError:true,context:'support.transfer'});
 if(!rows||rows.length!==commands.length||rows.some(r=>r.error))throw Error('Хранилище недоступно');
 return rows.map(r=>r.result);
}
async function ledger(){const [raw]=await run([['GET',STORE]]);return {raw:raw||'',state:raw?JSON.parse(raw):{revision:0,entries:[],requests:[]}};}
function accounts(state,identity,fromRoom,toRoom){
 if(identity.unavailable||identity.xpokerUnavailable||!identity.accountId)throw Error('Профиль игрока недоступен. Проверьте привязку в карточке.');
 const directory=depositPlayerDirectory(state);
 const anchor=directory.find(p=>p.room==='P21'&&p.playerId===identity.poker21Id)||directory.find(p=>p.room==='X'&&(identity.xpokerIds||[]).includes(p.playerId));
 if(!anchor)throw Error('Не найдены сохранённые аккаунты игрока. Сначала привяжите ID в карточке и «Депозитах».');
 const own=directory.filter(p=>p.profileKey===anchor.profileKey&&!(p.room==='X'&&(state.playerIdentityLinks||[]).some(link=>link.room==='X'&&link.playerId===p.playerId&&link.accountId!==identity.accountId)));
 const sides=[fromRoom,toRoom].map(room=>own.filter(p=>p.room===room));
 if(sides.some(rows=>rows.length!==1))throw Error('Для каждого рума должен быть сохранён ровно один аккаунт этого игрока. Проверьте привязки в «Депозитах».');
 return {profileKey:anchor.profileKey,fromPlayerId:sides[0][0].playerId,toPlayerId:sides[1][0].playerId};
}
async function handle({cb,m,source,user,client,group,token,api,readPlayerIdentity,operatorName}){
 const parsed=cb?null:parse(m?.text),button=String(cb?.data||'').match(/^support:transfer:(confirm|cancel):([a-f0-9]{24})$/);
 if(!parsed&&!button)return false;
 const notice=(text,keyboard=[])=>api(token,'sendMessage',{chat_id:group,message_thread_id:client.threadId,text,reply_markup:{inline_keyboard:keyboard}});
 const identity=()=>readPlayerIdentity({id:Number(client.id),first_name:client.name||'Игрок'});
 if(parsed?.error){await notice(parsed.error);return true;}
 if(parsed){
  let draft,id;
  try{
   const player=await identity(),{state}=await ledger(),selected=accounts(state,player,parsed.fromRoom,parsed.toRoom);
   id=createHash('sha256').update(group+':'+client.threadId+':'+m.message_id+':'+user.id).digest('hex').slice(0,24);
   draft={...parsed,...selected,id,accountId:player.accountId,lead:String(client.id),group:String(group),thread:client.threadId,actor:String(user.id),actorName:operatorName(user),name:player.name||client.name||client.id,expiresAt:Date.now()+900000};
   await run([['SET',PREFIX+id,JSON.stringify(draft),'NX','EX',900]]);
   const [savedDraft]=await run([['GET',PREFIX+id]]);draft=JSON.parse(savedDraft);
  }catch(e){await notice('Не удалось подготовить перевод: '+e.message);return true;}
  await notice('Проверьте запись перевода\n'+draft.name+'\nСписание: '+draft.fromRoom+' · ID '+draft.fromPlayerId+'\nНачисление: '+draft.toRoom+' · ID '+draft.toPlayerId+'\nСумма: '+(draft.amount/100).toLocaleString('ru-RU')+' ₽\n\nПодтверждайте после фактического перевода фишек. Будет создана только запись в «Депозитах».',[[{text:'✅ Записать перевод',callback_data:'support:transfer:confirm:'+id}],[{text:'Отмена',callback_data:'support:transfer:cancel:'+id}]]);
  return true;
 }
 if(!source.from?.is_bot)return true;
 await api(token,'answerCallbackQuery',{callback_query_id:cb.id});
 const [rawDraft]=await run([['GET',PREFIX+button[2]]]),draft=rawDraft&&JSON.parse(rawDraft);
 if(!draft||draft.expiresAt<Date.now()||draft.cancelled){await notice('Подтверждение устарело или отменено. Отправьте команду заново.');return true;}
 if(draft.actor!==String(user.id)||draft.group!==String(group)||draft.thread!==client.threadId||draft.lead!==String(client.id)){
  await notice('Подтвердить или отменить перевод может только автор команды в исходной теме.');return true;
 }
 if(button[1]==='cancel'){
  const {state}=await ledger();
  if(state.requests.some(row=>row.id==='support_transfer_'+draft.id)){await notice('Перевод уже записан. Отменить запись можно в «Депозитах».');return true;}
  draft.cancelled=true;await run([['SET',PREFIX+draft.id,JSON.stringify(draft),'EX',900]]);
  await notice('Запись перевода отменена.');return true;
 }
 try{
  const player=await identity();
  if(player.accountId!==draft.accountId)throw Error('Профиль игрока изменился. Отправьте команду заново.');
  const operation={action:'transfer',requestId:'support_transfer_'+draft.id,profileKey:draft.profileKey,fromRoom:draft.fromRoom,fromPlayerId:draft.fromPlayerId,toRoom:draft.toRoom,toPlayerId:draft.toPlayerId,amount:draft.amount};
  let saved=false;
  for(let attempt=0;attempt<5;attempt++){
   const {raw,state}=await ledger(),current=accounts(state,player,draft.fromRoom,draft.toRoom);
   if(['profileKey','fromPlayerId','toPlayerId'].some(key=>current[key]!==draft[key]))throw Error('Аккаунты игрока изменились. Отправьте команду заново.');
   const result=applyOperation(state,operation,'tg_'+draft.actor,Date.now(),draft.actorName);
   if(result.duplicate){saved=true;break;}
   const [written]=await run([['EVAL',CAS,1,STORE,raw,JSON.stringify(result.state)]]);
   if(Number(written)===1){saved=true;break;}
  }
  if(!saved)throw Error('Данные меняются другим менеджером. Повторите подтверждение.');
 }catch(e){await notice('Не удалось записать перевод: '+e.message);return true;}
 await notice('✅ Перевод записан в «Депозитах».\n'+draft.name+' · '+draft.fromRoom+' ('+draft.fromPlayerId+') → '+draft.toRoom+' ('+draft.toPlayerId+')\n'+(draft.amount/100).toLocaleString('ru-RU')+' ₽');
 return true;
}
module.exports={handle,parse,accounts,PREFIX};
