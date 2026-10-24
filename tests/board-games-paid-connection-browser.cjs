'use strict';
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),fixture=require('./helpers/board-wager-fixture.cjs');
(async()=>{const browser=await chromium.launch();try{for(const kind of ['chess','short','long']){
 const f=fixture(),errors=[],polls={m1:0,m2:0},faults={m1:[],m2:[]};
 async function player(member){const p=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});p.on('pageerror',e=>errors.push(e.message));await p.route('http://paid-board.test/**',async route=>{
  const u=new URL(route.request().url());if(u.pathname==='/api/billiards')return route.fulfill({json:{ok:true}});
  if(u.pathname==='/api/board-games'){const body=route.request().postDataJSON();if(body.action==='access')return route.fulfill({json:{ok:true,allowed:true,equipment:{},level:0}});
   if(body.action==='room'){polls[member]++;const status=faults[member].shift();if(status)return route.fulfill({status,json:{ok:false,error:status===409?'Комната обновляется':'Временная ошибка сервера'}});}
   try{return route.fulfill({json:await f.service.call(member,body)});}catch(e){return route.fulfill({status:e.status||503,json:{ok:false,error:e.message}});}
  }
  const file=path.join(process.cwd(),u.pathname);return fs.existsSync(file)&&fs.statSync(file).isFile()?route.fulfill({path:file}):route.fulfill({status:404});
 });return p;}
 const room=await f.service.call('m1',{action:'create',discipline:kind,turnSeconds:kind==='chess'?60:30,stake:300,requestId:'board_connection_300',raceTo:1,timeControl:kind==='chess'?'blitz-3-2':undefined}),host=await player('m1'),guest=await player('m2');
 for(const p of [host,guest]){await p.goto('http://paid-board.test/board-games-play.html?game='+kind+'&room='+room.roomId);await p.locator('#confirm[open] [data-yes]').click();await p.waitForFunction(()=>PokerBoardGames.inspect().mode==='online');}
 for(const p of [host,guest])await p.waitForFunction(()=>PokerBoardGames.inspect().ready);
 assert.equal(f.balances.get('p1'),9700);assert.equal(f.balances.get('p2'),9700);
 f.locks.add(room.roomId);const before={...polls};try{await host.waitForTimeout(2300);assert.ok(polls.m1>=before.m1+2&&polls.m2>=before.m2+2);for(const p of [host,guest])assert.equal(await p.evaluate(()=>PokerBoardGames.inspect().ready),true);}finally{f.locks.delete(room.roomId);}
 faults.m1=[409];faults.m2=[503];await Promise.all([host,guest].map(async p=>{await p.waitForFunction(()=>document.getElementById('connection').textContent.includes('переподключаемся'));await p.waitForFunction(()=>!document.getElementById('connection').textContent);}));
 if(kind==='chess'){await host.locator('[data-square=e2]').click();await host.locator('[data-square=e4]').click();await guest.waitForFunction(()=>PokerBoardGames.inspect().state.ply===1);assert.match(await guest.locator('#clock').innerText(),/Белые.*Чёрные/);}
 else{const current=(await host.evaluate(()=>PokerBoardGames.inspect().state.turn))===0?host:guest;const count=await current.evaluate(()=>PokerBoardGames.inspect().state.rollCount||0);await current.locator('#roll').click();await current.waitForFunction(before=>(PokerBoardGames.inspect().state.rollCount||0)>before,count);await current.waitForFunction(()=>!document.querySelector('.board-dice-stage.is-rolling'));assert.equal(await current.locator('.dice-cube').count(),2);}
 await host.waitForTimeout(1500);for(const p of [host,guest])assert.equal(await p.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length),0,'Idle board must not keep animating');
 await guest.locator('[data-resign]').click();await guest.locator('#confirm [data-yes]').click();for(const p of [host,guest])await p.waitForFunction(()=>PokerBoardGames.inspect().wager?.status==='paid');
 assert.equal(f.balances.get('p1'),10240);assert.equal(f.balances.get('p2'),9700);assert.equal(f.changes.length,3);assert.deepEqual(errors,[]);for(const p of [host,guest])await p.close();console.log('PASS '+kind+': two mobile players, 300-chip stakes, recovery, real move/dice, idle animations stop, single 540-chip payout');
 }}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
