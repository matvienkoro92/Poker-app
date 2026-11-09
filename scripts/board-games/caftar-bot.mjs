import {progress} from './backgammon.mjs';

// Long backgammon has no hits: one checker already blocks a point.
// Evaluate the whole legal turn, including the actual distance of 6:1 transfers.
export function caftarPositionScore(s, points, off, player) {
 const sign=player===0?1:-1, own=Array(24).fill(0), opponent=Array(24).fill(0);
 for(let i=0;i<24;i++){
  if(points[i]*sign>0)own[progress(s,player,i)]=points[i]*sign;
  if(points[i]*sign<0)opponent[progress(s,1-player,i)]=-points[i]*sign;
 }
 if(off>=15)return 100000;
 let score=off*30;
 const contact=own.some((n,p)=>n&&p<18);
 for(let p=0;p<24;p++){
  const n=own[p];if(!n)continue;
  score+=p*n;
  // Keep spare checkers playable instead of building tall, redundant stacks.
  if(p>0){score-=Math.max(0,n-2)**2*1.5;score+=2;}
  if(contact&&p>0&&p<18){
   let blocked=0;
   for(let die=1;die<=6;die++){
    const next=p+die;
    if(next<24&&opponent[(next+12)%24])blocked++;
   }
   score-=blocked*Math.min(n,3)*1.2;
  }
  if(!contact&&p>=18){
   // Cover different bear-off dice; excessive low-point stacks waste rolls.
   score+=3;
   score-=Math.max(0,n-3)*(p>=22?2:0.5);
  }
 }
 if(opponent[0]){
  // Opponent's direct transfers land at their 18 and 23 (our 6 and 11).
  for(const gate of [6,11])if(own[gate])score+=12+Math.min(6,opponent[0])*2;
 }
 // Connected blocks matter only while an opposing checker still has to pass.
 let run=0;
 for(let p=0;p<24;p++){
  const ownPoint=(p+12)%24;
  const behind=opponent.slice(0,p).some(Boolean);
  if(own[ownPoint]&&behind){run++;score+=Math.min(run,5)*2;}else run=0;
 }
 return score;
}

export function caftarBestMove(s,sequences){
 let best=null,bestScore=-Infinity;
 const sign=s.turn===0?1:-1;
 for(const sequence of sequences){
  if(!sequence.length)continue;
  const points=[...s.points];let off=s.off[s.turn];
  for(const move of sequence){points[move.from]-=sign;if(move.to===24)off++;else points[move.to]+=sign;}
  const score=caftarPositionScore(s,points,off,s.turn);
  if(score>bestScore){bestScore=score;best=sequence[0];}
 }
 return best?{type:'move',...best}:null;
}
