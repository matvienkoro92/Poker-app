export function mountShotAudio(){
 let context=null,buffer=null,disposed=false,previous=null,source=null;
 // Small, cached asset; decoding never blocks a shot or its animation.
 try{const Audio=window.AudioContext||window.webkitAudioContext;if(Audio){context=new Audio();fetch('./assets/billiards-cue-hit.mp3').then(r=>{if(!r.ok)throw Error('audio');return r.arrayBuffer();}).then(data=>context.decodeAudioData(data)).then(decoded=>{if(!disposed)buffer=decoded;}).catch(()=>{});}}catch{}
 const unlock=()=>{if(context?.state==='suspended')context.resume().catch(()=>{});};
 document.addEventListener('pointerdown',unlock,true);document.addEventListener('keydown',unlock,true);
 function play(){if(!buffer||context?.state!=='running'||document.hidden)return;try{source?.stop();source=context.createBufferSource();source.buffer=buffer;const gain=context.createGain();gain.gain.value=.65;source.connect(gain);gain.connect(context.destination);source.onended=()=>{gain.disconnect();};const samples=buffer.getChannelData(0);let start=0;while(start<samples.length&&Math.abs(samples[start])<.01)start++;const offset=Math.max(0,start/buffer.sampleRate-.005);source.start(0,offset,Math.min(.95,buffer.duration-offset));}catch{}}
 return {observe(state,visible){if(previous&&visible&&state.moving&&(!previous.moving||previous.shot!==state.shot))play();previous={moving:state.moving,shot:state.shot};},reset(){previous=null;try{source?.stop();}catch{}},dispose(){disposed=true;document.removeEventListener('pointerdown',unlock,true);document.removeEventListener('keydown',unlock,true);try{source?.stop();context?.close().catch(()=>{});}catch{}}};
}
