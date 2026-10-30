'use strict';

const PREFIX='poker_app:game-spin-reward:v1:';
// Use the same account lock as spinning and review rewards. The receipt and
// balance change commit together, including when Redis commits but its reply is lost.
function create({activity,read,acquire,release,write,now=Date.now}){
 return async function grant({namespace,wager}){
  if(!['billiards','board-games'].includes(namespace)||!Number.isSafeInteger(wager?.stake)||wager.stake<300)return;
  for(const player of wager.players){
   const accountId=player?.accountId;
   if(!accountId)throw Error('Game reward account unavailable');
   const receipt=PREFIX+namespace+':'+wager.id+':'+accountId;
   const lock=await acquire(activity.lockKey(accountId),12);
   if(!lock)throw Error('Game spin reward is busy; retry required');
   try{
    const [done]=await read([['GET',receipt]]);if(done)continue;
    const state=await activity.readState(accountId);
    state.extraSpins++;
    await write([
     ['SET',activity.stateKey(accountId),JSON.stringify(activity.normalizeState(state))],
     ...activity.reportCommands(accountId,state),
     ['SET',receipt,JSON.stringify({roomId:wager.id,stake:wager.stake,at:now()})]
    ],{locks:[lock],values:[{key:receipt,value:''}],context:'game-spin-reward'});
   }finally{await release(lock);}
  }
 };
}
let grant;
module.exports=async input=>{
 if(!grant){const ledger=require('./bonus-ledger');grant=create({activity:require('./review-activity'),read:require('./club-social').redis,
  acquire:ledger.acquireRedisLock,release:ledger.releaseRedisLock,write:require('./redis-atomic').atomicWrite});}
 return grant(input);
};
module.exports.create=create;
