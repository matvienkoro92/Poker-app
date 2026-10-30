import Nards from '../../lib/nards-equipment.js';
export const NARDS_BOARDS=Nards.NARDS_BOARDS.map(item=>({...item,...(item.cover?{thumbnail:'./assets/board-games/previews/nards-'+item.id+'.webp'}:{})}));
export const NARDS_INTERIORS=Nards.NARDS_INTERIORS.map(item=>item.id==='monfokon'?{...item,...Object.fromEntries(['surface','leftSurface','rightSurface','preview'].map(key=>[key,item[key]+'?v=20261030-monfokon-candy-5']))}:item.revision>=2?{...item,...Object.fromEntries(['surface','leftSurface','rightSurface','preview'].map(key=>[key,item[key]+'?v=20261025-readable-quotes-3']))}:item);
export const NARDS_DICE=Nards.NARDS_DICE;
import ChessEquipment from '../../lib/chess-equipment.js';
export const BOARDS=ChessEquipment.BOARDS.map(item=>({...item,...(item.image?{thumbnail:'./assets/board-games/previews/chess-'+item.id+'.webp'}:{}),...(item.frameSlice?{image:item.image+'?v=20261029-light-frames-1'}:{})}));
export const PIECES=ChessEquipment.PIECES;
export const CHECKERS=[{id:'classic',level:1,name:'Дерево',white:'#f6e4c1',black:'#492c1b'},{id:'pearl',level:1,name:'Перламутр',white:'#f1f1e6',black:'#374655'},{id:'jade',level:1,name:'Нефрит',white:'#e4ecd3',black:'#175b42'},{id:'ruby',level:1,name:'Рубин',white:'#f6d7c2',black:'#7d2234'},...Nards.LUXURY_CHECKERS,...Nards.DESIGN_CHECKERS];
