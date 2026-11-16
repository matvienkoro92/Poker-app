'use strict';
const redis=require('./redis');
const {guardedFetch}=require('./telegram-group-policy');
const ROOMS={
 x:{name:'X-Poker',text:'<b>✅ X-poker</b>\nhttps://www.x-poker.net\n♦️ ID клуба 1786376 «Два туза X»\n➡️ Фриролл по средам\n➡️ Хорошая кэш игра от 100р вход\n<b>1 фишка = 100р</b>'},
 supr:{name:'Suprema Poker',text:'<b>✅ Suprema Poker</b>\nhttps://supremapoker.net\n♦️ ID клуба 19645 — Клуб Два туза\n➡️ Очень много кэш столов с бразильцами и турниров от 60 центов\n<b>1 фишка = 115р</b>'},
 pp:{name:'PPPoker',text:'<b>✅ PPpoker</b>\nhttps://pppoker.net\n♦️ ID клуба 1004444 — «Два туза. Доллары»\n<b>1 фишка = 115р</b>'},
 p21:{name:'Покер21про',text:'<b>✅ Покер21про</b>\nhttp://www.poker21.plus\n♦️ ID клуба 758417\n✅ Дурак (переводной, подкидной) на 2 и на 6 человек\n✅ 21\n✅ Сека\n✅ Покер холдем и Омаха\n<b>Фишки в кассе в рублях 1 к 1</b>'}
};
function isCommand(update){const m=update?.message;return m?.chat?.type==='private'&&/^(?:скачать|\/(?:скачать|download)(?:@Poker_dvatuza_bot)?)$/i.test(String(m.text||'').trim());}
function keyboard(){return [['x','supr'],['pp','p21']].map(row=>row.map(key=>({text:ROOMS[key].name,callback_data:'club:download:'+key})));}
async function handle(update,token){
 const cb=update.callback_query,m=cb?.message||update.message,user=cb?.from||m?.from;
 const key=String(cb?.data||'').match(/^club:download:(x|supr|pp|p21)$/)?.[1];
 if(!token||!m||user?.is_bot||!Number.isSafeInteger(user?.id)||m.chat?.type!=='private'||String(m.chat.id)!==String(user.id)||(!key&&!isCommand(update)))return false;
 if(cb&&!m.from?.is_bot)return false;
 const api=async(method,body)=>{
  const r=await guardedFetch('https://api.telegram.org/bot'+token+'/'+method,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(10000)},'');
  const d=await r.json();if(method==='editMessageText'&&/message is not modified/i.test(d.description||''))return;
  if(!r.ok||!d.ok)throw Error('Download menu Telegram request failed');return d.result;
 };
 if(cb){
  await api('answerCallbackQuery',{callback_query_id:cb.id});
  await api('editMessageText',{chat_id:user.id,message_id:m.message_id,text:ROOMS[key].text,parse_mode:'HTML',link_preview_options:{is_disabled:true},reply_markup:{inline_keyboard:keyboard()}});return true;
 }
 const receipt='poker_app:telegram:download:'+user.id+':'+m.message_id,nonce=require('node:crypto').randomUUID();
 const run=async commands=>{const rows=await redis.pipeline(commands,{throwOnError:true,context:'telegram.download'});if(!rows||rows.length!==commands.length||rows.some(r=>r.error))throw Error('Download menu storage unavailable');return rows.map(r=>r.result);};
 const [claim]=await run([['SET',receipt+':lock',nonce,'NX','EX',60]]);if(claim!=='OK')throw Error('Download menu busy');
 try{
  const [done]=await run([['GET',receipt]]);if(done)return true;
  await api('sendMessage',{chat_id:user.id,text:'Выберите приложение:',reply_markup:{inline_keyboard:keyboard()}});
  await run([['SET',receipt,'sent','EX',86400]]);return true;
 }finally{await run([['EVAL',"if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) end; return 0",1,receipt+':lock',nonce]]);}
}
module.exports={isCommand,handle,ROOMS};
