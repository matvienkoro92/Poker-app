'use strict';
const REPAIR="if redis.call('GET',KEYS[1])~=ARGV[1] then return 0 end;redis.call('SET',KEYS[1],ARGV[2],'KEEPTTL');return 1";
function restoreNulls(room,now=Date.now()){
 if(!room?.state||!room.match)return false;
 let changed=false;const nullable=(obj,key)=>{if(obj[key]===undefined){obj[key]=null;changed=true;}};
 const state=room.state,missingWinner=state.winner===undefined;
 nullable(state,'winner');nullable(state,'endReason');nullable(room.match,'winner');nullable(room,'turnDeadline');
 if(['short','long','chess','darts'].includes(state.discipline)){nullable(state,'drawOffer');nullable(state,'lastMove');if(state.discipline!=='chess')nullable(state,'rollPlayer');}
 if(['pool8','pyramid'].includes(state.discipline)){for(const key of ['pending','firstHit','handZone'])nullable(state,key);state.groups=state.groups||[];for(let i=0;i<2;i++)nullable(state.groups,i);}
 for(const key of ['players','playerProfiles']){room[key]=room[key]||[];for(let i=0;i<2;i++)nullable(room[key],i);}
 if(room.connectionProtection)nullable(room.connectionProtection,'pause');
 // Games frozen by the missing winner field get a fresh turn, not an instant timeout.
 if(missingWinner&&room.players[1]){
  const milliseconds=state.discipline==='chess'&&room.timeControl
   ? Math.max(0,Number(room.clockRemaining?.[state.turn])||Number(room.timeControl.seconds||0)*1000)
   : Number(require('./nards-turn-clock')(state,room.turnSeconds)||0)*1000;
  room.turnDeadline=milliseconds>0?now+milliseconds:null;
  room.connectionProtection=null;
 }
 return changed;
}
async function load({key,commands,now=Date.now}){
 for(let attempt=0;attempt<3;attempt++){
  const [raw]=await commands([['GET',key]]);if(!raw)return null;
  const room=JSON.parse(raw);if(Number(room.expires)<now())return room;const changed=restoreNulls(room,now());
  if(changed){room.revision=(Number(room.revision)||0)+1;const [ok]=await commands([['EVAL',REPAIR,1,key,raw,JSON.stringify(room)]]);if(Number(ok)!==1)continue;}
  if(room.gameExperience?.granted&&!room.gameExperience.progress){const xp=require('./game-experience');const [receipt]=await commands([['HGET',xp.RECEIPTS,(key.includes(':billiards:')?'billiards':'board-games')+':'+room.gameExperience.event]]);if(receipt)room.gameExperience=JSON.parse(receipt);}
  return room;
 }
 throw Error('Room changed during recovery; retry required');
}
module.exports={load,restoreNulls,REPAIR};
