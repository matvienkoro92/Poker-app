'use strict';
const {createHash}=require('node:crypto');
const redis=require('./redis');
const {isAdmin}=require('./api-auth');
const {applyOperation}=require('./admin-deposits');
const {depositPlayerDirectory}=require('./deposit-player-directory');
const quick=require('../deposit-quick-input');
const {GROUP_KEY,STORE_KEY,LINK}=require('./telegram-deposit-withdrawals');
const CAS="local old=redis.call('GET',KEYS[1]); if (old or '')~=ARGV[1] then return 0 end; redis.call('SET',KEYS[1],ARGV[2]); return 1";
const PREFIX='poker_app:deposit-income-draft:';
const esc=s=>String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const money=n=>(n/100).toLocaleString('ru-RU')+' ₽';
async function run(commands){const rows=await redis.pipeline(commands,{throwOnError:true,context:'telegram-deposit-income'});if(!rows||rows.some(r=>r.error))throw Error('Хранилище недоступно');return rows;}
async function handle(update,token,action){
 const cb=update.callback_query,m=cb?.message||update.message||update.business_message,actor=cb?.from||m?.from;
 if(!token||!actor||actor.is_bot||!isAdmin(actor.id)||!['group','supergroup'].includes(m?.chat?.type)||!redis.isConfigured())return false;
 const group=String(process.env.TELEGRAM_DEPOSITS_CHAT_ID||((await run([['GET',GROUP_KEY]]))[0].result)||'');if(group!==String(m.chat.id))return false;
 async function call(method,body){const response=await fetch('https://api.telegram.org/bot'+token+'/'+method,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(10000)});const result=await response.json();if(!result.ok&&!/message is not modified/i.test(result.description||''))throw Error('Не удалось ответить в Telegram');return result;}
 async function reply(text,buttons=[]){return call(cb?'editMessageText':'sendMessage',{chat_id:m.chat.id,...(cb?{message_id:m.message_id}:{reply_to_message_id:m.message_id}),text,parse_mode:'HTML',reply_markup:{inline_keyboard:buttons}});}
 const read=async()=>{const raw=(await run([['GET',STORE_KEY]]))[0].result||'';return {raw,state:raw?JSON.parse(raw):{revision:0,entries:[],requests:[]}};};
 if(cb){
  const parts=String(action).split(':'),id=parts[2],index=Number(parts[3]);
  if(!/^[a-f0-9-]{36}$/.test(id||'')||!Number.isInteger(index))return false;
  const raw=(await run([['GET',PREFIX+id]]))[0].result,draft=raw&&JSON.parse(raw);
  if(!draft||draft.expiresAt<Date.now()){await call('answerCallbackQuery',{callback_query_id:cb.id,text:'Подтверждение устарело. Отправьте команду ещё раз.',show_alert:true});return true;}
  if(draft.actor!==String(actor.id)||draft.chat!==String(m.chat.id)){await call('answerCallbackQuery',{callback_query_id:cb.id,text:'Подтвердить может только автор команды.',show_alert:true});return true;}
  const p=draft.matches[index];if(!p)return false;
  await call('answerCallbackQuery',{callback_query_id:cb.id});
  try{
   for(let attempt=0;attempt<5;attempt++){
    const {raw,state}=await read(),exists=depositPlayerDirectory(state).some(row=>row.room===p.room&&row.playerId===p.playerId);if(!exists)throw Error('Аккаунт больше не найден. Создайте команду заново.');
    const result=applyOperation(state,{action:'channel-operation',requestId:id,channelId:draft.channelId,direction:'income',room:p.room,playerId:p.playerId,amount:draft.amount},'tg_'+actor.id,Date.now(),draft.actorName);
    if(!result.duplicate&&Number((await run([['EVAL',CAS,1,STORE_KEY,raw,JSON.stringify(result.state)]]))[0].result)!==1)continue;
    await reply('✓ Приход записан\n'+esc(p.nick||p.name||p.playerId)+' · '+esc(p.room)+' · ID '+esc(p.playerId)+'\n'+money(draft.amount)+' · '+esc(draft.channelId),[[{text:'Депозиты и выводы',url:LINK}]]);return true;
   }
   throw Error('Данные меняются другим менеджером. Нажмите подтверждение ещё раз.');
  }catch(e){await reply('Не удалось записать приход: '+esc(e.message),[[{text:'Повторить подтверждение',callback_data:'club:deposit:confirm:'+id+':'+index}]]);return true;}
 }
 try{
  const {state}=await read(),parsed=quick.parse(m.text,depositPlayerDirectory(state));if(parsed.error){await reply(esc(parsed.error));return true;}
  if(parsed.matches.length>10){await reply('Слишком много совпадений. Укажите полный ник игрока.');return true;}
  const hash=createHash('sha256').update(String(m.chat.id)+':'+m.message_id+':'+actor.id).digest('hex').slice(0,32),id=[hash.slice(0,8),hash.slice(8,12),hash.slice(12,16),hash.slice(16,20),hash.slice(20)].join('-'),draft={actor:String(actor.id),chat:String(m.chat.id),actorName:[actor.first_name,actor.last_name].filter(Boolean).join(' ')||actor.username||'Администратор',channelId:parsed.channelId,amount:parsed.amount,matches:parsed.matches.map(p=>({room:p.room,playerId:p.playerId,nick:p.nick,name:p.name})),expiresAt:Date.now()+15*60000};
  await run([['SET',PREFIX+id,JSON.stringify(draft),'EX',900]]);
  const choices=draft.matches.map((p,i)=>[{text:(draft.matches.length===1?'Подтвердить: ':'')+(p.nick||p.name||p.playerId)+' · '+p.room+' · '+p.playerId,callback_data:'club:deposit:confirm:'+id+':'+i}]);
  await reply('<b>Проверьте приход</b>\n'+money(draft.amount)+' · '+esc(draft.channelId)+'\n'+draft.matches.map(p=>esc(p.nick||p.name||p.playerId)+' · '+esc(p.room)+' · ID '+esc(p.playerId)).join('\n')+'\n\n'+(draft.matches.length===1?'Подтвердите получение денег.':'Выберите аккаунт для записи прихода.'),choices);
 }catch(_){await reply('Не удалось подготовить приход. Попробуйте ещё раз.');}
 return true;
}
module.exports={handle,PREFIX};
