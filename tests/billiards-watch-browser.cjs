'use strict';
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const factory=require('../lib/billiards-room');
(async()=>{
 const rooms=new Map(),service=factory({profile:async member=>({name:member==='host'?'ПокерМанки':'Алексей'}),load:async id=>structuredClone(rooms.get(id)),create:async(id,r)=>{rooms.set(id,structuredClone(r));return true;},cas:async(id,rev,r)=>{if(rooms.get(id)?.revision!==rev)return false;rooms.set(id,structuredClone(r));return true;}});
 const host=await service.call('host',{action:'create',turnSeconds:90,discipline:'pyramid'});await service.call('guest',{action:'join',roomId:host.roomId});
 const browser=await chromium.launch({args:process.env.BILLIARDS_HARDWARE?['--use-angle=metal']:['--enable-unsafe-swiftshader']});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}}),workers=[],errors=[];page.on('worker',w=>workers.push(w.url()));page.on('pageerror',e=>errors.push(e.message));let delayed=false;
  await page.route('http://replay.test/**',async route=>{const url=new URL(route.request().url());if(url.pathname==='/api/billiards'){const body=route.request().postDataJSON();if(body.action==='access')return route.fulfill({json:{ok:true,allowed:true}});try{const result=await service.call('viewer',body);if(body.action==='watch'&&result.playback&&!delayed){delayed=true;await new Promise(r=>setTimeout(r,1400));}return route.fulfill({json:result});}catch(e){return route.fulfill({status:e.status||503,json:{ok:false,error:e.message}});}}if(url.pathname==='/app-billiards-replay-worker.js')return route.fulfill({contentType:'application/javascript',body:fs.readFileSync('app-billiards-replay-worker.js','utf8')+';const original=self.onmessage;self.onmessage=e=>setTimeout(()=>original(e),1200);'});const file=path.join(process.cwd(),url.pathname);return fs.existsSync(file)&&fs.statSync(file).isFile()?route.fulfill({path:file}):route.fulfill({status:404});});
  await page.goto('http://replay.test/billiards-play.html?watch='+host.roomId);await page.waitForFunction(()=>PokerBilliards.inspect().ready);
  if(!await page.locator('body').evaluate(el=>el.classList.contains('billiards-table-view')))await page.locator('#view').click();
  await page.waitForFunction(()=>document.querySelector('.billiards>header h1').dataset.turn==='spectator');
  assert.equal(await page.evaluate(()=>PokerBilliards.inspect().spectating),true);assert.match(await page.locator('.billiards>header h1').innerText(),/Ход игрока/);assert.ok(await page.locator('#shoot').isHidden());assert.equal(await page.locator('.billiards-matchup [data-side="0"] strong').innerText(),'ПокерМанки');assert.equal(await page.locator('.billiards-matchup [data-side="1"] strong').innerText(),'Алексей');
  await page.waitForFunction(()=>PokerBilliards.inspect().graphics.viewport?.controls===0);
  const viewport=await page.evaluate(()=>PokerBilliards.inspect().graphics.viewport);
  assert.equal(viewport.bottom,12,'spectators reserve only a small table margin, not the player controls');
  await page.screenshot({path:'output/billiards/spectator.png'});
  await page.evaluate(()=>{function watch(){const s=PokerBilliards.inspect().state;if(s.shot===1&&s.moving&&!window.firstShotFrame)window.firstShotFrame=structuredClone(s);requestAnimationFrame(watch);}requestAnimationFrame(watch);});
  const initial=await service.call('host',{action:'room',roomId:host.roomId});const shot=await service.call('host',{action:'move',roomId:host.roomId,revision:initial.revision,move:{type:'shot',angle:0,power:.8,cueId:0}});
  assert.equal(shot.playback.startedAt-shot.serverNow,350);
  await page.waitForFunction(()=>PokerBilliards.inspect().replay.ready);assert.ok(workers.some(url=>url.endsWith('app-billiards-replay-worker.js')));assert.equal(await page.evaluate(()=>PokerBilliards.inspect().replay.worker),true);
  await page.waitForFunction(()=>PokerBilliards.inspect().state.shot===1&&!PokerBilliards.inspect().state.moving);const final=await page.evaluate(()=>PokerBilliards.inspect().state);
  assert.deepEqual(final,shot.state);const first=await page.evaluate(()=>window.firstShotFrame);assert.ok(first,'the moving shot must be displayed');assert.ok(Math.hypot(first.balls[0].x-shot.playback.before.balls[0].x,first.balls[0].y-shot.playback.before.balls[0].y)<20,'delayed calculation must preserve the beginning of the shot');assert.equal(delayed,true);assert.deepEqual(errors,[]);
  assert.deepEqual(rooms.get(host.roomId).players,['host','guest']);console.log('PASS read-only spectator receives complete live shot, no seat and no shot controls');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
