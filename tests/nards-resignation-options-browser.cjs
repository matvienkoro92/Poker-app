'use strict';
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),fixture=require('./helpers/board-wager-fixture.cjs');
(async()=>{const browser=await chromium.launch();try{
 for(const [discipline,resignKind,amount]of [['short','single',100],['long','mars',150],['short','koks',200]]){
 const f=fixture();let room=await f.service.call('m1',{action:'create',discipline,stake:100,requestId:'browser_resign_choice',marsMultiplier:1.5,koksMultiplier:2});await f.call('m2','join',room.roomId);
 const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.addInitScript(()=>localStorage.setItem('p21-nards-auto-roll','0'));
 await page.route('http://resign.test/**',async r=>{const url=new URL(r.request().url());if(url.pathname.startsWith('/api/')){if(url.pathname!=='/api/board-games')return r.fulfill({json:{ok:true}});const body=r.request().postDataJSON();if(body.action==='access')return r.fulfill({json:{ok:true,allowed:true,level:1}});try{return r.fulfill({json:await f.service.call('m1',body)});}catch(e){return r.fulfill({status:e.status||500,json:{ok:false,error:e.message}});}}const file=path.join(process.cwd(),url.pathname);return fs.existsSync(file)&&fs.statSync(file).isFile()?r.fulfill({path:file}):r.fulfill({status:404});});
 await page.goto('http://resign.test/board-games-play.html?room='+room.roomId);await page.waitForFunction(()=>window.PokerBoardGames?.inspect().ready);
 await page.locator('[data-resign]').click();const dialog=page.locator('.nards-resign-dialog');await dialog.waitFor({state:'visible'});assert.equal(await dialog.locator('[data-resign-kind]').count(),3);
 assert.match(await dialog.locator('[data-resign-kind="single"]').innerText(),/100/);assert.match(await dialog.locator('[data-resign-kind="mars"]').innerText(),/150/);assert.match(await dialog.locator('[data-resign-kind="koks"]').innerText(),/200/);
 await dialog.getByRole('button',{name:'Продолжить игру'}).click();assert.equal(f.rooms.get(room.roomId).state.winner,null);
 // Leaving a paid game offers exactly the same settlement choice.
 await page.locator('#game [data-exit]').first().click();await dialog.waitFor({state:'visible'});await dialog.getByRole('button',{name:'Продолжить игру'}).click();
 await page.locator('[data-resign]').click();if(resignKind==='mars')await page.screenshot({path:'/tmp/nards-resignation-options.png'});
 await dialog.locator('[data-resign-kind="'+resignKind+'"]').click();await page.waitForFunction(()=>PokerBoardGames.inspect().wager.status==='paid');
 const result=await page.evaluate(()=>PokerBoardGames.inspect());assert.equal(result.state.winKind,resignKind);assert.equal(result.wager.settledStake,amount);assert.deepEqual(errors,[]);await page.close();console.log('PASS '+discipline+' '+resignKind+': three choices, cancellation, exit menu and server settlement');
 }
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
