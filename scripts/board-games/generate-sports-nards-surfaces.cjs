'use strict';
// Preserve source proportions: logos and balls must never be stretched for a tall field.
const sharp=require('sharp'),path=require('node:path'),fs=require('node:fs/promises');
const {NARDS_BOARDS,NARDS_INTERIORS}=require('../../lib/nards-equipment');
const root=path.join(__dirname,'../../assets/board-games/nards');
module.exports=(async()=>{for(const board of NARDS_BOARDS.filter(b=>b.id.startsWith('sport-'))){
 const inside=NARDS_INTERIORS.find(x=>x.id===board.id),source=path.join(root,path.basename(board.cover)),meta=await sharp(source).metadata();
 const top=Math.round(meta.height*.06),height=Math.round(meta.height*.88),width=Math.round(meta.width*.41);
 const panels=await Promise.all([['left',.06],['right',.53]].map(async([side,start])=>{
  const buffer=await sharp(source).extract({left:Math.round(meta.width*start),top,width,height}).resize({width:582}).webp({quality:89,effort:4}).toBuffer();
  await fs.writeFile(path.join(root,path.basename(inside[side+'Surface'])),buffer);return buffer;
 }));
 const panelHeight=(await sharp(panels[0]).metadata()).height;
 await sharp({create:{width:1200,height:panelHeight,channels:3,background:board.frame}}).composite([{input:panels[0],left:0,top:0},{input:panels[1],left:618,top:0}]).webp({quality:87,effort:4}).toFile(path.join(root,path.basename(inside.surface)));
}console.log('Generated proportional artwork for all football and hockey boards');})().catch(error=>{console.error(error);process.exitCode=1;});
