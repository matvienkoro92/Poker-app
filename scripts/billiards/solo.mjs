import {W,H,R,POCKETS,placeCue} from './engine.mjs';
const group=id=>id===8?null:id<8?0:1;
function legalTargets(state){const g=state.groups[state.turn],own=state.balls.filter(b=>b.id&&b.id!==8&&!b.pocket&&(g===null||group(b.id)===g));return own.length?own:state.balls.filter(b=>b.id===8&&!b.pocket);}
function clearPath(from,to,balls,ignore){const dx=to.x-from.x,dy=to.y-from.y,length=dx*dx+dy*dy;return !balls.some(b=>!b.pocket&&!ignore.includes(b.id)&&(()=>{const t=((b.x-from.x)*dx+(b.y-from.y)*dy)/length;if(t<=0||t>=1)return false;return Math.hypot(b.x-from.x-dx*t,b.y-from.y-dy*t)<R*2+1;})());}
export function botMove(state){
 if(state.moving||state.winner!==null)return null;
 if(state.inHand){for(let x=180;x<W-30;x+=45)for(let y=H/2;y<H-25;y+=30){const copy=structuredClone(state);if(placeCue(copy,x,y))return {type:'place',x,y};}for(let x=30;x<W-25;x+=25)for(let y=30;y<H-25;y+=25){const copy=structuredClone(state);if(placeCue(copy,x,y))return {type:'place',x,y};}return null;}
 const cue=state.balls[0],targets=legalTargets(state);let best=null;
 for(const ball of targets)for(const [px,py] of POCKETS){const distance=Math.hypot(px-ball.x,py-ball.y);if(distance<1)continue;const dx=(px-ball.x)/distance,dy=(py-ball.y)/distance,ghost={x:ball.x-dx*R*2,y:ball.y-dy*R*2};if(ghost.x<R||ghost.x>W-R||ghost.y<R||ghost.y>H-R)continue;
 const cueDistance=Math.hypot(ghost.x-cue.x,ghost.y-cue.y),alignment=((ghost.x-cue.x)*dx+(ghost.y-cue.y)*dy)/Math.max(1,cueDistance);if(alignment<.25||!clearPath(cue,ghost,state.balls,[0,ball.id])||!clearPath(ball,{x:px,y:py},state.balls,[0,ball.id]))continue;
 const score=alignment*700-cueDistance*.25-distance*.4;if(best&&best.score>=score)continue;
 best={score,type:'shot',angle:Math.atan2(ghost.y-cue.y,ghost.x-cue.x),power:Math.max(.15,Math.min(.85,(Math.sqrt(270*(cueDistance+distance/Math.max(.3,alignment)))-180)/1250+.05))};}
 if(best)return {type:best.type,angle:best.angle,power:best.power};
 const target=targets.slice().sort((a,b)=>Math.hypot(a.x-cue.x,a.y-cue.y)-Math.hypot(b.x-cue.x,b.y-cue.y))[0];return target?{type:'shot',angle:Math.atan2(target.y-cue.y,target.x-cue.x),power:.4}:null;
}
