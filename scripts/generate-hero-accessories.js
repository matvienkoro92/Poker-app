'use strict';
const fs=require('fs'),path=require('path'),sharp=require('sharp');
const root=path.join(__dirname,'..'),dir='assets/hero-poker/accessories-v1';
(async()=>{const A={items:{},body:{},thumbs:{}};
 const slots=['patch','sleeve','pin','cufflinks'],variants=['gold','green','silver'];
 const rows=[[58,330],[480,145],[755,290],[1110,220]],cols=[[30,332],[384,328],[730,330]];
 for(let row=0;row<4;row++)for(let col=0;col<3;col++){
  const id=slots[row]+'-'+variants[col],[left,width]=cols[col],[top,height]=rows[row];
  const cell=await sharp(path.join(root,dir,'accessory-source.png')).extract({left,top,width,height}).toBuffer();const cropped=await sharp(cell).trim().toBuffer();
  const file=dir+'/'+id+'.webp';await sharp(cropped).resize({width:256,height:256,fit:'inside'}).webp({quality:90}).toFile(path.join(root,file));A.items[id]={src:'./'+file};
  if(row===3){const meta=await sharp(cropped).metadata(),single=dir+'/'+id+'-single.webp';await sharp(await sharp(cropped).extract({left:0,top:0,width:Math.floor(meta.width/2),height:meta.height}).toBuffer()).trim().resize({height:80}).webp({quality:90}).toFile(path.join(root,single));A.items[id].single='./'+single;}
 }
 for(const set of ['club','grinder','oldschool','final']){
  const src=path.join(root,dir,'clean-'+set+'.webp'),layer=dir+'/body-'+set+'.webp',thumb=dir+'/thumb-body-'+set+'.webp';
  await sharp(src).extract({left:0,top:177,width:768,height:430}).webp({quality:90}).toFile(path.join(root,layer));
  await sharp(src).extract({left:151,top:140,width:465,height:465}).resize(256,256).webp({quality:84}).toFile(path.join(root,thumb));
  A.body[set]={src:'./'+layer,rect:[0,177,768,430]};A.thumbs[set]='./'+thumb;
 }
 let text=fs.readFileSync(path.join(root,'hero-catalog.js'),'utf8').replace(/  \/\/ BEGIN ACCESSORY ART[\s\S]*?  \/\/ END ACCESSORY ART\n/,'');
 text=text.replace('  // Acquisition is independent','  // BEGIN ACCESSORY ART\n  catalog.accessoryArt='+JSON.stringify(A,null,2)+';\n  // END ACCESSORY ART\n  // Acquisition is independent');fs.writeFileSync(path.join(root,'hero-catalog.js'),text);
})().catch(e=>{console.error(e);process.exitCode=1;});
