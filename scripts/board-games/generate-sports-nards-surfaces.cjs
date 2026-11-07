'use strict';
// Derive playing surfaces directly from the original painted boards, without a dark overlay.
const sharp=require('sharp'),path=require('node:path');
const {NARDS_BOARDS}=require('../../lib/nards-equipment');
const root=path.join(__dirname,'../../assets/board-games/nards');
module.exports=(async()=>{for(const board of NARDS_BOARDS.filter(b=>b.id.startsWith('sport-')&&!b.interiorArt)){
 const source=path.join(root,path.basename(board.cover)),meta=await sharp(source).metadata();
 const top=Math.round(meta.height*.06),height=Math.round(meta.height*.88),width=Math.round(meta.width*.41);
 const panels=await Promise.all([['left',.06],['right',.53]].map(async([side,start])=>{
  const buffer=await sharp(source).extract({left:Math.round(meta.width*start),top,width,height}).resize(582,1000,{fit:'fill'}).webp({quality:88,effort:5}).toBuffer();
  await require('node:fs/promises').writeFile(path.join(root,'inside-'+board.id+'-bright-v2-'+side+'.webp'),buffer);return buffer;
 }));
 await sharp({create:{width:1200,height:1000,channels:3,background:board.frame}}).composite([{input:panels[0],left:0,top:0},{input:panels[1],left:618,top:0}]).webp({quality:86,effort:5}).toFile(path.join(root,'inside-'+board.id+'-bright-v2-surface.webp'));
}console.log('Sports playing surfaces generated from original art, without dimming');})().catch(error=>{console.error(error);process.exitCode=1;});
