'use strict';
const path=require('node:path'),sharp=require('sharp');
const {skins}=require('../app-billiards-tables'),{cues}=require('../app-billiards-cues');
const asset=file=>path.join(__dirname,'..',file);
function equipmentFor(view){return {table:skins.find(v=>v.id===view.equipment?.table)||skins[0],cue:cues.find(v=>v.id===view.equipment?.cue)||cues[0]};}
async function render(view){
 const {table,cue}=equipmentFor(view);
 // Match the saved billiards-room preview: actual table artwork and leaning cue.
 const cueImage=await sharp(asset(cue.art)).resize({height:561}).rotate(-11,{background:'#00000000'}).png().toBuffer();
 const slippers=await sharp(asset('./assets/player-hall/billiards-club-slippers-v3.webp')).resize(224,168,{fit:'contain',background:'#00000000'}).png().toBuffer();
 const brand=Buffer.from('<svg width="1122" height="1402"><text x="561" y="755" text-anchor="middle" fill="white" opacity=".13" font-family="Georgia" font-size="64" font-weight="600">Two Aces</text></svg>');
 let layers=[{input:brand},{input:slippers,left:247,top:1178},{input:cueImage,left:730,top:600}];
 if(cue.named){const nick=String(view.equipmentOwner||view.playerProfiles?.[0]?.name||'').slice(0,28).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));layers.push({input:Buffer.from('<svg width="1122" height="1402"><text x="825" y="1070" transform="rotate(-101 825 1070)" text-anchor="middle" fill="#211a0c" font-size="8" font-family="sans-serif">'+nick+'</text></svg>')});}
 const composed=await sharp(asset(table.image)).resize(1122,1402).composite(layers).png().toBuffer();
 return sharp(composed).resize(900).jpeg({quality:88}).toBuffer();
}
module.exports={render,equipmentFor};
