'use strict';
// Fill positions in a versioned private projection, preserving every other field and replay.
// node --env-file=<deployment env> scripts/backfill-stored-hand-positions.cjs [--apply]
const fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const {gzipSync,gunzipSync}=require('node:zlib');
const {pipeline}=require('../lib/redis');
async function run(){
 const ctx={window:{}};vm.runInNewContext(fs.readFileSync('output/hand-statistics-preview/bulk-sample.js','utf8'),ctx);
 const source=ctx.window.Poker21BulkSample;
 if(!/^\d+$/.test(String(source.playerId)))throw Error('Invalid player');
 const field=process.argv.includes('--showdown')?'showdown':'position';
 const rows=new Map(source.rows.map(r=>[String(r.handId),r]));
 const prefix='poker_app:starting-hands:'+source.playerId;
 async function send(commands){const out=await pipeline(commands,{context:'starting-hands-position-backfill',throwOnError:true});if(!out||out.some(r=>r.error))throw Error('Storage command failed');return out.map(r=>r.result);}
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
  if(field==='position'){
   if(!require('../lib/hand-statistics').positions.includes(local.position))throw Error('Invalid position');
   if(row.position&&row.position!=='UNKNOWN'&&row.position!==local.position)throw Error('Known position conflict');
  }else{
   if(local.showdown!==null&&typeof local.showdown!=='boolean')throw Error('Invalid showdown');
   if(typeof row.showdown==='boolean'&&row.showdown!==local.showdown)throw Error('Known showdown conflict');
  }
  if(row[field]!==local[field]){row[field]=local[field];changed++;}
  const label=row.mode+':'+String(row[field]);counts[label]=(counts[label]||0)+1;
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
