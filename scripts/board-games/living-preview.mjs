import {createLandingWell,createPointBlade,paintStorage} from './nards-carving.mjs';
import {NARDS_BOARDS,CHECKERS,BOARDS,PIECES,NARDS_INTERIORS} from './catalog.mjs';
import {createBackgammon} from './backgammon.mjs';
import {pieceSVG,pieceNames} from './pieces.mjs';

export function paint(root,game,equipment={}){
  const chess=game==='chess';
  const board=(chess?BOARDS:NARDS_BOARDS).find(b=>b.id===(chess?equipment.board:equipment.nardsBoard))||(chess?BOARDS:NARDS_BOARDS)[0];
  const set=(chess?PIECES:CHECKERS).find(s=>s.id===(chess?equipment.pieces:equipment.checkers))||(chess?PIECES:CHECKERS)[0];
  root.dataset.board=board.id;root.dataset.pieces=set.id;
  root.classList.toggle('living-top-board--chess',chess);
  root.setAttribute('aria-label',(chess?'Шахматы':'Нарды')+' · '+board.name+' · '+set.name+' · вид сверху');
  for(const [key,value]of Object.entries({light:board.light,dark:board.dark,frame:board.frame}))root.style.setProperty('--preview-'+key,value);
  root.style.setProperty('--preview-carving',board.cover?'url("'+board.cover+'")':'none');
  const surface=document.createElement('div');surface.className='living-preview-surface '+(chess?'living-preview-chess':'living-preview-nards');
  if(chess){
    if(board.image){surface.style.backgroundImage='url("'+board.image+'")';surface.dataset.collection='true';}
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
    const inside=NARDS_INTERIORS.find(b=>b.id===equipment.nardsInterior)||NARDS_INTERIORS[0];surface.style.backgroundImage='url("'+inside.surface+'")';surface.dataset.leftSurface=inside.leftSurface;surface.dataset.rightSurface=inside.rightSurface;for(const [key,value]of Object.entries({light:inside.light,dark:inside.dark}))root.style.setProperty('--preview-'+key,value);const state=createBackgammon('short');
    for(let row=0;row<2;row++)for(let col=0;col<12;col++){
      const index=row===0?11-col:12+col,n=state.points[index],point=document.createElement('span');
      point.className='living-preview-point'+(row?' is-bottom':'')+(col%2?' is-light':'');point.dataset.point=index;
      point.style.gridColumn=col+1+(col>=6?1:0);point.style.gridRow=row+1;point.append(createPointBlade(true),createLandingWell(true));
      for(let i=0;i<Math.abs(n);i++){const coin=document.createElement('i');coin.className='living-preview-checker'+(n<0?' is-black':'');coin.setAttribute('aria-label',n<0?'Чёрная фишка':'Белая фишка');point.append(coin);}
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
    const leftStorage=document.createElement('aside'),rightStorage=document.createElement('aside');leftStorage.className=rightStorage.className='living-nards-storage';paintStorage(leftStorage,1,0);paintStorage(rightStorage,0,0);front.append(leftStorage);base.append(rightStorage);
    lid.append(front,back);box.append(base,lid,hinge);root.replaceChildren(box);
    root.dataset.openLabel=root.getAttribute('aria-label');setClosed(root,root.classList.contains('is-closed'));
  }else root.replaceChildren(surface);
  return {board:board.name,pieces:set.name};
}

export function setClosed(root,closed){
 root.classList.toggle('is-closed',!!closed);
 root.setAttribute('data-closed',String(!!closed));
 if(root.dataset.openLabel)root.setAttribute('aria-label',closed?'Нарды закрыты · '+(root.dataset.board||''):root.dataset.openLabel);
}
