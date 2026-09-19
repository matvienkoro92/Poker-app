'use strict';
// Add calculated personal EV only. Copy and verify a separate version before switching.
// node --env-file=<deployment env> scripts/backfill-stored-hand-ev.cjs [--apply]
const fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const {gzipSync,gunzipSync}=require('node:zlib');
const {pipeline}=require('../lib/redis');
async function run(){
 const source=JSON.parse(fs.readFileSync('output/ev-audit/calculated.json','utf8'));
 if(source.method!=='exact-runouts-fixed-deduction-v1')throw Error('Unknown EV method');
 const calculatedMethods=new Set([source.method,'holdem-simulation-fixed-deduction-v1','omaha-exact-2hole-3board-v1','omaha-simulation-2hole-3board-v1']);
 if(!/^\d+$/.test(String(source.playerId)))throw Error('Invalid player');
 const field='ev';
 const rows=new Map(source.rows.map(r=>[String(r.handId),r]));
 const prefix='poker_app:starting-hands:'+source.playerId;
 async function send(commands){const out=await pipeline(commands,{context:'starting-hands-ev-backfill',throwOnError:true});if(!out||out.some(r=>r.error))throw Error('Storage command failed');return out.map(r=>r.result);}
 const [active]=await send([['GET',prefix+':active']]);if(!active)throw Error('No active projection');
 const oldKey=prefix+':'+active;
 const [packed,oldCount]=await send([['HGET',oldKey,'list'],['HLEN',oldKey]]);
 const data=JSON.parse(gunzipSync(Buffer.from(packed,'base64')));
 let changed=0;const counts={};
 for(const row of data.rows){
  const local=rows.get(String(row.handId));
  if(!local||String(row.playerId)!==String(source.playerId))throw Error('Missing hand or owner mismatch');
  for(const key of ['sessionId','mode','playedAt','resultMinor','bigBlindMinor'])if(row[key]!==local[key])throw Error('Source mismatch: '+key);
  if(JSON.stringify(row.cards)!==JSON.stringify(local.cards))throw Error('Cards mismatch');
  if(!local.ev||!['calculated','unresolved','not_applicable'].includes(local.ev.status))throw Error('Invalid EV status');
  if(local.ev.status==='calculated' && (!calculatedMethods.has(local.ev.method)||!Number.isFinite(local.ev.resultMinor)||!Number.isSafeInteger(local.ev.runouts)||local.ev.runouts<1))throw Error('Invalid EV result');
  if(local.ev.grossEv && (local.ev.grossEv.status!=='calculated'||!Number.isFinite(local.ev.grossEv.resultMinor)||!Number.isFinite(local.ev.grossEv.actualResultMinor)))throw Error('Invalid gross EV');
  if(local.ev.showdownEquity?.status==='calculated' && (!Number.isFinite(local.ev.showdownEquity.share)||local.ev.showdownEquity.share<0||local.ev.showdownEquity.share>1||!Number.isSafeInteger(local.ev.showdownEquity.runouts)))throw Error('Invalid showdown equity');
  if(JSON.stringify(row[field])!==JSON.stringify(local[field])){row[field]=local[field];changed++;}
  const label=row.mode+':'+String(row[field].status);counts[label]=(counts[label]||0)+1;
 }
 console.log(JSON.stringify({hands:data.rows.length,changed,field,counts}));
 if(!process.argv.includes('--apply')||!changed)return;
 const updated=gzipSync(JSON.stringify(data)).toString('base64');
 const version=crypto.createHash('sha256').update(active+updated).digest('hex').slice(0,16),key=prefix+':'+version;
 const [copied]=await send([['COPY',oldKey,key]]);if(Number(copied)!==1)throw Error('Could not create separate version');
 await send([['HSET',key,'list',updated]]);
 const [verified,count]=await send([['HGET',key,'list'],['HLEN',key]]);
 if(verified!==updated||Number(count)!==Number(oldCount))throw Error('Verification failed');
 const [switched]=await send([['EVAL',"if redis.call('GET',KEYS[1]) == ARGV[1] then redis.call('SET',KEYS[1],ARGV[2]);return 1 else return 0 end",'1',prefix+':active',active,version]]);
 if(Number(switched)!==1)throw Error('Active version changed; not switched');
 console.log('Verified and activated '+version+'; previous version retained: '+active);
}
run().catch(error=>{console.error(error.message);process.exitCode=1;});
