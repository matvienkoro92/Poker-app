'use strict';
const crypto=require('node:crypto');
const PREFIX='poker_app:game-chat:v1:',LIMIT=80;
const RATE="local n=redis.call('INCR',KEYS[1]);if n==1 then redis.call('EXPIRE',KEYS[1],60) end;return n";
const SEND=`
local previous=redis.call('GET',KEYS[3])
if previous then return previous end
if not redis.call('SET',KEYS[4],'1','NX','PX',800) then return '' end
local message=cjson.decode(ARGV[1]);message.sequence=redis.call('INCR',KEYS[2])
local encoded=cjson.encode(message)
redis.call('RPUSH',KEYS[1],encoded);redis.call('LTRIM',KEYS[1],-80,-1)
redis.call('EXPIRE',KEYS[1],86400);redis.call('EXPIRE',KEYS[2],86400)
redis.call('SET',KEYS[3],encoded,'EX',86400)
return encoded`;
function fail(status,text){const e=Error(text);e.status=status;throw e;}
async function handle({family,member,body,commands,now=Date.now}){
 if(!['board-games','billiards'].includes(family)||!/^[A-HJ-NP-Z2-9]{10}$/.test(String(body.roomId||'')))fail(400,'Неверная комната.');
 const sending=body.action==='chat-send';if(!sending&&body.action!=='chat-read')fail(400,'Неизвестное действие чата.');
 const base=PREFIX+family+':'+body.roomId;
 const rows=[['EVAL',RATE,1,PREFIX+'rate:'+member+':'+(sending?'send':'read')],['GET','poker_app:'+family+':v1:'+body.roomId]];
 if(!sending)rows.push(['LRANGE',base+':messages',-LIMIT,-1]);
 const [rate,raw,messages]=await commands(rows);
 if(Number(rate)>(sending?30:120))fail(429,'Слишком часто. Подождите немного.');
 let room;try{room=JSON.parse(raw);}catch{}
 if(!room||room.cancelled||room.expires<now())fail(404,'Комната закрыта или истекла.');
 if(family==='board-games'&&!['chess','short','long'].includes(room.state?.discipline))fail(403,'Чат этой игры недоступен.');
 if(!sending){const history=(messages||[]).map(row=>JSON.parse(row)),since=Number.isSafeInteger(body.sinceSequence)&&body.sinceSequence>=0?body.sinceSequence:0;return {ok:true,messages:history.filter(message=>message.sequence>since),sequence:history.at(-1)?.sequence||0};}
 const player=room.players?.indexOf(String(member));if(![0,1].includes(player))fail(403,'Писать в чат могут участники этой комнаты.');
 if(typeof body.text!=='string'||body.text.length>1000)fail(400,'Сообщение должно содержать до 500 символов.');
 const text=body.text.replace(/[\u0000-\u0008\u000b-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/g,'').trim();
 if(!text||Array.from(text).length>500)fail(400,'Напишите сообщение до 500 символов.');
 if(!/^[a-zA-Z0-9_-]{16,80}$/.test(String(body.messageId||'')))fail(400,'Неверный номер сообщения.');
 const message={id:crypto.randomUUID(),clientId:body.messageId,player,nick:String(room.playerProfiles?.[player]?.name||'Игрок '+(player+1)).slice(0,80),text,createdAt:now()};
 const [saved]=await commands([['EVAL',SEND,4,base+':messages',base+':sequence',base+':sent:'+player+':'+body.messageId,base+':cooldown:'+player,JSON.stringify(message)]]);
 if(!saved)fail(429,'Подождите секунду перед следующим сообщением.');
 return {ok:true,message:JSON.parse(saved)};
}
module.exports={handle,SEND,RATE};
