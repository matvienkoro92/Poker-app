'use strict';
// The immutable job is saved inside the event, in the same write as creation.
// Delivery receipts live separately so a worker never overwrites bets or results.
const crypto = require('crypto');
function createQueue({pipeline, subscriptions, now = Date.now}) {
 const prefix = 'poker_app:tournament_bet:creation_notice:';
 async function drain(token) {
  if (!token) return {processed:0, pending:0};
  const deadline=now()+8000;
  const rows=await pipeline([['GET','poker_app:tournament_bet:current'],['HVALS','poker_app:tournament_bet:personal_events']],{throwOnError:true});
  const events=[rows?.[0]?.result,...(rows?.[1]?.result||[])].filter(Boolean).map(raw=>JSON.parse(raw));
  let processed=0,pending=0;
  for(const state of events){
   if(now()>=deadline)break;
   const event=state.creationNotification;
   if(!event?.id)continue;
   const base=prefix+event.id, owner=crypto.randomUUID();
   const [done,retry]=await pipeline([['GET',base+':done'],['GET',base+':retry']],{throwOnError:true});
   if(done?.result||retry?.result)continue;
   const [lock]=await pipeline([['SET',base+':lock',owner,'NX','EX','120']],{throwOnError:true});
   if(lock?.result!=='OK')continue;
   try{
    // Do not announce an event cancelled or closed while waiting in the queue.
    const creationDate=new Date(Date.parse(event.createdAt)+3*3600000).toISOString().slice(0,10);
    const closed=!event.createdByPlayer&&now()>=Date.parse(creationDate+'T17:00:00Z');
    if(state.status!=='open'||closed||now()-Date.parse(event.createdAt)>86400000){
     await pipeline([['SET',base+':done','skipped','EX','7776000']],{throwOnError:true});continue;
    }
    async function deliver(recipient,send){
     if(now()>=deadline)throw Error('Notification batch paused');
     const key=base+':recipient:'+recipient;
     const [receipt]=await pipeline([['GET',key]],{throwOnError:true});
     if(receipt?.result)return {ok:true,sent:1};
     const result=await send();
     if(result.ok||result.sent===1||result.configured===false||result.hint==='user_blocked'){
      await pipeline([['SET',key,'sent','EX','7776000']],{throwOnError:true});
      return result;
     }
     if(result.retryAfter)await pipeline([['SET',base+':retry','wait','EX',String(Math.max(1,Math.ceil(result.retryAfter)))]],{throwOnError:true});
     throw Error('Notification delivery pending');
    }
    async function pendingRecipients(ids){
     if(!ids.length)return [];
     const [receipts]=await pipeline([['MGET',...ids.map(id=>base+':recipient:'+id)]],{throwOnError:true});
     if(!Array.isArray(receipts?.result))throw Error('Delivery receipts unavailable');
     return ids.filter((_id,index)=>!receipts.result[index]);
    }
    const options={deliver,pendingRecipients,timeoutMs:4000};
    if(event.createdByPlayer&&event.entries?.[0])await deliver('registration',()=>subscriptions.notifyRegistration(event,event.entries[0],Number(event.entries[0].stake||0),token,options));
    await subscriptions.notify(event,token,options);
    await pipeline([['SET',base+':done','sent','EX','7776000']],{throwOnError:true});processed++;
   }catch(error){pending++;console.error('[tournament-bet] queued notification',event.id,error.message);}
   finally{await pipeline([['EVAL',"if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) end return 0",1,base+':lock',owner]],{throwOnError:true});}
  }
  return {processed,pending};
 }
 return {drain};
}
module.exports={createQueue,drain:token=>createQueue({pipeline:require('./redis').pipeline,subscriptions:require('./tournament-bet-subscriptions')}).drain(token)};
