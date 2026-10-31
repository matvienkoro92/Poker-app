'use strict';
// Counters stay factual; only the score uses weighted results. Historical
// results without a recoverable stake retain their original weight of one.
const rating=require('./game-rating-score'),{object}=require('./game-rivalries');
function parse(raw){try{return typeof raw==='string'?JSON.parse(raw):raw;}catch{return null;}}
async function weightRows({commands,rows,sources,roomPrefix,mode='paid'}){
 const events=sources.flatMap(raw=>Object.values(object(raw)).map(parse)).filter(e=>e?.room?.playerProfiles&&[0,1,'draw'].includes(e.room.state?.winner));
 const eligible=events.filter(e=>mode==='all'||(e.room.wagered===true||e.mode==='paid'?'paid':'free')===mode);
 const missing=[...new Set(eligible.filter(e=>(e.room.wagered===true||e.mode==='paid')&&!(Number(e.room.gameXpStake)>0)).map(e=>e.room.id).filter(Boolean))];
 const stakes=new Map();
 for(let start=0;start<missing.length;start+=100){const ids=missing.slice(start,start+100),[raw]=await commands([['MGET',...ids.map(id=>roomPrefix+'wager:'+id)]]);ids.forEach((id,i)=>stakes.set(id,Number(parse(raw?.[i])?.stake)||0));}
 const byId=new Map(rows.map(row=>[row.id,{...row,weightedWins:row.wins,weightedLosses:row.losses,weightedDraws:row.draws}]));
 for(const event of eligible){const room=event.room,paid=room.wagered===true||event.mode==='paid';if(!paid)continue;
  const k=rating.stakeCoefficient(Number(room.gameXpStake)>0?room.gameXpStake:stakes.get(room.id));
  room.playerProfiles.forEach((p,i)=>{const row=byId.get(p?.accountId);if(!row||i>1)return;const field=room.state.winner==='draw'?'weightedDraws':room.state.winner===i?'weightedWins':'weightedLosses';row[field]+=k-1;});
 }
 return [...byId.values()];
}
module.exports={weightRows};
