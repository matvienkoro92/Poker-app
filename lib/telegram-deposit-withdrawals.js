'use strict';
const redis=require('./redis');
const {summary}=require('./admin-deposits');
const {isAdmin}=require('./api-auth');
const GROUP_KEY='poker_app:admin-deposits:telegram-group';
const STORE_KEY='poker21:admin-deposits:v1';
const LINK='https://t.me/Poker_dvatuza_bot/DvaTuza?startapp=admin_deposits';
const OWNERS=['388008256','5053253480'];
const esc=s=>String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const money=n=>(Number(n||0)/100).toLocaleString('ru-RU',{maximumFractionDigits:2})+' ₽';
const rooms={P21:'Покер21',X:'Хпокер',PP:'PPpoker',Supr:'Супрема'};
async function run(commands){const rows=await redis.pipeline(commands,{throwOnError:true,context:'telegram-deposit-withdrawals'});if(!rows||rows.some(r=>r.error))throw Error('Storage unavailable');return rows;}
function timeInWork(createdAt,now){
 const started=typeof createdAt==='number'?createdAt:Date.parse(createdAt||'');
 if(!Number.isFinite(started))return 'неизвестно';
 const minutes=Math.floor(Math.max(0,now-started)/60000);
 if(!minutes)return 'меньше минуты';
 const days=Math.floor(minutes/1440),hours=Math.floor(minutes%1440/60),rest=minutes%60;
 return [days?days+' д':null,hours?hours+' ч':null,rest?rest+' мин':null].filter(Boolean).join(' ');
}
function withdrawalPages(state,now=Date.now()){
 const entries=(state.entries||[]).filter(e=>!e.deletedAt&&!e.archived).map(summary).filter(e=>e.remaining>0);
 const total=entries.reduce((n,e)=>n+e.remaining,0),reserved=entries.reduce((n,e)=>n+e.reserved,0),byRoom=new Map();
 for(const e of entries){const key=rooms[e.room]||'Рум не указан',row=byRoom.get(key)||{count:0,total:0};row.count++;row.total+=e.remaining;byRoom.set(key,row);}
 const header='<b>Выводы в работе: '+entries.length+'</b>\nОсталось выплатить: <b>'+money(total)+'</b>\nДоступно: '+money(total-reserved)+'\nЗаморожено: '+money(reserved)+([...byRoom].length?'\n\n'+[...byRoom].map(([name,r])=>esc(name)+': '+r.count+' · '+money(r.total)).join('\n'):'\n\nНезакрытых выводов нет.');
 const blocks=entries.map((e,i)=>'<b>'+(i+1)+'. '+esc(e.recipient||'Получатель не указан')+'</b>\n'+esc(rooms[e.room]||e.room||'Рум не указан')+(e.playerId?' · ID '+esc(e.playerId):'')+(e.bank?' · '+esc(e.bank):'')+'\nВ работе: '+timeInWork(e.createdAt,now)+'\nОстаток: <b>'+money(e.remaining)+'</b> · доступно '+money(e.available)+(e.reserved?' · заморожено '+money(e.reserved):''));
 const pages=[];let page=header;for(const block of blocks){if(page.length+block.length+2>3400){pages.push(page);page='<b>Выводы в работе — продолжение</b>';}page+='\n\n'+block;}pages.push(page);return pages;
}
async function handle(update,token,action){
 const invokedAt=Date.now();
 const cb=update.callback_query,message=cb?.message||update.message||update.business_message,actor=cb?.from||message?.from;
 if(!token||!message||!['group','supergroup'].includes(message.chat?.type)||!actor||actor.is_bot||(!isAdmin(actor.id)&&!OWNERS.includes(String(actor.id))))return false;
 const chatId=String(message.chat.id);if(!/^-\d+$/.test(chatId)||!redis.isConfigured())return false;
 async function call(method,body){const response=await fetch('https://api.telegram.org/bot'+token+'/'+method,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(10000)});const result=await response.json();if(!result.ok&&!/message is not modified/i.test(result.description||''))throw Error('Telegram reply failed');return result;}
 let configured=String(process.env.TELEGRAM_DEPOSITS_CHAT_ID||'').trim();
 if(!configured)configured=String((await run([['GET',GROUP_KEY]]))[0].result||'');
 if(!configured){
  if(!OWNERS.includes(String(actor.id))||!/^админка(?:\s+покер)?$/i.test(String(message.chat.title||'').trim())){
   if(!cb&&/^админка(?:\s+покер)?$/i.test(String(message.chat.title||'').trim()))await call('sendMessage',{chat_id:message.chat.id,reply_to_message_id:message.message_id,text:'Главному администратору нужно один раз отправить /withdrawals в этой группе, чтобы подключить отчёт.'});
   return true;
  }
  await run([['SET',GROUP_KEY,chatId,'NX']]);configured=String((await run([['GET',GROUP_KEY]]))[0].result||'');
 }
 if(configured!==chatId)return false;
 if(cb)await call('answerCallbackQuery',{callback_query_id:cb.id});
 let pages;try{const raw=(await run([['GET',STORE_KEY]]))[0].result;const state=raw?JSON.parse(raw):{entries:[]};if(!Array.isArray(state.entries))throw Error('Invalid ledger');pages=withdrawalPages(state,invokedAt);}catch(_){pages=['Не удалось загрузить остатки выводов. Попробуйте обновить.'];}
 const requested=Number(String(action||'').split(':')[1])||0,page=Math.max(0,Math.min(pages.length-1,requested));
 const nav=[];if(page>0)nav.push({text:'Назад',callback_data:'club:withdrawals:'+(page-1)});if(page+1<pages.length)nav.push({text:'Далее',callback_data:'club:withdrawals:'+(page+1)});
 await call(cb?'editMessageText':'sendMessage',{chat_id:message.chat.id,text:pages[page]+(pages.length>1?'\n\nСтраница '+(page+1)+' из '+pages.length:''),parse_mode:'HTML',reply_markup:{inline_keyboard:[...(nav.length?[nav]:[]),[{text:'Обновить',callback_data:'club:withdrawals:'+page}],[{text:'Депозиты и выводы',url:LINK}]]},...(cb?{message_id:message.message_id}:{reply_to_message_id:message.message_id})});
 return true;
}
module.exports={handle,withdrawalPages,GROUP_KEY,STORE_KEY,LINK};
