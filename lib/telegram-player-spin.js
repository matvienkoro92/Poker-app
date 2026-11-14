'use strict';
const redis=require('./redis');
function isCommand(update){const m=update?.message;return m?.chat?.type==='private'&&Number.isSafeInteger(m.from?.id)&&!m.from.is_bot&&String(m.chat.id)===String(m.from.id)&&/^\/(?:крутка|spin)(?:@Poker_dvatuza_bot)?$/i.test(String(m.text||'').trim());}
const money=n=>Number(n).toLocaleString('ru-RU',{maximumFractionDigits:2})+' ₽';
function format(status,totals){
 const p=status.payload,lines=['🎰 Ваши крутки',''];
 if(status.unavailable)lines.push('⛔ '+status.unavailable);
 else if(p.canPlay)lines.push('✅ Крутка доступна! Попыток: '+p.attemptsLeft+'.');
 else{const minutes=Math.max(1,Math.ceil(Number(p.secondsUntilNextAttempt||0)/60));lines.push('⏳ До следующей крутки: '+Math.floor(minutes/60)+' ч '+minutes%60+' мин.');}
 if(!totals)return lines.concat('','📊 История круток временно недоступна. Повторите команду чуть позже.').join('\n');
 lines.push('','🔄 Всего круток: '+totals.count,'💰 Выиграно всего: '+money(Number(totals.ticket)+Number(totals.bonus)),'🎟 Билетами: '+money(totals.ticket),'💵 Бонусами: '+money(totals.bonus));
 const names=require('./daily-poker').HAND_NAMES;
 const hands=Object.entries(totals).filter(([k,v])=>k.startsWith('hand:')&&Number(v)>0).sort((a,b)=>Number(b[1])-Number(a[1]));
 if(hands.length)lines.push('','🃏 Что выпадало:',...hands.map(([k,v])=>(names[k.slice(5)]||'Другая комбинация')+': '+v));
 lines.push('','📱 Для крутки откройте раздел «Раздача дня» в приложении.');
 return lines.join('\n');
}
async function handle(update,token){
 if(!token||!isCommand(update)||!Number.isSafeInteger(update.message.message_id))return false;
 const m=update.message,key='poker_app:telegram:spin:'+m.from.id+':'+m.message_id,nonce=require('node:crypto').randomUUID();
 const run=async cmds=>{const rows=await redis.pipeline(cmds,{throwOnError:true,context:'telegram.player-spin'});if(!rows||rows.some(r=>r.error))throw Error('Spin storage unavailable');return rows.map(r=>r.result);};
 const [done]=await run([['GET',key]]);if(done)return true;
 const [claim]=await run([['SET',key+':lock',nonce,'NX','EX',60]]);if(claim!=='OK')throw Error('Spin reply busy');
 try{
  const [again,bound]=await run([['GET',key],['HGET','poker_app:visitor_dt_ids','tg_'+m.from.id]]);if(again)return true;
  const account=await require('./account-canonical').canonicalAccountId(bound||'');
  let text;
  if(!/^ID\d{6}$/.test(account))text='Привяжите свой ID Poker21 в клубном приложении.';
  else{
   const [p21]=await run([['HGET','poker_app:pokerplus_user_ids',account]]);
   if(!p21)text='Привяжите свой ID Poker21 в клубном приложении.';
   else{
    const [status,primary]=await Promise.all([require('./api-handlers/promo').telegramSpinStatus(account,m.from,p21),require('./daily-poker-player-totals').read(account,redis.pipeline).catch(()=>null)]);
    const aliases=await Promise.all(status.accounts.filter(id=>id!==account).map(async id=>({id,canonical:await require('./account-canonical').canonicalAccountId(id)})));
    const verified=aliases.filter(row=>row.canonical===account).map(row=>row.id);
    let totals=null;
    try{
     if(!primary)throw Error('Primary spin totals unavailable');
     const rows=[primary,...await Promise.all(verified.map(id=>require('./daily-poker-player-totals').read(id,redis.pipeline)))];
     totals={count:0,ticket:0,bonus:0};for(const row of rows)for(const [k,v]of Object.entries(row))if(k!=='ready')totals[k]=(totals[k]||0)+Number(v);
    }catch{console.warn('telegram-player-spin: totals temporarily unavailable');}
    text=format(status,totals);
   }
  }
  const response=await require('./telegram-group-policy').guardedFetch('https://api.telegram.org/bot'+token+'/sendMessage',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:m.from.id,text,reply_parameters:{message_id:m.message_id}}),signal:AbortSignal.timeout(10000)},'');
  const result=await response.json();if(!response.ok||!result.ok)throw Error('Spin reply failed');
  await run([['SET',key,'sent','EX',86400]]);return true;
 }finally{await run([['EVAL',"if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) end;return 0",1,key+':lock',nonce]]);}
}
module.exports={isCommand,handle,format};
