'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const handler=require('../lib/api-handlers/nards-tournaments');
function response(){return {code:200,status(n){this.code=n;return this;},setHeader(){},json(d){this.body=d;return this;},end(){return this;}};}
for(const action of ['list','get','create','join','ready','draw','cancel'])test('tournament '+action+' rejects unverified identities',async()=>{
 const res=response();await handler({method:'POST',headers:{},body:{action,isAdmin:true,admin:true,memberId:'388008256'}},res);assert.equal(res.code,401);
});
test('tournament method and request size checks precede mutation',async()=>{
 const a=response();await handler({method:'GET',headers:{}},a);assert.equal(a.code,405);
 const b=response();await handler({method:'POST',headers:{'content-length':'20000'},body:{}},b);assert.equal(b.code,413);
});

test('tournament rooms do not trigger ordinary game or challenge notifications',async()=>{
 const forbidden=async()=>{throw Error('must not send or touch notification storage');},view={tournament:{id:'ABCDEFGHJK'},ready:true,roomId:'ABCDEFGHJK',player:1,state:{winner:0,discipline:'long'}};
 const notify=require('../lib/game-result-notification').create({commands:forbidden,playersGroup:forbidden,send:forbidden});
 assert.equal(await notify(view,'board-games'),false);
 await require('../lib/game-accepted-private')({view,token:'fixture',commands:forbidden,loadRoom:forbidden});
 await assert.rejects(require('../lib/board-games-challenge')({token:'fixture',service:{call:async()=>view},member:'m1',roomId:view.roomId,commands:forbidden}),{status:409});
});

test('the ready reminder targets a private Telegram chat only',async t=>{
 const sent=[];
 t.mock.method(globalThis,'fetch',async (_url,options)=>{
  sent.push(JSON.parse(options.body));
  return {ok:true,status:200,json:async()=>({ok:true})};
 });
 const {sendReady}=require('../lib/nards-tournament-notifications');
 await sendReady({member:'tg_-100123'},{text:'Напоминание'},'fixture');
 await sendReady({member:'vk_123'},{text:'Напоминание'},'fixture');
 await sendReady({member:'tg_123'},{text:'Напоминание',chat_id:'-100123'},'fixture');
 assert.deepEqual(sent,[{text:'Напоминание',chat_id:'123'}]);
});
