(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.PokerHandInsights=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
function actions(replay,playerId){
 if(!Array.isArray(replay?.events)||!replay.events.length)return null;
 const events=replay.events.slice().sort((a,b)=>a.sequence-b.sequence);
 let street=0,folded=false,sawFlop=false,riverCall=false,threeBet=false,foldToRaise=false,raises=0,lastRaise=false,ambiguous=false,board=[];
 for(const e of events){
  if(e.board?.length){street=e.board.length;board=e.board.slice();lastRaise=false;if(street>=3&&!folded)sawFlop=true;continue;}
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
 return {betting:bettingStats(events,playerId),sawFlop,riverCall,threeBet:ambiguous&&!threeBet?null:threeBet,foldToRaise,board};
}
// null means no eligible decision or an ambiguous action sequence.
function bettingStats(events,playerId){
 const hero=String(playerId),decisions=new Set(['2','3','5','10','17','20']);
 const pre=[];const flop=[];let street=0;
 for(const e of events){if(e.board?.length){street=e.board.length;continue;}if(decisions.has(String(e.code)))(street===0?pre:street===3?flop:[]).push(e);}
 const mine=pre.filter(e=>String(e.actorId)===hero),result={vpip:mine.length?mine.some(e=>['2','3','5','20'].includes(String(e.code))):null,pfr:null,threeBet:null,foldThreeBet:null,cbet:null,foldCbet:null};
 // Export all-in codes do not distinguish a call, full raise or short raise.
 if(pre.some(e=>String(e.code)==='5'))return result;
 if(!mine.length)return result;
 result.pfr=mine.some(e=>String(e.code)==='3');
 let raises=0,opener=null,aggressor=null,folded=false;
 for(const e of pre){const code=String(e.code),isHero=String(e.actorId)===hero;
  if(isHero&&raises===1&&opener!==hero&&result.threeBet===null)result.threeBet=code==='3';
  if(isHero&&raises===2&&opener===hero&&result.foldThreeBet===null)result.foldThreeBet=code==='10';
  if(code==='3'){raises++;aggressor=String(e.actorId);if(raises===1)opener=aggressor;}
  if(isHero&&code==='10')folded=true;
 }
 if(folded||!aggressor)return result;
 let bet=false,cbettor=null,raised=false;
 for(const e of flop){const code=String(e.code),actor=String(e.actorId),isHero=actor===hero;
  if(code==='5')break;
  if(isHero&&actor===aggressor&&!bet&&result.cbet===null)result.cbet=['20','3'].includes(code);
  if(isHero&&cbettor&&cbettor!==hero&&!raised&&result.foldCbet===null)result.foldCbet=code==='10';
  if(['20','3'].includes(code)){if(!bet){bet=true;if(actor===aggressor)cbettor=actor;}else raised=true;}
 }
 return result;
}
function evDifference(h){
 if(h.ev?.status!=='calculated'||!Number.isFinite(h.ev.resultMinor)||!Number.isFinite(h.resultMinor)||!Number.isFinite(h.bigBlindMinor)||h.bigBlindMinor<=0)return null;
 return (h.resultMinor-h.ev.resultMinor)/h.bigBlindMinor;
}
function aceHighAtShowdown(hand,signal){
 if(hand.showdown!==true||!Array.isArray(hand.cards)||hand.cards.length!==2||!Array.isArray(signal?.board)||signal.board.length!==5)return false;
 const cards=hand.cards.concat(signal.board);
 if(cards.length!==7||new Set(cards).size!==7||cards.some(card=>typeof card!=='string'||!/^[AKQJT2-9][cdhs]$/.test(card)))return false;
 const values=cards.map(card=>'23456789TJQKA'.indexOf(card[0])+2),counts=new Map();
 values.forEach(value=>counts.set(value,(counts.get(value)||0)+1));
 if([...counts.values()].some(count=>count>1))return false;
 const unique=[...counts.keys()].sort((a,b)=>a-b),straightValues=unique.includes(14)?[1,...unique]:unique;
 for(let i=0;i<=straightValues.length-5;i++)if(straightValues[i+4]-straightValues[i]===4)return false;
 const suits=new Map();cards.forEach(card=>suits.set(card[1],(suits.get(card[1])||0)+1));
 if([...suits.values()].some(count=>count>=5))return false;
 return values.includes(14);
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
 const betting={};for(const key of ['vpip','pfr','threeBet','foldThreeBet','cbet','foldCbet']){const eligible=known.map(h=>signals[h.handId].betting?.[key]).filter(v=>typeof v==='boolean');betting[key]={count:eligible.filter(Boolean).length,total:eligible.length};}
 betting.wwsf={count:flop.filter(h=>h.resultMinor>0).length,total:flop.length};
 betting.wtsd={count:showdowns.length,total:eligible.length};
 return {betting,sessions:groups(sessions),limits:groups(limits),drawdown:{amount:max,startIndex,troughIndex,recovery,remaining:max?Math.max(0,cumulative[startIndex]-total):0},
 wins:hands.filter(h=>h.bb>0).sort((a,b)=>amount(b)-amount(a)).slice(0,5),losses:hands.filter(h=>h.bb<0).sort((a,b)=>amount(a)-amount(b)).slice(0,5),
 withoutShowdown:{...withoutShowdownStats,hands:withoutShowdown.slice().sort((a,b)=>Math.abs(amount(b))-Math.abs(amount(a)))},
 showdown:{loaded:known.length,total:hands.length,sawFlop:flop.length,eligible:eligible.length,count:showdowns.length,profitable:showdowns.filter(h=>h.resultMinor>0).length},
 collections:{aceHighShowdown:known.filter(h=>aceHighAtShowdown(h,signals[h.handId])),riverLoss:known.filter(h=>signals[h.handId].riverCall&&h.bb<0),threeBet:known.filter(h=>signals[h.handId].threeBet===true),foldRaise:known.filter(h=>signals[h.handId].foldToRaise),bigLoss:hands.filter(h=>h.bb < -30),
 evBelow:hands.filter(h=>evDifference(h)!==null&&evDifference(h)<=-10).sort((a,b)=>deviation(a)-deviation(b)),
 evAbove:hands.filter(h=>evDifference(h)!==null&&evDifference(h)>=10).sort((a,b)=>deviation(b)-deviation(a))}};
}
 function personalSummary(stats,totalHands,loadedHands){
  const total=Math.max(0,Number(totalHands)||0),loaded=Math.min(total,Math.max(0,Number(loadedHands)||0));
  const format=value=>new Intl.NumberFormat('ru-RU',{maximumFractionDigits:1}).format(value);
  const lines=[],vpip=stats?.betting?.vpip,pfr=stats?.betting?.pfr,showdown=stats?.showdown;
  if(vpip?.total>=20&&pfr?.total>=20){
   const vpipRate=vpip.count/vpip.total*100,pfrRate=pfr.count/pfr.total*100;
   let line='Префлоп: VPIP '+format(vpipRate)+'% ('+vpip.count+'/'+vpip.total+'), PFR '+format(pfrRate)+'% ('+pfr.count+'/'+pfr.total+').';
   if(vpip.total===pfr.total&&vpipRate-pfrRate>=8)line+=' Разница — '+format(vpipRate-pfrRate)+' п.п.';
   lines.push(line);
  }
  if(showdown?.eligible>=10){
   let line='После флопа дошли до вскрытия в '+showdown.count+' из '+showdown.eligible+' раздач.';
   if(showdown.count>=5)line+=' Результат в плюс — в '+showdown.profitable+' из '+showdown.count+' вскрытий.';
   lines.push(line);
  }
  const bigLosses=stats?.collections?.bigLoss?.length||0;
  if(bigLosses)lines.push('Раздач с потерей больше 30 bb: '+bigLosses+'. Они собраны в подборке для разбора.');
  if(!lines.length)lines.push('Пока мало подходящих раздач для наблюдений по решениям.');
  else if(loaded<20&&lines.length<3)lines.push('Истории действий пока мало для наблюдений по решениям.');
  return {coverage:'Выбрано '+total+' раздач · история действий: '+loaded+' / '+total+(loaded<total?' · показатели по действиям ещё могут измениться.':'.'),lines:lines.slice(0,3)};
 }
 return {actions,summarize,evDifference,aceHighAtShowdown,personalSummary};
});
