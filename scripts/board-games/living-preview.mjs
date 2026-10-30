import {createCarvedRail,createPointBlade,paintStorage} from './nards-carving.mjs';
import {NARDS_BOARDS,CHECKERS,BOARDS,PIECES,NARDS_INTERIORS} from './catalog.mjs';
import {createBackgammon} from './backgammon.mjs';
import {pieceSVG,pieceNames} from './pieces.mjs';

const readyImages=new Map();
export async function preload(game,equipment={}){
 if(game!=='chess')return;
 const board=BOARDS.find(b=>b.id===equipment.board)||BOARDS[0],style=PIECES.find(p=>p.id===equipment.pieces)||PIECES[0];
 const urls=new Set(board.image?[board.image]:[]);
 for(const color of ['w','b'])for(const type of ['p','r','n','b','q','k']){const href=pieceSVG(type,color,style.id).match(/href="([^"]+)"/);if(href)urls.add(href[1]);}
 await Promise.all([...urls].map(url=>{if(!readyImages.has(url)){const image=new Image();image.src=url;readyImages.set(url,image.decode().catch(()=>{readyImages.delete(url);}));}return readyImages.get(url);}));
}
export function paint(root,game,equipment={}){
  const chess=game==='chess';
  const board=(chess?BOARDS:NARDS_BOARDS).find(b=>b.id===(chess?equipment.board:equipment.nardsBoard))||(chess?BOARDS:NARDS_BOARDS)[0];
  const set=(chess?PIECES:CHECKERS).find(s=>s.id===(chess?equipment.pieces:equipment.checkers))||(chess?PIECES:CHECKERS)[0];
  const paintKey=[game,board.id,set.id,equipment.nardsInterior].join(':');
  if(root.dataset.paintKey===paintKey&&root.firstElementChild)return {board:board.name,pieces:set.name};
  root.dataset.board=board.id;for(const [key,value]of Object.entries({light:board.light,dark:board.dark,frame:board.frame}))root.style.setProperty('--nards-'+key,value);root.dataset.pieces=set.id;
  root.classList.toggle('living-top-board--chess',chess);
  root.setAttribute('aria-label',(chess?'Шахматы':'Нарды')+' · '+board.name+' · '+set.name+' · вид сверху');
  for(const [key,value]of Object.entries({light:board.light,dark:board.dark,frame:board.frame}))root.style.setProperty('--preview-'+key,value);
  root.style.setProperty('--preview-carving',board.cover?'url("'+board.cover+'")':'none');
  const surface=document.createElement('div');surface.className='living-preview-surface '+(chess?'living-preview-chess':'living-preview-nards');
  if(chess){
    if(board.image){surface.style.backgroundImage='url("'+board.image+'")';surface.dataset.collection='true';surface.style.setProperty('--preview-chess-inset',(board.frameSlice||6.25)+'%');}
    const grid=document.createElement('div');grid.className='living-preview-squares';
    const order=['r','n','b','q','k','b','n','r'];
    for(let row=0;row<8;row++)for(let col=0;col<8;col++){
      const square=document.createElement('span');square.className='living-preview-square'+((row+col)%2?' is-dark':'');
      const color=row<2?'b':'w',type=row===0||row===7?order[col]:row===1||row===6?'p':null;
      square.dataset.square=String.fromCharCode(97+col)+(8-row);
      if(type){square.innerHTML=pieceSVG(type,color,set.id);square.setAttribute('aria-label',(color==='w'?'Белая ':'Чёрная ')+pieceNames[type]);}
      grid.append(square);
    }
    surface.append(grid);
  }else{
    for(const side of ['white','black']){
      root.style.setProperty('--preview-'+side,set[side]);
      root.style.setProperty('--preview-'+side+'-art',set[side+'Art']?'url("'+set[side+'Art']+'")':'none');
    }
    const inside=NARDS_INTERIORS.find(b=>b.id===equipment.nardsInterior)||NARDS_INTERIORS[0];surface.style.backgroundImage='url("'+inside.surface+'")';surface.dataset.bakedPoints=String(inside.hidePoints===true||inside.revision>=2);surface.dataset.leftSurface=inside.leftSurface;surface.dataset.rightSurface=inside.rightSurface;for(const [key,value]of Object.entries({light:inside.light,dark:inside.dark}))root.style.setProperty('--preview-'+key,value);root.style.setProperty('--preview-accent',inside.accent);const state=createBackgammon('long');
    for(let row=0;row<2;row++)for(let col=0;col<12;col++){
      const index=row===0?11-col:12+col,n=state.points[index],point=document.createElement('span');
      point.className='living-preview-point'+(row?' is-bottom':'')+(col%2?' is-light':'');point.dataset.point=index;point.classList.toggle('has-stack',Math.abs(n)>1);point.style.setProperty('--stack-steps',Math.max(1,Math.abs(n)-1));
      point.style.gridColumn=col+1+(col>=6?1:0);point.style.gridRow=row+1;point.style.setProperty('--nards-tip-gap',[50.3,54.5,60.1,60.1,54.5,50.3][col%6]+'%');if(!(inside.hidePoints===true||inside.revision>=2)){const blade=createPointBlade();blade.className='living-preview-blade';point.append(blade);}
      for(let i=0;i<Math.abs(n);i++){const coin=document.createElement('i');coin.className='living-preview-checker'+(n<0?' is-black':'');coin.style.setProperty('--stack-index',i);coin.setAttribute('aria-label',n<0?'Чёрная фишка':'Белая фишка');point.append(coin);}
      surface.append(point);
    }
    const bar=document.createElement('span');bar.className='living-preview-bar';surface.append(bar);
  }
  if(!chess){
    const box=document.createElement('div'),base=document.createElement('div'),lid=document.createElement('div'),front=document.createElement('div'),back=document.createElement('div'),hinge=document.createElement('i');
    box.className='living-nards-case';base.className='living-nards-half living-nards-base living-preview-surface living-preview-nards';lid.className='living-nards-lid';front.className='living-nards-half living-nards-front living-preview-surface living-preview-nards';back.className='living-nards-back';hinge.className='living-nards-hinge';
    front.style.backgroundImage='url("'+surface.dataset.leftSurface+'")';base.style.backgroundImage='url("'+surface.dataset.rightSurface+'")';
    back.style.backgroundImage=board.cover?'url("'+board.cover+'")':'none';back.setAttribute('aria-hidden','true');
    if(!board.cover)back.innerHTML='<span>♜<small>TWO ACES</small></span>';
    for(const point of [...surface.children]){if(point.classList.contains('living-preview-bar'))continue;const col=Number(point.style.gridColumn);if(col>7){point.style.gridColumn=col-7;base.append(point);}else front.append(point);}
    // Painted interiors already contain their carved point rims; a second rail misaligns the upper wells.
    if(surface.dataset.bakedPoints!=='true')for(const half of [front,base])for(const bottom of [false,true]){const rail=createCarvedRail(half===front?'left':'right',bottom);half.append(rail);}
    const leftStorage=document.createElement('aside'),rightStorage=document.createElement('aside');leftStorage.className=rightStorage.className='living-nards-storage';paintStorage(leftStorage,1,0);paintStorage(rightStorage,0,0);front.append(leftStorage);base.append(rightStorage);
    lid.append(front,back);box.append(base,lid,hinge);root.replaceChildren(box);
    root.dataset.openLabel=root.getAttribute('aria-label');setClosed(root,root.classList.contains('is-closed'));
  }else root.replaceChildren(surface);
  root.dataset.paintKey=paintKey;
  return {board:board.name,pieces:set.name};
}

