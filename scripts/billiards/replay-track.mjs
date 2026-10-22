import {action,shoot,step} from './engine.mjs';
const fields=['x','y','vx','vy','rollX','rollY','side','pocket'];
// Compact 30 Hz samples; render frames interpolate positions at the display rate.
function* calculate(playback){
 const state=structuredClone(playback.before),values=[],times=[];
 if(!(playback.move?action(state,state.turn,playback.move):shoot(state,playback.angle,playback.power)))throw Error('Invalid replay');
 const sample=t=>{times.push(t);for(const ball of state.balls)for(const key of fields)values.push(key==='pocket'?Number(!!ball.pocket):ball[key]||0);};
 let ticks=0;sample(0);
 while(state.moving&&ticks<7200){step(state);ticks++;if(ticks%4===0||!state.moving)sample(ticks/120*1000);if(ticks%12===0)yield;}
 if(state.moving)throw Error('Replay did not settle');
 return {times:new Float32Array(times),values:new Float32Array(values),ballCount:state.balls.length,durationMs:ticks/120*1000,final:state};
}
export function buildReplay(playback){const work=calculate(playback);let result;do{result=work.next();}while(!result.done);return result.value;}
export async function buildReplayAsync(playback){const work=calculate(playback);let result;do{result=work.next();if(!result.done)await new Promise(resolve=>setTimeout(resolve,0));}while(!result.done);return result.value;}
export function sampleReplay(track,elapsed,state){
 const t=Math.max(0,Math.min(elapsed,track.durationMs)),times=track.times;
 let lo=0,hi=times.length-1;while(lo+1<hi){const mid=(lo+hi)>>1;if(times[mid]<=t)lo=mid;else hi=mid;}
 const alpha=times[hi]===times[lo]?0:Math.max(0,Math.min(1,(t-times[lo])/(times[hi]-times[lo]))),stride=track.ballCount*fields.length;
 for(let i=0;i<track.ballCount;i++){const ball=state.balls[i],a=lo*stride+i*fields.length,b=hi*stride+i*fields.length;for(let j=0;j<fields.length;j++)ball[fields[j]]=j===7?!!track.values[(alpha>=1?b:a)+j]:track.values[a+j]+(track.values[b+j]-track.values[a+j])*alpha;}
 state.moving=t<track.durationMs;
}
