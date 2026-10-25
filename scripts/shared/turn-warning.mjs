import {getGameVolume} from './sound-settings.mjs';
export function mountTurnWarning(element){
 let audio=null,turnKey='',heard=new Set();
 function unlock(){try{const Audio=window.AudioContext||window.webkitAudioContext;if(!audio&&Audio)audio=new Audio();if(audio?.state==='suspended')audio.resume().catch(()=>{});}catch{}}
 document.addEventListener('pointerdown',unlock,true);document.addEventListener('keydown',unlock,true);
 function beep(seconds){if(!getGameVolume()||audio?.state!=='running'||document.hidden)return;try{const tone=audio.createOscillator(),gain=audio.createGain(),at=audio.currentTime;tone.frequency.value=seconds===1?1100:880;gain.gain.setValueAtTime(0,at);gain.gain.linearRampToValueAtTime(.09*getGameVolume(),at+.008);gain.gain.exponentialRampToValueAtTime(.001,at+.085);tone.connect(gain);gain.connect(audio.destination);tone.onended=()=>{tone.disconnect();gain.disconnect();};tone.start(at);tone.stop(at+.09);}catch{}}
 return {update({seconds,active,sound,key}){
  const level=active&&seconds>0&&seconds<=20?(seconds<=10?'urgent':'warning'):'';
  if(element.dataset.timeWarning!==level)element.dataset.timeWarning=level;
  if(key!==turnKey){turnKey=key;heard=new Set();}
  if(active&&sound&&seconds>=1&&seconds<=10&&!document.hidden&&!heard.has(seconds)&&audio?.state==='running'){heard.add(seconds);beep(seconds);}
 },dispose(){document.removeEventListener('pointerdown',unlock,true);document.removeEventListener('keydown',unlock,true);audio?.close().catch(()=>{});}};
}
