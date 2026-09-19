'use strict';
// Versioned EV-only backfill. --export reads owners; default prepares; --apply writes; --verify reads back.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {gzipSync,gunzipSync}=require('node:zlib');
const {pipeline}=require('../lib/redis');
const root=path.resolve(process.env.CLUB_HAND_EV_ROOT||path.resolve(__dirname,'../output/club-hand-ev'));
const importReport=path.resolve(process.env.CLUB_HAND_IMPORT_REPORT||path.resolve(root,'../club-hand-import/prepare-report.json'));
const method='exact-runouts-fixed-deduction-v1';
const calculatedMethods=new Set([method,'holdem-simulation-fixed-deduction-v1','omaha-exact-2hole-3board-v1','omaha-simulation-2hole-3board-v1']);
const pack=x=>gzipSync(JSON.stringify(x)).toString('base64');
const unpack=x=>JSON.parse(gunzipSync(Buffer.from(x,'base64')));
async function send(commands){return (await pipeline(commands,{context:'club-hand-ev',throwOnError:true,timeoutMs:20000})).map(r=>r.result);}
function validateEv(ev){
 if(!ev||!['calculated','unresolved','not_applicable'].includes(ev.status))throw Error('Invalid EV status');
 if(ev.status==='calculated'&&(!calculatedMethods.has(ev.method)||!Number.isFinite(ev.resultMinor)||!Number.isSafeInteger(ev.runouts)||ev.runouts<1))throw Error('Invalid calculated EV');
 if(ev.status==='unresolved'&&typeof ev.reason!=='string')throw Error('Missing unresolved reason');
 if(ev.grossEv&&(ev.grossEv.status!=='calculated'||!Number.isFinite(ev.grossEv.resultMinor)||!Number.isFinite(ev.grossEv.actualResultMinor)))throw Error('Invalid gross EV');
 if(ev.showdownEquity?.status==='calculated'&&(!Number.isFinite(ev.showdownEquity.share)||ev.showdownEquity.share<0||ev.showdownEquity.share>1))throw Error('Invalid equity');
 const forbidden=['cards','holes','opponents','events','base_data'];
 function scan(value){if(!value||typeof value!=='object')return;for(const [key,item] of Object.entries(value)){if(forbidden.includes(key)&&!(key==='opponents'&&Number.isSafeInteger(item)&&item>=0&&item<=9))throw Error('Private raw data in EV');scan(item);}}scan(ev);
}
function mergeEv(data,source){
 if(data.playerId!==source.playerId||source.method!==method)throw Error('Owner or method mismatch');
 const byHand=new Map(source.rows.map(row=>[row.handId,row]));if(byHand.size!==source.rows.length||source.rows.length!==data.rows.length)throw Error('Hand coverage mismatch');
 let changed=0;const rows=data.rows.map(row=>{const s=byHand.get(row.handId);if(!s||row.playerId!==data.playerId)throw Error('Missing hand or wrong owner');
  for(const key of ['sessionId','mode','playedAt','resultMinor','bigBlindMinor','cards'])if(JSON.stringify(row[key])!==JSON.stringify(s[key]))throw Error('Source mismatch '+key);
  validateEv(s.ev);if(JSON.stringify(row.ev)!==JSON.stringify(s.ev))changed++;
  return {...row,ev:s.ev};
 });return {data:{...data,rows},changed};
}
async function exportPlayers(){
 const ids=Object.keys(JSON.parse(fs.readFileSync(importReport)).counts);fs.mkdirSync(path.join(root,'input'),{recursive:true});
 const versions=await send(ids.map(id=>['GET','poker_app:starting-hands:'+id+':active']));const snapshot=[];
 for(let i=0;i<ids.length;i+=20){const group=ids.slice(i,i+20);if(group.some((id,j)=>!versions[i+j]))throw Error('Missing active history');
  const values=await send(group.flatMap((id,j)=>[['HGET','poker_app:starting-hands:'+id+':'+versions[i+j],'list'],['HLEN','poker_app:starting-hands:'+id+':'+versions[i+j]]]));
  group.forEach((id,j)=>{const packed=values[j*2],data=unpack(packed),count=Number(values[j*2+1]);if(data.playerId!==id||count!==data.rows.length+1)throw Error('Invalid live projection');fs.writeFileSync(path.join(root,'input',id+'.json'),JSON.stringify(data));snapshot.push({playerId:id,version:versions[i+j],count,listHash:crypto.createHash('sha256').update(packed).digest('hex')});});
 }
 fs.writeFileSync(path.join(root,'snapshot.json'),JSON.stringify(snapshot));console.log(JSON.stringify({players:snapshot.length,rows:snapshot.reduce((n,p)=>n+p.count-1,0)}));
}
function prepare(){
 const snapshot=JSON.parse(fs.readFileSync(path.join(root,'snapshot.json')));fs.mkdirSync(path.join(root,'plans'),{recursive:true});const summary={players:0,changed:0,statuses:{},plans:[]};
 for(const entry of snapshot){const id=entry.playerId,data=JSON.parse(fs.readFileSync(path.join(root,'input',id+'.json'))),source=JSON.parse(fs.readFileSync(path.join(root,'calculated',id+'.json')));const merged=mergeEv(data,source);
  for(const row of merged.data.rows){const label=row.ev.status;summary.statuses[label]=(summary.statuses[label]||0)+1;}
  const packed=pack(merged.data),version=crypto.createHash('sha256').update(entry.version+packed).digest('hex').slice(0,24);
  fs.writeFileSync(path.join(root,'plans',id+'.json'),JSON.stringify({...entry,nextVersion:merged.changed?version:entry.version,packed,changed:merged.changed}));summary.players++;summary.changed+=merged.changed;summary.plans.push(id);
 }
 fs.writeFileSync(path.join(root,'plan.json'),JSON.stringify(summary,null,2));console.log(JSON.stringify({...summary,plans:undefined}));
}
async function apply(){
 const summary=JSON.parse(fs.readFileSync(path.join(root,'plan.json')));let next=0,failure=null;
 async function upload(id){const p=JSON.parse(fs.readFileSync(path.join(root,'plans',id+'.json'))),prefix='poker_app:starting-hands:'+id;
  const [current]=await send([['GET',prefix+':active']]);if(current===p.nextVersion)return;if(current!==p.version)throw Error('Live version changed '+id+': '+current+' (expected '+p.version+' or '+p.nextVersion+')');
  const [original]=await send([['HGET',prefix+':'+current,'list']]);if(crypto.createHash('sha256').update(original).digest('hex')!==p.listHash)throw Error('Original data changed');
  const key=prefix+':'+p.nextVersion;const [exists]=await send([['EXISTS',key]]);if(!exists){const [copied]=await send([['COPY',prefix+':'+p.version,key]]);if(Number(copied)!==1)throw Error('Copy failed');}
  await send([['HSET',key,'list',p.packed]]);
  const [actual,count]=await send([['HGET',key,'list'],['HLEN',key]]);if(actual!==p.packed||Number(count)!==p.count)throw Error('Verification failed');
  const [switched]=await send([['EVAL',"if redis.call('GET',KEYS[1]) ~= ARGV[1] then return 0 end;redis.call('SET',KEYS[1],ARGV[2]);return 1",'1',prefix+':active',p.version,p.nextVersion]]);if(Number(switched)!==1)throw Error('Concurrent change '+id);
  fs.appendFileSync(path.join(root,'journal.jsonl'),JSON.stringify({playerId:id,previous:p.version,version:p.nextVersion,changed:p.changed,verifiedAt:new Date().toISOString()})+'\n');
 }
 await Promise.all(Array.from({length:4},async()=>{while(!failure&&next<summary.plans.length){const id=summary.plans[next++];try{await upload(id);}catch(e){failure=e;}}}));if(failure)throw failure;console.log('Verified and activated all EV projections');
}
async function verify(){
 const ids=JSON.parse(fs.readFileSync(path.join(root,'plan.json'))).plans;const active=await send(ids.map(id=>['GET','poker_app:starting-hands:'+id+':active']));const report={players:ids.length,rows:0,calculated:0,unresolved:0,not_applicable:0,playersWithEv:0,verifiedAt:new Date().toISOString()};
 for(let i=0;i<ids.length;i+=20){const group=ids.slice(i,i+20),plans=group.map(id=>JSON.parse(fs.readFileSync(path.join(root,'plans',id+'.json'))));group.forEach((id,j)=>{if(active[i+j]!==plans[j].nextVersion)throw Error('Active mismatch '+id);});const values=await send(group.flatMap((id,j)=>[['HGET','poker_app:starting-hands:'+id+':'+active[i+j],'list'],['HLEN','poker_app:starting-hands:'+id+':'+active[i+j]]]));group.forEach((id,j)=>{if(values[j*2]!==plans[j].packed||Number(values[j*2+1])!==plans[j].count)throw Error('Stored mismatch '+id);const data=unpack(values[j*2]);if(data.rows.some(r=>r.ev.status==='calculated'))report.playersWithEv++;for(const r of data.rows){if(r.playerId!==id)throw Error('Owner mismatch');validateEv(r.ev);report.rows++;report[r.ev.status]++;}});}
 fs.writeFileSync(path.join(root,'verified.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));
}
if(require.main===module){const run=process.argv.includes('--export')?exportPlayers:process.argv.includes('--apply')?apply:process.argv.includes('--verify')?verify:prepare;Promise.resolve().then(run).catch(e=>{console.error(e.message);process.exitCode=1});}
module.exports={mergeEv,validateEv};
