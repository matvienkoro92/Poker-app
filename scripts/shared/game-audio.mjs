import {unlockGameAudio,playGameAudio} from './game-audio-context.mjs';
import {getGameVolume,createVolumeGain,releaseVolumeGain} from './sound-settings.mjs';
// Unlock on a real gesture for iOS; a failed audio load never affects a game move.
export function createGameSound(url){
 let context=null,buffer=null,loading=null;
 function unlock(){try{context=unlockGameAudio();if(!context)return;if(!loading)loading=fetch(url).then(r=>{if(!r.ok)throw Error('audio');return r.arrayBuffer();}).then(b=>context.decodeAudioData(b)).then(b=>{buffer=b;}).catch(()=>{});}catch{}}
 document.addEventListener('pointerdown',unlock,{passive:true});document.addEventListener('keydown',unlock);
 return {play(){if(!getGameVolume()||document.hidden||!context||context.state==='closed')return;const requested=performance.now();const start=()=>{if(!buffer||document.hidden||performance.now()-requested>400)return;playGameAudio(context,release=>{const source=context.createBufferSource(),gain=createVolumeGain(context,.75);source.buffer=buffer;source.connect(gain);gain.connect(context.destination);source.onended=()=>{source.disconnect();releaseVolumeGain(gain);release();};source.start();})};if(buffer)start();else loading?.then(start);}};
}
