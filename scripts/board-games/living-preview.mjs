import {paintEditorBoard} from './editor-preview.mjs';
import {NARDS_BOARDS,CHECKERS,BOARDS,PIECES,NARDS_INTERIORS,NARDS_DICE} from './catalog.mjs';
import {pieceSVG,pieceNames} from './pieces.mjs';

const readyImages=new Map();
let boardStyles='',boardStylesReady;
function preloadBoardStyles(){
 return boardStylesReady||(boardStylesReady=fetch('./styles-board-games.css?v=20261111-shared-nards-v2').then(r=>{if(!r.ok)throw Error('Не удалось загрузить оформление доски');return r.text();}).then(css=>{boardStyles=css;}).catch(error=>{boardStylesReady=null;throw error;}));
}

export async function preload(game,equipment={}){
 if(game!=='chess')return preloadBoardStyles();
 const board=BOARDS.find(b=>b.id===equipment.board)||BOARDS[0],style=PIECES.find(p=>p.id===equipment.pieces)||PIECES[0];
 const urls=new Set(board.image?[board.image]:[]);
 for(const color of ['w','b'])for(const type of ['p','r','n','b','q','k']){const href=pieceSVG(type,color,style.id).match(/href="([^"]+)"/);if(href)urls.add(href[1]);}
 await Promise.all([...urls].map(url=>{if(!readyImages.has(url)){const image=new Image();image.src=url;readyImages.set(url,image.decode().catch(()=>{readyImages.delete(url);}));}return readyImages.get(url);}));
}
export function paint(root,game,equipment={}){
  const chess=game==='chess';
  const board=(chess?BOARDS:NARDS_BOARDS).find(b=>b.id===(chess?equipment.board:equipment.nardsBoard))||(chess?BOARDS:NARDS_BOARDS)[0];
  const set=(chess?PIECES:CHECKERS).find(s=>s.id===(chess?equipment.pieces:equipment.checkers))||(chess?PIECES:CHECKERS)[0];
  const paintKey=[game,board.id,set.id,equipment.nardsInterior,equipment.nardsHome,equipment.nardsHomeFull,equipment.nardsPoints,equipment.nardsPointsFor,equipment.nardsRailsHidden,equipment.nardsRailTop,equipment.nardsRailBottom,equipment.nardsWells,equipment.nardsDice,equipment.nardsDiceSize].join(':');
  if(root.dataset.paintKey===paintKey&&root.firstElementChild)return {board:board.name,pieces:set.name};
  root._boardResize?.disconnect();
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
    // Clip two copies of the actual editor board at its hinge. Each half uses
    // the game's stylesheet in a shadow root, so villa CSS cannot restyle it.
    const inside=NARDS_INTERIORS.find(b=>b.id===equipment.nardsInterior)||NARDS_INTERIORS[0];
    const dice=NARDS_DICE.find(b=>b.id===equipment.nardsDice)||NARDS_DICE[0];
    root.dataset.interior=inside.id;
    const box=document.createElement('div'),base=document.createElement('div'),lid=document.createElement('div'),front=document.createElement('div'),back=document.createElement('div');
    box.className='living-nards-case';base.className='living-nards-half living-nards-base living-nards-shared-half';lid.className='living-nards-lid';front.className='living-nards-half living-nards-front living-nards-shared-half';back.className='living-nards-back';
    back.style.backgroundImage=board.cover?'url("'+board.cover+'")':'none';back.setAttribute('aria-hidden','true');
    if(!board.cover)back.innerHTML='<span>♜<small>TWO ACES</small></span>';
    lid.append(front,back);box.append(base,lid);root.replaceChildren(box);
    for(const [half,right] of [[front,false],[base,true]]){
      const host=document.createElement('div');host.className='living-nards-shared-render';host.style.left=right?'-100%':'0';half.append(host);
      const shadow=host.attachShadow({mode:'open'}),style=document.createElement('style'),preview=document.createElement('div');
      style.textContent=boardStyles+`
:host{display:block;position:absolute;top:0;width:200%;height:100%;font:15px/1.45 system-ui,sans-serif;color:#f5e6c5}#nardsPreview{display:block!important;width:100%;padding:0!important;margin:0!important}#nardsPreview .editor-board{width:100%;max-width:none;margin:0;box-shadow:none}.editor-board-caption,.editor-dice,.nards-off-tray{display:none!important}`;
      preview.id='nardsPreview';shadow.append(style,preview);
      paintEditorBoard(preview,{board,inside,checkers:set,dice,size:equipment.nardsDiceSize,points:equipment.nardsPoints,rails:equipment,wells:equipment.nardsWells,home:equipment.nardsHome,homeFull:equipment.nardsHomeFull,kind:'long',showDice:false});
    }
    const table=front.querySelector('.living-nards-shared-render').shadowRoot.querySelector('.editor-board');
    const fit=()=>{if(table.offsetWidth&&table.offsetHeight)box.style.aspectRatio=table.offsetWidth+'/'+table.offsetHeight;};
    fit();root._boardResize=new ResizeObserver(fit);root._boardResize.observe(table);
    root.dataset.openLabel=root.getAttribute('aria-label');setClosed(root,root.classList.contains('is-closed'));
  }
  if(chess)root.replaceChildren(surface);
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

export function boardCover(id){return NARDS_BOARDS.find(board=>board.id===id)?.cover||null;}
