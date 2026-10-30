// Keep the tapped DOM node alive across polling, selection and acknowledgement renders.
export function paintChessSquares({container,chess,flipped,selected,premove,lastMove,legal,enabled,style,pieceSVG,pieceNames,onSquare}) {
 const cells=new Map([...container.children].map(cell=>[cell.dataset.square,cell]));
 for(let row=0;row<8;row++)for(let col=0;col<8;col++){
  const rank=flipped?row+1:8-row,file=flipped?7-col:col,square=String.fromCharCode(97+file)+rank,piece=chess.get(square);
  let cell=cells.get(square);
  if(!cell){cell=document.createElement('button');cell.type='button';cell.className='square';cell.dataset.square=square;cell.onclick=()=>onSquare(square);}
  cell.classList.toggle('dark',(file+rank)%2===1);
  if(cell.disabled!==!enabled)cell.disabled=!enabled;
  cell.classList.toggle('premove',premove?.from===square||premove?.to===square);
  cell.classList.toggle('selected',selected===square);
  cell.classList.toggle('legal',legal.some(move=>move.from===selected&&move.to===square));
  cell.classList.toggle('last',lastMove?.from===square||lastMove?.to===square);
  cell.setAttribute('aria-label',square+(premove?.to===square?' · предход':'')+(piece?' · '+(piece.color==='w'?'белые ':'чёрные ')+pieceNames[piece.type]:''));
  const key=piece?piece.color+piece.type+':'+style:'';
  if(cell.dataset.pieceKey!==key){cell.innerHTML=piece?pieceSVG(piece.type,piece.color,style):'';cell.dataset.pieceKey=key;}
  for(const [edge,visible,text] of [['file',row===7,String.fromCharCode(97+file)],['rank',col===0,String(rank)]]){
   let label=cell.querySelector('.coordinate.'+edge);
   if(visible){if(!label){label=document.createElement('small');label.className='coordinate '+edge;cell.append(label);}if(label.textContent!==text)label.textContent=text;}
   else label?.remove();
  }
  const position=row*8+col;
  if(container.children[position]!==cell)container.insertBefore(cell,container.children[position]||null);
 }
}
export function retainChessSelection({prior,next,square,player,Chess}) {
 if(!square||prior?.discipline!=='chess'||next?.discipline!=='chess'||next.ply<prior.ply||next.winner!==null)return false;
 if(prior.fen===next.fen)return true;
 const oldPiece=new Chess(prior.fen).get(square),piece=new Chess(next.fen).get(square);
 const color=player===(next.whitePlayer??0)?'w':'b';
 return !!oldPiece&&!!piece&&piece.color===color&&oldPiece.color===piece.color&&oldPiece.type===piece.type;
}
