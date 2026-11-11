'use strict';
const fs=require('node:fs'),path=require('node:path'),sharp=require('sharp');
const {THEMES}=require('../../lib/nards-reference-themes');
const out=path.join(__dirname,'../../assets/board-games/nards');
async function generate(){
 for(const t of THEMES){
  const source=path.join(out,t.id+'-atlas-v2.png'),meta=await sharp(source).metadata();
  if(!meta.hasAlpha)throw Error('Premium atlas must have alpha: '+source);
  const half=Math.floor(meta.width/2),split=Math.round(meta.height*.345);
  for(const [side,left]of [['white',0],['black',half]]){
   const cell=await sharp(source).extract({left,top:0,width:half,height:split}).toBuffer();const crop=await sharp(cell).trim({threshold:20}).toBuffer();
   await sharp(crop).resize(384,384,{fit:'fill'}).webp({quality:93,alphaQuality:100,effort:6}).toFile(path.join(out,'designer-'+t.id+'-'+side+'-v2.webp'));
  }
  for(const [side,left]of [['light',0],['dark',half]]){
   const cell=await sharp(source).extract({left,top:split,width:half,height:meta.height-split}).toBuffer();const crop=await sharp(cell).trim({threshold:20}).toBuffer();
   await sharp(crop).resize(192,960,{fit:'fill'}).webp({quality:91,alphaQuality:100,effort:6}).toFile(path.join(out,t.id+'-point-'+side+'-v2.webp'));
  }
 }
 console.log('Extracted ten premium checkers and ten textured point inlays');
}
module.exports=generate;if(require.main===module)generate().catch(e=>{console.error(e);process.exitCode=1;});
