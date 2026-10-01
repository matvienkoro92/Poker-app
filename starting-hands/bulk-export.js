(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.PokerHandExport=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
async function collect(rows,playerId,version,request,progress){
 const selected=Array.from(new Map(rows.map(row=>[String(row.handId),row])).values());
 const hands=[];
 for(let offset=0;offset<selected.length;offset+=50){
  const batch=selected.slice(offset,offset+50),ids=batch.map(row=>String(row.handId));
  const response=await request(ids,version);
  if(!response?.ok||String(response.playerId)!==String(playerId)||String(response.version)!==String(version))throw new Error(response?.error||'История изменилась. Обновите раздел и повторите экспорт.');
  const records=new Map((response.hands||[]).map(hand=>[String(hand.handId),hand.replay]));
  for(const row of batch){const replay=records.get(String(row.handId));if(!replay)throw new Error('Не все раздачи загружены. Повторите экспорт.');hands.push({summary:row,replay});}
  if(progress)progress(hands.length,selected.length);
 }
 return {schema:'poker21-hand-export-v1',playerId:String(playerId),version:String(version),exportedAt:new Date().toISOString(),count:hands.length,hands};
}
function serialize(data,format,text){
 if(format==='json')return JSON.stringify(data,null,2);
 if(format!=='txt')throw new Error('Неизвестный формат экспорта');
 return 'Два туза · Мои раздачи\nИгрок Poker21: '+data.playerId+'\nРаздач: '+data.count+'\n\n'+data.hands.map(hand=>text(Object.assign({},hand.summary,{playerId:data.playerId,metric:'resultMinor'}),hand.replay)).join('\n\n'+'—'.repeat(48)+'\n\n')+'\n';
}
return {collect,serialize};
});
