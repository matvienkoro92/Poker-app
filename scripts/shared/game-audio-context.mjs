// All game effects share one device stream. Release the audio thread during silence.
let context=null,timer=null,active=0;
function idle(){clearTimeout(timer);if(!context||active)return;timer=setTimeout(()=>{if(!active&&context?.state==='running')context.suspend?.().catch(()=>{});},600);timer.unref?.();}
export function unlockGameAudio(){
 try{const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return null;if(!context||context.state==='closed')context=new Audio();if(context.state!=='running')context.resume().catch(()=>{});if(!context._gamePrimed&&context.createBuffer){const source=context.createBufferSource();source.buffer=context.createBuffer(1,1,context.sampleRate||44100);source.connect(context.destination);source.onended=()=>source.disconnect();source.start();context._gamePrimed=true;}idle();return context;}catch{return null;}
}
export function playGameAudio(audio,start){
 if(!audio||document.hidden)return;
 const run=()=>{if(document.hidden||audio.state!=='running')return;active++;clearTimeout(timer);let released=false;const release=()=>{if(released)return;released=true;active=Math.max(0,active-1);idle();};try{start(release);}catch{release();}};
 if(audio.state==='running')run();else if(audio.state!=='closed')audio.resume().then(run).catch(()=>{});
}
