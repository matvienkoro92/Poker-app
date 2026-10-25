const KEY='p21-game-sound-volume';
const gains=new Map(),listeners=new Set();
let memoryVolume=1;
export function getGameVolume(){try{const raw=localStorage.getItem(KEY);if(raw===null)return memoryVolume;const n=Number(raw);return Number.isFinite(n)?Math.max(0,Math.min(1,n)):1;}catch{return memoryVolume;}}
function refresh(){const volume=getGameVolume();for(const [gain,base]of gains)gain.gain.value=base*volume;for(const fn of listeners)fn(volume);}
export function setGameVolume(value){const volume=Math.max(0,Math.min(1,Number(value)||0));memoryVolume=volume;try{localStorage.setItem(KEY,String(volume));}catch{}if(typeof window!=='undefined')window.dispatchEvent(new Event('p21-game-volume-change'));else refresh();}
export function createVolumeGain(context,base){const gain=context.createGain();gain.gain.value=base*getGameVolume();gains.set(gain,base);return gain;}
export function releaseVolumeGain(gain){gains.delete(gain);gain.disconnect();}
if(typeof window!=='undefined'){window.addEventListener('storage',event=>{if(event.key===KEY)refresh();});window.addEventListener('p21-game-volume-change',refresh);}
export function mountSoundSettings(containers){
 const dialog=document.createElement('dialog');dialog.setAttribute('aria-label','Громкость звуков');dialog.style.cssText='width:min(360px,calc(100% - 28px));padding:22px;border:1px solid #baa16a;border-radius:16px;background:#172d22;color:#f1e1ba;font:14px/1.5 system-ui;box-sizing:border-box';
 dialog.innerHTML='<div style="display:flex;align-items:center;justify-content:space-between;gap:12px"><strong style="font-size:18px">Звуки игры</strong><button type="button" data-sound-close aria-label="Закрыть настройки звука">✕</button></div><label style="display:block;margin-top:18px">Громкость <output style="float:right"></output><input aria-label="Громкость звуков игры" type="range" min="0" max="100" step="1" style="display:block;width:100%;min-height:36px;accent-color:#d5b976;margin:10px 0"></label><p style="font-size:12px;color:#b7c3b1">Общая для нард и бильярда. Настройка сохраняется на этом устройстве.</p><button type="button" data-sound-mute style="width:100%">Выключить звук</button>';
 document.body.append(dialog);const slider=dialog.querySelector('input'),output=dialog.querySelector('output'),mute=dialog.querySelector('[data-sound-mute]'),buttons=[];let previous=.75;
 const paint=volume=>{slider.value=Math.round(volume*100);output.value=Math.round(volume*100)+'%';mute.textContent=volume?'Выключить звук':'Включить звук';for(const button of buttons){button.textContent=volume?'Звук':'Без звука';button.setAttribute('aria-label','Настройки звука: '+Math.round(volume*100)+'%');}};
 slider.oninput=()=>setGameVolume(Number(slider.value)/100);mute.onclick=()=>{const v=getGameVolume();if(v)previous=v;setGameVolume(v?0:previous);};dialog.querySelector('[data-sound-close]').onclick=()=>dialog.close();
 for(const container of containers.filter(Boolean)){const button=document.createElement('button');button.type='button';button.dataset.soundSettings='';button.style.cssText='font-size:11px;white-space:nowrap';button.onclick=()=>{paint(getGameVolume());dialog.showModal();};container.append(button);buttons.push(button);}listeners.add(paint);paint(getGameVolume());return {open(){paint(getGameVolume());dialog.showModal();}};
}
