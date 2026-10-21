import * as T from '../../vendor/three/three.module.min.js';
import {villaAwardCaption} from './villa-awards.mjs';

export function awardPlaque(item,textures){
 const {title,description}=villaAwardCaption(item),c=document.createElement('canvas');c.width=1024;c.height=336;const g=c.getContext('2d');
 function lines(text,font,maxLines){g.font=font;const rows=[];let row='';for(const word of String(text).split(/\s+/)){const next=row?row+' '+word:word;if(row&&g.measureText(next).width>940){rows.push(row);row=word;}else row=next;}if(row)rows.push(row);if(rows.length>maxLines){rows.length=maxLines;let last=rows[maxLines-1];while(g.measureText(last+'…').width>940)last=last.slice(0,-1);rows[maxLines-1]=last.replace(/\s+$/,'')+'…';}return rows;}
 g.fillStyle='#ead9a6';g.fillRect(0,0,c.width,c.height);g.strokeStyle='#8a6b32';g.lineWidth=5;g.strokeRect(10,10,1004,316);g.fillStyle='#171a16';g.textAlign='center';g.textBaseline='middle';
 const headings=lines(title,'700 80px Arial',2),details=lines(description,'600 60px Arial',2);g.font='700 80px Arial';headings.forEach((row,i)=>g.fillText(row,512,headings.length===1?85:62+i*79));g.strokeStyle='#a58a50';g.lineWidth=2;g.beginPath();g.moveTo(70,185);g.lineTo(954,185);g.stroke();g.font='600 60px Arial';details.forEach((row,i)=>g.fillText(row,512,details.length===1?253:225+i*66));
 const map=new T.CanvasTexture(c);map.colorSpace=T.SRGBColorSpace;map.anisotropy=8;textures.push(map);
 const plaque=new T.Mesh(new T.PlaneGeometry(1.22,.4),new T.MeshBasicMaterial({map,toneMapped:false}));plaque.name='Readable award plaque '+item.id;plaque.userData.caption={title,description};return plaque;
}
