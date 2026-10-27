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
 assert.equal(f.balances.get('p1'),9700);assert.equal(f.balances.get('p2'),9700);
 const before={...polls};f.locks.add(room.roomId);
 try{for(const member of ['m1','m2']){const p=member==='m1'?host:guest;await p.waitForFunction(()=>PokerBilliards.inspect().ready);}
  await host.waitForTimeout(2200);assert.ok(polls.m1>=before.m1+2&&polls.m2>=before.m2+2);assert.equal(f.changes.length,2);
  for(const p of [host,guest]){assert.equal(await p.evaluate(()=>PokerBilliards.inspect().ready),true);assert.doesNotMatch(await p.locator('#connection').innerText(),/Комната обновляется/);}
 }finally{f.locks.delete(room.roomId);}
 faults.m1=[409,409];faults.m2=[503];await host.waitForTimeout(2800);
 for(const p of [host,guest]){assert.equal(await p.evaluate(()=>PokerBilliards.inspect().ready),true);assert.doesNotMatch(await p.locator('#connection').innerText(),/ошибка|обновляется/);}
 await guest.evaluate(()=>{window.dispatchEvent(new PageTransitionEvent('pagehide',{persisted:true}));window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}));window.dispatchEvent(new Event('online'));});await guest.waitForTimeout(900);assert.equal(await guest.evaluate(()=>PokerBilliards.inspect().ready),true);await guest.reload();await guest.waitForFunction(()=>PokerBilliards.inspect().ready);assert.equal(await guest.locator('#joinConfirmation[open]').count(),0);assert.equal(f.balances.get('p2'),9700);
 await guest.locator('[data-resign]').click();await guest.locator('.billiards-settlement-dialog [data-confirm]').click();
 await host.waitForFunction(()=>PokerBilliards.inspect().state.winner===0);await guest.waitForFunction(()=>PokerBilliards.inspect().state.winner===0);
 assert.equal(f.journals.get(room.roomId).status,'paid');assert.equal(f.balances.get('p1'),10270);assert.equal(f.balances.get('p2'),9700);assert.equal(f.changes.length,3);assert.deepEqual(errors,[]);
 console.log('PASS two mobile players: 300-chip stakes, concurrent polls, temporary 409/503 recovery and single 570-chip payout');
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
