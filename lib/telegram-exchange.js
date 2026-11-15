'use strict';
const {pipeline}=require('./redis');
const policy=require('./telegram-group-policy');
const PREFIX='poker_app:telegram:exchange:';
const keyboard={inline_keyboard:[[{text:'Хочу сделать вывод',callback_data:'exchange:withdraw'}],[{text:'Хочу пополнить',callback_data:'exchange:deposit'}]]};
function action(update){
 const cb=update?.callback_query,m=cb?.message||update?.message;
 if(!['group','supergroup'].includes(m?.chat?.type))return '';
 if(cb)return /^exchange:(withdraw|deposit)$/.test(cb.data||'')?cb.data.slice(9):'';
 return /^\/обмен(?:@Poker_dvatuza_bot)?$/i.test(String(m.text||'').trim())?'list':'';
}
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
function render(values){
 const players=[];
 const rows=Array.isArray(values)?Object.fromEntries(Array.from({length:values.length/2},(_,i)=>[values[i*2],values[i*2+1]])):values||{};
 for(const [id,value]of Object.entries(rows)){try{const p=JSON.parse(value);if(/^[1-9]\d*$/.test(id)&&['withdraw','deposit'].includes(p.side))players.push({...p,id});}catch{}}
 const lines=['🔄 <b>Обмен между игроками — на суммы до 1000 ₽</b>'];
 for(const [side,title]of [['withdraw','Хочет сделать вывод'],['deposit','Хочет пополнить']]){
  const group=players.filter(p=>p.side===side).sort((a,b)=>a.id.localeCompare(b.id));
  lines.push('',`<b>${title}</b>`);
  lines.push(...(group.length?group.slice(0,15).map(p=>'• <a href="tg://user?id='+p.id+'">'+esc(p.name)+'</a>'):['Пока нет заявок.']));
  if(group.length>15)lines.push('Ещё заявок: '+(group.length-15));
 }
 lines.push('','Нажмите кнопку, чтобы добавить себя. Повторное нажатие снимает заявку; другая кнопка меняет её тип.');
 return lines.join('\n');
}
async function handle(update,token){
 const kind=action(update),cb=update.callback_query,m=cb?.message||update.message,user=cb?.from||m?.from;
 if(!kind||!token||!user||user.is_bot||!Number.isSafeInteger(user.id)||user.id<=0||!Number.isSafeInteger(m.message_id)||m.message_id<=0)return false;
 const key=PREFIX+m.chat.id;
 async function api(method,body){
  const response=await policy.guardedFetch('https://api.telegram.org/bot'+token+'/'+method,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(10000)},'exchange-command');
  const result=await response.json();
  if(!result.ok&&!String(result.description||'').includes('message is not modified'))throw Error('Exchange Telegram request failed');
 }
 if(cb){
  // Toggle atomically so simultaneous clicks do not overwrite other players.
  const script="if not redis.call('SET',KEYS[2],'1','NX','EX',86400) then return 0 end; local old=redis.call('HGET',KEYS[1],ARGV[1]); if old and cjson.decode(old).side==ARGV[2] then redis.call('HDEL',KEYS[1],ARGV[1]); else redis.call('HSET',KEYS[1],ARGV[1],ARGV[3]); end; return 1";
  const name=String([user.first_name,user.last_name].filter(Boolean).join(' ')||user.username||'Игрок').replace(/[\r\n]/g,' ').slice(0,60);
  await pipeline([['EVAL',script,2,key,PREFIX+'click:'+cb.id,String(user.id),kind,JSON.stringify({side:kind,name})]],{throwOnError:true,context:'exchange.toggle'});
  await api('answerCallbackQuery',{callback_query_id:cb.id,text:'Заявка обновлена'});
 }
 const [row]=await pipeline([['HGETALL',key]],{throwOnError:true,context:'exchange.list'});
 const body={chat_id:m.chat.id,text:render(row?.result),parse_mode:'HTML',reply_markup:keyboard};
 if(cb){body.message_id=m.message_id;await api('editMessageText',body);}
 else{body.reply_parameters={message_id:m.message_id};if(m.message_thread_id)body.message_thread_id=m.message_thread_id;await api('sendMessage',body);}
 return true;
}
module.exports={action,handle,render};
