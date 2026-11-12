'use strict';

// Count only real, accepted throws by this player in the current game.
function record(room, before, player) {
 const s=room.state;
 if(!['short','long'].includes(s.discipline)||before.phase==='opening'||s.rollCount!==before.rollCount+1)return;
 const rolls=s.rollHistory.filter(row=>row.player===player&&!row.opening);
 const last=rolls.at(-1),face=last?.dice?.[0];
 if(!last||last.dice[1]!==face)return;
 let count=0;
 for(let i=rolls.length-1;i>=0;i--){if(rolls[i].dice[0]!==face||rolls[i].dice[1]!==face)break;count++;}
 if(count%3!==0)return;
 const id=['nards_jackpot',room.id,room.match.number,room.match.round,player,s.rollCount].join('_');
 s.jackpot={id,player,face,rollCount:s.rollCount,revision:room.revision+1,amount:1000,
  title:'Джекпот — три одинаковых куша подряд'};
}

async function prepare(room,dependencies={}) {
 const award=room.state?.jackpot;
 if(!award||award.amount!==1000||award.revision!==room.revision)return null;
 const accountId=room.playerProfiles?.[award.player]?.accountId;
 if(!accountId||room.playerProfiles?.[1-award.player]?.accountId===accountId)return null;
 const ledger=dependencies.ledger||require('./bonus-ledger'),redis=dependencies.redis||require('./club-social').redis;
 const lock=await ledger.acquireRedisLock(ledger.BONUS_BALANCE_LOCK_PREFIX+accountId,15);
 if(!lock)throw Error('Jackpot reward is busy; retry required');
 try{
  const key='poker_app:daily_poker_ticket:'+award.id;
  const [done]=await redis([['GET',key]]);
  if(done){await ledger.releaseRedisLock(lock);return null;}
  const balance=await ledger.getBonusBalance(accountId),createdAt=new Date().toISOString();
  const entry=ledger.buildBonusLedgerEntry({id:'bonus_'+award.id,userId:accountId,amount:1000,direction:'credit',operationType:'promo_ticket',balanceBefore:balance,source:'nards_jackpot',sourceId:award.id,comment:'Билет на покерный турнир за 1000 ₽ · три одинаковых куша подряд',createdAt});
  const ticket={id:award.id,user_id:accountId,source:'nards_jackpot',source_id:room.id,amount:1000,title:'Билет на покерный турнир за 1000 ₽ · джекпот в нардах',status:'issued',created_at:createdAt};
  const notice=require('./nards-jackpot-notification');
  return {lock,commands:[...notice.enqueue(room,award),...ledger.bonusLedgerWriteCommands(entry),['SET',key,JSON.stringify(ticket)],['LPUSH','poker_app:daily_poker_tickets_user:'+accountId,award.id],['HINCRBY','poker_app:daily_poker_ticket_count',accountId,'1']]};
 }catch(e){await ledger.releaseRedisLock(lock);throw e;}
}
module.exports={record,prepare};
