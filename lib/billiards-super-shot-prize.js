'use strict';
const crypto=require('node:crypto');
const PREFIX='poker_app:billiards:super-shot-prize:v1:';
// Each leg has its own durable receipt. Freeze the Poker21 recipient before the
// external call; retries after a rebind must reconcile the original order.
function create({commands,bound,pay,activity,acquire,release,write,trophy,now=Date.now}){
 return async function grant(input){
  const {userId,sourceId}=input,event=crypto.createHash('sha256').update(userId+':'+sourceId).digest('hex'),base=PREFIX+event;
  const [done]=await commands([['GET',base+':complete']]);if(done)return JSON.parse(done);
  let [recipient]=await commands([['GET',base+':recipient']]);
  if(!recipient){const id=await bound(userId);if(!/^\d+$/.test(id||''))throw Object.assign(Error('Привяжите счёт Покер21 и нажмите «Получить награду».'),{status:409});await commands([['SET',base+':recipient',id,'NX']]);[recipient]=await commands([['GET',base+':recipient']]);}
  const payment=await pay({userId:recipient,chips:300,idempotencyKey:'billiards:super-shot:'+event,reference:sourceId,requestedBy:'billiards-super-shot'});
  if(payment?.operation?.status!=='completed')throw Error('Начисление Покер21 ещё не подтверждено. Повторите получение награды.');
  const lock=await acquire(activity.lockKey(userId),12);if(!lock)throw Error('Крутки начисляются. Повторите получение награды.');
  try{
   const [spins]=await commands([['GET',base+':spins']]);
   if(!spins){const state=await activity.readState(userId);state.extraSpins+=5;await write([
    ['SET',activity.stateKey(userId),JSON.stringify(activity.normalizeState(state))],...activity.reportCommands(userId,state),['SET',base+':spins',String(now())]
   ],{locks:[lock],values:[{key:base+':spins',value:''}],context:'billiards-super-shot-spins'});}
  }finally{await release(lock);}
  const progress=await trophy(input),reward={...progress,cash:300,spins:5,poker21Id:recipient};
  await commands([['SET',base+':complete',JSON.stringify(reward),'NX']]);
  const [saved]=await commands([['GET',base+':complete']]);return JSON.parse(saved);
 };
}
let grant;
module.exports=input=>{if(!grant){const ledger=require('./bonus-ledger');grant=create({commands:require('./club-social').redis,bound:require('./pokerplus').readBoundPokerPlusUserId,pay:require('./api-handlers/pokerplus-chips').processDirectChange,activity:require('./review-activity'),acquire:ledger.acquireRedisLock,release:ledger.releaseRedisLock,write:require('./redis-atomic').atomicWrite,trophy:require('./billiards-super-shot-rewards').grant});}return grant(input);};
module.exports.create=create;module.exports.PREFIX=PREFIX;
