'use strict';
const fs=require('node:fs'),crypto=require('node:crypto'),{gzipSync,gunzipSync}=require('node:zlib');
const {pipeline}=require('../lib/redis');
const source=JSON.parse(fs.readFileSync(process.argv[2]));
const apply=process.argv.includes('--apply'),journal=[],handAliases=new Map();
const pack=x=>gzipSync(JSON.stringify(x)).toString('base64');
const unpack=x=>JSON.parse(gunzipSync(Buffer.from(x,'base64')));
async function send(c){for(let attempt=0;;attempt++){try{const r=await pipeline(c,{context:'position-repair',throwOnError:true,timeoutMs:20000});if(!r||r.some(x=>x.error))throw Error('Storage failure');return r.map(x=>x.result);}catch(e){if(attempt>=3||c.some(x=>['COPY','EVAL'].includes(x[0])))throw e;}}}
async function scan(pattern){let cursor='0',keys=[],pages=0;do{if(++pages>1000)throw Error('Scan limit');const [r]=await send([['SCAN',cursor,'MATCH',pattern,'COUNT',1000]]);cursor=String(r[0]);keys.push(...r[1]);}while(cursor!=='0');return [...new Set(keys)];}
async function main(){
 const stats={players:0,hands:0,changed:0,missing:0,reviews:0};
 const activeKeys=await scan('poker_app:starting-hands:*:active');let nextPlayer=0;
 async function repairPlayer(activeKey){
  const [active]=await send([['GET',activeKey]]),prefix=activeKey.slice(0,-7),key=prefix+':'+active;
  const [packed]=await send([['HGET',key,'list']]);if(!packed)throw Error('Missing list');const data=unpack(packed),updates=[];
  for(const row of data.rows){if(!handAliases.has(row.handId))handAliases.set(row.handId,new Map());for(const p of row.opponents||[])handAliases.get(row.handId).set(p.name,String(p.playerId));}
  if(apply&&data.positionsSchema==='seats-v1')return;
  for(let i=0;i<data.rows.length;i+=100){const rows=data.rows.slice(i,i+100),[replays]=apply?await send([['HMGET',key,...rows.map(r=>r.handId)]]):[[]];
   for(let j=0;j<rows.length;j++){const row=rows[j],meta=source[row.handId];stats.hands++;
    if(!meta){stats.missing++;if(apply)throw Error('Missing source '+row.handId);continue;}
    if(!meta.sessions.includes(String(row.sessionId))||Date.parse(row.playedAt)!==meta.started*1000||!Object.hasOwn(meta.positions,String(row.playerId)))throw Error('Source mismatch '+row.handId);
    if(!apply){row.position=meta.positions[row.playerId];stats.changed++;continue;}
    const replay=unpack(replays[j]),names=new Map((replay.events||[]).map(e=>[String(e.actorId),e.actor]));
    if(!handAliases.has(row.handId))handAliases.set(row.handId,new Map());
    for(const [id,name] of names)if(name&&name!=='Вы'&&name!=='Стол')handAliases.get(row.handId).set(name,id);
    replay.seats=Object.entries(meta.positions).map(([actorId,position])=>({actorId,position,actor:String(actorId)===String(row.playerId)?'Вы':names.get(actorId)||'Игрок '+actorId}));
    row.position=meta.positions[row.playerId];const next=pack(replay);if(next!==replays[j])updates.push([row.handId,next]);
   }
  }
  data.positionsSchema='seats-v1';const updated=pack(data);if(!updates.length&&updated===packed)return;
  stats.players++;stats.changed+=updates.length;
  if(apply){const version=crypto.createHash('sha256').update(active+updated+JSON.stringify(updates)).digest('hex').slice(0,24),nextKey=prefix+':'+version;
   const [exists]=await send([['EXISTS',nextKey]]);if(!exists){const [copied]=await send([['COPY',key,nextKey]]);if(Number(copied)!==1)throw Error('Copy failed');}
   updates.push(['list',updated]);for(let i=0;i<updates.length;i+=100){const batch=updates.slice(i,i+100);await send([['HSET',nextKey,...batch.flat()]]);const [check]=await send([['HMGET',nextKey,...batch.map(x=>x[0])]]);if(check.some((v,j)=>v!==batch[j][1]))throw Error('Verify failed');}
   const [ok]=await send([['EVAL',"if redis.call('GET',KEYS[1])~=ARGV[1] then return 0 end redis.call('SET',KEYS[1],ARGV[2]);return 1",1,activeKey,active,version]]);if(Number(ok)!==1)throw Error('Concurrent update');
   journal.push({activeKey,previous:active,version});fs.writeFileSync('/private/tmp/position-repair-journal.json',JSON.stringify(journal));
  }
  console.log(JSON.stringify(stats));
 }
 await Promise.all(Array.from({length:4},async()=>{while(nextPlayer<activeKeys.length)await repairPlayer(activeKeys[nextPlayer++]);}));
 // Published text: retain amounts and order, change only position prefixes.
 for(const key of await scan('poker_app:reviews:thread:*')){
  const [raw]=await send([['GET',key]]);if(!raw)continue;const t=JSON.parse(raw),meta=source[t.handId];if(!meta||t.deleted)continue;
  const ids=new Set(Object.keys(meta.positions));
  const names=require('../rating-player-id-map.json');
  const aliases=new Map(handAliases.get(t.handId)||[]);for(const id of ids){aliases.set('Игрок '+id,id);if(names[id])aliases.set(names[id],id);}
  const hero=aliases.get(t.authorNick)||aliases.get(t.authorName);
  if(hero)aliases.set('Вы',hero);
  let changed=false;
  for(const field of ['context','outcome'])if(typeof t[field]==='string')t[field]=t[field].replace(/^(?:([A-Z0-9+\/]{2,7}): )?(.+?) — /gm,(full,pos,actor)=>{const id=aliases.get(actor);if(!id)return full;const p=meta.positions[id];const next=(p==='UNKNOWN'?'':p==='BTN/SB'?'SB: ':p+': ')+actor+' — ';changed=changed||next!==full;return next;});
  if(changed){stats.reviews++;if(apply){await send([['SET',key+':before-position-repair',raw,'NX']]);const [ok]=await send([['EVAL',"if redis.call('GET',KEYS[1])~=ARGV[1] then return 0 end redis.call('SET',KEYS[1],ARGV[2]);return 1",1,key,raw,JSON.stringify(t)]]);if(Number(ok)!==1)throw Error('Review changed concurrently');}}
 }
 console.log('FINAL '+JSON.stringify(stats));
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
