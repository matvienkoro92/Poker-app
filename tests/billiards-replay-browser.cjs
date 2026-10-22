'use strict';
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const factory=require('../lib/billiards-room');
(async()=>{
 const rooms=new Map(),service=factory({load:async id=>structuredClone(rooms.get(id)),create:async(id,r)=>{rooms.set(id,structuredClone(r));return true;},cas:async(id,rev,r)=>{if(rooms.get(id)?.revision!==rev)return false;rooms.set(id,structuredClone(r));return true;}});
 const host=await service.call('host',{action:'create',turnSeconds:90,discipline:'pyramid'});await service.call('guest',{action:'join',roomId:host.roomId});
 const browser=await chromium.launch({args:process.env.BILLIARDS_HARDWARE?['--use-angle=metal']:['--enable-unsafe-swiftshader']});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}}),workers=[],errors=[];page.on('worker',w=>workers.push(w.url()));page.on('pageerror',e=>errors.push(e.message));let delayed=false;
  await page.route('http://replay.test/**',async route=>{const url=new URL(route.request().url());if(url.pathname==='/api/billiards'){const body=route.request().postDataJSON();if(body.action==='access')return route.fulfill({json:{ok:true,allowed:true}});try{const result=await service.call('guest',body);if(body.action==='room'&&result.playback&&!delayed){delayed=true;await new Promise(r=>setTimeout(r,1400));}return route.fulfill({json:result});}catch(e){return route.fulfill({status:e.status||503,json:{ok:false,error:e.message}});}}const file=path.join(process.cwd(),url.pathname);return fs.existsSync(file)&&fs.statSync(file).isFile()?route.fulfill({path:file}):route.fulfill({status:404});});
  await page.goto('http://replay.test/billiards-play.html?room='+host.roomId);await page.locator('[data-accept]').click();await page.waitForFunction(()=>PokerBilliards.inspect().ready);
  if(!await page.locator('body').evaluate(el=>el.classList.contains('billiards-table-view')))await page.locator('#view').click();
  await page.waitForFunction(()=>document.querySelector('.billiards>header h1').dataset.turn==='opponent');
  assert.equal(await page.locator('.billiards>header h1').innerText(),'Ход соперника');
  for(const width of [320,390]){await page.setViewportSize({width,height:844});const layout=await page.evaluate(()=>{const dock=document.getElementById('tableDock').getBoundingClientRect(),shoot=document.getElementById('shoot').getBoundingClientRect(),spin=document.getElementById('spinButton').getBoundingClientRect();return {dock:dock.height,shoot:shoot.height,spin:spin.height,top:shoot.top-spin.top};});assert.ok(layout.dock<=60,JSON.stringify(layout));assert.ok(layout.shoot>=38&&layout.spin>=38);assert.ok(Math.abs(layout.top)<3,JSON.stringify(layout));await page.screenshot({path:'output/billiards/compact-dock-'+width+'.png'});}
  const initial=await service.call('host',{action:'room',roomId:host.roomId});const shot=await service.call('host',{action:'move',roomId:host.roomId,revision:initial.revision,move:{type:'shot',angle:0,power:.8,cueId:0}});
  assert.equal(shot.playback.startedAt-shot.serverNow,350);
  await page.waitForFunction(()=>PokerBilliards.inspect().replay.ready);assert.ok(workers.some(url=>url.endsWith('app-billiards-replay-worker.js')));assert.equal(await page.evaluate(()=>PokerBilliards.inspect().replay.worker),true);
  await page.waitForFunction(()=>PokerBilliards.inspect().state.shot===1&&!PokerBilliards.inspect().state.moving);const final=await page.evaluate(()=>PokerBilliards.inspect().state);
  assert.deepEqual(final,shot.state);await page.waitForFunction(()=>{const s=PokerBilliards.inspect().state;return document.querySelector('.billiards>header h1').textContent===(s.winner!==null?'Партия завершена':s.turn===1?'Ваш ход':'Ход соперника');});assert.equal(delayed,true);assert.deepEqual(errors,[]);
  console.log('PASS delayed network playback runs in a real Worker, interpolates and ends at exactly the server state; preview reduced to 350ms');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
