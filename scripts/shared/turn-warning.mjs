import {unlockGameAudio,playGameAudio} from './game-audio-context.mjs';
import {getGameVolume} from './sound-settings.mjs';
export function vibrateTurnWarning(seconds){
 try{let host=window;try{if(window.parent&&window.parent!==window&&window.parent.location.origin===window.location.origin)host=window.parent;}catch{}
 const haptic=host.Telegram?.WebApp?.HapticFeedback;
 if(haptic?.impactOccurred){haptic.impactOccurred(seconds===1?'heavy':'medium');return;}
 globalThis.navigator?.vibrate?.(seconds===1?[60,50,60]:35);
 }catch{}
}
export function mountTurnWarning(element){
 let audio=null,turnKey='',heard=new Set(),vibrated=new Set();
 function unlock(){audio=unlockGameAudio();}
 document.addEventListener('pointerdown',unlock,true);document.addEventListener('keydown',unlock,true);
 function beep(seconds){if(!getGameVolume()||!audio||audio.state==='closed'||document.hidden)return;playGameAudio(audio,release=>{const tone=audio.createOscillator(),gain=audio.createGain(),at=audio.currentTime;tone.frequency.value=seconds===1?1100:880;gain.gain.setValueAtTime(0,at);gain.gain.linearRampToValueAtTime(.09*getGameVolume(),at+.008);gain.gain.exponentialRampToValueAtTime(.001,at+.085);tone.connect(gain);gain.connect(audio.destination);tone.onended=()=>{tone.disconnect();gain.disconnect();release();};tone.start(at);tone.stop(at+.09);});}
 return {update({seconds,active,sound,key}){
  const level=active&&seconds>0&&seconds<=20?(seconds<=10?'urgent':'warning'):'';
  if(element.dataset.timeWarning!==level)element.dataset.timeWarning=level;
  if(key!==turnKey){turnKey=key;heard=new Set();vibrated=new Set();}
  if(active&&sound&&!document.hidden&&(seconds===10||seconds>=1&&seconds<=5)&&!vibrated.has(seconds)){vibrated.add(seconds);vibrateTurnWarning(seconds);}
  if(active&&sound&&seconds>=1&&seconds<=10&&!document.hidden&&!heard.has(seconds)&&audio&&audio.state!=='closed'){heard.add(seconds);beep(seconds);}
 },dispose(){document.removeEventListener('pointerdown',unlock,true);document.removeEventListener('keydown',unlock,true);audio=null;}};
}
