'use strict';
// Map the generated carving around a deterministic, square 8×8 playing field.
const fs=require('fs'),path=require('path');
module.exports=b=>{
 const folder=path.resolve(__dirname,'../../assets/board-games/chess/sculpted-frames-v3'),a=JSON.parse(fs.readFileSync(path.join(folder,b.id+'.json'),'utf8')),image=fs.readFileSync(path.join(folder,b.id+'.webp')).toString('base64'),sx=[0,a.left,a.right,1024],sy=[0,a.top,a.bottom,1024],d=[0,128,896,1024];
 let cells='',frame='';for(let y=0;y<8;y++)for(let x=0;x<8;x++)cells+=`<rect x="${128+x*96}" y="${128+y*96}" width="96" height="96" fill="${(x+y)%2?b.dark:b.light}"/>`;
 for(let y=0;y<3;y++)for(let x=0;x<3;x++){if(x===1&&y===1)continue;frame+=`<svg x="${d[x]}" y="${d[y]}" width="${d[x+1]-d[x]}" height="${d[y+1]-d[y]}" viewBox="${sx[x]} ${sy[y]} ${sx[x+1]-sx[x]} ${sy[y+1]-sy[y]}" preserveAspectRatio="none" overflow="hidden"><use href="#carving"/></svg>`;}
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><defs><image id="carving" width="1024" height="1024" href="data:image/webp;base64,${image}"/><pattern id="grain" width="160" height="46" patternUnits="userSpaceOnUse"><path d="M-10 12Q60 21 170 10M-10 31Q80 16 170 33" fill="none" stroke="#fff" stroke-opacity=".08" stroke-width="1"/></pattern></defs>${cells}<rect x="128" y="128" width="768" height="768" fill="url(#grain)"/>${frame}</svg>`;
};
