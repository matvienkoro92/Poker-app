import {backgammonAfterSteps,checkerCount,progress,turnSequences,unsportingActions} from './backgammon.mjs';

function sideScore(state,player){
 const sign=player===0?1:-1;
 if(state.off[player]===checkerCount(state))return 10000;
 const points=Array(24).fill(0);
 for(let i=0;i<24;i++)points[progress(state,player,i)]=state.points[i]*sign;

 let score=state.off[player]*29+Math.min(state.sixReserve[player],8)*5;
 let block=0,opponentBehind=false;
 for(let step=0;step<24;step++){
  const count=points[step];
  if(points[(step+12)%24]<0)opponentBehind=true;
  block=count>0?block+1:0;
  if(count<=0)continue;
  score+=step*count;
  if(step===0)continue;
  score-=Math.max(0,count-2)**2;
  if(step<18){
   let open=0;
   for(let die=1;die<=6;die++)if(points[step+die]>=0)open++;
   score+=open*.7;
   if(!open)score-=Math.min(3,count)*5;
  }
  if(opponentBehind)score+=Math.min(block,5);
 }
 return score;
}

const positionScore=(state,player)=>sideScore(state,player)-sideScore(state,1-player);

function bestSequence(state,player){
 let move=null,score=positionScore(state,player);
 for(const sequence of turnSequences(state)){
  if(!sequence.length)continue;
  const value=positionScore(backgammonAfterSteps(state,sequence),player);
  if(!move||value>score){
   move={type:'move',...sequence[0]};
   score=value;
  }
 }
 return {move,score};
}

export function strongUnsportingMove(state){
 const player=state.turn,options=unsportingActions(state);
 if(state.phase==='opening')return {type:'roll'};
 if(state.phase==='roll'){
  let move={type:'roll'},score=positionScore(state,player);
  for(const option of options){
   const reserve=[...state.sixReserve];
   reserve[player]-=option.count;
   const projected={...state,phase:'moving',trick:null,roll:[6,6],dice:Array(option.count).fill(6),sixReserve:reserve};
   const candidate=bestSequence(projected,player);
   if(candidate.move&&candidate.score>score){move=option;score=candidate.score;}
  }
  return move;
 }

 const best=bestSequence(state,player);
 if(state.trick==='stash'){
  const reserve=[...state.sixReserve];
  const dice=[...state.dice];
  while(dice.length){
   reserve[player]++;
   dice.pop();
   const saved=bestSequence({...state,sixReserve:reserve,dice},player);
   if(saved.score>best.score)return options[0];
  }
 }
 if(state.trick==='rewind'){
  const prior=state.previousTurn;
  const rewound={...state,points:prior.points,off:prior.off,sixReserve:prior.reserve};
  // Rewinding gives the opponent another roll and spends this turn.
  if(positionScore(rewound,player)-12>best.score)return options[0];
 }
 return best.move||options.find(option=>option.type!=='rewind-turn')||null;
}
