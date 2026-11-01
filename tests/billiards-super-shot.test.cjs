'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),{create}=require('../lib/billiards-super-shot'),{TEMPLATES}=require('../lib/billiards-super-shot-layout');
function fixture(){
 const values=new Map(),credits=new Map();let locked=false,failCredit=false,loseReceipt=false;
 const room={id:'ABCDEFGHJK',superShotVersion:1,wagered:true,gameXpStake:300,gameXpActions:[2,3],players:['host','guest'],playerProfiles:[{accountId:'ID123456'},{accountId:'ID654321'}],state:{winner:0},match:{number:1,round:1}};
 const view={ready:true,roomId:room.id,player:0,state:{winner:0},wager:{stake:300,status:'playing'}};
 const commands=async queries=>queries.map(([op,key,value,...args])=>{if(op==='GET')return key==='poker_app:billiards:v1:'+room.id?JSON.stringify(room):values.get(key)||null;if(op==='SET'){if(args.includes('NX')&&values.has(key))return null;if(args.includes('XX')&&!values.has(key))return null;values.set(key,value);if(loseReceipt&&JSON.parse(value).credited){loseReceipt=false;throw Error('lost write response');}return 'OK';}throw Error(op);});
 const service=create({commands,choose:()=>0,acquire:async()=>{if(locked)return null;locked=true;return {};},release:async()=>{locked=false;},credit:async input=>{if(failCredit){failCredit=false;throw Error('temporary credit failure');}if(!credits.has(input.sourceId))credits.set(input.sourceId,input);return {wins:credits.size,tokens:credits.size,unlockedCues:['decisive'],badge:true};}});
 return {service,room,view,credits,values,failCredit:()=>failCredit=true,loseReceipt:()=>loseReceipt=true};
}
const shot=TEMPLATES[0].reference;
test('only winners of new played paid games from 300 receive one persistent offer per round',async()=>{
 const f=fixture();for(const stake of [0,100,299]){f.view.wager.stake=stake;assert.equal(await f.service.offer({member:'host',view:f.view}),null);}f.view.wager.stake=300;
 assert.equal(await f.service.offer({member:'guest',view:f.view}),null);
 f.room.state.winner='draw';assert.equal(await f.service.offer({member:'host',view:f.view}),null);f.room.state.winner=0;
 delete f.room.superShotVersion;assert.equal(await f.service.offer({member:'host',view:f.view}),null);f.room.superShotVersion=1;
 f.room.gameXpActions=[2,0];assert.equal(await f.service.offer({member:'host',view:f.view}),null);f.room.gameXpActions=[2,3];
 const a=await f.service.offer({member:'host',view:f.view}),b=await f.service.offer({member:'host',view:f.view});assert.deepEqual(a,b);assert.equal(a.status,'ready');assert.equal('reference' in a,false);
 f.room.match.round=2;assert.notEqual((await f.service.offer({member:'host',view:f.view})).event,a.event);
});
test('one successful physics shot grants a trophy and token once; guests cannot claim and retries cannot shoot again',async()=>{
 const f=fixture(),offer=await f.service.offer({member:'host',view:f.view}),body={roomId:offer.roomId,event:offer.event,...shot};
 await assert.rejects(f.service.submit({member:'guest',body}),e=>e.status===403);
 await assert.rejects(f.service.submit({member:'host',body:{...body,angle:Infinity}}),e=>e.status===400);
 const a=await f.service.submit({member:'host',body});assert.equal(a.superShot.success,true);assert.equal(a.superShot.credited,true);assert.equal(f.credits.size,1);assert.equal(a.superShot.reward.tokens,1);assert.equal(a.superShot.reward.wins,1);assert.equal('amount' in [...f.credits.values()][0],false);assert.equal([...f.credits.values()][0].userId,'ID123456');
 const b=await f.service.submit({member:'host',body:{...body,angle:Math.PI}});assert.deepEqual(JSON.parse(JSON.stringify(b)),JSON.parse(JSON.stringify(a)));assert.equal(f.credits.size,1);
});
test('miss consumes the only shot and cannot be replaced by a winning retry',async()=>{
 const f=fixture(),offer=await f.service.offer({member:'host',view:f.view}),body={roomId:offer.roomId,event:offer.event,angle:Math.PI,power:.1};
 assert.equal((await f.service.submit({member:'host',body})).superShot.success,false);
 assert.equal((await f.service.submit({member:'host',body:{...body,...shot}})).superShot.success,false);assert.equal(f.credits.size,0);
});
test('credit failures and lost storage replies recover without a second reward',async()=>{
 for(const failure of ['failCredit','loseReceipt']){const f=fixture(),offer=await f.service.offer({member:'host',view:f.view}),body={roomId:offer.roomId,event:offer.event,...shot};f[failure]();await assert.rejects(f.service.submit({member:'host',body}));const response=await f.service.submit({member:'host',body});assert.equal(response.superShot.credited,true);assert.equal(f.credits.size,1);}
});

test('series awards one attempt only after the whole match is won',async()=>{
 const f=fixture();f.room.match={target:3,number:1,round:1,winner:null};
 assert.equal(await f.service.offer({member:'host',view:f.view}),null);
 f.room.match.round=3;assert.equal(await f.service.offer({member:'host',view:f.view}),null);
 f.room.match.winner=0;const a=await f.service.offer({member:'host',view:f.view});assert.equal(a.status,'ready');
 f.room.match.round=4;const b=await f.service.offer({member:'host',view:f.view});assert.equal(b.event,a.event);
 f.room.match.number=2;const c=await f.service.offer({member:'host',view:f.view});assert.notEqual(c.event,a.event);
});
