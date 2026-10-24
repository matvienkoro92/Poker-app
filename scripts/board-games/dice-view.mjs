// Visual-only dice. Values always come from the accepted game state.
const spots={1:[5],2:[1,9],3:[1,5,9],4:[1,3,7,9],5:[1,3,5,7,9],6:[1,3,4,6,7,9]};
export const DICE_DURATION=1180;
export function diceFaces(top){const front=[1,2,3,4,5,6].find(n=>n!==top&&n!==7-top),right=[1,2,3,4,5,6].find(n=>![top,7-top,front,7-front].includes(n));return {top,bottom:7-top,front,back:7-front,right,left:7-right};}
function face(name,value){const el=document.createElement('span');el.className='cube-face cube-face--'+name;el.dataset.value=value;for(const pos of spots[value]){const dot=document.createElement('i');dot.style.gridArea=Math.ceil(pos/3)+' / '+((pos-1)%3+1);el.append(dot);}return el;}
export function createDiceView(container,onSettled){
 const layer=document.createElement('div');layer.className='board-dice-stage';layer.hidden=true;layer.setAttribute('aria-label','Кости на доске');container.append(layer);
 let lastWidth=0,lastFlipped=null,lastScale=1;let key='',context='',initialized=false,rolling=false,epoch=0,timer=0,animations=[],dice=[];
 function cancel(){epoch++;clearTimeout(timer);for(const a of animations)a.cancel();animations=[];rolling=false;layer.classList.remove('is-rolling');}
 function reset(){cancel();lastFlipped=null;key='';context='';initialized=false;dice=[];layer.replaceChildren();layer.hidden=true;}
 function settle(notify=true){if(!rolling)return;cancel();if(notify)onSettled();}
 function update(state,options={}){
  if(!state||state.discipline==='chess'){reset();return false;}
  if(options.context!==context){reset();context=options.context;}
  if(state.roll.length!==2){cancel();key='';layer.replaceChildren();layer.hidden=true;initialized=true;return false;}
  const next=context+':'+(state.rollCount??(state.ply+':'+state.roll.join()));
  const scale=options.size==='small'?.72:1,flipped=options.flipped===true,resized=next===key&&(Math.abs(container.getBoundingClientRect().width-lastWidth)>1||lastFlipped!==flipped||lastScale!==scale);if(next===key&&!resized){mark(state);if(state.winner!==null)settle(false);return false;}
  const animate=initialized&&!resized&&typeof layer.animate==='function'&&!document.hidden&&!matchMedia('(prefers-reduced-motion: reduce)').matches;
  cancel();key=next;initialized=true;layer.replaceChildren();layer.hidden=false;layer.dataset.rollKey=key;
  const box=container.getBoundingClientRect(),size=Math.max(20,Math.max(26,Math.min(46,box.width*.091))*scale),width=box.width,height=box.height;
  lastWidth=width;lastFlipped=flipped;lastScale=scale;const roller=[0,1].includes(state.rollPlayer)?state.rollPlayer:state.turn,right=(roller===0)!==flipped;layer.style.setProperty('--cube-size',size+'px');dice=[];
  state.roll.forEach((value,i)=>{
   const flight=document.createElement('div'),cube=document.createElement('div'),shadow=document.createElement('div');flight.className='dice-flight';cube.className='dice-cube'+(i?' dice-cube--amber':'');shadow.className='dice-ground-shadow';cube.dataset.value=value;cube.setAttribute('role','img');cube.setAttribute('aria-label','Кость '+(i+1)+': '+value);for(const [side,n]of Object.entries(diceFaces(value)))cube.append(face(side,n));flight.append(cube);layer.append(shadow,flight);dice.push(cube);
   const x=width*(right?(i?.80:.64):(i?.36:.20))-size/2,y=height*.5-size/2,twist=i?13:-12,rest='rotateX(-58deg) rotateY('+twist+'deg)';flight.style.transform='translate3d('+x+'px,'+y+'px,0)';cube.style.transform=rest;shadow.style.transform='translate('+x+'px,'+(y+size*.64)+'px) scale(1)';
   if(!animate)return;
   const startX=width*(right?1.08:-.14)+i*size*1.1,startY=height*.18,sign=i?1:-1;
   const frames=[
    {offset:0,x:startX,y:startY-100},
    {offset:.29,x:x+(right?1:-1)*width*.07,y:y-10},
    {offset:.46,x:x+sign*size*.52,y:y-size*1.35},
    {offset:.62,x:x+sign*size*.27,y:y+2},
    {offset:.76,x:x-sign*size*.1,y:y-size*.38},
    {offset:.87,x:x+sign*size*.06,y:y+1},
    {offset:1,x,y}
   ];
   const timing={duration:DICE_DURATION+i*95,easing:'linear',fill:'none'};
   animations.push(flight.animate(frames.map(f=>({offset:f.offset,transform:'translate3d('+f.x+'px,'+f.y+'px,0)',easing:f.offset===0?'cubic-bezier(.42,0,.8,.48)':f.offset===.29||f.offset===.62?'cubic-bezier(.16,.75,.4,1)':'cubic-bezier(.45,0,.8,.5)'})),timing));
   animations.push(cube.animate([
    {offset:0,transform:'rotateX(-610deg) rotateY('+(i?810:-720)+'deg) rotateZ('+(sign*190)+'deg)'},
    {offset:.29,transform:'rotateX(-280deg) rotateY('+(i?410:-310)+'deg) rotateZ('+(sign*80)+'deg)'},
    {offset:.62,transform:'rotateX(-125deg) rotateY(70deg) rotateZ('+(twist+sign*35)+'deg)'},
    {offset:.87,transform:'rotateX(-53deg) rotateY(15deg) rotateZ('+(twist-sign*4)+'deg)'},
    {offset:1,transform:rest}
   ],timing));
   animations.push(shadow.animate(frames.map((f,j)=>({offset:f.offset,transform:'translate('+f.x+'px,'+(y+size*.64)+'px) scale('+([.35,1,.64,1,.86,1,1][j])+')',opacity:[0,.4,.16,.4,.25,.4,.4][j],filter:'blur('+([12,2,8,2,4,2,2][j])+'px)'})),timing));
  });
  mark(state);
  if(animate){rolling=true;layer.classList.add('is-rolling');const token=epoch;timer=setTimeout(()=>{if(token===epoch)settle();},DICE_DURATION+115);}
  return animate;
 }
 function mark(state){const remaining=[...state.dice],double=state.roll[0]===state.roll[1];for(const cube of dice){const at=remaining.indexOf(Number(cube.dataset.value));cube.classList.toggle('is-spent',!rolling&&state.phase!=='opening'&&(double?state.dice.length===0:at<0));if(at>=0)remaining.splice(at,1);}}
 if(typeof ResizeObserver!=='undefined')new ResizeObserver(()=>{if(!rolling&&!layer.hidden&&Math.abs(container.getBoundingClientRect().width-lastWidth)>1)onSettled();}).observe(container);
 return {update,reset,settle,replay(){cancel();key='';initialized=true;},get busy(){return rolling;},element:layer};
}
