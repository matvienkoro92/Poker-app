'use strict';
const {chromium,webkit}=require('playwright'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 for(const engine of [chromium,webkit]){
 const browser=await engine.launch();try{for(const reject of [false,true]){
  const rooms=new Map(),service=require('../lib/board-games-room')({profile:async member=>({name:member,level:1}),load:async id=>structuredClone(rooms.get(id)),create:async(id,r)=>{rooms.set(id,structuredClone(r));return true;},cas:async(id,rev,r)=>{if(rooms.get(id).revision!==rev)return false;rooms.set(id,structuredClone(r));return true;}});
  const created=await service.call('host',{action:'create',discipline:'chess',timeControl:'blitz-5-3'});await service.call('guest',{action:'join',roomId:created.roomId});
  const page=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,isMobile:true}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  let release,requests=0;const held=new Promise(r=>release=r);
  await page.route('http://input.test/**',async route=>{
   const u=new URL(route.request().url());if(u.pathname.startsWith('/api/')){
    if(u.pathname!=='/api/board-games')return route.fulfill({json:{ok:true}});
    const body=route.request().postDataJSON();
    if(body.action==='access')return route.fulfill({json:{ok:true,allowed:true,level:1,equipment:{board:'walnut',pieces:'classic'}}});
    if(body.action==='admission')return route.fulfill({json:{ok:true,conflict:null}});
    if(body.action==='active')return route.fulfill({json:{ok:true,active:null}});
    try{
     if(body.action==='move'&&++requests===1){const data=reject?null:await service.call('host',body);await held;return reject?route.fulfill({status:409,json:{ok:false,error:'Ход отклонён'}}):route.fulfill({json:data});}
     return route.fulfill({json:await service.call('host',body)});
    }catch(e){return route.fulfill({status:e.status||503,json:{ok:false,error:e.message}});}
   }
   const file=path.join(process.cwd(),u.pathname);return fs.existsSync(file)&&fs.statSync(file).isFile()?route.fulfill({path:file}):route.fulfill({status:404});
  });
  await page.goto('http://input.test/board-games-play.html?room='+created.roomId);await page.waitForFunction(()=>window.PokerBoardGames?.inspect().ready);
  const e2=page.locator('[data-square=e2]'),bounds=await e2.boundingBox();await page.evaluate(()=>window.tappedSquare=document.querySelector('[data-square=e2]'));
  await page.mouse.move(bounds.x+bounds.width/2,bounds.y+bounds.height/2);await page.mouse.down();
  rooms.get(created.roomId).revision++;let revision=rooms.get(created.roomId).revision;
  await page.waitForFunction(rev=>PokerBoardGames.inspect().revision===rev,revision);
  assert.equal(await page.evaluate(()=>window.tappedSquare===document.querySelector('[data-square=e2]')),true,'polling replaced pressed square');
  await page.mouse.up();await page.locator('[data-square=e2].selected').waitFor();
  rooms.get(created.roomId).revision++;revision=rooms.get(created.roomId).revision;await page.waitForFunction(rev=>PokerBoardGames.inspect().revision===rev,revision);
  assert.equal(await e2.evaluate(el=>el.classList.contains('selected')),true,'clock-only update cleared selected piece');
  await page.locator('[data-square=c1]').tap();await page.locator('[data-square=c1].selected').waitFor();assert.match(await page.locator('#hint').textContent(),/нет допустимых ходов/);assert.equal(requests,0);
  await e2.tap();await page.locator('[data-square=e4]').tap();await page.waitForFunction(()=>PokerBoardGames.inspect().busy&&PokerBoardGames.inspect().state.ply===1);
  await page.locator('[data-square=g1]').tap();await page.locator('[data-square=g1].selected').waitFor();
  if(!reject){
   await service.call('guest',{action:'move',roomId:created.roomId,revision:rooms.get(created.roomId).revision,move:{type:'move',from:'e7',to:'e5'}});
   await page.evaluate(()=>document.dispatchEvent(new Event('visibilitychange')));await page.waitForFunction(()=>PokerBoardGames.inspect().state.ply===2);
   assert.equal(await page.locator('[data-square=g1]').evaluate(el=>el.classList.contains('selected')),true,'opponent response lost the selected piece');
  }
  await page.locator('[data-square=f3]').tap();assert.equal(await page.locator('.square.premove').count(),2);assert.equal(requests,1,'queued input sent a duplicate request before acknowledgement');
  release();
  if(reject){await page.waitForFunction(()=>!PokerBoardGames.inspect().busy&&PokerBoardGames.inspect().state.ply===0);assert.equal(await page.locator('.square.premove').count(),0);assert.equal(requests,1);await e2.tap();await page.locator('[data-square=e2].selected').waitFor();}
  else{await page.waitForFunction(()=>!PokerBoardGames.inspect().busy&&PokerBoardGames.inspect().state.ply===3);assert.equal(requests,2);assert.equal(rooms.get(created.roomId).state.ply,3);}
  assert.deepEqual(errors,[]);await page.close();console.log(engine.name()+': PASS stable tap target, retained selection, blocked piece feedback and '+(reject?'safe rejection':'queued input during delayed acknowledgement'));
 }}finally{await browser.close();}}
})().catch(e=>{console.error(e);process.exitCode=1;});
