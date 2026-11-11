'use strict';
const fs=require('node:fs'),path=require('node:path'),sharp=require('sharp');
const {THEMES}=require('../../lib/nards-reference-themes');
const out=path.join(__dirname,'../../assets/board-games/nards');
async function generate(){
 await require('./generate-premium-nards-assets.cjs')();
 for(const t of THEMES){
  const source=path.join(out,t.id+'-source.webp');
  if(!fs.existsSync(source))throw Error('Missing generated theme: '+source);
  const image=await sharp(source).resize(1200,1500,{fit:'fill'}).toBuffer();
  await sharp(image).webp({quality:88}).toFile(path.join(out,t.id+'-frame.webp'));
  const panels=[];
  for(const [side,left]of [['left',65],['right',645]]){
   const panel=await sharp(image).extract({left,top:65,width:490,height:1370}).resize(582,1000,{fit:'fill'}).webp({quality:86}).toBuffer();panels.push(panel);fs.writeFileSync(path.join(out,t.id+'-'+side+'.webp'),panel);
  }
  await sharp({create:{width:1200,height:1000,channels:3,background:t.frame}}).composite([{input:panels[0],left:0,top:0},{input:panels[1],left:618,top:0}]).webp({quality:85}).toFile(path.join(out,t.id+'-surface.webp'));
  await sharp(image).extract({left:570,top:0,width:60,height:1500}).webp({quality:88}).toFile(path.join(out,t.id+'-spine.webp'));
  for(const [side,top]of [['top',0],['bottom',1440]])await sharp(image).extract({left:0,top,width:1200,height:60}).webp({quality:88}).toFile(path.join(out,t.id+'-rail-'+side+'.webp'));
  // Previews use the same textured raster point inlays as live play.
  const inlays=[];
  for(let row=0;row<2;row++)for(let col=0;col<12;col++){
   const side=col%2?'light':'dark',left=Math.round((col<6?65:645)+(col%6)*490/6);
   let point=sharp(path.join(out,t.id+'-point-'+side+'-v2.webp')).resize(82,510,{fit:'fill'});if(row)point=point.rotate(180);
   inlays.push({input:await point.toBuffer(),left,top:row?925:65});
  }
  const painted=await sharp(image).composite(inlays).toBuffer();await sharp(painted).resize(384,480).webp({quality:85}).toFile(path.join(out,t.id+'-preview.webp'));
 }
 console.log('Generated five portrait reference themes with premium raster materials');
}
module.exports=generate;if(require.main===module)generate().catch(e=>{console.error(e);process.exitCode=1;});
