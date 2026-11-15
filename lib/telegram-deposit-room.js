'use strict';
const PREFIX='poker_app:player-deposit:v1:room:';
function choices(player){return [{room:'P21',ids:player.poker21Id?[player.poker21Id]:[]},{room:'X',ids:player.xpokerIds||[]}];}
function label(choice){return (choice.room==='P21'?'Poker21':'X-Poker')+(choice.ids.length?' · ID '+choice.ids.join(', '):'');}
function keyboard(options){return {inline_keyboard:[options.map((o,i)=>({text:label(o).slice(0,64),callback_data:'club:player-deposit:room:'+i}))]};}
async function handle({cb,user,message,api,run,token}){
 if(message?.chat?.type!=='private'||String(message.chat.id)!==String(user?.id)||user?.is_bot)return false;
 const index=String(cb.data).match(/^club:player-deposit:room:([01])$/)?.[1];if(index===undefined)return false;
 const key=PREFIX+user.id+':'+message.message_id;
 const [row]=await run([['GET',key]]);let state;try{state=JSON.parse(row?.result||'null');}catch{}
 if(!state||state.expiresAt<=Date.now()||!state.options?.[Number(index)]){await api('answerCallbackQuery',{callback_query_id:cb.id,text:'Выбор устарел. Напишите менеджеру, куда пополнить.',show_alert:true});return true;}
 const selected=state.options[Number(index)];
 if(state.selected!==undefined&&state.selected!==Number(index)){await api('answerCallbackQuery',{callback_query_id:cb.id,text:'Рум уже выбран. Для изменения напишите менеджеру.',show_alert:true});return true;}
 if(state.selected===undefined){
  state.selected=Number(index);
  const [claim]=await run([['EVAL',"if redis.call('GET',KEYS[1])~=ARGV[1] then return 0 end; redis.call('SET',KEYS[1],ARGV[2],'EX',86400); return 1",1,key,row.result,JSON.stringify(state)]]);
  if(Number(claim?.result)!==1)throw Error('Deposit room choice changed; retry');
 }
 await api('answerCallbackQuery',{callback_query_id:cb.id,text:'Выбрано: '+label(selected)});
 await api('editMessageText',{chat_id:message.chat.id,message_id:message.message_id,text:'✅ Вы сообщили об оплате. Менеджер проверит поступление.\n\nПополнить: '+label(selected)+(selected.ids.length?'':'\nПришлите ваш ID в этом руме.'),reply_markup:{inline_keyboard:[]}});
 await require('./telegram-support').notifyDepositRoom(token,user,message.message_id,selected);
 return true;
}
module.exports={PREFIX,choices,label,keyboard,handle};
