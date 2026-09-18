'use strict';
// Prepare with deployment environment; --apply activates only verified per-player versions.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {gzipSync,gunzipSync}=require('node:zlib');
const {pipeline}=require('../lib/redis');
const root=path.resolve(process.env.CLUB_HAND_IMPORT_ROOT||path.resolve(__dirname,'../output/club-hand-import'));
const pack=x=>gzipSync(JSON.stringify(x)).toString('base64');
const unpack=x=>JSON.parse(gunzipSync(Buffer.from(x,'base64')));
async function send(cmds){return (await pipeline(cmds,{context:'club-hand-import',throwOnError:true,timeoutMs:20000})).map(x=>x.result);}
function merge(existing,items,pid){
 const rows=new Map();
 for(const row of existing?.rows||[]){if(row.playerId!==pid||rows.has(row.handId))throw Error('Invalid existing owner or duplicate');rows.set(row.handId,row);}
 const entries=[];const seen=new Set();let corrected=0;
 for(const {row,replay} of items){
  if(row.playerId!==pid||seen.has(row.handId)||JSON.stringify(row.cards)!==JSON.stringify(replay.cards))throw Error('Invalid source owner, duplicate or cards');
  seen.add(row.handId);
  const old=rows.get(row.handId);
  if(old){
   if(old.mode==='mtt'&&row.mode==='sng'&&row.sourceDeskType==='3'){rows.set(row.handId,{...old,mode:'sng',sourceDeskType:'3'});corrected++;}
   for(const key of ['source','mode','game','playedAt','resultMinor','bigBlindMinor','unit','cards'])if(JSON.stringify(rows.get(row.handId)[key])!==JSON.stringify(row[key]))throw Error('Existing hand conflict '+pid+' '+row.handId+' '+key);}
  else {rows.set(row.handId,row);entries.push([row.handId,pack(replay)]);}
 }
 return {corrected,rows:[...rows.values()].sort((a,b)=>a.playedAt.localeCompare(b.playedAt)||a.handId.localeCompare(b.handId)),entries};
}
async function prepare(){
 const report=JSON.parse(fs.readFileSync(path.join(root,'prepare-report.json')));const ids=Object.keys(report.counts);
 const active=await send(ids.map(pid=>['GET','poker_app:starting-hands:'+pid+':active']));
 const existingById=new Map();
 for(let offset=0;offset<ids.length;offset+=20){const selected=ids.slice(offset,offset+20).map((pid,j)=>({pid,version:active[offset+j]})).filter(x=>x.version);if(!selected.length)continue;const values=await send(selected.flatMap(x=>[['HGET','poker_app:starting-hands:'+x.pid+':'+x.version,'list'],['HLEN','poker_app:starting-hands:'+x.pid+':'+x.version]]));selected.forEach((x,j)=>existingById.set(x.pid,[values[j*2],values[j*2+1]]));}
 const plans=path.join(root,'plans');fs.mkdirSync(plans,{recursive:true});const summary={players:0,added:0,corrected:0,total:0,packedBytes:0,plans:[]};
 for(let i=0;i<ids.length;i++){
  const pid=ids[i],prefix='poker_app:starting-hands:'+pid,previous=active[i]||null;
  let existing=null,oldCount=0;
  if(previous){const [raw,count]=existingById.get(pid);existing=unpack(raw);oldCount=Number(count);if(existing.playerId!==pid||oldCount!==existing.rows.length+1)throw Error('Incomplete existing projection');}
  const items=fs.readFileSync(path.join(root,'players',pid+'.jsonl'),'utf8').trim().split('\n').map(JSON.parse);
  if(items.length!==report.counts[pid])throw Error('Source count mismatch');
  const merged=merge(existing,items,pid);if(!merged.entries.length&&!merged.corrected)continue;
  const entries=[['list',pack({...(existing||{}),playerId:pid,rows:merged.rows})],...merged.entries];
  const version=crypto.createHash('sha256').update(JSON.stringify([previous,entries])).digest('hex').slice(0,24);
  const plan={pid,previous,version,expectedCount:merged.rows.length+1,added:merged.entries.length,corrected:merged.corrected,entries};
  fs.writeFileSync(path.join(plans,pid+'.json'),JSON.stringify(plan));
  summary.players++;summary.added+=plan.added;summary.corrected+=plan.corrected;summary.total+=merged.rows.length;summary.packedBytes+=entries.reduce((n,e)=>n+e[1].length,0);summary.plans.push(pid);
 }
 fs.writeFileSync(path.join(root,'upload-plan.json'),JSON.stringify(summary,null,2));console.log(JSON.stringify({...summary,plans:undefined}));
}
async function apply(){
 const summary=JSON.parse(fs.readFileSync(path.join(root,'upload-plan.json')));const journal=path.join(root,'upload-journal.jsonl');
 async function upload(pid){
  const p=JSON.parse(fs.readFileSync(path.join(root,'plans',pid+'.json')));const prefix='poker_app:starting-hands:'+pid,key=prefix+':'+p.version;
  const [current]=await send([['GET',prefix+':active']]);if(current===p.version)return;if((current||null)!==p.previous)throw Error('Active version changed '+pid);
  if(p.previous){const [exists]=await send([['EXISTS',key]]);if(!exists){const [copied]=await send([['COPY',prefix+':'+p.previous,key]]);if(Number(copied)!==1)throw Error('Copy failed');}}
  for(let i=0;i<p.entries.length;i+=250)await send([['HSET',key,...p.entries.slice(i,i+250).flat()]]);
  const [count]=await send([['HLEN',key]]);if(Number(count)!==p.expectedCount)throw Error('Stored count mismatch');
  for(let i=0;i<p.entries.length;i+=250){const batch=p.entries.slice(i,i+250);const [values]=await send([['HMGET',key,...batch.map(e=>e[0])]]);if(values.some((v,j)=>v!==batch[j][1]))throw Error('Stored content mismatch');}
  const [switched]=await send([['EVAL',"local current=redis.call('GET',KEYS[1]); if (current or '') ~= ARGV[1] then return 0 end;redis.call('SET',KEYS[1],ARGV[2]);return 1",'1',prefix+':active',p.previous||'',p.version]]);if(Number(switched)!==1)throw Error('Concurrent update');
  fs.appendFileSync(journal,JSON.stringify({pid,previous:p.previous,version:p.version,added:p.added,corrected:p.corrected||0,total:p.expectedCount-1,verifiedAt:new Date().toISOString()})+'\n');
  console.log(JSON.stringify({playerId:pid,added:p.added,corrected:p.corrected||0,total:p.expectedCount-1}));
 }
 let next=0;let failure=null;
 await Promise.all(Array.from({length:4},async()=>{while(!failure && next<summary.plans.length){const pid=summary.plans[next++];try{await upload(pid);}catch(e){failure=e;}}}));
 if(failure)throw failure;
}
if(require.main===module)(process.argv.includes('--apply')?apply():prepare()).catch(e=>{console.error(e.message);process.exitCode=1;});
module.exports={merge};
