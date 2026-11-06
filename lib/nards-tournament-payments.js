'use strict';
// Persist the transfer identity before Poker21; retries reuse its receipt.
const {getJson,setJson}=require('./redis');
function createPayments(deps={}) {
 const read=deps.read||getJson,write=deps.write||setJson;
 const change=deps.change||require('./api-handlers/pokerplus-chips').processDirectChange;
 const player=deps.player||require('./pokerplus').getGroupMemberData;
 async function transfer({key,userId,amount,onProgress=async()=>{}}) {
  if(!userId)throw Object.assign(Error('Сначала привяжите аккаунт Poker21 в профиле.'),{status:403});
  const storageKey='poker_app:nards-transfer:'+key;
  let record=await read(storageKey,null,{throwOnError:true});
  if(record&&(record.userId!==userId||record.amount!==amount))throw Error('Tournament transfer mismatch');
  const save=async()=>{if(await write(storageKey,record,{throwOnError:true})===false)throw Error('Transfer storage unavailable');};
  if(!record){
   if(amount<0){const p=await player({userId});if(!Number.isFinite(Number(p.balance))||Number(p.balance)<-amount)throw Object.assign(Error('Недостаточно фишек на балансе Poker21.'),{status:409});}
   record={userId,amount,status:'pending'};await save();
  }
  if(record.status!=='paid'){
   const limit=require('./pokerplus-transfer-limit');
   for(let index=record.chunks||0,remaining=Math.abs(amount)-(record.chunks||0)*limit;remaining>0;index++){
    const chips=Math.sign(amount)*Math.min(remaining,limit);
    await onProgress();
    await change({userId,chips,idempotencyKey:'nards-tour:'+key+':'+index,reference:'nards-tournament',requestedBy:'nards-tournament'});
    record.chunks=index+1;await save();
    remaining-=Math.abs(chips);
   }
   record.status='paid';await save();
  }
 }
 async function pending({key,userId,amount,onProgress}) {
  const record=await read('poker_app:nards-transfer:'+key,null,{throwOnError:true});
  if(!record)return false;
  await transfer({key,userId,amount,onProgress});return true;
 }
 return {transfer,pending};
}
module.exports={createPayments};
