'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),{enqueue,sweep,DUE,LIFETIME}=require('../lib/game-challenge-expiry');
function fixture(){const queue=new Map();return {queue,commands:async rows=>rows.map(([op,key,...args])=>{assert.equal(key,DUE);if(op==='ZADD'){queue.set(args[1],args[0]);return 1;}if(op==='ZRANGEBYSCORE')return [...queue].filter(([,at])=>at<=args[1]).map(([raw])=>raw).slice(0,25);if(op==='ZREM')return Number(queue.delete(args[0]));throw Error(op);})};}
test('challenge expires two hours from publication, never before; removed messages are idempotent',async()=>{const f=fixture(),sent=[];await enqueue({...f,chatId:-10042,messageId:77,publishedAt:1000});assert.equal([...f.queue.values()][0],1000+LIFETIME);const send=async(url,options)=>{assert.match(url,/deleteMessage$/);sent.push(JSON.parse(options.body));return {json:async()=>({ok:true})};};assert.deepEqual(await sweep({...f,token:'test',now:1000+LIFETIME-1,send}),{deleted:0,failed:0});assert.equal(sent.length,0);assert.deepEqual(await sweep({...f,token:'test',now:1000+LIFETIME,send}),{deleted:1,failed:0});assert.deepEqual(sent,[{chat_id:'-10042',message_id:77}]);await sweep({...f,token:'test',now:1000+LIFETIME+100,send});assert.equal(sent.length,1);});
test('Telegram failure remains queued for retry; already deleted message completes the timer',async()=>{const f=fixture();await enqueue({...f,chatId:-10042,messageId:88,publishedAt:1});assert.deepEqual(await sweep({...f,token:'test',now:LIFETIME+1,send:async()=>{throw Error('offline');}}),{deleted:0,failed:1});assert.equal(f.queue.size,1);assert.deepEqual(await sweep({...f,token:'test',now:LIFETIME+2,send:async()=>({json:async()=>({ok:false,description:'Bad Request: message to delete not found'})})}),{deleted:1,failed:0});assert.equal(f.queue.size,0);});
test('invalid or private messages are never scheduled',async()=>{const f=fixture();assert.equal(await enqueue({...f,chatId:123,messageId:77}),false);assert.equal(await enqueue({...f,chatId:-123,messageId:null}),false);assert.equal(f.queue.size,0);});
test('cancellation deletes the saved invitation immediately for both game families',async()=>{
 for(const family of ['board-games','billiards']){const f=fixture(),sent=[];await enqueue({...f,chatId:-10042,messageId:99,publishedAt:1000});const commands=async rows=>rows[0][0]==='GET'?(assert.equal(rows[0][1],'poker_app:'+family+':challenge:room:ABCDEFGHJK'),[JSON.stringify({chat:-10042,messageId:99})]):f.commands(rows);
 const deleted=await require('../lib/game-challenge-expiry').cancel({family,roomId:'ABCDEFGHJK',commands,token:'test',send:async(url,options)=>{assert.match(url,/deleteMessage$/);sent.push(JSON.parse(options.body));return {json:async()=>({ok:true})};}});
 assert.equal(deleted,true);assert.deepEqual(sent,[{chat_id:'-10042',message_id:99}]);assert.equal(f.queue.size,0);
 }
});
test('failed cancellation deletion is due immediately and cron retries it; absent invitation is silent',async()=>{
 const f=fixture(),commands=async rows=>rows[0][0]==='GET'?[JSON.stringify({chat:-10042,messageId:99})]:f.commands(rows);
 assert.equal(await require('../lib/game-challenge-expiry').cancel({family:'board-games',roomId:'ABCDEFGHJK',commands,token:'test',send:async()=>{throw Error('offline');}}),false);
 assert.equal([...f.queue.values()][0],0);
 assert.deepEqual(await sweep({...f,token:'test',now:1,send:async()=>({json:async()=>({ok:true})})}),{deleted:1,failed:0});
 assert.equal(await require('../lib/game-challenge-expiry').cancel({family:'board-games',roomId:'ABCDEFGHJK',commands:async()=>[null],token:'test',send:async()=>{throw Error('Must not send');}}),false);
});
test('accepted billiards, chess and backgammon invitations delete immediately',async()=>{
 for(const [family,discipline] of [['billiards','pool8'],['board-games','chess'],['board-games','long'],['board-games','short']]){
  const f=fixture();let sent=0;
  const commands=async rows=>rows[0][0]==='GET'?[JSON.stringify({chat:-10042,messageId:99})]:f.commands(rows);
  const result=await require('../lib/game-challenge-expiry').accepted({family,discipline,roomId:'ABCDEFGHJK',commands,token:'test',send:async()=>{sent++;return {json:async()=>({ok:true})};}});
  assert.equal(result,true);assert.equal(sent,1);
 }
});
test('accepted announcements last five minutes, then expire without touching results',async()=>{
 const f=fixture();await require('../lib/game-challenge-expiry').enqueueAccepted({...f,chatId:-10042,messageId:123,publishedAt:1000});
 const send=async()=>({json:async()=>({ok:true})});
 assert.deepEqual(await sweep({...f,token:'test',now:300999,send}),{deleted:0,failed:0});
 assert.deepEqual(await sweep({...f,token:'test',now:301000,send}),{deleted:1,failed:0});
});
test('rating answer and command expire after ten minutes',async()=>{
 const f=fixture(),expiry=require('../lib/game-challenge-expiry');
 for(const messageId of [101,102])await expiry.enqueueRating({...f,chatId:-10042,messageId,publishedAt:1000});
 const send=async()=>({json:async()=>({ok:true})});
 assert.deepEqual(await sweep({...f,token:'test',now:600999,send}),{deleted:0,failed:0});
 assert.deepEqual(await sweep({...f,token:'test',now:601000,send}),{deleted:2,failed:0});
});
