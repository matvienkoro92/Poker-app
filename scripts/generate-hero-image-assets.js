'use strict';
// Derived assets keep the original 768×1152 registration. Never overwrite source art.
const fs=require('fs'),path=require('path'),sharp=require('sharp'),C=require('../hero-catalog');
const root=path.join(__dirname,'..'),dir='assets/hero-poker/optimized-v1';
const A={layers:{},thumbs:{},props:{},characters:{}};
function source(i){return C.pieceArt[i.slot+'-'+i.set]||(i.slot==='head'?C.headArt[i.set]:i.slot==='eyes'?C.eyesArt:C.lookArt[i.set]);}
async function save(name,pipeline){const file=dir+'/'+name+'.webp';await pipeline.toFile(path.join(root,file));return './'+file;}
(async()=>{fs.mkdirSync(path.join(root,dir),{recursive:true});
 for(const i of C.models.filter(i=>['body','legs','feet','head','eyes'].includes(i.slot))){
  const key=i.slot+'-'+i.set;if(A.layers[key])continue;
  const rect={body:[0,177,768,430],legs:[0,505,768,495],feet:[0,967,768,185],head:[152,0,464,211],eyes:[298,87,157,38]}[i.slot];
  const [left,top,width,height]=rect;
  A.layers[key]={src:await save('layer-'+key,sharp(path.join(root,source(i))).extract({left,top,width,height}).webp({quality:90,effort:6})),rect};
  // Match the existing square card viewport, including its deliberate zoom.
  const [scale,x,y]={body:[1.65,-.325,-.30],legs:[1.65,-.325,-1.07],feet:[1.75,-.375,-1.95],head:[2.9,-.95,-.03],eyes:[2.9,-.95,-.03]}[i.slot];
  const side=Math.floor(768/scale),cx=Math.round(-x*768/scale),cy=Math.round(-y*768/scale);
  A.thumbs[key]=await save('thumb-'+key,sharp(await sharp(path.join(root,source(i))).extend({bottom:Math.max(0,cy+side-1152),background:{r:0,g:0,b:0,alpha:0}}).toBuffer()).extract({left:cx,top:cy,width:side,height:side}).resize(256,256).webp({quality:84}));
 }
 for(const atlas of ['standard','characters']){for(let n=0;n<(atlas==='standard'?8:4);n++){
  A.props[atlas+'-'+n]=await save('prop-'+atlas+'-'+n,sharp(path.join(root,atlas==='standard'?C.props:C.characterProps)).extract({left:n%4*384,top:atlas==='standard'?Math.floor(n/4)*384:0,width:384,height:atlas==='standard'?384:512}).resize({width:256}).webp({quality:86}));
 }}
 for(const c of C.characters)A.characters[c.id]=await save('character-'+c.id,sharp(path.join(root,c.art)).resize({height:192}).webp({quality:84}));
 A.logo=await save('club-logo',sharp(path.join(root,'assets/logo-two-aces.png')).resize({width:96}).webp({quality:90}));
 let file=fs.readFileSync(path.join(root,'hero-catalog.js'),'utf8');file=file.replace(/  \/\/ BEGIN DERIVED HERO ART[\s\S]*?  \/\/ END DERIVED HERO ART\n/,'');
 file=file.replace('  // Acquisition is independent','  // BEGIN DERIVED HERO ART\n  catalog.renderArt='+JSON.stringify(A,null,2)+';\n  // END DERIVED HERO ART\n  // Acquisition is independent');fs.writeFileSync(path.join(root,'hero-catalog.js'),file);
 console.log('Generated',fs.readdirSync(path.join(root,dir)).length,'hero image assets');
})().catch(e=>{console.error(e);process.exitCode=1;});
