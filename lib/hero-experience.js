'use strict';
const C=require('../hero-catalog'),K=require('./hero-collection');
const fail=message=>{throw Object.assign(new Error(message),{status:400});};
function progress(s){
 const before=s.memoryProgress||{tournaments:[],shared:[]},t=new Set(before.tournaments||[]),shared=new Set(before.shared||[]);
 for(const i of s.inventory){if(!i.award||!i.history||!i.history.tournamentId)continue;t.add(i.history.tournamentId);if(i.history.kind==='shared-tournament')shared.add(i.history.tournamentId);}
 return {tournaments:[...t],shared:[...shared]};
}
function styleOptions(s,i){const p=progress(s),count=i.history?.kind==='shared-tournament'?p.shared.length:p.tournaments.length;return C.memoryStyles.map(style=>({...style,available:style.needed===0||!!i.history&&count>=style.needed,progress:Math.min(count,style.needed)}));}
function wearOutfit(s,id){const outfit=C.outfit(id);if(!outfit)fail('Образ не найден');const items=outfit.models.map(id=>K.owned(s,id)).filter(i=>i&&C.compatible(i,s.characterId));if(!items.length)fail('Сначала получите хотя бы одну вещь из образа');for(const i of items){s.lookEquipped[i.slot]=i.id;s.equipped[i.slot]=i.id;}s.seen=[...new Set([...s.seen,...items.map(i=>i.id)])];s.lastOutfit=id;return s;}
function setMemoryStyle(s,id,style){const i=s.inventory.find(i=>i.id===id);if(!i?.award||!i.history)fail('Стиль доступен только памятным предметам с историей');if(!styleOptions(s,i).some(x=>x.id===style&&x.available))fail('Этот стиль ещё не открыт');i.displayStyle=style;s.memoryProgress=progress(s);return s;}
function shop(s){const o=C.outfit('evening-poker21'),owned=o.models.filter(id=>K.owned(s,id)),exclusive=o.models.filter(id=>C.model(id).acquisition==='premium');return {mode:'preview',currency:'XTR',price:null,productId:o.id,owned,exclusive,canPurchase:false,canGift:false,wishlist:!!s.shopWishlist,giftDraft:s.giftDraft||null,notice:'Примерка доступна. Продажи пока не открыты.'};}
module.exports={progress,styleOptions,wearOutfit,setMemoryStyle,shop};
