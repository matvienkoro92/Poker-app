'use strict';
// The illustrated source sheets contain seven painted lanes. Keep their central
// artwork untouched and fit six lane samples to the six logical point columns.
module.exports=async function sixPointPanel(input){
 const sharp=require('sharp'),image=await sharp(input).png().toBuffer(),meta=await sharp(image).metadata();
 const {width,height}=meta,edge=Math.round(height*.24),inset=Math.round(width*.025),sourceLane=(width-2*inset)/7;
 const href='data:image/png;base64,'+image.toString('base64');
 let body='<defs><linearGradient id="fade-top" gradientUnits="userSpaceOnUse" x2="0" y2="'+Math.round(height*.24)+'"><stop offset=".88" stop-color="white"/><stop offset="1" stop-color="black"/></linearGradient><linearGradient id="fade-bottom" gradientUnits="userSpaceOnUse" x2="0" y1="'+Math.round(height*.76)+'" y2="'+height+'"><stop stop-color="black"/><stop offset=".12" stop-color="white"/></linearGradient><mask id="top" maskUnits="userSpaceOnUse"><rect width="'+width+'" height="'+height+'" fill="url(#fade-top)"/></mask><mask id="bottom" maskUnits="userSpaceOnUse"><rect width="'+width+'" height="'+height+'" fill="url(#fade-bottom)"/></mask></defs><image href="'+href+'" width="'+width+'" height="'+height+'"/>';
 for(const bottom of [false,true])for(let i=0;i<6;i++){
  const x=i*width/6,y=bottom?height-edge:0,sw=sourceLane,sx=inset+i*sourceLane;
  body+='<g mask="url(#'+(bottom?'bottom':'top')+')"><svg data-point-column="'+i+'" x="'+x+'" y="'+y+'" width="'+width/6+'" height="'+edge+'" viewBox="'+sx+' '+y+' '+sw+' '+edge+'" preserveAspectRatio="none"><image href="'+href+'" width="'+width+'" height="'+height+'"/></svg></g>';
 }
 return sharp(Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="'+width+'" height="'+height+'">'+body+'</svg>')).png().toBuffer();
};
