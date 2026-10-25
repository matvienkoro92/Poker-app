import {getGameVolume,createVolumeGain,releaseVolumeGain} from './sound-settings.mjs';
// Unlock on a real gesture for iOS; a failed audio load never affects a game move.
export function createGameSound(url){
 let context=null,buffer=null,loading=null;
 function unlock(){try{const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;if(!context)context=new Audio();if(context.state==='suspended')context.resume().catch(()=>{});if(!loading)loading=fetch(url).then(r=>{if(!r.ok)throw Error('audio');return r.arrayBuffer();}).then(b=>context.decodeAudioData(b)).then(b=>{buffer=b;}).catch(()=>{});}catch{}}
 document.addEventListener('pointerdown',unlock,{passive:true});document.addEventListener('keydown',unlock);
 return {play(){if(!getGameVolume()||document.hidden||!context||context.state!=='running')return;const requested=performance.now();const start=()=>{if(!buffer||document.hidden||context.state!=='running'||performance.now()-requested>400)return;try{const source=context.createBufferSource(),gain=createVolumeGain(context,.75);source.buffer=buffer;source.connect(gain);gain.connect(context.destination);source.onended=()=>{source.disconnect();releaseVolumeGain(gain);};source.start();}catch{}};if(buffer)start();else loading?.then(start);}};
}
