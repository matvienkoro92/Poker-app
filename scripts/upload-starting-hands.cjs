// Run with node --env-file=<deployment env> scripts/upload-starting-hands.cjs
'use strict';
const fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const {gzipSync}=require('node:zlib');
const {pipeline}=require('../lib/redis');
async function run(){
 const ctx={window:{}};vm.createContext(ctx);
 for(const file of ['bulk-sample.js','replays.js'])vm.runInContext(fs.readFileSync('output/hand-statistics-preview/'+file,'utf8'),ctx);
 const data=ctx.window.Poker21BulkSample,replays=ctx.window.Poker21Replays;
 if(!data.rows.length||data.rows.some(r=>String(r.playerId)!==String(data.playerId)||!replays[r.handId]))throw Error('Invalid owner or missing replay');
 for(const row of data.rows){
  const opponents=new Map();
  for(const e of replays[row.handId].events || []) if(/^\d+$/.test(e.actorId)&&e.actorId!=='0'&&e.actorId!==String(row.playerId)) opponents.set(e.actorId,{playerId:e.actorId,name:e.actor});
  row.opponents=Array.isArray(row.opponents)?row.opponents:[...opponents.values()];
 }
 const pack=x=>gzipSync(JSON.stringify(x)).toString('base64');
 const version=crypto.createHash('sha256').update(JSON.stringify([data,replays])).digest('hex').slice(0,16);
 const prefix='poker_app:starting-hands:'+data.playerId,key=prefix+':'+version;
 const entries=[['list',pack({playerId:data.playerId,rows:data.rows})],...data.rows.map(r=>[String(r.handId),pack(replays[r.handId])])];
 async function send(cmds){const out=await pipeline(cmds,{context:'starting-hands-import',throwOnError:true});if(!out||out.some(r=>r.error))throw Error('Storage write failed');return out;}
 for(let i=0;i<entries.length;i+=50)await send([['HSET',key,...entries.slice(i,i+50).flat()]]);
 const check=await send([['HLEN',key]]);if(Number(check[0].result)!==entries.length)throw Error('Import count mismatch');
 await send([['SET',prefix+':active',version]]);
 console.log('Uploaded and verified '+data.rows.length+' hands; version '+version);
}
run().catch(e=>{console.error(e.message);process.exitCode=1;});
