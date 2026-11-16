'use strict';
const {pipeline}=require('./redis');
const policy=require('./telegram-group-policy');
const PREFIX='poker_app:telegram:exchange:', DURATION=2*60*60*1000, DUE=PREFIX+'due', DELETE_DUE=PREFIX+'delete-due';
const keyboard={inline_keyboard:[[{text:'Хочу сделать вывод',callback_data:'exchange:withdraw'},{text:'Хочу пополнить',callback_data:'exchange:deposit'}],[{text:'Удалиться из списка',callback_data:'exchange:remove'}]]};
function action(update){
 const cb=update?.callback_query,m=cb?.message||update?.message;
 if(!['private','group','supergroup'].includes(m?.chat?.type))return '';
 if(cb)return /^exchange:(withdraw|deposit|remove)$/.test(cb.data||'')?cb.data.slice(9):'';
 if(/^\/обмен(?:@Poker_dvatuza_bot)?$/i.test(String(m.text||'').trim()))return 'list';
 if(/^\s*-?\d+(?:[.,]\d+)?\s*(?:₽|руб\.?|р\.?)?\s*$/i.test(String(m.text||'')))return 'amount';
 if(m.reply_to_message?.from?.is_bot&&/^🔄 Обмен: введите сумму/.test(m.reply_to_message.text||''))return 'amount';
 return '';
}
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const rows=v=>Array.isArray(v)?Object.fromEntries(Array.from({length:v.length/2},(_,i)=>[v[i*2],v[i*2+1]])):v||{};
function render(values,now=Date.now()){
 const players=[];
 for(const [id,value]of Object.entries(rows(values))){try{const p=JSON.parse(value);if(/^[1-9]\d*$/.test(id)&&['withdraw','deposit'].includes(p.side)&&p.expiresAt>now)players.push({...p,id});}catch{}}
 const lines=['🔄 <b>Обмен между игроками — на суммы до 1000 ₽</b>'];
 for(const [side,title]of [['withdraw','Хочет сделать вывод'],['deposit','Хочет пополнить']]){
  const group=players.filter(p=>p.side===side).sort((a,b)=>a.id.localeCompare(b.id));
  lines.push('',`<b>${title}</b>`);
  lines.push(...(group.length?group.slice(0,15).map(p=>'• <a href="tg://user?id='+p.id+'">'+esc(p.name)+'</a>'+(p.amount?' — '+esc(p.amount)+' ₽':'')):['Пока нет заявок.']));
  if(group.length>15)lines.push('Ещё заявок: '+(group.length-15));
 }
 lines.push('','Выберите вывод или пополнение и отправьте сумму от 1 до 1000 ₽ следующим сообщением в чат. Заявка размещается на 2 часа, затем автоматически удаляется.');
 return lines.join('\n');
}
async function read(commands){return pipeline(commands,{throwOnError:true,context:'exchange'});}
async function api(token,method,body){
 const response=await policy.guardedFetch('https://api.telegram.org/bot'+token+'/'+method,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(10000)},'exchange-command');
 const result=await response.json();
 if(!result.ok&&!String(result.description||'').includes('message is not modified')){const e=Error('Exchange Telegram request failed');e.description=result.description;e.code=result.error_code||response.status;throw e;}
 return result.result;
}
async function removeAcceptedAmount(chat,messageId,token){
 const member=chat+':'+messageId;
 await read([['ZADD',DELETE_DUE,Date.now(),member]]);
 try{
  await api(token,'deleteMessage',{chat_id:chat,message_id:messageId});
  await read([['ZREM',DELETE_DUE,member]]);
 }catch(e){
  if(/message to delete not found/.test(e.description||''))await read([['ZREM',DELETE_DUE,member]]);
  else console.error('[exchange.amount-delete]',e.description||e.message);
 }
}
async function refresh(chat,token){
 const key=PREFIX+chat,now=Date.now();
 const [list]=await read([['EVAL',"local r=redis.call('HGETALL',KEYS[1]); for i=1,#r,2 do local ok,p=pcall(cjson.decode,r[i+1]); if not ok or not p.expiresAt or p.expiresAt<=tonumber(ARGV[1]) then redis.call('HDEL',KEYS[1],r[i]); end end; return redis.call('HGETALL',KEYS[1])",1,key,now]]);
 const [boards]=await read([['ZRANGEBYSCORE',key+':boards',now-86400000,'+inf']]);
 for(const id of boards?.result||[]){const [target,messageId]=String(id).includes(':')?String(id).split(':'):[chat,id];try{await api(token,'editMessageText',{chat_id:target,message_id:Number(messageId),text:render(list?.result,now),parse_mode:'HTML',reply_markup:keyboard});}catch(e){if(/message to edit not found|message can't be edited/.test(e.description||''))await read([['ZREM',key+':boards',id]]);else throw e;}}
}
async function handle(update,token){
 const kind=action(update),cb=update.callback_query,m=cb?.message||update.message,user=cb?.from||m?.from;
 if(!kind||!token||!user||user.is_bot||!Number.isSafeInteger(user.id)||user.id<=0||!Number.isSafeInteger(m.message_id)||m.message_id<=0)return false;
 const chat=String(m.chat.id),privateChat=m.chat.type==='private';
 if(privateChat&&String(user.id)!==chat)return false;
 const scope=privateChat?String(await require('./tracking-link-milestones').playersGroup()):chat;
 if(!/^-\d+$/.test(scope))throw Error('Exchange group is not configured');
 const key=PREFIX+scope,localKey=PREFIX+chat,pending=localKey+':pending:'+user.id;
 const boardId=id=>privateChat?chat+':'+id:id;
 const editPrompt=async(boardId,side,error='')=>{
  const [list]=await read([['HGETALL',key]]);
  const name=esc([user.first_name,user.last_name].filter(Boolean).join(' ')||user.username||'Игрок');
  await api(token,'editMessageText',{chat_id:chat,message_id:boardId,text:render(list?.result)+'\n\n'+(error?esc(error)+'\n':'')+'👤 <a href="tg://user?id='+user.id+'">'+name+'</a>, введите сумму '+(side==='withdraw'?'для вывода':'для пополнения')+' от 1 до 1000 ₽ следующим сообщением в чат. Заявка будет видна 2 часа.',parse_mode:'HTML',reply_markup:keyboard});
 };

 if(cb){
  await api(token,'answerCallbackQuery',{callback_query_id:cb.id,text:kind==='remove'?'Вы удалены из списка':'Отправьте сумму следующим сообщением в чат'});
  await read([['ZREM',DELETE_DUE,chat+':'+m.message_id],['ZADD',key+':boards',Date.now(),boardId(m.message_id)],['EXPIRE',key+':boards',172800]]);
  if(kind==='remove')await read([['HDEL',key,String(user.id)],['DEL',pending]]);
  else{
   const [saved]=await read([['GET',pending]]);let previous;try{previous=JSON.parse(saved?.result||'null');}catch{}
   const expiresAt=previous?.promptId===m.message_id&&previous?.side===kind?previous.expiresAt:Date.now()+180000;
   await read([['SET',pending,JSON.stringify({side:kind,promptId:m.message_id,threadId:m.chat.is_forum?(m.message_thread_id||null):null,expiresAt}),'PX',Math.max(1,expiresAt-Date.now())]]);
   await editPrompt(m.message_id,kind);
   return true;
  }
 }else if(kind==='amount'){
  const [saved]=await read([['GET',pending]]);let p;try{p=JSON.parse(saved?.result||'null');}catch{}
  if(!p){const [done]=await read([['GET',localKey+':submitted:'+m.message_id]]);if(done?.result){await removeAcceptedAmount(chat,m.message_id,token);await refresh(scope,token);return true;}return false;}
  if(p.expiresAt&&p.expiresAt<=Date.now())return false;
  // Telegram may attach a reply-thread ID in a regular group. Only forum topics isolate input.
  if(m.chat.is_forum&&(p.threadId||null)!==(m.message_thread_id||null))return false;
  if(m.reply_to_message&&p.promptId!==m.reply_to_message.message_id)return false;
  const raw=String(m.text||'').trim().replace(/\s*(?:₽|руб\.?|р\.?)$/i,'').replace(',','.');
  const amount=/^\d{1,4}(?:\.\d{1,2})?$/.test(raw)?Number(raw):NaN;
  if(!Number.isFinite(amount)||amount<1||amount>1000){await editPrompt(p.promptId,p.side,'Укажите сумму от 1 до 1000 ₽.');return true;}
  const name=String([user.first_name,user.last_name].filter(Boolean).join(' ')||user.username||'Игрок').replace(/[\r\n]/g,' ').slice(0,60);
  const script="local old=redis.call('GET',KEYS[2]); if old~=ARGV[2] then return 0 end; redis.call('HSET',KEYS[1],ARGV[1],ARGV[3]); redis.call('DEL',KEYS[2]); redis.call('SET',KEYS[4],ARGV[6],'EX',86400); redis.call('ZADD',KEYS[3],ARGV[4],ARGV[5]); return 1";
  const [accepted]=await read([['EVAL',script,4,key,pending,DUE,localKey+':submitted:'+m.message_id,String(user.id),saved.result,JSON.stringify({side:p.side,name,amount,expiresAt:Date.now()+DURATION}),Date.now()+DURATION,scope+':'+user.id,JSON.stringify({type:'amount',chat,messageId:m.message_id,userId:user.id,amount,createdAt:Date.now()})]]);
  if(Number(accepted?.result)===1)await removeAcceptedAmount(chat,m.message_id,token);
 }else{
  const [list]=await read([['HGETALL',key]]);
  const message=await api(token,'sendMessage',{chat_id:chat,text:render(list?.result),parse_mode:'HTML',reply_markup:keyboard,reply_parameters:{message_id:m.message_id},...(m.message_thread_id?{message_thread_id:m.message_thread_id}:{})});
  await read([['ZADD',key+':boards',Date.now(),boardId(message.message_id)],['EXPIRE',key+':boards',172800]]);
 }
 await refresh(scope,token);return true;
}
async function expire(token){
 const now=Date.now();
 const [messages]=await read([['ZRANGEBYSCORE',DELETE_DUE,'-inf',now,'LIMIT',0,100]]);
 for(const member of messages?.result||[]){
  const match=String(member).match(/^(-?[1-9]\d*):(\d+)$/);if(!match)continue;
  const [,chat,id]=match;
  const [receipt]=await read([['GET',PREFIX+chat+':submitted:'+id]]);
  let accepted;try{accepted=JSON.parse(receipt?.result||'null');}catch{}
  if(accepted?.type!=='amount'){await read([['ZREM',DELETE_DUE,member]]);continue;}
  try{await api(token,'deleteMessage',{chat_id:chat,message_id:Number(id)});}
  catch(e){if(e.code===429)break;if(e.code!==403&&!/message to delete not found/.test(e.description||''))throw e;}
  await read([['ZREM',PREFIX+chat+':boards',id],['ZREM',DELETE_DUE,member]]);
  if(!chat.startsWith('-')){
   const group=await require('./tracking-link-milestones').playersGroup();
   if(group)await read([['ZREM',PREFIX+group+':boards',member]]);
  }
 }
 const [due]=await read([['ZRANGEBYSCORE',DUE,'-inf',now,'LIMIT',0,100]]);
 const chats=new Set((due?.result||[]).map(v=>String(v).split(':')[0]));
 for(const chat of chats)await refresh(chat,token);
 // Remove only the due score we read; a concurrent new request must retain its timer.
 for(const member of due?.result||[])await read([['EVAL',"local s=redis.call('ZSCORE',KEYS[1],ARGV[1]); if s and tonumber(s)<=tonumber(ARGV[2]) then return redis.call('ZREM',KEYS[1],ARGV[1]) end; return 0",1,DUE,member,now]]);
 return chats.size;
}
module.exports={action,handle,render,expire};
