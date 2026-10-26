'use strict';
const {pipeline}=require('./redis');
let cached=null;
function snapshot(){if(cached&&Date.now()-cached.at<15000)return cached.promise;const promise=(async()=>{const rows=await pipeline([['GET','poker21:admin-deposits:v1']],{context:'tracking.deposits',throwOnError:true});if(!rows||rows[0]?.error||!rows[0]?.result)throw Error('deposit_ledger_unavailable');return JSON.parse(rows[0].result);})();cached={at:Date.now(),promise};promise.catch(()=>{if(cached?.promise===promise)cached=null;});return promise;}
function matchDeposits(state,pokerId,since=0){
 if(!pokerId)return {available:false,reason:'poker21_not_linked',deposits:[]};
 // Only owner-confirmed account links are accepted; never join people by nicknames.
 const {poker21Anchor}=require('./deposit-player-notifications'),deposits=[];
 function add(record,parts){if(!record.id||record.voidedAt||!(Number(record.amount)>0)||!Number.isFinite(Number(record.createdAt))||Number(record.createdAt)<since)return;let amount=0;for(const part of parts){const room=part.depositorRoom||part.room,id=part.depositorId||part.playerId;if(!room||!id)continue;if(poker21Anchor(state,{room,playerId:id})===String(pokerId))amount+=Number(part.amount)||0;}if(amount>0)deposits.push({id:record.id,at:new Date(record.createdAt).toISOString(),amount:amount/100,source:'payments'});}
 for(const entry of state.entries||[]){if(entry.deletedAt)continue;for(const payment of entry.payments||[]){if(payment.channelId==='exchip'||['owner','allfriends'].includes(payment.paymentSource))continue;add(payment,payment.allocations||[{depositorRoom:payment.depositorRoom,depositorId:payment.depositorId,amount:payment.amount}]);}}
 for(const row of state.channelOperations||[]){if(row.direction!=='income'||row.transferId||row.channelId==='transfer'||row.channelId==='bonuses')continue;add(row,row.allocations||[{room:row.room,playerId:row.playerId,amount:row.amount}]);}
 for(const row of state.tipCashouts||[])add(row,[{room:row.room,playerId:row.playerId,amount:row.amount}]);
 const unique=new Map(deposits.map(row=>[row.id,row]));return {available:true,deposits:[...unique.values()]};
}
async function readDeposits(pokerId,since){if(!pokerId)return {available:false,reason:'poker21_not_linked',deposits:[]};try{return matchDeposits(await snapshot(),pokerId,since);}catch(_){return {available:false,reason:'ledger_unavailable',deposits:[]};}}
module.exports={matchDeposits,readDeposits};
