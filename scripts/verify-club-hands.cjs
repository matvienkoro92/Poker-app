'use strict';
const fs=require('node:fs'),path=require('node:path'),{gunzipSync}=require('node:zlib');
const {pipeline}=require('../lib/redis');
const root=path.resolve(__dirname,'../output/club-hand-import');
async function send(commands){return (await pipeline(commands,{context:'club-hand-verify',throwOnError:true,timeoutMs:20000})).map(x=>x.result);}
(async()=>{
 const expected=JSON.parse(fs.readFileSync(path.join(root,'prepare-report.json'))),ids=Object.keys(expected.counts);
 const active=await send(ids.map(pid=>['GET','poker_app:starting-hands:'+pid+':active']));
 const result={players:ids.length,rows:0,modes:{cash:0,mtt:0,sng:0},verifiedAt:new Date().toISOString()};
 for(let i=0;i<ids.length;i+=20){
  const selected=ids.slice(i,i+20);const plans=selected.map(pid=>JSON.parse(fs.readFileSync(path.join(root,'plans',pid+'.json'))));
  selected.forEach((pid,j)=>{if(active[i+j]!==plans[j].version)throw Error('Unexpected active version '+pid);});
  const values=await send(selected.flatMap((pid,j)=>[['HGET','poker_app:starting-hands:'+pid+':'+active[i+j],'list'],['HLEN','poker_app:starting-hands:'+pid+':'+active[i+j]]]));
  selected.forEach((pid,j)=>{const packed=values[j*2],list=JSON.parse(gunzipSync(Buffer.from(packed,'base64')));if(packed!==plans[j].entries[0][1]||list.playerId!==pid||list.rows.length!==expected.counts[pid]||Number(values[j*2+1])!==list.rows.length+1)throw Error('List verification failed '+pid);for(const row of list.rows){if(row.playerId!==pid)throw Error('Owner mismatch');result.rows++;result.modes[row.mode]++;}});
 }
 if(result.rows!==expected.participations||Object.keys(result.modes).some(m=>result.modes[m]!==expected.modes[m]))throw Error('Totals mismatch');
 fs.writeFileSync(path.join(root,'verified-result.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
})().catch(e=>{console.error(e.message);process.exitCode=1;});
