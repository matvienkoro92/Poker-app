'use strict';
// Prepare the generated sheets for small board cells, with a common foot line.
const sharp=require('sharp'),fs=require('fs'),path=require('path');
const styles=process.argv.slice(2),types=['k','q','b','n','r','p'];
// Broad bases remain readable at phone size. Pawns must be clearly shorter than bishops.
const sizes={k:[160,232],q:[156,220],b:[144,202],n:[178,204],r:[154,180],p:[112,144]};
(async()=>{for(const style of styles){
 const input=path.resolve('output/imagegen/chess-pieces-v2',style+'.png');
 const meta=await sharp(input).metadata(),dir=path.resolve('assets/board-games/chess/sculpted-v2');
 if(!meta.hasAlpha)throw Error('Transparent source required: '+style);
 fs.mkdirSync(dir,{recursive:true});
 for(let col=0;col<6;col++){
  // Sheets are composed by an artist: the gap between sides can sit off centre.
  // Find that gap rather than clipping crowns at the mathematical half-height.
  const left=Math.round(col*meta.width/6),columnWidth=Math.round((col+1)*meta.width/6)-left;
  const {data,info}=await sharp(input).extract({left,top:0,width:columnWidth,height:meta.height}).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  let split=Math.round(meta.height/2),best=Infinity;
  for(let line=Math.floor(meta.height*.4);line<Math.ceil(meta.height*.6);line++){
   let occupied=0;
   for(let px=0;px<info.width;px++)if(data[(line*info.width+px)*4+3]>32)occupied++;
   const score=occupied*meta.height+Math.abs(line-meta.height/2);
   if(score<best){best=score;split=line;}
  }
  for(let row=0;row<2;row++){
  const x=Math.round(col*meta.width/6),right=Math.round((col+1)*meta.width/6);
  const y=row?split:0,bottom=row?meta.height:split;
  const type=types[col],color=row?'b':'w';
  const cell=await sharp(input).extract({left:x,top:y,width:right-x,height:bottom-y}).toBuffer();
  // Normalize the silhouette itself, before adding transparent padding. The former
  // fit-inside pass left narrow sculptures occupying less than half a square.
  const [width,height]=sizes[type];
  const image=await sharp(cell).trim({threshold:8}).resize(width,height,{fit:'fill'}).toBuffer();
  await sharp({create:{width:256,height:256,channels:4,background:{r:0,g:0,b:0,alpha:0}}})
   .composite([{input:image,left:Math.floor((256-width)/2),top:240-height}])
   .webp({quality:94,alphaQuality:100,effort:6}).toFile(path.join(dir,style+'-'+color+'-'+type+'.webp'));
 }
 }
 console.log(style+': 12 alpha sprites');
}})().catch(e=>{console.error(e);process.exitCode=1});
