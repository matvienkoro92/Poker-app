'use strict';
// Preserve original artwork and layout; use small card thumbnails and lighter embedded frame pixels.
const fs=require('node:fs'),path=require('node:path'),sharp=require('sharp');
const {BOARDS}=require('../lib/chess-equipment'),{NARDS_BOARDS}=require('../lib/nards-equipment');
(async()=>{const rows=[],dir='assets/board-games/previews';fs.mkdirSync(dir,{recursive:true});
 for(const board of BOARDS.filter(b=>b.image)){
  const file=board.image,svg=fs.readFileSync(file,'utf8'),match=svg.match(/data:image\/webp;base64,([^"']+)/);
  if(match){const original='assets/board-games/chess/sculpted-frames-v3/'+board.id+'.webp',input=fs.existsSync(original)?fs.readFileSync(original):Buffer.from(match[1],'base64');const pixels=await sharp(input).resize({width:800,withoutEnlargement:true}).webp({quality:84,alphaQuality:90,effort:6}).toBuffer();const result=svg.replace(match[0],'data:image/webp;base64,'+pixels.toString('base64'));if(result.length<svg.length){fs.writeFileSync(file,result);rows.push({file,before:Buffer.byteLength(svg),after:Buffer.byteLength(result)});}}
  const thumb=path.join(dir,'chess-'+board.id+'.webp');await sharp(file).resize(280,280,{fit:'inside'}).webp({quality:80,alphaQuality:85,effort:6}).toFile(thumb);rows.push({file:thumb,before:fs.statSync(file).size,after:fs.statSync(thumb).size,thumbnail:true});
 }
 for(const board of NARDS_BOARDS.filter(b=>b.cover)){const thumb=path.join(dir,'nards-'+board.id+'.webp');await sharp(board.cover).resize({width:280,withoutEnlargement:true}).webp({quality:80,alphaQuality:85,effort:6}).toFile(thumb);rows.push({file:thumb,before:fs.statSync(board.cover).size,after:fs.statSync(thumb).size,thumbnail:true});}
 fs.mkdirSync('output/game-media-audit',{recursive:true});fs.writeFileSync('output/game-media-audit/optimization.json',JSON.stringify(rows,null,2));console.log(JSON.stringify({frames:rows.filter(r=>!r.thumbnail),thumbnails:rows.filter(r=>r.thumbnail).length,cardBytesBefore:rows.filter(r=>r.thumbnail).reduce((n,r)=>n+r.before,0),cardBytesAfter:rows.filter(r=>r.thumbnail).reduce((n,r)=>n+r.after,0)},null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
