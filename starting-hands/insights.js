(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.PokerHandInsights=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
function actions(replay,playerId){
 if(!Array.isArray(replay?.events)||!replay.events.length)return null;
 const events=replay.events.slice().sort((a,b)=>a.sequence-b.sequence);
 let street=0,folded=false,sawFlop=false,riverCall=false,threeBet=false,foldToRaise=false,raises=0,lastRaise=false,ambiguous=false;
 for(const e of events){
  if(e.board?.length){street=e.board.length;lastRaise=false;if(street>=3&&!folded)sawFlop=true;continue;}
  const hero=String(e.actorId)===String(playerId),code=String(e.code);
  if(code==='5'&&street===0)ambiguous=true; // Cannot classify an all-in as a raise from its code alone.
  if(code==='3'){
   if(street===0){raises++;if(hero&&raises===2&&!ambiguous)threeBet=true;}
   lastRaise=true;
  }
  if(hero){
   if(code==='10'){folded=true;if(lastRaise)foldToRaise=true;}
   if(code==='2'&&street===5)riverCall=true;
   if(['2','3','5','17','20'].includes(code))lastRaise=false;
  }
 }
 return {sawFlop,riverCall,threeBet:ambiguous&&!threeBet?null:threeBet,foldToRaise};
}
function evDifference(h){
 if(h.ev?.status!=='calculated'||!Number.isFinite(h.ev.resultMinor)||!Number.isFinite(h.resultMinor)||!Number.isFinite(h.bigBlindMinor)||h.bigBlindMinor<=0)return null;
 return (h.resultMinor-h.ev.resultMinor)/h.bigBlindMinor;
}
function summarize(hands,signals={},metric='bb'){
 const amount=h=>metric==='resultMinor'?h.resultMinor/100:h.bb;
 const deviation=h=>metric==='resultMinor'?(h.resultMinor-h.ev.resultMinor)/100:evDifference(h);
 const ordered=hands.slice().sort((a,b)=>a.playedAt.localeCompare(b.playedAt)||a.handId.localeCompare(b.handId));
 const sessions=new Map(),limits=new Map();let total=0,peak=0,peakIndex=0,max=0,troughIndex=0,startIndex=0;
 const cumulative=[0];
 ordered.forEach((h,i)=>{
  total+=h.bb;cumulative.push(total);
  if(total>peak){peak=total;peakIndex=i+1;}
  if(peak-total>max){max=peak-total;startIndex=peakIndex;troughIndex=i+1;}
  for(const [map,key] of [[sessions,h.sessionId],[limits,String(h.bigBlindMinor)]]){
   if(!map.has(key))map.set(key,{key,count:0,bb:0,resultMinor:0});const g=map.get(key);g.count++;g.bb+=h.bb;g.resultMinor+=h.resultMinor;
  }
 });
 let recovery=null;
 if(max>0)for(let i=troughIndex+1;i<cumulative.length;i++)if(cumulative[i]>=cumulative[startIndex]-1e-9){recovery=i;break;}
 const known=hands.filter(h=>signals[h.handId]);
 const flop=known.filter(h=>signals[h.handId].sawFlop),eligible=flop.filter(h=>typeof h.showdown==='boolean');
 const showdowns=eligible.filter(h=>h.showdown);
 const withoutShowdown=eligible.filter(h=>!h.showdown);
 const withoutShowdownStats={count:withoutShowdown.length,wins:withoutShowdown.filter(h=>h.resultMinor>0).length,losses:withoutShowdown.filter(h=>h.resultMinor<0).length,even:withoutShowdown.filter(h=>h.resultMinor===0).length,resultMinor:withoutShowdown.reduce((sum,h)=>sum+h.resultMinor,0),bb:withoutShowdown.reduce((sum,h)=>sum+h.bb,0)};
 for(const [key,positive] of [['won',true],['lost',false]]){
  const subset=withoutShowdown.filter(h=>positive?h.resultMinor>0:h.resultMinor<0);
  withoutShowdownStats[key]={resultMinor:subset.reduce((sum,h)=>sum+h.resultMinor,0),bb:subset.reduce((sum,h)=>sum+h.bb,0)};
 }
 withoutShowdownStats.bb100=withoutShowdown.length?withoutShowdownStats.bb*100/withoutShowdown.length:0;
 const groups=map=>[...map.values()].map(g=>({...g,bb100:g.bb*100/g.count}));
 return {sessions:groups(sessions),limits:groups(limits),drawdown:{amount:max,startIndex,troughIndex,recovery,remaining:max?Math.max(0,cumulative[startIndex]-total):0},
 wins:hands.filter(h=>h.bb>0).sort((a,b)=>amount(b)-amount(a)).slice(0,5),losses:hands.filter(h=>h.bb<0).sort((a,b)=>amount(a)-amount(b)).slice(0,5),
 withoutShowdown:{...withoutShowdownStats,hands:withoutShowdown.slice().sort((a,b)=>Math.abs(amount(b))-Math.abs(amount(a)))},
 showdown:{loaded:known.length,total:hands.length,sawFlop:flop.length,eligible:eligible.length,count:showdowns.length,profitable:showdowns.filter(h=>h.resultMinor>0).length},
 collections:{riverLoss:known.filter(h=>signals[h.handId].riverCall&&h.bb<0),threeBet:known.filter(h=>signals[h.handId].threeBet===true),foldRaise:known.filter(h=>signals[h.handId].foldToRaise),bigLoss:hands.filter(h=>h.bb < -30),
 evBelow:hands.filter(h=>evDifference(h)!==null&&evDifference(h)<=-10).sort((a,b)=>deviation(a)-deviation(b)),
 evAbove:hands.filter(h=>evDifference(h)!==null&&evDifference(h)>=10).sort((a,b)=>deviation(b)-deviation(a))}};
}
return {actions,summarize,evDifference};
});
