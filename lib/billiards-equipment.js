'use strict';
const tables=require('../app-billiards-tables'),cues=require('../app-billiards-cues');
function cleanEquipment(value,level=0){const v=value||{},n=Math.max(0,Math.floor(Number(level)||0));return {table:tables.available(v.table,n).id,cue:cues.available(v.cue,n).id};}
module.exports={cleanEquipment};
