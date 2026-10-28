'use strict';
const SOURCES=[];
for(const game of ['long','short','chess'])for(const mode of ['free','paid'])SOURCES.push({game,mode,key:'poker_app:board-games:stats:v2:'+game+':'+mode+':results',family:'board-games'});
for(const game of ['long','short','chess'])SOURCES.push({game,key:'poker_app:board-games:stats:v1:'+game+':results',family:'board-games'});
for(const game of ['pyramid','pool8'])SOURCES.push({game,key:'poker_app:billiards:stats:v1:'+game+':results',family:'billiards'});
function parse(s){try{return JSON.parse(s);}catch{return null;}}
async function read({commands,cursor,period,now=Date.now()}){
 if(period!==undefined&&!['7','30','90','all'].includes(String(period)))throw Object.assign(Error('Неверный период статистики'),{status:400});
 const today=new Date(now+7*3600000).toISOString().slice(0,10),end=Date.parse(today+'T00:00:00Z')-7*3600000+86400000-1;
 const start=period===undefined||period==='all'?0:end+1-Number(period)*86400000;
 let mode=null;
 if(cursor&&/^[rs]/.test(cursor)){mode=cursor[0]==='r'?'range':'scan';cursor=cursor.slice(1);}

 let index=0,position='0';if(cursor){const parts=String(cursor).split(':');index=Number(parts[0]);position=parts[1];if(parts.length!==2||!Number.isInteger(index)||index<0||index>=SOURCES.length||!/^\d{1,24}$/.test(position||''))throw Object.assign(Error('Неверный указатель статистики'),{status:400});}
 const source=SOURCES[index];
 const page=period===undefined?{scan:(await commands([['HSCAN',source.key,position,'COUNT',100]]))[0]}:await require('./admin-game-period-index').page({commands,key:source.key,position,mode,start,end});
 const scan=page.scan;if(!Array.isArray(scan)||!Array.isArray(scan[1]))throw Error('Statistics scan unavailable');
 const records=[],unknown=[];let skipped=0;
 for(let i=0;i<scan[1].length;i+=2){const event=String(scan[1][i]),value=parse(scan[1][i+1]),time=Number(typeof value==='number'?value:value?.finishedAt);if(!Number.isFinite(time)||time<=0){skipped++;continue;}if(time<start||time>end)continue;const roomId=event.split(':')[0];if(!/^[A-HJ-NP-Z2-9]{10}$/.test(roomId)){skipped++;continue;}
 const row={id:source.game+':'+event,day:new Date(time+7*3600000).toISOString().slice(0,10),game:source.game,paid:source.mode?source.mode==='paid':typeof value?.room?.wagered==='boolean'?value.room.wagered:null};records.push(row);if(row.paid===null)unknown.push({row,roomId});}
 const journals=new Map();
 if(unknown.length){const ids=[...new Set(unknown.map(x=>x.roomId))],values=await commands(ids.map(id=>['GET','poker_app:'+source.family+':v1:wager:'+id]));ids.forEach((id,i)=>{const wager=parse(values[i]);if(values[i]&&(!wager||!Number.isFinite(Number(wager.stake))))throw Error('Unknown wager record');journals.set(id,wager);});unknown.forEach(x=>{const wager=journals.get(x.roomId);if(wager){x.row.paid=Number(wager.stake)>0;}else x.row.paid=false;});}
 const paidRows=records.filter(r=>r.paid),ids=[...new Set(paidRows.map(r=>r.id.split(':')[1]))];
 if(ids.length){const missing=ids.filter(id=>!journals.has(id));if(missing.length){const values=await commands(missing.map(id=>['GET','poker_app:'+source.family+':v1:wager:'+id]));missing.forEach((id,i)=>journals.set(id,parse(values[i])));}for(const row of paidRows){const roomId=row.id.split(':')[1],w=journals.get(roomId);row.rakeKnown=!!w&&w.status==='paid';if(row.rakeKnown){row.rake=Number(w.commission)||0;row.rakeId=source.family+':'+roomId;row.rakeDay=new Date(Number(w.finishedAt)+7*3600000).toISOString().slice(0,10);}}}
 const next=String(scan[0])!=='0'?(page.mode==='scan'?'s':page.mode==='range'?'r':'')+index+':'+scan[0]:index+1<SOURCES.length?(index+1)+':0':null;
 return {ok:true,records,next,skipped,preparing:!!page.preparing,period,timezone:'Asia/Novosibirsk',source:index+1,sources:SOURCES.length};
}
module.exports={read,SOURCES};
