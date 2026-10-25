'use strict';
const fs=require('node:fs'),path=require('node:path');
const {NARDS_BOARDS,NARDS_INTERIORS,NARDS_DICE,LUXURY_CHECKERS,DESIGN_CHECKERS}=require('./nards-equipment');
const esc=v=>String(v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const data=file=>{const name=path.basename(file),buffer=fs.readFileSync(path.join(__dirname,'../assets/board-games/nards',name));return 'data:image/'+(name.endsWith('.svg')?'svg+xml':'webp')+';base64,'+buffer.toString('base64');};
const SIMPLE=[{id:'classic',name:'Дерево',white:'#f6e4c1',black:'#492c1b'},{id:'pearl',name:'Перламутр',white:'#f1f1e6',black:'#374655'},{id:'jade',name:'Нефрит',white:'#e4ecd3',black:'#175b42'},{id:'ruby',name:'Рубин',white:'#f6d7c2',black:'#7d2234'}];
const spots={1:[5],2:[1,9],3:[1,5,9],4:[1,3,7,9],5:[1,3,5,7,9],6:[1,3,4,6,7,9]};
function svgFor(view){
 const equipment=view.equipment||{},board=NARDS_BOARDS.find(v=>v.id===equipment.nardsBoard)||NARDS_BOARDS[0],inside=NARDS_INTERIORS.find(v=>v.id===equipment.nardsInterior)||NARDS_INTERIORS[0],checkers=[...SIMPLE,...LUXURY_CHECKERS,...DESIGN_CHECKERS].find(v=>v.id===equipment.checkers)||SIMPLE[0],dice=NARDS_DICE.find(v=>v.id===equipment.nardsDice)||NARDS_DICE[0];
 const X=36,Y=20,W=828,H=W*12/11,bar=18,half=(W-bar)/2,lane=half/6,D=lane*.91;
 let parts=['<defs><linearGradient id="rim"><stop stop-color="#fff3cd"/><stop offset=".5" stop-color="#b69c67"/><stop offset="1" stop-color="#6c5432"/></linearGradient><filter id="shadow" x="-50%" y="-50%" width="200%" height="220%"><feDropShadow dx="0" dy="3" stdDeviation="2" flood-opacity=".45"/></filter></defs><rect width="900" height="944" rx="20" fill="#14291f"/>'];
 for(let side=0;side<2;side++){const x=X+side*(half+bar);parts.push('<image href="'+data(inside[side?'rightSurface':'leftSurface'])+'" x="'+x+'" y="'+Y+'" width="'+half+'" height="'+H+'" preserveAspectRatio="xMidYMid slice"/>');}
 parts.push('<rect x="'+(X+half)+'" y="'+Y+'" width="'+bar+'" height="'+H+'" fill="'+board.frame+'"/><path d="M'+(X+half+2)+' '+Y+'V'+(Y+H)+'M'+(X+half+bar-2)+' '+Y+'V'+(Y+H)+'" stroke="#c5ad7060"/>');
 if(!(inside.revision>=2))for(let row=0;row<2;row++)for(let col=0;col<12;col++){
  const x=X+col*lane+(col>=6?bar:0),gap=[50.3,54.5,60.1,60.1,54.5,50.3][col%6],length=H/2*(1-gap/100),start=row?Y+H:Y,tip=row?start-length:start+length;
  parts.push('<path d="M'+x+' '+(row?start-6:start+6)+'Q'+(x+lane/2)+' '+(row?start+3:start-3)+' '+(x+lane)+' '+(row?start-6:start+6)+'L'+(x+lane/2)+' '+tip+'Z" fill="'+(col%2?inside.accent:inside.dark)+'" stroke="'+(col%2?inside.dark:inside.accent)+'" stroke-width="1.5"/>');
 }
 for(const x of [8,872]){parts.push('<rect x="'+x+'" y="'+Y+'" width="20" height="'+H+'" fill="'+board.frame+'" stroke="#bd9e6755"/>');for(let i=0;i<15;i++)parts.push('<path d="M'+(x+3)+' '+(Y+12+i*(H-24)/15)+'h14" stroke="#d8bb7355"/>');}
 const white=checkers.whiteArt?data(checkers.whiteArt):null,black=checkers.blackArt?data(checkers.blackArt):null;
 function coin(cx,cy,isBlack){const art=isBlack?black:white,color=isBlack?checkers.black:checkers.white,id='coin-'+Math.round(cx)+'-'+Math.round(cy);parts.push('<g filter="url(#shadow)"><circle cx="'+cx+'" cy="'+(cy+2)+'" r="'+D/2+'" fill="'+(isBlack?'#111b16':'#82663d')+'"/><circle cx="'+cx+'" cy="'+cy+'" r="'+D/2+'" fill="'+color+'" stroke="'+(isBlack?'#536050':'#d8c095')+'" stroke-width="2"/>');if(art)parts.push('<clipPath id="'+id+'"><circle cx="'+cx+'" cy="'+cy+'" r="'+(D/2-2)+'"/></clipPath><image href="'+art+'" x="'+(cx-D*.57)+'" y="'+(cy-D*.57)+'" width="'+D*1.14+'" height="'+D*1.14+'" clip-path="url(#'+id+')"/>');parts.push('<circle cx="'+cx+'" cy="'+cy+'" r="'+(D/2-4)+'" fill="none" stroke="'+(isBlack?'#75816c':'#cfb885')+'" stroke-width="1.2"/></g>');}
 if(view.state.discipline==='long'){const step=(H*.95-D)/14;for(let i=0;i<15;i++){coin(X+W-lane/2,Y+D/2+2+i*step,false);coin(X+lane/2,Y+H-D/2-2-i*step,true);}}
 else{const counts={0:2,11:5,16:3,18:5,23:-2,12:-5,7:-3,5:-5};for(const [key,count]of Object.entries(counts)){const p=Number(key),top=p<12,col=top?11-p:p-12,cx=X+lane*(col+.5)+(col>=6?bar:0);for(let i=0;i<Math.abs(count);i++)coin(cx,top?Y+D/2+2+i*D:Y+H-D/2-2-i*D,count<0);}}
 const size=equipment.nardsDiceSize==='small'?40:55;
 for(let i=0;i<2;i++){const x=X+W*(i?.80:.64)-size/2,y=Y+H/2-size/2,value=i?3:6;parts.push('<g transform="rotate('+(i?8:-9)+' '+(x+size/2)+' '+(y+size/2)+')" filter="url(#shadow)"><rect x="'+x+'" y="'+(y+4)+'" width="'+size+'" height="'+size+'" rx="7" fill="'+dice.edge+'"/><rect x="'+x+'" y="'+y+'" width="'+size+'" height="'+size+'" rx="7" fill="'+dice.face+'" stroke="'+dice.edge+'" stroke-width="1.5"/>');if(dice.id==='carbon')for(let n=4;n<size;n+=6)parts.push('<path d="M'+(x+n)+' '+y+'v'+size+'M'+x+' '+(y+n)+'h'+size+'" stroke="#9ac9cc18" stroke-width="2"/>');for(const pos of spots[value])parts.push('<circle cx="'+(x+size*(.25+((pos-1)%3)*.25))+'" cy="'+(y+size*(.25+Math.floor((pos-1)/3)*.25))+'" r="'+size*.065+'" fill="'+dice.pip+'"/>');parts.push('</g>');}

 return '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="944" viewBox="0 0 900 944">'+parts.join('')+'</svg>';
}
async function supportedImages(svg){
 // librsvg does not decode embedded WebP; normalize nested artwork before rasterizing.
 const urls=[...new Set([...svg.matchAll(/data:image\/(?:webp|svg\+xml);base64,[A-Za-z0-9+/=]+/g)].map(m=>m[0]))];
 const replacements=await Promise.all(urls.map(async url=>{const bytes=Buffer.from(url.slice(url.indexOf(',')+1),'base64');if(url.startsWith('data:image/webp'))return [url,'data:image/png;base64,'+(await require('sharp')(bytes).png().toBuffer()).toString('base64')];return [url,'data:image/svg+xml;base64,'+Buffer.from(await supportedImages(bytes.toString('utf8'))).toString('base64')];}));
 for(const [from,to]of replacements)svg=svg.split(from).join(to);return svg;
}
async function render(view){return require('sharp')(Buffer.from(await supportedImages(svgFor(view)))).jpeg({quality:88}).toBuffer();}
module.exports={render,svgFor,supportedImages};