export function setClosed(root,closed){
 const next=!!closed,changed=root.classList.contains('is-closed')!==next;
 const lid=root.querySelector('.living-nards-lid'),box=root.querySelector('.living-nards-case');
 const moving=changed&&lid&&box&&!matchMedia('(prefers-reduced-motion: reduce)').matches;
 const from=moving?[getComputedStyle(lid).transform,getComputedStyle(box).transform]:null;
 for(const animation of root._foldAnimations||[])animation.cancel();
 root._foldAnimations=[];
 root.classList.toggle('is-closed',next);
 if(moving){
  const options={duration:850,easing:'cubic-bezier(.4,0,.2,1)'};
  const animations=[lid.animate([{transform:from[0]},{transform:next?'rotateY(180deg)':'rotateY(0deg)'}],options),box.animate([{transform:from[1]},{transform:next?'translateX(-25%)':'translateX(0%)'}],options)];
  root._foldAnimations=animations;
  Promise.allSettled(animations.map(a=>a.finished)).then(()=>{if(root._foldAnimations===animations){for(const animation of animations)animation.cancel();root._foldAnimations=[];}});
 }
 root.setAttribute('data-closed',String(!!closed));
 if(root.dataset.openLabel)root.setAttribute('aria-label',closed?'Нарды закрыты · '+(root.dataset.board||''):root.dataset.openLabel);
}
