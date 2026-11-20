import {diceJoke,fenceJoke,customsJoke} from './nards-jokes.mjs';
import {progress} from './backgammon.mjs';

const isNards=state=>['short','long'].includes(state?.discipline);
const pointFor=(board,index)=>board.querySelector('[data-point="'+index+'"]');
const barFor=(board,player)=>board.querySelector('.bar [data-color="'+(player===0?'white':'black')+'"]');
const lastChecker=point=>point?[...point.querySelectorAll('.checker')].at(-1):null;
const fullHome=(state,player)=>state.points.filter((value,index)=>value*(player===0?1:-1)>0&&progress(state,player,index)>=18).length===6;

export function createNardsBoardEffects(area,board,storage){
 const layer=document.createElement('div');
 layer.className='nards-board-effects';
 layer.setAttribute('aria-hidden','true');
 area.append(layer);
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 let before=null,room='',doubleKey='',lastJokeRoll=null;
 const blockedRolls=[0,0];
 const landings=new Set();
 function syncLandings(){
  const targets=new Set([...landings].map(find=>find()).filter(Boolean));
  for(const el of board.querySelectorAll('.nards-effect-arriving')){
   if(!targets.has(el))el.classList.remove('nards-effect-arriving');
  }
  for(const el of targets)el.classList.add('nards-effect-arriving');
 }
 function reset(){
  landings.clear();syncLandings();
  for(const animation of layer.getAnimations({subtree:true}))animation.cancel();
  layer.replaceChildren();
  before=null;room='';doubleKey='';lastJokeRoll=null;blockedRolls.fill(0);
 }
 function node(css){
  const el=document.createElement('span');
  el.className=css;layer.append(el);return el;
 }
 function play(el,frames,timing){
  const animation=el.animate(frames,{fill:'both',...timing});
  animation.onfinish=animation.oncancel=()=>el.remove();
 }
 function place(el,rect){
  const base=layer.getBoundingClientRect();
  Object.assign(el.style,{left:rect.left-base.left+'px',top:rect.top-base.top+'px',width:rect.width+'px',height:rect.height+'px'});
 }
 function glow(rect,css,delay=0){
  if(!rect?.width)return;
  const el=node('nards-effect-glow '+css);place(el,rect);
  play(el,[{opacity:0},{opacity:1,offset:.22},{opacity:0}],{duration:720,delay});
 }
 const styleProperties=['backgroundImage','backgroundColor','backgroundSize','backgroundPosition','backgroundRepeat','border','borderRadius','boxShadow','filter','--disc-rim','--disc-color'];
 function snapshot(checker){
  if(!checker)return null;
  const copy=checker.cloneNode(false),computed=getComputedStyle(checker);
  copy.classList.remove('nards-bar-checker','is-picked','is-movable','is-last','is-dragon-home');
  for(const property of styleProperties){
   if(property.startsWith('--'))copy.style.setProperty(property,computed.getPropertyValue(property));
   else copy.style[property]=computed[property];
  }
  return {checker:copy,rect:checker.getBoundingClientRect()};
 }
 function flight(source,findTarget,returning){
  const rect=findTarget()?.getBoundingClientRect();
  if(!source?.rect.width||!rect?.width)return;
  const el=node('nards-effect-checker');place(el,source.rect);el.append(source.checker);
  const dx=rect.left+(rect.width-source.rect.width)/2-source.rect.left;
  const dy=rect.top+(rect.height-source.rect.height)/2-source.rect.top;
  const scale=rect.width/source.rect.width;
  landings.add(findTarget);syncLandings();
  const animation=el.animate([{transform:'translate(0,0)'},
   {offset:.55,transform:'translate('+dx*.55+'px,'+(dy*.55-24)+'px) rotateY('+(returning?28:65)+'deg)'},
   {transform:'translate('+dx+'px,'+dy+'px) scale('+scale+')'}],
   {duration:returning?480:560,delay:returning?0:180,easing:'ease-in-out',fill:'both'});
  animation.onfinish=animation.oncancel=()=>{landings.delete(findTarget);syncLandings();el.remove();};
 }
 function capture(state,move){
  if(!isNards(state)||!before||!move||motion.matches||document.hidden)return null;
  const opponent=1-move.player;
  const hits=state.bar[opponent]>before.bar[opponent]
   ? (move.path?.length?move.path:[move]).map(step=>step.to).filter((index,j,all)=>all.indexOf(index)===j&&before.points[index]*(opponent===0?1:-1)>0)
   : [];
  const hit=hits.map(index=>snapshot(lastChecker(pointFor(board,index)))).filter(Boolean);
  const entry=move.from===-1?snapshot(barFor(board,move.player)?.querySelector('.nards-bar-checker')):null;
  const bearingOff=move.to===24?snapshot(lastChecker(pointFor(board,move.from))):null;
  return {hit,entry,bearingOff};
 }
 function paint(state,{context='',move=null,captured=null,rolling=false}={}){
  if(!isNards(state)){if(before)reset();return;}
  if(context!==room){reset();room=context;}
  const previous=before;
  before={points:state.points.slice(),bar:state.bar.slice(),off:state.off.slice(),winner:state.winner,closed:[fullHome(state,0),fullHome(state,1)]};
  if(landings.size)syncLandings();
  if(!previous)lastJokeRoll=state.rollCount;
  if(!previous||motion.matches||document.hidden)return;
  if(!rolling&&lastJokeRoll!==state.rollCount){
   lastJokeRoll=state.rollCount;
   const roll=state.rollHistory?.at(-1),roller=roll?.player;
   if(roll&&!roll.opening&&(roller===0||roller===1)){
    const blocked=state.bar[roller]>0&&state.message?.startsWith('Нет допустимых ходов');
    blockedRolls[roller]=blocked?blockedRolls[roller]+1:0;
    const [prior,earlier]=state.rollHistory.slice(0,-1).reverse().filter(item=>item.player===roller&&!item.opening);
    const pair=roll.dice[0]===roll.dice[1];
    const dice=[...area.querySelectorAll('.dice-cube')];
    if(blockedRolls[roller]===2)fenceJoke(layer,barFor(board,roller)?.querySelector('.checker'));
    else if(pair&&prior?.dice.every(value=>value===roll.dice[0])&&!earlier?.dice.every(value=>value===roll.dice[0])&&!state.jackpot)diceJoke(layer,dice,'repeat');
    else if(pair&&roll.dice[0]===1&&!state.jackpot)diceJoke(layer,dice,'ones');
   }
  }
  if(!rolling&&state.phase==='moving'&&state.roll?.length===2&&state.roll.every(value=>value===6)){
   const key=state.turn+':'+state.rollCount;
   if(doubleKey!==key){
    const dice=[...area.querySelectorAll('.dice-cube')].map(die=>die.getBoundingClientRect());
    if(dice.length){
     doubleKey=key;
     const size=Math.min(board.clientWidth*.34,138),left=dice.reduce((x,die)=>x+die.left+die.width/2,0)/dice.length-size/2;
     const top=dice.reduce((y,die)=>y+die.top+die.height/2,0)/dice.length-size/2;
     for(let i=0;i<4;i++){
      const ring=node('nards-effect-ripple');place(ring,{left,top,width:size,height:size});
      play(ring,[{scale:.38,opacity:0},{opacity:.9,offset:.17},{scale:1.7,opacity:0}],{duration:630,delay:i*125,easing:'ease-out'});
     }
    }
   }
  }
  if(!move)return;
  const player=move.player;
  const target=pointFor(board,move.to),targetChecker=lastChecker(target);
  for(const hit of captured?.hit||[]){
   glow(hit.rect,'nards-effect-hit',180);
   flight(hit,()=>barFor(board,1-player)?.querySelector('.nards-bar-checker'),false);
  }
  if(captured?.entry){
   flight(captured.entry,()=>lastChecker(pointFor(board,move.to)),true);
   glow(targetChecker?.getBoundingClientRect(),'nards-effect-hit',400);
  }
  if(!previous.closed[player]&&before.closed[player]){
   state.points.forEach((count,index)=>{
    const step=progress(state,player,index)-18;
    if(step>=0&&count*(player===0?1:-1)>0)glow(pointFor(board,index)?.getBoundingClientRect(),'nards-effect-home',step*92);
   });
  }
  if(state.off[player]>previous.off[player]){
   const tray=storage(player);
   const slots=[...tray.querySelectorAll('.nards-storage-slots i.is-filled,.nards-off-discs .checker')];
   const slot=slots.at(-1);
   if(previous.off[player]===0&&state.off[player]<15)customsJoke(layer,slot,captured?.bearingOff);
   if(state.off[player]===15&&previous.off[player]<15){
    glow(tray.querySelector('strong')?.getBoundingClientRect(),'nards-effect-tray',850);
    slots.forEach((slot,i)=>glow(slot.getBoundingClientRect(),'nards-effect-tray',850+i*33));
   }
  }
  if(previous.winner===null&&state.winner===player&&['mars','koks'].includes(state.winKind)){
   const koks=state.winKind==='koks',reveal=node('nards-victory-reveal');
   reveal.dataset.kind=state.winKind;
   const seal=document.createElement('div'),stamp=document.createElement('strong'),points=document.createElement('span');
   seal.className='nards-victory-seal';stamp.className='nards-effect-stamp';stamp.dataset.kind=state.winKind;
   stamp.textContent=koks?'КОКС':'МАРС';points.textContent=koks?'+3 ОЧКА':'+2 ОЧКА';
   seal.append(stamp,points);reveal.append(seal);
   for(let i=0;i<(koks?3:2);i++){const ring=document.createElement('i');ring.style.setProperty('--ripple',String(i));reveal.append(ring);}
   play(reveal,[{opacity:0},{opacity:1,offset:.13},{opacity:1,offset:.8},{opacity:0}],{duration:1390,delay:350,easing:'ease-out'});
  }
 }
 return {capture,paint,reset};
}
