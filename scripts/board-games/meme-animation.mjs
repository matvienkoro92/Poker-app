import {MEME_PIECES} from './meme-pieces.mjs';
import {createReactionMatte} from '../shared/reaction-matte.mjs';
import {getGameVolume} from '../shared/sound-settings.mjs';
// Only the moved piece decodes video. All other pieces remain cheap static posters.
export function mountMemeAnimation(board){
 const video=document.createElement('video');video.playsInline=true;video.preload='none';video.dataset.memeVideo='';video.style.cssText='position:fixed;width:1px;height:1px;opacity:0;pointer-events:none';document.body.append(video);
 const canvas=document.createElement('canvas');canvas.width=128;canvas.height=128;canvas.className='meme-piece-video';canvas.setAttribute('aria-hidden','true');
 const ctx=canvas.getContext('2d',{willReadFrequently:true}),matte=createReactionMatte(128,128);
 let previous=null,active=null,frame=0,timer=0,timeout=0,epoch=0,lastTime=-1,paintCount=0;
 function clear(){epoch++;if(frame)video.cancelVideoFrameCallback?.(frame);clearTimeout(timer);clearTimeout(timeout);frame=timer=timeout=0;video.pause();video.removeAttribute('src');video.load();active=null;canvas.remove();for(const el of board.querySelectorAll('.meme-animating'))el.classList.remove('meme-animating');}
 function attach(){if(!active)return;const cell=board.querySelector('[data-square="'+active.to+'"]');if(!cell?.querySelector('[data-meme="'+active.item.clip+'"]')){clear();return;}cell.classList.add('meme-animating');const piece=cell.querySelector('.meme-piece');if(canvas.parentElement!==piece)piece.insertBefore(canvas,piece.querySelector('.meme-piece__role'));}
 function schedule(token){if(!active||token!==epoch)return;if(video.requestVideoFrameCallback)frame=video.requestVideoFrameCallback(()=>draw(token));else timer=setTimeout(()=>draw(token),34);}
 function draw(token){if(!active||token!==epoch||document.hidden)return;
  if(video.readyState>=2&&lastTime!==video.currentTime){lastTime=video.currentTime;attach();if(!active)return;const bg=active.item.background;ctx.fillStyle='rgb('+bg+','+bg+','+bg+')';ctx.fillRect(0,0,128,128);const ratio=Math.min(128/video.videoWidth,128/video.videoHeight),w=video.videoWidth*ratio,h=video.videoHeight*ratio;ctx.drawImage(video,(128-w)/2,(128-h)/2,w,h);ctx.putImageData(matte(ctx.getImageData(0,0,128,128),bg),0,0);canvas.hidden=false;paintCount++;}
  schedule(token);
 }
 async function play(to,type){clear();const item=MEME_PIECES[type];if(!item)return;const token=epoch;active={to,item};lastTime=-1;canvas.hidden=true;attach();video.src='./assets/game-reactions/light-v1/'+item.clip+'.mp4';video.volume=getGameVolume();video.muted=video.volume===0;timeout=setTimeout(clear,item.duration+1800);try{await video.play();}catch{if(token!==epoch)return;video.muted=true;try{await video.play();}catch{if(token===epoch)clear();return;}}if(token===epoch)schedule(token);}
 video.onended=clear;video.onerror=()=>{if(active)clear();};
 function update(state,style){
  if(style!=='meme-reactions'||state?.discipline!=='chess'){clear();previous=null;return;}
  const key=state.initialFen+'|'+state.ply+'|'+JSON.stringify(state.lastMove);
  if(previous?.key===key){attach();return;}
  const prior=previous;previous={key,ply:state.ply};clear();
  if(!prior||state.ply<=prior.ply||!state.lastMove||document.hidden)return;
  const cell=board.querySelector('[data-square="'+state.lastMove.to+'"] [data-meme]');if(!cell)return;
  const type=Object.keys(MEME_PIECES).find(type=>MEME_PIECES[type].clip===cell.dataset.meme);play(state.lastMove.to,type);
 }
 const visibility=()=>{if(document.hidden)clear();};document.addEventListener('visibilitychange',visibility);
 return {update,reset(){clear();previous=null;},inspect:()=>({active:!!active,paintCount}),dispose(){clear();document.removeEventListener('visibilitychange',visibility);video.remove();}};
}
