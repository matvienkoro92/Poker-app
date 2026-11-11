'use strict';
const fs=require('node:fs'),path=require('node:path'),sharp=require('sharp');
module.exports=async function generateSantorini(){
 const out=path.join(__dirname,'../../assets/board-games/nards');
 const {NARDS_INTERIORS,DESIGN_CHECKERS}=require('../../lib/nards-equipment');
 const b=NARDS_INTERIORS.find(b=>b.id==='santorini');
 const image=await sharp(path.join(out,'illustration-santorini-source.png')).resize(1200,1500).toBuffer();
 // A single painting split at the hinge, with no mirrored or repeated character.
 await sharp(image).resize(1200,1000,{fit:'fill'}).webp({quality:87}).toFile(path.join(out,path.basename(b.surface)));
 for(const [side,left]of [['left',0],['right',600]])await sharp(image).extract({left,top:0,width:600,height:1500}).resize(582,1000,{fit:'fill'}).webp({quality:87}).toFile(path.join(out,path.basename(b[side+'Surface'])));
 await sharp(image).resize(480,600).webp({quality:80}).toFile(path.join(out,path.basename(b.preview)));
 const c=DESIGN_CHECKERS.find(c=>c.id==='santorini');
 for(const side of ['white','black']){
  const dark=side==='black',colors=dark?['#a5c7cd','#306979','#082c39','#163f4d']:['#fffdf0','#f3e4c4','#d6bf91','#f9eed5'];
  const facets=Array.from({length:10},(_,i)=>{const a=i*Math.PI/5,b=(i+1)*Math.PI/5;return '<path d="M100 100L'+(100+86*Math.cos(a))+','+(100+86*Math.sin(a))+'L'+(100+86*Math.cos(b))+','+(100+86*Math.sin(b))+'Z" fill="'+colors[i%4]+'" opacity=".28"/>';}).join('');
  fs.writeFileSync(path.join(out,path.basename(c[side+'Art'])),'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><radialGradient id="p" cx="30%" cy="22%" r="82%"><stop stop-color="'+colors[0]+'"/><stop offset=".46" stop-color="'+colors[1]+'"/><stop offset="1" stop-color="'+colors[2]+'"/></radialGradient></defs><circle cx="100" cy="100" r="98" fill="'+colors[2]+'"/><circle cx="100" cy="100" r="91" fill="url(#p)"/>'+facets+'<circle cx="100" cy="100" r="87" fill="none" stroke="'+colors[0]+'" stroke-opacity=".5" stroke-width="2"/><ellipse cx="64" cy="42" rx="24" ry="9" fill="#fff" opacity=".5" transform="rotate(-30 64 42)"/></svg>');
 }
};
if(require.main===module)module.exports();
