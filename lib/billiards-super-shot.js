'use strict';
const crypto=require('node:crypto'),layouts=require('./billiards-super-shot-layout');
const PREFIX='poker_app:billiards:super-shot:v1:',ROOMS='poker_app:billiards:v1:';
const fail=(status,message)=>{throw Object.assign(Error(message),{status});};
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
function publicOffer(t){return {event:t.event,roomId:t.roomId,status:t.status,difficulty:t.difficulty,state:t.resultState||t.state,success:t.success===true,credited:t.credited===true,reward:t.reward||null};}
function create({commands,acquire,release,credit,now=Date.now,choose=()=>crypto.randomInt(8)}){
 async function offer({member,view}){
  if(!view?.ready||view.player!==view.state?.winner||![0,1].includes(view.state?.winner)||!(view.wager?.stake>=300)||!['playing','paid'].includes(view.wager.status))return null;
  const [raw]=await commands([['GET',ROOMS+view.roomId]]);if(!raw)return null;const room=JSON.parse(raw),winner=room.state?.winner;
  if(room.superShotVersion!==1||room.wagered!==true||!(room.gameXpStake>=300)||room.players?.[winner]!==member||![0,1].includes(winner)||![0,1].every(i=>room.gameXpActions?.[i]>0))return null;
  if(room.match?.target===3&&room.match.winner!==winner)return null;
  const accountId=room.playerProfiles?.[winner]?.accountId;if(!accountId)return null;
  const event=room.id+':'+(room.match?.number||1)+':'+(room.match?.target===3?1:room.match?.round),key=PREFIX+hash(event),[old]=await commands([['GET',key]]);
  if(old)return publicOffer(JSON.parse(old));
  const {state,difficulty}=await layouts.layout(choose()),ticket={event,roomId:room.id,member,accountId,state,difficulty,status:'ready',createdAt:now()};
  await commands([['SET',key,JSON.stringify(ticket),'NX','EX',2592000]]);
  const [saved]=await commands([['GET',key]]);if(!saved)throw Error('Bonus shot persistence failed');return publicOffer(JSON.parse(saved));
 }
 async function submit({member,body}){
  const event=String(body.event||'');if(!/^[A-HJ-NP-Z2-9]{10}:\d+:\d+$/.test(event)||event.split(':')[0]!==body.roomId)fail(400,'Неверная бонусная попытка.');
  const key=PREFIX+hash(event),lock=await acquire(key+':lock',30);if(!lock)fail(409,'Бонусный удар проверяется. Повторите запрос.');
  try{
   const [raw]=await commands([['GET',key]]);if(!raw)fail(404,'Бонусная попытка не найдена.');const t=JSON.parse(raw);
   if(t.member!==member)fail(403,'Бонусный удар доступен только победителю.');
   if(t.status==='ready'){
    const outcome=await layouts.simulate(t.state,body.angle,body.power,body.spin);
    Object.assign(t,{status:'finished',success:outcome.success,resultState:outcome.state,finishedAt:now()});
    // Persist the only shot before attempting any credit. Retries cannot reshoot.
    await commands([['SET',key,JSON.stringify(t),'XX','KEEPTTL']]);
   }
   if(t.success&&!t.credited){
    t.reward=await credit({userId:t.accountId,sourceId:t.event});
    t.credited=true;await commands([['SET',key,JSON.stringify(t),'XX','KEEPTTL']]);
   }
   return {ok:true,superShot:publicOffer(t)};
  }finally{await release(lock);}
 }
 return {offer,submit};
}
let live;
function runtime(){if(!live){const ledger=require('./bonus-ledger');live=create({commands:require('./billiards-service').commands,acquire:ledger.acquireRedisLock,release:ledger.releaseRedisLock,credit:require('./billiards-super-shot-prize')});}return live;}
module.exports={create,offer:input=>runtime().offer(input),submit:input=>runtime().submit(input)};
