import {createCarvedRail,createPointBlade,createSurfaceHalf,paintStorage} from './nards-carving.mjs';
import {createDiceMesh,DICE_REST_X,DICE_REST_Y} from './dice-mesh.mjs';
import {diceFaces} from './dice-view.mjs';
import {createBackgammon} from './backgammon.mjs';

// The editor uses the same geometry, materials and decorative components as play.
export function paintEditorBoard(root,{board,inside,checkers,dice,size,kind}){
 root.classList.add('has-live-board');
 const table=document.createElement('div');table.className='nards-table editor-board';table.dataset.skin=board.id;table.setAttribute('aria-label','Предпросмотр игровой доски');
 const field=document.createElement('div');field.className='nards-board';field.dataset.skin=board.id;field.dataset.interior=inside.id;field.dataset.mural=String(inside.hidePoints===true||inside.revision>=2);
 for(const [key,value]of Object.entries({'nards-light':board.light,'nards-dark':board.dark,'nards-frame':board.frame,'nards-carving':board.cover?'url("'+board.cover+'")':'none','inside-light':inside.light,'inside-dark':inside.dark,'inside-accent':inside.accent,'nards-left-surface':'url("'+inside.leftSurface+'")','nards-right-surface':'url("'+inside.rightSurface+'")','checker-white':checkers.white,'checker-black':checkers.black,'checker-white-art':checkers.whiteArt?'url("'+checkers.whiteArt+'")':'none','checker-black-art':checkers.blackArt?'url("'+checkers.blackArt+'")':'none'}))table.style.setProperty('--'+key,value);
 const left=document.createElement('aside'),right=document.createElement('aside');paintStorage(left,1,0);paintStorage(right,0,0);left.classList.add('editor-store-left');right.classList.add('editor-store-right');table.append(left,field,right);
 field.append(createSurfaceHalf('left'),createSurfaceHalf('right'),createCarvedRail('left'),createCarvedRail('right'),createCarvedRail('left',true),createCarvedRail('right',true));
 const state=createBackgammon(kind==='short'?'short':'long');
 for(let row=0;row<2;row++)for(let col=0;col<12;col++){
  const index=row===0?11-col:12+col,count=state.points[index],point=document.createElement('span');point.className='point'+(row?' bottom':'')+(col%2?' light-point':'');point.style.gridRow=row+1;point.style.gridColumn=col+1+(col>=6?1:0);point.style.setProperty('--nards-tip-gap',[50.3,54.5,60.1,60.1,54.5,50.3][col%6]+'%');point.classList.toggle('has-stack',Math.abs(count)>1);point.style.setProperty('--stack-steps',Math.max(1,Math.abs(count)-1));point.style.setProperty('--stack-space',Math.abs(count)>5&&!state.points[23-index]?'190cqh':'100cqh');point.append(createPointBlade());
  const number=document.createElement('span');number.className='number';number.textContent=index+1;point.append(number);
  for(let i=0;i<Math.abs(count);i++){const coin=document.createElement('span');coin.className='checker'+(count<0?' black':'');coin.style.setProperty('--stack-index',i);point.append(coin);}field.append(point);
 }
 const bar=document.createElement('span');bar.className='bar';field.append(bar);
 const stage=document.createElement('div');stage.className='board-dice-stage editor-dice';stage.style.setProperty('--cube-size',size==='small'?'5.8cqw':'8.1cqw');
 for(const [i,value]of [6,3].entries()){
  const flight=document.createElement('div'),cube=document.createElement('div'),shadow=document.createElement('div');flight.className='dice-flight';cube.className='dice-cube';shadow.className='dice-ground-shadow';flight.style.left=(i?80:64)+'%';flight.style.top='50%';flight.style.transform='translate(-50%,-50%)';shadow.style.left=(i?80:64)+'%';shadow.style.top='50%';shadow.style.transform='translate(-50%,25%)';cube.style.setProperty('--die-face',dice.face);cube.style.setProperty('--die-edge',dice.edge);cube.style.setProperty('--die-pip',dice.pip);cube.setAttribute('aria-label','Кость: '+value);flight.append(cube);stage.append(shadow,flight);
 }
 table.append(stage);root.append(table);
 // Attach first so computed material variables are available to the canvas renderer.
 stage.querySelectorAll('.dice-cube').forEach((cube,i)=>createDiceMesh(cube,diceFaces(i?3:6),40).draw(DICE_REST_X,DICE_REST_Y,i?.14:-.12));
 const caption=document.createElement('p');caption.className='editor-board-caption';caption.textContent=inside.name+' · '+checkers.name+' · '+dice.name+(size==='small'?' · маленькие кубики':'');root.append(caption);
}
