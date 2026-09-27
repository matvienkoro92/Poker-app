'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),crypto=require('node:crypto');
const source=fs.readFileSync(require.resolve('../lib/report-transaction'),'utf8');
const key='poker_app:admin_report_rakeback_draft:shared';
const digest=x=>crypto.createHash('sha1').update(x).digest('hex');
function setup(initial){
 const values=new Map([[key,initial]]);let bytes=0;
 const pipeline=async commands=>commands.map(c=>{
  if(c[0]==='GET')return {result:values.get(c[1])??null};
  if(c[0]==='LRANGE')return {result:values.get(c[1])||[]};
  assert.equal(c[0],'EVAL');bytes=Buffer.byteLength(JSON.stringify(commands));
  const n=Number(c[2]),snapshots=JSON.parse(c[3+n]),writes=JSON.parse(c[4+n]);
  for(const s of snapshots){const current=values.get(s.key);if(s.kind==='list'){if(JSON.stringify((current||[]).map(digest))!==JSON.stringify(s.hashes))return {result:0};}else if(s.exists ? current==null||digest(current)!==s.hash : current!=null)return {result:0};}
  for(const w of writes)values.set(w[1],w[2]);return {result:1};
 });
 const box={module:{exports:{}},require:n=>n==='./redis'?{pipeline}:require(n)};vm.runInNewContext(source,box);
 return {api:box.module.exports,values,get bytes(){return bytes}};
}
test('large rakeback archive is sent once even when carry-forward and save both write it',async()=>{
 const raw=JSON.stringify({rows:Array.from({length:9000},(_,i)=>({groupId:'synthetic_'+i,playerId:'test',text:'x'.repeat(340)}))});
 const h=setup(raw);
 await h.api.run(async()=>{await h.api.pipeline([['GET',key]]);await h.api.pipeline([['SET',key,raw],['SET',key,raw]]);return {status:200};});
 assert(h.bytes<6*1024*1024,'request remains below the Redis 10 MiB limit');
 assert.equal(h.values.get(key),raw);
});
test('digest guards reject concurrent edits without overwriting them',async()=>{
 const h=setup('{"rows":[]}');
 await assert.rejects(h.api.run(async()=>{await h.api.pipeline([['GET',key]]);h.values.set(key,'{"rows":[1]}');await h.api.pipeline([['SET',key,'{"rows":[2]}']]);return {status:200};}),e=>e.status===409);
 assert.equal(h.values.get(key),'{"rows":[1]}');
});
test('list digest guards detect same-length report edits',async()=>{
 const h=setup('{}'),reports='poker_app:admin_report_shifts';h.values.set(reports,['one']);
 await assert.rejects(h.api.run(async()=>{await h.api.pipeline([['LRANGE',reports,'0','499']]);h.values.set(reports,['two']);await h.api.pipeline([['SET',key,'{"rows":[]}']]);return {status:200};}),e=>e.status===409);
});
