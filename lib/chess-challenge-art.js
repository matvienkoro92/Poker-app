'use strict';
const fs=require('node:fs'),path=require('node:path');
const {BOARDS,PIECES}=require('./chess-equipment');
const root=path.resolve(__dirname,'..');
async function svgFor(view){
 const {pieceSVG}=await import('../scripts/board-games/pieces.mjs');
 const equipment=view.equipment||{},board=BOARDS.find(b=>b.id===equipment.board)||BOARDS[0],pieces=PIECES.find(p=>p.id===equipment.pieces)||PIECES[0];
 const embedded=new Map();
 async function image(url){
  const file=String(url).split('?')[0];if(!file.startsWith('./assets/'))throw Error('Unsupported chess artwork');
  const full=path.resolve(root,file);if(!full.startsWith(root+path.sep+'assets'+path.sep))throw Error('Invalid chess artwork');
  if(!embedded.has(full))embedded.set(full,(async()=>{const data=fs.readFileSync(full);return path.extname(full)==='.svg'?'data:image/svg+xml;base64,'+data.toString('base64'):'data:image/png;base64,'+(await require('sharp')(data).png().toBuffer()).toString('base64');})());
  return embedded.get(full);
 }
 const X=24,W=852,inset=board.image?W*(board.frameSlice||6.25)/100:12,cell=(W-inset*2)/8;
 const parts=['<rect width="900" height="900" rx="24" fill="#12271f"/>'];
 if(board.image)parts.push('<image x="24" y="24" width="852" height="852" href="'+await image(board.image)+'"/>');
 else parts.push('<rect x="24" y="24" width="852" height="852" rx="8" fill="'+board.frame+'"/>');
 const rows=String(view.state?.fen||'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1').split(' ')[0].split('/');
 if(rows.length!==8)throw Error('Invalid chess position');
 const flipped=view.state?.whitePlayer===1;
 for(let rank=0;rank<8;rank++){
  let col=0;
  for(const item of rows[rank]){
   if(/[1-8]/.test(item)){col+=Number(item);continue;}
   if(!/[prnbqkPRNBQK]/.test(item)||col>7)throw Error('Invalid chess piece');
   col++;
  }
  if(col!==8)throw Error('Invalid chess rank');
 }
 for(let row=0;row<8;row++)for(let col=0;col<8;col++){
  const x=X+inset+col*cell,y=X+inset+row*cell;
  if(!board.image)parts.push('<rect x="'+x+'" y="'+y+'" width="'+cell+'" height="'+cell+'" fill="'+((row+col)%2?board.dark:board.light)+'"/>');
 }
 for(let rank=0;rank<8;rank++){let col=0;for(const item of rows[rank]){
  if(/[1-8]/.test(item)){col+=Number(item);continue;}
  const color=item===item.toUpperCase()?'w':'b',type=item.toLowerCase(),row=flipped?7-rank:rank,column=flipped?7-col:col,x=X+inset+(column+.07)*cell,y=X+inset+(row+.07)*cell,size=cell*.86;
  let art=pieceSVG(type,color,pieces.id);
  if(pieces.id==='meme-reactions'){
   const src=art.match(/<img src="([^"]+)"/)[1];
   parts.push('<g data-piece="'+item+'"><rect x="'+x+'" y="'+y+'" width="'+size+'" height="'+size+'" rx="8" fill="'+(color==='w'?'#f4e6c5':'#28372e')+'"/><image x="'+x+'" y="'+y+'" width="'+size+'" height="'+size+'" href="'+await image(src)+'" preserveAspectRatio="xMidYMid slice"/></g>');
  }else{
   const urls=[...new Set([...art.matchAll(/href="(\.\/assets\/[^"]+)"/g)].map(m=>m[1]))];for(const url of urls)art=art.split(url).join(await image(url));
   art=art.replace('<svg ','<svg x="'+x+'" y="'+y+'" width="'+size+'" height="'+size+'" data-piece="'+item+'" fill="'+(color==='w'?'#f5e7c8':'#322b26')+'" stroke="'+(color==='w'?'#51351f':'#d6b77c')+'" stroke-width="1.5" ');
   parts.push(art);
  }
  col++;
 }}
 return '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900">'+parts.join('')+'</svg>';
}
async function render(view){const svg=await require('./nards-challenge-art').supportedImages(await svgFor(view));return require('sharp')(Buffer.from(svg)).jpeg({quality:88}).toBuffer();}
module.exports={svgFor,render};
