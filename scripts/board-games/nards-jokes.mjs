function animate(el,frames,timing){
 const animation=el.animate(frames,{fill:'none',...timing});
 return animation;
}
function marker(layer,kind,rect,text=''){
 const base=layer.getBoundingClientRect(),el=document.createElement('span');
 el.className='nards-board-joke nards-joke-'+kind;
 el.dataset.joke=kind;
 el.style.left=rect.left+rect.width/2-base.left+'px';
 el.style.top=rect.top+rect.height/2-base.top+'px';
 el.textContent=text;
 layer.append(el);
 return el;
}
function removeAfter(el,animation){
 animation.onfinish=animation.oncancel=()=>el.remove();
}

export function diceJoke(layer,dice,kind){
 if(dice.length!==2)return;
 const rects=dice.map(el=>el.getBoundingClientRect());
 if(rects.some(rect=>!rect.width))return;
 const centers=rects.map(rect=>[rect.left+rect.width/2,rect.top+rect.height/2]);
 const [x,y]=centers[0].map((coord,i)=>(coord+centers[1][i])/2);
 if(kind==='ones'){
  const spark=marker(layer,kind,{left:x,top:y,width:0,height:0},'✦');
  removeAfter(spark,animate(spark,[{opacity:0,scale:.4},{opacity:1,scale:1.2,offset:.6},{opacity:0,scale:1.55}],{duration:350,delay:330}));
 }
 dice.forEach((el,i)=>{
  const [cx,cy]=centers[i],dx=x-cx,dy=y-cy;
  const ratio=kind==='ones'?Math.max(.12,Math.min(.75,1-rects[i].width/(2*Math.hypot(dx,dy)))):.17;
  const move='translate('+dx*ratio+'px,'+(dy*ratio+(kind==='ones'?-7:0))+'px)';
  animate(el.parentElement,[{transform:'none'},{transform:move,offset:.45},{transform:kind==='ones'?'translateY(-5px)':'none',offset:.67},{transform:'none'}],
   {duration:kind==='ones'?740:670,delay:kind==='repeat'?i*135:0,easing:'ease-in-out',composite:'add'});
 });
 if(kind==='repeat'){
  const dots=marker(layer,kind,{left:x,top:y-23,width:0,height:0},'···');
  removeAfter(dots,animate(dots,[{opacity:0},{opacity:1,offset:.3},{opacity:1,offset:.72},{opacity:0}],{duration:940}));
 }
}

export function fenceJoke(layer,checker){
 const rect=checker?.getBoundingClientRect();
 if(!rect?.width)return;
 const peek=marker(layer,'fence',rect,'?');
 removeAfter(peek,animate(peek,[{opacity:0},{opacity:1,offset:.32},{opacity:1,offset:.65},{opacity:0}],{duration:970}));
 animate(checker,[{translate:'0 0'},{translate:'17px 0',rotate:'-12deg',offset:.45},{translate:'15px 0',rotate:'-8deg',offset:.65},{translate:'0 0'}],{duration:970,easing:'ease-in-out'});
}

export function customsJoke(layer,slot,source){
 const rect=slot?.getBoundingClientRect();
 if(!rect?.width)return;
 const stamp=marker(layer,'customs',{...rect,left:rect.left,top:rect.top,width:rect.width,height:rect.height},'ВЫПУЩЕНО');
 stamp.classList.toggle('nards-joke-right',rect.left>layer.getBoundingClientRect().left+layer.clientWidth/2);
 if(source?.rect.width){
  const disc=marker(layer,'customs-disc',source.rect);
  disc.classList.add('nards-effect-checker');
  disc.style.width=source.rect.width+'px';disc.style.height=source.rect.height+'px';
  disc.append(source.checker);
  const dx=rect.left+rect.width/2-source.rect.left-source.rect.width/2,dy=rect.top+rect.height/2-source.rect.top-source.rect.height/2;
  removeAfter(disc,animate(disc,[{transform:'none'},{transform:'translate('+dx*.82+'px,'+dy*.82+'px)',offset:.53},{transform:'translate('+dx*.82+'px,'+dy*.82+'px)',offset:.75},{transform:'translate('+dx+'px,'+dy+'px) scale(.48)',opacity:0}],{duration:840,easing:'ease-in-out'}));
 }
 removeAfter(stamp,animate(stamp,[{opacity:0,scale:1.45},{opacity:1,scale:1,offset:.2},{opacity:1,offset:.65},{opacity:0}],{duration:750,delay:480}));
}
