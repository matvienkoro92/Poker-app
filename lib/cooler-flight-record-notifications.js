'use strict';
const QUEUE_KEY='poker_app:cooler_flight:record_notifications:v1';
const GAME_URL='https://t.me/Poker_dvatuza_bot/DvaTuza?startapp=cooler_flight';
const escape=value=>String(value||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function text(record){
  return `🏆 Новый рекорд в Кулершане!\n\n${escape(record.name)} — <b>${Number(record.score)} очков</b>.\n\nПриз за лучший результат: ${escape(record.prize)}.\nРекорд нужно удержать до <b>17:00 МСК ${escape(record.date.split('-').reverse().join('.'))}</b>.\n\nСможешь побить рекорд? Запускай игру 👇`;
}
async function flush(commands, dependencies={}){
  const queueKey=dependencies.queueKey||QUEUE_KEY;
  const target=dependencies.eventChatId||require('./telegram-group-policy').eventChatId;
  const send=dependencies.send||require('./telegram-bot-send').sendTelegramMessage;
  const token=dependencies.token||process.env.TELEGRAM_BOT_TOKEN||process.env.TELEGRAM_TOKEN||process.env.BOT_TOKEN;
  if(!token)return;
  const chatId=await target();if(!chatId)return;
  const [raw]=await commands([['HGETALL',queueKey]]);
  const entries=Array.isArray(raw)?Array.from({length:raw.length/2},(_,i)=>[raw[i*2],raw[i*2+1]]):Object.entries(raw||{});
  for(const [id,value] of entries.slice(0,20)){
    const lock=queueKey+':lock:'+id;
    const [acquired]=await commands([['SET',lock,'sending','NX','EX',300]]);
    if(!acquired)continue;
    try{
      const [pending]=await commands([['HGET',queueKey,id]]);
      if(!pending)continue;
      const record=JSON.parse(pending);
      const result=await send(token,{chatId,notificationScope:dependencies.notificationScope||'cooler-record',parseMode:'HTML',text:(dependencies.text||text)(record),buttonText:'Играть в Кулершан',buttonUrl:GAME_URL});
      if(!result?.ok)throw new Error(result?.hint||'Telegram send failed');
      await commands([['HDEL',queueKey,id]]);
    }finally{await commands([['DEL',lock]]);}
  }
}
module.exports={QUEUE_KEY,GAME_URL,text,flush};
