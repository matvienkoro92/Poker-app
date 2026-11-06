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

test('tournament games do not introduce group or private Telegram notifications',async()=>{
 const forbidden=async()=>{throw Error('must not send or touch notification storage');},view={tournament:{id:'ABCDEFGHJK'},ready:true,roomId:'ABCDEFGHJK',player:1,state:{winner:0,discipline:'long'}};
 const notify=require('../lib/game-result-notification').create({commands:forbidden,playersGroup:forbidden,send:forbidden});
 assert.equal(await notify(view,'board-games'),false);
 await require('../lib/game-accepted-private')({view,token:'fixture',commands:forbidden,loadRoom:forbidden});
 await assert.rejects(require('../lib/board-games-challenge')({token:'fixture',service:{call:async()=>view},member:'m1',roomId:view.roomId,commands:forbidden}),{status:409});
});
