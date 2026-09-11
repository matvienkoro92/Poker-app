'use strict';
const crypto=require('node:crypto'),C=require('../hero-catalog');
// Identity describes the visible composition, independent of inventory instance IDs.
function lookKey(s){
 const slots={body:['club-body','original'],legs:['club-legs','original'],feet:['club-feet','original']};
 for(const id of Object.values(s.lookEquipped||{})){const i=s.inventory.find(i=>i.id===id);if(i)slots[i.slot]=[i.award?i.id:C.modelId(i)||i.id,i.displayStyle||'original'];}
 return crypto.createHash('sha256').update(JSON.stringify([s.characterId||'pokermanki',Object.entries(slots).sort(([a],[b])=>a.localeCompare(b))])).digest('hex');
}
function record(s,before,body,now){
 s.activity=s.activity||[];s.collectionTotals=s.collectionTotals||{draws:0,duplicates:0,crafted:0};
 const row={id:body.requestId,at:new Date(now).toISOString(),action:body.action,dustDelta:s.dust-before.dust};
 if(['adventure','choose-reward','craft','claim-trophy'].includes(body.action)){
  Object.assign(row,s.lastResult);const i=s.inventory.find(i=>i.id===row.itemId);row.title=i&&C.itemName(i);row.source=body.action;
  if(['adventure','choose-reward'].includes(body.action)){s.collectionTotals.draws++;if(row.kind==='duplicate')s.collectionTotals.duplicates++;}
  if(body.action==='craft')s.collectionTotals.crafted++;
 }else if(body.action==='salvage'){const i=before.inventory.find(i=>i.id===body.item);row.itemId=i.id;row.modelId=C.modelId(i);row.title=C.itemName(i);row.kind='salvage';}
 else if(body.action==='set-memory-style'){row.itemId=body.item;row.title=C.itemName(s.inventory.find(i=>i.id===body.item));row.kind='style';row.style=body.style;}
 else return;
 s.activity=[row,...s.activity].slice(0,200);
 if(s.goal&&s.goalStartedAt!=null&&!s.goalCompletedAt&&s.inventory.some(i=>!i.award&&C.modelId(i)===s.goal)&&!before.inventory.some(i=>!i.award&&C.modelId(i)===s.goal)){
  s.goalCompletedAt=now;s.lastGoalResult={modelId:s.goal,startedAt:s.goalStartedAt,completedAt:now};row.goalElapsedMs=Math.max(0,now-s.goalStartedAt);
 }
}
module.exports={lookKey,record};
