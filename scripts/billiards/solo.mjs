import {W,H,R,POCKETS,placeCue,radius,legalTargets as targetsForGame} from './engine.mjs';
import {tableSpec} from './table-geometry.mjs';
const group=id=>id===8?null:id<8?0:1;
function legalTargets(state){if(state.rulesVersion)return targetsForGame(state);const g=state.groups[state.turn],own=state.balls.filter(b=>b.id&&b.id!==8&&!b.pocket&&(g===null||group(b.id)===g));return own.length?own:state.balls.filter(b=>b.id===8&&!b.pocket);}
function clearPath(from,to,balls,ignore,ballR=R){const dx=to.x-from.x,dy=to.y-from.y,length=dx*dx+dy*dy;return !balls.some(b=>!b.pocket&&!ignore.includes(b.id)&&(()=>{const t=((b.x-from.x)*dx+(b.y-from.y)*dy)/length;if(t<=0||t>=1)return false;return Math.hypot(b.x-from.x-dx*t,b.y-from.y-dy*t)<ballR*2+1;})());}
export function botMove(state){
 if(state.moving||state.winner!==null)return null;
 if(state.pending){const d=state.pending;if(d.type==='pyramid-foul')return {type:'decision',choice:'play',ballId:state.balls.find(b=>!b.pocket).id};return {type:'decision',choice:d.illegal?'rerack-self':'accept'};}

 if(state.inHand){for(let x=180;x<W-30;x+=45)for(let y=H/2;y<H-25;y+=30){const copy=structuredClone(state);if(placeCue(copy,x,y))return {type:'place',x,y};}for(let x=30;x<W-25;x+=25)for(let y=30;y<H-25;y+=25){const copy=structuredClone(state);if(placeCue(copy,x,y))return {type:'place',x,y};}return null;}
 const cue=state.discipline==='pyramid'?(state.balls.find(b=>b.id===state.cueId&&!b.pocket)||state.balls.find(b=>!b.pocket)):state.balls[0];
 const ballR=state.rulesVersion?radius(state):R,local={...state,cueId:cue.id},targets=legalTargets(local);let best=null;
 for(const ball of targets)for(const [pocketIndex,[px,py]] of POCKETS.entries()){const distance=Math.hypot(px-ball.x,py-ball.y);if(distance<1)continue;const dx=(px-ball.x)/distance,dy=(py-ball.y)/distance,ghost={x:ball.x-dx*ballR*2,y:ball.y-dy*ballR*2};if(ghost.x<ballR||ghost.x>W-ballR||ghost.y<ballR||ghost.y>H-ballR)continue;
 const cueDistance=Math.hypot(ghost.x-cue.x,ghost.y-cue.y),alignment=((ghost.x-cue.x)*dx+(ghost.y-cue.y)*dy)/Math.max(1,cueDistance);if(alignment<.25||!clearPath(cue,ghost,state.balls,[cue.id,ball.id],ballR)||!clearPath(ball,{x:px,y:py},state.balls,[cue.id,ball.id],ballR))continue;
 const score=alignment*700-cueDistance*.25-distance*.4;if(best&&best.score>=score)continue;
 best={score,type:'shot',cueId:cue.id,callBall:ball.id,callPocket:pocketIndex,angle:Math.atan2(ghost.y-cue.y,ghost.x-cue.x),power:Math.max(.15,Math.min(.85,(Math.sqrt(2*.018*9810*1000/tableSpec(state).length*(cueDistance+distance/Math.max(.3,alignment)))/.714-180)/1250+.05))};}
 if(best){delete best.score;return best;}
 const target=targets.slice().sort((a,b)=>Math.hypot(a.x-cue.x,a.y-cue.y)-Math.hypot(b.x-cue.x,b.y-cue.y))[0];return target?{type:'shot',cueId:cue.id,callBall:target.id,callPocket:0,angle:Math.atan2(target.y-cue.y,target.x-cue.x),power:.4}:null;
}
