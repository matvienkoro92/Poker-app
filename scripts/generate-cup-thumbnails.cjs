'use strict';
const sharp=require('sharp'),trophies=require('../app-hall-trophies');
(async()=>{let total=0;for(const file of Object.values(trophies.assets)){if(!file.endsWith('.webp'))continue;const target=file.replace(/\.webp$/,'-thumb-v2.webp');const info=await sharp(file).resize({width:144,height:180,fit:'inside',withoutEnlargement:true}).webp({quality:76,effort:6,alphaQuality:85}).toFile(target);total+=info.size;}console.log('16 trophy thumbnails: '+Math.round(total/1024)+' KB total');})().catch(e=>{console.error(e);process.exitCode=1;});
