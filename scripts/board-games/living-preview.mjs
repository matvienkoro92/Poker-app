import {NARDS_BOARDS,CHECKERS,BOARDS,PIECES} from './catalog.mjs';
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
    const state=createBackgammon('short');
    for(let row=0;row<2;row++)for(let col=0;col<12;col++){
      const index=row===0?11-col:12+col,n=state.points[index],point=document.createElement('span');
      point.className='living-preview-point'+(row?' is-bottom':'')+(col%2?' is-light':'');point.dataset.point=index;
      point.style.gridColumn=col+1+(col>=6?1:0);point.style.gridRow=row+1;
      for(let i=0;i<Math.abs(n);i++){const coin=document.createElement('i');coin.className='living-preview-checker'+(n<0?' is-black':'');coin.setAttribute('aria-label',n<0?'Чёрная фишка':'Белая фишка');point.append(coin);}
      surface.append(point);
    }
    const bar=document.createElement('span');bar.className='living-preview-bar';surface.append(bar);
  }
  root.replaceChildren(surface);
  return {board:board.name,pieces:set.name};
}
