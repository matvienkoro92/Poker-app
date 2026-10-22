'use strict';
const path=require('node:path'),fs=require('node:fs/promises'),sharp=require('sharp');
const {skins}=require('../app-billiards-tables.js');
(async()=>{
 let original=0,preview=0;
 for(const skin of skins){
  const input=path.resolve(skin.image),output=input.replace(/\.webp$/,'-thumb.webp');
  const result=await sharp(input).resize({width:480,withoutEnlargement:true}).webp({quality:75,effort:5}).toFile(output);
  original+=(await fs.stat(input)).size;preview+=result.size;
 }
 console.log(JSON.stringify({images:skins.length,originalBytes:original,thumbnailBytes:preview,reductionPercent:Math.round((1-preview/original)*100)}));
})().catch(e=>{console.error(e);process.exitCode=1});
