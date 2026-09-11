'use strict';
const crypto=require('node:crypto'),C=require('../hero-catalog');
const salvageValue=i=>i.salvageValue==null?(C.rarities[i.rarity]?.bonus||1):i.salvageValue;
const owned=(s,modelId)=>s.inventory.find(i=>!i.award&&C.modelId(i)===modelId);
const capacity=s=>s.inventory.filter(i=>!i.migratedPart&&!i.award).length;
function starterItems(){return C.models.filter(m=>m.starter).map(m=>({...m,modelId:m.id,id:'starter-'+m.id,rarity:0,salvageValue:0,level:1,origin:'Бесплатный стартовый набор клуба'}));}
function migrateCollection(s){
 if(s.schema!==3)return s;
 const retained=[],byModel=new Map(),redirect=new Map();let converted=0,credit=0;
 // Prefer the visible copy's ID so existing selections stay meaningful.
 const visible=new Set(Object.values(s.lookEquipped||{}));
 const ordered=s.inventory.slice().sort((a,b)=>Number(visible.has(b.id))-Number(visible.has(a.id)));
 for(const original of ordered){
  const modelId=C.modelId(original),model=C.model(modelId),i=model?{...original,...model,modelId,id:original.id}:original;
  if(!model){retained.push(i);continue;}
  const kept=byModel.get(modelId);
  if(!kept){byModel.set(modelId,i);retained.push(i);continue;}
  redirect.set(i.id,kept.id);credit+=salvageValue(i);converted++;
  kept.favorite=!!(kept.favorite||i.favorite);
 }
 const remap=items=>{const out={};for(const id of Object.values(items||{})){const next=redirect.get(id)||id,i=retained.find(i=>i.id===next);if(i)out[i.slot]=next;}return out;};
 s.inventory=retained;s.dust+=credit;s.lookEquipped=remap(s.lookEquipped);s.equipped={...s.lookEquipped};
 s.looks=s.looks.map(l=>({...l,items:remap(l.items)}));s.seen=[...new Set(s.seen.map(id=>redirect.get(id)||id))];
 s.lastLoot=[...new Set((s.lastLoot||[]).map(id=>redirect.get(id)||id))];
 for(const i of starterItems())if(!owned(s,i.modelId))s.inventory.push(i);
 s.schema=4;
 s.migrationNote='Теперь одна модель — одна вещь. Надевание и внешний вид объединены.'+(converted?' Повторы: '+converted+' → '+credit+' осколков.':'')+' Вещи, образы и очки навыков сохранены.';
 return s;
}
function addModel(s,modelId,level,origin,now){
 const model=C.model(modelId);if(!model)throw new Error('Unknown model');
 s.lastLoot=[];
 const existing=owned(s,modelId);
 if(existing){s.dust+=C.duplicateDust;s.lastResult={kind:'duplicate',modelId,dust:C.duplicateDust,itemId:existing.id};return;}
 const item={...model,modelId,id:crypto.randomUUID(),rarity:0,salvageValue:4,level,origin,createdAt:new Date(now).toISOString()};
 s.inventory.push(item);s.lastLoot=[item.id];s.lastResult={kind:'item',modelId,itemId:item.id};
}
function prepareChoice(s,level,pick=crypto.randomInt){
 if(s.pendingChoice)return;
 const missing=C.models.filter(m=>!owned(s,m.id)),pool=(missing.length>=3?missing:C.models).slice(),options=[];
 while(options.length<3&&pool.length)options.push(pool.splice(pick(pool.length),1)[0].id);
 s.pendingChoice={id:crypto.randomUUID(),level:s.claimedLevel+1,options};
}
module.exports={starterItems,salvageValue,owned,capacity,migrateCollection,addModel,prepareChoice};
