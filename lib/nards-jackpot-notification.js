'use strict';
const PREFIX='poker_app:nards-jackpot:notice:';
const queue=roomId=>PREFIX+'pending:'+roomId;
const clean=name=>String(name||'Игрок').replace(/[\u0000-\u001f\u007f-\u009f\u2028\u2029]/g,' ').replace(/\s+/g,' ').trim().slice(0,80);
// Saved in the same CAS as the ticket, so failed/stale rolls cannot announce wins.
function enqueue(room,award){
 const name=clean(room.playerProfiles[award.player]?.name);
 const mode=room.wagered||room.tournament?.entryType==='chips'?'на фишки':'бесплатная игра';
 const text=['🎰 ДЖЕКПОТ В НАРДАХ!','',name+' выбросил(а) '+award.face+':'+award.face+' три раза подряд!','🎟 Награда: билет на покерный турнир за 1000 ₽.',(room.state.discipline==='short'?'Короткие нарды':'Длинные нарды')+' · '+mode].join('\n');
 return [['SET',PREFIX+award.id,JSON.stringify({text}),'EX',2592000],['ZADD',queue(room.id),award.revision,award.id],['EXPIRE',queue(room.id),2592000]];
}
function create({commands,playersGroup,send}){
 return async function notify(roomId){
  if(!/^[A-HJ-NP-Z2-9]{10}$/.test(String(roomId||'')))return false;
  const [ids]=await commands([['ZRANGE',queue(roomId),0,2]]);
  if(!ids?.length)return false;
  const chat=await playersGroup();if(!/^-\d+$/.test(String(chat)))return false;
  let sent=false;
  for(const id of ids){
   const [raw]=await commands([['GET',PREFIX+id]]);
   if(!raw){await commands([['ZREM',queue(roomId),id]]);continue;}
   const claim=PREFIX+'sent:'+id;
   // At most one attempt on ambiguous network timeouts, matching game-result notices.
   const [claimed]=await commands([['SET',claim,'pending','NX','EX',2592000]]);
   if(!claimed)continue;
   let response,data;
   try{response=await send({chat_id:chat,text:JSON.parse(raw).text});data=await response.json();}
   catch(e){await commands([['ZREM',queue(roomId),id]]);throw e;}
   if(!response.ok||!data.ok){await commands([['DEL',claim]]);throw Error('Telegram rejected nards jackpot');}
   await commands([['SET',claim,String(data.result?.message_id||'sent'),'XX','KEEPTTL'],['ZREM',queue(roomId),id],['DEL',PREFIX+id]]);
   sent=true;
  }
  return sent;
 };
}
module.exports=async function({roomId,commands,token}){
 if(!token)return false;
 return create({commands,playersGroup:()=>require('./tracking-link-milestones').playersGroup(),send:payload=>require('./telegram-group-policy').guardedFetch('https://api.telegram.org/bot'+token+'/sendMessage',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(8000)},'nards-jackpot')})(roomId);
};
module.exports.enqueue=enqueue;
module.exports.create=create;
