'use strict';
const redis=require('./redis');
const PREFIX='poker_app:telegram:support:v1:';
const SIZE=10;
const boardKey=group=>PREFIX+'queue-board:'+group;
const waitingKey=group=>PREFIX+'waiting:'+group;
const clientsKey=group=>PREFIX+'clients:'+group;
const esc=value=>String(value||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
async function run(commands){return redis.pipeline(commands,{throwOnError:true,context:'support.queue'});}
async function readBoard(group){const [row]=await run([['GET',boardKey(group)]]);return row?.result?JSON.parse(row.result):null;}
async function saveBoard(group,board){await run([['SET',boardKey(group),JSON.stringify(board)]]);}
function render(group,clients,total,page){
  const lines=clients.map((client,index)=>{
    const name=esc(String(client.playerName||client.name||'Игрок').slice(0,42));
    const identity=client.poker21Id?'Poker21 '+esc(client.poker21Id):'Telegram '+esc(client.id);
    return (page+index+1)+'. <a href="https://t.me/c/'+String(group).slice(4)+'/'+client.threadId+'">'+name+' · '+identity+'</a>';
  });
  let text='<b>Ждут ответа: '+total+'</b>\n\n'+(total?lines.join('\n'):'Сейчас нет обращений без ответа.');
  if(total>SIZE)text+='\n\nПоказаны '+(page+1)+'–'+Math.min(page+SIZE,total)+' из '+total;
  const buttons=[];
  if(page>0)buttons.push({text:'← Назад',callback_data:'support:queue:'+Math.max(0,page-SIZE)});
  if(page+SIZE<total)buttons.push({text:'Далее →',callback_data:'support:queue:'+(page+SIZE)});
  return {text,parse_mode:'HTML',link_preview_options:{is_disabled:true},reply_markup:{inline_keyboard:buttons.length?[buttons]:[]}};
}
async function refresh(token,group,{api,lock},requestedPage){
  return lock(PREFIX+'queue-lock:'+group,async()=>{
    let board=await readBoard(group);
    const [count]=await run([['ZCARD',waitingKey(group)]]),total=Number(count?.result)||0;
    const page=Math.max(0,Math.min(Math.floor(Number(requestedPage??board?.page??0)/SIZE)*SIZE,Math.max(0,Math.ceil(total/SIZE)-1)*SIZE));
    const [members]=await run([['ZRANGE',waitingKey(group),page,page+SIZE-1]]);
    const ids=Array.isArray(members?.result)?members.result:[];
    const rows=ids.length?await run(ids.map(id=>['GET',PREFIX+'client:'+group+':'+id])):[];
    const clients=rows.flatMap(row=>{try{const c=JSON.parse(row.result||'null');return c&&Number.isSafeInteger(c.threadId)?[c]:[];}catch{return [];}});
    const body=render(group,clients,total,page),snapshot=JSON.stringify(body);
    if(board&&board.snapshot!==snapshot){
      try{await api(token,'editMessageText',{chat_id:group,message_id:board.messageId,...body});}
      catch(error){
        if(error.telegramErrorCode===400&&/message to edit not found/i.test(error.telegramDescription||''))board=null;
        else if(!/message is not modified/i.test(error.telegramDescription||''))throw error;
      }
    }
    if(!board){
      const message=await api(token,'sendMessage',{chat_id:group,...body});
      if(!Number.isSafeInteger(message?.message_id))throw Error('Invalid queue message');
      board={messageId:message.message_id,pinned:false};
    }
    Object.assign(board,{snapshot,page});await saveBoard(group,board);
    if(!board.pinned){
      await api(token,'pinChatMessage',{chat_id:group,message_id:board.messageId,disable_notification:true});
      board.pinned=true;await saveBoard(group,board);
    }
    return board;
  });
}
async function sync(token,group,client,dependencies){
  const waiting=(client.lastInboundMessageId||0)>(client.lastAnsweredInboundId||0);
  await run([['SADD',clientsKey(group),String(client.id)],waiting?['ZADD',waitingKey(group),'NX',client.lastInboundAt||client.createdAt||Date.now(),String(client.id)]:['ZREM',waitingKey(group),String(client.id)]]);
  return refresh(token,group,dependencies);
}
module.exports={sync,refresh,readBoard,render,boardKey,waitingKey,clientsKey};
