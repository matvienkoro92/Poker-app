'use strict';
// Add confirmed all-in disclosures, preserving lists (including EV) and all replay fields.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {gzipSync,gunzipSync}=require('node:zlib');
const {pipeline}=require('../lib/redis');
const root=path.resolve(__dirname,'../output/club-hand-showdown');
const pack=x=>gzipSync(JSON.stringify(x)).toString('base64');
const unpack=x=>JSON.parse(gunzipSync(Buffer.from(x,'base64')));
async function send(cmds){return (await pipeline(cmds,{context:'club-hand-showdown',throwOnError:true,timeoutMs:20000})).map(r=>r.result);}
function merge(replay,patch,owner){
 if(JSON.stringify(replay.cards)!==JSON.stringify(patch.cards))throw Error('Owner cards mismatch');
 const shown=[...(replay.shownOpponents||[])];
 for(const p of patch.additions){
  if(p.playerId===owner||p.disclosure!=='showdown-allin'||p.cards.length!==2||new Set(p.cards).size!==2||!p.cards.every(c=>/^[2-9TJQKA][cdhs]$/.test(c)))throw Error('Invalid disclosure');
  const existing=shown.find(x=>x.playerId===p.playerId);
  if(existing){if(JSON.stringify(existing.cards)!==JSON.stringify(p.cards))throw Error('Conflicting cards');continue;}
  const actor=replay.events.find(e=>e.actorId===p.playerId)?.actor||'Игрок '+p.playerId;
  if(!actor||actor==='Вы')throw Error('Missing opponent');
  shown.push({...p,actor});
 }
 return {...replay,shownOpponents:shown};
}
async function main(){
 const patches=JSON.parse(fs.readFileSync(path.join(root,'patches.json'))),ids=Object.keys(patches),apply=process.argv.includes('--apply');let next=0,failure;const results=[];
 async function player(id){
  const prefix='poker_app:starting-hands:'+id,[version]=await send([['GET',prefix+':active']]);if(!version)throw Error('Missing version');const key=prefix+':'+version;
  const [list,count]=await send([['HGET',key,'list'],['HLEN',key]]),data=unpack(list);if(data.playerId!==id||Number(count)!==data.rows.length+1)throw Error('Invalid list');
  const rows=new Map(data.rows.map(r=>[r.handId,r])),entries=[];
  for(let i=0;i<patches[id].length;i+=100){const batch=patches[id].slice(i,i+100),values=await send(batch.map(p=>['HGET',key,p.handId]));batch.forEach((p,j)=>{
   const row=rows.get(p.handId);if(!row||row.playerId!==id||JSON.stringify(row.cards)!==JSON.stringify(p.cards))throw Error('Hand ownership mismatch');
   const replay=unpack(values[j]),updated=merge(replay,p,id);if(JSON.stringify(replay)!==JSON.stringify(updated))entries.push([p.handId,pack(updated)]);
  });}
  if(apply&&entries.length){
   const nextVersion=crypto.createHash('sha256').update(version+JSON.stringify(entries)).digest('hex').slice(0,24),dest=prefix+':'+nextVersion;
   const [exists]=await send([['EXISTS',dest]]);if(!exists){const [copied]=await send([['COPY',key,dest]]);if(Number(copied)!==1)throw Error('Copy failed');}
   for(let i=0;i<entries.length;i+=100)await send([['HSET',dest,...entries.slice(i,i+100).flat()]]);
   const [checkList,checkCount]=await send([['HGET',dest,'list'],['HLEN',dest]]);if(checkList!==list||Number(checkCount)!==Number(count))throw Error('List changed');
   for(let i=0;i<entries.length;i+=100){const batch=entries.slice(i,i+100),values=await send(batch.map(e=>['HGET',dest,e[0]]));if(batch.some((e,j)=>e[1]!==values[j]))throw Error('Replay verification failed');}
   const [switched]=await send([['EVAL',"if redis.call('GET',KEYS[1]) ~= ARGV[1] then return 0 end;redis.call('SET',KEYS[1],ARGV[2]);return 1",'1',prefix+':active',version,nextVersion]]);if(Number(switched)!==1)throw Error('Concurrent update');
   fs.appendFileSync(path.join(root,'journal.jsonl'),JSON.stringify({playerId:id,previous:version,version:nextVersion,replays:entries.length})+'\n');
  }
  results.push({playerId:id,changes:entries.length});
 }
 await Promise.all(Array.from({length:4},async()=>{while(!failure&&next<ids.length){try{await player(ids[next++]);}catch(e){failure=e;}}}));if(failure)throw failure;
 const report={apply,players:results.length,changes:results.reduce((n,r)=>n+r.changes,0),verifiedAt:new Date().toISOString()};fs.writeFileSync(path.join(root,apply?'applied.json':'checked.json'),JSON.stringify(report,null,2));console.log(report);
}
if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=1});
module.exports={merge};
