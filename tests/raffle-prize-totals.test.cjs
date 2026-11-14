'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const index=require('../lib/raffle-prize-totals');
function fixture(){
 const strings=new Map(),hashes=new Map(),calls=[];
 const pipeline=async commands=>commands.map(([op,key,...args])=>{
  calls.push([op,key,...args]);
  if(op==='GET')return {result:strings.get(key)||null};
  if(op==='HMGET')return {result:args.map(field=>hashes.get(key)?.[field]??null)};
  throw Error('Unexpected command '+op);
 });return {pipeline,strings,hashes,calls};
}
test('contributions count each valid prize once and resolve bound Telegram aliases to canonical account',async()=>{
 const f=fixture();f.hashes.set('poker_app:visitor_dt_ids',{tg_777:'ID000001'});f.hashes.set('poker_app:account_redirects',{ID000001:'ID000009'});
 const row={userId:'tg_777',prize:'300 ₽'},raffle={winners:[{...row,winnerReadySlotId:'a'},{...row,winnerReadySlotId:'a'},{accountId:'ID000009',prize:'500 ₽',winnerReadySlotId:'b'},{...row,winnerBurned:true},{...row,winnerStatus:'fail'}]};
 assert.deepEqual(await index.contributions([raffle,{...raffle,status:'cancelled'}],f.pipeline),[{ID000009:80000},{}]);
});
test('atomic save adjusts prior projection under a value guard, including prize cancellation',async()=>{
 const f=fixture(),key='poker_app:raffle:a';f.strings.set(index.P+'raffle:a',JSON.stringify({ID000009:80000}));
 const result=await index.prepare([['SET',key,JSON.stringify({status:'cancelled',winners:[]})]],{atomic:true,values:[{key:'lock-source',value:'old'}]},f.pipeline);
 assert.ok(result.commands.some(c=>c[0]==='HINCRBY'&&c[1]===index.TOTALS&&c[2]==='ID000009'&&c[3]===-80000));
 assert.deepEqual(result.values,[{key:'lock-source',value:'old'},{key:index.P+'raffle:a',value:'{"ID000009":80000}'}]);
});
test('ordinary save and delete maintain their prize projection in the same Redis script',async()=>{
 const f=fixture(),commands=[['SET','poker_app:raffle:a','{"winners":[]}'],['DEL','poker_app:raffle:b'],['GET','another-key']];
 const result=await index.prepare(commands,{},f.pipeline);
 assert.equal(result.commands[0][0],'EVAL');assert.equal(result.commands[1][0],'EVAL');assert.deepEqual(result.commands[2],commands[2]);
 assert.equal(result.commands[0][7],'set');assert.equal(result.commands[1][7],'delete');
});
test('player read uses only ready marker and saved totals, never the raffle archive',async()=>{
 const f=fixture();f.strings.set(index.READY,'1');f.hashes.set(index.TOTALS,{ID000009:'60000',tg_777:'30000'});
 assert.deepEqual(await index.read('ID000009',777,f.pipeline),{available:true,amount:900});
 assert.deepEqual(f.calls.map(c=>c[0]),['GET','HMGET']);
 f.strings.delete(index.READY);assert.deepEqual(await index.read('ID000009',777,f.pipeline),{available:false});
});
