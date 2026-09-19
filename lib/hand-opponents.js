'use strict';
// Resolve the contest at the hero's exit, rather than everyone dealt into the hand.
module.exports=function contestedOpponents(replay,playerId){
 if(!Array.isArray(replay?.events))return [];
 const hero=String(playerId),folded=new Set(),voluntary=new Set(),live=new Set(),paid=new Set();
 let aggressor='',street=0,heroFoldTarget='',heroFolded=false;
 const foldedToHero=new Set(),contributions=new Map();
 let wager=0;
 for(const e of replay.events.slice().sort((a,b)=>a.sequence-b.sequence)){
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
 if(!voluntary.has(hero))return [];
 if(heroFolded)return heroFoldTarget&&heroFoldTarget!==hero?[heroFoldTarget]:[];
 return [...new Set([...live].filter(id=>id!==hero&&!folded.has(id)&&paid.has(id)).concat([...foldedToHero]))];
};
