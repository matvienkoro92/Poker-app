'use strict';
const fs=require('node:fs'),path=require('node:path');
const {NARDS_INTERIORS,DESIGN_CHECKERS}=require('../../lib/nards-equipment');
(async()=>{
const out=path.join(__dirname,'../../assets/board-games/nards');
fs.mkdirSync(out,{recursive:true});
for(const b of NARDS_INTERIORS){
 const gold=b.accent;
 const star=(cx,cy,r,n=8)=>Array.from({length:n*2},(_,i)=>{const a=i*Math.PI/n-Math.PI/2,d=i%2?r*.43:r;return (cx+Math.cos(a)*d).toFixed(2)+','+(cy+Math.sin(a)*d).toFixed(2);}).join(' ');
 let pattern='',ornament='';
 if(b.motif==='marquetry'){pattern='<path d="M0 24Q60 0 120 24T240 24M0 60Q60 40 120 60T240 60M0 92Q60 70 120 92T240 92" fill="none" stroke="'+gold+'" opacity=".12"/>';ornament='<path d="M-80 0L0-46 80 0 0 46zM-54 0L0-30 54 0 0 30z" fill="none" stroke="'+gold+'" stroke-width="3"/><circle r="9" fill="'+gold+'"/>';}
 if(b.motif==='mosaic'){pattern='<path d="M0 0L60 60 120 0M0 120L60 60 120 120M0 60H120M60 0V120" fill="none" stroke="'+gold+'" opacity=".16" stroke-width="2"/>';ornament='<polygon points="'+star(0,0,78)+'" fill="none" stroke="'+b.dark+'" stroke-width="4"/><polygon points="'+star(0,0,52)+'" fill="'+gold+'" opacity=".65"/><circle r="18" fill="'+b.light+'" stroke="'+b.dark+'" stroke-width="3"/>';}
 if(b.motif==='compass'){pattern='<path d="M0 30Q30 10 60 30T120 30M0 70Q30 50 60 70T120 70M0 110Q30 90 60 110T120 110" fill="none" stroke="'+gold+'" opacity=".09"/>';ornament='<circle r="74" fill="none" stroke="'+gold+'" opacity=".6"/><circle r="59" fill="none" stroke="'+gold+'" opacity=".4"/><polygon points="'+star(0,0,85)+'" fill="'+b.dark+'" opacity=".85"/><path d="M0-85L0 85M-85 0H85" stroke="'+gold+'"/><circle r="12" fill="'+b.frame+'" stroke="'+gold+'"/>';}
 if(b.motif==='leaves'){pattern='<path d="M20 0V120M24 30Q70 0 65 40Q40 48 24 30M24 80Q-5 60 0 95Q18 104 24 80M90 0V120" fill="none" stroke="'+gold+'" opacity=".14" stroke-width="2"/>';ornament='<path d="M-86 30Q0-70 86 30M-52 0Q-78-55-25-33Q-22-10-52 0M-5-18Q-15-75 25-45Q34-18-5-18M42 0Q60-55 83-24Q78 0 42 0" fill="none" stroke="'+gold+'" stroke-width="3"/><circle cy="32" r="14" fill="none" stroke="'+b.dark+'" stroke-width="3"/>';}
 if(b.motif==='sun'){pattern='<path d="M-10 100Q30 80 45 20T140-10M0 30L120 100" fill="none" stroke="'+gold+'" opacity=".1" stroke-width="2"/>';ornament='<polygon points="'+star(0,0,83,16)+'" fill="'+gold+'" opacity=".8"/><circle r="45" fill="'+b.light+'" stroke="'+gold+'" stroke-width="3"/><circle r="29" fill="none" stroke="'+gold+'"/><circle r="12" fill="'+gold+'"/>';}
 if(b.motif==='snow'){pattern='<path d="M0 60H120M60 0V120M18 18L102 102M18 102L102 18" stroke="'+gold+'" opacity=".2" stroke-width="2"/>';ornament=Array.from({length:6},(_,i)=>'<g transform="rotate('+i*60+')"><path d="M0 0V-84M0-45L-23-65M0-45L23-65M0-68L-13-80M0-68L13-80" fill="none" stroke="'+gold+'" stroke-width="4"/></g>').join('')+'<circle r="18" fill="'+b.dark+'" stroke="'+gold+'" stroke-width="3"/>';}
 if(b.id==='jade')ornament='';
 let base='<defs><pattern id="texture" width="120" height="120" patternUnits="userSpaceOnUse">'+pattern+'</pattern><linearGradient id="sheen" x2="1" y2="1"><stop stop-color="#fff" stop-opacity=".12"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></linearGradient></defs><rect width="1200" height="1000" fill="'+b.light+'"/><rect width="1200" height="1000" fill="url(#texture)"/><rect width="1200" height="1000" fill="url(#sheen)"/><path d="M10 10H1190V990H10Z" fill="none" stroke="'+gold+'" stroke-opacity=".45" stroke-width="3"/><g transform="translate(291 500)" opacity=".7">'+ornament+'</g><g transform="translate(909 500)" opacity=".7">'+ornament+'</g>';
 if(b.art&&!b.splitArt){
  const encoded=fs.readFileSync(path.join(out,'illustration-'+b.art+'.webp')).toString('base64');
  const portrait='<clipPath id="medallion"><circle cx="190" cy="190" r="174"/></clipPath><image clip-path="url(#medallion)" href="data:image/webp;base64,'+encoded+'" width="380" height="380" preserveAspectRatio="xMidYMid meet"/>';
  const quote=b.id==='emil-respect'?'<g fill="'+b.dark+'" text-anchor="middle" font-family="Arial,sans-serif" font-size="23" font-weight="600"><text x="915" y="455">Как покериста тебя</text><text x="915" y="486">уважаю ✊🏾,</text><text x="915" y="517">но нарды не потянешь</text><text x="915" y="552" font-size="18">(с) Эмиль</text></g>':'<use href="#inlay" x="719" y="310"/>';
  base='<defs><g id="inlay">'+portrait+'</g><linearGradient id="wood" x2="1" y2="1"><stop stop-color="'+b.light+'"/><stop offset="1" stop-color="'+b.accent+'"/></linearGradient></defs><rect width="1200" height="1000" fill="url(#wood)"/><path d="M10 10H1190V990H10Z" fill="none" stroke="'+b.dark+'" stroke-opacity=".35" stroke-width="3"/><use href="#inlay" x="101" y="310"/>'+quote;
 }
 if(b.revision>=2&&!b.splitArt){
  const encoded=fs.readFileSync(path.join(out,'illustration-'+b.art+'.webp')).toString('base64');
  const artwork='<g id="half-mural"><image href="data:image/webp;base64,'+encoded+'" x="0" y="0" width="582" height="1000" preserveAspectRatio="xMidYMid slice"/></g>';
  const lines=b.id==='emil-respect'?['Как покериста тебя','уважаю ✊🏾 ,','но нарды не потянешь']:b.id==='cooler-tears'?['Это не слёзы.','Это плохие зарики.']:b.quote?['За этой доской','решаю я.']:[];
  const inscription=x=>!lines.length?'':'<g class="board-quote" transform="translate(0 180)" fill="#fff0cc" fill-opacity="1" stroke="#21150e" stroke-opacity="1" stroke-width="3.5" stroke-linejoin="round" paint-order="stroke" font-family="Georgia,serif" font-weight="700" text-anchor="middle"><rect x="'+(x-265)+'" y="435" width="530" height="160" rx="14" fill="url(#quote-shade)" stroke="none"/><path d="M'+(x-100)+' 452H'+(x+100)+'M'+(x-55)+' 582H'+(x+55)+'" fill="none" stroke="'+b.dark+'" stroke-opacity=".35" stroke-width="1"/>'+lines.map((line,i)=>'<text x="'+x+'" y="'+(477+i*31)+'" font-size="'+(b.id==='emil-respect'?28:32)+'">'+line+'</text>').join('')+'<text x="'+x+'" y="568" font-size="18">'+(b.id==='emil-respect'?'(с) ':'')+b.signature+'</text></g>';
  base='<defs>'+artwork+'<linearGradient id="quote-shade" x2="0" y2="1"><stop stop-color="#160f0b" stop-opacity="0"/><stop offset=".2" stop-color="#160f0b" stop-opacity=".78"/><stop offset=".8" stop-color="#160f0b" stop-opacity=".78"/><stop offset="1" stop-color="#160f0b" stop-opacity="0"/></linearGradient></defs><rect width="1200" height="1000" fill="'+b.light+'"/><g><use href="#half-mural"/><use href="#half-mural" transform="translate(1200 0) scale(-1 1)"/></g><path d="M12 12H1188V988H12Z" fill="none" stroke="'+b.dark+'" stroke-width="5"/>'+inscription(291)+inscription(909);
 }
 if(b.splitArt){
  base=['left','right'].map((side,i)=>{const encoded=fs.readFileSync(path.join(out,'illustration-'+b.art+'-'+side+'.webp')).toString('base64');return '<image href="data:image/webp;base64,'+encoded+'" x="'+(i?618:0)+'" y="0" width="582" height="1000" preserveAspectRatio="xMidYMid slice"/>';}).join('');
 }
 const svg=body=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1000" preserveAspectRatio="none">'+body+'</svg>';
 let points='';const w=1164/12;for(let row=0;row<2;row++)for(let i=0;i<12;i++){const x=i*w+(i>=6?36:0),y=row?946:54,gap=[50.3,54.5,60.1,60.1,54.5,50.3][i%6],reach=54+446*(1-gap/100),tip=row?1000-reach:reach;points+='<path d="M'+(x+w*.22)+' '+y+'H'+(x+w*.78)+'L'+(x+w/2)+' '+tip+'Z" fill="'+(i%2?gold:b.dark)+'" stroke="'+(i%2?b.dark:gold)+'" stroke-width="2"/><ellipse cx="'+(x+w/2)+'" cy="'+y+'" rx="'+(w*.46)+'" ry="46" fill="#9a8663" stroke="#342516" stroke-width="4"/>';}
 const bar='<rect x="582" width="36" height="1000" fill="'+b.frame+'"/><path d="M596 0V1000M604 0V1000" stroke="'+gold+'" stroke-opacity=".45"/>';
 if(b.art){
  const sharp=require('sharp'),normalize=require('../../lib/nards-challenge-art').supportedImages;
  const raster=await sharp(Buffer.from(await normalize(svg(base)))).resize(1200,1000).png().toBuffer();
  await sharp(raster).webp({quality:80,effort:6}).toFile(path.join(out,path.basename(b.surface)));
  for(const [side,x]of [['left',0],['right',618]]){const panel=b.splitArt?sharp(path.join(out,'illustration-'+b.art+'-'+side+'.webp')):sharp(raster).extract({left:x,top:0,width:582,height:1000});await panel.webp({quality:80,effort:6}).toFile(path.join(out,path.basename(b[side+'Surface'])));}
  const preview=Buffer.from(await normalize(svg(base+(b.revision>=2?'':points)+bar)));
  if(b.splitArt){const panels=await Promise.all(['left','right'].map(side=>sharp(path.join(out,'illustration-'+b.art+'-'+side+'.webp')).resize(228,524,{fit:'cover'}).toBuffer()));await sharp({create:{width:480,height:524,channels:3,background:b.frame}}).composite([{input:panels[0],left:0,top:0},{input:panels[1],left:252,top:0}]).webp({quality:76,effort:6}).toFile(path.join(out,path.basename(b.preview)));}else await sharp(preview).resize(480,400).webp({quality:76,effort:6}).toFile(path.join(out,path.basename(b.preview)));
 }else{
 fs.writeFileSync(path.join(out,path.basename(b.surface)),svg(base));
 for(const [side,x]of [['left',0],['right',618]])fs.writeFileSync(path.join(out,path.basename(b[side+'Surface'])),'<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+x+' 0 582 1000" preserveAspectRatio="xMidYMid meet">'+base+'</svg>');
 fs.writeFileSync(path.join(out,path.basename(b.preview)),svg(base+(b.revision>=2?'':points)+bar));
 }

}
console.log('Generated '+NARDS_INTERIORS.length+' nards interiors and previews');

// Club exteriors reuse their inlay as a strong carved centerpiece, with a quiet rim.
for(const id of ['club-aces','club-night']){
 const sharp=require('sharp');
 await sharp(path.join(out,'illustration-'+id+'.webp')).webp({quality:80,effort:6}).toFile(path.join(out,id+'-cover.webp'));
}
const checkerArt={waaar:'waaar-master',cooler:'cooler-tears',emil:'emil-respect','club-aces':'club-aces',dragon:'dragon',koi:'koi'};
for(const [id,art]of Object.entries(checkerArt)){
 const image=(await require('sharp')(path.join(out,'illustration-'+art+'.webp')).resize(192,192).webp({quality:70,effort:6}).toBuffer()).toString('base64');
 for(const side of ['white','black']){
  const light=side==='white',rim=light?'#fff1d5':'#101e29',edge=light?'#ac7c39':'#111a17',metal=light?'#87602c':'#dbb875';
  const body='<defs><radialGradient id="rim"><stop stop-color="'+rim+'"/><stop offset=".8" stop-color="'+rim+'"/><stop offset="1" stop-color="'+metal+'"/></radialGradient><clipPath id="portrait"><circle cx="100" cy="98" r="60"/></clipPath></defs><circle cx="100" cy="103" r="96" fill="'+edge+'"/><circle cx="100" cy="98" r="94" fill="url(#rim)" stroke="'+metal+'" stroke-width="3"/><image href="data:image/webp;base64,'+image+'" x="34" y="32" width="132" height="132" clip-path="url(#portrait)"/><circle cx="100" cy="98" r="65" fill="none" stroke="'+metal+'" stroke-width="5"/><circle cx="100" cy="98" r="88" fill="none" stroke="'+rim+'" stroke-width="3" stroke-dasharray="2 6"/>';
  fs.writeFileSync(path.join(out,path.basename(DESIGN_CHECKERS.find(c=>c.id===id)[side+'Art'])),'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">'+body+'</svg>');
 }
}

})().catch(e=>{console.error(e);process.exitCode=1;});
