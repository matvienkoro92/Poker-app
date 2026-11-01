'use strict';
const tables=require('../app-billiards-tables'),cues=require('../app-billiards-cues');
function cleanEquipment(value,level=0,rewards={}){const v=value||{},n=Math.max(0,Math.floor(Number(level)||0));return {...((rewards.effects||[]).includes(rewards.selectedEffect||'master-spark')?{cueEffect:rewards.selectedEffect||'master-spark'}:{}),table:tables.available(v.table,n).id,cue:cues.available(v.cue,n,rewards.wins).id};}
module.exports={cleanEquipment};
