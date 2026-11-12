'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {enqueue,create}=require('../lib/nards-jackpot-notification');
function fixture(){
 const keys=new Map(),sets=new Map(),messages=[];let rejection=false,timeout=false,group='-123';
 const commands=async rows=>rows.map(([op,key,value,...args])=>{
  if(op==='GET')return keys.get(key);
  if(op==='DEL')return keys.delete(key);
  if(op==='EXPIRE')return 1;
  if(op==='SET'){if(args.includes('NX')&&keys.has(key))return null;keys.set(key,value);return 'OK';}
  if(op==='ZADD'){if(!sets.has(key))sets.set(key,new Set());sets.get(key).add(args[0]);return 1;}
  if(op==='ZRANGE')return [...(sets.get(key)||[])];
  if(op==='ZREM')return sets.get(key)?.delete(value);
  throw Error(op);
 });
 const notify=create({commands,playersGroup:async()=>group,send:async body=>{messages.push(body);if(timeout)throw Error('timeout');return {ok:!rejection,json:async()=>({ok:!rejection,result:{message_id:55}})};}});
 const room={id:'ABCDEFGHJK',state:{discipline:'long'},playerProfiles:[{name:'Анна <&> 🐵'},{name:'Вика'}]};
 const award={id:'jackpot_1',player:0,face:4,revision:12};
 return {keys,messages,room,award,commands,notify,reject:value=>rejection=value,timeout:()=>timeout=true,group:value=>group=value};
}
test('announces committed reward once despite concurrent polls, with literal nickname and prize',async()=>{
 const f=fixture();assert.equal(await f.notify(f.room.id),false);
 await f.commands(enqueue(f.room,f.award));
 await Promise.all(Array.from({length:8},()=>f.notify(f.room.id)));
 assert.equal(f.messages.length,1);assert.equal(f.messages[0].chat_id,'-123');
 assert.match(f.messages[0].text,/Анна <&> 🐵/);assert.match(f.messages[0].text,/4:4 три раза подряд/);assert.match(f.messages[0].text,/1000 ₽/);assert.equal(f.messages[0].parse_mode,undefined);
 await f.notify(f.room.id);assert.equal(f.messages.length,1);
});
test('paid rooms announce the same ticket; separate jackpot events are independent',async()=>{
 const f=fixture();f.room.wagered=true;
 await f.commands(enqueue(f.room,f.award));await f.notify(f.room.id);
 await f.commands(enqueue(f.room,{...f.award,id:'jackpot_2',player:1,face:6}));await f.notify(f.room.id);
 assert.equal(f.messages.length,2);assert.match(f.messages[0].text,/на фишки/);assert.match(f.messages[1].text,/Вика/);
});
test('explicit Telegram rejection allows retry; uncertain timeout never sends a duplicate',async()=>{
 const f=fixture();await f.commands(enqueue(f.room,f.award));f.reject(true);
 await assert.rejects(f.notify(f.room.id));f.reject(false);await f.notify(f.room.id);assert.equal(f.messages.length,2);
 const g=fixture();await g.commands(enqueue(g.room,g.award));g.timeout();await assert.rejects(g.notify(g.room.id));await g.notify(g.room.id);assert.equal(g.messages.length,1);
});
test('missing group retains queued notification and invalid room ids never send',async()=>{
 const f=fixture();await f.commands(enqueue(f.room,f.award));f.group('');await f.notify(f.room.id);await f.notify('bad');assert.equal(f.messages.length,0);f.group('-123');await f.notify(f.room.id);assert.equal(f.messages.length,1);
});
