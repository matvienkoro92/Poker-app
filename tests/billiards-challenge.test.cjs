'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
test('challenge only for waiting host; fixed chat, deep link, format and duplicate protection',async()=>{
 const milestones=require('../lib/tracking-link-milestones'),policy=require('../lib/telegram-group-policy'),oldGroup=milestones.playersGroup,oldSend=policy.guardedFetch;
 let sent=[],reserved=false,view={turnSeconds:45,player:0,ready:false,state:{discipline:'pyramid',winner:null},match:{target:3}};
 milestones.playersGroup=async()=>'-100123';policy.guardedFetch=async(url,options,scope)=>{sent.push({body:JSON.parse(options.body),scope});return {ok:true,json:async()=>({ok:true})};};
 const args={member:'host',roomId:'ABCDEFGHJK',token:'test',service:{call:async()=>view},commands:async()=>{if(reserved)return [0];reserved=true;return [1];}};
 try{const run=require('../lib/billiards-challenge');view.player=1;await assert.rejects(run(args),e=>e.status===409);assert.equal(sent.length,0);view.player=0;view.ready=true;await assert.rejects(run(args),e=>e.status===409);view.ready=false;await run(args);assert.equal(sent.length,1);assert.equal(sent[0].scope,'billiards-challenge');assert.equal(sent[0].body.chat_id,'-100123');assert.match(sent[0].body.text,/Русский.*\n|Русский/);assert.match(sent[0].body.text,/до 3 побед/);assert.match(sent[0].body.text,/45 сек. на ход/);assert.match(sent[0].body.reply_markup.inline_keyboard[0][0].url,/startapp=billiards_ABCDEFGHJK$/);await assert.rejects(run(args),e=>e.status===429);assert.equal(sent.length,1);}finally{milestones.playersGroup=oldGroup;policy.guardedFetch=oldSend;}
});
test('challenge button flow creates room before publishing and keeps polling',async()=>{
 const {createSession}=await import('../scripts/billiards/network.mjs');const calls=[],updates=[];
 const session=createSession({request:async body=>{calls.push(body);return body.action==='create'?{roomId:'ABCDEFGHJK',revision:0}:{ok:true};},onUpdate:d=>updates.push(d),onError:e=>assert.fail(e)});
 try{await session.start(true,'',{discipline:'pyramid',color:'red',raceTo:3,challenge:true});assert.deepEqual(calls.map(c=>c.action),['create','challenge']);assert.equal(calls[1].roomId,'ABCDEFGHJK');assert.equal(updates[1].challengeSent,true);}finally{session.close();}
});
