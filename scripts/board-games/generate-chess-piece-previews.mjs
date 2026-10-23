import fs from 'node:fs';
import {collectionPiece} from './collection-pieces.mjs';
const folder=new URL('../../assets/board-games/chess/',import.meta.url);fs.mkdirSync(folder,{recursive:true});
for(const style of ['staunton','arabesque','crystal','regalia'])for(const [type,color,name]of [['k','w','king-white'],['n','b','knight-black']]){
 const svg=collectionPiece(type,color,style).replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ').replace('<defs>','<style>path,circle,rect,ellipse{fill:var(--piece-fill);stroke:var(--piece-stroke);stroke-width:1.5;stroke-linejoin:round}</style><defs>');
 fs.writeFileSync(new URL(style+'-'+name+'.svg',folder),svg);
}
