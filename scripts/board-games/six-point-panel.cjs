'use strict';

// Fit six of the original painted lanes across each edge, easing back to
// the untouched centre below the point tips.
async function fitPaintedLanes(image,side,edge,blend,preserveMedallion=false){
 const {data,info:{width,height,channels}}=await image.raw().toBuffer({resolveWithObject:true});
 const result=Buffer.from(data),lane=width/7,left=side==='left'?lane:0;
 for(let y=0;y<height;y++){
  const edgeDistance=Math.min(y,height-1-y)/height;
  const transition=Math.max(0,Math.min(1,(edgeDistance-edge)/blend));
  const weight=1-transition*transition*(3-2*transition);
  if(!weight)continue;
  for(let x=0;x<width;x++){
   let laneWeight=weight;
   if(preserveMedallion&&y>height/2){
    const distance=Math.hypot((x/width-.47)/.37,(y/height-.707)/.1);
    const fade=Math.max(0,Math.min(1,(distance-.96)/.16));
    laneWeight*=fade*fade*(3-2*fade);
   }
   const sourceX=x+laneWeight*(left-x/7),x0=Math.floor(sourceX),x1=Math.min(x0+1,width-1),fraction=sourceX-x0;
   for(let channel=0;channel<channels;channel++){
    const row=y*width*channels+channel;
    result[row+x*channels]=Math.round(data[row+x0*channels]*(1-fraction)+data[row+x1*channels]*fraction);
   }
  }
 }
 return require('sharp')(result,{raw:{width,height,channels}}).png().toBuffer();
}

module.exports=async function sixPointPanel(input,id,side){
 const image=require('sharp')(input);
 if(id==='manki-villa')return fitPaintedLanes(image,side,.218,.034,side==='left');
 if(id==='club-emerald')return fitPaintedLanes(image,side,.30,.055);
 return image.png().toBuffer();
};
