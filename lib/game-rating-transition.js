'use strict';
const rating=require('./game-rating-score'),{victoryBonus}=require('./game-rating-stakes');
// Compare the same leaderboard with and without this recorded result only.
function transition({rows,event,accountId,mode='free',stake}){
 const room=event?.room;if(!room?.playerProfiles?.some(p=>p?.accountId===accountId)||![0,1,'draw'].includes(room.state?.winner))return null;
 const before=rows.map(row=>({...row})),k=mode==='paid'?rating.stakeCoefficient(stake??room.gameXpStake):1;
 if(room.state.winner!=='draw')room.playerProfiles.slice(0,2).forEach((p,i)=>{const row=before.find(r=>r.id===p.accountId);if(!row)return;const win=room.state.winner===i,field=win?'wins':'losses',weighted=win?'weightedWins':'weightedLosses';row[field]=Math.max(0,row[field]-1);if(Number.isFinite(row[weighted]))row[weighted]=Math.max(0,row[weighted]-k*(win&&mode==='paid'?victoryBonus(room.state):1));});
 const oldRanking=rating.rankPlayers(before),newRanking=rating.rankPlayers(rows),previous=oldRanking.find(r=>r.id===accountId),current=newRanking.find(r=>r.id===accountId);
 const crossed=previous&&current&&current.rank<previous.rank?newRanking.filter(r=>r.id===accountId||r.rank>current.rank&&r.rank<=previous.rank).slice(0,6).map(r=>({self:r.id===accountId,name:r.name,beforeRank:oldRanking.find(old=>old.id===r.id)?.rank||r.rank,rank:r.rank})):[];
 return {before:{rank:previous?.rank||null,ratingScore:previous?.ratingScore||0},after:{rank:current?.rank||null,ratingScore:current?.ratingScore||0},total:newRanking.length,ladder:crossed};
}
module.exports={transition};
