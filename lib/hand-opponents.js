'use strict';
// Resolve the contest at the hero's exit, rather than everyone dealt into the hand.
module.exports=function contestedOpponents(replay,playerId){
 if(!Array.isArray(replay?.events))return [];
 const ordered=replay.events.slice().sort((a,b)=>a.sequence-b.sequence);
 const hero=String(playerId),folded=new Set(),voluntary=new Set(),live=new Set(),paid=new Set();
 const decisionCodes=new Set(['1','2','3','4','5','10','17','20']);
 const actors=new Set(ordered.filter(e=>e.actorId&&String(e.actorId)!=='0'&&decisionCodes.has(String(e.code))).map(e=>String(e.actorId))),streetPlayers=new Map(),preFolded=new Set();
 for(const e of ordered){
  if(e.board?.length>=3)streetPlayers.set(e.board.length,new Set([...actors].filter(id=>!preFolded.has(id))));
  else if(String(e.code)==='10'&&e.actorId)preFolded.add(String(e.actorId));
 }
 const remaining=new Set([...actors].filter(id=>!preFolded.has(id))),shared=new Set();
 for(const id of actors){
  if(id===hero)continue;
  const reachedLater=[4,5].some(street=>streetPlayers.get(street)?.has(hero)&&streetPlayers.get(street)?.has(id));
  const survivedFromFlop=streetPlayers.get(3)?.has(hero)&&streetPlayers.get(3)?.has(id)&&remaining.has(hero)&&remaining.has(id);
  if(reachedLater||survivedFromFlop)shared.add(id);
 }
 let aggressor='',street=0,heroFoldTarget='',heroFolded=false;
 const foldedToHero=new Set(),contributions=new Map();
 let wager=0;
 for(const e of ordered){
  if(e.board?.length){street=e.board.length;aggressor='';contributions.clear();wager=0;foldedToHero.clear();continue;}
  const id=String(e.actorId||''),code=String(e.code);
  if(!id||id==='0'||!['1','2','3','4','5','10','17','20'].includes(code))continue;
  live.add(id);
  if(['2','3','5','20'].includes(code)){
   voluntary.add(id);paid.add(id);
   // A later bet/call against someone else supersedes earlier folded opponents.
   if(id===hero||id!==aggressor)foldedToHero.clear();
  }
  if(['1','2','3','4','5','20'].includes(code)){
   const total=(contributions.get(id)||0)+(Number(e.amount)||0);
   contributions.set(id,total);
   if(['3','20'].includes(code)||(code==='5'&&total>wager))aggressor=id;
   wager=Math.max(wager,total);
  }
  if(code==='10'){
   folded.add(id);
   if(id===hero){heroFoldTarget=aggressor;heroFolded=true;break;}
   if(aggressor===hero&&(voluntary.has(id)||street>0))foldedToHero.add(id);
  }
 }
 const direct=heroFolded?(heroFoldTarget&&heroFoldTarget!==hero?[heroFoldTarget]:[]):[...live].filter(id=>id!==hero&&!folded.has(id)&&paid.has(id)).concat([...foldedToHero]);
 return [...new Set([...shared,...(voluntary.has(hero)?direct:[])])];
};
