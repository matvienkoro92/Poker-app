'use strict';
const {createHash}=require('node:crypto');
const redis=require('./redis');
const {applyOperation}=require('./admin-deposits');
const STORE='poker21:admin-deposits:v1';
const CAS="if (redis.call('GET',KEYS[1]) or '')~=ARGV[1] then return 0 end; redis.call('SET',KEYS[1],ARGV[2]); return 1";
const CHANNELS={runex:'Рунекс',exchip:'Эксчип бот','r-crypto':'Рома Крипта',allfriends:'Алл френдс'};
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
 const text=String(m?.text||'').trim(),start=!cb&&/^\/записать(?:@Poker_dvatuza_bot)?$/i.test(text);
 const button=String(cb?.data||'').match(/^support:record:([a-f0-9]{16}):(channel|account|confirm|cancel)(?::([a-z0-9-]+))?$/);
 const actor=String(user.id),saved=client.recordDrafts?.[actor];
 const notice=(text,keyboard=[])=>api(token,'sendMessage',{chat_id:group,message_thread_id:client.threadId,text,reply_markup:{inline_keyboard:keyboard}});
 const preview=draft=>notice('Проверьте приход\n'+draft.name+'\n'+CHANNELS[draft.channel]+' · '+ROOMS[draft.selected.room]+' · ID '+draft.selected.playerId+'\nСумма: '+(draft.amount/100).toLocaleString('ru-RU')+' ₽\n\nПодтвердите только фактически полученные деньги.',[[{text:'✅ Записать приход',callback_data:'support:record:'+draft.id+':confirm'}],[{text:'Отмена',callback_data:'support:record:'+draft.id+':cancel'}]]);
 const amountReceipt=!cb&&m&&amount(text)!==null?'poker_app:telegram:support:record-amount:'+group+':'+m.message_id:null;
 if(amountReceipt){const [consumed]=await run([['GET',amountReceipt]]);if(consumed&&(consumed!==saved?.id||saved?.stage!=='amount')){if(consumed===saved?.id&&saved.stage==='confirm'&&saved.expiresAt>Date.now())await preview(saved);return true;}}
 const waiting=saved?.stage==='amount'&&saved.expiresAt>Date.now();
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
  await notice('Записать приход в «Депозитах»\nВыберите способ оплаты:',[
   ['runex','exchip'].map(key=>({text:CHANNELS[key],callback_data:'support:record:'+id+':channel:'+key})),
   ['r-crypto','allfriends'].map(key=>({text:CHANNELS[key],callback_data:'support:record:'+id+':channel:'+key}))
  ]);return true;
 }
 if(button){
  if(!source.from?.is_bot)return true;
  await api(token,'answerCallbackQuery',{callback_query_id:cb.id});
 }
 const draft=client.recordDrafts?.[actor];
 if(!draft||draft.expiresAt<Date.now()||(button&&draft.id!==button[1])){await notice('Этот выбор устарел или принадлежит другому менеджеру. Начните заново: /записать.');return true;}
 const callback=(action,value)=>'support:record:'+draft.id+':'+action+(value===undefined?'':':'+value);
 const cancelButton=[{text:'Отмена',callback_data:callback('cancel')}];
 if(cancel||button?.[2]==='cancel'){
  if(draft.stage==='done'){await notice('Приход уже записан. Отменить операцию можно в «Депозитах».');return true;}
  draft.stage='cancelled';await persist();await notice('Запись отменена.');return true;
 }
 if(button?.[2]==='channel'&&(draft.stage==='channel'||draft.stage==='account'&&draft.channel===button[3])&&Object.hasOwn(CHANNELS,button[3])){
  try{const player=await identity();draft.accounts=accounts(player);draft.accountId=player.accountId;draft.name=player.name||client.name||client.id;}
  catch(e){await notice(e.message);return true;}
  if(!draft.accounts.length){await notice('Нет привязанных ID. Сначала привяжите аккаунт в карточке игрока, затем отправьте /записать.');return true;}
  draft.channel=button[3];draft.stage='account';await persist();
  await notice(CHANNELS[draft.channel]+'\nВыберите привязанный рум и ID игрока:',draft.accounts.map((p,i)=>[{text:ROOMS[p.room]+' · ID '+p.playerId,callback_data:callback('account',i)}]).concat([cancelButton]));return true;
 }
 if(button?.[2]==='account'&&(draft.stage==='account'||draft.stage==='amount')&&/^\d+$/.test(button[3]||'')&&draft.accounts[Number(button[3])]&&(draft.stage!=='amount'||draft.selected===draft.accounts[Number(button[3])]||draft.selected.room===draft.accounts[Number(button[3])].room&&draft.selected.playerId===draft.accounts[Number(button[3])].playerId)){
  draft.selected=draft.accounts[Number(button[3])];draft.stage='amount';await persist();
  await notice(CHANNELS[draft.channel]+' · '+ROOMS[draft.selected.room]+' · ID '+draft.selected.playerId+'\nВведите сумму прихода в рублях, например 2000.\n/отмена — отменить запись.',[cancelButton]);return true;
 }
 if(!cb&&draft.stage==='amount'){
  const value=amount(text);if(value===null){await notice('Введите положительную сумму в рублях, например 2000 или 1500,50. Для отмены — /отмена.');return true;}
  await run([['SET',amountReceipt,draft.id,'EX',86400]]);
  draft.amount=value;draft.stage='confirm';await persist();
  await preview(draft);return true;
 }
 if(button?.[2]==='confirm'&&draft.stage==='done'){await notice('Этот приход уже записан.');return true;}
 if(button?.[2]==='confirm'&&draft.stage==='confirm'){
  try{
   const player=await identity();
   if(player.accountId!==draft.accountId||!accounts(player).some(p=>p.room===draft.selected.room&&p.playerId===draft.selected.playerId))throw Error('Привязка игрока изменилась. Начните заново: /записать.');
   const operation={action:'channel-operation',requestId:'support_record_'+draft.id,channelId:draft.channel==='allfriends'?'other':draft.channel,direction:'income',room:draft.selected.room,playerId:draft.selected.playerId,amount:draft.amount,...(draft.channel==='allfriends'?{counterparty:'allfriends'}:{})};
   let completed=false;
   for(let attempt=0;attempt<5;attempt++){
    const [raw]=await run([['GET',STORE]]),state=raw?JSON.parse(raw):{revision:0,entries:[],requests:[]};
    const result=applyOperation(state,operation,'tg_'+actor,Date.now(),draft.actorName);
    if(result.duplicate){completed=true;break;}
    const [written]=await run([['EVAL',CAS,1,STORE,raw||'',JSON.stringify(result.state)]]);
    if(Number(written)===1){completed=true;break;}
   }
   if(!completed)throw Error('Данные меняются другим менеджером. Повторите подтверждение.');
  }catch(e){await notice('Не удалось записать приход: '+e.message);return true;}
  draft.stage='done';await persist();
  await notice('✅ Приход записан в «Депозитах».\n'+CHANNELS[draft.channel]+' · '+ROOMS[draft.selected.room]+' · ID '+draft.selected.playerId+'\n'+(draft.amount/100).toLocaleString('ru-RU')+' ₽');return true;
 }
 await notice('Этот шаг уже завершён. Для новой записи отправьте /записать.');return true;
}
module.exports={handle,accounts,amount};
