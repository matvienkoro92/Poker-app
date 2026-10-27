'use strict';
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),fixture=require('./helpers/billiards-wager-fixture.cjs');
(async()=>{const f=fixture(),browser=await chromium.launch({args:['--use-angle=metal']});try{
 const errors=[],polls={m1:0,m2:0},faults={m1:[],m2:[]};
 async function player(member){const p=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});p.on('pageerror',e=>errors.push(e.message));await p.route('http://paid.test/**',async route=>{
  const u=new URL(route.request().url());if(u.pathname==='/api/billiards'){
   const body=route.request().postDataJSON();if(['access','participation'].includes(body.action))return route.fulfill({json:{ok:true,allowed:true}});
   if(body.action==='room'){polls[member]++;const status=faults[member].shift();if(status)return route.fulfill({status,json:{ok:false,error:status===409?'Комната обновляется. Попробуйте через несколько секунд.':'Временная ошибка сервера'}});}
   try{return route.fulfill({json:await f.service.call(member,body)});}catch(e){return route.fulfill({status:e.status||503,json:{ok:false,error:e.message}});}
  }
  const file=path.join(process.cwd(),u.pathname);return fs.existsSync(file)&&fs.statSync(file).isFile()?route.fulfill({path:file}):route.fulfill({status:404});
 });return p;}
 const room=await f.create(300),host=await player('m1'),guest=await player('m2');
 for(const p of [host,guest]){await p.goto('http://paid.test/billiards-play.html?room='+room.roomId);if(p===guest)await p.locator('[data-accept]').click();}
 for(const p of [host,guest])await p.waitForFunction(()=>PokerBilliards.inspect().ready);
 const viewer=await player('m3');await viewer.goto('http://paid.test/billiards-play.html?watch='+room.roomId);await viewer.waitForFunction(()=>window.PokerBilliards?.inspect().ready&&PokerBilliards.inspect().spectating);
 assert.equal(f.balances.get('p1'),9700);assert.equal(f.balances.get('p2'),9700);
 const joined=await f.call('m1','room',room.roomId);await f.call('m1','move',room.roomId,{revision:joined.revision,move:{type:'shot',angle:0,power:.18}});
 for(const p of [host,guest,viewer])await p.waitForFunction(()=>PokerBilliards.inspect().replay.available&&!PokerBilliards.inspect().state.moving&&!PokerBilliards.inspect().replay.ready,{},{timeout:30000});
 for(const p of [host,guest,viewer]){await p.waitForFunction(()=>!document.querySelector('#watchShot').disabled);await p.evaluate(()=>document.querySelector('#decisionDialog')?.close());}
 const serverBefore=JSON.stringify(f.rooms.get(room.roomId)),debits=f.changes.length;
 for(const p of [host,guest,viewer]){await p.locator('#watchShot').click();await p.waitForFunction(()=>PokerBilliards.inspect().replay.viewing);assert.equal(await p.locator('#shoot').isDisabled(),true);await p.locator('#watchShot').click();await p.waitForFunction(()=>!PokerBilliards.inspect().replay.viewing);}
 assert.equal(JSON.stringify(f.rooms.get(room.roomId)),serverBefore);assert.equal(f.changes.length,debits);
 await host.evaluate(()=>document.querySelector('#decisionDialog')?.close());await host.locator('#watchShot').click();await host.waitForFunction(()=>!PokerBilliards.inspect().replay.viewing,{},{timeout:30000});assert.equal(f.changes.length,debits);
 await host.evaluate(()=>document.querySelector('#decisionDialog')?.close());await host.locator('#watchShot').click();await host.waitForFunction(()=>PokerBilliards.inspect().replay.viewing);
 f.elapse(f.rooms.get(room.roomId).playback.durationMs+400);const latest=await f.call('m2','room',room.roomId);await f.call('m2','move',room.roomId,{revision:latest.revision,move:{type:'resign'}});
 await host.waitForFunction(()=>!PokerBilliards.inspect().replay.viewing);
 await host.waitForFunction(()=>PokerBilliards.inspect().state.winner===0);await guest.waitForFunction(()=>PokerBilliards.inspect().state.winner===0);
 assert.equal(f.journals.get(room.roomId).status,'paid');assert.equal(f.balances.get('p1'),10270);assert.equal(f.balances.get('p2'),9700);assert.equal(f.changes.length,3);assert.deepEqual(errors,[]);
 const practice=await player('m1');await practice.goto('http://paid.test/billiards-play.html');await practice.locator('[data-mode=training]').click();for(let i=0;i<3;i++)await practice.locator('#setupNext').click();await practice.waitForFunction(()=>PokerBilliards.inspect().mode==='training');const initial=await practice.evaluate(()=>PokerBilliards.inspect().state);await practice.locator('#shoot').click();await practice.waitForFunction(()=>PokerBilliards.inspect().training.available);await practice.locator('#restoreShot').click();assert.deepEqual(await practice.evaluate(()=>PokerBilliards.inspect().state),initial);await practice.locator('#repeatShot').click();await practice.waitForFunction(()=>PokerBilliards.inspect().state.moving);assert.equal(await practice.locator('#watchShot').isVisible(),false);assert.deepEqual(errors,[]);
 console.log('PASS online shot replay, exit and automatic return without room mutation or extra payment');
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
