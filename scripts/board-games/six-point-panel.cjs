'use strict';

// Different paintings have different original tip lengths. Cover the painted
// tips before the blend back to the original art, including the small finials.
const layouts={
 'manki-villa':   {top:.229,bottom:.226,field:'#503325',light:'#edcea0',dark:'#174237',rim:'#c79d64'},
 'club-emerald':  {top:.313,bottom:.321,field:'#0f3228',light:'#e5bd76',dark:'#5c3522',rim:'#d8b474'},
};

module.exports=async function sixPointPanel(input,id){
 const sharp=require('sharp');
 const image=sharp(input),{width,height}=await image.metadata();
 const layout=layouts[id];
 // The other four source paintings already have six aligned points per row.
 if(!layout)return image.png().toBuffer();
 const {field,light,dark,rim}=layout;
 let seed=72;
 function random(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;}
 const texture=Array.from({length:3300},()=>{
  const x=Math.round(random()*width),y=Math.round(random()*height*.41),opacity=(.045+random()*.12).toFixed(2);
  return '<path d="M'+x+' '+y+'q3 -1 8 0" stroke="'+(random()<.55?'#fff0d0':'#100d0a')+'" stroke-opacity="'+opacity+'"/>';
 }).join('');
 let body='<defs><linearGradient id="light" x2="38%" y2="100%"><stop stop-color="'+light+'"/><stop offset="1" stop-color="#fff0cf"/></linearGradient><linearGradient id="dark" x2="38%" y2="100%"><stop stop-color="'+dark+'"/><stop offset="1" stop-color="'+field+'"/></linearGradient><radialGradient id="wood"><stop stop-color="'+field+'"/><stop offset="1" stop-color="#140d0c"/></radialGradient><g id="texture">'+texture+'</g>';
 for(const row of ['top','bottom']){
  const edge=Math.ceil(height*layout[row]),fade=Math.ceil(height*.025);
  body+='<linearGradient id="'+row+'Fade" gradientUnits="userSpaceOnUse" x1="0" y1="'+edge+'" x2="0" y2="'+(edge+fade)+'"><stop stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient><mask id="'+row+'" maskUnits="userSpaceOnUse" x="0" y="0" width="'+width+'" height="'+(edge+fade)+'"><rect width="'+width+'" height="'+(edge+fade)+'" fill="url(#'+row+'Fade)"/></mask>';
 }
 body+='</defs>';
 for(const row of ['top','bottom']){
  const edge=Math.ceil(height*layout[row]),band=edge+Math.ceil(height*.025);
  body+='<g transform="'+(row==='bottom'?'translate(0 '+height+') scale(1 -1)':'')+'"><g mask="url(#'+row+')"><rect width="'+width+'" height="'+band+'" fill="'+field+'"/><rect width="'+width+'" height="'+band+'" fill="url(#wood)" opacity=".28"/><use href="#texture"/>';
  const step=width/6;
  for(let col=0;col<6;col++){
   const x=(col+.5)*step,tip=Math.round(height*Math.min(layout[row]-.031,.255)),base=step*.398;
   body+='<path d="M'+(x-base)+' 0H'+(x+base)+'L'+x+' '+tip+'Z" fill="url(#'+(col%2?'dark':'light')+')" stroke="'+rim+'" stroke-width="'+Math.max(1,width*.0036)+'" stroke-linejoin="round"/>';
  }
  body+='<path d="M0 5H'+width+'" stroke="'+rim+'" stroke-opacity=".65" stroke-width="2"/></g></g>';
 }
 const overlay=Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="'+width+'" height="'+height+'">'+body+'</svg>');
 return image.composite([{input:overlay}]).png().toBuffer();
};
