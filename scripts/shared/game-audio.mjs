import {unlockGameAudio,playGameAudio} from './game-audio-context.mjs';
import {getGameVolume,createVolumeGain,releaseVolumeGain} from './sound-settings.mjs';
// Unlock on a real gesture for iOS; all effects release the shared stream after playback.
export function createGameSound(url,{trimSilence=false,maxDuration=Infinity,volume=.75}={}){
 let context=null,buffer=null,loading=null,offset=0,disposed=false;const sources=new Set();
 function unlock(){if(disposed)return;try{context=unlockGameAudio();if(!context)return;if(!loading)loading=fetch(url).then(r=>{if(!r.ok)throw Error('audio');return r.arrayBuffer();}).then(b=>context.decodeAudioData(b)).then(b=>{buffer=b;if(trimSilence){const samples=b.getChannelData(0);let start=0;while(start<samples.length&&Math.abs(samples[start])<.01)start++;offset=Math.max(0,start/b.sampleRate-.005);}}).catch(()=>{loading=null;});}catch{}}
 document.addEventListener('pointerdown',unlock,{passive:true});document.addEventListener('keydown',unlock);
 function stop(){for(const source of sources){try{source.stop();}catch{}}}
 return {play(){if(disposed||!getGameVolume()||document.hidden)return;unlock();if(!context||context.state==='closed')return;const requested=performance.now();const start=()=>{if(disposed||!buffer||document.hidden||performance.now()-requested>400)return;playGameAudio(context,release=>{const source=context.createBufferSource(),gain=createVolumeGain(context,volume);source.buffer=buffer;source.connect(gain);gain.connect(context.destination);sources.add(source);source.onended=()=>{sources.delete(source);source.disconnect();releaseVolumeGain(gain);release();};if(trimSilence||Number.isFinite(maxDuration))source.start(0,offset,Math.min(maxDuration,buffer.duration-offset));else source.start();});};if(buffer)start();else loading?.then(start);},stop,dispose(){disposed=true;stop();document.removeEventListener('pointerdown',unlock,{passive:true});document.removeEventListener('keydown',unlock);}};
}
